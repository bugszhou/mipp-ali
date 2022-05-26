import { IPageEvents, IShareAppMessage, RecursivePartialAndDynamic } from "../mini-types/global/types/lib.global";

type DataOption = Record<string, any>;

export declare class Base<IData extends DataOption> {
  /**
   * 页面数据。
   */
  readonly data: IData;

  /**
   * 将数据从逻辑层发送到视图层
   * @param data
   * @param callback
   */
  setData(data: RecursivePartialAndDynamic<IData>, callback?: () => void): void;

  /**
   * $spliceData 同样用于将数据从逻辑层发送到视图层，但是相比于 setData，在处理长列表的时候，其具有更高的性能。
   * @param data
   * @param callback
   * @version 1.7.2+ 可以使用 my.canIUse('page.$spliceData') 做兼容性处理
   */
  $spliceData(
    data: RecursivePartialAndDynamic<IData>,
    callback?: () => void
  ): void;
  /**
   * 批量更新数据。
   * @param callback
   * @version 1.14.0+ 可以使用  my.canIUse('page.$batchedUpdates') 做兼容性处理
   */
  $batchedUpdates(callback: () => void): void;
  /**
   * Page 路径，对应 app.json 中配置的路径值，类型为 String。这是一个只读属性。
   * @readonly
   */
  readonly route: string;

  /**
   * 版本要求：基础库 1.11.0 或更高版本，若版本较低，建议做 兼容处理。
   * 点击标签（tab）时触发。
   *
   * events事件处理函数onTabItemTap。
   * @description 需要定义在events，既是events.onTabItemTap
   */
  onTabItemTap?(item: { index: number; pagePath: string; text: string }): void;

  /**
   * 页面加载
   */
  onLoad<Query = {}>(query: Query): void;
  /**
   * 页面显示
   */
  onShow(): void;
  /**
   * 页面加载完成
   */
  onReady(): void;
  /**
   * 页面隐藏
   */
  onHide(): void;
  /**
   * 页面被关闭
   */
  onUnload(): void;
  /**
   * 标题被点击
   */
  onTitleClick(): void;
  /**
   * 页面被下拉
   */
  onPullDownRefresh(): void;
  /**
   * 页面被拉到底部时触发
   */
  onReachBottom(): void;
  /**
   * 返回自定义分享信息
   */
  onShareAppMessage(): IShareAppMessage;
  /**
   * 事件处理函数对象
   */
  events: Partial<IPageEvents>;
}
