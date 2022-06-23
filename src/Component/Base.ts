import clone from "rfdc";

declare global {
  const Component: any;
}

export default class MiniComponent<IData = unknown> {
  data: IData = Object.create(null);

  private delProperties = ["constructor"];

  constructor() {
    return MiniComponent.serialize(this);
  }

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

    (that as any).methods.triggerEvent = obj.triggerEvent;

    return that;
  }

  static Component(componentIns: MiniComponent) {
    MiniComponent.render(componentIns);
  }

  static render(componentIns: MiniComponent) {
    Component(componentIns);
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
