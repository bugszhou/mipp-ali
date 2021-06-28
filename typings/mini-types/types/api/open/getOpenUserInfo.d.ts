/**
 * @file 客户端获取会员信息
 */
declare namespace my {
  interface IGetOpenUserInfoSuccessResult {
    /**
     * 错误码
     */
    readonly code: string;

    /**
     * 错误信息
     */
    readonly msg: string;

    /**
     * 用户昵称
     */
    readonly nickName: string;

    /**
     * 用户头像链接
     */
    readonly avatar: string;

    /**
     * 用户所在城市
     */
    readonly city: string;

    /**
     * 用户所在国家代码
     */
    readonly countryCode: string;

    /**
     * 用户性别
     */
    readonly gender: string;

    /**
     * 用户所在省份
     */
    readonly province: string;
  }

  interface IGetOpenUserInfoOptions {
    /**
     * 调用成功的回调函数
     */
    success?(result: IGetOpenUserInfoSuccessResult): void;

    /**
     * 调用失败的回调函数
     */
    fail?(err: any): void;

    /**
     * 调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?(): void;
  }

  /**
   * 客户端获取会员信息。
   */
  function getOpenUserInfo(options: IGetOpenUserInfoOptions): void;
}
