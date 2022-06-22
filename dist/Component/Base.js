"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.method = void 0;
var rfdc_1 = __importDefault(require("rfdc"));
var MiniComponent = /** @class */ (function () {
    function MiniComponent() {
        this.data = Object.create(null);
        this.delProperties = ["constructor"];
        return MiniComponent.serialize(this);
    }
    MiniComponent.prototype.triggerEvent = function (eventName, data) {
        this.props[eventName]({
            type: eventName,
            detail: data,
        });
    };
    MiniComponent.serialize = function (obj) {
        var _a;
        var that = rfdc_1.default({ proto: true })(obj);
        var delProperties = __spreadArrays((Array.isArray(obj.delProperties) ? obj.delProperties : []));
        delProperties.forEach(function (item) {
            delete that[item];
        });
        if (!((_a = that) === null || _a === void 0 ? void 0 : _a.methods)) {
            that.methods = Object.create(null);
        }
        that.methods.triggerEvent = obj.triggerEvent;
        return that;
    };
    MiniComponent.Component = function (componentIns) {
        MiniComponent.render(componentIns);
    };
    MiniComponent.render = function (componentIns) {
        Component(componentIns);
    };
    return MiniComponent;
}());
exports.default = MiniComponent;
function method(UIInterface, methodName, descriptor) {
    if (!UIInterface.methods) {
        UIInterface.methods = Object.create(null);
    }
    UIInterface.methods[methodName] = descriptor.value;
}
exports.method = method;
