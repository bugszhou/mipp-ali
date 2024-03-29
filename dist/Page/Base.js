"use strict";
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
exports.MiniPageBase = void 0;
var rfdc_1 = __importDefault(require("rfdc"));
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
    Base.prototype.setDataAsync = function (data) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.setData(data, function () {
                resolve(void 0);
            });
        });
    };
    Base.serialize = function (obj) {
        // const start = Date.now();
        var that = rfdc_1.default({ proto: true })(obj);
        var delProperties = __spreadArrays(obj.delProperties);
        var allProperties = __spreadArrays(Object.keys(obj), Object.keys(Object.getPrototypeOf(obj)));
        allProperties.forEach(function (key) {
            if (delProperties.includes(key)) {
                return;
            }
            that[key] = obj[key];
        });
        var onShow = that.onShow;
        that.onShow = function () {
            var opts = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                opts[_i] = arguments[_i];
            }
            return __awaiter(this, void 0, void 0, function () {
                var result;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(typeof onShow === "function")) return [3 /*break*/, 2];
                            return [4 /*yield*/, onShow.apply(this, opts)];
                        case 1:
                            result = _a.sent();
                            _a.label = 2;
                        case 2:
                            setTimeout(function () {
                                var _a;
                                if (Array.isArray(_this === null || _this === void 0 ? void 0 : _this.pageShow)) {
                                    (_a = _this === null || _this === void 0 ? void 0 : _this.pageShow) === null || _a === void 0 ? void 0 : _a.forEach(function (item) { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    if (!(typeof item === "function")) return [3 /*break*/, 2];
                                                    return [4 /*yield*/, item.apply(void 0, opts)];
                                                case 1:
                                                    _a.sent();
                                                    _a.label = 2;
                                                case 2: return [2 /*return*/];
                                            }
                                        });
                                    }); });
                                }
                            }, 0);
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        var onHide = that.onHide;
        that.onHide = function () {
            var opts = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                opts[_i] = arguments[_i];
            }
            return __awaiter(this, void 0, void 0, function () {
                var result;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(typeof onHide === "function")) return [3 /*break*/, 2];
                            return [4 /*yield*/, onHide.apply(this, opts)];
                        case 1:
                            result = _a.sent();
                            _a.label = 2;
                        case 2:
                            setTimeout(function () {
                                var _a;
                                if (Array.isArray(_this === null || _this === void 0 ? void 0 : _this.pageHide)) {
                                    (_a = _this === null || _this === void 0 ? void 0 : _this.pageHide) === null || _a === void 0 ? void 0 : _a.forEach(function (item) { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    if (!(typeof item === "function")) return [3 /*break*/, 2];
                                                    return [4 /*yield*/, item.apply(void 0, opts)];
                                                case 1:
                                                    _a.sent();
                                                    _a.label = 2;
                                                case 2: return [2 /*return*/];
                                            }
                                        });
                                    }); });
                                }
                            }, 0);
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        // try {
        //   console.log(obj.componentName, " serialize time: ", Date.now() - start);
        // } catch (e) {
        //   console.log(e);
        // }
        return that;
    };
    Base.render = function (ins) {
        Page(Base.serialize(ins));
    };
    return Base;
}());
exports.default = Base;
var MiniPageBase = /** @class */ (function () {
    function MiniPageBase() {
        this.data = {};
        // @ts-ignore
        this.delProperties = ["constructor"];
    }
    Object.defineProperty(MiniPageBase.prototype, "componentName", {
        /**
         * 页面名称，注意唯一性
         */
        get: function () {
            return this.constructor.name;
        },
        enumerable: false,
        configurable: true
    });
    MiniPageBase.prototype.setDataAsync = function (data) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.setData(data, function () {
                resolve(void 0);
            });
        });
    };
    MiniPageBase.before = function () {
        return Object.create(null);
    };
    MiniPageBase.serialize = function (obj) {
        var _a;
        var that = rfdc_1.default({ proto: true })(obj);
        var delProperties = __spreadArrays(obj.delProperties);
        var allProperties = __spreadArrays(Object.keys(obj), Object.keys(Object.getPrototypeOf(obj)));
        allProperties.forEach(function (key) {
            if (delProperties.includes(key)) {
                return;
            }
            that[key] = obj[key];
        });
        var beforeObj = (_a = MiniPageBase === null || MiniPageBase === void 0 ? void 0 : MiniPageBase.before) === null || _a === void 0 ? void 0 : _a.call(MiniPageBase);
        var onShow = that.onShow;
        that.onShow = function show() {
            var _this = this;
            var _a;
            var opts = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                opts[_i] = arguments[_i];
            }
            var result = (_a = onShow === null || onShow === void 0 ? void 0 : onShow.apply) === null || _a === void 0 ? void 0 : _a.call(onShow, this, opts);
            if (typeof result === "object" && typeof (result === null || result === void 0 ? void 0 : result.then) === "function") {
                return (function () { return __awaiter(_this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, result];
                            case 1:
                                result = _a.sent();
                                setTimeout(function () {
                                    (function () { return __awaiter(_this, void 0, void 0, function () {
                                        var i, item;
                                        var _a, _b;
                                        return __generator(this, function (_c) {
                                            switch (_c.label) {
                                                case 0:
                                                    if (!Array.isArray(this === null || this === void 0 ? void 0 : this.pageShow)) return [3 /*break*/, 4];
                                                    i = 0;
                                                    _c.label = 1;
                                                case 1:
                                                    if (!(i < ((_a = this === null || this === void 0 ? void 0 : this.pageShow) === null || _a === void 0 ? void 0 : _a.length))) return [3 /*break*/, 4];
                                                    item = (_b = this === null || this === void 0 ? void 0 : this.pageShow) === null || _b === void 0 ? void 0 : _b[i];
                                                    return [4 /*yield*/, (item === null || item === void 0 ? void 0 : item.apply(void 0, opts))];
                                                case 2:
                                                    _c.sent();
                                                    _c.label = 3;
                                                case 3:
                                                    ++i;
                                                    return [3 /*break*/, 1];
                                                case 4: return [2 /*return*/];
                                            }
                                        });
                                    }); })();
                                }, 0);
                                return [2 /*return*/, result];
                        }
                    });
                }); })();
            }
            setTimeout(function () {
                (function () { return __awaiter(_this, void 0, void 0, function () {
                    var i, item;
                    var _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                if (!Array.isArray(this === null || this === void 0 ? void 0 : this.pageShow)) return [3 /*break*/, 4];
                                i = 0;
                                _c.label = 1;
                            case 1:
                                if (!(i < ((_a = this === null || this === void 0 ? void 0 : this.pageShow) === null || _a === void 0 ? void 0 : _a.length))) return [3 /*break*/, 4];
                                item = (_b = this === null || this === void 0 ? void 0 : this.pageShow) === null || _b === void 0 ? void 0 : _b[i];
                                return [4 /*yield*/, (item === null || item === void 0 ? void 0 : item.apply(void 0, opts))];
                            case 2:
                                _c.sent();
                                _c.label = 3;
                            case 3:
                                ++i;
                                return [3 /*break*/, 1];
                            case 4: return [2 /*return*/];
                        }
                    });
                }); })();
            }, 0);
            return result;
        };
        var onHide = that.onHide;
        that.onHide = function hide() {
            var _this = this;
            var _a;
            var opts = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                opts[_i] = arguments[_i];
            }
            var result = (_a = onHide === null || onHide === void 0 ? void 0 : onHide.apply) === null || _a === void 0 ? void 0 : _a.call(onHide, this, opts);
            if (typeof result === "object" && typeof (result === null || result === void 0 ? void 0 : result.then) === "function") {
                return (function () { return __awaiter(_this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, result];
                            case 1:
                                result = _a.sent();
                                setTimeout(function () {
                                    (function () { return __awaiter(_this, void 0, void 0, function () {
                                        var i, item;
                                        var _a, _b;
                                        return __generator(this, function (_c) {
                                            switch (_c.label) {
                                                case 0:
                                                    if (!Array.isArray(this === null || this === void 0 ? void 0 : this.pageHide)) return [3 /*break*/, 4];
                                                    i = 0;
                                                    _c.label = 1;
                                                case 1:
                                                    if (!(i < ((_a = this === null || this === void 0 ? void 0 : this.pageHide) === null || _a === void 0 ? void 0 : _a.length))) return [3 /*break*/, 4];
                                                    item = (_b = this === null || this === void 0 ? void 0 : this.pageHide) === null || _b === void 0 ? void 0 : _b[i];
                                                    return [4 /*yield*/, (item === null || item === void 0 ? void 0 : item.apply(void 0, opts))];
                                                case 2:
                                                    _c.sent();
                                                    _c.label = 3;
                                                case 3:
                                                    ++i;
                                                    return [3 /*break*/, 1];
                                                case 4: return [2 /*return*/];
                                            }
                                        });
                                    }); })();
                                }, 0);
                                return [2 /*return*/, result];
                        }
                    });
                }); })();
            }
            setTimeout(function () {
                (function () { return __awaiter(_this, void 0, void 0, function () {
                    var i, item;
                    var _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                if (!Array.isArray(this === null || this === void 0 ? void 0 : this.pageHide)) return [3 /*break*/, 4];
                                i = 0;
                                _c.label = 1;
                            case 1:
                                if (!(i < ((_a = this === null || this === void 0 ? void 0 : this.pageHide) === null || _a === void 0 ? void 0 : _a.length))) return [3 /*break*/, 4];
                                item = (_b = this === null || this === void 0 ? void 0 : this.pageHide) === null || _b === void 0 ? void 0 : _b[i];
                                return [4 /*yield*/, (item === null || item === void 0 ? void 0 : item.apply(void 0, opts))];
                            case 2:
                                _c.sent();
                                _c.label = 3;
                            case 3:
                                ++i;
                                return [3 /*break*/, 1];
                            case 4: return [2 /*return*/];
                        }
                    });
                }); })();
            }, 0);
            return result;
        };
        var createdFn = that === null || that === void 0 ? void 0 : that.onLoad;
        that.onLoad = function created() {
            var _a, _b, _c;
            var opts = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                opts[_i] = arguments[_i];
            }
            this.viewStatus = "load";
            var isError = false;
            try {
                (_a = beforeObj === null || beforeObj === void 0 ? void 0 : beforeObj.onLoad) === null || _a === void 0 ? void 0 : _a.apply(this, opts);
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
                (_b = this === null || this === void 0 ? void 0 : this.beforeOnLoad) === null || _b === void 0 ? void 0 : _b.call.apply(_b, __spreadArrays([this], opts));
            }
            catch (e) {
                console.error(e);
            }
            return (_c = createdFn === null || createdFn === void 0 ? void 0 : createdFn.apply) === null || _c === void 0 ? void 0 : _c.call(createdFn, this, opts);
        };
        var readyFn = that === null || that === void 0 ? void 0 : that.onReady;
        that.onReady = function ready() {
            var _this = this;
            var _a, _b, _c, _d, _e, _f;
            var opts = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                opts[_i] = arguments[_i];
            }
            try {
                if (this.viewStatus !== "ready") {
                    this.viewStatus = "ready";
                }
            }
            catch (_g) { }
            var isError = false;
            var beforeResult = null;
            try {
                beforeResult = (_a = beforeObj === null || beforeObj === void 0 ? void 0 : beforeObj.onReady) === null || _a === void 0 ? void 0 : _a.apply(this, opts);
            }
            catch (e) {
                console.error(e);
                isError = true;
            }
            if (isError) {
                return;
            }
            isError = false;
            var readyResult = (_b = readyFn === null || readyFn === void 0 ? void 0 : readyFn.apply) === null || _b === void 0 ? void 0 : _b.call(readyFn, this, opts);
            if (typeof beforeResult === "object" &&
                typeof (beforeResult === null || beforeResult === void 0 ? void 0 : beforeResult.then) === "function") {
                (function () { return __awaiter(_this, void 0, void 0, function () {
                    var _a, _b, _c, _d;
                    return __generator(this, function (_e) {
                        switch (_e.label) {
                            case 0: return [4 /*yield*/, beforeResult];
                            case 1:
                                _e.sent();
                                return [4 /*yield*/, ((_b = (_a = that === null || that === void 0 ? void 0 : that.onReadyAsync) === null || _a === void 0 ? void 0 : _a.apply) === null || _b === void 0 ? void 0 : _b.call(_a, this, opts))];
                            case 2:
                                _e.sent();
                                return [4 /*yield*/, ((_d = (_c = that === null || that === void 0 ? void 0 : that.renderView) === null || _c === void 0 ? void 0 : _c.apply) === null || _d === void 0 ? void 0 : _d.call(_c, this, opts))];
                            case 3:
                                _e.sent();
                                return [2 /*return*/, readyResult];
                        }
                    });
                }); })();
            }
            else {
                (_d = (_c = that === null || that === void 0 ? void 0 : that.onReadyAsync) === null || _c === void 0 ? void 0 : _c.apply) === null || _d === void 0 ? void 0 : _d.call(_c, this, opts);
                (_f = (_e = that === null || that === void 0 ? void 0 : that.renderView) === null || _e === void 0 ? void 0 : _e.apply) === null || _f === void 0 ? void 0 : _f.call(_e, this, opts);
            }
            return readyResult;
        };
        return that;
    };
    MiniPageBase.render = function (ins) {
        Page(MiniPageBase.serialize(ins));
    };
    return MiniPageBase;
}());
exports.MiniPageBase = MiniPageBase;
