declare global {
  const Page: any;
}

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
    // const start = Date.now();
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

    const onShow = that.onShow;

    that.onShow = async function (...opts) {
      if (typeof onShow === "function") {
        const result = await onShow.apply(this.opts);
        return result;
      }

      setTimeout(() => {
        if (Array.isArray(this?.pageShow)) {
          this?.pageShow?.forEach(async (item) => {
            if (typeof item === "function") {
              await item(...opts);
            }
          });
        }
      }, 0);
    };

    const onHide = that.onHide;

    that.onHide = async function (...opts) {
      if (typeof onHide === "function") {
        const result = await onHide.apply(this.opts);
        return result;
      }

      setTimeout(() => {
        if (Array.isArray(this?.pageHide)) {
          this?.pageHide?.forEach(async (item) => {
            if (typeof item === "function") {
              await item(...opts);
            }
          });
        }
      }, 0);
    };

    // try {
    //   console.log(obj.componentName, " serialize time: ", Date.now() - start);
    // } catch (e) {
    //   console.log(e);
    // }

    return that;
  }

  static render<IData = any>(ins: Base<IData>) {
    Page(ins);
  }
}
