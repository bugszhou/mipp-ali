import { IPageEvents } from "../mini-types/global/types/lib.global";

declare global {
  /**
   * Page()相关的类型声明：
   *
   * 1. 生命周期方法声明(ILifetime)
   *
   * 2. 生命周期函数形参类型声明
   *
   * 3. 分享返回值声明(ICustomShareContent)
   *
   * 4. 返回值类型
   */
  namespace IMippAliPage {
    /**
     * 生命周期方法:
     *
     * onLoad(query: any)
     *
     * onShow(): void
     *
     * onReady(): void
     *
     * onHide(): void
     *
     * onUnload(): void
     *
     * onPullDownRefresh(): void
     *
     * onReachBottom(): void
     *
     * onShareAppMessage(options: IMippWePage.IShareAppMessageOption): IMippWePage.ICustomShareContent | void
     *
     * onPageScroll(options: IMippWePage.IPageScrollOption): void
     */
    type ILifetime = Partial<IPageEvents>;
  }
}
