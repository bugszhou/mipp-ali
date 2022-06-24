import clone from "rfdc";

declare global {
  const Component: any;
}

export default class MiniComponent<IData = unknown> {
  data: IData = Object.create(null);

  private delProperties = ["constructor"];

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

    if (!(that as any)?.methods) {
      (that as any).methods = Object.create(null);
    }

    const _that: any = that;

    _that.methods.triggerEvent = _that.triggerEvent;
    delete _that.triggerEvent;
    const fn = _that.deriveDataFromProps;
    const onInit = _that.onInit;

    try {
      Object.keys(_that.methods).forEach((keyName) => {
        delete _that[keyName];
      });
      delete _that.delProperties;
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
