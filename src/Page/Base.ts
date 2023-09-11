import clone from "rfdc";

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

  setDataAsync(data: Partial<IData>) {
    return new Promise((resolve) => {
      (this as any).setData(data, () => {
        resolve(void 0);
      });
    });
  }

  static serialize<T extends Base<any> = Base<any>>(obj: T): any {
    // const start = Date.now();
    const that = clone({ proto: true })(obj) as any;

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
      let result;
      if (typeof onShow === "function") {
        result = await onShow.apply(this, opts);
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
      return result;
    };

    const onHide = that.onHide;

    that.onHide = async function (...opts) {
      let result;
      if (typeof onHide === "function") {
        result = await onHide.apply(this, opts);
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
      return result;
    };

    // try {
    //   console.log(obj.componentName, " serialize time: ", Date.now() - start);
    // } catch (e) {
    //   console.log(e);
    // }

    return that;
  }

  static render<IData = any>(ins: Base<IData>) {
    Page(Base.serialize(ins));
  }
}

export class MiniPageBase<IData> {
  /**
   * 页面名称，注意唯一性
   */
  get componentName(): string {
    return this.constructor.name;
  }

  data = {};

  // @ts-ignore
  private delProperties = ["constructor"];

  setDataAsync(data: Partial<IData>) {
    return new Promise((resolve) => {
      (this as any).setData(data, () => {
        resolve(void 0);
      });
    });
  }

  static before(): Partial<{
    onLoad: () => void;
    onShow: () => void;
    onReady: () => void;
  }> {
    return Object.create(null);
  }

  static serialize(obj: any): any {
    const that = clone({ proto: true })(obj) as any;

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

    const beforeObj = MiniPageBase?.before?.();

    const onShow = that.onShow;

    that.onShow = function show(...opts) {
      let result = onShow?.apply?.(this, opts);

      if (typeof result === "object" && typeof result?.then === "function") {
        return (async () => {
          result = await result;
          setTimeout(() => {
            (async () => {
              if (Array.isArray(this?.pageShow)) {
                for (let i = 0; i < this?.pageShow?.length; ++i) {
                  const item = this?.pageShow?.[i];
                  await item?.(...opts);
                }
              }
            })();
          }, 0);

          return result;
        })();
      }

      setTimeout(() => {
        (async () => {
          if (Array.isArray(this?.pageShow)) {
            for (let i = 0; i < this?.pageShow?.length; ++i) {
              const item = this?.pageShow?.[i];
              await item?.(...opts);
            }
          }
        })();
      }, 0);
      return result;
    };

    const onHide = that.onHide;

    that.onHide = function hide(...opts) {
      let result = onHide?.apply?.(this, opts);

      if (typeof result === "object" && typeof result?.then === "function") {
        return (async () => {
          result = await result;
          setTimeout(() => {
            (async () => {
              if (Array.isArray(this?.pageHide)) {
                for (let i = 0; i < this?.pageHide?.length; ++i) {
                  const item = this?.pageHide?.[i];
                  await item?.(...opts);
                }
              }
            })();
          }, 0);

          return result;
        })();
      }

      setTimeout(() => {
        (async () => {
          if (Array.isArray(this?.pageHide)) {
            for (let i = 0; i < this?.pageHide?.length; ++i) {
              const item = this?.pageHide?.[i];
              await item?.(...opts);
            }
          }
        })();
      }, 0);
      return result;
    };

    const createdFn = that?.onLoad;
    that.onLoad = function created(...opts: any) {
      this.viewStatus = "load";
      let isError = false;

      try {
        beforeObj?.onLoad?.apply(this, opts);
      } catch (e) {
        console.error(e);
        isError = true;
      }

      if (isError) {
        return;
      }

      isError = false;

      try {
        this?.beforeOnLoad?.(...opts);
      } catch (e) {
        console.error(e);
      }

      return createdFn?.apply?.(this, opts);
    };

    const readyFn = that?.onReady;
    that.onReady = function ready(...opts: any) {
      try {
        if (this.viewStatus !== "ready") {
          this.viewStatus = "ready";
        }
      } catch {}

      let isError = false;
      let beforeResult: any = null;

      try {
        beforeResult = beforeObj?.onReady?.apply(this, opts);
      } catch (e) {
        console.error(e);
        isError = true;
      }

      if (isError) {
        return;
      }

      isError = false;

      let readyResult = readyFn?.apply?.(this, opts);

      if (
        typeof beforeResult === "object" &&
        typeof beforeResult?.then === "function"
      ) {
        (async () => {
          await beforeResult;
          await that?.onReadyAsync?.apply?.(this, opts);
          await that?.render?.apply?.(this, opts);
          return readyResult;
        })();
      } else {
        that?.onReadyAsync?.apply?.(this, opts);
        that?.render?.apply?.(this, opts);
      }

      return readyResult;
    };

    return that;
  }

  static render(ins: any) {
    Page(MiniPageBase.serialize(ins));
  }
}
