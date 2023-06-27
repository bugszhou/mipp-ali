"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiniPage = exports.ComponentBase = exports.extendLifetime = exports.lifetime = exports.lifetimes = exports.pageLifetime = exports.method = exports.MiniComponent = exports.PageBase = void 0;
var Base_1 = __importStar(require("../dist/Page/Base"));
Object.defineProperty(exports, "MiniPage", { enumerable: true, get: function () { return Base_1.MiniPageBase; } });
var Base_2 = __importStar(require("../dist/Component/Base"));
Object.defineProperty(exports, "pageLifetime", { enumerable: true, get: function () { return Base_2.pageLifetime; } });
Object.defineProperty(exports, "lifetimes", { enumerable: true, get: function () { return Base_2.lifetimes; } });
Object.defineProperty(exports, "lifetime", { enumerable: true, get: function () { return Base_2.lifetime; } });
Object.defineProperty(exports, "extendLifetime", { enumerable: true, get: function () { return Base_2.extendLifetime; } });
exports.PageBase = Base_1.default;
exports.MiniComponent = Base_2.default;
exports.ComponentBase = exports.MiniComponent;
exports.method = Base_2.method;
exports.default = {
    PageBase: exports.PageBase,
    MiniComponent: exports.MiniComponent,
    method: exports.method,
    pageLifetime: Base_2.pageLifetime,
    lifetimes: Base_2.lifetimes,
    lifetime: Base_2.lifetime,
    extendLifetime: Base_2.extendLifetime,
    ComponentBase: exports.MiniComponent,
    MiniPage: Base_1.MiniPageBase,
};
