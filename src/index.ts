import Base from "../dist/Page/Base";
import Component, {
  method as componentMethod,
  pageLifetime,
  lifetimes,
} from "../dist/Component/Base";

export const PageBase = Base;
export const MiniComponent = Component;
export const method = componentMethod;
export { pageLifetime, lifetimes, MiniComponent as ComponentBase };

export default {
  PageBase,
  MiniComponent,
  method,
  pageLifetime,
  lifetimes,
  ComponentBase: MiniComponent,
};
