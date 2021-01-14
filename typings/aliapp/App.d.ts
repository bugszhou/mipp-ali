/**
 * App()相关的类型声明：
 *
 * 1. 生命周期方法声明(ILifetime)
 *
 * 2. 生命周期函数形参类型声明
 *
 */
declare namespace IMippAliApp {
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
  interface ILifetime extends Partial<tinyapp.IAppOptionsMethods> {}

  /**
   * 形参声明
   *
   * App中onLaunch和onShow事件的形参接口声明
   * @example onLaunch(options: ILaunchOption): void
   * @example onShow(options: ILaunchOption): void
   */
  interface ILaunchOption extends tinyapp.IAppLaunchOptions {}

  /**
   * 形参声明
   *
   * 全局分享配置
   * @example onShareAppMessage(options: IOnShareAppMessageOptions) => IOnShareAppMessageResult
   */
  type IOnShareAppMessageOptions = tinyapp.OnShareAppMessageOptions;

  /**
   * 返回值声明
   *
   * App中监听系统主题改变事件(onThemeChange)事件的形参接口声明
   * @example (result: OnThemeChangeCallbackResult) => void
   */
  interface IOnShareAppMessageResult
    extends tinyapp.IOnShareAppMessageResult {}
}
