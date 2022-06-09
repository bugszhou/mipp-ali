import {
  IComponentInstance,
  IPageEvents,
  IShareAppMessage,
  RecursivePartialAndDynamic,
  UnknownRecord,
} from "../mini-types/global/types/lib.global";

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
  events?: Partial<IPageEvents>;
}

export declare class MiniComponent<IData extends DataOption> {
  /**
   * 页面数据。
   */
  readonly data: IData;
  /**
   * 组件路径
   */
  readonly is: string;
  /**
   * 组件 id，可直接在组件 axml 中渲染值
   */
  readonly $id: number;
  /**
   * 组件所属页面实例
   */
  readonly $page: Record<string, any>;
  /**
   * 将数据从逻辑层发送到视图层
   * @param data
   * @param callback
   */
  setData(
    data: RecursivePartialAndDynamic<IData> & Record<string, unknown>,
    callback?: () => void
  ): void;
  /**
   * 获取自定义 tabBar 实例
   * @version 2.7.20+ 可以通过判断 `this.getTabBar` 是否为函数做兼容性处理
   */
  getTabBar():
    | IComponentInstance<
        UnknownRecord,
        UnknownRecord,
        UnknownRecord,
        UnknownRecord,
        UnknownRecord,
        []
      >
    | undefined;
  /**
   * $spliceData 同样用于将数据从逻辑层发送到视图层，但是相比于 setData，在处理长列表的时候，其具有更高的性能。
   * @param data
   * @param callback
   * @version 1.7.2+ 可以使用 my.canIUse('page.$spliceData') 做兼容性处理
   */
  $spliceData(
    data: RecursivePartialAndDynamic<IData> & Record<string, unknown>,
    callback?: () => void
  ): void;
  /**
   * 组件生命周期函数，组件创建时触发
   * @version 1.14.0+
   */
  onInit(): void;
  /**
   * 组件生命周期函数，组件创建时和更新前触发
   *  @version 1.14.0+
   */
  deriveDataFromProps(nextProps: Partial<DataOption>): void;
  /**
   * 组件生命周期函数，组件创建完毕时触发
   */
  didMount(): void;
  /**
   * 组件生命周期函数，组件更新完毕时触发
   */
  didUpdate(prevProps: Partial<DataOption>, prevData: Partial<IData>): void;
  /**
   * 组件生命周期函数，组件删除时触发
   */
  didUnmount(): void;
  /**
   * 指定组件被ref引用时的返回值
   * @version 1.18.0+
   */
  ref(): void;
  /**
   * 监听所属页面的事件
   */
  pageEvents: Partial<IPageEvents>;

  static Component(componentIns: MiniComponent<unknown>): void;
}

export function method(
  UIInterface: any,
  methodName: string,
  descriptor: PropertyDescriptor
): void;
