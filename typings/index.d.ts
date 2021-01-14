/// <reference path="./mini-types/types/index.d.ts" />
/// <reference path="./aliapp/index.d.ts" />
import { Base } from "./Base/Base";

declare class PageBase<IData extends Record<string, any>> extends Base<IData> {
  constructor(options?: any);
  get componentName(): string;
}
