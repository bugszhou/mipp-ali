import Base, { MiniPageBase } from "../dist/Page/Base";
import Component, {
  method as componentMethod,
  pageLifetime,
  lifetimes,
  lifetime,
  extendLifetime,
} from "../dist/Component/Base";

export const PageBase = Base;
export const MiniComponent = Component;
export const method = componentMethod;
export {
  pageLifetime,
  lifetimes,
  lifetime,
  extendLifetime,
  MiniComponent as ComponentBase,
  MiniPageBase as MiniPage,
};

export default {
  PageBase,
  MiniComponent,
  method,
  pageLifetime,
  lifetimes,
  lifetime,
  extendLifetime,
  ComponentBase: MiniComponent,
  MiniPage: MiniPageBase,
};
