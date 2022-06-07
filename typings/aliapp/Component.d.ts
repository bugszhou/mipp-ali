import { DataOption } from "../Base/Base";
import { IComponentInstance, IPageEvents, RecursivePartialAndDynamic, UnknownRecord } from "../mini-types/global/types/lib.global";

declare global {
  /**
   * Component()相关的类型声明
   */
  namespace IMippAliComponent {
    /**
     * 生命周期方法
     */
    interface ILifetime<IData = any> {
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
    }
  }
}
