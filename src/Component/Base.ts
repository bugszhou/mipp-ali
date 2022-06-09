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

  static serialize<T extends MiniComponent<any>>(obj: T): any {
    const that = clone({ proto: true })(obj);

    const delProperties = [
      ...(Array.isArray(obj.delProperties) ? obj.delProperties : []),
    ];

    delProperties.forEach((item) => {
      delete that[item];
    });

    return that;
  }

  static Component(componentIns: MiniComponent) {
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
