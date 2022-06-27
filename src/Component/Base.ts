import clone from "rfdc";

declare global {
  const Component: any;
}

export default class MiniComponent<IData = unknown> {
  data: IData = Object.create(null);

  private delProperties = ["constructor"];

  private lifetimes = {
    created: "onInit",
    ready: "didMount",
    detached: "didUnmount",
    error: "onError",
  };

  triggerEvent<IEventData = any>(eventName: string, data?: IEventData) {
    (this as any).props[eventName]({
      type: eventName,
      detail: data,
    });
  }

  static serialize<T extends MiniComponent<any>>(obj: T): any {
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

    Object.keys(obj?.lifetimes || {}).forEach((keyName) => {
      if (_that[keyName]) {
        _that[obj?.lifetimes?.[keyName]] = _that[keyName];
      }
      try {
        delete _that[keyName];
      } catch (e) {
        console.error(e);
      }
    });

    if (!_that?.methods) {
      _that.methods = Object.create(null);
    }

    _that.methods.triggerEvent = _that.triggerEvent;
    delete _that.triggerEvent;
    const fn = _that.deriveDataFromProps;
    const onInit = _that.onInit;

    try {
      Object.keys(_that.methods).forEach((keyName) => {
        delete _that[keyName];
      });
      delete _that.delProperties;
      delete _that.lifetimes;
    } catch (e) {
      console.error(e);
    }

    _that.onInit = async function (...opts) {
      this.data = {
        ...(this.data || {}),
        ...(this.props || {}),
      };

      if (typeof onInit === "function") {
        await onInit.apply(this, opts);
      }
    };
    _that.deriveDataFromProps = async function (nextProps) {
      this.setData({
        ...(nextProps || {}),
      });

      if (typeof fn === "function") {
        await fn.apply(this, [nextProps]);
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
  if (!UIInterface.methods) {
    UIInterface.methods = Object.create(null);
  }
  UIInterface.methods[methodName] = descriptor.value;
}

export function pageLifetime(
  UIInterface,
  methodName,
  descriptor: PropertyDescriptor
) {
  const onInit = UIInterface.onInit;

  UIInterface.onInit = async function (...opts) {
    if (!this?.$page) {
      this.$page = Object.create(null);
    }

    if (!this?.$page?.pageShow) {
      this.$page.pageShow = [];
    }

    if (!this?.$page?.pageHide) {
      this.$page.pageHide = [];
    }
    
    if (methodName === "onShow") {
      this.$page.pageShow.push(descriptor.value.bind(this));
    }

    if (methodName === "onHide") {
      this.$page.pageHide.push(descriptor.value.bind(this));
    }
    if (typeof onInit !== "function") {
      return;
    }

    const result = await onInit.apply(this, opts);

    return result;
  };
}

export function lifetimes() {
  //
}
