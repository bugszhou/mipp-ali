import rfdc from "rfdc";
import clone from "rfdc";

declare global {
  const Component: any;
}

const lifetimesMappings = {
  created: "onInit",
  ready: "didMount",
  detached: "didUnmount",
  error: "onError",
};

export default class MiniComponent<IData = unknown> {
  data: IData = Object.create(null);

  viewStatus: "load" | "ready" = "load";

  private delProperties = ["constructor"];

  private lifetimesMappings = {
    created: "onInit",
    ready: "didMount",
    detached: "didUnmount",
    error: "onError",
  };

  onInit() {
    // empty
  }

  triggerEvent<IEventData = any>(eventName: string, data?: IEventData) {
    const props = (this as any)?.props;
    const dataset = Object.keys(props || {})
      .filter((property) => property.startsWith("data-"))
      .map((property) => property.replace(/^data\-/, ""))
      .reduce((prev, current) => {
        prev[current] = props[`data-${current}`];
        return prev;
      }, {});

    (this as any)?.props?.[eventName]?.({
      type: eventName,
      detail: data,
      currentTarget: {
        dataset: dataset || {},
      },
    });
  }

  setDataAsync(data: Partial<IData>) {
    return new Promise((resolve) => {
      (this as any).setData(data, () => {
        resolve(void 0);
      });
    });
  }

  static serialize<T extends MiniComponent<any> = MiniComponent<any>>(
    obj: T
  ): any {
    const that = clone({ proto: true })(obj);

    const delProperties = [
      ...(Array.isArray(obj.delProperties) ? obj.delProperties : []),
    ];

    delProperties.forEach((item) => {
      delete that[item];
    });

    try {
      if (typeof (that as any)?.properties === "object") {
        (that as any).props = (that as any)?.properties;
        delete (that as any)?.properties;
      }
    } catch (e) {
      console.error(e);
    }

    const _that: any = that;

    if (!_that?.lifetimes) {
      _that.lifetimes = Object.create(null);
    }

    const createdFn = _that?.lifetimes?.created || _that?.created;
    _that.lifetimes.created = function created(...opts: any) {
      try {
        this.viewStatus = "load";
      } catch {}
      return createdFn?.apply?.(this, opts);
    };

    const readyFn = _that?.lifetimes?.ready || _that?.ready;
    _that.lifetimes.ready = function ready(...opts: any) {
      try {
        if (this.viewStatus !== "ready") {
          this.viewStatus = "ready";
        }
      } catch {}
      return readyFn?.apply?.(this, opts);
    };

    const mappings = obj?.lifetimesMappings || lifetimesMappings || {};

    Object.keys(mappings).forEach((keyName) => {
      if (_that[keyName]) {
        _that.lifetimes[mappings?.[keyName]] = _that[keyName];
      }

      if (_that.lifetimes?.[keyName]) {
        _that.lifetimes[mappings?.[keyName]] = _that.lifetimes[keyName];
      }

      try {
        delete _that[keyName];
        delete _that.lifetimes[keyName];
      } catch (e) {
        console.error(e);
      }
    });

    Object.keys(_that?.lifetimes || {}).forEach((keyName) => {
      const fn = _that[keyName];
      const lifetimesFn = _that?.lifetimes[keyName];
      _that[keyName] = function newFn(...opts) {
        let result: any = null;
        if (typeof fn === "function") {
          result = fn?.apply?.(this, opts);
        }

        if (typeof result === "object" && typeof result?.then === "function") {
          const that = this;
          return (async function runLifetimes() {
            await result;
            return await lifetimesFn?.apply?.(that, opts);
          })();
        }

        return lifetimesFn?.apply?.(this, opts);
      };
    });

    if (!_that?.methods) {
      _that.methods = Object.create(null);
    }

    _that.methods.triggerEvent = _that.triggerEvent;
    _that.methods.setDataAsync = _that.setDataAsync;
    delete _that.triggerEvent;
    delete _that.setDataAsync;
    const fn = _that.deriveDataFromProps;
    const onInit = _that.onInit;

    try {
      Object.keys(_that.methods).forEach((keyName) => {
        delete _that[keyName];
      });
      delete _that.delProperties;
      delete _that.lifetimes;
      delete _that.lifetimesMappings;
    } catch (e) {
      console.error(e);
    }

    _that.onInit = function (...opts) {
      this.data = {
        ...(this.data || {}),
        ...(this.props || {}),
      };

      if (typeof onInit === "function") {
        onInit.apply(this, opts);
      }
    };
    _that.deriveDataFromProps = function (nextProps) {
      const propsData = Object.keys(nextProps || {})?.reduce?.((pre, key) => {
        if (typeof nextProps?.[key] === "function") {
          return pre;
        }

        pre[key] = nextProps?.[key];
        return pre;
      }, Object.create(null));

      this.setData({
        ...(propsData || {}),
      });

      if (typeof fn === "function") {
        fn.apply(this, [propsData]);
      }
    };

    return that;
  }

  static Component(componentIns: MiniComponent) {
    MiniComponent.render(componentIns);
  }

  static render(componentIns: MiniComponent) {
    Component(MiniComponent.serialize(componentIns));
  }
}

export function method(
  UIInterface,
  methodName,
  descriptor: PropertyDescriptor
) {
  const methods = rfdc()(UIInterface?.methods ?? Object.create(null));

  if (!UIInterface.hasOwnProperty("methods")) {
    UIInterface.methods = Object.create(null);
  }
  UIInterface.methods = {
    ...UIInterface.methods,
    ...(methods ?? Object.create(null)),
  };
  UIInterface.methods[methodName] = descriptor.value;
}

export function pageLifetime(
  UIInterface,
  methodName,
  descriptor: PropertyDescriptor
) {
  const onInit = UIInterface.onInit;

  UIInterface.onInit = function (...opts) {
    if (!this?.$page) {
      this.$page = Object.create(null);
    }

    if (!this?.$page?.pageShow) {
      this.$page.pageShow = [];
    }

    if (!this?.$page?.pageHide) {
      this.$page.pageHide = [];
    }

    if (methodName === "show") {
      this.$page.pageShow.push(descriptor.value.bind(this));
    }

    if (methodName === "hide") {
      this.$page.pageHide.push(descriptor.value.bind(this));
    }
    if (typeof onInit !== "function") {
      return;
    }

    return onInit.apply(this, opts);
  };
}

export function lifetimes(
  UIInterface,
  methodName,
  descriptor: PropertyDescriptor
) {
  const lifetimes = rfdc()(UIInterface?.lifetimes ?? Object.create(null));

  if (!UIInterface.hasOwnProperty("lifetimes")) {
    UIInterface.lifetimes = Object.create(null);
  }
  UIInterface.lifetimes = {
    ...UIInterface.lifetimes,
    ...(lifetimes ?? Object.create(null)),
  };

  const base = Object.getPrototypeOf(UIInterface);

  const fn = descriptor.value;

  UIInterface.lifetimes[methodName] = async function lifetimesFn(...opts) {
    if (typeof base?.created === "function") {
      await base.created.apply(this, opts);
    }
    await fn.apply(this, opts);
  };
}

export function lifetime(
  UIInterface,
  methodName,
  descriptor: PropertyDescriptor
) {
  const lifetimes = rfdc()(UIInterface?.lifetimes ?? Object.create(null));

  if (!UIInterface.hasOwnProperty("lifetimes")) {
    UIInterface.lifetimes = Object.create(null);
  }
  UIInterface.lifetimes = {
    ...UIInterface.lifetimes,
    ...(lifetimes ?? Object.create(null)),
  };
  UIInterface.lifetimes[methodName] = descriptor.value;
}

export function extendLifetime(
  UIInterface,
  methodName,
  descriptor: PropertyDescriptor
) {
  const lifetimes = rfdc()(UIInterface?.lifetimes ?? Object.create(null));

  if (!UIInterface.hasOwnProperty("lifetimes")) {
    UIInterface.lifetimes = Object.create(null);
  }
  UIInterface.lifetimes = {
    ...UIInterface.lifetimes,
    ...(lifetimes ?? Object.create(null)),
  };
  const beforeFn = UIInterface.lifetimes[methodName];
  const fn = descriptor.value;

  UIInterface.lifetimes[methodName] = function newLifetime(...opts) {
    const that = this;

    const currentResult = fn?.apply?.(that, opts);

    if (
      typeof currentResult === "object" &&
      typeof currentResult?.then === "function"
    ) {
      return (async function runLifetimes() {
        await currentResult;
        return await beforeFn?.apply?.(that, opts);
      })();
    }

    return beforeFn?.apply?.(that, opts);
  };
}
