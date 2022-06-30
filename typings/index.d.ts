/// <reference path="./mini-types/alipay/types/index.d.ts" />
/// <reference path="./extends/global.d.ts" />
/// <reference path="./aliapp/index.d.ts" />
import {
  Base,
  MiniComponent,
  method,
  lifetimes,
  pageLifetime,
  IComponentData,
} from "./Base/Base";

export class PageBase<IData extends Record<string, any>> extends Base<IData> {
  constructor(options?: any);
  get componentName(): string;
}

export interface IMiniEvent<IDetail = unknown> {
  /** 事件类型 */
  type: string;
  /** 页面打开到触发事件所经过的毫秒数 */
  timeStamp: number;
  detail?: IDetail;
  target?: {
    dataset: Record<string, unknown>;
  };
  currentTarget?: {
    dataset: Record<string, unknown>;
  };
}

export { MiniComponent, method, lifetimes, pageLifetime, IComponentData };
