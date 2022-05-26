import {
  IAppOnLaunchOptions,
  IShareAppMessage,
} from "../mini-types/global/types/lib.global";

declare global {
  /**
   * App()相关的类型声明：
   *
   * 1. 生命周期方法声明(ILifetime)
   *
   * 2. 生命周期函数形参类型声明
   *
   */
  namespace IMippAliApp {
    /**
     * 生命周期方法:
     *
     * onLaunch(options: ILaunchOption): void
     *
     * onShow(options: ILaunchOption): void
     *
     * onHide(): void
     *
     * onError(error: string): void // 错误信息，包含堆栈
     *
     * onShareAppMessage(options: IOnShareAppMessageOptions) => IOnShareAppMessageResult
     *
     */
    type ILifetime = Partial<IAppOptions>;

    /**
     * 形参声明
     *
     * App中onLaunch和onShow事件的形参接口声明
     * @example onLaunch(options: ILaunchOption): void
     * @example onShow(options: ILaunchOption): void
     */
    type ILaunchOption = IAppOnLaunchOptions<{}>;
    /**
     * 返回值声明
     *
     * App中监听系统主题改变事件(onThemeChange)事件的形参接口声明
     * @example (result: OnThemeChangeCallbackResult) => void
     */
    type IOnShareAppMessageResult = IShareAppMessage;
  }
}
