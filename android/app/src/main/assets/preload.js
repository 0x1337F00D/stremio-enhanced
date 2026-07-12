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
        join: function join6() {
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

  // node_modules/capacitor-nodejs/dist/esm/web.js
  var web_exports3 = {};
  __export(web_exports3, {
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

  // src/platform/PlatformManager.ts
  var PlatformManager = class {
    static setPlatform(platform) {
      this.instance = platform;
    }
    static get current() {
      if (!this.instance) {
        throw new Error("Platform not initialized. Call PlatformManager.setPlatform() first.");
      }
      return this.instance;
    }
  };
  __publicField(PlatformManager, "instance");

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

  // src/platform/CapacitorPlatform.ts
  var CapacitorPlatform = class {
    constructor() {
      __publicField(this, "id", "capacitor");
      __publicField(this, "enhancedPath", "Stremio Enhanced");
      __publicField(this, "themesPath", `${this.enhancedPath}/themes`);
      __publicField(this, "pluginsPath", `${this.enhancedPath}/plugins`);
      __publicField(this, "logsPath", `${this.enhancedPath}/logs`);
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
      } catch (error) {
        if (error?.message?.includes("does not exist")) return [];
        console.error("Failed to readdir:", error);
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
        Filesystem.requestPermissions()
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
      try {
        const result = await Filesystem.readdir(this.getFileOptions(path));
        return result.files.map((f2) => f2.name);
      } catch (error) {
        if (error?.message?.includes("does not exist")) return [];
        console.error("Failed to readdir:", error);
        return [];
      }
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
      if (await this.exists(path)) return;
      try {
        await Filesystem.mkdir({
          ...this.getFileOptions(path),
          recursive: true
        });
      } catch (error) {
        if (error?.message?.includes("already exists") || await this.exists(path)) return;
        console.error("Failed to create directory:", error);
      }
    }
    async stat(path) {
      const stat = await Filesystem.stat(this.getFileOptions(path));
      return {
        isFile: stat.type === "file",
        isDirectory: stat.type === "directory"
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
      await this.mkdir(this.logsPath);
      await this.migrateLegacyDirectory("themes", this.getThemesPath());
      await this.migrateLegacyDirectory("plugins", this.getPluginsPath());
      const legacyRootExists = await this.existsInDirectory("logs", Directory.Data);
      if (legacyRootExists) {
        await this.migrateLegacyDirectory("logs", this.logsPath);
      }
    }
  };

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
    CHECK_UPDATES_ON_STARTUP: "checkForUpdatesOnStartup",
    PLUGIN_OPTIONS_PREFIX: "stremioEnhanced.pluginOptions.v1:"
  };
  var FILE_EXTENSIONS = {
    THEME: ".theme.css",
    PLUGIN: ".plugin.js"
  };
  var URLS = {
    STREMIO_WEB: "https://web.stremio.com/",
    STREMIO_WEB_ADD_ADDON: "https://web.stremio.com/#/addons?addon=",
    REGISTRY: "https://raw.githubusercontent.com/REVENGE977/stremio-enhanced-registry/refs/heads/main/registry.json",
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
  var mods_item_default = '<br>\n<div tabindex="0" class="addon-whmdO animation-fade-in addon-container-lC5KN button-container-zVLH6">\n    <div class="logo-container-ZcSSC">\n        <!-- theme preview here -->\n\n        <!-- plugin icon here -->\n    </div>\n\n	<div class="info-container-AdMB6">\n		<div class="name-container-qIAg8" title="{{ name }}">{{ name }}</div>\n		<div class="version-container-zdPyN" title="{{ version }}">{{ version }}</div>\n		<div class="types-container-DaOrg">{{ type }}</div>\n        <div class="description-container-v7Jhe">\n            <b>Description:</b> {{ description }}\n            <br>\n            <b>Author:</b> {{ author }}\n        </div>\n	</div>\n	<div class="buttons-container-g0xXr">\n		<div class="action-buttons-container-xMVmz">\n			<div tabindex="{{ actionTabIndex }}" role="button" aria-disabled="{{ actionDisabled }}" title="{{ actionbtnTitle }}" class="{{ actionbtnClass }} button-container-zVLH6 modActionBtn" data-action="{{ action }}" data-link="{{ download }}" data-type="{{ type }}">\n				<div class="label-OnWh2">{{ actionbtnTitle }}</div>\n			</div>\n		</div>\n		<a {{ repoHref }} target="_blank" rel="noopener noreferrer" aria-disabled="{{ repoDisabled }}" tabindex="{{ repoTabIndex }}" class="share-button-container-s3gwP button-container-zVLH6">\n			<svg class="icon-GxVbY" viewBox="0 0 24 24">\n				<path d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z" style="fill: currentcolor;" />\n			</svg>\n			<div class="label-OnWh2">Open repository</div>\n		</a>\n	</div>\n</div>\n';

  // src/components/about-category/about-category.html
  var about_category_default = '<h4 style="color: white; margin-bottom: 1rem;">\n    Developed By: <p style="display: inline !important;"><a href="https://github.com/REVENGE977" target="_blank" rel="noreferrer">REVENGE977</a></p>\n    <br/>\n    Version: v{{ version }}\n    <br/>\n</h4>\n\n<div class="option-vFOAS">\n    <div class="heading-dYMDt">\n        <div class="label-qI6Vh">Check for updates on startup</div>\n    </div>\n    <div class="content-P2T0i">\n        <div tabindex="-1" class="toggle-container-lZfHP button-container-zVLH6 {{ checkForUpdatesOnStartup }}" id="checkForUpdatesOnStartup">\n            <div class="toggle-toOWM"></div>\n        </div>\n    </div>\n</div>\n\n<div class="option-vFOAS">\n    <div class="heading-dYMDt">\n        <div class="label-qI6Vh">Discord Rich Presence</div>\n    </div>\n    <div class="content-P2T0i">\n        <div tabindex="-1" class="toggle-container-lZfHP button-container-zVLH6 {{ discordrichpresence }}" id="discordrichpresence" style="outline: none;">\n            <div class="toggle-toOWM"></div>\n        </div>\n    </div>\n</div>\n\n<div class="option-vFOAS">\n    <div class="heading-dYMDt">\n        <div class="label-qI6Vh">Window transparency</div>\n    </div>\n    <div class="content-P2T0i">\n        <div tabindex="-1" class="toggle-container-lZfHP button-container-zVLH6 {{ enableTransparentThemes }}" id="enableTransparentThemes" style="outline: none;">\n            <div class="toggle-toOWM"></div>\n        </div>\n    </div>\n</div>\n\n<p style="color:gray;">This option has to be enabled for themes that support transparency to work. (experimental)</p>\n<br/>\n\n<div id="stremio-enhanced-native-player-controls" style="{{ nativePlayerControlsDisplay }}">\n    <div class="option-vFOAS">\n        <div class="heading-dYMDt">\n            <label class="label-qI6Vh" for="nativePlayerSelect">Video player</label>\n        </div>\n        <div class="content-P2T0i">\n            <select id="nativePlayerSelect" aria-label="Video player">\n                <option value="disabled" {{ nativePlayerDisabledSelected }}>Disabled (built-in player)</option>\n                <option value="mpv" {{ nativePlayerMpvSelected }}>MPV (native external player)</option>\n            </select>\n        </div>\n    </div>\n\n    <div id="stremio-enhanced-mpv-controls">\n        <div class="option-vFOAS">\n            <div class="heading-dYMDt">\n                <div class="label-qI6Vh">Use normal MPV config (ThumbFast/shaders/models)</div>\n            </div>\n            <div class="content-P2T0i">\n                <div\n                    tabindex="0"\n                    role="switch"\n                    aria-checked="false"\n                    class="toggle-container-lZfHP button-container-zVLH6 {{ mpvUseUserConfiguration }}"\n                    id="mpvUseUserConfig"\n                >\n                    <div class="toggle-toOWM"></div>\n                </div>\n            </div>\n        </div>\n\n        <p style="color:gray;">\n            Off starts MPV with an isolated configuration. Turn this on to load your normal MPV scripts, shaders, and models.\n        </p>\n\n        <div class="option-vFOAS">\n            <div class="content-P2T0i" style="display: flex; gap: 0.5rem; flex-wrap: wrap;">\n                <button type="button" class="button-DNmYL button-container-zVLH6 button" id="selectMpvExecutableBtn">\n                    Choose MPV executable\n                </button>\n                <button type="button" class="button-DNmYL button-container-zVLH6 button" id="resetMpvExecutableBtn">\n                    Reset / auto-detect\n                </button>\n            </div>\n        </div>\n\n        <div\n            id="stremio-enhanced-mpv-status"\n            role="status"\n            aria-live="polite"\n            style="color:gray; overflow-wrap:anywhere; margin-bottom: 1rem;"\n        ></div>\n    </div>\n</div>\n\n<br/>\n\n<div class="option-vFOAS">\n    <div class="content-P2T0i">\n        <div tabindex="0" title="Community Plugins &amp; Themes" class="button-DNmYL button-container-zVLH6 button" id="browsePluginsThemesBtn">\n            Community Marketplace\n        </div>\n    </div>\n</div>\n\n<div class="option-vFOAS">\n    <div class="content-P2T0i">\n        <div tabindex="0" title="Check For Updates" class="button-DNmYL button-container-zVLH6 button" id="checkforupdatesBtn">\n            Check For Updates\n        </div>\n    </div>\n</div>\n\n<br/>\n';

  // src/components/default-theme/default-theme.html
  var default_theme_default = '<div class="option-vFOAS">\n    <div class="heading-dYMDt">\n        <div class="label-qI6Vh">Default</div>\n    </div>\n    <div class="content-P2T0i">\n        <div\n        title="Default"\n        id="Default"\n        tabindex="-1"\n        data-stremio-enhanced-apply-theme="Default"\n        style="color: white; margin-bottom: 1rem; width: max-content; background-color: {{ backgroundColor }};"\n        class="button button-container-zVLH6 {{ disabled }}"\n        >{{ label }}</div>\n    </div>\n</div>\n';

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

  // src/utils/escapeHtml.ts
  function escapeHtml(value) {
    return value.replace(/[&<>"']/g, (character) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    })[character] ?? character);
  }

  // src/components/plugin-item/pluginItem.ts
  function getPluginItemTemplate(filename, metaData, checked) {
    let template = templateCache_browser_default.load("/", "plugin-item");
    const metaKeys = ["name", "description", "author", "version"];
    metaKeys.forEach((key) => {
      const regex = new RegExp(`{{\\s*${key}\\s*}}`, "g");
      template = template.replace(regex, escapeHtml(metaData[key] || ""));
    });
    return template.replace("{{ checked }}", checked ? "checked" : "").replace(/\{\{\s*fileName\s*\}\}/g, escapeHtml(filename));
  }

  // src/components/theme-item/themeItem.ts
  function getThemeItemTemplate(filename, metaData, applied) {
    let template = templateCache_browser_default.load("/", "theme-item");
    const metaKeys = ["name", "description", "author", "version"];
    metaKeys.forEach((key) => {
      const regex = new RegExp(`{{\\s*${key}\\s*}}`, "g");
      template = template.replace(regex, escapeHtml(metaData[key] || ""));
    });
    return template.replace("{{ disabled }}", applied ? "disabled" : "").replace(/\{\{\s*fileName\s*\}\}/g, escapeHtml(filename)).replace("{{ label }}", applied ? "Applied" : "Apply").replace("{{ buttonClass }}", applied ? "uninstall-button-container-oV4Yo" : "install-button-container-yfcq5");
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
    async function applyTheme(theme) {
        console.log("applying " + theme);
        const currentTheme = localStorage.getItem("currentTheme");

        if (!window.stremioEnhanced?.applyTheme) {
            console.error("Stremio Enhanced theme bridge is unavailable");
            return;
        }

        const applied = await window.stremioEnhanced.applyTheme(theme);
        if (!applied) return;

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

    if (!document.documentElement.dataset.stremioEnhancedThemeClickBound) {
        document.documentElement.dataset.stremioEnhancedThemeClickBound = "true";
        document.addEventListener("click", (event) => {
            const target = event.target instanceof Element
                ? event.target.closest("[data-stremio-enhanced-apply-theme]")
                : null;
            const theme = target?.getAttribute("data-stremio-enhanced-apply-theme");
            if (theme) void applyTheme(theme);
        });
    }
    `;
  }

  // src/core/ModManager.ts
  var import_path = __toESM(require_path_browserify());

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

  // src/utils/PluginOptionSchema.ts
  var OPTION_ID_PATTERN = /^[A-Za-z][A-Za-z0-9_-]{0,63}$/;
  var MAX_LABEL_LENGTH = 120;
  var MAX_DESCRIPTION_LENGTH = 500;
  var MAX_TEXT_LENGTH = 1e4;
  var MAX_CHOICES = 64;
  function isRecord(value) {
    return typeof value === "object" && value !== null && !Array.isArray(value);
  }
  function isBoundedString(value, minLength, maxLength) {
    return typeof value === "string" && value.length >= minLength && value.length <= maxLength;
  }
  function getBaseFields(value) {
    if (!OPTION_ID_PATTERN.test(String(value.id ?? ""))) return null;
    if (!isBoundedString(value.label, 1, MAX_LABEL_LENGTH)) return null;
    if (value.description !== void 0 && !isBoundedString(value.description, 1, MAX_DESCRIPTION_LENGTH)) {
      return null;
    }
    return {
      id: String(value.id),
      label: value.label,
      ...value.description === void 0 ? {} : { description: value.description }
    };
  }
  function validatePluginOptionDefinition(value) {
    if (!isRecord(value)) return null;
    const base = getBaseFields(value);
    if (!base) return null;
    switch (value.type) {
      case "boolean":
        if (typeof value.default !== "boolean") return null;
        return { ...base, type: "boolean", default: value.default };
      case "text": {
        if (typeof value.default !== "string") return null;
        if (value.placeholder !== void 0 && !isBoundedString(value.placeholder, 0, 200)) {
          return null;
        }
        if (value.maxLength !== void 0 && (typeof value.maxLength !== "number" || !Number.isInteger(value.maxLength) || value.maxLength < 1 || value.maxLength > MAX_TEXT_LENGTH)) {
          return null;
        }
        const maxLength = typeof value.maxLength === "number" ? value.maxLength : MAX_TEXT_LENGTH;
        if (value.default.length > maxLength) return null;
        return {
          ...base,
          type: "text",
          default: value.default,
          ...value.placeholder === void 0 ? {} : { placeholder: value.placeholder },
          ...value.maxLength === void 0 ? {} : { maxLength: value.maxLength }
        };
      }
      case "number": {
        if (typeof value.default !== "number" || !Number.isFinite(value.default)) return null;
        const numericKeys = ["min", "max", "step"];
        for (const key of numericKeys) {
          if (value[key] !== void 0 && (typeof value[key] !== "number" || !Number.isFinite(value[key]))) {
            return null;
          }
        }
        const min = value.min;
        const max = value.max;
        const step = value.step;
        if (min !== void 0 && max !== void 0 && min > max) return null;
        if (step !== void 0 && step <= 0) return null;
        if (min !== void 0 && value.default < min) return null;
        if (max !== void 0 && value.default > max) return null;
        return {
          ...base,
          type: "number",
          default: value.default,
          ...min === void 0 ? {} : { min },
          ...max === void 0 ? {} : { max },
          ...step === void 0 ? {} : { step }
        };
      }
      case "select": {
        if (typeof value.default !== "string") return null;
        if (!Array.isArray(value.choices) || value.choices.length < 1 || value.choices.length > MAX_CHOICES) {
          return null;
        }
        const choices = [];
        const seenValues = /* @__PURE__ */ new Set();
        for (const rawChoice of value.choices) {
          if (!isRecord(rawChoice)) return null;
          if (!isBoundedString(rawChoice.value, 1, 128)) return null;
          if (!isBoundedString(rawChoice.label, 1, MAX_LABEL_LENGTH)) return null;
          if (seenValues.has(rawChoice.value)) return null;
          seenValues.add(rawChoice.value);
          choices.push({ value: rawChoice.value, label: rawChoice.label });
        }
        if (!seenValues.has(value.default)) return null;
        return { ...base, type: "select", default: value.default, choices };
      }
      default:
        return null;
    }
  }
  function normalizePluginOptionValue(definition, value) {
    switch (definition.type) {
      case "boolean":
        return typeof value === "boolean" ? value : void 0;
      case "text": {
        if (typeof value !== "string") return void 0;
        const maxLength = definition.maxLength ?? MAX_TEXT_LENGTH;
        return value.length <= maxLength ? value : void 0;
      }
      case "number":
        if (typeof value !== "number" || !Number.isFinite(value)) return void 0;
        if (definition.min !== void 0 && value < definition.min) return void 0;
        if (definition.max !== void 0 && value > definition.max) return void 0;
        return value;
      case "select":
        return typeof value === "string" && definition.choices.some((choice) => choice.value === value) ? value : void 0;
    }
  }
  function getPluginOptionDefaults(definitions) {
    return Object.fromEntries(definitions.map((definition) => [definition.id, definition.default]));
  }

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
      const options = [];
      const optionIds = /* @__PURE__ */ new Set();
      const optionRegex = /@option\s+([^\n\r]+)/g;
      for (const [, rawOption] of blockMatch[1].matchAll(optionRegex)) {
        if (options.length >= this.MAX_PLUGIN_OPTIONS) {
          logger_browser_default.warn(`Ignoring plugin options after the first ${this.MAX_PLUGIN_OPTIONS}`);
          break;
        }
        try {
          const option = validatePluginOptionDefinition(JSON.parse(rawOption.trim()));
          if (!option) {
            logger_browser_default.warn(`Ignoring invalid plugin option: ${rawOption.trim()}`);
            continue;
          }
          if (optionIds.has(option.id)) {
            logger_browser_default.warn(`Ignoring duplicate plugin option id: ${option.id}`);
            continue;
          }
          optionIds.add(option.id);
          options.push(option);
        } catch {
          logger_browser_default.warn(`Ignoring malformed plugin option JSON: ${rawOption.trim()}`);
        }
      }
      if (options.length > 0) {
        result.options = options;
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
  __publicField(ExtractMetaData, "MAX_PLUGIN_OPTIONS", 32);
  var ExtractMetaData_default = ExtractMetaData;

  // src/core/PluginOptions.ts
  var PluginOptions = class {
    static isSafePluginFileName(pluginFile) {
      return /^[A-Za-z0-9._-]+$/.test(pluginFile) && pluginFile.endsWith(FILE_EXTENSIONS.PLUGIN);
    }
    static getStorageKey(pluginFile) {
      return `${STORAGE_KEYS.PLUGIN_OPTIONS_PREFIX}${pluginFile}`;
    }
    static cloneDefinitions(definitions) {
      return definitions.map((definition) => definition.type === "select" ? { ...definition, choices: definition.choices.map((choice) => ({ ...choice })) } : { ...definition });
    }
    static register(pluginFile, definitions = []) {
      if (!this.isSafePluginFileName(pluginFile)) {
        this.logger.warn(`Refused to register options for unsafe plugin filename: ${pluginFile}`);
        return false;
      }
      this.schemas.set(pluginFile, this.cloneDefinitions(definitions));
      return true;
    }
    static hasOptions(pluginFile) {
      return (this.schemas.get(pluginFile)?.length ?? 0) > 0;
    }
    static getDefinitions(pluginFile) {
      return this.cloneDefinitions(this.schemas.get(pluginFile) ?? []);
    }
    static get(pluginFile) {
      if (!this.isSafePluginFileName(pluginFile)) return {};
      const definitions = this.schemas.get(pluginFile) ?? [];
      const values = getPluginOptionDefaults(definitions);
      if (definitions.length === 0) return values;
      try {
        const rawValue = localStorage.getItem(this.getStorageKey(pluginFile));
        if (!rawValue) return values;
        const storedValue = JSON.parse(rawValue);
        if (typeof storedValue !== "object" || storedValue === null || Array.isArray(storedValue)) {
          return values;
        }
        const storedOptions = storedValue;
        for (const definition of definitions) {
          const normalized = normalizePluginOptionValue(definition, storedOptions[definition.id]);
          if (normalized !== void 0) {
            values[definition.id] = normalized;
          }
        }
      } catch (error) {
        this.logger.warn(`Failed to read options for ${pluginFile}: ${error}`);
      }
      return values;
    }
    static save(pluginFile, candidateValues) {
      if (!this.isSafePluginFileName(pluginFile)) return {};
      const definitions = this.schemas.get(pluginFile) ?? [];
      if (definitions.length === 0) return {};
      const normalizedValues = getPluginOptionDefaults(definitions);
      const overrides = {};
      for (const definition of definitions) {
        const normalized = normalizePluginOptionValue(definition, candidateValues[definition.id]);
        const value = normalized ?? definition.default;
        normalizedValues[definition.id] = value;
        if (value !== definition.default) {
          overrides[definition.id] = value;
        }
      }
      try {
        const storageKey = this.getStorageKey(pluginFile);
        if (Object.keys(overrides).length === 0) {
          localStorage.removeItem(storageKey);
        } else {
          localStorage.setItem(storageKey, JSON.stringify(overrides));
        }
      } catch (error) {
        this.logger.error(`Failed to save options for ${pluginFile}: ${error}`);
      }
      return normalizedValues;
    }
    static reset(pluginFile) {
      if (!this.isSafePluginFileName(pluginFile)) return {};
      try {
        localStorage.removeItem(this.getStorageKey(pluginFile));
      } catch (error) {
        this.logger.warn(`Failed to reset options for ${pluginFile}: ${error}`);
      }
      return getPluginOptionDefaults(this.schemas.get(pluginFile) ?? []);
    }
    static remove(pluginFile) {
      this.reset(pluginFile);
      this.schemas.delete(pluginFile);
    }
  };
  __publicField(PluginOptions, "logger", getLogger("PluginOptions"));
  __publicField(PluginOptions, "schemas", /* @__PURE__ */ new Map());
  var PluginOptions_default = PluginOptions;

  // src/utils/reloadApplication.ts
  function reloadApplication() {
    window.location.reload();
  }

  // src/utils/modFileName.ts
  function isSafeModFileName(fileName, type) {
    const extension = type === "theme" ? FILE_EXTENSIONS.THEME : FILE_EXTENSIONS.PLUGIN;
    return fileName.length > extension.length && fileName.length <= 255 && fileName.endsWith(extension) && /^[A-Za-z0-9._-]+$/.test(fileName);
  }

  // src/core/ModManager.ts
  var ModManager = class {
    static getEnabledPlugins() {
      try {
        const storedValue = JSON.parse(
          localStorage.getItem(STORAGE_KEYS.ENABLED_PLUGINS) || "[]"
        );
        return Array.isArray(storedValue) ? storedValue.filter((value) => typeof value === "string") : [];
      } catch (error) {
        this.logger.warn(`Failed to parse enabled plugins: ${error}`);
        return [];
      }
    }
    static decodeFileName(fileName) {
      try {
        return decodeURIComponent(fileName);
      } catch {
        return fileName;
      }
    }
    static sanitizeModFileName(fileName, type) {
      const normalized = this.decodeFileName((0, import_path.basename)(fileName).trim());
      return isSafeModFileName(normalized, type) ? normalized : null;
    }
    static isSupportedRemoteUrl(rawUrl) {
      try {
        const url = new URL(rawUrl);
        return url.protocol === "https:";
      } catch {
        return false;
      }
    }
    static assertSecureResponseUrl(response, fallbackUrl) {
      const finalUrl = new URL(response.url || fallbackUrl);
      if (finalUrl.protocol !== "https:") {
        throw new Error(`Refused insecure redirect to ${finalUrl.protocol}`);
      }
    }
    static async readLimitedModContent(response) {
      const contentLength = Number(response.headers.get("content-length"));
      if (Number.isFinite(contentLength) && contentLength > this.MAX_MOD_DOWNLOAD_BYTES) {
        throw new Error("Mod download exceeds the 5 MiB size limit");
      }
      if (!response.body) {
        const content2 = await response.text();
        if (new TextEncoder().encode(content2).byteLength > this.MAX_MOD_DOWNLOAD_BYTES) {
          throw new Error("Mod download exceeds the 5 MiB size limit");
        }
        return content2;
      }
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let bytesRead = 0;
      let content = "";
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          bytesRead += value.byteLength;
          if (bytesRead > this.MAX_MOD_DOWNLOAD_BYTES) {
            await reader.cancel();
            throw new Error("Mod download exceeds the 5 MiB size limit");
          }
          content += decoder.decode(value, { stream: true });
        }
        return content + decoder.decode();
      } finally {
        reader.releaseLock();
      }
    }
    /**
     * Load and enable a plugin by filename
     */
    static async loadPlugin(pluginName) {
      if (!isSafeModFileName(pluginName, "plugin")) {
        this.logger.warn(`Refused to load plugin with unsafe filename: ${pluginName}`);
        return;
      }
      if (document.getElementById(pluginName)) {
        this.logger.info(`Plugin ${pluginName} is already loaded`);
        return;
      }
      const pluginPath = (0, import_path.join)(Properties_default.pluginsPath, pluginName);
      if (!await PlatformManager.current.exists(pluginPath)) {
        this.logger.error(`Plugin file not found: ${pluginPath}`);
        return;
      }
      let plugin;
      try {
        plugin = await PlatformManager.current.readFile(pluginPath);
      } catch (error) {
        this.logger.error(`Failed to read plugin ${pluginName}: ${error}`);
        return;
      }
      const metaData = ExtractMetaData_default.extractMetadataFromText(plugin);
      PluginOptions_default.register(pluginName, metaData?.options ?? []);
      const script = document.createElement("script");
      script.textContent = plugin;
      script.id = pluginName;
      script.dataset.stremioEnhancedPlugin = pluginName;
      document.body.appendChild(script);
      const enabledPlugins = this.getEnabledPlugins();
      if (!enabledPlugins.includes(pluginName)) {
        enabledPlugins.push(pluginName);
        localStorage.setItem(STORAGE_KEYS.ENABLED_PLUGINS, JSON.stringify(enabledPlugins));
      }
      this.logger.info(`Plugin ${pluginName} loaded!`);
    }
    /**
     * Load the installed plugins that the user previously enabled.
     * Discovery and individual plugin failures are isolated so one broken file
     * cannot prevent the remaining enabled plugins from starting.
     */
    static async loadEnabledPlugins() {
      const enabledPlugins = new Set(this.getEnabledPlugins());
      let installedPlugins;
      try {
        const pluginsPath = Properties_default.pluginsPath;
        if (!await PlatformManager.current.exists(pluginsPath)) return;
        installedPlugins = (await PlatformManager.current.readdir(pluginsPath)).filter((fileName) => isSafeModFileName(fileName, "plugin"));
      } catch (error) {
        this.logger.error(`Failed to discover enabled plugins: ${error}`);
        return;
      }
      for (const pluginName of installedPlugins) {
        if (!enabledPlugins.has(pluginName)) continue;
        try {
          await this.loadPlugin(pluginName);
        } catch (error) {
          this.logger.error(`Failed to load enabled plugin ${pluginName}: ${error}`);
        }
      }
    }
    /**
     * Unload and disable a plugin by filename
     */
    static unloadPlugin(pluginName) {
      if (!isSafeModFileName(pluginName, "plugin")) {
        this.logger.warn(`Refused to unload plugin with unsafe filename: ${pluginName}`);
        return;
      }
      const pluginElement = document.getElementById(pluginName);
      if (pluginElement) {
        pluginElement.remove();
      }
      let enabledPlugins = this.getEnabledPlugins();
      enabledPlugins = enabledPlugins.filter((x) => x !== pluginName);
      localStorage.setItem(STORAGE_KEYS.ENABLED_PLUGINS, JSON.stringify(enabledPlugins));
      this.logger.info(`Plugin ${pluginName} unloaded!`);
      reloadApplication();
    }
    static bindPluginToggle(toggle, pluginName, allowProgrammaticActivation = false) {
      if (!isSafeModFileName(pluginName, "plugin")) {
        this.logger.warn(`Refused to bind unsafe plugin filename: ${pluginName}`);
        return;
      }
      if (toggle.dataset.stremioEnhancedToggleBound === "true") return;
      toggle.dataset.stremioEnhancedToggleBound = "true";
      toggle.addEventListener("click", (event) => {
        if (!event.isTrusted && !allowProgrammaticActivation) return;
        toggle.classList.toggle(CLASSES.CHECKED);
        if (toggle.classList.contains(CLASSES.CHECKED)) {
          void this.loadPlugin(pluginName);
        } else {
          this.unloadPlugin(pluginName);
        }
      });
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
      const modUrl = new URL(modLink);
      if (modUrl.protocol !== "https:") {
        throw new Error(`Unsupported URL protocol for ${type}: ${modUrl.protocol}`);
      }
      const response = await fetch(modUrl.toString());
      if (!response.ok) throw new Error(`Failed to download: ${response.status} ${response.statusText}`);
      this.assertSecureResponseUrl(response, modUrl.toString());
      const saveDir = type === "plugin" ? Properties_default.pluginsPath : Properties_default.themesPath;
      if (!await PlatformManager.current.exists(saveDir)) {
        await PlatformManager.current.mkdir(saveDir);
      }
      const fallbackName = `${type}-${Date.now()}${type === "theme" ? FILE_EXTENSIONS.THEME : FILE_EXTENSIONS.PLUGIN}`;
      const unsafeName = (0, import_path.basename)(modUrl.pathname) || fallbackName;
      const filename = this.sanitizeModFileName(unsafeName, type);
      if (!filename) {
        throw new Error(`Refused to save ${type} with unsafe filename: ${unsafeName}`);
      }
      const filePath = (0, import_path.join)(saveDir, filename);
      const content = await this.readLimitedModContent(response);
      await PlatformManager.current.writeFile(filePath, content);
      this.logger.info(`Downloaded ${type} saved to: ${filePath}`);
      return filePath;
    }
    /**
     * Remove a mod file and clean up associated state
     */
    static async removeMod(fileName, type) {
      const decodedFileName = this.decodeFileName(fileName.trim());
      if (!isSafeModFileName(decodedFileName, type)) {
        throw new Error(`Refused to remove ${type} with unsafe filename: ${fileName}`);
      }
      fileName = decodedFileName;
      this.logger.info(`Removing ${type} file: ${fileName}`);
      switch (type) {
        case "plugin":
          if (await this.isPluginInstalled(fileName)) {
            const wasEnabled = this.getEnabledPlugins().includes(fileName);
            await PlatformManager.current.unlink((0, import_path.join)(Properties_default.pluginsPath, fileName));
            PluginOptions_default.remove(fileName);
            if (wasEnabled) {
              this.unloadPlugin(fileName);
            }
          }
          break;
        case "theme":
          if (await this.isThemeInstalled(fileName)) {
            if (localStorage.getItem(STORAGE_KEYS.CURRENT_THEME) === fileName) {
              localStorage.setItem(STORAGE_KEYS.CURRENT_THEME, "Default");
            }
            document.getElementById("activeTheme")?.remove();
            await PlatformManager.current.unlink((0, import_path.join)(Properties_default.themesPath, fileName));
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
        const stat = await PlatformManager.current.stat((0, import_path.join)(dirPath, file));
        return { file, isFile: stat.isFile };
      }));
      return fileStats.filter((f2) => f2.isFile).map((f2) => f2.file);
    }
    static async getInstalledPlugins() {
      const dirPath = Properties_default.pluginsPath;
      if (!await PlatformManager.current.exists(dirPath)) return [];
      const files = await PlatformManager.current.readdir(dirPath);
      const fileStats = await Promise.all(files.map(async (file) => {
        const stat = await PlatformManager.current.stat((0, import_path.join)(dirPath, file));
        return { file, isFile: stat.isFile };
      }));
      return fileStats.filter((f2) => f2.isFile).map((f2) => f2.file);
    }
    static openThemesFolder() {
      Helpers_default.waitForElm("#openthemesfolderBtn").then(() => {
        const button = document.getElementById("openthemesfolderBtn");
        if (!button || button.dataset.stremioEnhancedClickBound === "true") return;
        button.dataset.stremioEnhancedClickBound = "true";
        button.addEventListener("click", async () => {
          await this.openFolder(Properties_default.themesPath);
        });
      }).catch((err) => this.logger.error(`Failed to setup themes folder button: ${err}`));
    }
    static openPluginsFolder() {
      Helpers_default.waitForElm("#openpluginsfolderBtn").then(() => {
        const button = document.getElementById("openpluginsfolderBtn");
        if (!button || button.dataset.stremioEnhancedClickBound === "true") return;
        button.dataset.stremioEnhancedClickBound = "true";
        button.addEventListener("click", async () => {
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
      if (this.scrollListenerReady || this.scrollListenerSetupPending) return;
      this.scrollListenerSetupPending = true;
      Helpers_default.waitForElm('[data-section="enhanced"]').then(() => {
        const enhanced = document.getElementById("enhanced");
        const enhancedNav = document.querySelector('[data-section="enhanced"]');
        if (!(enhanced instanceof HTMLElement) || !enhancedNav) return;
        if (enhancedNav.dataset.stremioEnhancedScrollBound === "true") return;
        enhancedNav.dataset.stremioEnhancedScrollBound = "true";
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
        this.scrollListenerReady = true;
      }).catch((err) => {
        this.logger.warn(`Enhanced scroll listener was not ready: ${err}`);
      }).finally(() => {
        this.scrollListenerSetupPending = false;
      });
    }
    /**
     * Add the applyTheme function to the page
     */
    static addApplyThemeFunction() {
      if (document.getElementById(this.APPLY_THEME_SCRIPT_ID)) return;
      const applyThemeScript = getApplyThemeTemplate();
      const script = document.createElement("script");
      script.innerHTML = applyThemeScript;
      script.id = this.APPLY_THEME_SCRIPT_ID;
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
      const itemPath = (0, import_path.join)(
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
      if (!this.isSupportedRemoteUrl(updateUrl)) {
        this.logger.warn(`Skipped update for ${itemFile}: unsupported URL protocol.`);
        return;
      }
      try {
        const request = await fetch(updateUrl);
        if (request.status !== 200) {
          this.logger.warn(`Failed to fetch update for ${itemFile}: HTTP ${request.status}`);
          return;
        }
        this.assertSecureResponseUrl(request, updateUrl);
        const response = await this.readLimitedModContent(request);
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
            if (updateButton.dataset.stremioEnhancedClickBound === "true") {
              return;
            }
            updateButton.dataset.stremioEnhancedClickBound = "true";
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
  __publicField(ModManager, "APPLY_THEME_SCRIPT_ID", "stremio-enhanced-apply-theme-script");
  __publicField(ModManager, "MAX_MOD_DOWNLOAD_BYTES", 5 * 1024 * 1024);
  __publicField(ModManager, "scrollListenerReady", false);
  __publicField(ModManager, "scrollListenerSetupPending", false);
  var ModManager_default = ModManager;

  // src/components/plugin-options/pluginOptions.ts
  var STYLE_ID = "stremio-enhanced-plugin-options-style";
  var nextPanelId = 0;
  function ensureStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
        .se-plugin-options-button,
        .se-plugin-options-action {
            border: 0;
            border-radius: .35rem;
            cursor: pointer;
            padding: .55rem .85rem;
            color: white;
            background: var(--secondary-accent-color, #5b4bd8);
        }
        .se-plugin-options-panel {
            margin: -.5rem 0 1rem;
            padding: 1rem;
            border-radius: .5rem;
            color: white;
            background: var(--secondary-background-color, rgba(20, 20, 28, .96));
        }
        .se-plugin-options-panel[hidden] { display: none; }
        .se-plugin-options-field { display: grid; gap: .35rem; margin-bottom: .9rem; }
        .se-plugin-options-field input:not([type="checkbox"]),
        .se-plugin-options-field select {
            box-sizing: border-box;
            width: 100%;
            padding: .55rem;
            color: inherit;
            background: var(--primary-background-color, #17171f);
            border: 1px solid rgba(255, 255, 255, .25);
            border-radius: .35rem;
        }
        .se-plugin-options-description { opacity: .75; font-size: .9em; }
        .se-plugin-options-actions { display: flex; gap: .6rem; flex-wrap: wrap; }
        .se-plugin-options-action[data-kind="cancel"] { background: transparent; border: 1px solid rgba(255,255,255,.35); }
    `;
    document.head.appendChild(style);
  }
  function createOptionInput(definition, inputId) {
    if (definition.type === "select") {
      const select = document.createElement("select");
      select.id = inputId;
      for (const choice of definition.choices) {
        const option = document.createElement("option");
        option.value = choice.value;
        option.textContent = choice.label;
        select.appendChild(option);
      }
      return select;
    }
    const input = document.createElement("input");
    input.id = inputId;
    input.type = definition.type === "boolean" ? "checkbox" : definition.type;
    if (definition.type === "text") {
      if (definition.placeholder !== void 0) input.placeholder = definition.placeholder;
      if (definition.maxLength !== void 0) input.maxLength = definition.maxLength;
    } else if (definition.type === "number") {
      if (definition.min !== void 0) input.min = String(definition.min);
      if (definition.max !== void 0) input.max = String(definition.max);
      if (definition.step !== void 0) input.step = String(definition.step);
    }
    return input;
  }
  function setInputValue(input, definition, value) {
    if (definition.type === "boolean" && input instanceof HTMLInputElement) {
      input.checked = value === true;
    } else {
      input.value = String(value);
    }
  }
  function readInputValue(input, definition) {
    if (definition.type === "boolean" && input instanceof HTMLInputElement) {
      return input.checked;
    }
    if (definition.type === "number" && input instanceof HTMLInputElement) {
      return Number.isFinite(input.valueAsNumber) ? input.valueAsNumber : definition.default;
    }
    return input.value;
  }
  function mountPluginOptions({
    container,
    actionContainer,
    pluginFile,
    definitions,
    isEnabled,
    reload = () => window.location.reload()
  }) {
    if (definitions.length === 0) return;
    if (container.querySelector("[data-stremio-enhanced-plugin-options]")) return;
    ensureStyles();
    nextPanelId += 1;
    const panelId = `se-plugin-options-${nextPanelId}`;
    const toggleButton = document.createElement("button");
    toggleButton.type = "button";
    toggleButton.className = "se-plugin-options-button";
    toggleButton.textContent = "Options";
    toggleButton.setAttribute("aria-controls", panelId);
    toggleButton.setAttribute("aria-expanded", "false");
    actionContainer.appendChild(toggleButton);
    const panel = document.createElement("section");
    panel.id = panelId;
    panel.className = "se-plugin-options-panel";
    panel.dataset.stremioEnhancedPluginOptions = pluginFile;
    panel.hidden = true;
    const controls = /* @__PURE__ */ new Map();
    for (const definition of definitions) {
      const field = document.createElement("div");
      field.className = "se-plugin-options-field";
      const inputId = `${panelId}-${definition.id}`;
      const label = document.createElement("label");
      label.htmlFor = inputId;
      label.textContent = definition.label;
      const input = createOptionInput(definition, inputId);
      controls.set(definition.id, input);
      field.appendChild(label);
      if (definition.description) {
        const description = document.createElement("div");
        description.className = "se-plugin-options-description";
        description.textContent = definition.description;
        field.appendChild(description);
      }
      field.appendChild(input);
      panel.appendChild(field);
    }
    const actions = document.createElement("div");
    actions.className = "se-plugin-options-actions";
    const saveButton = document.createElement("button");
    saveButton.type = "button";
    saveButton.className = "se-plugin-options-action";
    saveButton.textContent = "Save";
    const resetButton = document.createElement("button");
    resetButton.type = "button";
    resetButton.className = "se-plugin-options-action";
    resetButton.textContent = "Reset to defaults";
    const cancelButton = document.createElement("button");
    cancelButton.type = "button";
    cancelButton.className = "se-plugin-options-action";
    cancelButton.dataset.kind = "cancel";
    cancelButton.textContent = "Cancel";
    actions.append(saveButton, resetButton, cancelButton);
    panel.appendChild(actions);
    container.appendChild(panel);
    const renderValues = (values) => {
      for (const definition of definitions) {
        const input = controls.get(definition.id);
        if (!input) continue;
        setInputValue(input, definition, values[definition.id] ?? definition.default);
      }
    };
    const closePanel = () => {
      panel.hidden = true;
      toggleButton.setAttribute("aria-expanded", "false");
    };
    toggleButton.addEventListener("click", (event) => {
      event.stopPropagation();
      panel.hidden = !panel.hidden;
      toggleButton.setAttribute("aria-expanded", String(!panel.hidden));
      if (!panel.hidden) renderValues(PluginOptions_default.get(pluginFile));
    });
    cancelButton.addEventListener("click", closePanel);
    saveButton.addEventListener("click", () => {
      const candidateValues = {};
      for (const definition of definitions) {
        const input = controls.get(definition.id);
        if (input) candidateValues[definition.id] = readInputValue(input, definition);
      }
      PluginOptions_default.save(pluginFile, candidateValues);
      closePanel();
      if (isEnabled()) reload();
    });
    resetButton.addEventListener("click", () => {
      renderValues(PluginOptions_default.reset(pluginFile));
      if (isEnabled()) reload();
    });
  }

  // src/core/Settings.ts
  var Settings = class {
    static getEnabledPlugins() {
      try {
        const storedValue = JSON.parse(
          localStorage.getItem(STORAGE_KEYS.ENABLED_PLUGINS) || "[]"
        );
        return Array.isArray(storedValue) ? storedValue.filter((value) => typeof value === "string") : [];
      } catch (error) {
        this.logger.warn(`Failed to parse enabled plugins: ${error}`);
        return [];
      }
    }
    static getCategoryKey(sectionId, title) {
      return `${sectionId}:${title.trim().toLowerCase()}`;
    }
    static getExistingCategory(section, sectionId, title) {
      const categoryKey = this.getCategoryKey(sectionId, title);
      const categoryByKey = section.querySelector(`[data-stremio-enhanced-category="${categoryKey}"]`);
      if (categoryByKey) return categoryByKey;
      return Array.from(section.children).find((child) => {
        if (!(child instanceof HTMLElement)) return false;
        const label = child.querySelector(SELECTORS.CATEGORY_LABEL);
        return label?.textContent?.trim() === title;
      }) ?? null;
    }
    static ensureNavItem(sectionId, title) {
      this.waitForNavMenu().then(() => {
        const nav = this.getNavMenu();
        const shortcutsNav = this.getNavShortcutItem();
        if (!nav) {
          this.logger.error("nav menu is still null after wait");
          return;
        }
        const existingNav = nav.querySelector(`[data-section="${sectionId}"]`);
        if (existingNav) {
          existingNav.setAttribute("title", title);
          existingNav.textContent = title;
          return;
        }
        const enhancedNavContainer = document.createElement("div");
        enhancedNavContainer.innerHTML = getEnhancedNav();
        const childToAppend = enhancedNavContainer.firstElementChild ?? enhancedNavContainer;
        childToAppend.setAttribute("data-section", sectionId);
        childToAppend.setAttribute("title", title);
        childToAppend.textContent = title;
        if (shortcutsNav && shortcutsNav.parentNode === nav) {
          nav.insertBefore(childToAppend, shortcutsNav.nextSibling);
        } else {
          nav.appendChild(childToAppend);
        }
      }).catch((err) => this.logger.error(`Failed to add nav: ${err}`));
    }
    /**
     * Add a new section to the settings panel
     */
    static addSection(sectionId, title) {
      this.waitForSettingsPanel().then(() => {
        const settingsPanel = this.getSettingsPanel();
        if (!settingsPanel) return;
        let sectionContainer = document.getElementById(sectionId);
        if (!sectionContainer) {
          this.logger.info(`Adding section: ${sectionId} with title: ${title}`);
          const sectionElement = this.getExistingSection(settingsPanel);
          const labelElement = this.getExistingSectionLabel(sectionElement);
          if (!sectionElement || !labelElement) return;
          const sectionClassName = sectionElement.className;
          const titleClassName = labelElement.className;
          sectionContainer = document.createElement("div");
          sectionContainer.className = sectionClassName;
          sectionContainer.id = sectionId;
          sectionContainer.setAttribute("data-stremio-enhanced-section", sectionId);
          const sectionTitle = document.createElement("div");
          sectionTitle.className = titleClassName;
          sectionTitle.textContent = title;
          sectionContainer.appendChild(sectionTitle);
          settingsPanel.appendChild(sectionContainer);
        }
        this.ensureNavItem(sectionId, title);
      }).catch((err) => this.logger.error(`Failed to add section: ${err}`));
    }
    /**
     * Add a category within a section
     */
    static addCategory(title, sectionId, icon) {
      this.waitForSettingsPanel().then(() => {
        const section = document.getElementById(sectionId);
        if (!(section instanceof HTMLElement)) return;
        if (this.getExistingCategory(section, sectionId, title)) return;
        this.logger.info(`Adding category: ${title} to section: ${sectionId}`);
        const categoryTemplate = this.getCategoryTemplate();
        if (!categoryTemplate) return;
        const { categoryClass, categoryTitleClass, headingClass, iconClass } = categoryTemplate;
        icon = icon.replace(`class="icon"`, `class="${iconClass}"`);
        const categoryDiv = document.createElement("div");
        categoryDiv.className = categoryClass;
        categoryDiv.setAttribute("data-stremio-enhanced-category", this.getCategoryKey(sectionId, title));
        const titleDiv = document.createElement("div");
        titleDiv.className = categoryTitleClass;
        titleDiv.textContent = title;
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
        if (document.getElementById(id)) return;
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
      if (document.getElementsByName(`${fileName}-box`).length > 0) {
        return;
      }
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
      if (document.getElementsByName(`${fileName}-box`).length > 0) {
        return;
      }
      const enabledPlugins = this.getEnabledPlugins();
      PluginOptions_default.register(fileName, metaData.options ?? []);
      const pluginContainer = document.createElement("div");
      pluginContainer.innerHTML = getPluginItemTemplate(fileName, metaData, enabledPlugins.includes(fileName));
      pluginContainer.setAttribute("name", `${fileName}-box`);
      pluginContainer.setAttribute("data-stremio-enhanced-item", fileName);
      const pluginsCategory = document.querySelector(SELECTORS.PLUGINS_CATEGORY);
      pluginsCategory?.appendChild(pluginContainer);
      const actionContainer = pluginContainer.querySelector(
        "[data-stremio-enhanced-plugin-actions]"
      );
      const pluginToggle = pluginContainer.querySelector(".plugin");
      if (pluginToggle) {
        ModManager_default.bindPluginToggle(pluginToggle, fileName);
      }
      if (actionContainer && pluginToggle && metaData.options?.length) {
        mountPluginOptions({
          container: pluginContainer,
          actionContainer,
          pluginFile: fileName,
          definitions: metaData.options,
          isEnabled: () => pluginToggle.classList.contains(CLASSES.CHECKED)
        });
      }
      ModManager_default.checkForItemUpdates(fileName);
    }
    static addTheme(fileName, metaData) {
      if (document.getElementsByName(`${fileName}-box`).length > 0) {
        return;
      }
      const currentTheme = localStorage.getItem(STORAGE_KEYS.CURRENT_THEME);
      const themeContainer = document.createElement("div");
      themeContainer.innerHTML = getThemeItemTemplate(fileName, metaData, currentTheme === fileName);
      themeContainer.setAttribute("name", `${fileName}-box`);
      themeContainer.setAttribute("data-stremio-enhanced-item", fileName);
      const themesCategory = document.querySelector(SELECTORS.THEMES_CATEGORY);
      themesCategory?.appendChild(themeContainer);
      ModManager_default.checkForItemUpdates(fileName);
    }
    /**
     * Remove an item from the settings
     */
    static removeItem(fileName) {
      Array.from(document.getElementsByName(`${fileName}-box`)).forEach((element) => {
        element.remove();
      });
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
            if (found.length >= 1) {
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
        if (div.children.length >= 2) {
          let matchCount = 0;
          for (let i = 0; i < div.children.length; i++) {
            if (keywords.some((k) => div.children[i].textContent?.includes(k))) {
              matchCount++;
            }
          }
          if (matchCount >= 1) return div;
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
        const maxRetries = 40;
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
        const maxRetries = 40;
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

  // src/components/about-category/aboutCategory.ts
  function getAboutCategoryTemplate(version, checkForUpdatesOnStartup, discordRichPresence, enableTransparentThemes, nativePlayer = "disabled", mpvUseUserConfiguration = false, showNativePlayerControls = false) {
    const template = templateCache_browser_default.load("/", "about-category");
    return template.replace("{{ version }}", version).replace("{{ checkForUpdatesOnStartup }}", checkForUpdatesOnStartup ? "checked" : "").replace("{{ discordrichpresence }}", discordRichPresence ? "checked" : "").replace("{{ enableTransparentThemes }}", enableTransparentThemes ? "checked" : "").replace(
      "{{ nativePlayerControlsDisplay }}",
      showNativePlayerControls ? "" : "display: none;"
    ).replace(
      "{{ nativePlayerDisabledSelected }}",
      nativePlayer === "disabled" ? "selected" : ""
    ).replace(
      "{{ nativePlayerMpvSelected }}",
      nativePlayer === "mpv" ? "selected" : ""
    ).replace(
      "{{ mpvUseUserConfiguration }}",
      mpvUseUserConfiguration ? "checked" : ""
    );
  }

  // src/android/preload.ts
  var import_path5 = __toESM(require_path_browserify());

  // node_modules/capacitor-nodejs/dist/esm/NodeJS.js
  init_dist();

  // node_modules/capacitor-nodejs/dist/esm/implementation.js
  init_dist();
  var CapacitorNodeJS = registerPlugin("CapacitorNodeJS", {
    web: () => Promise.resolve().then(() => (init_web3(), web_exports3)).then((m) => new m.CapacitorNodeJSWeb()),
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
  var import_path2 = __toESM(require_path_browserify());
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
        const logsDir = (0, import_path2.join)(Properties_default.enhancedPath, "logs");
        if (!await PlatformManager.current.exists(logsDir)) {
          await PlatformManager.current.mkdir(logsDir);
        }
        const fileName = `stremio-enhanced-${(/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-")}.log`;
        const filePath = (0, import_path2.join)(logsDir, fileName);
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
          await PlatformManager.current.openPath((0, import_path2.join)(Properties_default.enhancedPath, "logs"));
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

  // src/core/StremioEnhancedApi.ts
  function createStremioEnhancedApi(applyTheme) {
    return Object.freeze({
      applyTheme: (theme) => typeof theme === "string" ? applyTheme(theme) : Promise.resolve(false),
      pluginOptions: Object.freeze({
        get: (pluginFile) => typeof pluginFile === "string" ? PluginOptions_default.get(pluginFile) : {}
      })
    });
  }

  // src/core/UserSettings.ts
  function initializeUserSettings({
    checkUpdatesOnStartupDefault
  }) {
    const defaults = [
      [STORAGE_KEYS.ENABLED_PLUGINS, "[]"],
      [STORAGE_KEYS.CHECK_UPDATES_ON_STARTUP, String(checkUpdatesOnStartupDefault)],
      [STORAGE_KEYS.DISCORD_RPC, "false"]
    ];
    for (const [key, defaultValue] of defaults) {
      if (localStorage.getItem(key) === null) {
        localStorage.setItem(key, defaultValue);
      }
    }
  }

  // src/preload/shared/enhancedSettings.ts
  var import_path3 = __toESM(require_path_browserify());

  // src/components/default-theme/defaultTheme.ts
  function getDefaultThemeTemplate(applied) {
    const template = templateCache_browser_default.load("/", "default-theme");
    return template.replace("{{ disabled }}", applied ? "disabled" : "").replace("{{ label }}", applied ? "Applied" : "Apply").replace("{{ backgroundColor }}", applied ? "var(--overlay-color)" : "var(--secondary-accent-color)");
  }

  // src/components/back-btn/backBtn.ts
  function getBackButton() {
    return templateCache_browser_default.load("/", "back-btn");
  }

  // src/components/mods-item/modsItem.ts
  function normalizeHttpsUrl(rawUrl) {
    if (!rawUrl) return null;
    try {
      const url = new URL(rawUrl);
      if (url.protocol !== "https:") return null;
      return url.toString();
    } catch {
      return null;
    }
  }
  function getPlaceholderLogo() {
    return `
        <svg class="icon-GxVbY" viewBox="0 0 24 24" aria-label="Theme preview unavailable">
            <path d="M4 3h16a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm2 9h6a1 1 0 0 1 1 1v3h1v6h-4v-6h1v-2H5a1 1 0 0 1-1-1v-2h2v1zm11.732 1.732l1.768-1.768 1.768 1.768a2.5 2.5 0 1 1-3.536 0z" style="fill: currentcolor;"></path>
        </svg>`;
  }
  function getModItemTemplate(metaData, type, installed) {
    let template = templateCache_browser_default.load("/", "mods-item");
    const previewUrl = normalizeHttpsUrl(metaData.preview);
    const downloadUrl = normalizeHttpsUrl(metaData.download);
    const repoUrl = normalizeHttpsUrl(metaData.repo);
    let logoBlock = "";
    if (type === "Theme") {
      if (!previewUrl) {
        logoBlock = getPlaceholderLogo();
      } else {
        const safePreviewUrl = escapeHtml(previewUrl);
        logoBlock = `
            <a href="${safePreviewUrl}" target="_blank" rel="noreferrer">
                <img class="logo-WrsGF" src="${safePreviewUrl}" alt="Theme Preview" loading="lazy">
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
      template = template.replace(regex, escapeHtml(metaData[key] || ""));
    });
    const action = downloadUrl ? installed ? "uninstall" : "install" : "unavailable";
    const actionTitle = downloadUrl ? installed ? "Uninstall" : "Install" : "Unavailable";
    return template.replace(/\{\{\s*type\s*\}\}/g, type).replace(/\{\{\s*actionbtnTitle\s*\}\}/g, actionTitle).replace("{{ actionbtnClass }}", installed ? "uninstall-button-container-oV4Yo" : "install-button-container-yfcq5").replace("{{ action }}", action).replace("{{ actionDisabled }}", downloadUrl ? "false" : "true").replace("{{ actionTabIndex }}", downloadUrl ? "0" : "-1").replace("{{ download }}", downloadUrl ? escapeHtml(downloadUrl) : "").replace("{{ repoHref }}", repoUrl ? `href="${escapeHtml(repoUrl)}"` : "").replace("{{ repoDisabled }}", repoUrl ? "false" : "true").replace("{{ repoTabIndex }}", repoUrl ? "0" : "-1").replace("<!-- theme preview here -->", logoBlock).replace("<!-- plugin icon here -->", "");
  }

  // src/components/mods-tab/modsTab.ts
  function getModsTabTemplate() {
    return templateCache_browser_default.load("/", "mods-tab");
  }

  // src/components/mod-browser/modBrowser.ts
  var logger2 = getLogger("ModBrowser");
  var modActionStates = /* @__PURE__ */ new WeakMap();
  function asString(value) {
    return typeof value === "string" ? value : "";
  }
  function parseRegistryMod(value) {
    if (!value || typeof value !== "object" || Array.isArray(value)) return null;
    const record = value;
    return {
      name: asString(record.name),
      description: asString(record.description),
      author: asString(record.author),
      version: asString(record.version),
      preview: asString(record.preview) || void 0,
      download: asString(record.download),
      repo: asString(record.repo)
    };
  }
  function parseRegistryDownload(rawUrl, type) {
    try {
      const url = new URL(rawUrl);
      if (url.protocol !== "https:") return null;
      const encodedFileName = url.pathname.split("/").at(-1) ?? "";
      if (!encodedFileName) return null;
      let fileName;
      try {
        fileName = decodeURIComponent(encodedFileName);
      } catch {
        return null;
      }
      if (!isSafeModFileName(fileName, type)) return null;
      return { fileName, url: url.toString() };
    } catch {
      return null;
    }
  }
  function setActionState(button, state, action) {
    const installing = action === "install";
    const title = installing ? "Install" : "Uninstall";
    state.action = action;
    button.dataset.action = action;
    button.title = title;
    button.setAttribute("aria-disabled", "false");
    button.classList.toggle(CLASSES.INSTALL_BUTTON, installing);
    button.classList.toggle(CLASSES.UNINSTALL_BUTTON, !installing);
    const label = button.querySelector(".label-OnWh2");
    if (label) label.textContent = title;
  }
  async function activateModAction(button) {
    if (button.dataset.stremioEnhancedActionBusy === "true" || button.getAttribute("aria-disabled") === "true") {
      return;
    }
    const state = modActionStates.get(button);
    if (!state) {
      button.setAttribute("aria-disabled", "true");
      return;
    }
    button.dataset.stremioEnhancedActionBusy = "true";
    button.setAttribute("aria-busy", "true");
    button.setAttribute("aria-disabled", "true");
    try {
      if (state.action === "install") {
        await ModManager_default.downloadMod(state.link, state.type);
        setActionState(button, state, "uninstall");
      } else {
        await ModManager_default.removeMod(state.fileName, state.type);
        setActionState(button, state, "install");
      }
    } catch (error) {
      logger2.error(`Failed to ${state.action} ${state.type}: ${error}`);
      button.setAttribute("aria-disabled", "false");
    } finally {
      delete button.dataset.stremioEnhancedActionBusy;
      button.removeAttribute("aria-busy");
    }
  }
  function setupActionButtons() {
    document.querySelectorAll(".modActionBtn").forEach((button) => {
      if (button.dataset.stremioEnhancedModActionBound === "true") return;
      if (!modActionStates.has(button)) {
        button.setAttribute("aria-disabled", "true");
        return;
      }
      button.dataset.stremioEnhancedModActionBound = "true";
      button.addEventListener("click", (event) => {
        if (!event.isTrusted) return;
        void activateModAction(button);
      });
      button.addEventListener("keydown", (event) => {
        if (!event.isTrusted) return;
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        void activateModAction(button);
      });
    });
  }
  function setupBackButton() {
    const horizontalNav = document.querySelectorAll(SELECTORS.HORIZONTAL_NAV)[1];
    if (!horizontalNav) return;
    horizontalNav.innerHTML = getBackButton();
    document.getElementById("back-btn")?.addEventListener("click", () => {
      location.hash = "#/";
      setTimeout(() => {
        location.hash = "#/settings";
      }, 0);
    });
  }
  async function renderRegistryMods(modsList, values, type) {
    for (const value of values) {
      const mod = parseRegistryMod(value);
      if (!mod) continue;
      const modType = type.toLowerCase();
      const download = parseRegistryDownload(mod.download, modType);
      const installed = download ? type === "Plugin" ? await ModManager_default.isPluginInstalled(download.fileName) : await ModManager_default.isThemeInstalled(download.fileName) : false;
      const rendered = document.createElement("div");
      rendered.innerHTML = getModItemTemplate(mod, type, installed);
      const actionButton = rendered.querySelector(".modActionBtn");
      if (actionButton && download) {
        const state = {
          action: installed ? "uninstall" : "install",
          fileName: download.fileName,
          link: download.url,
          type: modType
        };
        modActionStates.set(actionButton, state);
        setActionState(actionButton, state, state.action);
      }
      modsList.append(...Array.from(rendered.childNodes));
    }
  }
  async function browseMods() {
    const settingsContent = document.querySelector(SELECTORS.SETTINGS_CONTENT);
    if (!settingsContent) return;
    settingsContent.innerHTML = getModsTabTemplate();
    const mods = await ModManager_default.fetchMods();
    const modsList = document.getElementById("mods-list");
    if (!modsList) return;
    const plugins = Array.isArray(mods.plugins) ? mods.plugins : [];
    const themes = Array.isArray(mods.themes) ? mods.themes : [];
    await renderRegistryMods(modsList, plugins, "Plugin");
    await renderRegistryMods(modsList, themes, "Theme");
    setupActionButtons();
    setupSearchBar();
    setupBackButton();
  }
  function setupSearchBar() {
    const searchInput = document.querySelector(SELECTORS.SEARCH_INPUT);
    const addonsContainer = document.querySelector(SELECTORS.ADDONS_LIST_CONTAINER);
    if (!searchInput || !addonsContainer) return;
    if (searchInput.dataset.stremioEnhancedSearchBound === "true") return;
    searchInput.dataset.stremioEnhancedSearchBound = "true";
    searchInput.addEventListener("input", () => {
      const filter = searchInput.value.trim().toLowerCase();
      const modItems = addonsContainer.querySelectorAll(SELECTORS.ADDON_CONTAINER);
      modItems.forEach((item) => {
        const name = item.querySelector(SELECTORS.NAME_CONTAINER)?.textContent?.toLowerCase() ?? "";
        const description = item.querySelector(SELECTORS.DESCRIPTION_ITEM)?.textContent?.toLowerCase() ?? "";
        const type = item.querySelector(SELECTORS.TYPES_CONTAINER)?.textContent?.toLowerCase() ?? "";
        const matches = name.includes(filter) || description.includes(filter) || type.includes(filter);
        item.style.display = matches ? "" : "none";
      });
    });
  }
  function setupBrowseModsButton() {
    Helpers_default.waitForElm("#browsePluginsThemesBtn").then(() => {
      const button = document.getElementById("browsePluginsThemesBtn");
      if (!(button instanceof HTMLElement)) return;
      if (button.dataset.stremioEnhancedBrowseModsBound === "true") return;
      button.dataset.stremioEnhancedBrowseModsBound = "true";
      button.addEventListener("click", async () => {
        if (button.dataset.stremioEnhancedBrowseModsBusy === "true") return;
        button.dataset.stremioEnhancedBrowseModsBusy = "true";
        button.setAttribute("aria-busy", "true");
        try {
          await browseMods();
        } catch (error) {
          logger2.error(`Failed to browse mods: ${error}`);
        } finally {
          delete button.dataset.stremioEnhancedBrowseModsBusy;
          button.removeAttribute("aria-busy");
        }
      });
    }).catch((error) => logger2.error(`Failed to setup browse mods button: ${error}`));
  }

  // src/preload/shared/icons.ts
  function getThemeIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon">
        <g><path fill="none" d="M0 0h24v24H0z"></path>
        <path d="M4 3h16a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm2 9h6a1 1 0 0 1 1 1v3h1v6h-4v-6h1v-2H5a1 1 0 0 1-1-1v-2h2v1zm11.732 1.732l1.768-1.768 1.768 1.768a2.5 2.5 0 1 1-3.536 0z" style="fill: currentcolor;"></path></g></svg>`;
  }
  function getPluginIcon() {
    return `<svg icon="addons-outline" class="icon" viewBox="0 0 512 512" style="fill: currentcolor;">
        <path d="M413.7 246.1H386c-0.53-0.01-1.03-0.23-1.4-0.6-0.37-0.37-0.59-0.87-0.6-1.4v-77.2a38.94 38.94 0 0 0-11.4-27.5 38.94 38.94 0 0 0-27.5-11.4h-77.2c-0.53-0.01-1.03-0.23-1.4-0.6-0.37-0.37-0.59-0.87-0.6-1.4v-27.7c0-27.1-21.5-49.9-48.6-50.3-6.57-0.1-13.09 1.09-19.2 3.5a49.616 49.616 0 0 0-16.4 10.7 49.823 49.823 0 0 0-11 16.2 48.894 48.894 0 0 0-3.9 19.2v28.5c-0.01 0.53-0.23 1.03-0.6 1.4-0.37 0.37-0.87 0.59-1.4 0.6h-77.2c-10.5 0-20.57 4.17-28 11.6a39.594 39.594 0 0 0-11.6 28v70.4c0.01 0.53 0.23 1.03 0.6 1.4 0.37 0.37 0.87 0.59 1.4 0.6h26.9c29.4 0 53.7 25.5 54.1 54.8 0.4 29.9-23.5 57.2-53.3 57.2H50c-0.53 0.01-1.03 0.23-1.4 0.6-0.37 0.37-0.59 0.87-0.6 1.4v70.4c0 10.5 4.17 20.57 11.6 28s17.5 11.6 28 11.6h70.4c0.53-0.01 1.03-0.23 1.4-0.6 0.37-0.37 0.59-0.87 0.6-1.4V441.2c0-30.3 24.8-56.4 55-57.1 30.1-0.7 57 20.3 57 50.3v27.7c0.01 0.53 0.23 1.03 0.6 1.4 0.37 0.37 0.87 0.59 1.4 0.6h71.1a38.94 38.94 0 0 0 27.5-11.4 38.958 38.958 0 0 0 11.4-27.5v-78c0.01-0.53 0.23-1.03 0.6-1.4 0.37-0.37 0.87-0.59 1.4-0.6h28.5c27.6 0 49.5-22.7 49.5-50.4s-23.2-48.7-50.3-48.7Z" style="stroke:currentcolor;stroke-linecap:round;stroke-linejoin:round;stroke-width:32;fill: currentColor;"></path></svg>`;
  }
  function getAboutIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon">
        <g><path fill="none" d="M0 0h24v24H0z"></path>
        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11v6h2v-6h-2zm0-4v2h2V7h-2z" style="fill:currentcolor"></path></g></svg>`;
  }

  // src/preload/shared/enhancedSettings.ts
  var logger3 = getLogger("EnhancedSettings");
  async function readManagedFiles(path, extension) {
    try {
      const files = await PlatformManager.current.readdir(path);
      return files.filter((fileName) => fileName.endsWith(extension));
    } catch (error) {
      logger3.error(`Failed to read managed directory ${path}: ${error}`);
      return [];
    }
  }
  async function addInstalledThemes(themes) {
    await Helpers_default.waitForElm(SELECTORS.THEMES_CATEGORY);
    if (!document.getElementById("stremio-enhanced-default-theme")) {
      const isDefault = localStorage.getItem(STORAGE_KEYS.CURRENT_THEME) === "Default";
      const container = document.createElement("div");
      container.id = "stremio-enhanced-default-theme";
      container.innerHTML = getDefaultThemeTemplate(isDefault);
      document.querySelector(SELECTORS.THEMES_CATEGORY)?.appendChild(container);
    }
    await Promise.all(themes.map(async (theme) => {
      try {
        const content = await PlatformManager.current.readFile((0, import_path3.join)(Properties_default.themesPath, theme));
        const metaData = ExtractMetaData_default.extractMetadataFromText(content);
        if (metaData && metaData.name.toLowerCase() !== "default") {
          Settings_default.addItem("theme", theme, metaData);
        }
      } catch (error) {
        logger3.error(`Failed to load theme metadata for ${theme}: ${error}`);
      }
    }));
  }
  async function addInstalledPlugins(plugins) {
    await Promise.all(plugins.map(async (plugin) => {
      try {
        const content = await PlatformManager.current.readFile((0, import_path3.join)(Properties_default.pluginsPath, plugin));
        const metaData = ExtractMetaData_default.extractMetadataFromText(content);
        if (metaData) Settings_default.addItem("plugin", plugin, metaData);
      } catch (error) {
        logger3.error(`Failed to load plugin metadata for ${plugin}: ${error}`);
      }
    }));
  }
  function settingsAreReady() {
    return Boolean(
      document.getElementById("enhanced") && document.querySelector('[data-section="enhanced"]') && document.querySelector(SELECTORS.THEMES_CATEGORY) && document.querySelector(SELECTORS.PLUGINS_CATEGORY) && document.querySelector(SELECTORS.ABOUT_CATEGORY)
    );
  }
  function createEnhancedSettingsController(hooks) {
    let checkPending = false;
    const setup = async () => {
      ModManager_default.addApplyThemeFunction();
      const [themes, plugins] = await Promise.all([
        readManagedFiles(Properties_default.themesPath, FILE_EXTENSIONS.THEME),
        readManagedFiles(Properties_default.pluginsPath, FILE_EXTENSIONS.PLUGIN)
      ]);
      Settings_default.addSection("enhanced", "Enhanced");
      await Helpers_default.waitForElm("#enhanced");
      Settings_default.addCategory("Themes", "enhanced", getThemeIcon());
      Settings_default.addCategory("Plugins", "enhanced", getPluginIcon());
      Settings_default.addCategory("About", "enhanced", getAboutIcon());
      await Promise.all([
        Helpers_default.waitForElm(SELECTORS.THEMES_CATEGORY),
        Helpers_default.waitForElm(SELECTORS.PLUGINS_CATEGORY),
        Helpers_default.waitForElm(SELECTORS.ABOUT_CATEGORY)
      ]);
      hooks.addPlatformControls();
      hooks.renderAbout();
      setupBrowseModsButton();
      await Promise.all([
        addInstalledThemes(themes),
        addInstalledPlugins(plugins)
      ]);
      ModManager_default.scrollListener();
    };
    return {
      async check() {
        if (!location.href.includes("#/settings") || settingsAreReady() || checkPending) {
          return;
        }
        checkPending = true;
        try {
          await setup();
        } finally {
          checkPending = false;
        }
      }
    };
  }

  // src/core/ThemeManager.ts
  var import_path4 = __toESM(require_path_browserify());
  var ThemeManager = class {
    static async applyTheme(requestedTheme, createThemeElement) {
      const themeFile = requestedTheme ?? localStorage.getItem(STORAGE_KEYS.CURRENT_THEME);
      if (!themeFile || themeFile === "Default") {
        document.getElementById("activeTheme")?.remove();
        localStorage.setItem(STORAGE_KEYS.CURRENT_THEME, "Default");
        return true;
      }
      if (!isSafeModFileName(themeFile, "theme")) {
        this.logger.warn(`Refused to apply invalid theme name: ${themeFile}`);
        return false;
      }
      const themePath = (0, import_path4.join)(Properties_default.themesPath, themeFile);
      try {
        if (!await PlatformManager.current.exists(themePath)) {
          localStorage.setItem(STORAGE_KEYS.CURRENT_THEME, "Default");
          return false;
        }
        const nextTheme = await createThemeElement(themePath, themeFile);
        nextTheme.id = "activeTheme";
        document.getElementById("activeTheme")?.remove();
        document.head.appendChild(nextTheme);
        localStorage.setItem(STORAGE_KEYS.CURRENT_THEME, themeFile);
        return true;
      } catch (error) {
        this.logger.error(`Failed to apply theme ${themeFile}: ${error}`);
        return false;
      }
    }
  };
  __publicField(ThemeManager, "logger", getLogger("ThemeManager"));
  var ThemeManager_default = ThemeManager;

  // src/preload/android/theme.ts
  async function createAndroidThemeElement(themePath) {
    const style = document.createElement("style");
    style.textContent = await PlatformManager.current.readFile(themePath);
    return style;
  }
  function applyAndroidTheme(requestedTheme) {
    return ThemeManager_default.applyTheme(requestedTheme, createAndroidThemeElement);
  }

  // src/android/preload.ts
  PlatformManager.setPlatform(new CapacitorPlatform());
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
    await PlatformManager.current.init();
    void ensureBundledStreamingServerReady();
    installFullscreenHider();
    observeSettingsUi();
    observePlayerUi();
    window.stremioEnhanced = createStremioEnhancedApi(applyAndroidTheme);
    initializeUserSettings({ checkUpdatesOnStartupDefault: false });
    await applyAndroidTheme();
    await ModManager_default.loadEnabledPlugins();
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
  function bindButtonClick(buttonId, handler, errorContext) {
    Helpers_default.waitForElm(`#${buttonId}`).then(() => {
      const button = document.getElementById(buttonId);
      if (!(button instanceof HTMLElement)) return;
      if (button.dataset.stremioEnhancedClickBound === "true") return;
      button.dataset.stremioEnhancedClickBound = "true";
      button.addEventListener("click", () => {
        void handler();
      });
    }).catch((err) => logger_browser_default.error(`Failed to setup ${errorContext}: ${err}`));
  }
  function addAndroidSettingsControls() {
    Settings_default.addButton("Import Theme", "importThemeBtn", SELECTORS.THEMES_CATEGORY);
    Settings_default.addButton("Manage Themes Folder", "openthemesfolderBtn", SELECTORS.THEMES_CATEGORY);
    Settings_default.addButton("Import Plugin", "importPluginBtn", SELECTORS.PLUGINS_CATEGORY);
    Settings_default.addButton("Manage Plugins Folder", "openpluginsfolderBtn", SELECTORS.PLUGINS_CATEGORY);
    setupImportButton("importThemeBtn", "theme");
    setupImportButton("importPluginBtn", "plugin");
    setupManagedFolderButton("openthemesfolderBtn", Properties_default.themesPath);
    setupManagedFolderButton("openpluginsfolderBtn", Properties_default.pluginsPath);
  }
  var settingsController = createEnhancedSettingsController({
    addPlatformControls: addAndroidSettingsControls,
    renderAbout: writeAbout
  });
  async function checkSettings() {
    await settingsController.check();
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
        if (location.href.includes(SETTINGS_ROUTE)) {
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
  function setupImportButton(buttonId, type) {
    bindButtonClick(buttonId, () => importModFile(type), `${type} import button`);
  }
  function setupManagedFolderButton(buttonId, folderPath) {
    bindButtonClick(buttonId, () => PlatformManager.current.openPath(folderPath), `folder button ${buttonId}`);
  }
  var isImporting = false;
  function sanitizeImportedModFileName(fileName, type) {
    const normalized = fileName.trim().split(/[\\/]/).pop() || "";
    return isSafeModFileName(normalized, type) ? normalized : null;
  }
  async function importModFile(type) {
    if (isImporting) return;
    isImporting = true;
    try {
      const result = await FilePicker.pickFiles({ limit: 1 });
      const file = result.files[0];
      const filePath = file?.path ?? file?.uri;
      if (!file?.name || !filePath) {
        return;
      }
      const safeFileName = sanitizeImportedModFileName(file.name, type);
      const expectedExtension = type === "theme" ? FILE_EXTENSIONS.THEME : FILE_EXTENSIONS.PLUGIN;
      if (!safeFileName) {
        await Helpers_default.showAlert(
          "warning",
          "Unsupported File",
          `Please choose a valid ${expectedExtension} file name.`,
          ["OK"]
        );
        return;
      }
      const content = await PlatformManager.current.readFile(filePath);
      const destinationDirectory = type === "theme" ? Properties_default.themesPath : Properties_default.pluginsPath;
      await PlatformManager.current.writeFile((0, import_path5.join)(destinationDirectory, safeFileName), content);
      setTimeout(() => location.reload(), 100);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      if (/cancel|canceled|cancelled|no files selected/i.test(message)) {
        return;
      }
      logger_browser_default.error(`Failed to import ${type}: ${message}`);
    } finally {
      setTimeout(() => {
        isImporting = false;
      }, 500);
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
  function writeAbout() {
    Helpers_default.waitForElm(SELECTORS.ABOUT_CATEGORY).then(async () => {
      const aboutCategory = document.querySelector(SELECTORS.ABOUT_CATEGORY);
      if (aboutCategory instanceof HTMLElement) {
        if (!document.getElementById("stremio-enhanced-about-content")) {
          const aboutContent = document.createElement("div");
          aboutContent.id = "stremio-enhanced-about-content";
          aboutContent.innerHTML = getAboutCategoryTemplate(
            "Android-v1.0.0",
            false,
            false,
            false
          );
          aboutCategory.appendChild(aboutContent);
        }
        Settings_default.addButton("Open Logs", "openLogsBtn", SELECTORS.ABOUT_CATEGORY);
        Settings_default.addButton("Export Logs", "exportLogsBtn", SELECTORS.ABOUT_CATEGORY);
        Settings_default.addButton("Reload Streaming Server", "reloadStreamingServerBtn", SELECTORS.ABOUT_CATEGORY);
        Settings_default.addButton("Open App Files", "openEnhancedFolderBtn", SELECTORS.ABOUT_CATEGORY);
        bindButtonClick("openLogsBtn", () => {
          LogManager_default.showLogs();
        }, "open logs button");
        bindButtonClick("exportLogsBtn", async () => {
          const exportedPath = await LogManager_default.exportLogs();
          if (exportedPath) {
            await PlatformManager.current.openPath((0, import_path5.join)(Properties_default.enhancedPath, "logs"));
          }
        }, "export logs button");
        bindButtonClick("reloadStreamingServerBtn", async () => {
          await ensureBundledStreamingServerReady();
          scheduleStreamingServerReload();
        }, "reload streaming server button");
        bindButtonClick("openEnhancedFolderBtn", async () => {
          await PlatformManager.current.openPath(Properties_default.enhancedPath);
        }, "open enhanced folder button");
      }
    }).catch((err) => logger_browser_default.error("Failed to write about section: " + err));
  }
})();
/*! Bundled license information:

@capacitor/core/dist/index.js:
  (*! Capacitor: https://capacitorjs.com/ - MIT License *)
*/
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BjYXBhY2l0b3IvY29yZS9idWlsZC91dGlsLmpzIiwgIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9AY2FwYWNpdG9yL2NvcmUvYnVpbGQvcnVudGltZS5qcyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvQGNhcGFjaXRvci9jb3JlL2J1aWxkL2dsb2JhbC5qcyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvQGNhcGFjaXRvci9jb3JlL2J1aWxkL3dlYi1wbHVnaW4uanMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BjYXBhY2l0b3IvY29yZS9idWlsZC9jb3JlLXBsdWdpbnMuanMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BjYXBhY2l0b3IvZmlsZXN5c3RlbS9zcmMvZGVmaW5pdGlvbnMudHMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BjYXBhY2l0b3IvZmlsZXN5c3RlbS9zcmMvd2ViLnRzIiwgIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9AY2FwYWNpdG9yL2Jyb3dzZXIvc3JjL3dlYi50cyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcGF0aC1icm93c2VyaWZ5L2luZGV4LmpzIiwgIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jYXBhY2l0b3Itbm9kZWpzL3NyYy93ZWIudHMiLCAiLi4vLi4vLi4vLi4vLi4vc3JjL3BsYXRmb3JtL1BsYXRmb3JtTWFuYWdlci50cyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvQGNhcGFjaXRvci9maWxlc3lzdGVtL3NyYy9pbmRleC50cyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvQGNhcGFjaXRvci9zeW5hcHNlL2Rpc3Qvc3luYXBzZS5tanMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BjYXBhY2l0b3IvYnJvd3Nlci9zcmMvaW5kZXgudHMiLCAiLi4vLi4vLi4vLi4vLi4vc3JjL3BsYXRmb3JtL0NhcGFjaXRvclBsYXRmb3JtLnRzIiwgIi4uLy4uLy4uLy4uLy4uL3NyYy91dGlscy9sb2dnZXIuYnJvd3Nlci50cyIsICIuLi8uLi8uLi8uLi8uLi9zcmMvY29uc3RhbnRzL2luZGV4LnRzIiwgIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL21vZHMtdGFiL21vZHMtdGFiLmh0bWwiLCAiLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvbW9kcy1pdGVtL21vZHMtaXRlbS5odG1sIiwgIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2Fib3V0LWNhdGVnb3J5L2Fib3V0LWNhdGVnb3J5Lmh0bWwiLCAiLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvZGVmYXVsdC10aGVtZS9kZWZhdWx0LXRoZW1lLmh0bWwiLCAiLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvYmFjay1idG4vYmFjay1idG4uaHRtbCIsICIuLi8uLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy90aXRsZS1iYXIvdGl0bGUtYmFyLmh0bWwiLCAiLi4vLi4vLi4vLi4vLi4vc3JjL3V0aWxzL3RlbXBsYXRlQ2FjaGUuYnJvd3Nlci50cyIsICIuLi8uLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy90b2FzdC90b2FzdC50cyIsICIuLi8uLi8uLi8uLi8uLi9zcmMvdXRpbHMvSGVscGVycy50cyIsICIuLi8uLi8uLi8uLi8uLi9zcmMvdXRpbHMvZXNjYXBlSHRtbC50cyIsICIuLi8uLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9wbHVnaW4taXRlbS9wbHVnaW5JdGVtLnRzIiwgIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3RoZW1lLWl0ZW0vdGhlbWVJdGVtLnRzIiwgIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2VuaGFuY2VkLW5hdi9lbmhhbmNlZE5hdi50cyIsICIuLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9Qcm9wZXJ0aWVzLnRzIiwgIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2FwcGx5LXRoZW1lL2FwcGx5VGhlbWUuYnJvd3Nlci50cyIsICIuLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9Nb2RNYW5hZ2VyLnRzIiwgIi4uLy4uLy4uLy4uLy4uL3NyYy9pbnRlcmZhY2VzL01ldGFEYXRhLnRzIiwgIi4uLy4uLy4uLy4uLy4uL3NyYy91dGlscy9QbHVnaW5PcHRpb25TY2hlbWEudHMiLCAiLi4vLi4vLi4vLi4vLi4vc3JjL3V0aWxzL0V4dHJhY3RNZXRhRGF0YS50cyIsICIuLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9QbHVnaW5PcHRpb25zLnRzIiwgIi4uLy4uLy4uLy4uLy4uL3NyYy91dGlscy9yZWxvYWRBcHBsaWNhdGlvbi50cyIsICIuLi8uLi8uLi8uLi8uLi9zcmMvdXRpbHMvbW9kRmlsZU5hbWUudHMiLCAiLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcGx1Z2luLW9wdGlvbnMvcGx1Z2luT3B0aW9ucy50cyIsICIuLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9TZXR0aW5ncy50cyIsICIuLi8uLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9hYm91dC1jYXRlZ29yeS9hYm91dENhdGVnb3J5LnRzIiwgIi4uLy4uLy4uLy4uLy4uL3NyYy9hbmRyb2lkL3ByZWxvYWQudHMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NhcGFjaXRvci1ub2RlanMvc3JjL05vZGVKUy50cyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY2FwYWNpdG9yLW5vZGVqcy9zcmMvaW1wbGVtZW50YXRpb24udHMiLCAiLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvTG9nTWFuYWdlci50cyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvQGNhcGF3ZXNvbWUvY2FwYWNpdG9yLWZpbGUtcGlja2VyL3NyYy9pbmRleC50cyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvQGNhcGF3ZXNvbWUvY2FwYWNpdG9yLWZpbGUtcGlja2VyL3NyYy93ZWIudHMiLCAiLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvU3RyZW1pb0VuaGFuY2VkQXBpLnRzIiwgIi4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL1VzZXJTZXR0aW5ncy50cyIsICIuLi8uLi8uLi8uLi8uLi9zcmMvcHJlbG9hZC9zaGFyZWQvZW5oYW5jZWRTZXR0aW5ncy50cyIsICIuLi8uLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9kZWZhdWx0LXRoZW1lL2RlZmF1bHRUaGVtZS50cyIsICIuLi8uLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9iYWNrLWJ0bi9iYWNrQnRuLnRzIiwgIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL21vZHMtaXRlbS9tb2RzSXRlbS50cyIsICIuLi8uLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9tb2RzLXRhYi9tb2RzVGFiLnRzIiwgIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL21vZC1icm93c2VyL21vZEJyb3dzZXIudHMiLCAiLi4vLi4vLi4vLi4vLi4vc3JjL3ByZWxvYWQvc2hhcmVkL2ljb25zLnRzIiwgIi4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL1RoZW1lTWFuYWdlci50cyIsICIuLi8uLi8uLi8uLi8uLi9zcmMvcHJlbG9hZC9hbmRyb2lkL3RoZW1lLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJleHBvcnQgdmFyIEV4Y2VwdGlvbkNvZGU7XG4oZnVuY3Rpb24gKEV4Y2VwdGlvbkNvZGUpIHtcbiAgICAvKipcbiAgICAgKiBBUEkgaXMgbm90IGltcGxlbWVudGVkLlxuICAgICAqXG4gICAgICogVGhpcyB1c3VhbGx5IG1lYW5zIHRoZSBBUEkgY2FuJ3QgYmUgdXNlZCBiZWNhdXNlIGl0IGlzIG5vdCBpbXBsZW1lbnRlZCBmb3JcbiAgICAgKiB0aGUgY3VycmVudCBwbGF0Zm9ybS5cbiAgICAgKi9cbiAgICBFeGNlcHRpb25Db2RlW1wiVW5pbXBsZW1lbnRlZFwiXSA9IFwiVU5JTVBMRU1FTlRFRFwiO1xuICAgIC8qKlxuICAgICAqIEFQSSBpcyBub3QgYXZhaWxhYmxlLlxuICAgICAqXG4gICAgICogVGhpcyBtZWFucyB0aGUgQVBJIGNhbid0IGJlIHVzZWQgcmlnaHQgbm93IGJlY2F1c2U6XG4gICAgICogICAtIGl0IGlzIGN1cnJlbnRseSBtaXNzaW5nIGEgcHJlcmVxdWlzaXRlLCBzdWNoIGFzIG5ldHdvcmsgY29ubmVjdGl2aXR5XG4gICAgICogICAtIGl0IHJlcXVpcmVzIGEgcGFydGljdWxhciBwbGF0Zm9ybSBvciBicm93c2VyIHZlcnNpb25cbiAgICAgKi9cbiAgICBFeGNlcHRpb25Db2RlW1wiVW5hdmFpbGFibGVcIl0gPSBcIlVOQVZBSUxBQkxFXCI7XG59KShFeGNlcHRpb25Db2RlIHx8IChFeGNlcHRpb25Db2RlID0ge30pKTtcbmV4cG9ydCBjbGFzcyBDYXBhY2l0b3JFeGNlcHRpb24gZXh0ZW5kcyBFcnJvciB7XG4gICAgY29uc3RydWN0b3IobWVzc2FnZSwgY29kZSwgZGF0YSkge1xuICAgICAgICBzdXBlcihtZXNzYWdlKTtcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICAgICAgdGhpcy5jb2RlID0gY29kZTtcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICB9XG59XG5leHBvcnQgY29uc3QgZ2V0UGxhdGZvcm1JZCA9ICh3aW4pID0+IHtcbiAgICB2YXIgX2EsIF9iO1xuICAgIGlmICh3aW4gPT09IG51bGwgfHwgd2luID09PSB2b2lkIDAgPyB2b2lkIDAgOiB3aW4uYW5kcm9pZEJyaWRnZSkge1xuICAgICAgICByZXR1cm4gJ2FuZHJvaWQnO1xuICAgIH1cbiAgICBlbHNlIGlmICgoX2IgPSAoX2EgPSB3aW4gPT09IG51bGwgfHwgd2luID09PSB2b2lkIDAgPyB2b2lkIDAgOiB3aW4ud2Via2l0KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubWVzc2FnZUhhbmRsZXJzKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuYnJpZGdlKSB7XG4gICAgICAgIHJldHVybiAnaW9zJztcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiAnd2ViJztcbiAgICB9XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dXRpbC5qcy5tYXAiLCAiaW1wb3J0IHsgQ2FwYWNpdG9yRXhjZXB0aW9uLCBnZXRQbGF0Zm9ybUlkLCBFeGNlcHRpb25Db2RlIH0gZnJvbSAnLi91dGlsJztcbmV4cG9ydCBjb25zdCBjcmVhdGVDYXBhY2l0b3IgPSAod2luKSA9PiB7XG4gICAgY29uc3QgY2FwQ3VzdG9tUGxhdGZvcm0gPSB3aW4uQ2FwYWNpdG9yQ3VzdG9tUGxhdGZvcm0gfHwgbnVsbDtcbiAgICBjb25zdCBjYXAgPSB3aW4uQ2FwYWNpdG9yIHx8IHt9O1xuICAgIGNvbnN0IFBsdWdpbnMgPSAoY2FwLlBsdWdpbnMgPSBjYXAuUGx1Z2lucyB8fCB7fSk7XG4gICAgY29uc3QgZ2V0UGxhdGZvcm0gPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBjYXBDdXN0b21QbGF0Zm9ybSAhPT0gbnVsbCA/IGNhcEN1c3RvbVBsYXRmb3JtLm5hbWUgOiBnZXRQbGF0Zm9ybUlkKHdpbik7XG4gICAgfTtcbiAgICBjb25zdCBpc05hdGl2ZVBsYXRmb3JtID0gKCkgPT4gZ2V0UGxhdGZvcm0oKSAhPT0gJ3dlYic7XG4gICAgY29uc3QgaXNQbHVnaW5BdmFpbGFibGUgPSAocGx1Z2luTmFtZSkgPT4ge1xuICAgICAgICBjb25zdCBwbHVnaW4gPSByZWdpc3RlcmVkUGx1Z2lucy5nZXQocGx1Z2luTmFtZSk7XG4gICAgICAgIGlmIChwbHVnaW4gPT09IG51bGwgfHwgcGx1Z2luID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwbHVnaW4ucGxhdGZvcm1zLmhhcyhnZXRQbGF0Zm9ybSgpKSkge1xuICAgICAgICAgICAgLy8gSlMgaW1wbGVtZW50YXRpb24gYXZhaWxhYmxlIGZvciB0aGUgY3VycmVudCBwbGF0Zm9ybS5cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChnZXRQbHVnaW5IZWFkZXIocGx1Z2luTmFtZSkpIHtcbiAgICAgICAgICAgIC8vIE5hdGl2ZSBpbXBsZW1lbnRhdGlvbiBhdmFpbGFibGUuXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgICBjb25zdCBnZXRQbHVnaW5IZWFkZXIgPSAocGx1Z2luTmFtZSkgPT4geyB2YXIgX2E7IHJldHVybiAoX2EgPSBjYXAuUGx1Z2luSGVhZGVycykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmZpbmQoKGgpID0+IGgubmFtZSA9PT0gcGx1Z2luTmFtZSk7IH07XG4gICAgY29uc3QgaGFuZGxlRXJyb3IgPSAoZXJyKSA9PiB3aW4uY29uc29sZS5lcnJvcihlcnIpO1xuICAgIGNvbnN0IHJlZ2lzdGVyZWRQbHVnaW5zID0gbmV3IE1hcCgpO1xuICAgIGNvbnN0IHJlZ2lzdGVyUGx1Z2luID0gKHBsdWdpbk5hbWUsIGpzSW1wbGVtZW50YXRpb25zID0ge30pID0+IHtcbiAgICAgICAgY29uc3QgcmVnaXN0ZXJlZFBsdWdpbiA9IHJlZ2lzdGVyZWRQbHVnaW5zLmdldChwbHVnaW5OYW1lKTtcbiAgICAgICAgaWYgKHJlZ2lzdGVyZWRQbHVnaW4pIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgQ2FwYWNpdG9yIHBsdWdpbiBcIiR7cGx1Z2luTmFtZX1cIiBhbHJlYWR5IHJlZ2lzdGVyZWQuIENhbm5vdCByZWdpc3RlciBwbHVnaW5zIHR3aWNlLmApO1xuICAgICAgICAgICAgcmV0dXJuIHJlZ2lzdGVyZWRQbHVnaW4ucHJveHk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcGxhdGZvcm0gPSBnZXRQbGF0Zm9ybSgpO1xuICAgICAgICBjb25zdCBwbHVnaW5IZWFkZXIgPSBnZXRQbHVnaW5IZWFkZXIocGx1Z2luTmFtZSk7XG4gICAgICAgIGxldCBqc0ltcGxlbWVudGF0aW9uO1xuICAgICAgICBjb25zdCBsb2FkUGx1Z2luSW1wbGVtZW50YXRpb24gPSBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoIWpzSW1wbGVtZW50YXRpb24gJiYgcGxhdGZvcm0gaW4ganNJbXBsZW1lbnRhdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBqc0ltcGxlbWVudGF0aW9uID1cbiAgICAgICAgICAgICAgICAgICAgdHlwZW9mIGpzSW1wbGVtZW50YXRpb25zW3BsYXRmb3JtXSA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICAgICAgICAgICAgICAgICAgPyAoanNJbXBsZW1lbnRhdGlvbiA9IGF3YWl0IGpzSW1wbGVtZW50YXRpb25zW3BsYXRmb3JtXSgpKVxuICAgICAgICAgICAgICAgICAgICAgICAgOiAoanNJbXBsZW1lbnRhdGlvbiA9IGpzSW1wbGVtZW50YXRpb25zW3BsYXRmb3JtXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjYXBDdXN0b21QbGF0Zm9ybSAhPT0gbnVsbCAmJiAhanNJbXBsZW1lbnRhdGlvbiAmJiAnd2ViJyBpbiBqc0ltcGxlbWVudGF0aW9ucykge1xuICAgICAgICAgICAgICAgIGpzSW1wbGVtZW50YXRpb24gPVxuICAgICAgICAgICAgICAgICAgICB0eXBlb2YganNJbXBsZW1lbnRhdGlvbnNbJ3dlYiddID09PSAnZnVuY3Rpb24nXG4gICAgICAgICAgICAgICAgICAgICAgICA/IChqc0ltcGxlbWVudGF0aW9uID0gYXdhaXQganNJbXBsZW1lbnRhdGlvbnNbJ3dlYiddKCkpXG4gICAgICAgICAgICAgICAgICAgICAgICA6IChqc0ltcGxlbWVudGF0aW9uID0ganNJbXBsZW1lbnRhdGlvbnNbJ3dlYiddKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBqc0ltcGxlbWVudGF0aW9uO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBjcmVhdGVQbHVnaW5NZXRob2QgPSAoaW1wbCwgcHJvcCkgPT4ge1xuICAgICAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgICAgIGlmIChwbHVnaW5IZWFkZXIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBtZXRob2RIZWFkZXIgPSBwbHVnaW5IZWFkZXIgPT09IG51bGwgfHwgcGx1Z2luSGVhZGVyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwbHVnaW5IZWFkZXIubWV0aG9kcy5maW5kKChtKSA9PiBwcm9wID09PSBtLm5hbWUpO1xuICAgICAgICAgICAgICAgIGlmIChtZXRob2RIZWFkZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1ldGhvZEhlYWRlci5ydHlwZSA9PT0gJ3Byb21pc2UnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKG9wdGlvbnMpID0+IGNhcC5uYXRpdmVQcm9taXNlKHBsdWdpbk5hbWUsIHByb3AudG9TdHJpbmcoKSwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKG9wdGlvbnMsIGNhbGxiYWNrKSA9PiBjYXAubmF0aXZlQ2FsbGJhY2socGx1Z2luTmFtZSwgcHJvcC50b1N0cmluZygpLCBvcHRpb25zLCBjYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaW1wbCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKF9hID0gaW1wbFtwcm9wXSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmJpbmQoaW1wbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoaW1wbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoX2IgPSBpbXBsW3Byb3BdKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuYmluZChpbXBsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBDYXBhY2l0b3JFeGNlcHRpb24oYFwiJHtwbHVnaW5OYW1lfVwiIHBsdWdpbiBpcyBub3QgaW1wbGVtZW50ZWQgb24gJHtwbGF0Zm9ybX1gLCBFeGNlcHRpb25Db2RlLlVuaW1wbGVtZW50ZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBjcmVhdGVQbHVnaW5NZXRob2RXcmFwcGVyID0gKHByb3ApID0+IHtcbiAgICAgICAgICAgIGxldCByZW1vdmU7XG4gICAgICAgICAgICBjb25zdCB3cmFwcGVyID0gKC4uLmFyZ3MpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBwID0gbG9hZFBsdWdpbkltcGxlbWVudGF0aW9uKCkudGhlbigoaW1wbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBmbiA9IGNyZWF0ZVBsdWdpbk1ldGhvZChpbXBsLCBwcm9wKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwID0gZm4oLi4uYXJncyk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZW1vdmUgPSBwID09PSBudWxsIHx8IHAgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHAucmVtb3ZlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQ2FwYWNpdG9yRXhjZXB0aW9uKGBcIiR7cGx1Z2luTmFtZX0uJHtwcm9wfSgpXCIgaXMgbm90IGltcGxlbWVudGVkIG9uICR7cGxhdGZvcm19YCwgRXhjZXB0aW9uQ29kZS5VbmltcGxlbWVudGVkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmIChwcm9wID09PSAnYWRkTGlzdGVuZXInKSB7XG4gICAgICAgICAgICAgICAgICAgIHAucmVtb3ZlID0gYXN5bmMgKCkgPT4gcmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBwO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIC8vIFNvbWUgZmxhaXIg4pyoXG4gICAgICAgICAgICB3cmFwcGVyLnRvU3RyaW5nID0gKCkgPT4gYCR7cHJvcC50b1N0cmluZygpfSgpIHsgW2NhcGFjaXRvciBjb2RlXSB9YDtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3cmFwcGVyLCAnbmFtZScsIHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogcHJvcCxcbiAgICAgICAgICAgICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHdyYXBwZXI7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGFkZExpc3RlbmVyID0gY3JlYXRlUGx1Z2luTWV0aG9kV3JhcHBlcignYWRkTGlzdGVuZXInKTtcbiAgICAgICAgY29uc3QgcmVtb3ZlTGlzdGVuZXIgPSBjcmVhdGVQbHVnaW5NZXRob2RXcmFwcGVyKCdyZW1vdmVMaXN0ZW5lcicpO1xuICAgICAgICBjb25zdCBhZGRMaXN0ZW5lck5hdGl2ZSA9IChldmVudE5hbWUsIGNhbGxiYWNrKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjYWxsID0gYWRkTGlzdGVuZXIoeyBldmVudE5hbWUgfSwgY2FsbGJhY2spO1xuICAgICAgICAgICAgY29uc3QgcmVtb3ZlID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNhbGxiYWNrSWQgPSBhd2FpdCBjYWxsO1xuICAgICAgICAgICAgICAgIHJlbW92ZUxpc3RlbmVyKHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnROYW1lLFxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFja0lkLFxuICAgICAgICAgICAgICAgIH0sIGNhbGxiYWNrKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjb25zdCBwID0gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IGNhbGwudGhlbigoKSA9PiByZXNvbHZlKHsgcmVtb3ZlIH0pKSk7XG4gICAgICAgICAgICBwLnJlbW92ZSA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYFVzaW5nIGFkZExpc3RlbmVyKCkgd2l0aG91dCAnYXdhaXQnIGlzIGRlcHJlY2F0ZWQuYCk7XG4gICAgICAgICAgICAgICAgYXdhaXQgcmVtb3ZlKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmV0dXJuIHA7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHByb3h5ID0gbmV3IFByb3h5KHt9LCB7XG4gICAgICAgICAgICBnZXQoXywgcHJvcCkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAocHJvcCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QvaXNzdWVzLzIwMDMwXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJyQkdHlwZW9mJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3RvSlNPTic6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKCkgPT4gKHt9KTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnYWRkTGlzdGVuZXInOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBsdWdpbkhlYWRlciA/IGFkZExpc3RlbmVyTmF0aXZlIDogYWRkTGlzdGVuZXI7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3JlbW92ZUxpc3RlbmVyJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZW1vdmVMaXN0ZW5lcjtcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjcmVhdGVQbHVnaW5NZXRob2RXcmFwcGVyKHByb3ApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgICBQbHVnaW5zW3BsdWdpbk5hbWVdID0gcHJveHk7XG4gICAgICAgIHJlZ2lzdGVyZWRQbHVnaW5zLnNldChwbHVnaW5OYW1lLCB7XG4gICAgICAgICAgICBuYW1lOiBwbHVnaW5OYW1lLFxuICAgICAgICAgICAgcHJveHksXG4gICAgICAgICAgICBwbGF0Zm9ybXM6IG5ldyBTZXQoWy4uLk9iamVjdC5rZXlzKGpzSW1wbGVtZW50YXRpb25zKSwgLi4uKHBsdWdpbkhlYWRlciA/IFtwbGF0Zm9ybV0gOiBbXSldKSxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBwcm94eTtcbiAgICB9O1xuICAgIC8vIEFkZCBpbiBjb252ZXJ0RmlsZVNyYyBmb3Igd2ViLCBpdCB3aWxsIGFscmVhZHkgYmUgYXZhaWxhYmxlIGluIG5hdGl2ZSBjb250ZXh0XG4gICAgaWYgKCFjYXAuY29udmVydEZpbGVTcmMpIHtcbiAgICAgICAgY2FwLmNvbnZlcnRGaWxlU3JjID0gKGZpbGVQYXRoKSA9PiBmaWxlUGF0aDtcbiAgICB9XG4gICAgY2FwLmdldFBsYXRmb3JtID0gZ2V0UGxhdGZvcm07XG4gICAgY2FwLmhhbmRsZUVycm9yID0gaGFuZGxlRXJyb3I7XG4gICAgY2FwLmlzTmF0aXZlUGxhdGZvcm0gPSBpc05hdGl2ZVBsYXRmb3JtO1xuICAgIGNhcC5pc1BsdWdpbkF2YWlsYWJsZSA9IGlzUGx1Z2luQXZhaWxhYmxlO1xuICAgIGNhcC5yZWdpc3RlclBsdWdpbiA9IHJlZ2lzdGVyUGx1Z2luO1xuICAgIGNhcC5FeGNlcHRpb24gPSBDYXBhY2l0b3JFeGNlcHRpb247XG4gICAgY2FwLkRFQlVHID0gISFjYXAuREVCVUc7XG4gICAgY2FwLmlzTG9nZ2luZ0VuYWJsZWQgPSAhIWNhcC5pc0xvZ2dpbmdFbmFibGVkO1xuICAgIHJldHVybiBjYXA7XG59O1xuZXhwb3J0IGNvbnN0IGluaXRDYXBhY2l0b3JHbG9iYWwgPSAod2luKSA9PiAod2luLkNhcGFjaXRvciA9IGNyZWF0ZUNhcGFjaXRvcih3aW4pKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJ1bnRpbWUuanMubWFwIiwgImltcG9ydCB7IGluaXRDYXBhY2l0b3JHbG9iYWwgfSBmcm9tICcuL3J1bnRpbWUnO1xuZXhwb3J0IGNvbnN0IENhcGFjaXRvciA9IC8qI19fUFVSRV9fKi8gaW5pdENhcGFjaXRvckdsb2JhbCh0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gJ3VuZGVmaW5lZCdcbiAgICA/IGdsb2JhbFRoaXNcbiAgICA6IHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJ1xuICAgICAgICA/IHNlbGZcbiAgICAgICAgOiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xuICAgICAgICAgICAgPyB3aW5kb3dcbiAgICAgICAgICAgIDogdHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCdcbiAgICAgICAgICAgICAgICA/IGdsb2JhbFxuICAgICAgICAgICAgICAgIDoge30pO1xuZXhwb3J0IGNvbnN0IHJlZ2lzdGVyUGx1Z2luID0gQ2FwYWNpdG9yLnJlZ2lzdGVyUGx1Z2luO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Z2xvYmFsLmpzLm1hcCIsICJpbXBvcnQgeyBDYXBhY2l0b3IgfSBmcm9tICcuL2dsb2JhbCc7XG5pbXBvcnQgeyBFeGNlcHRpb25Db2RlIH0gZnJvbSAnLi91dGlsJztcbi8qKlxuICogQmFzZSBjbGFzcyB3ZWIgcGx1Z2lucyBzaG91bGQgZXh0ZW5kLlxuICovXG5leHBvcnQgY2xhc3MgV2ViUGx1Z2luIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMgPSB7fTtcbiAgICAgICAgdGhpcy5yZXRhaW5lZEV2ZW50QXJndW1lbnRzID0ge307XG4gICAgICAgIHRoaXMud2luZG93TGlzdGVuZXJzID0ge307XG4gICAgfVxuICAgIGFkZExpc3RlbmVyKGV2ZW50TmFtZSwgbGlzdGVuZXJGdW5jKSB7XG4gICAgICAgIGxldCBmaXJzdExpc3RlbmVyID0gZmFsc2U7XG4gICAgICAgIGNvbnN0IGxpc3RlbmVycyA9IHRoaXMubGlzdGVuZXJzW2V2ZW50TmFtZV07XG4gICAgICAgIGlmICghbGlzdGVuZXJzKSB7XG4gICAgICAgICAgICB0aGlzLmxpc3RlbmVyc1tldmVudE5hbWVdID0gW107XG4gICAgICAgICAgICBmaXJzdExpc3RlbmVyID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxpc3RlbmVyc1tldmVudE5hbWVdLnB1c2gobGlzdGVuZXJGdW5jKTtcbiAgICAgICAgLy8gSWYgd2UgaGF2ZW4ndCBhZGRlZCBhIHdpbmRvdyBsaXN0ZW5lciBmb3IgdGhpcyBldmVudCBhbmQgaXQgcmVxdWlyZXMgb25lLFxuICAgICAgICAvLyBnbyBhaGVhZCBhbmQgYWRkIGl0XG4gICAgICAgIGNvbnN0IHdpbmRvd0xpc3RlbmVyID0gdGhpcy53aW5kb3dMaXN0ZW5lcnNbZXZlbnROYW1lXTtcbiAgICAgICAgaWYgKHdpbmRvd0xpc3RlbmVyICYmICF3aW5kb3dMaXN0ZW5lci5yZWdpc3RlcmVkKSB7XG4gICAgICAgICAgICB0aGlzLmFkZFdpbmRvd0xpc3RlbmVyKHdpbmRvd0xpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZmlyc3RMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5zZW5kUmV0YWluZWRBcmd1bWVudHNGb3JFdmVudChldmVudE5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlbW92ZSA9IGFzeW5jICgpID0+IHRoaXMucmVtb3ZlTGlzdGVuZXIoZXZlbnROYW1lLCBsaXN0ZW5lckZ1bmMpO1xuICAgICAgICBjb25zdCBwID0gUHJvbWlzZS5yZXNvbHZlKHsgcmVtb3ZlIH0pO1xuICAgICAgICByZXR1cm4gcDtcbiAgICB9XG4gICAgYXN5bmMgcmVtb3ZlQWxsTGlzdGVuZXJzKCkge1xuICAgICAgICB0aGlzLmxpc3RlbmVycyA9IHt9O1xuICAgICAgICBmb3IgKGNvbnN0IGxpc3RlbmVyIGluIHRoaXMud2luZG93TGlzdGVuZXJzKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZVdpbmRvd0xpc3RlbmVyKHRoaXMud2luZG93TGlzdGVuZXJzW2xpc3RlbmVyXSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy53aW5kb3dMaXN0ZW5lcnMgPSB7fTtcbiAgICB9XG4gICAgbm90aWZ5TGlzdGVuZXJzKGV2ZW50TmFtZSwgZGF0YSwgcmV0YWluVW50aWxDb25zdW1lZCkge1xuICAgICAgICBjb25zdCBsaXN0ZW5lcnMgPSB0aGlzLmxpc3RlbmVyc1tldmVudE5hbWVdO1xuICAgICAgICBpZiAoIWxpc3RlbmVycykge1xuICAgICAgICAgICAgaWYgKHJldGFpblVudGlsQ29uc3VtZWQpIHtcbiAgICAgICAgICAgICAgICBsZXQgYXJncyA9IHRoaXMucmV0YWluZWRFdmVudEFyZ3VtZW50c1tldmVudE5hbWVdO1xuICAgICAgICAgICAgICAgIGlmICghYXJncykge1xuICAgICAgICAgICAgICAgICAgICBhcmdzID0gW107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGFyZ3MucHVzaChkYXRhKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJldGFpbmVkRXZlbnRBcmd1bWVudHNbZXZlbnROYW1lXSA9IGFyZ3M7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGlzdGVuZXJzLmZvckVhY2goKGxpc3RlbmVyKSA9PiBsaXN0ZW5lcihkYXRhKSk7XG4gICAgfVxuICAgIGhhc0xpc3RlbmVycyhldmVudE5hbWUpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICByZXR1cm4gISEoKF9hID0gdGhpcy5saXN0ZW5lcnNbZXZlbnROYW1lXSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmxlbmd0aCk7XG4gICAgfVxuICAgIHJlZ2lzdGVyV2luZG93TGlzdGVuZXIod2luZG93RXZlbnROYW1lLCBwbHVnaW5FdmVudE5hbWUpIHtcbiAgICAgICAgdGhpcy53aW5kb3dMaXN0ZW5lcnNbcGx1Z2luRXZlbnROYW1lXSA9IHtcbiAgICAgICAgICAgIHJlZ2lzdGVyZWQ6IGZhbHNlLFxuICAgICAgICAgICAgd2luZG93RXZlbnROYW1lLFxuICAgICAgICAgICAgcGx1Z2luRXZlbnROYW1lLFxuICAgICAgICAgICAgaGFuZGxlcjogKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5ub3RpZnlMaXN0ZW5lcnMocGx1Z2luRXZlbnROYW1lLCBldmVudCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgIH1cbiAgICB1bmltcGxlbWVudGVkKG1zZyA9ICdub3QgaW1wbGVtZW50ZWQnKSB7XG4gICAgICAgIHJldHVybiBuZXcgQ2FwYWNpdG9yLkV4Y2VwdGlvbihtc2csIEV4Y2VwdGlvbkNvZGUuVW5pbXBsZW1lbnRlZCk7XG4gICAgfVxuICAgIHVuYXZhaWxhYmxlKG1zZyA9ICdub3QgYXZhaWxhYmxlJykge1xuICAgICAgICByZXR1cm4gbmV3IENhcGFjaXRvci5FeGNlcHRpb24obXNnLCBFeGNlcHRpb25Db2RlLlVuYXZhaWxhYmxlKTtcbiAgICB9XG4gICAgYXN5bmMgcmVtb3ZlTGlzdGVuZXIoZXZlbnROYW1lLCBsaXN0ZW5lckZ1bmMpIHtcbiAgICAgICAgY29uc3QgbGlzdGVuZXJzID0gdGhpcy5saXN0ZW5lcnNbZXZlbnROYW1lXTtcbiAgICAgICAgaWYgKCFsaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpbmRleCA9IGxpc3RlbmVycy5pbmRleE9mKGxpc3RlbmVyRnVuYyk7XG4gICAgICAgIHRoaXMubGlzdGVuZXJzW2V2ZW50TmFtZV0uc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgLy8gSWYgdGhlcmUgYXJlIG5vIG1vcmUgbGlzdGVuZXJzIGZvciB0aGlzIHR5cGUgb2YgZXZlbnQsXG4gICAgICAgIC8vIHJlbW92ZSB0aGUgd2luZG93IGxpc3RlbmVyXG4gICAgICAgIGlmICghdGhpcy5saXN0ZW5lcnNbZXZlbnROYW1lXS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlV2luZG93TGlzdGVuZXIodGhpcy53aW5kb3dMaXN0ZW5lcnNbZXZlbnROYW1lXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYWRkV2luZG93TGlzdGVuZXIoaGFuZGxlKSB7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKGhhbmRsZS53aW5kb3dFdmVudE5hbWUsIGhhbmRsZS5oYW5kbGVyKTtcbiAgICAgICAgaGFuZGxlLnJlZ2lzdGVyZWQgPSB0cnVlO1xuICAgIH1cbiAgICByZW1vdmVXaW5kb3dMaXN0ZW5lcihoYW5kbGUpIHtcbiAgICAgICAgaWYgKCFoYW5kbGUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihoYW5kbGUud2luZG93RXZlbnROYW1lLCBoYW5kbGUuaGFuZGxlcik7XG4gICAgICAgIGhhbmRsZS5yZWdpc3RlcmVkID0gZmFsc2U7XG4gICAgfVxuICAgIHNlbmRSZXRhaW5lZEFyZ3VtZW50c0ZvckV2ZW50KGV2ZW50TmFtZSkge1xuICAgICAgICBjb25zdCBhcmdzID0gdGhpcy5yZXRhaW5lZEV2ZW50QXJndW1lbnRzW2V2ZW50TmFtZV07XG4gICAgICAgIGlmICghYXJncykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGRlbGV0ZSB0aGlzLnJldGFpbmVkRXZlbnRBcmd1bWVudHNbZXZlbnROYW1lXTtcbiAgICAgICAgYXJncy5mb3JFYWNoKChhcmcpID0+IHtcbiAgICAgICAgICAgIHRoaXMubm90aWZ5TGlzdGVuZXJzKGV2ZW50TmFtZSwgYXJnKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9d2ViLXBsdWdpbi5qcy5tYXAiLCAiaW1wb3J0IHsgcmVnaXN0ZXJQbHVnaW4gfSBmcm9tICcuL2dsb2JhbCc7XG5pbXBvcnQgeyBXZWJQbHVnaW4gfSBmcm9tICcuL3dlYi1wbHVnaW4nO1xuZXhwb3J0IGNvbnN0IFdlYlZpZXcgPSAvKiNfX1BVUkVfXyovIHJlZ2lzdGVyUGx1Z2luKCdXZWJWaWV3Jyk7XG4vKioqKioqKiogRU5EIFdFQiBWSUVXIFBMVUdJTiAqKioqKioqKi9cbi8qKioqKioqKiBDT09LSUVTIFBMVUdJTiAqKioqKioqKi9cbi8qKlxuICogU2FmZWx5IHdlYiBlbmNvZGUgYSBzdHJpbmcgdmFsdWUgKGluc3BpcmVkIGJ5IGpzLWNvb2tpZSlcbiAqIEBwYXJhbSBzdHIgVGhlIHN0cmluZyB2YWx1ZSB0byBlbmNvZGVcbiAqL1xuY29uc3QgZW5jb2RlID0gKHN0cikgPT4gZW5jb2RlVVJJQ29tcG9uZW50KHN0cilcbiAgICAucmVwbGFjZSgvJSgyWzM0NkJdfDVFfDYwfDdDKS9nLCBkZWNvZGVVUklDb21wb25lbnQpXG4gICAgLnJlcGxhY2UoL1soKV0vZywgZXNjYXBlKTtcbi8qKlxuICogU2FmZWx5IHdlYiBkZWNvZGUgYSBzdHJpbmcgdmFsdWUgKGluc3BpcmVkIGJ5IGpzLWNvb2tpZSlcbiAqIEBwYXJhbSBzdHIgVGhlIHN0cmluZyB2YWx1ZSB0byBkZWNvZGVcbiAqL1xuY29uc3QgZGVjb2RlID0gKHN0cikgPT4gc3RyLnJlcGxhY2UoLyglW1xcZEEtRl17Mn0pKy9naSwgZGVjb2RlVVJJQ29tcG9uZW50KTtcbmV4cG9ydCBjbGFzcyBDYXBhY2l0b3JDb29raWVzUGx1Z2luV2ViIGV4dGVuZHMgV2ViUGx1Z2luIHtcbiAgICBhc3luYyBnZXRDb29raWVzKCkge1xuICAgICAgICBjb25zdCBjb29raWVzID0gZG9jdW1lbnQuY29va2llO1xuICAgICAgICBjb25zdCBjb29raWVNYXAgPSB7fTtcbiAgICAgICAgY29va2llcy5zcGxpdCgnOycpLmZvckVhY2goKGNvb2tpZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGNvb2tpZS5sZW5ndGggPD0gMClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAvLyBSZXBsYWNlIGZpcnN0IFwiPVwiIHdpdGggQ0FQX0NPT0tJRSB0byBwcmV2ZW50IHNwbGl0dGluZyBvbiBhZGRpdGlvbmFsIFwiPVwiXG4gICAgICAgICAgICBsZXQgW2tleSwgdmFsdWVdID0gY29va2llLnJlcGxhY2UoLz0vLCAnQ0FQX0NPT0tJRScpLnNwbGl0KCdDQVBfQ09PS0lFJyk7XG4gICAgICAgICAgICBrZXkgPSBkZWNvZGUoa2V5KS50cmltKCk7XG4gICAgICAgICAgICB2YWx1ZSA9IGRlY29kZSh2YWx1ZSkudHJpbSgpO1xuICAgICAgICAgICAgY29va2llTWFwW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBjb29raWVNYXA7XG4gICAgfVxuICAgIGFzeW5jIHNldENvb2tpZShvcHRpb25zKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBTYWZlbHkgRW5jb2RlZCBLZXkvVmFsdWVcbiAgICAgICAgICAgIGNvbnN0IGVuY29kZWRLZXkgPSBlbmNvZGUob3B0aW9ucy5rZXkpO1xuICAgICAgICAgICAgY29uc3QgZW5jb2RlZFZhbHVlID0gZW5jb2RlKG9wdGlvbnMudmFsdWUpO1xuICAgICAgICAgICAgLy8gQ2xlYW4gJiBzYW5pdGl6ZSBvcHRpb25zXG4gICAgICAgICAgICBjb25zdCBleHBpcmVzID0gYDsgZXhwaXJlcz0keyhvcHRpb25zLmV4cGlyZXMgfHwgJycpLnJlcGxhY2UoJ2V4cGlyZXM9JywgJycpfWA7IC8vIERlZmF1bHQgaXMgXCI7IGV4cGlyZXM9XCJcbiAgICAgICAgICAgIGNvbnN0IHBhdGggPSAob3B0aW9ucy5wYXRoIHx8ICcvJykucmVwbGFjZSgncGF0aD0nLCAnJyk7IC8vIERlZmF1bHQgaXMgXCJwYXRoPS9cIlxuICAgICAgICAgICAgY29uc3QgZG9tYWluID0gb3B0aW9ucy51cmwgIT0gbnVsbCAmJiBvcHRpb25zLnVybC5sZW5ndGggPiAwID8gYGRvbWFpbj0ke29wdGlvbnMudXJsfWAgOiAnJztcbiAgICAgICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGAke2VuY29kZWRLZXl9PSR7ZW5jb2RlZFZhbHVlIHx8ICcnfSR7ZXhwaXJlc307IHBhdGg9JHtwYXRofTsgJHtkb21haW59O2A7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIGRlbGV0ZUNvb2tpZShvcHRpb25zKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBkb2N1bWVudC5jb29raWUgPSBgJHtvcHRpb25zLmtleX09OyBNYXgtQWdlPTBgO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBjbGVhckNvb2tpZXMoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBjb29raWVzID0gZG9jdW1lbnQuY29va2llLnNwbGl0KCc7JykgfHwgW107XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGNvb2tpZSBvZiBjb29raWVzKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuY29va2llID0gY29va2llLnJlcGxhY2UoL14gKy8sICcnKS5yZXBsYWNlKC89LiovLCBgPTtleHBpcmVzPSR7bmV3IERhdGUoKS50b1VUQ1N0cmluZygpfTtwYXRoPS9gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXN5bmMgY2xlYXJBbGxDb29raWVzKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5jbGVhckNvb2tpZXMoKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnQgY29uc3QgQ2FwYWNpdG9yQ29va2llcyA9IHJlZ2lzdGVyUGx1Z2luKCdDYXBhY2l0b3JDb29raWVzJywge1xuICAgIHdlYjogKCkgPT4gbmV3IENhcGFjaXRvckNvb2tpZXNQbHVnaW5XZWIoKSxcbn0pO1xuLy8gVVRJTElUWSBGVU5DVElPTlNcbi8qKlxuICogUmVhZCBpbiBhIEJsb2IgdmFsdWUgYW5kIHJldHVybiBpdCBhcyBhIGJhc2U2NCBzdHJpbmdcbiAqIEBwYXJhbSBibG9iIFRoZSBibG9iIHZhbHVlIHRvIGNvbnZlcnQgdG8gYSBiYXNlNjQgc3RyaW5nXG4gKi9cbmV4cG9ydCBjb25zdCByZWFkQmxvYkFzQmFzZTY0ID0gYXN5bmMgKGJsb2IpID0+IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgIHJlYWRlci5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGJhc2U2NFN0cmluZyA9IHJlYWRlci5yZXN1bHQ7XG4gICAgICAgIC8vIHJlbW92ZSBwcmVmaXggXCJkYXRhOmFwcGxpY2F0aW9uL3BkZjtiYXNlNjQsXCJcbiAgICAgICAgcmVzb2x2ZShiYXNlNjRTdHJpbmcuaW5kZXhPZignLCcpID49IDAgPyBiYXNlNjRTdHJpbmcuc3BsaXQoJywnKVsxXSA6IGJhc2U2NFN0cmluZyk7XG4gICAgfTtcbiAgICByZWFkZXIub25lcnJvciA9IChlcnJvcikgPT4gcmVqZWN0KGVycm9yKTtcbiAgICByZWFkZXIucmVhZEFzRGF0YVVSTChibG9iKTtcbn0pO1xuLyoqXG4gKiBOb3JtYWxpemUgYW4gSHR0cEhlYWRlcnMgbWFwIGJ5IGxvd2VyY2FzaW5nIGFsbCBvZiB0aGUgdmFsdWVzXG4gKiBAcGFyYW0gaGVhZGVycyBUaGUgSHR0cEhlYWRlcnMgb2JqZWN0IHRvIG5vcm1hbGl6ZVxuICovXG5jb25zdCBub3JtYWxpemVIdHRwSGVhZGVycyA9IChoZWFkZXJzID0ge30pID0+IHtcbiAgICBjb25zdCBvcmlnaW5hbEtleXMgPSBPYmplY3Qua2V5cyhoZWFkZXJzKTtcbiAgICBjb25zdCBsb3dlcmVkS2V5cyA9IE9iamVjdC5rZXlzKGhlYWRlcnMpLm1hcCgoaykgPT4gay50b0xvY2FsZUxvd2VyQ2FzZSgpKTtcbiAgICBjb25zdCBub3JtYWxpemVkID0gbG93ZXJlZEtleXMucmVkdWNlKChhY2MsIGtleSwgaW5kZXgpID0+IHtcbiAgICAgICAgYWNjW2tleV0gPSBoZWFkZXJzW29yaWdpbmFsS2V5c1tpbmRleF1dO1xuICAgICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHt9KTtcbiAgICByZXR1cm4gbm9ybWFsaXplZDtcbn07XG4vKipcbiAqIEJ1aWxkcyBhIHN0cmluZyBvZiB1cmwgcGFyYW1ldGVycyB0aGF0XG4gKiBAcGFyYW0gcGFyYW1zIEEgbWFwIG9mIHVybCBwYXJhbWV0ZXJzXG4gKiBAcGFyYW0gc2hvdWxkRW5jb2RlIHRydWUgaWYgeW91IHNob3VsZCBlbmNvZGVVUklDb21wb25lbnQoKSB0aGUgdmFsdWVzICh0cnVlIGJ5IGRlZmF1bHQpXG4gKi9cbmNvbnN0IGJ1aWxkVXJsUGFyYW1zID0gKHBhcmFtcywgc2hvdWxkRW5jb2RlID0gdHJ1ZSkgPT4ge1xuICAgIGlmICghcGFyYW1zKVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICBjb25zdCBvdXRwdXQgPSBPYmplY3QuZW50cmllcyhwYXJhbXMpLnJlZHVjZSgoYWNjdW11bGF0b3IsIGVudHJ5KSA9PiB7XG4gICAgICAgIGNvbnN0IFtrZXksIHZhbHVlXSA9IGVudHJ5O1xuICAgICAgICBsZXQgZW5jb2RlZFZhbHVlO1xuICAgICAgICBsZXQgaXRlbTtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICBpdGVtID0gJyc7XG4gICAgICAgICAgICB2YWx1ZS5mb3JFYWNoKChzdHIpID0+IHtcbiAgICAgICAgICAgICAgICBlbmNvZGVkVmFsdWUgPSBzaG91bGRFbmNvZGUgPyBlbmNvZGVVUklDb21wb25lbnQoc3RyKSA6IHN0cjtcbiAgICAgICAgICAgICAgICBpdGVtICs9IGAke2tleX09JHtlbmNvZGVkVmFsdWV9JmA7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vIGxhc3QgY2hhcmFjdGVyIHdpbGwgYWx3YXlzIGJlIFwiJlwiIHNvIHNsaWNlIGl0IG9mZlxuICAgICAgICAgICAgaXRlbS5zbGljZSgwLCAtMSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBlbmNvZGVkVmFsdWUgPSBzaG91bGRFbmNvZGUgPyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpIDogdmFsdWU7XG4gICAgICAgICAgICBpdGVtID0gYCR7a2V5fT0ke2VuY29kZWRWYWx1ZX1gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBgJHthY2N1bXVsYXRvcn0mJHtpdGVtfWA7XG4gICAgfSwgJycpO1xuICAgIC8vIFJlbW92ZSBpbml0aWFsIFwiJlwiIGZyb20gdGhlIHJlZHVjZVxuICAgIHJldHVybiBvdXRwdXQuc3Vic3RyKDEpO1xufTtcbi8qKlxuICogQnVpbGQgdGhlIFJlcXVlc3RJbml0IG9iamVjdCBiYXNlZCBvbiB0aGUgb3B0aW9ucyBwYXNzZWQgaW50byB0aGUgaW5pdGlhbCByZXF1ZXN0XG4gKiBAcGFyYW0gb3B0aW9ucyBUaGUgSHR0cCBwbHVnaW4gb3B0aW9uc1xuICogQHBhcmFtIGV4dHJhIEFueSBleHRyYSBSZXF1ZXN0SW5pdCB2YWx1ZXNcbiAqL1xuZXhwb3J0IGNvbnN0IGJ1aWxkUmVxdWVzdEluaXQgPSAob3B0aW9ucywgZXh0cmEgPSB7fSkgPT4ge1xuICAgIGNvbnN0IG91dHB1dCA9IE9iamVjdC5hc3NpZ24oeyBtZXRob2Q6IG9wdGlvbnMubWV0aG9kIHx8ICdHRVQnLCBoZWFkZXJzOiBvcHRpb25zLmhlYWRlcnMgfSwgZXh0cmEpO1xuICAgIC8vIEdldCB0aGUgY29udGVudC10eXBlXG4gICAgY29uc3QgaGVhZGVycyA9IG5vcm1hbGl6ZUh0dHBIZWFkZXJzKG9wdGlvbnMuaGVhZGVycyk7XG4gICAgY29uc3QgdHlwZSA9IGhlYWRlcnNbJ2NvbnRlbnQtdHlwZSddIHx8ICcnO1xuICAgIC8vIElmIGJvZHkgaXMgYWxyZWFkeSBhIHN0cmluZywgdGhlbiBwYXNzIGl0IHRocm91Z2ggYXMtaXMuXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLmRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIG91dHB1dC5ib2R5ID0gb3B0aW9ucy5kYXRhO1xuICAgIH1cbiAgICAvLyBCdWlsZCByZXF1ZXN0IGluaXRpYWxpemVycyBiYXNlZCBvZmYgb2YgY29udGVudC10eXBlXG4gICAgZWxzZSBpZiAodHlwZS5pbmNsdWRlcygnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJykpIHtcbiAgICAgICAgY29uc3QgcGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xuICAgICAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhvcHRpb25zLmRhdGEgfHwge30pKSB7XG4gICAgICAgICAgICBwYXJhbXMuc2V0KGtleSwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIG91dHB1dC5ib2R5ID0gcGFyYW1zLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGUuaW5jbHVkZXMoJ211bHRpcGFydC9mb3JtLWRhdGEnKSB8fCBvcHRpb25zLmRhdGEgaW5zdGFuY2VvZiBGb3JtRGF0YSkge1xuICAgICAgICBjb25zdCBmb3JtID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgICAgIGlmIChvcHRpb25zLmRhdGEgaW5zdGFuY2VvZiBGb3JtRGF0YSkge1xuICAgICAgICAgICAgb3B0aW9ucy5kYXRhLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgICAgICBmb3JtLmFwcGVuZChrZXksIHZhbHVlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMob3B0aW9ucy5kYXRhKSkge1xuICAgICAgICAgICAgICAgIGZvcm0uYXBwZW5kKGtleSwgb3B0aW9ucy5kYXRhW2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIG91dHB1dC5ib2R5ID0gZm9ybTtcbiAgICAgICAgY29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKG91dHB1dC5oZWFkZXJzKTtcbiAgICAgICAgaGVhZGVycy5kZWxldGUoJ2NvbnRlbnQtdHlwZScpOyAvLyBjb250ZW50LXR5cGUgd2lsbCBiZSBzZXQgYnkgYHdpbmRvdy5mZXRjaGAgdG8gaW5jbHVkeSBib3VuZGFyeVxuICAgICAgICBvdXRwdXQuaGVhZGVycyA9IGhlYWRlcnM7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGUuaW5jbHVkZXMoJ2FwcGxpY2F0aW9uL2pzb24nKSB8fCB0eXBlb2Ygb3B0aW9ucy5kYXRhID09PSAnb2JqZWN0Jykge1xuICAgICAgICBvdXRwdXQuYm9keSA9IEpTT04uc3RyaW5naWZ5KG9wdGlvbnMuZGF0YSk7XG4gICAgfVxuICAgIHJldHVybiBvdXRwdXQ7XG59O1xuLy8gV0VCIElNUExFTUVOVEFUSU9OXG5leHBvcnQgY2xhc3MgQ2FwYWNpdG9ySHR0cFBsdWdpbldlYiBleHRlbmRzIFdlYlBsdWdpbiB7XG4gICAgLyoqXG4gICAgICogUGVyZm9ybSBhbiBIdHRwIHJlcXVlc3QgZ2l2ZW4gYSBzZXQgb2Ygb3B0aW9uc1xuICAgICAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbnMgdG8gYnVpbGQgdGhlIEhUVFAgcmVxdWVzdFxuICAgICAqL1xuICAgIGFzeW5jIHJlcXVlc3Qob3B0aW9ucykge1xuICAgICAgICBjb25zdCByZXF1ZXN0SW5pdCA9IGJ1aWxkUmVxdWVzdEluaXQob3B0aW9ucywgb3B0aW9ucy53ZWJGZXRjaEV4dHJhKTtcbiAgICAgICAgY29uc3QgdXJsUGFyYW1zID0gYnVpbGRVcmxQYXJhbXMob3B0aW9ucy5wYXJhbXMsIG9wdGlvbnMuc2hvdWxkRW5jb2RlVXJsUGFyYW1zKTtcbiAgICAgICAgY29uc3QgdXJsID0gdXJsUGFyYW1zID8gYCR7b3B0aW9ucy51cmx9PyR7dXJsUGFyYW1zfWAgOiBvcHRpb25zLnVybDtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIHJlcXVlc3RJbml0KTtcbiAgICAgICAgY29uc3QgY29udGVudFR5cGUgPSByZXNwb25zZS5oZWFkZXJzLmdldCgnY29udGVudC10eXBlJykgfHwgJyc7XG4gICAgICAgIC8vIERlZmF1bHQgdG8gJ3RleHQnIHJlc3BvbnNlVHlwZSBzbyBubyBwYXJzaW5nIGhhcHBlbnNcbiAgICAgICAgbGV0IHsgcmVzcG9uc2VUeXBlID0gJ3RleHQnIH0gPSByZXNwb25zZS5vayA/IG9wdGlvbnMgOiB7fTtcbiAgICAgICAgLy8gSWYgdGhlIHJlc3BvbnNlIGNvbnRlbnQtdHlwZSBpcyBqc29uLCBmb3JjZSB0aGUgcmVzcG9uc2UgdG8gYmUganNvblxuICAgICAgICBpZiAoY29udGVudFR5cGUuaW5jbHVkZXMoJ2FwcGxpY2F0aW9uL2pzb24nKSkge1xuICAgICAgICAgICAgcmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuICAgICAgICB9XG4gICAgICAgIGxldCBkYXRhO1xuICAgICAgICBsZXQgYmxvYjtcbiAgICAgICAgc3dpdGNoIChyZXNwb25zZVR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ2FycmF5YnVmZmVyJzpcbiAgICAgICAgICAgIGNhc2UgJ2Jsb2InOlxuICAgICAgICAgICAgICAgIGJsb2IgPSBhd2FpdCByZXNwb25zZS5ibG9iKCk7XG4gICAgICAgICAgICAgICAgZGF0YSA9IGF3YWl0IHJlYWRCbG9iQXNCYXNlNjQoYmxvYik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdqc29uJzpcbiAgICAgICAgICAgICAgICBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZG9jdW1lbnQnOlxuICAgICAgICAgICAgY2FzZSAndGV4dCc6XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGRhdGEgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ29udmVydCBmZXRjaCBoZWFkZXJzIHRvIENhcGFjaXRvciBIdHRwSGVhZGVyc1xuICAgICAgICBjb25zdCBoZWFkZXJzID0ge307XG4gICAgICAgIHJlc3BvbnNlLmhlYWRlcnMuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICAgICAgaGVhZGVyc1trZXldID0gdmFsdWU7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGF0YSxcbiAgICAgICAgICAgIGhlYWRlcnMsXG4gICAgICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgICAgICAgIHVybDogcmVzcG9uc2UudXJsLFxuICAgICAgICB9O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtIGFuIEh0dHAgR0VUIHJlcXVlc3QgZ2l2ZW4gYSBzZXQgb2Ygb3B0aW9uc1xuICAgICAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbnMgdG8gYnVpbGQgdGhlIEhUVFAgcmVxdWVzdFxuICAgICAqL1xuICAgIGFzeW5jIGdldChvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zKSwgeyBtZXRob2Q6ICdHRVQnIH0pKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUGVyZm9ybSBhbiBIdHRwIFBPU1QgcmVxdWVzdCBnaXZlbiBhIHNldCBvZiBvcHRpb25zXG4gICAgICogQHBhcmFtIG9wdGlvbnMgT3B0aW9ucyB0byBidWlsZCB0aGUgSFRUUCByZXF1ZXN0XG4gICAgICovXG4gICAgYXN5bmMgcG9zdChvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zKSwgeyBtZXRob2Q6ICdQT1NUJyB9KSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBlcmZvcm0gYW4gSHR0cCBQVVQgcmVxdWVzdCBnaXZlbiBhIHNldCBvZiBvcHRpb25zXG4gICAgICogQHBhcmFtIG9wdGlvbnMgT3B0aW9ucyB0byBidWlsZCB0aGUgSFRUUCByZXF1ZXN0XG4gICAgICovXG4gICAgYXN5bmMgcHV0KG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdChPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMpLCB7IG1ldGhvZDogJ1BVVCcgfSkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtIGFuIEh0dHAgUEFUQ0ggcmVxdWVzdCBnaXZlbiBhIHNldCBvZiBvcHRpb25zXG4gICAgICogQHBhcmFtIG9wdGlvbnMgT3B0aW9ucyB0byBidWlsZCB0aGUgSFRUUCByZXF1ZXN0XG4gICAgICovXG4gICAgYXN5bmMgcGF0Y2gob3B0aW9ucykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucyksIHsgbWV0aG9kOiAnUEFUQ0gnIH0pKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUGVyZm9ybSBhbiBIdHRwIERFTEVURSByZXF1ZXN0IGdpdmVuIGEgc2V0IG9mIG9wdGlvbnNcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zIHRvIGJ1aWxkIHRoZSBIVFRQIHJlcXVlc3RcbiAgICAgKi9cbiAgICBhc3luYyBkZWxldGUob3B0aW9ucykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucyksIHsgbWV0aG9kOiAnREVMRVRFJyB9KSk7XG4gICAgfVxufVxuZXhwb3J0IGNvbnN0IENhcGFjaXRvckh0dHAgPSByZWdpc3RlclBsdWdpbignQ2FwYWNpdG9ySHR0cCcsIHtcbiAgICB3ZWI6ICgpID0+IG5ldyBDYXBhY2l0b3JIdHRwUGx1Z2luV2ViKCksXG59KTtcbi8qKioqKioqKiBFTkQgSFRUUCBQTFVHSU4gKioqKioqKiovXG4vKioqKioqKiogU1lTVEVNIEJBUlMgUExVR0lOICoqKioqKioqL1xuLyoqXG4gKiBBdmFpbGFibGUgc3RhdHVzIGJhciBzdHlsZXMuXG4gKi9cbmV4cG9ydCB2YXIgU3lzdGVtQmFyc1N0eWxlO1xuKGZ1bmN0aW9uIChTeXN0ZW1CYXJzU3R5bGUpIHtcbiAgICAvKipcbiAgICAgKiBMaWdodCBzeXN0ZW0gYmFyIGNvbnRlbnQgb24gYSBkYXJrIGJhY2tncm91bmQuXG4gICAgICpcbiAgICAgKiBAc2luY2UgOC4wLjBcbiAgICAgKi9cbiAgICBTeXN0ZW1CYXJzU3R5bGVbXCJEYXJrXCJdID0gXCJEQVJLXCI7XG4gICAgLyoqXG4gICAgICogRm9yIGRhcmsgc3lzdGVtIGJhciBjb250ZW50IG9uIGEgbGlnaHQgYmFja2dyb3VuZC5cbiAgICAgKlxuICAgICAqIEBzaW5jZSA4LjAuMFxuICAgICAqL1xuICAgIFN5c3RlbUJhcnNTdHlsZVtcIkxpZ2h0XCJdID0gXCJMSUdIVFwiO1xuICAgIC8qKlxuICAgICAqIFRoZSBzdHlsZSBpcyBiYXNlZCBvbiB0aGUgZGV2aWNlIGFwcGVhcmFuY2Ugb3IgdGhlIHVuZGVybHlpbmcgY29udGVudC5cbiAgICAgKiBJZiB0aGUgZGV2aWNlIGlzIHVzaW5nIERhcmsgbW9kZSwgdGhlIHN5c3RlbSBiYXJzIGNvbnRlbnQgd2lsbCBiZSBsaWdodC5cbiAgICAgKiBJZiB0aGUgZGV2aWNlIGlzIHVzaW5nIExpZ2h0IG1vZGUsIHRoZSBzeXN0ZW0gYmFycyBjb250ZW50IHdpbGwgYmUgZGFyay5cbiAgICAgKlxuICAgICAqIEBzaW5jZSA4LjAuMFxuICAgICAqL1xuICAgIFN5c3RlbUJhcnNTdHlsZVtcIkRlZmF1bHRcIl0gPSBcIkRFRkFVTFRcIjtcbn0pKFN5c3RlbUJhcnNTdHlsZSB8fCAoU3lzdGVtQmFyc1N0eWxlID0ge30pKTtcbi8qKlxuICogQXZhaWxhYmxlIHN5c3RlbSBiYXIgdHlwZXMuXG4gKi9cbmV4cG9ydCB2YXIgU3lzdGVtQmFyVHlwZTtcbihmdW5jdGlvbiAoU3lzdGVtQmFyVHlwZSkge1xuICAgIC8qKlxuICAgICAqIFRoZSB0b3Agc3RhdHVzIGJhciBvbiBib3RoIEFuZHJvaWQgYW5kIGlPUy5cbiAgICAgKlxuICAgICAqIEBzaW5jZSA4LjAuMFxuICAgICAqL1xuICAgIFN5c3RlbUJhclR5cGVbXCJTdGF0dXNCYXJcIl0gPSBcIlN0YXR1c0JhclwiO1xuICAgIC8qKlxuICAgICAqIFRoZSBuYXZpZ2F0aW9uIGJhciAob3IgZ2VzdHVyZSBiYXIgb24gaU9TKSBvbiBib3RoIEFuZHJvaWQgYW5kIGlPUy5cbiAgICAgKlxuICAgICAqIEBzaW5jZSA4LjAuMFxuICAgICAqL1xuICAgIFN5c3RlbUJhclR5cGVbXCJOYXZpZ2F0aW9uQmFyXCJdID0gXCJOYXZpZ2F0aW9uQmFyXCI7XG59KShTeXN0ZW1CYXJUeXBlIHx8IChTeXN0ZW1CYXJUeXBlID0ge30pKTtcbmV4cG9ydCBjbGFzcyBTeXN0ZW1CYXJzUGx1Z2luV2ViIGV4dGVuZHMgV2ViUGx1Z2luIHtcbiAgICBhc3luYyBzZXRTdHlsZSgpIHtcbiAgICAgICAgdGhpcy51bmF2YWlsYWJsZSgnbm90IGF2YWlsYWJsZSBmb3Igd2ViJyk7XG4gICAgfVxuICAgIGFzeW5jIHNldEFuaW1hdGlvbigpIHtcbiAgICAgICAgdGhpcy51bmF2YWlsYWJsZSgnbm90IGF2YWlsYWJsZSBmb3Igd2ViJyk7XG4gICAgfVxuICAgIGFzeW5jIHNob3coKSB7XG4gICAgICAgIHRoaXMudW5hdmFpbGFibGUoJ25vdCBhdmFpbGFibGUgZm9yIHdlYicpO1xuICAgIH1cbiAgICBhc3luYyBoaWRlKCkge1xuICAgICAgICB0aGlzLnVuYXZhaWxhYmxlKCdub3QgYXZhaWxhYmxlIGZvciB3ZWInKTtcbiAgICB9XG59XG5leHBvcnQgY29uc3QgU3lzdGVtQmFycyA9IHJlZ2lzdGVyUGx1Z2luKCdTeXN0ZW1CYXJzJywge1xuICAgIHdlYjogKCkgPT4gbmV3IFN5c3RlbUJhcnNQbHVnaW5XZWIoKSxcbn0pO1xuLyoqKioqKioqIEVORCBTWVNURU0gQkFSUyBQTFVHSU4gKioqKioqKiovXG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb3JlLXBsdWdpbnMuanMubWFwIiwgImltcG9ydCB0eXBlIHsgSHR0cE9wdGlvbnMsIFBlcm1pc3Npb25TdGF0ZSwgUGx1Z2luTGlzdGVuZXJIYW5kbGUgfSBmcm9tICdAY2FwYWNpdG9yL2NvcmUnO1xuXG5leHBvcnQgdHlwZSBDYWxsYmFja0lEID0gc3RyaW5nO1xuXG5leHBvcnQgaW50ZXJmYWNlIFBlcm1pc3Npb25TdGF0dXMge1xuICBwdWJsaWNTdG9yYWdlOiBQZXJtaXNzaW9uU3RhdGU7XG59XG5cbmV4cG9ydCBlbnVtIERpcmVjdG9yeSB7XG4gIC8qKlxuICAgKiBUaGUgRG9jdW1lbnRzIGRpcmVjdG9yeS5cbiAgICogT24gaU9TIGl0J3MgdGhlIGFwcCdzIGRvY3VtZW50cyBkaXJlY3RvcnkuXG4gICAqIFVzZSB0aGlzIGRpcmVjdG9yeSB0byBzdG9yZSB1c2VyLWdlbmVyYXRlZCBjb250ZW50LlxuICAgKiBPbiBBbmRyb2lkIGl0J3MgdGhlIFB1YmxpYyBEb2N1bWVudHMgZm9sZGVyLCBzbyBpdCdzIGFjY2Vzc2libGUgZnJvbSBvdGhlciBhcHBzLlxuICAgKiBJdCdzIG5vdCBhY2Nlc3NpYmxlIG9uIEFuZHJvaWQgMTAgdW5sZXNzIHRoZSBhcHAgZW5hYmxlcyBsZWdhY3kgRXh0ZXJuYWwgU3RvcmFnZVxuICAgKiBieSBhZGRpbmcgYGFuZHJvaWQ6cmVxdWVzdExlZ2FjeUV4dGVybmFsU3RvcmFnZT1cInRydWVcImAgaW4gdGhlIGBhcHBsaWNhdGlvbmAgdGFnXG4gICAqIGluIHRoZSBgQW5kcm9pZE1hbmlmZXN0LnhtbGAuXG4gICAqIE9uIEFuZHJvaWQgMTEgb3IgbmV3ZXIgdGhlIGFwcCBjYW4gb25seSBhY2Nlc3MgdGhlIGZpbGVzL2ZvbGRlcnMgdGhlIGFwcCBjcmVhdGVkLlxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIERvY3VtZW50cyA9ICdET0NVTUVOVFMnLFxuXG4gIC8qKlxuICAgKiBUaGUgRGF0YSBkaXJlY3RvcnkuXG4gICAqIE9uIGlPUyBpdCB3aWxsIHVzZSB0aGUgRG9jdW1lbnRzIGRpcmVjdG9yeS5cbiAgICogT24gQW5kcm9pZCBpdCdzIHRoZSBkaXJlY3RvcnkgaG9sZGluZyBhcHBsaWNhdGlvbiBmaWxlcy5cbiAgICogRmlsZXMgd2lsbCBiZSBkZWxldGVkIHdoZW4gdGhlIGFwcGxpY2F0aW9uIGlzIHVuaW5zdGFsbGVkLlxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIERhdGEgPSAnREFUQScsXG5cbiAgLyoqXG4gICAqIFRoZSBMaWJyYXJ5IGRpcmVjdG9yeS5cbiAgICogT24gaU9TIGl0IHdpbGwgdXNlIHRoZSBMaWJyYXJ5IGRpcmVjdG9yeS5cbiAgICogT24gQW5kcm9pZCBpdCdzIHRoZSBkaXJlY3RvcnkgaG9sZGluZyBhcHBsaWNhdGlvbiBmaWxlcy5cbiAgICogRmlsZXMgd2lsbCBiZSBkZWxldGVkIHdoZW4gdGhlIGFwcGxpY2F0aW9uIGlzIHVuaW5zdGFsbGVkLlxuICAgKlxuICAgKiBAc2luY2UgMS4xLjBcbiAgICovXG4gIExpYnJhcnkgPSAnTElCUkFSWScsXG5cbiAgLyoqXG4gICAqIFRoZSBDYWNoZSBkaXJlY3RvcnkuXG4gICAqIENhbiBiZSBkZWxldGVkIGluIGNhc2VzIG9mIGxvdyBtZW1vcnksIHNvIHVzZSB0aGlzIGRpcmVjdG9yeSB0byB3cml0ZSBhcHAtc3BlY2lmaWMgZmlsZXMuXG4gICAqIHRoYXQgeW91ciBhcHAgY2FuIHJlLWNyZWF0ZSBlYXNpbHkuXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgQ2FjaGUgPSAnQ0FDSEUnLFxuXG4gIC8qKlxuICAgKiBUaGUgZXh0ZXJuYWwgZGlyZWN0b3J5LlxuICAgKiBPbiBpT1MgaXQgd2lsbCB1c2UgdGhlIERvY3VtZW50cyBkaXJlY3RvcnkuXG4gICAqIE9uIEFuZHJvaWQgaXQncyB0aGUgZGlyZWN0b3J5IG9uIHRoZSBwcmltYXJ5IHNoYXJlZC9leHRlcm5hbFxuICAgKiBzdG9yYWdlIGRldmljZSB3aGVyZSB0aGUgYXBwbGljYXRpb24gY2FuIHBsYWNlIHBlcnNpc3RlbnQgZmlsZXMgaXQgb3ducy5cbiAgICogVGhlc2UgZmlsZXMgYXJlIGludGVybmFsIHRvIHRoZSBhcHBsaWNhdGlvbnMsIGFuZCBub3QgdHlwaWNhbGx5IHZpc2libGVcbiAgICogdG8gdGhlIHVzZXIgYXMgbWVkaWEuXG4gICAqIEZpbGVzIHdpbGwgYmUgZGVsZXRlZCB3aGVuIHRoZSBhcHBsaWNhdGlvbiBpcyB1bmluc3RhbGxlZC5cbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICBFeHRlcm5hbCA9ICdFWFRFUk5BTCcsXG5cbiAgLyoqXG4gICAqIFRoZSBleHRlcm5hbCBzdG9yYWdlIGRpcmVjdG9yeS5cbiAgICogT24gaU9TIGl0IHdpbGwgdXNlIHRoZSBEb2N1bWVudHMgZGlyZWN0b3J5LlxuICAgKiBPbiBBbmRyb2lkIGl0J3MgdGhlIHByaW1hcnkgc2hhcmVkL2V4dGVybmFsIHN0b3JhZ2UgZGlyZWN0b3J5LlxuICAgKiBJdCdzIG5vdCBhY2Nlc3NpYmxlIG9uIEFuZHJvaWQgMTAgdW5sZXNzIHRoZSBhcHAgZW5hYmxlcyBsZWdhY3kgRXh0ZXJuYWwgU3RvcmFnZVxuICAgKiBieSBhZGRpbmcgYGFuZHJvaWQ6cmVxdWVzdExlZ2FjeUV4dGVybmFsU3RvcmFnZT1cInRydWVcImAgaW4gdGhlIGBhcHBsaWNhdGlvbmAgdGFnXG4gICAqIGluIHRoZSBgQW5kcm9pZE1hbmlmZXN0LnhtbGAuXG4gICAqIEl0J3Mgbm90IGFjY2Vzc2libGUgb24gQW5kcm9pZCAxMSBvciBuZXdlci5cbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuXG4gIEV4dGVybmFsU3RvcmFnZSA9ICdFWFRFUk5BTF9TVE9SQUdFJyxcbiAgLyoqXG4gICAqIFRoZSBleHRlcm5hbCBjYWNoZSBkaXJlY3RvcnkuXG4gICAqIE9uIGlPUyBpdCB3aWxsIHVzZSB0aGUgRG9jdW1lbnRzIGRpcmVjdG9yeS5cbiAgICogT24gQW5kcm9pZCBpdCdzIHRoZSBwcmltYXJ5IHNoYXJlZC9leHRlcm5hbCBjYWNoZS5cbiAgICpcbiAgICogQHNpbmNlIDcuMS4wXG4gICAqL1xuICBFeHRlcm5hbENhY2hlID0gJ0VYVEVSTkFMX0NBQ0hFJyxcblxuICAvKipcbiAgICogVGhlIExpYnJhcnkgZGlyZWN0b3J5IHdpdGhvdXQgY2xvdWQgYmFja3VwLiBVc2VkIGluIGlPUy5cbiAgICogT24gQW5kcm9pZCBpdCdzIHRoZSBkaXJlY3RvcnkgaG9sZGluZyBhcHBsaWNhdGlvbiBmaWxlcy5cbiAgICpcbiAgICogQHNpbmNlIDcuMS4wXG4gICAqL1xuICBMaWJyYXJ5Tm9DbG91ZCA9ICdMSUJSQVJZX05PX0NMT1VEJyxcblxuICAvKipcbiAgICogQSB0ZW1wb3JhcnkgZGlyZWN0b3J5IGZvciBpT1MuXG4gICAqIE9uIEFuZHJvaWQgaXQncyB0aGUgZGlyZWN0b3J5IGhvbGRpbmcgdGhlIGFwcGxpY2F0aW9uIGNhY2hlLlxuICAgKlxuICAgKiBAc2luY2UgNy4xLjBcbiAgICovXG4gIFRlbXBvcmFyeSA9ICdURU1QT1JBUlknLFxufVxuXG5leHBvcnQgZW51bSBFbmNvZGluZyB7XG4gIC8qKlxuICAgKiBFaWdodC1iaXQgVUNTIFRyYW5zZm9ybWF0aW9uIEZvcm1hdFxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIFVURjggPSAndXRmOCcsXG5cbiAgLyoqXG4gICAqIFNldmVuLWJpdCBBU0NJSSwgYS5rLmEuIElTTzY0Ni1VUywgYS5rLmEuIHRoZSBCYXNpYyBMYXRpbiBibG9jayBvZiB0aGVcbiAgICogVW5pY29kZSBjaGFyYWN0ZXIgc2V0XG4gICAqIFRoaXMgZW5jb2RpbmcgaXMgb25seSBzdXBwb3J0ZWQgb24gQW5kcm9pZC5cbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICBBU0NJSSA9ICdhc2NpaScsXG5cbiAgLyoqXG4gICAqIFNpeHRlZW4tYml0IFVDUyBUcmFuc2Zvcm1hdGlvbiBGb3JtYXQsIGJ5dGUgb3JkZXIgaWRlbnRpZmllZCBieSBhblxuICAgKiBvcHRpb25hbCBieXRlLW9yZGVyIG1hcmtcbiAgICogVGhpcyBlbmNvZGluZyBpcyBvbmx5IHN1cHBvcnRlZCBvbiBBbmRyb2lkLlxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIFVURjE2ID0gJ3V0ZjE2Jyxcbn1cblxuZXhwb3J0IGludGVyZmFjZSBXcml0ZUZpbGVPcHRpb25zIHtcbiAgLyoqXG4gICAqIFRoZSBwYXRoIG9mIHRoZSBmaWxlIHRvIHdyaXRlXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgcGF0aDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgZGF0YSB0byB3cml0ZVxuICAgKlxuICAgKiBOb3RlOiBCbG9iIGRhdGEgaXMgb25seSBzdXBwb3J0ZWQgb24gV2ViLlxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIGRhdGE6IHN0cmluZyB8IEJsb2I7XG5cbiAgLyoqXG4gICAqIFRoZSBgRGlyZWN0b3J5YCB0byBzdG9yZSB0aGUgZmlsZSBpblxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIGRpcmVjdG9yeT86IERpcmVjdG9yeTtcblxuICAvKipcbiAgICogVGhlIGVuY29kaW5nIHRvIHdyaXRlIHRoZSBmaWxlIGluLiBJZiBub3QgcHJvdmlkZWQsIGRhdGFcbiAgICogaXMgd3JpdHRlbiBhcyBiYXNlNjQgZW5jb2RlZC5cbiAgICpcbiAgICogUGFzcyBFbmNvZGluZy5VVEY4IHRvIHdyaXRlIGRhdGEgYXMgc3RyaW5nXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgZW5jb2Rpbmc/OiBFbmNvZGluZztcblxuICAvKipcbiAgICogV2hldGhlciB0byBjcmVhdGUgYW55IG1pc3NpbmcgcGFyZW50IGRpcmVjdG9yaWVzLlxuICAgKlxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIHJlY3Vyc2l2ZT86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQXBwZW5kRmlsZU9wdGlvbnMge1xuICAvKipcbiAgICogVGhlIHBhdGggb2YgdGhlIGZpbGUgdG8gYXBwZW5kXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgcGF0aDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgZGF0YSB0byB3cml0ZVxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIGRhdGE6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIGBEaXJlY3RvcnlgIHRvIHN0b3JlIHRoZSBmaWxlIGluXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgZGlyZWN0b3J5PzogRGlyZWN0b3J5O1xuXG4gIC8qKlxuICAgKiBUaGUgZW5jb2RpbmcgdG8gd3JpdGUgdGhlIGZpbGUgaW4uIElmIG5vdCBwcm92aWRlZCwgZGF0YVxuICAgKiBpcyB3cml0dGVuIGFzIGJhc2U2NCBlbmNvZGVkLlxuICAgKlxuICAgKiBQYXNzIEVuY29kaW5nLlVURjggdG8gd3JpdGUgZGF0YSBhcyBzdHJpbmdcbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICBlbmNvZGluZz86IEVuY29kaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJlYWRGaWxlT3B0aW9ucyB7XG4gIC8qKlxuICAgKiBUaGUgcGF0aCBvZiB0aGUgZmlsZSB0byByZWFkXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgcGF0aDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgYERpcmVjdG9yeWAgdG8gcmVhZCB0aGUgZmlsZSBmcm9tXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgZGlyZWN0b3J5PzogRGlyZWN0b3J5O1xuXG4gIC8qKlxuICAgKiBUaGUgZW5jb2RpbmcgdG8gcmVhZCB0aGUgZmlsZSBpbiwgaWYgbm90IHByb3ZpZGVkLCBkYXRhXG4gICAqIGlzIHJlYWQgYXMgYmluYXJ5IGFuZCByZXR1cm5lZCBhcyBiYXNlNjQgZW5jb2RlZC5cbiAgICpcbiAgICogUGFzcyBFbmNvZGluZy5VVEY4IHRvIHJlYWQgZGF0YSBhcyBzdHJpbmdcbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICBlbmNvZGluZz86IEVuY29kaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgb2Zmc2V0IHRvIHN0YXJ0IHJlYWRpbmcgdGhlIGZpbGUgZnJvbSwgaW4gYnl0ZXMuXG4gICAqIE5hdGl2ZSBvbmx5IChub3QgYXZhaWxhYmxlIGluIHdlYikuXG4gICAqIENhbiBiZSB1c2VkIGluIGNvbmp1bmN0aW9uIHdpdGggbGVuZ3RoIHRvIHBhcnRpYWxseSByZWFkIGZpbGVzLlxuICAgKlxuICAgKiBAc2luY2UgOC4xLjBcbiAgICogQGRlZmF1bHQgMFxuICAgKi9cbiAgb2Zmc2V0PzogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgbGVuZ3RoIG9mIGRhdGEgdG8gcmVhZCwgaW4gYnl0ZXMuXG4gICAqIEFueSBub24tcG9zaXRpdmUgdmFsdWUgbWVhbnMgdG8gcmVhZCB0byB0aGUgZW5kIG9mIHRoZSBmaWxlLlxuICAgKiBOYXRpdmUgb25seSAobm90IGF2YWlsYWJsZSBpbiB3ZWIpLlxuICAgKiBDYW4gYmUgdXNlZCBpbiBjb25qdW5jdGlvbiB3aXRoIG9mZnNldCB0byBwYXJ0aWFsbHkgcmVhZCBmaWxlcy5cbiAgICpcbiAgICogQHNpbmNlIDguMS4wXG4gICAqIEBkZWZhdWx0IC0xXG4gICAqL1xuICBsZW5ndGg/OiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVhZEZpbGVJbkNodW5rc09wdGlvbnMgZXh0ZW5kcyBSZWFkRmlsZU9wdGlvbnMge1xuICAvKipcbiAgICogU2l6ZSBvZiB0aGUgY2h1bmtzIGluIGJ5dGVzLlxuICAgKlxuICAgKiBAc2luY2UgNy4xLjBcbiAgICovXG4gIGNodW5rU2l6ZTogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIERlbGV0ZUZpbGVPcHRpb25zIHtcbiAgLyoqXG4gICAqIFRoZSBwYXRoIG9mIHRoZSBmaWxlIHRvIGRlbGV0ZVxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIHBhdGg6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIGBEaXJlY3RvcnlgIHRvIGRlbGV0ZSB0aGUgZmlsZSBmcm9tXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgZGlyZWN0b3J5PzogRGlyZWN0b3J5O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE1rZGlyT3B0aW9ucyB7XG4gIC8qKlxuICAgKiBUaGUgcGF0aCBvZiB0aGUgbmV3IGRpcmVjdG9yeVxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIHBhdGg6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIGBEaXJlY3RvcnlgIHRvIG1ha2UgdGhlIG5ldyBkaXJlY3RvcnkgaW5cbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICBkaXJlY3Rvcnk/OiBEaXJlY3Rvcnk7XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdG8gY3JlYXRlIGFueSBtaXNzaW5nIHBhcmVudCBkaXJlY3RvcmllcyBhcyB3ZWxsLlxuICAgKlxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIHJlY3Vyc2l2ZT86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUm1kaXJPcHRpb25zIHtcbiAgLyoqXG4gICAqIFRoZSBwYXRoIG9mIHRoZSBkaXJlY3RvcnkgdG8gcmVtb3ZlXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgcGF0aDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgYERpcmVjdG9yeWAgdG8gcmVtb3ZlIHRoZSBkaXJlY3RvcnkgZnJvbVxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIGRpcmVjdG9yeT86IERpcmVjdG9yeTtcblxuICAvKipcbiAgICogV2hldGhlciB0byByZWN1cnNpdmVseSByZW1vdmUgdGhlIGNvbnRlbnRzIG9mIHRoZSBkaXJlY3RvcnlcbiAgICpcbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICByZWN1cnNpdmU/OiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJlYWRkaXJPcHRpb25zIHtcbiAgLyoqXG4gICAqIFRoZSBwYXRoIG9mIHRoZSBkaXJlY3RvcnkgdG8gcmVhZFxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIHBhdGg6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIGBEaXJlY3RvcnlgIHRvIGxpc3QgZmlsZXMgZnJvbVxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIGRpcmVjdG9yeT86IERpcmVjdG9yeTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBHZXRVcmlPcHRpb25zIHtcbiAgLyoqXG4gICAqIFRoZSBwYXRoIG9mIHRoZSBmaWxlIHRvIGdldCB0aGUgVVJJIGZvclxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIHBhdGg6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIGBEaXJlY3RvcnlgIHRvIGdldCB0aGUgZmlsZSB1bmRlclxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIGRpcmVjdG9yeTogRGlyZWN0b3J5O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFN0YXRPcHRpb25zIHtcbiAgLyoqXG4gICAqIFRoZSBwYXRoIG9mIHRoZSBmaWxlIHRvIGdldCBkYXRhIGFib3V0XG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgcGF0aDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgYERpcmVjdG9yeWAgdG8gZ2V0IHRoZSBmaWxlIHVuZGVyXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgZGlyZWN0b3J5PzogRGlyZWN0b3J5O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENvcHlPcHRpb25zIHtcbiAgLyoqXG4gICAqIFRoZSBleGlzdGluZyBmaWxlIG9yIGRpcmVjdG9yeVxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIGZyb206IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIGRlc3RpbmF0aW9uIGZpbGUgb3IgZGlyZWN0b3J5XG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgdG86IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIGBEaXJlY3RvcnlgIGNvbnRhaW5pbmcgdGhlIGV4aXN0aW5nIGZpbGUgb3IgZGlyZWN0b3J5XG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgZGlyZWN0b3J5PzogRGlyZWN0b3J5O1xuXG4gIC8qKlxuICAgKiBUaGUgYERpcmVjdG9yeWAgY29udGFpbmluZyB0aGUgZGVzdGluYXRpb24gZmlsZSBvciBkaXJlY3RvcnkuIElmIG5vdCBzdXBwbGllZCB3aWxsIHVzZSB0aGUgJ2RpcmVjdG9yeSdcbiAgICogcGFyYW1ldGVyIGFzIHRoZSBkZXN0aW5hdGlvblxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIHRvRGlyZWN0b3J5PzogRGlyZWN0b3J5O1xufVxuXG5leHBvcnQgdHlwZSBSZW5hbWVPcHRpb25zID0gQ29weU9wdGlvbnM7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVhZEZpbGVSZXN1bHQge1xuICAvKipcbiAgICogVGhlIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBkYXRhIGNvbnRhaW5lZCBpbiB0aGUgZmlsZVxuICAgKlxuICAgKiBOb3RlOiBCbG9iIGlzIG9ubHkgYXZhaWxhYmxlIG9uIFdlYi4gT24gbmF0aXZlLCB0aGUgZGF0YSBpcyByZXR1cm5lZCBhcyBhIHN0cmluZy5cbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICBkYXRhOiBzdHJpbmcgfCBCbG9iO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFdyaXRlRmlsZVJlc3VsdCB7XG4gIC8qKlxuICAgKiBUaGUgdXJpIHdoZXJlIHRoZSBmaWxlIHdhcyB3cml0dGVuIGludG9cbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICB1cmk6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZWFkZGlyUmVzdWx0IHtcbiAgLyoqXG4gICAqIExpc3Qgb2YgZmlsZXMgYW5kIGRpcmVjdG9yaWVzIGluc2lkZSB0aGUgZGlyZWN0b3J5XG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgZmlsZXM6IEZpbGVJbmZvW107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmlsZUluZm8ge1xuICAvKipcbiAgICogTmFtZSBvZiB0aGUgZmlsZSBvciBkaXJlY3RvcnkuXG4gICAqXG4gICAqIEBzaW5jZSA3LjEuMFxuICAgKi9cbiAgbmFtZTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUeXBlIG9mIHRoZSBmaWxlLlxuICAgKlxuICAgKiBAc2luY2UgNC4wLjBcbiAgICovXG4gIHR5cGU6ICdkaXJlY3RvcnknIHwgJ2ZpbGUnO1xuXG4gIC8qKlxuICAgKiBTaXplIG9mIHRoZSBmaWxlIGluIGJ5dGVzLlxuICAgKlxuICAgKiBAc2luY2UgNC4wLjBcbiAgICovXG4gIHNpemU6IG51bWJlcjtcblxuICAvKipcbiAgICogVGltZSBvZiBjcmVhdGlvbiBpbiBtaWxsaXNlY29uZHMuXG4gICAqXG4gICAqIEl0J3Mgbm90IGF2YWlsYWJsZSBvbiBBbmRyb2lkIDcgYW5kIG9sZGVyIGRldmljZXMuXG4gICAqXG4gICAqIEBzaW5jZSA3LjEuMFxuICAgKi9cbiAgY3RpbWU/OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRpbWUgb2YgbGFzdCBtb2RpZmljYXRpb24gaW4gbWlsbGlzZWNvbmRzLlxuICAgKlxuICAgKiBAc2luY2UgNy4xLjBcbiAgICovXG4gIG10aW1lOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSB1cmkgb2YgdGhlIGZpbGUuXG4gICAqXG4gICAqIEBzaW5jZSA0LjAuMFxuICAgKi9cbiAgdXJpOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgR2V0VXJpUmVzdWx0IHtcbiAgLyoqXG4gICAqIFRoZSB1cmkgb2YgdGhlIGZpbGVcbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICB1cmk6IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgU3RhdFJlc3VsdCA9IEZpbGVJbmZvO1xuZXhwb3J0IGludGVyZmFjZSBDb3B5UmVzdWx0IHtcbiAgLyoqXG4gICAqIFRoZSB1cmkgd2hlcmUgdGhlIGZpbGUgd2FzIGNvcGllZCBpbnRvXG4gICAqXG4gICAqIEBzaW5jZSA0LjAuMFxuICAgKi9cbiAgdXJpOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRG93bmxvYWRGaWxlT3B0aW9ucyBleHRlbmRzIEh0dHBPcHRpb25zIHtcbiAgLyoqXG4gICAqIFRoZSBwYXRoIHRoZSBkb3dubG9hZGVkIGZpbGUgc2hvdWxkIGJlIG1vdmVkIHRvLlxuICAgKlxuICAgKiBAc2luY2UgNS4xLjBcbiAgICovXG4gIHBhdGg6IHN0cmluZztcbiAgLyoqXG4gICAqIFRoZSBkaXJlY3RvcnkgdG8gd3JpdGUgdGhlIGZpbGUgdG8uXG4gICAqIElmIHRoaXMgb3B0aW9uIGlzIHVzZWQsIGZpbGVQYXRoIGNhbiBiZSBhIHJlbGF0aXZlIHBhdGggcmF0aGVyIHRoYW4gYWJzb2x1dGUuXG4gICAqIFRoZSBkZWZhdWx0IGlzIHRoZSBgREFUQWAgZGlyZWN0b3J5LlxuICAgKlxuICAgKiBAc2luY2UgNS4xLjBcbiAgICovXG4gIGRpcmVjdG9yeT86IERpcmVjdG9yeTtcbiAgLyoqXG4gICAqIEFuIG9wdGlvbmFsIGxpc3RlbmVyIGZ1bmN0aW9uIHRvIHJlY2VpdmUgZG93bmxvYWRlZCBwcm9ncmVzcyBldmVudHMuXG4gICAqIElmIHRoaXMgb3B0aW9uIGlzIHVzZWQsIHByb2dyZXNzIGV2ZW50IHNob3VsZCBiZSBkaXNwYXRjaGVkIG9uIGV2ZXJ5IGNodW5rIHJlY2VpdmVkLlxuICAgKiBDaHVua3MgYXJlIHRocm90dGxlZCB0byBldmVyeSAxMDBtcyBvbiBBbmRyb2lkL2lPUyB0byBhdm9pZCBzbG93ZG93bnMuXG4gICAqXG4gICAqIEBzaW5jZSA1LjEuMFxuICAgKi9cbiAgcHJvZ3Jlc3M/OiBib29sZWFuO1xuICAvKipcbiAgICogV2hldGhlciB0byBjcmVhdGUgYW55IG1pc3NpbmcgcGFyZW50IGRpcmVjdG9yaWVzLlxuICAgKlxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKiBAc2luY2UgNS4xLjJcbiAgICovXG4gIHJlY3Vyc2l2ZT86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRG93bmxvYWRGaWxlUmVzdWx0IHtcbiAgLyoqXG4gICAqIFRoZSBwYXRoIHRoZSBmaWxlIHdhcyBkb3dubG9hZGVkIHRvLlxuICAgKlxuICAgKiBAc2luY2UgNS4xLjBcbiAgICovXG4gIHBhdGg/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUaGUgYmxvYiBkYXRhIG9mIHRoZSBkb3dubG9hZGVkIGZpbGUuXG4gICAqIFRoaXMgaXMgb25seSBhdmFpbGFibGUgb24gd2ViLlxuICAgKlxuICAgKiBAc2luY2UgNS4xLjBcbiAgICovXG4gIGJsb2I/OiBCbG9iO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFByb2dyZXNzU3RhdHVzIHtcbiAgLyoqXG4gICAqIFRoZSB1cmwgb2YgdGhlIGZpbGUgYmVpbmcgZG93bmxvYWRlZC5cbiAgICpcbiAgICogQHNpbmNlIDUuMS4wXG4gICAqL1xuICB1cmw6IHN0cmluZztcbiAgLyoqXG4gICAqIFRoZSBudW1iZXIgb2YgYnl0ZXMgZG93bmxvYWRlZCBzbyBmYXIuXG4gICAqXG4gICAqIEBzaW5jZSA1LjEuMFxuICAgKi9cbiAgYnl0ZXM6IG51bWJlcjtcbiAgLyoqXG4gICAqIFRoZSB0b3RhbCBudW1iZXIgb2YgYnl0ZXMgdG8gZG93bmxvYWQgZm9yIHRoaXMgZmlsZS5cbiAgICpcbiAgICogQHNpbmNlIDUuMS4wXG4gICAqL1xuICBjb250ZW50TGVuZ3RoOiBudW1iZXI7XG59XG5cbi8qKlxuICogQ2FsbGJhY2sgZm9yIHJlY2VpdmluZyBjaHVua3MgcmVhZCBmcm9tIGEgZmlsZSwgb3IgZXJyb3IgaWYgc29tZXRoaW5nIHdlbnQgd3JvbmcuXG4gKlxuICogQHNpbmNlIDcuMS4wXG4gKi9cbmV4cG9ydCB0eXBlIFJlYWRGaWxlSW5DaHVua3NDYWxsYmFjayA9IChjaHVua1JlYWQ6IFJlYWRGaWxlUmVzdWx0IHwgbnVsbCwgZXJyPzogYW55KSA9PiB2b2lkO1xuXG4vKipcbiAqIEEgbGlzdGVuZXIgZnVuY3Rpb24gdGhhdCByZWNlaXZlcyBwcm9ncmVzcyBldmVudHMuXG4gKlxuICogQHNpbmNlIDUuMS4wXG4gKi9cbmV4cG9ydCB0eXBlIFByb2dyZXNzTGlzdGVuZXIgPSAocHJvZ3Jlc3M6IFByb2dyZXNzU3RhdHVzKSA9PiB2b2lkO1xuXG5leHBvcnQgaW50ZXJmYWNlIEZpbGVzeXN0ZW1QbHVnaW4ge1xuICAvKipcbiAgICogQ2hlY2sgcmVhZC93cml0ZSBwZXJtaXNzaW9ucy5cbiAgICogUmVxdWlyZWQgb24gQW5kcm9pZCwgb25seSB3aGVuIHVzaW5nIGBEaXJlY3RvcnkuRG9jdW1lbnRzYCBvclxuICAgKiBgRGlyZWN0b3J5LkV4dGVybmFsU3RvcmFnZWAuXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgY2hlY2tQZXJtaXNzaW9ucygpOiBQcm9taXNlPFBlcm1pc3Npb25TdGF0dXM+O1xuXG4gIC8qKlxuICAgKiBSZXF1ZXN0IHJlYWQvd3JpdGUgcGVybWlzc2lvbnMuXG4gICAqIFJlcXVpcmVkIG9uIEFuZHJvaWQsIG9ubHkgd2hlbiB1c2luZyBgRGlyZWN0b3J5LkRvY3VtZW50c2Agb3JcbiAgICogYERpcmVjdG9yeS5FeHRlcm5hbFN0b3JhZ2VgLlxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIHJlcXVlc3RQZXJtaXNzaW9ucygpOiBQcm9taXNlPFBlcm1pc3Npb25TdGF0dXM+O1xuXG4gIC8qKlxuICAgKiBSZWFkIGEgZmlsZSBmcm9tIGRpc2tcbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICByZWFkRmlsZShvcHRpb25zOiBSZWFkRmlsZU9wdGlvbnMpOiBQcm9taXNlPFJlYWRGaWxlUmVzdWx0PjtcblxuICAvKipcbiAgICogUmVhZCBhIGZpbGUgZnJvbSBkaXNrLCBpbiBjaHVua3MuXG4gICAqIE5hdGl2ZSBvbmx5IChub3QgYXZhaWxhYmxlIGluIHdlYikuXG4gICAqIFVzZSB0aGUgY2FsbGJhY2sgdG8gcmVjZWl2ZSBlYWNoIHJlYWQgY2h1bmsuXG4gICAqIElmIGVtcHR5IGNodW5rIGlzIHJldHVybmVkLCBpdCBtZWFucyBmaWxlIGhhcyBiZWVuIGNvbXBsZXRlbHkgcmVhZC5cbiAgICpcbiAgICogQHNpbmNlIDcuMS4wXG4gICAqL1xuICByZWFkRmlsZUluQ2h1bmtzKG9wdGlvbnM6IFJlYWRGaWxlSW5DaHVua3NPcHRpb25zLCBjYWxsYmFjazogUmVhZEZpbGVJbkNodW5rc0NhbGxiYWNrKTogUHJvbWlzZTxDYWxsYmFja0lEPjtcblxuICAvKipcbiAgICogV3JpdGUgYSBmaWxlIHRvIGRpc2sgaW4gdGhlIHNwZWNpZmllZCBsb2NhdGlvbiBvbiBkZXZpY2VcbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICB3cml0ZUZpbGUob3B0aW9uczogV3JpdGVGaWxlT3B0aW9ucyk6IFByb21pc2U8V3JpdGVGaWxlUmVzdWx0PjtcblxuICAvKipcbiAgICogQXBwZW5kIHRvIGEgZmlsZSBvbiBkaXNrIGluIHRoZSBzcGVjaWZpZWQgbG9jYXRpb24gb24gZGV2aWNlXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgYXBwZW5kRmlsZShvcHRpb25zOiBBcHBlbmRGaWxlT3B0aW9ucyk6IFByb21pc2U8dm9pZD47XG5cbiAgLyoqXG4gICAqIERlbGV0ZSBhIGZpbGUgZnJvbSBkaXNrXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgZGVsZXRlRmlsZShvcHRpb25zOiBEZWxldGVGaWxlT3B0aW9ucyk6IFByb21pc2U8dm9pZD47XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIGRpcmVjdG9yeS5cbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICBta2RpcihvcHRpb25zOiBNa2Rpck9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+O1xuXG4gIC8qKlxuICAgKiBSZW1vdmUgYSBkaXJlY3RvcnlcbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICBybWRpcihvcHRpb25zOiBSbWRpck9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+O1xuXG4gIC8qKlxuICAgKiBSZXR1cm4gYSBsaXN0IG9mIGZpbGVzIGZyb20gdGhlIGRpcmVjdG9yeSAobm90IHJlY3Vyc2l2ZSlcbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICByZWFkZGlyKG9wdGlvbnM6IFJlYWRkaXJPcHRpb25zKTogUHJvbWlzZTxSZWFkZGlyUmVzdWx0PjtcblxuICAvKipcbiAgICogUmV0dXJuIGZ1bGwgRmlsZSBVUkkgZm9yIGEgcGF0aCBhbmQgZGlyZWN0b3J5XG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgZ2V0VXJpKG9wdGlvbnM6IEdldFVyaU9wdGlvbnMpOiBQcm9taXNlPEdldFVyaVJlc3VsdD47XG5cbiAgLyoqXG4gICAqIFJldHVybiBkYXRhIGFib3V0IGEgZmlsZVxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIHN0YXQob3B0aW9uczogU3RhdE9wdGlvbnMpOiBQcm9taXNlPFN0YXRSZXN1bHQ+O1xuXG4gIC8qKlxuICAgKiBSZW5hbWUgYSBmaWxlIG9yIGRpcmVjdG9yeVxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIHJlbmFtZShvcHRpb25zOiBSZW5hbWVPcHRpb25zKTogUHJvbWlzZTx2b2lkPjtcblxuICAvKipcbiAgICogQ29weSBhIGZpbGUgb3IgZGlyZWN0b3J5XG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgY29weShvcHRpb25zOiBDb3B5T3B0aW9ucyk6IFByb21pc2U8Q29weVJlc3VsdD47XG5cbiAgLyoqXG4gICAqIFBlcmZvcm0gYSBodHRwIHJlcXVlc3QgdG8gYSBzZXJ2ZXIgYW5kIGRvd25sb2FkIHRoZSBmaWxlIHRvIHRoZSBzcGVjaWZpZWQgZGVzdGluYXRpb24uXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGhhcyBiZWVuIGRlcHJlY2F0ZWQgc2luY2UgdmVyc2lvbiA3LjEuMC5cbiAgICogV2UgcmVjb21tZW5kIHVzaW5nIHRoZSBAY2FwYWNpdG9yL2ZpbGUtdHJhbnNmZXIgcGx1Z2luIGluc3RlYWQsIGluIGNvbmp1bmN0aW9uIHdpdGggdGhpcyBwbHVnaW4uXG4gICAqXG4gICAqIEBzaW5jZSA1LjEuMFxuICAgKiBAZGVwcmVjYXRlZCBVc2UgdGhlIEBjYXBhY2l0b3IvZmlsZS10cmFuc2ZlciBwbHVnaW4gaW5zdGVhZC5cbiAgICovXG4gIGRvd25sb2FkRmlsZShvcHRpb25zOiBEb3dubG9hZEZpbGVPcHRpb25zKTogUHJvbWlzZTxEb3dubG9hZEZpbGVSZXN1bHQ+O1xuXG4gIC8qKlxuICAgKiBBZGQgYSBsaXN0ZW5lciB0byBmaWxlIGRvd25sb2FkIHByb2dyZXNzIGV2ZW50cy5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgaGFzIGJlZW4gZGVwcmVjYXRlZCBzaW5jZSB2ZXJzaW9uIDcuMS4wLlxuICAgKiBXZSByZWNvbW1lbmQgdXNpbmcgdGhlIEBjYXBhY2l0b3IvZmlsZS10cmFuc2ZlciBwbHVnaW4gaW5zdGVhZCwgaW4gY29uanVuY3Rpb24gd2l0aCB0aGlzIHBsdWdpbi5cbiAgICpcbiAgICogQHNpbmNlIDUuMS4wXG4gICAqIEBkZXByZWNhdGVkIFVzZSB0aGUgQGNhcGFjaXRvci9maWxlLXRyYW5zZmVyIHBsdWdpbiBpbnN0ZWFkLlxuICAgKi9cbiAgYWRkTGlzdGVuZXIoZXZlbnROYW1lOiAncHJvZ3Jlc3MnLCBsaXN0ZW5lckZ1bmM6IFByb2dyZXNzTGlzdGVuZXIpOiBQcm9taXNlPFBsdWdpbkxpc3RlbmVySGFuZGxlPjtcblxuICAvKipcbiAgICogUmVtb3ZlIGFsbCBsaXN0ZW5lcnMgZm9yIHRoaXMgcGx1Z2luLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBoYXMgYmVlbiBkZXByZWNhdGVkIHNpbmNlIHZlcnNpb24gNy4xLjAuXG4gICAqIFdlIHJlY29tbWVuZCB1c2luZyB0aGUgQGNhcGFjaXRvci9maWxlLXRyYW5zZmVyIHBsdWdpbiBpbnN0ZWFkLCBpbiBjb25qdW5jdGlvbiB3aXRoIHRoaXMgcGx1Z2luLlxuICAgKlxuICAgKiBAc2luY2UgNS4yLjBcbiAgICogQGRlcHJlY2F0ZWQgVXNlIHRoZSBAY2FwYWNpdG9yL2ZpbGUtdHJhbnNmZXIgcGx1Z2luIGluc3RlYWQuXG4gICAqL1xuICByZW1vdmVBbGxMaXN0ZW5lcnMoKTogUHJvbWlzZTx2b2lkPjtcbn1cblxuLyoqXG4gKiBTdHJ1Y3R1cmUgZm9yIGVycm9ycyByZXR1cm5lZCBieSB0aGUgcGx1Z2luLlxuICpcbiAqIGBjb2RlYCBmb2xsb3dzIFwiT1MtUExVRy1GSUxFLVhYWFhcIiBmb3JtYXRcbiAqXG4gKiBAc2luY2UgMS4wLjBcbiAqL1xuZXhwb3J0IHR5cGUgUGx1Z2luRXJyb3IgPSB7XG4gIGNvZGU6IHN0cmluZztcbiAgbWVzc2FnZTogc3RyaW5nO1xufTtcblxuLyoqXG4gKiBAZGVwcmVjYXRlZCBVc2UgYFJlYWRGaWxlT3B0aW9uc2AuXG4gKiBAc2luY2UgMS4wLjBcbiAqL1xuZXhwb3J0IHR5cGUgRmlsZVJlYWRPcHRpb25zID0gUmVhZEZpbGVPcHRpb25zO1xuXG4vKipcbiAqIEBkZXByZWNhdGVkIFVzZSBgUmVhZEZpbGVSZXN1bHRgLlxuICogQHNpbmNlIDEuMC4wXG4gKi9cbmV4cG9ydCB0eXBlIEZpbGVSZWFkUmVzdWx0ID0gUmVhZEZpbGVSZXN1bHQ7XG5cbi8qKlxuICogQGRlcHJlY2F0ZWQgVXNlIGBXcml0ZUZpbGVPcHRpb25zYC5cbiAqIEBzaW5jZSAxLjAuMFxuICovXG5leHBvcnQgdHlwZSBGaWxlV3JpdGVPcHRpb25zID0gV3JpdGVGaWxlT3B0aW9ucztcblxuLyoqXG4gKiBAZGVwcmVjYXRlZCBVc2UgYFdyaXRlRmlsZVJlc3VsdGAuXG4gKiBAc2luY2UgMS4wLjBcbiAqL1xuZXhwb3J0IHR5cGUgRmlsZVdyaXRlUmVzdWx0ID0gV3JpdGVGaWxlUmVzdWx0O1xuXG4vKipcbiAqIEBkZXByZWNhdGVkIFVzZSBgQXBwZW5kRmlsZU9wdGlvbnNgLlxuICogQHNpbmNlIDEuMC4wXG4gKi9cbmV4cG9ydCB0eXBlIEZpbGVBcHBlbmRPcHRpb25zID0gQXBwZW5kRmlsZU9wdGlvbnM7XG5cbi8qKlxuICogQGRlcHJlY2F0ZWQgVXNlIGBEZWxldGVGaWxlT3B0aW9uc2AuXG4gKiBAc2luY2UgMS4wLjBcbiAqL1xuZXhwb3J0IHR5cGUgRmlsZURlbGV0ZU9wdGlvbnMgPSBEZWxldGVGaWxlT3B0aW9ucztcblxuLyoqXG4gKiBAZGVwcmVjYXRlZCBVc2UgYERpcmVjdG9yeWAuXG4gKiBAc2luY2UgMS4wLjBcbiAqL1xuZXhwb3J0IGNvbnN0IEZpbGVzeXN0ZW1EaXJlY3RvcnkgPSBEaXJlY3Rvcnk7XG5cbi8qKlxuICogQGRlcHJlY2F0ZWQgVXNlIGBFbmNvZGluZ2AuXG4gKiBAc2luY2UgMS4wLjBcbiAqL1xuZXhwb3J0IGNvbnN0IEZpbGVzeXN0ZW1FbmNvZGluZyA9IEVuY29kaW5nO1xuIiwgImltcG9ydCB7IFdlYlBsdWdpbiwgYnVpbGRSZXF1ZXN0SW5pdCB9IGZyb20gJ0BjYXBhY2l0b3IvY29yZSc7XG5cbmltcG9ydCB0eXBlIHtcbiAgQXBwZW5kRmlsZU9wdGlvbnMsXG4gIENvcHlPcHRpb25zLFxuICBDb3B5UmVzdWx0LFxuICBEZWxldGVGaWxlT3B0aW9ucyxcbiAgRmlsZXN5c3RlbVBsdWdpbixcbiAgR2V0VXJpT3B0aW9ucyxcbiAgR2V0VXJpUmVzdWx0LFxuICBNa2Rpck9wdGlvbnMsXG4gIFBlcm1pc3Npb25TdGF0dXMsXG4gIFJlYWRGaWxlT3B0aW9ucyxcbiAgUmVhZEZpbGVSZXN1bHQsXG4gIFJlYWRkaXJPcHRpb25zLFxuICBSZWFkZGlyUmVzdWx0LFxuICBSZW5hbWVPcHRpb25zLFxuICBSbWRpck9wdGlvbnMsXG4gIFN0YXRPcHRpb25zLFxuICBTdGF0UmVzdWx0LFxuICBXcml0ZUZpbGVPcHRpb25zLFxuICBXcml0ZUZpbGVSZXN1bHQsXG4gIERpcmVjdG9yeSxcbiAgUmVhZEZpbGVJbkNodW5rc09wdGlvbnMsXG4gIENhbGxiYWNrSUQsXG4gIERvd25sb2FkRmlsZU9wdGlvbnMsXG4gIERvd25sb2FkRmlsZVJlc3VsdCxcbiAgUHJvZ3Jlc3NTdGF0dXMsXG4gIFJlYWRGaWxlSW5DaHVua3NDYWxsYmFjayxcbn0gZnJvbSAnLi9kZWZpbml0aW9ucyc7XG5pbXBvcnQgeyBFbmNvZGluZyB9IGZyb20gJy4vZGVmaW5pdGlvbnMnO1xuXG5mdW5jdGlvbiByZXNvbHZlKHBhdGg6IHN0cmluZyk6IHN0cmluZyB7XG4gIGNvbnN0IHBvc2l4ID0gcGF0aC5zcGxpdCgnLycpLmZpbHRlcigoaXRlbSkgPT4gaXRlbSAhPT0gJy4nKTtcbiAgY29uc3QgbmV3UG9zaXg6IHN0cmluZ1tdID0gW107XG5cbiAgcG9zaXguZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgIGlmIChpdGVtID09PSAnLi4nICYmIG5ld1Bvc2l4Lmxlbmd0aCA+IDAgJiYgbmV3UG9zaXhbbmV3UG9zaXgubGVuZ3RoIC0gMV0gIT09ICcuLicpIHtcbiAgICAgIG5ld1Bvc2l4LnBvcCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXdQb3NpeC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIG5ld1Bvc2l4LmpvaW4oJy8nKTtcbn1cbmZ1bmN0aW9uIGlzUGF0aFBhcmVudChwYXJlbnQ6IHN0cmluZywgY2hpbGRyZW46IHN0cmluZyk6IGJvb2xlYW4ge1xuICBwYXJlbnQgPSByZXNvbHZlKHBhcmVudCk7XG4gIGNoaWxkcmVuID0gcmVzb2x2ZShjaGlsZHJlbik7XG4gIGNvbnN0IHBhdGhzQSA9IHBhcmVudC5zcGxpdCgnLycpO1xuICBjb25zdCBwYXRoc0IgPSBjaGlsZHJlbi5zcGxpdCgnLycpO1xuXG4gIHJldHVybiBwYXJlbnQgIT09IGNoaWxkcmVuICYmIHBhdGhzQS5ldmVyeSgodmFsdWUsIGluZGV4KSA9PiB2YWx1ZSA9PT0gcGF0aHNCW2luZGV4XSk7XG59XG5cbmV4cG9ydCBjbGFzcyBGaWxlc3lzdGVtV2ViIGV4dGVuZHMgV2ViUGx1Z2luIGltcGxlbWVudHMgRmlsZXN5c3RlbVBsdWdpbiB7XG4gIHJlYWRGaWxlSW5DaHVua3MoX29wdGlvbnM6IFJlYWRGaWxlSW5DaHVua3NPcHRpb25zLCBfY2FsbGJhY2s6IFJlYWRGaWxlSW5DaHVua3NDYWxsYmFjayk6IFByb21pc2U8Q2FsbGJhY2tJRD4ge1xuICAgIHRocm93IHRoaXMudW5hdmFpbGFibGUoJ01ldGhvZCBub3QgaW1wbGVtZW50ZWQuJyk7XG4gIH1cbiAgREJfVkVSU0lPTiA9IDE7XG4gIERCX05BTUUgPSAnRGlzYyc7XG5cbiAgcHJpdmF0ZSBfd3JpdGVDbWRzOiBzdHJpbmdbXSA9IFsnYWRkJywgJ3B1dCcsICdkZWxldGUnXTtcbiAgcHJpdmF0ZSBfZGI/OiBJREJEYXRhYmFzZTtcbiAgc3RhdGljIF9kZWJ1ZyA9IHRydWU7XG4gIGFzeW5jIGluaXREYigpOiBQcm9taXNlPElEQkRhdGFiYXNlPiB7XG4gICAgaWYgKHRoaXMuX2RiICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLl9kYjtcbiAgICB9XG4gICAgaWYgKCEoJ2luZGV4ZWREQicgaW4gd2luZG93KSkge1xuICAgICAgdGhyb3cgdGhpcy51bmF2YWlsYWJsZShcIlRoaXMgYnJvd3NlciBkb2Vzbid0IHN1cHBvcnQgSW5kZXhlZERCXCIpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxJREJEYXRhYmFzZT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgcmVxdWVzdCA9IGluZGV4ZWREQi5vcGVuKHRoaXMuREJfTkFNRSwgdGhpcy5EQl9WRVJTSU9OKTtcbiAgICAgIHJlcXVlc3Qub251cGdyYWRlbmVlZGVkID0gRmlsZXN5c3RlbVdlYi5kb1VwZ3JhZGU7XG4gICAgICByZXF1ZXN0Lm9uc3VjY2VzcyA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5fZGIgPSByZXF1ZXN0LnJlc3VsdDtcbiAgICAgICAgcmVzb2x2ZShyZXF1ZXN0LnJlc3VsdCk7XG4gICAgICB9O1xuICAgICAgcmVxdWVzdC5vbmVycm9yID0gKCkgPT4gcmVqZWN0KHJlcXVlc3QuZXJyb3IpO1xuICAgICAgcmVxdWVzdC5vbmJsb2NrZWQgPSAoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUud2FybignZGIgYmxvY2tlZCcpO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBkb1VwZ3JhZGUoZXZlbnQ6IElEQlZlcnNpb25DaGFuZ2VFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IGV2ZW50VGFyZ2V0ID0gZXZlbnQudGFyZ2V0IGFzIElEQk9wZW5EQlJlcXVlc3Q7XG4gICAgY29uc3QgZGIgPSBldmVudFRhcmdldC5yZXN1bHQ7XG4gICAgc3dpdGNoIChldmVudC5vbGRWZXJzaW9uKSB7XG4gICAgICBjYXNlIDA6XG4gICAgICBjYXNlIDE6XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIGlmIChkYi5vYmplY3RTdG9yZU5hbWVzLmNvbnRhaW5zKCdGaWxlU3RvcmFnZScpKSB7XG4gICAgICAgICAgZGIuZGVsZXRlT2JqZWN0U3RvcmUoJ0ZpbGVTdG9yYWdlJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc3RvcmUgPSBkYi5jcmVhdGVPYmplY3RTdG9yZSgnRmlsZVN0b3JhZ2UnLCB7IGtleVBhdGg6ICdwYXRoJyB9KTtcbiAgICAgICAgc3RvcmUuY3JlYXRlSW5kZXgoJ2J5X2ZvbGRlcicsICdmb2xkZXInKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhc3luYyBkYlJlcXVlc3QoY21kOiBzdHJpbmcsIGFyZ3M6IGFueVtdKTogUHJvbWlzZTxhbnk+IHtcbiAgICBjb25zdCByZWFkRmxhZyA9IHRoaXMuX3dyaXRlQ21kcy5pbmRleE9mKGNtZCkgIT09IC0xID8gJ3JlYWR3cml0ZScgOiAncmVhZG9ubHknO1xuICAgIHJldHVybiB0aGlzLmluaXREYigpLnRoZW4oKGNvbm46IElEQkRhdGFiYXNlKSA9PiB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2U8SURCT2JqZWN0U3RvcmU+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgY29uc3QgdHg6IElEQlRyYW5zYWN0aW9uID0gY29ubi50cmFuc2FjdGlvbihbJ0ZpbGVTdG9yYWdlJ10sIHJlYWRGbGFnKTtcbiAgICAgICAgY29uc3Qgc3RvcmU6IGFueSA9IHR4Lm9iamVjdFN0b3JlKCdGaWxlU3RvcmFnZScpO1xuICAgICAgICBjb25zdCByZXEgPSBzdG9yZVtjbWRdKC4uLmFyZ3MpO1xuICAgICAgICByZXEub25zdWNjZXNzID0gKCkgPT4gcmVzb2x2ZShyZXEucmVzdWx0KTtcbiAgICAgICAgcmVxLm9uZXJyb3IgPSAoKSA9PiByZWplY3QocmVxLmVycm9yKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgZGJJbmRleFJlcXVlc3QoaW5kZXhOYW1lOiBzdHJpbmcsIGNtZDogc3RyaW5nLCBhcmdzOiBbYW55XSk6IFByb21pc2U8YW55PiB7XG4gICAgY29uc3QgcmVhZEZsYWcgPSB0aGlzLl93cml0ZUNtZHMuaW5kZXhPZihjbWQpICE9PSAtMSA/ICdyZWFkd3JpdGUnIDogJ3JlYWRvbmx5JztcbiAgICByZXR1cm4gdGhpcy5pbml0RGIoKS50aGVuKChjb25uOiBJREJEYXRhYmFzZSkgPT4ge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPElEQk9iamVjdFN0b3JlPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGNvbnN0IHR4OiBJREJUcmFuc2FjdGlvbiA9IGNvbm4udHJhbnNhY3Rpb24oWydGaWxlU3RvcmFnZSddLCByZWFkRmxhZyk7XG4gICAgICAgIGNvbnN0IHN0b3JlOiBJREJPYmplY3RTdG9yZSA9IHR4Lm9iamVjdFN0b3JlKCdGaWxlU3RvcmFnZScpO1xuICAgICAgICBjb25zdCBpbmRleDogYW55ID0gc3RvcmUuaW5kZXgoaW5kZXhOYW1lKTtcbiAgICAgICAgY29uc3QgcmVxID0gaW5kZXhbY21kXSguLi5hcmdzKSBhcyBhbnk7XG4gICAgICAgIHJlcS5vbnN1Y2Nlc3MgPSAoKSA9PiByZXNvbHZlKHJlcS5yZXN1bHQpO1xuICAgICAgICByZXEub25lcnJvciA9ICgpID0+IHJlamVjdChyZXEuZXJyb3IpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGdldFBhdGgoZGlyZWN0b3J5OiBEaXJlY3RvcnkgfCB1bmRlZmluZWQsIHVyaVBhdGg6IHN0cmluZyB8IHVuZGVmaW5lZCk6IHN0cmluZyB7XG4gICAgY29uc3QgY2xlYW5lZFVyaVBhdGggPSB1cmlQYXRoICE9PSB1bmRlZmluZWQgPyB1cmlQYXRoLnJlcGxhY2UoL15bL10rfFsvXSskL2csICcnKSA6ICcnO1xuICAgIGxldCBmc1BhdGggPSAnJztcbiAgICBpZiAoZGlyZWN0b3J5ICE9PSB1bmRlZmluZWQpIGZzUGF0aCArPSAnLycgKyBkaXJlY3Rvcnk7XG4gICAgaWYgKHVyaVBhdGggIT09ICcnKSBmc1BhdGggKz0gJy8nICsgY2xlYW5lZFVyaVBhdGg7XG4gICAgcmV0dXJuIGZzUGF0aDtcbiAgfVxuXG4gIGFzeW5jIGNsZWFyKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGNvbm46IElEQkRhdGFiYXNlID0gYXdhaXQgdGhpcy5pbml0RGIoKTtcbiAgICBjb25zdCB0eDogSURCVHJhbnNhY3Rpb24gPSBjb25uLnRyYW5zYWN0aW9uKFsnRmlsZVN0b3JhZ2UnXSwgJ3JlYWR3cml0ZScpO1xuICAgIGNvbnN0IHN0b3JlOiBJREJPYmplY3RTdG9yZSA9IHR4Lm9iamVjdFN0b3JlKCdGaWxlU3RvcmFnZScpO1xuICAgIHN0b3JlLmNsZWFyKCk7XG4gIH1cblxuICAvKipcbiAgICogUmVhZCBhIGZpbGUgZnJvbSBkaXNrXG4gICAqIEBwYXJhbSBvcHRpb25zIG9wdGlvbnMgZm9yIHRoZSBmaWxlIHJlYWRcbiAgICogQHJldHVybiBhIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSByZWFkIGZpbGUgZGF0YSByZXN1bHRcbiAgICovXG4gIGFzeW5jIHJlYWRGaWxlKG9wdGlvbnM6IFJlYWRGaWxlT3B0aW9ucyk6IFByb21pc2U8UmVhZEZpbGVSZXN1bHQ+IHtcbiAgICBjb25zdCBwYXRoOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgob3B0aW9ucy5kaXJlY3RvcnksIG9wdGlvbnMucGF0aCk7XG4gICAgLy8gY29uc3QgZW5jb2RpbmcgPSBvcHRpb25zLmVuY29kaW5nO1xuXG4gICAgY29uc3QgZW50cnkgPSAoYXdhaXQgdGhpcy5kYlJlcXVlc3QoJ2dldCcsIFtwYXRoXSkpIGFzIEVudHJ5T2JqO1xuICAgIGlmIChlbnRyeSA9PT0gdW5kZWZpbmVkKSB0aHJvdyBFcnJvcignRmlsZSBkb2VzIG5vdCBleGlzdC4nKTtcbiAgICByZXR1cm4geyBkYXRhOiBlbnRyeS5jb250ZW50ID8gZW50cnkuY29udGVudCA6ICcnIH07XG4gIH1cblxuICAvKipcbiAgICogV3JpdGUgYSBmaWxlIHRvIGRpc2sgaW4gdGhlIHNwZWNpZmllZCBsb2NhdGlvbiBvbiBkZXZpY2VcbiAgICogQHBhcmFtIG9wdGlvbnMgb3B0aW9ucyBmb3IgdGhlIGZpbGUgd3JpdGVcbiAgICogQHJldHVybiBhIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBmaWxlIHdyaXRlIHJlc3VsdFxuICAgKi9cbiAgYXN5bmMgd3JpdGVGaWxlKG9wdGlvbnM6IFdyaXRlRmlsZU9wdGlvbnMpOiBQcm9taXNlPFdyaXRlRmlsZVJlc3VsdD4ge1xuICAgIGNvbnN0IHBhdGg6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aChvcHRpb25zLmRpcmVjdG9yeSwgb3B0aW9ucy5wYXRoKTtcbiAgICBsZXQgZGF0YSA9IG9wdGlvbnMuZGF0YTtcbiAgICBjb25zdCBlbmNvZGluZyA9IG9wdGlvbnMuZW5jb2Rpbmc7XG4gICAgY29uc3QgZG9SZWN1cnNpdmUgPSBvcHRpb25zLnJlY3Vyc2l2ZTtcblxuICAgIGNvbnN0IG9jY3VwaWVkRW50cnkgPSAoYXdhaXQgdGhpcy5kYlJlcXVlc3QoJ2dldCcsIFtwYXRoXSkpIGFzIEVudHJ5T2JqO1xuICAgIGlmIChvY2N1cGllZEVudHJ5ICYmIG9jY3VwaWVkRW50cnkudHlwZSA9PT0gJ2RpcmVjdG9yeScpIHRocm93IEVycm9yKCdUaGUgc3VwcGxpZWQgcGF0aCBpcyBhIGRpcmVjdG9yeS4nKTtcblxuICAgIGNvbnN0IHBhcmVudFBhdGggPSBwYXRoLnN1YnN0cigwLCBwYXRoLmxhc3RJbmRleE9mKCcvJykpO1xuXG4gICAgY29uc3QgcGFyZW50RW50cnkgPSAoYXdhaXQgdGhpcy5kYlJlcXVlc3QoJ2dldCcsIFtwYXJlbnRQYXRoXSkpIGFzIEVudHJ5T2JqO1xuICAgIGlmIChwYXJlbnRFbnRyeSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zdCBzdWJEaXJJbmRleCA9IHBhcmVudFBhdGguaW5kZXhPZignLycsIDEpO1xuICAgICAgaWYgKHN1YkRpckluZGV4ICE9PSAtMSkge1xuICAgICAgICBjb25zdCBwYXJlbnRBcmdQYXRoID0gcGFyZW50UGF0aC5zdWJzdHIoc3ViRGlySW5kZXgpO1xuICAgICAgICBhd2FpdCB0aGlzLm1rZGlyKHtcbiAgICAgICAgICBwYXRoOiBwYXJlbnRBcmdQYXRoLFxuICAgICAgICAgIGRpcmVjdG9yeTogb3B0aW9ucy5kaXJlY3RvcnksXG4gICAgICAgICAgcmVjdXJzaXZlOiBkb1JlY3Vyc2l2ZSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFlbmNvZGluZyAmJiAhKGRhdGEgaW5zdGFuY2VvZiBCbG9iKSkge1xuICAgICAgZGF0YSA9IGRhdGEuaW5kZXhPZignLCcpID49IDAgPyBkYXRhLnNwbGl0KCcsJylbMV0gOiBkYXRhO1xuICAgICAgaWYgKCF0aGlzLmlzQmFzZTY0U3RyaW5nKGRhdGEpKSB0aHJvdyBFcnJvcignVGhlIHN1cHBsaWVkIGRhdGEgaXMgbm90IHZhbGlkIGJhc2U2NCBjb250ZW50LicpO1xuICAgIH1cblxuICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgY29uc3QgcGF0aE9iajogRW50cnlPYmogPSB7XG4gICAgICBwYXRoOiBwYXRoLFxuICAgICAgZm9sZGVyOiBwYXJlbnRQYXRoLFxuICAgICAgdHlwZTogJ2ZpbGUnLFxuICAgICAgc2l6ZTogZGF0YSBpbnN0YW5jZW9mIEJsb2IgPyBkYXRhLnNpemUgOiBkYXRhLmxlbmd0aCxcbiAgICAgIGN0aW1lOiBub3csXG4gICAgICBtdGltZTogbm93LFxuICAgICAgY29udGVudDogZGF0YSxcbiAgICB9O1xuICAgIGF3YWl0IHRoaXMuZGJSZXF1ZXN0KCdwdXQnLCBbcGF0aE9ial0pO1xuICAgIHJldHVybiB7XG4gICAgICB1cmk6IHBhdGhPYmoucGF0aCxcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGVuZCB0byBhIGZpbGUgb24gZGlzayBpbiB0aGUgc3BlY2lmaWVkIGxvY2F0aW9uIG9uIGRldmljZVxuICAgKiBAcGFyYW0gb3B0aW9ucyBvcHRpb25zIGZvciB0aGUgZmlsZSBhcHBlbmRcbiAgICogQHJldHVybiBhIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBmaWxlIHdyaXRlIHJlc3VsdFxuICAgKi9cbiAgYXN5bmMgYXBwZW5kRmlsZShvcHRpb25zOiBBcHBlbmRGaWxlT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHBhdGg6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aChvcHRpb25zLmRpcmVjdG9yeSwgb3B0aW9ucy5wYXRoKTtcbiAgICBsZXQgZGF0YSA9IG9wdGlvbnMuZGF0YTtcbiAgICBjb25zdCBlbmNvZGluZyA9IG9wdGlvbnMuZW5jb2Rpbmc7XG4gICAgY29uc3QgcGFyZW50UGF0aCA9IHBhdGguc3Vic3RyKDAsIHBhdGgubGFzdEluZGV4T2YoJy8nKSk7XG5cbiAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgIGxldCBjdGltZSA9IG5vdztcblxuICAgIGNvbnN0IG9jY3VwaWVkRW50cnkgPSAoYXdhaXQgdGhpcy5kYlJlcXVlc3QoJ2dldCcsIFtwYXRoXSkpIGFzIEVudHJ5T2JqO1xuICAgIGlmIChvY2N1cGllZEVudHJ5ICYmIG9jY3VwaWVkRW50cnkudHlwZSA9PT0gJ2RpcmVjdG9yeScpIHRocm93IEVycm9yKCdUaGUgc3VwcGxpZWQgcGF0aCBpcyBhIGRpcmVjdG9yeS4nKTtcblxuICAgIGNvbnN0IHBhcmVudEVudHJ5ID0gKGF3YWl0IHRoaXMuZGJSZXF1ZXN0KCdnZXQnLCBbcGFyZW50UGF0aF0pKSBhcyBFbnRyeU9iajtcbiAgICBpZiAocGFyZW50RW50cnkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc3Qgc3ViRGlySW5kZXggPSBwYXJlbnRQYXRoLmluZGV4T2YoJy8nLCAxKTtcbiAgICAgIGlmIChzdWJEaXJJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgY29uc3QgcGFyZW50QXJnUGF0aCA9IHBhcmVudFBhdGguc3Vic3RyKHN1YkRpckluZGV4KTtcbiAgICAgICAgYXdhaXQgdGhpcy5ta2Rpcih7XG4gICAgICAgICAgcGF0aDogcGFyZW50QXJnUGF0aCxcbiAgICAgICAgICBkaXJlY3Rvcnk6IG9wdGlvbnMuZGlyZWN0b3J5LFxuICAgICAgICAgIHJlY3Vyc2l2ZTogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFlbmNvZGluZyAmJiAhdGhpcy5pc0Jhc2U2NFN0cmluZyhkYXRhKSkgdGhyb3cgRXJyb3IoJ1RoZSBzdXBwbGllZCBkYXRhIGlzIG5vdCB2YWxpZCBiYXNlNjQgY29udGVudC4nKTtcblxuICAgIGlmIChvY2N1cGllZEVudHJ5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmIChvY2N1cGllZEVudHJ5LmNvbnRlbnQgaW5zdGFuY2VvZiBCbG9iKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdUaGUgb2NjdXBpZWQgZW50cnkgY29udGFpbnMgYSBCbG9iIG9iamVjdCB3aGljaCBjYW5ub3QgYmUgYXBwZW5kZWQgdG8uJyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChvY2N1cGllZEVudHJ5LmNvbnRlbnQgIT09IHVuZGVmaW5lZCAmJiAhZW5jb2RpbmcpIHtcbiAgICAgICAgZGF0YSA9IGJ0b2EoYXRvYihvY2N1cGllZEVudHJ5LmNvbnRlbnQpICsgYXRvYihkYXRhKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkYXRhID0gb2NjdXBpZWRFbnRyeS5jb250ZW50ICsgZGF0YTtcbiAgICAgIH1cbiAgICAgIGN0aW1lID0gb2NjdXBpZWRFbnRyeS5jdGltZTtcbiAgICB9XG4gICAgY29uc3QgcGF0aE9iajogRW50cnlPYmogPSB7XG4gICAgICBwYXRoOiBwYXRoLFxuICAgICAgZm9sZGVyOiBwYXJlbnRQYXRoLFxuICAgICAgdHlwZTogJ2ZpbGUnLFxuICAgICAgc2l6ZTogZGF0YS5sZW5ndGgsXG4gICAgICBjdGltZTogY3RpbWUsXG4gICAgICBtdGltZTogbm93LFxuICAgICAgY29udGVudDogZGF0YSxcbiAgICB9O1xuICAgIGF3YWl0IHRoaXMuZGJSZXF1ZXN0KCdwdXQnLCBbcGF0aE9ial0pO1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZSBhIGZpbGUgZnJvbSBkaXNrXG4gICAqIEBwYXJhbSBvcHRpb25zIG9wdGlvbnMgZm9yIHRoZSBmaWxlIGRlbGV0ZVxuICAgKiBAcmV0dXJuIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIGRlbGV0ZWQgZmlsZSBkYXRhIHJlc3VsdFxuICAgKi9cbiAgYXN5bmMgZGVsZXRlRmlsZShvcHRpb25zOiBEZWxldGVGaWxlT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHBhdGg6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aChvcHRpb25zLmRpcmVjdG9yeSwgb3B0aW9ucy5wYXRoKTtcblxuICAgIGNvbnN0IGVudHJ5ID0gKGF3YWl0IHRoaXMuZGJSZXF1ZXN0KCdnZXQnLCBbcGF0aF0pKSBhcyBFbnRyeU9iajtcbiAgICBpZiAoZW50cnkgPT09IHVuZGVmaW5lZCkgdGhyb3cgRXJyb3IoJ0ZpbGUgZG9lcyBub3QgZXhpc3QuJyk7XG4gICAgY29uc3QgZW50cmllcyA9IGF3YWl0IHRoaXMuZGJJbmRleFJlcXVlc3QoJ2J5X2ZvbGRlcicsICdnZXRBbGxLZXlzJywgW0lEQktleVJhbmdlLm9ubHkocGF0aCldKTtcbiAgICBpZiAoZW50cmllcy5sZW5ndGggIT09IDApIHRocm93IEVycm9yKCdGb2xkZXIgaXMgbm90IGVtcHR5LicpO1xuXG4gICAgYXdhaXQgdGhpcy5kYlJlcXVlc3QoJ2RlbGV0ZScsIFtwYXRoXSk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgZGlyZWN0b3J5LlxuICAgKiBAcGFyYW0gb3B0aW9ucyBvcHRpb25zIGZvciB0aGUgbWtkaXJcbiAgICogQHJldHVybiBhIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBta2RpciByZXN1bHRcbiAgICovXG4gIGFzeW5jIG1rZGlyKG9wdGlvbnM6IE1rZGlyT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHBhdGg6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aChvcHRpb25zLmRpcmVjdG9yeSwgb3B0aW9ucy5wYXRoKTtcbiAgICBjb25zdCBkb1JlY3Vyc2l2ZSA9IG9wdGlvbnMucmVjdXJzaXZlO1xuICAgIGNvbnN0IHBhcmVudFBhdGggPSBwYXRoLnN1YnN0cigwLCBwYXRoLmxhc3RJbmRleE9mKCcvJykpO1xuXG4gICAgY29uc3QgZGVwdGggPSAocGF0aC5tYXRjaCgvXFwvL2cpIHx8IFtdKS5sZW5ndGg7XG4gICAgY29uc3QgcGFyZW50RW50cnkgPSAoYXdhaXQgdGhpcy5kYlJlcXVlc3QoJ2dldCcsIFtwYXJlbnRQYXRoXSkpIGFzIEVudHJ5T2JqO1xuICAgIGNvbnN0IG9jY3VwaWVkRW50cnkgPSAoYXdhaXQgdGhpcy5kYlJlcXVlc3QoJ2dldCcsIFtwYXRoXSkpIGFzIEVudHJ5T2JqO1xuICAgIGlmIChkZXB0aCA9PT0gMSkgdGhyb3cgRXJyb3IoJ0Nhbm5vdCBjcmVhdGUgUm9vdCBkaXJlY3RvcnknKTtcbiAgICBpZiAob2NjdXBpZWRFbnRyeSAhPT0gdW5kZWZpbmVkKSB0aHJvdyBFcnJvcignQ3VycmVudCBkaXJlY3RvcnkgZG9lcyBhbHJlYWR5IGV4aXN0LicpO1xuICAgIGlmICghZG9SZWN1cnNpdmUgJiYgZGVwdGggIT09IDIgJiYgcGFyZW50RW50cnkgPT09IHVuZGVmaW5lZCkgdGhyb3cgRXJyb3IoJ1BhcmVudCBkaXJlY3RvcnkgbXVzdCBleGlzdCcpO1xuXG4gICAgaWYgKGRvUmVjdXJzaXZlICYmIGRlcHRoICE9PSAyICYmIHBhcmVudEVudHJ5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IHBhcmVudEFyZ1BhdGggPSBwYXJlbnRQYXRoLnN1YnN0cihwYXJlbnRQYXRoLmluZGV4T2YoJy8nLCAxKSk7XG4gICAgICBhd2FpdCB0aGlzLm1rZGlyKHtcbiAgICAgICAgcGF0aDogcGFyZW50QXJnUGF0aCxcbiAgICAgICAgZGlyZWN0b3J5OiBvcHRpb25zLmRpcmVjdG9yeSxcbiAgICAgICAgcmVjdXJzaXZlOiBkb1JlY3Vyc2l2ZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgIGNvbnN0IHBhdGhPYmo6IEVudHJ5T2JqID0ge1xuICAgICAgcGF0aDogcGF0aCxcbiAgICAgIGZvbGRlcjogcGFyZW50UGF0aCxcbiAgICAgIHR5cGU6ICdkaXJlY3RvcnknLFxuICAgICAgc2l6ZTogMCxcbiAgICAgIGN0aW1lOiBub3csXG4gICAgICBtdGltZTogbm93LFxuICAgIH07XG4gICAgYXdhaXQgdGhpcy5kYlJlcXVlc3QoJ3B1dCcsIFtwYXRoT2JqXSk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGEgZGlyZWN0b3J5XG4gICAqIEBwYXJhbSBvcHRpb25zIHRoZSBvcHRpb25zIGZvciB0aGUgZGlyZWN0b3J5IHJlbW92ZVxuICAgKi9cbiAgYXN5bmMgcm1kaXIob3B0aW9uczogUm1kaXJPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgeyBwYXRoLCBkaXJlY3RvcnksIHJlY3Vyc2l2ZSB9ID0gb3B0aW9ucztcbiAgICBjb25zdCBmdWxsUGF0aDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKGRpcmVjdG9yeSwgcGF0aCk7XG5cbiAgICBjb25zdCBlbnRyeSA9IChhd2FpdCB0aGlzLmRiUmVxdWVzdCgnZ2V0JywgW2Z1bGxQYXRoXSkpIGFzIEVudHJ5T2JqO1xuXG4gICAgaWYgKGVudHJ5ID09PSB1bmRlZmluZWQpIHRocm93IEVycm9yKCdGb2xkZXIgZG9lcyBub3QgZXhpc3QuJyk7XG5cbiAgICBpZiAoZW50cnkudHlwZSAhPT0gJ2RpcmVjdG9yeScpIHRocm93IEVycm9yKCdSZXF1ZXN0ZWQgcGF0aCBpcyBub3QgYSBkaXJlY3RvcnknKTtcblxuICAgIGNvbnN0IHJlYWREaXJSZXN1bHQgPSBhd2FpdCB0aGlzLnJlYWRkaXIoeyBwYXRoLCBkaXJlY3RvcnkgfSk7XG5cbiAgICBpZiAocmVhZERpclJlc3VsdC5maWxlcy5sZW5ndGggIT09IDAgJiYgIXJlY3Vyc2l2ZSkgdGhyb3cgRXJyb3IoJ0ZvbGRlciBpcyBub3QgZW1wdHknKTtcblxuICAgIGZvciAoY29uc3QgZW50cnkgb2YgcmVhZERpclJlc3VsdC5maWxlcykge1xuICAgICAgY29uc3QgZW50cnlQYXRoID0gYCR7cGF0aH0vJHtlbnRyeS5uYW1lfWA7XG4gICAgICBjb25zdCBlbnRyeU9iaiA9IGF3YWl0IHRoaXMuc3RhdCh7IHBhdGg6IGVudHJ5UGF0aCwgZGlyZWN0b3J5IH0pO1xuICAgICAgaWYgKGVudHJ5T2JqLnR5cGUgPT09ICdmaWxlJykge1xuICAgICAgICBhd2FpdCB0aGlzLmRlbGV0ZUZpbGUoeyBwYXRoOiBlbnRyeVBhdGgsIGRpcmVjdG9yeSB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGF3YWl0IHRoaXMucm1kaXIoeyBwYXRoOiBlbnRyeVBhdGgsIGRpcmVjdG9yeSwgcmVjdXJzaXZlIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGF3YWl0IHRoaXMuZGJSZXF1ZXN0KCdkZWxldGUnLCBbZnVsbFBhdGhdKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYSBsaXN0IG9mIGZpbGVzIGZyb20gdGhlIGRpcmVjdG9yeSAobm90IHJlY3Vyc2l2ZSlcbiAgICogQHBhcmFtIG9wdGlvbnMgdGhlIG9wdGlvbnMgZm9yIHRoZSByZWFkZGlyIG9wZXJhdGlvblxuICAgKiBAcmV0dXJuIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIHJlYWRkaXIgZGlyZWN0b3J5IGxpc3RpbmcgcmVzdWx0XG4gICAqL1xuICBhc3luYyByZWFkZGlyKG9wdGlvbnM6IFJlYWRkaXJPcHRpb25zKTogUHJvbWlzZTxSZWFkZGlyUmVzdWx0PiB7XG4gICAgY29uc3QgcGF0aDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKG9wdGlvbnMuZGlyZWN0b3J5LCBvcHRpb25zLnBhdGgpO1xuXG4gICAgY29uc3QgZW50cnkgPSAoYXdhaXQgdGhpcy5kYlJlcXVlc3QoJ2dldCcsIFtwYXRoXSkpIGFzIEVudHJ5T2JqO1xuICAgIGlmIChvcHRpb25zLnBhdGggIT09ICcnICYmIGVudHJ5ID09PSB1bmRlZmluZWQpIHRocm93IEVycm9yKCdGb2xkZXIgZG9lcyBub3QgZXhpc3QuJyk7XG5cbiAgICBjb25zdCBlbnRyaWVzOiBzdHJpbmdbXSA9IGF3YWl0IHRoaXMuZGJJbmRleFJlcXVlc3QoJ2J5X2ZvbGRlcicsICdnZXRBbGxLZXlzJywgW0lEQktleVJhbmdlLm9ubHkocGF0aCldKTtcbiAgICBjb25zdCBmaWxlcyA9IGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgZW50cmllcy5tYXAoYXN5bmMgKGUpID0+IHtcbiAgICAgICAgbGV0IHN1YkVudHJ5ID0gKGF3YWl0IHRoaXMuZGJSZXF1ZXN0KCdnZXQnLCBbZV0pKSBhcyBFbnRyeU9iajtcbiAgICAgICAgaWYgKHN1YkVudHJ5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBzdWJFbnRyeSA9IChhd2FpdCB0aGlzLmRiUmVxdWVzdCgnZ2V0JywgW2UgKyAnLyddKSkgYXMgRW50cnlPYmo7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBuYW1lOiBlLnN1YnN0cmluZyhwYXRoLmxlbmd0aCArIDEpLFxuICAgICAgICAgIHR5cGU6IHN1YkVudHJ5LnR5cGUsXG4gICAgICAgICAgc2l6ZTogc3ViRW50cnkuc2l6ZSxcbiAgICAgICAgICBjdGltZTogc3ViRW50cnkuY3RpbWUsXG4gICAgICAgICAgbXRpbWU6IHN1YkVudHJ5Lm10aW1lLFxuICAgICAgICAgIHVyaTogc3ViRW50cnkucGF0aCxcbiAgICAgICAgfTtcbiAgICAgIH0pLFxuICAgICk7XG4gICAgcmV0dXJuIHsgZmlsZXM6IGZpbGVzIH07XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGZ1bGwgRmlsZSBVUkkgZm9yIGEgcGF0aCBhbmQgZGlyZWN0b3J5XG4gICAqIEBwYXJhbSBvcHRpb25zIHRoZSBvcHRpb25zIGZvciB0aGUgc3RhdCBvcGVyYXRpb25cbiAgICogQHJldHVybiBhIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBmaWxlIHN0YXQgcmVzdWx0XG4gICAqL1xuICBhc3luYyBnZXRVcmkob3B0aW9uczogR2V0VXJpT3B0aW9ucyk6IFByb21pc2U8R2V0VXJpUmVzdWx0PiB7XG4gICAgY29uc3QgcGF0aDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKG9wdGlvbnMuZGlyZWN0b3J5LCBvcHRpb25zLnBhdGgpO1xuXG4gICAgbGV0IGVudHJ5ID0gKGF3YWl0IHRoaXMuZGJSZXF1ZXN0KCdnZXQnLCBbcGF0aF0pKSBhcyBFbnRyeU9iajtcbiAgICBpZiAoZW50cnkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZW50cnkgPSAoYXdhaXQgdGhpcy5kYlJlcXVlc3QoJ2dldCcsIFtwYXRoICsgJy8nXSkpIGFzIEVudHJ5T2JqO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgdXJpOiBlbnRyeT8ucGF0aCB8fCBwYXRoLFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGRhdGEgYWJvdXQgYSBmaWxlXG4gICAqIEBwYXJhbSBvcHRpb25zIHRoZSBvcHRpb25zIGZvciB0aGUgc3RhdCBvcGVyYXRpb25cbiAgICogQHJldHVybiBhIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBmaWxlIHN0YXQgcmVzdWx0XG4gICAqL1xuICBhc3luYyBzdGF0KG9wdGlvbnM6IFN0YXRPcHRpb25zKTogUHJvbWlzZTxTdGF0UmVzdWx0PiB7XG4gICAgY29uc3QgcGF0aDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKG9wdGlvbnMuZGlyZWN0b3J5LCBvcHRpb25zLnBhdGgpO1xuXG4gICAgbGV0IGVudHJ5ID0gKGF3YWl0IHRoaXMuZGJSZXF1ZXN0KCdnZXQnLCBbcGF0aF0pKSBhcyBFbnRyeU9iajtcbiAgICBpZiAoZW50cnkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZW50cnkgPSAoYXdhaXQgdGhpcy5kYlJlcXVlc3QoJ2dldCcsIFtwYXRoICsgJy8nXSkpIGFzIEVudHJ5T2JqO1xuICAgIH1cbiAgICBpZiAoZW50cnkgPT09IHVuZGVmaW5lZCkgdGhyb3cgRXJyb3IoJ0VudHJ5IGRvZXMgbm90IGV4aXN0LicpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6IGVudHJ5LnBhdGguc3Vic3RyaW5nKHBhdGgubGVuZ3RoICsgMSksXG4gICAgICB0eXBlOiBlbnRyeS50eXBlLFxuICAgICAgc2l6ZTogZW50cnkuc2l6ZSxcbiAgICAgIGN0aW1lOiBlbnRyeS5jdGltZSxcbiAgICAgIG10aW1lOiBlbnRyeS5tdGltZSxcbiAgICAgIHVyaTogZW50cnkucGF0aCxcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbmFtZSBhIGZpbGUgb3IgZGlyZWN0b3J5XG4gICAqIEBwYXJhbSBvcHRpb25zIHRoZSBvcHRpb25zIGZvciB0aGUgcmVuYW1lIG9wZXJhdGlvblxuICAgKiBAcmV0dXJuIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIHJlbmFtZSByZXN1bHRcbiAgICovXG4gIGFzeW5jIHJlbmFtZShvcHRpb25zOiBSZW5hbWVPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgdGhpcy5fY29weShvcHRpb25zLCB0cnVlKTtcbiAgICByZXR1cm47XG4gIH1cblxuICAvKipcbiAgICogQ29weSBhIGZpbGUgb3IgZGlyZWN0b3J5XG4gICAqIEBwYXJhbSBvcHRpb25zIHRoZSBvcHRpb25zIGZvciB0aGUgY29weSBvcGVyYXRpb25cbiAgICogQHJldHVybiBhIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBjb3B5IHJlc3VsdFxuICAgKi9cbiAgYXN5bmMgY29weShvcHRpb25zOiBDb3B5T3B0aW9ucyk6IFByb21pc2U8Q29weVJlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLl9jb3B5KG9wdGlvbnMsIGZhbHNlKTtcbiAgfVxuXG4gIGFzeW5jIHJlcXVlc3RQZXJtaXNzaW9ucygpOiBQcm9taXNlPFBlcm1pc3Npb25TdGF0dXM+IHtcbiAgICByZXR1cm4geyBwdWJsaWNTdG9yYWdlOiAnZ3JhbnRlZCcgfTtcbiAgfVxuXG4gIGFzeW5jIGNoZWNrUGVybWlzc2lvbnMoKTogUHJvbWlzZTxQZXJtaXNzaW9uU3RhdHVzPiB7XG4gICAgcmV0dXJuIHsgcHVibGljU3RvcmFnZTogJ2dyYW50ZWQnIH07XG4gIH1cblxuICAvKipcbiAgICogRnVuY3Rpb24gdGhhdCBjYW4gcGVyZm9ybSBhIGNvcHkgb3IgYSByZW5hbWVcbiAgICogQHBhcmFtIG9wdGlvbnMgdGhlIG9wdGlvbnMgZm9yIHRoZSByZW5hbWUgb3BlcmF0aW9uXG4gICAqIEBwYXJhbSBkb1JlbmFtZSB3aGV0aGVyIHRvIHBlcmZvcm0gYSByZW5hbWUgb3IgY29weSBvcGVyYXRpb25cbiAgICogQHJldHVybiBhIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSByZXN1bHRcbiAgICovXG4gIHByaXZhdGUgYXN5bmMgX2NvcHkob3B0aW9uczogQ29weU9wdGlvbnMsIGRvUmVuYW1lID0gZmFsc2UpOiBQcm9taXNlPENvcHlSZXN1bHQ+IHtcbiAgICBsZXQgeyB0b0RpcmVjdG9yeSB9ID0gb3B0aW9ucztcbiAgICBjb25zdCB7IHRvLCBmcm9tLCBkaXJlY3Rvcnk6IGZyb21EaXJlY3RvcnkgfSA9IG9wdGlvbnM7XG5cbiAgICBpZiAoIXRvIHx8ICFmcm9tKSB7XG4gICAgICB0aHJvdyBFcnJvcignQm90aCB0byBhbmQgZnJvbSBtdXN0IGJlIHByb3ZpZGVkJyk7XG4gICAgfVxuXG4gICAgLy8gSWYgbm8gXCJ0b1wiIGRpcmVjdG9yeSBpcyBwcm92aWRlZCwgdXNlIHRoZSBcImZyb21cIiBkaXJlY3RvcnlcbiAgICBpZiAoIXRvRGlyZWN0b3J5KSB7XG4gICAgICB0b0RpcmVjdG9yeSA9IGZyb21EaXJlY3Rvcnk7XG4gICAgfVxuXG4gICAgY29uc3QgZnJvbVBhdGggPSB0aGlzLmdldFBhdGgoZnJvbURpcmVjdG9yeSwgZnJvbSk7XG4gICAgY29uc3QgdG9QYXRoID0gdGhpcy5nZXRQYXRoKHRvRGlyZWN0b3J5LCB0byk7XG5cbiAgICAvLyBUZXN0IHRoYXQgdGhlIFwidG9cIiBhbmQgXCJmcm9tXCIgbG9jYXRpb25zIGFyZSBkaWZmZXJlbnRcbiAgICBpZiAoZnJvbVBhdGggPT09IHRvUGF0aCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdXJpOiB0b1BhdGgsXG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmIChpc1BhdGhQYXJlbnQoZnJvbVBhdGgsIHRvUGF0aCkpIHtcbiAgICAgIHRocm93IEVycm9yKCdUbyBwYXRoIGNhbm5vdCBjb250YWluIHRoZSBmcm9tIHBhdGgnKTtcbiAgICB9XG5cbiAgICAvLyBDaGVjayB0aGUgc3RhdGUgb2YgdGhlIFwidG9cIiBsb2NhdGlvblxuICAgIGxldCB0b09iajtcbiAgICB0cnkge1xuICAgICAgdG9PYmogPSBhd2FpdCB0aGlzLnN0YXQoe1xuICAgICAgICBwYXRoOiB0byxcbiAgICAgICAgZGlyZWN0b3J5OiB0b0RpcmVjdG9yeSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIFRvIGxvY2F0aW9uIGRvZXMgbm90IGV4aXN0LCBlbnN1cmUgdGhlIGRpcmVjdG9yeSBjb250YWluaW5nIFwidG9cIiBsb2NhdGlvbiBleGlzdHMgYW5kIGlzIGEgZGlyZWN0b3J5XG4gICAgICBjb25zdCB0b1BhdGhDb21wb25lbnRzID0gdG8uc3BsaXQoJy8nKTtcbiAgICAgIHRvUGF0aENvbXBvbmVudHMucG9wKCk7XG4gICAgICBjb25zdCB0b1BhdGggPSB0b1BhdGhDb21wb25lbnRzLmpvaW4oJy8nKTtcblxuICAgICAgLy8gQ2hlY2sgdGhlIGNvbnRhaW5pbmcgZGlyZWN0b3J5IG9mIHRoZSBcInRvXCIgbG9jYXRpb24gZXhpc3RzXG4gICAgICBpZiAodG9QYXRoQ29tcG9uZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IHRvUGFyZW50RGlyZWN0b3J5ID0gYXdhaXQgdGhpcy5zdGF0KHtcbiAgICAgICAgICBwYXRoOiB0b1BhdGgsXG4gICAgICAgICAgZGlyZWN0b3J5OiB0b0RpcmVjdG9yeSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHRvUGFyZW50RGlyZWN0b3J5LnR5cGUgIT09ICdkaXJlY3RvcnknKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQYXJlbnQgZGlyZWN0b3J5IG9mIHRoZSB0byBwYXRoIGlzIGEgZmlsZScpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ2Fubm90IG92ZXJ3cml0ZSBhIGRpcmVjdG9yeVxuICAgIGlmICh0b09iaiAmJiB0b09iai50eXBlID09PSAnZGlyZWN0b3J5Jykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3Qgb3ZlcndyaXRlIGEgZGlyZWN0b3J5IHdpdGggYSBmaWxlJyk7XG4gICAgfVxuXG4gICAgLy8gRW5zdXJlIHRoZSBcImZyb21cIiBvYmplY3QgZXhpc3RzXG4gICAgY29uc3QgZnJvbU9iaiA9IGF3YWl0IHRoaXMuc3RhdCh7XG4gICAgICBwYXRoOiBmcm9tLFxuICAgICAgZGlyZWN0b3J5OiBmcm9tRGlyZWN0b3J5LFxuICAgIH0pO1xuXG4gICAgLy8gU2V0IHRoZSBtdGltZS9jdGltZSBvZiB0aGUgc3VwcGxpZWQgcGF0aFxuICAgIGNvbnN0IHVwZGF0ZVRpbWUgPSBhc3luYyAocGF0aDogc3RyaW5nLCBjdGltZTogbnVtYmVyLCBtdGltZTogbnVtYmVyKSA9PiB7XG4gICAgICBjb25zdCBmdWxsUGF0aDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKHRvRGlyZWN0b3J5LCBwYXRoKTtcbiAgICAgIGNvbnN0IGVudHJ5ID0gKGF3YWl0IHRoaXMuZGJSZXF1ZXN0KCdnZXQnLCBbZnVsbFBhdGhdKSkgYXMgRW50cnlPYmo7XG4gICAgICBlbnRyeS5jdGltZSA9IGN0aW1lO1xuICAgICAgZW50cnkubXRpbWUgPSBtdGltZTtcbiAgICAgIGF3YWl0IHRoaXMuZGJSZXF1ZXN0KCdwdXQnLCBbZW50cnldKTtcbiAgICB9O1xuXG4gICAgY29uc3QgY3RpbWUgPSBmcm9tT2JqLmN0aW1lID8gZnJvbU9iai5jdGltZSA6IERhdGUubm93KCk7XG5cbiAgICBzd2l0Y2ggKGZyb21PYmoudHlwZSkge1xuICAgICAgLy8gVGhlIFwiZnJvbVwiIG9iamVjdCBpcyBhIGZpbGVcbiAgICAgIGNhc2UgJ2ZpbGUnOiB7XG4gICAgICAgIC8vIFJlYWQgdGhlIGZpbGVcbiAgICAgICAgY29uc3QgZmlsZSA9IGF3YWl0IHRoaXMucmVhZEZpbGUoe1xuICAgICAgICAgIHBhdGg6IGZyb20sXG4gICAgICAgICAgZGlyZWN0b3J5OiBmcm9tRGlyZWN0b3J5LFxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBPcHRpb25hbGx5IHJlbW92ZSB0aGUgZmlsZVxuICAgICAgICBpZiAoZG9SZW5hbWUpIHtcbiAgICAgICAgICBhd2FpdCB0aGlzLmRlbGV0ZUZpbGUoe1xuICAgICAgICAgICAgcGF0aDogZnJvbSxcbiAgICAgICAgICAgIGRpcmVjdG9yeTogZnJvbURpcmVjdG9yeSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBlbmNvZGluZztcbiAgICAgICAgaWYgKCEoZmlsZS5kYXRhIGluc3RhbmNlb2YgQmxvYikgJiYgIXRoaXMuaXNCYXNlNjRTdHJpbmcoZmlsZS5kYXRhKSkge1xuICAgICAgICAgIGVuY29kaW5nID0gRW5jb2RpbmcuVVRGODtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFdyaXRlIHRoZSBmaWxlIHRvIHRoZSBuZXcgbG9jYXRpb25cbiAgICAgICAgY29uc3Qgd3JpdGVSZXN1bHQgPSBhd2FpdCB0aGlzLndyaXRlRmlsZSh7XG4gICAgICAgICAgcGF0aDogdG8sXG4gICAgICAgICAgZGlyZWN0b3J5OiB0b0RpcmVjdG9yeSxcbiAgICAgICAgICBkYXRhOiBmaWxlLmRhdGEsXG4gICAgICAgICAgZW5jb2Rpbmc6IGVuY29kaW5nLFxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBDb3B5IHRoZSBtdGltZS9jdGltZSBvZiBhIHJlbmFtZWQgZmlsZVxuICAgICAgICBpZiAoZG9SZW5hbWUpIHtcbiAgICAgICAgICBhd2FpdCB1cGRhdGVUaW1lKHRvLCBjdGltZSwgZnJvbU9iai5tdGltZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZXNvbHZlIHByb21pc2VcbiAgICAgICAgcmV0dXJuIHdyaXRlUmVzdWx0O1xuICAgICAgfVxuICAgICAgY2FzZSAnZGlyZWN0b3J5Jzoge1xuICAgICAgICBpZiAodG9PYmopIHtcbiAgICAgICAgICB0aHJvdyBFcnJvcignQ2Fubm90IG1vdmUgYSBkaXJlY3Rvcnkgb3ZlciBhbiBleGlzdGluZyBvYmplY3QnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgLy8gQ3JlYXRlIHRoZSB0byBkaXJlY3RvcnlcbiAgICAgICAgICBhd2FpdCB0aGlzLm1rZGlyKHtcbiAgICAgICAgICAgIHBhdGg6IHRvLFxuICAgICAgICAgICAgZGlyZWN0b3J5OiB0b0RpcmVjdG9yeSxcbiAgICAgICAgICAgIHJlY3Vyc2l2ZTogZmFsc2UsXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAvLyBDb3B5IHRoZSBtdGltZS9jdGltZSBvZiBhIHJlbmFtZWQgZGlyZWN0b3J5XG4gICAgICAgICAgaWYgKGRvUmVuYW1lKSB7XG4gICAgICAgICAgICBhd2FpdCB1cGRhdGVUaW1lKHRvLCBjdGltZSwgZnJvbU9iai5tdGltZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgLy8gaWdub3JlXG4gICAgICAgIH1cblxuICAgICAgICAvLyBJdGVyYXRlIG92ZXIgdGhlIGNvbnRlbnRzIG9mIHRoZSBmcm9tIGxvY2F0aW9uXG4gICAgICAgIGNvbnN0IGNvbnRlbnRzID0gKFxuICAgICAgICAgIGF3YWl0IHRoaXMucmVhZGRpcih7XG4gICAgICAgICAgICBwYXRoOiBmcm9tLFxuICAgICAgICAgICAgZGlyZWN0b3J5OiBmcm9tRGlyZWN0b3J5LFxuICAgICAgICAgIH0pXG4gICAgICAgICkuZmlsZXM7XG5cbiAgICAgICAgZm9yIChjb25zdCBmaWxlbmFtZSBvZiBjb250ZW50cykge1xuICAgICAgICAgIC8vIE1vdmUgaXRlbSBmcm9tIHRoZSBmcm9tIGRpcmVjdG9yeSB0byB0aGUgdG8gZGlyZWN0b3J5XG4gICAgICAgICAgYXdhaXQgdGhpcy5fY29weShcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgZnJvbTogYCR7ZnJvbX0vJHtmaWxlbmFtZS5uYW1lfWAsXG4gICAgICAgICAgICAgIHRvOiBgJHt0b30vJHtmaWxlbmFtZS5uYW1lfWAsXG4gICAgICAgICAgICAgIGRpcmVjdG9yeTogZnJvbURpcmVjdG9yeSxcbiAgICAgICAgICAgICAgdG9EaXJlY3RvcnksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZG9SZW5hbWUsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE9wdGlvbmFsbHkgcmVtb3ZlIHRoZSBvcmlnaW5hbCBmcm9tIGRpcmVjdG9yeVxuICAgICAgICBpZiAoZG9SZW5hbWUpIHtcbiAgICAgICAgICBhd2FpdCB0aGlzLnJtZGlyKHtcbiAgICAgICAgICAgIHBhdGg6IGZyb20sXG4gICAgICAgICAgICBkaXJlY3Rvcnk6IGZyb21EaXJlY3RvcnksXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIHVyaTogdG9QYXRoLFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogRnVuY3Rpb24gdGhhdCBwZXJmb3JtcyBhIGh0dHAgcmVxdWVzdCB0byBhIHNlcnZlciBhbmQgZG93bmxvYWRzIHRoZSBmaWxlIHRvIHRoZSBzcGVjaWZpZWQgZGVzdGluYXRpb25cbiAgICpcbiAgICogQGRlcHJlY2F0ZWQgVXNlIHRoZSBAY2FwYWNpdG9yL2ZpbGUtdHJhbnNmZXIgcGx1Z2luIGluc3RlYWQuXG4gICAqIEBwYXJhbSBvcHRpb25zIHRoZSBvcHRpb25zIGZvciB0aGUgZG93bmxvYWQgb3BlcmF0aW9uXG4gICAqIEByZXR1cm5zIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIGRvd25sb2FkIGZpbGUgcmVzdWx0XG4gICAqL1xuICBwdWJsaWMgZG93bmxvYWRGaWxlID0gYXN5bmMgKG9wdGlvbnM6IERvd25sb2FkRmlsZU9wdGlvbnMpOiBQcm9taXNlPERvd25sb2FkRmlsZVJlc3VsdD4gPT4ge1xuICAgIGNvbnN0IHJlcXVlc3RJbml0ID0gYnVpbGRSZXF1ZXN0SW5pdChvcHRpb25zLCBvcHRpb25zLndlYkZldGNoRXh0cmEpO1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2gob3B0aW9ucy51cmwsIHJlcXVlc3RJbml0KTtcbiAgICBsZXQgYmxvYjogQmxvYjtcblxuICAgIGlmICghb3B0aW9ucy5wcm9ncmVzcykgYmxvYiA9IGF3YWl0IHJlc3BvbnNlLmJsb2IoKTtcbiAgICBlbHNlIGlmICghcmVzcG9uc2U/LmJvZHkpIGJsb2IgPSBuZXcgQmxvYigpO1xuICAgIGVsc2Uge1xuICAgICAgY29uc3QgcmVhZGVyID0gcmVzcG9uc2UuYm9keS5nZXRSZWFkZXIoKTtcblxuICAgICAgbGV0IGJ5dGVzID0gMDtcbiAgICAgIGNvbnN0IGNodW5rczogKFVpbnQ4QXJyYXkgfCB1bmRlZmluZWQpW10gPSBbXTtcblxuICAgICAgY29uc3QgY29udGVudFR5cGU6IHN0cmluZyB8IG51bGwgPSByZXNwb25zZS5oZWFkZXJzLmdldCgnY29udGVudC10eXBlJyk7XG4gICAgICBjb25zdCBjb250ZW50TGVuZ3RoOiBudW1iZXIgPSBwYXJzZUludChyZXNwb25zZS5oZWFkZXJzLmdldCgnY29udGVudC1sZW5ndGgnKSB8fCAnMCcsIDEwKTtcblxuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgY29uc3QgeyBkb25lLCB2YWx1ZSB9ID0gYXdhaXQgcmVhZGVyLnJlYWQoKTtcblxuICAgICAgICBpZiAoZG9uZSkgYnJlYWs7XG5cbiAgICAgICAgY2h1bmtzLnB1c2godmFsdWUpO1xuICAgICAgICBieXRlcyArPSB2YWx1ZT8ubGVuZ3RoIHx8IDA7XG5cbiAgICAgICAgY29uc3Qgc3RhdHVzOiBQcm9ncmVzc1N0YXR1cyA9IHtcbiAgICAgICAgICB1cmw6IG9wdGlvbnMudXJsLFxuICAgICAgICAgIGJ5dGVzLFxuICAgICAgICAgIGNvbnRlbnRMZW5ndGgsXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5ub3RpZnlMaXN0ZW5lcnMoJ3Byb2dyZXNzJywgc3RhdHVzKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgYWxsQ2h1bmtzID0gbmV3IFVpbnQ4QXJyYXkoYnl0ZXMpO1xuICAgICAgbGV0IHBvc2l0aW9uID0gMDtcbiAgICAgIGZvciAoY29uc3QgY2h1bmsgb2YgY2h1bmtzKSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2h1bmsgPT09ICd1bmRlZmluZWQnKSBjb250aW51ZTtcblxuICAgICAgICBhbGxDaHVua3Muc2V0KGNodW5rLCBwb3NpdGlvbik7XG4gICAgICAgIHBvc2l0aW9uICs9IGNodW5rLmxlbmd0aDtcbiAgICAgIH1cblxuICAgICAgYmxvYiA9IG5ldyBCbG9iKFthbGxDaHVua3MuYnVmZmVyXSwgeyB0eXBlOiBjb250ZW50VHlwZSB8fCB1bmRlZmluZWQgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy53cml0ZUZpbGUoe1xuICAgICAgcGF0aDogb3B0aW9ucy5wYXRoLFxuICAgICAgZGlyZWN0b3J5OiBvcHRpb25zLmRpcmVjdG9yeSA/PyB1bmRlZmluZWQsXG4gICAgICByZWN1cnNpdmU6IG9wdGlvbnMucmVjdXJzaXZlID8/IGZhbHNlLFxuICAgICAgZGF0YTogYmxvYixcbiAgICB9KTtcblxuICAgIHJldHVybiB7IHBhdGg6IHJlc3VsdC51cmksIGJsb2IgfTtcbiAgfTtcblxuICBwcml2YXRlIGlzQmFzZTY0U3RyaW5nKHN0cjogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBidG9hKGF0b2Ioc3RyKSkgPT0gc3RyO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxufVxuXG5pbnRlcmZhY2UgRW50cnlPYmoge1xuICBwYXRoOiBzdHJpbmc7XG4gIGZvbGRlcjogc3RyaW5nO1xuICB0eXBlOiAnZGlyZWN0b3J5JyB8ICdmaWxlJztcbiAgc2l6ZTogbnVtYmVyO1xuICBjdGltZTogbnVtYmVyO1xuICBtdGltZTogbnVtYmVyO1xuICB1cmk/OiBzdHJpbmc7XG4gIGNvbnRlbnQ/OiBzdHJpbmcgfCBCbG9iO1xufVxuIiwgImltcG9ydCB7IFdlYlBsdWdpbiB9IGZyb20gJ0BjYXBhY2l0b3IvY29yZSc7XG5cbmltcG9ydCB0eXBlIHsgQnJvd3NlclBsdWdpbiwgT3Blbk9wdGlvbnMgfSBmcm9tICcuL2RlZmluaXRpb25zJztcblxuZXhwb3J0IGNsYXNzIEJyb3dzZXJXZWIgZXh0ZW5kcyBXZWJQbHVnaW4gaW1wbGVtZW50cyBCcm93c2VyUGx1Z2luIHtcbiAgX2xhc3RXaW5kb3c6IFdpbmRvdyB8IG51bGw7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl9sYXN0V2luZG93ID0gbnVsbDtcbiAgfVxuXG4gIGFzeW5jIG9wZW4ob3B0aW9uczogT3Blbk9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0aGlzLl9sYXN0V2luZG93ID0gd2luZG93Lm9wZW4ob3B0aW9ucy51cmwsIG9wdGlvbnMud2luZG93TmFtZSB8fCAnX2JsYW5rJyk7XG4gIH1cblxuICBhc3luYyBjbG9zZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgaWYgKHRoaXMuX2xhc3RXaW5kb3cgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLl9sYXN0V2luZG93LmNsb3NlKCk7XG4gICAgICAgIHRoaXMuX2xhc3RXaW5kb3cgPSBudWxsO1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZWplY3QoJ05vIGFjdGl2ZSB3aW5kb3cgdG8gY2xvc2UhJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuY29uc3QgQnJvd3NlciA9IG5ldyBCcm93c2VyV2ViKCk7XG5cbmV4cG9ydCB7IEJyb3dzZXIgfTtcbiIsICIvLyAncGF0aCcgbW9kdWxlIGV4dHJhY3RlZCBmcm9tIE5vZGUuanMgdjguMTEuMSAob25seSB0aGUgcG9zaXggcGFydClcbi8vIHRyYW5zcGxpdGVkIHdpdGggQmFiZWxcblxuLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gYXNzZXJ0UGF0aChwYXRoKSB7XG4gIGlmICh0eXBlb2YgcGF0aCAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdQYXRoIG11c3QgYmUgYSBzdHJpbmcuIFJlY2VpdmVkICcgKyBKU09OLnN0cmluZ2lmeShwYXRoKSk7XG4gIH1cbn1cblxuLy8gUmVzb2x2ZXMgLiBhbmQgLi4gZWxlbWVudHMgaW4gYSBwYXRoIHdpdGggZGlyZWN0b3J5IG5hbWVzXG5mdW5jdGlvbiBub3JtYWxpemVTdHJpbmdQb3NpeChwYXRoLCBhbGxvd0Fib3ZlUm9vdCkge1xuICB2YXIgcmVzID0gJyc7XG4gIHZhciBsYXN0U2VnbWVudExlbmd0aCA9IDA7XG4gIHZhciBsYXN0U2xhc2ggPSAtMTtcbiAgdmFyIGRvdHMgPSAwO1xuICB2YXIgY29kZTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPD0gcGF0aC5sZW5ndGg7ICsraSkge1xuICAgIGlmIChpIDwgcGF0aC5sZW5ndGgpXG4gICAgICBjb2RlID0gcGF0aC5jaGFyQ29kZUF0KGkpO1xuICAgIGVsc2UgaWYgKGNvZGUgPT09IDQ3IC8qLyovKVxuICAgICAgYnJlYWs7XG4gICAgZWxzZVxuICAgICAgY29kZSA9IDQ3IC8qLyovO1xuICAgIGlmIChjb2RlID09PSA0NyAvKi8qLykge1xuICAgICAgaWYgKGxhc3RTbGFzaCA9PT0gaSAtIDEgfHwgZG90cyA9PT0gMSkge1xuICAgICAgICAvLyBOT09QXG4gICAgICB9IGVsc2UgaWYgKGxhc3RTbGFzaCAhPT0gaSAtIDEgJiYgZG90cyA9PT0gMikge1xuICAgICAgICBpZiAocmVzLmxlbmd0aCA8IDIgfHwgbGFzdFNlZ21lbnRMZW5ndGggIT09IDIgfHwgcmVzLmNoYXJDb2RlQXQocmVzLmxlbmd0aCAtIDEpICE9PSA0NiAvKi4qLyB8fCByZXMuY2hhckNvZGVBdChyZXMubGVuZ3RoIC0gMikgIT09IDQ2IC8qLiovKSB7XG4gICAgICAgICAgaWYgKHJlcy5sZW5ndGggPiAyKSB7XG4gICAgICAgICAgICB2YXIgbGFzdFNsYXNoSW5kZXggPSByZXMubGFzdEluZGV4T2YoJy8nKTtcbiAgICAgICAgICAgIGlmIChsYXN0U2xhc2hJbmRleCAhPT0gcmVzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgaWYgKGxhc3RTbGFzaEluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHJlcyA9ICcnO1xuICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50TGVuZ3RoID0gMDtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXMgPSByZXMuc2xpY2UoMCwgbGFzdFNsYXNoSW5kZXgpO1xuICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50TGVuZ3RoID0gcmVzLmxlbmd0aCAtIDEgLSByZXMubGFzdEluZGV4T2YoJy8nKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBsYXN0U2xhc2ggPSBpO1xuICAgICAgICAgICAgICBkb3RzID0gMDtcbiAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChyZXMubGVuZ3RoID09PSAyIHx8IHJlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIHJlcyA9ICcnO1xuICAgICAgICAgICAgbGFzdFNlZ21lbnRMZW5ndGggPSAwO1xuICAgICAgICAgICAgbGFzdFNsYXNoID0gaTtcbiAgICAgICAgICAgIGRvdHMgPSAwO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChhbGxvd0Fib3ZlUm9vdCkge1xuICAgICAgICAgIGlmIChyZXMubGVuZ3RoID4gMClcbiAgICAgICAgICAgIHJlcyArPSAnLy4uJztcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXMgPSAnLi4nO1xuICAgICAgICAgIGxhc3RTZWdtZW50TGVuZ3RoID0gMjtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHJlcy5sZW5ndGggPiAwKVxuICAgICAgICAgIHJlcyArPSAnLycgKyBwYXRoLnNsaWNlKGxhc3RTbGFzaCArIDEsIGkpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgcmVzID0gcGF0aC5zbGljZShsYXN0U2xhc2ggKyAxLCBpKTtcbiAgICAgICAgbGFzdFNlZ21lbnRMZW5ndGggPSBpIC0gbGFzdFNsYXNoIC0gMTtcbiAgICAgIH1cbiAgICAgIGxhc3RTbGFzaCA9IGk7XG4gICAgICBkb3RzID0gMDtcbiAgICB9IGVsc2UgaWYgKGNvZGUgPT09IDQ2IC8qLiovICYmIGRvdHMgIT09IC0xKSB7XG4gICAgICArK2RvdHM7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRvdHMgPSAtMTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cblxuZnVuY3Rpb24gX2Zvcm1hdChzZXAsIHBhdGhPYmplY3QpIHtcbiAgdmFyIGRpciA9IHBhdGhPYmplY3QuZGlyIHx8IHBhdGhPYmplY3Qucm9vdDtcbiAgdmFyIGJhc2UgPSBwYXRoT2JqZWN0LmJhc2UgfHwgKHBhdGhPYmplY3QubmFtZSB8fCAnJykgKyAocGF0aE9iamVjdC5leHQgfHwgJycpO1xuICBpZiAoIWRpcikge1xuICAgIHJldHVybiBiYXNlO1xuICB9XG4gIGlmIChkaXIgPT09IHBhdGhPYmplY3Qucm9vdCkge1xuICAgIHJldHVybiBkaXIgKyBiYXNlO1xuICB9XG4gIHJldHVybiBkaXIgKyBzZXAgKyBiYXNlO1xufVxuXG52YXIgcG9zaXggPSB7XG4gIC8vIHBhdGgucmVzb2x2ZShbZnJvbSAuLi5dLCB0bylcbiAgcmVzb2x2ZTogZnVuY3Rpb24gcmVzb2x2ZSgpIHtcbiAgICB2YXIgcmVzb2x2ZWRQYXRoID0gJyc7XG4gICAgdmFyIHJlc29sdmVkQWJzb2x1dGUgPSBmYWxzZTtcbiAgICB2YXIgY3dkO1xuXG4gICAgZm9yICh2YXIgaSA9IGFyZ3VtZW50cy5sZW5ndGggLSAxOyBpID49IC0xICYmICFyZXNvbHZlZEFic29sdXRlOyBpLS0pIHtcbiAgICAgIHZhciBwYXRoO1xuICAgICAgaWYgKGkgPj0gMClcbiAgICAgICAgcGF0aCA9IGFyZ3VtZW50c1tpXTtcbiAgICAgIGVsc2Uge1xuICAgICAgICBpZiAoY3dkID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgY3dkID0gcHJvY2Vzcy5jd2QoKTtcbiAgICAgICAgcGF0aCA9IGN3ZDtcbiAgICAgIH1cblxuICAgICAgYXNzZXJ0UGF0aChwYXRoKTtcblxuICAgICAgLy8gU2tpcCBlbXB0eSBlbnRyaWVzXG4gICAgICBpZiAocGF0aC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIHJlc29sdmVkUGF0aCA9IHBhdGggKyAnLycgKyByZXNvbHZlZFBhdGg7XG4gICAgICByZXNvbHZlZEFic29sdXRlID0gcGF0aC5jaGFyQ29kZUF0KDApID09PSA0NyAvKi8qLztcbiAgICB9XG5cbiAgICAvLyBBdCB0aGlzIHBvaW50IHRoZSBwYXRoIHNob3VsZCBiZSByZXNvbHZlZCB0byBhIGZ1bGwgYWJzb2x1dGUgcGF0aCwgYnV0XG4gICAgLy8gaGFuZGxlIHJlbGF0aXZlIHBhdGhzIHRvIGJlIHNhZmUgKG1pZ2h0IGhhcHBlbiB3aGVuIHByb2Nlc3MuY3dkKCkgZmFpbHMpXG5cbiAgICAvLyBOb3JtYWxpemUgdGhlIHBhdGhcbiAgICByZXNvbHZlZFBhdGggPSBub3JtYWxpemVTdHJpbmdQb3NpeChyZXNvbHZlZFBhdGgsICFyZXNvbHZlZEFic29sdXRlKTtcblxuICAgIGlmIChyZXNvbHZlZEFic29sdXRlKSB7XG4gICAgICBpZiAocmVzb2x2ZWRQYXRoLmxlbmd0aCA+IDApXG4gICAgICAgIHJldHVybiAnLycgKyByZXNvbHZlZFBhdGg7XG4gICAgICBlbHNlXG4gICAgICAgIHJldHVybiAnLyc7XG4gICAgfSBlbHNlIGlmIChyZXNvbHZlZFBhdGgubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIHJlc29sdmVkUGF0aDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICcuJztcbiAgICB9XG4gIH0sXG5cbiAgbm9ybWFsaXplOiBmdW5jdGlvbiBub3JtYWxpemUocGF0aCkge1xuICAgIGFzc2VydFBhdGgocGF0aCk7XG5cbiAgICBpZiAocGF0aC5sZW5ndGggPT09IDApIHJldHVybiAnLic7XG5cbiAgICB2YXIgaXNBYnNvbHV0ZSA9IHBhdGguY2hhckNvZGVBdCgwKSA9PT0gNDcgLyovKi87XG4gICAgdmFyIHRyYWlsaW5nU2VwYXJhdG9yID0gcGF0aC5jaGFyQ29kZUF0KHBhdGgubGVuZ3RoIC0gMSkgPT09IDQ3IC8qLyovO1xuXG4gICAgLy8gTm9ybWFsaXplIHRoZSBwYXRoXG4gICAgcGF0aCA9IG5vcm1hbGl6ZVN0cmluZ1Bvc2l4KHBhdGgsICFpc0Fic29sdXRlKTtcblxuICAgIGlmIChwYXRoLmxlbmd0aCA9PT0gMCAmJiAhaXNBYnNvbHV0ZSkgcGF0aCA9ICcuJztcbiAgICBpZiAocGF0aC5sZW5ndGggPiAwICYmIHRyYWlsaW5nU2VwYXJhdG9yKSBwYXRoICs9ICcvJztcblxuICAgIGlmIChpc0Fic29sdXRlKSByZXR1cm4gJy8nICsgcGF0aDtcbiAgICByZXR1cm4gcGF0aDtcbiAgfSxcblxuICBpc0Fic29sdXRlOiBmdW5jdGlvbiBpc0Fic29sdXRlKHBhdGgpIHtcbiAgICBhc3NlcnRQYXRoKHBhdGgpO1xuICAgIHJldHVybiBwYXRoLmxlbmd0aCA+IDAgJiYgcGF0aC5jaGFyQ29kZUF0KDApID09PSA0NyAvKi8qLztcbiAgfSxcblxuICBqb2luOiBmdW5jdGlvbiBqb2luKCkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKVxuICAgICAgcmV0dXJuICcuJztcbiAgICB2YXIgam9pbmVkO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgKytpKSB7XG4gICAgICB2YXIgYXJnID0gYXJndW1lbnRzW2ldO1xuICAgICAgYXNzZXJ0UGF0aChhcmcpO1xuICAgICAgaWYgKGFyZy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGlmIChqb2luZWQgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICBqb2luZWQgPSBhcmc7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICBqb2luZWQgKz0gJy8nICsgYXJnO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoam9pbmVkID09PSB1bmRlZmluZWQpXG4gICAgICByZXR1cm4gJy4nO1xuICAgIHJldHVybiBwb3NpeC5ub3JtYWxpemUoam9pbmVkKTtcbiAgfSxcblxuICByZWxhdGl2ZTogZnVuY3Rpb24gcmVsYXRpdmUoZnJvbSwgdG8pIHtcbiAgICBhc3NlcnRQYXRoKGZyb20pO1xuICAgIGFzc2VydFBhdGgodG8pO1xuXG4gICAgaWYgKGZyb20gPT09IHRvKSByZXR1cm4gJyc7XG5cbiAgICBmcm9tID0gcG9zaXgucmVzb2x2ZShmcm9tKTtcbiAgICB0byA9IHBvc2l4LnJlc29sdmUodG8pO1xuXG4gICAgaWYgKGZyb20gPT09IHRvKSByZXR1cm4gJyc7XG5cbiAgICAvLyBUcmltIGFueSBsZWFkaW5nIGJhY2tzbGFzaGVzXG4gICAgdmFyIGZyb21TdGFydCA9IDE7XG4gICAgZm9yICg7IGZyb21TdGFydCA8IGZyb20ubGVuZ3RoOyArK2Zyb21TdGFydCkge1xuICAgICAgaWYgKGZyb20uY2hhckNvZGVBdChmcm9tU3RhcnQpICE9PSA0NyAvKi8qLylcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHZhciBmcm9tRW5kID0gZnJvbS5sZW5ndGg7XG4gICAgdmFyIGZyb21MZW4gPSBmcm9tRW5kIC0gZnJvbVN0YXJ0O1xuXG4gICAgLy8gVHJpbSBhbnkgbGVhZGluZyBiYWNrc2xhc2hlc1xuICAgIHZhciB0b1N0YXJ0ID0gMTtcbiAgICBmb3IgKDsgdG9TdGFydCA8IHRvLmxlbmd0aDsgKyt0b1N0YXJ0KSB7XG4gICAgICBpZiAodG8uY2hhckNvZGVBdCh0b1N0YXJ0KSAhPT0gNDcgLyovKi8pXG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICB2YXIgdG9FbmQgPSB0by5sZW5ndGg7XG4gICAgdmFyIHRvTGVuID0gdG9FbmQgLSB0b1N0YXJ0O1xuXG4gICAgLy8gQ29tcGFyZSBwYXRocyB0byBmaW5kIHRoZSBsb25nZXN0IGNvbW1vbiBwYXRoIGZyb20gcm9vdFxuICAgIHZhciBsZW5ndGggPSBmcm9tTGVuIDwgdG9MZW4gPyBmcm9tTGVuIDogdG9MZW47XG4gICAgdmFyIGxhc3RDb21tb25TZXAgPSAtMTtcbiAgICB2YXIgaSA9IDA7XG4gICAgZm9yICg7IGkgPD0gbGVuZ3RoOyArK2kpIHtcbiAgICAgIGlmIChpID09PSBsZW5ndGgpIHtcbiAgICAgICAgaWYgKHRvTGVuID4gbGVuZ3RoKSB7XG4gICAgICAgICAgaWYgKHRvLmNoYXJDb2RlQXQodG9TdGFydCArIGkpID09PSA0NyAvKi8qLykge1xuICAgICAgICAgICAgLy8gV2UgZ2V0IGhlcmUgaWYgYGZyb21gIGlzIHRoZSBleGFjdCBiYXNlIHBhdGggZm9yIGB0b2AuXG4gICAgICAgICAgICAvLyBGb3IgZXhhbXBsZTogZnJvbT0nL2Zvby9iYXInOyB0bz0nL2Zvby9iYXIvYmF6J1xuICAgICAgICAgICAgcmV0dXJuIHRvLnNsaWNlKHRvU3RhcnQgKyBpICsgMSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChpID09PSAwKSB7XG4gICAgICAgICAgICAvLyBXZSBnZXQgaGVyZSBpZiBgZnJvbWAgaXMgdGhlIHJvb3RcbiAgICAgICAgICAgIC8vIEZvciBleGFtcGxlOiBmcm9tPScvJzsgdG89Jy9mb28nXG4gICAgICAgICAgICByZXR1cm4gdG8uc2xpY2UodG9TdGFydCArIGkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChmcm9tTGVuID4gbGVuZ3RoKSB7XG4gICAgICAgICAgaWYgKGZyb20uY2hhckNvZGVBdChmcm9tU3RhcnQgKyBpKSA9PT0gNDcgLyovKi8pIHtcbiAgICAgICAgICAgIC8vIFdlIGdldCBoZXJlIGlmIGB0b2AgaXMgdGhlIGV4YWN0IGJhc2UgcGF0aCBmb3IgYGZyb21gLlxuICAgICAgICAgICAgLy8gRm9yIGV4YW1wbGU6IGZyb209Jy9mb28vYmFyL2Jheic7IHRvPScvZm9vL2JhcidcbiAgICAgICAgICAgIGxhc3RDb21tb25TZXAgPSBpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoaSA9PT0gMCkge1xuICAgICAgICAgICAgLy8gV2UgZ2V0IGhlcmUgaWYgYHRvYCBpcyB0aGUgcm9vdC5cbiAgICAgICAgICAgIC8vIEZvciBleGFtcGxlOiBmcm9tPScvZm9vJzsgdG89Jy8nXG4gICAgICAgICAgICBsYXN0Q29tbW9uU2VwID0gMDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICB2YXIgZnJvbUNvZGUgPSBmcm9tLmNoYXJDb2RlQXQoZnJvbVN0YXJ0ICsgaSk7XG4gICAgICB2YXIgdG9Db2RlID0gdG8uY2hhckNvZGVBdCh0b1N0YXJ0ICsgaSk7XG4gICAgICBpZiAoZnJvbUNvZGUgIT09IHRvQ29kZSlcbiAgICAgICAgYnJlYWs7XG4gICAgICBlbHNlIGlmIChmcm9tQ29kZSA9PT0gNDcgLyovKi8pXG4gICAgICAgIGxhc3RDb21tb25TZXAgPSBpO1xuICAgIH1cblxuICAgIHZhciBvdXQgPSAnJztcbiAgICAvLyBHZW5lcmF0ZSB0aGUgcmVsYXRpdmUgcGF0aCBiYXNlZCBvbiB0aGUgcGF0aCBkaWZmZXJlbmNlIGJldHdlZW4gYHRvYFxuICAgIC8vIGFuZCBgZnJvbWBcbiAgICBmb3IgKGkgPSBmcm9tU3RhcnQgKyBsYXN0Q29tbW9uU2VwICsgMTsgaSA8PSBmcm9tRW5kOyArK2kpIHtcbiAgICAgIGlmIChpID09PSBmcm9tRW5kIHx8IGZyb20uY2hhckNvZGVBdChpKSA9PT0gNDcgLyovKi8pIHtcbiAgICAgICAgaWYgKG91dC5sZW5ndGggPT09IDApXG4gICAgICAgICAgb3V0ICs9ICcuLic7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICBvdXQgKz0gJy8uLic7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gTGFzdGx5LCBhcHBlbmQgdGhlIHJlc3Qgb2YgdGhlIGRlc3RpbmF0aW9uIChgdG9gKSBwYXRoIHRoYXQgY29tZXMgYWZ0ZXJcbiAgICAvLyB0aGUgY29tbW9uIHBhdGggcGFydHNcbiAgICBpZiAob3V0Lmxlbmd0aCA+IDApXG4gICAgICByZXR1cm4gb3V0ICsgdG8uc2xpY2UodG9TdGFydCArIGxhc3RDb21tb25TZXApO1xuICAgIGVsc2Uge1xuICAgICAgdG9TdGFydCArPSBsYXN0Q29tbW9uU2VwO1xuICAgICAgaWYgKHRvLmNoYXJDb2RlQXQodG9TdGFydCkgPT09IDQ3IC8qLyovKVxuICAgICAgICArK3RvU3RhcnQ7XG4gICAgICByZXR1cm4gdG8uc2xpY2UodG9TdGFydCk7XG4gICAgfVxuICB9LFxuXG4gIF9tYWtlTG9uZzogZnVuY3Rpb24gX21ha2VMb25nKHBhdGgpIHtcbiAgICByZXR1cm4gcGF0aDtcbiAgfSxcblxuICBkaXJuYW1lOiBmdW5jdGlvbiBkaXJuYW1lKHBhdGgpIHtcbiAgICBhc3NlcnRQYXRoKHBhdGgpO1xuICAgIGlmIChwYXRoLmxlbmd0aCA9PT0gMCkgcmV0dXJuICcuJztcbiAgICB2YXIgY29kZSA9IHBhdGguY2hhckNvZGVBdCgwKTtcbiAgICB2YXIgaGFzUm9vdCA9IGNvZGUgPT09IDQ3IC8qLyovO1xuICAgIHZhciBlbmQgPSAtMTtcbiAgICB2YXIgbWF0Y2hlZFNsYXNoID0gdHJ1ZTtcbiAgICBmb3IgKHZhciBpID0gcGF0aC5sZW5ndGggLSAxOyBpID49IDE7IC0taSkge1xuICAgICAgY29kZSA9IHBhdGguY2hhckNvZGVBdChpKTtcbiAgICAgIGlmIChjb2RlID09PSA0NyAvKi8qLykge1xuICAgICAgICAgIGlmICghbWF0Y2hlZFNsYXNoKSB7XG4gICAgICAgICAgICBlbmQgPSBpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBXZSBzYXcgdGhlIGZpcnN0IG5vbi1wYXRoIHNlcGFyYXRvclxuICAgICAgICBtYXRjaGVkU2xhc2ggPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZW5kID09PSAtMSkgcmV0dXJuIGhhc1Jvb3QgPyAnLycgOiAnLic7XG4gICAgaWYgKGhhc1Jvb3QgJiYgZW5kID09PSAxKSByZXR1cm4gJy8vJztcbiAgICByZXR1cm4gcGF0aC5zbGljZSgwLCBlbmQpO1xuICB9LFxuXG4gIGJhc2VuYW1lOiBmdW5jdGlvbiBiYXNlbmFtZShwYXRoLCBleHQpIHtcbiAgICBpZiAoZXh0ICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIGV4dCAhPT0gJ3N0cmluZycpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wiZXh0XCIgYXJndW1lbnQgbXVzdCBiZSBhIHN0cmluZycpO1xuICAgIGFzc2VydFBhdGgocGF0aCk7XG5cbiAgICB2YXIgc3RhcnQgPSAwO1xuICAgIHZhciBlbmQgPSAtMTtcbiAgICB2YXIgbWF0Y2hlZFNsYXNoID0gdHJ1ZTtcbiAgICB2YXIgaTtcblxuICAgIGlmIChleHQgIT09IHVuZGVmaW5lZCAmJiBleHQubGVuZ3RoID4gMCAmJiBleHQubGVuZ3RoIDw9IHBhdGgubGVuZ3RoKSB7XG4gICAgICBpZiAoZXh0Lmxlbmd0aCA9PT0gcGF0aC5sZW5ndGggJiYgZXh0ID09PSBwYXRoKSByZXR1cm4gJyc7XG4gICAgICB2YXIgZXh0SWR4ID0gZXh0Lmxlbmd0aCAtIDE7XG4gICAgICB2YXIgZmlyc3ROb25TbGFzaEVuZCA9IC0xO1xuICAgICAgZm9yIChpID0gcGF0aC5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgY29kZSA9IHBhdGguY2hhckNvZGVBdChpKTtcbiAgICAgICAgaWYgKGNvZGUgPT09IDQ3IC8qLyovKSB7XG4gICAgICAgICAgICAvLyBJZiB3ZSByZWFjaGVkIGEgcGF0aCBzZXBhcmF0b3IgdGhhdCB3YXMgbm90IHBhcnQgb2YgYSBzZXQgb2YgcGF0aFxuICAgICAgICAgICAgLy8gc2VwYXJhdG9ycyBhdCB0aGUgZW5kIG9mIHRoZSBzdHJpbmcsIHN0b3Agbm93XG4gICAgICAgICAgICBpZiAoIW1hdGNoZWRTbGFzaCkge1xuICAgICAgICAgICAgICBzdGFydCA9IGkgKyAxO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChmaXJzdE5vblNsYXNoRW5kID09PSAtMSkge1xuICAgICAgICAgICAgLy8gV2Ugc2F3IHRoZSBmaXJzdCBub24tcGF0aCBzZXBhcmF0b3IsIHJlbWVtYmVyIHRoaXMgaW5kZXggaW4gY2FzZVxuICAgICAgICAgICAgLy8gd2UgbmVlZCBpdCBpZiB0aGUgZXh0ZW5zaW9uIGVuZHMgdXAgbm90IG1hdGNoaW5nXG4gICAgICAgICAgICBtYXRjaGVkU2xhc2ggPSBmYWxzZTtcbiAgICAgICAgICAgIGZpcnN0Tm9uU2xhc2hFbmQgPSBpICsgMTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGV4dElkeCA+PSAwKSB7XG4gICAgICAgICAgICAvLyBUcnkgdG8gbWF0Y2ggdGhlIGV4cGxpY2l0IGV4dGVuc2lvblxuICAgICAgICAgICAgaWYgKGNvZGUgPT09IGV4dC5jaGFyQ29kZUF0KGV4dElkeCkpIHtcbiAgICAgICAgICAgICAgaWYgKC0tZXh0SWR4ID09PSAtMSkge1xuICAgICAgICAgICAgICAgIC8vIFdlIG1hdGNoZWQgdGhlIGV4dGVuc2lvbiwgc28gbWFyayB0aGlzIGFzIHRoZSBlbmQgb2Ygb3VyIHBhdGhcbiAgICAgICAgICAgICAgICAvLyBjb21wb25lbnRcbiAgICAgICAgICAgICAgICBlbmQgPSBpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyBFeHRlbnNpb24gZG9lcyBub3QgbWF0Y2gsIHNvIG91ciByZXN1bHQgaXMgdGhlIGVudGlyZSBwYXRoXG4gICAgICAgICAgICAgIC8vIGNvbXBvbmVudFxuICAgICAgICAgICAgICBleHRJZHggPSAtMTtcbiAgICAgICAgICAgICAgZW5kID0gZmlyc3ROb25TbGFzaEVuZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXJ0ID09PSBlbmQpIGVuZCA9IGZpcnN0Tm9uU2xhc2hFbmQ7ZWxzZSBpZiAoZW5kID09PSAtMSkgZW5kID0gcGF0aC5sZW5ndGg7XG4gICAgICByZXR1cm4gcGF0aC5zbGljZShzdGFydCwgZW5kKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChpID0gcGF0aC5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICBpZiAocGF0aC5jaGFyQ29kZUF0KGkpID09PSA0NyAvKi8qLykge1xuICAgICAgICAgICAgLy8gSWYgd2UgcmVhY2hlZCBhIHBhdGggc2VwYXJhdG9yIHRoYXQgd2FzIG5vdCBwYXJ0IG9mIGEgc2V0IG9mIHBhdGhcbiAgICAgICAgICAgIC8vIHNlcGFyYXRvcnMgYXQgdGhlIGVuZCBvZiB0aGUgc3RyaW5nLCBzdG9wIG5vd1xuICAgICAgICAgICAgaWYgKCFtYXRjaGVkU2xhc2gpIHtcbiAgICAgICAgICAgICAgc3RhcnQgPSBpICsgMTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChlbmQgPT09IC0xKSB7XG4gICAgICAgICAgLy8gV2Ugc2F3IHRoZSBmaXJzdCBub24tcGF0aCBzZXBhcmF0b3IsIG1hcmsgdGhpcyBhcyB0aGUgZW5kIG9mIG91clxuICAgICAgICAgIC8vIHBhdGggY29tcG9uZW50XG4gICAgICAgICAgbWF0Y2hlZFNsYXNoID0gZmFsc2U7XG4gICAgICAgICAgZW5kID0gaSArIDE7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGVuZCA9PT0gLTEpIHJldHVybiAnJztcbiAgICAgIHJldHVybiBwYXRoLnNsaWNlKHN0YXJ0LCBlbmQpO1xuICAgIH1cbiAgfSxcblxuICBleHRuYW1lOiBmdW5jdGlvbiBleHRuYW1lKHBhdGgpIHtcbiAgICBhc3NlcnRQYXRoKHBhdGgpO1xuICAgIHZhciBzdGFydERvdCA9IC0xO1xuICAgIHZhciBzdGFydFBhcnQgPSAwO1xuICAgIHZhciBlbmQgPSAtMTtcbiAgICB2YXIgbWF0Y2hlZFNsYXNoID0gdHJ1ZTtcbiAgICAvLyBUcmFjayB0aGUgc3RhdGUgb2YgY2hhcmFjdGVycyAoaWYgYW55KSB3ZSBzZWUgYmVmb3JlIG91ciBmaXJzdCBkb3QgYW5kXG4gICAgLy8gYWZ0ZXIgYW55IHBhdGggc2VwYXJhdG9yIHdlIGZpbmRcbiAgICB2YXIgcHJlRG90U3RhdGUgPSAwO1xuICAgIGZvciAodmFyIGkgPSBwYXRoLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICB2YXIgY29kZSA9IHBhdGguY2hhckNvZGVBdChpKTtcbiAgICAgIGlmIChjb2RlID09PSA0NyAvKi8qLykge1xuICAgICAgICAgIC8vIElmIHdlIHJlYWNoZWQgYSBwYXRoIHNlcGFyYXRvciB0aGF0IHdhcyBub3QgcGFydCBvZiBhIHNldCBvZiBwYXRoXG4gICAgICAgICAgLy8gc2VwYXJhdG9ycyBhdCB0aGUgZW5kIG9mIHRoZSBzdHJpbmcsIHN0b3Agbm93XG4gICAgICAgICAgaWYgKCFtYXRjaGVkU2xhc2gpIHtcbiAgICAgICAgICAgIHN0YXJ0UGFydCA9IGkgKyAxO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICBpZiAoZW5kID09PSAtMSkge1xuICAgICAgICAvLyBXZSBzYXcgdGhlIGZpcnN0IG5vbi1wYXRoIHNlcGFyYXRvciwgbWFyayB0aGlzIGFzIHRoZSBlbmQgb2Ygb3VyXG4gICAgICAgIC8vIGV4dGVuc2lvblxuICAgICAgICBtYXRjaGVkU2xhc2ggPSBmYWxzZTtcbiAgICAgICAgZW5kID0gaSArIDE7XG4gICAgICB9XG4gICAgICBpZiAoY29kZSA9PT0gNDYgLyouKi8pIHtcbiAgICAgICAgICAvLyBJZiB0aGlzIGlzIG91ciBmaXJzdCBkb3QsIG1hcmsgaXQgYXMgdGhlIHN0YXJ0IG9mIG91ciBleHRlbnNpb25cbiAgICAgICAgICBpZiAoc3RhcnREb3QgPT09IC0xKVxuICAgICAgICAgICAgc3RhcnREb3QgPSBpO1xuICAgICAgICAgIGVsc2UgaWYgKHByZURvdFN0YXRlICE9PSAxKVxuICAgICAgICAgICAgcHJlRG90U3RhdGUgPSAxO1xuICAgICAgfSBlbHNlIGlmIChzdGFydERvdCAhPT0gLTEpIHtcbiAgICAgICAgLy8gV2Ugc2F3IGEgbm9uLWRvdCBhbmQgbm9uLXBhdGggc2VwYXJhdG9yIGJlZm9yZSBvdXIgZG90LCBzbyB3ZSBzaG91bGRcbiAgICAgICAgLy8gaGF2ZSBhIGdvb2QgY2hhbmNlIGF0IGhhdmluZyBhIG5vbi1lbXB0eSBleHRlbnNpb25cbiAgICAgICAgcHJlRG90U3RhdGUgPSAtMTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc3RhcnREb3QgPT09IC0xIHx8IGVuZCA9PT0gLTEgfHxcbiAgICAgICAgLy8gV2Ugc2F3IGEgbm9uLWRvdCBjaGFyYWN0ZXIgaW1tZWRpYXRlbHkgYmVmb3JlIHRoZSBkb3RcbiAgICAgICAgcHJlRG90U3RhdGUgPT09IDAgfHxcbiAgICAgICAgLy8gVGhlIChyaWdodC1tb3N0KSB0cmltbWVkIHBhdGggY29tcG9uZW50IGlzIGV4YWN0bHkgJy4uJ1xuICAgICAgICBwcmVEb3RTdGF0ZSA9PT0gMSAmJiBzdGFydERvdCA9PT0gZW5kIC0gMSAmJiBzdGFydERvdCA9PT0gc3RhcnRQYXJ0ICsgMSkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICByZXR1cm4gcGF0aC5zbGljZShzdGFydERvdCwgZW5kKTtcbiAgfSxcblxuICBmb3JtYXQ6IGZ1bmN0aW9uIGZvcm1hdChwYXRoT2JqZWN0KSB7XG4gICAgaWYgKHBhdGhPYmplY3QgPT09IG51bGwgfHwgdHlwZW9mIHBhdGhPYmplY3QgIT09ICdvYmplY3QnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJwYXRoT2JqZWN0XCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIE9iamVjdC4gUmVjZWl2ZWQgdHlwZSAnICsgdHlwZW9mIHBhdGhPYmplY3QpO1xuICAgIH1cbiAgICByZXR1cm4gX2Zvcm1hdCgnLycsIHBhdGhPYmplY3QpO1xuICB9LFxuXG4gIHBhcnNlOiBmdW5jdGlvbiBwYXJzZShwYXRoKSB7XG4gICAgYXNzZXJ0UGF0aChwYXRoKTtcblxuICAgIHZhciByZXQgPSB7IHJvb3Q6ICcnLCBkaXI6ICcnLCBiYXNlOiAnJywgZXh0OiAnJywgbmFtZTogJycgfTtcbiAgICBpZiAocGF0aC5sZW5ndGggPT09IDApIHJldHVybiByZXQ7XG4gICAgdmFyIGNvZGUgPSBwYXRoLmNoYXJDb2RlQXQoMCk7XG4gICAgdmFyIGlzQWJzb2x1dGUgPSBjb2RlID09PSA0NyAvKi8qLztcbiAgICB2YXIgc3RhcnQ7XG4gICAgaWYgKGlzQWJzb2x1dGUpIHtcbiAgICAgIHJldC5yb290ID0gJy8nO1xuICAgICAgc3RhcnQgPSAxO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdGFydCA9IDA7XG4gICAgfVxuICAgIHZhciBzdGFydERvdCA9IC0xO1xuICAgIHZhciBzdGFydFBhcnQgPSAwO1xuICAgIHZhciBlbmQgPSAtMTtcbiAgICB2YXIgbWF0Y2hlZFNsYXNoID0gdHJ1ZTtcbiAgICB2YXIgaSA9IHBhdGgubGVuZ3RoIC0gMTtcblxuICAgIC8vIFRyYWNrIHRoZSBzdGF0ZSBvZiBjaGFyYWN0ZXJzIChpZiBhbnkpIHdlIHNlZSBiZWZvcmUgb3VyIGZpcnN0IGRvdCBhbmRcbiAgICAvLyBhZnRlciBhbnkgcGF0aCBzZXBhcmF0b3Igd2UgZmluZFxuICAgIHZhciBwcmVEb3RTdGF0ZSA9IDA7XG5cbiAgICAvLyBHZXQgbm9uLWRpciBpbmZvXG4gICAgZm9yICg7IGkgPj0gc3RhcnQ7IC0taSkge1xuICAgICAgY29kZSA9IHBhdGguY2hhckNvZGVBdChpKTtcbiAgICAgIGlmIChjb2RlID09PSA0NyAvKi8qLykge1xuICAgICAgICAgIC8vIElmIHdlIHJlYWNoZWQgYSBwYXRoIHNlcGFyYXRvciB0aGF0IHdhcyBub3QgcGFydCBvZiBhIHNldCBvZiBwYXRoXG4gICAgICAgICAgLy8gc2VwYXJhdG9ycyBhdCB0aGUgZW5kIG9mIHRoZSBzdHJpbmcsIHN0b3Agbm93XG4gICAgICAgICAgaWYgKCFtYXRjaGVkU2xhc2gpIHtcbiAgICAgICAgICAgIHN0YXJ0UGFydCA9IGkgKyAxO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICBpZiAoZW5kID09PSAtMSkge1xuICAgICAgICAvLyBXZSBzYXcgdGhlIGZpcnN0IG5vbi1wYXRoIHNlcGFyYXRvciwgbWFyayB0aGlzIGFzIHRoZSBlbmQgb2Ygb3VyXG4gICAgICAgIC8vIGV4dGVuc2lvblxuICAgICAgICBtYXRjaGVkU2xhc2ggPSBmYWxzZTtcbiAgICAgICAgZW5kID0gaSArIDE7XG4gICAgICB9XG4gICAgICBpZiAoY29kZSA9PT0gNDYgLyouKi8pIHtcbiAgICAgICAgICAvLyBJZiB0aGlzIGlzIG91ciBmaXJzdCBkb3QsIG1hcmsgaXQgYXMgdGhlIHN0YXJ0IG9mIG91ciBleHRlbnNpb25cbiAgICAgICAgICBpZiAoc3RhcnREb3QgPT09IC0xKSBzdGFydERvdCA9IGk7ZWxzZSBpZiAocHJlRG90U3RhdGUgIT09IDEpIHByZURvdFN0YXRlID0gMTtcbiAgICAgICAgfSBlbHNlIGlmIChzdGFydERvdCAhPT0gLTEpIHtcbiAgICAgICAgLy8gV2Ugc2F3IGEgbm9uLWRvdCBhbmQgbm9uLXBhdGggc2VwYXJhdG9yIGJlZm9yZSBvdXIgZG90LCBzbyB3ZSBzaG91bGRcbiAgICAgICAgLy8gaGF2ZSBhIGdvb2QgY2hhbmNlIGF0IGhhdmluZyBhIG5vbi1lbXB0eSBleHRlbnNpb25cbiAgICAgICAgcHJlRG90U3RhdGUgPSAtMTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc3RhcnREb3QgPT09IC0xIHx8IGVuZCA9PT0gLTEgfHxcbiAgICAvLyBXZSBzYXcgYSBub24tZG90IGNoYXJhY3RlciBpbW1lZGlhdGVseSBiZWZvcmUgdGhlIGRvdFxuICAgIHByZURvdFN0YXRlID09PSAwIHx8XG4gICAgLy8gVGhlIChyaWdodC1tb3N0KSB0cmltbWVkIHBhdGggY29tcG9uZW50IGlzIGV4YWN0bHkgJy4uJ1xuICAgIHByZURvdFN0YXRlID09PSAxICYmIHN0YXJ0RG90ID09PSBlbmQgLSAxICYmIHN0YXJ0RG90ID09PSBzdGFydFBhcnQgKyAxKSB7XG4gICAgICBpZiAoZW5kICE9PSAtMSkge1xuICAgICAgICBpZiAoc3RhcnRQYXJ0ID09PSAwICYmIGlzQWJzb2x1dGUpIHJldC5iYXNlID0gcmV0Lm5hbWUgPSBwYXRoLnNsaWNlKDEsIGVuZCk7ZWxzZSByZXQuYmFzZSA9IHJldC5uYW1lID0gcGF0aC5zbGljZShzdGFydFBhcnQsIGVuZCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChzdGFydFBhcnQgPT09IDAgJiYgaXNBYnNvbHV0ZSkge1xuICAgICAgICByZXQubmFtZSA9IHBhdGguc2xpY2UoMSwgc3RhcnREb3QpO1xuICAgICAgICByZXQuYmFzZSA9IHBhdGguc2xpY2UoMSwgZW5kKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldC5uYW1lID0gcGF0aC5zbGljZShzdGFydFBhcnQsIHN0YXJ0RG90KTtcbiAgICAgICAgcmV0LmJhc2UgPSBwYXRoLnNsaWNlKHN0YXJ0UGFydCwgZW5kKTtcbiAgICAgIH1cbiAgICAgIHJldC5leHQgPSBwYXRoLnNsaWNlKHN0YXJ0RG90LCBlbmQpO1xuICAgIH1cblxuICAgIGlmIChzdGFydFBhcnQgPiAwKSByZXQuZGlyID0gcGF0aC5zbGljZSgwLCBzdGFydFBhcnQgLSAxKTtlbHNlIGlmIChpc0Fic29sdXRlKSByZXQuZGlyID0gJy8nO1xuXG4gICAgcmV0dXJuIHJldDtcbiAgfSxcblxuICBzZXA6ICcvJyxcbiAgZGVsaW1pdGVyOiAnOicsXG4gIHdpbjMyOiBudWxsLFxuICBwb3NpeDogbnVsbFxufTtcblxucG9zaXgucG9zaXggPSBwb3NpeDtcblxubW9kdWxlLmV4cG9ydHMgPSBwb3NpeDtcbiIsICJpbXBvcnQgeyBXZWJQbHVnaW4gfSBmcm9tICdAY2FwYWNpdG9yL2NvcmUnO1xuaW1wb3J0IHR5cGUgeyBDYXBhY2l0b3JFeGNlcHRpb24gfSBmcm9tICdAY2FwYWNpdG9yL2NvcmUnO1xuXG5pbXBvcnQgdHlwZSB7IENhcGFjaXRvck5vZGVKU1BsdWdpbiB9IGZyb20gJy4vaW1wbGVtZW50YXRpb24nO1xuXG5leHBvcnQgY2xhc3MgQ2FwYWNpdG9yTm9kZUpTV2ViIGV4dGVuZHMgV2ViUGx1Z2luIGltcGxlbWVudHMgQ2FwYWNpdG9yTm9kZUpTUGx1Z2luIHtcbiAgcHJvdGVjdGVkIHVuYXZhaWxhYmxlTm9kZUpTKCk6IENhcGFjaXRvckV4Y2VwdGlvbiB7XG4gICAgcmV0dXJuIHRoaXMudW5hdmFpbGFibGUoJ1RoZSBOb2RlSlMgZW5naW5lIGlzIG5vdCBhdmFpbGFibGUgaW4gdGhlIGJyb3dzZXIhJyk7XG4gIH1cblxuICBzdGFydCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0aHJvdyB0aGlzLnVuYXZhaWxhYmxlTm9kZUpTKCk7XG4gIH1cblxuICBzZW5kKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRocm93IHRoaXMudW5hdmFpbGFibGVOb2RlSlMoKTtcbiAgfVxuXG4gIHdoZW5SZWFkeSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0aHJvdyB0aGlzLnVuYXZhaWxhYmxlTm9kZUpTKCk7XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBJUGxhdGZvcm0gfSBmcm9tIFwiLi9JUGxhdGZvcm1cIjtcblxuZXhwb3J0IGNsYXNzIFBsYXRmb3JtTWFuYWdlciB7XG4gICAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IElQbGF0Zm9ybTtcblxuICAgIHB1YmxpYyBzdGF0aWMgc2V0UGxhdGZvcm0ocGxhdGZvcm06IElQbGF0Zm9ybSk6IHZvaWQge1xuICAgICAgICB0aGlzLmluc3RhbmNlID0gcGxhdGZvcm07XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXQgY3VycmVudCgpOiBJUGxhdGZvcm0ge1xuICAgICAgICBpZiAoIXRoaXMuaW5zdGFuY2UpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlBsYXRmb3JtIG5vdCBpbml0aWFsaXplZC4gQ2FsbCBQbGF0Zm9ybU1hbmFnZXIuc2V0UGxhdGZvcm0oKSBmaXJzdC5cIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gICAgfVxufVxuIiwgImltcG9ydCB7IHJlZ2lzdGVyUGx1Z2luIH0gZnJvbSAnQGNhcGFjaXRvci9jb3JlJztcbmltcG9ydCB7IGV4cG9zZVN5bmFwc2UgfSBmcm9tICdAY2FwYWNpdG9yL3N5bmFwc2UnO1xuXG5pbXBvcnQgdHlwZSB7IEZpbGVzeXN0ZW1QbHVnaW4gfSBmcm9tICcuL2RlZmluaXRpb25zJztcblxuY29uc3QgRmlsZXN5c3RlbSA9IHJlZ2lzdGVyUGx1Z2luPEZpbGVzeXN0ZW1QbHVnaW4+KCdGaWxlc3lzdGVtJywge1xuICB3ZWI6ICgpID0+IGltcG9ydCgnLi93ZWInKS50aGVuKChtKSA9PiBuZXcgbS5GaWxlc3lzdGVtV2ViKCkpLFxufSk7XG5cbmV4cG9zZVN5bmFwc2UoKTtcblxuZXhwb3J0ICogZnJvbSAnLi9kZWZpbml0aW9ucyc7XG5leHBvcnQgeyBGaWxlc3lzdGVtIH07XG4iLCAiZnVuY3Rpb24gcyh0KSB7XG4gIHQuQ2FwYWNpdG9yVXRpbHMuU3luYXBzZSA9IG5ldyBQcm94eShcbiAgICB7fSxcbiAgICB7XG4gICAgICBnZXQoZSwgbikge1xuICAgICAgICByZXR1cm4gbmV3IFByb3h5KHt9LCB7XG4gICAgICAgICAgZ2V0KHcsIG8pIHtcbiAgICAgICAgICAgIHJldHVybiAoYywgcCwgcikgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBpID0gdC5DYXBhY2l0b3IuUGx1Z2luc1tuXTtcbiAgICAgICAgICAgICAgaWYgKGkgPT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICAgIHIobmV3IEVycm9yKGBDYXBhY2l0b3IgcGx1Z2luICR7bn0gbm90IGZvdW5kYCkpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAodHlwZW9mIGlbb10gIT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgcihuZXcgRXJyb3IoYE1ldGhvZCAke299IG5vdCBmb3VuZCBpbiBDYXBhY2l0b3IgcGx1Z2luICR7bn1gKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGEgPSBhd2FpdCBpW29dKGMpO1xuICAgICAgICAgICAgICAgICAgcChhKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChhKSB7XG4gICAgICAgICAgICAgICAgICByKGEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gICk7XG59XG5mdW5jdGlvbiB1KHQpIHtcbiAgdC5DYXBhY2l0b3JVdGlscy5TeW5hcHNlID0gbmV3IFByb3h5KFxuICAgIHt9LFxuICAgIHtcbiAgICAgIGdldChlLCBuKSB7XG4gICAgICAgIHJldHVybiB0LmNvcmRvdmEucGx1Z2luc1tuXTtcbiAgICAgIH1cbiAgICB9XG4gICk7XG59XG5mdW5jdGlvbiBmKHQgPSAhMSkge1xuICB0eXBlb2Ygd2luZG93ID4gXCJ1XCIgfHwgKHdpbmRvdy5DYXBhY2l0b3JVdGlscyA9IHdpbmRvdy5DYXBhY2l0b3JVdGlscyB8fCB7fSwgd2luZG93LkNhcGFjaXRvciAhPT0gdm9pZCAwICYmICF0ID8gcyh3aW5kb3cpIDogd2luZG93LmNvcmRvdmEgIT09IHZvaWQgMCAmJiB1KHdpbmRvdykpO1xufVxuZXhwb3J0IHtcbiAgZiBhcyBleHBvc2VTeW5hcHNlXG59O1xuIiwgImltcG9ydCB7IHJlZ2lzdGVyUGx1Z2luIH0gZnJvbSAnQGNhcGFjaXRvci9jb3JlJztcblxuaW1wb3J0IHR5cGUgeyBCcm93c2VyUGx1Z2luIH0gZnJvbSAnLi9kZWZpbml0aW9ucyc7XG5cbmNvbnN0IEJyb3dzZXIgPSByZWdpc3RlclBsdWdpbjxCcm93c2VyUGx1Z2luPignQnJvd3NlcicsIHtcbiAgd2ViOiAoKSA9PiBpbXBvcnQoJy4vd2ViJykudGhlbigobSkgPT4gbmV3IG0uQnJvd3NlcldlYigpKSxcbn0pO1xuXG5leHBvcnQgKiBmcm9tICcuL2RlZmluaXRpb25zJztcbmV4cG9ydCB7IEJyb3dzZXIgfTtcbiIsICJpbXBvcnQgeyBJUGxhdGZvcm0sIEZpbGVTdGF0IH0gZnJvbSBcIi4vSVBsYXRmb3JtXCI7XG5pbXBvcnQgeyBGaWxlc3lzdGVtLCBEaXJlY3RvcnksIEVuY29kaW5nIH0gZnJvbSBcIkBjYXBhY2l0b3IvZmlsZXN5c3RlbVwiO1xuaW1wb3J0IHsgQnJvd3NlciB9IGZyb20gXCJAY2FwYWNpdG9yL2Jyb3dzZXJcIjtcblxuaW50ZXJmYWNlIEFuZHJvaWRCcmlkZ2Uge1xuICAgIG9wZW5QYXRoKHBhdGg6IHN0cmluZyk6IHZvaWQ7XG4gICAgaXNQaWN0dXJlSW5QaWN0dXJlU3VwcG9ydGVkKCk6IGJvb2xlYW47XG4gICAgZW50ZXJQaWN0dXJlSW5QaWN0dXJlKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKTogYm9vbGVhbjtcbiAgICBzZXRQaWN0dXJlSW5QaWN0dXJlU3RhdGUoZW5hYmxlZDogYm9vbGVhbiwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpOiB2b2lkO1xufVxuXG5kZWNsYXJlIGdsb2JhbCB7XG4gICAgaW50ZXJmYWNlIFdpbmRvdyB7XG4gICAgICAgIFN0cmVtaW9FbmhhbmNlZEFuZHJvaWQ/OiBBbmRyb2lkQnJpZGdlO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIENhcGFjaXRvclBsYXRmb3JtIGltcGxlbWVudHMgSVBsYXRmb3JtIHtcbiAgICBpZDogXCJjYXBhY2l0b3JcIiA9IFwiY2FwYWNpdG9yXCI7XG4gICAgcHJpdmF0ZSByZWFkb25seSBlbmhhbmNlZFBhdGggPSBcIlN0cmVtaW8gRW5oYW5jZWRcIjtcbiAgICBwcml2YXRlIHJlYWRvbmx5IHRoZW1lc1BhdGggPSBgJHt0aGlzLmVuaGFuY2VkUGF0aH0vdGhlbWVzYDtcbiAgICBwcml2YXRlIHJlYWRvbmx5IHBsdWdpbnNQYXRoID0gYCR7dGhpcy5lbmhhbmNlZFBhdGh9L3BsdWdpbnNgO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgbG9nc1BhdGggPSBgJHt0aGlzLmVuaGFuY2VkUGF0aH0vbG9nc2A7XG5cbiAgICBwcml2YXRlIGlzRXh0ZXJuYWxQYXRoKHBhdGg6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gcGF0aC5zdGFydHNXaXRoKFwiZmlsZTovL1wiKSB8fCBwYXRoLnN0YXJ0c1dpdGgoXCJjb250ZW50Oi8vXCIpIHx8IHBhdGguc3RhcnRzV2l0aChcIi9cIik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXREaXJlY3RvcnkocGF0aDogc3RyaW5nKTogRGlyZWN0b3J5IHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNFeHRlcm5hbFBhdGgocGF0aCkgPyB1bmRlZmluZWQgOiBEaXJlY3RvcnkuRG9jdW1lbnRzO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0RmlsZU9wdGlvbnMocGF0aDogc3RyaW5nLCBlbmNvZGluZz86IEVuY29kaW5nKToge1xuICAgICAgICBwYXRoOiBzdHJpbmc7XG4gICAgICAgIGRpcmVjdG9yeT86IERpcmVjdG9yeTtcbiAgICAgICAgZW5jb2Rpbmc/OiBFbmNvZGluZztcbiAgICB9IHtcbiAgICAgICAgY29uc3Qgb3B0aW9uczoge1xuICAgICAgICAgICAgcGF0aDogc3RyaW5nO1xuICAgICAgICAgICAgZGlyZWN0b3J5PzogRGlyZWN0b3J5O1xuICAgICAgICAgICAgZW5jb2Rpbmc/OiBFbmNvZGluZztcbiAgICAgICAgfSA9IHsgcGF0aCB9O1xuXG4gICAgICAgIGNvbnN0IGRpcmVjdG9yeSA9IHRoaXMuZ2V0RGlyZWN0b3J5KHBhdGgpO1xuICAgICAgICBpZiAoZGlyZWN0b3J5KSB7XG4gICAgICAgICAgICBvcHRpb25zLmRpcmVjdG9yeSA9IGRpcmVjdG9yeTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbmNvZGluZykge1xuICAgICAgICAgICAgb3B0aW9ucy5lbmNvZGluZyA9IGVuY29kaW5nO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9wdGlvbnM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBleGlzdHNJbkRpcmVjdG9yeShwYXRoOiBzdHJpbmcsIGRpcmVjdG9yeTogRGlyZWN0b3J5KTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCBGaWxlc3lzdGVtLnN0YXQoeyBwYXRoLCBkaXJlY3RvcnkgfSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIHJlYWRkaXJJbkRpcmVjdG9yeShwYXRoOiBzdHJpbmcsIGRpcmVjdG9yeTogRGlyZWN0b3J5KTogUHJvbWlzZTxzdHJpbmdbXT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgRmlsZXN5c3RlbS5yZWFkZGlyKHsgcGF0aCwgZGlyZWN0b3J5IH0pO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5maWxlcy5tYXAoZmlsZSA9PiBmaWxlLm5hbWUpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgICAgICAgICBpZiAoZXJyb3I/Lm1lc3NhZ2U/LmluY2x1ZGVzKFwiZG9lcyBub3QgZXhpc3RcIikpIHJldHVybiBbXTtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gcmVhZGRpcjpcIiwgZXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBtaWdyYXRlTGVnYWN5RGlyZWN0b3J5KG9sZFBhdGg6IHN0cmluZywgbmV3UGF0aDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGNvbnN0IGxlZ2FjeUZpbGVzID0gYXdhaXQgdGhpcy5yZWFkZGlySW5EaXJlY3Rvcnkob2xkUGF0aCwgRGlyZWN0b3J5LkRhdGEpO1xuICAgICAgICBpZiAoIWxlZ2FjeUZpbGVzLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgICAgIGF3YWl0IHRoaXMubWtkaXIobmV3UGF0aCk7XG4gICAgICAgIGNvbnN0IG1pZ3JhdGVkRmlsZXMgPSBuZXcgU2V0KGF3YWl0IHRoaXMucmVhZGRpcihuZXdQYXRoKSk7XG5cbiAgICAgICAgZm9yIChjb25zdCBmaWxlTmFtZSBvZiBsZWdhY3lGaWxlcykge1xuICAgICAgICAgICAgaWYgKG1pZ3JhdGVkRmlsZXMuaGFzKGZpbGVOYW1lKSkgY29udGludWU7XG5cbiAgICAgICAgICAgIGNvbnN0IGxlZ2FjeVBhdGggPSBgJHtvbGRQYXRofS8ke2ZpbGVOYW1lfWA7XG4gICAgICAgICAgICBjb25zdCBsZWdhY3lTdGF0ID0gYXdhaXQgRmlsZXN5c3RlbS5zdGF0KHtcbiAgICAgICAgICAgICAgICBwYXRoOiBsZWdhY3lQYXRoLFxuICAgICAgICAgICAgICAgIGRpcmVjdG9yeTogRGlyZWN0b3J5LkRhdGFcbiAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IG51bGwpO1xuXG4gICAgICAgICAgICBpZiAoIWxlZ2FjeVN0YXQgfHwgbGVnYWN5U3RhdC50eXBlICE9PSBcImZpbGVcIikgY29udGludWU7XG5cbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSBhd2FpdCBGaWxlc3lzdGVtLnJlYWRGaWxlKHtcbiAgICAgICAgICAgICAgICBwYXRoOiBsZWdhY3lQYXRoLFxuICAgICAgICAgICAgICAgIGRpcmVjdG9yeTogRGlyZWN0b3J5LkRhdGEsXG4gICAgICAgICAgICAgICAgZW5jb2Rpbmc6IEVuY29kaW5nLlVURjhcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBhd2FpdCBGaWxlc3lzdGVtLndyaXRlRmlsZSh7XG4gICAgICAgICAgICAgICAgcGF0aDogYCR7bmV3UGF0aH0vJHtmaWxlTmFtZX1gLFxuICAgICAgICAgICAgICAgIGRpcmVjdG9yeTogRGlyZWN0b3J5LkRvY3VtZW50cyxcbiAgICAgICAgICAgICAgICBkYXRhOiBjb250ZW50LmRhdGEgYXMgc3RyaW5nLFxuICAgICAgICAgICAgICAgIGVuY29kaW5nOiBFbmNvZGluZy5VVEY4XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgZW5zdXJlUGVybWlzc2lvbnMoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGF3YWl0IFByb21pc2UuYWxsU2V0dGxlZChbXG4gICAgICAgICAgICBGaWxlc3lzdGVtLnJlcXVlc3RQZXJtaXNzaW9ucygpXG4gICAgICAgIF0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0QW5kcm9pZEJyaWRnZSgpOiBBbmRyb2lkQnJpZGdlIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIgPyB1bmRlZmluZWQgOiB3aW5kb3cuU3RyZW1pb0VuaGFuY2VkQW5kcm9pZDtcbiAgICB9XG5cbiAgICBhc3luYyByZWFkRmlsZShwYXRoOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBGaWxlc3lzdGVtLnJlYWRGaWxlKHRoaXMuZ2V0RmlsZU9wdGlvbnMocGF0aCwgRW5jb2RpbmcuVVRGOCkpO1xuICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGEgYXMgc3RyaW5nO1xuICAgIH1cblxuICAgIGFzeW5jIHdyaXRlRmlsZShwYXRoOiBzdHJpbmcsIGNvbnRlbnQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBhd2FpdCBGaWxlc3lzdGVtLndyaXRlRmlsZSh7XG4gICAgICAgICAgICAuLi50aGlzLmdldEZpbGVPcHRpb25zKHBhdGgsIEVuY29kaW5nLlVURjgpLFxuICAgICAgICAgICAgZGF0YTogY29udGVudFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhc3luYyByZWFkZGlyKHBhdGg6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nW10+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IEZpbGVzeXN0ZW0ucmVhZGRpcih0aGlzLmdldEZpbGVPcHRpb25zKHBhdGgpKTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQuZmlsZXMubWFwKGYgPT4gZi5uYW1lKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgICAgICAgICAgaWYgKGVycm9yPy5tZXNzYWdlPy5pbmNsdWRlcyhcImRvZXMgbm90IGV4aXN0XCIpKSByZXR1cm4gW107XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIHJlYWRkaXI6XCIsIGVycm9yKTtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIGV4aXN0cyhwYXRoOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF3YWl0IEZpbGVzeXN0ZW0uc3RhdCh0aGlzLmdldEZpbGVPcHRpb25zKHBhdGgpKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIHVubGluayhwYXRoOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgYXdhaXQgRmlsZXN5c3RlbS5kZWxldGVGaWxlKHRoaXMuZ2V0RmlsZU9wdGlvbnMocGF0aCkpO1xuICAgIH1cblxuICAgIGFzeW5jIG1rZGlyKHBhdGg6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBpZiAoYXdhaXQgdGhpcy5leGlzdHMocGF0aCkpIHJldHVybjtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgYXdhaXQgRmlsZXN5c3RlbS5ta2Rpcih7XG4gICAgICAgICAgICAgICAgLi4udGhpcy5nZXRGaWxlT3B0aW9ucyhwYXRoKSxcbiAgICAgICAgICAgICAgICByZWN1cnNpdmU6IHRydWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgICAgICAgICAvLyBJZ25vcmUgZXJyb3IgaWYgZGlyZWN0b3J5IGFscmVhZHkgZXhpc3RzXG4gICAgICAgICAgICBpZiAoZXJyb3I/Lm1lc3NhZ2U/LmluY2x1ZGVzKFwiYWxyZWFkeSBleGlzdHNcIikgfHwgYXdhaXQgdGhpcy5leGlzdHMocGF0aCkpIHJldHVybjtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gY3JlYXRlIGRpcmVjdG9yeTpcIiwgZXJyb3IpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgc3RhdChwYXRoOiBzdHJpbmcpOiBQcm9taXNlPEZpbGVTdGF0PiB7XG4gICAgICAgIGNvbnN0IHN0YXQgPSBhd2FpdCBGaWxlc3lzdGVtLnN0YXQodGhpcy5nZXRGaWxlT3B0aW9ucyhwYXRoKSk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpc0ZpbGU6IHN0YXQudHlwZSA9PT0gJ2ZpbGUnLFxuICAgICAgICAgICAgaXNEaXJlY3Rvcnk6IHN0YXQudHlwZSA9PT0gJ2RpcmVjdG9yeSdcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBhc3luYyBvcGVuUGF0aChwYXRoOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgY29uc3QgYnJpZGdlID0gdGhpcy5nZXRBbmRyb2lkQnJpZGdlKCk7XG4gICAgICAgIGlmIChicmlkZ2UpIHtcbiAgICAgICAgICAgIGJyaWRnZS5vcGVuUGF0aChwYXRoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnNvbGUuaW5mbyhcIk9wZW4gdGhpcyBmb2xkZXIgZnJvbSB5b3VyIEZpbGVzIGFwcDpcIiwgcGF0aCk7XG4gICAgfVxuXG4gICAgYXN5bmMgb3BlbkV4dGVybmFsKHVybDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGF3YWl0IEJyb3dzZXIub3Blbih7IHVybCB9KTtcbiAgICB9XG5cbiAgICBpc1BpY3R1cmVJblBpY3R1cmVTdXBwb3J0ZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEFuZHJvaWRCcmlkZ2UoKT8uaXNQaWN0dXJlSW5QaWN0dXJlU3VwcG9ydGVkKCkgPz8gZmFsc2U7XG4gICAgfVxuXG4gICAgYXN5bmMgZW50ZXJQaWN0dXJlSW5QaWN0dXJlKHdpZHRoID0gMTYsIGhlaWdodCA9IDkpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgY29uc3QgYnJpZGdlID0gdGhpcy5nZXRBbmRyb2lkQnJpZGdlKCk7XG4gICAgICAgIGlmICghYnJpZGdlKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIHJldHVybiBicmlkZ2UuZW50ZXJQaWN0dXJlSW5QaWN0dXJlKHdpZHRoLCBoZWlnaHQpO1xuICAgIH1cblxuICAgIGFzeW5jIHNldFBpY3R1cmVJblBpY3R1cmVTdGF0ZShlbmFibGVkOiBib29sZWFuLCB3aWR0aCA9IDE2LCBoZWlnaHQgPSA5KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHRoaXMuZ2V0QW5kcm9pZEJyaWRnZSgpPy5zZXRQaWN0dXJlSW5QaWN0dXJlU3RhdGUoZW5hYmxlZCwgd2lkdGgsIGhlaWdodCk7XG4gICAgfVxuXG4gICAgZ2V0VGhlbWVzUGF0aCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy50aGVtZXNQYXRoO1xuICAgIH1cblxuICAgIGdldFBsdWdpbnNQYXRoKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLnBsdWdpbnNQYXRoO1xuICAgIH1cblxuICAgIGdldEVuaGFuY2VkUGF0aCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5lbmhhbmNlZFBhdGg7XG4gICAgfVxuXG4gICAgYXN5bmMgaW5pdCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgYXdhaXQgdGhpcy5lbnN1cmVQZXJtaXNzaW9ucygpO1xuICAgICAgICBhd2FpdCB0aGlzLm1rZGlyKHRoaXMuZ2V0RW5oYW5jZWRQYXRoKCkpO1xuICAgICAgICBhd2FpdCB0aGlzLm1rZGlyKHRoaXMuZ2V0VGhlbWVzUGF0aCgpKTtcbiAgICAgICAgYXdhaXQgdGhpcy5ta2Rpcih0aGlzLmdldFBsdWdpbnNQYXRoKCkpO1xuICAgICAgICBhd2FpdCB0aGlzLm1rZGlyKHRoaXMubG9nc1BhdGgpO1xuXG4gICAgICAgIGF3YWl0IHRoaXMubWlncmF0ZUxlZ2FjeURpcmVjdG9yeShcInRoZW1lc1wiLCB0aGlzLmdldFRoZW1lc1BhdGgoKSk7XG4gICAgICAgIGF3YWl0IHRoaXMubWlncmF0ZUxlZ2FjeURpcmVjdG9yeShcInBsdWdpbnNcIiwgdGhpcy5nZXRQbHVnaW5zUGF0aCgpKTtcblxuICAgICAgICBjb25zdCBsZWdhY3lSb290RXhpc3RzID0gYXdhaXQgdGhpcy5leGlzdHNJbkRpcmVjdG9yeShcImxvZ3NcIiwgRGlyZWN0b3J5LkRhdGEpO1xuICAgICAgICBpZiAobGVnYWN5Um9vdEV4aXN0cykge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5taWdyYXRlTGVnYWN5RGlyZWN0b3J5KFwibG9nc1wiLCB0aGlzLmxvZ3NQYXRoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsICJjbGFzcyBCcm93c2VyTG9nZ2VyIHtcbiAgICBpbmZvKG1lc3NhZ2U6IHN0cmluZywgLi4ubWV0YTogYW55W10pIHtcbiAgICAgICAgY29uc29sZS5pbmZvKGBbSU5GT10gJHttZXNzYWdlfWAsIC4uLm1ldGEpO1xuICAgIH1cbiAgICB3YXJuKG1lc3NhZ2U6IHN0cmluZywgLi4ubWV0YTogYW55W10pIHtcbiAgICAgICAgY29uc29sZS53YXJuKGBbV0FSTl0gJHttZXNzYWdlfWAsIC4uLm1ldGEpO1xuICAgIH1cbiAgICBlcnJvcihtZXNzYWdlOiBzdHJpbmcsIC4uLm1ldGE6IGFueVtdKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYFtFUlJPUl0gJHttZXNzYWdlfWAsIC4uLm1ldGEpO1xuICAgIH1cbn1cblxuY29uc3QgbG9nZ2VyID0gbmV3IEJyb3dzZXJMb2dnZXIoKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldExvZ2dlcihsYWJlbDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIGxvZ2dlcjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgbG9nZ2VyO1xuIiwgIi8qKlxuICogQ2VudHJhbGl6ZWQgY29uc3RhbnRzIGZvciBTdHJlbWlvIEVuaGFuY2VkXG4gKiBVc2luZyBjb25zdGFudHMgaW5zdGVhZCBvZiBtYWdpYyBzdHJpbmdzIGltcHJvdmVzIG1haW50YWluYWJpbGl0eVxuICovXG5cbi8vIENTUyBTZWxlY3RvcnMgdXNlZCB0byBpbnRlcmFjdCB3aXRoIFN0cmVtaW8ncyBVSVxuLy8gTm90ZTogVGhlc2UgbWF5IG5lZWQgdXBkYXRpbmcgd2hlbiBTdHJlbWlvIHVwZGF0ZXMgdGhlaXIgY2xhc3MgbmFtZXNcbmV4cG9ydCBjb25zdCBTRUxFQ1RPUlMgPSB7XG4gICAgU0VDVElPTlNfQ09OVEFJTkVSOiAnW2NsYXNzXj1cInNlY3Rpb25zLWNvbnRhaW5lci1cIl0nLFxuICAgIFNFQ1RJT046ICdbY2xhc3NePVwic2VjdGlvbi1cIl0nLFxuICAgIENBVEVHT1JZOiAnLmNhdGVnb3J5LUdQMGhJJyxcbiAgICBDQVRFR09SWV9MQUJFTDogJy5sYWJlbC1OX08ydicsXG4gICAgQ0FURUdPUllfSUNPTjogJy5pY29uLW9ab3lWJyxcbiAgICBDQVRFR09SWV9IRUFESU5HOiAnLmhlYWRpbmctWGVQRmwnLFxuICAgIExBQkVMOiAnW2NsYXNzXj1cImxhYmVsLXdYRzNlXCJdJyxcbiAgICBOQVZfTUVOVTogJy5tZW51LXhlRTA2JyxcbiAgICBTRVRUSU5HU19DT05URU5UOiAnLnNldHRpbmdzLWNvbnRlbnQtY281ZVUnLFxuICAgIEVOSEFOQ0VEX1NFQ1RJT046ICcjZW5oYW5jZWQnLFxuICAgIFRIRU1FU19DQVRFR09SWTogJyNlbmhhbmNlZCA+IGRpdjpudGgtY2hpbGQoMiknLFxuICAgIFBMVUdJTlNfQ0FURUdPUlk6ICcjZW5oYW5jZWQgPiBkaXY6bnRoLWNoaWxkKDMpJyxcbiAgICBBQk9VVF9DQVRFR09SWTogJyNlbmhhbmNlZCA+IGRpdjpudGgtY2hpbGQoNCknLFxuICAgIFJPVVRFX0NPTlRBSU5FUjogJy5yb3V0ZS1jb250YWluZXI6bGFzdC1jaGlsZCAucm91dGUtY29udGVudCcsXG4gICAgTUVUQV9ERVRBSUxTX0NPTlRBSU5FUjogJy5tZXRhZGV0YWlscy1jb250YWluZXItS19EcWEnLFxuICAgIERFU0NSSVBUSU9OX0NPTlRBSU5FUjogJy5kZXNjcmlwdGlvbi1jb250YWluZXIteWk4aVUnLFxuICAgIEFERE9OU19MSVNUX0NPTlRBSU5FUjogJy5hZGRvbnMtbGlzdC1jb250YWluZXItT3ZyMlonLFxuICAgIEFERE9OX0NPTlRBSU5FUjogJy5hZGRvbi1jb250YWluZXItbEM1S04nLFxuICAgIE5BTUVfQ09OVEFJTkVSOiAnLm5hbWUtY29udGFpbmVyLXFJQWc4JyxcbiAgICBERVNDUklQVElPTl9JVEVNOiAnLmRlc2NyaXB0aW9uLWNvbnRhaW5lci12N0poZScsXG4gICAgVFlQRVNfQ09OVEFJTkVSOiAnLnR5cGVzLWNvbnRhaW5lci1EYU9yZycsXG4gICAgU0VBUkNIX0lOUFVUOiAnLnNlYXJjaC1pbnB1dC1iQWdBaCcsXG4gICAgSE9SSVpPTlRBTF9OQVY6ICcuaG9yaXpvbnRhbC1uYXYtYmFyLWNvbnRhaW5lci1ZX3p2SycsXG4gICAgVE9BU1RfSVRFTTogJy50b2FzdC1pdGVtLWNvbnRhaW5lci1uRzB1aycsXG4gICAgVE9BU1RfQ09OVEFJTkVSOiAnLnRvYXN0cy1jb250YWluZXItb0tFQ3knXG59IGFzIGNvbnN0O1xuXG4vLyBDU1MgQ2xhc3NlcyB1c2VkIGZvciBzdHlsaW5nXG5leHBvcnQgY29uc3QgQ0xBU1NFUyA9IHtcbiAgICBPUFRJT046ICdvcHRpb24tdkZPQVMnLFxuICAgIENPTlRFTlQ6ICdjb250ZW50LVAyVDBpJyxcbiAgICBCVVRUT046ICdidXR0b24tRE5tWUwnLFxuICAgIEJVVFRPTl9DT05UQUlORVI6ICdidXR0b24tY29udGFpbmVyLXpWTEg2JyxcbiAgICBTRUxFQ1RFRDogJ3NlbGVjdGVkLVM3U2VLJyxcbiAgICBJTlNUQUxMX0JVVFRPTjogJ2luc3RhbGwtYnV0dG9uLWNvbnRhaW5lci15ZmNxNScsXG4gICAgVU5JTlNUQUxMX0JVVFRPTjogJ3VuaW5zdGFsbC1idXR0b24tY29udGFpbmVyLW9WNFlvJyxcbiAgICBDSEVDS0VEOiAnY2hlY2tlZCcsXG59IGFzIGNvbnN0O1xuXG4vLyBMb2NhbFN0b3JhZ2Uga2V5c1xuZXhwb3J0IGNvbnN0IFNUT1JBR0VfS0VZUyA9IHtcbiAgICBFTkFCTEVEX1BMVUdJTlM6ICdlbmFibGVkUGx1Z2lucycsXG4gICAgQ1VSUkVOVF9USEVNRTogJ2N1cnJlbnRUaGVtZScsXG4gICAgRElTQ09SRF9SUEM6ICdkaXNjb3JkcmljaHByZXNlbmNlJyxcbiAgICBDSEVDS19VUERBVEVTX09OX1NUQVJUVVA6ICdjaGVja0ZvclVwZGF0ZXNPblN0YXJ0dXAnLFxuICAgIFBMVUdJTl9PUFRJT05TX1BSRUZJWDogJ3N0cmVtaW9FbmhhbmNlZC5wbHVnaW5PcHRpb25zLnYxOicsXG59IGFzIGNvbnN0O1xuXG4vLyBJUEMgQ2hhbm5lbCBuYW1lcyBmb3IgbWFpbiA8LT4gcmVuZGVyZXIgY29tbXVuaWNhdGlvblxuZXhwb3J0IGNvbnN0IElQQ19DSEFOTkVMUyA9IHtcbiAgICBNSU5JTUlaRV9XSU5ET1c6ICdtaW5pbWl6ZS13aW5kb3cnLFxuICAgIE1BWElNSVpFX1dJTkRPVzogJ21heGltaXplLXdpbmRvdycsXG4gICAgQ0xPU0VfV0lORE9XOiAnY2xvc2Utd2luZG93JyxcbiAgICBTRVRfVFJBTlNQQVJFTkNZOiAnc2V0LXRyYW5zcGFyZW5jeScsXG4gICAgR0VUX1RSQU5TUEFSRU5DWV9TVEFUVVM6ICdnZXQtdHJhbnNwYXJlbmN5LXN0YXR1cycsXG4gICAgVVBEQVRFX0NIRUNLOiAndXBkYXRlOmNoZWNrJyxcbiAgICBVUERBVEVfU1RBVEVfR0VUOiAndXBkYXRlOnN0YXRlOmdldCcsXG4gICAgVVBEQVRFX1NUQVRFX0NIQU5HRUQ6ICd1cGRhdGU6c3RhdGU6Y2hhbmdlZCcsXG4gICAgVVBEQVRFX0lOU1RBTEw6ICd1cGRhdGU6aW5zdGFsbCcsXG4gICAgTVBWX1NUQVRVUzogJ21wdjpzdGF0dXMnLFxuICAgIE1QVl9TRUxFQ1RfRVhFQ1VUQUJMRTogJ21wdjpzZWxlY3QtZXhlY3V0YWJsZScsXG4gICAgTVBWX1JFU0VUX0VYRUNVVEFCTEU6ICdtcHY6cmVzZXQtZXhlY3V0YWJsZScsXG4gICAgTVBWX1NFVF9QUkVGRVJFTkNFUzogJ21wdjpzZXQtcHJlZmVyZW5jZXMnLFxuICAgIE1QVl9MQVVOQ0g6ICdtcHY6bGF1bmNoJyxcbiAgICBNUFZfQ0FOQ0VMX0xBVU5DSDogJ21wdjpjYW5jZWwtbGF1bmNoJyxcbiAgICBGVUxMU0NSRUVOX0NIQU5HRUQ6ICdmdWxsc2NyZWVuLWNoYW5nZWQnLFxuICAgIEVYVFJBQ1RfRU1CRURERURfU1VCVElUTEVTOiAnZXh0cmFjdC1lbWJlZGRlZC1zdWJ0aXRsZXMnLFxufSBhcyBjb25zdDtcblxuLy8gRmlsZSBleHRlbnNpb25zIGZvciBtb2RzXG5leHBvcnQgY29uc3QgRklMRV9FWFRFTlNJT05TID0ge1xuICAgIFRIRU1FOiAnLnRoZW1lLmNzcycsXG4gICAgUExVR0lOOiAnLnBsdWdpbi5qcycsXG59IGFzIGNvbnN0O1xuXG4vLyBVUkxzXG5leHBvcnQgY29uc3QgVVJMUyA9IHtcbiAgICBTVFJFTUlPX1dFQjogJ2h0dHBzOi8vd2ViLnN0cmVtaW8uY29tLycsXG4gICAgU1RSRU1JT19XRUJfQUREX0FERE9OOiAnaHR0cHM6Ly93ZWIuc3RyZW1pby5jb20vIy9hZGRvbnM/YWRkb249JyxcbiAgICBSRUdJU1RSWTogJ2h0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9SRVZFTkdFOTc3L3N0cmVtaW8tZW5oYW5jZWQtcmVnaXN0cnkvcmVmcy9oZWFkcy9tYWluL3JlZ2lzdHJ5Lmpzb24nLFxuICAgIFNUUkVNSU9fU0VSVklDRV9HSVRIVUJfQVBJOiBcImh0dHBzOi8vYXBpLmdpdGh1Yi5jb20vcmVwb3MvU3RyZW1pby9zdHJlbWlvLXNlcnZpY2UvcmVsZWFzZXMvbGF0ZXN0XCJcbn0gYXMgY29uc3Q7XG5cbi8vIHNlcnZlci5qcyAoU3RyZW1pbyBzdHJlYW1pbmcgc2VydmVyKSBEb3dubG9hZCBVUkxcbmV4cG9ydCBjb25zdCBTRVJWRVJfSlNfVVJMID0gXCJodHRwczovL2RsLnN0cmVtLmlvL3NlcnZlci92NC4yMC4xMi9kZXNrdG9wL3NlcnZlci5qc1wiO1xuXG4vLyBGRm1wZWcgRG93bmxvYWQgVVJMc1xuZXhwb3J0IGNvbnN0IEZGTVBFR19VUkxTID0ge1xuICAgIHdpbjMyOiB7XG4gICAgICAgIHg2NDogXCJodHRwczovL2dpdGh1Yi5jb20vQnRiTi9GRm1wZWctQnVpbGRzL3JlbGVhc2VzL2Rvd25sb2FkL2xhdGVzdC9mZm1wZWctbWFzdGVyLWxhdGVzdC13aW42NC1ncGwuemlwXCIsXG4gICAgICAgIGFybTY0OiBcImh0dHBzOi8vZ2l0aHViLmNvbS9CdGJOL0ZGbXBlZy1CdWlsZHMvcmVsZWFzZXMvZG93bmxvYWQvbGF0ZXN0L2ZmbXBlZy1tYXN0ZXItbGF0ZXN0LXdpbmFybTY0LWdwbC56aXBcIixcbiAgICB9LFxuICAgIGRhcndpbjoge1xuICAgICAgICB4NjQ6IFwiaHR0cHM6Ly9mZm1wZWcubWFydGluLXJpZWRsLmRlL2Rvd25sb2FkL21hY29zL2FtZDY0LzE3NjY0MzcyOTdfOC4wLjEvZmZtcGVnLnppcFwiLFxuICAgICAgICBhcm02NDogXCJodHRwczovL2ZmbXBlZy5tYXJ0aW4tcmllZGwuZGUvZG93bmxvYWQvbWFjb3MvYXJtNjQvMTc2NjQzMDEzMl84LjAuMS9mZm1wZWcuemlwXCIsXG4gICAgfSxcbiAgICBsaW51eDoge1xuICAgICAgICB4NjQ6IFwiaHR0cHM6Ly9qb2hudmFuc2lja2xlLmNvbS9mZm1wZWcvcmVsZWFzZXMvZmZtcGVnLXJlbGVhc2UtYW1kNjQtc3RhdGljLnRhci54elwiLFxuICAgICAgICBhcm02NDogXCJodHRwczovL2pvaG52YW5zaWNrbGUuY29tL2ZmbXBlZy9yZWxlYXNlcy9mZm1wZWctcmVsZWFzZS1hcm02NC1zdGF0aWMudGFyLnh6XCIsXG4gICAgfSxcbn0gYXMgY29uc3Q7XG5cbi8vIEZGcHJvYmUgRG93bmxvYWQgVVJMcyBmb3IgbWFjT1NcbmV4cG9ydCBjb25zdCBNQUNPU19GRlBST0JFX1VSTFMgPSB7XG4gICAgeDY0OiBcImh0dHBzOi8vZmZtcGVnLm1hcnRpbi1yaWVkbC5kZS9kb3dubG9hZC9tYWNvcy9hbWQ2NC8xNzY2NDM3Mjk3XzguMC4xL2ZmcHJvYmUuemlwXCIsXG4gICAgYXJtNjQ6IFwiaHR0cHM6Ly9mZm1wZWcubWFydGluLXJpZWRsLmRlL2Rvd25sb2FkL21hY29zL2FybTY0LzE3NjY0MzAxMzJfOC4wLjEvZmZwcm9iZS56aXBcIixcbn07XG5cbi8vIERpc2NvcmQgUlBDXG5leHBvcnQgY29uc3QgRElTQ09SRCA9IHtcbiAgICBDTElFTlRfSUQ6ICcxMjAwMTg2NzUwNzI3ODkzMTY0JyxcbiAgICBSRUNPTk5FQ1RfSU5URVJWQUw6IDEwMDAwLFxuICAgIERFRkFVTFRfSU1BR0U6ICcxMDI0c3RyZW1pbycsXG59IGFzIGNvbnN0O1xuXG4vLyBUaW1lb3V0c1xuZXhwb3J0IGNvbnN0IFRJTUVPVVRTID0ge1xuICAgIEVMRU1FTlRfV0FJVDogMTAwMDAsXG4gICAgSU5TVEFMTF9DT01QTEVUSU9OOiAxMjAwMDAsXG4gICAgU0VSVklDRV9DSEVDS19JTlRFUlZBTDogNTAwMCxcbiAgICBTRVJWRVJfUkVMT0FEX0RFTEFZOiAxNTAwLFxuICAgIENPUkVTVEFURV9SRVRSWV9JTlRFUlZBTDogMTAwMCxcbiAgICBDT1JFU1RBVEVfTUFYX1JFVFJJRVM6IDMwLFxufSBhcyBjb25zdDtcbiIsICI8ZGl2IGNsYXNzPVwibmF2LWNvbnRlbnQtY29udGFpbmVyLXpsOWhRXCIgc3R5bGU9XCJ3aWR0aDogOTAlOyBvdmVyZmxvdy15OiBhdXRvO1wiPlxuICAgIDxkaXYgY2xhc3M9XCJhZGRvbnMtY29udGVudC16aEZCbFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwic2VsZWN0YWJsZS1pbnB1dHMtY29udGFpbmVyLXRVdWwxXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3BhY2luZy13SDF3NVwiPjwvZGl2PlxuICAgICAgICAgICAgPGxhYmVsIHRpdGxlPVwiU2VhcmNoIHRoZW1lcy9wbHVnaW5zXCIgY2xhc3M9XCJzZWFyY2gtYmFyLWs3TVhkIHNlYXJjaC1iYXItY29udGFpbmVyLXA0dFN0XCI+XG4gICAgICAgICAgICAgICAgPGlucHV0IHNpemU9XCIxXCIgYXV0b2NvcnJlY3Q9XCJvZmZcIiBhdXRvY2FwaXRhbGl6ZT1cIm9mZlwiIGF1dG9jb21wbGV0ZT1cIm9mZlwiIHNwZWxsY2hlY2s9XCJmYWxzZVwiIHRhYmluZGV4PVwiMFwiIGNsYXNzPVwic2VhcmNoLWlucHV0LWJBZ0FoIHRleHQtaW5wdXQtaG5MaXpcIiB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiU2VhcmNoIHRoZW1lcy9wbHVnaW5zXCIgdmFsdWU9XCJcIj5cbiAgICAgICAgICAgICAgICA8c3ZnIGNsYXNzPVwiaWNvbi1RT1lmSlwiIHZpZXdCb3g9XCIwIDAgNTEyIDUxMlwiPlxuICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTQ1Ni44ODIgNDE1Ljc5OTk5OTk5OTk5OTdsLTkzLjc5MS04OS40NWMyMi42MDUtMjguNjcgMzQuNzg0LTYzLjU3IDM0LjY4Ni05OS40NCAwLTkxLjU0LTc4LjE0Mi0xNjYuMDctMTc0LjEyNS0xNjYuMDdzLTE3NC4xMjUgNzQuNTMtMTc0LjEyNSAxNjYuMTdjMCA5MS41NCA3OC4xNDIgMTY2LjA3IDE3NC4xMjUgMTY2LjA3IDM3LjU4NiAwIDc0LjE2MS0xMS42MSAxMDQuMjU2LTMzLjA4bDkzLjc5IDg5LjQ1YzMuNTM1IDMuMDQgNy45MSA1LjA1IDEyLjYwNCA1Ljc5IDQuNjk2IDAuNzQgOS41MTUgMC4xOCAxMy44ODctMS42MSA0LjM3NC0xLjc5IDguMTE3LTQuNzQgMTAuNzg4LTguNDkgMi42NzEtMy43NiA0LjE1Ny04LjE3IDQuMjg0LTEyLjcgMC4xMDgtNi4xMS0yLjE2NS0xMi4wNC02LjM3OS0xNi42NG0tMzU3LjYyLTE4OC43OWMtMC4wMS0yOS40MyAxMS40NTMtNTcuOCAzMi4xNjItNzkuNjEgMjAuNzA5LTIxLjgyIDQ5LjE4My0zNS40OSA3OS44ODQtMzguMzkgMzAuNy0yLjkgNjEuNDMzIDUuMiA4Ni4yMjEgMjIuNzIgMjQuNzg3IDE3LjUyIDQxLjg1OCA0My4yIDQ3Ljg5MSA3Mi4wNSA2LjAzNCAyOC44NiAwLjU5OCA1OC44My0xNS4yNDkgODQuMDdzLTQwLjk3MiA0My45Ni03MC40ODkgNTIuNTNjLTI5LjUxOCA4LjU1LTYxLjMxNyA2LjMzLTg5LjIxMy02LjI0cy00OS44OTUtMzQuNTctNjEuNzE4LTYxLjc1Yy02LjI1OC0xNC4zOC05LjQ4My0yOS44MS05LjQ4OC00NS4zOFwiIHN0eWxlPVwiZmlsbDogY3VycmVudGNvbG9yO1wiPjwvcGF0aD5cbiAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8YnIvPlxuICAgICAgICA8ZGl2IHRhYmluZGV4PVwiMFwiIHRpdGxlPVwiU3VibWl0IHlvdXIgdGhlbWVzIGFuZCBwbHVnaW5zIGhlcmVcIiB0YXJnZXQ9XCJfYmxhbmtcIiBjbGFzcz1cImxpbmstRnJMMXQgYnV0dG9uLWNvbnRhaW5lci16VkxINlwiPlxuICAgICAgICAgICAgPGEgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9SRVZFTkdFOTc3L3N0cmVtaW8tZW5oYW5jZWQtcmVnaXN0cnlcIiB0YXJnZXQ9XCJfYmxhbmtcIiByZWw9XCJub3JlZmVycmVyXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxhYmVsLVBKdlNKXCIgc3R5bGU9XCJ0ZXh0LWFsaWduOiBjZW50ZXI7XCI+U3VibWl0IHlvdXIgdGhlbWVzIGFuZCBwbHVnaW5zPC9kaXY+XG4gICAgICAgICAgICA8L2E+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJhZGRvbnMtbGlzdC1jb250YWluZXItT3ZyMlpcIiBpZD1cIm1vZHMtbGlzdFwiPlxuICAgICAgICAgICAgXG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8YnIvPlxuICAgIDwvZGl2PlxuPC9kaXY+IiwgIjxicj5cbjxkaXYgdGFiaW5kZXg9XCIwXCIgY2xhc3M9XCJhZGRvbi13aG1kTyBhbmltYXRpb24tZmFkZS1pbiBhZGRvbi1jb250YWluZXItbEM1S04gYnV0dG9uLWNvbnRhaW5lci16VkxINlwiPlxuICAgIDxkaXYgY2xhc3M9XCJsb2dvLWNvbnRhaW5lci1aY1NTQ1wiPlxuICAgICAgICA8IS0tIHRoZW1lIHByZXZpZXcgaGVyZSAtLT5cblxuICAgICAgICA8IS0tIHBsdWdpbiBpY29uIGhlcmUgLS0+XG4gICAgPC9kaXY+XG5cblx0PGRpdiBjbGFzcz1cImluZm8tY29udGFpbmVyLUFkTUI2XCI+XG5cdFx0PGRpdiBjbGFzcz1cIm5hbWUtY29udGFpbmVyLXFJQWc4XCIgdGl0bGU9XCJ7eyBuYW1lIH19XCI+e3sgbmFtZSB9fTwvZGl2PlxuXHRcdDxkaXYgY2xhc3M9XCJ2ZXJzaW9uLWNvbnRhaW5lci16ZFB5TlwiIHRpdGxlPVwie3sgdmVyc2lvbiB9fVwiPnt7IHZlcnNpb24gfX08L2Rpdj5cblx0XHQ8ZGl2IGNsYXNzPVwidHlwZXMtY29udGFpbmVyLURhT3JnXCI+e3sgdHlwZSB9fTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZGVzY3JpcHRpb24tY29udGFpbmVyLXY3SmhlXCI+XG4gICAgICAgICAgICA8Yj5EZXNjcmlwdGlvbjo8L2I+IHt7IGRlc2NyaXB0aW9uIH19XG4gICAgICAgICAgICA8YnI+XG4gICAgICAgICAgICA8Yj5BdXRob3I6PC9iPiB7eyBhdXRob3IgfX1cbiAgICAgICAgPC9kaXY+XG5cdDwvZGl2PlxuXHQ8ZGl2IGNsYXNzPVwiYnV0dG9ucy1jb250YWluZXItZzB4WHJcIj5cblx0XHQ8ZGl2IGNsYXNzPVwiYWN0aW9uLWJ1dHRvbnMtY29udGFpbmVyLXhNVm16XCI+XG5cdFx0XHQ8ZGl2IHRhYmluZGV4PVwie3sgYWN0aW9uVGFiSW5kZXggfX1cIiByb2xlPVwiYnV0dG9uXCIgYXJpYS1kaXNhYmxlZD1cInt7IGFjdGlvbkRpc2FibGVkIH19XCIgdGl0bGU9XCJ7eyBhY3Rpb25idG5UaXRsZSB9fVwiIGNsYXNzPVwie3sgYWN0aW9uYnRuQ2xhc3MgfX0gYnV0dG9uLWNvbnRhaW5lci16VkxINiBtb2RBY3Rpb25CdG5cIiBkYXRhLWFjdGlvbj1cInt7IGFjdGlvbiB9fVwiIGRhdGEtbGluaz1cInt7IGRvd25sb2FkIH19XCIgZGF0YS10eXBlPVwie3sgdHlwZSB9fVwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwibGFiZWwtT25XaDJcIj57eyBhY3Rpb25idG5UaXRsZSB9fTwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0PC9kaXY+XG5cdFx0PGEge3sgcmVwb0hyZWYgfX0gdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlclwiIGFyaWEtZGlzYWJsZWQ9XCJ7eyByZXBvRGlzYWJsZWQgfX1cIiB0YWJpbmRleD1cInt7IHJlcG9UYWJJbmRleCB9fVwiIGNsYXNzPVwic2hhcmUtYnV0dG9uLWNvbnRhaW5lci1zM2d3UCBidXR0b24tY29udGFpbmVyLXpWTEg2XCI+XG5cdFx0XHQ8c3ZnIGNsYXNzPVwiaWNvbi1HeFZiWVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj5cblx0XHRcdFx0PHBhdGggZD1cIk0xMiwyQTEwLDEwIDAgMCwwIDIsMTJDMiwxNi40MiA0Ljg3LDIwLjE3IDguODQsMjEuNUM5LjM0LDIxLjU4IDkuNSwyMS4yNyA5LjUsMjFDOS41LDIwLjc3IDkuNSwyMC4xNCA5LjUsMTkuMzFDNi43MywxOS45MSA2LjE0LDE3Ljk3IDYuMTQsMTcuOTdDNS42OCwxNi44MSA1LjAzLDE2LjUgNS4wMywxNi41QzQuMTIsMTUuODggNS4xLDE1LjkgNS4xLDE1LjlDNi4xLDE1Ljk3IDYuNjMsMTYuOTMgNi42MywxNi45M0M3LjUsMTguNDUgOC45NywxOCA5LjU0LDE3Ljc2QzkuNjMsMTcuMTEgOS44OSwxNi42NyAxMC4xNywxNi40MkM3Ljk1LDE2LjE3IDUuNjIsMTUuMzEgNS42MiwxMS41QzUuNjIsMTAuMzkgNiw5LjUgNi42NSw4Ljc5QzYuNTUsOC41NCA2LjIsNy41IDYuNzUsNi4xNUM2Ljc1LDYuMTUgNy41OSw1Ljg4IDkuNSw3LjE3QzEwLjI5LDYuOTUgMTEuMTUsNi44NCAxMiw2Ljg0QzEyLjg1LDYuODQgMTMuNzEsNi45NSAxNC41LDcuMTdDMTYuNDEsNS44OCAxNy4yNSw2LjE1IDE3LjI1LDYuMTVDMTcuOCw3LjUgMTcuNDUsOC41NCAxNy4zNSw4Ljc5QzE4LDkuNSAxOC4zOCwxMC4zOSAxOC4zOCwxMS41QzE4LjM4LDE1LjMyIDE2LjA0LDE2LjE2IDEzLjgxLDE2LjQxQzE0LjE3LDE2LjcyIDE0LjUsMTcuMzMgMTQuNSwxOC4yNkMxNC41LDE5LjYgMTQuNSwyMC42OCAxNC41LDIxQzE0LjUsMjEuMjcgMTQuNjYsMjEuNTkgMTUuMTcsMjEuNUMxOS4xNCwyMC4xNiAyMiwxNi40MiAyMiwxMkExMCwxMCAwIDAsMCAxMiwyWlwiIHN0eWxlPVwiZmlsbDogY3VycmVudGNvbG9yO1wiIC8+XG5cdFx0XHQ8L3N2Zz5cblx0XHRcdDxkaXYgY2xhc3M9XCJsYWJlbC1PbldoMlwiPk9wZW4gcmVwb3NpdG9yeTwvZGl2PlxuXHRcdDwvYT5cblx0PC9kaXY+XG48L2Rpdj5cbiIsICI8aDQgc3R5bGU9XCJjb2xvcjogd2hpdGU7IG1hcmdpbi1ib3R0b206IDFyZW07XCI+XG4gICAgRGV2ZWxvcGVkIEJ5OiA8cCBzdHlsZT1cImRpc3BsYXk6IGlubGluZSAhaW1wb3J0YW50O1wiPjxhIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vUkVWRU5HRTk3N1wiIHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vcmVmZXJyZXJcIj5SRVZFTkdFOTc3PC9hPjwvcD5cbiAgICA8YnIvPlxuICAgIFZlcnNpb246IHZ7eyB2ZXJzaW9uIH19XG4gICAgPGJyLz5cbjwvaDQ+XG5cbjxkaXYgY2xhc3M9XCJvcHRpb24tdkZPQVNcIj5cbiAgICA8ZGl2IGNsYXNzPVwiaGVhZGluZy1kWU1EdFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibGFiZWwtcUk2VmhcIj5DaGVjayBmb3IgdXBkYXRlcyBvbiBzdGFydHVwPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImNvbnRlbnQtUDJUMGlcIj5cbiAgICAgICAgPGRpdiB0YWJpbmRleD1cIi0xXCIgY2xhc3M9XCJ0b2dnbGUtY29udGFpbmVyLWxaZkhQIGJ1dHRvbi1jb250YWluZXItelZMSDYge3sgY2hlY2tGb3JVcGRhdGVzT25TdGFydHVwIH19XCIgaWQ9XCJjaGVja0ZvclVwZGF0ZXNPblN0YXJ0dXBcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0b2dnbGUtdG9PV01cIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG48L2Rpdj5cblxuPGRpdiBjbGFzcz1cIm9wdGlvbi12Rk9BU1wiPlxuICAgIDxkaXYgY2xhc3M9XCJoZWFkaW5nLWRZTUR0XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJsYWJlbC1xSTZWaFwiPkRpc2NvcmQgUmljaCBQcmVzZW5jZTwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJjb250ZW50LVAyVDBpXCI+XG4gICAgICAgIDxkaXYgdGFiaW5kZXg9XCItMVwiIGNsYXNzPVwidG9nZ2xlLWNvbnRhaW5lci1sWmZIUCBidXR0b24tY29udGFpbmVyLXpWTEg2IHt7IGRpc2NvcmRyaWNocHJlc2VuY2UgfX1cIiBpZD1cImRpc2NvcmRyaWNocHJlc2VuY2VcIiBzdHlsZT1cIm91dGxpbmU6IG5vbmU7XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9nZ2xlLXRvT1dNXCI+PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuPC9kaXY+XG5cbjxkaXYgY2xhc3M9XCJvcHRpb24tdkZPQVNcIj5cbiAgICA8ZGl2IGNsYXNzPVwiaGVhZGluZy1kWU1EdFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibGFiZWwtcUk2VmhcIj5XaW5kb3cgdHJhbnNwYXJlbmN5PC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImNvbnRlbnQtUDJUMGlcIj5cbiAgICAgICAgPGRpdiB0YWJpbmRleD1cIi0xXCIgY2xhc3M9XCJ0b2dnbGUtY29udGFpbmVyLWxaZkhQIGJ1dHRvbi1jb250YWluZXItelZMSDYge3sgZW5hYmxlVHJhbnNwYXJlbnRUaGVtZXMgfX1cIiBpZD1cImVuYWJsZVRyYW5zcGFyZW50VGhlbWVzXCIgc3R5bGU9XCJvdXRsaW5lOiBub25lO1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRvZ2dsZS10b09XTVwiPjwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvZGl2PlxuXG48cCBzdHlsZT1cImNvbG9yOmdyYXk7XCI+VGhpcyBvcHRpb24gaGFzIHRvIGJlIGVuYWJsZWQgZm9yIHRoZW1lcyB0aGF0IHN1cHBvcnQgdHJhbnNwYXJlbmN5IHRvIHdvcmsuIChleHBlcmltZW50YWwpPC9wPlxuPGJyLz5cblxuPGRpdiBpZD1cInN0cmVtaW8tZW5oYW5jZWQtbmF0aXZlLXBsYXllci1jb250cm9sc1wiIHN0eWxlPVwie3sgbmF0aXZlUGxheWVyQ29udHJvbHNEaXNwbGF5IH19XCI+XG4gICAgPGRpdiBjbGFzcz1cIm9wdGlvbi12Rk9BU1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiaGVhZGluZy1kWU1EdFwiPlxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwibGFiZWwtcUk2VmhcIiBmb3I9XCJuYXRpdmVQbGF5ZXJTZWxlY3RcIj5WaWRlbyBwbGF5ZXI8L2xhYmVsPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRlbnQtUDJUMGlcIj5cbiAgICAgICAgICAgIDxzZWxlY3QgaWQ9XCJuYXRpdmVQbGF5ZXJTZWxlY3RcIiBhcmlhLWxhYmVsPVwiVmlkZW8gcGxheWVyXCI+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImRpc2FibGVkXCIge3sgbmF0aXZlUGxheWVyRGlzYWJsZWRTZWxlY3RlZCB9fT5EaXNhYmxlZCAoYnVpbHQtaW4gcGxheWVyKTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJtcHZcIiB7eyBuYXRpdmVQbGF5ZXJNcHZTZWxlY3RlZCB9fT5NUFYgKG5hdGl2ZSBleHRlcm5hbCBwbGF5ZXIpPC9vcHRpb24+XG4gICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGlkPVwic3RyZW1pby1lbmhhbmNlZC1tcHYtY29udHJvbHNcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm9wdGlvbi12Rk9BU1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImhlYWRpbmctZFlNRHRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGFiZWwtcUk2VmhcIj5Vc2Ugbm9ybWFsIE1QViBjb25maWcgKFRodW1iRmFzdC9zaGFkZXJzL21vZGVscyk8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRlbnQtUDJUMGlcIj5cbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIHRhYmluZGV4PVwiMFwiXG4gICAgICAgICAgICAgICAgICAgIHJvbGU9XCJzd2l0Y2hcIlxuICAgICAgICAgICAgICAgICAgICBhcmlhLWNoZWNrZWQ9XCJmYWxzZVwiXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVwidG9nZ2xlLWNvbnRhaW5lci1sWmZIUCBidXR0b24tY29udGFpbmVyLXpWTEg2IHt7IG1wdlVzZVVzZXJDb25maWd1cmF0aW9uIH19XCJcbiAgICAgICAgICAgICAgICAgICAgaWQ9XCJtcHZVc2VVc2VyQ29uZmlnXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0b2dnbGUtdG9PV01cIj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8cCBzdHlsZT1cImNvbG9yOmdyYXk7XCI+XG4gICAgICAgICAgICBPZmYgc3RhcnRzIE1QViB3aXRoIGFuIGlzb2xhdGVkIGNvbmZpZ3VyYXRpb24uIFR1cm4gdGhpcyBvbiB0byBsb2FkIHlvdXIgbm9ybWFsIE1QViBzY3JpcHRzLCBzaGFkZXJzLCBhbmQgbW9kZWxzLlxuICAgICAgICA8L3A+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm9wdGlvbi12Rk9BU1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRlbnQtUDJUMGlcIiBzdHlsZT1cImRpc3BsYXk6IGZsZXg7IGdhcDogMC41cmVtOyBmbGV4LXdyYXA6IHdyYXA7XCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidXR0b24tRE5tWUwgYnV0dG9uLWNvbnRhaW5lci16VkxINiBidXR0b25cIiBpZD1cInNlbGVjdE1wdkV4ZWN1dGFibGVCdG5cIj5cbiAgICAgICAgICAgICAgICAgICAgQ2hvb3NlIE1QViBleGVjdXRhYmxlXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidXR0b24tRE5tWUwgYnV0dG9uLWNvbnRhaW5lci16VkxINiBidXR0b25cIiBpZD1cInJlc2V0TXB2RXhlY3V0YWJsZUJ0blwiPlxuICAgICAgICAgICAgICAgICAgICBSZXNldCAvIGF1dG8tZGV0ZWN0XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdlxuICAgICAgICAgICAgaWQ9XCJzdHJlbWlvLWVuaGFuY2VkLW1wdi1zdGF0dXNcIlxuICAgICAgICAgICAgcm9sZT1cInN0YXR1c1wiXG4gICAgICAgICAgICBhcmlhLWxpdmU9XCJwb2xpdGVcIlxuICAgICAgICAgICAgc3R5bGU9XCJjb2xvcjpncmF5OyBvdmVyZmxvdy13cmFwOmFueXdoZXJlOyBtYXJnaW4tYm90dG9tOiAxcmVtO1wiXG4gICAgICAgID48L2Rpdj5cbiAgICA8L2Rpdj5cbjwvZGl2PlxuXG48YnIvPlxuXG48ZGl2IGNsYXNzPVwib3B0aW9uLXZGT0FTXCI+XG4gICAgPGRpdiBjbGFzcz1cImNvbnRlbnQtUDJUMGlcIj5cbiAgICAgICAgPGRpdiB0YWJpbmRleD1cIjBcIiB0aXRsZT1cIkNvbW11bml0eSBQbHVnaW5zICZhbXA7IFRoZW1lc1wiIGNsYXNzPVwiYnV0dG9uLURObVlMIGJ1dHRvbi1jb250YWluZXItelZMSDYgYnV0dG9uXCIgaWQ9XCJicm93c2VQbHVnaW5zVGhlbWVzQnRuXCI+XG4gICAgICAgICAgICBDb21tdW5pdHkgTWFya2V0cGxhY2VcbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG48L2Rpdj5cblxuPGRpdiBjbGFzcz1cIm9wdGlvbi12Rk9BU1wiPlxuICAgIDxkaXYgY2xhc3M9XCJjb250ZW50LVAyVDBpXCI+XG4gICAgICAgIDxkaXYgdGFiaW5kZXg9XCIwXCIgdGl0bGU9XCJDaGVjayBGb3IgVXBkYXRlc1wiIGNsYXNzPVwiYnV0dG9uLURObVlMIGJ1dHRvbi1jb250YWluZXItelZMSDYgYnV0dG9uXCIgaWQ9XCJjaGVja2ZvcnVwZGF0ZXNCdG5cIj5cbiAgICAgICAgICAgIENoZWNrIEZvciBVcGRhdGVzXG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuPC9kaXY+XG5cbjxici8+XG4iLCAiPGRpdiBjbGFzcz1cIm9wdGlvbi12Rk9BU1wiPlxuICAgIDxkaXYgY2xhc3M9XCJoZWFkaW5nLWRZTUR0XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJsYWJlbC1xSTZWaFwiPkRlZmF1bHQ8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiY29udGVudC1QMlQwaVwiPlxuICAgICAgICA8ZGl2XG4gICAgICAgIHRpdGxlPVwiRGVmYXVsdFwiXG4gICAgICAgIGlkPVwiRGVmYXVsdFwiXG4gICAgICAgIHRhYmluZGV4PVwiLTFcIlxuICAgICAgICBkYXRhLXN0cmVtaW8tZW5oYW5jZWQtYXBwbHktdGhlbWU9XCJEZWZhdWx0XCJcbiAgICAgICAgc3R5bGU9XCJjb2xvcjogd2hpdGU7IG1hcmdpbi1ib3R0b206IDFyZW07IHdpZHRoOiBtYXgtY29udGVudDsgYmFja2dyb3VuZC1jb2xvcjoge3sgYmFja2dyb3VuZENvbG9yIH19O1wiXG4gICAgICAgIGNsYXNzPVwiYnV0dG9uIGJ1dHRvbi1jb250YWluZXItelZMSDYge3sgZGlzYWJsZWQgfX1cIlxuICAgICAgICA+e3sgbGFiZWwgfX08L2Rpdj5cbiAgICA8L2Rpdj5cbjwvZGl2PlxuIiwgIjxkaXYgdGFiaW5kZXg9XCItMVwiIGNsYXNzPVwiYnV0dG9uLWNvbnRhaW5lci14VDlfTCBiYWNrLWJ1dHRvbi1jb250YWluZXItbERCMU4gYnV0dG9uLWNvbnRhaW5lci16VkxINlwiIGlkPVwiYmFjay1idG5cIj5cbiAgICA8c3ZnIGNsYXNzPVwiaWNvbi1UOE1VNlwiIHZpZXdCb3g9XCIwIDAgNTEyIDUxMlwiPlxuICAgICAgICA8cGF0aCBkPVwiTTMyOC42MTAwMDAwMDAwMDA2IDEwNi40NjlsLTE0My41MyAxMzYuODg5IDE0My41MyAxMzYuODg5XCIgc3R5bGU9XCJzdHJva2U6IGN1cnJlbnRjb2xvcjsgc3Ryb2tlLWxpbmVjYXA6IHJvdW5kOyBzdHJva2UtbGluZWpvaW46IHJvdW5kOyBzdHJva2Utd2lkdGg6IDQ4OyBmaWxsOiBub25lO1wiPjwvcGF0aD5cbiAgICA8L3N2Zz5cbjwvZGl2PiIsICI8bmF2IGNsYXNzPVwidGl0bGUtYmFyXCI+XG4gICAgPGRpdiBjbGFzcz1cInRpdGxlLWJhci1idXR0b25zXCI+XG4gICAgICAgIDxkaXYgaWQ9XCJtaW5pbWl6ZUFwcC1idG5cIiB0aXRsZT1cIk1pbmltaXplXCIgY2xhc3M9XCJidXR0b25cIj5cbiAgICAgICAgICAgIDxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiPlxuICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMjAsMTRINFYxMEgyMFwiIHN0eWxlPVwiZmlsbDp3aGl0ZTtcIj48L3BhdGg+XG4gICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgaWQ9XCJtYXhpbWl6ZUFwcC1idG5cIiB0aXRsZT1cIk1heGltaXplXCIgY2xhc3M9XCJidXR0b25cIj5cbiAgICAgICAgICAgIDxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiPlxuICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMywzSDIxVjIxSDNWM001LDVWMTlIMTlWNUg1WlwiIHN0eWxlPVwiZmlsbDp3aGl0ZTtcIj48L3BhdGg+XG4gICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgaWQ9XCJjbG9zZUFwcC1idG5cIiB0aXRsZT1cIkNsb3NlXCIgY2xhc3M9XCJidXR0b25cIj5cbiAgICAgICAgICAgIDxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiIHN0eWxlPVwid2lkdGg6IDI1cHg7IGhlaWdodDogMjVweDtcIj5cbiAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTE5LDYuNDFMMTcuNTksNUwxMiwxMC41OUw2LjQxLDVMNSw2LjQxTDEwLjU5LDEyTDUsMTcuNTlMNi40MSwxOUwxMiwxMy40MUwxNy41OSwxOUwxOSwxNy41OUwxMy40MSwxMkwxOSw2LjQxWlwiIHN0eWxlPVwiZmlsbDp3aGl0ZTtcIj48L3BhdGg+XG4gICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgICA8c3R5bGU+XG5cdFx0Ym9keSA+ICo6bm90KC50aXRsZS1iYXIpIHtcblx0XHRcdHBhZGRpbmctdG9wOiA0MHB4OyBcblx0XHR9XG5cbiAgICAgICAgLmJ1dHRvbiB7XG4gICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgIH1cblxuICAgICAgICAudGl0bGUtYmFyIHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiBmaXhlZDsgXG4gICAgICAgICAgICB0b3A6IDA7XG4gICAgICAgICAgICBsZWZ0OiAwO1xuICAgICAgICAgICAgcmlnaHQ6IDA7XG4gICAgICAgICAgICBoZWlnaHQ6IDQwcHg7XG4gICAgICAgICAgICB6LWluZGV4OiA5OTk5O1xuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xuICAgICAgICAgICAgYmFja2dyb3VuZDogcmdiYSgwLDAsMCwwLjE1KTtcbiAgICAgICAgICAgIGJhY2tkcm9wLWZpbHRlcjogYmx1cigyMHB4KSBzYXR1cmF0ZSgxMjAlKTtcblx0XHRcdC13ZWJraXQtYXBwLXJlZ2lvbjogZHJhZztcbiAgICAgICAgfVxuXG4gICAgICAgIC50aXRsZS1iYXItYnV0dG9ucyB7XG4gICAgICAgICAgICAtd2Via2l0LWFwcC1yZWdpb246IG5vLWRyYWc7XG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICAgIGdhcDogMi4wcmVtO1xuICAgICAgICAgICAgbWFyZ2luLWxlZnQ6IGF1dG87XG5cdFx0XHRtYXJnaW4tcmlnaHQ6IDIwcHg7XG4gICAgICAgIH1cblxuICAgICAgICAudGl0bGUtYmFyLWJ1dHRvbnMgc3ZnIHtcbiAgICAgICAgICAgIHdpZHRoOiAyMHB4O1xuICAgICAgICAgICAgaGVpZ2h0OiAyMHB4O1xuICAgICAgICB9XG4gICAgPC9zdHlsZT5cbjwvbmF2PlxuIiwgImltcG9ydCBtb2RzVGFiIGZyb20gJy4uL2NvbXBvbmVudHMvbW9kcy10YWIvbW9kcy10YWIuaHRtbCc7XG5pbXBvcnQgbW9kc0l0ZW0gZnJvbSAnLi4vY29tcG9uZW50cy9tb2RzLWl0ZW0vbW9kcy1pdGVtLmh0bWwnO1xuaW1wb3J0IGFib3V0Q2F0ZWdvcnkgZnJvbSAnLi4vY29tcG9uZW50cy9hYm91dC1jYXRlZ29yeS9hYm91dC1jYXRlZ29yeS5odG1sJztcbmltcG9ydCBkZWZhdWx0VGhlbWUgZnJvbSAnLi4vY29tcG9uZW50cy9kZWZhdWx0LXRoZW1lL2RlZmF1bHQtdGhlbWUuaHRtbCc7XG5pbXBvcnQgYmFja0J0biBmcm9tICcuLi9jb21wb25lbnRzL2JhY2stYnRuL2JhY2stYnRuLmh0bWwnO1xuaW1wb3J0IHRpdGxlQmFyIGZyb20gJy4uL2NvbXBvbmVudHMvdGl0bGUtYmFyL3RpdGxlLWJhci5odG1sJztcblxuY29uc3QgdGVtcGxhdGVzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xuICAgICdtb2RzLXRhYic6IG1vZHNUYWIsXG4gICAgJ21vZHMtaXRlbSc6IG1vZHNJdGVtLFxuICAgICdhYm91dC1jYXRlZ29yeSc6IGFib3V0Q2F0ZWdvcnksXG4gICAgJ2RlZmF1bHQtdGhlbWUnOiBkZWZhdWx0VGhlbWUsXG4gICAgJ2JhY2stYnRuJzogYmFja0J0bixcbiAgICAndGl0bGUtYmFyJzogdGl0bGVCYXIsXG59O1xuXG5jbGFzcyBUZW1wbGF0ZUNhY2hlIHtcbiAgICBwdWJsaWMgc3RhdGljIGxvYWQoZGlyOiBzdHJpbmcsIG5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIC8vIFdlIGlnbm9yZSBkaXIgaW4gYnJvd3NlciBidWlsZFxuICAgICAgICByZXR1cm4gdGVtcGxhdGVzW25hbWVdIHx8IFwiXCI7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBUZW1wbGF0ZUNhY2hlO1xuIiwgImltcG9ydCBUZW1wbGF0ZUNhY2hlIGZyb20gXCIuLi8uLi91dGlscy90ZW1wbGF0ZUNhY2hlXCI7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRUb2FzdFRlbXBsYXRlKGlkOiBzdHJpbmcsIHRpdGxlOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZywgc3RhdHVzOiBcInN1Y2Nlc3NcIiB8IFwiZmFpbFwiIHwgXCJpbmZvXCIpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGNvbnN0IHRlbXBsYXRlID0gVGVtcGxhdGVDYWNoZS5sb2FkKF9fZGlybmFtZSwgJ3RvYXN0Jyk7XG4gICAgbGV0IHRvYXN0U3RhdHVzO1xuXG4gICAgc3dpdGNoKHN0YXR1cykge1xuICAgICAgICBjYXNlIFwic3VjY2Vzc1wiOlxuICAgICAgICAgICAgdG9hc3RTdGF0dXMgPSBcInN1Y2Nlc3MtZUlEVGFcIjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiZmFpbFwiOlxuICAgICAgICAgICAgdG9hc3RTdGF0dXMgPSBcImVycm9yLXF1eU9kXCI7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImluZm9cIjpcbiAgICAgICAgICAgIHRvYXN0U3RhdHVzID0gXCJpbmZvLUtFV3E4XCI7XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHRlbXBsYXRlXG4gICAgICAgIC5yZXBsYWNlKFwie3sgaWQgfX1cIiwgaWQpXG4gICAgICAgIC5yZXBsYWNlKFwie3sgdGl0bGUgfX1cIiwgdGl0bGUpXG4gICAgICAgIC5yZXBsYWNlKFwie3sgbWVzc2FnZSB9fVwiLCBtZXNzYWdlKVxuICAgICAgICAucmVwbGFjZShcInt7IHN0YXR1cyB9fVwiLCB0b2FzdFN0YXR1cyk7XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBCcm93c2VyV2luZG93LCBNZXNzYWdlQm94T3B0aW9ucyB9IGZyb20gXCJlbGVjdHJvblwiO1xuaW1wb3J0IGxvZ2dlciBmcm9tIFwiLi9sb2dnZXJcIjtcbmltcG9ydCB7IFNFTEVDVE9SUywgVElNRU9VVFMgfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBnZXRUb2FzdFRlbXBsYXRlIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvdG9hc3QvdG9hc3RcIjtcblxuY2xhc3MgSGVscGVycyB7XG4gICAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IEhlbHBlcnM7XG4gICAgcHJpdmF0ZSBtYWluV2luZG93OiBCcm93c2VyV2luZG93IHwgbnVsbCA9IG51bGw7XG4gICAgXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHt9XG4gICAgXG4gICAgc3RhdGljIGdldEluc3RhbmNlKCk6IEhlbHBlcnMge1xuICAgICAgICBpZiAoIUhlbHBlcnMuaW5zdGFuY2UpIHtcbiAgICAgICAgICAgIEhlbHBlcnMuaW5zdGFuY2UgPSBuZXcgSGVscGVycygpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBIZWxwZXJzLmluc3RhbmNlO1xuICAgIH1cbiAgICBcbiAgICBzZXRNYWluV2luZG93KG1haW5XaW5kb3c6IEJyb3dzZXJXaW5kb3cpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tYWluV2luZG93ID0gbWFpbldpbmRvdztcbiAgICB9XG4gICAgXG4gICAgYXN5bmMgc2hvd0FsZXJ0KFxuICAgICAgICBhbGVydFR5cGU6ICdpbmZvJyB8ICd3YXJuaW5nJyB8ICdlcnJvcicsIFxuICAgICAgICB0aXRsZTogc3RyaW5nLCBcbiAgICAgICAgbWVzc2FnZTogc3RyaW5nLCBcbiAgICAgICAgYnV0dG9uczogc3RyaW5nW11cbiAgICApOiBQcm9taXNlPG51bWJlcj4ge1xuICAgICAgICBjb25zdCBvcHRpb25zOiBNZXNzYWdlQm94T3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHR5cGU6IGFsZXJ0VHlwZSxcbiAgICAgICAgICAgIHRpdGxlLFxuICAgICAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgICAgIGJ1dHRvbnNcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoXG4gICAgICAgICAgICB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmXG4gICAgICAgICAgICB0eXBlb2YgKHdpbmRvdyBhcyB0eXBlb2Ygd2luZG93ICYgeyBDYXBhY2l0b3I/OiB1bmtub3duIH0pLkNhcGFjaXRvciAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgICAgICAgICAgdHlwZW9mIHdpbmRvdy5hbGVydCA9PT0gXCJmdW5jdGlvblwiXG4gICAgICAgICkge1xuICAgICAgICAgICAgd2luZG93LmFsZXJ0KFt0aXRsZSwgbWVzc2FnZV0uZmlsdGVyKEJvb2xlYW4pLmpvaW4oXCJcXG5cXG5cIikpO1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCB7IGRpYWxvZyB9ID0gYXdhaXQgaW1wb3J0KFwiZWxlY3Ryb25cIik7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGRpYWxvZy5zaG93TWVzc2FnZUJveCh0aGlzLm1haW5XaW5kb3chLCBvcHRpb25zKTtcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5yZXNwb25zZTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGxvZ2dlci5lcnJvcignRXJyb3IgZGlzcGxheWluZyBhbGVydDogJyArIChlcnJvciBhcyBFcnJvcikubWVzc2FnZSk7XG4gICAgICAgICAgICByZXR1cm4gLTE7IFxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHdhaXRGb3JFbG0oc2VsZWN0b3I6IHN0cmluZywgdGltZW91dDogbnVtYmVyID0gVElNRU9VVFMuRUxFTUVOVF9XQUlUKTogUHJvbWlzZTxFbGVtZW50PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBleGlzdGluZ0VsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgICAgIGlmIChleGlzdGluZ0VsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShleGlzdGluZ0VsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBvYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmJvZHksIHtcbiAgICAgICAgICAgICAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgc3VidHJlZTogdHJ1ZVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIG9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKGBUaW1lb3V0IHdhaXRpbmcgZm9yIGVsZW1lbnQgd2l0aCBzZWxlY3RvcjogJHtzZWxlY3Rvcn1gKSk7XG4gICAgICAgICAgICB9LCB0aW1lb3V0KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgd2FpdEZvckVsbUJ5WFBhdGgoeHBhdGg6IHN0cmluZywgdGltZW91dDogbnVtYmVyID0gVElNRU9VVFMuRUxFTUVOVF9XQUlUKTogUHJvbWlzZTxOb2RlPiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBldmFsdWF0ZVhQYXRoID0gKCk6IE5vZGUgfCBudWxsID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBkb2N1bWVudC5ldmFsdWF0ZShcbiAgICAgICAgICAgICAgICAgICAgeHBhdGgsIFxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudCwgXG4gICAgICAgICAgICAgICAgICAgIG51bGwsIFxuICAgICAgICAgICAgICAgICAgICBYUGF0aFJlc3VsdC5GSVJTVF9PUkRFUkVEX05PREVfVFlQRSwgXG4gICAgICAgICAgICAgICAgICAgIG51bGxcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuc2luZ2xlTm9kZVZhbHVlO1xuICAgICAgICAgICAgfTtcbiAgICBcbiAgICAgICAgICAgIGNvbnN0IGV4aXN0aW5nRWxlbWVudCA9IGV2YWx1YXRlWFBhdGgoKTtcbiAgICAgICAgICAgIGlmIChleGlzdGluZ0VsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShleGlzdGluZ0VsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gZXZhbHVhdGVYUGF0aCgpO1xuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShlbGVtZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICBcbiAgICAgICAgICAgIG9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQuYm9keSwge1xuICAgICAgICAgICAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBzdWJ0cmVlOiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICBcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIG9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKGBUaW1lb3V0IHdhaXRpbmcgZm9yIGVsZW1lbnQgd2l0aCBYUGF0aDogJHt4cGF0aH1gKSk7XG4gICAgICAgICAgICB9LCB0aW1lb3V0KTtcbiAgICAgICAgfSk7XG4gICAgfSAgICBcblxuICAgIHdhaXRGb3JUaXRsZUNoYW5nZSh0aW1lb3V0OiBudW1iZXIgPSBUSU1FT1VUUy5FTEVNRU5UX1dBSVQpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaGVhZEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkJyk7XG4gICAgICAgICAgICBpZiAoIWhlYWRFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChuZXcgRXJyb3IoJ0hlYWQgZWxlbWVudCBub3QgZm91bmQnKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgIG9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKGRvY3VtZW50LnRpdGxlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBvYnNlcnZlci5vYnNlcnZlKGhlYWRFbGVtZW50LCB7XG4gICAgICAgICAgICAgICAgc3VidHJlZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ1RpbWVvdXQgd2FpdGluZyBmb3IgZG9jdW1lbnQudGl0bGUgdG8gY2hhbmdlJykpO1xuICAgICAgICAgICAgfSwgdGltZW91dCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBjcmVhdGVUb2FzdCh0b2FzdElkOiBzdHJpbmcsIHRpdGxlOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZywgc3RhdHVzOiBcInN1Y2Nlc3NcIiB8IFwiZmFpbFwiIHwgXCJpbmZvXCIsIHRpbWVvdXRNczpudW1iZXIgPSAzMDAwKSB7XG4gICAgICAgIGNvbnN0IHRlbXBsYXRlID0gYXdhaXQgZ2V0VG9hc3RUZW1wbGF0ZSh0b2FzdElkLCB0aXRsZSwgbWVzc2FnZSwgc3RhdHVzKTtcbiAgICAgICAgY29uc3QgdG9hc3RDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFNFTEVDVE9SUy5UT0FTVF9DT05UQUlORVIpO1xuICAgICAgICBpZih0b2FzdENvbnRhaW5lcikge1xuICAgICAgICAgICAgdG9hc3RDb250YWluZXIuaW5uZXJIVE1MICs9IHRlbXBsYXRlO1xuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0b2FzdElkKT8ucmVtb3ZlKCk7XG4gICAgICAgICAgICB9LCB0aW1lb3V0TXMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRXhlY3V0ZSBKYXZhU2NyaXB0IGluIHRoZSBjb250ZXh0IG9mIFN0cmVtaW8ncyBjb3JlIHNlcnZpY2VzXG4gICAgICogQHBhcmFtIGpzIC0gSmF2YVNjcmlwdCBjb2RlIHRvIGV4ZWN1dGVcbiAgICAgKiBAcmV0dXJucyBQcm9taXNlIHdpdGggdGhlIHJlc3VsdCBvZiB0aGUgZXhlY3V0aW9uXG4gICAgICovXG4gICAgcHVibGljIF9ldmFsKGpzOiBzdHJpbmcpOiBQcm9taXNlPHVua25vd24+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZXZlbnROYW1lID0gJ3N0cmVtaW8tZW5oYW5jZWQnO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGNvbnN0IGhhbmRsZXIgPSAoZGF0YTogRXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2NyaXB0LnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKChkYXRhIGFzIEN1c3RvbUV2ZW50KS5kZXRhaWwpO1xuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGhhbmRsZXIsIHsgb25jZTogdHJ1ZSB9KTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBzY3JpcHQuaWQgPSBldmVudE5hbWU7XG4gICAgICAgICAgICAgICAgc2NyaXB0LmFwcGVuZENoaWxkKFxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShgXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY29yZSA9IHdpbmRvdy5zZXJ2aWNlcy5jb3JlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9ICR7anN9O1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQudGhlbigoYXdhaXRlZFJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoXCIke2V2ZW50TmFtZX1cIiwgeyBkZXRhaWw6IGF3YWl0ZWRSZXN1bHQgfSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoXCIke2V2ZW50TmFtZX1cIiwgeyBkZXRhaWw6IHJlc3VsdCB9KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGApLFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0RWxlbWVudEJ5WHBhdGgocGF0aDogc3RyaW5nKTogTm9kZSB8IG51bGwge1xuICAgICAgICByZXR1cm4gZG9jdW1lbnQuZXZhbHVhdGUoXG4gICAgICAgICAgICBwYXRoLCBcbiAgICAgICAgICAgIGRvY3VtZW50LCBcbiAgICAgICAgICAgIG51bGwsIFxuICAgICAgICAgICAgWFBhdGhSZXN1bHQuRklSU1RfT1JERVJFRF9OT0RFX1RZUEUsIFxuICAgICAgICAgICAgbnVsbFxuICAgICAgICApLnNpbmdsZU5vZGVWYWx1ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0RmlsZU5hbWVGcm9tVXJsKHVybDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgcGFydHMgPSB1cmwuc3BsaXQoJy8nKTtcbiAgICAgICAgcmV0dXJuIHBhcnRzW3BhcnRzLmxlbmd0aCAtIDFdIHx8ICcnO1xuICAgIH1cblxuICAgIHB1YmxpYyBmb3JtYXRUaW1lKHNlY29uZHM6IG51bWJlcik6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IGhvdXJzID0gTWF0aC5mbG9vcihzZWNvbmRzIC8gMzYwMCk7XG4gICAgICAgIGNvbnN0IG1pbnV0ZXMgPSBNYXRoLmZsb29yKChzZWNvbmRzICUgMzYwMCkgLyA2MCk7XG4gICAgICAgIGNvbnN0IHJlbWFpbmluZ1NlY29uZHMgPSBNYXRoLmZsb29yKHNlY29uZHMgJSA2MCk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gYCR7U3RyaW5nKGhvdXJzKS5wYWRTdGFydCgyLCAnMCcpfToke1N0cmluZyhtaW51dGVzKS5wYWRTdGFydCgyLCAnMCcpfToke1N0cmluZyhyZW1haW5pbmdTZWNvbmRzKS5wYWRTdGFydCgyLCAnMCcpfWA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29tcGFyZSB0d28gc2VtYW50aWMgdmVyc2lvbiBzdHJpbmdzXG4gICAgICogQHJldHVybnMgdHJ1ZSBpZiB2ZXJzaW9uMSA+IHZlcnNpb24yXG4gICAgICovXG4gICAgcHVibGljIGlzTmV3ZXJWZXJzaW9uKHZlcnNpb24xOiBzdHJpbmcsIHZlcnNpb24yOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3Qgbm9ybWFsaXplID0gKHY6IHN0cmluZyk6IG51bWJlcltdID0+IFxuICAgICAgICAgICAgdi5yZXBsYWNlKC9edi8sICcnKS5zcGxpdCgnLicpLm1hcChuID0+IHBhcnNlSW50KG4sIDEwKSB8fCAwKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHYxUGFydHMgPSBub3JtYWxpemUodmVyc2lvbjEpO1xuICAgICAgICBjb25zdCB2MlBhcnRzID0gbm9ybWFsaXplKHZlcnNpb24yKTtcbiAgICAgICAgY29uc3QgbWF4TGVuZ3RoID0gTWF0aC5tYXgodjFQYXJ0cy5sZW5ndGgsIHYyUGFydHMubGVuZ3RoKTtcbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWF4TGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHYxID0gdjFQYXJ0c1tpXSA/PyAwO1xuICAgICAgICAgICAgY29uc3QgdjIgPSB2MlBhcnRzW2ldID8/IDA7XG4gICAgICAgICAgICBpZiAodjEgPiB2MikgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICBpZiAodjEgPCB2MikgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5cbmNvbnN0IGhlbHBlcnNJbnN0YW5jZSA9IEhlbHBlcnMuZ2V0SW5zdGFuY2UoKTtcblxuZXhwb3J0IGRlZmF1bHQgaGVscGVyc0luc3RhbmNlO1xuIiwgImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGVzY2FwZUh0bWwodmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHZhbHVlLnJlcGxhY2UoL1smPD5cIiddL2csIGNoYXJhY3RlciA9PiAoe1xuICAgICAgICBcIiZcIjogXCImYW1wO1wiLFxuICAgICAgICBcIjxcIjogXCImbHQ7XCIsXG4gICAgICAgIFwiPlwiOiBcIiZndDtcIixcbiAgICAgICAgJ1wiJzogXCImcXVvdDtcIixcbiAgICAgICAgXCInXCI6IFwiJiMwMzk7XCIsXG4gICAgfSlbY2hhcmFjdGVyXSA/PyBjaGFyYWN0ZXIpO1xufVxuIiwgImltcG9ydCBUZW1wbGF0ZUNhY2hlIGZyb20gJy4uLy4uL3V0aWxzL3RlbXBsYXRlQ2FjaGUnO1xuaW1wb3J0IHsgTWV0YURhdGEgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL01ldGFEYXRhJztcbmltcG9ydCBlc2NhcGVIdG1sIGZyb20gJy4uLy4uL3V0aWxzL2VzY2FwZUh0bWwnO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UGx1Z2luSXRlbVRlbXBsYXRlKFxuICAgIGZpbGVuYW1lOiBzdHJpbmcsIFxuICAgIG1ldGFEYXRhOiBNZXRhRGF0YSxcbiAgICBjaGVja2VkOiBib29sZWFuXG4pOiBzdHJpbmcge1xuICAgIGxldCB0ZW1wbGF0ZSA9IFRlbXBsYXRlQ2FjaGUubG9hZChfX2Rpcm5hbWUsICdwbHVnaW4taXRlbScpO1xuICAgIFxuICAgIC8vIFJlcGxhY2UgbWV0YWRhdGEgcGxhY2Vob2xkZXJzXG4gICAgY29uc3QgbWV0YUtleXMgPSBbJ25hbWUnLCAnZGVzY3JpcHRpb24nLCAnYXV0aG9yJywgJ3ZlcnNpb24nXSBhcyBjb25zdDtcbiAgICBtZXRhS2V5cy5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgIGNvbnN0IHJlZ2V4ID0gbmV3IFJlZ0V4cChge3tcXFxccyoke2tleX1cXFxccyp9fWAsICdnJyk7XG4gICAgICAgIHRlbXBsYXRlID0gdGVtcGxhdGUucmVwbGFjZShyZWdleCwgZXNjYXBlSHRtbChtZXRhRGF0YVtrZXldIHx8ICcnKSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGVtcGxhdGVcbiAgICAgICAgLnJlcGxhY2UoXCJ7eyBjaGVja2VkIH19XCIsIGNoZWNrZWQgPyBcImNoZWNrZWRcIiA6IFwiXCIpXG4gICAgICAgIC5yZXBsYWNlKC9cXHtcXHtcXHMqZmlsZU5hbWVcXHMqXFx9XFx9L2csIGVzY2FwZUh0bWwoZmlsZW5hbWUpKTtcbn1cbiIsICJpbXBvcnQgVGVtcGxhdGVDYWNoZSBmcm9tICcuLi8uLi91dGlscy90ZW1wbGF0ZUNhY2hlJztcbmltcG9ydCB7IE1ldGFEYXRhIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9NZXRhRGF0YSc7XG5pbXBvcnQgZXNjYXBlSHRtbCBmcm9tICcuLi8uLi91dGlscy9lc2NhcGVIdG1sJztcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRoZW1lSXRlbVRlbXBsYXRlKFxuICAgIGZpbGVuYW1lOiBzdHJpbmcsIFxuICAgIG1ldGFEYXRhOiBNZXRhRGF0YSxcbiAgICBhcHBsaWVkOiBib29sZWFuXG4pOiBzdHJpbmcge1xuICAgIGxldCB0ZW1wbGF0ZSA9IFRlbXBsYXRlQ2FjaGUubG9hZChfX2Rpcm5hbWUsICd0aGVtZS1pdGVtJyk7XG4gICAgXG4gICAgLy8gUmVwbGFjZSBtZXRhZGF0YSBwbGFjZWhvbGRlcnNcbiAgICBjb25zdCBtZXRhS2V5cyA9IFsnbmFtZScsICdkZXNjcmlwdGlvbicsICdhdXRob3InLCAndmVyc2lvbiddIGFzIGNvbnN0O1xuICAgIG1ldGFLZXlzLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgY29uc3QgcmVnZXggPSBuZXcgUmVnRXhwKGB7e1xcXFxzKiR7a2V5fVxcXFxzKn19YCwgJ2cnKTtcbiAgICAgICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZS5yZXBsYWNlKHJlZ2V4LCBlc2NhcGVIdG1sKG1ldGFEYXRhW2tleV0gfHwgJycpKTtcbiAgICB9KTtcblxuICAgIHJldHVybiB0ZW1wbGF0ZVxuICAgICAgICAucmVwbGFjZShcInt7IGRpc2FibGVkIH19XCIsIGFwcGxpZWQgPyBcImRpc2FibGVkXCIgOiBcIlwiKVxuICAgICAgICAucmVwbGFjZSgvXFx7XFx7XFxzKmZpbGVOYW1lXFxzKlxcfVxcfS9nLCBlc2NhcGVIdG1sKGZpbGVuYW1lKSlcbiAgICAgICAgLnJlcGxhY2UoXCJ7eyBsYWJlbCB9fVwiLCBhcHBsaWVkID8gXCJBcHBsaWVkXCIgOiBcIkFwcGx5XCIpXG4gICAgICAgIC5yZXBsYWNlKFwie3sgYnV0dG9uQ2xhc3MgfX1cIiwgYXBwbGllZCA/IFwidW5pbnN0YWxsLWJ1dHRvbi1jb250YWluZXItb1Y0WW9cIiA6IFwiaW5zdGFsbC1idXR0b24tY29udGFpbmVyLXlmY3E1XCIpO1xufVxuIiwgImltcG9ydCBUZW1wbGF0ZUNhY2hlIGZyb20gJy4uLy4uL3V0aWxzL3RlbXBsYXRlQ2FjaGUnO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RW5oYW5jZWROYXYoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gVGVtcGxhdGVDYWNoZS5sb2FkKF9fZGlybmFtZSwgJ2VuaGFuY2VkLW5hdicpO1xufVxuIiwgImltcG9ydCB7IFBsYXRmb3JtTWFuYWdlciB9IGZyb20gXCIuLi9wbGF0Zm9ybS9QbGF0Zm9ybU1hbmFnZXJcIjtcblxuY2xhc3MgUHJvcGVydGllcyB7XG4gICAgcHVibGljIHN0YXRpYyB0aGVtZUxpbmtTZWxlY3Rvcjogc3RyaW5nID0gXCJoZWFkID4gbGlua1tyZWw9c3R5bGVzaGVldF1cIjtcblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IGVuaGFuY2VkUGF0aCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gUGxhdGZvcm1NYW5hZ2VyLmN1cnJlbnQuZ2V0RW5oYW5jZWRQYXRoKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXQgdGhlbWVzUGF0aCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gUGxhdGZvcm1NYW5hZ2VyLmN1cnJlbnQuZ2V0VGhlbWVzUGF0aCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IHBsdWdpbnNQYXRoKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC5nZXRQbHVnaW5zUGF0aCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgaXNVc2luZ1N0cmVtaW9TZXJ2aWNlID0gZmFsc2U7XG59XG5cbmV4cG9ydCBkZWZhdWx0IFByb3BlcnRpZXM7XG4iLCAiZXhwb3J0IGZ1bmN0aW9uIGdldEFwcGx5VGhlbWVUZW1wbGF0ZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiBgXG4gICAgYXN5bmMgZnVuY3Rpb24gYXBwbHlUaGVtZSh0aGVtZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcImFwcGx5aW5nIFwiICsgdGhlbWUpO1xuICAgICAgICBjb25zdCBjdXJyZW50VGhlbWUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImN1cnJlbnRUaGVtZVwiKTtcblxuICAgICAgICBpZiAoIXdpbmRvdy5zdHJlbWlvRW5oYW5jZWQ/LmFwcGx5VGhlbWUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJTdHJlbWlvIEVuaGFuY2VkIHRoZW1lIGJyaWRnZSBpcyB1bmF2YWlsYWJsZVwiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGFwcGxpZWQgPSBhd2FpdCB3aW5kb3cuc3RyZW1pb0VuaGFuY2VkLmFwcGx5VGhlbWUodGhlbWUpO1xuICAgICAgICBpZiAoIWFwcGxpZWQpIHJldHVybjtcblxuICAgICAgICBpZiAoY3VycmVudFRoZW1lKSB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50VGhlbWVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY3VycmVudFRoZW1lKTtcbiAgICAgICAgICAgIGlmIChjdXJyZW50VGhlbWVFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFRoZW1lRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiZGlzYWJsZWRcIik7XG5cbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudFRoZW1lICE9PSBcIkRlZmF1bHRcIikge1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50VGhlbWVFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJ1bmluc3RhbGwtYnV0dG9uLWNvbnRhaW5lci1vVjRZb1wiKTtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFRoZW1lRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiaW5zdGFsbC1idXR0b24tY29udGFpbmVyLXlmY3E1XCIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRUaGVtZUVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJ2YXIoLS1zZWNvbmRhcnktYWNjZW50LWNvbG9yKVwiO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGN1cnJlbnRUaGVtZUVsZW1lbnQuaW5uZXJUZXh0ID0gXCJBcHBseVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJjdXJyZW50VGhlbWVcIiwgdGhlbWUpO1xuXG4gICAgICAgIGNvbnN0IG5ld1RoZW1lRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoZW1lKTtcbiAgICAgICAgaWYgKG5ld1RoZW1lRWxlbWVudCkge1xuICAgICAgICAgICAgbmV3VGhlbWVFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJkaXNhYmxlZFwiKTtcblxuICAgICAgICAgICAgaWYgKHRoZW1lICE9PSBcIkRlZmF1bHRcIikge1xuICAgICAgICAgICAgICAgIG5ld1RoZW1lRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiaW5zdGFsbC1idXR0b24tY29udGFpbmVyLXlmY3E1XCIpO1xuICAgICAgICAgICAgICAgIG5ld1RoZW1lRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwidW5pbnN0YWxsLWJ1dHRvbi1jb250YWluZXItb1Y0WW9cIik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5ld1RoZW1lRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInZhcigtLW92ZXJsYXktY29sb3IpXCI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG5ld1RoZW1lRWxlbWVudC5pbm5lclRleHQgPSBcIkFwcGxpZWRcIjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmICghZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmRhdGFzZXQuc3RyZW1pb0VuaGFuY2VkVGhlbWVDbGlja0JvdW5kKSB7XG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5kYXRhc2V0LnN0cmVtaW9FbmhhbmNlZFRoZW1lQ2xpY2tCb3VuZCA9IFwidHJ1ZVwiO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQgaW5zdGFuY2VvZiBFbGVtZW50XG4gICAgICAgICAgICAgICAgPyBldmVudC50YXJnZXQuY2xvc2VzdChcIltkYXRhLXN0cmVtaW8tZW5oYW5jZWQtYXBwbHktdGhlbWVdXCIpXG4gICAgICAgICAgICAgICAgOiBudWxsO1xuICAgICAgICAgICAgY29uc3QgdGhlbWUgPSB0YXJnZXQ/LmdldEF0dHJpYnV0ZShcImRhdGEtc3RyZW1pby1lbmhhbmNlZC1hcHBseS10aGVtZVwiKTtcbiAgICAgICAgICAgIGlmICh0aGVtZSkgdm9pZCBhcHBseVRoZW1lKHRoZW1lKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGA7XG59XG4iLCAiaW1wb3J0IFNldHRpbmdzIGZyb20gXCIuL1NldHRpbmdzXCI7XG5pbXBvcnQgeyBQbGF0Zm9ybU1hbmFnZXIgfSBmcm9tIFwiLi4vcGxhdGZvcm0vUGxhdGZvcm1NYW5hZ2VyXCI7XG5pbXBvcnQgcHJvcGVydGllcyBmcm9tIFwiLi9Qcm9wZXJ0aWVzXCI7XG5pbXBvcnQgaGVscGVycyBmcm9tIFwiLi4vdXRpbHMvSGVscGVyc1wiO1xuaW1wb3J0IHsgTWV0YURhdGEgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9NZXRhRGF0YVwiO1xuaW1wb3J0IHsgZ2V0TG9nZ2VyIH0gZnJvbSBcIi4uL3V0aWxzL2xvZ2dlclwiO1xuaW1wb3J0IHsgZ2V0QXBwbHlUaGVtZVRlbXBsYXRlIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvYXBwbHktdGhlbWUvYXBwbHlUaGVtZVwiO1xuaW1wb3J0IHsgYmFzZW5hbWUsIGpvaW4gfSBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgU1RPUkFHRV9LRVlTLCBDTEFTU0VTLCBVUkxTLCBGSUxFX0VYVEVOU0lPTlMgfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgRXh0cmFjdE1ldGFEYXRhIGZyb20gXCIuLi91dGlscy9FeHRyYWN0TWV0YURhdGFcIjtcbmltcG9ydCBQbHVnaW5PcHRpb25zIGZyb20gXCIuL1BsdWdpbk9wdGlvbnNcIjtcbmltcG9ydCByZWxvYWRBcHBsaWNhdGlvbiBmcm9tIFwiLi4vdXRpbHMvcmVsb2FkQXBwbGljYXRpb25cIjtcbmltcG9ydCB7IGlzU2FmZU1vZEZpbGVOYW1lIH0gZnJvbSBcIi4uL3V0aWxzL21vZEZpbGVOYW1lXCI7XG5cbmNsYXNzIE1vZE1hbmFnZXIge1xuICAgIHByaXZhdGUgc3RhdGljIGxvZ2dlciA9IGdldExvZ2dlcihcIk1vZE1hbmFnZXJcIik7XG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgQVBQTFlfVEhFTUVfU0NSSVBUX0lEID0gXCJzdHJlbWlvLWVuaGFuY2VkLWFwcGx5LXRoZW1lLXNjcmlwdFwiO1xuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IE1BWF9NT0RfRE9XTkxPQURfQllURVMgPSA1ICogMTAyNCAqIDEwMjQ7XG4gICAgcHJpdmF0ZSBzdGF0aWMgc2Nyb2xsTGlzdGVuZXJSZWFkeSA9IGZhbHNlO1xuICAgIHByaXZhdGUgc3RhdGljIHNjcm9sbExpc3RlbmVyU2V0dXBQZW5kaW5nID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIHN0YXRpYyBnZXRFbmFibGVkUGx1Z2lucygpOiBzdHJpbmdbXSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBzdG9yZWRWYWx1ZTogdW5rbm93biA9IEpTT04ucGFyc2UoXG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLmdldEl0ZW0oU1RPUkFHRV9LRVlTLkVOQUJMRURfUExVR0lOUykgfHwgXCJbXVwiXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkoc3RvcmVkVmFsdWUpXG4gICAgICAgICAgICAgICAgPyBzdG9yZWRWYWx1ZS5maWx0ZXIoKHZhbHVlKTogdmFsdWUgaXMgc3RyaW5nID0+IHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIilcbiAgICAgICAgICAgICAgICA6IFtdO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIud2FybihgRmFpbGVkIHRvIHBhcnNlIGVuYWJsZWQgcGx1Z2luczogJHtlcnJvcn1gKTtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGRlY29kZUZpbGVOYW1lKGZpbGVOYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChmaWxlTmFtZSk7XG4gICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgICAgcmV0dXJuIGZpbGVOYW1lO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgc2FuaXRpemVNb2RGaWxlTmFtZShcbiAgICAgICAgZmlsZU5hbWU6IHN0cmluZyxcbiAgICAgICAgdHlwZTogXCJwbHVnaW5cIiB8IFwidGhlbWVcIlxuICAgICk6IHN0cmluZyB8IG51bGwge1xuICAgICAgICBjb25zdCBub3JtYWxpemVkID0gdGhpcy5kZWNvZGVGaWxlTmFtZShiYXNlbmFtZShmaWxlTmFtZSkudHJpbSgpKTtcbiAgICAgICAgcmV0dXJuIGlzU2FmZU1vZEZpbGVOYW1lKG5vcm1hbGl6ZWQsIHR5cGUpID8gbm9ybWFsaXplZCA6IG51bGw7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgaXNTdXBwb3J0ZWRSZW1vdGVVcmwocmF3VXJsOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHVybCA9IG5ldyBVUkwocmF3VXJsKTtcbiAgICAgICAgICAgIHJldHVybiB1cmwucHJvdG9jb2wgPT09IFwiaHR0cHM6XCI7XG4gICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgYXNzZXJ0U2VjdXJlUmVzcG9uc2VVcmwocmVzcG9uc2U6IFJlc3BvbnNlLCBmYWxsYmFja1VybDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGZpbmFsVXJsID0gbmV3IFVSTChyZXNwb25zZS51cmwgfHwgZmFsbGJhY2tVcmwpO1xuICAgICAgICBpZiAoZmluYWxVcmwucHJvdG9jb2wgIT09IFwiaHR0cHM6XCIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgUmVmdXNlZCBpbnNlY3VyZSByZWRpcmVjdCB0byAke2ZpbmFsVXJsLnByb3RvY29sfWApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgYXN5bmMgcmVhZExpbWl0ZWRNb2RDb250ZW50KHJlc3BvbnNlOiBSZXNwb25zZSk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIGNvbnN0IGNvbnRlbnRMZW5ndGggPSBOdW1iZXIocmVzcG9uc2UuaGVhZGVycy5nZXQoXCJjb250ZW50LWxlbmd0aFwiKSk7XG4gICAgICAgIGlmIChOdW1iZXIuaXNGaW5pdGUoY29udGVudExlbmd0aCkgJiYgY29udGVudExlbmd0aCA+IHRoaXMuTUFYX01PRF9ET1dOTE9BRF9CWVRFUykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTW9kIGRvd25sb2FkIGV4Y2VlZHMgdGhlIDUgTWlCIHNpemUgbGltaXRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXJlc3BvbnNlLmJvZHkpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XG4gICAgICAgICAgICBpZiAobmV3IFRleHRFbmNvZGVyKCkuZW5jb2RlKGNvbnRlbnQpLmJ5dGVMZW5ndGggPiB0aGlzLk1BWF9NT0RfRE9XTkxPQURfQllURVMpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNb2QgZG93bmxvYWQgZXhjZWVkcyB0aGUgNSBNaUIgc2l6ZSBsaW1pdFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjb250ZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcmVhZGVyID0gcmVzcG9uc2UuYm9keS5nZXRSZWFkZXIoKTtcbiAgICAgICAgY29uc3QgZGVjb2RlciA9IG5ldyBUZXh0RGVjb2RlcigpO1xuICAgICAgICBsZXQgYnl0ZXNSZWFkID0gMDtcbiAgICAgICAgbGV0IGNvbnRlbnQgPSBcIlwiO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IGRvbmUsIHZhbHVlIH0gPSBhd2FpdCByZWFkZXIucmVhZCgpO1xuICAgICAgICAgICAgICAgIGlmIChkb25lKSBicmVhaztcbiAgICAgICAgICAgICAgICBieXRlc1JlYWQgKz0gdmFsdWUuYnl0ZUxlbmd0aDtcbiAgICAgICAgICAgICAgICBpZiAoYnl0ZXNSZWFkID4gdGhpcy5NQVhfTU9EX0RPV05MT0FEX0JZVEVTKSB7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHJlYWRlci5jYW5jZWwoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTW9kIGRvd25sb2FkIGV4Y2VlZHMgdGhlIDUgTWlCIHNpemUgbGltaXRcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnRlbnQgKz0gZGVjb2Rlci5kZWNvZGUodmFsdWUsIHsgc3RyZWFtOiB0cnVlIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNvbnRlbnQgKyBkZWNvZGVyLmRlY29kZSgpO1xuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgcmVhZGVyLnJlbGVhc2VMb2NrKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgLyoqXG4gICAgICogTG9hZCBhbmQgZW5hYmxlIGEgcGx1Z2luIGJ5IGZpbGVuYW1lXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBhc3luYyBsb2FkUGx1Z2luKHBsdWdpbk5hbWU6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBpZiAoIWlzU2FmZU1vZEZpbGVOYW1lKHBsdWdpbk5hbWUsIFwicGx1Z2luXCIpKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci53YXJuKGBSZWZ1c2VkIHRvIGxvYWQgcGx1Z2luIHdpdGggdW5zYWZlIGZpbGVuYW1lOiAke3BsdWdpbk5hbWV9YCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBsdWdpbk5hbWUpKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKGBQbHVnaW4gJHtwbHVnaW5OYW1lfSBpcyBhbHJlYWR5IGxvYWRlZGApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcGx1Z2luUGF0aCA9IGpvaW4ocHJvcGVydGllcy5wbHVnaW5zUGF0aCwgcGx1Z2luTmFtZSk7XG4gICAgICAgIFxuICAgICAgICBpZiAoIWF3YWl0IFBsYXRmb3JtTWFuYWdlci5jdXJyZW50LmV4aXN0cyhwbHVnaW5QYXRoKSkge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoYFBsdWdpbiBmaWxlIG5vdCBmb3VuZDogJHtwbHVnaW5QYXRofWApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHBsdWdpbjogc3RyaW5nO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcGx1Z2luID0gYXdhaXQgUGxhdGZvcm1NYW5hZ2VyLmN1cnJlbnQucmVhZEZpbGUocGx1Z2luUGF0aCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcihgRmFpbGVkIHRvIHJlYWQgcGx1Z2luICR7cGx1Z2luTmFtZX06ICR7ZXJyb3J9YCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtZXRhRGF0YSA9IEV4dHJhY3RNZXRhRGF0YS5leHRyYWN0TWV0YWRhdGFGcm9tVGV4dChwbHVnaW4pO1xuICAgICAgICBQbHVnaW5PcHRpb25zLnJlZ2lzdGVyKHBsdWdpbk5hbWUsIG1ldGFEYXRhPy5vcHRpb25zID8/IFtdKTtcblxuICAgICAgICBjb25zdCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuICAgICAgICBzY3JpcHQudGV4dENvbnRlbnQgPSBwbHVnaW47XG4gICAgICAgIHNjcmlwdC5pZCA9IHBsdWdpbk5hbWU7XG4gICAgICAgIHNjcmlwdC5kYXRhc2V0LnN0cmVtaW9FbmhhbmNlZFBsdWdpbiA9IHBsdWdpbk5hbWU7XG4gICAgICAgIFxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBlbmFibGVkUGx1Z2lucyA9IHRoaXMuZ2V0RW5hYmxlZFBsdWdpbnMoKTtcbiAgICAgICAgXG4gICAgICAgIGlmICghZW5hYmxlZFBsdWdpbnMuaW5jbHVkZXMocGx1Z2luTmFtZSkpIHtcbiAgICAgICAgICAgIGVuYWJsZWRQbHVnaW5zLnB1c2gocGx1Z2luTmFtZSk7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShTVE9SQUdFX0tFWVMuRU5BQkxFRF9QTFVHSU5TLCBKU09OLnN0cmluZ2lmeShlbmFibGVkUGx1Z2lucykpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKGBQbHVnaW4gJHtwbHVnaW5OYW1lfSBsb2FkZWQhYCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9hZCB0aGUgaW5zdGFsbGVkIHBsdWdpbnMgdGhhdCB0aGUgdXNlciBwcmV2aW91c2x5IGVuYWJsZWQuXG4gICAgICogRGlzY292ZXJ5IGFuZCBpbmRpdmlkdWFsIHBsdWdpbiBmYWlsdXJlcyBhcmUgaXNvbGF0ZWQgc28gb25lIGJyb2tlbiBmaWxlXG4gICAgICogY2Fubm90IHByZXZlbnQgdGhlIHJlbWFpbmluZyBlbmFibGVkIHBsdWdpbnMgZnJvbSBzdGFydGluZy5cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGFzeW5jIGxvYWRFbmFibGVkUGx1Z2lucygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgY29uc3QgZW5hYmxlZFBsdWdpbnMgPSBuZXcgU2V0KHRoaXMuZ2V0RW5hYmxlZFBsdWdpbnMoKSk7XG4gICAgICAgIGxldCBpbnN0YWxsZWRQbHVnaW5zOiBzdHJpbmdbXTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcGx1Z2luc1BhdGggPSBwcm9wZXJ0aWVzLnBsdWdpbnNQYXRoO1xuICAgICAgICAgICAgaWYgKCFhd2FpdCBQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC5leGlzdHMocGx1Z2luc1BhdGgpKSByZXR1cm47XG5cbiAgICAgICAgICAgIGluc3RhbGxlZFBsdWdpbnMgPSAoYXdhaXQgUGxhdGZvcm1NYW5hZ2VyLmN1cnJlbnQucmVhZGRpcihwbHVnaW5zUGF0aCkpXG4gICAgICAgICAgICAgICAgLmZpbHRlcihmaWxlTmFtZSA9PiBpc1NhZmVNb2RGaWxlTmFtZShmaWxlTmFtZSwgXCJwbHVnaW5cIikpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoYEZhaWxlZCB0byBkaXNjb3ZlciBlbmFibGVkIHBsdWdpbnM6ICR7ZXJyb3J9YCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGNvbnN0IHBsdWdpbk5hbWUgb2YgaW5zdGFsbGVkUGx1Z2lucykge1xuICAgICAgICAgICAgaWYgKCFlbmFibGVkUGx1Z2lucy5oYXMocGx1Z2luTmFtZSkpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMubG9hZFBsdWdpbihwbHVnaW5OYW1lKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoYEZhaWxlZCB0byBsb2FkIGVuYWJsZWQgcGx1Z2luICR7cGx1Z2luTmFtZX06ICR7ZXJyb3J9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgLyoqXG4gICAgICogVW5sb2FkIGFuZCBkaXNhYmxlIGEgcGx1Z2luIGJ5IGZpbGVuYW1lXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyB1bmxvYWRQbHVnaW4ocGx1Z2luTmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGlmICghaXNTYWZlTW9kRmlsZU5hbWUocGx1Z2luTmFtZSwgXCJwbHVnaW5cIikpIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLndhcm4oYFJlZnVzZWQgdG8gdW5sb2FkIHBsdWdpbiB3aXRoIHVuc2FmZSBmaWxlbmFtZTogJHtwbHVnaW5OYW1lfWApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBsdWdpbkVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwbHVnaW5OYW1lKTtcbiAgICAgICAgaWYgKHBsdWdpbkVsZW1lbnQpIHtcbiAgICAgICAgICAgIHBsdWdpbkVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCBlbmFibGVkUGx1Z2lucyA9IHRoaXMuZ2V0RW5hYmxlZFBsdWdpbnMoKTtcbiAgICAgICAgZW5hYmxlZFBsdWdpbnMgPSBlbmFibGVkUGx1Z2lucy5maWx0ZXIoKHg6IHN0cmluZykgPT4geCAhPT0gcGx1Z2luTmFtZSk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFNUT1JBR0VfS0VZUy5FTkFCTEVEX1BMVUdJTlMsIEpTT04uc3RyaW5naWZ5KGVuYWJsZWRQbHVnaW5zKSk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKGBQbHVnaW4gJHtwbHVnaW5OYW1lfSB1bmxvYWRlZCFgKTtcbiAgICAgICAgcmVsb2FkQXBwbGljYXRpb24oKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGJpbmRQbHVnaW5Ub2dnbGUoXG4gICAgICAgIHRvZ2dsZTogSFRNTEVsZW1lbnQsXG4gICAgICAgIHBsdWdpbk5hbWU6IHN0cmluZyxcbiAgICAgICAgYWxsb3dQcm9ncmFtbWF0aWNBY3RpdmF0aW9uID0gZmFsc2VcbiAgICApOiB2b2lkIHtcbiAgICAgICAgaWYgKCFpc1NhZmVNb2RGaWxlTmFtZShwbHVnaW5OYW1lLCBcInBsdWdpblwiKSkge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIud2FybihgUmVmdXNlZCB0byBiaW5kIHVuc2FmZSBwbHVnaW4gZmlsZW5hbWU6ICR7cGx1Z2luTmFtZX1gKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodG9nZ2xlLmRhdGFzZXQuc3RyZW1pb0VuaGFuY2VkVG9nZ2xlQm91bmQgPT09IFwidHJ1ZVwiKSByZXR1cm47XG5cbiAgICAgICAgdG9nZ2xlLmRhdGFzZXQuc3RyZW1pb0VuaGFuY2VkVG9nZ2xlQm91bmQgPSBcInRydWVcIjtcbiAgICAgICAgdG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBldmVudCA9PiB7XG4gICAgICAgICAgICBpZiAoIWV2ZW50LmlzVHJ1c3RlZCAmJiAhYWxsb3dQcm9ncmFtbWF0aWNBY3RpdmF0aW9uKSByZXR1cm47XG5cbiAgICAgICAgICAgIHRvZ2dsZS5jbGFzc0xpc3QudG9nZ2xlKENMQVNTRVMuQ0hFQ0tFRCk7XG4gICAgICAgICAgICBpZiAodG9nZ2xlLmNsYXNzTGlzdC5jb250YWlucyhDTEFTU0VTLkNIRUNLRUQpKSB7XG4gICAgICAgICAgICAgICAgdm9pZCB0aGlzLmxvYWRQbHVnaW4ocGx1Z2luTmFtZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMudW5sb2FkUGx1Z2luKHBsdWdpbk5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGZXRjaCBtb2RzIGZyb20gdGhlIHJlZ2lzdHJ5IHJlcG9zaXRvcnlcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGFzeW5jIGZldGNoTW9kcygpOiBQcm9taXNlPHsgcGx1Z2luczogdW5rbm93bltdOyB0aGVtZXM6IHVua25vd25bXSB9PiB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goVVJMUy5SRUdJU1RSWSk7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRG93bmxvYWQgYW5kIHNhdmUgYSBtb2QgKHBsdWdpbiBvciB0aGVtZSlcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGFzeW5jIGRvd25sb2FkTW9kKG1vZExpbms6IHN0cmluZywgdHlwZTogXCJwbHVnaW5cIiB8IFwidGhlbWVcIik6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIHRoaXMubG9nZ2VyLmluZm8oYERvd25sb2FkaW5nICR7dHlwZX0gZnJvbTogJHttb2RMaW5rfWApO1xuXG4gICAgICAgIGNvbnN0IG1vZFVybCA9IG5ldyBVUkwobW9kTGluayk7XG4gICAgICAgIGlmIChtb2RVcmwucHJvdG9jb2wgIT09IFwiaHR0cHM6XCIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5zdXBwb3J0ZWQgVVJMIHByb3RvY29sIGZvciAke3R5cGV9OiAke21vZFVybC5wcm90b2NvbH1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2gobW9kVXJsLnRvU3RyaW5nKCkpO1xuICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBkb3dubG9hZDogJHtyZXNwb25zZS5zdGF0dXN9ICR7cmVzcG9uc2Uuc3RhdHVzVGV4dH1gKTtcbiAgICAgICAgdGhpcy5hc3NlcnRTZWN1cmVSZXNwb25zZVVybChyZXNwb25zZSwgbW9kVXJsLnRvU3RyaW5nKCkpO1xuICAgICAgICBcbiAgICAgICAgY29uc3Qgc2F2ZURpciA9IHR5cGUgPT09IFwicGx1Z2luXCIgPyBwcm9wZXJ0aWVzLnBsdWdpbnNQYXRoIDogcHJvcGVydGllcy50aGVtZXNQYXRoO1xuICAgICAgICBpZiAoIWF3YWl0IFBsYXRmb3JtTWFuYWdlci5jdXJyZW50LmV4aXN0cyhzYXZlRGlyKSkge1xuICAgICAgICAgICAgYXdhaXQgUGxhdGZvcm1NYW5hZ2VyLmN1cnJlbnQubWtkaXIoc2F2ZURpcik7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGZhbGxiYWNrTmFtZSA9IGAke3R5cGV9LSR7RGF0ZS5ub3coKX0ke3R5cGUgPT09IFwidGhlbWVcIiA/IEZJTEVfRVhURU5TSU9OUy5USEVNRSA6IEZJTEVfRVhURU5TSU9OUy5QTFVHSU59YDtcbiAgICAgICAgY29uc3QgdW5zYWZlTmFtZSA9IGJhc2VuYW1lKG1vZFVybC5wYXRobmFtZSkgfHwgZmFsbGJhY2tOYW1lO1xuICAgICAgICBjb25zdCBmaWxlbmFtZSA9IHRoaXMuc2FuaXRpemVNb2RGaWxlTmFtZSh1bnNhZmVOYW1lLCB0eXBlKTtcbiAgICAgICAgaWYgKCFmaWxlbmFtZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBSZWZ1c2VkIHRvIHNhdmUgJHt0eXBlfSB3aXRoIHVuc2FmZSBmaWxlbmFtZTogJHt1bnNhZmVOYW1lfWApO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZmlsZVBhdGggPSBqb2luKHNhdmVEaXIsIGZpbGVuYW1lKTtcblxuICAgICAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgdGhpcy5yZWFkTGltaXRlZE1vZENvbnRlbnQocmVzcG9uc2UpO1xuICAgICAgICBhd2FpdCBQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC53cml0ZUZpbGUoZmlsZVBhdGgsIGNvbnRlbnQpO1xuXG4gICAgICAgIHRoaXMubG9nZ2VyLmluZm8oYERvd25sb2FkZWQgJHt0eXBlfSBzYXZlZCB0bzogJHtmaWxlUGF0aH1gKTtcbiAgICAgICAgcmV0dXJuIGZpbGVQYXRoO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZSBhIG1vZCBmaWxlIGFuZCBjbGVhbiB1cCBhc3NvY2lhdGVkIHN0YXRlXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBhc3luYyByZW1vdmVNb2QoZmlsZU5hbWU6IHN0cmluZywgdHlwZTogXCJwbHVnaW5cIiB8IFwidGhlbWVcIik6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBjb25zdCBkZWNvZGVkRmlsZU5hbWUgPSB0aGlzLmRlY29kZUZpbGVOYW1lKGZpbGVOYW1lLnRyaW0oKSk7XG4gICAgICAgIGlmICghaXNTYWZlTW9kRmlsZU5hbWUoZGVjb2RlZEZpbGVOYW1lLCB0eXBlKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBSZWZ1c2VkIHRvIHJlbW92ZSAke3R5cGV9IHdpdGggdW5zYWZlIGZpbGVuYW1lOiAke2ZpbGVOYW1lfWApO1xuICAgICAgICB9XG4gICAgICAgIGZpbGVOYW1lID0gZGVjb2RlZEZpbGVOYW1lO1xuICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKGBSZW1vdmluZyAke3R5cGV9IGZpbGU6ICR7ZmlsZU5hbWV9YCk7XG5cbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICBjYXNlIFwicGx1Z2luXCI6XG4gICAgICAgICAgICAgICAgaWYgKGF3YWl0IHRoaXMuaXNQbHVnaW5JbnN0YWxsZWQoZmlsZU5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHdhc0VuYWJsZWQgPSB0aGlzLmdldEVuYWJsZWRQbHVnaW5zKCkuaW5jbHVkZXMoZmlsZU5hbWUpO1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC51bmxpbmsoam9pbihwcm9wZXJ0aWVzLnBsdWdpbnNQYXRoLCBmaWxlTmFtZSkpO1xuICAgICAgICAgICAgICAgICAgICBQbHVnaW5PcHRpb25zLnJlbW92ZShmaWxlTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh3YXNFbmFibGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVubG9hZFBsdWdpbihmaWxlTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwidGhlbWVcIjpcbiAgICAgICAgICAgICAgICBpZiAoYXdhaXQgdGhpcy5pc1RoZW1lSW5zdGFsbGVkKGZpbGVOYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oU1RPUkFHRV9LRVlTLkNVUlJFTlRfVEhFTUUpID09PSBmaWxlTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oU1RPUkFHRV9LRVlTLkNVUlJFTlRfVEhFTUUsIFwiRGVmYXVsdFwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFjdGl2ZVRoZW1lXCIpPy5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgUGxhdGZvcm1NYW5hZ2VyLmN1cnJlbnQudW5saW5rKGpvaW4ocHJvcGVydGllcy50aGVtZXNQYXRoLCBmaWxlTmFtZSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgYXN5bmMgaXNUaGVtZUluc3RhbGxlZChmaWxlTmFtZTogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICAgIHJldHVybiAoYXdhaXQgdGhpcy5nZXRJbnN0YWxsZWRUaGVtZXMoKSkuaW5jbHVkZXMoZmlsZU5hbWUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgYXN5bmMgaXNQbHVnaW5JbnN0YWxsZWQoZmlsZU5hbWU6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgICAgICByZXR1cm4gKGF3YWl0IHRoaXMuZ2V0SW5zdGFsbGVkUGx1Z2lucygpKS5pbmNsdWRlcyhmaWxlTmFtZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgYXN5bmMgZ2V0SW5zdGFsbGVkVGhlbWVzKCk6IFByb21pc2U8c3RyaW5nW10+IHtcbiAgICAgICAgY29uc3QgZGlyUGF0aCA9IHByb3BlcnRpZXMudGhlbWVzUGF0aDtcbiAgICAgICAgaWYgKCFhd2FpdCBQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC5leGlzdHMoZGlyUGF0aCkpIHJldHVybiBbXTtcblxuICAgICAgICBjb25zdCBmaWxlcyA9IGF3YWl0IFBsYXRmb3JtTWFuYWdlci5jdXJyZW50LnJlYWRkaXIoZGlyUGF0aCk7XG4gICAgICAgIGNvbnN0IGZpbGVTdGF0cyA9IGF3YWl0IFByb21pc2UuYWxsKGZpbGVzLm1hcChhc3luYyBmaWxlID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXQgPSBhd2FpdCBQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC5zdGF0KGpvaW4oZGlyUGF0aCwgZmlsZSkpO1xuICAgICAgICAgICAgcmV0dXJuIHsgZmlsZSwgaXNGaWxlOiBzdGF0LmlzRmlsZSB9O1xuICAgICAgICB9KSk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZmlsZVN0YXRzLmZpbHRlcihmID0+IGYuaXNGaWxlKS5tYXAoZiA9PiBmLmZpbGUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGFzeW5jIGdldEluc3RhbGxlZFBsdWdpbnMoKTogUHJvbWlzZTxzdHJpbmdbXT4ge1xuICAgICAgICBjb25zdCBkaXJQYXRoID0gcHJvcGVydGllcy5wbHVnaW5zUGF0aDtcbiAgICAgICAgaWYgKCFhd2FpdCBQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC5leGlzdHMoZGlyUGF0aCkpIHJldHVybiBbXTtcblxuICAgICAgICBjb25zdCBmaWxlcyA9IGF3YWl0IFBsYXRmb3JtTWFuYWdlci5jdXJyZW50LnJlYWRkaXIoZGlyUGF0aCk7XG4gICAgICAgIGNvbnN0IGZpbGVTdGF0cyA9IGF3YWl0IFByb21pc2UuYWxsKGZpbGVzLm1hcChhc3luYyBmaWxlID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXQgPSBhd2FpdCBQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC5zdGF0KGpvaW4oZGlyUGF0aCwgZmlsZSkpO1xuICAgICAgICAgICAgcmV0dXJuIHsgZmlsZSwgaXNGaWxlOiBzdGF0LmlzRmlsZSB9O1xuICAgICAgICB9KSk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZmlsZVN0YXRzLmZpbHRlcihmID0+IGYuaXNGaWxlKS5tYXAoZiA9PiBmLmZpbGUpO1xuICAgIH1cbiAgICBcbiAgICBwdWJsaWMgc3RhdGljIG9wZW5UaGVtZXNGb2xkZXIoKTogdm9pZCB7XG4gICAgICAgIGhlbHBlcnMud2FpdEZvckVsbShcIiNvcGVudGhlbWVzZm9sZGVyQnRuXCIpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvcGVudGhlbWVzZm9sZGVyQnRuXCIpIGFzIEhUTUxFbGVtZW50IHwgbnVsbDtcbiAgICAgICAgICAgIGlmICghYnV0dG9uIHx8IGJ1dHRvbi5kYXRhc2V0LnN0cmVtaW9FbmhhbmNlZENsaWNrQm91bmQgPT09IFwidHJ1ZVwiKSByZXR1cm47XG5cbiAgICAgICAgICAgIGJ1dHRvbi5kYXRhc2V0LnN0cmVtaW9FbmhhbmNlZENsaWNrQm91bmQgPSBcInRydWVcIjtcbiAgICAgICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMub3BlbkZvbGRlcihwcm9wZXJ0aWVzLnRoZW1lc1BhdGgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pLmNhdGNoKGVyciA9PiB0aGlzLmxvZ2dlci5lcnJvcihgRmFpbGVkIHRvIHNldHVwIHRoZW1lcyBmb2xkZXIgYnV0dG9uOiAke2Vycn1gKSk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBvcGVuUGx1Z2luc0ZvbGRlcigpOiB2b2lkIHtcbiAgICAgICAgaGVscGVycy53YWl0Rm9yRWxtKFwiI29wZW5wbHVnaW5zZm9sZGVyQnRuXCIpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvcGVucGx1Z2luc2ZvbGRlckJ0blwiKSBhcyBIVE1MRWxlbWVudCB8IG51bGw7XG4gICAgICAgICAgICBpZiAoIWJ1dHRvbiB8fCBidXR0b24uZGF0YXNldC5zdHJlbWlvRW5oYW5jZWRDbGlja0JvdW5kID09PSBcInRydWVcIikgcmV0dXJuO1xuXG4gICAgICAgICAgICBidXR0b24uZGF0YXNldC5zdHJlbWlvRW5oYW5jZWRDbGlja0JvdW5kID0gXCJ0cnVlXCI7XG4gICAgICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLm9wZW5Gb2xkZXIocHJvcGVydGllcy5wbHVnaW5zUGF0aCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSkuY2F0Y2goZXJyID0+IHRoaXMubG9nZ2VyLmVycm9yKGBGYWlsZWQgdG8gc2V0dXAgcGx1Z2lucyBmb2xkZXIgYnV0dG9uOiAke2Vycn1gKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT3BlbiBhIGZvbGRlciBpbiB0aGUgc3lzdGVtIGZpbGUgZXhwbG9yZXJcbiAgICAgKi9cbiAgICBwcml2YXRlIHN0YXRpYyBhc3luYyBvcGVuRm9sZGVyKGZvbGRlclBhdGg6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgYXdhaXQgUGxhdGZvcm1NYW5hZ2VyLmN1cnJlbnQub3BlblBhdGgoZm9sZGVyUGF0aCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcihgRmFpbGVkIHRvIG9wZW4gZm9sZGVyICR7Zm9sZGVyUGF0aH06ICR7ZXJyb3J9YCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgICAgIFxuICAgIHB1YmxpYyBzdGF0aWMgc2Nyb2xsTGlzdGVuZXIoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnNjcm9sbExpc3RlbmVyUmVhZHkgfHwgdGhpcy5zY3JvbGxMaXN0ZW5lclNldHVwUGVuZGluZykgcmV0dXJuO1xuICAgICAgICB0aGlzLnNjcm9sbExpc3RlbmVyU2V0dXBQZW5kaW5nID0gdHJ1ZTtcblxuICAgICAgICBoZWxwZXJzLndhaXRGb3JFbG0oJ1tkYXRhLXNlY3Rpb249XCJlbmhhbmNlZFwiXScpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZW5oYW5jZWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZW5oYW5jZWQnKTtcbiAgICAgICAgICAgIGNvbnN0IGVuaGFuY2VkTmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtc2VjdGlvbj1cImVuaGFuY2VkXCJdJykgYXMgSFRNTEVsZW1lbnQgfCBudWxsO1xuXG4gICAgICAgICAgICBpZiAoIShlbmhhbmNlZCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB8fCAhZW5oYW5jZWROYXYpIHJldHVybjtcblxuICAgICAgICAgICAgaWYgKGVuaGFuY2VkTmF2LmRhdGFzZXQuc3RyZW1pb0VuaGFuY2VkU2Nyb2xsQm91bmQgPT09IFwidHJ1ZVwiKSByZXR1cm47XG4gICAgICAgICAgICBlbmhhbmNlZE5hdi5kYXRhc2V0LnN0cmVtaW9FbmhhbmNlZFNjcm9sbEJvdW5kID0gXCJ0cnVlXCI7XG5cbiAgICAgICAgICAgIGVuaGFuY2VkTmF2LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZmlyc3RDaGlsZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZW5oYW5jZWQgPiBkaXZcIik7XG4gICAgICAgICAgICAgICAgZmlyc3RDaGlsZD8uc2Nyb2xsSW50b1ZpZXcoe1xuICAgICAgICAgICAgICAgICAgICBiZWhhdmlvcjogJ3Ntb290aCcsXG4gICAgICAgICAgICAgICAgICAgIGJsb2NrOiAnc3RhcnQnXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgU2V0dGluZ3MuYWN0aXZlU2VjdGlvbihlbmhhbmNlZE5hdik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKGVudHJpZXMpID0+IHtcbiAgICAgICAgICAgICAgICBlbnRyaWVzLmZvckVhY2goZW50cnkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZW50cnkuaXNJbnRlcnNlY3RpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFNldHRpbmdzLmFjdGl2ZVNlY3Rpb24oZW5oYW5jZWROYXYpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW5oYW5jZWROYXYuY2xhc3NMaXN0LnJlbW92ZShDTEFTU0VTLlNFTEVDVEVEKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSwgeyB0aHJlc2hvbGQ6IDAuMSB9KTtcbiAgICAgICAgXG4gICAgICAgICAgICBvYnNlcnZlci5vYnNlcnZlKGVuaGFuY2VkKTtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsTGlzdGVuZXJSZWFkeSA9IHRydWU7XG4gICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci53YXJuKGBFbmhhbmNlZCBzY3JvbGwgbGlzdGVuZXIgd2FzIG5vdCByZWFkeTogJHtlcnJ9YCk7XG4gICAgICAgIH0pLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxMaXN0ZW5lclNldHVwUGVuZGluZyA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgLyoqXG4gICAgICogQWRkIHRoZSBhcHBseVRoZW1lIGZ1bmN0aW9uIHRvIHRoZSBwYWdlXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBhZGRBcHBseVRoZW1lRnVuY3Rpb24oKTogdm9pZCB7XG4gICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLkFQUExZX1RIRU1FX1NDUklQVF9JRCkpIHJldHVybjtcblxuICAgICAgICBjb25zdCBhcHBseVRoZW1lU2NyaXB0ID0gZ2V0QXBwbHlUaGVtZVRlbXBsYXRlKCk7XG4gICAgICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7ICBcbiAgICAgICAgc2NyaXB0LmlubmVySFRNTCA9IGFwcGx5VGhlbWVTY3JpcHQ7XG4gICAgICAgIHNjcmlwdC5pZCA9IHRoaXMuQVBQTFlfVEhFTUVfU0NSSVBUX0lEO1xuICAgICAgICBcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICAgIH1cbiAgICBcbiAgICAvKipcbiAgICAgKiBDaGVjayBmb3IgdXBkYXRlcyBmb3IgYSBzcGVjaWZpYyBwbHVnaW4gb3IgdGhlbWVcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGFzeW5jIGNoZWNrRm9ySXRlbVVwZGF0ZXMoaXRlbUZpbGU6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKCdDaGVja2luZyBmb3IgdXBkYXRlcyBmb3IgJyArIGl0ZW1GaWxlKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGl0ZW1Cb3ggPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZShgJHtpdGVtRmlsZX0tYm94YClbMF07XG4gICAgICAgIGlmICghaXRlbUJveCkge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIud2FybihgJHtpdGVtRmlsZX0tYm94IGVsZW1lbnQgbm90IGZvdW5kLmApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcGx1Z2luT3JUaGVtZTogJ3RoZW1lJyB8ICdwbHVnaW4nID0gaXRlbUZpbGUuZW5kc1dpdGgoXCIudGhlbWUuY3NzXCIpID8gXCJ0aGVtZVwiIDogXCJwbHVnaW5cIjtcbiAgICAgICAgY29uc3QgaXRlbVBhdGggPSBqb2luKFxuICAgICAgICAgICAgcGx1Z2luT3JUaGVtZSA9PT0gXCJ0aGVtZVwiID8gcHJvcGVydGllcy50aGVtZXNQYXRoIDogcHJvcGVydGllcy5wbHVnaW5zUGF0aCwgXG4gICAgICAgICAgICBpdGVtRmlsZVxuICAgICAgICApO1xuICAgICAgICBcbiAgICAgICAgLy8gUmVmYWN0b3JlZDogUmVhZCBmaWxlIGZpcnN0XG4gICAgICAgIGxldCBmaWxlQ29udGVudCA9IFwiXCI7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmaWxlQ29udGVudCA9IGF3YWl0IFBsYXRmb3JtTWFuYWdlci5jdXJyZW50LnJlYWRGaWxlKGl0ZW1QYXRoKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoYEZhaWxlZCB0byByZWFkIGZpbGUgJHtpdGVtUGF0aH06ICR7ZX1gKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGluc3RhbGxlZEl0ZW1NZXRhRGF0YSA9IEV4dHJhY3RNZXRhRGF0YS5leHRyYWN0TWV0YWRhdGFGcm9tVGV4dChmaWxlQ29udGVudCkgYXMgTWV0YURhdGEgfCBudWxsO1xuICAgICAgICBcbiAgICAgICAgaWYgKCFpbnN0YWxsZWRJdGVtTWV0YURhdGEgfHwgT2JqZWN0LmtleXMoaW5zdGFsbGVkSXRlbU1ldGFEYXRhKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHVwZGF0ZVVybCA9IGluc3RhbGxlZEl0ZW1NZXRhRGF0YS51cGRhdGVVcmw7XG4gICAgICAgIGlmICghdXBkYXRlVXJsIHx8IHVwZGF0ZVVybCA9PT0gXCJub25lXCIpIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLmluZm8oYE5vIHVwZGF0ZSBVUkwgcHJvdmlkZWQgZm9yICR7cGx1Z2luT3JUaGVtZX0gKCR7aW5zdGFsbGVkSXRlbU1ldGFEYXRhLm5hbWV9KWApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5pc1N1cHBvcnRlZFJlbW90ZVVybCh1cGRhdGVVcmwpKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci53YXJuKGBTa2lwcGVkIHVwZGF0ZSBmb3IgJHtpdGVtRmlsZX06IHVuc3VwcG9ydGVkIFVSTCBwcm90b2NvbC5gKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByZXF1ZXN0ID0gYXdhaXQgZmV0Y2godXBkYXRlVXJsKTtcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIud2FybihgRmFpbGVkIHRvIGZldGNoIHVwZGF0ZSBmb3IgJHtpdGVtRmlsZX06IEhUVFAgJHtyZXF1ZXN0LnN0YXR1c31gKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmFzc2VydFNlY3VyZVJlc3BvbnNlVXJsKHJlcXVlc3QsIHVwZGF0ZVVybCk7XG5cbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZWFkTGltaXRlZE1vZENvbnRlbnQocmVxdWVzdCk7XG4gICAgICAgICAgICBjb25zdCBleHRyYWN0ZWRNZXRhRGF0YSA9IEV4dHJhY3RNZXRhRGF0YS5leHRyYWN0TWV0YWRhdGFGcm9tVGV4dChyZXNwb25zZSkgYXMgTWV0YURhdGEgfCBudWxsO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoIWV4dHJhY3RlZE1ldGFEYXRhKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIud2FybihgRmFpbGVkIHRvIGV4dHJhY3QgbWV0YWRhdGEgZnJvbSByZXNwb25zZSBmb3IgJHtwbHVnaW5PclRoZW1lfSAoJHtpbnN0YWxsZWRJdGVtTWV0YURhdGEubmFtZX0pYCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaGVscGVycy5pc05ld2VyVmVyc2lvbihleHRyYWN0ZWRNZXRhRGF0YS52ZXJzaW9uLCBpbnN0YWxsZWRJdGVtTWV0YURhdGEudmVyc2lvbikpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKFxuICAgICAgICAgICAgICAgICAgICBgVXBkYXRlIGF2YWlsYWJsZSBmb3IgJHtwbHVnaW5PclRoZW1lfSAoJHtpbnN0YWxsZWRJdGVtTWV0YURhdGEubmFtZX0pOiBgICtcbiAgICAgICAgICAgICAgICAgICAgYHYke2luc3RhbGxlZEl0ZW1NZXRhRGF0YS52ZXJzaW9ufSAtPiB2JHtleHRyYWN0ZWRNZXRhRGF0YS52ZXJzaW9ufWBcbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgdXBkYXRlQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7aXRlbUZpbGV9LXVwZGF0ZWApO1xuICAgICAgICAgICAgICAgIGlmICh1cGRhdGVCdXR0b24pIHtcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlQnV0dG9uLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVwZGF0ZUJ1dHRvbi5kYXRhc2V0LnN0cmVtaW9FbmhhbmNlZENsaWNrQm91bmQgPT09IFwidHJ1ZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlQnV0dG9uLmRhdGFzZXQuc3RyZW1pb0VuaGFuY2VkQ2xpY2tCb3VuZCA9IFwidHJ1ZVwiO1xuICAgICAgICAgICAgICAgICAgICB1cGRhdGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IFBsYXRmb3JtTWFuYWdlci5jdXJyZW50LndyaXRlRmlsZShpdGVtUGF0aCwgcmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgU2V0dGluZ3MucmVtb3ZlSXRlbShpdGVtRmlsZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBTZXR0aW5ncy5hZGRJdGVtKHBsdWdpbk9yVGhlbWUsIGl0ZW1GaWxlLCBleHRyYWN0ZWRNZXRhRGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIuaW5mbyhcbiAgICAgICAgICAgICAgICAgICAgYE5vIHVwZGF0ZSBhdmFpbGFibGUgZm9yICR7cGx1Z2luT3JUaGVtZX0gKCR7aW5zdGFsbGVkSXRlbU1ldGFEYXRhLm5hbWV9KS4gYCArXG4gICAgICAgICAgICAgICAgICAgIGBDdXJyZW50IHZlcnNpb246IHYke2luc3RhbGxlZEl0ZW1NZXRhRGF0YS52ZXJzaW9ufWBcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoYEVycm9yIGNoZWNraW5nIHVwZGF0ZXMgZm9yICR7aXRlbUZpbGV9OiAkeyhlcnJvciBhcyBFcnJvcikubWVzc2FnZX1gKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiAgICBcbmV4cG9ydCBkZWZhdWx0IE1vZE1hbmFnZXI7XG4iLCAiaW1wb3J0IHsgUGx1Z2luT3B0aW9uRGVmaW5pdGlvbiB9IGZyb20gXCIuL1BsdWdpbk9wdGlvblwiO1xuXG4vKipcbiAqIE1ldGFkYXRhIHN0cnVjdHVyZSBmb3IgcGx1Z2lucyBhbmQgdGhlbWVzXG4gKiBFeHRyYWN0ZWQgZnJvbSBKU0RvYy1zdHlsZSBjb21tZW50cyBpbiBtb2QgZmlsZXNcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBNZXRhRGF0YSB7XG4gICAgLyoqIERpc3BsYXkgbmFtZSBvZiB0aGUgbW9kICovXG4gICAgbmFtZTogc3RyaW5nO1xuICAgIC8qKiBCcmllZiBkZXNjcmlwdGlvbiBvZiB3aGF0IHRoZSBtb2QgZG9lcyAqL1xuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gICAgLyoqIEF1dGhvci9jcmVhdG9yIG9mIHRoZSBtb2QgKi9cbiAgICBhdXRob3I6IHN0cmluZztcbiAgICAvKiogU2VtYW50aWMgdmVyc2lvbiBzdHJpbmcgKGUuZy4sIFwiMS4wLjBcIikgKi9cbiAgICB2ZXJzaW9uOiBzdHJpbmc7XG4gICAgLyoqIFVSTCB0byBjaGVjayBmb3IgdXBkYXRlcyAob3B0aW9uYWwpICovXG4gICAgdXBkYXRlVXJsPzogc3RyaW5nO1xuICAgIC8qKiBTb3VyY2UgY29kZSByZXBvc2l0b3J5IFVSTCAob3B0aW9uYWwpICovXG4gICAgc291cmNlPzogc3RyaW5nO1xuICAgIC8qKiBMaWNlbnNlIHR5cGUgKG9wdGlvbmFsKSAqL1xuICAgIGxpY2Vuc2U/OiBzdHJpbmc7XG4gICAgLyoqIEhvbWVwYWdlL2RvY3VtZW50YXRpb24gVVJMIChvcHRpb25hbCkgKi9cbiAgICBob21lcGFnZT86IHN0cmluZztcbiAgICAvKiogVmFsaWRhdGVkIGNvbmZpZ3VyYXRpb24gZmllbGRzIGV4cG9zZWQgYnkgYSBwbHVnaW4gKG9wdGlvbmFsKSAqL1xuICAgIG9wdGlvbnM/OiBQbHVnaW5PcHRpb25EZWZpbml0aW9uW107XG59XG5cbmV4cG9ydCB0eXBlIE1ldGFkYXRhS2V5ID0gRXhjbHVkZTxrZXlvZiBNZXRhRGF0YSwgXCJvcHRpb25zXCI+O1xuXG5leHBvcnQgY29uc3QgUkVRVUlSRURfTUVUQURBVEFfS0VZUyA9IFtcbiAgICBcIm5hbWVcIixcbiAgICBcImRlc2NyaXB0aW9uXCIsXG4gICAgXCJhdXRob3JcIixcbiAgICBcInZlcnNpb25cIixcbl0gYXMgY29uc3Qgc2F0aXNmaWVzIHJlYWRvbmx5IE1ldGFkYXRhS2V5W107XG5cbmV4cG9ydCBjb25zdCBBTExfTUVUQURBVEFfS0VZUyA9IFtcbiAgICBcIm5hbWVcIixcbiAgICBcImRlc2NyaXB0aW9uXCIsXG4gICAgXCJhdXRob3JcIixcbiAgICBcInZlcnNpb25cIixcbiAgICBcInVwZGF0ZVVybFwiLFxuICAgIFwic291cmNlXCIsXG4gICAgXCJsaWNlbnNlXCIsXG4gICAgXCJob21lcGFnZVwiLFxuXSBhcyBjb25zdCBzYXRpc2ZpZXMgcmVhZG9ubHkgTWV0YWRhdGFLZXlbXTtcbiIsICJpbXBvcnQge1xuICAgIFBsdWdpbk9wdGlvbkRlZmluaXRpb24sXG4gICAgUGx1Z2luT3B0aW9uVmFsdWUsXG4gICAgUGx1Z2luT3B0aW9uVmFsdWVzLFxuICAgIFNlbGVjdFBsdWdpbk9wdGlvbkNob2ljZSxcbn0gZnJvbSBcIi4uL2ludGVyZmFjZXMvUGx1Z2luT3B0aW9uXCI7XG5cbmNvbnN0IE9QVElPTl9JRF9QQVRURVJOID0gL15bQS1aYS16XVtBLVphLXowLTlfLV17MCw2M30kLztcbmNvbnN0IE1BWF9MQUJFTF9MRU5HVEggPSAxMjA7XG5jb25zdCBNQVhfREVTQ1JJUFRJT05fTEVOR1RIID0gNTAwO1xuY29uc3QgTUFYX1RFWFRfTEVOR1RIID0gMTBfMDAwO1xuY29uc3QgTUFYX0NIT0lDRVMgPSA2NDtcblxuZnVuY3Rpb24gaXNSZWNvcmQodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiB2YWx1ZSAhPT0gbnVsbCAmJiAhQXJyYXkuaXNBcnJheSh2YWx1ZSk7XG59XG5cbmZ1bmN0aW9uIGlzQm91bmRlZFN0cmluZyh2YWx1ZTogdW5rbm93biwgbWluTGVuZ3RoOiBudW1iZXIsIG1heExlbmd0aDogbnVtYmVyKTogdmFsdWUgaXMgc3RyaW5nIHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiICYmIHZhbHVlLmxlbmd0aCA+PSBtaW5MZW5ndGggJiYgdmFsdWUubGVuZ3RoIDw9IG1heExlbmd0aDtcbn1cblxuZnVuY3Rpb24gZ2V0QmFzZUZpZWxkcyh2YWx1ZTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pIHtcbiAgICBpZiAoIU9QVElPTl9JRF9QQVRURVJOLnRlc3QoU3RyaW5nKHZhbHVlLmlkID8/IFwiXCIpKSkgcmV0dXJuIG51bGw7XG4gICAgaWYgKCFpc0JvdW5kZWRTdHJpbmcodmFsdWUubGFiZWwsIDEsIE1BWF9MQUJFTF9MRU5HVEgpKSByZXR1cm4gbnVsbDtcbiAgICBpZiAoXG4gICAgICAgIHZhbHVlLmRlc2NyaXB0aW9uICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgIWlzQm91bmRlZFN0cmluZyh2YWx1ZS5kZXNjcmlwdGlvbiwgMSwgTUFYX0RFU0NSSVBUSU9OX0xFTkdUSClcbiAgICApIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaWQ6IFN0cmluZyh2YWx1ZS5pZCksXG4gICAgICAgIGxhYmVsOiB2YWx1ZS5sYWJlbCxcbiAgICAgICAgLi4uKHZhbHVlLmRlc2NyaXB0aW9uID09PSB1bmRlZmluZWQgPyB7fSA6IHsgZGVzY3JpcHRpb246IHZhbHVlLmRlc2NyaXB0aW9uIH0pLFxuICAgIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZVBsdWdpbk9wdGlvbkRlZmluaXRpb24odmFsdWU6IHVua25vd24pOiBQbHVnaW5PcHRpb25EZWZpbml0aW9uIHwgbnVsbCB7XG4gICAgaWYgKCFpc1JlY29yZCh2YWx1ZSkpIHJldHVybiBudWxsO1xuXG4gICAgY29uc3QgYmFzZSA9IGdldEJhc2VGaWVsZHModmFsdWUpO1xuICAgIGlmICghYmFzZSkgcmV0dXJuIG51bGw7XG5cbiAgICBzd2l0Y2ggKHZhbHVlLnR5cGUpIHtcbiAgICAgICAgY2FzZSBcImJvb2xlYW5cIjpcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUuZGVmYXVsdCAhPT0gXCJib29sZWFuXCIpIHJldHVybiBudWxsO1xuICAgICAgICAgICAgcmV0dXJuIHsgLi4uYmFzZSwgdHlwZTogXCJib29sZWFuXCIsIGRlZmF1bHQ6IHZhbHVlLmRlZmF1bHQgfTtcblxuICAgICAgICBjYXNlIFwidGV4dFwiOiB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlLmRlZmF1bHQgIT09IFwic3RyaW5nXCIpIHJldHVybiBudWxsO1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIHZhbHVlLnBsYWNlaG9sZGVyICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgICAgICAhaXNCb3VuZGVkU3RyaW5nKHZhbHVlLnBsYWNlaG9sZGVyLCAwLCAyMDApXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICB2YWx1ZS5tYXhMZW5ndGggIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgICAgIChcbiAgICAgICAgICAgICAgICAgICAgdHlwZW9mIHZhbHVlLm1heExlbmd0aCAhPT0gXCJudW1iZXJcIiB8fFxuICAgICAgICAgICAgICAgICAgICAhTnVtYmVyLmlzSW50ZWdlcih2YWx1ZS5tYXhMZW5ndGgpIHx8XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlLm1heExlbmd0aCA8IDEgfHxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUubWF4TGVuZ3RoID4gTUFYX1RFWFRfTEVOR1RIXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBtYXhMZW5ndGggPSB0eXBlb2YgdmFsdWUubWF4TGVuZ3RoID09PSBcIm51bWJlclwiID8gdmFsdWUubWF4TGVuZ3RoIDogTUFYX1RFWFRfTEVOR1RIO1xuICAgICAgICAgICAgaWYgKHZhbHVlLmRlZmF1bHQubGVuZ3RoID4gbWF4TGVuZ3RoKSByZXR1cm4gbnVsbDtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAuLi5iYXNlLFxuICAgICAgICAgICAgICAgIHR5cGU6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHZhbHVlLmRlZmF1bHQsXG4gICAgICAgICAgICAgICAgLi4uKHZhbHVlLnBsYWNlaG9sZGVyID09PSB1bmRlZmluZWQgPyB7fSA6IHsgcGxhY2Vob2xkZXI6IHZhbHVlLnBsYWNlaG9sZGVyIGFzIHN0cmluZyB9KSxcbiAgICAgICAgICAgICAgICAuLi4odmFsdWUubWF4TGVuZ3RoID09PSB1bmRlZmluZWQgPyB7fSA6IHsgbWF4TGVuZ3RoOiB2YWx1ZS5tYXhMZW5ndGggYXMgbnVtYmVyIH0pLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgXCJudW1iZXJcIjoge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZS5kZWZhdWx0ICE9PSBcIm51bWJlclwiIHx8ICFOdW1iZXIuaXNGaW5pdGUodmFsdWUuZGVmYXVsdCkpIHJldHVybiBudWxsO1xuICAgICAgICAgICAgY29uc3QgbnVtZXJpY0tleXMgPSBbXCJtaW5cIiwgXCJtYXhcIiwgXCJzdGVwXCJdIGFzIGNvbnN0O1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgbnVtZXJpY0tleXMpIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWVba2V5XSAhPT0gdW5kZWZpbmVkICYmICh0eXBlb2YgdmFsdWVba2V5XSAhPT0gXCJudW1iZXJcIiB8fCAhTnVtYmVyLmlzRmluaXRlKHZhbHVlW2tleV0pKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBtaW4gPSB2YWx1ZS5taW4gYXMgbnVtYmVyIHwgdW5kZWZpbmVkO1xuICAgICAgICAgICAgY29uc3QgbWF4ID0gdmFsdWUubWF4IGFzIG51bWJlciB8IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGNvbnN0IHN0ZXAgPSB2YWx1ZS5zdGVwIGFzIG51bWJlciB8IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGlmIChtaW4gIT09IHVuZGVmaW5lZCAmJiBtYXggIT09IHVuZGVmaW5lZCAmJiBtaW4gPiBtYXgpIHJldHVybiBudWxsO1xuICAgICAgICAgICAgaWYgKHN0ZXAgIT09IHVuZGVmaW5lZCAmJiBzdGVwIDw9IDApIHJldHVybiBudWxsO1xuICAgICAgICAgICAgaWYgKG1pbiAhPT0gdW5kZWZpbmVkICYmIHZhbHVlLmRlZmF1bHQgPCBtaW4pIHJldHVybiBudWxsO1xuICAgICAgICAgICAgaWYgKG1heCAhPT0gdW5kZWZpbmVkICYmIHZhbHVlLmRlZmF1bHQgPiBtYXgpIHJldHVybiBudWxsO1xuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIC4uLmJhc2UsXG4gICAgICAgICAgICAgICAgdHlwZTogXCJudW1iZXJcIixcbiAgICAgICAgICAgICAgICBkZWZhdWx0OiB2YWx1ZS5kZWZhdWx0LFxuICAgICAgICAgICAgICAgIC4uLihtaW4gPT09IHVuZGVmaW5lZCA/IHt9IDogeyBtaW4gfSksXG4gICAgICAgICAgICAgICAgLi4uKG1heCA9PT0gdW5kZWZpbmVkID8ge30gOiB7IG1heCB9KSxcbiAgICAgICAgICAgICAgICAuLi4oc3RlcCA9PT0gdW5kZWZpbmVkID8ge30gOiB7IHN0ZXAgfSksXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSBcInNlbGVjdFwiOiB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlLmRlZmF1bHQgIT09IFwic3RyaW5nXCIpIHJldHVybiBudWxsO1xuICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHZhbHVlLmNob2ljZXMpIHx8IHZhbHVlLmNob2ljZXMubGVuZ3RoIDwgMSB8fCB2YWx1ZS5jaG9pY2VzLmxlbmd0aCA+IE1BWF9DSE9JQ0VTKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGNob2ljZXM6IFNlbGVjdFBsdWdpbk9wdGlvbkNob2ljZVtdID0gW107XG4gICAgICAgICAgICBjb25zdCBzZWVuVmFsdWVzID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHJhd0Nob2ljZSBvZiB2YWx1ZS5jaG9pY2VzKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFpc1JlY29yZChyYXdDaG9pY2UpKSByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICBpZiAoIWlzQm91bmRlZFN0cmluZyhyYXdDaG9pY2UudmFsdWUsIDEsIDEyOCkpIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIGlmICghaXNCb3VuZGVkU3RyaW5nKHJhd0Nob2ljZS5sYWJlbCwgMSwgTUFYX0xBQkVMX0xFTkdUSCkpIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIGlmIChzZWVuVmFsdWVzLmhhcyhyYXdDaG9pY2UudmFsdWUpKSByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICBzZWVuVmFsdWVzLmFkZChyYXdDaG9pY2UudmFsdWUpO1xuICAgICAgICAgICAgICAgIGNob2ljZXMucHVzaCh7IHZhbHVlOiByYXdDaG9pY2UudmFsdWUsIGxhYmVsOiByYXdDaG9pY2UubGFiZWwgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXNlZW5WYWx1ZXMuaGFzKHZhbHVlLmRlZmF1bHQpKSByZXR1cm4gbnVsbDtcblxuICAgICAgICAgICAgcmV0dXJuIHsgLi4uYmFzZSwgdHlwZTogXCJzZWxlY3RcIiwgZGVmYXVsdDogdmFsdWUuZGVmYXVsdCwgY2hvaWNlcyB9O1xuICAgICAgICB9XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZVBsdWdpbk9wdGlvblZhbHVlKFxuICAgIGRlZmluaXRpb246IFBsdWdpbk9wdGlvbkRlZmluaXRpb24sXG4gICAgdmFsdWU6IHVua25vd25cbik6IFBsdWdpbk9wdGlvblZhbHVlIHwgdW5kZWZpbmVkIHtcbiAgICBzd2l0Y2ggKGRlZmluaXRpb24udHlwZSkge1xuICAgICAgICBjYXNlIFwiYm9vbGVhblwiOlxuICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJib29sZWFuXCIgPyB2YWx1ZSA6IHVuZGVmaW5lZDtcblxuICAgICAgICBjYXNlIFwidGV4dFwiOiB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSBcInN0cmluZ1wiKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgY29uc3QgbWF4TGVuZ3RoID0gZGVmaW5pdGlvbi5tYXhMZW5ndGggPz8gTUFYX1RFWFRfTEVOR1RIO1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlLmxlbmd0aCA8PSBtYXhMZW5ndGggPyB2YWx1ZSA6IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgXCJudW1iZXJcIjpcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwibnVtYmVyXCIgfHwgIU51bWJlci5pc0Zpbml0ZSh2YWx1ZSkpIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICBpZiAoZGVmaW5pdGlvbi5taW4gIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSA8IGRlZmluaXRpb24ubWluKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgaWYgKGRlZmluaXRpb24ubWF4ICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgPiBkZWZpbml0aW9uLm1heCkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcblxuICAgICAgICBjYXNlIFwic2VsZWN0XCI6XG4gICAgICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiICYmIGRlZmluaXRpb24uY2hvaWNlcy5zb21lKGNob2ljZSA9PiBjaG9pY2UudmFsdWUgPT09IHZhbHVlKVxuICAgICAgICAgICAgICAgID8gdmFsdWVcbiAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQbHVnaW5PcHRpb25EZWZhdWx0cyhkZWZpbml0aW9uczogUGx1Z2luT3B0aW9uRGVmaW5pdGlvbltdKTogUGx1Z2luT3B0aW9uVmFsdWVzIHtcbiAgICByZXR1cm4gT2JqZWN0LmZyb21FbnRyaWVzKGRlZmluaXRpb25zLm1hcChkZWZpbml0aW9uID0+IFtkZWZpbml0aW9uLmlkLCBkZWZpbml0aW9uLmRlZmF1bHRdKSk7XG59XG4iLCAiaW1wb3J0IHtcbiAgICBNZXRhRGF0YSxcbiAgICBNZXRhZGF0YUtleSxcbiAgICBSRVFVSVJFRF9NRVRBREFUQV9LRVlTLFxuICAgIEFMTF9NRVRBREFUQV9LRVlTLFxufSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9NZXRhRGF0YVwiO1xuaW1wb3J0IHsgUGx1Z2luT3B0aW9uRGVmaW5pdGlvbiB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL1BsdWdpbk9wdGlvblwiO1xuaW1wb3J0IHsgdmFsaWRhdGVQbHVnaW5PcHRpb25EZWZpbml0aW9uIH0gZnJvbSBcIi4vUGx1Z2luT3B0aW9uU2NoZW1hXCI7XG5pbXBvcnQgbG9nZ2VyIGZyb20gXCIuL2xvZ2dlclwiO1xuXG5jbGFzcyBFeHRyYWN0TWV0YURhdGEge1xuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IE1BWF9QTFVHSU5fT1BUSU9OUyA9IDMyO1xuXG4gICAgLyoqXG4gICAgICogUGFyc2UgbWV0YWRhdGEgZnJvbSBhIGNvbW1lbnQgYmxvY2sgaW4gdGhlIGZvcm1hdDpcbiAgICAgKiAvKiogQGtleSB2YWx1ZSAqXFwvXG4gICAgKi9cbiAgICBwcml2YXRlIHN0YXRpYyBwYXJzZU1ldGFkYXRhRnJvbUNvbnRlbnQoY29udGVudDogc3RyaW5nKTogTWV0YURhdGEgfCBudWxsIHtcbiAgICAgICAgY29uc3QgYmxvY2tNYXRjaCA9IGNvbnRlbnQubWF0Y2goL1xcL1xcKlxcKihbXFxzXFxTXSo/KVxcKlxcLy8pO1xuICAgICAgICBpZiAoIWJsb2NrTWF0Y2gpIHJldHVybiBudWxsO1xuXG4gICAgICAgIGNvbnN0IHJlc3VsdDogUGFydGlhbDxNZXRhRGF0YT4gPSB7fTtcbiAgICAgICAgY29uc3QgdGFnUmVnZXggPSAvQChcXHcrKVxccysoW15cXG5cXHJdKykvZztcblxuICAgICAgICBmb3IgKGNvbnN0IFssIHJhd0tleSwgcmF3VmFsdWVdIG9mIGJsb2NrTWF0Y2hbMV0ubWF0Y2hBbGwodGFnUmVnZXgpKSB7XG4gICAgICAgICAgICBpZiAoIUFMTF9NRVRBREFUQV9LRVlTLmluY2x1ZGVzKHJhd0tleSBhcyBNZXRhZGF0YUtleSkpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICBjb25zdCBrZXkgPSByYXdLZXkgYXMgTWV0YWRhdGFLZXk7XG5cbiAgICAgICAgICAgIGlmIChyZXN1bHRba2V5XSAhPT0gdW5kZWZpbmVkKSBjb250aW51ZTtcblxuICAgICAgICAgICAgcmVzdWx0W2tleV0gPSByYXdWYWx1ZS50cmltKCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBvcHRpb25zOiBQbHVnaW5PcHRpb25EZWZpbml0aW9uW10gPSBbXTtcbiAgICAgICAgY29uc3Qgb3B0aW9uSWRzID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gICAgICAgIGNvbnN0IG9wdGlvblJlZ2V4ID0gL0BvcHRpb25cXHMrKFteXFxuXFxyXSspL2c7XG5cbiAgICAgICAgZm9yIChjb25zdCBbLCByYXdPcHRpb25dIG9mIGJsb2NrTWF0Y2hbMV0ubWF0Y2hBbGwob3B0aW9uUmVnZXgpKSB7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5sZW5ndGggPj0gdGhpcy5NQVhfUExVR0lOX09QVElPTlMpIHtcbiAgICAgICAgICAgICAgICBsb2dnZXIud2FybihgSWdub3JpbmcgcGx1Z2luIG9wdGlvbnMgYWZ0ZXIgdGhlIGZpcnN0ICR7dGhpcy5NQVhfUExVR0lOX09QVElPTlN9YCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3B0aW9uID0gdmFsaWRhdGVQbHVnaW5PcHRpb25EZWZpbml0aW9uKEpTT04ucGFyc2UocmF3T3B0aW9uLnRyaW0oKSkpO1xuICAgICAgICAgICAgICAgIGlmICghb3B0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGxvZ2dlci53YXJuKGBJZ25vcmluZyBpbnZhbGlkIHBsdWdpbiBvcHRpb246ICR7cmF3T3B0aW9uLnRyaW0oKX1gKTtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChvcHRpb25JZHMuaGFzKG9wdGlvbi5pZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgbG9nZ2VyLndhcm4oYElnbm9yaW5nIGR1cGxpY2F0ZSBwbHVnaW4gb3B0aW9uIGlkOiAke29wdGlvbi5pZH1gKTtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgb3B0aW9uSWRzLmFkZChvcHRpb24uaWQpO1xuICAgICAgICAgICAgICAgIG9wdGlvbnMucHVzaChvcHRpb24pO1xuICAgICAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLndhcm4oYElnbm9yaW5nIG1hbGZvcm1lZCBwbHVnaW4gb3B0aW9uIEpTT046ICR7cmF3T3B0aW9uLnRyaW0oKX1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvcHRpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHJlc3VsdC5vcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoY29uc3Qga2V5IG9mIFJFUVVJUkVEX01FVEFEQVRBX0tFWVMpIHtcbiAgICAgICAgICAgIGlmICghcmVzdWx0W2tleV0pIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdCBhcyBNZXRhRGF0YTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGV4dHJhY3RNZXRhZGF0YUZyb21UZXh0KHRleHRDb250ZW50OiBzdHJpbmcpOiBNZXRhRGF0YSB8IG51bGwge1xuICAgICAgICBjb25zdCBtZXRhZGF0YSA9IHRoaXMucGFyc2VNZXRhZGF0YUZyb21Db250ZW50KHRleHRDb250ZW50KTtcbiAgICAgICAgXG4gICAgICAgIGlmICghbWV0YWRhdGEpIHtcbiAgICAgICAgICAgIGxvZ2dlci5lcnJvcignQ29tbWVudCBibG9jayBub3QgZm91bmQgaW4gdGhlIHByb3ZpZGVkIHRleHQnKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIG1ldGFkYXRhO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRXh0cmFjdE1ldGFEYXRhO1xuIiwgImltcG9ydCB7IEZJTEVfRVhURU5TSU9OUywgU1RPUkFHRV9LRVlTIH0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IHtcbiAgICBQbHVnaW5PcHRpb25EZWZpbml0aW9uLFxuICAgIFBsdWdpbk9wdGlvblZhbHVlcyxcbn0gZnJvbSBcIi4uL2ludGVyZmFjZXMvUGx1Z2luT3B0aW9uXCI7XG5pbXBvcnQge1xuICAgIGdldFBsdWdpbk9wdGlvbkRlZmF1bHRzLFxuICAgIG5vcm1hbGl6ZVBsdWdpbk9wdGlvblZhbHVlLFxufSBmcm9tIFwiLi4vdXRpbHMvUGx1Z2luT3B0aW9uU2NoZW1hXCI7XG5pbXBvcnQgeyBnZXRMb2dnZXIgfSBmcm9tIFwiLi4vdXRpbHMvbG9nZ2VyXCI7XG5cbmNsYXNzIFBsdWdpbk9wdGlvbnMge1xuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IGxvZ2dlciA9IGdldExvZ2dlcihcIlBsdWdpbk9wdGlvbnNcIik7XG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgc2NoZW1hcyA9IG5ldyBNYXA8c3RyaW5nLCBQbHVnaW5PcHRpb25EZWZpbml0aW9uW10+KCk7XG5cbiAgICBwcml2YXRlIHN0YXRpYyBpc1NhZmVQbHVnaW5GaWxlTmFtZShwbHVnaW5GaWxlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIC9eW0EtWmEtejAtOS5fLV0rJC8udGVzdChwbHVnaW5GaWxlKSAmJlxuICAgICAgICAgICAgcGx1Z2luRmlsZS5lbmRzV2l0aChGSUxFX0VYVEVOU0lPTlMuUExVR0lOKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGdldFN0b3JhZ2VLZXkocGx1Z2luRmlsZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGAke1NUT1JBR0VfS0VZUy5QTFVHSU5fT1BUSU9OU19QUkVGSVh9JHtwbHVnaW5GaWxlfWA7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgY2xvbmVEZWZpbml0aW9ucyhkZWZpbml0aW9uczogUGx1Z2luT3B0aW9uRGVmaW5pdGlvbltdKTogUGx1Z2luT3B0aW9uRGVmaW5pdGlvbltdIHtcbiAgICAgICAgcmV0dXJuIGRlZmluaXRpb25zLm1hcChkZWZpbml0aW9uID0+IChcbiAgICAgICAgICAgIGRlZmluaXRpb24udHlwZSA9PT0gXCJzZWxlY3RcIlxuICAgICAgICAgICAgICAgID8geyAuLi5kZWZpbml0aW9uLCBjaG9pY2VzOiBkZWZpbml0aW9uLmNob2ljZXMubWFwKGNob2ljZSA9PiAoeyAuLi5jaG9pY2UgfSkpIH1cbiAgICAgICAgICAgICAgICA6IHsgLi4uZGVmaW5pdGlvbiB9XG4gICAgICAgICkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgcmVnaXN0ZXIocGx1Z2luRmlsZTogc3RyaW5nLCBkZWZpbml0aW9uczogUGx1Z2luT3B0aW9uRGVmaW5pdGlvbltdID0gW10pOiBib29sZWFuIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzU2FmZVBsdWdpbkZpbGVOYW1lKHBsdWdpbkZpbGUpKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci53YXJuKGBSZWZ1c2VkIHRvIHJlZ2lzdGVyIG9wdGlvbnMgZm9yIHVuc2FmZSBwbHVnaW4gZmlsZW5hbWU6ICR7cGx1Z2luRmlsZX1gKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2NoZW1hcy5zZXQocGx1Z2luRmlsZSwgdGhpcy5jbG9uZURlZmluaXRpb25zKGRlZmluaXRpb25zKSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgaGFzT3B0aW9ucyhwbHVnaW5GaWxlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLnNjaGVtYXMuZ2V0KHBsdWdpbkZpbGUpPy5sZW5ndGggPz8gMCkgPiAwO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0RGVmaW5pdGlvbnMocGx1Z2luRmlsZTogc3RyaW5nKTogUGx1Z2luT3B0aW9uRGVmaW5pdGlvbltdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmVEZWZpbml0aW9ucyh0aGlzLnNjaGVtYXMuZ2V0KHBsdWdpbkZpbGUpID8/IFtdKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldChwbHVnaW5GaWxlOiBzdHJpbmcpOiBQbHVnaW5PcHRpb25WYWx1ZXMge1xuICAgICAgICBpZiAoIXRoaXMuaXNTYWZlUGx1Z2luRmlsZU5hbWUocGx1Z2luRmlsZSkpIHJldHVybiB7fTtcblxuICAgICAgICBjb25zdCBkZWZpbml0aW9ucyA9IHRoaXMuc2NoZW1hcy5nZXQocGx1Z2luRmlsZSkgPz8gW107XG4gICAgICAgIGNvbnN0IHZhbHVlcyA9IGdldFBsdWdpbk9wdGlvbkRlZmF1bHRzKGRlZmluaXRpb25zKTtcbiAgICAgICAgaWYgKGRlZmluaXRpb25zLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHZhbHVlcztcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcmF3VmFsdWUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0aGlzLmdldFN0b3JhZ2VLZXkocGx1Z2luRmlsZSkpO1xuICAgICAgICAgICAgaWYgKCFyYXdWYWx1ZSkgcmV0dXJuIHZhbHVlcztcblxuICAgICAgICAgICAgY29uc3Qgc3RvcmVkVmFsdWU6IHVua25vd24gPSBKU09OLnBhcnNlKHJhd1ZhbHVlKTtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc3RvcmVkVmFsdWUgIT09IFwib2JqZWN0XCIgfHwgc3RvcmVkVmFsdWUgPT09IG51bGwgfHwgQXJyYXkuaXNBcnJheShzdG9yZWRWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWVzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBzdG9yZWRPcHRpb25zID0gc3RvcmVkVmFsdWUgYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj47XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGRlZmluaXRpb24gb2YgZGVmaW5pdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBub3JtYWxpemVkID0gbm9ybWFsaXplUGx1Z2luT3B0aW9uVmFsdWUoZGVmaW5pdGlvbiwgc3RvcmVkT3B0aW9uc1tkZWZpbml0aW9uLmlkXSk7XG4gICAgICAgICAgICAgICAgaWYgKG5vcm1hbGl6ZWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZXNbZGVmaW5pdGlvbi5pZF0gPSBub3JtYWxpemVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLndhcm4oYEZhaWxlZCB0byByZWFkIG9wdGlvbnMgZm9yICR7cGx1Z2luRmlsZX06ICR7ZXJyb3J9YCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdmFsdWVzO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgc2F2ZShwbHVnaW5GaWxlOiBzdHJpbmcsIGNhbmRpZGF0ZVZhbHVlczogUGx1Z2luT3B0aW9uVmFsdWVzKTogUGx1Z2luT3B0aW9uVmFsdWVzIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzU2FmZVBsdWdpbkZpbGVOYW1lKHBsdWdpbkZpbGUpKSByZXR1cm4ge307XG5cbiAgICAgICAgY29uc3QgZGVmaW5pdGlvbnMgPSB0aGlzLnNjaGVtYXMuZ2V0KHBsdWdpbkZpbGUpID8/IFtdO1xuICAgICAgICBpZiAoZGVmaW5pdGlvbnMubGVuZ3RoID09PSAwKSByZXR1cm4ge307XG5cbiAgICAgICAgY29uc3Qgbm9ybWFsaXplZFZhbHVlcyA9IGdldFBsdWdpbk9wdGlvbkRlZmF1bHRzKGRlZmluaXRpb25zKTtcbiAgICAgICAgY29uc3Qgb3ZlcnJpZGVzOiBQbHVnaW5PcHRpb25WYWx1ZXMgPSB7fTtcblxuICAgICAgICBmb3IgKGNvbnN0IGRlZmluaXRpb24gb2YgZGVmaW5pdGlvbnMpIHtcbiAgICAgICAgICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSBub3JtYWxpemVQbHVnaW5PcHRpb25WYWx1ZShkZWZpbml0aW9uLCBjYW5kaWRhdGVWYWx1ZXNbZGVmaW5pdGlvbi5pZF0pO1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBub3JtYWxpemVkID8/IGRlZmluaXRpb24uZGVmYXVsdDtcbiAgICAgICAgICAgIG5vcm1hbGl6ZWRWYWx1ZXNbZGVmaW5pdGlvbi5pZF0gPSB2YWx1ZTtcblxuICAgICAgICAgICAgaWYgKHZhbHVlICE9PSBkZWZpbml0aW9uLmRlZmF1bHQpIHtcbiAgICAgICAgICAgICAgICBvdmVycmlkZXNbZGVmaW5pdGlvbi5pZF0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBzdG9yYWdlS2V5ID0gdGhpcy5nZXRTdG9yYWdlS2V5KHBsdWdpbkZpbGUpO1xuICAgICAgICAgICAgaWYgKE9iamVjdC5rZXlzKG92ZXJyaWRlcykubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oc3RvcmFnZUtleSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHN0b3JhZ2VLZXksIEpTT04uc3RyaW5naWZ5KG92ZXJyaWRlcykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoYEZhaWxlZCB0byBzYXZlIG9wdGlvbnMgZm9yICR7cGx1Z2luRmlsZX06ICR7ZXJyb3J9YCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbm9ybWFsaXplZFZhbHVlcztcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHJlc2V0KHBsdWdpbkZpbGU6IHN0cmluZyk6IFBsdWdpbk9wdGlvblZhbHVlcyB7XG4gICAgICAgIGlmICghdGhpcy5pc1NhZmVQbHVnaW5GaWxlTmFtZShwbHVnaW5GaWxlKSkgcmV0dXJuIHt9O1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSh0aGlzLmdldFN0b3JhZ2VLZXkocGx1Z2luRmlsZSkpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIud2FybihgRmFpbGVkIHRvIHJlc2V0IG9wdGlvbnMgZm9yICR7cGx1Z2luRmlsZX06ICR7ZXJyb3J9YCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZ2V0UGx1Z2luT3B0aW9uRGVmYXVsdHModGhpcy5zY2hlbWFzLmdldChwbHVnaW5GaWxlKSA/PyBbXSk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyByZW1vdmUocGx1Z2luRmlsZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMucmVzZXQocGx1Z2luRmlsZSk7XG4gICAgICAgIHRoaXMuc2NoZW1hcy5kZWxldGUocGx1Z2luRmlsZSk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQbHVnaW5PcHRpb25zO1xuIiwgImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlbG9hZEFwcGxpY2F0aW9uKCk6IHZvaWQge1xuICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbn1cbiIsICJpbXBvcnQgeyBGSUxFX0VYVEVOU0lPTlMgfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5cbmV4cG9ydCB0eXBlIE1vZEZpbGVUeXBlID0gXCJwbHVnaW5cIiB8IFwidGhlbWVcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGlzU2FmZU1vZEZpbGVOYW1lKGZpbGVOYW1lOiBzdHJpbmcsIHR5cGU6IE1vZEZpbGVUeXBlKTogYm9vbGVhbiB7XG4gICAgY29uc3QgZXh0ZW5zaW9uID0gdHlwZSA9PT0gXCJ0aGVtZVwiXG4gICAgICAgID8gRklMRV9FWFRFTlNJT05TLlRIRU1FXG4gICAgICAgIDogRklMRV9FWFRFTlNJT05TLlBMVUdJTjtcblxuICAgIHJldHVybiAoXG4gICAgICAgIGZpbGVOYW1lLmxlbmd0aCA+IGV4dGVuc2lvbi5sZW5ndGggJiZcbiAgICAgICAgZmlsZU5hbWUubGVuZ3RoIDw9IDI1NSAmJlxuICAgICAgICBmaWxlTmFtZS5lbmRzV2l0aChleHRlbnNpb24pICYmXG4gICAgICAgIC9eW0EtWmEtejAtOS5fLV0rJC8udGVzdChmaWxlTmFtZSlcbiAgICApO1xufVxuIiwgImltcG9ydCBQbHVnaW5PcHRpb25zIGZyb20gXCIuLi8uLi9jb3JlL1BsdWdpbk9wdGlvbnNcIjtcbmltcG9ydCB7XG4gICAgUGx1Z2luT3B0aW9uRGVmaW5pdGlvbixcbiAgICBQbHVnaW5PcHRpb25WYWx1ZXMsXG59IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL1BsdWdpbk9wdGlvblwiO1xuXG5jb25zdCBTVFlMRV9JRCA9IFwic3RyZW1pby1lbmhhbmNlZC1wbHVnaW4tb3B0aW9ucy1zdHlsZVwiO1xubGV0IG5leHRQYW5lbElkID0gMDtcblxuZnVuY3Rpb24gZW5zdXJlU3R5bGVzKCk6IHZvaWQge1xuICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChTVFlMRV9JRCkpIHJldHVybjtcblxuICAgIGNvbnN0IHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICAgIHN0eWxlLmlkID0gU1RZTEVfSUQ7XG4gICAgc3R5bGUudGV4dENvbnRlbnQgPSBgXG4gICAgICAgIC5zZS1wbHVnaW4tb3B0aW9ucy1idXR0b24sXG4gICAgICAgIC5zZS1wbHVnaW4tb3B0aW9ucy1hY3Rpb24ge1xuICAgICAgICAgICAgYm9yZGVyOiAwO1xuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogLjM1cmVtO1xuICAgICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICAgICAgcGFkZGluZzogLjU1cmVtIC44NXJlbTtcbiAgICAgICAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IHZhcigtLXNlY29uZGFyeS1hY2NlbnQtY29sb3IsICM1YjRiZDgpO1xuICAgICAgICB9XG4gICAgICAgIC5zZS1wbHVnaW4tb3B0aW9ucy1wYW5lbCB7XG4gICAgICAgICAgICBtYXJnaW46IC0uNXJlbSAwIDFyZW07XG4gICAgICAgICAgICBwYWRkaW5nOiAxcmVtO1xuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogLjVyZW07XG4gICAgICAgICAgICBjb2xvcjogd2hpdGU7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1zZWNvbmRhcnktYmFja2dyb3VuZC1jb2xvciwgcmdiYSgyMCwgMjAsIDI4LCAuOTYpKTtcbiAgICAgICAgfVxuICAgICAgICAuc2UtcGx1Z2luLW9wdGlvbnMtcGFuZWxbaGlkZGVuXSB7IGRpc3BsYXk6IG5vbmU7IH1cbiAgICAgICAgLnNlLXBsdWdpbi1vcHRpb25zLWZpZWxkIHsgZGlzcGxheTogZ3JpZDsgZ2FwOiAuMzVyZW07IG1hcmdpbi1ib3R0b206IC45cmVtOyB9XG4gICAgICAgIC5zZS1wbHVnaW4tb3B0aW9ucy1maWVsZCBpbnB1dDpub3QoW3R5cGU9XCJjaGVja2JveFwiXSksXG4gICAgICAgIC5zZS1wbHVnaW4tb3B0aW9ucy1maWVsZCBzZWxlY3Qge1xuICAgICAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgcGFkZGluZzogLjU1cmVtO1xuICAgICAgICAgICAgY29sb3I6IGluaGVyaXQ7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1wcmltYXJ5LWJhY2tncm91bmQtY29sb3IsICMxNzE3MWYpO1xuICAgICAgICAgICAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgyNTUsIDI1NSwgMjU1LCAuMjUpO1xuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogLjM1cmVtO1xuICAgICAgICB9XG4gICAgICAgIC5zZS1wbHVnaW4tb3B0aW9ucy1kZXNjcmlwdGlvbiB7IG9wYWNpdHk6IC43NTsgZm9udC1zaXplOiAuOWVtOyB9XG4gICAgICAgIC5zZS1wbHVnaW4tb3B0aW9ucy1hY3Rpb25zIHsgZGlzcGxheTogZmxleDsgZ2FwOiAuNnJlbTsgZmxleC13cmFwOiB3cmFwOyB9XG4gICAgICAgIC5zZS1wbHVnaW4tb3B0aW9ucy1hY3Rpb25bZGF0YS1raW5kPVwiY2FuY2VsXCJdIHsgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7IGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjU1LDI1NSwyNTUsLjM1KTsgfVxuICAgIGA7XG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU9wdGlvbklucHV0KFxuICAgIGRlZmluaXRpb246IFBsdWdpbk9wdGlvbkRlZmluaXRpb24sXG4gICAgaW5wdXRJZDogc3RyaW5nXG4pOiBIVE1MSW5wdXRFbGVtZW50IHwgSFRNTFNlbGVjdEVsZW1lbnQge1xuICAgIGlmIChkZWZpbml0aW9uLnR5cGUgPT09IFwic2VsZWN0XCIpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiKTtcbiAgICAgICAgc2VsZWN0LmlkID0gaW5wdXRJZDtcbiAgICAgICAgZm9yIChjb25zdCBjaG9pY2Ugb2YgZGVmaW5pdGlvbi5jaG9pY2VzKSB7XG4gICAgICAgICAgICBjb25zdCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xuICAgICAgICAgICAgb3B0aW9uLnZhbHVlID0gY2hvaWNlLnZhbHVlO1xuICAgICAgICAgICAgb3B0aW9uLnRleHRDb250ZW50ID0gY2hvaWNlLmxhYmVsO1xuICAgICAgICAgICAgc2VsZWN0LmFwcGVuZENoaWxkKG9wdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNlbGVjdDtcbiAgICB9XG5cbiAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICBpbnB1dC5pZCA9IGlucHV0SWQ7XG4gICAgaW5wdXQudHlwZSA9IGRlZmluaXRpb24udHlwZSA9PT0gXCJib29sZWFuXCIgPyBcImNoZWNrYm94XCIgOiBkZWZpbml0aW9uLnR5cGU7XG5cbiAgICBpZiAoZGVmaW5pdGlvbi50eXBlID09PSBcInRleHRcIikge1xuICAgICAgICBpZiAoZGVmaW5pdGlvbi5wbGFjZWhvbGRlciAhPT0gdW5kZWZpbmVkKSBpbnB1dC5wbGFjZWhvbGRlciA9IGRlZmluaXRpb24ucGxhY2Vob2xkZXI7XG4gICAgICAgIGlmIChkZWZpbml0aW9uLm1heExlbmd0aCAhPT0gdW5kZWZpbmVkKSBpbnB1dC5tYXhMZW5ndGggPSBkZWZpbml0aW9uLm1heExlbmd0aDtcbiAgICB9IGVsc2UgaWYgKGRlZmluaXRpb24udHlwZSA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICBpZiAoZGVmaW5pdGlvbi5taW4gIT09IHVuZGVmaW5lZCkgaW5wdXQubWluID0gU3RyaW5nKGRlZmluaXRpb24ubWluKTtcbiAgICAgICAgaWYgKGRlZmluaXRpb24ubWF4ICE9PSB1bmRlZmluZWQpIGlucHV0Lm1heCA9IFN0cmluZyhkZWZpbml0aW9uLm1heCk7XG4gICAgICAgIGlmIChkZWZpbml0aW9uLnN0ZXAgIT09IHVuZGVmaW5lZCkgaW5wdXQuc3RlcCA9IFN0cmluZyhkZWZpbml0aW9uLnN0ZXApO1xuICAgIH1cblxuICAgIHJldHVybiBpbnB1dDtcbn1cblxuZnVuY3Rpb24gc2V0SW5wdXRWYWx1ZShcbiAgICBpbnB1dDogSFRNTElucHV0RWxlbWVudCB8IEhUTUxTZWxlY3RFbGVtZW50LFxuICAgIGRlZmluaXRpb246IFBsdWdpbk9wdGlvbkRlZmluaXRpb24sXG4gICAgdmFsdWU6IGJvb2xlYW4gfCBzdHJpbmcgfCBudW1iZXJcbik6IHZvaWQge1xuICAgIGlmIChkZWZpbml0aW9uLnR5cGUgPT09IFwiYm9vbGVhblwiICYmIGlucHV0IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCkge1xuICAgICAgICBpbnB1dC5jaGVja2VkID0gdmFsdWUgPT09IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaW5wdXQudmFsdWUgPSBTdHJpbmcodmFsdWUpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gcmVhZElucHV0VmFsdWUoXG4gICAgaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQgfCBIVE1MU2VsZWN0RWxlbWVudCxcbiAgICBkZWZpbml0aW9uOiBQbHVnaW5PcHRpb25EZWZpbml0aW9uXG4pOiBib29sZWFuIHwgc3RyaW5nIHwgbnVtYmVyIHtcbiAgICBpZiAoZGVmaW5pdGlvbi50eXBlID09PSBcImJvb2xlYW5cIiAmJiBpbnB1dCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIGlucHV0LmNoZWNrZWQ7XG4gICAgfVxuICAgIGlmIChkZWZpbml0aW9uLnR5cGUgPT09IFwibnVtYmVyXCIgJiYgaW5wdXQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBOdW1iZXIuaXNGaW5pdGUoaW5wdXQudmFsdWVBc051bWJlcikgPyBpbnB1dC52YWx1ZUFzTnVtYmVyIDogZGVmaW5pdGlvbi5kZWZhdWx0O1xuICAgIH1cbiAgICByZXR1cm4gaW5wdXQudmFsdWU7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTW91bnRQbHVnaW5PcHRpb25zUGFyYW1zIHtcbiAgICBjb250YWluZXI6IEhUTUxFbGVtZW50O1xuICAgIGFjdGlvbkNvbnRhaW5lcjogSFRNTEVsZW1lbnQ7XG4gICAgcGx1Z2luRmlsZTogc3RyaW5nO1xuICAgIGRlZmluaXRpb25zOiBQbHVnaW5PcHRpb25EZWZpbml0aW9uW107XG4gICAgaXNFbmFibGVkOiAoKSA9PiBib29sZWFuO1xuICAgIHJlbG9hZD86ICgpID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtb3VudFBsdWdpbk9wdGlvbnMoe1xuICAgIGNvbnRhaW5lcixcbiAgICBhY3Rpb25Db250YWluZXIsXG4gICAgcGx1Z2luRmlsZSxcbiAgICBkZWZpbml0aW9ucyxcbiAgICBpc0VuYWJsZWQsXG4gICAgcmVsb2FkID0gKCkgPT4gd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpLFxufTogTW91bnRQbHVnaW5PcHRpb25zUGFyYW1zKTogdm9pZCB7XG4gICAgaWYgKGRlZmluaXRpb25zLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuICAgIGlmIChjb250YWluZXIucXVlcnlTZWxlY3RvcihcIltkYXRhLXN0cmVtaW8tZW5oYW5jZWQtcGx1Z2luLW9wdGlvbnNdXCIpKSByZXR1cm47XG5cbiAgICBlbnN1cmVTdHlsZXMoKTtcblxuICAgIG5leHRQYW5lbElkICs9IDE7XG4gICAgY29uc3QgcGFuZWxJZCA9IGBzZS1wbHVnaW4tb3B0aW9ucy0ke25leHRQYW5lbElkfWA7XG4gICAgY29uc3QgdG9nZ2xlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICB0b2dnbGVCdXR0b24udHlwZSA9IFwiYnV0dG9uXCI7XG4gICAgdG9nZ2xlQnV0dG9uLmNsYXNzTmFtZSA9IFwic2UtcGx1Z2luLW9wdGlvbnMtYnV0dG9uXCI7XG4gICAgdG9nZ2xlQnV0dG9uLnRleHRDb250ZW50ID0gXCJPcHRpb25zXCI7XG4gICAgdG9nZ2xlQnV0dG9uLnNldEF0dHJpYnV0ZShcImFyaWEtY29udHJvbHNcIiwgcGFuZWxJZCk7XG4gICAgdG9nZ2xlQnV0dG9uLnNldEF0dHJpYnV0ZShcImFyaWEtZXhwYW5kZWRcIiwgXCJmYWxzZVwiKTtcbiAgICBhY3Rpb25Db250YWluZXIuYXBwZW5kQ2hpbGQodG9nZ2xlQnV0dG9uKTtcblxuICAgIGNvbnN0IHBhbmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIik7XG4gICAgcGFuZWwuaWQgPSBwYW5lbElkO1xuICAgIHBhbmVsLmNsYXNzTmFtZSA9IFwic2UtcGx1Z2luLW9wdGlvbnMtcGFuZWxcIjtcbiAgICBwYW5lbC5kYXRhc2V0LnN0cmVtaW9FbmhhbmNlZFBsdWdpbk9wdGlvbnMgPSBwbHVnaW5GaWxlO1xuICAgIHBhbmVsLmhpZGRlbiA9IHRydWU7XG5cbiAgICBjb25zdCBjb250cm9scyA9IG5ldyBNYXA8c3RyaW5nLCBIVE1MSW5wdXRFbGVtZW50IHwgSFRNTFNlbGVjdEVsZW1lbnQ+KCk7XG4gICAgZm9yIChjb25zdCBkZWZpbml0aW9uIG9mIGRlZmluaXRpb25zKSB7XG4gICAgICAgIGNvbnN0IGZpZWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgZmllbGQuY2xhc3NOYW1lID0gXCJzZS1wbHVnaW4tb3B0aW9ucy1maWVsZFwiO1xuXG4gICAgICAgIGNvbnN0IGlucHV0SWQgPSBgJHtwYW5lbElkfS0ke2RlZmluaXRpb24uaWR9YDtcbiAgICAgICAgY29uc3QgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG4gICAgICAgIGxhYmVsLmh0bWxGb3IgPSBpbnB1dElkO1xuICAgICAgICBsYWJlbC50ZXh0Q29udGVudCA9IGRlZmluaXRpb24ubGFiZWw7XG5cbiAgICAgICAgY29uc3QgaW5wdXQgPSBjcmVhdGVPcHRpb25JbnB1dChkZWZpbml0aW9uLCBpbnB1dElkKTtcbiAgICAgICAgY29udHJvbHMuc2V0KGRlZmluaXRpb24uaWQsIGlucHV0KTtcblxuICAgICAgICBmaWVsZC5hcHBlbmRDaGlsZChsYWJlbCk7XG4gICAgICAgIGlmIChkZWZpbml0aW9uLmRlc2NyaXB0aW9uKSB7XG4gICAgICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbi5jbGFzc05hbWUgPSBcInNlLXBsdWdpbi1vcHRpb25zLWRlc2NyaXB0aW9uXCI7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IGRlZmluaXRpb24uZGVzY3JpcHRpb247XG4gICAgICAgICAgICBmaWVsZC5hcHBlbmRDaGlsZChkZXNjcmlwdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgZmllbGQuYXBwZW5kQ2hpbGQoaW5wdXQpO1xuICAgICAgICBwYW5lbC5hcHBlbmRDaGlsZChmaWVsZCk7XG4gICAgfVxuXG4gICAgY29uc3QgYWN0aW9ucyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgYWN0aW9ucy5jbGFzc05hbWUgPSBcInNlLXBsdWdpbi1vcHRpb25zLWFjdGlvbnNcIjtcblxuICAgIGNvbnN0IHNhdmVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIHNhdmVCdXR0b24udHlwZSA9IFwiYnV0dG9uXCI7XG4gICAgc2F2ZUJ1dHRvbi5jbGFzc05hbWUgPSBcInNlLXBsdWdpbi1vcHRpb25zLWFjdGlvblwiO1xuICAgIHNhdmVCdXR0b24udGV4dENvbnRlbnQgPSBcIlNhdmVcIjtcblxuICAgIGNvbnN0IHJlc2V0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICByZXNldEJ1dHRvbi50eXBlID0gXCJidXR0b25cIjtcbiAgICByZXNldEJ1dHRvbi5jbGFzc05hbWUgPSBcInNlLXBsdWdpbi1vcHRpb25zLWFjdGlvblwiO1xuICAgIHJlc2V0QnV0dG9uLnRleHRDb250ZW50ID0gXCJSZXNldCB0byBkZWZhdWx0c1wiO1xuXG4gICAgY29uc3QgY2FuY2VsQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBjYW5jZWxCdXR0b24udHlwZSA9IFwiYnV0dG9uXCI7XG4gICAgY2FuY2VsQnV0dG9uLmNsYXNzTmFtZSA9IFwic2UtcGx1Z2luLW9wdGlvbnMtYWN0aW9uXCI7XG4gICAgY2FuY2VsQnV0dG9uLmRhdGFzZXQua2luZCA9IFwiY2FuY2VsXCI7XG4gICAgY2FuY2VsQnV0dG9uLnRleHRDb250ZW50ID0gXCJDYW5jZWxcIjtcblxuICAgIGFjdGlvbnMuYXBwZW5kKHNhdmVCdXR0b24sIHJlc2V0QnV0dG9uLCBjYW5jZWxCdXR0b24pO1xuICAgIHBhbmVsLmFwcGVuZENoaWxkKGFjdGlvbnMpO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChwYW5lbCk7XG5cbiAgICBjb25zdCByZW5kZXJWYWx1ZXMgPSAodmFsdWVzOiBQbHVnaW5PcHRpb25WYWx1ZXMpOiB2b2lkID0+IHtcbiAgICAgICAgZm9yIChjb25zdCBkZWZpbml0aW9uIG9mIGRlZmluaXRpb25zKSB7XG4gICAgICAgICAgICBjb25zdCBpbnB1dCA9IGNvbnRyb2xzLmdldChkZWZpbml0aW9uLmlkKTtcbiAgICAgICAgICAgIGlmICghaW5wdXQpIGNvbnRpbnVlO1xuICAgICAgICAgICAgc2V0SW5wdXRWYWx1ZShpbnB1dCwgZGVmaW5pdGlvbiwgdmFsdWVzW2RlZmluaXRpb24uaWRdID8/IGRlZmluaXRpb24uZGVmYXVsdCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgY2xvc2VQYW5lbCA9ICgpOiB2b2lkID0+IHtcbiAgICAgICAgcGFuZWwuaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgdG9nZ2xlQnV0dG9uLnNldEF0dHJpYnV0ZShcImFyaWEtZXhwYW5kZWRcIiwgXCJmYWxzZVwiKTtcbiAgICB9O1xuXG4gICAgdG9nZ2xlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBldmVudCA9PiB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBwYW5lbC5oaWRkZW4gPSAhcGFuZWwuaGlkZGVuO1xuICAgICAgICB0b2dnbGVCdXR0b24uc2V0QXR0cmlidXRlKFwiYXJpYS1leHBhbmRlZFwiLCBTdHJpbmcoIXBhbmVsLmhpZGRlbikpO1xuICAgICAgICBpZiAoIXBhbmVsLmhpZGRlbikgcmVuZGVyVmFsdWVzKFBsdWdpbk9wdGlvbnMuZ2V0KHBsdWdpbkZpbGUpKTtcbiAgICB9KTtcblxuICAgIGNhbmNlbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2xvc2VQYW5lbCk7XG5cbiAgICBzYXZlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGNhbmRpZGF0ZVZhbHVlczogUGx1Z2luT3B0aW9uVmFsdWVzID0ge307XG4gICAgICAgIGZvciAoY29uc3QgZGVmaW5pdGlvbiBvZiBkZWZpbml0aW9ucykge1xuICAgICAgICAgICAgY29uc3QgaW5wdXQgPSBjb250cm9scy5nZXQoZGVmaW5pdGlvbi5pZCk7XG4gICAgICAgICAgICBpZiAoaW5wdXQpIGNhbmRpZGF0ZVZhbHVlc1tkZWZpbml0aW9uLmlkXSA9IHJlYWRJbnB1dFZhbHVlKGlucHV0LCBkZWZpbml0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIFBsdWdpbk9wdGlvbnMuc2F2ZShwbHVnaW5GaWxlLCBjYW5kaWRhdGVWYWx1ZXMpO1xuICAgICAgICBjbG9zZVBhbmVsKCk7XG4gICAgICAgIGlmIChpc0VuYWJsZWQoKSkgcmVsb2FkKCk7XG4gICAgfSk7XG5cbiAgICByZXNldEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICByZW5kZXJWYWx1ZXMoUGx1Z2luT3B0aW9ucy5yZXNldChwbHVnaW5GaWxlKSk7XG4gICAgICAgIGlmIChpc0VuYWJsZWQoKSkgcmVsb2FkKCk7XG4gICAgfSk7XG59XG4iLCAiaW1wb3J0IEhlbHBlcnMgZnJvbSBcIi4uL3V0aWxzL0hlbHBlcnNcIjtcbmltcG9ydCB7IE1ldGFEYXRhIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvTWV0YURhdGFcIjtcbmltcG9ydCB7IGdldFBsdWdpbkl0ZW1UZW1wbGF0ZSB9IGZyb20gXCIuLi9jb21wb25lbnRzL3BsdWdpbi1pdGVtL3BsdWdpbkl0ZW1cIjtcbmltcG9ydCB7IGdldFRoZW1lSXRlbVRlbXBsYXRlIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvdGhlbWUtaXRlbS90aGVtZUl0ZW1cIjtcbmltcG9ydCB7IGdldEVuaGFuY2VkTmF2IH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvZW5oYW5jZWQtbmF2L2VuaGFuY2VkTmF2XCI7XG5pbXBvcnQgeyBnZXRMb2dnZXIgfSBmcm9tIFwiLi4vdXRpbHMvbG9nZ2VyXCI7XG5pbXBvcnQgTW9kTWFuYWdlciBmcm9tIFwiLi9Nb2RNYW5hZ2VyXCI7XG5pbXBvcnQgeyBTRUxFQ1RPUlMsIENMQVNTRVMsIFNUT1JBR0VfS0VZUyB9IGZyb20gXCIuLi9jb25zdGFudHNcIjtcbmltcG9ydCBQbHVnaW5PcHRpb25zIGZyb20gXCIuL1BsdWdpbk9wdGlvbnNcIjtcbmltcG9ydCB7IG1vdW50UGx1Z2luT3B0aW9ucyB9IGZyb20gXCIuLi9jb21wb25lbnRzL3BsdWdpbi1vcHRpb25zL3BsdWdpbk9wdGlvbnNcIjtcblxuY2xhc3MgU2V0dGluZ3Mge1xuICAgIHByaXZhdGUgc3RhdGljIGxvZ2dlciA9IGdldExvZ2dlcihcIlNldHRpbmdzXCIpO1xuXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0RW5hYmxlZFBsdWdpbnMoKTogc3RyaW5nW10ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3Qgc3RvcmVkVmFsdWU6IHVua25vd24gPSBKU09OLnBhcnNlKFxuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5nZXRJdGVtKFNUT1JBR0VfS0VZUy5FTkFCTEVEX1BMVUdJTlMpIHx8IFwiW11cIlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KHN0b3JlZFZhbHVlKVxuICAgICAgICAgICAgICAgID8gc3RvcmVkVmFsdWUuZmlsdGVyKCh2YWx1ZSk6IHZhbHVlIGlzIHN0cmluZyA9PiB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpXG4gICAgICAgICAgICAgICAgOiBbXTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLndhcm4oYEZhaWxlZCB0byBwYXJzZSBlbmFibGVkIHBsdWdpbnM6ICR7ZXJyb3J9YCk7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBnZXRDYXRlZ29yeUtleShzZWN0aW9uSWQ6IHN0cmluZywgdGl0bGU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgJHtzZWN0aW9uSWR9OiR7dGl0bGUudHJpbSgpLnRvTG93ZXJDYXNlKCl9YDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBnZXRFeGlzdGluZ0NhdGVnb3J5KHNlY3Rpb246IEhUTUxFbGVtZW50LCBzZWN0aW9uSWQ6IHN0cmluZywgdGl0bGU6IHN0cmluZyk6IEhUTUxFbGVtZW50IHwgbnVsbCB7XG4gICAgICAgIGNvbnN0IGNhdGVnb3J5S2V5ID0gdGhpcy5nZXRDYXRlZ29yeUtleShzZWN0aW9uSWQsIHRpdGxlKTtcbiAgICAgICAgY29uc3QgY2F0ZWdvcnlCeUtleSA9IHNlY3Rpb24ucXVlcnlTZWxlY3RvcjxIVE1MRWxlbWVudD4oYFtkYXRhLXN0cmVtaW8tZW5oYW5jZWQtY2F0ZWdvcnk9XCIke2NhdGVnb3J5S2V5fVwiXWApO1xuICAgICAgICBpZiAoY2F0ZWdvcnlCeUtleSkgcmV0dXJuIGNhdGVnb3J5QnlLZXk7XG5cbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20oc2VjdGlvbi5jaGlsZHJlbikuZmluZCgoY2hpbGQpOiBjaGlsZCBpcyBIVE1MRWxlbWVudCA9PiB7XG4gICAgICAgICAgICBpZiAoIShjaGlsZCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgY29uc3QgbGFiZWwgPSBjaGlsZC5xdWVyeVNlbGVjdG9yKFNFTEVDVE9SUy5DQVRFR09SWV9MQUJFTCk7XG4gICAgICAgICAgICByZXR1cm4gbGFiZWw/LnRleHRDb250ZW50Py50cmltKCkgPT09IHRpdGxlO1xuICAgICAgICB9KSA/PyBudWxsO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGVuc3VyZU5hdkl0ZW0oc2VjdGlvbklkOiBzdHJpbmcsIHRpdGxlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy53YWl0Rm9yTmF2TWVudSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbmF2ID0gdGhpcy5nZXROYXZNZW51KCk7XG4gICAgICAgICAgICBjb25zdCBzaG9ydGN1dHNOYXYgPSB0aGlzLmdldE5hdlNob3J0Y3V0SXRlbSgpO1xuXG4gICAgICAgICAgICBpZiAoIW5hdikge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmVycm9yKFwibmF2IG1lbnUgaXMgc3RpbGwgbnVsbCBhZnRlciB3YWl0XCIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgZXhpc3RpbmdOYXYgPSBuYXYucXVlcnlTZWxlY3RvcjxIVE1MRWxlbWVudD4oYFtkYXRhLXNlY3Rpb249XCIke3NlY3Rpb25JZH1cIl1gKTtcbiAgICAgICAgICAgIGlmIChleGlzdGluZ05hdikge1xuICAgICAgICAgICAgICAgIGV4aXN0aW5nTmF2LnNldEF0dHJpYnV0ZShcInRpdGxlXCIsIHRpdGxlKTtcbiAgICAgICAgICAgICAgICBleGlzdGluZ05hdi50ZXh0Q29udGVudCA9IHRpdGxlO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgZW5oYW5jZWROYXZDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgZW5oYW5jZWROYXZDb250YWluZXIuaW5uZXJIVE1MID0gZ2V0RW5oYW5jZWROYXYoKTtcblxuICAgICAgICAgICAgY29uc3QgY2hpbGRUb0FwcGVuZCA9IChlbmhhbmNlZE5hdkNvbnRhaW5lci5maXJzdEVsZW1lbnRDaGlsZCBhcyBIVE1MRWxlbWVudCB8IG51bGwpID8/IGVuaGFuY2VkTmF2Q29udGFpbmVyO1xuICAgICAgICAgICAgY2hpbGRUb0FwcGVuZC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXNlY3Rpb25cIiwgc2VjdGlvbklkKTtcbiAgICAgICAgICAgIGNoaWxkVG9BcHBlbmQuc2V0QXR0cmlidXRlKFwidGl0bGVcIiwgdGl0bGUpO1xuICAgICAgICAgICAgY2hpbGRUb0FwcGVuZC50ZXh0Q29udGVudCA9IHRpdGxlO1xuXG4gICAgICAgICAgICBpZiAoc2hvcnRjdXRzTmF2ICYmIHNob3J0Y3V0c05hdi5wYXJlbnROb2RlID09PSBuYXYpIHtcbiAgICAgICAgICAgICAgICBuYXYuaW5zZXJ0QmVmb3JlKGNoaWxkVG9BcHBlbmQsIHNob3J0Y3V0c05hdi5uZXh0U2libGluZyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5hdi5hcHBlbmRDaGlsZChjaGlsZFRvQXBwZW5kKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkuY2F0Y2goZXJyID0+IHRoaXMubG9nZ2VyLmVycm9yKGBGYWlsZWQgdG8gYWRkIG5hdjogJHtlcnJ9YCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZCBhIG5ldyBzZWN0aW9uIHRvIHRoZSBzZXR0aW5ncyBwYW5lbFxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgYWRkU2VjdGlvbihzZWN0aW9uSWQ6IHN0cmluZywgdGl0bGU6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLndhaXRGb3JTZXR0aW5nc1BhbmVsKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzZXR0aW5nc1BhbmVsID0gdGhpcy5nZXRTZXR0aW5nc1BhbmVsKCk7XG4gICAgICAgICAgICBpZiAoIXNldHRpbmdzUGFuZWwpIHJldHVybjtcblxuICAgICAgICAgICAgbGV0IHNlY3Rpb25Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzZWN0aW9uSWQpIGFzIEhUTUxFbGVtZW50IHwgbnVsbDtcblxuICAgICAgICAgICAgaWYgKCFzZWN0aW9uQ29udGFpbmVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIuaW5mbyhgQWRkaW5nIHNlY3Rpb246ICR7c2VjdGlvbklkfSB3aXRoIHRpdGxlOiAke3RpdGxlfWApO1xuXG4gICAgICAgICAgICAgICAgY29uc3Qgc2VjdGlvbkVsZW1lbnQgPSB0aGlzLmdldEV4aXN0aW5nU2VjdGlvbihzZXR0aW5nc1BhbmVsKTtcbiAgICAgICAgICAgICAgICBjb25zdCBsYWJlbEVsZW1lbnQgPSB0aGlzLmdldEV4aXN0aW5nU2VjdGlvbkxhYmVsKHNlY3Rpb25FbGVtZW50KTtcblxuICAgICAgICAgICAgICAgIGlmICghc2VjdGlvbkVsZW1lbnQgfHwgIWxhYmVsRWxlbWVudCkgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgY29uc3Qgc2VjdGlvbkNsYXNzTmFtZSA9IHNlY3Rpb25FbGVtZW50LmNsYXNzTmFtZTtcbiAgICAgICAgICAgICAgICBjb25zdCB0aXRsZUNsYXNzTmFtZSA9IGxhYmVsRWxlbWVudC5jbGFzc05hbWU7XG5cbiAgICAgICAgICAgICAgICBzZWN0aW9uQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICBzZWN0aW9uQ29udGFpbmVyLmNsYXNzTmFtZSA9IHNlY3Rpb25DbGFzc05hbWU7XG4gICAgICAgICAgICAgICAgc2VjdGlvbkNvbnRhaW5lci5pZCA9IHNlY3Rpb25JZDtcbiAgICAgICAgICAgICAgICBzZWN0aW9uQ29udGFpbmVyLnNldEF0dHJpYnV0ZShcImRhdGEtc3RyZW1pby1lbmhhbmNlZC1zZWN0aW9uXCIsIHNlY3Rpb25JZCk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBzZWN0aW9uVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgICAgIHNlY3Rpb25UaXRsZS5jbGFzc05hbWUgPSB0aXRsZUNsYXNzTmFtZTtcbiAgICAgICAgICAgICAgICBzZWN0aW9uVGl0bGUudGV4dENvbnRlbnQgPSB0aXRsZTtcblxuICAgICAgICAgICAgICAgIHNlY3Rpb25Db250YWluZXIuYXBwZW5kQ2hpbGQoc2VjdGlvblRpdGxlKTtcbiAgICAgICAgICAgICAgICBzZXR0aW5nc1BhbmVsLmFwcGVuZENoaWxkKHNlY3Rpb25Db250YWluZXIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmVuc3VyZU5hdkl0ZW0oc2VjdGlvbklkLCB0aXRsZSk7XG4gICAgICAgIH0pLmNhdGNoKGVyciA9PiB0aGlzLmxvZ2dlci5lcnJvcihgRmFpbGVkIHRvIGFkZCBzZWN0aW9uOiAke2Vycn1gKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkIGEgY2F0ZWdvcnkgd2l0aGluIGEgc2VjdGlvblxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgYWRkQ2F0ZWdvcnkodGl0bGU6IHN0cmluZywgc2VjdGlvbklkOiBzdHJpbmcsIGljb246IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLndhaXRGb3JTZXR0aW5nc1BhbmVsKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzZWN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2VjdGlvbklkKTtcbiAgICAgICAgICAgIGlmICghKHNlY3Rpb24gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHJldHVybjtcblxuICAgICAgICAgICAgaWYgKHRoaXMuZ2V0RXhpc3RpbmdDYXRlZ29yeShzZWN0aW9uLCBzZWN0aW9uSWQsIHRpdGxlKSkgcmV0dXJuO1xuXG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKGBBZGRpbmcgY2F0ZWdvcnk6ICR7dGl0bGV9IHRvIHNlY3Rpb246ICR7c2VjdGlvbklkfWApO1xuXG4gICAgICAgICAgICBjb25zdCBjYXRlZ29yeVRlbXBsYXRlID0gdGhpcy5nZXRDYXRlZ29yeVRlbXBsYXRlKCk7XG4gICAgICAgICAgICBpZiAoIWNhdGVnb3J5VGVtcGxhdGUpIHJldHVybjtcblxuICAgICAgICAgICAgY29uc3QgeyBjYXRlZ29yeUNsYXNzLCBjYXRlZ29yeVRpdGxlQ2xhc3MsIGhlYWRpbmdDbGFzcywgaWNvbkNsYXNzIH0gPSBjYXRlZ29yeVRlbXBsYXRlO1xuXG4gICAgICAgICAgICBpY29uID0gaWNvbi5yZXBsYWNlKGBjbGFzcz1cImljb25cImAsIGBjbGFzcz1cIiR7aWNvbkNsYXNzfVwiYCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGNhdGVnb3J5RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIGNhdGVnb3J5RGl2LmNsYXNzTmFtZSA9IGNhdGVnb3J5Q2xhc3M7XG4gICAgICAgICAgICBjYXRlZ29yeURpdi5zZXRBdHRyaWJ1dGUoXCJkYXRhLXN0cmVtaW8tZW5oYW5jZWQtY2F0ZWdvcnlcIiwgdGhpcy5nZXRDYXRlZ29yeUtleShzZWN0aW9uSWQsIHRpdGxlKSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IHRpdGxlRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIHRpdGxlRGl2LmNsYXNzTmFtZSA9IGNhdGVnb3J5VGl0bGVDbGFzcztcbiAgICAgICAgICAgIHRpdGxlRGl2LnRleHRDb250ZW50ID0gdGl0bGU7XG5cbiAgICAgICAgICAgIGNvbnN0IGhlYWRpbmdEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgLy8gSWYgd2UgZm91bmQgYSBjbGFzcywgdXNlIGl0LiBJZiBub3QsIGZhbGxiYWNrIHRvIHNlbGVjdG9yIGxvZ2ljIG9yIGVtcHR5XG4gICAgICAgICAgICBpZiAoaGVhZGluZ0NsYXNzKSB7XG4gICAgICAgICAgICAgICAgaGVhZGluZ0Rpdi5jbGFzc05hbWUgPSBoZWFkaW5nQ2xhc3M7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICBoZWFkaW5nRGl2LmNsYXNzTGlzdC5hZGQoU0VMRUNUT1JTLkNBVEVHT1JZX0hFQURJTkcucmVwbGFjZSgnLicsICcnKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGhlYWRpbmdEaXYuaW5uZXJIVE1MICs9IGljb247XG4gICAgICAgICAgICBoZWFkaW5nRGl2LmFwcGVuZENoaWxkKHRpdGxlRGl2KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY2F0ZWdvcnlEaXYuYXBwZW5kQ2hpbGQoaGVhZGluZ0Rpdik7XG4gICAgICAgICAgICBzZWN0aW9uLmFwcGVuZENoaWxkKGNhdGVnb3J5RGl2KTtcbiAgICAgICAgfSkuY2F0Y2goZXJyID0+IHRoaXMubG9nZ2VyLmVycm9yKGBGYWlsZWQgdG8gYWRkIGNhdGVnb3J5OiAke2Vycn1gKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkIGEgYnV0dG9uIHRvIHRoZSBzZXR0aW5nc1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgYWRkQnV0dG9uKHRpdGxlOiBzdHJpbmcsIGlkOiBzdHJpbmcsIHF1ZXJ5OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgSGVscGVycy53YWl0Rm9yRWxtKHF1ZXJ5KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkpIHJldHVybjtcblxuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocXVlcnkpO1xuICAgICAgICAgICAgaWYgKCFlbGVtZW50KSByZXR1cm47XG5cbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbkRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICBvcHRpb25EaXYuY2xhc3NMaXN0LmFkZChDTEFTU0VTLk9QVElPTik7XG5cbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgY29udGVudERpdi5jbGFzc0xpc3QuYWRkKENMQVNTRVMuQ09OVEVOVCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGJ1dHRvbkRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICBidXR0b25EaXYuc2V0QXR0cmlidXRlKFwidGFiaW5kZXhcIiwgXCIwXCIpO1xuICAgICAgICAgICAgYnV0dG9uRGl2LnNldEF0dHJpYnV0ZShcInRpdGxlXCIsIHRpdGxlKTtcbiAgICAgICAgICAgIGJ1dHRvbkRpdi5jbGFzc0xpc3QuYWRkKENMQVNTRVMuQlVUVE9OLCBDTEFTU0VTLkJVVFRPTl9DT05UQUlORVIsIFwiYnV0dG9uXCIpO1xuICAgICAgICAgICAgYnV0dG9uRGl2LmlkID0gaWQ7XG4gICAgICAgICAgICBidXR0b25EaXYudGV4dENvbnRlbnQgPSB0aXRsZTtcblxuICAgICAgICAgICAgY29udGVudERpdi5hcHBlbmRDaGlsZChidXR0b25EaXYpO1xuICAgICAgICAgICAgb3B0aW9uRGl2LmFwcGVuZENoaWxkKGNvbnRlbnREaXYpO1xuICAgICAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChvcHRpb25EaXYpO1xuICAgICAgICB9KS5jYXRjaChlcnIgPT4gdGhpcy5sb2dnZXIuZXJyb3IoYEZhaWxlZCB0byBhZGQgYnV0dG9uOiAke2Vycn1gKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkIGEgdGhlbWUgb3IgcGx1Z2luIGl0ZW0gdG8gdGhlIHNldHRpbmdzXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBhZGRJdGVtKHR5cGU6IFwidGhlbWVcIiB8IFwicGx1Z2luXCIsIGZpbGVOYW1lOiBzdHJpbmcsIG1ldGFEYXRhOiBNZXRhRGF0YSk6IHZvaWQge1xuICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKGBBZGRpbmcgJHt0eXBlfTogJHtmaWxlTmFtZX1gKTtcblxuICAgICAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUoYCR7ZmlsZU5hbWV9LWJveGApLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKHR5cGUgPT09IFwidGhlbWVcIikge1xuICAgICAgICAgICAgSGVscGVycy53YWl0Rm9yRWxtKFNFTEVDVE9SUy5USEVNRVNfQ0FURUdPUlkpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkVGhlbWUoZmlsZU5hbWUsIG1ldGFEYXRhKTtcbiAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB0aGlzLmxvZ2dlci5lcnJvcihgRmFpbGVkIHRvIGFkZCB0aGVtZTogJHtlcnJ9YCkpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09IFwicGx1Z2luXCIpIHtcbiAgICAgICAgICAgIEhlbHBlcnMud2FpdEZvckVsbShTRUxFQ1RPUlMuUExVR0lOU19DQVRFR09SWSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRQbHVnaW4oZmlsZU5hbWUsIG1ldGFEYXRhKTtcbiAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB0aGlzLmxvZ2dlci5lcnJvcihgRmFpbGVkIHRvIGFkZCBwbHVnaW46ICR7ZXJyfWApKTtcbiAgICAgICAgfSAgICAgICAgXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgYWRkUGx1Z2luKGZpbGVOYW1lOiBzdHJpbmcsIG1ldGFEYXRhOiBNZXRhRGF0YSk6IHZvaWQge1xuICAgICAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUoYCR7ZmlsZU5hbWV9LWJveGApLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGVuYWJsZWRQbHVnaW5zID0gdGhpcy5nZXRFbmFibGVkUGx1Z2lucygpO1xuICAgICAgICBQbHVnaW5PcHRpb25zLnJlZ2lzdGVyKGZpbGVOYW1lLCBtZXRhRGF0YS5vcHRpb25zID8/IFtdKTtcblxuICAgICAgICBjb25zdCBwbHVnaW5Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBwbHVnaW5Db250YWluZXIuaW5uZXJIVE1MID0gZ2V0UGx1Z2luSXRlbVRlbXBsYXRlKGZpbGVOYW1lLCBtZXRhRGF0YSwgZW5hYmxlZFBsdWdpbnMuaW5jbHVkZXMoZmlsZU5hbWUpKTtcbiAgICAgICAgcGx1Z2luQ29udGFpbmVyLnNldEF0dHJpYnV0ZShcIm5hbWVcIiwgYCR7ZmlsZU5hbWV9LWJveGApO1xuICAgICAgICBwbHVnaW5Db250YWluZXIuc2V0QXR0cmlidXRlKFwiZGF0YS1zdHJlbWlvLWVuaGFuY2VkLWl0ZW1cIiwgZmlsZU5hbWUpO1xuXG4gICAgICAgIGNvbnN0IHBsdWdpbnNDYXRlZ29yeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoU0VMRUNUT1JTLlBMVUdJTlNfQ0FURUdPUlkpO1xuICAgICAgICBwbHVnaW5zQ2F0ZWdvcnk/LmFwcGVuZENoaWxkKHBsdWdpbkNvbnRhaW5lcik7XG5cbiAgICAgICAgY29uc3QgYWN0aW9uQ29udGFpbmVyID0gcGx1Z2luQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KFxuICAgICAgICAgICAgXCJbZGF0YS1zdHJlbWlvLWVuaGFuY2VkLXBsdWdpbi1hY3Rpb25zXVwiXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IHBsdWdpblRvZ2dsZSA9IHBsdWdpbkNvbnRhaW5lci5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PihcIi5wbHVnaW5cIik7XG4gICAgICAgIGlmIChwbHVnaW5Ub2dnbGUpIHtcbiAgICAgICAgICAgIE1vZE1hbmFnZXIuYmluZFBsdWdpblRvZ2dsZShwbHVnaW5Ub2dnbGUsIGZpbGVOYW1lKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYWN0aW9uQ29udGFpbmVyICYmIHBsdWdpblRvZ2dsZSAmJiBtZXRhRGF0YS5vcHRpb25zPy5sZW5ndGgpIHtcbiAgICAgICAgICAgIG1vdW50UGx1Z2luT3B0aW9ucyh7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyOiBwbHVnaW5Db250YWluZXIsXG4gICAgICAgICAgICAgICAgYWN0aW9uQ29udGFpbmVyLFxuICAgICAgICAgICAgICAgIHBsdWdpbkZpbGU6IGZpbGVOYW1lLFxuICAgICAgICAgICAgICAgIGRlZmluaXRpb25zOiBtZXRhRGF0YS5vcHRpb25zLFxuICAgICAgICAgICAgICAgIGlzRW5hYmxlZDogKCkgPT4gcGx1Z2luVG9nZ2xlLmNsYXNzTGlzdC5jb250YWlucyhDTEFTU0VTLkNIRUNLRUQpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIE1vZE1hbmFnZXIuY2hlY2tGb3JJdGVtVXBkYXRlcyhmaWxlTmFtZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgYWRkVGhlbWUoZmlsZU5hbWU6IHN0cmluZywgbWV0YURhdGE6IE1ldGFEYXRhKTogdm9pZCB7XG4gICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZShgJHtmaWxlTmFtZX0tYm94YCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY3VycmVudFRoZW1lID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oU1RPUkFHRV9LRVlTLkNVUlJFTlRfVEhFTUUpO1xuXG4gICAgICAgIGNvbnN0IHRoZW1lQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgdGhlbWVDb250YWluZXIuaW5uZXJIVE1MID0gZ2V0VGhlbWVJdGVtVGVtcGxhdGUoZmlsZU5hbWUsIG1ldGFEYXRhLCBjdXJyZW50VGhlbWUgPT09IGZpbGVOYW1lKTtcbiAgICAgICAgdGhlbWVDb250YWluZXIuc2V0QXR0cmlidXRlKFwibmFtZVwiLCBgJHtmaWxlTmFtZX0tYm94YCk7XG4gICAgICAgIHRoZW1lQ29udGFpbmVyLnNldEF0dHJpYnV0ZShcImRhdGEtc3RyZW1pby1lbmhhbmNlZC1pdGVtXCIsIGZpbGVOYW1lKTtcblxuICAgICAgICBjb25zdCB0aGVtZXNDYXRlZ29yeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoU0VMRUNUT1JTLlRIRU1FU19DQVRFR09SWSk7XG4gICAgICAgIHRoZW1lc0NhdGVnb3J5Py5hcHBlbmRDaGlsZCh0aGVtZUNvbnRhaW5lcik7XG4gICAgICAgIFxuICAgICAgICBNb2RNYW5hZ2VyLmNoZWNrRm9ySXRlbVVwZGF0ZXMoZmlsZU5hbWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZSBhbiBpdGVtIGZyb20gdGhlIHNldHRpbmdzXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyByZW1vdmVJdGVtKGZpbGVOYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgQXJyYXkuZnJvbShkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZShgJHtmaWxlTmFtZX0tYm94YCkpLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCBhIG5hdmlnYXRpb24gZWxlbWVudCBhcyBhY3RpdmVcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGFjdGl2ZVNlY3Rpb24oZWxlbWVudDogRWxlbWVudCk6IHZvaWQge1xuICAgICAgICBjb25zdCBuYXYgPSB0aGlzLmdldE5hdk1lbnUoKTtcbiAgICAgICAgaWYgKG5hdikge1xuICAgICAgICAgICAgLy8gUmVtb3ZlIHNlbGVjdGVkIGNsYXNzIGZyb20gYWxsIG5hdiBpdGVtc1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuYXYuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBuYXYuY2hpbGRyZW5baV0uY2xhc3NMaXN0LnJlbW92ZShDTEFTU0VTLlNFTEVDVEVEKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAvLyBGYWxsYmFjayB0byBxdWVyeVNlbGVjdG9yXG4gICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA2OyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBuYXZJdGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgJHtTRUxFQ1RPUlMuTkFWX01FTlV9ID4gZGl2Om50aC1jaGlsZCgke2l9KWApO1xuICAgICAgICAgICAgICAgIG5hdkl0ZW0/LmNsYXNzTGlzdC5yZW1vdmUoQ0xBU1NFUy5TRUxFQ1RFRCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoQ0xBU1NFUy5TRUxFQ1RFRCk7XG4gICAgfVxuXG4gICAgLy8gLS0tIER5bmFtaWMgRGlzY292ZXJ5IEhlbHBlcnMgLS0tXG5cbiAgICBwcml2YXRlIHN0YXRpYyBnZXROYXZNZW51KCk6IEVsZW1lbnQgfCBudWxsIHtcbiAgICAgICAgLy8gVHJ5IHNlbGVjdG9yXG4gICAgICAgIGNvbnN0IG5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoU0VMRUNUT1JTLk5BVl9NRU5VKTtcbiAgICAgICAgaWYgKG5hdikgcmV0dXJuIG5hdjtcblxuICAgICAgICAvLyBEeW5hbWljIGZhbGxiYWNrXG4gICAgICAgIGNvbnN0IGtleXdvcmRzID0gW1wiR2VuZXJhbFwiLCBcIkludGVyZmFjZVwiLCBcIlBsYXllclwiLCBcIlN0cmVhbWluZ1wiLCBcIlNob3J0Y3V0c1wiXTtcbiAgICAgICAgY29uc3QgbGlua3MgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2EsIGRpdlt0aXRsZV0nKSk7XG5cbiAgICAgICAgZm9yIChjb25zdCBsaW5rIG9mIGxpbmtzKSB7XG4gICAgICAgICAgICAgY29uc3QgdGl0bGUgPSBsaW5rLmdldEF0dHJpYnV0ZSgndGl0bGUnKTtcbiAgICAgICAgICAgICBpZiAodGl0bGUgJiYga2V5d29yZHMuaW5jbHVkZXModGl0bGUpKSB7XG4gICAgICAgICAgICAgICAgIGxldCBwYXJlbnQgPSBsaW5rLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgIHdoaWxlKHBhcmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgY29uc3QgZm91bmQgPSBrZXl3b3Jkcy5maWx0ZXIoayA9PiBwYXJlbnQhLnF1ZXJ5U2VsZWN0b3IoYFt0aXRsZT1cIiR7a31cIl1gKSk7XG4gICAgICAgICAgICAgICAgICAgICBpZiAoZm91bmQubGVuZ3RoID49IDEpIHsgLy8gQ2hhbmdlZCB0byAxIHRvIGJlIG1vcmUgcGVybWlzc2l2ZSBvbiBtb2JpbGVcbiAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFyZW50O1xuICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgICBpZiAocGFyZW50ID09PSBkb2N1bWVudC5ib2R5KSBicmVhaztcbiAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBnZXROYXZTaG9ydGN1dEl0ZW0oKTogRWxlbWVudCB8IG51bGwge1xuICAgICAgICBjb25zdCBpdGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW3RpdGxlPVwiU2hvcnRjdXRzXCJdJykgfHwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW3RpdGxlPVwiU3RyZWFtaW5nXCJdJyk7XG4gICAgICAgIHJldHVybiBpdGVtO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGdldFNldHRpbmdzUGFuZWwoKTogRWxlbWVudCB8IG51bGwge1xuICAgICAgICAvLyBUcnkgc2VsZWN0b3JcbiAgICAgICAgY29uc3QgcGFuZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFNFTEVDVE9SUy5TRUNUSU9OU19DT05UQUlORVIpO1xuICAgICAgICBpZiAocGFuZWwpIHJldHVybiBwYW5lbDtcblxuICAgICAgICAvLyBEeW5hbWljIGZhbGxiYWNrXG4gICAgICAgIGNvbnN0IG5hdk1lbnUgPSB0aGlzLmdldE5hdk1lbnUoKTtcbiAgICAgICAgY29uc3Qga2V5d29yZHMgPSBbXCJHZW5lcmFsXCIsIFwiSW50ZXJmYWNlXCIsIFwiUGxheWVyXCIsIFwiU3RyZWFtaW5nXCIsIFwiU2hvcnRjdXRzXCJdO1xuICAgICAgICBjb25zdCBhbGxEaXZzID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdkaXYnKSk7XG4gICAgICAgIGZvciAoY29uc3QgZGl2IG9mIGFsbERpdnMpIHtcbiAgICAgICAgICAgICAvLyBFeGNsdWRlIG5hdiBtZW51IGFuZCBpdHMgZGVzY2VuZGFudHNcbiAgICAgICAgICAgICBpZiAobmF2TWVudSAmJiAoZGl2ID09PSBuYXZNZW51IHx8IG5hdk1lbnUuY29udGFpbnMoZGl2KSkpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICAgLy8gVGhlIHJlYWwgc2V0dGluZ3MgcGFuZWwgY29udGFpbnMgbGFyZ2Ugc2VjdGlvbnMsIHNvIHdlIGNhbiBjaGVjayBpZiBpdCBoYXMgbXVsdGlwbGUgY2hpbGRyZW5cbiAgICAgICAgICAgICBpZiAoZGl2LmNoaWxkcmVuLmxlbmd0aCA+PSAyKSB7IC8vIENoYW5nZWQgdG8gPj0gMiB0byBiZSBtb3JlIHBlcm1pc3NpdmUgb24gbW9iaWxlXG4gICAgICAgICAgICAgICAgIGxldCBtYXRjaENvdW50ID0gMDtcbiAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaXYuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgIGlmIChrZXl3b3Jkcy5zb21lKGsgPT4gZGl2LmNoaWxkcmVuW2ldLnRleHRDb250ZW50Py5pbmNsdWRlcyhrKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaENvdW50Kys7XG4gICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgaWYgKG1hdGNoQ291bnQgPj0gMSkgcmV0dXJuIGRpdjsgLy8gQ2hhbmdlZCB0byA+PSAxIHRvIGJlIG1vcmUgcGVybWlzc2l2ZSBvbiBtb2JpbGVcbiAgICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0RXhpc3RpbmdTZWN0aW9uKHBhbmVsOiBFbGVtZW50KTogRWxlbWVudCB8IG51bGwge1xuICAgICAgICAvLyBGaW5kIGEgY2hpbGQgdGhhdCBjb250YWlucyBcIkdlbmVyYWxcIiBvciBcIlBsYXllclwiXG4gICAgICAgIGNvbnN0IGtleXdvcmRzID0gW1wiR2VuZXJhbFwiLCBcIkludGVyZmFjZVwiLCBcIlBsYXllclwiLCBcIlN0cmVhbWluZ1wiLCBcIlNob3J0Y3V0c1wiXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYW5lbC5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgY2hpbGQgPSBwYW5lbC5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgIGlmIChrZXl3b3Jkcy5zb21lKGsgPT4gY2hpbGQudGV4dENvbnRlbnQ/LmluY2x1ZGVzKGspKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjaGlsZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBGYWxsYmFjayB0byBzZWxlY3RvclxuICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihTRUxFQ1RPUlMuU0VDVElPTik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0RXhpc3RpbmdTZWN0aW9uTGFiZWwoc2VjdGlvbjogRWxlbWVudCB8IG51bGwpOiBFbGVtZW50IHwgbnVsbCB7XG4gICAgICAgIGlmICghc2VjdGlvbikgcmV0dXJuIG51bGw7XG4gICAgICAgIC8vIFRoZSBsYWJlbCBpcyB1c3VhbGx5IHRoZSBmaXJzdCBjaGlsZCBvciBjbGFzcyBjb250YWlucyBsYWJlbFxuICAgICAgICBpZiAoc2VjdGlvbi5jaGlsZHJlbi5sZW5ndGggPiAwKSByZXR1cm4gc2VjdGlvbi5jaGlsZHJlblswXTtcbiAgICAgICAgLy8gRmFsbGJhY2tcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoU0VMRUNUT1JTLkxBQkVMKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBnZXRDYXRlZ29yeVRlbXBsYXRlKCk6IHsgY2F0ZWdvcnlDbGFzczogc3RyaW5nLCBjYXRlZ29yeVRpdGxlQ2xhc3M6IHN0cmluZywgaGVhZGluZ0NsYXNzOiBzdHJpbmcsIGljb25DbGFzczogc3RyaW5nIH0gfCBudWxsIHtcbiAgICAgICAgLy8gVHJ5IHRvIGZpbmQgYW4gZXhpc3RpbmcgY2F0ZWdvcnkgdG8gY29weSBjbGFzc2VzXG4gICAgICAgIGNvbnN0IGNhdGVnb3J5RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoU0VMRUNUT1JTLkNBVEVHT1JZKTtcbiAgICAgICAgY29uc3QgY2F0ZWdvcnlUaXRsZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFNFTEVDVE9SUy5DQVRFR09SWV9MQUJFTCk7XG4gICAgICAgIGNvbnN0IGNhdGVnb3J5SWNvbkVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFNFTEVDVE9SUy5DQVRFR09SWV9JQ09OKTtcbiAgICAgICAgY29uc3QgY2F0ZWdvcnlIZWFkaW5nRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoU0VMRUNUT1JTLkNBVEVHT1JZX0hFQURJTkcpO1xuXG4gICAgICAgIGxldCBjYXRlZ29yeUNsYXNzID0gY2F0ZWdvcnlFbGVtZW50Py5jbGFzc05hbWUgfHwgXCJcIjtcbiAgICAgICAgbGV0IGNhdGVnb3J5VGl0bGVDbGFzcyA9IGNhdGVnb3J5VGl0bGVFbGVtZW50Py5jbGFzc05hbWUgfHwgXCJcIjtcbiAgICAgICAgbGV0IGhlYWRpbmdDbGFzcyA9IGNhdGVnb3J5SGVhZGluZ0VsZW1lbnQ/LmNsYXNzTmFtZSB8fCBcIlwiO1xuXG4gICAgICAgIGxldCBpY29uQ2xhc3MgPSAnaWNvbic7XG4gICAgICAgIGlmIChjYXRlZ29yeUljb25FbGVtZW50IGluc3RhbmNlb2YgU1ZHRWxlbWVudCkge1xuICAgICAgICAgICAgaWNvbkNsYXNzID0gY2F0ZWdvcnlJY29uRWxlbWVudC5jbGFzc05hbWUuYmFzZVZhbDtcbiAgICAgICAgfSBlbHNlIGlmIChjYXRlZ29yeUljb25FbGVtZW50KSB7XG4gICAgICAgICAgICBpY29uQ2xhc3MgPSBjYXRlZ29yeUljb25FbGVtZW50LmNsYXNzTmFtZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjYXRlZ29yeUNsYXNzICYmIGNhdGVnb3J5VGl0bGVDbGFzcykge1xuICAgICAgICAgICAgcmV0dXJuIHsgY2F0ZWdvcnlDbGFzcywgY2F0ZWdvcnlUaXRsZUNsYXNzLCBoZWFkaW5nQ2xhc3MsIGljb25DbGFzcyB9O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVHJ5IGR5bmFtaWMgaWYgc2VsZWN0b3IgZmFpbGVkXG4gICAgICAgIGNvbnN0IHBhbmVsID0gdGhpcy5nZXRTZXR0aW5nc1BhbmVsKCk7XG4gICAgICAgIGlmIChwYW5lbCkge1xuICAgICAgICAgICAgY29uc3Qgc2VjdGlvbiA9IHRoaXMuZ2V0RXhpc3RpbmdTZWN0aW9uKHBhbmVsKTtcbiAgICAgICAgICAgIGlmIChzZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgLy8gRmluZCBhIGNhdGVnb3J5IGluc2lkZSBzZWN0aW9uXG4gICAgICAgICAgICAgICAgLy8gVXN1YWxseSBub3QgdGhlIGZpcnN0IGNoaWxkIChMYWJlbClcbiAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxzZWN0aW9uLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoaWxkID0gc2VjdGlvbi5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgICAgICAgICAgLy8gU2tpcCBpZiBpdCBpcyB0aGUgbGFiZWwvdGl0bGVcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFiZWwgPSB0aGlzLmdldEV4aXN0aW5nU2VjdGlvbkxhYmVsKHNlY3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2hpbGQgPT09IGxhYmVsKSBjb250aW51ZTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBUaGlzIGNoaWxkIGlzIGxpa2VseSBhIGNhdGVnb3J5XG4gICAgICAgICAgICAgICAgICAgIGNhdGVnb3J5Q2xhc3MgPSBjaGlsZC5jbGFzc05hbWU7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gRmluZCBIZWFkaW5nXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGhlYWRpbmcgPSBjaGlsZC5jaGlsZHJlblswXTsgLy8gQXNzdW1pbmcgZmlyc3QgY2hpbGQgaXMgaGVhZGluZ1xuICAgICAgICAgICAgICAgICAgICBpZiAoaGVhZGluZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGluZ0NsYXNzID0gaGVhZGluZy5jbGFzc05hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBIZWFkaW5nIGNvbnRhaW5zIEljb24gYW5kIFRpdGxlXG4gICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaWNvbiA9IGhlYWRpbmcucXVlcnlTZWxlY3Rvcignc3ZnJykgfHwgaGVhZGluZy5jaGlsZHJlblswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaWNvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaWNvbiBpbnN0YW5jZW9mIFNWR0VsZW1lbnQpIGljb25DbGFzcyA9IGljb24uY2xhc3NOYW1lLmJhc2VWYWw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWNvbkNsYXNzID0gaWNvbi5jbGFzc05hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGl0bGUgPSBoZWFkaW5nLnF1ZXJ5U2VsZWN0b3IoJ2RpdicpIHx8IGhlYWRpbmcuY2hpbGRyZW5bMV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRpdGxlKSBjYXRlZ29yeVRpdGxlQ2xhc3MgPSB0aXRsZS5jbGFzc05hbWU7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAoY2F0ZWdvcnlDbGFzcyAmJiBjYXRlZ29yeVRpdGxlQ2xhc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBjYXRlZ29yeUNsYXNzLCBjYXRlZ29yeVRpdGxlQ2xhc3MsIGhlYWRpbmdDbGFzcywgaWNvbkNsYXNzIH07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyB3YWl0Rm9yU2V0dGluZ3NQYW5lbCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICBsZXQgcmV0cmllcyA9IDA7XG4gICAgICAgICAgICBjb25zdCBtYXhSZXRyaWVzID0gNDA7IC8vIDIwIHNlY29uZHNcbiAgICAgICAgICAgIGNvbnN0IGludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmdldFNldHRpbmdzUGFuZWwoKSkge1xuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHJpZXMrKztcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJldHJpZXMgPiBtYXhSZXRyaWVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoXCJUaW1lb3V0IHdhaXRpbmcgZm9yIHNldHRpbmdzIHBhbmVsXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTsgLy8gcmVzb2x2ZSB0byBsZXQgaXQgZmFpbCBncmFjZWZ1bGx5IGluc2lkZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgNTAwKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgd2FpdEZvck5hdk1lbnUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIGxldCByZXRyaWVzID0gMDtcbiAgICAgICAgICAgIGNvbnN0IG1heFJldHJpZXMgPSA0MDsgLy8gMjAgc2Vjb25kc1xuICAgICAgICAgICAgY29uc3QgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2V0TmF2TWVudSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0cmllcysrO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmV0cmllcyA+IG1heFJldHJpZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcihcIlRpbWVvdXQgd2FpdGluZyBmb3IgbmF2IG1lbnVcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgNTAwKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTZXR0aW5ncztcbiIsICJpbXBvcnQgVGVtcGxhdGVDYWNoZSBmcm9tICcuLi8uLi91dGlscy90ZW1wbGF0ZUNhY2hlJztcbmltcG9ydCB0eXBlIHsgTmF0aXZlUGxheWVyUHJlZmVyZW5jZSB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvTmF0aXZlUGxheWVyJztcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEFib3V0Q2F0ZWdvcnlUZW1wbGF0ZShcbiAgICB2ZXJzaW9uOiBzdHJpbmcsIFxuICAgIGNoZWNrRm9yVXBkYXRlc09uU3RhcnR1cDogYm9vbGVhbiwgXG4gICAgZGlzY29yZFJpY2hQcmVzZW5jZTogYm9vbGVhbiwgXG4gICAgZW5hYmxlVHJhbnNwYXJlbnRUaGVtZXM6IGJvb2xlYW4sXG4gICAgbmF0aXZlUGxheWVyOiBOYXRpdmVQbGF5ZXJQcmVmZXJlbmNlID0gXCJkaXNhYmxlZFwiLFxuICAgIG1wdlVzZVVzZXJDb25maWd1cmF0aW9uOiBib29sZWFuID0gZmFsc2UsXG4gICAgc2hvd05hdGl2ZVBsYXllckNvbnRyb2xzOiBib29sZWFuID0gZmFsc2Vcbik6IHN0cmluZyB7XG4gICAgY29uc3QgdGVtcGxhdGUgPSBUZW1wbGF0ZUNhY2hlLmxvYWQoX19kaXJuYW1lLCAnYWJvdXQtY2F0ZWdvcnknKTtcbiAgICBcbiAgICByZXR1cm4gdGVtcGxhdGVcbiAgICAgICAgLnJlcGxhY2UoXCJ7eyB2ZXJzaW9uIH19XCIsIHZlcnNpb24pXG4gICAgICAgIC5yZXBsYWNlKFwie3sgY2hlY2tGb3JVcGRhdGVzT25TdGFydHVwIH19XCIsIGNoZWNrRm9yVXBkYXRlc09uU3RhcnR1cCA/IFwiY2hlY2tlZFwiIDogXCJcIilcbiAgICAgICAgLnJlcGxhY2UoXCJ7eyBkaXNjb3JkcmljaHByZXNlbmNlIH19XCIsIGRpc2NvcmRSaWNoUHJlc2VuY2UgPyBcImNoZWNrZWRcIiA6IFwiXCIpXG4gICAgICAgIC5yZXBsYWNlKFwie3sgZW5hYmxlVHJhbnNwYXJlbnRUaGVtZXMgfX1cIiwgZW5hYmxlVHJhbnNwYXJlbnRUaGVtZXMgPyBcImNoZWNrZWRcIiA6IFwiXCIpXG4gICAgICAgIC5yZXBsYWNlKFxuICAgICAgICAgICAgXCJ7eyBuYXRpdmVQbGF5ZXJDb250cm9sc0Rpc3BsYXkgfX1cIixcbiAgICAgICAgICAgIHNob3dOYXRpdmVQbGF5ZXJDb250cm9scyA/IFwiXCIgOiBcImRpc3BsYXk6IG5vbmU7XCJcbiAgICAgICAgKVxuICAgICAgICAucmVwbGFjZShcbiAgICAgICAgICAgIFwie3sgbmF0aXZlUGxheWVyRGlzYWJsZWRTZWxlY3RlZCB9fVwiLFxuICAgICAgICAgICAgbmF0aXZlUGxheWVyID09PSBcImRpc2FibGVkXCIgPyBcInNlbGVjdGVkXCIgOiBcIlwiXG4gICAgICAgIClcbiAgICAgICAgLnJlcGxhY2UoXG4gICAgICAgICAgICBcInt7IG5hdGl2ZVBsYXllck1wdlNlbGVjdGVkIH19XCIsXG4gICAgICAgICAgICBuYXRpdmVQbGF5ZXIgPT09IFwibXB2XCIgPyBcInNlbGVjdGVkXCIgOiBcIlwiXG4gICAgICAgIClcbiAgICAgICAgLnJlcGxhY2UoXG4gICAgICAgICAgICBcInt7IG1wdlVzZVVzZXJDb25maWd1cmF0aW9uIH19XCIsXG4gICAgICAgICAgICBtcHZVc2VVc2VyQ29uZmlndXJhdGlvbiA/IFwiY2hlY2tlZFwiIDogXCJcIlxuICAgICAgICApO1xufVxuIiwgImltcG9ydCB7IFBsYXRmb3JtTWFuYWdlciB9IGZyb20gXCIuLi9wbGF0Zm9ybS9QbGF0Zm9ybU1hbmFnZXJcIjtcbmltcG9ydCB7IENhcGFjaXRvclBsYXRmb3JtIH0gZnJvbSBcIi4uL3BsYXRmb3JtL0NhcGFjaXRvclBsYXRmb3JtXCI7XG5pbXBvcnQgU2V0dGluZ3MgZnJvbSBcIi4uL2NvcmUvU2V0dGluZ3NcIjtcbmltcG9ydCBwcm9wZXJ0aWVzIGZyb20gXCIuLi9jb3JlL1Byb3BlcnRpZXNcIjtcbmltcG9ydCBNb2RNYW5hZ2VyIGZyb20gXCIuLi9jb3JlL01vZE1hbmFnZXJcIjtcbmltcG9ydCBIZWxwZXJzIGZyb20gXCIuLi91dGlscy9IZWxwZXJzXCI7XG5pbXBvcnQgeyBnZXRBYm91dENhdGVnb3J5VGVtcGxhdGUgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9hYm91dC1jYXRlZ29yeS9hYm91dENhdGVnb3J5XCI7XG5pbXBvcnQgbG9nZ2VyIGZyb20gXCIuLi91dGlscy9sb2dnZXJcIjtcbmltcG9ydCB7IGpvaW4gfSBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHtcbiAgICBTRUxFQ1RPUlMsXG4gICAgRklMRV9FWFRFTlNJT05TLFxuICAgIFRJTUVPVVRTLFxufSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBOb2RlSlMgfSBmcm9tICdjYXBhY2l0b3Itbm9kZWpzJztcbmltcG9ydCBMb2dNYW5hZ2VyIGZyb20gXCIuLi9jb3JlL0xvZ01hbmFnZXJcIjtcbmltcG9ydCB7IEZpbGVQaWNrZXIgfSBmcm9tICdAY2FwYXdlc29tZS9jYXBhY2l0b3ItZmlsZS1waWNrZXInO1xuaW1wb3J0IHsgY3JlYXRlU3RyZW1pb0VuaGFuY2VkQXBpIH0gZnJvbSBcIi4uL2NvcmUvU3RyZW1pb0VuaGFuY2VkQXBpXCI7XG5pbXBvcnQgeyBpbml0aWFsaXplVXNlclNldHRpbmdzIH0gZnJvbSBcIi4uL2NvcmUvVXNlclNldHRpbmdzXCI7XG5pbXBvcnQgeyBjcmVhdGVFbmhhbmNlZFNldHRpbmdzQ29udHJvbGxlciB9IGZyb20gXCIuLi9wcmVsb2FkL3NoYXJlZC9lbmhhbmNlZFNldHRpbmdzXCI7XG5pbXBvcnQgeyBhcHBseUFuZHJvaWRUaGVtZSB9IGZyb20gXCIuLi9wcmVsb2FkL2FuZHJvaWQvdGhlbWVcIjtcbmltcG9ydCB7IGlzU2FmZU1vZEZpbGVOYW1lIH0gZnJvbSBcIi4uL3V0aWxzL21vZEZpbGVOYW1lXCI7XG5cbi8vIEluaXRpYWxpemUgcGxhdGZvcm0gZm9yIENhcGFjaXRvclxuUGxhdGZvcm1NYW5hZ2VyLnNldFBsYXRmb3JtKG5ldyBDYXBhY2l0b3JQbGF0Zm9ybSgpKTtcblxuLy8gSG9vayBjb25zb2xlIGZvciBsb2dzIG1lbnVcbkxvZ01hbmFnZXIuaG9va0NvbnNvbGUoKTtcbkxvZ01hbmFnZXIuYWRkTG9nKCdJTkZPJywgJ1N0cmVtaW8gRW5oYW5jZWQ6IFByZWxvYWQgc2NyaXB0IGluaXRpYWxpemVkJyk7XG5cbi8vIExpc3RlbiBmb3Igc2VydmVyIGxvZ3MgYW5kIGVycm9yc1xuTm9kZUpTLmFkZExpc3RlbmVyKCdsb2cnLCAoZGF0YSkgPT4ge1xuICAgIExvZ01hbmFnZXIuYWRkTG9nKCdJTkZPJywgYFtTZXJ2ZXJdICR7ZGF0YS5hcmdzLmpvaW4oJyAnKX1gKTtcbiAgICBjb25zb2xlLmxvZygnW1NlcnZlcl0nLCAuLi5kYXRhLmFyZ3MpO1xufSk7XG5cbk5vZGVKUy5hZGRMaXN0ZW5lcignZXJyb3InLCAoZGF0YSkgPT4ge1xuICAgIExvZ01hbmFnZXIuYWRkTG9nKCdFUlJPUicsIGBbU2VydmVyIEVycm9yXSAke2RhdGEuYXJncy5qb2luKCcgJyl9YCk7XG4gICAgY29uc29sZS5lcnJvcignW1NlcnZlciBFcnJvcl0nLCAuLi5kYXRhLmFyZ3MpO1xuICAgIEhlbHBlcnMuc2hvd0FsZXJ0KCdlcnJvcicsICdTZXJ2ZXIgRXJyb3InLCBkYXRhLmFyZ3Muam9pbignICcpLCBbJ09LJ10pO1xufSk7XG5cbmNvbnN0IFNFVFRJTkdTX1JPVVRFID0gXCIjL3NldHRpbmdzXCI7XG5jb25zdCBQTEFZRVJfUk9VVEUgPSBcIiMvcGxheWVyXCI7XG5jb25zdCBTVFJFQU1JTkdfU0VSVkVSX1JFQURZX1RJTUVPVVRfTVMgPSAxNTAwMDtcbmNvbnN0IEZVTExTQ1JFRU5fQ09OVFJPTF9TRUxFQ1RPUlMgPSBbXG4gICAgJ1t0aXRsZT1cIkZ1bGxzY3JlZW5cIl0nLFxuICAgICdbdGl0bGU9XCJFeGl0IEZ1bGxzY3JlZW5cIl0nLFxuICAgICdidXR0b25bYXJpYS1sYWJlbD1cIkZ1bGxzY3JlZW5cIl0nLFxuICAgICdidXR0b25bYXJpYS1sYWJlbD1cIkV4aXQgRnVsbHNjcmVlblwiXScsXG4gICAgJ1tjbGFzcyo9XCJmdWxsc2NyZWVuLXRvZ2dsZVwiXScsXG4gICAgJ1tjbGFzcyo9XCJob3Jpem9udGFsLW5hdi1iYXItY29udGFpbmVyLVwiXSBbY2xhc3MqPVwiYnV0dG9ucy1jb250YWluZXItXCJdID4gOm5vdChbY2xhc3MqPVwibWVudS1idXR0b24tY29udGFpbmVyXCJdKTpub3QoLnN0cmVtaW8tZW5oYW5jZWQtcGlwLWJ1dHRvbiknLFxuXTtcblxubGV0IGZ1bGxzY3JlZW5TdHlsZUluamVjdGVkID0gZmFsc2U7XG5sZXQgZnVsbHNjcmVlbk9ic2VydmVyU3RhcnRlZCA9IGZhbHNlO1xubGV0IHNldHRpbmdzT2JzZXJ2ZXJTdGFydGVkID0gZmFsc2U7XG5sZXQgc2V0dGluZ3NDaGVja1NjaGVkdWxlZCA9IGZhbHNlO1xubGV0IHBsYXllck9ic2VydmVyU3RhcnRlZCA9IGZhbHNlO1xubGV0IHBsYXllckZlYXR1cmVDaGVja1NjaGVkdWxlZCA9IGZhbHNlO1xubGV0IHN0cmVhbWluZ1NlcnZlclJlYWR5UHJvbWlzZTogUHJvbWlzZTx2b2lkPiB8IG51bGwgPSBudWxsO1xubGV0IHN0cmVhbWluZ1NlcnZlclJlbG9hZFNjaGVkdWxlZCA9IGZhbHNlO1xuXG5jb25zdCBpbml0ID0gYXN5bmMgKCkgPT4ge1xuICAgIExvZ01hbmFnZXIuYWRkTG9nKCdJTkZPJywgJ1N0cmVtaW8gRW5oYW5jZWQ6IEluaXRpYWxpemF0aW9uIHN0YXJ0ZWQnKTtcbiAgICBhd2FpdCBQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC5pbml0KCk7XG4gICAgdm9pZCBlbnN1cmVCdW5kbGVkU3RyZWFtaW5nU2VydmVyUmVhZHkoKTtcblxuICAgIGluc3RhbGxGdWxsc2NyZWVuSGlkZXIoKTtcbiAgICBvYnNlcnZlU2V0dGluZ3NVaSgpO1xuICAgIG9ic2VydmVQbGF5ZXJVaSgpO1xuXG4gICAgd2luZG93LnN0cmVtaW9FbmhhbmNlZCA9IGNyZWF0ZVN0cmVtaW9FbmhhbmNlZEFwaShhcHBseUFuZHJvaWRUaGVtZSk7XG5cbiAgICBpbml0aWFsaXplVXNlclNldHRpbmdzKHsgY2hlY2tVcGRhdGVzT25TdGFydHVwRGVmYXVsdDogZmFsc2UgfSk7XG5cbiAgICAvLyBBcHBseSBlbmFibGVkIHRoZW1lXG4gICAgYXdhaXQgYXBwbHlBbmRyb2lkVGhlbWUoKTtcblxuICAgIC8vIExvYWQgZW5hYmxlZCBwbHVnaW5zXG4gICAgYXdhaXQgTW9kTWFuYWdlci5sb2FkRW5hYmxlZFBsdWdpbnMoKTtcblxuICAgIC8vIEhhbmRsZSBuYXZpZ2F0aW9uIGNoYW5nZXNcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImhhc2hjaGFuZ2VcIiwgKCkgPT4ge1xuICAgICAgICBzY2hlZHVsZVNldHRpbmdzQ2hlY2soKTtcbiAgICAgICAgc2NoZWR1bGVQbGF5ZXJGZWF0dXJlU3luYygpO1xuICAgIH0pO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgKCkgPT4ge1xuICAgICAgICBoaWRlRnVsbHNjcmVlbkNvbnRyb2xzKCk7XG4gICAgfSk7XG5cbiAgICAvLyBJbml0aWFsIGNoZWNrXG4gICAgc2NoZWR1bGVTZXR0aW5nc0NoZWNrKCk7XG4gICAgc2NoZWR1bGVQbGF5ZXJGZWF0dXJlU3luYygpO1xuICAgIGhpZGVGdWxsc2NyZWVuQ29udHJvbHMoKTtcblxuICAgIC8vIEluamVjdCBzdWNjZXNzIHRvYXN0XG4gICAgSGVscGVycy5jcmVhdGVUb2FzdCgnZW5oYW5jZWQtbG9hZGVkJywgJ1N0cmVtaW8gRW5oYW5jZWQnLCAnU3RyZW1pbyBFbmhhbmNlZCBMb2FkZWQnLCAnc3VjY2VzcycpO1xufTtcblxuaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdsb2FkaW5nJykge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBpbml0KTtcbn0gZWxzZSB7XG4gICAgaW5pdCgpO1xufVxuXG5mdW5jdGlvbiBiaW5kQnV0dG9uQ2xpY2soXG4gICAgYnV0dG9uSWQ6IHN0cmluZyxcbiAgICBoYW5kbGVyOiAoKSA9PiB2b2lkIHwgUHJvbWlzZTx2b2lkPixcbiAgICBlcnJvckNvbnRleHQ6IHN0cmluZ1xuKTogdm9pZCB7XG4gICAgSGVscGVycy53YWl0Rm9yRWxtKGAjJHtidXR0b25JZH1gKS50aGVuKCgpID0+IHtcbiAgICAgICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYnV0dG9uSWQpO1xuICAgICAgICBpZiAoIShidXR0b24gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHJldHVybjtcbiAgICAgICAgaWYgKGJ1dHRvbi5kYXRhc2V0LnN0cmVtaW9FbmhhbmNlZENsaWNrQm91bmQgPT09IFwidHJ1ZVwiKSByZXR1cm47XG5cbiAgICAgICAgYnV0dG9uLmRhdGFzZXQuc3RyZW1pb0VuaGFuY2VkQ2xpY2tCb3VuZCA9IFwidHJ1ZVwiO1xuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgIHZvaWQgaGFuZGxlcigpO1xuICAgICAgICB9KTtcbiAgICB9KS5jYXRjaChlcnIgPT4gbG9nZ2VyLmVycm9yKGBGYWlsZWQgdG8gc2V0dXAgJHtlcnJvckNvbnRleHR9OiAke2Vycn1gKSk7XG59XG5cbmZ1bmN0aW9uIGFkZEFuZHJvaWRTZXR0aW5nc0NvbnRyb2xzKCk6IHZvaWQge1xuICAgIFNldHRpbmdzLmFkZEJ1dHRvbihcIkltcG9ydCBUaGVtZVwiLCBcImltcG9ydFRoZW1lQnRuXCIsIFNFTEVDVE9SUy5USEVNRVNfQ0FURUdPUlkpO1xuICAgIFNldHRpbmdzLmFkZEJ1dHRvbihcIk1hbmFnZSBUaGVtZXMgRm9sZGVyXCIsIFwib3BlbnRoZW1lc2ZvbGRlckJ0blwiLCBTRUxFQ1RPUlMuVEhFTUVTX0NBVEVHT1JZKTtcbiAgICBTZXR0aW5ncy5hZGRCdXR0b24oXCJJbXBvcnQgUGx1Z2luXCIsIFwiaW1wb3J0UGx1Z2luQnRuXCIsIFNFTEVDVE9SUy5QTFVHSU5TX0NBVEVHT1JZKTtcbiAgICBTZXR0aW5ncy5hZGRCdXR0b24oXCJNYW5hZ2UgUGx1Z2lucyBGb2xkZXJcIiwgXCJvcGVucGx1Z2luc2ZvbGRlckJ0blwiLCBTRUxFQ1RPUlMuUExVR0lOU19DQVRFR09SWSk7XG5cbiAgICBzZXR1cEltcG9ydEJ1dHRvbihcImltcG9ydFRoZW1lQnRuXCIsIFwidGhlbWVcIik7XG4gICAgc2V0dXBJbXBvcnRCdXR0b24oXCJpbXBvcnRQbHVnaW5CdG5cIiwgXCJwbHVnaW5cIik7XG4gICAgc2V0dXBNYW5hZ2VkRm9sZGVyQnV0dG9uKFwib3BlbnRoZW1lc2ZvbGRlckJ0blwiLCBwcm9wZXJ0aWVzLnRoZW1lc1BhdGgpO1xuICAgIHNldHVwTWFuYWdlZEZvbGRlckJ1dHRvbihcIm9wZW5wbHVnaW5zZm9sZGVyQnRuXCIsIHByb3BlcnRpZXMucGx1Z2luc1BhdGgpO1xufVxuXG5jb25zdCBzZXR0aW5nc0NvbnRyb2xsZXIgPSBjcmVhdGVFbmhhbmNlZFNldHRpbmdzQ29udHJvbGxlcih7XG4gICAgYWRkUGxhdGZvcm1Db250cm9sczogYWRkQW5kcm9pZFNldHRpbmdzQ29udHJvbHMsXG4gICAgcmVuZGVyQWJvdXQ6IHdyaXRlQWJvdXQsXG59KTtcblxuYXN5bmMgZnVuY3Rpb24gY2hlY2tTZXR0aW5ncygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCBzZXR0aW5nc0NvbnRyb2xsZXIuY2hlY2soKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZW5zdXJlQnVuZGxlZFN0cmVhbWluZ1NlcnZlclJlYWR5KCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmIChzdHJlYW1pbmdTZXJ2ZXJSZWFkeVByb21pc2UpIHtcbiAgICAgICAgYXdhaXQgc3RyZWFtaW5nU2VydmVyUmVhZHlQcm9taXNlO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc3RyZWFtaW5nU2VydmVyUmVhZHlQcm9taXNlID0gKGFzeW5jICgpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF3YWl0IFByb21pc2UucmFjZShbXG4gICAgICAgICAgICAgICAgTm9kZUpTLndoZW5SZWFkeSgpLFxuICAgICAgICAgICAgICAgIG5ldyBQcm9taXNlPG5ldmVyPigoXywgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoXCJUaW1lZCBvdXQgd2FpdGluZyBmb3IgdGhlIGJ1bmRsZWQgc3RyZWFtaW5nIHNlcnZlci5cIikpO1xuICAgICAgICAgICAgICAgICAgICB9LCBTVFJFQU1JTkdfU0VSVkVSX1JFQURZX1RJTUVPVVRfTVMpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdKTtcblxuICAgICAgICAgICAgTG9nTWFuYWdlci5hZGRMb2coXCJJTkZPXCIsIFwiQnVuZGxlZCBzdHJlYW1pbmcgc2VydmVyIGlzIHJlYWR5XCIpO1xuICAgICAgICAgICAgc2NoZWR1bGVTdHJlYW1pbmdTZXJ2ZXJSZWxvYWQoKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcik7XG4gICAgICAgICAgICBMb2dNYW5hZ2VyLmFkZExvZyhcIkVSUk9SXCIsIGBCdW5kbGVkIHN0cmVhbWluZyBzZXJ2ZXIgZmFpbGVkIHRvIGJlY29tZSByZWFkeTogJHttZXNzYWdlfWApO1xuICAgICAgICAgICAgbG9nZ2VyLmVycm9yKGBCdW5kbGVkIHN0cmVhbWluZyBzZXJ2ZXIgZmFpbGVkIHRvIGJlY29tZSByZWFkeTogJHttZXNzYWdlfWApO1xuICAgICAgICAgICAgc3RyZWFtaW5nU2VydmVyUmVhZHlQcm9taXNlID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH0pKCk7XG5cbiAgICBhd2FpdCBzdHJlYW1pbmdTZXJ2ZXJSZWFkeVByb21pc2U7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJlbG9hZFN0cmVhbWluZ1NlcnZlcihyZXRyeUNvdW50ID0gMCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IEhlbHBlcnMuX2V2YWwoYGNvcmUudHJhbnNwb3J0LmRpc3BhdGNoKHsgYWN0aW9uOiAnU3RyZWFtaW5nU2VydmVyJywgYXJnczogeyBhY3Rpb246ICdSZWxvYWQnIH0gfSk7YCk7XG4gICAgICAgIGxvZ2dlci5pbmZvKFwiU3RyZW1pbyBzdHJlYW1pbmcgc2VydmVyIHJlbG9hZGVkLlwiKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zdCBtZXNzYWdlID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpO1xuICAgICAgICBpZiAocmV0cnlDb3VudCA8IDMpIHtcbiAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB2b2lkIHJlbG9hZFN0cmVhbWluZ1NlcnZlcihyZXRyeUNvdW50ICsgMSk7XG4gICAgICAgICAgICB9LCBUSU1FT1VUUy5DT1JFU1RBVEVfUkVUUllfSU5URVJWQUwpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbG9nZ2VyLmVycm9yKGBGYWlsZWQgdG8gcmVsb2FkIGJ1bmRsZWQgc3RyZWFtaW5nIHNlcnZlcjogJHttZXNzYWdlfWApO1xuICAgICAgICBMb2dNYW5hZ2VyLmFkZExvZyhcIkVSUk9SXCIsIGBGYWlsZWQgdG8gcmVsb2FkIGJ1bmRsZWQgc3RyZWFtaW5nIHNlcnZlcjogJHttZXNzYWdlfWApO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gc2NoZWR1bGVTdHJlYW1pbmdTZXJ2ZXJSZWxvYWQoKTogdm9pZCB7XG4gICAgaWYgKHN0cmVhbWluZ1NlcnZlclJlbG9hZFNjaGVkdWxlZCkgcmV0dXJuO1xuICAgIHN0cmVhbWluZ1NlcnZlclJlbG9hZFNjaGVkdWxlZCA9IHRydWU7XG5cbiAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHN0cmVhbWluZ1NlcnZlclJlbG9hZFNjaGVkdWxlZCA9IGZhbHNlO1xuICAgICAgICB2b2lkIHJlbG9hZFN0cmVhbWluZ1NlcnZlcigpO1xuICAgIH0sIFRJTUVPVVRTLlNFUlZFUl9SRUxPQURfREVMQVkpO1xufVxuXG5mdW5jdGlvbiBzY2hlZHVsZVNldHRpbmdzQ2hlY2soKTogdm9pZCB7XG4gICAgaWYgKHNldHRpbmdzQ2hlY2tTY2hlZHVsZWQpIHJldHVybjtcbiAgICBzZXR0aW5nc0NoZWNrU2NoZWR1bGVkID0gdHJ1ZTtcblxuICAgIHdpbmRvdy5zZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcbiAgICAgICAgc2V0dGluZ3NDaGVja1NjaGVkdWxlZCA9IGZhbHNlO1xuICAgICAgICBhd2FpdCBjaGVja1NldHRpbmdzKCk7XG4gICAgfSwgMTAwKTtcbn1cblxuZnVuY3Rpb24gb2JzZXJ2ZVNldHRpbmdzVWkoKTogdm9pZCB7XG4gICAgaWYgKHNldHRpbmdzT2JzZXJ2ZXJTdGFydGVkKSByZXR1cm47XG4gICAgc2V0dGluZ3NPYnNlcnZlclN0YXJ0ZWQgPSB0cnVlO1xuXG4gICAgY29uc3Qgc3RhcnRPYnNlcnZlciA9ICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XG4gICAgICAgICAgICBpZiAobG9jYXRpb24uaHJlZi5pbmNsdWRlcyhTRVRUSU5HU19ST1VURSkpIHtcbiAgICAgICAgICAgICAgICBzY2hlZHVsZVNldHRpbmdzQ2hlY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5ib2R5LCB7XG4gICAgICAgICAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgICAgICAgICBzdWJ0cmVlOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgaWYgKGRvY3VtZW50LmJvZHkpIHtcbiAgICAgICAgc3RhcnRPYnNlcnZlcigpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgYm9keU9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKF8sIG9icykgPT4ge1xuICAgICAgICBpZiAoIWRvY3VtZW50LmJvZHkpIHJldHVybjtcbiAgICAgICAgb2JzLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgc3RhcnRPYnNlcnZlcigpO1xuICAgIH0pO1xuXG4gICAgYm9keU9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCB7XG4gICAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICAgICAgc3VidHJlZTogdHJ1ZSxcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gc2NoZWR1bGVQbGF5ZXJGZWF0dXJlU3luYygpOiB2b2lkIHtcbiAgICBpZiAocGxheWVyRmVhdHVyZUNoZWNrU2NoZWR1bGVkKSByZXR1cm47XG4gICAgcGxheWVyRmVhdHVyZUNoZWNrU2NoZWR1bGVkID0gdHJ1ZTtcblxuICAgIHdpbmRvdy5zZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcbiAgICAgICAgcGxheWVyRmVhdHVyZUNoZWNrU2NoZWR1bGVkID0gZmFsc2U7XG4gICAgICAgIGF3YWl0IHN5bmNQbGF5ZXJGZWF0dXJlcygpO1xuICAgIH0sIDEwMCk7XG59XG5cbmZ1bmN0aW9uIG9ic2VydmVQbGF5ZXJVaSgpOiB2b2lkIHtcbiAgICBpZiAocGxheWVyT2JzZXJ2ZXJTdGFydGVkKSByZXR1cm47XG4gICAgcGxheWVyT2JzZXJ2ZXJTdGFydGVkID0gdHJ1ZTtcblxuICAgIGNvbnN0IHN0YXJ0T2JzZXJ2ZXIgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKGxvY2F0aW9uLmhyZWYuaW5jbHVkZXMoUExBWUVSX1JPVVRFKSkge1xuICAgICAgICAgICAgICAgIHNjaGVkdWxlUGxheWVyRmVhdHVyZVN5bmMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5ib2R5LCB7XG4gICAgICAgICAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgICAgICAgICBzdWJ0cmVlOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgaWYgKGRvY3VtZW50LmJvZHkpIHtcbiAgICAgICAgc3RhcnRPYnNlcnZlcigpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgYm9keU9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKF8sIG9icykgPT4ge1xuICAgICAgICBpZiAoIWRvY3VtZW50LmJvZHkpIHJldHVybjtcbiAgICAgICAgb2JzLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgc3RhcnRPYnNlcnZlcigpO1xuICAgIH0pO1xuXG4gICAgYm9keU9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCB7XG4gICAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICAgICAgc3VidHJlZTogdHJ1ZSxcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gaW5zdGFsbEZ1bGxzY3JlZW5IaWRlcigpOiB2b2lkIHtcbiAgICBpZiAoIWZ1bGxzY3JlZW5TdHlsZUluamVjdGVkKSB7XG4gICAgICAgIGNvbnN0IHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICAgICAgICBzdHlsZS5pZCA9IFwic3RyZW1pby1lbmhhbmNlZC1mdWxsc2NyZWVuLXN0eWxlXCI7XG4gICAgICAgIHN0eWxlLnRleHRDb250ZW50ID0gYFxuICAgICAgICAgICAgJHtGVUxMU0NSRUVOX0NPTlRST0xfU0VMRUNUT1JTLmpvaW4oXCIsXFxuICAgICAgICAgICAgXCIpfSB7XG4gICAgICAgICAgICAgICAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xuICAgICAgICAgICAgICAgIHZpc2liaWxpdHk6IGhpZGRlbiAhaW1wb3J0YW50O1xuICAgICAgICAgICAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lICFpbXBvcnRhbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIGA7XG5cbiAgICAgICAgY29uc3QgYXBwZW5kU3R5bGUgPSAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoIWRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc3R5bGUuaWQpKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcbiAgICAgICAgICAgIGZ1bGxzY3JlZW5TdHlsZUluamVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmICghYXBwZW5kU3R5bGUoKSkge1xuICAgICAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoXywgb2JzKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFhcHBlbmRTdHlsZSgpKSByZXR1cm47XG4gICAgICAgICAgICAgICAgb2JzLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsIHsgY2hpbGRMaXN0OiB0cnVlLCBzdWJ0cmVlOiB0cnVlIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGlkZUZ1bGxzY3JlZW5Db250cm9scygpO1xuXG4gICAgaWYgKGZ1bGxzY3JlZW5PYnNlcnZlclN0YXJ0ZWQpIHJldHVybjtcbiAgICBmdWxsc2NyZWVuT2JzZXJ2ZXJTdGFydGVkID0gdHJ1ZTtcblxuICAgIGNvbnN0IHN0YXJ0T2JzZXJ2ZXIgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xuICAgICAgICAgICAgaGlkZUZ1bGxzY3JlZW5Db250cm9scygpO1xuICAgICAgICB9KTtcblxuICAgICAgICBvYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmJvZHksIHtcbiAgICAgICAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICAgICAgICAgIHN1YnRyZWU6IHRydWUsXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiB0cnVlLFxuICAgICAgICAgICAgYXR0cmlidXRlRmlsdGVyOiBbXCJjbGFzc1wiLCBcInRpdGxlXCIsIFwiYXJpYS1sYWJlbFwiXSxcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGlmIChkb2N1bWVudC5ib2R5KSB7XG4gICAgICAgIHN0YXJ0T2JzZXJ2ZXIoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGJvZHlPYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKChfLCBvYnMpID0+IHtcbiAgICAgICAgaWYgKCFkb2N1bWVudC5ib2R5KSByZXR1cm47XG4gICAgICAgIG9icy5kaXNjb25uZWN0KCk7XG4gICAgICAgIHN0YXJ0T2JzZXJ2ZXIoKTtcbiAgICB9KTtcblxuICAgIGJvZHlPYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwge1xuICAgICAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgICAgIHN1YnRyZWU6IHRydWUsXG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGhpZGVGdWxsc2NyZWVuQ29udHJvbHMoKTogdm9pZCB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbDxIVE1MRWxlbWVudD4oRlVMTFNDUkVFTl9DT05UUk9MX1NFTEVDVE9SUy5qb2luKFwiLFwiKSkuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgICBpZiAoZWxlbWVudC5jbG9zZXN0KCdbY2xhc3MqPVwibWVudS1idXR0b24tY29udGFpbmVyXCJdJykgfHwgZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJzdHJlbWlvLWVuaGFuY2VkLXBpcC1idXR0b25cIikpIHJldHVybjtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBzZXR1cEltcG9ydEJ1dHRvbihidXR0b25JZDogc3RyaW5nLCB0eXBlOiBcInRoZW1lXCIgfCBcInBsdWdpblwiKTogdm9pZCB7XG4gICAgYmluZEJ1dHRvbkNsaWNrKGJ1dHRvbklkLCAoKSA9PiBpbXBvcnRNb2RGaWxlKHR5cGUpLCBgJHt0eXBlfSBpbXBvcnQgYnV0dG9uYCk7XG59XG5cbmZ1bmN0aW9uIHNldHVwTWFuYWdlZEZvbGRlckJ1dHRvbihidXR0b25JZDogc3RyaW5nLCBmb2xkZXJQYXRoOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBiaW5kQnV0dG9uQ2xpY2soYnV0dG9uSWQsICgpID0+IFBsYXRmb3JtTWFuYWdlci5jdXJyZW50Lm9wZW5QYXRoKGZvbGRlclBhdGgpLCBgZm9sZGVyIGJ1dHRvbiAke2J1dHRvbklkfWApO1xufVxuXG5sZXQgaXNJbXBvcnRpbmcgPSBmYWxzZTtcbmZ1bmN0aW9uIHNhbml0aXplSW1wb3J0ZWRNb2RGaWxlTmFtZShmaWxlTmFtZTogc3RyaW5nLCB0eXBlOiBcInRoZW1lXCIgfCBcInBsdWdpblwiKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgY29uc3Qgbm9ybWFsaXplZCA9IGZpbGVOYW1lLnRyaW0oKS5zcGxpdCgvW1xcXFwvXS8pLnBvcCgpIHx8IFwiXCI7XG4gICAgcmV0dXJuIGlzU2FmZU1vZEZpbGVOYW1lKG5vcm1hbGl6ZWQsIHR5cGUpID8gbm9ybWFsaXplZCA6IG51bGw7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGltcG9ydE1vZEZpbGUodHlwZTogXCJ0aGVtZVwiIHwgXCJwbHVnaW5cIik6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmIChpc0ltcG9ydGluZykgcmV0dXJuO1xuICAgIGlzSW1wb3J0aW5nID0gdHJ1ZTtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBGaWxlUGlja2VyLnBpY2tGaWxlcyh7IGxpbWl0OiAxIH0pO1xuICAgICAgICBjb25zdCBmaWxlID0gcmVzdWx0LmZpbGVzWzBdO1xuICAgICAgICBjb25zdCBmaWxlUGF0aCA9IChmaWxlIGFzIHsgcGF0aD86IHN0cmluZzsgdXJpPzogc3RyaW5nIH0gfCB1bmRlZmluZWQpPy5wYXRoXG4gICAgICAgICAgICA/PyAoZmlsZSBhcyB7IHBhdGg/OiBzdHJpbmc7IHVyaT86IHN0cmluZyB9IHwgdW5kZWZpbmVkKT8udXJpO1xuXG4gICAgICAgIGlmICghZmlsZT8ubmFtZSB8fCAhZmlsZVBhdGgpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNhZmVGaWxlTmFtZSA9IHNhbml0aXplSW1wb3J0ZWRNb2RGaWxlTmFtZShmaWxlLm5hbWUsIHR5cGUpO1xuICAgICAgICBjb25zdCBleHBlY3RlZEV4dGVuc2lvbiA9IHR5cGUgPT09IFwidGhlbWVcIiA/IEZJTEVfRVhURU5TSU9OUy5USEVNRSA6IEZJTEVfRVhURU5TSU9OUy5QTFVHSU47XG4gICAgICAgIGlmICghc2FmZUZpbGVOYW1lKSB7XG4gICAgICAgICAgICBhd2FpdCBIZWxwZXJzLnNob3dBbGVydChcbiAgICAgICAgICAgICAgICBcIndhcm5pbmdcIixcbiAgICAgICAgICAgICAgICBcIlVuc3VwcG9ydGVkIEZpbGVcIixcbiAgICAgICAgICAgICAgICBgUGxlYXNlIGNob29zZSBhIHZhbGlkICR7ZXhwZWN0ZWRFeHRlbnNpb259IGZpbGUgbmFtZS5gLFxuICAgICAgICAgICAgICAgIFtcIk9LXCJdXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY29udGVudCA9IGF3YWl0IFBsYXRmb3JtTWFuYWdlci5jdXJyZW50LnJlYWRGaWxlKGZpbGVQYXRoKTtcbiAgICAgICAgY29uc3QgZGVzdGluYXRpb25EaXJlY3RvcnkgPSB0eXBlID09PSBcInRoZW1lXCIgPyBwcm9wZXJ0aWVzLnRoZW1lc1BhdGggOiBwcm9wZXJ0aWVzLnBsdWdpbnNQYXRoO1xuICAgICAgICBhd2FpdCBQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC53cml0ZUZpbGUoam9pbihkZXN0aW5hdGlvbkRpcmVjdG9yeSwgc2FmZUZpbGVOYW1lKSwgY29udGVudCk7XG5cbiAgICAgICAgLy8gVXNlIGEgdGltZW91dCB0byBhdm9pZCBsb2NhdGlvbi5yZWxvYWQoKSB0cmlnZ2VyaW5nIGxvb3AgaXNzdWVzIHdpdGggQ2FwYWNpdG9yIEFjdGl2aXR5IFJlc3VsdHNcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiBsb2NhdGlvbi5yZWxvYWQoKSwgMTAwKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IGVyciBpbnN0YW5jZW9mIEVycm9yID8gZXJyLm1lc3NhZ2UgOiBTdHJpbmcoZXJyKTtcbiAgICAgICAgaWYgKC9jYW5jZWx8Y2FuY2VsZWR8Y2FuY2VsbGVkfG5vIGZpbGVzIHNlbGVjdGVkL2kudGVzdChtZXNzYWdlKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbG9nZ2VyLmVycm9yKGBGYWlsZWQgdG8gaW1wb3J0ICR7dHlwZX06ICR7bWVzc2FnZX1gKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgICAvLyBzbGlnaHQgZGVsYXkgYmVmb3JlIHVubG9ja2luZyB0byBhdm9pZCBkb3VibGUgY2xpY2sgZXZlbnRzIGFmdGVyIGZvY3VzIHJldHVybnNcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7IGlzSW1wb3J0aW5nID0gZmFsc2U7IH0sIDUwMCk7XG4gICAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBzeW5jUGxheWVyRmVhdHVyZXMoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKCFQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC5pc1BpY3R1cmVJblBpY3R1cmVTdXBwb3J0ZWQoKSkge1xuICAgICAgICByZW1vdmVQaWN0dXJlSW5QaWN0dXJlQnV0dG9uKCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIWxvY2F0aW9uLmhyZWYuaW5jbHVkZXMoUExBWUVSX1JPVVRFKSkge1xuICAgICAgICByZW1vdmVQaWN0dXJlSW5QaWN0dXJlQnV0dG9uKCk7XG4gICAgICAgIGF3YWl0IFBsYXRmb3JtTWFuYWdlci5jdXJyZW50LnNldFBpY3R1cmVJblBpY3R1cmVTdGF0ZShmYWxzZSk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB2aWRlbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJ2aWRlb1wiKSBhcyBIVE1MVmlkZW9FbGVtZW50IHwgbnVsbDtcbiAgICBpZiAoIXZpZGVvKSB7XG4gICAgICAgIHJlbW92ZVBpY3R1cmVJblBpY3R1cmVCdXR0b24oKTtcbiAgICAgICAgYXdhaXQgUGxhdGZvcm1NYW5hZ2VyLmN1cnJlbnQuc2V0UGljdHVyZUluUGljdHVyZVN0YXRlKGZhbHNlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGJpbmRQbGF5ZXJQaWN0dXJlSW5QaWN0dXJlKHZpZGVvKTtcbiAgICBpbmplY3RQaWN0dXJlSW5QaWN0dXJlQnV0dG9uKCk7XG4gICAgYXdhaXQgdXBkYXRlUGljdHVyZUluUGljdHVyZVN0YXRlKHZpZGVvKTtcbn1cblxuZnVuY3Rpb24gYmluZFBsYXllclBpY3R1cmVJblBpY3R1cmUodmlkZW86IEhUTUxWaWRlb0VsZW1lbnQpOiB2b2lkIHtcbiAgICBpZiAodmlkZW8uZGF0YXNldC5zdHJlbWlvRW5oYW5jZWRQaXBCb3VuZCA9PT0gXCJ0cnVlXCIpIHJldHVybjtcbiAgICB2aWRlby5kYXRhc2V0LnN0cmVtaW9FbmhhbmNlZFBpcEJvdW5kID0gXCJ0cnVlXCI7XG5cbiAgICBjb25zdCBzeW5jU3RhdGUgPSAoKSA9PiB7XG4gICAgICAgIHZvaWQgdXBkYXRlUGljdHVyZUluUGljdHVyZVN0YXRlKHZpZGVvKTtcbiAgICB9O1xuXG4gICAgW1wibG9hZGVkbWV0YWRhdGFcIiwgXCJwbGF5XCIsIFwicGF1c2VcIiwgXCJlbmRlZFwiLCBcImVtcHRpZWRcIiwgXCJyZXNpemVcIl0uZm9yRWFjaCgoZXZlbnROYW1lKSA9PiB7XG4gICAgICAgIHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBzeW5jU3RhdGUpO1xuICAgIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiB1cGRhdGVQaWN0dXJlSW5QaWN0dXJlU3RhdGUodmlkZW8/OiBIVE1MVmlkZW9FbGVtZW50KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKCFQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC5pc1BpY3R1cmVJblBpY3R1cmVTdXBwb3J0ZWQoKSkgcmV0dXJuO1xuXG4gICAgY29uc3QgY3VycmVudFZpZGVvID0gdmlkZW8gPz8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcInZpZGVvXCIpIGFzIEhUTUxWaWRlb0VsZW1lbnQgfCBudWxsO1xuICAgIGlmICghY3VycmVudFZpZGVvIHx8ICFsb2NhdGlvbi5ocmVmLmluY2x1ZGVzKFBMQVlFUl9ST1VURSkpIHtcbiAgICAgICAgYXdhaXQgUGxhdGZvcm1NYW5hZ2VyLmN1cnJlbnQuc2V0UGljdHVyZUluUGljdHVyZVN0YXRlKGZhbHNlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHdpZHRoID0gY3VycmVudFZpZGVvLnZpZGVvV2lkdGggfHwgMTY7XG4gICAgY29uc3QgaGVpZ2h0ID0gY3VycmVudFZpZGVvLnZpZGVvSGVpZ2h0IHx8IDk7XG4gICAgY29uc3QgaXNBY3RpdmVQbGF5YmFjayA9IGN1cnJlbnRWaWRlby5yZWFkeVN0YXRlID4gMCAmJiAhY3VycmVudFZpZGVvLnBhdXNlZCAmJiAhY3VycmVudFZpZGVvLmVuZGVkO1xuXG4gICAgYXdhaXQgUGxhdGZvcm1NYW5hZ2VyLmN1cnJlbnQuc2V0UGljdHVyZUluUGljdHVyZVN0YXRlKGlzQWN0aXZlUGxheWJhY2ssIHdpZHRoLCBoZWlnaHQpO1xufVxuXG5mdW5jdGlvbiBpbmplY3RQaWN0dXJlSW5QaWN0dXJlQnV0dG9uKCk6IHZvaWQge1xuICAgIGNvbnN0IGV4aXN0aW5nQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdHJlbWlvLWVuaGFuY2VkLXBpcC1idG5cIik7XG4gICAgaWYgKGV4aXN0aW5nQnV0dG9uKSByZXR1cm47XG5cbiAgICBjb25zdCBidXR0b25zQ29udGFpbmVyID0gZ2V0UGljdHVyZUluUGljdHVyZUJ1dHRvbkNvbnRhaW5lcigpO1xuICAgIGlmICghYnV0dG9uc0NvbnRhaW5lcikgcmV0dXJuO1xuXG4gICAgY29uc3QgdGVtcGxhdGVCdXR0b24gPSBidXR0b25zQ29udGFpbmVyLmZpcnN0RWxlbWVudENoaWxkIGFzIEhUTUxFbGVtZW50IHwgbnVsbDtcbiAgICBjb25zdCB0ZW1wbGF0ZUljb24gPSB0ZW1wbGF0ZUJ1dHRvbj8ucXVlcnlTZWxlY3RvcihcInN2Z1wiKTtcblxuICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgYnV0dG9uLmlkID0gXCJzdHJlbWlvLWVuaGFuY2VkLXBpcC1idG5cIjtcbiAgICBidXR0b24udHlwZSA9IFwiYnV0dG9uXCI7XG4gICAgYnV0dG9uLnRpdGxlID0gXCJQaWN0dXJlIGluIFBpY3R1cmVcIjtcbiAgICBidXR0b24uc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBcIlBpY3R1cmUgaW4gUGljdHVyZVwiKTtcbiAgICBidXR0b24uY2xhc3NOYW1lID0gYCR7dGVtcGxhdGVCdXR0b24/LmNsYXNzTmFtZSA/PyBcIlwifSBzdHJlbWlvLWVuaGFuY2VkLXBpcC1idXR0b25gLnRyaW0oKTtcbiAgICBidXR0b24uaW5uZXJIVE1MID0gYFxuICAgICAgICA8c3ZnIGNsYXNzPVwiJHt0ZW1wbGF0ZUljb24/LmdldEF0dHJpYnV0ZShcImNsYXNzXCIpID8/IFwiXCJ9XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiPlxuICAgICAgICAgICAgPHBhdGggZD1cIk0xOSA3SDV2MTBoMTRWN1ptMC0yYzEuMTEgMCAyIC44OSAyIDJ2MTBjMCAxLjExLS44OSAyLTIgMkg1Yy0xLjExIDAtMi0uODktMi0yVjdjMC0xLjExLjg5LTIgMi0yaDE0Wm0tMSA3aC02djRoNnYtNFpcIiBzdHlsZT1cImZpbGw6IGN1cnJlbnRDb2xvcjtcIj48L3BhdGg+XG4gICAgICAgIDwvc3ZnPlxuICAgIGA7XG4gICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRWaWRlbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJ2aWRlb1wiKSBhcyBIVE1MVmlkZW9FbGVtZW50IHwgbnVsbDtcbiAgICAgICAgY29uc3Qgc3VjY2VzcyA9IGF3YWl0IFBsYXRmb3JtTWFuYWdlci5jdXJyZW50LmVudGVyUGljdHVyZUluUGljdHVyZShcbiAgICAgICAgICAgIGN1cnJlbnRWaWRlbz8udmlkZW9XaWR0aCB8fCAxNixcbiAgICAgICAgICAgIGN1cnJlbnRWaWRlbz8udmlkZW9IZWlnaHQgfHwgOVxuICAgICAgICApO1xuXG4gICAgICAgIGlmICghc3VjY2Vzcykge1xuICAgICAgICAgICAgSGVscGVycy5jcmVhdGVUb2FzdChcbiAgICAgICAgICAgICAgICBcInBpcC11bmF2YWlsYWJsZVwiLFxuICAgICAgICAgICAgICAgIFwiUGljdHVyZSBpbiBQaWN0dXJlXCIsXG4gICAgICAgICAgICAgICAgXCJQaWN0dXJlIGluIFBpY3R1cmUgaXMgbm90IGF2YWlsYWJsZSBvbiB0aGlzIGRldmljZS5cIixcbiAgICAgICAgICAgICAgICBcImZhaWxcIlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgYnV0dG9uc0NvbnRhaW5lci5pbnNlcnRCZWZvcmUoYnV0dG9uLCBidXR0b25zQ29udGFpbmVyLmZpcnN0Q2hpbGQpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVQaWN0dXJlSW5QaWN0dXJlQnV0dG9uKCk6IHZvaWQge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RyZW1pby1lbmhhbmNlZC1waXAtYnRuXCIpPy5yZW1vdmUoKTtcbn1cblxuZnVuY3Rpb24gZ2V0UGljdHVyZUluUGljdHVyZUJ1dHRvbkNvbnRhaW5lcigpOiBIVE1MRWxlbWVudCB8IG51bGwge1xuICAgIGNvbnN0IGFsbENvbnRhaW5lcnMgPSBBcnJheS5mcm9tKFxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsPEhUTUxFbGVtZW50PignW2NsYXNzKj1cImhvcml6b250YWwtbmF2LWJhci1jb250YWluZXItXCJdIFtjbGFzcyo9XCJidXR0b25zLWNvbnRhaW5lci1cIl0nKVxuICAgICk7XG5cbiAgICByZXR1cm4gYWxsQ29udGFpbmVycy5hdCgtMSkgPz8gbnVsbDtcbn1cblxuZnVuY3Rpb24gd3JpdGVBYm91dCgpOiB2b2lkIHtcbiAgICBIZWxwZXJzLndhaXRGb3JFbG0oU0VMRUNUT1JTLkFCT1VUX0NBVEVHT1JZKS50aGVuKGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgYWJvdXRDYXRlZ29yeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoU0VMRUNUT1JTLkFCT1VUX0NBVEVHT1JZKTtcbiAgICAgICAgaWYgKGFib3V0Q2F0ZWdvcnkgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICAgICAgaWYgKCFkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0cmVtaW8tZW5oYW5jZWQtYWJvdXQtY29udGVudFwiKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGFib3V0Q29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICAgICAgYWJvdXRDb250ZW50LmlkID0gXCJzdHJlbWlvLWVuaGFuY2VkLWFib3V0LWNvbnRlbnRcIjtcbiAgICAgICAgICAgICAgICBhYm91dENvbnRlbnQuaW5uZXJIVE1MID0gZ2V0QWJvdXRDYXRlZ29yeVRlbXBsYXRlKFxuICAgICAgICAgICAgICAgICAgICBcIkFuZHJvaWQtdjEuMC4wXCIsXG4gICAgICAgICAgICAgICAgICAgIGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgZmFsc2VcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGFib3V0Q2F0ZWdvcnkuYXBwZW5kQ2hpbGQoYWJvdXRDb250ZW50KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgU2V0dGluZ3MuYWRkQnV0dG9uKFwiT3BlbiBMb2dzXCIsIFwib3BlbkxvZ3NCdG5cIiwgU0VMRUNUT1JTLkFCT1VUX0NBVEVHT1JZKTtcbiAgICAgICAgICAgIFNldHRpbmdzLmFkZEJ1dHRvbihcIkV4cG9ydCBMb2dzXCIsIFwiZXhwb3J0TG9nc0J0blwiLCBTRUxFQ1RPUlMuQUJPVVRfQ0FURUdPUlkpO1xuICAgICAgICAgICAgU2V0dGluZ3MuYWRkQnV0dG9uKFwiUmVsb2FkIFN0cmVhbWluZyBTZXJ2ZXJcIiwgXCJyZWxvYWRTdHJlYW1pbmdTZXJ2ZXJCdG5cIiwgU0VMRUNUT1JTLkFCT1VUX0NBVEVHT1JZKTtcbiAgICAgICAgICAgIFNldHRpbmdzLmFkZEJ1dHRvbihcIk9wZW4gQXBwIEZpbGVzXCIsIFwib3BlbkVuaGFuY2VkRm9sZGVyQnRuXCIsIFNFTEVDVE9SUy5BQk9VVF9DQVRFR09SWSk7XG5cbiAgICAgICAgICAgIGJpbmRCdXR0b25DbGljayhcIm9wZW5Mb2dzQnRuXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICBMb2dNYW5hZ2VyLnNob3dMb2dzKCk7XG4gICAgICAgICAgICB9LCBcIm9wZW4gbG9ncyBidXR0b25cIik7XG5cbiAgICAgICAgICAgIGJpbmRCdXR0b25DbGljayhcImV4cG9ydExvZ3NCdG5cIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGV4cG9ydGVkUGF0aCA9IGF3YWl0IExvZ01hbmFnZXIuZXhwb3J0TG9ncygpO1xuICAgICAgICAgICAgICAgIGlmIChleHBvcnRlZFBhdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgUGxhdGZvcm1NYW5hZ2VyLmN1cnJlbnQub3BlblBhdGgoam9pbihwcm9wZXJ0aWVzLmVuaGFuY2VkUGF0aCwgXCJsb2dzXCIpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBcImV4cG9ydCBsb2dzIGJ1dHRvblwiKTtcblxuICAgICAgICAgICAgYmluZEJ1dHRvbkNsaWNrKFwicmVsb2FkU3RyZWFtaW5nU2VydmVyQnRuXCIsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICBhd2FpdCBlbnN1cmVCdW5kbGVkU3RyZWFtaW5nU2VydmVyUmVhZHkoKTtcbiAgICAgICAgICAgICAgICBzY2hlZHVsZVN0cmVhbWluZ1NlcnZlclJlbG9hZCgpO1xuICAgICAgICAgICAgfSwgXCJyZWxvYWQgc3RyZWFtaW5nIHNlcnZlciBidXR0b25cIik7XG5cbiAgICAgICAgICAgIGJpbmRCdXR0b25DbGljayhcIm9wZW5FbmhhbmNlZEZvbGRlckJ0blwiLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgYXdhaXQgUGxhdGZvcm1NYW5hZ2VyLmN1cnJlbnQub3BlblBhdGgocHJvcGVydGllcy5lbmhhbmNlZFBhdGgpO1xuICAgICAgICAgICAgfSwgXCJvcGVuIGVuaGFuY2VkIGZvbGRlciBidXR0b25cIik7XG4gICAgICAgIH1cbiAgICB9KS5jYXRjaChlcnIgPT4gbG9nZ2VyLmVycm9yKFwiRmFpbGVkIHRvIHdyaXRlIGFib3V0IHNlY3Rpb246IFwiICsgZXJyKSk7XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBQbHVnaW5MaXN0ZW5lckhhbmRsZSB9IGZyb20gJ0BjYXBhY2l0b3IvY29yZSc7XG5pbXBvcnQgeyBDYXBhY2l0b3IgfSBmcm9tICdAY2FwYWNpdG9yL2NvcmUnO1xuXG5pbXBvcnQgdHlwZSB7IENoYW5uZWxQYXlsb2FkRGF0YSwgQ2hhbm5lbENhbGxiYWNrRGF0YSwgQ2hhbm5lbExpc3RlbmVyQ2FsbGJhY2ssIFN0YXJ0T3B0aW9ucyB9IGZyb20gJy4vZGVmaW5pdGlvbnMnO1xuaW1wb3J0IHsgQ2FwYWNpdG9yTm9kZUpTIH0gZnJvbSAnLi9pbXBsZW1lbnRhdGlvbic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTm9kZUpTSW50ZXJmYWNlIHtcbiAgLyoqXG4gICAqIFN0YXJ0cyB0aGUgTm9kZS5qcyBlbmdpbmUgd2l0aCBwcm9wZXJ0aWVzIGFzIHNldCBieSB0aGUgYG9wdGlvbnNgLlxuICAgKlxuICAgKiAqKk5vdGU6KiogVGhpcyBtZXRob2QgaXMgb25seSBhdmFpbGFibGUgaWYgdGhlIE5vZGUuanMgZW5naW5lIHN0YXJ0dXAgbW9kZSB3YXMgc2V0IHRvIGAnbWFudWFsJ2AgdmlhIHRoZSBwbHVnaW4gY29uZmlndXJhdGlvbi5cbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICBzdGFydChvcHRpb25zPzogU3RhcnRPcHRpb25zKTogUHJvbWlzZTx2b2lkPjtcblxuICAvKipcbiAgICogU2VuZHMgYSBtZXNzYWdlIHRvIHRoZSBOb2RlLmpzIHByb2Nlc3MuXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgc2VuZChhcmdzOiBDaGFubmVsUGF5bG9hZERhdGEpOiBQcm9taXNlPHZvaWQ+O1xuXG4gIC8qKlxuICAgKiBSZXNvbHZlcyB3aGVuIHRoZSBOb2RlLmpzIHByb2Nlc3MgaXMgaW5pdGlhbGl6ZWQuXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgd2hlblJlYWR5KCk6IFByb21pc2U8dm9pZD47XG5cbiAgLyoqXG4gICAqIExpc3RlbnMgdG8gYGV2ZW50TmFtZWAgYW5kIGNhbGxzIGBsaXN0ZW5lckZ1bmMoZGF0YSlgIHdoZW4gYSBuZXcgbWVzc2FnZSBhcnJpdmVzIGZyb20gdGhlIE5vZGUuanMgcHJvY2Vzcy5cbiAgICpcbiAgICogKipOb3RlOioqIFdoZW4gdXNpbmcgdGhlIEVsZWN0cm9uIHBsYXRmb3JtLCBbYFBsdWdpbkxpc3RlbmVySGFuZGxlLnJlbW92ZSgpYF0oI3BsdWdpbmxpc3RlbmVyaGFuZGxlKSBkb2VzIG5vdCB3b3JrIGR1ZSB0byBsaW1pdGF0aW9ucy5cbiAgICogVXNlIFtgcmVtb3ZlTGlzdGVuZXIobGlzdGVuZXJGdW5jKWBdKCNyZW1vdmVsaXN0ZW5lcikgaW5zdGVhZC5cbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICBhZGRMaXN0ZW5lcihcbiAgICBldmVudE5hbWU6IHN0cmluZyxcbiAgICBsaXN0ZW5lckZ1bmM6IENoYW5uZWxMaXN0ZW5lckNhbGxiYWNrLFxuICApOiBQcm9taXNlPFBsdWdpbkxpc3RlbmVySGFuZGxlPjtcblxuICAvKipcbiAgICogUmVtb3ZlcyB0aGUgc3BlY2lmaWVkIGBsaXN0ZW5lckhhbmRsZWAgZnJvbSB0aGUgbGlzdGVuZXIgYXJyYXkgZm9yIHRoZSBldmVudCBpdCByZWZlcnMgdG8uXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgcmVtb3ZlTGlzdGVuZXIobGlzdGVuZXJIYW5kbGU6IFBsdWdpbkxpc3RlbmVySGFuZGxlKTogUHJvbWlzZTx2b2lkPjtcblxuICAvKipcbiAgICogUmVtb3ZlcyBhbGwgbGlzdGVuZXJzLCBvciB0aG9zZSBvZiB0aGUgc3BlY2lmaWVkIGBldmVudE5hbWVgLCBmb3IgdGhpcyBwbHVnaW4uXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgcmVtb3ZlQWxsTGlzdGVuZXJzKGV2ZW50TmFtZT86IHN0cmluZyk6IFByb21pc2U8dm9pZD47XG59XG5cbmNsYXNzIE5vZGVKU1BsdWdpbiBpbXBsZW1lbnRzIE5vZGVKU0ludGVyZmFjZSB7XG4gIHByaXZhdGUgcmVhZG9ubHkgbGlzdGVuZXJMaXN0OiB7XG4gICAgZXZlbnROYW1lOiBzdHJpbmc7XG4gICAgbGlzdGVuZXJIYW5kbGU6IFByb21pc2U8UGx1Z2luTGlzdGVuZXJIYW5kbGU+O1xuICB9W10gPSBbXTtcblxuICBzdGFydChhcmdzPzogU3RhcnRPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIENhcGFjaXRvck5vZGVKUy5zdGFydChhcmdzKTtcbiAgfVxuXG4gIHNlbmQoYXJnczogQ2hhbm5lbFBheWxvYWREYXRhKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIENhcGFjaXRvck5vZGVKUy5zZW5kKGFyZ3MpO1xuICB9XG5cbiAgd2hlblJlYWR5KCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiBDYXBhY2l0b3JOb2RlSlMud2hlblJlYWR5KCk7XG4gIH1cblxuICBhZGRMaXN0ZW5lcihcbiAgICBldmVudE5hbWU6IHN0cmluZyxcbiAgICBsaXN0ZW5lckZ1bmM6IENoYW5uZWxMaXN0ZW5lckNhbGxiYWNrLFxuICApOiBQcm9taXNlPFBsdWdpbkxpc3RlbmVySGFuZGxlPjtcblxuICBhZGRMaXN0ZW5lcihcbiAgICBldmVudE5hbWU6IGFueSxcbiAgICBsaXN0ZW5lckZ1bmM6IENoYW5uZWxMaXN0ZW5lckNhbGxiYWNrLFxuICApOiBQcm9taXNlPFBsdWdpbkxpc3RlbmVySGFuZGxlPiB7XG4gICAgY29uc3QgbGlzdGVuZXJIYW5kbGUgPSBDYXBhY2l0b3JOb2RlSlMuYWRkTGlzdGVuZXIoZXZlbnROYW1lLCAoZGF0YTogQ2hhbm5lbENhbGxiYWNrRGF0YSkgPT4ge1xuICAgICAgbGlzdGVuZXJGdW5jKGRhdGEpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5saXN0ZW5lckxpc3QucHVzaCh7IGV2ZW50TmFtZSwgbGlzdGVuZXJIYW5kbGUgfSk7XG4gICAgcmV0dXJuIGxpc3RlbmVySGFuZGxlO1xuICB9XG5cbiAgYXN5bmMgcmVtb3ZlTGlzdGVuZXIobGlzdGVuZXJIYW5kbGU6IFBsdWdpbkxpc3RlbmVySGFuZGxlKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKENhcGFjaXRvci5nZXRQbGF0Zm9ybSgpID09PSAnZWxlY3Ryb24nKSB7XG4gICAgICBhd2FpdCAoQ2FwYWNpdG9yTm9kZUpTIGFzIGFueSkucmVtb3ZlTGlzdGVuZXIobGlzdGVuZXJIYW5kbGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhd2FpdCBsaXN0ZW5lckhhbmRsZS5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5saXN0ZW5lckxpc3QubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICBjb25zdCBsaXN0ZW5lciA9IHRoaXMubGlzdGVuZXJMaXN0W2luZGV4XTtcblxuICAgICAgaWYgKGxpc3RlbmVySGFuZGxlID09PSAoYXdhaXQgbGlzdGVuZXIubGlzdGVuZXJIYW5kbGUpKSB7XG4gICAgICAgIHRoaXMubGlzdGVuZXJMaXN0LnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHJlbW92ZUFsbExpc3RlbmVycyhldmVudE5hbWU/OiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBmb3IgKGNvbnN0IGxpc3RlbmVyIG9mIFsuLi50aGlzLmxpc3RlbmVyTGlzdF0pIHtcbiAgICAgIGlmICghZXZlbnROYW1lIHx8IGV2ZW50TmFtZSA9PT0gbGlzdGVuZXIuZXZlbnROYW1lKSB7XG4gICAgICAgIGNvbnN0IGxpc3RlbmVySGFuZGxlID0gYXdhaXQgbGlzdGVuZXIubGlzdGVuZXJIYW5kbGU7XG4gICAgICAgIGF3YWl0IHRoaXMucmVtb3ZlTGlzdGVuZXIobGlzdGVuZXJIYW5kbGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5jb25zdCBOb2RlSlMgPSBuZXcgTm9kZUpTUGx1Z2luKCk7XG5cbmV4cG9ydCB7IE5vZGVKUyB9O1xuIiwgImltcG9ydCB0eXBlIHsgUGx1Z2luTGlzdGVuZXJIYW5kbGUgfSBmcm9tICdAY2FwYWNpdG9yL2NvcmUnO1xuaW1wb3J0IHsgcmVnaXN0ZXJQbHVnaW4gfSBmcm9tICdAY2FwYWNpdG9yL2NvcmUnO1xuXG5pbXBvcnQgdHlwZSB7IENoYW5uZWxQYXlsb2FkRGF0YSwgQ2hhbm5lbExpc3RlbmVyQ2FsbGJhY2ssIFN0YXJ0T3B0aW9ucyB9IGZyb20gJy4vZGVmaW5pdGlvbnMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIENhcGFjaXRvck5vZGVKU1BsdWdpbiB7XG4gIHN0YXJ0KGFyZ3M/OiBTdGFydE9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+O1xuICBzZW5kKGFyZ3M6IENoYW5uZWxQYXlsb2FkRGF0YSk6IFByb21pc2U8dm9pZD47XG4gIHdoZW5SZWFkeSgpOiBQcm9taXNlPHZvaWQ+O1xuXG4gIGFkZExpc3RlbmVyKFxuICAgIGV2ZW50TmFtZTogc3RyaW5nLFxuICAgIGxpc3RlbmVyRnVuYzogQ2hhbm5lbExpc3RlbmVyQ2FsbGJhY2ssXG4gICk6IFByb21pc2U8UGx1Z2luTGlzdGVuZXJIYW5kbGU+O1xufVxuXG5jb25zdCBDYXBhY2l0b3JOb2RlSlMgPSByZWdpc3RlclBsdWdpbjxDYXBhY2l0b3JOb2RlSlNQbHVnaW4+KCdDYXBhY2l0b3JOb2RlSlMnLCB7XG4gIHdlYjogKCkgPT4gaW1wb3J0KCcuL3dlYicpLnRoZW4oKG0pID0+IG5ldyBtLkNhcGFjaXRvck5vZGVKU1dlYigpKSxcbiAgZWxlY3Ryb246ICgpID0+ICh3aW5kb3cgYXMgYW55KS5DYXBhY2l0b3JDdXN0b21QbGF0Zm9ybS5wbHVnaW5zLkNhcGFjaXRvck5vZGVKUyxcbn0pO1xuXG5leHBvcnQgeyBDYXBhY2l0b3JOb2RlSlMgfTtcbiIsICJpbXBvcnQgeyBqb2luIH0gZnJvbSBcInBhdGhcIjtcbmltcG9ydCB7IFBsYXRmb3JtTWFuYWdlciB9IGZyb20gXCIuLi9wbGF0Zm9ybS9QbGF0Zm9ybU1hbmFnZXJcIjtcbmltcG9ydCBwcm9wZXJ0aWVzIGZyb20gXCIuL1Byb3BlcnRpZXNcIjtcblxuZXhwb3J0IHR5cGUgTG9nTGV2ZWwgPSAnSU5GTycgfCAnV0FSTicgfCAnRVJST1InIHwgJ0RFQlVHJztcblxuaW50ZXJmYWNlIExvZ0VudHJ5IHtcbiAgICB0aW1lc3RhbXA6IHN0cmluZztcbiAgICBsZXZlbDogTG9nTGV2ZWw7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xufVxuXG5jbGFzcyBMb2dNYW5hZ2VyIHtcbiAgICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogTG9nTWFuYWdlcjtcbiAgICBwcml2YXRlIGxvZ3M6IExvZ0VudHJ5W10gPSBbXTtcbiAgICBwcml2YXRlIG1heExvZ3MgPSAxMDAwO1xuICAgIHByaXZhdGUgb3JpZ2luYWxDb25zb2xlOiBhbnkgPSB7fTtcbiAgICBwcml2YXRlIGlzSG9va2VkID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge31cblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogTG9nTWFuYWdlciB7XG4gICAgICAgIGlmICghTG9nTWFuYWdlci5pbnN0YW5jZSkge1xuICAgICAgICAgICAgTG9nTWFuYWdlci5pbnN0YW5jZSA9IG5ldyBMb2dNYW5hZ2VyKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIExvZ01hbmFnZXIuaW5zdGFuY2U7XG4gICAgfVxuXG4gICAgcHVibGljIGhvb2tDb25zb2xlKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5pc0hvb2tlZCkgcmV0dXJuO1xuICAgICAgICB0aGlzLmlzSG9va2VkID0gdHJ1ZTtcblxuICAgICAgICBjb25zdCBtZXRob2RzOiBMb2dMZXZlbFtdID0gWydJTkZPJywgJ1dBUk4nLCAnRVJST1InLCAnREVCVUcnXTtcblxuICAgICAgICBtZXRob2RzLmZvckVhY2gobGV2ZWwgPT4ge1xuICAgICAgICAgICAgY29uc3QgY29uc29sZU1ldGhvZCA9IGxldmVsLnRvTG93ZXJDYXNlKCkgYXMga2V5b2YgQ29uc29sZTtcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgICAgICB0aGlzLm9yaWdpbmFsQ29uc29sZVtjb25zb2xlTWV0aG9kXSA9IChjb25zb2xlIGFzIGFueSlbY29uc29sZU1ldGhvZF0uYmluZChjb25zb2xlKTtcblxuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgICAgIChjb25zb2xlIGFzIGFueSlbY29uc29sZU1ldGhvZF0gPSAoLi4uYXJnczogYW55W10pID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZExvZyhsZXZlbCwgYXJncy5tYXAoYXJnID0+XG4gICAgICAgICAgICAgICAgICAgIHR5cGVvZiBhcmcgPT09ICdvYmplY3QnID8gSlNPTi5zdHJpbmdpZnkoYXJnKSA6IFN0cmluZyhhcmcpXG4gICAgICAgICAgICAgICAgKS5qb2luKCcgJykpO1xuXG4gICAgICAgICAgICAgICAgLy8gQ2FsbCBvcmlnaW5hbFxuICAgICAgICAgICAgICAgIHRoaXMub3JpZ2luYWxDb25zb2xlW2NvbnNvbGVNZXRob2RdKC4uLmFyZ3MpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gSG9vayBsb2cgYXMgSU5GT1xuICAgICAgICB0aGlzLm9yaWdpbmFsQ29uc29sZVsnbG9nJ10gPSBjb25zb2xlLmxvZy5iaW5kKGNvbnNvbGUpO1xuICAgICAgICBjb25zb2xlLmxvZyA9ICguLi5hcmdzOiBhbnlbXSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5hZGRMb2coJ0lORk8nLCBhcmdzLm1hcChhcmcgPT5cbiAgICAgICAgICAgICAgICB0eXBlb2YgYXJnID09PSAnb2JqZWN0JyA/IEpTT04uc3RyaW5naWZ5KGFyZykgOiBTdHJpbmcoYXJnKVxuICAgICAgICAgICAgKS5qb2luKCcgJykpO1xuICAgICAgICAgICAgdGhpcy5vcmlnaW5hbENvbnNvbGVbJ2xvZyddKC4uLmFyZ3MpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGFkZExvZyhsZXZlbDogTG9nTGV2ZWwsIG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBjb25zdCB0aW1lc3RhbXAgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVsxXS5zbGljZSgwLCAtMSk7XG4gICAgICAgIHRoaXMubG9ncy5wdXNoKHsgdGltZXN0YW1wLCBsZXZlbCwgbWVzc2FnZSB9KTtcbiAgICAgICAgaWYgKHRoaXMubG9ncy5sZW5ndGggPiB0aGlzLm1heExvZ3MpIHtcbiAgICAgICAgICAgIHRoaXMubG9ncy5zaGlmdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIGV4cG9ydExvZ3MoKTogUHJvbWlzZTxzdHJpbmcgfCBudWxsPiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBsb2dzRGlyID0gam9pbihwcm9wZXJ0aWVzLmVuaGFuY2VkUGF0aCwgXCJsb2dzXCIpO1xuICAgICAgICAgICAgaWYgKCFhd2FpdCBQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC5leGlzdHMobG9nc0RpcikpIHtcbiAgICAgICAgICAgICAgICBhd2FpdCBQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC5ta2Rpcihsb2dzRGlyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgZmlsZU5hbWUgPSBgc3RyZW1pby1lbmhhbmNlZC0ke25ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5yZXBsYWNlKC9bOi5dL2csIFwiLVwiKX0ubG9nYDtcbiAgICAgICAgICAgIGNvbnN0IGZpbGVQYXRoID0gam9pbihsb2dzRGlyLCBmaWxlTmFtZSk7XG4gICAgICAgICAgICBhd2FpdCBQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC53cml0ZUZpbGUoZmlsZVBhdGgsIHRoaXMuc2VyaWFsaXplTG9ncygpKTtcbiAgICAgICAgICAgIHJldHVybiBmaWxlUGF0aDtcbiAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzaG93TG9ncygpOiB2b2lkIHtcbiAgICAgICAgY29uc3Qgb3ZlcmxheUlkID0gJ3N0cmVtaW8tZW5oYW5jZWQtbG9ncy1vdmVybGF5JztcbiAgICAgICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKG92ZXJsYXlJZCkpIHJldHVybjtcblxuICAgICAgICBjb25zdCBvdmVybGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIG92ZXJsYXkuaWQgPSBvdmVybGF5SWQ7XG4gICAgICAgIG92ZXJsYXkuc3R5bGUuY3NzVGV4dCA9IGBcbiAgICAgICAgICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICAgICAgICAgIHRvcDogMDtcbiAgICAgICAgICAgIGxlZnQ6IDA7XG4gICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC44KTtcbiAgICAgICAgICAgIHotaW5kZXg6IDk5OTk5O1xuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgICAgICBwYWRkaW5nOiAyMHB4O1xuICAgICAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgICAgIGNvbG9yOiAjZmZmO1xuICAgICAgICAgICAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZTtcbiAgICAgICAgYDtcblxuICAgICAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgaGVhZGVyLnN0eWxlLmNzc1RleHQgPSBgXG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAjMWExYTFhO1xuICAgICAgICAgICAgcGFkZGluZzogMTBweDtcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgICAgICAgYDtcblxuICAgICAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XG4gICAgICAgIHRpdGxlLnRleHRDb250ZW50ID0gJ0xvZ3MnO1xuICAgICAgICB0aXRsZS5zdHlsZS5tYXJnaW4gPSAnMCc7XG5cbiAgICAgICAgY29uc3QgY29udHJvbHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29udHJvbHMuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgICAgICAgY29udHJvbHMuc3R5bGUuZ2FwID0gJzEwcHgnO1xuXG4gICAgICAgIGNvbnN0IGZpbHRlclNlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlbGVjdCcpO1xuICAgICAgICBmaWx0ZXJTZWxlY3Quc3R5bGUuY3NzVGV4dCA9IGBcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICMzMzM7XG4gICAgICAgICAgICBjb2xvcjogd2hpdGU7XG4gICAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjNTU1O1xuICAgICAgICAgICAgcGFkZGluZzogNXB4O1xuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogM3B4O1xuICAgICAgICBgO1xuICAgICAgICBbJ0FMTCcsICdJTkZPJywgJ1dBUk4nLCAnRVJST1InXS5mb3JFYWNoKGxldmVsID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuICAgICAgICAgICAgb3B0aW9uLnZhbHVlID0gbGV2ZWw7XG4gICAgICAgICAgICBvcHRpb24udGV4dENvbnRlbnQgPSBsZXZlbDtcbiAgICAgICAgICAgIGZpbHRlclNlbGVjdC5hcHBlbmRDaGlsZChvcHRpb24pO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBjb3B5QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIGNvcHlCdG4udGV4dENvbnRlbnQgPSAnQ29weSBBbGwnO1xuICAgICAgICBjb3B5QnRuLnN0eWxlLmNzc1RleHQgPSBgXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAjNGE0YTRhO1xuICAgICAgICAgICAgY29sb3I6IHdoaXRlO1xuICAgICAgICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgICAgICAgcGFkZGluZzogNXB4IDEwcHg7XG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiAzcHg7XG4gICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgIGA7XG5cbiAgICAgICAgY29uc3QgZXhwb3J0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIGV4cG9ydEJ0bi50ZXh0Q29udGVudCA9ICdFeHBvcnQnO1xuICAgICAgICBleHBvcnRCdG4uc3R5bGUuY3NzVGV4dCA9IGBcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICMyNTYzZWI7XG4gICAgICAgICAgICBjb2xvcjogd2hpdGU7XG4gICAgICAgICAgICBib3JkZXI6IG5vbmU7XG4gICAgICAgICAgICBwYWRkaW5nOiA1cHggMTBweDtcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDNweDtcbiAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgYDtcblxuICAgICAgICBjb25zdCBjbG9zZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBjbG9zZUJ0bi50ZXh0Q29udGVudCA9ICdDbG9zZSc7XG4gICAgICAgIGNsb3NlQnRuLnN0eWxlLmNzc1RleHQgPSBgXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAjYzAzOTJiO1xuICAgICAgICAgICAgY29sb3I6IHdoaXRlO1xuICAgICAgICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgICAgICAgcGFkZGluZzogNXB4IDEwcHg7XG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiAzcHg7XG4gICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgIGA7XG5cbiAgICAgICAgY29udHJvbHMuYXBwZW5kQ2hpbGQoZmlsdGVyU2VsZWN0KTtcbiAgICAgICAgY29udHJvbHMuYXBwZW5kQ2hpbGQoY29weUJ0bik7XG4gICAgICAgIGNvbnRyb2xzLmFwcGVuZENoaWxkKGV4cG9ydEJ0bik7XG4gICAgICAgIGNvbnRyb2xzLmFwcGVuZENoaWxkKGNsb3NlQnRuKTtcbiAgICAgICAgaGVhZGVyLmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgICAgICAgaGVhZGVyLmFwcGVuZENoaWxkKGNvbnRyb2xzKTtcblxuICAgICAgICBjb25zdCBsb2dzQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxvZ3NDb250YWluZXIuaWQgPSAnbG9ncy1jb250YWluZXInO1xuICAgICAgICBsb2dzQ29udGFpbmVyLnN0eWxlLmNzc1RleHQgPSBgXG4gICAgICAgICAgICBmbGV4OiAxO1xuICAgICAgICAgICAgb3ZlcmZsb3cteTogYXV0bztcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICMxMTE7XG4gICAgICAgICAgICBwYWRkaW5nOiAxMHB4O1xuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogNXB4O1xuICAgICAgICAgICAgd2hpdGUtc3BhY2U6IHByZS13cmFwO1xuICAgICAgICAgICAgd29yZC1icmVhazogYnJlYWstYWxsO1xuICAgICAgICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgICAgICBgO1xuXG4gICAgICAgIG92ZXJsYXkuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcbiAgICAgICAgb3ZlcmxheS5hcHBlbmRDaGlsZChsb2dzQ29udGFpbmVyKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChvdmVybGF5KTtcblxuICAgICAgICBjb25zdCByZW5kZXJMb2dzID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmlsdGVyID0gZmlsdGVyU2VsZWN0LnZhbHVlO1xuICAgICAgICAgICAgY29uc3QgZmlsdGVyZWRMb2dzID0gZmlsdGVyID09PSAnQUxMJ1xuICAgICAgICAgICAgICAgID8gdGhpcy5sb2dzXG4gICAgICAgICAgICAgICAgOiB0aGlzLmxvZ3MuZmlsdGVyKGwgPT4gbC5sZXZlbCA9PT0gZmlsdGVyKTtcblxuICAgICAgICAgICAgbG9nc0NvbnRhaW5lci5pbm5lckhUTUwgPSBmaWx0ZXJlZExvZ3MubWFwKGwgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbG9yID0gbC5sZXZlbCA9PT0gJ0VSUk9SJyA/ICcjZmY1NTU1JyA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsLmxldmVsID09PSAnV0FSTicgPyAnI2ZmYjg2YycgOiAnIzUwZmE3Yic7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGA8ZGl2IHN0eWxlPVwibWFyZ2luLWJvdHRvbTogMnB4O1wiPjxzcGFuIHN0eWxlPVwiY29sb3I6ICM2MjcyYTRcIj5bJHtsLnRpbWVzdGFtcH1dPC9zcGFuPiA8c3BhbiBzdHlsZT1cImNvbG9yOiAke2NvbG9yfVwiPlske2wubGV2ZWx9XTwvc3Bhbj4gJHt0aGlzLmVzY2FwZUh0bWwobC5tZXNzYWdlKX08L2Rpdj5gO1xuICAgICAgICAgICAgfSkuam9pbignJyk7XG4gICAgICAgICAgICBsb2dzQ29udGFpbmVyLnNjcm9sbFRvcCA9IGxvZ3NDb250YWluZXIuc2Nyb2xsSGVpZ2h0O1xuICAgICAgICB9O1xuXG4gICAgICAgIHJlbmRlckxvZ3MoKTtcblxuICAgICAgICBmaWx0ZXJTZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgcmVuZGVyTG9ncyk7XG5cbiAgICAgICAgY29weUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRleHQgPSB0aGlzLnNlcmlhbGl6ZUxvZ3MoKTtcbiAgICAgICAgICAgIGNvbnN0IHRleHRBcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRleHRhcmVhXCIpO1xuICAgICAgICAgICAgdGV4dEFyZWEudmFsdWUgPSB0ZXh0O1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0ZXh0QXJlYSk7XG4gICAgICAgICAgICB0ZXh0QXJlYS5zZWxlY3QoKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKFwiQ29weVwiKTtcbiAgICAgICAgICAgIHRleHRBcmVhLnJlbW92ZSgpO1xuXG4gICAgICAgICAgICBjb25zdCBvcmlnaW5hbFRleHQgPSBjb3B5QnRuLnRleHRDb250ZW50O1xuICAgICAgICAgICAgY29weUJ0bi50ZXh0Q29udGVudCA9ICdDb3BpZWQhJztcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gY29weUJ0bi50ZXh0Q29udGVudCA9IG9yaWdpbmFsVGV4dCwgMjAwMCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGV4cG9ydEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG9yaWdpbmFsVGV4dCA9IGV4cG9ydEJ0bi50ZXh0Q29udGVudDtcbiAgICAgICAgICAgIGV4cG9ydEJ0bi50ZXh0Q29udGVudCA9ICdFeHBvcnRpbmcuLi4nO1xuXG4gICAgICAgICAgICBjb25zdCBleHBvcnRlZFBhdGggPSBhd2FpdCB0aGlzLmV4cG9ydExvZ3MoKTtcbiAgICAgICAgICAgIGlmIChleHBvcnRlZFBhdGgpIHtcbiAgICAgICAgICAgICAgICBleHBvcnRCdG4udGV4dENvbnRlbnQgPSAnRXhwb3J0ZWQhJztcbiAgICAgICAgICAgICAgICBhd2FpdCBQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC5vcGVuUGF0aChqb2luKHByb3BlcnRpZXMuZW5oYW5jZWRQYXRoLCBcImxvZ3NcIikpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBleHBvcnRCdG4udGV4dENvbnRlbnQgPSAnRmFpbGVkJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBleHBvcnRCdG4udGV4dENvbnRlbnQgPSBvcmlnaW5hbFRleHQsIDIwMDApO1xuICAgICAgICB9KTtcblxuICAgICAgICBjbG9zZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIG92ZXJsYXkucmVtb3ZlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2VyaWFsaXplTG9ncygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2dzLm1hcChsb2cgPT4gYFske2xvZy50aW1lc3RhbXB9XSBbJHtsb2cubGV2ZWx9XSAke2xvZy5tZXNzYWdlfWApLmpvaW4oJ1xcbicpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZXNjYXBlSHRtbCh1bnNhZmU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB1bnNhZmVcbiAgICAgICAgICAgICAucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpXG4gICAgICAgICAgICAgLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpXG4gICAgICAgICAgICAgLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpXG4gICAgICAgICAgICAgLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpXG4gICAgICAgICAgICAgLnJlcGxhY2UoLycvZywgXCImIzAzOTtcIik7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBMb2dNYW5hZ2VyLmdldEluc3RhbmNlKCk7XG4iLCAiaW1wb3J0IHsgcmVnaXN0ZXJQbHVnaW4gfSBmcm9tICdAY2FwYWNpdG9yL2NvcmUnO1xuXG5pbXBvcnQgdHlwZSB7IEZpbGVQaWNrZXJQbHVnaW4gfSBmcm9tICcuL2RlZmluaXRpb25zJztcbi8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vY2FwYXdlc29tZS10ZWFtL2NhcGFjaXRvci1wbHVnaW5zL2lzc3Vlcy8xNFxuaW1wb3J0ICogYXMgd2ViIGZyb20gJy4vd2ViJztcblxuY29uc3QgRmlsZVBpY2tlciA9IHJlZ2lzdGVyUGx1Z2luPEZpbGVQaWNrZXJQbHVnaW4+KCdGaWxlUGlja2VyJywge1xuICB3ZWI6ICgpID0+IG5ldyB3ZWIuRmlsZVBpY2tlcldlYigpLFxufSk7XG5cbmV4cG9ydCAqIGZyb20gJy4vZGVmaW5pdGlvbnMnO1xuZXhwb3J0IHsgRmlsZVBpY2tlciB9O1xuIiwgImltcG9ydCB7IFdlYlBsdWdpbiB9IGZyb20gJ0BjYXBhY2l0b3IvY29yZSc7XG5cbmltcG9ydCB0eXBlIHtcbiAgQ29udmVydEhlaWNUb0pwZWdPcHRpb25zLFxuICBDb252ZXJ0SGVpY1RvSnBlZ1Jlc3VsdCxcbiAgQ29weUZpbGVPcHRpb25zLFxuICBGaWxlUGlja2VyUGx1Z2luLFxuICBQZXJtaXNzaW9uU3RhdHVzLFxuICBQaWNrRGlyZWN0b3J5UmVzdWx0LFxuICBQaWNrRmlsZXNPcHRpb25zLFxuICBQaWNrRmlsZXNSZXN1bHQsXG4gIFBpY2tJbWFnZXNPcHRpb25zLFxuICBQaWNrSW1hZ2VzUmVzdWx0LFxuICBQaWNrTWVkaWFPcHRpb25zLFxuICBQaWNrTWVkaWFSZXN1bHQsXG4gIFBpY2tWaWRlb3NPcHRpb25zLFxuICBQaWNrVmlkZW9zUmVzdWx0LFxuICBQaWNrZWRGaWxlLFxuICBSZXF1ZXN0UGVybWlzc2lvbnNPcHRpb25zLFxufSBmcm9tICcuL2RlZmluaXRpb25zJztcblxuZXhwb3J0IGNsYXNzIEZpbGVQaWNrZXJXZWIgZXh0ZW5kcyBXZWJQbHVnaW4gaW1wbGVtZW50cyBGaWxlUGlja2VyUGx1Z2luIHtcbiAgcHVibGljIHJlYWRvbmx5IEVSUk9SX1BJQ0tfRklMRV9DQU5DRUxFRCA9ICdwaWNrRmlsZXMgY2FuY2VsZWQuJztcblxuICBwdWJsaWMgYXN5bmMgY2hlY2tQZXJtaXNzaW9ucygpOiBQcm9taXNlPFBlcm1pc3Npb25TdGF0dXM+IHtcbiAgICB0aHJvdyB0aGlzLnVuaW1wbGVtZW50ZWQoJ05vdCBpbXBsZW1lbnRlZCBvbiB3ZWIuJyk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgY29udmVydEhlaWNUb0pwZWcoXG4gICAgX29wdGlvbnM6IENvbnZlcnRIZWljVG9KcGVnT3B0aW9ucyxcbiAgKTogUHJvbWlzZTxDb252ZXJ0SGVpY1RvSnBlZ1Jlc3VsdD4ge1xuICAgIHRocm93IHRoaXMudW5pbXBsZW1lbnRlZCgnTm90IGltcGxlbWVudGVkIG9uIHdlYi4nKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBjb3B5RmlsZShfb3B0aW9uczogQ29weUZpbGVPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhyb3cgdGhpcy51bmltcGxlbWVudGVkKCdOb3QgaW1wbGVtZW50ZWQgb24gd2ViLicpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHBpY2tGaWxlcyhvcHRpb25zPzogUGlja0ZpbGVzT3B0aW9ucyk6IFByb21pc2U8UGlja0ZpbGVzUmVzdWx0PiB7XG4gICAgY29uc3QgcGlja2VkRmlsZXMgPSBhd2FpdCB0aGlzLm9wZW5GaWxlUGlja2VyKG9wdGlvbnMpO1xuICAgIGlmICghcGlja2VkRmlsZXMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcih0aGlzLkVSUk9SX1BJQ0tfRklMRV9DQU5DRUxFRCk7XG4gICAgfVxuICAgIGNvbnN0IHJlc3VsdDogUGlja0ZpbGVzUmVzdWx0ID0ge1xuICAgICAgZmlsZXM6IFtdLFxuICAgIH07XG4gICAgZm9yIChjb25zdCBwaWNrZWRGaWxlIG9mIHBpY2tlZEZpbGVzKSB7XG4gICAgICBjb25zdCBmaWxlOiBQaWNrZWRGaWxlID0ge1xuICAgICAgICBibG9iOiBwaWNrZWRGaWxlLFxuICAgICAgICBtb2RpZmllZEF0OiBwaWNrZWRGaWxlLmxhc3RNb2RpZmllZCxcbiAgICAgICAgbWltZVR5cGU6IHRoaXMuZ2V0TWltZVR5cGVGcm9tVXJsKHBpY2tlZEZpbGUpLFxuICAgICAgICBuYW1lOiB0aGlzLmdldE5hbWVGcm9tVXJsKHBpY2tlZEZpbGUpLFxuICAgICAgICBwYXRoOiB1bmRlZmluZWQsXG4gICAgICAgIHNpemU6IHRoaXMuZ2V0U2l6ZUZyb21VcmwocGlja2VkRmlsZSksXG4gICAgICB9O1xuICAgICAgaWYgKG9wdGlvbnM/LnJlYWREYXRhKSB7XG4gICAgICAgIGZpbGUuZGF0YSA9IGF3YWl0IHRoaXMuZ2V0RGF0YUZyb21GaWxlKHBpY2tlZEZpbGUpO1xuICAgICAgfVxuICAgICAgcmVzdWx0LmZpbGVzLnB1c2goZmlsZSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcGlja0RpcmVjdG9yeSgpOiBQcm9taXNlPFBpY2tEaXJlY3RvcnlSZXN1bHQ+IHtcbiAgICB0aHJvdyB0aGlzLnVuaW1wbGVtZW50ZWQoJ05vdCBpbXBsZW1lbnRlZCBvbiB3ZWIuJyk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcGlja0ltYWdlcyhcbiAgICBvcHRpb25zPzogUGlja0ltYWdlc09wdGlvbnMsXG4gICk6IFByb21pc2U8UGlja0ltYWdlc1Jlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnBpY2tGaWxlcyh7IHR5cGVzOiBbJ2ltYWdlLyonXSwgLi4ub3B0aW9ucyB9KTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBwaWNrTWVkaWEob3B0aW9ucz86IFBpY2tNZWRpYU9wdGlvbnMpOiBQcm9taXNlPFBpY2tNZWRpYVJlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnBpY2tGaWxlcyh7IHR5cGVzOiBbJ2ltYWdlLyonLCAndmlkZW8vKiddLCAuLi5vcHRpb25zIH0pO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHBpY2tWaWRlb3MoXG4gICAgb3B0aW9ucz86IFBpY2tWaWRlb3NPcHRpb25zLFxuICApOiBQcm9taXNlPFBpY2tWaWRlb3NSZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5waWNrRmlsZXMoeyB0eXBlczogWyd2aWRlby8qJ10sIC4uLm9wdGlvbnMgfSk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcmVxdWVzdFBlcm1pc3Npb25zKFxuICAgIF9vcHRpb25zPzogUmVxdWVzdFBlcm1pc3Npb25zT3B0aW9ucyxcbiAgKTogUHJvbWlzZTxQZXJtaXNzaW9uU3RhdHVzPiB7XG4gICAgdGhyb3cgdGhpcy51bmltcGxlbWVudGVkKCdOb3QgaW1wbGVtZW50ZWQgb24gd2ViLicpO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBvcGVuRmlsZVBpY2tlcihcbiAgICBvcHRpb25zPzogUGlja0ZpbGVzT3B0aW9ucyxcbiAgKTogUHJvbWlzZTxGaWxlW10gfCB1bmRlZmluZWQ+IHtcbiAgICBjb25zdCBhY2NlcHQgPSBvcHRpb25zPy50eXBlcz8uam9pbignLCcpIHx8ICcnO1xuICAgIGNvbnN0IGxpbWl0ID0gb3B0aW9ucz8ubGltaXQgPT09IHVuZGVmaW5lZCA/IDAgOiBvcHRpb25zLmxpbWl0O1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIGxldCBvbkNoYW5nZUZpcmVkID0gZmFsc2U7XG4gICAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICBpbnB1dC50eXBlID0gJ2ZpbGUnO1xuICAgICAgaW5wdXQuYWNjZXB0ID0gYWNjZXB0O1xuICAgICAgaW5wdXQubXVsdGlwbGUgPSBsaW1pdCA9PT0gMDtcblxuICAgICAgY29uc3QgaGFzQ2FuY2VsRXZlbnQgPSAnb25jYW5jZWwnIGluIGlucHV0O1xuXG4gICAgICBjb25zdCBvbkNoYW5nZUhhbmRsZXIgPSAoKSA9PiB7XG4gICAgICAgIG9uQ2hhbmdlRmlyZWQgPSB0cnVlO1xuICAgICAgICByZW1vdmVBbGxMaXN0ZW5lcnMoKTtcblxuICAgICAgICBjb25zdCBmaWxlcyA9IEFycmF5LmZyb20oaW5wdXQuZmlsZXMgfHwgW10pO1xuICAgICAgICByZXNvbHZlKGZpbGVzKTtcbiAgICAgIH07XG4gICAgICBjb25zdCBvbkNhbmNlbEhhbmRsZXIgPSAoKSA9PiB7XG4gICAgICAgIHJlbW92ZUFsbExpc3RlbmVycygpO1xuICAgICAgICByZXNvbHZlKHVuZGVmaW5lZCk7XG4gICAgICB9O1xuICAgICAgY29uc3Qgb25Gb2N1c0hhbmRsZXIgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgIGF3YWl0IHRoaXMud2FpdCg1MDApO1xuICAgICAgICBpZiAob25DaGFuZ2VGaXJlZCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICByZW1vdmVBbGxMaXN0ZW5lcnMoKTtcbiAgICAgICAgcmVzb2x2ZSh1bmRlZmluZWQpO1xuICAgICAgfTtcbiAgICAgIGNvbnN0IHJlbW92ZUFsbExpc3RlbmVycyA9ICgpID0+IHtcbiAgICAgICAgaW5wdXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgb25DaGFuZ2VIYW5kbGVyKTtcbiAgICAgICAgaWYgKGhhc0NhbmNlbEV2ZW50KSB7XG4gICAgICAgICAgaW5wdXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2FuY2VsJywgb25DYW5jZWxIYW5kbGVyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXMnLCBvbkZvY3VzSGFuZGxlcik7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIG9uQ2hhbmdlSGFuZGxlciwgeyBvbmNlOiB0cnVlIH0pO1xuICAgICAgaWYgKGhhc0NhbmNlbEV2ZW50KSB7XG4gICAgICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NhbmNlbCcsIG9uQ2FuY2VsSGFuZGxlciwgeyBvbmNlOiB0cnVlIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gV29ya2Fyb3VuZCB0byBkZXRlY3Qgd2hlbiBDYW5jZWwgaXMgc2VsZWN0ZWQgaW4gdGhlIEZpbGUgU2VsZWN0aW9uIGRpYWxvZyBib3guXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIG9uRm9jdXNIYW5kbGVyLCB7IG9uY2U6IHRydWUgfSk7XG4gICAgICB9XG4gICAgICBpbnB1dC5jbGljaygpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBnZXREYXRhRnJvbUZpbGUoZmlsZTogRmlsZSk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTtcbiAgICAgIHJlYWRlci5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHR5cGVvZiByZWFkZXIucmVzdWx0ID09PSAnc3RyaW5nJyA/IHJlYWRlci5yZXN1bHQgOiAnJztcbiAgICAgICAgY29uc3Qgc3BsaXR0ZWRSZXN1bHQgPSByZXN1bHQuc3BsaXQoJ2Jhc2U2NCwnKTtcbiAgICAgICAgY29uc3QgYmFzZTY0ID0gc3BsaXR0ZWRSZXN1bHRbMV0gfHwgJyc7XG4gICAgICAgIHJlc29sdmUoYmFzZTY0KTtcbiAgICAgIH07XG4gICAgICByZWFkZXIub25lcnJvciA9IGVycm9yID0+IHtcbiAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGdldE5hbWVGcm9tVXJsKGZpbGU6IEZpbGUpOiBzdHJpbmcge1xuICAgIHJldHVybiBmaWxlLm5hbWU7XG4gIH1cblxuICBwcml2YXRlIGdldE1pbWVUeXBlRnJvbVVybChmaWxlOiBGaWxlKTogc3RyaW5nIHtcbiAgICByZXR1cm4gZmlsZS50eXBlO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRTaXplRnJvbVVybChmaWxlOiBGaWxlKTogbnVtYmVyIHtcbiAgICByZXR1cm4gZmlsZS5zaXplO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyB3YWl0KGRlbGF5TXM6IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgZGVsYXlNcykpO1xuICB9XG59XG4iLCAiaW1wb3J0IHsgU3RyZW1pb0VuaGFuY2VkQXBpIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvU3RyZW1pb0VuaGFuY2VkQXBpXCI7XG5pbXBvcnQgUGx1Z2luT3B0aW9ucyBmcm9tIFwiLi9QbHVnaW5PcHRpb25zXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTdHJlbWlvRW5oYW5jZWRBcGkoXG4gICAgYXBwbHlUaGVtZTogKHRoZW1lOiBzdHJpbmcpID0+IFByb21pc2U8Ym9vbGVhbj5cbik6IFN0cmVtaW9FbmhhbmNlZEFwaSB7XG4gICAgcmV0dXJuIE9iamVjdC5mcmVlemUoe1xuICAgICAgICBhcHBseVRoZW1lOiAodGhlbWU6IHVua25vd24pID0+IChcbiAgICAgICAgICAgIHR5cGVvZiB0aGVtZSA9PT0gXCJzdHJpbmdcIiA/IGFwcGx5VGhlbWUodGhlbWUpIDogUHJvbWlzZS5yZXNvbHZlKGZhbHNlKVxuICAgICAgICApLFxuICAgICAgICBwbHVnaW5PcHRpb25zOiBPYmplY3QuZnJlZXplKHtcbiAgICAgICAgICAgIGdldDogKHBsdWdpbkZpbGU6IHN0cmluZykgPT4gKFxuICAgICAgICAgICAgICAgIHR5cGVvZiBwbHVnaW5GaWxlID09PSBcInN0cmluZ1wiID8gUGx1Z2luT3B0aW9ucy5nZXQocGx1Z2luRmlsZSkgOiB7fVxuICAgICAgICAgICAgKSxcbiAgICAgICAgfSksXG4gICAgfSk7XG59XG4iLCAiaW1wb3J0IHsgU1RPUkFHRV9LRVlTIH0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFVzZXJTZXR0aW5nc0luaXRpYWxpemF0aW9uT3B0aW9ucyB7XG4gICAgY2hlY2tVcGRhdGVzT25TdGFydHVwRGVmYXVsdDogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBJbml0aWFsaXplIHNldHRpbmdzIHRoYXQgbXVzdCBleGlzdCBiZWZvcmUgdGhlIHJlc3Qgb2YgdGhlIHByZWxvYWQgc3RhcnRzLlxuICogRXhpc3RpbmcgdmFsdWVzIGFyZSBpbnRlbnRpb25hbGx5IGxlZnQgdW50b3VjaGVkLCBpbmNsdWRpbmcgZW1wdHkgc3RyaW5ncyxcbiAqIHNvIHRoaXMgZnVuY3Rpb24gbmV2ZXIgb3ZlcndyaXRlcyBhIHVzZXIncyBwZXJzaXN0ZWQgY2hvaWNlcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluaXRpYWxpemVVc2VyU2V0dGluZ3Moe1xuICAgIGNoZWNrVXBkYXRlc09uU3RhcnR1cERlZmF1bHQsXG59OiBVc2VyU2V0dGluZ3NJbml0aWFsaXphdGlvbk9wdGlvbnMpOiB2b2lkIHtcbiAgICBjb25zdCBkZWZhdWx0czogUmVhZG9ubHlBcnJheTxyZWFkb25seSBbc3RyaW5nLCBzdHJpbmddPiA9IFtcbiAgICAgICAgW1NUT1JBR0VfS0VZUy5FTkFCTEVEX1BMVUdJTlMsIFwiW11cIl0sXG4gICAgICAgIFtTVE9SQUdFX0tFWVMuQ0hFQ0tfVVBEQVRFU19PTl9TVEFSVFVQLCBTdHJpbmcoY2hlY2tVcGRhdGVzT25TdGFydHVwRGVmYXVsdCldLFxuICAgICAgICBbU1RPUkFHRV9LRVlTLkRJU0NPUkRfUlBDLCBcImZhbHNlXCJdLFxuICAgIF07XG5cbiAgICBmb3IgKGNvbnN0IFtrZXksIGRlZmF1bHRWYWx1ZV0gb2YgZGVmYXVsdHMpIHtcbiAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSkgPT09IG51bGwpIHtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgZGVmYXVsdFZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsICJpbXBvcnQgeyBqb2luIH0gZnJvbSBcInBhdGhcIjtcbmltcG9ydCB7IGdldERlZmF1bHRUaGVtZVRlbXBsYXRlIH0gZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvZGVmYXVsdC10aGVtZS9kZWZhdWx0VGhlbWVcIjtcbmltcG9ydCB7IHNldHVwQnJvd3NlTW9kc0J1dHRvbiB9IGZyb20gXCIuLi8uLi9jb21wb25lbnRzL21vZC1icm93c2VyL21vZEJyb3dzZXJcIjtcbmltcG9ydCB7IEZJTEVfRVhURU5TSU9OUywgU0VMRUNUT1JTLCBTVE9SQUdFX0tFWVMgfSBmcm9tIFwiLi4vLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgTW9kTWFuYWdlciBmcm9tIFwiLi4vLi4vY29yZS9Nb2RNYW5hZ2VyXCI7XG5pbXBvcnQgcHJvcGVydGllcyBmcm9tIFwiLi4vLi4vY29yZS9Qcm9wZXJ0aWVzXCI7XG5pbXBvcnQgU2V0dGluZ3MgZnJvbSBcIi4uLy4uL2NvcmUvU2V0dGluZ3NcIjtcbmltcG9ydCB7IFBsYXRmb3JtTWFuYWdlciB9IGZyb20gXCIuLi8uLi9wbGF0Zm9ybS9QbGF0Zm9ybU1hbmFnZXJcIjtcbmltcG9ydCBFeHRyYWN0TWV0YURhdGEgZnJvbSBcIi4uLy4uL3V0aWxzL0V4dHJhY3RNZXRhRGF0YVwiO1xuaW1wb3J0IEhlbHBlcnMgZnJvbSBcIi4uLy4uL3V0aWxzL0hlbHBlcnNcIjtcbmltcG9ydCB7IGdldExvZ2dlciB9IGZyb20gXCIuLi8uLi91dGlscy9sb2dnZXJcIjtcbmltcG9ydCB7IGdldEFib3V0SWNvbiwgZ2V0UGx1Z2luSWNvbiwgZ2V0VGhlbWVJY29uIH0gZnJvbSBcIi4vaWNvbnNcIjtcblxuZXhwb3J0IGludGVyZmFjZSBFbmhhbmNlZFNldHRpbmdzSG9va3Mge1xuICAgIGFkZFBsYXRmb3JtQ29udHJvbHMoKTogdm9pZDtcbiAgICByZW5kZXJBYm91dCgpOiB2b2lkO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEVuaGFuY2VkU2V0dGluZ3NDb250cm9sbGVyIHtcbiAgICBjaGVjaygpOiBQcm9taXNlPHZvaWQ+O1xufVxuXG5jb25zdCBsb2dnZXIgPSBnZXRMb2dnZXIoXCJFbmhhbmNlZFNldHRpbmdzXCIpO1xuXG5hc3luYyBmdW5jdGlvbiByZWFkTWFuYWdlZEZpbGVzKHBhdGg6IHN0cmluZywgZXh0ZW5zaW9uOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZ1tdPiB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgZmlsZXMgPSBhd2FpdCBQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC5yZWFkZGlyKHBhdGgpO1xuICAgICAgICByZXR1cm4gZmlsZXMuZmlsdGVyKGZpbGVOYW1lID0+IGZpbGVOYW1lLmVuZHNXaXRoKGV4dGVuc2lvbikpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGxvZ2dlci5lcnJvcihgRmFpbGVkIHRvIHJlYWQgbWFuYWdlZCBkaXJlY3RvcnkgJHtwYXRofTogJHtlcnJvcn1gKTtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gYWRkSW5zdGFsbGVkVGhlbWVzKHRoZW1lczogc3RyaW5nW10pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCBIZWxwZXJzLndhaXRGb3JFbG0oU0VMRUNUT1JTLlRIRU1FU19DQVRFR09SWSk7XG5cbiAgICBpZiAoIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RyZW1pby1lbmhhbmNlZC1kZWZhdWx0LXRoZW1lXCIpKSB7XG4gICAgICAgIGNvbnN0IGlzRGVmYXVsdCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFNUT1JBR0VfS0VZUy5DVVJSRU5UX1RIRU1FKSA9PT0gXCJEZWZhdWx0XCI7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGNvbnRhaW5lci5pZCA9IFwic3RyZW1pby1lbmhhbmNlZC1kZWZhdWx0LXRoZW1lXCI7XG4gICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSBnZXREZWZhdWx0VGhlbWVUZW1wbGF0ZShpc0RlZmF1bHQpO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFNFTEVDVE9SUy5USEVNRVNfQ0FURUdPUlkpPy5hcHBlbmRDaGlsZChjb250YWluZXIpO1xuICAgIH1cblxuICAgIGF3YWl0IFByb21pc2UuYWxsKHRoZW1lcy5tYXAoYXN5bmMgdGhlbWUgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgY29udGVudCA9IGF3YWl0IFBsYXRmb3JtTWFuYWdlci5jdXJyZW50LnJlYWRGaWxlKGpvaW4ocHJvcGVydGllcy50aGVtZXNQYXRoLCB0aGVtZSkpO1xuICAgICAgICAgICAgY29uc3QgbWV0YURhdGEgPSBFeHRyYWN0TWV0YURhdGEuZXh0cmFjdE1ldGFkYXRhRnJvbVRleHQoY29udGVudCk7XG4gICAgICAgICAgICBpZiAobWV0YURhdGEgJiYgbWV0YURhdGEubmFtZS50b0xvd2VyQ2FzZSgpICE9PSBcImRlZmF1bHRcIikge1xuICAgICAgICAgICAgICAgIFNldHRpbmdzLmFkZEl0ZW0oXCJ0aGVtZVwiLCB0aGVtZSwgbWV0YURhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgbG9nZ2VyLmVycm9yKGBGYWlsZWQgdG8gbG9hZCB0aGVtZSBtZXRhZGF0YSBmb3IgJHt0aGVtZX06ICR7ZXJyb3J9YCk7XG4gICAgICAgIH1cbiAgICB9KSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGFkZEluc3RhbGxlZFBsdWdpbnMocGx1Z2luczogc3RyaW5nW10pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCBQcm9taXNlLmFsbChwbHVnaW5zLm1hcChhc3luYyBwbHVnaW4gPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgY29udGVudCA9IGF3YWl0IFBsYXRmb3JtTWFuYWdlci5jdXJyZW50LnJlYWRGaWxlKGpvaW4ocHJvcGVydGllcy5wbHVnaW5zUGF0aCwgcGx1Z2luKSk7XG4gICAgICAgICAgICBjb25zdCBtZXRhRGF0YSA9IEV4dHJhY3RNZXRhRGF0YS5leHRyYWN0TWV0YWRhdGFGcm9tVGV4dChjb250ZW50KTtcbiAgICAgICAgICAgIGlmIChtZXRhRGF0YSkgU2V0dGluZ3MuYWRkSXRlbShcInBsdWdpblwiLCBwbHVnaW4sIG1ldGFEYXRhKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGxvZ2dlci5lcnJvcihgRmFpbGVkIHRvIGxvYWQgcGx1Z2luIG1ldGFkYXRhIGZvciAke3BsdWdpbn06ICR7ZXJyb3J9YCk7XG4gICAgICAgIH1cbiAgICB9KSk7XG59XG5cbmZ1bmN0aW9uIHNldHRpbmdzQXJlUmVhZHkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIEJvb2xlYW4oXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZW5oYW5jZWRcIikgJiZcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtc2VjdGlvbj1cImVuaGFuY2VkXCJdJykgJiZcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihTRUxFQ1RPUlMuVEhFTUVTX0NBVEVHT1JZKSAmJlxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFNFTEVDVE9SUy5QTFVHSU5TX0NBVEVHT1JZKSAmJlxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFNFTEVDVE9SUy5BQk9VVF9DQVRFR09SWSlcbiAgICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRW5oYW5jZWRTZXR0aW5nc0NvbnRyb2xsZXIoXG4gICAgaG9va3M6IEVuaGFuY2VkU2V0dGluZ3NIb29rc1xuKTogRW5oYW5jZWRTZXR0aW5nc0NvbnRyb2xsZXIge1xuICAgIGxldCBjaGVja1BlbmRpbmcgPSBmYWxzZTtcblxuICAgIGNvbnN0IHNldHVwID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgICAgICBNb2RNYW5hZ2VyLmFkZEFwcGx5VGhlbWVGdW5jdGlvbigpO1xuXG4gICAgICAgIGNvbnN0IFt0aGVtZXMsIHBsdWdpbnNdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgcmVhZE1hbmFnZWRGaWxlcyhwcm9wZXJ0aWVzLnRoZW1lc1BhdGgsIEZJTEVfRVhURU5TSU9OUy5USEVNRSksXG4gICAgICAgICAgICByZWFkTWFuYWdlZEZpbGVzKHByb3BlcnRpZXMucGx1Z2luc1BhdGgsIEZJTEVfRVhURU5TSU9OUy5QTFVHSU4pLFxuICAgICAgICBdKTtcblxuICAgICAgICBTZXR0aW5ncy5hZGRTZWN0aW9uKFwiZW5oYW5jZWRcIiwgXCJFbmhhbmNlZFwiKTtcbiAgICAgICAgYXdhaXQgSGVscGVycy53YWl0Rm9yRWxtKFwiI2VuaGFuY2VkXCIpO1xuICAgICAgICBTZXR0aW5ncy5hZGRDYXRlZ29yeShcIlRoZW1lc1wiLCBcImVuaGFuY2VkXCIsIGdldFRoZW1lSWNvbigpKTtcbiAgICAgICAgU2V0dGluZ3MuYWRkQ2F0ZWdvcnkoXCJQbHVnaW5zXCIsIFwiZW5oYW5jZWRcIiwgZ2V0UGx1Z2luSWNvbigpKTtcbiAgICAgICAgU2V0dGluZ3MuYWRkQ2F0ZWdvcnkoXCJBYm91dFwiLCBcImVuaGFuY2VkXCIsIGdldEFib3V0SWNvbigpKTtcbiAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgSGVscGVycy53YWl0Rm9yRWxtKFNFTEVDVE9SUy5USEVNRVNfQ0FURUdPUlkpLFxuICAgICAgICAgICAgSGVscGVycy53YWl0Rm9yRWxtKFNFTEVDVE9SUy5QTFVHSU5TX0NBVEVHT1JZKSxcbiAgICAgICAgICAgIEhlbHBlcnMud2FpdEZvckVsbShTRUxFQ1RPUlMuQUJPVVRfQ0FURUdPUlkpLFxuICAgICAgICBdKTtcblxuICAgICAgICBob29rcy5hZGRQbGF0Zm9ybUNvbnRyb2xzKCk7XG4gICAgICAgIGhvb2tzLnJlbmRlckFib3V0KCk7XG4gICAgICAgIHNldHVwQnJvd3NlTW9kc0J1dHRvbigpO1xuXG4gICAgICAgIGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgIGFkZEluc3RhbGxlZFRoZW1lcyh0aGVtZXMpLFxuICAgICAgICAgICAgYWRkSW5zdGFsbGVkUGx1Z2lucyhwbHVnaW5zKSxcbiAgICAgICAgXSk7XG5cbiAgICAgICAgTW9kTWFuYWdlci5zY3JvbGxMaXN0ZW5lcigpO1xuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBhc3luYyBjaGVjaygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgICAgIGlmICghbG9jYXRpb24uaHJlZi5pbmNsdWRlcyhcIiMvc2V0dGluZ3NcIikgfHwgc2V0dGluZ3NBcmVSZWFkeSgpIHx8IGNoZWNrUGVuZGluZykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2hlY2tQZW5kaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgc2V0dXAoKTtcbiAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgY2hlY2tQZW5kaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfTtcbn1cbiIsICJpbXBvcnQgVGVtcGxhdGVDYWNoZSBmcm9tICcuLi8uLi91dGlscy90ZW1wbGF0ZUNhY2hlJztcblxuZXhwb3J0IGZ1bmN0aW9uIGdldERlZmF1bHRUaGVtZVRlbXBsYXRlKGFwcGxpZWQ6IGJvb2xlYW4pOiBzdHJpbmcge1xuICAgIGNvbnN0IHRlbXBsYXRlID0gVGVtcGxhdGVDYWNoZS5sb2FkKF9fZGlybmFtZSwgJ2RlZmF1bHQtdGhlbWUnKTtcblxuICAgIHJldHVybiB0ZW1wbGF0ZVxuICAgICAgICAucmVwbGFjZShcInt7IGRpc2FibGVkIH19XCIsIGFwcGxpZWQgPyBcImRpc2FibGVkXCIgOiBcIlwiKVxuICAgICAgICAucmVwbGFjZShcInt7IGxhYmVsIH19XCIsIGFwcGxpZWQgPyBcIkFwcGxpZWRcIiA6IFwiQXBwbHlcIilcbiAgICAgICAgLnJlcGxhY2UoXCJ7eyBiYWNrZ3JvdW5kQ29sb3IgfX1cIiwgYXBwbGllZCA/IFwidmFyKC0tb3ZlcmxheS1jb2xvcilcIiA6IFwidmFyKC0tc2Vjb25kYXJ5LWFjY2VudC1jb2xvcilcIik7XG59XG4iLCAiaW1wb3J0IFRlbXBsYXRlQ2FjaGUgZnJvbSAnLi4vLi4vdXRpbHMvdGVtcGxhdGVDYWNoZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRCYWNrQnV0dG9uKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFRlbXBsYXRlQ2FjaGUubG9hZChfX2Rpcm5hbWUsICdiYWNrLWJ0bicpO1xufVxuIiwgImltcG9ydCBUZW1wbGF0ZUNhY2hlIGZyb20gJy4uLy4uL3V0aWxzL3RlbXBsYXRlQ2FjaGUnO1xuaW1wb3J0IGVzY2FwZUh0bWwgZnJvbSAnLi4vLi4vdXRpbHMvZXNjYXBlSHRtbCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTW9kTWV0YURhdGEge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICAgIGF1dGhvcjogc3RyaW5nO1xuICAgIHZlcnNpb246IHN0cmluZztcbiAgICBwcmV2aWV3Pzogc3RyaW5nO1xuICAgIGRvd25sb2FkOiBzdHJpbmc7XG4gICAgcmVwbzogc3RyaW5nO1xufVxuXG5mdW5jdGlvbiBub3JtYWxpemVIdHRwc1VybChyYXdVcmw6IHN0cmluZyB8IHVuZGVmaW5lZCk6IHN0cmluZyB8IG51bGwge1xuICAgIGlmICghcmF3VXJsKSByZXR1cm4gbnVsbDtcblxuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHVybCA9IG5ldyBVUkwocmF3VXJsKTtcbiAgICAgICAgaWYgKHVybC5wcm90b2NvbCAhPT0gXCJodHRwczpcIikgcmV0dXJuIG51bGw7XG4gICAgICAgIHJldHVybiB1cmwudG9TdHJpbmcoKTtcbiAgICB9IGNhdGNoIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXRQbGFjZWhvbGRlckxvZ28oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYFxuICAgICAgICA8c3ZnIGNsYXNzPVwiaWNvbi1HeFZiWVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBhcmlhLWxhYmVsPVwiVGhlbWUgcHJldmlldyB1bmF2YWlsYWJsZVwiPlxuICAgICAgICAgICAgPHBhdGggZD1cIk00IDNoMTZhMSAxIDAgMCAxIDEgMXY1YTEgMSAwIDAgMS0xIDFINGExIDEgMCAwIDEtMS0xVjRhMSAxIDAgMCAxIDEtMXptMiA5aDZhMSAxIDAgMCAxIDEgMXYzaDF2NmgtNHYtNmgxdi0ySDVhMSAxIDAgMCAxLTEtMXYtMmgydjF6bTExLjczMiAxLjczMmwxLjc2OC0xLjc2OCAxLjc2OCAxLjc2OGEyLjUgMi41IDAgMSAxLTMuNTM2IDB6XCIgc3R5bGU9XCJmaWxsOiBjdXJyZW50Y29sb3I7XCI+PC9wYXRoPlxuICAgICAgICA8L3N2Zz5gO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TW9kSXRlbVRlbXBsYXRlKFxuICAgIG1ldGFEYXRhOiBNb2RNZXRhRGF0YSxcbiAgICB0eXBlOiBcIlBsdWdpblwiIHwgXCJUaGVtZVwiLCBcbiAgICBpbnN0YWxsZWQ6IGJvb2xlYW5cbik6IHN0cmluZyB7XG4gICAgbGV0IHRlbXBsYXRlID0gVGVtcGxhdGVDYWNoZS5sb2FkKF9fZGlybmFtZSwgJ21vZHMtaXRlbScpO1xuICAgIGNvbnN0IHByZXZpZXdVcmwgPSBub3JtYWxpemVIdHRwc1VybChtZXRhRGF0YS5wcmV2aWV3KTtcbiAgICBjb25zdCBkb3dubG9hZFVybCA9IG5vcm1hbGl6ZUh0dHBzVXJsKG1ldGFEYXRhLmRvd25sb2FkKTtcbiAgICBjb25zdCByZXBvVXJsID0gbm9ybWFsaXplSHR0cHNVcmwobWV0YURhdGEucmVwbyk7XG4gICAgXG4gICAgLy8gR2VuZXJhdGUgbG9nbyBibG9jayBiYXNlZCBvbiB0eXBlXG4gICAgbGV0IGxvZ29CbG9jayA9IFwiXCI7XG5cbiAgICBpZih0eXBlID09PSBcIlRoZW1lXCIpIHtcbiAgICAgICAgaWYoIXByZXZpZXdVcmwpIHtcbiAgICAgICAgICAgIGxvZ29CbG9jayA9IGdldFBsYWNlaG9sZGVyTG9nbygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3Qgc2FmZVByZXZpZXdVcmwgPSBlc2NhcGVIdG1sKHByZXZpZXdVcmwpO1xuICAgICAgICAgICAgbG9nb0Jsb2NrID0gYFxuICAgICAgICAgICAgPGEgaHJlZj1cIiR7c2FmZVByZXZpZXdVcmx9XCIgdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9yZWZlcnJlclwiPlxuICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJsb2dvLVdyc0dGXCIgc3JjPVwiJHtzYWZlUHJldmlld1VybH1cIiBhbHQ9XCJUaGVtZSBQcmV2aWV3XCIgbG9hZGluZz1cImxhenlcIj5cbiAgICAgICAgICAgIDwvYT5gO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbG9nb0Jsb2NrID0gYFxuICAgICAgICA8c3ZnIGNsYXNzPVwiaWNvbi1HeFZiWVwiIHZpZXdCb3g9XCIwIDAgNTEyIDUxMlwiPlxuICAgICAgICAgICAgPHBhdGggZD1cIk0zNDUuNjUwMDAwMDAwMDAwMSA0NTYuMzAwMDAwMDAwMDAwMmgtNzAuODdjLTIuMzUgMC4wMS00LjY5LTAuNDMtNi44Ni0xLjI5LTIuMTgtMC44Ny00LjE1LTIuMTQtNS43OS0zLjc1LTMuMzctMy4xOS01LjI3LTcuNTQtNS4yOS0xMi4wN3YtMjYuMzNjMC4wMy00LjA1LTAuODEtOC4wNy0yLjQ5LTExLjc5cy00LjEyLTcuMDctNy4xNy05Ljg5Yy03Ljc4LTcuMjItMTkuMDQtMTEuMjItMzAuOC0xMC45My0yMS4zMyAwLjQ3LTM5LjI3IDE4LjM1LTM5LjI3IDM5LjA3djE5Ljg3YzAuMDEgMi4yNC0wLjQ1IDQuNDgtMS4zNiA2LjU1cy0yLjI0IDMuOTUtMy45MyA1LjUyYy0zLjM1IDMuMjEtNy45IDUuMDItMTIuNjUgNS4wNGgtNzAuMTdjLTE0LjcxIDAuMDEtMjguODMtNS41NS0zOS4yMy0xNS40Ni0xMC40Mi05LjkxLTE2LjI4LTIzLjM2LTE2LjI5LTM3LjR2LTY2LjkyYzAuMDMtNC41MyAxLjkyLTguODcgNS4yOC0xMi4wNyAzLjM2LTMuMjEgNy45MS01LjAxIDEyLjY2LTUuMDRoMjcuNjFjOS4xNyAwIDE4LjA0LTMuNzEgMjUuMDItMTAuNDYgMy44OS0zLjcyIDYuOTgtOC4xNSA5LjA3LTEzLjAyYTM3LjIgMzcuMiAwIDAgMCAzLjA5LTE1LjRjLTAuMy0yMC4xNS0xNy42NC0zNy4xNy0zNy45OC0zNy4xN2gtMjYuNzFjLTIuMzUgMC4wMS00LjY5LTAuNDMtNi44Ny0xLjI5YTE3LjcgMTcuNyAwIDAgMS01Ljc5LTMuNzVjLTMuMzctMy4xOS01LjI2LTcuNTQtNS4yOC0xMi4wN3YtNjYuOTJhNTAuOSA1MC45IDAgMCAxIDQuMTktMjAuMjVjMi43Ni02LjQzIDYuODYtMTIuMjUgMTIuMDYtMTcuMTEgMTAuMzktOS45MSAyNC40OC0xNS40OCAzOS4xNy0xNS41aDU1LjAyYzIuMTIgMC4wMSA0LjE2LTAuNzcgNS42OC0yLjE5IDAuNzMtMC43MSAxLjMyLTEuNTUgMS43MS0yLjQ5IDAuNC0wLjkzIDAuNi0xLjkyIDAuNTgtMi45MnYtNi4xOGE1OSA1OSAwIDAgMSA1LjA4LTI0LjA1YzMuMzgtNy42MiA4LjI5LTE0LjUzIDE0LjQ2LTIwLjM1IDYuMTktNS44IDEzLjU1LTEwLjM2IDIxLjYyLTEzLjRhNjkuOCA2OS44IDAgMCAxIDI1LjMyLTQuNDdjMzUuMzggMC41NyA2NC4xOSAyOC45IDY0LjE5IDYzLjAzdjUuNDJjLTAuMDMgMS41MSAwLjQyIDMgMS4yOSA0LjI1YTcuNzMgNy43MyAwIDAgMCAzLjYxIDIuODFjMC45OCAwLjM3IDIuMDMgMC41NiAzLjA3IDAuNTRoNTUuMDJhNTYuNCA1Ni40IDAgMCAxIDIwLjkzIDMuOTljMTMuNCA1LjMxIDI0LjA0IDE1LjQ2IDI5LjYgMjguMjQgMi43NyA2LjMyIDQuMiAxMy4xMSA0LjE5IDE5Ljk2djUyLjQ3Yy0wLjAzIDEuNTIgMC40MiAzLjAxIDEuMyA0LjI2YTcuNjYgNy42NiAwIDAgMCAzLjYgMi44MWMwLjk4IDAuMzcgMi4wMyAwLjU2IDMuMDcgMC41NGg1LjY4YzM2LjQ4IDAgNjYuMDkgMjcuNTcgNjYuMDkgNjEuNDEgMCAzNC43OS0yOS4zMSA2My4xMi02NS4yOSA2My4xMmgtNi40OGMtMi4xMi0wLjAxLTQuMTUgMC43OC01LjY4IDIuMTlhNy40IDcuNCAwIDAgMC0xLjcxIDIuNDljLTAuNCAwLjkzLTAuNiAxLjkzLTAuNTggMi45M3Y1My4yM2MwLjAxIDYuODUtMS40MiAxMy42NC00LjE5IDE5Ljk2LTUuNTYgMTIuNzgtMTYuMiAyMi45My0yOS42IDI4LjI0YTU2IDU2IDAgMCAxLTIwLjkzIDMuOTlcIiBzdHlsZT1cImZpbGw6IGN1cnJlbnRjb2xvcjtcIj48L3BhdGg+XG4gICAgICAgIDwvc3ZnPmBcbiAgICB9XG5cbiAgICAvLyBSZXBsYWNlIG1ldGFkYXRhIHBsYWNlaG9sZGVyc1xuICAgIGNvbnN0IG1ldGFLZXlzID0gWyduYW1lJywgJ2Rlc2NyaXB0aW9uJywgJ2F1dGhvcicsICd2ZXJzaW9uJ10gYXMgY29uc3Q7XG4gICAgbWV0YUtleXMuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBjb25zdCByZWdleCA9IG5ldyBSZWdFeHAoYHt7XFxcXHMqJHtrZXl9XFxcXHMqfX1gLCAnZycpO1xuICAgICAgICB0ZW1wbGF0ZSA9IHRlbXBsYXRlLnJlcGxhY2UocmVnZXgsIGVzY2FwZUh0bWwobWV0YURhdGFba2V5XSB8fCAnJykpO1xuICAgIH0pO1xuXG4gICAgY29uc3QgYWN0aW9uID0gZG93bmxvYWRVcmwgPyAoaW5zdGFsbGVkID8gXCJ1bmluc3RhbGxcIiA6IFwiaW5zdGFsbFwiKSA6IFwidW5hdmFpbGFibGVcIjtcbiAgICBjb25zdCBhY3Rpb25UaXRsZSA9IGRvd25sb2FkVXJsID8gKGluc3RhbGxlZCA/IFwiVW5pbnN0YWxsXCIgOiBcIkluc3RhbGxcIikgOiBcIlVuYXZhaWxhYmxlXCI7XG5cbiAgICByZXR1cm4gdGVtcGxhdGVcbiAgICAgICAgLnJlcGxhY2UoL1xce1xce1xccyp0eXBlXFxzKlxcfVxcfS9nLCB0eXBlKVxuICAgICAgICAucmVwbGFjZSgvXFx7XFx7XFxzKmFjdGlvbmJ0blRpdGxlXFxzKlxcfVxcfS9nLCBhY3Rpb25UaXRsZSlcbiAgICAgICAgLnJlcGxhY2UoXCJ7eyBhY3Rpb25idG5DbGFzcyB9fVwiLCBpbnN0YWxsZWQgPyBcInVuaW5zdGFsbC1idXR0b24tY29udGFpbmVyLW9WNFlvXCIgOiBcImluc3RhbGwtYnV0dG9uLWNvbnRhaW5lci15ZmNxNVwiKVxuICAgICAgICAucmVwbGFjZShcInt7IGFjdGlvbiB9fVwiLCBhY3Rpb24pXG4gICAgICAgIC5yZXBsYWNlKFwie3sgYWN0aW9uRGlzYWJsZWQgfX1cIiwgZG93bmxvYWRVcmwgPyBcImZhbHNlXCIgOiBcInRydWVcIilcbiAgICAgICAgLnJlcGxhY2UoXCJ7eyBhY3Rpb25UYWJJbmRleCB9fVwiLCBkb3dubG9hZFVybCA/IFwiMFwiIDogXCItMVwiKVxuICAgICAgICAucmVwbGFjZShcInt7IGRvd25sb2FkIH19XCIsIGRvd25sb2FkVXJsID8gZXNjYXBlSHRtbChkb3dubG9hZFVybCkgOiBcIlwiKVxuICAgICAgICAucmVwbGFjZShcInt7IHJlcG9IcmVmIH19XCIsIHJlcG9VcmwgPyBgaHJlZj1cIiR7ZXNjYXBlSHRtbChyZXBvVXJsKX1cImAgOiBcIlwiKVxuICAgICAgICAucmVwbGFjZShcInt7IHJlcG9EaXNhYmxlZCB9fVwiLCByZXBvVXJsID8gXCJmYWxzZVwiIDogXCJ0cnVlXCIpXG4gICAgICAgIC5yZXBsYWNlKFwie3sgcmVwb1RhYkluZGV4IH19XCIsIHJlcG9VcmwgPyBcIjBcIiA6IFwiLTFcIilcbiAgICAgICAgLnJlcGxhY2UoXCI8IS0tIHRoZW1lIHByZXZpZXcgaGVyZSAtLT5cIiwgbG9nb0Jsb2NrKVxuICAgICAgICAucmVwbGFjZShcIjwhLS0gcGx1Z2luIGljb24gaGVyZSAtLT5cIiwgXCJcIik7IFxufVxuIiwgImltcG9ydCBUZW1wbGF0ZUNhY2hlIGZyb20gJy4uLy4uL3V0aWxzL3RlbXBsYXRlQ2FjaGUnO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TW9kc1RhYlRlbXBsYXRlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFRlbXBsYXRlQ2FjaGUubG9hZChfX2Rpcm5hbWUsICdtb2RzLXRhYicpO1xufVxuIiwgImltcG9ydCBNb2RNYW5hZ2VyIGZyb20gXCIuLi8uLi9jb3JlL01vZE1hbmFnZXJcIjtcbmltcG9ydCBIZWxwZXJzIGZyb20gXCIuLi8uLi91dGlscy9IZWxwZXJzXCI7XG5pbXBvcnQgeyBDTEFTU0VTLCBTRUxFQ1RPUlMgfSBmcm9tIFwiLi4vLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBnZXRCYWNrQnV0dG9uIH0gZnJvbSBcIi4uL2JhY2stYnRuL2JhY2tCdG5cIjtcbmltcG9ydCB7IGdldE1vZEl0ZW1UZW1wbGF0ZSwgTW9kTWV0YURhdGEgfSBmcm9tIFwiLi4vbW9kcy1pdGVtL21vZHNJdGVtXCI7XG5pbXBvcnQgeyBnZXRNb2RzVGFiVGVtcGxhdGUgfSBmcm9tIFwiLi4vbW9kcy10YWIvbW9kc1RhYlwiO1xuaW1wb3J0IHsgZ2V0TG9nZ2VyIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2xvZ2dlclwiO1xuaW1wb3J0IHsgaXNTYWZlTW9kRmlsZU5hbWUgfSBmcm9tIFwiLi4vLi4vdXRpbHMvbW9kRmlsZU5hbWVcIjtcblxudHlwZSBNb2RUeXBlID0gXCJwbHVnaW5cIiB8IFwidGhlbWVcIjtcblxuaW50ZXJmYWNlIE1vZEFjdGlvblN0YXRlIHtcbiAgICBhY3Rpb246IFwiaW5zdGFsbFwiIHwgXCJ1bmluc3RhbGxcIjtcbiAgICBmaWxlTmFtZTogc3RyaW5nO1xuICAgIGxpbms6IHN0cmluZztcbiAgICB0eXBlOiBNb2RUeXBlO1xufVxuXG5jb25zdCBsb2dnZXIgPSBnZXRMb2dnZXIoXCJNb2RCcm93c2VyXCIpO1xuY29uc3QgbW9kQWN0aW9uU3RhdGVzID0gbmV3IFdlYWtNYXA8SFRNTEVsZW1lbnQsIE1vZEFjdGlvblN0YXRlPigpO1xuXG5mdW5jdGlvbiBhc1N0cmluZyh2YWx1ZTogdW5rbm93bik6IHN0cmluZyB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiA/IHZhbHVlIDogXCJcIjtcbn1cblxuZnVuY3Rpb24gcGFyc2VSZWdpc3RyeU1vZCh2YWx1ZTogdW5rbm93bik6IE1vZE1ldGFEYXRhIHwgbnVsbCB7XG4gICAgaWYgKCF2YWx1ZSB8fCB0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIgfHwgQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHJldHVybiBudWxsO1xuXG4gICAgY29uc3QgcmVjb3JkID0gdmFsdWUgYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj47XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZTogYXNTdHJpbmcocmVjb3JkLm5hbWUpLFxuICAgICAgICBkZXNjcmlwdGlvbjogYXNTdHJpbmcocmVjb3JkLmRlc2NyaXB0aW9uKSxcbiAgICAgICAgYXV0aG9yOiBhc1N0cmluZyhyZWNvcmQuYXV0aG9yKSxcbiAgICAgICAgdmVyc2lvbjogYXNTdHJpbmcocmVjb3JkLnZlcnNpb24pLFxuICAgICAgICBwcmV2aWV3OiBhc1N0cmluZyhyZWNvcmQucHJldmlldykgfHwgdW5kZWZpbmVkLFxuICAgICAgICBkb3dubG9hZDogYXNTdHJpbmcocmVjb3JkLmRvd25sb2FkKSxcbiAgICAgICAgcmVwbzogYXNTdHJpbmcocmVjb3JkLnJlcG8pLFxuICAgIH07XG59XG5cbmZ1bmN0aW9uIHBhcnNlUmVnaXN0cnlEb3dubG9hZChcbiAgICByYXdVcmw6IHN0cmluZyxcbiAgICB0eXBlOiBNb2RUeXBlXG4pOiB7IGZpbGVOYW1lOiBzdHJpbmc7IHVybDogc3RyaW5nIH0gfCBudWxsIHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHJhd1VybCk7XG4gICAgICAgIGlmICh1cmwucHJvdG9jb2wgIT09IFwiaHR0cHM6XCIpIHJldHVybiBudWxsO1xuXG4gICAgICAgIGNvbnN0IGVuY29kZWRGaWxlTmFtZSA9IHVybC5wYXRobmFtZS5zcGxpdChcIi9cIikuYXQoLTEpID8/IFwiXCI7XG4gICAgICAgIGlmICghZW5jb2RlZEZpbGVOYW1lKSByZXR1cm4gbnVsbDtcblxuICAgICAgICBsZXQgZmlsZU5hbWU6IHN0cmluZztcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZpbGVOYW1lID0gZGVjb2RlVVJJQ29tcG9uZW50KGVuY29kZWRGaWxlTmFtZSk7XG4gICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFpc1NhZmVNb2RGaWxlTmFtZShmaWxlTmFtZSwgdHlwZSkpIHJldHVybiBudWxsO1xuICAgICAgICByZXR1cm4geyBmaWxlTmFtZSwgdXJsOiB1cmwudG9TdHJpbmcoKSB9O1xuICAgIH0gY2F0Y2gge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHNldEFjdGlvblN0YXRlKFxuICAgIGJ1dHRvbjogSFRNTEVsZW1lbnQsXG4gICAgc3RhdGU6IE1vZEFjdGlvblN0YXRlLFxuICAgIGFjdGlvbjogXCJpbnN0YWxsXCIgfCBcInVuaW5zdGFsbFwiXG4pOiB2b2lkIHtcbiAgICBjb25zdCBpbnN0YWxsaW5nID0gYWN0aW9uID09PSBcImluc3RhbGxcIjtcbiAgICBjb25zdCB0aXRsZSA9IGluc3RhbGxpbmcgPyBcIkluc3RhbGxcIiA6IFwiVW5pbnN0YWxsXCI7XG5cbiAgICBzdGF0ZS5hY3Rpb24gPSBhY3Rpb247XG4gICAgYnV0dG9uLmRhdGFzZXQuYWN0aW9uID0gYWN0aW9uO1xuICAgIGJ1dHRvbi50aXRsZSA9IHRpdGxlO1xuICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJhcmlhLWRpc2FibGVkXCIsIFwiZmFsc2VcIik7XG4gICAgYnV0dG9uLmNsYXNzTGlzdC50b2dnbGUoQ0xBU1NFUy5JTlNUQUxMX0JVVFRPTiwgaW5zdGFsbGluZyk7XG4gICAgYnV0dG9uLmNsYXNzTGlzdC50b2dnbGUoQ0xBU1NFUy5VTklOU1RBTExfQlVUVE9OLCAhaW5zdGFsbGluZyk7XG5cbiAgICBjb25zdCBsYWJlbCA9IGJ1dHRvbi5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PihcIi5sYWJlbC1PbldoMlwiKTtcbiAgICBpZiAobGFiZWwpIGxhYmVsLnRleHRDb250ZW50ID0gdGl0bGU7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhY3RpdmF0ZU1vZEFjdGlvbihidXR0b246IEhUTUxFbGVtZW50KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKFxuICAgICAgICBidXR0b24uZGF0YXNldC5zdHJlbWlvRW5oYW5jZWRBY3Rpb25CdXN5ID09PSBcInRydWVcIiB8fFxuICAgICAgICBidXR0b24uZ2V0QXR0cmlidXRlKFwiYXJpYS1kaXNhYmxlZFwiKSA9PT0gXCJ0cnVlXCJcbiAgICApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHN0YXRlID0gbW9kQWN0aW9uU3RhdGVzLmdldChidXR0b24pO1xuICAgIGlmICghc3RhdGUpIHtcbiAgICAgICAgYnV0dG9uLnNldEF0dHJpYnV0ZShcImFyaWEtZGlzYWJsZWRcIiwgXCJ0cnVlXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgYnV0dG9uLmRhdGFzZXQuc3RyZW1pb0VuaGFuY2VkQWN0aW9uQnVzeSA9IFwidHJ1ZVwiO1xuICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJhcmlhLWJ1c3lcIiwgXCJ0cnVlXCIpO1xuICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJhcmlhLWRpc2FibGVkXCIsIFwidHJ1ZVwiKTtcblxuICAgIHRyeSB7XG4gICAgICAgIGlmIChzdGF0ZS5hY3Rpb24gPT09IFwiaW5zdGFsbFwiKSB7XG4gICAgICAgICAgICBhd2FpdCBNb2RNYW5hZ2VyLmRvd25sb2FkTW9kKHN0YXRlLmxpbmssIHN0YXRlLnR5cGUpO1xuICAgICAgICAgICAgc2V0QWN0aW9uU3RhdGUoYnV0dG9uLCBzdGF0ZSwgXCJ1bmluc3RhbGxcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhd2FpdCBNb2RNYW5hZ2VyLnJlbW92ZU1vZChzdGF0ZS5maWxlTmFtZSwgc3RhdGUudHlwZSk7XG4gICAgICAgICAgICBzZXRBY3Rpb25TdGF0ZShidXR0b24sIHN0YXRlLCBcImluc3RhbGxcIik7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBsb2dnZXIuZXJyb3IoYEZhaWxlZCB0byAke3N0YXRlLmFjdGlvbn0gJHtzdGF0ZS50eXBlfTogJHtlcnJvcn1gKTtcbiAgICAgICAgYnV0dG9uLnNldEF0dHJpYnV0ZShcImFyaWEtZGlzYWJsZWRcIiwgXCJmYWxzZVwiKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgICBkZWxldGUgYnV0dG9uLmRhdGFzZXQuc3RyZW1pb0VuaGFuY2VkQWN0aW9uQnVzeTtcbiAgICAgICAgYnV0dG9uLnJlbW92ZUF0dHJpYnV0ZShcImFyaWEtYnVzeVwiKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHNldHVwQWN0aW9uQnV0dG9ucygpOiB2b2lkIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsPEhUTUxFbGVtZW50PihcIi5tb2RBY3Rpb25CdG5cIikuZm9yRWFjaChidXR0b24gPT4ge1xuICAgICAgICBpZiAoYnV0dG9uLmRhdGFzZXQuc3RyZW1pb0VuaGFuY2VkTW9kQWN0aW9uQm91bmQgPT09IFwidHJ1ZVwiKSByZXR1cm47XG4gICAgICAgIGlmICghbW9kQWN0aW9uU3RhdGVzLmhhcyhidXR0b24pKSB7XG4gICAgICAgICAgICBidXR0b24uc2V0QXR0cmlidXRlKFwiYXJpYS1kaXNhYmxlZFwiLCBcInRydWVcIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBidXR0b24uZGF0YXNldC5zdHJlbWlvRW5oYW5jZWRNb2RBY3Rpb25Cb3VuZCA9IFwidHJ1ZVwiO1xuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGlmICghZXZlbnQuaXNUcnVzdGVkKSByZXR1cm47XG4gICAgICAgICAgICB2b2lkIGFjdGl2YXRlTW9kQWN0aW9uKGJ1dHRvbik7XG4gICAgICAgIH0pO1xuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgZXZlbnQgPT4ge1xuICAgICAgICAgICAgaWYgKCFldmVudC5pc1RydXN0ZWQpIHJldHVybjtcbiAgICAgICAgICAgIGlmIChldmVudC5rZXkgIT09IFwiRW50ZXJcIiAmJiBldmVudC5rZXkgIT09IFwiIFwiKSByZXR1cm47XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdm9pZCBhY3RpdmF0ZU1vZEFjdGlvbihidXR0b24pO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gc2V0dXBCYWNrQnV0dG9uKCk6IHZvaWQge1xuICAgIGNvbnN0IGhvcml6b250YWxOYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFNFTEVDVE9SUy5IT1JJWk9OVEFMX05BVilbMV07XG4gICAgaWYgKCFob3Jpem9udGFsTmF2KSByZXR1cm47XG5cbiAgICBob3Jpem9udGFsTmF2LmlubmVySFRNTCA9IGdldEJhY2tCdXR0b24oKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJhY2stYnRuXCIpPy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBsb2NhdGlvbi5oYXNoID0gXCIjL1wiO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGxvY2F0aW9uLmhhc2ggPSBcIiMvc2V0dGluZ3NcIjtcbiAgICAgICAgfSwgMCk7XG4gICAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJlbmRlclJlZ2lzdHJ5TW9kcyhcbiAgICBtb2RzTGlzdDogSFRNTEVsZW1lbnQsXG4gICAgdmFsdWVzOiB1bmtub3duW10sXG4gICAgdHlwZTogXCJQbHVnaW5cIiB8IFwiVGhlbWVcIlxuKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgZm9yIChjb25zdCB2YWx1ZSBvZiB2YWx1ZXMpIHtcbiAgICAgICAgY29uc3QgbW9kID0gcGFyc2VSZWdpc3RyeU1vZCh2YWx1ZSk7XG4gICAgICAgIGlmICghbW9kKSBjb250aW51ZTtcblxuICAgICAgICBjb25zdCBtb2RUeXBlID0gdHlwZS50b0xvd2VyQ2FzZSgpIGFzIE1vZFR5cGU7XG4gICAgICAgIGNvbnN0IGRvd25sb2FkID0gcGFyc2VSZWdpc3RyeURvd25sb2FkKG1vZC5kb3dubG9hZCwgbW9kVHlwZSk7XG4gICAgICAgIGNvbnN0IGluc3RhbGxlZCA9IGRvd25sb2FkXG4gICAgICAgICAgICA/IHR5cGUgPT09IFwiUGx1Z2luXCJcbiAgICAgICAgICAgICAgICA/IGF3YWl0IE1vZE1hbmFnZXIuaXNQbHVnaW5JbnN0YWxsZWQoZG93bmxvYWQuZmlsZU5hbWUpXG4gICAgICAgICAgICAgICAgOiBhd2FpdCBNb2RNYW5hZ2VyLmlzVGhlbWVJbnN0YWxsZWQoZG93bmxvYWQuZmlsZU5hbWUpXG4gICAgICAgICAgICA6IGZhbHNlO1xuXG4gICAgICAgIGNvbnN0IHJlbmRlcmVkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgcmVuZGVyZWQuaW5uZXJIVE1MID0gZ2V0TW9kSXRlbVRlbXBsYXRlKG1vZCwgdHlwZSwgaW5zdGFsbGVkKTtcbiAgICAgICAgY29uc3QgYWN0aW9uQnV0dG9uID0gcmVuZGVyZWQucXVlcnlTZWxlY3RvcjxIVE1MRWxlbWVudD4oXCIubW9kQWN0aW9uQnRuXCIpO1xuICAgICAgICBpZiAoYWN0aW9uQnV0dG9uICYmIGRvd25sb2FkKSB7XG4gICAgICAgICAgICBjb25zdCBzdGF0ZTogTW9kQWN0aW9uU3RhdGUgPSB7XG4gICAgICAgICAgICAgICAgYWN0aW9uOiBpbnN0YWxsZWQgPyBcInVuaW5zdGFsbFwiIDogXCJpbnN0YWxsXCIsXG4gICAgICAgICAgICAgICAgZmlsZU5hbWU6IGRvd25sb2FkLmZpbGVOYW1lLFxuICAgICAgICAgICAgICAgIGxpbms6IGRvd25sb2FkLnVybCxcbiAgICAgICAgICAgICAgICB0eXBlOiBtb2RUeXBlLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIG1vZEFjdGlvblN0YXRlcy5zZXQoYWN0aW9uQnV0dG9uLCBzdGF0ZSk7XG4gICAgICAgICAgICBzZXRBY3Rpb25TdGF0ZShhY3Rpb25CdXR0b24sIHN0YXRlLCBzdGF0ZS5hY3Rpb24pO1xuICAgICAgICB9XG4gICAgICAgIG1vZHNMaXN0LmFwcGVuZCguLi5BcnJheS5mcm9tKHJlbmRlcmVkLmNoaWxkTm9kZXMpKTtcbiAgICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBicm93c2VNb2RzKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHNldHRpbmdzQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KFNFTEVDVE9SUy5TRVRUSU5HU19DT05URU5UKTtcbiAgICBpZiAoIXNldHRpbmdzQ29udGVudCkgcmV0dXJuO1xuXG4gICAgc2V0dGluZ3NDb250ZW50LmlubmVySFRNTCA9IGdldE1vZHNUYWJUZW1wbGF0ZSgpO1xuXG4gICAgY29uc3QgbW9kcyA9IGF3YWl0IE1vZE1hbmFnZXIuZmV0Y2hNb2RzKCk7XG4gICAgY29uc3QgbW9kc0xpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vZHMtbGlzdFwiKTtcbiAgICBpZiAoIW1vZHNMaXN0KSByZXR1cm47XG5cbiAgICBjb25zdCBwbHVnaW5zID0gQXJyYXkuaXNBcnJheShtb2RzLnBsdWdpbnMpID8gbW9kcy5wbHVnaW5zIDogW107XG4gICAgY29uc3QgdGhlbWVzID0gQXJyYXkuaXNBcnJheShtb2RzLnRoZW1lcykgPyBtb2RzLnRoZW1lcyA6IFtdO1xuXG4gICAgYXdhaXQgcmVuZGVyUmVnaXN0cnlNb2RzKG1vZHNMaXN0LCBwbHVnaW5zLCBcIlBsdWdpblwiKTtcbiAgICBhd2FpdCByZW5kZXJSZWdpc3RyeU1vZHMobW9kc0xpc3QsIHRoZW1lcywgXCJUaGVtZVwiKTtcblxuICAgIHNldHVwQWN0aW9uQnV0dG9ucygpO1xuICAgIHNldHVwU2VhcmNoQmFyKCk7XG4gICAgc2V0dXBCYWNrQnV0dG9uKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXR1cFNlYXJjaEJhcigpOiB2b2lkIHtcbiAgICBjb25zdCBzZWFyY2hJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTElucHV0RWxlbWVudD4oU0VMRUNUT1JTLlNFQVJDSF9JTlBVVCk7XG4gICAgY29uc3QgYWRkb25zQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MRWxlbWVudD4oU0VMRUNUT1JTLkFERE9OU19MSVNUX0NPTlRBSU5FUik7XG4gICAgaWYgKCFzZWFyY2hJbnB1dCB8fCAhYWRkb25zQ29udGFpbmVyKSByZXR1cm47XG4gICAgaWYgKHNlYXJjaElucHV0LmRhdGFzZXQuc3RyZW1pb0VuaGFuY2VkU2VhcmNoQm91bmQgPT09IFwidHJ1ZVwiKSByZXR1cm47XG5cbiAgICBzZWFyY2hJbnB1dC5kYXRhc2V0LnN0cmVtaW9FbmhhbmNlZFNlYXJjaEJvdW5kID0gXCJ0cnVlXCI7XG4gICAgc2VhcmNoSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsICgpID0+IHtcbiAgICAgICAgY29uc3QgZmlsdGVyID0gc2VhcmNoSW5wdXQudmFsdWUudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGNvbnN0IG1vZEl0ZW1zID0gYWRkb25zQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGw8SFRNTEVsZW1lbnQ+KFNFTEVDVE9SUy5BRERPTl9DT05UQUlORVIpO1xuXG4gICAgICAgIG1vZEl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICBjb25zdCBuYW1lID0gaXRlbS5xdWVyeVNlbGVjdG9yKFNFTEVDVE9SUy5OQU1FX0NPTlRBSU5FUik/LnRleHRDb250ZW50Py50b0xvd2VyQ2FzZSgpID8/IFwiXCI7XG4gICAgICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGl0ZW0ucXVlcnlTZWxlY3RvcihTRUxFQ1RPUlMuREVTQ1JJUFRJT05fSVRFTSk/LnRleHRDb250ZW50Py50b0xvd2VyQ2FzZSgpID8/IFwiXCI7XG4gICAgICAgICAgICBjb25zdCB0eXBlID0gaXRlbS5xdWVyeVNlbGVjdG9yKFNFTEVDVE9SUy5UWVBFU19DT05UQUlORVIpPy50ZXh0Q29udGVudD8udG9Mb3dlckNhc2UoKSA/PyBcIlwiO1xuICAgICAgICAgICAgY29uc3QgbWF0Y2hlcyA9IG5hbWUuaW5jbHVkZXMoZmlsdGVyKSB8fCBkZXNjcmlwdGlvbi5pbmNsdWRlcyhmaWx0ZXIpIHx8IHR5cGUuaW5jbHVkZXMoZmlsdGVyKTtcbiAgICAgICAgICAgIGl0ZW0uc3R5bGUuZGlzcGxheSA9IG1hdGNoZXMgPyBcIlwiIDogXCJub25lXCI7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0dXBCcm93c2VNb2RzQnV0dG9uKCk6IHZvaWQge1xuICAgIEhlbHBlcnMud2FpdEZvckVsbShcIiNicm93c2VQbHVnaW5zVGhlbWVzQnRuXCIpLnRoZW4oKCkgPT4ge1xuICAgICAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJyb3dzZVBsdWdpbnNUaGVtZXNCdG5cIik7XG4gICAgICAgIGlmICghKGJ1dHRvbiBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkgcmV0dXJuO1xuICAgICAgICBpZiAoYnV0dG9uLmRhdGFzZXQuc3RyZW1pb0VuaGFuY2VkQnJvd3NlTW9kc0JvdW5kID09PSBcInRydWVcIikgcmV0dXJuO1xuXG4gICAgICAgIGJ1dHRvbi5kYXRhc2V0LnN0cmVtaW9FbmhhbmNlZEJyb3dzZU1vZHNCb3VuZCA9IFwidHJ1ZVwiO1xuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGlmIChidXR0b24uZGF0YXNldC5zdHJlbWlvRW5oYW5jZWRCcm93c2VNb2RzQnVzeSA9PT0gXCJ0cnVlXCIpIHJldHVybjtcblxuICAgICAgICAgICAgYnV0dG9uLmRhdGFzZXQuc3RyZW1pb0VuaGFuY2VkQnJvd3NlTW9kc0J1c3kgPSBcInRydWVcIjtcbiAgICAgICAgICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJhcmlhLWJ1c3lcIiwgXCJ0cnVlXCIpO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBhd2FpdCBicm93c2VNb2RzKCk7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGxvZ2dlci5lcnJvcihgRmFpbGVkIHRvIGJyb3dzZSBtb2RzOiAke2Vycm9yfWApO1xuICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICBkZWxldGUgYnV0dG9uLmRhdGFzZXQuc3RyZW1pb0VuaGFuY2VkQnJvd3NlTW9kc0J1c3k7XG4gICAgICAgICAgICAgICAgYnV0dG9uLnJlbW92ZUF0dHJpYnV0ZShcImFyaWEtYnVzeVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSkuY2F0Y2goZXJyb3IgPT4gbG9nZ2VyLmVycm9yKGBGYWlsZWQgdG8gc2V0dXAgYnJvd3NlIG1vZHMgYnV0dG9uOiAke2Vycm9yfWApKTtcbn1cbiIsICJleHBvcnQgZnVuY3Rpb24gZ2V0VGhlbWVJY29uKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgY2xhc3M9XCJpY29uXCI+XG4gICAgICAgIDxnPjxwYXRoIGZpbGw9XCJub25lXCIgZD1cIk0wIDBoMjR2MjRIMHpcIj48L3BhdGg+XG4gICAgICAgIDxwYXRoIGQ9XCJNNCAzaDE2YTEgMSAwIDAgMSAxIDF2NWExIDEgMCAwIDEtMSAxSDRhMSAxIDAgMCAxLTEtMVY0YTEgMSAwIDAgMSAxLTF6bTIgOWg2YTEgMSAwIDAgMSAxIDF2M2gxdjZoLTR2LTZoMXYtMkg1YTEgMSAwIDAgMS0xLTF2LTJoMnYxem0xMS43MzIgMS43MzJsMS43NjgtMS43NjggMS43NjggMS43NjhhMi41IDIuNSAwIDEgMS0zLjUzNiAwelwiIHN0eWxlPVwiZmlsbDogY3VycmVudGNvbG9yO1wiPjwvcGF0aD48L2c+PC9zdmc+YDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFBsdWdpbkljb24oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYDxzdmcgaWNvbj1cImFkZG9ucy1vdXRsaW5lXCIgY2xhc3M9XCJpY29uXCIgdmlld0JveD1cIjAgMCA1MTIgNTEyXCIgc3R5bGU9XCJmaWxsOiBjdXJyZW50Y29sb3I7XCI+XG4gICAgICAgIDxwYXRoIGQ9XCJNNDEzLjcgMjQ2LjFIMzg2Yy0wLjUzLTAuMDEtMS4wMy0wLjIzLTEuNC0wLjYtMC4zNy0wLjM3LTAuNTktMC44Ny0wLjYtMS40di03Ny4yYTM4Ljk0IDM4Ljk0IDAgMCAwLTExLjQtMjcuNSAzOC45NCAzOC45NCAwIDAgMC0yNy41LTExLjRoLTc3LjJjLTAuNTMtMC4wMS0xLjAzLTAuMjMtMS40LTAuNi0wLjM3LTAuMzctMC41OS0wLjg3LTAuNi0xLjR2LTI3LjdjMC0yNy4xLTIxLjUtNDkuOS00OC42LTUwLjMtNi41Ny0wLjEtMTMuMDkgMS4wOS0xOS4yIDMuNWE0OS42MTYgNDkuNjE2IDAgMCAwLTE2LjQgMTAuNyA0OS44MjMgNDkuODIzIDAgMCAwLTExIDE2LjIgNDguODk0IDQ4Ljg5NCAwIDAgMC0zLjkgMTkuMnYyOC41Yy0wLjAxIDAuNTMtMC4yMyAxLjAzLTAuNiAxLjQtMC4zNyAwLjM3LTAuODcgMC41OS0xLjQgMC42aC03Ny4yYy0xMC41IDAtMjAuNTcgNC4xNy0yOCAxMS42YTM5LjU5NCAzOS41OTQgMCAwIDAtMTEuNiAyOHY3MC40YzAuMDEgMC41MyAwLjIzIDEuMDMgMC42IDEuNCAwLjM3IDAuMzcgMC44NyAwLjU5IDEuNCAwLjZoMjYuOWMyOS40IDAgNTMuNyAyNS41IDU0LjEgNTQuOCAwLjQgMjkuOS0yMy41IDU3LjItNTMuMyA1Ny4ySDUwYy0wLjUzIDAuMDEtMS4wMyAwLjIzLTEuNCAwLjYtMC4zNyAwLjM3LTAuNTkgMC44Ny0wLjYgMS40djcwLjRjMCAxMC41IDQuMTcgMjAuNTcgMTEuNiAyOHMxNy41IDExLjYgMjggMTEuNmg3MC40YzAuNTMtMC4wMSAxLjAzLTAuMjMgMS40LTAuNiAwLjM3LTAuMzcgMC41OS0wLjg3IDAuNi0xLjRWNDQxLjJjMC0zMC4zIDI0LjgtNTYuNCA1NS01Ny4xIDMwLjEtMC43IDU3IDIwLjMgNTcgNTAuM3YyNy43YzAuMDEgMC41MyAwLjIzIDEuMDMgMC42IDEuNCAwLjM3IDAuMzcgMC44NyAwLjU5IDEuNCAwLjZoNzEuMWEzOC45NCAzOC45NCAwIDAgMCAyNy41LTExLjQgMzguOTU4IDM4Ljk1OCAwIDAgMCAxMS40LTI3LjV2LTc4YzAuMDEtMC41MyAwLjIzLTEuMDMgMC42LTEuNCAwLjM3LTAuMzcgMC44Ny0wLjU5IDEuNC0wLjZoMjguNWMyNy42IDAgNDkuNS0yMi43IDQ5LjUtNTAuNHMtMjMuMi00OC43LTUwLjMtNDguN1pcIiBzdHlsZT1cInN0cm9rZTpjdXJyZW50Y29sb3I7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS13aWR0aDozMjtmaWxsOiBjdXJyZW50Q29sb3I7XCI+PC9wYXRoPjwvc3ZnPmA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBYm91dEljb24oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBjbGFzcz1cImljb25cIj5cbiAgICAgICAgPGc+PHBhdGggZmlsbD1cIm5vbmVcIiBkPVwiTTAgMGgyNHYyNEgwelwiPjwvcGF0aD5cbiAgICAgICAgPHBhdGggZD1cIk0xMiAyMkM2LjQ3NyAyMiAyIDE3LjUyMyAyIDEyUzYuNDc3IDIgMTIgMnMxMCA0LjQ3NyAxMCAxMC00LjQ3NyAxMC0xMCAxMHptLTEtMTF2Nmgydi02aC0yem0wLTR2MmgyVjdoLTJ6XCIgc3R5bGU9XCJmaWxsOmN1cnJlbnRjb2xvclwiPjwvcGF0aD48L2c+PC9zdmc+YDtcbn1cbiIsICJpbXBvcnQgeyBqb2luIH0gZnJvbSBcInBhdGhcIjtcbmltcG9ydCB7IFNUT1JBR0VfS0VZUyB9IGZyb20gXCIuLi9jb25zdGFudHNcIjtcbmltcG9ydCB7IFBsYXRmb3JtTWFuYWdlciB9IGZyb20gXCIuLi9wbGF0Zm9ybS9QbGF0Zm9ybU1hbmFnZXJcIjtcbmltcG9ydCB7IGdldExvZ2dlciB9IGZyb20gXCIuLi91dGlscy9sb2dnZXJcIjtcbmltcG9ydCB7IGlzU2FmZU1vZEZpbGVOYW1lIH0gZnJvbSBcIi4uL3V0aWxzL21vZEZpbGVOYW1lXCI7XG5pbXBvcnQgcHJvcGVydGllcyBmcm9tIFwiLi9Qcm9wZXJ0aWVzXCI7XG5cbmV4cG9ydCB0eXBlIFRoZW1lRWxlbWVudEZhY3RvcnkgPSAoXG4gICAgdGhlbWVQYXRoOiBzdHJpbmcsXG4gICAgdGhlbWVGaWxlOiBzdHJpbmdcbikgPT4gUHJvbWlzZTxIVE1MRWxlbWVudD47XG5cbmNsYXNzIFRoZW1lTWFuYWdlciB7XG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgbG9nZ2VyID0gZ2V0TG9nZ2VyKFwiVGhlbWVNYW5hZ2VyXCIpO1xuXG4gICAgcHVibGljIHN0YXRpYyBhc3luYyBhcHBseVRoZW1lKFxuICAgICAgICByZXF1ZXN0ZWRUaGVtZTogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICAgICAgICBjcmVhdGVUaGVtZUVsZW1lbnQ6IFRoZW1lRWxlbWVudEZhY3RvcnlcbiAgICApOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgY29uc3QgdGhlbWVGaWxlID0gcmVxdWVzdGVkVGhlbWUgPz8gbG9jYWxTdG9yYWdlLmdldEl0ZW0oU1RPUkFHRV9LRVlTLkNVUlJFTlRfVEhFTUUpO1xuXG4gICAgICAgIGlmICghdGhlbWVGaWxlIHx8IHRoZW1lRmlsZSA9PT0gXCJEZWZhdWx0XCIpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWN0aXZlVGhlbWVcIik/LnJlbW92ZSgpO1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oU1RPUkFHRV9LRVlTLkNVUlJFTlRfVEhFTUUsIFwiRGVmYXVsdFwiKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFpc1NhZmVNb2RGaWxlTmFtZSh0aGVtZUZpbGUsIFwidGhlbWVcIikpIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLndhcm4oYFJlZnVzZWQgdG8gYXBwbHkgaW52YWxpZCB0aGVtZSBuYW1lOiAke3RoZW1lRmlsZX1gKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHRoZW1lUGF0aCA9IGpvaW4ocHJvcGVydGllcy50aGVtZXNQYXRoLCB0aGVtZUZpbGUpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKCFhd2FpdCBQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC5leGlzdHModGhlbWVQYXRoKSkge1xuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFNUT1JBR0VfS0VZUy5DVVJSRU5UX1RIRU1FLCBcIkRlZmF1bHRcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBuZXh0VGhlbWUgPSBhd2FpdCBjcmVhdGVUaGVtZUVsZW1lbnQodGhlbWVQYXRoLCB0aGVtZUZpbGUpO1xuICAgICAgICAgICAgbmV4dFRoZW1lLmlkID0gXCJhY3RpdmVUaGVtZVwiO1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhY3RpdmVUaGVtZVwiKT8ucmVtb3ZlKCk7XG4gICAgICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKG5leHRUaGVtZSk7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShTVE9SQUdFX0tFWVMuQ1VSUkVOVF9USEVNRSwgdGhlbWVGaWxlKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoYEZhaWxlZCB0byBhcHBseSB0aGVtZSAke3RoZW1lRmlsZX06ICR7ZXJyb3J9YCk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRoZW1lTWFuYWdlcjtcbiIsICJpbXBvcnQgVGhlbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi9jb3JlL1RoZW1lTWFuYWdlclwiO1xuaW1wb3J0IHsgUGxhdGZvcm1NYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL3BsYXRmb3JtL1BsYXRmb3JtTWFuYWdlclwiO1xuXG5hc3luYyBmdW5jdGlvbiBjcmVhdGVBbmRyb2lkVGhlbWVFbGVtZW50KHRoZW1lUGF0aDogc3RyaW5nKTogUHJvbWlzZTxIVE1MRWxlbWVudD4ge1xuICAgIGNvbnN0IHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICAgIHN0eWxlLnRleHRDb250ZW50ID0gYXdhaXQgUGxhdGZvcm1NYW5hZ2VyLmN1cnJlbnQucmVhZEZpbGUodGhlbWVQYXRoKTtcbiAgICByZXR1cm4gc3R5bGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcHBseUFuZHJvaWRUaGVtZShyZXF1ZXN0ZWRUaGVtZT86IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiBUaGVtZU1hbmFnZXIuYXBwbHlUaGVtZShyZXF1ZXN0ZWRUaGVtZSwgY3JlYXRlQW5kcm9pZFRoZW1lRWxlbWVudCk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztNQUFXLGVBa0JFLG9CQVFBLGVDekJBLGlCQTJKQSxxQkMzSkEsV0FTQSxnQkNMQSxXQ0lQLFFBT0EsUUFDTywyQkEwREEsa0JBUUEsa0JBY1Asc0JBY0EsZ0JBOEJPLGtCQXdDQSx3QkFpRkEsZUFRRixpQkEwQkEsZUFlRSxxQkFjQTs7O0FKcFViLE9BQUMsU0FBVUEsZ0JBQWU7QUFPdEIsUUFBQUEsZUFBYyxlQUFlLElBQUk7QUFRakMsUUFBQUEsZUFBYyxhQUFhLElBQUk7TUFDbkMsR0FBRyxrQkFBa0IsZ0JBQWdCLENBQUEsRUFBRztBQUNqQyxNQUFNLHFCQUFOLGNBQWlDLE1BQU07UUFDMUMsWUFBWSxTQUFTLE1BQU0sTUFBTTtBQUM3QixnQkFBTSxPQUFPO0FBQ2IsZUFBSyxVQUFVO0FBQ2YsZUFBSyxPQUFPO0FB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QUFhO0FBQ3RDLFlBQUksQ0FBQyxTQUFTLGVBQWUsZ0NBQWdDLEdBQUc7QUFDNUQsZ0JBQU0sZUFBZSxTQUFTLGNBQWMsS0FBSztBQUNqRCx1QkFBYSxLQUFLO0FBQ2xCLHVCQUFhLFlBQVk7QUFBQSxZQUNyQjtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFVBQ0o7QUFDQSx3QkFBYyxZQUFZLFlBQVk7QUFBQSxRQUMxQztBQUVBLHlCQUFTLFVBQVUsYUFBYSxlQUFlLFVBQVUsY0FBYztBQUN2RSx5QkFBUyxVQUFVLGVBQWUsaUJBQWlCLFVBQVUsY0FBYztBQUMzRSx5QkFBUyxVQUFVLDJCQUEyQiw0QkFBNEIsVUFBVSxjQUFjO0FBQ2xHLHlCQUFTLFVBQVUsa0JBQWtCLHlCQUF5QixVQUFVLGNBQWM7QUFFdEYsd0JBQWdCLGVBQWUsTUFBTTtBQUNqQyw2QkFBVyxTQUFTO0FBQUEsUUFDeEIsR0FBRyxrQkFBa0I7QUFFckIsd0JBQWdCLGlCQUFpQixZQUFZO0FBQ3pDLGdCQUFNLGVBQWUsTUFBTSxtQkFBVyxXQUFXO0FBQ2pELGNBQUksY0FBYztBQUNkLGtCQUFNLGdCQUFnQixRQUFRLGFBQVMsbUJBQUssbUJBQVcsY0FBYyxNQUFNLENBQUM7QUFBQSxVQUNoRjtBQUFBLFFBQ0osR0FBRyxvQkFBb0I7QUFFdkIsd0JBQWdCLDRCQUE0QixZQUFZO0FBQ3BELGdCQUFNLGtDQUFrQztBQUN4Qyx3Q0FBOEI7QUFBQSxRQUNsQyxHQUFHLGdDQUFnQztBQUVuQyx3QkFBZ0IseUJBQXlCLFlBQVk7QUFDakQsZ0JBQU0sZ0JBQWdCLFFBQVEsU0FBUyxtQkFBVyxZQUFZO0FBQUEsUUFDbEUsR0FBRyw2QkFBNkI7QUFBQSxNQUNwQztBQUFBLElBQ0osQ0FBQyxFQUFFLE1BQU0sU0FBTyx1QkFBTyxNQUFNLG9DQUFvQyxHQUFHLENBQUM7QUFBQSxFQUN6RTsiLAogICJuYW1lcyI6IFsiRXhjZXB0aW9uQ29kZSIsICJyZWdpc3RlclBsdWdpbiIsICJwIiwgInJlc29sdmUiLCAiaGVhZGVycyIsICJTeXN0ZW1CYXJzU3R5bGUiLCAiU3lzdGVtQmFyVHlwZSIsICJEaXJlY3RvcnkiLCAiRW5jb2RpbmciLCAicmVzb2x2ZSIsICJlbnRyeSIsICJ0b1BhdGgiLCAiY3RpbWUiLCAid2ViX2V4cG9ydHMiLCAiaW5pdF93ZWIiLCAicmVzb2x2ZSIsICJyZXNvbHZlIiwgImpvaW4iLCAiYmFzZW5hbWUiLCAid2ViX2V4cG9ydHMiLCAiaW5pdF93ZWIiLCAiQnJvd3NlciIsICJmIiwgIkJyb3dzZXIiLCAicmVzb2x2ZSIsICJjb250ZW50IiwgImYiLCAicmVzb2x2ZSIsICJpbXBvcnRfcGF0aCIsICJpbXBvcnRfcGF0aCIsICJyZXNvbHZlIiwgImltcG9ydF9wYXRoIiwgImxvZ2dlciIsICJsb2dnZXIiLCAiaW1wb3J0X3BhdGgiXQp9Cg==
