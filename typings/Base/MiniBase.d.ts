import { MiniComponent } from "./Base";

type DataOption = Record<string, any>;

export declare class ComponentBase<
  IData extends DataOption = DataOption,
  IProps = DataOption
> {
  static before(): Partial<{
    created: () => void;
    ready: () => void;
  }>;
  /** 页面的文件路径 */
  is: string;

  /** `setData` 函数用于将数据从逻辑层发送到视图层
   *（异步），同时改变对应的 `this.data` 的值（同步）。
   *
   * **注意：**
   *
   * 1. **直接修改 this.data 而不调用 this.setData 是无法改变页面的状态的，还会造成数据不一致**。
   * 2. 仅支持设置可 JSON 化的数据。
   * 3. 单次设置的数据不能超过1024kB，请尽量避免一次设置过多的数据。
   * 4. 请不要把 data 中任何一项的 value 设为 `undefined` ，否则这一项将不被设置并可能遗留一些潜在问题。
   */
  setData(
    /** 这次要改变的数据
     *
     * 以 `key: value` 的形式表示，将 `this.data` 中的 `key` 对应的值改变成 `value`。
     *
     * 其中 `key` 可以以数据路径的形式给出，支持改变数组中的某一项或对象的某个属性，如 `array[2].message`，`a.b.c.d`，并且不需要在 this.data 中预先定义。
     */
    data: Partial<IData> & DataOption,
    // data: Partial<IData>,
    /** setData引起的界面更新渲染完毕后的回调函数，最低基础库： `1.5.0` */
    callback?: () => void
  ): void;

  setDataAsync(
    /** 这次要改变的数据
     *
     * 以 `key: value` 的形式表示，将 `this.data` 中的 `key` 对应的值改变成 `value`。
     *
     * 其中 `key` 可以以数据路径的形式给出，支持改变数组中的某一项或对象的某个属性，如 `array[2].message`，`a.b.c.d`，并且不需要在 this.data 中预先定义。
     */
    data: Partial<IData> & DataOption
  ): Promise<void>;

  /** 触发事件，参见组件事件 */
  triggerEvent<IDetailType = any>(
    eventName: string,
    detail?: IDetailType
  ): void;

  /** 页面生命周期回调—监听页面显示
   *
   * 页面显示/切入前台时触发。
   */
  show(): void;
  /** 页面生命周期回调—监听页面隐藏
   *
   * 页面隐藏/切入后台时触发。 如 `navigateTo` 或底部 `tab` 切换到其他页面，小程序切入后台等。
   */
  hide(): void;

  /**
   * 在组件实例刚刚被创建时执行，注意此时不能调用 `setData`
   *
   * 最低基础库版本：[`1.6.3`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
   */
  created(): void;
  /**
   * 在组件在视图层布局完成后执行
   *
   * 最低基础库版本：[`1.6.3`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
   */
  ready(): void;

  /**
   * 在组件在视图层布局完成后执行，用于异步执行
   *
   * 最低基础库版本：[`1.6.3`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
   */
  readyAsync(): void;

  /**
   * 在组件在视图层布局完成后执行，用于异步执行
   *
   * 最低基础库版本：[`1.6.3`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
   */
  renderView(): void;
  /**
   * 在组件实例被从页面节点树移除时执行
   *
   * 最低基础库版本：[`1.6.3`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
   */
  detached(): void;
  /**
   * 每当组件方法抛出错误时执行
   *
   * 最低基础库版本：[`2.4.1`](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
   */
  error(err: Error): void;

  static render(ins: any): void;
  static serialize(ins: any): void;
}

export interface IAliappComponentProperties {
  /**
   * 组件 js 代码抛出错误时触发
   *
   * @version 1.24.9+
   */
  onError(error: Error): void;
}
