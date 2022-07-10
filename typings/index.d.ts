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
import { ComponentBase, IAliappComponentProperties } from "./Base/MiniBase";

export class PageBase<IData extends Record<string, any>> extends Base<IData> {
  constructor(options?: any);
  get componentName(): string;
}

export class MiniPage<IData extends Record<string, any>> extends Base<IData> {
  constructor(options?: any);
  get componentName(): string;
}

export interface IMiniEvent<
  IDetail = unknown,
  ICurrentTarget extends Record<string, unknown> = any,
  ITarget extends Record<string, unknown> = any
> {
  /** 事件类型 */
  type: string;
  /** 页面打开到触发事件所经过的毫秒数 */
  timeStamp: number;
  detail?: IDetail;
  target?: {
    dataset: ITarget;
  };
  currentTarget?: {
    dataset: ICurrentTarget;
  };
}

export {
  MiniComponent,
  method,
  lifetimes,
  pageLifetime,
  IComponentData,
  ComponentBase,
  IAliappComponentProperties,
};
