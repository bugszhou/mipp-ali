import { IPageInstance } from "../mini-types/global/types/lib.global";

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
}
