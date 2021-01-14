"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Base = /** @class */ (function () {
    function Base() {
        this.data = {};
        this.delProperties = ["constructor"];
        return Base.serialize(this);
    }
    Object.defineProperty(Base.prototype, "componentName", {
        /**
         * 页面名称，注意唯一性
         */
        get: function () {
            return this.constructor.name;
        },
        enumerable: false,
        configurable: true
    });
    Base.serialize = function (obj) {
        var start = Date.now();
        var that = Object.create(null);
        var delProperties = __spreadArrays(obj.delProperties);
        var allProperties = __spreadArrays(Object.keys(obj), Object.keys(Object.getPrototypeOf(obj)));
        allProperties.forEach(function (key) {
            if (delProperties.includes(key)) {
                return;
            }
            that[key] = obj[key];
        });
        try {
            console.log(obj.componentName, " serialize time: ", Date.now() - start);
        }
        catch (e) {
            console.log(e);
        }
        return that;
    };
    return Base;
}());
exports.default = Base;
