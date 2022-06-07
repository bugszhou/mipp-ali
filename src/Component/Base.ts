declare global {
  const Component: any;
}

export default class MiniComponent<IData = unknown> {
  data: IData = Object.create(null);

  constructor() {
    Component(this);
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
