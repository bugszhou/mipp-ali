# 升级`mini-typings`

- 需要修改`typings/mini-types/types/global.d.ts`中`getApp`声明

- 需要修改`typings/mini-types/types/app.d.ts`中`AppOptions`声明

```javascript
type AppOptions<G = any> = IAppOptionsMethods & {
  -globalData?: G,
  [name: string]: any,
} & ThisType<IAppInstance<G>>;
```

- 需要修改`typings/mini-types/types/api/open/tradePay.d.ts`中`ITradePayOptions`声明

```javascript
interface ITradePayOptions {
    /**
     * 接入小程序支付时传入此参数。此参数为支付宝交易号，注意参数有大小写区分。
     */
    tradeNO?: string;

    /**
     * 完整的支付参数拼接成的字符串，从服务端获取。
     */
    orderStr?: string;

    /**
     * 调用成功的回调函数
     */
    success?(res: ITradePaySuccessResult): void;

    /**
     * 调用失败的回调函数
     */
+    fail?(err: any): void;

    /**
     * 调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?(): void;
  }
```

- 需要修改`typings/mini-types/types/api/ui/navigator.d.ts`中`INavigateBaseCallbackOptions`声明

```javascript
interface INavigateBaseCallbackOptions {
    /**
     * 调用成功的回调函数
     */
    success?(): void;
    /**
     * 调用失败的回调函数
     */
+    fail?(err: any): void;
    /**
     * 调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?(): void;
  }
```
