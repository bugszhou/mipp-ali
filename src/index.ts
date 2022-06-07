import Base from "../dist/Page/Base";
import Component, { method as componentMethod } from "../dist/Component/Base";

export const PageBase = Base;
export const MiniComponent = Component;
export const method = componentMethod;

export default {
  PageBase,
  MiniComponent,
  method,
};
