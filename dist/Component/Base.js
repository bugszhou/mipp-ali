"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.method = void 0;
var MiniComponent = /** @class */ (function () {
    function MiniComponent() {
        this.data = Object.create(null);
        console.log(this);
        Component(this);
    }
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
