# 升级`mini-typings`

* 需要修改`typings/mini-types/types/global.d.ts`中`getApp`声明

* 需要修改`typings/mini-types/types/app.d.ts`中`AppOptions`声明

```
type AppOptions<G = any> = IAppOptionsMethods
    & {
-        globalData?: G;
        [name: string]: any;
      }
    & ThisType<IAppInstance<G>>;
```
