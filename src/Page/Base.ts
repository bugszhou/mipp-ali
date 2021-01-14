export default class Base<IData> {
  /**
   * 页面名称，注意唯一性
   */
  get componentName(): string {
    return this.constructor.name;
  }

  data = {};

  constructor() {
    return Base.serialize(this);
  }

  private delProperties = ["constructor"];

  static serialize<T extends Base<any>>(obj: T): any {
    const start = Date.now();
    const that = Object.create(null);

    const delProperties = [...obj.delProperties];

    const allProperties = [
      ...Object.keys(obj),
      ...Object.keys(Object.getPrototypeOf(obj)),
    ];
    allProperties.forEach((key) => {
      if (delProperties.includes(key)) {
        return;
      }
      that[key] = obj[key];
    });

    try {
      console.log(obj.componentName, " serialize time: ", Date.now() - start);
    } catch (e) {
      console.log(e);
    }

    return that;
  }
}
