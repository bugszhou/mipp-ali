"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
exports.extendLifetime = exports.lifetime = exports.lifetimes = exports.pageLifetime = exports.method = void 0;
var rfdc_1 = __importDefault(require("rfdc"));
var rfdc_2 = __importDefault(require("rfdc"));
var lifetimesMappings = {
    created: "onInit",
    ready: "didMount",
    detached: "didUnmount",
    error: "onError",
};
var MiniComponent = /** @class */ (function () {
    function MiniComponent() {
        this.data = Object.create(null);
        this.viewStatus = "load";
        this.delProperties = ["constructor"];
        this.lifetimesMappings = {
            created: "onInit",
            ready: "didMount",
            detached: "didUnmount",
            error: "onError",
        };
    }
    MiniComponent.prototype.onInit = function () {
        // empty
    };
    MiniComponent.prototype.triggerEvent = function (eventName, data) {
        var _a, _b, _c, _d;
        var props = (_a = this) === null || _a === void 0 ? void 0 : _a.props;
        var dataset = Object.keys(props || {})
            .filter(function (property) { return property.startsWith("data-"); })
            .map(function (property) { return property.replace(/^data\-/, ""); })
            .reduce(function (prev, current) {
            prev[current] = props["data-" + current];
            return prev;
        }, {});
        (_d = (_c = (_b = this) === null || _b === void 0 ? void 0 : _b.props) === null || _c === void 0 ? void 0 : _c[eventName]) === null || _d === void 0 ? void 0 : _d.call(_c, {
            type: eventName,
            detail: data,
            currentTarget: {
                dataset: dataset || {},
            },
        });
    };
    MiniComponent.prototype.setDataAsync = function (data) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.setData(data, function () {
                resolve(void 0);
            });
        });
    };
    MiniComponent.before = function () {
        return Object.create(null);
    };
    MiniComponent.serialize = function (obj) {
        var _a, _b, _c, _d, _e, _f;
        var that = rfdc_2.default({ proto: true })(obj);
        var delProperties = __spreadArrays((Array.isArray(obj.delProperties) ? obj.delProperties : []));
        delProperties.forEach(function (item) {
            delete that[item];
        });
        try {
            if (typeof ((_a = that) === null || _a === void 0 ? void 0 : _a.properties) === "object") {
                that.props = (_b = that) === null || _b === void 0 ? void 0 : _b.properties;
                (_c = that) === null || _c === void 0 ? true : delete _c.properties;
            }
        }
        catch (e) {
            console.error(e);
        }
        var _that = that;
        if (!(_that === null || _that === void 0 ? void 0 : _that.lifetimes)) {
            _that.lifetimes = Object.create(null);
        }
        var beforeObj = (_d = MiniComponent === null || MiniComponent === void 0 ? void 0 : MiniComponent.before) === null || _d === void 0 ? void 0 : _d.call(MiniComponent);
        var createdFn = ((_e = _that === null || _that === void 0 ? void 0 : _that.lifetimes) === null || _e === void 0 ? void 0 : _e.created) || (_that === null || _that === void 0 ? void 0 : _that.created);
        _that.lifetimes.created = function created() {
            var _a, _b, _c, _d;
            var opts = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                opts[_i] = arguments[_i];
            }
            try {
                this.viewStatus = "load";
                (_b = (_a = beforeObj === null || beforeObj === void 0 ? void 0 : beforeObj.created) === null || _a === void 0 ? void 0 : _a.apply) === null || _b === void 0 ? void 0 : _b.call(_a, this, opts);
                (_c = this === null || this === void 0 ? void 0 : this.beforeCreated) === null || _c === void 0 ? void 0 : _c.call.apply(_c, __spreadArrays([this], opts));
            }
            catch (_e) { }
            return (_d = createdFn === null || createdFn === void 0 ? void 0 : createdFn.apply) === null || _d === void 0 ? void 0 : _d.call(createdFn, this, opts);
        };
        var readyFn = ((_f = _that === null || _that === void 0 ? void 0 : _that.lifetimes) === null || _f === void 0 ? void 0 : _f.ready) || (_that === null || _that === void 0 ? void 0 : _that.ready);
        _that.lifetimes.ready = function ready() {
            var _this = this;
            var _a, _b, _c, _d, _e, _f, _g;
            var opts = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                opts[_i] = arguments[_i];
            }
            try {
                if (this.viewStatus !== "ready") {
                    this.viewStatus = "ready";
                }
            }
            catch (_h) { }
            var isError = false;
            var beforeResult = null;
            try {
                beforeResult = (_a = beforeObj === null || beforeObj === void 0 ? void 0 : beforeObj.ready) === null || _a === void 0 ? void 0 : _a.apply(this, opts);
            }
            catch (e) {
                console.error(e);
                isError = true;
            }
            if (isError) {
                return;
            }
            isError = false;
            try {
                (_b = this === null || this === void 0 ? void 0 : this.beforeOnReady) === null || _b === void 0 ? void 0 : _b.call.apply(_b, __spreadArrays([this], opts));
            }
            catch (e) {
                console.error(e);
            }
            var readyResult = (_c = readyFn === null || readyFn === void 0 ? void 0 : readyFn.apply) === null || _c === void 0 ? void 0 : _c.call(readyFn, this, opts);
            if (typeof beforeResult === "object" &&
                typeof (beforeResult === null || beforeResult === void 0 ? void 0 : beforeResult.then) === "function") {
                (function () { return __awaiter(_this, void 0, void 0, function () {
                    var _a, _b, _c, _d;
                    return __generator(this, function (_e) {
                        switch (_e.label) {
                            case 0: return [4 /*yield*/, beforeResult];
                            case 1:
                                _e.sent();
                                return [4 /*yield*/, ((_b = (_a = this === null || this === void 0 ? void 0 : this.readyAsync) === null || _a === void 0 ? void 0 : _a.apply) === null || _b === void 0 ? void 0 : _b.call(_a, this, opts))];
                            case 2:
                                _e.sent();
                                return [4 /*yield*/, ((_d = (_c = this === null || this === void 0 ? void 0 : this.renderView) === null || _c === void 0 ? void 0 : _c.apply) === null || _d === void 0 ? void 0 : _d.call(_c, this, opts))];
                            case 3:
                                _e.sent();
                                return [2 /*return*/, readyResult];
                        }
                    });
                }); })();
            }
            else {
                (_e = (_d = this === null || this === void 0 ? void 0 : this.readyAsync) === null || _d === void 0 ? void 0 : _d.apply) === null || _e === void 0 ? void 0 : _e.call(_d, this, opts);
                (_g = (_f = this === null || this === void 0 ? void 0 : this.renderView) === null || _f === void 0 ? void 0 : _f.apply) === null || _g === void 0 ? void 0 : _g.call(_f, this, opts);
            }
            return readyResult;
        };
        var mappings = (obj === null || obj === void 0 ? void 0 : obj.lifetimesMappings) || lifetimesMappings || {};
        Object.keys(mappings).forEach(function (keyName) {
            var _a;
            if (_that[keyName]) {
                _that.lifetimes[mappings === null || mappings === void 0 ? void 0 : mappings[keyName]] = _that[keyName];
            }
            if ((_a = _that.lifetimes) === null || _a === void 0 ? void 0 : _a[keyName]) {
                _that.lifetimes[mappings === null || mappings === void 0 ? void 0 : mappings[keyName]] = _that.lifetimes[keyName];
            }
            try {
                delete _that[keyName];
                delete _that.lifetimes[keyName];
            }
            catch (e) {
                console.error(e);
            }
        });
        Object.keys((_that === null || _that === void 0 ? void 0 : _that.lifetimes) || {}).forEach(function (keyName) {
            var fn = _that[keyName];
            var lifetimesFn = _that === null || _that === void 0 ? void 0 : _that.lifetimes[keyName];
            _that[keyName] = function newFn() {
                var _a, _b;
                var opts = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    opts[_i] = arguments[_i];
                }
                var result = null;
                if (typeof fn === "function") {
                    result = (_a = fn === null || fn === void 0 ? void 0 : fn.apply) === null || _a === void 0 ? void 0 : _a.call(fn, this, opts);
                }
                if (typeof result === "object" && typeof (result === null || result === void 0 ? void 0 : result.then) === "function") {
                    var that_1 = this;
                    return (function runLifetimes() {
                        var _a;
                        return __awaiter(this, void 0, void 0, function () {
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0: return [4 /*yield*/, result];
                                    case 1:
                                        _b.sent();
                                        return [4 /*yield*/, ((_a = lifetimesFn === null || lifetimesFn === void 0 ? void 0 : lifetimesFn.apply) === null || _a === void 0 ? void 0 : _a.call(lifetimesFn, that_1, opts))];
                                    case 2: return [2 /*return*/, _b.sent()];
                                }
                            });
                        });
                    })();
                }
                return (_b = lifetimesFn === null || lifetimesFn === void 0 ? void 0 : lifetimesFn.apply) === null || _b === void 0 ? void 0 : _b.call(lifetimesFn, this, opts);
            };
        });
        if (!(_that === null || _that === void 0 ? void 0 : _that.methods)) {
            _that.methods = Object.create(null);
        }
        _that.methods.triggerEvent = _that.triggerEvent;
        _that.methods.setDataAsync = _that.setDataAsync;
        delete _that.triggerEvent;
        delete _that.setDataAsync;
        var fn = _that.deriveDataFromProps;
        var onInit = _that.onInit;
        try {
            Object.keys(_that.methods).forEach(function (keyName) {
                delete _that[keyName];
            });
            delete _that.delProperties;
            delete _that.lifetimes;
            delete _that.lifetimesMappings;
        }
        catch (e) {
            console.error(e);
        }
        _that.onInit = function () {
            var opts = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                opts[_i] = arguments[_i];
            }
            this.data = __assign(__assign({}, (this.data || {})), (this.props || {}));
            if (typeof onInit === "function") {
                onInit.apply(this, opts);
            }
        };
        _that.deriveDataFromProps = function (nextProps) {
            var _a, _b;
            var propsData = (_b = (_a = Object.keys(nextProps || {})) === null || _a === void 0 ? void 0 : _a.reduce) === null || _b === void 0 ? void 0 : _b.call(_a, function (pre, key) {
                if (typeof (nextProps === null || nextProps === void 0 ? void 0 : nextProps[key]) === "function") {
                    return pre;
                }
                pre[key] = nextProps === null || nextProps === void 0 ? void 0 : nextProps[key];
                return pre;
            }, Object.create(null));
            this.setData(__assign({}, (propsData || {})));
            if (typeof fn === "function") {
                fn.apply(this, [propsData]);
            }
        };
        return that;
    };
    MiniComponent.Component = function (componentIns) {
        MiniComponent.render(componentIns);
    };
    MiniComponent.render = function (componentIns) {
        Component(MiniComponent.serialize(componentIns));
    };
    return MiniComponent;
}());
exports.default = MiniComponent;
function method(UIInterface, methodName, descriptor) {
    var _a;
    var methods = rfdc_1.default()((_a = UIInterface === null || UIInterface === void 0 ? void 0 : UIInterface.methods) !== null && _a !== void 0 ? _a : Object.create(null));
    if (!UIInterface.hasOwnProperty("methods")) {
        UIInterface.methods = Object.create(null);
    }
    UIInterface.methods = __assign(__assign({}, UIInterface.methods), (methods !== null && methods !== void 0 ? methods : Object.create(null)));
    UIInterface.methods[methodName] = descriptor.value;
}
exports.method = method;
function pageLifetime(UIInterface, methodName, descriptor) {
    var onInit = UIInterface.onInit;
    UIInterface.onInit = function () {
        var _a, _b;
        var opts = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            opts[_i] = arguments[_i];
        }
        if (!(this === null || this === void 0 ? void 0 : this.$page)) {
            this.$page = Object.create(null);
        }
        if (!((_a = this === null || this === void 0 ? void 0 : this.$page) === null || _a === void 0 ? void 0 : _a.pageShow)) {
            this.$page.pageShow = [];
        }
        if (!((_b = this === null || this === void 0 ? void 0 : this.$page) === null || _b === void 0 ? void 0 : _b.pageHide)) {
            this.$page.pageHide = [];
        }
        if (methodName === "show") {
            this.$page.pageShow.push(descriptor.value.bind(this));
        }
        if (methodName === "hide") {
            this.$page.pageHide.push(descriptor.value.bind(this));
        }
        if (typeof onInit !== "function") {
            return;
        }
        return onInit.apply(this, opts);
    };
}
exports.pageLifetime = pageLifetime;
function lifetimes(UIInterface, methodName, descriptor) {
    var _a;
    var lifetimes = rfdc_1.default()((_a = UIInterface === null || UIInterface === void 0 ? void 0 : UIInterface.lifetimes) !== null && _a !== void 0 ? _a : Object.create(null));
    if (!UIInterface.hasOwnProperty("lifetimes")) {
        UIInterface.lifetimes = Object.create(null);
    }
    UIInterface.lifetimes = __assign(__assign({}, UIInterface.lifetimes), (lifetimes !== null && lifetimes !== void 0 ? lifetimes : Object.create(null)));
    var base = Object.getPrototypeOf(UIInterface);
    var fn = descriptor.value;
    UIInterface.lifetimes[methodName] = function lifetimesFn() {
        var opts = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            opts[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(typeof (base === null || base === void 0 ? void 0 : base.created) === "function")) return [3 /*break*/, 2];
                        return [4 /*yield*/, base.created.apply(this, opts)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, fn.apply(this, opts)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
}
exports.lifetimes = lifetimes;
function lifetime(UIInterface, methodName, descriptor) {
    var _a;
    var lifetimes = rfdc_1.default()((_a = UIInterface === null || UIInterface === void 0 ? void 0 : UIInterface.lifetimes) !== null && _a !== void 0 ? _a : Object.create(null));
    if (!UIInterface.hasOwnProperty("lifetimes")) {
        UIInterface.lifetimes = Object.create(null);
    }
    UIInterface.lifetimes = __assign(__assign({}, UIInterface.lifetimes), (lifetimes !== null && lifetimes !== void 0 ? lifetimes : Object.create(null)));
    UIInterface.lifetimes[methodName] = descriptor.value;
}
exports.lifetime = lifetime;
function extendLifetime(UIInterface, methodName, descriptor) {
    var _a;
    var lifetimes = rfdc_1.default()((_a = UIInterface === null || UIInterface === void 0 ? void 0 : UIInterface.lifetimes) !== null && _a !== void 0 ? _a : Object.create(null));
    if (!UIInterface.hasOwnProperty("lifetimes")) {
        UIInterface.lifetimes = Object.create(null);
    }
    UIInterface.lifetimes = __assign(__assign({}, UIInterface.lifetimes), (lifetimes !== null && lifetimes !== void 0 ? lifetimes : Object.create(null)));
    var beforeFn = UIInterface.lifetimes[methodName];
    var fn = descriptor.value;
    UIInterface.lifetimes[methodName] = function newLifetime() {
        var _a, _b;
        var opts = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            opts[_i] = arguments[_i];
        }
        var that = this;
        var currentResult = (_a = fn === null || fn === void 0 ? void 0 : fn.apply) === null || _a === void 0 ? void 0 : _a.call(fn, that, opts);
        if (typeof currentResult === "object" &&
            typeof (currentResult === null || currentResult === void 0 ? void 0 : currentResult.then) === "function") {
            return (function runLifetimes() {
                var _a;
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, currentResult];
                            case 1:
                                _b.sent();
                                return [4 /*yield*/, ((_a = beforeFn === null || beforeFn === void 0 ? void 0 : beforeFn.apply) === null || _a === void 0 ? void 0 : _a.call(beforeFn, that, opts))];
                            case 2: return [2 /*return*/, _b.sent()];
                        }
                    });
                });
            })();
        }
        return (_b = beforeFn === null || beforeFn === void 0 ? void 0 : beforeFn.apply) === null || _b === void 0 ? void 0 : _b.call(beforeFn, that, opts);
    };
}
exports.extendLifetime = extendLifetime;
