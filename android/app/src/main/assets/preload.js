"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require2() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

  // node_modules/path-browserify/index.js
  var require_path_browserify = __commonJS({
    "node_modules/path-browserify/index.js"(exports, module) {
      "use strict";
      function assertPath(path) {
        if (typeof path !== "string") {
          throw new TypeError("Path must be a string. Received " + JSON.stringify(path));
        }
      }
      function normalizeStringPosix(path, allowAboveRoot) {
        var res = "";
        var lastSegmentLength = 0;
        var lastSlash = -1;
        var dots = 0;
        var code;
        for (var i = 0; i <= path.length; ++i) {
          if (i < path.length)
            code = path.charCodeAt(i);
          else if (code === 47)
            break;
          else
            code = 47;
          if (code === 47) {
            if (lastSlash === i - 1 || dots === 1) {
            } else if (lastSlash !== i - 1 && dots === 2) {
              if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 || res.charCodeAt(res.length - 2) !== 46) {
                if (res.length > 2) {
                  var lastSlashIndex = res.lastIndexOf("/");
                  if (lastSlashIndex !== res.length - 1) {
                    if (lastSlashIndex === -1) {
                      res = "";
                      lastSegmentLength = 0;
                    } else {
                      res = res.slice(0, lastSlashIndex);
                      lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
                    }
                    lastSlash = i;
                    dots = 0;
                    continue;
                  }
                } else if (res.length === 2 || res.length === 1) {
                  res = "";
                  lastSegmentLength = 0;
                  lastSlash = i;
                  dots = 0;
                  continue;
                }
              }
              if (allowAboveRoot) {
                if (res.length > 0)
                  res += "/..";
                else
                  res = "..";
                lastSegmentLength = 2;
              }
            } else {
              if (res.length > 0)
                res += "/" + path.slice(lastSlash + 1, i);
              else
                res = path.slice(lastSlash + 1, i);
              lastSegmentLength = i - lastSlash - 1;
            }
            lastSlash = i;
            dots = 0;
          } else if (code === 46 && dots !== -1) {
            ++dots;
          } else {
            dots = -1;
          }
        }
        return res;
      }
      function _format(sep, pathObject) {
        var dir = pathObject.dir || pathObject.root;
        var base = pathObject.base || (pathObject.name || "") + (pathObject.ext || "");
        if (!dir) {
          return base;
        }
        if (dir === pathObject.root) {
          return dir + base;
        }
        return dir + sep + base;
      }
      var posix = {
        // path.resolve([from ...], to)
        resolve: function resolve2() {
          var resolvedPath = "";
          var resolvedAbsolute = false;
          var cwd;
          for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
            var path;
            if (i >= 0)
              path = arguments[i];
            else {
              if (cwd === void 0)
                cwd = process.cwd();
              path = cwd;
            }
            assertPath(path);
            if (path.length === 0) {
              continue;
            }
            resolvedPath = path + "/" + resolvedPath;
            resolvedAbsolute = path.charCodeAt(0) === 47;
          }
          resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);
          if (resolvedAbsolute) {
            if (resolvedPath.length > 0)
              return "/" + resolvedPath;
            else
              return "/";
          } else if (resolvedPath.length > 0) {
            return resolvedPath;
          } else {
            return ".";
          }
        },
        normalize: function normalize(path) {
          assertPath(path);
          if (path.length === 0) return ".";
          var isAbsolute = path.charCodeAt(0) === 47;
          var trailingSeparator = path.charCodeAt(path.length - 1) === 47;
          path = normalizeStringPosix(path, !isAbsolute);
          if (path.length === 0 && !isAbsolute) path = ".";
          if (path.length > 0 && trailingSeparator) path += "/";
          if (isAbsolute) return "/" + path;
          return path;
        },
        isAbsolute: function isAbsolute(path) {
          assertPath(path);
          return path.length > 0 && path.charCodeAt(0) === 47;
        },
        join: function join5() {
          if (arguments.length === 0)
            return ".";
          var joined;
          for (var i = 0; i < arguments.length; ++i) {
            var arg = arguments[i];
            assertPath(arg);
            if (arg.length > 0) {
              if (joined === void 0)
                joined = arg;
              else
                joined += "/" + arg;
            }
          }
          if (joined === void 0)
            return ".";
          return posix.normalize(joined);
        },
        relative: function relative(from, to) {
          assertPath(from);
          assertPath(to);
          if (from === to) return "";
          from = posix.resolve(from);
          to = posix.resolve(to);
          if (from === to) return "";
          var fromStart = 1;
          for (; fromStart < from.length; ++fromStart) {
            if (from.charCodeAt(fromStart) !== 47)
              break;
          }
          var fromEnd = from.length;
          var fromLen = fromEnd - fromStart;
          var toStart = 1;
          for (; toStart < to.length; ++toStart) {
            if (to.charCodeAt(toStart) !== 47)
              break;
          }
          var toEnd = to.length;
          var toLen = toEnd - toStart;
          var length = fromLen < toLen ? fromLen : toLen;
          var lastCommonSep = -1;
          var i = 0;
          for (; i <= length; ++i) {
            if (i === length) {
              if (toLen > length) {
                if (to.charCodeAt(toStart + i) === 47) {
                  return to.slice(toStart + i + 1);
                } else if (i === 0) {
                  return to.slice(toStart + i);
                }
              } else if (fromLen > length) {
                if (from.charCodeAt(fromStart + i) === 47) {
                  lastCommonSep = i;
                } else if (i === 0) {
                  lastCommonSep = 0;
                }
              }
              break;
            }
            var fromCode = from.charCodeAt(fromStart + i);
            var toCode = to.charCodeAt(toStart + i);
            if (fromCode !== toCode)
              break;
            else if (fromCode === 47)
              lastCommonSep = i;
          }
          var out = "";
          for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
            if (i === fromEnd || from.charCodeAt(i) === 47) {
              if (out.length === 0)
                out += "..";
              else
                out += "/..";
            }
          }
          if (out.length > 0)
            return out + to.slice(toStart + lastCommonSep);
          else {
            toStart += lastCommonSep;
            if (to.charCodeAt(toStart) === 47)
              ++toStart;
            return to.slice(toStart);
          }
        },
        _makeLong: function _makeLong(path) {
          return path;
        },
        dirname: function dirname(path) {
          assertPath(path);
          if (path.length === 0) return ".";
          var code = path.charCodeAt(0);
          var hasRoot = code === 47;
          var end = -1;
          var matchedSlash = true;
          for (var i = path.length - 1; i >= 1; --i) {
            code = path.charCodeAt(i);
            if (code === 47) {
              if (!matchedSlash) {
                end = i;
                break;
              }
            } else {
              matchedSlash = false;
            }
          }
          if (end === -1) return hasRoot ? "/" : ".";
          if (hasRoot && end === 1) return "//";
          return path.slice(0, end);
        },
        basename: function basename2(path, ext) {
          if (ext !== void 0 && typeof ext !== "string") throw new TypeError('"ext" argument must be a string');
          assertPath(path);
          var start = 0;
          var end = -1;
          var matchedSlash = true;
          var i;
          if (ext !== void 0 && ext.length > 0 && ext.length <= path.length) {
            if (ext.length === path.length && ext === path) return "";
            var extIdx = ext.length - 1;
            var firstNonSlashEnd = -1;
            for (i = path.length - 1; i >= 0; --i) {
              var code = path.charCodeAt(i);
              if (code === 47) {
                if (!matchedSlash) {
                  start = i + 1;
                  break;
                }
              } else {
                if (firstNonSlashEnd === -1) {
                  matchedSlash = false;
                  firstNonSlashEnd = i + 1;
                }
                if (extIdx >= 0) {
                  if (code === ext.charCodeAt(extIdx)) {
                    if (--extIdx === -1) {
                      end = i;
                    }
                  } else {
                    extIdx = -1;
                    end = firstNonSlashEnd;
                  }
                }
              }
            }
            if (start === end) end = firstNonSlashEnd;
            else if (end === -1) end = path.length;
            return path.slice(start, end);
          } else {
            for (i = path.length - 1; i >= 0; --i) {
              if (path.charCodeAt(i) === 47) {
                if (!matchedSlash) {
                  start = i + 1;
                  break;
                }
              } else if (end === -1) {
                matchedSlash = false;
                end = i + 1;
              }
            }
            if (end === -1) return "";
            return path.slice(start, end);
          }
        },
        extname: function extname(path) {
          assertPath(path);
          var startDot = -1;
          var startPart = 0;
          var end = -1;
          var matchedSlash = true;
          var preDotState = 0;
          for (var i = path.length - 1; i >= 0; --i) {
            var code = path.charCodeAt(i);
            if (code === 47) {
              if (!matchedSlash) {
                startPart = i + 1;
                break;
              }
              continue;
            }
            if (end === -1) {
              matchedSlash = false;
              end = i + 1;
            }
            if (code === 46) {
              if (startDot === -1)
                startDot = i;
              else if (preDotState !== 1)
                preDotState = 1;
            } else if (startDot !== -1) {
              preDotState = -1;
            }
          }
          if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
          preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
          preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
            return "";
          }
          return path.slice(startDot, end);
        },
        format: function format(pathObject) {
          if (pathObject === null || typeof pathObject !== "object") {
            throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof pathObject);
          }
          return _format("/", pathObject);
        },
        parse: function parse(path) {
          assertPath(path);
          var ret = { root: "", dir: "", base: "", ext: "", name: "" };
          if (path.length === 0) return ret;
          var code = path.charCodeAt(0);
          var isAbsolute = code === 47;
          var start;
          if (isAbsolute) {
            ret.root = "/";
            start = 1;
          } else {
            start = 0;
          }
          var startDot = -1;
          var startPart = 0;
          var end = -1;
          var matchedSlash = true;
          var i = path.length - 1;
          var preDotState = 0;
          for (; i >= start; --i) {
            code = path.charCodeAt(i);
            if (code === 47) {
              if (!matchedSlash) {
                startPart = i + 1;
                break;
              }
              continue;
            }
            if (end === -1) {
              matchedSlash = false;
              end = i + 1;
            }
            if (code === 46) {
              if (startDot === -1) startDot = i;
              else if (preDotState !== 1) preDotState = 1;
            } else if (startDot !== -1) {
              preDotState = -1;
            }
          }
          if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
          preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
          preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
            if (end !== -1) {
              if (startPart === 0 && isAbsolute) ret.base = ret.name = path.slice(1, end);
              else ret.base = ret.name = path.slice(startPart, end);
            }
          } else {
            if (startPart === 0 && isAbsolute) {
              ret.name = path.slice(1, startDot);
              ret.base = path.slice(1, end);
            } else {
              ret.name = path.slice(startPart, startDot);
              ret.base = path.slice(startPart, end);
            }
            ret.ext = path.slice(startDot, end);
          }
          if (startPart > 0) ret.dir = path.slice(0, startPart - 1);
          else if (isAbsolute) ret.dir = "/";
          return ret;
        },
        sep: "/",
        delimiter: ":",
        win32: null,
        posix: null
      };
      posix.posix = posix;
      module.exports = posix;
    }
  });

  // node_modules/@capacitor/core/dist/index.js
  var ExceptionCode, CapacitorException, getPlatformId, createCapacitor, initCapacitorGlobal, Capacitor, registerPlugin, WebPlugin, encode, decode, CapacitorCookiesPluginWeb, CapacitorCookies, readBlobAsBase64, normalizeHttpHeaders, buildUrlParams, buildRequestInit, CapacitorHttpPluginWeb, CapacitorHttp, SystemBarsStyle, SystemBarType, SystemBarsPluginWeb, SystemBars;
  var init_dist = __esm({
    "node_modules/@capacitor/core/dist/index.js"() {
      (function(ExceptionCode2) {
        ExceptionCode2["Unimplemented"] = "UNIMPLEMENTED";
        ExceptionCode2["Unavailable"] = "UNAVAILABLE";
      })(ExceptionCode || (ExceptionCode = {}));
      CapacitorException = class extends Error {
        constructor(message, code, data) {
          super(message);
          this.message = message;
          this.code = code;
          this.data = data;
        }
      };
      getPlatformId = (win) => {
        var _a, _b;
        if (win === null || win === void 0 ? void 0 : win.androidBridge) {
          return "android";
        } else if ((_b = (_a = win === null || win === void 0 ? void 0 : win.webkit) === null || _a === void 0 ? void 0 : _a.messageHandlers) === null || _b === void 0 ? void 0 : _b.bridge) {
          return "ios";
        } else {
          return "web";
        }
      };
      createCapacitor = (win) => {
        const capCustomPlatform = win.CapacitorCustomPlatform || null;
        const cap = win.Capacitor || {};
        const Plugins = cap.Plugins = cap.Plugins || {};
        const getPlatform = () => {
          return capCustomPlatform !== null ? capCustomPlatform.name : getPlatformId(win);
        };
        const isNativePlatform = () => getPlatform() !== "web";
        const isPluginAvailable = (pluginName) => {
          const plugin = registeredPlugins.get(pluginName);
          if (plugin === null || plugin === void 0 ? void 0 : plugin.platforms.has(getPlatform())) {
            return true;
          }
          if (getPluginHeader(pluginName)) {
            return true;
          }
          return false;
        };
        const getPluginHeader = (pluginName) => {
          var _a;
          return (_a = cap.PluginHeaders) === null || _a === void 0 ? void 0 : _a.find((h) => h.name === pluginName);
        };
        const handleError = (err) => win.console.error(err);
        const registeredPlugins = /* @__PURE__ */ new Map();
        const registerPlugin2 = (pluginName, jsImplementations = {}) => {
          const registeredPlugin = registeredPlugins.get(pluginName);
          if (registeredPlugin) {
            console.warn(`Capacitor plugin "${pluginName}" already registered. Cannot register plugins twice.`);
            return registeredPlugin.proxy;
          }
          const platform = getPlatform();
          const pluginHeader = getPluginHeader(pluginName);
          let jsImplementation;
          const loadPluginImplementation = async () => {
            if (!jsImplementation && platform in jsImplementations) {
              jsImplementation = typeof jsImplementations[platform] === "function" ? jsImplementation = await jsImplementations[platform]() : jsImplementation = jsImplementations[platform];
            } else if (capCustomPlatform !== null && !jsImplementation && "web" in jsImplementations) {
              jsImplementation = typeof jsImplementations["web"] === "function" ? jsImplementation = await jsImplementations["web"]() : jsImplementation = jsImplementations["web"];
            }
            return jsImplementation;
          };
          const createPluginMethod = (impl, prop) => {
            var _a, _b;
            if (pluginHeader) {
              const methodHeader = pluginHeader === null || pluginHeader === void 0 ? void 0 : pluginHeader.methods.find((m) => prop === m.name);
              if (methodHeader) {
                if (methodHeader.rtype === "promise") {
                  return (options) => cap.nativePromise(pluginName, prop.toString(), options);
                } else {
                  return (options, callback) => cap.nativeCallback(pluginName, prop.toString(), options, callback);
                }
              } else if (impl) {
                return (_a = impl[prop]) === null || _a === void 0 ? void 0 : _a.bind(impl);
              }
            } else if (impl) {
              return (_b = impl[prop]) === null || _b === void 0 ? void 0 : _b.bind(impl);
            } else {
              throw new CapacitorException(`"${pluginName}" plugin is not implemented on ${platform}`, ExceptionCode.Unimplemented);
            }
          };
          const createPluginMethodWrapper = (prop) => {
            let remove;
            const wrapper = (...args) => {
              const p = loadPluginImplementation().then((impl) => {
                const fn = createPluginMethod(impl, prop);
                if (fn) {
                  const p2 = fn(...args);
                  remove = p2 === null || p2 === void 0 ? void 0 : p2.remove;
                  return p2;
                } else {
                  throw new CapacitorException(`"${pluginName}.${prop}()" is not implemented on ${platform}`, ExceptionCode.Unimplemented);
                }
              });
              if (prop === "addListener") {
                p.remove = async () => remove();
              }
              return p;
            };
            wrapper.toString = () => `${prop.toString()}() { [capacitor code] }`;
            Object.defineProperty(wrapper, "name", {
              value: prop,
              writable: false,
              configurable: false
            });
            return wrapper;
          };
          const addListener = createPluginMethodWrapper("addListener");
          const removeListener = createPluginMethodWrapper("removeListener");
          const addListenerNative = (eventName, callback) => {
            const call = addListener({ eventName }, callback);
            const remove = async () => {
              const callbackId = await call;
              removeListener({
                eventName,
                callbackId
              }, callback);
            };
            const p = new Promise((resolve2) => call.then(() => resolve2({ remove })));
            p.remove = async () => {
              console.warn(`Using addListener() without 'await' is deprecated.`);
              await remove();
            };
            return p;
          };
          const proxy = new Proxy({}, {
            get(_, prop) {
              switch (prop) {
                // https://github.com/facebook/react/issues/20030
                case "$$typeof":
                  return void 0;
                case "toJSON":
                  return () => ({});
                case "addListener":
                  return pluginHeader ? addListenerNative : addListener;
                case "removeListener":
                  return removeListener;
                default:
                  return createPluginMethodWrapper(prop);
              }
            }
          });
          Plugins[pluginName] = proxy;
          registeredPlugins.set(pluginName, {
            name: pluginName,
            proxy,
            platforms: /* @__PURE__ */ new Set([...Object.keys(jsImplementations), ...pluginHeader ? [platform] : []])
          });
          return proxy;
        };
        if (!cap.convertFileSrc) {
          cap.convertFileSrc = (filePath) => filePath;
        }
        cap.getPlatform = getPlatform;
        cap.handleError = handleError;
        cap.isNativePlatform = isNativePlatform;
        cap.isPluginAvailable = isPluginAvailable;
        cap.registerPlugin = registerPlugin2;
        cap.Exception = CapacitorException;
        cap.DEBUG = !!cap.DEBUG;
        cap.isLoggingEnabled = !!cap.isLoggingEnabled;
        return cap;
      };
      initCapacitorGlobal = (win) => win.Capacitor = createCapacitor(win);
      Capacitor = /* @__PURE__ */ initCapacitorGlobal(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
      registerPlugin = Capacitor.registerPlugin;
      WebPlugin = class {
        constructor() {
          this.listeners = {};
          this.retainedEventArguments = {};
          this.windowListeners = {};
        }
        addListener(eventName, listenerFunc) {
          let firstListener = false;
          const listeners = this.listeners[eventName];
          if (!listeners) {
            this.listeners[eventName] = [];
            firstListener = true;
          }
          this.listeners[eventName].push(listenerFunc);
          const windowListener = this.windowListeners[eventName];
          if (windowListener && !windowListener.registered) {
            this.addWindowListener(windowListener);
          }
          if (firstListener) {
            this.sendRetainedArgumentsForEvent(eventName);
          }
          const remove = async () => this.removeListener(eventName, listenerFunc);
          const p = Promise.resolve({ remove });
          return p;
        }
        async removeAllListeners() {
          this.listeners = {};
          for (const listener in this.windowListeners) {
            this.removeWindowListener(this.windowListeners[listener]);
          }
          this.windowListeners = {};
        }
        notifyListeners(eventName, data, retainUntilConsumed) {
          const listeners = this.listeners[eventName];
          if (!listeners) {
            if (retainUntilConsumed) {
              let args = this.retainedEventArguments[eventName];
              if (!args) {
                args = [];
              }
              args.push(data);
              this.retainedEventArguments[eventName] = args;
            }
            return;
          }
          listeners.forEach((listener) => listener(data));
        }
        hasListeners(eventName) {
          var _a;
          return !!((_a = this.listeners[eventName]) === null || _a === void 0 ? void 0 : _a.length);
        }
        registerWindowListener(windowEventName, pluginEventName) {
          this.windowListeners[pluginEventName] = {
            registered: false,
            windowEventName,
            pluginEventName,
            handler: (event) => {
              this.notifyListeners(pluginEventName, event);
            }
          };
        }
        unimplemented(msg = "not implemented") {
          return new Capacitor.Exception(msg, ExceptionCode.Unimplemented);
        }
        unavailable(msg = "not available") {
          return new Capacitor.Exception(msg, ExceptionCode.Unavailable);
        }
        async removeListener(eventName, listenerFunc) {
          const listeners = this.listeners[eventName];
          if (!listeners) {
            return;
          }
          const index = listeners.indexOf(listenerFunc);
          this.listeners[eventName].splice(index, 1);
          if (!this.listeners[eventName].length) {
            this.removeWindowListener(this.windowListeners[eventName]);
          }
        }
        addWindowListener(handle) {
          window.addEventListener(handle.windowEventName, handle.handler);
          handle.registered = true;
        }
        removeWindowListener(handle) {
          if (!handle) {
            return;
          }
          window.removeEventListener(handle.windowEventName, handle.handler);
          handle.registered = false;
        }
        sendRetainedArgumentsForEvent(eventName) {
          const args = this.retainedEventArguments[eventName];
          if (!args) {
            return;
          }
          delete this.retainedEventArguments[eventName];
          args.forEach((arg) => {
            this.notifyListeners(eventName, arg);
          });
        }
      };
      encode = (str) => encodeURIComponent(str).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape);
      decode = (str) => str.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
      CapacitorCookiesPluginWeb = class extends WebPlugin {
        async getCookies() {
          const cookies = document.cookie;
          const cookieMap = {};
          cookies.split(";").forEach((cookie) => {
            if (cookie.length <= 0)
              return;
            let [key, value] = cookie.replace(/=/, "CAP_COOKIE").split("CAP_COOKIE");
            key = decode(key).trim();
            value = decode(value).trim();
            cookieMap[key] = value;
          });
          return cookieMap;
        }
        async setCookie(options) {
          try {
            const encodedKey = encode(options.key);
            const encodedValue = encode(options.value);
            const expires = `; expires=${(options.expires || "").replace("expires=", "")}`;
            const path = (options.path || "/").replace("path=", "");
            const domain = options.url != null && options.url.length > 0 ? `domain=${options.url}` : "";
            document.cookie = `${encodedKey}=${encodedValue || ""}${expires}; path=${path}; ${domain};`;
          } catch (error) {
            return Promise.reject(error);
          }
        }
        async deleteCookie(options) {
          try {
            document.cookie = `${options.key}=; Max-Age=0`;
          } catch (error) {
            return Promise.reject(error);
          }
        }
        async clearCookies() {
          try {
            const cookies = document.cookie.split(";") || [];
            for (const cookie of cookies) {
              document.cookie = cookie.replace(/^ +/, "").replace(/=.*/, `=;expires=${(/* @__PURE__ */ new Date()).toUTCString()};path=/`);
            }
          } catch (error) {
            return Promise.reject(error);
          }
        }
        async clearAllCookies() {
          try {
            await this.clearCookies();
          } catch (error) {
            return Promise.reject(error);
          }
        }
      };
      CapacitorCookies = registerPlugin("CapacitorCookies", {
        web: () => new CapacitorCookiesPluginWeb()
      });
      readBlobAsBase64 = async (blob) => new Promise((resolve2, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const base64String = reader.result;
          resolve2(base64String.indexOf(",") >= 0 ? base64String.split(",")[1] : base64String);
        };
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(blob);
      });
      normalizeHttpHeaders = (headers = {}) => {
        const originalKeys = Object.keys(headers);
        const loweredKeys = Object.keys(headers).map((k) => k.toLocaleLowerCase());
        const normalized = loweredKeys.reduce((acc, key, index) => {
          acc[key] = headers[originalKeys[index]];
          return acc;
        }, {});
        return normalized;
      };
      buildUrlParams = (params, shouldEncode = true) => {
        if (!params)
          return null;
        const output = Object.entries(params).reduce((accumulator, entry) => {
          const [key, value] = entry;
          let encodedValue;
          let item;
          if (Array.isArray(value)) {
            item = "";
            value.forEach((str) => {
              encodedValue = shouldEncode ? encodeURIComponent(str) : str;
              item += `${key}=${encodedValue}&`;
            });
            item.slice(0, -1);
          } else {
            encodedValue = shouldEncode ? encodeURIComponent(value) : value;
            item = `${key}=${encodedValue}`;
          }
          return `${accumulator}&${item}`;
        }, "");
        return output.substr(1);
      };
      buildRequestInit = (options, extra = {}) => {
        const output = Object.assign({ method: options.method || "GET", headers: options.headers }, extra);
        const headers = normalizeHttpHeaders(options.headers);
        const type = headers["content-type"] || "";
        if (typeof options.data === "string") {
          output.body = options.data;
        } else if (type.includes("application/x-www-form-urlencoded")) {
          const params = new URLSearchParams();
          for (const [key, value] of Object.entries(options.data || {})) {
            params.set(key, value);
          }
          output.body = params.toString();
        } else if (type.includes("multipart/form-data") || options.data instanceof FormData) {
          const form = new FormData();
          if (options.data instanceof FormData) {
            options.data.forEach((value, key) => {
              form.append(key, value);
            });
          } else {
            for (const key of Object.keys(options.data)) {
              form.append(key, options.data[key]);
            }
          }
          output.body = form;
          const headers2 = new Headers(output.headers);
          headers2.delete("content-type");
          output.headers = headers2;
        } else if (type.includes("application/json") || typeof options.data === "object") {
          output.body = JSON.stringify(options.data);
        }
        return output;
      };
      CapacitorHttpPluginWeb = class extends WebPlugin {
        /**
         * Perform an Http request given a set of options
         * @param options Options to build the HTTP request
         */
        async request(options) {
          const requestInit = buildRequestInit(options, options.webFetchExtra);
          const urlParams = buildUrlParams(options.params, options.shouldEncodeUrlParams);
          const url = urlParams ? `${options.url}?${urlParams}` : options.url;
          const response = await fetch(url, requestInit);
          const contentType = response.headers.get("content-type") || "";
          let { responseType = "text" } = response.ok ? options : {};
          if (contentType.includes("application/json")) {
            responseType = "json";
          }
          let data;
          let blob;
          switch (responseType) {
            case "arraybuffer":
            case "blob":
              blob = await response.blob();
              data = await readBlobAsBase64(blob);
              break;
            case "json":
              data = await response.json();
              break;
            case "document":
            case "text":
            default:
              data = await response.text();
          }
          const headers = {};
          response.headers.forEach((value, key) => {
            headers[key] = value;
          });
          return {
            data,
            headers,
            status: response.status,
            url: response.url
          };
        }
        /**
         * Perform an Http GET request given a set of options
         * @param options Options to build the HTTP request
         */
        async get(options) {
          return this.request(Object.assign(Object.assign({}, options), { method: "GET" }));
        }
        /**
         * Perform an Http POST request given a set of options
         * @param options Options to build the HTTP request
         */
        async post(options) {
          return this.request(Object.assign(Object.assign({}, options), { method: "POST" }));
        }
        /**
         * Perform an Http PUT request given a set of options
         * @param options Options to build the HTTP request
         */
        async put(options) {
          return this.request(Object.assign(Object.assign({}, options), { method: "PUT" }));
        }
        /**
         * Perform an Http PATCH request given a set of options
         * @param options Options to build the HTTP request
         */
        async patch(options) {
          return this.request(Object.assign(Object.assign({}, options), { method: "PATCH" }));
        }
        /**
         * Perform an Http DELETE request given a set of options
         * @param options Options to build the HTTP request
         */
        async delete(options) {
          return this.request(Object.assign(Object.assign({}, options), { method: "DELETE" }));
        }
      };
      CapacitorHttp = registerPlugin("CapacitorHttp", {
        web: () => new CapacitorHttpPluginWeb()
      });
      (function(SystemBarsStyle2) {
        SystemBarsStyle2["Dark"] = "DARK";
        SystemBarsStyle2["Light"] = "LIGHT";
        SystemBarsStyle2["Default"] = "DEFAULT";
      })(SystemBarsStyle || (SystemBarsStyle = {}));
      (function(SystemBarType2) {
        SystemBarType2["StatusBar"] = "StatusBar";
        SystemBarType2["NavigationBar"] = "NavigationBar";
      })(SystemBarType || (SystemBarType = {}));
      SystemBarsPluginWeb = class extends WebPlugin {
        async setStyle() {
          this.unavailable("not available for web");
        }
        async setAnimation() {
          this.unavailable("not available for web");
        }
        async show() {
          this.unavailable("not available for web");
        }
        async hide() {
          this.unavailable("not available for web");
        }
      };
      SystemBars = registerPlugin("SystemBars", {
        web: () => new SystemBarsPluginWeb()
      });
    }
  });

  // node_modules/@capacitor/filesystem/dist/esm/definitions.js
  var Directory, Encoding;
  var init_definitions = __esm({
    "node_modules/@capacitor/filesystem/dist/esm/definitions.js"() {
      (function(Directory2) {
        Directory2["Documents"] = "DOCUMENTS";
        Directory2["Data"] = "DATA";
        Directory2["Library"] = "LIBRARY";
        Directory2["Cache"] = "CACHE";
        Directory2["External"] = "EXTERNAL";
        Directory2["ExternalStorage"] = "EXTERNAL_STORAGE";
        Directory2["ExternalCache"] = "EXTERNAL_CACHE";
        Directory2["LibraryNoCloud"] = "LIBRARY_NO_CLOUD";
        Directory2["Temporary"] = "TEMPORARY";
      })(Directory || (Directory = {}));
      (function(Encoding2) {
        Encoding2["UTF8"] = "utf8";
        Encoding2["ASCII"] = "ascii";
        Encoding2["UTF16"] = "utf16";
      })(Encoding || (Encoding = {}));
    }
  });

  // node_modules/@capacitor/filesystem/dist/esm/web.js
  var web_exports = {};
  __export(web_exports, {
    FilesystemWeb: () => FilesystemWeb
  });
  function resolve(path) {
    const posix = path.split("/").filter((item) => item !== ".");
    const newPosix = [];
    posix.forEach((item) => {
      if (item === ".." && newPosix.length > 0 && newPosix[newPosix.length - 1] !== "..") {
        newPosix.pop();
      } else {
        newPosix.push(item);
      }
    });
    return newPosix.join("/");
  }
  function isPathParent(parent, children) {
    parent = resolve(parent);
    children = resolve(children);
    const pathsA = parent.split("/");
    const pathsB = children.split("/");
    return parent !== children && pathsA.every((value, index) => value === pathsB[index]);
  }
  var FilesystemWeb;
  var init_web = __esm({
    "node_modules/@capacitor/filesystem/dist/esm/web.js"() {
      init_dist();
      init_definitions();
      FilesystemWeb = class _FilesystemWeb extends WebPlugin {
        constructor() {
          super(...arguments);
          this.DB_VERSION = 1;
          this.DB_NAME = "Disc";
          this._writeCmds = ["add", "put", "delete"];
          this.downloadFile = async (options) => {
            var _a, _b;
            const requestInit = buildRequestInit(options, options.webFetchExtra);
            const response = await fetch(options.url, requestInit);
            let blob;
            if (!options.progress)
              blob = await response.blob();
            else if (!(response === null || response === void 0 ? void 0 : response.body))
              blob = new Blob();
            else {
              const reader = response.body.getReader();
              let bytes = 0;
              const chunks = [];
              const contentType = response.headers.get("content-type");
              const contentLength = parseInt(response.headers.get("content-length") || "0", 10);
              while (true) {
                const { done, value } = await reader.read();
                if (done)
                  break;
                chunks.push(value);
                bytes += (value === null || value === void 0 ? void 0 : value.length) || 0;
                const status = {
                  url: options.url,
                  bytes,
                  contentLength
                };
                this.notifyListeners("progress", status);
              }
              const allChunks = new Uint8Array(bytes);
              let position = 0;
              for (const chunk of chunks) {
                if (typeof chunk === "undefined")
                  continue;
                allChunks.set(chunk, position);
                position += chunk.length;
              }
              blob = new Blob([allChunks.buffer], { type: contentType || void 0 });
            }
            const result = await this.writeFile({
              path: options.path,
              directory: (_a = options.directory) !== null && _a !== void 0 ? _a : void 0,
              recursive: (_b = options.recursive) !== null && _b !== void 0 ? _b : false,
              data: blob
            });
            return { path: result.uri, blob };
          };
        }
        readFileInChunks(_options, _callback) {
          throw this.unavailable("Method not implemented.");
        }
        async initDb() {
          if (this._db !== void 0) {
            return this._db;
          }
          if (!("indexedDB" in window)) {
            throw this.unavailable("This browser doesn't support IndexedDB");
          }
          return new Promise((resolve2, reject) => {
            const request = indexedDB.open(this.DB_NAME, this.DB_VERSION);
            request.onupgradeneeded = _FilesystemWeb.doUpgrade;
            request.onsuccess = () => {
              this._db = request.result;
              resolve2(request.result);
            };
            request.onerror = () => reject(request.error);
            request.onblocked = () => {
              console.warn("db blocked");
            };
          });
        }
        static doUpgrade(event) {
          const eventTarget = event.target;
          const db = eventTarget.result;
          switch (event.oldVersion) {
            case 0:
            case 1:
            default: {
              if (db.objectStoreNames.contains("FileStorage")) {
                db.deleteObjectStore("FileStorage");
              }
              const store = db.createObjectStore("FileStorage", { keyPath: "path" });
              store.createIndex("by_folder", "folder");
            }
          }
        }
        async dbRequest(cmd, args) {
          const readFlag = this._writeCmds.indexOf(cmd) !== -1 ? "readwrite" : "readonly";
          return this.initDb().then((conn) => {
            return new Promise((resolve2, reject) => {
              const tx = conn.transaction(["FileStorage"], readFlag);
              const store = tx.objectStore("FileStorage");
              const req = store[cmd](...args);
              req.onsuccess = () => resolve2(req.result);
              req.onerror = () => reject(req.error);
            });
          });
        }
        async dbIndexRequest(indexName, cmd, args) {
          const readFlag = this._writeCmds.indexOf(cmd) !== -1 ? "readwrite" : "readonly";
          return this.initDb().then((conn) => {
            return new Promise((resolve2, reject) => {
              const tx = conn.transaction(["FileStorage"], readFlag);
              const store = tx.objectStore("FileStorage");
              const index = store.index(indexName);
              const req = index[cmd](...args);
              req.onsuccess = () => resolve2(req.result);
              req.onerror = () => reject(req.error);
            });
          });
        }
        getPath(directory, uriPath) {
          const cleanedUriPath = uriPath !== void 0 ? uriPath.replace(/^[/]+|[/]+$/g, "") : "";
          let fsPath = "";
          if (directory !== void 0)
            fsPath += "/" + directory;
          if (uriPath !== "")
            fsPath += "/" + cleanedUriPath;
          return fsPath;
        }
        async clear() {
          const conn = await this.initDb();
          const tx = conn.transaction(["FileStorage"], "readwrite");
          const store = tx.objectStore("FileStorage");
          store.clear();
        }
        /**
         * Read a file from disk
         * @param options options for the file read
         * @return a promise that resolves with the read file data result
         */
        async readFile(options) {
          const path = this.getPath(options.directory, options.path);
          const entry = await this.dbRequest("get", [path]);
          if (entry === void 0)
            throw Error("File does not exist.");
          return { data: entry.content ? entry.content : "" };
        }
        /**
         * Write a file to disk in the specified location on device
         * @param options options for the file write
         * @return a promise that resolves with the file write result
         */
        async writeFile(options) {
          const path = this.getPath(options.directory, options.path);
          let data = options.data;
          const encoding = options.encoding;
          const doRecursive = options.recursive;
          const occupiedEntry = await this.dbRequest("get", [path]);
          if (occupiedEntry && occupiedEntry.type === "directory")
            throw Error("The supplied path is a directory.");
          const parentPath = path.substr(0, path.lastIndexOf("/"));
          const parentEntry = await this.dbRequest("get", [parentPath]);
          if (parentEntry === void 0) {
            const subDirIndex = parentPath.indexOf("/", 1);
            if (subDirIndex !== -1) {
              const parentArgPath = parentPath.substr(subDirIndex);
              await this.mkdir({
                path: parentArgPath,
                directory: options.directory,
                recursive: doRecursive
              });
            }
          }
          if (!encoding && !(data instanceof Blob)) {
            data = data.indexOf(",") >= 0 ? data.split(",")[1] : data;
            if (!this.isBase64String(data))
              throw Error("The supplied data is not valid base64 content.");
          }
          const now = Date.now();
          const pathObj = {
            path,
            folder: parentPath,
            type: "file",
            size: data instanceof Blob ? data.size : data.length,
            ctime: now,
            mtime: now,
            content: data
          };
          await this.dbRequest("put", [pathObj]);
          return {
            uri: pathObj.path
          };
        }
        /**
         * Append to a file on disk in the specified location on device
         * @param options options for the file append
         * @return a promise that resolves with the file write result
         */
        async appendFile(options) {
          const path = this.getPath(options.directory, options.path);
          let data = options.data;
          const encoding = options.encoding;
          const parentPath = path.substr(0, path.lastIndexOf("/"));
          const now = Date.now();
          let ctime = now;
          const occupiedEntry = await this.dbRequest("get", [path]);
          if (occupiedEntry && occupiedEntry.type === "directory")
            throw Error("The supplied path is a directory.");
          const parentEntry = await this.dbRequest("get", [parentPath]);
          if (parentEntry === void 0) {
            const subDirIndex = parentPath.indexOf("/", 1);
            if (subDirIndex !== -1) {
              const parentArgPath = parentPath.substr(subDirIndex);
              await this.mkdir({
                path: parentArgPath,
                directory: options.directory,
                recursive: true
              });
            }
          }
          if (!encoding && !this.isBase64String(data))
            throw Error("The supplied data is not valid base64 content.");
          if (occupiedEntry !== void 0) {
            if (occupiedEntry.content instanceof Blob) {
              throw Error("The occupied entry contains a Blob object which cannot be appended to.");
            }
            if (occupiedEntry.content !== void 0 && !encoding) {
              data = btoa(atob(occupiedEntry.content) + atob(data));
            } else {
              data = occupiedEntry.content + data;
            }
            ctime = occupiedEntry.ctime;
          }
          const pathObj = {
            path,
            folder: parentPath,
            type: "file",
            size: data.length,
            ctime,
            mtime: now,
            content: data
          };
          await this.dbRequest("put", [pathObj]);
        }
        /**
         * Delete a file from disk
         * @param options options for the file delete
         * @return a promise that resolves with the deleted file data result
         */
        async deleteFile(options) {
          const path = this.getPath(options.directory, options.path);
          const entry = await this.dbRequest("get", [path]);
          if (entry === void 0)
            throw Error("File does not exist.");
          const entries = await this.dbIndexRequest("by_folder", "getAllKeys", [IDBKeyRange.only(path)]);
          if (entries.length !== 0)
            throw Error("Folder is not empty.");
          await this.dbRequest("delete", [path]);
        }
        /**
         * Create a directory.
         * @param options options for the mkdir
         * @return a promise that resolves with the mkdir result
         */
        async mkdir(options) {
          const path = this.getPath(options.directory, options.path);
          const doRecursive = options.recursive;
          const parentPath = path.substr(0, path.lastIndexOf("/"));
          const depth = (path.match(/\//g) || []).length;
          const parentEntry = await this.dbRequest("get", [parentPath]);
          const occupiedEntry = await this.dbRequest("get", [path]);
          if (depth === 1)
            throw Error("Cannot create Root directory");
          if (occupiedEntry !== void 0)
            throw Error("Current directory does already exist.");
          if (!doRecursive && depth !== 2 && parentEntry === void 0)
            throw Error("Parent directory must exist");
          if (doRecursive && depth !== 2 && parentEntry === void 0) {
            const parentArgPath = parentPath.substr(parentPath.indexOf("/", 1));
            await this.mkdir({
              path: parentArgPath,
              directory: options.directory,
              recursive: doRecursive
            });
          }
          const now = Date.now();
          const pathObj = {
            path,
            folder: parentPath,
            type: "directory",
            size: 0,
            ctime: now,
            mtime: now
          };
          await this.dbRequest("put", [pathObj]);
        }
        /**
         * Remove a directory
         * @param options the options for the directory remove
         */
        async rmdir(options) {
          const { path, directory, recursive } = options;
          const fullPath = this.getPath(directory, path);
          const entry = await this.dbRequest("get", [fullPath]);
          if (entry === void 0)
            throw Error("Folder does not exist.");
          if (entry.type !== "directory")
            throw Error("Requested path is not a directory");
          const readDirResult = await this.readdir({ path, directory });
          if (readDirResult.files.length !== 0 && !recursive)
            throw Error("Folder is not empty");
          for (const entry2 of readDirResult.files) {
            const entryPath = `${path}/${entry2.name}`;
            const entryObj = await this.stat({ path: entryPath, directory });
            if (entryObj.type === "file") {
              await this.deleteFile({ path: entryPath, directory });
            } else {
              await this.rmdir({ path: entryPath, directory, recursive });
            }
          }
          await this.dbRequest("delete", [fullPath]);
        }
        /**
         * Return a list of files from the directory (not recursive)
         * @param options the options for the readdir operation
         * @return a promise that resolves with the readdir directory listing result
         */
        async readdir(options) {
          const path = this.getPath(options.directory, options.path);
          const entry = await this.dbRequest("get", [path]);
          if (options.path !== "" && entry === void 0)
            throw Error("Folder does not exist.");
          const entries = await this.dbIndexRequest("by_folder", "getAllKeys", [IDBKeyRange.only(path)]);
          const files = await Promise.all(entries.map(async (e) => {
            let subEntry = await this.dbRequest("get", [e]);
            if (subEntry === void 0) {
              subEntry = await this.dbRequest("get", [e + "/"]);
            }
            return {
              name: e.substring(path.length + 1),
              type: subEntry.type,
              size: subEntry.size,
              ctime: subEntry.ctime,
              mtime: subEntry.mtime,
              uri: subEntry.path
            };
          }));
          return { files };
        }
        /**
         * Return full File URI for a path and directory
         * @param options the options for the stat operation
         * @return a promise that resolves with the file stat result
         */
        async getUri(options) {
          const path = this.getPath(options.directory, options.path);
          let entry = await this.dbRequest("get", [path]);
          if (entry === void 0) {
            entry = await this.dbRequest("get", [path + "/"]);
          }
          return {
            uri: (entry === null || entry === void 0 ? void 0 : entry.path) || path
          };
        }
        /**
         * Return data about a file
         * @param options the options for the stat operation
         * @return a promise that resolves with the file stat result
         */
        async stat(options) {
          const path = this.getPath(options.directory, options.path);
          let entry = await this.dbRequest("get", [path]);
          if (entry === void 0) {
            entry = await this.dbRequest("get", [path + "/"]);
          }
          if (entry === void 0)
            throw Error("Entry does not exist.");
          return {
            name: entry.path.substring(path.length + 1),
            type: entry.type,
            size: entry.size,
            ctime: entry.ctime,
            mtime: entry.mtime,
            uri: entry.path
          };
        }
        /**
         * Rename a file or directory
         * @param options the options for the rename operation
         * @return a promise that resolves with the rename result
         */
        async rename(options) {
          await this._copy(options, true);
          return;
        }
        /**
         * Copy a file or directory
         * @param options the options for the copy operation
         * @return a promise that resolves with the copy result
         */
        async copy(options) {
          return this._copy(options, false);
        }
        async requestPermissions() {
          return { publicStorage: "granted" };
        }
        async checkPermissions() {
          return { publicStorage: "granted" };
        }
        /**
         * Function that can perform a copy or a rename
         * @param options the options for the rename operation
         * @param doRename whether to perform a rename or copy operation
         * @return a promise that resolves with the result
         */
        async _copy(options, doRename = false) {
          let { toDirectory } = options;
          const { to, from, directory: fromDirectory } = options;
          if (!to || !from) {
            throw Error("Both to and from must be provided");
          }
          if (!toDirectory) {
            toDirectory = fromDirectory;
          }
          const fromPath = this.getPath(fromDirectory, from);
          const toPath = this.getPath(toDirectory, to);
          if (fromPath === toPath) {
            return {
              uri: toPath
            };
          }
          if (isPathParent(fromPath, toPath)) {
            throw Error("To path cannot contain the from path");
          }
          let toObj;
          try {
            toObj = await this.stat({
              path: to,
              directory: toDirectory
            });
          } catch (e) {
            const toPathComponents = to.split("/");
            toPathComponents.pop();
            const toPath2 = toPathComponents.join("/");
            if (toPathComponents.length > 0) {
              const toParentDirectory = await this.stat({
                path: toPath2,
                directory: toDirectory
              });
              if (toParentDirectory.type !== "directory") {
                throw new Error("Parent directory of the to path is a file");
              }
            }
          }
          if (toObj && toObj.type === "directory") {
            throw new Error("Cannot overwrite a directory with a file");
          }
          const fromObj = await this.stat({
            path: from,
            directory: fromDirectory
          });
          const updateTime = async (path, ctime2, mtime) => {
            const fullPath = this.getPath(toDirectory, path);
            const entry = await this.dbRequest("get", [fullPath]);
            entry.ctime = ctime2;
            entry.mtime = mtime;
            await this.dbRequest("put", [entry]);
          };
          const ctime = fromObj.ctime ? fromObj.ctime : Date.now();
          switch (fromObj.type) {
            // The "from" object is a file
            case "file": {
              const file = await this.readFile({
                path: from,
                directory: fromDirectory
              });
              if (doRename) {
                await this.deleteFile({
                  path: from,
                  directory: fromDirectory
                });
              }
              let encoding;
              if (!(file.data instanceof Blob) && !this.isBase64String(file.data)) {
                encoding = Encoding.UTF8;
              }
              const writeResult = await this.writeFile({
                path: to,
                directory: toDirectory,
                data: file.data,
                encoding
              });
              if (doRename) {
                await updateTime(to, ctime, fromObj.mtime);
              }
              return writeResult;
            }
            case "directory": {
              if (toObj) {
                throw Error("Cannot move a directory over an existing object");
              }
              try {
                await this.mkdir({
                  path: to,
                  directory: toDirectory,
                  recursive: false
                });
                if (doRename) {
                  await updateTime(to, ctime, fromObj.mtime);
                }
              } catch (e) {
              }
              const contents = (await this.readdir({
                path: from,
                directory: fromDirectory
              })).files;
              for (const filename of contents) {
                await this._copy({
                  from: `${from}/${filename.name}`,
                  to: `${to}/${filename.name}`,
                  directory: fromDirectory,
                  toDirectory
                }, doRename);
              }
              if (doRename) {
                await this.rmdir({
                  path: from,
                  directory: fromDirectory
                });
              }
            }
          }
          return {
            uri: toPath
          };
        }
        isBase64String(str) {
          try {
            return btoa(atob(str)) == str;
          } catch (err) {
            return false;
          }
        }
      };
      FilesystemWeb._debug = true;
    }
  });

  // node_modules/@capacitor/browser/dist/esm/web.js
  var web_exports2 = {};
  __export(web_exports2, {
    Browser: () => Browser,
    BrowserWeb: () => BrowserWeb
  });
  var BrowserWeb, Browser;
  var init_web2 = __esm({
    "node_modules/@capacitor/browser/dist/esm/web.js"() {
      init_dist();
      BrowserWeb = class extends WebPlugin {
        constructor() {
          super();
          this._lastWindow = null;
        }
        async open(options) {
          this._lastWindow = window.open(options.url, options.windowName || "_blank");
        }
        async close() {
          return new Promise((resolve2, reject) => {
            if (this._lastWindow != null) {
              this._lastWindow.close();
              this._lastWindow = null;
              resolve2();
            } else {
              reject("No active window to close!");
            }
          });
        }
      };
      Browser = new BrowserWeb();
    }
  });

  // node_modules/capacitor-nodejs/dist/esm/web.js
  var web_exports4 = {};
  __export(web_exports4, {
    CapacitorNodeJSWeb: () => CapacitorNodeJSWeb
  });
  var CapacitorNodeJSWeb;
  var init_web3 = __esm({
    "node_modules/capacitor-nodejs/dist/esm/web.js"() {
      init_dist();
      CapacitorNodeJSWeb = class extends WebPlugin {
        unavailableNodeJS() {
          return this.unavailable("The NodeJS engine is not available in the browser!");
        }
        start() {
          throw this.unavailableNodeJS();
        }
        send() {
          throw this.unavailableNodeJS();
        }
        whenReady() {
          throw this.unavailableNodeJS();
        }
      };
    }
  });

  // src/platform/ElectronPlatform.ts
  var import_promises = __require("fs/promises");
  var import_fs = __require("fs");
  var import_electron = __require("electron");
  var import_path = __toESM(require_path_browserify());
  var import_os = __require("os");
  var ElectronPlatform = class {
    constructor() {
      __publicField(this, "id", "electron");
      __publicField(this, "baseDataPath");
      __publicField(this, "enhancedPath");
      __publicField(this, "themesPath");
      __publicField(this, "pluginsPath");
      this.baseDataPath = false ? (0, import_path.join)((0, import_os.homedir)(), "AppData", "Roaming") : false ? (0, import_path.join)((0, import_os.homedir)(), "Library", "Application Support") : (0, import_path.join)((0, import_os.homedir)(), ".config");
      this.enhancedPath = (0, import_path.join)(this.baseDataPath, "stremio-enhanced");
      this.themesPath = (0, import_path.join)(this.enhancedPath, "themes");
      this.pluginsPath = (0, import_path.join)(this.enhancedPath, "plugins");
    }
    async readFile(path) {
      return (0, import_promises.readFile)(path, "utf-8");
    }
    async writeFile(path, content) {
      return (0, import_promises.writeFile)(path, content, "utf-8");
    }
    async readdir(path) {
      return (0, import_promises.readdir)(path);
    }
    async exists(path) {
      return (0, import_fs.existsSync)(path);
    }
    async unlink(path) {
      return (0, import_promises.unlink)(path);
    }
    async mkdir(path) {
      return (0, import_promises.mkdir)(path, { recursive: true }).then(() => {
      });
    }
    async stat(path) {
      const stats = await (0, import_promises.stat)(path);
      return {
        isFile: stats.isFile(),
        isDirectory: stats.isDirectory()
      };
    }
    async openPath(path) {
      await import_electron.shell.openPath(path);
    }
    async openExternal(url) {
      await import_electron.shell.openExternal(url);
    }
    isPictureInPictureSupported() {
      return false;
    }
    async enterPictureInPicture(_width, _height) {
      return false;
    }
    async setPictureInPictureState(_enabled, _width, _height) {
      return;
    }
    getThemesPath() {
      return this.themesPath;
    }
    getPluginsPath() {
      return this.pluginsPath;
    }
    getEnhancedPath() {
      return this.enhancedPath;
    }
    async init() {
      if (!await this.exists(this.enhancedPath)) {
        await this.mkdir(this.enhancedPath);
      }
      if (!await this.exists(this.themesPath)) {
        await this.mkdir(this.themesPath);
      }
      if (!await this.exists(this.pluginsPath)) {
        await this.mkdir(this.pluginsPath);
      }
    }
  };

  // node_modules/@capacitor/filesystem/dist/esm/index.js
  init_dist();

  // node_modules/@capacitor/synapse/dist/synapse.mjs
  function s(t) {
    t.CapacitorUtils.Synapse = new Proxy(
      {},
      {
        get(e, n) {
          return new Proxy({}, {
            get(w, o) {
              return (c, p, r) => {
                const i = t.Capacitor.Plugins[n];
                if (i === void 0) {
                  r(new Error(`Capacitor plugin ${n} not found`));
                  return;
                }
                if (typeof i[o] != "function") {
                  r(new Error(`Method ${o} not found in Capacitor plugin ${n}`));
                  return;
                }
                (async () => {
                  try {
                    const a = await i[o](c);
                    p(a);
                  } catch (a) {
                    r(a);
                  }
                })();
              };
            }
          });
        }
      }
    );
  }
  function u(t) {
    t.CapacitorUtils.Synapse = new Proxy(
      {},
      {
        get(e, n) {
          return t.cordova.plugins[n];
        }
      }
    );
  }
  function f(t = false) {
    typeof window > "u" || (window.CapacitorUtils = window.CapacitorUtils || {}, window.Capacitor !== void 0 && !t ? s(window) : window.cordova !== void 0 && u(window));
  }

  // node_modules/@capacitor/filesystem/dist/esm/index.js
  init_definitions();
  var Filesystem = registerPlugin("Filesystem", {
    web: () => Promise.resolve().then(() => (init_web(), web_exports)).then((m) => new m.FilesystemWeb())
  });
  f();

  // node_modules/@capacitor/browser/dist/esm/index.js
  init_dist();
  var Browser2 = registerPlugin("Browser", {
    web: () => Promise.resolve().then(() => (init_web2(), web_exports2)).then((m) => new m.BrowserWeb())
  });

  // node_modules/@capawesome/capacitor-file-picker/dist/esm/index.js
  init_dist();

  // node_modules/@capawesome/capacitor-file-picker/dist/esm/web.js
  init_dist();
  var FilePickerWeb = class extends WebPlugin {
    constructor() {
      super(...arguments);
      this.ERROR_PICK_FILE_CANCELED = "pickFiles canceled.";
    }
    async checkPermissions() {
      throw this.unimplemented("Not implemented on web.");
    }
    async convertHeicToJpeg(_options) {
      throw this.unimplemented("Not implemented on web.");
    }
    async copyFile(_options) {
      throw this.unimplemented("Not implemented on web.");
    }
    async pickFiles(options) {
      const pickedFiles = await this.openFilePicker(options);
      if (!pickedFiles) {
        throw new Error(this.ERROR_PICK_FILE_CANCELED);
      }
      const result = {
        files: []
      };
      for (const pickedFile of pickedFiles) {
        const file = {
          blob: pickedFile,
          modifiedAt: pickedFile.lastModified,
          mimeType: this.getMimeTypeFromUrl(pickedFile),
          name: this.getNameFromUrl(pickedFile),
          path: void 0,
          size: this.getSizeFromUrl(pickedFile)
        };
        if (options === null || options === void 0 ? void 0 : options.readData) {
          file.data = await this.getDataFromFile(pickedFile);
        }
        result.files.push(file);
      }
      return result;
    }
    async pickDirectory() {
      throw this.unimplemented("Not implemented on web.");
    }
    async pickImages(options) {
      return this.pickFiles(Object.assign({ types: ["image/*"] }, options));
    }
    async pickMedia(options) {
      return this.pickFiles(Object.assign({ types: ["image/*", "video/*"] }, options));
    }
    async pickVideos(options) {
      return this.pickFiles(Object.assign({ types: ["video/*"] }, options));
    }
    async requestPermissions(_options) {
      throw this.unimplemented("Not implemented on web.");
    }
    async openFilePicker(options) {
      var _a;
      const accept = ((_a = options === null || options === void 0 ? void 0 : options.types) === null || _a === void 0 ? void 0 : _a.join(",")) || "";
      const limit = (options === null || options === void 0 ? void 0 : options.limit) === void 0 ? 0 : options.limit;
      return new Promise((resolve2) => {
        let onChangeFired = false;
        const input = document.createElement("input");
        input.type = "file";
        input.accept = accept;
        input.multiple = limit === 0;
        const hasCancelEvent = "oncancel" in input;
        const onChangeHandler = () => {
          onChangeFired = true;
          removeAllListeners();
          const files = Array.from(input.files || []);
          resolve2(files);
        };
        const onCancelHandler = () => {
          removeAllListeners();
          resolve2(void 0);
        };
        const onFocusHandler = async () => {
          await this.wait(500);
          if (onChangeFired) {
            return;
          }
          removeAllListeners();
          resolve2(void 0);
        };
        const removeAllListeners = () => {
          input.removeEventListener("change", onChangeHandler);
          if (hasCancelEvent) {
            input.removeEventListener("cancel", onCancelHandler);
          } else {
            window.removeEventListener("focus", onFocusHandler);
          }
        };
        input.addEventListener("change", onChangeHandler, { once: true });
        if (hasCancelEvent) {
          input.addEventListener("cancel", onCancelHandler, { once: true });
        } else {
          window.addEventListener("focus", onFocusHandler, { once: true });
        }
        input.click();
      });
    }
    async getDataFromFile(file) {
      return new Promise((resolve2, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const result = typeof reader.result === "string" ? reader.result : "";
          const splittedResult = result.split("base64,");
          const base64 = splittedResult[1] || "";
          resolve2(base64);
        };
        reader.onerror = (error) => {
          reject(error);
        };
      });
    }
    getNameFromUrl(file) {
      return file.name;
    }
    getMimeTypeFromUrl(file) {
      return file.type;
    }
    getSizeFromUrl(file) {
      return file.size;
    }
    async wait(delayMs) {
      return new Promise((resolve2) => setTimeout(resolve2, delayMs));
    }
  };

  // node_modules/@capawesome/capacitor-file-picker/dist/esm/index.js
  var FilePicker = registerPlugin("FilePicker", {
    web: () => new FilePickerWeb()
  });

  // src/platform/CapacitorPlatform.ts
  var CapacitorPlatform = class {
    constructor() {
      __publicField(this, "id", "capacitor");
      __publicField(this, "enhancedPath", "Stremio Enhanced");
      __publicField(this, "themesPath", `${this.enhancedPath}/themes`);
      __publicField(this, "pluginsPath", `${this.enhancedPath}/plugins`);
    }
    isExternalPath(path) {
      return path.startsWith("file://") || path.startsWith("content://") || path.startsWith("/");
    }
    getDirectory(path) {
      return this.isExternalPath(path) ? void 0 : Directory.Documents;
    }
    getFileOptions(path, encoding) {
      const options = { path };
      const directory = this.getDirectory(path);
      if (directory) {
        options.directory = directory;
      }
      if (encoding) {
        options.encoding = encoding;
      }
      return options;
    }
    async existsInDirectory(path, directory) {
      try {
        await Filesystem.stat({ path, directory });
        return true;
      } catch {
        return false;
      }
    }
    async readdirInDirectory(path, directory) {
      try {
        const result = await Filesystem.readdir({ path, directory });
        return result.files.map((file) => file.name);
      } catch {
        return [];
      }
    }
    async migrateLegacyDirectory(oldPath, newPath) {
      const legacyFiles = await this.readdirInDirectory(oldPath, Directory.Data);
      if (!legacyFiles.length) return;
      await this.mkdir(newPath);
      const migratedFiles = new Set(await this.readdir(newPath));
      for (const fileName of legacyFiles) {
        if (migratedFiles.has(fileName)) continue;
        const legacyPath = `${oldPath}/${fileName}`;
        const legacyStat = await Filesystem.stat({
          path: legacyPath,
          directory: Directory.Data
        }).catch(() => null);
        if (!legacyStat || legacyStat.type !== "file") continue;
        const content = await Filesystem.readFile({
          path: legacyPath,
          directory: Directory.Data,
          encoding: Encoding.UTF8
        });
        await Filesystem.writeFile({
          path: `${newPath}/${fileName}`,
          directory: Directory.Documents,
          data: content.data,
          encoding: Encoding.UTF8
        });
      }
    }
    async ensurePermissions() {
      await Promise.allSettled([
        Filesystem.requestPermissions(),
        FilePicker.requestPermissions()
      ]);
    }
    getAndroidBridge() {
      return typeof window === "undefined" ? void 0 : window.StremioEnhancedAndroid;
    }
    async readFile(path) {
      const result = await Filesystem.readFile(this.getFileOptions(path, Encoding.UTF8));
      return result.data;
    }
    async writeFile(path, content) {
      await Filesystem.writeFile({
        ...this.getFileOptions(path, Encoding.UTF8),
        data: content
      });
    }
    async readdir(path) {
      const result = await Filesystem.readdir(this.getFileOptions(path));
      return result.files.map((f2) => f2.name);
    }
    async exists(path) {
      try {
        await Filesystem.stat(this.getFileOptions(path));
        return true;
      } catch {
        return false;
      }
    }
    async unlink(path) {
      await Filesystem.deleteFile(this.getFileOptions(path));
    }
    async mkdir(path) {
      try {
        await Filesystem.mkdir({
          ...this.getFileOptions(path),
          recursive: true
        });
      } catch {
      }
    }
    async stat(path) {
      const stat2 = await Filesystem.stat(this.getFileOptions(path));
      return {
        isFile: stat2.type === "file",
        isDirectory: stat2.type === "directory"
      };
    }
    async openPath(path) {
      const bridge = this.getAndroidBridge();
      if (bridge) {
        bridge.openPath(path);
        return;
      }
      console.info("Open this folder from your Files app:", path);
    }
    async openExternal(url) {
      await Browser2.open({ url });
    }
    isPictureInPictureSupported() {
      return this.getAndroidBridge()?.isPictureInPictureSupported() ?? false;
    }
    async enterPictureInPicture(width = 16, height = 9) {
      const bridge = this.getAndroidBridge();
      if (!bridge) return false;
      return bridge.enterPictureInPicture(width, height);
    }
    async setPictureInPictureState(enabled, width = 16, height = 9) {
      this.getAndroidBridge()?.setPictureInPictureState(enabled, width, height);
    }
    getThemesPath() {
      return this.themesPath;
    }
    getPluginsPath() {
      return this.pluginsPath;
    }
    getEnhancedPath() {
      return this.enhancedPath;
    }
    async init() {
      await this.ensurePermissions();
      await this.mkdir(this.getEnhancedPath());
      await this.mkdir(this.getThemesPath());
      await this.mkdir(this.getPluginsPath());
      await this.migrateLegacyDirectory("themes", this.getThemesPath());
      await this.migrateLegacyDirectory("plugins", this.getPluginsPath());
      const legacyRootExists = await this.existsInDirectory("logs", Directory.Data);
      if (legacyRootExists) {
        await this.mkdir(`${this.getEnhancedPath()}/logs`);
        await this.migrateLegacyDirectory("logs", `${this.getEnhancedPath()}/logs`);
      }
    }
  };

  // src/platform/PlatformManager.ts
  var PlatformManager = class {
    static get current() {
      if (!this._current) {
        throw new Error("PlatformManager not initialized");
      }
      return this._current;
    }
    static init() {
      if (typeof process !== "undefined" && process.versions && process.versions.electron) {
        this._current = new ElectronPlatform();
      } else if (typeof window !== "undefined" && window.capacitor) {
        this._current = new CapacitorPlatform();
      } else {
        throw new Error("Unknown platform");
      }
    }
  };
  __publicField(PlatformManager, "_current", null);

  // src/utils/logger.browser.ts
  var BrowserLogger = class {
    info(message, ...meta) {
      console.info(`[INFO] ${message}`, ...meta);
    }
    warn(message, ...meta) {
      console.warn(`[WARN] ${message}`, ...meta);
    }
    error(message, ...meta) {
      console.error(`[ERROR] ${message}`, ...meta);
    }
  };
  var logger = new BrowserLogger();
  function getLogger(label) {
    return logger;
  }
  var logger_browser_default = logger;

  // src/constants/index.ts
  var SELECTORS = {
    SECTIONS_CONTAINER: '[class^="sections-container-"]',
    SECTION: '[class^="section-"]',
    CATEGORY: ".category-GP0hI",
    CATEGORY_LABEL: ".label-N_O2v",
    CATEGORY_ICON: ".icon-oZoyV",
    CATEGORY_HEADING: ".heading-XePFl",
    LABEL: '[class^="label-wXG3e"]',
    NAV_MENU: ".menu-xeE06",
    SETTINGS_CONTENT: ".settings-content-co5eU",
    ENHANCED_SECTION: "#enhanced",
    THEMES_CATEGORY: "#enhanced > div:nth-child(2)",
    PLUGINS_CATEGORY: "#enhanced > div:nth-child(3)",
    ABOUT_CATEGORY: "#enhanced > div:nth-child(4)",
    ROUTE_CONTAINER: ".route-container:last-child .route-content",
    META_DETAILS_CONTAINER: ".metadetails-container-K_Dqa",
    DESCRIPTION_CONTAINER: ".description-container-yi8iU",
    ADDONS_LIST_CONTAINER: ".addons-list-container-Ovr2Z",
    ADDON_CONTAINER: ".addon-container-lC5KN",
    NAME_CONTAINER: ".name-container-qIAg8",
    DESCRIPTION_ITEM: ".description-container-v7Jhe",
    TYPES_CONTAINER: ".types-container-DaOrg",
    SEARCH_INPUT: ".search-input-bAgAh",
    HORIZONTAL_NAV: ".horizontal-nav-bar-container-Y_zvK",
    TOAST_ITEM: ".toast-item-container-nG0uk",
    TOAST_CONTAINER: ".toasts-container-oKECy"
  };
  var CLASSES = {
    OPTION: "option-vFOAS",
    CONTENT: "content-P2T0i",
    BUTTON: "button-DNmYL",
    BUTTON_CONTAINER: "button-container-zVLH6",
    SELECTED: "selected-S7SeK",
    INSTALL_BUTTON: "install-button-container-yfcq5",
    UNINSTALL_BUTTON: "uninstall-button-container-oV4Yo",
    CHECKED: "checked"
  };
  var STORAGE_KEYS = {
    ENABLED_PLUGINS: "enabledPlugins",
    CURRENT_THEME: "currentTheme",
    DISCORD_RPC: "discordrichpresence",
    CHECK_UPDATES_ON_STARTUP: "checkForUpdatesOnStartup"
  };
  var FILE_EXTENSIONS = {
    THEME: ".theme.css",
    PLUGIN: ".plugin.js"
  };
  var URLS = {
    STREMIO_WEB: "https://web.stremio.com/",
    STREMIO_WEB_ADD_ADDON: "https://web.stremio.com/#/addons?addon=",
    REGISTRY: "https://raw.githubusercontent.com/REVENGE977/stremio-enhanced-registry/refs/heads/main/registry.json",
    VERSION_CHECK: "https://github.com/REVENGE977/stremio-enhanced-community/raw/main/version",
    RELEASES_API: "https://api.github.com/repos/REVENGE977/stremio-enhanced-community/releases/latest",
    RELEASES_PAGE: "https://github.com/REVENGE977/stremio-enhanced-community/releases/latest",
    STREMIO_SERVICE_GITHUB_API: "https://api.github.com/repos/Stremio/stremio-service/releases/latest"
  };
  var TIMEOUTS = {
    ELEMENT_WAIT: 1e4,
    INSTALL_COMPLETION: 12e4,
    SERVICE_CHECK_INTERVAL: 5e3,
    SERVER_RELOAD_DELAY: 1500,
    CORESTATE_RETRY_INTERVAL: 1e3,
    CORESTATE_MAX_RETRIES: 30
  };

  // src/components/mods-tab/mods-tab.html
  var mods_tab_default = '<div class="nav-content-container-zl9hQ" style="width: 90%; overflow-y: auto;">\n    <div class="addons-content-zhFBl">\n        <div class="selectable-inputs-container-tUul1">\n            <div class="spacing-wH1w5"></div>\n            <label title="Search themes/plugins" class="search-bar-k7MXd search-bar-container-p4tSt">\n                <input size="1" autocorrect="off" autocapitalize="off" autocomplete="off" spellcheck="false" tabindex="0" class="search-input-bAgAh text-input-hnLiz" type="text" placeholder="Search themes/plugins" value="">\n                <svg class="icon-QOYfJ" viewBox="0 0 512 512">\n                    <path d="M456.882 415.7999999999997l-93.791-89.45c22.605-28.67 34.784-63.57 34.686-99.44 0-91.54-78.142-166.07-174.125-166.07s-174.125 74.53-174.125 166.17c0 91.54 78.142 166.07 174.125 166.07 37.586 0 74.161-11.61 104.256-33.08l93.79 89.45c3.535 3.04 7.91 5.05 12.604 5.79 4.696 0.74 9.515 0.18 13.887-1.61 4.374-1.79 8.117-4.74 10.788-8.49 2.671-3.76 4.157-8.17 4.284-12.7 0.108-6.11-2.165-12.04-6.379-16.64m-357.62-188.79c-0.01-29.43 11.453-57.8 32.162-79.61 20.709-21.82 49.183-35.49 79.884-38.39 30.7-2.9 61.433 5.2 86.221 22.72 24.787 17.52 41.858 43.2 47.891 72.05 6.034 28.86 0.598 58.83-15.249 84.07s-40.972 43.96-70.489 52.53c-29.518 8.55-61.317 6.33-89.213-6.24s-49.895-34.57-61.718-61.75c-6.258-14.38-9.483-29.81-9.488-45.38" style="fill: currentcolor;"></path>\n                </svg>\n            </label>\n        </div>\n        <br/>\n        <div tabindex="0" title="Submit your themes and plugins here" target="_blank" class="link-FrL1t button-container-zVLH6">\n            <a href="https://github.com/REVENGE977/stremio-enhanced-registry" target="_blank" rel="noreferrer">\n                <div class="label-PJvSJ" style="text-align: center;">Submit your themes and plugins</div>\n            </a>\n        </div>\n\n        <div class="addons-list-container-Ovr2Z" id="mods-list">\n            \n        </div>\n        <br/>\n    </div>\n</div>';

  // src/components/mods-item/mods-item.html
  var mods_item_default = '<br>\n<div tabindex="0" class="addon-whmdO animation-fade-in addon-container-lC5KN button-container-zVLH6">\n    <div class="logo-container-ZcSSC">\n        <!-- theme preview here -->\n\n        <!-- plugin icon here -->\n    </div>\n\n	<div class="info-container-AdMB6">\n		<div class="name-container-qIAg8" title="{{ name }}">{{ name }}</div>\n		<div class="version-container-zdPyN" title="{{ version }}">{{ version }}</div>\n		<div class="types-container-DaOrg">{{ type }}</div>\n        <div class="description-container-v7Jhe">\n            <b>Description:</b> {{ description }}\n            <br>\n            <b>Author:</b> {{ author }}\n        </div>\n	</div>\n	<div class="buttons-container-g0xXr">\n		<div class="action-buttons-container-xMVmz">\n			<div tabindex="-1" title="{{ actionbtnTitle }}" class="{{ actionbtnClass }} button-container-zVLH6 modActionBtn" data-link="{{ download }}" data-type="{{ type }}">\n				<div class="label-OnWh2">{{ actionbtnTitle }}</div>\n			</div>\n		</div>\n		<a href="{{ repo }}" target="_blank" rel="noreferrer" class="share-button-container-s3gwP button-container-zVLH6">\n			<svg class="icon-GxVbY" viewBox="0 0 24 24">\n				<path d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z" style="fill: currentcolor;" />\n			</svg>\n			<div class="label-OnWh2">Open repository</div>\n		</a>\n	</div>\n</div>\n';

  // src/components/about-category/about-category.html
  var about_category_default = '<h4 style="color: white; margin-bottom: 1rem;">\n    Developed By: <p style="display: inline !important;"><a href="https://github.com/REVENGE977" target="_blank" rel="noreferrer">REVENGE977</a></p>\n    <br/>\n    Version: v{{ version }}\n    <br/>\n</h4>\n\n<div class="option-vFOAS">\n    <div class="heading-dYMDt">\n        <div class="label-qI6Vh">Check for updates on startup</div>\n    </div>\n    <div class="content-P2T0i">\n        <div tabindex="-1" class="toggle-container-lZfHP button-container-zVLH6 {{ checkForUpdatesOnStartup }}" id="checkForUpdatesOnStartup">\n            <div class="toggle-toOWM"></div>\n        </div>\n    </div>\n</div>\n\n<div class="option-vFOAS">\n    <div class="heading-dYMDt">\n        <div class="label-qI6Vh">Discord Rich Presence</div>\n    </div>\n    <div class="content-P2T0i">\n        <div tabindex="-1" class="toggle-container-lZfHP button-container-zVLH6 {{ discordrichpresence }}" id="discordrichpresence" style="outline: none;">\n            <div class="toggle-toOWM"></div>\n        </div>\n    </div>\n</div>\n\n<div class="option-vFOAS">\n    <div class="heading-dYMDt">\n        <div class="label-qI6Vh">Window transparency</div>\n    </div>\n    <div class="content-P2T0i">\n        <div tabindex="-1" class="toggle-container-lZfHP button-container-zVLH6 {{ enableTransparentThemes }}" id="enableTransparentThemes" style="outline: none;">\n            <div class="toggle-toOWM"></div>\n        </div>\n    </div>\n</div>\n\n<p style="color:gray;">This option has to be enabled for themes that support transparency to work. (experimental)</p>\n<br/>\n\n<div class="option-vFOAS">\n    <div class="content-P2T0i">\n        <div tabindex="0" title="Community Plugins &amp; Themes" class="button-DNmYL button-container-zVLH6 button" id="browsePluginsThemesBtn">\n            Community Marketplace\n        </div>\n    </div>\n</div>\n\n<div class="option-vFOAS">\n    <div class="content-P2T0i">\n        <div tabindex="0" title="Check For Updates" class="button-DNmYL button-container-zVLH6 button" id="checkforupdatesBtn">\n            Check For Updates\n        </div>\n    </div>\n</div>\n\n<br/>';

  // src/components/default-theme/default-theme.html
  var default_theme_default = `<div class="option-vFOAS">
    <div class="heading-dYMDt">
        <div class="label-qI6Vh">Default</div>
    </div>
    <div class="content-P2T0i">
        <div
        title="Default"
        id="Default"
        tabindex="-1"
        onclick="applyTheme('Default')"
        style="color: white; margin-bottom: 1rem; width: max-content; background-color: {{ backgroundColor }};"
        class="button button-container-zVLH6 {{ disabled }}"
        >{{ label }}</div>
    </div>
</div>
`;

  // src/components/back-btn/back-btn.html
  var back_btn_default = '<div tabindex="-1" class="button-container-xT9_L back-button-container-lDB1N button-container-zVLH6" id="back-btn">\n    <svg class="icon-T8MU6" viewBox="0 0 512 512">\n        <path d="M328.6100000000006 106.469l-143.53 136.889 143.53 136.889" style="stroke: currentcolor; stroke-linecap: round; stroke-linejoin: round; stroke-width: 48; fill: none;"></path>\n    </svg>\n</div>';

  // src/components/title-bar/title-bar.html
  var title_bar_default = '<nav class="title-bar">\n    <div class="title-bar-buttons">\n        <div id="minimizeApp-btn" title="Minimize" class="button">\n            <svg viewBox="0 0 24 24">\n                <path d="M20,14H4V10H20" style="fill:white;"></path>\n            </svg>\n        </div>\n        <div id="maximizeApp-btn" title="Maximize" class="button">\n            <svg viewBox="0 0 24 24">\n                <path d="M3,3H21V21H3V3M5,5V19H19V5H5Z" style="fill:white;"></path>\n            </svg>\n        </div>\n        <div id="closeApp-btn" title="Close" class="button">\n            <svg viewBox="0 0 24 24" style="width: 25px; height: 25px;">\n                <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" style="fill:white;"></path>\n            </svg>\n        </div>\n    </div>\n\n    <style>\n		body > *:not(.title-bar) {\n			padding-top: 40px; \n		}\n\n        .button {\n            cursor: pointer;\n        }\n\n        .title-bar {\n            position: fixed; \n            top: 0;\n            left: 0;\n            right: 0;\n            height: 40px;\n            z-index: 9999;\n            display: flex;\n            align-items: center;\n            justify-content: flex-end;\n            background: rgba(0,0,0,0.15);\n            backdrop-filter: blur(20px) saturate(120%);\n			-webkit-app-region: drag;\n        }\n\n        .title-bar-buttons {\n            -webkit-app-region: no-drag;\n            display: flex;\n            align-items: center;\n            gap: 2.0rem;\n            margin-left: auto;\n			margin-right: 20px;\n        }\n\n        .title-bar-buttons svg {\n            width: 20px;\n            height: 20px;\n        }\n    </style>\n</nav>\n';

  // src/utils/templateCache.browser.ts
  var templates = {
    "mods-tab": mods_tab_default,
    "mods-item": mods_item_default,
    "about-category": about_category_default,
    "default-theme": default_theme_default,
    "back-btn": back_btn_default,
    "title-bar": title_bar_default
  };
  var TemplateCache = class {
    static load(dir, name) {
      return templates[name] || "";
    }
  };
  var templateCache_browser_default = TemplateCache;

  // src/components/toast/toast.ts
  async function getToastTemplate(id, title, message, status) {
    const template = templateCache_browser_default.load("/", "toast");
    let toastStatus;
    switch (status) {
      case "success":
        toastStatus = "success-eIDTa";
        break;
      case "fail":
        toastStatus = "error-quyOd";
        break;
      case "info":
        toastStatus = "info-KEWq8";
        break;
    }
    return template.replace("{{ id }}", id).replace("{{ title }}", title).replace("{{ message }}", message).replace("{{ status }}", toastStatus);
  }

  // src/utils/Helpers.ts
  var _Helpers = class _Helpers {
    constructor() {
      __publicField(this, "mainWindow", null);
    }
    static getInstance() {
      if (!_Helpers.instance) {
        _Helpers.instance = new _Helpers();
      }
      return _Helpers.instance;
    }
    setMainWindow(mainWindow) {
      this.mainWindow = mainWindow;
    }
    async showAlert(alertType, title, message, buttons) {
      const options = {
        type: alertType,
        title,
        message,
        buttons
      };
      if (typeof window !== "undefined" && typeof window.Capacitor !== "undefined" && typeof window.alert === "function") {
        window.alert([title, message].filter(Boolean).join("\n\n"));
        return 0;
      }
      try {
        const { dialog } = await import("electron");
        const response = await dialog.showMessageBox(this.mainWindow, options);
        return response.response;
      } catch (error) {
        logger_browser_default.error("Error displaying alert: " + error.message);
        return -1;
      }
    }
    waitForElm(selector, timeout = TIMEOUTS.ELEMENT_WAIT) {
      return new Promise((resolve2, reject) => {
        const existingElement = document.querySelector(selector);
        if (existingElement) {
          return resolve2(existingElement);
        }
        const observer = new MutationObserver(() => {
          const element = document.querySelector(selector);
          if (element) {
            observer.disconnect();
            resolve2(element);
          }
        });
        observer.observe(document.body, {
          childList: true,
          subtree: true
        });
        setTimeout(() => {
          observer.disconnect();
          reject(new Error(`Timeout waiting for element with selector: ${selector}`));
        }, timeout);
      });
    }
    waitForElmByXPath(xpath, timeout = TIMEOUTS.ELEMENT_WAIT) {
      return new Promise((resolve2, reject) => {
        const evaluateXPath = () => {
          const result = document.evaluate(
            xpath,
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
          );
          return result.singleNodeValue;
        };
        const existingElement = evaluateXPath();
        if (existingElement) {
          return resolve2(existingElement);
        }
        const observer = new MutationObserver(() => {
          const element = evaluateXPath();
          if (element) {
            observer.disconnect();
            resolve2(element);
          }
        });
        observer.observe(document.body, {
          childList: true,
          subtree: true
        });
        setTimeout(() => {
          observer.disconnect();
          reject(new Error(`Timeout waiting for element with XPath: ${xpath}`));
        }, timeout);
      });
    }
    waitForTitleChange(timeout = TIMEOUTS.ELEMENT_WAIT) {
      return new Promise((resolve2, reject) => {
        const headElement = document.querySelector("head");
        if (!headElement) {
          return reject(new Error("Head element not found"));
        }
        const observer = new MutationObserver(() => {
          observer.disconnect();
          resolve2(document.title);
        });
        observer.observe(headElement, {
          subtree: true,
          childList: true
        });
        setTimeout(() => {
          observer.disconnect();
          reject(new Error("Timeout waiting for document.title to change"));
        }, timeout);
      });
    }
    async createToast(toastId, title, message, status, timeoutMs = 3e3) {
      const template = await getToastTemplate(toastId, title, message, status);
      const toastContainer = document.querySelector(SELECTORS.TOAST_CONTAINER);
      if (toastContainer) {
        toastContainer.innerHTML += template;
        setTimeout(() => {
          document.getElementById(toastId)?.remove();
        }, timeoutMs);
      }
    }
    /**
     * Execute JavaScript in the context of Stremio's core services
     * @param js - JavaScript code to execute
     * @returns Promise with the result of the execution
     */
    _eval(js) {
      return new Promise((resolve2, reject) => {
        try {
          const eventName = "stremio-enhanced";
          const script = document.createElement("script");
          const handler = (data) => {
            script.remove();
            resolve2(data.detail);
          };
          window.addEventListener(eventName, handler, { once: true });
          script.id = eventName;
          script.appendChild(
            document.createTextNode(`
                        var core = window.services.core;
                        var result = ${js};

                        if (result instanceof Promise) {
                            result.then((awaitedResult) => {
                                window.dispatchEvent(new CustomEvent("${eventName}", { detail: awaitedResult }));
                            });
                        } else {
                            window.dispatchEvent(new CustomEvent("${eventName}", { detail: result }));
                        }
                    `)
          );
          document.head.appendChild(script);
        } catch (err) {
          reject(err);
        }
      });
    }
    getElementByXpath(path) {
      return document.evaluate(
        path,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      ).singleNodeValue;
    }
    getFileNameFromUrl(url) {
      const parts = url.split("/");
      return parts[parts.length - 1] || "";
    }
    formatTime(seconds) {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor(seconds % 3600 / 60);
      const remainingSeconds = Math.floor(seconds % 60);
      return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
    }
    /**
     * Compare two semantic version strings
     * @returns true if version1 > version2
     */
    isNewerVersion(version1, version2) {
      const normalize = (v) => v.replace(/^v/, "").split(".").map((n) => parseInt(n, 10) || 0);
      const v1Parts = normalize(version1);
      const v2Parts = normalize(version2);
      const maxLength = Math.max(v1Parts.length, v2Parts.length);
      for (let i = 0; i < maxLength; i++) {
        const v1 = v1Parts[i] ?? 0;
        const v2 = v2Parts[i] ?? 0;
        if (v1 > v2) return true;
        if (v1 < v2) return false;
      }
      return false;
    }
  };
  __publicField(_Helpers, "instance");
  var Helpers = _Helpers;
  var helpersInstance = Helpers.getInstance();
  var Helpers_default = helpersInstance;

  // src/components/plugin-item/pluginItem.ts
  function getPluginItemTemplate(filename, metaData, checked) {
    let template = templateCache_browser_default.load("/", "plugin-item");
    const metaKeys = ["name", "description", "author", "version"];
    metaKeys.forEach((key) => {
      const regex = new RegExp(`{{\\s*${key}\\s*}}`, "g");
      template = template.replace(regex, metaData[key] || "");
    });
    return template.replace("{{ checked }}", checked ? "checked" : "").replace(/\{\{\s*fileName\s*\}\}/g, filename);
  }

  // src/components/theme-item/themeItem.ts
  function getThemeItemTemplate(filename, metaData, applied) {
    let template = templateCache_browser_default.load("/", "theme-item");
    const metaKeys = ["name", "description", "author", "version"];
    metaKeys.forEach((key) => {
      const regex = new RegExp(`{{\\s*${key}\\s*}}`, "g");
      template = template.replace(regex, metaData[key] || "");
    });
    return template.replace("{{ disabled }}", applied ? "disabled" : "").replace(/\{\{\s*fileName\s*\}\}/g, filename).replace("{{ label }}", applied ? "Applied" : "Apply").replace("{{ buttonClass }}", applied ? "uninstall-button-container-oV4Yo" : "install-button-container-yfcq5");
  }

  // src/components/enhanced-nav/enhancedNav.ts
  function getEnhancedNav() {
    return templateCache_browser_default.load("/", "enhanced-nav");
  }

  // src/core/Properties.ts
  var Properties = class {
    static get enhancedPath() {
      return PlatformManager.current.getEnhancedPath();
    }
    static get themesPath() {
      return PlatformManager.current.getThemesPath();
    }
    static get pluginsPath() {
      return PlatformManager.current.getPluginsPath();
    }
  };
  __publicField(Properties, "themeLinkSelector", "head > link[rel=stylesheet]");
  __publicField(Properties, "isUsingStremioService", false);
  var Properties_default = Properties;

  // src/components/apply-theme/applyTheme.browser.ts
  function getApplyThemeTemplate() {
    return `
    function applyTheme(theme) {
        console.log("applying " + theme);

        // Call the native/preload handler to actually load the CSS
        if (window.stremioEnhanced && window.stremioEnhanced.applyTheme) {
            window.stremioEnhanced.applyTheme(theme);
        }

        // UI Updates
        const currentTheme = localStorage.getItem("currentTheme");
        if (currentTheme) {
            const currentThemeElement = document.getElementById(currentTheme);
            if (currentThemeElement) {
                currentThemeElement.classList.remove("disabled");

                if (currentTheme !== "Default") {
                    currentThemeElement.classList.remove("uninstall-button-container-oV4Yo");
                    currentThemeElement.classList.add("install-button-container-yfcq5");
                } else {
                    currentThemeElement.style.backgroundColor = "var(--secondary-accent-color)";
                }

                currentThemeElement.innerText = "Apply";
            }
        }

        localStorage.setItem("currentTheme", theme);

        const newThemeElement = document.getElementById(theme);
        if (newThemeElement) {
            newThemeElement.classList.add("disabled");

            if (theme !== "Default") {
                newThemeElement.classList.remove("install-button-container-yfcq5");
                newThemeElement.classList.add("uninstall-button-container-oV4Yo");
            } else {
                newThemeElement.style.backgroundColor = "var(--overlay-color)";
            }

            newThemeElement.innerText = "Applied";
        }
    }
    `;
  }

  // src/core/ModManager.ts
  var import_path2 = __toESM(require_path_browserify());

  // src/interfaces/MetaData.ts
  var REQUIRED_METADATA_KEYS = [
    "name",
    "description",
    "author",
    "version"
  ];
  var ALL_METADATA_KEYS = [
    "name",
    "description",
    "author",
    "version",
    "updateUrl",
    "source",
    "license",
    "homepage"
  ];

  // src/utils/ExtractMetaData.ts
  var ExtractMetaData = class {
    /**
     * Parse metadata from a comment block in the format:
     * /** @key value *\/
    */
    static parseMetadataFromContent(content) {
      const blockMatch = content.match(/\/\*\*([\s\S]*?)\*\//);
      if (!blockMatch) return null;
      const result = {};
      const tagRegex = /@(\w+)\s+([^\n\r]+)/g;
      for (const [, rawKey, rawValue] of blockMatch[1].matchAll(tagRegex)) {
        if (!ALL_METADATA_KEYS.includes(rawKey)) continue;
        const key = rawKey;
        if (result[key] !== void 0) continue;
        result[key] = rawValue.trim();
      }
      for (const key of REQUIRED_METADATA_KEYS) {
        if (!result[key]) return null;
      }
      return result;
    }
    static extractMetadataFromText(textContent) {
      const metadata = this.parseMetadataFromContent(textContent);
      if (!metadata) {
        logger_browser_default.error("Comment block not found in the provided text");
      }
      return metadata;
    }
  };
  var ExtractMetaData_default = ExtractMetaData;

  // src/core/ModManager.ts
  var ModManager = class {
    /**
     * Load and enable a plugin by filename
     */
    static async loadPlugin(pluginName) {
      if (document.getElementById(pluginName)) {
        this.logger.info(`Plugin ${pluginName} is already loaded`);
        return;
      }
      const pluginPath = (0, import_path2.join)(Properties_default.pluginsPath, pluginName);
      if (!await PlatformManager.current.exists(pluginPath)) {
        this.logger.error(`Plugin file not found: ${pluginPath}`);
        return;
      }
      const plugin = await PlatformManager.current.readFile(pluginPath);
      const script = document.createElement("script");
      script.innerHTML = plugin;
      script.id = pluginName;
      document.body.appendChild(script);
      const enabledPlugins = JSON.parse(
        localStorage.getItem(STORAGE_KEYS.ENABLED_PLUGINS) || "[]"
      );
      if (!enabledPlugins.includes(pluginName)) {
        enabledPlugins.push(pluginName);
        localStorage.setItem(STORAGE_KEYS.ENABLED_PLUGINS, JSON.stringify(enabledPlugins));
      }
      this.logger.info(`Plugin ${pluginName} loaded!`);
    }
    /**
     * Unload and disable a plugin by filename
     */
    static unloadPlugin(pluginName) {
      const pluginElement = document.getElementById(pluginName);
      if (pluginElement) {
        pluginElement.remove();
      }
      let enabledPlugins = JSON.parse(
        localStorage.getItem(STORAGE_KEYS.ENABLED_PLUGINS) || "[]"
      );
      enabledPlugins = enabledPlugins.filter((x) => x !== pluginName);
      localStorage.setItem(STORAGE_KEYS.ENABLED_PLUGINS, JSON.stringify(enabledPlugins));
      this.logger.info(`Plugin ${pluginName} unloaded!`);
    }
    /**
     * Fetch mods from the registry repository
     */
    static async fetchMods() {
      const response = await fetch(URLS.REGISTRY);
      return response.json();
    }
    /**
     * Download and save a mod (plugin or theme)
     */
    static async downloadMod(modLink, type) {
      this.logger.info(`Downloading ${type} from: ${modLink}`);
      const response = await fetch(modLink);
      if (!response.ok) throw new Error(`Failed to download: ${response.status} ${response.statusText}`);
      const saveDir = type === "plugin" ? Properties_default.pluginsPath : Properties_default.themesPath;
      if (!await PlatformManager.current.exists(saveDir)) {
        await PlatformManager.current.mkdir(saveDir);
      }
      const filename = (0, import_path2.basename)(new URL(modLink).pathname) || `${type}-${Date.now()}`;
      const filePath = (0, import_path2.join)(saveDir, filename);
      const content = await response.text();
      await PlatformManager.current.writeFile(filePath, content);
      this.logger.info(`Downloaded ${type} saved to: ${filePath}`);
      return filePath;
    }
    /**
     * Remove a mod file and clean up associated state
     */
    static async removeMod(fileName, type) {
      this.logger.info(`Removing ${type} file: ${fileName}`);
      switch (type) {
        case "plugin":
          if (await this.isPluginInstalled(fileName)) {
            await PlatformManager.current.unlink((0, import_path2.join)(Properties_default.pluginsPath, fileName));
            let enabledPlugins = JSON.parse(
              localStorage.getItem(STORAGE_KEYS.ENABLED_PLUGINS) || "[]"
            );
            if (enabledPlugins.includes(fileName)) {
              enabledPlugins = enabledPlugins.filter((x) => x !== fileName);
              localStorage.setItem(STORAGE_KEYS.ENABLED_PLUGINS, JSON.stringify(enabledPlugins));
            }
          }
          break;
        case "theme":
          if (await this.isThemeInstalled(fileName)) {
            if (localStorage.getItem(STORAGE_KEYS.CURRENT_THEME) === fileName) {
              localStorage.setItem(STORAGE_KEYS.CURRENT_THEME, "Default");
            }
            document.getElementById("activeTheme")?.remove();
            await PlatformManager.current.unlink((0, import_path2.join)(Properties_default.themesPath, fileName));
          }
          break;
      }
    }
    static async isThemeInstalled(fileName) {
      return (await this.getInstalledThemes()).includes(fileName);
    }
    static async isPluginInstalled(fileName) {
      return (await this.getInstalledPlugins()).includes(fileName);
    }
    static async getInstalledThemes() {
      const dirPath = Properties_default.themesPath;
      if (!await PlatformManager.current.exists(dirPath)) return [];
      const files = await PlatformManager.current.readdir(dirPath);
      const fileStats = await Promise.all(files.map(async (file) => {
        const stat2 = await PlatformManager.current.stat((0, import_path2.join)(dirPath, file));
        return { file, isFile: stat2.isFile };
      }));
      return fileStats.filter((f2) => f2.isFile).map((f2) => f2.file);
    }
    static async getInstalledPlugins() {
      const dirPath = Properties_default.pluginsPath;
      if (!await PlatformManager.current.exists(dirPath)) return [];
      const files = await PlatformManager.current.readdir(dirPath);
      const fileStats = await Promise.all(files.map(async (file) => {
        const stat2 = await PlatformManager.current.stat((0, import_path2.join)(dirPath, file));
        return { file, isFile: stat2.isFile };
      }));
      return fileStats.filter((f2) => f2.isFile).map((f2) => f2.file);
    }
    /**
     * Set up event listeners for plugin toggle checkboxes
     */
    static togglePluginListener() {
      Helpers_default.waitForElm(SELECTORS.PLUGINS_CATEGORY).then(() => {
        this.logger.info("Listening to plugin checkboxes...");
        const pluginCheckboxes = document.getElementsByClassName("plugin");
        for (let i = 0; i < pluginCheckboxes.length; i++) {
          pluginCheckboxes[i].addEventListener("click", async () => {
            pluginCheckboxes[i].classList.toggle(CLASSES.CHECKED);
            const pluginName = pluginCheckboxes[i].getAttribute("name");
            if (!pluginName) return;
            if (pluginCheckboxes[i].classList.contains(CLASSES.CHECKED)) {
              await this.loadPlugin(pluginName);
            } else {
              this.unloadPlugin(pluginName);
              this.showReloadWarning();
            }
          });
        }
      }).catch((err) => this.logger.error(`Failed to setup plugin listeners: ${err}`));
    }
    static showReloadWarning() {
      if (document.getElementById("plugin-reload-warning")) return;
      this.logger.info("Plugin unloaded, adding reload warning.");
      const container = document.querySelector(SELECTORS.PLUGINS_CATEGORY);
      if (!container) return;
      const paragraph = document.createElement("p");
      paragraph.id = "plugin-reload-warning";
      paragraph.style.color = "white";
      const link = document.createElement("a");
      link.style.color = "cyan";
      link.style.cursor = "pointer";
      link.textContent = "here";
      link.addEventListener("click", () => {
        window.location.href = "/";
      });
      paragraph.appendChild(document.createTextNode("Reload is required to disable plugins. Click "));
      paragraph.appendChild(link);
      paragraph.appendChild(document.createTextNode(" to reload."));
      container.appendChild(paragraph);
    }
    static openThemesFolder() {
      Helpers_default.waitForElm("#openthemesfolderBtn").then(() => {
        const button = document.getElementById("openthemesfolderBtn");
        button?.addEventListener("click", async () => {
          await this.openFolder(Properties_default.themesPath);
        });
      }).catch((err) => this.logger.error(`Failed to setup themes folder button: ${err}`));
    }
    static openPluginsFolder() {
      Helpers_default.waitForElm("#openpluginsfolderBtn").then(() => {
        const button = document.getElementById("openpluginsfolderBtn");
        button?.addEventListener("click", async () => {
          await this.openFolder(Properties_default.pluginsPath);
        });
      }).catch((err) => this.logger.error(`Failed to setup plugins folder button: ${err}`));
    }
    /**
     * Open a folder in the system file explorer
     */
    static async openFolder(folderPath) {
      try {
        await PlatformManager.current.openPath(folderPath);
      } catch (error) {
        this.logger.error(`Failed to open folder ${folderPath}: ${error}`);
      }
    }
    static scrollListener() {
      Helpers_default.waitForElm('[data-section="enhanced"]').then(() => {
        const enhanced = document.getElementById("enhanced");
        const enhancedNav = document.querySelector('[data-section="enhanced"]');
        if (!enhanced || !enhancedNav) return;
        enhancedNav.addEventListener("click", () => {
          const firstChild = document.querySelector("#enhanced > div");
          firstChild?.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
          Settings_default.activeSection(enhancedNav);
        });
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              Settings_default.activeSection(enhancedNav);
            } else {
              enhancedNav.classList.remove(CLASSES.SELECTED);
            }
          });
        }, { threshold: 0.1 });
        observer.observe(enhanced);
      }).catch((err) => this.logger.error(`Failed to setup scroll listener: ${err}`));
    }
    /**
     * Add the applyTheme function to the page
     */
    static addApplyThemeFunction() {
      const applyThemeScript = getApplyThemeTemplate();
      const script = document.createElement("script");
      script.innerHTML = applyThemeScript;
      document.body.appendChild(script);
    }
    /**
     * Check for updates for a specific plugin or theme
     */
    static async checkForItemUpdates(itemFile) {
      this.logger.info("Checking for updates for " + itemFile);
      const itemBox = document.getElementsByName(`${itemFile}-box`)[0];
      if (!itemBox) {
        this.logger.warn(`${itemFile}-box element not found.`);
        return;
      }
      const pluginOrTheme = itemFile.endsWith(".theme.css") ? "theme" : "plugin";
      const itemPath = (0, import_path2.join)(
        pluginOrTheme === "theme" ? Properties_default.themesPath : Properties_default.pluginsPath,
        itemFile
      );
      let fileContent = "";
      try {
        fileContent = await PlatformManager.current.readFile(itemPath);
      } catch (e) {
        this.logger.error(`Failed to read file ${itemPath}: ${e}`);
        return;
      }
      const installedItemMetaData = ExtractMetaData_default.extractMetadataFromText(fileContent);
      if (!installedItemMetaData || Object.keys(installedItemMetaData).length === 0) {
        return;
      }
      const updateUrl = installedItemMetaData.updateUrl;
      if (!updateUrl || updateUrl === "none") {
        this.logger.info(`No update URL provided for ${pluginOrTheme} (${installedItemMetaData.name})`);
        return;
      }
      try {
        const request = await fetch(updateUrl);
        if (request.status !== 200) {
          this.logger.warn(`Failed to fetch update for ${itemFile}: HTTP ${request.status}`);
          return;
        }
        const response = await request.text();
        const extractedMetaData = ExtractMetaData_default.extractMetadataFromText(response);
        if (!extractedMetaData) {
          this.logger.warn(`Failed to extract metadata from response for ${pluginOrTheme} (${installedItemMetaData.name})`);
          return;
        }
        if (Helpers_default.isNewerVersion(extractedMetaData.version, installedItemMetaData.version)) {
          this.logger.info(
            `Update available for ${pluginOrTheme} (${installedItemMetaData.name}): v${installedItemMetaData.version} -> v${extractedMetaData.version}`
          );
          const updateButton = document.getElementById(`${itemFile}-update`);
          if (updateButton) {
            updateButton.style.display = "flex";
            updateButton.addEventListener("click", async () => {
              await PlatformManager.current.writeFile(itemPath, response);
              Settings_default.removeItem(itemFile);
              Settings_default.addItem(pluginOrTheme, itemFile, extractedMetaData);
            });
          }
        } else {
          this.logger.info(
            `No update available for ${pluginOrTheme} (${installedItemMetaData.name}). Current version: v${installedItemMetaData.version}`
          );
        }
      } catch (error) {
        this.logger.error(`Error checking updates for ${itemFile}: ${error.message}`);
      }
    }
  };
  __publicField(ModManager, "logger", getLogger("ModManager"));
  var ModManager_default = ModManager;

  // src/core/Settings.ts
  var Settings = class {
    /**
     * Add a new section to the settings panel
     */
    static addSection(sectionId, title) {
      this.waitForSettingsPanel().then(() => {
        this.logger.info(`Adding section: ${sectionId} with title: ${title}`);
        const settingsPanel = this.getSettingsPanel();
        if (!settingsPanel) return;
        const sectionElement = this.getExistingSection(settingsPanel);
        const labelElement = this.getExistingSectionLabel(sectionElement);
        if (!sectionElement || !labelElement) return;
        const sectionClassName = sectionElement.className;
        const titleClassName = labelElement.className;
        const sectionContainer = document.createElement("div");
        sectionContainer.className = sectionClassName;
        sectionContainer.id = sectionId;
        const sectionTitle = document.createElement("div");
        sectionTitle.className = titleClassName;
        sectionTitle.textContent = title;
        sectionContainer.appendChild(sectionTitle);
        settingsPanel.appendChild(sectionContainer);
        this.waitForNavMenu().then(() => {
          const nav = this.getNavMenu();
          const shortcutsNav = this.getNavShortcutItem();
          if (!nav) return;
          if (document.querySelector(`[data-section="${sectionId}"]`)) return;
          const enhancedNavContainer = document.createElement("div");
          enhancedNavContainer.innerHTML = getEnhancedNav();
          if (shortcutsNav) {
            nav.insertBefore(enhancedNavContainer, shortcutsNav.nextSibling);
          } else {
            nav.appendChild(enhancedNavContainer);
          }
        }).catch((err) => this.logger.error(`Failed to add nav: ${err}`));
      }).catch((err) => this.logger.error(`Failed to add section: ${err}`));
    }
    /**
     * Add a category within a section
     */
    static addCategory(title, sectionId, icon) {
      this.waitForSettingsPanel().then(() => {
        this.logger.info(`Adding category: ${title} to section: ${sectionId}`);
        const categoryTemplate = this.getCategoryTemplate();
        if (!categoryTemplate) return;
        const { categoryClass, categoryTitleClass, headingClass, iconClass } = categoryTemplate;
        icon = icon.replace(`class="icon"`, `class="${iconClass}"`);
        const section = document.getElementById(sectionId);
        if (!section) return;
        const categoryDiv = document.createElement("div");
        categoryDiv.className = categoryClass;
        const titleDiv = document.createElement("div");
        titleDiv.className = categoryTitleClass;
        titleDiv.innerHTML = title;
        const headingDiv = document.createElement("div");
        if (headingClass) {
          headingDiv.className = headingClass;
        } else {
          headingDiv.classList.add(SELECTORS.CATEGORY_HEADING.replace(".", ""));
        }
        headingDiv.innerHTML += icon;
        headingDiv.appendChild(titleDiv);
        categoryDiv.appendChild(headingDiv);
        section.appendChild(categoryDiv);
      }).catch((err) => this.logger.error(`Failed to add category: ${err}`));
    }
    /**
     * Add a button to the settings
     */
    static addButton(title, id, query) {
      Helpers_default.waitForElm(query).then(() => {
        const element = document.querySelector(query);
        if (!element) return;
        const optionDiv = document.createElement("div");
        optionDiv.classList.add(CLASSES.OPTION);
        const contentDiv = document.createElement("div");
        contentDiv.classList.add(CLASSES.CONTENT);
        const buttonDiv = document.createElement("div");
        buttonDiv.setAttribute("tabindex", "0");
        buttonDiv.setAttribute("title", title);
        buttonDiv.classList.add(CLASSES.BUTTON, CLASSES.BUTTON_CONTAINER, "button");
        buttonDiv.id = id;
        buttonDiv.textContent = title;
        contentDiv.appendChild(buttonDiv);
        optionDiv.appendChild(contentDiv);
        element.appendChild(optionDiv);
      }).catch((err) => this.logger.error(`Failed to add button: ${err}`));
    }
    /**
     * Add a theme or plugin item to the settings
     */
    static addItem(type, fileName, metaData) {
      this.logger.info(`Adding ${type}: ${fileName}`);
      if (type === "theme") {
        Helpers_default.waitForElm(SELECTORS.THEMES_CATEGORY).then(() => {
          this.addTheme(fileName, metaData);
        }).catch((err) => this.logger.error(`Failed to add theme: ${err}`));
      } else if (type === "plugin") {
        Helpers_default.waitForElm(SELECTORS.PLUGINS_CATEGORY).then(() => {
          this.addPlugin(fileName, metaData);
        }).catch((err) => this.logger.error(`Failed to add plugin: ${err}`));
      }
    }
    static addPlugin(fileName, metaData) {
      const enabledPlugins = JSON.parse(
        localStorage.getItem(STORAGE_KEYS.ENABLED_PLUGINS) || "[]"
      );
      const pluginContainer = document.createElement("div");
      pluginContainer.innerHTML = getPluginItemTemplate(fileName, metaData, enabledPlugins.includes(fileName));
      pluginContainer.setAttribute("name", `${fileName}-box`);
      const pluginsCategory = document.querySelector(SELECTORS.PLUGINS_CATEGORY);
      pluginsCategory?.appendChild(pluginContainer);
      ModManager_default.checkForItemUpdates(fileName);
    }
    static addTheme(fileName, metaData) {
      const currentTheme = localStorage.getItem(STORAGE_KEYS.CURRENT_THEME);
      const themeContainer = document.createElement("div");
      themeContainer.innerHTML = getThemeItemTemplate(fileName, metaData, currentTheme === fileName);
      themeContainer.setAttribute("name", `${fileName}-box`);
      const themesCategory = document.querySelector(SELECTORS.THEMES_CATEGORY);
      themesCategory?.appendChild(themeContainer);
      ModManager_default.checkForItemUpdates(fileName);
    }
    /**
     * Remove an item from the settings
     */
    static removeItem(fileName) {
      const element = document.getElementsByName(`${fileName}-box`)[0];
      element?.remove();
    }
    /**
     * Set a navigation element as active
     */
    static activeSection(element) {
      const nav = this.getNavMenu();
      if (nav) {
        for (let i = 0; i < nav.children.length; i++) {
          nav.children[i].classList.remove(CLASSES.SELECTED);
        }
      } else {
        for (let i = 0; i < 6; i++) {
          const navItem = document.querySelector(`${SELECTORS.NAV_MENU} > div:nth-child(${i})`);
          navItem?.classList.remove(CLASSES.SELECTED);
        }
      }
      element.classList.add(CLASSES.SELECTED);
    }
    // --- Dynamic Discovery Helpers ---
    static getNavMenu() {
      const nav = document.querySelector(SELECTORS.NAV_MENU);
      if (nav) return nav;
      const keywords = ["General", "Interface", "Player", "Streaming", "Shortcuts"];
      const links = Array.from(document.querySelectorAll("a, div[title]"));
      for (const link of links) {
        const title = link.getAttribute("title");
        if (title && keywords.includes(title)) {
          let parent = link.parentElement;
          while (parent) {
            const found = keywords.filter((k) => parent.querySelector(`[title="${k}"]`));
            if (found.length >= 2) {
              return parent;
            }
            parent = parent.parentElement;
            if (parent === document.body) break;
          }
        }
      }
      return null;
    }
    static getNavShortcutItem() {
      const item = document.querySelector('[title="Shortcuts"]') || document.querySelector('[title="Streaming"]');
      return item;
    }
    static getSettingsPanel() {
      const panel = document.querySelector(SELECTORS.SECTIONS_CONTAINER);
      if (panel) return panel;
      const navMenu = this.getNavMenu();
      const keywords = ["General", "Interface", "Player", "Streaming", "Shortcuts"];
      const allDivs = Array.from(document.querySelectorAll("div"));
      for (const div of allDivs) {
        if (navMenu && (div === navMenu || navMenu.contains(div))) continue;
        if (div.children.length > 2) {
          let matchCount = 0;
          for (let i = 0; i < div.children.length; i++) {
            if (keywords.some((k) => div.children[i].textContent?.includes(k))) {
              matchCount++;
            }
          }
          if (matchCount >= 2) return div;
        }
      }
      return null;
    }
    static getExistingSection(panel) {
      const keywords = ["General", "Interface", "Player", "Streaming", "Shortcuts"];
      for (let i = 0; i < panel.children.length; i++) {
        const child = panel.children[i];
        if (keywords.some((k) => child.textContent?.includes(k))) {
          return child;
        }
      }
      return document.querySelector(SELECTORS.SECTION);
    }
    static getExistingSectionLabel(section) {
      if (!section) return null;
      if (section.children.length > 0) return section.children[0];
      return document.querySelector(SELECTORS.LABEL);
    }
    static getCategoryTemplate() {
      const categoryElement = document.querySelector(SELECTORS.CATEGORY);
      const categoryTitleElement = document.querySelector(SELECTORS.CATEGORY_LABEL);
      const categoryIconElement = document.querySelector(SELECTORS.CATEGORY_ICON);
      const categoryHeadingElement = document.querySelector(SELECTORS.CATEGORY_HEADING);
      let categoryClass = categoryElement?.className || "";
      let categoryTitleClass = categoryTitleElement?.className || "";
      let headingClass = categoryHeadingElement?.className || "";
      let iconClass = "icon";
      if (categoryIconElement instanceof SVGElement) {
        iconClass = categoryIconElement.className.baseVal;
      } else if (categoryIconElement) {
        iconClass = categoryIconElement.className;
      }
      if (categoryClass && categoryTitleClass) {
        return { categoryClass, categoryTitleClass, headingClass, iconClass };
      }
      const panel = this.getSettingsPanel();
      if (panel) {
        const section = this.getExistingSection(panel);
        if (section) {
          for (let i = 0; i < section.children.length; i++) {
            const child = section.children[i];
            const label = this.getExistingSectionLabel(section);
            if (child === label) continue;
            categoryClass = child.className;
            const heading = child.children[0];
            if (heading) {
              headingClass = heading.className;
              const icon = heading.querySelector("svg") || heading.children[0];
              if (icon) {
                if (icon instanceof SVGElement) iconClass = icon.className.baseVal;
                else iconClass = icon.className;
              }
              const title = heading.querySelector("div") || heading.children[1];
              if (title) categoryTitleClass = title.className;
            }
            if (categoryClass && categoryTitleClass) {
              return { categoryClass, categoryTitleClass, headingClass, iconClass };
            }
          }
        }
      }
      return null;
    }
    static waitForSettingsPanel() {
      return new Promise((resolve2) => {
        let retries = 0;
        const maxRetries = 20;
        const interval = setInterval(() => {
          if (this.getSettingsPanel()) {
            clearInterval(interval);
            resolve2();
          } else {
            retries++;
            if (retries > maxRetries) {
              clearInterval(interval);
              this.logger.error("Timeout waiting for settings panel");
              resolve2();
            }
          }
        }, 500);
      });
    }
    static waitForNavMenu() {
      return new Promise((resolve2) => {
        let retries = 0;
        const maxRetries = 20;
        const interval = setInterval(() => {
          if (this.getNavMenu()) {
            clearInterval(interval);
            resolve2();
          } else {
            retries++;
            if (retries > maxRetries) {
              clearInterval(interval);
              this.logger.error("Timeout waiting for nav menu");
              resolve2();
            }
          }
        }, 500);
      });
    }
  };
  __publicField(Settings, "logger", getLogger("Settings"));
  var Settings_default = Settings;

  // src/components/mods-tab/modsTab.ts
  function getModsTabTemplate() {
    return templateCache_browser_default.load("/", "mods-tab");
  }

  // src/components/mods-item/modsItem.ts
  function getModItemTemplate(metaData, type, installed) {
    let template = templateCache_browser_default.load("/", "mods-item");
    let logoBlock = "";
    if (type === "Theme") {
      if (!metaData.preview) {
        logoBlock = `
        <svg class="icon-GxVbY" viewBox="0 0 24 24">
            <path d="M4 3h16a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm2 9h6a1 1 0 0 1 1 1v3h1v6h-4v-6h1v-2H5a1 1 0 0 1-1-1v-2h2v1zm11.732 1.732l1.768-1.768 1.768 1.768a2.5 2.5 0 1 1-3.536 0z" style="fill: currentcolor;"></path>
        </svg>`;
      } else {
        logoBlock = `
            <a href="${metaData.preview}" target="_blank" rel="noreferrer">
                <img class="logo-WrsGF" src="${metaData.preview}" alt="Theme Preview" loading="lazy">
            </a>`;
      }
    } else {
      logoBlock = `
        <svg class="icon-GxVbY" viewBox="0 0 512 512">
            <path d="M345.6500000000001 456.3000000000002h-70.87c-2.35 0.01-4.69-0.43-6.86-1.29-2.18-0.87-4.15-2.14-5.79-3.75-3.37-3.19-5.27-7.54-5.29-12.07v-26.33c0.03-4.05-0.81-8.07-2.49-11.79s-4.12-7.07-7.17-9.89c-7.78-7.22-19.04-11.22-30.8-10.93-21.33 0.47-39.27 18.35-39.27 39.07v19.87c0.01 2.24-0.45 4.48-1.36 6.55s-2.24 3.95-3.93 5.52c-3.35 3.21-7.9 5.02-12.65 5.04h-70.17c-14.71 0.01-28.83-5.55-39.23-15.46-10.42-9.91-16.28-23.36-16.29-37.4v-66.92c0.03-4.53 1.92-8.87 5.28-12.07 3.36-3.21 7.91-5.01 12.66-5.04h27.61c9.17 0 18.04-3.71 25.02-10.46 3.89-3.72 6.98-8.15 9.07-13.02a37.2 37.2 0 0 0 3.09-15.4c-0.3-20.15-17.64-37.17-37.98-37.17h-26.71c-2.35 0.01-4.69-0.43-6.87-1.29a17.7 17.7 0 0 1-5.79-3.75c-3.37-3.19-5.26-7.54-5.28-12.07v-66.92a50.9 50.9 0 0 1 4.19-20.25c2.76-6.43 6.86-12.25 12.06-17.11 10.39-9.91 24.48-15.48 39.17-15.5h55.02c2.12 0.01 4.16-0.77 5.68-2.19 0.73-0.71 1.32-1.55 1.71-2.49 0.4-0.93 0.6-1.92 0.58-2.92v-6.18a59 59 0 0 1 5.08-24.05c3.38-7.62 8.29-14.53 14.46-20.35 6.19-5.8 13.55-10.36 21.62-13.4a69.8 69.8 0 0 1 25.32-4.47c35.38 0.57 64.19 28.9 64.19 63.03v5.42c-0.03 1.51 0.42 3 1.29 4.25a7.73 7.73 0 0 0 3.61 2.81c0.98 0.37 2.03 0.56 3.07 0.54h55.02a56.4 56.4 0 0 1 20.93 3.99c13.4 5.31 24.04 15.46 29.6 28.24 2.77 6.32 4.2 13.11 4.19 19.96v52.47c-0.03 1.52 0.42 3.01 1.3 4.26a7.66 7.66 0 0 0 3.6 2.81c0.98 0.37 2.03 0.56 3.07 0.54h5.68c36.48 0 66.09 27.57 66.09 61.41 0 34.79-29.31 63.12-65.29 63.12h-6.48c-2.12-0.01-4.15 0.78-5.68 2.19a7.4 7.4 0 0 0-1.71 2.49c-0.4 0.93-0.6 1.93-0.58 2.93v53.23c0.01 6.85-1.42 13.64-4.19 19.96-5.56 12.78-16.2 22.93-29.6 28.24a56 56 0 0 1-20.93 3.99" style="fill: currentcolor;"></path>
        </svg>`;
    }
    const metaKeys = ["name", "description", "author", "version"];
    metaKeys.forEach((key) => {
      const regex = new RegExp(`{{\\s*${key}\\s*}}`, "g");
      template = template.replace(regex, metaData[key] || "");
    });
    return template.replace(/\{\{\s*type\s*\}\}/g, type).replace(/\{\{\s*actionbtnTitle\s*\}\}/g, installed ? "Uninstall" : "Install").replace("{{ actionbtnClass }}", installed ? "uninstall-button-container-oV4Yo" : "install-button-container-yfcq5").replace("{{ download }}", metaData.download).replace("{{ repo }}", metaData.repo).replace("<!-- theme preview here -->", logoBlock).replace("<!-- plugin icon here -->", "");
  }

  // src/components/about-category/aboutCategory.ts
  function getAboutCategoryTemplate(version, checkForUpdatesOnStartup, discordRichPresence, enableTransparentThemes) {
    const template = templateCache_browser_default.load("/", "about-category");
    return template.replace("{{ version }}", version).replace("{{ checkForUpdatesOnStartup }}", checkForUpdatesOnStartup ? "checked" : "").replace("{{ discordrichpresence }}", discordRichPresence ? "checked" : "").replace("{{ enableTransparentThemes }}", enableTransparentThemes ? "checked" : "");
  }

  // src/components/default-theme/defaultTheme.ts
  function getDefaultThemeTemplate(applied) {
    const template = templateCache_browser_default.load("/", "default-theme");
    return template.replace("{{ disabled }}", applied ? "disabled" : "").replace("{{ label }}", applied ? "Applied" : "Apply").replace("{{ backgroundColor }}", applied ? "var(--overlay-color)" : "var(--secondary-accent-color)");
  }

  // src/components/back-btn/backBtn.ts
  function getBackButton() {
    return templateCache_browser_default.load("/", "back-btn");
  }

  // src/android/preload.ts
  var import_path4 = __toESM(require_path_browserify());

  // node_modules/capacitor-nodejs/dist/esm/NodeJS.js
  init_dist();

  // node_modules/capacitor-nodejs/dist/esm/implementation.js
  init_dist();
  var CapacitorNodeJS = registerPlugin("CapacitorNodeJS", {
    web: () => Promise.resolve().then(() => (init_web3(), web_exports4)).then((m) => new m.CapacitorNodeJSWeb()),
    electron: () => window.CapacitorCustomPlatform.plugins.CapacitorNodeJS
  });

  // node_modules/capacitor-nodejs/dist/esm/NodeJS.js
  var NodeJSPlugin = class {
    constructor() {
      this.listenerList = [];
    }
    start(args) {
      return CapacitorNodeJS.start(args);
    }
    send(args) {
      return CapacitorNodeJS.send(args);
    }
    whenReady() {
      return CapacitorNodeJS.whenReady();
    }
    addListener(eventName, listenerFunc) {
      const listenerHandle = CapacitorNodeJS.addListener(eventName, (data) => {
        listenerFunc(data);
      });
      this.listenerList.push({ eventName, listenerHandle });
      return listenerHandle;
    }
    async removeListener(listenerHandle) {
      if (Capacitor.getPlatform() === "electron") {
        await CapacitorNodeJS.removeListener(listenerHandle);
      } else {
        await listenerHandle.remove();
      }
      for (let index = 0; index < this.listenerList.length; index++) {
        const listener = this.listenerList[index];
        if (listenerHandle === await listener.listenerHandle) {
          this.listenerList.splice(index, 1);
          break;
        }
      }
    }
    async removeAllListeners(eventName) {
      for (const listener of [...this.listenerList]) {
        if (!eventName || eventName === listener.eventName) {
          const listenerHandle = await listener.listenerHandle;
          await this.removeListener(listenerHandle);
        }
      }
    }
  };
  var NodeJS = new NodeJSPlugin();

  // src/core/LogManager.ts
  var import_path3 = __toESM(require_path_browserify());
  var _LogManager = class _LogManager {
    constructor() {
      __publicField(this, "logs", []);
      __publicField(this, "maxLogs", 1e3);
      __publicField(this, "originalConsole", {});
      __publicField(this, "isHooked", false);
    }
    static getInstance() {
      if (!_LogManager.instance) {
        _LogManager.instance = new _LogManager();
      }
      return _LogManager.instance;
    }
    hookConsole() {
      if (this.isHooked) return;
      this.isHooked = true;
      const methods = ["INFO", "WARN", "ERROR", "DEBUG"];
      methods.forEach((level) => {
        const consoleMethod = level.toLowerCase();
        this.originalConsole[consoleMethod] = console[consoleMethod].bind(console);
        console[consoleMethod] = (...args) => {
          this.addLog(level, args.map(
            (arg) => typeof arg === "object" ? JSON.stringify(arg) : String(arg)
          ).join(" "));
          this.originalConsole[consoleMethod](...args);
        };
      });
      this.originalConsole["log"] = console.log.bind(console);
      console.log = (...args) => {
        this.addLog("INFO", args.map(
          (arg) => typeof arg === "object" ? JSON.stringify(arg) : String(arg)
        ).join(" "));
        this.originalConsole["log"](...args);
      };
    }
    addLog(level, message) {
      const timestamp = (/* @__PURE__ */ new Date()).toISOString().split("T")[1].slice(0, -1);
      this.logs.push({ timestamp, level, message });
      if (this.logs.length > this.maxLogs) {
        this.logs.shift();
      }
    }
    async exportLogs() {
      try {
        const logsDir = (0, import_path3.join)(Properties_default.enhancedPath, "logs");
        if (!await PlatformManager.current.exists(logsDir)) {
          await PlatformManager.current.mkdir(logsDir);
        }
        const fileName = `stremio-enhanced-${(/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-")}.log`;
        const filePath = (0, import_path3.join)(logsDir, fileName);
        await PlatformManager.current.writeFile(filePath, this.serializeLogs());
        return filePath;
      } catch {
        return null;
      }
    }
    showLogs() {
      const overlayId = "stremio-enhanced-logs-overlay";
      if (document.getElementById(overlayId)) return;
      const overlay = document.createElement("div");
      overlay.id = overlayId;
      overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            z-index: 99999;
            display: flex;
            flex-direction: column;
            padding: 20px;
            box-sizing: border-box;
            color: #fff;
            font-family: monospace;
        `;
      const header = document.createElement("div");
      header.style.cssText = `
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
            background: #1a1a1a;
            padding: 10px;
            border-radius: 5px;
        `;
      const title = document.createElement("h2");
      title.textContent = "Logs";
      title.style.margin = "0";
      const controls = document.createElement("div");
      controls.style.display = "flex";
      controls.style.gap = "10px";
      const filterSelect = document.createElement("select");
      filterSelect.style.cssText = `
            background: #333;
            color: white;
            border: 1px solid #555;
            padding: 5px;
            border-radius: 3px;
        `;
      ["ALL", "INFO", "WARN", "ERROR"].forEach((level) => {
        const option = document.createElement("option");
        option.value = level;
        option.textContent = level;
        filterSelect.appendChild(option);
      });
      const copyBtn = document.createElement("button");
      copyBtn.textContent = "Copy All";
      copyBtn.style.cssText = `
            background: #4a4a4a;
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 3px;
            cursor: pointer;
        `;
      const exportBtn = document.createElement("button");
      exportBtn.textContent = "Export";
      exportBtn.style.cssText = `
            background: #2563eb;
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 3px;
            cursor: pointer;
        `;
      const closeBtn = document.createElement("button");
      closeBtn.textContent = "Close";
      closeBtn.style.cssText = `
            background: #c0392b;
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 3px;
            cursor: pointer;
        `;
      controls.appendChild(filterSelect);
      controls.appendChild(copyBtn);
      controls.appendChild(exportBtn);
      controls.appendChild(closeBtn);
      header.appendChild(title);
      header.appendChild(controls);
      const logsContainer = document.createElement("div");
      logsContainer.id = "logs-container";
      logsContainer.style.cssText = `
            flex: 1;
            overflow-y: auto;
            background: #111;
            padding: 10px;
            border-radius: 5px;
            white-space: pre-wrap;
            word-break: break-all;
            font-size: 12px;
        `;
      overlay.appendChild(header);
      overlay.appendChild(logsContainer);
      document.body.appendChild(overlay);
      const renderLogs = () => {
        const filter = filterSelect.value;
        const filteredLogs = filter === "ALL" ? this.logs : this.logs.filter((l) => l.level === filter);
        logsContainer.innerHTML = filteredLogs.map((l) => {
          const color = l.level === "ERROR" ? "#ff5555" : l.level === "WARN" ? "#ffb86c" : "#50fa7b";
          return `<div style="margin-bottom: 2px;"><span style="color: #6272a4">[${l.timestamp}]</span> <span style="color: ${color}">[${l.level}]</span> ${this.escapeHtml(l.message)}</div>`;
        }).join("");
        logsContainer.scrollTop = logsContainer.scrollHeight;
      };
      renderLogs();
      filterSelect.addEventListener("change", renderLogs);
      copyBtn.addEventListener("click", () => {
        const text = this.serializeLogs();
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("Copy");
        textArea.remove();
        const originalText = copyBtn.textContent;
        copyBtn.textContent = "Copied!";
        setTimeout(() => copyBtn.textContent = originalText, 2e3);
      });
      exportBtn.addEventListener("click", async () => {
        const originalText = exportBtn.textContent;
        exportBtn.textContent = "Exporting...";
        const exportedPath = await this.exportLogs();
        if (exportedPath) {
          exportBtn.textContent = "Exported!";
          await PlatformManager.current.openPath((0, import_path3.join)(Properties_default.enhancedPath, "logs"));
        } else {
          exportBtn.textContent = "Failed";
        }
        setTimeout(() => exportBtn.textContent = originalText, 2e3);
      });
      closeBtn.addEventListener("click", () => {
        overlay.remove();
      });
    }
    serializeLogs() {
      return this.logs.map((log) => `[${log.timestamp}] [${log.level}] ${log.message}`).join("\n");
    }
    escapeHtml(unsafe) {
      return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    }
  };
  __publicField(_LogManager, "instance");
  var LogManager = _LogManager;
  var LogManager_default = LogManager.getInstance();

  // src/android/preload.ts
  PlatformManager.init();
  LogManager_default.hookConsole();
  LogManager_default.addLog("INFO", "Stremio Enhanced: Preload script initialized");
  NodeJS.addListener("log", (data) => {
    LogManager_default.addLog("INFO", `[Server] ${data.args.join(" ")}`);
    console.log("[Server]", ...data.args);
  });
  NodeJS.addListener("error", (data) => {
    LogManager_default.addLog("ERROR", `[Server Error] ${data.args.join(" ")}`);
    console.error("[Server Error]", ...data.args);
    Helpers_default.showAlert("error", "Server Error", data.args.join(" "), ["OK"]);
  });
  var SETTINGS_ROUTE = "#/settings";
  var PLAYER_ROUTE = "#/player";
  var STREAMING_SERVER_READY_TIMEOUT_MS = 15e3;
  var FULLSCREEN_CONTROL_SELECTORS = [
    '[title="Fullscreen"]',
    '[title="Exit Fullscreen"]',
    'button[aria-label="Fullscreen"]',
    'button[aria-label="Exit Fullscreen"]',
    '[class*="fullscreen-toggle"]',
    '[class*="horizontal-nav-bar-container-"] [class*="buttons-container-"] > :not([class*="menu-button-container"]):not(.stremio-enhanced-pip-button)'
  ];
  var fullscreenStyleInjected = false;
  var fullscreenObserverStarted = false;
  var settingsObserverStarted = false;
  var settingsCheckScheduled = false;
  var playerObserverStarted = false;
  var playerFeatureCheckScheduled = false;
  var streamingServerReadyPromise = null;
  var streamingServerReloadScheduled = false;
  var init = async () => {
    LogManager_default.addLog("INFO", "Stremio Enhanced: Initialization started");
    if (!PlatformManager.current) PlatformManager.init();
    await PlatformManager.current.init();
    void ensureBundledStreamingServerReady();
    installFullscreenHider();
    observeSettingsUi();
    observePlayerUi();
    window.stremioEnhanced = {
      applyTheme: async (theme) => {
        await applyUserTheme();
      }
    };
    initializeUserSettings();
    await applyUserTheme();
    await loadEnabledPlugins();
    window.addEventListener("hashchange", () => {
      scheduleSettingsCheck();
      schedulePlayerFeatureSync();
    });
    window.addEventListener("resize", () => {
      hideFullscreenControls();
    });
    scheduleSettingsCheck();
    schedulePlayerFeatureSync();
    hideFullscreenControls();
    Helpers_default.createToast("enhanced-loaded", "Stremio Enhanced", "Stremio Enhanced Loaded", "success");
  };
  if (document.readyState === "loading") {
    window.addEventListener("load", init);
  } else {
    init();
  }
  async function checkSettings() {
    if (!location.href.includes(SETTINGS_ROUTE)) return;
    if (document.getElementById("enhanced") || document.querySelector('[data-section="enhanced"]')) return;
    ModManager_default.addApplyThemeFunction();
    const themesPath = Properties_default.themesPath;
    const pluginsPath = Properties_default.pluginsPath;
    let allThemes = [];
    let allPlugins = [];
    try {
      allThemes = await PlatformManager.current.readdir(themesPath);
      allPlugins = await PlatformManager.current.readdir(pluginsPath);
    } catch (e) {
      logger_browser_default.error("Failed to read themes/plugins directories: " + e);
    }
    const themesList = allThemes.filter((fileName) => fileName.endsWith(FILE_EXTENSIONS.THEME));
    const pluginsList = allPlugins.filter((fileName) => fileName.endsWith(FILE_EXTENSIONS.PLUGIN));
    logger_browser_default.info("Adding 'Enhanced' sections...");
    Settings_default.addSection("enhanced", "Enhanced");
    Settings_default.addCategory("Themes", "enhanced", getThemeIcon());
    Settings_default.addCategory("Plugins", "enhanced", getPluginIcon());
    Settings_default.addCategory("About", "enhanced", getAboutIcon());
    Settings_default.addButton("Import Theme", "importThemeBtn", SELECTORS.THEMES_CATEGORY);
    Settings_default.addButton("Manage Themes Folder", "openthemesfolderBtn", SELECTORS.THEMES_CATEGORY);
    Settings_default.addButton("Import Plugin", "importPluginBtn", SELECTORS.PLUGINS_CATEGORY);
    Settings_default.addButton("Manage Plugins Folder", "openpluginsfolderBtn", SELECTORS.PLUGINS_CATEGORY);
    setupImportButton("importThemeBtn", "theme");
    setupImportButton("importPluginBtn", "plugin");
    setupManagedFolderButton("openthemesfolderBtn", Properties_default.themesPath);
    setupManagedFolderButton("openpluginsfolderBtn", Properties_default.pluginsPath);
    writeAbout();
    setupBrowseModsButton();
    Helpers_default.waitForElm(SELECTORS.THEMES_CATEGORY).then(async () => {
      const isCurrentThemeDefault = localStorage.getItem(STORAGE_KEYS.CURRENT_THEME) === "Default";
      const defaultThemeContainer = document.createElement("div");
      defaultThemeContainer.innerHTML = getDefaultThemeTemplate(isCurrentThemeDefault);
      document.querySelector(SELECTORS.THEMES_CATEGORY)?.appendChild(defaultThemeContainer);
      for (const theme of themesList) {
        try {
          const themePath = (0, import_path4.join)(themesPath, theme);
          const content = await PlatformManager.current.readFile(themePath);
          const metaData = ExtractMetaData_default.extractMetadataFromText(content);
          if (metaData) {
            if (metaData.name.toLowerCase() !== "default") {
              Settings_default.addItem("theme", theme, {
                name: metaData.name,
                description: metaData.description,
                author: metaData.author,
                version: metaData.version,
                updateUrl: metaData.updateUrl,
                source: metaData.source
              });
            }
          }
        } catch (e) {
          logger_browser_default.error(`Failed to load theme metadata for ${theme}: ${e}`);
        }
      }
    }).catch((err) => logger_browser_default.error("Failed to setup themes: " + err));
    for (const plugin of pluginsList) {
      try {
        const pluginPath = (0, import_path4.join)(pluginsPath, plugin);
        const content = await PlatformManager.current.readFile(pluginPath);
        const metaData = ExtractMetaData_default.extractMetadataFromText(content);
        if (metaData) {
          Settings_default.addItem("plugin", plugin, {
            name: metaData.name,
            description: metaData.description,
            author: metaData.author,
            version: metaData.version,
            updateUrl: metaData.updateUrl,
            source: metaData.source
          });
        }
      } catch (e) {
        logger_browser_default.error(`Failed to load plugin metadata for ${plugin}: ${e}`);
      }
    }
    ModManager_default.togglePluginListener();
    ModManager_default.scrollListener();
  }
  async function ensureBundledStreamingServerReady() {
    if (streamingServerReadyPromise) {
      await streamingServerReadyPromise;
      return;
    }
    streamingServerReadyPromise = (async () => {
      try {
        await Promise.race([
          NodeJS.whenReady(),
          new Promise((_, reject) => {
            window.setTimeout(() => {
              reject(new Error("Timed out waiting for the bundled streaming server."));
            }, STREAMING_SERVER_READY_TIMEOUT_MS);
          })
        ]);
        LogManager_default.addLog("INFO", "Bundled streaming server is ready");
        scheduleStreamingServerReload();
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        LogManager_default.addLog("ERROR", `Bundled streaming server failed to become ready: ${message}`);
        logger_browser_default.error(`Bundled streaming server failed to become ready: ${message}`);
        streamingServerReadyPromise = null;
      }
    })();
    await streamingServerReadyPromise;
  }
  async function reloadStreamingServer(retryCount = 0) {
    try {
      await Helpers_default._eval(`core.transport.dispatch({ action: 'StreamingServer', args: { action: 'Reload' } });`);
      logger_browser_default.info("Stremio streaming server reloaded.");
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      if (retryCount < 3) {
        window.setTimeout(() => {
          void reloadStreamingServer(retryCount + 1);
        }, TIMEOUTS.CORESTATE_RETRY_INTERVAL);
        return;
      }
      logger_browser_default.error(`Failed to reload bundled streaming server: ${message}`);
      LogManager_default.addLog("ERROR", `Failed to reload bundled streaming server: ${message}`);
    }
  }
  function scheduleStreamingServerReload() {
    if (streamingServerReloadScheduled) return;
    streamingServerReloadScheduled = true;
    window.setTimeout(() => {
      streamingServerReloadScheduled = false;
      void reloadStreamingServer();
    }, TIMEOUTS.SERVER_RELOAD_DELAY);
  }
  function scheduleSettingsCheck() {
    if (settingsCheckScheduled) return;
    settingsCheckScheduled = true;
    window.setTimeout(async () => {
      settingsCheckScheduled = false;
      await checkSettings();
    }, 100);
  }
  function observeSettingsUi() {
    if (settingsObserverStarted) return;
    settingsObserverStarted = true;
    const startObserver = () => {
      const observer = new MutationObserver(() => {
        if (location.href.includes(SETTINGS_ROUTE) && !document.getElementById("enhanced")) {
          scheduleSettingsCheck();
        }
      });
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    };
    if (document.body) {
      startObserver();
      return;
    }
    const bodyObserver = new MutationObserver((_, obs) => {
      if (!document.body) return;
      obs.disconnect();
      startObserver();
    });
    bodyObserver.observe(document.documentElement, {
      childList: true,
      subtree: true
    });
  }
  function schedulePlayerFeatureSync() {
    if (playerFeatureCheckScheduled) return;
    playerFeatureCheckScheduled = true;
    window.setTimeout(async () => {
      playerFeatureCheckScheduled = false;
      await syncPlayerFeatures();
    }, 100);
  }
  function observePlayerUi() {
    if (playerObserverStarted) return;
    playerObserverStarted = true;
    const startObserver = () => {
      const observer = new MutationObserver(() => {
        if (location.href.includes(PLAYER_ROUTE)) {
          schedulePlayerFeatureSync();
        }
      });
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    };
    if (document.body) {
      startObserver();
      return;
    }
    const bodyObserver = new MutationObserver((_, obs) => {
      if (!document.body) return;
      obs.disconnect();
      startObserver();
    });
    bodyObserver.observe(document.documentElement, {
      childList: true,
      subtree: true
    });
  }
  function installFullscreenHider() {
    if (!fullscreenStyleInjected) {
      const style = document.createElement("style");
      style.id = "stremio-enhanced-fullscreen-style";
      style.textContent = `
            ${FULLSCREEN_CONTROL_SELECTORS.join(",\n            ")} {
                display: none !important;
                visibility: hidden !important;
                pointer-events: none !important;
            }
        `;
      const appendStyle = () => {
        if (!document.head || document.getElementById(style.id)) return false;
        document.head.appendChild(style);
        fullscreenStyleInjected = true;
        return true;
      };
      if (!appendStyle()) {
        const observer = new MutationObserver((_, obs) => {
          if (!appendStyle()) return;
          obs.disconnect();
        });
        observer.observe(document.documentElement, { childList: true, subtree: true });
      }
    }
    hideFullscreenControls();
    if (fullscreenObserverStarted) return;
    fullscreenObserverStarted = true;
    const startObserver = () => {
      const observer = new MutationObserver(() => {
        hideFullscreenControls();
      });
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["class", "title", "aria-label"]
      });
    };
    if (document.body) {
      startObserver();
      return;
    }
    const bodyObserver = new MutationObserver((_, obs) => {
      if (!document.body) return;
      obs.disconnect();
      startObserver();
    });
    bodyObserver.observe(document.documentElement, {
      childList: true,
      subtree: true
    });
  }
  function hideFullscreenControls() {
    document.querySelectorAll(FULLSCREEN_CONTROL_SELECTORS.join(",")).forEach((element) => {
      if (element.closest('[class*="menu-button-container"]') || element.classList.contains("stremio-enhanced-pip-button")) return;
      element.style.display = "none";
      element.style.visibility = "hidden";
      element.style.pointerEvents = "none";
    });
  }
  function initializeUserSettings() {
    const defaults = {
      [STORAGE_KEYS.ENABLED_PLUGINS]: "[]",
      [STORAGE_KEYS.CHECK_UPDATES_ON_STARTUP]: "false",
      [STORAGE_KEYS.DISCORD_RPC]: "false"
    };
    for (const [key, defaultValue] of Object.entries(defaults)) {
      if (!localStorage.getItem(key)) {
        localStorage.setItem(key, defaultValue);
      }
    }
  }
  async function applyUserTheme() {
    const currentTheme = localStorage.getItem(STORAGE_KEYS.CURRENT_THEME);
    if (!currentTheme || currentTheme === "Default") {
      localStorage.setItem(STORAGE_KEYS.CURRENT_THEME, "Default");
      return;
    }
    const themePath = (0, import_path4.join)(Properties_default.themesPath, currentTheme);
    try {
      if (!await PlatformManager.current.exists(themePath)) {
        localStorage.setItem(STORAGE_KEYS.CURRENT_THEME, "Default");
        return;
      }
      document.getElementById("activeTheme")?.remove();
      const content = await PlatformManager.current.readFile(themePath);
      const styleElement = document.createElement("style");
      styleElement.setAttribute("id", "activeTheme");
      styleElement.textContent = content;
      document.head.appendChild(styleElement);
    } catch (e) {
      logger_browser_default.error("Failed to apply theme: " + e);
    }
  }
  async function loadEnabledPlugins() {
    const pluginsPath = Properties_default.pluginsPath;
    try {
      if (!await PlatformManager.current.exists(pluginsPath)) return;
      const allPlugins = await PlatformManager.current.readdir(pluginsPath);
      const pluginsToLoad = allPlugins.filter((fileName) => fileName.endsWith(FILE_EXTENSIONS.PLUGIN));
      const enabledPlugins = JSON.parse(
        localStorage.getItem(STORAGE_KEYS.ENABLED_PLUGINS) || "[]"
      );
      for (const plugin of pluginsToLoad) {
        if (enabledPlugins.includes(plugin)) {
          await ModManager_default.loadPlugin(plugin);
        }
      }
    } catch (e) {
      logger_browser_default.error("Failed to load plugins: " + e);
    }
  }
  function setupImportButton(buttonId, type) {
    Helpers_default.waitForElm(`#${buttonId}`).then(() => {
      document.getElementById(buttonId)?.addEventListener("click", async () => {
        await importModFile(type);
      });
    }).catch((err) => logger_browser_default.error(`Failed to setup ${type} import button: ${err}`));
  }
  function setupManagedFolderButton(buttonId, folderPath) {
    Helpers_default.waitForElm(`#${buttonId}`).then(() => {
      document.getElementById(buttonId)?.addEventListener("click", async () => {
        await PlatformManager.current.openPath(folderPath);
      });
    }).catch((err) => logger_browser_default.error(`Failed to setup folder button ${buttonId}: ${err}`));
  }
  async function importModFile(type) {
    try {
      await FilePicker.requestPermissions();
      const result = await FilePicker.pickFiles({ limit: 1 });
      const file = result.files[0];
      if (!file?.name || !file.path) {
        return;
      }
      const expectedExtension = type === "theme" ? FILE_EXTENSIONS.THEME : FILE_EXTENSIONS.PLUGIN;
      if (!file.name.endsWith(expectedExtension)) {
        await Helpers_default.showAlert(
          "warning",
          "Unsupported File",
          `Please choose a ${expectedExtension} file.`,
          ["OK"]
        );
        return;
      }
      const content = await PlatformManager.current.readFile(file.path);
      const destinationDirectory = type === "theme" ? Properties_default.themesPath : Properties_default.pluginsPath;
      await PlatformManager.current.writeFile((0, import_path4.join)(destinationDirectory, file.name), content);
      location.reload();
    } catch (err) {
      logger_browser_default.error(`Failed to import ${type}: ${err}`);
    }
  }
  async function syncPlayerFeatures() {
    if (!PlatformManager.current.isPictureInPictureSupported()) {
      removePictureInPictureButton();
      return;
    }
    if (!location.href.includes(PLAYER_ROUTE)) {
      removePictureInPictureButton();
      await PlatformManager.current.setPictureInPictureState(false);
      return;
    }
    const video = document.querySelector("video");
    if (!video) {
      removePictureInPictureButton();
      await PlatformManager.current.setPictureInPictureState(false);
      return;
    }
    bindPlayerPictureInPicture(video);
    injectPictureInPictureButton();
    await updatePictureInPictureState(video);
  }
  function bindPlayerPictureInPicture(video) {
    if (video.dataset.stremioEnhancedPipBound === "true") return;
    video.dataset.stremioEnhancedPipBound = "true";
    const syncState = () => {
      void updatePictureInPictureState(video);
    };
    ["loadedmetadata", "play", "pause", "ended", "emptied", "resize"].forEach((eventName) => {
      video.addEventListener(eventName, syncState);
    });
  }
  async function updatePictureInPictureState(video) {
    if (!PlatformManager.current.isPictureInPictureSupported()) return;
    const currentVideo = video ?? document.querySelector("video");
    if (!currentVideo || !location.href.includes(PLAYER_ROUTE)) {
      await PlatformManager.current.setPictureInPictureState(false);
      return;
    }
    const width = currentVideo.videoWidth || 16;
    const height = currentVideo.videoHeight || 9;
    const isActivePlayback = currentVideo.readyState > 0 && !currentVideo.paused && !currentVideo.ended;
    await PlatformManager.current.setPictureInPictureState(isActivePlayback, width, height);
  }
  function injectPictureInPictureButton() {
    const existingButton = document.getElementById("stremio-enhanced-pip-btn");
    if (existingButton) return;
    const buttonsContainer = getPictureInPictureButtonContainer();
    if (!buttonsContainer) return;
    const templateButton = buttonsContainer.firstElementChild;
    const templateIcon = templateButton?.querySelector("svg");
    const button = document.createElement("button");
    button.id = "stremio-enhanced-pip-btn";
    button.type = "button";
    button.title = "Picture in Picture";
    button.setAttribute("aria-label", "Picture in Picture");
    button.className = `${templateButton?.className ?? ""} stremio-enhanced-pip-button`.trim();
    button.innerHTML = `
        <svg class="${templateIcon?.getAttribute("class") ?? ""}" viewBox="0 0 24 24">
            <path d="M19 7H5v10h14V7Zm0-2c1.11 0 2 .89 2 2v10c0 1.11-.89 2-2 2H5c-1.11 0-2-.89-2-2V7c0-1.11.89-2 2-2h14Zm-1 7h-6v4h6v-4Z" style="fill: currentColor;"></path>
        </svg>
    `;
    button.addEventListener("click", async () => {
      const currentVideo = document.querySelector("video");
      const success = await PlatformManager.current.enterPictureInPicture(
        currentVideo?.videoWidth || 16,
        currentVideo?.videoHeight || 9
      );
      if (!success) {
        Helpers_default.createToast(
          "pip-unavailable",
          "Picture in Picture",
          "Picture in Picture is not available on this device.",
          "fail"
        );
      }
    });
    buttonsContainer.insertBefore(button, buttonsContainer.firstChild);
  }
  function removePictureInPictureButton() {
    document.getElementById("stremio-enhanced-pip-btn")?.remove();
  }
  function getPictureInPictureButtonContainer() {
    const allContainers = Array.from(
      document.querySelectorAll('[class*="horizontal-nav-bar-container-"] [class*="buttons-container-"]')
    );
    return allContainers.at(-1) ?? null;
  }
  async function browseMods() {
    const settingsContent = document.querySelector(SELECTORS.SETTINGS_CONTENT);
    if (!settingsContent) return;
    settingsContent.innerHTML = getModsTabTemplate();
    const mods = await ModManager_default.fetchMods();
    const modsList = document.getElementById("mods-list");
    if (!modsList) return;
    for (const plugin of mods.plugins) {
      const installed = await ModManager_default.isPluginInstalled(Helpers_default.getFileNameFromUrl(plugin.download));
      modsList.innerHTML += getModItemTemplate(plugin, "Plugin", installed);
    }
    for (const theme of mods.themes) {
      const installed = await ModManager_default.isThemeInstalled(Helpers_default.getFileNameFromUrl(theme.download));
      modsList.innerHTML += getModItemTemplate(theme, "Theme", installed);
    }
    const actionBtns = document.querySelectorAll(".modActionBtn");
    actionBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const link = btn.getAttribute("data-link");
        const type = btn.getAttribute("data-type")?.toLowerCase();
        if (!link || !type) return;
        if (btn.getAttribute("title") === "Install") {
          ModManager_default.downloadMod(link, type);
          btn.classList.remove(CLASSES.INSTALL_BUTTON);
          btn.classList.add(CLASSES.UNINSTALL_BUTTON);
          btn.setAttribute("title", "Uninstall");
          if (btn.childNodes[1]) {
            btn.childNodes[1].textContent = "Uninstall";
          }
        } else {
          ModManager_default.removeMod(Helpers_default.getFileNameFromUrl(link), type);
          btn.classList.remove(CLASSES.UNINSTALL_BUTTON);
          btn.classList.add(CLASSES.INSTALL_BUTTON);
          btn.setAttribute("title", "Install");
          if (btn.childNodes[1]) {
            btn.childNodes[1].textContent = "Install";
          }
        }
      });
    });
    setupSearchBar();
    const horizontalNavs = document.querySelectorAll(SELECTORS.HORIZONTAL_NAV);
    const horizontalNav = horizontalNavs[1];
    if (horizontalNav) {
      horizontalNav.innerHTML = getBackButton();
      document.getElementById("back-btn")?.addEventListener("click", () => {
        location.hash = "#/";
        setTimeout(() => {
          location.hash = "#/settings";
        }, 0);
      });
    }
  }
  function setupSearchBar() {
    const searchInput = document.querySelector(SELECTORS.SEARCH_INPUT);
    const addonsContainer = document.querySelector(SELECTORS.ADDONS_LIST_CONTAINER);
    if (!searchInput || !addonsContainer) return;
    searchInput.addEventListener("input", () => {
      const filter = searchInput.value.trim().toLowerCase();
      const modItems = addonsContainer.querySelectorAll(SELECTORS.ADDON_CONTAINER);
      modItems.forEach((item) => {
        const name = item.querySelector(SELECTORS.NAME_CONTAINER)?.textContent?.toLowerCase() || "";
        const description = item.querySelector(SELECTORS.DESCRIPTION_ITEM)?.textContent?.toLowerCase() || "";
        const type = item.querySelector(SELECTORS.TYPES_CONTAINER)?.textContent?.toLowerCase() || "";
        const match = name.includes(filter) || description.includes(filter) || type.includes(filter);
        item.style.display = match ? "" : "none";
      });
    });
  }
  function setupBrowseModsButton() {
    Helpers_default.waitForElm("#browsePluginsThemesBtn").then(() => {
      const btn = document.getElementById("browsePluginsThemesBtn");
      btn?.addEventListener("click", browseMods);
    }).catch(() => {
    });
  }
  function writeAbout() {
    Helpers_default.waitForElm(SELECTORS.ABOUT_CATEGORY).then(async () => {
      const aboutCategory = document.querySelector(SELECTORS.ABOUT_CATEGORY);
      if (aboutCategory) {
        aboutCategory.innerHTML += getAboutCategoryTemplate(
          "Android-v1.0.0",
          false,
          false,
          false
        );
        Settings_default.addButton("Open Logs", "openLogsBtn", SELECTORS.ABOUT_CATEGORY);
        Settings_default.addButton("Export Logs", "exportLogsBtn", SELECTORS.ABOUT_CATEGORY);
        Settings_default.addButton("Reload Streaming Server", "reloadStreamingServerBtn", SELECTORS.ABOUT_CATEGORY);
        Settings_default.addButton("Open App Files", "openEnhancedFolderBtn", SELECTORS.ABOUT_CATEGORY);
        Helpers_default.waitForElm("#openLogsBtn").then(() => {
          document.getElementById("openLogsBtn")?.addEventListener("click", () => {
            LogManager_default.showLogs();
          });
        });
        Helpers_default.waitForElm("#exportLogsBtn").then(() => {
          document.getElementById("exportLogsBtn")?.addEventListener("click", async () => {
            const exportedPath = await LogManager_default.exportLogs();
            if (exportedPath) {
              await PlatformManager.current.openPath((0, import_path4.join)(Properties_default.enhancedPath, "logs"));
            }
          });
        });
        Helpers_default.waitForElm("#reloadStreamingServerBtn").then(() => {
          document.getElementById("reloadStreamingServerBtn")?.addEventListener("click", async () => {
            await ensureBundledStreamingServerReady();
            scheduleStreamingServerReload();
          });
        });
        Helpers_default.waitForElm("#openEnhancedFolderBtn").then(() => {
          document.getElementById("openEnhancedFolderBtn")?.addEventListener("click", async () => {
            await PlatformManager.current.openPath(Properties_default.enhancedPath);
          });
        });
      }
    }).catch((err) => logger_browser_default.error("Failed to write about section: " + err));
  }
  function getAboutIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon">
        <g><path fill="none" d="M0 0h24v24H0z"></path>
        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11v6h2v-6h-2zm0-4v2h2V7h-2z" style="fill:currentcolor"></path></g></svg>`;
  }
  function getThemeIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon">
        <g><path fill="none" d="M0 0h24v24H0z"></path>
        <path d="M4 3h16a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm2 9h6a1 1 0 0 1 1 1v3h1v6h-4v-6h1v-2H5a1 1 0 0 1-1-1v-2h2v1zm11.732 1.732l1.768-1.768 1.768 1.768a2.5 2.5 0 1 1-3.536 0z" style="fill: currentcolor;"></path></g></svg>`;
  }
  function getPluginIcon() {
    return `<svg icon="addons-outline" class="icon" viewBox="0 0 512 512" style="fill: currentcolor;">
        <path d="M413.7 246.1H386c-0.53-0.01-1.03-0.23-1.4-0.6-0.37-0.37-0.59-0.87-0.6-1.4v-77.2a38.94 38.94 0 0 0-11.4-27.5 38.94 38.94 0 0 0-27.5-11.4h-77.2c-0.53-0.01-1.03-0.23-1.4-0.6-0.37-0.37-0.59-0.87-0.6-1.4v-27.7c0-27.1-21.5-49.9-48.6-50.3-6.57-0.1-13.09 1.09-19.2 3.5a49.616 49.616 0 0 0-16.4 10.7 49.823 49.823 0 0 0-11 16.2 48.894 48.894 0 0 0-3.9 19.2v28.5c-0.01 0.53-0.23 1.03-0.6 1.4-0.37 0.37-0.87 0.59-1.4 0.6h-77.2c-10.5 0-20.57 4.17-28 11.6a39.594 39.594 0 0 0-11.6 28v70.4c0.01 0.53 0.23 1.03 0.6 1.4 0.37 0.37 0.87 0.59 1.4 0.6h26.9c29.4 0 53.7 25.5 54.1 54.8 0.4 29.9-23.5 57.2-53.3 57.2H50c-0.53 0.01-1.03 0.23-1.4 0.6-0.37 0.37-0.59 0.87-0.6 1.4v70.4c0 10.5 4.17 20.57 11.6 28s17.5 11.6 28 11.6h70.4c0.53-0.01 1.03-0.23 1.4-0.6 0.37-0.37 0.59-0.87 0.6-1.4V441.2c0-30.3 24.8-56.4 55-57.1 30.1-0.7 57 20.3 57 50.3v27.7c0.01 0.53 0.23 1.03 0.6 1.4 0.37 0.37 0.87 0.59 1.4 0.6h71.1a38.94 38.94 0 0 0 27.5-11.4 38.958 38.958 0 0 0 11.4-27.5v-78c0.01-0.53 0.23-1.03 0.6-1.4 0.37-0.37 0.87-0.59 1.4-0.6h28.5c27.6 0 49.5-22.7 49.5-50.4s-23.2-48.7-50.3-48.7Z" style="stroke:currentcolor;stroke-linecap:round;stroke-linejoin:round;stroke-width:32;fill: currentColor;"></path></svg>`;
  }
})();
/*! Bundled license information:

@capacitor/core/dist/index.js:
  (*! Capacitor: https://capacitorjs.com/ - MIT License *)
*/
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3BhdGgtYnJvd3NlcmlmeS9pbmRleC5qcyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvQGNhcGFjaXRvci9jb3JlL2J1aWxkL3V0aWwuanMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BjYXBhY2l0b3IvY29yZS9idWlsZC9ydW50aW1lLmpzIiwgIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9AY2FwYWNpdG9yL2NvcmUvYnVpbGQvZ2xvYmFsLmpzIiwgIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9AY2FwYWNpdG9yL2NvcmUvYnVpbGQvd2ViLXBsdWdpbi5qcyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvQGNhcGFjaXRvci9jb3JlL2J1aWxkL2NvcmUtcGx1Z2lucy5qcyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvQGNhcGFjaXRvci9maWxlc3lzdGVtL3NyYy9kZWZpbml0aW9ucy50cyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvQGNhcGFjaXRvci9maWxlc3lzdGVtL3NyYy93ZWIudHMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BjYXBhY2l0b3IvYnJvd3Nlci9zcmMvd2ViLnRzIiwgIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jYXBhY2l0b3Itbm9kZWpzL3NyYy93ZWIudHMiLCAiLi4vLi4vLi4vLi4vLi4vc3JjL3BsYXRmb3JtL0VsZWN0cm9uUGxhdGZvcm0udHMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BjYXBhY2l0b3IvZmlsZXN5c3RlbS9zcmMvaW5kZXgudHMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BjYXBhY2l0b3Ivc3luYXBzZS9kaXN0L3N5bmFwc2UubWpzIiwgIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9AY2FwYWNpdG9yL2Jyb3dzZXIvc3JjL2luZGV4LnRzIiwgIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9AY2FwYXdlc29tZS9jYXBhY2l0b3ItZmlsZS1waWNrZXIvc3JjL2luZGV4LnRzIiwgIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9AY2FwYXdlc29tZS9jYXBhY2l0b3ItZmlsZS1waWNrZXIvc3JjL3dlYi50cyIsICIuLi8uLi8uLi8uLi8uLi9zcmMvcGxhdGZvcm0vQ2FwYWNpdG9yUGxhdGZvcm0udHMiLCAiLi4vLi4vLi4vLi4vLi4vc3JjL3BsYXRmb3JtL1BsYXRmb3JtTWFuYWdlci50cyIsICIuLi8uLi8uLi8uLi8uLi9zcmMvdXRpbHMvbG9nZ2VyLmJyb3dzZXIudHMiLCAiLi4vLi4vLi4vLi4vLi4vc3JjL2NvbnN0YW50cy9pbmRleC50cyIsICIuLi8uLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9tb2RzLXRhYi9tb2RzLXRhYi5odG1sIiwgIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL21vZHMtaXRlbS9tb2RzLWl0ZW0uaHRtbCIsICIuLi8uLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9hYm91dC1jYXRlZ29yeS9hYm91dC1jYXRlZ29yeS5odG1sIiwgIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2RlZmF1bHQtdGhlbWUvZGVmYXVsdC10aGVtZS5odG1sIiwgIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2JhY2stYnRuL2JhY2stYnRuLmh0bWwiLCAiLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvdGl0bGUtYmFyL3RpdGxlLWJhci5odG1sIiwgIi4uLy4uLy4uLy4uLy4uL3NyYy91dGlscy90ZW1wbGF0ZUNhY2hlLmJyb3dzZXIudHMiLCAiLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvdG9hc3QvdG9hc3QudHMiLCAiLi4vLi4vLi4vLi4vLi4vc3JjL3V0aWxzL0hlbHBlcnMudHMiLCAiLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcGx1Z2luLWl0ZW0vcGx1Z2luSXRlbS50cyIsICIuLi8uLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy90aGVtZS1pdGVtL3RoZW1lSXRlbS50cyIsICIuLi8uLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9lbmhhbmNlZC1uYXYvZW5oYW5jZWROYXYudHMiLCAiLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvUHJvcGVydGllcy50cyIsICIuLi8uLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9hcHBseS10aGVtZS9hcHBseVRoZW1lLmJyb3dzZXIudHMiLCAiLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvTW9kTWFuYWdlci50cyIsICIuLi8uLi8uLi8uLi8uLi9zcmMvaW50ZXJmYWNlcy9NZXRhRGF0YS50cyIsICIuLi8uLi8uLi8uLi8uLi9zcmMvdXRpbHMvRXh0cmFjdE1ldGFEYXRhLnRzIiwgIi4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL1NldHRpbmdzLnRzIiwgIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL21vZHMtdGFiL21vZHNUYWIudHMiLCAiLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvbW9kcy1pdGVtL21vZHNJdGVtLnRzIiwgIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2Fib3V0LWNhdGVnb3J5L2Fib3V0Q2F0ZWdvcnkudHMiLCAiLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvZGVmYXVsdC10aGVtZS9kZWZhdWx0VGhlbWUudHMiLCAiLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvYmFjay1idG4vYmFja0J0bi50cyIsICIuLi8uLi8uLi8uLi8uLi9zcmMvYW5kcm9pZC9wcmVsb2FkLnRzIiwgIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jYXBhY2l0b3Itbm9kZWpzL3NyYy9Ob2RlSlMudHMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NhcGFjaXRvci1ub2RlanMvc3JjL2ltcGxlbWVudGF0aW9uLnRzIiwgIi4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL0xvZ01hbmFnZXIudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vICdwYXRoJyBtb2R1bGUgZXh0cmFjdGVkIGZyb20gTm9kZS5qcyB2OC4xMS4xIChvbmx5IHRoZSBwb3NpeCBwYXJ0KVxuLy8gdHJhbnNwbGl0ZWQgd2l0aCBCYWJlbFxuXG4vLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBhc3NlcnRQYXRoKHBhdGgpIHtcbiAgaWYgKHR5cGVvZiBwYXRoICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1BhdGggbXVzdCBiZSBhIHN0cmluZy4gUmVjZWl2ZWQgJyArIEpTT04uc3RyaW5naWZ5KHBhdGgpKTtcbiAgfVxufVxuXG4vLyBSZXNvbHZlcyAuIGFuZCAuLiBlbGVtZW50cyBpbiBhIHBhdGggd2l0aCBkaXJlY3RvcnkgbmFtZXNcbmZ1bmN0aW9uIG5vcm1hbGl6ZVN0cmluZ1Bvc2l4KHBhdGgsIGFsbG93QWJvdmVSb290KSB7XG4gIHZhciByZXMgPSAnJztcbiAgdmFyIGxhc3RTZWdtZW50TGVuZ3RoID0gMDtcbiAgdmFyIGxhc3RTbGFzaCA9IC0xO1xuICB2YXIgZG90cyA9IDA7XG4gIHZhciBjb2RlO1xuICBmb3IgKHZhciBpID0gMDsgaSA8PSBwYXRoLmxlbmd0aDsgKytpKSB7XG4gICAgaWYgKGkgPCBwYXRoLmxlbmd0aClcbiAgICAgIGNvZGUgPSBwYXRoLmNoYXJDb2RlQXQoaSk7XG4gICAgZWxzZSBpZiAoY29kZSA9PT0gNDcgLyovKi8pXG4gICAgICBicmVhaztcbiAgICBlbHNlXG4gICAgICBjb2RlID0gNDcgLyovKi87XG4gICAgaWYgKGNvZGUgPT09IDQ3IC8qLyovKSB7XG4gICAgICBpZiAobGFzdFNsYXNoID09PSBpIC0gMSB8fCBkb3RzID09PSAxKSB7XG4gICAgICAgIC8vIE5PT1BcbiAgICAgIH0gZWxzZSBpZiAobGFzdFNsYXNoICE9PSBpIC0gMSAmJiBkb3RzID09PSAyKSB7XG4gICAgICAgIGlmIChyZXMubGVuZ3RoIDwgMiB8fCBsYXN0U2VnbWVudExlbmd0aCAhPT0gMiB8fCByZXMuY2hhckNvZGVBdChyZXMubGVuZ3RoIC0gMSkgIT09IDQ2IC8qLiovIHx8IHJlcy5jaGFyQ29kZUF0KHJlcy5sZW5ndGggLSAyKSAhPT0gNDYgLyouKi8pIHtcbiAgICAgICAgICBpZiAocmVzLmxlbmd0aCA+IDIpIHtcbiAgICAgICAgICAgIHZhciBsYXN0U2xhc2hJbmRleCA9IHJlcy5sYXN0SW5kZXhPZignLycpO1xuICAgICAgICAgICAgaWYgKGxhc3RTbGFzaEluZGV4ICE9PSByZXMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICBpZiAobGFzdFNsYXNoSW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgcmVzID0gJyc7XG4gICAgICAgICAgICAgICAgbGFzdFNlZ21lbnRMZW5ndGggPSAwO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlcyA9IHJlcy5zbGljZSgwLCBsYXN0U2xhc2hJbmRleCk7XG4gICAgICAgICAgICAgICAgbGFzdFNlZ21lbnRMZW5ndGggPSByZXMubGVuZ3RoIC0gMSAtIHJlcy5sYXN0SW5kZXhPZignLycpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGxhc3RTbGFzaCA9IGk7XG4gICAgICAgICAgICAgIGRvdHMgPSAwO1xuICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5sZW5ndGggPT09IDIgfHwgcmVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgcmVzID0gJyc7XG4gICAgICAgICAgICBsYXN0U2VnbWVudExlbmd0aCA9IDA7XG4gICAgICAgICAgICBsYXN0U2xhc2ggPSBpO1xuICAgICAgICAgICAgZG90cyA9IDA7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFsbG93QWJvdmVSb290KSB7XG4gICAgICAgICAgaWYgKHJlcy5sZW5ndGggPiAwKVxuICAgICAgICAgICAgcmVzICs9ICcvLi4nO1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJlcyA9ICcuLic7XG4gICAgICAgICAgbGFzdFNlZ21lbnRMZW5ndGggPSAyO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAocmVzLmxlbmd0aCA+IDApXG4gICAgICAgICAgcmVzICs9ICcvJyArIHBhdGguc2xpY2UobGFzdFNsYXNoICsgMSwgaSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICByZXMgPSBwYXRoLnNsaWNlKGxhc3RTbGFzaCArIDEsIGkpO1xuICAgICAgICBsYXN0U2VnbWVudExlbmd0aCA9IGkgLSBsYXN0U2xhc2ggLSAxO1xuICAgICAgfVxuICAgICAgbGFzdFNsYXNoID0gaTtcbiAgICAgIGRvdHMgPSAwO1xuICAgIH0gZWxzZSBpZiAoY29kZSA9PT0gNDYgLyouKi8gJiYgZG90cyAhPT0gLTEpIHtcbiAgICAgICsrZG90cztcbiAgICB9IGVsc2Uge1xuICAgICAgZG90cyA9IC0xO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzO1xufVxuXG5mdW5jdGlvbiBfZm9ybWF0KHNlcCwgcGF0aE9iamVjdCkge1xuICB2YXIgZGlyID0gcGF0aE9iamVjdC5kaXIgfHwgcGF0aE9iamVjdC5yb290O1xuICB2YXIgYmFzZSA9IHBhdGhPYmplY3QuYmFzZSB8fCAocGF0aE9iamVjdC5uYW1lIHx8ICcnKSArIChwYXRoT2JqZWN0LmV4dCB8fCAnJyk7XG4gIGlmICghZGlyKSB7XG4gICAgcmV0dXJuIGJhc2U7XG4gIH1cbiAgaWYgKGRpciA9PT0gcGF0aE9iamVjdC5yb290KSB7XG4gICAgcmV0dXJuIGRpciArIGJhc2U7XG4gIH1cbiAgcmV0dXJuIGRpciArIHNlcCArIGJhc2U7XG59XG5cbnZhciBwb3NpeCA9IHtcbiAgLy8gcGF0aC5yZXNvbHZlKFtmcm9tIC4uLl0sIHRvKVxuICByZXNvbHZlOiBmdW5jdGlvbiByZXNvbHZlKCkge1xuICAgIHZhciByZXNvbHZlZFBhdGggPSAnJztcbiAgICB2YXIgcmVzb2x2ZWRBYnNvbHV0ZSA9IGZhbHNlO1xuICAgIHZhciBjd2Q7XG5cbiAgICBmb3IgKHZhciBpID0gYXJndW1lbnRzLmxlbmd0aCAtIDE7IGkgPj0gLTEgJiYgIXJlc29sdmVkQWJzb2x1dGU7IGktLSkge1xuICAgICAgdmFyIHBhdGg7XG4gICAgICBpZiAoaSA+PSAwKVxuICAgICAgICBwYXRoID0gYXJndW1lbnRzW2ldO1xuICAgICAgZWxzZSB7XG4gICAgICAgIGlmIChjd2QgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICBjd2QgPSBwcm9jZXNzLmN3ZCgpO1xuICAgICAgICBwYXRoID0gY3dkO1xuICAgICAgfVxuXG4gICAgICBhc3NlcnRQYXRoKHBhdGgpO1xuXG4gICAgICAvLyBTa2lwIGVtcHR5IGVudHJpZXNcbiAgICAgIGlmIChwYXRoLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgcmVzb2x2ZWRQYXRoID0gcGF0aCArICcvJyArIHJlc29sdmVkUGF0aDtcbiAgICAgIHJlc29sdmVkQWJzb2x1dGUgPSBwYXRoLmNoYXJDb2RlQXQoMCkgPT09IDQ3IC8qLyovO1xuICAgIH1cblxuICAgIC8vIEF0IHRoaXMgcG9pbnQgdGhlIHBhdGggc2hvdWxkIGJlIHJlc29sdmVkIHRvIGEgZnVsbCBhYnNvbHV0ZSBwYXRoLCBidXRcbiAgICAvLyBoYW5kbGUgcmVsYXRpdmUgcGF0aHMgdG8gYmUgc2FmZSAobWlnaHQgaGFwcGVuIHdoZW4gcHJvY2Vzcy5jd2QoKSBmYWlscylcblxuICAgIC8vIE5vcm1hbGl6ZSB0aGUgcGF0aFxuICAgIHJlc29sdmVkUGF0aCA9IG5vcm1hbGl6ZVN0cmluZ1Bvc2l4KHJlc29sdmVkUGF0aCwgIXJlc29sdmVkQWJzb2x1dGUpO1xuXG4gICAgaWYgKHJlc29sdmVkQWJzb2x1dGUpIHtcbiAgICAgIGlmIChyZXNvbHZlZFBhdGgubGVuZ3RoID4gMClcbiAgICAgICAgcmV0dXJuICcvJyArIHJlc29sdmVkUGF0aDtcbiAgICAgIGVsc2VcbiAgICAgICAgcmV0dXJuICcvJztcbiAgICB9IGVsc2UgaWYgKHJlc29sdmVkUGF0aC5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gcmVzb2x2ZWRQYXRoO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gJy4nO1xuICAgIH1cbiAgfSxcblxuICBub3JtYWxpemU6IGZ1bmN0aW9uIG5vcm1hbGl6ZShwYXRoKSB7XG4gICAgYXNzZXJ0UGF0aChwYXRoKTtcblxuICAgIGlmIChwYXRoLmxlbmd0aCA9PT0gMCkgcmV0dXJuICcuJztcblxuICAgIHZhciBpc0Fic29sdXRlID0gcGF0aC5jaGFyQ29kZUF0KDApID09PSA0NyAvKi8qLztcbiAgICB2YXIgdHJhaWxpbmdTZXBhcmF0b3IgPSBwYXRoLmNoYXJDb2RlQXQocGF0aC5sZW5ndGggLSAxKSA9PT0gNDcgLyovKi87XG5cbiAgICAvLyBOb3JtYWxpemUgdGhlIHBhdGhcbiAgICBwYXRoID0gbm9ybWFsaXplU3RyaW5nUG9zaXgocGF0aCwgIWlzQWJzb2x1dGUpO1xuXG4gICAgaWYgKHBhdGgubGVuZ3RoID09PSAwICYmICFpc0Fic29sdXRlKSBwYXRoID0gJy4nO1xuICAgIGlmIChwYXRoLmxlbmd0aCA+IDAgJiYgdHJhaWxpbmdTZXBhcmF0b3IpIHBhdGggKz0gJy8nO1xuXG4gICAgaWYgKGlzQWJzb2x1dGUpIHJldHVybiAnLycgKyBwYXRoO1xuICAgIHJldHVybiBwYXRoO1xuICB9LFxuXG4gIGlzQWJzb2x1dGU6IGZ1bmN0aW9uIGlzQWJzb2x1dGUocGF0aCkge1xuICAgIGFzc2VydFBhdGgocGF0aCk7XG4gICAgcmV0dXJuIHBhdGgubGVuZ3RoID4gMCAmJiBwYXRoLmNoYXJDb2RlQXQoMCkgPT09IDQ3IC8qLyovO1xuICB9LFxuXG4gIGpvaW46IGZ1bmN0aW9uIGpvaW4oKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApXG4gICAgICByZXR1cm4gJy4nO1xuICAgIHZhciBqb2luZWQ7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyArK2kpIHtcbiAgICAgIHZhciBhcmcgPSBhcmd1bWVudHNbaV07XG4gICAgICBhc3NlcnRQYXRoKGFyZyk7XG4gICAgICBpZiAoYXJnLmxlbmd0aCA+IDApIHtcbiAgICAgICAgaWYgKGpvaW5lZCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgIGpvaW5lZCA9IGFyZztcbiAgICAgICAgZWxzZVxuICAgICAgICAgIGpvaW5lZCArPSAnLycgKyBhcmc7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChqb2luZWQgPT09IHVuZGVmaW5lZClcbiAgICAgIHJldHVybiAnLic7XG4gICAgcmV0dXJuIHBvc2l4Lm5vcm1hbGl6ZShqb2luZWQpO1xuICB9LFxuXG4gIHJlbGF0aXZlOiBmdW5jdGlvbiByZWxhdGl2ZShmcm9tLCB0bykge1xuICAgIGFzc2VydFBhdGgoZnJvbSk7XG4gICAgYXNzZXJ0UGF0aCh0byk7XG5cbiAgICBpZiAoZnJvbSA9PT0gdG8pIHJldHVybiAnJztcblxuICAgIGZyb20gPSBwb3NpeC5yZXNvbHZlKGZyb20pO1xuICAgIHRvID0gcG9zaXgucmVzb2x2ZSh0byk7XG5cbiAgICBpZiAoZnJvbSA9PT0gdG8pIHJldHVybiAnJztcblxuICAgIC8vIFRyaW0gYW55IGxlYWRpbmcgYmFja3NsYXNoZXNcbiAgICB2YXIgZnJvbVN0YXJ0ID0gMTtcbiAgICBmb3IgKDsgZnJvbVN0YXJ0IDwgZnJvbS5sZW5ndGg7ICsrZnJvbVN0YXJ0KSB7XG4gICAgICBpZiAoZnJvbS5jaGFyQ29kZUF0KGZyb21TdGFydCkgIT09IDQ3IC8qLyovKVxuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgdmFyIGZyb21FbmQgPSBmcm9tLmxlbmd0aDtcbiAgICB2YXIgZnJvbUxlbiA9IGZyb21FbmQgLSBmcm9tU3RhcnQ7XG5cbiAgICAvLyBUcmltIGFueSBsZWFkaW5nIGJhY2tzbGFzaGVzXG4gICAgdmFyIHRvU3RhcnQgPSAxO1xuICAgIGZvciAoOyB0b1N0YXJ0IDwgdG8ubGVuZ3RoOyArK3RvU3RhcnQpIHtcbiAgICAgIGlmICh0by5jaGFyQ29kZUF0KHRvU3RhcnQpICE9PSA0NyAvKi8qLylcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHZhciB0b0VuZCA9IHRvLmxlbmd0aDtcbiAgICB2YXIgdG9MZW4gPSB0b0VuZCAtIHRvU3RhcnQ7XG5cbiAgICAvLyBDb21wYXJlIHBhdGhzIHRvIGZpbmQgdGhlIGxvbmdlc3QgY29tbW9uIHBhdGggZnJvbSByb290XG4gICAgdmFyIGxlbmd0aCA9IGZyb21MZW4gPCB0b0xlbiA/IGZyb21MZW4gOiB0b0xlbjtcbiAgICB2YXIgbGFzdENvbW1vblNlcCA9IC0xO1xuICAgIHZhciBpID0gMDtcbiAgICBmb3IgKDsgaSA8PSBsZW5ndGg7ICsraSkge1xuICAgICAgaWYgKGkgPT09IGxlbmd0aCkge1xuICAgICAgICBpZiAodG9MZW4gPiBsZW5ndGgpIHtcbiAgICAgICAgICBpZiAodG8uY2hhckNvZGVBdCh0b1N0YXJ0ICsgaSkgPT09IDQ3IC8qLyovKSB7XG4gICAgICAgICAgICAvLyBXZSBnZXQgaGVyZSBpZiBgZnJvbWAgaXMgdGhlIGV4YWN0IGJhc2UgcGF0aCBmb3IgYHRvYC5cbiAgICAgICAgICAgIC8vIEZvciBleGFtcGxlOiBmcm9tPScvZm9vL2Jhcic7IHRvPScvZm9vL2Jhci9iYXonXG4gICAgICAgICAgICByZXR1cm4gdG8uc2xpY2UodG9TdGFydCArIGkgKyAxKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGkgPT09IDApIHtcbiAgICAgICAgICAgIC8vIFdlIGdldCBoZXJlIGlmIGBmcm9tYCBpcyB0aGUgcm9vdFxuICAgICAgICAgICAgLy8gRm9yIGV4YW1wbGU6IGZyb209Jy8nOyB0bz0nL2ZvbydcbiAgICAgICAgICAgIHJldHVybiB0by5zbGljZSh0b1N0YXJ0ICsgaSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGZyb21MZW4gPiBsZW5ndGgpIHtcbiAgICAgICAgICBpZiAoZnJvbS5jaGFyQ29kZUF0KGZyb21TdGFydCArIGkpID09PSA0NyAvKi8qLykge1xuICAgICAgICAgICAgLy8gV2UgZ2V0IGhlcmUgaWYgYHRvYCBpcyB0aGUgZXhhY3QgYmFzZSBwYXRoIGZvciBgZnJvbWAuXG4gICAgICAgICAgICAvLyBGb3IgZXhhbXBsZTogZnJvbT0nL2Zvby9iYXIvYmF6JzsgdG89Jy9mb28vYmFyJ1xuICAgICAgICAgICAgbGFzdENvbW1vblNlcCA9IGk7XG4gICAgICAgICAgfSBlbHNlIGlmIChpID09PSAwKSB7XG4gICAgICAgICAgICAvLyBXZSBnZXQgaGVyZSBpZiBgdG9gIGlzIHRoZSByb290LlxuICAgICAgICAgICAgLy8gRm9yIGV4YW1wbGU6IGZyb209Jy9mb28nOyB0bz0nLydcbiAgICAgICAgICAgIGxhc3RDb21tb25TZXAgPSAwO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIHZhciBmcm9tQ29kZSA9IGZyb20uY2hhckNvZGVBdChmcm9tU3RhcnQgKyBpKTtcbiAgICAgIHZhciB0b0NvZGUgPSB0by5jaGFyQ29kZUF0KHRvU3RhcnQgKyBpKTtcbiAgICAgIGlmIChmcm9tQ29kZSAhPT0gdG9Db2RlKVxuICAgICAgICBicmVhaztcbiAgICAgIGVsc2UgaWYgKGZyb21Db2RlID09PSA0NyAvKi8qLylcbiAgICAgICAgbGFzdENvbW1vblNlcCA9IGk7XG4gICAgfVxuXG4gICAgdmFyIG91dCA9ICcnO1xuICAgIC8vIEdlbmVyYXRlIHRoZSByZWxhdGl2ZSBwYXRoIGJhc2VkIG9uIHRoZSBwYXRoIGRpZmZlcmVuY2UgYmV0d2VlbiBgdG9gXG4gICAgLy8gYW5kIGBmcm9tYFxuICAgIGZvciAoaSA9IGZyb21TdGFydCArIGxhc3RDb21tb25TZXAgKyAxOyBpIDw9IGZyb21FbmQ7ICsraSkge1xuICAgICAgaWYgKGkgPT09IGZyb21FbmQgfHwgZnJvbS5jaGFyQ29kZUF0KGkpID09PSA0NyAvKi8qLykge1xuICAgICAgICBpZiAob3V0Lmxlbmd0aCA9PT0gMClcbiAgICAgICAgICBvdXQgKz0gJy4uJztcbiAgICAgICAgZWxzZVxuICAgICAgICAgIG91dCArPSAnLy4uJztcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBMYXN0bHksIGFwcGVuZCB0aGUgcmVzdCBvZiB0aGUgZGVzdGluYXRpb24gKGB0b2ApIHBhdGggdGhhdCBjb21lcyBhZnRlclxuICAgIC8vIHRoZSBjb21tb24gcGF0aCBwYXJ0c1xuICAgIGlmIChvdXQubGVuZ3RoID4gMClcbiAgICAgIHJldHVybiBvdXQgKyB0by5zbGljZSh0b1N0YXJ0ICsgbGFzdENvbW1vblNlcCk7XG4gICAgZWxzZSB7XG4gICAgICB0b1N0YXJ0ICs9IGxhc3RDb21tb25TZXA7XG4gICAgICBpZiAodG8uY2hhckNvZGVBdCh0b1N0YXJ0KSA9PT0gNDcgLyovKi8pXG4gICAgICAgICsrdG9TdGFydDtcbiAgICAgIHJldHVybiB0by5zbGljZSh0b1N0YXJ0KTtcbiAgICB9XG4gIH0sXG5cbiAgX21ha2VMb25nOiBmdW5jdGlvbiBfbWFrZUxvbmcocGF0aCkge1xuICAgIHJldHVybiBwYXRoO1xuICB9LFxuXG4gIGRpcm5hbWU6IGZ1bmN0aW9uIGRpcm5hbWUocGF0aCkge1xuICAgIGFzc2VydFBhdGgocGF0aCk7XG4gICAgaWYgKHBhdGgubGVuZ3RoID09PSAwKSByZXR1cm4gJy4nO1xuICAgIHZhciBjb2RlID0gcGF0aC5jaGFyQ29kZUF0KDApO1xuICAgIHZhciBoYXNSb290ID0gY29kZSA9PT0gNDcgLyovKi87XG4gICAgdmFyIGVuZCA9IC0xO1xuICAgIHZhciBtYXRjaGVkU2xhc2ggPSB0cnVlO1xuICAgIGZvciAodmFyIGkgPSBwYXRoLmxlbmd0aCAtIDE7IGkgPj0gMTsgLS1pKSB7XG4gICAgICBjb2RlID0gcGF0aC5jaGFyQ29kZUF0KGkpO1xuICAgICAgaWYgKGNvZGUgPT09IDQ3IC8qLyovKSB7XG4gICAgICAgICAgaWYgKCFtYXRjaGVkU2xhc2gpIHtcbiAgICAgICAgICAgIGVuZCA9IGk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFdlIHNhdyB0aGUgZmlyc3Qgbm9uLXBhdGggc2VwYXJhdG9yXG4gICAgICAgIG1hdGNoZWRTbGFzaCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChlbmQgPT09IC0xKSByZXR1cm4gaGFzUm9vdCA/ICcvJyA6ICcuJztcbiAgICBpZiAoaGFzUm9vdCAmJiBlbmQgPT09IDEpIHJldHVybiAnLy8nO1xuICAgIHJldHVybiBwYXRoLnNsaWNlKDAsIGVuZCk7XG4gIH0sXG5cbiAgYmFzZW5hbWU6IGZ1bmN0aW9uIGJhc2VuYW1lKHBhdGgsIGV4dCkge1xuICAgIGlmIChleHQgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgZXh0ICE9PSAnc3RyaW5nJykgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJleHRcIiBhcmd1bWVudCBtdXN0IGJlIGEgc3RyaW5nJyk7XG4gICAgYXNzZXJ0UGF0aChwYXRoKTtcblxuICAgIHZhciBzdGFydCA9IDA7XG4gICAgdmFyIGVuZCA9IC0xO1xuICAgIHZhciBtYXRjaGVkU2xhc2ggPSB0cnVlO1xuICAgIHZhciBpO1xuXG4gICAgaWYgKGV4dCAhPT0gdW5kZWZpbmVkICYmIGV4dC5sZW5ndGggPiAwICYmIGV4dC5sZW5ndGggPD0gcGF0aC5sZW5ndGgpIHtcbiAgICAgIGlmIChleHQubGVuZ3RoID09PSBwYXRoLmxlbmd0aCAmJiBleHQgPT09IHBhdGgpIHJldHVybiAnJztcbiAgICAgIHZhciBleHRJZHggPSBleHQubGVuZ3RoIC0gMTtcbiAgICAgIHZhciBmaXJzdE5vblNsYXNoRW5kID0gLTE7XG4gICAgICBmb3IgKGkgPSBwYXRoLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBjb2RlID0gcGF0aC5jaGFyQ29kZUF0KGkpO1xuICAgICAgICBpZiAoY29kZSA9PT0gNDcgLyovKi8pIHtcbiAgICAgICAgICAgIC8vIElmIHdlIHJlYWNoZWQgYSBwYXRoIHNlcGFyYXRvciB0aGF0IHdhcyBub3QgcGFydCBvZiBhIHNldCBvZiBwYXRoXG4gICAgICAgICAgICAvLyBzZXBhcmF0b3JzIGF0IHRoZSBlbmQgb2YgdGhlIHN0cmluZywgc3RvcCBub3dcbiAgICAgICAgICAgIGlmICghbWF0Y2hlZFNsYXNoKSB7XG4gICAgICAgICAgICAgIHN0YXJ0ID0gaSArIDE7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKGZpcnN0Tm9uU2xhc2hFbmQgPT09IC0xKSB7XG4gICAgICAgICAgICAvLyBXZSBzYXcgdGhlIGZpcnN0IG5vbi1wYXRoIHNlcGFyYXRvciwgcmVtZW1iZXIgdGhpcyBpbmRleCBpbiBjYXNlXG4gICAgICAgICAgICAvLyB3ZSBuZWVkIGl0IGlmIHRoZSBleHRlbnNpb24gZW5kcyB1cCBub3QgbWF0Y2hpbmdcbiAgICAgICAgICAgIG1hdGNoZWRTbGFzaCA9IGZhbHNlO1xuICAgICAgICAgICAgZmlyc3ROb25TbGFzaEVuZCA9IGkgKyAxO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoZXh0SWR4ID49IDApIHtcbiAgICAgICAgICAgIC8vIFRyeSB0byBtYXRjaCB0aGUgZXhwbGljaXQgZXh0ZW5zaW9uXG4gICAgICAgICAgICBpZiAoY29kZSA9PT0gZXh0LmNoYXJDb2RlQXQoZXh0SWR4KSkge1xuICAgICAgICAgICAgICBpZiAoLS1leHRJZHggPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgLy8gV2UgbWF0Y2hlZCB0aGUgZXh0ZW5zaW9uLCBzbyBtYXJrIHRoaXMgYXMgdGhlIGVuZCBvZiBvdXIgcGF0aFxuICAgICAgICAgICAgICAgIC8vIGNvbXBvbmVudFxuICAgICAgICAgICAgICAgIGVuZCA9IGk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIEV4dGVuc2lvbiBkb2VzIG5vdCBtYXRjaCwgc28gb3VyIHJlc3VsdCBpcyB0aGUgZW50aXJlIHBhdGhcbiAgICAgICAgICAgICAgLy8gY29tcG9uZW50XG4gICAgICAgICAgICAgIGV4dElkeCA9IC0xO1xuICAgICAgICAgICAgICBlbmQgPSBmaXJzdE5vblNsYXNoRW5kO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3RhcnQgPT09IGVuZCkgZW5kID0gZmlyc3ROb25TbGFzaEVuZDtlbHNlIGlmIChlbmQgPT09IC0xKSBlbmQgPSBwYXRoLmxlbmd0aDtcbiAgICAgIHJldHVybiBwYXRoLnNsaWNlKHN0YXJ0LCBlbmQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGkgPSBwYXRoLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIGlmIChwYXRoLmNoYXJDb2RlQXQoaSkgPT09IDQ3IC8qLyovKSB7XG4gICAgICAgICAgICAvLyBJZiB3ZSByZWFjaGVkIGEgcGF0aCBzZXBhcmF0b3IgdGhhdCB3YXMgbm90IHBhcnQgb2YgYSBzZXQgb2YgcGF0aFxuICAgICAgICAgICAgLy8gc2VwYXJhdG9ycyBhdCB0aGUgZW5kIG9mIHRoZSBzdHJpbmcsIHN0b3Agbm93XG4gICAgICAgICAgICBpZiAoIW1hdGNoZWRTbGFzaCkge1xuICAgICAgICAgICAgICBzdGFydCA9IGkgKyAxO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKGVuZCA9PT0gLTEpIHtcbiAgICAgICAgICAvLyBXZSBzYXcgdGhlIGZpcnN0IG5vbi1wYXRoIHNlcGFyYXRvciwgbWFyayB0aGlzIGFzIHRoZSBlbmQgb2Ygb3VyXG4gICAgICAgICAgLy8gcGF0aCBjb21wb25lbnRcbiAgICAgICAgICBtYXRjaGVkU2xhc2ggPSBmYWxzZTtcbiAgICAgICAgICBlbmQgPSBpICsgMTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZW5kID09PSAtMSkgcmV0dXJuICcnO1xuICAgICAgcmV0dXJuIHBhdGguc2xpY2Uoc3RhcnQsIGVuZCk7XG4gICAgfVxuICB9LFxuXG4gIGV4dG5hbWU6IGZ1bmN0aW9uIGV4dG5hbWUocGF0aCkge1xuICAgIGFzc2VydFBhdGgocGF0aCk7XG4gICAgdmFyIHN0YXJ0RG90ID0gLTE7XG4gICAgdmFyIHN0YXJ0UGFydCA9IDA7XG4gICAgdmFyIGVuZCA9IC0xO1xuICAgIHZhciBtYXRjaGVkU2xhc2ggPSB0cnVlO1xuICAgIC8vIFRyYWNrIHRoZSBzdGF0ZSBvZiBjaGFyYWN0ZXJzIChpZiBhbnkpIHdlIHNlZSBiZWZvcmUgb3VyIGZpcnN0IGRvdCBhbmRcbiAgICAvLyBhZnRlciBhbnkgcGF0aCBzZXBhcmF0b3Igd2UgZmluZFxuICAgIHZhciBwcmVEb3RTdGF0ZSA9IDA7XG4gICAgZm9yICh2YXIgaSA9IHBhdGgubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgIHZhciBjb2RlID0gcGF0aC5jaGFyQ29kZUF0KGkpO1xuICAgICAgaWYgKGNvZGUgPT09IDQ3IC8qLyovKSB7XG4gICAgICAgICAgLy8gSWYgd2UgcmVhY2hlZCBhIHBhdGggc2VwYXJhdG9yIHRoYXQgd2FzIG5vdCBwYXJ0IG9mIGEgc2V0IG9mIHBhdGhcbiAgICAgICAgICAvLyBzZXBhcmF0b3JzIGF0IHRoZSBlbmQgb2YgdGhlIHN0cmluZywgc3RvcCBub3dcbiAgICAgICAgICBpZiAoIW1hdGNoZWRTbGFzaCkge1xuICAgICAgICAgICAgc3RhcnRQYXJ0ID0gaSArIDE7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgIGlmIChlbmQgPT09IC0xKSB7XG4gICAgICAgIC8vIFdlIHNhdyB0aGUgZmlyc3Qgbm9uLXBhdGggc2VwYXJhdG9yLCBtYXJrIHRoaXMgYXMgdGhlIGVuZCBvZiBvdXJcbiAgICAgICAgLy8gZXh0ZW5zaW9uXG4gICAgICAgIG1hdGNoZWRTbGFzaCA9IGZhbHNlO1xuICAgICAgICBlbmQgPSBpICsgMTtcbiAgICAgIH1cbiAgICAgIGlmIChjb2RlID09PSA0NiAvKi4qLykge1xuICAgICAgICAgIC8vIElmIHRoaXMgaXMgb3VyIGZpcnN0IGRvdCwgbWFyayBpdCBhcyB0aGUgc3RhcnQgb2Ygb3VyIGV4dGVuc2lvblxuICAgICAgICAgIGlmIChzdGFydERvdCA9PT0gLTEpXG4gICAgICAgICAgICBzdGFydERvdCA9IGk7XG4gICAgICAgICAgZWxzZSBpZiAocHJlRG90U3RhdGUgIT09IDEpXG4gICAgICAgICAgICBwcmVEb3RTdGF0ZSA9IDE7XG4gICAgICB9IGVsc2UgaWYgKHN0YXJ0RG90ICE9PSAtMSkge1xuICAgICAgICAvLyBXZSBzYXcgYSBub24tZG90IGFuZCBub24tcGF0aCBzZXBhcmF0b3IgYmVmb3JlIG91ciBkb3QsIHNvIHdlIHNob3VsZFxuICAgICAgICAvLyBoYXZlIGEgZ29vZCBjaGFuY2UgYXQgaGF2aW5nIGEgbm9uLWVtcHR5IGV4dGVuc2lvblxuICAgICAgICBwcmVEb3RTdGF0ZSA9IC0xO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzdGFydERvdCA9PT0gLTEgfHwgZW5kID09PSAtMSB8fFxuICAgICAgICAvLyBXZSBzYXcgYSBub24tZG90IGNoYXJhY3RlciBpbW1lZGlhdGVseSBiZWZvcmUgdGhlIGRvdFxuICAgICAgICBwcmVEb3RTdGF0ZSA9PT0gMCB8fFxuICAgICAgICAvLyBUaGUgKHJpZ2h0LW1vc3QpIHRyaW1tZWQgcGF0aCBjb21wb25lbnQgaXMgZXhhY3RseSAnLi4nXG4gICAgICAgIHByZURvdFN0YXRlID09PSAxICYmIHN0YXJ0RG90ID09PSBlbmQgLSAxICYmIHN0YXJ0RG90ID09PSBzdGFydFBhcnQgKyAxKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIHJldHVybiBwYXRoLnNsaWNlKHN0YXJ0RG90LCBlbmQpO1xuICB9LFxuXG4gIGZvcm1hdDogZnVuY3Rpb24gZm9ybWF0KHBhdGhPYmplY3QpIHtcbiAgICBpZiAocGF0aE9iamVjdCA9PT0gbnVsbCB8fCB0eXBlb2YgcGF0aE9iamVjdCAhPT0gJ29iamVjdCcpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcInBhdGhPYmplY3RcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgT2JqZWN0LiBSZWNlaXZlZCB0eXBlICcgKyB0eXBlb2YgcGF0aE9iamVjdCk7XG4gICAgfVxuICAgIHJldHVybiBfZm9ybWF0KCcvJywgcGF0aE9iamVjdCk7XG4gIH0sXG5cbiAgcGFyc2U6IGZ1bmN0aW9uIHBhcnNlKHBhdGgpIHtcbiAgICBhc3NlcnRQYXRoKHBhdGgpO1xuXG4gICAgdmFyIHJldCA9IHsgcm9vdDogJycsIGRpcjogJycsIGJhc2U6ICcnLCBleHQ6ICcnLCBuYW1lOiAnJyB9O1xuICAgIGlmIChwYXRoLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHJldDtcbiAgICB2YXIgY29kZSA9IHBhdGguY2hhckNvZGVBdCgwKTtcbiAgICB2YXIgaXNBYnNvbHV0ZSA9IGNvZGUgPT09IDQ3IC8qLyovO1xuICAgIHZhciBzdGFydDtcbiAgICBpZiAoaXNBYnNvbHV0ZSkge1xuICAgICAgcmV0LnJvb3QgPSAnLyc7XG4gICAgICBzdGFydCA9IDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXJ0ID0gMDtcbiAgICB9XG4gICAgdmFyIHN0YXJ0RG90ID0gLTE7XG4gICAgdmFyIHN0YXJ0UGFydCA9IDA7XG4gICAgdmFyIGVuZCA9IC0xO1xuICAgIHZhciBtYXRjaGVkU2xhc2ggPSB0cnVlO1xuICAgIHZhciBpID0gcGF0aC5sZW5ndGggLSAxO1xuXG4gICAgLy8gVHJhY2sgdGhlIHN0YXRlIG9mIGNoYXJhY3RlcnMgKGlmIGFueSkgd2Ugc2VlIGJlZm9yZSBvdXIgZmlyc3QgZG90IGFuZFxuICAgIC8vIGFmdGVyIGFueSBwYXRoIHNlcGFyYXRvciB3ZSBmaW5kXG4gICAgdmFyIHByZURvdFN0YXRlID0gMDtcblxuICAgIC8vIEdldCBub24tZGlyIGluZm9cbiAgICBmb3IgKDsgaSA+PSBzdGFydDsgLS1pKSB7XG4gICAgICBjb2RlID0gcGF0aC5jaGFyQ29kZUF0KGkpO1xuICAgICAgaWYgKGNvZGUgPT09IDQ3IC8qLyovKSB7XG4gICAgICAgICAgLy8gSWYgd2UgcmVhY2hlZCBhIHBhdGggc2VwYXJhdG9yIHRoYXQgd2FzIG5vdCBwYXJ0IG9mIGEgc2V0IG9mIHBhdGhcbiAgICAgICAgICAvLyBzZXBhcmF0b3JzIGF0IHRoZSBlbmQgb2YgdGhlIHN0cmluZywgc3RvcCBub3dcbiAgICAgICAgICBpZiAoIW1hdGNoZWRTbGFzaCkge1xuICAgICAgICAgICAgc3RhcnRQYXJ0ID0gaSArIDE7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgIGlmIChlbmQgPT09IC0xKSB7XG4gICAgICAgIC8vIFdlIHNhdyB0aGUgZmlyc3Qgbm9uLXBhdGggc2VwYXJhdG9yLCBtYXJrIHRoaXMgYXMgdGhlIGVuZCBvZiBvdXJcbiAgICAgICAgLy8gZXh0ZW5zaW9uXG4gICAgICAgIG1hdGNoZWRTbGFzaCA9IGZhbHNlO1xuICAgICAgICBlbmQgPSBpICsgMTtcbiAgICAgIH1cbiAgICAgIGlmIChjb2RlID09PSA0NiAvKi4qLykge1xuICAgICAgICAgIC8vIElmIHRoaXMgaXMgb3VyIGZpcnN0IGRvdCwgbWFyayBpdCBhcyB0aGUgc3RhcnQgb2Ygb3VyIGV4dGVuc2lvblxuICAgICAgICAgIGlmIChzdGFydERvdCA9PT0gLTEpIHN0YXJ0RG90ID0gaTtlbHNlIGlmIChwcmVEb3RTdGF0ZSAhPT0gMSkgcHJlRG90U3RhdGUgPSAxO1xuICAgICAgICB9IGVsc2UgaWYgKHN0YXJ0RG90ICE9PSAtMSkge1xuICAgICAgICAvLyBXZSBzYXcgYSBub24tZG90IGFuZCBub24tcGF0aCBzZXBhcmF0b3IgYmVmb3JlIG91ciBkb3QsIHNvIHdlIHNob3VsZFxuICAgICAgICAvLyBoYXZlIGEgZ29vZCBjaGFuY2UgYXQgaGF2aW5nIGEgbm9uLWVtcHR5IGV4dGVuc2lvblxuICAgICAgICBwcmVEb3RTdGF0ZSA9IC0xO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzdGFydERvdCA9PT0gLTEgfHwgZW5kID09PSAtMSB8fFxuICAgIC8vIFdlIHNhdyBhIG5vbi1kb3QgY2hhcmFjdGVyIGltbWVkaWF0ZWx5IGJlZm9yZSB0aGUgZG90XG4gICAgcHJlRG90U3RhdGUgPT09IDAgfHxcbiAgICAvLyBUaGUgKHJpZ2h0LW1vc3QpIHRyaW1tZWQgcGF0aCBjb21wb25lbnQgaXMgZXhhY3RseSAnLi4nXG4gICAgcHJlRG90U3RhdGUgPT09IDEgJiYgc3RhcnREb3QgPT09IGVuZCAtIDEgJiYgc3RhcnREb3QgPT09IHN0YXJ0UGFydCArIDEpIHtcbiAgICAgIGlmIChlbmQgIT09IC0xKSB7XG4gICAgICAgIGlmIChzdGFydFBhcnQgPT09IDAgJiYgaXNBYnNvbHV0ZSkgcmV0LmJhc2UgPSByZXQubmFtZSA9IHBhdGguc2xpY2UoMSwgZW5kKTtlbHNlIHJldC5iYXNlID0gcmV0Lm5hbWUgPSBwYXRoLnNsaWNlKHN0YXJ0UGFydCwgZW5kKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHN0YXJ0UGFydCA9PT0gMCAmJiBpc0Fic29sdXRlKSB7XG4gICAgICAgIHJldC5uYW1lID0gcGF0aC5zbGljZSgxLCBzdGFydERvdCk7XG4gICAgICAgIHJldC5iYXNlID0gcGF0aC5zbGljZSgxLCBlbmQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0Lm5hbWUgPSBwYXRoLnNsaWNlKHN0YXJ0UGFydCwgc3RhcnREb3QpO1xuICAgICAgICByZXQuYmFzZSA9IHBhdGguc2xpY2Uoc3RhcnRQYXJ0LCBlbmQpO1xuICAgICAgfVxuICAgICAgcmV0LmV4dCA9IHBhdGguc2xpY2Uoc3RhcnREb3QsIGVuZCk7XG4gICAgfVxuXG4gICAgaWYgKHN0YXJ0UGFydCA+IDApIHJldC5kaXIgPSBwYXRoLnNsaWNlKDAsIHN0YXJ0UGFydCAtIDEpO2Vsc2UgaWYgKGlzQWJzb2x1dGUpIHJldC5kaXIgPSAnLyc7XG5cbiAgICByZXR1cm4gcmV0O1xuICB9LFxuXG4gIHNlcDogJy8nLFxuICBkZWxpbWl0ZXI6ICc6JyxcbiAgd2luMzI6IG51bGwsXG4gIHBvc2l4OiBudWxsXG59O1xuXG5wb3NpeC5wb3NpeCA9IHBvc2l4O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBvc2l4O1xuIiwgImV4cG9ydCB2YXIgRXhjZXB0aW9uQ29kZTtcbihmdW5jdGlvbiAoRXhjZXB0aW9uQ29kZSkge1xuICAgIC8qKlxuICAgICAqIEFQSSBpcyBub3QgaW1wbGVtZW50ZWQuXG4gICAgICpcbiAgICAgKiBUaGlzIHVzdWFsbHkgbWVhbnMgdGhlIEFQSSBjYW4ndCBiZSB1c2VkIGJlY2F1c2UgaXQgaXMgbm90IGltcGxlbWVudGVkIGZvclxuICAgICAqIHRoZSBjdXJyZW50IHBsYXRmb3JtLlxuICAgICAqL1xuICAgIEV4Y2VwdGlvbkNvZGVbXCJVbmltcGxlbWVudGVkXCJdID0gXCJVTklNUExFTUVOVEVEXCI7XG4gICAgLyoqXG4gICAgICogQVBJIGlzIG5vdCBhdmFpbGFibGUuXG4gICAgICpcbiAgICAgKiBUaGlzIG1lYW5zIHRoZSBBUEkgY2FuJ3QgYmUgdXNlZCByaWdodCBub3cgYmVjYXVzZTpcbiAgICAgKiAgIC0gaXQgaXMgY3VycmVudGx5IG1pc3NpbmcgYSBwcmVyZXF1aXNpdGUsIHN1Y2ggYXMgbmV0d29yayBjb25uZWN0aXZpdHlcbiAgICAgKiAgIC0gaXQgcmVxdWlyZXMgYSBwYXJ0aWN1bGFyIHBsYXRmb3JtIG9yIGJyb3dzZXIgdmVyc2lvblxuICAgICAqL1xuICAgIEV4Y2VwdGlvbkNvZGVbXCJVbmF2YWlsYWJsZVwiXSA9IFwiVU5BVkFJTEFCTEVcIjtcbn0pKEV4Y2VwdGlvbkNvZGUgfHwgKEV4Y2VwdGlvbkNvZGUgPSB7fSkpO1xuZXhwb3J0IGNsYXNzIENhcGFjaXRvckV4Y2VwdGlvbiBleHRlbmRzIEVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlLCBjb2RlLCBkYXRhKSB7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgICAgICB0aGlzLmNvZGUgPSBjb2RlO1xuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgIH1cbn1cbmV4cG9ydCBjb25zdCBnZXRQbGF0Zm9ybUlkID0gKHdpbikgPT4ge1xuICAgIHZhciBfYSwgX2I7XG4gICAgaWYgKHdpbiA9PT0gbnVsbCB8fCB3aW4gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHdpbi5hbmRyb2lkQnJpZGdlKSB7XG4gICAgICAgIHJldHVybiAnYW5kcm9pZCc7XG4gICAgfVxuICAgIGVsc2UgaWYgKChfYiA9IChfYSA9IHdpbiA9PT0gbnVsbCB8fCB3aW4gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHdpbi53ZWJraXQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5tZXNzYWdlSGFuZGxlcnMpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5icmlkZ2UpIHtcbiAgICAgICAgcmV0dXJuICdpb3MnO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuICd3ZWInO1xuICAgIH1cbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD11dGlsLmpzLm1hcCIsICJpbXBvcnQgeyBDYXBhY2l0b3JFeGNlcHRpb24sIGdldFBsYXRmb3JtSWQsIEV4Y2VwdGlvbkNvZGUgfSBmcm9tICcuL3V0aWwnO1xuZXhwb3J0IGNvbnN0IGNyZWF0ZUNhcGFjaXRvciA9ICh3aW4pID0+IHtcbiAgICBjb25zdCBjYXBDdXN0b21QbGF0Zm9ybSA9IHdpbi5DYXBhY2l0b3JDdXN0b21QbGF0Zm9ybSB8fCBudWxsO1xuICAgIGNvbnN0IGNhcCA9IHdpbi5DYXBhY2l0b3IgfHwge307XG4gICAgY29uc3QgUGx1Z2lucyA9IChjYXAuUGx1Z2lucyA9IGNhcC5QbHVnaW5zIHx8IHt9KTtcbiAgICBjb25zdCBnZXRQbGF0Zm9ybSA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIGNhcEN1c3RvbVBsYXRmb3JtICE9PSBudWxsID8gY2FwQ3VzdG9tUGxhdGZvcm0ubmFtZSA6IGdldFBsYXRmb3JtSWQod2luKTtcbiAgICB9O1xuICAgIGNvbnN0IGlzTmF0aXZlUGxhdGZvcm0gPSAoKSA9PiBnZXRQbGF0Zm9ybSgpICE9PSAnd2ViJztcbiAgICBjb25zdCBpc1BsdWdpbkF2YWlsYWJsZSA9IChwbHVnaW5OYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IHBsdWdpbiA9IHJlZ2lzdGVyZWRQbHVnaW5zLmdldChwbHVnaW5OYW1lKTtcbiAgICAgICAgaWYgKHBsdWdpbiA9PT0gbnVsbCB8fCBwbHVnaW4gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHBsdWdpbi5wbGF0Zm9ybXMuaGFzKGdldFBsYXRmb3JtKCkpKSB7XG4gICAgICAgICAgICAvLyBKUyBpbXBsZW1lbnRhdGlvbiBhdmFpbGFibGUgZm9yIHRoZSBjdXJyZW50IHBsYXRmb3JtLlxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGdldFBsdWdpbkhlYWRlcihwbHVnaW5OYW1lKSkge1xuICAgICAgICAgICAgLy8gTmF0aXZlIGltcGxlbWVudGF0aW9uIGF2YWlsYWJsZS5cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICAgIGNvbnN0IGdldFBsdWdpbkhlYWRlciA9IChwbHVnaW5OYW1lKSA9PiB7IHZhciBfYTsgcmV0dXJuIChfYSA9IGNhcC5QbHVnaW5IZWFkZXJzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZmluZCgoaCkgPT4gaC5uYW1lID09PSBwbHVnaW5OYW1lKTsgfTtcbiAgICBjb25zdCBoYW5kbGVFcnJvciA9IChlcnIpID0+IHdpbi5jb25zb2xlLmVycm9yKGVycik7XG4gICAgY29uc3QgcmVnaXN0ZXJlZFBsdWdpbnMgPSBuZXcgTWFwKCk7XG4gICAgY29uc3QgcmVnaXN0ZXJQbHVnaW4gPSAocGx1Z2luTmFtZSwganNJbXBsZW1lbnRhdGlvbnMgPSB7fSkgPT4ge1xuICAgICAgICBjb25zdCByZWdpc3RlcmVkUGx1Z2luID0gcmVnaXN0ZXJlZFBsdWdpbnMuZ2V0KHBsdWdpbk5hbWUpO1xuICAgICAgICBpZiAocmVnaXN0ZXJlZFBsdWdpbikge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKGBDYXBhY2l0b3IgcGx1Z2luIFwiJHtwbHVnaW5OYW1lfVwiIGFscmVhZHkgcmVnaXN0ZXJlZC4gQ2Fubm90IHJlZ2lzdGVyIHBsdWdpbnMgdHdpY2UuYCk7XG4gICAgICAgICAgICByZXR1cm4gcmVnaXN0ZXJlZFBsdWdpbi5wcm94eTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwbGF0Zm9ybSA9IGdldFBsYXRmb3JtKCk7XG4gICAgICAgIGNvbnN0IHBsdWdpbkhlYWRlciA9IGdldFBsdWdpbkhlYWRlcihwbHVnaW5OYW1lKTtcbiAgICAgICAgbGV0IGpzSW1wbGVtZW50YXRpb247XG4gICAgICAgIGNvbnN0IGxvYWRQbHVnaW5JbXBsZW1lbnRhdGlvbiA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGlmICghanNJbXBsZW1lbnRhdGlvbiAmJiBwbGF0Zm9ybSBpbiBqc0ltcGxlbWVudGF0aW9ucykge1xuICAgICAgICAgICAgICAgIGpzSW1wbGVtZW50YXRpb24gPVxuICAgICAgICAgICAgICAgICAgICB0eXBlb2YganNJbXBsZW1lbnRhdGlvbnNbcGxhdGZvcm1dID09PSAnZnVuY3Rpb24nXG4gICAgICAgICAgICAgICAgICAgICAgICA/IChqc0ltcGxlbWVudGF0aW9uID0gYXdhaXQganNJbXBsZW1lbnRhdGlvbnNbcGxhdGZvcm1dKCkpXG4gICAgICAgICAgICAgICAgICAgICAgICA6IChqc0ltcGxlbWVudGF0aW9uID0ganNJbXBsZW1lbnRhdGlvbnNbcGxhdGZvcm1dKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNhcEN1c3RvbVBsYXRmb3JtICE9PSBudWxsICYmICFqc0ltcGxlbWVudGF0aW9uICYmICd3ZWInIGluIGpzSW1wbGVtZW50YXRpb25zKSB7XG4gICAgICAgICAgICAgICAganNJbXBsZW1lbnRhdGlvbiA9XG4gICAgICAgICAgICAgICAgICAgIHR5cGVvZiBqc0ltcGxlbWVudGF0aW9uc1snd2ViJ10gPT09ICdmdW5jdGlvbidcbiAgICAgICAgICAgICAgICAgICAgICAgID8gKGpzSW1wbGVtZW50YXRpb24gPSBhd2FpdCBqc0ltcGxlbWVudGF0aW9uc1snd2ViJ10oKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIDogKGpzSW1wbGVtZW50YXRpb24gPSBqc0ltcGxlbWVudGF0aW9uc1snd2ViJ10pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGpzSW1wbGVtZW50YXRpb247XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGNyZWF0ZVBsdWdpbk1ldGhvZCA9IChpbXBsLCBwcm9wKSA9PiB7XG4gICAgICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICAgICAgaWYgKHBsdWdpbkhlYWRlcikge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1ldGhvZEhlYWRlciA9IHBsdWdpbkhlYWRlciA9PT0gbnVsbCB8fCBwbHVnaW5IZWFkZXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHBsdWdpbkhlYWRlci5tZXRob2RzLmZpbmQoKG0pID0+IHByb3AgPT09IG0ubmFtZSk7XG4gICAgICAgICAgICAgICAgaWYgKG1ldGhvZEhlYWRlcikge1xuICAgICAgICAgICAgICAgICAgICBpZiAobWV0aG9kSGVhZGVyLnJ0eXBlID09PSAncHJvbWlzZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAob3B0aW9ucykgPT4gY2FwLm5hdGl2ZVByb21pc2UocGx1Z2luTmFtZSwgcHJvcC50b1N0cmluZygpLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAob3B0aW9ucywgY2FsbGJhY2spID0+IGNhcC5uYXRpdmVDYWxsYmFjayhwbHVnaW5OYW1lLCBwcm9wLnRvU3RyaW5nKCksIG9wdGlvbnMsIGNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChpbXBsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoX2EgPSBpbXBsW3Byb3BdKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuYmluZChpbXBsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChpbXBsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChfYiA9IGltcGxbcHJvcF0pID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5iaW5kKGltcGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IENhcGFjaXRvckV4Y2VwdGlvbihgXCIke3BsdWdpbk5hbWV9XCIgcGx1Z2luIGlzIG5vdCBpbXBsZW1lbnRlZCBvbiAke3BsYXRmb3JtfWAsIEV4Y2VwdGlvbkNvZGUuVW5pbXBsZW1lbnRlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGNyZWF0ZVBsdWdpbk1ldGhvZFdyYXBwZXIgPSAocHJvcCkgPT4ge1xuICAgICAgICAgICAgbGV0IHJlbW92ZTtcbiAgICAgICAgICAgIGNvbnN0IHdyYXBwZXIgPSAoLi4uYXJncykgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHAgPSBsb2FkUGx1Z2luSW1wbGVtZW50YXRpb24oKS50aGVuKChpbXBsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZuID0gY3JlYXRlUGx1Z2luTWV0aG9kKGltcGwsIHByb3ApO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZm4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHAgPSBmbiguLi5hcmdzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZSA9IHAgPT09IG51bGwgfHwgcCA9PT0gdm9pZCAwID8gdm9pZCAwIDogcC5yZW1vdmU7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBDYXBhY2l0b3JFeGNlcHRpb24oYFwiJHtwbHVnaW5OYW1lfS4ke3Byb3B9KClcIiBpcyBub3QgaW1wbGVtZW50ZWQgb24gJHtwbGF0Zm9ybX1gLCBFeGNlcHRpb25Db2RlLlVuaW1wbGVtZW50ZWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKHByb3AgPT09ICdhZGRMaXN0ZW5lcicpIHtcbiAgICAgICAgICAgICAgICAgICAgcC5yZW1vdmUgPSBhc3luYyAoKSA9PiByZW1vdmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHA7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgLy8gU29tZSBmbGFpciDinKhcbiAgICAgICAgICAgIHdyYXBwZXIudG9TdHJpbmcgPSAoKSA9PiBgJHtwcm9wLnRvU3RyaW5nKCl9KCkgeyBbY2FwYWNpdG9yIGNvZGVdIH1gO1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdyYXBwZXIsICduYW1lJywge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBwcm9wLFxuICAgICAgICAgICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gd3JhcHBlcjtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgYWRkTGlzdGVuZXIgPSBjcmVhdGVQbHVnaW5NZXRob2RXcmFwcGVyKCdhZGRMaXN0ZW5lcicpO1xuICAgICAgICBjb25zdCByZW1vdmVMaXN0ZW5lciA9IGNyZWF0ZVBsdWdpbk1ldGhvZFdyYXBwZXIoJ3JlbW92ZUxpc3RlbmVyJyk7XG4gICAgICAgIGNvbnN0IGFkZExpc3RlbmVyTmF0aXZlID0gKGV2ZW50TmFtZSwgY2FsbGJhY2spID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNhbGwgPSBhZGRMaXN0ZW5lcih7IGV2ZW50TmFtZSB9LCBjYWxsYmFjayk7XG4gICAgICAgICAgICBjb25zdCByZW1vdmUgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2FsbGJhY2tJZCA9IGF3YWl0IGNhbGw7XG4gICAgICAgICAgICAgICAgcmVtb3ZlTGlzdGVuZXIoe1xuICAgICAgICAgICAgICAgICAgICBldmVudE5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrSWQsXG4gICAgICAgICAgICAgICAgfSwgY2FsbGJhY2spO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNvbnN0IHAgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gY2FsbC50aGVuKCgpID0+IHJlc29sdmUoeyByZW1vdmUgfSkpKTtcbiAgICAgICAgICAgIHAucmVtb3ZlID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgVXNpbmcgYWRkTGlzdGVuZXIoKSB3aXRob3V0ICdhd2FpdCcgaXMgZGVwcmVjYXRlZC5gKTtcbiAgICAgICAgICAgICAgICBhd2FpdCByZW1vdmUoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXR1cm4gcDtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgcHJveHkgPSBuZXcgUHJveHkoe30sIHtcbiAgICAgICAgICAgIGdldChfLCBwcm9wKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChwcm9wKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC9pc3N1ZXMvMjAwMzBcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnJCR0eXBlb2YnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAndG9KU09OJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoKSA9PiAoe30pO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdhZGRMaXN0ZW5lcic6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGx1Z2luSGVhZGVyID8gYWRkTGlzdGVuZXJOYXRpdmUgOiBhZGRMaXN0ZW5lcjtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAncmVtb3ZlTGlzdGVuZXInOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlbW92ZUxpc3RlbmVyO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZVBsdWdpbk1ldGhvZFdyYXBwZXIocHJvcCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICAgIFBsdWdpbnNbcGx1Z2luTmFtZV0gPSBwcm94eTtcbiAgICAgICAgcmVnaXN0ZXJlZFBsdWdpbnMuc2V0KHBsdWdpbk5hbWUsIHtcbiAgICAgICAgICAgIG5hbWU6IHBsdWdpbk5hbWUsXG4gICAgICAgICAgICBwcm94eSxcbiAgICAgICAgICAgIHBsYXRmb3JtczogbmV3IFNldChbLi4uT2JqZWN0LmtleXMoanNJbXBsZW1lbnRhdGlvbnMpLCAuLi4ocGx1Z2luSGVhZGVyID8gW3BsYXRmb3JtXSA6IFtdKV0pLFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHByb3h5O1xuICAgIH07XG4gICAgLy8gQWRkIGluIGNvbnZlcnRGaWxlU3JjIGZvciB3ZWIsIGl0IHdpbGwgYWxyZWFkeSBiZSBhdmFpbGFibGUgaW4gbmF0aXZlIGNvbnRleHRcbiAgICBpZiAoIWNhcC5jb252ZXJ0RmlsZVNyYykge1xuICAgICAgICBjYXAuY29udmVydEZpbGVTcmMgPSAoZmlsZVBhdGgpID0+IGZpbGVQYXRoO1xuICAgIH1cbiAgICBjYXAuZ2V0UGxhdGZvcm0gPSBnZXRQbGF0Zm9ybTtcbiAgICBjYXAuaGFuZGxlRXJyb3IgPSBoYW5kbGVFcnJvcjtcbiAgICBjYXAuaXNOYXRpdmVQbGF0Zm9ybSA9IGlzTmF0aXZlUGxhdGZvcm07XG4gICAgY2FwLmlzUGx1Z2luQXZhaWxhYmxlID0gaXNQbHVnaW5BdmFpbGFibGU7XG4gICAgY2FwLnJlZ2lzdGVyUGx1Z2luID0gcmVnaXN0ZXJQbHVnaW47XG4gICAgY2FwLkV4Y2VwdGlvbiA9IENhcGFjaXRvckV4Y2VwdGlvbjtcbiAgICBjYXAuREVCVUcgPSAhIWNhcC5ERUJVRztcbiAgICBjYXAuaXNMb2dnaW5nRW5hYmxlZCA9ICEhY2FwLmlzTG9nZ2luZ0VuYWJsZWQ7XG4gICAgcmV0dXJuIGNhcDtcbn07XG5leHBvcnQgY29uc3QgaW5pdENhcGFjaXRvckdsb2JhbCA9ICh3aW4pID0+ICh3aW4uQ2FwYWNpdG9yID0gY3JlYXRlQ2FwYWNpdG9yKHdpbikpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cnVudGltZS5qcy5tYXAiLCAiaW1wb3J0IHsgaW5pdENhcGFjaXRvckdsb2JhbCB9IGZyb20gJy4vcnVudGltZSc7XG5leHBvcnQgY29uc3QgQ2FwYWNpdG9yID0gLyojX19QVVJFX18qLyBpbml0Q2FwYWNpdG9yR2xvYmFsKHR5cGVvZiBnbG9iYWxUaGlzICE9PSAndW5kZWZpbmVkJ1xuICAgID8gZ2xvYmFsVGhpc1xuICAgIDogdHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnXG4gICAgICAgID8gc2VsZlxuICAgICAgICA6IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnXG4gICAgICAgICAgICA/IHdpbmRvd1xuICAgICAgICAgICAgOiB0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJ1xuICAgICAgICAgICAgICAgID8gZ2xvYmFsXG4gICAgICAgICAgICAgICAgOiB7fSk7XG5leHBvcnQgY29uc3QgcmVnaXN0ZXJQbHVnaW4gPSBDYXBhY2l0b3IucmVnaXN0ZXJQbHVnaW47XG4vLyMgc291cmNlTWFwcGluZ1VSTD1nbG9iYWwuanMubWFwIiwgImltcG9ydCB7IENhcGFjaXRvciB9IGZyb20gJy4vZ2xvYmFsJztcbmltcG9ydCB7IEV4Y2VwdGlvbkNvZGUgfSBmcm9tICcuL3V0aWwnO1xuLyoqXG4gKiBCYXNlIGNsYXNzIHdlYiBwbHVnaW5zIHNob3VsZCBleHRlbmQuXG4gKi9cbmV4cG9ydCBjbGFzcyBXZWJQbHVnaW4ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmxpc3RlbmVycyA9IHt9O1xuICAgICAgICB0aGlzLnJldGFpbmVkRXZlbnRBcmd1bWVudHMgPSB7fTtcbiAgICAgICAgdGhpcy53aW5kb3dMaXN0ZW5lcnMgPSB7fTtcbiAgICB9XG4gICAgYWRkTGlzdGVuZXIoZXZlbnROYW1lLCBsaXN0ZW5lckZ1bmMpIHtcbiAgICAgICAgbGV0IGZpcnN0TGlzdGVuZXIgPSBmYWxzZTtcbiAgICAgICAgY29uc3QgbGlzdGVuZXJzID0gdGhpcy5saXN0ZW5lcnNbZXZlbnROYW1lXTtcbiAgICAgICAgaWYgKCFsaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIHRoaXMubGlzdGVuZXJzW2V2ZW50TmFtZV0gPSBbXTtcbiAgICAgICAgICAgIGZpcnN0TGlzdGVuZXIgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubGlzdGVuZXJzW2V2ZW50TmFtZV0ucHVzaChsaXN0ZW5lckZ1bmMpO1xuICAgICAgICAvLyBJZiB3ZSBoYXZlbid0IGFkZGVkIGEgd2luZG93IGxpc3RlbmVyIGZvciB0aGlzIGV2ZW50IGFuZCBpdCByZXF1aXJlcyBvbmUsXG4gICAgICAgIC8vIGdvIGFoZWFkIGFuZCBhZGQgaXRcbiAgICAgICAgY29uc3Qgd2luZG93TGlzdGVuZXIgPSB0aGlzLndpbmRvd0xpc3RlbmVyc1tldmVudE5hbWVdO1xuICAgICAgICBpZiAod2luZG93TGlzdGVuZXIgJiYgIXdpbmRvd0xpc3RlbmVyLnJlZ2lzdGVyZWQpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkV2luZG93TGlzdGVuZXIod2luZG93TGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmaXJzdExpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLnNlbmRSZXRhaW5lZEFyZ3VtZW50c0ZvckV2ZW50KGV2ZW50TmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVtb3ZlID0gYXN5bmMgKCkgPT4gdGhpcy5yZW1vdmVMaXN0ZW5lcihldmVudE5hbWUsIGxpc3RlbmVyRnVuYyk7XG4gICAgICAgIGNvbnN0IHAgPSBQcm9taXNlLnJlc29sdmUoeyByZW1vdmUgfSk7XG4gICAgICAgIHJldHVybiBwO1xuICAgIH1cbiAgICBhc3luYyByZW1vdmVBbGxMaXN0ZW5lcnMoKSB7XG4gICAgICAgIHRoaXMubGlzdGVuZXJzID0ge307XG4gICAgICAgIGZvciAoY29uc3QgbGlzdGVuZXIgaW4gdGhpcy53aW5kb3dMaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlV2luZG93TGlzdGVuZXIodGhpcy53aW5kb3dMaXN0ZW5lcnNbbGlzdGVuZXJdKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLndpbmRvd0xpc3RlbmVycyA9IHt9O1xuICAgIH1cbiAgICBub3RpZnlMaXN0ZW5lcnMoZXZlbnROYW1lLCBkYXRhLCByZXRhaW5VbnRpbENvbnN1bWVkKSB7XG4gICAgICAgIGNvbnN0IGxpc3RlbmVycyA9IHRoaXMubGlzdGVuZXJzW2V2ZW50TmFtZV07XG4gICAgICAgIGlmICghbGlzdGVuZXJzKSB7XG4gICAgICAgICAgICBpZiAocmV0YWluVW50aWxDb25zdW1lZCkge1xuICAgICAgICAgICAgICAgIGxldCBhcmdzID0gdGhpcy5yZXRhaW5lZEV2ZW50QXJndW1lbnRzW2V2ZW50TmFtZV07XG4gICAgICAgICAgICAgICAgaWYgKCFhcmdzKSB7XG4gICAgICAgICAgICAgICAgICAgIGFyZ3MgPSBbXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYXJncy5wdXNoKGRhdGEpO1xuICAgICAgICAgICAgICAgIHRoaXMucmV0YWluZWRFdmVudEFyZ3VtZW50c1tldmVudE5hbWVdID0gYXJncztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsaXN0ZW5lcnMuZm9yRWFjaCgobGlzdGVuZXIpID0+IGxpc3RlbmVyKGRhdGEpKTtcbiAgICB9XG4gICAgaGFzTGlzdGVuZXJzKGV2ZW50TmFtZSkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIHJldHVybiAhISgoX2EgPSB0aGlzLmxpc3RlbmVyc1tldmVudE5hbWVdKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubGVuZ3RoKTtcbiAgICB9XG4gICAgcmVnaXN0ZXJXaW5kb3dMaXN0ZW5lcih3aW5kb3dFdmVudE5hbWUsIHBsdWdpbkV2ZW50TmFtZSkge1xuICAgICAgICB0aGlzLndpbmRvd0xpc3RlbmVyc1twbHVnaW5FdmVudE5hbWVdID0ge1xuICAgICAgICAgICAgcmVnaXN0ZXJlZDogZmFsc2UsXG4gICAgICAgICAgICB3aW5kb3dFdmVudE5hbWUsXG4gICAgICAgICAgICBwbHVnaW5FdmVudE5hbWUsXG4gICAgICAgICAgICBoYW5kbGVyOiAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm5vdGlmeUxpc3RlbmVycyhwbHVnaW5FdmVudE5hbWUsIGV2ZW50KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgfVxuICAgIHVuaW1wbGVtZW50ZWQobXNnID0gJ25vdCBpbXBsZW1lbnRlZCcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBDYXBhY2l0b3IuRXhjZXB0aW9uKG1zZywgRXhjZXB0aW9uQ29kZS5VbmltcGxlbWVudGVkKTtcbiAgICB9XG4gICAgdW5hdmFpbGFibGUobXNnID0gJ25vdCBhdmFpbGFibGUnKSB7XG4gICAgICAgIHJldHVybiBuZXcgQ2FwYWNpdG9yLkV4Y2VwdGlvbihtc2csIEV4Y2VwdGlvbkNvZGUuVW5hdmFpbGFibGUpO1xuICAgIH1cbiAgICBhc3luYyByZW1vdmVMaXN0ZW5lcihldmVudE5hbWUsIGxpc3RlbmVyRnVuYykge1xuICAgICAgICBjb25zdCBsaXN0ZW5lcnMgPSB0aGlzLmxpc3RlbmVyc1tldmVudE5hbWVdO1xuICAgICAgICBpZiAoIWxpc3RlbmVycykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGluZGV4ID0gbGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXJGdW5jKTtcbiAgICAgICAgdGhpcy5saXN0ZW5lcnNbZXZlbnROYW1lXS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAvLyBJZiB0aGVyZSBhcmUgbm8gbW9yZSBsaXN0ZW5lcnMgZm9yIHRoaXMgdHlwZSBvZiBldmVudCxcbiAgICAgICAgLy8gcmVtb3ZlIHRoZSB3aW5kb3cgbGlzdGVuZXJcbiAgICAgICAgaWYgKCF0aGlzLmxpc3RlbmVyc1tldmVudE5hbWVdLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVXaW5kb3dMaXN0ZW5lcih0aGlzLndpbmRvd0xpc3RlbmVyc1tldmVudE5hbWVdKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhZGRXaW5kb3dMaXN0ZW5lcihoYW5kbGUpIHtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoaGFuZGxlLndpbmRvd0V2ZW50TmFtZSwgaGFuZGxlLmhhbmRsZXIpO1xuICAgICAgICBoYW5kbGUucmVnaXN0ZXJlZCA9IHRydWU7XG4gICAgfVxuICAgIHJlbW92ZVdpbmRvd0xpc3RlbmVyKGhhbmRsZSkge1xuICAgICAgICBpZiAoIWhhbmRsZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKGhhbmRsZS53aW5kb3dFdmVudE5hbWUsIGhhbmRsZS5oYW5kbGVyKTtcbiAgICAgICAgaGFuZGxlLnJlZ2lzdGVyZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgc2VuZFJldGFpbmVkQXJndW1lbnRzRm9yRXZlbnQoZXZlbnROYW1lKSB7XG4gICAgICAgIGNvbnN0IGFyZ3MgPSB0aGlzLnJldGFpbmVkRXZlbnRBcmd1bWVudHNbZXZlbnROYW1lXTtcbiAgICAgICAgaWYgKCFhcmdzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZGVsZXRlIHRoaXMucmV0YWluZWRFdmVudEFyZ3VtZW50c1tldmVudE5hbWVdO1xuICAgICAgICBhcmdzLmZvckVhY2goKGFyZykgPT4ge1xuICAgICAgICAgICAgdGhpcy5ub3RpZnlMaXN0ZW5lcnMoZXZlbnROYW1lLCBhcmcpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD13ZWItcGx1Z2luLmpzLm1hcCIsICJpbXBvcnQgeyByZWdpc3RlclBsdWdpbiB9IGZyb20gJy4vZ2xvYmFsJztcbmltcG9ydCB7IFdlYlBsdWdpbiB9IGZyb20gJy4vd2ViLXBsdWdpbic7XG5leHBvcnQgY29uc3QgV2ViVmlldyA9IC8qI19fUFVSRV9fKi8gcmVnaXN0ZXJQbHVnaW4oJ1dlYlZpZXcnKTtcbi8qKioqKioqKiBFTkQgV0VCIFZJRVcgUExVR0lOICoqKioqKioqL1xuLyoqKioqKioqIENPT0tJRVMgUExVR0lOICoqKioqKioqL1xuLyoqXG4gKiBTYWZlbHkgd2ViIGVuY29kZSBhIHN0cmluZyB2YWx1ZSAoaW5zcGlyZWQgYnkganMtY29va2llKVxuICogQHBhcmFtIHN0ciBUaGUgc3RyaW5nIHZhbHVlIHRvIGVuY29kZVxuICovXG5jb25zdCBlbmNvZGUgPSAoc3RyKSA9PiBlbmNvZGVVUklDb21wb25lbnQoc3RyKVxuICAgIC5yZXBsYWNlKC8lKDJbMzQ2Ql18NUV8NjB8N0MpL2csIGRlY29kZVVSSUNvbXBvbmVudClcbiAgICAucmVwbGFjZSgvWygpXS9nLCBlc2NhcGUpO1xuLyoqXG4gKiBTYWZlbHkgd2ViIGRlY29kZSBhIHN0cmluZyB2YWx1ZSAoaW5zcGlyZWQgYnkganMtY29va2llKVxuICogQHBhcmFtIHN0ciBUaGUgc3RyaW5nIHZhbHVlIHRvIGRlY29kZVxuICovXG5jb25zdCBkZWNvZGUgPSAoc3RyKSA9PiBzdHIucmVwbGFjZSgvKCVbXFxkQS1GXXsyfSkrL2dpLCBkZWNvZGVVUklDb21wb25lbnQpO1xuZXhwb3J0IGNsYXNzIENhcGFjaXRvckNvb2tpZXNQbHVnaW5XZWIgZXh0ZW5kcyBXZWJQbHVnaW4ge1xuICAgIGFzeW5jIGdldENvb2tpZXMoKSB7XG4gICAgICAgIGNvbnN0IGNvb2tpZXMgPSBkb2N1bWVudC5jb29raWU7XG4gICAgICAgIGNvbnN0IGNvb2tpZU1hcCA9IHt9O1xuICAgICAgICBjb29raWVzLnNwbGl0KCc7JykuZm9yRWFjaCgoY29va2llKSA9PiB7XG4gICAgICAgICAgICBpZiAoY29va2llLmxlbmd0aCA8PSAwKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIC8vIFJlcGxhY2UgZmlyc3QgXCI9XCIgd2l0aCBDQVBfQ09PS0lFIHRvIHByZXZlbnQgc3BsaXR0aW5nIG9uIGFkZGl0aW9uYWwgXCI9XCJcbiAgICAgICAgICAgIGxldCBba2V5LCB2YWx1ZV0gPSBjb29raWUucmVwbGFjZSgvPS8sICdDQVBfQ09PS0lFJykuc3BsaXQoJ0NBUF9DT09LSUUnKTtcbiAgICAgICAgICAgIGtleSA9IGRlY29kZShrZXkpLnRyaW0oKTtcbiAgICAgICAgICAgIHZhbHVlID0gZGVjb2RlKHZhbHVlKS50cmltKCk7XG4gICAgICAgICAgICBjb29raWVNYXBba2V5XSA9IHZhbHVlO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGNvb2tpZU1hcDtcbiAgICB9XG4gICAgYXN5bmMgc2V0Q29va2llKG9wdGlvbnMpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFNhZmVseSBFbmNvZGVkIEtleS9WYWx1ZVxuICAgICAgICAgICAgY29uc3QgZW5jb2RlZEtleSA9IGVuY29kZShvcHRpb25zLmtleSk7XG4gICAgICAgICAgICBjb25zdCBlbmNvZGVkVmFsdWUgPSBlbmNvZGUob3B0aW9ucy52YWx1ZSk7XG4gICAgICAgICAgICAvLyBDbGVhbiAmIHNhbml0aXplIG9wdGlvbnNcbiAgICAgICAgICAgIGNvbnN0IGV4cGlyZXMgPSBgOyBleHBpcmVzPSR7KG9wdGlvbnMuZXhwaXJlcyB8fCAnJykucmVwbGFjZSgnZXhwaXJlcz0nLCAnJyl9YDsgLy8gRGVmYXVsdCBpcyBcIjsgZXhwaXJlcz1cIlxuICAgICAgICAgICAgY29uc3QgcGF0aCA9IChvcHRpb25zLnBhdGggfHwgJy8nKS5yZXBsYWNlKCdwYXRoPScsICcnKTsgLy8gRGVmYXVsdCBpcyBcInBhdGg9L1wiXG4gICAgICAgICAgICBjb25zdCBkb21haW4gPSBvcHRpb25zLnVybCAhPSBudWxsICYmIG9wdGlvbnMudXJsLmxlbmd0aCA+IDAgPyBgZG9tYWluPSR7b3B0aW9ucy51cmx9YCA6ICcnO1xuICAgICAgICAgICAgZG9jdW1lbnQuY29va2llID0gYCR7ZW5jb2RlZEtleX09JHtlbmNvZGVkVmFsdWUgfHwgJyd9JHtleHBpcmVzfTsgcGF0aD0ke3BhdGh9OyAke2RvbWFpbn07YDtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXN5bmMgZGVsZXRlQ29va2llKG9wdGlvbnMpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGAke29wdGlvbnMua2V5fT07IE1heC1BZ2U9MGA7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIGNsZWFyQ29va2llcygpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IGNvb2tpZXMgPSBkb2N1bWVudC5jb29raWUuc3BsaXQoJzsnKSB8fCBbXTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgY29va2llIG9mIGNvb2tpZXMpIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5jb29raWUgPSBjb29raWUucmVwbGFjZSgvXiArLywgJycpLnJlcGxhY2UoLz0uKi8sIGA9O2V4cGlyZXM9JHtuZXcgRGF0ZSgpLnRvVVRDU3RyaW5nKCl9O3BhdGg9L2ApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBjbGVhckFsbENvb2tpZXMoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmNsZWFyQ29va2llcygpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydCBjb25zdCBDYXBhY2l0b3JDb29raWVzID0gcmVnaXN0ZXJQbHVnaW4oJ0NhcGFjaXRvckNvb2tpZXMnLCB7XG4gICAgd2ViOiAoKSA9PiBuZXcgQ2FwYWNpdG9yQ29va2llc1BsdWdpbldlYigpLFxufSk7XG4vLyBVVElMSVRZIEZVTkNUSU9OU1xuLyoqXG4gKiBSZWFkIGluIGEgQmxvYiB2YWx1ZSBhbmQgcmV0dXJuIGl0IGFzIGEgYmFzZTY0IHN0cmluZ1xuICogQHBhcmFtIGJsb2IgVGhlIGJsb2IgdmFsdWUgdG8gY29udmVydCB0byBhIGJhc2U2NCBzdHJpbmdcbiAqL1xuZXhwb3J0IGNvbnN0IHJlYWRCbG9iQXNCYXNlNjQgPSBhc3luYyAoYmxvYikgPT4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgcmVhZGVyLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgYmFzZTY0U3RyaW5nID0gcmVhZGVyLnJlc3VsdDtcbiAgICAgICAgLy8gcmVtb3ZlIHByZWZpeCBcImRhdGE6YXBwbGljYXRpb24vcGRmO2Jhc2U2NCxcIlxuICAgICAgICByZXNvbHZlKGJhc2U2NFN0cmluZy5pbmRleE9mKCcsJykgPj0gMCA/IGJhc2U2NFN0cmluZy5zcGxpdCgnLCcpWzFdIDogYmFzZTY0U3RyaW5nKTtcbiAgICB9O1xuICAgIHJlYWRlci5vbmVycm9yID0gKGVycm9yKSA9PiByZWplY3QoZXJyb3IpO1xuICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGJsb2IpO1xufSk7XG4vKipcbiAqIE5vcm1hbGl6ZSBhbiBIdHRwSGVhZGVycyBtYXAgYnkgbG93ZXJjYXNpbmcgYWxsIG9mIHRoZSB2YWx1ZXNcbiAqIEBwYXJhbSBoZWFkZXJzIFRoZSBIdHRwSGVhZGVycyBvYmplY3QgdG8gbm9ybWFsaXplXG4gKi9cbmNvbnN0IG5vcm1hbGl6ZUh0dHBIZWFkZXJzID0gKGhlYWRlcnMgPSB7fSkgPT4ge1xuICAgIGNvbnN0IG9yaWdpbmFsS2V5cyA9IE9iamVjdC5rZXlzKGhlYWRlcnMpO1xuICAgIGNvbnN0IGxvd2VyZWRLZXlzID0gT2JqZWN0LmtleXMoaGVhZGVycykubWFwKChrKSA9PiBrLnRvTG9jYWxlTG93ZXJDYXNlKCkpO1xuICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSBsb3dlcmVkS2V5cy5yZWR1Y2UoKGFjYywga2V5LCBpbmRleCkgPT4ge1xuICAgICAgICBhY2Nba2V5XSA9IGhlYWRlcnNbb3JpZ2luYWxLZXlzW2luZGV4XV07XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgfSwge30pO1xuICAgIHJldHVybiBub3JtYWxpemVkO1xufTtcbi8qKlxuICogQnVpbGRzIGEgc3RyaW5nIG9mIHVybCBwYXJhbWV0ZXJzIHRoYXRcbiAqIEBwYXJhbSBwYXJhbXMgQSBtYXAgb2YgdXJsIHBhcmFtZXRlcnNcbiAqIEBwYXJhbSBzaG91bGRFbmNvZGUgdHJ1ZSBpZiB5b3Ugc2hvdWxkIGVuY29kZVVSSUNvbXBvbmVudCgpIHRoZSB2YWx1ZXMgKHRydWUgYnkgZGVmYXVsdClcbiAqL1xuY29uc3QgYnVpbGRVcmxQYXJhbXMgPSAocGFyYW1zLCBzaG91bGRFbmNvZGUgPSB0cnVlKSA9PiB7XG4gICAgaWYgKCFwYXJhbXMpXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIGNvbnN0IG91dHB1dCA9IE9iamVjdC5lbnRyaWVzKHBhcmFtcykucmVkdWNlKChhY2N1bXVsYXRvciwgZW50cnkpID0+IHtcbiAgICAgICAgY29uc3QgW2tleSwgdmFsdWVdID0gZW50cnk7XG4gICAgICAgIGxldCBlbmNvZGVkVmFsdWU7XG4gICAgICAgIGxldCBpdGVtO1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIGl0ZW0gPSAnJztcbiAgICAgICAgICAgIHZhbHVlLmZvckVhY2goKHN0cikgPT4ge1xuICAgICAgICAgICAgICAgIGVuY29kZWRWYWx1ZSA9IHNob3VsZEVuY29kZSA/IGVuY29kZVVSSUNvbXBvbmVudChzdHIpIDogc3RyO1xuICAgICAgICAgICAgICAgIGl0ZW0gKz0gYCR7a2V5fT0ke2VuY29kZWRWYWx1ZX0mYDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gbGFzdCBjaGFyYWN0ZXIgd2lsbCBhbHdheXMgYmUgXCImXCIgc28gc2xpY2UgaXQgb2ZmXG4gICAgICAgICAgICBpdGVtLnNsaWNlKDAsIC0xKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGVuY29kZWRWYWx1ZSA9IHNob3VsZEVuY29kZSA/IGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSkgOiB2YWx1ZTtcbiAgICAgICAgICAgIGl0ZW0gPSBgJHtrZXl9PSR7ZW5jb2RlZFZhbHVlfWA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGAke2FjY3VtdWxhdG9yfSYke2l0ZW19YDtcbiAgICB9LCAnJyk7XG4gICAgLy8gUmVtb3ZlIGluaXRpYWwgXCImXCIgZnJvbSB0aGUgcmVkdWNlXG4gICAgcmV0dXJuIG91dHB1dC5zdWJzdHIoMSk7XG59O1xuLyoqXG4gKiBCdWlsZCB0aGUgUmVxdWVzdEluaXQgb2JqZWN0IGJhc2VkIG9uIHRoZSBvcHRpb25zIHBhc3NlZCBpbnRvIHRoZSBpbml0aWFsIHJlcXVlc3RcbiAqIEBwYXJhbSBvcHRpb25zIFRoZSBIdHRwIHBsdWdpbiBvcHRpb25zXG4gKiBAcGFyYW0gZXh0cmEgQW55IGV4dHJhIFJlcXVlc3RJbml0IHZhbHVlc1xuICovXG5leHBvcnQgY29uc3QgYnVpbGRSZXF1ZXN0SW5pdCA9IChvcHRpb25zLCBleHRyYSA9IHt9KSA9PiB7XG4gICAgY29uc3Qgb3V0cHV0ID0gT2JqZWN0LmFzc2lnbih7IG1ldGhvZDogb3B0aW9ucy5tZXRob2QgfHwgJ0dFVCcsIGhlYWRlcnM6IG9wdGlvbnMuaGVhZGVycyB9LCBleHRyYSk7XG4gICAgLy8gR2V0IHRoZSBjb250ZW50LXR5cGVcbiAgICBjb25zdCBoZWFkZXJzID0gbm9ybWFsaXplSHR0cEhlYWRlcnMob3B0aW9ucy5oZWFkZXJzKTtcbiAgICBjb25zdCB0eXBlID0gaGVhZGVyc1snY29udGVudC10eXBlJ10gfHwgJyc7XG4gICAgLy8gSWYgYm9keSBpcyBhbHJlYWR5IGEgc3RyaW5nLCB0aGVuIHBhc3MgaXQgdGhyb3VnaCBhcy1pcy5cbiAgICBpZiAodHlwZW9mIG9wdGlvbnMuZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgb3V0cHV0LmJvZHkgPSBvcHRpb25zLmRhdGE7XG4gICAgfVxuICAgIC8vIEJ1aWxkIHJlcXVlc3QgaW5pdGlhbGl6ZXJzIGJhc2VkIG9mZiBvZiBjb250ZW50LXR5cGVcbiAgICBlbHNlIGlmICh0eXBlLmluY2x1ZGVzKCdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnKSkge1xuICAgICAgICBjb25zdCBwYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCk7XG4gICAgICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKG9wdGlvbnMuZGF0YSB8fCB7fSkpIHtcbiAgICAgICAgICAgIHBhcmFtcy5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgb3V0cHV0LmJvZHkgPSBwYXJhbXMudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZS5pbmNsdWRlcygnbXVsdGlwYXJ0L2Zvcm0tZGF0YScpIHx8IG9wdGlvbnMuZGF0YSBpbnN0YW5jZW9mIEZvcm1EYXRhKSB7XG4gICAgICAgIGNvbnN0IGZvcm0gPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgICAgaWYgKG9wdGlvbnMuZGF0YSBpbnN0YW5jZW9mIEZvcm1EYXRhKSB7XG4gICAgICAgICAgICBvcHRpb25zLmRhdGEuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICAgICAgICAgIGZvcm0uYXBwZW5kKGtleSwgdmFsdWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhvcHRpb25zLmRhdGEpKSB7XG4gICAgICAgICAgICAgICAgZm9ybS5hcHBlbmQoa2V5LCBvcHRpb25zLmRhdGFba2V5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgb3V0cHV0LmJvZHkgPSBmb3JtO1xuICAgICAgICBjb25zdCBoZWFkZXJzID0gbmV3IEhlYWRlcnMob3V0cHV0LmhlYWRlcnMpO1xuICAgICAgICBoZWFkZXJzLmRlbGV0ZSgnY29udGVudC10eXBlJyk7IC8vIGNvbnRlbnQtdHlwZSB3aWxsIGJlIHNldCBieSBgd2luZG93LmZldGNoYCB0byBpbmNsdWR5IGJvdW5kYXJ5XG4gICAgICAgIG91dHB1dC5oZWFkZXJzID0gaGVhZGVycztcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZS5pbmNsdWRlcygnYXBwbGljYXRpb24vanNvbicpIHx8IHR5cGVvZiBvcHRpb25zLmRhdGEgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIG91dHB1dC5ib2R5ID0gSlNPTi5zdHJpbmdpZnkob3B0aW9ucy5kYXRhKTtcbiAgICB9XG4gICAgcmV0dXJuIG91dHB1dDtcbn07XG4vLyBXRUIgSU1QTEVNRU5UQVRJT05cbmV4cG9ydCBjbGFzcyBDYXBhY2l0b3JIdHRwUGx1Z2luV2ViIGV4dGVuZHMgV2ViUGx1Z2luIHtcbiAgICAvKipcbiAgICAgKiBQZXJmb3JtIGFuIEh0dHAgcmVxdWVzdCBnaXZlbiBhIHNldCBvZiBvcHRpb25zXG4gICAgICogQHBhcmFtIG9wdGlvbnMgT3B0aW9ucyB0byBidWlsZCB0aGUgSFRUUCByZXF1ZXN0XG4gICAgICovXG4gICAgYXN5bmMgcmVxdWVzdChvcHRpb25zKSB7XG4gICAgICAgIGNvbnN0IHJlcXVlc3RJbml0ID0gYnVpbGRSZXF1ZXN0SW5pdChvcHRpb25zLCBvcHRpb25zLndlYkZldGNoRXh0cmEpO1xuICAgICAgICBjb25zdCB1cmxQYXJhbXMgPSBidWlsZFVybFBhcmFtcyhvcHRpb25zLnBhcmFtcywgb3B0aW9ucy5zaG91bGRFbmNvZGVVcmxQYXJhbXMpO1xuICAgICAgICBjb25zdCB1cmwgPSB1cmxQYXJhbXMgPyBgJHtvcHRpb25zLnVybH0/JHt1cmxQYXJhbXN9YCA6IG9wdGlvbnMudXJsO1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwgcmVxdWVzdEluaXQpO1xuICAgICAgICBjb25zdCBjb250ZW50VHlwZSA9IHJlc3BvbnNlLmhlYWRlcnMuZ2V0KCdjb250ZW50LXR5cGUnKSB8fCAnJztcbiAgICAgICAgLy8gRGVmYXVsdCB0byAndGV4dCcgcmVzcG9uc2VUeXBlIHNvIG5vIHBhcnNpbmcgaGFwcGVuc1xuICAgICAgICBsZXQgeyByZXNwb25zZVR5cGUgPSAndGV4dCcgfSA9IHJlc3BvbnNlLm9rID8gb3B0aW9ucyA6IHt9O1xuICAgICAgICAvLyBJZiB0aGUgcmVzcG9uc2UgY29udGVudC10eXBlIGlzIGpzb24sIGZvcmNlIHRoZSByZXNwb25zZSB0byBiZSBqc29uXG4gICAgICAgIGlmIChjb250ZW50VHlwZS5pbmNsdWRlcygnYXBwbGljYXRpb24vanNvbicpKSB7XG4gICAgICAgICAgICByZXNwb25zZVR5cGUgPSAnanNvbic7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGRhdGE7XG4gICAgICAgIGxldCBibG9iO1xuICAgICAgICBzd2l0Y2ggKHJlc3BvbnNlVHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnYXJyYXlidWZmZXInOlxuICAgICAgICAgICAgY2FzZSAnYmxvYic6XG4gICAgICAgICAgICAgICAgYmxvYiA9IGF3YWl0IHJlc3BvbnNlLmJsb2IoKTtcbiAgICAgICAgICAgICAgICBkYXRhID0gYXdhaXQgcmVhZEJsb2JBc0Jhc2U2NChibG9iKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2pzb24nOlxuICAgICAgICAgICAgICAgIGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdkb2N1bWVudCc6XG4gICAgICAgICAgICBjYXNlICd0ZXh0JzpcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBDb252ZXJ0IGZldGNoIGhlYWRlcnMgdG8gQ2FwYWNpdG9yIEh0dHBIZWFkZXJzXG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSB7fTtcbiAgICAgICAgcmVzcG9uc2UuaGVhZGVycy5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICBoZWFkZXJzW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkYXRhLFxuICAgICAgICAgICAgaGVhZGVycyxcbiAgICAgICAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgICAgICAgdXJsOiByZXNwb25zZS51cmwsXG4gICAgICAgIH07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBlcmZvcm0gYW4gSHR0cCBHRVQgcmVxdWVzdCBnaXZlbiBhIHNldCBvZiBvcHRpb25zXG4gICAgICogQHBhcmFtIG9wdGlvbnMgT3B0aW9ucyB0byBidWlsZCB0aGUgSFRUUCByZXF1ZXN0XG4gICAgICovXG4gICAgYXN5bmMgZ2V0KG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdChPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMpLCB7IG1ldGhvZDogJ0dFVCcgfSkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtIGFuIEh0dHAgUE9TVCByZXF1ZXN0IGdpdmVuIGEgc2V0IG9mIG9wdGlvbnNcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zIHRvIGJ1aWxkIHRoZSBIVFRQIHJlcXVlc3RcbiAgICAgKi9cbiAgICBhc3luYyBwb3N0KG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdChPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMpLCB7IG1ldGhvZDogJ1BPU1QnIH0pKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUGVyZm9ybSBhbiBIdHRwIFBVVCByZXF1ZXN0IGdpdmVuIGEgc2V0IG9mIG9wdGlvbnNcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zIHRvIGJ1aWxkIHRoZSBIVFRQIHJlcXVlc3RcbiAgICAgKi9cbiAgICBhc3luYyBwdXQob3B0aW9ucykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucyksIHsgbWV0aG9kOiAnUFVUJyB9KSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBlcmZvcm0gYW4gSHR0cCBQQVRDSCByZXF1ZXN0IGdpdmVuIGEgc2V0IG9mIG9wdGlvbnNcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zIHRvIGJ1aWxkIHRoZSBIVFRQIHJlcXVlc3RcbiAgICAgKi9cbiAgICBhc3luYyBwYXRjaChvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zKSwgeyBtZXRob2Q6ICdQQVRDSCcgfSkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtIGFuIEh0dHAgREVMRVRFIHJlcXVlc3QgZ2l2ZW4gYSBzZXQgb2Ygb3B0aW9uc1xuICAgICAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbnMgdG8gYnVpbGQgdGhlIEhUVFAgcmVxdWVzdFxuICAgICAqL1xuICAgIGFzeW5jIGRlbGV0ZShvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zKSwgeyBtZXRob2Q6ICdERUxFVEUnIH0pKTtcbiAgICB9XG59XG5leHBvcnQgY29uc3QgQ2FwYWNpdG9ySHR0cCA9IHJlZ2lzdGVyUGx1Z2luKCdDYXBhY2l0b3JIdHRwJywge1xuICAgIHdlYjogKCkgPT4gbmV3IENhcGFjaXRvckh0dHBQbHVnaW5XZWIoKSxcbn0pO1xuLyoqKioqKioqIEVORCBIVFRQIFBMVUdJTiAqKioqKioqKi9cbi8qKioqKioqKiBTWVNURU0gQkFSUyBQTFVHSU4gKioqKioqKiovXG4vKipcbiAqIEF2YWlsYWJsZSBzdGF0dXMgYmFyIHN0eWxlcy5cbiAqL1xuZXhwb3J0IHZhciBTeXN0ZW1CYXJzU3R5bGU7XG4oZnVuY3Rpb24gKFN5c3RlbUJhcnNTdHlsZSkge1xuICAgIC8qKlxuICAgICAqIExpZ2h0IHN5c3RlbSBiYXIgY29udGVudCBvbiBhIGRhcmsgYmFja2dyb3VuZC5cbiAgICAgKlxuICAgICAqIEBzaW5jZSA4LjAuMFxuICAgICAqL1xuICAgIFN5c3RlbUJhcnNTdHlsZVtcIkRhcmtcIl0gPSBcIkRBUktcIjtcbiAgICAvKipcbiAgICAgKiBGb3IgZGFyayBzeXN0ZW0gYmFyIGNvbnRlbnQgb24gYSBsaWdodCBiYWNrZ3JvdW5kLlxuICAgICAqXG4gICAgICogQHNpbmNlIDguMC4wXG4gICAgICovXG4gICAgU3lzdGVtQmFyc1N0eWxlW1wiTGlnaHRcIl0gPSBcIkxJR0hUXCI7XG4gICAgLyoqXG4gICAgICogVGhlIHN0eWxlIGlzIGJhc2VkIG9uIHRoZSBkZXZpY2UgYXBwZWFyYW5jZSBvciB0aGUgdW5kZXJseWluZyBjb250ZW50LlxuICAgICAqIElmIHRoZSBkZXZpY2UgaXMgdXNpbmcgRGFyayBtb2RlLCB0aGUgc3lzdGVtIGJhcnMgY29udGVudCB3aWxsIGJlIGxpZ2h0LlxuICAgICAqIElmIHRoZSBkZXZpY2UgaXMgdXNpbmcgTGlnaHQgbW9kZSwgdGhlIHN5c3RlbSBiYXJzIGNvbnRlbnQgd2lsbCBiZSBkYXJrLlxuICAgICAqXG4gICAgICogQHNpbmNlIDguMC4wXG4gICAgICovXG4gICAgU3lzdGVtQmFyc1N0eWxlW1wiRGVmYXVsdFwiXSA9IFwiREVGQVVMVFwiO1xufSkoU3lzdGVtQmFyc1N0eWxlIHx8IChTeXN0ZW1CYXJzU3R5bGUgPSB7fSkpO1xuLyoqXG4gKiBBdmFpbGFibGUgc3lzdGVtIGJhciB0eXBlcy5cbiAqL1xuZXhwb3J0IHZhciBTeXN0ZW1CYXJUeXBlO1xuKGZ1bmN0aW9uIChTeXN0ZW1CYXJUeXBlKSB7XG4gICAgLyoqXG4gICAgICogVGhlIHRvcCBzdGF0dXMgYmFyIG9uIGJvdGggQW5kcm9pZCBhbmQgaU9TLlxuICAgICAqXG4gICAgICogQHNpbmNlIDguMC4wXG4gICAgICovXG4gICAgU3lzdGVtQmFyVHlwZVtcIlN0YXR1c0JhclwiXSA9IFwiU3RhdHVzQmFyXCI7XG4gICAgLyoqXG4gICAgICogVGhlIG5hdmlnYXRpb24gYmFyIChvciBnZXN0dXJlIGJhciBvbiBpT1MpIG9uIGJvdGggQW5kcm9pZCBhbmQgaU9TLlxuICAgICAqXG4gICAgICogQHNpbmNlIDguMC4wXG4gICAgICovXG4gICAgU3lzdGVtQmFyVHlwZVtcIk5hdmlnYXRpb25CYXJcIl0gPSBcIk5hdmlnYXRpb25CYXJcIjtcbn0pKFN5c3RlbUJhclR5cGUgfHwgKFN5c3RlbUJhclR5cGUgPSB7fSkpO1xuZXhwb3J0IGNsYXNzIFN5c3RlbUJhcnNQbHVnaW5XZWIgZXh0ZW5kcyBXZWJQbHVnaW4ge1xuICAgIGFzeW5jIHNldFN0eWxlKCkge1xuICAgICAgICB0aGlzLnVuYXZhaWxhYmxlKCdub3QgYXZhaWxhYmxlIGZvciB3ZWInKTtcbiAgICB9XG4gICAgYXN5bmMgc2V0QW5pbWF0aW9uKCkge1xuICAgICAgICB0aGlzLnVuYXZhaWxhYmxlKCdub3QgYXZhaWxhYmxlIGZvciB3ZWInKTtcbiAgICB9XG4gICAgYXN5bmMgc2hvdygpIHtcbiAgICAgICAgdGhpcy51bmF2YWlsYWJsZSgnbm90IGF2YWlsYWJsZSBmb3Igd2ViJyk7XG4gICAgfVxuICAgIGFzeW5jIGhpZGUoKSB7XG4gICAgICAgIHRoaXMudW5hdmFpbGFibGUoJ25vdCBhdmFpbGFibGUgZm9yIHdlYicpO1xuICAgIH1cbn1cbmV4cG9ydCBjb25zdCBTeXN0ZW1CYXJzID0gcmVnaXN0ZXJQbHVnaW4oJ1N5c3RlbUJhcnMnLCB7XG4gICAgd2ViOiAoKSA9PiBuZXcgU3lzdGVtQmFyc1BsdWdpbldlYigpLFxufSk7XG4vKioqKioqKiogRU5EIFNZU1RFTSBCQVJTIFBMVUdJTiAqKioqKioqKi9cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvcmUtcGx1Z2lucy5qcy5tYXAiLCAiaW1wb3J0IHR5cGUgeyBIdHRwT3B0aW9ucywgUGVybWlzc2lvblN0YXRlLCBQbHVnaW5MaXN0ZW5lckhhbmRsZSB9IGZyb20gJ0BjYXBhY2l0b3IvY29yZSc7XG5cbmV4cG9ydCB0eXBlIENhbGxiYWNrSUQgPSBzdHJpbmc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGVybWlzc2lvblN0YXR1cyB7XG4gIHB1YmxpY1N0b3JhZ2U6IFBlcm1pc3Npb25TdGF0ZTtcbn1cblxuZXhwb3J0IGVudW0gRGlyZWN0b3J5IHtcbiAgLyoqXG4gICAqIFRoZSBEb2N1bWVudHMgZGlyZWN0b3J5LlxuICAgKiBPbiBpT1MgaXQncyB0aGUgYXBwJ3MgZG9jdW1lbnRzIGRpcmVjdG9yeS5cbiAgICogVXNlIHRoaXMgZGlyZWN0b3J5IHRvIHN0b3JlIHVzZXItZ2VuZXJhdGVkIGNvbnRlbnQuXG4gICAqIE9uIEFuZHJvaWQgaXQncyB0aGUgUHVibGljIERvY3VtZW50cyBmb2xkZXIsIHNvIGl0J3MgYWNjZXNzaWJsZSBmcm9tIG90aGVyIGFwcHMuXG4gICAqIEl0J3Mgbm90IGFjY2Vzc2libGUgb24gQW5kcm9pZCAxMCB1bmxlc3MgdGhlIGFwcCBlbmFibGVzIGxlZ2FjeSBFeHRlcm5hbCBTdG9yYWdlXG4gICAqIGJ5IGFkZGluZyBgYW5kcm9pZDpyZXF1ZXN0TGVnYWN5RXh0ZXJuYWxTdG9yYWdlPVwidHJ1ZVwiYCBpbiB0aGUgYGFwcGxpY2F0aW9uYCB0YWdcbiAgICogaW4gdGhlIGBBbmRyb2lkTWFuaWZlc3QueG1sYC5cbiAgICogT24gQW5kcm9pZCAxMSBvciBuZXdlciB0aGUgYXBwIGNhbiBvbmx5IGFjY2VzcyB0aGUgZmlsZXMvZm9sZGVycyB0aGUgYXBwIGNyZWF0ZWQuXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgRG9jdW1lbnRzID0gJ0RPQ1VNRU5UUycsXG5cbiAgLyoqXG4gICAqIFRoZSBEYXRhIGRpcmVjdG9yeS5cbiAgICogT24gaU9TIGl0IHdpbGwgdXNlIHRoZSBEb2N1bWVudHMgZGlyZWN0b3J5LlxuICAgKiBPbiBBbmRyb2lkIGl0J3MgdGhlIGRpcmVjdG9yeSBob2xkaW5nIGFwcGxpY2F0aW9uIGZpbGVzLlxuICAgKiBGaWxlcyB3aWxsIGJlIGRlbGV0ZWQgd2hlbiB0aGUgYXBwbGljYXRpb24gaXMgdW5pbnN0YWxsZWQuXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgRGF0YSA9ICdEQVRBJyxcblxuICAvKipcbiAgICogVGhlIExpYnJhcnkgZGlyZWN0b3J5LlxuICAgKiBPbiBpT1MgaXQgd2lsbCB1c2UgdGhlIExpYnJhcnkgZGlyZWN0b3J5LlxuICAgKiBPbiBBbmRyb2lkIGl0J3MgdGhlIGRpcmVjdG9yeSBob2xkaW5nIGFwcGxpY2F0aW9uIGZpbGVzLlxuICAgKiBGaWxlcyB3aWxsIGJlIGRlbGV0ZWQgd2hlbiB0aGUgYXBwbGljYXRpb24gaXMgdW5pbnN0YWxsZWQuXG4gICAqXG4gICAqIEBzaW5jZSAxLjEuMFxuICAgKi9cbiAgTGlicmFyeSA9ICdMSUJSQVJZJyxcblxuICAvKipcbiAgICogVGhlIENhY2hlIGRpcmVjdG9yeS5cbiAgICogQ2FuIGJlIGRlbGV0ZWQgaW4gY2FzZXMgb2YgbG93IG1lbW9yeSwgc28gdXNlIHRoaXMgZGlyZWN0b3J5IHRvIHdyaXRlIGFwcC1zcGVjaWZpYyBmaWxlcy5cbiAgICogdGhhdCB5b3VyIGFwcCBjYW4gcmUtY3JlYXRlIGVhc2lseS5cbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICBDYWNoZSA9ICdDQUNIRScsXG5cbiAgLyoqXG4gICAqIFRoZSBleHRlcm5hbCBkaXJlY3RvcnkuXG4gICAqIE9uIGlPUyBpdCB3aWxsIHVzZSB0aGUgRG9jdW1lbnRzIGRpcmVjdG9yeS5cbiAgICogT24gQW5kcm9pZCBpdCdzIHRoZSBkaXJlY3Rvcnkgb24gdGhlIHByaW1hcnkgc2hhcmVkL2V4dGVybmFsXG4gICAqIHN0b3JhZ2UgZGV2aWNlIHdoZXJlIHRoZSBhcHBsaWNhdGlvbiBjYW4gcGxhY2UgcGVyc2lzdGVudCBmaWxlcyBpdCBvd25zLlxuICAgKiBUaGVzZSBmaWxlcyBhcmUgaW50ZXJuYWwgdG8gdGhlIGFwcGxpY2F0aW9ucywgYW5kIG5vdCB0eXBpY2FsbHkgdmlzaWJsZVxuICAgKiB0byB0aGUgdXNlciBhcyBtZWRpYS5cbiAgICogRmlsZXMgd2lsbCBiZSBkZWxldGVkIHdoZW4gdGhlIGFwcGxpY2F0aW9uIGlzIHVuaW5zdGFsbGVkLlxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIEV4dGVybmFsID0gJ0VYVEVSTkFMJyxcblxuICAvKipcbiAgICogVGhlIGV4dGVybmFsIHN0b3JhZ2UgZGlyZWN0b3J5LlxuICAgKiBPbiBpT1MgaXQgd2lsbCB1c2UgdGhlIERvY3VtZW50cyBkaXJlY3RvcnkuXG4gICAqIE9uIEFuZHJvaWQgaXQncyB0aGUgcHJpbWFyeSBzaGFyZWQvZXh0ZXJuYWwgc3RvcmFnZSBkaXJlY3RvcnkuXG4gICAqIEl0J3Mgbm90IGFjY2Vzc2libGUgb24gQW5kcm9pZCAxMCB1bmxlc3MgdGhlIGFwcCBlbmFibGVzIGxlZ2FjeSBFeHRlcm5hbCBTdG9yYWdlXG4gICAqIGJ5IGFkZGluZyBgYW5kcm9pZDpyZXF1ZXN0TGVnYWN5RXh0ZXJuYWxTdG9yYWdlPVwidHJ1ZVwiYCBpbiB0aGUgYGFwcGxpY2F0aW9uYCB0YWdcbiAgICogaW4gdGhlIGBBbmRyb2lkTWFuaWZlc3QueG1sYC5cbiAgICogSXQncyBub3QgYWNjZXNzaWJsZSBvbiBBbmRyb2lkIDExIG9yIG5ld2VyLlxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG5cbiAgRXh0ZXJuYWxTdG9yYWdlID0gJ0VYVEVSTkFMX1NUT1JBR0UnLFxuICAvKipcbiAgICogVGhlIGV4dGVybmFsIGNhY2hlIGRpcmVjdG9yeS5cbiAgICogT24gaU9TIGl0IHdpbGwgdXNlIHRoZSBEb2N1bWVudHMgZGlyZWN0b3J5LlxuICAgKiBPbiBBbmRyb2lkIGl0J3MgdGhlIHByaW1hcnkgc2hhcmVkL2V4dGVybmFsIGNhY2hlLlxuICAgKlxuICAgKiBAc2luY2UgNy4xLjBcbiAgICovXG4gIEV4dGVybmFsQ2FjaGUgPSAnRVhURVJOQUxfQ0FDSEUnLFxuXG4gIC8qKlxuICAgKiBUaGUgTGlicmFyeSBkaXJlY3Rvcnkgd2l0aG91dCBjbG91ZCBiYWNrdXAuIFVzZWQgaW4gaU9TLlxuICAgKiBPbiBBbmRyb2lkIGl0J3MgdGhlIGRpcmVjdG9yeSBob2xkaW5nIGFwcGxpY2F0aW9uIGZpbGVzLlxuICAgKlxuICAgKiBAc2luY2UgNy4xLjBcbiAgICovXG4gIExpYnJhcnlOb0Nsb3VkID0gJ0xJQlJBUllfTk9fQ0xPVUQnLFxuXG4gIC8qKlxuICAgKiBBIHRlbXBvcmFyeSBkaXJlY3RvcnkgZm9yIGlPUy5cbiAgICogT24gQW5kcm9pZCBpdCdzIHRoZSBkaXJlY3RvcnkgaG9sZGluZyB0aGUgYXBwbGljYXRpb24gY2FjaGUuXG4gICAqXG4gICAqIEBzaW5jZSA3LjEuMFxuICAgKi9cbiAgVGVtcG9yYXJ5ID0gJ1RFTVBPUkFSWScsXG59XG5cbmV4cG9ydCBlbnVtIEVuY29kaW5nIHtcbiAgLyoqXG4gICAqIEVpZ2h0LWJpdCBVQ1MgVHJhbnNmb3JtYXRpb24gRm9ybWF0XG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgVVRGOCA9ICd1dGY4JyxcblxuICAvKipcbiAgICogU2V2ZW4tYml0IEFTQ0lJLCBhLmsuYS4gSVNPNjQ2LVVTLCBhLmsuYS4gdGhlIEJhc2ljIExhdGluIGJsb2NrIG9mIHRoZVxuICAgKiBVbmljb2RlIGNoYXJhY3RlciBzZXRcbiAgICogVGhpcyBlbmNvZGluZyBpcyBvbmx5IHN1cHBvcnRlZCBvbiBBbmRyb2lkLlxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIEFTQ0lJID0gJ2FzY2lpJyxcblxuICAvKipcbiAgICogU2l4dGVlbi1iaXQgVUNTIFRyYW5zZm9ybWF0aW9uIEZvcm1hdCwgYnl0ZSBvcmRlciBpZGVudGlmaWVkIGJ5IGFuXG4gICAqIG9wdGlvbmFsIGJ5dGUtb3JkZXIgbWFya1xuICAgKiBUaGlzIGVuY29kaW5nIGlzIG9ubHkgc3VwcG9ydGVkIG9uIEFuZHJvaWQuXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgVVRGMTYgPSAndXRmMTYnLFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFdyaXRlRmlsZU9wdGlvbnMge1xuICAvKipcbiAgICogVGhlIHBhdGggb2YgdGhlIGZpbGUgdG8gd3JpdGVcbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICBwYXRoOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBkYXRhIHRvIHdyaXRlXG4gICAqXG4gICAqIE5vdGU6IEJsb2IgZGF0YSBpcyBvbmx5IHN1cHBvcnRlZCBvbiBXZWIuXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgZGF0YTogc3RyaW5nIHwgQmxvYjtcblxuICAvKipcbiAgICogVGhlIGBEaXJlY3RvcnlgIHRvIHN0b3JlIHRoZSBmaWxlIGluXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgZGlyZWN0b3J5PzogRGlyZWN0b3J5O1xuXG4gIC8qKlxuICAgKiBUaGUgZW5jb2RpbmcgdG8gd3JpdGUgdGhlIGZpbGUgaW4uIElmIG5vdCBwcm92aWRlZCwgZGF0YVxuICAgKiBpcyB3cml0dGVuIGFzIGJhc2U2NCBlbmNvZGVkLlxuICAgKlxuICAgKiBQYXNzIEVuY29kaW5nLlVURjggdG8gd3JpdGUgZGF0YSBhcyBzdHJpbmdcbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICBlbmNvZGluZz86IEVuY29kaW5nO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRvIGNyZWF0ZSBhbnkgbWlzc2luZyBwYXJlbnQgZGlyZWN0b3JpZXMuXG4gICAqXG4gICAqIEBkZWZhdWx0IGZhbHNlXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgcmVjdXJzaXZlPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBBcHBlbmRGaWxlT3B0aW9ucyB7XG4gIC8qKlxuICAgKiBUaGUgcGF0aCBvZiB0aGUgZmlsZSB0byBhcHBlbmRcbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICBwYXRoOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBkYXRhIHRvIHdyaXRlXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgZGF0YTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgYERpcmVjdG9yeWAgdG8gc3RvcmUgdGhlIGZpbGUgaW5cbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICBkaXJlY3Rvcnk/OiBEaXJlY3Rvcnk7XG5cbiAgLyoqXG4gICAqIFRoZSBlbmNvZGluZyB0byB3cml0ZSB0aGUgZmlsZSBpbi4gSWYgbm90IHByb3ZpZGVkLCBkYXRhXG4gICAqIGlzIHdyaXR0ZW4gYXMgYmFzZTY0IGVuY29kZWQuXG4gICAqXG4gICAqIFBhc3MgRW5jb2RpbmcuVVRGOCB0byB3cml0ZSBkYXRhIGFzIHN0cmluZ1xuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIGVuY29kaW5nPzogRW5jb2Rpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVhZEZpbGVPcHRpb25zIHtcbiAgLyoqXG4gICAqIFRoZSBwYXRoIG9mIHRoZSBmaWxlIHRvIHJlYWRcbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICBwYXRoOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBgRGlyZWN0b3J5YCB0byByZWFkIHRoZSBmaWxlIGZyb21cbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICBkaXJlY3Rvcnk/OiBEaXJlY3Rvcnk7XG5cbiAgLyoqXG4gICAqIFRoZSBlbmNvZGluZyB0byByZWFkIHRoZSBmaWxlIGluLCBpZiBub3QgcHJvdmlkZWQsIGRhdGFcbiAgICogaXMgcmVhZCBhcyBiaW5hcnkgYW5kIHJldHVybmVkIGFzIGJhc2U2NCBlbmNvZGVkLlxuICAgKlxuICAgKiBQYXNzIEVuY29kaW5nLlVURjggdG8gcmVhZCBkYXRhIGFzIHN0cmluZ1xuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIGVuY29kaW5nPzogRW5jb2Rpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBvZmZzZXQgdG8gc3RhcnQgcmVhZGluZyB0aGUgZmlsZSBmcm9tLCBpbiBieXRlcy5cbiAgICogTmF0aXZlIG9ubHkgKG5vdCBhdmFpbGFibGUgaW4gd2ViKS5cbiAgICogQ2FuIGJlIHVzZWQgaW4gY29uanVuY3Rpb24gd2l0aCBsZW5ndGggdG8gcGFydGlhbGx5IHJlYWQgZmlsZXMuXG4gICAqXG4gICAqIEBzaW5jZSA4LjEuMFxuICAgKiBAZGVmYXVsdCAwXG4gICAqL1xuICBvZmZzZXQ/OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSBsZW5ndGggb2YgZGF0YSB0byByZWFkLCBpbiBieXRlcy5cbiAgICogQW55IG5vbi1wb3NpdGl2ZSB2YWx1ZSBtZWFucyB0byByZWFkIHRvIHRoZSBlbmQgb2YgdGhlIGZpbGUuXG4gICAqIE5hdGl2ZSBvbmx5IChub3QgYXZhaWxhYmxlIGluIHdlYikuXG4gICAqIENhbiBiZSB1c2VkIGluIGNvbmp1bmN0aW9uIHdpdGggb2Zmc2V0IHRvIHBhcnRpYWxseSByZWFkIGZpbGVzLlxuICAgKlxuICAgKiBAc2luY2UgOC4xLjBcbiAgICogQGRlZmF1bHQgLTFcbiAgICovXG4gIGxlbmd0aD86IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZWFkRmlsZUluQ2h1bmtzT3B0aW9ucyBleHRlbmRzIFJlYWRGaWxlT3B0aW9ucyB7XG4gIC8qKlxuICAgKiBTaXplIG9mIHRoZSBjaHVua3MgaW4gYnl0ZXMuXG4gICAqXG4gICAqIEBzaW5jZSA3LjEuMFxuICAgKi9cbiAgY2h1bmtTaXplOiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGVsZXRlRmlsZU9wdGlvbnMge1xuICAvKipcbiAgICogVGhlIHBhdGggb2YgdGhlIGZpbGUgdG8gZGVsZXRlXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgcGF0aDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgYERpcmVjdG9yeWAgdG8gZGVsZXRlIHRoZSBmaWxlIGZyb21cbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICBkaXJlY3Rvcnk/OiBEaXJlY3Rvcnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWtkaXJPcHRpb25zIHtcbiAgLyoqXG4gICAqIFRoZSBwYXRoIG9mIHRoZSBuZXcgZGlyZWN0b3J5XG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgcGF0aDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgYERpcmVjdG9yeWAgdG8gbWFrZSB0aGUgbmV3IGRpcmVjdG9yeSBpblxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIGRpcmVjdG9yeT86IERpcmVjdG9yeTtcblxuICAvKipcbiAgICogV2hldGhlciB0byBjcmVhdGUgYW55IG1pc3NpbmcgcGFyZW50IGRpcmVjdG9yaWVzIGFzIHdlbGwuXG4gICAqXG4gICAqIEBkZWZhdWx0IGZhbHNlXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgcmVjdXJzaXZlPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSbWRpck9wdGlvbnMge1xuICAvKipcbiAgICogVGhlIHBhdGggb2YgdGhlIGRpcmVjdG9yeSB0byByZW1vdmVcbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICBwYXRoOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBgRGlyZWN0b3J5YCB0byByZW1vdmUgdGhlIGRpcmVjdG9yeSBmcm9tXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgZGlyZWN0b3J5PzogRGlyZWN0b3J5O1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRvIHJlY3Vyc2l2ZWx5IHJlbW92ZSB0aGUgY29udGVudHMgb2YgdGhlIGRpcmVjdG9yeVxuICAgKlxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIHJlY3Vyc2l2ZT86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVhZGRpck9wdGlvbnMge1xuICAvKipcbiAgICogVGhlIHBhdGggb2YgdGhlIGRpcmVjdG9yeSB0byByZWFkXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgcGF0aDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgYERpcmVjdG9yeWAgdG8gbGlzdCBmaWxlcyBmcm9tXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgZGlyZWN0b3J5PzogRGlyZWN0b3J5O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEdldFVyaU9wdGlvbnMge1xuICAvKipcbiAgICogVGhlIHBhdGggb2YgdGhlIGZpbGUgdG8gZ2V0IHRoZSBVUkkgZm9yXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgcGF0aDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgYERpcmVjdG9yeWAgdG8gZ2V0IHRoZSBmaWxlIHVuZGVyXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgZGlyZWN0b3J5OiBEaXJlY3Rvcnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RhdE9wdGlvbnMge1xuICAvKipcbiAgICogVGhlIHBhdGggb2YgdGhlIGZpbGUgdG8gZ2V0IGRhdGEgYWJvdXRcbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICBwYXRoOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBgRGlyZWN0b3J5YCB0byBnZXQgdGhlIGZpbGUgdW5kZXJcbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICBkaXJlY3Rvcnk/OiBEaXJlY3Rvcnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29weU9wdGlvbnMge1xuICAvKipcbiAgICogVGhlIGV4aXN0aW5nIGZpbGUgb3IgZGlyZWN0b3J5XG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgZnJvbTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgZGVzdGluYXRpb24gZmlsZSBvciBkaXJlY3RvcnlcbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICB0bzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgYERpcmVjdG9yeWAgY29udGFpbmluZyB0aGUgZXhpc3RpbmcgZmlsZSBvciBkaXJlY3RvcnlcbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICBkaXJlY3Rvcnk/OiBEaXJlY3Rvcnk7XG5cbiAgLyoqXG4gICAqIFRoZSBgRGlyZWN0b3J5YCBjb250YWluaW5nIHRoZSBkZXN0aW5hdGlvbiBmaWxlIG9yIGRpcmVjdG9yeS4gSWYgbm90IHN1cHBsaWVkIHdpbGwgdXNlIHRoZSAnZGlyZWN0b3J5J1xuICAgKiBwYXJhbWV0ZXIgYXMgdGhlIGRlc3RpbmF0aW9uXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgdG9EaXJlY3Rvcnk/OiBEaXJlY3Rvcnk7XG59XG5cbmV4cG9ydCB0eXBlIFJlbmFtZU9wdGlvbnMgPSBDb3B5T3B0aW9ucztcblxuZXhwb3J0IGludGVyZmFjZSBSZWFkRmlsZVJlc3VsdCB7XG4gIC8qKlxuICAgKiBUaGUgcmVwcmVzZW50YXRpb24gb2YgdGhlIGRhdGEgY29udGFpbmVkIGluIHRoZSBmaWxlXG4gICAqXG4gICAqIE5vdGU6IEJsb2IgaXMgb25seSBhdmFpbGFibGUgb24gV2ViLiBPbiBuYXRpdmUsIHRoZSBkYXRhIGlzIHJldHVybmVkIGFzIGEgc3RyaW5nLlxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIGRhdGE6IHN0cmluZyB8IEJsb2I7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgV3JpdGVGaWxlUmVzdWx0IHtcbiAgLyoqXG4gICAqIFRoZSB1cmkgd2hlcmUgdGhlIGZpbGUgd2FzIHdyaXR0ZW4gaW50b1xuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIHVyaTogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJlYWRkaXJSZXN1bHQge1xuICAvKipcbiAgICogTGlzdCBvZiBmaWxlcyBhbmQgZGlyZWN0b3JpZXMgaW5zaWRlIHRoZSBkaXJlY3RvcnlcbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICBmaWxlczogRmlsZUluZm9bXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGaWxlSW5mbyB7XG4gIC8qKlxuICAgKiBOYW1lIG9mIHRoZSBmaWxlIG9yIGRpcmVjdG9yeS5cbiAgICpcbiAgICogQHNpbmNlIDcuMS4wXG4gICAqL1xuICBuYW1lOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFR5cGUgb2YgdGhlIGZpbGUuXG4gICAqXG4gICAqIEBzaW5jZSA0LjAuMFxuICAgKi9cbiAgdHlwZTogJ2RpcmVjdG9yeScgfCAnZmlsZSc7XG5cbiAgLyoqXG4gICAqIFNpemUgb2YgdGhlIGZpbGUgaW4gYnl0ZXMuXG4gICAqXG4gICAqIEBzaW5jZSA0LjAuMFxuICAgKi9cbiAgc2l6ZTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaW1lIG9mIGNyZWF0aW9uIGluIG1pbGxpc2Vjb25kcy5cbiAgICpcbiAgICogSXQncyBub3QgYXZhaWxhYmxlIG9uIEFuZHJvaWQgNyBhbmQgb2xkZXIgZGV2aWNlcy5cbiAgICpcbiAgICogQHNpbmNlIDcuMS4wXG4gICAqL1xuICBjdGltZT86IG51bWJlcjtcblxuICAvKipcbiAgICogVGltZSBvZiBsYXN0IG1vZGlmaWNhdGlvbiBpbiBtaWxsaXNlY29uZHMuXG4gICAqXG4gICAqIEBzaW5jZSA3LjEuMFxuICAgKi9cbiAgbXRpbWU6IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIHVyaSBvZiB0aGUgZmlsZS5cbiAgICpcbiAgICogQHNpbmNlIDQuMC4wXG4gICAqL1xuICB1cmk6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBHZXRVcmlSZXN1bHQge1xuICAvKipcbiAgICogVGhlIHVyaSBvZiB0aGUgZmlsZVxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIHVyaTogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBTdGF0UmVzdWx0ID0gRmlsZUluZm87XG5leHBvcnQgaW50ZXJmYWNlIENvcHlSZXN1bHQge1xuICAvKipcbiAgICogVGhlIHVyaSB3aGVyZSB0aGUgZmlsZSB3YXMgY29waWVkIGludG9cbiAgICpcbiAgICogQHNpbmNlIDQuMC4wXG4gICAqL1xuICB1cmk6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEb3dubG9hZEZpbGVPcHRpb25zIGV4dGVuZHMgSHR0cE9wdGlvbnMge1xuICAvKipcbiAgICogVGhlIHBhdGggdGhlIGRvd25sb2FkZWQgZmlsZSBzaG91bGQgYmUgbW92ZWQgdG8uXG4gICAqXG4gICAqIEBzaW5jZSA1LjEuMFxuICAgKi9cbiAgcGF0aDogc3RyaW5nO1xuICAvKipcbiAgICogVGhlIGRpcmVjdG9yeSB0byB3cml0ZSB0aGUgZmlsZSB0by5cbiAgICogSWYgdGhpcyBvcHRpb24gaXMgdXNlZCwgZmlsZVBhdGggY2FuIGJlIGEgcmVsYXRpdmUgcGF0aCByYXRoZXIgdGhhbiBhYnNvbHV0ZS5cbiAgICogVGhlIGRlZmF1bHQgaXMgdGhlIGBEQVRBYCBkaXJlY3RvcnkuXG4gICAqXG4gICAqIEBzaW5jZSA1LjEuMFxuICAgKi9cbiAgZGlyZWN0b3J5PzogRGlyZWN0b3J5O1xuICAvKipcbiAgICogQW4gb3B0aW9uYWwgbGlzdGVuZXIgZnVuY3Rpb24gdG8gcmVjZWl2ZSBkb3dubG9hZGVkIHByb2dyZXNzIGV2ZW50cy5cbiAgICogSWYgdGhpcyBvcHRpb24gaXMgdXNlZCwgcHJvZ3Jlc3MgZXZlbnQgc2hvdWxkIGJlIGRpc3BhdGNoZWQgb24gZXZlcnkgY2h1bmsgcmVjZWl2ZWQuXG4gICAqIENodW5rcyBhcmUgdGhyb3R0bGVkIHRvIGV2ZXJ5IDEwMG1zIG9uIEFuZHJvaWQvaU9TIHRvIGF2b2lkIHNsb3dkb3ducy5cbiAgICpcbiAgICogQHNpbmNlIDUuMS4wXG4gICAqL1xuICBwcm9ncmVzcz86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBXaGV0aGVyIHRvIGNyZWF0ZSBhbnkgbWlzc2luZyBwYXJlbnQgZGlyZWN0b3JpZXMuXG4gICAqXG4gICAqIEBkZWZhdWx0IGZhbHNlXG4gICAqIEBzaW5jZSA1LjEuMlxuICAgKi9cbiAgcmVjdXJzaXZlPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEb3dubG9hZEZpbGVSZXN1bHQge1xuICAvKipcbiAgICogVGhlIHBhdGggdGhlIGZpbGUgd2FzIGRvd25sb2FkZWQgdG8uXG4gICAqXG4gICAqIEBzaW5jZSA1LjEuMFxuICAgKi9cbiAgcGF0aD86IHN0cmluZztcbiAgLyoqXG4gICAqIFRoZSBibG9iIGRhdGEgb2YgdGhlIGRvd25sb2FkZWQgZmlsZS5cbiAgICogVGhpcyBpcyBvbmx5IGF2YWlsYWJsZSBvbiB3ZWIuXG4gICAqXG4gICAqIEBzaW5jZSA1LjEuMFxuICAgKi9cbiAgYmxvYj86IEJsb2I7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJvZ3Jlc3NTdGF0dXMge1xuICAvKipcbiAgICogVGhlIHVybCBvZiB0aGUgZmlsZSBiZWluZyBkb3dubG9hZGVkLlxuICAgKlxuICAgKiBAc2luY2UgNS4xLjBcbiAgICovXG4gIHVybDogc3RyaW5nO1xuICAvKipcbiAgICogVGhlIG51bWJlciBvZiBieXRlcyBkb3dubG9hZGVkIHNvIGZhci5cbiAgICpcbiAgICogQHNpbmNlIDUuMS4wXG4gICAqL1xuICBieXRlczogbnVtYmVyO1xuICAvKipcbiAgICogVGhlIHRvdGFsIG51bWJlciBvZiBieXRlcyB0byBkb3dubG9hZCBmb3IgdGhpcyBmaWxlLlxuICAgKlxuICAgKiBAc2luY2UgNS4xLjBcbiAgICovXG4gIGNvbnRlbnRMZW5ndGg6IG51bWJlcjtcbn1cblxuLyoqXG4gKiBDYWxsYmFjayBmb3IgcmVjZWl2aW5nIGNodW5rcyByZWFkIGZyb20gYSBmaWxlLCBvciBlcnJvciBpZiBzb21ldGhpbmcgd2VudCB3cm9uZy5cbiAqXG4gKiBAc2luY2UgNy4xLjBcbiAqL1xuZXhwb3J0IHR5cGUgUmVhZEZpbGVJbkNodW5rc0NhbGxiYWNrID0gKGNodW5rUmVhZDogUmVhZEZpbGVSZXN1bHQgfCBudWxsLCBlcnI/OiBhbnkpID0+IHZvaWQ7XG5cbi8qKlxuICogQSBsaXN0ZW5lciBmdW5jdGlvbiB0aGF0IHJlY2VpdmVzIHByb2dyZXNzIGV2ZW50cy5cbiAqXG4gKiBAc2luY2UgNS4xLjBcbiAqL1xuZXhwb3J0IHR5cGUgUHJvZ3Jlc3NMaXN0ZW5lciA9IChwcm9ncmVzczogUHJvZ3Jlc3NTdGF0dXMpID0+IHZvaWQ7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmlsZXN5c3RlbVBsdWdpbiB7XG4gIC8qKlxuICAgKiBDaGVjayByZWFkL3dyaXRlIHBlcm1pc3Npb25zLlxuICAgKiBSZXF1aXJlZCBvbiBBbmRyb2lkLCBvbmx5IHdoZW4gdXNpbmcgYERpcmVjdG9yeS5Eb2N1bWVudHNgIG9yXG4gICAqIGBEaXJlY3RvcnkuRXh0ZXJuYWxTdG9yYWdlYC5cbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICBjaGVja1Blcm1pc3Npb25zKCk6IFByb21pc2U8UGVybWlzc2lvblN0YXR1cz47XG5cbiAgLyoqXG4gICAqIFJlcXVlc3QgcmVhZC93cml0ZSBwZXJtaXNzaW9ucy5cbiAgICogUmVxdWlyZWQgb24gQW5kcm9pZCwgb25seSB3aGVuIHVzaW5nIGBEaXJlY3RvcnkuRG9jdW1lbnRzYCBvclxuICAgKiBgRGlyZWN0b3J5LkV4dGVybmFsU3RvcmFnZWAuXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgcmVxdWVzdFBlcm1pc3Npb25zKCk6IFByb21pc2U8UGVybWlzc2lvblN0YXR1cz47XG5cbiAgLyoqXG4gICAqIFJlYWQgYSBmaWxlIGZyb20gZGlza1xuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIHJlYWRGaWxlKG9wdGlvbnM6IFJlYWRGaWxlT3B0aW9ucyk6IFByb21pc2U8UmVhZEZpbGVSZXN1bHQ+O1xuXG4gIC8qKlxuICAgKiBSZWFkIGEgZmlsZSBmcm9tIGRpc2ssIGluIGNodW5rcy5cbiAgICogTmF0aXZlIG9ubHkgKG5vdCBhdmFpbGFibGUgaW4gd2ViKS5cbiAgICogVXNlIHRoZSBjYWxsYmFjayB0byByZWNlaXZlIGVhY2ggcmVhZCBjaHVuay5cbiAgICogSWYgZW1wdHkgY2h1bmsgaXMgcmV0dXJuZWQsIGl0IG1lYW5zIGZpbGUgaGFzIGJlZW4gY29tcGxldGVseSByZWFkLlxuICAgKlxuICAgKiBAc2luY2UgNy4xLjBcbiAgICovXG4gIHJlYWRGaWxlSW5DaHVua3Mob3B0aW9uczogUmVhZEZpbGVJbkNodW5rc09wdGlvbnMsIGNhbGxiYWNrOiBSZWFkRmlsZUluQ2h1bmtzQ2FsbGJhY2spOiBQcm9taXNlPENhbGxiYWNrSUQ+O1xuXG4gIC8qKlxuICAgKiBXcml0ZSBhIGZpbGUgdG8gZGlzayBpbiB0aGUgc3BlY2lmaWVkIGxvY2F0aW9uIG9uIGRldmljZVxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIHdyaXRlRmlsZShvcHRpb25zOiBXcml0ZUZpbGVPcHRpb25zKTogUHJvbWlzZTxXcml0ZUZpbGVSZXN1bHQ+O1xuXG4gIC8qKlxuICAgKiBBcHBlbmQgdG8gYSBmaWxlIG9uIGRpc2sgaW4gdGhlIHNwZWNpZmllZCBsb2NhdGlvbiBvbiBkZXZpY2VcbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICBhcHBlbmRGaWxlKG9wdGlvbnM6IEFwcGVuZEZpbGVPcHRpb25zKTogUHJvbWlzZTx2b2lkPjtcblxuICAvKipcbiAgICogRGVsZXRlIGEgZmlsZSBmcm9tIGRpc2tcbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICBkZWxldGVGaWxlKG9wdGlvbnM6IERlbGV0ZUZpbGVPcHRpb25zKTogUHJvbWlzZTx2b2lkPjtcblxuICAvKipcbiAgICogQ3JlYXRlIGEgZGlyZWN0b3J5LlxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIG1rZGlyKG9wdGlvbnM6IE1rZGlyT3B0aW9ucyk6IFByb21pc2U8dm9pZD47XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhIGRpcmVjdG9yeVxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIHJtZGlyKG9wdGlvbnM6IFJtZGlyT3B0aW9ucyk6IFByb21pc2U8dm9pZD47XG5cbiAgLyoqXG4gICAqIFJldHVybiBhIGxpc3Qgb2YgZmlsZXMgZnJvbSB0aGUgZGlyZWN0b3J5IChub3QgcmVjdXJzaXZlKVxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIHJlYWRkaXIob3B0aW9uczogUmVhZGRpck9wdGlvbnMpOiBQcm9taXNlPFJlYWRkaXJSZXN1bHQ+O1xuXG4gIC8qKlxuICAgKiBSZXR1cm4gZnVsbCBGaWxlIFVSSSBmb3IgYSBwYXRoIGFuZCBkaXJlY3RvcnlcbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICBnZXRVcmkob3B0aW9uczogR2V0VXJpT3B0aW9ucyk6IFByb21pc2U8R2V0VXJpUmVzdWx0PjtcblxuICAvKipcbiAgICogUmV0dXJuIGRhdGEgYWJvdXQgYSBmaWxlXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgc3RhdChvcHRpb25zOiBTdGF0T3B0aW9ucyk6IFByb21pc2U8U3RhdFJlc3VsdD47XG5cbiAgLyoqXG4gICAqIFJlbmFtZSBhIGZpbGUgb3IgZGlyZWN0b3J5XG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgcmVuYW1lKG9wdGlvbnM6IFJlbmFtZU9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+O1xuXG4gIC8qKlxuICAgKiBDb3B5IGEgZmlsZSBvciBkaXJlY3RvcnlcbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICBjb3B5KG9wdGlvbnM6IENvcHlPcHRpb25zKTogUHJvbWlzZTxDb3B5UmVzdWx0PjtcblxuICAvKipcbiAgICogUGVyZm9ybSBhIGh0dHAgcmVxdWVzdCB0byBhIHNlcnZlciBhbmQgZG93bmxvYWQgdGhlIGZpbGUgdG8gdGhlIHNwZWNpZmllZCBkZXN0aW5hdGlvbi5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgaGFzIGJlZW4gZGVwcmVjYXRlZCBzaW5jZSB2ZXJzaW9uIDcuMS4wLlxuICAgKiBXZSByZWNvbW1lbmQgdXNpbmcgdGhlIEBjYXBhY2l0b3IvZmlsZS10cmFuc2ZlciBwbHVnaW4gaW5zdGVhZCwgaW4gY29uanVuY3Rpb24gd2l0aCB0aGlzIHBsdWdpbi5cbiAgICpcbiAgICogQHNpbmNlIDUuMS4wXG4gICAqIEBkZXByZWNhdGVkIFVzZSB0aGUgQGNhcGFjaXRvci9maWxlLXRyYW5zZmVyIHBsdWdpbiBpbnN0ZWFkLlxuICAgKi9cbiAgZG93bmxvYWRGaWxlKG9wdGlvbnM6IERvd25sb2FkRmlsZU9wdGlvbnMpOiBQcm9taXNlPERvd25sb2FkRmlsZVJlc3VsdD47XG5cbiAgLyoqXG4gICAqIEFkZCBhIGxpc3RlbmVyIHRvIGZpbGUgZG93bmxvYWQgcHJvZ3Jlc3MgZXZlbnRzLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBoYXMgYmVlbiBkZXByZWNhdGVkIHNpbmNlIHZlcnNpb24gNy4xLjAuXG4gICAqIFdlIHJlY29tbWVuZCB1c2luZyB0aGUgQGNhcGFjaXRvci9maWxlLXRyYW5zZmVyIHBsdWdpbiBpbnN0ZWFkLCBpbiBjb25qdW5jdGlvbiB3aXRoIHRoaXMgcGx1Z2luLlxuICAgKlxuICAgKiBAc2luY2UgNS4xLjBcbiAgICogQGRlcHJlY2F0ZWQgVXNlIHRoZSBAY2FwYWNpdG9yL2ZpbGUtdHJhbnNmZXIgcGx1Z2luIGluc3RlYWQuXG4gICAqL1xuICBhZGRMaXN0ZW5lcihldmVudE5hbWU6ICdwcm9ncmVzcycsIGxpc3RlbmVyRnVuYzogUHJvZ3Jlc3NMaXN0ZW5lcik6IFByb21pc2U8UGx1Z2luTGlzdGVuZXJIYW5kbGU+O1xuXG4gIC8qKlxuICAgKiBSZW1vdmUgYWxsIGxpc3RlbmVycyBmb3IgdGhpcyBwbHVnaW4uXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGhhcyBiZWVuIGRlcHJlY2F0ZWQgc2luY2UgdmVyc2lvbiA3LjEuMC5cbiAgICogV2UgcmVjb21tZW5kIHVzaW5nIHRoZSBAY2FwYWNpdG9yL2ZpbGUtdHJhbnNmZXIgcGx1Z2luIGluc3RlYWQsIGluIGNvbmp1bmN0aW9uIHdpdGggdGhpcyBwbHVnaW4uXG4gICAqXG4gICAqIEBzaW5jZSA1LjIuMFxuICAgKiBAZGVwcmVjYXRlZCBVc2UgdGhlIEBjYXBhY2l0b3IvZmlsZS10cmFuc2ZlciBwbHVnaW4gaW5zdGVhZC5cbiAgICovXG4gIHJlbW92ZUFsbExpc3RlbmVycygpOiBQcm9taXNlPHZvaWQ+O1xufVxuXG4vKipcbiAqIFN0cnVjdHVyZSBmb3IgZXJyb3JzIHJldHVybmVkIGJ5IHRoZSBwbHVnaW4uXG4gKlxuICogYGNvZGVgIGZvbGxvd3MgXCJPUy1QTFVHLUZJTEUtWFhYWFwiIGZvcm1hdFxuICpcbiAqIEBzaW5jZSAxLjAuMFxuICovXG5leHBvcnQgdHlwZSBQbHVnaW5FcnJvciA9IHtcbiAgY29kZTogc3RyaW5nO1xuICBtZXNzYWdlOiBzdHJpbmc7XG59O1xuXG4vKipcbiAqIEBkZXByZWNhdGVkIFVzZSBgUmVhZEZpbGVPcHRpb25zYC5cbiAqIEBzaW5jZSAxLjAuMFxuICovXG5leHBvcnQgdHlwZSBGaWxlUmVhZE9wdGlvbnMgPSBSZWFkRmlsZU9wdGlvbnM7XG5cbi8qKlxuICogQGRlcHJlY2F0ZWQgVXNlIGBSZWFkRmlsZVJlc3VsdGAuXG4gKiBAc2luY2UgMS4wLjBcbiAqL1xuZXhwb3J0IHR5cGUgRmlsZVJlYWRSZXN1bHQgPSBSZWFkRmlsZVJlc3VsdDtcblxuLyoqXG4gKiBAZGVwcmVjYXRlZCBVc2UgYFdyaXRlRmlsZU9wdGlvbnNgLlxuICogQHNpbmNlIDEuMC4wXG4gKi9cbmV4cG9ydCB0eXBlIEZpbGVXcml0ZU9wdGlvbnMgPSBXcml0ZUZpbGVPcHRpb25zO1xuXG4vKipcbiAqIEBkZXByZWNhdGVkIFVzZSBgV3JpdGVGaWxlUmVzdWx0YC5cbiAqIEBzaW5jZSAxLjAuMFxuICovXG5leHBvcnQgdHlwZSBGaWxlV3JpdGVSZXN1bHQgPSBXcml0ZUZpbGVSZXN1bHQ7XG5cbi8qKlxuICogQGRlcHJlY2F0ZWQgVXNlIGBBcHBlbmRGaWxlT3B0aW9uc2AuXG4gKiBAc2luY2UgMS4wLjBcbiAqL1xuZXhwb3J0IHR5cGUgRmlsZUFwcGVuZE9wdGlvbnMgPSBBcHBlbmRGaWxlT3B0aW9ucztcblxuLyoqXG4gKiBAZGVwcmVjYXRlZCBVc2UgYERlbGV0ZUZpbGVPcHRpb25zYC5cbiAqIEBzaW5jZSAxLjAuMFxuICovXG5leHBvcnQgdHlwZSBGaWxlRGVsZXRlT3B0aW9ucyA9IERlbGV0ZUZpbGVPcHRpb25zO1xuXG4vKipcbiAqIEBkZXByZWNhdGVkIFVzZSBgRGlyZWN0b3J5YC5cbiAqIEBzaW5jZSAxLjAuMFxuICovXG5leHBvcnQgY29uc3QgRmlsZXN5c3RlbURpcmVjdG9yeSA9IERpcmVjdG9yeTtcblxuLyoqXG4gKiBAZGVwcmVjYXRlZCBVc2UgYEVuY29kaW5nYC5cbiAqIEBzaW5jZSAxLjAuMFxuICovXG5leHBvcnQgY29uc3QgRmlsZXN5c3RlbUVuY29kaW5nID0gRW5jb2Rpbmc7XG4iLCAiaW1wb3J0IHsgV2ViUGx1Z2luLCBidWlsZFJlcXVlc3RJbml0IH0gZnJvbSAnQGNhcGFjaXRvci9jb3JlJztcblxuaW1wb3J0IHR5cGUge1xuICBBcHBlbmRGaWxlT3B0aW9ucyxcbiAgQ29weU9wdGlvbnMsXG4gIENvcHlSZXN1bHQsXG4gIERlbGV0ZUZpbGVPcHRpb25zLFxuICBGaWxlc3lzdGVtUGx1Z2luLFxuICBHZXRVcmlPcHRpb25zLFxuICBHZXRVcmlSZXN1bHQsXG4gIE1rZGlyT3B0aW9ucyxcbiAgUGVybWlzc2lvblN0YXR1cyxcbiAgUmVhZEZpbGVPcHRpb25zLFxuICBSZWFkRmlsZVJlc3VsdCxcbiAgUmVhZGRpck9wdGlvbnMsXG4gIFJlYWRkaXJSZXN1bHQsXG4gIFJlbmFtZU9wdGlvbnMsXG4gIFJtZGlyT3B0aW9ucyxcbiAgU3RhdE9wdGlvbnMsXG4gIFN0YXRSZXN1bHQsXG4gIFdyaXRlRmlsZU9wdGlvbnMsXG4gIFdyaXRlRmlsZVJlc3VsdCxcbiAgRGlyZWN0b3J5LFxuICBSZWFkRmlsZUluQ2h1bmtzT3B0aW9ucyxcbiAgQ2FsbGJhY2tJRCxcbiAgRG93bmxvYWRGaWxlT3B0aW9ucyxcbiAgRG93bmxvYWRGaWxlUmVzdWx0LFxuICBQcm9ncmVzc1N0YXR1cyxcbiAgUmVhZEZpbGVJbkNodW5rc0NhbGxiYWNrLFxufSBmcm9tICcuL2RlZmluaXRpb25zJztcbmltcG9ydCB7IEVuY29kaW5nIH0gZnJvbSAnLi9kZWZpbml0aW9ucyc7XG5cbmZ1bmN0aW9uIHJlc29sdmUocGF0aDogc3RyaW5nKTogc3RyaW5nIHtcbiAgY29uc3QgcG9zaXggPSBwYXRoLnNwbGl0KCcvJykuZmlsdGVyKChpdGVtKSA9PiBpdGVtICE9PSAnLicpO1xuICBjb25zdCBuZXdQb3NpeDogc3RyaW5nW10gPSBbXTtcblxuICBwb3NpeC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgaWYgKGl0ZW0gPT09ICcuLicgJiYgbmV3UG9zaXgubGVuZ3RoID4gMCAmJiBuZXdQb3NpeFtuZXdQb3NpeC5sZW5ndGggLSAxXSAhPT0gJy4uJykge1xuICAgICAgbmV3UG9zaXgucG9wKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5ld1Bvc2l4LnB1c2goaXRlbSk7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gbmV3UG9zaXguam9pbignLycpO1xufVxuZnVuY3Rpb24gaXNQYXRoUGFyZW50KHBhcmVudDogc3RyaW5nLCBjaGlsZHJlbjogc3RyaW5nKTogYm9vbGVhbiB7XG4gIHBhcmVudCA9IHJlc29sdmUocGFyZW50KTtcbiAgY2hpbGRyZW4gPSByZXNvbHZlKGNoaWxkcmVuKTtcbiAgY29uc3QgcGF0aHNBID0gcGFyZW50LnNwbGl0KCcvJyk7XG4gIGNvbnN0IHBhdGhzQiA9IGNoaWxkcmVuLnNwbGl0KCcvJyk7XG5cbiAgcmV0dXJuIHBhcmVudCAhPT0gY2hpbGRyZW4gJiYgcGF0aHNBLmV2ZXJ5KCh2YWx1ZSwgaW5kZXgpID0+IHZhbHVlID09PSBwYXRoc0JbaW5kZXhdKTtcbn1cblxuZXhwb3J0IGNsYXNzIEZpbGVzeXN0ZW1XZWIgZXh0ZW5kcyBXZWJQbHVnaW4gaW1wbGVtZW50cyBGaWxlc3lzdGVtUGx1Z2luIHtcbiAgcmVhZEZpbGVJbkNodW5rcyhfb3B0aW9uczogUmVhZEZpbGVJbkNodW5rc09wdGlvbnMsIF9jYWxsYmFjazogUmVhZEZpbGVJbkNodW5rc0NhbGxiYWNrKTogUHJvbWlzZTxDYWxsYmFja0lEPiB7XG4gICAgdGhyb3cgdGhpcy51bmF2YWlsYWJsZSgnTWV0aG9kIG5vdCBpbXBsZW1lbnRlZC4nKTtcbiAgfVxuICBEQl9WRVJTSU9OID0gMTtcbiAgREJfTkFNRSA9ICdEaXNjJztcblxuICBwcml2YXRlIF93cml0ZUNtZHM6IHN0cmluZ1tdID0gWydhZGQnLCAncHV0JywgJ2RlbGV0ZSddO1xuICBwcml2YXRlIF9kYj86IElEQkRhdGFiYXNlO1xuICBzdGF0aWMgX2RlYnVnID0gdHJ1ZTtcbiAgYXN5bmMgaW5pdERiKCk6IFByb21pc2U8SURCRGF0YWJhc2U+IHtcbiAgICBpZiAodGhpcy5fZGIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2RiO1xuICAgIH1cbiAgICBpZiAoISgnaW5kZXhlZERCJyBpbiB3aW5kb3cpKSB7XG4gICAgICB0aHJvdyB0aGlzLnVuYXZhaWxhYmxlKFwiVGhpcyBicm93c2VyIGRvZXNuJ3Qgc3VwcG9ydCBJbmRleGVkREJcIik7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPElEQkRhdGFiYXNlPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCByZXF1ZXN0ID0gaW5kZXhlZERCLm9wZW4odGhpcy5EQl9OQU1FLCB0aGlzLkRCX1ZFUlNJT04pO1xuICAgICAgcmVxdWVzdC5vbnVwZ3JhZGVuZWVkZWQgPSBGaWxlc3lzdGVtV2ViLmRvVXBncmFkZTtcbiAgICAgIHJlcXVlc3Qub25zdWNjZXNzID0gKCkgPT4ge1xuICAgICAgICB0aGlzLl9kYiA9IHJlcXVlc3QucmVzdWx0O1xuICAgICAgICByZXNvbHZlKHJlcXVlc3QucmVzdWx0KTtcbiAgICAgIH07XG4gICAgICByZXF1ZXN0Lm9uZXJyb3IgPSAoKSA9PiByZWplY3QocmVxdWVzdC5lcnJvcik7XG4gICAgICByZXF1ZXN0Lm9uYmxvY2tlZCA9ICgpID0+IHtcbiAgICAgICAgY29uc29sZS53YXJuKCdkYiBibG9ja2VkJyk7XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIGRvVXBncmFkZShldmVudDogSURCVmVyc2lvbkNoYW5nZUV2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgZXZlbnRUYXJnZXQgPSBldmVudC50YXJnZXQgYXMgSURCT3BlbkRCUmVxdWVzdDtcbiAgICBjb25zdCBkYiA9IGV2ZW50VGFyZ2V0LnJlc3VsdDtcbiAgICBzd2l0Y2ggKGV2ZW50Lm9sZFZlcnNpb24pIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgIGNhc2UgMTpcbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgaWYgKGRiLm9iamVjdFN0b3JlTmFtZXMuY29udGFpbnMoJ0ZpbGVTdG9yYWdlJykpIHtcbiAgICAgICAgICBkYi5kZWxldGVPYmplY3RTdG9yZSgnRmlsZVN0b3JhZ2UnKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzdG9yZSA9IGRiLmNyZWF0ZU9iamVjdFN0b3JlKCdGaWxlU3RvcmFnZScsIHsga2V5UGF0aDogJ3BhdGgnIH0pO1xuICAgICAgICBzdG9yZS5jcmVhdGVJbmRleCgnYnlfZm9sZGVyJywgJ2ZvbGRlcicpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGRiUmVxdWVzdChjbWQ6IHN0cmluZywgYXJnczogYW55W10pOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnN0IHJlYWRGbGFnID0gdGhpcy5fd3JpdGVDbWRzLmluZGV4T2YoY21kKSAhPT0gLTEgPyAncmVhZHdyaXRlJyA6ICdyZWFkb25seSc7XG4gICAgcmV0dXJuIHRoaXMuaW5pdERiKCkudGhlbigoY29ubjogSURCRGF0YWJhc2UpID0+IHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxJREJPYmplY3RTdG9yZT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBjb25zdCB0eDogSURCVHJhbnNhY3Rpb24gPSBjb25uLnRyYW5zYWN0aW9uKFsnRmlsZVN0b3JhZ2UnXSwgcmVhZEZsYWcpO1xuICAgICAgICBjb25zdCBzdG9yZTogYW55ID0gdHgub2JqZWN0U3RvcmUoJ0ZpbGVTdG9yYWdlJyk7XG4gICAgICAgIGNvbnN0IHJlcSA9IHN0b3JlW2NtZF0oLi4uYXJncyk7XG4gICAgICAgIHJlcS5vbnN1Y2Nlc3MgPSAoKSA9PiByZXNvbHZlKHJlcS5yZXN1bHQpO1xuICAgICAgICByZXEub25lcnJvciA9ICgpID0+IHJlamVjdChyZXEuZXJyb3IpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBkYkluZGV4UmVxdWVzdChpbmRleE5hbWU6IHN0cmluZywgY21kOiBzdHJpbmcsIGFyZ3M6IFthbnldKTogUHJvbWlzZTxhbnk+IHtcbiAgICBjb25zdCByZWFkRmxhZyA9IHRoaXMuX3dyaXRlQ21kcy5pbmRleE9mKGNtZCkgIT09IC0xID8gJ3JlYWR3cml0ZScgOiAncmVhZG9ubHknO1xuICAgIHJldHVybiB0aGlzLmluaXREYigpLnRoZW4oKGNvbm46IElEQkRhdGFiYXNlKSA9PiB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2U8SURCT2JqZWN0U3RvcmU+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgY29uc3QgdHg6IElEQlRyYW5zYWN0aW9uID0gY29ubi50cmFuc2FjdGlvbihbJ0ZpbGVTdG9yYWdlJ10sIHJlYWRGbGFnKTtcbiAgICAgICAgY29uc3Qgc3RvcmU6IElEQk9iamVjdFN0b3JlID0gdHgub2JqZWN0U3RvcmUoJ0ZpbGVTdG9yYWdlJyk7XG4gICAgICAgIGNvbnN0IGluZGV4OiBhbnkgPSBzdG9yZS5pbmRleChpbmRleE5hbWUpO1xuICAgICAgICBjb25zdCByZXEgPSBpbmRleFtjbWRdKC4uLmFyZ3MpIGFzIGFueTtcbiAgICAgICAgcmVxLm9uc3VjY2VzcyA9ICgpID0+IHJlc29sdmUocmVxLnJlc3VsdCk7XG4gICAgICAgIHJlcS5vbmVycm9yID0gKCkgPT4gcmVqZWN0KHJlcS5lcnJvcik7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0UGF0aChkaXJlY3Rvcnk6IERpcmVjdG9yeSB8IHVuZGVmaW5lZCwgdXJpUGF0aDogc3RyaW5nIHwgdW5kZWZpbmVkKTogc3RyaW5nIHtcbiAgICBjb25zdCBjbGVhbmVkVXJpUGF0aCA9IHVyaVBhdGggIT09IHVuZGVmaW5lZCA/IHVyaVBhdGgucmVwbGFjZSgvXlsvXSt8Wy9dKyQvZywgJycpIDogJyc7XG4gICAgbGV0IGZzUGF0aCA9ICcnO1xuICAgIGlmIChkaXJlY3RvcnkgIT09IHVuZGVmaW5lZCkgZnNQYXRoICs9ICcvJyArIGRpcmVjdG9yeTtcbiAgICBpZiAodXJpUGF0aCAhPT0gJycpIGZzUGF0aCArPSAnLycgKyBjbGVhbmVkVXJpUGF0aDtcbiAgICByZXR1cm4gZnNQYXRoO1xuICB9XG5cbiAgYXN5bmMgY2xlYXIoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgY29ubjogSURCRGF0YWJhc2UgPSBhd2FpdCB0aGlzLmluaXREYigpO1xuICAgIGNvbnN0IHR4OiBJREJUcmFuc2FjdGlvbiA9IGNvbm4udHJhbnNhY3Rpb24oWydGaWxlU3RvcmFnZSddLCAncmVhZHdyaXRlJyk7XG4gICAgY29uc3Qgc3RvcmU6IElEQk9iamVjdFN0b3JlID0gdHgub2JqZWN0U3RvcmUoJ0ZpbGVTdG9yYWdlJyk7XG4gICAgc3RvcmUuY2xlYXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWFkIGEgZmlsZSBmcm9tIGRpc2tcbiAgICogQHBhcmFtIG9wdGlvbnMgb3B0aW9ucyBmb3IgdGhlIGZpbGUgcmVhZFxuICAgKiBAcmV0dXJuIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIHJlYWQgZmlsZSBkYXRhIHJlc3VsdFxuICAgKi9cbiAgYXN5bmMgcmVhZEZpbGUob3B0aW9uczogUmVhZEZpbGVPcHRpb25zKTogUHJvbWlzZTxSZWFkRmlsZVJlc3VsdD4ge1xuICAgIGNvbnN0IHBhdGg6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aChvcHRpb25zLmRpcmVjdG9yeSwgb3B0aW9ucy5wYXRoKTtcbiAgICAvLyBjb25zdCBlbmNvZGluZyA9IG9wdGlvbnMuZW5jb2Rpbmc7XG5cbiAgICBjb25zdCBlbnRyeSA9IChhd2FpdCB0aGlzLmRiUmVxdWVzdCgnZ2V0JywgW3BhdGhdKSkgYXMgRW50cnlPYmo7XG4gICAgaWYgKGVudHJ5ID09PSB1bmRlZmluZWQpIHRocm93IEVycm9yKCdGaWxlIGRvZXMgbm90IGV4aXN0LicpO1xuICAgIHJldHVybiB7IGRhdGE6IGVudHJ5LmNvbnRlbnQgPyBlbnRyeS5jb250ZW50IDogJycgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXcml0ZSBhIGZpbGUgdG8gZGlzayBpbiB0aGUgc3BlY2lmaWVkIGxvY2F0aW9uIG9uIGRldmljZVxuICAgKiBAcGFyYW0gb3B0aW9ucyBvcHRpb25zIGZvciB0aGUgZmlsZSB3cml0ZVxuICAgKiBAcmV0dXJuIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIGZpbGUgd3JpdGUgcmVzdWx0XG4gICAqL1xuICBhc3luYyB3cml0ZUZpbGUob3B0aW9uczogV3JpdGVGaWxlT3B0aW9ucyk6IFByb21pc2U8V3JpdGVGaWxlUmVzdWx0PiB7XG4gICAgY29uc3QgcGF0aDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKG9wdGlvbnMuZGlyZWN0b3J5LCBvcHRpb25zLnBhdGgpO1xuICAgIGxldCBkYXRhID0gb3B0aW9ucy5kYXRhO1xuICAgIGNvbnN0IGVuY29kaW5nID0gb3B0aW9ucy5lbmNvZGluZztcbiAgICBjb25zdCBkb1JlY3Vyc2l2ZSA9IG9wdGlvbnMucmVjdXJzaXZlO1xuXG4gICAgY29uc3Qgb2NjdXBpZWRFbnRyeSA9IChhd2FpdCB0aGlzLmRiUmVxdWVzdCgnZ2V0JywgW3BhdGhdKSkgYXMgRW50cnlPYmo7XG4gICAgaWYgKG9jY3VwaWVkRW50cnkgJiYgb2NjdXBpZWRFbnRyeS50eXBlID09PSAnZGlyZWN0b3J5JykgdGhyb3cgRXJyb3IoJ1RoZSBzdXBwbGllZCBwYXRoIGlzIGEgZGlyZWN0b3J5LicpO1xuXG4gICAgY29uc3QgcGFyZW50UGF0aCA9IHBhdGguc3Vic3RyKDAsIHBhdGgubGFzdEluZGV4T2YoJy8nKSk7XG5cbiAgICBjb25zdCBwYXJlbnRFbnRyeSA9IChhd2FpdCB0aGlzLmRiUmVxdWVzdCgnZ2V0JywgW3BhcmVudFBhdGhdKSkgYXMgRW50cnlPYmo7XG4gICAgaWYgKHBhcmVudEVudHJ5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IHN1YkRpckluZGV4ID0gcGFyZW50UGF0aC5pbmRleE9mKCcvJywgMSk7XG4gICAgICBpZiAoc3ViRGlySW5kZXggIT09IC0xKSB7XG4gICAgICAgIGNvbnN0IHBhcmVudEFyZ1BhdGggPSBwYXJlbnRQYXRoLnN1YnN0cihzdWJEaXJJbmRleCk7XG4gICAgICAgIGF3YWl0IHRoaXMubWtkaXIoe1xuICAgICAgICAgIHBhdGg6IHBhcmVudEFyZ1BhdGgsXG4gICAgICAgICAgZGlyZWN0b3J5OiBvcHRpb25zLmRpcmVjdG9yeSxcbiAgICAgICAgICByZWN1cnNpdmU6IGRvUmVjdXJzaXZlLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIWVuY29kaW5nICYmICEoZGF0YSBpbnN0YW5jZW9mIEJsb2IpKSB7XG4gICAgICBkYXRhID0gZGF0YS5pbmRleE9mKCcsJykgPj0gMCA/IGRhdGEuc3BsaXQoJywnKVsxXSA6IGRhdGE7XG4gICAgICBpZiAoIXRoaXMuaXNCYXNlNjRTdHJpbmcoZGF0YSkpIHRocm93IEVycm9yKCdUaGUgc3VwcGxpZWQgZGF0YSBpcyBub3QgdmFsaWQgYmFzZTY0IGNvbnRlbnQuJyk7XG4gICAgfVxuXG4gICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICBjb25zdCBwYXRoT2JqOiBFbnRyeU9iaiA9IHtcbiAgICAgIHBhdGg6IHBhdGgsXG4gICAgICBmb2xkZXI6IHBhcmVudFBhdGgsXG4gICAgICB0eXBlOiAnZmlsZScsXG4gICAgICBzaXplOiBkYXRhIGluc3RhbmNlb2YgQmxvYiA/IGRhdGEuc2l6ZSA6IGRhdGEubGVuZ3RoLFxuICAgICAgY3RpbWU6IG5vdyxcbiAgICAgIG10aW1lOiBub3csXG4gICAgICBjb250ZW50OiBkYXRhLFxuICAgIH07XG4gICAgYXdhaXQgdGhpcy5kYlJlcXVlc3QoJ3B1dCcsIFtwYXRoT2JqXSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVyaTogcGF0aE9iai5wYXRoLFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQXBwZW5kIHRvIGEgZmlsZSBvbiBkaXNrIGluIHRoZSBzcGVjaWZpZWQgbG9jYXRpb24gb24gZGV2aWNlXG4gICAqIEBwYXJhbSBvcHRpb25zIG9wdGlvbnMgZm9yIHRoZSBmaWxlIGFwcGVuZFxuICAgKiBAcmV0dXJuIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIGZpbGUgd3JpdGUgcmVzdWx0XG4gICAqL1xuICBhc3luYyBhcHBlbmRGaWxlKG9wdGlvbnM6IEFwcGVuZEZpbGVPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgcGF0aDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKG9wdGlvbnMuZGlyZWN0b3J5LCBvcHRpb25zLnBhdGgpO1xuICAgIGxldCBkYXRhID0gb3B0aW9ucy5kYXRhO1xuICAgIGNvbnN0IGVuY29kaW5nID0gb3B0aW9ucy5lbmNvZGluZztcbiAgICBjb25zdCBwYXJlbnRQYXRoID0gcGF0aC5zdWJzdHIoMCwgcGF0aC5sYXN0SW5kZXhPZignLycpKTtcblxuICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgbGV0IGN0aW1lID0gbm93O1xuXG4gICAgY29uc3Qgb2NjdXBpZWRFbnRyeSA9IChhd2FpdCB0aGlzLmRiUmVxdWVzdCgnZ2V0JywgW3BhdGhdKSkgYXMgRW50cnlPYmo7XG4gICAgaWYgKG9jY3VwaWVkRW50cnkgJiYgb2NjdXBpZWRFbnRyeS50eXBlID09PSAnZGlyZWN0b3J5JykgdGhyb3cgRXJyb3IoJ1RoZSBzdXBwbGllZCBwYXRoIGlzIGEgZGlyZWN0b3J5LicpO1xuXG4gICAgY29uc3QgcGFyZW50RW50cnkgPSAoYXdhaXQgdGhpcy5kYlJlcXVlc3QoJ2dldCcsIFtwYXJlbnRQYXRoXSkpIGFzIEVudHJ5T2JqO1xuICAgIGlmIChwYXJlbnRFbnRyeSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zdCBzdWJEaXJJbmRleCA9IHBhcmVudFBhdGguaW5kZXhPZignLycsIDEpO1xuICAgICAgaWYgKHN1YkRpckluZGV4ICE9PSAtMSkge1xuICAgICAgICBjb25zdCBwYXJlbnRBcmdQYXRoID0gcGFyZW50UGF0aC5zdWJzdHIoc3ViRGlySW5kZXgpO1xuICAgICAgICBhd2FpdCB0aGlzLm1rZGlyKHtcbiAgICAgICAgICBwYXRoOiBwYXJlbnRBcmdQYXRoLFxuICAgICAgICAgIGRpcmVjdG9yeTogb3B0aW9ucy5kaXJlY3RvcnksXG4gICAgICAgICAgcmVjdXJzaXZlOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIWVuY29kaW5nICYmICF0aGlzLmlzQmFzZTY0U3RyaW5nKGRhdGEpKSB0aHJvdyBFcnJvcignVGhlIHN1cHBsaWVkIGRhdGEgaXMgbm90IHZhbGlkIGJhc2U2NCBjb250ZW50LicpO1xuXG4gICAgaWYgKG9jY3VwaWVkRW50cnkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKG9jY3VwaWVkRW50cnkuY29udGVudCBpbnN0YW5jZW9mIEJsb2IpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ1RoZSBvY2N1cGllZCBlbnRyeSBjb250YWlucyBhIEJsb2Igb2JqZWN0IHdoaWNoIGNhbm5vdCBiZSBhcHBlbmRlZCB0by4nKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG9jY3VwaWVkRW50cnkuY29udGVudCAhPT0gdW5kZWZpbmVkICYmICFlbmNvZGluZykge1xuICAgICAgICBkYXRhID0gYnRvYShhdG9iKG9jY3VwaWVkRW50cnkuY29udGVudCkgKyBhdG9iKGRhdGEpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRhdGEgPSBvY2N1cGllZEVudHJ5LmNvbnRlbnQgKyBkYXRhO1xuICAgICAgfVxuICAgICAgY3RpbWUgPSBvY2N1cGllZEVudHJ5LmN0aW1lO1xuICAgIH1cbiAgICBjb25zdCBwYXRoT2JqOiBFbnRyeU9iaiA9IHtcbiAgICAgIHBhdGg6IHBhdGgsXG4gICAgICBmb2xkZXI6IHBhcmVudFBhdGgsXG4gICAgICB0eXBlOiAnZmlsZScsXG4gICAgICBzaXplOiBkYXRhLmxlbmd0aCxcbiAgICAgIGN0aW1lOiBjdGltZSxcbiAgICAgIG10aW1lOiBub3csXG4gICAgICBjb250ZW50OiBkYXRhLFxuICAgIH07XG4gICAgYXdhaXQgdGhpcy5kYlJlcXVlc3QoJ3B1dCcsIFtwYXRoT2JqXSk7XG4gIH1cblxuICAvKipcbiAgICogRGVsZXRlIGEgZmlsZSBmcm9tIGRpc2tcbiAgICogQHBhcmFtIG9wdGlvbnMgb3B0aW9ucyBmb3IgdGhlIGZpbGUgZGVsZXRlXG4gICAqIEByZXR1cm4gYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgZGVsZXRlZCBmaWxlIGRhdGEgcmVzdWx0XG4gICAqL1xuICBhc3luYyBkZWxldGVGaWxlKG9wdGlvbnM6IERlbGV0ZUZpbGVPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgcGF0aDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKG9wdGlvbnMuZGlyZWN0b3J5LCBvcHRpb25zLnBhdGgpO1xuXG4gICAgY29uc3QgZW50cnkgPSAoYXdhaXQgdGhpcy5kYlJlcXVlc3QoJ2dldCcsIFtwYXRoXSkpIGFzIEVudHJ5T2JqO1xuICAgIGlmIChlbnRyeSA9PT0gdW5kZWZpbmVkKSB0aHJvdyBFcnJvcignRmlsZSBkb2VzIG5vdCBleGlzdC4nKTtcbiAgICBjb25zdCBlbnRyaWVzID0gYXdhaXQgdGhpcy5kYkluZGV4UmVxdWVzdCgnYnlfZm9sZGVyJywgJ2dldEFsbEtleXMnLCBbSURCS2V5UmFuZ2Uub25seShwYXRoKV0pO1xuICAgIGlmIChlbnRyaWVzLmxlbmd0aCAhPT0gMCkgdGhyb3cgRXJyb3IoJ0ZvbGRlciBpcyBub3QgZW1wdHkuJyk7XG5cbiAgICBhd2FpdCB0aGlzLmRiUmVxdWVzdCgnZGVsZXRlJywgW3BhdGhdKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBkaXJlY3RvcnkuXG4gICAqIEBwYXJhbSBvcHRpb25zIG9wdGlvbnMgZm9yIHRoZSBta2RpclxuICAgKiBAcmV0dXJuIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIG1rZGlyIHJlc3VsdFxuICAgKi9cbiAgYXN5bmMgbWtkaXIob3B0aW9uczogTWtkaXJPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgcGF0aDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKG9wdGlvbnMuZGlyZWN0b3J5LCBvcHRpb25zLnBhdGgpO1xuICAgIGNvbnN0IGRvUmVjdXJzaXZlID0gb3B0aW9ucy5yZWN1cnNpdmU7XG4gICAgY29uc3QgcGFyZW50UGF0aCA9IHBhdGguc3Vic3RyKDAsIHBhdGgubGFzdEluZGV4T2YoJy8nKSk7XG5cbiAgICBjb25zdCBkZXB0aCA9IChwYXRoLm1hdGNoKC9cXC8vZykgfHwgW10pLmxlbmd0aDtcbiAgICBjb25zdCBwYXJlbnRFbnRyeSA9IChhd2FpdCB0aGlzLmRiUmVxdWVzdCgnZ2V0JywgW3BhcmVudFBhdGhdKSkgYXMgRW50cnlPYmo7XG4gICAgY29uc3Qgb2NjdXBpZWRFbnRyeSA9IChhd2FpdCB0aGlzLmRiUmVxdWVzdCgnZ2V0JywgW3BhdGhdKSkgYXMgRW50cnlPYmo7XG4gICAgaWYgKGRlcHRoID09PSAxKSB0aHJvdyBFcnJvcignQ2Fubm90IGNyZWF0ZSBSb290IGRpcmVjdG9yeScpO1xuICAgIGlmIChvY2N1cGllZEVudHJ5ICE9PSB1bmRlZmluZWQpIHRocm93IEVycm9yKCdDdXJyZW50IGRpcmVjdG9yeSBkb2VzIGFscmVhZHkgZXhpc3QuJyk7XG4gICAgaWYgKCFkb1JlY3Vyc2l2ZSAmJiBkZXB0aCAhPT0gMiAmJiBwYXJlbnRFbnRyeSA9PT0gdW5kZWZpbmVkKSB0aHJvdyBFcnJvcignUGFyZW50IGRpcmVjdG9yeSBtdXN0IGV4aXN0Jyk7XG5cbiAgICBpZiAoZG9SZWN1cnNpdmUgJiYgZGVwdGggIT09IDIgJiYgcGFyZW50RW50cnkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc3QgcGFyZW50QXJnUGF0aCA9IHBhcmVudFBhdGguc3Vic3RyKHBhcmVudFBhdGguaW5kZXhPZignLycsIDEpKTtcbiAgICAgIGF3YWl0IHRoaXMubWtkaXIoe1xuICAgICAgICBwYXRoOiBwYXJlbnRBcmdQYXRoLFxuICAgICAgICBkaXJlY3Rvcnk6IG9wdGlvbnMuZGlyZWN0b3J5LFxuICAgICAgICByZWN1cnNpdmU6IGRvUmVjdXJzaXZlLFxuICAgICAgfSk7XG4gICAgfVxuICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgY29uc3QgcGF0aE9iajogRW50cnlPYmogPSB7XG4gICAgICBwYXRoOiBwYXRoLFxuICAgICAgZm9sZGVyOiBwYXJlbnRQYXRoLFxuICAgICAgdHlwZTogJ2RpcmVjdG9yeScsXG4gICAgICBzaXplOiAwLFxuICAgICAgY3RpbWU6IG5vdyxcbiAgICAgIG10aW1lOiBub3csXG4gICAgfTtcbiAgICBhd2FpdCB0aGlzLmRiUmVxdWVzdCgncHV0JywgW3BhdGhPYmpdKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYSBkaXJlY3RvcnlcbiAgICogQHBhcmFtIG9wdGlvbnMgdGhlIG9wdGlvbnMgZm9yIHRoZSBkaXJlY3RvcnkgcmVtb3ZlXG4gICAqL1xuICBhc3luYyBybWRpcihvcHRpb25zOiBSbWRpck9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCB7IHBhdGgsIGRpcmVjdG9yeSwgcmVjdXJzaXZlIH0gPSBvcHRpb25zO1xuICAgIGNvbnN0IGZ1bGxQYXRoOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoZGlyZWN0b3J5LCBwYXRoKTtcblxuICAgIGNvbnN0IGVudHJ5ID0gKGF3YWl0IHRoaXMuZGJSZXF1ZXN0KCdnZXQnLCBbZnVsbFBhdGhdKSkgYXMgRW50cnlPYmo7XG5cbiAgICBpZiAoZW50cnkgPT09IHVuZGVmaW5lZCkgdGhyb3cgRXJyb3IoJ0ZvbGRlciBkb2VzIG5vdCBleGlzdC4nKTtcblxuICAgIGlmIChlbnRyeS50eXBlICE9PSAnZGlyZWN0b3J5JykgdGhyb3cgRXJyb3IoJ1JlcXVlc3RlZCBwYXRoIGlzIG5vdCBhIGRpcmVjdG9yeScpO1xuXG4gICAgY29uc3QgcmVhZERpclJlc3VsdCA9IGF3YWl0IHRoaXMucmVhZGRpcih7IHBhdGgsIGRpcmVjdG9yeSB9KTtcblxuICAgIGlmIChyZWFkRGlyUmVzdWx0LmZpbGVzLmxlbmd0aCAhPT0gMCAmJiAhcmVjdXJzaXZlKSB0aHJvdyBFcnJvcignRm9sZGVyIGlzIG5vdCBlbXB0eScpO1xuXG4gICAgZm9yIChjb25zdCBlbnRyeSBvZiByZWFkRGlyUmVzdWx0LmZpbGVzKSB7XG4gICAgICBjb25zdCBlbnRyeVBhdGggPSBgJHtwYXRofS8ke2VudHJ5Lm5hbWV9YDtcbiAgICAgIGNvbnN0IGVudHJ5T2JqID0gYXdhaXQgdGhpcy5zdGF0KHsgcGF0aDogZW50cnlQYXRoLCBkaXJlY3RvcnkgfSk7XG4gICAgICBpZiAoZW50cnlPYmoudHlwZSA9PT0gJ2ZpbGUnKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuZGVsZXRlRmlsZSh7IHBhdGg6IGVudHJ5UGF0aCwgZGlyZWN0b3J5IH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXdhaXQgdGhpcy5ybWRpcih7IHBhdGg6IGVudHJ5UGF0aCwgZGlyZWN0b3J5LCByZWN1cnNpdmUgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgYXdhaXQgdGhpcy5kYlJlcXVlc3QoJ2RlbGV0ZScsIFtmdWxsUGF0aF0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBhIGxpc3Qgb2YgZmlsZXMgZnJvbSB0aGUgZGlyZWN0b3J5IChub3QgcmVjdXJzaXZlKVxuICAgKiBAcGFyYW0gb3B0aW9ucyB0aGUgb3B0aW9ucyBmb3IgdGhlIHJlYWRkaXIgb3BlcmF0aW9uXG4gICAqIEByZXR1cm4gYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgcmVhZGRpciBkaXJlY3RvcnkgbGlzdGluZyByZXN1bHRcbiAgICovXG4gIGFzeW5jIHJlYWRkaXIob3B0aW9uczogUmVhZGRpck9wdGlvbnMpOiBQcm9taXNlPFJlYWRkaXJSZXN1bHQ+IHtcbiAgICBjb25zdCBwYXRoOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgob3B0aW9ucy5kaXJlY3RvcnksIG9wdGlvbnMucGF0aCk7XG5cbiAgICBjb25zdCBlbnRyeSA9IChhd2FpdCB0aGlzLmRiUmVxdWVzdCgnZ2V0JywgW3BhdGhdKSkgYXMgRW50cnlPYmo7XG4gICAgaWYgKG9wdGlvbnMucGF0aCAhPT0gJycgJiYgZW50cnkgPT09IHVuZGVmaW5lZCkgdGhyb3cgRXJyb3IoJ0ZvbGRlciBkb2VzIG5vdCBleGlzdC4nKTtcblxuICAgIGNvbnN0IGVudHJpZXM6IHN0cmluZ1tdID0gYXdhaXQgdGhpcy5kYkluZGV4UmVxdWVzdCgnYnlfZm9sZGVyJywgJ2dldEFsbEtleXMnLCBbSURCS2V5UmFuZ2Uub25seShwYXRoKV0pO1xuICAgIGNvbnN0IGZpbGVzID0gYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICBlbnRyaWVzLm1hcChhc3luYyAoZSkgPT4ge1xuICAgICAgICBsZXQgc3ViRW50cnkgPSAoYXdhaXQgdGhpcy5kYlJlcXVlc3QoJ2dldCcsIFtlXSkpIGFzIEVudHJ5T2JqO1xuICAgICAgICBpZiAoc3ViRW50cnkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHN1YkVudHJ5ID0gKGF3YWl0IHRoaXMuZGJSZXF1ZXN0KCdnZXQnLCBbZSArICcvJ10pKSBhcyBFbnRyeU9iajtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIG5hbWU6IGUuc3Vic3RyaW5nKHBhdGgubGVuZ3RoICsgMSksXG4gICAgICAgICAgdHlwZTogc3ViRW50cnkudHlwZSxcbiAgICAgICAgICBzaXplOiBzdWJFbnRyeS5zaXplLFxuICAgICAgICAgIGN0aW1lOiBzdWJFbnRyeS5jdGltZSxcbiAgICAgICAgICBtdGltZTogc3ViRW50cnkubXRpbWUsXG4gICAgICAgICAgdXJpOiBzdWJFbnRyeS5wYXRoLFxuICAgICAgICB9O1xuICAgICAgfSksXG4gICAgKTtcbiAgICByZXR1cm4geyBmaWxlczogZmlsZXMgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gZnVsbCBGaWxlIFVSSSBmb3IgYSBwYXRoIGFuZCBkaXJlY3RvcnlcbiAgICogQHBhcmFtIG9wdGlvbnMgdGhlIG9wdGlvbnMgZm9yIHRoZSBzdGF0IG9wZXJhdGlvblxuICAgKiBAcmV0dXJuIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIGZpbGUgc3RhdCByZXN1bHRcbiAgICovXG4gIGFzeW5jIGdldFVyaShvcHRpb25zOiBHZXRVcmlPcHRpb25zKTogUHJvbWlzZTxHZXRVcmlSZXN1bHQ+IHtcbiAgICBjb25zdCBwYXRoOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgob3B0aW9ucy5kaXJlY3RvcnksIG9wdGlvbnMucGF0aCk7XG5cbiAgICBsZXQgZW50cnkgPSAoYXdhaXQgdGhpcy5kYlJlcXVlc3QoJ2dldCcsIFtwYXRoXSkpIGFzIEVudHJ5T2JqO1xuICAgIGlmIChlbnRyeSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBlbnRyeSA9IChhd2FpdCB0aGlzLmRiUmVxdWVzdCgnZ2V0JywgW3BhdGggKyAnLyddKSkgYXMgRW50cnlPYmo7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICB1cmk6IGVudHJ5Py5wYXRoIHx8IHBhdGgsXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gZGF0YSBhYm91dCBhIGZpbGVcbiAgICogQHBhcmFtIG9wdGlvbnMgdGhlIG9wdGlvbnMgZm9yIHRoZSBzdGF0IG9wZXJhdGlvblxuICAgKiBAcmV0dXJuIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIGZpbGUgc3RhdCByZXN1bHRcbiAgICovXG4gIGFzeW5jIHN0YXQob3B0aW9uczogU3RhdE9wdGlvbnMpOiBQcm9taXNlPFN0YXRSZXN1bHQ+IHtcbiAgICBjb25zdCBwYXRoOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgob3B0aW9ucy5kaXJlY3RvcnksIG9wdGlvbnMucGF0aCk7XG5cbiAgICBsZXQgZW50cnkgPSAoYXdhaXQgdGhpcy5kYlJlcXVlc3QoJ2dldCcsIFtwYXRoXSkpIGFzIEVudHJ5T2JqO1xuICAgIGlmIChlbnRyeSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBlbnRyeSA9IChhd2FpdCB0aGlzLmRiUmVxdWVzdCgnZ2V0JywgW3BhdGggKyAnLyddKSkgYXMgRW50cnlPYmo7XG4gICAgfVxuICAgIGlmIChlbnRyeSA9PT0gdW5kZWZpbmVkKSB0aHJvdyBFcnJvcignRW50cnkgZG9lcyBub3QgZXhpc3QuJyk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogZW50cnkucGF0aC5zdWJzdHJpbmcocGF0aC5sZW5ndGggKyAxKSxcbiAgICAgIHR5cGU6IGVudHJ5LnR5cGUsXG4gICAgICBzaXplOiBlbnRyeS5zaXplLFxuICAgICAgY3RpbWU6IGVudHJ5LmN0aW1lLFxuICAgICAgbXRpbWU6IGVudHJ5Lm10aW1lLFxuICAgICAgdXJpOiBlbnRyeS5wYXRoLFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogUmVuYW1lIGEgZmlsZSBvciBkaXJlY3RvcnlcbiAgICogQHBhcmFtIG9wdGlvbnMgdGhlIG9wdGlvbnMgZm9yIHRoZSByZW5hbWUgb3BlcmF0aW9uXG4gICAqIEByZXR1cm4gYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgcmVuYW1lIHJlc3VsdFxuICAgKi9cbiAgYXN5bmMgcmVuYW1lKG9wdGlvbnM6IFJlbmFtZU9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzLl9jb3B5KG9wdGlvbnMsIHRydWUpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb3B5IGEgZmlsZSBvciBkaXJlY3RvcnlcbiAgICogQHBhcmFtIG9wdGlvbnMgdGhlIG9wdGlvbnMgZm9yIHRoZSBjb3B5IG9wZXJhdGlvblxuICAgKiBAcmV0dXJuIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIGNvcHkgcmVzdWx0XG4gICAqL1xuICBhc3luYyBjb3B5KG9wdGlvbnM6IENvcHlPcHRpb25zKTogUHJvbWlzZTxDb3B5UmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvcHkob3B0aW9ucywgZmFsc2UpO1xuICB9XG5cbiAgYXN5bmMgcmVxdWVzdFBlcm1pc3Npb25zKCk6IFByb21pc2U8UGVybWlzc2lvblN0YXR1cz4ge1xuICAgIHJldHVybiB7IHB1YmxpY1N0b3JhZ2U6ICdncmFudGVkJyB9O1xuICB9XG5cbiAgYXN5bmMgY2hlY2tQZXJtaXNzaW9ucygpOiBQcm9taXNlPFBlcm1pc3Npb25TdGF0dXM+IHtcbiAgICByZXR1cm4geyBwdWJsaWNTdG9yYWdlOiAnZ3JhbnRlZCcgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGdW5jdGlvbiB0aGF0IGNhbiBwZXJmb3JtIGEgY29weSBvciBhIHJlbmFtZVxuICAgKiBAcGFyYW0gb3B0aW9ucyB0aGUgb3B0aW9ucyBmb3IgdGhlIHJlbmFtZSBvcGVyYXRpb25cbiAgICogQHBhcmFtIGRvUmVuYW1lIHdoZXRoZXIgdG8gcGVyZm9ybSBhIHJlbmFtZSBvciBjb3B5IG9wZXJhdGlvblxuICAgKiBAcmV0dXJuIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIHJlc3VsdFxuICAgKi9cbiAgcHJpdmF0ZSBhc3luYyBfY29weShvcHRpb25zOiBDb3B5T3B0aW9ucywgZG9SZW5hbWUgPSBmYWxzZSk6IFByb21pc2U8Q29weVJlc3VsdD4ge1xuICAgIGxldCB7IHRvRGlyZWN0b3J5IH0gPSBvcHRpb25zO1xuICAgIGNvbnN0IHsgdG8sIGZyb20sIGRpcmVjdG9yeTogZnJvbURpcmVjdG9yeSB9ID0gb3B0aW9ucztcblxuICAgIGlmICghdG8gfHwgIWZyb20pIHtcbiAgICAgIHRocm93IEVycm9yKCdCb3RoIHRvIGFuZCBmcm9tIG11c3QgYmUgcHJvdmlkZWQnKTtcbiAgICB9XG5cbiAgICAvLyBJZiBubyBcInRvXCIgZGlyZWN0b3J5IGlzIHByb3ZpZGVkLCB1c2UgdGhlIFwiZnJvbVwiIGRpcmVjdG9yeVxuICAgIGlmICghdG9EaXJlY3RvcnkpIHtcbiAgICAgIHRvRGlyZWN0b3J5ID0gZnJvbURpcmVjdG9yeTtcbiAgICB9XG5cbiAgICBjb25zdCBmcm9tUGF0aCA9IHRoaXMuZ2V0UGF0aChmcm9tRGlyZWN0b3J5LCBmcm9tKTtcbiAgICBjb25zdCB0b1BhdGggPSB0aGlzLmdldFBhdGgodG9EaXJlY3RvcnksIHRvKTtcblxuICAgIC8vIFRlc3QgdGhhdCB0aGUgXCJ0b1wiIGFuZCBcImZyb21cIiBsb2NhdGlvbnMgYXJlIGRpZmZlcmVudFxuICAgIGlmIChmcm9tUGF0aCA9PT0gdG9QYXRoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB1cmk6IHRvUGF0aCxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgaWYgKGlzUGF0aFBhcmVudChmcm9tUGF0aCwgdG9QYXRoKSkge1xuICAgICAgdGhyb3cgRXJyb3IoJ1RvIHBhdGggY2Fubm90IGNvbnRhaW4gdGhlIGZyb20gcGF0aCcpO1xuICAgIH1cblxuICAgIC8vIENoZWNrIHRoZSBzdGF0ZSBvZiB0aGUgXCJ0b1wiIGxvY2F0aW9uXG4gICAgbGV0IHRvT2JqO1xuICAgIHRyeSB7XG4gICAgICB0b09iaiA9IGF3YWl0IHRoaXMuc3RhdCh7XG4gICAgICAgIHBhdGg6IHRvLFxuICAgICAgICBkaXJlY3Rvcnk6IHRvRGlyZWN0b3J5LFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy8gVG8gbG9jYXRpb24gZG9lcyBub3QgZXhpc3QsIGVuc3VyZSB0aGUgZGlyZWN0b3J5IGNvbnRhaW5pbmcgXCJ0b1wiIGxvY2F0aW9uIGV4aXN0cyBhbmQgaXMgYSBkaXJlY3RvcnlcbiAgICAgIGNvbnN0IHRvUGF0aENvbXBvbmVudHMgPSB0by5zcGxpdCgnLycpO1xuICAgICAgdG9QYXRoQ29tcG9uZW50cy5wb3AoKTtcbiAgICAgIGNvbnN0IHRvUGF0aCA9IHRvUGF0aENvbXBvbmVudHMuam9pbignLycpO1xuXG4gICAgICAvLyBDaGVjayB0aGUgY29udGFpbmluZyBkaXJlY3Rvcnkgb2YgdGhlIFwidG9cIiBsb2NhdGlvbiBleGlzdHNcbiAgICAgIGlmICh0b1BhdGhDb21wb25lbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc3QgdG9QYXJlbnREaXJlY3RvcnkgPSBhd2FpdCB0aGlzLnN0YXQoe1xuICAgICAgICAgIHBhdGg6IHRvUGF0aCxcbiAgICAgICAgICBkaXJlY3Rvcnk6IHRvRGlyZWN0b3J5LFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodG9QYXJlbnREaXJlY3RvcnkudHlwZSAhPT0gJ2RpcmVjdG9yeScpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BhcmVudCBkaXJlY3Rvcnkgb2YgdGhlIHRvIHBhdGggaXMgYSBmaWxlJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBDYW5ub3Qgb3ZlcndyaXRlIGEgZGlyZWN0b3J5XG4gICAgaWYgKHRvT2JqICYmIHRvT2JqLnR5cGUgPT09ICdkaXJlY3RvcnknKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBvdmVyd3JpdGUgYSBkaXJlY3Rvcnkgd2l0aCBhIGZpbGUnKTtcbiAgICB9XG5cbiAgICAvLyBFbnN1cmUgdGhlIFwiZnJvbVwiIG9iamVjdCBleGlzdHNcbiAgICBjb25zdCBmcm9tT2JqID0gYXdhaXQgdGhpcy5zdGF0KHtcbiAgICAgIHBhdGg6IGZyb20sXG4gICAgICBkaXJlY3Rvcnk6IGZyb21EaXJlY3RvcnksXG4gICAgfSk7XG5cbiAgICAvLyBTZXQgdGhlIG10aW1lL2N0aW1lIG9mIHRoZSBzdXBwbGllZCBwYXRoXG4gICAgY29uc3QgdXBkYXRlVGltZSA9IGFzeW5jIChwYXRoOiBzdHJpbmcsIGN0aW1lOiBudW1iZXIsIG10aW1lOiBudW1iZXIpID0+IHtcbiAgICAgIGNvbnN0IGZ1bGxQYXRoOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgodG9EaXJlY3RvcnksIHBhdGgpO1xuICAgICAgY29uc3QgZW50cnkgPSAoYXdhaXQgdGhpcy5kYlJlcXVlc3QoJ2dldCcsIFtmdWxsUGF0aF0pKSBhcyBFbnRyeU9iajtcbiAgICAgIGVudHJ5LmN0aW1lID0gY3RpbWU7XG4gICAgICBlbnRyeS5tdGltZSA9IG10aW1lO1xuICAgICAgYXdhaXQgdGhpcy5kYlJlcXVlc3QoJ3B1dCcsIFtlbnRyeV0pO1xuICAgIH07XG5cbiAgICBjb25zdCBjdGltZSA9IGZyb21PYmouY3RpbWUgPyBmcm9tT2JqLmN0aW1lIDogRGF0ZS5ub3coKTtcblxuICAgIHN3aXRjaCAoZnJvbU9iai50eXBlKSB7XG4gICAgICAvLyBUaGUgXCJmcm9tXCIgb2JqZWN0IGlzIGEgZmlsZVxuICAgICAgY2FzZSAnZmlsZSc6IHtcbiAgICAgICAgLy8gUmVhZCB0aGUgZmlsZVxuICAgICAgICBjb25zdCBmaWxlID0gYXdhaXQgdGhpcy5yZWFkRmlsZSh7XG4gICAgICAgICAgcGF0aDogZnJvbSxcbiAgICAgICAgICBkaXJlY3Rvcnk6IGZyb21EaXJlY3RvcnksXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIE9wdGlvbmFsbHkgcmVtb3ZlIHRoZSBmaWxlXG4gICAgICAgIGlmIChkb1JlbmFtZSkge1xuICAgICAgICAgIGF3YWl0IHRoaXMuZGVsZXRlRmlsZSh7XG4gICAgICAgICAgICBwYXRoOiBmcm9tLFxuICAgICAgICAgICAgZGlyZWN0b3J5OiBmcm9tRGlyZWN0b3J5LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGVuY29kaW5nO1xuICAgICAgICBpZiAoIShmaWxlLmRhdGEgaW5zdGFuY2VvZiBCbG9iKSAmJiAhdGhpcy5pc0Jhc2U2NFN0cmluZyhmaWxlLmRhdGEpKSB7XG4gICAgICAgICAgZW5jb2RpbmcgPSBFbmNvZGluZy5VVEY4O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gV3JpdGUgdGhlIGZpbGUgdG8gdGhlIG5ldyBsb2NhdGlvblxuICAgICAgICBjb25zdCB3cml0ZVJlc3VsdCA9IGF3YWl0IHRoaXMud3JpdGVGaWxlKHtcbiAgICAgICAgICBwYXRoOiB0byxcbiAgICAgICAgICBkaXJlY3Rvcnk6IHRvRGlyZWN0b3J5LFxuICAgICAgICAgIGRhdGE6IGZpbGUuZGF0YSxcbiAgICAgICAgICBlbmNvZGluZzogZW5jb2RpbmcsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIENvcHkgdGhlIG10aW1lL2N0aW1lIG9mIGEgcmVuYW1lZCBmaWxlXG4gICAgICAgIGlmIChkb1JlbmFtZSkge1xuICAgICAgICAgIGF3YWl0IHVwZGF0ZVRpbWUodG8sIGN0aW1lLCBmcm9tT2JqLm10aW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJlc29sdmUgcHJvbWlzZVxuICAgICAgICByZXR1cm4gd3JpdGVSZXN1bHQ7XG4gICAgICB9XG4gICAgICBjYXNlICdkaXJlY3RvcnknOiB7XG4gICAgICAgIGlmICh0b09iaikge1xuICAgICAgICAgIHRocm93IEVycm9yKCdDYW5ub3QgbW92ZSBhIGRpcmVjdG9yeSBvdmVyIGFuIGV4aXN0aW5nIG9iamVjdCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAvLyBDcmVhdGUgdGhlIHRvIGRpcmVjdG9yeVxuICAgICAgICAgIGF3YWl0IHRoaXMubWtkaXIoe1xuICAgICAgICAgICAgcGF0aDogdG8sXG4gICAgICAgICAgICBkaXJlY3Rvcnk6IHRvRGlyZWN0b3J5LFxuICAgICAgICAgICAgcmVjdXJzaXZlOiBmYWxzZSxcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIC8vIENvcHkgdGhlIG10aW1lL2N0aW1lIG9mIGEgcmVuYW1lZCBkaXJlY3RvcnlcbiAgICAgICAgICBpZiAoZG9SZW5hbWUpIHtcbiAgICAgICAgICAgIGF3YWl0IHVwZGF0ZVRpbWUodG8sIGN0aW1lLCBmcm9tT2JqLm10aW1lKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAvLyBpZ25vcmVcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEl0ZXJhdGUgb3ZlciB0aGUgY29udGVudHMgb2YgdGhlIGZyb20gbG9jYXRpb25cbiAgICAgICAgY29uc3QgY29udGVudHMgPSAoXG4gICAgICAgICAgYXdhaXQgdGhpcy5yZWFkZGlyKHtcbiAgICAgICAgICAgIHBhdGg6IGZyb20sXG4gICAgICAgICAgICBkaXJlY3Rvcnk6IGZyb21EaXJlY3RvcnksXG4gICAgICAgICAgfSlcbiAgICAgICAgKS5maWxlcztcblxuICAgICAgICBmb3IgKGNvbnN0IGZpbGVuYW1lIG9mIGNvbnRlbnRzKSB7XG4gICAgICAgICAgLy8gTW92ZSBpdGVtIGZyb20gdGhlIGZyb20gZGlyZWN0b3J5IHRvIHRoZSB0byBkaXJlY3RvcnlcbiAgICAgICAgICBhd2FpdCB0aGlzLl9jb3B5KFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBmcm9tOiBgJHtmcm9tfS8ke2ZpbGVuYW1lLm5hbWV9YCxcbiAgICAgICAgICAgICAgdG86IGAke3RvfS8ke2ZpbGVuYW1lLm5hbWV9YCxcbiAgICAgICAgICAgICAgZGlyZWN0b3J5OiBmcm9tRGlyZWN0b3J5LFxuICAgICAgICAgICAgICB0b0RpcmVjdG9yeSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkb1JlbmFtZSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gT3B0aW9uYWxseSByZW1vdmUgdGhlIG9yaWdpbmFsIGZyb20gZGlyZWN0b3J5XG4gICAgICAgIGlmIChkb1JlbmFtZSkge1xuICAgICAgICAgIGF3YWl0IHRoaXMucm1kaXIoe1xuICAgICAgICAgICAgcGF0aDogZnJvbSxcbiAgICAgICAgICAgIGRpcmVjdG9yeTogZnJvbURpcmVjdG9yeSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgdXJpOiB0b1BhdGgsXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGdW5jdGlvbiB0aGF0IHBlcmZvcm1zIGEgaHR0cCByZXF1ZXN0IHRvIGEgc2VydmVyIGFuZCBkb3dubG9hZHMgdGhlIGZpbGUgdG8gdGhlIHNwZWNpZmllZCBkZXN0aW5hdGlvblxuICAgKlxuICAgKiBAZGVwcmVjYXRlZCBVc2UgdGhlIEBjYXBhY2l0b3IvZmlsZS10cmFuc2ZlciBwbHVnaW4gaW5zdGVhZC5cbiAgICogQHBhcmFtIG9wdGlvbnMgdGhlIG9wdGlvbnMgZm9yIHRoZSBkb3dubG9hZCBvcGVyYXRpb25cbiAgICogQHJldHVybnMgYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgZG93bmxvYWQgZmlsZSByZXN1bHRcbiAgICovXG4gIHB1YmxpYyBkb3dubG9hZEZpbGUgPSBhc3luYyAob3B0aW9uczogRG93bmxvYWRGaWxlT3B0aW9ucyk6IFByb21pc2U8RG93bmxvYWRGaWxlUmVzdWx0PiA9PiB7XG4gICAgY29uc3QgcmVxdWVzdEluaXQgPSBidWlsZFJlcXVlc3RJbml0KG9wdGlvbnMsIG9wdGlvbnMud2ViRmV0Y2hFeHRyYSk7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChvcHRpb25zLnVybCwgcmVxdWVzdEluaXQpO1xuICAgIGxldCBibG9iOiBCbG9iO1xuXG4gICAgaWYgKCFvcHRpb25zLnByb2dyZXNzKSBibG9iID0gYXdhaXQgcmVzcG9uc2UuYmxvYigpO1xuICAgIGVsc2UgaWYgKCFyZXNwb25zZT8uYm9keSkgYmxvYiA9IG5ldyBCbG9iKCk7XG4gICAgZWxzZSB7XG4gICAgICBjb25zdCByZWFkZXIgPSByZXNwb25zZS5ib2R5LmdldFJlYWRlcigpO1xuXG4gICAgICBsZXQgYnl0ZXMgPSAwO1xuICAgICAgY29uc3QgY2h1bmtzOiAoVWludDhBcnJheSB8IHVuZGVmaW5lZClbXSA9IFtdO1xuXG4gICAgICBjb25zdCBjb250ZW50VHlwZTogc3RyaW5nIHwgbnVsbCA9IHJlc3BvbnNlLmhlYWRlcnMuZ2V0KCdjb250ZW50LXR5cGUnKTtcbiAgICAgIGNvbnN0IGNvbnRlbnRMZW5ndGg6IG51bWJlciA9IHBhcnNlSW50KHJlc3BvbnNlLmhlYWRlcnMuZ2V0KCdjb250ZW50LWxlbmd0aCcpIHx8ICcwJywgMTApO1xuXG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICBjb25zdCB7IGRvbmUsIHZhbHVlIH0gPSBhd2FpdCByZWFkZXIucmVhZCgpO1xuXG4gICAgICAgIGlmIChkb25lKSBicmVhaztcblxuICAgICAgICBjaHVua3MucHVzaCh2YWx1ZSk7XG4gICAgICAgIGJ5dGVzICs9IHZhbHVlPy5sZW5ndGggfHwgMDtcblxuICAgICAgICBjb25zdCBzdGF0dXM6IFByb2dyZXNzU3RhdHVzID0ge1xuICAgICAgICAgIHVybDogb3B0aW9ucy51cmwsXG4gICAgICAgICAgYnl0ZXMsXG4gICAgICAgICAgY29udGVudExlbmd0aCxcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLm5vdGlmeUxpc3RlbmVycygncHJvZ3Jlc3MnLCBzdGF0dXMpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBhbGxDaHVua3MgPSBuZXcgVWludDhBcnJheShieXRlcyk7XG4gICAgICBsZXQgcG9zaXRpb24gPSAwO1xuICAgICAgZm9yIChjb25zdCBjaHVuayBvZiBjaHVua3MpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBjaHVuayA9PT0gJ3VuZGVmaW5lZCcpIGNvbnRpbnVlO1xuXG4gICAgICAgIGFsbENodW5rcy5zZXQoY2h1bmssIHBvc2l0aW9uKTtcbiAgICAgICAgcG9zaXRpb24gKz0gY2h1bmsubGVuZ3RoO1xuICAgICAgfVxuXG4gICAgICBibG9iID0gbmV3IEJsb2IoW2FsbENodW5rcy5idWZmZXJdLCB7IHR5cGU6IGNvbnRlbnRUeXBlIHx8IHVuZGVmaW5lZCB9KTtcbiAgICB9XG5cbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLndyaXRlRmlsZSh7XG4gICAgICBwYXRoOiBvcHRpb25zLnBhdGgsXG4gICAgICBkaXJlY3Rvcnk6IG9wdGlvbnMuZGlyZWN0b3J5ID8/IHVuZGVmaW5lZCxcbiAgICAgIHJlY3Vyc2l2ZTogb3B0aW9ucy5yZWN1cnNpdmUgPz8gZmFsc2UsXG4gICAgICBkYXRhOiBibG9iLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHsgcGF0aDogcmVzdWx0LnVyaSwgYmxvYiB9O1xuICB9O1xuXG4gIHByaXZhdGUgaXNCYXNlNjRTdHJpbmcoc3RyOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGJ0b2EoYXRvYihzdHIpKSA9PSBzdHI7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG59XG5cbmludGVyZmFjZSBFbnRyeU9iaiB7XG4gIHBhdGg6IHN0cmluZztcbiAgZm9sZGVyOiBzdHJpbmc7XG4gIHR5cGU6ICdkaXJlY3RvcnknIHwgJ2ZpbGUnO1xuICBzaXplOiBudW1iZXI7XG4gIGN0aW1lOiBudW1iZXI7XG4gIG10aW1lOiBudW1iZXI7XG4gIHVyaT86IHN0cmluZztcbiAgY29udGVudD86IHN0cmluZyB8IEJsb2I7XG59XG4iLCAiaW1wb3J0IHsgV2ViUGx1Z2luIH0gZnJvbSAnQGNhcGFjaXRvci9jb3JlJztcblxuaW1wb3J0IHR5cGUgeyBCcm93c2VyUGx1Z2luLCBPcGVuT3B0aW9ucyB9IGZyb20gJy4vZGVmaW5pdGlvbnMnO1xuXG5leHBvcnQgY2xhc3MgQnJvd3NlcldlYiBleHRlbmRzIFdlYlBsdWdpbiBpbXBsZW1lbnRzIEJyb3dzZXJQbHVnaW4ge1xuICBfbGFzdFdpbmRvdzogV2luZG93IHwgbnVsbDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX2xhc3RXaW5kb3cgPSBudWxsO1xuICB9XG5cbiAgYXN5bmMgb3BlbihvcHRpb25zOiBPcGVuT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRoaXMuX2xhc3RXaW5kb3cgPSB3aW5kb3cub3BlbihvcHRpb25zLnVybCwgb3B0aW9ucy53aW5kb3dOYW1lIHx8ICdfYmxhbmsnKTtcbiAgfVxuXG4gIGFzeW5jIGNsb3NlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBpZiAodGhpcy5fbGFzdFdpbmRvdyAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuX2xhc3RXaW5kb3cuY2xvc2UoKTtcbiAgICAgICAgdGhpcy5fbGFzdFdpbmRvdyA9IG51bGw7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlamVjdCgnTm8gYWN0aXZlIHdpbmRvdyB0byBjbG9zZSEnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5jb25zdCBCcm93c2VyID0gbmV3IEJyb3dzZXJXZWIoKTtcblxuZXhwb3J0IHsgQnJvd3NlciB9O1xuIiwgImltcG9ydCB7IFdlYlBsdWdpbiB9IGZyb20gJ0BjYXBhY2l0b3IvY29yZSc7XG5pbXBvcnQgdHlwZSB7IENhcGFjaXRvckV4Y2VwdGlvbiB9IGZyb20gJ0BjYXBhY2l0b3IvY29yZSc7XG5cbmltcG9ydCB0eXBlIHsgQ2FwYWNpdG9yTm9kZUpTUGx1Z2luIH0gZnJvbSAnLi9pbXBsZW1lbnRhdGlvbic7XG5cbmV4cG9ydCBjbGFzcyBDYXBhY2l0b3JOb2RlSlNXZWIgZXh0ZW5kcyBXZWJQbHVnaW4gaW1wbGVtZW50cyBDYXBhY2l0b3JOb2RlSlNQbHVnaW4ge1xuICBwcm90ZWN0ZWQgdW5hdmFpbGFibGVOb2RlSlMoKTogQ2FwYWNpdG9yRXhjZXB0aW9uIHtcbiAgICByZXR1cm4gdGhpcy51bmF2YWlsYWJsZSgnVGhlIE5vZGVKUyBlbmdpbmUgaXMgbm90IGF2YWlsYWJsZSBpbiB0aGUgYnJvd3NlciEnKTtcbiAgfVxuXG4gIHN0YXJ0KCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRocm93IHRoaXMudW5hdmFpbGFibGVOb2RlSlMoKTtcbiAgfVxuXG4gIHNlbmQoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhyb3cgdGhpcy51bmF2YWlsYWJsZU5vZGVKUygpO1xuICB9XG5cbiAgd2hlblJlYWR5KCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRocm93IHRoaXMudW5hdmFpbGFibGVOb2RlSlMoKTtcbiAgfVxufVxuIiwgImltcG9ydCB7IElQbGF0Zm9ybSwgRmlsZVN0YXQgfSBmcm9tIFwiLi9JUGxhdGZvcm1cIjtcbmltcG9ydCB7IHJlYWRGaWxlLCB3cml0ZUZpbGUsIHJlYWRkaXIsIHVubGluaywgbWtkaXIsIHN0YXQgfSBmcm9tIFwiZnMvcHJvbWlzZXNcIjtcbmltcG9ydCB7IGV4aXN0c1N5bmMgfSBmcm9tIFwiZnNcIjsgLy8gZXhpc3RzIGlzIGRlcHJlY2F0ZWQgaW4gZnMvcHJvbWlzZXNcbmltcG9ydCB7IHNoZWxsIH0gZnJvbSBcImVsZWN0cm9uXCI7XG5pbXBvcnQgeyBqb2luIH0gZnJvbSBcInBhdGhcIjtcbmltcG9ydCB7IGhvbWVkaXIgfSBmcm9tIFwib3NcIjtcblxuZXhwb3J0IGNsYXNzIEVsZWN0cm9uUGxhdGZvcm0gaW1wbGVtZW50cyBJUGxhdGZvcm0ge1xuICAgIGlkOiBcImVsZWN0cm9uXCIgPSBcImVsZWN0cm9uXCI7XG5cbiAgICBwcml2YXRlIGJhc2VEYXRhUGF0aDogc3RyaW5nO1xuICAgIHByaXZhdGUgZW5oYW5jZWRQYXRoOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSB0aGVtZXNQYXRoOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBwbHVnaW5zUGF0aDogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuYmFzZURhdGFQYXRoID0gcHJvY2Vzcy5wbGF0Zm9ybSA9PT0gXCJ3aW4zMlwiXG4gICAgICAgICAgICA/IHByb2Nlc3MuZW52LkFQUERBVEEgfHwgam9pbihob21lZGlyKCksIFwiQXBwRGF0YVwiLCBcIlJvYW1pbmdcIilcbiAgICAgICAgICAgIDogcHJvY2Vzcy5wbGF0Zm9ybSA9PT0gXCJkYXJ3aW5cIlxuICAgICAgICAgICAgICAgID8gam9pbihob21lZGlyKCksIFwiTGlicmFyeVwiLCBcIkFwcGxpY2F0aW9uIFN1cHBvcnRcIilcbiAgICAgICAgICAgICAgICA6IGpvaW4oaG9tZWRpcigpLCBcIi5jb25maWdcIik7XG5cbiAgICAgICAgdGhpcy5lbmhhbmNlZFBhdGggPSBqb2luKHRoaXMuYmFzZURhdGFQYXRoLCBcInN0cmVtaW8tZW5oYW5jZWRcIik7XG4gICAgICAgIHRoaXMudGhlbWVzUGF0aCA9IGpvaW4odGhpcy5lbmhhbmNlZFBhdGgsIFwidGhlbWVzXCIpO1xuICAgICAgICB0aGlzLnBsdWdpbnNQYXRoID0gam9pbih0aGlzLmVuaGFuY2VkUGF0aCwgXCJwbHVnaW5zXCIpO1xuICAgIH1cblxuICAgIGFzeW5jIHJlYWRGaWxlKHBhdGg6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIHJldHVybiByZWFkRmlsZShwYXRoLCBcInV0Zi04XCIpO1xuICAgIH1cblxuICAgIGFzeW5jIHdyaXRlRmlsZShwYXRoOiBzdHJpbmcsIGNvbnRlbnQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICByZXR1cm4gd3JpdGVGaWxlKHBhdGgsIGNvbnRlbnQsIFwidXRmLThcIik7XG4gICAgfVxuXG4gICAgYXN5bmMgcmVhZGRpcihwYXRoOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZ1tdPiB7XG4gICAgICAgIHJldHVybiByZWFkZGlyKHBhdGgpO1xuICAgIH1cblxuICAgIGFzeW5jIGV4aXN0cyhwYXRoOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgcmV0dXJuIGV4aXN0c1N5bmMocGF0aCk7XG4gICAgfVxuXG4gICAgYXN5bmMgdW5saW5rKHBhdGg6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICByZXR1cm4gdW5saW5rKHBhdGgpO1xuICAgIH1cblxuICAgIGFzeW5jIG1rZGlyKHBhdGg6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICByZXR1cm4gbWtkaXIocGF0aCwgeyByZWN1cnNpdmU6IHRydWUgfSkudGhlbigoKSA9PiB7fSk7XG4gICAgfVxuXG4gICAgYXN5bmMgc3RhdChwYXRoOiBzdHJpbmcpOiBQcm9taXNlPEZpbGVTdGF0PiB7XG4gICAgICAgIGNvbnN0IHN0YXRzID0gYXdhaXQgc3RhdChwYXRoKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlzRmlsZTogc3RhdHMuaXNGaWxlKCksXG4gICAgICAgICAgICBpc0RpcmVjdG9yeTogc3RhdHMuaXNEaXJlY3RvcnkoKVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGFzeW5jIG9wZW5QYXRoKHBhdGg6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBhd2FpdCBzaGVsbC5vcGVuUGF0aChwYXRoKTtcbiAgICB9XG5cbiAgICBhc3luYyBvcGVuRXh0ZXJuYWwodXJsOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgYXdhaXQgc2hlbGwub3BlbkV4dGVybmFsKHVybCk7XG4gICAgfVxuXG4gICAgaXNQaWN0dXJlSW5QaWN0dXJlU3VwcG9ydGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgYXN5bmMgZW50ZXJQaWN0dXJlSW5QaWN0dXJlKF93aWR0aD86IG51bWJlciwgX2hlaWdodD86IG51bWJlcik6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgYXN5bmMgc2V0UGljdHVyZUluUGljdHVyZVN0YXRlKF9lbmFibGVkOiBib29sZWFuLCBfd2lkdGg/OiBudW1iZXIsIF9oZWlnaHQ/OiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGdldFRoZW1lc1BhdGgoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGhlbWVzUGF0aDtcbiAgICB9XG5cbiAgICBnZXRQbHVnaW5zUGF0aCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5wbHVnaW5zUGF0aDtcbiAgICB9XG5cbiAgICBnZXRFbmhhbmNlZFBhdGgoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW5oYW5jZWRQYXRoO1xuICAgIH1cblxuICAgIGFzeW5jIGluaXQoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIC8vIEVuc3VyZSBkaXJlY3RvcmllcyBleGlzdFxuICAgICAgICBpZiAoIWF3YWl0IHRoaXMuZXhpc3RzKHRoaXMuZW5oYW5jZWRQYXRoKSkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5ta2Rpcih0aGlzLmVuaGFuY2VkUGF0aCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFhd2FpdCB0aGlzLmV4aXN0cyh0aGlzLnRoZW1lc1BhdGgpKSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLm1rZGlyKHRoaXMudGhlbWVzUGF0aCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFhd2FpdCB0aGlzLmV4aXN0cyh0aGlzLnBsdWdpbnNQYXRoKSkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5ta2Rpcih0aGlzLnBsdWdpbnNQYXRoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsICJpbXBvcnQgeyByZWdpc3RlclBsdWdpbiB9IGZyb20gJ0BjYXBhY2l0b3IvY29yZSc7XG5pbXBvcnQgeyBleHBvc2VTeW5hcHNlIH0gZnJvbSAnQGNhcGFjaXRvci9zeW5hcHNlJztcblxuaW1wb3J0IHR5cGUgeyBGaWxlc3lzdGVtUGx1Z2luIH0gZnJvbSAnLi9kZWZpbml0aW9ucyc7XG5cbmNvbnN0IEZpbGVzeXN0ZW0gPSByZWdpc3RlclBsdWdpbjxGaWxlc3lzdGVtUGx1Z2luPignRmlsZXN5c3RlbScsIHtcbiAgd2ViOiAoKSA9PiBpbXBvcnQoJy4vd2ViJykudGhlbigobSkgPT4gbmV3IG0uRmlsZXN5c3RlbVdlYigpKSxcbn0pO1xuXG5leHBvc2VTeW5hcHNlKCk7XG5cbmV4cG9ydCAqIGZyb20gJy4vZGVmaW5pdGlvbnMnO1xuZXhwb3J0IHsgRmlsZXN5c3RlbSB9O1xuIiwgImZ1bmN0aW9uIHModCkge1xuICB0LkNhcGFjaXRvclV0aWxzLlN5bmFwc2UgPSBuZXcgUHJveHkoXG4gICAge30sXG4gICAge1xuICAgICAgZ2V0KGUsIG4pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm94eSh7fSwge1xuICAgICAgICAgIGdldCh3LCBvKSB7XG4gICAgICAgICAgICByZXR1cm4gKGMsIHAsIHIpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgaSA9IHQuQ2FwYWNpdG9yLlBsdWdpbnNbbl07XG4gICAgICAgICAgICAgIGlmIChpID09PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICByKG5ldyBFcnJvcihgQ2FwYWNpdG9yIHBsdWdpbiAke259IG5vdCBmb3VuZGApKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiBpW29dICE9IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgIHIobmV3IEVycm9yKGBNZXRob2QgJHtvfSBub3QgZm91bmQgaW4gQ2FwYWNpdG9yIHBsdWdpbiAke259YCkpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBhID0gYXdhaXQgaVtvXShjKTtcbiAgICAgICAgICAgICAgICAgIHAoYSk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoYSkge1xuICAgICAgICAgICAgICAgICAgcihhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICApO1xufVxuZnVuY3Rpb24gdSh0KSB7XG4gIHQuQ2FwYWNpdG9yVXRpbHMuU3luYXBzZSA9IG5ldyBQcm94eShcbiAgICB7fSxcbiAgICB7XG4gICAgICBnZXQoZSwgbikge1xuICAgICAgICByZXR1cm4gdC5jb3Jkb3ZhLnBsdWdpbnNbbl07XG4gICAgICB9XG4gICAgfVxuICApO1xufVxuZnVuY3Rpb24gZih0ID0gITEpIHtcbiAgdHlwZW9mIHdpbmRvdyA+IFwidVwiIHx8ICh3aW5kb3cuQ2FwYWNpdG9yVXRpbHMgPSB3aW5kb3cuQ2FwYWNpdG9yVXRpbHMgfHwge30sIHdpbmRvdy5DYXBhY2l0b3IgIT09IHZvaWQgMCAmJiAhdCA/IHMod2luZG93KSA6IHdpbmRvdy5jb3Jkb3ZhICE9PSB2b2lkIDAgJiYgdSh3aW5kb3cpKTtcbn1cbmV4cG9ydCB7XG4gIGYgYXMgZXhwb3NlU3luYXBzZVxufTtcbiIsICJpbXBvcnQgeyByZWdpc3RlclBsdWdpbiB9IGZyb20gJ0BjYXBhY2l0b3IvY29yZSc7XG5cbmltcG9ydCB0eXBlIHsgQnJvd3NlclBsdWdpbiB9IGZyb20gJy4vZGVmaW5pdGlvbnMnO1xuXG5jb25zdCBCcm93c2VyID0gcmVnaXN0ZXJQbHVnaW48QnJvd3NlclBsdWdpbj4oJ0Jyb3dzZXInLCB7XG4gIHdlYjogKCkgPT4gaW1wb3J0KCcuL3dlYicpLnRoZW4oKG0pID0+IG5ldyBtLkJyb3dzZXJXZWIoKSksXG59KTtcblxuZXhwb3J0ICogZnJvbSAnLi9kZWZpbml0aW9ucyc7XG5leHBvcnQgeyBCcm93c2VyIH07XG4iLCAiaW1wb3J0IHsgcmVnaXN0ZXJQbHVnaW4gfSBmcm9tICdAY2FwYWNpdG9yL2NvcmUnO1xuXG5pbXBvcnQgdHlwZSB7IEZpbGVQaWNrZXJQbHVnaW4gfSBmcm9tICcuL2RlZmluaXRpb25zJztcbi8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vY2FwYXdlc29tZS10ZWFtL2NhcGFjaXRvci1wbHVnaW5zL2lzc3Vlcy8xNFxuaW1wb3J0ICogYXMgd2ViIGZyb20gJy4vd2ViJztcblxuY29uc3QgRmlsZVBpY2tlciA9IHJlZ2lzdGVyUGx1Z2luPEZpbGVQaWNrZXJQbHVnaW4+KCdGaWxlUGlja2VyJywge1xuICB3ZWI6ICgpID0+IG5ldyB3ZWIuRmlsZVBpY2tlcldlYigpLFxufSk7XG5cbmV4cG9ydCAqIGZyb20gJy4vZGVmaW5pdGlvbnMnO1xuZXhwb3J0IHsgRmlsZVBpY2tlciB9O1xuIiwgImltcG9ydCB7IFdlYlBsdWdpbiB9IGZyb20gJ0BjYXBhY2l0b3IvY29yZSc7XG5cbmltcG9ydCB0eXBlIHtcbiAgQ29udmVydEhlaWNUb0pwZWdPcHRpb25zLFxuICBDb252ZXJ0SGVpY1RvSnBlZ1Jlc3VsdCxcbiAgQ29weUZpbGVPcHRpb25zLFxuICBGaWxlUGlja2VyUGx1Z2luLFxuICBQZXJtaXNzaW9uU3RhdHVzLFxuICBQaWNrRGlyZWN0b3J5UmVzdWx0LFxuICBQaWNrRmlsZXNPcHRpb25zLFxuICBQaWNrRmlsZXNSZXN1bHQsXG4gIFBpY2tJbWFnZXNPcHRpb25zLFxuICBQaWNrSW1hZ2VzUmVzdWx0LFxuICBQaWNrTWVkaWFPcHRpb25zLFxuICBQaWNrTWVkaWFSZXN1bHQsXG4gIFBpY2tWaWRlb3NPcHRpb25zLFxuICBQaWNrVmlkZW9zUmVzdWx0LFxuICBQaWNrZWRGaWxlLFxuICBSZXF1ZXN0UGVybWlzc2lvbnNPcHRpb25zLFxufSBmcm9tICcuL2RlZmluaXRpb25zJztcblxuZXhwb3J0IGNsYXNzIEZpbGVQaWNrZXJXZWIgZXh0ZW5kcyBXZWJQbHVnaW4gaW1wbGVtZW50cyBGaWxlUGlja2VyUGx1Z2luIHtcbiAgcHVibGljIHJlYWRvbmx5IEVSUk9SX1BJQ0tfRklMRV9DQU5DRUxFRCA9ICdwaWNrRmlsZXMgY2FuY2VsZWQuJztcblxuICBwdWJsaWMgYXN5bmMgY2hlY2tQZXJtaXNzaW9ucygpOiBQcm9taXNlPFBlcm1pc3Npb25TdGF0dXM+IHtcbiAgICB0aHJvdyB0aGlzLnVuaW1wbGVtZW50ZWQoJ05vdCBpbXBsZW1lbnRlZCBvbiB3ZWIuJyk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgY29udmVydEhlaWNUb0pwZWcoXG4gICAgX29wdGlvbnM6IENvbnZlcnRIZWljVG9KcGVnT3B0aW9ucyxcbiAgKTogUHJvbWlzZTxDb252ZXJ0SGVpY1RvSnBlZ1Jlc3VsdD4ge1xuICAgIHRocm93IHRoaXMudW5pbXBsZW1lbnRlZCgnTm90IGltcGxlbWVudGVkIG9uIHdlYi4nKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBjb3B5RmlsZShfb3B0aW9uczogQ29weUZpbGVPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhyb3cgdGhpcy51bmltcGxlbWVudGVkKCdOb3QgaW1wbGVtZW50ZWQgb24gd2ViLicpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHBpY2tGaWxlcyhvcHRpb25zPzogUGlja0ZpbGVzT3B0aW9ucyk6IFByb21pc2U8UGlja0ZpbGVzUmVzdWx0PiB7XG4gICAgY29uc3QgcGlja2VkRmlsZXMgPSBhd2FpdCB0aGlzLm9wZW5GaWxlUGlja2VyKG9wdGlvbnMpO1xuICAgIGlmICghcGlja2VkRmlsZXMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcih0aGlzLkVSUk9SX1BJQ0tfRklMRV9DQU5DRUxFRCk7XG4gICAgfVxuICAgIGNvbnN0IHJlc3VsdDogUGlja0ZpbGVzUmVzdWx0ID0ge1xuICAgICAgZmlsZXM6IFtdLFxuICAgIH07XG4gICAgZm9yIChjb25zdCBwaWNrZWRGaWxlIG9mIHBpY2tlZEZpbGVzKSB7XG4gICAgICBjb25zdCBmaWxlOiBQaWNrZWRGaWxlID0ge1xuICAgICAgICBibG9iOiBwaWNrZWRGaWxlLFxuICAgICAgICBtb2RpZmllZEF0OiBwaWNrZWRGaWxlLmxhc3RNb2RpZmllZCxcbiAgICAgICAgbWltZVR5cGU6IHRoaXMuZ2V0TWltZVR5cGVGcm9tVXJsKHBpY2tlZEZpbGUpLFxuICAgICAgICBuYW1lOiB0aGlzLmdldE5hbWVGcm9tVXJsKHBpY2tlZEZpbGUpLFxuICAgICAgICBwYXRoOiB1bmRlZmluZWQsXG4gICAgICAgIHNpemU6IHRoaXMuZ2V0U2l6ZUZyb21VcmwocGlja2VkRmlsZSksXG4gICAgICB9O1xuICAgICAgaWYgKG9wdGlvbnM/LnJlYWREYXRhKSB7XG4gICAgICAgIGZpbGUuZGF0YSA9IGF3YWl0IHRoaXMuZ2V0RGF0YUZyb21GaWxlKHBpY2tlZEZpbGUpO1xuICAgICAgfVxuICAgICAgcmVzdWx0LmZpbGVzLnB1c2goZmlsZSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcGlja0RpcmVjdG9yeSgpOiBQcm9taXNlPFBpY2tEaXJlY3RvcnlSZXN1bHQ+IHtcbiAgICB0aHJvdyB0aGlzLnVuaW1wbGVtZW50ZWQoJ05vdCBpbXBsZW1lbnRlZCBvbiB3ZWIuJyk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcGlja0ltYWdlcyhcbiAgICBvcHRpb25zPzogUGlja0ltYWdlc09wdGlvbnMsXG4gICk6IFByb21pc2U8UGlja0ltYWdlc1Jlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnBpY2tGaWxlcyh7IHR5cGVzOiBbJ2ltYWdlLyonXSwgLi4ub3B0aW9ucyB9KTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBwaWNrTWVkaWEob3B0aW9ucz86IFBpY2tNZWRpYU9wdGlvbnMpOiBQcm9taXNlPFBpY2tNZWRpYVJlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnBpY2tGaWxlcyh7IHR5cGVzOiBbJ2ltYWdlLyonLCAndmlkZW8vKiddLCAuLi5vcHRpb25zIH0pO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHBpY2tWaWRlb3MoXG4gICAgb3B0aW9ucz86IFBpY2tWaWRlb3NPcHRpb25zLFxuICApOiBQcm9taXNlPFBpY2tWaWRlb3NSZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5waWNrRmlsZXMoeyB0eXBlczogWyd2aWRlby8qJ10sIC4uLm9wdGlvbnMgfSk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcmVxdWVzdFBlcm1pc3Npb25zKFxuICAgIF9vcHRpb25zPzogUmVxdWVzdFBlcm1pc3Npb25zT3B0aW9ucyxcbiAgKTogUHJvbWlzZTxQZXJtaXNzaW9uU3RhdHVzPiB7XG4gICAgdGhyb3cgdGhpcy51bmltcGxlbWVudGVkKCdOb3QgaW1wbGVtZW50ZWQgb24gd2ViLicpO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBvcGVuRmlsZVBpY2tlcihcbiAgICBvcHRpb25zPzogUGlja0ZpbGVzT3B0aW9ucyxcbiAgKTogUHJvbWlzZTxGaWxlW10gfCB1bmRlZmluZWQ+IHtcbiAgICBjb25zdCBhY2NlcHQgPSBvcHRpb25zPy50eXBlcz8uam9pbignLCcpIHx8ICcnO1xuICAgIGNvbnN0IGxpbWl0ID0gb3B0aW9ucz8ubGltaXQgPT09IHVuZGVmaW5lZCA/IDAgOiBvcHRpb25zLmxpbWl0O1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIGxldCBvbkNoYW5nZUZpcmVkID0gZmFsc2U7XG4gICAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICBpbnB1dC50eXBlID0gJ2ZpbGUnO1xuICAgICAgaW5wdXQuYWNjZXB0ID0gYWNjZXB0O1xuICAgICAgaW5wdXQubXVsdGlwbGUgPSBsaW1pdCA9PT0gMDtcblxuICAgICAgY29uc3QgaGFzQ2FuY2VsRXZlbnQgPSAnb25jYW5jZWwnIGluIGlucHV0O1xuXG4gICAgICBjb25zdCBvbkNoYW5nZUhhbmRsZXIgPSAoKSA9PiB7XG4gICAgICAgIG9uQ2hhbmdlRmlyZWQgPSB0cnVlO1xuICAgICAgICByZW1vdmVBbGxMaXN0ZW5lcnMoKTtcblxuICAgICAgICBjb25zdCBmaWxlcyA9IEFycmF5LmZyb20oaW5wdXQuZmlsZXMgfHwgW10pO1xuICAgICAgICByZXNvbHZlKGZpbGVzKTtcbiAgICAgIH07XG4gICAgICBjb25zdCBvbkNhbmNlbEhhbmRsZXIgPSAoKSA9PiB7XG4gICAgICAgIHJlbW92ZUFsbExpc3RlbmVycygpO1xuICAgICAgICByZXNvbHZlKHVuZGVmaW5lZCk7XG4gICAgICB9O1xuICAgICAgY29uc3Qgb25Gb2N1c0hhbmRsZXIgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgIGF3YWl0IHRoaXMud2FpdCg1MDApO1xuICAgICAgICBpZiAob25DaGFuZ2VGaXJlZCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICByZW1vdmVBbGxMaXN0ZW5lcnMoKTtcbiAgICAgICAgcmVzb2x2ZSh1bmRlZmluZWQpO1xuICAgICAgfTtcbiAgICAgIGNvbnN0IHJlbW92ZUFsbExpc3RlbmVycyA9ICgpID0+IHtcbiAgICAgICAgaW5wdXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgb25DaGFuZ2VIYW5kbGVyKTtcbiAgICAgICAgaWYgKGhhc0NhbmNlbEV2ZW50KSB7XG4gICAgICAgICAgaW5wdXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2FuY2VsJywgb25DYW5jZWxIYW5kbGVyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXMnLCBvbkZvY3VzSGFuZGxlcik7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIG9uQ2hhbmdlSGFuZGxlciwgeyBvbmNlOiB0cnVlIH0pO1xuICAgICAgaWYgKGhhc0NhbmNlbEV2ZW50KSB7XG4gICAgICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NhbmNlbCcsIG9uQ2FuY2VsSGFuZGxlciwgeyBvbmNlOiB0cnVlIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gV29ya2Fyb3VuZCB0byBkZXRlY3Qgd2hlbiBDYW5jZWwgaXMgc2VsZWN0ZWQgaW4gdGhlIEZpbGUgU2VsZWN0aW9uIGRpYWxvZyBib3guXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIG9uRm9jdXNIYW5kbGVyLCB7IG9uY2U6IHRydWUgfSk7XG4gICAgICB9XG4gICAgICBpbnB1dC5jbGljaygpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBnZXREYXRhRnJvbUZpbGUoZmlsZTogRmlsZSk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTtcbiAgICAgIHJlYWRlci5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHR5cGVvZiByZWFkZXIucmVzdWx0ID09PSAnc3RyaW5nJyA/IHJlYWRlci5yZXN1bHQgOiAnJztcbiAgICAgICAgY29uc3Qgc3BsaXR0ZWRSZXN1bHQgPSByZXN1bHQuc3BsaXQoJ2Jhc2U2NCwnKTtcbiAgICAgICAgY29uc3QgYmFzZTY0ID0gc3BsaXR0ZWRSZXN1bHRbMV0gfHwgJyc7XG4gICAgICAgIHJlc29sdmUoYmFzZTY0KTtcbiAgICAgIH07XG4gICAgICByZWFkZXIub25lcnJvciA9IGVycm9yID0+IHtcbiAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGdldE5hbWVGcm9tVXJsKGZpbGU6IEZpbGUpOiBzdHJpbmcge1xuICAgIHJldHVybiBmaWxlLm5hbWU7XG4gIH1cblxuICBwcml2YXRlIGdldE1pbWVUeXBlRnJvbVVybChmaWxlOiBGaWxlKTogc3RyaW5nIHtcbiAgICByZXR1cm4gZmlsZS50eXBlO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRTaXplRnJvbVVybChmaWxlOiBGaWxlKTogbnVtYmVyIHtcbiAgICByZXR1cm4gZmlsZS5zaXplO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyB3YWl0KGRlbGF5TXM6IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgZGVsYXlNcykpO1xuICB9XG59XG4iLCAiaW1wb3J0IHsgSVBsYXRmb3JtLCBGaWxlU3RhdCB9IGZyb20gXCIuL0lQbGF0Zm9ybVwiO1xuaW1wb3J0IHsgRmlsZXN5c3RlbSwgRGlyZWN0b3J5LCBFbmNvZGluZyB9IGZyb20gXCJAY2FwYWNpdG9yL2ZpbGVzeXN0ZW1cIjtcbmltcG9ydCB7IEJyb3dzZXIgfSBmcm9tIFwiQGNhcGFjaXRvci9icm93c2VyXCI7XG5pbXBvcnQgeyBGaWxlUGlja2VyIH0gZnJvbSBcIkBjYXBhd2Vzb21lL2NhcGFjaXRvci1maWxlLXBpY2tlclwiO1xuXG5pbnRlcmZhY2UgQW5kcm9pZEJyaWRnZSB7XG4gICAgb3BlblBhdGgocGF0aDogc3RyaW5nKTogdm9pZDtcbiAgICBpc1BpY3R1cmVJblBpY3R1cmVTdXBwb3J0ZWQoKTogYm9vbGVhbjtcbiAgICBlbnRlclBpY3R1cmVJblBpY3R1cmUod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpOiBib29sZWFuO1xuICAgIHNldFBpY3R1cmVJblBpY3R1cmVTdGF0ZShlbmFibGVkOiBib29sZWFuLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcik6IHZvaWQ7XG59XG5cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgICBpbnRlcmZhY2UgV2luZG93IHtcbiAgICAgICAgU3RyZW1pb0VuaGFuY2VkQW5kcm9pZD86IEFuZHJvaWRCcmlkZ2U7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ2FwYWNpdG9yUGxhdGZvcm0gaW1wbGVtZW50cyBJUGxhdGZvcm0ge1xuICAgIGlkOiBcImNhcGFjaXRvclwiID0gXCJjYXBhY2l0b3JcIjtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGVuaGFuY2VkUGF0aCA9IFwiU3RyZW1pbyBFbmhhbmNlZFwiO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgdGhlbWVzUGF0aCA9IGAke3RoaXMuZW5oYW5jZWRQYXRofS90aGVtZXNgO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgcGx1Z2luc1BhdGggPSBgJHt0aGlzLmVuaGFuY2VkUGF0aH0vcGx1Z2luc2A7XG5cbiAgICBwcml2YXRlIGlzRXh0ZXJuYWxQYXRoKHBhdGg6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gcGF0aC5zdGFydHNXaXRoKFwiZmlsZTovL1wiKSB8fCBwYXRoLnN0YXJ0c1dpdGgoXCJjb250ZW50Oi8vXCIpIHx8IHBhdGguc3RhcnRzV2l0aChcIi9cIik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXREaXJlY3RvcnkocGF0aDogc3RyaW5nKTogRGlyZWN0b3J5IHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNFeHRlcm5hbFBhdGgocGF0aCkgPyB1bmRlZmluZWQgOiBEaXJlY3RvcnkuRG9jdW1lbnRzO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0RmlsZU9wdGlvbnMocGF0aDogc3RyaW5nLCBlbmNvZGluZz86IEVuY29kaW5nKToge1xuICAgICAgICBwYXRoOiBzdHJpbmc7XG4gICAgICAgIGRpcmVjdG9yeT86IERpcmVjdG9yeTtcbiAgICAgICAgZW5jb2Rpbmc/OiBFbmNvZGluZztcbiAgICB9IHtcbiAgICAgICAgY29uc3Qgb3B0aW9uczoge1xuICAgICAgICAgICAgcGF0aDogc3RyaW5nO1xuICAgICAgICAgICAgZGlyZWN0b3J5PzogRGlyZWN0b3J5O1xuICAgICAgICAgICAgZW5jb2Rpbmc/OiBFbmNvZGluZztcbiAgICAgICAgfSA9IHsgcGF0aCB9O1xuXG4gICAgICAgIGNvbnN0IGRpcmVjdG9yeSA9IHRoaXMuZ2V0RGlyZWN0b3J5KHBhdGgpO1xuICAgICAgICBpZiAoZGlyZWN0b3J5KSB7XG4gICAgICAgICAgICBvcHRpb25zLmRpcmVjdG9yeSA9IGRpcmVjdG9yeTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbmNvZGluZykge1xuICAgICAgICAgICAgb3B0aW9ucy5lbmNvZGluZyA9IGVuY29kaW5nO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9wdGlvbnM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBleGlzdHNJbkRpcmVjdG9yeShwYXRoOiBzdHJpbmcsIGRpcmVjdG9yeTogRGlyZWN0b3J5KTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCBGaWxlc3lzdGVtLnN0YXQoeyBwYXRoLCBkaXJlY3RvcnkgfSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIHJlYWRkaXJJbkRpcmVjdG9yeShwYXRoOiBzdHJpbmcsIGRpcmVjdG9yeTogRGlyZWN0b3J5KTogUHJvbWlzZTxzdHJpbmdbXT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgRmlsZXN5c3RlbS5yZWFkZGlyKHsgcGF0aCwgZGlyZWN0b3J5IH0pO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5maWxlcy5tYXAoZmlsZSA9PiBmaWxlLm5hbWUpO1xuICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgbWlncmF0ZUxlZ2FjeURpcmVjdG9yeShvbGRQYXRoOiBzdHJpbmcsIG5ld1BhdGg6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBjb25zdCBsZWdhY3lGaWxlcyA9IGF3YWl0IHRoaXMucmVhZGRpckluRGlyZWN0b3J5KG9sZFBhdGgsIERpcmVjdG9yeS5EYXRhKTtcbiAgICAgICAgaWYgKCFsZWdhY3lGaWxlcy5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICBhd2FpdCB0aGlzLm1rZGlyKG5ld1BhdGgpO1xuICAgICAgICBjb25zdCBtaWdyYXRlZEZpbGVzID0gbmV3IFNldChhd2FpdCB0aGlzLnJlYWRkaXIobmV3UGF0aCkpO1xuXG4gICAgICAgIGZvciAoY29uc3QgZmlsZU5hbWUgb2YgbGVnYWN5RmlsZXMpIHtcbiAgICAgICAgICAgIGlmIChtaWdyYXRlZEZpbGVzLmhhcyhmaWxlTmFtZSkpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICBjb25zdCBsZWdhY3lQYXRoID0gYCR7b2xkUGF0aH0vJHtmaWxlTmFtZX1gO1xuICAgICAgICAgICAgY29uc3QgbGVnYWN5U3RhdCA9IGF3YWl0IEZpbGVzeXN0ZW0uc3RhdCh7XG4gICAgICAgICAgICAgICAgcGF0aDogbGVnYWN5UGF0aCxcbiAgICAgICAgICAgICAgICBkaXJlY3Rvcnk6IERpcmVjdG9yeS5EYXRhXG4gICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiBudWxsKTtcblxuICAgICAgICAgICAgaWYgKCFsZWdhY3lTdGF0IHx8IGxlZ2FjeVN0YXQudHlwZSAhPT0gXCJmaWxlXCIpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgRmlsZXN5c3RlbS5yZWFkRmlsZSh7XG4gICAgICAgICAgICAgICAgcGF0aDogbGVnYWN5UGF0aCxcbiAgICAgICAgICAgICAgICBkaXJlY3Rvcnk6IERpcmVjdG9yeS5EYXRhLFxuICAgICAgICAgICAgICAgIGVuY29kaW5nOiBFbmNvZGluZy5VVEY4XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgYXdhaXQgRmlsZXN5c3RlbS53cml0ZUZpbGUoe1xuICAgICAgICAgICAgICAgIHBhdGg6IGAke25ld1BhdGh9LyR7ZmlsZU5hbWV9YCxcbiAgICAgICAgICAgICAgICBkaXJlY3Rvcnk6IERpcmVjdG9yeS5Eb2N1bWVudHMsXG4gICAgICAgICAgICAgICAgZGF0YTogY29udGVudC5kYXRhIGFzIHN0cmluZyxcbiAgICAgICAgICAgICAgICBlbmNvZGluZzogRW5jb2RpbmcuVVRGOFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIGVuc3VyZVBlcm1pc3Npb25zKCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbFNldHRsZWQoW1xuICAgICAgICAgICAgRmlsZXN5c3RlbS5yZXF1ZXN0UGVybWlzc2lvbnMoKSxcbiAgICAgICAgICAgIEZpbGVQaWNrZXIucmVxdWVzdFBlcm1pc3Npb25zKClcbiAgICAgICAgXSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRBbmRyb2lkQnJpZGdlKCk6IEFuZHJvaWRCcmlkZ2UgfCB1bmRlZmluZWQge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIiA/IHVuZGVmaW5lZCA6IHdpbmRvdy5TdHJlbWlvRW5oYW5jZWRBbmRyb2lkO1xuICAgIH1cblxuICAgIGFzeW5jIHJlYWRGaWxlKHBhdGg6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IEZpbGVzeXN0ZW0ucmVhZEZpbGUodGhpcy5nZXRGaWxlT3B0aW9ucyhwYXRoLCBFbmNvZGluZy5VVEY4KSk7XG4gICAgICAgIHJldHVybiByZXN1bHQuZGF0YSBhcyBzdHJpbmc7XG4gICAgfVxuXG4gICAgYXN5bmMgd3JpdGVGaWxlKHBhdGg6IHN0cmluZywgY29udGVudDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGF3YWl0IEZpbGVzeXN0ZW0ud3JpdGVGaWxlKHtcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0RmlsZU9wdGlvbnMocGF0aCwgRW5jb2RpbmcuVVRGOCksXG4gICAgICAgICAgICBkYXRhOiBjb250ZW50XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGFzeW5jIHJlYWRkaXIocGF0aDogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmdbXT4ge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBGaWxlc3lzdGVtLnJlYWRkaXIodGhpcy5nZXRGaWxlT3B0aW9ucyhwYXRoKSk7XG4gICAgICAgIHJldHVybiByZXN1bHQuZmlsZXMubWFwKGYgPT4gZi5uYW1lKTtcbiAgICB9XG5cbiAgICBhc3luYyBleGlzdHMocGF0aDogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCBGaWxlc3lzdGVtLnN0YXQodGhpcy5nZXRGaWxlT3B0aW9ucyhwYXRoKSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyB1bmxpbmsocGF0aDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGF3YWl0IEZpbGVzeXN0ZW0uZGVsZXRlRmlsZSh0aGlzLmdldEZpbGVPcHRpb25zKHBhdGgpKTtcbiAgICB9XG5cbiAgICBhc3luYyBta2RpcihwYXRoOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF3YWl0IEZpbGVzeXN0ZW0ubWtkaXIoe1xuICAgICAgICAgICAgICAgIC4uLnRoaXMuZ2V0RmlsZU9wdGlvbnMocGF0aCksXG4gICAgICAgICAgICAgICAgcmVjdXJzaXZlOiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgICAvLyBJZ25vcmUgZXJyb3IgaWYgZGlyZWN0b3J5IGFscmVhZHkgZXhpc3RzXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBzdGF0KHBhdGg6IHN0cmluZyk6IFByb21pc2U8RmlsZVN0YXQ+IHtcbiAgICAgICAgY29uc3Qgc3RhdCA9IGF3YWl0IEZpbGVzeXN0ZW0uc3RhdCh0aGlzLmdldEZpbGVPcHRpb25zKHBhdGgpKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlzRmlsZTogc3RhdC50eXBlID09PSAnZmlsZScsXG4gICAgICAgICAgICBpc0RpcmVjdG9yeTogc3RhdC50eXBlID09PSAnZGlyZWN0b3J5J1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGFzeW5jIG9wZW5QYXRoKHBhdGg6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBjb25zdCBicmlkZ2UgPSB0aGlzLmdldEFuZHJvaWRCcmlkZ2UoKTtcbiAgICAgICAgaWYgKGJyaWRnZSkge1xuICAgICAgICAgICAgYnJpZGdlLm9wZW5QYXRoKHBhdGgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc29sZS5pbmZvKFwiT3BlbiB0aGlzIGZvbGRlciBmcm9tIHlvdXIgRmlsZXMgYXBwOlwiLCBwYXRoKTtcbiAgICB9XG5cbiAgICBhc3luYyBvcGVuRXh0ZXJuYWwodXJsOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgYXdhaXQgQnJvd3Nlci5vcGVuKHsgdXJsIH0pO1xuICAgIH1cblxuICAgIGlzUGljdHVyZUluUGljdHVyZVN1cHBvcnRlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QW5kcm9pZEJyaWRnZSgpPy5pc1BpY3R1cmVJblBpY3R1cmVTdXBwb3J0ZWQoKSA/PyBmYWxzZTtcbiAgICB9XG5cbiAgICBhc3luYyBlbnRlclBpY3R1cmVJblBpY3R1cmUod2lkdGggPSAxNiwgaGVpZ2h0ID0gOSk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgICAgICBjb25zdCBicmlkZ2UgPSB0aGlzLmdldEFuZHJvaWRCcmlkZ2UoKTtcbiAgICAgICAgaWYgKCFicmlkZ2UpIHJldHVybiBmYWxzZTtcbiAgICAgICAgcmV0dXJuIGJyaWRnZS5lbnRlclBpY3R1cmVJblBpY3R1cmUod2lkdGgsIGhlaWdodCk7XG4gICAgfVxuXG4gICAgYXN5bmMgc2V0UGljdHVyZUluUGljdHVyZVN0YXRlKGVuYWJsZWQ6IGJvb2xlYW4sIHdpZHRoID0gMTYsIGhlaWdodCA9IDkpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgdGhpcy5nZXRBbmRyb2lkQnJpZGdlKCk/LnNldFBpY3R1cmVJblBpY3R1cmVTdGF0ZShlbmFibGVkLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICB9XG5cbiAgICBnZXRUaGVtZXNQYXRoKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLnRoZW1lc1BhdGg7XG4gICAgfVxuXG4gICAgZ2V0UGx1Z2luc1BhdGgoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGx1Z2luc1BhdGg7XG4gICAgfVxuXG4gICAgZ2V0RW5oYW5jZWRQYXRoKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmVuaGFuY2VkUGF0aDtcbiAgICB9XG5cbiAgICBhc3luYyBpbml0KCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBhd2FpdCB0aGlzLmVuc3VyZVBlcm1pc3Npb25zKCk7XG4gICAgICAgIGF3YWl0IHRoaXMubWtkaXIodGhpcy5nZXRFbmhhbmNlZFBhdGgoKSk7XG4gICAgICAgIGF3YWl0IHRoaXMubWtkaXIodGhpcy5nZXRUaGVtZXNQYXRoKCkpO1xuICAgICAgICBhd2FpdCB0aGlzLm1rZGlyKHRoaXMuZ2V0UGx1Z2luc1BhdGgoKSk7XG5cbiAgICAgICAgYXdhaXQgdGhpcy5taWdyYXRlTGVnYWN5RGlyZWN0b3J5KFwidGhlbWVzXCIsIHRoaXMuZ2V0VGhlbWVzUGF0aCgpKTtcbiAgICAgICAgYXdhaXQgdGhpcy5taWdyYXRlTGVnYWN5RGlyZWN0b3J5KFwicGx1Z2luc1wiLCB0aGlzLmdldFBsdWdpbnNQYXRoKCkpO1xuXG4gICAgICAgIGNvbnN0IGxlZ2FjeVJvb3RFeGlzdHMgPSBhd2FpdCB0aGlzLmV4aXN0c0luRGlyZWN0b3J5KFwibG9nc1wiLCBEaXJlY3RvcnkuRGF0YSk7XG4gICAgICAgIGlmIChsZWdhY3lSb290RXhpc3RzKSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLm1rZGlyKGAke3RoaXMuZ2V0RW5oYW5jZWRQYXRoKCl9L2xvZ3NgKTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMubWlncmF0ZUxlZ2FjeURpcmVjdG9yeShcImxvZ3NcIiwgYCR7dGhpcy5nZXRFbmhhbmNlZFBhdGgoKX0vbG9nc2ApO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwgImltcG9ydCB7IElQbGF0Zm9ybSB9IGZyb20gXCIuL0lQbGF0Zm9ybVwiO1xuaW1wb3J0IHsgRWxlY3Ryb25QbGF0Zm9ybSB9IGZyb20gXCIuL0VsZWN0cm9uUGxhdGZvcm1cIjtcbmltcG9ydCB7IENhcGFjaXRvclBsYXRmb3JtIH0gZnJvbSBcIi4vQ2FwYWNpdG9yUGxhdGZvcm1cIjtcblxuZXhwb3J0IGNsYXNzIFBsYXRmb3JtTWFuYWdlciB7XG4gICAgcHJpdmF0ZSBzdGF0aWMgX2N1cnJlbnQ6IElQbGF0Zm9ybSB8IG51bGwgPSBudWxsO1xuXG4gICAgc3RhdGljIGdldCBjdXJyZW50KCk6IElQbGF0Zm9ybSB7XG4gICAgICAgIGlmICghdGhpcy5fY3VycmVudCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUGxhdGZvcm1NYW5hZ2VyIG5vdCBpbml0aWFsaXplZFwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudDtcbiAgICB9XG5cbiAgICBzdGF0aWMgaW5pdCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHR5cGVvZiBwcm9jZXNzICE9PSBcInVuZGVmaW5lZFwiICYmIHByb2Nlc3MudmVyc2lvbnMgJiYgcHJvY2Vzcy52ZXJzaW9ucy5lbGVjdHJvbikge1xuICAgICAgICAgICAgdGhpcy5fY3VycmVudCA9IG5ldyBFbGVjdHJvblBsYXRmb3JtKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiAod2luZG93IGFzIGFueSkuY2FwYWNpdG9yKSB7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50ID0gbmV3IENhcGFjaXRvclBsYXRmb3JtKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIHBsYXRmb3JtXCIpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwgImNsYXNzIEJyb3dzZXJMb2dnZXIge1xuICAgIGluZm8obWVzc2FnZTogc3RyaW5nLCAuLi5tZXRhOiBhbnlbXSkge1xuICAgICAgICBjb25zb2xlLmluZm8oYFtJTkZPXSAke21lc3NhZ2V9YCwgLi4ubWV0YSk7XG4gICAgfVxuICAgIHdhcm4obWVzc2FnZTogc3RyaW5nLCAuLi5tZXRhOiBhbnlbXSkge1xuICAgICAgICBjb25zb2xlLndhcm4oYFtXQVJOXSAke21lc3NhZ2V9YCwgLi4ubWV0YSk7XG4gICAgfVxuICAgIGVycm9yKG1lc3NhZ2U6IHN0cmluZywgLi4ubWV0YTogYW55W10pIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgW0VSUk9SXSAke21lc3NhZ2V9YCwgLi4ubWV0YSk7XG4gICAgfVxufVxuXG5jb25zdCBsb2dnZXIgPSBuZXcgQnJvd3NlckxvZ2dlcigpO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TG9nZ2VyKGxhYmVsOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gbG9nZ2VyO1xufVxuXG5leHBvcnQgZGVmYXVsdCBsb2dnZXI7XG4iLCAiLyoqXG4gKiBDZW50cmFsaXplZCBjb25zdGFudHMgZm9yIFN0cmVtaW8gRW5oYW5jZWRcbiAqIFVzaW5nIGNvbnN0YW50cyBpbnN0ZWFkIG9mIG1hZ2ljIHN0cmluZ3MgaW1wcm92ZXMgbWFpbnRhaW5hYmlsaXR5XG4gKi9cblxuLy8gQ1NTIFNlbGVjdG9ycyB1c2VkIHRvIGludGVyYWN0IHdpdGggU3RyZW1pbydzIFVJXG4vLyBOb3RlOiBUaGVzZSBtYXkgbmVlZCB1cGRhdGluZyB3aGVuIFN0cmVtaW8gdXBkYXRlcyB0aGVpciBjbGFzcyBuYW1lc1xuZXhwb3J0IGNvbnN0IFNFTEVDVE9SUyA9IHtcbiAgICBTRUNUSU9OU19DT05UQUlORVI6ICdbY2xhc3NePVwic2VjdGlvbnMtY29udGFpbmVyLVwiXScsXG4gICAgU0VDVElPTjogJ1tjbGFzc149XCJzZWN0aW9uLVwiXScsXG4gICAgQ0FURUdPUlk6ICcuY2F0ZWdvcnktR1AwaEknLFxuICAgIENBVEVHT1JZX0xBQkVMOiAnLmxhYmVsLU5fTzJ2JyxcbiAgICBDQVRFR09SWV9JQ09OOiAnLmljb24tb1pveVYnLFxuICAgIENBVEVHT1JZX0hFQURJTkc6ICcuaGVhZGluZy1YZVBGbCcsXG4gICAgTEFCRUw6ICdbY2xhc3NePVwibGFiZWwtd1hHM2VcIl0nLFxuICAgIE5BVl9NRU5VOiAnLm1lbnUteGVFMDYnLFxuICAgIFNFVFRJTkdTX0NPTlRFTlQ6ICcuc2V0dGluZ3MtY29udGVudC1jbzVlVScsXG4gICAgRU5IQU5DRURfU0VDVElPTjogJyNlbmhhbmNlZCcsXG4gICAgVEhFTUVTX0NBVEVHT1JZOiAnI2VuaGFuY2VkID4gZGl2Om50aC1jaGlsZCgyKScsXG4gICAgUExVR0lOU19DQVRFR09SWTogJyNlbmhhbmNlZCA+IGRpdjpudGgtY2hpbGQoMyknLFxuICAgIEFCT1VUX0NBVEVHT1JZOiAnI2VuaGFuY2VkID4gZGl2Om50aC1jaGlsZCg0KScsXG4gICAgUk9VVEVfQ09OVEFJTkVSOiAnLnJvdXRlLWNvbnRhaW5lcjpsYXN0LWNoaWxkIC5yb3V0ZS1jb250ZW50JyxcbiAgICBNRVRBX0RFVEFJTFNfQ09OVEFJTkVSOiAnLm1ldGFkZXRhaWxzLWNvbnRhaW5lci1LX0RxYScsXG4gICAgREVTQ1JJUFRJT05fQ09OVEFJTkVSOiAnLmRlc2NyaXB0aW9uLWNvbnRhaW5lci15aThpVScsXG4gICAgQURET05TX0xJU1RfQ09OVEFJTkVSOiAnLmFkZG9ucy1saXN0LWNvbnRhaW5lci1PdnIyWicsXG4gICAgQURET05fQ09OVEFJTkVSOiAnLmFkZG9uLWNvbnRhaW5lci1sQzVLTicsXG4gICAgTkFNRV9DT05UQUlORVI6ICcubmFtZS1jb250YWluZXItcUlBZzgnLFxuICAgIERFU0NSSVBUSU9OX0lURU06ICcuZGVzY3JpcHRpb24tY29udGFpbmVyLXY3SmhlJyxcbiAgICBUWVBFU19DT05UQUlORVI6ICcudHlwZXMtY29udGFpbmVyLURhT3JnJyxcbiAgICBTRUFSQ0hfSU5QVVQ6ICcuc2VhcmNoLWlucHV0LWJBZ0FoJyxcbiAgICBIT1JJWk9OVEFMX05BVjogJy5ob3Jpem9udGFsLW5hdi1iYXItY29udGFpbmVyLVlfenZLJyxcbiAgICBUT0FTVF9JVEVNOiAnLnRvYXN0LWl0ZW0tY29udGFpbmVyLW5HMHVrJyxcbiAgICBUT0FTVF9DT05UQUlORVI6ICcudG9hc3RzLWNvbnRhaW5lci1vS0VDeSdcbn0gYXMgY29uc3Q7XG5cbi8vIENTUyBDbGFzc2VzIHVzZWQgZm9yIHN0eWxpbmdcbmV4cG9ydCBjb25zdCBDTEFTU0VTID0ge1xuICAgIE9QVElPTjogJ29wdGlvbi12Rk9BUycsXG4gICAgQ09OVEVOVDogJ2NvbnRlbnQtUDJUMGknLFxuICAgIEJVVFRPTjogJ2J1dHRvbi1ETm1ZTCcsXG4gICAgQlVUVE9OX0NPTlRBSU5FUjogJ2J1dHRvbi1jb250YWluZXItelZMSDYnLFxuICAgIFNFTEVDVEVEOiAnc2VsZWN0ZWQtUzdTZUsnLFxuICAgIElOU1RBTExfQlVUVE9OOiAnaW5zdGFsbC1idXR0b24tY29udGFpbmVyLXlmY3E1JyxcbiAgICBVTklOU1RBTExfQlVUVE9OOiAndW5pbnN0YWxsLWJ1dHRvbi1jb250YWluZXItb1Y0WW8nLFxuICAgIENIRUNLRUQ6ICdjaGVja2VkJyxcbn0gYXMgY29uc3Q7XG5cbi8vIExvY2FsU3RvcmFnZSBrZXlzXG5leHBvcnQgY29uc3QgU1RPUkFHRV9LRVlTID0ge1xuICAgIEVOQUJMRURfUExVR0lOUzogJ2VuYWJsZWRQbHVnaW5zJyxcbiAgICBDVVJSRU5UX1RIRU1FOiAnY3VycmVudFRoZW1lJyxcbiAgICBESVNDT1JEX1JQQzogJ2Rpc2NvcmRyaWNocHJlc2VuY2UnLFxuICAgIENIRUNLX1VQREFURVNfT05fU1RBUlRVUDogJ2NoZWNrRm9yVXBkYXRlc09uU3RhcnR1cCcsXG59IGFzIGNvbnN0O1xuXG4vLyBJUEMgQ2hhbm5lbCBuYW1lcyBmb3IgbWFpbiA8LT4gcmVuZGVyZXIgY29tbXVuaWNhdGlvblxuZXhwb3J0IGNvbnN0IElQQ19DSEFOTkVMUyA9IHtcbiAgICBNSU5JTUlaRV9XSU5ET1c6ICdtaW5pbWl6ZS13aW5kb3cnLFxuICAgIE1BWElNSVpFX1dJTkRPVzogJ21heGltaXplLXdpbmRvdycsXG4gICAgQ0xPU0VfV0lORE9XOiAnY2xvc2Utd2luZG93JyxcbiAgICBTRVRfVFJBTlNQQVJFTkNZOiAnc2V0LXRyYW5zcGFyZW5jeScsXG4gICAgR0VUX1RSQU5TUEFSRU5DWV9TVEFUVVM6ICdnZXQtdHJhbnNwYXJlbmN5LXN0YXR1cycsXG4gICAgVVBEQVRFX0NIRUNLX1NUQVJUVVA6ICd1cGRhdGUtY2hlY2stb24tc3RhcnR1cCcsXG4gICAgVVBEQVRFX0NIRUNLX1VTRVI6ICd1cGRhdGUtY2hlY2stdXNlcnJlcXVlc3QnLFxuICAgIEZVTExTQ1JFRU5fQ0hBTkdFRDogJ2Z1bGxzY3JlZW4tY2hhbmdlZCcsXG4gICAgRVhUUkFDVF9FTUJFRERFRF9TVUJUSVRMRVM6ICdleHRyYWN0LWVtYmVkZGVkLXN1YnRpdGxlcycsXG59IGFzIGNvbnN0O1xuXG4vLyBGaWxlIGV4dGVuc2lvbnMgZm9yIG1vZHNcbmV4cG9ydCBjb25zdCBGSUxFX0VYVEVOU0lPTlMgPSB7XG4gICAgVEhFTUU6ICcudGhlbWUuY3NzJyxcbiAgICBQTFVHSU46ICcucGx1Z2luLmpzJyxcbn0gYXMgY29uc3Q7XG5cbi8vIFVSTHNcbmV4cG9ydCBjb25zdCBVUkxTID0ge1xuICAgIFNUUkVNSU9fV0VCOiAnaHR0cHM6Ly93ZWIuc3RyZW1pby5jb20vJyxcbiAgICBTVFJFTUlPX1dFQl9BRERfQURET046ICdodHRwczovL3dlYi5zdHJlbWlvLmNvbS8jL2FkZG9ucz9hZGRvbj0nLFxuICAgIFJFR0lTVFJZOiAnaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL1JFVkVOR0U5Nzcvc3RyZW1pby1lbmhhbmNlZC1yZWdpc3RyeS9yZWZzL2hlYWRzL21haW4vcmVnaXN0cnkuanNvbicsXG4gICAgVkVSU0lPTl9DSEVDSzogJ2h0dHBzOi8vZ2l0aHViLmNvbS9SRVZFTkdFOTc3L3N0cmVtaW8tZW5oYW5jZWQtY29tbXVuaXR5L3Jhdy9tYWluL3ZlcnNpb24nLFxuICAgIFJFTEVBU0VTX0FQSTogJ2h0dHBzOi8vYXBpLmdpdGh1Yi5jb20vcmVwb3MvUkVWRU5HRTk3Ny9zdHJlbWlvLWVuaGFuY2VkLWNvbW11bml0eS9yZWxlYXNlcy9sYXRlc3QnLFxuICAgIFJFTEVBU0VTX1BBR0U6ICdodHRwczovL2dpdGh1Yi5jb20vUkVWRU5HRTk3Ny9zdHJlbWlvLWVuaGFuY2VkLWNvbW11bml0eS9yZWxlYXNlcy9sYXRlc3QnLFxuICAgIFNUUkVNSU9fU0VSVklDRV9HSVRIVUJfQVBJOiBcImh0dHBzOi8vYXBpLmdpdGh1Yi5jb20vcmVwb3MvU3RyZW1pby9zdHJlbWlvLXNlcnZpY2UvcmVsZWFzZXMvbGF0ZXN0XCJcbn0gYXMgY29uc3Q7XG5cbi8vIHNlcnZlci5qcyAoU3RyZW1pbyBzdHJlYW1pbmcgc2VydmVyKSBEb3dubG9hZCBVUkxcbmV4cG9ydCBjb25zdCBTRVJWRVJfSlNfVVJMID0gXCJodHRwczovL2RsLnN0cmVtLmlvL3NlcnZlci92NC4yMC4xMi9kZXNrdG9wL3NlcnZlci5qc1wiO1xuXG4vLyBGRm1wZWcgRG93bmxvYWQgVVJMc1xuZXhwb3J0IGNvbnN0IEZGTVBFR19VUkxTID0ge1xuICAgIHdpbjMyOiB7XG4gICAgICAgIHg2NDogXCJodHRwczovL2dpdGh1Yi5jb20vQnRiTi9GRm1wZWctQnVpbGRzL3JlbGVhc2VzL2Rvd25sb2FkL2xhdGVzdC9mZm1wZWctbWFzdGVyLWxhdGVzdC13aW42NC1ncGwuemlwXCIsXG4gICAgICAgIGFybTY0OiBcImh0dHBzOi8vZ2l0aHViLmNvbS9CdGJOL0ZGbXBlZy1CdWlsZHMvcmVsZWFzZXMvZG93bmxvYWQvbGF0ZXN0L2ZmbXBlZy1tYXN0ZXItbGF0ZXN0LXdpbmFybTY0LWdwbC56aXBcIixcbiAgICB9LFxuICAgIGRhcndpbjoge1xuICAgICAgICB4NjQ6IFwiaHR0cHM6Ly9mZm1wZWcubWFydGluLXJpZWRsLmRlL2Rvd25sb2FkL21hY29zL2FtZDY0LzE3NjY0MzcyOTdfOC4wLjEvZmZtcGVnLnppcFwiLFxuICAgICAgICBhcm02NDogXCJodHRwczovL2ZmbXBlZy5tYXJ0aW4tcmllZGwuZGUvZG93bmxvYWQvbWFjb3MvYXJtNjQvMTc2NjQzMDEzMl84LjAuMS9mZm1wZWcuemlwXCIsXG4gICAgfSxcbiAgICBsaW51eDoge1xuICAgICAgICB4NjQ6IFwiaHR0cHM6Ly9qb2hudmFuc2lja2xlLmNvbS9mZm1wZWcvcmVsZWFzZXMvZmZtcGVnLXJlbGVhc2UtYW1kNjQtc3RhdGljLnRhci54elwiLFxuICAgICAgICBhcm02NDogXCJodHRwczovL2pvaG52YW5zaWNrbGUuY29tL2ZmbXBlZy9yZWxlYXNlcy9mZm1wZWctcmVsZWFzZS1hcm02NC1zdGF0aWMudGFyLnh6XCIsXG4gICAgfSxcbn0gYXMgY29uc3Q7XG5cbi8vIEZGcHJvYmUgRG93bmxvYWQgVVJMcyBmb3IgbWFjT1NcbmV4cG9ydCBjb25zdCBNQUNPU19GRlBST0JFX1VSTFMgPSB7XG4gICAgeDY0OiBcImh0dHBzOi8vZmZtcGVnLm1hcnRpbi1yaWVkbC5kZS9kb3dubG9hZC9tYWNvcy9hbWQ2NC8xNzY2NDM3Mjk3XzguMC4xL2ZmcHJvYmUuemlwXCIsXG4gICAgYXJtNjQ6IFwiaHR0cHM6Ly9mZm1wZWcubWFydGluLXJpZWRsLmRlL2Rvd25sb2FkL21hY29zL2FybTY0LzE3NjY0MzAxMzJfOC4wLjEvZmZwcm9iZS56aXBcIixcbn07XG5cbi8vIERpc2NvcmQgUlBDXG5leHBvcnQgY29uc3QgRElTQ09SRCA9IHtcbiAgICBDTElFTlRfSUQ6ICcxMjAwMTg2NzUwNzI3ODkzMTY0JyxcbiAgICBSRUNPTk5FQ1RfSU5URVJWQUw6IDEwMDAwLFxuICAgIERFRkFVTFRfSU1BR0U6ICcxMDI0c3RyZW1pbycsXG59IGFzIGNvbnN0O1xuXG4vLyBUaW1lb3V0c1xuZXhwb3J0IGNvbnN0IFRJTUVPVVRTID0ge1xuICAgIEVMRU1FTlRfV0FJVDogMTAwMDAsXG4gICAgSU5TVEFMTF9DT01QTEVUSU9OOiAxMjAwMDAsXG4gICAgU0VSVklDRV9DSEVDS19JTlRFUlZBTDogNTAwMCxcbiAgICBTRVJWRVJfUkVMT0FEX0RFTEFZOiAxNTAwLFxuICAgIENPUkVTVEFURV9SRVRSWV9JTlRFUlZBTDogMTAwMCxcbiAgICBDT1JFU1RBVEVfTUFYX1JFVFJJRVM6IDMwLFxufSBhcyBjb25zdDtcbiIsICI8ZGl2IGNsYXNzPVwibmF2LWNvbnRlbnQtY29udGFpbmVyLXpsOWhRXCIgc3R5bGU9XCJ3aWR0aDogOTAlOyBvdmVyZmxvdy15OiBhdXRvO1wiPlxuICAgIDxkaXYgY2xhc3M9XCJhZGRvbnMtY29udGVudC16aEZCbFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwic2VsZWN0YWJsZS1pbnB1dHMtY29udGFpbmVyLXRVdWwxXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3BhY2luZy13SDF3NVwiPjwvZGl2PlxuICAgICAgICAgICAgPGxhYmVsIHRpdGxlPVwiU2VhcmNoIHRoZW1lcy9wbHVnaW5zXCIgY2xhc3M9XCJzZWFyY2gtYmFyLWs3TVhkIHNlYXJjaC1iYXItY29udGFpbmVyLXA0dFN0XCI+XG4gICAgICAgICAgICAgICAgPGlucHV0IHNpemU9XCIxXCIgYXV0b2NvcnJlY3Q9XCJvZmZcIiBhdXRvY2FwaXRhbGl6ZT1cIm9mZlwiIGF1dG9jb21wbGV0ZT1cIm9mZlwiIHNwZWxsY2hlY2s9XCJmYWxzZVwiIHRhYmluZGV4PVwiMFwiIGNsYXNzPVwic2VhcmNoLWlucHV0LWJBZ0FoIHRleHQtaW5wdXQtaG5MaXpcIiB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiU2VhcmNoIHRoZW1lcy9wbHVnaW5zXCIgdmFsdWU9XCJcIj5cbiAgICAgICAgICAgICAgICA8c3ZnIGNsYXNzPVwiaWNvbi1RT1lmSlwiIHZpZXdCb3g9XCIwIDAgNTEyIDUxMlwiPlxuICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTQ1Ni44ODIgNDE1Ljc5OTk5OTk5OTk5OTdsLTkzLjc5MS04OS40NWMyMi42MDUtMjguNjcgMzQuNzg0LTYzLjU3IDM0LjY4Ni05OS40NCAwLTkxLjU0LTc4LjE0Mi0xNjYuMDctMTc0LjEyNS0xNjYuMDdzLTE3NC4xMjUgNzQuNTMtMTc0LjEyNSAxNjYuMTdjMCA5MS41NCA3OC4xNDIgMTY2LjA3IDE3NC4xMjUgMTY2LjA3IDM3LjU4NiAwIDc0LjE2MS0xMS42MSAxMDQuMjU2LTMzLjA4bDkzLjc5IDg5LjQ1YzMuNTM1IDMuMDQgNy45MSA1LjA1IDEyLjYwNCA1Ljc5IDQuNjk2IDAuNzQgOS41MTUgMC4xOCAxMy44ODctMS42MSA0LjM3NC0xLjc5IDguMTE3LTQuNzQgMTAuNzg4LTguNDkgMi42NzEtMy43NiA0LjE1Ny04LjE3IDQuMjg0LTEyLjcgMC4xMDgtNi4xMS0yLjE2NS0xMi4wNC02LjM3OS0xNi42NG0tMzU3LjYyLTE4OC43OWMtMC4wMS0yOS40MyAxMS40NTMtNTcuOCAzMi4xNjItNzkuNjEgMjAuNzA5LTIxLjgyIDQ5LjE4My0zNS40OSA3OS44ODQtMzguMzkgMzAuNy0yLjkgNjEuNDMzIDUuMiA4Ni4yMjEgMjIuNzIgMjQuNzg3IDE3LjUyIDQxLjg1OCA0My4yIDQ3Ljg5MSA3Mi4wNSA2LjAzNCAyOC44NiAwLjU5OCA1OC44My0xNS4yNDkgODQuMDdzLTQwLjk3MiA0My45Ni03MC40ODkgNTIuNTNjLTI5LjUxOCA4LjU1LTYxLjMxNyA2LjMzLTg5LjIxMy02LjI0cy00OS44OTUtMzQuNTctNjEuNzE4LTYxLjc1Yy02LjI1OC0xNC4zOC05LjQ4My0yOS44MS05LjQ4OC00NS4zOFwiIHN0eWxlPVwiZmlsbDogY3VycmVudGNvbG9yO1wiPjwvcGF0aD5cbiAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8YnIvPlxuICAgICAgICA8ZGl2IHRhYmluZGV4PVwiMFwiIHRpdGxlPVwiU3VibWl0IHlvdXIgdGhlbWVzIGFuZCBwbHVnaW5zIGhlcmVcIiB0YXJnZXQ9XCJfYmxhbmtcIiBjbGFzcz1cImxpbmstRnJMMXQgYnV0dG9uLWNvbnRhaW5lci16VkxINlwiPlxuICAgICAgICAgICAgPGEgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9SRVZFTkdFOTc3L3N0cmVtaW8tZW5oYW5jZWQtcmVnaXN0cnlcIiB0YXJnZXQ9XCJfYmxhbmtcIiByZWw9XCJub3JlZmVycmVyXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxhYmVsLVBKdlNKXCIgc3R5bGU9XCJ0ZXh0LWFsaWduOiBjZW50ZXI7XCI+U3VibWl0IHlvdXIgdGhlbWVzIGFuZCBwbHVnaW5zPC9kaXY+XG4gICAgICAgICAgICA8L2E+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJhZGRvbnMtbGlzdC1jb250YWluZXItT3ZyMlpcIiBpZD1cIm1vZHMtbGlzdFwiPlxuICAgICAgICAgICAgXG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8YnIvPlxuICAgIDwvZGl2PlxuPC9kaXY+IiwgIjxicj5cbjxkaXYgdGFiaW5kZXg9XCIwXCIgY2xhc3M9XCJhZGRvbi13aG1kTyBhbmltYXRpb24tZmFkZS1pbiBhZGRvbi1jb250YWluZXItbEM1S04gYnV0dG9uLWNvbnRhaW5lci16VkxINlwiPlxuICAgIDxkaXYgY2xhc3M9XCJsb2dvLWNvbnRhaW5lci1aY1NTQ1wiPlxuICAgICAgICA8IS0tIHRoZW1lIHByZXZpZXcgaGVyZSAtLT5cblxuICAgICAgICA8IS0tIHBsdWdpbiBpY29uIGhlcmUgLS0+XG4gICAgPC9kaXY+XG5cblx0PGRpdiBjbGFzcz1cImluZm8tY29udGFpbmVyLUFkTUI2XCI+XG5cdFx0PGRpdiBjbGFzcz1cIm5hbWUtY29udGFpbmVyLXFJQWc4XCIgdGl0bGU9XCJ7eyBuYW1lIH19XCI+e3sgbmFtZSB9fTwvZGl2PlxuXHRcdDxkaXYgY2xhc3M9XCJ2ZXJzaW9uLWNvbnRhaW5lci16ZFB5TlwiIHRpdGxlPVwie3sgdmVyc2lvbiB9fVwiPnt7IHZlcnNpb24gfX08L2Rpdj5cblx0XHQ8ZGl2IGNsYXNzPVwidHlwZXMtY29udGFpbmVyLURhT3JnXCI+e3sgdHlwZSB9fTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZGVzY3JpcHRpb24tY29udGFpbmVyLXY3SmhlXCI+XG4gICAgICAgICAgICA8Yj5EZXNjcmlwdGlvbjo8L2I+IHt7IGRlc2NyaXB0aW9uIH19XG4gICAgICAgICAgICA8YnI+XG4gICAgICAgICAgICA8Yj5BdXRob3I6PC9iPiB7eyBhdXRob3IgfX1cbiAgICAgICAgPC9kaXY+XG5cdDwvZGl2PlxuXHQ8ZGl2IGNsYXNzPVwiYnV0dG9ucy1jb250YWluZXItZzB4WHJcIj5cblx0XHQ8ZGl2IGNsYXNzPVwiYWN0aW9uLWJ1dHRvbnMtY29udGFpbmVyLXhNVm16XCI+XG5cdFx0XHQ8ZGl2IHRhYmluZGV4PVwiLTFcIiB0aXRsZT1cInt7IGFjdGlvbmJ0blRpdGxlIH19XCIgY2xhc3M9XCJ7eyBhY3Rpb25idG5DbGFzcyB9fSBidXR0b24tY29udGFpbmVyLXpWTEg2IG1vZEFjdGlvbkJ0blwiIGRhdGEtbGluaz1cInt7IGRvd25sb2FkIH19XCIgZGF0YS10eXBlPVwie3sgdHlwZSB9fVwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwibGFiZWwtT25XaDJcIj57eyBhY3Rpb25idG5UaXRsZSB9fTwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0PC9kaXY+XG5cdFx0PGEgaHJlZj1cInt7IHJlcG8gfX1cIiB0YXJnZXQ9XCJfYmxhbmtcIiByZWw9XCJub3JlZmVycmVyXCIgY2xhc3M9XCJzaGFyZS1idXR0b24tY29udGFpbmVyLXMzZ3dQIGJ1dHRvbi1jb250YWluZXItelZMSDZcIj5cblx0XHRcdDxzdmcgY2xhc3M9XCJpY29uLUd4VmJZXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiPlxuXHRcdFx0XHQ8cGF0aCBkPVwiTTEyLDJBMTAsMTAgMCAwLDAgMiwxMkMyLDE2LjQyIDQuODcsMjAuMTcgOC44NCwyMS41QzkuMzQsMjEuNTggOS41LDIxLjI3IDkuNSwyMUM5LjUsMjAuNzcgOS41LDIwLjE0IDkuNSwxOS4zMUM2LjczLDE5LjkxIDYuMTQsMTcuOTcgNi4xNCwxNy45N0M1LjY4LDE2LjgxIDUuMDMsMTYuNSA1LjAzLDE2LjVDNC4xMiwxNS44OCA1LjEsMTUuOSA1LjEsMTUuOUM2LjEsMTUuOTcgNi42MywxNi45MyA2LjYzLDE2LjkzQzcuNSwxOC40NSA4Ljk3LDE4IDkuNTQsMTcuNzZDOS42MywxNy4xMSA5Ljg5LDE2LjY3IDEwLjE3LDE2LjQyQzcuOTUsMTYuMTcgNS42MiwxNS4zMSA1LjYyLDExLjVDNS42MiwxMC4zOSA2LDkuNSA2LjY1LDguNzlDNi41NSw4LjU0IDYuMiw3LjUgNi43NSw2LjE1QzYuNzUsNi4xNSA3LjU5LDUuODggOS41LDcuMTdDMTAuMjksNi45NSAxMS4xNSw2Ljg0IDEyLDYuODRDMTIuODUsNi44NCAxMy43MSw2Ljk1IDE0LjUsNy4xN0MxNi40MSw1Ljg4IDE3LjI1LDYuMTUgMTcuMjUsNi4xNUMxNy44LDcuNSAxNy40NSw4LjU0IDE3LjM1LDguNzlDMTgsOS41IDE4LjM4LDEwLjM5IDE4LjM4LDExLjVDMTguMzgsMTUuMzIgMTYuMDQsMTYuMTYgMTMuODEsMTYuNDFDMTQuMTcsMTYuNzIgMTQuNSwxNy4zMyAxNC41LDE4LjI2QzE0LjUsMTkuNiAxNC41LDIwLjY4IDE0LjUsMjFDMTQuNSwyMS4yNyAxNC42NiwyMS41OSAxNS4xNywyMS41QzE5LjE0LDIwLjE2IDIyLDE2LjQyIDIyLDEyQTEwLDEwIDAgMCwwIDEyLDJaXCIgc3R5bGU9XCJmaWxsOiBjdXJyZW50Y29sb3I7XCIgLz5cblx0XHRcdDwvc3ZnPlxuXHRcdFx0PGRpdiBjbGFzcz1cImxhYmVsLU9uV2gyXCI+T3BlbiByZXBvc2l0b3J5PC9kaXY+XG5cdFx0PC9hPlxuXHQ8L2Rpdj5cbjwvZGl2PlxuIiwgIjxoNCBzdHlsZT1cImNvbG9yOiB3aGl0ZTsgbWFyZ2luLWJvdHRvbTogMXJlbTtcIj5cbiAgICBEZXZlbG9wZWQgQnk6IDxwIHN0eWxlPVwiZGlzcGxheTogaW5saW5lICFpbXBvcnRhbnQ7XCI+PGEgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9SRVZFTkdFOTc3XCIgdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9yZWZlcnJlclwiPlJFVkVOR0U5Nzc8L2E+PC9wPlxuICAgIDxici8+XG4gICAgVmVyc2lvbjogdnt7IHZlcnNpb24gfX1cbiAgICA8YnIvPlxuPC9oND5cblxuPGRpdiBjbGFzcz1cIm9wdGlvbi12Rk9BU1wiPlxuICAgIDxkaXYgY2xhc3M9XCJoZWFkaW5nLWRZTUR0XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJsYWJlbC1xSTZWaFwiPkNoZWNrIGZvciB1cGRhdGVzIG9uIHN0YXJ0dXA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiY29udGVudC1QMlQwaVwiPlxuICAgICAgICA8ZGl2IHRhYmluZGV4PVwiLTFcIiBjbGFzcz1cInRvZ2dsZS1jb250YWluZXItbFpmSFAgYnV0dG9uLWNvbnRhaW5lci16VkxINiB7eyBjaGVja0ZvclVwZGF0ZXNPblN0YXJ0dXAgfX1cIiBpZD1cImNoZWNrRm9yVXBkYXRlc09uU3RhcnR1cFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRvZ2dsZS10b09XTVwiPjwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvZGl2PlxuXG48ZGl2IGNsYXNzPVwib3B0aW9uLXZGT0FTXCI+XG4gICAgPGRpdiBjbGFzcz1cImhlYWRpbmctZFlNRHRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImxhYmVsLXFJNlZoXCI+RGlzY29yZCBSaWNoIFByZXNlbmNlPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImNvbnRlbnQtUDJUMGlcIj5cbiAgICAgICAgPGRpdiB0YWJpbmRleD1cIi0xXCIgY2xhc3M9XCJ0b2dnbGUtY29udGFpbmVyLWxaZkhQIGJ1dHRvbi1jb250YWluZXItelZMSDYge3sgZGlzY29yZHJpY2hwcmVzZW5jZSB9fVwiIGlkPVwiZGlzY29yZHJpY2hwcmVzZW5jZVwiIHN0eWxlPVwib3V0bGluZTogbm9uZTtcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0b2dnbGUtdG9PV01cIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG48L2Rpdj5cblxuPGRpdiBjbGFzcz1cIm9wdGlvbi12Rk9BU1wiPlxuICAgIDxkaXYgY2xhc3M9XCJoZWFkaW5nLWRZTUR0XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJsYWJlbC1xSTZWaFwiPldpbmRvdyB0cmFuc3BhcmVuY3k8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiY29udGVudC1QMlQwaVwiPlxuICAgICAgICA8ZGl2IHRhYmluZGV4PVwiLTFcIiBjbGFzcz1cInRvZ2dsZS1jb250YWluZXItbFpmSFAgYnV0dG9uLWNvbnRhaW5lci16VkxINiB7eyBlbmFibGVUcmFuc3BhcmVudFRoZW1lcyB9fVwiIGlkPVwiZW5hYmxlVHJhbnNwYXJlbnRUaGVtZXNcIiBzdHlsZT1cIm91dGxpbmU6IG5vbmU7XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9nZ2xlLXRvT1dNXCI+PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuPC9kaXY+XG5cbjxwIHN0eWxlPVwiY29sb3I6Z3JheTtcIj5UaGlzIG9wdGlvbiBoYXMgdG8gYmUgZW5hYmxlZCBmb3IgdGhlbWVzIHRoYXQgc3VwcG9ydCB0cmFuc3BhcmVuY3kgdG8gd29yay4gKGV4cGVyaW1lbnRhbCk8L3A+XG48YnIvPlxuXG48ZGl2IGNsYXNzPVwib3B0aW9uLXZGT0FTXCI+XG4gICAgPGRpdiBjbGFzcz1cImNvbnRlbnQtUDJUMGlcIj5cbiAgICAgICAgPGRpdiB0YWJpbmRleD1cIjBcIiB0aXRsZT1cIkNvbW11bml0eSBQbHVnaW5zICZhbXA7IFRoZW1lc1wiIGNsYXNzPVwiYnV0dG9uLURObVlMIGJ1dHRvbi1jb250YWluZXItelZMSDYgYnV0dG9uXCIgaWQ9XCJicm93c2VQbHVnaW5zVGhlbWVzQnRuXCI+XG4gICAgICAgICAgICBDb21tdW5pdHkgTWFya2V0cGxhY2VcbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG48L2Rpdj5cblxuPGRpdiBjbGFzcz1cIm9wdGlvbi12Rk9BU1wiPlxuICAgIDxkaXYgY2xhc3M9XCJjb250ZW50LVAyVDBpXCI+XG4gICAgICAgIDxkaXYgdGFiaW5kZXg9XCIwXCIgdGl0bGU9XCJDaGVjayBGb3IgVXBkYXRlc1wiIGNsYXNzPVwiYnV0dG9uLURObVlMIGJ1dHRvbi1jb250YWluZXItelZMSDYgYnV0dG9uXCIgaWQ9XCJjaGVja2ZvcnVwZGF0ZXNCdG5cIj5cbiAgICAgICAgICAgIENoZWNrIEZvciBVcGRhdGVzXG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuPC9kaXY+XG5cbjxici8+IiwgIjxkaXYgY2xhc3M9XCJvcHRpb24tdkZPQVNcIj5cbiAgICA8ZGl2IGNsYXNzPVwiaGVhZGluZy1kWU1EdFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibGFiZWwtcUk2VmhcIj5EZWZhdWx0PC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImNvbnRlbnQtUDJUMGlcIj5cbiAgICAgICAgPGRpdiBcbiAgICAgICAgdGl0bGU9XCJEZWZhdWx0XCIgXG4gICAgICAgIGlkPVwiRGVmYXVsdFwiIFxuICAgICAgICB0YWJpbmRleD1cIi0xXCJcbiAgICAgICAgb25jbGljaz1cImFwcGx5VGhlbWUoJ0RlZmF1bHQnKVwiXG4gICAgICAgIHN0eWxlPVwiY29sb3I6IHdoaXRlOyBtYXJnaW4tYm90dG9tOiAxcmVtOyB3aWR0aDogbWF4LWNvbnRlbnQ7IGJhY2tncm91bmQtY29sb3I6IHt7IGJhY2tncm91bmRDb2xvciB9fTtcIlxuICAgICAgICBjbGFzcz1cImJ1dHRvbiBidXR0b24tY29udGFpbmVyLXpWTEg2IHt7IGRpc2FibGVkIH19XCJcbiAgICAgICAgPnt7IGxhYmVsIH19PC9kaXY+XG4gICAgPC9kaXY+XG48L2Rpdj5cbiIsICI8ZGl2IHRhYmluZGV4PVwiLTFcIiBjbGFzcz1cImJ1dHRvbi1jb250YWluZXIteFQ5X0wgYmFjay1idXR0b24tY29udGFpbmVyLWxEQjFOIGJ1dHRvbi1jb250YWluZXItelZMSDZcIiBpZD1cImJhY2stYnRuXCI+XG4gICAgPHN2ZyBjbGFzcz1cImljb24tVDhNVTZcIiB2aWV3Qm94PVwiMCAwIDUxMiA1MTJcIj5cbiAgICAgICAgPHBhdGggZD1cIk0zMjguNjEwMDAwMDAwMDAwNiAxMDYuNDY5bC0xNDMuNTMgMTM2Ljg4OSAxNDMuNTMgMTM2Ljg4OVwiIHN0eWxlPVwic3Ryb2tlOiBjdXJyZW50Y29sb3I7IHN0cm9rZS1saW5lY2FwOiByb3VuZDsgc3Ryb2tlLWxpbmVqb2luOiByb3VuZDsgc3Ryb2tlLXdpZHRoOiA0ODsgZmlsbDogbm9uZTtcIj48L3BhdGg+XG4gICAgPC9zdmc+XG48L2Rpdj4iLCAiPG5hdiBjbGFzcz1cInRpdGxlLWJhclwiPlxuICAgIDxkaXYgY2xhc3M9XCJ0aXRsZS1iYXItYnV0dG9uc1wiPlxuICAgICAgICA8ZGl2IGlkPVwibWluaW1pemVBcHAtYnRuXCIgdGl0bGU9XCJNaW5pbWl6ZVwiIGNsYXNzPVwiYnV0dG9uXCI+XG4gICAgICAgICAgICA8c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj5cbiAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTIwLDE0SDRWMTBIMjBcIiBzdHlsZT1cImZpbGw6d2hpdGU7XCI+PC9wYXRoPlxuICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGlkPVwibWF4aW1pemVBcHAtYnRuXCIgdGl0bGU9XCJNYXhpbWl6ZVwiIGNsYXNzPVwiYnV0dG9uXCI+XG4gICAgICAgICAgICA8c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj5cbiAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTMsM0gyMVYyMUgzVjNNNSw1VjE5SDE5VjVINVpcIiBzdHlsZT1cImZpbGw6d2hpdGU7XCI+PC9wYXRoPlxuICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGlkPVwiY2xvc2VBcHAtYnRuXCIgdGl0bGU9XCJDbG9zZVwiIGNsYXNzPVwiYnV0dG9uXCI+XG4gICAgICAgICAgICA8c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBzdHlsZT1cIndpZHRoOiAyNXB4OyBoZWlnaHQ6IDI1cHg7XCI+XG4gICAgICAgICAgICAgICAgPHBhdGggZD1cIk0xOSw2LjQxTDE3LjU5LDVMMTIsMTAuNTlMNi40MSw1TDUsNi40MUwxMC41OSwxMkw1LDE3LjU5TDYuNDEsMTlMMTIsMTMuNDFMMTcuNTksMTlMMTksMTcuNTlMMTMuNDEsMTJMMTksNi40MVpcIiBzdHlsZT1cImZpbGw6d2hpdGU7XCI+PC9wYXRoPlxuICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuXG4gICAgPHN0eWxlPlxuXHRcdGJvZHkgPiAqOm5vdCgudGl0bGUtYmFyKSB7XG5cdFx0XHRwYWRkaW5nLXRvcDogNDBweDsgXG5cdFx0fVxuXG4gICAgICAgIC5idXR0b24ge1xuICAgICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgLnRpdGxlLWJhciB7XG4gICAgICAgICAgICBwb3NpdGlvbjogZml4ZWQ7IFxuICAgICAgICAgICAgdG9wOiAwO1xuICAgICAgICAgICAgbGVmdDogMDtcbiAgICAgICAgICAgIHJpZ2h0OiAwO1xuICAgICAgICAgICAgaGVpZ2h0OiA0MHB4O1xuICAgICAgICAgICAgei1pbmRleDogOTk5OTtcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IHJnYmEoMCwwLDAsMC4xNSk7XG4gICAgICAgICAgICBiYWNrZHJvcC1maWx0ZXI6IGJsdXIoMjBweCkgc2F0dXJhdGUoMTIwJSk7XG5cdFx0XHQtd2Via2l0LWFwcC1yZWdpb246IGRyYWc7XG4gICAgICAgIH1cblxuICAgICAgICAudGl0bGUtYmFyLWJ1dHRvbnMge1xuICAgICAgICAgICAgLXdlYmtpdC1hcHAtcmVnaW9uOiBuby1kcmFnO1xuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgICBnYXA6IDIuMHJlbTtcbiAgICAgICAgICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xuXHRcdFx0bWFyZ2luLXJpZ2h0OiAyMHB4O1xuICAgICAgICB9XG5cbiAgICAgICAgLnRpdGxlLWJhci1idXR0b25zIHN2ZyB7XG4gICAgICAgICAgICB3aWR0aDogMjBweDtcbiAgICAgICAgICAgIGhlaWdodDogMjBweDtcbiAgICAgICAgfVxuICAgIDwvc3R5bGU+XG48L25hdj5cbiIsICJpbXBvcnQgbW9kc1RhYiBmcm9tICcuLi9jb21wb25lbnRzL21vZHMtdGFiL21vZHMtdGFiLmh0bWwnO1xuaW1wb3J0IG1vZHNJdGVtIGZyb20gJy4uL2NvbXBvbmVudHMvbW9kcy1pdGVtL21vZHMtaXRlbS5odG1sJztcbmltcG9ydCBhYm91dENhdGVnb3J5IGZyb20gJy4uL2NvbXBvbmVudHMvYWJvdXQtY2F0ZWdvcnkvYWJvdXQtY2F0ZWdvcnkuaHRtbCc7XG5pbXBvcnQgZGVmYXVsdFRoZW1lIGZyb20gJy4uL2NvbXBvbmVudHMvZGVmYXVsdC10aGVtZS9kZWZhdWx0LXRoZW1lLmh0bWwnO1xuaW1wb3J0IGJhY2tCdG4gZnJvbSAnLi4vY29tcG9uZW50cy9iYWNrLWJ0bi9iYWNrLWJ0bi5odG1sJztcbmltcG9ydCB0aXRsZUJhciBmcm9tICcuLi9jb21wb25lbnRzL3RpdGxlLWJhci90aXRsZS1iYXIuaHRtbCc7XG5cbmNvbnN0IHRlbXBsYXRlczogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcbiAgICAnbW9kcy10YWInOiBtb2RzVGFiLFxuICAgICdtb2RzLWl0ZW0nOiBtb2RzSXRlbSxcbiAgICAnYWJvdXQtY2F0ZWdvcnknOiBhYm91dENhdGVnb3J5LFxuICAgICdkZWZhdWx0LXRoZW1lJzogZGVmYXVsdFRoZW1lLFxuICAgICdiYWNrLWJ0bic6IGJhY2tCdG4sXG4gICAgJ3RpdGxlLWJhcic6IHRpdGxlQmFyLFxufTtcblxuY2xhc3MgVGVtcGxhdGVDYWNoZSB7XG4gICAgcHVibGljIHN0YXRpYyBsb2FkKGRpcjogc3RyaW5nLCBuYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICAvLyBXZSBpZ25vcmUgZGlyIGluIGJyb3dzZXIgYnVpbGRcbiAgICAgICAgcmV0dXJuIHRlbXBsYXRlc1tuYW1lXSB8fCBcIlwiO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVGVtcGxhdGVDYWNoZTtcbiIsICJpbXBvcnQgVGVtcGxhdGVDYWNoZSBmcm9tIFwiLi4vLi4vdXRpbHMvdGVtcGxhdGVDYWNoZVwiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0VG9hc3RUZW1wbGF0ZShpZDogc3RyaW5nLCB0aXRsZTogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcsIHN0YXR1czogXCJzdWNjZXNzXCIgfCBcImZhaWxcIiB8IFwiaW5mb1wiKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBjb25zdCB0ZW1wbGF0ZSA9IFRlbXBsYXRlQ2FjaGUubG9hZChfX2Rpcm5hbWUsICd0b2FzdCcpO1xuICAgIGxldCB0b2FzdFN0YXR1cztcblxuICAgIHN3aXRjaChzdGF0dXMpIHtcbiAgICAgICAgY2FzZSBcInN1Y2Nlc3NcIjpcbiAgICAgICAgICAgIHRvYXN0U3RhdHVzID0gXCJzdWNjZXNzLWVJRFRhXCI7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImZhaWxcIjpcbiAgICAgICAgICAgIHRvYXN0U3RhdHVzID0gXCJlcnJvci1xdXlPZFwiO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJpbmZvXCI6XG4gICAgICAgICAgICB0b2FzdFN0YXR1cyA9IFwiaW5mby1LRVdxOFwiO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiB0ZW1wbGF0ZVxuICAgICAgICAucmVwbGFjZShcInt7IGlkIH19XCIsIGlkKVxuICAgICAgICAucmVwbGFjZShcInt7IHRpdGxlIH19XCIsIHRpdGxlKVxuICAgICAgICAucmVwbGFjZShcInt7IG1lc3NhZ2UgfX1cIiwgbWVzc2FnZSlcbiAgICAgICAgLnJlcGxhY2UoXCJ7eyBzdGF0dXMgfX1cIiwgdG9hc3RTdGF0dXMpO1xufVxuIiwgImltcG9ydCB0eXBlIHsgQnJvd3NlcldpbmRvdywgTWVzc2FnZUJveE9wdGlvbnMgfSBmcm9tIFwiZWxlY3Ryb25cIjtcbmltcG9ydCBsb2dnZXIgZnJvbSBcIi4vbG9nZ2VyXCI7XG5pbXBvcnQgeyBTRUxFQ1RPUlMsIFRJTUVPVVRTIH0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgZ2V0VG9hc3RUZW1wbGF0ZSB9IGZyb20gXCIuLi9jb21wb25lbnRzL3RvYXN0L3RvYXN0XCI7XG5cbmNsYXNzIEhlbHBlcnMge1xuICAgIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBIZWxwZXJzO1xuICAgIHByaXZhdGUgbWFpbldpbmRvdzogQnJvd3NlcldpbmRvdyB8IG51bGwgPSBudWxsO1xuICAgIFxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKSB7fVxuICAgIFxuICAgIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBIZWxwZXJzIHtcbiAgICAgICAgaWYgKCFIZWxwZXJzLmluc3RhbmNlKSB7XG4gICAgICAgICAgICBIZWxwZXJzLmluc3RhbmNlID0gbmV3IEhlbHBlcnMoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gSGVscGVycy5pbnN0YW5jZTtcbiAgICB9XG4gICAgXG4gICAgc2V0TWFpbldpbmRvdyhtYWluV2luZG93OiBCcm93c2VyV2luZG93KTogdm9pZCB7XG4gICAgICAgIHRoaXMubWFpbldpbmRvdyA9IG1haW5XaW5kb3c7XG4gICAgfVxuICAgIFxuICAgIGFzeW5jIHNob3dBbGVydChcbiAgICAgICAgYWxlcnRUeXBlOiAnaW5mbycgfCAnd2FybmluZycgfCAnZXJyb3InLCBcbiAgICAgICAgdGl0bGU6IHN0cmluZywgXG4gICAgICAgIG1lc3NhZ2U6IHN0cmluZywgXG4gICAgICAgIGJ1dHRvbnM6IHN0cmluZ1tdXG4gICAgKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgICAgICAgY29uc3Qgb3B0aW9uczogTWVzc2FnZUJveE9wdGlvbnMgPSB7XG4gICAgICAgICAgICB0eXBlOiBhbGVydFR5cGUsXG4gICAgICAgICAgICB0aXRsZSxcbiAgICAgICAgICAgIG1lc3NhZ2UsXG4gICAgICAgICAgICBidXR0b25zXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgICAgICAgICAgdHlwZW9mICh3aW5kb3cgYXMgdHlwZW9mIHdpbmRvdyAmIHsgQ2FwYWNpdG9yPzogdW5rbm93biB9KS5DYXBhY2l0b3IgIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgICAgICAgIHR5cGVvZiB3aW5kb3cuYWxlcnQgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgICApIHtcbiAgICAgICAgICAgIHdpbmRvdy5hbGVydChbdGl0bGUsIG1lc3NhZ2VdLmZpbHRlcihCb29sZWFuKS5qb2luKFwiXFxuXFxuXCIpKTtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgeyBkaWFsb2cgfSA9IGF3YWl0IGltcG9ydChcImVsZWN0cm9uXCIpO1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBkaWFsb2cuc2hvd01lc3NhZ2VCb3godGhpcy5tYWluV2luZG93ISwgb3B0aW9ucyk7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UucmVzcG9uc2U7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBsb2dnZXIuZXJyb3IoJ0Vycm9yIGRpc3BsYXlpbmcgYWxlcnQ6ICcgKyAoZXJyb3IgYXMgRXJyb3IpLm1lc3NhZ2UpO1xuICAgICAgICAgICAgcmV0dXJuIC0xOyBcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICB3YWl0Rm9yRWxtKHNlbGVjdG9yOiBzdHJpbmcsIHRpbWVvdXQ6IG51bWJlciA9IFRJTUVPVVRTLkVMRU1FTlRfV0FJVCk6IFByb21pc2U8RWxlbWVudD4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZXhpc3RpbmdFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgICAgICBpZiAoZXhpc3RpbmdFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoZXhpc3RpbmdFbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShlbGVtZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5ib2R5LCB7XG4gICAgICAgICAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgICAgICAgICAgIHN1YnRyZWU6IHRydWVcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihgVGltZW91dCB3YWl0aW5nIGZvciBlbGVtZW50IHdpdGggc2VsZWN0b3I6ICR7c2VsZWN0b3J9YCkpO1xuICAgICAgICAgICAgfSwgdGltZW91dCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHdhaXRGb3JFbG1CeVhQYXRoKHhwYXRoOiBzdHJpbmcsIHRpbWVvdXQ6IG51bWJlciA9IFRJTUVPVVRTLkVMRU1FTlRfV0FJVCk6IFByb21pc2U8Tm9kZT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZXZhbHVhdGVYUGF0aCA9ICgpOiBOb2RlIHwgbnVsbCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gZG9jdW1lbnQuZXZhbHVhdGUoXG4gICAgICAgICAgICAgICAgICAgIHhwYXRoLCBcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQsIFxuICAgICAgICAgICAgICAgICAgICBudWxsLCBcbiAgICAgICAgICAgICAgICAgICAgWFBhdGhSZXN1bHQuRklSU1RfT1JERVJFRF9OT0RFX1RZUEUsIFxuICAgICAgICAgICAgICAgICAgICBudWxsXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LnNpbmdsZU5vZGVWYWx1ZTtcbiAgICAgICAgICAgIH07XG4gICAgXG4gICAgICAgICAgICBjb25zdCBleGlzdGluZ0VsZW1lbnQgPSBldmFsdWF0ZVhQYXRoKCk7XG4gICAgICAgICAgICBpZiAoZXhpc3RpbmdFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoZXhpc3RpbmdFbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGV2YWx1YXRlWFBhdGgoKTtcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgXG4gICAgICAgICAgICBvYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmJvZHksIHtcbiAgICAgICAgICAgICAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgc3VidHJlZTogdHJ1ZVxuICAgICAgICAgICAgfSk7XG4gICAgXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihgVGltZW91dCB3YWl0aW5nIGZvciBlbGVtZW50IHdpdGggWFBhdGg6ICR7eHBhdGh9YCkpO1xuICAgICAgICAgICAgfSwgdGltZW91dCk7XG4gICAgICAgIH0pO1xuICAgIH0gICAgXG5cbiAgICB3YWl0Rm9yVGl0bGVDaGFuZ2UodGltZW91dDogbnVtYmVyID0gVElNRU9VVFMuRUxFTUVOVF9XQUlUKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGhlYWRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZCcpO1xuICAgICAgICAgICAgaWYgKCFoZWFkRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QobmV3IEVycm9yKCdIZWFkIGVsZW1lbnQgbm90IGZvdW5kJykpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShkb2N1bWVudC50aXRsZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShoZWFkRWxlbWVudCwge1xuICAgICAgICAgICAgICAgIHN1YnRyZWU6IHRydWUsXG4gICAgICAgICAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIG9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKCdUaW1lb3V0IHdhaXRpbmcgZm9yIGRvY3VtZW50LnRpdGxlIHRvIGNoYW5nZScpKTtcbiAgICAgICAgICAgIH0sIHRpbWVvdXQpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgY3JlYXRlVG9hc3QodG9hc3RJZDogc3RyaW5nLCB0aXRsZTogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcsIHN0YXR1czogXCJzdWNjZXNzXCIgfCBcImZhaWxcIiB8IFwiaW5mb1wiLCB0aW1lb3V0TXM6bnVtYmVyID0gMzAwMCkge1xuICAgICAgICBjb25zdCB0ZW1wbGF0ZSA9IGF3YWl0IGdldFRvYXN0VGVtcGxhdGUodG9hc3RJZCwgdGl0bGUsIG1lc3NhZ2UsIHN0YXR1cyk7XG4gICAgICAgIGNvbnN0IHRvYXN0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihTRUxFQ1RPUlMuVE9BU1RfQ09OVEFJTkVSKTtcbiAgICAgICAgaWYodG9hc3RDb250YWluZXIpIHtcbiAgICAgICAgICAgIHRvYXN0Q29udGFpbmVyLmlubmVySFRNTCArPSB0ZW1wbGF0ZTtcblxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodG9hc3RJZCk/LnJlbW92ZSgpO1xuICAgICAgICAgICAgfSwgdGltZW91dE1zKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEV4ZWN1dGUgSmF2YVNjcmlwdCBpbiB0aGUgY29udGV4dCBvZiBTdHJlbWlvJ3MgY29yZSBzZXJ2aWNlc1xuICAgICAqIEBwYXJhbSBqcyAtIEphdmFTY3JpcHQgY29kZSB0byBleGVjdXRlXG4gICAgICogQHJldHVybnMgUHJvbWlzZSB3aXRoIHRoZSByZXN1bHQgb2YgdGhlIGV4ZWN1dGlvblxuICAgICAqL1xuICAgIHB1YmxpYyBfZXZhbChqczogc3RyaW5nKTogUHJvbWlzZTx1bmtub3duPiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGV2ZW50TmFtZSA9ICdzdHJlbWlvLWVuaGFuY2VkJztcbiAgICAgICAgICAgICAgICBjb25zdCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBjb25zdCBoYW5kbGVyID0gKGRhdGE6IEV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNjcmlwdC5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgoZGF0YSBhcyBDdXN0b21FdmVudCkuZGV0YWlsKTtcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBoYW5kbGVyLCB7IG9uY2U6IHRydWUgfSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgc2NyaXB0LmlkID0gZXZlbnROYW1lO1xuICAgICAgICAgICAgICAgIHNjcmlwdC5hcHBlbmRDaGlsZChcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoYFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvcmUgPSB3aW5kb3cuc2VydmljZXMuY29yZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSAke2pzfTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnRoZW4oKGF3YWl0ZWRSZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KFwiJHtldmVudE5hbWV9XCIsIHsgZGV0YWlsOiBhd2FpdGVkUmVzdWx0IH0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KFwiJHtldmVudE5hbWV9XCIsIHsgZGV0YWlsOiByZXN1bHQgfSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBgKSxcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldEVsZW1lbnRCeVhwYXRoKHBhdGg6IHN0cmluZyk6IE5vZGUgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LmV2YWx1YXRlKFxuICAgICAgICAgICAgcGF0aCwgXG4gICAgICAgICAgICBkb2N1bWVudCwgXG4gICAgICAgICAgICBudWxsLCBcbiAgICAgICAgICAgIFhQYXRoUmVzdWx0LkZJUlNUX09SREVSRURfTk9ERV9UWVBFLCBcbiAgICAgICAgICAgIG51bGxcbiAgICAgICAgKS5zaW5nbGVOb2RlVmFsdWU7XG4gICAgfVxuXG4gICAgcHVibGljIGdldEZpbGVOYW1lRnJvbVVybCh1cmw6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IHBhcnRzID0gdXJsLnNwbGl0KCcvJyk7XG4gICAgICAgIHJldHVybiBwYXJ0c1twYXJ0cy5sZW5ndGggLSAxXSB8fCAnJztcbiAgICB9XG5cbiAgICBwdWJsaWMgZm9ybWF0VGltZShzZWNvbmRzOiBudW1iZXIpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBob3VycyA9IE1hdGguZmxvb3Ioc2Vjb25kcyAvIDM2MDApO1xuICAgICAgICBjb25zdCBtaW51dGVzID0gTWF0aC5mbG9vcigoc2Vjb25kcyAlIDM2MDApIC8gNjApO1xuICAgICAgICBjb25zdCByZW1haW5pbmdTZWNvbmRzID0gTWF0aC5mbG9vcihzZWNvbmRzICUgNjApO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGAke1N0cmluZyhob3VycykucGFkU3RhcnQoMiwgJzAnKX06JHtTdHJpbmcobWludXRlcykucGFkU3RhcnQoMiwgJzAnKX06JHtTdHJpbmcocmVtYWluaW5nU2Vjb25kcykucGFkU3RhcnQoMiwgJzAnKX1gO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbXBhcmUgdHdvIHNlbWFudGljIHZlcnNpb24gc3RyaW5nc1xuICAgICAqIEByZXR1cm5zIHRydWUgaWYgdmVyc2lvbjEgPiB2ZXJzaW9uMlxuICAgICAqL1xuICAgIHB1YmxpYyBpc05ld2VyVmVyc2lvbih2ZXJzaW9uMTogc3RyaW5nLCB2ZXJzaW9uMjogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IG5vcm1hbGl6ZSA9ICh2OiBzdHJpbmcpOiBudW1iZXJbXSA9PiBcbiAgICAgICAgICAgIHYucmVwbGFjZSgvXnYvLCAnJykuc3BsaXQoJy4nKS5tYXAobiA9PiBwYXJzZUludChuLCAxMCkgfHwgMCk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCB2MVBhcnRzID0gbm9ybWFsaXplKHZlcnNpb24xKTtcbiAgICAgICAgY29uc3QgdjJQYXJ0cyA9IG5vcm1hbGl6ZSh2ZXJzaW9uMik7XG4gICAgICAgIGNvbnN0IG1heExlbmd0aCA9IE1hdGgubWF4KHYxUGFydHMubGVuZ3RoLCB2MlBhcnRzLmxlbmd0aCk7XG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1heExlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCB2MSA9IHYxUGFydHNbaV0gPz8gMDtcbiAgICAgICAgICAgIGNvbnN0IHYyID0gdjJQYXJ0c1tpXSA/PyAwO1xuICAgICAgICAgICAgaWYgKHYxID4gdjIpIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgaWYgKHYxIDwgdjIpIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuXG5jb25zdCBoZWxwZXJzSW5zdGFuY2UgPSBIZWxwZXJzLmdldEluc3RhbmNlKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGhlbHBlcnNJbnN0YW5jZTtcbiIsICJpbXBvcnQgVGVtcGxhdGVDYWNoZSBmcm9tICcuLi8uLi91dGlscy90ZW1wbGF0ZUNhY2hlJztcbmltcG9ydCB7IE1ldGFEYXRhIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9NZXRhRGF0YSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQbHVnaW5JdGVtVGVtcGxhdGUoXG4gICAgZmlsZW5hbWU6IHN0cmluZywgXG4gICAgbWV0YURhdGE6IE1ldGFEYXRhLFxuICAgIGNoZWNrZWQ6IGJvb2xlYW5cbik6IHN0cmluZyB7XG4gICAgbGV0IHRlbXBsYXRlID0gVGVtcGxhdGVDYWNoZS5sb2FkKF9fZGlybmFtZSwgJ3BsdWdpbi1pdGVtJyk7XG4gICAgXG4gICAgLy8gUmVwbGFjZSBtZXRhZGF0YSBwbGFjZWhvbGRlcnNcbiAgICBjb25zdCBtZXRhS2V5cyA9IFsnbmFtZScsICdkZXNjcmlwdGlvbicsICdhdXRob3InLCAndmVyc2lvbiddIGFzIGNvbnN0O1xuICAgIG1ldGFLZXlzLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgY29uc3QgcmVnZXggPSBuZXcgUmVnRXhwKGB7e1xcXFxzKiR7a2V5fVxcXFxzKn19YCwgJ2cnKTtcbiAgICAgICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZS5yZXBsYWNlKHJlZ2V4LCBtZXRhRGF0YVtrZXldIHx8ICcnKTtcbiAgICB9KTtcblxuICAgIHJldHVybiB0ZW1wbGF0ZVxuICAgICAgICAucmVwbGFjZShcInt7IGNoZWNrZWQgfX1cIiwgY2hlY2tlZCA/IFwiY2hlY2tlZFwiIDogXCJcIilcbiAgICAgICAgLnJlcGxhY2UoL1xce1xce1xccypmaWxlTmFtZVxccypcXH1cXH0vZywgZmlsZW5hbWUpO1xufVxuIiwgImltcG9ydCBUZW1wbGF0ZUNhY2hlIGZyb20gJy4uLy4uL3V0aWxzL3RlbXBsYXRlQ2FjaGUnO1xuaW1wb3J0IHsgTWV0YURhdGEgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL01ldGFEYXRhJztcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRoZW1lSXRlbVRlbXBsYXRlKFxuICAgIGZpbGVuYW1lOiBzdHJpbmcsIFxuICAgIG1ldGFEYXRhOiBNZXRhRGF0YSxcbiAgICBhcHBsaWVkOiBib29sZWFuXG4pOiBzdHJpbmcge1xuICAgIGxldCB0ZW1wbGF0ZSA9IFRlbXBsYXRlQ2FjaGUubG9hZChfX2Rpcm5hbWUsICd0aGVtZS1pdGVtJyk7XG4gICAgXG4gICAgLy8gUmVwbGFjZSBtZXRhZGF0YSBwbGFjZWhvbGRlcnNcbiAgICBjb25zdCBtZXRhS2V5cyA9IFsnbmFtZScsICdkZXNjcmlwdGlvbicsICdhdXRob3InLCAndmVyc2lvbiddIGFzIGNvbnN0O1xuICAgIG1ldGFLZXlzLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgY29uc3QgcmVnZXggPSBuZXcgUmVnRXhwKGB7e1xcXFxzKiR7a2V5fVxcXFxzKn19YCwgJ2cnKTtcbiAgICAgICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZS5yZXBsYWNlKHJlZ2V4LCBtZXRhRGF0YVtrZXldIHx8ICcnKTtcbiAgICB9KTtcblxuICAgIHJldHVybiB0ZW1wbGF0ZVxuICAgICAgICAucmVwbGFjZShcInt7IGRpc2FibGVkIH19XCIsIGFwcGxpZWQgPyBcImRpc2FibGVkXCIgOiBcIlwiKVxuICAgICAgICAucmVwbGFjZSgvXFx7XFx7XFxzKmZpbGVOYW1lXFxzKlxcfVxcfS9nLCBmaWxlbmFtZSlcbiAgICAgICAgLnJlcGxhY2UoXCJ7eyBsYWJlbCB9fVwiLCBhcHBsaWVkID8gXCJBcHBsaWVkXCIgOiBcIkFwcGx5XCIpXG4gICAgICAgIC5yZXBsYWNlKFwie3sgYnV0dG9uQ2xhc3MgfX1cIiwgYXBwbGllZCA/IFwidW5pbnN0YWxsLWJ1dHRvbi1jb250YWluZXItb1Y0WW9cIiA6IFwiaW5zdGFsbC1idXR0b24tY29udGFpbmVyLXlmY3E1XCIpO1xufVxuIiwgImltcG9ydCBUZW1wbGF0ZUNhY2hlIGZyb20gJy4uLy4uL3V0aWxzL3RlbXBsYXRlQ2FjaGUnO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RW5oYW5jZWROYXYoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gVGVtcGxhdGVDYWNoZS5sb2FkKF9fZGlybmFtZSwgJ2VuaGFuY2VkLW5hdicpO1xufVxuIiwgImltcG9ydCB7IFBsYXRmb3JtTWFuYWdlciB9IGZyb20gXCIuLi9wbGF0Zm9ybS9QbGF0Zm9ybU1hbmFnZXJcIjtcblxuY2xhc3MgUHJvcGVydGllcyB7XG4gICAgcHVibGljIHN0YXRpYyB0aGVtZUxpbmtTZWxlY3Rvcjogc3RyaW5nID0gXCJoZWFkID4gbGlua1tyZWw9c3R5bGVzaGVldF1cIjtcblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IGVuaGFuY2VkUGF0aCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gUGxhdGZvcm1NYW5hZ2VyLmN1cnJlbnQuZ2V0RW5oYW5jZWRQYXRoKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXQgdGhlbWVzUGF0aCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gUGxhdGZvcm1NYW5hZ2VyLmN1cnJlbnQuZ2V0VGhlbWVzUGF0aCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IHBsdWdpbnNQYXRoKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC5nZXRQbHVnaW5zUGF0aCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgaXNVc2luZ1N0cmVtaW9TZXJ2aWNlID0gZmFsc2U7XG59XG5cbmV4cG9ydCBkZWZhdWx0IFByb3BlcnRpZXM7XG4iLCAiZXhwb3J0IGZ1bmN0aW9uIGdldEFwcGx5VGhlbWVUZW1wbGF0ZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiBgXG4gICAgZnVuY3Rpb24gYXBwbHlUaGVtZSh0aGVtZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcImFwcGx5aW5nIFwiICsgdGhlbWUpO1xuXG4gICAgICAgIC8vIENhbGwgdGhlIG5hdGl2ZS9wcmVsb2FkIGhhbmRsZXIgdG8gYWN0dWFsbHkgbG9hZCB0aGUgQ1NTXG4gICAgICAgIGlmICh3aW5kb3cuc3RyZW1pb0VuaGFuY2VkICYmIHdpbmRvdy5zdHJlbWlvRW5oYW5jZWQuYXBwbHlUaGVtZSkge1xuICAgICAgICAgICAgd2luZG93LnN0cmVtaW9FbmhhbmNlZC5hcHBseVRoZW1lKHRoZW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFVJIFVwZGF0ZXNcbiAgICAgICAgY29uc3QgY3VycmVudFRoZW1lID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJjdXJyZW50VGhlbWVcIik7XG4gICAgICAgIGlmIChjdXJyZW50VGhlbWUpIHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRUaGVtZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjdXJyZW50VGhlbWUpO1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRUaGVtZUVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50VGhlbWVFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJkaXNhYmxlZFwiKTtcblxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50VGhlbWUgIT09IFwiRGVmYXVsdFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRUaGVtZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcInVuaW5zdGFsbC1idXR0b24tY29udGFpbmVyLW9WNFlvXCIpO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50VGhlbWVFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJpbnN0YWxsLWJ1dHRvbi1jb250YWluZXIteWZjcTVcIik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFRoZW1lRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInZhcigtLXNlY29uZGFyeS1hY2NlbnQtY29sb3IpXCI7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY3VycmVudFRoZW1lRWxlbWVudC5pbm5lclRleHQgPSBcIkFwcGx5XCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImN1cnJlbnRUaGVtZVwiLCB0aGVtZSk7XG5cbiAgICAgICAgY29uc3QgbmV3VGhlbWVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhlbWUpO1xuICAgICAgICBpZiAobmV3VGhlbWVFbGVtZW50KSB7XG4gICAgICAgICAgICBuZXdUaGVtZUVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImRpc2FibGVkXCIpO1xuXG4gICAgICAgICAgICBpZiAodGhlbWUgIT09IFwiRGVmYXVsdFwiKSB7XG4gICAgICAgICAgICAgICAgbmV3VGhlbWVFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJpbnN0YWxsLWJ1dHRvbi1jb250YWluZXIteWZjcTVcIik7XG4gICAgICAgICAgICAgICAgbmV3VGhlbWVFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJ1bmluc3RhbGwtYnV0dG9uLWNvbnRhaW5lci1vVjRZb1wiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbmV3VGhlbWVFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwidmFyKC0tb3ZlcmxheS1jb2xvcilcIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbmV3VGhlbWVFbGVtZW50LmlubmVyVGV4dCA9IFwiQXBwbGllZFwiO1xuICAgICAgICB9XG4gICAgfVxuICAgIGA7XG59XG4iLCAiaW1wb3J0IFNldHRpbmdzIGZyb20gXCIuL1NldHRpbmdzXCI7XG5pbXBvcnQgeyBQbGF0Zm9ybU1hbmFnZXIgfSBmcm9tIFwiLi4vcGxhdGZvcm0vUGxhdGZvcm1NYW5hZ2VyXCI7XG5pbXBvcnQgcHJvcGVydGllcyBmcm9tIFwiLi9Qcm9wZXJ0aWVzXCI7XG5pbXBvcnQgaGVscGVycyBmcm9tIFwiLi4vdXRpbHMvSGVscGVyc1wiO1xuaW1wb3J0IHsgTWV0YURhdGEgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9NZXRhRGF0YVwiO1xuaW1wb3J0IHsgZ2V0TG9nZ2VyIH0gZnJvbSBcIi4uL3V0aWxzL2xvZ2dlclwiO1xuaW1wb3J0IFByb3BlcnRpZXMgZnJvbSBcIi4vUHJvcGVydGllc1wiO1xuaW1wb3J0IHsgZ2V0QXBwbHlUaGVtZVRlbXBsYXRlIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvYXBwbHktdGhlbWUvYXBwbHlUaGVtZVwiO1xuaW1wb3J0IHsgYmFzZW5hbWUsIGpvaW4gfSBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgU1RPUkFHRV9LRVlTLCBTRUxFQ1RPUlMsIENMQVNTRVMsIFVSTFMgfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgRXh0cmFjdE1ldGFEYXRhIGZyb20gXCIuLi91dGlscy9FeHRyYWN0TWV0YURhdGFcIjtcblxuY2xhc3MgTW9kTWFuYWdlciB7XG4gICAgcHJpdmF0ZSBzdGF0aWMgbG9nZ2VyID0gZ2V0TG9nZ2VyKFwiTW9kTWFuYWdlclwiKTtcbiAgICBcbiAgICAvKipcbiAgICAgKiBMb2FkIGFuZCBlbmFibGUgYSBwbHVnaW4gYnkgZmlsZW5hbWVcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGFzeW5jIGxvYWRQbHVnaW4ocGx1Z2luTmFtZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwbHVnaW5OYW1lKSkge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIuaW5mbyhgUGx1Z2luICR7cGx1Z2luTmFtZX0gaXMgYWxyZWFkeSBsb2FkZWRgKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHBsdWdpblBhdGggPSBqb2luKHByb3BlcnRpZXMucGx1Z2luc1BhdGgsIHBsdWdpbk5hbWUpO1xuICAgICAgICBcbiAgICAgICAgaWYgKCFhd2FpdCBQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC5leGlzdHMocGx1Z2luUGF0aCkpIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLmVycm9yKGBQbHVnaW4gZmlsZSBub3QgZm91bmQ6ICR7cGx1Z2luUGF0aH1gKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHBsdWdpbiA9IGF3YWl0IFBsYXRmb3JtTWFuYWdlci5jdXJyZW50LnJlYWRGaWxlKHBsdWdpblBhdGgpO1xuICAgICAgICBjb25zdCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuICAgICAgICBzY3JpcHQuaW5uZXJIVE1MID0gcGx1Z2luO1xuICAgICAgICBzY3JpcHQuaWQgPSBwbHVnaW5OYW1lO1xuICAgICAgICBcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgZW5hYmxlZFBsdWdpbnM6IHN0cmluZ1tdID0gSlNPTi5wYXJzZShcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5nZXRJdGVtKFNUT1JBR0VfS0VZUy5FTkFCTEVEX1BMVUdJTlMpIHx8IFwiW11cIlxuICAgICAgICApO1xuICAgICAgICBcbiAgICAgICAgaWYgKCFlbmFibGVkUGx1Z2lucy5pbmNsdWRlcyhwbHVnaW5OYW1lKSkge1xuICAgICAgICAgICAgZW5hYmxlZFBsdWdpbnMucHVzaChwbHVnaW5OYW1lKTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFNUT1JBR0VfS0VZUy5FTkFCTEVEX1BMVUdJTlMsIEpTT04uc3RyaW5naWZ5KGVuYWJsZWRQbHVnaW5zKSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMubG9nZ2VyLmluZm8oYFBsdWdpbiAke3BsdWdpbk5hbWV9IGxvYWRlZCFgKTtcbiAgICB9XG4gICAgXG4gICAgLyoqXG4gICAgICogVW5sb2FkIGFuZCBkaXNhYmxlIGEgcGx1Z2luIGJ5IGZpbGVuYW1lXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyB1bmxvYWRQbHVnaW4ocGx1Z2luTmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHBsdWdpbkVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwbHVnaW5OYW1lKTtcbiAgICAgICAgaWYgKHBsdWdpbkVsZW1lbnQpIHtcbiAgICAgICAgICAgIHBsdWdpbkVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCBlbmFibGVkUGx1Z2luczogc3RyaW5nW10gPSBKU09OLnBhcnNlKFxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLmdldEl0ZW0oU1RPUkFHRV9LRVlTLkVOQUJMRURfUExVR0lOUykgfHwgXCJbXVwiXG4gICAgICAgICk7XG4gICAgICAgIGVuYWJsZWRQbHVnaW5zID0gZW5hYmxlZFBsdWdpbnMuZmlsdGVyKCh4OiBzdHJpbmcpID0+IHggIT09IHBsdWdpbk5hbWUpO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShTVE9SQUdFX0tFWVMuRU5BQkxFRF9QTFVHSU5TLCBKU09OLnN0cmluZ2lmeShlbmFibGVkUGx1Z2lucykpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5sb2dnZXIuaW5mbyhgUGx1Z2luICR7cGx1Z2luTmFtZX0gdW5sb2FkZWQhYCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRmV0Y2ggbW9kcyBmcm9tIHRoZSByZWdpc3RyeSByZXBvc2l0b3J5XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBhc3luYyBmZXRjaE1vZHMoKTogUHJvbWlzZTx7IHBsdWdpbnM6IHVua25vd25bXTsgdGhlbWVzOiB1bmtub3duW10gfT4ge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFVSTFMuUkVHSVNUUlkpO1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERvd25sb2FkIGFuZCBzYXZlIGEgbW9kIChwbHVnaW4gb3IgdGhlbWUpXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBhc3luYyBkb3dubG9hZE1vZChtb2RMaW5rOiBzdHJpbmcsIHR5cGU6IFwicGx1Z2luXCIgfCBcInRoZW1lXCIpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKGBEb3dubG9hZGluZyAke3R5cGV9IGZyb206ICR7bW9kTGlua31gKTtcblxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKG1vZExpbmspO1xuICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBkb3dubG9hZDogJHtyZXNwb25zZS5zdGF0dXN9ICR7cmVzcG9uc2Uuc3RhdHVzVGV4dH1gKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHNhdmVEaXIgPSB0eXBlID09PSBcInBsdWdpblwiID8gUHJvcGVydGllcy5wbHVnaW5zUGF0aCA6IFByb3BlcnRpZXMudGhlbWVzUGF0aDtcbiAgICAgICAgaWYgKCFhd2FpdCBQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC5leGlzdHMoc2F2ZURpcikpIHtcbiAgICAgICAgICAgIGF3YWl0IFBsYXRmb3JtTWFuYWdlci5jdXJyZW50Lm1rZGlyKHNhdmVEaXIpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBjb25zdCBmaWxlbmFtZSA9IGJhc2VuYW1lKG5ldyBVUkwobW9kTGluaykucGF0aG5hbWUpIHx8IGAke3R5cGV9LSR7RGF0ZS5ub3coKX1gO1xuICAgICAgICBjb25zdCBmaWxlUGF0aCA9IGpvaW4oc2F2ZURpciwgZmlsZW5hbWUpO1xuXG4gICAgICAgIGNvbnN0IGNvbnRlbnQgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XG4gICAgICAgIGF3YWl0IFBsYXRmb3JtTWFuYWdlci5jdXJyZW50LndyaXRlRmlsZShmaWxlUGF0aCwgY29udGVudCk7XG5cbiAgICAgICAgdGhpcy5sb2dnZXIuaW5mbyhgRG93bmxvYWRlZCAke3R5cGV9IHNhdmVkIHRvOiAke2ZpbGVQYXRofWApO1xuICAgICAgICByZXR1cm4gZmlsZVBhdGg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGEgbW9kIGZpbGUgYW5kIGNsZWFuIHVwIGFzc29jaWF0ZWQgc3RhdGVcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGFzeW5jIHJlbW92ZU1vZChmaWxlTmFtZTogc3RyaW5nLCB0eXBlOiBcInBsdWdpblwiIHwgXCJ0aGVtZVwiKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHRoaXMubG9nZ2VyLmluZm8oYFJlbW92aW5nICR7dHlwZX0gZmlsZTogJHtmaWxlTmFtZX1gKTtcblxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJwbHVnaW5cIjpcbiAgICAgICAgICAgICAgICBpZiAoYXdhaXQgdGhpcy5pc1BsdWdpbkluc3RhbGxlZChmaWxlTmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgUGxhdGZvcm1NYW5hZ2VyLmN1cnJlbnQudW5saW5rKGpvaW4oUHJvcGVydGllcy5wbHVnaW5zUGF0aCwgZmlsZU5hbWUpKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGVuYWJsZWRQbHVnaW5zOiBzdHJpbmdbXSA9IEpTT04ucGFyc2UoXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShTVE9SQUdFX0tFWVMuRU5BQkxFRF9QTFVHSU5TKSB8fCBcIltdXCJcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVuYWJsZWRQbHVnaW5zLmluY2x1ZGVzKGZpbGVOYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW5hYmxlZFBsdWdpbnMgPSBlbmFibGVkUGx1Z2lucy5maWx0ZXIoKHg6IHN0cmluZykgPT4geCAhPT0gZmlsZU5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oU1RPUkFHRV9LRVlTLkVOQUJMRURfUExVR0lOUywgSlNPTi5zdHJpbmdpZnkoZW5hYmxlZFBsdWdpbnMpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJ0aGVtZVwiOlxuICAgICAgICAgICAgICAgIGlmIChhd2FpdCB0aGlzLmlzVGhlbWVJbnN0YWxsZWQoZmlsZU5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbShTVE9SQUdFX0tFWVMuQ1VSUkVOVF9USEVNRSkgPT09IGZpbGVOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShTVE9SQUdFX0tFWVMuQ1VSUkVOVF9USEVNRSwgXCJEZWZhdWx0XCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWN0aXZlVGhlbWVcIik/LnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC51bmxpbmsoam9pbihQcm9wZXJ0aWVzLnRoZW1lc1BhdGgsIGZpbGVOYW1lKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBhc3luYyBpc1RoZW1lSW5zdGFsbGVkKGZpbGVOYW1lOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgcmV0dXJuIChhd2FpdCB0aGlzLmdldEluc3RhbGxlZFRoZW1lcygpKS5pbmNsdWRlcyhmaWxlTmFtZSk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBhc3luYyBpc1BsdWdpbkluc3RhbGxlZChmaWxlTmFtZTogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICAgIHJldHVybiAoYXdhaXQgdGhpcy5nZXRJbnN0YWxsZWRQbHVnaW5zKCkpLmluY2x1ZGVzKGZpbGVOYW1lKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBhc3luYyBnZXRJbnN0YWxsZWRUaGVtZXMoKTogUHJvbWlzZTxzdHJpbmdbXT4ge1xuICAgICAgICBjb25zdCBkaXJQYXRoID0gUHJvcGVydGllcy50aGVtZXNQYXRoO1xuICAgICAgICBpZiAoIWF3YWl0IFBsYXRmb3JtTWFuYWdlci5jdXJyZW50LmV4aXN0cyhkaXJQYXRoKSkgcmV0dXJuIFtdO1xuXG4gICAgICAgIGNvbnN0IGZpbGVzID0gYXdhaXQgUGxhdGZvcm1NYW5hZ2VyLmN1cnJlbnQucmVhZGRpcihkaXJQYXRoKTtcbiAgICAgICAgY29uc3QgZmlsZVN0YXRzID0gYXdhaXQgUHJvbWlzZS5hbGwoZmlsZXMubWFwKGFzeW5jIGZpbGUgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc3RhdCA9IGF3YWl0IFBsYXRmb3JtTWFuYWdlci5jdXJyZW50LnN0YXQoam9pbihkaXJQYXRoLCBmaWxlKSk7XG4gICAgICAgICAgICByZXR1cm4geyBmaWxlLCBpc0ZpbGU6IHN0YXQuaXNGaWxlIH07XG4gICAgICAgIH0pKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmaWxlU3RhdHMuZmlsdGVyKGYgPT4gZi5pc0ZpbGUpLm1hcChmID0+IGYuZmlsZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgYXN5bmMgZ2V0SW5zdGFsbGVkUGx1Z2lucygpOiBQcm9taXNlPHN0cmluZ1tdPiB7XG4gICAgICAgIGNvbnN0IGRpclBhdGggPSBQcm9wZXJ0aWVzLnBsdWdpbnNQYXRoO1xuICAgICAgICBpZiAoIWF3YWl0IFBsYXRmb3JtTWFuYWdlci5jdXJyZW50LmV4aXN0cyhkaXJQYXRoKSkgcmV0dXJuIFtdO1xuXG4gICAgICAgIGNvbnN0IGZpbGVzID0gYXdhaXQgUGxhdGZvcm1NYW5hZ2VyLmN1cnJlbnQucmVhZGRpcihkaXJQYXRoKTtcbiAgICAgICAgY29uc3QgZmlsZVN0YXRzID0gYXdhaXQgUHJvbWlzZS5hbGwoZmlsZXMubWFwKGFzeW5jIGZpbGUgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc3RhdCA9IGF3YWl0IFBsYXRmb3JtTWFuYWdlci5jdXJyZW50LnN0YXQoam9pbihkaXJQYXRoLCBmaWxlKSk7XG4gICAgICAgICAgICByZXR1cm4geyBmaWxlLCBpc0ZpbGU6IHN0YXQuaXNGaWxlIH07XG4gICAgICAgIH0pKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmaWxlU3RhdHMuZmlsdGVyKGYgPT4gZi5pc0ZpbGUpLm1hcChmID0+IGYuZmlsZSk7XG4gICAgfVxuICAgIFxuICAgIC8qKlxuICAgICAqIFNldCB1cCBldmVudCBsaXN0ZW5lcnMgZm9yIHBsdWdpbiB0b2dnbGUgY2hlY2tib3hlc1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgdG9nZ2xlUGx1Z2luTGlzdGVuZXIoKTogdm9pZCB7XG4gICAgICAgIGhlbHBlcnMud2FpdEZvckVsbShTRUxFQ1RPUlMuUExVR0lOU19DQVRFR09SWSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKFwiTGlzdGVuaW5nIHRvIHBsdWdpbiBjaGVja2JveGVzLi4uXCIpO1xuICAgICAgICAgICAgY29uc3QgcGx1Z2luQ2hlY2tib3hlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJwbHVnaW5cIikgYXMgSFRNTENvbGxlY3Rpb25PZjxIVE1MRWxlbWVudD47XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGx1Z2luQ2hlY2tib3hlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHBsdWdpbkNoZWNrYm94ZXNbaV0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcGx1Z2luQ2hlY2tib3hlc1tpXS5jbGFzc0xpc3QudG9nZ2xlKENMQVNTRVMuQ0hFQ0tFRCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBsdWdpbk5hbWUgPSBwbHVnaW5DaGVja2JveGVzW2ldLmdldEF0dHJpYnV0ZSgnbmFtZScpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICghcGx1Z2luTmFtZSkgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChwbHVnaW5DaGVja2JveGVzW2ldLmNsYXNzTGlzdC5jb250YWlucyhDTEFTU0VTLkNIRUNLRUQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmxvYWRQbHVnaW4ocGx1Z2luTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVubG9hZFBsdWdpbihwbHVnaW5OYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd1JlbG9hZFdhcm5pbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KS5jYXRjaChlcnIgPT4gdGhpcy5sb2dnZXIuZXJyb3IoYEZhaWxlZCB0byBzZXR1cCBwbHVnaW4gbGlzdGVuZXJzOiAke2Vycn1gKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgc2hvd1JlbG9hZFdhcm5pbmcoKTogdm9pZCB7XG4gICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsdWdpbi1yZWxvYWQtd2FybmluZ1wiKSkgcmV0dXJuO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5sb2dnZXIuaW5mbyhcIlBsdWdpbiB1bmxvYWRlZCwgYWRkaW5nIHJlbG9hZCB3YXJuaW5nLlwiKTtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihTRUxFQ1RPUlMuUExVR0lOU19DQVRFR09SWSk7XG4gICAgICAgIGlmICghY29udGFpbmVyKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgcGFyYWdyYXBoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICAgIHBhcmFncmFwaC5pZCA9IFwicGx1Z2luLXJlbG9hZC13YXJuaW5nXCI7XG4gICAgICAgIHBhcmFncmFwaC5zdHlsZS5jb2xvciA9IFwid2hpdGVcIjtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgICAgICAgbGluay5zdHlsZS5jb2xvciA9IFwiY3lhblwiO1xuICAgICAgICBsaW5rLnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xuICAgICAgICBsaW5rLnRleHRDb250ZW50ID0gXCJoZXJlXCI7XG4gICAgICAgIGxpbmsuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy8nO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIHBhcmFncmFwaC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIlJlbG9hZCBpcyByZXF1aXJlZCB0byBkaXNhYmxlIHBsdWdpbnMuIENsaWNrIFwiKSk7XG4gICAgICAgIHBhcmFncmFwaC5hcHBlbmRDaGlsZChsaW5rKTtcbiAgICAgICAgcGFyYWdyYXBoLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiIHRvIHJlbG9hZC5cIikpO1xuICAgICAgICBcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHBhcmFncmFwaCk7XG4gICAgfVxuICAgIFxuICAgIHB1YmxpYyBzdGF0aWMgb3BlblRoZW1lc0ZvbGRlcigpOiB2b2lkIHtcbiAgICAgICAgaGVscGVycy53YWl0Rm9yRWxtKFwiI29wZW50aGVtZXNmb2xkZXJCdG5cIikudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm9wZW50aGVtZXNmb2xkZXJCdG5cIik7XG4gICAgICAgICAgICBidXR0b24/LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5vcGVuRm9sZGVyKFByb3BlcnRpZXMudGhlbWVzUGF0aCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSkuY2F0Y2goZXJyID0+IHRoaXMubG9nZ2VyLmVycm9yKGBGYWlsZWQgdG8gc2V0dXAgdGhlbWVzIGZvbGRlciBidXR0b246ICR7ZXJyfWApKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIG9wZW5QbHVnaW5zRm9sZGVyKCk6IHZvaWQge1xuICAgICAgICBoZWxwZXJzLndhaXRGb3JFbG0oXCIjb3BlbnBsdWdpbnNmb2xkZXJCdG5cIikudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm9wZW5wbHVnaW5zZm9sZGVyQnRuXCIpO1xuICAgICAgICAgICAgYnV0dG9uPy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMub3BlbkZvbGRlcihQcm9wZXJ0aWVzLnBsdWdpbnNQYXRoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KS5jYXRjaChlcnIgPT4gdGhpcy5sb2dnZXIuZXJyb3IoYEZhaWxlZCB0byBzZXR1cCBwbHVnaW5zIGZvbGRlciBidXR0b246ICR7ZXJyfWApKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPcGVuIGEgZm9sZGVyIGluIHRoZSBzeXN0ZW0gZmlsZSBleHBsb3JlclxuICAgICAqL1xuICAgIHByaXZhdGUgc3RhdGljIGFzeW5jIG9wZW5Gb2xkZXIoZm9sZGVyUGF0aDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCBQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC5vcGVuUGF0aChmb2xkZXJQYXRoKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLmVycm9yKGBGYWlsZWQgdG8gb3BlbiBmb2xkZXIgJHtmb2xkZXJQYXRofTogJHtlcnJvcn1gKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAgICAgXG4gICAgcHVibGljIHN0YXRpYyBzY3JvbGxMaXN0ZW5lcigpOiB2b2lkIHtcbiAgICAgICAgaGVscGVycy53YWl0Rm9yRWxtKCdbZGF0YS1zZWN0aW9uPVwiZW5oYW5jZWRcIl0nKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVuaGFuY2VkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VuaGFuY2VkJyk7XG4gICAgICAgICAgICBjb25zdCBlbmhhbmNlZE5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNlY3Rpb249XCJlbmhhbmNlZFwiXScpO1xuXG4gICAgICAgICAgICBpZiAoIWVuaGFuY2VkIHx8ICFlbmhhbmNlZE5hdikgcmV0dXJuO1xuXG4gICAgICAgICAgICBlbmhhbmNlZE5hdi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZpcnN0Q2hpbGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VuaGFuY2VkID4gZGl2XCIpO1xuICAgICAgICAgICAgICAgIGZpcnN0Q2hpbGQ/LnNjcm9sbEludG9WaWV3KHtcbiAgICAgICAgICAgICAgICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnLFxuICAgICAgICAgICAgICAgICAgICBibG9jazogJ3N0YXJ0J1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIFNldHRpbmdzLmFjdGl2ZVNlY3Rpb24oZW5oYW5jZWROYXYpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKChlbnRyaWVzKSA9PiB7XG4gICAgICAgICAgICAgICAgZW50cmllcy5mb3JFYWNoKGVudHJ5ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVudHJ5LmlzSW50ZXJzZWN0aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBTZXR0aW5ncy5hY3RpdmVTZWN0aW9uKGVuaGFuY2VkTmF2KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuaGFuY2VkTmF2LmNsYXNzTGlzdC5yZW1vdmUoQ0xBU1NFUy5TRUxFQ1RFRCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sIHsgdGhyZXNob2xkOiAwLjEgfSk7XG4gICAgICAgIFxuICAgICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShlbmhhbmNlZCk7XG4gICAgICAgIH0pLmNhdGNoKGVyciA9PiB0aGlzLmxvZ2dlci5lcnJvcihgRmFpbGVkIHRvIHNldHVwIHNjcm9sbCBsaXN0ZW5lcjogJHtlcnJ9YCkpO1xuICAgIH1cbiAgICBcbiAgICAvKipcbiAgICAgKiBBZGQgdGhlIGFwcGx5VGhlbWUgZnVuY3Rpb24gdG8gdGhlIHBhZ2VcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGFkZEFwcGx5VGhlbWVGdW5jdGlvbigpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgYXBwbHlUaGVtZVNjcmlwdCA9IGdldEFwcGx5VGhlbWVUZW1wbGF0ZSgpO1xuICAgICAgICBjb25zdCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpOyAgXG4gICAgICAgIHNjcmlwdC5pbm5lckhUTUwgPSBhcHBseVRoZW1lU2NyaXB0O1xuICAgICAgICBcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICAgIH1cbiAgICBcbiAgICAvKipcbiAgICAgKiBDaGVjayBmb3IgdXBkYXRlcyBmb3IgYSBzcGVjaWZpYyBwbHVnaW4gb3IgdGhlbWVcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGFzeW5jIGNoZWNrRm9ySXRlbVVwZGF0ZXMoaXRlbUZpbGU6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKCdDaGVja2luZyBmb3IgdXBkYXRlcyBmb3IgJyArIGl0ZW1GaWxlKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGl0ZW1Cb3ggPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZShgJHtpdGVtRmlsZX0tYm94YClbMF07XG4gICAgICAgIGlmICghaXRlbUJveCkge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIud2FybihgJHtpdGVtRmlsZX0tYm94IGVsZW1lbnQgbm90IGZvdW5kLmApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcGx1Z2luT3JUaGVtZTogJ3RoZW1lJyB8ICdwbHVnaW4nID0gaXRlbUZpbGUuZW5kc1dpdGgoXCIudGhlbWUuY3NzXCIpID8gXCJ0aGVtZVwiIDogXCJwbHVnaW5cIjtcbiAgICAgICAgY29uc3QgaXRlbVBhdGggPSBqb2luKFxuICAgICAgICAgICAgcGx1Z2luT3JUaGVtZSA9PT0gXCJ0aGVtZVwiID8gcHJvcGVydGllcy50aGVtZXNQYXRoIDogcHJvcGVydGllcy5wbHVnaW5zUGF0aCwgXG4gICAgICAgICAgICBpdGVtRmlsZVxuICAgICAgICApO1xuICAgICAgICBcbiAgICAgICAgLy8gUmVmYWN0b3JlZDogUmVhZCBmaWxlIGZpcnN0XG4gICAgICAgIGxldCBmaWxlQ29udGVudCA9IFwiXCI7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmaWxlQ29udGVudCA9IGF3YWl0IFBsYXRmb3JtTWFuYWdlci5jdXJyZW50LnJlYWRGaWxlKGl0ZW1QYXRoKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoYEZhaWxlZCB0byByZWFkIGZpbGUgJHtpdGVtUGF0aH06ICR7ZX1gKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGluc3RhbGxlZEl0ZW1NZXRhRGF0YSA9IEV4dHJhY3RNZXRhRGF0YS5leHRyYWN0TWV0YWRhdGFGcm9tVGV4dChmaWxlQ29udGVudCkgYXMgTWV0YURhdGEgfCBudWxsO1xuICAgICAgICBcbiAgICAgICAgaWYgKCFpbnN0YWxsZWRJdGVtTWV0YURhdGEgfHwgT2JqZWN0LmtleXMoaW5zdGFsbGVkSXRlbU1ldGFEYXRhKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHVwZGF0ZVVybCA9IGluc3RhbGxlZEl0ZW1NZXRhRGF0YS51cGRhdGVVcmw7XG4gICAgICAgIGlmICghdXBkYXRlVXJsIHx8IHVwZGF0ZVVybCA9PT0gXCJub25lXCIpIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLmluZm8oYE5vIHVwZGF0ZSBVUkwgcHJvdmlkZWQgZm9yICR7cGx1Z2luT3JUaGVtZX0gKCR7aW5zdGFsbGVkSXRlbU1ldGFEYXRhLm5hbWV9KWApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlcXVlc3QgPSBhd2FpdCBmZXRjaCh1cGRhdGVVcmwpO1xuICAgICAgICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzICE9PSAyMDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci53YXJuKGBGYWlsZWQgdG8gZmV0Y2ggdXBkYXRlIGZvciAke2l0ZW1GaWxlfTogSFRUUCAke3JlcXVlc3Quc3RhdHVzfWApO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCByZXF1ZXN0LnRleHQoKTtcbiAgICAgICAgICAgIGNvbnN0IGV4dHJhY3RlZE1ldGFEYXRhID0gRXh0cmFjdE1ldGFEYXRhLmV4dHJhY3RNZXRhZGF0YUZyb21UZXh0KHJlc3BvbnNlKSBhcyBNZXRhRGF0YSB8IG51bGw7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmICghZXh0cmFjdGVkTWV0YURhdGEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci53YXJuKGBGYWlsZWQgdG8gZXh0cmFjdCBtZXRhZGF0YSBmcm9tIHJlc3BvbnNlIGZvciAke3BsdWdpbk9yVGhlbWV9ICgke2luc3RhbGxlZEl0ZW1NZXRhRGF0YS5uYW1lfSlgKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChoZWxwZXJzLmlzTmV3ZXJWZXJzaW9uKGV4dHJhY3RlZE1ldGFEYXRhLnZlcnNpb24sIGluc3RhbGxlZEl0ZW1NZXRhRGF0YS52ZXJzaW9uKSkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmluZm8oXG4gICAgICAgICAgICAgICAgICAgIGBVcGRhdGUgYXZhaWxhYmxlIGZvciAke3BsdWdpbk9yVGhlbWV9ICgke2luc3RhbGxlZEl0ZW1NZXRhRGF0YS5uYW1lfSk6IGAgK1xuICAgICAgICAgICAgICAgICAgICBgdiR7aW5zdGFsbGVkSXRlbU1ldGFEYXRhLnZlcnNpb259IC0+IHYke2V4dHJhY3RlZE1ldGFEYXRhLnZlcnNpb259YFxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCB1cGRhdGVCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtpdGVtRmlsZX0tdXBkYXRlYCk7XG4gICAgICAgICAgICAgICAgaWYgKHVwZGF0ZUJ1dHRvbikge1xuICAgICAgICAgICAgICAgICAgICB1cGRhdGVCdXR0b24uc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICAgICAgICAgICAgICAgICAgICB1cGRhdGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IFBsYXRmb3JtTWFuYWdlci5jdXJyZW50LndyaXRlRmlsZShpdGVtUGF0aCwgcmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgU2V0dGluZ3MucmVtb3ZlSXRlbShpdGVtRmlsZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBTZXR0aW5ncy5hZGRJdGVtKHBsdWdpbk9yVGhlbWUsIGl0ZW1GaWxlLCBleHRyYWN0ZWRNZXRhRGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIuaW5mbyhcbiAgICAgICAgICAgICAgICAgICAgYE5vIHVwZGF0ZSBhdmFpbGFibGUgZm9yICR7cGx1Z2luT3JUaGVtZX0gKCR7aW5zdGFsbGVkSXRlbU1ldGFEYXRhLm5hbWV9KS4gYCArXG4gICAgICAgICAgICAgICAgICAgIGBDdXJyZW50IHZlcnNpb246IHYke2luc3RhbGxlZEl0ZW1NZXRhRGF0YS52ZXJzaW9ufWBcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoYEVycm9yIGNoZWNraW5nIHVwZGF0ZXMgZm9yICR7aXRlbUZpbGV9OiAkeyhlcnJvciBhcyBFcnJvcikubWVzc2FnZX1gKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiAgICBcbmV4cG9ydCBkZWZhdWx0IE1vZE1hbmFnZXI7XG4iLCAiLyoqXG4gKiBNZXRhZGF0YSBzdHJ1Y3R1cmUgZm9yIHBsdWdpbnMgYW5kIHRoZW1lc1xuICogRXh0cmFjdGVkIGZyb20gSlNEb2Mtc3R5bGUgY29tbWVudHMgaW4gbW9kIGZpbGVzXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTWV0YURhdGEge1xuICAgIC8qKiBEaXNwbGF5IG5hbWUgb2YgdGhlIG1vZCAqL1xuICAgIG5hbWU6IHN0cmluZztcbiAgICAvKiogQnJpZWYgZGVzY3JpcHRpb24gb2Ygd2hhdCB0aGUgbW9kIGRvZXMgKi9cbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICAgIC8qKiBBdXRob3IvY3JlYXRvciBvZiB0aGUgbW9kICovXG4gICAgYXV0aG9yOiBzdHJpbmc7XG4gICAgLyoqIFNlbWFudGljIHZlcnNpb24gc3RyaW5nIChlLmcuLCBcIjEuMC4wXCIpICovXG4gICAgdmVyc2lvbjogc3RyaW5nO1xuICAgIC8qKiBVUkwgdG8gY2hlY2sgZm9yIHVwZGF0ZXMgKG9wdGlvbmFsKSAqL1xuICAgIHVwZGF0ZVVybD86IHN0cmluZztcbiAgICAvKiogU291cmNlIGNvZGUgcmVwb3NpdG9yeSBVUkwgKG9wdGlvbmFsKSAqL1xuICAgIHNvdXJjZT86IHN0cmluZztcbiAgICAvKiogTGljZW5zZSB0eXBlIChvcHRpb25hbCkgKi9cbiAgICBsaWNlbnNlPzogc3RyaW5nO1xuICAgIC8qKiBIb21lcGFnZS9kb2N1bWVudGF0aW9uIFVSTCAob3B0aW9uYWwpICovXG4gICAgaG9tZXBhZ2U/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIE1ldGFkYXRhS2V5ID0ga2V5b2YgTWV0YURhdGE7XG5cbmV4cG9ydCBjb25zdCBSRVFVSVJFRF9NRVRBREFUQV9LRVlTID0gW1xuICAgIFwibmFtZVwiLFxuICAgIFwiZGVzY3JpcHRpb25cIixcbiAgICBcImF1dGhvclwiLFxuICAgIFwidmVyc2lvblwiLFxuXSBhcyBjb25zdCBzYXRpc2ZpZXMgcmVhZG9ubHkgTWV0YWRhdGFLZXlbXTtcblxuZXhwb3J0IGNvbnN0IEFMTF9NRVRBREFUQV9LRVlTID0gW1xuICAgIFwibmFtZVwiLFxuICAgIFwiZGVzY3JpcHRpb25cIixcbiAgICBcImF1dGhvclwiLFxuICAgIFwidmVyc2lvblwiLFxuICAgIFwidXBkYXRlVXJsXCIsXG4gICAgXCJzb3VyY2VcIixcbiAgICBcImxpY2Vuc2VcIixcbiAgICBcImhvbWVwYWdlXCIsXG5dIGFzIGNvbnN0IHNhdGlzZmllcyByZWFkb25seSBNZXRhZGF0YUtleVtdO1xuIiwgImltcG9ydCB7XG4gICAgTWV0YURhdGEsXG4gICAgTWV0YWRhdGFLZXksXG4gICAgUkVRVUlSRURfTUVUQURBVEFfS0VZUyxcbiAgICBBTExfTUVUQURBVEFfS0VZUyxcbn0gZnJvbSBcIi4uL2ludGVyZmFjZXMvTWV0YURhdGFcIjtcbmltcG9ydCBsb2dnZXIgZnJvbSBcIi4vbG9nZ2VyXCI7XG5cbmNsYXNzIEV4dHJhY3RNZXRhRGF0YSB7XG4gICAgLyoqXG4gICAgICogUGFyc2UgbWV0YWRhdGEgZnJvbSBhIGNvbW1lbnQgYmxvY2sgaW4gdGhlIGZvcm1hdDpcbiAgICAgKiAvKiogQGtleSB2YWx1ZSAqXFwvXG4gICAgKi9cbiAgICBwcml2YXRlIHN0YXRpYyBwYXJzZU1ldGFkYXRhRnJvbUNvbnRlbnQoY29udGVudDogc3RyaW5nKTogTWV0YURhdGEgfCBudWxsIHtcbiAgICAgICAgY29uc3QgYmxvY2tNYXRjaCA9IGNvbnRlbnQubWF0Y2goL1xcL1xcKlxcKihbXFxzXFxTXSo/KVxcKlxcLy8pO1xuICAgICAgICBpZiAoIWJsb2NrTWF0Y2gpIHJldHVybiBudWxsO1xuXG4gICAgICAgIGNvbnN0IHJlc3VsdDogUGFydGlhbDxNZXRhRGF0YT4gPSB7fTtcbiAgICAgICAgY29uc3QgdGFnUmVnZXggPSAvQChcXHcrKVxccysoW15cXG5cXHJdKykvZztcblxuICAgICAgICBmb3IgKGNvbnN0IFssIHJhd0tleSwgcmF3VmFsdWVdIG9mIGJsb2NrTWF0Y2hbMV0ubWF0Y2hBbGwodGFnUmVnZXgpKSB7XG4gICAgICAgICAgICBpZiAoIUFMTF9NRVRBREFUQV9LRVlTLmluY2x1ZGVzKHJhd0tleSBhcyBNZXRhZGF0YUtleSkpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICBjb25zdCBrZXkgPSByYXdLZXkgYXMgTWV0YWRhdGFLZXk7XG5cbiAgICAgICAgICAgIGlmIChyZXN1bHRba2V5XSAhPT0gdW5kZWZpbmVkKSBjb250aW51ZTtcblxuICAgICAgICAgICAgcmVzdWx0W2tleV0gPSByYXdWYWx1ZS50cmltKCk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBSRVFVSVJFRF9NRVRBREFUQV9LRVlTKSB7XG4gICAgICAgICAgICBpZiAoIXJlc3VsdFtrZXldKSByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQgYXMgTWV0YURhdGE7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBleHRyYWN0TWV0YWRhdGFGcm9tVGV4dCh0ZXh0Q29udGVudDogc3RyaW5nKTogTWV0YURhdGEgfCBudWxsIHtcbiAgICAgICAgY29uc3QgbWV0YWRhdGEgPSB0aGlzLnBhcnNlTWV0YWRhdGFGcm9tQ29udGVudCh0ZXh0Q29udGVudCk7XG4gICAgICAgIFxuICAgICAgICBpZiAoIW1ldGFkYXRhKSB7XG4gICAgICAgICAgICBsb2dnZXIuZXJyb3IoJ0NvbW1lbnQgYmxvY2sgbm90IGZvdW5kIGluIHRoZSBwcm92aWRlZCB0ZXh0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBtZXRhZGF0YTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEV4dHJhY3RNZXRhRGF0YTtcbiIsICJpbXBvcnQgSGVscGVycyBmcm9tIFwiLi4vdXRpbHMvSGVscGVyc1wiO1xuaW1wb3J0IHsgTWV0YURhdGEgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9NZXRhRGF0YVwiO1xuaW1wb3J0IHsgZ2V0UGx1Z2luSXRlbVRlbXBsYXRlIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvcGx1Z2luLWl0ZW0vcGx1Z2luSXRlbVwiO1xuaW1wb3J0IHsgZ2V0VGhlbWVJdGVtVGVtcGxhdGUgfSBmcm9tIFwiLi4vY29tcG9uZW50cy90aGVtZS1pdGVtL3RoZW1lSXRlbVwiO1xuaW1wb3J0IHsgZ2V0RW5oYW5jZWROYXYgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9lbmhhbmNlZC1uYXYvZW5oYW5jZWROYXZcIjtcbmltcG9ydCB7IGdldExvZ2dlciB9IGZyb20gXCIuLi91dGlscy9sb2dnZXJcIjtcbmltcG9ydCBNb2RNYW5hZ2VyIGZyb20gXCIuL01vZE1hbmFnZXJcIjtcbmltcG9ydCB7IFNFTEVDVE9SUywgQ0xBU1NFUywgU1RPUkFHRV9LRVlTIH0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuXG5jbGFzcyBTZXR0aW5ncyB7XG4gICAgcHJpdmF0ZSBzdGF0aWMgbG9nZ2VyID0gZ2V0TG9nZ2VyKFwiU2V0dGluZ3NcIik7XG5cbiAgICAvKipcbiAgICAgKiBBZGQgYSBuZXcgc2VjdGlvbiB0byB0aGUgc2V0dGluZ3MgcGFuZWxcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGFkZFNlY3Rpb24oc2VjdGlvbklkOiBzdHJpbmcsIHRpdGxlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy53YWl0Rm9yU2V0dGluZ3NQYW5lbCgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIuaW5mbyhgQWRkaW5nIHNlY3Rpb246ICR7c2VjdGlvbklkfSB3aXRoIHRpdGxlOiAke3RpdGxlfWApO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCBzZXR0aW5nc1BhbmVsID0gdGhpcy5nZXRTZXR0aW5nc1BhbmVsKCk7XG4gICAgICAgICAgICBpZiAoIXNldHRpbmdzUGFuZWwpIHJldHVybjtcblxuICAgICAgICAgICAgY29uc3Qgc2VjdGlvbkVsZW1lbnQgPSB0aGlzLmdldEV4aXN0aW5nU2VjdGlvbihzZXR0aW5nc1BhbmVsKTtcbiAgICAgICAgICAgIGNvbnN0IGxhYmVsRWxlbWVudCA9IHRoaXMuZ2V0RXhpc3RpbmdTZWN0aW9uTGFiZWwoc2VjdGlvbkVsZW1lbnQpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoIXNlY3Rpb25FbGVtZW50IHx8ICFsYWJlbEVsZW1lbnQpIHJldHVybjtcblxuICAgICAgICAgICAgY29uc3Qgc2VjdGlvbkNsYXNzTmFtZSA9IHNlY3Rpb25FbGVtZW50LmNsYXNzTmFtZTtcbiAgICAgICAgICAgIGNvbnN0IHRpdGxlQ2xhc3NOYW1lID0gbGFiZWxFbGVtZW50LmNsYXNzTmFtZTtcblxuICAgICAgICAgICAgY29uc3Qgc2VjdGlvbkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICBzZWN0aW9uQ29udGFpbmVyLmNsYXNzTmFtZSA9IHNlY3Rpb25DbGFzc05hbWU7XG4gICAgICAgICAgICBzZWN0aW9uQ29udGFpbmVyLmlkID0gc2VjdGlvbklkO1xuXG4gICAgICAgICAgICBjb25zdCBzZWN0aW9uVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgc2VjdGlvblRpdGxlLmNsYXNzTmFtZSA9IHRpdGxlQ2xhc3NOYW1lO1xuICAgICAgICAgICAgc2VjdGlvblRpdGxlLnRleHRDb250ZW50ID0gdGl0bGU7XG5cbiAgICAgICAgICAgIHNlY3Rpb25Db250YWluZXIuYXBwZW5kQ2hpbGQoc2VjdGlvblRpdGxlKTtcbiAgICAgICAgICAgIHNldHRpbmdzUGFuZWwuYXBwZW5kQ2hpbGQoc2VjdGlvbkNvbnRhaW5lcik7XG5cbiAgICAgICAgICAgIC8vIEFkZCBzZWN0aW9uIHRvIG5hdlxuICAgICAgICAgICAgdGhpcy53YWl0Rm9yTmF2TWVudSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5hdiA9IHRoaXMuZ2V0TmF2TWVudSgpO1xuICAgICAgICAgICAgICAgIC8vIFRyeSB0byBmaW5kIHNob3J0Y3V0cyBuYXYgdG8gaW5zZXJ0IGFmdGVyLCBvciBqdXN0IGFwcGVuZFxuICAgICAgICAgICAgICAgIGNvbnN0IHNob3J0Y3V0c05hdiA9IHRoaXMuZ2V0TmF2U2hvcnRjdXRJdGVtKCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIW5hdikgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGlmKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXNlY3Rpb249XCIke3NlY3Rpb25JZH1cIl1gKSkgcmV0dXJuOyAvLyBOYXYgaXRlbSBhbHJlYWR5IGV4aXN0c1xuXG4gICAgICAgICAgICAgICAgY29uc3QgZW5oYW5jZWROYXZDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgICAgIGVuaGFuY2VkTmF2Q29udGFpbmVyLmlubmVySFRNTCA9IGdldEVuaGFuY2VkTmF2KCk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKHNob3J0Y3V0c05hdikge1xuICAgICAgICAgICAgICAgICAgICBuYXYuaW5zZXJ0QmVmb3JlKGVuaGFuY2VkTmF2Q29udGFpbmVyLCBzaG9ydGN1dHNOYXYubmV4dFNpYmxpbmcpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG5hdi5hcHBlbmRDaGlsZChlbmhhbmNlZE5hdkNvbnRhaW5lcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkuY2F0Y2goZXJyID0+IHRoaXMubG9nZ2VyLmVycm9yKGBGYWlsZWQgdG8gYWRkIG5hdjogJHtlcnJ9YCkpO1xuICAgICAgICB9KS5jYXRjaChlcnIgPT4gdGhpcy5sb2dnZXIuZXJyb3IoYEZhaWxlZCB0byBhZGQgc2VjdGlvbjogJHtlcnJ9YCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZCBhIGNhdGVnb3J5IHdpdGhpbiBhIHNlY3Rpb25cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGFkZENhdGVnb3J5KHRpdGxlOiBzdHJpbmcsIHNlY3Rpb25JZDogc3RyaW5nLCBpY29uOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy53YWl0Rm9yU2V0dGluZ3NQYW5lbCgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIuaW5mbyhgQWRkaW5nIGNhdGVnb3J5OiAke3RpdGxlfSB0byBzZWN0aW9uOiAke3NlY3Rpb25JZH1gKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3QgY2F0ZWdvcnlUZW1wbGF0ZSA9IHRoaXMuZ2V0Q2F0ZWdvcnlUZW1wbGF0ZSgpO1xuICAgICAgICAgICAgaWYgKCFjYXRlZ29yeVRlbXBsYXRlKSByZXR1cm47XG5cbiAgICAgICAgICAgIGNvbnN0IHsgY2F0ZWdvcnlDbGFzcywgY2F0ZWdvcnlUaXRsZUNsYXNzLCBoZWFkaW5nQ2xhc3MsIGljb25DbGFzcyB9ID0gY2F0ZWdvcnlUZW1wbGF0ZTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gUmVwbGFjZSBpY29uIGNsYXNzXG4gICAgICAgICAgICBpY29uID0gaWNvbi5yZXBsYWNlKGBjbGFzcz1cImljb25cImAsIGBjbGFzcz1cIiR7aWNvbkNsYXNzfVwiYCk7XG5cbiAgICAgICAgICAgIGNvbnN0IHNlY3Rpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzZWN0aW9uSWQpO1xuICAgICAgICAgICAgaWYgKCFzZWN0aW9uKSByZXR1cm47XG5cbiAgICAgICAgICAgIGNvbnN0IGNhdGVnb3J5RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIGNhdGVnb3J5RGl2LmNsYXNzTmFtZSA9IGNhdGVnb3J5Q2xhc3M7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IHRpdGxlRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIHRpdGxlRGl2LmNsYXNzTmFtZSA9IGNhdGVnb3J5VGl0bGVDbGFzcztcbiAgICAgICAgICAgIHRpdGxlRGl2LmlubmVySFRNTCA9IHRpdGxlO1xuXG4gICAgICAgICAgICBjb25zdCBoZWFkaW5nRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIC8vIElmIHdlIGZvdW5kIGEgY2xhc3MsIHVzZSBpdC4gSWYgbm90LCBmYWxsYmFjayB0byBzZWxlY3RvciBsb2dpYyBvciBlbXB0eVxuICAgICAgICAgICAgaWYgKGhlYWRpbmdDbGFzcykge1xuICAgICAgICAgICAgICAgIGhlYWRpbmdEaXYuY2xhc3NOYW1lID0gaGVhZGluZ0NsYXNzO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgaGVhZGluZ0Rpdi5jbGFzc0xpc3QuYWRkKFNFTEVDVE9SUy5DQVRFR09SWV9IRUFESU5HLnJlcGxhY2UoJy4nLCAnJykpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBoZWFkaW5nRGl2LmlubmVySFRNTCArPSBpY29uO1xuICAgICAgICAgICAgaGVhZGluZ0Rpdi5hcHBlbmRDaGlsZCh0aXRsZURpdik7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNhdGVnb3J5RGl2LmFwcGVuZENoaWxkKGhlYWRpbmdEaXYpO1xuICAgICAgICAgICAgc2VjdGlvbi5hcHBlbmRDaGlsZChjYXRlZ29yeURpdik7XG4gICAgICAgIH0pLmNhdGNoKGVyciA9PiB0aGlzLmxvZ2dlci5lcnJvcihgRmFpbGVkIHRvIGFkZCBjYXRlZ29yeTogJHtlcnJ9YCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZCBhIGJ1dHRvbiB0byB0aGUgc2V0dGluZ3NcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGFkZEJ1dHRvbih0aXRsZTogc3RyaW5nLCBpZDogc3RyaW5nLCBxdWVyeTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIEhlbHBlcnMud2FpdEZvckVsbShxdWVyeSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihxdWVyeSk7XG4gICAgICAgICAgICBpZiAoIWVsZW1lbnQpIHJldHVybjtcblxuICAgICAgICAgICAgY29uc3Qgb3B0aW9uRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIG9wdGlvbkRpdi5jbGFzc0xpc3QuYWRkKENMQVNTRVMuT1BUSU9OKTtcblxuICAgICAgICAgICAgY29uc3QgY29udGVudERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICBjb250ZW50RGl2LmNsYXNzTGlzdC5hZGQoQ0xBU1NFUy5DT05URU5UKTtcblxuICAgICAgICAgICAgY29uc3QgYnV0dG9uRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIGJ1dHRvbkRpdi5zZXRBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiLCBcIjBcIik7XG4gICAgICAgICAgICBidXR0b25EaXYuc2V0QXR0cmlidXRlKFwidGl0bGVcIiwgdGl0bGUpO1xuICAgICAgICAgICAgYnV0dG9uRGl2LmNsYXNzTGlzdC5hZGQoQ0xBU1NFUy5CVVRUT04sIENMQVNTRVMuQlVUVE9OX0NPTlRBSU5FUiwgXCJidXR0b25cIik7XG4gICAgICAgICAgICBidXR0b25EaXYuaWQgPSBpZDtcbiAgICAgICAgICAgIGJ1dHRvbkRpdi50ZXh0Q29udGVudCA9IHRpdGxlO1xuXG4gICAgICAgICAgICBjb250ZW50RGl2LmFwcGVuZENoaWxkKGJ1dHRvbkRpdik7XG4gICAgICAgICAgICBvcHRpb25EaXYuYXBwZW5kQ2hpbGQoY29udGVudERpdik7XG4gICAgICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKG9wdGlvbkRpdik7XG4gICAgICAgIH0pLmNhdGNoKGVyciA9PiB0aGlzLmxvZ2dlci5lcnJvcihgRmFpbGVkIHRvIGFkZCBidXR0b246ICR7ZXJyfWApKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgYSB0aGVtZSBvciBwbHVnaW4gaXRlbSB0byB0aGUgc2V0dGluZ3NcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGFkZEl0ZW0odHlwZTogXCJ0aGVtZVwiIHwgXCJwbHVnaW5cIiwgZmlsZU5hbWU6IHN0cmluZywgbWV0YURhdGE6IE1ldGFEYXRhKTogdm9pZCB7XG4gICAgICAgIHRoaXMubG9nZ2VyLmluZm8oYEFkZGluZyAke3R5cGV9OiAke2ZpbGVOYW1lfWApO1xuICAgICAgICBcbiAgICAgICAgaWYgKHR5cGUgPT09IFwidGhlbWVcIikge1xuICAgICAgICAgICAgSGVscGVycy53YWl0Rm9yRWxtKFNFTEVDVE9SUy5USEVNRVNfQ0FURUdPUlkpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkVGhlbWUoZmlsZU5hbWUsIG1ldGFEYXRhKTtcbiAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB0aGlzLmxvZ2dlci5lcnJvcihgRmFpbGVkIHRvIGFkZCB0aGVtZTogJHtlcnJ9YCkpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09IFwicGx1Z2luXCIpIHtcbiAgICAgICAgICAgIEhlbHBlcnMud2FpdEZvckVsbShTRUxFQ1RPUlMuUExVR0lOU19DQVRFR09SWSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRQbHVnaW4oZmlsZU5hbWUsIG1ldGFEYXRhKTtcbiAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB0aGlzLmxvZ2dlci5lcnJvcihgRmFpbGVkIHRvIGFkZCBwbHVnaW46ICR7ZXJyfWApKTtcbiAgICAgICAgfSAgICAgICAgXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgYWRkUGx1Z2luKGZpbGVOYW1lOiBzdHJpbmcsIG1ldGFEYXRhOiBNZXRhRGF0YSk6IHZvaWQge1xuICAgICAgICBjb25zdCBlbmFibGVkUGx1Z2luczogc3RyaW5nW10gPSBKU09OLnBhcnNlKFxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLmdldEl0ZW0oU1RPUkFHRV9LRVlTLkVOQUJMRURfUExVR0lOUykgfHwgXCJbXVwiXG4gICAgICAgICk7XG5cbiAgICAgICAgY29uc3QgcGx1Z2luQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgcGx1Z2luQ29udGFpbmVyLmlubmVySFRNTCA9IGdldFBsdWdpbkl0ZW1UZW1wbGF0ZShmaWxlTmFtZSwgbWV0YURhdGEsIGVuYWJsZWRQbHVnaW5zLmluY2x1ZGVzKGZpbGVOYW1lKSk7XG4gICAgICAgIHBsdWdpbkNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoXCJuYW1lXCIsIGAke2ZpbGVOYW1lfS1ib3hgKTtcblxuICAgICAgICBjb25zdCBwbHVnaW5zQ2F0ZWdvcnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFNFTEVDVE9SUy5QTFVHSU5TX0NBVEVHT1JZKTtcbiAgICAgICAgcGx1Z2luc0NhdGVnb3J5Py5hcHBlbmRDaGlsZChwbHVnaW5Db250YWluZXIpO1xuICAgICAgICBcbiAgICAgICAgTW9kTWFuYWdlci5jaGVja0Zvckl0ZW1VcGRhdGVzKGZpbGVOYW1lKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBhZGRUaGVtZShmaWxlTmFtZTogc3RyaW5nLCBtZXRhRGF0YTogTWV0YURhdGEpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgY3VycmVudFRoZW1lID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oU1RPUkFHRV9LRVlTLkNVUlJFTlRfVEhFTUUpO1xuXG4gICAgICAgIGNvbnN0IHRoZW1lQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgdGhlbWVDb250YWluZXIuaW5uZXJIVE1MID0gZ2V0VGhlbWVJdGVtVGVtcGxhdGUoZmlsZU5hbWUsIG1ldGFEYXRhLCBjdXJyZW50VGhlbWUgPT09IGZpbGVOYW1lKTtcbiAgICAgICAgdGhlbWVDb250YWluZXIuc2V0QXR0cmlidXRlKFwibmFtZVwiLCBgJHtmaWxlTmFtZX0tYm94YCk7XG5cbiAgICAgICAgY29uc3QgdGhlbWVzQ2F0ZWdvcnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFNFTEVDVE9SUy5USEVNRVNfQ0FURUdPUlkpO1xuICAgICAgICB0aGVtZXNDYXRlZ29yeT8uYXBwZW5kQ2hpbGQodGhlbWVDb250YWluZXIpO1xuICAgICAgICBcbiAgICAgICAgTW9kTWFuYWdlci5jaGVja0Zvckl0ZW1VcGRhdGVzKGZpbGVOYW1lKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgYW4gaXRlbSBmcm9tIHRoZSBzZXR0aW5nc1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgcmVtb3ZlSXRlbShmaWxlTmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZShgJHtmaWxlTmFtZX0tYm94YClbMF07XG4gICAgICAgIGVsZW1lbnQ/LnJlbW92ZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCBhIG5hdmlnYXRpb24gZWxlbWVudCBhcyBhY3RpdmVcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGFjdGl2ZVNlY3Rpb24oZWxlbWVudDogRWxlbWVudCk6IHZvaWQge1xuICAgICAgICBjb25zdCBuYXYgPSB0aGlzLmdldE5hdk1lbnUoKTtcbiAgICAgICAgaWYgKG5hdikge1xuICAgICAgICAgICAgLy8gUmVtb3ZlIHNlbGVjdGVkIGNsYXNzIGZyb20gYWxsIG5hdiBpdGVtc1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuYXYuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBuYXYuY2hpbGRyZW5baV0uY2xhc3NMaXN0LnJlbW92ZShDTEFTU0VTLlNFTEVDVEVEKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAvLyBGYWxsYmFjayB0byBxdWVyeVNlbGVjdG9yXG4gICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA2OyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBuYXZJdGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgJHtTRUxFQ1RPUlMuTkFWX01FTlV9ID4gZGl2Om50aC1jaGlsZCgke2l9KWApO1xuICAgICAgICAgICAgICAgIG5hdkl0ZW0/LmNsYXNzTGlzdC5yZW1vdmUoQ0xBU1NFUy5TRUxFQ1RFRCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoQ0xBU1NFUy5TRUxFQ1RFRCk7XG4gICAgfVxuXG4gICAgLy8gLS0tIER5bmFtaWMgRGlzY292ZXJ5IEhlbHBlcnMgLS0tXG5cbiAgICBwcml2YXRlIHN0YXRpYyBnZXROYXZNZW51KCk6IEVsZW1lbnQgfCBudWxsIHtcbiAgICAgICAgLy8gVHJ5IHNlbGVjdG9yXG4gICAgICAgIGNvbnN0IG5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoU0VMRUNUT1JTLk5BVl9NRU5VKTtcbiAgICAgICAgaWYgKG5hdikgcmV0dXJuIG5hdjtcblxuICAgICAgICAvLyBEeW5hbWljIGZhbGxiYWNrXG4gICAgICAgIGNvbnN0IGtleXdvcmRzID0gW1wiR2VuZXJhbFwiLCBcIkludGVyZmFjZVwiLCBcIlBsYXllclwiLCBcIlN0cmVhbWluZ1wiLCBcIlNob3J0Y3V0c1wiXTtcbiAgICAgICAgY29uc3QgbGlua3MgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2EsIGRpdlt0aXRsZV0nKSk7XG5cbiAgICAgICAgZm9yIChjb25zdCBsaW5rIG9mIGxpbmtzKSB7XG4gICAgICAgICAgICAgY29uc3QgdGl0bGUgPSBsaW5rLmdldEF0dHJpYnV0ZSgndGl0bGUnKTtcbiAgICAgICAgICAgICBpZiAodGl0bGUgJiYga2V5d29yZHMuaW5jbHVkZXModGl0bGUpKSB7XG4gICAgICAgICAgICAgICAgIGxldCBwYXJlbnQgPSBsaW5rLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgIHdoaWxlKHBhcmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgY29uc3QgZm91bmQgPSBrZXl3b3Jkcy5maWx0ZXIoayA9PiBwYXJlbnQhLnF1ZXJ5U2VsZWN0b3IoYFt0aXRsZT1cIiR7a31cIl1gKSk7XG4gICAgICAgICAgICAgICAgICAgICBpZiAoZm91bmQubGVuZ3RoID49IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFyZW50O1xuICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgICBpZiAocGFyZW50ID09PSBkb2N1bWVudC5ib2R5KSBicmVhaztcbiAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBnZXROYXZTaG9ydGN1dEl0ZW0oKTogRWxlbWVudCB8IG51bGwge1xuICAgICAgICBjb25zdCBpdGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW3RpdGxlPVwiU2hvcnRjdXRzXCJdJykgfHwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW3RpdGxlPVwiU3RyZWFtaW5nXCJdJyk7XG4gICAgICAgIHJldHVybiBpdGVtO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGdldFNldHRpbmdzUGFuZWwoKTogRWxlbWVudCB8IG51bGwge1xuICAgICAgICAvLyBUcnkgc2VsZWN0b3JcbiAgICAgICAgY29uc3QgcGFuZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFNFTEVDVE9SUy5TRUNUSU9OU19DT05UQUlORVIpO1xuICAgICAgICBpZiAocGFuZWwpIHJldHVybiBwYW5lbDtcblxuICAgICAgICAvLyBEeW5hbWljIGZhbGxiYWNrXG4gICAgICAgIGNvbnN0IG5hdk1lbnUgPSB0aGlzLmdldE5hdk1lbnUoKTtcbiAgICAgICAgY29uc3Qga2V5d29yZHMgPSBbXCJHZW5lcmFsXCIsIFwiSW50ZXJmYWNlXCIsIFwiUGxheWVyXCIsIFwiU3RyZWFtaW5nXCIsIFwiU2hvcnRjdXRzXCJdO1xuICAgICAgICBjb25zdCBhbGxEaXZzID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdkaXYnKSk7XG4gICAgICAgIGZvciAoY29uc3QgZGl2IG9mIGFsbERpdnMpIHtcbiAgICAgICAgICAgICAvLyBFeGNsdWRlIG5hdiBtZW51IGFuZCBpdHMgZGVzY2VuZGFudHNcbiAgICAgICAgICAgICBpZiAobmF2TWVudSAmJiAoZGl2ID09PSBuYXZNZW51IHx8IG5hdk1lbnUuY29udGFpbnMoZGl2KSkpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICAgLy8gVGhlIHJlYWwgc2V0dGluZ3MgcGFuZWwgY29udGFpbnMgbGFyZ2Ugc2VjdGlvbnMsIHNvIHdlIGNhbiBjaGVjayBpZiBpdCBoYXMgbXVsdGlwbGUgY2hpbGRyZW5cbiAgICAgICAgICAgICBpZiAoZGl2LmNoaWxkcmVuLmxlbmd0aCA+IDIpIHtcbiAgICAgICAgICAgICAgICAgbGV0IG1hdGNoQ291bnQgPSAwO1xuICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRpdi5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgaWYgKGtleXdvcmRzLnNvbWUoayA9PiBkaXYuY2hpbGRyZW5baV0udGV4dENvbnRlbnQ/LmluY2x1ZGVzKGspKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoQ291bnQrKztcbiAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICBpZiAobWF0Y2hDb3VudCA+PSAyKSByZXR1cm4gZGl2O1xuICAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBnZXRFeGlzdGluZ1NlY3Rpb24ocGFuZWw6IEVsZW1lbnQpOiBFbGVtZW50IHwgbnVsbCB7XG4gICAgICAgIC8vIEZpbmQgYSBjaGlsZCB0aGF0IGNvbnRhaW5zIFwiR2VuZXJhbFwiIG9yIFwiUGxheWVyXCJcbiAgICAgICAgY29uc3Qga2V5d29yZHMgPSBbXCJHZW5lcmFsXCIsIFwiSW50ZXJmYWNlXCIsIFwiUGxheWVyXCIsIFwiU3RyZWFtaW5nXCIsIFwiU2hvcnRjdXRzXCJdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhbmVsLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBjaGlsZCA9IHBhbmVsLmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgaWYgKGtleXdvcmRzLnNvbWUoayA9PiBjaGlsZC50ZXh0Q29udGVudD8uaW5jbHVkZXMoaykpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNoaWxkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIEZhbGxiYWNrIHRvIHNlbGVjdG9yXG4gICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFNFTEVDVE9SUy5TRUNUSU9OKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBnZXRFeGlzdGluZ1NlY3Rpb25MYWJlbChzZWN0aW9uOiBFbGVtZW50IHwgbnVsbCk6IEVsZW1lbnQgfCBudWxsIHtcbiAgICAgICAgaWYgKCFzZWN0aW9uKSByZXR1cm4gbnVsbDtcbiAgICAgICAgLy8gVGhlIGxhYmVsIGlzIHVzdWFsbHkgdGhlIGZpcnN0IGNoaWxkIG9yIGNsYXNzIGNvbnRhaW5zIGxhYmVsXG4gICAgICAgIGlmIChzZWN0aW9uLmNoaWxkcmVuLmxlbmd0aCA+IDApIHJldHVybiBzZWN0aW9uLmNoaWxkcmVuWzBdO1xuICAgICAgICAvLyBGYWxsYmFja1xuICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihTRUxFQ1RPUlMuTEFCRUwpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGdldENhdGVnb3J5VGVtcGxhdGUoKTogeyBjYXRlZ29yeUNsYXNzOiBzdHJpbmcsIGNhdGVnb3J5VGl0bGVDbGFzczogc3RyaW5nLCBoZWFkaW5nQ2xhc3M6IHN0cmluZywgaWNvbkNsYXNzOiBzdHJpbmcgfSB8IG51bGwge1xuICAgICAgICAvLyBUcnkgdG8gZmluZCBhbiBleGlzdGluZyBjYXRlZ29yeSB0byBjb3B5IGNsYXNzZXNcbiAgICAgICAgY29uc3QgY2F0ZWdvcnlFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihTRUxFQ1RPUlMuQ0FURUdPUlkpO1xuICAgICAgICBjb25zdCBjYXRlZ29yeVRpdGxlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoU0VMRUNUT1JTLkNBVEVHT1JZX0xBQkVMKTtcbiAgICAgICAgY29uc3QgY2F0ZWdvcnlJY29uRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoU0VMRUNUT1JTLkNBVEVHT1JZX0lDT04pO1xuICAgICAgICBjb25zdCBjYXRlZ29yeUhlYWRpbmdFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihTRUxFQ1RPUlMuQ0FURUdPUllfSEVBRElORyk7XG5cbiAgICAgICAgbGV0IGNhdGVnb3J5Q2xhc3MgPSBjYXRlZ29yeUVsZW1lbnQ/LmNsYXNzTmFtZSB8fCBcIlwiO1xuICAgICAgICBsZXQgY2F0ZWdvcnlUaXRsZUNsYXNzID0gY2F0ZWdvcnlUaXRsZUVsZW1lbnQ/LmNsYXNzTmFtZSB8fCBcIlwiO1xuICAgICAgICBsZXQgaGVhZGluZ0NsYXNzID0gY2F0ZWdvcnlIZWFkaW5nRWxlbWVudD8uY2xhc3NOYW1lIHx8IFwiXCI7XG5cbiAgICAgICAgbGV0IGljb25DbGFzcyA9ICdpY29uJztcbiAgICAgICAgaWYgKGNhdGVnb3J5SWNvbkVsZW1lbnQgaW5zdGFuY2VvZiBTVkdFbGVtZW50KSB7XG4gICAgICAgICAgICBpY29uQ2xhc3MgPSBjYXRlZ29yeUljb25FbGVtZW50LmNsYXNzTmFtZS5iYXNlVmFsO1xuICAgICAgICB9IGVsc2UgaWYgKGNhdGVnb3J5SWNvbkVsZW1lbnQpIHtcbiAgICAgICAgICAgIGljb25DbGFzcyA9IGNhdGVnb3J5SWNvbkVsZW1lbnQuY2xhc3NOYW1lO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNhdGVnb3J5Q2xhc3MgJiYgY2F0ZWdvcnlUaXRsZUNsYXNzKSB7XG4gICAgICAgICAgICByZXR1cm4geyBjYXRlZ29yeUNsYXNzLCBjYXRlZ29yeVRpdGxlQ2xhc3MsIGhlYWRpbmdDbGFzcywgaWNvbkNsYXNzIH07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUcnkgZHluYW1pYyBpZiBzZWxlY3RvciBmYWlsZWRcbiAgICAgICAgY29uc3QgcGFuZWwgPSB0aGlzLmdldFNldHRpbmdzUGFuZWwoKTtcbiAgICAgICAgaWYgKHBhbmVsKSB7XG4gICAgICAgICAgICBjb25zdCBzZWN0aW9uID0gdGhpcy5nZXRFeGlzdGluZ1NlY3Rpb24ocGFuZWwpO1xuICAgICAgICAgICAgaWYgKHNlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAvLyBGaW5kIGEgY2F0ZWdvcnkgaW5zaWRlIHNlY3Rpb25cbiAgICAgICAgICAgICAgICAvLyBVc3VhbGx5IG5vdCB0aGUgZmlyc3QgY2hpbGQgKExhYmVsKVxuICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPHNlY3Rpb24uY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2hpbGQgPSBzZWN0aW9uLmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgICAgICAgICAvLyBTa2lwIGlmIGl0IGlzIHRoZSBsYWJlbC90aXRsZVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBsYWJlbCA9IHRoaXMuZ2V0RXhpc3RpbmdTZWN0aW9uTGFiZWwoc2VjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGlsZCA9PT0gbGFiZWwpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFRoaXMgY2hpbGQgaXMgbGlrZWx5IGEgY2F0ZWdvcnlcbiAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcnlDbGFzcyA9IGNoaWxkLmNsYXNzTmFtZTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBGaW5kIEhlYWRpbmdcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaGVhZGluZyA9IGNoaWxkLmNoaWxkcmVuWzBdOyAvLyBBc3N1bWluZyBmaXJzdCBjaGlsZCBpcyBoZWFkaW5nXG4gICAgICAgICAgICAgICAgICAgIGlmIChoZWFkaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkaW5nQ2xhc3MgPSBoZWFkaW5nLmNsYXNzTmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEhlYWRpbmcgY29udGFpbnMgSWNvbiBhbmQgVGl0bGVcbiAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpY29uID0gaGVhZGluZy5xdWVyeVNlbGVjdG9yKCdzdmcnKSB8fCBoZWFkaW5nLmNoaWxkcmVuWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpY29uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpY29uIGluc3RhbmNlb2YgU1ZHRWxlbWVudCkgaWNvbkNsYXNzID0gaWNvbi5jbGFzc05hbWUuYmFzZVZhbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpY29uQ2xhc3MgPSBpY29uLmNsYXNzTmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0aXRsZSA9IGhlYWRpbmcucXVlcnlTZWxlY3RvcignZGl2JykgfHwgaGVhZGluZy5jaGlsZHJlblsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGl0bGUpIGNhdGVnb3J5VGl0bGVDbGFzcyA9IHRpdGxlLmNsYXNzTmFtZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChjYXRlZ29yeUNsYXNzICYmIGNhdGVnb3J5VGl0bGVDbGFzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGNhdGVnb3J5Q2xhc3MsIGNhdGVnb3J5VGl0bGVDbGFzcywgaGVhZGluZ0NsYXNzLCBpY29uQ2xhc3MgfTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIHdhaXRGb3JTZXR0aW5nc1BhbmVsKCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIGxldCByZXRyaWVzID0gMDtcbiAgICAgICAgICAgIGNvbnN0IG1heFJldHJpZXMgPSAyMDsgLy8gMTAgc2Vjb25kc1xuICAgICAgICAgICAgY29uc3QgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2V0U2V0dGluZ3NQYW5lbCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0cmllcysrO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmV0cmllcyA+IG1heFJldHJpZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcihcIlRpbWVvdXQgd2FpdGluZyBmb3Igc2V0dGluZ3MgcGFuZWxcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpOyAvLyByZXNvbHZlIHRvIGxldCBpdCBmYWlsIGdyYWNlZnVsbHkgaW5zaWRlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCA1MDApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyB3YWl0Rm9yTmF2TWVudSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgbGV0IHJldHJpZXMgPSAwO1xuICAgICAgICAgICAgY29uc3QgbWF4UmV0cmllcyA9IDIwO1xuICAgICAgICAgICAgY29uc3QgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2V0TmF2TWVudSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0cmllcysrO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmV0cmllcyA+IG1heFJldHJpZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcihcIlRpbWVvdXQgd2FpdGluZyBmb3IgbmF2IG1lbnVcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgNTAwKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTZXR0aW5ncztcbiIsICJpbXBvcnQgVGVtcGxhdGVDYWNoZSBmcm9tICcuLi8uLi91dGlscy90ZW1wbGF0ZUNhY2hlJztcblxuZXhwb3J0IGZ1bmN0aW9uIGdldE1vZHNUYWJUZW1wbGF0ZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiBUZW1wbGF0ZUNhY2hlLmxvYWQoX19kaXJuYW1lLCAnbW9kcy10YWInKTtcbn1cbiIsICJpbXBvcnQgVGVtcGxhdGVDYWNoZSBmcm9tICcuLi8uLi91dGlscy90ZW1wbGF0ZUNhY2hlJztcblxuaW50ZXJmYWNlIE1vZE1ldGFEYXRhIHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgICBhdXRob3I6IHN0cmluZztcbiAgICB2ZXJzaW9uOiBzdHJpbmc7XG4gICAgcHJldmlldz86IHN0cmluZztcbiAgICBkb3dubG9hZDogc3RyaW5nO1xuICAgIHJlcG86IHN0cmluZztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldE1vZEl0ZW1UZW1wbGF0ZShcbiAgICBtZXRhRGF0YTogTW9kTWV0YURhdGEsXG4gICAgdHlwZTogXCJQbHVnaW5cIiB8IFwiVGhlbWVcIiwgXG4gICAgaW5zdGFsbGVkOiBib29sZWFuXG4pOiBzdHJpbmcge1xuICAgIGxldCB0ZW1wbGF0ZSA9IFRlbXBsYXRlQ2FjaGUubG9hZChfX2Rpcm5hbWUsICdtb2RzLWl0ZW0nKTtcbiAgICBcbiAgICAvLyBHZW5lcmF0ZSBsb2dvIGJsb2NrIGJhc2VkIG9uIHR5cGVcbiAgICBsZXQgbG9nb0Jsb2NrID0gXCJcIjtcblxuICAgIGlmKHR5cGUgPT09IFwiVGhlbWVcIikge1xuICAgICAgICBpZighbWV0YURhdGEucHJldmlldykge1xuICAgICAgICAgICAgLy8gSWYgbm8gcHJldmlldyBpcyBwcm92aWRlZCBmb3IgdGhlbWUsIHVzZSBhIHBsYWNlaG9sZGVyXG4gICAgICAgICAgICBsb2dvQmxvY2sgPSBgXG4gICAgICAgIDxzdmcgY2xhc3M9XCJpY29uLUd4VmJZXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiPlxuICAgICAgICAgICAgPHBhdGggZD1cIk00IDNoMTZhMSAxIDAgMCAxIDEgMXY1YTEgMSAwIDAgMS0xIDFINGExIDEgMCAwIDEtMS0xVjRhMSAxIDAgMCAxIDEtMXptMiA5aDZhMSAxIDAgMCAxIDEgMXYzaDF2NmgtNHYtNmgxdi0ySDVhMSAxIDAgMCAxLTEtMXYtMmgydjF6bTExLjczMiAxLjczMmwxLjc2OC0xLjc2OCAxLjc2OCAxLjc2OGEyLjUgMi41IDAgMSAxLTMuNTM2IDB6XCIgc3R5bGU9XCJmaWxsOiBjdXJyZW50Y29sb3I7XCI+PC9wYXRoPlxuICAgICAgICA8L3N2Zz5gO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gVXNlIHRoZSBwcmV2aWV3IGltYWdlIGZvciB0aGVtZSBsb2dvXG4gICAgICAgICAgICBsb2dvQmxvY2sgPSBgXG4gICAgICAgICAgICA8YSBocmVmPVwiJHttZXRhRGF0YS5wcmV2aWV3fVwiIHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vcmVmZXJyZXJcIj5cbiAgICAgICAgICAgICAgICA8aW1nIGNsYXNzPVwibG9nby1XcnNHRlwiIHNyYz1cIiR7bWV0YURhdGEucHJldmlld31cIiBhbHQ9XCJUaGVtZSBQcmV2aWV3XCIgbG9hZGluZz1cImxhenlcIj5cbiAgICAgICAgICAgIDwvYT5gO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbG9nb0Jsb2NrID0gYFxuICAgICAgICA8c3ZnIGNsYXNzPVwiaWNvbi1HeFZiWVwiIHZpZXdCb3g9XCIwIDAgNTEyIDUxMlwiPlxuICAgICAgICAgICAgPHBhdGggZD1cIk0zNDUuNjUwMDAwMDAwMDAwMSA0NTYuMzAwMDAwMDAwMDAwMmgtNzAuODdjLTIuMzUgMC4wMS00LjY5LTAuNDMtNi44Ni0xLjI5LTIuMTgtMC44Ny00LjE1LTIuMTQtNS43OS0zLjc1LTMuMzctMy4xOS01LjI3LTcuNTQtNS4yOS0xMi4wN3YtMjYuMzNjMC4wMy00LjA1LTAuODEtOC4wNy0yLjQ5LTExLjc5cy00LjEyLTcuMDctNy4xNy05Ljg5Yy03Ljc4LTcuMjItMTkuMDQtMTEuMjItMzAuOC0xMC45My0yMS4zMyAwLjQ3LTM5LjI3IDE4LjM1LTM5LjI3IDM5LjA3djE5Ljg3YzAuMDEgMi4yNC0wLjQ1IDQuNDgtMS4zNiA2LjU1cy0yLjI0IDMuOTUtMy45MyA1LjUyYy0zLjM1IDMuMjEtNy45IDUuMDItMTIuNjUgNS4wNGgtNzAuMTdjLTE0LjcxIDAuMDEtMjguODMtNS41NS0zOS4yMy0xNS40Ni0xMC40Mi05LjkxLTE2LjI4LTIzLjM2LTE2LjI5LTM3LjR2LTY2LjkyYzAuMDMtNC41MyAxLjkyLTguODcgNS4yOC0xMi4wNyAzLjM2LTMuMjEgNy45MS01LjAxIDEyLjY2LTUuMDRoMjcuNjFjOS4xNyAwIDE4LjA0LTMuNzEgMjUuMDItMTAuNDYgMy44OS0zLjcyIDYuOTgtOC4xNSA5LjA3LTEzLjAyYTM3LjIgMzcuMiAwIDAgMCAzLjA5LTE1LjRjLTAuMy0yMC4xNS0xNy42NC0zNy4xNy0zNy45OC0zNy4xN2gtMjYuNzFjLTIuMzUgMC4wMS00LjY5LTAuNDMtNi44Ny0xLjI5YTE3LjcgMTcuNyAwIDAgMS01Ljc5LTMuNzVjLTMuMzctMy4xOS01LjI2LTcuNTQtNS4yOC0xMi4wN3YtNjYuOTJhNTAuOSA1MC45IDAgMCAxIDQuMTktMjAuMjVjMi43Ni02LjQzIDYuODYtMTIuMjUgMTIuMDYtMTcuMTEgMTAuMzktOS45MSAyNC40OC0xNS40OCAzOS4xNy0xNS41aDU1LjAyYzIuMTIgMC4wMSA0LjE2LTAuNzcgNS42OC0yLjE5IDAuNzMtMC43MSAxLjMyLTEuNTUgMS43MS0yLjQ5IDAuNC0wLjkzIDAuNi0xLjkyIDAuNTgtMi45MnYtNi4xOGE1OSA1OSAwIDAgMSA1LjA4LTI0LjA1YzMuMzgtNy42MiA4LjI5LTE0LjUzIDE0LjQ2LTIwLjM1IDYuMTktNS44IDEzLjU1LTEwLjM2IDIxLjYyLTEzLjRhNjkuOCA2OS44IDAgMCAxIDI1LjMyLTQuNDdjMzUuMzggMC41NyA2NC4xOSAyOC45IDY0LjE5IDYzLjAzdjUuNDJjLTAuMDMgMS41MSAwLjQyIDMgMS4yOSA0LjI1YTcuNzMgNy43MyAwIDAgMCAzLjYxIDIuODFjMC45OCAwLjM3IDIuMDMgMC41NiAzLjA3IDAuNTRoNTUuMDJhNTYuNCA1Ni40IDAgMCAxIDIwLjkzIDMuOTljMTMuNCA1LjMxIDI0LjA0IDE1LjQ2IDI5LjYgMjguMjQgMi43NyA2LjMyIDQuMiAxMy4xMSA0LjE5IDE5Ljk2djUyLjQ3Yy0wLjAzIDEuNTIgMC40MiAzLjAxIDEuMyA0LjI2YTcuNjYgNy42NiAwIDAgMCAzLjYgMi44MWMwLjk4IDAuMzcgMi4wMyAwLjU2IDMuMDcgMC41NGg1LjY4YzM2LjQ4IDAgNjYuMDkgMjcuNTcgNjYuMDkgNjEuNDEgMCAzNC43OS0yOS4zMSA2My4xMi02NS4yOSA2My4xMmgtNi40OGMtMi4xMi0wLjAxLTQuMTUgMC43OC01LjY4IDIuMTlhNy40IDcuNCAwIDAgMC0xLjcxIDIuNDljLTAuNCAwLjkzLTAuNiAxLjkzLTAuNTggMi45M3Y1My4yM2MwLjAxIDYuODUtMS40MiAxMy42NC00LjE5IDE5Ljk2LTUuNTYgMTIuNzgtMTYuMiAyMi45My0yOS42IDI4LjI0YTU2IDU2IDAgMCAxLTIwLjkzIDMuOTlcIiBzdHlsZT1cImZpbGw6IGN1cnJlbnRjb2xvcjtcIj48L3BhdGg+XG4gICAgICAgIDwvc3ZnPmBcbiAgICB9XG5cbiAgICAvLyBSZXBsYWNlIG1ldGFkYXRhIHBsYWNlaG9sZGVyc1xuICAgIGNvbnN0IG1ldGFLZXlzID0gWyduYW1lJywgJ2Rlc2NyaXB0aW9uJywgJ2F1dGhvcicsICd2ZXJzaW9uJ10gYXMgY29uc3Q7XG4gICAgbWV0YUtleXMuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBjb25zdCByZWdleCA9IG5ldyBSZWdFeHAoYHt7XFxcXHMqJHtrZXl9XFxcXHMqfX1gLCAnZycpO1xuICAgICAgICB0ZW1wbGF0ZSA9IHRlbXBsYXRlLnJlcGxhY2UocmVnZXgsIG1ldGFEYXRhW2tleV0gfHwgJycpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRlbXBsYXRlXG4gICAgICAgIC5yZXBsYWNlKC9cXHtcXHtcXHMqdHlwZVxccypcXH1cXH0vZywgdHlwZSlcbiAgICAgICAgLnJlcGxhY2UoL1xce1xce1xccyphY3Rpb25idG5UaXRsZVxccypcXH1cXH0vZywgaW5zdGFsbGVkID8gXCJVbmluc3RhbGxcIiA6IFwiSW5zdGFsbFwiKVxuICAgICAgICAucmVwbGFjZShcInt7IGFjdGlvbmJ0bkNsYXNzIH19XCIsIGluc3RhbGxlZCA/IFwidW5pbnN0YWxsLWJ1dHRvbi1jb250YWluZXItb1Y0WW9cIiA6IFwiaW5zdGFsbC1idXR0b24tY29udGFpbmVyLXlmY3E1XCIpXG4gICAgICAgIC5yZXBsYWNlKFwie3sgZG93bmxvYWQgfX1cIiwgbWV0YURhdGEuZG93bmxvYWQpXG4gICAgICAgIC5yZXBsYWNlKFwie3sgcmVwbyB9fVwiLCBtZXRhRGF0YS5yZXBvKVxuICAgICAgICAucmVwbGFjZShcIjwhLS0gdGhlbWUgcHJldmlldyBoZXJlIC0tPlwiLCBsb2dvQmxvY2spXG4gICAgICAgIC5yZXBsYWNlKFwiPCEtLSBwbHVnaW4gaWNvbiBoZXJlIC0tPlwiLCBcIlwiKTsgXG59XG4iLCAiaW1wb3J0IFRlbXBsYXRlQ2FjaGUgZnJvbSAnLi4vLi4vdXRpbHMvdGVtcGxhdGVDYWNoZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBYm91dENhdGVnb3J5VGVtcGxhdGUoXG4gICAgdmVyc2lvbjogc3RyaW5nLCBcbiAgICBjaGVja0ZvclVwZGF0ZXNPblN0YXJ0dXA6IGJvb2xlYW4sIFxuICAgIGRpc2NvcmRSaWNoUHJlc2VuY2U6IGJvb2xlYW4sIFxuICAgIGVuYWJsZVRyYW5zcGFyZW50VGhlbWVzOiBib29sZWFuXG4pOiBzdHJpbmcge1xuICAgIGNvbnN0IHRlbXBsYXRlID0gVGVtcGxhdGVDYWNoZS5sb2FkKF9fZGlybmFtZSwgJ2Fib3V0LWNhdGVnb3J5Jyk7XG4gICAgXG4gICAgcmV0dXJuIHRlbXBsYXRlXG4gICAgICAgIC5yZXBsYWNlKFwie3sgdmVyc2lvbiB9fVwiLCB2ZXJzaW9uKVxuICAgICAgICAucmVwbGFjZShcInt7IGNoZWNrRm9yVXBkYXRlc09uU3RhcnR1cCB9fVwiLCBjaGVja0ZvclVwZGF0ZXNPblN0YXJ0dXAgPyBcImNoZWNrZWRcIiA6IFwiXCIpXG4gICAgICAgIC5yZXBsYWNlKFwie3sgZGlzY29yZHJpY2hwcmVzZW5jZSB9fVwiLCBkaXNjb3JkUmljaFByZXNlbmNlID8gXCJjaGVja2VkXCIgOiBcIlwiKVxuICAgICAgICAucmVwbGFjZShcInt7IGVuYWJsZVRyYW5zcGFyZW50VGhlbWVzIH19XCIsIGVuYWJsZVRyYW5zcGFyZW50VGhlbWVzID8gXCJjaGVja2VkXCIgOiBcIlwiKTtcbn1cbiIsICJpbXBvcnQgVGVtcGxhdGVDYWNoZSBmcm9tICcuLi8uLi91dGlscy90ZW1wbGF0ZUNhY2hlJztcblxuZXhwb3J0IGZ1bmN0aW9uIGdldERlZmF1bHRUaGVtZVRlbXBsYXRlKGFwcGxpZWQ6IGJvb2xlYW4pOiBzdHJpbmcge1xuICAgIGNvbnN0IHRlbXBsYXRlID0gVGVtcGxhdGVDYWNoZS5sb2FkKF9fZGlybmFtZSwgJ2RlZmF1bHQtdGhlbWUnKTtcblxuICAgIHJldHVybiB0ZW1wbGF0ZVxuICAgICAgICAucmVwbGFjZShcInt7IGRpc2FibGVkIH19XCIsIGFwcGxpZWQgPyBcImRpc2FibGVkXCIgOiBcIlwiKVxuICAgICAgICAucmVwbGFjZShcInt7IGxhYmVsIH19XCIsIGFwcGxpZWQgPyBcIkFwcGxpZWRcIiA6IFwiQXBwbHlcIilcbiAgICAgICAgLnJlcGxhY2UoXCJ7eyBiYWNrZ3JvdW5kQ29sb3IgfX1cIiwgYXBwbGllZCA/IFwidmFyKC0tb3ZlcmxheS1jb2xvcilcIiA6IFwidmFyKC0tc2Vjb25kYXJ5LWFjY2VudC1jb2xvcilcIik7XG59XG4iLCAiaW1wb3J0IFRlbXBsYXRlQ2FjaGUgZnJvbSAnLi4vLi4vdXRpbHMvdGVtcGxhdGVDYWNoZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRCYWNrQnV0dG9uKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFRlbXBsYXRlQ2FjaGUubG9hZChfX2Rpcm5hbWUsICdiYWNrLWJ0bicpO1xufVxuIiwgImltcG9ydCB7IFBsYXRmb3JtTWFuYWdlciB9IGZyb20gXCIuLi9wbGF0Zm9ybS9QbGF0Zm9ybU1hbmFnZXJcIjtcblxuaW1wb3J0IFNldHRpbmdzIGZyb20gXCIuLi9jb3JlL1NldHRpbmdzXCI7XG5pbXBvcnQgcHJvcGVydGllcyBmcm9tIFwiLi4vY29yZS9Qcm9wZXJ0aWVzXCI7XG5pbXBvcnQgTW9kTWFuYWdlciBmcm9tIFwiLi4vY29yZS9Nb2RNYW5hZ2VyXCI7XG5pbXBvcnQgSGVscGVycyBmcm9tIFwiLi4vdXRpbHMvSGVscGVyc1wiO1xuaW1wb3J0IHsgZ2V0TW9kc1RhYlRlbXBsYXRlIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvbW9kcy10YWIvbW9kc1RhYlwiO1xuaW1wb3J0IHsgZ2V0TW9kSXRlbVRlbXBsYXRlIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvbW9kcy1pdGVtL21vZHNJdGVtXCI7XG5pbXBvcnQgeyBnZXRBYm91dENhdGVnb3J5VGVtcGxhdGUgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9hYm91dC1jYXRlZ29yeS9hYm91dENhdGVnb3J5XCI7XG5pbXBvcnQgeyBnZXREZWZhdWx0VGhlbWVUZW1wbGF0ZSB9IGZyb20gXCIuLi9jb21wb25lbnRzL2RlZmF1bHQtdGhlbWUvZGVmYXVsdFRoZW1lXCI7XG5pbXBvcnQgeyBnZXRCYWNrQnV0dG9uIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvYmFjay1idG4vYmFja0J0blwiO1xuaW1wb3J0IGxvZ2dlciBmcm9tIFwiLi4vdXRpbHMvbG9nZ2VyXCI7XG5pbXBvcnQgeyBqb2luIH0gZnJvbSBcInBhdGhcIjtcbmltcG9ydCB7XG4gICAgU1RPUkFHRV9LRVlTLFxuICAgIFNFTEVDVE9SUyxcbiAgICBDTEFTU0VTLFxuICAgIEZJTEVfRVhURU5TSU9OUyxcbiAgICBUSU1FT1VUUyxcbn0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IEV4dHJhY3RNZXRhRGF0YSBmcm9tIFwiLi4vdXRpbHMvRXh0cmFjdE1ldGFEYXRhXCI7XG5pbXBvcnQgeyBOb2RlSlMgfSBmcm9tICdjYXBhY2l0b3Itbm9kZWpzJztcbmltcG9ydCBMb2dNYW5hZ2VyIGZyb20gXCIuLi9jb3JlL0xvZ01hbmFnZXJcIjtcbmltcG9ydCB7IEZpbGVQaWNrZXIgfSBmcm9tICdAY2FwYXdlc29tZS9jYXBhY2l0b3ItZmlsZS1waWNrZXInO1xuXG4vLyBJbml0aWFsaXplIHBsYXRmb3JtIGZvciBDYXBhY2l0b3JcblBsYXRmb3JtTWFuYWdlci5pbml0KCk7XG5cbi8vIEhvb2sgY29uc29sZSBmb3IgbG9ncyBtZW51XG5Mb2dNYW5hZ2VyLmhvb2tDb25zb2xlKCk7XG5Mb2dNYW5hZ2VyLmFkZExvZygnSU5GTycsICdTdHJlbWlvIEVuaGFuY2VkOiBQcmVsb2FkIHNjcmlwdCBpbml0aWFsaXplZCcpO1xuXG4vLyBMaXN0ZW4gZm9yIHNlcnZlciBsb2dzIGFuZCBlcnJvcnNcbk5vZGVKUy5hZGRMaXN0ZW5lcignbG9nJywgKGRhdGEpID0+IHtcbiAgICBMb2dNYW5hZ2VyLmFkZExvZygnSU5GTycsIGBbU2VydmVyXSAke2RhdGEuYXJncy5qb2luKCcgJyl9YCk7XG4gICAgY29uc29sZS5sb2coJ1tTZXJ2ZXJdJywgLi4uZGF0YS5hcmdzKTtcbn0pO1xuXG5Ob2RlSlMuYWRkTGlzdGVuZXIoJ2Vycm9yJywgKGRhdGEpID0+IHtcbiAgICBMb2dNYW5hZ2VyLmFkZExvZygnRVJST1InLCBgW1NlcnZlciBFcnJvcl0gJHtkYXRhLmFyZ3Muam9pbignICcpfWApO1xuICAgIGNvbnNvbGUuZXJyb3IoJ1tTZXJ2ZXIgRXJyb3JdJywgLi4uZGF0YS5hcmdzKTtcbiAgICBIZWxwZXJzLnNob3dBbGVydCgnZXJyb3InLCAnU2VydmVyIEVycm9yJywgZGF0YS5hcmdzLmpvaW4oJyAnKSwgWydPSyddKTtcbn0pO1xuXG4vLyBNb2NrIGlwY1JlbmRlcmVyIGZvciBBbmRyb2lkXG5jb25zdCBpcGNSZW5kZXJlciA9IHtcbiAgICBpbnZva2U6IGFzeW5jIChjaGFubmVsOiBzdHJpbmcsIC4uLmFyZ3M6IGFueVtdKSA9PiB7XG4gICAgICAgIGxvZ2dlci5pbmZvKGBbQW5kcm9pZF0gSW52b2tlICR7Y2hhbm5lbH1gLCBhcmdzKTtcbiAgICAgICAgaWYgKGNoYW5uZWwgPT09ICdnZXQtdHJhbnNwYXJlbmN5LXN0YXR1cycpIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYgKGNoYW5uZWwgPT09ICdleHRyYWN0LWVtYmVkZGVkLXN1YnRpdGxlcycpIHJldHVybiBbXTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSxcbiAgICBzZW5kOiAoY2hhbm5lbDogc3RyaW5nLCAuLi5hcmdzOiBhbnlbXSkgPT4ge1xuICAgICAgICBsb2dnZXIuaW5mbyhgW0FuZHJvaWRdIFNlbmQgJHtjaGFubmVsfWAsIGFyZ3MpO1xuICAgIH0sXG4gICAgb246IChjaGFubmVsOiBzdHJpbmcsIGxpc3RlbmVyOiBhbnkpID0+IHtcbiAgICAgICAgLy8gTm8tb3BcbiAgICB9XG59O1xuXG5jb25zdCBTRVRUSU5HU19ST1VURSA9IFwiIy9zZXR0aW5nc1wiO1xuY29uc3QgUExBWUVSX1JPVVRFID0gXCIjL3BsYXllclwiO1xuY29uc3QgU1RSRUFNSU5HX1NFUlZFUl9SRUFEWV9USU1FT1VUX01TID0gMTUwMDA7XG5jb25zdCBGVUxMU0NSRUVOX0NPTlRST0xfU0VMRUNUT1JTID0gW1xuICAgICdbdGl0bGU9XCJGdWxsc2NyZWVuXCJdJyxcbiAgICAnW3RpdGxlPVwiRXhpdCBGdWxsc2NyZWVuXCJdJyxcbiAgICAnYnV0dG9uW2FyaWEtbGFiZWw9XCJGdWxsc2NyZWVuXCJdJyxcbiAgICAnYnV0dG9uW2FyaWEtbGFiZWw9XCJFeGl0IEZ1bGxzY3JlZW5cIl0nLFxuICAgICdbY2xhc3MqPVwiZnVsbHNjcmVlbi10b2dnbGVcIl0nLFxuICAgICdbY2xhc3MqPVwiaG9yaXpvbnRhbC1uYXYtYmFyLWNvbnRhaW5lci1cIl0gW2NsYXNzKj1cImJ1dHRvbnMtY29udGFpbmVyLVwiXSA+IDpub3QoW2NsYXNzKj1cIm1lbnUtYnV0dG9uLWNvbnRhaW5lclwiXSk6bm90KC5zdHJlbWlvLWVuaGFuY2VkLXBpcC1idXR0b24pJyxcbl07XG5cbmxldCBmdWxsc2NyZWVuU3R5bGVJbmplY3RlZCA9IGZhbHNlO1xubGV0IGZ1bGxzY3JlZW5PYnNlcnZlclN0YXJ0ZWQgPSBmYWxzZTtcbmxldCBzZXR0aW5nc09ic2VydmVyU3RhcnRlZCA9IGZhbHNlO1xubGV0IHNldHRpbmdzQ2hlY2tTY2hlZHVsZWQgPSBmYWxzZTtcbmxldCBwbGF5ZXJPYnNlcnZlclN0YXJ0ZWQgPSBmYWxzZTtcbmxldCBwbGF5ZXJGZWF0dXJlQ2hlY2tTY2hlZHVsZWQgPSBmYWxzZTtcbmxldCBzdHJlYW1pbmdTZXJ2ZXJSZWFkeVByb21pc2U6IFByb21pc2U8dm9pZD4gfCBudWxsID0gbnVsbDtcbmxldCBzdHJlYW1pbmdTZXJ2ZXJSZWxvYWRTY2hlZHVsZWQgPSBmYWxzZTtcblxuY29uc3QgaW5pdCA9IGFzeW5jICgpID0+IHtcbiAgICBMb2dNYW5hZ2VyLmFkZExvZygnSU5GTycsICdTdHJlbWlvIEVuaGFuY2VkOiBJbml0aWFsaXphdGlvbiBzdGFydGVkJyk7XG4gICAgLy8gSW5pdGlhbGl6ZSBwbGF0Zm9ybVxuICAgIGlmICghUGxhdGZvcm1NYW5hZ2VyLmN1cnJlbnQpIFBsYXRmb3JtTWFuYWdlci5pbml0KCk7XG4gICAgYXdhaXQgUGxhdGZvcm1NYW5hZ2VyLmN1cnJlbnQuaW5pdCgpO1xuICAgIHZvaWQgZW5zdXJlQnVuZGxlZFN0cmVhbWluZ1NlcnZlclJlYWR5KCk7XG5cbiAgICBpbnN0YWxsRnVsbHNjcmVlbkhpZGVyKCk7XG4gICAgb2JzZXJ2ZVNldHRpbmdzVWkoKTtcbiAgICBvYnNlcnZlUGxheWVyVWkoKTtcblxuICAgIC8vIEV4cG9zZSBBUEkgZm9yIGluamVjdGVkIHNjcmlwdHNcbiAgICAod2luZG93IGFzIGFueSkuc3RyZW1pb0VuaGFuY2VkID0ge1xuICAgICAgICBhcHBseVRoZW1lOiBhc3luYyAodGhlbWU6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgLy8gYXBwbHlVc2VyVGhlbWUgcmVhZHMgZnJvbSBsb2NhbFN0b3JhZ2Ugd2hpY2ggaXMgdXBkYXRlZCBieSB0aGUgaW5qZWN0ZWQgc2NyaXB0XG4gICAgICAgICAgICBhd2FpdCBhcHBseVVzZXJUaGVtZSgpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGluaXRpYWxpemVVc2VyU2V0dGluZ3MoKTtcblxuICAgIC8vIEFwcGx5IGVuYWJsZWQgdGhlbWVcbiAgICBhd2FpdCBhcHBseVVzZXJUaGVtZSgpO1xuXG4gICAgLy8gTG9hZCBlbmFibGVkIHBsdWdpbnNcbiAgICBhd2FpdCBsb2FkRW5hYmxlZFBsdWdpbnMoKTtcblxuICAgIC8vIEhhbmRsZSBuYXZpZ2F0aW9uIGNoYW5nZXNcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImhhc2hjaGFuZ2VcIiwgKCkgPT4ge1xuICAgICAgICBzY2hlZHVsZVNldHRpbmdzQ2hlY2soKTtcbiAgICAgICAgc2NoZWR1bGVQbGF5ZXJGZWF0dXJlU3luYygpO1xuICAgIH0pO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgKCkgPT4ge1xuICAgICAgICBoaWRlRnVsbHNjcmVlbkNvbnRyb2xzKCk7XG4gICAgfSk7XG5cbiAgICAvLyBJbml0aWFsIGNoZWNrXG4gICAgc2NoZWR1bGVTZXR0aW5nc0NoZWNrKCk7XG4gICAgc2NoZWR1bGVQbGF5ZXJGZWF0dXJlU3luYygpO1xuICAgIGhpZGVGdWxsc2NyZWVuQ29udHJvbHMoKTtcblxuICAgIC8vIEluamVjdCBzdWNjZXNzIHRvYXN0XG4gICAgSGVscGVycy5jcmVhdGVUb2FzdCgnZW5oYW5jZWQtbG9hZGVkJywgJ1N0cmVtaW8gRW5oYW5jZWQnLCAnU3RyZW1pbyBFbmhhbmNlZCBMb2FkZWQnLCAnc3VjY2VzcycpO1xufTtcblxuaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdsb2FkaW5nJykge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBpbml0KTtcbn0gZWxzZSB7XG4gICAgaW5pdCgpO1xufVxuXG4vLyBTZXR0aW5ncyBwYWdlIG9wZW5lZFxuYXN5bmMgZnVuY3Rpb24gY2hlY2tTZXR0aW5ncygpIHtcbiAgICBpZiAoIWxvY2F0aW9uLmhyZWYuaW5jbHVkZXMoU0VUVElOR1NfUk9VVEUpKSByZXR1cm47XG4gICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZW5oYW5jZWRcIikgfHwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtc2VjdGlvbj1cImVuaGFuY2VkXCJdJykpIHJldHVybjtcblxuICAgIE1vZE1hbmFnZXIuYWRkQXBwbHlUaGVtZUZ1bmN0aW9uKCk7XG5cbiAgICBjb25zdCB0aGVtZXNQYXRoID0gcHJvcGVydGllcy50aGVtZXNQYXRoO1xuICAgIGNvbnN0IHBsdWdpbnNQYXRoID0gcHJvcGVydGllcy5wbHVnaW5zUGF0aDtcblxuICAgIGxldCBhbGxUaGVtZXM6IHN0cmluZ1tdID0gW107XG4gICAgbGV0IGFsbFBsdWdpbnM6IHN0cmluZ1tdID0gW107XG5cbiAgICB0cnkge1xuICAgICAgICBhbGxUaGVtZXMgPSBhd2FpdCBQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC5yZWFkZGlyKHRoZW1lc1BhdGgpO1xuICAgICAgICBhbGxQbHVnaW5zID0gYXdhaXQgUGxhdGZvcm1NYW5hZ2VyLmN1cnJlbnQucmVhZGRpcihwbHVnaW5zUGF0aCk7XG4gICAgfSBjYXRjaChlKSB7XG4gICAgICAgIGxvZ2dlci5lcnJvcihcIkZhaWxlZCB0byByZWFkIHRoZW1lcy9wbHVnaW5zIGRpcmVjdG9yaWVzOiBcIiArIGUpO1xuICAgIH1cblxuICAgIGNvbnN0IHRoZW1lc0xpc3QgPSBhbGxUaGVtZXMuZmlsdGVyKGZpbGVOYW1lID0+IGZpbGVOYW1lLmVuZHNXaXRoKEZJTEVfRVhURU5TSU9OUy5USEVNRSkpO1xuICAgIGNvbnN0IHBsdWdpbnNMaXN0ID0gYWxsUGx1Z2lucy5maWx0ZXIoZmlsZU5hbWUgPT4gZmlsZU5hbWUuZW5kc1dpdGgoRklMRV9FWFRFTlNJT05TLlBMVUdJTikpO1xuXG4gICAgbG9nZ2VyLmluZm8oXCJBZGRpbmcgJ0VuaGFuY2VkJyBzZWN0aW9ucy4uLlwiKTtcbiAgICBTZXR0aW5ncy5hZGRTZWN0aW9uKFwiZW5oYW5jZWRcIiwgXCJFbmhhbmNlZFwiKTtcbiAgICBTZXR0aW5ncy5hZGRDYXRlZ29yeShcIlRoZW1lc1wiLCBcImVuaGFuY2VkXCIsIGdldFRoZW1lSWNvbigpKTtcbiAgICBTZXR0aW5ncy5hZGRDYXRlZ29yeShcIlBsdWdpbnNcIiwgXCJlbmhhbmNlZFwiLCBnZXRQbHVnaW5JY29uKCkpO1xuICAgIFNldHRpbmdzLmFkZENhdGVnb3J5KFwiQWJvdXRcIiwgXCJlbmhhbmNlZFwiLCBnZXRBYm91dEljb24oKSk7XG5cbiAgICBTZXR0aW5ncy5hZGRCdXR0b24oXCJJbXBvcnQgVGhlbWVcIiwgXCJpbXBvcnRUaGVtZUJ0blwiLCBTRUxFQ1RPUlMuVEhFTUVTX0NBVEVHT1JZKTtcbiAgICBTZXR0aW5ncy5hZGRCdXR0b24oXCJNYW5hZ2UgVGhlbWVzIEZvbGRlclwiLCBcIm9wZW50aGVtZXNmb2xkZXJCdG5cIiwgU0VMRUNUT1JTLlRIRU1FU19DQVRFR09SWSk7XG4gICAgU2V0dGluZ3MuYWRkQnV0dG9uKFwiSW1wb3J0IFBsdWdpblwiLCBcImltcG9ydFBsdWdpbkJ0blwiLCBTRUxFQ1RPUlMuUExVR0lOU19DQVRFR09SWSk7XG4gICAgU2V0dGluZ3MuYWRkQnV0dG9uKFwiTWFuYWdlIFBsdWdpbnMgRm9sZGVyXCIsIFwib3BlbnBsdWdpbnNmb2xkZXJCdG5cIiwgU0VMRUNUT1JTLlBMVUdJTlNfQ0FURUdPUlkpO1xuXG4gICAgc2V0dXBJbXBvcnRCdXR0b24oXCJpbXBvcnRUaGVtZUJ0blwiLCBcInRoZW1lXCIpO1xuICAgIHNldHVwSW1wb3J0QnV0dG9uKFwiaW1wb3J0UGx1Z2luQnRuXCIsIFwicGx1Z2luXCIpO1xuICAgIHNldHVwTWFuYWdlZEZvbGRlckJ1dHRvbihcIm9wZW50aGVtZXNmb2xkZXJCdG5cIiwgcHJvcGVydGllcy50aGVtZXNQYXRoKTtcbiAgICBzZXR1cE1hbmFnZWRGb2xkZXJCdXR0b24oXCJvcGVucGx1Z2luc2ZvbGRlckJ0blwiLCBwcm9wZXJ0aWVzLnBsdWdpbnNQYXRoKTtcblxuICAgIHdyaXRlQWJvdXQoKTtcblxuICAgIC8vIEJyb3dzZSBwbHVnaW5zL3RoZW1lcyBmcm9tIHN0cmVtaW8tZW5oYW5jZWQtcmVnaXN0cnlcbiAgICBzZXR1cEJyb3dzZU1vZHNCdXR0b24oKTtcblxuICAgIC8vIEFkZCB0aGVtZXMgdG8gc2V0dGluZ3NcbiAgICBIZWxwZXJzLndhaXRGb3JFbG0oU0VMRUNUT1JTLlRIRU1FU19DQVRFR09SWSkudGhlbihhc3luYyAoKSA9PiB7XG4gICAgICAgIC8vIERlZmF1bHQgdGhlbWVcbiAgICAgICAgY29uc3QgaXNDdXJyZW50VGhlbWVEZWZhdWx0ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oU1RPUkFHRV9LRVlTLkNVUlJFTlRfVEhFTUUpID09PSBcIkRlZmF1bHRcIjtcbiAgICAgICAgY29uc3QgZGVmYXVsdFRoZW1lQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgZGVmYXVsdFRoZW1lQ29udGFpbmVyLmlubmVySFRNTCA9IGdldERlZmF1bHRUaGVtZVRlbXBsYXRlKGlzQ3VycmVudFRoZW1lRGVmYXVsdCk7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoU0VMRUNUT1JTLlRIRU1FU19DQVRFR09SWSk/LmFwcGVuZENoaWxkKGRlZmF1bHRUaGVtZUNvbnRhaW5lcik7XG5cbiAgICAgICAgLy8gQWRkIGluc3RhbGxlZCB0aGVtZXNcbiAgICAgICAgZm9yIChjb25zdCB0aGVtZSBvZiB0aGVtZXNMaXN0KSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRoZW1lUGF0aCA9IGpvaW4odGhlbWVzUGF0aCwgdGhlbWUpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSBhd2FpdCBQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC5yZWFkRmlsZSh0aGVtZVBhdGgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1ldGFEYXRhID0gRXh0cmFjdE1ldGFEYXRhLmV4dHJhY3RNZXRhZGF0YUZyb21UZXh0KGNvbnRlbnQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKG1ldGFEYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtZXRhRGF0YS5uYW1lLnRvTG93ZXJDYXNlKCkgIT09IFwiZGVmYXVsdFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBTZXR0aW5ncy5hZGRJdGVtKFwidGhlbWVcIiwgdGhlbWUsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBtZXRhRGF0YS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBtZXRhRGF0YS5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRob3I6IG1ldGFEYXRhLmF1dGhvcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2ZXJzaW9uOiBtZXRhRGF0YS52ZXJzaW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZVVybDogbWV0YURhdGEudXBkYXRlVXJsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZTogbWV0YURhdGEuc291cmNlXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBsb2dnZXIuZXJyb3IoYEZhaWxlZCB0byBsb2FkIHRoZW1lIG1ldGFkYXRhIGZvciAke3RoZW1lfTogJHtlfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSkuY2F0Y2goZXJyID0+IGxvZ2dlci5lcnJvcihcIkZhaWxlZCB0byBzZXR1cCB0aGVtZXM6IFwiICsgZXJyKSk7XG5cbiAgICAvLyBBZGQgcGx1Z2lucyB0byBzZXR0aW5nc1xuICAgIGZvciAoY29uc3QgcGx1Z2luIG9mIHBsdWdpbnNMaXN0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBwbHVnaW5QYXRoID0gam9pbihwbHVnaW5zUGF0aCwgcGx1Z2luKTtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSBhd2FpdCBQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC5yZWFkRmlsZShwbHVnaW5QYXRoKTtcbiAgICAgICAgICAgIGNvbnN0IG1ldGFEYXRhID0gRXh0cmFjdE1ldGFEYXRhLmV4dHJhY3RNZXRhZGF0YUZyb21UZXh0KGNvbnRlbnQpO1xuXG4gICAgICAgICAgICBpZiAobWV0YURhdGEpIHtcbiAgICAgICAgICAgICAgICBTZXR0aW5ncy5hZGRJdGVtKFwicGx1Z2luXCIsIHBsdWdpbiwge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBtZXRhRGF0YS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogbWV0YURhdGEuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgICAgIGF1dGhvcjogbWV0YURhdGEuYXV0aG9yLFxuICAgICAgICAgICAgICAgICAgICB2ZXJzaW9uOiBtZXRhRGF0YS52ZXJzaW9uLFxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVVcmw6IG1ldGFEYXRhLnVwZGF0ZVVybCxcbiAgICAgICAgICAgICAgICAgICAgc291cmNlOiBtZXRhRGF0YS5zb3VyY2VcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgbG9nZ2VyLmVycm9yKGBGYWlsZWQgdG8gbG9hZCBwbHVnaW4gbWV0YWRhdGEgZm9yICR7cGx1Z2lufTogJHtlfWApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgTW9kTWFuYWdlci50b2dnbGVQbHVnaW5MaXN0ZW5lcigpO1xuICAgIE1vZE1hbmFnZXIuc2Nyb2xsTGlzdGVuZXIoKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZW5zdXJlQnVuZGxlZFN0cmVhbWluZ1NlcnZlclJlYWR5KCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmIChzdHJlYW1pbmdTZXJ2ZXJSZWFkeVByb21pc2UpIHtcbiAgICAgICAgYXdhaXQgc3RyZWFtaW5nU2VydmVyUmVhZHlQcm9taXNlO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc3RyZWFtaW5nU2VydmVyUmVhZHlQcm9taXNlID0gKGFzeW5jICgpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF3YWl0IFByb21pc2UucmFjZShbXG4gICAgICAgICAgICAgICAgTm9kZUpTLndoZW5SZWFkeSgpLFxuICAgICAgICAgICAgICAgIG5ldyBQcm9taXNlPG5ldmVyPigoXywgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoXCJUaW1lZCBvdXQgd2FpdGluZyBmb3IgdGhlIGJ1bmRsZWQgc3RyZWFtaW5nIHNlcnZlci5cIikpO1xuICAgICAgICAgICAgICAgICAgICB9LCBTVFJFQU1JTkdfU0VSVkVSX1JFQURZX1RJTUVPVVRfTVMpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdKTtcblxuICAgICAgICAgICAgTG9nTWFuYWdlci5hZGRMb2coXCJJTkZPXCIsIFwiQnVuZGxlZCBzdHJlYW1pbmcgc2VydmVyIGlzIHJlYWR5XCIpO1xuICAgICAgICAgICAgc2NoZWR1bGVTdHJlYW1pbmdTZXJ2ZXJSZWxvYWQoKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcik7XG4gICAgICAgICAgICBMb2dNYW5hZ2VyLmFkZExvZyhcIkVSUk9SXCIsIGBCdW5kbGVkIHN0cmVhbWluZyBzZXJ2ZXIgZmFpbGVkIHRvIGJlY29tZSByZWFkeTogJHttZXNzYWdlfWApO1xuICAgICAgICAgICAgbG9nZ2VyLmVycm9yKGBCdW5kbGVkIHN0cmVhbWluZyBzZXJ2ZXIgZmFpbGVkIHRvIGJlY29tZSByZWFkeTogJHttZXNzYWdlfWApO1xuICAgICAgICAgICAgc3RyZWFtaW5nU2VydmVyUmVhZHlQcm9taXNlID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH0pKCk7XG5cbiAgICBhd2FpdCBzdHJlYW1pbmdTZXJ2ZXJSZWFkeVByb21pc2U7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJlbG9hZFN0cmVhbWluZ1NlcnZlcihyZXRyeUNvdW50ID0gMCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IEhlbHBlcnMuX2V2YWwoYGNvcmUudHJhbnNwb3J0LmRpc3BhdGNoKHsgYWN0aW9uOiAnU3RyZWFtaW5nU2VydmVyJywgYXJnczogeyBhY3Rpb246ICdSZWxvYWQnIH0gfSk7YCk7XG4gICAgICAgIGxvZ2dlci5pbmZvKFwiU3RyZW1pbyBzdHJlYW1pbmcgc2VydmVyIHJlbG9hZGVkLlwiKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zdCBtZXNzYWdlID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpO1xuICAgICAgICBpZiAocmV0cnlDb3VudCA8IDMpIHtcbiAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB2b2lkIHJlbG9hZFN0cmVhbWluZ1NlcnZlcihyZXRyeUNvdW50ICsgMSk7XG4gICAgICAgICAgICB9LCBUSU1FT1VUUy5DT1JFU1RBVEVfUkVUUllfSU5URVJWQUwpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbG9nZ2VyLmVycm9yKGBGYWlsZWQgdG8gcmVsb2FkIGJ1bmRsZWQgc3RyZWFtaW5nIHNlcnZlcjogJHttZXNzYWdlfWApO1xuICAgICAgICBMb2dNYW5hZ2VyLmFkZExvZyhcIkVSUk9SXCIsIGBGYWlsZWQgdG8gcmVsb2FkIGJ1bmRsZWQgc3RyZWFtaW5nIHNlcnZlcjogJHttZXNzYWdlfWApO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gc2NoZWR1bGVTdHJlYW1pbmdTZXJ2ZXJSZWxvYWQoKTogdm9pZCB7XG4gICAgaWYgKHN0cmVhbWluZ1NlcnZlclJlbG9hZFNjaGVkdWxlZCkgcmV0dXJuO1xuICAgIHN0cmVhbWluZ1NlcnZlclJlbG9hZFNjaGVkdWxlZCA9IHRydWU7XG5cbiAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHN0cmVhbWluZ1NlcnZlclJlbG9hZFNjaGVkdWxlZCA9IGZhbHNlO1xuICAgICAgICB2b2lkIHJlbG9hZFN0cmVhbWluZ1NlcnZlcigpO1xuICAgIH0sIFRJTUVPVVRTLlNFUlZFUl9SRUxPQURfREVMQVkpO1xufVxuXG5mdW5jdGlvbiBzY2hlZHVsZVNldHRpbmdzQ2hlY2soKTogdm9pZCB7XG4gICAgaWYgKHNldHRpbmdzQ2hlY2tTY2hlZHVsZWQpIHJldHVybjtcbiAgICBzZXR0aW5nc0NoZWNrU2NoZWR1bGVkID0gdHJ1ZTtcblxuICAgIHdpbmRvdy5zZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcbiAgICAgICAgc2V0dGluZ3NDaGVja1NjaGVkdWxlZCA9IGZhbHNlO1xuICAgICAgICBhd2FpdCBjaGVja1NldHRpbmdzKCk7XG4gICAgfSwgMTAwKTtcbn1cblxuZnVuY3Rpb24gb2JzZXJ2ZVNldHRpbmdzVWkoKTogdm9pZCB7XG4gICAgaWYgKHNldHRpbmdzT2JzZXJ2ZXJTdGFydGVkKSByZXR1cm47XG4gICAgc2V0dGluZ3NPYnNlcnZlclN0YXJ0ZWQgPSB0cnVlO1xuXG4gICAgY29uc3Qgc3RhcnRPYnNlcnZlciA9ICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XG4gICAgICAgICAgICBpZiAobG9jYXRpb24uaHJlZi5pbmNsdWRlcyhTRVRUSU5HU19ST1VURSkgJiYgIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZW5oYW5jZWRcIikpIHtcbiAgICAgICAgICAgICAgICBzY2hlZHVsZVNldHRpbmdzQ2hlY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5ib2R5LCB7XG4gICAgICAgICAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgICAgICAgICBzdWJ0cmVlOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgaWYgKGRvY3VtZW50LmJvZHkpIHtcbiAgICAgICAgc3RhcnRPYnNlcnZlcigpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgYm9keU9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKF8sIG9icykgPT4ge1xuICAgICAgICBpZiAoIWRvY3VtZW50LmJvZHkpIHJldHVybjtcbiAgICAgICAgb2JzLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgc3RhcnRPYnNlcnZlcigpO1xuICAgIH0pO1xuXG4gICAgYm9keU9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCB7XG4gICAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICAgICAgc3VidHJlZTogdHJ1ZSxcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gc2NoZWR1bGVQbGF5ZXJGZWF0dXJlU3luYygpOiB2b2lkIHtcbiAgICBpZiAocGxheWVyRmVhdHVyZUNoZWNrU2NoZWR1bGVkKSByZXR1cm47XG4gICAgcGxheWVyRmVhdHVyZUNoZWNrU2NoZWR1bGVkID0gdHJ1ZTtcblxuICAgIHdpbmRvdy5zZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcbiAgICAgICAgcGxheWVyRmVhdHVyZUNoZWNrU2NoZWR1bGVkID0gZmFsc2U7XG4gICAgICAgIGF3YWl0IHN5bmNQbGF5ZXJGZWF0dXJlcygpO1xuICAgIH0sIDEwMCk7XG59XG5cbmZ1bmN0aW9uIG9ic2VydmVQbGF5ZXJVaSgpOiB2b2lkIHtcbiAgICBpZiAocGxheWVyT2JzZXJ2ZXJTdGFydGVkKSByZXR1cm47XG4gICAgcGxheWVyT2JzZXJ2ZXJTdGFydGVkID0gdHJ1ZTtcblxuICAgIGNvbnN0IHN0YXJ0T2JzZXJ2ZXIgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKGxvY2F0aW9uLmhyZWYuaW5jbHVkZXMoUExBWUVSX1JPVVRFKSkge1xuICAgICAgICAgICAgICAgIHNjaGVkdWxlUGxheWVyRmVhdHVyZVN5bmMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5ib2R5LCB7XG4gICAgICAgICAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgICAgICAgICBzdWJ0cmVlOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgaWYgKGRvY3VtZW50LmJvZHkpIHtcbiAgICAgICAgc3RhcnRPYnNlcnZlcigpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgYm9keU9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKF8sIG9icykgPT4ge1xuICAgICAgICBpZiAoIWRvY3VtZW50LmJvZHkpIHJldHVybjtcbiAgICAgICAgb2JzLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgc3RhcnRPYnNlcnZlcigpO1xuICAgIH0pO1xuXG4gICAgYm9keU9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCB7XG4gICAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICAgICAgc3VidHJlZTogdHJ1ZSxcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gaW5zdGFsbEZ1bGxzY3JlZW5IaWRlcigpOiB2b2lkIHtcbiAgICBpZiAoIWZ1bGxzY3JlZW5TdHlsZUluamVjdGVkKSB7XG4gICAgICAgIGNvbnN0IHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICAgICAgICBzdHlsZS5pZCA9IFwic3RyZW1pby1lbmhhbmNlZC1mdWxsc2NyZWVuLXN0eWxlXCI7XG4gICAgICAgIHN0eWxlLnRleHRDb250ZW50ID0gYFxuICAgICAgICAgICAgJHtGVUxMU0NSRUVOX0NPTlRST0xfU0VMRUNUT1JTLmpvaW4oXCIsXFxuICAgICAgICAgICAgXCIpfSB7XG4gICAgICAgICAgICAgICAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xuICAgICAgICAgICAgICAgIHZpc2liaWxpdHk6IGhpZGRlbiAhaW1wb3J0YW50O1xuICAgICAgICAgICAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lICFpbXBvcnRhbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIGA7XG5cbiAgICAgICAgY29uc3QgYXBwZW5kU3R5bGUgPSAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoIWRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc3R5bGUuaWQpKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcbiAgICAgICAgICAgIGZ1bGxzY3JlZW5TdHlsZUluamVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmICghYXBwZW5kU3R5bGUoKSkge1xuICAgICAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoXywgb2JzKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFhcHBlbmRTdHlsZSgpKSByZXR1cm47XG4gICAgICAgICAgICAgICAgb2JzLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsIHsgY2hpbGRMaXN0OiB0cnVlLCBzdWJ0cmVlOiB0cnVlIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGlkZUZ1bGxzY3JlZW5Db250cm9scygpO1xuXG4gICAgaWYgKGZ1bGxzY3JlZW5PYnNlcnZlclN0YXJ0ZWQpIHJldHVybjtcbiAgICBmdWxsc2NyZWVuT2JzZXJ2ZXJTdGFydGVkID0gdHJ1ZTtcblxuICAgIGNvbnN0IHN0YXJ0T2JzZXJ2ZXIgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xuICAgICAgICAgICAgaGlkZUZ1bGxzY3JlZW5Db250cm9scygpO1xuICAgICAgICB9KTtcblxuICAgICAgICBvYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmJvZHksIHtcbiAgICAgICAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICAgICAgICAgIHN1YnRyZWU6IHRydWUsXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiB0cnVlLFxuICAgICAgICAgICAgYXR0cmlidXRlRmlsdGVyOiBbXCJjbGFzc1wiLCBcInRpdGxlXCIsIFwiYXJpYS1sYWJlbFwiXSxcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGlmIChkb2N1bWVudC5ib2R5KSB7XG4gICAgICAgIHN0YXJ0T2JzZXJ2ZXIoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGJvZHlPYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKChfLCBvYnMpID0+IHtcbiAgICAgICAgaWYgKCFkb2N1bWVudC5ib2R5KSByZXR1cm47XG4gICAgICAgIG9icy5kaXNjb25uZWN0KCk7XG4gICAgICAgIHN0YXJ0T2JzZXJ2ZXIoKTtcbiAgICB9KTtcblxuICAgIGJvZHlPYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwge1xuICAgICAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgICAgIHN1YnRyZWU6IHRydWUsXG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGhpZGVGdWxsc2NyZWVuQ29udHJvbHMoKTogdm9pZCB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbDxIVE1MRWxlbWVudD4oRlVMTFNDUkVFTl9DT05UUk9MX1NFTEVDVE9SUy5qb2luKFwiLFwiKSkuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgICBpZiAoZWxlbWVudC5jbG9zZXN0KCdbY2xhc3MqPVwibWVudS1idXR0b24tY29udGFpbmVyXCJdJykgfHwgZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJzdHJlbWlvLWVuaGFuY2VkLXBpcC1idXR0b25cIikpIHJldHVybjtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBpbml0aWFsaXplVXNlclNldHRpbmdzKCk6IHZvaWQge1xuICAgIGNvbnN0IGRlZmF1bHRzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xuICAgICAgICBbU1RPUkFHRV9LRVlTLkVOQUJMRURfUExVR0lOU106IFwiW11cIixcbiAgICAgICAgW1NUT1JBR0VfS0VZUy5DSEVDS19VUERBVEVTX09OX1NUQVJUVVBdOiBcImZhbHNlXCIsXG4gICAgICAgIFtTVE9SQUdFX0tFWVMuRElTQ09SRF9SUENdOiBcImZhbHNlXCIsXG4gICAgfTtcblxuICAgIGZvciAoY29uc3QgW2tleSwgZGVmYXVsdFZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhkZWZhdWx0cykpIHtcbiAgICAgICAgaWYgKCFsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpKSB7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIGRlZmF1bHRWYWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGFwcGx5VXNlclRoZW1lKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGN1cnJlbnRUaGVtZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFNUT1JBR0VfS0VZUy5DVVJSRU5UX1RIRU1FKTtcblxuICAgIGlmICghY3VycmVudFRoZW1lIHx8IGN1cnJlbnRUaGVtZSA9PT0gXCJEZWZhdWx0XCIpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oU1RPUkFHRV9LRVlTLkNVUlJFTlRfVEhFTUUsIFwiRGVmYXVsdFwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHRoZW1lUGF0aCA9IGpvaW4ocHJvcGVydGllcy50aGVtZXNQYXRoLCBjdXJyZW50VGhlbWUpO1xuXG4gICAgLy8gSW4gY2FwYWNpdG9yLCB3ZSBuZWVkIHRvIHJlYWQgdGhlIGZpbGUgY29udGVudCBhbmQgaW5qZWN0IGl0IGFzIHN0eWxlXG4gICAgLy8gYmVjYXVzZSBmaWxlOi8vIFVSTHMgbWlnaHQgbm90IHdvcmsgb3IgYXJlIHJlc3RyaWN0ZWQuXG4gICAgLy8gRWxlY3Ryb24gaW1wbGVtZW50YXRpb24gdXNlcyBwYXRoVG9GaWxlVVJMIHdoaWNoIHJlc3VsdHMgaW4gZmlsZTovLy5cbiAgICAvLyBMZXQncyB0cnkgdG8gcmVhZCBjb250ZW50IGFuZCBpbmplY3QgPHN0eWxlPiBpbnN0ZWFkIG9mIDxsaW5rPi5cblxuICAgIHRyeSB7XG4gICAgICAgIGlmICghYXdhaXQgUGxhdGZvcm1NYW5hZ2VyLmN1cnJlbnQuZXhpc3RzKHRoZW1lUGF0aCkpIHtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFNUT1JBR0VfS0VZUy5DVVJSRU5UX1RIRU1FLCBcIkRlZmF1bHRcIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZW1vdmUgZXhpc3RpbmcgdGhlbWUgaWYgcHJlc2VudFxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFjdGl2ZVRoZW1lXCIpPy5yZW1vdmUoKTtcblxuICAgICAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgUGxhdGZvcm1NYW5hZ2VyLmN1cnJlbnQucmVhZEZpbGUodGhlbWVQYXRoKTtcblxuICAgICAgICBjb25zdCBzdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgICAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJhY3RpdmVUaGVtZVwiKTtcbiAgICAgICAgc3R5bGVFbGVtZW50LnRleHRDb250ZW50ID0gY29udGVudDtcbiAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgbG9nZ2VyLmVycm9yKFwiRmFpbGVkIHRvIGFwcGx5IHRoZW1lOiBcIiArIGUpO1xuICAgIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gbG9hZEVuYWJsZWRQbHVnaW5zKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHBsdWdpbnNQYXRoID0gcHJvcGVydGllcy5wbHVnaW5zUGF0aDtcbiAgICB0cnkge1xuICAgICAgICBpZiAoIWF3YWl0IFBsYXRmb3JtTWFuYWdlci5jdXJyZW50LmV4aXN0cyhwbHVnaW5zUGF0aCkpIHJldHVybjtcblxuICAgICAgICBjb25zdCBhbGxQbHVnaW5zID0gYXdhaXQgUGxhdGZvcm1NYW5hZ2VyLmN1cnJlbnQucmVhZGRpcihwbHVnaW5zUGF0aCk7XG4gICAgICAgIGNvbnN0IHBsdWdpbnNUb0xvYWQgPSBhbGxQbHVnaW5zLmZpbHRlcihmaWxlTmFtZSA9PiBmaWxlTmFtZS5lbmRzV2l0aChGSUxFX0VYVEVOU0lPTlMuUExVR0lOKSk7XG5cbiAgICAgICAgY29uc3QgZW5hYmxlZFBsdWdpbnM6IHN0cmluZ1tdID0gSlNPTi5wYXJzZShcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5nZXRJdGVtKFNUT1JBR0VfS0VZUy5FTkFCTEVEX1BMVUdJTlMpIHx8IFwiW11cIlxuICAgICAgICApO1xuXG4gICAgICAgIGZvciAoY29uc3QgcGx1Z2luIG9mIHBsdWdpbnNUb0xvYWQpIHtcbiAgICAgICAgICAgIGlmIChlbmFibGVkUGx1Z2lucy5pbmNsdWRlcyhwbHVnaW4pKSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgTW9kTWFuYWdlci5sb2FkUGx1Z2luKHBsdWdpbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGxvZ2dlci5lcnJvcihcIkZhaWxlZCB0byBsb2FkIHBsdWdpbnM6IFwiICsgZSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBzZXR1cEltcG9ydEJ1dHRvbihidXR0b25JZDogc3RyaW5nLCB0eXBlOiBcInRoZW1lXCIgfCBcInBsdWdpblwiKTogdm9pZCB7XG4gICAgSGVscGVycy53YWl0Rm9yRWxtKGAjJHtidXR0b25JZH1gKS50aGVuKCgpID0+IHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYnV0dG9uSWQpPy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgYXdhaXQgaW1wb3J0TW9kRmlsZSh0eXBlKTtcbiAgICAgICAgfSk7XG4gICAgfSkuY2F0Y2goZXJyID0+IGxvZ2dlci5lcnJvcihgRmFpbGVkIHRvIHNldHVwICR7dHlwZX0gaW1wb3J0IGJ1dHRvbjogJHtlcnJ9YCkpO1xufVxuXG5mdW5jdGlvbiBzZXR1cE1hbmFnZWRGb2xkZXJCdXR0b24oYnV0dG9uSWQ6IHN0cmluZywgZm9sZGVyUGF0aDogc3RyaW5nKTogdm9pZCB7XG4gICAgSGVscGVycy53YWl0Rm9yRWxtKGAjJHtidXR0b25JZH1gKS50aGVuKCgpID0+IHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYnV0dG9uSWQpPy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgYXdhaXQgUGxhdGZvcm1NYW5hZ2VyLmN1cnJlbnQub3BlblBhdGgoZm9sZGVyUGF0aCk7XG4gICAgICAgIH0pO1xuICAgIH0pLmNhdGNoKGVyciA9PiBsb2dnZXIuZXJyb3IoYEZhaWxlZCB0byBzZXR1cCBmb2xkZXIgYnV0dG9uICR7YnV0dG9uSWR9OiAke2Vycn1gKSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGltcG9ydE1vZEZpbGUodHlwZTogXCJ0aGVtZVwiIHwgXCJwbHVnaW5cIik6IFByb21pc2U8dm9pZD4ge1xuICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IEZpbGVQaWNrZXIucmVxdWVzdFBlcm1pc3Npb25zKCk7XG5cbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgRmlsZVBpY2tlci5waWNrRmlsZXMoeyBsaW1pdDogMSB9KTtcbiAgICAgICAgY29uc3QgZmlsZSA9IHJlc3VsdC5maWxlc1swXTtcbiAgICAgICAgaWYgKCFmaWxlPy5uYW1lIHx8ICFmaWxlLnBhdGgpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGV4cGVjdGVkRXh0ZW5zaW9uID0gdHlwZSA9PT0gXCJ0aGVtZVwiID8gRklMRV9FWFRFTlNJT05TLlRIRU1FIDogRklMRV9FWFRFTlNJT05TLlBMVUdJTjtcbiAgICAgICAgaWYgKCFmaWxlLm5hbWUuZW5kc1dpdGgoZXhwZWN0ZWRFeHRlbnNpb24pKSB7XG4gICAgICAgICAgICBhd2FpdCBIZWxwZXJzLnNob3dBbGVydChcbiAgICAgICAgICAgICAgICBcIndhcm5pbmdcIixcbiAgICAgICAgICAgICAgICBcIlVuc3VwcG9ydGVkIEZpbGVcIixcbiAgICAgICAgICAgICAgICBgUGxlYXNlIGNob29zZSBhICR7ZXhwZWN0ZWRFeHRlbnNpb259IGZpbGUuYCxcbiAgICAgICAgICAgICAgICBbXCJPS1wiXVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvbnRlbnQgPSBhd2FpdCBQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC5yZWFkRmlsZShmaWxlLnBhdGgpO1xuICAgICAgICBjb25zdCBkZXN0aW5hdGlvbkRpcmVjdG9yeSA9IHR5cGUgPT09IFwidGhlbWVcIiA/IHByb3BlcnRpZXMudGhlbWVzUGF0aCA6IHByb3BlcnRpZXMucGx1Z2luc1BhdGg7XG4gICAgICAgIGF3YWl0IFBsYXRmb3JtTWFuYWdlci5jdXJyZW50LndyaXRlRmlsZShqb2luKGRlc3RpbmF0aW9uRGlyZWN0b3J5LCBmaWxlLm5hbWUpLCBjb250ZW50KTtcbiAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGxvZ2dlci5lcnJvcihgRmFpbGVkIHRvIGltcG9ydCAke3R5cGV9OiAke2Vycn1gKTtcbiAgICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHN5bmNQbGF5ZXJGZWF0dXJlcygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoIVBsYXRmb3JtTWFuYWdlci5jdXJyZW50LmlzUGljdHVyZUluUGljdHVyZVN1cHBvcnRlZCgpKSB7XG4gICAgICAgIHJlbW92ZVBpY3R1cmVJblBpY3R1cmVCdXR0b24oKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghbG9jYXRpb24uaHJlZi5pbmNsdWRlcyhQTEFZRVJfUk9VVEUpKSB7XG4gICAgICAgIHJlbW92ZVBpY3R1cmVJblBpY3R1cmVCdXR0b24oKTtcbiAgICAgICAgYXdhaXQgUGxhdGZvcm1NYW5hZ2VyLmN1cnJlbnQuc2V0UGljdHVyZUluUGljdHVyZVN0YXRlKGZhbHNlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHZpZGVvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcInZpZGVvXCIpIGFzIEhUTUxWaWRlb0VsZW1lbnQgfCBudWxsO1xuICAgIGlmICghdmlkZW8pIHtcbiAgICAgICAgcmVtb3ZlUGljdHVyZUluUGljdHVyZUJ1dHRvbigpO1xuICAgICAgICBhd2FpdCBQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC5zZXRQaWN0dXJlSW5QaWN0dXJlU3RhdGUoZmFsc2UpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgYmluZFBsYXllclBpY3R1cmVJblBpY3R1cmUodmlkZW8pO1xuICAgIGluamVjdFBpY3R1cmVJblBpY3R1cmVCdXR0b24oKTtcbiAgICBhd2FpdCB1cGRhdGVQaWN0dXJlSW5QaWN0dXJlU3RhdGUodmlkZW8pO1xufVxuXG5mdW5jdGlvbiBiaW5kUGxheWVyUGljdHVyZUluUGljdHVyZSh2aWRlbzogSFRNTFZpZGVvRWxlbWVudCk6IHZvaWQge1xuICAgIGlmICh2aWRlby5kYXRhc2V0LnN0cmVtaW9FbmhhbmNlZFBpcEJvdW5kID09PSBcInRydWVcIikgcmV0dXJuO1xuICAgIHZpZGVvLmRhdGFzZXQuc3RyZW1pb0VuaGFuY2VkUGlwQm91bmQgPSBcInRydWVcIjtcblxuICAgIGNvbnN0IHN5bmNTdGF0ZSA9ICgpID0+IHtcbiAgICAgICAgdm9pZCB1cGRhdGVQaWN0dXJlSW5QaWN0dXJlU3RhdGUodmlkZW8pO1xuICAgIH07XG5cbiAgICBbXCJsb2FkZWRtZXRhZGF0YVwiLCBcInBsYXlcIiwgXCJwYXVzZVwiLCBcImVuZGVkXCIsIFwiZW1wdGllZFwiLCBcInJlc2l6ZVwiXS5mb3JFYWNoKChldmVudE5hbWUpID0+IHtcbiAgICAgICAgdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIHN5bmNTdGF0ZSk7XG4gICAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVBpY3R1cmVJblBpY3R1cmVTdGF0ZSh2aWRlbz86IEhUTUxWaWRlb0VsZW1lbnQpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoIVBsYXRmb3JtTWFuYWdlci5jdXJyZW50LmlzUGljdHVyZUluUGljdHVyZVN1cHBvcnRlZCgpKSByZXR1cm47XG5cbiAgICBjb25zdCBjdXJyZW50VmlkZW8gPSB2aWRlbyA/PyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwidmlkZW9cIikgYXMgSFRNTFZpZGVvRWxlbWVudCB8IG51bGw7XG4gICAgaWYgKCFjdXJyZW50VmlkZW8gfHwgIWxvY2F0aW9uLmhyZWYuaW5jbHVkZXMoUExBWUVSX1JPVVRFKSkge1xuICAgICAgICBhd2FpdCBQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC5zZXRQaWN0dXJlSW5QaWN0dXJlU3RhdGUoZmFsc2UpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgd2lkdGggPSBjdXJyZW50VmlkZW8udmlkZW9XaWR0aCB8fCAxNjtcbiAgICBjb25zdCBoZWlnaHQgPSBjdXJyZW50VmlkZW8udmlkZW9IZWlnaHQgfHwgOTtcbiAgICBjb25zdCBpc0FjdGl2ZVBsYXliYWNrID0gY3VycmVudFZpZGVvLnJlYWR5U3RhdGUgPiAwICYmICFjdXJyZW50VmlkZW8ucGF1c2VkICYmICFjdXJyZW50VmlkZW8uZW5kZWQ7XG5cbiAgICBhd2FpdCBQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC5zZXRQaWN0dXJlSW5QaWN0dXJlU3RhdGUoaXNBY3RpdmVQbGF5YmFjaywgd2lkdGgsIGhlaWdodCk7XG59XG5cbmZ1bmN0aW9uIGluamVjdFBpY3R1cmVJblBpY3R1cmVCdXR0b24oKTogdm9pZCB7XG4gICAgY29uc3QgZXhpc3RpbmdCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0cmVtaW8tZW5oYW5jZWQtcGlwLWJ0blwiKTtcbiAgICBpZiAoZXhpc3RpbmdCdXR0b24pIHJldHVybjtcblxuICAgIGNvbnN0IGJ1dHRvbnNDb250YWluZXIgPSBnZXRQaWN0dXJlSW5QaWN0dXJlQnV0dG9uQ29udGFpbmVyKCk7XG4gICAgaWYgKCFidXR0b25zQ29udGFpbmVyKSByZXR1cm47XG5cbiAgICBjb25zdCB0ZW1wbGF0ZUJ1dHRvbiA9IGJ1dHRvbnNDb250YWluZXIuZmlyc3RFbGVtZW50Q2hpbGQgYXMgSFRNTEVsZW1lbnQgfCBudWxsO1xuICAgIGNvbnN0IHRlbXBsYXRlSWNvbiA9IHRlbXBsYXRlQnV0dG9uPy5xdWVyeVNlbGVjdG9yKFwic3ZnXCIpO1xuXG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBidXR0b24uaWQgPSBcInN0cmVtaW8tZW5oYW5jZWQtcGlwLWJ0blwiO1xuICAgIGJ1dHRvbi50eXBlID0gXCJidXR0b25cIjtcbiAgICBidXR0b24udGl0bGUgPSBcIlBpY3R1cmUgaW4gUGljdHVyZVwiO1xuICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIFwiUGljdHVyZSBpbiBQaWN0dXJlXCIpO1xuICAgIGJ1dHRvbi5jbGFzc05hbWUgPSBgJHt0ZW1wbGF0ZUJ1dHRvbj8uY2xhc3NOYW1lID8/IFwiXCJ9IHN0cmVtaW8tZW5oYW5jZWQtcGlwLWJ1dHRvbmAudHJpbSgpO1xuICAgIGJ1dHRvbi5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxzdmcgY2xhc3M9XCIke3RlbXBsYXRlSWNvbj8uZ2V0QXR0cmlidXRlKFwiY2xhc3NcIikgPz8gXCJcIn1cIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+XG4gICAgICAgICAgICA8cGF0aCBkPVwiTTE5IDdINXYxMGgxNFY3Wm0wLTJjMS4xMSAwIDIgLjg5IDIgMnYxMGMwIDEuMTEtLjg5IDItMiAySDVjLTEuMTEgMC0yLS44OS0yLTJWN2MwLTEuMTEuODktMiAyLTJoMTRabS0xIDdoLTZ2NGg2di00WlwiIHN0eWxlPVwiZmlsbDogY3VycmVudENvbG9yO1wiPjwvcGF0aD5cbiAgICAgICAgPC9zdmc+XG4gICAgYDtcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgY3VycmVudFZpZGVvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcInZpZGVvXCIpIGFzIEhUTUxWaWRlb0VsZW1lbnQgfCBudWxsO1xuICAgICAgICBjb25zdCBzdWNjZXNzID0gYXdhaXQgUGxhdGZvcm1NYW5hZ2VyLmN1cnJlbnQuZW50ZXJQaWN0dXJlSW5QaWN0dXJlKFxuICAgICAgICAgICAgY3VycmVudFZpZGVvPy52aWRlb1dpZHRoIHx8IDE2LFxuICAgICAgICAgICAgY3VycmVudFZpZGVvPy52aWRlb0hlaWdodCB8fCA5XG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKCFzdWNjZXNzKSB7XG4gICAgICAgICAgICBIZWxwZXJzLmNyZWF0ZVRvYXN0KFxuICAgICAgICAgICAgICAgIFwicGlwLXVuYXZhaWxhYmxlXCIsXG4gICAgICAgICAgICAgICAgXCJQaWN0dXJlIGluIFBpY3R1cmVcIixcbiAgICAgICAgICAgICAgICBcIlBpY3R1cmUgaW4gUGljdHVyZSBpcyBub3QgYXZhaWxhYmxlIG9uIHRoaXMgZGV2aWNlLlwiLFxuICAgICAgICAgICAgICAgIFwiZmFpbFwiXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBidXR0b25zQ29udGFpbmVyLmluc2VydEJlZm9yZShidXR0b24sIGJ1dHRvbnNDb250YWluZXIuZmlyc3RDaGlsZCk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVBpY3R1cmVJblBpY3R1cmVCdXR0b24oKTogdm9pZCB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdHJlbWlvLWVuaGFuY2VkLXBpcC1idG5cIik/LnJlbW92ZSgpO1xufVxuXG5mdW5jdGlvbiBnZXRQaWN0dXJlSW5QaWN0dXJlQnV0dG9uQ29udGFpbmVyKCk6IEhUTUxFbGVtZW50IHwgbnVsbCB7XG4gICAgY29uc3QgYWxsQ29udGFpbmVycyA9IEFycmF5LmZyb20oXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGw8SFRNTEVsZW1lbnQ+KCdbY2xhc3MqPVwiaG9yaXpvbnRhbC1uYXYtYmFyLWNvbnRhaW5lci1cIl0gW2NsYXNzKj1cImJ1dHRvbnMtY29udGFpbmVyLVwiXScpXG4gICAgKTtcblxuICAgIHJldHVybiBhbGxDb250YWluZXJzLmF0KC0xKSA/PyBudWxsO1xufVxuXG5hc3luYyBmdW5jdGlvbiBicm93c2VNb2RzKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHNldHRpbmdzQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoU0VMRUNUT1JTLlNFVFRJTkdTX0NPTlRFTlQpO1xuICAgIGlmICghc2V0dGluZ3NDb250ZW50KSByZXR1cm47XG5cbiAgICBzZXR0aW5nc0NvbnRlbnQuaW5uZXJIVE1MID0gZ2V0TW9kc1RhYlRlbXBsYXRlKCk7XG5cbiAgICBjb25zdCBtb2RzID0gYXdhaXQgTW9kTWFuYWdlci5mZXRjaE1vZHMoKTtcbiAgICBjb25zdCBtb2RzTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW9kcy1saXN0XCIpO1xuICAgIGlmICghbW9kc0xpc3QpIHJldHVybjtcblxuICAgIGludGVyZmFjZSBSZWdpc3RyeU1vZCB7XG4gICAgICAgIG5hbWU6IHN0cmluZztcbiAgICAgICAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgICAgICAgYXV0aG9yOiBzdHJpbmc7XG4gICAgICAgIHZlcnNpb246IHN0cmluZztcbiAgICAgICAgcHJldmlldz86IHN0cmluZztcbiAgICAgICAgZG93bmxvYWQ6IHN0cmluZztcbiAgICAgICAgcmVwbzogc3RyaW5nO1xuICAgIH1cblxuICAgIC8vIEFkZCBwbHVnaW5zXG4gICAgZm9yIChjb25zdCBwbHVnaW4gb2YgKG1vZHMucGx1Z2lucyBhcyBSZWdpc3RyeU1vZFtdKSkge1xuICAgICAgICBjb25zdCBpbnN0YWxsZWQgPSBhd2FpdCBNb2RNYW5hZ2VyLmlzUGx1Z2luSW5zdGFsbGVkKEhlbHBlcnMuZ2V0RmlsZU5hbWVGcm9tVXJsKHBsdWdpbi5kb3dubG9hZCkpO1xuICAgICAgICBtb2RzTGlzdC5pbm5lckhUTUwgKz0gZ2V0TW9kSXRlbVRlbXBsYXRlKHBsdWdpbiwgXCJQbHVnaW5cIiwgaW5zdGFsbGVkKTtcbiAgICB9XG5cbiAgICAvLyBBZGQgdGhlbWVzXG4gICAgZm9yIChjb25zdCB0aGVtZSBvZiAobW9kcy50aGVtZXMgYXMgUmVnaXN0cnlNb2RbXSkpIHtcbiAgICAgICAgY29uc3QgaW5zdGFsbGVkID0gYXdhaXQgTW9kTWFuYWdlci5pc1RoZW1lSW5zdGFsbGVkKEhlbHBlcnMuZ2V0RmlsZU5hbWVGcm9tVXJsKHRoZW1lLmRvd25sb2FkKSk7XG4gICAgICAgIG1vZHNMaXN0LmlubmVySFRNTCArPSBnZXRNb2RJdGVtVGVtcGxhdGUodGhlbWUsIFwiVGhlbWVcIiwgaW5zdGFsbGVkKTtcbiAgICB9XG5cbiAgICAvLyBTZXQgdXAgYWN0aW9uIGJ1dHRvbnNcbiAgICBjb25zdCBhY3Rpb25CdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5tb2RBY3Rpb25CdG5cIik7XG4gICAgYWN0aW9uQnRucy5mb3JFYWNoKChidG4pID0+IHtcbiAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBsaW5rID0gYnRuLmdldEF0dHJpYnV0ZShcImRhdGEtbGlua1wiKTtcbiAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBidG4uZ2V0QXR0cmlidXRlKFwiZGF0YS10eXBlXCIpPy50b0xvd2VyQ2FzZSgpIGFzIFwicGx1Z2luXCIgfCBcInRoZW1lXCI7XG5cbiAgICAgICAgICAgIGlmICghbGluayB8fCAhdHlwZSkgcmV0dXJuO1xuXG4gICAgICAgICAgICBpZiAoYnRuLmdldEF0dHJpYnV0ZShcInRpdGxlXCIpID09PSBcIkluc3RhbGxcIikge1xuICAgICAgICAgICAgICAgIE1vZE1hbmFnZXIuZG93bmxvYWRNb2QobGluaywgdHlwZSk7XG4gICAgICAgICAgICAgICAgYnRuLmNsYXNzTGlzdC5yZW1vdmUoQ0xBU1NFUy5JTlNUQUxMX0JVVFRPTik7XG4gICAgICAgICAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoQ0xBU1NFUy5VTklOU1RBTExfQlVUVE9OKTtcbiAgICAgICAgICAgICAgICBidG4uc2V0QXR0cmlidXRlKFwidGl0bGVcIiwgXCJVbmluc3RhbGxcIik7XG4gICAgICAgICAgICAgICAgaWYgKGJ0bi5jaGlsZE5vZGVzWzFdKSB7XG4gICAgICAgICAgICAgICAgICAgIGJ0bi5jaGlsZE5vZGVzWzFdLnRleHRDb250ZW50ID0gXCJVbmluc3RhbGxcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIE1vZE1hbmFnZXIucmVtb3ZlTW9kKEhlbHBlcnMuZ2V0RmlsZU5hbWVGcm9tVXJsKGxpbmspLCB0eXBlKTtcbiAgICAgICAgICAgICAgICBidG4uY2xhc3NMaXN0LnJlbW92ZShDTEFTU0VTLlVOSU5TVEFMTF9CVVRUT04pO1xuICAgICAgICAgICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKENMQVNTRVMuSU5TVEFMTF9CVVRUT04pO1xuICAgICAgICAgICAgICAgIGJ0bi5zZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiLCBcIkluc3RhbGxcIik7XG4gICAgICAgICAgICAgICAgaWYgKGJ0bi5jaGlsZE5vZGVzWzFdKSB7XG4gICAgICAgICAgICAgICAgICAgIGJ0bi5jaGlsZE5vZGVzWzFdLnRleHRDb250ZW50ID0gXCJJbnN0YWxsXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIFNlYXJjaCBiYXIgbG9naWNcbiAgICBzZXR1cFNlYXJjaEJhcigpO1xuXG4gICAgLy8gQWRkIGJhY2sgYnV0dG9uXG4gICAgY29uc3QgaG9yaXpvbnRhbE5hdnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFNFTEVDVE9SUy5IT1JJWk9OVEFMX05BVik7XG4gICAgY29uc3QgaG9yaXpvbnRhbE5hdiA9IGhvcml6b250YWxOYXZzWzFdO1xuICAgIGlmIChob3Jpem9udGFsTmF2KSB7XG4gICAgICAgIGhvcml6b250YWxOYXYuaW5uZXJIVE1MID0gZ2V0QmFja0J1dHRvbigpO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJhY2stYnRuXCIpPy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgbG9jYXRpb24uaGFzaCA9ICcjLyc7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5oYXNoID0gJyMvc2V0dGluZ3MnO1xuICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gc2V0dXBTZWFyY2hCYXIoKTogdm9pZCB7XG4gICAgY29uc3Qgc2VhcmNoSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFNFTEVDVE9SUy5TRUFSQ0hfSU5QVVQpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgY29uc3QgYWRkb25zQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihTRUxFQ1RPUlMuQURET05TX0xJU1RfQ09OVEFJTkVSKTtcblxuICAgIGlmICghc2VhcmNoSW5wdXQgfHwgIWFkZG9uc0NvbnRhaW5lcikgcmV0dXJuO1xuXG4gICAgc2VhcmNoSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsICgpID0+IHtcbiAgICAgICAgY29uc3QgZmlsdGVyID0gc2VhcmNoSW5wdXQudmFsdWUudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGNvbnN0IG1vZEl0ZW1zID0gYWRkb25zQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoU0VMRUNUT1JTLkFERE9OX0NPTlRBSU5FUik7XG5cbiAgICAgICAgbW9kSXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbmFtZSA9IGl0ZW0ucXVlcnlTZWxlY3RvcihTRUxFQ1RPUlMuTkFNRV9DT05UQUlORVIpPy50ZXh0Q29udGVudD8udG9Mb3dlckNhc2UoKSB8fCBcIlwiO1xuICAgICAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoU0VMRUNUT1JTLkRFU0NSSVBUSU9OX0lURU0pPy50ZXh0Q29udGVudD8udG9Mb3dlckNhc2UoKSB8fCBcIlwiO1xuICAgICAgICAgICAgY29uc3QgdHlwZSA9IGl0ZW0ucXVlcnlTZWxlY3RvcihTRUxFQ1RPUlMuVFlQRVNfQ09OVEFJTkVSKT8udGV4dENvbnRlbnQ/LnRvTG93ZXJDYXNlKCkgfHwgXCJcIjtcblxuICAgICAgICAgICAgY29uc3QgbWF0Y2ggPSBuYW1lLmluY2x1ZGVzKGZpbHRlcikgfHwgZGVzY3JpcHRpb24uaW5jbHVkZXMoZmlsdGVyKSB8fCB0eXBlLmluY2x1ZGVzKGZpbHRlcik7XG4gICAgICAgICAgICAoaXRlbSBhcyBIVE1MRWxlbWVudCkuc3R5bGUuZGlzcGxheSA9IG1hdGNoID8gXCJcIiA6IFwibm9uZVwiO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gc2V0dXBCcm93c2VNb2RzQnV0dG9uKCk6IHZvaWQge1xuICAgIEhlbHBlcnMud2FpdEZvckVsbSgnI2Jyb3dzZVBsdWdpbnNUaGVtZXNCdG4nKS50aGVuKCgpID0+IHtcbiAgICAgICAgY29uc3QgYnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJicm93c2VQbHVnaW5zVGhlbWVzQnRuXCIpO1xuICAgICAgICBidG4/LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBicm93c2VNb2RzKTtcbiAgICB9KS5jYXRjaCgoKSA9PiB7fSk7XG59XG5cbmZ1bmN0aW9uIHdyaXRlQWJvdXQoKTogdm9pZCB7XG4gICAgSGVscGVycy53YWl0Rm9yRWxtKFNFTEVDVE9SUy5BQk9VVF9DQVRFR09SWSkudGhlbihhc3luYyAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGFib3V0Q2F0ZWdvcnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFNFTEVDVE9SUy5BQk9VVF9DQVRFR09SWSk7XG4gICAgICAgIGlmIChhYm91dENhdGVnb3J5KSB7XG4gICAgICAgICAgICAvLyBIYXJkY29kZWQgdmFsdWVzIGZvciBBbmRyb2lkXG4gICAgICAgICAgICBhYm91dENhdGVnb3J5LmlubmVySFRNTCArPSBnZXRBYm91dENhdGVnb3J5VGVtcGxhdGUoXG4gICAgICAgICAgICAgICAgXCJBbmRyb2lkLXYxLjAuMFwiLFxuICAgICAgICAgICAgICAgIGZhbHNlLFxuICAgICAgICAgICAgICAgIGZhbHNlLFxuICAgICAgICAgICAgICAgIGZhbHNlXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAvLyBBZGQgT3BlbiBMb2dzIGJ1dHRvblxuICAgICAgICAgICAgU2V0dGluZ3MuYWRkQnV0dG9uKFwiT3BlbiBMb2dzXCIsIFwib3BlbkxvZ3NCdG5cIiwgU0VMRUNUT1JTLkFCT1VUX0NBVEVHT1JZKTtcbiAgICAgICAgICAgIFNldHRpbmdzLmFkZEJ1dHRvbihcIkV4cG9ydCBMb2dzXCIsIFwiZXhwb3J0TG9nc0J0blwiLCBTRUxFQ1RPUlMuQUJPVVRfQ0FURUdPUlkpO1xuICAgICAgICAgICAgU2V0dGluZ3MuYWRkQnV0dG9uKFwiUmVsb2FkIFN0cmVhbWluZyBTZXJ2ZXJcIiwgXCJyZWxvYWRTdHJlYW1pbmdTZXJ2ZXJCdG5cIiwgU0VMRUNUT1JTLkFCT1VUX0NBVEVHT1JZKTtcbiAgICAgICAgICAgIFNldHRpbmdzLmFkZEJ1dHRvbihcIk9wZW4gQXBwIEZpbGVzXCIsIFwib3BlbkVuaGFuY2VkRm9sZGVyQnRuXCIsIFNFTEVDVE9SUy5BQk9VVF9DQVRFR09SWSk7XG5cbiAgICAgICAgICAgIC8vIEF0dGFjaCBsaXN0ZW5lclxuICAgICAgICAgICAgSGVscGVycy53YWl0Rm9yRWxtKFwiI29wZW5Mb2dzQnRuXCIpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib3BlbkxvZ3NCdG5cIik/LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIExvZ01hbmFnZXIuc2hvd0xvZ3MoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBIZWxwZXJzLndhaXRGb3JFbG0oXCIjZXhwb3J0TG9nc0J0blwiKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImV4cG9ydExvZ3NCdG5cIik/LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGV4cG9ydGVkUGF0aCA9IGF3YWl0IExvZ01hbmFnZXIuZXhwb3J0TG9ncygpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXhwb3J0ZWRQYXRoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCBQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC5vcGVuUGF0aChqb2luKHByb3BlcnRpZXMuZW5oYW5jZWRQYXRoLCBcImxvZ3NcIikpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgSGVscGVycy53YWl0Rm9yRWxtKFwiI3JlbG9hZFN0cmVhbWluZ1NlcnZlckJ0blwiKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJlbG9hZFN0cmVhbWluZ1NlcnZlckJ0blwiKT8uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgZW5zdXJlQnVuZGxlZFN0cmVhbWluZ1NlcnZlclJlYWR5KCk7XG4gICAgICAgICAgICAgICAgICAgIHNjaGVkdWxlU3RyZWFtaW5nU2VydmVyUmVsb2FkKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgSGVscGVycy53YWl0Rm9yRWxtKFwiI29wZW5FbmhhbmNlZEZvbGRlckJ0blwiKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm9wZW5FbmhhbmNlZEZvbGRlckJ0blwiKT8uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgUGxhdGZvcm1NYW5hZ2VyLmN1cnJlbnQub3BlblBhdGgocHJvcGVydGllcy5lbmhhbmNlZFBhdGgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KS5jYXRjaChlcnIgPT4gbG9nZ2VyLmVycm9yKFwiRmFpbGVkIHRvIHdyaXRlIGFib3V0IHNlY3Rpb246IFwiICsgZXJyKSk7XG59XG5cbmZ1bmN0aW9uIGdldEFib3V0SWNvbigpOiBzdHJpbmcge1xuICAgIHJldHVybiBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGNsYXNzPVwiaWNvblwiPlxuICAgICAgICA8Zz48cGF0aCBmaWxsPVwibm9uZVwiIGQ9XCJNMCAwaDI0djI0SDB6XCI+PC9wYXRoPlxuICAgICAgICA8cGF0aCBkPVwiTTEyIDIyQzYuNDc3IDIyIDIgMTcuNTIzIDIgMTJTNi40NzcgMiAxMiAyczEwIDQuNDc3IDEwIDEwLTQuNDc3IDEwLTEwIDEwem0tMS0xMXY2aDJ2LTZoLTJ6bTAtNHYyaDJWN2gtMnpcIiBzdHlsZT1cImZpbGw6Y3VycmVudGNvbG9yXCI+PC9wYXRoPjwvZz48L3N2Zz5gO1xufVxuXG5mdW5jdGlvbiBnZXRUaGVtZUljb24oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBjbGFzcz1cImljb25cIj5cbiAgICAgICAgPGc+PHBhdGggZmlsbD1cIm5vbmVcIiBkPVwiTTAgMGgyNHYyNEgwelwiPjwvcGF0aD5cbiAgICAgICAgPHBhdGggZD1cIk00IDNoMTZhMSAxIDAgMCAxIDEgMXY1YTEgMSAwIDAgMS0xIDFINGExIDEgMCAwIDEtMS0xVjRhMSAxIDAgMCAxIDEtMXptMiA5aDZhMSAxIDAgMCAxIDEgMXYzaDF2NmgtNHYtNmgxdi0ySDVhMSAxIDAgMCAxLTEtMXYtMmgydjF6bTExLjczMiAxLjczMmwxLjc2OC0xLjc2OCAxLjc2OCAxLjc2OGEyLjUgMi41IDAgMSAxLTMuNTM2IDB6XCIgc3R5bGU9XCJmaWxsOiBjdXJyZW50Y29sb3I7XCI+PC9wYXRoPjwvZz48L3N2Zz5gO1xufVxuXG5mdW5jdGlvbiBnZXRQbHVnaW5JY29uKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGA8c3ZnIGljb249XCJhZGRvbnMtb3V0bGluZVwiIGNsYXNzPVwiaWNvblwiIHZpZXdCb3g9XCIwIDAgNTEyIDUxMlwiIHN0eWxlPVwiZmlsbDogY3VycmVudGNvbG9yO1wiPlxuICAgICAgICA8cGF0aCBkPVwiTTQxMy43IDI0Ni4xSDM4NmMtMC41My0wLjAxLTEuMDMtMC4yMy0xLjQtMC42LTAuMzctMC4zNy0wLjU5LTAuODctMC42LTEuNHYtNzcuMmEzOC45NCAzOC45NCAwIDAgMC0xMS40LTI3LjUgMzguOTQgMzguOTQgMCAwIDAtMjcuNS0xMS40aC03Ny4yYy0wLjUzLTAuMDEtMS4wMy0wLjIzLTEuNC0wLjYtMC4zNy0wLjM3LTAuNTktMC44Ny0wLjYtMS40di0yNy43YzAtMjcuMS0yMS41LTQ5LjktNDguNi01MC4zLTYuNTctMC4xLTEzLjA5IDEuMDktMTkuMiAzLjVhNDkuNjE2IDQ5LjYxNiAwIDAgMC0xNi40IDEwLjcgNDkuODIzIDQ5LjgyMyAwIDAgMC0xMSAxNi4yIDQ4Ljg5NCA0OC44OTQgMCAwIDAtMy45IDE5LjJ2MjguNWMtMC4wMSAwLjUzLTAuMjMgMS4wMy0wLjYgMS40LTAuMzcgMC4zNy0wLjg3IDAuNTktMS40IDAuNmgtNzcuMmMtMTAuNSAwLTIwLjU3IDQuMTctMjggMTEuNmEzOS41OTQgMzkuNTk0IDAgMCAwLTExLjYgMjh2NzAuNGMwLjAxIDAuNTMgMC4yMyAxLjAzIDAuNiAxLjQgMC4zNyAwLjM3IDAuODcgMC41OSAxLjQgMC42aDI2LjljMjkuNCAwIDUzLjcgMjUuNSA1NC4xIDU0LjggMC40IDI5LjktMjMuNSA1Ny4yLTUzLjMgNTcuMkg1MGMtMC41MyAwLjAxLTEuMDMgMC4yMy0xLjQgMC42LTAuMzcgMC4zNy0wLjU5IDAuODctMC42IDEuNHY3MC40YzAgMTAuNSA0LjE3IDIwLjU3IDExLjYgMjhzMTcuNSAxMS42IDI4IDExLjZoNzAuNGMwLjUzLTAuMDEgMS4wMy0wLjIzIDEuNC0wLjYgMC4zNy0wLjM3IDAuNTktMC44NyAwLjYtMS40VjQ0MS4yYzAtMzAuMyAyNC44LTU2LjQgNTUtNTcuMSAzMC4xLTAuNyA1NyAyMC4zIDU3IDUwLjN2MjcuN2MwLjAxIDAuNTMgMC4yMyAxLjAzIDAuNiAxLjQgMC4zNyAwLjM3IDAuODcgMC41OSAxLjQgMC42aDcxLjFhMzguOTQgMzguOTQgMCAwIDAgMjcuNS0xMS40IDM4Ljk1OCAzOC45NTggMCAwIDAgMTEuNC0yNy41di03OGMwLjAxLTAuNTMgMC4yMy0xLjAzIDAuNi0xLjQgMC4zNy0wLjM3IDAuODctMC41OSAxLjQtMC42aDI4LjVjMjcuNiAwIDQ5LjUtMjIuNyA0OS41LTUwLjRzLTIzLjItNDguNy01MC4zLTQ4LjdaXCIgc3R5bGU9XCJzdHJva2U6Y3VycmVudGNvbG9yO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2Utd2lkdGg6MzI7ZmlsbDogY3VycmVudENvbG9yO1wiPjwvcGF0aD48L3N2Zz5gO1xufVxuIiwgImltcG9ydCB0eXBlIHsgUGx1Z2luTGlzdGVuZXJIYW5kbGUgfSBmcm9tICdAY2FwYWNpdG9yL2NvcmUnO1xuaW1wb3J0IHsgQ2FwYWNpdG9yIH0gZnJvbSAnQGNhcGFjaXRvci9jb3JlJztcblxuaW1wb3J0IHR5cGUgeyBDaGFubmVsUGF5bG9hZERhdGEsIENoYW5uZWxDYWxsYmFja0RhdGEsIENoYW5uZWxMaXN0ZW5lckNhbGxiYWNrLCBTdGFydE9wdGlvbnMgfSBmcm9tICcuL2RlZmluaXRpb25zJztcbmltcG9ydCB7IENhcGFjaXRvck5vZGVKUyB9IGZyb20gJy4vaW1wbGVtZW50YXRpb24nO1xuXG5leHBvcnQgaW50ZXJmYWNlIE5vZGVKU0ludGVyZmFjZSB7XG4gIC8qKlxuICAgKiBTdGFydHMgdGhlIE5vZGUuanMgZW5naW5lIHdpdGggcHJvcGVydGllcyBhcyBzZXQgYnkgdGhlIGBvcHRpb25zYC5cbiAgICpcbiAgICogKipOb3RlOioqIFRoaXMgbWV0aG9kIGlzIG9ubHkgYXZhaWxhYmxlIGlmIHRoZSBOb2RlLmpzIGVuZ2luZSBzdGFydHVwIG1vZGUgd2FzIHNldCB0byBgJ21hbnVhbCdgIHZpYSB0aGUgcGx1Z2luIGNvbmZpZ3VyYXRpb24uXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgc3RhcnQob3B0aW9ucz86IFN0YXJ0T3B0aW9ucyk6IFByb21pc2U8dm9pZD47XG5cbiAgLyoqXG4gICAqIFNlbmRzIGEgbWVzc2FnZSB0byB0aGUgTm9kZS5qcyBwcm9jZXNzLlxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIHNlbmQoYXJnczogQ2hhbm5lbFBheWxvYWREYXRhKTogUHJvbWlzZTx2b2lkPjtcblxuICAvKipcbiAgICogUmVzb2x2ZXMgd2hlbiB0aGUgTm9kZS5qcyBwcm9jZXNzIGlzIGluaXRpYWxpemVkLlxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIHdoZW5SZWFkeSgpOiBQcm9taXNlPHZvaWQ+O1xuXG4gIC8qKlxuICAgKiBMaXN0ZW5zIHRvIGBldmVudE5hbWVgIGFuZCBjYWxscyBgbGlzdGVuZXJGdW5jKGRhdGEpYCB3aGVuIGEgbmV3IG1lc3NhZ2UgYXJyaXZlcyBmcm9tIHRoZSBOb2RlLmpzIHByb2Nlc3MuXG4gICAqXG4gICAqICoqTm90ZToqKiBXaGVuIHVzaW5nIHRoZSBFbGVjdHJvbiBwbGF0Zm9ybSwgW2BQbHVnaW5MaXN0ZW5lckhhbmRsZS5yZW1vdmUoKWBdKCNwbHVnaW5saXN0ZW5lcmhhbmRsZSkgZG9lcyBub3Qgd29yayBkdWUgdG8gbGltaXRhdGlvbnMuXG4gICAqIFVzZSBbYHJlbW92ZUxpc3RlbmVyKGxpc3RlbmVyRnVuYylgXSgjcmVtb3ZlbGlzdGVuZXIpIGluc3RlYWQuXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgYWRkTGlzdGVuZXIoXG4gICAgZXZlbnROYW1lOiBzdHJpbmcsXG4gICAgbGlzdGVuZXJGdW5jOiBDaGFubmVsTGlzdGVuZXJDYWxsYmFjayxcbiAgKTogUHJvbWlzZTxQbHVnaW5MaXN0ZW5lckhhbmRsZT47XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgdGhlIHNwZWNpZmllZCBgbGlzdGVuZXJIYW5kbGVgIGZyb20gdGhlIGxpc3RlbmVyIGFycmF5IGZvciB0aGUgZXZlbnQgaXQgcmVmZXJzIHRvLlxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIHJlbW92ZUxpc3RlbmVyKGxpc3RlbmVySGFuZGxlOiBQbHVnaW5MaXN0ZW5lckhhbmRsZSk6IFByb21pc2U8dm9pZD47XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYWxsIGxpc3RlbmVycywgb3IgdGhvc2Ugb2YgdGhlIHNwZWNpZmllZCBgZXZlbnROYW1lYCwgZm9yIHRoaXMgcGx1Z2luLlxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIHJlbW92ZUFsbExpc3RlbmVycyhldmVudE5hbWU/OiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+O1xufVxuXG5jbGFzcyBOb2RlSlNQbHVnaW4gaW1wbGVtZW50cyBOb2RlSlNJbnRlcmZhY2Uge1xuICBwcml2YXRlIHJlYWRvbmx5IGxpc3RlbmVyTGlzdDoge1xuICAgIGV2ZW50TmFtZTogc3RyaW5nO1xuICAgIGxpc3RlbmVySGFuZGxlOiBQcm9taXNlPFBsdWdpbkxpc3RlbmVySGFuZGxlPjtcbiAgfVtdID0gW107XG5cbiAgc3RhcnQoYXJncz86IFN0YXJ0T3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiBDYXBhY2l0b3JOb2RlSlMuc3RhcnQoYXJncyk7XG4gIH1cblxuICBzZW5kKGFyZ3M6IENoYW5uZWxQYXlsb2FkRGF0YSk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiBDYXBhY2l0b3JOb2RlSlMuc2VuZChhcmdzKTtcbiAgfVxuXG4gIHdoZW5SZWFkeSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gQ2FwYWNpdG9yTm9kZUpTLndoZW5SZWFkeSgpO1xuICB9XG5cbiAgYWRkTGlzdGVuZXIoXG4gICAgZXZlbnROYW1lOiBzdHJpbmcsXG4gICAgbGlzdGVuZXJGdW5jOiBDaGFubmVsTGlzdGVuZXJDYWxsYmFjayxcbiAgKTogUHJvbWlzZTxQbHVnaW5MaXN0ZW5lckhhbmRsZT47XG5cbiAgYWRkTGlzdGVuZXIoXG4gICAgZXZlbnROYW1lOiBhbnksXG4gICAgbGlzdGVuZXJGdW5jOiBDaGFubmVsTGlzdGVuZXJDYWxsYmFjayxcbiAgKTogUHJvbWlzZTxQbHVnaW5MaXN0ZW5lckhhbmRsZT4ge1xuICAgIGNvbnN0IGxpc3RlbmVySGFuZGxlID0gQ2FwYWNpdG9yTm9kZUpTLmFkZExpc3RlbmVyKGV2ZW50TmFtZSwgKGRhdGE6IENoYW5uZWxDYWxsYmFja0RhdGEpID0+IHtcbiAgICAgIGxpc3RlbmVyRnVuYyhkYXRhKTtcbiAgICB9KTtcblxuICAgIHRoaXMubGlzdGVuZXJMaXN0LnB1c2goeyBldmVudE5hbWUsIGxpc3RlbmVySGFuZGxlIH0pO1xuICAgIHJldHVybiBsaXN0ZW5lckhhbmRsZTtcbiAgfVxuXG4gIGFzeW5jIHJlbW92ZUxpc3RlbmVyKGxpc3RlbmVySGFuZGxlOiBQbHVnaW5MaXN0ZW5lckhhbmRsZSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmIChDYXBhY2l0b3IuZ2V0UGxhdGZvcm0oKSA9PT0gJ2VsZWN0cm9uJykge1xuICAgICAgYXdhaXQgKENhcGFjaXRvck5vZGVKUyBhcyBhbnkpLnJlbW92ZUxpc3RlbmVyKGxpc3RlbmVySGFuZGxlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXdhaXQgbGlzdGVuZXJIYW5kbGUucmVtb3ZlKCk7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMubGlzdGVuZXJMaXN0Lmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgY29uc3QgbGlzdGVuZXIgPSB0aGlzLmxpc3RlbmVyTGlzdFtpbmRleF07XG5cbiAgICAgIGlmIChsaXN0ZW5lckhhbmRsZSA9PT0gKGF3YWl0IGxpc3RlbmVyLmxpc3RlbmVySGFuZGxlKSkge1xuICAgICAgICB0aGlzLmxpc3RlbmVyTGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhc3luYyByZW1vdmVBbGxMaXN0ZW5lcnMoZXZlbnROYW1lPzogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgZm9yIChjb25zdCBsaXN0ZW5lciBvZiBbLi4udGhpcy5saXN0ZW5lckxpc3RdKSB7XG4gICAgICBpZiAoIWV2ZW50TmFtZSB8fCBldmVudE5hbWUgPT09IGxpc3RlbmVyLmV2ZW50TmFtZSkge1xuICAgICAgICBjb25zdCBsaXN0ZW5lckhhbmRsZSA9IGF3YWl0IGxpc3RlbmVyLmxpc3RlbmVySGFuZGxlO1xuICAgICAgICBhd2FpdCB0aGlzLnJlbW92ZUxpc3RlbmVyKGxpc3RlbmVySGFuZGxlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuY29uc3QgTm9kZUpTID0gbmV3IE5vZGVKU1BsdWdpbigpO1xuXG5leHBvcnQgeyBOb2RlSlMgfTtcbiIsICJpbXBvcnQgdHlwZSB7IFBsdWdpbkxpc3RlbmVySGFuZGxlIH0gZnJvbSAnQGNhcGFjaXRvci9jb3JlJztcbmltcG9ydCB7IHJlZ2lzdGVyUGx1Z2luIH0gZnJvbSAnQGNhcGFjaXRvci9jb3JlJztcblxuaW1wb3J0IHR5cGUgeyBDaGFubmVsUGF5bG9hZERhdGEsIENoYW5uZWxMaXN0ZW5lckNhbGxiYWNrLCBTdGFydE9wdGlvbnMgfSBmcm9tICcuL2RlZmluaXRpb25zJztcblxuZXhwb3J0IGludGVyZmFjZSBDYXBhY2l0b3JOb2RlSlNQbHVnaW4ge1xuICBzdGFydChhcmdzPzogU3RhcnRPcHRpb25zKTogUHJvbWlzZTx2b2lkPjtcbiAgc2VuZChhcmdzOiBDaGFubmVsUGF5bG9hZERhdGEpOiBQcm9taXNlPHZvaWQ+O1xuICB3aGVuUmVhZHkoKTogUHJvbWlzZTx2b2lkPjtcblxuICBhZGRMaXN0ZW5lcihcbiAgICBldmVudE5hbWU6IHN0cmluZyxcbiAgICBsaXN0ZW5lckZ1bmM6IENoYW5uZWxMaXN0ZW5lckNhbGxiYWNrLFxuICApOiBQcm9taXNlPFBsdWdpbkxpc3RlbmVySGFuZGxlPjtcbn1cblxuY29uc3QgQ2FwYWNpdG9yTm9kZUpTID0gcmVnaXN0ZXJQbHVnaW48Q2FwYWNpdG9yTm9kZUpTUGx1Z2luPignQ2FwYWNpdG9yTm9kZUpTJywge1xuICB3ZWI6ICgpID0+IGltcG9ydCgnLi93ZWInKS50aGVuKChtKSA9PiBuZXcgbS5DYXBhY2l0b3JOb2RlSlNXZWIoKSksXG4gIGVsZWN0cm9uOiAoKSA9PiAod2luZG93IGFzIGFueSkuQ2FwYWNpdG9yQ3VzdG9tUGxhdGZvcm0ucGx1Z2lucy5DYXBhY2l0b3JOb2RlSlMsXG59KTtcblxuZXhwb3J0IHsgQ2FwYWNpdG9yTm9kZUpTIH07XG4iLCAiaW1wb3J0IHsgam9pbiB9IGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyBQbGF0Zm9ybU1hbmFnZXIgfSBmcm9tIFwiLi4vcGxhdGZvcm0vUGxhdGZvcm1NYW5hZ2VyXCI7XG5pbXBvcnQgcHJvcGVydGllcyBmcm9tIFwiLi9Qcm9wZXJ0aWVzXCI7XG5cbmV4cG9ydCB0eXBlIExvZ0xldmVsID0gJ0lORk8nIHwgJ1dBUk4nIHwgJ0VSUk9SJyB8ICdERUJVRyc7XG5cbmludGVyZmFjZSBMb2dFbnRyeSB7XG4gICAgdGltZXN0YW1wOiBzdHJpbmc7XG4gICAgbGV2ZWw6IExvZ0xldmVsO1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbn1cblxuY2xhc3MgTG9nTWFuYWdlciB7XG4gICAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IExvZ01hbmFnZXI7XG4gICAgcHJpdmF0ZSBsb2dzOiBMb2dFbnRyeVtdID0gW107XG4gICAgcHJpdmF0ZSBtYXhMb2dzID0gMTAwMDtcbiAgICBwcml2YXRlIG9yaWdpbmFsQ29uc29sZTogYW55ID0ge307XG4gICAgcHJpdmF0ZSBpc0hvb2tlZCA9IGZhbHNlO1xuXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IExvZ01hbmFnZXIge1xuICAgICAgICBpZiAoIUxvZ01hbmFnZXIuaW5zdGFuY2UpIHtcbiAgICAgICAgICAgIExvZ01hbmFnZXIuaW5zdGFuY2UgPSBuZXcgTG9nTWFuYWdlcigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBMb2dNYW5hZ2VyLmluc3RhbmNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBob29rQ29uc29sZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuaXNIb29rZWQpIHJldHVybjtcbiAgICAgICAgdGhpcy5pc0hvb2tlZCA9IHRydWU7XG5cbiAgICAgICAgY29uc3QgbWV0aG9kczogTG9nTGV2ZWxbXSA9IFsnSU5GTycsICdXQVJOJywgJ0VSUk9SJywgJ0RFQlVHJ107XG5cbiAgICAgICAgbWV0aG9kcy5mb3JFYWNoKGxldmVsID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNvbnNvbGVNZXRob2QgPSBsZXZlbC50b0xvd2VyQ2FzZSgpIGFzIGtleW9mIENvbnNvbGU7XG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICAgICAgdGhpcy5vcmlnaW5hbENvbnNvbGVbY29uc29sZU1ldGhvZF0gPSAoY29uc29sZSBhcyBhbnkpW2NvbnNvbGVNZXRob2RdLmJpbmQoY29uc29sZSk7XG5cbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgICAgICAoY29uc29sZSBhcyBhbnkpW2NvbnNvbGVNZXRob2RdID0gKC4uLmFyZ3M6IGFueVtdKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRMb2cobGV2ZWwsIGFyZ3MubWFwKGFyZyA9PlxuICAgICAgICAgICAgICAgICAgICB0eXBlb2YgYXJnID09PSAnb2JqZWN0JyA/IEpTT04uc3RyaW5naWZ5KGFyZykgOiBTdHJpbmcoYXJnKVxuICAgICAgICAgICAgICAgICkuam9pbignICcpKTtcblxuICAgICAgICAgICAgICAgIC8vIENhbGwgb3JpZ2luYWxcbiAgICAgICAgICAgICAgICB0aGlzLm9yaWdpbmFsQ29uc29sZVtjb25zb2xlTWV0aG9kXSguLi5hcmdzKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEhvb2sgbG9nIGFzIElORk9cbiAgICAgICAgdGhpcy5vcmlnaW5hbENvbnNvbGVbJ2xvZyddID0gY29uc29sZS5sb2cuYmluZChjb25zb2xlKTtcbiAgICAgICAgY29uc29sZS5sb2cgPSAoLi4uYXJnczogYW55W10pID0+IHtcbiAgICAgICAgICAgIHRoaXMuYWRkTG9nKCdJTkZPJywgYXJncy5tYXAoYXJnID0+XG4gICAgICAgICAgICAgICAgdHlwZW9mIGFyZyA9PT0gJ29iamVjdCcgPyBKU09OLnN0cmluZ2lmeShhcmcpIDogU3RyaW5nKGFyZylcbiAgICAgICAgICAgICkuam9pbignICcpKTtcbiAgICAgICAgICAgIHRoaXMub3JpZ2luYWxDb25zb2xlWydsb2cnXSguLi5hcmdzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBhZGRMb2cobGV2ZWw6IExvZ0xldmVsLCBtZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgdGltZXN0YW1wID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMV0uc2xpY2UoMCwgLTEpO1xuICAgICAgICB0aGlzLmxvZ3MucHVzaCh7IHRpbWVzdGFtcCwgbGV2ZWwsIG1lc3NhZ2UgfSk7XG4gICAgICAgIGlmICh0aGlzLmxvZ3MubGVuZ3RoID4gdGhpcy5tYXhMb2dzKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ3Muc2hpZnQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBleHBvcnRMb2dzKCk6IFByb21pc2U8c3RyaW5nIHwgbnVsbD4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgbG9nc0RpciA9IGpvaW4ocHJvcGVydGllcy5lbmhhbmNlZFBhdGgsIFwibG9nc1wiKTtcbiAgICAgICAgICAgIGlmICghYXdhaXQgUGxhdGZvcm1NYW5hZ2VyLmN1cnJlbnQuZXhpc3RzKGxvZ3NEaXIpKSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgUGxhdGZvcm1NYW5hZ2VyLmN1cnJlbnQubWtkaXIobG9nc0Rpcik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGZpbGVOYW1lID0gYHN0cmVtaW8tZW5oYW5jZWQtJHtuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkucmVwbGFjZSgvWzouXS9nLCBcIi1cIil9LmxvZ2A7XG4gICAgICAgICAgICBjb25zdCBmaWxlUGF0aCA9IGpvaW4obG9nc0RpciwgZmlsZU5hbWUpO1xuICAgICAgICAgICAgYXdhaXQgUGxhdGZvcm1NYW5hZ2VyLmN1cnJlbnQud3JpdGVGaWxlKGZpbGVQYXRoLCB0aGlzLnNlcmlhbGl6ZUxvZ3MoKSk7XG4gICAgICAgICAgICByZXR1cm4gZmlsZVBhdGg7XG4gICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc2hvd0xvZ3MoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IG92ZXJsYXlJZCA9ICdzdHJlbWlvLWVuaGFuY2VkLWxvZ3Mtb3ZlcmxheSc7XG4gICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChvdmVybGF5SWQpKSByZXR1cm47XG5cbiAgICAgICAgY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBvdmVybGF5LmlkID0gb3ZlcmxheUlkO1xuICAgICAgICBvdmVybGF5LnN0eWxlLmNzc1RleHQgPSBgXG4gICAgICAgICAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgICAgICAgICB0b3A6IDA7XG4gICAgICAgICAgICBsZWZ0OiAwO1xuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuOCk7XG4gICAgICAgICAgICB6LWluZGV4OiA5OTk5OTtcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICAgICAgcGFkZGluZzogMjBweDtcbiAgICAgICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICAgICAgICBjb2xvcjogI2ZmZjtcbiAgICAgICAgICAgIGZvbnQtZmFtaWx5OiBtb25vc3BhY2U7XG4gICAgICAgIGA7XG5cbiAgICAgICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGhlYWRlci5zdHlsZS5jc3NUZXh0ID0gYFxuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xuICAgICAgICAgICAgYmFja2dyb3VuZDogIzFhMWExYTtcbiAgICAgICAgICAgIHBhZGRpbmc6IDEwcHg7XG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiA1cHg7XG4gICAgICAgIGA7XG5cbiAgICAgICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuICAgICAgICB0aXRsZS50ZXh0Q29udGVudCA9ICdMb2dzJztcbiAgICAgICAgdGl0bGUuc3R5bGUubWFyZ2luID0gJzAnO1xuXG4gICAgICAgIGNvbnN0IGNvbnRyb2xzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnRyb2xzLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgICAgIGNvbnRyb2xzLnN0eWxlLmdhcCA9ICcxMHB4JztcblxuICAgICAgICBjb25zdCBmaWx0ZXJTZWxlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWxlY3QnKTtcbiAgICAgICAgZmlsdGVyU2VsZWN0LnN0eWxlLmNzc1RleHQgPSBgXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAjMzMzO1xuICAgICAgICAgICAgY29sb3I6IHdoaXRlO1xuICAgICAgICAgICAgYm9yZGVyOiAxcHggc29saWQgIzU1NTtcbiAgICAgICAgICAgIHBhZGRpbmc6IDVweDtcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDNweDtcbiAgICAgICAgYDtcbiAgICAgICAgWydBTEwnLCAnSU5GTycsICdXQVJOJywgJ0VSUk9SJ10uZm9yRWFjaChsZXZlbCA9PiB7XG4gICAgICAgICAgICBjb25zdCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcbiAgICAgICAgICAgIG9wdGlvbi52YWx1ZSA9IGxldmVsO1xuICAgICAgICAgICAgb3B0aW9uLnRleHRDb250ZW50ID0gbGV2ZWw7XG4gICAgICAgICAgICBmaWx0ZXJTZWxlY3QuYXBwZW5kQ2hpbGQob3B0aW9uKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgY29weUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBjb3B5QnRuLnRleHRDb250ZW50ID0gJ0NvcHkgQWxsJztcbiAgICAgICAgY29weUJ0bi5zdHlsZS5jc3NUZXh0ID0gYFxuICAgICAgICAgICAgYmFja2dyb3VuZDogIzRhNGE0YTtcbiAgICAgICAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICAgICAgICAgIGJvcmRlcjogbm9uZTtcbiAgICAgICAgICAgIHBhZGRpbmc6IDVweCAxMHB4O1xuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogM3B4O1xuICAgICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICBgO1xuXG4gICAgICAgIGNvbnN0IGV4cG9ydEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBleHBvcnRCdG4udGV4dENvbnRlbnQgPSAnRXhwb3J0JztcbiAgICAgICAgZXhwb3J0QnRuLnN0eWxlLmNzc1RleHQgPSBgXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAjMjU2M2ViO1xuICAgICAgICAgICAgY29sb3I6IHdoaXRlO1xuICAgICAgICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgICAgICAgcGFkZGluZzogNXB4IDEwcHg7XG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiAzcHg7XG4gICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgIGA7XG5cbiAgICAgICAgY29uc3QgY2xvc2VCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgY2xvc2VCdG4udGV4dENvbnRlbnQgPSAnQ2xvc2UnO1xuICAgICAgICBjbG9zZUJ0bi5zdHlsZS5jc3NUZXh0ID0gYFxuICAgICAgICAgICAgYmFja2dyb3VuZDogI2MwMzkyYjtcbiAgICAgICAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICAgICAgICAgIGJvcmRlcjogbm9uZTtcbiAgICAgICAgICAgIHBhZGRpbmc6IDVweCAxMHB4O1xuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogM3B4O1xuICAgICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICBgO1xuXG4gICAgICAgIGNvbnRyb2xzLmFwcGVuZENoaWxkKGZpbHRlclNlbGVjdCk7XG4gICAgICAgIGNvbnRyb2xzLmFwcGVuZENoaWxkKGNvcHlCdG4pO1xuICAgICAgICBjb250cm9scy5hcHBlbmRDaGlsZChleHBvcnRCdG4pO1xuICAgICAgICBjb250cm9scy5hcHBlbmRDaGlsZChjbG9zZUJ0bik7XG4gICAgICAgIGhlYWRlci5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gICAgICAgIGhlYWRlci5hcHBlbmRDaGlsZChjb250cm9scyk7XG5cbiAgICAgICAgY29uc3QgbG9nc0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBsb2dzQ29udGFpbmVyLmlkID0gJ2xvZ3MtY29udGFpbmVyJztcbiAgICAgICAgbG9nc0NvbnRhaW5lci5zdHlsZS5jc3NUZXh0ID0gYFxuICAgICAgICAgICAgZmxleDogMTtcbiAgICAgICAgICAgIG92ZXJmbG93LXk6IGF1dG87XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAjMTExO1xuICAgICAgICAgICAgcGFkZGluZzogMTBweDtcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgICAgICAgICAgIHdoaXRlLXNwYWNlOiBwcmUtd3JhcDtcbiAgICAgICAgICAgIHdvcmQtYnJlYWs6IGJyZWFrLWFsbDtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICAgICAgYDtcblxuICAgICAgICBvdmVybGF5LmFwcGVuZENoaWxkKGhlYWRlcik7XG4gICAgICAgIG92ZXJsYXkuYXBwZW5kQ2hpbGQobG9nc0NvbnRhaW5lcik7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQob3ZlcmxheSk7XG5cbiAgICAgICAgY29uc3QgcmVuZGVyTG9ncyA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZpbHRlciA9IGZpbHRlclNlbGVjdC52YWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IGZpbHRlcmVkTG9ncyA9IGZpbHRlciA9PT0gJ0FMTCdcbiAgICAgICAgICAgICAgICA/IHRoaXMubG9nc1xuICAgICAgICAgICAgICAgIDogdGhpcy5sb2dzLmZpbHRlcihsID0+IGwubGV2ZWwgPT09IGZpbHRlcik7XG5cbiAgICAgICAgICAgIGxvZ3NDb250YWluZXIuaW5uZXJIVE1MID0gZmlsdGVyZWRMb2dzLm1hcChsID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb2xvciA9IGwubGV2ZWwgPT09ICdFUlJPUicgPyAnI2ZmNTU1NScgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbC5sZXZlbCA9PT0gJ1dBUk4nID8gJyNmZmI4NmMnIDogJyM1MGZhN2InO1xuICAgICAgICAgICAgICAgIHJldHVybiBgPGRpdiBzdHlsZT1cIm1hcmdpbi1ib3R0b206IDJweDtcIj48c3BhbiBzdHlsZT1cImNvbG9yOiAjNjI3MmE0XCI+WyR7bC50aW1lc3RhbXB9XTwvc3Bhbj4gPHNwYW4gc3R5bGU9XCJjb2xvcjogJHtjb2xvcn1cIj5bJHtsLmxldmVsfV08L3NwYW4+ICR7dGhpcy5lc2NhcGVIdG1sKGwubWVzc2FnZSl9PC9kaXY+YDtcbiAgICAgICAgICAgIH0pLmpvaW4oJycpO1xuICAgICAgICAgICAgbG9nc0NvbnRhaW5lci5zY3JvbGxUb3AgPSBsb2dzQ29udGFpbmVyLnNjcm9sbEhlaWdodDtcbiAgICAgICAgfTtcblxuICAgICAgICByZW5kZXJMb2dzKCk7XG5cbiAgICAgICAgZmlsdGVyU2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHJlbmRlckxvZ3MpO1xuXG4gICAgICAgIGNvcHlCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0ZXh0ID0gdGhpcy5zZXJpYWxpemVMb2dzKCk7XG4gICAgICAgICAgICBjb25zdCB0ZXh0QXJlYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZXh0YXJlYVwiKTtcbiAgICAgICAgICAgIHRleHRBcmVhLnZhbHVlID0gdGV4dDtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGV4dEFyZWEpO1xuICAgICAgICAgICAgdGV4dEFyZWEuc2VsZWN0KCk7XG4gICAgICAgICAgICBkb2N1bWVudC5leGVjQ29tbWFuZChcIkNvcHlcIik7XG4gICAgICAgICAgICB0ZXh0QXJlYS5yZW1vdmUoKTtcblxuICAgICAgICAgICAgY29uc3Qgb3JpZ2luYWxUZXh0ID0gY29weUJ0bi50ZXh0Q29udGVudDtcbiAgICAgICAgICAgIGNvcHlCdG4udGV4dENvbnRlbnQgPSAnQ29waWVkISc7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGNvcHlCdG4udGV4dENvbnRlbnQgPSBvcmlnaW5hbFRleHQsIDIwMDApO1xuICAgICAgICB9KTtcblxuICAgICAgICBleHBvcnRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBvcmlnaW5hbFRleHQgPSBleHBvcnRCdG4udGV4dENvbnRlbnQ7XG4gICAgICAgICAgICBleHBvcnRCdG4udGV4dENvbnRlbnQgPSAnRXhwb3J0aW5nLi4uJztcblxuICAgICAgICAgICAgY29uc3QgZXhwb3J0ZWRQYXRoID0gYXdhaXQgdGhpcy5leHBvcnRMb2dzKCk7XG4gICAgICAgICAgICBpZiAoZXhwb3J0ZWRQYXRoKSB7XG4gICAgICAgICAgICAgICAgZXhwb3J0QnRuLnRleHRDb250ZW50ID0gJ0V4cG9ydGVkISc7XG4gICAgICAgICAgICAgICAgYXdhaXQgUGxhdGZvcm1NYW5hZ2VyLmN1cnJlbnQub3BlblBhdGgoam9pbihwcm9wZXJ0aWVzLmVuaGFuY2VkUGF0aCwgXCJsb2dzXCIpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZXhwb3J0QnRuLnRleHRDb250ZW50ID0gJ0ZhaWxlZCc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gZXhwb3J0QnRuLnRleHRDb250ZW50ID0gb3JpZ2luYWxUZXh0LCAyMDAwKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY2xvc2VCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBvdmVybGF5LnJlbW92ZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNlcmlhbGl6ZUxvZ3MoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9ncy5tYXAobG9nID0+IGBbJHtsb2cudGltZXN0YW1wfV0gWyR7bG9nLmxldmVsfV0gJHtsb2cubWVzc2FnZX1gKS5qb2luKCdcXG4nKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGVzY2FwZUh0bWwodW5zYWZlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdW5zYWZlXG4gICAgICAgICAgICAgLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKVxuICAgICAgICAgICAgIC5yZXBsYWNlKC88L2csIFwiJmx0O1wiKVxuICAgICAgICAgICAgIC5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKVxuICAgICAgICAgICAgIC5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKVxuICAgICAgICAgICAgIC5yZXBsYWNlKC8nL2csIFwiJiMwMzk7XCIpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTG9nTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUEwQkEsZUFBUyxXQUFXLE1BQU07QUFDeEIsWUFBSSxPQUFPLFNBQVMsVUFBVTtBQUM1QixnQkFBTSxJQUFJLFVBQVUscUNBQXFDLEtBQUssVUFBVSxJQUFJLENBQUM7QUFBQSxRQUMvRTtBQUFBLE1BQ0Y7QUFHQSxlQUFTLHFCQUFxQixNQUFNLGdCQUFnQjtBQUNsRCxZQUFJLE1BQU07QUFDVixZQUFJLG9CQUFvQjtBQUN4QixZQUFJLFlBQVk7QUFDaEIsWUFBSSxPQUFPO0FBQ1gsWUFBSTtBQUNKLGlCQUFTLElBQUksR0FBRyxLQUFLLEtBQUssUUFB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QUFTLGVBQWUsZUFBZSxHQUFHLGlCQUFpQixTQUFTLFlBQVk7QUFDNUUsa0JBQU0sZUFBZSxNQUFNLG1CQUFXLFdBQVc7QUFDakQsZ0JBQUksY0FBYztBQUNkLG9CQUFNLGdCQUFnQixRQUFRLGFBQVMsbUJBQUssbUJBQVcsY0FBYyxNQUFNLENBQUM7QUFBQSxZQUNoRjtBQUFBLFVBQ0osQ0FBQztBQUFBLFFBQ0wsQ0FBQztBQUVELHdCQUFRLFdBQVcsMkJBQTJCLEVBQUUsS0FBSyxNQUFNO0FBQ3ZELG1CQUFTLGVBQWUsMEJBQTBCLEdBQUcsaUJBQWlCLFNBQVMsWUFBWTtBQUN2RixrQkFBTSxrQ0FBa0M7QUFDeEMsMENBQThCO0FBQUEsVUFDbEMsQ0FBQztBQUFBLFFBQ0wsQ0FBQztBQUVELHdCQUFRLFdBQVcsd0JBQXdCLEVBQUUsS0FBSyxNQUFNO0FBQ3BELG1CQUFTLGVBQWUsdUJBQXVCLEdBQUcsaUJBQWlCLFNBQVMsWUFBWTtBQUNwRixrQkFBTSxnQkFBZ0IsUUFBUSxTQUFTLG1CQUFXLFlBQVk7QUFBQSxVQUNsRSxDQUFDO0FBQUEsUUFDTCxDQUFDO0FBQUEsTUFDTDtBQUFBLElBQ0osQ0FBQyxFQUFFLE1BQU0sU0FBTyx1QkFBTyxNQUFNLG9DQUFvQyxHQUFHLENBQUM7QUFBQSxFQUN6RTtBQUVBLFdBQVMsZUFBdUI7QUFDNUIsV0FBTztBQUFBO0FBQUE7QUFBQSxFQUdYO0FBRUEsV0FBUyxlQUF1QjtBQUM1QixXQUFPO0FBQUE7QUFBQTtBQUFBLEVBR1g7QUFFQSxXQUFTLGdCQUF3QjtBQUM3QixXQUFPO0FBQUE7QUFBQSxFQUVYOyIsCiAgIm5hbWVzIjogWyJyZXNvbHZlIiwgImpvaW4iLCAiYmFzZW5hbWUiLCAiRXhjZXB0aW9uQ29kZSIsICJyZWdpc3RlclBsdWdpbiIsICJwIiwgInJlc29sdmUiLCAiaGVhZGVycyIsICJTeXN0ZW1CYXJzU3R5bGUiLCAiU3lzdGVtQmFyVHlwZSIsICJEaXJlY3RvcnkiLCAiRW5jb2RpbmciLCAicmVzb2x2ZSIsICJlbnRyeSIsICJ0b1BhdGgiLCAiY3RpbWUiLCAid2ViX2V4cG9ydHMiLCAiaW5pdF93ZWIiLCAicmVzb2x2ZSIsICJ3ZWJfZXhwb3J0cyIsICJpbml0X3dlYiIsICJCcm93c2VyIiwgInJlc29sdmUiLCAiZiIsICJzdGF0IiwgIkJyb3dzZXIiLCAicmVzb2x2ZSIsICJpbXBvcnRfcGF0aCIsICJzdGF0IiwgImYiLCAicmVzb2x2ZSIsICJpbXBvcnRfcGF0aCIsICJpbXBvcnRfcGF0aCJdCn0K
