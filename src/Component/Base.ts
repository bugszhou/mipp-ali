export default class Base<IData> {
  /**
   * 组件名称，注意唯一性
   */
  get componentName(): string {
    return this.constructor.name;
  }

  data = {};
}
