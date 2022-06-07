/// <reference path="./mini-types/alipay/types/index.d.ts" />
/// <reference path="./extends/global.d.ts" />
/// <reference path="./aliapp/index.d.ts" />
export * from "./Base/Base";

declare class PageBase<IData extends Record<string, any>> extends Base<IData> {
  constructor(options?: any);
  get componentName(): string;
}
