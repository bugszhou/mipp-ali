type DataOption = Record<string, any>;

export declare class Base<IData extends DataOption> {
  /**
   * 页面数据。
   */
  readonly data: IData;

  /**
   * 将数据从逻辑层发送到视图层，同时改变对应的 this.data 的值
   */
  setData: tinyapp.SetDataMethod<IData>;

  /**
   * 同 setData，但是相比于 setData，在处理长列表的时候，其具有更高的性能
   */
  $spliceData: tinyapp.SpliceDataMethod;

  /**
   * Page 路径，对应 app.json 中配置的路径值。
   */
  readonly route: string;

  /**
   * 批量更新数据。
   */
  $batchedUpdates: (fn: () => void) => void;

  // events 声明
  /**
   * 事件处理函数集合。
   * 
   * 类型：tinyapp.IPageEvents
   */
  events?: tinyapp.IPageEvents;

  /**
   * events事件处理函数onBack。
   * @description 需要定义在events，既是events.onBack
   */
  onBack?(): void;

  /**
   * events事件处理函数onKeyboardHeight。
   * @description 需要定义在events，既是events.onKeyboardHeight
   */
  onKeyboardHeight?(): void;

  /**
   * events事件处理函数onOptionMenuClick。
   * @description 需要定义在events，既是events.onOptionMenuClick
   */
  onOptionMenuClick?(): void;

  /**
   * events事件处理函数onPopMenuClick。
   * @description 需要定义在events，既是events.onPopMenuClick
   */
  onPopMenuClick?(): void;

  /**
   * events事件处理函数onPullIntercept。
   * @description 需要定义在events，既是events.onPullIntercept
   */
  onPullIntercept?(): void;

  /**
   * 页面相关事件处理函数--监听用户下拉动作，events事件处理函数onPullDownRefresh。
   * @description 需要定义在events，既是events.onPullDownRefresh
   */
  onPullDownRefresh?(params: { from: "manual" | "code" }): void;

  /**
   * events事件处理函数onTitleClick。
   * @description 需要定义在events，既是events.onTitleClick
   */
  onTitleClick?(): void;

  /**
   * 版本要求：基础库 1.11.0 或更高版本，若版本较低，建议做 兼容处理。
   * 点击标签（tab）时触发。
   * 
   * events事件处理函数onTabItemTap。
   * @description 需要定义在events，既是events.onTabItemTap
   */
  onTabItemTap?(item: { index: number; pagePath: string; text: string }): void;

  /**
   * events事件处理函数beforeTabItemTap。
   * @description 需要定义在events，既是events.beforeTabItemTap
   */
  beforeTabItemTap?(): void;
  // event 声明结束
}
