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
  var mods_item_default = '<br>\n<div tabindex="0" class="addon-whmdO animation-fade-in addon-container-lC5KN button-container-zVLH6">\n    <div class="logo-container-ZcSSC">\n        <!-- theme preview here -->\n\n        <!-- plugin icon here -->\n    </div>\n\n	<div class="info-container-AdMB6">\n		<div class="name-container-qIAg8" title="{{ name }}">{{ name }}</div>\n		<div class="version-container-zdPyN" title="{{ version }}">{{ version }}</div>\n		<div class="types-container-DaOrg">{{ type }}</div>\n        <div class="description-container-v7Jhe">\n            <b>Description:</b> {{ description }}\n            <br>\n            <b>Author:</b> {{ author }}\n        </div>\n	</div>\n	<div class="buttons-container-g0xXr">\n		<div class="action-buttons-container-xMVmz">\n			<div tabindex="{{ actionTabIndex }}" role="button" aria-disabled="{{ actionDisabled }}" title="{{ actionbtnTitle }}" class="{{ actionbtnClass }} button-container-zVLH6 modActionBtn" data-action="{{ action }}" data-link="{{ download }}" data-type="{{ type }}">\n				<div class="label-OnWh2">{{ actionbtnTitle }}</div>\n			</div>\n		</div>\n		<a {{ repoHref }} target="_blank" rel="noopener noreferrer" aria-disabled="{{ repoDisabled }}" tabindex="{{ repoTabIndex }}" class="share-button-container-s3gwP button-container-zVLH6">\n			<svg class="icon-GxVbY" viewBox="0 0 24 24">\n				<path d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z" style="fill: currentcolor;" />\n			</svg>\n			<div class="label-OnWh2">Open repository</div>\n		</a>\n	</div>\n</div>\n';

  // src/components/about-category/about-category.html
  var about_category_default = '<h4 style="color: white; margin-bottom: 1rem;">\n    Developed By: <p style="display: inline !important;"><a href="https://github.com/REVENGE977" target="_blank" rel="noreferrer">REVENGE977</a></p>\n    <br/>\n    Version: v{{ version }}\n    <br/>\n</h4>\n\n<div class="option-vFOAS">\n    <div class="heading-dYMDt">\n        <div class="label-qI6Vh">Check for updates on startup</div>\n    </div>\n    <div class="content-P2T0i">\n        <div tabindex="-1" class="toggle-container-lZfHP button-container-zVLH6 {{ checkForUpdatesOnStartup }}" id="checkForUpdatesOnStartup">\n            <div class="toggle-toOWM"></div>\n        </div>\n    </div>\n</div>\n\n<div class="option-vFOAS">\n    <div class="heading-dYMDt">\n        <div class="label-qI6Vh">Discord Rich Presence</div>\n    </div>\n    <div class="content-P2T0i">\n        <div tabindex="-1" class="toggle-container-lZfHP button-container-zVLH6 {{ discordrichpresence }}" id="discordrichpresence" style="outline: none;">\n            <div class="toggle-toOWM"></div>\n        </div>\n    </div>\n</div>\n\n<div class="option-vFOAS">\n    <div class="heading-dYMDt">\n        <div class="label-qI6Vh">Window transparency</div>\n    </div>\n    <div class="content-P2T0i">\n        <div tabindex="-1" class="toggle-container-lZfHP button-container-zVLH6 {{ enableTransparentThemes }}" id="enableTransparentThemes" style="outline: none;">\n            <div class="toggle-toOWM"></div>\n        </div>\n    </div>\n</div>\n\n<p style="color:gray;">This option has to be enabled for themes that support transparency to work. (experimental)</p>\n<br/>\n\n<div class="option-vFOAS">\n    <div class="content-P2T0i">\n        <div tabindex="0" title="Community Plugins &amp; Themes" class="button-DNmYL button-container-zVLH6 button" id="browsePluginsThemesBtn">\n            Community Marketplace\n        </div>\n    </div>\n</div>\n\n<div class="option-vFOAS">\n    <div class="content-P2T0i">\n        <div tabindex="0" title="Check For Updates" class="button-DNmYL button-container-zVLH6 button" id="checkforupdatesBtn">\n            Check For Updates\n        </div>\n    </div>\n</div>\n\n<br/>';

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
  function getAboutCategoryTemplate(version, checkForUpdatesOnStartup, discordRichPresence, enableTransparentThemes) {
    const template = templateCache_browser_default.load("/", "about-category");
    return template.replace("{{ version }}", version).replace("{{ checkForUpdatesOnStartup }}", checkForUpdatesOnStartup ? "checked" : "").replace("{{ discordrichpresence }}", discordRichPresence ? "checked" : "").replace("{{ enableTransparentThemes }}", enableTransparentThemes ? "checked" : "");
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BjYXBhY2l0b3IvY29yZS9idWlsZC91dGlsLmpzIiwgIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9AY2FwYWNpdG9yL2NvcmUvYnVpbGQvcnVudGltZS5qcyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvQGNhcGFjaXRvci9jb3JlL2J1aWxkL2dsb2JhbC5qcyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvQGNhcGFjaXRvci9jb3JlL2J1aWxkL3dlYi1wbHVnaW4uanMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BjYXBhY2l0b3IvY29yZS9idWlsZC9jb3JlLXBsdWdpbnMuanMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BjYXBhY2l0b3IvZmlsZXN5c3RlbS9zcmMvZGVmaW5pdGlvbnMudHMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BjYXBhY2l0b3IvZmlsZXN5c3RlbS9zcmMvd2ViLnRzIiwgIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9AY2FwYWNpdG9yL2Jyb3dzZXIvc3JjL3dlYi50cyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcGF0aC1icm93c2VyaWZ5L2luZGV4LmpzIiwgIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jYXBhY2l0b3Itbm9kZWpzL3NyYy93ZWIudHMiLCAiLi4vLi4vLi4vLi4vLi4vc3JjL3BsYXRmb3JtL1BsYXRmb3JtTWFuYWdlci50cyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvQGNhcGFjaXRvci9maWxlc3lzdGVtL3NyYy9pbmRleC50cyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvQGNhcGFjaXRvci9zeW5hcHNlL2Rpc3Qvc3luYXBzZS5tanMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BjYXBhY2l0b3IvYnJvd3Nlci9zcmMvaW5kZXgudHMiLCAiLi4vLi4vLi4vLi4vLi4vc3JjL3BsYXRmb3JtL0NhcGFjaXRvclBsYXRmb3JtLnRzIiwgIi4uLy4uLy4uLy4uLy4uL3NyYy91dGlscy9sb2dnZXIuYnJvd3Nlci50cyIsICIuLi8uLi8uLi8uLi8uLi9zcmMvY29uc3RhbnRzL2luZGV4LnRzIiwgIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL21vZHMtdGFiL21vZHMtdGFiLmh0bWwiLCAiLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvbW9kcy1pdGVtL21vZHMtaXRlbS5odG1sIiwgIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2Fib3V0LWNhdGVnb3J5L2Fib3V0LWNhdGVnb3J5Lmh0bWwiLCAiLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvZGVmYXVsdC10aGVtZS9kZWZhdWx0LXRoZW1lLmh0bWwiLCAiLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvYmFjay1idG4vYmFjay1idG4uaHRtbCIsICIuLi8uLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy90aXRsZS1iYXIvdGl0bGUtYmFyLmh0bWwiLCAiLi4vLi4vLi4vLi4vLi4vc3JjL3V0aWxzL3RlbXBsYXRlQ2FjaGUuYnJvd3Nlci50cyIsICIuLi8uLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy90b2FzdC90b2FzdC50cyIsICIuLi8uLi8uLi8uLi8uLi9zcmMvdXRpbHMvSGVscGVycy50cyIsICIuLi8uLi8uLi8uLi8uLi9zcmMvdXRpbHMvZXNjYXBlSHRtbC50cyIsICIuLi8uLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9wbHVnaW4taXRlbS9wbHVnaW5JdGVtLnRzIiwgIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3RoZW1lLWl0ZW0vdGhlbWVJdGVtLnRzIiwgIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2VuaGFuY2VkLW5hdi9lbmhhbmNlZE5hdi50cyIsICIuLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9Qcm9wZXJ0aWVzLnRzIiwgIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2FwcGx5LXRoZW1lL2FwcGx5VGhlbWUuYnJvd3Nlci50cyIsICIuLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9Nb2RNYW5hZ2VyLnRzIiwgIi4uLy4uLy4uLy4uLy4uL3NyYy9pbnRlcmZhY2VzL01ldGFEYXRhLnRzIiwgIi4uLy4uLy4uLy4uLy4uL3NyYy91dGlscy9QbHVnaW5PcHRpb25TY2hlbWEudHMiLCAiLi4vLi4vLi4vLi4vLi4vc3JjL3V0aWxzL0V4dHJhY3RNZXRhRGF0YS50cyIsICIuLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9QbHVnaW5PcHRpb25zLnRzIiwgIi4uLy4uLy4uLy4uLy4uL3NyYy91dGlscy9yZWxvYWRBcHBsaWNhdGlvbi50cyIsICIuLi8uLi8uLi8uLi8uLi9zcmMvdXRpbHMvbW9kRmlsZU5hbWUudHMiLCAiLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcGx1Z2luLW9wdGlvbnMvcGx1Z2luT3B0aW9ucy50cyIsICIuLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9TZXR0aW5ncy50cyIsICIuLi8uLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9hYm91dC1jYXRlZ29yeS9hYm91dENhdGVnb3J5LnRzIiwgIi4uLy4uLy4uLy4uLy4uL3NyYy9hbmRyb2lkL3ByZWxvYWQudHMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NhcGFjaXRvci1ub2RlanMvc3JjL05vZGVKUy50cyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY2FwYWNpdG9yLW5vZGVqcy9zcmMvaW1wbGVtZW50YXRpb24udHMiLCAiLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvTG9nTWFuYWdlci50cyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvQGNhcGF3ZXNvbWUvY2FwYWNpdG9yLWZpbGUtcGlja2VyL3NyYy9pbmRleC50cyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvQGNhcGF3ZXNvbWUvY2FwYWNpdG9yLWZpbGUtcGlja2VyL3NyYy93ZWIudHMiLCAiLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvU3RyZW1pb0VuaGFuY2VkQXBpLnRzIiwgIi4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL1VzZXJTZXR0aW5ncy50cyIsICIuLi8uLi8uLi8uLi8uLi9zcmMvcHJlbG9hZC9zaGFyZWQvZW5oYW5jZWRTZXR0aW5ncy50cyIsICIuLi8uLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9kZWZhdWx0LXRoZW1lL2RlZmF1bHRUaGVtZS50cyIsICIuLi8uLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9iYWNrLWJ0bi9iYWNrQnRuLnRzIiwgIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL21vZHMtaXRlbS9tb2RzSXRlbS50cyIsICIuLi8uLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9tb2RzLXRhYi9tb2RzVGFiLnRzIiwgIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL21vZC1icm93c2VyL21vZEJyb3dzZXIudHMiLCAiLi4vLi4vLi4vLi4vLi4vc3JjL3ByZWxvYWQvc2hhcmVkL2ljb25zLnRzIiwgIi4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL1RoZW1lTWFuYWdlci50cyIsICIuLi8uLi8uLi8uLi8uLi9zcmMvcHJlbG9hZC9hbmRyb2lkL3RoZW1lLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJleHBvcnQgdmFyIEV4Y2VwdGlvbkNvZGU7XG4oZnVuY3Rpb24gKEV4Y2VwdGlvbkNvZGUpIHtcbiAgICAvKipcbiAgICAgKiBBUEkgaXMgbm90IGltcGxlbWVudGVkLlxuICAgICAqXG4gICAgICogVGhpcyB1c3VhbGx5IG1lYW5zIHRoZSBBUEkgY2FuJ3QgYmUgdXNlZCBiZWNhdXNlIGl0IGlzIG5vdCBpbXBsZW1lbnRlZCBmb3JcbiAgICAgKiB0aGUgY3VycmVudCBwbGF0Zm9ybS5cbiAgICAgKi9cbiAgICBFeGNlcHRpb25Db2RlW1wiVW5pbXBsZW1lbnRlZFwiXSA9IFwiVU5JTVBMRU1FTlRFRFwiO1xuICAgIC8qKlxuICAgICAqIEFQSSBpcyBub3QgYXZhaWxhYmxlLlxuICAgICAqXG4gICAgICogVGhpcyBtZWFucyB0aGUgQVBJIGNhbid0IGJlIHVzZWQgcmlnaHQgbm93IGJlY2F1c2U6XG4gICAgICogICAtIGl0IGlzIGN1cnJlbnRseSBtaXNzaW5nIGEgcHJlcmVxdWlzaXRlLCBzdWNoIGFzIG5ldHdvcmsgY29ubmVjdGl2aXR5XG4gICAgICogICAtIGl0IHJlcXVpcmVzIGEgcGFydGljdWxhciBwbGF0Zm9ybSBvciBicm93c2VyIHZlcnNpb25cbiAgICAgKi9cbiAgICBFeGNlcHRpb25Db2RlW1wiVW5hdmFpbGFibGVcIl0gPSBcIlVOQVZBSUxBQkxFXCI7XG59KShFeGNlcHRpb25Db2RlIHx8IChFeGNlcHRpb25Db2RlID0ge30pKTtcbmV4cG9ydCBjbGFzcyBDYXBhY2l0b3JFeGNlcHRpb24gZXh0ZW5kcyBFcnJvciB7XG4gICAgY29uc3RydWN0b3IobWVzc2FnZSwgY29kZSwgZGF0YSkge1xuICAgICAgICBzdXBlcihtZXNzYWdlKTtcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICAgICAgdGhpcy5jb2RlID0gY29kZTtcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICB9XG59XG5leHBvcnQgY29uc3QgZ2V0UGxhdGZvcm1JZCA9ICh3aW4pID0+IHtcbiAgICB2YXIgX2EsIF9iO1xuICAgIGlmICh3aW4gPT09IG51bGwgfHwgd2luID09PSB2b2lkIDAgPyB2b2lkIDAgOiB3aW4uYW5kcm9pZEJyaWRnZSkge1xuICAgICAgICByZXR1cm4gJ2FuZHJvaWQnO1xuICAgIH1cbiAgICBlbHNlIGlmICgoX2IgPSAoX2EgPSB3aW4gPT09IG51bGwgfHwgd2luID09PSB2b2lkIDAgPyB2b2lkIDAgOiB3aW4ud2Via2l0KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubWVzc2FnZUhhbmRsZXJzKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuYnJpZGdlKSB7XG4gICAgICAgIHJldHVybiAnaW9zJztcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiAnd2ViJztcbiAgICB9XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dXRpbC5qcy5tYXAiLCAiaW1wb3J0IHsgQ2FwYWNpdG9yRXhjZXB0aW9uLCBnZXRQbGF0Zm9ybUlkLCBFeGNlcHRpb25Db2RlIH0gZnJvbSAnLi91dGlsJztcbmV4cG9ydCBjb25zdCBjcmVhdGVDYXBhY2l0b3IgPSAod2luKSA9PiB7XG4gICAgY29uc3QgY2FwQ3VzdG9tUGxhdGZvcm0gPSB3aW4uQ2FwYWNpdG9yQ3VzdG9tUGxhdGZvcm0gfHwgbnVsbDtcbiAgICBjb25zdCBjYXAgPSB3aW4uQ2FwYWNpdG9yIHx8IHt9O1xuICAgIGNvbnN0IFBsdWdpbnMgPSAoY2FwLlBsdWdpbnMgPSBjYXAuUGx1Z2lucyB8fCB7fSk7XG4gICAgY29uc3QgZ2V0UGxhdGZvcm0gPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBjYXBDdXN0b21QbGF0Zm9ybSAhPT0gbnVsbCA/IGNhcEN1c3RvbVBsYXRmb3JtLm5hbWUgOiBnZXRQbGF0Zm9ybUlkKHdpbik7XG4gICAgfTtcbiAgICBjb25zdCBpc05hdGl2ZVBsYXRmb3JtID0gKCkgPT4gZ2V0UGxhdGZvcm0oKSAhPT0gJ3dlYic7XG4gICAgY29uc3QgaXNQbHVnaW5BdmFpbGFibGUgPSAocGx1Z2luTmFtZSkgPT4ge1xuICAgICAgICBjb25zdCBwbHVnaW4gPSByZWdpc3RlcmVkUGx1Z2lucy5nZXQocGx1Z2luTmFtZSk7XG4gICAgICAgIGlmIChwbHVnaW4gPT09IG51bGwgfHwgcGx1Z2luID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwbHVnaW4ucGxhdGZvcm1zLmhhcyhnZXRQbGF0Zm9ybSgpKSkge1xuICAgICAgICAgICAgLy8gSlMgaW1wbGVtZW50YXRpb24gYXZhaWxhYmxlIGZvciB0aGUgY3VycmVudCBwbGF0Zm9ybS5cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChnZXRQbHVnaW5IZWFkZXIocGx1Z2luTmFtZSkpIHtcbiAgICAgICAgICAgIC8vIE5hdGl2ZSBpbXBsZW1lbnRhdGlvbiBhdmFpbGFibGUuXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgICBjb25zdCBnZXRQbHVnaW5IZWFkZXIgPSAocGx1Z2luTmFtZSkgPT4geyB2YXIgX2E7IHJldHVybiAoX2EgPSBjYXAuUGx1Z2luSGVhZGVycykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmZpbmQoKGgpID0+IGgubmFtZSA9PT0gcGx1Z2luTmFtZSk7IH07XG4gICAgY29uc3QgaGFuZGxlRXJyb3IgPSAoZXJyKSA9PiB3aW4uY29uc29sZS5lcnJvcihlcnIpO1xuICAgIGNvbnN0IHJlZ2lzdGVyZWRQbHVnaW5zID0gbmV3IE1hcCgpO1xuICAgIGNvbnN0IHJlZ2lzdGVyUGx1Z2luID0gKHBsdWdpbk5hbWUsIGpzSW1wbGVtZW50YXRpb25zID0ge30pID0+IHtcbiAgICAgICAgY29uc3QgcmVnaXN0ZXJlZFBsdWdpbiA9IHJlZ2lzdGVyZWRQbHVnaW5zLmdldChwbHVnaW5OYW1lKTtcbiAgICAgICAgaWYgKHJlZ2lzdGVyZWRQbHVnaW4pIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgQ2FwYWNpdG9yIHBsdWdpbiBcIiR7cGx1Z2luTmFtZX1cIiBhbHJlYWR5IHJlZ2lzdGVyZWQuIENhbm5vdCByZWdpc3RlciBwbHVnaW5zIHR3aWNlLmApO1xuICAgICAgICAgICAgcmV0dXJuIHJlZ2lzdGVyZWRQbHVnaW4ucHJveHk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcGxhdGZvcm0gPSBnZXRQbGF0Zm9ybSgpO1xuICAgICAgICBjb25zdCBwbHVnaW5IZWFkZXIgPSBnZXRQbHVnaW5IZWFkZXIocGx1Z2luTmFtZSk7XG4gICAgICAgIGxldCBqc0ltcGxlbWVudGF0aW9uO1xuICAgICAgICBjb25zdCBsb2FkUGx1Z2luSW1wbGVtZW50YXRpb24gPSBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoIWpzSW1wbGVtZW50YXRpb24gJiYgcGxhdGZvcm0gaW4ganNJbXBsZW1lbnRhdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBqc0ltcGxlbWVudGF0aW9uID1cbiAgICAgICAgICAgICAgICAgICAgdHlwZW9mIGpzSW1wbGVtZW50YXRpb25zW3BsYXRmb3JtXSA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICAgICAgICAgICAgICAgICAgPyAoanNJbXBsZW1lbnRhdGlvbiA9IGF3YWl0IGpzSW1wbGVtZW50YXRpb25zW3BsYXRmb3JtXSgpKVxuICAgICAgICAgICAgICAgICAgICAgICAgOiAoanNJbXBsZW1lbnRhdGlvbiA9IGpzSW1wbGVtZW50YXRpb25zW3BsYXRmb3JtXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjYXBDdXN0b21QbGF0Zm9ybSAhPT0gbnVsbCAmJiAhanNJbXBsZW1lbnRhdGlvbiAmJiAnd2ViJyBpbiBqc0ltcGxlbWVudGF0aW9ucykge1xuICAgICAgICAgICAgICAgIGpzSW1wbGVtZW50YXRpb24gPVxuICAgICAgICAgICAgICAgICAgICB0eXBlb2YganNJbXBsZW1lbnRhdGlvbnNbJ3dlYiddID09PSAnZnVuY3Rpb24nXG4gICAgICAgICAgICAgICAgICAgICAgICA/IChqc0ltcGxlbWVudGF0aW9uID0gYXdhaXQganNJbXBsZW1lbnRhdGlvbnNbJ3dlYiddKCkpXG4gICAgICAgICAgICAgICAgICAgICAgICA6IChqc0ltcGxlbWVudGF0aW9uID0ganNJbXBsZW1lbnRhdGlvbnNbJ3dlYiddKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBqc0ltcGxlbWVudGF0aW9uO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBjcmVhdGVQbHVnaW5NZXRob2QgPSAoaW1wbCwgcHJvcCkgPT4ge1xuICAgICAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgICAgIGlmIChwbHVnaW5IZWFkZXIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBtZXRob2RIZWFkZXIgPSBwbHVnaW5IZWFkZXIgPT09IG51bGwgfHwgcGx1Z2luSGVhZGVyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwbHVnaW5IZWFkZXIubWV0aG9kcy5maW5kKChtKSA9PiBwcm9wID09PSBtLm5hbWUpO1xuICAgICAgICAgICAgICAgIGlmIChtZXRob2RIZWFkZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1ldGhvZEhlYWRlci5ydHlwZSA9PT0gJ3Byb21pc2UnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKG9wdGlvbnMpID0+IGNhcC5uYXRpdmVQcm9taXNlKHBsdWdpbk5hbWUsIHByb3AudG9TdHJpbmcoKSwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKG9wdGlvbnMsIGNhbGxiYWNrKSA9PiBjYXAubmF0aXZlQ2FsbGJhY2socGx1Z2luTmFtZSwgcHJvcC50b1N0cmluZygpLCBvcHRpb25zLCBjYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaW1wbCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKF9hID0gaW1wbFtwcm9wXSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmJpbmQoaW1wbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoaW1wbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoX2IgPSBpbXBsW3Byb3BdKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuYmluZChpbXBsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBDYXBhY2l0b3JFeGNlcHRpb24oYFwiJHtwbHVnaW5OYW1lfVwiIHBsdWdpbiBpcyBub3QgaW1wbGVtZW50ZWQgb24gJHtwbGF0Zm9ybX1gLCBFeGNlcHRpb25Db2RlLlVuaW1wbGVtZW50ZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBjcmVhdGVQbHVnaW5NZXRob2RXcmFwcGVyID0gKHByb3ApID0+IHtcbiAgICAgICAgICAgIGxldCByZW1vdmU7XG4gICAgICAgICAgICBjb25zdCB3cmFwcGVyID0gKC4uLmFyZ3MpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBwID0gbG9hZFBsdWdpbkltcGxlbWVudGF0aW9uKCkudGhlbigoaW1wbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBmbiA9IGNyZWF0ZVBsdWdpbk1ldGhvZChpbXBsLCBwcm9wKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwID0gZm4oLi4uYXJncyk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZW1vdmUgPSBwID09PSBudWxsIHx8IHAgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHAucmVtb3ZlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQ2FwYWNpdG9yRXhjZXB0aW9uKGBcIiR7cGx1Z2luTmFtZX0uJHtwcm9wfSgpXCIgaXMgbm90IGltcGxlbWVudGVkIG9uICR7cGxhdGZvcm19YCwgRXhjZXB0aW9uQ29kZS5VbmltcGxlbWVudGVkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmIChwcm9wID09PSAnYWRkTGlzdGVuZXInKSB7XG4gICAgICAgICAgICAgICAgICAgIHAucmVtb3ZlID0gYXN5bmMgKCkgPT4gcmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBwO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIC8vIFNvbWUgZmxhaXIg4pyoXG4gICAgICAgICAgICB3cmFwcGVyLnRvU3RyaW5nID0gKCkgPT4gYCR7cHJvcC50b1N0cmluZygpfSgpIHsgW2NhcGFjaXRvciBjb2RlXSB9YDtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3cmFwcGVyLCAnbmFtZScsIHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogcHJvcCxcbiAgICAgICAgICAgICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHdyYXBwZXI7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGFkZExpc3RlbmVyID0gY3JlYXRlUGx1Z2luTWV0aG9kV3JhcHBlcignYWRkTGlzdGVuZXInKTtcbiAgICAgICAgY29uc3QgcmVtb3ZlTGlzdGVuZXIgPSBjcmVhdGVQbHVnaW5NZXRob2RXcmFwcGVyKCdyZW1vdmVMaXN0ZW5lcicpO1xuICAgICAgICBjb25zdCBhZGRMaXN0ZW5lck5hdGl2ZSA9IChldmVudE5hbWUsIGNhbGxiYWNrKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjYWxsID0gYWRkTGlzdGVuZXIoeyBldmVudE5hbWUgfSwgY2FsbGJhY2spO1xuICAgICAgICAgICAgY29uc3QgcmVtb3ZlID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNhbGxiYWNrSWQgPSBhd2FpdCBjYWxsO1xuICAgICAgICAgICAgICAgIHJlbW92ZUxpc3RlbmVyKHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnROYW1lLFxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFja0lkLFxuICAgICAgICAgICAgICAgIH0sIGNhbGxiYWNrKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjb25zdCBwID0gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IGNhbGwudGhlbigoKSA9PiByZXNvbHZlKHsgcmVtb3ZlIH0pKSk7XG4gICAgICAgICAgICBwLnJlbW92ZSA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYFVzaW5nIGFkZExpc3RlbmVyKCkgd2l0aG91dCAnYXdhaXQnIGlzIGRlcHJlY2F0ZWQuYCk7XG4gICAgICAgICAgICAgICAgYXdhaXQgcmVtb3ZlKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmV0dXJuIHA7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHByb3h5ID0gbmV3IFByb3h5KHt9LCB7XG4gICAgICAgICAgICBnZXQoXywgcHJvcCkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAocHJvcCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QvaXNzdWVzLzIwMDMwXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJyQkdHlwZW9mJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3RvSlNPTic6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKCkgPT4gKHt9KTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnYWRkTGlzdGVuZXInOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBsdWdpbkhlYWRlciA/IGFkZExpc3RlbmVyTmF0aXZlIDogYWRkTGlzdGVuZXI7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3JlbW92ZUxpc3RlbmVyJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZW1vdmVMaXN0ZW5lcjtcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjcmVhdGVQbHVnaW5NZXRob2RXcmFwcGVyKHByb3ApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgICBQbHVnaW5zW3BsdWdpbk5hbWVdID0gcHJveHk7XG4gICAgICAgIHJlZ2lzdGVyZWRQbHVnaW5zLnNldChwbHVnaW5OYW1lLCB7XG4gICAgICAgICAgICBuYW1lOiBwbHVnaW5OYW1lLFxuICAgICAgICAgICAgcHJveHksXG4gICAgICAgICAgICBwbGF0Zm9ybXM6IG5ldyBTZXQoWy4uLk9iamVjdC5rZXlzKGpzSW1wbGVtZW50YXRpb25zKSwgLi4uKHBsdWdpbkhlYWRlciA/IFtwbGF0Zm9ybV0gOiBbXSldKSxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBwcm94eTtcbiAgICB9O1xuICAgIC8vIEFkZCBpbiBjb252ZXJ0RmlsZVNyYyBmb3Igd2ViLCBpdCB3aWxsIGFscmVhZHkgYmUgYXZhaWxhYmxlIGluIG5hdGl2ZSBjb250ZXh0XG4gICAgaWYgKCFjYXAuY29udmVydEZpbGVTcmMpIHtcbiAgICAgICAgY2FwLmNvbnZlcnRGaWxlU3JjID0gKGZpbGVQYXRoKSA9PiBmaWxlUGF0aDtcbiAgICB9XG4gICAgY2FwLmdldFBsYXRmb3JtID0gZ2V0UGxhdGZvcm07XG4gICAgY2FwLmhhbmRsZUVycm9yID0gaGFuZGxlRXJyb3I7XG4gICAgY2FwLmlzTmF0aXZlUGxhdGZvcm0gPSBpc05hdGl2ZVBsYXRmb3JtO1xuICAgIGNhcC5pc1BsdWdpbkF2YWlsYWJsZSA9IGlzUGx1Z2luQXZhaWxhYmxlO1xuICAgIGNhcC5yZWdpc3RlclBsdWdpbiA9IHJlZ2lzdGVyUGx1Z2luO1xuICAgIGNhcC5FeGNlcHRpb24gPSBDYXBhY2l0b3JFeGNlcHRpb247XG4gICAgY2FwLkRFQlVHID0gISFjYXAuREVCVUc7XG4gICAgY2FwLmlzTG9nZ2luZ0VuYWJsZWQgPSAhIWNhcC5pc0xvZ2dpbmdFbmFibGVkO1xuICAgIHJldHVybiBjYXA7XG59O1xuZXhwb3J0IGNvbnN0IGluaXRDYXBhY2l0b3JHbG9iYWwgPSAod2luKSA9PiAod2luLkNhcGFjaXRvciA9IGNyZWF0ZUNhcGFjaXRvcih3aW4pKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJ1bnRpbWUuanMubWFwIiwgImltcG9ydCB7IGluaXRDYXBhY2l0b3JHbG9iYWwgfSBmcm9tICcuL3J1bnRpbWUnO1xuZXhwb3J0IGNvbnN0IENhcGFjaXRvciA9IC8qI19fUFVSRV9fKi8gaW5pdENhcGFjaXRvckdsb2JhbCh0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gJ3VuZGVmaW5lZCdcbiAgICA/IGdsb2JhbFRoaXNcbiAgICA6IHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJ1xuICAgICAgICA/IHNlbGZcbiAgICAgICAgOiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xuICAgICAgICAgICAgPyB3aW5kb3dcbiAgICAgICAgICAgIDogdHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCdcbiAgICAgICAgICAgICAgICA/IGdsb2JhbFxuICAgICAgICAgICAgICAgIDoge30pO1xuZXhwb3J0IGNvbnN0IHJlZ2lzdGVyUGx1Z2luID0gQ2FwYWNpdG9yLnJlZ2lzdGVyUGx1Z2luO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Z2xvYmFsLmpzLm1hcCIsICJpbXBvcnQgeyBDYXBhY2l0b3IgfSBmcm9tICcuL2dsb2JhbCc7XG5pbXBvcnQgeyBFeGNlcHRpb25Db2RlIH0gZnJvbSAnLi91dGlsJztcbi8qKlxuICogQmFzZSBjbGFzcyB3ZWIgcGx1Z2lucyBzaG91bGQgZXh0ZW5kLlxuICovXG5leHBvcnQgY2xhc3MgV2ViUGx1Z2luIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMgPSB7fTtcbiAgICAgICAgdGhpcy5yZXRhaW5lZEV2ZW50QXJndW1lbnRzID0ge307XG4gICAgICAgIHRoaXMud2luZG93TGlzdGVuZXJzID0ge307XG4gICAgfVxuICAgIGFkZExpc3RlbmVyKGV2ZW50TmFtZSwgbGlzdGVuZXJGdW5jKSB7XG4gICAgICAgIGxldCBmaXJzdExpc3RlbmVyID0gZmFsc2U7XG4gICAgICAgIGNvbnN0IGxpc3RlbmVycyA9IHRoaXMubGlzdGVuZXJzW2V2ZW50TmFtZV07XG4gICAgICAgIGlmICghbGlzdGVuZXJzKSB7XG4gICAgICAgICAgICB0aGlzLmxpc3RlbmVyc1tldmVudE5hbWVdID0gW107XG4gICAgICAgICAgICBmaXJzdExpc3RlbmVyID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxpc3RlbmVyc1tldmVudE5hbWVdLnB1c2gobGlzdGVuZXJGdW5jKTtcbiAgICAgICAgLy8gSWYgd2UgaGF2ZW4ndCBhZGRlZCBhIHdpbmRvdyBsaXN0ZW5lciBmb3IgdGhpcyBldmVudCBhbmQgaXQgcmVxdWlyZXMgb25lLFxuICAgICAgICAvLyBnbyBhaGVhZCBhbmQgYWRkIGl0XG4gICAgICAgIGNvbnN0IHdpbmRvd0xpc3RlbmVyID0gdGhpcy53aW5kb3dMaXN0ZW5lcnNbZXZlbnROYW1lXTtcbiAgICAgICAgaWYgKHdpbmRvd0xpc3RlbmVyICYmICF3aW5kb3dMaXN0ZW5lci5yZWdpc3RlcmVkKSB7XG4gICAgICAgICAgICB0aGlzLmFkZFdpbmRvd0xpc3RlbmVyKHdpbmRvd0xpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZmlyc3RMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5zZW5kUmV0YWluZWRBcmd1bWVudHNGb3JFdmVudChldmVudE5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlbW92ZSA9IGFzeW5jICgpID0+IHRoaXMucmVtb3ZlTGlzdGVuZXIoZXZlbnROYW1lLCBsaXN0ZW5lckZ1bmMpO1xuICAgICAgICBjb25zdCBwID0gUHJvbWlzZS5yZXNvbHZlKHsgcmVtb3ZlIH0pO1xuICAgICAgICByZXR1cm4gcDtcbiAgICB9XG4gICAgYXN5bmMgcmVtb3ZlQWxsTGlzdGVuZXJzKCkge1xuICAgICAgICB0aGlzLmxpc3RlbmVycyA9IHt9O1xuICAgICAgICBmb3IgKGNvbnN0IGxpc3RlbmVyIGluIHRoaXMud2luZG93TGlzdGVuZXJzKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZVdpbmRvd0xpc3RlbmVyKHRoaXMud2luZG93TGlzdGVuZXJzW2xpc3RlbmVyXSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy53aW5kb3dMaXN0ZW5lcnMgPSB7fTtcbiAgICB9XG4gICAgbm90aWZ5TGlzdGVuZXJzKGV2ZW50TmFtZSwgZGF0YSwgcmV0YWluVW50aWxDb25zdW1lZCkge1xuICAgICAgICBjb25zdCBsaXN0ZW5lcnMgPSB0aGlzLmxpc3RlbmVyc1tldmVudE5hbWVdO1xuICAgICAgICBpZiAoIWxpc3RlbmVycykge1xuICAgICAgICAgICAgaWYgKHJldGFpblVudGlsQ29uc3VtZWQpIHtcbiAgICAgICAgICAgICAgICBsZXQgYXJncyA9IHRoaXMucmV0YWluZWRFdmVudEFyZ3VtZW50c1tldmVudE5hbWVdO1xuICAgICAgICAgICAgICAgIGlmICghYXJncykge1xuICAgICAgICAgICAgICAgICAgICBhcmdzID0gW107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGFyZ3MucHVzaChkYXRhKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJldGFpbmVkRXZlbnRBcmd1bWVudHNbZXZlbnROYW1lXSA9IGFyZ3M7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGlzdGVuZXJzLmZvckVhY2goKGxpc3RlbmVyKSA9PiBsaXN0ZW5lcihkYXRhKSk7XG4gICAgfVxuICAgIGhhc0xpc3RlbmVycyhldmVudE5hbWUpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICByZXR1cm4gISEoKF9hID0gdGhpcy5saXN0ZW5lcnNbZXZlbnROYW1lXSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmxlbmd0aCk7XG4gICAgfVxuICAgIHJlZ2lzdGVyV2luZG93TGlzdGVuZXIod2luZG93RXZlbnROYW1lLCBwbHVnaW5FdmVudE5hbWUpIHtcbiAgICAgICAgdGhpcy53aW5kb3dMaXN0ZW5lcnNbcGx1Z2luRXZlbnROYW1lXSA9IHtcbiAgICAgICAgICAgIHJlZ2lzdGVyZWQ6IGZhbHNlLFxuICAgICAgICAgICAgd2luZG93RXZlbnROYW1lLFxuICAgICAgICAgICAgcGx1Z2luRXZlbnROYW1lLFxuICAgICAgICAgICAgaGFuZGxlcjogKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5ub3RpZnlMaXN0ZW5lcnMocGx1Z2luRXZlbnROYW1lLCBldmVudCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgIH1cbiAgICB1bmltcGxlbWVudGVkKG1zZyA9ICdub3QgaW1wbGVtZW50ZWQnKSB7XG4gICAgICAgIHJldHVybiBuZXcgQ2FwYWNpdG9yLkV4Y2VwdGlvbihtc2csIEV4Y2VwdGlvbkNvZGUuVW5pbXBsZW1lbnRlZCk7XG4gICAgfVxuICAgIHVuYXZhaWxhYmxlKG1zZyA9ICdub3QgYXZhaWxhYmxlJykge1xuICAgICAgICByZXR1cm4gbmV3IENhcGFjaXRvci5FeGNlcHRpb24obXNnLCBFeGNlcHRpb25Db2RlLlVuYXZhaWxhYmxlKTtcbiAgICB9XG4gICAgYXN5bmMgcmVtb3ZlTGlzdGVuZXIoZXZlbnROYW1lLCBsaXN0ZW5lckZ1bmMpIHtcbiAgICAgICAgY29uc3QgbGlzdGVuZXJzID0gdGhpcy5saXN0ZW5lcnNbZXZlbnROYW1lXTtcbiAgICAgICAgaWYgKCFsaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpbmRleCA9IGxpc3RlbmVycy5pbmRleE9mKGxpc3RlbmVyRnVuYyk7XG4gICAgICAgIHRoaXMubGlzdGVuZXJzW2V2ZW50TmFtZV0uc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgLy8gSWYgdGhlcmUgYXJlIG5vIG1vcmUgbGlzdGVuZXJzIGZvciB0aGlzIHR5cGUgb2YgZXZlbnQsXG4gICAgICAgIC8vIHJlbW92ZSB0aGUgd2luZG93IGxpc3RlbmVyXG4gICAgICAgIGlmICghdGhpcy5saXN0ZW5lcnNbZXZlbnROYW1lXS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlV2luZG93TGlzdGVuZXIodGhpcy53aW5kb3dMaXN0ZW5lcnNbZXZlbnROYW1lXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYWRkV2luZG93TGlzdGVuZXIoaGFuZGxlKSB7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKGhhbmRsZS53aW5kb3dFdmVudE5hbWUsIGhhbmRsZS5oYW5kbGVyKTtcbiAgICAgICAgaGFuZGxlLnJlZ2lzdGVyZWQgPSB0cnVlO1xuICAgIH1cbiAgICByZW1vdmVXaW5kb3dMaXN0ZW5lcihoYW5kbGUpIHtcbiAgICAgICAgaWYgKCFoYW5kbGUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihoYW5kbGUud2luZG93RXZlbnROYW1lLCBoYW5kbGUuaGFuZGxlcik7XG4gICAgICAgIGhhbmRsZS5yZWdpc3RlcmVkID0gZmFsc2U7XG4gICAgfVxuICAgIHNlbmRSZXRhaW5lZEFyZ3VtZW50c0ZvckV2ZW50KGV2ZW50TmFtZSkge1xuICAgICAgICBjb25zdCBhcmdzID0gdGhpcy5yZXRhaW5lZEV2ZW50QXJndW1lbnRzW2V2ZW50TmFtZV07XG4gICAgICAgIGlmICghYXJncykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGRlbGV0ZSB0aGlzLnJldGFpbmVkRXZlbnRBcmd1bWVudHNbZXZlbnROYW1lXTtcbiAgICAgICAgYXJncy5mb3JFYWNoKChhcmcpID0+IHtcbiAgICAgICAgICAgIHRoaXMubm90aWZ5TGlzdGVuZXJzKGV2ZW50TmFtZSwgYXJnKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9d2ViLXBsdWdpbi5qcy5tYXAiLCAiaW1wb3J0IHsgcmVnaXN0ZXJQbHVnaW4gfSBmcm9tICcuL2dsb2JhbCc7XG5pbXBvcnQgeyBXZWJQbHVnaW4gfSBmcm9tICcuL3dlYi1wbHVnaW4nO1xuZXhwb3J0IGNvbnN0IFdlYlZpZXcgPSAvKiNfX1BVUkVfXyovIHJlZ2lzdGVyUGx1Z2luKCdXZWJWaWV3Jyk7XG4vKioqKioqKiogRU5EIFdFQiBWSUVXIFBMVUdJTiAqKioqKioqKi9cbi8qKioqKioqKiBDT09LSUVTIFBMVUdJTiAqKioqKioqKi9cbi8qKlxuICogU2FmZWx5IHdlYiBlbmNvZGUgYSBzdHJpbmcgdmFsdWUgKGluc3BpcmVkIGJ5IGpzLWNvb2tpZSlcbiAqIEBwYXJhbSBzdHIgVGhlIHN0cmluZyB2YWx1ZSB0byBlbmNvZGVcbiAqL1xuY29uc3QgZW5jb2RlID0gKHN0cikgPT4gZW5jb2RlVVJJQ29tcG9uZW50KHN0cilcbiAgICAucmVwbGFjZSgvJSgyWzM0NkJdfDVFfDYwfDdDKS9nLCBkZWNvZGVVUklDb21wb25lbnQpXG4gICAgLnJlcGxhY2UoL1soKV0vZywgZXNjYXBlKTtcbi8qKlxuICogU2FmZWx5IHdlYiBkZWNvZGUgYSBzdHJpbmcgdmFsdWUgKGluc3BpcmVkIGJ5IGpzLWNvb2tpZSlcbiAqIEBwYXJhbSBzdHIgVGhlIHN0cmluZyB2YWx1ZSB0byBkZWNvZGVcbiAqL1xuY29uc3QgZGVjb2RlID0gKHN0cikgPT4gc3RyLnJlcGxhY2UoLyglW1xcZEEtRl17Mn0pKy9naSwgZGVjb2RlVVJJQ29tcG9uZW50KTtcbmV4cG9ydCBjbGFzcyBDYXBhY2l0b3JDb29raWVzUGx1Z2luV2ViIGV4dGVuZHMgV2ViUGx1Z2luIHtcbiAgICBhc3luYyBnZXRDb29raWVzKCkge1xuICAgICAgICBjb25zdCBjb29raWVzID0gZG9jdW1lbnQuY29va2llO1xuICAgICAgICBjb25zdCBjb29raWVNYXAgPSB7fTtcbiAgICAgICAgY29va2llcy5zcGxpdCgnOycpLmZvckVhY2goKGNvb2tpZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGNvb2tpZS5sZW5ndGggPD0gMClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAvLyBSZXBsYWNlIGZpcnN0IFwiPVwiIHdpdGggQ0FQX0NPT0tJRSB0byBwcmV2ZW50IHNwbGl0dGluZyBvbiBhZGRpdGlvbmFsIFwiPVwiXG4gICAgICAgICAgICBsZXQgW2tleSwgdmFsdWVdID0gY29va2llLnJlcGxhY2UoLz0vLCAnQ0FQX0NPT0tJRScpLnNwbGl0KCdDQVBfQ09PS0lFJyk7XG4gICAgICAgICAgICBrZXkgPSBkZWNvZGUoa2V5KS50cmltKCk7XG4gICAgICAgICAgICB2YWx1ZSA9IGRlY29kZSh2YWx1ZSkudHJpbSgpO1xuICAgICAgICAgICAgY29va2llTWFwW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBjb29raWVNYXA7XG4gICAgfVxuICAgIGFzeW5jIHNldENvb2tpZShvcHRpb25zKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBTYWZlbHkgRW5jb2RlZCBLZXkvVmFsdWVcbiAgICAgICAgICAgIGNvbnN0IGVuY29kZWRLZXkgPSBlbmNvZGUob3B0aW9ucy5rZXkpO1xuICAgICAgICAgICAgY29uc3QgZW5jb2RlZFZhbHVlID0gZW5jb2RlKG9wdGlvbnMudmFsdWUpO1xuICAgICAgICAgICAgLy8gQ2xlYW4gJiBzYW5pdGl6ZSBvcHRpb25zXG4gICAgICAgICAgICBjb25zdCBleHBpcmVzID0gYDsgZXhwaXJlcz0keyhvcHRpb25zLmV4cGlyZXMgfHwgJycpLnJlcGxhY2UoJ2V4cGlyZXM9JywgJycpfWA7IC8vIERlZmF1bHQgaXMgXCI7IGV4cGlyZXM9XCJcbiAgICAgICAgICAgIGNvbnN0IHBhdGggPSAob3B0aW9ucy5wYXRoIHx8ICcvJykucmVwbGFjZSgncGF0aD0nLCAnJyk7IC8vIERlZmF1bHQgaXMgXCJwYXRoPS9cIlxuICAgICAgICAgICAgY29uc3QgZG9tYWluID0gb3B0aW9ucy51cmwgIT0gbnVsbCAmJiBvcHRpb25zLnVybC5sZW5ndGggPiAwID8gYGRvbWFpbj0ke29wdGlvbnMudXJsfWAgOiAnJztcbiAgICAgICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGAke2VuY29kZWRLZXl9PSR7ZW5jb2RlZFZhbHVlIHx8ICcnfSR7ZXhwaXJlc307IHBhdGg9JHtwYXRofTsgJHtkb21haW59O2A7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIGRlbGV0ZUNvb2tpZShvcHRpb25zKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBkb2N1bWVudC5jb29raWUgPSBgJHtvcHRpb25zLmtleX09OyBNYXgtQWdlPTBgO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBjbGVhckNvb2tpZXMoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBjb29raWVzID0gZG9jdW1lbnQuY29va2llLnNwbGl0KCc7JykgfHwgW107XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGNvb2tpZSBvZiBjb29raWVzKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuY29va2llID0gY29va2llLnJlcGxhY2UoL14gKy8sICcnKS5yZXBsYWNlKC89LiovLCBgPTtleHBpcmVzPSR7bmV3IERhdGUoKS50b1VUQ1N0cmluZygpfTtwYXRoPS9gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXN5bmMgY2xlYXJBbGxDb29raWVzKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5jbGVhckNvb2tpZXMoKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnQgY29uc3QgQ2FwYWNpdG9yQ29va2llcyA9IHJlZ2lzdGVyUGx1Z2luKCdDYXBhY2l0b3JDb29raWVzJywge1xuICAgIHdlYjogKCkgPT4gbmV3IENhcGFjaXRvckNvb2tpZXNQbHVnaW5XZWIoKSxcbn0pO1xuLy8gVVRJTElUWSBGVU5DVElPTlNcbi8qKlxuICogUmVhZCBpbiBhIEJsb2IgdmFsdWUgYW5kIHJldHVybiBpdCBhcyBhIGJhc2U2NCBzdHJpbmdcbiAqIEBwYXJhbSBibG9iIFRoZSBibG9iIHZhbHVlIHRvIGNvbnZlcnQgdG8gYSBiYXNlNjQgc3RyaW5nXG4gKi9cbmV4cG9ydCBjb25zdCByZWFkQmxvYkFzQmFzZTY0ID0gYXN5bmMgKGJsb2IpID0+IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgIHJlYWRlci5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGJhc2U2NFN0cmluZyA9IHJlYWRlci5yZXN1bHQ7XG4gICAgICAgIC8vIHJlbW92ZSBwcmVmaXggXCJkYXRhOmFwcGxpY2F0aW9uL3BkZjtiYXNlNjQsXCJcbiAgICAgICAgcmVzb2x2ZShiYXNlNjRTdHJpbmcuaW5kZXhPZignLCcpID49IDAgPyBiYXNlNjRTdHJpbmcuc3BsaXQoJywnKVsxXSA6IGJhc2U2NFN0cmluZyk7XG4gICAgfTtcbiAgICByZWFkZXIub25lcnJvciA9IChlcnJvcikgPT4gcmVqZWN0KGVycm9yKTtcbiAgICByZWFkZXIucmVhZEFzRGF0YVVSTChibG9iKTtcbn0pO1xuLyoqXG4gKiBOb3JtYWxpemUgYW4gSHR0cEhlYWRlcnMgbWFwIGJ5IGxvd2VyY2FzaW5nIGFsbCBvZiB0aGUgdmFsdWVzXG4gKiBAcGFyYW0gaGVhZGVycyBUaGUgSHR0cEhlYWRlcnMgb2JqZWN0IHRvIG5vcm1hbGl6ZVxuICovXG5jb25zdCBub3JtYWxpemVIdHRwSGVhZGVycyA9IChoZWFkZXJzID0ge30pID0+IHtcbiAgICBjb25zdCBvcmlnaW5hbEtleXMgPSBPYmplY3Qua2V5cyhoZWFkZXJzKTtcbiAgICBjb25zdCBsb3dlcmVkS2V5cyA9IE9iamVjdC5rZXlzKGhlYWRlcnMpLm1hcCgoaykgPT4gay50b0xvY2FsZUxvd2VyQ2FzZSgpKTtcbiAgICBjb25zdCBub3JtYWxpemVkID0gbG93ZXJlZEtleXMucmVkdWNlKChhY2MsIGtleSwgaW5kZXgpID0+IHtcbiAgICAgICAgYWNjW2tleV0gPSBoZWFkZXJzW29yaWdpbmFsS2V5c1tpbmRleF1dO1xuICAgICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHt9KTtcbiAgICByZXR1cm4gbm9ybWFsaXplZDtcbn07XG4vKipcbiAqIEJ1aWxkcyBhIHN0cmluZyBvZiB1cmwgcGFyYW1ldGVycyB0aGF0XG4gKiBAcGFyYW0gcGFyYW1zIEEgbWFwIG9mIHVybCBwYXJhbWV0ZXJzXG4gKiBAcGFyYW0gc2hvdWxkRW5jb2RlIHRydWUgaWYgeW91IHNob3VsZCBlbmNvZGVVUklDb21wb25lbnQoKSB0aGUgdmFsdWVzICh0cnVlIGJ5IGRlZmF1bHQpXG4gKi9cbmNvbnN0IGJ1aWxkVXJsUGFyYW1zID0gKHBhcmFtcywgc2hvdWxkRW5jb2RlID0gdHJ1ZSkgPT4ge1xuICAgIGlmICghcGFyYW1zKVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICBjb25zdCBvdXRwdXQgPSBPYmplY3QuZW50cmllcyhwYXJhbXMpLnJlZHVjZSgoYWNjdW11bGF0b3IsIGVudHJ5KSA9PiB7XG4gICAgICAgIGNvbnN0IFtrZXksIHZhbHVlXSA9IGVudHJ5O1xuICAgICAgICBsZXQgZW5jb2RlZFZhbHVlO1xuICAgICAgICBsZXQgaXRlbTtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICBpdGVtID0gJyc7XG4gICAgICAgICAgICB2YWx1ZS5mb3JFYWNoKChzdHIpID0+IHtcbiAgICAgICAgICAgICAgICBlbmNvZGVkVmFsdWUgPSBzaG91bGRFbmNvZGUgPyBlbmNvZGVVUklDb21wb25lbnQoc3RyKSA6IHN0cjtcbiAgICAgICAgICAgICAgICBpdGVtICs9IGAke2tleX09JHtlbmNvZGVkVmFsdWV9JmA7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vIGxhc3QgY2hhcmFjdGVyIHdpbGwgYWx3YXlzIGJlIFwiJlwiIHNvIHNsaWNlIGl0IG9mZlxuICAgICAgICAgICAgaXRlbS5zbGljZSgwLCAtMSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBlbmNvZGVkVmFsdWUgPSBzaG91bGRFbmNvZGUgPyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpIDogdmFsdWU7XG4gICAgICAgICAgICBpdGVtID0gYCR7a2V5fT0ke2VuY29kZWRWYWx1ZX1gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBgJHthY2N1bXVsYXRvcn0mJHtpdGVtfWA7XG4gICAgfSwgJycpO1xuICAgIC8vIFJlbW92ZSBpbml0aWFsIFwiJlwiIGZyb20gdGhlIHJlZHVjZVxuICAgIHJldHVybiBvdXRwdXQuc3Vic3RyKDEpO1xufTtcbi8qKlxuICogQnVpbGQgdGhlIFJlcXVlc3RJbml0IG9iamVjdCBiYXNlZCBvbiB0aGUgb3B0aW9ucyBwYXNzZWQgaW50byB0aGUgaW5pdGlhbCByZXF1ZXN0XG4gKiBAcGFyYW0gb3B0aW9ucyBUaGUgSHR0cCBwbHVnaW4gb3B0aW9uc1xuICogQHBhcmFtIGV4dHJhIEFueSBleHRyYSBSZXF1ZXN0SW5pdCB2YWx1ZXNcbiAqL1xuZXhwb3J0IGNvbnN0IGJ1aWxkUmVxdWVzdEluaXQgPSAob3B0aW9ucywgZXh0cmEgPSB7fSkgPT4ge1xuICAgIGNvbnN0IG91dHB1dCA9IE9iamVjdC5hc3NpZ24oeyBtZXRob2Q6IG9wdGlvbnMubWV0aG9kIHx8ICdHRVQnLCBoZWFkZXJzOiBvcHRpb25zLmhlYWRlcnMgfSwgZXh0cmEpO1xuICAgIC8vIEdldCB0aGUgY29udGVudC10eXBlXG4gICAgY29uc3QgaGVhZGVycyA9IG5vcm1hbGl6ZUh0dHBIZWFkZXJzKG9wdGlvbnMuaGVhZGVycyk7XG4gICAgY29uc3QgdHlwZSA9IGhlYWRlcnNbJ2NvbnRlbnQtdHlwZSddIHx8ICcnO1xuICAgIC8vIElmIGJvZHkgaXMgYWxyZWFkeSBhIHN0cmluZywgdGhlbiBwYXNzIGl0IHRocm91Z2ggYXMtaXMuXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLmRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIG91dHB1dC5ib2R5ID0gb3B0aW9ucy5kYXRhO1xuICAgIH1cbiAgICAvLyBCdWlsZCByZXF1ZXN0IGluaXRpYWxpemVycyBiYXNlZCBvZmYgb2YgY29udGVudC10eXBlXG4gICAgZWxzZSBpZiAodHlwZS5pbmNsdWRlcygnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJykpIHtcbiAgICAgICAgY29uc3QgcGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xuICAgICAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhvcHRpb25zLmRhdGEgfHwge30pKSB7XG4gICAgICAgICAgICBwYXJhbXMuc2V0KGtleSwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIG91dHB1dC5ib2R5ID0gcGFyYW1zLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGUuaW5jbHVkZXMoJ211bHRpcGFydC9mb3JtLWRhdGEnKSB8fCBvcHRpb25zLmRhdGEgaW5zdGFuY2VvZiBGb3JtRGF0YSkge1xuICAgICAgICBjb25zdCBmb3JtID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgICAgIGlmIChvcHRpb25zLmRhdGEgaW5zdGFuY2VvZiBGb3JtRGF0YSkge1xuICAgICAgICAgICAgb3B0aW9ucy5kYXRhLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgICAgICBmb3JtLmFwcGVuZChrZXksIHZhbHVlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMob3B0aW9ucy5kYXRhKSkge1xuICAgICAgICAgICAgICAgIGZvcm0uYXBwZW5kKGtleSwgb3B0aW9ucy5kYXRhW2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIG91dHB1dC5ib2R5ID0gZm9ybTtcbiAgICAgICAgY29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKG91dHB1dC5oZWFkZXJzKTtcbiAgICAgICAgaGVhZGVycy5kZWxldGUoJ2NvbnRlbnQtdHlwZScpOyAvLyBjb250ZW50LXR5cGUgd2lsbCBiZSBzZXQgYnkgYHdpbmRvdy5mZXRjaGAgdG8gaW5jbHVkeSBib3VuZGFyeVxuICAgICAgICBvdXRwdXQuaGVhZGVycyA9IGhlYWRlcnM7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGUuaW5jbHVkZXMoJ2FwcGxpY2F0aW9uL2pzb24nKSB8fCB0eXBlb2Ygb3B0aW9ucy5kYXRhID09PSAnb2JqZWN0Jykge1xuICAgICAgICBvdXRwdXQuYm9keSA9IEpTT04uc3RyaW5naWZ5KG9wdGlvbnMuZGF0YSk7XG4gICAgfVxuICAgIHJldHVybiBvdXRwdXQ7XG59O1xuLy8gV0VCIElNUExFTUVOVEFUSU9OXG5leHBvcnQgY2xhc3MgQ2FwYWNpdG9ySHR0cFBsdWdpbldlYiBleHRlbmRzIFdlYlBsdWdpbiB7XG4gICAgLyoqXG4gICAgICogUGVyZm9ybSBhbiBIdHRwIHJlcXVlc3QgZ2l2ZW4gYSBzZXQgb2Ygb3B0aW9uc1xuICAgICAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbnMgdG8gYnVpbGQgdGhlIEhUVFAgcmVxdWVzdFxuICAgICAqL1xuICAgIGFzeW5jIHJlcXVlc3Qob3B0aW9ucykge1xuICAgICAgICBjb25zdCByZXF1ZXN0SW5pdCA9IGJ1aWxkUmVxdWVzdEluaXQob3B0aW9ucywgb3B0aW9ucy53ZWJGZXRjaEV4dHJhKTtcbiAgICAgICAgY29uc3QgdXJsUGFyYW1zID0gYnVpbGRVcmxQYXJhbXMob3B0aW9ucy5wYXJhbXMsIG9wdGlvbnMuc2hvdWxkRW5jb2RlVXJsUGFyYW1zKTtcbiAgICAgICAgY29uc3QgdXJsID0gdXJsUGFyYW1zID8gYCR7b3B0aW9ucy51cmx9PyR7dXJsUGFyYW1zfWAgOiBvcHRpb25zLnVybDtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIHJlcXVlc3RJbml0KTtcbiAgICAgICAgY29uc3QgY29udGVudFR5cGUgPSByZXNwb25zZS5oZWFkZXJzLmdldCgnY29udGVudC10eXBlJykgfHwgJyc7XG4gICAgICAgIC8vIERlZmF1bHQgdG8gJ3RleHQnIHJlc3BvbnNlVHlwZSBzbyBubyBwYXJzaW5nIGhhcHBlbnNcbiAgICAgICAgbGV0IHsgcmVzcG9uc2VUeXBlID0gJ3RleHQnIH0gPSByZXNwb25zZS5vayA/IG9wdGlvbnMgOiB7fTtcbiAgICAgICAgLy8gSWYgdGhlIHJlc3BvbnNlIGNvbnRlbnQtdHlwZSBpcyBqc29uLCBmb3JjZSB0aGUgcmVzcG9uc2UgdG8gYmUganNvblxuICAgICAgICBpZiAoY29udGVudFR5cGUuaW5jbHVkZXMoJ2FwcGxpY2F0aW9uL2pzb24nKSkge1xuICAgICAgICAgICAgcmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuICAgICAgICB9XG4gICAgICAgIGxldCBkYXRhO1xuICAgICAgICBsZXQgYmxvYjtcbiAgICAgICAgc3dpdGNoIChyZXNwb25zZVR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ2FycmF5YnVmZmVyJzpcbiAgICAgICAgICAgIGNhc2UgJ2Jsb2InOlxuICAgICAgICAgICAgICAgIGJsb2IgPSBhd2FpdCByZXNwb25zZS5ibG9iKCk7XG4gICAgICAgICAgICAgICAgZGF0YSA9IGF3YWl0IHJlYWRCbG9iQXNCYXNlNjQoYmxvYik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdqc29uJzpcbiAgICAgICAgICAgICAgICBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZG9jdW1lbnQnOlxuICAgICAgICAgICAgY2FzZSAndGV4dCc6XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGRhdGEgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ29udmVydCBmZXRjaCBoZWFkZXJzIHRvIENhcGFjaXRvciBIdHRwSGVhZGVyc1xuICAgICAgICBjb25zdCBoZWFkZXJzID0ge307XG4gICAgICAgIHJlc3BvbnNlLmhlYWRlcnMuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICAgICAgaGVhZGVyc1trZXldID0gdmFsdWU7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGF0YSxcbiAgICAgICAgICAgIGhlYWRlcnMsXG4gICAgICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgICAgICAgIHVybDogcmVzcG9uc2UudXJsLFxuICAgICAgICB9O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtIGFuIEh0dHAgR0VUIHJlcXVlc3QgZ2l2ZW4gYSBzZXQgb2Ygb3B0aW9uc1xuICAgICAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbnMgdG8gYnVpbGQgdGhlIEhUVFAgcmVxdWVzdFxuICAgICAqL1xuICAgIGFzeW5jIGdldChvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zKSwgeyBtZXRob2Q6ICdHRVQnIH0pKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUGVyZm9ybSBhbiBIdHRwIFBPU1QgcmVxdWVzdCBnaXZlbiBhIHNldCBvZiBvcHRpb25zXG4gICAgICogQHBhcmFtIG9wdGlvbnMgT3B0aW9ucyB0byBidWlsZCB0aGUgSFRUUCByZXF1ZXN0XG4gICAgICovXG4gICAgYXN5bmMgcG9zdChvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zKSwgeyBtZXRob2Q6ICdQT1NUJyB9KSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBlcmZvcm0gYW4gSHR0cCBQVVQgcmVxdWVzdCBnaXZlbiBhIHNldCBvZiBvcHRpb25zXG4gICAgICogQHBhcmFtIG9wdGlvbnMgT3B0aW9ucyB0byBidWlsZCB0aGUgSFRUUCByZXF1ZXN0XG4gICAgICovXG4gICAgYXN5bmMgcHV0KG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdChPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMpLCB7IG1ldGhvZDogJ1BVVCcgfSkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtIGFuIEh0dHAgUEFUQ0ggcmVxdWVzdCBnaXZlbiBhIHNldCBvZiBvcHRpb25zXG4gICAgICogQHBhcmFtIG9wdGlvbnMgT3B0aW9ucyB0byBidWlsZCB0aGUgSFRUUCByZXF1ZXN0XG4gICAgICovXG4gICAgYXN5bmMgcGF0Y2gob3B0aW9ucykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucyksIHsgbWV0aG9kOiAnUEFUQ0gnIH0pKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUGVyZm9ybSBhbiBIdHRwIERFTEVURSByZXF1ZXN0IGdpdmVuIGEgc2V0IG9mIG9wdGlvbnNcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zIHRvIGJ1aWxkIHRoZSBIVFRQIHJlcXVlc3RcbiAgICAgKi9cbiAgICBhc3luYyBkZWxldGUob3B0aW9ucykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucyksIHsgbWV0aG9kOiAnREVMRVRFJyB9KSk7XG4gICAgfVxufVxuZXhwb3J0IGNvbnN0IENhcGFjaXRvckh0dHAgPSByZWdpc3RlclBsdWdpbignQ2FwYWNpdG9ySHR0cCcsIHtcbiAgICB3ZWI6ICgpID0+IG5ldyBDYXBhY2l0b3JIdHRwUGx1Z2luV2ViKCksXG59KTtcbi8qKioqKioqKiBFTkQgSFRUUCBQTFVHSU4gKioqKioqKiovXG4vKioqKioqKiogU1lTVEVNIEJBUlMgUExVR0lOICoqKioqKioqL1xuLyoqXG4gKiBBdmFpbGFibGUgc3RhdHVzIGJhciBzdHlsZXMuXG4gKi9cbmV4cG9ydCB2YXIgU3lzdGVtQmFyc1N0eWxlO1xuKGZ1bmN0aW9uIChTeXN0ZW1CYXJzU3R5bGUpIHtcbiAgICAvKipcbiAgICAgKiBMaWdodCBzeXN0ZW0gYmFyIGNvbnRlbnQgb24gYSBkYXJrIGJhY2tncm91bmQuXG4gICAgICpcbiAgICAgKiBAc2luY2UgOC4wLjBcbiAgICAgKi9cbiAgICBTeXN0ZW1CYXJzU3R5bGVbXCJEYXJrXCJdID0gXCJEQVJLXCI7XG4gICAgLyoqXG4gICAgICogRm9yIGRhcmsgc3lzdGVtIGJhciBjb250ZW50IG9uIGEgbGlnaHQgYmFja2dyb3VuZC5cbiAgICAgKlxuICAgICAqIEBzaW5jZSA4LjAuMFxuICAgICAqL1xuICAgIFN5c3RlbUJhcnNTdHlsZVtcIkxpZ2h0XCJdID0gXCJMSUdIVFwiO1xuICAgIC8qKlxuICAgICAqIFRoZSBzdHlsZSBpcyBiYXNlZCBvbiB0aGUgZGV2aWNlIGFwcGVhcmFuY2Ugb3IgdGhlIHVuZGVybHlpbmcgY29udGVudC5cbiAgICAgKiBJZiB0aGUgZGV2aWNlIGlzIHVzaW5nIERhcmsgbW9kZSwgdGhlIHN5c3RlbSBiYXJzIGNvbnRlbnQgd2lsbCBiZSBsaWdodC5cbiAgICAgKiBJZiB0aGUgZGV2aWNlIGlzIHVzaW5nIExpZ2h0IG1vZGUsIHRoZSBzeXN0ZW0gYmFycyBjb250ZW50IHdpbGwgYmUgZGFyay5cbiAgICAgKlxuICAgICAqIEBzaW5jZSA4LjAuMFxuICAgICAqL1xuICAgIFN5c3RlbUJhcnNTdHlsZVtcIkRlZmF1bHRcIl0gPSBcIkRFRkFVTFRcIjtcbn0pKFN5c3RlbUJhcnNTdHlsZSB8fCAoU3lzdGVtQmFyc1N0eWxlID0ge30pKTtcbi8qKlxuICogQXZhaWxhYmxlIHN5c3RlbSBiYXIgdHlwZXMuXG4gKi9cbmV4cG9ydCB2YXIgU3lzdGVtQmFyVHlwZTtcbihmdW5jdGlvbiAoU3lzdGVtQmFyVHlwZSkge1xuICAgIC8qKlxuICAgICAqIFRoZSB0b3Agc3RhdHVzIGJhciBvbiBib3RoIEFuZHJvaWQgYW5kIGlPUy5cbiAgICAgKlxuICAgICAqIEBzaW5jZSA4LjAuMFxuICAgICAqL1xuICAgIFN5c3RlbUJhclR5cGVbXCJTdGF0dXNCYXJcIl0gPSBcIlN0YXR1c0JhclwiO1xuICAgIC8qKlxuICAgICAqIFRoZSBuYXZpZ2F0aW9uIGJhciAob3IgZ2VzdHVyZSBiYXIgb24gaU9TKSBvbiBib3RoIEFuZHJvaWQgYW5kIGlPUy5cbiAgICAgKlxuICAgICAqIEBzaW5jZSA4LjAuMFxuICAgICAqL1xuICAgIFN5c3RlbUJhclR5cGVbXCJOYXZpZ2F0aW9uQmFyXCJdID0gXCJOYXZpZ2F0aW9uQmFyXCI7XG59KShTeXN0ZW1CYXJUeXBlIHx8IChTeXN0ZW1CYXJUeXBlID0ge30pKTtcbmV4cG9ydCBjbGFzcyBTeXN0ZW1CYXJzUGx1Z2luV2ViIGV4dGVuZHMgV2ViUGx1Z2luIHtcbiAgICBhc3luYyBzZXRTdHlsZSgpIHtcbiAgICAgICAgdGhpcy51bmF2YWlsYWJsZSgnbm90IGF2YWlsYWJsZSBmb3Igd2ViJyk7XG4gICAgfVxuICAgIGFzeW5jIHNldEFuaW1hdGlvbigpIHtcbiAgICAgICAgdGhpcy51bmF2YWlsYWJsZSgnbm90IGF2YWlsYWJsZSBmb3Igd2ViJyk7XG4gICAgfVxuICAgIGFzeW5jIHNob3coKSB7XG4gICAgICAgIHRoaXMudW5hdmFpbGFibGUoJ25vdCBhdmFpbGFibGUgZm9yIHdlYicpO1xuICAgIH1cbiAgICBhc3luYyBoaWRlKCkge1xuICAgICAgICB0aGlzLnVuYXZhaWxhYmxlKCdub3QgYXZhaWxhYmxlIGZvciB3ZWInKTtcbiAgICB9XG59XG5leHBvcnQgY29uc3QgU3lzdGVtQmFycyA9IHJlZ2lzdGVyUGx1Z2luKCdTeXN0ZW1CYXJzJywge1xuICAgIHdlYjogKCkgPT4gbmV3IFN5c3RlbUJhcnNQbHVnaW5XZWIoKSxcbn0pO1xuLyoqKioqKioqIEVORCBTWVNURU0gQkFSUyBQTFVHSU4gKioqKioqKiovXG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb3JlLXBsdWdpbnMuanMubWFwIiwgImltcG9ydCB0eXBlIHsgSHR0cE9wdGlvbnMsIFBlcm1pc3Npb25TdGF0ZSwgUGx1Z2luTGlzdGVuZXJIYW5kbGUgfSBmcm9tICdAY2FwYWNpdG9yL2NvcmUnO1xuXG5leHBvcnQgdHlwZSBDYWxsYmFja0lEID0gc3RyaW5nO1xuXG5leHBvcnQgaW50ZXJmYWNlIFBlcm1pc3Npb25TdGF0dXMge1xuICBwdWJsaWNTdG9yYWdlOiBQZXJtaXNzaW9uU3RhdGU7XG59XG5cbmV4cG9ydCBlbnVtIERpcmVjdG9yeSB7XG4gIC8qKlxuICAgKiBUaGUgRG9jdW1lbnRzIGRpcmVjdG9yeS5cbiAgICogT24gaU9TIGl0J3MgdGhlIGFwcCdzIGRvY3VtZW50cyBkaXJlY3RvcnkuXG4gICAqIFVzZSB0aGlzIGRpcmVjdG9yeSB0byBzdG9yZSB1c2VyLWdlbmVyYXRlZCBjb250ZW50LlxuICAgKiBPbiBBbmRyb2lkIGl0J3MgdGhlIFB1YmxpYyBEb2N1bWVudHMgZm9sZGVyLCBzbyBpdCdzIGFjY2Vzc2libGUgZnJvbSBvdGhlciBhcHBzLlxuICAgKiBJdCdzIG5vdCBhY2Nlc3NpYmxlIG9uIEFuZHJvaWQgMTAgdW5sZXNzIHRoZSBhcHAgZW5hYmxlcyBsZWdhY3kgRXh0ZXJuYWwgU3RvcmFnZVxuICAgKiBieSBhZGRpbmcgYGFuZHJvaWQ6cmVxdWVzdExlZ2FjeUV4dGVybmFsU3RvcmFnZT1cInRydWVcImAgaW4gdGhlIGBhcHBsaWNhdGlvbmAgdGFnXG4gICAqIGluIHRoZSBgQW5kcm9pZE1hbmlmZXN0LnhtbGAuXG4gICAqIE9uIEFuZHJvaWQgMTEgb3IgbmV3ZXIgdGhlIGFwcCBjYW4gb25seSBhY2Nlc3MgdGhlIGZpbGVzL2ZvbGRlcnMgdGhlIGFwcCBjcmVhdGVkLlxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIERvY3VtZW50cyA9ICdET0NVTUVOVFMnLFxuXG4gIC8qKlxuICAgKiBUaGUgRGF0YSBkaXJlY3RvcnkuXG4gICAqIE9uIGlPUyBpdCB3aWxsIHVzZSB0aGUgRG9jdW1lbnRzIGRpcmVjdG9yeS5cbiAgICogT24gQW5kcm9pZCBpdCdzIHRoZSBkaXJlY3RvcnkgaG9sZGluZyBhcHBsaWNhdGlvbiBmaWxlcy5cbiAgICogRmlsZXMgd2lsbCBiZSBkZWxldGVkIHdoZW4gdGhlIGFwcGxpY2F0aW9uIGlzIHVuaW5zdGFsbGVkLlxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIERhdGEgPSAnREFUQScsXG5cbiAgLyoqXG4gICAqIFRoZSBMaWJyYXJ5IGRpcmVjdG9yeS5cbiAgICogT24gaU9TIGl0IHdpbGwgdXNlIHRoZSBMaWJyYXJ5IGRpcmVjdG9yeS5cbiAgICogT24gQW5kcm9pZCBpdCdzIHRoZSBkaXJlY3RvcnkgaG9sZGluZyBhcHBsaWNhdGlvbiBmaWxlcy5cbiAgICogRmlsZXMgd2lsbCBiZSBkZWxldGVkIHdoZW4gdGhlIGFwcGxpY2F0aW9uIGlzIHVuaW5zdGFsbGVkLlxuICAgKlxuICAgKiBAc2luY2UgMS4xLjBcbiAgICovXG4gIExpYnJhcnkgPSAnTElCUkFSWScsXG5cbiAgLyoqXG4gICAqIFRoZSBDYWNoZSBkaXJlY3RvcnkuXG4gICAqIENhbiBiZSBkZWxldGVkIGluIGNhc2VzIG9mIGxvdyBtZW1vcnksIHNvIHVzZSB0aGlzIGRpcmVjdG9yeSB0byB3cml0ZSBhcHAtc3BlY2lmaWMgZmlsZXMuXG4gICAqIHRoYXQgeW91ciBhcHAgY2FuIHJlLWNyZWF0ZSBlYXNpbHkuXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgQ2FjaGUgPSAnQ0FDSEUnLFxuXG4gIC8qKlxuICAgKiBUaGUgZXh0ZXJuYWwgZGlyZWN0b3J5LlxuICAgKiBPbiBpT1MgaXQgd2lsbCB1c2UgdGhlIERvY3VtZW50cyBkaXJlY3RvcnkuXG4gICAqIE9uIEFuZHJvaWQgaXQncyB0aGUgZGlyZWN0b3J5IG9uIHRoZSBwcmltYXJ5IHNoYXJlZC9leHRlcm5hbFxuICAgKiBzdG9yYWdlIGRldmljZSB3aGVyZSB0aGUgYXBwbGljYXRpb24gY2FuIHBsYWNlIHBlcnNpc3RlbnQgZmlsZXMgaXQgb3ducy5cbiAgICogVGhlc2UgZmlsZXMgYXJlIGludGVybmFsIHRvIHRoZSBhcHBsaWNhdGlvbnMsIGFuZCBub3QgdHlwaWNhbGx5IHZpc2libGVcbiAgICogdG8gdGhlIHVzZXIgYXMgbWVkaWEuXG4gICAqIEZpbGVzIHdpbGwgYmUgZGVsZXRlZCB3aGVuIHRoZSBhcHBsaWNhdGlvbiBpcyB1bmluc3RhbGxlZC5cbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICBFeHRlcm5hbCA9ICdFWFRFUk5BTCcsXG5cbiAgLyoqXG4gICAqIFRoZSBleHRlcm5hbCBzdG9yYWdlIGRpcmVjdG9yeS5cbiAgICogT24gaU9TIGl0IHdpbGwgdXNlIHRoZSBEb2N1bWVudHMgZGlyZWN0b3J5LlxuICAgKiBPbiBBbmRyb2lkIGl0J3MgdGhlIHByaW1hcnkgc2hhcmVkL2V4dGVybmFsIHN0b3JhZ2UgZGlyZWN0b3J5LlxuICAgKiBJdCdzIG5vdCBhY2Nlc3NpYmxlIG9uIEFuZHJvaWQgMTAgdW5sZXNzIHRoZSBhcHAgZW5hYmxlcyBsZWdhY3kgRXh0ZXJuYWwgU3RvcmFnZVxuICAgKiBieSBhZGRpbmcgYGFuZHJvaWQ6cmVxdWVzdExlZ2FjeUV4dGVybmFsU3RvcmFnZT1cInRydWVcImAgaW4gdGhlIGBhcHBsaWNhdGlvbmAgdGFnXG4gICAqIGluIHRoZSBgQW5kcm9pZE1hbmlmZXN0LnhtbGAuXG4gICAqIEl0J3Mgbm90IGFjY2Vzc2libGUgb24gQW5kcm9pZCAxMSBvciBuZXdlci5cbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuXG4gIEV4dGVybmFsU3RvcmFnZSA9ICdFWFRFUk5BTF9TVE9SQUdFJyxcbiAgLyoqXG4gICAqIFRoZSBleHRlcm5hbCBjYWNoZSBkaXJlY3RvcnkuXG4gICAqIE9uIGlPUyBpdCB3aWxsIHVzZSB0aGUgRG9jdW1lbnRzIGRpcmVjdG9yeS5cbiAgICogT24gQW5kcm9pZCBpdCdzIHRoZSBwcmltYXJ5IHNoYXJlZC9leHRlcm5hbCBjYWNoZS5cbiAgICpcbiAgICogQHNpbmNlIDcuMS4wXG4gICAqL1xuICBFeHRlcm5hbENhY2hlID0gJ0VYVEVSTkFMX0NBQ0hFJyxcblxuICAvKipcbiAgICogVGhlIExpYnJhcnkgZGlyZWN0b3J5IHdpdGhvdXQgY2xvdWQgYmFja3VwLiBVc2VkIGluIGlPUy5cbiAgICogT24gQW5kcm9pZCBpdCdzIHRoZSBkaXJlY3RvcnkgaG9sZGluZyBhcHBsaWNhdGlvbiBmaWxlcy5cbiAgICpcbiAgICogQHNpbmNlIDcuMS4wXG4gICAqL1xuICBMaWJyYXJ5Tm9DbG91ZCA9ICdMSUJSQVJZX05PX0NMT1VEJyxcblxuICAvKipcbiAgICogQSB0ZW1wb3JhcnkgZGlyZWN0b3J5IGZvciBpT1MuXG4gICAqIE9uIEFuZHJvaWQgaXQncyB0aGUgZGlyZWN0b3J5IGhvbGRpbmcgdGhlIGFwcGxpY2F0aW9uIGNhY2hlLlxuICAgKlxuICAgKiBAc2luY2UgNy4xLjBcbiAgICovXG4gIFRlbXBvcmFyeSA9ICdURU1QT1JBUlknLFxufVxuXG5leHBvcnQgZW51bSBFbmNvZGluZyB7XG4gIC8qKlxuICAgKiBFaWdodC1iaXQgVUNTIFRyYW5zZm9ybWF0aW9uIEZvcm1hdFxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIFVURjggPSAndXRmOCcsXG5cbiAgLyoqXG4gICAqIFNldmVuLWJpdCBBU0NJSSwgYS5rLmEuIElTTzY0Ni1VUywgYS5rLmEuIHRoZSBCYXNpYyBMYXRpbiBibG9jayBvZiB0aGVcbiAgICogVW5pY29kZSBjaGFyYWN0ZXIgc2V0XG4gICAqIFRoaXMgZW5jb2RpbmcgaXMgb25seSBzdXBwb3J0ZWQgb24gQW5kcm9pZC5cbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICBBU0NJSSA9ICdhc2NpaScsXG5cbiAgLyoqXG4gICAqIFNpeHRlZW4tYml0IFVDUyBUcmFuc2Zvcm1hdGlvbiBGb3JtYXQsIGJ5dGUgb3JkZXIgaWRlbnRpZmllZCBieSBhblxuICAgKiBvcHRpb25hbCBieXRlLW9yZGVyIG1hcmtcbiAgICogVGhpcyBlbmNvZGluZyBpcyBvbmx5IHN1cHBvcnRlZCBvbiBBbmRyb2lkLlxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIFVURjE2ID0gJ3V0ZjE2Jyxcbn1cblxuZXhwb3J0IGludGVyZmFjZSBXcml0ZUZpbGVPcHRpb25zIHtcbiAgLyoqXG4gICAqIFRoZSBwYXRoIG9mIHRoZSBmaWxlIHRvIHdyaXRlXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgcGF0aDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgZGF0YSB0byB3cml0ZVxuICAgKlxuICAgKiBOb3RlOiBCbG9iIGRhdGEgaXMgb25seSBzdXBwb3J0ZWQgb24gV2ViLlxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIGRhdGE6IHN0cmluZyB8IEJsb2I7XG5cbiAgLyoqXG4gICAqIFRoZSBgRGlyZWN0b3J5YCB0byBzdG9yZSB0aGUgZmlsZSBpblxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIGRpcmVjdG9yeT86IERpcmVjdG9yeTtcblxuICAvKipcbiAgICogVGhlIGVuY29kaW5nIHRvIHdyaXRlIHRoZSBmaWxlIGluLiBJZiBub3QgcHJvdmlkZWQsIGRhdGFcbiAgICogaXMgd3JpdHRlbiBhcyBiYXNlNjQgZW5jb2RlZC5cbiAgICpcbiAgICogUGFzcyBFbmNvZGluZy5VVEY4IHRvIHdyaXRlIGRhdGEgYXMgc3RyaW5nXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgZW5jb2Rpbmc/OiBFbmNvZGluZztcblxuICAvKipcbiAgICogV2hldGhlciB0byBjcmVhdGUgYW55IG1pc3NpbmcgcGFyZW50IGRpcmVjdG9yaWVzLlxuICAgKlxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIHJlY3Vyc2l2ZT86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQXBwZW5kRmlsZU9wdGlvbnMge1xuICAvKipcbiAgICogVGhlIHBhdGggb2YgdGhlIGZpbGUgdG8gYXBwZW5kXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgcGF0aDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgZGF0YSB0byB3cml0ZVxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIGRhdGE6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIGBEaXJlY3RvcnlgIHRvIHN0b3JlIHRoZSBmaWxlIGluXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgZGlyZWN0b3J5PzogRGlyZWN0b3J5O1xuXG4gIC8qKlxuICAgKiBUaGUgZW5jb2RpbmcgdG8gd3JpdGUgdGhlIGZpbGUgaW4uIElmIG5vdCBwcm92aWRlZCwgZGF0YVxuICAgKiBpcyB3cml0dGVuIGFzIGJhc2U2NCBlbmNvZGVkLlxuICAgKlxuICAgKiBQYXNzIEVuY29kaW5nLlVURjggdG8gd3JpdGUgZGF0YSBhcyBzdHJpbmdcbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICBlbmNvZGluZz86IEVuY29kaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJlYWRGaWxlT3B0aW9ucyB7XG4gIC8qKlxuICAgKiBUaGUgcGF0aCBvZiB0aGUgZmlsZSB0byByZWFkXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgcGF0aDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgYERpcmVjdG9yeWAgdG8gcmVhZCB0aGUgZmlsZSBmcm9tXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgZGlyZWN0b3J5PzogRGlyZWN0b3J5O1xuXG4gIC8qKlxuICAgKiBUaGUgZW5jb2RpbmcgdG8gcmVhZCB0aGUgZmlsZSBpbiwgaWYgbm90IHByb3ZpZGVkLCBkYXRhXG4gICAqIGlzIHJlYWQgYXMgYmluYXJ5IGFuZCByZXR1cm5lZCBhcyBiYXNlNjQgZW5jb2RlZC5cbiAgICpcbiAgICogUGFzcyBFbmNvZGluZy5VVEY4IHRvIHJlYWQgZGF0YSBhcyBzdHJpbmdcbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICBlbmNvZGluZz86IEVuY29kaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgb2Zmc2V0IHRvIHN0YXJ0IHJlYWRpbmcgdGhlIGZpbGUgZnJvbSwgaW4gYnl0ZXMuXG4gICAqIE5hdGl2ZSBvbmx5IChub3QgYXZhaWxhYmxlIGluIHdlYikuXG4gICAqIENhbiBiZSB1c2VkIGluIGNvbmp1bmN0aW9uIHdpdGggbGVuZ3RoIHRvIHBhcnRpYWxseSByZWFkIGZpbGVzLlxuICAgKlxuICAgKiBAc2luY2UgOC4xLjBcbiAgICogQGRlZmF1bHQgMFxuICAgKi9cbiAgb2Zmc2V0PzogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgbGVuZ3RoIG9mIGRhdGEgdG8gcmVhZCwgaW4gYnl0ZXMuXG4gICAqIEFueSBub24tcG9zaXRpdmUgdmFsdWUgbWVhbnMgdG8gcmVhZCB0byB0aGUgZW5kIG9mIHRoZSBmaWxlLlxuICAgKiBOYXRpdmUgb25seSAobm90IGF2YWlsYWJsZSBpbiB3ZWIpLlxuICAgKiBDYW4gYmUgdXNlZCBpbiBjb25qdW5jdGlvbiB3aXRoIG9mZnNldCB0byBwYXJ0aWFsbHkgcmVhZCBmaWxlcy5cbiAgICpcbiAgICogQHNpbmNlIDguMS4wXG4gICAqIEBkZWZhdWx0IC0xXG4gICAqL1xuICBsZW5ndGg/OiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVhZEZpbGVJbkNodW5rc09wdGlvbnMgZXh0ZW5kcyBSZWFkRmlsZU9wdGlvbnMge1xuICAvKipcbiAgICogU2l6ZSBvZiB0aGUgY2h1bmtzIGluIGJ5dGVzLlxuICAgKlxuICAgKiBAc2luY2UgNy4xLjBcbiAgICovXG4gIGNodW5rU2l6ZTogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIERlbGV0ZUZpbGVPcHRpb25zIHtcbiAgLyoqXG4gICAqIFRoZSBwYXRoIG9mIHRoZSBmaWxlIHRvIGRlbGV0ZVxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIHBhdGg6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIGBEaXJlY3RvcnlgIHRvIGRlbGV0ZSB0aGUgZmlsZSBmcm9tXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgZGlyZWN0b3J5PzogRGlyZWN0b3J5O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE1rZGlyT3B0aW9ucyB7XG4gIC8qKlxuICAgKiBUaGUgcGF0aCBvZiB0aGUgbmV3IGRpcmVjdG9yeVxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIHBhdGg6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIGBEaXJlY3RvcnlgIHRvIG1ha2UgdGhlIG5ldyBkaXJlY3RvcnkgaW5cbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICBkaXJlY3Rvcnk/OiBEaXJlY3Rvcnk7XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdG8gY3JlYXRlIGFueSBtaXNzaW5nIHBhcmVudCBkaXJlY3RvcmllcyBhcyB3ZWxsLlxuICAgKlxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIHJlY3Vyc2l2ZT86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUm1kaXJPcHRpb25zIHtcbiAgLyoqXG4gICAqIFRoZSBwYXRoIG9mIHRoZSBkaXJlY3RvcnkgdG8gcmVtb3ZlXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgcGF0aDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgYERpcmVjdG9yeWAgdG8gcmVtb3ZlIHRoZSBkaXJlY3RvcnkgZnJvbVxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIGRpcmVjdG9yeT86IERpcmVjdG9yeTtcblxuICAvKipcbiAgICogV2hldGhlciB0byByZWN1cnNpdmVseSByZW1vdmUgdGhlIGNvbnRlbnRzIG9mIHRoZSBkaXJlY3RvcnlcbiAgICpcbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICByZWN1cnNpdmU/OiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJlYWRkaXJPcHRpb25zIHtcbiAgLyoqXG4gICAqIFRoZSBwYXRoIG9mIHRoZSBkaXJlY3RvcnkgdG8gcmVhZFxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIHBhdGg6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIGBEaXJlY3RvcnlgIHRvIGxpc3QgZmlsZXMgZnJvbVxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIGRpcmVjdG9yeT86IERpcmVjdG9yeTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBHZXRVcmlPcHRpb25zIHtcbiAgLyoqXG4gICAqIFRoZSBwYXRoIG9mIHRoZSBmaWxlIHRvIGdldCB0aGUgVVJJIGZvclxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIHBhdGg6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIGBEaXJlY3RvcnlgIHRvIGdldCB0aGUgZmlsZSB1bmRlclxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIGRpcmVjdG9yeTogRGlyZWN0b3J5O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFN0YXRPcHRpb25zIHtcbiAgLyoqXG4gICAqIFRoZSBwYXRoIG9mIHRoZSBmaWxlIHRvIGdldCBkYXRhIGFib3V0XG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgcGF0aDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgYERpcmVjdG9yeWAgdG8gZ2V0IHRoZSBmaWxlIHVuZGVyXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgZGlyZWN0b3J5PzogRGlyZWN0b3J5O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENvcHlPcHRpb25zIHtcbiAgLyoqXG4gICAqIFRoZSBleGlzdGluZyBmaWxlIG9yIGRpcmVjdG9yeVxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIGZyb206IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIGRlc3RpbmF0aW9uIGZpbGUgb3IgZGlyZWN0b3J5XG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgdG86IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIGBEaXJlY3RvcnlgIGNvbnRhaW5pbmcgdGhlIGV4aXN0aW5nIGZpbGUgb3IgZGlyZWN0b3J5XG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgZGlyZWN0b3J5PzogRGlyZWN0b3J5O1xuXG4gIC8qKlxuICAgKiBUaGUgYERpcmVjdG9yeWAgY29udGFpbmluZyB0aGUgZGVzdGluYXRpb24gZmlsZSBvciBkaXJlY3RvcnkuIElmIG5vdCBzdXBwbGllZCB3aWxsIHVzZSB0aGUgJ2RpcmVjdG9yeSdcbiAgICogcGFyYW1ldGVyIGFzIHRoZSBkZXN0aW5hdGlvblxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIHRvRGlyZWN0b3J5PzogRGlyZWN0b3J5O1xufVxuXG5leHBvcnQgdHlwZSBSZW5hbWVPcHRpb25zID0gQ29weU9wdGlvbnM7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVhZEZpbGVSZXN1bHQge1xuICAvKipcbiAgICogVGhlIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBkYXRhIGNvbnRhaW5lZCBpbiB0aGUgZmlsZVxuICAgKlxuICAgKiBOb3RlOiBCbG9iIGlzIG9ubHkgYXZhaWxhYmxlIG9uIFdlYi4gT24gbmF0aXZlLCB0aGUgZGF0YSBpcyByZXR1cm5lZCBhcyBhIHN0cmluZy5cbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICBkYXRhOiBzdHJpbmcgfCBCbG9iO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFdyaXRlRmlsZVJlc3VsdCB7XG4gIC8qKlxuICAgKiBUaGUgdXJpIHdoZXJlIHRoZSBmaWxlIHdhcyB3cml0dGVuIGludG9cbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICB1cmk6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZWFkZGlyUmVzdWx0IHtcbiAgLyoqXG4gICAqIExpc3Qgb2YgZmlsZXMgYW5kIGRpcmVjdG9yaWVzIGluc2lkZSB0aGUgZGlyZWN0b3J5XG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgZmlsZXM6IEZpbGVJbmZvW107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmlsZUluZm8ge1xuICAvKipcbiAgICogTmFtZSBvZiB0aGUgZmlsZSBvciBkaXJlY3RvcnkuXG4gICAqXG4gICAqIEBzaW5jZSA3LjEuMFxuICAgKi9cbiAgbmFtZTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUeXBlIG9mIHRoZSBmaWxlLlxuICAgKlxuICAgKiBAc2luY2UgNC4wLjBcbiAgICovXG4gIHR5cGU6ICdkaXJlY3RvcnknIHwgJ2ZpbGUnO1xuXG4gIC8qKlxuICAgKiBTaXplIG9mIHRoZSBmaWxlIGluIGJ5dGVzLlxuICAgKlxuICAgKiBAc2luY2UgNC4wLjBcbiAgICovXG4gIHNpemU6IG51bWJlcjtcblxuICAvKipcbiAgICogVGltZSBvZiBjcmVhdGlvbiBpbiBtaWxsaXNlY29uZHMuXG4gICAqXG4gICAqIEl0J3Mgbm90IGF2YWlsYWJsZSBvbiBBbmRyb2lkIDcgYW5kIG9sZGVyIGRldmljZXMuXG4gICAqXG4gICAqIEBzaW5jZSA3LjEuMFxuICAgKi9cbiAgY3RpbWU/OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRpbWUgb2YgbGFzdCBtb2RpZmljYXRpb24gaW4gbWlsbGlzZWNvbmRzLlxuICAgKlxuICAgKiBAc2luY2UgNy4xLjBcbiAgICovXG4gIG10aW1lOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSB1cmkgb2YgdGhlIGZpbGUuXG4gICAqXG4gICAqIEBzaW5jZSA0LjAuMFxuICAgKi9cbiAgdXJpOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgR2V0VXJpUmVzdWx0IHtcbiAgLyoqXG4gICAqIFRoZSB1cmkgb2YgdGhlIGZpbGVcbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICB1cmk6IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgU3RhdFJlc3VsdCA9IEZpbGVJbmZvO1xuZXhwb3J0IGludGVyZmFjZSBDb3B5UmVzdWx0IHtcbiAgLyoqXG4gICAqIFRoZSB1cmkgd2hlcmUgdGhlIGZpbGUgd2FzIGNvcGllZCBpbnRvXG4gICAqXG4gICAqIEBzaW5jZSA0LjAuMFxuICAgKi9cbiAgdXJpOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRG93bmxvYWRGaWxlT3B0aW9ucyBleHRlbmRzIEh0dHBPcHRpb25zIHtcbiAgLyoqXG4gICAqIFRoZSBwYXRoIHRoZSBkb3dubG9hZGVkIGZpbGUgc2hvdWxkIGJlIG1vdmVkIHRvLlxuICAgKlxuICAgKiBAc2luY2UgNS4xLjBcbiAgICovXG4gIHBhdGg6IHN0cmluZztcbiAgLyoqXG4gICAqIFRoZSBkaXJlY3RvcnkgdG8gd3JpdGUgdGhlIGZpbGUgdG8uXG4gICAqIElmIHRoaXMgb3B0aW9uIGlzIHVzZWQsIGZpbGVQYXRoIGNhbiBiZSBhIHJlbGF0aXZlIHBhdGggcmF0aGVyIHRoYW4gYWJzb2x1dGUuXG4gICAqIFRoZSBkZWZhdWx0IGlzIHRoZSBgREFUQWAgZGlyZWN0b3J5LlxuICAgKlxuICAgKiBAc2luY2UgNS4xLjBcbiAgICovXG4gIGRpcmVjdG9yeT86IERpcmVjdG9yeTtcbiAgLyoqXG4gICAqIEFuIG9wdGlvbmFsIGxpc3RlbmVyIGZ1bmN0aW9uIHRvIHJlY2VpdmUgZG93bmxvYWRlZCBwcm9ncmVzcyBldmVudHMuXG4gICAqIElmIHRoaXMgb3B0aW9uIGlzIHVzZWQsIHByb2dyZXNzIGV2ZW50IHNob3VsZCBiZSBkaXNwYXRjaGVkIG9uIGV2ZXJ5IGNodW5rIHJlY2VpdmVkLlxuICAgKiBDaHVua3MgYXJlIHRocm90dGxlZCB0byBldmVyeSAxMDBtcyBvbiBBbmRyb2lkL2lPUyB0byBhdm9pZCBzbG93ZG93bnMuXG4gICAqXG4gICAqIEBzaW5jZSA1LjEuMFxuICAgKi9cbiAgcHJvZ3Jlc3M/OiBib29sZWFuO1xuICAvKipcbiAgICogV2hldGhlciB0byBjcmVhdGUgYW55IG1pc3NpbmcgcGFyZW50IGRpcmVjdG9yaWVzLlxuICAgKlxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKiBAc2luY2UgNS4xLjJcbiAgICovXG4gIHJlY3Vyc2l2ZT86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRG93bmxvYWRGaWxlUmVzdWx0IHtcbiAgLyoqXG4gICAqIFRoZSBwYXRoIHRoZSBmaWxlIHdhcyBkb3dubG9hZGVkIHRvLlxuICAgKlxuICAgKiBAc2luY2UgNS4xLjBcbiAgICovXG4gIHBhdGg/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUaGUgYmxvYiBkYXRhIG9mIHRoZSBkb3dubG9hZGVkIGZpbGUuXG4gICAqIFRoaXMgaXMgb25seSBhdmFpbGFibGUgb24gd2ViLlxuICAgKlxuICAgKiBAc2luY2UgNS4xLjBcbiAgICovXG4gIGJsb2I/OiBCbG9iO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFByb2dyZXNzU3RhdHVzIHtcbiAgLyoqXG4gICAqIFRoZSB1cmwgb2YgdGhlIGZpbGUgYmVpbmcgZG93bmxvYWRlZC5cbiAgICpcbiAgICogQHNpbmNlIDUuMS4wXG4gICAqL1xuICB1cmw6IHN0cmluZztcbiAgLyoqXG4gICAqIFRoZSBudW1iZXIgb2YgYnl0ZXMgZG93bmxvYWRlZCBzbyBmYXIuXG4gICAqXG4gICAqIEBzaW5jZSA1LjEuMFxuICAgKi9cbiAgYnl0ZXM6IG51bWJlcjtcbiAgLyoqXG4gICAqIFRoZSB0b3RhbCBudW1iZXIgb2YgYnl0ZXMgdG8gZG93bmxvYWQgZm9yIHRoaXMgZmlsZS5cbiAgICpcbiAgICogQHNpbmNlIDUuMS4wXG4gICAqL1xuICBjb250ZW50TGVuZ3RoOiBudW1iZXI7XG59XG5cbi8qKlxuICogQ2FsbGJhY2sgZm9yIHJlY2VpdmluZyBjaHVua3MgcmVhZCBmcm9tIGEgZmlsZSwgb3IgZXJyb3IgaWYgc29tZXRoaW5nIHdlbnQgd3JvbmcuXG4gKlxuICogQHNpbmNlIDcuMS4wXG4gKi9cbmV4cG9ydCB0eXBlIFJlYWRGaWxlSW5DaHVua3NDYWxsYmFjayA9IChjaHVua1JlYWQ6IFJlYWRGaWxlUmVzdWx0IHwgbnVsbCwgZXJyPzogYW55KSA9PiB2b2lkO1xuXG4vKipcbiAqIEEgbGlzdGVuZXIgZnVuY3Rpb24gdGhhdCByZWNlaXZlcyBwcm9ncmVzcyBldmVudHMuXG4gKlxuICogQHNpbmNlIDUuMS4wXG4gKi9cbmV4cG9ydCB0eXBlIFByb2dyZXNzTGlzdGVuZXIgPSAocHJvZ3Jlc3M6IFByb2dyZXNzU3RhdHVzKSA9PiB2b2lkO1xuXG5leHBvcnQgaW50ZXJmYWNlIEZpbGVzeXN0ZW1QbHVnaW4ge1xuICAvKipcbiAgICogQ2hlY2sgcmVhZC93cml0ZSBwZXJtaXNzaW9ucy5cbiAgICogUmVxdWlyZWQgb24gQW5kcm9pZCwgb25seSB3aGVuIHVzaW5nIGBEaXJlY3RvcnkuRG9jdW1lbnRzYCBvclxuICAgKiBgRGlyZWN0b3J5LkV4dGVybmFsU3RvcmFnZWAuXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgY2hlY2tQZXJtaXNzaW9ucygpOiBQcm9taXNlPFBlcm1pc3Npb25TdGF0dXM+O1xuXG4gIC8qKlxuICAgKiBSZXF1ZXN0IHJlYWQvd3JpdGUgcGVybWlzc2lvbnMuXG4gICAqIFJlcXVpcmVkIG9uIEFuZHJvaWQsIG9ubHkgd2hlbiB1c2luZyBgRGlyZWN0b3J5LkRvY3VtZW50c2Agb3JcbiAgICogYERpcmVjdG9yeS5FeHRlcm5hbFN0b3JhZ2VgLlxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIHJlcXVlc3RQZXJtaXNzaW9ucygpOiBQcm9taXNlPFBlcm1pc3Npb25TdGF0dXM+O1xuXG4gIC8qKlxuICAgKiBSZWFkIGEgZmlsZSBmcm9tIGRpc2tcbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICByZWFkRmlsZShvcHRpb25zOiBSZWFkRmlsZU9wdGlvbnMpOiBQcm9taXNlPFJlYWRGaWxlUmVzdWx0PjtcblxuICAvKipcbiAgICogUmVhZCBhIGZpbGUgZnJvbSBkaXNrLCBpbiBjaHVua3MuXG4gICAqIE5hdGl2ZSBvbmx5IChub3QgYXZhaWxhYmxlIGluIHdlYikuXG4gICAqIFVzZSB0aGUgY2FsbGJhY2sgdG8gcmVjZWl2ZSBlYWNoIHJlYWQgY2h1bmsuXG4gICAqIElmIGVtcHR5IGNodW5rIGlzIHJldHVybmVkLCBpdCBtZWFucyBmaWxlIGhhcyBiZWVuIGNvbXBsZXRlbHkgcmVhZC5cbiAgICpcbiAgICogQHNpbmNlIDcuMS4wXG4gICAqL1xuICByZWFkRmlsZUluQ2h1bmtzKG9wdGlvbnM6IFJlYWRGaWxlSW5DaHVua3NPcHRpb25zLCBjYWxsYmFjazogUmVhZEZpbGVJbkNodW5rc0NhbGxiYWNrKTogUHJvbWlzZTxDYWxsYmFja0lEPjtcblxuICAvKipcbiAgICogV3JpdGUgYSBmaWxlIHRvIGRpc2sgaW4gdGhlIHNwZWNpZmllZCBsb2NhdGlvbiBvbiBkZXZpY2VcbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICB3cml0ZUZpbGUob3B0aW9uczogV3JpdGVGaWxlT3B0aW9ucyk6IFByb21pc2U8V3JpdGVGaWxlUmVzdWx0PjtcblxuICAvKipcbiAgICogQXBwZW5kIHRvIGEgZmlsZSBvbiBkaXNrIGluIHRoZSBzcGVjaWZpZWQgbG9jYXRpb24gb24gZGV2aWNlXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgYXBwZW5kRmlsZShvcHRpb25zOiBBcHBlbmRGaWxlT3B0aW9ucyk6IFByb21pc2U8dm9pZD47XG5cbiAgLyoqXG4gICAqIERlbGV0ZSBhIGZpbGUgZnJvbSBkaXNrXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgZGVsZXRlRmlsZShvcHRpb25zOiBEZWxldGVGaWxlT3B0aW9ucyk6IFByb21pc2U8dm9pZD47XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIGRpcmVjdG9yeS5cbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICBta2RpcihvcHRpb25zOiBNa2Rpck9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+O1xuXG4gIC8qKlxuICAgKiBSZW1vdmUgYSBkaXJlY3RvcnlcbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICBybWRpcihvcHRpb25zOiBSbWRpck9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+O1xuXG4gIC8qKlxuICAgKiBSZXR1cm4gYSBsaXN0IG9mIGZpbGVzIGZyb20gdGhlIGRpcmVjdG9yeSAobm90IHJlY3Vyc2l2ZSlcbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICByZWFkZGlyKG9wdGlvbnM6IFJlYWRkaXJPcHRpb25zKTogUHJvbWlzZTxSZWFkZGlyUmVzdWx0PjtcblxuICAvKipcbiAgICogUmV0dXJuIGZ1bGwgRmlsZSBVUkkgZm9yIGEgcGF0aCBhbmQgZGlyZWN0b3J5XG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgZ2V0VXJpKG9wdGlvbnM6IEdldFVyaU9wdGlvbnMpOiBQcm9taXNlPEdldFVyaVJlc3VsdD47XG5cbiAgLyoqXG4gICAqIFJldHVybiBkYXRhIGFib3V0IGEgZmlsZVxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIHN0YXQob3B0aW9uczogU3RhdE9wdGlvbnMpOiBQcm9taXNlPFN0YXRSZXN1bHQ+O1xuXG4gIC8qKlxuICAgKiBSZW5hbWUgYSBmaWxlIG9yIGRpcmVjdG9yeVxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIHJlbmFtZShvcHRpb25zOiBSZW5hbWVPcHRpb25zKTogUHJvbWlzZTx2b2lkPjtcblxuICAvKipcbiAgICogQ29weSBhIGZpbGUgb3IgZGlyZWN0b3J5XG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgY29weShvcHRpb25zOiBDb3B5T3B0aW9ucyk6IFByb21pc2U8Q29weVJlc3VsdD47XG5cbiAgLyoqXG4gICAqIFBlcmZvcm0gYSBodHRwIHJlcXVlc3QgdG8gYSBzZXJ2ZXIgYW5kIGRvd25sb2FkIHRoZSBmaWxlIHRvIHRoZSBzcGVjaWZpZWQgZGVzdGluYXRpb24uXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGhhcyBiZWVuIGRlcHJlY2F0ZWQgc2luY2UgdmVyc2lvbiA3LjEuMC5cbiAgICogV2UgcmVjb21tZW5kIHVzaW5nIHRoZSBAY2FwYWNpdG9yL2ZpbGUtdHJhbnNmZXIgcGx1Z2luIGluc3RlYWQsIGluIGNvbmp1bmN0aW9uIHdpdGggdGhpcyBwbHVnaW4uXG4gICAqXG4gICAqIEBzaW5jZSA1LjEuMFxuICAgKiBAZGVwcmVjYXRlZCBVc2UgdGhlIEBjYXBhY2l0b3IvZmlsZS10cmFuc2ZlciBwbHVnaW4gaW5zdGVhZC5cbiAgICovXG4gIGRvd25sb2FkRmlsZShvcHRpb25zOiBEb3dubG9hZEZpbGVPcHRpb25zKTogUHJvbWlzZTxEb3dubG9hZEZpbGVSZXN1bHQ+O1xuXG4gIC8qKlxuICAgKiBBZGQgYSBsaXN0ZW5lciB0byBmaWxlIGRvd25sb2FkIHByb2dyZXNzIGV2ZW50cy5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgaGFzIGJlZW4gZGVwcmVjYXRlZCBzaW5jZSB2ZXJzaW9uIDcuMS4wLlxuICAgKiBXZSByZWNvbW1lbmQgdXNpbmcgdGhlIEBjYXBhY2l0b3IvZmlsZS10cmFuc2ZlciBwbHVnaW4gaW5zdGVhZCwgaW4gY29uanVuY3Rpb24gd2l0aCB0aGlzIHBsdWdpbi5cbiAgICpcbiAgICogQHNpbmNlIDUuMS4wXG4gICAqIEBkZXByZWNhdGVkIFVzZSB0aGUgQGNhcGFjaXRvci9maWxlLXRyYW5zZmVyIHBsdWdpbiBpbnN0ZWFkLlxuICAgKi9cbiAgYWRkTGlzdGVuZXIoZXZlbnROYW1lOiAncHJvZ3Jlc3MnLCBsaXN0ZW5lckZ1bmM6IFByb2dyZXNzTGlzdGVuZXIpOiBQcm9taXNlPFBsdWdpbkxpc3RlbmVySGFuZGxlPjtcblxuICAvKipcbiAgICogUmVtb3ZlIGFsbCBsaXN0ZW5lcnMgZm9yIHRoaXMgcGx1Z2luLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBoYXMgYmVlbiBkZXByZWNhdGVkIHNpbmNlIHZlcnNpb24gNy4xLjAuXG4gICAqIFdlIHJlY29tbWVuZCB1c2luZyB0aGUgQGNhcGFjaXRvci9maWxlLXRyYW5zZmVyIHBsdWdpbiBpbnN0ZWFkLCBpbiBjb25qdW5jdGlvbiB3aXRoIHRoaXMgcGx1Z2luLlxuICAgKlxuICAgKiBAc2luY2UgNS4yLjBcbiAgICogQGRlcHJlY2F0ZWQgVXNlIHRoZSBAY2FwYWNpdG9yL2ZpbGUtdHJhbnNmZXIgcGx1Z2luIGluc3RlYWQuXG4gICAqL1xuICByZW1vdmVBbGxMaXN0ZW5lcnMoKTogUHJvbWlzZTx2b2lkPjtcbn1cblxuLyoqXG4gKiBTdHJ1Y3R1cmUgZm9yIGVycm9ycyByZXR1cm5lZCBieSB0aGUgcGx1Z2luLlxuICpcbiAqIGBjb2RlYCBmb2xsb3dzIFwiT1MtUExVRy1GSUxFLVhYWFhcIiBmb3JtYXRcbiAqXG4gKiBAc2luY2UgMS4wLjBcbiAqL1xuZXhwb3J0IHR5cGUgUGx1Z2luRXJyb3IgPSB7XG4gIGNvZGU6IHN0cmluZztcbiAgbWVzc2FnZTogc3RyaW5nO1xufTtcblxuLyoqXG4gKiBAZGVwcmVjYXRlZCBVc2UgYFJlYWRGaWxlT3B0aW9uc2AuXG4gKiBAc2luY2UgMS4wLjBcbiAqL1xuZXhwb3J0IHR5cGUgRmlsZVJlYWRPcHRpb25zID0gUmVhZEZpbGVPcHRpb25zO1xuXG4vKipcbiAqIEBkZXByZWNhdGVkIFVzZSBgUmVhZEZpbGVSZXN1bHRgLlxuICogQHNpbmNlIDEuMC4wXG4gKi9cbmV4cG9ydCB0eXBlIEZpbGVSZWFkUmVzdWx0ID0gUmVhZEZpbGVSZXN1bHQ7XG5cbi8qKlxuICogQGRlcHJlY2F0ZWQgVXNlIGBXcml0ZUZpbGVPcHRpb25zYC5cbiAqIEBzaW5jZSAxLjAuMFxuICovXG5leHBvcnQgdHlwZSBGaWxlV3JpdGVPcHRpb25zID0gV3JpdGVGaWxlT3B0aW9ucztcblxuLyoqXG4gKiBAZGVwcmVjYXRlZCBVc2UgYFdyaXRlRmlsZVJlc3VsdGAuXG4gKiBAc2luY2UgMS4wLjBcbiAqL1xuZXhwb3J0IHR5cGUgRmlsZVdyaXRlUmVzdWx0ID0gV3JpdGVGaWxlUmVzdWx0O1xuXG4vKipcbiAqIEBkZXByZWNhdGVkIFVzZSBgQXBwZW5kRmlsZU9wdGlvbnNgLlxuICogQHNpbmNlIDEuMC4wXG4gKi9cbmV4cG9ydCB0eXBlIEZpbGVBcHBlbmRPcHRpb25zID0gQXBwZW5kRmlsZU9wdGlvbnM7XG5cbi8qKlxuICogQGRlcHJlY2F0ZWQgVXNlIGBEZWxldGVGaWxlT3B0aW9uc2AuXG4gKiBAc2luY2UgMS4wLjBcbiAqL1xuZXhwb3J0IHR5cGUgRmlsZURlbGV0ZU9wdGlvbnMgPSBEZWxldGVGaWxlT3B0aW9ucztcblxuLyoqXG4gKiBAZGVwcmVjYXRlZCBVc2UgYERpcmVjdG9yeWAuXG4gKiBAc2luY2UgMS4wLjBcbiAqL1xuZXhwb3J0IGNvbnN0IEZpbGVzeXN0ZW1EaXJlY3RvcnkgPSBEaXJlY3Rvcnk7XG5cbi8qKlxuICogQGRlcHJlY2F0ZWQgVXNlIGBFbmNvZGluZ2AuXG4gKiBAc2luY2UgMS4wLjBcbiAqL1xuZXhwb3J0IGNvbnN0IEZpbGVzeXN0ZW1FbmNvZGluZyA9IEVuY29kaW5nO1xuIiwgImltcG9ydCB7IFdlYlBsdWdpbiwgYnVpbGRSZXF1ZXN0SW5pdCB9IGZyb20gJ0BjYXBhY2l0b3IvY29yZSc7XG5cbmltcG9ydCB0eXBlIHtcbiAgQXBwZW5kRmlsZU9wdGlvbnMsXG4gIENvcHlPcHRpb25zLFxuICBDb3B5UmVzdWx0LFxuICBEZWxldGVGaWxlT3B0aW9ucyxcbiAgRmlsZXN5c3RlbVBsdWdpbixcbiAgR2V0VXJpT3B0aW9ucyxcbiAgR2V0VXJpUmVzdWx0LFxuICBNa2Rpck9wdGlvbnMsXG4gIFBlcm1pc3Npb25TdGF0dXMsXG4gIFJlYWRGaWxlT3B0aW9ucyxcbiAgUmVhZEZpbGVSZXN1bHQsXG4gIFJlYWRkaXJPcHRpb25zLFxuICBSZWFkZGlyUmVzdWx0LFxuICBSZW5hbWVPcHRpb25zLFxuICBSbWRpck9wdGlvbnMsXG4gIFN0YXRPcHRpb25zLFxuICBTdGF0UmVzdWx0LFxuICBXcml0ZUZpbGVPcHRpb25zLFxuICBXcml0ZUZpbGVSZXN1bHQsXG4gIERpcmVjdG9yeSxcbiAgUmVhZEZpbGVJbkNodW5rc09wdGlvbnMsXG4gIENhbGxiYWNrSUQsXG4gIERvd25sb2FkRmlsZU9wdGlvbnMsXG4gIERvd25sb2FkRmlsZVJlc3VsdCxcbiAgUHJvZ3Jlc3NTdGF0dXMsXG4gIFJlYWRGaWxlSW5DaHVua3NDYWxsYmFjayxcbn0gZnJvbSAnLi9kZWZpbml0aW9ucyc7XG5pbXBvcnQgeyBFbmNvZGluZyB9IGZyb20gJy4vZGVmaW5pdGlvbnMnO1xuXG5mdW5jdGlvbiByZXNvbHZlKHBhdGg6IHN0cmluZyk6IHN0cmluZyB7XG4gIGNvbnN0IHBvc2l4ID0gcGF0aC5zcGxpdCgnLycpLmZpbHRlcigoaXRlbSkgPT4gaXRlbSAhPT0gJy4nKTtcbiAgY29uc3QgbmV3UG9zaXg6IHN0cmluZ1tdID0gW107XG5cbiAgcG9zaXguZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgIGlmIChpdGVtID09PSAnLi4nICYmIG5ld1Bvc2l4Lmxlbmd0aCA+IDAgJiYgbmV3UG9zaXhbbmV3UG9zaXgubGVuZ3RoIC0gMV0gIT09ICcuLicpIHtcbiAgICAgIG5ld1Bvc2l4LnBvcCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXdQb3NpeC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIG5ld1Bvc2l4LmpvaW4oJy8nKTtcbn1cbmZ1bmN0aW9uIGlzUGF0aFBhcmVudChwYXJlbnQ6IHN0cmluZywgY2hpbGRyZW46IHN0cmluZyk6IGJvb2xlYW4ge1xuICBwYXJlbnQgPSByZXNvbHZlKHBhcmVudCk7XG4gIGNoaWxkcmVuID0gcmVzb2x2ZShjaGlsZHJlbik7XG4gIGNvbnN0IHBhdGhzQSA9IHBhcmVudC5zcGxpdCgnLycpO1xuICBjb25zdCBwYXRoc0IgPSBjaGlsZHJlbi5zcGxpdCgnLycpO1xuXG4gIHJldHVybiBwYXJlbnQgIT09IGNoaWxkcmVuICYmIHBhdGhzQS5ldmVyeSgodmFsdWUsIGluZGV4KSA9PiB2YWx1ZSA9PT0gcGF0aHNCW2luZGV4XSk7XG59XG5cbmV4cG9ydCBjbGFzcyBGaWxlc3lzdGVtV2ViIGV4dGVuZHMgV2ViUGx1Z2luIGltcGxlbWVudHMgRmlsZXN5c3RlbVBsdWdpbiB7XG4gIHJlYWRGaWxlSW5DaHVua3MoX29wdGlvbnM6IFJlYWRGaWxlSW5DaHVua3NPcHRpb25zLCBfY2FsbGJhY2s6IFJlYWRGaWxlSW5DaHVua3NDYWxsYmFjayk6IFByb21pc2U8Q2FsbGJhY2tJRD4ge1xuICAgIHRocm93IHRoaXMudW5hdmFpbGFibGUoJ01ldGhvZCBub3QgaW1wbGVtZW50ZWQuJyk7XG4gIH1cbiAgREJfVkVSU0lPTiA9IDE7XG4gIERCX05BTUUgPSAnRGlzYyc7XG5cbiAgcHJpdmF0ZSBfd3JpdGVDbWRzOiBzdHJpbmdbXSA9IFsnYWRkJywgJ3B1dCcsICdkZWxldGUnXTtcbiAgcHJpdmF0ZSBfZGI/OiBJREJEYXRhYmFzZTtcbiAgc3RhdGljIF9kZWJ1ZyA9IHRydWU7XG4gIGFzeW5jIGluaXREYigpOiBQcm9taXNlPElEQkRhdGFiYXNlPiB7XG4gICAgaWYgKHRoaXMuX2RiICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLl9kYjtcbiAgICB9XG4gICAgaWYgKCEoJ2luZGV4ZWREQicgaW4gd2luZG93KSkge1xuICAgICAgdGhyb3cgdGhpcy51bmF2YWlsYWJsZShcIlRoaXMgYnJvd3NlciBkb2Vzbid0IHN1cHBvcnQgSW5kZXhlZERCXCIpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxJREJEYXRhYmFzZT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgcmVxdWVzdCA9IGluZGV4ZWREQi5vcGVuKHRoaXMuREJfTkFNRSwgdGhpcy5EQl9WRVJTSU9OKTtcbiAgICAgIHJlcXVlc3Qub251cGdyYWRlbmVlZGVkID0gRmlsZXN5c3RlbVdlYi5kb1VwZ3JhZGU7XG4gICAgICByZXF1ZXN0Lm9uc3VjY2VzcyA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5fZGIgPSByZXF1ZXN0LnJlc3VsdDtcbiAgICAgICAgcmVzb2x2ZShyZXF1ZXN0LnJlc3VsdCk7XG4gICAgICB9O1xuICAgICAgcmVxdWVzdC5vbmVycm9yID0gKCkgPT4gcmVqZWN0KHJlcXVlc3QuZXJyb3IpO1xuICAgICAgcmVxdWVzdC5vbmJsb2NrZWQgPSAoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUud2FybignZGIgYmxvY2tlZCcpO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBkb1VwZ3JhZGUoZXZlbnQ6IElEQlZlcnNpb25DaGFuZ2VFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IGV2ZW50VGFyZ2V0ID0gZXZlbnQudGFyZ2V0IGFzIElEQk9wZW5EQlJlcXVlc3Q7XG4gICAgY29uc3QgZGIgPSBldmVudFRhcmdldC5yZXN1bHQ7XG4gICAgc3dpdGNoIChldmVudC5vbGRWZXJzaW9uKSB7XG4gICAgICBjYXNlIDA6XG4gICAgICBjYXNlIDE6XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIGlmIChkYi5vYmplY3RTdG9yZU5hbWVzLmNvbnRhaW5zKCdGaWxlU3RvcmFnZScpKSB7XG4gICAgICAgICAgZGIuZGVsZXRlT2JqZWN0U3RvcmUoJ0ZpbGVTdG9yYWdlJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc3RvcmUgPSBkYi5jcmVhdGVPYmplY3RTdG9yZSgnRmlsZVN0b3JhZ2UnLCB7IGtleVBhdGg6ICdwYXRoJyB9KTtcbiAgICAgICAgc3RvcmUuY3JlYXRlSW5kZXgoJ2J5X2ZvbGRlcicsICdmb2xkZXInKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhc3luYyBkYlJlcXVlc3QoY21kOiBzdHJpbmcsIGFyZ3M6IGFueVtdKTogUHJvbWlzZTxhbnk+IHtcbiAgICBjb25zdCByZWFkRmxhZyA9IHRoaXMuX3dyaXRlQ21kcy5pbmRleE9mKGNtZCkgIT09IC0xID8gJ3JlYWR3cml0ZScgOiAncmVhZG9ubHknO1xuICAgIHJldHVybiB0aGlzLmluaXREYigpLnRoZW4oKGNvbm46IElEQkRhdGFiYXNlKSA9PiB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2U8SURCT2JqZWN0U3RvcmU+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgY29uc3QgdHg6IElEQlRyYW5zYWN0aW9uID0gY29ubi50cmFuc2FjdGlvbihbJ0ZpbGVTdG9yYWdlJ10sIHJlYWRGbGFnKTtcbiAgICAgICAgY29uc3Qgc3RvcmU6IGFueSA9IHR4Lm9iamVjdFN0b3JlKCdGaWxlU3RvcmFnZScpO1xuICAgICAgICBjb25zdCByZXEgPSBzdG9yZVtjbWRdKC4uLmFyZ3MpO1xuICAgICAgICByZXEub25zdWNjZXNzID0gKCkgPT4gcmVzb2x2ZShyZXEucmVzdWx0KTtcbiAgICAgICAgcmVxLm9uZXJyb3IgPSAoKSA9PiByZWplY3QocmVxLmVycm9yKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgZGJJbmRleFJlcXVlc3QoaW5kZXhOYW1lOiBzdHJpbmcsIGNtZDogc3RyaW5nLCBhcmdzOiBbYW55XSk6IFByb21pc2U8YW55PiB7XG4gICAgY29uc3QgcmVhZEZsYWcgPSB0aGlzLl93cml0ZUNtZHMuaW5kZXhPZihjbWQpICE9PSAtMSA/ICdyZWFkd3JpdGUnIDogJ3JlYWRvbmx5JztcbiAgICByZXR1cm4gdGhpcy5pbml0RGIoKS50aGVuKChjb25uOiBJREJEYXRhYmFzZSkgPT4ge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPElEQk9iamVjdFN0b3JlPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGNvbnN0IHR4OiBJREJUcmFuc2FjdGlvbiA9IGNvbm4udHJhbnNhY3Rpb24oWydGaWxlU3RvcmFnZSddLCByZWFkRmxhZyk7XG4gICAgICAgIGNvbnN0IHN0b3JlOiBJREJPYmplY3RTdG9yZSA9IHR4Lm9iamVjdFN0b3JlKCdGaWxlU3RvcmFnZScpO1xuICAgICAgICBjb25zdCBpbmRleDogYW55ID0gc3RvcmUuaW5kZXgoaW5kZXhOYW1lKTtcbiAgICAgICAgY29uc3QgcmVxID0gaW5kZXhbY21kXSguLi5hcmdzKSBhcyBhbnk7XG4gICAgICAgIHJlcS5vbnN1Y2Nlc3MgPSAoKSA9PiByZXNvbHZlKHJlcS5yZXN1bHQpO1xuICAgICAgICByZXEub25lcnJvciA9ICgpID0+IHJlamVjdChyZXEuZXJyb3IpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGdldFBhdGgoZGlyZWN0b3J5OiBEaXJlY3RvcnkgfCB1bmRlZmluZWQsIHVyaVBhdGg6IHN0cmluZyB8IHVuZGVmaW5lZCk6IHN0cmluZyB7XG4gICAgY29uc3QgY2xlYW5lZFVyaVBhdGggPSB1cmlQYXRoICE9PSB1bmRlZmluZWQgPyB1cmlQYXRoLnJlcGxhY2UoL15bL10rfFsvXSskL2csICcnKSA6ICcnO1xuICAgIGxldCBmc1BhdGggPSAnJztcbiAgICBpZiAoZGlyZWN0b3J5ICE9PSB1bmRlZmluZWQpIGZzUGF0aCArPSAnLycgKyBkaXJlY3Rvcnk7XG4gICAgaWYgKHVyaVBhdGggIT09ICcnKSBmc1BhdGggKz0gJy8nICsgY2xlYW5lZFVyaVBhdGg7XG4gICAgcmV0dXJuIGZzUGF0aDtcbiAgfVxuXG4gIGFzeW5jIGNsZWFyKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGNvbm46IElEQkRhdGFiYXNlID0gYXdhaXQgdGhpcy5pbml0RGIoKTtcbiAgICBjb25zdCB0eDogSURCVHJhbnNhY3Rpb24gPSBjb25uLnRyYW5zYWN0aW9uKFsnRmlsZVN0b3JhZ2UnXSwgJ3JlYWR3cml0ZScpO1xuICAgIGNvbnN0IHN0b3JlOiBJREJPYmplY3RTdG9yZSA9IHR4Lm9iamVjdFN0b3JlKCdGaWxlU3RvcmFnZScpO1xuICAgIHN0b3JlLmNsZWFyKCk7XG4gIH1cblxuICAvKipcbiAgICogUmVhZCBhIGZpbGUgZnJvbSBkaXNrXG4gICAqIEBwYXJhbSBvcHRpb25zIG9wdGlvbnMgZm9yIHRoZSBmaWxlIHJlYWRcbiAgICogQHJldHVybiBhIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSByZWFkIGZpbGUgZGF0YSByZXN1bHRcbiAgICovXG4gIGFzeW5jIHJlYWRGaWxlKG9wdGlvbnM6IFJlYWRGaWxlT3B0aW9ucyk6IFByb21pc2U8UmVhZEZpbGVSZXN1bHQ+IHtcbiAgICBjb25zdCBwYXRoOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgob3B0aW9ucy5kaXJlY3RvcnksIG9wdGlvbnMucGF0aCk7XG4gICAgLy8gY29uc3QgZW5jb2RpbmcgPSBvcHRpb25zLmVuY29kaW5nO1xuXG4gICAgY29uc3QgZW50cnkgPSAoYXdhaXQgdGhpcy5kYlJlcXVlc3QoJ2dldCcsIFtwYXRoXSkpIGFzIEVudHJ5T2JqO1xuICAgIGlmIChlbnRyeSA9PT0gdW5kZWZpbmVkKSB0aHJvdyBFcnJvcignRmlsZSBkb2VzIG5vdCBleGlzdC4nKTtcbiAgICByZXR1cm4geyBkYXRhOiBlbnRyeS5jb250ZW50ID8gZW50cnkuY29udGVudCA6ICcnIH07XG4gIH1cblxuICAvKipcbiAgICogV3JpdGUgYSBmaWxlIHRvIGRpc2sgaW4gdGhlIHNwZWNpZmllZCBsb2NhdGlvbiBvbiBkZXZpY2VcbiAgICogQHBhcmFtIG9wdGlvbnMgb3B0aW9ucyBmb3IgdGhlIGZpbGUgd3JpdGVcbiAgICogQHJldHVybiBhIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBmaWxlIHdyaXRlIHJlc3VsdFxuICAgKi9cbiAgYXN5bmMgd3JpdGVGaWxlKG9wdGlvbnM6IFdyaXRlRmlsZU9wdGlvbnMpOiBQcm9taXNlPFdyaXRlRmlsZVJlc3VsdD4ge1xuICAgIGNvbnN0IHBhdGg6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aChvcHRpb25zLmRpcmVjdG9yeSwgb3B0aW9ucy5wYXRoKTtcbiAgICBsZXQgZGF0YSA9IG9wdGlvbnMuZGF0YTtcbiAgICBjb25zdCBlbmNvZGluZyA9IG9wdGlvbnMuZW5jb2Rpbmc7XG4gICAgY29uc3QgZG9SZWN1cnNpdmUgPSBvcHRpb25zLnJlY3Vyc2l2ZTtcblxuICAgIGNvbnN0IG9jY3VwaWVkRW50cnkgPSAoYXdhaXQgdGhpcy5kYlJlcXVlc3QoJ2dldCcsIFtwYXRoXSkpIGFzIEVudHJ5T2JqO1xuICAgIGlmIChvY2N1cGllZEVudHJ5ICYmIG9jY3VwaWVkRW50cnkudHlwZSA9PT0gJ2RpcmVjdG9yeScpIHRocm93IEVycm9yKCdUaGUgc3VwcGxpZWQgcGF0aCBpcyBhIGRpcmVjdG9yeS4nKTtcblxuICAgIGNvbnN0IHBhcmVudFBhdGggPSBwYXRoLnN1YnN0cigwLCBwYXRoLmxhc3RJbmRleE9mKCcvJykpO1xuXG4gICAgY29uc3QgcGFyZW50RW50cnkgPSAoYXdhaXQgdGhpcy5kYlJlcXVlc3QoJ2dldCcsIFtwYXJlbnRQYXRoXSkpIGFzIEVudHJ5T2JqO1xuICAgIGlmIChwYXJlbnRFbnRyeSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zdCBzdWJEaXJJbmRleCA9IHBhcmVudFBhdGguaW5kZXhPZignLycsIDEpO1xuICAgICAgaWYgKHN1YkRpckluZGV4ICE9PSAtMSkge1xuICAgICAgICBjb25zdCBwYXJlbnRBcmdQYXRoID0gcGFyZW50UGF0aC5zdWJzdHIoc3ViRGlySW5kZXgpO1xuICAgICAgICBhd2FpdCB0aGlzLm1rZGlyKHtcbiAgICAgICAgICBwYXRoOiBwYXJlbnRBcmdQYXRoLFxuICAgICAgICAgIGRpcmVjdG9yeTogb3B0aW9ucy5kaXJlY3RvcnksXG4gICAgICAgICAgcmVjdXJzaXZlOiBkb1JlY3Vyc2l2ZSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFlbmNvZGluZyAmJiAhKGRhdGEgaW5zdGFuY2VvZiBCbG9iKSkge1xuICAgICAgZGF0YSA9IGRhdGEuaW5kZXhPZignLCcpID49IDAgPyBkYXRhLnNwbGl0KCcsJylbMV0gOiBkYXRhO1xuICAgICAgaWYgKCF0aGlzLmlzQmFzZTY0U3RyaW5nKGRhdGEpKSB0aHJvdyBFcnJvcignVGhlIHN1cHBsaWVkIGRhdGEgaXMgbm90IHZhbGlkIGJhc2U2NCBjb250ZW50LicpO1xuICAgIH1cblxuICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgY29uc3QgcGF0aE9iajogRW50cnlPYmogPSB7XG4gICAgICBwYXRoOiBwYXRoLFxuICAgICAgZm9sZGVyOiBwYXJlbnRQYXRoLFxuICAgICAgdHlwZTogJ2ZpbGUnLFxuICAgICAgc2l6ZTogZGF0YSBpbnN0YW5jZW9mIEJsb2IgPyBkYXRhLnNpemUgOiBkYXRhLmxlbmd0aCxcbiAgICAgIGN0aW1lOiBub3csXG4gICAgICBtdGltZTogbm93LFxuICAgICAgY29udGVudDogZGF0YSxcbiAgICB9O1xuICAgIGF3YWl0IHRoaXMuZGJSZXF1ZXN0KCdwdXQnLCBbcGF0aE9ial0pO1xuICAgIHJldHVybiB7XG4gICAgICB1cmk6IHBhdGhPYmoucGF0aCxcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGVuZCB0byBhIGZpbGUgb24gZGlzayBpbiB0aGUgc3BlY2lmaWVkIGxvY2F0aW9uIG9uIGRldmljZVxuICAgKiBAcGFyYW0gb3B0aW9ucyBvcHRpb25zIGZvciB0aGUgZmlsZSBhcHBlbmRcbiAgICogQHJldHVybiBhIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBmaWxlIHdyaXRlIHJlc3VsdFxuICAgKi9cbiAgYXN5bmMgYXBwZW5kRmlsZShvcHRpb25zOiBBcHBlbmRGaWxlT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHBhdGg6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aChvcHRpb25zLmRpcmVjdG9yeSwgb3B0aW9ucy5wYXRoKTtcbiAgICBsZXQgZGF0YSA9IG9wdGlvbnMuZGF0YTtcbiAgICBjb25zdCBlbmNvZGluZyA9IG9wdGlvbnMuZW5jb2Rpbmc7XG4gICAgY29uc3QgcGFyZW50UGF0aCA9IHBhdGguc3Vic3RyKDAsIHBhdGgubGFzdEluZGV4T2YoJy8nKSk7XG5cbiAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgIGxldCBjdGltZSA9IG5vdztcblxuICAgIGNvbnN0IG9jY3VwaWVkRW50cnkgPSAoYXdhaXQgdGhpcy5kYlJlcXVlc3QoJ2dldCcsIFtwYXRoXSkpIGFzIEVudHJ5T2JqO1xuICAgIGlmIChvY2N1cGllZEVudHJ5ICYmIG9jY3VwaWVkRW50cnkudHlwZSA9PT0gJ2RpcmVjdG9yeScpIHRocm93IEVycm9yKCdUaGUgc3VwcGxpZWQgcGF0aCBpcyBhIGRpcmVjdG9yeS4nKTtcblxuICAgIGNvbnN0IHBhcmVudEVudHJ5ID0gKGF3YWl0IHRoaXMuZGJSZXF1ZXN0KCdnZXQnLCBbcGFyZW50UGF0aF0pKSBhcyBFbnRyeU9iajtcbiAgICBpZiAocGFyZW50RW50cnkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc3Qgc3ViRGlySW5kZXggPSBwYXJlbnRQYXRoLmluZGV4T2YoJy8nLCAxKTtcbiAgICAgIGlmIChzdWJEaXJJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgY29uc3QgcGFyZW50QXJnUGF0aCA9IHBhcmVudFBhdGguc3Vic3RyKHN1YkRpckluZGV4KTtcbiAgICAgICAgYXdhaXQgdGhpcy5ta2Rpcih7XG4gICAgICAgICAgcGF0aDogcGFyZW50QXJnUGF0aCxcbiAgICAgICAgICBkaXJlY3Rvcnk6IG9wdGlvbnMuZGlyZWN0b3J5LFxuICAgICAgICAgIHJlY3Vyc2l2ZTogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFlbmNvZGluZyAmJiAhdGhpcy5pc0Jhc2U2NFN0cmluZyhkYXRhKSkgdGhyb3cgRXJyb3IoJ1RoZSBzdXBwbGllZCBkYXRhIGlzIG5vdCB2YWxpZCBiYXNlNjQgY29udGVudC4nKTtcblxuICAgIGlmIChvY2N1cGllZEVudHJ5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmIChvY2N1cGllZEVudHJ5LmNvbnRlbnQgaW5zdGFuY2VvZiBCbG9iKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdUaGUgb2NjdXBpZWQgZW50cnkgY29udGFpbnMgYSBCbG9iIG9iamVjdCB3aGljaCBjYW5ub3QgYmUgYXBwZW5kZWQgdG8uJyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChvY2N1cGllZEVudHJ5LmNvbnRlbnQgIT09IHVuZGVmaW5lZCAmJiAhZW5jb2RpbmcpIHtcbiAgICAgICAgZGF0YSA9IGJ0b2EoYXRvYihvY2N1cGllZEVudHJ5LmNvbnRlbnQpICsgYXRvYihkYXRhKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkYXRhID0gb2NjdXBpZWRFbnRyeS5jb250ZW50ICsgZGF0YTtcbiAgICAgIH1cbiAgICAgIGN0aW1lID0gb2NjdXBpZWRFbnRyeS5jdGltZTtcbiAgICB9XG4gICAgY29uc3QgcGF0aE9iajogRW50cnlPYmogPSB7XG4gICAgICBwYXRoOiBwYXRoLFxuICAgICAgZm9sZGVyOiBwYXJlbnRQYXRoLFxuICAgICAgdHlwZTogJ2ZpbGUnLFxuICAgICAgc2l6ZTogZGF0YS5sZW5ndGgsXG4gICAgICBjdGltZTogY3RpbWUsXG4gICAgICBtdGltZTogbm93LFxuICAgICAgY29udGVudDogZGF0YSxcbiAgICB9O1xuICAgIGF3YWl0IHRoaXMuZGJSZXF1ZXN0KCdwdXQnLCBbcGF0aE9ial0pO1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZSBhIGZpbGUgZnJvbSBkaXNrXG4gICAqIEBwYXJhbSBvcHRpb25zIG9wdGlvbnMgZm9yIHRoZSBmaWxlIGRlbGV0ZVxuICAgKiBAcmV0dXJuIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIGRlbGV0ZWQgZmlsZSBkYXRhIHJlc3VsdFxuICAgKi9cbiAgYXN5bmMgZGVsZXRlRmlsZShvcHRpb25zOiBEZWxldGVGaWxlT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHBhdGg6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aChvcHRpb25zLmRpcmVjdG9yeSwgb3B0aW9ucy5wYXRoKTtcblxuICAgIGNvbnN0IGVudHJ5ID0gKGF3YWl0IHRoaXMuZGJSZXF1ZXN0KCdnZXQnLCBbcGF0aF0pKSBhcyBFbnRyeU9iajtcbiAgICBpZiAoZW50cnkgPT09IHVuZGVmaW5lZCkgdGhyb3cgRXJyb3IoJ0ZpbGUgZG9lcyBub3QgZXhpc3QuJyk7XG4gICAgY29uc3QgZW50cmllcyA9IGF3YWl0IHRoaXMuZGJJbmRleFJlcXVlc3QoJ2J5X2ZvbGRlcicsICdnZXRBbGxLZXlzJywgW0lEQktleVJhbmdlLm9ubHkocGF0aCldKTtcbiAgICBpZiAoZW50cmllcy5sZW5ndGggIT09IDApIHRocm93IEVycm9yKCdGb2xkZXIgaXMgbm90IGVtcHR5LicpO1xuXG4gICAgYXdhaXQgdGhpcy5kYlJlcXVlc3QoJ2RlbGV0ZScsIFtwYXRoXSk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgZGlyZWN0b3J5LlxuICAgKiBAcGFyYW0gb3B0aW9ucyBvcHRpb25zIGZvciB0aGUgbWtkaXJcbiAgICogQHJldHVybiBhIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBta2RpciByZXN1bHRcbiAgICovXG4gIGFzeW5jIG1rZGlyKG9wdGlvbnM6IE1rZGlyT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHBhdGg6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aChvcHRpb25zLmRpcmVjdG9yeSwgb3B0aW9ucy5wYXRoKTtcbiAgICBjb25zdCBkb1JlY3Vyc2l2ZSA9IG9wdGlvbnMucmVjdXJzaXZlO1xuICAgIGNvbnN0IHBhcmVudFBhdGggPSBwYXRoLnN1YnN0cigwLCBwYXRoLmxhc3RJbmRleE9mKCcvJykpO1xuXG4gICAgY29uc3QgZGVwdGggPSAocGF0aC5tYXRjaCgvXFwvL2cpIHx8IFtdKS5sZW5ndGg7XG4gICAgY29uc3QgcGFyZW50RW50cnkgPSAoYXdhaXQgdGhpcy5kYlJlcXVlc3QoJ2dldCcsIFtwYXJlbnRQYXRoXSkpIGFzIEVudHJ5T2JqO1xuICAgIGNvbnN0IG9jY3VwaWVkRW50cnkgPSAoYXdhaXQgdGhpcy5kYlJlcXVlc3QoJ2dldCcsIFtwYXRoXSkpIGFzIEVudHJ5T2JqO1xuICAgIGlmIChkZXB0aCA9PT0gMSkgdGhyb3cgRXJyb3IoJ0Nhbm5vdCBjcmVhdGUgUm9vdCBkaXJlY3RvcnknKTtcbiAgICBpZiAob2NjdXBpZWRFbnRyeSAhPT0gdW5kZWZpbmVkKSB0aHJvdyBFcnJvcignQ3VycmVudCBkaXJlY3RvcnkgZG9lcyBhbHJlYWR5IGV4aXN0LicpO1xuICAgIGlmICghZG9SZWN1cnNpdmUgJiYgZGVwdGggIT09IDIgJiYgcGFyZW50RW50cnkgPT09IHVuZGVmaW5lZCkgdGhyb3cgRXJyb3IoJ1BhcmVudCBkaXJlY3RvcnkgbXVzdCBleGlzdCcpO1xuXG4gICAgaWYgKGRvUmVjdXJzaXZlICYmIGRlcHRoICE9PSAyICYmIHBhcmVudEVudHJ5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IHBhcmVudEFyZ1BhdGggPSBwYXJlbnRQYXRoLnN1YnN0cihwYXJlbnRQYXRoLmluZGV4T2YoJy8nLCAxKSk7XG4gICAgICBhd2FpdCB0aGlzLm1rZGlyKHtcbiAgICAgICAgcGF0aDogcGFyZW50QXJnUGF0aCxcbiAgICAgICAgZGlyZWN0b3J5OiBvcHRpb25zLmRpcmVjdG9yeSxcbiAgICAgICAgcmVjdXJzaXZlOiBkb1JlY3Vyc2l2ZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgIGNvbnN0IHBhdGhPYmo6IEVudHJ5T2JqID0ge1xuICAgICAgcGF0aDogcGF0aCxcbiAgICAgIGZvbGRlcjogcGFyZW50UGF0aCxcbiAgICAgIHR5cGU6ICdkaXJlY3RvcnknLFxuICAgICAgc2l6ZTogMCxcbiAgICAgIGN0aW1lOiBub3csXG4gICAgICBtdGltZTogbm93LFxuICAgIH07XG4gICAgYXdhaXQgdGhpcy5kYlJlcXVlc3QoJ3B1dCcsIFtwYXRoT2JqXSk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGEgZGlyZWN0b3J5XG4gICAqIEBwYXJhbSBvcHRpb25zIHRoZSBvcHRpb25zIGZvciB0aGUgZGlyZWN0b3J5IHJlbW92ZVxuICAgKi9cbiAgYXN5bmMgcm1kaXIob3B0aW9uczogUm1kaXJPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgeyBwYXRoLCBkaXJlY3RvcnksIHJlY3Vyc2l2ZSB9ID0gb3B0aW9ucztcbiAgICBjb25zdCBmdWxsUGF0aDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKGRpcmVjdG9yeSwgcGF0aCk7XG5cbiAgICBjb25zdCBlbnRyeSA9IChhd2FpdCB0aGlzLmRiUmVxdWVzdCgnZ2V0JywgW2Z1bGxQYXRoXSkpIGFzIEVudHJ5T2JqO1xuXG4gICAgaWYgKGVudHJ5ID09PSB1bmRlZmluZWQpIHRocm93IEVycm9yKCdGb2xkZXIgZG9lcyBub3QgZXhpc3QuJyk7XG5cbiAgICBpZiAoZW50cnkudHlwZSAhPT0gJ2RpcmVjdG9yeScpIHRocm93IEVycm9yKCdSZXF1ZXN0ZWQgcGF0aCBpcyBub3QgYSBkaXJlY3RvcnknKTtcblxuICAgIGNvbnN0IHJlYWREaXJSZXN1bHQgPSBhd2FpdCB0aGlzLnJlYWRkaXIoeyBwYXRoLCBkaXJlY3RvcnkgfSk7XG5cbiAgICBpZiAocmVhZERpclJlc3VsdC5maWxlcy5sZW5ndGggIT09IDAgJiYgIXJlY3Vyc2l2ZSkgdGhyb3cgRXJyb3IoJ0ZvbGRlciBpcyBub3QgZW1wdHknKTtcblxuICAgIGZvciAoY29uc3QgZW50cnkgb2YgcmVhZERpclJlc3VsdC5maWxlcykge1xuICAgICAgY29uc3QgZW50cnlQYXRoID0gYCR7cGF0aH0vJHtlbnRyeS5uYW1lfWA7XG4gICAgICBjb25zdCBlbnRyeU9iaiA9IGF3YWl0IHRoaXMuc3RhdCh7IHBhdGg6IGVudHJ5UGF0aCwgZGlyZWN0b3J5IH0pO1xuICAgICAgaWYgKGVudHJ5T2JqLnR5cGUgPT09ICdmaWxlJykge1xuICAgICAgICBhd2FpdCB0aGlzLmRlbGV0ZUZpbGUoeyBwYXRoOiBlbnRyeVBhdGgsIGRpcmVjdG9yeSB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGF3YWl0IHRoaXMucm1kaXIoeyBwYXRoOiBlbnRyeVBhdGgsIGRpcmVjdG9yeSwgcmVjdXJzaXZlIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGF3YWl0IHRoaXMuZGJSZXF1ZXN0KCdkZWxldGUnLCBbZnVsbFBhdGhdKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYSBsaXN0IG9mIGZpbGVzIGZyb20gdGhlIGRpcmVjdG9yeSAobm90IHJlY3Vyc2l2ZSlcbiAgICogQHBhcmFtIG9wdGlvbnMgdGhlIG9wdGlvbnMgZm9yIHRoZSByZWFkZGlyIG9wZXJhdGlvblxuICAgKiBAcmV0dXJuIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIHJlYWRkaXIgZGlyZWN0b3J5IGxpc3RpbmcgcmVzdWx0XG4gICAqL1xuICBhc3luYyByZWFkZGlyKG9wdGlvbnM6IFJlYWRkaXJPcHRpb25zKTogUHJvbWlzZTxSZWFkZGlyUmVzdWx0PiB7XG4gICAgY29uc3QgcGF0aDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKG9wdGlvbnMuZGlyZWN0b3J5LCBvcHRpb25zLnBhdGgpO1xuXG4gICAgY29uc3QgZW50cnkgPSAoYXdhaXQgdGhpcy5kYlJlcXVlc3QoJ2dldCcsIFtwYXRoXSkpIGFzIEVudHJ5T2JqO1xuICAgIGlmIChvcHRpb25zLnBhdGggIT09ICcnICYmIGVudHJ5ID09PSB1bmRlZmluZWQpIHRocm93IEVycm9yKCdGb2xkZXIgZG9lcyBub3QgZXhpc3QuJyk7XG5cbiAgICBjb25zdCBlbnRyaWVzOiBzdHJpbmdbXSA9IGF3YWl0IHRoaXMuZGJJbmRleFJlcXVlc3QoJ2J5X2ZvbGRlcicsICdnZXRBbGxLZXlzJywgW0lEQktleVJhbmdlLm9ubHkocGF0aCldKTtcbiAgICBjb25zdCBmaWxlcyA9IGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgZW50cmllcy5tYXAoYXN5bmMgKGUpID0+IHtcbiAgICAgICAgbGV0IHN1YkVudHJ5ID0gKGF3YWl0IHRoaXMuZGJSZXF1ZXN0KCdnZXQnLCBbZV0pKSBhcyBFbnRyeU9iajtcbiAgICAgICAgaWYgKHN1YkVudHJ5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBzdWJFbnRyeSA9IChhd2FpdCB0aGlzLmRiUmVxdWVzdCgnZ2V0JywgW2UgKyAnLyddKSkgYXMgRW50cnlPYmo7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBuYW1lOiBlLnN1YnN0cmluZyhwYXRoLmxlbmd0aCArIDEpLFxuICAgICAgICAgIHR5cGU6IHN1YkVudHJ5LnR5cGUsXG4gICAgICAgICAgc2l6ZTogc3ViRW50cnkuc2l6ZSxcbiAgICAgICAgICBjdGltZTogc3ViRW50cnkuY3RpbWUsXG4gICAgICAgICAgbXRpbWU6IHN1YkVudHJ5Lm10aW1lLFxuICAgICAgICAgIHVyaTogc3ViRW50cnkucGF0aCxcbiAgICAgICAgfTtcbiAgICAgIH0pLFxuICAgICk7XG4gICAgcmV0dXJuIHsgZmlsZXM6IGZpbGVzIH07XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGZ1bGwgRmlsZSBVUkkgZm9yIGEgcGF0aCBhbmQgZGlyZWN0b3J5XG4gICAqIEBwYXJhbSBvcHRpb25zIHRoZSBvcHRpb25zIGZvciB0aGUgc3RhdCBvcGVyYXRpb25cbiAgICogQHJldHVybiBhIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBmaWxlIHN0YXQgcmVzdWx0XG4gICAqL1xuICBhc3luYyBnZXRVcmkob3B0aW9uczogR2V0VXJpT3B0aW9ucyk6IFByb21pc2U8R2V0VXJpUmVzdWx0PiB7XG4gICAgY29uc3QgcGF0aDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKG9wdGlvbnMuZGlyZWN0b3J5LCBvcHRpb25zLnBhdGgpO1xuXG4gICAgbGV0IGVudHJ5ID0gKGF3YWl0IHRoaXMuZGJSZXF1ZXN0KCdnZXQnLCBbcGF0aF0pKSBhcyBFbnRyeU9iajtcbiAgICBpZiAoZW50cnkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZW50cnkgPSAoYXdhaXQgdGhpcy5kYlJlcXVlc3QoJ2dldCcsIFtwYXRoICsgJy8nXSkpIGFzIEVudHJ5T2JqO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgdXJpOiBlbnRyeT8ucGF0aCB8fCBwYXRoLFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGRhdGEgYWJvdXQgYSBmaWxlXG4gICAqIEBwYXJhbSBvcHRpb25zIHRoZSBvcHRpb25zIGZvciB0aGUgc3RhdCBvcGVyYXRpb25cbiAgICogQHJldHVybiBhIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBmaWxlIHN0YXQgcmVzdWx0XG4gICAqL1xuICBhc3luYyBzdGF0KG9wdGlvbnM6IFN0YXRPcHRpb25zKTogUHJvbWlzZTxTdGF0UmVzdWx0PiB7XG4gICAgY29uc3QgcGF0aDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKG9wdGlvbnMuZGlyZWN0b3J5LCBvcHRpb25zLnBhdGgpO1xuXG4gICAgbGV0IGVudHJ5ID0gKGF3YWl0IHRoaXMuZGJSZXF1ZXN0KCdnZXQnLCBbcGF0aF0pKSBhcyBFbnRyeU9iajtcbiAgICBpZiAoZW50cnkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZW50cnkgPSAoYXdhaXQgdGhpcy5kYlJlcXVlc3QoJ2dldCcsIFtwYXRoICsgJy8nXSkpIGFzIEVudHJ5T2JqO1xuICAgIH1cbiAgICBpZiAoZW50cnkgPT09IHVuZGVmaW5lZCkgdGhyb3cgRXJyb3IoJ0VudHJ5IGRvZXMgbm90IGV4aXN0LicpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6IGVudHJ5LnBhdGguc3Vic3RyaW5nKHBhdGgubGVuZ3RoICsgMSksXG4gICAgICB0eXBlOiBlbnRyeS50eXBlLFxuICAgICAgc2l6ZTogZW50cnkuc2l6ZSxcbiAgICAgIGN0aW1lOiBlbnRyeS5jdGltZSxcbiAgICAgIG10aW1lOiBlbnRyeS5tdGltZSxcbiAgICAgIHVyaTogZW50cnkucGF0aCxcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbmFtZSBhIGZpbGUgb3IgZGlyZWN0b3J5XG4gICAqIEBwYXJhbSBvcHRpb25zIHRoZSBvcHRpb25zIGZvciB0aGUgcmVuYW1lIG9wZXJhdGlvblxuICAgKiBAcmV0dXJuIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIHJlbmFtZSByZXN1bHRcbiAgICovXG4gIGFzeW5jIHJlbmFtZShvcHRpb25zOiBSZW5hbWVPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgdGhpcy5fY29weShvcHRpb25zLCB0cnVlKTtcbiAgICByZXR1cm47XG4gIH1cblxuICAvKipcbiAgICogQ29weSBhIGZpbGUgb3IgZGlyZWN0b3J5XG4gICAqIEBwYXJhbSBvcHRpb25zIHRoZSBvcHRpb25zIGZvciB0aGUgY29weSBvcGVyYXRpb25cbiAgICogQHJldHVybiBhIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBjb3B5IHJlc3VsdFxuICAgKi9cbiAgYXN5bmMgY29weShvcHRpb25zOiBDb3B5T3B0aW9ucyk6IFByb21pc2U8Q29weVJlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLl9jb3B5KG9wdGlvbnMsIGZhbHNlKTtcbiAgfVxuXG4gIGFzeW5jIHJlcXVlc3RQZXJtaXNzaW9ucygpOiBQcm9taXNlPFBlcm1pc3Npb25TdGF0dXM+IHtcbiAgICByZXR1cm4geyBwdWJsaWNTdG9yYWdlOiAnZ3JhbnRlZCcgfTtcbiAgfVxuXG4gIGFzeW5jIGNoZWNrUGVybWlzc2lvbnMoKTogUHJvbWlzZTxQZXJtaXNzaW9uU3RhdHVzPiB7XG4gICAgcmV0dXJuIHsgcHVibGljU3RvcmFnZTogJ2dyYW50ZWQnIH07XG4gIH1cblxuICAvKipcbiAgICogRnVuY3Rpb24gdGhhdCBjYW4gcGVyZm9ybSBhIGNvcHkgb3IgYSByZW5hbWVcbiAgICogQHBhcmFtIG9wdGlvbnMgdGhlIG9wdGlvbnMgZm9yIHRoZSByZW5hbWUgb3BlcmF0aW9uXG4gICAqIEBwYXJhbSBkb1JlbmFtZSB3aGV0aGVyIHRvIHBlcmZvcm0gYSByZW5hbWUgb3IgY29weSBvcGVyYXRpb25cbiAgICogQHJldHVybiBhIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSByZXN1bHRcbiAgICovXG4gIHByaXZhdGUgYXN5bmMgX2NvcHkob3B0aW9uczogQ29weU9wdGlvbnMsIGRvUmVuYW1lID0gZmFsc2UpOiBQcm9taXNlPENvcHlSZXN1bHQ+IHtcbiAgICBsZXQgeyB0b0RpcmVjdG9yeSB9ID0gb3B0aW9ucztcbiAgICBjb25zdCB7IHRvLCBmcm9tLCBkaXJlY3Rvcnk6IGZyb21EaXJlY3RvcnkgfSA9IG9wdGlvbnM7XG5cbiAgICBpZiAoIXRvIHx8ICFmcm9tKSB7XG4gICAgICB0aHJvdyBFcnJvcignQm90aCB0byBhbmQgZnJvbSBtdXN0IGJlIHByb3ZpZGVkJyk7XG4gICAgfVxuXG4gICAgLy8gSWYgbm8gXCJ0b1wiIGRpcmVjdG9yeSBpcyBwcm92aWRlZCwgdXNlIHRoZSBcImZyb21cIiBkaXJlY3RvcnlcbiAgICBpZiAoIXRvRGlyZWN0b3J5KSB7XG4gICAgICB0b0RpcmVjdG9yeSA9IGZyb21EaXJlY3Rvcnk7XG4gICAgfVxuXG4gICAgY29uc3QgZnJvbVBhdGggPSB0aGlzLmdldFBhdGgoZnJvbURpcmVjdG9yeSwgZnJvbSk7XG4gICAgY29uc3QgdG9QYXRoID0gdGhpcy5nZXRQYXRoKHRvRGlyZWN0b3J5LCB0byk7XG5cbiAgICAvLyBUZXN0IHRoYXQgdGhlIFwidG9cIiBhbmQgXCJmcm9tXCIgbG9jYXRpb25zIGFyZSBkaWZmZXJlbnRcbiAgICBpZiAoZnJvbVBhdGggPT09IHRvUGF0aCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdXJpOiB0b1BhdGgsXG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmIChpc1BhdGhQYXJlbnQoZnJvbVBhdGgsIHRvUGF0aCkpIHtcbiAgICAgIHRocm93IEVycm9yKCdUbyBwYXRoIGNhbm5vdCBjb250YWluIHRoZSBmcm9tIHBhdGgnKTtcbiAgICB9XG5cbiAgICAvLyBDaGVjayB0aGUgc3RhdGUgb2YgdGhlIFwidG9cIiBsb2NhdGlvblxuICAgIGxldCB0b09iajtcbiAgICB0cnkge1xuICAgICAgdG9PYmogPSBhd2FpdCB0aGlzLnN0YXQoe1xuICAgICAgICBwYXRoOiB0byxcbiAgICAgICAgZGlyZWN0b3J5OiB0b0RpcmVjdG9yeSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIFRvIGxvY2F0aW9uIGRvZXMgbm90IGV4aXN0LCBlbnN1cmUgdGhlIGRpcmVjdG9yeSBjb250YWluaW5nIFwidG9cIiBsb2NhdGlvbiBleGlzdHMgYW5kIGlzIGEgZGlyZWN0b3J5XG4gICAgICBjb25zdCB0b1BhdGhDb21wb25lbnRzID0gdG8uc3BsaXQoJy8nKTtcbiAgICAgIHRvUGF0aENvbXBvbmVudHMucG9wKCk7XG4gICAgICBjb25zdCB0b1BhdGggPSB0b1BhdGhDb21wb25lbnRzLmpvaW4oJy8nKTtcblxuICAgICAgLy8gQ2hlY2sgdGhlIGNvbnRhaW5pbmcgZGlyZWN0b3J5IG9mIHRoZSBcInRvXCIgbG9jYXRpb24gZXhpc3RzXG4gICAgICBpZiAodG9QYXRoQ29tcG9uZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IHRvUGFyZW50RGlyZWN0b3J5ID0gYXdhaXQgdGhpcy5zdGF0KHtcbiAgICAgICAgICBwYXRoOiB0b1BhdGgsXG4gICAgICAgICAgZGlyZWN0b3J5OiB0b0RpcmVjdG9yeSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHRvUGFyZW50RGlyZWN0b3J5LnR5cGUgIT09ICdkaXJlY3RvcnknKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQYXJlbnQgZGlyZWN0b3J5IG9mIHRoZSB0byBwYXRoIGlzIGEgZmlsZScpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ2Fubm90IG92ZXJ3cml0ZSBhIGRpcmVjdG9yeVxuICAgIGlmICh0b09iaiAmJiB0b09iai50eXBlID09PSAnZGlyZWN0b3J5Jykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3Qgb3ZlcndyaXRlIGEgZGlyZWN0b3J5IHdpdGggYSBmaWxlJyk7XG4gICAgfVxuXG4gICAgLy8gRW5zdXJlIHRoZSBcImZyb21cIiBvYmplY3QgZXhpc3RzXG4gICAgY29uc3QgZnJvbU9iaiA9IGF3YWl0IHRoaXMuc3RhdCh7XG4gICAgICBwYXRoOiBmcm9tLFxuICAgICAgZGlyZWN0b3J5OiBmcm9tRGlyZWN0b3J5LFxuICAgIH0pO1xuXG4gICAgLy8gU2V0IHRoZSBtdGltZS9jdGltZSBvZiB0aGUgc3VwcGxpZWQgcGF0aFxuICAgIGNvbnN0IHVwZGF0ZVRpbWUgPSBhc3luYyAocGF0aDogc3RyaW5nLCBjdGltZTogbnVtYmVyLCBtdGltZTogbnVtYmVyKSA9PiB7XG4gICAgICBjb25zdCBmdWxsUGF0aDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKHRvRGlyZWN0b3J5LCBwYXRoKTtcbiAgICAgIGNvbnN0IGVudHJ5ID0gKGF3YWl0IHRoaXMuZGJSZXF1ZXN0KCdnZXQnLCBbZnVsbFBhdGhdKSkgYXMgRW50cnlPYmo7XG4gICAgICBlbnRyeS5jdGltZSA9IGN0aW1lO1xuICAgICAgZW50cnkubXRpbWUgPSBtdGltZTtcbiAgICAgIGF3YWl0IHRoaXMuZGJSZXF1ZXN0KCdwdXQnLCBbZW50cnldKTtcbiAgICB9O1xuXG4gICAgY29uc3QgY3RpbWUgPSBmcm9tT2JqLmN0aW1lID8gZnJvbU9iai5jdGltZSA6IERhdGUubm93KCk7XG5cbiAgICBzd2l0Y2ggKGZyb21PYmoudHlwZSkge1xuICAgICAgLy8gVGhlIFwiZnJvbVwiIG9iamVjdCBpcyBhIGZpbGVcbiAgICAgIGNhc2UgJ2ZpbGUnOiB7XG4gICAgICAgIC8vIFJlYWQgdGhlIGZpbGVcbiAgICAgICAgY29uc3QgZmlsZSA9IGF3YWl0IHRoaXMucmVhZEZpbGUoe1xuICAgICAgICAgIHBhdGg6IGZyb20sXG4gICAgICAgICAgZGlyZWN0b3J5OiBmcm9tRGlyZWN0b3J5LFxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBPcHRpb25hbGx5IHJlbW92ZSB0aGUgZmlsZVxuICAgICAgICBpZiAoZG9SZW5hbWUpIHtcbiAgICAgICAgICBhd2FpdCB0aGlzLmRlbGV0ZUZpbGUoe1xuICAgICAgICAgICAgcGF0aDogZnJvbSxcbiAgICAgICAgICAgIGRpcmVjdG9yeTogZnJvbURpcmVjdG9yeSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBlbmNvZGluZztcbiAgICAgICAgaWYgKCEoZmlsZS5kYXRhIGluc3RhbmNlb2YgQmxvYikgJiYgIXRoaXMuaXNCYXNlNjRTdHJpbmcoZmlsZS5kYXRhKSkge1xuICAgICAgICAgIGVuY29kaW5nID0gRW5jb2RpbmcuVVRGODtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFdyaXRlIHRoZSBmaWxlIHRvIHRoZSBuZXcgbG9jYXRpb25cbiAgICAgICAgY29uc3Qgd3JpdGVSZXN1bHQgPSBhd2FpdCB0aGlzLndyaXRlRmlsZSh7XG4gICAgICAgICAgcGF0aDogdG8sXG4gICAgICAgICAgZGlyZWN0b3J5OiB0b0RpcmVjdG9yeSxcbiAgICAgICAgICBkYXRhOiBmaWxlLmRhdGEsXG4gICAgICAgICAgZW5jb2Rpbmc6IGVuY29kaW5nLFxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBDb3B5IHRoZSBtdGltZS9jdGltZSBvZiBhIHJlbmFtZWQgZmlsZVxuICAgICAgICBpZiAoZG9SZW5hbWUpIHtcbiAgICAgICAgICBhd2FpdCB1cGRhdGVUaW1lKHRvLCBjdGltZSwgZnJvbU9iai5tdGltZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZXNvbHZlIHByb21pc2VcbiAgICAgICAgcmV0dXJuIHdyaXRlUmVzdWx0O1xuICAgICAgfVxuICAgICAgY2FzZSAnZGlyZWN0b3J5Jzoge1xuICAgICAgICBpZiAodG9PYmopIHtcbiAgICAgICAgICB0aHJvdyBFcnJvcignQ2Fubm90IG1vdmUgYSBkaXJlY3Rvcnkgb3ZlciBhbiBleGlzdGluZyBvYmplY3QnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgLy8gQ3JlYXRlIHRoZSB0byBkaXJlY3RvcnlcbiAgICAgICAgICBhd2FpdCB0aGlzLm1rZGlyKHtcbiAgICAgICAgICAgIHBhdGg6IHRvLFxuICAgICAgICAgICAgZGlyZWN0b3J5OiB0b0RpcmVjdG9yeSxcbiAgICAgICAgICAgIHJlY3Vyc2l2ZTogZmFsc2UsXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAvLyBDb3B5IHRoZSBtdGltZS9jdGltZSBvZiBhIHJlbmFtZWQgZGlyZWN0b3J5XG4gICAgICAgICAgaWYgKGRvUmVuYW1lKSB7XG4gICAgICAgICAgICBhd2FpdCB1cGRhdGVUaW1lKHRvLCBjdGltZSwgZnJvbU9iai5tdGltZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgLy8gaWdub3JlXG4gICAgICAgIH1cblxuICAgICAgICAvLyBJdGVyYXRlIG92ZXIgdGhlIGNvbnRlbnRzIG9mIHRoZSBmcm9tIGxvY2F0aW9uXG4gICAgICAgIGNvbnN0IGNvbnRlbnRzID0gKFxuICAgICAgICAgIGF3YWl0IHRoaXMucmVhZGRpcih7XG4gICAgICAgICAgICBwYXRoOiBmcm9tLFxuICAgICAgICAgICAgZGlyZWN0b3J5OiBmcm9tRGlyZWN0b3J5LFxuICAgICAgICAgIH0pXG4gICAgICAgICkuZmlsZXM7XG5cbiAgICAgICAgZm9yIChjb25zdCBmaWxlbmFtZSBvZiBjb250ZW50cykge1xuICAgICAgICAgIC8vIE1vdmUgaXRlbSBmcm9tIHRoZSBmcm9tIGRpcmVjdG9yeSB0byB0aGUgdG8gZGlyZWN0b3J5XG4gICAgICAgICAgYXdhaXQgdGhpcy5fY29weShcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgZnJvbTogYCR7ZnJvbX0vJHtmaWxlbmFtZS5uYW1lfWAsXG4gICAgICAgICAgICAgIHRvOiBgJHt0b30vJHtmaWxlbmFtZS5uYW1lfWAsXG4gICAgICAgICAgICAgIGRpcmVjdG9yeTogZnJvbURpcmVjdG9yeSxcbiAgICAgICAgICAgICAgdG9EaXJlY3RvcnksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZG9SZW5hbWUsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE9wdGlvbmFsbHkgcmVtb3ZlIHRoZSBvcmlnaW5hbCBmcm9tIGRpcmVjdG9yeVxuICAgICAgICBpZiAoZG9SZW5hbWUpIHtcbiAgICAgICAgICBhd2FpdCB0aGlzLnJtZGlyKHtcbiAgICAgICAgICAgIHBhdGg6IGZyb20sXG4gICAgICAgICAgICBkaXJlY3Rvcnk6IGZyb21EaXJlY3RvcnksXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIHVyaTogdG9QYXRoLFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogRnVuY3Rpb24gdGhhdCBwZXJmb3JtcyBhIGh0dHAgcmVxdWVzdCB0byBhIHNlcnZlciBhbmQgZG93bmxvYWRzIHRoZSBmaWxlIHRvIHRoZSBzcGVjaWZpZWQgZGVzdGluYXRpb25cbiAgICpcbiAgICogQGRlcHJlY2F0ZWQgVXNlIHRoZSBAY2FwYWNpdG9yL2ZpbGUtdHJhbnNmZXIgcGx1Z2luIGluc3RlYWQuXG4gICAqIEBwYXJhbSBvcHRpb25zIHRoZSBvcHRpb25zIGZvciB0aGUgZG93bmxvYWQgb3BlcmF0aW9uXG4gICAqIEByZXR1cm5zIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIGRvd25sb2FkIGZpbGUgcmVzdWx0XG4gICAqL1xuICBwdWJsaWMgZG93bmxvYWRGaWxlID0gYXN5bmMgKG9wdGlvbnM6IERvd25sb2FkRmlsZU9wdGlvbnMpOiBQcm9taXNlPERvd25sb2FkRmlsZVJlc3VsdD4gPT4ge1xuICAgIGNvbnN0IHJlcXVlc3RJbml0ID0gYnVpbGRSZXF1ZXN0SW5pdChvcHRpb25zLCBvcHRpb25zLndlYkZldGNoRXh0cmEpO1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2gob3B0aW9ucy51cmwsIHJlcXVlc3RJbml0KTtcbiAgICBsZXQgYmxvYjogQmxvYjtcblxuICAgIGlmICghb3B0aW9ucy5wcm9ncmVzcykgYmxvYiA9IGF3YWl0IHJlc3BvbnNlLmJsb2IoKTtcbiAgICBlbHNlIGlmICghcmVzcG9uc2U/LmJvZHkpIGJsb2IgPSBuZXcgQmxvYigpO1xuICAgIGVsc2Uge1xuICAgICAgY29uc3QgcmVhZGVyID0gcmVzcG9uc2UuYm9keS5nZXRSZWFkZXIoKTtcblxuICAgICAgbGV0IGJ5dGVzID0gMDtcbiAgICAgIGNvbnN0IGNodW5rczogKFVpbnQ4QXJyYXkgfCB1bmRlZmluZWQpW10gPSBbXTtcblxuICAgICAgY29uc3QgY29udGVudFR5cGU6IHN0cmluZyB8IG51bGwgPSByZXNwb25zZS5oZWFkZXJzLmdldCgnY29udGVudC10eXBlJyk7XG4gICAgICBjb25zdCBjb250ZW50TGVuZ3RoOiBudW1iZXIgPSBwYXJzZUludChyZXNwb25zZS5oZWFkZXJzLmdldCgnY29udGVudC1sZW5ndGgnKSB8fCAnMCcsIDEwKTtcblxuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgY29uc3QgeyBkb25lLCB2YWx1ZSB9ID0gYXdhaXQgcmVhZGVyLnJlYWQoKTtcblxuICAgICAgICBpZiAoZG9uZSkgYnJlYWs7XG5cbiAgICAgICAgY2h1bmtzLnB1c2godmFsdWUpO1xuICAgICAgICBieXRlcyArPSB2YWx1ZT8ubGVuZ3RoIHx8IDA7XG5cbiAgICAgICAgY29uc3Qgc3RhdHVzOiBQcm9ncmVzc1N0YXR1cyA9IHtcbiAgICAgICAgICB1cmw6IG9wdGlvbnMudXJsLFxuICAgICAgICAgIGJ5dGVzLFxuICAgICAgICAgIGNvbnRlbnRMZW5ndGgsXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5ub3RpZnlMaXN0ZW5lcnMoJ3Byb2dyZXNzJywgc3RhdHVzKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgYWxsQ2h1bmtzID0gbmV3IFVpbnQ4QXJyYXkoYnl0ZXMpO1xuICAgICAgbGV0IHBvc2l0aW9uID0gMDtcbiAgICAgIGZvciAoY29uc3QgY2h1bmsgb2YgY2h1bmtzKSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2h1bmsgPT09ICd1bmRlZmluZWQnKSBjb250aW51ZTtcblxuICAgICAgICBhbGxDaHVua3Muc2V0KGNodW5rLCBwb3NpdGlvbik7XG4gICAgICAgIHBvc2l0aW9uICs9IGNodW5rLmxlbmd0aDtcbiAgICAgIH1cblxuICAgICAgYmxvYiA9IG5ldyBCbG9iKFthbGxDaHVua3MuYnVmZmVyXSwgeyB0eXBlOiBjb250ZW50VHlwZSB8fCB1bmRlZmluZWQgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy53cml0ZUZpbGUoe1xuICAgICAgcGF0aDogb3B0aW9ucy5wYXRoLFxuICAgICAgZGlyZWN0b3J5OiBvcHRpb25zLmRpcmVjdG9yeSA/PyB1bmRlZmluZWQsXG4gICAgICByZWN1cnNpdmU6IG9wdGlvbnMucmVjdXJzaXZlID8/IGZhbHNlLFxuICAgICAgZGF0YTogYmxvYixcbiAgICB9KTtcblxuICAgIHJldHVybiB7IHBhdGg6IHJlc3VsdC51cmksIGJsb2IgfTtcbiAgfTtcblxuICBwcml2YXRlIGlzQmFzZTY0U3RyaW5nKHN0cjogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBidG9hKGF0b2Ioc3RyKSkgPT0gc3RyO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxufVxuXG5pbnRlcmZhY2UgRW50cnlPYmoge1xuICBwYXRoOiBzdHJpbmc7XG4gIGZvbGRlcjogc3RyaW5nO1xuICB0eXBlOiAnZGlyZWN0b3J5JyB8ICdmaWxlJztcbiAgc2l6ZTogbnVtYmVyO1xuICBjdGltZTogbnVtYmVyO1xuICBtdGltZTogbnVtYmVyO1xuICB1cmk/OiBzdHJpbmc7XG4gIGNvbnRlbnQ/OiBzdHJpbmcgfCBCbG9iO1xufVxuIiwgImltcG9ydCB7IFdlYlBsdWdpbiB9IGZyb20gJ0BjYXBhY2l0b3IvY29yZSc7XG5cbmltcG9ydCB0eXBlIHsgQnJvd3NlclBsdWdpbiwgT3Blbk9wdGlvbnMgfSBmcm9tICcuL2RlZmluaXRpb25zJztcblxuZXhwb3J0IGNsYXNzIEJyb3dzZXJXZWIgZXh0ZW5kcyBXZWJQbHVnaW4gaW1wbGVtZW50cyBCcm93c2VyUGx1Z2luIHtcbiAgX2xhc3RXaW5kb3c6IFdpbmRvdyB8IG51bGw7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl9sYXN0V2luZG93ID0gbnVsbDtcbiAgfVxuXG4gIGFzeW5jIG9wZW4ob3B0aW9uczogT3Blbk9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0aGlzLl9sYXN0V2luZG93ID0gd2luZG93Lm9wZW4ob3B0aW9ucy51cmwsIG9wdGlvbnMud2luZG93TmFtZSB8fCAnX2JsYW5rJyk7XG4gIH1cblxuICBhc3luYyBjbG9zZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgaWYgKHRoaXMuX2xhc3RXaW5kb3cgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLl9sYXN0V2luZG93LmNsb3NlKCk7XG4gICAgICAgIHRoaXMuX2xhc3RXaW5kb3cgPSBudWxsO1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZWplY3QoJ05vIGFjdGl2ZSB3aW5kb3cgdG8gY2xvc2UhJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuY29uc3QgQnJvd3NlciA9IG5ldyBCcm93c2VyV2ViKCk7XG5cbmV4cG9ydCB7IEJyb3dzZXIgfTtcbiIsICIvLyAncGF0aCcgbW9kdWxlIGV4dHJhY3RlZCBmcm9tIE5vZGUuanMgdjguMTEuMSAob25seSB0aGUgcG9zaXggcGFydClcbi8vIHRyYW5zcGxpdGVkIHdpdGggQmFiZWxcblxuLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gYXNzZXJ0UGF0aChwYXRoKSB7XG4gIGlmICh0eXBlb2YgcGF0aCAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdQYXRoIG11c3QgYmUgYSBzdHJpbmcuIFJlY2VpdmVkICcgKyBKU09OLnN0cmluZ2lmeShwYXRoKSk7XG4gIH1cbn1cblxuLy8gUmVzb2x2ZXMgLiBhbmQgLi4gZWxlbWVudHMgaW4gYSBwYXRoIHdpdGggZGlyZWN0b3J5IG5hbWVzXG5mdW5jdGlvbiBub3JtYWxpemVTdHJpbmdQb3NpeChwYXRoLCBhbGxvd0Fib3ZlUm9vdCkge1xuICB2YXIgcmVzID0gJyc7XG4gIHZhciBsYXN0U2VnbWVudExlbmd0aCA9IDA7XG4gIHZhciBsYXN0U2xhc2ggPSAtMTtcbiAgdmFyIGRvdHMgPSAwO1xuICB2YXIgY29kZTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPD0gcGF0aC5sZW5ndGg7ICsraSkge1xuICAgIGlmIChpIDwgcGF0aC5sZW5ndGgpXG4gICAgICBjb2RlID0gcGF0aC5jaGFyQ29kZUF0KGkpO1xuICAgIGVsc2UgaWYgKGNvZGUgPT09IDQ3IC8qLyovKVxuICAgICAgYnJlYWs7XG4gICAgZWxzZVxuICAgICAgY29kZSA9IDQ3IC8qLyovO1xuICAgIGlmIChjb2RlID09PSA0NyAvKi8qLykge1xuICAgICAgaWYgKGxhc3RTbGFzaCA9PT0gaSAtIDEgfHwgZG90cyA9PT0gMSkge1xuICAgICAgICAvLyBOT09QXG4gICAgICB9IGVsc2UgaWYgKGxhc3RTbGFzaCAhPT0gaSAtIDEgJiYgZG90cyA9PT0gMikge1xuICAgICAgICBpZiAocmVzLmxlbmd0aCA8IDIgfHwgbGFzdFNlZ21lbnRMZW5ndGggIT09IDIgfHwgcmVzLmNoYXJDb2RlQXQocmVzLmxlbmd0aCAtIDEpICE9PSA0NiAvKi4qLyB8fCByZXMuY2hhckNvZGVBdChyZXMubGVuZ3RoIC0gMikgIT09IDQ2IC8qLiovKSB7XG4gICAgICAgICAgaWYgKHJlcy5sZW5ndGggPiAyKSB7XG4gICAgICAgICAgICB2YXIgbGFzdFNsYXNoSW5kZXggPSByZXMubGFzdEluZGV4T2YoJy8nKTtcbiAgICAgICAgICAgIGlmIChsYXN0U2xhc2hJbmRleCAhPT0gcmVzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgaWYgKGxhc3RTbGFzaEluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHJlcyA9ICcnO1xuICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50TGVuZ3RoID0gMDtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXMgPSByZXMuc2xpY2UoMCwgbGFzdFNsYXNoSW5kZXgpO1xuICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50TGVuZ3RoID0gcmVzLmxlbmd0aCAtIDEgLSByZXMubGFzdEluZGV4T2YoJy8nKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBsYXN0U2xhc2ggPSBpO1xuICAgICAgICAgICAgICBkb3RzID0gMDtcbiAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChyZXMubGVuZ3RoID09PSAyIHx8IHJlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIHJlcyA9ICcnO1xuICAgICAgICAgICAgbGFzdFNlZ21lbnRMZW5ndGggPSAwO1xuICAgICAgICAgICAgbGFzdFNsYXNoID0gaTtcbiAgICAgICAgICAgIGRvdHMgPSAwO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChhbGxvd0Fib3ZlUm9vdCkge1xuICAgICAgICAgIGlmIChyZXMubGVuZ3RoID4gMClcbiAgICAgICAgICAgIHJlcyArPSAnLy4uJztcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXMgPSAnLi4nO1xuICAgICAgICAgIGxhc3RTZWdtZW50TGVuZ3RoID0gMjtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHJlcy5sZW5ndGggPiAwKVxuICAgICAgICAgIHJlcyArPSAnLycgKyBwYXRoLnNsaWNlKGxhc3RTbGFzaCArIDEsIGkpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgcmVzID0gcGF0aC5zbGljZShsYXN0U2xhc2ggKyAxLCBpKTtcbiAgICAgICAgbGFzdFNlZ21lbnRMZW5ndGggPSBpIC0gbGFzdFNsYXNoIC0gMTtcbiAgICAgIH1cbiAgICAgIGxhc3RTbGFzaCA9IGk7XG4gICAgICBkb3RzID0gMDtcbiAgICB9IGVsc2UgaWYgKGNvZGUgPT09IDQ2IC8qLiovICYmIGRvdHMgIT09IC0xKSB7XG4gICAgICArK2RvdHM7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRvdHMgPSAtMTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cblxuZnVuY3Rpb24gX2Zvcm1hdChzZXAsIHBhdGhPYmplY3QpIHtcbiAgdmFyIGRpciA9IHBhdGhPYmplY3QuZGlyIHx8IHBhdGhPYmplY3Qucm9vdDtcbiAgdmFyIGJhc2UgPSBwYXRoT2JqZWN0LmJhc2UgfHwgKHBhdGhPYmplY3QubmFtZSB8fCAnJykgKyAocGF0aE9iamVjdC5leHQgfHwgJycpO1xuICBpZiAoIWRpcikge1xuICAgIHJldHVybiBiYXNlO1xuICB9XG4gIGlmIChkaXIgPT09IHBhdGhPYmplY3Qucm9vdCkge1xuICAgIHJldHVybiBkaXIgKyBiYXNlO1xuICB9XG4gIHJldHVybiBkaXIgKyBzZXAgKyBiYXNlO1xufVxuXG52YXIgcG9zaXggPSB7XG4gIC8vIHBhdGgucmVzb2x2ZShbZnJvbSAuLi5dLCB0bylcbiAgcmVzb2x2ZTogZnVuY3Rpb24gcmVzb2x2ZSgpIHtcbiAgICB2YXIgcmVzb2x2ZWRQYXRoID0gJyc7XG4gICAgdmFyIHJlc29sdmVkQWJzb2x1dGUgPSBmYWxzZTtcbiAgICB2YXIgY3dkO1xuXG4gICAgZm9yICh2YXIgaSA9IGFyZ3VtZW50cy5sZW5ndGggLSAxOyBpID49IC0xICYmICFyZXNvbHZlZEFic29sdXRlOyBpLS0pIHtcbiAgICAgIHZhciBwYXRoO1xuICAgICAgaWYgKGkgPj0gMClcbiAgICAgICAgcGF0aCA9IGFyZ3VtZW50c1tpXTtcbiAgICAgIGVsc2Uge1xuICAgICAgICBpZiAoY3dkID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgY3dkID0gcHJvY2Vzcy5jd2QoKTtcbiAgICAgICAgcGF0aCA9IGN3ZDtcbiAgICAgIH1cblxuICAgICAgYXNzZXJ0UGF0aChwYXRoKTtcblxuICAgICAgLy8gU2tpcCBlbXB0eSBlbnRyaWVzXG4gICAgICBpZiAocGF0aC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIHJlc29sdmVkUGF0aCA9IHBhdGggKyAnLycgKyByZXNvbHZlZFBhdGg7XG4gICAgICByZXNvbHZlZEFic29sdXRlID0gcGF0aC5jaGFyQ29kZUF0KDApID09PSA0NyAvKi8qLztcbiAgICB9XG5cbiAgICAvLyBBdCB0aGlzIHBvaW50IHRoZSBwYXRoIHNob3VsZCBiZSByZXNvbHZlZCB0byBhIGZ1bGwgYWJzb2x1dGUgcGF0aCwgYnV0XG4gICAgLy8gaGFuZGxlIHJlbGF0aXZlIHBhdGhzIHRvIGJlIHNhZmUgKG1pZ2h0IGhhcHBlbiB3aGVuIHByb2Nlc3MuY3dkKCkgZmFpbHMpXG5cbiAgICAvLyBOb3JtYWxpemUgdGhlIHBhdGhcbiAgICByZXNvbHZlZFBhdGggPSBub3JtYWxpemVTdHJpbmdQb3NpeChyZXNvbHZlZFBhdGgsICFyZXNvbHZlZEFic29sdXRlKTtcblxuICAgIGlmIChyZXNvbHZlZEFic29sdXRlKSB7XG4gICAgICBpZiAocmVzb2x2ZWRQYXRoLmxlbmd0aCA+IDApXG4gICAgICAgIHJldHVybiAnLycgKyByZXNvbHZlZFBhdGg7XG4gICAgICBlbHNlXG4gICAgICAgIHJldHVybiAnLyc7XG4gICAgfSBlbHNlIGlmIChyZXNvbHZlZFBhdGgubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIHJlc29sdmVkUGF0aDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICcuJztcbiAgICB9XG4gIH0sXG5cbiAgbm9ybWFsaXplOiBmdW5jdGlvbiBub3JtYWxpemUocGF0aCkge1xuICAgIGFzc2VydFBhdGgocGF0aCk7XG5cbiAgICBpZiAocGF0aC5sZW5ndGggPT09IDApIHJldHVybiAnLic7XG5cbiAgICB2YXIgaXNBYnNvbHV0ZSA9IHBhdGguY2hhckNvZGVBdCgwKSA9PT0gNDcgLyovKi87XG4gICAgdmFyIHRyYWlsaW5nU2VwYXJhdG9yID0gcGF0aC5jaGFyQ29kZUF0KHBhdGgubGVuZ3RoIC0gMSkgPT09IDQ3IC8qLyovO1xuXG4gICAgLy8gTm9ybWFsaXplIHRoZSBwYXRoXG4gICAgcGF0aCA9IG5vcm1hbGl6ZVN0cmluZ1Bvc2l4KHBhdGgsICFpc0Fic29sdXRlKTtcblxuICAgIGlmIChwYXRoLmxlbmd0aCA9PT0gMCAmJiAhaXNBYnNvbHV0ZSkgcGF0aCA9ICcuJztcbiAgICBpZiAocGF0aC5sZW5ndGggPiAwICYmIHRyYWlsaW5nU2VwYXJhdG9yKSBwYXRoICs9ICcvJztcblxuICAgIGlmIChpc0Fic29sdXRlKSByZXR1cm4gJy8nICsgcGF0aDtcbiAgICByZXR1cm4gcGF0aDtcbiAgfSxcblxuICBpc0Fic29sdXRlOiBmdW5jdGlvbiBpc0Fic29sdXRlKHBhdGgpIHtcbiAgICBhc3NlcnRQYXRoKHBhdGgpO1xuICAgIHJldHVybiBwYXRoLmxlbmd0aCA+IDAgJiYgcGF0aC5jaGFyQ29kZUF0KDApID09PSA0NyAvKi8qLztcbiAgfSxcblxuICBqb2luOiBmdW5jdGlvbiBqb2luKCkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKVxuICAgICAgcmV0dXJuICcuJztcbiAgICB2YXIgam9pbmVkO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgKytpKSB7XG4gICAgICB2YXIgYXJnID0gYXJndW1lbnRzW2ldO1xuICAgICAgYXNzZXJ0UGF0aChhcmcpO1xuICAgICAgaWYgKGFyZy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGlmIChqb2luZWQgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICBqb2luZWQgPSBhcmc7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICBqb2luZWQgKz0gJy8nICsgYXJnO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoam9pbmVkID09PSB1bmRlZmluZWQpXG4gICAgICByZXR1cm4gJy4nO1xuICAgIHJldHVybiBwb3NpeC5ub3JtYWxpemUoam9pbmVkKTtcbiAgfSxcblxuICByZWxhdGl2ZTogZnVuY3Rpb24gcmVsYXRpdmUoZnJvbSwgdG8pIHtcbiAgICBhc3NlcnRQYXRoKGZyb20pO1xuICAgIGFzc2VydFBhdGgodG8pO1xuXG4gICAgaWYgKGZyb20gPT09IHRvKSByZXR1cm4gJyc7XG5cbiAgICBmcm9tID0gcG9zaXgucmVzb2x2ZShmcm9tKTtcbiAgICB0byA9IHBvc2l4LnJlc29sdmUodG8pO1xuXG4gICAgaWYgKGZyb20gPT09IHRvKSByZXR1cm4gJyc7XG5cbiAgICAvLyBUcmltIGFueSBsZWFkaW5nIGJhY2tzbGFzaGVzXG4gICAgdmFyIGZyb21TdGFydCA9IDE7XG4gICAgZm9yICg7IGZyb21TdGFydCA8IGZyb20ubGVuZ3RoOyArK2Zyb21TdGFydCkge1xuICAgICAgaWYgKGZyb20uY2hhckNvZGVBdChmcm9tU3RhcnQpICE9PSA0NyAvKi8qLylcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHZhciBmcm9tRW5kID0gZnJvbS5sZW5ndGg7XG4gICAgdmFyIGZyb21MZW4gPSBmcm9tRW5kIC0gZnJvbVN0YXJ0O1xuXG4gICAgLy8gVHJpbSBhbnkgbGVhZGluZyBiYWNrc2xhc2hlc1xuICAgIHZhciB0b1N0YXJ0ID0gMTtcbiAgICBmb3IgKDsgdG9TdGFydCA8IHRvLmxlbmd0aDsgKyt0b1N0YXJ0KSB7XG4gICAgICBpZiAodG8uY2hhckNvZGVBdCh0b1N0YXJ0KSAhPT0gNDcgLyovKi8pXG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICB2YXIgdG9FbmQgPSB0by5sZW5ndGg7XG4gICAgdmFyIHRvTGVuID0gdG9FbmQgLSB0b1N0YXJ0O1xuXG4gICAgLy8gQ29tcGFyZSBwYXRocyB0byBmaW5kIHRoZSBsb25nZXN0IGNvbW1vbiBwYXRoIGZyb20gcm9vdFxuICAgIHZhciBsZW5ndGggPSBmcm9tTGVuIDwgdG9MZW4gPyBmcm9tTGVuIDogdG9MZW47XG4gICAgdmFyIGxhc3RDb21tb25TZXAgPSAtMTtcbiAgICB2YXIgaSA9IDA7XG4gICAgZm9yICg7IGkgPD0gbGVuZ3RoOyArK2kpIHtcbiAgICAgIGlmIChpID09PSBsZW5ndGgpIHtcbiAgICAgICAgaWYgKHRvTGVuID4gbGVuZ3RoKSB7XG4gICAgICAgICAgaWYgKHRvLmNoYXJDb2RlQXQodG9TdGFydCArIGkpID09PSA0NyAvKi8qLykge1xuICAgICAgICAgICAgLy8gV2UgZ2V0IGhlcmUgaWYgYGZyb21gIGlzIHRoZSBleGFjdCBiYXNlIHBhdGggZm9yIGB0b2AuXG4gICAgICAgICAgICAvLyBGb3IgZXhhbXBsZTogZnJvbT0nL2Zvby9iYXInOyB0bz0nL2Zvby9iYXIvYmF6J1xuICAgICAgICAgICAgcmV0dXJuIHRvLnNsaWNlKHRvU3RhcnQgKyBpICsgMSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChpID09PSAwKSB7XG4gICAgICAgICAgICAvLyBXZSBnZXQgaGVyZSBpZiBgZnJvbWAgaXMgdGhlIHJvb3RcbiAgICAgICAgICAgIC8vIEZvciBleGFtcGxlOiBmcm9tPScvJzsgdG89Jy9mb28nXG4gICAgICAgICAgICByZXR1cm4gdG8uc2xpY2UodG9TdGFydCArIGkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChmcm9tTGVuID4gbGVuZ3RoKSB7XG4gICAgICAgICAgaWYgKGZyb20uY2hhckNvZGVBdChmcm9tU3RhcnQgKyBpKSA9PT0gNDcgLyovKi8pIHtcbiAgICAgICAgICAgIC8vIFdlIGdldCBoZXJlIGlmIGB0b2AgaXMgdGhlIGV4YWN0IGJhc2UgcGF0aCBmb3IgYGZyb21gLlxuICAgICAgICAgICAgLy8gRm9yIGV4YW1wbGU6IGZyb209Jy9mb28vYmFyL2Jheic7IHRvPScvZm9vL2JhcidcbiAgICAgICAgICAgIGxhc3RDb21tb25TZXAgPSBpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoaSA9PT0gMCkge1xuICAgICAgICAgICAgLy8gV2UgZ2V0IGhlcmUgaWYgYHRvYCBpcyB0aGUgcm9vdC5cbiAgICAgICAgICAgIC8vIEZvciBleGFtcGxlOiBmcm9tPScvZm9vJzsgdG89Jy8nXG4gICAgICAgICAgICBsYXN0Q29tbW9uU2VwID0gMDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICB2YXIgZnJvbUNvZGUgPSBmcm9tLmNoYXJDb2RlQXQoZnJvbVN0YXJ0ICsgaSk7XG4gICAgICB2YXIgdG9Db2RlID0gdG8uY2hhckNvZGVBdCh0b1N0YXJ0ICsgaSk7XG4gICAgICBpZiAoZnJvbUNvZGUgIT09IHRvQ29kZSlcbiAgICAgICAgYnJlYWs7XG4gICAgICBlbHNlIGlmIChmcm9tQ29kZSA9PT0gNDcgLyovKi8pXG4gICAgICAgIGxhc3RDb21tb25TZXAgPSBpO1xuICAgIH1cblxuICAgIHZhciBvdXQgPSAnJztcbiAgICAvLyBHZW5lcmF0ZSB0aGUgcmVsYXRpdmUgcGF0aCBiYXNlZCBvbiB0aGUgcGF0aCBkaWZmZXJlbmNlIGJldHdlZW4gYHRvYFxuICAgIC8vIGFuZCBgZnJvbWBcbiAgICBmb3IgKGkgPSBmcm9tU3RhcnQgKyBsYXN0Q29tbW9uU2VwICsgMTsgaSA8PSBmcm9tRW5kOyArK2kpIHtcbiAgICAgIGlmIChpID09PSBmcm9tRW5kIHx8IGZyb20uY2hhckNvZGVBdChpKSA9PT0gNDcgLyovKi8pIHtcbiAgICAgICAgaWYgKG91dC5sZW5ndGggPT09IDApXG4gICAgICAgICAgb3V0ICs9ICcuLic7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICBvdXQgKz0gJy8uLic7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gTGFzdGx5LCBhcHBlbmQgdGhlIHJlc3Qgb2YgdGhlIGRlc3RpbmF0aW9uIChgdG9gKSBwYXRoIHRoYXQgY29tZXMgYWZ0ZXJcbiAgICAvLyB0aGUgY29tbW9uIHBhdGggcGFydHNcbiAgICBpZiAob3V0Lmxlbmd0aCA+IDApXG4gICAgICByZXR1cm4gb3V0ICsgdG8uc2xpY2UodG9TdGFydCArIGxhc3RDb21tb25TZXApO1xuICAgIGVsc2Uge1xuICAgICAgdG9TdGFydCArPSBsYXN0Q29tbW9uU2VwO1xuICAgICAgaWYgKHRvLmNoYXJDb2RlQXQodG9TdGFydCkgPT09IDQ3IC8qLyovKVxuICAgICAgICArK3RvU3RhcnQ7XG4gICAgICByZXR1cm4gdG8uc2xpY2UodG9TdGFydCk7XG4gICAgfVxuICB9LFxuXG4gIF9tYWtlTG9uZzogZnVuY3Rpb24gX21ha2VMb25nKHBhdGgpIHtcbiAgICByZXR1cm4gcGF0aDtcbiAgfSxcblxuICBkaXJuYW1lOiBmdW5jdGlvbiBkaXJuYW1lKHBhdGgpIHtcbiAgICBhc3NlcnRQYXRoKHBhdGgpO1xuICAgIGlmIChwYXRoLmxlbmd0aCA9PT0gMCkgcmV0dXJuICcuJztcbiAgICB2YXIgY29kZSA9IHBhdGguY2hhckNvZGVBdCgwKTtcbiAgICB2YXIgaGFzUm9vdCA9IGNvZGUgPT09IDQ3IC8qLyovO1xuICAgIHZhciBlbmQgPSAtMTtcbiAgICB2YXIgbWF0Y2hlZFNsYXNoID0gdHJ1ZTtcbiAgICBmb3IgKHZhciBpID0gcGF0aC5sZW5ndGggLSAxOyBpID49IDE7IC0taSkge1xuICAgICAgY29kZSA9IHBhdGguY2hhckNvZGVBdChpKTtcbiAgICAgIGlmIChjb2RlID09PSA0NyAvKi8qLykge1xuICAgICAgICAgIGlmICghbWF0Y2hlZFNsYXNoKSB7XG4gICAgICAgICAgICBlbmQgPSBpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBXZSBzYXcgdGhlIGZpcnN0IG5vbi1wYXRoIHNlcGFyYXRvclxuICAgICAgICBtYXRjaGVkU2xhc2ggPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZW5kID09PSAtMSkgcmV0dXJuIGhhc1Jvb3QgPyAnLycgOiAnLic7XG4gICAgaWYgKGhhc1Jvb3QgJiYgZW5kID09PSAxKSByZXR1cm4gJy8vJztcbiAgICByZXR1cm4gcGF0aC5zbGljZSgwLCBlbmQpO1xuICB9LFxuXG4gIGJhc2VuYW1lOiBmdW5jdGlvbiBiYXNlbmFtZShwYXRoLCBleHQpIHtcbiAgICBpZiAoZXh0ICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIGV4dCAhPT0gJ3N0cmluZycpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wiZXh0XCIgYXJndW1lbnQgbXVzdCBiZSBhIHN0cmluZycpO1xuICAgIGFzc2VydFBhdGgocGF0aCk7XG5cbiAgICB2YXIgc3RhcnQgPSAwO1xuICAgIHZhciBlbmQgPSAtMTtcbiAgICB2YXIgbWF0Y2hlZFNsYXNoID0gdHJ1ZTtcbiAgICB2YXIgaTtcblxuICAgIGlmIChleHQgIT09IHVuZGVmaW5lZCAmJiBleHQubGVuZ3RoID4gMCAmJiBleHQubGVuZ3RoIDw9IHBhdGgubGVuZ3RoKSB7XG4gICAgICBpZiAoZXh0Lmxlbmd0aCA9PT0gcGF0aC5sZW5ndGggJiYgZXh0ID09PSBwYXRoKSByZXR1cm4gJyc7XG4gICAgICB2YXIgZXh0SWR4ID0gZXh0Lmxlbmd0aCAtIDE7XG4gICAgICB2YXIgZmlyc3ROb25TbGFzaEVuZCA9IC0xO1xuICAgICAgZm9yIChpID0gcGF0aC5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgY29kZSA9IHBhdGguY2hhckNvZGVBdChpKTtcbiAgICAgICAgaWYgKGNvZGUgPT09IDQ3IC8qLyovKSB7XG4gICAgICAgICAgICAvLyBJZiB3ZSByZWFjaGVkIGEgcGF0aCBzZXBhcmF0b3IgdGhhdCB3YXMgbm90IHBhcnQgb2YgYSBzZXQgb2YgcGF0aFxuICAgICAgICAgICAgLy8gc2VwYXJhdG9ycyBhdCB0aGUgZW5kIG9mIHRoZSBzdHJpbmcsIHN0b3Agbm93XG4gICAgICAgICAgICBpZiAoIW1hdGNoZWRTbGFzaCkge1xuICAgICAgICAgICAgICBzdGFydCA9IGkgKyAxO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChmaXJzdE5vblNsYXNoRW5kID09PSAtMSkge1xuICAgICAgICAgICAgLy8gV2Ugc2F3IHRoZSBmaXJzdCBub24tcGF0aCBzZXBhcmF0b3IsIHJlbWVtYmVyIHRoaXMgaW5kZXggaW4gY2FzZVxuICAgICAgICAgICAgLy8gd2UgbmVlZCBpdCBpZiB0aGUgZXh0ZW5zaW9uIGVuZHMgdXAgbm90IG1hdGNoaW5nXG4gICAgICAgICAgICBtYXRjaGVkU2xhc2ggPSBmYWxzZTtcbiAgICAgICAgICAgIGZpcnN0Tm9uU2xhc2hFbmQgPSBpICsgMTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGV4dElkeCA+PSAwKSB7XG4gICAgICAgICAgICAvLyBUcnkgdG8gbWF0Y2ggdGhlIGV4cGxpY2l0IGV4dGVuc2lvblxuICAgICAgICAgICAgaWYgKGNvZGUgPT09IGV4dC5jaGFyQ29kZUF0KGV4dElkeCkpIHtcbiAgICAgICAgICAgICAgaWYgKC0tZXh0SWR4ID09PSAtMSkge1xuICAgICAgICAgICAgICAgIC8vIFdlIG1hdGNoZWQgdGhlIGV4dGVuc2lvbiwgc28gbWFyayB0aGlzIGFzIHRoZSBlbmQgb2Ygb3VyIHBhdGhcbiAgICAgICAgICAgICAgICAvLyBjb21wb25lbnRcbiAgICAgICAgICAgICAgICBlbmQgPSBpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyBFeHRlbnNpb24gZG9lcyBub3QgbWF0Y2gsIHNvIG91ciByZXN1bHQgaXMgdGhlIGVudGlyZSBwYXRoXG4gICAgICAgICAgICAgIC8vIGNvbXBvbmVudFxuICAgICAgICAgICAgICBleHRJZHggPSAtMTtcbiAgICAgICAgICAgICAgZW5kID0gZmlyc3ROb25TbGFzaEVuZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXJ0ID09PSBlbmQpIGVuZCA9IGZpcnN0Tm9uU2xhc2hFbmQ7ZWxzZSBpZiAoZW5kID09PSAtMSkgZW5kID0gcGF0aC5sZW5ndGg7XG4gICAgICByZXR1cm4gcGF0aC5zbGljZShzdGFydCwgZW5kKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChpID0gcGF0aC5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICBpZiAocGF0aC5jaGFyQ29kZUF0KGkpID09PSA0NyAvKi8qLykge1xuICAgICAgICAgICAgLy8gSWYgd2UgcmVhY2hlZCBhIHBhdGggc2VwYXJhdG9yIHRoYXQgd2FzIG5vdCBwYXJ0IG9mIGEgc2V0IG9mIHBhdGhcbiAgICAgICAgICAgIC8vIHNlcGFyYXRvcnMgYXQgdGhlIGVuZCBvZiB0aGUgc3RyaW5nLCBzdG9wIG5vd1xuICAgICAgICAgICAgaWYgKCFtYXRjaGVkU2xhc2gpIHtcbiAgICAgICAgICAgICAgc3RhcnQgPSBpICsgMTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChlbmQgPT09IC0xKSB7XG4gICAgICAgICAgLy8gV2Ugc2F3IHRoZSBmaXJzdCBub24tcGF0aCBzZXBhcmF0b3IsIG1hcmsgdGhpcyBhcyB0aGUgZW5kIG9mIG91clxuICAgICAgICAgIC8vIHBhdGggY29tcG9uZW50XG4gICAgICAgICAgbWF0Y2hlZFNsYXNoID0gZmFsc2U7XG4gICAgICAgICAgZW5kID0gaSArIDE7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGVuZCA9PT0gLTEpIHJldHVybiAnJztcbiAgICAgIHJldHVybiBwYXRoLnNsaWNlKHN0YXJ0LCBlbmQpO1xuICAgIH1cbiAgfSxcblxuICBleHRuYW1lOiBmdW5jdGlvbiBleHRuYW1lKHBhdGgpIHtcbiAgICBhc3NlcnRQYXRoKHBhdGgpO1xuICAgIHZhciBzdGFydERvdCA9IC0xO1xuICAgIHZhciBzdGFydFBhcnQgPSAwO1xuICAgIHZhciBlbmQgPSAtMTtcbiAgICB2YXIgbWF0Y2hlZFNsYXNoID0gdHJ1ZTtcbiAgICAvLyBUcmFjayB0aGUgc3RhdGUgb2YgY2hhcmFjdGVycyAoaWYgYW55KSB3ZSBzZWUgYmVmb3JlIG91ciBmaXJzdCBkb3QgYW5kXG4gICAgLy8gYWZ0ZXIgYW55IHBhdGggc2VwYXJhdG9yIHdlIGZpbmRcbiAgICB2YXIgcHJlRG90U3RhdGUgPSAwO1xuICAgIGZvciAodmFyIGkgPSBwYXRoLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICB2YXIgY29kZSA9IHBhdGguY2hhckNvZGVBdChpKTtcbiAgICAgIGlmIChjb2RlID09PSA0NyAvKi8qLykge1xuICAgICAgICAgIC8vIElmIHdlIHJlYWNoZWQgYSBwYXRoIHNlcGFyYXRvciB0aGF0IHdhcyBub3QgcGFydCBvZiBhIHNldCBvZiBwYXRoXG4gICAgICAgICAgLy8gc2VwYXJhdG9ycyBhdCB0aGUgZW5kIG9mIHRoZSBzdHJpbmcsIHN0b3Agbm93XG4gICAgICAgICAgaWYgKCFtYXRjaGVkU2xhc2gpIHtcbiAgICAgICAgICAgIHN0YXJ0UGFydCA9IGkgKyAxO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICBpZiAoZW5kID09PSAtMSkge1xuICAgICAgICAvLyBXZSBzYXcgdGhlIGZpcnN0IG5vbi1wYXRoIHNlcGFyYXRvciwgbWFyayB0aGlzIGFzIHRoZSBlbmQgb2Ygb3VyXG4gICAgICAgIC8vIGV4dGVuc2lvblxuICAgICAgICBtYXRjaGVkU2xhc2ggPSBmYWxzZTtcbiAgICAgICAgZW5kID0gaSArIDE7XG4gICAgICB9XG4gICAgICBpZiAoY29kZSA9PT0gNDYgLyouKi8pIHtcbiAgICAgICAgICAvLyBJZiB0aGlzIGlzIG91ciBmaXJzdCBkb3QsIG1hcmsgaXQgYXMgdGhlIHN0YXJ0IG9mIG91ciBleHRlbnNpb25cbiAgICAgICAgICBpZiAoc3RhcnREb3QgPT09IC0xKVxuICAgICAgICAgICAgc3RhcnREb3QgPSBpO1xuICAgICAgICAgIGVsc2UgaWYgKHByZURvdFN0YXRlICE9PSAxKVxuICAgICAgICAgICAgcHJlRG90U3RhdGUgPSAxO1xuICAgICAgfSBlbHNlIGlmIChzdGFydERvdCAhPT0gLTEpIHtcbiAgICAgICAgLy8gV2Ugc2F3IGEgbm9uLWRvdCBhbmQgbm9uLXBhdGggc2VwYXJhdG9yIGJlZm9yZSBvdXIgZG90LCBzbyB3ZSBzaG91bGRcbiAgICAgICAgLy8gaGF2ZSBhIGdvb2QgY2hhbmNlIGF0IGhhdmluZyBhIG5vbi1lbXB0eSBleHRlbnNpb25cbiAgICAgICAgcHJlRG90U3RhdGUgPSAtMTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc3RhcnREb3QgPT09IC0xIHx8IGVuZCA9PT0gLTEgfHxcbiAgICAgICAgLy8gV2Ugc2F3IGEgbm9uLWRvdCBjaGFyYWN0ZXIgaW1tZWRpYXRlbHkgYmVmb3JlIHRoZSBkb3RcbiAgICAgICAgcHJlRG90U3RhdGUgPT09IDAgfHxcbiAgICAgICAgLy8gVGhlIChyaWdodC1tb3N0KSB0cmltbWVkIHBhdGggY29tcG9uZW50IGlzIGV4YWN0bHkgJy4uJ1xuICAgICAgICBwcmVEb3RTdGF0ZSA9PT0gMSAmJiBzdGFydERvdCA9PT0gZW5kIC0gMSAmJiBzdGFydERvdCA9PT0gc3RhcnRQYXJ0ICsgMSkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICByZXR1cm4gcGF0aC5zbGljZShzdGFydERvdCwgZW5kKTtcbiAgfSxcblxuICBmb3JtYXQ6IGZ1bmN0aW9uIGZvcm1hdChwYXRoT2JqZWN0KSB7XG4gICAgaWYgKHBhdGhPYmplY3QgPT09IG51bGwgfHwgdHlwZW9mIHBhdGhPYmplY3QgIT09ICdvYmplY3QnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJwYXRoT2JqZWN0XCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIE9iamVjdC4gUmVjZWl2ZWQgdHlwZSAnICsgdHlwZW9mIHBhdGhPYmplY3QpO1xuICAgIH1cbiAgICByZXR1cm4gX2Zvcm1hdCgnLycsIHBhdGhPYmplY3QpO1xuICB9LFxuXG4gIHBhcnNlOiBmdW5jdGlvbiBwYXJzZShwYXRoKSB7XG4gICAgYXNzZXJ0UGF0aChwYXRoKTtcblxuICAgIHZhciByZXQgPSB7IHJvb3Q6ICcnLCBkaXI6ICcnLCBiYXNlOiAnJywgZXh0OiAnJywgbmFtZTogJycgfTtcbiAgICBpZiAocGF0aC5sZW5ndGggPT09IDApIHJldHVybiByZXQ7XG4gICAgdmFyIGNvZGUgPSBwYXRoLmNoYXJDb2RlQXQoMCk7XG4gICAgdmFyIGlzQWJzb2x1dGUgPSBjb2RlID09PSA0NyAvKi8qLztcbiAgICB2YXIgc3RhcnQ7XG4gICAgaWYgKGlzQWJzb2x1dGUpIHtcbiAgICAgIHJldC5yb290ID0gJy8nO1xuICAgICAgc3RhcnQgPSAxO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdGFydCA9IDA7XG4gICAgfVxuICAgIHZhciBzdGFydERvdCA9IC0xO1xuICAgIHZhciBzdGFydFBhcnQgPSAwO1xuICAgIHZhciBlbmQgPSAtMTtcbiAgICB2YXIgbWF0Y2hlZFNsYXNoID0gdHJ1ZTtcbiAgICB2YXIgaSA9IHBhdGgubGVuZ3RoIC0gMTtcblxuICAgIC8vIFRyYWNrIHRoZSBzdGF0ZSBvZiBjaGFyYWN0ZXJzIChpZiBhbnkpIHdlIHNlZSBiZWZvcmUgb3VyIGZpcnN0IGRvdCBhbmRcbiAgICAvLyBhZnRlciBhbnkgcGF0aCBzZXBhcmF0b3Igd2UgZmluZFxuICAgIHZhciBwcmVEb3RTdGF0ZSA9IDA7XG5cbiAgICAvLyBHZXQgbm9uLWRpciBpbmZvXG4gICAgZm9yICg7IGkgPj0gc3RhcnQ7IC0taSkge1xuICAgICAgY29kZSA9IHBhdGguY2hhckNvZGVBdChpKTtcbiAgICAgIGlmIChjb2RlID09PSA0NyAvKi8qLykge1xuICAgICAgICAgIC8vIElmIHdlIHJlYWNoZWQgYSBwYXRoIHNlcGFyYXRvciB0aGF0IHdhcyBub3QgcGFydCBvZiBhIHNldCBvZiBwYXRoXG4gICAgICAgICAgLy8gc2VwYXJhdG9ycyBhdCB0aGUgZW5kIG9mIHRoZSBzdHJpbmcsIHN0b3Agbm93XG4gICAgICAgICAgaWYgKCFtYXRjaGVkU2xhc2gpIHtcbiAgICAgICAgICAgIHN0YXJ0UGFydCA9IGkgKyAxO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICBpZiAoZW5kID09PSAtMSkge1xuICAgICAgICAvLyBXZSBzYXcgdGhlIGZpcnN0IG5vbi1wYXRoIHNlcGFyYXRvciwgbWFyayB0aGlzIGFzIHRoZSBlbmQgb2Ygb3VyXG4gICAgICAgIC8vIGV4dGVuc2lvblxuICAgICAgICBtYXRjaGVkU2xhc2ggPSBmYWxzZTtcbiAgICAgICAgZW5kID0gaSArIDE7XG4gICAgICB9XG4gICAgICBpZiAoY29kZSA9PT0gNDYgLyouKi8pIHtcbiAgICAgICAgICAvLyBJZiB0aGlzIGlzIG91ciBmaXJzdCBkb3QsIG1hcmsgaXQgYXMgdGhlIHN0YXJ0IG9mIG91ciBleHRlbnNpb25cbiAgICAgICAgICBpZiAoc3RhcnREb3QgPT09IC0xKSBzdGFydERvdCA9IGk7ZWxzZSBpZiAocHJlRG90U3RhdGUgIT09IDEpIHByZURvdFN0YXRlID0gMTtcbiAgICAgICAgfSBlbHNlIGlmIChzdGFydERvdCAhPT0gLTEpIHtcbiAgICAgICAgLy8gV2Ugc2F3IGEgbm9uLWRvdCBhbmQgbm9uLXBhdGggc2VwYXJhdG9yIGJlZm9yZSBvdXIgZG90LCBzbyB3ZSBzaG91bGRcbiAgICAgICAgLy8gaGF2ZSBhIGdvb2QgY2hhbmNlIGF0IGhhdmluZyBhIG5vbi1lbXB0eSBleHRlbnNpb25cbiAgICAgICAgcHJlRG90U3RhdGUgPSAtMTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc3RhcnREb3QgPT09IC0xIHx8IGVuZCA9PT0gLTEgfHxcbiAgICAvLyBXZSBzYXcgYSBub24tZG90IGNoYXJhY3RlciBpbW1lZGlhdGVseSBiZWZvcmUgdGhlIGRvdFxuICAgIHByZURvdFN0YXRlID09PSAwIHx8XG4gICAgLy8gVGhlIChyaWdodC1tb3N0KSB0cmltbWVkIHBhdGggY29tcG9uZW50IGlzIGV4YWN0bHkgJy4uJ1xuICAgIHByZURvdFN0YXRlID09PSAxICYmIHN0YXJ0RG90ID09PSBlbmQgLSAxICYmIHN0YXJ0RG90ID09PSBzdGFydFBhcnQgKyAxKSB7XG4gICAgICBpZiAoZW5kICE9PSAtMSkge1xuICAgICAgICBpZiAoc3RhcnRQYXJ0ID09PSAwICYmIGlzQWJzb2x1dGUpIHJldC5iYXNlID0gcmV0Lm5hbWUgPSBwYXRoLnNsaWNlKDEsIGVuZCk7ZWxzZSByZXQuYmFzZSA9IHJldC5uYW1lID0gcGF0aC5zbGljZShzdGFydFBhcnQsIGVuZCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChzdGFydFBhcnQgPT09IDAgJiYgaXNBYnNvbHV0ZSkge1xuICAgICAgICByZXQubmFtZSA9IHBhdGguc2xpY2UoMSwgc3RhcnREb3QpO1xuICAgICAgICByZXQuYmFzZSA9IHBhdGguc2xpY2UoMSwgZW5kKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldC5uYW1lID0gcGF0aC5zbGljZShzdGFydFBhcnQsIHN0YXJ0RG90KTtcbiAgICAgICAgcmV0LmJhc2UgPSBwYXRoLnNsaWNlKHN0YXJ0UGFydCwgZW5kKTtcbiAgICAgIH1cbiAgICAgIHJldC5leHQgPSBwYXRoLnNsaWNlKHN0YXJ0RG90LCBlbmQpO1xuICAgIH1cblxuICAgIGlmIChzdGFydFBhcnQgPiAwKSByZXQuZGlyID0gcGF0aC5zbGljZSgwLCBzdGFydFBhcnQgLSAxKTtlbHNlIGlmIChpc0Fic29sdXRlKSByZXQuZGlyID0gJy8nO1xuXG4gICAgcmV0dXJuIHJldDtcbiAgfSxcblxuICBzZXA6ICcvJyxcbiAgZGVsaW1pdGVyOiAnOicsXG4gIHdpbjMyOiBudWxsLFxuICBwb3NpeDogbnVsbFxufTtcblxucG9zaXgucG9zaXggPSBwb3NpeDtcblxubW9kdWxlLmV4cG9ydHMgPSBwb3NpeDtcbiIsICJpbXBvcnQgeyBXZWJQbHVnaW4gfSBmcm9tICdAY2FwYWNpdG9yL2NvcmUnO1xuaW1wb3J0IHR5cGUgeyBDYXBhY2l0b3JFeGNlcHRpb24gfSBmcm9tICdAY2FwYWNpdG9yL2NvcmUnO1xuXG5pbXBvcnQgdHlwZSB7IENhcGFjaXRvck5vZGVKU1BsdWdpbiB9IGZyb20gJy4vaW1wbGVtZW50YXRpb24nO1xuXG5leHBvcnQgY2xhc3MgQ2FwYWNpdG9yTm9kZUpTV2ViIGV4dGVuZHMgV2ViUGx1Z2luIGltcGxlbWVudHMgQ2FwYWNpdG9yTm9kZUpTUGx1Z2luIHtcbiAgcHJvdGVjdGVkIHVuYXZhaWxhYmxlTm9kZUpTKCk6IENhcGFjaXRvckV4Y2VwdGlvbiB7XG4gICAgcmV0dXJuIHRoaXMudW5hdmFpbGFibGUoJ1RoZSBOb2RlSlMgZW5naW5lIGlzIG5vdCBhdmFpbGFibGUgaW4gdGhlIGJyb3dzZXIhJyk7XG4gIH1cblxuICBzdGFydCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0aHJvdyB0aGlzLnVuYXZhaWxhYmxlTm9kZUpTKCk7XG4gIH1cblxuICBzZW5kKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRocm93IHRoaXMudW5hdmFpbGFibGVOb2RlSlMoKTtcbiAgfVxuXG4gIHdoZW5SZWFkeSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0aHJvdyB0aGlzLnVuYXZhaWxhYmxlTm9kZUpTKCk7XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBJUGxhdGZvcm0gfSBmcm9tIFwiLi9JUGxhdGZvcm1cIjtcblxuZXhwb3J0IGNsYXNzIFBsYXRmb3JtTWFuYWdlciB7XG4gICAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IElQbGF0Zm9ybTtcblxuICAgIHB1YmxpYyBzdGF0aWMgc2V0UGxhdGZvcm0ocGxhdGZvcm06IElQbGF0Zm9ybSk6IHZvaWQge1xuICAgICAgICB0aGlzLmluc3RhbmNlID0gcGxhdGZvcm07XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXQgY3VycmVudCgpOiBJUGxhdGZvcm0ge1xuICAgICAgICBpZiAoIXRoaXMuaW5zdGFuY2UpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlBsYXRmb3JtIG5vdCBpbml0aWFsaXplZC4gQ2FsbCBQbGF0Zm9ybU1hbmFnZXIuc2V0UGxhdGZvcm0oKSBmaXJzdC5cIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gICAgfVxufVxuIiwgImltcG9ydCB7IHJlZ2lzdGVyUGx1Z2luIH0gZnJvbSAnQGNhcGFjaXRvci9jb3JlJztcbmltcG9ydCB7IGV4cG9zZVN5bmFwc2UgfSBmcm9tICdAY2FwYWNpdG9yL3N5bmFwc2UnO1xuXG5pbXBvcnQgdHlwZSB7IEZpbGVzeXN0ZW1QbHVnaW4gfSBmcm9tICcuL2RlZmluaXRpb25zJztcblxuY29uc3QgRmlsZXN5c3RlbSA9IHJlZ2lzdGVyUGx1Z2luPEZpbGVzeXN0ZW1QbHVnaW4+KCdGaWxlc3lzdGVtJywge1xuICB3ZWI6ICgpID0+IGltcG9ydCgnLi93ZWInKS50aGVuKChtKSA9PiBuZXcgbS5GaWxlc3lzdGVtV2ViKCkpLFxufSk7XG5cbmV4cG9zZVN5bmFwc2UoKTtcblxuZXhwb3J0ICogZnJvbSAnLi9kZWZpbml0aW9ucyc7XG5leHBvcnQgeyBGaWxlc3lzdGVtIH07XG4iLCAiZnVuY3Rpb24gcyh0KSB7XG4gIHQuQ2FwYWNpdG9yVXRpbHMuU3luYXBzZSA9IG5ldyBQcm94eShcbiAgICB7fSxcbiAgICB7XG4gICAgICBnZXQoZSwgbikge1xuICAgICAgICByZXR1cm4gbmV3IFByb3h5KHt9LCB7XG4gICAgICAgICAgZ2V0KHcsIG8pIHtcbiAgICAgICAgICAgIHJldHVybiAoYywgcCwgcikgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBpID0gdC5DYXBhY2l0b3IuUGx1Z2luc1tuXTtcbiAgICAgICAgICAgICAgaWYgKGkgPT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICAgIHIobmV3IEVycm9yKGBDYXBhY2l0b3IgcGx1Z2luICR7bn0gbm90IGZvdW5kYCkpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAodHlwZW9mIGlbb10gIT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgcihuZXcgRXJyb3IoYE1ldGhvZCAke299IG5vdCBmb3VuZCBpbiBDYXBhY2l0b3IgcGx1Z2luICR7bn1gKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGEgPSBhd2FpdCBpW29dKGMpO1xuICAgICAgICAgICAgICAgICAgcChhKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChhKSB7XG4gICAgICAgICAgICAgICAgICByKGEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gICk7XG59XG5mdW5jdGlvbiB1KHQpIHtcbiAgdC5DYXBhY2l0b3JVdGlscy5TeW5hcHNlID0gbmV3IFByb3h5KFxuICAgIHt9LFxuICAgIHtcbiAgICAgIGdldChlLCBuKSB7XG4gICAgICAgIHJldHVybiB0LmNvcmRvdmEucGx1Z2luc1tuXTtcbiAgICAgIH1cbiAgICB9XG4gICk7XG59XG5mdW5jdGlvbiBmKHQgPSAhMSkge1xuICB0eXBlb2Ygd2luZG93ID4gXCJ1XCIgfHwgKHdpbmRvdy5DYXBhY2l0b3JVdGlscyA9IHdpbmRvdy5DYXBhY2l0b3JVdGlscyB8fCB7fSwgd2luZG93LkNhcGFjaXRvciAhPT0gdm9pZCAwICYmICF0ID8gcyh3aW5kb3cpIDogd2luZG93LmNvcmRvdmEgIT09IHZvaWQgMCAmJiB1KHdpbmRvdykpO1xufVxuZXhwb3J0IHtcbiAgZiBhcyBleHBvc2VTeW5hcHNlXG59O1xuIiwgImltcG9ydCB7IHJlZ2lzdGVyUGx1Z2luIH0gZnJvbSAnQGNhcGFjaXRvci9jb3JlJztcblxuaW1wb3J0IHR5cGUgeyBCcm93c2VyUGx1Z2luIH0gZnJvbSAnLi9kZWZpbml0aW9ucyc7XG5cbmNvbnN0IEJyb3dzZXIgPSByZWdpc3RlclBsdWdpbjxCcm93c2VyUGx1Z2luPignQnJvd3NlcicsIHtcbiAgd2ViOiAoKSA9PiBpbXBvcnQoJy4vd2ViJykudGhlbigobSkgPT4gbmV3IG0uQnJvd3NlcldlYigpKSxcbn0pO1xuXG5leHBvcnQgKiBmcm9tICcuL2RlZmluaXRpb25zJztcbmV4cG9ydCB7IEJyb3dzZXIgfTtcbiIsICJpbXBvcnQgeyBJUGxhdGZvcm0sIEZpbGVTdGF0IH0gZnJvbSBcIi4vSVBsYXRmb3JtXCI7XG5pbXBvcnQgeyBGaWxlc3lzdGVtLCBEaXJlY3RvcnksIEVuY29kaW5nIH0gZnJvbSBcIkBjYXBhY2l0b3IvZmlsZXN5c3RlbVwiO1xuaW1wb3J0IHsgQnJvd3NlciB9IGZyb20gXCJAY2FwYWNpdG9yL2Jyb3dzZXJcIjtcblxuaW50ZXJmYWNlIEFuZHJvaWRCcmlkZ2Uge1xuICAgIG9wZW5QYXRoKHBhdGg6IHN0cmluZyk6IHZvaWQ7XG4gICAgaXNQaWN0dXJlSW5QaWN0dXJlU3VwcG9ydGVkKCk6IGJvb2xlYW47XG4gICAgZW50ZXJQaWN0dXJlSW5QaWN0dXJlKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKTogYm9vbGVhbjtcbiAgICBzZXRQaWN0dXJlSW5QaWN0dXJlU3RhdGUoZW5hYmxlZDogYm9vbGVhbiwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpOiB2b2lkO1xufVxuXG5kZWNsYXJlIGdsb2JhbCB7XG4gICAgaW50ZXJmYWNlIFdpbmRvdyB7XG4gICAgICAgIFN0cmVtaW9FbmhhbmNlZEFuZHJvaWQ/OiBBbmRyb2lkQnJpZGdlO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIENhcGFjaXRvclBsYXRmb3JtIGltcGxlbWVudHMgSVBsYXRmb3JtIHtcbiAgICBpZDogXCJjYXBhY2l0b3JcIiA9IFwiY2FwYWNpdG9yXCI7XG4gICAgcHJpdmF0ZSByZWFkb25seSBlbmhhbmNlZFBhdGggPSBcIlN0cmVtaW8gRW5oYW5jZWRcIjtcbiAgICBwcml2YXRlIHJlYWRvbmx5IHRoZW1lc1BhdGggPSBgJHt0aGlzLmVuaGFuY2VkUGF0aH0vdGhlbWVzYDtcbiAgICBwcml2YXRlIHJlYWRvbmx5IHBsdWdpbnNQYXRoID0gYCR7dGhpcy5lbmhhbmNlZFBhdGh9L3BsdWdpbnNgO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgbG9nc1BhdGggPSBgJHt0aGlzLmVuaGFuY2VkUGF0aH0vbG9nc2A7XG5cbiAgICBwcml2YXRlIGlzRXh0ZXJuYWxQYXRoKHBhdGg6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gcGF0aC5zdGFydHNXaXRoKFwiZmlsZTovL1wiKSB8fCBwYXRoLnN0YXJ0c1dpdGgoXCJjb250ZW50Oi8vXCIpIHx8IHBhdGguc3RhcnRzV2l0aChcIi9cIik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXREaXJlY3RvcnkocGF0aDogc3RyaW5nKTogRGlyZWN0b3J5IHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNFeHRlcm5hbFBhdGgocGF0aCkgPyB1bmRlZmluZWQgOiBEaXJlY3RvcnkuRG9jdW1lbnRzO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0RmlsZU9wdGlvbnMocGF0aDogc3RyaW5nLCBlbmNvZGluZz86IEVuY29kaW5nKToge1xuICAgICAgICBwYXRoOiBzdHJpbmc7XG4gICAgICAgIGRpcmVjdG9yeT86IERpcmVjdG9yeTtcbiAgICAgICAgZW5jb2Rpbmc/OiBFbmNvZGluZztcbiAgICB9IHtcbiAgICAgICAgY29uc3Qgb3B0aW9uczoge1xuICAgICAgICAgICAgcGF0aDogc3RyaW5nO1xuICAgICAgICAgICAgZGlyZWN0b3J5PzogRGlyZWN0b3J5O1xuICAgICAgICAgICAgZW5jb2Rpbmc/OiBFbmNvZGluZztcbiAgICAgICAgfSA9IHsgcGF0aCB9O1xuXG4gICAgICAgIGNvbnN0IGRpcmVjdG9yeSA9IHRoaXMuZ2V0RGlyZWN0b3J5KHBhdGgpO1xuICAgICAgICBpZiAoZGlyZWN0b3J5KSB7XG4gICAgICAgICAgICBvcHRpb25zLmRpcmVjdG9yeSA9IGRpcmVjdG9yeTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbmNvZGluZykge1xuICAgICAgICAgICAgb3B0aW9ucy5lbmNvZGluZyA9IGVuY29kaW5nO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9wdGlvbnM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBleGlzdHNJbkRpcmVjdG9yeShwYXRoOiBzdHJpbmcsIGRpcmVjdG9yeTogRGlyZWN0b3J5KTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCBGaWxlc3lzdGVtLnN0YXQoeyBwYXRoLCBkaXJlY3RvcnkgfSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIHJlYWRkaXJJbkRpcmVjdG9yeShwYXRoOiBzdHJpbmcsIGRpcmVjdG9yeTogRGlyZWN0b3J5KTogUHJvbWlzZTxzdHJpbmdbXT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgRmlsZXN5c3RlbS5yZWFkZGlyKHsgcGF0aCwgZGlyZWN0b3J5IH0pO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5maWxlcy5tYXAoZmlsZSA9PiBmaWxlLm5hbWUpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgICAgICAgICBpZiAoZXJyb3I/Lm1lc3NhZ2U/LmluY2x1ZGVzKFwiZG9lcyBub3QgZXhpc3RcIikpIHJldHVybiBbXTtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gcmVhZGRpcjpcIiwgZXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBtaWdyYXRlTGVnYWN5RGlyZWN0b3J5KG9sZFBhdGg6IHN0cmluZywgbmV3UGF0aDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGNvbnN0IGxlZ2FjeUZpbGVzID0gYXdhaXQgdGhpcy5yZWFkZGlySW5EaXJlY3Rvcnkob2xkUGF0aCwgRGlyZWN0b3J5LkRhdGEpO1xuICAgICAgICBpZiAoIWxlZ2FjeUZpbGVzLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgICAgIGF3YWl0IHRoaXMubWtkaXIobmV3UGF0aCk7XG4gICAgICAgIGNvbnN0IG1pZ3JhdGVkRmlsZXMgPSBuZXcgU2V0KGF3YWl0IHRoaXMucmVhZGRpcihuZXdQYXRoKSk7XG5cbiAgICAgICAgZm9yIChjb25zdCBmaWxlTmFtZSBvZiBsZWdhY3lGaWxlcykge1xuICAgICAgICAgICAgaWYgKG1pZ3JhdGVkRmlsZXMuaGFzKGZpbGVOYW1lKSkgY29udGludWU7XG5cbiAgICAgICAgICAgIGNvbnN0IGxlZ2FjeVBhdGggPSBgJHtvbGRQYXRofS8ke2ZpbGVOYW1lfWA7XG4gICAgICAgICAgICBjb25zdCBsZWdhY3lTdGF0ID0gYXdhaXQgRmlsZXN5c3RlbS5zdGF0KHtcbiAgICAgICAgICAgICAgICBwYXRoOiBsZWdhY3lQYXRoLFxuICAgICAgICAgICAgICAgIGRpcmVjdG9yeTogRGlyZWN0b3J5LkRhdGFcbiAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IG51bGwpO1xuXG4gICAgICAgICAgICBpZiAoIWxlZ2FjeVN0YXQgfHwgbGVnYWN5U3RhdC50eXBlICE9PSBcImZpbGVcIikgY29udGludWU7XG5cbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSBhd2FpdCBGaWxlc3lzdGVtLnJlYWRGaWxlKHtcbiAgICAgICAgICAgICAgICBwYXRoOiBsZWdhY3lQYXRoLFxuICAgICAgICAgICAgICAgIGRpcmVjdG9yeTogRGlyZWN0b3J5LkRhdGEsXG4gICAgICAgICAgICAgICAgZW5jb2Rpbmc6IEVuY29kaW5nLlVURjhcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBhd2FpdCBGaWxlc3lzdGVtLndyaXRlRmlsZSh7XG4gICAgICAgICAgICAgICAgcGF0aDogYCR7bmV3UGF0aH0vJHtmaWxlTmFtZX1gLFxuICAgICAgICAgICAgICAgIGRpcmVjdG9yeTogRGlyZWN0b3J5LkRvY3VtZW50cyxcbiAgICAgICAgICAgICAgICBkYXRhOiBjb250ZW50LmRhdGEgYXMgc3RyaW5nLFxuICAgICAgICAgICAgICAgIGVuY29kaW5nOiBFbmNvZGluZy5VVEY4XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgZW5zdXJlUGVybWlzc2lvbnMoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGF3YWl0IFByb21pc2UuYWxsU2V0dGxlZChbXG4gICAgICAgICAgICBGaWxlc3lzdGVtLnJlcXVlc3RQZXJtaXNzaW9ucygpXG4gICAgICAgIF0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0QW5kcm9pZEJyaWRnZSgpOiBBbmRyb2lkQnJpZGdlIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIgPyB1bmRlZmluZWQgOiB3aW5kb3cuU3RyZW1pb0VuaGFuY2VkQW5kcm9pZDtcbiAgICB9XG5cbiAgICBhc3luYyByZWFkRmlsZShwYXRoOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBGaWxlc3lzdGVtLnJlYWRGaWxlKHRoaXMuZ2V0RmlsZU9wdGlvbnMocGF0aCwgRW5jb2RpbmcuVVRGOCkpO1xuICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGEgYXMgc3RyaW5nO1xuICAgIH1cblxuICAgIGFzeW5jIHdyaXRlRmlsZShwYXRoOiBzdHJpbmcsIGNvbnRlbnQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBhd2FpdCBGaWxlc3lzdGVtLndyaXRlRmlsZSh7XG4gICAgICAgICAgICAuLi50aGlzLmdldEZpbGVPcHRpb25zKHBhdGgsIEVuY29kaW5nLlVURjgpLFxuICAgICAgICAgICAgZGF0YTogY29udGVudFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhc3luYyByZWFkZGlyKHBhdGg6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nW10+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IEZpbGVzeXN0ZW0ucmVhZGRpcih0aGlzLmdldEZpbGVPcHRpb25zKHBhdGgpKTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQuZmlsZXMubWFwKGYgPT4gZi5uYW1lKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgICAgICAgICAgaWYgKGVycm9yPy5tZXNzYWdlPy5pbmNsdWRlcyhcImRvZXMgbm90IGV4aXN0XCIpKSByZXR1cm4gW107XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIHJlYWRkaXI6XCIsIGVycm9yKTtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIGV4aXN0cyhwYXRoOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF3YWl0IEZpbGVzeXN0ZW0uc3RhdCh0aGlzLmdldEZpbGVPcHRpb25zKHBhdGgpKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIHVubGluayhwYXRoOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgYXdhaXQgRmlsZXN5c3RlbS5kZWxldGVGaWxlKHRoaXMuZ2V0RmlsZU9wdGlvbnMocGF0aCkpO1xuICAgIH1cblxuICAgIGFzeW5jIG1rZGlyKHBhdGg6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBpZiAoYXdhaXQgdGhpcy5leGlzdHMocGF0aCkpIHJldHVybjtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgYXdhaXQgRmlsZXN5c3RlbS5ta2Rpcih7XG4gICAgICAgICAgICAgICAgLi4udGhpcy5nZXRGaWxlT3B0aW9ucyhwYXRoKSxcbiAgICAgICAgICAgICAgICByZWN1cnNpdmU6IHRydWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgICAgICAgICAvLyBJZ25vcmUgZXJyb3IgaWYgZGlyZWN0b3J5IGFscmVhZHkgZXhpc3RzXG4gICAgICAgICAgICBpZiAoZXJyb3I/Lm1lc3NhZ2U/LmluY2x1ZGVzKFwiYWxyZWFkeSBleGlzdHNcIikgfHwgYXdhaXQgdGhpcy5leGlzdHMocGF0aCkpIHJldHVybjtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gY3JlYXRlIGRpcmVjdG9yeTpcIiwgZXJyb3IpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgc3RhdChwYXRoOiBzdHJpbmcpOiBQcm9taXNlPEZpbGVTdGF0PiB7XG4gICAgICAgIGNvbnN0IHN0YXQgPSBhd2FpdCBGaWxlc3lzdGVtLnN0YXQodGhpcy5nZXRGaWxlT3B0aW9ucyhwYXRoKSk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpc0ZpbGU6IHN0YXQudHlwZSA9PT0gJ2ZpbGUnLFxuICAgICAgICAgICAgaXNEaXJlY3Rvcnk6IHN0YXQudHlwZSA9PT0gJ2RpcmVjdG9yeSdcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBhc3luYyBvcGVuUGF0aChwYXRoOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgY29uc3QgYnJpZGdlID0gdGhpcy5nZXRBbmRyb2lkQnJpZGdlKCk7XG4gICAgICAgIGlmIChicmlkZ2UpIHtcbiAgICAgICAgICAgIGJyaWRnZS5vcGVuUGF0aChwYXRoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnNvbGUuaW5mbyhcIk9wZW4gdGhpcyBmb2xkZXIgZnJvbSB5b3VyIEZpbGVzIGFwcDpcIiwgcGF0aCk7XG4gICAgfVxuXG4gICAgYXN5bmMgb3BlbkV4dGVybmFsKHVybDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGF3YWl0IEJyb3dzZXIub3Blbih7IHVybCB9KTtcbiAgICB9XG5cbiAgICBpc1BpY3R1cmVJblBpY3R1cmVTdXBwb3J0ZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEFuZHJvaWRCcmlkZ2UoKT8uaXNQaWN0dXJlSW5QaWN0dXJlU3VwcG9ydGVkKCkgPz8gZmFsc2U7XG4gICAgfVxuXG4gICAgYXN5bmMgZW50ZXJQaWN0dXJlSW5QaWN0dXJlKHdpZHRoID0gMTYsIGhlaWdodCA9IDkpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgY29uc3QgYnJpZGdlID0gdGhpcy5nZXRBbmRyb2lkQnJpZGdlKCk7XG4gICAgICAgIGlmICghYnJpZGdlKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIHJldHVybiBicmlkZ2UuZW50ZXJQaWN0dXJlSW5QaWN0dXJlKHdpZHRoLCBoZWlnaHQpO1xuICAgIH1cblxuICAgIGFzeW5jIHNldFBpY3R1cmVJblBpY3R1cmVTdGF0ZShlbmFibGVkOiBib29sZWFuLCB3aWR0aCA9IDE2LCBoZWlnaHQgPSA5KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHRoaXMuZ2V0QW5kcm9pZEJyaWRnZSgpPy5zZXRQaWN0dXJlSW5QaWN0dXJlU3RhdGUoZW5hYmxlZCwgd2lkdGgsIGhlaWdodCk7XG4gICAgfVxuXG4gICAgZ2V0VGhlbWVzUGF0aCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy50aGVtZXNQYXRoO1xuICAgIH1cblxuICAgIGdldFBsdWdpbnNQYXRoKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLnBsdWdpbnNQYXRoO1xuICAgIH1cblxuICAgIGdldEVuaGFuY2VkUGF0aCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5lbmhhbmNlZFBhdGg7XG4gICAgfVxuXG4gICAgYXN5bmMgaW5pdCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgYXdhaXQgdGhpcy5lbnN1cmVQZXJtaXNzaW9ucygpO1xuICAgICAgICBhd2FpdCB0aGlzLm1rZGlyKHRoaXMuZ2V0RW5oYW5jZWRQYXRoKCkpO1xuICAgICAgICBhd2FpdCB0aGlzLm1rZGlyKHRoaXMuZ2V0VGhlbWVzUGF0aCgpKTtcbiAgICAgICAgYXdhaXQgdGhpcy5ta2Rpcih0aGlzLmdldFBsdWdpbnNQYXRoKCkpO1xuICAgICAgICBhd2FpdCB0aGlzLm1rZGlyKHRoaXMubG9nc1BhdGgpO1xuXG4gICAgICAgIGF3YWl0IHRoaXMubWlncmF0ZUxlZ2FjeURpcmVjdG9yeShcInRoZW1lc1wiLCB0aGlzLmdldFRoZW1lc1BhdGgoKSk7XG4gICAgICAgIGF3YWl0IHRoaXMubWlncmF0ZUxlZ2FjeURpcmVjdG9yeShcInBsdWdpbnNcIiwgdGhpcy5nZXRQbHVnaW5zUGF0aCgpKTtcblxuICAgICAgICBjb25zdCBsZWdhY3lSb290RXhpc3RzID0gYXdhaXQgdGhpcy5leGlzdHNJbkRpcmVjdG9yeShcImxvZ3NcIiwgRGlyZWN0b3J5LkRhdGEpO1xuICAgICAgICBpZiAobGVnYWN5Um9vdEV4aXN0cykge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5taWdyYXRlTGVnYWN5RGlyZWN0b3J5KFwibG9nc1wiLCB0aGlzLmxvZ3NQYXRoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsICJjbGFzcyBCcm93c2VyTG9nZ2VyIHtcbiAgICBpbmZvKG1lc3NhZ2U6IHN0cmluZywgLi4ubWV0YTogYW55W10pIHtcbiAgICAgICAgY29uc29sZS5pbmZvKGBbSU5GT10gJHttZXNzYWdlfWAsIC4uLm1ldGEpO1xuICAgIH1cbiAgICB3YXJuKG1lc3NhZ2U6IHN0cmluZywgLi4ubWV0YTogYW55W10pIHtcbiAgICAgICAgY29uc29sZS53YXJuKGBbV0FSTl0gJHttZXNzYWdlfWAsIC4uLm1ldGEpO1xuICAgIH1cbiAgICBlcnJvcihtZXNzYWdlOiBzdHJpbmcsIC4uLm1ldGE6IGFueVtdKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYFtFUlJPUl0gJHttZXNzYWdlfWAsIC4uLm1ldGEpO1xuICAgIH1cbn1cblxuY29uc3QgbG9nZ2VyID0gbmV3IEJyb3dzZXJMb2dnZXIoKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldExvZ2dlcihsYWJlbDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIGxvZ2dlcjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgbG9nZ2VyO1xuIiwgIi8qKlxuICogQ2VudHJhbGl6ZWQgY29uc3RhbnRzIGZvciBTdHJlbWlvIEVuaGFuY2VkXG4gKiBVc2luZyBjb25zdGFudHMgaW5zdGVhZCBvZiBtYWdpYyBzdHJpbmdzIGltcHJvdmVzIG1haW50YWluYWJpbGl0eVxuICovXG5cbi8vIENTUyBTZWxlY3RvcnMgdXNlZCB0byBpbnRlcmFjdCB3aXRoIFN0cmVtaW8ncyBVSVxuLy8gTm90ZTogVGhlc2UgbWF5IG5lZWQgdXBkYXRpbmcgd2hlbiBTdHJlbWlvIHVwZGF0ZXMgdGhlaXIgY2xhc3MgbmFtZXNcbmV4cG9ydCBjb25zdCBTRUxFQ1RPUlMgPSB7XG4gICAgU0VDVElPTlNfQ09OVEFJTkVSOiAnW2NsYXNzXj1cInNlY3Rpb25zLWNvbnRhaW5lci1cIl0nLFxuICAgIFNFQ1RJT046ICdbY2xhc3NePVwic2VjdGlvbi1cIl0nLFxuICAgIENBVEVHT1JZOiAnLmNhdGVnb3J5LUdQMGhJJyxcbiAgICBDQVRFR09SWV9MQUJFTDogJy5sYWJlbC1OX08ydicsXG4gICAgQ0FURUdPUllfSUNPTjogJy5pY29uLW9ab3lWJyxcbiAgICBDQVRFR09SWV9IRUFESU5HOiAnLmhlYWRpbmctWGVQRmwnLFxuICAgIExBQkVMOiAnW2NsYXNzXj1cImxhYmVsLXdYRzNlXCJdJyxcbiAgICBOQVZfTUVOVTogJy5tZW51LXhlRTA2JyxcbiAgICBTRVRUSU5HU19DT05URU5UOiAnLnNldHRpbmdzLWNvbnRlbnQtY281ZVUnLFxuICAgIEVOSEFOQ0VEX1NFQ1RJT046ICcjZW5oYW5jZWQnLFxuICAgIFRIRU1FU19DQVRFR09SWTogJyNlbmhhbmNlZCA+IGRpdjpudGgtY2hpbGQoMiknLFxuICAgIFBMVUdJTlNfQ0FURUdPUlk6ICcjZW5oYW5jZWQgPiBkaXY6bnRoLWNoaWxkKDMpJyxcbiAgICBBQk9VVF9DQVRFR09SWTogJyNlbmhhbmNlZCA+IGRpdjpudGgtY2hpbGQoNCknLFxuICAgIFJPVVRFX0NPTlRBSU5FUjogJy5yb3V0ZS1jb250YWluZXI6bGFzdC1jaGlsZCAucm91dGUtY29udGVudCcsXG4gICAgTUVUQV9ERVRBSUxTX0NPTlRBSU5FUjogJy5tZXRhZGV0YWlscy1jb250YWluZXItS19EcWEnLFxuICAgIERFU0NSSVBUSU9OX0NPTlRBSU5FUjogJy5kZXNjcmlwdGlvbi1jb250YWluZXIteWk4aVUnLFxuICAgIEFERE9OU19MSVNUX0NPTlRBSU5FUjogJy5hZGRvbnMtbGlzdC1jb250YWluZXItT3ZyMlonLFxuICAgIEFERE9OX0NPTlRBSU5FUjogJy5hZGRvbi1jb250YWluZXItbEM1S04nLFxuICAgIE5BTUVfQ09OVEFJTkVSOiAnLm5hbWUtY29udGFpbmVyLXFJQWc4JyxcbiAgICBERVNDUklQVElPTl9JVEVNOiAnLmRlc2NyaXB0aW9uLWNvbnRhaW5lci12N0poZScsXG4gICAgVFlQRVNfQ09OVEFJTkVSOiAnLnR5cGVzLWNvbnRhaW5lci1EYU9yZycsXG4gICAgU0VBUkNIX0lOUFVUOiAnLnNlYXJjaC1pbnB1dC1iQWdBaCcsXG4gICAgSE9SSVpPTlRBTF9OQVY6ICcuaG9yaXpvbnRhbC1uYXYtYmFyLWNvbnRhaW5lci1ZX3p2SycsXG4gICAgVE9BU1RfSVRFTTogJy50b2FzdC1pdGVtLWNvbnRhaW5lci1uRzB1aycsXG4gICAgVE9BU1RfQ09OVEFJTkVSOiAnLnRvYXN0cy1jb250YWluZXItb0tFQ3knXG59IGFzIGNvbnN0O1xuXG4vLyBDU1MgQ2xhc3NlcyB1c2VkIGZvciBzdHlsaW5nXG5leHBvcnQgY29uc3QgQ0xBU1NFUyA9IHtcbiAgICBPUFRJT046ICdvcHRpb24tdkZPQVMnLFxuICAgIENPTlRFTlQ6ICdjb250ZW50LVAyVDBpJyxcbiAgICBCVVRUT046ICdidXR0b24tRE5tWUwnLFxuICAgIEJVVFRPTl9DT05UQUlORVI6ICdidXR0b24tY29udGFpbmVyLXpWTEg2JyxcbiAgICBTRUxFQ1RFRDogJ3NlbGVjdGVkLVM3U2VLJyxcbiAgICBJTlNUQUxMX0JVVFRPTjogJ2luc3RhbGwtYnV0dG9uLWNvbnRhaW5lci15ZmNxNScsXG4gICAgVU5JTlNUQUxMX0JVVFRPTjogJ3VuaW5zdGFsbC1idXR0b24tY29udGFpbmVyLW9WNFlvJyxcbiAgICBDSEVDS0VEOiAnY2hlY2tlZCcsXG59IGFzIGNvbnN0O1xuXG4vLyBMb2NhbFN0b3JhZ2Uga2V5c1xuZXhwb3J0IGNvbnN0IFNUT1JBR0VfS0VZUyA9IHtcbiAgICBFTkFCTEVEX1BMVUdJTlM6ICdlbmFibGVkUGx1Z2lucycsXG4gICAgQ1VSUkVOVF9USEVNRTogJ2N1cnJlbnRUaGVtZScsXG4gICAgRElTQ09SRF9SUEM6ICdkaXNjb3JkcmljaHByZXNlbmNlJyxcbiAgICBDSEVDS19VUERBVEVTX09OX1NUQVJUVVA6ICdjaGVja0ZvclVwZGF0ZXNPblN0YXJ0dXAnLFxuICAgIFBMVUdJTl9PUFRJT05TX1BSRUZJWDogJ3N0cmVtaW9FbmhhbmNlZC5wbHVnaW5PcHRpb25zLnYxOicsXG59IGFzIGNvbnN0O1xuXG4vLyBJUEMgQ2hhbm5lbCBuYW1lcyBmb3IgbWFpbiA8LT4gcmVuZGVyZXIgY29tbXVuaWNhdGlvblxuZXhwb3J0IGNvbnN0IElQQ19DSEFOTkVMUyA9IHtcbiAgICBNSU5JTUlaRV9XSU5ET1c6ICdtaW5pbWl6ZS13aW5kb3cnLFxuICAgIE1BWElNSVpFX1dJTkRPVzogJ21heGltaXplLXdpbmRvdycsXG4gICAgQ0xPU0VfV0lORE9XOiAnY2xvc2Utd2luZG93JyxcbiAgICBTRVRfVFJBTlNQQVJFTkNZOiAnc2V0LXRyYW5zcGFyZW5jeScsXG4gICAgR0VUX1RSQU5TUEFSRU5DWV9TVEFUVVM6ICdnZXQtdHJhbnNwYXJlbmN5LXN0YXR1cycsXG4gICAgVVBEQVRFX0NIRUNLX1NUQVJUVVA6ICd1cGRhdGUtY2hlY2stb24tc3RhcnR1cCcsXG4gICAgVVBEQVRFX0NIRUNLX1VTRVI6ICd1cGRhdGUtY2hlY2stdXNlcnJlcXVlc3QnLFxuICAgIEZVTExTQ1JFRU5fQ0hBTkdFRDogJ2Z1bGxzY3JlZW4tY2hhbmdlZCcsXG4gICAgRVhUUkFDVF9FTUJFRERFRF9TVUJUSVRMRVM6ICdleHRyYWN0LWVtYmVkZGVkLXN1YnRpdGxlcycsXG59IGFzIGNvbnN0O1xuXG4vLyBGaWxlIGV4dGVuc2lvbnMgZm9yIG1vZHNcbmV4cG9ydCBjb25zdCBGSUxFX0VYVEVOU0lPTlMgPSB7XG4gICAgVEhFTUU6ICcudGhlbWUuY3NzJyxcbiAgICBQTFVHSU46ICcucGx1Z2luLmpzJyxcbn0gYXMgY29uc3Q7XG5cbi8vIFVSTHNcbmV4cG9ydCBjb25zdCBVUkxTID0ge1xuICAgIFNUUkVNSU9fV0VCOiAnaHR0cHM6Ly93ZWIuc3RyZW1pby5jb20vJyxcbiAgICBTVFJFTUlPX1dFQl9BRERfQURET046ICdodHRwczovL3dlYi5zdHJlbWlvLmNvbS8jL2FkZG9ucz9hZGRvbj0nLFxuICAgIFJFR0lTVFJZOiAnaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL1JFVkVOR0U5Nzcvc3RyZW1pby1lbmhhbmNlZC1yZWdpc3RyeS9yZWZzL2hlYWRzL21haW4vcmVnaXN0cnkuanNvbicsXG4gICAgVkVSU0lPTl9DSEVDSzogJ2h0dHBzOi8vZ2l0aHViLmNvbS9SRVZFTkdFOTc3L3N0cmVtaW8tZW5oYW5jZWQtY29tbXVuaXR5L3Jhdy9tYWluL3ZlcnNpb24nLFxuICAgIFJFTEVBU0VTX0FQSTogJ2h0dHBzOi8vYXBpLmdpdGh1Yi5jb20vcmVwb3MvUkVWRU5HRTk3Ny9zdHJlbWlvLWVuaGFuY2VkLWNvbW11bml0eS9yZWxlYXNlcy9sYXRlc3QnLFxuICAgIFJFTEVBU0VTX1BBR0U6ICdodHRwczovL2dpdGh1Yi5jb20vUkVWRU5HRTk3Ny9zdHJlbWlvLWVuaGFuY2VkLWNvbW11bml0eS9yZWxlYXNlcy9sYXRlc3QnLFxuICAgIFNUUkVNSU9fU0VSVklDRV9HSVRIVUJfQVBJOiBcImh0dHBzOi8vYXBpLmdpdGh1Yi5jb20vcmVwb3MvU3RyZW1pby9zdHJlbWlvLXNlcnZpY2UvcmVsZWFzZXMvbGF0ZXN0XCJcbn0gYXMgY29uc3Q7XG5cbi8vIHNlcnZlci5qcyAoU3RyZW1pbyBzdHJlYW1pbmcgc2VydmVyKSBEb3dubG9hZCBVUkxcbmV4cG9ydCBjb25zdCBTRVJWRVJfSlNfVVJMID0gXCJodHRwczovL2RsLnN0cmVtLmlvL3NlcnZlci92NC4yMC4xMi9kZXNrdG9wL3NlcnZlci5qc1wiO1xuXG4vLyBGRm1wZWcgRG93bmxvYWQgVVJMc1xuZXhwb3J0IGNvbnN0IEZGTVBFR19VUkxTID0ge1xuICAgIHdpbjMyOiB7XG4gICAgICAgIHg2NDogXCJodHRwczovL2dpdGh1Yi5jb20vQnRiTi9GRm1wZWctQnVpbGRzL3JlbGVhc2VzL2Rvd25sb2FkL2xhdGVzdC9mZm1wZWctbWFzdGVyLWxhdGVzdC13aW42NC1ncGwuemlwXCIsXG4gICAgICAgIGFybTY0OiBcImh0dHBzOi8vZ2l0aHViLmNvbS9CdGJOL0ZGbXBlZy1CdWlsZHMvcmVsZWFzZXMvZG93bmxvYWQvbGF0ZXN0L2ZmbXBlZy1tYXN0ZXItbGF0ZXN0LXdpbmFybTY0LWdwbC56aXBcIixcbiAgICB9LFxuICAgIGRhcndpbjoge1xuICAgICAgICB4NjQ6IFwiaHR0cHM6Ly9mZm1wZWcubWFydGluLXJpZWRsLmRlL2Rvd25sb2FkL21hY29zL2FtZDY0LzE3NjY0MzcyOTdfOC4wLjEvZmZtcGVnLnppcFwiLFxuICAgICAgICBhcm02NDogXCJodHRwczovL2ZmbXBlZy5tYXJ0aW4tcmllZGwuZGUvZG93bmxvYWQvbWFjb3MvYXJtNjQvMTc2NjQzMDEzMl84LjAuMS9mZm1wZWcuemlwXCIsXG4gICAgfSxcbiAgICBsaW51eDoge1xuICAgICAgICB4NjQ6IFwiaHR0cHM6Ly9qb2hudmFuc2lja2xlLmNvbS9mZm1wZWcvcmVsZWFzZXMvZmZtcGVnLXJlbGVhc2UtYW1kNjQtc3RhdGljLnRhci54elwiLFxuICAgICAgICBhcm02NDogXCJodHRwczovL2pvaG52YW5zaWNrbGUuY29tL2ZmbXBlZy9yZWxlYXNlcy9mZm1wZWctcmVsZWFzZS1hcm02NC1zdGF0aWMudGFyLnh6XCIsXG4gICAgfSxcbn0gYXMgY29uc3Q7XG5cbi8vIEZGcHJvYmUgRG93bmxvYWQgVVJMcyBmb3IgbWFjT1NcbmV4cG9ydCBjb25zdCBNQUNPU19GRlBST0JFX1VSTFMgPSB7XG4gICAgeDY0OiBcImh0dHBzOi8vZmZtcGVnLm1hcnRpbi1yaWVkbC5kZS9kb3dubG9hZC9tYWNvcy9hbWQ2NC8xNzY2NDM3Mjk3XzguMC4xL2ZmcHJvYmUuemlwXCIsXG4gICAgYXJtNjQ6IFwiaHR0cHM6Ly9mZm1wZWcubWFydGluLXJpZWRsLmRlL2Rvd25sb2FkL21hY29zL2FybTY0LzE3NjY0MzAxMzJfOC4wLjEvZmZwcm9iZS56aXBcIixcbn07XG5cbi8vIERpc2NvcmQgUlBDXG5leHBvcnQgY29uc3QgRElTQ09SRCA9IHtcbiAgICBDTElFTlRfSUQ6ICcxMjAwMTg2NzUwNzI3ODkzMTY0JyxcbiAgICBSRUNPTk5FQ1RfSU5URVJWQUw6IDEwMDAwLFxuICAgIERFRkFVTFRfSU1BR0U6ICcxMDI0c3RyZW1pbycsXG59IGFzIGNvbnN0O1xuXG4vLyBUaW1lb3V0c1xuZXhwb3J0IGNvbnN0IFRJTUVPVVRTID0ge1xuICAgIEVMRU1FTlRfV0FJVDogMTAwMDAsXG4gICAgSU5TVEFMTF9DT01QTEVUSU9OOiAxMjAwMDAsXG4gICAgU0VSVklDRV9DSEVDS19JTlRFUlZBTDogNTAwMCxcbiAgICBTRVJWRVJfUkVMT0FEX0RFTEFZOiAxNTAwLFxuICAgIENPUkVTVEFURV9SRVRSWV9JTlRFUlZBTDogMTAwMCxcbiAgICBDT1JFU1RBVEVfTUFYX1JFVFJJRVM6IDMwLFxufSBhcyBjb25zdDtcbiIsICI8ZGl2IGNsYXNzPVwibmF2LWNvbnRlbnQtY29udGFpbmVyLXpsOWhRXCIgc3R5bGU9XCJ3aWR0aDogOTAlOyBvdmVyZmxvdy15OiBhdXRvO1wiPlxuICAgIDxkaXYgY2xhc3M9XCJhZGRvbnMtY29udGVudC16aEZCbFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwic2VsZWN0YWJsZS1pbnB1dHMtY29udGFpbmVyLXRVdWwxXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3BhY2luZy13SDF3NVwiPjwvZGl2PlxuICAgICAgICAgICAgPGxhYmVsIHRpdGxlPVwiU2VhcmNoIHRoZW1lcy9wbHVnaW5zXCIgY2xhc3M9XCJzZWFyY2gtYmFyLWs3TVhkIHNlYXJjaC1iYXItY29udGFpbmVyLXA0dFN0XCI+XG4gICAgICAgICAgICAgICAgPGlucHV0IHNpemU9XCIxXCIgYXV0b2NvcnJlY3Q9XCJvZmZcIiBhdXRvY2FwaXRhbGl6ZT1cIm9mZlwiIGF1dG9jb21wbGV0ZT1cIm9mZlwiIHNwZWxsY2hlY2s9XCJmYWxzZVwiIHRhYmluZGV4PVwiMFwiIGNsYXNzPVwic2VhcmNoLWlucHV0LWJBZ0FoIHRleHQtaW5wdXQtaG5MaXpcIiB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiU2VhcmNoIHRoZW1lcy9wbHVnaW5zXCIgdmFsdWU9XCJcIj5cbiAgICAgICAgICAgICAgICA8c3ZnIGNsYXNzPVwiaWNvbi1RT1lmSlwiIHZpZXdCb3g9XCIwIDAgNTEyIDUxMlwiPlxuICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTQ1Ni44ODIgNDE1Ljc5OTk5OTk5OTk5OTdsLTkzLjc5MS04OS40NWMyMi42MDUtMjguNjcgMzQuNzg0LTYzLjU3IDM0LjY4Ni05OS40NCAwLTkxLjU0LTc4LjE0Mi0xNjYuMDctMTc0LjEyNS0xNjYuMDdzLTE3NC4xMjUgNzQuNTMtMTc0LjEyNSAxNjYuMTdjMCA5MS41NCA3OC4xNDIgMTY2LjA3IDE3NC4xMjUgMTY2LjA3IDM3LjU4NiAwIDc0LjE2MS0xMS42MSAxMDQuMjU2LTMzLjA4bDkzLjc5IDg5LjQ1YzMuNTM1IDMuMDQgNy45MSA1LjA1IDEyLjYwNCA1Ljc5IDQuNjk2IDAuNzQgOS41MTUgMC4xOCAxMy44ODctMS42MSA0LjM3NC0xLjc5IDguMTE3LTQuNzQgMTAuNzg4LTguNDkgMi42NzEtMy43NiA0LjE1Ny04LjE3IDQuMjg0LTEyLjcgMC4xMDgtNi4xMS0yLjE2NS0xMi4wNC02LjM3OS0xNi42NG0tMzU3LjYyLTE4OC43OWMtMC4wMS0yOS40MyAxMS40NTMtNTcuOCAzMi4xNjItNzkuNjEgMjAuNzA5LTIxLjgyIDQ5LjE4My0zNS40OSA3OS44ODQtMzguMzkgMzAuNy0yLjkgNjEuNDMzIDUuMiA4Ni4yMjEgMjIuNzIgMjQuNzg3IDE3LjUyIDQxLjg1OCA0My4yIDQ3Ljg5MSA3Mi4wNSA2LjAzNCAyOC44NiAwLjU5OCA1OC44My0xNS4yNDkgODQuMDdzLTQwLjk3MiA0My45Ni03MC40ODkgNTIuNTNjLTI5LjUxOCA4LjU1LTYxLjMxNyA2LjMzLTg5LjIxMy02LjI0cy00OS44OTUtMzQuNTctNjEuNzE4LTYxLjc1Yy02LjI1OC0xNC4zOC05LjQ4My0yOS44MS05LjQ4OC00NS4zOFwiIHN0eWxlPVwiZmlsbDogY3VycmVudGNvbG9yO1wiPjwvcGF0aD5cbiAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8YnIvPlxuICAgICAgICA8ZGl2IHRhYmluZGV4PVwiMFwiIHRpdGxlPVwiU3VibWl0IHlvdXIgdGhlbWVzIGFuZCBwbHVnaW5zIGhlcmVcIiB0YXJnZXQ9XCJfYmxhbmtcIiBjbGFzcz1cImxpbmstRnJMMXQgYnV0dG9uLWNvbnRhaW5lci16VkxINlwiPlxuICAgICAgICAgICAgPGEgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9SRVZFTkdFOTc3L3N0cmVtaW8tZW5oYW5jZWQtcmVnaXN0cnlcIiB0YXJnZXQ9XCJfYmxhbmtcIiByZWw9XCJub3JlZmVycmVyXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxhYmVsLVBKdlNKXCIgc3R5bGU9XCJ0ZXh0LWFsaWduOiBjZW50ZXI7XCI+U3VibWl0IHlvdXIgdGhlbWVzIGFuZCBwbHVnaW5zPC9kaXY+XG4gICAgICAgICAgICA8L2E+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJhZGRvbnMtbGlzdC1jb250YWluZXItT3ZyMlpcIiBpZD1cIm1vZHMtbGlzdFwiPlxuICAgICAgICAgICAgXG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8YnIvPlxuICAgIDwvZGl2PlxuPC9kaXY+IiwgIjxicj5cbjxkaXYgdGFiaW5kZXg9XCIwXCIgY2xhc3M9XCJhZGRvbi13aG1kTyBhbmltYXRpb24tZmFkZS1pbiBhZGRvbi1jb250YWluZXItbEM1S04gYnV0dG9uLWNvbnRhaW5lci16VkxINlwiPlxuICAgIDxkaXYgY2xhc3M9XCJsb2dvLWNvbnRhaW5lci1aY1NTQ1wiPlxuICAgICAgICA8IS0tIHRoZW1lIHByZXZpZXcgaGVyZSAtLT5cblxuICAgICAgICA8IS0tIHBsdWdpbiBpY29uIGhlcmUgLS0+XG4gICAgPC9kaXY+XG5cblx0PGRpdiBjbGFzcz1cImluZm8tY29udGFpbmVyLUFkTUI2XCI+XG5cdFx0PGRpdiBjbGFzcz1cIm5hbWUtY29udGFpbmVyLXFJQWc4XCIgdGl0bGU9XCJ7eyBuYW1lIH19XCI+e3sgbmFtZSB9fTwvZGl2PlxuXHRcdDxkaXYgY2xhc3M9XCJ2ZXJzaW9uLWNvbnRhaW5lci16ZFB5TlwiIHRpdGxlPVwie3sgdmVyc2lvbiB9fVwiPnt7IHZlcnNpb24gfX08L2Rpdj5cblx0XHQ8ZGl2IGNsYXNzPVwidHlwZXMtY29udGFpbmVyLURhT3JnXCI+e3sgdHlwZSB9fTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZGVzY3JpcHRpb24tY29udGFpbmVyLXY3SmhlXCI+XG4gICAgICAgICAgICA8Yj5EZXNjcmlwdGlvbjo8L2I+IHt7IGRlc2NyaXB0aW9uIH19XG4gICAgICAgICAgICA8YnI+XG4gICAgICAgICAgICA8Yj5BdXRob3I6PC9iPiB7eyBhdXRob3IgfX1cbiAgICAgICAgPC9kaXY+XG5cdDwvZGl2PlxuXHQ8ZGl2IGNsYXNzPVwiYnV0dG9ucy1jb250YWluZXItZzB4WHJcIj5cblx0XHQ8ZGl2IGNsYXNzPVwiYWN0aW9uLWJ1dHRvbnMtY29udGFpbmVyLXhNVm16XCI+XG5cdFx0XHQ8ZGl2IHRhYmluZGV4PVwie3sgYWN0aW9uVGFiSW5kZXggfX1cIiByb2xlPVwiYnV0dG9uXCIgYXJpYS1kaXNhYmxlZD1cInt7IGFjdGlvbkRpc2FibGVkIH19XCIgdGl0bGU9XCJ7eyBhY3Rpb25idG5UaXRsZSB9fVwiIGNsYXNzPVwie3sgYWN0aW9uYnRuQ2xhc3MgfX0gYnV0dG9uLWNvbnRhaW5lci16VkxINiBtb2RBY3Rpb25CdG5cIiBkYXRhLWFjdGlvbj1cInt7IGFjdGlvbiB9fVwiIGRhdGEtbGluaz1cInt7IGRvd25sb2FkIH19XCIgZGF0YS10eXBlPVwie3sgdHlwZSB9fVwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwibGFiZWwtT25XaDJcIj57eyBhY3Rpb25idG5UaXRsZSB9fTwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0PC9kaXY+XG5cdFx0PGEge3sgcmVwb0hyZWYgfX0gdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlclwiIGFyaWEtZGlzYWJsZWQ9XCJ7eyByZXBvRGlzYWJsZWQgfX1cIiB0YWJpbmRleD1cInt7IHJlcG9UYWJJbmRleCB9fVwiIGNsYXNzPVwic2hhcmUtYnV0dG9uLWNvbnRhaW5lci1zM2d3UCBidXR0b24tY29udGFpbmVyLXpWTEg2XCI+XG5cdFx0XHQ8c3ZnIGNsYXNzPVwiaWNvbi1HeFZiWVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj5cblx0XHRcdFx0PHBhdGggZD1cIk0xMiwyQTEwLDEwIDAgMCwwIDIsMTJDMiwxNi40MiA0Ljg3LDIwLjE3IDguODQsMjEuNUM5LjM0LDIxLjU4IDkuNSwyMS4yNyA5LjUsMjFDOS41LDIwLjc3IDkuNSwyMC4xNCA5LjUsMTkuMzFDNi43MywxOS45MSA2LjE0LDE3Ljk3IDYuMTQsMTcuOTdDNS42OCwxNi44MSA1LjAzLDE2LjUgNS4wMywxNi41QzQuMTIsMTUuODggNS4xLDE1LjkgNS4xLDE1LjlDNi4xLDE1Ljk3IDYuNjMsMTYuOTMgNi42MywxNi45M0M3LjUsMTguNDUgOC45NywxOCA5LjU0LDE3Ljc2QzkuNjMsMTcuMTEgOS44OSwxNi42NyAxMC4xNywxNi40MkM3Ljk1LDE2LjE3IDUuNjIsMTUuMzEgNS42MiwxMS41QzUuNjIsMTAuMzkgNiw5LjUgNi42NSw4Ljc5QzYuNTUsOC41NCA2LjIsNy41IDYuNzUsNi4xNUM2Ljc1LDYuMTUgNy41OSw1Ljg4IDkuNSw3LjE3QzEwLjI5LDYuOTUgMTEuMTUsNi44NCAxMiw2Ljg0QzEyLjg1LDYuODQgMTMuNzEsNi45NSAxNC41LDcuMTdDMTYuNDEsNS44OCAxNy4yNSw2LjE1IDE3LjI1LDYuMTVDMTcuOCw3LjUgMTcuNDUsOC41NCAxNy4zNSw4Ljc5QzE4LDkuNSAxOC4zOCwxMC4zOSAxOC4zOCwxMS41QzE4LjM4LDE1LjMyIDE2LjA0LDE2LjE2IDEzLjgxLDE2LjQxQzE0LjE3LDE2LjcyIDE0LjUsMTcuMzMgMTQuNSwxOC4yNkMxNC41LDE5LjYgMTQuNSwyMC42OCAxNC41LDIxQzE0LjUsMjEuMjcgMTQuNjYsMjEuNTkgMTUuMTcsMjEuNUMxOS4xNCwyMC4xNiAyMiwxNi40MiAyMiwxMkExMCwxMCAwIDAsMCAxMiwyWlwiIHN0eWxlPVwiZmlsbDogY3VycmVudGNvbG9yO1wiIC8+XG5cdFx0XHQ8L3N2Zz5cblx0XHRcdDxkaXYgY2xhc3M9XCJsYWJlbC1PbldoMlwiPk9wZW4gcmVwb3NpdG9yeTwvZGl2PlxuXHRcdDwvYT5cblx0PC9kaXY+XG48L2Rpdj5cbiIsICI8aDQgc3R5bGU9XCJjb2xvcjogd2hpdGU7IG1hcmdpbi1ib3R0b206IDFyZW07XCI+XG4gICAgRGV2ZWxvcGVkIEJ5OiA8cCBzdHlsZT1cImRpc3BsYXk6IGlubGluZSAhaW1wb3J0YW50O1wiPjxhIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vUkVWRU5HRTk3N1wiIHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vcmVmZXJyZXJcIj5SRVZFTkdFOTc3PC9hPjwvcD5cbiAgICA8YnIvPlxuICAgIFZlcnNpb246IHZ7eyB2ZXJzaW9uIH19XG4gICAgPGJyLz5cbjwvaDQ+XG5cbjxkaXYgY2xhc3M9XCJvcHRpb24tdkZPQVNcIj5cbiAgICA8ZGl2IGNsYXNzPVwiaGVhZGluZy1kWU1EdFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibGFiZWwtcUk2VmhcIj5DaGVjayBmb3IgdXBkYXRlcyBvbiBzdGFydHVwPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImNvbnRlbnQtUDJUMGlcIj5cbiAgICAgICAgPGRpdiB0YWJpbmRleD1cIi0xXCIgY2xhc3M9XCJ0b2dnbGUtY29udGFpbmVyLWxaZkhQIGJ1dHRvbi1jb250YWluZXItelZMSDYge3sgY2hlY2tGb3JVcGRhdGVzT25TdGFydHVwIH19XCIgaWQ9XCJjaGVja0ZvclVwZGF0ZXNPblN0YXJ0dXBcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0b2dnbGUtdG9PV01cIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG48L2Rpdj5cblxuPGRpdiBjbGFzcz1cIm9wdGlvbi12Rk9BU1wiPlxuICAgIDxkaXYgY2xhc3M9XCJoZWFkaW5nLWRZTUR0XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJsYWJlbC1xSTZWaFwiPkRpc2NvcmQgUmljaCBQcmVzZW5jZTwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJjb250ZW50LVAyVDBpXCI+XG4gICAgICAgIDxkaXYgdGFiaW5kZXg9XCItMVwiIGNsYXNzPVwidG9nZ2xlLWNvbnRhaW5lci1sWmZIUCBidXR0b24tY29udGFpbmVyLXpWTEg2IHt7IGRpc2NvcmRyaWNocHJlc2VuY2UgfX1cIiBpZD1cImRpc2NvcmRyaWNocHJlc2VuY2VcIiBzdHlsZT1cIm91dGxpbmU6IG5vbmU7XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9nZ2xlLXRvT1dNXCI+PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuPC9kaXY+XG5cbjxkaXYgY2xhc3M9XCJvcHRpb24tdkZPQVNcIj5cbiAgICA8ZGl2IGNsYXNzPVwiaGVhZGluZy1kWU1EdFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibGFiZWwtcUk2VmhcIj5XaW5kb3cgdHJhbnNwYXJlbmN5PC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImNvbnRlbnQtUDJUMGlcIj5cbiAgICAgICAgPGRpdiB0YWJpbmRleD1cIi0xXCIgY2xhc3M9XCJ0b2dnbGUtY29udGFpbmVyLWxaZkhQIGJ1dHRvbi1jb250YWluZXItelZMSDYge3sgZW5hYmxlVHJhbnNwYXJlbnRUaGVtZXMgfX1cIiBpZD1cImVuYWJsZVRyYW5zcGFyZW50VGhlbWVzXCIgc3R5bGU9XCJvdXRsaW5lOiBub25lO1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRvZ2dsZS10b09XTVwiPjwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvZGl2PlxuXG48cCBzdHlsZT1cImNvbG9yOmdyYXk7XCI+VGhpcyBvcHRpb24gaGFzIHRvIGJlIGVuYWJsZWQgZm9yIHRoZW1lcyB0aGF0IHN1cHBvcnQgdHJhbnNwYXJlbmN5IHRvIHdvcmsuIChleHBlcmltZW50YWwpPC9wPlxuPGJyLz5cblxuPGRpdiBjbGFzcz1cIm9wdGlvbi12Rk9BU1wiPlxuICAgIDxkaXYgY2xhc3M9XCJjb250ZW50LVAyVDBpXCI+XG4gICAgICAgIDxkaXYgdGFiaW5kZXg9XCIwXCIgdGl0bGU9XCJDb21tdW5pdHkgUGx1Z2lucyAmYW1wOyBUaGVtZXNcIiBjbGFzcz1cImJ1dHRvbi1ETm1ZTCBidXR0b24tY29udGFpbmVyLXpWTEg2IGJ1dHRvblwiIGlkPVwiYnJvd3NlUGx1Z2luc1RoZW1lc0J0blwiPlxuICAgICAgICAgICAgQ29tbXVuaXR5IE1hcmtldHBsYWNlXG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuPC9kaXY+XG5cbjxkaXYgY2xhc3M9XCJvcHRpb24tdkZPQVNcIj5cbiAgICA8ZGl2IGNsYXNzPVwiY29udGVudC1QMlQwaVwiPlxuICAgICAgICA8ZGl2IHRhYmluZGV4PVwiMFwiIHRpdGxlPVwiQ2hlY2sgRm9yIFVwZGF0ZXNcIiBjbGFzcz1cImJ1dHRvbi1ETm1ZTCBidXR0b24tY29udGFpbmVyLXpWTEg2IGJ1dHRvblwiIGlkPVwiY2hlY2tmb3J1cGRhdGVzQnRuXCI+XG4gICAgICAgICAgICBDaGVjayBGb3IgVXBkYXRlc1xuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvZGl2PlxuXG48YnIvPiIsICI8ZGl2IGNsYXNzPVwib3B0aW9uLXZGT0FTXCI+XG4gICAgPGRpdiBjbGFzcz1cImhlYWRpbmctZFlNRHRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImxhYmVsLXFJNlZoXCI+RGVmYXVsdDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJjb250ZW50LVAyVDBpXCI+XG4gICAgICAgIDxkaXZcbiAgICAgICAgdGl0bGU9XCJEZWZhdWx0XCJcbiAgICAgICAgaWQ9XCJEZWZhdWx0XCJcbiAgICAgICAgdGFiaW5kZXg9XCItMVwiXG4gICAgICAgIGRhdGEtc3RyZW1pby1lbmhhbmNlZC1hcHBseS10aGVtZT1cIkRlZmF1bHRcIlxuICAgICAgICBzdHlsZT1cImNvbG9yOiB3aGl0ZTsgbWFyZ2luLWJvdHRvbTogMXJlbTsgd2lkdGg6IG1heC1jb250ZW50OyBiYWNrZ3JvdW5kLWNvbG9yOiB7eyBiYWNrZ3JvdW5kQ29sb3IgfX07XCJcbiAgICAgICAgY2xhc3M9XCJidXR0b24gYnV0dG9uLWNvbnRhaW5lci16VkxINiB7eyBkaXNhYmxlZCB9fVwiXG4gICAgICAgID57eyBsYWJlbCB9fTwvZGl2PlxuICAgIDwvZGl2PlxuPC9kaXY+XG4iLCAiPGRpdiB0YWJpbmRleD1cIi0xXCIgY2xhc3M9XCJidXR0b24tY29udGFpbmVyLXhUOV9MIGJhY2stYnV0dG9uLWNvbnRhaW5lci1sREIxTiBidXR0b24tY29udGFpbmVyLXpWTEg2XCIgaWQ9XCJiYWNrLWJ0blwiPlxuICAgIDxzdmcgY2xhc3M9XCJpY29uLVQ4TVU2XCIgdmlld0JveD1cIjAgMCA1MTIgNTEyXCI+XG4gICAgICAgIDxwYXRoIGQ9XCJNMzI4LjYxMDAwMDAwMDAwMDYgMTA2LjQ2OWwtMTQzLjUzIDEzNi44ODkgMTQzLjUzIDEzNi44ODlcIiBzdHlsZT1cInN0cm9rZTogY3VycmVudGNvbG9yOyBzdHJva2UtbGluZWNhcDogcm91bmQ7IHN0cm9rZS1saW5lam9pbjogcm91bmQ7IHN0cm9rZS13aWR0aDogNDg7IGZpbGw6IG5vbmU7XCI+PC9wYXRoPlxuICAgIDwvc3ZnPlxuPC9kaXY+IiwgIjxuYXYgY2xhc3M9XCJ0aXRsZS1iYXJcIj5cbiAgICA8ZGl2IGNsYXNzPVwidGl0bGUtYmFyLWJ1dHRvbnNcIj5cbiAgICAgICAgPGRpdiBpZD1cIm1pbmltaXplQXBwLWJ0blwiIHRpdGxlPVwiTWluaW1pemVcIiBjbGFzcz1cImJ1dHRvblwiPlxuICAgICAgICAgICAgPHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+XG4gICAgICAgICAgICAgICAgPHBhdGggZD1cIk0yMCwxNEg0VjEwSDIwXCIgc3R5bGU9XCJmaWxsOndoaXRlO1wiPjwvcGF0aD5cbiAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBpZD1cIm1heGltaXplQXBwLWJ0blwiIHRpdGxlPVwiTWF4aW1pemVcIiBjbGFzcz1cImJ1dHRvblwiPlxuICAgICAgICAgICAgPHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+XG4gICAgICAgICAgICAgICAgPHBhdGggZD1cIk0zLDNIMjFWMjFIM1YzTTUsNVYxOUgxOVY1SDVaXCIgc3R5bGU9XCJmaWxsOndoaXRlO1wiPjwvcGF0aD5cbiAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBpZD1cImNsb3NlQXBwLWJ0blwiIHRpdGxlPVwiQ2xvc2VcIiBjbGFzcz1cImJ1dHRvblwiPlxuICAgICAgICAgICAgPHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgc3R5bGU9XCJ3aWR0aDogMjVweDsgaGVpZ2h0OiAyNXB4O1wiPlxuICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMTksNi40MUwxNy41OSw1TDEyLDEwLjU5TDYuNDEsNUw1LDYuNDFMMTAuNTksMTJMNSwxNy41OUw2LjQxLDE5TDEyLDEzLjQxTDE3LjU5LDE5TDE5LDE3LjU5TDEzLjQxLDEyTDE5LDYuNDFaXCIgc3R5bGU9XCJmaWxsOndoaXRlO1wiPjwvcGF0aD5cbiAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblxuICAgIDxzdHlsZT5cblx0XHRib2R5ID4gKjpub3QoLnRpdGxlLWJhcikge1xuXHRcdFx0cGFkZGluZy10b3A6IDQwcHg7IFxuXHRcdH1cblxuICAgICAgICAuYnV0dG9uIHtcbiAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIC50aXRsZS1iYXIge1xuICAgICAgICAgICAgcG9zaXRpb246IGZpeGVkOyBcbiAgICAgICAgICAgIHRvcDogMDtcbiAgICAgICAgICAgIGxlZnQ6IDA7XG4gICAgICAgICAgICByaWdodDogMDtcbiAgICAgICAgICAgIGhlaWdodDogNDBweDtcbiAgICAgICAgICAgIHotaW5kZXg6IDk5OTk7XG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiByZ2JhKDAsMCwwLDAuMTUpO1xuICAgICAgICAgICAgYmFja2Ryb3AtZmlsdGVyOiBibHVyKDIwcHgpIHNhdHVyYXRlKDEyMCUpO1xuXHRcdFx0LXdlYmtpdC1hcHAtcmVnaW9uOiBkcmFnO1xuICAgICAgICB9XG5cbiAgICAgICAgLnRpdGxlLWJhci1idXR0b25zIHtcbiAgICAgICAgICAgIC13ZWJraXQtYXBwLXJlZ2lvbjogbm8tZHJhZztcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgICAgZ2FwOiAyLjByZW07XG4gICAgICAgICAgICBtYXJnaW4tbGVmdDogYXV0bztcblx0XHRcdG1hcmdpbi1yaWdodDogMjBweDtcbiAgICAgICAgfVxuXG4gICAgICAgIC50aXRsZS1iYXItYnV0dG9ucyBzdmcge1xuICAgICAgICAgICAgd2lkdGg6IDIwcHg7XG4gICAgICAgICAgICBoZWlnaHQ6IDIwcHg7XG4gICAgICAgIH1cbiAgICA8L3N0eWxlPlxuPC9uYXY+XG4iLCAiaW1wb3J0IG1vZHNUYWIgZnJvbSAnLi4vY29tcG9uZW50cy9tb2RzLXRhYi9tb2RzLXRhYi5odG1sJztcbmltcG9ydCBtb2RzSXRlbSBmcm9tICcuLi9jb21wb25lbnRzL21vZHMtaXRlbS9tb2RzLWl0ZW0uaHRtbCc7XG5pbXBvcnQgYWJvdXRDYXRlZ29yeSBmcm9tICcuLi9jb21wb25lbnRzL2Fib3V0LWNhdGVnb3J5L2Fib3V0LWNhdGVnb3J5Lmh0bWwnO1xuaW1wb3J0IGRlZmF1bHRUaGVtZSBmcm9tICcuLi9jb21wb25lbnRzL2RlZmF1bHQtdGhlbWUvZGVmYXVsdC10aGVtZS5odG1sJztcbmltcG9ydCBiYWNrQnRuIGZyb20gJy4uL2NvbXBvbmVudHMvYmFjay1idG4vYmFjay1idG4uaHRtbCc7XG5pbXBvcnQgdGl0bGVCYXIgZnJvbSAnLi4vY29tcG9uZW50cy90aXRsZS1iYXIvdGl0bGUtYmFyLmh0bWwnO1xuXG5jb25zdCB0ZW1wbGF0ZXM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4gICAgJ21vZHMtdGFiJzogbW9kc1RhYixcbiAgICAnbW9kcy1pdGVtJzogbW9kc0l0ZW0sXG4gICAgJ2Fib3V0LWNhdGVnb3J5JzogYWJvdXRDYXRlZ29yeSxcbiAgICAnZGVmYXVsdC10aGVtZSc6IGRlZmF1bHRUaGVtZSxcbiAgICAnYmFjay1idG4nOiBiYWNrQnRuLFxuICAgICd0aXRsZS1iYXInOiB0aXRsZUJhcixcbn07XG5cbmNsYXNzIFRlbXBsYXRlQ2FjaGUge1xuICAgIHB1YmxpYyBzdGF0aWMgbG9hZChkaXI6IHN0cmluZywgbmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgLy8gV2UgaWdub3JlIGRpciBpbiBicm93c2VyIGJ1aWxkXG4gICAgICAgIHJldHVybiB0ZW1wbGF0ZXNbbmFtZV0gfHwgXCJcIjtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRlbXBsYXRlQ2FjaGU7XG4iLCAiaW1wb3J0IFRlbXBsYXRlQ2FjaGUgZnJvbSBcIi4uLy4uL3V0aWxzL3RlbXBsYXRlQ2FjaGVcIjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFRvYXN0VGVtcGxhdGUoaWQ6IHN0cmluZywgdGl0bGU6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nLCBzdGF0dXM6IFwic3VjY2Vzc1wiIHwgXCJmYWlsXCIgfCBcImluZm9cIik6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgY29uc3QgdGVtcGxhdGUgPSBUZW1wbGF0ZUNhY2hlLmxvYWQoX19kaXJuYW1lLCAndG9hc3QnKTtcbiAgICBsZXQgdG9hc3RTdGF0dXM7XG5cbiAgICBzd2l0Y2goc3RhdHVzKSB7XG4gICAgICAgIGNhc2UgXCJzdWNjZXNzXCI6XG4gICAgICAgICAgICB0b2FzdFN0YXR1cyA9IFwic3VjY2Vzcy1lSURUYVwiO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJmYWlsXCI6XG4gICAgICAgICAgICB0b2FzdFN0YXR1cyA9IFwiZXJyb3ItcXV5T2RcIjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiaW5mb1wiOlxuICAgICAgICAgICAgdG9hc3RTdGF0dXMgPSBcImluZm8tS0VXcThcIjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gdGVtcGxhdGVcbiAgICAgICAgLnJlcGxhY2UoXCJ7eyBpZCB9fVwiLCBpZClcbiAgICAgICAgLnJlcGxhY2UoXCJ7eyB0aXRsZSB9fVwiLCB0aXRsZSlcbiAgICAgICAgLnJlcGxhY2UoXCJ7eyBtZXNzYWdlIH19XCIsIG1lc3NhZ2UpXG4gICAgICAgIC5yZXBsYWNlKFwie3sgc3RhdHVzIH19XCIsIHRvYXN0U3RhdHVzKTtcbn1cbiIsICJpbXBvcnQgdHlwZSB7IEJyb3dzZXJXaW5kb3csIE1lc3NhZ2VCb3hPcHRpb25zIH0gZnJvbSBcImVsZWN0cm9uXCI7XG5pbXBvcnQgbG9nZ2VyIGZyb20gXCIuL2xvZ2dlclwiO1xuaW1wb3J0IHsgU0VMRUNUT1JTLCBUSU1FT1VUUyB9IGZyb20gXCIuLi9jb25zdGFudHNcIjtcbmltcG9ydCB7IGdldFRvYXN0VGVtcGxhdGUgfSBmcm9tIFwiLi4vY29tcG9uZW50cy90b2FzdC90b2FzdFwiO1xuXG5jbGFzcyBIZWxwZXJzIHtcbiAgICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogSGVscGVycztcbiAgICBwcml2YXRlIG1haW5XaW5kb3c6IEJyb3dzZXJXaW5kb3cgfCBudWxsID0gbnVsbDtcbiAgICBcbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge31cbiAgICBcbiAgICBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogSGVscGVycyB7XG4gICAgICAgIGlmICghSGVscGVycy5pbnN0YW5jZSkge1xuICAgICAgICAgICAgSGVscGVycy5pbnN0YW5jZSA9IG5ldyBIZWxwZXJzKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEhlbHBlcnMuaW5zdGFuY2U7XG4gICAgfVxuICAgIFxuICAgIHNldE1haW5XaW5kb3cobWFpbldpbmRvdzogQnJvd3NlcldpbmRvdyk6IHZvaWQge1xuICAgICAgICB0aGlzLm1haW5XaW5kb3cgPSBtYWluV2luZG93O1xuICAgIH1cbiAgICBcbiAgICBhc3luYyBzaG93QWxlcnQoXG4gICAgICAgIGFsZXJ0VHlwZTogJ2luZm8nIHwgJ3dhcm5pbmcnIHwgJ2Vycm9yJywgXG4gICAgICAgIHRpdGxlOiBzdHJpbmcsIFxuICAgICAgICBtZXNzYWdlOiBzdHJpbmcsIFxuICAgICAgICBidXR0b25zOiBzdHJpbmdbXVxuICAgICk6IFByb21pc2U8bnVtYmVyPiB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnM6IE1lc3NhZ2VCb3hPcHRpb25zID0ge1xuICAgICAgICAgICAgdHlwZTogYWxlcnRUeXBlLFxuICAgICAgICAgICAgdGl0bGUsXG4gICAgICAgICAgICBtZXNzYWdlLFxuICAgICAgICAgICAgYnV0dG9uc1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgICAgICAgIHR5cGVvZiAod2luZG93IGFzIHR5cGVvZiB3aW5kb3cgJiB7IENhcGFjaXRvcj86IHVua25vd24gfSkuQ2FwYWNpdG9yICE9PSBcInVuZGVmaW5lZFwiICYmXG4gICAgICAgICAgICB0eXBlb2Ygd2luZG93LmFsZXJ0ID09PSBcImZ1bmN0aW9uXCJcbiAgICAgICAgKSB7XG4gICAgICAgICAgICB3aW5kb3cuYWxlcnQoW3RpdGxlLCBtZXNzYWdlXS5maWx0ZXIoQm9vbGVhbikuam9pbihcIlxcblxcblwiKSk7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHsgZGlhbG9nIH0gPSBhd2FpdCBpbXBvcnQoXCJlbGVjdHJvblwiKTtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZGlhbG9nLnNob3dNZXNzYWdlQm94KHRoaXMubWFpbldpbmRvdyEsIG9wdGlvbnMpO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLnJlc3BvbnNlO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgbG9nZ2VyLmVycm9yKCdFcnJvciBkaXNwbGF5aW5nIGFsZXJ0OiAnICsgKGVycm9yIGFzIEVycm9yKS5tZXNzYWdlKTtcbiAgICAgICAgICAgIHJldHVybiAtMTsgXG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgd2FpdEZvckVsbShzZWxlY3Rvcjogc3RyaW5nLCB0aW1lb3V0OiBudW1iZXIgPSBUSU1FT1VUUy5FTEVNRU5UX1dBSVQpOiBQcm9taXNlPEVsZW1lbnQ+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGV4aXN0aW5nRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgICAgICAgICAgaWYgKGV4aXN0aW5nRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKGV4aXN0aW5nRWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIG9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQuYm9keSwge1xuICAgICAgICAgICAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBzdWJ0cmVlOiB0cnVlXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoYFRpbWVvdXQgd2FpdGluZyBmb3IgZWxlbWVudCB3aXRoIHNlbGVjdG9yOiAke3NlbGVjdG9yfWApKTtcbiAgICAgICAgICAgIH0sIHRpbWVvdXQpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB3YWl0Rm9yRWxtQnlYUGF0aCh4cGF0aDogc3RyaW5nLCB0aW1lb3V0OiBudW1iZXIgPSBUSU1FT1VUUy5FTEVNRU5UX1dBSVQpOiBQcm9taXNlPE5vZGU+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGV2YWx1YXRlWFBhdGggPSAoKTogTm9kZSB8IG51bGwgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGRvY3VtZW50LmV2YWx1YXRlKFxuICAgICAgICAgICAgICAgICAgICB4cGF0aCwgXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LCBcbiAgICAgICAgICAgICAgICAgICAgbnVsbCwgXG4gICAgICAgICAgICAgICAgICAgIFhQYXRoUmVzdWx0LkZJUlNUX09SREVSRURfTk9ERV9UWVBFLCBcbiAgICAgICAgICAgICAgICAgICAgbnVsbFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5zaW5nbGVOb2RlVmFsdWU7XG4gICAgICAgICAgICB9O1xuICAgIFxuICAgICAgICAgICAgY29uc3QgZXhpc3RpbmdFbGVtZW50ID0gZXZhbHVhdGVYUGF0aCgpO1xuICAgICAgICAgICAgaWYgKGV4aXN0aW5nRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKGV4aXN0aW5nRWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBldmFsdWF0ZVhQYXRoKCk7XG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIFxuICAgICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5ib2R5LCB7XG4gICAgICAgICAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgICAgICAgICAgIHN1YnRyZWU6IHRydWVcbiAgICAgICAgICAgIH0pO1xuICAgIFxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoYFRpbWVvdXQgd2FpdGluZyBmb3IgZWxlbWVudCB3aXRoIFhQYXRoOiAke3hwYXRofWApKTtcbiAgICAgICAgICAgIH0sIHRpbWVvdXQpO1xuICAgICAgICB9KTtcbiAgICB9ICAgIFxuXG4gICAgd2FpdEZvclRpdGxlQ2hhbmdlKHRpbWVvdXQ6IG51bWJlciA9IFRJTUVPVVRTLkVMRU1FTlRfV0FJVCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBoZWFkRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWQnKTtcbiAgICAgICAgICAgIGlmICghaGVhZEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KG5ldyBFcnJvcignSGVhZCBlbGVtZW50IG5vdCBmb3VuZCcpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoZG9jdW1lbnQudGl0bGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIG9ic2VydmVyLm9ic2VydmUoaGVhZEVsZW1lbnQsIHtcbiAgICAgICAgICAgICAgICBzdWJ0cmVlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcignVGltZW91dCB3YWl0aW5nIGZvciBkb2N1bWVudC50aXRsZSB0byBjaGFuZ2UnKSk7XG4gICAgICAgICAgICB9LCB0aW1lb3V0KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIGNyZWF0ZVRvYXN0KHRvYXN0SWQ6IHN0cmluZywgdGl0bGU6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nLCBzdGF0dXM6IFwic3VjY2Vzc1wiIHwgXCJmYWlsXCIgfCBcImluZm9cIiwgdGltZW91dE1zOm51bWJlciA9IDMwMDApIHtcbiAgICAgICAgY29uc3QgdGVtcGxhdGUgPSBhd2FpdCBnZXRUb2FzdFRlbXBsYXRlKHRvYXN0SWQsIHRpdGxlLCBtZXNzYWdlLCBzdGF0dXMpO1xuICAgICAgICBjb25zdCB0b2FzdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoU0VMRUNUT1JTLlRPQVNUX0NPTlRBSU5FUik7XG4gICAgICAgIGlmKHRvYXN0Q29udGFpbmVyKSB7XG4gICAgICAgICAgICB0b2FzdENvbnRhaW5lci5pbm5lckhUTUwgKz0gdGVtcGxhdGU7XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRvYXN0SWQpPy5yZW1vdmUoKTtcbiAgICAgICAgICAgIH0sIHRpbWVvdXRNcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFeGVjdXRlIEphdmFTY3JpcHQgaW4gdGhlIGNvbnRleHQgb2YgU3RyZW1pbydzIGNvcmUgc2VydmljZXNcbiAgICAgKiBAcGFyYW0ganMgLSBKYXZhU2NyaXB0IGNvZGUgdG8gZXhlY3V0ZVxuICAgICAqIEByZXR1cm5zIFByb21pc2Ugd2l0aCB0aGUgcmVzdWx0IG9mIHRoZSBleGVjdXRpb25cbiAgICAgKi9cbiAgICBwdWJsaWMgX2V2YWwoanM6IHN0cmluZyk6IFByb21pc2U8dW5rbm93bj4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCBldmVudE5hbWUgPSAnc3RyZW1pby1lbmhhbmNlZCc7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgY29uc3QgaGFuZGxlciA9IChkYXRhOiBFdmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzY3JpcHQucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKGRhdGEgYXMgQ3VzdG9tRXZlbnQpLmRldGFpbCk7XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgaGFuZGxlciwgeyBvbmNlOiB0cnVlIH0pO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHNjcmlwdC5pZCA9IGV2ZW50TmFtZTtcbiAgICAgICAgICAgICAgICBzY3JpcHQuYXBwZW5kQ2hpbGQoXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGBcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb3JlID0gd2luZG93LnNlcnZpY2VzLmNvcmU7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gJHtqc307XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC50aGVuKChhd2FpdGVkUmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChcIiR7ZXZlbnROYW1lfVwiLCB7IGRldGFpbDogYXdhaXRlZFJlc3VsdCB9KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChcIiR7ZXZlbnROYW1lfVwiLCB7IGRldGFpbDogcmVzdWx0IH0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYCksXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRFbGVtZW50QnlYcGF0aChwYXRoOiBzdHJpbmcpOiBOb2RlIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiBkb2N1bWVudC5ldmFsdWF0ZShcbiAgICAgICAgICAgIHBhdGgsIFxuICAgICAgICAgICAgZG9jdW1lbnQsIFxuICAgICAgICAgICAgbnVsbCwgXG4gICAgICAgICAgICBYUGF0aFJlc3VsdC5GSVJTVF9PUkRFUkVEX05PREVfVFlQRSwgXG4gICAgICAgICAgICBudWxsXG4gICAgICAgICkuc2luZ2xlTm9kZVZhbHVlO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRGaWxlTmFtZUZyb21VcmwodXJsOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBwYXJ0cyA9IHVybC5zcGxpdCgnLycpO1xuICAgICAgICByZXR1cm4gcGFydHNbcGFydHMubGVuZ3RoIC0gMV0gfHwgJyc7XG4gICAgfVxuXG4gICAgcHVibGljIGZvcm1hdFRpbWUoc2Vjb25kczogbnVtYmVyKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgaG91cnMgPSBNYXRoLmZsb29yKHNlY29uZHMgLyAzNjAwKTtcbiAgICAgICAgY29uc3QgbWludXRlcyA9IE1hdGguZmxvb3IoKHNlY29uZHMgJSAzNjAwKSAvIDYwKTtcbiAgICAgICAgY29uc3QgcmVtYWluaW5nU2Vjb25kcyA9IE1hdGguZmxvb3Ioc2Vjb25kcyAlIDYwKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBgJHtTdHJpbmcoaG91cnMpLnBhZFN0YXJ0KDIsICcwJyl9OiR7U3RyaW5nKG1pbnV0ZXMpLnBhZFN0YXJ0KDIsICcwJyl9OiR7U3RyaW5nKHJlbWFpbmluZ1NlY29uZHMpLnBhZFN0YXJ0KDIsICcwJyl9YDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb21wYXJlIHR3byBzZW1hbnRpYyB2ZXJzaW9uIHN0cmluZ3NcbiAgICAgKiBAcmV0dXJucyB0cnVlIGlmIHZlcnNpb24xID4gdmVyc2lvbjJcbiAgICAgKi9cbiAgICBwdWJsaWMgaXNOZXdlclZlcnNpb24odmVyc2lvbjE6IHN0cmluZywgdmVyc2lvbjI6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICBjb25zdCBub3JtYWxpemUgPSAodjogc3RyaW5nKTogbnVtYmVyW10gPT4gXG4gICAgICAgICAgICB2LnJlcGxhY2UoL152LywgJycpLnNwbGl0KCcuJykubWFwKG4gPT4gcGFyc2VJbnQobiwgMTApIHx8IDApO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgdjFQYXJ0cyA9IG5vcm1hbGl6ZSh2ZXJzaW9uMSk7XG4gICAgICAgIGNvbnN0IHYyUGFydHMgPSBub3JtYWxpemUodmVyc2lvbjIpO1xuICAgICAgICBjb25zdCBtYXhMZW5ndGggPSBNYXRoLm1heCh2MVBhcnRzLmxlbmd0aCwgdjJQYXJ0cy5sZW5ndGgpO1xuICAgICAgICBcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXhMZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgdjEgPSB2MVBhcnRzW2ldID8/IDA7XG4gICAgICAgICAgICBjb25zdCB2MiA9IHYyUGFydHNbaV0gPz8gMDtcbiAgICAgICAgICAgIGlmICh2MSA+IHYyKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIGlmICh2MSA8IHYyKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cblxuY29uc3QgaGVscGVyc0luc3RhbmNlID0gSGVscGVycy5nZXRJbnN0YW5jZSgpO1xuXG5leHBvcnQgZGVmYXVsdCBoZWxwZXJzSW5zdGFuY2U7XG4iLCAiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZXNjYXBlSHRtbCh2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdmFsdWUucmVwbGFjZSgvWyY8PlwiJ10vZywgY2hhcmFjdGVyID0+ICh7XG4gICAgICAgIFwiJlwiOiBcIiZhbXA7XCIsXG4gICAgICAgIFwiPFwiOiBcIiZsdDtcIixcbiAgICAgICAgXCI+XCI6IFwiJmd0O1wiLFxuICAgICAgICAnXCInOiBcIiZxdW90O1wiLFxuICAgICAgICBcIidcIjogXCImIzAzOTtcIixcbiAgICB9KVtjaGFyYWN0ZXJdID8/IGNoYXJhY3Rlcik7XG59XG4iLCAiaW1wb3J0IFRlbXBsYXRlQ2FjaGUgZnJvbSAnLi4vLi4vdXRpbHMvdGVtcGxhdGVDYWNoZSc7XG5pbXBvcnQgeyBNZXRhRGF0YSB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvTWV0YURhdGEnO1xuaW1wb3J0IGVzY2FwZUh0bWwgZnJvbSAnLi4vLi4vdXRpbHMvZXNjYXBlSHRtbCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQbHVnaW5JdGVtVGVtcGxhdGUoXG4gICAgZmlsZW5hbWU6IHN0cmluZywgXG4gICAgbWV0YURhdGE6IE1ldGFEYXRhLFxuICAgIGNoZWNrZWQ6IGJvb2xlYW5cbik6IHN0cmluZyB7XG4gICAgbGV0IHRlbXBsYXRlID0gVGVtcGxhdGVDYWNoZS5sb2FkKF9fZGlybmFtZSwgJ3BsdWdpbi1pdGVtJyk7XG4gICAgXG4gICAgLy8gUmVwbGFjZSBtZXRhZGF0YSBwbGFjZWhvbGRlcnNcbiAgICBjb25zdCBtZXRhS2V5cyA9IFsnbmFtZScsICdkZXNjcmlwdGlvbicsICdhdXRob3InLCAndmVyc2lvbiddIGFzIGNvbnN0O1xuICAgIG1ldGFLZXlzLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgY29uc3QgcmVnZXggPSBuZXcgUmVnRXhwKGB7e1xcXFxzKiR7a2V5fVxcXFxzKn19YCwgJ2cnKTtcbiAgICAgICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZS5yZXBsYWNlKHJlZ2V4LCBlc2NhcGVIdG1sKG1ldGFEYXRhW2tleV0gfHwgJycpKTtcbiAgICB9KTtcblxuICAgIHJldHVybiB0ZW1wbGF0ZVxuICAgICAgICAucmVwbGFjZShcInt7IGNoZWNrZWQgfX1cIiwgY2hlY2tlZCA/IFwiY2hlY2tlZFwiIDogXCJcIilcbiAgICAgICAgLnJlcGxhY2UoL1xce1xce1xccypmaWxlTmFtZVxccypcXH1cXH0vZywgZXNjYXBlSHRtbChmaWxlbmFtZSkpO1xufVxuIiwgImltcG9ydCBUZW1wbGF0ZUNhY2hlIGZyb20gJy4uLy4uL3V0aWxzL3RlbXBsYXRlQ2FjaGUnO1xuaW1wb3J0IHsgTWV0YURhdGEgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL01ldGFEYXRhJztcbmltcG9ydCBlc2NhcGVIdG1sIGZyb20gJy4uLy4uL3V0aWxzL2VzY2FwZUh0bWwnO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VGhlbWVJdGVtVGVtcGxhdGUoXG4gICAgZmlsZW5hbWU6IHN0cmluZywgXG4gICAgbWV0YURhdGE6IE1ldGFEYXRhLFxuICAgIGFwcGxpZWQ6IGJvb2xlYW5cbik6IHN0cmluZyB7XG4gICAgbGV0IHRlbXBsYXRlID0gVGVtcGxhdGVDYWNoZS5sb2FkKF9fZGlybmFtZSwgJ3RoZW1lLWl0ZW0nKTtcbiAgICBcbiAgICAvLyBSZXBsYWNlIG1ldGFkYXRhIHBsYWNlaG9sZGVyc1xuICAgIGNvbnN0IG1ldGFLZXlzID0gWyduYW1lJywgJ2Rlc2NyaXB0aW9uJywgJ2F1dGhvcicsICd2ZXJzaW9uJ10gYXMgY29uc3Q7XG4gICAgbWV0YUtleXMuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBjb25zdCByZWdleCA9IG5ldyBSZWdFeHAoYHt7XFxcXHMqJHtrZXl9XFxcXHMqfX1gLCAnZycpO1xuICAgICAgICB0ZW1wbGF0ZSA9IHRlbXBsYXRlLnJlcGxhY2UocmVnZXgsIGVzY2FwZUh0bWwobWV0YURhdGFba2V5XSB8fCAnJykpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRlbXBsYXRlXG4gICAgICAgIC5yZXBsYWNlKFwie3sgZGlzYWJsZWQgfX1cIiwgYXBwbGllZCA/IFwiZGlzYWJsZWRcIiA6IFwiXCIpXG4gICAgICAgIC5yZXBsYWNlKC9cXHtcXHtcXHMqZmlsZU5hbWVcXHMqXFx9XFx9L2csIGVzY2FwZUh0bWwoZmlsZW5hbWUpKVxuICAgICAgICAucmVwbGFjZShcInt7IGxhYmVsIH19XCIsIGFwcGxpZWQgPyBcIkFwcGxpZWRcIiA6IFwiQXBwbHlcIilcbiAgICAgICAgLnJlcGxhY2UoXCJ7eyBidXR0b25DbGFzcyB9fVwiLCBhcHBsaWVkID8gXCJ1bmluc3RhbGwtYnV0dG9uLWNvbnRhaW5lci1vVjRZb1wiIDogXCJpbnN0YWxsLWJ1dHRvbi1jb250YWluZXIteWZjcTVcIik7XG59XG4iLCAiaW1wb3J0IFRlbXBsYXRlQ2FjaGUgZnJvbSAnLi4vLi4vdXRpbHMvdGVtcGxhdGVDYWNoZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRFbmhhbmNlZE5hdigpOiBzdHJpbmcge1xuICAgIHJldHVybiBUZW1wbGF0ZUNhY2hlLmxvYWQoX19kaXJuYW1lLCAnZW5oYW5jZWQtbmF2Jyk7XG59XG4iLCAiaW1wb3J0IHsgUGxhdGZvcm1NYW5hZ2VyIH0gZnJvbSBcIi4uL3BsYXRmb3JtL1BsYXRmb3JtTWFuYWdlclwiO1xuXG5jbGFzcyBQcm9wZXJ0aWVzIHtcbiAgICBwdWJsaWMgc3RhdGljIHRoZW1lTGlua1NlbGVjdG9yOiBzdHJpbmcgPSBcImhlYWQgPiBsaW5rW3JlbD1zdHlsZXNoZWV0XVwiO1xuXG4gICAgcHVibGljIHN0YXRpYyBnZXQgZW5oYW5jZWRQYXRoKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC5nZXRFbmhhbmNlZFBhdGgoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldCB0aGVtZXNQYXRoKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC5nZXRUaGVtZXNQYXRoKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXQgcGx1Z2luc1BhdGgoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIFBsYXRmb3JtTWFuYWdlci5jdXJyZW50LmdldFBsdWdpbnNQYXRoKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBpc1VzaW5nU3RyZW1pb1NlcnZpY2UgPSBmYWxzZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgUHJvcGVydGllcztcbiIsICJleHBvcnQgZnVuY3Rpb24gZ2V0QXBwbHlUaGVtZVRlbXBsYXRlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGBcbiAgICBhc3luYyBmdW5jdGlvbiBhcHBseVRoZW1lKHRoZW1lKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiYXBwbHlpbmcgXCIgKyB0aGVtZSk7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRUaGVtZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiY3VycmVudFRoZW1lXCIpO1xuXG4gICAgICAgIGlmICghd2luZG93LnN0cmVtaW9FbmhhbmNlZD8uYXBwbHlUaGVtZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlN0cmVtaW8gRW5oYW5jZWQgdGhlbWUgYnJpZGdlIGlzIHVuYXZhaWxhYmxlXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgYXBwbGllZCA9IGF3YWl0IHdpbmRvdy5zdHJlbWlvRW5oYW5jZWQuYXBwbHlUaGVtZSh0aGVtZSk7XG4gICAgICAgIGlmICghYXBwbGllZCkgcmV0dXJuO1xuXG4gICAgICAgIGlmIChjdXJyZW50VGhlbWUpIHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRUaGVtZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjdXJyZW50VGhlbWUpO1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRUaGVtZUVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50VGhlbWVFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJkaXNhYmxlZFwiKTtcblxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50VGhlbWUgIT09IFwiRGVmYXVsdFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRUaGVtZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcInVuaW5zdGFsbC1idXR0b24tY29udGFpbmVyLW9WNFlvXCIpO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50VGhlbWVFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJpbnN0YWxsLWJ1dHRvbi1jb250YWluZXIteWZjcTVcIik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFRoZW1lRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInZhcigtLXNlY29uZGFyeS1hY2NlbnQtY29sb3IpXCI7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY3VycmVudFRoZW1lRWxlbWVudC5pbm5lclRleHQgPSBcIkFwcGx5XCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImN1cnJlbnRUaGVtZVwiLCB0aGVtZSk7XG5cbiAgICAgICAgY29uc3QgbmV3VGhlbWVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhlbWUpO1xuICAgICAgICBpZiAobmV3VGhlbWVFbGVtZW50KSB7XG4gICAgICAgICAgICBuZXdUaGVtZUVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImRpc2FibGVkXCIpO1xuXG4gICAgICAgICAgICBpZiAodGhlbWUgIT09IFwiRGVmYXVsdFwiKSB7XG4gICAgICAgICAgICAgICAgbmV3VGhlbWVFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJpbnN0YWxsLWJ1dHRvbi1jb250YWluZXIteWZjcTVcIik7XG4gICAgICAgICAgICAgICAgbmV3VGhlbWVFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJ1bmluc3RhbGwtYnV0dG9uLWNvbnRhaW5lci1vVjRZb1wiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbmV3VGhlbWVFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwidmFyKC0tb3ZlcmxheS1jb2xvcilcIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbmV3VGhlbWVFbGVtZW50LmlubmVyVGV4dCA9IFwiQXBwbGllZFwiO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuZGF0YXNldC5zdHJlbWlvRW5oYW5jZWRUaGVtZUNsaWNrQm91bmQpIHtcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmRhdGFzZXQuc3RyZW1pb0VuaGFuY2VkVGhlbWVDbGlja0JvdW5kID0gXCJ0cnVlXCI7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldCBpbnN0YW5jZW9mIEVsZW1lbnRcbiAgICAgICAgICAgICAgICA/IGV2ZW50LnRhcmdldC5jbG9zZXN0KFwiW2RhdGEtc3RyZW1pby1lbmhhbmNlZC1hcHBseS10aGVtZV1cIilcbiAgICAgICAgICAgICAgICA6IG51bGw7XG4gICAgICAgICAgICBjb25zdCB0aGVtZSA9IHRhcmdldD8uZ2V0QXR0cmlidXRlKFwiZGF0YS1zdHJlbWlvLWVuaGFuY2VkLWFwcGx5LXRoZW1lXCIpO1xuICAgICAgICAgICAgaWYgKHRoZW1lKSB2b2lkIGFwcGx5VGhlbWUodGhlbWUpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgYDtcbn1cbiIsICJpbXBvcnQgU2V0dGluZ3MgZnJvbSBcIi4vU2V0dGluZ3NcIjtcbmltcG9ydCB7IFBsYXRmb3JtTWFuYWdlciB9IGZyb20gXCIuLi9wbGF0Zm9ybS9QbGF0Zm9ybU1hbmFnZXJcIjtcbmltcG9ydCBwcm9wZXJ0aWVzIGZyb20gXCIuL1Byb3BlcnRpZXNcIjtcbmltcG9ydCBoZWxwZXJzIGZyb20gXCIuLi91dGlscy9IZWxwZXJzXCI7XG5pbXBvcnQgeyBNZXRhRGF0YSB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL01ldGFEYXRhXCI7XG5pbXBvcnQgeyBnZXRMb2dnZXIgfSBmcm9tIFwiLi4vdXRpbHMvbG9nZ2VyXCI7XG5pbXBvcnQgeyBnZXRBcHBseVRoZW1lVGVtcGxhdGUgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9hcHBseS10aGVtZS9hcHBseVRoZW1lXCI7XG5pbXBvcnQgeyBiYXNlbmFtZSwgam9pbiB9IGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyBTVE9SQUdFX0tFWVMsIENMQVNTRVMsIFVSTFMsIEZJTEVfRVhURU5TSU9OUyB9IGZyb20gXCIuLi9jb25zdGFudHNcIjtcbmltcG9ydCBFeHRyYWN0TWV0YURhdGEgZnJvbSBcIi4uL3V0aWxzL0V4dHJhY3RNZXRhRGF0YVwiO1xuaW1wb3J0IFBsdWdpbk9wdGlvbnMgZnJvbSBcIi4vUGx1Z2luT3B0aW9uc1wiO1xuaW1wb3J0IHJlbG9hZEFwcGxpY2F0aW9uIGZyb20gXCIuLi91dGlscy9yZWxvYWRBcHBsaWNhdGlvblwiO1xuaW1wb3J0IHsgaXNTYWZlTW9kRmlsZU5hbWUgfSBmcm9tIFwiLi4vdXRpbHMvbW9kRmlsZU5hbWVcIjtcblxuY2xhc3MgTW9kTWFuYWdlciB7XG4gICAgcHJpdmF0ZSBzdGF0aWMgbG9nZ2VyID0gZ2V0TG9nZ2VyKFwiTW9kTWFuYWdlclwiKTtcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBBUFBMWV9USEVNRV9TQ1JJUFRfSUQgPSBcInN0cmVtaW8tZW5oYW5jZWQtYXBwbHktdGhlbWUtc2NyaXB0XCI7XG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgTUFYX01PRF9ET1dOTE9BRF9CWVRFUyA9IDUgKiAxMDI0ICogMTAyNDtcbiAgICBwcml2YXRlIHN0YXRpYyBzY3JvbGxMaXN0ZW5lclJlYWR5ID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBzdGF0aWMgc2Nyb2xsTGlzdGVuZXJTZXR1cFBlbmRpbmcgPSBmYWxzZTtcblxuICAgIHByaXZhdGUgc3RhdGljIGdldEVuYWJsZWRQbHVnaW5zKCk6IHN0cmluZ1tdIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHN0b3JlZFZhbHVlOiB1bmtub3duID0gSlNPTi5wYXJzZShcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShTVE9SQUdFX0tFWVMuRU5BQkxFRF9QTFVHSU5TKSB8fCBcIltdXCJcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXR1cm4gQXJyYXkuaXNBcnJheShzdG9yZWRWYWx1ZSlcbiAgICAgICAgICAgICAgICA/IHN0b3JlZFZhbHVlLmZpbHRlcigodmFsdWUpOiB2YWx1ZSBpcyBzdHJpbmcgPT4gdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKVxuICAgICAgICAgICAgICAgIDogW107XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci53YXJuKGBGYWlsZWQgdG8gcGFyc2UgZW5hYmxlZCBwbHVnaW5zOiAke2Vycm9yfWApO1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgZGVjb2RlRmlsZU5hbWUoZmlsZU5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KGZpbGVOYW1lKTtcbiAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgICByZXR1cm4gZmlsZU5hbWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBzYW5pdGl6ZU1vZEZpbGVOYW1lKFxuICAgICAgICBmaWxlTmFtZTogc3RyaW5nLFxuICAgICAgICB0eXBlOiBcInBsdWdpblwiIHwgXCJ0aGVtZVwiXG4gICAgKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSB0aGlzLmRlY29kZUZpbGVOYW1lKGJhc2VuYW1lKGZpbGVOYW1lKS50cmltKCkpO1xuICAgICAgICByZXR1cm4gaXNTYWZlTW9kRmlsZU5hbWUobm9ybWFsaXplZCwgdHlwZSkgPyBub3JtYWxpemVkIDogbnVsbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBpc1N1cHBvcnRlZFJlbW90ZVVybChyYXdVcmw6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgdXJsID0gbmV3IFVSTChyYXdVcmwpO1xuICAgICAgICAgICAgcmV0dXJuIHVybC5wcm90b2NvbCA9PT0gXCJodHRwczpcIjtcbiAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBhc3NlcnRTZWN1cmVSZXNwb25zZVVybChyZXNwb25zZTogUmVzcG9uc2UsIGZhbGxiYWNrVXJsOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZmluYWxVcmwgPSBuZXcgVVJMKHJlc3BvbnNlLnVybCB8fCBmYWxsYmFja1VybCk7XG4gICAgICAgIGlmIChmaW5hbFVybC5wcm90b2NvbCAhPT0gXCJodHRwczpcIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBSZWZ1c2VkIGluc2VjdXJlIHJlZGlyZWN0IHRvICR7ZmluYWxVcmwucHJvdG9jb2x9YCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBhc3luYyByZWFkTGltaXRlZE1vZENvbnRlbnQocmVzcG9uc2U6IFJlc3BvbnNlKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgY29uc3QgY29udGVudExlbmd0aCA9IE51bWJlcihyZXNwb25zZS5oZWFkZXJzLmdldChcImNvbnRlbnQtbGVuZ3RoXCIpKTtcbiAgICAgICAgaWYgKE51bWJlci5pc0Zpbml0ZShjb250ZW50TGVuZ3RoKSAmJiBjb250ZW50TGVuZ3RoID4gdGhpcy5NQVhfTU9EX0RPV05MT0FEX0JZVEVTKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNb2QgZG93bmxvYWQgZXhjZWVkcyB0aGUgNSBNaUIgc2l6ZSBsaW1pdFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghcmVzcG9uc2UuYm9keSkge1xuICAgICAgICAgICAgY29uc3QgY29udGVudCA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcbiAgICAgICAgICAgIGlmIChuZXcgVGV4dEVuY29kZXIoKS5lbmNvZGUoY29udGVudCkuYnl0ZUxlbmd0aCA+IHRoaXMuTUFYX01PRF9ET1dOTE9BRF9CWVRFUykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk1vZCBkb3dubG9hZCBleGNlZWRzIHRoZSA1IE1pQiBzaXplIGxpbWl0XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByZWFkZXIgPSByZXNwb25zZS5ib2R5LmdldFJlYWRlcigpO1xuICAgICAgICBjb25zdCBkZWNvZGVyID0gbmV3IFRleHREZWNvZGVyKCk7XG4gICAgICAgIGxldCBieXRlc1JlYWQgPSAwO1xuICAgICAgICBsZXQgY29udGVudCA9IFwiXCI7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgZG9uZSwgdmFsdWUgfSA9IGF3YWl0IHJlYWRlci5yZWFkKCk7XG4gICAgICAgICAgICAgICAgaWYgKGRvbmUpIGJyZWFrO1xuICAgICAgICAgICAgICAgIGJ5dGVzUmVhZCArPSB2YWx1ZS5ieXRlTGVuZ3RoO1xuICAgICAgICAgICAgICAgIGlmIChieXRlc1JlYWQgPiB0aGlzLk1BWF9NT0RfRE9XTkxPQURfQllURVMpIHtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgcmVhZGVyLmNhbmNlbCgpO1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNb2QgZG93bmxvYWQgZXhjZWVkcyB0aGUgNSBNaUIgc2l6ZSBsaW1pdFwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29udGVudCArPSBkZWNvZGVyLmRlY29kZSh2YWx1ZSwgeyBzdHJlYW06IHRydWUgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY29udGVudCArIGRlY29kZXIuZGVjb2RlKCk7XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICByZWFkZXIucmVsZWFzZUxvY2soKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICAvKipcbiAgICAgKiBMb2FkIGFuZCBlbmFibGUgYSBwbHVnaW4gYnkgZmlsZW5hbWVcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGFzeW5jIGxvYWRQbHVnaW4ocGx1Z2luTmFtZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGlmICghaXNTYWZlTW9kRmlsZU5hbWUocGx1Z2luTmFtZSwgXCJwbHVnaW5cIikpIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLndhcm4oYFJlZnVzZWQgdG8gbG9hZCBwbHVnaW4gd2l0aCB1bnNhZmUgZmlsZW5hbWU6ICR7cGx1Z2luTmFtZX1gKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocGx1Z2luTmFtZSkpIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLmluZm8oYFBsdWdpbiAke3BsdWdpbk5hbWV9IGlzIGFscmVhZHkgbG9hZGVkYCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwbHVnaW5QYXRoID0gam9pbihwcm9wZXJ0aWVzLnBsdWdpbnNQYXRoLCBwbHVnaW5OYW1lKTtcbiAgICAgICAgXG4gICAgICAgIGlmICghYXdhaXQgUGxhdGZvcm1NYW5hZ2VyLmN1cnJlbnQuZXhpc3RzKHBsdWdpblBhdGgpKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcihgUGx1Z2luIGZpbGUgbm90IGZvdW5kOiAke3BsdWdpblBhdGh9YCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcGx1Z2luOiBzdHJpbmc7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBwbHVnaW4gPSBhd2FpdCBQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC5yZWFkRmlsZShwbHVnaW5QYXRoKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLmVycm9yKGBGYWlsZWQgdG8gcmVhZCBwbHVnaW4gJHtwbHVnaW5OYW1lfTogJHtlcnJvcn1gKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG1ldGFEYXRhID0gRXh0cmFjdE1ldGFEYXRhLmV4dHJhY3RNZXRhZGF0YUZyb21UZXh0KHBsdWdpbik7XG4gICAgICAgIFBsdWdpbk9wdGlvbnMucmVnaXN0ZXIocGx1Z2luTmFtZSwgbWV0YURhdGE/Lm9wdGlvbnMgPz8gW10pO1xuXG4gICAgICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gICAgICAgIHNjcmlwdC50ZXh0Q29udGVudCA9IHBsdWdpbjtcbiAgICAgICAgc2NyaXB0LmlkID0gcGx1Z2luTmFtZTtcbiAgICAgICAgc2NyaXB0LmRhdGFzZXQuc3RyZW1pb0VuaGFuY2VkUGx1Z2luID0gcGx1Z2luTmFtZTtcbiAgICAgICAgXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGVuYWJsZWRQbHVnaW5zID0gdGhpcy5nZXRFbmFibGVkUGx1Z2lucygpO1xuICAgICAgICBcbiAgICAgICAgaWYgKCFlbmFibGVkUGx1Z2lucy5pbmNsdWRlcyhwbHVnaW5OYW1lKSkge1xuICAgICAgICAgICAgZW5hYmxlZFBsdWdpbnMucHVzaChwbHVnaW5OYW1lKTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFNUT1JBR0VfS0VZUy5FTkFCTEVEX1BMVUdJTlMsIEpTT04uc3RyaW5naWZ5KGVuYWJsZWRQbHVnaW5zKSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMubG9nZ2VyLmluZm8oYFBsdWdpbiAke3BsdWdpbk5hbWV9IGxvYWRlZCFgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb2FkIHRoZSBpbnN0YWxsZWQgcGx1Z2lucyB0aGF0IHRoZSB1c2VyIHByZXZpb3VzbHkgZW5hYmxlZC5cbiAgICAgKiBEaXNjb3ZlcnkgYW5kIGluZGl2aWR1YWwgcGx1Z2luIGZhaWx1cmVzIGFyZSBpc29sYXRlZCBzbyBvbmUgYnJva2VuIGZpbGVcbiAgICAgKiBjYW5ub3QgcHJldmVudCB0aGUgcmVtYWluaW5nIGVuYWJsZWQgcGx1Z2lucyBmcm9tIHN0YXJ0aW5nLlxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgYXN5bmMgbG9hZEVuYWJsZWRQbHVnaW5zKCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBjb25zdCBlbmFibGVkUGx1Z2lucyA9IG5ldyBTZXQodGhpcy5nZXRFbmFibGVkUGx1Z2lucygpKTtcbiAgICAgICAgbGV0IGluc3RhbGxlZFBsdWdpbnM6IHN0cmluZ1tdO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBwbHVnaW5zUGF0aCA9IHByb3BlcnRpZXMucGx1Z2luc1BhdGg7XG4gICAgICAgICAgICBpZiAoIWF3YWl0IFBsYXRmb3JtTWFuYWdlci5jdXJyZW50LmV4aXN0cyhwbHVnaW5zUGF0aCkpIHJldHVybjtcblxuICAgICAgICAgICAgaW5zdGFsbGVkUGx1Z2lucyA9IChhd2FpdCBQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC5yZWFkZGlyKHBsdWdpbnNQYXRoKSlcbiAgICAgICAgICAgICAgICAuZmlsdGVyKGZpbGVOYW1lID0+IGlzU2FmZU1vZEZpbGVOYW1lKGZpbGVOYW1lLCBcInBsdWdpblwiKSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcihgRmFpbGVkIHRvIGRpc2NvdmVyIGVuYWJsZWQgcGx1Z2luczogJHtlcnJvcn1gKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoY29uc3QgcGx1Z2luTmFtZSBvZiBpbnN0YWxsZWRQbHVnaW5zKSB7XG4gICAgICAgICAgICBpZiAoIWVuYWJsZWRQbHVnaW5zLmhhcyhwbHVnaW5OYW1lKSkgY29udGludWU7XG5cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5sb2FkUGx1Z2luKHBsdWdpbk5hbWUpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcihgRmFpbGVkIHRvIGxvYWQgZW5hYmxlZCBwbHVnaW4gJHtwbHVnaW5OYW1lfTogJHtlcnJvcn1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICAvKipcbiAgICAgKiBVbmxvYWQgYW5kIGRpc2FibGUgYSBwbHVnaW4gYnkgZmlsZW5hbWVcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHVubG9hZFBsdWdpbihwbHVnaW5OYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgaWYgKCFpc1NhZmVNb2RGaWxlTmFtZShwbHVnaW5OYW1lLCBcInBsdWdpblwiKSkge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIud2FybihgUmVmdXNlZCB0byB1bmxvYWQgcGx1Z2luIHdpdGggdW5zYWZlIGZpbGVuYW1lOiAke3BsdWdpbk5hbWV9YCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcGx1Z2luRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBsdWdpbk5hbWUpO1xuICAgICAgICBpZiAocGx1Z2luRWxlbWVudCkge1xuICAgICAgICAgICAgcGx1Z2luRWxlbWVudC5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IGVuYWJsZWRQbHVnaW5zID0gdGhpcy5nZXRFbmFibGVkUGx1Z2lucygpO1xuICAgICAgICBlbmFibGVkUGx1Z2lucyA9IGVuYWJsZWRQbHVnaW5zLmZpbHRlcigoeDogc3RyaW5nKSA9PiB4ICE9PSBwbHVnaW5OYW1lKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oU1RPUkFHRV9LRVlTLkVOQUJMRURfUExVR0lOUywgSlNPTi5zdHJpbmdpZnkoZW5hYmxlZFBsdWdpbnMpKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMubG9nZ2VyLmluZm8oYFBsdWdpbiAke3BsdWdpbk5hbWV9IHVubG9hZGVkIWApO1xuICAgICAgICByZWxvYWRBcHBsaWNhdGlvbigpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgYmluZFBsdWdpblRvZ2dsZShcbiAgICAgICAgdG9nZ2xlOiBIVE1MRWxlbWVudCxcbiAgICAgICAgcGx1Z2luTmFtZTogc3RyaW5nLFxuICAgICAgICBhbGxvd1Byb2dyYW1tYXRpY0FjdGl2YXRpb24gPSBmYWxzZVxuICAgICk6IHZvaWQge1xuICAgICAgICBpZiAoIWlzU2FmZU1vZEZpbGVOYW1lKHBsdWdpbk5hbWUsIFwicGx1Z2luXCIpKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci53YXJuKGBSZWZ1c2VkIHRvIGJpbmQgdW5zYWZlIHBsdWdpbiBmaWxlbmFtZTogJHtwbHVnaW5OYW1lfWApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0b2dnbGUuZGF0YXNldC5zdHJlbWlvRW5oYW5jZWRUb2dnbGVCb3VuZCA9PT0gXCJ0cnVlXCIpIHJldHVybjtcblxuICAgICAgICB0b2dnbGUuZGF0YXNldC5zdHJlbWlvRW5oYW5jZWRUb2dnbGVCb3VuZCA9IFwidHJ1ZVwiO1xuICAgICAgICB0b2dnbGUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGlmICghZXZlbnQuaXNUcnVzdGVkICYmICFhbGxvd1Byb2dyYW1tYXRpY0FjdGl2YXRpb24pIHJldHVybjtcblxuICAgICAgICAgICAgdG9nZ2xlLmNsYXNzTGlzdC50b2dnbGUoQ0xBU1NFUy5DSEVDS0VEKTtcbiAgICAgICAgICAgIGlmICh0b2dnbGUuY2xhc3NMaXN0LmNvbnRhaW5zKENMQVNTRVMuQ0hFQ0tFRCkpIHtcbiAgICAgICAgICAgICAgICB2b2lkIHRoaXMubG9hZFBsdWdpbihwbHVnaW5OYW1lKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy51bmxvYWRQbHVnaW4ocGx1Z2luTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZldGNoIG1vZHMgZnJvbSB0aGUgcmVnaXN0cnkgcmVwb3NpdG9yeVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgYXN5bmMgZmV0Y2hNb2RzKCk6IFByb21pc2U8eyBwbHVnaW5zOiB1bmtub3duW107IHRoZW1lczogdW5rbm93bltdIH0+IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChVUkxTLlJFR0lTVFJZKTtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEb3dubG9hZCBhbmQgc2F2ZSBhIG1vZCAocGx1Z2luIG9yIHRoZW1lKVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgYXN5bmMgZG93bmxvYWRNb2QobW9kTGluazogc3RyaW5nLCB0eXBlOiBcInBsdWdpblwiIHwgXCJ0aGVtZVwiKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgdGhpcy5sb2dnZXIuaW5mbyhgRG93bmxvYWRpbmcgJHt0eXBlfSBmcm9tOiAke21vZExpbmt9YCk7XG5cbiAgICAgICAgY29uc3QgbW9kVXJsID0gbmV3IFVSTChtb2RMaW5rKTtcbiAgICAgICAgaWYgKG1vZFVybC5wcm90b2NvbCAhPT0gXCJodHRwczpcIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbnN1cHBvcnRlZCBVUkwgcHJvdG9jb2wgZm9yICR7dHlwZX06ICR7bW9kVXJsLnByb3RvY29sfWApO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChtb2RVcmwudG9TdHJpbmcoKSk7XG4gICAgICAgIGlmICghcmVzcG9uc2Uub2spIHRocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIGRvd25sb2FkOiAke3Jlc3BvbnNlLnN0YXR1c30gJHtyZXNwb25zZS5zdGF0dXNUZXh0fWApO1xuICAgICAgICB0aGlzLmFzc2VydFNlY3VyZVJlc3BvbnNlVXJsKHJlc3BvbnNlLCBtb2RVcmwudG9TdHJpbmcoKSk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBzYXZlRGlyID0gdHlwZSA9PT0gXCJwbHVnaW5cIiA/IHByb3BlcnRpZXMucGx1Z2luc1BhdGggOiBwcm9wZXJ0aWVzLnRoZW1lc1BhdGg7XG4gICAgICAgIGlmICghYXdhaXQgUGxhdGZvcm1NYW5hZ2VyLmN1cnJlbnQuZXhpc3RzKHNhdmVEaXIpKSB7XG4gICAgICAgICAgICBhd2FpdCBQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC5ta2RpcihzYXZlRGlyKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgY29uc3QgZmFsbGJhY2tOYW1lID0gYCR7dHlwZX0tJHtEYXRlLm5vdygpfSR7dHlwZSA9PT0gXCJ0aGVtZVwiID8gRklMRV9FWFRFTlNJT05TLlRIRU1FIDogRklMRV9FWFRFTlNJT05TLlBMVUdJTn1gO1xuICAgICAgICBjb25zdCB1bnNhZmVOYW1lID0gYmFzZW5hbWUobW9kVXJsLnBhdGhuYW1lKSB8fCBmYWxsYmFja05hbWU7XG4gICAgICAgIGNvbnN0IGZpbGVuYW1lID0gdGhpcy5zYW5pdGl6ZU1vZEZpbGVOYW1lKHVuc2FmZU5hbWUsIHR5cGUpO1xuICAgICAgICBpZiAoIWZpbGVuYW1lKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFJlZnVzZWQgdG8gc2F2ZSAke3R5cGV9IHdpdGggdW5zYWZlIGZpbGVuYW1lOiAke3Vuc2FmZU5hbWV9YCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBmaWxlUGF0aCA9IGpvaW4oc2F2ZURpciwgZmlsZW5hbWUpO1xuXG4gICAgICAgIGNvbnN0IGNvbnRlbnQgPSBhd2FpdCB0aGlzLnJlYWRMaW1pdGVkTW9kQ29udGVudChyZXNwb25zZSk7XG4gICAgICAgIGF3YWl0IFBsYXRmb3JtTWFuYWdlci5jdXJyZW50LndyaXRlRmlsZShmaWxlUGF0aCwgY29udGVudCk7XG5cbiAgICAgICAgdGhpcy5sb2dnZXIuaW5mbyhgRG93bmxvYWRlZCAke3R5cGV9IHNhdmVkIHRvOiAke2ZpbGVQYXRofWApO1xuICAgICAgICByZXR1cm4gZmlsZVBhdGg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGEgbW9kIGZpbGUgYW5kIGNsZWFuIHVwIGFzc29jaWF0ZWQgc3RhdGVcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGFzeW5jIHJlbW92ZU1vZChmaWxlTmFtZTogc3RyaW5nLCB0eXBlOiBcInBsdWdpblwiIHwgXCJ0aGVtZVwiKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGNvbnN0IGRlY29kZWRGaWxlTmFtZSA9IHRoaXMuZGVjb2RlRmlsZU5hbWUoZmlsZU5hbWUudHJpbSgpKTtcbiAgICAgICAgaWYgKCFpc1NhZmVNb2RGaWxlTmFtZShkZWNvZGVkRmlsZU5hbWUsIHR5cGUpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFJlZnVzZWQgdG8gcmVtb3ZlICR7dHlwZX0gd2l0aCB1bnNhZmUgZmlsZW5hbWU6ICR7ZmlsZU5hbWV9YCk7XG4gICAgICAgIH1cbiAgICAgICAgZmlsZU5hbWUgPSBkZWNvZGVkRmlsZU5hbWU7XG4gICAgICAgIHRoaXMubG9nZ2VyLmluZm8oYFJlbW92aW5nICR7dHlwZX0gZmlsZTogJHtmaWxlTmFtZX1gKTtcblxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJwbHVnaW5cIjpcbiAgICAgICAgICAgICAgICBpZiAoYXdhaXQgdGhpcy5pc1BsdWdpbkluc3RhbGxlZChmaWxlTmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgd2FzRW5hYmxlZCA9IHRoaXMuZ2V0RW5hYmxlZFBsdWdpbnMoKS5pbmNsdWRlcyhmaWxlTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IFBsYXRmb3JtTWFuYWdlci5jdXJyZW50LnVubGluayhqb2luKHByb3BlcnRpZXMucGx1Z2luc1BhdGgsIGZpbGVOYW1lKSk7XG4gICAgICAgICAgICAgICAgICAgIFBsdWdpbk9wdGlvbnMucmVtb3ZlKGZpbGVOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHdhc0VuYWJsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudW5sb2FkUGx1Z2luKGZpbGVOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJ0aGVtZVwiOlxuICAgICAgICAgICAgICAgIGlmIChhd2FpdCB0aGlzLmlzVGhlbWVJbnN0YWxsZWQoZmlsZU5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbShTVE9SQUdFX0tFWVMuQ1VSUkVOVF9USEVNRSkgPT09IGZpbGVOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShTVE9SQUdFX0tFWVMuQ1VSUkVOVF9USEVNRSwgXCJEZWZhdWx0XCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWN0aXZlVGhlbWVcIik/LnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC51bmxpbmsoam9pbihwcm9wZXJ0aWVzLnRoZW1lc1BhdGgsIGZpbGVOYW1lKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBhc3luYyBpc1RoZW1lSW5zdGFsbGVkKGZpbGVOYW1lOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgcmV0dXJuIChhd2FpdCB0aGlzLmdldEluc3RhbGxlZFRoZW1lcygpKS5pbmNsdWRlcyhmaWxlTmFtZSk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBhc3luYyBpc1BsdWdpbkluc3RhbGxlZChmaWxlTmFtZTogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICAgIHJldHVybiAoYXdhaXQgdGhpcy5nZXRJbnN0YWxsZWRQbHVnaW5zKCkpLmluY2x1ZGVzKGZpbGVOYW1lKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBhc3luYyBnZXRJbnN0YWxsZWRUaGVtZXMoKTogUHJvbWlzZTxzdHJpbmdbXT4ge1xuICAgICAgICBjb25zdCBkaXJQYXRoID0gcHJvcGVydGllcy50aGVtZXNQYXRoO1xuICAgICAgICBpZiAoIWF3YWl0IFBsYXRmb3JtTWFuYWdlci5jdXJyZW50LmV4aXN0cyhkaXJQYXRoKSkgcmV0dXJuIFtdO1xuXG4gICAgICAgIGNvbnN0IGZpbGVzID0gYXdhaXQgUGxhdGZvcm1NYW5hZ2VyLmN1cnJlbnQucmVhZGRpcihkaXJQYXRoKTtcbiAgICAgICAgY29uc3QgZmlsZVN0YXRzID0gYXdhaXQgUHJvbWlzZS5hbGwoZmlsZXMubWFwKGFzeW5jIGZpbGUgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc3RhdCA9IGF3YWl0IFBsYXRmb3JtTWFuYWdlci5jdXJyZW50LnN0YXQoam9pbihkaXJQYXRoLCBmaWxlKSk7XG4gICAgICAgICAgICByZXR1cm4geyBmaWxlLCBpc0ZpbGU6IHN0YXQuaXNGaWxlIH07XG4gICAgICAgIH0pKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmaWxlU3RhdHMuZmlsdGVyKGYgPT4gZi5pc0ZpbGUpLm1hcChmID0+IGYuZmlsZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgYXN5bmMgZ2V0SW5zdGFsbGVkUGx1Z2lucygpOiBQcm9taXNlPHN0cmluZ1tdPiB7XG4gICAgICAgIGNvbnN0IGRpclBhdGggPSBwcm9wZXJ0aWVzLnBsdWdpbnNQYXRoO1xuICAgICAgICBpZiAoIWF3YWl0IFBsYXRmb3JtTWFuYWdlci5jdXJyZW50LmV4aXN0cyhkaXJQYXRoKSkgcmV0dXJuIFtdO1xuXG4gICAgICAgIGNvbnN0IGZpbGVzID0gYXdhaXQgUGxhdGZvcm1NYW5hZ2VyLmN1cnJlbnQucmVhZGRpcihkaXJQYXRoKTtcbiAgICAgICAgY29uc3QgZmlsZVN0YXRzID0gYXdhaXQgUHJvbWlzZS5hbGwoZmlsZXMubWFwKGFzeW5jIGZpbGUgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc3RhdCA9IGF3YWl0IFBsYXRmb3JtTWFuYWdlci5jdXJyZW50LnN0YXQoam9pbihkaXJQYXRoLCBmaWxlKSk7XG4gICAgICAgICAgICByZXR1cm4geyBmaWxlLCBpc0ZpbGU6IHN0YXQuaXNGaWxlIH07XG4gICAgICAgIH0pKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmaWxlU3RhdHMuZmlsdGVyKGYgPT4gZi5pc0ZpbGUpLm1hcChmID0+IGYuZmlsZSk7XG4gICAgfVxuICAgIFxuICAgIHB1YmxpYyBzdGF0aWMgb3BlblRoZW1lc0ZvbGRlcigpOiB2b2lkIHtcbiAgICAgICAgaGVscGVycy53YWl0Rm9yRWxtKFwiI29wZW50aGVtZXNmb2xkZXJCdG5cIikudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm9wZW50aGVtZXNmb2xkZXJCdG5cIikgYXMgSFRNTEVsZW1lbnQgfCBudWxsO1xuICAgICAgICAgICAgaWYgKCFidXR0b24gfHwgYnV0dG9uLmRhdGFzZXQuc3RyZW1pb0VuaGFuY2VkQ2xpY2tCb3VuZCA9PT0gXCJ0cnVlXCIpIHJldHVybjtcblxuICAgICAgICAgICAgYnV0dG9uLmRhdGFzZXQuc3RyZW1pb0VuaGFuY2VkQ2xpY2tCb3VuZCA9IFwidHJ1ZVwiO1xuICAgICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5vcGVuRm9sZGVyKHByb3BlcnRpZXMudGhlbWVzUGF0aCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSkuY2F0Y2goZXJyID0+IHRoaXMubG9nZ2VyLmVycm9yKGBGYWlsZWQgdG8gc2V0dXAgdGhlbWVzIGZvbGRlciBidXR0b246ICR7ZXJyfWApKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIG9wZW5QbHVnaW5zRm9sZGVyKCk6IHZvaWQge1xuICAgICAgICBoZWxwZXJzLndhaXRGb3JFbG0oXCIjb3BlbnBsdWdpbnNmb2xkZXJCdG5cIikudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm9wZW5wbHVnaW5zZm9sZGVyQnRuXCIpIGFzIEhUTUxFbGVtZW50IHwgbnVsbDtcbiAgICAgICAgICAgIGlmICghYnV0dG9uIHx8IGJ1dHRvbi5kYXRhc2V0LnN0cmVtaW9FbmhhbmNlZENsaWNrQm91bmQgPT09IFwidHJ1ZVwiKSByZXR1cm47XG5cbiAgICAgICAgICAgIGJ1dHRvbi5kYXRhc2V0LnN0cmVtaW9FbmhhbmNlZENsaWNrQm91bmQgPSBcInRydWVcIjtcbiAgICAgICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMub3BlbkZvbGRlcihwcm9wZXJ0aWVzLnBsdWdpbnNQYXRoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KS5jYXRjaChlcnIgPT4gdGhpcy5sb2dnZXIuZXJyb3IoYEZhaWxlZCB0byBzZXR1cCBwbHVnaW5zIGZvbGRlciBidXR0b246ICR7ZXJyfWApKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPcGVuIGEgZm9sZGVyIGluIHRoZSBzeXN0ZW0gZmlsZSBleHBsb3JlclxuICAgICAqL1xuICAgIHByaXZhdGUgc3RhdGljIGFzeW5jIG9wZW5Gb2xkZXIoZm9sZGVyUGF0aDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCBQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC5vcGVuUGF0aChmb2xkZXJQYXRoKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLmVycm9yKGBGYWlsZWQgdG8gb3BlbiBmb2xkZXIgJHtmb2xkZXJQYXRofTogJHtlcnJvcn1gKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAgICAgXG4gICAgcHVibGljIHN0YXRpYyBzY3JvbGxMaXN0ZW5lcigpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuc2Nyb2xsTGlzdGVuZXJSZWFkeSB8fCB0aGlzLnNjcm9sbExpc3RlbmVyU2V0dXBQZW5kaW5nKSByZXR1cm47XG4gICAgICAgIHRoaXMuc2Nyb2xsTGlzdGVuZXJTZXR1cFBlbmRpbmcgPSB0cnVlO1xuXG4gICAgICAgIGhlbHBlcnMud2FpdEZvckVsbSgnW2RhdGEtc2VjdGlvbj1cImVuaGFuY2VkXCJdJykudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbmhhbmNlZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlbmhhbmNlZCcpO1xuICAgICAgICAgICAgY29uc3QgZW5oYW5jZWROYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zZWN0aW9uPVwiZW5oYW5jZWRcIl0nKSBhcyBIVE1MRWxlbWVudCB8IG51bGw7XG5cbiAgICAgICAgICAgIGlmICghKGVuaGFuY2VkIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHx8ICFlbmhhbmNlZE5hdikgcmV0dXJuO1xuXG4gICAgICAgICAgICBpZiAoZW5oYW5jZWROYXYuZGF0YXNldC5zdHJlbWlvRW5oYW5jZWRTY3JvbGxCb3VuZCA9PT0gXCJ0cnVlXCIpIHJldHVybjtcbiAgICAgICAgICAgIGVuaGFuY2VkTmF2LmRhdGFzZXQuc3RyZW1pb0VuaGFuY2VkU2Nyb2xsQm91bmQgPSBcInRydWVcIjtcblxuICAgICAgICAgICAgZW5oYW5jZWROYXYuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBmaXJzdENoaWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlbmhhbmNlZCA+IGRpdlwiKTtcbiAgICAgICAgICAgICAgICBmaXJzdENoaWxkPy5zY3JvbGxJbnRvVmlldyh7XG4gICAgICAgICAgICAgICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJyxcbiAgICAgICAgICAgICAgICAgICAgYmxvY2s6ICdzdGFydCdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBTZXR0aW5ncy5hY3RpdmVTZWN0aW9uKGVuaGFuY2VkTmF2KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcigoZW50cmllcykgPT4ge1xuICAgICAgICAgICAgICAgIGVudHJpZXMuZm9yRWFjaChlbnRyeSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgU2V0dGluZ3MuYWN0aXZlU2VjdGlvbihlbmhhbmNlZE5hdik7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbmhhbmNlZE5hdi5jbGFzc0xpc3QucmVtb3ZlKENMQVNTRVMuU0VMRUNURUQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LCB7IHRocmVzaG9sZDogMC4xIH0pO1xuICAgICAgICBcbiAgICAgICAgICAgIG9ic2VydmVyLm9ic2VydmUoZW5oYW5jZWQpO1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxMaXN0ZW5lclJlYWR5ID0gdHJ1ZTtcbiAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLndhcm4oYEVuaGFuY2VkIHNjcm9sbCBsaXN0ZW5lciB3YXMgbm90IHJlYWR5OiAke2Vycn1gKTtcbiAgICAgICAgfSkuZmluYWxseSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbExpc3RlbmVyU2V0dXBQZW5kaW5nID0gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICAvKipcbiAgICAgKiBBZGQgdGhlIGFwcGx5VGhlbWUgZnVuY3Rpb24gdG8gdGhlIHBhZ2VcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGFkZEFwcGx5VGhlbWVGdW5jdGlvbigpOiB2b2lkIHtcbiAgICAgICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuQVBQTFlfVEhFTUVfU0NSSVBUX0lEKSkgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IGFwcGx5VGhlbWVTY3JpcHQgPSBnZXRBcHBseVRoZW1lVGVtcGxhdGUoKTtcbiAgICAgICAgY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTsgIFxuICAgICAgICBzY3JpcHQuaW5uZXJIVE1MID0gYXBwbHlUaGVtZVNjcmlwdDtcbiAgICAgICAgc2NyaXB0LmlkID0gdGhpcy5BUFBMWV9USEVNRV9TQ1JJUFRfSUQ7XG4gICAgICAgIFxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gICAgfVxuICAgIFxuICAgIC8qKlxuICAgICAqIENoZWNrIGZvciB1cGRhdGVzIGZvciBhIHNwZWNpZmljIHBsdWdpbiBvciB0aGVtZVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgYXN5bmMgY2hlY2tGb3JJdGVtVXBkYXRlcyhpdGVtRmlsZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHRoaXMubG9nZ2VyLmluZm8oJ0NoZWNraW5nIGZvciB1cGRhdGVzIGZvciAnICsgaXRlbUZpbGUpO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgaXRlbUJveCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKGAke2l0ZW1GaWxlfS1ib3hgKVswXTtcbiAgICAgICAgaWYgKCFpdGVtQm94KSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci53YXJuKGAke2l0ZW1GaWxlfS1ib3ggZWxlbWVudCBub3QgZm91bmQuYCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwbHVnaW5PclRoZW1lOiAndGhlbWUnIHwgJ3BsdWdpbicgPSBpdGVtRmlsZS5lbmRzV2l0aChcIi50aGVtZS5jc3NcIikgPyBcInRoZW1lXCIgOiBcInBsdWdpblwiO1xuICAgICAgICBjb25zdCBpdGVtUGF0aCA9IGpvaW4oXG4gICAgICAgICAgICBwbHVnaW5PclRoZW1lID09PSBcInRoZW1lXCIgPyBwcm9wZXJ0aWVzLnRoZW1lc1BhdGggOiBwcm9wZXJ0aWVzLnBsdWdpbnNQYXRoLCBcbiAgICAgICAgICAgIGl0ZW1GaWxlXG4gICAgICAgICk7XG4gICAgICAgIFxuICAgICAgICAvLyBSZWZhY3RvcmVkOiBSZWFkIGZpbGUgZmlyc3RcbiAgICAgICAgbGV0IGZpbGVDb250ZW50ID0gXCJcIjtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZpbGVDb250ZW50ID0gYXdhaXQgUGxhdGZvcm1NYW5hZ2VyLmN1cnJlbnQucmVhZEZpbGUoaXRlbVBhdGgpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcihgRmFpbGVkIHRvIHJlYWQgZmlsZSAke2l0ZW1QYXRofTogJHtlfWApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgaW5zdGFsbGVkSXRlbU1ldGFEYXRhID0gRXh0cmFjdE1ldGFEYXRhLmV4dHJhY3RNZXRhZGF0YUZyb21UZXh0KGZpbGVDb250ZW50KSBhcyBNZXRhRGF0YSB8IG51bGw7XG4gICAgICAgIFxuICAgICAgICBpZiAoIWluc3RhbGxlZEl0ZW1NZXRhRGF0YSB8fCBPYmplY3Qua2V5cyhpbnN0YWxsZWRJdGVtTWV0YURhdGEpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdXBkYXRlVXJsID0gaW5zdGFsbGVkSXRlbU1ldGFEYXRhLnVwZGF0ZVVybDtcbiAgICAgICAgaWYgKCF1cGRhdGVVcmwgfHwgdXBkYXRlVXJsID09PSBcIm5vbmVcIikge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIuaW5mbyhgTm8gdXBkYXRlIFVSTCBwcm92aWRlZCBmb3IgJHtwbHVnaW5PclRoZW1lfSAoJHtpbnN0YWxsZWRJdGVtTWV0YURhdGEubmFtZX0pYCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLmlzU3VwcG9ydGVkUmVtb3RlVXJsKHVwZGF0ZVVybCkpIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLndhcm4oYFNraXBwZWQgdXBkYXRlIGZvciAke2l0ZW1GaWxlfTogdW5zdXBwb3J0ZWQgVVJMIHByb3RvY29sLmApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlcXVlc3QgPSBhd2FpdCBmZXRjaCh1cGRhdGVVcmwpO1xuICAgICAgICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzICE9PSAyMDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci53YXJuKGBGYWlsZWQgdG8gZmV0Y2ggdXBkYXRlIGZvciAke2l0ZW1GaWxlfTogSFRUUCAke3JlcXVlc3Quc3RhdHVzfWApO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuYXNzZXJ0U2VjdXJlUmVzcG9uc2VVcmwocmVxdWVzdCwgdXBkYXRlVXJsKTtcblxuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlYWRMaW1pdGVkTW9kQ29udGVudChyZXF1ZXN0KTtcbiAgICAgICAgICAgIGNvbnN0IGV4dHJhY3RlZE1ldGFEYXRhID0gRXh0cmFjdE1ldGFEYXRhLmV4dHJhY3RNZXRhZGF0YUZyb21UZXh0KHJlc3BvbnNlKSBhcyBNZXRhRGF0YSB8IG51bGw7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmICghZXh0cmFjdGVkTWV0YURhdGEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci53YXJuKGBGYWlsZWQgdG8gZXh0cmFjdCBtZXRhZGF0YSBmcm9tIHJlc3BvbnNlIGZvciAke3BsdWdpbk9yVGhlbWV9ICgke2luc3RhbGxlZEl0ZW1NZXRhRGF0YS5uYW1lfSlgKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChoZWxwZXJzLmlzTmV3ZXJWZXJzaW9uKGV4dHJhY3RlZE1ldGFEYXRhLnZlcnNpb24sIGluc3RhbGxlZEl0ZW1NZXRhRGF0YS52ZXJzaW9uKSkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmluZm8oXG4gICAgICAgICAgICAgICAgICAgIGBVcGRhdGUgYXZhaWxhYmxlIGZvciAke3BsdWdpbk9yVGhlbWV9ICgke2luc3RhbGxlZEl0ZW1NZXRhRGF0YS5uYW1lfSk6IGAgK1xuICAgICAgICAgICAgICAgICAgICBgdiR7aW5zdGFsbGVkSXRlbU1ldGFEYXRhLnZlcnNpb259IC0+IHYke2V4dHJhY3RlZE1ldGFEYXRhLnZlcnNpb259YFxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCB1cGRhdGVCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtpdGVtRmlsZX0tdXBkYXRlYCk7XG4gICAgICAgICAgICAgICAgaWYgKHVwZGF0ZUJ1dHRvbikge1xuICAgICAgICAgICAgICAgICAgICB1cGRhdGVCdXR0b24uc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICAgICAgICAgICAgICAgICAgICBpZiAodXBkYXRlQnV0dG9uLmRhdGFzZXQuc3RyZW1pb0VuaGFuY2VkQ2xpY2tCb3VuZCA9PT0gXCJ0cnVlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVCdXR0b24uZGF0YXNldC5zdHJlbWlvRW5oYW5jZWRDbGlja0JvdW5kID0gXCJ0cnVlXCI7XG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgUGxhdGZvcm1NYW5hZ2VyLmN1cnJlbnQud3JpdGVGaWxlKGl0ZW1QYXRoLCByZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBTZXR0aW5ncy5yZW1vdmVJdGVtKGl0ZW1GaWxlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFNldHRpbmdzLmFkZEl0ZW0ocGx1Z2luT3JUaGVtZSwgaXRlbUZpbGUsIGV4dHJhY3RlZE1ldGFEYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKFxuICAgICAgICAgICAgICAgICAgICBgTm8gdXBkYXRlIGF2YWlsYWJsZSBmb3IgJHtwbHVnaW5PclRoZW1lfSAoJHtpbnN0YWxsZWRJdGVtTWV0YURhdGEubmFtZX0pLiBgICtcbiAgICAgICAgICAgICAgICAgICAgYEN1cnJlbnQgdmVyc2lvbjogdiR7aW5zdGFsbGVkSXRlbU1ldGFEYXRhLnZlcnNpb259YFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcihgRXJyb3IgY2hlY2tpbmcgdXBkYXRlcyBmb3IgJHtpdGVtRmlsZX06ICR7KGVycm9yIGFzIEVycm9yKS5tZXNzYWdlfWApO1xuICAgICAgICB9XG4gICAgfVxufVxuICAgIFxuZXhwb3J0IGRlZmF1bHQgTW9kTWFuYWdlcjtcbiIsICJpbXBvcnQgeyBQbHVnaW5PcHRpb25EZWZpbml0aW9uIH0gZnJvbSBcIi4vUGx1Z2luT3B0aW9uXCI7XG5cbi8qKlxuICogTWV0YWRhdGEgc3RydWN0dXJlIGZvciBwbHVnaW5zIGFuZCB0aGVtZXNcbiAqIEV4dHJhY3RlZCBmcm9tIEpTRG9jLXN0eWxlIGNvbW1lbnRzIGluIG1vZCBmaWxlc1xuICovXG5leHBvcnQgaW50ZXJmYWNlIE1ldGFEYXRhIHtcbiAgICAvKiogRGlzcGxheSBuYW1lIG9mIHRoZSBtb2QgKi9cbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgLyoqIEJyaWVmIGRlc2NyaXB0aW9uIG9mIHdoYXQgdGhlIG1vZCBkb2VzICovXG4gICAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgICAvKiogQXV0aG9yL2NyZWF0b3Igb2YgdGhlIG1vZCAqL1xuICAgIGF1dGhvcjogc3RyaW5nO1xuICAgIC8qKiBTZW1hbnRpYyB2ZXJzaW9uIHN0cmluZyAoZS5nLiwgXCIxLjAuMFwiKSAqL1xuICAgIHZlcnNpb246IHN0cmluZztcbiAgICAvKiogVVJMIHRvIGNoZWNrIGZvciB1cGRhdGVzIChvcHRpb25hbCkgKi9cbiAgICB1cGRhdGVVcmw/OiBzdHJpbmc7XG4gICAgLyoqIFNvdXJjZSBjb2RlIHJlcG9zaXRvcnkgVVJMIChvcHRpb25hbCkgKi9cbiAgICBzb3VyY2U/OiBzdHJpbmc7XG4gICAgLyoqIExpY2Vuc2UgdHlwZSAob3B0aW9uYWwpICovXG4gICAgbGljZW5zZT86IHN0cmluZztcbiAgICAvKiogSG9tZXBhZ2UvZG9jdW1lbnRhdGlvbiBVUkwgKG9wdGlvbmFsKSAqL1xuICAgIGhvbWVwYWdlPzogc3RyaW5nO1xuICAgIC8qKiBWYWxpZGF0ZWQgY29uZmlndXJhdGlvbiBmaWVsZHMgZXhwb3NlZCBieSBhIHBsdWdpbiAob3B0aW9uYWwpICovXG4gICAgb3B0aW9ucz86IFBsdWdpbk9wdGlvbkRlZmluaXRpb25bXTtcbn1cblxuZXhwb3J0IHR5cGUgTWV0YWRhdGFLZXkgPSBFeGNsdWRlPGtleW9mIE1ldGFEYXRhLCBcIm9wdGlvbnNcIj47XG5cbmV4cG9ydCBjb25zdCBSRVFVSVJFRF9NRVRBREFUQV9LRVlTID0gW1xuICAgIFwibmFtZVwiLFxuICAgIFwiZGVzY3JpcHRpb25cIixcbiAgICBcImF1dGhvclwiLFxuICAgIFwidmVyc2lvblwiLFxuXSBhcyBjb25zdCBzYXRpc2ZpZXMgcmVhZG9ubHkgTWV0YWRhdGFLZXlbXTtcblxuZXhwb3J0IGNvbnN0IEFMTF9NRVRBREFUQV9LRVlTID0gW1xuICAgIFwibmFtZVwiLFxuICAgIFwiZGVzY3JpcHRpb25cIixcbiAgICBcImF1dGhvclwiLFxuICAgIFwidmVyc2lvblwiLFxuICAgIFwidXBkYXRlVXJsXCIsXG4gICAgXCJzb3VyY2VcIixcbiAgICBcImxpY2Vuc2VcIixcbiAgICBcImhvbWVwYWdlXCIsXG5dIGFzIGNvbnN0IHNhdGlzZmllcyByZWFkb25seSBNZXRhZGF0YUtleVtdO1xuIiwgImltcG9ydCB7XG4gICAgUGx1Z2luT3B0aW9uRGVmaW5pdGlvbixcbiAgICBQbHVnaW5PcHRpb25WYWx1ZSxcbiAgICBQbHVnaW5PcHRpb25WYWx1ZXMsXG4gICAgU2VsZWN0UGx1Z2luT3B0aW9uQ2hvaWNlLFxufSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9QbHVnaW5PcHRpb25cIjtcblxuY29uc3QgT1BUSU9OX0lEX1BBVFRFUk4gPSAvXltBLVphLXpdW0EtWmEtejAtOV8tXXswLDYzfSQvO1xuY29uc3QgTUFYX0xBQkVMX0xFTkdUSCA9IDEyMDtcbmNvbnN0IE1BWF9ERVNDUklQVElPTl9MRU5HVEggPSA1MDA7XG5jb25zdCBNQVhfVEVYVF9MRU5HVEggPSAxMF8wMDA7XG5jb25zdCBNQVhfQ0hPSUNFUyA9IDY0O1xuXG5mdW5jdGlvbiBpc1JlY29yZCh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIFJlY29yZDxzdHJpbmcsIHVua25vd24+IHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIHZhbHVlICE9PSBudWxsICYmICFBcnJheS5pc0FycmF5KHZhbHVlKTtcbn1cblxuZnVuY3Rpb24gaXNCb3VuZGVkU3RyaW5nKHZhbHVlOiB1bmtub3duLCBtaW5MZW5ndGg6IG51bWJlciwgbWF4TGVuZ3RoOiBudW1iZXIpOiB2YWx1ZSBpcyBzdHJpbmcge1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgJiYgdmFsdWUubGVuZ3RoID49IG1pbkxlbmd0aCAmJiB2YWx1ZS5sZW5ndGggPD0gbWF4TGVuZ3RoO1xufVxuXG5mdW5jdGlvbiBnZXRCYXNlRmllbGRzKHZhbHVlOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPikge1xuICAgIGlmICghT1BUSU9OX0lEX1BBVFRFUk4udGVzdChTdHJpbmcodmFsdWUuaWQgPz8gXCJcIikpKSByZXR1cm4gbnVsbDtcbiAgICBpZiAoIWlzQm91bmRlZFN0cmluZyh2YWx1ZS5sYWJlbCwgMSwgTUFYX0xBQkVMX0xFTkdUSCkpIHJldHVybiBudWxsO1xuICAgIGlmIChcbiAgICAgICAgdmFsdWUuZGVzY3JpcHRpb24gIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAhaXNCb3VuZGVkU3RyaW5nKHZhbHVlLmRlc2NyaXB0aW9uLCAxLCBNQVhfREVTQ1JJUFRJT05fTEVOR1RIKVxuICAgICkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBpZDogU3RyaW5nKHZhbHVlLmlkKSxcbiAgICAgICAgbGFiZWw6IHZhbHVlLmxhYmVsLFxuICAgICAgICAuLi4odmFsdWUuZGVzY3JpcHRpb24gPT09IHVuZGVmaW5lZCA/IHt9IDogeyBkZXNjcmlwdGlvbjogdmFsdWUuZGVzY3JpcHRpb24gfSksXG4gICAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlUGx1Z2luT3B0aW9uRGVmaW5pdGlvbih2YWx1ZTogdW5rbm93bik6IFBsdWdpbk9wdGlvbkRlZmluaXRpb24gfCBudWxsIHtcbiAgICBpZiAoIWlzUmVjb3JkKHZhbHVlKSkgcmV0dXJuIG51bGw7XG5cbiAgICBjb25zdCBiYXNlID0gZ2V0QmFzZUZpZWxkcyh2YWx1ZSk7XG4gICAgaWYgKCFiYXNlKSByZXR1cm4gbnVsbDtcblxuICAgIHN3aXRjaCAodmFsdWUudHlwZSkge1xuICAgICAgICBjYXNlIFwiYm9vbGVhblwiOlxuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZS5kZWZhdWx0ICE9PSBcImJvb2xlYW5cIikgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICByZXR1cm4geyAuLi5iYXNlLCB0eXBlOiBcImJvb2xlYW5cIiwgZGVmYXVsdDogdmFsdWUuZGVmYXVsdCB9O1xuXG4gICAgICAgIGNhc2UgXCJ0ZXh0XCI6IHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUuZGVmYXVsdCAhPT0gXCJzdHJpbmdcIikgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgdmFsdWUucGxhY2Vob2xkZXIgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgICAgICFpc0JvdW5kZWRTdHJpbmcodmFsdWUucGxhY2Vob2xkZXIsIDAsIDIwMClcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIHZhbHVlLm1heExlbmd0aCAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICAgICAgKFxuICAgICAgICAgICAgICAgICAgICB0eXBlb2YgdmFsdWUubWF4TGVuZ3RoICE9PSBcIm51bWJlclwiIHx8XG4gICAgICAgICAgICAgICAgICAgICFOdW1iZXIuaXNJbnRlZ2VyKHZhbHVlLm1heExlbmd0aCkgfHxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUubWF4TGVuZ3RoIDwgMSB8fFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZS5tYXhMZW5ndGggPiBNQVhfVEVYVF9MRU5HVEhcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IG1heExlbmd0aCA9IHR5cGVvZiB2YWx1ZS5tYXhMZW5ndGggPT09IFwibnVtYmVyXCIgPyB2YWx1ZS5tYXhMZW5ndGggOiBNQVhfVEVYVF9MRU5HVEg7XG4gICAgICAgICAgICBpZiAodmFsdWUuZGVmYXVsdC5sZW5ndGggPiBtYXhMZW5ndGgpIHJldHVybiBudWxsO1xuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIC4uLmJhc2UsXG4gICAgICAgICAgICAgICAgdHlwZTogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgZGVmYXVsdDogdmFsdWUuZGVmYXVsdCxcbiAgICAgICAgICAgICAgICAuLi4odmFsdWUucGxhY2Vob2xkZXIgPT09IHVuZGVmaW5lZCA/IHt9IDogeyBwbGFjZWhvbGRlcjogdmFsdWUucGxhY2Vob2xkZXIgYXMgc3RyaW5nIH0pLFxuICAgICAgICAgICAgICAgIC4uLih2YWx1ZS5tYXhMZW5ndGggPT09IHVuZGVmaW5lZCA/IHt9IDogeyBtYXhMZW5ndGg6IHZhbHVlLm1heExlbmd0aCBhcyBudW1iZXIgfSksXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSBcIm51bWJlclwiOiB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlLmRlZmF1bHQgIT09IFwibnVtYmVyXCIgfHwgIU51bWJlci5pc0Zpbml0ZSh2YWx1ZS5kZWZhdWx0KSkgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICBjb25zdCBudW1lcmljS2V5cyA9IFtcIm1pblwiLCBcIm1heFwiLCBcInN0ZXBcIl0gYXMgY29uc3Q7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBudW1lcmljS2V5cykge1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZVtrZXldICE9PSB1bmRlZmluZWQgJiYgKHR5cGVvZiB2YWx1ZVtrZXldICE9PSBcIm51bWJlclwiIHx8ICFOdW1iZXIuaXNGaW5pdGUodmFsdWVba2V5XSkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IG1pbiA9IHZhbHVlLm1pbiBhcyBudW1iZXIgfCB1bmRlZmluZWQ7XG4gICAgICAgICAgICBjb25zdCBtYXggPSB2YWx1ZS5tYXggYXMgbnVtYmVyIHwgdW5kZWZpbmVkO1xuICAgICAgICAgICAgY29uc3Qgc3RlcCA9IHZhbHVlLnN0ZXAgYXMgbnVtYmVyIHwgdW5kZWZpbmVkO1xuICAgICAgICAgICAgaWYgKG1pbiAhPT0gdW5kZWZpbmVkICYmIG1heCAhPT0gdW5kZWZpbmVkICYmIG1pbiA+IG1heCkgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICBpZiAoc3RlcCAhPT0gdW5kZWZpbmVkICYmIHN0ZXAgPD0gMCkgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICBpZiAobWluICE9PSB1bmRlZmluZWQgJiYgdmFsdWUuZGVmYXVsdCA8IG1pbikgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICBpZiAobWF4ICE9PSB1bmRlZmluZWQgJiYgdmFsdWUuZGVmYXVsdCA+IG1heCkgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgLi4uYmFzZSxcbiAgICAgICAgICAgICAgICB0eXBlOiBcIm51bWJlclwiLFxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHZhbHVlLmRlZmF1bHQsXG4gICAgICAgICAgICAgICAgLi4uKG1pbiA9PT0gdW5kZWZpbmVkID8ge30gOiB7IG1pbiB9KSxcbiAgICAgICAgICAgICAgICAuLi4obWF4ID09PSB1bmRlZmluZWQgPyB7fSA6IHsgbWF4IH0pLFxuICAgICAgICAgICAgICAgIC4uLihzdGVwID09PSB1bmRlZmluZWQgPyB7fSA6IHsgc3RlcCB9KSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBjYXNlIFwic2VsZWN0XCI6IHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUuZGVmYXVsdCAhPT0gXCJzdHJpbmdcIikgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkodmFsdWUuY2hvaWNlcykgfHwgdmFsdWUuY2hvaWNlcy5sZW5ndGggPCAxIHx8IHZhbHVlLmNob2ljZXMubGVuZ3RoID4gTUFYX0NIT0lDRVMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgY2hvaWNlczogU2VsZWN0UGx1Z2luT3B0aW9uQ2hvaWNlW10gPSBbXTtcbiAgICAgICAgICAgIGNvbnN0IHNlZW5WYWx1ZXMgPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgcmF3Q2hvaWNlIG9mIHZhbHVlLmNob2ljZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWlzUmVjb3JkKHJhd0Nob2ljZSkpIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIGlmICghaXNCb3VuZGVkU3RyaW5nKHJhd0Nob2ljZS52YWx1ZSwgMSwgMTI4KSkgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgaWYgKCFpc0JvdW5kZWRTdHJpbmcocmF3Q2hvaWNlLmxhYmVsLCAxLCBNQVhfTEFCRUxfTEVOR1RIKSkgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgaWYgKHNlZW5WYWx1ZXMuaGFzKHJhd0Nob2ljZS52YWx1ZSkpIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIHNlZW5WYWx1ZXMuYWRkKHJhd0Nob2ljZS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgY2hvaWNlcy5wdXNoKHsgdmFsdWU6IHJhd0Nob2ljZS52YWx1ZSwgbGFiZWw6IHJhd0Nob2ljZS5sYWJlbCB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghc2VlblZhbHVlcy5oYXModmFsdWUuZGVmYXVsdCkpIHJldHVybiBudWxsO1xuXG4gICAgICAgICAgICByZXR1cm4geyAuLi5iYXNlLCB0eXBlOiBcInNlbGVjdFwiLCBkZWZhdWx0OiB2YWx1ZS5kZWZhdWx0LCBjaG9pY2VzIH07XG4gICAgICAgIH1cblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplUGx1Z2luT3B0aW9uVmFsdWUoXG4gICAgZGVmaW5pdGlvbjogUGx1Z2luT3B0aW9uRGVmaW5pdGlvbixcbiAgICB2YWx1ZTogdW5rbm93blxuKTogUGx1Z2luT3B0aW9uVmFsdWUgfCB1bmRlZmluZWQge1xuICAgIHN3aXRjaCAoZGVmaW5pdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgXCJib29sZWFuXCI6XG4gICAgICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcImJvb2xlYW5cIiA/IHZhbHVlIDogdW5kZWZpbmVkO1xuXG4gICAgICAgIGNhc2UgXCJ0ZXh0XCI6IHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwic3RyaW5nXCIpIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICBjb25zdCBtYXhMZW5ndGggPSBkZWZpbml0aW9uLm1heExlbmd0aCA/PyBNQVhfVEVYVF9MRU5HVEg7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWUubGVuZ3RoIDw9IG1heExlbmd0aCA/IHZhbHVlIDogdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSBcIm51bWJlclwiOlxuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJudW1iZXJcIiB8fCAhTnVtYmVyLmlzRmluaXRlKHZhbHVlKSkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGlmIChkZWZpbml0aW9uLm1pbiAhPT0gdW5kZWZpbmVkICYmIHZhbHVlIDwgZGVmaW5pdGlvbi5taW4pIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICBpZiAoZGVmaW5pdGlvbi5tYXggIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSA+IGRlZmluaXRpb24ubWF4KSByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuXG4gICAgICAgIGNhc2UgXCJzZWxlY3RcIjpcbiAgICAgICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgJiYgZGVmaW5pdGlvbi5jaG9pY2VzLnNvbWUoY2hvaWNlID0+IGNob2ljZS52YWx1ZSA9PT0gdmFsdWUpXG4gICAgICAgICAgICAgICAgPyB2YWx1ZVxuICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFBsdWdpbk9wdGlvbkRlZmF1bHRzKGRlZmluaXRpb25zOiBQbHVnaW5PcHRpb25EZWZpbml0aW9uW10pOiBQbHVnaW5PcHRpb25WYWx1ZXMge1xuICAgIHJldHVybiBPYmplY3QuZnJvbUVudHJpZXMoZGVmaW5pdGlvbnMubWFwKGRlZmluaXRpb24gPT4gW2RlZmluaXRpb24uaWQsIGRlZmluaXRpb24uZGVmYXVsdF0pKTtcbn1cbiIsICJpbXBvcnQge1xuICAgIE1ldGFEYXRhLFxuICAgIE1ldGFkYXRhS2V5LFxuICAgIFJFUVVJUkVEX01FVEFEQVRBX0tFWVMsXG4gICAgQUxMX01FVEFEQVRBX0tFWVMsXG59IGZyb20gXCIuLi9pbnRlcmZhY2VzL01ldGFEYXRhXCI7XG5pbXBvcnQgeyBQbHVnaW5PcHRpb25EZWZpbml0aW9uIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvUGx1Z2luT3B0aW9uXCI7XG5pbXBvcnQgeyB2YWxpZGF0ZVBsdWdpbk9wdGlvbkRlZmluaXRpb24gfSBmcm9tIFwiLi9QbHVnaW5PcHRpb25TY2hlbWFcIjtcbmltcG9ydCBsb2dnZXIgZnJvbSBcIi4vbG9nZ2VyXCI7XG5cbmNsYXNzIEV4dHJhY3RNZXRhRGF0YSB7XG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgTUFYX1BMVUdJTl9PUFRJT05TID0gMzI7XG5cbiAgICAvKipcbiAgICAgKiBQYXJzZSBtZXRhZGF0YSBmcm9tIGEgY29tbWVudCBibG9jayBpbiB0aGUgZm9ybWF0OlxuICAgICAqIC8qKiBAa2V5IHZhbHVlICpcXC9cbiAgICAqL1xuICAgIHByaXZhdGUgc3RhdGljIHBhcnNlTWV0YWRhdGFGcm9tQ29udGVudChjb250ZW50OiBzdHJpbmcpOiBNZXRhRGF0YSB8IG51bGwge1xuICAgICAgICBjb25zdCBibG9ja01hdGNoID0gY29udGVudC5tYXRjaCgvXFwvXFwqXFwqKFtcXHNcXFNdKj8pXFwqXFwvLyk7XG4gICAgICAgIGlmICghYmxvY2tNYXRjaCkgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgY29uc3QgcmVzdWx0OiBQYXJ0aWFsPE1ldGFEYXRhPiA9IHt9O1xuICAgICAgICBjb25zdCB0YWdSZWdleCA9IC9AKFxcdyspXFxzKyhbXlxcblxccl0rKS9nO1xuXG4gICAgICAgIGZvciAoY29uc3QgWywgcmF3S2V5LCByYXdWYWx1ZV0gb2YgYmxvY2tNYXRjaFsxXS5tYXRjaEFsbCh0YWdSZWdleCkpIHtcbiAgICAgICAgICAgIGlmICghQUxMX01FVEFEQVRBX0tFWVMuaW5jbHVkZXMocmF3S2V5IGFzIE1ldGFkYXRhS2V5KSkgY29udGludWU7XG5cbiAgICAgICAgICAgIGNvbnN0IGtleSA9IHJhd0tleSBhcyBNZXRhZGF0YUtleTtcblxuICAgICAgICAgICAgaWYgKHJlc3VsdFtrZXldICE9PSB1bmRlZmluZWQpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICByZXN1bHRba2V5XSA9IHJhd1ZhbHVlLnRyaW0oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG9wdGlvbnM6IFBsdWdpbk9wdGlvbkRlZmluaXRpb25bXSA9IFtdO1xuICAgICAgICBjb25zdCBvcHRpb25JZHMgPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgICAgICAgY29uc3Qgb3B0aW9uUmVnZXggPSAvQG9wdGlvblxccysoW15cXG5cXHJdKykvZztcblxuICAgICAgICBmb3IgKGNvbnN0IFssIHJhd09wdGlvbl0gb2YgYmxvY2tNYXRjaFsxXS5tYXRjaEFsbChvcHRpb25SZWdleCkpIHtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmxlbmd0aCA+PSB0aGlzLk1BWF9QTFVHSU5fT1BUSU9OUykge1xuICAgICAgICAgICAgICAgIGxvZ2dlci53YXJuKGBJZ25vcmluZyBwbHVnaW4gb3B0aW9ucyBhZnRlciB0aGUgZmlyc3QgJHt0aGlzLk1BWF9QTFVHSU5fT1BUSU9OU31gKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCBvcHRpb24gPSB2YWxpZGF0ZVBsdWdpbk9wdGlvbkRlZmluaXRpb24oSlNPTi5wYXJzZShyYXdPcHRpb24udHJpbSgpKSk7XG4gICAgICAgICAgICAgICAgaWYgKCFvcHRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgbG9nZ2VyLndhcm4oYElnbm9yaW5nIGludmFsaWQgcGx1Z2luIG9wdGlvbjogJHtyYXdPcHRpb24udHJpbSgpfWApO1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbklkcy5oYXMob3B0aW9uLmlkKSkge1xuICAgICAgICAgICAgICAgICAgICBsb2dnZXIud2FybihgSWdub3JpbmcgZHVwbGljYXRlIHBsdWdpbiBvcHRpb24gaWQ6ICR7b3B0aW9uLmlkfWApO1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBvcHRpb25JZHMuYWRkKG9wdGlvbi5pZCk7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5wdXNoKG9wdGlvbik7XG4gICAgICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAgICAgICBsb2dnZXIud2FybihgSWdub3JpbmcgbWFsZm9ybWVkIHBsdWdpbiBvcHRpb24gSlNPTjogJHtyYXdPcHRpb24udHJpbSgpfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9wdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmVzdWx0Lm9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgUkVRVUlSRURfTUVUQURBVEFfS0VZUykge1xuICAgICAgICAgICAgaWYgKCFyZXN1bHRba2V5XSkgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0IGFzIE1ldGFEYXRhO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZXh0cmFjdE1ldGFkYXRhRnJvbVRleHQodGV4dENvbnRlbnQ6IHN0cmluZyk6IE1ldGFEYXRhIHwgbnVsbCB7XG4gICAgICAgIGNvbnN0IG1ldGFkYXRhID0gdGhpcy5wYXJzZU1ldGFkYXRhRnJvbUNvbnRlbnQodGV4dENvbnRlbnQpO1xuICAgICAgICBcbiAgICAgICAgaWYgKCFtZXRhZGF0YSkge1xuICAgICAgICAgICAgbG9nZ2VyLmVycm9yKCdDb21tZW50IGJsb2NrIG5vdCBmb3VuZCBpbiB0aGUgcHJvdmlkZWQgdGV4dCcpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gbWV0YWRhdGE7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBFeHRyYWN0TWV0YURhdGE7XG4iLCAiaW1wb3J0IHsgRklMRV9FWFRFTlNJT05TLCBTVE9SQUdFX0tFWVMgfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQge1xuICAgIFBsdWdpbk9wdGlvbkRlZmluaXRpb24sXG4gICAgUGx1Z2luT3B0aW9uVmFsdWVzLFxufSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9QbHVnaW5PcHRpb25cIjtcbmltcG9ydCB7XG4gICAgZ2V0UGx1Z2luT3B0aW9uRGVmYXVsdHMsXG4gICAgbm9ybWFsaXplUGx1Z2luT3B0aW9uVmFsdWUsXG59IGZyb20gXCIuLi91dGlscy9QbHVnaW5PcHRpb25TY2hlbWFcIjtcbmltcG9ydCB7IGdldExvZ2dlciB9IGZyb20gXCIuLi91dGlscy9sb2dnZXJcIjtcblxuY2xhc3MgUGx1Z2luT3B0aW9ucyB7XG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgbG9nZ2VyID0gZ2V0TG9nZ2VyKFwiUGx1Z2luT3B0aW9uc1wiKTtcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBzY2hlbWFzID0gbmV3IE1hcDxzdHJpbmcsIFBsdWdpbk9wdGlvbkRlZmluaXRpb25bXT4oKTtcblxuICAgIHByaXZhdGUgc3RhdGljIGlzU2FmZVBsdWdpbkZpbGVOYW1lKHBsdWdpbkZpbGU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgL15bQS1aYS16MC05Ll8tXSskLy50ZXN0KHBsdWdpbkZpbGUpICYmXG4gICAgICAgICAgICBwbHVnaW5GaWxlLmVuZHNXaXRoKEZJTEVfRVhURU5TSU9OUy5QTFVHSU4pXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0U3RvcmFnZUtleShwbHVnaW5GaWxlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYCR7U1RPUkFHRV9LRVlTLlBMVUdJTl9PUFRJT05TX1BSRUZJWH0ke3BsdWdpbkZpbGV9YDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBjbG9uZURlZmluaXRpb25zKGRlZmluaXRpb25zOiBQbHVnaW5PcHRpb25EZWZpbml0aW9uW10pOiBQbHVnaW5PcHRpb25EZWZpbml0aW9uW10ge1xuICAgICAgICByZXR1cm4gZGVmaW5pdGlvbnMubWFwKGRlZmluaXRpb24gPT4gKFxuICAgICAgICAgICAgZGVmaW5pdGlvbi50eXBlID09PSBcInNlbGVjdFwiXG4gICAgICAgICAgICAgICAgPyB7IC4uLmRlZmluaXRpb24sIGNob2ljZXM6IGRlZmluaXRpb24uY2hvaWNlcy5tYXAoY2hvaWNlID0+ICh7IC4uLmNob2ljZSB9KSkgfVxuICAgICAgICAgICAgICAgIDogeyAuLi5kZWZpbml0aW9uIH1cbiAgICAgICAgKSk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyByZWdpc3RlcihwbHVnaW5GaWxlOiBzdHJpbmcsIGRlZmluaXRpb25zOiBQbHVnaW5PcHRpb25EZWZpbml0aW9uW10gPSBbXSk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoIXRoaXMuaXNTYWZlUGx1Z2luRmlsZU5hbWUocGx1Z2luRmlsZSkpIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLndhcm4oYFJlZnVzZWQgdG8gcmVnaXN0ZXIgb3B0aW9ucyBmb3IgdW5zYWZlIHBsdWdpbiBmaWxlbmFtZTogJHtwbHVnaW5GaWxlfWApO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zY2hlbWFzLnNldChwbHVnaW5GaWxlLCB0aGlzLmNsb25lRGVmaW5pdGlvbnMoZGVmaW5pdGlvbnMpKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBoYXNPcHRpb25zKHBsdWdpbkZpbGU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gKHRoaXMuc2NoZW1hcy5nZXQocGx1Z2luRmlsZSk/Lmxlbmd0aCA/PyAwKSA+IDA7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXREZWZpbml0aW9ucyhwbHVnaW5GaWxlOiBzdHJpbmcpOiBQbHVnaW5PcHRpb25EZWZpbml0aW9uW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZURlZmluaXRpb25zKHRoaXMuc2NoZW1hcy5nZXQocGx1Z2luRmlsZSkgPz8gW10pO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0KHBsdWdpbkZpbGU6IHN0cmluZyk6IFBsdWdpbk9wdGlvblZhbHVlcyB7XG4gICAgICAgIGlmICghdGhpcy5pc1NhZmVQbHVnaW5GaWxlTmFtZShwbHVnaW5GaWxlKSkgcmV0dXJuIHt9O1xuXG4gICAgICAgIGNvbnN0IGRlZmluaXRpb25zID0gdGhpcy5zY2hlbWFzLmdldChwbHVnaW5GaWxlKSA/PyBbXTtcbiAgICAgICAgY29uc3QgdmFsdWVzID0gZ2V0UGx1Z2luT3B0aW9uRGVmYXVsdHMoZGVmaW5pdGlvbnMpO1xuICAgICAgICBpZiAoZGVmaW5pdGlvbnMubGVuZ3RoID09PSAwKSByZXR1cm4gdmFsdWVzO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByYXdWYWx1ZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKHRoaXMuZ2V0U3RvcmFnZUtleShwbHVnaW5GaWxlKSk7XG4gICAgICAgICAgICBpZiAoIXJhd1ZhbHVlKSByZXR1cm4gdmFsdWVzO1xuXG4gICAgICAgICAgICBjb25zdCBzdG9yZWRWYWx1ZTogdW5rbm93biA9IEpTT04ucGFyc2UocmF3VmFsdWUpO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBzdG9yZWRWYWx1ZSAhPT0gXCJvYmplY3RcIiB8fCBzdG9yZWRWYWx1ZSA9PT0gbnVsbCB8fCBBcnJheS5pc0FycmF5KHN0b3JlZFZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZXM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IHN0b3JlZE9wdGlvbnMgPSBzdG9yZWRWYWx1ZSBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcbiAgICAgICAgICAgIGZvciAoY29uc3QgZGVmaW5pdGlvbiBvZiBkZWZpbml0aW9ucykge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSBub3JtYWxpemVQbHVnaW5PcHRpb25WYWx1ZShkZWZpbml0aW9uLCBzdG9yZWRPcHRpb25zW2RlZmluaXRpb24uaWRdKTtcbiAgICAgICAgICAgICAgICBpZiAobm9ybWFsaXplZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlc1tkZWZpbml0aW9uLmlkXSA9IG5vcm1hbGl6ZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIud2FybihgRmFpbGVkIHRvIHJlYWQgb3B0aW9ucyBmb3IgJHtwbHVnaW5GaWxlfTogJHtlcnJvcn1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB2YWx1ZXM7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBzYXZlKHBsdWdpbkZpbGU6IHN0cmluZywgY2FuZGlkYXRlVmFsdWVzOiBQbHVnaW5PcHRpb25WYWx1ZXMpOiBQbHVnaW5PcHRpb25WYWx1ZXMge1xuICAgICAgICBpZiAoIXRoaXMuaXNTYWZlUGx1Z2luRmlsZU5hbWUocGx1Z2luRmlsZSkpIHJldHVybiB7fTtcblxuICAgICAgICBjb25zdCBkZWZpbml0aW9ucyA9IHRoaXMuc2NoZW1hcy5nZXQocGx1Z2luRmlsZSkgPz8gW107XG4gICAgICAgIGlmIChkZWZpbml0aW9ucy5sZW5ndGggPT09IDApIHJldHVybiB7fTtcblxuICAgICAgICBjb25zdCBub3JtYWxpemVkVmFsdWVzID0gZ2V0UGx1Z2luT3B0aW9uRGVmYXVsdHMoZGVmaW5pdGlvbnMpO1xuICAgICAgICBjb25zdCBvdmVycmlkZXM6IFBsdWdpbk9wdGlvblZhbHVlcyA9IHt9O1xuXG4gICAgICAgIGZvciAoY29uc3QgZGVmaW5pdGlvbiBvZiBkZWZpbml0aW9ucykge1xuICAgICAgICAgICAgY29uc3Qgbm9ybWFsaXplZCA9IG5vcm1hbGl6ZVBsdWdpbk9wdGlvblZhbHVlKGRlZmluaXRpb24sIGNhbmRpZGF0ZVZhbHVlc1tkZWZpbml0aW9uLmlkXSk7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IG5vcm1hbGl6ZWQgPz8gZGVmaW5pdGlvbi5kZWZhdWx0O1xuICAgICAgICAgICAgbm9ybWFsaXplZFZhbHVlc1tkZWZpbml0aW9uLmlkXSA9IHZhbHVlO1xuXG4gICAgICAgICAgICBpZiAodmFsdWUgIT09IGRlZmluaXRpb24uZGVmYXVsdCkge1xuICAgICAgICAgICAgICAgIG92ZXJyaWRlc1tkZWZpbml0aW9uLmlkXSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHN0b3JhZ2VLZXkgPSB0aGlzLmdldFN0b3JhZ2VLZXkocGx1Z2luRmlsZSk7XG4gICAgICAgICAgICBpZiAoT2JqZWN0LmtleXMob3ZlcnJpZGVzKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShzdG9yYWdlS2V5KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oc3RvcmFnZUtleSwgSlNPTi5zdHJpbmdpZnkob3ZlcnJpZGVzKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcihgRmFpbGVkIHRvIHNhdmUgb3B0aW9ucyBmb3IgJHtwbHVnaW5GaWxlfTogJHtlcnJvcn1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBub3JtYWxpemVkVmFsdWVzO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgcmVzZXQocGx1Z2luRmlsZTogc3RyaW5nKTogUGx1Z2luT3B0aW9uVmFsdWVzIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzU2FmZVBsdWdpbkZpbGVOYW1lKHBsdWdpbkZpbGUpKSByZXR1cm4ge307XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKHRoaXMuZ2V0U3RvcmFnZUtleShwbHVnaW5GaWxlKSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci53YXJuKGBGYWlsZWQgdG8gcmVzZXQgb3B0aW9ucyBmb3IgJHtwbHVnaW5GaWxlfTogJHtlcnJvcn1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBnZXRQbHVnaW5PcHRpb25EZWZhdWx0cyh0aGlzLnNjaGVtYXMuZ2V0KHBsdWdpbkZpbGUpID8/IFtdKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHJlbW92ZShwbHVnaW5GaWxlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yZXNldChwbHVnaW5GaWxlKTtcbiAgICAgICAgdGhpcy5zY2hlbWFzLmRlbGV0ZShwbHVnaW5GaWxlKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBsdWdpbk9wdGlvbnM7XG4iLCAiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVsb2FkQXBwbGljYXRpb24oKTogdm9pZCB7XG4gICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xufVxuIiwgImltcG9ydCB7IEZJTEVfRVhURU5TSU9OUyB9IGZyb20gXCIuLi9jb25zdGFudHNcIjtcblxuZXhwb3J0IHR5cGUgTW9kRmlsZVR5cGUgPSBcInBsdWdpblwiIHwgXCJ0aGVtZVwiO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNTYWZlTW9kRmlsZU5hbWUoZmlsZU5hbWU6IHN0cmluZywgdHlwZTogTW9kRmlsZVR5cGUpOiBib29sZWFuIHtcbiAgICBjb25zdCBleHRlbnNpb24gPSB0eXBlID09PSBcInRoZW1lXCJcbiAgICAgICAgPyBGSUxFX0VYVEVOU0lPTlMuVEhFTUVcbiAgICAgICAgOiBGSUxFX0VYVEVOU0lPTlMuUExVR0lOO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgZmlsZU5hbWUubGVuZ3RoID4gZXh0ZW5zaW9uLmxlbmd0aCAmJlxuICAgICAgICBmaWxlTmFtZS5sZW5ndGggPD0gMjU1ICYmXG4gICAgICAgIGZpbGVOYW1lLmVuZHNXaXRoKGV4dGVuc2lvbikgJiZcbiAgICAgICAgL15bQS1aYS16MC05Ll8tXSskLy50ZXN0KGZpbGVOYW1lKVxuICAgICk7XG59XG4iLCAiaW1wb3J0IFBsdWdpbk9wdGlvbnMgZnJvbSBcIi4uLy4uL2NvcmUvUGx1Z2luT3B0aW9uc1wiO1xuaW1wb3J0IHtcbiAgICBQbHVnaW5PcHRpb25EZWZpbml0aW9uLFxuICAgIFBsdWdpbk9wdGlvblZhbHVlcyxcbn0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvUGx1Z2luT3B0aW9uXCI7XG5cbmNvbnN0IFNUWUxFX0lEID0gXCJzdHJlbWlvLWVuaGFuY2VkLXBsdWdpbi1vcHRpb25zLXN0eWxlXCI7XG5sZXQgbmV4dFBhbmVsSWQgPSAwO1xuXG5mdW5jdGlvbiBlbnN1cmVTdHlsZXMoKTogdm9pZCB7XG4gICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFNUWUxFX0lEKSkgcmV0dXJuO1xuXG4gICAgY29uc3Qgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gICAgc3R5bGUuaWQgPSBTVFlMRV9JRDtcbiAgICBzdHlsZS50ZXh0Q29udGVudCA9IGBcbiAgICAgICAgLnNlLXBsdWdpbi1vcHRpb25zLWJ1dHRvbixcbiAgICAgICAgLnNlLXBsdWdpbi1vcHRpb25zLWFjdGlvbiB7XG4gICAgICAgICAgICBib3JkZXI6IDA7XG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiAuMzVyZW07XG4gICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgICAgICBwYWRkaW5nOiAuNTVyZW0gLjg1cmVtO1xuICAgICAgICAgICAgY29sb3I6IHdoaXRlO1xuICAgICAgICAgICAgYmFja2dyb3VuZDogdmFyKC0tc2Vjb25kYXJ5LWFjY2VudC1jb2xvciwgIzViNGJkOCk7XG4gICAgICAgIH1cbiAgICAgICAgLnNlLXBsdWdpbi1vcHRpb25zLXBhbmVsIHtcbiAgICAgICAgICAgIG1hcmdpbjogLS41cmVtIDAgMXJlbTtcbiAgICAgICAgICAgIHBhZGRpbmc6IDFyZW07XG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiAuNXJlbTtcbiAgICAgICAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IHZhcigtLXNlY29uZGFyeS1iYWNrZ3JvdW5kLWNvbG9yLCByZ2JhKDIwLCAyMCwgMjgsIC45NikpO1xuICAgICAgICB9XG4gICAgICAgIC5zZS1wbHVnaW4tb3B0aW9ucy1wYW5lbFtoaWRkZW5dIHsgZGlzcGxheTogbm9uZTsgfVxuICAgICAgICAuc2UtcGx1Z2luLW9wdGlvbnMtZmllbGQgeyBkaXNwbGF5OiBncmlkOyBnYXA6IC4zNXJlbTsgbWFyZ2luLWJvdHRvbTogLjlyZW07IH1cbiAgICAgICAgLnNlLXBsdWdpbi1vcHRpb25zLWZpZWxkIGlucHV0Om5vdChbdHlwZT1cImNoZWNrYm94XCJdKSxcbiAgICAgICAgLnNlLXBsdWdpbi1vcHRpb25zLWZpZWxkIHNlbGVjdCB7XG4gICAgICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICBwYWRkaW5nOiAuNTVyZW07XG4gICAgICAgICAgICBjb2xvcjogaW5oZXJpdDtcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IHZhcigtLXByaW1hcnktYmFja2dyb3VuZC1jb2xvciwgIzE3MTcxZik7XG4gICAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIC4yNSk7XG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiAuMzVyZW07XG4gICAgICAgIH1cbiAgICAgICAgLnNlLXBsdWdpbi1vcHRpb25zLWRlc2NyaXB0aW9uIHsgb3BhY2l0eTogLjc1OyBmb250LXNpemU6IC45ZW07IH1cbiAgICAgICAgLnNlLXBsdWdpbi1vcHRpb25zLWFjdGlvbnMgeyBkaXNwbGF5OiBmbGV4OyBnYXA6IC42cmVtOyBmbGV4LXdyYXA6IHdyYXA7IH1cbiAgICAgICAgLnNlLXBsdWdpbi1vcHRpb25zLWFjdGlvbltkYXRhLWtpbmQ9XCJjYW5jZWxcIl0geyBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDsgYm9yZGVyOiAxcHggc29saWQgcmdiYSgyNTUsMjU1LDI1NSwuMzUpOyB9XG4gICAgYDtcbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlT3B0aW9uSW5wdXQoXG4gICAgZGVmaW5pdGlvbjogUGx1Z2luT3B0aW9uRGVmaW5pdGlvbixcbiAgICBpbnB1dElkOiBzdHJpbmdcbik6IEhUTUxJbnB1dEVsZW1lbnQgfCBIVE1MU2VsZWN0RWxlbWVudCB7XG4gICAgaWYgKGRlZmluaXRpb24udHlwZSA9PT0gXCJzZWxlY3RcIikge1xuICAgICAgICBjb25zdCBzZWxlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIpO1xuICAgICAgICBzZWxlY3QuaWQgPSBpbnB1dElkO1xuICAgICAgICBmb3IgKGNvbnN0IGNob2ljZSBvZiBkZWZpbml0aW9uLmNob2ljZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG4gICAgICAgICAgICBvcHRpb24udmFsdWUgPSBjaG9pY2UudmFsdWU7XG4gICAgICAgICAgICBvcHRpb24udGV4dENvbnRlbnQgPSBjaG9pY2UubGFiZWw7XG4gICAgICAgICAgICBzZWxlY3QuYXBwZW5kQ2hpbGQob3B0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2VsZWN0O1xuICAgIH1cblxuICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIGlucHV0LmlkID0gaW5wdXRJZDtcbiAgICBpbnB1dC50eXBlID0gZGVmaW5pdGlvbi50eXBlID09PSBcImJvb2xlYW5cIiA/IFwiY2hlY2tib3hcIiA6IGRlZmluaXRpb24udHlwZTtcblxuICAgIGlmIChkZWZpbml0aW9uLnR5cGUgPT09IFwidGV4dFwiKSB7XG4gICAgICAgIGlmIChkZWZpbml0aW9uLnBsYWNlaG9sZGVyICE9PSB1bmRlZmluZWQpIGlucHV0LnBsYWNlaG9sZGVyID0gZGVmaW5pdGlvbi5wbGFjZWhvbGRlcjtcbiAgICAgICAgaWYgKGRlZmluaXRpb24ubWF4TGVuZ3RoICE9PSB1bmRlZmluZWQpIGlucHV0Lm1heExlbmd0aCA9IGRlZmluaXRpb24ubWF4TGVuZ3RoO1xuICAgIH0gZWxzZSBpZiAoZGVmaW5pdGlvbi50eXBlID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgIGlmIChkZWZpbml0aW9uLm1pbiAhPT0gdW5kZWZpbmVkKSBpbnB1dC5taW4gPSBTdHJpbmcoZGVmaW5pdGlvbi5taW4pO1xuICAgICAgICBpZiAoZGVmaW5pdGlvbi5tYXggIT09IHVuZGVmaW5lZCkgaW5wdXQubWF4ID0gU3RyaW5nKGRlZmluaXRpb24ubWF4KTtcbiAgICAgICAgaWYgKGRlZmluaXRpb24uc3RlcCAhPT0gdW5kZWZpbmVkKSBpbnB1dC5zdGVwID0gU3RyaW5nKGRlZmluaXRpb24uc3RlcCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGlucHV0O1xufVxuXG5mdW5jdGlvbiBzZXRJbnB1dFZhbHVlKFxuICAgIGlucHV0OiBIVE1MSW5wdXRFbGVtZW50IHwgSFRNTFNlbGVjdEVsZW1lbnQsXG4gICAgZGVmaW5pdGlvbjogUGx1Z2luT3B0aW9uRGVmaW5pdGlvbixcbiAgICB2YWx1ZTogYm9vbGVhbiB8IHN0cmluZyB8IG51bWJlclxuKTogdm9pZCB7XG4gICAgaWYgKGRlZmluaXRpb24udHlwZSA9PT0gXCJib29sZWFuXCIgJiYgaW5wdXQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSB7XG4gICAgICAgIGlucHV0LmNoZWNrZWQgPSB2YWx1ZSA9PT0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBpbnB1dC52YWx1ZSA9IFN0cmluZyh2YWx1ZSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiByZWFkSW5wdXRWYWx1ZShcbiAgICBpbnB1dDogSFRNTElucHV0RWxlbWVudCB8IEhUTUxTZWxlY3RFbGVtZW50LFxuICAgIGRlZmluaXRpb246IFBsdWdpbk9wdGlvbkRlZmluaXRpb25cbik6IGJvb2xlYW4gfCBzdHJpbmcgfCBudW1iZXIge1xuICAgIGlmIChkZWZpbml0aW9uLnR5cGUgPT09IFwiYm9vbGVhblwiICYmIGlucHV0IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCkge1xuICAgICAgICByZXR1cm4gaW5wdXQuY2hlY2tlZDtcbiAgICB9XG4gICAgaWYgKGRlZmluaXRpb24udHlwZSA9PT0gXCJudW1iZXJcIiAmJiBpbnB1dCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIE51bWJlci5pc0Zpbml0ZShpbnB1dC52YWx1ZUFzTnVtYmVyKSA/IGlucHV0LnZhbHVlQXNOdW1iZXIgOiBkZWZpbml0aW9uLmRlZmF1bHQ7XG4gICAgfVxuICAgIHJldHVybiBpbnB1dC52YWx1ZTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBNb3VudFBsdWdpbk9wdGlvbnNQYXJhbXMge1xuICAgIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQ7XG4gICAgYWN0aW9uQ29udGFpbmVyOiBIVE1MRWxlbWVudDtcbiAgICBwbHVnaW5GaWxlOiBzdHJpbmc7XG4gICAgZGVmaW5pdGlvbnM6IFBsdWdpbk9wdGlvbkRlZmluaXRpb25bXTtcbiAgICBpc0VuYWJsZWQ6ICgpID0+IGJvb2xlYW47XG4gICAgcmVsb2FkPzogKCkgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1vdW50UGx1Z2luT3B0aW9ucyh7XG4gICAgY29udGFpbmVyLFxuICAgIGFjdGlvbkNvbnRhaW5lcixcbiAgICBwbHVnaW5GaWxlLFxuICAgIGRlZmluaXRpb25zLFxuICAgIGlzRW5hYmxlZCxcbiAgICByZWxvYWQgPSAoKSA9PiB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCksXG59OiBNb3VudFBsdWdpbk9wdGlvbnNQYXJhbXMpOiB2b2lkIHtcbiAgICBpZiAoZGVmaW5pdGlvbnMubGVuZ3RoID09PSAwKSByZXR1cm47XG4gICAgaWYgKGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtc3RyZW1pby1lbmhhbmNlZC1wbHVnaW4tb3B0aW9uc11cIikpIHJldHVybjtcblxuICAgIGVuc3VyZVN0eWxlcygpO1xuXG4gICAgbmV4dFBhbmVsSWQgKz0gMTtcbiAgICBjb25zdCBwYW5lbElkID0gYHNlLXBsdWdpbi1vcHRpb25zLSR7bmV4dFBhbmVsSWR9YDtcbiAgICBjb25zdCB0b2dnbGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIHRvZ2dsZUJ1dHRvbi50eXBlID0gXCJidXR0b25cIjtcbiAgICB0b2dnbGVCdXR0b24uY2xhc3NOYW1lID0gXCJzZS1wbHVnaW4tb3B0aW9ucy1idXR0b25cIjtcbiAgICB0b2dnbGVCdXR0b24udGV4dENvbnRlbnQgPSBcIk9wdGlvbnNcIjtcbiAgICB0b2dnbGVCdXR0b24uc2V0QXR0cmlidXRlKFwiYXJpYS1jb250cm9sc1wiLCBwYW5lbElkKTtcbiAgICB0b2dnbGVCdXR0b24uc2V0QXR0cmlidXRlKFwiYXJpYS1leHBhbmRlZFwiLCBcImZhbHNlXCIpO1xuICAgIGFjdGlvbkNvbnRhaW5lci5hcHBlbmRDaGlsZCh0b2dnbGVCdXR0b24pO1xuXG4gICAgY29uc3QgcGFuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKTtcbiAgICBwYW5lbC5pZCA9IHBhbmVsSWQ7XG4gICAgcGFuZWwuY2xhc3NOYW1lID0gXCJzZS1wbHVnaW4tb3B0aW9ucy1wYW5lbFwiO1xuICAgIHBhbmVsLmRhdGFzZXQuc3RyZW1pb0VuaGFuY2VkUGx1Z2luT3B0aW9ucyA9IHBsdWdpbkZpbGU7XG4gICAgcGFuZWwuaGlkZGVuID0gdHJ1ZTtcblxuICAgIGNvbnN0IGNvbnRyb2xzID0gbmV3IE1hcDxzdHJpbmcsIEhUTUxJbnB1dEVsZW1lbnQgfCBIVE1MU2VsZWN0RWxlbWVudD4oKTtcbiAgICBmb3IgKGNvbnN0IGRlZmluaXRpb24gb2YgZGVmaW5pdGlvbnMpIHtcbiAgICAgICAgY29uc3QgZmllbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBmaWVsZC5jbGFzc05hbWUgPSBcInNlLXBsdWdpbi1vcHRpb25zLWZpZWxkXCI7XG5cbiAgICAgICAgY29uc3QgaW5wdXRJZCA9IGAke3BhbmVsSWR9LSR7ZGVmaW5pdGlvbi5pZH1gO1xuICAgICAgICBjb25zdCBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcbiAgICAgICAgbGFiZWwuaHRtbEZvciA9IGlucHV0SWQ7XG4gICAgICAgIGxhYmVsLnRleHRDb250ZW50ID0gZGVmaW5pdGlvbi5sYWJlbDtcblxuICAgICAgICBjb25zdCBpbnB1dCA9IGNyZWF0ZU9wdGlvbklucHV0KGRlZmluaXRpb24sIGlucHV0SWQpO1xuICAgICAgICBjb250cm9scy5zZXQoZGVmaW5pdGlvbi5pZCwgaW5wdXQpO1xuXG4gICAgICAgIGZpZWxkLmFwcGVuZENoaWxkKGxhYmVsKTtcbiAgICAgICAgaWYgKGRlZmluaXRpb24uZGVzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uLmNsYXNzTmFtZSA9IFwic2UtcGx1Z2luLW9wdGlvbnMtZGVzY3JpcHRpb25cIjtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gZGVmaW5pdGlvbi5kZXNjcmlwdGlvbjtcbiAgICAgICAgICAgIGZpZWxkLmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBmaWVsZC5hcHBlbmRDaGlsZChpbnB1dCk7XG4gICAgICAgIHBhbmVsLmFwcGVuZENoaWxkKGZpZWxkKTtcbiAgICB9XG5cbiAgICBjb25zdCBhY3Rpb25zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBhY3Rpb25zLmNsYXNzTmFtZSA9IFwic2UtcGx1Z2luLW9wdGlvbnMtYWN0aW9uc1wiO1xuXG4gICAgY29uc3Qgc2F2ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgc2F2ZUJ1dHRvbi50eXBlID0gXCJidXR0b25cIjtcbiAgICBzYXZlQnV0dG9uLmNsYXNzTmFtZSA9IFwic2UtcGx1Z2luLW9wdGlvbnMtYWN0aW9uXCI7XG4gICAgc2F2ZUJ1dHRvbi50ZXh0Q29udGVudCA9IFwiU2F2ZVwiO1xuXG4gICAgY29uc3QgcmVzZXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIHJlc2V0QnV0dG9uLnR5cGUgPSBcImJ1dHRvblwiO1xuICAgIHJlc2V0QnV0dG9uLmNsYXNzTmFtZSA9IFwic2UtcGx1Z2luLW9wdGlvbnMtYWN0aW9uXCI7XG4gICAgcmVzZXRCdXR0b24udGV4dENvbnRlbnQgPSBcIlJlc2V0IHRvIGRlZmF1bHRzXCI7XG5cbiAgICBjb25zdCBjYW5jZWxCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIGNhbmNlbEJ1dHRvbi50eXBlID0gXCJidXR0b25cIjtcbiAgICBjYW5jZWxCdXR0b24uY2xhc3NOYW1lID0gXCJzZS1wbHVnaW4tb3B0aW9ucy1hY3Rpb25cIjtcbiAgICBjYW5jZWxCdXR0b24uZGF0YXNldC5raW5kID0gXCJjYW5jZWxcIjtcbiAgICBjYW5jZWxCdXR0b24udGV4dENvbnRlbnQgPSBcIkNhbmNlbFwiO1xuXG4gICAgYWN0aW9ucy5hcHBlbmQoc2F2ZUJ1dHRvbiwgcmVzZXRCdXR0b24sIGNhbmNlbEJ1dHRvbik7XG4gICAgcGFuZWwuYXBwZW5kQ2hpbGQoYWN0aW9ucyk7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHBhbmVsKTtcblxuICAgIGNvbnN0IHJlbmRlclZhbHVlcyA9ICh2YWx1ZXM6IFBsdWdpbk9wdGlvblZhbHVlcyk6IHZvaWQgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IGRlZmluaXRpb24gb2YgZGVmaW5pdGlvbnMpIHtcbiAgICAgICAgICAgIGNvbnN0IGlucHV0ID0gY29udHJvbHMuZ2V0KGRlZmluaXRpb24uaWQpO1xuICAgICAgICAgICAgaWYgKCFpbnB1dCkgY29udGludWU7XG4gICAgICAgICAgICBzZXRJbnB1dFZhbHVlKGlucHV0LCBkZWZpbml0aW9uLCB2YWx1ZXNbZGVmaW5pdGlvbi5pZF0gPz8gZGVmaW5pdGlvbi5kZWZhdWx0KTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBjbG9zZVBhbmVsID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICBwYW5lbC5oaWRkZW4gPSB0cnVlO1xuICAgICAgICB0b2dnbGVCdXR0b24uc2V0QXR0cmlidXRlKFwiYXJpYS1leHBhbmRlZFwiLCBcImZhbHNlXCIpO1xuICAgIH07XG5cbiAgICB0b2dnbGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGV2ZW50ID0+IHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHBhbmVsLmhpZGRlbiA9ICFwYW5lbC5oaWRkZW47XG4gICAgICAgIHRvZ2dsZUJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJhcmlhLWV4cGFuZGVkXCIsIFN0cmluZyghcGFuZWwuaGlkZGVuKSk7XG4gICAgICAgIGlmICghcGFuZWwuaGlkZGVuKSByZW5kZXJWYWx1ZXMoUGx1Z2luT3B0aW9ucy5nZXQocGx1Z2luRmlsZSkpO1xuICAgIH0pO1xuXG4gICAgY2FuY2VsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjbG9zZVBhbmVsKTtcblxuICAgIHNhdmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgY29uc3QgY2FuZGlkYXRlVmFsdWVzOiBQbHVnaW5PcHRpb25WYWx1ZXMgPSB7fTtcbiAgICAgICAgZm9yIChjb25zdCBkZWZpbml0aW9uIG9mIGRlZmluaXRpb25zKSB7XG4gICAgICAgICAgICBjb25zdCBpbnB1dCA9IGNvbnRyb2xzLmdldChkZWZpbml0aW9uLmlkKTtcbiAgICAgICAgICAgIGlmIChpbnB1dCkgY2FuZGlkYXRlVmFsdWVzW2RlZmluaXRpb24uaWRdID0gcmVhZElucHV0VmFsdWUoaW5wdXQsIGRlZmluaXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgUGx1Z2luT3B0aW9ucy5zYXZlKHBsdWdpbkZpbGUsIGNhbmRpZGF0ZVZhbHVlcyk7XG4gICAgICAgIGNsb3NlUGFuZWwoKTtcbiAgICAgICAgaWYgKGlzRW5hYmxlZCgpKSByZWxvYWQoKTtcbiAgICB9KTtcblxuICAgIHJlc2V0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIHJlbmRlclZhbHVlcyhQbHVnaW5PcHRpb25zLnJlc2V0KHBsdWdpbkZpbGUpKTtcbiAgICAgICAgaWYgKGlzRW5hYmxlZCgpKSByZWxvYWQoKTtcbiAgICB9KTtcbn1cbiIsICJpbXBvcnQgSGVscGVycyBmcm9tIFwiLi4vdXRpbHMvSGVscGVyc1wiO1xuaW1wb3J0IHsgTWV0YURhdGEgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9NZXRhRGF0YVwiO1xuaW1wb3J0IHsgZ2V0UGx1Z2luSXRlbVRlbXBsYXRlIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvcGx1Z2luLWl0ZW0vcGx1Z2luSXRlbVwiO1xuaW1wb3J0IHsgZ2V0VGhlbWVJdGVtVGVtcGxhdGUgfSBmcm9tIFwiLi4vY29tcG9uZW50cy90aGVtZS1pdGVtL3RoZW1lSXRlbVwiO1xuaW1wb3J0IHsgZ2V0RW5oYW5jZWROYXYgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9lbmhhbmNlZC1uYXYvZW5oYW5jZWROYXZcIjtcbmltcG9ydCB7IGdldExvZ2dlciB9IGZyb20gXCIuLi91dGlscy9sb2dnZXJcIjtcbmltcG9ydCBNb2RNYW5hZ2VyIGZyb20gXCIuL01vZE1hbmFnZXJcIjtcbmltcG9ydCB7IFNFTEVDVE9SUywgQ0xBU1NFUywgU1RPUkFHRV9LRVlTIH0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IFBsdWdpbk9wdGlvbnMgZnJvbSBcIi4vUGx1Z2luT3B0aW9uc1wiO1xuaW1wb3J0IHsgbW91bnRQbHVnaW5PcHRpb25zIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvcGx1Z2luLW9wdGlvbnMvcGx1Z2luT3B0aW9uc1wiO1xuXG5jbGFzcyBTZXR0aW5ncyB7XG4gICAgcHJpdmF0ZSBzdGF0aWMgbG9nZ2VyID0gZ2V0TG9nZ2VyKFwiU2V0dGluZ3NcIik7XG5cbiAgICBwcml2YXRlIHN0YXRpYyBnZXRFbmFibGVkUGx1Z2lucygpOiBzdHJpbmdbXSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBzdG9yZWRWYWx1ZTogdW5rbm93biA9IEpTT04ucGFyc2UoXG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLmdldEl0ZW0oU1RPUkFHRV9LRVlTLkVOQUJMRURfUExVR0lOUykgfHwgXCJbXVwiXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkoc3RvcmVkVmFsdWUpXG4gICAgICAgICAgICAgICAgPyBzdG9yZWRWYWx1ZS5maWx0ZXIoKHZhbHVlKTogdmFsdWUgaXMgc3RyaW5nID0+IHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIilcbiAgICAgICAgICAgICAgICA6IFtdO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIud2FybihgRmFpbGVkIHRvIHBhcnNlIGVuYWJsZWQgcGx1Z2luczogJHtlcnJvcn1gKTtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGdldENhdGVnb3J5S2V5KHNlY3Rpb25JZDogc3RyaW5nLCB0aXRsZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGAke3NlY3Rpb25JZH06JHt0aXRsZS50cmltKCkudG9Mb3dlckNhc2UoKX1gO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGdldEV4aXN0aW5nQ2F0ZWdvcnkoc2VjdGlvbjogSFRNTEVsZW1lbnQsIHNlY3Rpb25JZDogc3RyaW5nLCB0aXRsZTogc3RyaW5nKTogSFRNTEVsZW1lbnQgfCBudWxsIHtcbiAgICAgICAgY29uc3QgY2F0ZWdvcnlLZXkgPSB0aGlzLmdldENhdGVnb3J5S2V5KHNlY3Rpb25JZCwgdGl0bGUpO1xuICAgICAgICBjb25zdCBjYXRlZ29yeUJ5S2V5ID0gc2VjdGlvbi5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PihgW2RhdGEtc3RyZW1pby1lbmhhbmNlZC1jYXRlZ29yeT1cIiR7Y2F0ZWdvcnlLZXl9XCJdYCk7XG4gICAgICAgIGlmIChjYXRlZ29yeUJ5S2V5KSByZXR1cm4gY2F0ZWdvcnlCeUtleTtcblxuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbShzZWN0aW9uLmNoaWxkcmVuKS5maW5kKChjaGlsZCk6IGNoaWxkIGlzIEhUTUxFbGVtZW50ID0+IHtcbiAgICAgICAgICAgIGlmICghKGNoaWxkIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICBjb25zdCBsYWJlbCA9IGNoaWxkLnF1ZXJ5U2VsZWN0b3IoU0VMRUNUT1JTLkNBVEVHT1JZX0xBQkVMKTtcbiAgICAgICAgICAgIHJldHVybiBsYWJlbD8udGV4dENvbnRlbnQ/LnRyaW0oKSA9PT0gdGl0bGU7XG4gICAgICAgIH0pID8/IG51bGw7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgZW5zdXJlTmF2SXRlbShzZWN0aW9uSWQ6IHN0cmluZywgdGl0bGU6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLndhaXRGb3JOYXZNZW51KCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBuYXYgPSB0aGlzLmdldE5hdk1lbnUoKTtcbiAgICAgICAgICAgIGNvbnN0IHNob3J0Y3V0c05hdiA9IHRoaXMuZ2V0TmF2U2hvcnRjdXRJdGVtKCk7XG5cbiAgICAgICAgICAgIGlmICghbmF2KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoXCJuYXYgbWVudSBpcyBzdGlsbCBudWxsIGFmdGVyIHdhaXRcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBleGlzdGluZ05hdiA9IG5hdi5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PihgW2RhdGEtc2VjdGlvbj1cIiR7c2VjdGlvbklkfVwiXWApO1xuICAgICAgICAgICAgaWYgKGV4aXN0aW5nTmF2KSB7XG4gICAgICAgICAgICAgICAgZXhpc3RpbmdOYXYuc2V0QXR0cmlidXRlKFwidGl0bGVcIiwgdGl0bGUpO1xuICAgICAgICAgICAgICAgIGV4aXN0aW5nTmF2LnRleHRDb250ZW50ID0gdGl0bGU7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBlbmhhbmNlZE5hdkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICBlbmhhbmNlZE5hdkNvbnRhaW5lci5pbm5lckhUTUwgPSBnZXRFbmhhbmNlZE5hdigpO1xuXG4gICAgICAgICAgICBjb25zdCBjaGlsZFRvQXBwZW5kID0gKGVuaGFuY2VkTmF2Q29udGFpbmVyLmZpcnN0RWxlbWVudENoaWxkIGFzIEhUTUxFbGVtZW50IHwgbnVsbCkgPz8gZW5oYW5jZWROYXZDb250YWluZXI7XG4gICAgICAgICAgICBjaGlsZFRvQXBwZW5kLnNldEF0dHJpYnV0ZShcImRhdGEtc2VjdGlvblwiLCBzZWN0aW9uSWQpO1xuICAgICAgICAgICAgY2hpbGRUb0FwcGVuZC5zZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiLCB0aXRsZSk7XG4gICAgICAgICAgICBjaGlsZFRvQXBwZW5kLnRleHRDb250ZW50ID0gdGl0bGU7XG5cbiAgICAgICAgICAgIGlmIChzaG9ydGN1dHNOYXYgJiYgc2hvcnRjdXRzTmF2LnBhcmVudE5vZGUgPT09IG5hdikge1xuICAgICAgICAgICAgICAgIG5hdi5pbnNlcnRCZWZvcmUoY2hpbGRUb0FwcGVuZCwgc2hvcnRjdXRzTmF2Lm5leHRTaWJsaW5nKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbmF2LmFwcGVuZENoaWxkKGNoaWxkVG9BcHBlbmQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KS5jYXRjaChlcnIgPT4gdGhpcy5sb2dnZXIuZXJyb3IoYEZhaWxlZCB0byBhZGQgbmF2OiAke2Vycn1gKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkIGEgbmV3IHNlY3Rpb24gdG8gdGhlIHNldHRpbmdzIHBhbmVsXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBhZGRTZWN0aW9uKHNlY3Rpb25JZDogc3RyaW5nLCB0aXRsZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMud2FpdEZvclNldHRpbmdzUGFuZWwoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNldHRpbmdzUGFuZWwgPSB0aGlzLmdldFNldHRpbmdzUGFuZWwoKTtcbiAgICAgICAgICAgIGlmICghc2V0dGluZ3NQYW5lbCkgcmV0dXJuO1xuXG4gICAgICAgICAgICBsZXQgc2VjdGlvbkNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNlY3Rpb25JZCkgYXMgSFRNTEVsZW1lbnQgfCBudWxsO1xuXG4gICAgICAgICAgICBpZiAoIXNlY3Rpb25Db250YWluZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKGBBZGRpbmcgc2VjdGlvbjogJHtzZWN0aW9uSWR9IHdpdGggdGl0bGU6ICR7dGl0bGV9YCk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBzZWN0aW9uRWxlbWVudCA9IHRoaXMuZ2V0RXhpc3RpbmdTZWN0aW9uKHNldHRpbmdzUGFuZWwpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxhYmVsRWxlbWVudCA9IHRoaXMuZ2V0RXhpc3RpbmdTZWN0aW9uTGFiZWwoc2VjdGlvbkVsZW1lbnQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFzZWN0aW9uRWxlbWVudCB8fCAhbGFiZWxFbGVtZW50KSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICBjb25zdCBzZWN0aW9uQ2xhc3NOYW1lID0gc2VjdGlvbkVsZW1lbnQuY2xhc3NOYW1lO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRpdGxlQ2xhc3NOYW1lID0gbGFiZWxFbGVtZW50LmNsYXNzTmFtZTtcblxuICAgICAgICAgICAgICAgIHNlY3Rpb25Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgICAgIHNlY3Rpb25Db250YWluZXIuY2xhc3NOYW1lID0gc2VjdGlvbkNsYXNzTmFtZTtcbiAgICAgICAgICAgICAgICBzZWN0aW9uQ29udGFpbmVyLmlkID0gc2VjdGlvbklkO1xuICAgICAgICAgICAgICAgIHNlY3Rpb25Db250YWluZXIuc2V0QXR0cmlidXRlKFwiZGF0YS1zdHJlbWlvLWVuaGFuY2VkLXNlY3Rpb25cIiwgc2VjdGlvbklkKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHNlY3Rpb25UaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICAgICAgc2VjdGlvblRpdGxlLmNsYXNzTmFtZSA9IHRpdGxlQ2xhc3NOYW1lO1xuICAgICAgICAgICAgICAgIHNlY3Rpb25UaXRsZS50ZXh0Q29udGVudCA9IHRpdGxlO1xuXG4gICAgICAgICAgICAgICAgc2VjdGlvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChzZWN0aW9uVGl0bGUpO1xuICAgICAgICAgICAgICAgIHNldHRpbmdzUGFuZWwuYXBwZW5kQ2hpbGQoc2VjdGlvbkNvbnRhaW5lcik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuZW5zdXJlTmF2SXRlbShzZWN0aW9uSWQsIHRpdGxlKTtcbiAgICAgICAgfSkuY2F0Y2goZXJyID0+IHRoaXMubG9nZ2VyLmVycm9yKGBGYWlsZWQgdG8gYWRkIHNlY3Rpb246ICR7ZXJyfWApKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgYSBjYXRlZ29yeSB3aXRoaW4gYSBzZWN0aW9uXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBhZGRDYXRlZ29yeSh0aXRsZTogc3RyaW5nLCBzZWN0aW9uSWQ6IHN0cmluZywgaWNvbjogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMud2FpdEZvclNldHRpbmdzUGFuZWwoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNlY3Rpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzZWN0aW9uSWQpO1xuICAgICAgICAgICAgaWYgKCEoc2VjdGlvbiBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkgcmV0dXJuO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5nZXRFeGlzdGluZ0NhdGVnb3J5KHNlY3Rpb24sIHNlY3Rpb25JZCwgdGl0bGUpKSByZXR1cm47XG5cbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLmluZm8oYEFkZGluZyBjYXRlZ29yeTogJHt0aXRsZX0gdG8gc2VjdGlvbjogJHtzZWN0aW9uSWR9YCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGNhdGVnb3J5VGVtcGxhdGUgPSB0aGlzLmdldENhdGVnb3J5VGVtcGxhdGUoKTtcbiAgICAgICAgICAgIGlmICghY2F0ZWdvcnlUZW1wbGF0ZSkgcmV0dXJuO1xuXG4gICAgICAgICAgICBjb25zdCB7IGNhdGVnb3J5Q2xhc3MsIGNhdGVnb3J5VGl0bGVDbGFzcywgaGVhZGluZ0NsYXNzLCBpY29uQ2xhc3MgfSA9IGNhdGVnb3J5VGVtcGxhdGU7XG5cbiAgICAgICAgICAgIGljb24gPSBpY29uLnJlcGxhY2UoYGNsYXNzPVwiaWNvblwiYCwgYGNsYXNzPVwiJHtpY29uQ2xhc3N9XCJgKTtcblxuICAgICAgICAgICAgY29uc3QgY2F0ZWdvcnlEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgY2F0ZWdvcnlEaXYuY2xhc3NOYW1lID0gY2F0ZWdvcnlDbGFzcztcbiAgICAgICAgICAgIGNhdGVnb3J5RGl2LnNldEF0dHJpYnV0ZShcImRhdGEtc3RyZW1pby1lbmhhbmNlZC1jYXRlZ29yeVwiLCB0aGlzLmdldENhdGVnb3J5S2V5KHNlY3Rpb25JZCwgdGl0bGUpKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3QgdGl0bGVEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgdGl0bGVEaXYuY2xhc3NOYW1lID0gY2F0ZWdvcnlUaXRsZUNsYXNzO1xuICAgICAgICAgICAgdGl0bGVEaXYudGV4dENvbnRlbnQgPSB0aXRsZTtcblxuICAgICAgICAgICAgY29uc3QgaGVhZGluZ0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICAvLyBJZiB3ZSBmb3VuZCBhIGNsYXNzLCB1c2UgaXQuIElmIG5vdCwgZmFsbGJhY2sgdG8gc2VsZWN0b3IgbG9naWMgb3IgZW1wdHlcbiAgICAgICAgICAgIGlmIChoZWFkaW5nQ2xhc3MpIHtcbiAgICAgICAgICAgICAgICBoZWFkaW5nRGl2LmNsYXNzTmFtZSA9IGhlYWRpbmdDbGFzcztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgIGhlYWRpbmdEaXYuY2xhc3NMaXN0LmFkZChTRUxFQ1RPUlMuQ0FURUdPUllfSEVBRElORy5yZXBsYWNlKCcuJywgJycpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaGVhZGluZ0Rpdi5pbm5lckhUTUwgKz0gaWNvbjtcbiAgICAgICAgICAgIGhlYWRpbmdEaXYuYXBwZW5kQ2hpbGQodGl0bGVEaXYpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjYXRlZ29yeURpdi5hcHBlbmRDaGlsZChoZWFkaW5nRGl2KTtcbiAgICAgICAgICAgIHNlY3Rpb24uYXBwZW5kQ2hpbGQoY2F0ZWdvcnlEaXYpO1xuICAgICAgICB9KS5jYXRjaChlcnIgPT4gdGhpcy5sb2dnZXIuZXJyb3IoYEZhaWxlZCB0byBhZGQgY2F0ZWdvcnk6ICR7ZXJyfWApKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgYSBidXR0b24gdG8gdGhlIHNldHRpbmdzXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBhZGRCdXR0b24odGl0bGU6IHN0cmluZywgaWQ6IHN0cmluZywgcXVlcnk6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBIZWxwZXJzLndhaXRGb3JFbG0ocXVlcnkpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKSkgcmV0dXJuO1xuXG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihxdWVyeSk7XG4gICAgICAgICAgICBpZiAoIWVsZW1lbnQpIHJldHVybjtcblxuICAgICAgICAgICAgY29uc3Qgb3B0aW9uRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIG9wdGlvbkRpdi5jbGFzc0xpc3QuYWRkKENMQVNTRVMuT1BUSU9OKTtcblxuICAgICAgICAgICAgY29uc3QgY29udGVudERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICBjb250ZW50RGl2LmNsYXNzTGlzdC5hZGQoQ0xBU1NFUy5DT05URU5UKTtcblxuICAgICAgICAgICAgY29uc3QgYnV0dG9uRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIGJ1dHRvbkRpdi5zZXRBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiLCBcIjBcIik7XG4gICAgICAgICAgICBidXR0b25EaXYuc2V0QXR0cmlidXRlKFwidGl0bGVcIiwgdGl0bGUpO1xuICAgICAgICAgICAgYnV0dG9uRGl2LmNsYXNzTGlzdC5hZGQoQ0xBU1NFUy5CVVRUT04sIENMQVNTRVMuQlVUVE9OX0NPTlRBSU5FUiwgXCJidXR0b25cIik7XG4gICAgICAgICAgICBidXR0b25EaXYuaWQgPSBpZDtcbiAgICAgICAgICAgIGJ1dHRvbkRpdi50ZXh0Q29udGVudCA9IHRpdGxlO1xuXG4gICAgICAgICAgICBjb250ZW50RGl2LmFwcGVuZENoaWxkKGJ1dHRvbkRpdik7XG4gICAgICAgICAgICBvcHRpb25EaXYuYXBwZW5kQ2hpbGQoY29udGVudERpdik7XG4gICAgICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKG9wdGlvbkRpdik7XG4gICAgICAgIH0pLmNhdGNoKGVyciA9PiB0aGlzLmxvZ2dlci5lcnJvcihgRmFpbGVkIHRvIGFkZCBidXR0b246ICR7ZXJyfWApKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgYSB0aGVtZSBvciBwbHVnaW4gaXRlbSB0byB0aGUgc2V0dGluZ3NcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGFkZEl0ZW0odHlwZTogXCJ0aGVtZVwiIHwgXCJwbHVnaW5cIiwgZmlsZU5hbWU6IHN0cmluZywgbWV0YURhdGE6IE1ldGFEYXRhKTogdm9pZCB7XG4gICAgICAgIHRoaXMubG9nZ2VyLmluZm8oYEFkZGluZyAke3R5cGV9OiAke2ZpbGVOYW1lfWApO1xuXG4gICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZShgJHtmaWxlTmFtZX0tYm94YCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAodHlwZSA9PT0gXCJ0aGVtZVwiKSB7XG4gICAgICAgICAgICBIZWxwZXJzLndhaXRGb3JFbG0oU0VMRUNUT1JTLlRIRU1FU19DQVRFR09SWSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRUaGVtZShmaWxlTmFtZSwgbWV0YURhdGEpO1xuICAgICAgICAgICAgfSkuY2F0Y2goZXJyID0+IHRoaXMubG9nZ2VyLmVycm9yKGBGYWlsZWQgdG8gYWRkIHRoZW1lOiAke2Vycn1gKSk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gXCJwbHVnaW5cIikge1xuICAgICAgICAgICAgSGVscGVycy53YWl0Rm9yRWxtKFNFTEVDVE9SUy5QTFVHSU5TX0NBVEVHT1JZKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFBsdWdpbihmaWxlTmFtZSwgbWV0YURhdGEpO1xuICAgICAgICAgICAgfSkuY2F0Y2goZXJyID0+IHRoaXMubG9nZ2VyLmVycm9yKGBGYWlsZWQgdG8gYWRkIHBsdWdpbjogJHtlcnJ9YCkpO1xuICAgICAgICB9ICAgICAgICBcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBhZGRQbHVnaW4oZmlsZU5hbWU6IHN0cmluZywgbWV0YURhdGE6IE1ldGFEYXRhKTogdm9pZCB7XG4gICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZShgJHtmaWxlTmFtZX0tYm94YCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZW5hYmxlZFBsdWdpbnMgPSB0aGlzLmdldEVuYWJsZWRQbHVnaW5zKCk7XG4gICAgICAgIFBsdWdpbk9wdGlvbnMucmVnaXN0ZXIoZmlsZU5hbWUsIG1ldGFEYXRhLm9wdGlvbnMgPz8gW10pO1xuXG4gICAgICAgIGNvbnN0IHBsdWdpbkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHBsdWdpbkNvbnRhaW5lci5pbm5lckhUTUwgPSBnZXRQbHVnaW5JdGVtVGVtcGxhdGUoZmlsZU5hbWUsIG1ldGFEYXRhLCBlbmFibGVkUGx1Z2lucy5pbmNsdWRlcyhmaWxlTmFtZSkpO1xuICAgICAgICBwbHVnaW5Db250YWluZXIuc2V0QXR0cmlidXRlKFwibmFtZVwiLCBgJHtmaWxlTmFtZX0tYm94YCk7XG4gICAgICAgIHBsdWdpbkNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoXCJkYXRhLXN0cmVtaW8tZW5oYW5jZWQtaXRlbVwiLCBmaWxlTmFtZSk7XG5cbiAgICAgICAgY29uc3QgcGx1Z2luc0NhdGVnb3J5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihTRUxFQ1RPUlMuUExVR0lOU19DQVRFR09SWSk7XG4gICAgICAgIHBsdWdpbnNDYXRlZ29yeT8uYXBwZW5kQ2hpbGQocGx1Z2luQ29udGFpbmVyKTtcblxuICAgICAgICBjb25zdCBhY3Rpb25Db250YWluZXIgPSBwbHVnaW5Db250YWluZXIucXVlcnlTZWxlY3RvcjxIVE1MRWxlbWVudD4oXG4gICAgICAgICAgICBcIltkYXRhLXN0cmVtaW8tZW5oYW5jZWQtcGx1Z2luLWFjdGlvbnNdXCJcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgcGx1Z2luVG9nZ2xlID0gcGx1Z2luQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KFwiLnBsdWdpblwiKTtcbiAgICAgICAgaWYgKHBsdWdpblRvZ2dsZSkge1xuICAgICAgICAgICAgTW9kTWFuYWdlci5iaW5kUGx1Z2luVG9nZ2xlKHBsdWdpblRvZ2dsZSwgZmlsZU5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhY3Rpb25Db250YWluZXIgJiYgcGx1Z2luVG9nZ2xlICYmIG1ldGFEYXRhLm9wdGlvbnM/Lmxlbmd0aCkge1xuICAgICAgICAgICAgbW91bnRQbHVnaW5PcHRpb25zKHtcbiAgICAgICAgICAgICAgICBjb250YWluZXI6IHBsdWdpbkNvbnRhaW5lcixcbiAgICAgICAgICAgICAgICBhY3Rpb25Db250YWluZXIsXG4gICAgICAgICAgICAgICAgcGx1Z2luRmlsZTogZmlsZU5hbWUsXG4gICAgICAgICAgICAgICAgZGVmaW5pdGlvbnM6IG1ldGFEYXRhLm9wdGlvbnMsXG4gICAgICAgICAgICAgICAgaXNFbmFibGVkOiAoKSA9PiBwbHVnaW5Ub2dnbGUuY2xhc3NMaXN0LmNvbnRhaW5zKENMQVNTRVMuQ0hFQ0tFRCksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgTW9kTWFuYWdlci5jaGVja0Zvckl0ZW1VcGRhdGVzKGZpbGVOYW1lKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBhZGRUaGVtZShmaWxlTmFtZTogc3RyaW5nLCBtZXRhRGF0YTogTWV0YURhdGEpOiB2b2lkIHtcbiAgICAgICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKGAke2ZpbGVOYW1lfS1ib3hgKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjdXJyZW50VGhlbWUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShTVE9SQUdFX0tFWVMuQ1VSUkVOVF9USEVNRSk7XG5cbiAgICAgICAgY29uc3QgdGhlbWVDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICB0aGVtZUNvbnRhaW5lci5pbm5lckhUTUwgPSBnZXRUaGVtZUl0ZW1UZW1wbGF0ZShmaWxlTmFtZSwgbWV0YURhdGEsIGN1cnJlbnRUaGVtZSA9PT0gZmlsZU5hbWUpO1xuICAgICAgICB0aGVtZUNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoXCJuYW1lXCIsIGAke2ZpbGVOYW1lfS1ib3hgKTtcbiAgICAgICAgdGhlbWVDb250YWluZXIuc2V0QXR0cmlidXRlKFwiZGF0YS1zdHJlbWlvLWVuaGFuY2VkLWl0ZW1cIiwgZmlsZU5hbWUpO1xuXG4gICAgICAgIGNvbnN0IHRoZW1lc0NhdGVnb3J5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihTRUxFQ1RPUlMuVEhFTUVTX0NBVEVHT1JZKTtcbiAgICAgICAgdGhlbWVzQ2F0ZWdvcnk/LmFwcGVuZENoaWxkKHRoZW1lQ29udGFpbmVyKTtcbiAgICAgICAgXG4gICAgICAgIE1vZE1hbmFnZXIuY2hlY2tGb3JJdGVtVXBkYXRlcyhmaWxlTmFtZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGFuIGl0ZW0gZnJvbSB0aGUgc2V0dGluZ3NcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHJlbW92ZUl0ZW0oZmlsZU5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBBcnJheS5mcm9tKGRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKGAke2ZpbGVOYW1lfS1ib3hgKSkuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgZWxlbWVudC5yZW1vdmUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IGEgbmF2aWdhdGlvbiBlbGVtZW50IGFzIGFjdGl2ZVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgYWN0aXZlU2VjdGlvbihlbGVtZW50OiBFbGVtZW50KTogdm9pZCB7XG4gICAgICAgIGNvbnN0IG5hdiA9IHRoaXMuZ2V0TmF2TWVudSgpO1xuICAgICAgICBpZiAobmF2KSB7XG4gICAgICAgICAgICAvLyBSZW1vdmUgc2VsZWN0ZWQgY2xhc3MgZnJvbSBhbGwgbmF2IGl0ZW1zXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5hdi5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIG5hdi5jaGlsZHJlbltpXS5jbGFzc0xpc3QucmVtb3ZlKENMQVNTRVMuU0VMRUNURUQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgIC8vIEZhbGxiYWNrIHRvIHF1ZXJ5U2VsZWN0b3JcbiAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDY7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5hdkl0ZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAke1NFTEVDVE9SUy5OQVZfTUVOVX0gPiBkaXY6bnRoLWNoaWxkKCR7aX0pYCk7XG4gICAgICAgICAgICAgICAgbmF2SXRlbT8uY2xhc3NMaXN0LnJlbW92ZShDTEFTU0VTLlNFTEVDVEVEKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChDTEFTU0VTLlNFTEVDVEVEKTtcbiAgICB9XG5cbiAgICAvLyAtLS0gRHluYW1pYyBEaXNjb3ZlcnkgSGVscGVycyAtLS1cblxuICAgIHByaXZhdGUgc3RhdGljIGdldE5hdk1lbnUoKTogRWxlbWVudCB8IG51bGwge1xuICAgICAgICAvLyBUcnkgc2VsZWN0b3JcbiAgICAgICAgY29uc3QgbmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihTRUxFQ1RPUlMuTkFWX01FTlUpO1xuICAgICAgICBpZiAobmF2KSByZXR1cm4gbmF2O1xuXG4gICAgICAgIC8vIER5bmFtaWMgZmFsbGJhY2tcbiAgICAgICAgY29uc3Qga2V5d29yZHMgPSBbXCJHZW5lcmFsXCIsIFwiSW50ZXJmYWNlXCIsIFwiUGxheWVyXCIsIFwiU3RyZWFtaW5nXCIsIFwiU2hvcnRjdXRzXCJdO1xuICAgICAgICBjb25zdCBsaW5rcyA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYSwgZGl2W3RpdGxlXScpKTtcblxuICAgICAgICBmb3IgKGNvbnN0IGxpbmsgb2YgbGlua3MpIHtcbiAgICAgICAgICAgICBjb25zdCB0aXRsZSA9IGxpbmsuZ2V0QXR0cmlidXRlKCd0aXRsZScpO1xuICAgICAgICAgICAgIGlmICh0aXRsZSAmJiBrZXl3b3Jkcy5pbmNsdWRlcyh0aXRsZSkpIHtcbiAgICAgICAgICAgICAgICAgbGV0IHBhcmVudCA9IGxpbmsucGFyZW50RWxlbWVudDtcbiAgICAgICAgICAgICAgICAgd2hpbGUocGFyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICBjb25zdCBmb3VuZCA9IGtleXdvcmRzLmZpbHRlcihrID0+IHBhcmVudCEucXVlcnlTZWxlY3RvcihgW3RpdGxlPVwiJHtrfVwiXWApKTtcbiAgICAgICAgICAgICAgICAgICAgIGlmIChmb3VuZC5sZW5ndGggPj0gMSkgeyAvLyBDaGFuZ2VkIHRvIDEgdG8gYmUgbW9yZSBwZXJtaXNzaXZlIG9uIG1vYmlsZVxuICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXJlbnQ7XG4gICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJlbnQgPT09IGRvY3VtZW50LmJvZHkpIGJyZWFrO1xuICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGdldE5hdlNob3J0Y3V0SXRlbSgpOiBFbGVtZW50IHwgbnVsbCB7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbdGl0bGU9XCJTaG9ydGN1dHNcIl0nKSB8fCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbdGl0bGU9XCJTdHJlYW1pbmdcIl0nKTtcbiAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0U2V0dGluZ3NQYW5lbCgpOiBFbGVtZW50IHwgbnVsbCB7XG4gICAgICAgIC8vIFRyeSBzZWxlY3RvclxuICAgICAgICBjb25zdCBwYW5lbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoU0VMRUNUT1JTLlNFQ1RJT05TX0NPTlRBSU5FUik7XG4gICAgICAgIGlmIChwYW5lbCkgcmV0dXJuIHBhbmVsO1xuXG4gICAgICAgIC8vIER5bmFtaWMgZmFsbGJhY2tcbiAgICAgICAgY29uc3QgbmF2TWVudSA9IHRoaXMuZ2V0TmF2TWVudSgpO1xuICAgICAgICBjb25zdCBrZXl3b3JkcyA9IFtcIkdlbmVyYWxcIiwgXCJJbnRlcmZhY2VcIiwgXCJQbGF5ZXJcIiwgXCJTdHJlYW1pbmdcIiwgXCJTaG9ydGN1dHNcIl07XG4gICAgICAgIGNvbnN0IGFsbERpdnMgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2RpdicpKTtcbiAgICAgICAgZm9yIChjb25zdCBkaXYgb2YgYWxsRGl2cykge1xuICAgICAgICAgICAgIC8vIEV4Y2x1ZGUgbmF2IG1lbnUgYW5kIGl0cyBkZXNjZW5kYW50c1xuICAgICAgICAgICAgIGlmIChuYXZNZW51ICYmIChkaXYgPT09IG5hdk1lbnUgfHwgbmF2TWVudS5jb250YWlucyhkaXYpKSkgY29udGludWU7XG5cbiAgICAgICAgICAgICAvLyBUaGUgcmVhbCBzZXR0aW5ncyBwYW5lbCBjb250YWlucyBsYXJnZSBzZWN0aW9ucywgc28gd2UgY2FuIGNoZWNrIGlmIGl0IGhhcyBtdWx0aXBsZSBjaGlsZHJlblxuICAgICAgICAgICAgIGlmIChkaXYuY2hpbGRyZW4ubGVuZ3RoID49IDIpIHsgLy8gQ2hhbmdlZCB0byA+PSAyIHRvIGJlIG1vcmUgcGVybWlzc2l2ZSBvbiBtb2JpbGVcbiAgICAgICAgICAgICAgICAgbGV0IG1hdGNoQ291bnQgPSAwO1xuICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRpdi5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgaWYgKGtleXdvcmRzLnNvbWUoayA9PiBkaXYuY2hpbGRyZW5baV0udGV4dENvbnRlbnQ/LmluY2x1ZGVzKGspKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoQ291bnQrKztcbiAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICBpZiAobWF0Y2hDb3VudCA+PSAxKSByZXR1cm4gZGl2OyAvLyBDaGFuZ2VkIHRvID49IDEgdG8gYmUgbW9yZSBwZXJtaXNzaXZlIG9uIG1vYmlsZVxuICAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBnZXRFeGlzdGluZ1NlY3Rpb24ocGFuZWw6IEVsZW1lbnQpOiBFbGVtZW50IHwgbnVsbCB7XG4gICAgICAgIC8vIEZpbmQgYSBjaGlsZCB0aGF0IGNvbnRhaW5zIFwiR2VuZXJhbFwiIG9yIFwiUGxheWVyXCJcbiAgICAgICAgY29uc3Qga2V5d29yZHMgPSBbXCJHZW5lcmFsXCIsIFwiSW50ZXJmYWNlXCIsIFwiUGxheWVyXCIsIFwiU3RyZWFtaW5nXCIsIFwiU2hvcnRjdXRzXCJdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhbmVsLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBjaGlsZCA9IHBhbmVsLmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgaWYgKGtleXdvcmRzLnNvbWUoayA9PiBjaGlsZC50ZXh0Q29udGVudD8uaW5jbHVkZXMoaykpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNoaWxkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIEZhbGxiYWNrIHRvIHNlbGVjdG9yXG4gICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFNFTEVDVE9SUy5TRUNUSU9OKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBnZXRFeGlzdGluZ1NlY3Rpb25MYWJlbChzZWN0aW9uOiBFbGVtZW50IHwgbnVsbCk6IEVsZW1lbnQgfCBudWxsIHtcbiAgICAgICAgaWYgKCFzZWN0aW9uKSByZXR1cm4gbnVsbDtcbiAgICAgICAgLy8gVGhlIGxhYmVsIGlzIHVzdWFsbHkgdGhlIGZpcnN0IGNoaWxkIG9yIGNsYXNzIGNvbnRhaW5zIGxhYmVsXG4gICAgICAgIGlmIChzZWN0aW9uLmNoaWxkcmVuLmxlbmd0aCA+IDApIHJldHVybiBzZWN0aW9uLmNoaWxkcmVuWzBdO1xuICAgICAgICAvLyBGYWxsYmFja1xuICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihTRUxFQ1RPUlMuTEFCRUwpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGdldENhdGVnb3J5VGVtcGxhdGUoKTogeyBjYXRlZ29yeUNsYXNzOiBzdHJpbmcsIGNhdGVnb3J5VGl0bGVDbGFzczogc3RyaW5nLCBoZWFkaW5nQ2xhc3M6IHN0cmluZywgaWNvbkNsYXNzOiBzdHJpbmcgfSB8IG51bGwge1xuICAgICAgICAvLyBUcnkgdG8gZmluZCBhbiBleGlzdGluZyBjYXRlZ29yeSB0byBjb3B5IGNsYXNzZXNcbiAgICAgICAgY29uc3QgY2F0ZWdvcnlFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihTRUxFQ1RPUlMuQ0FURUdPUlkpO1xuICAgICAgICBjb25zdCBjYXRlZ29yeVRpdGxlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoU0VMRUNUT1JTLkNBVEVHT1JZX0xBQkVMKTtcbiAgICAgICAgY29uc3QgY2F0ZWdvcnlJY29uRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoU0VMRUNUT1JTLkNBVEVHT1JZX0lDT04pO1xuICAgICAgICBjb25zdCBjYXRlZ29yeUhlYWRpbmdFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihTRUxFQ1RPUlMuQ0FURUdPUllfSEVBRElORyk7XG5cbiAgICAgICAgbGV0IGNhdGVnb3J5Q2xhc3MgPSBjYXRlZ29yeUVsZW1lbnQ/LmNsYXNzTmFtZSB8fCBcIlwiO1xuICAgICAgICBsZXQgY2F0ZWdvcnlUaXRsZUNsYXNzID0gY2F0ZWdvcnlUaXRsZUVsZW1lbnQ/LmNsYXNzTmFtZSB8fCBcIlwiO1xuICAgICAgICBsZXQgaGVhZGluZ0NsYXNzID0gY2F0ZWdvcnlIZWFkaW5nRWxlbWVudD8uY2xhc3NOYW1lIHx8IFwiXCI7XG5cbiAgICAgICAgbGV0IGljb25DbGFzcyA9ICdpY29uJztcbiAgICAgICAgaWYgKGNhdGVnb3J5SWNvbkVsZW1lbnQgaW5zdGFuY2VvZiBTVkdFbGVtZW50KSB7XG4gICAgICAgICAgICBpY29uQ2xhc3MgPSBjYXRlZ29yeUljb25FbGVtZW50LmNsYXNzTmFtZS5iYXNlVmFsO1xuICAgICAgICB9IGVsc2UgaWYgKGNhdGVnb3J5SWNvbkVsZW1lbnQpIHtcbiAgICAgICAgICAgIGljb25DbGFzcyA9IGNhdGVnb3J5SWNvbkVsZW1lbnQuY2xhc3NOYW1lO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNhdGVnb3J5Q2xhc3MgJiYgY2F0ZWdvcnlUaXRsZUNsYXNzKSB7XG4gICAgICAgICAgICByZXR1cm4geyBjYXRlZ29yeUNsYXNzLCBjYXRlZ29yeVRpdGxlQ2xhc3MsIGhlYWRpbmdDbGFzcywgaWNvbkNsYXNzIH07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUcnkgZHluYW1pYyBpZiBzZWxlY3RvciBmYWlsZWRcbiAgICAgICAgY29uc3QgcGFuZWwgPSB0aGlzLmdldFNldHRpbmdzUGFuZWwoKTtcbiAgICAgICAgaWYgKHBhbmVsKSB7XG4gICAgICAgICAgICBjb25zdCBzZWN0aW9uID0gdGhpcy5nZXRFeGlzdGluZ1NlY3Rpb24ocGFuZWwpO1xuICAgICAgICAgICAgaWYgKHNlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAvLyBGaW5kIGEgY2F0ZWdvcnkgaW5zaWRlIHNlY3Rpb25cbiAgICAgICAgICAgICAgICAvLyBVc3VhbGx5IG5vdCB0aGUgZmlyc3QgY2hpbGQgKExhYmVsKVxuICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPHNlY3Rpb24uY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2hpbGQgPSBzZWN0aW9uLmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgICAgICAgICAvLyBTa2lwIGlmIGl0IGlzIHRoZSBsYWJlbC90aXRsZVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBsYWJlbCA9IHRoaXMuZ2V0RXhpc3RpbmdTZWN0aW9uTGFiZWwoc2VjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGlsZCA9PT0gbGFiZWwpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFRoaXMgY2hpbGQgaXMgbGlrZWx5IGEgY2F0ZWdvcnlcbiAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcnlDbGFzcyA9IGNoaWxkLmNsYXNzTmFtZTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBGaW5kIEhlYWRpbmdcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaGVhZGluZyA9IGNoaWxkLmNoaWxkcmVuWzBdOyAvLyBBc3N1bWluZyBmaXJzdCBjaGlsZCBpcyBoZWFkaW5nXG4gICAgICAgICAgICAgICAgICAgIGlmIChoZWFkaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkaW5nQ2xhc3MgPSBoZWFkaW5nLmNsYXNzTmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEhlYWRpbmcgY29udGFpbnMgSWNvbiBhbmQgVGl0bGVcbiAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpY29uID0gaGVhZGluZy5xdWVyeVNlbGVjdG9yKCdzdmcnKSB8fCBoZWFkaW5nLmNoaWxkcmVuWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpY29uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpY29uIGluc3RhbmNlb2YgU1ZHRWxlbWVudCkgaWNvbkNsYXNzID0gaWNvbi5jbGFzc05hbWUuYmFzZVZhbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpY29uQ2xhc3MgPSBpY29uLmNsYXNzTmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0aXRsZSA9IGhlYWRpbmcucXVlcnlTZWxlY3RvcignZGl2JykgfHwgaGVhZGluZy5jaGlsZHJlblsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGl0bGUpIGNhdGVnb3J5VGl0bGVDbGFzcyA9IHRpdGxlLmNsYXNzTmFtZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChjYXRlZ29yeUNsYXNzICYmIGNhdGVnb3J5VGl0bGVDbGFzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGNhdGVnb3J5Q2xhc3MsIGNhdGVnb3J5VGl0bGVDbGFzcywgaGVhZGluZ0NsYXNzLCBpY29uQ2xhc3MgfTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIHdhaXRGb3JTZXR0aW5nc1BhbmVsKCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIGxldCByZXRyaWVzID0gMDtcbiAgICAgICAgICAgIGNvbnN0IG1heFJldHJpZXMgPSA0MDsgLy8gMjAgc2Vjb25kc1xuICAgICAgICAgICAgY29uc3QgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2V0U2V0dGluZ3NQYW5lbCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0cmllcysrO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmV0cmllcyA+IG1heFJldHJpZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcihcIlRpbWVvdXQgd2FpdGluZyBmb3Igc2V0dGluZ3MgcGFuZWxcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpOyAvLyByZXNvbHZlIHRvIGxldCBpdCBmYWlsIGdyYWNlZnVsbHkgaW5zaWRlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCA1MDApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyB3YWl0Rm9yTmF2TWVudSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgbGV0IHJldHJpZXMgPSAwO1xuICAgICAgICAgICAgY29uc3QgbWF4UmV0cmllcyA9IDQwOyAvLyAyMCBzZWNvbmRzXG4gICAgICAgICAgICBjb25zdCBpbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5nZXROYXZNZW51KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXRyaWVzKys7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXRyaWVzID4gbWF4UmV0cmllcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmVycm9yKFwiVGltZW91dCB3YWl0aW5nIGZvciBuYXYgbWVudVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCA1MDApO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNldHRpbmdzO1xuIiwgImltcG9ydCBUZW1wbGF0ZUNhY2hlIGZyb20gJy4uLy4uL3V0aWxzL3RlbXBsYXRlQ2FjaGUnO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0QWJvdXRDYXRlZ29yeVRlbXBsYXRlKFxuICAgIHZlcnNpb246IHN0cmluZywgXG4gICAgY2hlY2tGb3JVcGRhdGVzT25TdGFydHVwOiBib29sZWFuLCBcbiAgICBkaXNjb3JkUmljaFByZXNlbmNlOiBib29sZWFuLCBcbiAgICBlbmFibGVUcmFuc3BhcmVudFRoZW1lczogYm9vbGVhblxuKTogc3RyaW5nIHtcbiAgICBjb25zdCB0ZW1wbGF0ZSA9IFRlbXBsYXRlQ2FjaGUubG9hZChfX2Rpcm5hbWUsICdhYm91dC1jYXRlZ29yeScpO1xuICAgIFxuICAgIHJldHVybiB0ZW1wbGF0ZVxuICAgICAgICAucmVwbGFjZShcInt7IHZlcnNpb24gfX1cIiwgdmVyc2lvbilcbiAgICAgICAgLnJlcGxhY2UoXCJ7eyBjaGVja0ZvclVwZGF0ZXNPblN0YXJ0dXAgfX1cIiwgY2hlY2tGb3JVcGRhdGVzT25TdGFydHVwID8gXCJjaGVja2VkXCIgOiBcIlwiKVxuICAgICAgICAucmVwbGFjZShcInt7IGRpc2NvcmRyaWNocHJlc2VuY2UgfX1cIiwgZGlzY29yZFJpY2hQcmVzZW5jZSA/IFwiY2hlY2tlZFwiIDogXCJcIilcbiAgICAgICAgLnJlcGxhY2UoXCJ7eyBlbmFibGVUcmFuc3BhcmVudFRoZW1lcyB9fVwiLCBlbmFibGVUcmFuc3BhcmVudFRoZW1lcyA/IFwiY2hlY2tlZFwiIDogXCJcIik7XG59XG4iLCAiaW1wb3J0IHsgUGxhdGZvcm1NYW5hZ2VyIH0gZnJvbSBcIi4uL3BsYXRmb3JtL1BsYXRmb3JtTWFuYWdlclwiO1xuaW1wb3J0IHsgQ2FwYWNpdG9yUGxhdGZvcm0gfSBmcm9tIFwiLi4vcGxhdGZvcm0vQ2FwYWNpdG9yUGxhdGZvcm1cIjtcbmltcG9ydCBTZXR0aW5ncyBmcm9tIFwiLi4vY29yZS9TZXR0aW5nc1wiO1xuaW1wb3J0IHByb3BlcnRpZXMgZnJvbSBcIi4uL2NvcmUvUHJvcGVydGllc1wiO1xuaW1wb3J0IE1vZE1hbmFnZXIgZnJvbSBcIi4uL2NvcmUvTW9kTWFuYWdlclwiO1xuaW1wb3J0IEhlbHBlcnMgZnJvbSBcIi4uL3V0aWxzL0hlbHBlcnNcIjtcbmltcG9ydCB7IGdldEFib3V0Q2F0ZWdvcnlUZW1wbGF0ZSB9IGZyb20gXCIuLi9jb21wb25lbnRzL2Fib3V0LWNhdGVnb3J5L2Fib3V0Q2F0ZWdvcnlcIjtcbmltcG9ydCBsb2dnZXIgZnJvbSBcIi4uL3V0aWxzL2xvZ2dlclwiO1xuaW1wb3J0IHsgam9pbiB9IGZyb20gXCJwYXRoXCI7XG5pbXBvcnQge1xuICAgIFNFTEVDVE9SUyxcbiAgICBGSUxFX0VYVEVOU0lPTlMsXG4gICAgVElNRU9VVFMsXG59IGZyb20gXCIuLi9jb25zdGFudHNcIjtcbmltcG9ydCB7IE5vZGVKUyB9IGZyb20gJ2NhcGFjaXRvci1ub2RlanMnO1xuaW1wb3J0IExvZ01hbmFnZXIgZnJvbSBcIi4uL2NvcmUvTG9nTWFuYWdlclwiO1xuaW1wb3J0IHsgRmlsZVBpY2tlciB9IGZyb20gJ0BjYXBhd2Vzb21lL2NhcGFjaXRvci1maWxlLXBpY2tlcic7XG5pbXBvcnQgeyBjcmVhdGVTdHJlbWlvRW5oYW5jZWRBcGkgfSBmcm9tIFwiLi4vY29yZS9TdHJlbWlvRW5oYW5jZWRBcGlcIjtcbmltcG9ydCB7IGluaXRpYWxpemVVc2VyU2V0dGluZ3MgfSBmcm9tIFwiLi4vY29yZS9Vc2VyU2V0dGluZ3NcIjtcbmltcG9ydCB7IGNyZWF0ZUVuaGFuY2VkU2V0dGluZ3NDb250cm9sbGVyIH0gZnJvbSBcIi4uL3ByZWxvYWQvc2hhcmVkL2VuaGFuY2VkU2V0dGluZ3NcIjtcbmltcG9ydCB7IGFwcGx5QW5kcm9pZFRoZW1lIH0gZnJvbSBcIi4uL3ByZWxvYWQvYW5kcm9pZC90aGVtZVwiO1xuaW1wb3J0IHsgaXNTYWZlTW9kRmlsZU5hbWUgfSBmcm9tIFwiLi4vdXRpbHMvbW9kRmlsZU5hbWVcIjtcblxuLy8gSW5pdGlhbGl6ZSBwbGF0Zm9ybSBmb3IgQ2FwYWNpdG9yXG5QbGF0Zm9ybU1hbmFnZXIuc2V0UGxhdGZvcm0obmV3IENhcGFjaXRvclBsYXRmb3JtKCkpO1xuXG4vLyBIb29rIGNvbnNvbGUgZm9yIGxvZ3MgbWVudVxuTG9nTWFuYWdlci5ob29rQ29uc29sZSgpO1xuTG9nTWFuYWdlci5hZGRMb2coJ0lORk8nLCAnU3RyZW1pbyBFbmhhbmNlZDogUHJlbG9hZCBzY3JpcHQgaW5pdGlhbGl6ZWQnKTtcblxuLy8gTGlzdGVuIGZvciBzZXJ2ZXIgbG9ncyBhbmQgZXJyb3JzXG5Ob2RlSlMuYWRkTGlzdGVuZXIoJ2xvZycsIChkYXRhKSA9PiB7XG4gICAgTG9nTWFuYWdlci5hZGRMb2coJ0lORk8nLCBgW1NlcnZlcl0gJHtkYXRhLmFyZ3Muam9pbignICcpfWApO1xuICAgIGNvbnNvbGUubG9nKCdbU2VydmVyXScsIC4uLmRhdGEuYXJncyk7XG59KTtcblxuTm9kZUpTLmFkZExpc3RlbmVyKCdlcnJvcicsIChkYXRhKSA9PiB7XG4gICAgTG9nTWFuYWdlci5hZGRMb2coJ0VSUk9SJywgYFtTZXJ2ZXIgRXJyb3JdICR7ZGF0YS5hcmdzLmpvaW4oJyAnKX1gKTtcbiAgICBjb25zb2xlLmVycm9yKCdbU2VydmVyIEVycm9yXScsIC4uLmRhdGEuYXJncyk7XG4gICAgSGVscGVycy5zaG93QWxlcnQoJ2Vycm9yJywgJ1NlcnZlciBFcnJvcicsIGRhdGEuYXJncy5qb2luKCcgJyksIFsnT0snXSk7XG59KTtcblxuY29uc3QgU0VUVElOR1NfUk9VVEUgPSBcIiMvc2V0dGluZ3NcIjtcbmNvbnN0IFBMQVlFUl9ST1VURSA9IFwiIy9wbGF5ZXJcIjtcbmNvbnN0IFNUUkVBTUlOR19TRVJWRVJfUkVBRFlfVElNRU9VVF9NUyA9IDE1MDAwO1xuY29uc3QgRlVMTFNDUkVFTl9DT05UUk9MX1NFTEVDVE9SUyA9IFtcbiAgICAnW3RpdGxlPVwiRnVsbHNjcmVlblwiXScsXG4gICAgJ1t0aXRsZT1cIkV4aXQgRnVsbHNjcmVlblwiXScsXG4gICAgJ2J1dHRvblthcmlhLWxhYmVsPVwiRnVsbHNjcmVlblwiXScsXG4gICAgJ2J1dHRvblthcmlhLWxhYmVsPVwiRXhpdCBGdWxsc2NyZWVuXCJdJyxcbiAgICAnW2NsYXNzKj1cImZ1bGxzY3JlZW4tdG9nZ2xlXCJdJyxcbiAgICAnW2NsYXNzKj1cImhvcml6b250YWwtbmF2LWJhci1jb250YWluZXItXCJdIFtjbGFzcyo9XCJidXR0b25zLWNvbnRhaW5lci1cIl0gPiA6bm90KFtjbGFzcyo9XCJtZW51LWJ1dHRvbi1jb250YWluZXJcIl0pOm5vdCguc3RyZW1pby1lbmhhbmNlZC1waXAtYnV0dG9uKScsXG5dO1xuXG5sZXQgZnVsbHNjcmVlblN0eWxlSW5qZWN0ZWQgPSBmYWxzZTtcbmxldCBmdWxsc2NyZWVuT2JzZXJ2ZXJTdGFydGVkID0gZmFsc2U7XG5sZXQgc2V0dGluZ3NPYnNlcnZlclN0YXJ0ZWQgPSBmYWxzZTtcbmxldCBzZXR0aW5nc0NoZWNrU2NoZWR1bGVkID0gZmFsc2U7XG5sZXQgcGxheWVyT2JzZXJ2ZXJTdGFydGVkID0gZmFsc2U7XG5sZXQgcGxheWVyRmVhdHVyZUNoZWNrU2NoZWR1bGVkID0gZmFsc2U7XG5sZXQgc3RyZWFtaW5nU2VydmVyUmVhZHlQcm9taXNlOiBQcm9taXNlPHZvaWQ+IHwgbnVsbCA9IG51bGw7XG5sZXQgc3RyZWFtaW5nU2VydmVyUmVsb2FkU2NoZWR1bGVkID0gZmFsc2U7XG5cbmNvbnN0IGluaXQgPSBhc3luYyAoKSA9PiB7XG4gICAgTG9nTWFuYWdlci5hZGRMb2coJ0lORk8nLCAnU3RyZW1pbyBFbmhhbmNlZDogSW5pdGlhbGl6YXRpb24gc3RhcnRlZCcpO1xuICAgIGF3YWl0IFBsYXRmb3JtTWFuYWdlci5jdXJyZW50LmluaXQoKTtcbiAgICB2b2lkIGVuc3VyZUJ1bmRsZWRTdHJlYW1pbmdTZXJ2ZXJSZWFkeSgpO1xuXG4gICAgaW5zdGFsbEZ1bGxzY3JlZW5IaWRlcigpO1xuICAgIG9ic2VydmVTZXR0aW5nc1VpKCk7XG4gICAgb2JzZXJ2ZVBsYXllclVpKCk7XG5cbiAgICB3aW5kb3cuc3RyZW1pb0VuaGFuY2VkID0gY3JlYXRlU3RyZW1pb0VuaGFuY2VkQXBpKGFwcGx5QW5kcm9pZFRoZW1lKTtcblxuICAgIGluaXRpYWxpemVVc2VyU2V0dGluZ3MoeyBjaGVja1VwZGF0ZXNPblN0YXJ0dXBEZWZhdWx0OiBmYWxzZSB9KTtcblxuICAgIC8vIEFwcGx5IGVuYWJsZWQgdGhlbWVcbiAgICBhd2FpdCBhcHBseUFuZHJvaWRUaGVtZSgpO1xuXG4gICAgLy8gTG9hZCBlbmFibGVkIHBsdWdpbnNcbiAgICBhd2FpdCBNb2RNYW5hZ2VyLmxvYWRFbmFibGVkUGx1Z2lucygpO1xuXG4gICAgLy8gSGFuZGxlIG5hdmlnYXRpb24gY2hhbmdlc1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiaGFzaGNoYW5nZVwiLCAoKSA9PiB7XG4gICAgICAgIHNjaGVkdWxlU2V0dGluZ3NDaGVjaygpO1xuICAgICAgICBzY2hlZHVsZVBsYXllckZlYXR1cmVTeW5jKCk7XG4gICAgfSk7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCAoKSA9PiB7XG4gICAgICAgIGhpZGVGdWxsc2NyZWVuQ29udHJvbHMoKTtcbiAgICB9KTtcblxuICAgIC8vIEluaXRpYWwgY2hlY2tcbiAgICBzY2hlZHVsZVNldHRpbmdzQ2hlY2soKTtcbiAgICBzY2hlZHVsZVBsYXllckZlYXR1cmVTeW5jKCk7XG4gICAgaGlkZUZ1bGxzY3JlZW5Db250cm9scygpO1xuXG4gICAgLy8gSW5qZWN0IHN1Y2Nlc3MgdG9hc3RcbiAgICBIZWxwZXJzLmNyZWF0ZVRvYXN0KCdlbmhhbmNlZC1sb2FkZWQnLCAnU3RyZW1pbyBFbmhhbmNlZCcsICdTdHJlbWlvIEVuaGFuY2VkIExvYWRlZCcsICdzdWNjZXNzJyk7XG59O1xuXG5pZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2xvYWRpbmcnKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGluaXQpO1xufSBlbHNlIHtcbiAgICBpbml0KCk7XG59XG5cbmZ1bmN0aW9uIGJpbmRCdXR0b25DbGljayhcbiAgICBidXR0b25JZDogc3RyaW5nLFxuICAgIGhhbmRsZXI6ICgpID0+IHZvaWQgfCBQcm9taXNlPHZvaWQ+LFxuICAgIGVycm9yQ29udGV4dDogc3RyaW5nXG4pOiB2b2lkIHtcbiAgICBIZWxwZXJzLndhaXRGb3JFbG0oYCMke2J1dHRvbklkfWApLnRoZW4oKCkgPT4ge1xuICAgICAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChidXR0b25JZCk7XG4gICAgICAgIGlmICghKGJ1dHRvbiBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkgcmV0dXJuO1xuICAgICAgICBpZiAoYnV0dG9uLmRhdGFzZXQuc3RyZW1pb0VuaGFuY2VkQ2xpY2tCb3VuZCA9PT0gXCJ0cnVlXCIpIHJldHVybjtcblxuICAgICAgICBidXR0b24uZGF0YXNldC5zdHJlbWlvRW5oYW5jZWRDbGlja0JvdW5kID0gXCJ0cnVlXCI7XG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgdm9pZCBoYW5kbGVyKCk7XG4gICAgICAgIH0pO1xuICAgIH0pLmNhdGNoKGVyciA9PiBsb2dnZXIuZXJyb3IoYEZhaWxlZCB0byBzZXR1cCAke2Vycm9yQ29udGV4dH06ICR7ZXJyfWApKTtcbn1cblxuZnVuY3Rpb24gYWRkQW5kcm9pZFNldHRpbmdzQ29udHJvbHMoKTogdm9pZCB7XG4gICAgU2V0dGluZ3MuYWRkQnV0dG9uKFwiSW1wb3J0IFRoZW1lXCIsIFwiaW1wb3J0VGhlbWVCdG5cIiwgU0VMRUNUT1JTLlRIRU1FU19DQVRFR09SWSk7XG4gICAgU2V0dGluZ3MuYWRkQnV0dG9uKFwiTWFuYWdlIFRoZW1lcyBGb2xkZXJcIiwgXCJvcGVudGhlbWVzZm9sZGVyQnRuXCIsIFNFTEVDVE9SUy5USEVNRVNfQ0FURUdPUlkpO1xuICAgIFNldHRpbmdzLmFkZEJ1dHRvbihcIkltcG9ydCBQbHVnaW5cIiwgXCJpbXBvcnRQbHVnaW5CdG5cIiwgU0VMRUNUT1JTLlBMVUdJTlNfQ0FURUdPUlkpO1xuICAgIFNldHRpbmdzLmFkZEJ1dHRvbihcIk1hbmFnZSBQbHVnaW5zIEZvbGRlclwiLCBcIm9wZW5wbHVnaW5zZm9sZGVyQnRuXCIsIFNFTEVDVE9SUy5QTFVHSU5TX0NBVEVHT1JZKTtcblxuICAgIHNldHVwSW1wb3J0QnV0dG9uKFwiaW1wb3J0VGhlbWVCdG5cIiwgXCJ0aGVtZVwiKTtcbiAgICBzZXR1cEltcG9ydEJ1dHRvbihcImltcG9ydFBsdWdpbkJ0blwiLCBcInBsdWdpblwiKTtcbiAgICBzZXR1cE1hbmFnZWRGb2xkZXJCdXR0b24oXCJvcGVudGhlbWVzZm9sZGVyQnRuXCIsIHByb3BlcnRpZXMudGhlbWVzUGF0aCk7XG4gICAgc2V0dXBNYW5hZ2VkRm9sZGVyQnV0dG9uKFwib3BlbnBsdWdpbnNmb2xkZXJCdG5cIiwgcHJvcGVydGllcy5wbHVnaW5zUGF0aCk7XG59XG5cbmNvbnN0IHNldHRpbmdzQ29udHJvbGxlciA9IGNyZWF0ZUVuaGFuY2VkU2V0dGluZ3NDb250cm9sbGVyKHtcbiAgICBhZGRQbGF0Zm9ybUNvbnRyb2xzOiBhZGRBbmRyb2lkU2V0dGluZ3NDb250cm9scyxcbiAgICByZW5kZXJBYm91dDogd3JpdGVBYm91dCxcbn0pO1xuXG5hc3luYyBmdW5jdGlvbiBjaGVja1NldHRpbmdzKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHNldHRpbmdzQ29udHJvbGxlci5jaGVjaygpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBlbnN1cmVCdW5kbGVkU3RyZWFtaW5nU2VydmVyUmVhZHkoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKHN0cmVhbWluZ1NlcnZlclJlYWR5UHJvbWlzZSkge1xuICAgICAgICBhd2FpdCBzdHJlYW1pbmdTZXJ2ZXJSZWFkeVByb21pc2U7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzdHJlYW1pbmdTZXJ2ZXJSZWFkeVByb21pc2UgPSAoYXN5bmMgKCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgYXdhaXQgUHJvbWlzZS5yYWNlKFtcbiAgICAgICAgICAgICAgICBOb2RlSlMud2hlblJlYWR5KCksXG4gICAgICAgICAgICAgICAgbmV3IFByb21pc2U8bmV2ZXI+KChfLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihcIlRpbWVkIG91dCB3YWl0aW5nIGZvciB0aGUgYnVuZGxlZCBzdHJlYW1pbmcgc2VydmVyLlwiKSk7XG4gICAgICAgICAgICAgICAgICAgIH0sIFNUUkVBTUlOR19TRVJWRVJfUkVBRFlfVElNRU9VVF9NUyk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF0pO1xuXG4gICAgICAgICAgICBMb2dNYW5hZ2VyLmFkZExvZyhcIklORk9cIiwgXCJCdW5kbGVkIHN0cmVhbWluZyBzZXJ2ZXIgaXMgcmVhZHlcIik7XG4gICAgICAgICAgICBzY2hlZHVsZVN0cmVhbWluZ1NlcnZlclJlbG9hZCgpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKTtcbiAgICAgICAgICAgIExvZ01hbmFnZXIuYWRkTG9nKFwiRVJST1JcIiwgYEJ1bmRsZWQgc3RyZWFtaW5nIHNlcnZlciBmYWlsZWQgdG8gYmVjb21lIHJlYWR5OiAke21lc3NhZ2V9YCk7XG4gICAgICAgICAgICBsb2dnZXIuZXJyb3IoYEJ1bmRsZWQgc3RyZWFtaW5nIHNlcnZlciBmYWlsZWQgdG8gYmVjb21lIHJlYWR5OiAke21lc3NhZ2V9YCk7XG4gICAgICAgICAgICBzdHJlYW1pbmdTZXJ2ZXJSZWFkeVByb21pc2UgPSBudWxsO1xuICAgICAgICB9XG4gICAgfSkoKTtcblxuICAgIGF3YWl0IHN0cmVhbWluZ1NlcnZlclJlYWR5UHJvbWlzZTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcmVsb2FkU3RyZWFtaW5nU2VydmVyKHJldHJ5Q291bnQgPSAwKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgSGVscGVycy5fZXZhbChgY29yZS50cmFuc3BvcnQuZGlzcGF0Y2goeyBhY3Rpb246ICdTdHJlYW1pbmdTZXJ2ZXInLCBhcmdzOiB7IGFjdGlvbjogJ1JlbG9hZCcgfSB9KTtgKTtcbiAgICAgICAgbG9nZ2VyLmluZm8oXCJTdHJlbWlvIHN0cmVhbWluZyBzZXJ2ZXIgcmVsb2FkZWQuXCIpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcik7XG4gICAgICAgIGlmIChyZXRyeUNvdW50IDwgMykge1xuICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHZvaWQgcmVsb2FkU3RyZWFtaW5nU2VydmVyKHJldHJ5Q291bnQgKyAxKTtcbiAgICAgICAgICAgIH0sIFRJTUVPVVRTLkNPUkVTVEFURV9SRVRSWV9JTlRFUlZBTCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsb2dnZXIuZXJyb3IoYEZhaWxlZCB0byByZWxvYWQgYnVuZGxlZCBzdHJlYW1pbmcgc2VydmVyOiAke21lc3NhZ2V9YCk7XG4gICAgICAgIExvZ01hbmFnZXIuYWRkTG9nKFwiRVJST1JcIiwgYEZhaWxlZCB0byByZWxvYWQgYnVuZGxlZCBzdHJlYW1pbmcgc2VydmVyOiAke21lc3NhZ2V9YCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBzY2hlZHVsZVN0cmVhbWluZ1NlcnZlclJlbG9hZCgpOiB2b2lkIHtcbiAgICBpZiAoc3RyZWFtaW5nU2VydmVyUmVsb2FkU2NoZWR1bGVkKSByZXR1cm47XG4gICAgc3RyZWFtaW5nU2VydmVyUmVsb2FkU2NoZWR1bGVkID0gdHJ1ZTtcblxuICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgc3RyZWFtaW5nU2VydmVyUmVsb2FkU2NoZWR1bGVkID0gZmFsc2U7XG4gICAgICAgIHZvaWQgcmVsb2FkU3RyZWFtaW5nU2VydmVyKCk7XG4gICAgfSwgVElNRU9VVFMuU0VSVkVSX1JFTE9BRF9ERUxBWSk7XG59XG5cbmZ1bmN0aW9uIHNjaGVkdWxlU2V0dGluZ3NDaGVjaygpOiB2b2lkIHtcbiAgICBpZiAoc2V0dGluZ3NDaGVja1NjaGVkdWxlZCkgcmV0dXJuO1xuICAgIHNldHRpbmdzQ2hlY2tTY2hlZHVsZWQgPSB0cnVlO1xuXG4gICAgd2luZG93LnNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuICAgICAgICBzZXR0aW5nc0NoZWNrU2NoZWR1bGVkID0gZmFsc2U7XG4gICAgICAgIGF3YWl0IGNoZWNrU2V0dGluZ3MoKTtcbiAgICB9LCAxMDApO1xufVxuXG5mdW5jdGlvbiBvYnNlcnZlU2V0dGluZ3NVaSgpOiB2b2lkIHtcbiAgICBpZiAoc2V0dGluZ3NPYnNlcnZlclN0YXJ0ZWQpIHJldHVybjtcbiAgICBzZXR0aW5nc09ic2VydmVyU3RhcnRlZCA9IHRydWU7XG5cbiAgICBjb25zdCBzdGFydE9ic2VydmVyID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICAgICAgICAgIGlmIChsb2NhdGlvbi5ocmVmLmluY2x1ZGVzKFNFVFRJTkdTX1JPVVRFKSkge1xuICAgICAgICAgICAgICAgIHNjaGVkdWxlU2V0dGluZ3NDaGVjaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBvYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmJvZHksIHtcbiAgICAgICAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICAgICAgICAgIHN1YnRyZWU6IHRydWUsXG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBpZiAoZG9jdW1lbnQuYm9keSkge1xuICAgICAgICBzdGFydE9ic2VydmVyKCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBib2R5T2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoXywgb2JzKSA9PiB7XG4gICAgICAgIGlmICghZG9jdW1lbnQuYm9keSkgcmV0dXJuO1xuICAgICAgICBvYnMuZGlzY29ubmVjdCgpO1xuICAgICAgICBzdGFydE9ic2VydmVyKCk7XG4gICAgfSk7XG5cbiAgICBib2R5T2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsIHtcbiAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgICBzdWJ0cmVlOiB0cnVlLFxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBzY2hlZHVsZVBsYXllckZlYXR1cmVTeW5jKCk6IHZvaWQge1xuICAgIGlmIChwbGF5ZXJGZWF0dXJlQ2hlY2tTY2hlZHVsZWQpIHJldHVybjtcbiAgICBwbGF5ZXJGZWF0dXJlQ2hlY2tTY2hlZHVsZWQgPSB0cnVlO1xuXG4gICAgd2luZG93LnNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuICAgICAgICBwbGF5ZXJGZWF0dXJlQ2hlY2tTY2hlZHVsZWQgPSBmYWxzZTtcbiAgICAgICAgYXdhaXQgc3luY1BsYXllckZlYXR1cmVzKCk7XG4gICAgfSwgMTAwKTtcbn1cblxuZnVuY3Rpb24gb2JzZXJ2ZVBsYXllclVpKCk6IHZvaWQge1xuICAgIGlmIChwbGF5ZXJPYnNlcnZlclN0YXJ0ZWQpIHJldHVybjtcbiAgICBwbGF5ZXJPYnNlcnZlclN0YXJ0ZWQgPSB0cnVlO1xuXG4gICAgY29uc3Qgc3RhcnRPYnNlcnZlciA9ICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XG4gICAgICAgICAgICBpZiAobG9jYXRpb24uaHJlZi5pbmNsdWRlcyhQTEFZRVJfUk9VVEUpKSB7XG4gICAgICAgICAgICAgICAgc2NoZWR1bGVQbGF5ZXJGZWF0dXJlU3luYygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBvYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmJvZHksIHtcbiAgICAgICAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICAgICAgICAgIHN1YnRyZWU6IHRydWUsXG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBpZiAoZG9jdW1lbnQuYm9keSkge1xuICAgICAgICBzdGFydE9ic2VydmVyKCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBib2R5T2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoXywgb2JzKSA9PiB7XG4gICAgICAgIGlmICghZG9jdW1lbnQuYm9keSkgcmV0dXJuO1xuICAgICAgICBvYnMuZGlzY29ubmVjdCgpO1xuICAgICAgICBzdGFydE9ic2VydmVyKCk7XG4gICAgfSk7XG5cbiAgICBib2R5T2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsIHtcbiAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgICBzdWJ0cmVlOiB0cnVlLFxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBpbnN0YWxsRnVsbHNjcmVlbkhpZGVyKCk6IHZvaWQge1xuICAgIGlmICghZnVsbHNjcmVlblN0eWxlSW5qZWN0ZWQpIHtcbiAgICAgICAgY29uc3Qgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gICAgICAgIHN0eWxlLmlkID0gXCJzdHJlbWlvLWVuaGFuY2VkLWZ1bGxzY3JlZW4tc3R5bGVcIjtcbiAgICAgICAgc3R5bGUudGV4dENvbnRlbnQgPSBgXG4gICAgICAgICAgICAke0ZVTExTQ1JFRU5fQ09OVFJPTF9TRUxFQ1RPUlMuam9pbihcIixcXG4gICAgICAgICAgICBcIil9IHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XG4gICAgICAgICAgICAgICAgdmlzaWJpbGl0eTogaGlkZGVuICFpbXBvcnRhbnQ7XG4gICAgICAgICAgICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmUgIWltcG9ydGFudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgYDtcblxuICAgICAgICBjb25zdCBhcHBlbmRTdHlsZSA9ICgpID0+IHtcbiAgICAgICAgICAgIGlmICghZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzdHlsZS5pZCkpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuICAgICAgICAgICAgZnVsbHNjcmVlblN0eWxlSW5qZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKCFhcHBlbmRTdHlsZSgpKSB7XG4gICAgICAgICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKChfLCBvYnMpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIWFwcGVuZFN0eWxlKCkpIHJldHVybjtcbiAgICAgICAgICAgICAgICBvYnMuZGlzY29ubmVjdCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBvYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgeyBjaGlsZExpc3Q6IHRydWUsIHN1YnRyZWU6IHRydWUgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoaWRlRnVsbHNjcmVlbkNvbnRyb2xzKCk7XG5cbiAgICBpZiAoZnVsbHNjcmVlbk9ic2VydmVyU3RhcnRlZCkgcmV0dXJuO1xuICAgIGZ1bGxzY3JlZW5PYnNlcnZlclN0YXJ0ZWQgPSB0cnVlO1xuXG4gICAgY29uc3Qgc3RhcnRPYnNlcnZlciA9ICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XG4gICAgICAgICAgICBoaWRlRnVsbHNjcmVlbkNvbnRyb2xzKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQuYm9keSwge1xuICAgICAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgICAgICAgc3VidHJlZTogdHJ1ZSxcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHRydWUsXG4gICAgICAgICAgICBhdHRyaWJ1dGVGaWx0ZXI6IFtcImNsYXNzXCIsIFwidGl0bGVcIiwgXCJhcmlhLWxhYmVsXCJdLFxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgaWYgKGRvY3VtZW50LmJvZHkpIHtcbiAgICAgICAgc3RhcnRPYnNlcnZlcigpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgYm9keU9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKF8sIG9icykgPT4ge1xuICAgICAgICBpZiAoIWRvY3VtZW50LmJvZHkpIHJldHVybjtcbiAgICAgICAgb2JzLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgc3RhcnRPYnNlcnZlcigpO1xuICAgIH0pO1xuXG4gICAgYm9keU9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCB7XG4gICAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICAgICAgc3VidHJlZTogdHJ1ZSxcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gaGlkZUZ1bGxzY3JlZW5Db250cm9scygpOiB2b2lkIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsPEhUTUxFbGVtZW50PihGVUxMU0NSRUVOX0NPTlRST0xfU0VMRUNUT1JTLmpvaW4oXCIsXCIpKS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgIGlmIChlbGVtZW50LmNsb3Nlc3QoJ1tjbGFzcyo9XCJtZW51LWJ1dHRvbi1jb250YWluZXJcIl0nKSB8fCBlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcInN0cmVtaW8tZW5oYW5jZWQtcGlwLWJ1dHRvblwiKSkgcmV0dXJuO1xuICAgICAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgZWxlbWVudC5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJub25lXCI7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHNldHVwSW1wb3J0QnV0dG9uKGJ1dHRvbklkOiBzdHJpbmcsIHR5cGU6IFwidGhlbWVcIiB8IFwicGx1Z2luXCIpOiB2b2lkIHtcbiAgICBiaW5kQnV0dG9uQ2xpY2soYnV0dG9uSWQsICgpID0+IGltcG9ydE1vZEZpbGUodHlwZSksIGAke3R5cGV9IGltcG9ydCBidXR0b25gKTtcbn1cblxuZnVuY3Rpb24gc2V0dXBNYW5hZ2VkRm9sZGVyQnV0dG9uKGJ1dHRvbklkOiBzdHJpbmcsIGZvbGRlclBhdGg6IHN0cmluZyk6IHZvaWQge1xuICAgIGJpbmRCdXR0b25DbGljayhidXR0b25JZCwgKCkgPT4gUGxhdGZvcm1NYW5hZ2VyLmN1cnJlbnQub3BlblBhdGgoZm9sZGVyUGF0aCksIGBmb2xkZXIgYnV0dG9uICR7YnV0dG9uSWR9YCk7XG59XG5cbmxldCBpc0ltcG9ydGluZyA9IGZhbHNlO1xuZnVuY3Rpb24gc2FuaXRpemVJbXBvcnRlZE1vZEZpbGVOYW1lKGZpbGVOYW1lOiBzdHJpbmcsIHR5cGU6IFwidGhlbWVcIiB8IFwicGx1Z2luXCIpOiBzdHJpbmcgfCBudWxsIHtcbiAgICBjb25zdCBub3JtYWxpemVkID0gZmlsZU5hbWUudHJpbSgpLnNwbGl0KC9bXFxcXC9dLykucG9wKCkgfHwgXCJcIjtcbiAgICByZXR1cm4gaXNTYWZlTW9kRmlsZU5hbWUobm9ybWFsaXplZCwgdHlwZSkgPyBub3JtYWxpemVkIDogbnVsbDtcbn1cblxuYXN5bmMgZnVuY3Rpb24gaW1wb3J0TW9kRmlsZSh0eXBlOiBcInRoZW1lXCIgfCBcInBsdWdpblwiKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKGlzSW1wb3J0aW5nKSByZXR1cm47XG4gICAgaXNJbXBvcnRpbmcgPSB0cnVlO1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IEZpbGVQaWNrZXIucGlja0ZpbGVzKHsgbGltaXQ6IDEgfSk7XG4gICAgICAgIGNvbnN0IGZpbGUgPSByZXN1bHQuZmlsZXNbMF07XG4gICAgICAgIGNvbnN0IGZpbGVQYXRoID0gKGZpbGUgYXMgeyBwYXRoPzogc3RyaW5nOyB1cmk/OiBzdHJpbmcgfSB8IHVuZGVmaW5lZCk/LnBhdGhcbiAgICAgICAgICAgID8/IChmaWxlIGFzIHsgcGF0aD86IHN0cmluZzsgdXJpPzogc3RyaW5nIH0gfCB1bmRlZmluZWQpPy51cmk7XG5cbiAgICAgICAgaWYgKCFmaWxlPy5uYW1lIHx8ICFmaWxlUGF0aCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2FmZUZpbGVOYW1lID0gc2FuaXRpemVJbXBvcnRlZE1vZEZpbGVOYW1lKGZpbGUubmFtZSwgdHlwZSk7XG4gICAgICAgIGNvbnN0IGV4cGVjdGVkRXh0ZW5zaW9uID0gdHlwZSA9PT0gXCJ0aGVtZVwiID8gRklMRV9FWFRFTlNJT05TLlRIRU1FIDogRklMRV9FWFRFTlNJT05TLlBMVUdJTjtcbiAgICAgICAgaWYgKCFzYWZlRmlsZU5hbWUpIHtcbiAgICAgICAgICAgIGF3YWl0IEhlbHBlcnMuc2hvd0FsZXJ0KFxuICAgICAgICAgICAgICAgIFwid2FybmluZ1wiLFxuICAgICAgICAgICAgICAgIFwiVW5zdXBwb3J0ZWQgRmlsZVwiLFxuICAgICAgICAgICAgICAgIGBQbGVhc2UgY2hvb3NlIGEgdmFsaWQgJHtleHBlY3RlZEV4dGVuc2lvbn0gZmlsZSBuYW1lLmAsXG4gICAgICAgICAgICAgICAgW1wiT0tcIl1cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgUGxhdGZvcm1NYW5hZ2VyLmN1cnJlbnQucmVhZEZpbGUoZmlsZVBhdGgpO1xuICAgICAgICBjb25zdCBkZXN0aW5hdGlvbkRpcmVjdG9yeSA9IHR5cGUgPT09IFwidGhlbWVcIiA/IHByb3BlcnRpZXMudGhlbWVzUGF0aCA6IHByb3BlcnRpZXMucGx1Z2luc1BhdGg7XG4gICAgICAgIGF3YWl0IFBsYXRmb3JtTWFuYWdlci5jdXJyZW50LndyaXRlRmlsZShqb2luKGRlc3RpbmF0aW9uRGlyZWN0b3J5LCBzYWZlRmlsZU5hbWUpLCBjb250ZW50KTtcblxuICAgICAgICAvLyBVc2UgYSB0aW1lb3V0IHRvIGF2b2lkIGxvY2F0aW9uLnJlbG9hZCgpIHRyaWdnZXJpbmcgbG9vcCBpc3N1ZXMgd2l0aCBDYXBhY2l0b3IgQWN0aXZpdHkgUmVzdWx0c1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGxvY2F0aW9uLnJlbG9hZCgpLCAxMDApO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zdCBtZXNzYWdlID0gZXJyIGluc3RhbmNlb2YgRXJyb3IgPyBlcnIubWVzc2FnZSA6IFN0cmluZyhlcnIpO1xuICAgICAgICBpZiAoL2NhbmNlbHxjYW5jZWxlZHxjYW5jZWxsZWR8bm8gZmlsZXMgc2VsZWN0ZWQvaS50ZXN0KG1lc3NhZ2UpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsb2dnZXIuZXJyb3IoYEZhaWxlZCB0byBpbXBvcnQgJHt0eXBlfTogJHttZXNzYWdlfWApO1xuICAgIH0gZmluYWxseSB7XG4gICAgICAgIC8vIHNsaWdodCBkZWxheSBiZWZvcmUgdW5sb2NraW5nIHRvIGF2b2lkIGRvdWJsZSBjbGljayBldmVudHMgYWZ0ZXIgZm9jdXMgcmV0dXJuc1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHsgaXNJbXBvcnRpbmcgPSBmYWxzZTsgfSwgNTAwKTtcbiAgICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHN5bmNQbGF5ZXJGZWF0dXJlcygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoIVBsYXRmb3JtTWFuYWdlci5jdXJyZW50LmlzUGljdHVyZUluUGljdHVyZVN1cHBvcnRlZCgpKSB7XG4gICAgICAgIHJlbW92ZVBpY3R1cmVJblBpY3R1cmVCdXR0b24oKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghbG9jYXRpb24uaHJlZi5pbmNsdWRlcyhQTEFZRVJfUk9VVEUpKSB7XG4gICAgICAgIHJlbW92ZVBpY3R1cmVJblBpY3R1cmVCdXR0b24oKTtcbiAgICAgICAgYXdhaXQgUGxhdGZvcm1NYW5hZ2VyLmN1cnJlbnQuc2V0UGljdHVyZUluUGljdHVyZVN0YXRlKGZhbHNlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHZpZGVvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcInZpZGVvXCIpIGFzIEhUTUxWaWRlb0VsZW1lbnQgfCBudWxsO1xuICAgIGlmICghdmlkZW8pIHtcbiAgICAgICAgcmVtb3ZlUGljdHVyZUluUGljdHVyZUJ1dHRvbigpO1xuICAgICAgICBhd2FpdCBQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC5zZXRQaWN0dXJlSW5QaWN0dXJlU3RhdGUoZmFsc2UpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgYmluZFBsYXllclBpY3R1cmVJblBpY3R1cmUodmlkZW8pO1xuICAgIGluamVjdFBpY3R1cmVJblBpY3R1cmVCdXR0b24oKTtcbiAgICBhd2FpdCB1cGRhdGVQaWN0dXJlSW5QaWN0dXJlU3RhdGUodmlkZW8pO1xufVxuXG5mdW5jdGlvbiBiaW5kUGxheWVyUGljdHVyZUluUGljdHVyZSh2aWRlbzogSFRNTFZpZGVvRWxlbWVudCk6IHZvaWQge1xuICAgIGlmICh2aWRlby5kYXRhc2V0LnN0cmVtaW9FbmhhbmNlZFBpcEJvdW5kID09PSBcInRydWVcIikgcmV0dXJuO1xuICAgIHZpZGVvLmRhdGFzZXQuc3RyZW1pb0VuaGFuY2VkUGlwQm91bmQgPSBcInRydWVcIjtcblxuICAgIGNvbnN0IHN5bmNTdGF0ZSA9ICgpID0+IHtcbiAgICAgICAgdm9pZCB1cGRhdGVQaWN0dXJlSW5QaWN0dXJlU3RhdGUodmlkZW8pO1xuICAgIH07XG5cbiAgICBbXCJsb2FkZWRtZXRhZGF0YVwiLCBcInBsYXlcIiwgXCJwYXVzZVwiLCBcImVuZGVkXCIsIFwiZW1wdGllZFwiLCBcInJlc2l6ZVwiXS5mb3JFYWNoKChldmVudE5hbWUpID0+IHtcbiAgICAgICAgdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIHN5bmNTdGF0ZSk7XG4gICAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVBpY3R1cmVJblBpY3R1cmVTdGF0ZSh2aWRlbz86IEhUTUxWaWRlb0VsZW1lbnQpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoIVBsYXRmb3JtTWFuYWdlci5jdXJyZW50LmlzUGljdHVyZUluUGljdHVyZVN1cHBvcnRlZCgpKSByZXR1cm47XG5cbiAgICBjb25zdCBjdXJyZW50VmlkZW8gPSB2aWRlbyA/PyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwidmlkZW9cIikgYXMgSFRNTFZpZGVvRWxlbWVudCB8IG51bGw7XG4gICAgaWYgKCFjdXJyZW50VmlkZW8gfHwgIWxvY2F0aW9uLmhyZWYuaW5jbHVkZXMoUExBWUVSX1JPVVRFKSkge1xuICAgICAgICBhd2FpdCBQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC5zZXRQaWN0dXJlSW5QaWN0dXJlU3RhdGUoZmFsc2UpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgd2lkdGggPSBjdXJyZW50VmlkZW8udmlkZW9XaWR0aCB8fCAxNjtcbiAgICBjb25zdCBoZWlnaHQgPSBjdXJyZW50VmlkZW8udmlkZW9IZWlnaHQgfHwgOTtcbiAgICBjb25zdCBpc0FjdGl2ZVBsYXliYWNrID0gY3VycmVudFZpZGVvLnJlYWR5U3RhdGUgPiAwICYmICFjdXJyZW50VmlkZW8ucGF1c2VkICYmICFjdXJyZW50VmlkZW8uZW5kZWQ7XG5cbiAgICBhd2FpdCBQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC5zZXRQaWN0dXJlSW5QaWN0dXJlU3RhdGUoaXNBY3RpdmVQbGF5YmFjaywgd2lkdGgsIGhlaWdodCk7XG59XG5cbmZ1bmN0aW9uIGluamVjdFBpY3R1cmVJblBpY3R1cmVCdXR0b24oKTogdm9pZCB7XG4gICAgY29uc3QgZXhpc3RpbmdCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0cmVtaW8tZW5oYW5jZWQtcGlwLWJ0blwiKTtcbiAgICBpZiAoZXhpc3RpbmdCdXR0b24pIHJldHVybjtcblxuICAgIGNvbnN0IGJ1dHRvbnNDb250YWluZXIgPSBnZXRQaWN0dXJlSW5QaWN0dXJlQnV0dG9uQ29udGFpbmVyKCk7XG4gICAgaWYgKCFidXR0b25zQ29udGFpbmVyKSByZXR1cm47XG5cbiAgICBjb25zdCB0ZW1wbGF0ZUJ1dHRvbiA9IGJ1dHRvbnNDb250YWluZXIuZmlyc3RFbGVtZW50Q2hpbGQgYXMgSFRNTEVsZW1lbnQgfCBudWxsO1xuICAgIGNvbnN0IHRlbXBsYXRlSWNvbiA9IHRlbXBsYXRlQnV0dG9uPy5xdWVyeVNlbGVjdG9yKFwic3ZnXCIpO1xuXG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBidXR0b24uaWQgPSBcInN0cmVtaW8tZW5oYW5jZWQtcGlwLWJ0blwiO1xuICAgIGJ1dHRvbi50eXBlID0gXCJidXR0b25cIjtcbiAgICBidXR0b24udGl0bGUgPSBcIlBpY3R1cmUgaW4gUGljdHVyZVwiO1xuICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIFwiUGljdHVyZSBpbiBQaWN0dXJlXCIpO1xuICAgIGJ1dHRvbi5jbGFzc05hbWUgPSBgJHt0ZW1wbGF0ZUJ1dHRvbj8uY2xhc3NOYW1lID8/IFwiXCJ9IHN0cmVtaW8tZW5oYW5jZWQtcGlwLWJ1dHRvbmAudHJpbSgpO1xuICAgIGJ1dHRvbi5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxzdmcgY2xhc3M9XCIke3RlbXBsYXRlSWNvbj8uZ2V0QXR0cmlidXRlKFwiY2xhc3NcIikgPz8gXCJcIn1cIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+XG4gICAgICAgICAgICA8cGF0aCBkPVwiTTE5IDdINXYxMGgxNFY3Wm0wLTJjMS4xMSAwIDIgLjg5IDIgMnYxMGMwIDEuMTEtLjg5IDItMiAySDVjLTEuMTEgMC0yLS44OS0yLTJWN2MwLTEuMTEuODktMiAyLTJoMTRabS0xIDdoLTZ2NGg2di00WlwiIHN0eWxlPVwiZmlsbDogY3VycmVudENvbG9yO1wiPjwvcGF0aD5cbiAgICAgICAgPC9zdmc+XG4gICAgYDtcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgY3VycmVudFZpZGVvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcInZpZGVvXCIpIGFzIEhUTUxWaWRlb0VsZW1lbnQgfCBudWxsO1xuICAgICAgICBjb25zdCBzdWNjZXNzID0gYXdhaXQgUGxhdGZvcm1NYW5hZ2VyLmN1cnJlbnQuZW50ZXJQaWN0dXJlSW5QaWN0dXJlKFxuICAgICAgICAgICAgY3VycmVudFZpZGVvPy52aWRlb1dpZHRoIHx8IDE2LFxuICAgICAgICAgICAgY3VycmVudFZpZGVvPy52aWRlb0hlaWdodCB8fCA5XG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKCFzdWNjZXNzKSB7XG4gICAgICAgICAgICBIZWxwZXJzLmNyZWF0ZVRvYXN0KFxuICAgICAgICAgICAgICAgIFwicGlwLXVuYXZhaWxhYmxlXCIsXG4gICAgICAgICAgICAgICAgXCJQaWN0dXJlIGluIFBpY3R1cmVcIixcbiAgICAgICAgICAgICAgICBcIlBpY3R1cmUgaW4gUGljdHVyZSBpcyBub3QgYXZhaWxhYmxlIG9uIHRoaXMgZGV2aWNlLlwiLFxuICAgICAgICAgICAgICAgIFwiZmFpbFwiXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBidXR0b25zQ29udGFpbmVyLmluc2VydEJlZm9yZShidXR0b24sIGJ1dHRvbnNDb250YWluZXIuZmlyc3RDaGlsZCk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVBpY3R1cmVJblBpY3R1cmVCdXR0b24oKTogdm9pZCB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdHJlbWlvLWVuaGFuY2VkLXBpcC1idG5cIik/LnJlbW92ZSgpO1xufVxuXG5mdW5jdGlvbiBnZXRQaWN0dXJlSW5QaWN0dXJlQnV0dG9uQ29udGFpbmVyKCk6IEhUTUxFbGVtZW50IHwgbnVsbCB7XG4gICAgY29uc3QgYWxsQ29udGFpbmVycyA9IEFycmF5LmZyb20oXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGw8SFRNTEVsZW1lbnQ+KCdbY2xhc3MqPVwiaG9yaXpvbnRhbC1uYXYtYmFyLWNvbnRhaW5lci1cIl0gW2NsYXNzKj1cImJ1dHRvbnMtY29udGFpbmVyLVwiXScpXG4gICAgKTtcblxuICAgIHJldHVybiBhbGxDb250YWluZXJzLmF0KC0xKSA/PyBudWxsO1xufVxuXG5mdW5jdGlvbiB3cml0ZUFib3V0KCk6IHZvaWQge1xuICAgIEhlbHBlcnMud2FpdEZvckVsbShTRUxFQ1RPUlMuQUJPVVRfQ0FURUdPUlkpLnRoZW4oYXN5bmMgKCkgPT4ge1xuICAgICAgICBjb25zdCBhYm91dENhdGVnb3J5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihTRUxFQ1RPUlMuQUJPVVRfQ0FURUdPUlkpO1xuICAgICAgICBpZiAoYWJvdXRDYXRlZ29yeSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgICAgICBpZiAoIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RyZW1pby1lbmhhbmNlZC1hYm91dC1jb250ZW50XCIpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYWJvdXRDb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICBhYm91dENvbnRlbnQuaWQgPSBcInN0cmVtaW8tZW5oYW5jZWQtYWJvdXQtY29udGVudFwiO1xuICAgICAgICAgICAgICAgIGFib3V0Q29udGVudC5pbm5lckhUTUwgPSBnZXRBYm91dENhdGVnb3J5VGVtcGxhdGUoXG4gICAgICAgICAgICAgICAgICAgIFwiQW5kcm9pZC12MS4wLjBcIixcbiAgICAgICAgICAgICAgICAgICAgZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBmYWxzZVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgYWJvdXRDYXRlZ29yeS5hcHBlbmRDaGlsZChhYm91dENvbnRlbnQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBTZXR0aW5ncy5hZGRCdXR0b24oXCJPcGVuIExvZ3NcIiwgXCJvcGVuTG9nc0J0blwiLCBTRUxFQ1RPUlMuQUJPVVRfQ0FURUdPUlkpO1xuICAgICAgICAgICAgU2V0dGluZ3MuYWRkQnV0dG9uKFwiRXhwb3J0IExvZ3NcIiwgXCJleHBvcnRMb2dzQnRuXCIsIFNFTEVDVE9SUy5BQk9VVF9DQVRFR09SWSk7XG4gICAgICAgICAgICBTZXR0aW5ncy5hZGRCdXR0b24oXCJSZWxvYWQgU3RyZWFtaW5nIFNlcnZlclwiLCBcInJlbG9hZFN0cmVhbWluZ1NlcnZlckJ0blwiLCBTRUxFQ1RPUlMuQUJPVVRfQ0FURUdPUlkpO1xuICAgICAgICAgICAgU2V0dGluZ3MuYWRkQnV0dG9uKFwiT3BlbiBBcHAgRmlsZXNcIiwgXCJvcGVuRW5oYW5jZWRGb2xkZXJCdG5cIiwgU0VMRUNUT1JTLkFCT1VUX0NBVEVHT1JZKTtcblxuICAgICAgICAgICAgYmluZEJ1dHRvbkNsaWNrKFwib3BlbkxvZ3NCdG5cIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIExvZ01hbmFnZXIuc2hvd0xvZ3MoKTtcbiAgICAgICAgICAgIH0sIFwib3BlbiBsb2dzIGJ1dHRvblwiKTtcblxuICAgICAgICAgICAgYmluZEJ1dHRvbkNsaWNrKFwiZXhwb3J0TG9nc0J0blwiLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZXhwb3J0ZWRQYXRoID0gYXdhaXQgTG9nTWFuYWdlci5leHBvcnRMb2dzKCk7XG4gICAgICAgICAgICAgICAgaWYgKGV4cG9ydGVkUGF0aCkge1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC5vcGVuUGF0aChqb2luKHByb3BlcnRpZXMuZW5oYW5jZWRQYXRoLCBcImxvZ3NcIikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIFwiZXhwb3J0IGxvZ3MgYnV0dG9uXCIpO1xuXG4gICAgICAgICAgICBiaW5kQnV0dG9uQ2xpY2soXCJyZWxvYWRTdHJlYW1pbmdTZXJ2ZXJCdG5cIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGF3YWl0IGVuc3VyZUJ1bmRsZWRTdHJlYW1pbmdTZXJ2ZXJSZWFkeSgpO1xuICAgICAgICAgICAgICAgIHNjaGVkdWxlU3RyZWFtaW5nU2VydmVyUmVsb2FkKCk7XG4gICAgICAgICAgICB9LCBcInJlbG9hZCBzdHJlYW1pbmcgc2VydmVyIGJ1dHRvblwiKTtcblxuICAgICAgICAgICAgYmluZEJ1dHRvbkNsaWNrKFwib3BlbkVuaGFuY2VkRm9sZGVyQnRuXCIsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICBhd2FpdCBQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC5vcGVuUGF0aChwcm9wZXJ0aWVzLmVuaGFuY2VkUGF0aCk7XG4gICAgICAgICAgICB9LCBcIm9wZW4gZW5oYW5jZWQgZm9sZGVyIGJ1dHRvblwiKTtcbiAgICAgICAgfVxuICAgIH0pLmNhdGNoKGVyciA9PiBsb2dnZXIuZXJyb3IoXCJGYWlsZWQgdG8gd3JpdGUgYWJvdXQgc2VjdGlvbjogXCIgKyBlcnIpKTtcbn1cbiIsICJpbXBvcnQgdHlwZSB7IFBsdWdpbkxpc3RlbmVySGFuZGxlIH0gZnJvbSAnQGNhcGFjaXRvci9jb3JlJztcbmltcG9ydCB7IENhcGFjaXRvciB9IGZyb20gJ0BjYXBhY2l0b3IvY29yZSc7XG5cbmltcG9ydCB0eXBlIHsgQ2hhbm5lbFBheWxvYWREYXRhLCBDaGFubmVsQ2FsbGJhY2tEYXRhLCBDaGFubmVsTGlzdGVuZXJDYWxsYmFjaywgU3RhcnRPcHRpb25zIH0gZnJvbSAnLi9kZWZpbml0aW9ucyc7XG5pbXBvcnQgeyBDYXBhY2l0b3JOb2RlSlMgfSBmcm9tICcuL2ltcGxlbWVudGF0aW9uJztcblxuZXhwb3J0IGludGVyZmFjZSBOb2RlSlNJbnRlcmZhY2Uge1xuICAvKipcbiAgICogU3RhcnRzIHRoZSBOb2RlLmpzIGVuZ2luZSB3aXRoIHByb3BlcnRpZXMgYXMgc2V0IGJ5IHRoZSBgb3B0aW9uc2AuXG4gICAqXG4gICAqICoqTm90ZToqKiBUaGlzIG1ldGhvZCBpcyBvbmx5IGF2YWlsYWJsZSBpZiB0aGUgTm9kZS5qcyBlbmdpbmUgc3RhcnR1cCBtb2RlIHdhcyBzZXQgdG8gYCdtYW51YWwnYCB2aWEgdGhlIHBsdWdpbiBjb25maWd1cmF0aW9uLlxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIHN0YXJ0KG9wdGlvbnM/OiBTdGFydE9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+O1xuXG4gIC8qKlxuICAgKiBTZW5kcyBhIG1lc3NhZ2UgdG8gdGhlIE5vZGUuanMgcHJvY2Vzcy5cbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICBzZW5kKGFyZ3M6IENoYW5uZWxQYXlsb2FkRGF0YSk6IFByb21pc2U8dm9pZD47XG5cbiAgLyoqXG4gICAqIFJlc29sdmVzIHdoZW4gdGhlIE5vZGUuanMgcHJvY2VzcyBpcyBpbml0aWFsaXplZC5cbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICB3aGVuUmVhZHkoKTogUHJvbWlzZTx2b2lkPjtcblxuICAvKipcbiAgICogTGlzdGVucyB0byBgZXZlbnROYW1lYCBhbmQgY2FsbHMgYGxpc3RlbmVyRnVuYyhkYXRhKWAgd2hlbiBhIG5ldyBtZXNzYWdlIGFycml2ZXMgZnJvbSB0aGUgTm9kZS5qcyBwcm9jZXNzLlxuICAgKlxuICAgKiAqKk5vdGU6KiogV2hlbiB1c2luZyB0aGUgRWxlY3Ryb24gcGxhdGZvcm0sIFtgUGx1Z2luTGlzdGVuZXJIYW5kbGUucmVtb3ZlKClgXSgjcGx1Z2lubGlzdGVuZXJoYW5kbGUpIGRvZXMgbm90IHdvcmsgZHVlIHRvIGxpbWl0YXRpb25zLlxuICAgKiBVc2UgW2ByZW1vdmVMaXN0ZW5lcihsaXN0ZW5lckZ1bmMpYF0oI3JlbW92ZWxpc3RlbmVyKSBpbnN0ZWFkLlxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIGFkZExpc3RlbmVyKFxuICAgIGV2ZW50TmFtZTogc3RyaW5nLFxuICAgIGxpc3RlbmVyRnVuYzogQ2hhbm5lbExpc3RlbmVyQ2FsbGJhY2ssXG4gICk6IFByb21pc2U8UGx1Z2luTGlzdGVuZXJIYW5kbGU+O1xuXG4gIC8qKlxuICAgKiBSZW1vdmVzIHRoZSBzcGVjaWZpZWQgYGxpc3RlbmVySGFuZGxlYCBmcm9tIHRoZSBsaXN0ZW5lciBhcnJheSBmb3IgdGhlIGV2ZW50IGl0IHJlZmVycyB0by5cbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICByZW1vdmVMaXN0ZW5lcihsaXN0ZW5lckhhbmRsZTogUGx1Z2luTGlzdGVuZXJIYW5kbGUpOiBQcm9taXNlPHZvaWQ+O1xuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFsbCBsaXN0ZW5lcnMsIG9yIHRob3NlIG9mIHRoZSBzcGVjaWZpZWQgYGV2ZW50TmFtZWAsIGZvciB0aGlzIHBsdWdpbi5cbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICByZW1vdmVBbGxMaXN0ZW5lcnMoZXZlbnROYW1lPzogc3RyaW5nKTogUHJvbWlzZTx2b2lkPjtcbn1cblxuY2xhc3MgTm9kZUpTUGx1Z2luIGltcGxlbWVudHMgTm9kZUpTSW50ZXJmYWNlIHtcbiAgcHJpdmF0ZSByZWFkb25seSBsaXN0ZW5lckxpc3Q6IHtcbiAgICBldmVudE5hbWU6IHN0cmluZztcbiAgICBsaXN0ZW5lckhhbmRsZTogUHJvbWlzZTxQbHVnaW5MaXN0ZW5lckhhbmRsZT47XG4gIH1bXSA9IFtdO1xuXG4gIHN0YXJ0KGFyZ3M/OiBTdGFydE9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gQ2FwYWNpdG9yTm9kZUpTLnN0YXJ0KGFyZ3MpO1xuICB9XG5cbiAgc2VuZChhcmdzOiBDaGFubmVsUGF5bG9hZERhdGEpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gQ2FwYWNpdG9yTm9kZUpTLnNlbmQoYXJncyk7XG4gIH1cblxuICB3aGVuUmVhZHkoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIENhcGFjaXRvck5vZGVKUy53aGVuUmVhZHkoKTtcbiAgfVxuXG4gIGFkZExpc3RlbmVyKFxuICAgIGV2ZW50TmFtZTogc3RyaW5nLFxuICAgIGxpc3RlbmVyRnVuYzogQ2hhbm5lbExpc3RlbmVyQ2FsbGJhY2ssXG4gICk6IFByb21pc2U8UGx1Z2luTGlzdGVuZXJIYW5kbGU+O1xuXG4gIGFkZExpc3RlbmVyKFxuICAgIGV2ZW50TmFtZTogYW55LFxuICAgIGxpc3RlbmVyRnVuYzogQ2hhbm5lbExpc3RlbmVyQ2FsbGJhY2ssXG4gICk6IFByb21pc2U8UGx1Z2luTGlzdGVuZXJIYW5kbGU+IHtcbiAgICBjb25zdCBsaXN0ZW5lckhhbmRsZSA9IENhcGFjaXRvck5vZGVKUy5hZGRMaXN0ZW5lcihldmVudE5hbWUsIChkYXRhOiBDaGFubmVsQ2FsbGJhY2tEYXRhKSA9PiB7XG4gICAgICBsaXN0ZW5lckZ1bmMoZGF0YSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmxpc3RlbmVyTGlzdC5wdXNoKHsgZXZlbnROYW1lLCBsaXN0ZW5lckhhbmRsZSB9KTtcbiAgICByZXR1cm4gbGlzdGVuZXJIYW5kbGU7XG4gIH1cblxuICBhc3luYyByZW1vdmVMaXN0ZW5lcihsaXN0ZW5lckhhbmRsZTogUGx1Z2luTGlzdGVuZXJIYW5kbGUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoQ2FwYWNpdG9yLmdldFBsYXRmb3JtKCkgPT09ICdlbGVjdHJvbicpIHtcbiAgICAgIGF3YWl0IChDYXBhY2l0b3JOb2RlSlMgYXMgYW55KS5yZW1vdmVMaXN0ZW5lcihsaXN0ZW5lckhhbmRsZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGF3YWl0IGxpc3RlbmVySGFuZGxlLnJlbW92ZSgpO1xuICAgIH1cblxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLmxpc3RlbmVyTGlzdC5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIGNvbnN0IGxpc3RlbmVyID0gdGhpcy5saXN0ZW5lckxpc3RbaW5kZXhdO1xuXG4gICAgICBpZiAobGlzdGVuZXJIYW5kbGUgPT09IChhd2FpdCBsaXN0ZW5lci5saXN0ZW5lckhhbmRsZSkpIHtcbiAgICAgICAgdGhpcy5saXN0ZW5lckxpc3Quc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgcmVtb3ZlQWxsTGlzdGVuZXJzKGV2ZW50TmFtZT86IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGZvciAoY29uc3QgbGlzdGVuZXIgb2YgWy4uLnRoaXMubGlzdGVuZXJMaXN0XSkge1xuICAgICAgaWYgKCFldmVudE5hbWUgfHwgZXZlbnROYW1lID09PSBsaXN0ZW5lci5ldmVudE5hbWUpIHtcbiAgICAgICAgY29uc3QgbGlzdGVuZXJIYW5kbGUgPSBhd2FpdCBsaXN0ZW5lci5saXN0ZW5lckhhbmRsZTtcbiAgICAgICAgYXdhaXQgdGhpcy5yZW1vdmVMaXN0ZW5lcihsaXN0ZW5lckhhbmRsZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmNvbnN0IE5vZGVKUyA9IG5ldyBOb2RlSlNQbHVnaW4oKTtcblxuZXhwb3J0IHsgTm9kZUpTIH07XG4iLCAiaW1wb3J0IHR5cGUgeyBQbHVnaW5MaXN0ZW5lckhhbmRsZSB9IGZyb20gJ0BjYXBhY2l0b3IvY29yZSc7XG5pbXBvcnQgeyByZWdpc3RlclBsdWdpbiB9IGZyb20gJ0BjYXBhY2l0b3IvY29yZSc7XG5cbmltcG9ydCB0eXBlIHsgQ2hhbm5lbFBheWxvYWREYXRhLCBDaGFubmVsTGlzdGVuZXJDYWxsYmFjaywgU3RhcnRPcHRpb25zIH0gZnJvbSAnLi9kZWZpbml0aW9ucyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2FwYWNpdG9yTm9kZUpTUGx1Z2luIHtcbiAgc3RhcnQoYXJncz86IFN0YXJ0T3B0aW9ucyk6IFByb21pc2U8dm9pZD47XG4gIHNlbmQoYXJnczogQ2hhbm5lbFBheWxvYWREYXRhKTogUHJvbWlzZTx2b2lkPjtcbiAgd2hlblJlYWR5KCk6IFByb21pc2U8dm9pZD47XG5cbiAgYWRkTGlzdGVuZXIoXG4gICAgZXZlbnROYW1lOiBzdHJpbmcsXG4gICAgbGlzdGVuZXJGdW5jOiBDaGFubmVsTGlzdGVuZXJDYWxsYmFjayxcbiAgKTogUHJvbWlzZTxQbHVnaW5MaXN0ZW5lckhhbmRsZT47XG59XG5cbmNvbnN0IENhcGFjaXRvck5vZGVKUyA9IHJlZ2lzdGVyUGx1Z2luPENhcGFjaXRvck5vZGVKU1BsdWdpbj4oJ0NhcGFjaXRvck5vZGVKUycsIHtcbiAgd2ViOiAoKSA9PiBpbXBvcnQoJy4vd2ViJykudGhlbigobSkgPT4gbmV3IG0uQ2FwYWNpdG9yTm9kZUpTV2ViKCkpLFxuICBlbGVjdHJvbjogKCkgPT4gKHdpbmRvdyBhcyBhbnkpLkNhcGFjaXRvckN1c3RvbVBsYXRmb3JtLnBsdWdpbnMuQ2FwYWNpdG9yTm9kZUpTLFxufSk7XG5cbmV4cG9ydCB7IENhcGFjaXRvck5vZGVKUyB9O1xuIiwgImltcG9ydCB7IGpvaW4gfSBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgUGxhdGZvcm1NYW5hZ2VyIH0gZnJvbSBcIi4uL3BsYXRmb3JtL1BsYXRmb3JtTWFuYWdlclwiO1xuaW1wb3J0IHByb3BlcnRpZXMgZnJvbSBcIi4vUHJvcGVydGllc1wiO1xuXG5leHBvcnQgdHlwZSBMb2dMZXZlbCA9ICdJTkZPJyB8ICdXQVJOJyB8ICdFUlJPUicgfCAnREVCVUcnO1xuXG5pbnRlcmZhY2UgTG9nRW50cnkge1xuICAgIHRpbWVzdGFtcDogc3RyaW5nO1xuICAgIGxldmVsOiBMb2dMZXZlbDtcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG59XG5cbmNsYXNzIExvZ01hbmFnZXIge1xuICAgIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBMb2dNYW5hZ2VyO1xuICAgIHByaXZhdGUgbG9nczogTG9nRW50cnlbXSA9IFtdO1xuICAgIHByaXZhdGUgbWF4TG9ncyA9IDEwMDA7XG4gICAgcHJpdmF0ZSBvcmlnaW5hbENvbnNvbGU6IGFueSA9IHt9O1xuICAgIHByaXZhdGUgaXNIb29rZWQgPSBmYWxzZTtcblxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKSB7fVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBMb2dNYW5hZ2VyIHtcbiAgICAgICAgaWYgKCFMb2dNYW5hZ2VyLmluc3RhbmNlKSB7XG4gICAgICAgICAgICBMb2dNYW5hZ2VyLmluc3RhbmNlID0gbmV3IExvZ01hbmFnZXIoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gTG9nTWFuYWdlci5pbnN0YW5jZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaG9va0NvbnNvbGUoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmlzSG9va2VkKSByZXR1cm47XG4gICAgICAgIHRoaXMuaXNIb29rZWQgPSB0cnVlO1xuXG4gICAgICAgIGNvbnN0IG1ldGhvZHM6IExvZ0xldmVsW10gPSBbJ0lORk8nLCAnV0FSTicsICdFUlJPUicsICdERUJVRyddO1xuXG4gICAgICAgIG1ldGhvZHMuZm9yRWFjaChsZXZlbCA9PiB7XG4gICAgICAgICAgICBjb25zdCBjb25zb2xlTWV0aG9kID0gbGV2ZWwudG9Mb3dlckNhc2UoKSBhcyBrZXlvZiBDb25zb2xlO1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgICAgIHRoaXMub3JpZ2luYWxDb25zb2xlW2NvbnNvbGVNZXRob2RdID0gKGNvbnNvbGUgYXMgYW55KVtjb25zb2xlTWV0aG9kXS5iaW5kKGNvbnNvbGUpO1xuXG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICAgICAgKGNvbnNvbGUgYXMgYW55KVtjb25zb2xlTWV0aG9kXSA9ICguLi5hcmdzOiBhbnlbXSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkTG9nKGxldmVsLCBhcmdzLm1hcChhcmcgPT5cbiAgICAgICAgICAgICAgICAgICAgdHlwZW9mIGFyZyA9PT0gJ29iamVjdCcgPyBKU09OLnN0cmluZ2lmeShhcmcpIDogU3RyaW5nKGFyZylcbiAgICAgICAgICAgICAgICApLmpvaW4oJyAnKSk7XG5cbiAgICAgICAgICAgICAgICAvLyBDYWxsIG9yaWdpbmFsXG4gICAgICAgICAgICAgICAgdGhpcy5vcmlnaW5hbENvbnNvbGVbY29uc29sZU1ldGhvZF0oLi4uYXJncyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBIb29rIGxvZyBhcyBJTkZPXG4gICAgICAgIHRoaXMub3JpZ2luYWxDb25zb2xlWydsb2cnXSA9IGNvbnNvbGUubG9nLmJpbmQoY29uc29sZSk7XG4gICAgICAgIGNvbnNvbGUubG9nID0gKC4uLmFyZ3M6IGFueVtdKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmFkZExvZygnSU5GTycsIGFyZ3MubWFwKGFyZyA9PlxuICAgICAgICAgICAgICAgIHR5cGVvZiBhcmcgPT09ICdvYmplY3QnID8gSlNPTi5zdHJpbmdpZnkoYXJnKSA6IFN0cmluZyhhcmcpXG4gICAgICAgICAgICApLmpvaW4oJyAnKSk7XG4gICAgICAgICAgICB0aGlzLm9yaWdpbmFsQ29uc29sZVsnbG9nJ10oLi4uYXJncyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgYWRkTG9nKGxldmVsOiBMb2dMZXZlbCwgbWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHRpbWVzdGFtcCA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzFdLnNsaWNlKDAsIC0xKTtcbiAgICAgICAgdGhpcy5sb2dzLnB1c2goeyB0aW1lc3RhbXAsIGxldmVsLCBtZXNzYWdlIH0pO1xuICAgICAgICBpZiAodGhpcy5sb2dzLmxlbmd0aCA+IHRoaXMubWF4TG9ncykge1xuICAgICAgICAgICAgdGhpcy5sb2dzLnNoaWZ0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgZXhwb3J0TG9ncygpOiBQcm9taXNlPHN0cmluZyB8IG51bGw+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IGxvZ3NEaXIgPSBqb2luKHByb3BlcnRpZXMuZW5oYW5jZWRQYXRoLCBcImxvZ3NcIik7XG4gICAgICAgICAgICBpZiAoIWF3YWl0IFBsYXRmb3JtTWFuYWdlci5jdXJyZW50LmV4aXN0cyhsb2dzRGlyKSkge1xuICAgICAgICAgICAgICAgIGF3YWl0IFBsYXRmb3JtTWFuYWdlci5jdXJyZW50Lm1rZGlyKGxvZ3NEaXIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBmaWxlTmFtZSA9IGBzdHJlbWlvLWVuaGFuY2VkLSR7bmV3IERhdGUoKS50b0lTT1N0cmluZygpLnJlcGxhY2UoL1s6Ll0vZywgXCItXCIpfS5sb2dgO1xuICAgICAgICAgICAgY29uc3QgZmlsZVBhdGggPSBqb2luKGxvZ3NEaXIsIGZpbGVOYW1lKTtcbiAgICAgICAgICAgIGF3YWl0IFBsYXRmb3JtTWFuYWdlci5jdXJyZW50LndyaXRlRmlsZShmaWxlUGF0aCwgdGhpcy5zZXJpYWxpemVMb2dzKCkpO1xuICAgICAgICAgICAgcmV0dXJuIGZpbGVQYXRoO1xuICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHNob3dMb2dzKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBvdmVybGF5SWQgPSAnc3RyZW1pby1lbmhhbmNlZC1sb2dzLW92ZXJsYXknO1xuICAgICAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQob3ZlcmxheUlkKSkgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgb3ZlcmxheS5pZCA9IG92ZXJsYXlJZDtcbiAgICAgICAgb3ZlcmxheS5zdHlsZS5jc3NUZXh0ID0gYFxuICAgICAgICAgICAgcG9zaXRpb246IGZpeGVkO1xuICAgICAgICAgICAgdG9wOiAwO1xuICAgICAgICAgICAgbGVmdDogMDtcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICAgICAgYmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwLjgpO1xuICAgICAgICAgICAgei1pbmRleDogOTk5OTk7XG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgICAgIHBhZGRpbmc6IDIwcHg7XG4gICAgICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICAgICAgY29sb3I6ICNmZmY7XG4gICAgICAgICAgICBmb250LWZhbWlseTogbW9ub3NwYWNlO1xuICAgICAgICBgO1xuXG4gICAgICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBoZWFkZXIuc3R5bGUuY3NzVGV4dCA9IGBcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgICAgbWFyZ2luLWJvdHRvbTogMTBweDtcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICMxYTFhMWE7XG4gICAgICAgICAgICBwYWRkaW5nOiAxMHB4O1xuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogNXB4O1xuICAgICAgICBgO1xuXG4gICAgICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcbiAgICAgICAgdGl0bGUudGV4dENvbnRlbnQgPSAnTG9ncyc7XG4gICAgICAgIHRpdGxlLnN0eWxlLm1hcmdpbiA9ICcwJztcblxuICAgICAgICBjb25zdCBjb250cm9scyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb250cm9scy5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuICAgICAgICBjb250cm9scy5zdHlsZS5nYXAgPSAnMTBweCc7XG5cbiAgICAgICAgY29uc3QgZmlsdGVyU2VsZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VsZWN0Jyk7XG4gICAgICAgIGZpbHRlclNlbGVjdC5zdHlsZS5jc3NUZXh0ID0gYFxuICAgICAgICAgICAgYmFja2dyb3VuZDogIzMzMztcbiAgICAgICAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICM1NTU7XG4gICAgICAgICAgICBwYWRkaW5nOiA1cHg7XG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiAzcHg7XG4gICAgICAgIGA7XG4gICAgICAgIFsnQUxMJywgJ0lORk8nLCAnV0FSTicsICdFUlJPUiddLmZvckVhY2gobGV2ZWwgPT4ge1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG4gICAgICAgICAgICBvcHRpb24udmFsdWUgPSBsZXZlbDtcbiAgICAgICAgICAgIG9wdGlvbi50ZXh0Q29udGVudCA9IGxldmVsO1xuICAgICAgICAgICAgZmlsdGVyU2VsZWN0LmFwcGVuZENoaWxkKG9wdGlvbik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGNvcHlCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgY29weUJ0bi50ZXh0Q29udGVudCA9ICdDb3B5IEFsbCc7XG4gICAgICAgIGNvcHlCdG4uc3R5bGUuY3NzVGV4dCA9IGBcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICM0YTRhNGE7XG4gICAgICAgICAgICBjb2xvcjogd2hpdGU7XG4gICAgICAgICAgICBib3JkZXI6IG5vbmU7XG4gICAgICAgICAgICBwYWRkaW5nOiA1cHggMTBweDtcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDNweDtcbiAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgYDtcblxuICAgICAgICBjb25zdCBleHBvcnRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgZXhwb3J0QnRuLnRleHRDb250ZW50ID0gJ0V4cG9ydCc7XG4gICAgICAgIGV4cG9ydEJ0bi5zdHlsZS5jc3NUZXh0ID0gYFxuICAgICAgICAgICAgYmFja2dyb3VuZDogIzI1NjNlYjtcbiAgICAgICAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICAgICAgICAgIGJvcmRlcjogbm9uZTtcbiAgICAgICAgICAgIHBhZGRpbmc6IDVweCAxMHB4O1xuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogM3B4O1xuICAgICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICBgO1xuXG4gICAgICAgIGNvbnN0IGNsb3NlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIGNsb3NlQnRuLnRleHRDb250ZW50ID0gJ0Nsb3NlJztcbiAgICAgICAgY2xvc2VCdG4uc3R5bGUuY3NzVGV4dCA9IGBcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICNjMDM5MmI7XG4gICAgICAgICAgICBjb2xvcjogd2hpdGU7XG4gICAgICAgICAgICBib3JkZXI6IG5vbmU7XG4gICAgICAgICAgICBwYWRkaW5nOiA1cHggMTBweDtcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDNweDtcbiAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgYDtcblxuICAgICAgICBjb250cm9scy5hcHBlbmRDaGlsZChmaWx0ZXJTZWxlY3QpO1xuICAgICAgICBjb250cm9scy5hcHBlbmRDaGlsZChjb3B5QnRuKTtcbiAgICAgICAgY29udHJvbHMuYXBwZW5kQ2hpbGQoZXhwb3J0QnRuKTtcbiAgICAgICAgY29udHJvbHMuYXBwZW5kQ2hpbGQoY2xvc2VCdG4pO1xuICAgICAgICBoZWFkZXIuYXBwZW5kQ2hpbGQodGl0bGUpO1xuICAgICAgICBoZWFkZXIuYXBwZW5kQ2hpbGQoY29udHJvbHMpO1xuXG4gICAgICAgIGNvbnN0IGxvZ3NDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbG9nc0NvbnRhaW5lci5pZCA9ICdsb2dzLWNvbnRhaW5lcic7XG4gICAgICAgIGxvZ3NDb250YWluZXIuc3R5bGUuY3NzVGV4dCA9IGBcbiAgICAgICAgICAgIGZsZXg6IDE7XG4gICAgICAgICAgICBvdmVyZmxvdy15OiBhdXRvO1xuICAgICAgICAgICAgYmFja2dyb3VuZDogIzExMTtcbiAgICAgICAgICAgIHBhZGRpbmc6IDEwcHg7XG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiA1cHg7XG4gICAgICAgICAgICB3aGl0ZS1zcGFjZTogcHJlLXdyYXA7XG4gICAgICAgICAgICB3b3JkLWJyZWFrOiBicmVhay1hbGw7XG4gICAgICAgICAgICBmb250LXNpemU6IDEycHg7XG4gICAgICAgIGA7XG5cbiAgICAgICAgb3ZlcmxheS5hcHBlbmRDaGlsZChoZWFkZXIpO1xuICAgICAgICBvdmVybGF5LmFwcGVuZENoaWxkKGxvZ3NDb250YWluZXIpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG92ZXJsYXkpO1xuXG4gICAgICAgIGNvbnN0IHJlbmRlckxvZ3MgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmaWx0ZXIgPSBmaWx0ZXJTZWxlY3QudmFsdWU7XG4gICAgICAgICAgICBjb25zdCBmaWx0ZXJlZExvZ3MgPSBmaWx0ZXIgPT09ICdBTEwnXG4gICAgICAgICAgICAgICAgPyB0aGlzLmxvZ3NcbiAgICAgICAgICAgICAgICA6IHRoaXMubG9ncy5maWx0ZXIobCA9PiBsLmxldmVsID09PSBmaWx0ZXIpO1xuXG4gICAgICAgICAgICBsb2dzQ29udGFpbmVyLmlubmVySFRNTCA9IGZpbHRlcmVkTG9ncy5tYXAobCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29sb3IgPSBsLmxldmVsID09PSAnRVJST1InID8gJyNmZjU1NTUnIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGwubGV2ZWwgPT09ICdXQVJOJyA/ICcjZmZiODZjJyA6ICcjNTBmYTdiJztcbiAgICAgICAgICAgICAgICByZXR1cm4gYDxkaXYgc3R5bGU9XCJtYXJnaW4tYm90dG9tOiAycHg7XCI+PHNwYW4gc3R5bGU9XCJjb2xvcjogIzYyNzJhNFwiPlske2wudGltZXN0YW1wfV08L3NwYW4+IDxzcGFuIHN0eWxlPVwiY29sb3I6ICR7Y29sb3J9XCI+WyR7bC5sZXZlbH1dPC9zcGFuPiAke3RoaXMuZXNjYXBlSHRtbChsLm1lc3NhZ2UpfTwvZGl2PmA7XG4gICAgICAgICAgICB9KS5qb2luKCcnKTtcbiAgICAgICAgICAgIGxvZ3NDb250YWluZXIuc2Nyb2xsVG9wID0gbG9nc0NvbnRhaW5lci5zY3JvbGxIZWlnaHQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmVuZGVyTG9ncygpO1xuXG4gICAgICAgIGZpbHRlclNlbGVjdC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCByZW5kZXJMb2dzKTtcblxuICAgICAgICBjb3B5QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGV4dCA9IHRoaXMuc2VyaWFsaXplTG9ncygpO1xuICAgICAgICAgICAgY29uc3QgdGV4dEFyZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGV4dGFyZWFcIik7XG4gICAgICAgICAgICB0ZXh0QXJlYS52YWx1ZSA9IHRleHQ7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRleHRBcmVhKTtcbiAgICAgICAgICAgIHRleHRBcmVhLnNlbGVjdCgpO1xuICAgICAgICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoXCJDb3B5XCIpO1xuICAgICAgICAgICAgdGV4dEFyZWEucmVtb3ZlKCk7XG5cbiAgICAgICAgICAgIGNvbnN0IG9yaWdpbmFsVGV4dCA9IGNvcHlCdG4udGV4dENvbnRlbnQ7XG4gICAgICAgICAgICBjb3B5QnRuLnRleHRDb250ZW50ID0gJ0NvcGllZCEnO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBjb3B5QnRuLnRleHRDb250ZW50ID0gb3JpZ2luYWxUZXh0LCAyMDAwKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZXhwb3J0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgb3JpZ2luYWxUZXh0ID0gZXhwb3J0QnRuLnRleHRDb250ZW50O1xuICAgICAgICAgICAgZXhwb3J0QnRuLnRleHRDb250ZW50ID0gJ0V4cG9ydGluZy4uLic7XG5cbiAgICAgICAgICAgIGNvbnN0IGV4cG9ydGVkUGF0aCA9IGF3YWl0IHRoaXMuZXhwb3J0TG9ncygpO1xuICAgICAgICAgICAgaWYgKGV4cG9ydGVkUGF0aCkge1xuICAgICAgICAgICAgICAgIGV4cG9ydEJ0bi50ZXh0Q29udGVudCA9ICdFeHBvcnRlZCEnO1xuICAgICAgICAgICAgICAgIGF3YWl0IFBsYXRmb3JtTWFuYWdlci5jdXJyZW50Lm9wZW5QYXRoKGpvaW4ocHJvcGVydGllcy5lbmhhbmNlZFBhdGgsIFwibG9nc1wiKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGV4cG9ydEJ0bi50ZXh0Q29udGVudCA9ICdGYWlsZWQnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGV4cG9ydEJ0bi50ZXh0Q29udGVudCA9IG9yaWdpbmFsVGV4dCwgMjAwMCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNsb3NlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgb3ZlcmxheS5yZW1vdmUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXJpYWxpemVMb2dzKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvZ3MubWFwKGxvZyA9PiBgWyR7bG9nLnRpbWVzdGFtcH1dIFske2xvZy5sZXZlbH1dICR7bG9nLm1lc3NhZ2V9YCkuam9pbignXFxuJyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBlc2NhcGVIdG1sKHVuc2FmZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHVuc2FmZVxuICAgICAgICAgICAgIC5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIilcbiAgICAgICAgICAgICAucmVwbGFjZSgvPC9nLCBcIiZsdDtcIilcbiAgICAgICAgICAgICAucmVwbGFjZSgvPi9nLCBcIiZndDtcIilcbiAgICAgICAgICAgICAucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIilcbiAgICAgICAgICAgICAucmVwbGFjZSgvJy9nLCBcIiYjMDM5O1wiKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IExvZ01hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcbiIsICJpbXBvcnQgeyByZWdpc3RlclBsdWdpbiB9IGZyb20gJ0BjYXBhY2l0b3IvY29yZSc7XG5cbmltcG9ydCB0eXBlIHsgRmlsZVBpY2tlclBsdWdpbiB9IGZyb20gJy4vZGVmaW5pdGlvbnMnO1xuLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9jYXBhd2Vzb21lLXRlYW0vY2FwYWNpdG9yLXBsdWdpbnMvaXNzdWVzLzE0XG5pbXBvcnQgKiBhcyB3ZWIgZnJvbSAnLi93ZWInO1xuXG5jb25zdCBGaWxlUGlja2VyID0gcmVnaXN0ZXJQbHVnaW48RmlsZVBpY2tlclBsdWdpbj4oJ0ZpbGVQaWNrZXInLCB7XG4gIHdlYjogKCkgPT4gbmV3IHdlYi5GaWxlUGlja2VyV2ViKCksXG59KTtcblxuZXhwb3J0ICogZnJvbSAnLi9kZWZpbml0aW9ucyc7XG5leHBvcnQgeyBGaWxlUGlja2VyIH07XG4iLCAiaW1wb3J0IHsgV2ViUGx1Z2luIH0gZnJvbSAnQGNhcGFjaXRvci9jb3JlJztcblxuaW1wb3J0IHR5cGUge1xuICBDb252ZXJ0SGVpY1RvSnBlZ09wdGlvbnMsXG4gIENvbnZlcnRIZWljVG9KcGVnUmVzdWx0LFxuICBDb3B5RmlsZU9wdGlvbnMsXG4gIEZpbGVQaWNrZXJQbHVnaW4sXG4gIFBlcm1pc3Npb25TdGF0dXMsXG4gIFBpY2tEaXJlY3RvcnlSZXN1bHQsXG4gIFBpY2tGaWxlc09wdGlvbnMsXG4gIFBpY2tGaWxlc1Jlc3VsdCxcbiAgUGlja0ltYWdlc09wdGlvbnMsXG4gIFBpY2tJbWFnZXNSZXN1bHQsXG4gIFBpY2tNZWRpYU9wdGlvbnMsXG4gIFBpY2tNZWRpYVJlc3VsdCxcbiAgUGlja1ZpZGVvc09wdGlvbnMsXG4gIFBpY2tWaWRlb3NSZXN1bHQsXG4gIFBpY2tlZEZpbGUsXG4gIFJlcXVlc3RQZXJtaXNzaW9uc09wdGlvbnMsXG59IGZyb20gJy4vZGVmaW5pdGlvbnMnO1xuXG5leHBvcnQgY2xhc3MgRmlsZVBpY2tlcldlYiBleHRlbmRzIFdlYlBsdWdpbiBpbXBsZW1lbnRzIEZpbGVQaWNrZXJQbHVnaW4ge1xuICBwdWJsaWMgcmVhZG9ubHkgRVJST1JfUElDS19GSUxFX0NBTkNFTEVEID0gJ3BpY2tGaWxlcyBjYW5jZWxlZC4nO1xuXG4gIHB1YmxpYyBhc3luYyBjaGVja1Blcm1pc3Npb25zKCk6IFByb21pc2U8UGVybWlzc2lvblN0YXR1cz4ge1xuICAgIHRocm93IHRoaXMudW5pbXBsZW1lbnRlZCgnTm90IGltcGxlbWVudGVkIG9uIHdlYi4nKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBjb252ZXJ0SGVpY1RvSnBlZyhcbiAgICBfb3B0aW9uczogQ29udmVydEhlaWNUb0pwZWdPcHRpb25zLFxuICApOiBQcm9taXNlPENvbnZlcnRIZWljVG9KcGVnUmVzdWx0PiB7XG4gICAgdGhyb3cgdGhpcy51bmltcGxlbWVudGVkKCdOb3QgaW1wbGVtZW50ZWQgb24gd2ViLicpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGNvcHlGaWxlKF9vcHRpb25zOiBDb3B5RmlsZU9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0aHJvdyB0aGlzLnVuaW1wbGVtZW50ZWQoJ05vdCBpbXBsZW1lbnRlZCBvbiB3ZWIuJyk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcGlja0ZpbGVzKG9wdGlvbnM/OiBQaWNrRmlsZXNPcHRpb25zKTogUHJvbWlzZTxQaWNrRmlsZXNSZXN1bHQ+IHtcbiAgICBjb25zdCBwaWNrZWRGaWxlcyA9IGF3YWl0IHRoaXMub3BlbkZpbGVQaWNrZXIob3B0aW9ucyk7XG4gICAgaWYgKCFwaWNrZWRGaWxlcykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKHRoaXMuRVJST1JfUElDS19GSUxFX0NBTkNFTEVEKTtcbiAgICB9XG4gICAgY29uc3QgcmVzdWx0OiBQaWNrRmlsZXNSZXN1bHQgPSB7XG4gICAgICBmaWxlczogW10sXG4gICAgfTtcbiAgICBmb3IgKGNvbnN0IHBpY2tlZEZpbGUgb2YgcGlja2VkRmlsZXMpIHtcbiAgICAgIGNvbnN0IGZpbGU6IFBpY2tlZEZpbGUgPSB7XG4gICAgICAgIGJsb2I6IHBpY2tlZEZpbGUsXG4gICAgICAgIG1vZGlmaWVkQXQ6IHBpY2tlZEZpbGUubGFzdE1vZGlmaWVkLFxuICAgICAgICBtaW1lVHlwZTogdGhpcy5nZXRNaW1lVHlwZUZyb21VcmwocGlja2VkRmlsZSksXG4gICAgICAgIG5hbWU6IHRoaXMuZ2V0TmFtZUZyb21VcmwocGlja2VkRmlsZSksXG4gICAgICAgIHBhdGg6IHVuZGVmaW5lZCxcbiAgICAgICAgc2l6ZTogdGhpcy5nZXRTaXplRnJvbVVybChwaWNrZWRGaWxlKSxcbiAgICAgIH07XG4gICAgICBpZiAob3B0aW9ucz8ucmVhZERhdGEpIHtcbiAgICAgICAgZmlsZS5kYXRhID0gYXdhaXQgdGhpcy5nZXREYXRhRnJvbUZpbGUocGlja2VkRmlsZSk7XG4gICAgICB9XG4gICAgICByZXN1bHQuZmlsZXMucHVzaChmaWxlKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBwaWNrRGlyZWN0b3J5KCk6IFByb21pc2U8UGlja0RpcmVjdG9yeVJlc3VsdD4ge1xuICAgIHRocm93IHRoaXMudW5pbXBsZW1lbnRlZCgnTm90IGltcGxlbWVudGVkIG9uIHdlYi4nKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBwaWNrSW1hZ2VzKFxuICAgIG9wdGlvbnM/OiBQaWNrSW1hZ2VzT3B0aW9ucyxcbiAgKTogUHJvbWlzZTxQaWNrSW1hZ2VzUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucGlja0ZpbGVzKHsgdHlwZXM6IFsnaW1hZ2UvKiddLCAuLi5vcHRpb25zIH0pO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHBpY2tNZWRpYShvcHRpb25zPzogUGlja01lZGlhT3B0aW9ucyk6IFByb21pc2U8UGlja01lZGlhUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucGlja0ZpbGVzKHsgdHlwZXM6IFsnaW1hZ2UvKicsICd2aWRlby8qJ10sIC4uLm9wdGlvbnMgfSk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcGlja1ZpZGVvcyhcbiAgICBvcHRpb25zPzogUGlja1ZpZGVvc09wdGlvbnMsXG4gICk6IFByb21pc2U8UGlja1ZpZGVvc1Jlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnBpY2tGaWxlcyh7IHR5cGVzOiBbJ3ZpZGVvLyonXSwgLi4ub3B0aW9ucyB9KTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyByZXF1ZXN0UGVybWlzc2lvbnMoXG4gICAgX29wdGlvbnM/OiBSZXF1ZXN0UGVybWlzc2lvbnNPcHRpb25zLFxuICApOiBQcm9taXNlPFBlcm1pc3Npb25TdGF0dXM+IHtcbiAgICB0aHJvdyB0aGlzLnVuaW1wbGVtZW50ZWQoJ05vdCBpbXBsZW1lbnRlZCBvbiB3ZWIuJyk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIG9wZW5GaWxlUGlja2VyKFxuICAgIG9wdGlvbnM/OiBQaWNrRmlsZXNPcHRpb25zLFxuICApOiBQcm9taXNlPEZpbGVbXSB8IHVuZGVmaW5lZD4ge1xuICAgIGNvbnN0IGFjY2VwdCA9IG9wdGlvbnM/LnR5cGVzPy5qb2luKCcsJykgfHwgJyc7XG4gICAgY29uc3QgbGltaXQgPSBvcHRpb25zPy5saW1pdCA9PT0gdW5kZWZpbmVkID8gMCA6IG9wdGlvbnMubGltaXQ7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgbGV0IG9uQ2hhbmdlRmlyZWQgPSBmYWxzZTtcbiAgICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgIGlucHV0LnR5cGUgPSAnZmlsZSc7XG4gICAgICBpbnB1dC5hY2NlcHQgPSBhY2NlcHQ7XG4gICAgICBpbnB1dC5tdWx0aXBsZSA9IGxpbWl0ID09PSAwO1xuXG4gICAgICBjb25zdCBoYXNDYW5jZWxFdmVudCA9ICdvbmNhbmNlbCcgaW4gaW5wdXQ7XG5cbiAgICAgIGNvbnN0IG9uQ2hhbmdlSGFuZGxlciA9ICgpID0+IHtcbiAgICAgICAgb25DaGFuZ2VGaXJlZCA9IHRydWU7XG4gICAgICAgIHJlbW92ZUFsbExpc3RlbmVycygpO1xuXG4gICAgICAgIGNvbnN0IGZpbGVzID0gQXJyYXkuZnJvbShpbnB1dC5maWxlcyB8fCBbXSk7XG4gICAgICAgIHJlc29sdmUoZmlsZXMpO1xuICAgICAgfTtcbiAgICAgIGNvbnN0IG9uQ2FuY2VsSGFuZGxlciA9ICgpID0+IHtcbiAgICAgICAgcmVtb3ZlQWxsTGlzdGVuZXJzKCk7XG4gICAgICAgIHJlc29sdmUodW5kZWZpbmVkKTtcbiAgICAgIH07XG4gICAgICBjb25zdCBvbkZvY3VzSGFuZGxlciA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgYXdhaXQgdGhpcy53YWl0KDUwMCk7XG4gICAgICAgIGlmIChvbkNoYW5nZUZpcmVkKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHJlbW92ZUFsbExpc3RlbmVycygpO1xuICAgICAgICByZXNvbHZlKHVuZGVmaW5lZCk7XG4gICAgICB9O1xuICAgICAgY29uc3QgcmVtb3ZlQWxsTGlzdGVuZXJzID0gKCkgPT4ge1xuICAgICAgICBpbnB1dC5yZW1vdmVFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBvbkNoYW5nZUhhbmRsZXIpO1xuICAgICAgICBpZiAoaGFzQ2FuY2VsRXZlbnQpIHtcbiAgICAgICAgICBpbnB1dC5yZW1vdmVFdmVudExpc3RlbmVyKCdjYW5jZWwnLCBvbkNhbmNlbEhhbmRsZXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1cycsIG9uRm9jdXNIYW5kbGVyKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgb25DaGFuZ2VIYW5kbGVyLCB7IG9uY2U6IHRydWUgfSk7XG4gICAgICBpZiAoaGFzQ2FuY2VsRXZlbnQpIHtcbiAgICAgICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2FuY2VsJywgb25DYW5jZWxIYW5kbGVyLCB7IG9uY2U6IHRydWUgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBXb3JrYXJvdW5kIHRvIGRldGVjdCB3aGVuIENhbmNlbCBpcyBzZWxlY3RlZCBpbiB0aGUgRmlsZSBTZWxlY3Rpb24gZGlhbG9nIGJveC5cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgb25Gb2N1c0hhbmRsZXIsIHsgb25jZTogdHJ1ZSB9KTtcbiAgICAgIH1cbiAgICAgIGlucHV0LmNsaWNrKCk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGdldERhdGFGcm9tRmlsZShmaWxlOiBGaWxlKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xuICAgICAgcmVhZGVyLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdHlwZW9mIHJlYWRlci5yZXN1bHQgPT09ICdzdHJpbmcnID8gcmVhZGVyLnJlc3VsdCA6ICcnO1xuICAgICAgICBjb25zdCBzcGxpdHRlZFJlc3VsdCA9IHJlc3VsdC5zcGxpdCgnYmFzZTY0LCcpO1xuICAgICAgICBjb25zdCBiYXNlNjQgPSBzcGxpdHRlZFJlc3VsdFsxXSB8fCAnJztcbiAgICAgICAgcmVzb2x2ZShiYXNlNjQpO1xuICAgICAgfTtcbiAgICAgIHJlYWRlci5vbmVycm9yID0gZXJyb3IgPT4ge1xuICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0TmFtZUZyb21VcmwoZmlsZTogRmlsZSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGZpbGUubmFtZTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0TWltZVR5cGVGcm9tVXJsKGZpbGU6IEZpbGUpOiBzdHJpbmcge1xuICAgIHJldHVybiBmaWxlLnR5cGU7XG4gIH1cblxuICBwcml2YXRlIGdldFNpemVGcm9tVXJsKGZpbGU6IEZpbGUpOiBudW1iZXIge1xuICAgIHJldHVybiBmaWxlLnNpemU7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIHdhaXQoZGVsYXlNczogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCBkZWxheU1zKSk7XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBTdHJlbWlvRW5oYW5jZWRBcGkgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9TdHJlbWlvRW5oYW5jZWRBcGlcIjtcbmltcG9ydCBQbHVnaW5PcHRpb25zIGZyb20gXCIuL1BsdWdpbk9wdGlvbnNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVN0cmVtaW9FbmhhbmNlZEFwaShcbiAgICBhcHBseVRoZW1lOiAodGhlbWU6IHN0cmluZykgPT4gUHJvbWlzZTxib29sZWFuPlxuKTogU3RyZW1pb0VuaGFuY2VkQXBpIHtcbiAgICByZXR1cm4gT2JqZWN0LmZyZWV6ZSh7XG4gICAgICAgIGFwcGx5VGhlbWU6ICh0aGVtZTogdW5rbm93bikgPT4gKFxuICAgICAgICAgICAgdHlwZW9mIHRoZW1lID09PSBcInN0cmluZ1wiID8gYXBwbHlUaGVtZSh0aGVtZSkgOiBQcm9taXNlLnJlc29sdmUoZmFsc2UpXG4gICAgICAgICksXG4gICAgICAgIHBsdWdpbk9wdGlvbnM6IE9iamVjdC5mcmVlemUoe1xuICAgICAgICAgICAgZ2V0OiAocGx1Z2luRmlsZTogc3RyaW5nKSA9PiAoXG4gICAgICAgICAgICAgICAgdHlwZW9mIHBsdWdpbkZpbGUgPT09IFwic3RyaW5nXCIgPyBQbHVnaW5PcHRpb25zLmdldChwbHVnaW5GaWxlKSA6IHt9XG4gICAgICAgICAgICApLFxuICAgICAgICB9KSxcbiAgICB9KTtcbn1cbiIsICJpbXBvcnQgeyBTVE9SQUdFX0tFWVMgfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVXNlclNldHRpbmdzSW5pdGlhbGl6YXRpb25PcHRpb25zIHtcbiAgICBjaGVja1VwZGF0ZXNPblN0YXJ0dXBEZWZhdWx0OiBib29sZWFuO1xufVxuXG4vKipcbiAqIEluaXRpYWxpemUgc2V0dGluZ3MgdGhhdCBtdXN0IGV4aXN0IGJlZm9yZSB0aGUgcmVzdCBvZiB0aGUgcHJlbG9hZCBzdGFydHMuXG4gKiBFeGlzdGluZyB2YWx1ZXMgYXJlIGludGVudGlvbmFsbHkgbGVmdCB1bnRvdWNoZWQsIGluY2x1ZGluZyBlbXB0eSBzdHJpbmdzLFxuICogc28gdGhpcyBmdW5jdGlvbiBuZXZlciBvdmVyd3JpdGVzIGEgdXNlcidzIHBlcnNpc3RlZCBjaG9pY2VzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaW5pdGlhbGl6ZVVzZXJTZXR0aW5ncyh7XG4gICAgY2hlY2tVcGRhdGVzT25TdGFydHVwRGVmYXVsdCxcbn06IFVzZXJTZXR0aW5nc0luaXRpYWxpemF0aW9uT3B0aW9ucyk6IHZvaWQge1xuICAgIGNvbnN0IGRlZmF1bHRzOiBSZWFkb25seUFycmF5PHJlYWRvbmx5IFtzdHJpbmcsIHN0cmluZ10+ID0gW1xuICAgICAgICBbU1RPUkFHRV9LRVlTLkVOQUJMRURfUExVR0lOUywgXCJbXVwiXSxcbiAgICAgICAgW1NUT1JBR0VfS0VZUy5DSEVDS19VUERBVEVTX09OX1NUQVJUVVAsIFN0cmluZyhjaGVja1VwZGF0ZXNPblN0YXJ0dXBEZWZhdWx0KV0sXG4gICAgICAgIFtTVE9SQUdFX0tFWVMuRElTQ09SRF9SUEMsIFwiZmFsc2VcIl0sXG4gICAgXTtcblxuICAgIGZvciAoY29uc3QgW2tleSwgZGVmYXVsdFZhbHVlXSBvZiBkZWZhdWx0cykge1xuICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCBkZWZhdWx0VmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwgImltcG9ydCB7IGpvaW4gfSBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgZ2V0RGVmYXVsdFRoZW1lVGVtcGxhdGUgfSBmcm9tIFwiLi4vLi4vY29tcG9uZW50cy9kZWZhdWx0LXRoZW1lL2RlZmF1bHRUaGVtZVwiO1xuaW1wb3J0IHsgc2V0dXBCcm93c2VNb2RzQnV0dG9uIH0gZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvbW9kLWJyb3dzZXIvbW9kQnJvd3NlclwiO1xuaW1wb3J0IHsgRklMRV9FWFRFTlNJT05TLCBTRUxFQ1RPUlMsIFNUT1JBR0VfS0VZUyB9IGZyb20gXCIuLi8uLi9jb25zdGFudHNcIjtcbmltcG9ydCBNb2RNYW5hZ2VyIGZyb20gXCIuLi8uLi9jb3JlL01vZE1hbmFnZXJcIjtcbmltcG9ydCBwcm9wZXJ0aWVzIGZyb20gXCIuLi8uLi9jb3JlL1Byb3BlcnRpZXNcIjtcbmltcG9ydCBTZXR0aW5ncyBmcm9tIFwiLi4vLi4vY29yZS9TZXR0aW5nc1wiO1xuaW1wb3J0IHsgUGxhdGZvcm1NYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL3BsYXRmb3JtL1BsYXRmb3JtTWFuYWdlclwiO1xuaW1wb3J0IEV4dHJhY3RNZXRhRGF0YSBmcm9tIFwiLi4vLi4vdXRpbHMvRXh0cmFjdE1ldGFEYXRhXCI7XG5pbXBvcnQgSGVscGVycyBmcm9tIFwiLi4vLi4vdXRpbHMvSGVscGVyc1wiO1xuaW1wb3J0IHsgZ2V0TG9nZ2VyIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2xvZ2dlclwiO1xuaW1wb3J0IHsgZ2V0QWJvdXRJY29uLCBnZXRQbHVnaW5JY29uLCBnZXRUaGVtZUljb24gfSBmcm9tIFwiLi9pY29uc1wiO1xuXG5leHBvcnQgaW50ZXJmYWNlIEVuaGFuY2VkU2V0dGluZ3NIb29rcyB7XG4gICAgYWRkUGxhdGZvcm1Db250cm9scygpOiB2b2lkO1xuICAgIHJlbmRlckFib3V0KCk6IHZvaWQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRW5oYW5jZWRTZXR0aW5nc0NvbnRyb2xsZXIge1xuICAgIGNoZWNrKCk6IFByb21pc2U8dm9pZD47XG59XG5cbmNvbnN0IGxvZ2dlciA9IGdldExvZ2dlcihcIkVuaGFuY2VkU2V0dGluZ3NcIik7XG5cbmFzeW5jIGZ1bmN0aW9uIHJlYWRNYW5hZ2VkRmlsZXMocGF0aDogc3RyaW5nLCBleHRlbnNpb246IHN0cmluZyk6IFByb21pc2U8c3RyaW5nW10+IHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBmaWxlcyA9IGF3YWl0IFBsYXRmb3JtTWFuYWdlci5jdXJyZW50LnJlYWRkaXIocGF0aCk7XG4gICAgICAgIHJldHVybiBmaWxlcy5maWx0ZXIoZmlsZU5hbWUgPT4gZmlsZU5hbWUuZW5kc1dpdGgoZXh0ZW5zaW9uKSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgbG9nZ2VyLmVycm9yKGBGYWlsZWQgdG8gcmVhZCBtYW5hZ2VkIGRpcmVjdG9yeSAke3BhdGh9OiAke2Vycm9yfWApO1xuICAgICAgICByZXR1cm4gW107XG4gICAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBhZGRJbnN0YWxsZWRUaGVtZXModGhlbWVzOiBzdHJpbmdbXSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IEhlbHBlcnMud2FpdEZvckVsbShTRUxFQ1RPUlMuVEhFTUVTX0NBVEVHT1JZKTtcblxuICAgIGlmICghZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdHJlbWlvLWVuaGFuY2VkLWRlZmF1bHQtdGhlbWVcIikpIHtcbiAgICAgICAgY29uc3QgaXNEZWZhdWx0ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oU1RPUkFHRV9LRVlTLkNVUlJFTlRfVEhFTUUpID09PSBcIkRlZmF1bHRcIjtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgY29udGFpbmVyLmlkID0gXCJzdHJlbWlvLWVuaGFuY2VkLWRlZmF1bHQtdGhlbWVcIjtcbiAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9IGdldERlZmF1bHRUaGVtZVRlbXBsYXRlKGlzRGVmYXVsdCk7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoU0VMRUNUT1JTLlRIRU1FU19DQVRFR09SWSk/LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XG4gICAgfVxuXG4gICAgYXdhaXQgUHJvbWlzZS5hbGwodGhlbWVzLm1hcChhc3luYyB0aGVtZSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgUGxhdGZvcm1NYW5hZ2VyLmN1cnJlbnQucmVhZEZpbGUoam9pbihwcm9wZXJ0aWVzLnRoZW1lc1BhdGgsIHRoZW1lKSk7XG4gICAgICAgICAgICBjb25zdCBtZXRhRGF0YSA9IEV4dHJhY3RNZXRhRGF0YS5leHRyYWN0TWV0YWRhdGFGcm9tVGV4dChjb250ZW50KTtcbiAgICAgICAgICAgIGlmIChtZXRhRGF0YSAmJiBtZXRhRGF0YS5uYW1lLnRvTG93ZXJDYXNlKCkgIT09IFwiZGVmYXVsdFwiKSB7XG4gICAgICAgICAgICAgICAgU2V0dGluZ3MuYWRkSXRlbShcInRoZW1lXCIsIHRoZW1lLCBtZXRhRGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBsb2dnZXIuZXJyb3IoYEZhaWxlZCB0byBsb2FkIHRoZW1lIG1ldGFkYXRhIGZvciAke3RoZW1lfTogJHtlcnJvcn1gKTtcbiAgICAgICAgfVxuICAgIH0pKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gYWRkSW5zdGFsbGVkUGx1Z2lucyhwbHVnaW5zOiBzdHJpbmdbXSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IFByb21pc2UuYWxsKHBsdWdpbnMubWFwKGFzeW5jIHBsdWdpbiA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgUGxhdGZvcm1NYW5hZ2VyLmN1cnJlbnQucmVhZEZpbGUoam9pbihwcm9wZXJ0aWVzLnBsdWdpbnNQYXRoLCBwbHVnaW4pKTtcbiAgICAgICAgICAgIGNvbnN0IG1ldGFEYXRhID0gRXh0cmFjdE1ldGFEYXRhLmV4dHJhY3RNZXRhZGF0YUZyb21UZXh0KGNvbnRlbnQpO1xuICAgICAgICAgICAgaWYgKG1ldGFEYXRhKSBTZXR0aW5ncy5hZGRJdGVtKFwicGx1Z2luXCIsIHBsdWdpbiwgbWV0YURhdGEpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgbG9nZ2VyLmVycm9yKGBGYWlsZWQgdG8gbG9hZCBwbHVnaW4gbWV0YWRhdGEgZm9yICR7cGx1Z2lufTogJHtlcnJvcn1gKTtcbiAgICAgICAgfVxuICAgIH0pKTtcbn1cblxuZnVuY3Rpb24gc2V0dGluZ3NBcmVSZWFkeSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gQm9vbGVhbihcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlbmhhbmNlZFwiKSAmJlxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zZWN0aW9uPVwiZW5oYW5jZWRcIl0nKSAmJlxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFNFTEVDVE9SUy5USEVNRVNfQ0FURUdPUlkpICYmXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoU0VMRUNUT1JTLlBMVUdJTlNfQ0FURUdPUlkpICYmXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoU0VMRUNUT1JTLkFCT1VUX0NBVEVHT1JZKVxuICAgICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVFbmhhbmNlZFNldHRpbmdzQ29udHJvbGxlcihcbiAgICBob29rczogRW5oYW5jZWRTZXR0aW5nc0hvb2tzXG4pOiBFbmhhbmNlZFNldHRpbmdzQ29udHJvbGxlciB7XG4gICAgbGV0IGNoZWNrUGVuZGluZyA9IGZhbHNlO1xuXG4gICAgY29uc3Qgc2V0dXAgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgICAgIE1vZE1hbmFnZXIuYWRkQXBwbHlUaGVtZUZ1bmN0aW9uKCk7XG5cbiAgICAgICAgY29uc3QgW3RoZW1lcywgcGx1Z2luc10gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICByZWFkTWFuYWdlZEZpbGVzKHByb3BlcnRpZXMudGhlbWVzUGF0aCwgRklMRV9FWFRFTlNJT05TLlRIRU1FKSxcbiAgICAgICAgICAgIHJlYWRNYW5hZ2VkRmlsZXMocHJvcGVydGllcy5wbHVnaW5zUGF0aCwgRklMRV9FWFRFTlNJT05TLlBMVUdJTiksXG4gICAgICAgIF0pO1xuXG4gICAgICAgIFNldHRpbmdzLmFkZFNlY3Rpb24oXCJlbmhhbmNlZFwiLCBcIkVuaGFuY2VkXCIpO1xuICAgICAgICBhd2FpdCBIZWxwZXJzLndhaXRGb3JFbG0oXCIjZW5oYW5jZWRcIik7XG4gICAgICAgIFNldHRpbmdzLmFkZENhdGVnb3J5KFwiVGhlbWVzXCIsIFwiZW5oYW5jZWRcIiwgZ2V0VGhlbWVJY29uKCkpO1xuICAgICAgICBTZXR0aW5ncy5hZGRDYXRlZ29yeShcIlBsdWdpbnNcIiwgXCJlbmhhbmNlZFwiLCBnZXRQbHVnaW5JY29uKCkpO1xuICAgICAgICBTZXR0aW5ncy5hZGRDYXRlZ29yeShcIkFib3V0XCIsIFwiZW5oYW5jZWRcIiwgZ2V0QWJvdXRJY29uKCkpO1xuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICBIZWxwZXJzLndhaXRGb3JFbG0oU0VMRUNUT1JTLlRIRU1FU19DQVRFR09SWSksXG4gICAgICAgICAgICBIZWxwZXJzLndhaXRGb3JFbG0oU0VMRUNUT1JTLlBMVUdJTlNfQ0FURUdPUlkpLFxuICAgICAgICAgICAgSGVscGVycy53YWl0Rm9yRWxtKFNFTEVDVE9SUy5BQk9VVF9DQVRFR09SWSksXG4gICAgICAgIF0pO1xuXG4gICAgICAgIGhvb2tzLmFkZFBsYXRmb3JtQ29udHJvbHMoKTtcbiAgICAgICAgaG9va3MucmVuZGVyQWJvdXQoKTtcbiAgICAgICAgc2V0dXBCcm93c2VNb2RzQnV0dG9uKCk7XG5cbiAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgYWRkSW5zdGFsbGVkVGhlbWVzKHRoZW1lcyksXG4gICAgICAgICAgICBhZGRJbnN0YWxsZWRQbHVnaW5zKHBsdWdpbnMpLFxuICAgICAgICBdKTtcblxuICAgICAgICBNb2RNYW5hZ2VyLnNjcm9sbExpc3RlbmVyKCk7XG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGFzeW5jIGNoZWNrKCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICAgICAgaWYgKCFsb2NhdGlvbi5ocmVmLmluY2x1ZGVzKFwiIy9zZXR0aW5nc1wiKSB8fCBzZXR0aW5nc0FyZVJlYWR5KCkgfHwgY2hlY2tQZW5kaW5nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjaGVja1BlbmRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBhd2FpdCBzZXR1cCgpO1xuICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICBjaGVja1BlbmRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9O1xufVxuIiwgImltcG9ydCBUZW1wbGF0ZUNhY2hlIGZyb20gJy4uLy4uL3V0aWxzL3RlbXBsYXRlQ2FjaGUnO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGVmYXVsdFRoZW1lVGVtcGxhdGUoYXBwbGllZDogYm9vbGVhbik6IHN0cmluZyB7XG4gICAgY29uc3QgdGVtcGxhdGUgPSBUZW1wbGF0ZUNhY2hlLmxvYWQoX19kaXJuYW1lLCAnZGVmYXVsdC10aGVtZScpO1xuXG4gICAgcmV0dXJuIHRlbXBsYXRlXG4gICAgICAgIC5yZXBsYWNlKFwie3sgZGlzYWJsZWQgfX1cIiwgYXBwbGllZCA/IFwiZGlzYWJsZWRcIiA6IFwiXCIpXG4gICAgICAgIC5yZXBsYWNlKFwie3sgbGFiZWwgfX1cIiwgYXBwbGllZCA/IFwiQXBwbGllZFwiIDogXCJBcHBseVwiKVxuICAgICAgICAucmVwbGFjZShcInt7IGJhY2tncm91bmRDb2xvciB9fVwiLCBhcHBsaWVkID8gXCJ2YXIoLS1vdmVybGF5LWNvbG9yKVwiIDogXCJ2YXIoLS1zZWNvbmRhcnktYWNjZW50LWNvbG9yKVwiKTtcbn1cbiIsICJpbXBvcnQgVGVtcGxhdGVDYWNoZSBmcm9tICcuLi8uLi91dGlscy90ZW1wbGF0ZUNhY2hlJztcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEJhY2tCdXR0b24oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gVGVtcGxhdGVDYWNoZS5sb2FkKF9fZGlybmFtZSwgJ2JhY2stYnRuJyk7XG59XG4iLCAiaW1wb3J0IFRlbXBsYXRlQ2FjaGUgZnJvbSAnLi4vLi4vdXRpbHMvdGVtcGxhdGVDYWNoZSc7XG5pbXBvcnQgZXNjYXBlSHRtbCBmcm9tICcuLi8uLi91dGlscy9lc2NhcGVIdG1sJztcblxuZXhwb3J0IGludGVyZmFjZSBNb2RNZXRhRGF0YSB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gICAgYXV0aG9yOiBzdHJpbmc7XG4gICAgdmVyc2lvbjogc3RyaW5nO1xuICAgIHByZXZpZXc/OiBzdHJpbmc7XG4gICAgZG93bmxvYWQ6IHN0cmluZztcbiAgICByZXBvOiBzdHJpbmc7XG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZUh0dHBzVXJsKHJhd1VybDogc3RyaW5nIHwgdW5kZWZpbmVkKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgaWYgKCFyYXdVcmwpIHJldHVybiBudWxsO1xuXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgdXJsID0gbmV3IFVSTChyYXdVcmwpO1xuICAgICAgICBpZiAodXJsLnByb3RvY29sICE9PSBcImh0dHBzOlwiKSByZXR1cm4gbnVsbDtcbiAgICAgICAgcmV0dXJuIHVybC50b1N0cmluZygpO1xuICAgIH0gY2F0Y2gge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGdldFBsYWNlaG9sZGVyTG9nbygpOiBzdHJpbmcge1xuICAgIHJldHVybiBgXG4gICAgICAgIDxzdmcgY2xhc3M9XCJpY29uLUd4VmJZXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGFyaWEtbGFiZWw9XCJUaGVtZSBwcmV2aWV3IHVuYXZhaWxhYmxlXCI+XG4gICAgICAgICAgICA8cGF0aCBkPVwiTTQgM2gxNmExIDEgMCAwIDEgMSAxdjVhMSAxIDAgMCAxLTEgMUg0YTEgMSAwIDAgMS0xLTFWNGExIDEgMCAwIDEgMS0xem0yIDloNmExIDEgMCAwIDEgMSAxdjNoMXY2aC00di02aDF2LTJINWExIDEgMCAwIDEtMS0xdi0yaDJ2MXptMTEuNzMyIDEuNzMybDEuNzY4LTEuNzY4IDEuNzY4IDEuNzY4YTIuNSAyLjUgMCAxIDEtMy41MzYgMHpcIiBzdHlsZT1cImZpbGw6IGN1cnJlbnRjb2xvcjtcIj48L3BhdGg+XG4gICAgICAgIDwvc3ZnPmA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRNb2RJdGVtVGVtcGxhdGUoXG4gICAgbWV0YURhdGE6IE1vZE1ldGFEYXRhLFxuICAgIHR5cGU6IFwiUGx1Z2luXCIgfCBcIlRoZW1lXCIsIFxuICAgIGluc3RhbGxlZDogYm9vbGVhblxuKTogc3RyaW5nIHtcbiAgICBsZXQgdGVtcGxhdGUgPSBUZW1wbGF0ZUNhY2hlLmxvYWQoX19kaXJuYW1lLCAnbW9kcy1pdGVtJyk7XG4gICAgY29uc3QgcHJldmlld1VybCA9IG5vcm1hbGl6ZUh0dHBzVXJsKG1ldGFEYXRhLnByZXZpZXcpO1xuICAgIGNvbnN0IGRvd25sb2FkVXJsID0gbm9ybWFsaXplSHR0cHNVcmwobWV0YURhdGEuZG93bmxvYWQpO1xuICAgIGNvbnN0IHJlcG9VcmwgPSBub3JtYWxpemVIdHRwc1VybChtZXRhRGF0YS5yZXBvKTtcbiAgICBcbiAgICAvLyBHZW5lcmF0ZSBsb2dvIGJsb2NrIGJhc2VkIG9uIHR5cGVcbiAgICBsZXQgbG9nb0Jsb2NrID0gXCJcIjtcblxuICAgIGlmKHR5cGUgPT09IFwiVGhlbWVcIikge1xuICAgICAgICBpZighcHJldmlld1VybCkge1xuICAgICAgICAgICAgbG9nb0Jsb2NrID0gZ2V0UGxhY2Vob2xkZXJMb2dvKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBzYWZlUHJldmlld1VybCA9IGVzY2FwZUh0bWwocHJldmlld1VybCk7XG4gICAgICAgICAgICBsb2dvQmxvY2sgPSBgXG4gICAgICAgICAgICA8YSBocmVmPVwiJHtzYWZlUHJldmlld1VybH1cIiB0YXJnZXQ9XCJfYmxhbmtcIiByZWw9XCJub3JlZmVycmVyXCI+XG4gICAgICAgICAgICAgICAgPGltZyBjbGFzcz1cImxvZ28tV3JzR0ZcIiBzcmM9XCIke3NhZmVQcmV2aWV3VXJsfVwiIGFsdD1cIlRoZW1lIFByZXZpZXdcIiBsb2FkaW5nPVwibGF6eVwiPlxuICAgICAgICAgICAgPC9hPmA7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBsb2dvQmxvY2sgPSBgXG4gICAgICAgIDxzdmcgY2xhc3M9XCJpY29uLUd4VmJZXCIgdmlld0JveD1cIjAgMCA1MTIgNTEyXCI+XG4gICAgICAgICAgICA8cGF0aCBkPVwiTTM0NS42NTAwMDAwMDAwMDAxIDQ1Ni4zMDAwMDAwMDAwMDAyaC03MC44N2MtMi4zNSAwLjAxLTQuNjktMC40My02Ljg2LTEuMjktMi4xOC0wLjg3LTQuMTUtMi4xNC01Ljc5LTMuNzUtMy4zNy0zLjE5LTUuMjctNy41NC01LjI5LTEyLjA3di0yNi4zM2MwLjAzLTQuMDUtMC44MS04LjA3LTIuNDktMTEuNzlzLTQuMTItNy4wNy03LjE3LTkuODljLTcuNzgtNy4yMi0xOS4wNC0xMS4yMi0zMC44LTEwLjkzLTIxLjMzIDAuNDctMzkuMjcgMTguMzUtMzkuMjcgMzkuMDd2MTkuODdjMC4wMSAyLjI0LTAuNDUgNC40OC0xLjM2IDYuNTVzLTIuMjQgMy45NS0zLjkzIDUuNTJjLTMuMzUgMy4yMS03LjkgNS4wMi0xMi42NSA1LjA0aC03MC4xN2MtMTQuNzEgMC4wMS0yOC44My01LjU1LTM5LjIzLTE1LjQ2LTEwLjQyLTkuOTEtMTYuMjgtMjMuMzYtMTYuMjktMzcuNHYtNjYuOTJjMC4wMy00LjUzIDEuOTItOC44NyA1LjI4LTEyLjA3IDMuMzYtMy4yMSA3LjkxLTUuMDEgMTIuNjYtNS4wNGgyNy42MWM5LjE3IDAgMTguMDQtMy43MSAyNS4wMi0xMC40NiAzLjg5LTMuNzIgNi45OC04LjE1IDkuMDctMTMuMDJhMzcuMiAzNy4yIDAgMCAwIDMuMDktMTUuNGMtMC4zLTIwLjE1LTE3LjY0LTM3LjE3LTM3Ljk4LTM3LjE3aC0yNi43MWMtMi4zNSAwLjAxLTQuNjktMC40My02Ljg3LTEuMjlhMTcuNyAxNy43IDAgMCAxLTUuNzktMy43NWMtMy4zNy0zLjE5LTUuMjYtNy41NC01LjI4LTEyLjA3di02Ni45MmE1MC45IDUwLjkgMCAwIDEgNC4xOS0yMC4yNWMyLjc2LTYuNDMgNi44Ni0xMi4yNSAxMi4wNi0xNy4xMSAxMC4zOS05LjkxIDI0LjQ4LTE1LjQ4IDM5LjE3LTE1LjVoNTUuMDJjMi4xMiAwLjAxIDQuMTYtMC43NyA1LjY4LTIuMTkgMC43My0wLjcxIDEuMzItMS41NSAxLjcxLTIuNDkgMC40LTAuOTMgMC42LTEuOTIgMC41OC0yLjkydi02LjE4YTU5IDU5IDAgMCAxIDUuMDgtMjQuMDVjMy4zOC03LjYyIDguMjktMTQuNTMgMTQuNDYtMjAuMzUgNi4xOS01LjggMTMuNTUtMTAuMzYgMjEuNjItMTMuNGE2OS44IDY5LjggMCAwIDEgMjUuMzItNC40N2MzNS4zOCAwLjU3IDY0LjE5IDI4LjkgNjQuMTkgNjMuMDN2NS40MmMtMC4wMyAxLjUxIDAuNDIgMyAxLjI5IDQuMjVhNy43MyA3LjczIDAgMCAwIDMuNjEgMi44MWMwLjk4IDAuMzcgMi4wMyAwLjU2IDMuMDcgMC41NGg1NS4wMmE1Ni40IDU2LjQgMCAwIDEgMjAuOTMgMy45OWMxMy40IDUuMzEgMjQuMDQgMTUuNDYgMjkuNiAyOC4yNCAyLjc3IDYuMzIgNC4yIDEzLjExIDQuMTkgMTkuOTZ2NTIuNDdjLTAuMDMgMS41MiAwLjQyIDMuMDEgMS4zIDQuMjZhNy42NiA3LjY2IDAgMCAwIDMuNiAyLjgxYzAuOTggMC4zNyAyLjAzIDAuNTYgMy4wNyAwLjU0aDUuNjhjMzYuNDggMCA2Ni4wOSAyNy41NyA2Ni4wOSA2MS40MSAwIDM0Ljc5LTI5LjMxIDYzLjEyLTY1LjI5IDYzLjEyaC02LjQ4Yy0yLjEyLTAuMDEtNC4xNSAwLjc4LTUuNjggMi4xOWE3LjQgNy40IDAgMCAwLTEuNzEgMi40OWMtMC40IDAuOTMtMC42IDEuOTMtMC41OCAyLjkzdjUzLjIzYzAuMDEgNi44NS0xLjQyIDEzLjY0LTQuMTkgMTkuOTYtNS41NiAxMi43OC0xNi4yIDIyLjkzLTI5LjYgMjguMjRhNTYgNTYgMCAwIDEtMjAuOTMgMy45OVwiIHN0eWxlPVwiZmlsbDogY3VycmVudGNvbG9yO1wiPjwvcGF0aD5cbiAgICAgICAgPC9zdmc+YFxuICAgIH1cblxuICAgIC8vIFJlcGxhY2UgbWV0YWRhdGEgcGxhY2Vob2xkZXJzXG4gICAgY29uc3QgbWV0YUtleXMgPSBbJ25hbWUnLCAnZGVzY3JpcHRpb24nLCAnYXV0aG9yJywgJ3ZlcnNpb24nXSBhcyBjb25zdDtcbiAgICBtZXRhS2V5cy5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgIGNvbnN0IHJlZ2V4ID0gbmV3IFJlZ0V4cChge3tcXFxccyoke2tleX1cXFxccyp9fWAsICdnJyk7XG4gICAgICAgIHRlbXBsYXRlID0gdGVtcGxhdGUucmVwbGFjZShyZWdleCwgZXNjYXBlSHRtbChtZXRhRGF0YVtrZXldIHx8ICcnKSk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBhY3Rpb24gPSBkb3dubG9hZFVybCA/IChpbnN0YWxsZWQgPyBcInVuaW5zdGFsbFwiIDogXCJpbnN0YWxsXCIpIDogXCJ1bmF2YWlsYWJsZVwiO1xuICAgIGNvbnN0IGFjdGlvblRpdGxlID0gZG93bmxvYWRVcmwgPyAoaW5zdGFsbGVkID8gXCJVbmluc3RhbGxcIiA6IFwiSW5zdGFsbFwiKSA6IFwiVW5hdmFpbGFibGVcIjtcblxuICAgIHJldHVybiB0ZW1wbGF0ZVxuICAgICAgICAucmVwbGFjZSgvXFx7XFx7XFxzKnR5cGVcXHMqXFx9XFx9L2csIHR5cGUpXG4gICAgICAgIC5yZXBsYWNlKC9cXHtcXHtcXHMqYWN0aW9uYnRuVGl0bGVcXHMqXFx9XFx9L2csIGFjdGlvblRpdGxlKVxuICAgICAgICAucmVwbGFjZShcInt7IGFjdGlvbmJ0bkNsYXNzIH19XCIsIGluc3RhbGxlZCA/IFwidW5pbnN0YWxsLWJ1dHRvbi1jb250YWluZXItb1Y0WW9cIiA6IFwiaW5zdGFsbC1idXR0b24tY29udGFpbmVyLXlmY3E1XCIpXG4gICAgICAgIC5yZXBsYWNlKFwie3sgYWN0aW9uIH19XCIsIGFjdGlvbilcbiAgICAgICAgLnJlcGxhY2UoXCJ7eyBhY3Rpb25EaXNhYmxlZCB9fVwiLCBkb3dubG9hZFVybCA/IFwiZmFsc2VcIiA6IFwidHJ1ZVwiKVxuICAgICAgICAucmVwbGFjZShcInt7IGFjdGlvblRhYkluZGV4IH19XCIsIGRvd25sb2FkVXJsID8gXCIwXCIgOiBcIi0xXCIpXG4gICAgICAgIC5yZXBsYWNlKFwie3sgZG93bmxvYWQgfX1cIiwgZG93bmxvYWRVcmwgPyBlc2NhcGVIdG1sKGRvd25sb2FkVXJsKSA6IFwiXCIpXG4gICAgICAgIC5yZXBsYWNlKFwie3sgcmVwb0hyZWYgfX1cIiwgcmVwb1VybCA/IGBocmVmPVwiJHtlc2NhcGVIdG1sKHJlcG9VcmwpfVwiYCA6IFwiXCIpXG4gICAgICAgIC5yZXBsYWNlKFwie3sgcmVwb0Rpc2FibGVkIH19XCIsIHJlcG9VcmwgPyBcImZhbHNlXCIgOiBcInRydWVcIilcbiAgICAgICAgLnJlcGxhY2UoXCJ7eyByZXBvVGFiSW5kZXggfX1cIiwgcmVwb1VybCA/IFwiMFwiIDogXCItMVwiKVxuICAgICAgICAucmVwbGFjZShcIjwhLS0gdGhlbWUgcHJldmlldyBoZXJlIC0tPlwiLCBsb2dvQmxvY2spXG4gICAgICAgIC5yZXBsYWNlKFwiPCEtLSBwbHVnaW4gaWNvbiBoZXJlIC0tPlwiLCBcIlwiKTsgXG59XG4iLCAiaW1wb3J0IFRlbXBsYXRlQ2FjaGUgZnJvbSAnLi4vLi4vdXRpbHMvdGVtcGxhdGVDYWNoZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRNb2RzVGFiVGVtcGxhdGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gVGVtcGxhdGVDYWNoZS5sb2FkKF9fZGlybmFtZSwgJ21vZHMtdGFiJyk7XG59XG4iLCAiaW1wb3J0IE1vZE1hbmFnZXIgZnJvbSBcIi4uLy4uL2NvcmUvTW9kTWFuYWdlclwiO1xuaW1wb3J0IEhlbHBlcnMgZnJvbSBcIi4uLy4uL3V0aWxzL0hlbHBlcnNcIjtcbmltcG9ydCB7IENMQVNTRVMsIFNFTEVDVE9SUyB9IGZyb20gXCIuLi8uLi9jb25zdGFudHNcIjtcbmltcG9ydCB7IGdldEJhY2tCdXR0b24gfSBmcm9tIFwiLi4vYmFjay1idG4vYmFja0J0blwiO1xuaW1wb3J0IHsgZ2V0TW9kSXRlbVRlbXBsYXRlLCBNb2RNZXRhRGF0YSB9IGZyb20gXCIuLi9tb2RzLWl0ZW0vbW9kc0l0ZW1cIjtcbmltcG9ydCB7IGdldE1vZHNUYWJUZW1wbGF0ZSB9IGZyb20gXCIuLi9tb2RzLXRhYi9tb2RzVGFiXCI7XG5pbXBvcnQgeyBnZXRMb2dnZXIgfSBmcm9tIFwiLi4vLi4vdXRpbHMvbG9nZ2VyXCI7XG5pbXBvcnQgeyBpc1NhZmVNb2RGaWxlTmFtZSB9IGZyb20gXCIuLi8uLi91dGlscy9tb2RGaWxlTmFtZVwiO1xuXG50eXBlIE1vZFR5cGUgPSBcInBsdWdpblwiIHwgXCJ0aGVtZVwiO1xuXG5pbnRlcmZhY2UgTW9kQWN0aW9uU3RhdGUge1xuICAgIGFjdGlvbjogXCJpbnN0YWxsXCIgfCBcInVuaW5zdGFsbFwiO1xuICAgIGZpbGVOYW1lOiBzdHJpbmc7XG4gICAgbGluazogc3RyaW5nO1xuICAgIHR5cGU6IE1vZFR5cGU7XG59XG5cbmNvbnN0IGxvZ2dlciA9IGdldExvZ2dlcihcIk1vZEJyb3dzZXJcIik7XG5jb25zdCBtb2RBY3Rpb25TdGF0ZXMgPSBuZXcgV2Vha01hcDxIVE1MRWxlbWVudCwgTW9kQWN0aW9uU3RhdGU+KCk7XG5cbmZ1bmN0aW9uIGFzU3RyaW5nKHZhbHVlOiB1bmtub3duKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiID8gdmFsdWUgOiBcIlwiO1xufVxuXG5mdW5jdGlvbiBwYXJzZVJlZ2lzdHJ5TW9kKHZhbHVlOiB1bmtub3duKTogTW9kTWV0YURhdGEgfCBudWxsIHtcbiAgICBpZiAoIXZhbHVlIHx8IHR5cGVvZiB2YWx1ZSAhPT0gXCJvYmplY3RcIiB8fCBBcnJheS5pc0FycmF5KHZhbHVlKSkgcmV0dXJuIG51bGw7XG5cbiAgICBjb25zdCByZWNvcmQgPSB2YWx1ZSBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcbiAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiBhc1N0cmluZyhyZWNvcmQubmFtZSksXG4gICAgICAgIGRlc2NyaXB0aW9uOiBhc1N0cmluZyhyZWNvcmQuZGVzY3JpcHRpb24pLFxuICAgICAgICBhdXRob3I6IGFzU3RyaW5nKHJlY29yZC5hdXRob3IpLFxuICAgICAgICB2ZXJzaW9uOiBhc1N0cmluZyhyZWNvcmQudmVyc2lvbiksXG4gICAgICAgIHByZXZpZXc6IGFzU3RyaW5nKHJlY29yZC5wcmV2aWV3KSB8fCB1bmRlZmluZWQsXG4gICAgICAgIGRvd25sb2FkOiBhc1N0cmluZyhyZWNvcmQuZG93bmxvYWQpLFxuICAgICAgICByZXBvOiBhc1N0cmluZyhyZWNvcmQucmVwbyksXG4gICAgfTtcbn1cblxuZnVuY3Rpb24gcGFyc2VSZWdpc3RyeURvd25sb2FkKFxuICAgIHJhd1VybDogc3RyaW5nLFxuICAgIHR5cGU6IE1vZFR5cGVcbik6IHsgZmlsZU5hbWU6IHN0cmluZzsgdXJsOiBzdHJpbmcgfSB8IG51bGwge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHVybCA9IG5ldyBVUkwocmF3VXJsKTtcbiAgICAgICAgaWYgKHVybC5wcm90b2NvbCAhPT0gXCJodHRwczpcIikgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgY29uc3QgZW5jb2RlZEZpbGVOYW1lID0gdXJsLnBhdGhuYW1lLnNwbGl0KFwiL1wiKS5hdCgtMSkgPz8gXCJcIjtcbiAgICAgICAgaWYgKCFlbmNvZGVkRmlsZU5hbWUpIHJldHVybiBudWxsO1xuXG4gICAgICAgIGxldCBmaWxlTmFtZTogc3RyaW5nO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZmlsZU5hbWUgPSBkZWNvZGVVUklDb21wb25lbnQoZW5jb2RlZEZpbGVOYW1lKTtcbiAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWlzU2FmZU1vZEZpbGVOYW1lKGZpbGVOYW1lLCB0eXBlKSkgcmV0dXJuIG51bGw7XG4gICAgICAgIHJldHVybiB7IGZpbGVOYW1lLCB1cmw6IHVybC50b1N0cmluZygpIH07XG4gICAgfSBjYXRjaCB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gc2V0QWN0aW9uU3RhdGUoXG4gICAgYnV0dG9uOiBIVE1MRWxlbWVudCxcbiAgICBzdGF0ZTogTW9kQWN0aW9uU3RhdGUsXG4gICAgYWN0aW9uOiBcImluc3RhbGxcIiB8IFwidW5pbnN0YWxsXCJcbik6IHZvaWQge1xuICAgIGNvbnN0IGluc3RhbGxpbmcgPSBhY3Rpb24gPT09IFwiaW5zdGFsbFwiO1xuICAgIGNvbnN0IHRpdGxlID0gaW5zdGFsbGluZyA/IFwiSW5zdGFsbFwiIDogXCJVbmluc3RhbGxcIjtcblxuICAgIHN0YXRlLmFjdGlvbiA9IGFjdGlvbjtcbiAgICBidXR0b24uZGF0YXNldC5hY3Rpb24gPSBhY3Rpb247XG4gICAgYnV0dG9uLnRpdGxlID0gdGl0bGU7XG4gICAgYnV0dG9uLnNldEF0dHJpYnV0ZShcImFyaWEtZGlzYWJsZWRcIiwgXCJmYWxzZVwiKTtcbiAgICBidXR0b24uY2xhc3NMaXN0LnRvZ2dsZShDTEFTU0VTLklOU1RBTExfQlVUVE9OLCBpbnN0YWxsaW5nKTtcbiAgICBidXR0b24uY2xhc3NMaXN0LnRvZ2dsZShDTEFTU0VTLlVOSU5TVEFMTF9CVVRUT04sICFpbnN0YWxsaW5nKTtcblxuICAgIGNvbnN0IGxhYmVsID0gYnV0dG9uLnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KFwiLmxhYmVsLU9uV2gyXCIpO1xuICAgIGlmIChsYWJlbCkgbGFiZWwudGV4dENvbnRlbnQgPSB0aXRsZTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFjdGl2YXRlTW9kQWN0aW9uKGJ1dHRvbjogSFRNTEVsZW1lbnQpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoXG4gICAgICAgIGJ1dHRvbi5kYXRhc2V0LnN0cmVtaW9FbmhhbmNlZEFjdGlvbkJ1c3kgPT09IFwidHJ1ZVwiIHx8XG4gICAgICAgIGJ1dHRvbi5nZXRBdHRyaWJ1dGUoXCJhcmlhLWRpc2FibGVkXCIpID09PSBcInRydWVcIlxuICAgICkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgc3RhdGUgPSBtb2RBY3Rpb25TdGF0ZXMuZ2V0KGJ1dHRvbik7XG4gICAgaWYgKCFzdGF0ZSkge1xuICAgICAgICBidXR0b24uc2V0QXR0cmlidXRlKFwiYXJpYS1kaXNhYmxlZFwiLCBcInRydWVcIik7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBidXR0b24uZGF0YXNldC5zdHJlbWlvRW5oYW5jZWRBY3Rpb25CdXN5ID0gXCJ0cnVlXCI7XG4gICAgYnV0dG9uLnNldEF0dHJpYnV0ZShcImFyaWEtYnVzeVwiLCBcInRydWVcIik7XG4gICAgYnV0dG9uLnNldEF0dHJpYnV0ZShcImFyaWEtZGlzYWJsZWRcIiwgXCJ0cnVlXCIpO1xuXG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHN0YXRlLmFjdGlvbiA9PT0gXCJpbnN0YWxsXCIpIHtcbiAgICAgICAgICAgIGF3YWl0IE1vZE1hbmFnZXIuZG93bmxvYWRNb2Qoc3RhdGUubGluaywgc3RhdGUudHlwZSk7XG4gICAgICAgICAgICBzZXRBY3Rpb25TdGF0ZShidXR0b24sIHN0YXRlLCBcInVuaW5zdGFsbFwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGF3YWl0IE1vZE1hbmFnZXIucmVtb3ZlTW9kKHN0YXRlLmZpbGVOYW1lLCBzdGF0ZS50eXBlKTtcbiAgICAgICAgICAgIHNldEFjdGlvblN0YXRlKGJ1dHRvbiwgc3RhdGUsIFwiaW5zdGFsbFwiKTtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGxvZ2dlci5lcnJvcihgRmFpbGVkIHRvICR7c3RhdGUuYWN0aW9ufSAke3N0YXRlLnR5cGV9OiAke2Vycm9yfWApO1xuICAgICAgICBidXR0b24uc2V0QXR0cmlidXRlKFwiYXJpYS1kaXNhYmxlZFwiLCBcImZhbHNlXCIpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICAgIGRlbGV0ZSBidXR0b24uZGF0YXNldC5zdHJlbWlvRW5oYW5jZWRBY3Rpb25CdXN5O1xuICAgICAgICBidXR0b24ucmVtb3ZlQXR0cmlidXRlKFwiYXJpYS1idXN5XCIpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gc2V0dXBBY3Rpb25CdXR0b25zKCk6IHZvaWQge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGw8SFRNTEVsZW1lbnQ+KFwiLm1vZEFjdGlvbkJ0blwiKS5mb3JFYWNoKGJ1dHRvbiA9PiB7XG4gICAgICAgIGlmIChidXR0b24uZGF0YXNldC5zdHJlbWlvRW5oYW5jZWRNb2RBY3Rpb25Cb3VuZCA9PT0gXCJ0cnVlXCIpIHJldHVybjtcbiAgICAgICAgaWYgKCFtb2RBY3Rpb25TdGF0ZXMuaGFzKGJ1dHRvbikpIHtcbiAgICAgICAgICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJhcmlhLWRpc2FibGVkXCIsIFwidHJ1ZVwiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGJ1dHRvbi5kYXRhc2V0LnN0cmVtaW9FbmhhbmNlZE1vZEFjdGlvbkJvdW5kID0gXCJ0cnVlXCI7XG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZXZlbnQgPT4ge1xuICAgICAgICAgICAgaWYgKCFldmVudC5pc1RydXN0ZWQpIHJldHVybjtcbiAgICAgICAgICAgIHZvaWQgYWN0aXZhdGVNb2RBY3Rpb24oYnV0dG9uKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBldmVudCA9PiB7XG4gICAgICAgICAgICBpZiAoIWV2ZW50LmlzVHJ1c3RlZCkgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKGV2ZW50LmtleSAhPT0gXCJFbnRlclwiICYmIGV2ZW50LmtleSAhPT0gXCIgXCIpIHJldHVybjtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB2b2lkIGFjdGl2YXRlTW9kQWN0aW9uKGJ1dHRvbik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBzZXR1cEJhY2tCdXR0b24oKTogdm9pZCB7XG4gICAgY29uc3QgaG9yaXpvbnRhbE5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoU0VMRUNUT1JTLkhPUklaT05UQUxfTkFWKVsxXTtcbiAgICBpZiAoIWhvcml6b250YWxOYXYpIHJldHVybjtcblxuICAgIGhvcml6b250YWxOYXYuaW5uZXJIVE1MID0gZ2V0QmFja0J1dHRvbigpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYmFjay1idG5cIik/LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGxvY2F0aW9uLmhhc2ggPSBcIiMvXCI7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgbG9jYXRpb24uaGFzaCA9IFwiIy9zZXR0aW5nc1wiO1xuICAgICAgICB9LCAwKTtcbiAgICB9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcmVuZGVyUmVnaXN0cnlNb2RzKFxuICAgIG1vZHNMaXN0OiBIVE1MRWxlbWVudCxcbiAgICB2YWx1ZXM6IHVua25vd25bXSxcbiAgICB0eXBlOiBcIlBsdWdpblwiIHwgXCJUaGVtZVwiXG4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBmb3IgKGNvbnN0IHZhbHVlIG9mIHZhbHVlcykge1xuICAgICAgICBjb25zdCBtb2QgPSBwYXJzZVJlZ2lzdHJ5TW9kKHZhbHVlKTtcbiAgICAgICAgaWYgKCFtb2QpIGNvbnRpbnVlO1xuXG4gICAgICAgIGNvbnN0IG1vZFR5cGUgPSB0eXBlLnRvTG93ZXJDYXNlKCkgYXMgTW9kVHlwZTtcbiAgICAgICAgY29uc3QgZG93bmxvYWQgPSBwYXJzZVJlZ2lzdHJ5RG93bmxvYWQobW9kLmRvd25sb2FkLCBtb2RUeXBlKTtcbiAgICAgICAgY29uc3QgaW5zdGFsbGVkID0gZG93bmxvYWRcbiAgICAgICAgICAgID8gdHlwZSA9PT0gXCJQbHVnaW5cIlxuICAgICAgICAgICAgICAgID8gYXdhaXQgTW9kTWFuYWdlci5pc1BsdWdpbkluc3RhbGxlZChkb3dubG9hZC5maWxlTmFtZSlcbiAgICAgICAgICAgICAgICA6IGF3YWl0IE1vZE1hbmFnZXIuaXNUaGVtZUluc3RhbGxlZChkb3dubG9hZC5maWxlTmFtZSlcbiAgICAgICAgICAgIDogZmFsc2U7XG5cbiAgICAgICAgY29uc3QgcmVuZGVyZWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICByZW5kZXJlZC5pbm5lckhUTUwgPSBnZXRNb2RJdGVtVGVtcGxhdGUobW9kLCB0eXBlLCBpbnN0YWxsZWQpO1xuICAgICAgICBjb25zdCBhY3Rpb25CdXR0b24gPSByZW5kZXJlZC5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PihcIi5tb2RBY3Rpb25CdG5cIik7XG4gICAgICAgIGlmIChhY3Rpb25CdXR0b24gJiYgZG93bmxvYWQpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXRlOiBNb2RBY3Rpb25TdGF0ZSA9IHtcbiAgICAgICAgICAgICAgICBhY3Rpb246IGluc3RhbGxlZCA/IFwidW5pbnN0YWxsXCIgOiBcImluc3RhbGxcIixcbiAgICAgICAgICAgICAgICBmaWxlTmFtZTogZG93bmxvYWQuZmlsZU5hbWUsXG4gICAgICAgICAgICAgICAgbGluazogZG93bmxvYWQudXJsLFxuICAgICAgICAgICAgICAgIHR5cGU6IG1vZFR5cGUsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgbW9kQWN0aW9uU3RhdGVzLnNldChhY3Rpb25CdXR0b24sIHN0YXRlKTtcbiAgICAgICAgICAgIHNldEFjdGlvblN0YXRlKGFjdGlvbkJ1dHRvbiwgc3RhdGUsIHN0YXRlLmFjdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgbW9kc0xpc3QuYXBwZW5kKC4uLkFycmF5LmZyb20ocmVuZGVyZWQuY2hpbGROb2RlcykpO1xuICAgIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGJyb3dzZU1vZHMoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3Qgc2V0dGluZ3NDb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MRWxlbWVudD4oU0VMRUNUT1JTLlNFVFRJTkdTX0NPTlRFTlQpO1xuICAgIGlmICghc2V0dGluZ3NDb250ZW50KSByZXR1cm47XG5cbiAgICBzZXR0aW5nc0NvbnRlbnQuaW5uZXJIVE1MID0gZ2V0TW9kc1RhYlRlbXBsYXRlKCk7XG5cbiAgICBjb25zdCBtb2RzID0gYXdhaXQgTW9kTWFuYWdlci5mZXRjaE1vZHMoKTtcbiAgICBjb25zdCBtb2RzTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW9kcy1saXN0XCIpO1xuICAgIGlmICghbW9kc0xpc3QpIHJldHVybjtcblxuICAgIGNvbnN0IHBsdWdpbnMgPSBBcnJheS5pc0FycmF5KG1vZHMucGx1Z2lucykgPyBtb2RzLnBsdWdpbnMgOiBbXTtcbiAgICBjb25zdCB0aGVtZXMgPSBBcnJheS5pc0FycmF5KG1vZHMudGhlbWVzKSA/IG1vZHMudGhlbWVzIDogW107XG5cbiAgICBhd2FpdCByZW5kZXJSZWdpc3RyeU1vZHMobW9kc0xpc3QsIHBsdWdpbnMsIFwiUGx1Z2luXCIpO1xuICAgIGF3YWl0IHJlbmRlclJlZ2lzdHJ5TW9kcyhtb2RzTGlzdCwgdGhlbWVzLCBcIlRoZW1lXCIpO1xuXG4gICAgc2V0dXBBY3Rpb25CdXR0b25zKCk7XG4gICAgc2V0dXBTZWFyY2hCYXIoKTtcbiAgICBzZXR1cEJhY2tCdXR0b24oKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldHVwU2VhcmNoQmFyKCk6IHZvaWQge1xuICAgIGNvbnN0IHNlYXJjaElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MSW5wdXRFbGVtZW50PihTRUxFQ1RPUlMuU0VBUkNIX0lOUFVUKTtcbiAgICBjb25zdCBhZGRvbnNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PihTRUxFQ1RPUlMuQURET05TX0xJU1RfQ09OVEFJTkVSKTtcbiAgICBpZiAoIXNlYXJjaElucHV0IHx8ICFhZGRvbnNDb250YWluZXIpIHJldHVybjtcbiAgICBpZiAoc2VhcmNoSW5wdXQuZGF0YXNldC5zdHJlbWlvRW5oYW5jZWRTZWFyY2hCb3VuZCA9PT0gXCJ0cnVlXCIpIHJldHVybjtcblxuICAgIHNlYXJjaElucHV0LmRhdGFzZXQuc3RyZW1pb0VuaGFuY2VkU2VhcmNoQm91bmQgPSBcInRydWVcIjtcbiAgICBzZWFyY2hJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCkgPT4ge1xuICAgICAgICBjb25zdCBmaWx0ZXIgPSBzZWFyY2hJbnB1dC52YWx1ZS50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgY29uc3QgbW9kSXRlbXMgPSBhZGRvbnNDb250YWluZXIucXVlcnlTZWxlY3RvckFsbDxIVE1MRWxlbWVudD4oU0VMRUNUT1JTLkFERE9OX0NPTlRBSU5FUik7XG5cbiAgICAgICAgbW9kSXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoU0VMRUNUT1JTLk5BTUVfQ09OVEFJTkVSKT8udGV4dENvbnRlbnQ/LnRvTG93ZXJDYXNlKCkgPz8gXCJcIjtcbiAgICAgICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gaXRlbS5xdWVyeVNlbGVjdG9yKFNFTEVDVE9SUy5ERVNDUklQVElPTl9JVEVNKT8udGV4dENvbnRlbnQ/LnRvTG93ZXJDYXNlKCkgPz8gXCJcIjtcbiAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoU0VMRUNUT1JTLlRZUEVTX0NPTlRBSU5FUik/LnRleHRDb250ZW50Py50b0xvd2VyQ2FzZSgpID8/IFwiXCI7XG4gICAgICAgICAgICBjb25zdCBtYXRjaGVzID0gbmFtZS5pbmNsdWRlcyhmaWx0ZXIpIHx8IGRlc2NyaXB0aW9uLmluY2x1ZGVzKGZpbHRlcikgfHwgdHlwZS5pbmNsdWRlcyhmaWx0ZXIpO1xuICAgICAgICAgICAgaXRlbS5zdHlsZS5kaXNwbGF5ID0gbWF0Y2hlcyA/IFwiXCIgOiBcIm5vbmVcIjtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXR1cEJyb3dzZU1vZHNCdXR0b24oKTogdm9pZCB7XG4gICAgSGVscGVycy53YWl0Rm9yRWxtKFwiI2Jyb3dzZVBsdWdpbnNUaGVtZXNCdG5cIikudGhlbigoKSA9PiB7XG4gICAgICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYnJvd3NlUGx1Z2luc1RoZW1lc0J0blwiKTtcbiAgICAgICAgaWYgKCEoYnV0dG9uIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSByZXR1cm47XG4gICAgICAgIGlmIChidXR0b24uZGF0YXNldC5zdHJlbWlvRW5oYW5jZWRCcm93c2VNb2RzQm91bmQgPT09IFwidHJ1ZVwiKSByZXR1cm47XG5cbiAgICAgICAgYnV0dG9uLmRhdGFzZXQuc3RyZW1pb0VuaGFuY2VkQnJvd3NlTW9kc0JvdW5kID0gXCJ0cnVlXCI7XG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKGJ1dHRvbi5kYXRhc2V0LnN0cmVtaW9FbmhhbmNlZEJyb3dzZU1vZHNCdXN5ID09PSBcInRydWVcIikgcmV0dXJuO1xuXG4gICAgICAgICAgICBidXR0b24uZGF0YXNldC5zdHJlbWlvRW5oYW5jZWRCcm93c2VNb2RzQnVzeSA9IFwidHJ1ZVwiO1xuICAgICAgICAgICAgYnV0dG9uLnNldEF0dHJpYnV0ZShcImFyaWEtYnVzeVwiLCBcInRydWVcIik7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGF3YWl0IGJyb3dzZU1vZHMoKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmVycm9yKGBGYWlsZWQgdG8gYnJvd3NlIG1vZHM6ICR7ZXJyb3J9YCk7XG4gICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBidXR0b24uZGF0YXNldC5zdHJlbWlvRW5oYW5jZWRCcm93c2VNb2RzQnVzeTtcbiAgICAgICAgICAgICAgICBidXR0b24ucmVtb3ZlQXR0cmlidXRlKFwiYXJpYS1idXN5XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KS5jYXRjaChlcnJvciA9PiBsb2dnZXIuZXJyb3IoYEZhaWxlZCB0byBzZXR1cCBicm93c2UgbW9kcyBidXR0b246ICR7ZXJyb3J9YCkpO1xufVxuIiwgImV4cG9ydCBmdW5jdGlvbiBnZXRUaGVtZUljb24oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBjbGFzcz1cImljb25cIj5cbiAgICAgICAgPGc+PHBhdGggZmlsbD1cIm5vbmVcIiBkPVwiTTAgMGgyNHYyNEgwelwiPjwvcGF0aD5cbiAgICAgICAgPHBhdGggZD1cIk00IDNoMTZhMSAxIDAgMCAxIDEgMXY1YTEgMSAwIDAgMS0xIDFINGExIDEgMCAwIDEtMS0xVjRhMSAxIDAgMCAxIDEtMXptMiA5aDZhMSAxIDAgMCAxIDEgMXYzaDF2NmgtNHYtNmgxdi0ySDVhMSAxIDAgMCAxLTEtMXYtMmgydjF6bTExLjczMiAxLjczMmwxLjc2OC0xLjc2OCAxLjc2OCAxLjc2OGEyLjUgMi41IDAgMSAxLTMuNTM2IDB6XCIgc3R5bGU9XCJmaWxsOiBjdXJyZW50Y29sb3I7XCI+PC9wYXRoPjwvZz48L3N2Zz5gO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UGx1Z2luSWNvbigpOiBzdHJpbmcge1xuICAgIHJldHVybiBgPHN2ZyBpY29uPVwiYWRkb25zLW91dGxpbmVcIiBjbGFzcz1cImljb25cIiB2aWV3Qm94PVwiMCAwIDUxMiA1MTJcIiBzdHlsZT1cImZpbGw6IGN1cnJlbnRjb2xvcjtcIj5cbiAgICAgICAgPHBhdGggZD1cIk00MTMuNyAyNDYuMUgzODZjLTAuNTMtMC4wMS0xLjAzLTAuMjMtMS40LTAuNi0wLjM3LTAuMzctMC41OS0wLjg3LTAuNi0xLjR2LTc3LjJhMzguOTQgMzguOTQgMCAwIDAtMTEuNC0yNy41IDM4Ljk0IDM4Ljk0IDAgMCAwLTI3LjUtMTEuNGgtNzcuMmMtMC41My0wLjAxLTEuMDMtMC4yMy0xLjQtMC42LTAuMzctMC4zNy0wLjU5LTAuODctMC42LTEuNHYtMjcuN2MwLTI3LjEtMjEuNS00OS45LTQ4LjYtNTAuMy02LjU3LTAuMS0xMy4wOSAxLjA5LTE5LjIgMy41YTQ5LjYxNiA0OS42MTYgMCAwIDAtMTYuNCAxMC43IDQ5LjgyMyA0OS44MjMgMCAwIDAtMTEgMTYuMiA0OC44OTQgNDguODk0IDAgMCAwLTMuOSAxOS4ydjI4LjVjLTAuMDEgMC41My0wLjIzIDEuMDMtMC42IDEuNC0wLjM3IDAuMzctMC44NyAwLjU5LTEuNCAwLjZoLTc3LjJjLTEwLjUgMC0yMC41NyA0LjE3LTI4IDExLjZhMzkuNTk0IDM5LjU5NCAwIDAgMC0xMS42IDI4djcwLjRjMC4wMSAwLjUzIDAuMjMgMS4wMyAwLjYgMS40IDAuMzcgMC4zNyAwLjg3IDAuNTkgMS40IDAuNmgyNi45YzI5LjQgMCA1My43IDI1LjUgNTQuMSA1NC44IDAuNCAyOS45LTIzLjUgNTcuMi01My4zIDU3LjJINTBjLTAuNTMgMC4wMS0xLjAzIDAuMjMtMS40IDAuNi0wLjM3IDAuMzctMC41OSAwLjg3LTAuNiAxLjR2NzAuNGMwIDEwLjUgNC4xNyAyMC41NyAxMS42IDI4czE3LjUgMTEuNiAyOCAxMS42aDcwLjRjMC41My0wLjAxIDEuMDMtMC4yMyAxLjQtMC42IDAuMzctMC4zNyAwLjU5LTAuODcgMC42LTEuNFY0NDEuMmMwLTMwLjMgMjQuOC01Ni40IDU1LTU3LjEgMzAuMS0wLjcgNTcgMjAuMyA1NyA1MC4zdjI3LjdjMC4wMSAwLjUzIDAuMjMgMS4wMyAwLjYgMS40IDAuMzcgMC4zNyAwLjg3IDAuNTkgMS40IDAuNmg3MS4xYTM4Ljk0IDM4Ljk0IDAgMCAwIDI3LjUtMTEuNCAzOC45NTggMzguOTU4IDAgMCAwIDExLjQtMjcuNXYtNzhjMC4wMS0wLjUzIDAuMjMtMS4wMyAwLjYtMS40IDAuMzctMC4zNyAwLjg3LTAuNTkgMS40LTAuNmgyOC41YzI3LjYgMCA0OS41LTIyLjcgNDkuNS01MC40cy0yMy4yLTQ4LjctNTAuMy00OC43WlwiIHN0eWxlPVwic3Ryb2tlOmN1cnJlbnRjb2xvcjtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLXdpZHRoOjMyO2ZpbGw6IGN1cnJlbnRDb2xvcjtcIj48L3BhdGg+PC9zdmc+YDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEFib3V0SWNvbigpOiBzdHJpbmcge1xuICAgIHJldHVybiBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGNsYXNzPVwiaWNvblwiPlxuICAgICAgICA8Zz48cGF0aCBmaWxsPVwibm9uZVwiIGQ9XCJNMCAwaDI0djI0SDB6XCI+PC9wYXRoPlxuICAgICAgICA8cGF0aCBkPVwiTTEyIDIyQzYuNDc3IDIyIDIgMTcuNTIzIDIgMTJTNi40NzcgMiAxMiAyczEwIDQuNDc3IDEwIDEwLTQuNDc3IDEwLTEwIDEwem0tMS0xMXY2aDJ2LTZoLTJ6bTAtNHYyaDJWN2gtMnpcIiBzdHlsZT1cImZpbGw6Y3VycmVudGNvbG9yXCI+PC9wYXRoPjwvZz48L3N2Zz5gO1xufVxuIiwgImltcG9ydCB7IGpvaW4gfSBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgU1RPUkFHRV9LRVlTIH0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgUGxhdGZvcm1NYW5hZ2VyIH0gZnJvbSBcIi4uL3BsYXRmb3JtL1BsYXRmb3JtTWFuYWdlclwiO1xuaW1wb3J0IHsgZ2V0TG9nZ2VyIH0gZnJvbSBcIi4uL3V0aWxzL2xvZ2dlclwiO1xuaW1wb3J0IHsgaXNTYWZlTW9kRmlsZU5hbWUgfSBmcm9tIFwiLi4vdXRpbHMvbW9kRmlsZU5hbWVcIjtcbmltcG9ydCBwcm9wZXJ0aWVzIGZyb20gXCIuL1Byb3BlcnRpZXNcIjtcblxuZXhwb3J0IHR5cGUgVGhlbWVFbGVtZW50RmFjdG9yeSA9IChcbiAgICB0aGVtZVBhdGg6IHN0cmluZyxcbiAgICB0aGVtZUZpbGU6IHN0cmluZ1xuKSA9PiBQcm9taXNlPEhUTUxFbGVtZW50PjtcblxuY2xhc3MgVGhlbWVNYW5hZ2VyIHtcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBsb2dnZXIgPSBnZXRMb2dnZXIoXCJUaGVtZU1hbmFnZXJcIik7XG5cbiAgICBwdWJsaWMgc3RhdGljIGFzeW5jIGFwcGx5VGhlbWUoXG4gICAgICAgIHJlcXVlc3RlZFRoZW1lOiBzdHJpbmcgfCB1bmRlZmluZWQsXG4gICAgICAgIGNyZWF0ZVRoZW1lRWxlbWVudDogVGhlbWVFbGVtZW50RmFjdG9yeVxuICAgICk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgICAgICBjb25zdCB0aGVtZUZpbGUgPSByZXF1ZXN0ZWRUaGVtZSA/PyBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShTVE9SQUdFX0tFWVMuQ1VSUkVOVF9USEVNRSk7XG5cbiAgICAgICAgaWYgKCF0aGVtZUZpbGUgfHwgdGhlbWVGaWxlID09PSBcIkRlZmF1bHRcIikge1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhY3RpdmVUaGVtZVwiKT8ucmVtb3ZlKCk7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShTVE9SQUdFX0tFWVMuQ1VSUkVOVF9USEVNRSwgXCJEZWZhdWx0XCIpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWlzU2FmZU1vZEZpbGVOYW1lKHRoZW1lRmlsZSwgXCJ0aGVtZVwiKSkge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIud2FybihgUmVmdXNlZCB0byBhcHBseSBpbnZhbGlkIHRoZW1lIG5hbWU6ICR7dGhlbWVGaWxlfWApO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdGhlbWVQYXRoID0gam9pbihwcm9wZXJ0aWVzLnRoZW1lc1BhdGgsIHRoZW1lRmlsZSk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoIWF3YWl0IFBsYXRmb3JtTWFuYWdlci5jdXJyZW50LmV4aXN0cyh0aGVtZVBhdGgpKSB7XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oU1RPUkFHRV9LRVlTLkNVUlJFTlRfVEhFTUUsIFwiRGVmYXVsdFwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IG5leHRUaGVtZSA9IGF3YWl0IGNyZWF0ZVRoZW1lRWxlbWVudCh0aGVtZVBhdGgsIHRoZW1lRmlsZSk7XG4gICAgICAgICAgICBuZXh0VGhlbWUuaWQgPSBcImFjdGl2ZVRoZW1lXCI7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFjdGl2ZVRoZW1lXCIpPy5yZW1vdmUoKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQobmV4dFRoZW1lKTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFNUT1JBR0VfS0VZUy5DVVJSRU5UX1RIRU1FLCB0aGVtZUZpbGUpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcihgRmFpbGVkIHRvIGFwcGx5IHRoZW1lICR7dGhlbWVGaWxlfTogJHtlcnJvcn1gKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVGhlbWVNYW5hZ2VyO1xuIiwgImltcG9ydCBUaGVtZU1hbmFnZXIgZnJvbSBcIi4uLy4uL2NvcmUvVGhlbWVNYW5hZ2VyXCI7XG5pbXBvcnQgeyBQbGF0Zm9ybU1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vcGxhdGZvcm0vUGxhdGZvcm1NYW5hZ2VyXCI7XG5cbmFzeW5jIGZ1bmN0aW9uIGNyZWF0ZUFuZHJvaWRUaGVtZUVsZW1lbnQodGhlbWVQYXRoOiBzdHJpbmcpOiBQcm9taXNlPEhUTUxFbGVtZW50PiB7XG4gICAgY29uc3Qgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gICAgc3R5bGUudGV4dENvbnRlbnQgPSBhd2FpdCBQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC5yZWFkRmlsZSh0aGVtZVBhdGgpO1xuICAgIHJldHVybiBzdHlsZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5QW5kcm9pZFRoZW1lKHJlcXVlc3RlZFRoZW1lPzogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIFRoZW1lTWFuYWdlci5hcHBseVRoZW1lKHJlcXVlc3RlZFRoZW1lLCBjcmVhdGVBbmRyb2lkVGhlbWVFbGVtZW50KTtcbn1cbiJdLAogICJtYXBwaW5ncyI6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LFNBQVMsbUJBQVcsWUFBWTtBQUFBLFFBQ2xFLEdBQUcsNkJBQTZCO0FBQUEsTUFDcEM7QUFBQSxJQUNKLENBQUMsRUFBRSxNQUFNLFNBQU8sdUJBQU8sTUFBTSxvQ0FBb0MsR0FBRyxDQUFDO0FBQUEsRUFDekU7IiwKICAibmFtZXMiOiBbIkV4Y2VwdGlvbkNvZGUiLCAicmVnaXN0ZXJQbHVnaW4iLCAicCIsICJyZXNvbHZlIiwgImhlYWRlcnMiLCAiU3lzdGVtQmFyc1N0eWxlIiwgIlN5c3RlbUJhclR5cGUiLCAiRGlyZWN0b3J5IiwgIkVuY29kaW5nIiwgInJlc29sdmUiLCAiZW50cnkiLCAidG9QYXRoIiwgImN0aW1lIiwgIndlYl9leHBvcnRzIiwgImluaXRfd2ViIiwgInJlc29sdmUiLCAicmVzb2x2ZSIsICJqb2luIiwgImJhc2VuYW1lIiwgIndlYl9leHBvcnRzIiwgImluaXRfd2ViIiwgIkJyb3dzZXIiLCAiZiIsICJCcm93c2VyIiwgInJlc29sdmUiLCAiY29udGVudCIsICJmIiwgInJlc29sdmUiLCAiaW1wb3J0X3BhdGgiLCAiaW1wb3J0X3BhdGgiLCAicmVzb2x2ZSIsICJpbXBvcnRfcGF0aCIsICJsb2dnZXIiLCAibG9nZ2VyIiwgImltcG9ydF9wYXRoIl0KfQo=
