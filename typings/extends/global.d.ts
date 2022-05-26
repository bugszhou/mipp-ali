import {
  IAppOnLaunchOptions,
  IAppOnUnhandledRejectionRes,
  IPageInstance,
  IShareAppMessage,
} from "../mini-types/global/types/lib.global";

declare global {
  /**
   * 获取小程序实例，一般用在各个子页面之中获取顶层应用。
   */
  function getApp<IAppOption>(): IAppOption;

  /**
   * getCurrentPages() 函数用于获取当前页面栈的实例，
   * 以数组形式按栈的顺序给出，第一个元素为首页，最后一个元素为当前页面。
   */
  function getCurrentPages(): IPageInstance<
    Record<string, any>,
    Record<string, any>,
    any
  >[];

  /**
   * App's constructor
   * @link https://opendocs.alipay.com/mini/framework/app-detail
   */
  function App(opts: any): void;

  /**
   * Page's constructor
   * @link https://opendocs.alipay.com/mini/framework/page-detail
   */
  function Page(opts: any): void;

  export interface IAppOptions {
    /**
     * 生命周期回调：监听小程序初始化
     * 当小程序初始化完成时触发，全局只触发一次
     */
    onLaunch<Query = {}>(options: IAppOnLaunchOptions<Query>): void;
    /**
     * 生命周期回调：监听小程序显示
     * 当小程序启动，或从后台进入前台显示时触发
     */
    onShow<Query = {}>(options: IAppOnLaunchOptions<Query>): void;
    /**
     * 生命周期回调：监听小程序隐藏
     * 当当前页面被隐藏时触发，例如跳转、按下设备 Home 键离开
     */
    onHide(): void;
    /**
     * 监听小程序错误
     * 当小程序发生 js 错误时触发
     */
    onError(error: string): void;
    /**
     * 全局分享配置
     */
    onShareAppMessage(): IShareAppMessage;
    /**
     * 监听 unhandledrejection 事件
     * 当 Promise 被 reject 且没有 reject 处理器时，会触发 onUnhandledRejection 事件
     */
    onUnhandledRejection(res: IAppOnUnhandledRejectionRes): void;
  }
}
