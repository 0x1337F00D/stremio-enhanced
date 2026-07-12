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
        join: function join4() {
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
      const expectedExtension = type === "theme" ? FILE_EXTENSIONS.THEME : FILE_EXTENSIONS.PLUGIN;
      const normalized = this.decodeFileName((0, import_path.basename)(fileName).trim());
      if (!normalized) return null;
      if (!normalized.endsWith(expectedExtension)) return null;
      if (!/^[A-Za-z0-9._-]+$/.test(normalized)) return null;
      return normalized;
    }
    static isSupportedRemoteUrl(rawUrl) {
      try {
        const url = new URL(rawUrl);
        return url.protocol === "https:" || url.protocol === "http:";
      } catch {
        return false;
      }
    }
    /**
     * Load and enable a plugin by filename
     */
    static async loadPlugin(pluginName) {
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
     * Unload and disable a plugin by filename
     */
    static unloadPlugin(pluginName) {
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
      if (modUrl.protocol !== "https:" && modUrl.protocol !== "http:") {
        throw new Error(`Unsupported URL protocol for ${type}: ${modUrl.protocol}`);
      }
      const response = await fetch(modUrl.toString());
      if (!response.ok) throw new Error(`Failed to download: ${response.status} ${response.statusText}`);
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
    /**
     * Set up event listeners for plugin toggle checkboxes
     */
    static togglePluginListener() {
      if (this.pluginListenerReady || this.pluginListenerSetupPending) return;
      this.pluginListenerSetupPending = true;
      Helpers_default.waitForElm(SELECTORS.PLUGINS_CATEGORY).then(() => {
        this.logger.info("Listening to plugin checkboxes...");
        const pluginCheckboxes = document.getElementsByClassName("plugin");
        for (let i = 0; i < pluginCheckboxes.length; i++) {
          if (pluginCheckboxes[i].dataset.stremioEnhancedToggleBound === "true") {
            continue;
          }
          pluginCheckboxes[i].dataset.stremioEnhancedToggleBound = "true";
          pluginCheckboxes[i].addEventListener("click", async () => {
            pluginCheckboxes[i].classList.toggle(CLASSES.CHECKED);
            const pluginName = pluginCheckboxes[i].getAttribute("name");
            if (!pluginName) return;
            if (pluginCheckboxes[i].classList.contains(CLASSES.CHECKED)) {
              await this.loadPlugin(pluginName);
            } else {
              this.unloadPlugin(pluginName);
            }
          });
        }
        this.pluginListenerReady = true;
      }).catch((err) => {
        this.logger.warn(`Plugin listeners were not ready: ${err}`);
      }).finally(() => {
        this.pluginListenerSetupPending = false;
      });
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
  __publicField(ModManager, "pluginListenerReady", false);
  __publicField(ModManager, "pluginListenerSetupPending", false);
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
  var import_path3 = __toESM(require_path_browserify());

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
    if (!PlatformManager.current) PlatformManager.setPlatform(new CapacitorPlatform());
    await PlatformManager.current.init();
    void ensureBundledStreamingServerReady();
    installFullscreenHider();
    observeSettingsUi();
    observePlayerUi();
    window.stremioEnhanced = createStremioEnhancedApi(applyUserTheme);
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
  var isCheckingSettings = false;
  function isEnhancedSettingsReady() {
    return Boolean(
      document.getElementById("enhanced") && document.querySelector('[data-section="enhanced"]') && document.querySelector(SELECTORS.THEMES_CATEGORY) && document.querySelector(SELECTORS.PLUGINS_CATEGORY) && document.querySelector(SELECTORS.ABOUT_CATEGORY)
    );
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
  async function checkSettings() {
    if (!location.href.includes(SETTINGS_ROUTE)) return;
    if (isEnhancedSettingsReady()) return;
    if (isCheckingSettings) return;
    isCheckingSettings = true;
    try {
      await doCheckSettings();
    } finally {
      isCheckingSettings = false;
    }
  }
  async function doCheckSettings() {
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
      if (!document.getElementById("stremio-enhanced-default-theme")) {
        const isCurrentThemeDefault = localStorage.getItem(STORAGE_KEYS.CURRENT_THEME) === "Default";
        const defaultThemeContainer = document.createElement("div");
        defaultThemeContainer.id = "stremio-enhanced-default-theme";
        defaultThemeContainer.innerHTML = getDefaultThemeTemplate(isCurrentThemeDefault);
        document.querySelector(SELECTORS.THEMES_CATEGORY)?.appendChild(defaultThemeContainer);
      }
      await Promise.all(themesList.map(async (theme) => {
        try {
          const themePath = (0, import_path3.join)(themesPath, theme);
          const content = await PlatformManager.current.readFile(themePath);
          const metaData = ExtractMetaData_default.extractMetadataFromText(content);
          if (metaData) {
            if (metaData.name.toLowerCase() !== "default") {
              Settings_default.addItem("theme", theme, metaData);
            }
          }
        } catch (e) {
          logger_browser_default.error(`Failed to load theme metadata for ${theme}: ${e}`);
        }
      }));
    }).catch((err) => logger_browser_default.error("Failed to setup themes: " + err));
    for (const plugin of pluginsList) {
      try {
        const pluginPath = (0, import_path3.join)(pluginsPath, plugin);
        const content = await PlatformManager.current.readFile(pluginPath);
        const metaData = ExtractMetaData_default.extractMetadataFromText(content);
        if (metaData) {
          Settings_default.addItem("plugin", plugin, metaData);
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
        if (location.href.includes(SETTINGS_ROUTE) && !isCheckingSettings && !isEnhancedSettingsReady()) {
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
  async function applyUserTheme(requestedTheme) {
    const currentTheme = requestedTheme ?? localStorage.getItem(STORAGE_KEYS.CURRENT_THEME);
    if (!currentTheme || currentTheme === "Default") {
      document.getElementById("activeTheme")?.remove();
      localStorage.setItem(STORAGE_KEYS.CURRENT_THEME, "Default");
      return true;
    }
    if (!/^[A-Za-z0-9._-]+\.theme\.css$/.test(currentTheme)) {
      logger_browser_default.warn(`Refused to apply invalid theme name: ${currentTheme}`);
      return false;
    }
    const themePath = (0, import_path3.join)(Properties_default.themesPath, currentTheme);
    try {
      if (!await PlatformManager.current.exists(themePath)) {
        localStorage.setItem(STORAGE_KEYS.CURRENT_THEME, "Default");
        return false;
      }
      document.getElementById("activeTheme")?.remove();
      const content = await PlatformManager.current.readFile(themePath);
      const styleElement = document.createElement("style");
      styleElement.setAttribute("id", "activeTheme");
      styleElement.textContent = content;
      document.head.appendChild(styleElement);
      localStorage.setItem(STORAGE_KEYS.CURRENT_THEME, currentTheme);
      return true;
    } catch (e) {
      logger_browser_default.error("Failed to apply theme: " + e);
      return false;
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
    bindButtonClick(buttonId, () => importModFile(type), `${type} import button`);
  }
  function setupManagedFolderButton(buttonId, folderPath) {
    bindButtonClick(buttonId, () => PlatformManager.current.openPath(folderPath), `folder button ${buttonId}`);
  }
  var isImporting = false;
  function sanitizeImportedModFileName(fileName, type) {
    const expectedExtension = type === "theme" ? FILE_EXTENSIONS.THEME : FILE_EXTENSIONS.PLUGIN;
    const normalized = fileName.trim().split(/[\\/]/).pop() || "";
    if (!normalized) return null;
    if (!normalized.endsWith(expectedExtension)) return null;
    if (!/^[A-Za-z0-9._-]+$/.test(normalized)) return null;
    return normalized;
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
      await PlatformManager.current.writeFile((0, import_path3.join)(destinationDirectory, safeFileName), content);
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
    bindButtonClick("browsePluginsThemesBtn", browseMods, "browse mods button");
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
            await PlatformManager.current.openPath((0, import_path3.join)(Properties_default.enhancedPath, "logs"));
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BjYXBhY2l0b3IvY29yZS9idWlsZC91dGlsLmpzIiwgIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9AY2FwYWNpdG9yL2NvcmUvYnVpbGQvcnVudGltZS5qcyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvQGNhcGFjaXRvci9jb3JlL2J1aWxkL2dsb2JhbC5qcyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvQGNhcGFjaXRvci9jb3JlL2J1aWxkL3dlYi1wbHVnaW4uanMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BjYXBhY2l0b3IvY29yZS9idWlsZC9jb3JlLXBsdWdpbnMuanMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BjYXBhY2l0b3IvZmlsZXN5c3RlbS9zcmMvZGVmaW5pdGlvbnMudHMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BjYXBhY2l0b3IvZmlsZXN5c3RlbS9zcmMvd2ViLnRzIiwgIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9AY2FwYWNpdG9yL2Jyb3dzZXIvc3JjL3dlYi50cyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcGF0aC1icm93c2VyaWZ5L2luZGV4LmpzIiwgIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jYXBhY2l0b3Itbm9kZWpzL3NyYy93ZWIudHMiLCAiLi4vLi4vLi4vLi4vLi4vc3JjL3BsYXRmb3JtL1BsYXRmb3JtTWFuYWdlci50cyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvQGNhcGFjaXRvci9maWxlc3lzdGVtL3NyYy9pbmRleC50cyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvQGNhcGFjaXRvci9zeW5hcHNlL2Rpc3Qvc3luYXBzZS5tanMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BjYXBhY2l0b3IvYnJvd3Nlci9zcmMvaW5kZXgudHMiLCAiLi4vLi4vLi4vLi4vLi4vc3JjL3BsYXRmb3JtL0NhcGFjaXRvclBsYXRmb3JtLnRzIiwgIi4uLy4uLy4uLy4uLy4uL3NyYy91dGlscy9sb2dnZXIuYnJvd3Nlci50cyIsICIuLi8uLi8uLi8uLi8uLi9zcmMvY29uc3RhbnRzL2luZGV4LnRzIiwgIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL21vZHMtdGFiL21vZHMtdGFiLmh0bWwiLCAiLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvbW9kcy1pdGVtL21vZHMtaXRlbS5odG1sIiwgIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2Fib3V0LWNhdGVnb3J5L2Fib3V0LWNhdGVnb3J5Lmh0bWwiLCAiLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvZGVmYXVsdC10aGVtZS9kZWZhdWx0LXRoZW1lLmh0bWwiLCAiLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvYmFjay1idG4vYmFjay1idG4uaHRtbCIsICIuLi8uLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy90aXRsZS1iYXIvdGl0bGUtYmFyLmh0bWwiLCAiLi4vLi4vLi4vLi4vLi4vc3JjL3V0aWxzL3RlbXBsYXRlQ2FjaGUuYnJvd3Nlci50cyIsICIuLi8uLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy90b2FzdC90b2FzdC50cyIsICIuLi8uLi8uLi8uLi8uLi9zcmMvdXRpbHMvSGVscGVycy50cyIsICIuLi8uLi8uLi8uLi8uLi9zcmMvdXRpbHMvZXNjYXBlSHRtbC50cyIsICIuLi8uLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9wbHVnaW4taXRlbS9wbHVnaW5JdGVtLnRzIiwgIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3RoZW1lLWl0ZW0vdGhlbWVJdGVtLnRzIiwgIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2VuaGFuY2VkLW5hdi9lbmhhbmNlZE5hdi50cyIsICIuLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9Qcm9wZXJ0aWVzLnRzIiwgIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2FwcGx5LXRoZW1lL2FwcGx5VGhlbWUuYnJvd3Nlci50cyIsICIuLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9Nb2RNYW5hZ2VyLnRzIiwgIi4uLy4uLy4uLy4uLy4uL3NyYy9pbnRlcmZhY2VzL01ldGFEYXRhLnRzIiwgIi4uLy4uLy4uLy4uLy4uL3NyYy91dGlscy9QbHVnaW5PcHRpb25TY2hlbWEudHMiLCAiLi4vLi4vLi4vLi4vLi4vc3JjL3V0aWxzL0V4dHJhY3RNZXRhRGF0YS50cyIsICIuLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9QbHVnaW5PcHRpb25zLnRzIiwgIi4uLy4uLy4uLy4uLy4uL3NyYy91dGlscy9yZWxvYWRBcHBsaWNhdGlvbi50cyIsICIuLi8uLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9wbHVnaW4tb3B0aW9ucy9wbHVnaW5PcHRpb25zLnRzIiwgIi4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL1NldHRpbmdzLnRzIiwgIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL21vZHMtdGFiL21vZHNUYWIudHMiLCAiLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvbW9kcy1pdGVtL21vZHNJdGVtLnRzIiwgIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2Fib3V0LWNhdGVnb3J5L2Fib3V0Q2F0ZWdvcnkudHMiLCAiLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvZGVmYXVsdC10aGVtZS9kZWZhdWx0VGhlbWUudHMiLCAiLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvYmFjay1idG4vYmFja0J0bi50cyIsICIuLi8uLi8uLi8uLi8uLi9zcmMvYW5kcm9pZC9wcmVsb2FkLnRzIiwgIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jYXBhY2l0b3Itbm9kZWpzL3NyYy9Ob2RlSlMudHMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NhcGFjaXRvci1ub2RlanMvc3JjL2ltcGxlbWVudGF0aW9uLnRzIiwgIi4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL0xvZ01hbmFnZXIudHMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BjYXBhd2Vzb21lL2NhcGFjaXRvci1maWxlLXBpY2tlci9zcmMvaW5kZXgudHMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BjYXBhd2Vzb21lL2NhcGFjaXRvci1maWxlLXBpY2tlci9zcmMvd2ViLnRzIiwgIi4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL1N0cmVtaW9FbmhhbmNlZEFwaS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiZXhwb3J0IHZhciBFeGNlcHRpb25Db2RlO1xuKGZ1bmN0aW9uIChFeGNlcHRpb25Db2RlKSB7XG4gICAgLyoqXG4gICAgICogQVBJIGlzIG5vdCBpbXBsZW1lbnRlZC5cbiAgICAgKlxuICAgICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgQVBJIGNhbid0IGJlIHVzZWQgYmVjYXVzZSBpdCBpcyBub3QgaW1wbGVtZW50ZWQgZm9yXG4gICAgICogdGhlIGN1cnJlbnQgcGxhdGZvcm0uXG4gICAgICovXG4gICAgRXhjZXB0aW9uQ29kZVtcIlVuaW1wbGVtZW50ZWRcIl0gPSBcIlVOSU1QTEVNRU5URURcIjtcbiAgICAvKipcbiAgICAgKiBBUEkgaXMgbm90IGF2YWlsYWJsZS5cbiAgICAgKlxuICAgICAqIFRoaXMgbWVhbnMgdGhlIEFQSSBjYW4ndCBiZSB1c2VkIHJpZ2h0IG5vdyBiZWNhdXNlOlxuICAgICAqICAgLSBpdCBpcyBjdXJyZW50bHkgbWlzc2luZyBhIHByZXJlcXVpc2l0ZSwgc3VjaCBhcyBuZXR3b3JrIGNvbm5lY3Rpdml0eVxuICAgICAqICAgLSBpdCByZXF1aXJlcyBhIHBhcnRpY3VsYXIgcGxhdGZvcm0gb3IgYnJvd3NlciB2ZXJzaW9uXG4gICAgICovXG4gICAgRXhjZXB0aW9uQ29kZVtcIlVuYXZhaWxhYmxlXCJdID0gXCJVTkFWQUlMQUJMRVwiO1xufSkoRXhjZXB0aW9uQ29kZSB8fCAoRXhjZXB0aW9uQ29kZSA9IHt9KSk7XG5leHBvcnQgY2xhc3MgQ2FwYWNpdG9yRXhjZXB0aW9uIGV4dGVuZHMgRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UsIGNvZGUsIGRhdGEpIHtcbiAgICAgICAgc3VwZXIobWVzc2FnZSk7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgICAgIHRoaXMuY29kZSA9IGNvZGU7XG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgfVxufVxuZXhwb3J0IGNvbnN0IGdldFBsYXRmb3JtSWQgPSAod2luKSA9PiB7XG4gICAgdmFyIF9hLCBfYjtcbiAgICBpZiAod2luID09PSBudWxsIHx8IHdpbiA9PT0gdm9pZCAwID8gdm9pZCAwIDogd2luLmFuZHJvaWRCcmlkZ2UpIHtcbiAgICAgICAgcmV0dXJuICdhbmRyb2lkJztcbiAgICB9XG4gICAgZWxzZSBpZiAoKF9iID0gKF9hID0gd2luID09PSBudWxsIHx8IHdpbiA9PT0gdm9pZCAwID8gdm9pZCAwIDogd2luLndlYmtpdCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLm1lc3NhZ2VIYW5kbGVycykgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmJyaWRnZSkge1xuICAgICAgICByZXR1cm4gJ2lvcyc7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gJ3dlYic7XG4gICAgfVxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXV0aWwuanMubWFwIiwgImltcG9ydCB7IENhcGFjaXRvckV4Y2VwdGlvbiwgZ2V0UGxhdGZvcm1JZCwgRXhjZXB0aW9uQ29kZSB9IGZyb20gJy4vdXRpbCc7XG5leHBvcnQgY29uc3QgY3JlYXRlQ2FwYWNpdG9yID0gKHdpbikgPT4ge1xuICAgIGNvbnN0IGNhcEN1c3RvbVBsYXRmb3JtID0gd2luLkNhcGFjaXRvckN1c3RvbVBsYXRmb3JtIHx8IG51bGw7XG4gICAgY29uc3QgY2FwID0gd2luLkNhcGFjaXRvciB8fCB7fTtcbiAgICBjb25zdCBQbHVnaW5zID0gKGNhcC5QbHVnaW5zID0gY2FwLlBsdWdpbnMgfHwge30pO1xuICAgIGNvbnN0IGdldFBsYXRmb3JtID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gY2FwQ3VzdG9tUGxhdGZvcm0gIT09IG51bGwgPyBjYXBDdXN0b21QbGF0Zm9ybS5uYW1lIDogZ2V0UGxhdGZvcm1JZCh3aW4pO1xuICAgIH07XG4gICAgY29uc3QgaXNOYXRpdmVQbGF0Zm9ybSA9ICgpID0+IGdldFBsYXRmb3JtKCkgIT09ICd3ZWInO1xuICAgIGNvbnN0IGlzUGx1Z2luQXZhaWxhYmxlID0gKHBsdWdpbk5hbWUpID0+IHtcbiAgICAgICAgY29uc3QgcGx1Z2luID0gcmVnaXN0ZXJlZFBsdWdpbnMuZ2V0KHBsdWdpbk5hbWUpO1xuICAgICAgICBpZiAocGx1Z2luID09PSBudWxsIHx8IHBsdWdpbiA9PT0gdm9pZCAwID8gdm9pZCAwIDogcGx1Z2luLnBsYXRmb3Jtcy5oYXMoZ2V0UGxhdGZvcm0oKSkpIHtcbiAgICAgICAgICAgIC8vIEpTIGltcGxlbWVudGF0aW9uIGF2YWlsYWJsZSBmb3IgdGhlIGN1cnJlbnQgcGxhdGZvcm0uXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZ2V0UGx1Z2luSGVhZGVyKHBsdWdpbk5hbWUpKSB7XG4gICAgICAgICAgICAvLyBOYXRpdmUgaW1wbGVtZW50YXRpb24gYXZhaWxhYmxlLlxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gICAgY29uc3QgZ2V0UGx1Z2luSGVhZGVyID0gKHBsdWdpbk5hbWUpID0+IHsgdmFyIF9hOyByZXR1cm4gKF9hID0gY2FwLlBsdWdpbkhlYWRlcnMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5maW5kKChoKSA9PiBoLm5hbWUgPT09IHBsdWdpbk5hbWUpOyB9O1xuICAgIGNvbnN0IGhhbmRsZUVycm9yID0gKGVycikgPT4gd2luLmNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICBjb25zdCByZWdpc3RlcmVkUGx1Z2lucyA9IG5ldyBNYXAoKTtcbiAgICBjb25zdCByZWdpc3RlclBsdWdpbiA9IChwbHVnaW5OYW1lLCBqc0ltcGxlbWVudGF0aW9ucyA9IHt9KSA9PiB7XG4gICAgICAgIGNvbnN0IHJlZ2lzdGVyZWRQbHVnaW4gPSByZWdpc3RlcmVkUGx1Z2lucy5nZXQocGx1Z2luTmFtZSk7XG4gICAgICAgIGlmIChyZWdpc3RlcmVkUGx1Z2luKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYENhcGFjaXRvciBwbHVnaW4gXCIke3BsdWdpbk5hbWV9XCIgYWxyZWFkeSByZWdpc3RlcmVkLiBDYW5ub3QgcmVnaXN0ZXIgcGx1Z2lucyB0d2ljZS5gKTtcbiAgICAgICAgICAgIHJldHVybiByZWdpc3RlcmVkUGx1Z2luLnByb3h5O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBsYXRmb3JtID0gZ2V0UGxhdGZvcm0oKTtcbiAgICAgICAgY29uc3QgcGx1Z2luSGVhZGVyID0gZ2V0UGx1Z2luSGVhZGVyKHBsdWdpbk5hbWUpO1xuICAgICAgICBsZXQganNJbXBsZW1lbnRhdGlvbjtcbiAgICAgICAgY29uc3QgbG9hZFBsdWdpbkltcGxlbWVudGF0aW9uID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKCFqc0ltcGxlbWVudGF0aW9uICYmIHBsYXRmb3JtIGluIGpzSW1wbGVtZW50YXRpb25zKSB7XG4gICAgICAgICAgICAgICAganNJbXBsZW1lbnRhdGlvbiA9XG4gICAgICAgICAgICAgICAgICAgIHR5cGVvZiBqc0ltcGxlbWVudGF0aW9uc1twbGF0Zm9ybV0gPT09ICdmdW5jdGlvbidcbiAgICAgICAgICAgICAgICAgICAgICAgID8gKGpzSW1wbGVtZW50YXRpb24gPSBhd2FpdCBqc0ltcGxlbWVudGF0aW9uc1twbGF0Zm9ybV0oKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIDogKGpzSW1wbGVtZW50YXRpb24gPSBqc0ltcGxlbWVudGF0aW9uc1twbGF0Zm9ybV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY2FwQ3VzdG9tUGxhdGZvcm0gIT09IG51bGwgJiYgIWpzSW1wbGVtZW50YXRpb24gJiYgJ3dlYicgaW4ganNJbXBsZW1lbnRhdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBqc0ltcGxlbWVudGF0aW9uID1cbiAgICAgICAgICAgICAgICAgICAgdHlwZW9mIGpzSW1wbGVtZW50YXRpb25zWyd3ZWInXSA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICAgICAgICAgICAgICAgICAgPyAoanNJbXBsZW1lbnRhdGlvbiA9IGF3YWl0IGpzSW1wbGVtZW50YXRpb25zWyd3ZWInXSgpKVxuICAgICAgICAgICAgICAgICAgICAgICAgOiAoanNJbXBsZW1lbnRhdGlvbiA9IGpzSW1wbGVtZW50YXRpb25zWyd3ZWInXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ganNJbXBsZW1lbnRhdGlvbjtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgY3JlYXRlUGx1Z2luTWV0aG9kID0gKGltcGwsIHByb3ApID0+IHtcbiAgICAgICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgICAgICBpZiAocGx1Z2luSGVhZGVyKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbWV0aG9kSGVhZGVyID0gcGx1Z2luSGVhZGVyID09PSBudWxsIHx8IHBsdWdpbkhlYWRlciA9PT0gdm9pZCAwID8gdm9pZCAwIDogcGx1Z2luSGVhZGVyLm1ldGhvZHMuZmluZCgobSkgPT4gcHJvcCA9PT0gbS5uYW1lKTtcbiAgICAgICAgICAgICAgICBpZiAobWV0aG9kSGVhZGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtZXRob2RIZWFkZXIucnR5cGUgPT09ICdwcm9taXNlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChvcHRpb25zKSA9PiBjYXAubmF0aXZlUHJvbWlzZShwbHVnaW5OYW1lLCBwcm9wLnRvU3RyaW5nKCksIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChvcHRpb25zLCBjYWxsYmFjaykgPT4gY2FwLm5hdGl2ZUNhbGxiYWNrKHBsdWdpbk5hbWUsIHByb3AudG9TdHJpbmcoKSwgb3B0aW9ucywgY2FsbGJhY2spO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGltcGwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChfYSA9IGltcGxbcHJvcF0pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5iaW5kKGltcGwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGltcGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKF9iID0gaW1wbFtwcm9wXSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmJpbmQoaW1wbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQ2FwYWNpdG9yRXhjZXB0aW9uKGBcIiR7cGx1Z2luTmFtZX1cIiBwbHVnaW4gaXMgbm90IGltcGxlbWVudGVkIG9uICR7cGxhdGZvcm19YCwgRXhjZXB0aW9uQ29kZS5VbmltcGxlbWVudGVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgY3JlYXRlUGx1Z2luTWV0aG9kV3JhcHBlciA9IChwcm9wKSA9PiB7XG4gICAgICAgICAgICBsZXQgcmVtb3ZlO1xuICAgICAgICAgICAgY29uc3Qgd3JhcHBlciA9ICguLi5hcmdzKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcCA9IGxvYWRQbHVnaW5JbXBsZW1lbnRhdGlvbigpLnRoZW4oKGltcGwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZm4gPSBjcmVhdGVQbHVnaW5NZXRob2QoaW1wbCwgcHJvcCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcCA9IGZuKC4uLmFyZ3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlID0gcCA9PT0gbnVsbCB8fCBwID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwLnJlbW92ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IENhcGFjaXRvckV4Y2VwdGlvbihgXCIke3BsdWdpbk5hbWV9LiR7cHJvcH0oKVwiIGlzIG5vdCBpbXBsZW1lbnRlZCBvbiAke3BsYXRmb3JtfWAsIEV4Y2VwdGlvbkNvZGUuVW5pbXBsZW1lbnRlZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAocHJvcCA9PT0gJ2FkZExpc3RlbmVyJykge1xuICAgICAgICAgICAgICAgICAgICBwLnJlbW92ZSA9IGFzeW5jICgpID0+IHJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcDtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAvLyBTb21lIGZsYWlyIOKcqFxuICAgICAgICAgICAgd3JhcHBlci50b1N0cmluZyA9ICgpID0+IGAke3Byb3AudG9TdHJpbmcoKX0oKSB7IFtjYXBhY2l0b3IgY29kZV0gfWA7XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod3JhcHBlciwgJ25hbWUnLCB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHByb3AsXG4gICAgICAgICAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB3cmFwcGVyO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBhZGRMaXN0ZW5lciA9IGNyZWF0ZVBsdWdpbk1ldGhvZFdyYXBwZXIoJ2FkZExpc3RlbmVyJyk7XG4gICAgICAgIGNvbnN0IHJlbW92ZUxpc3RlbmVyID0gY3JlYXRlUGx1Z2luTWV0aG9kV3JhcHBlcigncmVtb3ZlTGlzdGVuZXInKTtcbiAgICAgICAgY29uc3QgYWRkTGlzdGVuZXJOYXRpdmUgPSAoZXZlbnROYW1lLCBjYWxsYmFjaykgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2FsbCA9IGFkZExpc3RlbmVyKHsgZXZlbnROYW1lIH0sIGNhbGxiYWNrKTtcbiAgICAgICAgICAgIGNvbnN0IHJlbW92ZSA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjYWxsYmFja0lkID0gYXdhaXQgY2FsbDtcbiAgICAgICAgICAgICAgICByZW1vdmVMaXN0ZW5lcih7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50TmFtZSxcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2tJZCxcbiAgICAgICAgICAgICAgICB9LCBjYWxsYmFjayk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgY29uc3QgcCA9IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBjYWxsLnRoZW4oKCkgPT4gcmVzb2x2ZSh7IHJlbW92ZSB9KSkpO1xuICAgICAgICAgICAgcC5yZW1vdmUgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBVc2luZyBhZGRMaXN0ZW5lcigpIHdpdGhvdXQgJ2F3YWl0JyBpcyBkZXByZWNhdGVkLmApO1xuICAgICAgICAgICAgICAgIGF3YWl0IHJlbW92ZSgpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiBwO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBwcm94eSA9IG5ldyBQcm94eSh7fSwge1xuICAgICAgICAgICAgZ2V0KF8sIHByb3ApIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHByb3ApIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0L2lzc3Vlcy8yMDAzMFxuICAgICAgICAgICAgICAgICAgICBjYXNlICckJHR5cGVvZic6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICd0b0pTT04nOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICgpID0+ICh7fSk7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2FkZExpc3RlbmVyJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwbHVnaW5IZWFkZXIgPyBhZGRMaXN0ZW5lck5hdGl2ZSA6IGFkZExpc3RlbmVyO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdyZW1vdmVMaXN0ZW5lcic6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVtb3ZlTGlzdGVuZXI7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY3JlYXRlUGx1Z2luTWV0aG9kV3JhcHBlcihwcm9wKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgICAgUGx1Z2luc1twbHVnaW5OYW1lXSA9IHByb3h5O1xuICAgICAgICByZWdpc3RlcmVkUGx1Z2lucy5zZXQocGx1Z2luTmFtZSwge1xuICAgICAgICAgICAgbmFtZTogcGx1Z2luTmFtZSxcbiAgICAgICAgICAgIHByb3h5LFxuICAgICAgICAgICAgcGxhdGZvcm1zOiBuZXcgU2V0KFsuLi5PYmplY3Qua2V5cyhqc0ltcGxlbWVudGF0aW9ucyksIC4uLihwbHVnaW5IZWFkZXIgPyBbcGxhdGZvcm1dIDogW10pXSksXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcHJveHk7XG4gICAgfTtcbiAgICAvLyBBZGQgaW4gY29udmVydEZpbGVTcmMgZm9yIHdlYiwgaXQgd2lsbCBhbHJlYWR5IGJlIGF2YWlsYWJsZSBpbiBuYXRpdmUgY29udGV4dFxuICAgIGlmICghY2FwLmNvbnZlcnRGaWxlU3JjKSB7XG4gICAgICAgIGNhcC5jb252ZXJ0RmlsZVNyYyA9IChmaWxlUGF0aCkgPT4gZmlsZVBhdGg7XG4gICAgfVxuICAgIGNhcC5nZXRQbGF0Zm9ybSA9IGdldFBsYXRmb3JtO1xuICAgIGNhcC5oYW5kbGVFcnJvciA9IGhhbmRsZUVycm9yO1xuICAgIGNhcC5pc05hdGl2ZVBsYXRmb3JtID0gaXNOYXRpdmVQbGF0Zm9ybTtcbiAgICBjYXAuaXNQbHVnaW5BdmFpbGFibGUgPSBpc1BsdWdpbkF2YWlsYWJsZTtcbiAgICBjYXAucmVnaXN0ZXJQbHVnaW4gPSByZWdpc3RlclBsdWdpbjtcbiAgICBjYXAuRXhjZXB0aW9uID0gQ2FwYWNpdG9yRXhjZXB0aW9uO1xuICAgIGNhcC5ERUJVRyA9ICEhY2FwLkRFQlVHO1xuICAgIGNhcC5pc0xvZ2dpbmdFbmFibGVkID0gISFjYXAuaXNMb2dnaW5nRW5hYmxlZDtcbiAgICByZXR1cm4gY2FwO1xufTtcbmV4cG9ydCBjb25zdCBpbml0Q2FwYWNpdG9yR2xvYmFsID0gKHdpbikgPT4gKHdpbi5DYXBhY2l0b3IgPSBjcmVhdGVDYXBhY2l0b3Iod2luKSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1ydW50aW1lLmpzLm1hcCIsICJpbXBvcnQgeyBpbml0Q2FwYWNpdG9yR2xvYmFsIH0gZnJvbSAnLi9ydW50aW1lJztcbmV4cG9ydCBjb25zdCBDYXBhY2l0b3IgPSAvKiNfX1BVUkVfXyovIGluaXRDYXBhY2l0b3JHbG9iYWwodHlwZW9mIGdsb2JhbFRoaXMgIT09ICd1bmRlZmluZWQnXG4gICAgPyBnbG9iYWxUaGlzXG4gICAgOiB0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCdcbiAgICAgICAgPyBzZWxmXG4gICAgICAgIDogdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCdcbiAgICAgICAgICAgID8gd2luZG93XG4gICAgICAgICAgICA6IHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnXG4gICAgICAgICAgICAgICAgPyBnbG9iYWxcbiAgICAgICAgICAgICAgICA6IHt9KTtcbmV4cG9ydCBjb25zdCByZWdpc3RlclBsdWdpbiA9IENhcGFjaXRvci5yZWdpc3RlclBsdWdpbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWdsb2JhbC5qcy5tYXAiLCAiaW1wb3J0IHsgQ2FwYWNpdG9yIH0gZnJvbSAnLi9nbG9iYWwnO1xuaW1wb3J0IHsgRXhjZXB0aW9uQ29kZSB9IGZyb20gJy4vdXRpbCc7XG4vKipcbiAqIEJhc2UgY2xhc3Mgd2ViIHBsdWdpbnMgc2hvdWxkIGV4dGVuZC5cbiAqL1xuZXhwb3J0IGNsYXNzIFdlYlBsdWdpbiB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMubGlzdGVuZXJzID0ge307XG4gICAgICAgIHRoaXMucmV0YWluZWRFdmVudEFyZ3VtZW50cyA9IHt9O1xuICAgICAgICB0aGlzLndpbmRvd0xpc3RlbmVycyA9IHt9O1xuICAgIH1cbiAgICBhZGRMaXN0ZW5lcihldmVudE5hbWUsIGxpc3RlbmVyRnVuYykge1xuICAgICAgICBsZXQgZmlyc3RMaXN0ZW5lciA9IGZhbHNlO1xuICAgICAgICBjb25zdCBsaXN0ZW5lcnMgPSB0aGlzLmxpc3RlbmVyc1tldmVudE5hbWVdO1xuICAgICAgICBpZiAoIWxpc3RlbmVycykge1xuICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnNbZXZlbnROYW1lXSA9IFtdO1xuICAgICAgICAgICAgZmlyc3RMaXN0ZW5lciA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5saXN0ZW5lcnNbZXZlbnROYW1lXS5wdXNoKGxpc3RlbmVyRnVuYyk7XG4gICAgICAgIC8vIElmIHdlIGhhdmVuJ3QgYWRkZWQgYSB3aW5kb3cgbGlzdGVuZXIgZm9yIHRoaXMgZXZlbnQgYW5kIGl0IHJlcXVpcmVzIG9uZSxcbiAgICAgICAgLy8gZ28gYWhlYWQgYW5kIGFkZCBpdFxuICAgICAgICBjb25zdCB3aW5kb3dMaXN0ZW5lciA9IHRoaXMud2luZG93TGlzdGVuZXJzW2V2ZW50TmFtZV07XG4gICAgICAgIGlmICh3aW5kb3dMaXN0ZW5lciAmJiAhd2luZG93TGlzdGVuZXIucmVnaXN0ZXJlZCkge1xuICAgICAgICAgICAgdGhpcy5hZGRXaW5kb3dMaXN0ZW5lcih3aW5kb3dMaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZpcnN0TGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc2VuZFJldGFpbmVkQXJndW1lbnRzRm9yRXZlbnQoZXZlbnROYW1lKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZW1vdmUgPSBhc3luYyAoKSA9PiB0aGlzLnJlbW92ZUxpc3RlbmVyKGV2ZW50TmFtZSwgbGlzdGVuZXJGdW5jKTtcbiAgICAgICAgY29uc3QgcCA9IFByb21pc2UucmVzb2x2ZSh7IHJlbW92ZSB9KTtcbiAgICAgICAgcmV0dXJuIHA7XG4gICAgfVxuICAgIGFzeW5jIHJlbW92ZUFsbExpc3RlbmVycygpIHtcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMgPSB7fTtcbiAgICAgICAgZm9yIChjb25zdCBsaXN0ZW5lciBpbiB0aGlzLndpbmRvd0xpc3RlbmVycykge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVXaW5kb3dMaXN0ZW5lcih0aGlzLndpbmRvd0xpc3RlbmVyc1tsaXN0ZW5lcl0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMud2luZG93TGlzdGVuZXJzID0ge307XG4gICAgfVxuICAgIG5vdGlmeUxpc3RlbmVycyhldmVudE5hbWUsIGRhdGEsIHJldGFpblVudGlsQ29uc3VtZWQpIHtcbiAgICAgICAgY29uc3QgbGlzdGVuZXJzID0gdGhpcy5saXN0ZW5lcnNbZXZlbnROYW1lXTtcbiAgICAgICAgaWYgKCFsaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIGlmIChyZXRhaW5VbnRpbENvbnN1bWVkKSB7XG4gICAgICAgICAgICAgICAgbGV0IGFyZ3MgPSB0aGlzLnJldGFpbmVkRXZlbnRBcmd1bWVudHNbZXZlbnROYW1lXTtcbiAgICAgICAgICAgICAgICBpZiAoIWFyZ3MpIHtcbiAgICAgICAgICAgICAgICAgICAgYXJncyA9IFtdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGF0YSk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXRhaW5lZEV2ZW50QXJndW1lbnRzW2V2ZW50TmFtZV0gPSBhcmdzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxpc3RlbmVycy5mb3JFYWNoKChsaXN0ZW5lcikgPT4gbGlzdGVuZXIoZGF0YSkpO1xuICAgIH1cbiAgICBoYXNMaXN0ZW5lcnMoZXZlbnROYW1lKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgcmV0dXJuICEhKChfYSA9IHRoaXMubGlzdGVuZXJzW2V2ZW50TmFtZV0pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5sZW5ndGgpO1xuICAgIH1cbiAgICByZWdpc3RlcldpbmRvd0xpc3RlbmVyKHdpbmRvd0V2ZW50TmFtZSwgcGx1Z2luRXZlbnROYW1lKSB7XG4gICAgICAgIHRoaXMud2luZG93TGlzdGVuZXJzW3BsdWdpbkV2ZW50TmFtZV0gPSB7XG4gICAgICAgICAgICByZWdpc3RlcmVkOiBmYWxzZSxcbiAgICAgICAgICAgIHdpbmRvd0V2ZW50TmFtZSxcbiAgICAgICAgICAgIHBsdWdpbkV2ZW50TmFtZSxcbiAgICAgICAgICAgIGhhbmRsZXI6IChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubm90aWZ5TGlzdGVuZXJzKHBsdWdpbkV2ZW50TmFtZSwgZXZlbnQpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgdW5pbXBsZW1lbnRlZChtc2cgPSAnbm90IGltcGxlbWVudGVkJykge1xuICAgICAgICByZXR1cm4gbmV3IENhcGFjaXRvci5FeGNlcHRpb24obXNnLCBFeGNlcHRpb25Db2RlLlVuaW1wbGVtZW50ZWQpO1xuICAgIH1cbiAgICB1bmF2YWlsYWJsZShtc2cgPSAnbm90IGF2YWlsYWJsZScpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBDYXBhY2l0b3IuRXhjZXB0aW9uKG1zZywgRXhjZXB0aW9uQ29kZS5VbmF2YWlsYWJsZSk7XG4gICAgfVxuICAgIGFzeW5jIHJlbW92ZUxpc3RlbmVyKGV2ZW50TmFtZSwgbGlzdGVuZXJGdW5jKSB7XG4gICAgICAgIGNvbnN0IGxpc3RlbmVycyA9IHRoaXMubGlzdGVuZXJzW2V2ZW50TmFtZV07XG4gICAgICAgIGlmICghbGlzdGVuZXJzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaW5kZXggPSBsaXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lckZ1bmMpO1xuICAgICAgICB0aGlzLmxpc3RlbmVyc1tldmVudE5hbWVdLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIC8vIElmIHRoZXJlIGFyZSBubyBtb3JlIGxpc3RlbmVycyBmb3IgdGhpcyB0eXBlIG9mIGV2ZW50LFxuICAgICAgICAvLyByZW1vdmUgdGhlIHdpbmRvdyBsaXN0ZW5lclxuICAgICAgICBpZiAoIXRoaXMubGlzdGVuZXJzW2V2ZW50TmFtZV0ubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZVdpbmRvd0xpc3RlbmVyKHRoaXMud2luZG93TGlzdGVuZXJzW2V2ZW50TmFtZV0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFkZFdpbmRvd0xpc3RlbmVyKGhhbmRsZSkge1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihoYW5kbGUud2luZG93RXZlbnROYW1lLCBoYW5kbGUuaGFuZGxlcik7XG4gICAgICAgIGhhbmRsZS5yZWdpc3RlcmVkID0gdHJ1ZTtcbiAgICB9XG4gICAgcmVtb3ZlV2luZG93TGlzdGVuZXIoaGFuZGxlKSB7XG4gICAgICAgIGlmICghaGFuZGxlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoaGFuZGxlLndpbmRvd0V2ZW50TmFtZSwgaGFuZGxlLmhhbmRsZXIpO1xuICAgICAgICBoYW5kbGUucmVnaXN0ZXJlZCA9IGZhbHNlO1xuICAgIH1cbiAgICBzZW5kUmV0YWluZWRBcmd1bWVudHNGb3JFdmVudChldmVudE5hbWUpIHtcbiAgICAgICAgY29uc3QgYXJncyA9IHRoaXMucmV0YWluZWRFdmVudEFyZ3VtZW50c1tldmVudE5hbWVdO1xuICAgICAgICBpZiAoIWFyZ3MpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBkZWxldGUgdGhpcy5yZXRhaW5lZEV2ZW50QXJndW1lbnRzW2V2ZW50TmFtZV07XG4gICAgICAgIGFyZ3MuZm9yRWFjaCgoYXJnKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm5vdGlmeUxpc3RlbmVycyhldmVudE5hbWUsIGFyZyk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXdlYi1wbHVnaW4uanMubWFwIiwgImltcG9ydCB7IHJlZ2lzdGVyUGx1Z2luIH0gZnJvbSAnLi9nbG9iYWwnO1xuaW1wb3J0IHsgV2ViUGx1Z2luIH0gZnJvbSAnLi93ZWItcGx1Z2luJztcbmV4cG9ydCBjb25zdCBXZWJWaWV3ID0gLyojX19QVVJFX18qLyByZWdpc3RlclBsdWdpbignV2ViVmlldycpO1xuLyoqKioqKioqIEVORCBXRUIgVklFVyBQTFVHSU4gKioqKioqKiovXG4vKioqKioqKiogQ09PS0lFUyBQTFVHSU4gKioqKioqKiovXG4vKipcbiAqIFNhZmVseSB3ZWIgZW5jb2RlIGEgc3RyaW5nIHZhbHVlIChpbnNwaXJlZCBieSBqcy1jb29raWUpXG4gKiBAcGFyYW0gc3RyIFRoZSBzdHJpbmcgdmFsdWUgdG8gZW5jb2RlXG4gKi9cbmNvbnN0IGVuY29kZSA9IChzdHIpID0+IGVuY29kZVVSSUNvbXBvbmVudChzdHIpXG4gICAgLnJlcGxhY2UoLyUoMlszNDZCXXw1RXw2MHw3QykvZywgZGVjb2RlVVJJQ29tcG9uZW50KVxuICAgIC5yZXBsYWNlKC9bKCldL2csIGVzY2FwZSk7XG4vKipcbiAqIFNhZmVseSB3ZWIgZGVjb2RlIGEgc3RyaW5nIHZhbHVlIChpbnNwaXJlZCBieSBqcy1jb29raWUpXG4gKiBAcGFyYW0gc3RyIFRoZSBzdHJpbmcgdmFsdWUgdG8gZGVjb2RlXG4gKi9cbmNvbnN0IGRlY29kZSA9IChzdHIpID0+IHN0ci5yZXBsYWNlKC8oJVtcXGRBLUZdezJ9KSsvZ2ksIGRlY29kZVVSSUNvbXBvbmVudCk7XG5leHBvcnQgY2xhc3MgQ2FwYWNpdG9yQ29va2llc1BsdWdpbldlYiBleHRlbmRzIFdlYlBsdWdpbiB7XG4gICAgYXN5bmMgZ2V0Q29va2llcygpIHtcbiAgICAgICAgY29uc3QgY29va2llcyA9IGRvY3VtZW50LmNvb2tpZTtcbiAgICAgICAgY29uc3QgY29va2llTWFwID0ge307XG4gICAgICAgIGNvb2tpZXMuc3BsaXQoJzsnKS5mb3JFYWNoKChjb29raWUpID0+IHtcbiAgICAgICAgICAgIGlmIChjb29raWUubGVuZ3RoIDw9IDApXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgLy8gUmVwbGFjZSBmaXJzdCBcIj1cIiB3aXRoIENBUF9DT09LSUUgdG8gcHJldmVudCBzcGxpdHRpbmcgb24gYWRkaXRpb25hbCBcIj1cIlxuICAgICAgICAgICAgbGV0IFtrZXksIHZhbHVlXSA9IGNvb2tpZS5yZXBsYWNlKC89LywgJ0NBUF9DT09LSUUnKS5zcGxpdCgnQ0FQX0NPT0tJRScpO1xuICAgICAgICAgICAga2V5ID0gZGVjb2RlKGtleSkudHJpbSgpO1xuICAgICAgICAgICAgdmFsdWUgPSBkZWNvZGUodmFsdWUpLnRyaW0oKTtcbiAgICAgICAgICAgIGNvb2tpZU1hcFtrZXldID0gdmFsdWU7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gY29va2llTWFwO1xuICAgIH1cbiAgICBhc3luYyBzZXRDb29raWUob3B0aW9ucykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gU2FmZWx5IEVuY29kZWQgS2V5L1ZhbHVlXG4gICAgICAgICAgICBjb25zdCBlbmNvZGVkS2V5ID0gZW5jb2RlKG9wdGlvbnMua2V5KTtcbiAgICAgICAgICAgIGNvbnN0IGVuY29kZWRWYWx1ZSA9IGVuY29kZShvcHRpb25zLnZhbHVlKTtcbiAgICAgICAgICAgIC8vIENsZWFuICYgc2FuaXRpemUgb3B0aW9uc1xuICAgICAgICAgICAgY29uc3QgZXhwaXJlcyA9IGA7IGV4cGlyZXM9JHsob3B0aW9ucy5leHBpcmVzIHx8ICcnKS5yZXBsYWNlKCdleHBpcmVzPScsICcnKX1gOyAvLyBEZWZhdWx0IGlzIFwiOyBleHBpcmVzPVwiXG4gICAgICAgICAgICBjb25zdCBwYXRoID0gKG9wdGlvbnMucGF0aCB8fCAnLycpLnJlcGxhY2UoJ3BhdGg9JywgJycpOyAvLyBEZWZhdWx0IGlzIFwicGF0aD0vXCJcbiAgICAgICAgICAgIGNvbnN0IGRvbWFpbiA9IG9wdGlvbnMudXJsICE9IG51bGwgJiYgb3B0aW9ucy51cmwubGVuZ3RoID4gMCA/IGBkb21haW49JHtvcHRpb25zLnVybH1gIDogJyc7XG4gICAgICAgICAgICBkb2N1bWVudC5jb29raWUgPSBgJHtlbmNvZGVkS2V5fT0ke2VuY29kZWRWYWx1ZSB8fCAnJ30ke2V4cGlyZXN9OyBwYXRoPSR7cGF0aH07ICR7ZG9tYWlufTtgO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBkZWxldGVDb29raWUob3B0aW9ucykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZG9jdW1lbnQuY29va2llID0gYCR7b3B0aW9ucy5rZXl9PTsgTWF4LUFnZT0wYDtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXN5bmMgY2xlYXJDb29raWVzKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgY29va2llcyA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdCgnOycpIHx8IFtdO1xuICAgICAgICAgICAgZm9yIChjb25zdCBjb29raWUgb2YgY29va2llcykge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGNvb2tpZS5yZXBsYWNlKC9eICsvLCAnJykucmVwbGFjZSgvPS4qLywgYD07ZXhwaXJlcz0ke25ldyBEYXRlKCkudG9VVENTdHJpbmcoKX07cGF0aD0vYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIGNsZWFyQWxsQ29va2llcygpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuY2xlYXJDb29raWVzKCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0IGNvbnN0IENhcGFjaXRvckNvb2tpZXMgPSByZWdpc3RlclBsdWdpbignQ2FwYWNpdG9yQ29va2llcycsIHtcbiAgICB3ZWI6ICgpID0+IG5ldyBDYXBhY2l0b3JDb29raWVzUGx1Z2luV2ViKCksXG59KTtcbi8vIFVUSUxJVFkgRlVOQ1RJT05TXG4vKipcbiAqIFJlYWQgaW4gYSBCbG9iIHZhbHVlIGFuZCByZXR1cm4gaXQgYXMgYSBiYXNlNjQgc3RyaW5nXG4gKiBAcGFyYW0gYmxvYiBUaGUgYmxvYiB2YWx1ZSB0byBjb252ZXJ0IHRvIGEgYmFzZTY0IHN0cmluZ1xuICovXG5leHBvcnQgY29uc3QgcmVhZEJsb2JBc0Jhc2U2NCA9IGFzeW5jIChibG9iKSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICByZWFkZXIub25sb2FkID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBiYXNlNjRTdHJpbmcgPSByZWFkZXIucmVzdWx0O1xuICAgICAgICAvLyByZW1vdmUgcHJlZml4IFwiZGF0YTphcHBsaWNhdGlvbi9wZGY7YmFzZTY0LFwiXG4gICAgICAgIHJlc29sdmUoYmFzZTY0U3RyaW5nLmluZGV4T2YoJywnKSA+PSAwID8gYmFzZTY0U3RyaW5nLnNwbGl0KCcsJylbMV0gOiBiYXNlNjRTdHJpbmcpO1xuICAgIH07XG4gICAgcmVhZGVyLm9uZXJyb3IgPSAoZXJyb3IpID0+IHJlamVjdChlcnJvcik7XG4gICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoYmxvYik7XG59KTtcbi8qKlxuICogTm9ybWFsaXplIGFuIEh0dHBIZWFkZXJzIG1hcCBieSBsb3dlcmNhc2luZyBhbGwgb2YgdGhlIHZhbHVlc1xuICogQHBhcmFtIGhlYWRlcnMgVGhlIEh0dHBIZWFkZXJzIG9iamVjdCB0byBub3JtYWxpemVcbiAqL1xuY29uc3Qgbm9ybWFsaXplSHR0cEhlYWRlcnMgPSAoaGVhZGVycyA9IHt9KSA9PiB7XG4gICAgY29uc3Qgb3JpZ2luYWxLZXlzID0gT2JqZWN0LmtleXMoaGVhZGVycyk7XG4gICAgY29uc3QgbG93ZXJlZEtleXMgPSBPYmplY3Qua2V5cyhoZWFkZXJzKS5tYXAoKGspID0+IGsudG9Mb2NhbGVMb3dlckNhc2UoKSk7XG4gICAgY29uc3Qgbm9ybWFsaXplZCA9IGxvd2VyZWRLZXlzLnJlZHVjZSgoYWNjLCBrZXksIGluZGV4KSA9PiB7XG4gICAgICAgIGFjY1trZXldID0gaGVhZGVyc1tvcmlnaW5hbEtleXNbaW5kZXhdXTtcbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB7fSk7XG4gICAgcmV0dXJuIG5vcm1hbGl6ZWQ7XG59O1xuLyoqXG4gKiBCdWlsZHMgYSBzdHJpbmcgb2YgdXJsIHBhcmFtZXRlcnMgdGhhdFxuICogQHBhcmFtIHBhcmFtcyBBIG1hcCBvZiB1cmwgcGFyYW1ldGVyc1xuICogQHBhcmFtIHNob3VsZEVuY29kZSB0cnVlIGlmIHlvdSBzaG91bGQgZW5jb2RlVVJJQ29tcG9uZW50KCkgdGhlIHZhbHVlcyAodHJ1ZSBieSBkZWZhdWx0KVxuICovXG5jb25zdCBidWlsZFVybFBhcmFtcyA9IChwYXJhbXMsIHNob3VsZEVuY29kZSA9IHRydWUpID0+IHtcbiAgICBpZiAoIXBhcmFtcylcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgY29uc3Qgb3V0cHV0ID0gT2JqZWN0LmVudHJpZXMocGFyYW1zKS5yZWR1Y2UoKGFjY3VtdWxhdG9yLCBlbnRyeSkgPT4ge1xuICAgICAgICBjb25zdCBba2V5LCB2YWx1ZV0gPSBlbnRyeTtcbiAgICAgICAgbGV0IGVuY29kZWRWYWx1ZTtcbiAgICAgICAgbGV0IGl0ZW07XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgaXRlbSA9ICcnO1xuICAgICAgICAgICAgdmFsdWUuZm9yRWFjaCgoc3RyKSA9PiB7XG4gICAgICAgICAgICAgICAgZW5jb2RlZFZhbHVlID0gc2hvdWxkRW5jb2RlID8gZW5jb2RlVVJJQ29tcG9uZW50KHN0cikgOiBzdHI7XG4gICAgICAgICAgICAgICAgaXRlbSArPSBgJHtrZXl9PSR7ZW5jb2RlZFZhbHVlfSZgO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyBsYXN0IGNoYXJhY3RlciB3aWxsIGFsd2F5cyBiZSBcIiZcIiBzbyBzbGljZSBpdCBvZmZcbiAgICAgICAgICAgIGl0ZW0uc2xpY2UoMCwgLTEpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZW5jb2RlZFZhbHVlID0gc2hvdWxkRW5jb2RlID8gZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKSA6IHZhbHVlO1xuICAgICAgICAgICAgaXRlbSA9IGAke2tleX09JHtlbmNvZGVkVmFsdWV9YDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYCR7YWNjdW11bGF0b3J9JiR7aXRlbX1gO1xuICAgIH0sICcnKTtcbiAgICAvLyBSZW1vdmUgaW5pdGlhbCBcIiZcIiBmcm9tIHRoZSByZWR1Y2VcbiAgICByZXR1cm4gb3V0cHV0LnN1YnN0cigxKTtcbn07XG4vKipcbiAqIEJ1aWxkIHRoZSBSZXF1ZXN0SW5pdCBvYmplY3QgYmFzZWQgb24gdGhlIG9wdGlvbnMgcGFzc2VkIGludG8gdGhlIGluaXRpYWwgcmVxdWVzdFxuICogQHBhcmFtIG9wdGlvbnMgVGhlIEh0dHAgcGx1Z2luIG9wdGlvbnNcbiAqIEBwYXJhbSBleHRyYSBBbnkgZXh0cmEgUmVxdWVzdEluaXQgdmFsdWVzXG4gKi9cbmV4cG9ydCBjb25zdCBidWlsZFJlcXVlc3RJbml0ID0gKG9wdGlvbnMsIGV4dHJhID0ge30pID0+IHtcbiAgICBjb25zdCBvdXRwdXQgPSBPYmplY3QuYXNzaWduKHsgbWV0aG9kOiBvcHRpb25zLm1ldGhvZCB8fCAnR0VUJywgaGVhZGVyczogb3B0aW9ucy5oZWFkZXJzIH0sIGV4dHJhKTtcbiAgICAvLyBHZXQgdGhlIGNvbnRlbnQtdHlwZVxuICAgIGNvbnN0IGhlYWRlcnMgPSBub3JtYWxpemVIdHRwSGVhZGVycyhvcHRpb25zLmhlYWRlcnMpO1xuICAgIGNvbnN0IHR5cGUgPSBoZWFkZXJzWydjb250ZW50LXR5cGUnXSB8fCAnJztcbiAgICAvLyBJZiBib2R5IGlzIGFscmVhZHkgYSBzdHJpbmcsIHRoZW4gcGFzcyBpdCB0aHJvdWdoIGFzLWlzLlxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5kYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgICBvdXRwdXQuYm9keSA9IG9wdGlvbnMuZGF0YTtcbiAgICB9XG4gICAgLy8gQnVpbGQgcmVxdWVzdCBpbml0aWFsaXplcnMgYmFzZWQgb2ZmIG9mIGNvbnRlbnQtdHlwZVxuICAgIGVsc2UgaWYgKHR5cGUuaW5jbHVkZXMoJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcpKSB7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcbiAgICAgICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMob3B0aW9ucy5kYXRhIHx8IHt9KSkge1xuICAgICAgICAgICAgcGFyYW1zLnNldChrZXksIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBvdXRwdXQuYm9keSA9IHBhcmFtcy50b1N0cmluZygpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlLmluY2x1ZGVzKCdtdWx0aXBhcnQvZm9ybS1kYXRhJykgfHwgb3B0aW9ucy5kYXRhIGluc3RhbmNlb2YgRm9ybURhdGEpIHtcbiAgICAgICAgY29uc3QgZm9ybSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgICAgICBpZiAob3B0aW9ucy5kYXRhIGluc3RhbmNlb2YgRm9ybURhdGEpIHtcbiAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgZm9ybS5hcHBlbmQoa2V5LCB2YWx1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKG9wdGlvbnMuZGF0YSkpIHtcbiAgICAgICAgICAgICAgICBmb3JtLmFwcGVuZChrZXksIG9wdGlvbnMuZGF0YVtrZXldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBvdXRwdXQuYm9keSA9IGZvcm07XG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyhvdXRwdXQuaGVhZGVycyk7XG4gICAgICAgIGhlYWRlcnMuZGVsZXRlKCdjb250ZW50LXR5cGUnKTsgLy8gY29udGVudC10eXBlIHdpbGwgYmUgc2V0IGJ5IGB3aW5kb3cuZmV0Y2hgIHRvIGluY2x1ZHkgYm91bmRhcnlcbiAgICAgICAgb3V0cHV0LmhlYWRlcnMgPSBoZWFkZXJzO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlLmluY2x1ZGVzKCdhcHBsaWNhdGlvbi9qc29uJykgfHwgdHlwZW9mIG9wdGlvbnMuZGF0YSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgb3V0cHV0LmJvZHkgPSBKU09OLnN0cmluZ2lmeShvcHRpb25zLmRhdGEpO1xuICAgIH1cbiAgICByZXR1cm4gb3V0cHV0O1xufTtcbi8vIFdFQiBJTVBMRU1FTlRBVElPTlxuZXhwb3J0IGNsYXNzIENhcGFjaXRvckh0dHBQbHVnaW5XZWIgZXh0ZW5kcyBXZWJQbHVnaW4ge1xuICAgIC8qKlxuICAgICAqIFBlcmZvcm0gYW4gSHR0cCByZXF1ZXN0IGdpdmVuIGEgc2V0IG9mIG9wdGlvbnNcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zIHRvIGJ1aWxkIHRoZSBIVFRQIHJlcXVlc3RcbiAgICAgKi9cbiAgICBhc3luYyByZXF1ZXN0KG9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgcmVxdWVzdEluaXQgPSBidWlsZFJlcXVlc3RJbml0KG9wdGlvbnMsIG9wdGlvbnMud2ViRmV0Y2hFeHRyYSk7XG4gICAgICAgIGNvbnN0IHVybFBhcmFtcyA9IGJ1aWxkVXJsUGFyYW1zKG9wdGlvbnMucGFyYW1zLCBvcHRpb25zLnNob3VsZEVuY29kZVVybFBhcmFtcyk7XG4gICAgICAgIGNvbnN0IHVybCA9IHVybFBhcmFtcyA/IGAke29wdGlvbnMudXJsfT8ke3VybFBhcmFtc31gIDogb3B0aW9ucy51cmw7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCByZXF1ZXN0SW5pdCk7XG4gICAgICAgIGNvbnN0IGNvbnRlbnRUeXBlID0gcmVzcG9uc2UuaGVhZGVycy5nZXQoJ2NvbnRlbnQtdHlwZScpIHx8ICcnO1xuICAgICAgICAvLyBEZWZhdWx0IHRvICd0ZXh0JyByZXNwb25zZVR5cGUgc28gbm8gcGFyc2luZyBoYXBwZW5zXG4gICAgICAgIGxldCB7IHJlc3BvbnNlVHlwZSA9ICd0ZXh0JyB9ID0gcmVzcG9uc2Uub2sgPyBvcHRpb25zIDoge307XG4gICAgICAgIC8vIElmIHRoZSByZXNwb25zZSBjb250ZW50LXR5cGUgaXMganNvbiwgZm9yY2UgdGhlIHJlc3BvbnNlIHRvIGJlIGpzb25cbiAgICAgICAgaWYgKGNvbnRlbnRUeXBlLmluY2x1ZGVzKCdhcHBsaWNhdGlvbi9qc29uJykpIHtcbiAgICAgICAgICAgIHJlc3BvbnNlVHlwZSA9ICdqc29uJztcbiAgICAgICAgfVxuICAgICAgICBsZXQgZGF0YTtcbiAgICAgICAgbGV0IGJsb2I7XG4gICAgICAgIHN3aXRjaCAocmVzcG9uc2VUeXBlKSB7XG4gICAgICAgICAgICBjYXNlICdhcnJheWJ1ZmZlcic6XG4gICAgICAgICAgICBjYXNlICdibG9iJzpcbiAgICAgICAgICAgICAgICBibG9iID0gYXdhaXQgcmVzcG9uc2UuYmxvYigpO1xuICAgICAgICAgICAgICAgIGRhdGEgPSBhd2FpdCByZWFkQmxvYkFzQmFzZTY0KGJsb2IpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnanNvbic6XG4gICAgICAgICAgICAgICAgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2RvY3VtZW50JzpcbiAgICAgICAgICAgIGNhc2UgJ3RleHQnOlxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBkYXRhID0gYXdhaXQgcmVzcG9uc2UudGV4dCgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIENvbnZlcnQgZmV0Y2ggaGVhZGVycyB0byBDYXBhY2l0b3IgSHR0cEhlYWRlcnNcbiAgICAgICAgY29uc3QgaGVhZGVycyA9IHt9O1xuICAgICAgICByZXNwb25zZS5oZWFkZXJzLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgIGhlYWRlcnNba2V5XSA9IHZhbHVlO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRhdGEsXG4gICAgICAgICAgICBoZWFkZXJzLFxuICAgICAgICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAgICAgICB1cmw6IHJlc3BvbnNlLnVybCxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUGVyZm9ybSBhbiBIdHRwIEdFVCByZXF1ZXN0IGdpdmVuIGEgc2V0IG9mIG9wdGlvbnNcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zIHRvIGJ1aWxkIHRoZSBIVFRQIHJlcXVlc3RcbiAgICAgKi9cbiAgICBhc3luYyBnZXQob3B0aW9ucykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucyksIHsgbWV0aG9kOiAnR0VUJyB9KSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBlcmZvcm0gYW4gSHR0cCBQT1NUIHJlcXVlc3QgZ2l2ZW4gYSBzZXQgb2Ygb3B0aW9uc1xuICAgICAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbnMgdG8gYnVpbGQgdGhlIEhUVFAgcmVxdWVzdFxuICAgICAqL1xuICAgIGFzeW5jIHBvc3Qob3B0aW9ucykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucyksIHsgbWV0aG9kOiAnUE9TVCcgfSkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtIGFuIEh0dHAgUFVUIHJlcXVlc3QgZ2l2ZW4gYSBzZXQgb2Ygb3B0aW9uc1xuICAgICAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbnMgdG8gYnVpbGQgdGhlIEhUVFAgcmVxdWVzdFxuICAgICAqL1xuICAgIGFzeW5jIHB1dChvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zKSwgeyBtZXRob2Q6ICdQVVQnIH0pKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUGVyZm9ybSBhbiBIdHRwIFBBVENIIHJlcXVlc3QgZ2l2ZW4gYSBzZXQgb2Ygb3B0aW9uc1xuICAgICAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbnMgdG8gYnVpbGQgdGhlIEhUVFAgcmVxdWVzdFxuICAgICAqL1xuICAgIGFzeW5jIHBhdGNoKG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdChPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMpLCB7IG1ldGhvZDogJ1BBVENIJyB9KSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBlcmZvcm0gYW4gSHR0cCBERUxFVEUgcmVxdWVzdCBnaXZlbiBhIHNldCBvZiBvcHRpb25zXG4gICAgICogQHBhcmFtIG9wdGlvbnMgT3B0aW9ucyB0byBidWlsZCB0aGUgSFRUUCByZXF1ZXN0XG4gICAgICovXG4gICAgYXN5bmMgZGVsZXRlKG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdChPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMpLCB7IG1ldGhvZDogJ0RFTEVURScgfSkpO1xuICAgIH1cbn1cbmV4cG9ydCBjb25zdCBDYXBhY2l0b3JIdHRwID0gcmVnaXN0ZXJQbHVnaW4oJ0NhcGFjaXRvckh0dHAnLCB7XG4gICAgd2ViOiAoKSA9PiBuZXcgQ2FwYWNpdG9ySHR0cFBsdWdpbldlYigpLFxufSk7XG4vKioqKioqKiogRU5EIEhUVFAgUExVR0lOICoqKioqKioqL1xuLyoqKioqKioqIFNZU1RFTSBCQVJTIFBMVUdJTiAqKioqKioqKi9cbi8qKlxuICogQXZhaWxhYmxlIHN0YXR1cyBiYXIgc3R5bGVzLlxuICovXG5leHBvcnQgdmFyIFN5c3RlbUJhcnNTdHlsZTtcbihmdW5jdGlvbiAoU3lzdGVtQmFyc1N0eWxlKSB7XG4gICAgLyoqXG4gICAgICogTGlnaHQgc3lzdGVtIGJhciBjb250ZW50IG9uIGEgZGFyayBiYWNrZ3JvdW5kLlxuICAgICAqXG4gICAgICogQHNpbmNlIDguMC4wXG4gICAgICovXG4gICAgU3lzdGVtQmFyc1N0eWxlW1wiRGFya1wiXSA9IFwiREFSS1wiO1xuICAgIC8qKlxuICAgICAqIEZvciBkYXJrIHN5c3RlbSBiYXIgY29udGVudCBvbiBhIGxpZ2h0IGJhY2tncm91bmQuXG4gICAgICpcbiAgICAgKiBAc2luY2UgOC4wLjBcbiAgICAgKi9cbiAgICBTeXN0ZW1CYXJzU3R5bGVbXCJMaWdodFwiXSA9IFwiTElHSFRcIjtcbiAgICAvKipcbiAgICAgKiBUaGUgc3R5bGUgaXMgYmFzZWQgb24gdGhlIGRldmljZSBhcHBlYXJhbmNlIG9yIHRoZSB1bmRlcmx5aW5nIGNvbnRlbnQuXG4gICAgICogSWYgdGhlIGRldmljZSBpcyB1c2luZyBEYXJrIG1vZGUsIHRoZSBzeXN0ZW0gYmFycyBjb250ZW50IHdpbGwgYmUgbGlnaHQuXG4gICAgICogSWYgdGhlIGRldmljZSBpcyB1c2luZyBMaWdodCBtb2RlLCB0aGUgc3lzdGVtIGJhcnMgY29udGVudCB3aWxsIGJlIGRhcmsuXG4gICAgICpcbiAgICAgKiBAc2luY2UgOC4wLjBcbiAgICAgKi9cbiAgICBTeXN0ZW1CYXJzU3R5bGVbXCJEZWZhdWx0XCJdID0gXCJERUZBVUxUXCI7XG59KShTeXN0ZW1CYXJzU3R5bGUgfHwgKFN5c3RlbUJhcnNTdHlsZSA9IHt9KSk7XG4vKipcbiAqIEF2YWlsYWJsZSBzeXN0ZW0gYmFyIHR5cGVzLlxuICovXG5leHBvcnQgdmFyIFN5c3RlbUJhclR5cGU7XG4oZnVuY3Rpb24gKFN5c3RlbUJhclR5cGUpIHtcbiAgICAvKipcbiAgICAgKiBUaGUgdG9wIHN0YXR1cyBiYXIgb24gYm90aCBBbmRyb2lkIGFuZCBpT1MuXG4gICAgICpcbiAgICAgKiBAc2luY2UgOC4wLjBcbiAgICAgKi9cbiAgICBTeXN0ZW1CYXJUeXBlW1wiU3RhdHVzQmFyXCJdID0gXCJTdGF0dXNCYXJcIjtcbiAgICAvKipcbiAgICAgKiBUaGUgbmF2aWdhdGlvbiBiYXIgKG9yIGdlc3R1cmUgYmFyIG9uIGlPUykgb24gYm90aCBBbmRyb2lkIGFuZCBpT1MuXG4gICAgICpcbiAgICAgKiBAc2luY2UgOC4wLjBcbiAgICAgKi9cbiAgICBTeXN0ZW1CYXJUeXBlW1wiTmF2aWdhdGlvbkJhclwiXSA9IFwiTmF2aWdhdGlvbkJhclwiO1xufSkoU3lzdGVtQmFyVHlwZSB8fCAoU3lzdGVtQmFyVHlwZSA9IHt9KSk7XG5leHBvcnQgY2xhc3MgU3lzdGVtQmFyc1BsdWdpbldlYiBleHRlbmRzIFdlYlBsdWdpbiB7XG4gICAgYXN5bmMgc2V0U3R5bGUoKSB7XG4gICAgICAgIHRoaXMudW5hdmFpbGFibGUoJ25vdCBhdmFpbGFibGUgZm9yIHdlYicpO1xuICAgIH1cbiAgICBhc3luYyBzZXRBbmltYXRpb24oKSB7XG4gICAgICAgIHRoaXMudW5hdmFpbGFibGUoJ25vdCBhdmFpbGFibGUgZm9yIHdlYicpO1xuICAgIH1cbiAgICBhc3luYyBzaG93KCkge1xuICAgICAgICB0aGlzLnVuYXZhaWxhYmxlKCdub3QgYXZhaWxhYmxlIGZvciB3ZWInKTtcbiAgICB9XG4gICAgYXN5bmMgaGlkZSgpIHtcbiAgICAgICAgdGhpcy51bmF2YWlsYWJsZSgnbm90IGF2YWlsYWJsZSBmb3Igd2ViJyk7XG4gICAgfVxufVxuZXhwb3J0IGNvbnN0IFN5c3RlbUJhcnMgPSByZWdpc3RlclBsdWdpbignU3lzdGVtQmFycycsIHtcbiAgICB3ZWI6ICgpID0+IG5ldyBTeXN0ZW1CYXJzUGx1Z2luV2ViKCksXG59KTtcbi8qKioqKioqKiBFTkQgU1lTVEVNIEJBUlMgUExVR0lOICoqKioqKioqL1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29yZS1wbHVnaW5zLmpzLm1hcCIsICJpbXBvcnQgdHlwZSB7IEh0dHBPcHRpb25zLCBQZXJtaXNzaW9uU3RhdGUsIFBsdWdpbkxpc3RlbmVySGFuZGxlIH0gZnJvbSAnQGNhcGFjaXRvci9jb3JlJztcblxuZXhwb3J0IHR5cGUgQ2FsbGJhY2tJRCA9IHN0cmluZztcblxuZXhwb3J0IGludGVyZmFjZSBQZXJtaXNzaW9uU3RhdHVzIHtcbiAgcHVibGljU3RvcmFnZTogUGVybWlzc2lvblN0YXRlO1xufVxuXG5leHBvcnQgZW51bSBEaXJlY3Rvcnkge1xuICAvKipcbiAgICogVGhlIERvY3VtZW50cyBkaXJlY3RvcnkuXG4gICAqIE9uIGlPUyBpdCdzIHRoZSBhcHAncyBkb2N1bWVudHMgZGlyZWN0b3J5LlxuICAgKiBVc2UgdGhpcyBkaXJlY3RvcnkgdG8gc3RvcmUgdXNlci1nZW5lcmF0ZWQgY29udGVudC5cbiAgICogT24gQW5kcm9pZCBpdCdzIHRoZSBQdWJsaWMgRG9jdW1lbnRzIGZvbGRlciwgc28gaXQncyBhY2Nlc3NpYmxlIGZyb20gb3RoZXIgYXBwcy5cbiAgICogSXQncyBub3QgYWNjZXNzaWJsZSBvbiBBbmRyb2lkIDEwIHVubGVzcyB0aGUgYXBwIGVuYWJsZXMgbGVnYWN5IEV4dGVybmFsIFN0b3JhZ2VcbiAgICogYnkgYWRkaW5nIGBhbmRyb2lkOnJlcXVlc3RMZWdhY3lFeHRlcm5hbFN0b3JhZ2U9XCJ0cnVlXCJgIGluIHRoZSBgYXBwbGljYXRpb25gIHRhZ1xuICAgKiBpbiB0aGUgYEFuZHJvaWRNYW5pZmVzdC54bWxgLlxuICAgKiBPbiBBbmRyb2lkIDExIG9yIG5ld2VyIHRoZSBhcHAgY2FuIG9ubHkgYWNjZXNzIHRoZSBmaWxlcy9mb2xkZXJzIHRoZSBhcHAgY3JlYXRlZC5cbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICBEb2N1bWVudHMgPSAnRE9DVU1FTlRTJyxcblxuICAvKipcbiAgICogVGhlIERhdGEgZGlyZWN0b3J5LlxuICAgKiBPbiBpT1MgaXQgd2lsbCB1c2UgdGhlIERvY3VtZW50cyBkaXJlY3RvcnkuXG4gICAqIE9uIEFuZHJvaWQgaXQncyB0aGUgZGlyZWN0b3J5IGhvbGRpbmcgYXBwbGljYXRpb24gZmlsZXMuXG4gICAqIEZpbGVzIHdpbGwgYmUgZGVsZXRlZCB3aGVuIHRoZSBhcHBsaWNhdGlvbiBpcyB1bmluc3RhbGxlZC5cbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICBEYXRhID0gJ0RBVEEnLFxuXG4gIC8qKlxuICAgKiBUaGUgTGlicmFyeSBkaXJlY3RvcnkuXG4gICAqIE9uIGlPUyBpdCB3aWxsIHVzZSB0aGUgTGlicmFyeSBkaXJlY3RvcnkuXG4gICAqIE9uIEFuZHJvaWQgaXQncyB0aGUgZGlyZWN0b3J5IGhvbGRpbmcgYXBwbGljYXRpb24gZmlsZXMuXG4gICAqIEZpbGVzIHdpbGwgYmUgZGVsZXRlZCB3aGVuIHRoZSBhcHBsaWNhdGlvbiBpcyB1bmluc3RhbGxlZC5cbiAgICpcbiAgICogQHNpbmNlIDEuMS4wXG4gICAqL1xuICBMaWJyYXJ5ID0gJ0xJQlJBUlknLFxuXG4gIC8qKlxuICAgKiBUaGUgQ2FjaGUgZGlyZWN0b3J5LlxuICAgKiBDYW4gYmUgZGVsZXRlZCBpbiBjYXNlcyBvZiBsb3cgbWVtb3J5LCBzbyB1c2UgdGhpcyBkaXJlY3RvcnkgdG8gd3JpdGUgYXBwLXNwZWNpZmljIGZpbGVzLlxuICAgKiB0aGF0IHlvdXIgYXBwIGNhbiByZS1jcmVhdGUgZWFzaWx5LlxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIENhY2hlID0gJ0NBQ0hFJyxcblxuICAvKipcbiAgICogVGhlIGV4dGVybmFsIGRpcmVjdG9yeS5cbiAgICogT24gaU9TIGl0IHdpbGwgdXNlIHRoZSBEb2N1bWVudHMgZGlyZWN0b3J5LlxuICAgKiBPbiBBbmRyb2lkIGl0J3MgdGhlIGRpcmVjdG9yeSBvbiB0aGUgcHJpbWFyeSBzaGFyZWQvZXh0ZXJuYWxcbiAgICogc3RvcmFnZSBkZXZpY2Ugd2hlcmUgdGhlIGFwcGxpY2F0aW9uIGNhbiBwbGFjZSBwZXJzaXN0ZW50IGZpbGVzIGl0IG93bnMuXG4gICAqIFRoZXNlIGZpbGVzIGFyZSBpbnRlcm5hbCB0byB0aGUgYXBwbGljYXRpb25zLCBhbmQgbm90IHR5cGljYWxseSB2aXNpYmxlXG4gICAqIHRvIHRoZSB1c2VyIGFzIG1lZGlhLlxuICAgKiBGaWxlcyB3aWxsIGJlIGRlbGV0ZWQgd2hlbiB0aGUgYXBwbGljYXRpb24gaXMgdW5pbnN0YWxsZWQuXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgRXh0ZXJuYWwgPSAnRVhURVJOQUwnLFxuXG4gIC8qKlxuICAgKiBUaGUgZXh0ZXJuYWwgc3RvcmFnZSBkaXJlY3RvcnkuXG4gICAqIE9uIGlPUyBpdCB3aWxsIHVzZSB0aGUgRG9jdW1lbnRzIGRpcmVjdG9yeS5cbiAgICogT24gQW5kcm9pZCBpdCdzIHRoZSBwcmltYXJ5IHNoYXJlZC9leHRlcm5hbCBzdG9yYWdlIGRpcmVjdG9yeS5cbiAgICogSXQncyBub3QgYWNjZXNzaWJsZSBvbiBBbmRyb2lkIDEwIHVubGVzcyB0aGUgYXBwIGVuYWJsZXMgbGVnYWN5IEV4dGVybmFsIFN0b3JhZ2VcbiAgICogYnkgYWRkaW5nIGBhbmRyb2lkOnJlcXVlc3RMZWdhY3lFeHRlcm5hbFN0b3JhZ2U9XCJ0cnVlXCJgIGluIHRoZSBgYXBwbGljYXRpb25gIHRhZ1xuICAgKiBpbiB0aGUgYEFuZHJvaWRNYW5pZmVzdC54bWxgLlxuICAgKiBJdCdzIG5vdCBhY2Nlc3NpYmxlIG9uIEFuZHJvaWQgMTEgb3IgbmV3ZXIuXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cblxuICBFeHRlcm5hbFN0b3JhZ2UgPSAnRVhURVJOQUxfU1RPUkFHRScsXG4gIC8qKlxuICAgKiBUaGUgZXh0ZXJuYWwgY2FjaGUgZGlyZWN0b3J5LlxuICAgKiBPbiBpT1MgaXQgd2lsbCB1c2UgdGhlIERvY3VtZW50cyBkaXJlY3RvcnkuXG4gICAqIE9uIEFuZHJvaWQgaXQncyB0aGUgcHJpbWFyeSBzaGFyZWQvZXh0ZXJuYWwgY2FjaGUuXG4gICAqXG4gICAqIEBzaW5jZSA3LjEuMFxuICAgKi9cbiAgRXh0ZXJuYWxDYWNoZSA9ICdFWFRFUk5BTF9DQUNIRScsXG5cbiAgLyoqXG4gICAqIFRoZSBMaWJyYXJ5IGRpcmVjdG9yeSB3aXRob3V0IGNsb3VkIGJhY2t1cC4gVXNlZCBpbiBpT1MuXG4gICAqIE9uIEFuZHJvaWQgaXQncyB0aGUgZGlyZWN0b3J5IGhvbGRpbmcgYXBwbGljYXRpb24gZmlsZXMuXG4gICAqXG4gICAqIEBzaW5jZSA3LjEuMFxuICAgKi9cbiAgTGlicmFyeU5vQ2xvdWQgPSAnTElCUkFSWV9OT19DTE9VRCcsXG5cbiAgLyoqXG4gICAqIEEgdGVtcG9yYXJ5IGRpcmVjdG9yeSBmb3IgaU9TLlxuICAgKiBPbiBBbmRyb2lkIGl0J3MgdGhlIGRpcmVjdG9yeSBob2xkaW5nIHRoZSBhcHBsaWNhdGlvbiBjYWNoZS5cbiAgICpcbiAgICogQHNpbmNlIDcuMS4wXG4gICAqL1xuICBUZW1wb3JhcnkgPSAnVEVNUE9SQVJZJyxcbn1cblxuZXhwb3J0IGVudW0gRW5jb2Rpbmcge1xuICAvKipcbiAgICogRWlnaHQtYml0IFVDUyBUcmFuc2Zvcm1hdGlvbiBGb3JtYXRcbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICBVVEY4ID0gJ3V0ZjgnLFxuXG4gIC8qKlxuICAgKiBTZXZlbi1iaXQgQVNDSUksIGEuay5hLiBJU082NDYtVVMsIGEuay5hLiB0aGUgQmFzaWMgTGF0aW4gYmxvY2sgb2YgdGhlXG4gICAqIFVuaWNvZGUgY2hhcmFjdGVyIHNldFxuICAgKiBUaGlzIGVuY29kaW5nIGlzIG9ubHkgc3VwcG9ydGVkIG9uIEFuZHJvaWQuXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgQVNDSUkgPSAnYXNjaWknLFxuXG4gIC8qKlxuICAgKiBTaXh0ZWVuLWJpdCBVQ1MgVHJhbnNmb3JtYXRpb24gRm9ybWF0LCBieXRlIG9yZGVyIGlkZW50aWZpZWQgYnkgYW5cbiAgICogb3B0aW9uYWwgYnl0ZS1vcmRlciBtYXJrXG4gICAqIFRoaXMgZW5jb2RpbmcgaXMgb25seSBzdXBwb3J0ZWQgb24gQW5kcm9pZC5cbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICBVVEYxNiA9ICd1dGYxNicsXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgV3JpdGVGaWxlT3B0aW9ucyB7XG4gIC8qKlxuICAgKiBUaGUgcGF0aCBvZiB0aGUgZmlsZSB0byB3cml0ZVxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIHBhdGg6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIGRhdGEgdG8gd3JpdGVcbiAgICpcbiAgICogTm90ZTogQmxvYiBkYXRhIGlzIG9ubHkgc3VwcG9ydGVkIG9uIFdlYi5cbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICBkYXRhOiBzdHJpbmcgfCBCbG9iO1xuXG4gIC8qKlxuICAgKiBUaGUgYERpcmVjdG9yeWAgdG8gc3RvcmUgdGhlIGZpbGUgaW5cbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICBkaXJlY3Rvcnk/OiBEaXJlY3Rvcnk7XG5cbiAgLyoqXG4gICAqIFRoZSBlbmNvZGluZyB0byB3cml0ZSB0aGUgZmlsZSBpbi4gSWYgbm90IHByb3ZpZGVkLCBkYXRhXG4gICAqIGlzIHdyaXR0ZW4gYXMgYmFzZTY0IGVuY29kZWQuXG4gICAqXG4gICAqIFBhc3MgRW5jb2RpbmcuVVRGOCB0byB3cml0ZSBkYXRhIGFzIHN0cmluZ1xuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIGVuY29kaW5nPzogRW5jb2Rpbmc7XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdG8gY3JlYXRlIGFueSBtaXNzaW5nIHBhcmVudCBkaXJlY3Rvcmllcy5cbiAgICpcbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICByZWN1cnNpdmU/OiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEFwcGVuZEZpbGVPcHRpb25zIHtcbiAgLyoqXG4gICAqIFRoZSBwYXRoIG9mIHRoZSBmaWxlIHRvIGFwcGVuZFxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIHBhdGg6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIGRhdGEgdG8gd3JpdGVcbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICBkYXRhOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBgRGlyZWN0b3J5YCB0byBzdG9yZSB0aGUgZmlsZSBpblxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIGRpcmVjdG9yeT86IERpcmVjdG9yeTtcblxuICAvKipcbiAgICogVGhlIGVuY29kaW5nIHRvIHdyaXRlIHRoZSBmaWxlIGluLiBJZiBub3QgcHJvdmlkZWQsIGRhdGFcbiAgICogaXMgd3JpdHRlbiBhcyBiYXNlNjQgZW5jb2RlZC5cbiAgICpcbiAgICogUGFzcyBFbmNvZGluZy5VVEY4IHRvIHdyaXRlIGRhdGEgYXMgc3RyaW5nXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgZW5jb2Rpbmc/OiBFbmNvZGluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZWFkRmlsZU9wdGlvbnMge1xuICAvKipcbiAgICogVGhlIHBhdGggb2YgdGhlIGZpbGUgdG8gcmVhZFxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIHBhdGg6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIGBEaXJlY3RvcnlgIHRvIHJlYWQgdGhlIGZpbGUgZnJvbVxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIGRpcmVjdG9yeT86IERpcmVjdG9yeTtcblxuICAvKipcbiAgICogVGhlIGVuY29kaW5nIHRvIHJlYWQgdGhlIGZpbGUgaW4sIGlmIG5vdCBwcm92aWRlZCwgZGF0YVxuICAgKiBpcyByZWFkIGFzIGJpbmFyeSBhbmQgcmV0dXJuZWQgYXMgYmFzZTY0IGVuY29kZWQuXG4gICAqXG4gICAqIFBhc3MgRW5jb2RpbmcuVVRGOCB0byByZWFkIGRhdGEgYXMgc3RyaW5nXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgZW5jb2Rpbmc/OiBFbmNvZGluZztcblxuICAvKipcbiAgICogVGhlIG9mZnNldCB0byBzdGFydCByZWFkaW5nIHRoZSBmaWxlIGZyb20sIGluIGJ5dGVzLlxuICAgKiBOYXRpdmUgb25seSAobm90IGF2YWlsYWJsZSBpbiB3ZWIpLlxuICAgKiBDYW4gYmUgdXNlZCBpbiBjb25qdW5jdGlvbiB3aXRoIGxlbmd0aCB0byBwYXJ0aWFsbHkgcmVhZCBmaWxlcy5cbiAgICpcbiAgICogQHNpbmNlIDguMS4wXG4gICAqIEBkZWZhdWx0IDBcbiAgICovXG4gIG9mZnNldD86IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIGxlbmd0aCBvZiBkYXRhIHRvIHJlYWQsIGluIGJ5dGVzLlxuICAgKiBBbnkgbm9uLXBvc2l0aXZlIHZhbHVlIG1lYW5zIHRvIHJlYWQgdG8gdGhlIGVuZCBvZiB0aGUgZmlsZS5cbiAgICogTmF0aXZlIG9ubHkgKG5vdCBhdmFpbGFibGUgaW4gd2ViKS5cbiAgICogQ2FuIGJlIHVzZWQgaW4gY29uanVuY3Rpb24gd2l0aCBvZmZzZXQgdG8gcGFydGlhbGx5IHJlYWQgZmlsZXMuXG4gICAqXG4gICAqIEBzaW5jZSA4LjEuMFxuICAgKiBAZGVmYXVsdCAtMVxuICAgKi9cbiAgbGVuZ3RoPzogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJlYWRGaWxlSW5DaHVua3NPcHRpb25zIGV4dGVuZHMgUmVhZEZpbGVPcHRpb25zIHtcbiAgLyoqXG4gICAqIFNpemUgb2YgdGhlIGNodW5rcyBpbiBieXRlcy5cbiAgICpcbiAgICogQHNpbmNlIDcuMS4wXG4gICAqL1xuICBjaHVua1NpemU6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEZWxldGVGaWxlT3B0aW9ucyB7XG4gIC8qKlxuICAgKiBUaGUgcGF0aCBvZiB0aGUgZmlsZSB0byBkZWxldGVcbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICBwYXRoOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBgRGlyZWN0b3J5YCB0byBkZWxldGUgdGhlIGZpbGUgZnJvbVxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIGRpcmVjdG9yeT86IERpcmVjdG9yeTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBNa2Rpck9wdGlvbnMge1xuICAvKipcbiAgICogVGhlIHBhdGggb2YgdGhlIG5ldyBkaXJlY3RvcnlcbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICBwYXRoOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBgRGlyZWN0b3J5YCB0byBtYWtlIHRoZSBuZXcgZGlyZWN0b3J5IGluXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgZGlyZWN0b3J5PzogRGlyZWN0b3J5O1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRvIGNyZWF0ZSBhbnkgbWlzc2luZyBwYXJlbnQgZGlyZWN0b3JpZXMgYXMgd2VsbC5cbiAgICpcbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICByZWN1cnNpdmU/OiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJtZGlyT3B0aW9ucyB7XG4gIC8qKlxuICAgKiBUaGUgcGF0aCBvZiB0aGUgZGlyZWN0b3J5IHRvIHJlbW92ZVxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIHBhdGg6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIGBEaXJlY3RvcnlgIHRvIHJlbW92ZSB0aGUgZGlyZWN0b3J5IGZyb21cbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICBkaXJlY3Rvcnk/OiBEaXJlY3Rvcnk7XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdG8gcmVjdXJzaXZlbHkgcmVtb3ZlIHRoZSBjb250ZW50cyBvZiB0aGUgZGlyZWN0b3J5XG4gICAqXG4gICAqIEBkZWZhdWx0IGZhbHNlXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgcmVjdXJzaXZlPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZWFkZGlyT3B0aW9ucyB7XG4gIC8qKlxuICAgKiBUaGUgcGF0aCBvZiB0aGUgZGlyZWN0b3J5IHRvIHJlYWRcbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICBwYXRoOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBgRGlyZWN0b3J5YCB0byBsaXN0IGZpbGVzIGZyb21cbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICBkaXJlY3Rvcnk/OiBEaXJlY3Rvcnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgR2V0VXJpT3B0aW9ucyB7XG4gIC8qKlxuICAgKiBUaGUgcGF0aCBvZiB0aGUgZmlsZSB0byBnZXQgdGhlIFVSSSBmb3JcbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICBwYXRoOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBgRGlyZWN0b3J5YCB0byBnZXQgdGhlIGZpbGUgdW5kZXJcbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICBkaXJlY3Rvcnk6IERpcmVjdG9yeTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTdGF0T3B0aW9ucyB7XG4gIC8qKlxuICAgKiBUaGUgcGF0aCBvZiB0aGUgZmlsZSB0byBnZXQgZGF0YSBhYm91dFxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIHBhdGg6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIGBEaXJlY3RvcnlgIHRvIGdldCB0aGUgZmlsZSB1bmRlclxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIGRpcmVjdG9yeT86IERpcmVjdG9yeTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDb3B5T3B0aW9ucyB7XG4gIC8qKlxuICAgKiBUaGUgZXhpc3RpbmcgZmlsZSBvciBkaXJlY3RvcnlcbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICBmcm9tOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBkZXN0aW5hdGlvbiBmaWxlIG9yIGRpcmVjdG9yeVxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIHRvOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBgRGlyZWN0b3J5YCBjb250YWluaW5nIHRoZSBleGlzdGluZyBmaWxlIG9yIGRpcmVjdG9yeVxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIGRpcmVjdG9yeT86IERpcmVjdG9yeTtcblxuICAvKipcbiAgICogVGhlIGBEaXJlY3RvcnlgIGNvbnRhaW5pbmcgdGhlIGRlc3RpbmF0aW9uIGZpbGUgb3IgZGlyZWN0b3J5LiBJZiBub3Qgc3VwcGxpZWQgd2lsbCB1c2UgdGhlICdkaXJlY3RvcnknXG4gICAqIHBhcmFtZXRlciBhcyB0aGUgZGVzdGluYXRpb25cbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICB0b0RpcmVjdG9yeT86IERpcmVjdG9yeTtcbn1cblxuZXhwb3J0IHR5cGUgUmVuYW1lT3B0aW9ucyA9IENvcHlPcHRpb25zO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJlYWRGaWxlUmVzdWx0IHtcbiAgLyoqXG4gICAqIFRoZSByZXByZXNlbnRhdGlvbiBvZiB0aGUgZGF0YSBjb250YWluZWQgaW4gdGhlIGZpbGVcbiAgICpcbiAgICogTm90ZTogQmxvYiBpcyBvbmx5IGF2YWlsYWJsZSBvbiBXZWIuIE9uIG5hdGl2ZSwgdGhlIGRhdGEgaXMgcmV0dXJuZWQgYXMgYSBzdHJpbmcuXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgZGF0YTogc3RyaW5nIHwgQmxvYjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBXcml0ZUZpbGVSZXN1bHQge1xuICAvKipcbiAgICogVGhlIHVyaSB3aGVyZSB0aGUgZmlsZSB3YXMgd3JpdHRlbiBpbnRvXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgdXJpOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVhZGRpclJlc3VsdCB7XG4gIC8qKlxuICAgKiBMaXN0IG9mIGZpbGVzIGFuZCBkaXJlY3RvcmllcyBpbnNpZGUgdGhlIGRpcmVjdG9yeVxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIGZpbGVzOiBGaWxlSW5mb1tdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZpbGVJbmZvIHtcbiAgLyoqXG4gICAqIE5hbWUgb2YgdGhlIGZpbGUgb3IgZGlyZWN0b3J5LlxuICAgKlxuICAgKiBAc2luY2UgNy4xLjBcbiAgICovXG4gIG5hbWU6IHN0cmluZztcblxuICAvKipcbiAgICogVHlwZSBvZiB0aGUgZmlsZS5cbiAgICpcbiAgICogQHNpbmNlIDQuMC4wXG4gICAqL1xuICB0eXBlOiAnZGlyZWN0b3J5JyB8ICdmaWxlJztcblxuICAvKipcbiAgICogU2l6ZSBvZiB0aGUgZmlsZSBpbiBieXRlcy5cbiAgICpcbiAgICogQHNpbmNlIDQuMC4wXG4gICAqL1xuICBzaXplOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRpbWUgb2YgY3JlYXRpb24gaW4gbWlsbGlzZWNvbmRzLlxuICAgKlxuICAgKiBJdCdzIG5vdCBhdmFpbGFibGUgb24gQW5kcm9pZCA3IGFuZCBvbGRlciBkZXZpY2VzLlxuICAgKlxuICAgKiBAc2luY2UgNy4xLjBcbiAgICovXG4gIGN0aW1lPzogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaW1lIG9mIGxhc3QgbW9kaWZpY2F0aW9uIGluIG1pbGxpc2Vjb25kcy5cbiAgICpcbiAgICogQHNpbmNlIDcuMS4wXG4gICAqL1xuICBtdGltZTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgdXJpIG9mIHRoZSBmaWxlLlxuICAgKlxuICAgKiBAc2luY2UgNC4wLjBcbiAgICovXG4gIHVyaTogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEdldFVyaVJlc3VsdCB7XG4gIC8qKlxuICAgKiBUaGUgdXJpIG9mIHRoZSBmaWxlXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgdXJpOiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIFN0YXRSZXN1bHQgPSBGaWxlSW5mbztcbmV4cG9ydCBpbnRlcmZhY2UgQ29weVJlc3VsdCB7XG4gIC8qKlxuICAgKiBUaGUgdXJpIHdoZXJlIHRoZSBmaWxlIHdhcyBjb3BpZWQgaW50b1xuICAgKlxuICAgKiBAc2luY2UgNC4wLjBcbiAgICovXG4gIHVyaTogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIERvd25sb2FkRmlsZU9wdGlvbnMgZXh0ZW5kcyBIdHRwT3B0aW9ucyB7XG4gIC8qKlxuICAgKiBUaGUgcGF0aCB0aGUgZG93bmxvYWRlZCBmaWxlIHNob3VsZCBiZSBtb3ZlZCB0by5cbiAgICpcbiAgICogQHNpbmNlIDUuMS4wXG4gICAqL1xuICBwYXRoOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUaGUgZGlyZWN0b3J5IHRvIHdyaXRlIHRoZSBmaWxlIHRvLlxuICAgKiBJZiB0aGlzIG9wdGlvbiBpcyB1c2VkLCBmaWxlUGF0aCBjYW4gYmUgYSByZWxhdGl2ZSBwYXRoIHJhdGhlciB0aGFuIGFic29sdXRlLlxuICAgKiBUaGUgZGVmYXVsdCBpcyB0aGUgYERBVEFgIGRpcmVjdG9yeS5cbiAgICpcbiAgICogQHNpbmNlIDUuMS4wXG4gICAqL1xuICBkaXJlY3Rvcnk/OiBEaXJlY3Rvcnk7XG4gIC8qKlxuICAgKiBBbiBvcHRpb25hbCBsaXN0ZW5lciBmdW5jdGlvbiB0byByZWNlaXZlIGRvd25sb2FkZWQgcHJvZ3Jlc3MgZXZlbnRzLlxuICAgKiBJZiB0aGlzIG9wdGlvbiBpcyB1c2VkLCBwcm9ncmVzcyBldmVudCBzaG91bGQgYmUgZGlzcGF0Y2hlZCBvbiBldmVyeSBjaHVuayByZWNlaXZlZC5cbiAgICogQ2h1bmtzIGFyZSB0aHJvdHRsZWQgdG8gZXZlcnkgMTAwbXMgb24gQW5kcm9pZC9pT1MgdG8gYXZvaWQgc2xvd2Rvd25zLlxuICAgKlxuICAgKiBAc2luY2UgNS4xLjBcbiAgICovXG4gIHByb2dyZXNzPzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIFdoZXRoZXIgdG8gY3JlYXRlIGFueSBtaXNzaW5nIHBhcmVudCBkaXJlY3Rvcmllcy5cbiAgICpcbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICogQHNpbmNlIDUuMS4yXG4gICAqL1xuICByZWN1cnNpdmU/OiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIERvd25sb2FkRmlsZVJlc3VsdCB7XG4gIC8qKlxuICAgKiBUaGUgcGF0aCB0aGUgZmlsZSB3YXMgZG93bmxvYWRlZCB0by5cbiAgICpcbiAgICogQHNpbmNlIDUuMS4wXG4gICAqL1xuICBwYXRoPzogc3RyaW5nO1xuICAvKipcbiAgICogVGhlIGJsb2IgZGF0YSBvZiB0aGUgZG93bmxvYWRlZCBmaWxlLlxuICAgKiBUaGlzIGlzIG9ubHkgYXZhaWxhYmxlIG9uIHdlYi5cbiAgICpcbiAgICogQHNpbmNlIDUuMS4wXG4gICAqL1xuICBibG9iPzogQmxvYjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQcm9ncmVzc1N0YXR1cyB7XG4gIC8qKlxuICAgKiBUaGUgdXJsIG9mIHRoZSBmaWxlIGJlaW5nIGRvd25sb2FkZWQuXG4gICAqXG4gICAqIEBzaW5jZSA1LjEuMFxuICAgKi9cbiAgdXJsOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUaGUgbnVtYmVyIG9mIGJ5dGVzIGRvd25sb2FkZWQgc28gZmFyLlxuICAgKlxuICAgKiBAc2luY2UgNS4xLjBcbiAgICovXG4gIGJ5dGVzOiBudW1iZXI7XG4gIC8qKlxuICAgKiBUaGUgdG90YWwgbnVtYmVyIG9mIGJ5dGVzIHRvIGRvd25sb2FkIGZvciB0aGlzIGZpbGUuXG4gICAqXG4gICAqIEBzaW5jZSA1LjEuMFxuICAgKi9cbiAgY29udGVudExlbmd0aDogbnVtYmVyO1xufVxuXG4vKipcbiAqIENhbGxiYWNrIGZvciByZWNlaXZpbmcgY2h1bmtzIHJlYWQgZnJvbSBhIGZpbGUsIG9yIGVycm9yIGlmIHNvbWV0aGluZyB3ZW50IHdyb25nLlxuICpcbiAqIEBzaW5jZSA3LjEuMFxuICovXG5leHBvcnQgdHlwZSBSZWFkRmlsZUluQ2h1bmtzQ2FsbGJhY2sgPSAoY2h1bmtSZWFkOiBSZWFkRmlsZVJlc3VsdCB8IG51bGwsIGVycj86IGFueSkgPT4gdm9pZDtcblxuLyoqXG4gKiBBIGxpc3RlbmVyIGZ1bmN0aW9uIHRoYXQgcmVjZWl2ZXMgcHJvZ3Jlc3MgZXZlbnRzLlxuICpcbiAqIEBzaW5jZSA1LjEuMFxuICovXG5leHBvcnQgdHlwZSBQcm9ncmVzc0xpc3RlbmVyID0gKHByb2dyZXNzOiBQcm9ncmVzc1N0YXR1cykgPT4gdm9pZDtcblxuZXhwb3J0IGludGVyZmFjZSBGaWxlc3lzdGVtUGx1Z2luIHtcbiAgLyoqXG4gICAqIENoZWNrIHJlYWQvd3JpdGUgcGVybWlzc2lvbnMuXG4gICAqIFJlcXVpcmVkIG9uIEFuZHJvaWQsIG9ubHkgd2hlbiB1c2luZyBgRGlyZWN0b3J5LkRvY3VtZW50c2Agb3JcbiAgICogYERpcmVjdG9yeS5FeHRlcm5hbFN0b3JhZ2VgLlxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIGNoZWNrUGVybWlzc2lvbnMoKTogUHJvbWlzZTxQZXJtaXNzaW9uU3RhdHVzPjtcblxuICAvKipcbiAgICogUmVxdWVzdCByZWFkL3dyaXRlIHBlcm1pc3Npb25zLlxuICAgKiBSZXF1aXJlZCBvbiBBbmRyb2lkLCBvbmx5IHdoZW4gdXNpbmcgYERpcmVjdG9yeS5Eb2N1bWVudHNgIG9yXG4gICAqIGBEaXJlY3RvcnkuRXh0ZXJuYWxTdG9yYWdlYC5cbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICByZXF1ZXN0UGVybWlzc2lvbnMoKTogUHJvbWlzZTxQZXJtaXNzaW9uU3RhdHVzPjtcblxuICAvKipcbiAgICogUmVhZCBhIGZpbGUgZnJvbSBkaXNrXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgcmVhZEZpbGUob3B0aW9uczogUmVhZEZpbGVPcHRpb25zKTogUHJvbWlzZTxSZWFkRmlsZVJlc3VsdD47XG5cbiAgLyoqXG4gICAqIFJlYWQgYSBmaWxlIGZyb20gZGlzaywgaW4gY2h1bmtzLlxuICAgKiBOYXRpdmUgb25seSAobm90IGF2YWlsYWJsZSBpbiB3ZWIpLlxuICAgKiBVc2UgdGhlIGNhbGxiYWNrIHRvIHJlY2VpdmUgZWFjaCByZWFkIGNodW5rLlxuICAgKiBJZiBlbXB0eSBjaHVuayBpcyByZXR1cm5lZCwgaXQgbWVhbnMgZmlsZSBoYXMgYmVlbiBjb21wbGV0ZWx5IHJlYWQuXG4gICAqXG4gICAqIEBzaW5jZSA3LjEuMFxuICAgKi9cbiAgcmVhZEZpbGVJbkNodW5rcyhvcHRpb25zOiBSZWFkRmlsZUluQ2h1bmtzT3B0aW9ucywgY2FsbGJhY2s6IFJlYWRGaWxlSW5DaHVua3NDYWxsYmFjayk6IFByb21pc2U8Q2FsbGJhY2tJRD47XG5cbiAgLyoqXG4gICAqIFdyaXRlIGEgZmlsZSB0byBkaXNrIGluIHRoZSBzcGVjaWZpZWQgbG9jYXRpb24gb24gZGV2aWNlXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgd3JpdGVGaWxlKG9wdGlvbnM6IFdyaXRlRmlsZU9wdGlvbnMpOiBQcm9taXNlPFdyaXRlRmlsZVJlc3VsdD47XG5cbiAgLyoqXG4gICAqIEFwcGVuZCB0byBhIGZpbGUgb24gZGlzayBpbiB0aGUgc3BlY2lmaWVkIGxvY2F0aW9uIG9uIGRldmljZVxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIGFwcGVuZEZpbGUob3B0aW9uczogQXBwZW5kRmlsZU9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+O1xuXG4gIC8qKlxuICAgKiBEZWxldGUgYSBmaWxlIGZyb20gZGlza1xuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIGRlbGV0ZUZpbGUob3B0aW9uczogRGVsZXRlRmlsZU9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+O1xuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBkaXJlY3RvcnkuXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgbWtkaXIob3B0aW9uczogTWtkaXJPcHRpb25zKTogUHJvbWlzZTx2b2lkPjtcblxuICAvKipcbiAgICogUmVtb3ZlIGEgZGlyZWN0b3J5XG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgcm1kaXIob3B0aW9uczogUm1kaXJPcHRpb25zKTogUHJvbWlzZTx2b2lkPjtcblxuICAvKipcbiAgICogUmV0dXJuIGEgbGlzdCBvZiBmaWxlcyBmcm9tIHRoZSBkaXJlY3RvcnkgKG5vdCByZWN1cnNpdmUpXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgcmVhZGRpcihvcHRpb25zOiBSZWFkZGlyT3B0aW9ucyk6IFByb21pc2U8UmVhZGRpclJlc3VsdD47XG5cbiAgLyoqXG4gICAqIFJldHVybiBmdWxsIEZpbGUgVVJJIGZvciBhIHBhdGggYW5kIGRpcmVjdG9yeVxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIGdldFVyaShvcHRpb25zOiBHZXRVcmlPcHRpb25zKTogUHJvbWlzZTxHZXRVcmlSZXN1bHQ+O1xuXG4gIC8qKlxuICAgKiBSZXR1cm4gZGF0YSBhYm91dCBhIGZpbGVcbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICBzdGF0KG9wdGlvbnM6IFN0YXRPcHRpb25zKTogUHJvbWlzZTxTdGF0UmVzdWx0PjtcblxuICAvKipcbiAgICogUmVuYW1lIGEgZmlsZSBvciBkaXJlY3RvcnlcbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICByZW5hbWUob3B0aW9uczogUmVuYW1lT3B0aW9ucyk6IFByb21pc2U8dm9pZD47XG5cbiAgLyoqXG4gICAqIENvcHkgYSBmaWxlIG9yIGRpcmVjdG9yeVxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIGNvcHkob3B0aW9uczogQ29weU9wdGlvbnMpOiBQcm9taXNlPENvcHlSZXN1bHQ+O1xuXG4gIC8qKlxuICAgKiBQZXJmb3JtIGEgaHR0cCByZXF1ZXN0IHRvIGEgc2VydmVyIGFuZCBkb3dubG9hZCB0aGUgZmlsZSB0byB0aGUgc3BlY2lmaWVkIGRlc3RpbmF0aW9uLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBoYXMgYmVlbiBkZXByZWNhdGVkIHNpbmNlIHZlcnNpb24gNy4xLjAuXG4gICAqIFdlIHJlY29tbWVuZCB1c2luZyB0aGUgQGNhcGFjaXRvci9maWxlLXRyYW5zZmVyIHBsdWdpbiBpbnN0ZWFkLCBpbiBjb25qdW5jdGlvbiB3aXRoIHRoaXMgcGx1Z2luLlxuICAgKlxuICAgKiBAc2luY2UgNS4xLjBcbiAgICogQGRlcHJlY2F0ZWQgVXNlIHRoZSBAY2FwYWNpdG9yL2ZpbGUtdHJhbnNmZXIgcGx1Z2luIGluc3RlYWQuXG4gICAqL1xuICBkb3dubG9hZEZpbGUob3B0aW9uczogRG93bmxvYWRGaWxlT3B0aW9ucyk6IFByb21pc2U8RG93bmxvYWRGaWxlUmVzdWx0PjtcblxuICAvKipcbiAgICogQWRkIGEgbGlzdGVuZXIgdG8gZmlsZSBkb3dubG9hZCBwcm9ncmVzcyBldmVudHMuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGhhcyBiZWVuIGRlcHJlY2F0ZWQgc2luY2UgdmVyc2lvbiA3LjEuMC5cbiAgICogV2UgcmVjb21tZW5kIHVzaW5nIHRoZSBAY2FwYWNpdG9yL2ZpbGUtdHJhbnNmZXIgcGx1Z2luIGluc3RlYWQsIGluIGNvbmp1bmN0aW9uIHdpdGggdGhpcyBwbHVnaW4uXG4gICAqXG4gICAqIEBzaW5jZSA1LjEuMFxuICAgKiBAZGVwcmVjYXRlZCBVc2UgdGhlIEBjYXBhY2l0b3IvZmlsZS10cmFuc2ZlciBwbHVnaW4gaW5zdGVhZC5cbiAgICovXG4gIGFkZExpc3RlbmVyKGV2ZW50TmFtZTogJ3Byb2dyZXNzJywgbGlzdGVuZXJGdW5jOiBQcm9ncmVzc0xpc3RlbmVyKTogUHJvbWlzZTxQbHVnaW5MaXN0ZW5lckhhbmRsZT47XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhbGwgbGlzdGVuZXJzIGZvciB0aGlzIHBsdWdpbi5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgaGFzIGJlZW4gZGVwcmVjYXRlZCBzaW5jZSB2ZXJzaW9uIDcuMS4wLlxuICAgKiBXZSByZWNvbW1lbmQgdXNpbmcgdGhlIEBjYXBhY2l0b3IvZmlsZS10cmFuc2ZlciBwbHVnaW4gaW5zdGVhZCwgaW4gY29uanVuY3Rpb24gd2l0aCB0aGlzIHBsdWdpbi5cbiAgICpcbiAgICogQHNpbmNlIDUuMi4wXG4gICAqIEBkZXByZWNhdGVkIFVzZSB0aGUgQGNhcGFjaXRvci9maWxlLXRyYW5zZmVyIHBsdWdpbiBpbnN0ZWFkLlxuICAgKi9cbiAgcmVtb3ZlQWxsTGlzdGVuZXJzKCk6IFByb21pc2U8dm9pZD47XG59XG5cbi8qKlxuICogU3RydWN0dXJlIGZvciBlcnJvcnMgcmV0dXJuZWQgYnkgdGhlIHBsdWdpbi5cbiAqXG4gKiBgY29kZWAgZm9sbG93cyBcIk9TLVBMVUctRklMRS1YWFhYXCIgZm9ybWF0XG4gKlxuICogQHNpbmNlIDEuMC4wXG4gKi9cbmV4cG9ydCB0eXBlIFBsdWdpbkVycm9yID0ge1xuICBjb2RlOiBzdHJpbmc7XG4gIG1lc3NhZ2U6IHN0cmluZztcbn07XG5cbi8qKlxuICogQGRlcHJlY2F0ZWQgVXNlIGBSZWFkRmlsZU9wdGlvbnNgLlxuICogQHNpbmNlIDEuMC4wXG4gKi9cbmV4cG9ydCB0eXBlIEZpbGVSZWFkT3B0aW9ucyA9IFJlYWRGaWxlT3B0aW9ucztcblxuLyoqXG4gKiBAZGVwcmVjYXRlZCBVc2UgYFJlYWRGaWxlUmVzdWx0YC5cbiAqIEBzaW5jZSAxLjAuMFxuICovXG5leHBvcnQgdHlwZSBGaWxlUmVhZFJlc3VsdCA9IFJlYWRGaWxlUmVzdWx0O1xuXG4vKipcbiAqIEBkZXByZWNhdGVkIFVzZSBgV3JpdGVGaWxlT3B0aW9uc2AuXG4gKiBAc2luY2UgMS4wLjBcbiAqL1xuZXhwb3J0IHR5cGUgRmlsZVdyaXRlT3B0aW9ucyA9IFdyaXRlRmlsZU9wdGlvbnM7XG5cbi8qKlxuICogQGRlcHJlY2F0ZWQgVXNlIGBXcml0ZUZpbGVSZXN1bHRgLlxuICogQHNpbmNlIDEuMC4wXG4gKi9cbmV4cG9ydCB0eXBlIEZpbGVXcml0ZVJlc3VsdCA9IFdyaXRlRmlsZVJlc3VsdDtcblxuLyoqXG4gKiBAZGVwcmVjYXRlZCBVc2UgYEFwcGVuZEZpbGVPcHRpb25zYC5cbiAqIEBzaW5jZSAxLjAuMFxuICovXG5leHBvcnQgdHlwZSBGaWxlQXBwZW5kT3B0aW9ucyA9IEFwcGVuZEZpbGVPcHRpb25zO1xuXG4vKipcbiAqIEBkZXByZWNhdGVkIFVzZSBgRGVsZXRlRmlsZU9wdGlvbnNgLlxuICogQHNpbmNlIDEuMC4wXG4gKi9cbmV4cG9ydCB0eXBlIEZpbGVEZWxldGVPcHRpb25zID0gRGVsZXRlRmlsZU9wdGlvbnM7XG5cbi8qKlxuICogQGRlcHJlY2F0ZWQgVXNlIGBEaXJlY3RvcnlgLlxuICogQHNpbmNlIDEuMC4wXG4gKi9cbmV4cG9ydCBjb25zdCBGaWxlc3lzdGVtRGlyZWN0b3J5ID0gRGlyZWN0b3J5O1xuXG4vKipcbiAqIEBkZXByZWNhdGVkIFVzZSBgRW5jb2RpbmdgLlxuICogQHNpbmNlIDEuMC4wXG4gKi9cbmV4cG9ydCBjb25zdCBGaWxlc3lzdGVtRW5jb2RpbmcgPSBFbmNvZGluZztcbiIsICJpbXBvcnQgeyBXZWJQbHVnaW4sIGJ1aWxkUmVxdWVzdEluaXQgfSBmcm9tICdAY2FwYWNpdG9yL2NvcmUnO1xuXG5pbXBvcnQgdHlwZSB7XG4gIEFwcGVuZEZpbGVPcHRpb25zLFxuICBDb3B5T3B0aW9ucyxcbiAgQ29weVJlc3VsdCxcbiAgRGVsZXRlRmlsZU9wdGlvbnMsXG4gIEZpbGVzeXN0ZW1QbHVnaW4sXG4gIEdldFVyaU9wdGlvbnMsXG4gIEdldFVyaVJlc3VsdCxcbiAgTWtkaXJPcHRpb25zLFxuICBQZXJtaXNzaW9uU3RhdHVzLFxuICBSZWFkRmlsZU9wdGlvbnMsXG4gIFJlYWRGaWxlUmVzdWx0LFxuICBSZWFkZGlyT3B0aW9ucyxcbiAgUmVhZGRpclJlc3VsdCxcbiAgUmVuYW1lT3B0aW9ucyxcbiAgUm1kaXJPcHRpb25zLFxuICBTdGF0T3B0aW9ucyxcbiAgU3RhdFJlc3VsdCxcbiAgV3JpdGVGaWxlT3B0aW9ucyxcbiAgV3JpdGVGaWxlUmVzdWx0LFxuICBEaXJlY3RvcnksXG4gIFJlYWRGaWxlSW5DaHVua3NPcHRpb25zLFxuICBDYWxsYmFja0lELFxuICBEb3dubG9hZEZpbGVPcHRpb25zLFxuICBEb3dubG9hZEZpbGVSZXN1bHQsXG4gIFByb2dyZXNzU3RhdHVzLFxuICBSZWFkRmlsZUluQ2h1bmtzQ2FsbGJhY2ssXG59IGZyb20gJy4vZGVmaW5pdGlvbnMnO1xuaW1wb3J0IHsgRW5jb2RpbmcgfSBmcm9tICcuL2RlZmluaXRpb25zJztcblxuZnVuY3Rpb24gcmVzb2x2ZShwYXRoOiBzdHJpbmcpOiBzdHJpbmcge1xuICBjb25zdCBwb3NpeCA9IHBhdGguc3BsaXQoJy8nKS5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0gIT09ICcuJyk7XG4gIGNvbnN0IG5ld1Bvc2l4OiBzdHJpbmdbXSA9IFtdO1xuXG4gIHBvc2l4LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICBpZiAoaXRlbSA9PT0gJy4uJyAmJiBuZXdQb3NpeC5sZW5ndGggPiAwICYmIG5ld1Bvc2l4W25ld1Bvc2l4Lmxlbmd0aCAtIDFdICE9PSAnLi4nKSB7XG4gICAgICBuZXdQb3NpeC5wb3AoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmV3UG9zaXgucHVzaChpdGVtKTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBuZXdQb3NpeC5qb2luKCcvJyk7XG59XG5mdW5jdGlvbiBpc1BhdGhQYXJlbnQocGFyZW50OiBzdHJpbmcsIGNoaWxkcmVuOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgcGFyZW50ID0gcmVzb2x2ZShwYXJlbnQpO1xuICBjaGlsZHJlbiA9IHJlc29sdmUoY2hpbGRyZW4pO1xuICBjb25zdCBwYXRoc0EgPSBwYXJlbnQuc3BsaXQoJy8nKTtcbiAgY29uc3QgcGF0aHNCID0gY2hpbGRyZW4uc3BsaXQoJy8nKTtcblxuICByZXR1cm4gcGFyZW50ICE9PSBjaGlsZHJlbiAmJiBwYXRoc0EuZXZlcnkoKHZhbHVlLCBpbmRleCkgPT4gdmFsdWUgPT09IHBhdGhzQltpbmRleF0pO1xufVxuXG5leHBvcnQgY2xhc3MgRmlsZXN5c3RlbVdlYiBleHRlbmRzIFdlYlBsdWdpbiBpbXBsZW1lbnRzIEZpbGVzeXN0ZW1QbHVnaW4ge1xuICByZWFkRmlsZUluQ2h1bmtzKF9vcHRpb25zOiBSZWFkRmlsZUluQ2h1bmtzT3B0aW9ucywgX2NhbGxiYWNrOiBSZWFkRmlsZUluQ2h1bmtzQ2FsbGJhY2spOiBQcm9taXNlPENhbGxiYWNrSUQ+IHtcbiAgICB0aHJvdyB0aGlzLnVuYXZhaWxhYmxlKCdNZXRob2Qgbm90IGltcGxlbWVudGVkLicpO1xuICB9XG4gIERCX1ZFUlNJT04gPSAxO1xuICBEQl9OQU1FID0gJ0Rpc2MnO1xuXG4gIHByaXZhdGUgX3dyaXRlQ21kczogc3RyaW5nW10gPSBbJ2FkZCcsICdwdXQnLCAnZGVsZXRlJ107XG4gIHByaXZhdGUgX2RiPzogSURCRGF0YWJhc2U7XG4gIHN0YXRpYyBfZGVidWcgPSB0cnVlO1xuICBhc3luYyBpbml0RGIoKTogUHJvbWlzZTxJREJEYXRhYmFzZT4ge1xuICAgIGlmICh0aGlzLl9kYiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdGhpcy5fZGI7XG4gICAgfVxuICAgIGlmICghKCdpbmRleGVkREInIGluIHdpbmRvdykpIHtcbiAgICAgIHRocm93IHRoaXMudW5hdmFpbGFibGUoXCJUaGlzIGJyb3dzZXIgZG9lc24ndCBzdXBwb3J0IEluZGV4ZWREQlwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2U8SURCRGF0YWJhc2U+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IHJlcXVlc3QgPSBpbmRleGVkREIub3Blbih0aGlzLkRCX05BTUUsIHRoaXMuREJfVkVSU0lPTik7XG4gICAgICByZXF1ZXN0Lm9udXBncmFkZW5lZWRlZCA9IEZpbGVzeXN0ZW1XZWIuZG9VcGdyYWRlO1xuICAgICAgcmVxdWVzdC5vbnN1Y2Nlc3MgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuX2RiID0gcmVxdWVzdC5yZXN1bHQ7XG4gICAgICAgIHJlc29sdmUocmVxdWVzdC5yZXN1bHQpO1xuICAgICAgfTtcbiAgICAgIHJlcXVlc3Qub25lcnJvciA9ICgpID0+IHJlamVjdChyZXF1ZXN0LmVycm9yKTtcbiAgICAgIHJlcXVlc3Qub25ibG9ja2VkID0gKCkgPT4ge1xuICAgICAgICBjb25zb2xlLndhcm4oJ2RiIGJsb2NrZWQnKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgZG9VcGdyYWRlKGV2ZW50OiBJREJWZXJzaW9uQ2hhbmdlRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBldmVudFRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBJREJPcGVuREJSZXF1ZXN0O1xuICAgIGNvbnN0IGRiID0gZXZlbnRUYXJnZXQucmVzdWx0O1xuICAgIHN3aXRjaCAoZXZlbnQub2xkVmVyc2lvbikge1xuICAgICAgY2FzZSAwOlxuICAgICAgY2FzZSAxOlxuICAgICAgZGVmYXVsdDoge1xuICAgICAgICBpZiAoZGIub2JqZWN0U3RvcmVOYW1lcy5jb250YWlucygnRmlsZVN0b3JhZ2UnKSkge1xuICAgICAgICAgIGRiLmRlbGV0ZU9iamVjdFN0b3JlKCdGaWxlU3RvcmFnZScpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHN0b3JlID0gZGIuY3JlYXRlT2JqZWN0U3RvcmUoJ0ZpbGVTdG9yYWdlJywgeyBrZXlQYXRoOiAncGF0aCcgfSk7XG4gICAgICAgIHN0b3JlLmNyZWF0ZUluZGV4KCdieV9mb2xkZXInLCAnZm9sZGVyJyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgZGJSZXF1ZXN0KGNtZDogc3RyaW5nLCBhcmdzOiBhbnlbXSk6IFByb21pc2U8YW55PiB7XG4gICAgY29uc3QgcmVhZEZsYWcgPSB0aGlzLl93cml0ZUNtZHMuaW5kZXhPZihjbWQpICE9PSAtMSA/ICdyZWFkd3JpdGUnIDogJ3JlYWRvbmx5JztcbiAgICByZXR1cm4gdGhpcy5pbml0RGIoKS50aGVuKChjb25uOiBJREJEYXRhYmFzZSkgPT4ge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPElEQk9iamVjdFN0b3JlPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGNvbnN0IHR4OiBJREJUcmFuc2FjdGlvbiA9IGNvbm4udHJhbnNhY3Rpb24oWydGaWxlU3RvcmFnZSddLCByZWFkRmxhZyk7XG4gICAgICAgIGNvbnN0IHN0b3JlOiBhbnkgPSB0eC5vYmplY3RTdG9yZSgnRmlsZVN0b3JhZ2UnKTtcbiAgICAgICAgY29uc3QgcmVxID0gc3RvcmVbY21kXSguLi5hcmdzKTtcbiAgICAgICAgcmVxLm9uc3VjY2VzcyA9ICgpID0+IHJlc29sdmUocmVxLnJlc3VsdCk7XG4gICAgICAgIHJlcS5vbmVycm9yID0gKCkgPT4gcmVqZWN0KHJlcS5lcnJvcik7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIGRiSW5kZXhSZXF1ZXN0KGluZGV4TmFtZTogc3RyaW5nLCBjbWQ6IHN0cmluZywgYXJnczogW2FueV0pOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnN0IHJlYWRGbGFnID0gdGhpcy5fd3JpdGVDbWRzLmluZGV4T2YoY21kKSAhPT0gLTEgPyAncmVhZHdyaXRlJyA6ICdyZWFkb25seSc7XG4gICAgcmV0dXJuIHRoaXMuaW5pdERiKCkudGhlbigoY29ubjogSURCRGF0YWJhc2UpID0+IHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxJREJPYmplY3RTdG9yZT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBjb25zdCB0eDogSURCVHJhbnNhY3Rpb24gPSBjb25uLnRyYW5zYWN0aW9uKFsnRmlsZVN0b3JhZ2UnXSwgcmVhZEZsYWcpO1xuICAgICAgICBjb25zdCBzdG9yZTogSURCT2JqZWN0U3RvcmUgPSB0eC5vYmplY3RTdG9yZSgnRmlsZVN0b3JhZ2UnKTtcbiAgICAgICAgY29uc3QgaW5kZXg6IGFueSA9IHN0b3JlLmluZGV4KGluZGV4TmFtZSk7XG4gICAgICAgIGNvbnN0IHJlcSA9IGluZGV4W2NtZF0oLi4uYXJncykgYXMgYW55O1xuICAgICAgICByZXEub25zdWNjZXNzID0gKCkgPT4gcmVzb2x2ZShyZXEucmVzdWx0KTtcbiAgICAgICAgcmVxLm9uZXJyb3IgPSAoKSA9PiByZWplY3QocmVxLmVycm9yKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRQYXRoKGRpcmVjdG9yeTogRGlyZWN0b3J5IHwgdW5kZWZpbmVkLCB1cmlQYXRoOiBzdHJpbmcgfCB1bmRlZmluZWQpOiBzdHJpbmcge1xuICAgIGNvbnN0IGNsZWFuZWRVcmlQYXRoID0gdXJpUGF0aCAhPT0gdW5kZWZpbmVkID8gdXJpUGF0aC5yZXBsYWNlKC9eWy9dK3xbL10rJC9nLCAnJykgOiAnJztcbiAgICBsZXQgZnNQYXRoID0gJyc7XG4gICAgaWYgKGRpcmVjdG9yeSAhPT0gdW5kZWZpbmVkKSBmc1BhdGggKz0gJy8nICsgZGlyZWN0b3J5O1xuICAgIGlmICh1cmlQYXRoICE9PSAnJykgZnNQYXRoICs9ICcvJyArIGNsZWFuZWRVcmlQYXRoO1xuICAgIHJldHVybiBmc1BhdGg7XG4gIH1cblxuICBhc3luYyBjbGVhcigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBjb25uOiBJREJEYXRhYmFzZSA9IGF3YWl0IHRoaXMuaW5pdERiKCk7XG4gICAgY29uc3QgdHg6IElEQlRyYW5zYWN0aW9uID0gY29ubi50cmFuc2FjdGlvbihbJ0ZpbGVTdG9yYWdlJ10sICdyZWFkd3JpdGUnKTtcbiAgICBjb25zdCBzdG9yZTogSURCT2JqZWN0U3RvcmUgPSB0eC5vYmplY3RTdG9yZSgnRmlsZVN0b3JhZ2UnKTtcbiAgICBzdG9yZS5jbGVhcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlYWQgYSBmaWxlIGZyb20gZGlza1xuICAgKiBAcGFyYW0gb3B0aW9ucyBvcHRpb25zIGZvciB0aGUgZmlsZSByZWFkXG4gICAqIEByZXR1cm4gYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgcmVhZCBmaWxlIGRhdGEgcmVzdWx0XG4gICAqL1xuICBhc3luYyByZWFkRmlsZShvcHRpb25zOiBSZWFkRmlsZU9wdGlvbnMpOiBQcm9taXNlPFJlYWRGaWxlUmVzdWx0PiB7XG4gICAgY29uc3QgcGF0aDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKG9wdGlvbnMuZGlyZWN0b3J5LCBvcHRpb25zLnBhdGgpO1xuICAgIC8vIGNvbnN0IGVuY29kaW5nID0gb3B0aW9ucy5lbmNvZGluZztcblxuICAgIGNvbnN0IGVudHJ5ID0gKGF3YWl0IHRoaXMuZGJSZXF1ZXN0KCdnZXQnLCBbcGF0aF0pKSBhcyBFbnRyeU9iajtcbiAgICBpZiAoZW50cnkgPT09IHVuZGVmaW5lZCkgdGhyb3cgRXJyb3IoJ0ZpbGUgZG9lcyBub3QgZXhpc3QuJyk7XG4gICAgcmV0dXJuIHsgZGF0YTogZW50cnkuY29udGVudCA/IGVudHJ5LmNvbnRlbnQgOiAnJyB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFdyaXRlIGEgZmlsZSB0byBkaXNrIGluIHRoZSBzcGVjaWZpZWQgbG9jYXRpb24gb24gZGV2aWNlXG4gICAqIEBwYXJhbSBvcHRpb25zIG9wdGlvbnMgZm9yIHRoZSBmaWxlIHdyaXRlXG4gICAqIEByZXR1cm4gYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgZmlsZSB3cml0ZSByZXN1bHRcbiAgICovXG4gIGFzeW5jIHdyaXRlRmlsZShvcHRpb25zOiBXcml0ZUZpbGVPcHRpb25zKTogUHJvbWlzZTxXcml0ZUZpbGVSZXN1bHQ+IHtcbiAgICBjb25zdCBwYXRoOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgob3B0aW9ucy5kaXJlY3RvcnksIG9wdGlvbnMucGF0aCk7XG4gICAgbGV0IGRhdGEgPSBvcHRpb25zLmRhdGE7XG4gICAgY29uc3QgZW5jb2RpbmcgPSBvcHRpb25zLmVuY29kaW5nO1xuICAgIGNvbnN0IGRvUmVjdXJzaXZlID0gb3B0aW9ucy5yZWN1cnNpdmU7XG5cbiAgICBjb25zdCBvY2N1cGllZEVudHJ5ID0gKGF3YWl0IHRoaXMuZGJSZXF1ZXN0KCdnZXQnLCBbcGF0aF0pKSBhcyBFbnRyeU9iajtcbiAgICBpZiAob2NjdXBpZWRFbnRyeSAmJiBvY2N1cGllZEVudHJ5LnR5cGUgPT09ICdkaXJlY3RvcnknKSB0aHJvdyBFcnJvcignVGhlIHN1cHBsaWVkIHBhdGggaXMgYSBkaXJlY3RvcnkuJyk7XG5cbiAgICBjb25zdCBwYXJlbnRQYXRoID0gcGF0aC5zdWJzdHIoMCwgcGF0aC5sYXN0SW5kZXhPZignLycpKTtcblxuICAgIGNvbnN0IHBhcmVudEVudHJ5ID0gKGF3YWl0IHRoaXMuZGJSZXF1ZXN0KCdnZXQnLCBbcGFyZW50UGF0aF0pKSBhcyBFbnRyeU9iajtcbiAgICBpZiAocGFyZW50RW50cnkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc3Qgc3ViRGlySW5kZXggPSBwYXJlbnRQYXRoLmluZGV4T2YoJy8nLCAxKTtcbiAgICAgIGlmIChzdWJEaXJJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgY29uc3QgcGFyZW50QXJnUGF0aCA9IHBhcmVudFBhdGguc3Vic3RyKHN1YkRpckluZGV4KTtcbiAgICAgICAgYXdhaXQgdGhpcy5ta2Rpcih7XG4gICAgICAgICAgcGF0aDogcGFyZW50QXJnUGF0aCxcbiAgICAgICAgICBkaXJlY3Rvcnk6IG9wdGlvbnMuZGlyZWN0b3J5LFxuICAgICAgICAgIHJlY3Vyc2l2ZTogZG9SZWN1cnNpdmUsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghZW5jb2RpbmcgJiYgIShkYXRhIGluc3RhbmNlb2YgQmxvYikpIHtcbiAgICAgIGRhdGEgPSBkYXRhLmluZGV4T2YoJywnKSA+PSAwID8gZGF0YS5zcGxpdCgnLCcpWzFdIDogZGF0YTtcbiAgICAgIGlmICghdGhpcy5pc0Jhc2U2NFN0cmluZyhkYXRhKSkgdGhyb3cgRXJyb3IoJ1RoZSBzdXBwbGllZCBkYXRhIGlzIG5vdCB2YWxpZCBiYXNlNjQgY29udGVudC4nKTtcbiAgICB9XG5cbiAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgIGNvbnN0IHBhdGhPYmo6IEVudHJ5T2JqID0ge1xuICAgICAgcGF0aDogcGF0aCxcbiAgICAgIGZvbGRlcjogcGFyZW50UGF0aCxcbiAgICAgIHR5cGU6ICdmaWxlJyxcbiAgICAgIHNpemU6IGRhdGEgaW5zdGFuY2VvZiBCbG9iID8gZGF0YS5zaXplIDogZGF0YS5sZW5ndGgsXG4gICAgICBjdGltZTogbm93LFxuICAgICAgbXRpbWU6IG5vdyxcbiAgICAgIGNvbnRlbnQ6IGRhdGEsXG4gICAgfTtcbiAgICBhd2FpdCB0aGlzLmRiUmVxdWVzdCgncHV0JywgW3BhdGhPYmpdKTtcbiAgICByZXR1cm4ge1xuICAgICAgdXJpOiBwYXRoT2JqLnBhdGgsXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBlbmQgdG8gYSBmaWxlIG9uIGRpc2sgaW4gdGhlIHNwZWNpZmllZCBsb2NhdGlvbiBvbiBkZXZpY2VcbiAgICogQHBhcmFtIG9wdGlvbnMgb3B0aW9ucyBmb3IgdGhlIGZpbGUgYXBwZW5kXG4gICAqIEByZXR1cm4gYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgZmlsZSB3cml0ZSByZXN1bHRcbiAgICovXG4gIGFzeW5jIGFwcGVuZEZpbGUob3B0aW9uczogQXBwZW5kRmlsZU9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBwYXRoOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgob3B0aW9ucy5kaXJlY3RvcnksIG9wdGlvbnMucGF0aCk7XG4gICAgbGV0IGRhdGEgPSBvcHRpb25zLmRhdGE7XG4gICAgY29uc3QgZW5jb2RpbmcgPSBvcHRpb25zLmVuY29kaW5nO1xuICAgIGNvbnN0IHBhcmVudFBhdGggPSBwYXRoLnN1YnN0cigwLCBwYXRoLmxhc3RJbmRleE9mKCcvJykpO1xuXG4gICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICBsZXQgY3RpbWUgPSBub3c7XG5cbiAgICBjb25zdCBvY2N1cGllZEVudHJ5ID0gKGF3YWl0IHRoaXMuZGJSZXF1ZXN0KCdnZXQnLCBbcGF0aF0pKSBhcyBFbnRyeU9iajtcbiAgICBpZiAob2NjdXBpZWRFbnRyeSAmJiBvY2N1cGllZEVudHJ5LnR5cGUgPT09ICdkaXJlY3RvcnknKSB0aHJvdyBFcnJvcignVGhlIHN1cHBsaWVkIHBhdGggaXMgYSBkaXJlY3RvcnkuJyk7XG5cbiAgICBjb25zdCBwYXJlbnRFbnRyeSA9IChhd2FpdCB0aGlzLmRiUmVxdWVzdCgnZ2V0JywgW3BhcmVudFBhdGhdKSkgYXMgRW50cnlPYmo7XG4gICAgaWYgKHBhcmVudEVudHJ5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IHN1YkRpckluZGV4ID0gcGFyZW50UGF0aC5pbmRleE9mKCcvJywgMSk7XG4gICAgICBpZiAoc3ViRGlySW5kZXggIT09IC0xKSB7XG4gICAgICAgIGNvbnN0IHBhcmVudEFyZ1BhdGggPSBwYXJlbnRQYXRoLnN1YnN0cihzdWJEaXJJbmRleCk7XG4gICAgICAgIGF3YWl0IHRoaXMubWtkaXIoe1xuICAgICAgICAgIHBhdGg6IHBhcmVudEFyZ1BhdGgsXG4gICAgICAgICAgZGlyZWN0b3J5OiBvcHRpb25zLmRpcmVjdG9yeSxcbiAgICAgICAgICByZWN1cnNpdmU6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghZW5jb2RpbmcgJiYgIXRoaXMuaXNCYXNlNjRTdHJpbmcoZGF0YSkpIHRocm93IEVycm9yKCdUaGUgc3VwcGxpZWQgZGF0YSBpcyBub3QgdmFsaWQgYmFzZTY0IGNvbnRlbnQuJyk7XG5cbiAgICBpZiAob2NjdXBpZWRFbnRyeSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAob2NjdXBpZWRFbnRyeS5jb250ZW50IGluc3RhbmNlb2YgQmxvYikge1xuICAgICAgICB0aHJvdyBFcnJvcignVGhlIG9jY3VwaWVkIGVudHJ5IGNvbnRhaW5zIGEgQmxvYiBvYmplY3Qgd2hpY2ggY2Fubm90IGJlIGFwcGVuZGVkIHRvLicpO1xuICAgICAgfVxuXG4gICAgICBpZiAob2NjdXBpZWRFbnRyeS5jb250ZW50ICE9PSB1bmRlZmluZWQgJiYgIWVuY29kaW5nKSB7XG4gICAgICAgIGRhdGEgPSBidG9hKGF0b2Iob2NjdXBpZWRFbnRyeS5jb250ZW50KSArIGF0b2IoZGF0YSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGF0YSA9IG9jY3VwaWVkRW50cnkuY29udGVudCArIGRhdGE7XG4gICAgICB9XG4gICAgICBjdGltZSA9IG9jY3VwaWVkRW50cnkuY3RpbWU7XG4gICAgfVxuICAgIGNvbnN0IHBhdGhPYmo6IEVudHJ5T2JqID0ge1xuICAgICAgcGF0aDogcGF0aCxcbiAgICAgIGZvbGRlcjogcGFyZW50UGF0aCxcbiAgICAgIHR5cGU6ICdmaWxlJyxcbiAgICAgIHNpemU6IGRhdGEubGVuZ3RoLFxuICAgICAgY3RpbWU6IGN0aW1lLFxuICAgICAgbXRpbWU6IG5vdyxcbiAgICAgIGNvbnRlbnQ6IGRhdGEsXG4gICAgfTtcbiAgICBhd2FpdCB0aGlzLmRiUmVxdWVzdCgncHV0JywgW3BhdGhPYmpdKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGUgYSBmaWxlIGZyb20gZGlza1xuICAgKiBAcGFyYW0gb3B0aW9ucyBvcHRpb25zIGZvciB0aGUgZmlsZSBkZWxldGVcbiAgICogQHJldHVybiBhIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBkZWxldGVkIGZpbGUgZGF0YSByZXN1bHRcbiAgICovXG4gIGFzeW5jIGRlbGV0ZUZpbGUob3B0aW9uczogRGVsZXRlRmlsZU9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBwYXRoOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgob3B0aW9ucy5kaXJlY3RvcnksIG9wdGlvbnMucGF0aCk7XG5cbiAgICBjb25zdCBlbnRyeSA9IChhd2FpdCB0aGlzLmRiUmVxdWVzdCgnZ2V0JywgW3BhdGhdKSkgYXMgRW50cnlPYmo7XG4gICAgaWYgKGVudHJ5ID09PSB1bmRlZmluZWQpIHRocm93IEVycm9yKCdGaWxlIGRvZXMgbm90IGV4aXN0LicpO1xuICAgIGNvbnN0IGVudHJpZXMgPSBhd2FpdCB0aGlzLmRiSW5kZXhSZXF1ZXN0KCdieV9mb2xkZXInLCAnZ2V0QWxsS2V5cycsIFtJREJLZXlSYW5nZS5vbmx5KHBhdGgpXSk7XG4gICAgaWYgKGVudHJpZXMubGVuZ3RoICE9PSAwKSB0aHJvdyBFcnJvcignRm9sZGVyIGlzIG5vdCBlbXB0eS4nKTtcblxuICAgIGF3YWl0IHRoaXMuZGJSZXF1ZXN0KCdkZWxldGUnLCBbcGF0aF0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIGRpcmVjdG9yeS5cbiAgICogQHBhcmFtIG9wdGlvbnMgb3B0aW9ucyBmb3IgdGhlIG1rZGlyXG4gICAqIEByZXR1cm4gYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgbWtkaXIgcmVzdWx0XG4gICAqL1xuICBhc3luYyBta2RpcihvcHRpb25zOiBNa2Rpck9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBwYXRoOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgob3B0aW9ucy5kaXJlY3RvcnksIG9wdGlvbnMucGF0aCk7XG4gICAgY29uc3QgZG9SZWN1cnNpdmUgPSBvcHRpb25zLnJlY3Vyc2l2ZTtcbiAgICBjb25zdCBwYXJlbnRQYXRoID0gcGF0aC5zdWJzdHIoMCwgcGF0aC5sYXN0SW5kZXhPZignLycpKTtcblxuICAgIGNvbnN0IGRlcHRoID0gKHBhdGgubWF0Y2goL1xcLy9nKSB8fCBbXSkubGVuZ3RoO1xuICAgIGNvbnN0IHBhcmVudEVudHJ5ID0gKGF3YWl0IHRoaXMuZGJSZXF1ZXN0KCdnZXQnLCBbcGFyZW50UGF0aF0pKSBhcyBFbnRyeU9iajtcbiAgICBjb25zdCBvY2N1cGllZEVudHJ5ID0gKGF3YWl0IHRoaXMuZGJSZXF1ZXN0KCdnZXQnLCBbcGF0aF0pKSBhcyBFbnRyeU9iajtcbiAgICBpZiAoZGVwdGggPT09IDEpIHRocm93IEVycm9yKCdDYW5ub3QgY3JlYXRlIFJvb3QgZGlyZWN0b3J5Jyk7XG4gICAgaWYgKG9jY3VwaWVkRW50cnkgIT09IHVuZGVmaW5lZCkgdGhyb3cgRXJyb3IoJ0N1cnJlbnQgZGlyZWN0b3J5IGRvZXMgYWxyZWFkeSBleGlzdC4nKTtcbiAgICBpZiAoIWRvUmVjdXJzaXZlICYmIGRlcHRoICE9PSAyICYmIHBhcmVudEVudHJ5ID09PSB1bmRlZmluZWQpIHRocm93IEVycm9yKCdQYXJlbnQgZGlyZWN0b3J5IG11c3QgZXhpc3QnKTtcblxuICAgIGlmIChkb1JlY3Vyc2l2ZSAmJiBkZXB0aCAhPT0gMiAmJiBwYXJlbnRFbnRyeSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zdCBwYXJlbnRBcmdQYXRoID0gcGFyZW50UGF0aC5zdWJzdHIocGFyZW50UGF0aC5pbmRleE9mKCcvJywgMSkpO1xuICAgICAgYXdhaXQgdGhpcy5ta2Rpcih7XG4gICAgICAgIHBhdGg6IHBhcmVudEFyZ1BhdGgsXG4gICAgICAgIGRpcmVjdG9yeTogb3B0aW9ucy5kaXJlY3RvcnksXG4gICAgICAgIHJlY3Vyc2l2ZTogZG9SZWN1cnNpdmUsXG4gICAgICB9KTtcbiAgICB9XG4gICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICBjb25zdCBwYXRoT2JqOiBFbnRyeU9iaiA9IHtcbiAgICAgIHBhdGg6IHBhdGgsXG4gICAgICBmb2xkZXI6IHBhcmVudFBhdGgsXG4gICAgICB0eXBlOiAnZGlyZWN0b3J5JyxcbiAgICAgIHNpemU6IDAsXG4gICAgICBjdGltZTogbm93LFxuICAgICAgbXRpbWU6IG5vdyxcbiAgICB9O1xuICAgIGF3YWl0IHRoaXMuZGJSZXF1ZXN0KCdwdXQnLCBbcGF0aE9ial0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhIGRpcmVjdG9yeVxuICAgKiBAcGFyYW0gb3B0aW9ucyB0aGUgb3B0aW9ucyBmb3IgdGhlIGRpcmVjdG9yeSByZW1vdmVcbiAgICovXG4gIGFzeW5jIHJtZGlyKG9wdGlvbnM6IFJtZGlyT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHsgcGF0aCwgZGlyZWN0b3J5LCByZWN1cnNpdmUgfSA9IG9wdGlvbnM7XG4gICAgY29uc3QgZnVsbFBhdGg6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aChkaXJlY3RvcnksIHBhdGgpO1xuXG4gICAgY29uc3QgZW50cnkgPSAoYXdhaXQgdGhpcy5kYlJlcXVlc3QoJ2dldCcsIFtmdWxsUGF0aF0pKSBhcyBFbnRyeU9iajtcblxuICAgIGlmIChlbnRyeSA9PT0gdW5kZWZpbmVkKSB0aHJvdyBFcnJvcignRm9sZGVyIGRvZXMgbm90IGV4aXN0LicpO1xuXG4gICAgaWYgKGVudHJ5LnR5cGUgIT09ICdkaXJlY3RvcnknKSB0aHJvdyBFcnJvcignUmVxdWVzdGVkIHBhdGggaXMgbm90IGEgZGlyZWN0b3J5Jyk7XG5cbiAgICBjb25zdCByZWFkRGlyUmVzdWx0ID0gYXdhaXQgdGhpcy5yZWFkZGlyKHsgcGF0aCwgZGlyZWN0b3J5IH0pO1xuXG4gICAgaWYgKHJlYWREaXJSZXN1bHQuZmlsZXMubGVuZ3RoICE9PSAwICYmICFyZWN1cnNpdmUpIHRocm93IEVycm9yKCdGb2xkZXIgaXMgbm90IGVtcHR5Jyk7XG5cbiAgICBmb3IgKGNvbnN0IGVudHJ5IG9mIHJlYWREaXJSZXN1bHQuZmlsZXMpIHtcbiAgICAgIGNvbnN0IGVudHJ5UGF0aCA9IGAke3BhdGh9LyR7ZW50cnkubmFtZX1gO1xuICAgICAgY29uc3QgZW50cnlPYmogPSBhd2FpdCB0aGlzLnN0YXQoeyBwYXRoOiBlbnRyeVBhdGgsIGRpcmVjdG9yeSB9KTtcbiAgICAgIGlmIChlbnRyeU9iai50eXBlID09PSAnZmlsZScpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5kZWxldGVGaWxlKHsgcGF0aDogZW50cnlQYXRoLCBkaXJlY3RvcnkgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhd2FpdCB0aGlzLnJtZGlyKHsgcGF0aDogZW50cnlQYXRoLCBkaXJlY3RvcnksIHJlY3Vyc2l2ZSB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBhd2FpdCB0aGlzLmRiUmVxdWVzdCgnZGVsZXRlJywgW2Z1bGxQYXRoXSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGEgbGlzdCBvZiBmaWxlcyBmcm9tIHRoZSBkaXJlY3RvcnkgKG5vdCByZWN1cnNpdmUpXG4gICAqIEBwYXJhbSBvcHRpb25zIHRoZSBvcHRpb25zIGZvciB0aGUgcmVhZGRpciBvcGVyYXRpb25cbiAgICogQHJldHVybiBhIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSByZWFkZGlyIGRpcmVjdG9yeSBsaXN0aW5nIHJlc3VsdFxuICAgKi9cbiAgYXN5bmMgcmVhZGRpcihvcHRpb25zOiBSZWFkZGlyT3B0aW9ucyk6IFByb21pc2U8UmVhZGRpclJlc3VsdD4ge1xuICAgIGNvbnN0IHBhdGg6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aChvcHRpb25zLmRpcmVjdG9yeSwgb3B0aW9ucy5wYXRoKTtcblxuICAgIGNvbnN0IGVudHJ5ID0gKGF3YWl0IHRoaXMuZGJSZXF1ZXN0KCdnZXQnLCBbcGF0aF0pKSBhcyBFbnRyeU9iajtcbiAgICBpZiAob3B0aW9ucy5wYXRoICE9PSAnJyAmJiBlbnRyeSA9PT0gdW5kZWZpbmVkKSB0aHJvdyBFcnJvcignRm9sZGVyIGRvZXMgbm90IGV4aXN0LicpO1xuXG4gICAgY29uc3QgZW50cmllczogc3RyaW5nW10gPSBhd2FpdCB0aGlzLmRiSW5kZXhSZXF1ZXN0KCdieV9mb2xkZXInLCAnZ2V0QWxsS2V5cycsIFtJREJLZXlSYW5nZS5vbmx5KHBhdGgpXSk7XG4gICAgY29uc3QgZmlsZXMgPSBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgIGVudHJpZXMubWFwKGFzeW5jIChlKSA9PiB7XG4gICAgICAgIGxldCBzdWJFbnRyeSA9IChhd2FpdCB0aGlzLmRiUmVxdWVzdCgnZ2V0JywgW2VdKSkgYXMgRW50cnlPYmo7XG4gICAgICAgIGlmIChzdWJFbnRyeSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgc3ViRW50cnkgPSAoYXdhaXQgdGhpcy5kYlJlcXVlc3QoJ2dldCcsIFtlICsgJy8nXSkpIGFzIEVudHJ5T2JqO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgbmFtZTogZS5zdWJzdHJpbmcocGF0aC5sZW5ndGggKyAxKSxcbiAgICAgICAgICB0eXBlOiBzdWJFbnRyeS50eXBlLFxuICAgICAgICAgIHNpemU6IHN1YkVudHJ5LnNpemUsXG4gICAgICAgICAgY3RpbWU6IHN1YkVudHJ5LmN0aW1lLFxuICAgICAgICAgIG10aW1lOiBzdWJFbnRyeS5tdGltZSxcbiAgICAgICAgICB1cmk6IHN1YkVudHJ5LnBhdGgsXG4gICAgICAgIH07XG4gICAgICB9KSxcbiAgICApO1xuICAgIHJldHVybiB7IGZpbGVzOiBmaWxlcyB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBmdWxsIEZpbGUgVVJJIGZvciBhIHBhdGggYW5kIGRpcmVjdG9yeVxuICAgKiBAcGFyYW0gb3B0aW9ucyB0aGUgb3B0aW9ucyBmb3IgdGhlIHN0YXQgb3BlcmF0aW9uXG4gICAqIEByZXR1cm4gYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgZmlsZSBzdGF0IHJlc3VsdFxuICAgKi9cbiAgYXN5bmMgZ2V0VXJpKG9wdGlvbnM6IEdldFVyaU9wdGlvbnMpOiBQcm9taXNlPEdldFVyaVJlc3VsdD4ge1xuICAgIGNvbnN0IHBhdGg6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aChvcHRpb25zLmRpcmVjdG9yeSwgb3B0aW9ucy5wYXRoKTtcblxuICAgIGxldCBlbnRyeSA9IChhd2FpdCB0aGlzLmRiUmVxdWVzdCgnZ2V0JywgW3BhdGhdKSkgYXMgRW50cnlPYmo7XG4gICAgaWYgKGVudHJ5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGVudHJ5ID0gKGF3YWl0IHRoaXMuZGJSZXF1ZXN0KCdnZXQnLCBbcGF0aCArICcvJ10pKSBhcyBFbnRyeU9iajtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIHVyaTogZW50cnk/LnBhdGggfHwgcGF0aCxcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBkYXRhIGFib3V0IGEgZmlsZVxuICAgKiBAcGFyYW0gb3B0aW9ucyB0aGUgb3B0aW9ucyBmb3IgdGhlIHN0YXQgb3BlcmF0aW9uXG4gICAqIEByZXR1cm4gYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgZmlsZSBzdGF0IHJlc3VsdFxuICAgKi9cbiAgYXN5bmMgc3RhdChvcHRpb25zOiBTdGF0T3B0aW9ucyk6IFByb21pc2U8U3RhdFJlc3VsdD4ge1xuICAgIGNvbnN0IHBhdGg6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aChvcHRpb25zLmRpcmVjdG9yeSwgb3B0aW9ucy5wYXRoKTtcblxuICAgIGxldCBlbnRyeSA9IChhd2FpdCB0aGlzLmRiUmVxdWVzdCgnZ2V0JywgW3BhdGhdKSkgYXMgRW50cnlPYmo7XG4gICAgaWYgKGVudHJ5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGVudHJ5ID0gKGF3YWl0IHRoaXMuZGJSZXF1ZXN0KCdnZXQnLCBbcGF0aCArICcvJ10pKSBhcyBFbnRyeU9iajtcbiAgICB9XG4gICAgaWYgKGVudHJ5ID09PSB1bmRlZmluZWQpIHRocm93IEVycm9yKCdFbnRyeSBkb2VzIG5vdCBleGlzdC4nKTtcblxuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiBlbnRyeS5wYXRoLnN1YnN0cmluZyhwYXRoLmxlbmd0aCArIDEpLFxuICAgICAgdHlwZTogZW50cnkudHlwZSxcbiAgICAgIHNpemU6IGVudHJ5LnNpemUsXG4gICAgICBjdGltZTogZW50cnkuY3RpbWUsXG4gICAgICBtdGltZTogZW50cnkubXRpbWUsXG4gICAgICB1cmk6IGVudHJ5LnBhdGgsXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW5hbWUgYSBmaWxlIG9yIGRpcmVjdG9yeVxuICAgKiBAcGFyYW0gb3B0aW9ucyB0aGUgb3B0aW9ucyBmb3IgdGhlIHJlbmFtZSBvcGVyYXRpb25cbiAgICogQHJldHVybiBhIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSByZW5hbWUgcmVzdWx0XG4gICAqL1xuICBhc3luYyByZW5hbWUob3B0aW9uczogUmVuYW1lT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHRoaXMuX2NvcHkob3B0aW9ucywgdHJ1ZSk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLyoqXG4gICAqIENvcHkgYSBmaWxlIG9yIGRpcmVjdG9yeVxuICAgKiBAcGFyYW0gb3B0aW9ucyB0aGUgb3B0aW9ucyBmb3IgdGhlIGNvcHkgb3BlcmF0aW9uXG4gICAqIEByZXR1cm4gYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgY29weSByZXN1bHRcbiAgICovXG4gIGFzeW5jIGNvcHkob3B0aW9uczogQ29weU9wdGlvbnMpOiBQcm9taXNlPENvcHlSZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5fY29weShvcHRpb25zLCBmYWxzZSk7XG4gIH1cblxuICBhc3luYyByZXF1ZXN0UGVybWlzc2lvbnMoKTogUHJvbWlzZTxQZXJtaXNzaW9uU3RhdHVzPiB7XG4gICAgcmV0dXJuIHsgcHVibGljU3RvcmFnZTogJ2dyYW50ZWQnIH07XG4gIH1cblxuICBhc3luYyBjaGVja1Blcm1pc3Npb25zKCk6IFByb21pc2U8UGVybWlzc2lvblN0YXR1cz4ge1xuICAgIHJldHVybiB7IHB1YmxpY1N0b3JhZ2U6ICdncmFudGVkJyB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEZ1bmN0aW9uIHRoYXQgY2FuIHBlcmZvcm0gYSBjb3B5IG9yIGEgcmVuYW1lXG4gICAqIEBwYXJhbSBvcHRpb25zIHRoZSBvcHRpb25zIGZvciB0aGUgcmVuYW1lIG9wZXJhdGlvblxuICAgKiBAcGFyYW0gZG9SZW5hbWUgd2hldGhlciB0byBwZXJmb3JtIGEgcmVuYW1lIG9yIGNvcHkgb3BlcmF0aW9uXG4gICAqIEByZXR1cm4gYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgcmVzdWx0XG4gICAqL1xuICBwcml2YXRlIGFzeW5jIF9jb3B5KG9wdGlvbnM6IENvcHlPcHRpb25zLCBkb1JlbmFtZSA9IGZhbHNlKTogUHJvbWlzZTxDb3B5UmVzdWx0PiB7XG4gICAgbGV0IHsgdG9EaXJlY3RvcnkgfSA9IG9wdGlvbnM7XG4gICAgY29uc3QgeyB0bywgZnJvbSwgZGlyZWN0b3J5OiBmcm9tRGlyZWN0b3J5IH0gPSBvcHRpb25zO1xuXG4gICAgaWYgKCF0byB8fCAhZnJvbSkge1xuICAgICAgdGhyb3cgRXJyb3IoJ0JvdGggdG8gYW5kIGZyb20gbXVzdCBiZSBwcm92aWRlZCcpO1xuICAgIH1cblxuICAgIC8vIElmIG5vIFwidG9cIiBkaXJlY3RvcnkgaXMgcHJvdmlkZWQsIHVzZSB0aGUgXCJmcm9tXCIgZGlyZWN0b3J5XG4gICAgaWYgKCF0b0RpcmVjdG9yeSkge1xuICAgICAgdG9EaXJlY3RvcnkgPSBmcm9tRGlyZWN0b3J5O1xuICAgIH1cblxuICAgIGNvbnN0IGZyb21QYXRoID0gdGhpcy5nZXRQYXRoKGZyb21EaXJlY3RvcnksIGZyb20pO1xuICAgIGNvbnN0IHRvUGF0aCA9IHRoaXMuZ2V0UGF0aCh0b0RpcmVjdG9yeSwgdG8pO1xuXG4gICAgLy8gVGVzdCB0aGF0IHRoZSBcInRvXCIgYW5kIFwiZnJvbVwiIGxvY2F0aW9ucyBhcmUgZGlmZmVyZW50XG4gICAgaWYgKGZyb21QYXRoID09PSB0b1BhdGgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHVyaTogdG9QYXRoLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAoaXNQYXRoUGFyZW50KGZyb21QYXRoLCB0b1BhdGgpKSB7XG4gICAgICB0aHJvdyBFcnJvcignVG8gcGF0aCBjYW5ub3QgY29udGFpbiB0aGUgZnJvbSBwYXRoJyk7XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgdGhlIHN0YXRlIG9mIHRoZSBcInRvXCIgbG9jYXRpb25cbiAgICBsZXQgdG9PYmo7XG4gICAgdHJ5IHtcbiAgICAgIHRvT2JqID0gYXdhaXQgdGhpcy5zdGF0KHtcbiAgICAgICAgcGF0aDogdG8sXG4gICAgICAgIGRpcmVjdG9yeTogdG9EaXJlY3RvcnksXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBUbyBsb2NhdGlvbiBkb2VzIG5vdCBleGlzdCwgZW5zdXJlIHRoZSBkaXJlY3RvcnkgY29udGFpbmluZyBcInRvXCIgbG9jYXRpb24gZXhpc3RzIGFuZCBpcyBhIGRpcmVjdG9yeVxuICAgICAgY29uc3QgdG9QYXRoQ29tcG9uZW50cyA9IHRvLnNwbGl0KCcvJyk7XG4gICAgICB0b1BhdGhDb21wb25lbnRzLnBvcCgpO1xuICAgICAgY29uc3QgdG9QYXRoID0gdG9QYXRoQ29tcG9uZW50cy5qb2luKCcvJyk7XG5cbiAgICAgIC8vIENoZWNrIHRoZSBjb250YWluaW5nIGRpcmVjdG9yeSBvZiB0aGUgXCJ0b1wiIGxvY2F0aW9uIGV4aXN0c1xuICAgICAgaWYgKHRvUGF0aENvbXBvbmVudHMubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCB0b1BhcmVudERpcmVjdG9yeSA9IGF3YWl0IHRoaXMuc3RhdCh7XG4gICAgICAgICAgcGF0aDogdG9QYXRoLFxuICAgICAgICAgIGRpcmVjdG9yeTogdG9EaXJlY3RvcnksXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0b1BhcmVudERpcmVjdG9yeS50eXBlICE9PSAnZGlyZWN0b3J5Jykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUGFyZW50IGRpcmVjdG9yeSBvZiB0aGUgdG8gcGF0aCBpcyBhIGZpbGUnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIENhbm5vdCBvdmVyd3JpdGUgYSBkaXJlY3RvcnlcbiAgICBpZiAodG9PYmogJiYgdG9PYmoudHlwZSA9PT0gJ2RpcmVjdG9yeScpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IG92ZXJ3cml0ZSBhIGRpcmVjdG9yeSB3aXRoIGEgZmlsZScpO1xuICAgIH1cblxuICAgIC8vIEVuc3VyZSB0aGUgXCJmcm9tXCIgb2JqZWN0IGV4aXN0c1xuICAgIGNvbnN0IGZyb21PYmogPSBhd2FpdCB0aGlzLnN0YXQoe1xuICAgICAgcGF0aDogZnJvbSxcbiAgICAgIGRpcmVjdG9yeTogZnJvbURpcmVjdG9yeSxcbiAgICB9KTtcblxuICAgIC8vIFNldCB0aGUgbXRpbWUvY3RpbWUgb2YgdGhlIHN1cHBsaWVkIHBhdGhcbiAgICBjb25zdCB1cGRhdGVUaW1lID0gYXN5bmMgKHBhdGg6IHN0cmluZywgY3RpbWU6IG51bWJlciwgbXRpbWU6IG51bWJlcikgPT4ge1xuICAgICAgY29uc3QgZnVsbFBhdGg6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCh0b0RpcmVjdG9yeSwgcGF0aCk7XG4gICAgICBjb25zdCBlbnRyeSA9IChhd2FpdCB0aGlzLmRiUmVxdWVzdCgnZ2V0JywgW2Z1bGxQYXRoXSkpIGFzIEVudHJ5T2JqO1xuICAgICAgZW50cnkuY3RpbWUgPSBjdGltZTtcbiAgICAgIGVudHJ5Lm10aW1lID0gbXRpbWU7XG4gICAgICBhd2FpdCB0aGlzLmRiUmVxdWVzdCgncHV0JywgW2VudHJ5XSk7XG4gICAgfTtcblxuICAgIGNvbnN0IGN0aW1lID0gZnJvbU9iai5jdGltZSA/IGZyb21PYmouY3RpbWUgOiBEYXRlLm5vdygpO1xuXG4gICAgc3dpdGNoIChmcm9tT2JqLnR5cGUpIHtcbiAgICAgIC8vIFRoZSBcImZyb21cIiBvYmplY3QgaXMgYSBmaWxlXG4gICAgICBjYXNlICdmaWxlJzoge1xuICAgICAgICAvLyBSZWFkIHRoZSBmaWxlXG4gICAgICAgIGNvbnN0IGZpbGUgPSBhd2FpdCB0aGlzLnJlYWRGaWxlKHtcbiAgICAgICAgICBwYXRoOiBmcm9tLFxuICAgICAgICAgIGRpcmVjdG9yeTogZnJvbURpcmVjdG9yeSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gT3B0aW9uYWxseSByZW1vdmUgdGhlIGZpbGVcbiAgICAgICAgaWYgKGRvUmVuYW1lKSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5kZWxldGVGaWxlKHtcbiAgICAgICAgICAgIHBhdGg6IGZyb20sXG4gICAgICAgICAgICBkaXJlY3Rvcnk6IGZyb21EaXJlY3RvcnksXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZW5jb2Rpbmc7XG4gICAgICAgIGlmICghKGZpbGUuZGF0YSBpbnN0YW5jZW9mIEJsb2IpICYmICF0aGlzLmlzQmFzZTY0U3RyaW5nKGZpbGUuZGF0YSkpIHtcbiAgICAgICAgICBlbmNvZGluZyA9IEVuY29kaW5nLlVURjg7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBXcml0ZSB0aGUgZmlsZSB0byB0aGUgbmV3IGxvY2F0aW9uXG4gICAgICAgIGNvbnN0IHdyaXRlUmVzdWx0ID0gYXdhaXQgdGhpcy53cml0ZUZpbGUoe1xuICAgICAgICAgIHBhdGg6IHRvLFxuICAgICAgICAgIGRpcmVjdG9yeTogdG9EaXJlY3RvcnksXG4gICAgICAgICAgZGF0YTogZmlsZS5kYXRhLFxuICAgICAgICAgIGVuY29kaW5nOiBlbmNvZGluZyxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gQ29weSB0aGUgbXRpbWUvY3RpbWUgb2YgYSByZW5hbWVkIGZpbGVcbiAgICAgICAgaWYgKGRvUmVuYW1lKSB7XG4gICAgICAgICAgYXdhaXQgdXBkYXRlVGltZSh0bywgY3RpbWUsIGZyb21PYmoubXRpbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUmVzb2x2ZSBwcm9taXNlXG4gICAgICAgIHJldHVybiB3cml0ZVJlc3VsdDtcbiAgICAgIH1cbiAgICAgIGNhc2UgJ2RpcmVjdG9yeSc6IHtcbiAgICAgICAgaWYgKHRvT2JqKSB7XG4gICAgICAgICAgdGhyb3cgRXJyb3IoJ0Nhbm5vdCBtb3ZlIGEgZGlyZWN0b3J5IG92ZXIgYW4gZXhpc3Rpbmcgb2JqZWN0Jyk7XG4gICAgICAgIH1cblxuICAgICAgICB0cnkge1xuICAgICAgICAgIC8vIENyZWF0ZSB0aGUgdG8gZGlyZWN0b3J5XG4gICAgICAgICAgYXdhaXQgdGhpcy5ta2Rpcih7XG4gICAgICAgICAgICBwYXRoOiB0byxcbiAgICAgICAgICAgIGRpcmVjdG9yeTogdG9EaXJlY3RvcnksXG4gICAgICAgICAgICByZWN1cnNpdmU6IGZhbHNlLFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgLy8gQ29weSB0aGUgbXRpbWUvY3RpbWUgb2YgYSByZW5hbWVkIGRpcmVjdG9yeVxuICAgICAgICAgIGlmIChkb1JlbmFtZSkge1xuICAgICAgICAgICAgYXdhaXQgdXBkYXRlVGltZSh0bywgY3RpbWUsIGZyb21PYmoubXRpbWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIC8vIGlnbm9yZVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gSXRlcmF0ZSBvdmVyIHRoZSBjb250ZW50cyBvZiB0aGUgZnJvbSBsb2NhdGlvblxuICAgICAgICBjb25zdCBjb250ZW50cyA9IChcbiAgICAgICAgICBhd2FpdCB0aGlzLnJlYWRkaXIoe1xuICAgICAgICAgICAgcGF0aDogZnJvbSxcbiAgICAgICAgICAgIGRpcmVjdG9yeTogZnJvbURpcmVjdG9yeSxcbiAgICAgICAgICB9KVxuICAgICAgICApLmZpbGVzO1xuXG4gICAgICAgIGZvciAoY29uc3QgZmlsZW5hbWUgb2YgY29udGVudHMpIHtcbiAgICAgICAgICAvLyBNb3ZlIGl0ZW0gZnJvbSB0aGUgZnJvbSBkaXJlY3RvcnkgdG8gdGhlIHRvIGRpcmVjdG9yeVxuICAgICAgICAgIGF3YWl0IHRoaXMuX2NvcHkoXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGZyb206IGAke2Zyb219LyR7ZmlsZW5hbWUubmFtZX1gLFxuICAgICAgICAgICAgICB0bzogYCR7dG99LyR7ZmlsZW5hbWUubmFtZX1gLFxuICAgICAgICAgICAgICBkaXJlY3Rvcnk6IGZyb21EaXJlY3RvcnksXG4gICAgICAgICAgICAgIHRvRGlyZWN0b3J5LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRvUmVuYW1lLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBPcHRpb25hbGx5IHJlbW92ZSB0aGUgb3JpZ2luYWwgZnJvbSBkaXJlY3RvcnlcbiAgICAgICAgaWYgKGRvUmVuYW1lKSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5ybWRpcih7XG4gICAgICAgICAgICBwYXRoOiBmcm9tLFxuICAgICAgICAgICAgZGlyZWN0b3J5OiBmcm9tRGlyZWN0b3J5LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICB1cmk6IHRvUGF0aCxcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEZ1bmN0aW9uIHRoYXQgcGVyZm9ybXMgYSBodHRwIHJlcXVlc3QgdG8gYSBzZXJ2ZXIgYW5kIGRvd25sb2FkcyB0aGUgZmlsZSB0byB0aGUgc3BlY2lmaWVkIGRlc3RpbmF0aW9uXG4gICAqXG4gICAqIEBkZXByZWNhdGVkIFVzZSB0aGUgQGNhcGFjaXRvci9maWxlLXRyYW5zZmVyIHBsdWdpbiBpbnN0ZWFkLlxuICAgKiBAcGFyYW0gb3B0aW9ucyB0aGUgb3B0aW9ucyBmb3IgdGhlIGRvd25sb2FkIG9wZXJhdGlvblxuICAgKiBAcmV0dXJucyBhIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBkb3dubG9hZCBmaWxlIHJlc3VsdFxuICAgKi9cbiAgcHVibGljIGRvd25sb2FkRmlsZSA9IGFzeW5jIChvcHRpb25zOiBEb3dubG9hZEZpbGVPcHRpb25zKTogUHJvbWlzZTxEb3dubG9hZEZpbGVSZXN1bHQ+ID0+IHtcbiAgICBjb25zdCByZXF1ZXN0SW5pdCA9IGJ1aWxkUmVxdWVzdEluaXQob3B0aW9ucywgb3B0aW9ucy53ZWJGZXRjaEV4dHJhKTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKG9wdGlvbnMudXJsLCByZXF1ZXN0SW5pdCk7XG4gICAgbGV0IGJsb2I6IEJsb2I7XG5cbiAgICBpZiAoIW9wdGlvbnMucHJvZ3Jlc3MpIGJsb2IgPSBhd2FpdCByZXNwb25zZS5ibG9iKCk7XG4gICAgZWxzZSBpZiAoIXJlc3BvbnNlPy5ib2R5KSBibG9iID0gbmV3IEJsb2IoKTtcbiAgICBlbHNlIHtcbiAgICAgIGNvbnN0IHJlYWRlciA9IHJlc3BvbnNlLmJvZHkuZ2V0UmVhZGVyKCk7XG5cbiAgICAgIGxldCBieXRlcyA9IDA7XG4gICAgICBjb25zdCBjaHVua3M6IChVaW50OEFycmF5IHwgdW5kZWZpbmVkKVtdID0gW107XG5cbiAgICAgIGNvbnN0IGNvbnRlbnRUeXBlOiBzdHJpbmcgfCBudWxsID0gcmVzcG9uc2UuaGVhZGVycy5nZXQoJ2NvbnRlbnQtdHlwZScpO1xuICAgICAgY29uc3QgY29udGVudExlbmd0aDogbnVtYmVyID0gcGFyc2VJbnQocmVzcG9uc2UuaGVhZGVycy5nZXQoJ2NvbnRlbnQtbGVuZ3RoJykgfHwgJzAnLCAxMCk7XG5cbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIGNvbnN0IHsgZG9uZSwgdmFsdWUgfSA9IGF3YWl0IHJlYWRlci5yZWFkKCk7XG5cbiAgICAgICAgaWYgKGRvbmUpIGJyZWFrO1xuXG4gICAgICAgIGNodW5rcy5wdXNoKHZhbHVlKTtcbiAgICAgICAgYnl0ZXMgKz0gdmFsdWU/Lmxlbmd0aCB8fCAwO1xuXG4gICAgICAgIGNvbnN0IHN0YXR1czogUHJvZ3Jlc3NTdGF0dXMgPSB7XG4gICAgICAgICAgdXJsOiBvcHRpb25zLnVybCxcbiAgICAgICAgICBieXRlcyxcbiAgICAgICAgICBjb250ZW50TGVuZ3RoLFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMubm90aWZ5TGlzdGVuZXJzKCdwcm9ncmVzcycsIHN0YXR1cyk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGFsbENodW5rcyA9IG5ldyBVaW50OEFycmF5KGJ5dGVzKTtcbiAgICAgIGxldCBwb3NpdGlvbiA9IDA7XG4gICAgICBmb3IgKGNvbnN0IGNodW5rIG9mIGNodW5rcykge1xuICAgICAgICBpZiAodHlwZW9mIGNodW5rID09PSAndW5kZWZpbmVkJykgY29udGludWU7XG5cbiAgICAgICAgYWxsQ2h1bmtzLnNldChjaHVuaywgcG9zaXRpb24pO1xuICAgICAgICBwb3NpdGlvbiArPSBjaHVuay5sZW5ndGg7XG4gICAgICB9XG5cbiAgICAgIGJsb2IgPSBuZXcgQmxvYihbYWxsQ2h1bmtzLmJ1ZmZlcl0sIHsgdHlwZTogY29udGVudFR5cGUgfHwgdW5kZWZpbmVkIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMud3JpdGVGaWxlKHtcbiAgICAgIHBhdGg6IG9wdGlvbnMucGF0aCxcbiAgICAgIGRpcmVjdG9yeTogb3B0aW9ucy5kaXJlY3RvcnkgPz8gdW5kZWZpbmVkLFxuICAgICAgcmVjdXJzaXZlOiBvcHRpb25zLnJlY3Vyc2l2ZSA/PyBmYWxzZSxcbiAgICAgIGRhdGE6IGJsb2IsXG4gICAgfSk7XG5cbiAgICByZXR1cm4geyBwYXRoOiByZXN1bHQudXJpLCBibG9iIH07XG4gIH07XG5cbiAgcHJpdmF0ZSBpc0Jhc2U2NFN0cmluZyhzdHI6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gYnRvYShhdG9iKHN0cikpID09IHN0cjtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbn1cblxuaW50ZXJmYWNlIEVudHJ5T2JqIHtcbiAgcGF0aDogc3RyaW5nO1xuICBmb2xkZXI6IHN0cmluZztcbiAgdHlwZTogJ2RpcmVjdG9yeScgfCAnZmlsZSc7XG4gIHNpemU6IG51bWJlcjtcbiAgY3RpbWU6IG51bWJlcjtcbiAgbXRpbWU6IG51bWJlcjtcbiAgdXJpPzogc3RyaW5nO1xuICBjb250ZW50Pzogc3RyaW5nIHwgQmxvYjtcbn1cbiIsICJpbXBvcnQgeyBXZWJQbHVnaW4gfSBmcm9tICdAY2FwYWNpdG9yL2NvcmUnO1xuXG5pbXBvcnQgdHlwZSB7IEJyb3dzZXJQbHVnaW4sIE9wZW5PcHRpb25zIH0gZnJvbSAnLi9kZWZpbml0aW9ucyc7XG5cbmV4cG9ydCBjbGFzcyBCcm93c2VyV2ViIGV4dGVuZHMgV2ViUGx1Z2luIGltcGxlbWVudHMgQnJvd3NlclBsdWdpbiB7XG4gIF9sYXN0V2luZG93OiBXaW5kb3cgfCBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fbGFzdFdpbmRvdyA9IG51bGw7XG4gIH1cblxuICBhc3luYyBvcGVuKG9wdGlvbnM6IE9wZW5PcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhpcy5fbGFzdFdpbmRvdyA9IHdpbmRvdy5vcGVuKG9wdGlvbnMudXJsLCBvcHRpb25zLndpbmRvd05hbWUgfHwgJ19ibGFuaycpO1xuICB9XG5cbiAgYXN5bmMgY2xvc2UoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGlmICh0aGlzLl9sYXN0V2luZG93ICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5fbGFzdFdpbmRvdy5jbG9zZSgpO1xuICAgICAgICB0aGlzLl9sYXN0V2luZG93ID0gbnVsbDtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVqZWN0KCdObyBhY3RpdmUgd2luZG93IHRvIGNsb3NlIScpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbmNvbnN0IEJyb3dzZXIgPSBuZXcgQnJvd3NlcldlYigpO1xuXG5leHBvcnQgeyBCcm93c2VyIH07XG4iLCAiLy8gJ3BhdGgnIG1vZHVsZSBleHRyYWN0ZWQgZnJvbSBOb2RlLmpzIHY4LjExLjEgKG9ubHkgdGhlIHBvc2l4IHBhcnQpXG4vLyB0cmFuc3BsaXRlZCB3aXRoIEJhYmVsXG5cbi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4ndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIGFzc2VydFBhdGgocGF0aCkge1xuICBpZiAodHlwZW9mIHBhdGggIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUGF0aCBtdXN0IGJlIGEgc3RyaW5nLiBSZWNlaXZlZCAnICsgSlNPTi5zdHJpbmdpZnkocGF0aCkpO1xuICB9XG59XG5cbi8vIFJlc29sdmVzIC4gYW5kIC4uIGVsZW1lbnRzIGluIGEgcGF0aCB3aXRoIGRpcmVjdG9yeSBuYW1lc1xuZnVuY3Rpb24gbm9ybWFsaXplU3RyaW5nUG9zaXgocGF0aCwgYWxsb3dBYm92ZVJvb3QpIHtcbiAgdmFyIHJlcyA9ICcnO1xuICB2YXIgbGFzdFNlZ21lbnRMZW5ndGggPSAwO1xuICB2YXIgbGFzdFNsYXNoID0gLTE7XG4gIHZhciBkb3RzID0gMDtcbiAgdmFyIGNvZGU7XG4gIGZvciAodmFyIGkgPSAwOyBpIDw9IHBhdGgubGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoaSA8IHBhdGgubGVuZ3RoKVxuICAgICAgY29kZSA9IHBhdGguY2hhckNvZGVBdChpKTtcbiAgICBlbHNlIGlmIChjb2RlID09PSA0NyAvKi8qLylcbiAgICAgIGJyZWFrO1xuICAgIGVsc2VcbiAgICAgIGNvZGUgPSA0NyAvKi8qLztcbiAgICBpZiAoY29kZSA9PT0gNDcgLyovKi8pIHtcbiAgICAgIGlmIChsYXN0U2xhc2ggPT09IGkgLSAxIHx8IGRvdHMgPT09IDEpIHtcbiAgICAgICAgLy8gTk9PUFxuICAgICAgfSBlbHNlIGlmIChsYXN0U2xhc2ggIT09IGkgLSAxICYmIGRvdHMgPT09IDIpIHtcbiAgICAgICAgaWYgKHJlcy5sZW5ndGggPCAyIHx8IGxhc3RTZWdtZW50TGVuZ3RoICE9PSAyIHx8IHJlcy5jaGFyQ29kZUF0KHJlcy5sZW5ndGggLSAxKSAhPT0gNDYgLyouKi8gfHwgcmVzLmNoYXJDb2RlQXQocmVzLmxlbmd0aCAtIDIpICE9PSA0NiAvKi4qLykge1xuICAgICAgICAgIGlmIChyZXMubGVuZ3RoID4gMikge1xuICAgICAgICAgICAgdmFyIGxhc3RTbGFzaEluZGV4ID0gcmVzLmxhc3RJbmRleE9mKCcvJyk7XG4gICAgICAgICAgICBpZiAobGFzdFNsYXNoSW5kZXggIT09IHJlcy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgIGlmIChsYXN0U2xhc2hJbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICByZXMgPSAnJztcbiAgICAgICAgICAgICAgICBsYXN0U2VnbWVudExlbmd0aCA9IDA7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzID0gcmVzLnNsaWNlKDAsIGxhc3RTbGFzaEluZGV4KTtcbiAgICAgICAgICAgICAgICBsYXN0U2VnbWVudExlbmd0aCA9IHJlcy5sZW5ndGggLSAxIC0gcmVzLmxhc3RJbmRleE9mKCcvJyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgbGFzdFNsYXNoID0gaTtcbiAgICAgICAgICAgICAgZG90cyA9IDA7XG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAocmVzLmxlbmd0aCA9PT0gMiB8fCByZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICByZXMgPSAnJztcbiAgICAgICAgICAgIGxhc3RTZWdtZW50TGVuZ3RoID0gMDtcbiAgICAgICAgICAgIGxhc3RTbGFzaCA9IGk7XG4gICAgICAgICAgICBkb3RzID0gMDtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoYWxsb3dBYm92ZVJvb3QpIHtcbiAgICAgICAgICBpZiAocmVzLmxlbmd0aCA+IDApXG4gICAgICAgICAgICByZXMgKz0gJy8uLic7XG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmVzID0gJy4uJztcbiAgICAgICAgICBsYXN0U2VnbWVudExlbmd0aCA9IDI7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChyZXMubGVuZ3RoID4gMClcbiAgICAgICAgICByZXMgKz0gJy8nICsgcGF0aC5zbGljZShsYXN0U2xhc2ggKyAxLCBpKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHJlcyA9IHBhdGguc2xpY2UobGFzdFNsYXNoICsgMSwgaSk7XG4gICAgICAgIGxhc3RTZWdtZW50TGVuZ3RoID0gaSAtIGxhc3RTbGFzaCAtIDE7XG4gICAgICB9XG4gICAgICBsYXN0U2xhc2ggPSBpO1xuICAgICAgZG90cyA9IDA7XG4gICAgfSBlbHNlIGlmIChjb2RlID09PSA0NiAvKi4qLyAmJiBkb3RzICE9PSAtMSkge1xuICAgICAgKytkb3RzO1xuICAgIH0gZWxzZSB7XG4gICAgICBkb3RzID0gLTE7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXM7XG59XG5cbmZ1bmN0aW9uIF9mb3JtYXQoc2VwLCBwYXRoT2JqZWN0KSB7XG4gIHZhciBkaXIgPSBwYXRoT2JqZWN0LmRpciB8fCBwYXRoT2JqZWN0LnJvb3Q7XG4gIHZhciBiYXNlID0gcGF0aE9iamVjdC5iYXNlIHx8IChwYXRoT2JqZWN0Lm5hbWUgfHwgJycpICsgKHBhdGhPYmplY3QuZXh0IHx8ICcnKTtcbiAgaWYgKCFkaXIpIHtcbiAgICByZXR1cm4gYmFzZTtcbiAgfVxuICBpZiAoZGlyID09PSBwYXRoT2JqZWN0LnJvb3QpIHtcbiAgICByZXR1cm4gZGlyICsgYmFzZTtcbiAgfVxuICByZXR1cm4gZGlyICsgc2VwICsgYmFzZTtcbn1cblxudmFyIHBvc2l4ID0ge1xuICAvLyBwYXRoLnJlc29sdmUoW2Zyb20gLi4uXSwgdG8pXG4gIHJlc29sdmU6IGZ1bmN0aW9uIHJlc29sdmUoKSB7XG4gICAgdmFyIHJlc29sdmVkUGF0aCA9ICcnO1xuICAgIHZhciByZXNvbHZlZEFic29sdXRlID0gZmFsc2U7XG4gICAgdmFyIGN3ZDtcblxuICAgIGZvciAodmFyIGkgPSBhcmd1bWVudHMubGVuZ3RoIC0gMTsgaSA+PSAtMSAmJiAhcmVzb2x2ZWRBYnNvbHV0ZTsgaS0tKSB7XG4gICAgICB2YXIgcGF0aDtcbiAgICAgIGlmIChpID49IDApXG4gICAgICAgIHBhdGggPSBhcmd1bWVudHNbaV07XG4gICAgICBlbHNlIHtcbiAgICAgICAgaWYgKGN3ZCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgIGN3ZCA9IHByb2Nlc3MuY3dkKCk7XG4gICAgICAgIHBhdGggPSBjd2Q7XG4gICAgICB9XG5cbiAgICAgIGFzc2VydFBhdGgocGF0aCk7XG5cbiAgICAgIC8vIFNraXAgZW1wdHkgZW50cmllc1xuICAgICAgaWYgKHBhdGgubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICByZXNvbHZlZFBhdGggPSBwYXRoICsgJy8nICsgcmVzb2x2ZWRQYXRoO1xuICAgICAgcmVzb2x2ZWRBYnNvbHV0ZSA9IHBhdGguY2hhckNvZGVBdCgwKSA9PT0gNDcgLyovKi87XG4gICAgfVxuXG4gICAgLy8gQXQgdGhpcyBwb2ludCB0aGUgcGF0aCBzaG91bGQgYmUgcmVzb2x2ZWQgdG8gYSBmdWxsIGFic29sdXRlIHBhdGgsIGJ1dFxuICAgIC8vIGhhbmRsZSByZWxhdGl2ZSBwYXRocyB0byBiZSBzYWZlIChtaWdodCBoYXBwZW4gd2hlbiBwcm9jZXNzLmN3ZCgpIGZhaWxzKVxuXG4gICAgLy8gTm9ybWFsaXplIHRoZSBwYXRoXG4gICAgcmVzb2x2ZWRQYXRoID0gbm9ybWFsaXplU3RyaW5nUG9zaXgocmVzb2x2ZWRQYXRoLCAhcmVzb2x2ZWRBYnNvbHV0ZSk7XG5cbiAgICBpZiAocmVzb2x2ZWRBYnNvbHV0ZSkge1xuICAgICAgaWYgKHJlc29sdmVkUGF0aC5sZW5ndGggPiAwKVxuICAgICAgICByZXR1cm4gJy8nICsgcmVzb2x2ZWRQYXRoO1xuICAgICAgZWxzZVxuICAgICAgICByZXR1cm4gJy8nO1xuICAgIH0gZWxzZSBpZiAocmVzb2x2ZWRQYXRoLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiByZXNvbHZlZFBhdGg7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnLic7XG4gICAgfVxuICB9LFxuXG4gIG5vcm1hbGl6ZTogZnVuY3Rpb24gbm9ybWFsaXplKHBhdGgpIHtcbiAgICBhc3NlcnRQYXRoKHBhdGgpO1xuXG4gICAgaWYgKHBhdGgubGVuZ3RoID09PSAwKSByZXR1cm4gJy4nO1xuXG4gICAgdmFyIGlzQWJzb2x1dGUgPSBwYXRoLmNoYXJDb2RlQXQoMCkgPT09IDQ3IC8qLyovO1xuICAgIHZhciB0cmFpbGluZ1NlcGFyYXRvciA9IHBhdGguY2hhckNvZGVBdChwYXRoLmxlbmd0aCAtIDEpID09PSA0NyAvKi8qLztcblxuICAgIC8vIE5vcm1hbGl6ZSB0aGUgcGF0aFxuICAgIHBhdGggPSBub3JtYWxpemVTdHJpbmdQb3NpeChwYXRoLCAhaXNBYnNvbHV0ZSk7XG5cbiAgICBpZiAocGF0aC5sZW5ndGggPT09IDAgJiYgIWlzQWJzb2x1dGUpIHBhdGggPSAnLic7XG4gICAgaWYgKHBhdGgubGVuZ3RoID4gMCAmJiB0cmFpbGluZ1NlcGFyYXRvcikgcGF0aCArPSAnLyc7XG5cbiAgICBpZiAoaXNBYnNvbHV0ZSkgcmV0dXJuICcvJyArIHBhdGg7XG4gICAgcmV0dXJuIHBhdGg7XG4gIH0sXG5cbiAgaXNBYnNvbHV0ZTogZnVuY3Rpb24gaXNBYnNvbHV0ZShwYXRoKSB7XG4gICAgYXNzZXJ0UGF0aChwYXRoKTtcbiAgICByZXR1cm4gcGF0aC5sZW5ndGggPiAwICYmIHBhdGguY2hhckNvZGVBdCgwKSA9PT0gNDcgLyovKi87XG4gIH0sXG5cbiAgam9pbjogZnVuY3Rpb24gam9pbigpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMClcbiAgICAgIHJldHVybiAnLic7XG4gICAgdmFyIGpvaW5lZDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7ICsraSkge1xuICAgICAgdmFyIGFyZyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgIGFzc2VydFBhdGgoYXJnKTtcbiAgICAgIGlmIChhcmcubGVuZ3RoID4gMCkge1xuICAgICAgICBpZiAoam9pbmVkID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgam9pbmVkID0gYXJnO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgam9pbmVkICs9ICcvJyArIGFyZztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGpvaW5lZCA9PT0gdW5kZWZpbmVkKVxuICAgICAgcmV0dXJuICcuJztcbiAgICByZXR1cm4gcG9zaXgubm9ybWFsaXplKGpvaW5lZCk7XG4gIH0sXG5cbiAgcmVsYXRpdmU6IGZ1bmN0aW9uIHJlbGF0aXZlKGZyb20sIHRvKSB7XG4gICAgYXNzZXJ0UGF0aChmcm9tKTtcbiAgICBhc3NlcnRQYXRoKHRvKTtcblxuICAgIGlmIChmcm9tID09PSB0bykgcmV0dXJuICcnO1xuXG4gICAgZnJvbSA9IHBvc2l4LnJlc29sdmUoZnJvbSk7XG4gICAgdG8gPSBwb3NpeC5yZXNvbHZlKHRvKTtcblxuICAgIGlmIChmcm9tID09PSB0bykgcmV0dXJuICcnO1xuXG4gICAgLy8gVHJpbSBhbnkgbGVhZGluZyBiYWNrc2xhc2hlc1xuICAgIHZhciBmcm9tU3RhcnQgPSAxO1xuICAgIGZvciAoOyBmcm9tU3RhcnQgPCBmcm9tLmxlbmd0aDsgKytmcm9tU3RhcnQpIHtcbiAgICAgIGlmIChmcm9tLmNoYXJDb2RlQXQoZnJvbVN0YXJ0KSAhPT0gNDcgLyovKi8pXG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICB2YXIgZnJvbUVuZCA9IGZyb20ubGVuZ3RoO1xuICAgIHZhciBmcm9tTGVuID0gZnJvbUVuZCAtIGZyb21TdGFydDtcblxuICAgIC8vIFRyaW0gYW55IGxlYWRpbmcgYmFja3NsYXNoZXNcbiAgICB2YXIgdG9TdGFydCA9IDE7XG4gICAgZm9yICg7IHRvU3RhcnQgPCB0by5sZW5ndGg7ICsrdG9TdGFydCkge1xuICAgICAgaWYgKHRvLmNoYXJDb2RlQXQodG9TdGFydCkgIT09IDQ3IC8qLyovKVxuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgdmFyIHRvRW5kID0gdG8ubGVuZ3RoO1xuICAgIHZhciB0b0xlbiA9IHRvRW5kIC0gdG9TdGFydDtcblxuICAgIC8vIENvbXBhcmUgcGF0aHMgdG8gZmluZCB0aGUgbG9uZ2VzdCBjb21tb24gcGF0aCBmcm9tIHJvb3RcbiAgICB2YXIgbGVuZ3RoID0gZnJvbUxlbiA8IHRvTGVuID8gZnJvbUxlbiA6IHRvTGVuO1xuICAgIHZhciBsYXN0Q29tbW9uU2VwID0gLTE7XG4gICAgdmFyIGkgPSAwO1xuICAgIGZvciAoOyBpIDw9IGxlbmd0aDsgKytpKSB7XG4gICAgICBpZiAoaSA9PT0gbGVuZ3RoKSB7XG4gICAgICAgIGlmICh0b0xlbiA+IGxlbmd0aCkge1xuICAgICAgICAgIGlmICh0by5jaGFyQ29kZUF0KHRvU3RhcnQgKyBpKSA9PT0gNDcgLyovKi8pIHtcbiAgICAgICAgICAgIC8vIFdlIGdldCBoZXJlIGlmIGBmcm9tYCBpcyB0aGUgZXhhY3QgYmFzZSBwYXRoIGZvciBgdG9gLlxuICAgICAgICAgICAgLy8gRm9yIGV4YW1wbGU6IGZyb209Jy9mb28vYmFyJzsgdG89Jy9mb28vYmFyL2JheidcbiAgICAgICAgICAgIHJldHVybiB0by5zbGljZSh0b1N0YXJ0ICsgaSArIDEpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoaSA9PT0gMCkge1xuICAgICAgICAgICAgLy8gV2UgZ2V0IGhlcmUgaWYgYGZyb21gIGlzIHRoZSByb290XG4gICAgICAgICAgICAvLyBGb3IgZXhhbXBsZTogZnJvbT0nLyc7IHRvPScvZm9vJ1xuICAgICAgICAgICAgcmV0dXJuIHRvLnNsaWNlKHRvU3RhcnQgKyBpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoZnJvbUxlbiA+IGxlbmd0aCkge1xuICAgICAgICAgIGlmIChmcm9tLmNoYXJDb2RlQXQoZnJvbVN0YXJ0ICsgaSkgPT09IDQ3IC8qLyovKSB7XG4gICAgICAgICAgICAvLyBXZSBnZXQgaGVyZSBpZiBgdG9gIGlzIHRoZSBleGFjdCBiYXNlIHBhdGggZm9yIGBmcm9tYC5cbiAgICAgICAgICAgIC8vIEZvciBleGFtcGxlOiBmcm9tPScvZm9vL2Jhci9iYXonOyB0bz0nL2Zvby9iYXInXG4gICAgICAgICAgICBsYXN0Q29tbW9uU2VwID0gaTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGkgPT09IDApIHtcbiAgICAgICAgICAgIC8vIFdlIGdldCBoZXJlIGlmIGB0b2AgaXMgdGhlIHJvb3QuXG4gICAgICAgICAgICAvLyBGb3IgZXhhbXBsZTogZnJvbT0nL2Zvbyc7IHRvPScvJ1xuICAgICAgICAgICAgbGFzdENvbW1vblNlcCA9IDA7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgdmFyIGZyb21Db2RlID0gZnJvbS5jaGFyQ29kZUF0KGZyb21TdGFydCArIGkpO1xuICAgICAgdmFyIHRvQ29kZSA9IHRvLmNoYXJDb2RlQXQodG9TdGFydCArIGkpO1xuICAgICAgaWYgKGZyb21Db2RlICE9PSB0b0NvZGUpXG4gICAgICAgIGJyZWFrO1xuICAgICAgZWxzZSBpZiAoZnJvbUNvZGUgPT09IDQ3IC8qLyovKVxuICAgICAgICBsYXN0Q29tbW9uU2VwID0gaTtcbiAgICB9XG5cbiAgICB2YXIgb3V0ID0gJyc7XG4gICAgLy8gR2VuZXJhdGUgdGhlIHJlbGF0aXZlIHBhdGggYmFzZWQgb24gdGhlIHBhdGggZGlmZmVyZW5jZSBiZXR3ZWVuIGB0b2BcbiAgICAvLyBhbmQgYGZyb21gXG4gICAgZm9yIChpID0gZnJvbVN0YXJ0ICsgbGFzdENvbW1vblNlcCArIDE7IGkgPD0gZnJvbUVuZDsgKytpKSB7XG4gICAgICBpZiAoaSA9PT0gZnJvbUVuZCB8fCBmcm9tLmNoYXJDb2RlQXQoaSkgPT09IDQ3IC8qLyovKSB7XG4gICAgICAgIGlmIChvdXQubGVuZ3RoID09PSAwKVxuICAgICAgICAgIG91dCArPSAnLi4nO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgb3V0ICs9ICcvLi4nO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIExhc3RseSwgYXBwZW5kIHRoZSByZXN0IG9mIHRoZSBkZXN0aW5hdGlvbiAoYHRvYCkgcGF0aCB0aGF0IGNvbWVzIGFmdGVyXG4gICAgLy8gdGhlIGNvbW1vbiBwYXRoIHBhcnRzXG4gICAgaWYgKG91dC5sZW5ndGggPiAwKVxuICAgICAgcmV0dXJuIG91dCArIHRvLnNsaWNlKHRvU3RhcnQgKyBsYXN0Q29tbW9uU2VwKTtcbiAgICBlbHNlIHtcbiAgICAgIHRvU3RhcnQgKz0gbGFzdENvbW1vblNlcDtcbiAgICAgIGlmICh0by5jaGFyQ29kZUF0KHRvU3RhcnQpID09PSA0NyAvKi8qLylcbiAgICAgICAgKyt0b1N0YXJ0O1xuICAgICAgcmV0dXJuIHRvLnNsaWNlKHRvU3RhcnQpO1xuICAgIH1cbiAgfSxcblxuICBfbWFrZUxvbmc6IGZ1bmN0aW9uIF9tYWtlTG9uZyhwYXRoKSB7XG4gICAgcmV0dXJuIHBhdGg7XG4gIH0sXG5cbiAgZGlybmFtZTogZnVuY3Rpb24gZGlybmFtZShwYXRoKSB7XG4gICAgYXNzZXJ0UGF0aChwYXRoKTtcbiAgICBpZiAocGF0aC5sZW5ndGggPT09IDApIHJldHVybiAnLic7XG4gICAgdmFyIGNvZGUgPSBwYXRoLmNoYXJDb2RlQXQoMCk7XG4gICAgdmFyIGhhc1Jvb3QgPSBjb2RlID09PSA0NyAvKi8qLztcbiAgICB2YXIgZW5kID0gLTE7XG4gICAgdmFyIG1hdGNoZWRTbGFzaCA9IHRydWU7XG4gICAgZm9yICh2YXIgaSA9IHBhdGgubGVuZ3RoIC0gMTsgaSA+PSAxOyAtLWkpIHtcbiAgICAgIGNvZGUgPSBwYXRoLmNoYXJDb2RlQXQoaSk7XG4gICAgICBpZiAoY29kZSA9PT0gNDcgLyovKi8pIHtcbiAgICAgICAgICBpZiAoIW1hdGNoZWRTbGFzaCkge1xuICAgICAgICAgICAgZW5kID0gaTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gV2Ugc2F3IHRoZSBmaXJzdCBub24tcGF0aCBzZXBhcmF0b3JcbiAgICAgICAgbWF0Y2hlZFNsYXNoID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGVuZCA9PT0gLTEpIHJldHVybiBoYXNSb290ID8gJy8nIDogJy4nO1xuICAgIGlmIChoYXNSb290ICYmIGVuZCA9PT0gMSkgcmV0dXJuICcvLyc7XG4gICAgcmV0dXJuIHBhdGguc2xpY2UoMCwgZW5kKTtcbiAgfSxcblxuICBiYXNlbmFtZTogZnVuY3Rpb24gYmFzZW5hbWUocGF0aCwgZXh0KSB7XG4gICAgaWYgKGV4dCAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBleHQgIT09ICdzdHJpbmcnKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImV4dFwiIGFyZ3VtZW50IG11c3QgYmUgYSBzdHJpbmcnKTtcbiAgICBhc3NlcnRQYXRoKHBhdGgpO1xuXG4gICAgdmFyIHN0YXJ0ID0gMDtcbiAgICB2YXIgZW5kID0gLTE7XG4gICAgdmFyIG1hdGNoZWRTbGFzaCA9IHRydWU7XG4gICAgdmFyIGk7XG5cbiAgICBpZiAoZXh0ICE9PSB1bmRlZmluZWQgJiYgZXh0Lmxlbmd0aCA+IDAgJiYgZXh0Lmxlbmd0aCA8PSBwYXRoLmxlbmd0aCkge1xuICAgICAgaWYgKGV4dC5sZW5ndGggPT09IHBhdGgubGVuZ3RoICYmIGV4dCA9PT0gcGF0aCkgcmV0dXJuICcnO1xuICAgICAgdmFyIGV4dElkeCA9IGV4dC5sZW5ndGggLSAxO1xuICAgICAgdmFyIGZpcnN0Tm9uU2xhc2hFbmQgPSAtMTtcbiAgICAgIGZvciAoaSA9IHBhdGgubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGNvZGUgPSBwYXRoLmNoYXJDb2RlQXQoaSk7XG4gICAgICAgIGlmIChjb2RlID09PSA0NyAvKi8qLykge1xuICAgICAgICAgICAgLy8gSWYgd2UgcmVhY2hlZCBhIHBhdGggc2VwYXJhdG9yIHRoYXQgd2FzIG5vdCBwYXJ0IG9mIGEgc2V0IG9mIHBhdGhcbiAgICAgICAgICAgIC8vIHNlcGFyYXRvcnMgYXQgdGhlIGVuZCBvZiB0aGUgc3RyaW5nLCBzdG9wIG5vd1xuICAgICAgICAgICAgaWYgKCFtYXRjaGVkU2xhc2gpIHtcbiAgICAgICAgICAgICAgc3RhcnQgPSBpICsgMTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoZmlyc3ROb25TbGFzaEVuZCA9PT0gLTEpIHtcbiAgICAgICAgICAgIC8vIFdlIHNhdyB0aGUgZmlyc3Qgbm9uLXBhdGggc2VwYXJhdG9yLCByZW1lbWJlciB0aGlzIGluZGV4IGluIGNhc2VcbiAgICAgICAgICAgIC8vIHdlIG5lZWQgaXQgaWYgdGhlIGV4dGVuc2lvbiBlbmRzIHVwIG5vdCBtYXRjaGluZ1xuICAgICAgICAgICAgbWF0Y2hlZFNsYXNoID0gZmFsc2U7XG4gICAgICAgICAgICBmaXJzdE5vblNsYXNoRW5kID0gaSArIDE7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChleHRJZHggPj0gMCkge1xuICAgICAgICAgICAgLy8gVHJ5IHRvIG1hdGNoIHRoZSBleHBsaWNpdCBleHRlbnNpb25cbiAgICAgICAgICAgIGlmIChjb2RlID09PSBleHQuY2hhckNvZGVBdChleHRJZHgpKSB7XG4gICAgICAgICAgICAgIGlmICgtLWV4dElkeCA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAvLyBXZSBtYXRjaGVkIHRoZSBleHRlbnNpb24sIHNvIG1hcmsgdGhpcyBhcyB0aGUgZW5kIG9mIG91ciBwYXRoXG4gICAgICAgICAgICAgICAgLy8gY29tcG9uZW50XG4gICAgICAgICAgICAgICAgZW5kID0gaTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy8gRXh0ZW5zaW9uIGRvZXMgbm90IG1hdGNoLCBzbyBvdXIgcmVzdWx0IGlzIHRoZSBlbnRpcmUgcGF0aFxuICAgICAgICAgICAgICAvLyBjb21wb25lbnRcbiAgICAgICAgICAgICAgZXh0SWR4ID0gLTE7XG4gICAgICAgICAgICAgIGVuZCA9IGZpcnN0Tm9uU2xhc2hFbmQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGFydCA9PT0gZW5kKSBlbmQgPSBmaXJzdE5vblNsYXNoRW5kO2Vsc2UgaWYgKGVuZCA9PT0gLTEpIGVuZCA9IHBhdGgubGVuZ3RoO1xuICAgICAgcmV0dXJuIHBhdGguc2xpY2Uoc3RhcnQsIGVuZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAoaSA9IHBhdGgubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgaWYgKHBhdGguY2hhckNvZGVBdChpKSA9PT0gNDcgLyovKi8pIHtcbiAgICAgICAgICAgIC8vIElmIHdlIHJlYWNoZWQgYSBwYXRoIHNlcGFyYXRvciB0aGF0IHdhcyBub3QgcGFydCBvZiBhIHNldCBvZiBwYXRoXG4gICAgICAgICAgICAvLyBzZXBhcmF0b3JzIGF0IHRoZSBlbmQgb2YgdGhlIHN0cmluZywgc3RvcCBub3dcbiAgICAgICAgICAgIGlmICghbWF0Y2hlZFNsYXNoKSB7XG4gICAgICAgICAgICAgIHN0YXJ0ID0gaSArIDE7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAoZW5kID09PSAtMSkge1xuICAgICAgICAgIC8vIFdlIHNhdyB0aGUgZmlyc3Qgbm9uLXBhdGggc2VwYXJhdG9yLCBtYXJrIHRoaXMgYXMgdGhlIGVuZCBvZiBvdXJcbiAgICAgICAgICAvLyBwYXRoIGNvbXBvbmVudFxuICAgICAgICAgIG1hdGNoZWRTbGFzaCA9IGZhbHNlO1xuICAgICAgICAgIGVuZCA9IGkgKyAxO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChlbmQgPT09IC0xKSByZXR1cm4gJyc7XG4gICAgICByZXR1cm4gcGF0aC5zbGljZShzdGFydCwgZW5kKTtcbiAgICB9XG4gIH0sXG5cbiAgZXh0bmFtZTogZnVuY3Rpb24gZXh0bmFtZShwYXRoKSB7XG4gICAgYXNzZXJ0UGF0aChwYXRoKTtcbiAgICB2YXIgc3RhcnREb3QgPSAtMTtcbiAgICB2YXIgc3RhcnRQYXJ0ID0gMDtcbiAgICB2YXIgZW5kID0gLTE7XG4gICAgdmFyIG1hdGNoZWRTbGFzaCA9IHRydWU7XG4gICAgLy8gVHJhY2sgdGhlIHN0YXRlIG9mIGNoYXJhY3RlcnMgKGlmIGFueSkgd2Ugc2VlIGJlZm9yZSBvdXIgZmlyc3QgZG90IGFuZFxuICAgIC8vIGFmdGVyIGFueSBwYXRoIHNlcGFyYXRvciB3ZSBmaW5kXG4gICAgdmFyIHByZURvdFN0YXRlID0gMDtcbiAgICBmb3IgKHZhciBpID0gcGF0aC5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgdmFyIGNvZGUgPSBwYXRoLmNoYXJDb2RlQXQoaSk7XG4gICAgICBpZiAoY29kZSA9PT0gNDcgLyovKi8pIHtcbiAgICAgICAgICAvLyBJZiB3ZSByZWFjaGVkIGEgcGF0aCBzZXBhcmF0b3IgdGhhdCB3YXMgbm90IHBhcnQgb2YgYSBzZXQgb2YgcGF0aFxuICAgICAgICAgIC8vIHNlcGFyYXRvcnMgYXQgdGhlIGVuZCBvZiB0aGUgc3RyaW5nLCBzdG9wIG5vd1xuICAgICAgICAgIGlmICghbWF0Y2hlZFNsYXNoKSB7XG4gICAgICAgICAgICBzdGFydFBhcnQgPSBpICsgMTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgaWYgKGVuZCA9PT0gLTEpIHtcbiAgICAgICAgLy8gV2Ugc2F3IHRoZSBmaXJzdCBub24tcGF0aCBzZXBhcmF0b3IsIG1hcmsgdGhpcyBhcyB0aGUgZW5kIG9mIG91clxuICAgICAgICAvLyBleHRlbnNpb25cbiAgICAgICAgbWF0Y2hlZFNsYXNoID0gZmFsc2U7XG4gICAgICAgIGVuZCA9IGkgKyAxO1xuICAgICAgfVxuICAgICAgaWYgKGNvZGUgPT09IDQ2IC8qLiovKSB7XG4gICAgICAgICAgLy8gSWYgdGhpcyBpcyBvdXIgZmlyc3QgZG90LCBtYXJrIGl0IGFzIHRoZSBzdGFydCBvZiBvdXIgZXh0ZW5zaW9uXG4gICAgICAgICAgaWYgKHN0YXJ0RG90ID09PSAtMSlcbiAgICAgICAgICAgIHN0YXJ0RG90ID0gaTtcbiAgICAgICAgICBlbHNlIGlmIChwcmVEb3RTdGF0ZSAhPT0gMSlcbiAgICAgICAgICAgIHByZURvdFN0YXRlID0gMTtcbiAgICAgIH0gZWxzZSBpZiAoc3RhcnREb3QgIT09IC0xKSB7XG4gICAgICAgIC8vIFdlIHNhdyBhIG5vbi1kb3QgYW5kIG5vbi1wYXRoIHNlcGFyYXRvciBiZWZvcmUgb3VyIGRvdCwgc28gd2Ugc2hvdWxkXG4gICAgICAgIC8vIGhhdmUgYSBnb29kIGNoYW5jZSBhdCBoYXZpbmcgYSBub24tZW1wdHkgZXh0ZW5zaW9uXG4gICAgICAgIHByZURvdFN0YXRlID0gLTE7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHN0YXJ0RG90ID09PSAtMSB8fCBlbmQgPT09IC0xIHx8XG4gICAgICAgIC8vIFdlIHNhdyBhIG5vbi1kb3QgY2hhcmFjdGVyIGltbWVkaWF0ZWx5IGJlZm9yZSB0aGUgZG90XG4gICAgICAgIHByZURvdFN0YXRlID09PSAwIHx8XG4gICAgICAgIC8vIFRoZSAocmlnaHQtbW9zdCkgdHJpbW1lZCBwYXRoIGNvbXBvbmVudCBpcyBleGFjdGx5ICcuLidcbiAgICAgICAgcHJlRG90U3RhdGUgPT09IDEgJiYgc3RhcnREb3QgPT09IGVuZCAtIDEgJiYgc3RhcnREb3QgPT09IHN0YXJ0UGFydCArIDEpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgcmV0dXJuIHBhdGguc2xpY2Uoc3RhcnREb3QsIGVuZCk7XG4gIH0sXG5cbiAgZm9ybWF0OiBmdW5jdGlvbiBmb3JtYXQocGF0aE9iamVjdCkge1xuICAgIGlmIChwYXRoT2JqZWN0ID09PSBudWxsIHx8IHR5cGVvZiBwYXRoT2JqZWN0ICE9PSAnb2JqZWN0Jykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwicGF0aE9iamVjdFwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBPYmplY3QuIFJlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBwYXRoT2JqZWN0KTtcbiAgICB9XG4gICAgcmV0dXJuIF9mb3JtYXQoJy8nLCBwYXRoT2JqZWN0KTtcbiAgfSxcblxuICBwYXJzZTogZnVuY3Rpb24gcGFyc2UocGF0aCkge1xuICAgIGFzc2VydFBhdGgocGF0aCk7XG5cbiAgICB2YXIgcmV0ID0geyByb290OiAnJywgZGlyOiAnJywgYmFzZTogJycsIGV4dDogJycsIG5hbWU6ICcnIH07XG4gICAgaWYgKHBhdGgubGVuZ3RoID09PSAwKSByZXR1cm4gcmV0O1xuICAgIHZhciBjb2RlID0gcGF0aC5jaGFyQ29kZUF0KDApO1xuICAgIHZhciBpc0Fic29sdXRlID0gY29kZSA9PT0gNDcgLyovKi87XG4gICAgdmFyIHN0YXJ0O1xuICAgIGlmIChpc0Fic29sdXRlKSB7XG4gICAgICByZXQucm9vdCA9ICcvJztcbiAgICAgIHN0YXJ0ID0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhcnQgPSAwO1xuICAgIH1cbiAgICB2YXIgc3RhcnREb3QgPSAtMTtcbiAgICB2YXIgc3RhcnRQYXJ0ID0gMDtcbiAgICB2YXIgZW5kID0gLTE7XG4gICAgdmFyIG1hdGNoZWRTbGFzaCA9IHRydWU7XG4gICAgdmFyIGkgPSBwYXRoLmxlbmd0aCAtIDE7XG5cbiAgICAvLyBUcmFjayB0aGUgc3RhdGUgb2YgY2hhcmFjdGVycyAoaWYgYW55KSB3ZSBzZWUgYmVmb3JlIG91ciBmaXJzdCBkb3QgYW5kXG4gICAgLy8gYWZ0ZXIgYW55IHBhdGggc2VwYXJhdG9yIHdlIGZpbmRcbiAgICB2YXIgcHJlRG90U3RhdGUgPSAwO1xuXG4gICAgLy8gR2V0IG5vbi1kaXIgaW5mb1xuICAgIGZvciAoOyBpID49IHN0YXJ0OyAtLWkpIHtcbiAgICAgIGNvZGUgPSBwYXRoLmNoYXJDb2RlQXQoaSk7XG4gICAgICBpZiAoY29kZSA9PT0gNDcgLyovKi8pIHtcbiAgICAgICAgICAvLyBJZiB3ZSByZWFjaGVkIGEgcGF0aCBzZXBhcmF0b3IgdGhhdCB3YXMgbm90IHBhcnQgb2YgYSBzZXQgb2YgcGF0aFxuICAgICAgICAgIC8vIHNlcGFyYXRvcnMgYXQgdGhlIGVuZCBvZiB0aGUgc3RyaW5nLCBzdG9wIG5vd1xuICAgICAgICAgIGlmICghbWF0Y2hlZFNsYXNoKSB7XG4gICAgICAgICAgICBzdGFydFBhcnQgPSBpICsgMTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgaWYgKGVuZCA9PT0gLTEpIHtcbiAgICAgICAgLy8gV2Ugc2F3IHRoZSBmaXJzdCBub24tcGF0aCBzZXBhcmF0b3IsIG1hcmsgdGhpcyBhcyB0aGUgZW5kIG9mIG91clxuICAgICAgICAvLyBleHRlbnNpb25cbiAgICAgICAgbWF0Y2hlZFNsYXNoID0gZmFsc2U7XG4gICAgICAgIGVuZCA9IGkgKyAxO1xuICAgICAgfVxuICAgICAgaWYgKGNvZGUgPT09IDQ2IC8qLiovKSB7XG4gICAgICAgICAgLy8gSWYgdGhpcyBpcyBvdXIgZmlyc3QgZG90LCBtYXJrIGl0IGFzIHRoZSBzdGFydCBvZiBvdXIgZXh0ZW5zaW9uXG4gICAgICAgICAgaWYgKHN0YXJ0RG90ID09PSAtMSkgc3RhcnREb3QgPSBpO2Vsc2UgaWYgKHByZURvdFN0YXRlICE9PSAxKSBwcmVEb3RTdGF0ZSA9IDE7XG4gICAgICAgIH0gZWxzZSBpZiAoc3RhcnREb3QgIT09IC0xKSB7XG4gICAgICAgIC8vIFdlIHNhdyBhIG5vbi1kb3QgYW5kIG5vbi1wYXRoIHNlcGFyYXRvciBiZWZvcmUgb3VyIGRvdCwgc28gd2Ugc2hvdWxkXG4gICAgICAgIC8vIGhhdmUgYSBnb29kIGNoYW5jZSBhdCBoYXZpbmcgYSBub24tZW1wdHkgZXh0ZW5zaW9uXG4gICAgICAgIHByZURvdFN0YXRlID0gLTE7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHN0YXJ0RG90ID09PSAtMSB8fCBlbmQgPT09IC0xIHx8XG4gICAgLy8gV2Ugc2F3IGEgbm9uLWRvdCBjaGFyYWN0ZXIgaW1tZWRpYXRlbHkgYmVmb3JlIHRoZSBkb3RcbiAgICBwcmVEb3RTdGF0ZSA9PT0gMCB8fFxuICAgIC8vIFRoZSAocmlnaHQtbW9zdCkgdHJpbW1lZCBwYXRoIGNvbXBvbmVudCBpcyBleGFjdGx5ICcuLidcbiAgICBwcmVEb3RTdGF0ZSA9PT0gMSAmJiBzdGFydERvdCA9PT0gZW5kIC0gMSAmJiBzdGFydERvdCA9PT0gc3RhcnRQYXJ0ICsgMSkge1xuICAgICAgaWYgKGVuZCAhPT0gLTEpIHtcbiAgICAgICAgaWYgKHN0YXJ0UGFydCA9PT0gMCAmJiBpc0Fic29sdXRlKSByZXQuYmFzZSA9IHJldC5uYW1lID0gcGF0aC5zbGljZSgxLCBlbmQpO2Vsc2UgcmV0LmJhc2UgPSByZXQubmFtZSA9IHBhdGguc2xpY2Uoc3RhcnRQYXJ0LCBlbmQpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoc3RhcnRQYXJ0ID09PSAwICYmIGlzQWJzb2x1dGUpIHtcbiAgICAgICAgcmV0Lm5hbWUgPSBwYXRoLnNsaWNlKDEsIHN0YXJ0RG90KTtcbiAgICAgICAgcmV0LmJhc2UgPSBwYXRoLnNsaWNlKDEsIGVuZCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXQubmFtZSA9IHBhdGguc2xpY2Uoc3RhcnRQYXJ0LCBzdGFydERvdCk7XG4gICAgICAgIHJldC5iYXNlID0gcGF0aC5zbGljZShzdGFydFBhcnQsIGVuZCk7XG4gICAgICB9XG4gICAgICByZXQuZXh0ID0gcGF0aC5zbGljZShzdGFydERvdCwgZW5kKTtcbiAgICB9XG5cbiAgICBpZiAoc3RhcnRQYXJ0ID4gMCkgcmV0LmRpciA9IHBhdGguc2xpY2UoMCwgc3RhcnRQYXJ0IC0gMSk7ZWxzZSBpZiAoaXNBYnNvbHV0ZSkgcmV0LmRpciA9ICcvJztcblxuICAgIHJldHVybiByZXQ7XG4gIH0sXG5cbiAgc2VwOiAnLycsXG4gIGRlbGltaXRlcjogJzonLFxuICB3aW4zMjogbnVsbCxcbiAgcG9zaXg6IG51bGxcbn07XG5cbnBvc2l4LnBvc2l4ID0gcG9zaXg7XG5cbm1vZHVsZS5leHBvcnRzID0gcG9zaXg7XG4iLCAiaW1wb3J0IHsgV2ViUGx1Z2luIH0gZnJvbSAnQGNhcGFjaXRvci9jb3JlJztcbmltcG9ydCB0eXBlIHsgQ2FwYWNpdG9yRXhjZXB0aW9uIH0gZnJvbSAnQGNhcGFjaXRvci9jb3JlJztcblxuaW1wb3J0IHR5cGUgeyBDYXBhY2l0b3JOb2RlSlNQbHVnaW4gfSBmcm9tICcuL2ltcGxlbWVudGF0aW9uJztcblxuZXhwb3J0IGNsYXNzIENhcGFjaXRvck5vZGVKU1dlYiBleHRlbmRzIFdlYlBsdWdpbiBpbXBsZW1lbnRzIENhcGFjaXRvck5vZGVKU1BsdWdpbiB7XG4gIHByb3RlY3RlZCB1bmF2YWlsYWJsZU5vZGVKUygpOiBDYXBhY2l0b3JFeGNlcHRpb24ge1xuICAgIHJldHVybiB0aGlzLnVuYXZhaWxhYmxlKCdUaGUgTm9kZUpTIGVuZ2luZSBpcyBub3QgYXZhaWxhYmxlIGluIHRoZSBicm93c2VyIScpO1xuICB9XG5cbiAgc3RhcnQoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhyb3cgdGhpcy51bmF2YWlsYWJsZU5vZGVKUygpO1xuICB9XG5cbiAgc2VuZCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0aHJvdyB0aGlzLnVuYXZhaWxhYmxlTm9kZUpTKCk7XG4gIH1cblxuICB3aGVuUmVhZHkoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhyb3cgdGhpcy51bmF2YWlsYWJsZU5vZGVKUygpO1xuICB9XG59XG4iLCAiaW1wb3J0IHsgSVBsYXRmb3JtIH0gZnJvbSBcIi4vSVBsYXRmb3JtXCI7XG5cbmV4cG9ydCBjbGFzcyBQbGF0Zm9ybU1hbmFnZXIge1xuICAgIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBJUGxhdGZvcm07XG5cbiAgICBwdWJsaWMgc3RhdGljIHNldFBsYXRmb3JtKHBsYXRmb3JtOiBJUGxhdGZvcm0pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pbnN0YW5jZSA9IHBsYXRmb3JtO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IGN1cnJlbnQoKTogSVBsYXRmb3JtIHtcbiAgICAgICAgaWYgKCF0aGlzLmluc3RhbmNlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQbGF0Zm9ybSBub3QgaW5pdGlhbGl6ZWQuIENhbGwgUGxhdGZvcm1NYW5hZ2VyLnNldFBsYXRmb3JtKCkgZmlyc3QuXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xuICAgIH1cbn1cbiIsICJpbXBvcnQgeyByZWdpc3RlclBsdWdpbiB9IGZyb20gJ0BjYXBhY2l0b3IvY29yZSc7XG5pbXBvcnQgeyBleHBvc2VTeW5hcHNlIH0gZnJvbSAnQGNhcGFjaXRvci9zeW5hcHNlJztcblxuaW1wb3J0IHR5cGUgeyBGaWxlc3lzdGVtUGx1Z2luIH0gZnJvbSAnLi9kZWZpbml0aW9ucyc7XG5cbmNvbnN0IEZpbGVzeXN0ZW0gPSByZWdpc3RlclBsdWdpbjxGaWxlc3lzdGVtUGx1Z2luPignRmlsZXN5c3RlbScsIHtcbiAgd2ViOiAoKSA9PiBpbXBvcnQoJy4vd2ViJykudGhlbigobSkgPT4gbmV3IG0uRmlsZXN5c3RlbVdlYigpKSxcbn0pO1xuXG5leHBvc2VTeW5hcHNlKCk7XG5cbmV4cG9ydCAqIGZyb20gJy4vZGVmaW5pdGlvbnMnO1xuZXhwb3J0IHsgRmlsZXN5c3RlbSB9O1xuIiwgImZ1bmN0aW9uIHModCkge1xuICB0LkNhcGFjaXRvclV0aWxzLlN5bmFwc2UgPSBuZXcgUHJveHkoXG4gICAge30sXG4gICAge1xuICAgICAgZ2V0KGUsIG4pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm94eSh7fSwge1xuICAgICAgICAgIGdldCh3LCBvKSB7XG4gICAgICAgICAgICByZXR1cm4gKGMsIHAsIHIpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgaSA9IHQuQ2FwYWNpdG9yLlBsdWdpbnNbbl07XG4gICAgICAgICAgICAgIGlmIChpID09PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICByKG5ldyBFcnJvcihgQ2FwYWNpdG9yIHBsdWdpbiAke259IG5vdCBmb3VuZGApKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiBpW29dICE9IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgIHIobmV3IEVycm9yKGBNZXRob2QgJHtvfSBub3QgZm91bmQgaW4gQ2FwYWNpdG9yIHBsdWdpbiAke259YCkpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBhID0gYXdhaXQgaVtvXShjKTtcbiAgICAgICAgICAgICAgICAgIHAoYSk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoYSkge1xuICAgICAgICAgICAgICAgICAgcihhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICApO1xufVxuZnVuY3Rpb24gdSh0KSB7XG4gIHQuQ2FwYWNpdG9yVXRpbHMuU3luYXBzZSA9IG5ldyBQcm94eShcbiAgICB7fSxcbiAgICB7XG4gICAgICBnZXQoZSwgbikge1xuICAgICAgICByZXR1cm4gdC5jb3Jkb3ZhLnBsdWdpbnNbbl07XG4gICAgICB9XG4gICAgfVxuICApO1xufVxuZnVuY3Rpb24gZih0ID0gITEpIHtcbiAgdHlwZW9mIHdpbmRvdyA+IFwidVwiIHx8ICh3aW5kb3cuQ2FwYWNpdG9yVXRpbHMgPSB3aW5kb3cuQ2FwYWNpdG9yVXRpbHMgfHwge30sIHdpbmRvdy5DYXBhY2l0b3IgIT09IHZvaWQgMCAmJiAhdCA/IHMod2luZG93KSA6IHdpbmRvdy5jb3Jkb3ZhICE9PSB2b2lkIDAgJiYgdSh3aW5kb3cpKTtcbn1cbmV4cG9ydCB7XG4gIGYgYXMgZXhwb3NlU3luYXBzZVxufTtcbiIsICJpbXBvcnQgeyByZWdpc3RlclBsdWdpbiB9IGZyb20gJ0BjYXBhY2l0b3IvY29yZSc7XG5cbmltcG9ydCB0eXBlIHsgQnJvd3NlclBsdWdpbiB9IGZyb20gJy4vZGVmaW5pdGlvbnMnO1xuXG5jb25zdCBCcm93c2VyID0gcmVnaXN0ZXJQbHVnaW48QnJvd3NlclBsdWdpbj4oJ0Jyb3dzZXInLCB7XG4gIHdlYjogKCkgPT4gaW1wb3J0KCcuL3dlYicpLnRoZW4oKG0pID0+IG5ldyBtLkJyb3dzZXJXZWIoKSksXG59KTtcblxuZXhwb3J0ICogZnJvbSAnLi9kZWZpbml0aW9ucyc7XG5leHBvcnQgeyBCcm93c2VyIH07XG4iLCAiaW1wb3J0IHsgSVBsYXRmb3JtLCBGaWxlU3RhdCB9IGZyb20gXCIuL0lQbGF0Zm9ybVwiO1xuaW1wb3J0IHsgRmlsZXN5c3RlbSwgRGlyZWN0b3J5LCBFbmNvZGluZyB9IGZyb20gXCJAY2FwYWNpdG9yL2ZpbGVzeXN0ZW1cIjtcbmltcG9ydCB7IEJyb3dzZXIgfSBmcm9tIFwiQGNhcGFjaXRvci9icm93c2VyXCI7XG5cbmludGVyZmFjZSBBbmRyb2lkQnJpZGdlIHtcbiAgICBvcGVuUGF0aChwYXRoOiBzdHJpbmcpOiB2b2lkO1xuICAgIGlzUGljdHVyZUluUGljdHVyZVN1cHBvcnRlZCgpOiBib29sZWFuO1xuICAgIGVudGVyUGljdHVyZUluUGljdHVyZSh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcik6IGJvb2xlYW47XG4gICAgc2V0UGljdHVyZUluUGljdHVyZVN0YXRlKGVuYWJsZWQ6IGJvb2xlYW4sIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKTogdm9pZDtcbn1cblxuZGVjbGFyZSBnbG9iYWwge1xuICAgIGludGVyZmFjZSBXaW5kb3cge1xuICAgICAgICBTdHJlbWlvRW5oYW5jZWRBbmRyb2lkPzogQW5kcm9pZEJyaWRnZTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDYXBhY2l0b3JQbGF0Zm9ybSBpbXBsZW1lbnRzIElQbGF0Zm9ybSB7XG4gICAgaWQ6IFwiY2FwYWNpdG9yXCIgPSBcImNhcGFjaXRvclwiO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgZW5oYW5jZWRQYXRoID0gXCJTdHJlbWlvIEVuaGFuY2VkXCI7XG4gICAgcHJpdmF0ZSByZWFkb25seSB0aGVtZXNQYXRoID0gYCR7dGhpcy5lbmhhbmNlZFBhdGh9L3RoZW1lc2A7XG4gICAgcHJpdmF0ZSByZWFkb25seSBwbHVnaW5zUGF0aCA9IGAke3RoaXMuZW5oYW5jZWRQYXRofS9wbHVnaW5zYDtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGxvZ3NQYXRoID0gYCR7dGhpcy5lbmhhbmNlZFBhdGh9L2xvZ3NgO1xuXG4gICAgcHJpdmF0ZSBpc0V4dGVybmFsUGF0aChwYXRoOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHBhdGguc3RhcnRzV2l0aChcImZpbGU6Ly9cIikgfHwgcGF0aC5zdGFydHNXaXRoKFwiY29udGVudDovL1wiKSB8fCBwYXRoLnN0YXJ0c1dpdGgoXCIvXCIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0RGlyZWN0b3J5KHBhdGg6IHN0cmluZyk6IERpcmVjdG9yeSB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzRXh0ZXJuYWxQYXRoKHBhdGgpID8gdW5kZWZpbmVkIDogRGlyZWN0b3J5LkRvY3VtZW50cztcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldEZpbGVPcHRpb25zKHBhdGg6IHN0cmluZywgZW5jb2Rpbmc/OiBFbmNvZGluZyk6IHtcbiAgICAgICAgcGF0aDogc3RyaW5nO1xuICAgICAgICBkaXJlY3Rvcnk/OiBEaXJlY3Rvcnk7XG4gICAgICAgIGVuY29kaW5nPzogRW5jb2Rpbmc7XG4gICAgfSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnM6IHtcbiAgICAgICAgICAgIHBhdGg6IHN0cmluZztcbiAgICAgICAgICAgIGRpcmVjdG9yeT86IERpcmVjdG9yeTtcbiAgICAgICAgICAgIGVuY29kaW5nPzogRW5jb2Rpbmc7XG4gICAgICAgIH0gPSB7IHBhdGggfTtcblxuICAgICAgICBjb25zdCBkaXJlY3RvcnkgPSB0aGlzLmdldERpcmVjdG9yeShwYXRoKTtcbiAgICAgICAgaWYgKGRpcmVjdG9yeSkge1xuICAgICAgICAgICAgb3B0aW9ucy5kaXJlY3RvcnkgPSBkaXJlY3Rvcnk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW5jb2RpbmcpIHtcbiAgICAgICAgICAgIG9wdGlvbnMuZW5jb2RpbmcgPSBlbmNvZGluZztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvcHRpb25zO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgZXhpc3RzSW5EaXJlY3RvcnkocGF0aDogc3RyaW5nLCBkaXJlY3Rvcnk6IERpcmVjdG9yeSk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgYXdhaXQgRmlsZXN5c3RlbS5zdGF0KHsgcGF0aCwgZGlyZWN0b3J5IH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyByZWFkZGlySW5EaXJlY3RvcnkocGF0aDogc3RyaW5nLCBkaXJlY3Rvcnk6IERpcmVjdG9yeSk6IFByb21pc2U8c3RyaW5nW10+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IEZpbGVzeXN0ZW0ucmVhZGRpcih7IHBhdGgsIGRpcmVjdG9yeSB9KTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQuZmlsZXMubWFwKGZpbGUgPT4gZmlsZS5uYW1lKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgICAgICAgICAgaWYgKGVycm9yPy5tZXNzYWdlPy5pbmNsdWRlcyhcImRvZXMgbm90IGV4aXN0XCIpKSByZXR1cm4gW107XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIHJlYWRkaXI6XCIsIGVycm9yKTtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgbWlncmF0ZUxlZ2FjeURpcmVjdG9yeShvbGRQYXRoOiBzdHJpbmcsIG5ld1BhdGg6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBjb25zdCBsZWdhY3lGaWxlcyA9IGF3YWl0IHRoaXMucmVhZGRpckluRGlyZWN0b3J5KG9sZFBhdGgsIERpcmVjdG9yeS5EYXRhKTtcbiAgICAgICAgaWYgKCFsZWdhY3lGaWxlcy5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICBhd2FpdCB0aGlzLm1rZGlyKG5ld1BhdGgpO1xuICAgICAgICBjb25zdCBtaWdyYXRlZEZpbGVzID0gbmV3IFNldChhd2FpdCB0aGlzLnJlYWRkaXIobmV3UGF0aCkpO1xuXG4gICAgICAgIGZvciAoY29uc3QgZmlsZU5hbWUgb2YgbGVnYWN5RmlsZXMpIHtcbiAgICAgICAgICAgIGlmIChtaWdyYXRlZEZpbGVzLmhhcyhmaWxlTmFtZSkpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICBjb25zdCBsZWdhY3lQYXRoID0gYCR7b2xkUGF0aH0vJHtmaWxlTmFtZX1gO1xuICAgICAgICAgICAgY29uc3QgbGVnYWN5U3RhdCA9IGF3YWl0IEZpbGVzeXN0ZW0uc3RhdCh7XG4gICAgICAgICAgICAgICAgcGF0aDogbGVnYWN5UGF0aCxcbiAgICAgICAgICAgICAgICBkaXJlY3Rvcnk6IERpcmVjdG9yeS5EYXRhXG4gICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiBudWxsKTtcblxuICAgICAgICAgICAgaWYgKCFsZWdhY3lTdGF0IHx8IGxlZ2FjeVN0YXQudHlwZSAhPT0gXCJmaWxlXCIpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgRmlsZXN5c3RlbS5yZWFkRmlsZSh7XG4gICAgICAgICAgICAgICAgcGF0aDogbGVnYWN5UGF0aCxcbiAgICAgICAgICAgICAgICBkaXJlY3Rvcnk6IERpcmVjdG9yeS5EYXRhLFxuICAgICAgICAgICAgICAgIGVuY29kaW5nOiBFbmNvZGluZy5VVEY4XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgYXdhaXQgRmlsZXN5c3RlbS53cml0ZUZpbGUoe1xuICAgICAgICAgICAgICAgIHBhdGg6IGAke25ld1BhdGh9LyR7ZmlsZU5hbWV9YCxcbiAgICAgICAgICAgICAgICBkaXJlY3Rvcnk6IERpcmVjdG9yeS5Eb2N1bWVudHMsXG4gICAgICAgICAgICAgICAgZGF0YTogY29udGVudC5kYXRhIGFzIHN0cmluZyxcbiAgICAgICAgICAgICAgICBlbmNvZGluZzogRW5jb2RpbmcuVVRGOFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIGVuc3VyZVBlcm1pc3Npb25zKCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbFNldHRsZWQoW1xuICAgICAgICAgICAgRmlsZXN5c3RlbS5yZXF1ZXN0UGVybWlzc2lvbnMoKVxuICAgICAgICBdKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldEFuZHJvaWRCcmlkZ2UoKTogQW5kcm9pZEJyaWRnZSB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiID8gdW5kZWZpbmVkIDogd2luZG93LlN0cmVtaW9FbmhhbmNlZEFuZHJvaWQ7XG4gICAgfVxuXG4gICAgYXN5bmMgcmVhZEZpbGUocGF0aDogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgRmlsZXN5c3RlbS5yZWFkRmlsZSh0aGlzLmdldEZpbGVPcHRpb25zKHBhdGgsIEVuY29kaW5nLlVURjgpKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhIGFzIHN0cmluZztcbiAgICB9XG5cbiAgICBhc3luYyB3cml0ZUZpbGUocGF0aDogc3RyaW5nLCBjb250ZW50OiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgYXdhaXQgRmlsZXN5c3RlbS53cml0ZUZpbGUoe1xuICAgICAgICAgICAgLi4udGhpcy5nZXRGaWxlT3B0aW9ucyhwYXRoLCBFbmNvZGluZy5VVEY4KSxcbiAgICAgICAgICAgIGRhdGE6IGNvbnRlbnRcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYXN5bmMgcmVhZGRpcihwYXRoOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZ1tdPiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBGaWxlc3lzdGVtLnJlYWRkaXIodGhpcy5nZXRGaWxlT3B0aW9ucyhwYXRoKSk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0LmZpbGVzLm1hcChmID0+IGYubmFtZSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICAgICAgICAgIGlmIChlcnJvcj8ubWVzc2FnZT8uaW5jbHVkZXMoXCJkb2VzIG5vdCBleGlzdFwiKSkgcmV0dXJuIFtdO1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byByZWFkZGlyOlwiLCBlcnJvcik7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBleGlzdHMocGF0aDogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCBGaWxlc3lzdGVtLnN0YXQodGhpcy5nZXRGaWxlT3B0aW9ucyhwYXRoKSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyB1bmxpbmsocGF0aDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGF3YWl0IEZpbGVzeXN0ZW0uZGVsZXRlRmlsZSh0aGlzLmdldEZpbGVPcHRpb25zKHBhdGgpKTtcbiAgICB9XG5cbiAgICBhc3luYyBta2RpcihwYXRoOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgaWYgKGF3YWl0IHRoaXMuZXhpc3RzKHBhdGgpKSByZXR1cm47XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF3YWl0IEZpbGVzeXN0ZW0ubWtkaXIoe1xuICAgICAgICAgICAgICAgIC4uLnRoaXMuZ2V0RmlsZU9wdGlvbnMocGF0aCksXG4gICAgICAgICAgICAgICAgcmVjdXJzaXZlOiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgICAgICAgICAgLy8gSWdub3JlIGVycm9yIGlmIGRpcmVjdG9yeSBhbHJlYWR5IGV4aXN0c1xuICAgICAgICAgICAgaWYgKGVycm9yPy5tZXNzYWdlPy5pbmNsdWRlcyhcImFscmVhZHkgZXhpc3RzXCIpIHx8IGF3YWl0IHRoaXMuZXhpc3RzKHBhdGgpKSByZXR1cm47XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGNyZWF0ZSBkaXJlY3Rvcnk6XCIsIGVycm9yKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIHN0YXQocGF0aDogc3RyaW5nKTogUHJvbWlzZTxGaWxlU3RhdD4ge1xuICAgICAgICBjb25zdCBzdGF0ID0gYXdhaXQgRmlsZXN5c3RlbS5zdGF0KHRoaXMuZ2V0RmlsZU9wdGlvbnMocGF0aCkpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaXNGaWxlOiBzdGF0LnR5cGUgPT09ICdmaWxlJyxcbiAgICAgICAgICAgIGlzRGlyZWN0b3J5OiBzdGF0LnR5cGUgPT09ICdkaXJlY3RvcnknXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgYXN5bmMgb3BlblBhdGgocGF0aDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGNvbnN0IGJyaWRnZSA9IHRoaXMuZ2V0QW5kcm9pZEJyaWRnZSgpO1xuICAgICAgICBpZiAoYnJpZGdlKSB7XG4gICAgICAgICAgICBicmlkZ2Uub3BlblBhdGgocGF0aCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zb2xlLmluZm8oXCJPcGVuIHRoaXMgZm9sZGVyIGZyb20geW91ciBGaWxlcyBhcHA6XCIsIHBhdGgpO1xuICAgIH1cblxuICAgIGFzeW5jIG9wZW5FeHRlcm5hbCh1cmw6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBhd2FpdCBCcm93c2VyLm9wZW4oeyB1cmwgfSk7XG4gICAgfVxuXG4gICAgaXNQaWN0dXJlSW5QaWN0dXJlU3VwcG9ydGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBbmRyb2lkQnJpZGdlKCk/LmlzUGljdHVyZUluUGljdHVyZVN1cHBvcnRlZCgpID8/IGZhbHNlO1xuICAgIH1cblxuICAgIGFzeW5jIGVudGVyUGljdHVyZUluUGljdHVyZSh3aWR0aCA9IDE2LCBoZWlnaHQgPSA5KTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICAgIGNvbnN0IGJyaWRnZSA9IHRoaXMuZ2V0QW5kcm9pZEJyaWRnZSgpO1xuICAgICAgICBpZiAoIWJyaWRnZSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICByZXR1cm4gYnJpZGdlLmVudGVyUGljdHVyZUluUGljdHVyZSh3aWR0aCwgaGVpZ2h0KTtcbiAgICB9XG5cbiAgICBhc3luYyBzZXRQaWN0dXJlSW5QaWN0dXJlU3RhdGUoZW5hYmxlZDogYm9vbGVhbiwgd2lkdGggPSAxNiwgaGVpZ2h0ID0gOSk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICB0aGlzLmdldEFuZHJvaWRCcmlkZ2UoKT8uc2V0UGljdHVyZUluUGljdHVyZVN0YXRlKGVuYWJsZWQsIHdpZHRoLCBoZWlnaHQpO1xuICAgIH1cblxuICAgIGdldFRoZW1lc1BhdGgoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGhlbWVzUGF0aDtcbiAgICB9XG5cbiAgICBnZXRQbHVnaW5zUGF0aCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5wbHVnaW5zUGF0aDtcbiAgICB9XG5cbiAgICBnZXRFbmhhbmNlZFBhdGgoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW5oYW5jZWRQYXRoO1xuICAgIH1cblxuICAgIGFzeW5jIGluaXQoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGF3YWl0IHRoaXMuZW5zdXJlUGVybWlzc2lvbnMoKTtcbiAgICAgICAgYXdhaXQgdGhpcy5ta2Rpcih0aGlzLmdldEVuaGFuY2VkUGF0aCgpKTtcbiAgICAgICAgYXdhaXQgdGhpcy5ta2Rpcih0aGlzLmdldFRoZW1lc1BhdGgoKSk7XG4gICAgICAgIGF3YWl0IHRoaXMubWtkaXIodGhpcy5nZXRQbHVnaW5zUGF0aCgpKTtcbiAgICAgICAgYXdhaXQgdGhpcy5ta2Rpcih0aGlzLmxvZ3NQYXRoKTtcblxuICAgICAgICBhd2FpdCB0aGlzLm1pZ3JhdGVMZWdhY3lEaXJlY3RvcnkoXCJ0aGVtZXNcIiwgdGhpcy5nZXRUaGVtZXNQYXRoKCkpO1xuICAgICAgICBhd2FpdCB0aGlzLm1pZ3JhdGVMZWdhY3lEaXJlY3RvcnkoXCJwbHVnaW5zXCIsIHRoaXMuZ2V0UGx1Z2luc1BhdGgoKSk7XG5cbiAgICAgICAgY29uc3QgbGVnYWN5Um9vdEV4aXN0cyA9IGF3YWl0IHRoaXMuZXhpc3RzSW5EaXJlY3RvcnkoXCJsb2dzXCIsIERpcmVjdG9yeS5EYXRhKTtcbiAgICAgICAgaWYgKGxlZ2FjeVJvb3RFeGlzdHMpIHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMubWlncmF0ZUxlZ2FjeURpcmVjdG9yeShcImxvZ3NcIiwgdGhpcy5sb2dzUGF0aCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCAiY2xhc3MgQnJvd3NlckxvZ2dlciB7XG4gICAgaW5mbyhtZXNzYWdlOiBzdHJpbmcsIC4uLm1ldGE6IGFueVtdKSB7XG4gICAgICAgIGNvbnNvbGUuaW5mbyhgW0lORk9dICR7bWVzc2FnZX1gLCAuLi5tZXRhKTtcbiAgICB9XG4gICAgd2FybihtZXNzYWdlOiBzdHJpbmcsIC4uLm1ldGE6IGFueVtdKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihgW1dBUk5dICR7bWVzc2FnZX1gLCAuLi5tZXRhKTtcbiAgICB9XG4gICAgZXJyb3IobWVzc2FnZTogc3RyaW5nLCAuLi5tZXRhOiBhbnlbXSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKGBbRVJST1JdICR7bWVzc2FnZX1gLCAuLi5tZXRhKTtcbiAgICB9XG59XG5cbmNvbnN0IGxvZ2dlciA9IG5ldyBCcm93c2VyTG9nZ2VyKCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRMb2dnZXIobGFiZWw6IHN0cmluZykge1xuICAgIHJldHVybiBsb2dnZXI7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGxvZ2dlcjtcbiIsICIvKipcbiAqIENlbnRyYWxpemVkIGNvbnN0YW50cyBmb3IgU3RyZW1pbyBFbmhhbmNlZFxuICogVXNpbmcgY29uc3RhbnRzIGluc3RlYWQgb2YgbWFnaWMgc3RyaW5ncyBpbXByb3ZlcyBtYWludGFpbmFiaWxpdHlcbiAqL1xuXG4vLyBDU1MgU2VsZWN0b3JzIHVzZWQgdG8gaW50ZXJhY3Qgd2l0aCBTdHJlbWlvJ3MgVUlcbi8vIE5vdGU6IFRoZXNlIG1heSBuZWVkIHVwZGF0aW5nIHdoZW4gU3RyZW1pbyB1cGRhdGVzIHRoZWlyIGNsYXNzIG5hbWVzXG5leHBvcnQgY29uc3QgU0VMRUNUT1JTID0ge1xuICAgIFNFQ1RJT05TX0NPTlRBSU5FUjogJ1tjbGFzc149XCJzZWN0aW9ucy1jb250YWluZXItXCJdJyxcbiAgICBTRUNUSU9OOiAnW2NsYXNzXj1cInNlY3Rpb24tXCJdJyxcbiAgICBDQVRFR09SWTogJy5jYXRlZ29yeS1HUDBoSScsXG4gICAgQ0FURUdPUllfTEFCRUw6ICcubGFiZWwtTl9PMnYnLFxuICAgIENBVEVHT1JZX0lDT046ICcuaWNvbi1vWm95VicsXG4gICAgQ0FURUdPUllfSEVBRElORzogJy5oZWFkaW5nLVhlUEZsJyxcbiAgICBMQUJFTDogJ1tjbGFzc149XCJsYWJlbC13WEczZVwiXScsXG4gICAgTkFWX01FTlU6ICcubWVudS14ZUUwNicsXG4gICAgU0VUVElOR1NfQ09OVEVOVDogJy5zZXR0aW5ncy1jb250ZW50LWNvNWVVJyxcbiAgICBFTkhBTkNFRF9TRUNUSU9OOiAnI2VuaGFuY2VkJyxcbiAgICBUSEVNRVNfQ0FURUdPUlk6ICcjZW5oYW5jZWQgPiBkaXY6bnRoLWNoaWxkKDIpJyxcbiAgICBQTFVHSU5TX0NBVEVHT1JZOiAnI2VuaGFuY2VkID4gZGl2Om50aC1jaGlsZCgzKScsXG4gICAgQUJPVVRfQ0FURUdPUlk6ICcjZW5oYW5jZWQgPiBkaXY6bnRoLWNoaWxkKDQpJyxcbiAgICBST1VURV9DT05UQUlORVI6ICcucm91dGUtY29udGFpbmVyOmxhc3QtY2hpbGQgLnJvdXRlLWNvbnRlbnQnLFxuICAgIE1FVEFfREVUQUlMU19DT05UQUlORVI6ICcubWV0YWRldGFpbHMtY29udGFpbmVyLUtfRHFhJyxcbiAgICBERVNDUklQVElPTl9DT05UQUlORVI6ICcuZGVzY3JpcHRpb24tY29udGFpbmVyLXlpOGlVJyxcbiAgICBBRERPTlNfTElTVF9DT05UQUlORVI6ICcuYWRkb25zLWxpc3QtY29udGFpbmVyLU92cjJaJyxcbiAgICBBRERPTl9DT05UQUlORVI6ICcuYWRkb24tY29udGFpbmVyLWxDNUtOJyxcbiAgICBOQU1FX0NPTlRBSU5FUjogJy5uYW1lLWNvbnRhaW5lci1xSUFnOCcsXG4gICAgREVTQ1JJUFRJT05fSVRFTTogJy5kZXNjcmlwdGlvbi1jb250YWluZXItdjdKaGUnLFxuICAgIFRZUEVTX0NPTlRBSU5FUjogJy50eXBlcy1jb250YWluZXItRGFPcmcnLFxuICAgIFNFQVJDSF9JTlBVVDogJy5zZWFyY2gtaW5wdXQtYkFnQWgnLFxuICAgIEhPUklaT05UQUxfTkFWOiAnLmhvcml6b250YWwtbmF2LWJhci1jb250YWluZXItWV96dksnLFxuICAgIFRPQVNUX0lURU06ICcudG9hc3QtaXRlbS1jb250YWluZXItbkcwdWsnLFxuICAgIFRPQVNUX0NPTlRBSU5FUjogJy50b2FzdHMtY29udGFpbmVyLW9LRUN5J1xufSBhcyBjb25zdDtcblxuLy8gQ1NTIENsYXNzZXMgdXNlZCBmb3Igc3R5bGluZ1xuZXhwb3J0IGNvbnN0IENMQVNTRVMgPSB7XG4gICAgT1BUSU9OOiAnb3B0aW9uLXZGT0FTJyxcbiAgICBDT05URU5UOiAnY29udGVudC1QMlQwaScsXG4gICAgQlVUVE9OOiAnYnV0dG9uLURObVlMJyxcbiAgICBCVVRUT05fQ09OVEFJTkVSOiAnYnV0dG9uLWNvbnRhaW5lci16VkxINicsXG4gICAgU0VMRUNURUQ6ICdzZWxlY3RlZC1TN1NlSycsXG4gICAgSU5TVEFMTF9CVVRUT046ICdpbnN0YWxsLWJ1dHRvbi1jb250YWluZXIteWZjcTUnLFxuICAgIFVOSU5TVEFMTF9CVVRUT046ICd1bmluc3RhbGwtYnV0dG9uLWNvbnRhaW5lci1vVjRZbycsXG4gICAgQ0hFQ0tFRDogJ2NoZWNrZWQnLFxufSBhcyBjb25zdDtcblxuLy8gTG9jYWxTdG9yYWdlIGtleXNcbmV4cG9ydCBjb25zdCBTVE9SQUdFX0tFWVMgPSB7XG4gICAgRU5BQkxFRF9QTFVHSU5TOiAnZW5hYmxlZFBsdWdpbnMnLFxuICAgIENVUlJFTlRfVEhFTUU6ICdjdXJyZW50VGhlbWUnLFxuICAgIERJU0NPUkRfUlBDOiAnZGlzY29yZHJpY2hwcmVzZW5jZScsXG4gICAgQ0hFQ0tfVVBEQVRFU19PTl9TVEFSVFVQOiAnY2hlY2tGb3JVcGRhdGVzT25TdGFydHVwJyxcbiAgICBQTFVHSU5fT1BUSU9OU19QUkVGSVg6ICdzdHJlbWlvRW5oYW5jZWQucGx1Z2luT3B0aW9ucy52MTonLFxufSBhcyBjb25zdDtcblxuLy8gSVBDIENoYW5uZWwgbmFtZXMgZm9yIG1haW4gPC0+IHJlbmRlcmVyIGNvbW11bmljYXRpb25cbmV4cG9ydCBjb25zdCBJUENfQ0hBTk5FTFMgPSB7XG4gICAgTUlOSU1JWkVfV0lORE9XOiAnbWluaW1pemUtd2luZG93JyxcbiAgICBNQVhJTUlaRV9XSU5ET1c6ICdtYXhpbWl6ZS13aW5kb3cnLFxuICAgIENMT1NFX1dJTkRPVzogJ2Nsb3NlLXdpbmRvdycsXG4gICAgU0VUX1RSQU5TUEFSRU5DWTogJ3NldC10cmFuc3BhcmVuY3knLFxuICAgIEdFVF9UUkFOU1BBUkVOQ1lfU1RBVFVTOiAnZ2V0LXRyYW5zcGFyZW5jeS1zdGF0dXMnLFxuICAgIFVQREFURV9DSEVDS19TVEFSVFVQOiAndXBkYXRlLWNoZWNrLW9uLXN0YXJ0dXAnLFxuICAgIFVQREFURV9DSEVDS19VU0VSOiAndXBkYXRlLWNoZWNrLXVzZXJyZXF1ZXN0JyxcbiAgICBGVUxMU0NSRUVOX0NIQU5HRUQ6ICdmdWxsc2NyZWVuLWNoYW5nZWQnLFxuICAgIEVYVFJBQ1RfRU1CRURERURfU1VCVElUTEVTOiAnZXh0cmFjdC1lbWJlZGRlZC1zdWJ0aXRsZXMnLFxufSBhcyBjb25zdDtcblxuLy8gRmlsZSBleHRlbnNpb25zIGZvciBtb2RzXG5leHBvcnQgY29uc3QgRklMRV9FWFRFTlNJT05TID0ge1xuICAgIFRIRU1FOiAnLnRoZW1lLmNzcycsXG4gICAgUExVR0lOOiAnLnBsdWdpbi5qcycsXG59IGFzIGNvbnN0O1xuXG4vLyBVUkxzXG5leHBvcnQgY29uc3QgVVJMUyA9IHtcbiAgICBTVFJFTUlPX1dFQjogJ2h0dHBzOi8vd2ViLnN0cmVtaW8uY29tLycsXG4gICAgU1RSRU1JT19XRUJfQUREX0FERE9OOiAnaHR0cHM6Ly93ZWIuc3RyZW1pby5jb20vIy9hZGRvbnM/YWRkb249JyxcbiAgICBSRUdJU1RSWTogJ2h0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9SRVZFTkdFOTc3L3N0cmVtaW8tZW5oYW5jZWQtcmVnaXN0cnkvcmVmcy9oZWFkcy9tYWluL3JlZ2lzdHJ5Lmpzb24nLFxuICAgIFZFUlNJT05fQ0hFQ0s6ICdodHRwczovL2dpdGh1Yi5jb20vUkVWRU5HRTk3Ny9zdHJlbWlvLWVuaGFuY2VkLWNvbW11bml0eS9yYXcvbWFpbi92ZXJzaW9uJyxcbiAgICBSRUxFQVNFU19BUEk6ICdodHRwczovL2FwaS5naXRodWIuY29tL3JlcG9zL1JFVkVOR0U5Nzcvc3RyZW1pby1lbmhhbmNlZC1jb21tdW5pdHkvcmVsZWFzZXMvbGF0ZXN0JyxcbiAgICBSRUxFQVNFU19QQUdFOiAnaHR0cHM6Ly9naXRodWIuY29tL1JFVkVOR0U5Nzcvc3RyZW1pby1lbmhhbmNlZC1jb21tdW5pdHkvcmVsZWFzZXMvbGF0ZXN0JyxcbiAgICBTVFJFTUlPX1NFUlZJQ0VfR0lUSFVCX0FQSTogXCJodHRwczovL2FwaS5naXRodWIuY29tL3JlcG9zL1N0cmVtaW8vc3RyZW1pby1zZXJ2aWNlL3JlbGVhc2VzL2xhdGVzdFwiXG59IGFzIGNvbnN0O1xuXG4vLyBzZXJ2ZXIuanMgKFN0cmVtaW8gc3RyZWFtaW5nIHNlcnZlcikgRG93bmxvYWQgVVJMXG5leHBvcnQgY29uc3QgU0VSVkVSX0pTX1VSTCA9IFwiaHR0cHM6Ly9kbC5zdHJlbS5pby9zZXJ2ZXIvdjQuMjAuMTIvZGVza3RvcC9zZXJ2ZXIuanNcIjtcblxuLy8gRkZtcGVnIERvd25sb2FkIFVSTHNcbmV4cG9ydCBjb25zdCBGRk1QRUdfVVJMUyA9IHtcbiAgICB3aW4zMjoge1xuICAgICAgICB4NjQ6IFwiaHR0cHM6Ly9naXRodWIuY29tL0J0Yk4vRkZtcGVnLUJ1aWxkcy9yZWxlYXNlcy9kb3dubG9hZC9sYXRlc3QvZmZtcGVnLW1hc3Rlci1sYXRlc3Qtd2luNjQtZ3BsLnppcFwiLFxuICAgICAgICBhcm02NDogXCJodHRwczovL2dpdGh1Yi5jb20vQnRiTi9GRm1wZWctQnVpbGRzL3JlbGVhc2VzL2Rvd25sb2FkL2xhdGVzdC9mZm1wZWctbWFzdGVyLWxhdGVzdC13aW5hcm02NC1ncGwuemlwXCIsXG4gICAgfSxcbiAgICBkYXJ3aW46IHtcbiAgICAgICAgeDY0OiBcImh0dHBzOi8vZmZtcGVnLm1hcnRpbi1yaWVkbC5kZS9kb3dubG9hZC9tYWNvcy9hbWQ2NC8xNzY2NDM3Mjk3XzguMC4xL2ZmbXBlZy56aXBcIixcbiAgICAgICAgYXJtNjQ6IFwiaHR0cHM6Ly9mZm1wZWcubWFydGluLXJpZWRsLmRlL2Rvd25sb2FkL21hY29zL2FybTY0LzE3NjY0MzAxMzJfOC4wLjEvZmZtcGVnLnppcFwiLFxuICAgIH0sXG4gICAgbGludXg6IHtcbiAgICAgICAgeDY0OiBcImh0dHBzOi8vam9obnZhbnNpY2tsZS5jb20vZmZtcGVnL3JlbGVhc2VzL2ZmbXBlZy1yZWxlYXNlLWFtZDY0LXN0YXRpYy50YXIueHpcIixcbiAgICAgICAgYXJtNjQ6IFwiaHR0cHM6Ly9qb2hudmFuc2lja2xlLmNvbS9mZm1wZWcvcmVsZWFzZXMvZmZtcGVnLXJlbGVhc2UtYXJtNjQtc3RhdGljLnRhci54elwiLFxuICAgIH0sXG59IGFzIGNvbnN0O1xuXG4vLyBGRnByb2JlIERvd25sb2FkIFVSTHMgZm9yIG1hY09TXG5leHBvcnQgY29uc3QgTUFDT1NfRkZQUk9CRV9VUkxTID0ge1xuICAgIHg2NDogXCJodHRwczovL2ZmbXBlZy5tYXJ0aW4tcmllZGwuZGUvZG93bmxvYWQvbWFjb3MvYW1kNjQvMTc2NjQzNzI5N184LjAuMS9mZnByb2JlLnppcFwiLFxuICAgIGFybTY0OiBcImh0dHBzOi8vZmZtcGVnLm1hcnRpbi1yaWVkbC5kZS9kb3dubG9hZC9tYWNvcy9hcm02NC8xNzY2NDMwMTMyXzguMC4xL2ZmcHJvYmUuemlwXCIsXG59O1xuXG4vLyBEaXNjb3JkIFJQQ1xuZXhwb3J0IGNvbnN0IERJU0NPUkQgPSB7XG4gICAgQ0xJRU5UX0lEOiAnMTIwMDE4Njc1MDcyNzg5MzE2NCcsXG4gICAgUkVDT05ORUNUX0lOVEVSVkFMOiAxMDAwMCxcbiAgICBERUZBVUxUX0lNQUdFOiAnMTAyNHN0cmVtaW8nLFxufSBhcyBjb25zdDtcblxuLy8gVGltZW91dHNcbmV4cG9ydCBjb25zdCBUSU1FT1VUUyA9IHtcbiAgICBFTEVNRU5UX1dBSVQ6IDEwMDAwLFxuICAgIElOU1RBTExfQ09NUExFVElPTjogMTIwMDAwLFxuICAgIFNFUlZJQ0VfQ0hFQ0tfSU5URVJWQUw6IDUwMDAsXG4gICAgU0VSVkVSX1JFTE9BRF9ERUxBWTogMTUwMCxcbiAgICBDT1JFU1RBVEVfUkVUUllfSU5URVJWQUw6IDEwMDAsXG4gICAgQ09SRVNUQVRFX01BWF9SRVRSSUVTOiAzMCxcbn0gYXMgY29uc3Q7XG4iLCAiPGRpdiBjbGFzcz1cIm5hdi1jb250ZW50LWNvbnRhaW5lci16bDloUVwiIHN0eWxlPVwid2lkdGg6IDkwJTsgb3ZlcmZsb3cteTogYXV0bztcIj5cbiAgICA8ZGl2IGNsYXNzPVwiYWRkb25zLWNvbnRlbnQtemhGQmxcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNlbGVjdGFibGUtaW5wdXRzLWNvbnRhaW5lci10VXVsMVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNwYWNpbmctd0gxdzVcIj48L2Rpdj5cbiAgICAgICAgICAgIDxsYWJlbCB0aXRsZT1cIlNlYXJjaCB0aGVtZXMvcGx1Z2luc1wiIGNsYXNzPVwic2VhcmNoLWJhci1rN01YZCBzZWFyY2gtYmFyLWNvbnRhaW5lci1wNHRTdFwiPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBzaXplPVwiMVwiIGF1dG9jb3JyZWN0PVwib2ZmXCIgYXV0b2NhcGl0YWxpemU9XCJvZmZcIiBhdXRvY29tcGxldGU9XCJvZmZcIiBzcGVsbGNoZWNrPVwiZmFsc2VcIiB0YWJpbmRleD1cIjBcIiBjbGFzcz1cInNlYXJjaC1pbnB1dC1iQWdBaCB0ZXh0LWlucHV0LWhuTGl6XCIgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIlNlYXJjaCB0aGVtZXMvcGx1Z2luc1wiIHZhbHVlPVwiXCI+XG4gICAgICAgICAgICAgICAgPHN2ZyBjbGFzcz1cImljb24tUU9ZZkpcIiB2aWV3Qm94PVwiMCAwIDUxMiA1MTJcIj5cbiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIk00NTYuODgyIDQxNS43OTk5OTk5OTk5OTk3bC05My43OTEtODkuNDVjMjIuNjA1LTI4LjY3IDM0Ljc4NC02My41NyAzNC42ODYtOTkuNDQgMC05MS41NC03OC4xNDItMTY2LjA3LTE3NC4xMjUtMTY2LjA3cy0xNzQuMTI1IDc0LjUzLTE3NC4xMjUgMTY2LjE3YzAgOTEuNTQgNzguMTQyIDE2Ni4wNyAxNzQuMTI1IDE2Ni4wNyAzNy41ODYgMCA3NC4xNjEtMTEuNjEgMTA0LjI1Ni0zMy4wOGw5My43OSA4OS40NWMzLjUzNSAzLjA0IDcuOTEgNS4wNSAxMi42MDQgNS43OSA0LjY5NiAwLjc0IDkuNTE1IDAuMTggMTMuODg3LTEuNjEgNC4zNzQtMS43OSA4LjExNy00Ljc0IDEwLjc4OC04LjQ5IDIuNjcxLTMuNzYgNC4xNTctOC4xNyA0LjI4NC0xMi43IDAuMTA4LTYuMTEtMi4xNjUtMTIuMDQtNi4zNzktMTYuNjRtLTM1Ny42Mi0xODguNzljLTAuMDEtMjkuNDMgMTEuNDUzLTU3LjggMzIuMTYyLTc5LjYxIDIwLjcwOS0yMS44MiA0OS4xODMtMzUuNDkgNzkuODg0LTM4LjM5IDMwLjctMi45IDYxLjQzMyA1LjIgODYuMjIxIDIyLjcyIDI0Ljc4NyAxNy41MiA0MS44NTggNDMuMiA0Ny44OTEgNzIuMDUgNi4wMzQgMjguODYgMC41OTggNTguODMtMTUuMjQ5IDg0LjA3cy00MC45NzIgNDMuOTYtNzAuNDg5IDUyLjUzYy0yOS41MTggOC41NS02MS4zMTcgNi4zMy04OS4yMTMtNi4yNHMtNDkuODk1LTM0LjU3LTYxLjcxOC02MS43NWMtNi4yNTgtMTQuMzgtOS40ODMtMjkuODEtOS40ODgtNDUuMzhcIiBzdHlsZT1cImZpbGw6IGN1cnJlbnRjb2xvcjtcIj48L3BhdGg+XG4gICAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGJyLz5cbiAgICAgICAgPGRpdiB0YWJpbmRleD1cIjBcIiB0aXRsZT1cIlN1Ym1pdCB5b3VyIHRoZW1lcyBhbmQgcGx1Z2lucyBoZXJlXCIgdGFyZ2V0PVwiX2JsYW5rXCIgY2xhc3M9XCJsaW5rLUZyTDF0IGJ1dHRvbi1jb250YWluZXItelZMSDZcIj5cbiAgICAgICAgICAgIDxhIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vUkVWRU5HRTk3Ny9zdHJlbWlvLWVuaGFuY2VkLXJlZ2lzdHJ5XCIgdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9yZWZlcnJlclwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsYWJlbC1QSnZTSlwiIHN0eWxlPVwidGV4dC1hbGlnbjogY2VudGVyO1wiPlN1Ym1pdCB5b3VyIHRoZW1lcyBhbmQgcGx1Z2luczwvZGl2PlxuICAgICAgICAgICAgPC9hPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwiYWRkb25zLWxpc3QtY29udGFpbmVyLU92cjJaXCIgaWQ9XCJtb2RzLWxpc3RcIj5cbiAgICAgICAgICAgIFxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGJyLz5cbiAgICA8L2Rpdj5cbjwvZGl2PiIsICI8YnI+XG48ZGl2IHRhYmluZGV4PVwiMFwiIGNsYXNzPVwiYWRkb24td2htZE8gYW5pbWF0aW9uLWZhZGUtaW4gYWRkb24tY29udGFpbmVyLWxDNUtOIGJ1dHRvbi1jb250YWluZXItelZMSDZcIj5cbiAgICA8ZGl2IGNsYXNzPVwibG9nby1jb250YWluZXItWmNTU0NcIj5cbiAgICAgICAgPCEtLSB0aGVtZSBwcmV2aWV3IGhlcmUgLS0+XG5cbiAgICAgICAgPCEtLSBwbHVnaW4gaWNvbiBoZXJlIC0tPlxuICAgIDwvZGl2PlxuXG5cdDxkaXYgY2xhc3M9XCJpbmZvLWNvbnRhaW5lci1BZE1CNlwiPlxuXHRcdDxkaXYgY2xhc3M9XCJuYW1lLWNvbnRhaW5lci1xSUFnOFwiIHRpdGxlPVwie3sgbmFtZSB9fVwiPnt7IG5hbWUgfX08L2Rpdj5cblx0XHQ8ZGl2IGNsYXNzPVwidmVyc2lvbi1jb250YWluZXItemRQeU5cIiB0aXRsZT1cInt7IHZlcnNpb24gfX1cIj57eyB2ZXJzaW9uIH19PC9kaXY+XG5cdFx0PGRpdiBjbGFzcz1cInR5cGVzLWNvbnRhaW5lci1EYU9yZ1wiPnt7IHR5cGUgfX08L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImRlc2NyaXB0aW9uLWNvbnRhaW5lci12N0poZVwiPlxuICAgICAgICAgICAgPGI+RGVzY3JpcHRpb246PC9iPiB7eyBkZXNjcmlwdGlvbiB9fVxuICAgICAgICAgICAgPGJyPlxuICAgICAgICAgICAgPGI+QXV0aG9yOjwvYj4ge3sgYXV0aG9yIH19XG4gICAgICAgIDwvZGl2PlxuXHQ8L2Rpdj5cblx0PGRpdiBjbGFzcz1cImJ1dHRvbnMtY29udGFpbmVyLWcweFhyXCI+XG5cdFx0PGRpdiBjbGFzcz1cImFjdGlvbi1idXR0b25zLWNvbnRhaW5lci14TVZtelwiPlxuXHRcdFx0PGRpdiB0YWJpbmRleD1cIi0xXCIgdGl0bGU9XCJ7eyBhY3Rpb25idG5UaXRsZSB9fVwiIGNsYXNzPVwie3sgYWN0aW9uYnRuQ2xhc3MgfX0gYnV0dG9uLWNvbnRhaW5lci16VkxINiBtb2RBY3Rpb25CdG5cIiBkYXRhLWxpbms9XCJ7eyBkb3dubG9hZCB9fVwiIGRhdGEtdHlwZT1cInt7IHR5cGUgfX1cIj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cImxhYmVsLU9uV2gyXCI+e3sgYWN0aW9uYnRuVGl0bGUgfX08L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdDwvZGl2PlxuXHRcdDxhIGhyZWY9XCJ7eyByZXBvIH19XCIgdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9yZWZlcnJlclwiIGNsYXNzPVwic2hhcmUtYnV0dG9uLWNvbnRhaW5lci1zM2d3UCBidXR0b24tY29udGFpbmVyLXpWTEg2XCI+XG5cdFx0XHQ8c3ZnIGNsYXNzPVwiaWNvbi1HeFZiWVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj5cblx0XHRcdFx0PHBhdGggZD1cIk0xMiwyQTEwLDEwIDAgMCwwIDIsMTJDMiwxNi40MiA0Ljg3LDIwLjE3IDguODQsMjEuNUM5LjM0LDIxLjU4IDkuNSwyMS4yNyA5LjUsMjFDOS41LDIwLjc3IDkuNSwyMC4xNCA5LjUsMTkuMzFDNi43MywxOS45MSA2LjE0LDE3Ljk3IDYuMTQsMTcuOTdDNS42OCwxNi44MSA1LjAzLDE2LjUgNS4wMywxNi41QzQuMTIsMTUuODggNS4xLDE1LjkgNS4xLDE1LjlDNi4xLDE1Ljk3IDYuNjMsMTYuOTMgNi42MywxNi45M0M3LjUsMTguNDUgOC45NywxOCA5LjU0LDE3Ljc2QzkuNjMsMTcuMTEgOS44OSwxNi42NyAxMC4xNywxNi40MkM3Ljk1LDE2LjE3IDUuNjIsMTUuMzEgNS42MiwxMS41QzUuNjIsMTAuMzkgNiw5LjUgNi42NSw4Ljc5QzYuNTUsOC41NCA2LjIsNy41IDYuNzUsNi4xNUM2Ljc1LDYuMTUgNy41OSw1Ljg4IDkuNSw3LjE3QzEwLjI5LDYuOTUgMTEuMTUsNi44NCAxMiw2Ljg0QzEyLjg1LDYuODQgMTMuNzEsNi45NSAxNC41LDcuMTdDMTYuNDEsNS44OCAxNy4yNSw2LjE1IDE3LjI1LDYuMTVDMTcuOCw3LjUgMTcuNDUsOC41NCAxNy4zNSw4Ljc5QzE4LDkuNSAxOC4zOCwxMC4zOSAxOC4zOCwxMS41QzE4LjM4LDE1LjMyIDE2LjA0LDE2LjE2IDEzLjgxLDE2LjQxQzE0LjE3LDE2LjcyIDE0LjUsMTcuMzMgMTQuNSwxOC4yNkMxNC41LDE5LjYgMTQuNSwyMC42OCAxNC41LDIxQzE0LjUsMjEuMjcgMTQuNjYsMjEuNTkgMTUuMTcsMjEuNUMxOS4xNCwyMC4xNiAyMiwxNi40MiAyMiwxMkExMCwxMCAwIDAsMCAxMiwyWlwiIHN0eWxlPVwiZmlsbDogY3VycmVudGNvbG9yO1wiIC8+XG5cdFx0XHQ8L3N2Zz5cblx0XHRcdDxkaXYgY2xhc3M9XCJsYWJlbC1PbldoMlwiPk9wZW4gcmVwb3NpdG9yeTwvZGl2PlxuXHRcdDwvYT5cblx0PC9kaXY+XG48L2Rpdj5cbiIsICI8aDQgc3R5bGU9XCJjb2xvcjogd2hpdGU7IG1hcmdpbi1ib3R0b206IDFyZW07XCI+XG4gICAgRGV2ZWxvcGVkIEJ5OiA8cCBzdHlsZT1cImRpc3BsYXk6IGlubGluZSAhaW1wb3J0YW50O1wiPjxhIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vUkVWRU5HRTk3N1wiIHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vcmVmZXJyZXJcIj5SRVZFTkdFOTc3PC9hPjwvcD5cbiAgICA8YnIvPlxuICAgIFZlcnNpb246IHZ7eyB2ZXJzaW9uIH19XG4gICAgPGJyLz5cbjwvaDQ+XG5cbjxkaXYgY2xhc3M9XCJvcHRpb24tdkZPQVNcIj5cbiAgICA8ZGl2IGNsYXNzPVwiaGVhZGluZy1kWU1EdFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibGFiZWwtcUk2VmhcIj5DaGVjayBmb3IgdXBkYXRlcyBvbiBzdGFydHVwPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImNvbnRlbnQtUDJUMGlcIj5cbiAgICAgICAgPGRpdiB0YWJpbmRleD1cIi0xXCIgY2xhc3M9XCJ0b2dnbGUtY29udGFpbmVyLWxaZkhQIGJ1dHRvbi1jb250YWluZXItelZMSDYge3sgY2hlY2tGb3JVcGRhdGVzT25TdGFydHVwIH19XCIgaWQ9XCJjaGVja0ZvclVwZGF0ZXNPblN0YXJ0dXBcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0b2dnbGUtdG9PV01cIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG48L2Rpdj5cblxuPGRpdiBjbGFzcz1cIm9wdGlvbi12Rk9BU1wiPlxuICAgIDxkaXYgY2xhc3M9XCJoZWFkaW5nLWRZTUR0XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJsYWJlbC1xSTZWaFwiPkRpc2NvcmQgUmljaCBQcmVzZW5jZTwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJjb250ZW50LVAyVDBpXCI+XG4gICAgICAgIDxkaXYgdGFiaW5kZXg9XCItMVwiIGNsYXNzPVwidG9nZ2xlLWNvbnRhaW5lci1sWmZIUCBidXR0b24tY29udGFpbmVyLXpWTEg2IHt7IGRpc2NvcmRyaWNocHJlc2VuY2UgfX1cIiBpZD1cImRpc2NvcmRyaWNocHJlc2VuY2VcIiBzdHlsZT1cIm91dGxpbmU6IG5vbmU7XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9nZ2xlLXRvT1dNXCI+PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuPC9kaXY+XG5cbjxkaXYgY2xhc3M9XCJvcHRpb24tdkZPQVNcIj5cbiAgICA8ZGl2IGNsYXNzPVwiaGVhZGluZy1kWU1EdFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibGFiZWwtcUk2VmhcIj5XaW5kb3cgdHJhbnNwYXJlbmN5PC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImNvbnRlbnQtUDJUMGlcIj5cbiAgICAgICAgPGRpdiB0YWJpbmRleD1cIi0xXCIgY2xhc3M9XCJ0b2dnbGUtY29udGFpbmVyLWxaZkhQIGJ1dHRvbi1jb250YWluZXItelZMSDYge3sgZW5hYmxlVHJhbnNwYXJlbnRUaGVtZXMgfX1cIiBpZD1cImVuYWJsZVRyYW5zcGFyZW50VGhlbWVzXCIgc3R5bGU9XCJvdXRsaW5lOiBub25lO1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRvZ2dsZS10b09XTVwiPjwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvZGl2PlxuXG48cCBzdHlsZT1cImNvbG9yOmdyYXk7XCI+VGhpcyBvcHRpb24gaGFzIHRvIGJlIGVuYWJsZWQgZm9yIHRoZW1lcyB0aGF0IHN1cHBvcnQgdHJhbnNwYXJlbmN5IHRvIHdvcmsuIChleHBlcmltZW50YWwpPC9wPlxuPGJyLz5cblxuPGRpdiBjbGFzcz1cIm9wdGlvbi12Rk9BU1wiPlxuICAgIDxkaXYgY2xhc3M9XCJjb250ZW50LVAyVDBpXCI+XG4gICAgICAgIDxkaXYgdGFiaW5kZXg9XCIwXCIgdGl0bGU9XCJDb21tdW5pdHkgUGx1Z2lucyAmYW1wOyBUaGVtZXNcIiBjbGFzcz1cImJ1dHRvbi1ETm1ZTCBidXR0b24tY29udGFpbmVyLXpWTEg2IGJ1dHRvblwiIGlkPVwiYnJvd3NlUGx1Z2luc1RoZW1lc0J0blwiPlxuICAgICAgICAgICAgQ29tbXVuaXR5IE1hcmtldHBsYWNlXG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuPC9kaXY+XG5cbjxkaXYgY2xhc3M9XCJvcHRpb24tdkZPQVNcIj5cbiAgICA8ZGl2IGNsYXNzPVwiY29udGVudC1QMlQwaVwiPlxuICAgICAgICA8ZGl2IHRhYmluZGV4PVwiMFwiIHRpdGxlPVwiQ2hlY2sgRm9yIFVwZGF0ZXNcIiBjbGFzcz1cImJ1dHRvbi1ETm1ZTCBidXR0b24tY29udGFpbmVyLXpWTEg2IGJ1dHRvblwiIGlkPVwiY2hlY2tmb3J1cGRhdGVzQnRuXCI+XG4gICAgICAgICAgICBDaGVjayBGb3IgVXBkYXRlc1xuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvZGl2PlxuXG48YnIvPiIsICI8ZGl2IGNsYXNzPVwib3B0aW9uLXZGT0FTXCI+XG4gICAgPGRpdiBjbGFzcz1cImhlYWRpbmctZFlNRHRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImxhYmVsLXFJNlZoXCI+RGVmYXVsdDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJjb250ZW50LVAyVDBpXCI+XG4gICAgICAgIDxkaXZcbiAgICAgICAgdGl0bGU9XCJEZWZhdWx0XCJcbiAgICAgICAgaWQ9XCJEZWZhdWx0XCJcbiAgICAgICAgdGFiaW5kZXg9XCItMVwiXG4gICAgICAgIG9uY2xpY2s9XCJhcHBseVRoZW1lKCdEZWZhdWx0JylcIlxuICAgICAgICBzdHlsZT1cImNvbG9yOiB3aGl0ZTsgbWFyZ2luLWJvdHRvbTogMXJlbTsgd2lkdGg6IG1heC1jb250ZW50OyBiYWNrZ3JvdW5kLWNvbG9yOiB7eyBiYWNrZ3JvdW5kQ29sb3IgfX07XCJcbiAgICAgICAgY2xhc3M9XCJidXR0b24gYnV0dG9uLWNvbnRhaW5lci16VkxINiB7eyBkaXNhYmxlZCB9fVwiXG4gICAgICAgID57eyBsYWJlbCB9fTwvZGl2PlxuICAgIDwvZGl2PlxuPC9kaXY+XG4iLCAiPGRpdiB0YWJpbmRleD1cIi0xXCIgY2xhc3M9XCJidXR0b24tY29udGFpbmVyLXhUOV9MIGJhY2stYnV0dG9uLWNvbnRhaW5lci1sREIxTiBidXR0b24tY29udGFpbmVyLXpWTEg2XCIgaWQ9XCJiYWNrLWJ0blwiPlxuICAgIDxzdmcgY2xhc3M9XCJpY29uLVQ4TVU2XCIgdmlld0JveD1cIjAgMCA1MTIgNTEyXCI+XG4gICAgICAgIDxwYXRoIGQ9XCJNMzI4LjYxMDAwMDAwMDAwMDYgMTA2LjQ2OWwtMTQzLjUzIDEzNi44ODkgMTQzLjUzIDEzNi44ODlcIiBzdHlsZT1cInN0cm9rZTogY3VycmVudGNvbG9yOyBzdHJva2UtbGluZWNhcDogcm91bmQ7IHN0cm9rZS1saW5lam9pbjogcm91bmQ7IHN0cm9rZS13aWR0aDogNDg7IGZpbGw6IG5vbmU7XCI+PC9wYXRoPlxuICAgIDwvc3ZnPlxuPC9kaXY+IiwgIjxuYXYgY2xhc3M9XCJ0aXRsZS1iYXJcIj5cbiAgICA8ZGl2IGNsYXNzPVwidGl0bGUtYmFyLWJ1dHRvbnNcIj5cbiAgICAgICAgPGRpdiBpZD1cIm1pbmltaXplQXBwLWJ0blwiIHRpdGxlPVwiTWluaW1pemVcIiBjbGFzcz1cImJ1dHRvblwiPlxuICAgICAgICAgICAgPHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+XG4gICAgICAgICAgICAgICAgPHBhdGggZD1cIk0yMCwxNEg0VjEwSDIwXCIgc3R5bGU9XCJmaWxsOndoaXRlO1wiPjwvcGF0aD5cbiAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBpZD1cIm1heGltaXplQXBwLWJ0blwiIHRpdGxlPVwiTWF4aW1pemVcIiBjbGFzcz1cImJ1dHRvblwiPlxuICAgICAgICAgICAgPHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+XG4gICAgICAgICAgICAgICAgPHBhdGggZD1cIk0zLDNIMjFWMjFIM1YzTTUsNVYxOUgxOVY1SDVaXCIgc3R5bGU9XCJmaWxsOndoaXRlO1wiPjwvcGF0aD5cbiAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBpZD1cImNsb3NlQXBwLWJ0blwiIHRpdGxlPVwiQ2xvc2VcIiBjbGFzcz1cImJ1dHRvblwiPlxuICAgICAgICAgICAgPHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgc3R5bGU9XCJ3aWR0aDogMjVweDsgaGVpZ2h0OiAyNXB4O1wiPlxuICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMTksNi40MUwxNy41OSw1TDEyLDEwLjU5TDYuNDEsNUw1LDYuNDFMMTAuNTksMTJMNSwxNy41OUw2LjQxLDE5TDEyLDEzLjQxTDE3LjU5LDE5TDE5LDE3LjU5TDEzLjQxLDEyTDE5LDYuNDFaXCIgc3R5bGU9XCJmaWxsOndoaXRlO1wiPjwvcGF0aD5cbiAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblxuICAgIDxzdHlsZT5cblx0XHRib2R5ID4gKjpub3QoLnRpdGxlLWJhcikge1xuXHRcdFx0cGFkZGluZy10b3A6IDQwcHg7IFxuXHRcdH1cblxuICAgICAgICAuYnV0dG9uIHtcbiAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIC50aXRsZS1iYXIge1xuICAgICAgICAgICAgcG9zaXRpb246IGZpeGVkOyBcbiAgICAgICAgICAgIHRvcDogMDtcbiAgICAgICAgICAgIGxlZnQ6IDA7XG4gICAgICAgICAgICByaWdodDogMDtcbiAgICAgICAgICAgIGhlaWdodDogNDBweDtcbiAgICAgICAgICAgIHotaW5kZXg6IDk5OTk7XG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiByZ2JhKDAsMCwwLDAuMTUpO1xuICAgICAgICAgICAgYmFja2Ryb3AtZmlsdGVyOiBibHVyKDIwcHgpIHNhdHVyYXRlKDEyMCUpO1xuXHRcdFx0LXdlYmtpdC1hcHAtcmVnaW9uOiBkcmFnO1xuICAgICAgICB9XG5cbiAgICAgICAgLnRpdGxlLWJhci1idXR0b25zIHtcbiAgICAgICAgICAgIC13ZWJraXQtYXBwLXJlZ2lvbjogbm8tZHJhZztcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgICAgZ2FwOiAyLjByZW07XG4gICAgICAgICAgICBtYXJnaW4tbGVmdDogYXV0bztcblx0XHRcdG1hcmdpbi1yaWdodDogMjBweDtcbiAgICAgICAgfVxuXG4gICAgICAgIC50aXRsZS1iYXItYnV0dG9ucyBzdmcge1xuICAgICAgICAgICAgd2lkdGg6IDIwcHg7XG4gICAgICAgICAgICBoZWlnaHQ6IDIwcHg7XG4gICAgICAgIH1cbiAgICA8L3N0eWxlPlxuPC9uYXY+XG4iLCAiaW1wb3J0IG1vZHNUYWIgZnJvbSAnLi4vY29tcG9uZW50cy9tb2RzLXRhYi9tb2RzLXRhYi5odG1sJztcbmltcG9ydCBtb2RzSXRlbSBmcm9tICcuLi9jb21wb25lbnRzL21vZHMtaXRlbS9tb2RzLWl0ZW0uaHRtbCc7XG5pbXBvcnQgYWJvdXRDYXRlZ29yeSBmcm9tICcuLi9jb21wb25lbnRzL2Fib3V0LWNhdGVnb3J5L2Fib3V0LWNhdGVnb3J5Lmh0bWwnO1xuaW1wb3J0IGRlZmF1bHRUaGVtZSBmcm9tICcuLi9jb21wb25lbnRzL2RlZmF1bHQtdGhlbWUvZGVmYXVsdC10aGVtZS5odG1sJztcbmltcG9ydCBiYWNrQnRuIGZyb20gJy4uL2NvbXBvbmVudHMvYmFjay1idG4vYmFjay1idG4uaHRtbCc7XG5pbXBvcnQgdGl0bGVCYXIgZnJvbSAnLi4vY29tcG9uZW50cy90aXRsZS1iYXIvdGl0bGUtYmFyLmh0bWwnO1xuXG5jb25zdCB0ZW1wbGF0ZXM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4gICAgJ21vZHMtdGFiJzogbW9kc1RhYixcbiAgICAnbW9kcy1pdGVtJzogbW9kc0l0ZW0sXG4gICAgJ2Fib3V0LWNhdGVnb3J5JzogYWJvdXRDYXRlZ29yeSxcbiAgICAnZGVmYXVsdC10aGVtZSc6IGRlZmF1bHRUaGVtZSxcbiAgICAnYmFjay1idG4nOiBiYWNrQnRuLFxuICAgICd0aXRsZS1iYXInOiB0aXRsZUJhcixcbn07XG5cbmNsYXNzIFRlbXBsYXRlQ2FjaGUge1xuICAgIHB1YmxpYyBzdGF0aWMgbG9hZChkaXI6IHN0cmluZywgbmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgLy8gV2UgaWdub3JlIGRpciBpbiBicm93c2VyIGJ1aWxkXG4gICAgICAgIHJldHVybiB0ZW1wbGF0ZXNbbmFtZV0gfHwgXCJcIjtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRlbXBsYXRlQ2FjaGU7XG4iLCAiaW1wb3J0IFRlbXBsYXRlQ2FjaGUgZnJvbSBcIi4uLy4uL3V0aWxzL3RlbXBsYXRlQ2FjaGVcIjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFRvYXN0VGVtcGxhdGUoaWQ6IHN0cmluZywgdGl0bGU6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nLCBzdGF0dXM6IFwic3VjY2Vzc1wiIHwgXCJmYWlsXCIgfCBcImluZm9cIik6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgY29uc3QgdGVtcGxhdGUgPSBUZW1wbGF0ZUNhY2hlLmxvYWQoX19kaXJuYW1lLCAndG9hc3QnKTtcbiAgICBsZXQgdG9hc3RTdGF0dXM7XG5cbiAgICBzd2l0Y2goc3RhdHVzKSB7XG4gICAgICAgIGNhc2UgXCJzdWNjZXNzXCI6XG4gICAgICAgICAgICB0b2FzdFN0YXR1cyA9IFwic3VjY2Vzcy1lSURUYVwiO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJmYWlsXCI6XG4gICAgICAgICAgICB0b2FzdFN0YXR1cyA9IFwiZXJyb3ItcXV5T2RcIjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiaW5mb1wiOlxuICAgICAgICAgICAgdG9hc3RTdGF0dXMgPSBcImluZm8tS0VXcThcIjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gdGVtcGxhdGVcbiAgICAgICAgLnJlcGxhY2UoXCJ7eyBpZCB9fVwiLCBpZClcbiAgICAgICAgLnJlcGxhY2UoXCJ7eyB0aXRsZSB9fVwiLCB0aXRsZSlcbiAgICAgICAgLnJlcGxhY2UoXCJ7eyBtZXNzYWdlIH19XCIsIG1lc3NhZ2UpXG4gICAgICAgIC5yZXBsYWNlKFwie3sgc3RhdHVzIH19XCIsIHRvYXN0U3RhdHVzKTtcbn1cbiIsICJpbXBvcnQgdHlwZSB7IEJyb3dzZXJXaW5kb3csIE1lc3NhZ2VCb3hPcHRpb25zIH0gZnJvbSBcImVsZWN0cm9uXCI7XG5pbXBvcnQgbG9nZ2VyIGZyb20gXCIuL2xvZ2dlclwiO1xuaW1wb3J0IHsgU0VMRUNUT1JTLCBUSU1FT1VUUyB9IGZyb20gXCIuLi9jb25zdGFudHNcIjtcbmltcG9ydCB7IGdldFRvYXN0VGVtcGxhdGUgfSBmcm9tIFwiLi4vY29tcG9uZW50cy90b2FzdC90b2FzdFwiO1xuXG5jbGFzcyBIZWxwZXJzIHtcbiAgICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogSGVscGVycztcbiAgICBwcml2YXRlIG1haW5XaW5kb3c6IEJyb3dzZXJXaW5kb3cgfCBudWxsID0gbnVsbDtcbiAgICBcbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge31cbiAgICBcbiAgICBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogSGVscGVycyB7XG4gICAgICAgIGlmICghSGVscGVycy5pbnN0YW5jZSkge1xuICAgICAgICAgICAgSGVscGVycy5pbnN0YW5jZSA9IG5ldyBIZWxwZXJzKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEhlbHBlcnMuaW5zdGFuY2U7XG4gICAgfVxuICAgIFxuICAgIHNldE1haW5XaW5kb3cobWFpbldpbmRvdzogQnJvd3NlcldpbmRvdyk6IHZvaWQge1xuICAgICAgICB0aGlzLm1haW5XaW5kb3cgPSBtYWluV2luZG93O1xuICAgIH1cbiAgICBcbiAgICBhc3luYyBzaG93QWxlcnQoXG4gICAgICAgIGFsZXJ0VHlwZTogJ2luZm8nIHwgJ3dhcm5pbmcnIHwgJ2Vycm9yJywgXG4gICAgICAgIHRpdGxlOiBzdHJpbmcsIFxuICAgICAgICBtZXNzYWdlOiBzdHJpbmcsIFxuICAgICAgICBidXR0b25zOiBzdHJpbmdbXVxuICAgICk6IFByb21pc2U8bnVtYmVyPiB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnM6IE1lc3NhZ2VCb3hPcHRpb25zID0ge1xuICAgICAgICAgICAgdHlwZTogYWxlcnRUeXBlLFxuICAgICAgICAgICAgdGl0bGUsXG4gICAgICAgICAgICBtZXNzYWdlLFxuICAgICAgICAgICAgYnV0dG9uc1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgICAgICAgIHR5cGVvZiAod2luZG93IGFzIHR5cGVvZiB3aW5kb3cgJiB7IENhcGFjaXRvcj86IHVua25vd24gfSkuQ2FwYWNpdG9yICE9PSBcInVuZGVmaW5lZFwiICYmXG4gICAgICAgICAgICB0eXBlb2Ygd2luZG93LmFsZXJ0ID09PSBcImZ1bmN0aW9uXCJcbiAgICAgICAgKSB7XG4gICAgICAgICAgICB3aW5kb3cuYWxlcnQoW3RpdGxlLCBtZXNzYWdlXS5maWx0ZXIoQm9vbGVhbikuam9pbihcIlxcblxcblwiKSk7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHsgZGlhbG9nIH0gPSBhd2FpdCBpbXBvcnQoXCJlbGVjdHJvblwiKTtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZGlhbG9nLnNob3dNZXNzYWdlQm94KHRoaXMubWFpbldpbmRvdyEsIG9wdGlvbnMpO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLnJlc3BvbnNlO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgbG9nZ2VyLmVycm9yKCdFcnJvciBkaXNwbGF5aW5nIGFsZXJ0OiAnICsgKGVycm9yIGFzIEVycm9yKS5tZXNzYWdlKTtcbiAgICAgICAgICAgIHJldHVybiAtMTsgXG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgd2FpdEZvckVsbShzZWxlY3Rvcjogc3RyaW5nLCB0aW1lb3V0OiBudW1iZXIgPSBUSU1FT1VUUy5FTEVNRU5UX1dBSVQpOiBQcm9taXNlPEVsZW1lbnQ+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGV4aXN0aW5nRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgICAgICAgICAgaWYgKGV4aXN0aW5nRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKGV4aXN0aW5nRWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIG9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQuYm9keSwge1xuICAgICAgICAgICAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBzdWJ0cmVlOiB0cnVlXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoYFRpbWVvdXQgd2FpdGluZyBmb3IgZWxlbWVudCB3aXRoIHNlbGVjdG9yOiAke3NlbGVjdG9yfWApKTtcbiAgICAgICAgICAgIH0sIHRpbWVvdXQpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB3YWl0Rm9yRWxtQnlYUGF0aCh4cGF0aDogc3RyaW5nLCB0aW1lb3V0OiBudW1iZXIgPSBUSU1FT1VUUy5FTEVNRU5UX1dBSVQpOiBQcm9taXNlPE5vZGU+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGV2YWx1YXRlWFBhdGggPSAoKTogTm9kZSB8IG51bGwgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGRvY3VtZW50LmV2YWx1YXRlKFxuICAgICAgICAgICAgICAgICAgICB4cGF0aCwgXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LCBcbiAgICAgICAgICAgICAgICAgICAgbnVsbCwgXG4gICAgICAgICAgICAgICAgICAgIFhQYXRoUmVzdWx0LkZJUlNUX09SREVSRURfTk9ERV9UWVBFLCBcbiAgICAgICAgICAgICAgICAgICAgbnVsbFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5zaW5nbGVOb2RlVmFsdWU7XG4gICAgICAgICAgICB9O1xuICAgIFxuICAgICAgICAgICAgY29uc3QgZXhpc3RpbmdFbGVtZW50ID0gZXZhbHVhdGVYUGF0aCgpO1xuICAgICAgICAgICAgaWYgKGV4aXN0aW5nRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKGV4aXN0aW5nRWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBldmFsdWF0ZVhQYXRoKCk7XG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIFxuICAgICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5ib2R5LCB7XG4gICAgICAgICAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgICAgICAgICAgIHN1YnRyZWU6IHRydWVcbiAgICAgICAgICAgIH0pO1xuICAgIFxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoYFRpbWVvdXQgd2FpdGluZyBmb3IgZWxlbWVudCB3aXRoIFhQYXRoOiAke3hwYXRofWApKTtcbiAgICAgICAgICAgIH0sIHRpbWVvdXQpO1xuICAgICAgICB9KTtcbiAgICB9ICAgIFxuXG4gICAgd2FpdEZvclRpdGxlQ2hhbmdlKHRpbWVvdXQ6IG51bWJlciA9IFRJTUVPVVRTLkVMRU1FTlRfV0FJVCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBoZWFkRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWQnKTtcbiAgICAgICAgICAgIGlmICghaGVhZEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KG5ldyBFcnJvcignSGVhZCBlbGVtZW50IG5vdCBmb3VuZCcpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoZG9jdW1lbnQudGl0bGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIG9ic2VydmVyLm9ic2VydmUoaGVhZEVsZW1lbnQsIHtcbiAgICAgICAgICAgICAgICBzdWJ0cmVlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcignVGltZW91dCB3YWl0aW5nIGZvciBkb2N1bWVudC50aXRsZSB0byBjaGFuZ2UnKSk7XG4gICAgICAgICAgICB9LCB0aW1lb3V0KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIGNyZWF0ZVRvYXN0KHRvYXN0SWQ6IHN0cmluZywgdGl0bGU6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nLCBzdGF0dXM6IFwic3VjY2Vzc1wiIHwgXCJmYWlsXCIgfCBcImluZm9cIiwgdGltZW91dE1zOm51bWJlciA9IDMwMDApIHtcbiAgICAgICAgY29uc3QgdGVtcGxhdGUgPSBhd2FpdCBnZXRUb2FzdFRlbXBsYXRlKHRvYXN0SWQsIHRpdGxlLCBtZXNzYWdlLCBzdGF0dXMpO1xuICAgICAgICBjb25zdCB0b2FzdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoU0VMRUNUT1JTLlRPQVNUX0NPTlRBSU5FUik7XG4gICAgICAgIGlmKHRvYXN0Q29udGFpbmVyKSB7XG4gICAgICAgICAgICB0b2FzdENvbnRhaW5lci5pbm5lckhUTUwgKz0gdGVtcGxhdGU7XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRvYXN0SWQpPy5yZW1vdmUoKTtcbiAgICAgICAgICAgIH0sIHRpbWVvdXRNcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFeGVjdXRlIEphdmFTY3JpcHQgaW4gdGhlIGNvbnRleHQgb2YgU3RyZW1pbydzIGNvcmUgc2VydmljZXNcbiAgICAgKiBAcGFyYW0ganMgLSBKYXZhU2NyaXB0IGNvZGUgdG8gZXhlY3V0ZVxuICAgICAqIEByZXR1cm5zIFByb21pc2Ugd2l0aCB0aGUgcmVzdWx0IG9mIHRoZSBleGVjdXRpb25cbiAgICAgKi9cbiAgICBwdWJsaWMgX2V2YWwoanM6IHN0cmluZyk6IFByb21pc2U8dW5rbm93bj4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCBldmVudE5hbWUgPSAnc3RyZW1pby1lbmhhbmNlZCc7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgY29uc3QgaGFuZGxlciA9IChkYXRhOiBFdmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzY3JpcHQucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKGRhdGEgYXMgQ3VzdG9tRXZlbnQpLmRldGFpbCk7XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgaGFuZGxlciwgeyBvbmNlOiB0cnVlIH0pO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHNjcmlwdC5pZCA9IGV2ZW50TmFtZTtcbiAgICAgICAgICAgICAgICBzY3JpcHQuYXBwZW5kQ2hpbGQoXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGBcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb3JlID0gd2luZG93LnNlcnZpY2VzLmNvcmU7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gJHtqc307XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC50aGVuKChhd2FpdGVkUmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChcIiR7ZXZlbnROYW1lfVwiLCB7IGRldGFpbDogYXdhaXRlZFJlc3VsdCB9KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChcIiR7ZXZlbnROYW1lfVwiLCB7IGRldGFpbDogcmVzdWx0IH0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYCksXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRFbGVtZW50QnlYcGF0aChwYXRoOiBzdHJpbmcpOiBOb2RlIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiBkb2N1bWVudC5ldmFsdWF0ZShcbiAgICAgICAgICAgIHBhdGgsIFxuICAgICAgICAgICAgZG9jdW1lbnQsIFxuICAgICAgICAgICAgbnVsbCwgXG4gICAgICAgICAgICBYUGF0aFJlc3VsdC5GSVJTVF9PUkRFUkVEX05PREVfVFlQRSwgXG4gICAgICAgICAgICBudWxsXG4gICAgICAgICkuc2luZ2xlTm9kZVZhbHVlO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRGaWxlTmFtZUZyb21VcmwodXJsOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBwYXJ0cyA9IHVybC5zcGxpdCgnLycpO1xuICAgICAgICByZXR1cm4gcGFydHNbcGFydHMubGVuZ3RoIC0gMV0gfHwgJyc7XG4gICAgfVxuXG4gICAgcHVibGljIGZvcm1hdFRpbWUoc2Vjb25kczogbnVtYmVyKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgaG91cnMgPSBNYXRoLmZsb29yKHNlY29uZHMgLyAzNjAwKTtcbiAgICAgICAgY29uc3QgbWludXRlcyA9IE1hdGguZmxvb3IoKHNlY29uZHMgJSAzNjAwKSAvIDYwKTtcbiAgICAgICAgY29uc3QgcmVtYWluaW5nU2Vjb25kcyA9IE1hdGguZmxvb3Ioc2Vjb25kcyAlIDYwKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBgJHtTdHJpbmcoaG91cnMpLnBhZFN0YXJ0KDIsICcwJyl9OiR7U3RyaW5nKG1pbnV0ZXMpLnBhZFN0YXJ0KDIsICcwJyl9OiR7U3RyaW5nKHJlbWFpbmluZ1NlY29uZHMpLnBhZFN0YXJ0KDIsICcwJyl9YDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb21wYXJlIHR3byBzZW1hbnRpYyB2ZXJzaW9uIHN0cmluZ3NcbiAgICAgKiBAcmV0dXJucyB0cnVlIGlmIHZlcnNpb24xID4gdmVyc2lvbjJcbiAgICAgKi9cbiAgICBwdWJsaWMgaXNOZXdlclZlcnNpb24odmVyc2lvbjE6IHN0cmluZywgdmVyc2lvbjI6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICBjb25zdCBub3JtYWxpemUgPSAodjogc3RyaW5nKTogbnVtYmVyW10gPT4gXG4gICAgICAgICAgICB2LnJlcGxhY2UoL152LywgJycpLnNwbGl0KCcuJykubWFwKG4gPT4gcGFyc2VJbnQobiwgMTApIHx8IDApO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgdjFQYXJ0cyA9IG5vcm1hbGl6ZSh2ZXJzaW9uMSk7XG4gICAgICAgIGNvbnN0IHYyUGFydHMgPSBub3JtYWxpemUodmVyc2lvbjIpO1xuICAgICAgICBjb25zdCBtYXhMZW5ndGggPSBNYXRoLm1heCh2MVBhcnRzLmxlbmd0aCwgdjJQYXJ0cy5sZW5ndGgpO1xuICAgICAgICBcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXhMZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgdjEgPSB2MVBhcnRzW2ldID8/IDA7XG4gICAgICAgICAgICBjb25zdCB2MiA9IHYyUGFydHNbaV0gPz8gMDtcbiAgICAgICAgICAgIGlmICh2MSA+IHYyKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIGlmICh2MSA8IHYyKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cblxuY29uc3QgaGVscGVyc0luc3RhbmNlID0gSGVscGVycy5nZXRJbnN0YW5jZSgpO1xuXG5leHBvcnQgZGVmYXVsdCBoZWxwZXJzSW5zdGFuY2U7XG4iLCAiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZXNjYXBlSHRtbCh2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdmFsdWUucmVwbGFjZSgvWyY8PlwiJ10vZywgY2hhcmFjdGVyID0+ICh7XG4gICAgICAgIFwiJlwiOiBcIiZhbXA7XCIsXG4gICAgICAgIFwiPFwiOiBcIiZsdDtcIixcbiAgICAgICAgXCI+XCI6IFwiJmd0O1wiLFxuICAgICAgICAnXCInOiBcIiZxdW90O1wiLFxuICAgICAgICBcIidcIjogXCImIzAzOTtcIixcbiAgICB9KVtjaGFyYWN0ZXJdID8/IGNoYXJhY3Rlcik7XG59XG4iLCAiaW1wb3J0IFRlbXBsYXRlQ2FjaGUgZnJvbSAnLi4vLi4vdXRpbHMvdGVtcGxhdGVDYWNoZSc7XG5pbXBvcnQgeyBNZXRhRGF0YSB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvTWV0YURhdGEnO1xuaW1wb3J0IGVzY2FwZUh0bWwgZnJvbSAnLi4vLi4vdXRpbHMvZXNjYXBlSHRtbCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQbHVnaW5JdGVtVGVtcGxhdGUoXG4gICAgZmlsZW5hbWU6IHN0cmluZywgXG4gICAgbWV0YURhdGE6IE1ldGFEYXRhLFxuICAgIGNoZWNrZWQ6IGJvb2xlYW5cbik6IHN0cmluZyB7XG4gICAgbGV0IHRlbXBsYXRlID0gVGVtcGxhdGVDYWNoZS5sb2FkKF9fZGlybmFtZSwgJ3BsdWdpbi1pdGVtJyk7XG4gICAgXG4gICAgLy8gUmVwbGFjZSBtZXRhZGF0YSBwbGFjZWhvbGRlcnNcbiAgICBjb25zdCBtZXRhS2V5cyA9IFsnbmFtZScsICdkZXNjcmlwdGlvbicsICdhdXRob3InLCAndmVyc2lvbiddIGFzIGNvbnN0O1xuICAgIG1ldGFLZXlzLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgY29uc3QgcmVnZXggPSBuZXcgUmVnRXhwKGB7e1xcXFxzKiR7a2V5fVxcXFxzKn19YCwgJ2cnKTtcbiAgICAgICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZS5yZXBsYWNlKHJlZ2V4LCBlc2NhcGVIdG1sKG1ldGFEYXRhW2tleV0gfHwgJycpKTtcbiAgICB9KTtcblxuICAgIHJldHVybiB0ZW1wbGF0ZVxuICAgICAgICAucmVwbGFjZShcInt7IGNoZWNrZWQgfX1cIiwgY2hlY2tlZCA/IFwiY2hlY2tlZFwiIDogXCJcIilcbiAgICAgICAgLnJlcGxhY2UoL1xce1xce1xccypmaWxlTmFtZVxccypcXH1cXH0vZywgZXNjYXBlSHRtbChmaWxlbmFtZSkpO1xufVxuIiwgImltcG9ydCBUZW1wbGF0ZUNhY2hlIGZyb20gJy4uLy4uL3V0aWxzL3RlbXBsYXRlQ2FjaGUnO1xuaW1wb3J0IHsgTWV0YURhdGEgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL01ldGFEYXRhJztcbmltcG9ydCBlc2NhcGVIdG1sIGZyb20gJy4uLy4uL3V0aWxzL2VzY2FwZUh0bWwnO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VGhlbWVJdGVtVGVtcGxhdGUoXG4gICAgZmlsZW5hbWU6IHN0cmluZywgXG4gICAgbWV0YURhdGE6IE1ldGFEYXRhLFxuICAgIGFwcGxpZWQ6IGJvb2xlYW5cbik6IHN0cmluZyB7XG4gICAgbGV0IHRlbXBsYXRlID0gVGVtcGxhdGVDYWNoZS5sb2FkKF9fZGlybmFtZSwgJ3RoZW1lLWl0ZW0nKTtcbiAgICBcbiAgICAvLyBSZXBsYWNlIG1ldGFkYXRhIHBsYWNlaG9sZGVyc1xuICAgIGNvbnN0IG1ldGFLZXlzID0gWyduYW1lJywgJ2Rlc2NyaXB0aW9uJywgJ2F1dGhvcicsICd2ZXJzaW9uJ10gYXMgY29uc3Q7XG4gICAgbWV0YUtleXMuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBjb25zdCByZWdleCA9IG5ldyBSZWdFeHAoYHt7XFxcXHMqJHtrZXl9XFxcXHMqfX1gLCAnZycpO1xuICAgICAgICB0ZW1wbGF0ZSA9IHRlbXBsYXRlLnJlcGxhY2UocmVnZXgsIGVzY2FwZUh0bWwobWV0YURhdGFba2V5XSB8fCAnJykpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRlbXBsYXRlXG4gICAgICAgIC5yZXBsYWNlKFwie3sgZGlzYWJsZWQgfX1cIiwgYXBwbGllZCA/IFwiZGlzYWJsZWRcIiA6IFwiXCIpXG4gICAgICAgIC5yZXBsYWNlKC9cXHtcXHtcXHMqZmlsZU5hbWVcXHMqXFx9XFx9L2csIGVzY2FwZUh0bWwoZmlsZW5hbWUpKVxuICAgICAgICAucmVwbGFjZShcInt7IGxhYmVsIH19XCIsIGFwcGxpZWQgPyBcIkFwcGxpZWRcIiA6IFwiQXBwbHlcIilcbiAgICAgICAgLnJlcGxhY2UoXCJ7eyBidXR0b25DbGFzcyB9fVwiLCBhcHBsaWVkID8gXCJ1bmluc3RhbGwtYnV0dG9uLWNvbnRhaW5lci1vVjRZb1wiIDogXCJpbnN0YWxsLWJ1dHRvbi1jb250YWluZXIteWZjcTVcIik7XG59XG4iLCAiaW1wb3J0IFRlbXBsYXRlQ2FjaGUgZnJvbSAnLi4vLi4vdXRpbHMvdGVtcGxhdGVDYWNoZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRFbmhhbmNlZE5hdigpOiBzdHJpbmcge1xuICAgIHJldHVybiBUZW1wbGF0ZUNhY2hlLmxvYWQoX19kaXJuYW1lLCAnZW5oYW5jZWQtbmF2Jyk7XG59XG4iLCAiaW1wb3J0IHsgUGxhdGZvcm1NYW5hZ2VyIH0gZnJvbSBcIi4uL3BsYXRmb3JtL1BsYXRmb3JtTWFuYWdlclwiO1xuXG5jbGFzcyBQcm9wZXJ0aWVzIHtcbiAgICBwdWJsaWMgc3RhdGljIHRoZW1lTGlua1NlbGVjdG9yOiBzdHJpbmcgPSBcImhlYWQgPiBsaW5rW3JlbD1zdHlsZXNoZWV0XVwiO1xuXG4gICAgcHVibGljIHN0YXRpYyBnZXQgZW5oYW5jZWRQYXRoKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC5nZXRFbmhhbmNlZFBhdGgoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldCB0aGVtZXNQYXRoKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC5nZXRUaGVtZXNQYXRoKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXQgcGx1Z2luc1BhdGgoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIFBsYXRmb3JtTWFuYWdlci5jdXJyZW50LmdldFBsdWdpbnNQYXRoKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBpc1VzaW5nU3RyZW1pb1NlcnZpY2UgPSBmYWxzZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgUHJvcGVydGllcztcbiIsICJleHBvcnQgZnVuY3Rpb24gZ2V0QXBwbHlUaGVtZVRlbXBsYXRlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGBcbiAgICBhc3luYyBmdW5jdGlvbiBhcHBseVRoZW1lKHRoZW1lKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiYXBwbHlpbmcgXCIgKyB0aGVtZSk7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRUaGVtZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiY3VycmVudFRoZW1lXCIpO1xuXG4gICAgICAgIGlmICghd2luZG93LnN0cmVtaW9FbmhhbmNlZD8uYXBwbHlUaGVtZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlN0cmVtaW8gRW5oYW5jZWQgdGhlbWUgYnJpZGdlIGlzIHVuYXZhaWxhYmxlXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgYXBwbGllZCA9IGF3YWl0IHdpbmRvdy5zdHJlbWlvRW5oYW5jZWQuYXBwbHlUaGVtZSh0aGVtZSk7XG4gICAgICAgIGlmICghYXBwbGllZCkgcmV0dXJuO1xuXG4gICAgICAgIGlmIChjdXJyZW50VGhlbWUpIHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRUaGVtZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjdXJyZW50VGhlbWUpO1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRUaGVtZUVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50VGhlbWVFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJkaXNhYmxlZFwiKTtcblxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50VGhlbWUgIT09IFwiRGVmYXVsdFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRUaGVtZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcInVuaW5zdGFsbC1idXR0b24tY29udGFpbmVyLW9WNFlvXCIpO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50VGhlbWVFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJpbnN0YWxsLWJ1dHRvbi1jb250YWluZXIteWZjcTVcIik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFRoZW1lRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInZhcigtLXNlY29uZGFyeS1hY2NlbnQtY29sb3IpXCI7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY3VycmVudFRoZW1lRWxlbWVudC5pbm5lclRleHQgPSBcIkFwcGx5XCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImN1cnJlbnRUaGVtZVwiLCB0aGVtZSk7XG5cbiAgICAgICAgY29uc3QgbmV3VGhlbWVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhlbWUpO1xuICAgICAgICBpZiAobmV3VGhlbWVFbGVtZW50KSB7XG4gICAgICAgICAgICBuZXdUaGVtZUVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImRpc2FibGVkXCIpO1xuXG4gICAgICAgICAgICBpZiAodGhlbWUgIT09IFwiRGVmYXVsdFwiKSB7XG4gICAgICAgICAgICAgICAgbmV3VGhlbWVFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJpbnN0YWxsLWJ1dHRvbi1jb250YWluZXIteWZjcTVcIik7XG4gICAgICAgICAgICAgICAgbmV3VGhlbWVFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJ1bmluc3RhbGwtYnV0dG9uLWNvbnRhaW5lci1vVjRZb1wiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbmV3VGhlbWVFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwidmFyKC0tb3ZlcmxheS1jb2xvcilcIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbmV3VGhlbWVFbGVtZW50LmlubmVyVGV4dCA9IFwiQXBwbGllZFwiO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuZGF0YXNldC5zdHJlbWlvRW5oYW5jZWRUaGVtZUNsaWNrQm91bmQpIHtcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmRhdGFzZXQuc3RyZW1pb0VuaGFuY2VkVGhlbWVDbGlja0JvdW5kID0gXCJ0cnVlXCI7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldCBpbnN0YW5jZW9mIEVsZW1lbnRcbiAgICAgICAgICAgICAgICA/IGV2ZW50LnRhcmdldC5jbG9zZXN0KFwiW2RhdGEtc3RyZW1pby1lbmhhbmNlZC1hcHBseS10aGVtZV1cIilcbiAgICAgICAgICAgICAgICA6IG51bGw7XG4gICAgICAgICAgICBjb25zdCB0aGVtZSA9IHRhcmdldD8uZ2V0QXR0cmlidXRlKFwiZGF0YS1zdHJlbWlvLWVuaGFuY2VkLWFwcGx5LXRoZW1lXCIpO1xuICAgICAgICAgICAgaWYgKHRoZW1lKSB2b2lkIGFwcGx5VGhlbWUodGhlbWUpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgYDtcbn1cbiIsICJpbXBvcnQgU2V0dGluZ3MgZnJvbSBcIi4vU2V0dGluZ3NcIjtcbmltcG9ydCB7IFBsYXRmb3JtTWFuYWdlciB9IGZyb20gXCIuLi9wbGF0Zm9ybS9QbGF0Zm9ybU1hbmFnZXJcIjtcbmltcG9ydCBwcm9wZXJ0aWVzIGZyb20gXCIuL1Byb3BlcnRpZXNcIjtcbmltcG9ydCBoZWxwZXJzIGZyb20gXCIuLi91dGlscy9IZWxwZXJzXCI7XG5pbXBvcnQgeyBNZXRhRGF0YSB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL01ldGFEYXRhXCI7XG5pbXBvcnQgeyBnZXRMb2dnZXIgfSBmcm9tIFwiLi4vdXRpbHMvbG9nZ2VyXCI7XG5pbXBvcnQgeyBnZXRBcHBseVRoZW1lVGVtcGxhdGUgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9hcHBseS10aGVtZS9hcHBseVRoZW1lXCI7XG5pbXBvcnQgeyBiYXNlbmFtZSwgam9pbiB9IGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyBTVE9SQUdFX0tFWVMsIFNFTEVDVE9SUywgQ0xBU1NFUywgVVJMUywgRklMRV9FWFRFTlNJT05TIH0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IEV4dHJhY3RNZXRhRGF0YSBmcm9tIFwiLi4vdXRpbHMvRXh0cmFjdE1ldGFEYXRhXCI7XG5pbXBvcnQgUGx1Z2luT3B0aW9ucyBmcm9tIFwiLi9QbHVnaW5PcHRpb25zXCI7XG5pbXBvcnQgcmVsb2FkQXBwbGljYXRpb24gZnJvbSBcIi4uL3V0aWxzL3JlbG9hZEFwcGxpY2F0aW9uXCI7XG5cbmNsYXNzIE1vZE1hbmFnZXIge1xuICAgIHByaXZhdGUgc3RhdGljIGxvZ2dlciA9IGdldExvZ2dlcihcIk1vZE1hbmFnZXJcIik7XG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgQVBQTFlfVEhFTUVfU0NSSVBUX0lEID0gXCJzdHJlbWlvLWVuaGFuY2VkLWFwcGx5LXRoZW1lLXNjcmlwdFwiO1xuICAgIHByaXZhdGUgc3RhdGljIHBsdWdpbkxpc3RlbmVyUmVhZHkgPSBmYWxzZTtcbiAgICBwcml2YXRlIHN0YXRpYyBwbHVnaW5MaXN0ZW5lclNldHVwUGVuZGluZyA9IGZhbHNlO1xuICAgIHByaXZhdGUgc3RhdGljIHNjcm9sbExpc3RlbmVyUmVhZHkgPSBmYWxzZTtcbiAgICBwcml2YXRlIHN0YXRpYyBzY3JvbGxMaXN0ZW5lclNldHVwUGVuZGluZyA9IGZhbHNlO1xuXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0RW5hYmxlZFBsdWdpbnMoKTogc3RyaW5nW10ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3Qgc3RvcmVkVmFsdWU6IHVua25vd24gPSBKU09OLnBhcnNlKFxuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5nZXRJdGVtKFNUT1JBR0VfS0VZUy5FTkFCTEVEX1BMVUdJTlMpIHx8IFwiW11cIlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KHN0b3JlZFZhbHVlKVxuICAgICAgICAgICAgICAgID8gc3RvcmVkVmFsdWUuZmlsdGVyKCh2YWx1ZSk6IHZhbHVlIGlzIHN0cmluZyA9PiB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpXG4gICAgICAgICAgICAgICAgOiBbXTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLndhcm4oYEZhaWxlZCB0byBwYXJzZSBlbmFibGVkIHBsdWdpbnM6ICR7ZXJyb3J9YCk7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBkZWNvZGVGaWxlTmFtZShmaWxlTmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoZmlsZU5hbWUpO1xuICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAgIHJldHVybiBmaWxlTmFtZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIHNhbml0aXplTW9kRmlsZU5hbWUoXG4gICAgICAgIGZpbGVOYW1lOiBzdHJpbmcsXG4gICAgICAgIHR5cGU6IFwicGx1Z2luXCIgfCBcInRoZW1lXCJcbiAgICApOiBzdHJpbmcgfCBudWxsIHtcbiAgICAgICAgY29uc3QgZXhwZWN0ZWRFeHRlbnNpb24gPSB0eXBlID09PSBcInRoZW1lXCJcbiAgICAgICAgICAgID8gRklMRV9FWFRFTlNJT05TLlRIRU1FXG4gICAgICAgICAgICA6IEZJTEVfRVhURU5TSU9OUy5QTFVHSU47XG5cbiAgICAgICAgY29uc3Qgbm9ybWFsaXplZCA9IHRoaXMuZGVjb2RlRmlsZU5hbWUoYmFzZW5hbWUoZmlsZU5hbWUpLnRyaW0oKSk7XG4gICAgICAgIGlmICghbm9ybWFsaXplZCkgcmV0dXJuIG51bGw7XG4gICAgICAgIGlmICghbm9ybWFsaXplZC5lbmRzV2l0aChleHBlY3RlZEV4dGVuc2lvbikpIHJldHVybiBudWxsO1xuICAgICAgICBpZiAoIS9eW0EtWmEtejAtOS5fLV0rJC8udGVzdChub3JtYWxpemVkKSkgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgcmV0dXJuIG5vcm1hbGl6ZWQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgaXNTdXBwb3J0ZWRSZW1vdGVVcmwocmF3VXJsOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHVybCA9IG5ldyBVUkwocmF3VXJsKTtcbiAgICAgICAgICAgIHJldHVybiB1cmwucHJvdG9jb2wgPT09IFwiaHR0cHM6XCIgfHwgdXJsLnByb3RvY29sID09PSBcImh0dHA6XCI7XG4gICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIC8qKlxuICAgICAqIExvYWQgYW5kIGVuYWJsZSBhIHBsdWdpbiBieSBmaWxlbmFtZVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgYXN5bmMgbG9hZFBsdWdpbihwbHVnaW5OYW1lOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBsdWdpbk5hbWUpKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKGBQbHVnaW4gJHtwbHVnaW5OYW1lfSBpcyBhbHJlYWR5IGxvYWRlZGApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcGx1Z2luUGF0aCA9IGpvaW4ocHJvcGVydGllcy5wbHVnaW5zUGF0aCwgcGx1Z2luTmFtZSk7XG4gICAgICAgIFxuICAgICAgICBpZiAoIWF3YWl0IFBsYXRmb3JtTWFuYWdlci5jdXJyZW50LmV4aXN0cyhwbHVnaW5QYXRoKSkge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoYFBsdWdpbiBmaWxlIG5vdCBmb3VuZDogJHtwbHVnaW5QYXRofWApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHBsdWdpbjogc3RyaW5nO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcGx1Z2luID0gYXdhaXQgUGxhdGZvcm1NYW5hZ2VyLmN1cnJlbnQucmVhZEZpbGUocGx1Z2luUGF0aCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcihgRmFpbGVkIHRvIHJlYWQgcGx1Z2luICR7cGx1Z2luTmFtZX06ICR7ZXJyb3J9YCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtZXRhRGF0YSA9IEV4dHJhY3RNZXRhRGF0YS5leHRyYWN0TWV0YWRhdGFGcm9tVGV4dChwbHVnaW4pO1xuICAgICAgICBQbHVnaW5PcHRpb25zLnJlZ2lzdGVyKHBsdWdpbk5hbWUsIG1ldGFEYXRhPy5vcHRpb25zID8/IFtdKTtcblxuICAgICAgICBjb25zdCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuICAgICAgICBzY3JpcHQudGV4dENvbnRlbnQgPSBwbHVnaW47XG4gICAgICAgIHNjcmlwdC5pZCA9IHBsdWdpbk5hbWU7XG4gICAgICAgIHNjcmlwdC5kYXRhc2V0LnN0cmVtaW9FbmhhbmNlZFBsdWdpbiA9IHBsdWdpbk5hbWU7XG4gICAgICAgIFxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBlbmFibGVkUGx1Z2lucyA9IHRoaXMuZ2V0RW5hYmxlZFBsdWdpbnMoKTtcbiAgICAgICAgXG4gICAgICAgIGlmICghZW5hYmxlZFBsdWdpbnMuaW5jbHVkZXMocGx1Z2luTmFtZSkpIHtcbiAgICAgICAgICAgIGVuYWJsZWRQbHVnaW5zLnB1c2gocGx1Z2luTmFtZSk7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShTVE9SQUdFX0tFWVMuRU5BQkxFRF9QTFVHSU5TLCBKU09OLnN0cmluZ2lmeShlbmFibGVkUGx1Z2lucykpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKGBQbHVnaW4gJHtwbHVnaW5OYW1lfSBsb2FkZWQhYCk7XG4gICAgfVxuICAgIFxuICAgIC8qKlxuICAgICAqIFVubG9hZCBhbmQgZGlzYWJsZSBhIHBsdWdpbiBieSBmaWxlbmFtZVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgdW5sb2FkUGx1Z2luKHBsdWdpbk5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBjb25zdCBwbHVnaW5FbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocGx1Z2luTmFtZSk7XG4gICAgICAgIGlmIChwbHVnaW5FbGVtZW50KSB7XG4gICAgICAgICAgICBwbHVnaW5FbGVtZW50LnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsZXQgZW5hYmxlZFBsdWdpbnMgPSB0aGlzLmdldEVuYWJsZWRQbHVnaW5zKCk7XG4gICAgICAgIGVuYWJsZWRQbHVnaW5zID0gZW5hYmxlZFBsdWdpbnMuZmlsdGVyKCh4OiBzdHJpbmcpID0+IHggIT09IHBsdWdpbk5hbWUpO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShTVE9SQUdFX0tFWVMuRU5BQkxFRF9QTFVHSU5TLCBKU09OLnN0cmluZ2lmeShlbmFibGVkUGx1Z2lucykpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5sb2dnZXIuaW5mbyhgUGx1Z2luICR7cGx1Z2luTmFtZX0gdW5sb2FkZWQhYCk7XG4gICAgICAgIHJlbG9hZEFwcGxpY2F0aW9uKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRmV0Y2ggbW9kcyBmcm9tIHRoZSByZWdpc3RyeSByZXBvc2l0b3J5XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBhc3luYyBmZXRjaE1vZHMoKTogUHJvbWlzZTx7IHBsdWdpbnM6IHVua25vd25bXTsgdGhlbWVzOiB1bmtub3duW10gfT4ge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFVSTFMuUkVHSVNUUlkpO1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERvd25sb2FkIGFuZCBzYXZlIGEgbW9kIChwbHVnaW4gb3IgdGhlbWUpXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBhc3luYyBkb3dubG9hZE1vZChtb2RMaW5rOiBzdHJpbmcsIHR5cGU6IFwicGx1Z2luXCIgfCBcInRoZW1lXCIpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKGBEb3dubG9hZGluZyAke3R5cGV9IGZyb206ICR7bW9kTGlua31gKTtcblxuICAgICAgICBjb25zdCBtb2RVcmwgPSBuZXcgVVJMKG1vZExpbmspO1xuICAgICAgICBpZiAobW9kVXJsLnByb3RvY29sICE9PSBcImh0dHBzOlwiICYmIG1vZFVybC5wcm90b2NvbCAhPT0gXCJodHRwOlwiKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuc3VwcG9ydGVkIFVSTCBwcm90b2NvbCBmb3IgJHt0eXBlfTogJHttb2RVcmwucHJvdG9jb2x9YCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKG1vZFVybC50b1N0cmluZygpKTtcbiAgICAgICAgaWYgKCFyZXNwb25zZS5vaykgdGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgdG8gZG93bmxvYWQ6ICR7cmVzcG9uc2Uuc3RhdHVzfSAke3Jlc3BvbnNlLnN0YXR1c1RleHR9YCk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBzYXZlRGlyID0gdHlwZSA9PT0gXCJwbHVnaW5cIiA/IHByb3BlcnRpZXMucGx1Z2luc1BhdGggOiBwcm9wZXJ0aWVzLnRoZW1lc1BhdGg7XG4gICAgICAgIGlmICghYXdhaXQgUGxhdGZvcm1NYW5hZ2VyLmN1cnJlbnQuZXhpc3RzKHNhdmVEaXIpKSB7XG4gICAgICAgICAgICBhd2FpdCBQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC5ta2RpcihzYXZlRGlyKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgY29uc3QgZmFsbGJhY2tOYW1lID0gYCR7dHlwZX0tJHtEYXRlLm5vdygpfSR7dHlwZSA9PT0gXCJ0aGVtZVwiID8gRklMRV9FWFRFTlNJT05TLlRIRU1FIDogRklMRV9FWFRFTlNJT05TLlBMVUdJTn1gO1xuICAgICAgICBjb25zdCB1bnNhZmVOYW1lID0gYmFzZW5hbWUobW9kVXJsLnBhdGhuYW1lKSB8fCBmYWxsYmFja05hbWU7XG4gICAgICAgIGNvbnN0IGZpbGVuYW1lID0gdGhpcy5zYW5pdGl6ZU1vZEZpbGVOYW1lKHVuc2FmZU5hbWUsIHR5cGUpO1xuICAgICAgICBpZiAoIWZpbGVuYW1lKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFJlZnVzZWQgdG8gc2F2ZSAke3R5cGV9IHdpdGggdW5zYWZlIGZpbGVuYW1lOiAke3Vuc2FmZU5hbWV9YCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBmaWxlUGF0aCA9IGpvaW4oc2F2ZURpciwgZmlsZW5hbWUpO1xuXG4gICAgICAgIGNvbnN0IGNvbnRlbnQgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XG4gICAgICAgIGF3YWl0IFBsYXRmb3JtTWFuYWdlci5jdXJyZW50LndyaXRlRmlsZShmaWxlUGF0aCwgY29udGVudCk7XG5cbiAgICAgICAgdGhpcy5sb2dnZXIuaW5mbyhgRG93bmxvYWRlZCAke3R5cGV9IHNhdmVkIHRvOiAke2ZpbGVQYXRofWApO1xuICAgICAgICByZXR1cm4gZmlsZVBhdGg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGEgbW9kIGZpbGUgYW5kIGNsZWFuIHVwIGFzc29jaWF0ZWQgc3RhdGVcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGFzeW5jIHJlbW92ZU1vZChmaWxlTmFtZTogc3RyaW5nLCB0eXBlOiBcInBsdWdpblwiIHwgXCJ0aGVtZVwiKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHRoaXMubG9nZ2VyLmluZm8oYFJlbW92aW5nICR7dHlwZX0gZmlsZTogJHtmaWxlTmFtZX1gKTtcblxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJwbHVnaW5cIjpcbiAgICAgICAgICAgICAgICBpZiAoYXdhaXQgdGhpcy5pc1BsdWdpbkluc3RhbGxlZChmaWxlTmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgd2FzRW5hYmxlZCA9IHRoaXMuZ2V0RW5hYmxlZFBsdWdpbnMoKS5pbmNsdWRlcyhmaWxlTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IFBsYXRmb3JtTWFuYWdlci5jdXJyZW50LnVubGluayhqb2luKHByb3BlcnRpZXMucGx1Z2luc1BhdGgsIGZpbGVOYW1lKSk7XG4gICAgICAgICAgICAgICAgICAgIFBsdWdpbk9wdGlvbnMucmVtb3ZlKGZpbGVOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHdhc0VuYWJsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudW5sb2FkUGx1Z2luKGZpbGVOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJ0aGVtZVwiOlxuICAgICAgICAgICAgICAgIGlmIChhd2FpdCB0aGlzLmlzVGhlbWVJbnN0YWxsZWQoZmlsZU5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbShTVE9SQUdFX0tFWVMuQ1VSUkVOVF9USEVNRSkgPT09IGZpbGVOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShTVE9SQUdFX0tFWVMuQ1VSUkVOVF9USEVNRSwgXCJEZWZhdWx0XCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWN0aXZlVGhlbWVcIik/LnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC51bmxpbmsoam9pbihwcm9wZXJ0aWVzLnRoZW1lc1BhdGgsIGZpbGVOYW1lKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBhc3luYyBpc1RoZW1lSW5zdGFsbGVkKGZpbGVOYW1lOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgcmV0dXJuIChhd2FpdCB0aGlzLmdldEluc3RhbGxlZFRoZW1lcygpKS5pbmNsdWRlcyhmaWxlTmFtZSk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBhc3luYyBpc1BsdWdpbkluc3RhbGxlZChmaWxlTmFtZTogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICAgIHJldHVybiAoYXdhaXQgdGhpcy5nZXRJbnN0YWxsZWRQbHVnaW5zKCkpLmluY2x1ZGVzKGZpbGVOYW1lKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBhc3luYyBnZXRJbnN0YWxsZWRUaGVtZXMoKTogUHJvbWlzZTxzdHJpbmdbXT4ge1xuICAgICAgICBjb25zdCBkaXJQYXRoID0gcHJvcGVydGllcy50aGVtZXNQYXRoO1xuICAgICAgICBpZiAoIWF3YWl0IFBsYXRmb3JtTWFuYWdlci5jdXJyZW50LmV4aXN0cyhkaXJQYXRoKSkgcmV0dXJuIFtdO1xuXG4gICAgICAgIGNvbnN0IGZpbGVzID0gYXdhaXQgUGxhdGZvcm1NYW5hZ2VyLmN1cnJlbnQucmVhZGRpcihkaXJQYXRoKTtcbiAgICAgICAgY29uc3QgZmlsZVN0YXRzID0gYXdhaXQgUHJvbWlzZS5hbGwoZmlsZXMubWFwKGFzeW5jIGZpbGUgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc3RhdCA9IGF3YWl0IFBsYXRmb3JtTWFuYWdlci5jdXJyZW50LnN0YXQoam9pbihkaXJQYXRoLCBmaWxlKSk7XG4gICAgICAgICAgICByZXR1cm4geyBmaWxlLCBpc0ZpbGU6IHN0YXQuaXNGaWxlIH07XG4gICAgICAgIH0pKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmaWxlU3RhdHMuZmlsdGVyKGYgPT4gZi5pc0ZpbGUpLm1hcChmID0+IGYuZmlsZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgYXN5bmMgZ2V0SW5zdGFsbGVkUGx1Z2lucygpOiBQcm9taXNlPHN0cmluZ1tdPiB7XG4gICAgICAgIGNvbnN0IGRpclBhdGggPSBwcm9wZXJ0aWVzLnBsdWdpbnNQYXRoO1xuICAgICAgICBpZiAoIWF3YWl0IFBsYXRmb3JtTWFuYWdlci5jdXJyZW50LmV4aXN0cyhkaXJQYXRoKSkgcmV0dXJuIFtdO1xuXG4gICAgICAgIGNvbnN0IGZpbGVzID0gYXdhaXQgUGxhdGZvcm1NYW5hZ2VyLmN1cnJlbnQucmVhZGRpcihkaXJQYXRoKTtcbiAgICAgICAgY29uc3QgZmlsZVN0YXRzID0gYXdhaXQgUHJvbWlzZS5hbGwoZmlsZXMubWFwKGFzeW5jIGZpbGUgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc3RhdCA9IGF3YWl0IFBsYXRmb3JtTWFuYWdlci5jdXJyZW50LnN0YXQoam9pbihkaXJQYXRoLCBmaWxlKSk7XG4gICAgICAgICAgICByZXR1cm4geyBmaWxlLCBpc0ZpbGU6IHN0YXQuaXNGaWxlIH07XG4gICAgICAgIH0pKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmaWxlU3RhdHMuZmlsdGVyKGYgPT4gZi5pc0ZpbGUpLm1hcChmID0+IGYuZmlsZSk7XG4gICAgfVxuICAgIFxuICAgIC8qKlxuICAgICAqIFNldCB1cCBldmVudCBsaXN0ZW5lcnMgZm9yIHBsdWdpbiB0b2dnbGUgY2hlY2tib3hlc1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgdG9nZ2xlUGx1Z2luTGlzdGVuZXIoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnBsdWdpbkxpc3RlbmVyUmVhZHkgfHwgdGhpcy5wbHVnaW5MaXN0ZW5lclNldHVwUGVuZGluZykgcmV0dXJuO1xuICAgICAgICB0aGlzLnBsdWdpbkxpc3RlbmVyU2V0dXBQZW5kaW5nID0gdHJ1ZTtcblxuICAgICAgICBoZWxwZXJzLndhaXRGb3JFbG0oU0VMRUNUT1JTLlBMVUdJTlNfQ0FURUdPUlkpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIuaW5mbyhcIkxpc3RlbmluZyB0byBwbHVnaW4gY2hlY2tib3hlcy4uLlwiKTtcbiAgICAgICAgICAgIGNvbnN0IHBsdWdpbkNoZWNrYm94ZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwicGx1Z2luXCIpIGFzIEhUTUxDb2xsZWN0aW9uT2Y8SFRNTEVsZW1lbnQ+O1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsdWdpbkNoZWNrYm94ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAocGx1Z2luQ2hlY2tib3hlc1tpXS5kYXRhc2V0LnN0cmVtaW9FbmhhbmNlZFRvZ2dsZUJvdW5kID09PSBcInRydWVcIikge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBwbHVnaW5DaGVja2JveGVzW2ldLmRhdGFzZXQuc3RyZW1pb0VuaGFuY2VkVG9nZ2xlQm91bmQgPSBcInRydWVcIjtcbiAgICAgICAgICAgICAgICBwbHVnaW5DaGVja2JveGVzW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHBsdWdpbkNoZWNrYm94ZXNbaV0uY2xhc3NMaXN0LnRvZ2dsZShDTEFTU0VTLkNIRUNLRUQpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwbHVnaW5OYW1lID0gcGx1Z2luQ2hlY2tib3hlc1tpXS5nZXRBdHRyaWJ1dGUoJ25hbWUnKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIXBsdWdpbk5hbWUpIHJldHVybjtcblxuICAgICAgICAgICAgICAgICAgICBpZiAocGx1Z2luQ2hlY2tib3hlc1tpXS5jbGFzc0xpc3QuY29udGFpbnMoQ0xBU1NFUy5DSEVDS0VEKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5sb2FkUGx1Z2luKHBsdWdpbk5hbWUpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51bmxvYWRQbHVnaW4ocGx1Z2luTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucGx1Z2luTGlzdGVuZXJSZWFkeSA9IHRydWU7XG4gICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci53YXJuKGBQbHVnaW4gbGlzdGVuZXJzIHdlcmUgbm90IHJlYWR5OiAke2Vycn1gKTtcbiAgICAgICAgfSkuZmluYWxseSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbkxpc3RlbmVyU2V0dXBQZW5kaW5nID0gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgb3BlblRoZW1lc0ZvbGRlcigpOiB2b2lkIHtcbiAgICAgICAgaGVscGVycy53YWl0Rm9yRWxtKFwiI29wZW50aGVtZXNmb2xkZXJCdG5cIikudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm9wZW50aGVtZXNmb2xkZXJCdG5cIikgYXMgSFRNTEVsZW1lbnQgfCBudWxsO1xuICAgICAgICAgICAgaWYgKCFidXR0b24gfHwgYnV0dG9uLmRhdGFzZXQuc3RyZW1pb0VuaGFuY2VkQ2xpY2tCb3VuZCA9PT0gXCJ0cnVlXCIpIHJldHVybjtcblxuICAgICAgICAgICAgYnV0dG9uLmRhdGFzZXQuc3RyZW1pb0VuaGFuY2VkQ2xpY2tCb3VuZCA9IFwidHJ1ZVwiO1xuICAgICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5vcGVuRm9sZGVyKHByb3BlcnRpZXMudGhlbWVzUGF0aCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSkuY2F0Y2goZXJyID0+IHRoaXMubG9nZ2VyLmVycm9yKGBGYWlsZWQgdG8gc2V0dXAgdGhlbWVzIGZvbGRlciBidXR0b246ICR7ZXJyfWApKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIG9wZW5QbHVnaW5zRm9sZGVyKCk6IHZvaWQge1xuICAgICAgICBoZWxwZXJzLndhaXRGb3JFbG0oXCIjb3BlbnBsdWdpbnNmb2xkZXJCdG5cIikudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm9wZW5wbHVnaW5zZm9sZGVyQnRuXCIpIGFzIEhUTUxFbGVtZW50IHwgbnVsbDtcbiAgICAgICAgICAgIGlmICghYnV0dG9uIHx8IGJ1dHRvbi5kYXRhc2V0LnN0cmVtaW9FbmhhbmNlZENsaWNrQm91bmQgPT09IFwidHJ1ZVwiKSByZXR1cm47XG5cbiAgICAgICAgICAgIGJ1dHRvbi5kYXRhc2V0LnN0cmVtaW9FbmhhbmNlZENsaWNrQm91bmQgPSBcInRydWVcIjtcbiAgICAgICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMub3BlbkZvbGRlcihwcm9wZXJ0aWVzLnBsdWdpbnNQYXRoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KS5jYXRjaChlcnIgPT4gdGhpcy5sb2dnZXIuZXJyb3IoYEZhaWxlZCB0byBzZXR1cCBwbHVnaW5zIGZvbGRlciBidXR0b246ICR7ZXJyfWApKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPcGVuIGEgZm9sZGVyIGluIHRoZSBzeXN0ZW0gZmlsZSBleHBsb3JlclxuICAgICAqL1xuICAgIHByaXZhdGUgc3RhdGljIGFzeW5jIG9wZW5Gb2xkZXIoZm9sZGVyUGF0aDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCBQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC5vcGVuUGF0aChmb2xkZXJQYXRoKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLmVycm9yKGBGYWlsZWQgdG8gb3BlbiBmb2xkZXIgJHtmb2xkZXJQYXRofTogJHtlcnJvcn1gKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAgICAgXG4gICAgcHVibGljIHN0YXRpYyBzY3JvbGxMaXN0ZW5lcigpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuc2Nyb2xsTGlzdGVuZXJSZWFkeSB8fCB0aGlzLnNjcm9sbExpc3RlbmVyU2V0dXBQZW5kaW5nKSByZXR1cm47XG4gICAgICAgIHRoaXMuc2Nyb2xsTGlzdGVuZXJTZXR1cFBlbmRpbmcgPSB0cnVlO1xuXG4gICAgICAgIGhlbHBlcnMud2FpdEZvckVsbSgnW2RhdGEtc2VjdGlvbj1cImVuaGFuY2VkXCJdJykudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbmhhbmNlZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlbmhhbmNlZCcpO1xuICAgICAgICAgICAgY29uc3QgZW5oYW5jZWROYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zZWN0aW9uPVwiZW5oYW5jZWRcIl0nKSBhcyBIVE1MRWxlbWVudCB8IG51bGw7XG5cbiAgICAgICAgICAgIGlmICghKGVuaGFuY2VkIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHx8ICFlbmhhbmNlZE5hdikgcmV0dXJuO1xuXG4gICAgICAgICAgICBpZiAoZW5oYW5jZWROYXYuZGF0YXNldC5zdHJlbWlvRW5oYW5jZWRTY3JvbGxCb3VuZCA9PT0gXCJ0cnVlXCIpIHJldHVybjtcbiAgICAgICAgICAgIGVuaGFuY2VkTmF2LmRhdGFzZXQuc3RyZW1pb0VuaGFuY2VkU2Nyb2xsQm91bmQgPSBcInRydWVcIjtcblxuICAgICAgICAgICAgZW5oYW5jZWROYXYuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBmaXJzdENoaWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlbmhhbmNlZCA+IGRpdlwiKTtcbiAgICAgICAgICAgICAgICBmaXJzdENoaWxkPy5zY3JvbGxJbnRvVmlldyh7XG4gICAgICAgICAgICAgICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJyxcbiAgICAgICAgICAgICAgICAgICAgYmxvY2s6ICdzdGFydCdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBTZXR0aW5ncy5hY3RpdmVTZWN0aW9uKGVuaGFuY2VkTmF2KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcigoZW50cmllcykgPT4ge1xuICAgICAgICAgICAgICAgIGVudHJpZXMuZm9yRWFjaChlbnRyeSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgU2V0dGluZ3MuYWN0aXZlU2VjdGlvbihlbmhhbmNlZE5hdik7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbmhhbmNlZE5hdi5jbGFzc0xpc3QucmVtb3ZlKENMQVNTRVMuU0VMRUNURUQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LCB7IHRocmVzaG9sZDogMC4xIH0pO1xuICAgICAgICBcbiAgICAgICAgICAgIG9ic2VydmVyLm9ic2VydmUoZW5oYW5jZWQpO1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxMaXN0ZW5lclJlYWR5ID0gdHJ1ZTtcbiAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLndhcm4oYEVuaGFuY2VkIHNjcm9sbCBsaXN0ZW5lciB3YXMgbm90IHJlYWR5OiAke2Vycn1gKTtcbiAgICAgICAgfSkuZmluYWxseSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbExpc3RlbmVyU2V0dXBQZW5kaW5nID0gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICAvKipcbiAgICAgKiBBZGQgdGhlIGFwcGx5VGhlbWUgZnVuY3Rpb24gdG8gdGhlIHBhZ2VcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGFkZEFwcGx5VGhlbWVGdW5jdGlvbigpOiB2b2lkIHtcbiAgICAgICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuQVBQTFlfVEhFTUVfU0NSSVBUX0lEKSkgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IGFwcGx5VGhlbWVTY3JpcHQgPSBnZXRBcHBseVRoZW1lVGVtcGxhdGUoKTtcbiAgICAgICAgY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTsgIFxuICAgICAgICBzY3JpcHQuaW5uZXJIVE1MID0gYXBwbHlUaGVtZVNjcmlwdDtcbiAgICAgICAgc2NyaXB0LmlkID0gdGhpcy5BUFBMWV9USEVNRV9TQ1JJUFRfSUQ7XG4gICAgICAgIFxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gICAgfVxuICAgIFxuICAgIC8qKlxuICAgICAqIENoZWNrIGZvciB1cGRhdGVzIGZvciBhIHNwZWNpZmljIHBsdWdpbiBvciB0aGVtZVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgYXN5bmMgY2hlY2tGb3JJdGVtVXBkYXRlcyhpdGVtRmlsZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHRoaXMubG9nZ2VyLmluZm8oJ0NoZWNraW5nIGZvciB1cGRhdGVzIGZvciAnICsgaXRlbUZpbGUpO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgaXRlbUJveCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKGAke2l0ZW1GaWxlfS1ib3hgKVswXTtcbiAgICAgICAgaWYgKCFpdGVtQm94KSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci53YXJuKGAke2l0ZW1GaWxlfS1ib3ggZWxlbWVudCBub3QgZm91bmQuYCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwbHVnaW5PclRoZW1lOiAndGhlbWUnIHwgJ3BsdWdpbicgPSBpdGVtRmlsZS5lbmRzV2l0aChcIi50aGVtZS5jc3NcIikgPyBcInRoZW1lXCIgOiBcInBsdWdpblwiO1xuICAgICAgICBjb25zdCBpdGVtUGF0aCA9IGpvaW4oXG4gICAgICAgICAgICBwbHVnaW5PclRoZW1lID09PSBcInRoZW1lXCIgPyBwcm9wZXJ0aWVzLnRoZW1lc1BhdGggOiBwcm9wZXJ0aWVzLnBsdWdpbnNQYXRoLCBcbiAgICAgICAgICAgIGl0ZW1GaWxlXG4gICAgICAgICk7XG4gICAgICAgIFxuICAgICAgICAvLyBSZWZhY3RvcmVkOiBSZWFkIGZpbGUgZmlyc3RcbiAgICAgICAgbGV0IGZpbGVDb250ZW50ID0gXCJcIjtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZpbGVDb250ZW50ID0gYXdhaXQgUGxhdGZvcm1NYW5hZ2VyLmN1cnJlbnQucmVhZEZpbGUoaXRlbVBhdGgpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcihgRmFpbGVkIHRvIHJlYWQgZmlsZSAke2l0ZW1QYXRofTogJHtlfWApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgaW5zdGFsbGVkSXRlbU1ldGFEYXRhID0gRXh0cmFjdE1ldGFEYXRhLmV4dHJhY3RNZXRhZGF0YUZyb21UZXh0KGZpbGVDb250ZW50KSBhcyBNZXRhRGF0YSB8IG51bGw7XG4gICAgICAgIFxuICAgICAgICBpZiAoIWluc3RhbGxlZEl0ZW1NZXRhRGF0YSB8fCBPYmplY3Qua2V5cyhpbnN0YWxsZWRJdGVtTWV0YURhdGEpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdXBkYXRlVXJsID0gaW5zdGFsbGVkSXRlbU1ldGFEYXRhLnVwZGF0ZVVybDtcbiAgICAgICAgaWYgKCF1cGRhdGVVcmwgfHwgdXBkYXRlVXJsID09PSBcIm5vbmVcIikge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIuaW5mbyhgTm8gdXBkYXRlIFVSTCBwcm92aWRlZCBmb3IgJHtwbHVnaW5PclRoZW1lfSAoJHtpbnN0YWxsZWRJdGVtTWV0YURhdGEubmFtZX0pYCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLmlzU3VwcG9ydGVkUmVtb3RlVXJsKHVwZGF0ZVVybCkpIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLndhcm4oYFNraXBwZWQgdXBkYXRlIGZvciAke2l0ZW1GaWxlfTogdW5zdXBwb3J0ZWQgVVJMIHByb3RvY29sLmApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlcXVlc3QgPSBhd2FpdCBmZXRjaCh1cGRhdGVVcmwpO1xuICAgICAgICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzICE9PSAyMDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci53YXJuKGBGYWlsZWQgdG8gZmV0Y2ggdXBkYXRlIGZvciAke2l0ZW1GaWxlfTogSFRUUCAke3JlcXVlc3Quc3RhdHVzfWApO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCByZXF1ZXN0LnRleHQoKTtcbiAgICAgICAgICAgIGNvbnN0IGV4dHJhY3RlZE1ldGFEYXRhID0gRXh0cmFjdE1ldGFEYXRhLmV4dHJhY3RNZXRhZGF0YUZyb21UZXh0KHJlc3BvbnNlKSBhcyBNZXRhRGF0YSB8IG51bGw7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmICghZXh0cmFjdGVkTWV0YURhdGEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci53YXJuKGBGYWlsZWQgdG8gZXh0cmFjdCBtZXRhZGF0YSBmcm9tIHJlc3BvbnNlIGZvciAke3BsdWdpbk9yVGhlbWV9ICgke2luc3RhbGxlZEl0ZW1NZXRhRGF0YS5uYW1lfSlgKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChoZWxwZXJzLmlzTmV3ZXJWZXJzaW9uKGV4dHJhY3RlZE1ldGFEYXRhLnZlcnNpb24sIGluc3RhbGxlZEl0ZW1NZXRhRGF0YS52ZXJzaW9uKSkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmluZm8oXG4gICAgICAgICAgICAgICAgICAgIGBVcGRhdGUgYXZhaWxhYmxlIGZvciAke3BsdWdpbk9yVGhlbWV9ICgke2luc3RhbGxlZEl0ZW1NZXRhRGF0YS5uYW1lfSk6IGAgK1xuICAgICAgICAgICAgICAgICAgICBgdiR7aW5zdGFsbGVkSXRlbU1ldGFEYXRhLnZlcnNpb259IC0+IHYke2V4dHJhY3RlZE1ldGFEYXRhLnZlcnNpb259YFxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCB1cGRhdGVCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtpdGVtRmlsZX0tdXBkYXRlYCk7XG4gICAgICAgICAgICAgICAgaWYgKHVwZGF0ZUJ1dHRvbikge1xuICAgICAgICAgICAgICAgICAgICB1cGRhdGVCdXR0b24uc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICAgICAgICAgICAgICAgICAgICBpZiAodXBkYXRlQnV0dG9uLmRhdGFzZXQuc3RyZW1pb0VuaGFuY2VkQ2xpY2tCb3VuZCA9PT0gXCJ0cnVlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVCdXR0b24uZGF0YXNldC5zdHJlbWlvRW5oYW5jZWRDbGlja0JvdW5kID0gXCJ0cnVlXCI7XG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgUGxhdGZvcm1NYW5hZ2VyLmN1cnJlbnQud3JpdGVGaWxlKGl0ZW1QYXRoLCByZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBTZXR0aW5ncy5yZW1vdmVJdGVtKGl0ZW1GaWxlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFNldHRpbmdzLmFkZEl0ZW0ocGx1Z2luT3JUaGVtZSwgaXRlbUZpbGUsIGV4dHJhY3RlZE1ldGFEYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKFxuICAgICAgICAgICAgICAgICAgICBgTm8gdXBkYXRlIGF2YWlsYWJsZSBmb3IgJHtwbHVnaW5PclRoZW1lfSAoJHtpbnN0YWxsZWRJdGVtTWV0YURhdGEubmFtZX0pLiBgICtcbiAgICAgICAgICAgICAgICAgICAgYEN1cnJlbnQgdmVyc2lvbjogdiR7aW5zdGFsbGVkSXRlbU1ldGFEYXRhLnZlcnNpb259YFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcihgRXJyb3IgY2hlY2tpbmcgdXBkYXRlcyBmb3IgJHtpdGVtRmlsZX06ICR7KGVycm9yIGFzIEVycm9yKS5tZXNzYWdlfWApO1xuICAgICAgICB9XG4gICAgfVxufVxuICAgIFxuZXhwb3J0IGRlZmF1bHQgTW9kTWFuYWdlcjtcbiIsICJpbXBvcnQgeyBQbHVnaW5PcHRpb25EZWZpbml0aW9uIH0gZnJvbSBcIi4vUGx1Z2luT3B0aW9uXCI7XG5cbi8qKlxuICogTWV0YWRhdGEgc3RydWN0dXJlIGZvciBwbHVnaW5zIGFuZCB0aGVtZXNcbiAqIEV4dHJhY3RlZCBmcm9tIEpTRG9jLXN0eWxlIGNvbW1lbnRzIGluIG1vZCBmaWxlc1xuICovXG5leHBvcnQgaW50ZXJmYWNlIE1ldGFEYXRhIHtcbiAgICAvKiogRGlzcGxheSBuYW1lIG9mIHRoZSBtb2QgKi9cbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgLyoqIEJyaWVmIGRlc2NyaXB0aW9uIG9mIHdoYXQgdGhlIG1vZCBkb2VzICovXG4gICAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgICAvKiogQXV0aG9yL2NyZWF0b3Igb2YgdGhlIG1vZCAqL1xuICAgIGF1dGhvcjogc3RyaW5nO1xuICAgIC8qKiBTZW1hbnRpYyB2ZXJzaW9uIHN0cmluZyAoZS5nLiwgXCIxLjAuMFwiKSAqL1xuICAgIHZlcnNpb246IHN0cmluZztcbiAgICAvKiogVVJMIHRvIGNoZWNrIGZvciB1cGRhdGVzIChvcHRpb25hbCkgKi9cbiAgICB1cGRhdGVVcmw/OiBzdHJpbmc7XG4gICAgLyoqIFNvdXJjZSBjb2RlIHJlcG9zaXRvcnkgVVJMIChvcHRpb25hbCkgKi9cbiAgICBzb3VyY2U/OiBzdHJpbmc7XG4gICAgLyoqIExpY2Vuc2UgdHlwZSAob3B0aW9uYWwpICovXG4gICAgbGljZW5zZT86IHN0cmluZztcbiAgICAvKiogSG9tZXBhZ2UvZG9jdW1lbnRhdGlvbiBVUkwgKG9wdGlvbmFsKSAqL1xuICAgIGhvbWVwYWdlPzogc3RyaW5nO1xuICAgIC8qKiBWYWxpZGF0ZWQgY29uZmlndXJhdGlvbiBmaWVsZHMgZXhwb3NlZCBieSBhIHBsdWdpbiAob3B0aW9uYWwpICovXG4gICAgb3B0aW9ucz86IFBsdWdpbk9wdGlvbkRlZmluaXRpb25bXTtcbn1cblxuZXhwb3J0IHR5cGUgTWV0YWRhdGFLZXkgPSBFeGNsdWRlPGtleW9mIE1ldGFEYXRhLCBcIm9wdGlvbnNcIj47XG5cbmV4cG9ydCBjb25zdCBSRVFVSVJFRF9NRVRBREFUQV9LRVlTID0gW1xuICAgIFwibmFtZVwiLFxuICAgIFwiZGVzY3JpcHRpb25cIixcbiAgICBcImF1dGhvclwiLFxuICAgIFwidmVyc2lvblwiLFxuXSBhcyBjb25zdCBzYXRpc2ZpZXMgcmVhZG9ubHkgTWV0YWRhdGFLZXlbXTtcblxuZXhwb3J0IGNvbnN0IEFMTF9NRVRBREFUQV9LRVlTID0gW1xuICAgIFwibmFtZVwiLFxuICAgIFwiZGVzY3JpcHRpb25cIixcbiAgICBcImF1dGhvclwiLFxuICAgIFwidmVyc2lvblwiLFxuICAgIFwidXBkYXRlVXJsXCIsXG4gICAgXCJzb3VyY2VcIixcbiAgICBcImxpY2Vuc2VcIixcbiAgICBcImhvbWVwYWdlXCIsXG5dIGFzIGNvbnN0IHNhdGlzZmllcyByZWFkb25seSBNZXRhZGF0YUtleVtdO1xuIiwgImltcG9ydCB7XG4gICAgUGx1Z2luT3B0aW9uRGVmaW5pdGlvbixcbiAgICBQbHVnaW5PcHRpb25WYWx1ZSxcbiAgICBQbHVnaW5PcHRpb25WYWx1ZXMsXG4gICAgU2VsZWN0UGx1Z2luT3B0aW9uQ2hvaWNlLFxufSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9QbHVnaW5PcHRpb25cIjtcblxuY29uc3QgT1BUSU9OX0lEX1BBVFRFUk4gPSAvXltBLVphLXpdW0EtWmEtejAtOV8tXXswLDYzfSQvO1xuY29uc3QgTUFYX0xBQkVMX0xFTkdUSCA9IDEyMDtcbmNvbnN0IE1BWF9ERVNDUklQVElPTl9MRU5HVEggPSA1MDA7XG5jb25zdCBNQVhfVEVYVF9MRU5HVEggPSAxMF8wMDA7XG5jb25zdCBNQVhfQ0hPSUNFUyA9IDY0O1xuXG5mdW5jdGlvbiBpc1JlY29yZCh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIFJlY29yZDxzdHJpbmcsIHVua25vd24+IHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIHZhbHVlICE9PSBudWxsICYmICFBcnJheS5pc0FycmF5KHZhbHVlKTtcbn1cblxuZnVuY3Rpb24gaXNCb3VuZGVkU3RyaW5nKHZhbHVlOiB1bmtub3duLCBtaW5MZW5ndGg6IG51bWJlciwgbWF4TGVuZ3RoOiBudW1iZXIpOiB2YWx1ZSBpcyBzdHJpbmcge1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgJiYgdmFsdWUubGVuZ3RoID49IG1pbkxlbmd0aCAmJiB2YWx1ZS5sZW5ndGggPD0gbWF4TGVuZ3RoO1xufVxuXG5mdW5jdGlvbiBnZXRCYXNlRmllbGRzKHZhbHVlOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPikge1xuICAgIGlmICghT1BUSU9OX0lEX1BBVFRFUk4udGVzdChTdHJpbmcodmFsdWUuaWQgPz8gXCJcIikpKSByZXR1cm4gbnVsbDtcbiAgICBpZiAoIWlzQm91bmRlZFN0cmluZyh2YWx1ZS5sYWJlbCwgMSwgTUFYX0xBQkVMX0xFTkdUSCkpIHJldHVybiBudWxsO1xuICAgIGlmIChcbiAgICAgICAgdmFsdWUuZGVzY3JpcHRpb24gIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAhaXNCb3VuZGVkU3RyaW5nKHZhbHVlLmRlc2NyaXB0aW9uLCAxLCBNQVhfREVTQ1JJUFRJT05fTEVOR1RIKVxuICAgICkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBpZDogU3RyaW5nKHZhbHVlLmlkKSxcbiAgICAgICAgbGFiZWw6IHZhbHVlLmxhYmVsLFxuICAgICAgICAuLi4odmFsdWUuZGVzY3JpcHRpb24gPT09IHVuZGVmaW5lZCA/IHt9IDogeyBkZXNjcmlwdGlvbjogdmFsdWUuZGVzY3JpcHRpb24gfSksXG4gICAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlUGx1Z2luT3B0aW9uRGVmaW5pdGlvbih2YWx1ZTogdW5rbm93bik6IFBsdWdpbk9wdGlvbkRlZmluaXRpb24gfCBudWxsIHtcbiAgICBpZiAoIWlzUmVjb3JkKHZhbHVlKSkgcmV0dXJuIG51bGw7XG5cbiAgICBjb25zdCBiYXNlID0gZ2V0QmFzZUZpZWxkcyh2YWx1ZSk7XG4gICAgaWYgKCFiYXNlKSByZXR1cm4gbnVsbDtcblxuICAgIHN3aXRjaCAodmFsdWUudHlwZSkge1xuICAgICAgICBjYXNlIFwiYm9vbGVhblwiOlxuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZS5kZWZhdWx0ICE9PSBcImJvb2xlYW5cIikgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICByZXR1cm4geyAuLi5iYXNlLCB0eXBlOiBcImJvb2xlYW5cIiwgZGVmYXVsdDogdmFsdWUuZGVmYXVsdCB9O1xuXG4gICAgICAgIGNhc2UgXCJ0ZXh0XCI6IHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUuZGVmYXVsdCAhPT0gXCJzdHJpbmdcIikgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgdmFsdWUucGxhY2Vob2xkZXIgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgICAgICFpc0JvdW5kZWRTdHJpbmcodmFsdWUucGxhY2Vob2xkZXIsIDAsIDIwMClcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIHZhbHVlLm1heExlbmd0aCAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICAgICAgKFxuICAgICAgICAgICAgICAgICAgICB0eXBlb2YgdmFsdWUubWF4TGVuZ3RoICE9PSBcIm51bWJlclwiIHx8XG4gICAgICAgICAgICAgICAgICAgICFOdW1iZXIuaXNJbnRlZ2VyKHZhbHVlLm1heExlbmd0aCkgfHxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUubWF4TGVuZ3RoIDwgMSB8fFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZS5tYXhMZW5ndGggPiBNQVhfVEVYVF9MRU5HVEhcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IG1heExlbmd0aCA9IHR5cGVvZiB2YWx1ZS5tYXhMZW5ndGggPT09IFwibnVtYmVyXCIgPyB2YWx1ZS5tYXhMZW5ndGggOiBNQVhfVEVYVF9MRU5HVEg7XG4gICAgICAgICAgICBpZiAodmFsdWUuZGVmYXVsdC5sZW5ndGggPiBtYXhMZW5ndGgpIHJldHVybiBudWxsO1xuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIC4uLmJhc2UsXG4gICAgICAgICAgICAgICAgdHlwZTogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgZGVmYXVsdDogdmFsdWUuZGVmYXVsdCxcbiAgICAgICAgICAgICAgICAuLi4odmFsdWUucGxhY2Vob2xkZXIgPT09IHVuZGVmaW5lZCA/IHt9IDogeyBwbGFjZWhvbGRlcjogdmFsdWUucGxhY2Vob2xkZXIgYXMgc3RyaW5nIH0pLFxuICAgICAgICAgICAgICAgIC4uLih2YWx1ZS5tYXhMZW5ndGggPT09IHVuZGVmaW5lZCA/IHt9IDogeyBtYXhMZW5ndGg6IHZhbHVlLm1heExlbmd0aCBhcyBudW1iZXIgfSksXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSBcIm51bWJlclwiOiB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlLmRlZmF1bHQgIT09IFwibnVtYmVyXCIgfHwgIU51bWJlci5pc0Zpbml0ZSh2YWx1ZS5kZWZhdWx0KSkgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICBjb25zdCBudW1lcmljS2V5cyA9IFtcIm1pblwiLCBcIm1heFwiLCBcInN0ZXBcIl0gYXMgY29uc3Q7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBudW1lcmljS2V5cykge1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZVtrZXldICE9PSB1bmRlZmluZWQgJiYgKHR5cGVvZiB2YWx1ZVtrZXldICE9PSBcIm51bWJlclwiIHx8ICFOdW1iZXIuaXNGaW5pdGUodmFsdWVba2V5XSkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IG1pbiA9IHZhbHVlLm1pbiBhcyBudW1iZXIgfCB1bmRlZmluZWQ7XG4gICAgICAgICAgICBjb25zdCBtYXggPSB2YWx1ZS5tYXggYXMgbnVtYmVyIHwgdW5kZWZpbmVkO1xuICAgICAgICAgICAgY29uc3Qgc3RlcCA9IHZhbHVlLnN0ZXAgYXMgbnVtYmVyIHwgdW5kZWZpbmVkO1xuICAgICAgICAgICAgaWYgKG1pbiAhPT0gdW5kZWZpbmVkICYmIG1heCAhPT0gdW5kZWZpbmVkICYmIG1pbiA+IG1heCkgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICBpZiAoc3RlcCAhPT0gdW5kZWZpbmVkICYmIHN0ZXAgPD0gMCkgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICBpZiAobWluICE9PSB1bmRlZmluZWQgJiYgdmFsdWUuZGVmYXVsdCA8IG1pbikgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICBpZiAobWF4ICE9PSB1bmRlZmluZWQgJiYgdmFsdWUuZGVmYXVsdCA+IG1heCkgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgLi4uYmFzZSxcbiAgICAgICAgICAgICAgICB0eXBlOiBcIm51bWJlclwiLFxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHZhbHVlLmRlZmF1bHQsXG4gICAgICAgICAgICAgICAgLi4uKG1pbiA9PT0gdW5kZWZpbmVkID8ge30gOiB7IG1pbiB9KSxcbiAgICAgICAgICAgICAgICAuLi4obWF4ID09PSB1bmRlZmluZWQgPyB7fSA6IHsgbWF4IH0pLFxuICAgICAgICAgICAgICAgIC4uLihzdGVwID09PSB1bmRlZmluZWQgPyB7fSA6IHsgc3RlcCB9KSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBjYXNlIFwic2VsZWN0XCI6IHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUuZGVmYXVsdCAhPT0gXCJzdHJpbmdcIikgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkodmFsdWUuY2hvaWNlcykgfHwgdmFsdWUuY2hvaWNlcy5sZW5ndGggPCAxIHx8IHZhbHVlLmNob2ljZXMubGVuZ3RoID4gTUFYX0NIT0lDRVMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgY2hvaWNlczogU2VsZWN0UGx1Z2luT3B0aW9uQ2hvaWNlW10gPSBbXTtcbiAgICAgICAgICAgIGNvbnN0IHNlZW5WYWx1ZXMgPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgcmF3Q2hvaWNlIG9mIHZhbHVlLmNob2ljZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWlzUmVjb3JkKHJhd0Nob2ljZSkpIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIGlmICghaXNCb3VuZGVkU3RyaW5nKHJhd0Nob2ljZS52YWx1ZSwgMSwgMTI4KSkgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgaWYgKCFpc0JvdW5kZWRTdHJpbmcocmF3Q2hvaWNlLmxhYmVsLCAxLCBNQVhfTEFCRUxfTEVOR1RIKSkgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgaWYgKHNlZW5WYWx1ZXMuaGFzKHJhd0Nob2ljZS52YWx1ZSkpIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIHNlZW5WYWx1ZXMuYWRkKHJhd0Nob2ljZS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgY2hvaWNlcy5wdXNoKHsgdmFsdWU6IHJhd0Nob2ljZS52YWx1ZSwgbGFiZWw6IHJhd0Nob2ljZS5sYWJlbCB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghc2VlblZhbHVlcy5oYXModmFsdWUuZGVmYXVsdCkpIHJldHVybiBudWxsO1xuXG4gICAgICAgICAgICByZXR1cm4geyAuLi5iYXNlLCB0eXBlOiBcInNlbGVjdFwiLCBkZWZhdWx0OiB2YWx1ZS5kZWZhdWx0LCBjaG9pY2VzIH07XG4gICAgICAgIH1cblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplUGx1Z2luT3B0aW9uVmFsdWUoXG4gICAgZGVmaW5pdGlvbjogUGx1Z2luT3B0aW9uRGVmaW5pdGlvbixcbiAgICB2YWx1ZTogdW5rbm93blxuKTogUGx1Z2luT3B0aW9uVmFsdWUgfCB1bmRlZmluZWQge1xuICAgIHN3aXRjaCAoZGVmaW5pdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgXCJib29sZWFuXCI6XG4gICAgICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcImJvb2xlYW5cIiA/IHZhbHVlIDogdW5kZWZpbmVkO1xuXG4gICAgICAgIGNhc2UgXCJ0ZXh0XCI6IHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwic3RyaW5nXCIpIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICBjb25zdCBtYXhMZW5ndGggPSBkZWZpbml0aW9uLm1heExlbmd0aCA/PyBNQVhfVEVYVF9MRU5HVEg7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWUubGVuZ3RoIDw9IG1heExlbmd0aCA/IHZhbHVlIDogdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSBcIm51bWJlclwiOlxuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJudW1iZXJcIiB8fCAhTnVtYmVyLmlzRmluaXRlKHZhbHVlKSkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGlmIChkZWZpbml0aW9uLm1pbiAhPT0gdW5kZWZpbmVkICYmIHZhbHVlIDwgZGVmaW5pdGlvbi5taW4pIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICBpZiAoZGVmaW5pdGlvbi5tYXggIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSA+IGRlZmluaXRpb24ubWF4KSByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuXG4gICAgICAgIGNhc2UgXCJzZWxlY3RcIjpcbiAgICAgICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgJiYgZGVmaW5pdGlvbi5jaG9pY2VzLnNvbWUoY2hvaWNlID0+IGNob2ljZS52YWx1ZSA9PT0gdmFsdWUpXG4gICAgICAgICAgICAgICAgPyB2YWx1ZVxuICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFBsdWdpbk9wdGlvbkRlZmF1bHRzKGRlZmluaXRpb25zOiBQbHVnaW5PcHRpb25EZWZpbml0aW9uW10pOiBQbHVnaW5PcHRpb25WYWx1ZXMge1xuICAgIHJldHVybiBPYmplY3QuZnJvbUVudHJpZXMoZGVmaW5pdGlvbnMubWFwKGRlZmluaXRpb24gPT4gW2RlZmluaXRpb24uaWQsIGRlZmluaXRpb24uZGVmYXVsdF0pKTtcbn1cbiIsICJpbXBvcnQge1xuICAgIE1ldGFEYXRhLFxuICAgIE1ldGFkYXRhS2V5LFxuICAgIFJFUVVJUkVEX01FVEFEQVRBX0tFWVMsXG4gICAgQUxMX01FVEFEQVRBX0tFWVMsXG59IGZyb20gXCIuLi9pbnRlcmZhY2VzL01ldGFEYXRhXCI7XG5pbXBvcnQgeyBQbHVnaW5PcHRpb25EZWZpbml0aW9uIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvUGx1Z2luT3B0aW9uXCI7XG5pbXBvcnQgeyB2YWxpZGF0ZVBsdWdpbk9wdGlvbkRlZmluaXRpb24gfSBmcm9tIFwiLi9QbHVnaW5PcHRpb25TY2hlbWFcIjtcbmltcG9ydCBsb2dnZXIgZnJvbSBcIi4vbG9nZ2VyXCI7XG5cbmNsYXNzIEV4dHJhY3RNZXRhRGF0YSB7XG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgTUFYX1BMVUdJTl9PUFRJT05TID0gMzI7XG5cbiAgICAvKipcbiAgICAgKiBQYXJzZSBtZXRhZGF0YSBmcm9tIGEgY29tbWVudCBibG9jayBpbiB0aGUgZm9ybWF0OlxuICAgICAqIC8qKiBAa2V5IHZhbHVlICpcXC9cbiAgICAqL1xuICAgIHByaXZhdGUgc3RhdGljIHBhcnNlTWV0YWRhdGFGcm9tQ29udGVudChjb250ZW50OiBzdHJpbmcpOiBNZXRhRGF0YSB8IG51bGwge1xuICAgICAgICBjb25zdCBibG9ja01hdGNoID0gY29udGVudC5tYXRjaCgvXFwvXFwqXFwqKFtcXHNcXFNdKj8pXFwqXFwvLyk7XG4gICAgICAgIGlmICghYmxvY2tNYXRjaCkgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgY29uc3QgcmVzdWx0OiBQYXJ0aWFsPE1ldGFEYXRhPiA9IHt9O1xuICAgICAgICBjb25zdCB0YWdSZWdleCA9IC9AKFxcdyspXFxzKyhbXlxcblxccl0rKS9nO1xuXG4gICAgICAgIGZvciAoY29uc3QgWywgcmF3S2V5LCByYXdWYWx1ZV0gb2YgYmxvY2tNYXRjaFsxXS5tYXRjaEFsbCh0YWdSZWdleCkpIHtcbiAgICAgICAgICAgIGlmICghQUxMX01FVEFEQVRBX0tFWVMuaW5jbHVkZXMocmF3S2V5IGFzIE1ldGFkYXRhS2V5KSkgY29udGludWU7XG5cbiAgICAgICAgICAgIGNvbnN0IGtleSA9IHJhd0tleSBhcyBNZXRhZGF0YUtleTtcblxuICAgICAgICAgICAgaWYgKHJlc3VsdFtrZXldICE9PSB1bmRlZmluZWQpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICByZXN1bHRba2V5XSA9IHJhd1ZhbHVlLnRyaW0oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG9wdGlvbnM6IFBsdWdpbk9wdGlvbkRlZmluaXRpb25bXSA9IFtdO1xuICAgICAgICBjb25zdCBvcHRpb25JZHMgPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgICAgICAgY29uc3Qgb3B0aW9uUmVnZXggPSAvQG9wdGlvblxccysoW15cXG5cXHJdKykvZztcblxuICAgICAgICBmb3IgKGNvbnN0IFssIHJhd09wdGlvbl0gb2YgYmxvY2tNYXRjaFsxXS5tYXRjaEFsbChvcHRpb25SZWdleCkpIHtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmxlbmd0aCA+PSB0aGlzLk1BWF9QTFVHSU5fT1BUSU9OUykge1xuICAgICAgICAgICAgICAgIGxvZ2dlci53YXJuKGBJZ25vcmluZyBwbHVnaW4gb3B0aW9ucyBhZnRlciB0aGUgZmlyc3QgJHt0aGlzLk1BWF9QTFVHSU5fT1BUSU9OU31gKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCBvcHRpb24gPSB2YWxpZGF0ZVBsdWdpbk9wdGlvbkRlZmluaXRpb24oSlNPTi5wYXJzZShyYXdPcHRpb24udHJpbSgpKSk7XG4gICAgICAgICAgICAgICAgaWYgKCFvcHRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgbG9nZ2VyLndhcm4oYElnbm9yaW5nIGludmFsaWQgcGx1Z2luIG9wdGlvbjogJHtyYXdPcHRpb24udHJpbSgpfWApO1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbklkcy5oYXMob3B0aW9uLmlkKSkge1xuICAgICAgICAgICAgICAgICAgICBsb2dnZXIud2FybihgSWdub3JpbmcgZHVwbGljYXRlIHBsdWdpbiBvcHRpb24gaWQ6ICR7b3B0aW9uLmlkfWApO1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBvcHRpb25JZHMuYWRkKG9wdGlvbi5pZCk7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5wdXNoKG9wdGlvbik7XG4gICAgICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAgICAgICBsb2dnZXIud2FybihgSWdub3JpbmcgbWFsZm9ybWVkIHBsdWdpbiBvcHRpb24gSlNPTjogJHtyYXdPcHRpb24udHJpbSgpfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9wdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmVzdWx0Lm9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgUkVRVUlSRURfTUVUQURBVEFfS0VZUykge1xuICAgICAgICAgICAgaWYgKCFyZXN1bHRba2V5XSkgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0IGFzIE1ldGFEYXRhO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZXh0cmFjdE1ldGFkYXRhRnJvbVRleHQodGV4dENvbnRlbnQ6IHN0cmluZyk6IE1ldGFEYXRhIHwgbnVsbCB7XG4gICAgICAgIGNvbnN0IG1ldGFkYXRhID0gdGhpcy5wYXJzZU1ldGFkYXRhRnJvbUNvbnRlbnQodGV4dENvbnRlbnQpO1xuICAgICAgICBcbiAgICAgICAgaWYgKCFtZXRhZGF0YSkge1xuICAgICAgICAgICAgbG9nZ2VyLmVycm9yKCdDb21tZW50IGJsb2NrIG5vdCBmb3VuZCBpbiB0aGUgcHJvdmlkZWQgdGV4dCcpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gbWV0YWRhdGE7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBFeHRyYWN0TWV0YURhdGE7XG4iLCAiaW1wb3J0IHsgRklMRV9FWFRFTlNJT05TLCBTVE9SQUdFX0tFWVMgfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQge1xuICAgIFBsdWdpbk9wdGlvbkRlZmluaXRpb24sXG4gICAgUGx1Z2luT3B0aW9uVmFsdWVzLFxufSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9QbHVnaW5PcHRpb25cIjtcbmltcG9ydCB7XG4gICAgZ2V0UGx1Z2luT3B0aW9uRGVmYXVsdHMsXG4gICAgbm9ybWFsaXplUGx1Z2luT3B0aW9uVmFsdWUsXG59IGZyb20gXCIuLi91dGlscy9QbHVnaW5PcHRpb25TY2hlbWFcIjtcbmltcG9ydCB7IGdldExvZ2dlciB9IGZyb20gXCIuLi91dGlscy9sb2dnZXJcIjtcblxuY2xhc3MgUGx1Z2luT3B0aW9ucyB7XG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgbG9nZ2VyID0gZ2V0TG9nZ2VyKFwiUGx1Z2luT3B0aW9uc1wiKTtcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBzY2hlbWFzID0gbmV3IE1hcDxzdHJpbmcsIFBsdWdpbk9wdGlvbkRlZmluaXRpb25bXT4oKTtcblxuICAgIHByaXZhdGUgc3RhdGljIGlzU2FmZVBsdWdpbkZpbGVOYW1lKHBsdWdpbkZpbGU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgL15bQS1aYS16MC05Ll8tXSskLy50ZXN0KHBsdWdpbkZpbGUpICYmXG4gICAgICAgICAgICBwbHVnaW5GaWxlLmVuZHNXaXRoKEZJTEVfRVhURU5TSU9OUy5QTFVHSU4pXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0U3RvcmFnZUtleShwbHVnaW5GaWxlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYCR7U1RPUkFHRV9LRVlTLlBMVUdJTl9PUFRJT05TX1BSRUZJWH0ke3BsdWdpbkZpbGV9YDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBjbG9uZURlZmluaXRpb25zKGRlZmluaXRpb25zOiBQbHVnaW5PcHRpb25EZWZpbml0aW9uW10pOiBQbHVnaW5PcHRpb25EZWZpbml0aW9uW10ge1xuICAgICAgICByZXR1cm4gZGVmaW5pdGlvbnMubWFwKGRlZmluaXRpb24gPT4gKFxuICAgICAgICAgICAgZGVmaW5pdGlvbi50eXBlID09PSBcInNlbGVjdFwiXG4gICAgICAgICAgICAgICAgPyB7IC4uLmRlZmluaXRpb24sIGNob2ljZXM6IGRlZmluaXRpb24uY2hvaWNlcy5tYXAoY2hvaWNlID0+ICh7IC4uLmNob2ljZSB9KSkgfVxuICAgICAgICAgICAgICAgIDogeyAuLi5kZWZpbml0aW9uIH1cbiAgICAgICAgKSk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyByZWdpc3RlcihwbHVnaW5GaWxlOiBzdHJpbmcsIGRlZmluaXRpb25zOiBQbHVnaW5PcHRpb25EZWZpbml0aW9uW10gPSBbXSk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoIXRoaXMuaXNTYWZlUGx1Z2luRmlsZU5hbWUocGx1Z2luRmlsZSkpIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLndhcm4oYFJlZnVzZWQgdG8gcmVnaXN0ZXIgb3B0aW9ucyBmb3IgdW5zYWZlIHBsdWdpbiBmaWxlbmFtZTogJHtwbHVnaW5GaWxlfWApO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zY2hlbWFzLnNldChwbHVnaW5GaWxlLCB0aGlzLmNsb25lRGVmaW5pdGlvbnMoZGVmaW5pdGlvbnMpKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBoYXNPcHRpb25zKHBsdWdpbkZpbGU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gKHRoaXMuc2NoZW1hcy5nZXQocGx1Z2luRmlsZSk/Lmxlbmd0aCA/PyAwKSA+IDA7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXREZWZpbml0aW9ucyhwbHVnaW5GaWxlOiBzdHJpbmcpOiBQbHVnaW5PcHRpb25EZWZpbml0aW9uW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZURlZmluaXRpb25zKHRoaXMuc2NoZW1hcy5nZXQocGx1Z2luRmlsZSkgPz8gW10pO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0KHBsdWdpbkZpbGU6IHN0cmluZyk6IFBsdWdpbk9wdGlvblZhbHVlcyB7XG4gICAgICAgIGlmICghdGhpcy5pc1NhZmVQbHVnaW5GaWxlTmFtZShwbHVnaW5GaWxlKSkgcmV0dXJuIHt9O1xuXG4gICAgICAgIGNvbnN0IGRlZmluaXRpb25zID0gdGhpcy5zY2hlbWFzLmdldChwbHVnaW5GaWxlKSA/PyBbXTtcbiAgICAgICAgY29uc3QgdmFsdWVzID0gZ2V0UGx1Z2luT3B0aW9uRGVmYXVsdHMoZGVmaW5pdGlvbnMpO1xuICAgICAgICBpZiAoZGVmaW5pdGlvbnMubGVuZ3RoID09PSAwKSByZXR1cm4gdmFsdWVzO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByYXdWYWx1ZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKHRoaXMuZ2V0U3RvcmFnZUtleShwbHVnaW5GaWxlKSk7XG4gICAgICAgICAgICBpZiAoIXJhd1ZhbHVlKSByZXR1cm4gdmFsdWVzO1xuXG4gICAgICAgICAgICBjb25zdCBzdG9yZWRWYWx1ZTogdW5rbm93biA9IEpTT04ucGFyc2UocmF3VmFsdWUpO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBzdG9yZWRWYWx1ZSAhPT0gXCJvYmplY3RcIiB8fCBzdG9yZWRWYWx1ZSA9PT0gbnVsbCB8fCBBcnJheS5pc0FycmF5KHN0b3JlZFZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZXM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IHN0b3JlZE9wdGlvbnMgPSBzdG9yZWRWYWx1ZSBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcbiAgICAgICAgICAgIGZvciAoY29uc3QgZGVmaW5pdGlvbiBvZiBkZWZpbml0aW9ucykge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSBub3JtYWxpemVQbHVnaW5PcHRpb25WYWx1ZShkZWZpbml0aW9uLCBzdG9yZWRPcHRpb25zW2RlZmluaXRpb24uaWRdKTtcbiAgICAgICAgICAgICAgICBpZiAobm9ybWFsaXplZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlc1tkZWZpbml0aW9uLmlkXSA9IG5vcm1hbGl6ZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIud2FybihgRmFpbGVkIHRvIHJlYWQgb3B0aW9ucyBmb3IgJHtwbHVnaW5GaWxlfTogJHtlcnJvcn1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB2YWx1ZXM7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBzYXZlKHBsdWdpbkZpbGU6IHN0cmluZywgY2FuZGlkYXRlVmFsdWVzOiBQbHVnaW5PcHRpb25WYWx1ZXMpOiBQbHVnaW5PcHRpb25WYWx1ZXMge1xuICAgICAgICBpZiAoIXRoaXMuaXNTYWZlUGx1Z2luRmlsZU5hbWUocGx1Z2luRmlsZSkpIHJldHVybiB7fTtcblxuICAgICAgICBjb25zdCBkZWZpbml0aW9ucyA9IHRoaXMuc2NoZW1hcy5nZXQocGx1Z2luRmlsZSkgPz8gW107XG4gICAgICAgIGlmIChkZWZpbml0aW9ucy5sZW5ndGggPT09IDApIHJldHVybiB7fTtcblxuICAgICAgICBjb25zdCBub3JtYWxpemVkVmFsdWVzID0gZ2V0UGx1Z2luT3B0aW9uRGVmYXVsdHMoZGVmaW5pdGlvbnMpO1xuICAgICAgICBjb25zdCBvdmVycmlkZXM6IFBsdWdpbk9wdGlvblZhbHVlcyA9IHt9O1xuXG4gICAgICAgIGZvciAoY29uc3QgZGVmaW5pdGlvbiBvZiBkZWZpbml0aW9ucykge1xuICAgICAgICAgICAgY29uc3Qgbm9ybWFsaXplZCA9IG5vcm1hbGl6ZVBsdWdpbk9wdGlvblZhbHVlKGRlZmluaXRpb24sIGNhbmRpZGF0ZVZhbHVlc1tkZWZpbml0aW9uLmlkXSk7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IG5vcm1hbGl6ZWQgPz8gZGVmaW5pdGlvbi5kZWZhdWx0O1xuICAgICAgICAgICAgbm9ybWFsaXplZFZhbHVlc1tkZWZpbml0aW9uLmlkXSA9IHZhbHVlO1xuXG4gICAgICAgICAgICBpZiAodmFsdWUgIT09IGRlZmluaXRpb24uZGVmYXVsdCkge1xuICAgICAgICAgICAgICAgIG92ZXJyaWRlc1tkZWZpbml0aW9uLmlkXSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHN0b3JhZ2VLZXkgPSB0aGlzLmdldFN0b3JhZ2VLZXkocGx1Z2luRmlsZSk7XG4gICAgICAgICAgICBpZiAoT2JqZWN0LmtleXMob3ZlcnJpZGVzKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShzdG9yYWdlS2V5KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oc3RvcmFnZUtleSwgSlNPTi5zdHJpbmdpZnkob3ZlcnJpZGVzKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcihgRmFpbGVkIHRvIHNhdmUgb3B0aW9ucyBmb3IgJHtwbHVnaW5GaWxlfTogJHtlcnJvcn1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBub3JtYWxpemVkVmFsdWVzO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgcmVzZXQocGx1Z2luRmlsZTogc3RyaW5nKTogUGx1Z2luT3B0aW9uVmFsdWVzIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzU2FmZVBsdWdpbkZpbGVOYW1lKHBsdWdpbkZpbGUpKSByZXR1cm4ge307XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKHRoaXMuZ2V0U3RvcmFnZUtleShwbHVnaW5GaWxlKSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci53YXJuKGBGYWlsZWQgdG8gcmVzZXQgb3B0aW9ucyBmb3IgJHtwbHVnaW5GaWxlfTogJHtlcnJvcn1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBnZXRQbHVnaW5PcHRpb25EZWZhdWx0cyh0aGlzLnNjaGVtYXMuZ2V0KHBsdWdpbkZpbGUpID8/IFtdKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHJlbW92ZShwbHVnaW5GaWxlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yZXNldChwbHVnaW5GaWxlKTtcbiAgICAgICAgdGhpcy5zY2hlbWFzLmRlbGV0ZShwbHVnaW5GaWxlKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBsdWdpbk9wdGlvbnM7XG4iLCAiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVsb2FkQXBwbGljYXRpb24oKTogdm9pZCB7XG4gICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xufVxuIiwgImltcG9ydCBQbHVnaW5PcHRpb25zIGZyb20gXCIuLi8uLi9jb3JlL1BsdWdpbk9wdGlvbnNcIjtcbmltcG9ydCB7XG4gICAgUGx1Z2luT3B0aW9uRGVmaW5pdGlvbixcbiAgICBQbHVnaW5PcHRpb25WYWx1ZXMsXG59IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL1BsdWdpbk9wdGlvblwiO1xuXG5jb25zdCBTVFlMRV9JRCA9IFwic3RyZW1pby1lbmhhbmNlZC1wbHVnaW4tb3B0aW9ucy1zdHlsZVwiO1xubGV0IG5leHRQYW5lbElkID0gMDtcblxuZnVuY3Rpb24gZW5zdXJlU3R5bGVzKCk6IHZvaWQge1xuICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChTVFlMRV9JRCkpIHJldHVybjtcblxuICAgIGNvbnN0IHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICAgIHN0eWxlLmlkID0gU1RZTEVfSUQ7XG4gICAgc3R5bGUudGV4dENvbnRlbnQgPSBgXG4gICAgICAgIC5zZS1wbHVnaW4tb3B0aW9ucy1idXR0b24sXG4gICAgICAgIC5zZS1wbHVnaW4tb3B0aW9ucy1hY3Rpb24ge1xuICAgICAgICAgICAgYm9yZGVyOiAwO1xuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogLjM1cmVtO1xuICAgICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICAgICAgcGFkZGluZzogLjU1cmVtIC44NXJlbTtcbiAgICAgICAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IHZhcigtLXNlY29uZGFyeS1hY2NlbnQtY29sb3IsICM1YjRiZDgpO1xuICAgICAgICB9XG4gICAgICAgIC5zZS1wbHVnaW4tb3B0aW9ucy1wYW5lbCB7XG4gICAgICAgICAgICBtYXJnaW46IC0uNXJlbSAwIDFyZW07XG4gICAgICAgICAgICBwYWRkaW5nOiAxcmVtO1xuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogLjVyZW07XG4gICAgICAgICAgICBjb2xvcjogd2hpdGU7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1zZWNvbmRhcnktYmFja2dyb3VuZC1jb2xvciwgcmdiYSgyMCwgMjAsIDI4LCAuOTYpKTtcbiAgICAgICAgfVxuICAgICAgICAuc2UtcGx1Z2luLW9wdGlvbnMtcGFuZWxbaGlkZGVuXSB7IGRpc3BsYXk6IG5vbmU7IH1cbiAgICAgICAgLnNlLXBsdWdpbi1vcHRpb25zLWZpZWxkIHsgZGlzcGxheTogZ3JpZDsgZ2FwOiAuMzVyZW07IG1hcmdpbi1ib3R0b206IC45cmVtOyB9XG4gICAgICAgIC5zZS1wbHVnaW4tb3B0aW9ucy1maWVsZCBpbnB1dDpub3QoW3R5cGU9XCJjaGVja2JveFwiXSksXG4gICAgICAgIC5zZS1wbHVnaW4tb3B0aW9ucy1maWVsZCBzZWxlY3Qge1xuICAgICAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgcGFkZGluZzogLjU1cmVtO1xuICAgICAgICAgICAgY29sb3I6IGluaGVyaXQ7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1wcmltYXJ5LWJhY2tncm91bmQtY29sb3IsICMxNzE3MWYpO1xuICAgICAgICAgICAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgyNTUsIDI1NSwgMjU1LCAuMjUpO1xuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogLjM1cmVtO1xuICAgICAgICB9XG4gICAgICAgIC5zZS1wbHVnaW4tb3B0aW9ucy1kZXNjcmlwdGlvbiB7IG9wYWNpdHk6IC43NTsgZm9udC1zaXplOiAuOWVtOyB9XG4gICAgICAgIC5zZS1wbHVnaW4tb3B0aW9ucy1hY3Rpb25zIHsgZGlzcGxheTogZmxleDsgZ2FwOiAuNnJlbTsgZmxleC13cmFwOiB3cmFwOyB9XG4gICAgICAgIC5zZS1wbHVnaW4tb3B0aW9ucy1hY3Rpb25bZGF0YS1raW5kPVwiY2FuY2VsXCJdIHsgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7IGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjU1LDI1NSwyNTUsLjM1KTsgfVxuICAgIGA7XG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU9wdGlvbklucHV0KFxuICAgIGRlZmluaXRpb246IFBsdWdpbk9wdGlvbkRlZmluaXRpb24sXG4gICAgaW5wdXRJZDogc3RyaW5nXG4pOiBIVE1MSW5wdXRFbGVtZW50IHwgSFRNTFNlbGVjdEVsZW1lbnQge1xuICAgIGlmIChkZWZpbml0aW9uLnR5cGUgPT09IFwic2VsZWN0XCIpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiKTtcbiAgICAgICAgc2VsZWN0LmlkID0gaW5wdXRJZDtcbiAgICAgICAgZm9yIChjb25zdCBjaG9pY2Ugb2YgZGVmaW5pdGlvbi5jaG9pY2VzKSB7XG4gICAgICAgICAgICBjb25zdCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xuICAgICAgICAgICAgb3B0aW9uLnZhbHVlID0gY2hvaWNlLnZhbHVlO1xuICAgICAgICAgICAgb3B0aW9uLnRleHRDb250ZW50ID0gY2hvaWNlLmxhYmVsO1xuICAgICAgICAgICAgc2VsZWN0LmFwcGVuZENoaWxkKG9wdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNlbGVjdDtcbiAgICB9XG5cbiAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICBpbnB1dC5pZCA9IGlucHV0SWQ7XG4gICAgaW5wdXQudHlwZSA9IGRlZmluaXRpb24udHlwZSA9PT0gXCJib29sZWFuXCIgPyBcImNoZWNrYm94XCIgOiBkZWZpbml0aW9uLnR5cGU7XG5cbiAgICBpZiAoZGVmaW5pdGlvbi50eXBlID09PSBcInRleHRcIikge1xuICAgICAgICBpZiAoZGVmaW5pdGlvbi5wbGFjZWhvbGRlciAhPT0gdW5kZWZpbmVkKSBpbnB1dC5wbGFjZWhvbGRlciA9IGRlZmluaXRpb24ucGxhY2Vob2xkZXI7XG4gICAgICAgIGlmIChkZWZpbml0aW9uLm1heExlbmd0aCAhPT0gdW5kZWZpbmVkKSBpbnB1dC5tYXhMZW5ndGggPSBkZWZpbml0aW9uLm1heExlbmd0aDtcbiAgICB9IGVsc2UgaWYgKGRlZmluaXRpb24udHlwZSA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICBpZiAoZGVmaW5pdGlvbi5taW4gIT09IHVuZGVmaW5lZCkgaW5wdXQubWluID0gU3RyaW5nKGRlZmluaXRpb24ubWluKTtcbiAgICAgICAgaWYgKGRlZmluaXRpb24ubWF4ICE9PSB1bmRlZmluZWQpIGlucHV0Lm1heCA9IFN0cmluZyhkZWZpbml0aW9uLm1heCk7XG4gICAgICAgIGlmIChkZWZpbml0aW9uLnN0ZXAgIT09IHVuZGVmaW5lZCkgaW5wdXQuc3RlcCA9IFN0cmluZyhkZWZpbml0aW9uLnN0ZXApO1xuICAgIH1cblxuICAgIHJldHVybiBpbnB1dDtcbn1cblxuZnVuY3Rpb24gc2V0SW5wdXRWYWx1ZShcbiAgICBpbnB1dDogSFRNTElucHV0RWxlbWVudCB8IEhUTUxTZWxlY3RFbGVtZW50LFxuICAgIGRlZmluaXRpb246IFBsdWdpbk9wdGlvbkRlZmluaXRpb24sXG4gICAgdmFsdWU6IGJvb2xlYW4gfCBzdHJpbmcgfCBudW1iZXJcbik6IHZvaWQge1xuICAgIGlmIChkZWZpbml0aW9uLnR5cGUgPT09IFwiYm9vbGVhblwiICYmIGlucHV0IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCkge1xuICAgICAgICBpbnB1dC5jaGVja2VkID0gdmFsdWUgPT09IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaW5wdXQudmFsdWUgPSBTdHJpbmcodmFsdWUpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gcmVhZElucHV0VmFsdWUoXG4gICAgaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQgfCBIVE1MU2VsZWN0RWxlbWVudCxcbiAgICBkZWZpbml0aW9uOiBQbHVnaW5PcHRpb25EZWZpbml0aW9uXG4pOiBib29sZWFuIHwgc3RyaW5nIHwgbnVtYmVyIHtcbiAgICBpZiAoZGVmaW5pdGlvbi50eXBlID09PSBcImJvb2xlYW5cIiAmJiBpbnB1dCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIGlucHV0LmNoZWNrZWQ7XG4gICAgfVxuICAgIGlmIChkZWZpbml0aW9uLnR5cGUgPT09IFwibnVtYmVyXCIgJiYgaW5wdXQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBOdW1iZXIuaXNGaW5pdGUoaW5wdXQudmFsdWVBc051bWJlcikgPyBpbnB1dC52YWx1ZUFzTnVtYmVyIDogZGVmaW5pdGlvbi5kZWZhdWx0O1xuICAgIH1cbiAgICByZXR1cm4gaW5wdXQudmFsdWU7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTW91bnRQbHVnaW5PcHRpb25zUGFyYW1zIHtcbiAgICBjb250YWluZXI6IEhUTUxFbGVtZW50O1xuICAgIGFjdGlvbkNvbnRhaW5lcjogSFRNTEVsZW1lbnQ7XG4gICAgcGx1Z2luRmlsZTogc3RyaW5nO1xuICAgIGRlZmluaXRpb25zOiBQbHVnaW5PcHRpb25EZWZpbml0aW9uW107XG4gICAgaXNFbmFibGVkOiAoKSA9PiBib29sZWFuO1xuICAgIHJlbG9hZD86ICgpID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtb3VudFBsdWdpbk9wdGlvbnMoe1xuICAgIGNvbnRhaW5lcixcbiAgICBhY3Rpb25Db250YWluZXIsXG4gICAgcGx1Z2luRmlsZSxcbiAgICBkZWZpbml0aW9ucyxcbiAgICBpc0VuYWJsZWQsXG4gICAgcmVsb2FkID0gKCkgPT4gd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpLFxufTogTW91bnRQbHVnaW5PcHRpb25zUGFyYW1zKTogdm9pZCB7XG4gICAgaWYgKGRlZmluaXRpb25zLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuICAgIGlmIChjb250YWluZXIucXVlcnlTZWxlY3RvcihcIltkYXRhLXN0cmVtaW8tZW5oYW5jZWQtcGx1Z2luLW9wdGlvbnNdXCIpKSByZXR1cm47XG5cbiAgICBlbnN1cmVTdHlsZXMoKTtcblxuICAgIG5leHRQYW5lbElkICs9IDE7XG4gICAgY29uc3QgcGFuZWxJZCA9IGBzZS1wbHVnaW4tb3B0aW9ucy0ke25leHRQYW5lbElkfWA7XG4gICAgY29uc3QgdG9nZ2xlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICB0b2dnbGVCdXR0b24udHlwZSA9IFwiYnV0dG9uXCI7XG4gICAgdG9nZ2xlQnV0dG9uLmNsYXNzTmFtZSA9IFwic2UtcGx1Z2luLW9wdGlvbnMtYnV0dG9uXCI7XG4gICAgdG9nZ2xlQnV0dG9uLnRleHRDb250ZW50ID0gXCJPcHRpb25zXCI7XG4gICAgdG9nZ2xlQnV0dG9uLnNldEF0dHJpYnV0ZShcImFyaWEtY29udHJvbHNcIiwgcGFuZWxJZCk7XG4gICAgdG9nZ2xlQnV0dG9uLnNldEF0dHJpYnV0ZShcImFyaWEtZXhwYW5kZWRcIiwgXCJmYWxzZVwiKTtcbiAgICBhY3Rpb25Db250YWluZXIuYXBwZW5kQ2hpbGQodG9nZ2xlQnV0dG9uKTtcblxuICAgIGNvbnN0IHBhbmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIik7XG4gICAgcGFuZWwuaWQgPSBwYW5lbElkO1xuICAgIHBhbmVsLmNsYXNzTmFtZSA9IFwic2UtcGx1Z2luLW9wdGlvbnMtcGFuZWxcIjtcbiAgICBwYW5lbC5kYXRhc2V0LnN0cmVtaW9FbmhhbmNlZFBsdWdpbk9wdGlvbnMgPSBwbHVnaW5GaWxlO1xuICAgIHBhbmVsLmhpZGRlbiA9IHRydWU7XG5cbiAgICBjb25zdCBjb250cm9scyA9IG5ldyBNYXA8c3RyaW5nLCBIVE1MSW5wdXRFbGVtZW50IHwgSFRNTFNlbGVjdEVsZW1lbnQ+KCk7XG4gICAgZm9yIChjb25zdCBkZWZpbml0aW9uIG9mIGRlZmluaXRpb25zKSB7XG4gICAgICAgIGNvbnN0IGZpZWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgZmllbGQuY2xhc3NOYW1lID0gXCJzZS1wbHVnaW4tb3B0aW9ucy1maWVsZFwiO1xuXG4gICAgICAgIGNvbnN0IGlucHV0SWQgPSBgJHtwYW5lbElkfS0ke2RlZmluaXRpb24uaWR9YDtcbiAgICAgICAgY29uc3QgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG4gICAgICAgIGxhYmVsLmh0bWxGb3IgPSBpbnB1dElkO1xuICAgICAgICBsYWJlbC50ZXh0Q29udGVudCA9IGRlZmluaXRpb24ubGFiZWw7XG5cbiAgICAgICAgY29uc3QgaW5wdXQgPSBjcmVhdGVPcHRpb25JbnB1dChkZWZpbml0aW9uLCBpbnB1dElkKTtcbiAgICAgICAgY29udHJvbHMuc2V0KGRlZmluaXRpb24uaWQsIGlucHV0KTtcblxuICAgICAgICBmaWVsZC5hcHBlbmRDaGlsZChsYWJlbCk7XG4gICAgICAgIGlmIChkZWZpbml0aW9uLmRlc2NyaXB0aW9uKSB7XG4gICAgICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbi5jbGFzc05hbWUgPSBcInNlLXBsdWdpbi1vcHRpb25zLWRlc2NyaXB0aW9uXCI7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IGRlZmluaXRpb24uZGVzY3JpcHRpb247XG4gICAgICAgICAgICBmaWVsZC5hcHBlbmRDaGlsZChkZXNjcmlwdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgZmllbGQuYXBwZW5kQ2hpbGQoaW5wdXQpO1xuICAgICAgICBwYW5lbC5hcHBlbmRDaGlsZChmaWVsZCk7XG4gICAgfVxuXG4gICAgY29uc3QgYWN0aW9ucyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgYWN0aW9ucy5jbGFzc05hbWUgPSBcInNlLXBsdWdpbi1vcHRpb25zLWFjdGlvbnNcIjtcblxuICAgIGNvbnN0IHNhdmVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIHNhdmVCdXR0b24udHlwZSA9IFwiYnV0dG9uXCI7XG4gICAgc2F2ZUJ1dHRvbi5jbGFzc05hbWUgPSBcInNlLXBsdWdpbi1vcHRpb25zLWFjdGlvblwiO1xuICAgIHNhdmVCdXR0b24udGV4dENvbnRlbnQgPSBcIlNhdmVcIjtcblxuICAgIGNvbnN0IHJlc2V0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICByZXNldEJ1dHRvbi50eXBlID0gXCJidXR0b25cIjtcbiAgICByZXNldEJ1dHRvbi5jbGFzc05hbWUgPSBcInNlLXBsdWdpbi1vcHRpb25zLWFjdGlvblwiO1xuICAgIHJlc2V0QnV0dG9uLnRleHRDb250ZW50ID0gXCJSZXNldCB0byBkZWZhdWx0c1wiO1xuXG4gICAgY29uc3QgY2FuY2VsQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBjYW5jZWxCdXR0b24udHlwZSA9IFwiYnV0dG9uXCI7XG4gICAgY2FuY2VsQnV0dG9uLmNsYXNzTmFtZSA9IFwic2UtcGx1Z2luLW9wdGlvbnMtYWN0aW9uXCI7XG4gICAgY2FuY2VsQnV0dG9uLmRhdGFzZXQua2luZCA9IFwiY2FuY2VsXCI7XG4gICAgY2FuY2VsQnV0dG9uLnRleHRDb250ZW50ID0gXCJDYW5jZWxcIjtcblxuICAgIGFjdGlvbnMuYXBwZW5kKHNhdmVCdXR0b24sIHJlc2V0QnV0dG9uLCBjYW5jZWxCdXR0b24pO1xuICAgIHBhbmVsLmFwcGVuZENoaWxkKGFjdGlvbnMpO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChwYW5lbCk7XG5cbiAgICBjb25zdCByZW5kZXJWYWx1ZXMgPSAodmFsdWVzOiBQbHVnaW5PcHRpb25WYWx1ZXMpOiB2b2lkID0+IHtcbiAgICAgICAgZm9yIChjb25zdCBkZWZpbml0aW9uIG9mIGRlZmluaXRpb25zKSB7XG4gICAgICAgICAgICBjb25zdCBpbnB1dCA9IGNvbnRyb2xzLmdldChkZWZpbml0aW9uLmlkKTtcbiAgICAgICAgICAgIGlmICghaW5wdXQpIGNvbnRpbnVlO1xuICAgICAgICAgICAgc2V0SW5wdXRWYWx1ZShpbnB1dCwgZGVmaW5pdGlvbiwgdmFsdWVzW2RlZmluaXRpb24uaWRdID8/IGRlZmluaXRpb24uZGVmYXVsdCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgY2xvc2VQYW5lbCA9ICgpOiB2b2lkID0+IHtcbiAgICAgICAgcGFuZWwuaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgdG9nZ2xlQnV0dG9uLnNldEF0dHJpYnV0ZShcImFyaWEtZXhwYW5kZWRcIiwgXCJmYWxzZVwiKTtcbiAgICB9O1xuXG4gICAgdG9nZ2xlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBldmVudCA9PiB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBwYW5lbC5oaWRkZW4gPSAhcGFuZWwuaGlkZGVuO1xuICAgICAgICB0b2dnbGVCdXR0b24uc2V0QXR0cmlidXRlKFwiYXJpYS1leHBhbmRlZFwiLCBTdHJpbmcoIXBhbmVsLmhpZGRlbikpO1xuICAgICAgICBpZiAoIXBhbmVsLmhpZGRlbikgcmVuZGVyVmFsdWVzKFBsdWdpbk9wdGlvbnMuZ2V0KHBsdWdpbkZpbGUpKTtcbiAgICB9KTtcblxuICAgIGNhbmNlbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2xvc2VQYW5lbCk7XG5cbiAgICBzYXZlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGNhbmRpZGF0ZVZhbHVlczogUGx1Z2luT3B0aW9uVmFsdWVzID0ge307XG4gICAgICAgIGZvciAoY29uc3QgZGVmaW5pdGlvbiBvZiBkZWZpbml0aW9ucykge1xuICAgICAgICAgICAgY29uc3QgaW5wdXQgPSBjb250cm9scy5nZXQoZGVmaW5pdGlvbi5pZCk7XG4gICAgICAgICAgICBpZiAoaW5wdXQpIGNhbmRpZGF0ZVZhbHVlc1tkZWZpbml0aW9uLmlkXSA9IHJlYWRJbnB1dFZhbHVlKGlucHV0LCBkZWZpbml0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIFBsdWdpbk9wdGlvbnMuc2F2ZShwbHVnaW5GaWxlLCBjYW5kaWRhdGVWYWx1ZXMpO1xuICAgICAgICBjbG9zZVBhbmVsKCk7XG4gICAgICAgIGlmIChpc0VuYWJsZWQoKSkgcmVsb2FkKCk7XG4gICAgfSk7XG5cbiAgICByZXNldEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICByZW5kZXJWYWx1ZXMoUGx1Z2luT3B0aW9ucy5yZXNldChwbHVnaW5GaWxlKSk7XG4gICAgICAgIGlmIChpc0VuYWJsZWQoKSkgcmVsb2FkKCk7XG4gICAgfSk7XG59XG4iLCAiaW1wb3J0IEhlbHBlcnMgZnJvbSBcIi4uL3V0aWxzL0hlbHBlcnNcIjtcbmltcG9ydCB7IE1ldGFEYXRhIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvTWV0YURhdGFcIjtcbmltcG9ydCB7IGdldFBsdWdpbkl0ZW1UZW1wbGF0ZSB9IGZyb20gXCIuLi9jb21wb25lbnRzL3BsdWdpbi1pdGVtL3BsdWdpbkl0ZW1cIjtcbmltcG9ydCB7IGdldFRoZW1lSXRlbVRlbXBsYXRlIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvdGhlbWUtaXRlbS90aGVtZUl0ZW1cIjtcbmltcG9ydCB7IGdldEVuaGFuY2VkTmF2IH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvZW5oYW5jZWQtbmF2L2VuaGFuY2VkTmF2XCI7XG5pbXBvcnQgeyBnZXRMb2dnZXIgfSBmcm9tIFwiLi4vdXRpbHMvbG9nZ2VyXCI7XG5pbXBvcnQgTW9kTWFuYWdlciBmcm9tIFwiLi9Nb2RNYW5hZ2VyXCI7XG5pbXBvcnQgeyBTRUxFQ1RPUlMsIENMQVNTRVMsIFNUT1JBR0VfS0VZUyB9IGZyb20gXCIuLi9jb25zdGFudHNcIjtcbmltcG9ydCBQbHVnaW5PcHRpb25zIGZyb20gXCIuL1BsdWdpbk9wdGlvbnNcIjtcbmltcG9ydCB7IG1vdW50UGx1Z2luT3B0aW9ucyB9IGZyb20gXCIuLi9jb21wb25lbnRzL3BsdWdpbi1vcHRpb25zL3BsdWdpbk9wdGlvbnNcIjtcblxuY2xhc3MgU2V0dGluZ3Mge1xuICAgIHByaXZhdGUgc3RhdGljIGxvZ2dlciA9IGdldExvZ2dlcihcIlNldHRpbmdzXCIpO1xuXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0RW5hYmxlZFBsdWdpbnMoKTogc3RyaW5nW10ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3Qgc3RvcmVkVmFsdWU6IHVua25vd24gPSBKU09OLnBhcnNlKFxuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5nZXRJdGVtKFNUT1JBR0VfS0VZUy5FTkFCTEVEX1BMVUdJTlMpIHx8IFwiW11cIlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KHN0b3JlZFZhbHVlKVxuICAgICAgICAgICAgICAgID8gc3RvcmVkVmFsdWUuZmlsdGVyKCh2YWx1ZSk6IHZhbHVlIGlzIHN0cmluZyA9PiB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpXG4gICAgICAgICAgICAgICAgOiBbXTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLndhcm4oYEZhaWxlZCB0byBwYXJzZSBlbmFibGVkIHBsdWdpbnM6ICR7ZXJyb3J9YCk7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBnZXRDYXRlZ29yeUtleShzZWN0aW9uSWQ6IHN0cmluZywgdGl0bGU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgJHtzZWN0aW9uSWR9OiR7dGl0bGUudHJpbSgpLnRvTG93ZXJDYXNlKCl9YDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBnZXRFeGlzdGluZ0NhdGVnb3J5KHNlY3Rpb246IEhUTUxFbGVtZW50LCBzZWN0aW9uSWQ6IHN0cmluZywgdGl0bGU6IHN0cmluZyk6IEhUTUxFbGVtZW50IHwgbnVsbCB7XG4gICAgICAgIGNvbnN0IGNhdGVnb3J5S2V5ID0gdGhpcy5nZXRDYXRlZ29yeUtleShzZWN0aW9uSWQsIHRpdGxlKTtcbiAgICAgICAgY29uc3QgY2F0ZWdvcnlCeUtleSA9IHNlY3Rpb24ucXVlcnlTZWxlY3RvcjxIVE1MRWxlbWVudD4oYFtkYXRhLXN0cmVtaW8tZW5oYW5jZWQtY2F0ZWdvcnk9XCIke2NhdGVnb3J5S2V5fVwiXWApO1xuICAgICAgICBpZiAoY2F0ZWdvcnlCeUtleSkgcmV0dXJuIGNhdGVnb3J5QnlLZXk7XG5cbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20oc2VjdGlvbi5jaGlsZHJlbikuZmluZCgoY2hpbGQpOiBjaGlsZCBpcyBIVE1MRWxlbWVudCA9PiB7XG4gICAgICAgICAgICBpZiAoIShjaGlsZCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgY29uc3QgbGFiZWwgPSBjaGlsZC5xdWVyeVNlbGVjdG9yKFNFTEVDVE9SUy5DQVRFR09SWV9MQUJFTCk7XG4gICAgICAgICAgICByZXR1cm4gbGFiZWw/LnRleHRDb250ZW50Py50cmltKCkgPT09IHRpdGxlO1xuICAgICAgICB9KSA/PyBudWxsO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGVuc3VyZU5hdkl0ZW0oc2VjdGlvbklkOiBzdHJpbmcsIHRpdGxlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy53YWl0Rm9yTmF2TWVudSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbmF2ID0gdGhpcy5nZXROYXZNZW51KCk7XG4gICAgICAgICAgICBjb25zdCBzaG9ydGN1dHNOYXYgPSB0aGlzLmdldE5hdlNob3J0Y3V0SXRlbSgpO1xuXG4gICAgICAgICAgICBpZiAoIW5hdikge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmVycm9yKFwibmF2IG1lbnUgaXMgc3RpbGwgbnVsbCBhZnRlciB3YWl0XCIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgZXhpc3RpbmdOYXYgPSBuYXYucXVlcnlTZWxlY3RvcjxIVE1MRWxlbWVudD4oYFtkYXRhLXNlY3Rpb249XCIke3NlY3Rpb25JZH1cIl1gKTtcbiAgICAgICAgICAgIGlmIChleGlzdGluZ05hdikge1xuICAgICAgICAgICAgICAgIGV4aXN0aW5nTmF2LnNldEF0dHJpYnV0ZShcInRpdGxlXCIsIHRpdGxlKTtcbiAgICAgICAgICAgICAgICBleGlzdGluZ05hdi50ZXh0Q29udGVudCA9IHRpdGxlO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgZW5oYW5jZWROYXZDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgZW5oYW5jZWROYXZDb250YWluZXIuaW5uZXJIVE1MID0gZ2V0RW5oYW5jZWROYXYoKTtcblxuICAgICAgICAgICAgY29uc3QgY2hpbGRUb0FwcGVuZCA9IChlbmhhbmNlZE5hdkNvbnRhaW5lci5maXJzdEVsZW1lbnRDaGlsZCBhcyBIVE1MRWxlbWVudCB8IG51bGwpID8/IGVuaGFuY2VkTmF2Q29udGFpbmVyO1xuICAgICAgICAgICAgY2hpbGRUb0FwcGVuZC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXNlY3Rpb25cIiwgc2VjdGlvbklkKTtcbiAgICAgICAgICAgIGNoaWxkVG9BcHBlbmQuc2V0QXR0cmlidXRlKFwidGl0bGVcIiwgdGl0bGUpO1xuICAgICAgICAgICAgY2hpbGRUb0FwcGVuZC50ZXh0Q29udGVudCA9IHRpdGxlO1xuXG4gICAgICAgICAgICBpZiAoc2hvcnRjdXRzTmF2ICYmIHNob3J0Y3V0c05hdi5wYXJlbnROb2RlID09PSBuYXYpIHtcbiAgICAgICAgICAgICAgICBuYXYuaW5zZXJ0QmVmb3JlKGNoaWxkVG9BcHBlbmQsIHNob3J0Y3V0c05hdi5uZXh0U2libGluZyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5hdi5hcHBlbmRDaGlsZChjaGlsZFRvQXBwZW5kKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkuY2F0Y2goZXJyID0+IHRoaXMubG9nZ2VyLmVycm9yKGBGYWlsZWQgdG8gYWRkIG5hdjogJHtlcnJ9YCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZCBhIG5ldyBzZWN0aW9uIHRvIHRoZSBzZXR0aW5ncyBwYW5lbFxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgYWRkU2VjdGlvbihzZWN0aW9uSWQ6IHN0cmluZywgdGl0bGU6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLndhaXRGb3JTZXR0aW5nc1BhbmVsKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzZXR0aW5nc1BhbmVsID0gdGhpcy5nZXRTZXR0aW5nc1BhbmVsKCk7XG4gICAgICAgICAgICBpZiAoIXNldHRpbmdzUGFuZWwpIHJldHVybjtcblxuICAgICAgICAgICAgbGV0IHNlY3Rpb25Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzZWN0aW9uSWQpIGFzIEhUTUxFbGVtZW50IHwgbnVsbDtcblxuICAgICAgICAgICAgaWYgKCFzZWN0aW9uQ29udGFpbmVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIuaW5mbyhgQWRkaW5nIHNlY3Rpb246ICR7c2VjdGlvbklkfSB3aXRoIHRpdGxlOiAke3RpdGxlfWApO1xuXG4gICAgICAgICAgICAgICAgY29uc3Qgc2VjdGlvbkVsZW1lbnQgPSB0aGlzLmdldEV4aXN0aW5nU2VjdGlvbihzZXR0aW5nc1BhbmVsKTtcbiAgICAgICAgICAgICAgICBjb25zdCBsYWJlbEVsZW1lbnQgPSB0aGlzLmdldEV4aXN0aW5nU2VjdGlvbkxhYmVsKHNlY3Rpb25FbGVtZW50KTtcblxuICAgICAgICAgICAgICAgIGlmICghc2VjdGlvbkVsZW1lbnQgfHwgIWxhYmVsRWxlbWVudCkgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgY29uc3Qgc2VjdGlvbkNsYXNzTmFtZSA9IHNlY3Rpb25FbGVtZW50LmNsYXNzTmFtZTtcbiAgICAgICAgICAgICAgICBjb25zdCB0aXRsZUNsYXNzTmFtZSA9IGxhYmVsRWxlbWVudC5jbGFzc05hbWU7XG5cbiAgICAgICAgICAgICAgICBzZWN0aW9uQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICBzZWN0aW9uQ29udGFpbmVyLmNsYXNzTmFtZSA9IHNlY3Rpb25DbGFzc05hbWU7XG4gICAgICAgICAgICAgICAgc2VjdGlvbkNvbnRhaW5lci5pZCA9IHNlY3Rpb25JZDtcbiAgICAgICAgICAgICAgICBzZWN0aW9uQ29udGFpbmVyLnNldEF0dHJpYnV0ZShcImRhdGEtc3RyZW1pby1lbmhhbmNlZC1zZWN0aW9uXCIsIHNlY3Rpb25JZCk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBzZWN0aW9uVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgICAgIHNlY3Rpb25UaXRsZS5jbGFzc05hbWUgPSB0aXRsZUNsYXNzTmFtZTtcbiAgICAgICAgICAgICAgICBzZWN0aW9uVGl0bGUudGV4dENvbnRlbnQgPSB0aXRsZTtcblxuICAgICAgICAgICAgICAgIHNlY3Rpb25Db250YWluZXIuYXBwZW5kQ2hpbGQoc2VjdGlvblRpdGxlKTtcbiAgICAgICAgICAgICAgICBzZXR0aW5nc1BhbmVsLmFwcGVuZENoaWxkKHNlY3Rpb25Db250YWluZXIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmVuc3VyZU5hdkl0ZW0oc2VjdGlvbklkLCB0aXRsZSk7XG4gICAgICAgIH0pLmNhdGNoKGVyciA9PiB0aGlzLmxvZ2dlci5lcnJvcihgRmFpbGVkIHRvIGFkZCBzZWN0aW9uOiAke2Vycn1gKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkIGEgY2F0ZWdvcnkgd2l0aGluIGEgc2VjdGlvblxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgYWRkQ2F0ZWdvcnkodGl0bGU6IHN0cmluZywgc2VjdGlvbklkOiBzdHJpbmcsIGljb246IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLndhaXRGb3JTZXR0aW5nc1BhbmVsKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzZWN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2VjdGlvbklkKTtcbiAgICAgICAgICAgIGlmICghKHNlY3Rpb24gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHJldHVybjtcblxuICAgICAgICAgICAgaWYgKHRoaXMuZ2V0RXhpc3RpbmdDYXRlZ29yeShzZWN0aW9uLCBzZWN0aW9uSWQsIHRpdGxlKSkgcmV0dXJuO1xuXG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKGBBZGRpbmcgY2F0ZWdvcnk6ICR7dGl0bGV9IHRvIHNlY3Rpb246ICR7c2VjdGlvbklkfWApO1xuXG4gICAgICAgICAgICBjb25zdCBjYXRlZ29yeVRlbXBsYXRlID0gdGhpcy5nZXRDYXRlZ29yeVRlbXBsYXRlKCk7XG4gICAgICAgICAgICBpZiAoIWNhdGVnb3J5VGVtcGxhdGUpIHJldHVybjtcblxuICAgICAgICAgICAgY29uc3QgeyBjYXRlZ29yeUNsYXNzLCBjYXRlZ29yeVRpdGxlQ2xhc3MsIGhlYWRpbmdDbGFzcywgaWNvbkNsYXNzIH0gPSBjYXRlZ29yeVRlbXBsYXRlO1xuXG4gICAgICAgICAgICBpY29uID0gaWNvbi5yZXBsYWNlKGBjbGFzcz1cImljb25cImAsIGBjbGFzcz1cIiR7aWNvbkNsYXNzfVwiYCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGNhdGVnb3J5RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIGNhdGVnb3J5RGl2LmNsYXNzTmFtZSA9IGNhdGVnb3J5Q2xhc3M7XG4gICAgICAgICAgICBjYXRlZ29yeURpdi5zZXRBdHRyaWJ1dGUoXCJkYXRhLXN0cmVtaW8tZW5oYW5jZWQtY2F0ZWdvcnlcIiwgdGhpcy5nZXRDYXRlZ29yeUtleShzZWN0aW9uSWQsIHRpdGxlKSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IHRpdGxlRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIHRpdGxlRGl2LmNsYXNzTmFtZSA9IGNhdGVnb3J5VGl0bGVDbGFzcztcbiAgICAgICAgICAgIHRpdGxlRGl2LnRleHRDb250ZW50ID0gdGl0bGU7XG5cbiAgICAgICAgICAgIGNvbnN0IGhlYWRpbmdEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgLy8gSWYgd2UgZm91bmQgYSBjbGFzcywgdXNlIGl0LiBJZiBub3QsIGZhbGxiYWNrIHRvIHNlbGVjdG9yIGxvZ2ljIG9yIGVtcHR5XG4gICAgICAgICAgICBpZiAoaGVhZGluZ0NsYXNzKSB7XG4gICAgICAgICAgICAgICAgaGVhZGluZ0Rpdi5jbGFzc05hbWUgPSBoZWFkaW5nQ2xhc3M7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICBoZWFkaW5nRGl2LmNsYXNzTGlzdC5hZGQoU0VMRUNUT1JTLkNBVEVHT1JZX0hFQURJTkcucmVwbGFjZSgnLicsICcnKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGhlYWRpbmdEaXYuaW5uZXJIVE1MICs9IGljb247XG4gICAgICAgICAgICBoZWFkaW5nRGl2LmFwcGVuZENoaWxkKHRpdGxlRGl2KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY2F0ZWdvcnlEaXYuYXBwZW5kQ2hpbGQoaGVhZGluZ0Rpdik7XG4gICAgICAgICAgICBzZWN0aW9uLmFwcGVuZENoaWxkKGNhdGVnb3J5RGl2KTtcbiAgICAgICAgfSkuY2F0Y2goZXJyID0+IHRoaXMubG9nZ2VyLmVycm9yKGBGYWlsZWQgdG8gYWRkIGNhdGVnb3J5OiAke2Vycn1gKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkIGEgYnV0dG9uIHRvIHRoZSBzZXR0aW5nc1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgYWRkQnV0dG9uKHRpdGxlOiBzdHJpbmcsIGlkOiBzdHJpbmcsIHF1ZXJ5OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgSGVscGVycy53YWl0Rm9yRWxtKHF1ZXJ5KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkpIHJldHVybjtcblxuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocXVlcnkpO1xuICAgICAgICAgICAgaWYgKCFlbGVtZW50KSByZXR1cm47XG5cbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbkRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICBvcHRpb25EaXYuY2xhc3NMaXN0LmFkZChDTEFTU0VTLk9QVElPTik7XG5cbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgY29udGVudERpdi5jbGFzc0xpc3QuYWRkKENMQVNTRVMuQ09OVEVOVCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGJ1dHRvbkRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICBidXR0b25EaXYuc2V0QXR0cmlidXRlKFwidGFiaW5kZXhcIiwgXCIwXCIpO1xuICAgICAgICAgICAgYnV0dG9uRGl2LnNldEF0dHJpYnV0ZShcInRpdGxlXCIsIHRpdGxlKTtcbiAgICAgICAgICAgIGJ1dHRvbkRpdi5jbGFzc0xpc3QuYWRkKENMQVNTRVMuQlVUVE9OLCBDTEFTU0VTLkJVVFRPTl9DT05UQUlORVIsIFwiYnV0dG9uXCIpO1xuICAgICAgICAgICAgYnV0dG9uRGl2LmlkID0gaWQ7XG4gICAgICAgICAgICBidXR0b25EaXYudGV4dENvbnRlbnQgPSB0aXRsZTtcblxuICAgICAgICAgICAgY29udGVudERpdi5hcHBlbmRDaGlsZChidXR0b25EaXYpO1xuICAgICAgICAgICAgb3B0aW9uRGl2LmFwcGVuZENoaWxkKGNvbnRlbnREaXYpO1xuICAgICAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChvcHRpb25EaXYpO1xuICAgICAgICB9KS5jYXRjaChlcnIgPT4gdGhpcy5sb2dnZXIuZXJyb3IoYEZhaWxlZCB0byBhZGQgYnV0dG9uOiAke2Vycn1gKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkIGEgdGhlbWUgb3IgcGx1Z2luIGl0ZW0gdG8gdGhlIHNldHRpbmdzXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBhZGRJdGVtKHR5cGU6IFwidGhlbWVcIiB8IFwicGx1Z2luXCIsIGZpbGVOYW1lOiBzdHJpbmcsIG1ldGFEYXRhOiBNZXRhRGF0YSk6IHZvaWQge1xuICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKGBBZGRpbmcgJHt0eXBlfTogJHtmaWxlTmFtZX1gKTtcblxuICAgICAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUoYCR7ZmlsZU5hbWV9LWJveGApLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKHR5cGUgPT09IFwidGhlbWVcIikge1xuICAgICAgICAgICAgSGVscGVycy53YWl0Rm9yRWxtKFNFTEVDVE9SUy5USEVNRVNfQ0FURUdPUlkpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkVGhlbWUoZmlsZU5hbWUsIG1ldGFEYXRhKTtcbiAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB0aGlzLmxvZ2dlci5lcnJvcihgRmFpbGVkIHRvIGFkZCB0aGVtZTogJHtlcnJ9YCkpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09IFwicGx1Z2luXCIpIHtcbiAgICAgICAgICAgIEhlbHBlcnMud2FpdEZvckVsbShTRUxFQ1RPUlMuUExVR0lOU19DQVRFR09SWSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRQbHVnaW4oZmlsZU5hbWUsIG1ldGFEYXRhKTtcbiAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB0aGlzLmxvZ2dlci5lcnJvcihgRmFpbGVkIHRvIGFkZCBwbHVnaW46ICR7ZXJyfWApKTtcbiAgICAgICAgfSAgICAgICAgXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgYWRkUGx1Z2luKGZpbGVOYW1lOiBzdHJpbmcsIG1ldGFEYXRhOiBNZXRhRGF0YSk6IHZvaWQge1xuICAgICAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUoYCR7ZmlsZU5hbWV9LWJveGApLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGVuYWJsZWRQbHVnaW5zID0gdGhpcy5nZXRFbmFibGVkUGx1Z2lucygpO1xuICAgICAgICBQbHVnaW5PcHRpb25zLnJlZ2lzdGVyKGZpbGVOYW1lLCBtZXRhRGF0YS5vcHRpb25zID8/IFtdKTtcblxuICAgICAgICBjb25zdCBwbHVnaW5Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBwbHVnaW5Db250YWluZXIuaW5uZXJIVE1MID0gZ2V0UGx1Z2luSXRlbVRlbXBsYXRlKGZpbGVOYW1lLCBtZXRhRGF0YSwgZW5hYmxlZFBsdWdpbnMuaW5jbHVkZXMoZmlsZU5hbWUpKTtcbiAgICAgICAgcGx1Z2luQ29udGFpbmVyLnNldEF0dHJpYnV0ZShcIm5hbWVcIiwgYCR7ZmlsZU5hbWV9LWJveGApO1xuICAgICAgICBwbHVnaW5Db250YWluZXIuc2V0QXR0cmlidXRlKFwiZGF0YS1zdHJlbWlvLWVuaGFuY2VkLWl0ZW1cIiwgZmlsZU5hbWUpO1xuXG4gICAgICAgIGNvbnN0IHBsdWdpbnNDYXRlZ29yeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoU0VMRUNUT1JTLlBMVUdJTlNfQ0FURUdPUlkpO1xuICAgICAgICBwbHVnaW5zQ2F0ZWdvcnk/LmFwcGVuZENoaWxkKHBsdWdpbkNvbnRhaW5lcik7XG5cbiAgICAgICAgY29uc3QgYWN0aW9uQ29udGFpbmVyID0gcGx1Z2luQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KFxuICAgICAgICAgICAgXCJbZGF0YS1zdHJlbWlvLWVuaGFuY2VkLXBsdWdpbi1hY3Rpb25zXVwiXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IHBsdWdpblRvZ2dsZSA9IHBsdWdpbkNvbnRhaW5lci5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PihcIi5wbHVnaW5cIik7XG4gICAgICAgIGlmIChhY3Rpb25Db250YWluZXIgJiYgcGx1Z2luVG9nZ2xlICYmIG1ldGFEYXRhLm9wdGlvbnM/Lmxlbmd0aCkge1xuICAgICAgICAgICAgbW91bnRQbHVnaW5PcHRpb25zKHtcbiAgICAgICAgICAgICAgICBjb250YWluZXI6IHBsdWdpbkNvbnRhaW5lcixcbiAgICAgICAgICAgICAgICBhY3Rpb25Db250YWluZXIsXG4gICAgICAgICAgICAgICAgcGx1Z2luRmlsZTogZmlsZU5hbWUsXG4gICAgICAgICAgICAgICAgZGVmaW5pdGlvbnM6IG1ldGFEYXRhLm9wdGlvbnMsXG4gICAgICAgICAgICAgICAgaXNFbmFibGVkOiAoKSA9PiBwbHVnaW5Ub2dnbGUuY2xhc3NMaXN0LmNvbnRhaW5zKENMQVNTRVMuQ0hFQ0tFRCksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgTW9kTWFuYWdlci5jaGVja0Zvckl0ZW1VcGRhdGVzKGZpbGVOYW1lKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBhZGRUaGVtZShmaWxlTmFtZTogc3RyaW5nLCBtZXRhRGF0YTogTWV0YURhdGEpOiB2b2lkIHtcbiAgICAgICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKGAke2ZpbGVOYW1lfS1ib3hgKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjdXJyZW50VGhlbWUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShTVE9SQUdFX0tFWVMuQ1VSUkVOVF9USEVNRSk7XG5cbiAgICAgICAgY29uc3QgdGhlbWVDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICB0aGVtZUNvbnRhaW5lci5pbm5lckhUTUwgPSBnZXRUaGVtZUl0ZW1UZW1wbGF0ZShmaWxlTmFtZSwgbWV0YURhdGEsIGN1cnJlbnRUaGVtZSA9PT0gZmlsZU5hbWUpO1xuICAgICAgICB0aGVtZUNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoXCJuYW1lXCIsIGAke2ZpbGVOYW1lfS1ib3hgKTtcbiAgICAgICAgdGhlbWVDb250YWluZXIuc2V0QXR0cmlidXRlKFwiZGF0YS1zdHJlbWlvLWVuaGFuY2VkLWl0ZW1cIiwgZmlsZU5hbWUpO1xuXG4gICAgICAgIGNvbnN0IHRoZW1lc0NhdGVnb3J5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihTRUxFQ1RPUlMuVEhFTUVTX0NBVEVHT1JZKTtcbiAgICAgICAgdGhlbWVzQ2F0ZWdvcnk/LmFwcGVuZENoaWxkKHRoZW1lQ29udGFpbmVyKTtcbiAgICAgICAgXG4gICAgICAgIE1vZE1hbmFnZXIuY2hlY2tGb3JJdGVtVXBkYXRlcyhmaWxlTmFtZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGFuIGl0ZW0gZnJvbSB0aGUgc2V0dGluZ3NcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHJlbW92ZUl0ZW0oZmlsZU5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBBcnJheS5mcm9tKGRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKGAke2ZpbGVOYW1lfS1ib3hgKSkuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgZWxlbWVudC5yZW1vdmUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IGEgbmF2aWdhdGlvbiBlbGVtZW50IGFzIGFjdGl2ZVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgYWN0aXZlU2VjdGlvbihlbGVtZW50OiBFbGVtZW50KTogdm9pZCB7XG4gICAgICAgIGNvbnN0IG5hdiA9IHRoaXMuZ2V0TmF2TWVudSgpO1xuICAgICAgICBpZiAobmF2KSB7XG4gICAgICAgICAgICAvLyBSZW1vdmUgc2VsZWN0ZWQgY2xhc3MgZnJvbSBhbGwgbmF2IGl0ZW1zXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5hdi5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIG5hdi5jaGlsZHJlbltpXS5jbGFzc0xpc3QucmVtb3ZlKENMQVNTRVMuU0VMRUNURUQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgIC8vIEZhbGxiYWNrIHRvIHF1ZXJ5U2VsZWN0b3JcbiAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDY7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5hdkl0ZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAke1NFTEVDVE9SUy5OQVZfTUVOVX0gPiBkaXY6bnRoLWNoaWxkKCR7aX0pYCk7XG4gICAgICAgICAgICAgICAgbmF2SXRlbT8uY2xhc3NMaXN0LnJlbW92ZShDTEFTU0VTLlNFTEVDVEVEKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChDTEFTU0VTLlNFTEVDVEVEKTtcbiAgICB9XG5cbiAgICAvLyAtLS0gRHluYW1pYyBEaXNjb3ZlcnkgSGVscGVycyAtLS1cblxuICAgIHByaXZhdGUgc3RhdGljIGdldE5hdk1lbnUoKTogRWxlbWVudCB8IG51bGwge1xuICAgICAgICAvLyBUcnkgc2VsZWN0b3JcbiAgICAgICAgY29uc3QgbmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihTRUxFQ1RPUlMuTkFWX01FTlUpO1xuICAgICAgICBpZiAobmF2KSByZXR1cm4gbmF2O1xuXG4gICAgICAgIC8vIER5bmFtaWMgZmFsbGJhY2tcbiAgICAgICAgY29uc3Qga2V5d29yZHMgPSBbXCJHZW5lcmFsXCIsIFwiSW50ZXJmYWNlXCIsIFwiUGxheWVyXCIsIFwiU3RyZWFtaW5nXCIsIFwiU2hvcnRjdXRzXCJdO1xuICAgICAgICBjb25zdCBsaW5rcyA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYSwgZGl2W3RpdGxlXScpKTtcblxuICAgICAgICBmb3IgKGNvbnN0IGxpbmsgb2YgbGlua3MpIHtcbiAgICAgICAgICAgICBjb25zdCB0aXRsZSA9IGxpbmsuZ2V0QXR0cmlidXRlKCd0aXRsZScpO1xuICAgICAgICAgICAgIGlmICh0aXRsZSAmJiBrZXl3b3Jkcy5pbmNsdWRlcyh0aXRsZSkpIHtcbiAgICAgICAgICAgICAgICAgbGV0IHBhcmVudCA9IGxpbmsucGFyZW50RWxlbWVudDtcbiAgICAgICAgICAgICAgICAgd2hpbGUocGFyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICBjb25zdCBmb3VuZCA9IGtleXdvcmRzLmZpbHRlcihrID0+IHBhcmVudCEucXVlcnlTZWxlY3RvcihgW3RpdGxlPVwiJHtrfVwiXWApKTtcbiAgICAgICAgICAgICAgICAgICAgIGlmIChmb3VuZC5sZW5ndGggPj0gMSkgeyAvLyBDaGFuZ2VkIHRvIDEgdG8gYmUgbW9yZSBwZXJtaXNzaXZlIG9uIG1vYmlsZVxuICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXJlbnQ7XG4gICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJlbnQgPT09IGRvY3VtZW50LmJvZHkpIGJyZWFrO1xuICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGdldE5hdlNob3J0Y3V0SXRlbSgpOiBFbGVtZW50IHwgbnVsbCB7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbdGl0bGU9XCJTaG9ydGN1dHNcIl0nKSB8fCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbdGl0bGU9XCJTdHJlYW1pbmdcIl0nKTtcbiAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0U2V0dGluZ3NQYW5lbCgpOiBFbGVtZW50IHwgbnVsbCB7XG4gICAgICAgIC8vIFRyeSBzZWxlY3RvclxuICAgICAgICBjb25zdCBwYW5lbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoU0VMRUNUT1JTLlNFQ1RJT05TX0NPTlRBSU5FUik7XG4gICAgICAgIGlmIChwYW5lbCkgcmV0dXJuIHBhbmVsO1xuXG4gICAgICAgIC8vIER5bmFtaWMgZmFsbGJhY2tcbiAgICAgICAgY29uc3QgbmF2TWVudSA9IHRoaXMuZ2V0TmF2TWVudSgpO1xuICAgICAgICBjb25zdCBrZXl3b3JkcyA9IFtcIkdlbmVyYWxcIiwgXCJJbnRlcmZhY2VcIiwgXCJQbGF5ZXJcIiwgXCJTdHJlYW1pbmdcIiwgXCJTaG9ydGN1dHNcIl07XG4gICAgICAgIGNvbnN0IGFsbERpdnMgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2RpdicpKTtcbiAgICAgICAgZm9yIChjb25zdCBkaXYgb2YgYWxsRGl2cykge1xuICAgICAgICAgICAgIC8vIEV4Y2x1ZGUgbmF2IG1lbnUgYW5kIGl0cyBkZXNjZW5kYW50c1xuICAgICAgICAgICAgIGlmIChuYXZNZW51ICYmIChkaXYgPT09IG5hdk1lbnUgfHwgbmF2TWVudS5jb250YWlucyhkaXYpKSkgY29udGludWU7XG5cbiAgICAgICAgICAgICAvLyBUaGUgcmVhbCBzZXR0aW5ncyBwYW5lbCBjb250YWlucyBsYXJnZSBzZWN0aW9ucywgc28gd2UgY2FuIGNoZWNrIGlmIGl0IGhhcyBtdWx0aXBsZSBjaGlsZHJlblxuICAgICAgICAgICAgIGlmIChkaXYuY2hpbGRyZW4ubGVuZ3RoID49IDIpIHsgLy8gQ2hhbmdlZCB0byA+PSAyIHRvIGJlIG1vcmUgcGVybWlzc2l2ZSBvbiBtb2JpbGVcbiAgICAgICAgICAgICAgICAgbGV0IG1hdGNoQ291bnQgPSAwO1xuICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRpdi5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgaWYgKGtleXdvcmRzLnNvbWUoayA9PiBkaXYuY2hpbGRyZW5baV0udGV4dENvbnRlbnQ/LmluY2x1ZGVzKGspKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoQ291bnQrKztcbiAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICBpZiAobWF0Y2hDb3VudCA+PSAxKSByZXR1cm4gZGl2OyAvLyBDaGFuZ2VkIHRvID49IDEgdG8gYmUgbW9yZSBwZXJtaXNzaXZlIG9uIG1vYmlsZVxuICAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBnZXRFeGlzdGluZ1NlY3Rpb24ocGFuZWw6IEVsZW1lbnQpOiBFbGVtZW50IHwgbnVsbCB7XG4gICAgICAgIC8vIEZpbmQgYSBjaGlsZCB0aGF0IGNvbnRhaW5zIFwiR2VuZXJhbFwiIG9yIFwiUGxheWVyXCJcbiAgICAgICAgY29uc3Qga2V5d29yZHMgPSBbXCJHZW5lcmFsXCIsIFwiSW50ZXJmYWNlXCIsIFwiUGxheWVyXCIsIFwiU3RyZWFtaW5nXCIsIFwiU2hvcnRjdXRzXCJdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhbmVsLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBjaGlsZCA9IHBhbmVsLmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgaWYgKGtleXdvcmRzLnNvbWUoayA9PiBjaGlsZC50ZXh0Q29udGVudD8uaW5jbHVkZXMoaykpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNoaWxkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIEZhbGxiYWNrIHRvIHNlbGVjdG9yXG4gICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFNFTEVDVE9SUy5TRUNUSU9OKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBnZXRFeGlzdGluZ1NlY3Rpb25MYWJlbChzZWN0aW9uOiBFbGVtZW50IHwgbnVsbCk6IEVsZW1lbnQgfCBudWxsIHtcbiAgICAgICAgaWYgKCFzZWN0aW9uKSByZXR1cm4gbnVsbDtcbiAgICAgICAgLy8gVGhlIGxhYmVsIGlzIHVzdWFsbHkgdGhlIGZpcnN0IGNoaWxkIG9yIGNsYXNzIGNvbnRhaW5zIGxhYmVsXG4gICAgICAgIGlmIChzZWN0aW9uLmNoaWxkcmVuLmxlbmd0aCA+IDApIHJldHVybiBzZWN0aW9uLmNoaWxkcmVuWzBdO1xuICAgICAgICAvLyBGYWxsYmFja1xuICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihTRUxFQ1RPUlMuTEFCRUwpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGdldENhdGVnb3J5VGVtcGxhdGUoKTogeyBjYXRlZ29yeUNsYXNzOiBzdHJpbmcsIGNhdGVnb3J5VGl0bGVDbGFzczogc3RyaW5nLCBoZWFkaW5nQ2xhc3M6IHN0cmluZywgaWNvbkNsYXNzOiBzdHJpbmcgfSB8IG51bGwge1xuICAgICAgICAvLyBUcnkgdG8gZmluZCBhbiBleGlzdGluZyBjYXRlZ29yeSB0byBjb3B5IGNsYXNzZXNcbiAgICAgICAgY29uc3QgY2F0ZWdvcnlFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihTRUxFQ1RPUlMuQ0FURUdPUlkpO1xuICAgICAgICBjb25zdCBjYXRlZ29yeVRpdGxlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoU0VMRUNUT1JTLkNBVEVHT1JZX0xBQkVMKTtcbiAgICAgICAgY29uc3QgY2F0ZWdvcnlJY29uRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoU0VMRUNUT1JTLkNBVEVHT1JZX0lDT04pO1xuICAgICAgICBjb25zdCBjYXRlZ29yeUhlYWRpbmdFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihTRUxFQ1RPUlMuQ0FURUdPUllfSEVBRElORyk7XG5cbiAgICAgICAgbGV0IGNhdGVnb3J5Q2xhc3MgPSBjYXRlZ29yeUVsZW1lbnQ/LmNsYXNzTmFtZSB8fCBcIlwiO1xuICAgICAgICBsZXQgY2F0ZWdvcnlUaXRsZUNsYXNzID0gY2F0ZWdvcnlUaXRsZUVsZW1lbnQ/LmNsYXNzTmFtZSB8fCBcIlwiO1xuICAgICAgICBsZXQgaGVhZGluZ0NsYXNzID0gY2F0ZWdvcnlIZWFkaW5nRWxlbWVudD8uY2xhc3NOYW1lIHx8IFwiXCI7XG5cbiAgICAgICAgbGV0IGljb25DbGFzcyA9ICdpY29uJztcbiAgICAgICAgaWYgKGNhdGVnb3J5SWNvbkVsZW1lbnQgaW5zdGFuY2VvZiBTVkdFbGVtZW50KSB7XG4gICAgICAgICAgICBpY29uQ2xhc3MgPSBjYXRlZ29yeUljb25FbGVtZW50LmNsYXNzTmFtZS5iYXNlVmFsO1xuICAgICAgICB9IGVsc2UgaWYgKGNhdGVnb3J5SWNvbkVsZW1lbnQpIHtcbiAgICAgICAgICAgIGljb25DbGFzcyA9IGNhdGVnb3J5SWNvbkVsZW1lbnQuY2xhc3NOYW1lO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNhdGVnb3J5Q2xhc3MgJiYgY2F0ZWdvcnlUaXRsZUNsYXNzKSB7XG4gICAgICAgICAgICByZXR1cm4geyBjYXRlZ29yeUNsYXNzLCBjYXRlZ29yeVRpdGxlQ2xhc3MsIGhlYWRpbmdDbGFzcywgaWNvbkNsYXNzIH07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUcnkgZHluYW1pYyBpZiBzZWxlY3RvciBmYWlsZWRcbiAgICAgICAgY29uc3QgcGFuZWwgPSB0aGlzLmdldFNldHRpbmdzUGFuZWwoKTtcbiAgICAgICAgaWYgKHBhbmVsKSB7XG4gICAgICAgICAgICBjb25zdCBzZWN0aW9uID0gdGhpcy5nZXRFeGlzdGluZ1NlY3Rpb24ocGFuZWwpO1xuICAgICAgICAgICAgaWYgKHNlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAvLyBGaW5kIGEgY2F0ZWdvcnkgaW5zaWRlIHNlY3Rpb25cbiAgICAgICAgICAgICAgICAvLyBVc3VhbGx5IG5vdCB0aGUgZmlyc3QgY2hpbGQgKExhYmVsKVxuICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPHNlY3Rpb24uY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2hpbGQgPSBzZWN0aW9uLmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgICAgICAgICAvLyBTa2lwIGlmIGl0IGlzIHRoZSBsYWJlbC90aXRsZVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBsYWJlbCA9IHRoaXMuZ2V0RXhpc3RpbmdTZWN0aW9uTGFiZWwoc2VjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGlsZCA9PT0gbGFiZWwpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFRoaXMgY2hpbGQgaXMgbGlrZWx5IGEgY2F0ZWdvcnlcbiAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcnlDbGFzcyA9IGNoaWxkLmNsYXNzTmFtZTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBGaW5kIEhlYWRpbmdcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaGVhZGluZyA9IGNoaWxkLmNoaWxkcmVuWzBdOyAvLyBBc3N1bWluZyBmaXJzdCBjaGlsZCBpcyBoZWFkaW5nXG4gICAgICAgICAgICAgICAgICAgIGlmIChoZWFkaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkaW5nQ2xhc3MgPSBoZWFkaW5nLmNsYXNzTmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEhlYWRpbmcgY29udGFpbnMgSWNvbiBhbmQgVGl0bGVcbiAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpY29uID0gaGVhZGluZy5xdWVyeVNlbGVjdG9yKCdzdmcnKSB8fCBoZWFkaW5nLmNoaWxkcmVuWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpY29uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpY29uIGluc3RhbmNlb2YgU1ZHRWxlbWVudCkgaWNvbkNsYXNzID0gaWNvbi5jbGFzc05hbWUuYmFzZVZhbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpY29uQ2xhc3MgPSBpY29uLmNsYXNzTmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0aXRsZSA9IGhlYWRpbmcucXVlcnlTZWxlY3RvcignZGl2JykgfHwgaGVhZGluZy5jaGlsZHJlblsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGl0bGUpIGNhdGVnb3J5VGl0bGVDbGFzcyA9IHRpdGxlLmNsYXNzTmFtZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChjYXRlZ29yeUNsYXNzICYmIGNhdGVnb3J5VGl0bGVDbGFzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGNhdGVnb3J5Q2xhc3MsIGNhdGVnb3J5VGl0bGVDbGFzcywgaGVhZGluZ0NsYXNzLCBpY29uQ2xhc3MgfTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIHdhaXRGb3JTZXR0aW5nc1BhbmVsKCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIGxldCByZXRyaWVzID0gMDtcbiAgICAgICAgICAgIGNvbnN0IG1heFJldHJpZXMgPSA0MDsgLy8gMjAgc2Vjb25kc1xuICAgICAgICAgICAgY29uc3QgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2V0U2V0dGluZ3NQYW5lbCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0cmllcysrO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmV0cmllcyA+IG1heFJldHJpZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcihcIlRpbWVvdXQgd2FpdGluZyBmb3Igc2V0dGluZ3MgcGFuZWxcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpOyAvLyByZXNvbHZlIHRvIGxldCBpdCBmYWlsIGdyYWNlZnVsbHkgaW5zaWRlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCA1MDApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyB3YWl0Rm9yTmF2TWVudSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgbGV0IHJldHJpZXMgPSAwO1xuICAgICAgICAgICAgY29uc3QgbWF4UmV0cmllcyA9IDQwOyAvLyAyMCBzZWNvbmRzXG4gICAgICAgICAgICBjb25zdCBpbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5nZXROYXZNZW51KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXRyaWVzKys7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXRyaWVzID4gbWF4UmV0cmllcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmVycm9yKFwiVGltZW91dCB3YWl0aW5nIGZvciBuYXYgbWVudVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCA1MDApO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNldHRpbmdzO1xuIiwgImltcG9ydCBUZW1wbGF0ZUNhY2hlIGZyb20gJy4uLy4uL3V0aWxzL3RlbXBsYXRlQ2FjaGUnO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TW9kc1RhYlRlbXBsYXRlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFRlbXBsYXRlQ2FjaGUubG9hZChfX2Rpcm5hbWUsICdtb2RzLXRhYicpO1xufVxuIiwgImltcG9ydCBUZW1wbGF0ZUNhY2hlIGZyb20gJy4uLy4uL3V0aWxzL3RlbXBsYXRlQ2FjaGUnO1xuXG5pbnRlcmZhY2UgTW9kTWV0YURhdGEge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICAgIGF1dGhvcjogc3RyaW5nO1xuICAgIHZlcnNpb246IHN0cmluZztcbiAgICBwcmV2aWV3Pzogc3RyaW5nO1xuICAgIGRvd25sb2FkOiBzdHJpbmc7XG4gICAgcmVwbzogc3RyaW5nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TW9kSXRlbVRlbXBsYXRlKFxuICAgIG1ldGFEYXRhOiBNb2RNZXRhRGF0YSxcbiAgICB0eXBlOiBcIlBsdWdpblwiIHwgXCJUaGVtZVwiLCBcbiAgICBpbnN0YWxsZWQ6IGJvb2xlYW5cbik6IHN0cmluZyB7XG4gICAgbGV0IHRlbXBsYXRlID0gVGVtcGxhdGVDYWNoZS5sb2FkKF9fZGlybmFtZSwgJ21vZHMtaXRlbScpO1xuICAgIFxuICAgIC8vIEdlbmVyYXRlIGxvZ28gYmxvY2sgYmFzZWQgb24gdHlwZVxuICAgIGxldCBsb2dvQmxvY2sgPSBcIlwiO1xuXG4gICAgaWYodHlwZSA9PT0gXCJUaGVtZVwiKSB7XG4gICAgICAgIGlmKCFtZXRhRGF0YS5wcmV2aWV3KSB7XG4gICAgICAgICAgICAvLyBJZiBubyBwcmV2aWV3IGlzIHByb3ZpZGVkIGZvciB0aGVtZSwgdXNlIGEgcGxhY2Vob2xkZXJcbiAgICAgICAgICAgIGxvZ29CbG9jayA9IGBcbiAgICAgICAgPHN2ZyBjbGFzcz1cImljb24tR3hWYllcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+XG4gICAgICAgICAgICA8cGF0aCBkPVwiTTQgM2gxNmExIDEgMCAwIDEgMSAxdjVhMSAxIDAgMCAxLTEgMUg0YTEgMSAwIDAgMS0xLTFWNGExIDEgMCAwIDEgMS0xem0yIDloNmExIDEgMCAwIDEgMSAxdjNoMXY2aC00di02aDF2LTJINWExIDEgMCAwIDEtMS0xdi0yaDJ2MXptMTEuNzMyIDEuNzMybDEuNzY4LTEuNzY4IDEuNzY4IDEuNzY4YTIuNSAyLjUgMCAxIDEtMy41MzYgMHpcIiBzdHlsZT1cImZpbGw6IGN1cnJlbnRjb2xvcjtcIj48L3BhdGg+XG4gICAgICAgIDwvc3ZnPmA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBVc2UgdGhlIHByZXZpZXcgaW1hZ2UgZm9yIHRoZW1lIGxvZ29cbiAgICAgICAgICAgIGxvZ29CbG9jayA9IGBcbiAgICAgICAgICAgIDxhIGhyZWY9XCIke21ldGFEYXRhLnByZXZpZXd9XCIgdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9yZWZlcnJlclwiPlxuICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJsb2dvLVdyc0dGXCIgc3JjPVwiJHttZXRhRGF0YS5wcmV2aWV3fVwiIGFsdD1cIlRoZW1lIFByZXZpZXdcIiBsb2FkaW5nPVwibGF6eVwiPlxuICAgICAgICAgICAgPC9hPmA7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBsb2dvQmxvY2sgPSBgXG4gICAgICAgIDxzdmcgY2xhc3M9XCJpY29uLUd4VmJZXCIgdmlld0JveD1cIjAgMCA1MTIgNTEyXCI+XG4gICAgICAgICAgICA8cGF0aCBkPVwiTTM0NS42NTAwMDAwMDAwMDAxIDQ1Ni4zMDAwMDAwMDAwMDAyaC03MC44N2MtMi4zNSAwLjAxLTQuNjktMC40My02Ljg2LTEuMjktMi4xOC0wLjg3LTQuMTUtMi4xNC01Ljc5LTMuNzUtMy4zNy0zLjE5LTUuMjctNy41NC01LjI5LTEyLjA3di0yNi4zM2MwLjAzLTQuMDUtMC44MS04LjA3LTIuNDktMTEuNzlzLTQuMTItNy4wNy03LjE3LTkuODljLTcuNzgtNy4yMi0xOS4wNC0xMS4yMi0zMC44LTEwLjkzLTIxLjMzIDAuNDctMzkuMjcgMTguMzUtMzkuMjcgMzkuMDd2MTkuODdjMC4wMSAyLjI0LTAuNDUgNC40OC0xLjM2IDYuNTVzLTIuMjQgMy45NS0zLjkzIDUuNTJjLTMuMzUgMy4yMS03LjkgNS4wMi0xMi42NSA1LjA0aC03MC4xN2MtMTQuNzEgMC4wMS0yOC44My01LjU1LTM5LjIzLTE1LjQ2LTEwLjQyLTkuOTEtMTYuMjgtMjMuMzYtMTYuMjktMzcuNHYtNjYuOTJjMC4wMy00LjUzIDEuOTItOC44NyA1LjI4LTEyLjA3IDMuMzYtMy4yMSA3LjkxLTUuMDEgMTIuNjYtNS4wNGgyNy42MWM5LjE3IDAgMTguMDQtMy43MSAyNS4wMi0xMC40NiAzLjg5LTMuNzIgNi45OC04LjE1IDkuMDctMTMuMDJhMzcuMiAzNy4yIDAgMCAwIDMuMDktMTUuNGMtMC4zLTIwLjE1LTE3LjY0LTM3LjE3LTM3Ljk4LTM3LjE3aC0yNi43MWMtMi4zNSAwLjAxLTQuNjktMC40My02Ljg3LTEuMjlhMTcuNyAxNy43IDAgMCAxLTUuNzktMy43NWMtMy4zNy0zLjE5LTUuMjYtNy41NC01LjI4LTEyLjA3di02Ni45MmE1MC45IDUwLjkgMCAwIDEgNC4xOS0yMC4yNWMyLjc2LTYuNDMgNi44Ni0xMi4yNSAxMi4wNi0xNy4xMSAxMC4zOS05LjkxIDI0LjQ4LTE1LjQ4IDM5LjE3LTE1LjVoNTUuMDJjMi4xMiAwLjAxIDQuMTYtMC43NyA1LjY4LTIuMTkgMC43My0wLjcxIDEuMzItMS41NSAxLjcxLTIuNDkgMC40LTAuOTMgMC42LTEuOTIgMC41OC0yLjkydi02LjE4YTU5IDU5IDAgMCAxIDUuMDgtMjQuMDVjMy4zOC03LjYyIDguMjktMTQuNTMgMTQuNDYtMjAuMzUgNi4xOS01LjggMTMuNTUtMTAuMzYgMjEuNjItMTMuNGE2OS44IDY5LjggMCAwIDEgMjUuMzItNC40N2MzNS4zOCAwLjU3IDY0LjE5IDI4LjkgNjQuMTkgNjMuMDN2NS40MmMtMC4wMyAxLjUxIDAuNDIgMyAxLjI5IDQuMjVhNy43MyA3LjczIDAgMCAwIDMuNjEgMi44MWMwLjk4IDAuMzcgMi4wMyAwLjU2IDMuMDcgMC41NGg1NS4wMmE1Ni40IDU2LjQgMCAwIDEgMjAuOTMgMy45OWMxMy40IDUuMzEgMjQuMDQgMTUuNDYgMjkuNiAyOC4yNCAyLjc3IDYuMzIgNC4yIDEzLjExIDQuMTkgMTkuOTZ2NTIuNDdjLTAuMDMgMS41MiAwLjQyIDMuMDEgMS4zIDQuMjZhNy42NiA3LjY2IDAgMCAwIDMuNiAyLjgxYzAuOTggMC4zNyAyLjAzIDAuNTYgMy4wNyAwLjU0aDUuNjhjMzYuNDggMCA2Ni4wOSAyNy41NyA2Ni4wOSA2MS40MSAwIDM0Ljc5LTI5LjMxIDYzLjEyLTY1LjI5IDYzLjEyaC02LjQ4Yy0yLjEyLTAuMDEtNC4xNSAwLjc4LTUuNjggMi4xOWE3LjQgNy40IDAgMCAwLTEuNzEgMi40OWMtMC40IDAuOTMtMC42IDEuOTMtMC41OCAyLjkzdjUzLjIzYzAuMDEgNi44NS0xLjQyIDEzLjY0LTQuMTkgMTkuOTYtNS41NiAxMi43OC0xNi4yIDIyLjkzLTI5LjYgMjguMjRhNTYgNTYgMCAwIDEtMjAuOTMgMy45OVwiIHN0eWxlPVwiZmlsbDogY3VycmVudGNvbG9yO1wiPjwvcGF0aD5cbiAgICAgICAgPC9zdmc+YFxuICAgIH1cblxuICAgIC8vIFJlcGxhY2UgbWV0YWRhdGEgcGxhY2Vob2xkZXJzXG4gICAgY29uc3QgbWV0YUtleXMgPSBbJ25hbWUnLCAnZGVzY3JpcHRpb24nLCAnYXV0aG9yJywgJ3ZlcnNpb24nXSBhcyBjb25zdDtcbiAgICBtZXRhS2V5cy5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgIGNvbnN0IHJlZ2V4ID0gbmV3IFJlZ0V4cChge3tcXFxccyoke2tleX1cXFxccyp9fWAsICdnJyk7XG4gICAgICAgIHRlbXBsYXRlID0gdGVtcGxhdGUucmVwbGFjZShyZWdleCwgbWV0YURhdGFba2V5XSB8fCAnJyk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGVtcGxhdGVcbiAgICAgICAgLnJlcGxhY2UoL1xce1xce1xccyp0eXBlXFxzKlxcfVxcfS9nLCB0eXBlKVxuICAgICAgICAucmVwbGFjZSgvXFx7XFx7XFxzKmFjdGlvbmJ0blRpdGxlXFxzKlxcfVxcfS9nLCBpbnN0YWxsZWQgPyBcIlVuaW5zdGFsbFwiIDogXCJJbnN0YWxsXCIpXG4gICAgICAgIC5yZXBsYWNlKFwie3sgYWN0aW9uYnRuQ2xhc3MgfX1cIiwgaW5zdGFsbGVkID8gXCJ1bmluc3RhbGwtYnV0dG9uLWNvbnRhaW5lci1vVjRZb1wiIDogXCJpbnN0YWxsLWJ1dHRvbi1jb250YWluZXIteWZjcTVcIilcbiAgICAgICAgLnJlcGxhY2UoXCJ7eyBkb3dubG9hZCB9fVwiLCBtZXRhRGF0YS5kb3dubG9hZClcbiAgICAgICAgLnJlcGxhY2UoXCJ7eyByZXBvIH19XCIsIG1ldGFEYXRhLnJlcG8pXG4gICAgICAgIC5yZXBsYWNlKFwiPCEtLSB0aGVtZSBwcmV2aWV3IGhlcmUgLS0+XCIsIGxvZ29CbG9jaylcbiAgICAgICAgLnJlcGxhY2UoXCI8IS0tIHBsdWdpbiBpY29uIGhlcmUgLS0+XCIsIFwiXCIpOyBcbn1cbiIsICJpbXBvcnQgVGVtcGxhdGVDYWNoZSBmcm9tICcuLi8uLi91dGlscy90ZW1wbGF0ZUNhY2hlJztcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEFib3V0Q2F0ZWdvcnlUZW1wbGF0ZShcbiAgICB2ZXJzaW9uOiBzdHJpbmcsIFxuICAgIGNoZWNrRm9yVXBkYXRlc09uU3RhcnR1cDogYm9vbGVhbiwgXG4gICAgZGlzY29yZFJpY2hQcmVzZW5jZTogYm9vbGVhbiwgXG4gICAgZW5hYmxlVHJhbnNwYXJlbnRUaGVtZXM6IGJvb2xlYW5cbik6IHN0cmluZyB7XG4gICAgY29uc3QgdGVtcGxhdGUgPSBUZW1wbGF0ZUNhY2hlLmxvYWQoX19kaXJuYW1lLCAnYWJvdXQtY2F0ZWdvcnknKTtcbiAgICBcbiAgICByZXR1cm4gdGVtcGxhdGVcbiAgICAgICAgLnJlcGxhY2UoXCJ7eyB2ZXJzaW9uIH19XCIsIHZlcnNpb24pXG4gICAgICAgIC5yZXBsYWNlKFwie3sgY2hlY2tGb3JVcGRhdGVzT25TdGFydHVwIH19XCIsIGNoZWNrRm9yVXBkYXRlc09uU3RhcnR1cCA/IFwiY2hlY2tlZFwiIDogXCJcIilcbiAgICAgICAgLnJlcGxhY2UoXCJ7eyBkaXNjb3JkcmljaHByZXNlbmNlIH19XCIsIGRpc2NvcmRSaWNoUHJlc2VuY2UgPyBcImNoZWNrZWRcIiA6IFwiXCIpXG4gICAgICAgIC5yZXBsYWNlKFwie3sgZW5hYmxlVHJhbnNwYXJlbnRUaGVtZXMgfX1cIiwgZW5hYmxlVHJhbnNwYXJlbnRUaGVtZXMgPyBcImNoZWNrZWRcIiA6IFwiXCIpO1xufVxuIiwgImltcG9ydCBUZW1wbGF0ZUNhY2hlIGZyb20gJy4uLy4uL3V0aWxzL3RlbXBsYXRlQ2FjaGUnO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGVmYXVsdFRoZW1lVGVtcGxhdGUoYXBwbGllZDogYm9vbGVhbik6IHN0cmluZyB7XG4gICAgY29uc3QgdGVtcGxhdGUgPSBUZW1wbGF0ZUNhY2hlLmxvYWQoX19kaXJuYW1lLCAnZGVmYXVsdC10aGVtZScpO1xuXG4gICAgcmV0dXJuIHRlbXBsYXRlXG4gICAgICAgIC5yZXBsYWNlKFwie3sgZGlzYWJsZWQgfX1cIiwgYXBwbGllZCA/IFwiZGlzYWJsZWRcIiA6IFwiXCIpXG4gICAgICAgIC5yZXBsYWNlKFwie3sgbGFiZWwgfX1cIiwgYXBwbGllZCA/IFwiQXBwbGllZFwiIDogXCJBcHBseVwiKVxuICAgICAgICAucmVwbGFjZShcInt7IGJhY2tncm91bmRDb2xvciB9fVwiLCBhcHBsaWVkID8gXCJ2YXIoLS1vdmVybGF5LWNvbG9yKVwiIDogXCJ2YXIoLS1zZWNvbmRhcnktYWNjZW50LWNvbG9yKVwiKTtcbn1cbiIsICJpbXBvcnQgVGVtcGxhdGVDYWNoZSBmcm9tICcuLi8uLi91dGlscy90ZW1wbGF0ZUNhY2hlJztcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEJhY2tCdXR0b24oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gVGVtcGxhdGVDYWNoZS5sb2FkKF9fZGlybmFtZSwgJ2JhY2stYnRuJyk7XG59XG4iLCAiaW1wb3J0IHsgUGxhdGZvcm1NYW5hZ2VyIH0gZnJvbSBcIi4uL3BsYXRmb3JtL1BsYXRmb3JtTWFuYWdlclwiO1xuaW1wb3J0IHsgQ2FwYWNpdG9yUGxhdGZvcm0gfSBmcm9tIFwiLi4vcGxhdGZvcm0vQ2FwYWNpdG9yUGxhdGZvcm1cIjtcbmltcG9ydCBTZXR0aW5ncyBmcm9tIFwiLi4vY29yZS9TZXR0aW5nc1wiO1xuaW1wb3J0IHByb3BlcnRpZXMgZnJvbSBcIi4uL2NvcmUvUHJvcGVydGllc1wiO1xuaW1wb3J0IE1vZE1hbmFnZXIgZnJvbSBcIi4uL2NvcmUvTW9kTWFuYWdlclwiO1xuaW1wb3J0IEhlbHBlcnMgZnJvbSBcIi4uL3V0aWxzL0hlbHBlcnNcIjtcbmltcG9ydCB7IGdldE1vZHNUYWJUZW1wbGF0ZSB9IGZyb20gXCIuLi9jb21wb25lbnRzL21vZHMtdGFiL21vZHNUYWJcIjtcbmltcG9ydCB7IGdldE1vZEl0ZW1UZW1wbGF0ZSB9IGZyb20gXCIuLi9jb21wb25lbnRzL21vZHMtaXRlbS9tb2RzSXRlbVwiO1xuaW1wb3J0IHsgZ2V0QWJvdXRDYXRlZ29yeVRlbXBsYXRlIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvYWJvdXQtY2F0ZWdvcnkvYWJvdXRDYXRlZ29yeVwiO1xuaW1wb3J0IHsgZ2V0RGVmYXVsdFRoZW1lVGVtcGxhdGUgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9kZWZhdWx0LXRoZW1lL2RlZmF1bHRUaGVtZVwiO1xuaW1wb3J0IHsgZ2V0QmFja0J1dHRvbiB9IGZyb20gXCIuLi9jb21wb25lbnRzL2JhY2stYnRuL2JhY2tCdG5cIjtcbmltcG9ydCBsb2dnZXIgZnJvbSBcIi4uL3V0aWxzL2xvZ2dlclwiO1xuaW1wb3J0IHsgam9pbiB9IGZyb20gXCJwYXRoXCI7XG5pbXBvcnQge1xuICAgIFNUT1JBR0VfS0VZUyxcbiAgICBTRUxFQ1RPUlMsXG4gICAgQ0xBU1NFUyxcbiAgICBGSUxFX0VYVEVOU0lPTlMsXG4gICAgVElNRU9VVFMsXG59IGZyb20gXCIuLi9jb25zdGFudHNcIjtcbmltcG9ydCBFeHRyYWN0TWV0YURhdGEgZnJvbSBcIi4uL3V0aWxzL0V4dHJhY3RNZXRhRGF0YVwiO1xuaW1wb3J0IHsgTm9kZUpTIH0gZnJvbSAnY2FwYWNpdG9yLW5vZGVqcyc7XG5pbXBvcnQgTG9nTWFuYWdlciBmcm9tIFwiLi4vY29yZS9Mb2dNYW5hZ2VyXCI7XG5pbXBvcnQgeyBGaWxlUGlja2VyIH0gZnJvbSAnQGNhcGF3ZXNvbWUvY2FwYWNpdG9yLWZpbGUtcGlja2VyJztcbmltcG9ydCB7IGNyZWF0ZVN0cmVtaW9FbmhhbmNlZEFwaSB9IGZyb20gXCIuLi9jb3JlL1N0cmVtaW9FbmhhbmNlZEFwaVwiO1xuXG4vLyBJbml0aWFsaXplIHBsYXRmb3JtIGZvciBDYXBhY2l0b3JcblBsYXRmb3JtTWFuYWdlci5zZXRQbGF0Zm9ybShuZXcgQ2FwYWNpdG9yUGxhdGZvcm0oKSk7XG5cbi8vIEhvb2sgY29uc29sZSBmb3IgbG9ncyBtZW51XG5Mb2dNYW5hZ2VyLmhvb2tDb25zb2xlKCk7XG5Mb2dNYW5hZ2VyLmFkZExvZygnSU5GTycsICdTdHJlbWlvIEVuaGFuY2VkOiBQcmVsb2FkIHNjcmlwdCBpbml0aWFsaXplZCcpO1xuXG4vLyBMaXN0ZW4gZm9yIHNlcnZlciBsb2dzIGFuZCBlcnJvcnNcbk5vZGVKUy5hZGRMaXN0ZW5lcignbG9nJywgKGRhdGEpID0+IHtcbiAgICBMb2dNYW5hZ2VyLmFkZExvZygnSU5GTycsIGBbU2VydmVyXSAke2RhdGEuYXJncy5qb2luKCcgJyl9YCk7XG4gICAgY29uc29sZS5sb2coJ1tTZXJ2ZXJdJywgLi4uZGF0YS5hcmdzKTtcbn0pO1xuXG5Ob2RlSlMuYWRkTGlzdGVuZXIoJ2Vycm9yJywgKGRhdGEpID0+IHtcbiAgICBMb2dNYW5hZ2VyLmFkZExvZygnRVJST1InLCBgW1NlcnZlciBFcnJvcl0gJHtkYXRhLmFyZ3Muam9pbignICcpfWApO1xuICAgIGNvbnNvbGUuZXJyb3IoJ1tTZXJ2ZXIgRXJyb3JdJywgLi4uZGF0YS5hcmdzKTtcbiAgICBIZWxwZXJzLnNob3dBbGVydCgnZXJyb3InLCAnU2VydmVyIEVycm9yJywgZGF0YS5hcmdzLmpvaW4oJyAnKSwgWydPSyddKTtcbn0pO1xuXG4vLyBNb2NrIGlwY1JlbmRlcmVyIGZvciBBbmRyb2lkXG5jb25zdCBpcGNSZW5kZXJlciA9IHtcbiAgICBpbnZva2U6IGFzeW5jIChjaGFubmVsOiBzdHJpbmcsIC4uLmFyZ3M6IGFueVtdKSA9PiB7XG4gICAgICAgIGxvZ2dlci5pbmZvKGBbQW5kcm9pZF0gSW52b2tlICR7Y2hhbm5lbH1gLCBhcmdzKTtcbiAgICAgICAgaWYgKGNoYW5uZWwgPT09ICdnZXQtdHJhbnNwYXJlbmN5LXN0YXR1cycpIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYgKGNoYW5uZWwgPT09ICdleHRyYWN0LWVtYmVkZGVkLXN1YnRpdGxlcycpIHJldHVybiBbXTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSxcbiAgICBzZW5kOiAoY2hhbm5lbDogc3RyaW5nLCAuLi5hcmdzOiBhbnlbXSkgPT4ge1xuICAgICAgICBsb2dnZXIuaW5mbyhgW0FuZHJvaWRdIFNlbmQgJHtjaGFubmVsfWAsIGFyZ3MpO1xuICAgIH0sXG4gICAgb246IChjaGFubmVsOiBzdHJpbmcsIGxpc3RlbmVyOiBhbnkpID0+IHtcbiAgICAgICAgLy8gTm8tb3BcbiAgICB9XG59O1xuXG5jb25zdCBTRVRUSU5HU19ST1VURSA9IFwiIy9zZXR0aW5nc1wiO1xuY29uc3QgUExBWUVSX1JPVVRFID0gXCIjL3BsYXllclwiO1xuY29uc3QgU1RSRUFNSU5HX1NFUlZFUl9SRUFEWV9USU1FT1VUX01TID0gMTUwMDA7XG5jb25zdCBGVUxMU0NSRUVOX0NPTlRST0xfU0VMRUNUT1JTID0gW1xuICAgICdbdGl0bGU9XCJGdWxsc2NyZWVuXCJdJyxcbiAgICAnW3RpdGxlPVwiRXhpdCBGdWxsc2NyZWVuXCJdJyxcbiAgICAnYnV0dG9uW2FyaWEtbGFiZWw9XCJGdWxsc2NyZWVuXCJdJyxcbiAgICAnYnV0dG9uW2FyaWEtbGFiZWw9XCJFeGl0IEZ1bGxzY3JlZW5cIl0nLFxuICAgICdbY2xhc3MqPVwiZnVsbHNjcmVlbi10b2dnbGVcIl0nLFxuICAgICdbY2xhc3MqPVwiaG9yaXpvbnRhbC1uYXYtYmFyLWNvbnRhaW5lci1cIl0gW2NsYXNzKj1cImJ1dHRvbnMtY29udGFpbmVyLVwiXSA+IDpub3QoW2NsYXNzKj1cIm1lbnUtYnV0dG9uLWNvbnRhaW5lclwiXSk6bm90KC5zdHJlbWlvLWVuaGFuY2VkLXBpcC1idXR0b24pJyxcbl07XG5cbmxldCBmdWxsc2NyZWVuU3R5bGVJbmplY3RlZCA9IGZhbHNlO1xubGV0IGZ1bGxzY3JlZW5PYnNlcnZlclN0YXJ0ZWQgPSBmYWxzZTtcbmxldCBzZXR0aW5nc09ic2VydmVyU3RhcnRlZCA9IGZhbHNlO1xubGV0IHNldHRpbmdzQ2hlY2tTY2hlZHVsZWQgPSBmYWxzZTtcbmxldCBwbGF5ZXJPYnNlcnZlclN0YXJ0ZWQgPSBmYWxzZTtcbmxldCBwbGF5ZXJGZWF0dXJlQ2hlY2tTY2hlZHVsZWQgPSBmYWxzZTtcbmxldCBzdHJlYW1pbmdTZXJ2ZXJSZWFkeVByb21pc2U6IFByb21pc2U8dm9pZD4gfCBudWxsID0gbnVsbDtcbmxldCBzdHJlYW1pbmdTZXJ2ZXJSZWxvYWRTY2hlZHVsZWQgPSBmYWxzZTtcblxuY29uc3QgaW5pdCA9IGFzeW5jICgpID0+IHtcbiAgICBMb2dNYW5hZ2VyLmFkZExvZygnSU5GTycsICdTdHJlbWlvIEVuaGFuY2VkOiBJbml0aWFsaXphdGlvbiBzdGFydGVkJyk7XG4gICAgLy8gSW5pdGlhbGl6ZSBwbGF0Zm9ybVxuICAgIGlmICghUGxhdGZvcm1NYW5hZ2VyLmN1cnJlbnQpIFBsYXRmb3JtTWFuYWdlci5zZXRQbGF0Zm9ybShuZXcgQ2FwYWNpdG9yUGxhdGZvcm0oKSk7XG4gICAgYXdhaXQgUGxhdGZvcm1NYW5hZ2VyLmN1cnJlbnQuaW5pdCgpO1xuICAgIHZvaWQgZW5zdXJlQnVuZGxlZFN0cmVhbWluZ1NlcnZlclJlYWR5KCk7XG5cbiAgICBpbnN0YWxsRnVsbHNjcmVlbkhpZGVyKCk7XG4gICAgb2JzZXJ2ZVNldHRpbmdzVWkoKTtcbiAgICBvYnNlcnZlUGxheWVyVWkoKTtcblxuICAgIHdpbmRvdy5zdHJlbWlvRW5oYW5jZWQgPSBjcmVhdGVTdHJlbWlvRW5oYW5jZWRBcGkoYXBwbHlVc2VyVGhlbWUpO1xuXG4gICAgaW5pdGlhbGl6ZVVzZXJTZXR0aW5ncygpO1xuXG4gICAgLy8gQXBwbHkgZW5hYmxlZCB0aGVtZVxuICAgIGF3YWl0IGFwcGx5VXNlclRoZW1lKCk7XG5cbiAgICAvLyBMb2FkIGVuYWJsZWQgcGx1Z2luc1xuICAgIGF3YWl0IGxvYWRFbmFibGVkUGx1Z2lucygpO1xuXG4gICAgLy8gSGFuZGxlIG5hdmlnYXRpb24gY2hhbmdlc1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiaGFzaGNoYW5nZVwiLCAoKSA9PiB7XG4gICAgICAgIHNjaGVkdWxlU2V0dGluZ3NDaGVjaygpO1xuICAgICAgICBzY2hlZHVsZVBsYXllckZlYXR1cmVTeW5jKCk7XG4gICAgfSk7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCAoKSA9PiB7XG4gICAgICAgIGhpZGVGdWxsc2NyZWVuQ29udHJvbHMoKTtcbiAgICB9KTtcblxuICAgIC8vIEluaXRpYWwgY2hlY2tcbiAgICBzY2hlZHVsZVNldHRpbmdzQ2hlY2soKTtcbiAgICBzY2hlZHVsZVBsYXllckZlYXR1cmVTeW5jKCk7XG4gICAgaGlkZUZ1bGxzY3JlZW5Db250cm9scygpO1xuXG4gICAgLy8gSW5qZWN0IHN1Y2Nlc3MgdG9hc3RcbiAgICBIZWxwZXJzLmNyZWF0ZVRvYXN0KCdlbmhhbmNlZC1sb2FkZWQnLCAnU3RyZW1pbyBFbmhhbmNlZCcsICdTdHJlbWlvIEVuaGFuY2VkIExvYWRlZCcsICdzdWNjZXNzJyk7XG59O1xuXG5pZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2xvYWRpbmcnKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGluaXQpO1xufSBlbHNlIHtcbiAgICBpbml0KCk7XG59XG5cbi8vIFNldHRpbmdzIHBhZ2Ugb3BlbmVkXG5sZXQgaXNDaGVja2luZ1NldHRpbmdzID0gZmFsc2U7XG5cbmZ1bmN0aW9uIGlzRW5oYW5jZWRTZXR0aW5nc1JlYWR5KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBCb29sZWFuKFxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVuaGFuY2VkXCIpICYmXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNlY3Rpb249XCJlbmhhbmNlZFwiXScpICYmXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoU0VMRUNUT1JTLlRIRU1FU19DQVRFR09SWSkgJiZcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihTRUxFQ1RPUlMuUExVR0lOU19DQVRFR09SWSkgJiZcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihTRUxFQ1RPUlMuQUJPVVRfQ0FURUdPUlkpXG4gICAgKTtcbn1cblxuZnVuY3Rpb24gYmluZEJ1dHRvbkNsaWNrKFxuICAgIGJ1dHRvbklkOiBzdHJpbmcsXG4gICAgaGFuZGxlcjogKCkgPT4gdm9pZCB8IFByb21pc2U8dm9pZD4sXG4gICAgZXJyb3JDb250ZXh0OiBzdHJpbmdcbik6IHZvaWQge1xuICAgIEhlbHBlcnMud2FpdEZvckVsbShgIyR7YnV0dG9uSWR9YCkudGhlbigoKSA9PiB7XG4gICAgICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGJ1dHRvbklkKTtcbiAgICAgICAgaWYgKCEoYnV0dG9uIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSByZXR1cm47XG4gICAgICAgIGlmIChidXR0b24uZGF0YXNldC5zdHJlbWlvRW5oYW5jZWRDbGlja0JvdW5kID09PSBcInRydWVcIikgcmV0dXJuO1xuXG4gICAgICAgIGJ1dHRvbi5kYXRhc2V0LnN0cmVtaW9FbmhhbmNlZENsaWNrQm91bmQgPSBcInRydWVcIjtcbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICB2b2lkIGhhbmRsZXIoKTtcbiAgICAgICAgfSk7XG4gICAgfSkuY2F0Y2goZXJyID0+IGxvZ2dlci5lcnJvcihgRmFpbGVkIHRvIHNldHVwICR7ZXJyb3JDb250ZXh0fTogJHtlcnJ9YCkpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBjaGVja1NldHRpbmdzKCkge1xuICAgIGlmICghbG9jYXRpb24uaHJlZi5pbmNsdWRlcyhTRVRUSU5HU19ST1VURSkpIHJldHVybjtcbiAgICBpZiAoaXNFbmhhbmNlZFNldHRpbmdzUmVhZHkoKSkgcmV0dXJuO1xuXG4gICAgaWYgKGlzQ2hlY2tpbmdTZXR0aW5ncykgcmV0dXJuO1xuICAgIGlzQ2hlY2tpbmdTZXR0aW5ncyA9IHRydWU7XG5cbiAgICB0cnkge1xuICAgICAgICBhd2FpdCBkb0NoZWNrU2V0dGluZ3MoKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgICBpc0NoZWNraW5nU2V0dGluZ3MgPSBmYWxzZTtcbiAgICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGRvQ2hlY2tTZXR0aW5ncygpIHtcbiAgICBNb2RNYW5hZ2VyLmFkZEFwcGx5VGhlbWVGdW5jdGlvbigpO1xuXG4gICAgY29uc3QgdGhlbWVzUGF0aCA9IHByb3BlcnRpZXMudGhlbWVzUGF0aDtcbiAgICBjb25zdCBwbHVnaW5zUGF0aCA9IHByb3BlcnRpZXMucGx1Z2luc1BhdGg7XG5cbiAgICBsZXQgYWxsVGhlbWVzOiBzdHJpbmdbXSA9IFtdO1xuICAgIGxldCBhbGxQbHVnaW5zOiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgdHJ5IHtcbiAgICAgICAgYWxsVGhlbWVzID0gYXdhaXQgUGxhdGZvcm1NYW5hZ2VyLmN1cnJlbnQucmVhZGRpcih0aGVtZXNQYXRoKTtcbiAgICAgICAgYWxsUGx1Z2lucyA9IGF3YWl0IFBsYXRmb3JtTWFuYWdlci5jdXJyZW50LnJlYWRkaXIocGx1Z2luc1BhdGgpO1xuICAgIH0gY2F0Y2goZSkge1xuICAgICAgICBsb2dnZXIuZXJyb3IoXCJGYWlsZWQgdG8gcmVhZCB0aGVtZXMvcGx1Z2lucyBkaXJlY3RvcmllczogXCIgKyBlKTtcbiAgICB9XG5cbiAgICBjb25zdCB0aGVtZXNMaXN0ID0gYWxsVGhlbWVzLmZpbHRlcihmaWxlTmFtZSA9PiBmaWxlTmFtZS5lbmRzV2l0aChGSUxFX0VYVEVOU0lPTlMuVEhFTUUpKTtcbiAgICBjb25zdCBwbHVnaW5zTGlzdCA9IGFsbFBsdWdpbnMuZmlsdGVyKGZpbGVOYW1lID0+IGZpbGVOYW1lLmVuZHNXaXRoKEZJTEVfRVhURU5TSU9OUy5QTFVHSU4pKTtcblxuICAgIGxvZ2dlci5pbmZvKFwiQWRkaW5nICdFbmhhbmNlZCcgc2VjdGlvbnMuLi5cIik7XG4gICAgU2V0dGluZ3MuYWRkU2VjdGlvbihcImVuaGFuY2VkXCIsIFwiRW5oYW5jZWRcIik7XG4gICAgU2V0dGluZ3MuYWRkQ2F0ZWdvcnkoXCJUaGVtZXNcIiwgXCJlbmhhbmNlZFwiLCBnZXRUaGVtZUljb24oKSk7XG4gICAgU2V0dGluZ3MuYWRkQ2F0ZWdvcnkoXCJQbHVnaW5zXCIsIFwiZW5oYW5jZWRcIiwgZ2V0UGx1Z2luSWNvbigpKTtcbiAgICBTZXR0aW5ncy5hZGRDYXRlZ29yeShcIkFib3V0XCIsIFwiZW5oYW5jZWRcIiwgZ2V0QWJvdXRJY29uKCkpO1xuXG4gICAgU2V0dGluZ3MuYWRkQnV0dG9uKFwiSW1wb3J0IFRoZW1lXCIsIFwiaW1wb3J0VGhlbWVCdG5cIiwgU0VMRUNUT1JTLlRIRU1FU19DQVRFR09SWSk7XG4gICAgU2V0dGluZ3MuYWRkQnV0dG9uKFwiTWFuYWdlIFRoZW1lcyBGb2xkZXJcIiwgXCJvcGVudGhlbWVzZm9sZGVyQnRuXCIsIFNFTEVDVE9SUy5USEVNRVNfQ0FURUdPUlkpO1xuICAgIFNldHRpbmdzLmFkZEJ1dHRvbihcIkltcG9ydCBQbHVnaW5cIiwgXCJpbXBvcnRQbHVnaW5CdG5cIiwgU0VMRUNUT1JTLlBMVUdJTlNfQ0FURUdPUlkpO1xuICAgIFNldHRpbmdzLmFkZEJ1dHRvbihcIk1hbmFnZSBQbHVnaW5zIEZvbGRlclwiLCBcIm9wZW5wbHVnaW5zZm9sZGVyQnRuXCIsIFNFTEVDVE9SUy5QTFVHSU5TX0NBVEVHT1JZKTtcblxuICAgIHNldHVwSW1wb3J0QnV0dG9uKFwiaW1wb3J0VGhlbWVCdG5cIiwgXCJ0aGVtZVwiKTtcbiAgICBzZXR1cEltcG9ydEJ1dHRvbihcImltcG9ydFBsdWdpbkJ0blwiLCBcInBsdWdpblwiKTtcbiAgICBzZXR1cE1hbmFnZWRGb2xkZXJCdXR0b24oXCJvcGVudGhlbWVzZm9sZGVyQnRuXCIsIHByb3BlcnRpZXMudGhlbWVzUGF0aCk7XG4gICAgc2V0dXBNYW5hZ2VkRm9sZGVyQnV0dG9uKFwib3BlbnBsdWdpbnNmb2xkZXJCdG5cIiwgcHJvcGVydGllcy5wbHVnaW5zUGF0aCk7XG5cbiAgICB3cml0ZUFib3V0KCk7XG5cbiAgICAvLyBCcm93c2UgcGx1Z2lucy90aGVtZXMgZnJvbSBzdHJlbWlvLWVuaGFuY2VkLXJlZ2lzdHJ5XG4gICAgc2V0dXBCcm93c2VNb2RzQnV0dG9uKCk7XG5cbiAgICAvLyBBZGQgdGhlbWVzIHRvIHNldHRpbmdzXG4gICAgSGVscGVycy53YWl0Rm9yRWxtKFNFTEVDVE9SUy5USEVNRVNfQ0FURUdPUlkpLnRoZW4oYXN5bmMgKCkgPT4ge1xuICAgICAgICAvLyBEZWZhdWx0IHRoZW1lXG4gICAgICAgIGlmICghZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdHJlbWlvLWVuaGFuY2VkLWRlZmF1bHQtdGhlbWVcIikpIHtcbiAgICAgICAgICAgIGNvbnN0IGlzQ3VycmVudFRoZW1lRGVmYXVsdCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFNUT1JBR0VfS0VZUy5DVVJSRU5UX1RIRU1FKSA9PT0gXCJEZWZhdWx0XCI7XG4gICAgICAgICAgICBjb25zdCBkZWZhdWx0VGhlbWVDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgZGVmYXVsdFRoZW1lQ29udGFpbmVyLmlkID0gXCJzdHJlbWlvLWVuaGFuY2VkLWRlZmF1bHQtdGhlbWVcIjtcbiAgICAgICAgICAgIGRlZmF1bHRUaGVtZUNvbnRhaW5lci5pbm5lckhUTUwgPSBnZXREZWZhdWx0VGhlbWVUZW1wbGF0ZShpc0N1cnJlbnRUaGVtZURlZmF1bHQpO1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihTRUxFQ1RPUlMuVEhFTUVTX0NBVEVHT1JZKT8uYXBwZW5kQ2hpbGQoZGVmYXVsdFRoZW1lQ29udGFpbmVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFkZCBpbnN0YWxsZWQgdGhlbWVzXG4gICAgICAgIGF3YWl0IFByb21pc2UuYWxsKHRoZW1lc0xpc3QubWFwKGFzeW5jICh0aGVtZSkgPT4ge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCB0aGVtZVBhdGggPSBqb2luKHRoZW1lc1BhdGgsIHRoZW1lKTtcbiAgICAgICAgICAgICAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgUGxhdGZvcm1NYW5hZ2VyLmN1cnJlbnQucmVhZEZpbGUodGhlbWVQYXRoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBtZXRhRGF0YSA9IEV4dHJhY3RNZXRhRGF0YS5leHRyYWN0TWV0YWRhdGFGcm9tVGV4dChjb250ZW50KTtcblxuICAgICAgICAgICAgICAgIGlmIChtZXRhRGF0YSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAobWV0YURhdGEubmFtZS50b0xvd2VyQ2FzZSgpICE9PSBcImRlZmF1bHRcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgU2V0dGluZ3MuYWRkSXRlbShcInRoZW1lXCIsIHRoZW1lLCBtZXRhRGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmVycm9yKGBGYWlsZWQgdG8gbG9hZCB0aGVtZSBtZXRhZGF0YSBmb3IgJHt0aGVtZX06ICR7ZX1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICAgIH0pLmNhdGNoKGVyciA9PiBsb2dnZXIuZXJyb3IoXCJGYWlsZWQgdG8gc2V0dXAgdGhlbWVzOiBcIiArIGVycikpO1xuXG4gICAgLy8gQWRkIHBsdWdpbnMgdG8gc2V0dGluZ3NcbiAgICBmb3IgKGNvbnN0IHBsdWdpbiBvZiBwbHVnaW5zTGlzdCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcGx1Z2luUGF0aCA9IGpvaW4ocGx1Z2luc1BhdGgsIHBsdWdpbik7XG4gICAgICAgICAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgUGxhdGZvcm1NYW5hZ2VyLmN1cnJlbnQucmVhZEZpbGUocGx1Z2luUGF0aCk7XG4gICAgICAgICAgICBjb25zdCBtZXRhRGF0YSA9IEV4dHJhY3RNZXRhRGF0YS5leHRyYWN0TWV0YWRhdGFGcm9tVGV4dChjb250ZW50KTtcblxuICAgICAgICAgICAgaWYgKG1ldGFEYXRhKSB7XG4gICAgICAgICAgICAgICAgU2V0dGluZ3MuYWRkSXRlbShcInBsdWdpblwiLCBwbHVnaW4sIG1ldGFEYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgbG9nZ2VyLmVycm9yKGBGYWlsZWQgdG8gbG9hZCBwbHVnaW4gbWV0YWRhdGEgZm9yICR7cGx1Z2lufTogJHtlfWApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgTW9kTWFuYWdlci50b2dnbGVQbHVnaW5MaXN0ZW5lcigpO1xuICAgIE1vZE1hbmFnZXIuc2Nyb2xsTGlzdGVuZXIoKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZW5zdXJlQnVuZGxlZFN0cmVhbWluZ1NlcnZlclJlYWR5KCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmIChzdHJlYW1pbmdTZXJ2ZXJSZWFkeVByb21pc2UpIHtcbiAgICAgICAgYXdhaXQgc3RyZWFtaW5nU2VydmVyUmVhZHlQcm9taXNlO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc3RyZWFtaW5nU2VydmVyUmVhZHlQcm9taXNlID0gKGFzeW5jICgpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF3YWl0IFByb21pc2UucmFjZShbXG4gICAgICAgICAgICAgICAgTm9kZUpTLndoZW5SZWFkeSgpLFxuICAgICAgICAgICAgICAgIG5ldyBQcm9taXNlPG5ldmVyPigoXywgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoXCJUaW1lZCBvdXQgd2FpdGluZyBmb3IgdGhlIGJ1bmRsZWQgc3RyZWFtaW5nIHNlcnZlci5cIikpO1xuICAgICAgICAgICAgICAgICAgICB9LCBTVFJFQU1JTkdfU0VSVkVSX1JFQURZX1RJTUVPVVRfTVMpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdKTtcblxuICAgICAgICAgICAgTG9nTWFuYWdlci5hZGRMb2coXCJJTkZPXCIsIFwiQnVuZGxlZCBzdHJlYW1pbmcgc2VydmVyIGlzIHJlYWR5XCIpO1xuICAgICAgICAgICAgc2NoZWR1bGVTdHJlYW1pbmdTZXJ2ZXJSZWxvYWQoKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcik7XG4gICAgICAgICAgICBMb2dNYW5hZ2VyLmFkZExvZyhcIkVSUk9SXCIsIGBCdW5kbGVkIHN0cmVhbWluZyBzZXJ2ZXIgZmFpbGVkIHRvIGJlY29tZSByZWFkeTogJHttZXNzYWdlfWApO1xuICAgICAgICAgICAgbG9nZ2VyLmVycm9yKGBCdW5kbGVkIHN0cmVhbWluZyBzZXJ2ZXIgZmFpbGVkIHRvIGJlY29tZSByZWFkeTogJHttZXNzYWdlfWApO1xuICAgICAgICAgICAgc3RyZWFtaW5nU2VydmVyUmVhZHlQcm9taXNlID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH0pKCk7XG5cbiAgICBhd2FpdCBzdHJlYW1pbmdTZXJ2ZXJSZWFkeVByb21pc2U7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJlbG9hZFN0cmVhbWluZ1NlcnZlcihyZXRyeUNvdW50ID0gMCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IEhlbHBlcnMuX2V2YWwoYGNvcmUudHJhbnNwb3J0LmRpc3BhdGNoKHsgYWN0aW9uOiAnU3RyZWFtaW5nU2VydmVyJywgYXJnczogeyBhY3Rpb246ICdSZWxvYWQnIH0gfSk7YCk7XG4gICAgICAgIGxvZ2dlci5pbmZvKFwiU3RyZW1pbyBzdHJlYW1pbmcgc2VydmVyIHJlbG9hZGVkLlwiKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zdCBtZXNzYWdlID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpO1xuICAgICAgICBpZiAocmV0cnlDb3VudCA8IDMpIHtcbiAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB2b2lkIHJlbG9hZFN0cmVhbWluZ1NlcnZlcihyZXRyeUNvdW50ICsgMSk7XG4gICAgICAgICAgICB9LCBUSU1FT1VUUy5DT1JFU1RBVEVfUkVUUllfSU5URVJWQUwpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbG9nZ2VyLmVycm9yKGBGYWlsZWQgdG8gcmVsb2FkIGJ1bmRsZWQgc3RyZWFtaW5nIHNlcnZlcjogJHttZXNzYWdlfWApO1xuICAgICAgICBMb2dNYW5hZ2VyLmFkZExvZyhcIkVSUk9SXCIsIGBGYWlsZWQgdG8gcmVsb2FkIGJ1bmRsZWQgc3RyZWFtaW5nIHNlcnZlcjogJHttZXNzYWdlfWApO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gc2NoZWR1bGVTdHJlYW1pbmdTZXJ2ZXJSZWxvYWQoKTogdm9pZCB7XG4gICAgaWYgKHN0cmVhbWluZ1NlcnZlclJlbG9hZFNjaGVkdWxlZCkgcmV0dXJuO1xuICAgIHN0cmVhbWluZ1NlcnZlclJlbG9hZFNjaGVkdWxlZCA9IHRydWU7XG5cbiAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHN0cmVhbWluZ1NlcnZlclJlbG9hZFNjaGVkdWxlZCA9IGZhbHNlO1xuICAgICAgICB2b2lkIHJlbG9hZFN0cmVhbWluZ1NlcnZlcigpO1xuICAgIH0sIFRJTUVPVVRTLlNFUlZFUl9SRUxPQURfREVMQVkpO1xufVxuXG5mdW5jdGlvbiBzY2hlZHVsZVNldHRpbmdzQ2hlY2soKTogdm9pZCB7XG4gICAgaWYgKHNldHRpbmdzQ2hlY2tTY2hlZHVsZWQpIHJldHVybjtcbiAgICBzZXR0aW5nc0NoZWNrU2NoZWR1bGVkID0gdHJ1ZTtcblxuICAgIHdpbmRvdy5zZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcbiAgICAgICAgc2V0dGluZ3NDaGVja1NjaGVkdWxlZCA9IGZhbHNlO1xuICAgICAgICBhd2FpdCBjaGVja1NldHRpbmdzKCk7XG4gICAgfSwgMTAwKTtcbn1cblxuZnVuY3Rpb24gb2JzZXJ2ZVNldHRpbmdzVWkoKTogdm9pZCB7XG4gICAgaWYgKHNldHRpbmdzT2JzZXJ2ZXJTdGFydGVkKSByZXR1cm47XG4gICAgc2V0dGluZ3NPYnNlcnZlclN0YXJ0ZWQgPSB0cnVlO1xuXG4gICAgY29uc3Qgc3RhcnRPYnNlcnZlciA9ICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XG4gICAgICAgICAgICBpZiAobG9jYXRpb24uaHJlZi5pbmNsdWRlcyhTRVRUSU5HU19ST1VURSkgJiYgIWlzQ2hlY2tpbmdTZXR0aW5ncyAmJiAhaXNFbmhhbmNlZFNldHRpbmdzUmVhZHkoKSkge1xuICAgICAgICAgICAgICAgIHNjaGVkdWxlU2V0dGluZ3NDaGVjaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBvYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmJvZHksIHtcbiAgICAgICAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICAgICAgICAgIHN1YnRyZWU6IHRydWUsXG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBpZiAoZG9jdW1lbnQuYm9keSkge1xuICAgICAgICBzdGFydE9ic2VydmVyKCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBib2R5T2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoXywgb2JzKSA9PiB7XG4gICAgICAgIGlmICghZG9jdW1lbnQuYm9keSkgcmV0dXJuO1xuICAgICAgICBvYnMuZGlzY29ubmVjdCgpO1xuICAgICAgICBzdGFydE9ic2VydmVyKCk7XG4gICAgfSk7XG5cbiAgICBib2R5T2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsIHtcbiAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgICBzdWJ0cmVlOiB0cnVlLFxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBzY2hlZHVsZVBsYXllckZlYXR1cmVTeW5jKCk6IHZvaWQge1xuICAgIGlmIChwbGF5ZXJGZWF0dXJlQ2hlY2tTY2hlZHVsZWQpIHJldHVybjtcbiAgICBwbGF5ZXJGZWF0dXJlQ2hlY2tTY2hlZHVsZWQgPSB0cnVlO1xuXG4gICAgd2luZG93LnNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuICAgICAgICBwbGF5ZXJGZWF0dXJlQ2hlY2tTY2hlZHVsZWQgPSBmYWxzZTtcbiAgICAgICAgYXdhaXQgc3luY1BsYXllckZlYXR1cmVzKCk7XG4gICAgfSwgMTAwKTtcbn1cblxuZnVuY3Rpb24gb2JzZXJ2ZVBsYXllclVpKCk6IHZvaWQge1xuICAgIGlmIChwbGF5ZXJPYnNlcnZlclN0YXJ0ZWQpIHJldHVybjtcbiAgICBwbGF5ZXJPYnNlcnZlclN0YXJ0ZWQgPSB0cnVlO1xuXG4gICAgY29uc3Qgc3RhcnRPYnNlcnZlciA9ICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XG4gICAgICAgICAgICBpZiAobG9jYXRpb24uaHJlZi5pbmNsdWRlcyhQTEFZRVJfUk9VVEUpKSB7XG4gICAgICAgICAgICAgICAgc2NoZWR1bGVQbGF5ZXJGZWF0dXJlU3luYygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBvYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmJvZHksIHtcbiAgICAgICAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICAgICAgICAgIHN1YnRyZWU6IHRydWUsXG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBpZiAoZG9jdW1lbnQuYm9keSkge1xuICAgICAgICBzdGFydE9ic2VydmVyKCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBib2R5T2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoXywgb2JzKSA9PiB7XG4gICAgICAgIGlmICghZG9jdW1lbnQuYm9keSkgcmV0dXJuO1xuICAgICAgICBvYnMuZGlzY29ubmVjdCgpO1xuICAgICAgICBzdGFydE9ic2VydmVyKCk7XG4gICAgfSk7XG5cbiAgICBib2R5T2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsIHtcbiAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgICBzdWJ0cmVlOiB0cnVlLFxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBpbnN0YWxsRnVsbHNjcmVlbkhpZGVyKCk6IHZvaWQge1xuICAgIGlmICghZnVsbHNjcmVlblN0eWxlSW5qZWN0ZWQpIHtcbiAgICAgICAgY29uc3Qgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gICAgICAgIHN0eWxlLmlkID0gXCJzdHJlbWlvLWVuaGFuY2VkLWZ1bGxzY3JlZW4tc3R5bGVcIjtcbiAgICAgICAgc3R5bGUudGV4dENvbnRlbnQgPSBgXG4gICAgICAgICAgICAke0ZVTExTQ1JFRU5fQ09OVFJPTF9TRUxFQ1RPUlMuam9pbihcIixcXG4gICAgICAgICAgICBcIil9IHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XG4gICAgICAgICAgICAgICAgdmlzaWJpbGl0eTogaGlkZGVuICFpbXBvcnRhbnQ7XG4gICAgICAgICAgICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmUgIWltcG9ydGFudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgYDtcblxuICAgICAgICBjb25zdCBhcHBlbmRTdHlsZSA9ICgpID0+IHtcbiAgICAgICAgICAgIGlmICghZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzdHlsZS5pZCkpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuICAgICAgICAgICAgZnVsbHNjcmVlblN0eWxlSW5qZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKCFhcHBlbmRTdHlsZSgpKSB7XG4gICAgICAgICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKChfLCBvYnMpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIWFwcGVuZFN0eWxlKCkpIHJldHVybjtcbiAgICAgICAgICAgICAgICBvYnMuZGlzY29ubmVjdCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBvYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgeyBjaGlsZExpc3Q6IHRydWUsIHN1YnRyZWU6IHRydWUgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoaWRlRnVsbHNjcmVlbkNvbnRyb2xzKCk7XG5cbiAgICBpZiAoZnVsbHNjcmVlbk9ic2VydmVyU3RhcnRlZCkgcmV0dXJuO1xuICAgIGZ1bGxzY3JlZW5PYnNlcnZlclN0YXJ0ZWQgPSB0cnVlO1xuXG4gICAgY29uc3Qgc3RhcnRPYnNlcnZlciA9ICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XG4gICAgICAgICAgICBoaWRlRnVsbHNjcmVlbkNvbnRyb2xzKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQuYm9keSwge1xuICAgICAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgICAgICAgc3VidHJlZTogdHJ1ZSxcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHRydWUsXG4gICAgICAgICAgICBhdHRyaWJ1dGVGaWx0ZXI6IFtcImNsYXNzXCIsIFwidGl0bGVcIiwgXCJhcmlhLWxhYmVsXCJdLFxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgaWYgKGRvY3VtZW50LmJvZHkpIHtcbiAgICAgICAgc3RhcnRPYnNlcnZlcigpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgYm9keU9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKF8sIG9icykgPT4ge1xuICAgICAgICBpZiAoIWRvY3VtZW50LmJvZHkpIHJldHVybjtcbiAgICAgICAgb2JzLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgc3RhcnRPYnNlcnZlcigpO1xuICAgIH0pO1xuXG4gICAgYm9keU9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCB7XG4gICAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICAgICAgc3VidHJlZTogdHJ1ZSxcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gaGlkZUZ1bGxzY3JlZW5Db250cm9scygpOiB2b2lkIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsPEhUTUxFbGVtZW50PihGVUxMU0NSRUVOX0NPTlRST0xfU0VMRUNUT1JTLmpvaW4oXCIsXCIpKS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgIGlmIChlbGVtZW50LmNsb3Nlc3QoJ1tjbGFzcyo9XCJtZW51LWJ1dHRvbi1jb250YWluZXJcIl0nKSB8fCBlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcInN0cmVtaW8tZW5oYW5jZWQtcGlwLWJ1dHRvblwiKSkgcmV0dXJuO1xuICAgICAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgZWxlbWVudC5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJub25lXCI7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGluaXRpYWxpemVVc2VyU2V0dGluZ3MoKTogdm9pZCB7XG4gICAgY29uc3QgZGVmYXVsdHM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4gICAgICAgIFtTVE9SQUdFX0tFWVMuRU5BQkxFRF9QTFVHSU5TXTogXCJbXVwiLFxuICAgICAgICBbU1RPUkFHRV9LRVlTLkNIRUNLX1VQREFURVNfT05fU1RBUlRVUF06IFwiZmFsc2VcIixcbiAgICAgICAgW1NUT1JBR0VfS0VZUy5ESVNDT1JEX1JQQ106IFwiZmFsc2VcIixcbiAgICB9O1xuXG4gICAgZm9yIChjb25zdCBba2V5LCBkZWZhdWx0VmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKGRlZmF1bHRzKSkge1xuICAgICAgICBpZiAoIWxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSkpIHtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgZGVmYXVsdFZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gYXBwbHlVc2VyVGhlbWUocmVxdWVzdGVkVGhlbWU/OiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBjb25zdCBjdXJyZW50VGhlbWUgPSByZXF1ZXN0ZWRUaGVtZSA/PyBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShTVE9SQUdFX0tFWVMuQ1VSUkVOVF9USEVNRSk7XG5cbiAgICBpZiAoIWN1cnJlbnRUaGVtZSB8fCBjdXJyZW50VGhlbWUgPT09IFwiRGVmYXVsdFwiKSB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWN0aXZlVGhlbWVcIik/LnJlbW92ZSgpO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShTVE9SQUdFX0tFWVMuQ1VSUkVOVF9USEVNRSwgXCJEZWZhdWx0XCIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoIS9eW0EtWmEtejAtOS5fLV0rXFwudGhlbWVcXC5jc3MkLy50ZXN0KGN1cnJlbnRUaGVtZSkpIHtcbiAgICAgICAgbG9nZ2VyLndhcm4oYFJlZnVzZWQgdG8gYXBwbHkgaW52YWxpZCB0aGVtZSBuYW1lOiAke2N1cnJlbnRUaGVtZX1gKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IHRoZW1lUGF0aCA9IGpvaW4ocHJvcGVydGllcy50aGVtZXNQYXRoLCBjdXJyZW50VGhlbWUpO1xuXG4gICAgLy8gSW4gY2FwYWNpdG9yLCB3ZSBuZWVkIHRvIHJlYWQgdGhlIGZpbGUgY29udGVudCBhbmQgaW5qZWN0IGl0IGFzIHN0eWxlXG4gICAgLy8gYmVjYXVzZSBmaWxlOi8vIFVSTHMgbWlnaHQgbm90IHdvcmsgb3IgYXJlIHJlc3RyaWN0ZWQuXG4gICAgLy8gRWxlY3Ryb24gaW1wbGVtZW50YXRpb24gdXNlcyBwYXRoVG9GaWxlVVJMIHdoaWNoIHJlc3VsdHMgaW4gZmlsZTovLy5cbiAgICAvLyBMZXQncyB0cnkgdG8gcmVhZCBjb250ZW50IGFuZCBpbmplY3QgPHN0eWxlPiBpbnN0ZWFkIG9mIDxsaW5rPi5cblxuICAgIHRyeSB7XG4gICAgICAgIGlmICghYXdhaXQgUGxhdGZvcm1NYW5hZ2VyLmN1cnJlbnQuZXhpc3RzKHRoZW1lUGF0aCkpIHtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFNUT1JBR0VfS0VZUy5DVVJSRU5UX1RIRU1FLCBcIkRlZmF1bHRcIik7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZW1vdmUgZXhpc3RpbmcgdGhlbWUgaWYgcHJlc2VudFxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFjdGl2ZVRoZW1lXCIpPy5yZW1vdmUoKTtcblxuICAgICAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgUGxhdGZvcm1NYW5hZ2VyLmN1cnJlbnQucmVhZEZpbGUodGhlbWVQYXRoKTtcblxuICAgICAgICBjb25zdCBzdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgICAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJhY3RpdmVUaGVtZVwiKTtcbiAgICAgICAgc3R5bGVFbGVtZW50LnRleHRDb250ZW50ID0gY29udGVudDtcbiAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShTVE9SQUdFX0tFWVMuQ1VSUkVOVF9USEVNRSwgY3VycmVudFRoZW1lKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBsb2dnZXIuZXJyb3IoXCJGYWlsZWQgdG8gYXBwbHkgdGhlbWU6IFwiICsgZSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGxvYWRFbmFibGVkUGx1Z2lucygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBwbHVnaW5zUGF0aCA9IHByb3BlcnRpZXMucGx1Z2luc1BhdGg7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKCFhd2FpdCBQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC5leGlzdHMocGx1Z2luc1BhdGgpKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgYWxsUGx1Z2lucyA9IGF3YWl0IFBsYXRmb3JtTWFuYWdlci5jdXJyZW50LnJlYWRkaXIocGx1Z2luc1BhdGgpO1xuICAgICAgICBjb25zdCBwbHVnaW5zVG9Mb2FkID0gYWxsUGx1Z2lucy5maWx0ZXIoZmlsZU5hbWUgPT4gZmlsZU5hbWUuZW5kc1dpdGgoRklMRV9FWFRFTlNJT05TLlBMVUdJTikpO1xuXG4gICAgICAgIGNvbnN0IGVuYWJsZWRQbHVnaW5zOiBzdHJpbmdbXSA9IEpTT04ucGFyc2UoXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShTVE9SQUdFX0tFWVMuRU5BQkxFRF9QTFVHSU5TKSB8fCBcIltdXCJcbiAgICAgICAgKTtcblxuICAgICAgICBmb3IgKGNvbnN0IHBsdWdpbiBvZiBwbHVnaW5zVG9Mb2FkKSB7XG4gICAgICAgICAgICBpZiAoZW5hYmxlZFBsdWdpbnMuaW5jbHVkZXMocGx1Z2luKSkge1xuICAgICAgICAgICAgICAgIGF3YWl0IE1vZE1hbmFnZXIubG9hZFBsdWdpbihwbHVnaW4pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBsb2dnZXIuZXJyb3IoXCJGYWlsZWQgdG8gbG9hZCBwbHVnaW5zOiBcIiArIGUpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gc2V0dXBJbXBvcnRCdXR0b24oYnV0dG9uSWQ6IHN0cmluZywgdHlwZTogXCJ0aGVtZVwiIHwgXCJwbHVnaW5cIik6IHZvaWQge1xuICAgIGJpbmRCdXR0b25DbGljayhidXR0b25JZCwgKCkgPT4gaW1wb3J0TW9kRmlsZSh0eXBlKSwgYCR7dHlwZX0gaW1wb3J0IGJ1dHRvbmApO1xufVxuXG5mdW5jdGlvbiBzZXR1cE1hbmFnZWRGb2xkZXJCdXR0b24oYnV0dG9uSWQ6IHN0cmluZywgZm9sZGVyUGF0aDogc3RyaW5nKTogdm9pZCB7XG4gICAgYmluZEJ1dHRvbkNsaWNrKGJ1dHRvbklkLCAoKSA9PiBQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC5vcGVuUGF0aChmb2xkZXJQYXRoKSwgYGZvbGRlciBidXR0b24gJHtidXR0b25JZH1gKTtcbn1cblxubGV0IGlzSW1wb3J0aW5nID0gZmFsc2U7XG5mdW5jdGlvbiBzYW5pdGl6ZUltcG9ydGVkTW9kRmlsZU5hbWUoZmlsZU5hbWU6IHN0cmluZywgdHlwZTogXCJ0aGVtZVwiIHwgXCJwbHVnaW5cIik6IHN0cmluZyB8IG51bGwge1xuICAgIGNvbnN0IGV4cGVjdGVkRXh0ZW5zaW9uID0gdHlwZSA9PT0gXCJ0aGVtZVwiID8gRklMRV9FWFRFTlNJT05TLlRIRU1FIDogRklMRV9FWFRFTlNJT05TLlBMVUdJTjtcbiAgICBjb25zdCBub3JtYWxpemVkID0gZmlsZU5hbWUudHJpbSgpLnNwbGl0KC9bXFxcXC9dLykucG9wKCkgfHwgXCJcIjtcblxuICAgIGlmICghbm9ybWFsaXplZCkgcmV0dXJuIG51bGw7XG4gICAgaWYgKCFub3JtYWxpemVkLmVuZHNXaXRoKGV4cGVjdGVkRXh0ZW5zaW9uKSkgcmV0dXJuIG51bGw7XG4gICAgaWYgKCEvXltBLVphLXowLTkuXy1dKyQvLnRlc3Qobm9ybWFsaXplZCkpIHJldHVybiBudWxsO1xuXG4gICAgcmV0dXJuIG5vcm1hbGl6ZWQ7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGltcG9ydE1vZEZpbGUodHlwZTogXCJ0aGVtZVwiIHwgXCJwbHVnaW5cIik6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmIChpc0ltcG9ydGluZykgcmV0dXJuO1xuICAgIGlzSW1wb3J0aW5nID0gdHJ1ZTtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBGaWxlUGlja2VyLnBpY2tGaWxlcyh7IGxpbWl0OiAxIH0pO1xuICAgICAgICBjb25zdCBmaWxlID0gcmVzdWx0LmZpbGVzWzBdO1xuICAgICAgICBjb25zdCBmaWxlUGF0aCA9IChmaWxlIGFzIHsgcGF0aD86IHN0cmluZzsgdXJpPzogc3RyaW5nIH0gfCB1bmRlZmluZWQpPy5wYXRoXG4gICAgICAgICAgICA/PyAoZmlsZSBhcyB7IHBhdGg/OiBzdHJpbmc7IHVyaT86IHN0cmluZyB9IHwgdW5kZWZpbmVkKT8udXJpO1xuXG4gICAgICAgIGlmICghZmlsZT8ubmFtZSB8fCAhZmlsZVBhdGgpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNhZmVGaWxlTmFtZSA9IHNhbml0aXplSW1wb3J0ZWRNb2RGaWxlTmFtZShmaWxlLm5hbWUsIHR5cGUpO1xuICAgICAgICBjb25zdCBleHBlY3RlZEV4dGVuc2lvbiA9IHR5cGUgPT09IFwidGhlbWVcIiA/IEZJTEVfRVhURU5TSU9OUy5USEVNRSA6IEZJTEVfRVhURU5TSU9OUy5QTFVHSU47XG4gICAgICAgIGlmICghc2FmZUZpbGVOYW1lKSB7XG4gICAgICAgICAgICBhd2FpdCBIZWxwZXJzLnNob3dBbGVydChcbiAgICAgICAgICAgICAgICBcIndhcm5pbmdcIixcbiAgICAgICAgICAgICAgICBcIlVuc3VwcG9ydGVkIEZpbGVcIixcbiAgICAgICAgICAgICAgICBgUGxlYXNlIGNob29zZSBhIHZhbGlkICR7ZXhwZWN0ZWRFeHRlbnNpb259IGZpbGUgbmFtZS5gLFxuICAgICAgICAgICAgICAgIFtcIk9LXCJdXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY29udGVudCA9IGF3YWl0IFBsYXRmb3JtTWFuYWdlci5jdXJyZW50LnJlYWRGaWxlKGZpbGVQYXRoKTtcbiAgICAgICAgY29uc3QgZGVzdGluYXRpb25EaXJlY3RvcnkgPSB0eXBlID09PSBcInRoZW1lXCIgPyBwcm9wZXJ0aWVzLnRoZW1lc1BhdGggOiBwcm9wZXJ0aWVzLnBsdWdpbnNQYXRoO1xuICAgICAgICBhd2FpdCBQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC53cml0ZUZpbGUoam9pbihkZXN0aW5hdGlvbkRpcmVjdG9yeSwgc2FmZUZpbGVOYW1lKSwgY29udGVudCk7XG5cbiAgICAgICAgLy8gVXNlIGEgdGltZW91dCB0byBhdm9pZCBsb2NhdGlvbi5yZWxvYWQoKSB0cmlnZ2VyaW5nIGxvb3AgaXNzdWVzIHdpdGggQ2FwYWNpdG9yIEFjdGl2aXR5IFJlc3VsdHNcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiBsb2NhdGlvbi5yZWxvYWQoKSwgMTAwKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IGVyciBpbnN0YW5jZW9mIEVycm9yID8gZXJyLm1lc3NhZ2UgOiBTdHJpbmcoZXJyKTtcbiAgICAgICAgaWYgKC9jYW5jZWx8Y2FuY2VsZWR8Y2FuY2VsbGVkfG5vIGZpbGVzIHNlbGVjdGVkL2kudGVzdChtZXNzYWdlKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbG9nZ2VyLmVycm9yKGBGYWlsZWQgdG8gaW1wb3J0ICR7dHlwZX06ICR7bWVzc2FnZX1gKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgICAvLyBzbGlnaHQgZGVsYXkgYmVmb3JlIHVubG9ja2luZyB0byBhdm9pZCBkb3VibGUgY2xpY2sgZXZlbnRzIGFmdGVyIGZvY3VzIHJldHVybnNcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7IGlzSW1wb3J0aW5nID0gZmFsc2U7IH0sIDUwMCk7XG4gICAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBzeW5jUGxheWVyRmVhdHVyZXMoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKCFQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC5pc1BpY3R1cmVJblBpY3R1cmVTdXBwb3J0ZWQoKSkge1xuICAgICAgICByZW1vdmVQaWN0dXJlSW5QaWN0dXJlQnV0dG9uKCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIWxvY2F0aW9uLmhyZWYuaW5jbHVkZXMoUExBWUVSX1JPVVRFKSkge1xuICAgICAgICByZW1vdmVQaWN0dXJlSW5QaWN0dXJlQnV0dG9uKCk7XG4gICAgICAgIGF3YWl0IFBsYXRmb3JtTWFuYWdlci5jdXJyZW50LnNldFBpY3R1cmVJblBpY3R1cmVTdGF0ZShmYWxzZSk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB2aWRlbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJ2aWRlb1wiKSBhcyBIVE1MVmlkZW9FbGVtZW50IHwgbnVsbDtcbiAgICBpZiAoIXZpZGVvKSB7XG4gICAgICAgIHJlbW92ZVBpY3R1cmVJblBpY3R1cmVCdXR0b24oKTtcbiAgICAgICAgYXdhaXQgUGxhdGZvcm1NYW5hZ2VyLmN1cnJlbnQuc2V0UGljdHVyZUluUGljdHVyZVN0YXRlKGZhbHNlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGJpbmRQbGF5ZXJQaWN0dXJlSW5QaWN0dXJlKHZpZGVvKTtcbiAgICBpbmplY3RQaWN0dXJlSW5QaWN0dXJlQnV0dG9uKCk7XG4gICAgYXdhaXQgdXBkYXRlUGljdHVyZUluUGljdHVyZVN0YXRlKHZpZGVvKTtcbn1cblxuZnVuY3Rpb24gYmluZFBsYXllclBpY3R1cmVJblBpY3R1cmUodmlkZW86IEhUTUxWaWRlb0VsZW1lbnQpOiB2b2lkIHtcbiAgICBpZiAodmlkZW8uZGF0YXNldC5zdHJlbWlvRW5oYW5jZWRQaXBCb3VuZCA9PT0gXCJ0cnVlXCIpIHJldHVybjtcbiAgICB2aWRlby5kYXRhc2V0LnN0cmVtaW9FbmhhbmNlZFBpcEJvdW5kID0gXCJ0cnVlXCI7XG5cbiAgICBjb25zdCBzeW5jU3RhdGUgPSAoKSA9PiB7XG4gICAgICAgIHZvaWQgdXBkYXRlUGljdHVyZUluUGljdHVyZVN0YXRlKHZpZGVvKTtcbiAgICB9O1xuXG4gICAgW1wibG9hZGVkbWV0YWRhdGFcIiwgXCJwbGF5XCIsIFwicGF1c2VcIiwgXCJlbmRlZFwiLCBcImVtcHRpZWRcIiwgXCJyZXNpemVcIl0uZm9yRWFjaCgoZXZlbnROYW1lKSA9PiB7XG4gICAgICAgIHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBzeW5jU3RhdGUpO1xuICAgIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiB1cGRhdGVQaWN0dXJlSW5QaWN0dXJlU3RhdGUodmlkZW8/OiBIVE1MVmlkZW9FbGVtZW50KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKCFQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC5pc1BpY3R1cmVJblBpY3R1cmVTdXBwb3J0ZWQoKSkgcmV0dXJuO1xuXG4gICAgY29uc3QgY3VycmVudFZpZGVvID0gdmlkZW8gPz8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcInZpZGVvXCIpIGFzIEhUTUxWaWRlb0VsZW1lbnQgfCBudWxsO1xuICAgIGlmICghY3VycmVudFZpZGVvIHx8ICFsb2NhdGlvbi5ocmVmLmluY2x1ZGVzKFBMQVlFUl9ST1VURSkpIHtcbiAgICAgICAgYXdhaXQgUGxhdGZvcm1NYW5hZ2VyLmN1cnJlbnQuc2V0UGljdHVyZUluUGljdHVyZVN0YXRlKGZhbHNlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHdpZHRoID0gY3VycmVudFZpZGVvLnZpZGVvV2lkdGggfHwgMTY7XG4gICAgY29uc3QgaGVpZ2h0ID0gY3VycmVudFZpZGVvLnZpZGVvSGVpZ2h0IHx8IDk7XG4gICAgY29uc3QgaXNBY3RpdmVQbGF5YmFjayA9IGN1cnJlbnRWaWRlby5yZWFkeVN0YXRlID4gMCAmJiAhY3VycmVudFZpZGVvLnBhdXNlZCAmJiAhY3VycmVudFZpZGVvLmVuZGVkO1xuXG4gICAgYXdhaXQgUGxhdGZvcm1NYW5hZ2VyLmN1cnJlbnQuc2V0UGljdHVyZUluUGljdHVyZVN0YXRlKGlzQWN0aXZlUGxheWJhY2ssIHdpZHRoLCBoZWlnaHQpO1xufVxuXG5mdW5jdGlvbiBpbmplY3RQaWN0dXJlSW5QaWN0dXJlQnV0dG9uKCk6IHZvaWQge1xuICAgIGNvbnN0IGV4aXN0aW5nQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdHJlbWlvLWVuaGFuY2VkLXBpcC1idG5cIik7XG4gICAgaWYgKGV4aXN0aW5nQnV0dG9uKSByZXR1cm47XG5cbiAgICBjb25zdCBidXR0b25zQ29udGFpbmVyID0gZ2V0UGljdHVyZUluUGljdHVyZUJ1dHRvbkNvbnRhaW5lcigpO1xuICAgIGlmICghYnV0dG9uc0NvbnRhaW5lcikgcmV0dXJuO1xuXG4gICAgY29uc3QgdGVtcGxhdGVCdXR0b24gPSBidXR0b25zQ29udGFpbmVyLmZpcnN0RWxlbWVudENoaWxkIGFzIEhUTUxFbGVtZW50IHwgbnVsbDtcbiAgICBjb25zdCB0ZW1wbGF0ZUljb24gPSB0ZW1wbGF0ZUJ1dHRvbj8ucXVlcnlTZWxlY3RvcihcInN2Z1wiKTtcblxuICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgYnV0dG9uLmlkID0gXCJzdHJlbWlvLWVuaGFuY2VkLXBpcC1idG5cIjtcbiAgICBidXR0b24udHlwZSA9IFwiYnV0dG9uXCI7XG4gICAgYnV0dG9uLnRpdGxlID0gXCJQaWN0dXJlIGluIFBpY3R1cmVcIjtcbiAgICBidXR0b24uc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBcIlBpY3R1cmUgaW4gUGljdHVyZVwiKTtcbiAgICBidXR0b24uY2xhc3NOYW1lID0gYCR7dGVtcGxhdGVCdXR0b24/LmNsYXNzTmFtZSA/PyBcIlwifSBzdHJlbWlvLWVuaGFuY2VkLXBpcC1idXR0b25gLnRyaW0oKTtcbiAgICBidXR0b24uaW5uZXJIVE1MID0gYFxuICAgICAgICA8c3ZnIGNsYXNzPVwiJHt0ZW1wbGF0ZUljb24/LmdldEF0dHJpYnV0ZShcImNsYXNzXCIpID8/IFwiXCJ9XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiPlxuICAgICAgICAgICAgPHBhdGggZD1cIk0xOSA3SDV2MTBoMTRWN1ptMC0yYzEuMTEgMCAyIC44OSAyIDJ2MTBjMCAxLjExLS44OSAyLTIgMkg1Yy0xLjExIDAtMi0uODktMi0yVjdjMC0xLjExLjg5LTIgMi0yaDE0Wm0tMSA3aC02djRoNnYtNFpcIiBzdHlsZT1cImZpbGw6IGN1cnJlbnRDb2xvcjtcIj48L3BhdGg+XG4gICAgICAgIDwvc3ZnPlxuICAgIGA7XG4gICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRWaWRlbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJ2aWRlb1wiKSBhcyBIVE1MVmlkZW9FbGVtZW50IHwgbnVsbDtcbiAgICAgICAgY29uc3Qgc3VjY2VzcyA9IGF3YWl0IFBsYXRmb3JtTWFuYWdlci5jdXJyZW50LmVudGVyUGljdHVyZUluUGljdHVyZShcbiAgICAgICAgICAgIGN1cnJlbnRWaWRlbz8udmlkZW9XaWR0aCB8fCAxNixcbiAgICAgICAgICAgIGN1cnJlbnRWaWRlbz8udmlkZW9IZWlnaHQgfHwgOVxuICAgICAgICApO1xuXG4gICAgICAgIGlmICghc3VjY2Vzcykge1xuICAgICAgICAgICAgSGVscGVycy5jcmVhdGVUb2FzdChcbiAgICAgICAgICAgICAgICBcInBpcC11bmF2YWlsYWJsZVwiLFxuICAgICAgICAgICAgICAgIFwiUGljdHVyZSBpbiBQaWN0dXJlXCIsXG4gICAgICAgICAgICAgICAgXCJQaWN0dXJlIGluIFBpY3R1cmUgaXMgbm90IGF2YWlsYWJsZSBvbiB0aGlzIGRldmljZS5cIixcbiAgICAgICAgICAgICAgICBcImZhaWxcIlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgYnV0dG9uc0NvbnRhaW5lci5pbnNlcnRCZWZvcmUoYnV0dG9uLCBidXR0b25zQ29udGFpbmVyLmZpcnN0Q2hpbGQpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVQaWN0dXJlSW5QaWN0dXJlQnV0dG9uKCk6IHZvaWQge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RyZW1pby1lbmhhbmNlZC1waXAtYnRuXCIpPy5yZW1vdmUoKTtcbn1cblxuZnVuY3Rpb24gZ2V0UGljdHVyZUluUGljdHVyZUJ1dHRvbkNvbnRhaW5lcigpOiBIVE1MRWxlbWVudCB8IG51bGwge1xuICAgIGNvbnN0IGFsbENvbnRhaW5lcnMgPSBBcnJheS5mcm9tKFxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsPEhUTUxFbGVtZW50PignW2NsYXNzKj1cImhvcml6b250YWwtbmF2LWJhci1jb250YWluZXItXCJdIFtjbGFzcyo9XCJidXR0b25zLWNvbnRhaW5lci1cIl0nKVxuICAgICk7XG5cbiAgICByZXR1cm4gYWxsQ29udGFpbmVycy5hdCgtMSkgPz8gbnVsbDtcbn1cblxuYXN5bmMgZnVuY3Rpb24gYnJvd3NlTW9kcygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBzZXR0aW5nc0NvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFNFTEVDVE9SUy5TRVRUSU5HU19DT05URU5UKTtcbiAgICBpZiAoIXNldHRpbmdzQ29udGVudCkgcmV0dXJuO1xuXG4gICAgc2V0dGluZ3NDb250ZW50LmlubmVySFRNTCA9IGdldE1vZHNUYWJUZW1wbGF0ZSgpO1xuXG4gICAgY29uc3QgbW9kcyA9IGF3YWl0IE1vZE1hbmFnZXIuZmV0Y2hNb2RzKCk7XG4gICAgY29uc3QgbW9kc0xpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vZHMtbGlzdFwiKTtcbiAgICBpZiAoIW1vZHNMaXN0KSByZXR1cm47XG5cbiAgICBpbnRlcmZhY2UgUmVnaXN0cnlNb2Qge1xuICAgICAgICBuYW1lOiBzdHJpbmc7XG4gICAgICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gICAgICAgIGF1dGhvcjogc3RyaW5nO1xuICAgICAgICB2ZXJzaW9uOiBzdHJpbmc7XG4gICAgICAgIHByZXZpZXc/OiBzdHJpbmc7XG4gICAgICAgIGRvd25sb2FkOiBzdHJpbmc7XG4gICAgICAgIHJlcG86IHN0cmluZztcbiAgICB9XG5cbiAgICAvLyBBZGQgcGx1Z2luc1xuICAgIGZvciAoY29uc3QgcGx1Z2luIG9mIChtb2RzLnBsdWdpbnMgYXMgUmVnaXN0cnlNb2RbXSkpIHtcbiAgICAgICAgY29uc3QgaW5zdGFsbGVkID0gYXdhaXQgTW9kTWFuYWdlci5pc1BsdWdpbkluc3RhbGxlZChIZWxwZXJzLmdldEZpbGVOYW1lRnJvbVVybChwbHVnaW4uZG93bmxvYWQpKTtcbiAgICAgICAgbW9kc0xpc3QuaW5uZXJIVE1MICs9IGdldE1vZEl0ZW1UZW1wbGF0ZShwbHVnaW4sIFwiUGx1Z2luXCIsIGluc3RhbGxlZCk7XG4gICAgfVxuXG4gICAgLy8gQWRkIHRoZW1lc1xuICAgIGZvciAoY29uc3QgdGhlbWUgb2YgKG1vZHMudGhlbWVzIGFzIFJlZ2lzdHJ5TW9kW10pKSB7XG4gICAgICAgIGNvbnN0IGluc3RhbGxlZCA9IGF3YWl0IE1vZE1hbmFnZXIuaXNUaGVtZUluc3RhbGxlZChIZWxwZXJzLmdldEZpbGVOYW1lRnJvbVVybCh0aGVtZS5kb3dubG9hZCkpO1xuICAgICAgICBtb2RzTGlzdC5pbm5lckhUTUwgKz0gZ2V0TW9kSXRlbVRlbXBsYXRlKHRoZW1lLCBcIlRoZW1lXCIsIGluc3RhbGxlZCk7XG4gICAgfVxuXG4gICAgLy8gU2V0IHVwIGFjdGlvbiBidXR0b25zXG4gICAgY29uc3QgYWN0aW9uQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIubW9kQWN0aW9uQnRuXCIpO1xuICAgIGFjdGlvbkJ0bnMuZm9yRWFjaCgoYnRuKSA9PiB7XG4gICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbGluayA9IGJ0bi5nZXRBdHRyaWJ1dGUoXCJkYXRhLWxpbmtcIik7XG4gICAgICAgICAgICBjb25zdCB0eXBlID0gYnRuLmdldEF0dHJpYnV0ZShcImRhdGEtdHlwZVwiKT8udG9Mb3dlckNhc2UoKSBhcyBcInBsdWdpblwiIHwgXCJ0aGVtZVwiO1xuXG4gICAgICAgICAgICBpZiAoIWxpbmsgfHwgIXR5cGUpIHJldHVybjtcblxuICAgICAgICAgICAgaWYgKGJ0bi5nZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiKSA9PT0gXCJJbnN0YWxsXCIpIHtcbiAgICAgICAgICAgICAgICBNb2RNYW5hZ2VyLmRvd25sb2FkTW9kKGxpbmssIHR5cGUpO1xuICAgICAgICAgICAgICAgIGJ0bi5jbGFzc0xpc3QucmVtb3ZlKENMQVNTRVMuSU5TVEFMTF9CVVRUT04pO1xuICAgICAgICAgICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKENMQVNTRVMuVU5JTlNUQUxMX0JVVFRPTik7XG4gICAgICAgICAgICAgICAgYnRuLnNldEF0dHJpYnV0ZShcInRpdGxlXCIsIFwiVW5pbnN0YWxsXCIpO1xuICAgICAgICAgICAgICAgIGlmIChidG4uY2hpbGROb2Rlc1sxXSkge1xuICAgICAgICAgICAgICAgICAgICBidG4uY2hpbGROb2Rlc1sxXS50ZXh0Q29udGVudCA9IFwiVW5pbnN0YWxsXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBNb2RNYW5hZ2VyLnJlbW92ZU1vZChIZWxwZXJzLmdldEZpbGVOYW1lRnJvbVVybChsaW5rKSwgdHlwZSk7XG4gICAgICAgICAgICAgICAgYnRuLmNsYXNzTGlzdC5yZW1vdmUoQ0xBU1NFUy5VTklOU1RBTExfQlVUVE9OKTtcbiAgICAgICAgICAgICAgICBidG4uY2xhc3NMaXN0LmFkZChDTEFTU0VTLklOU1RBTExfQlVUVE9OKTtcbiAgICAgICAgICAgICAgICBidG4uc2V0QXR0cmlidXRlKFwidGl0bGVcIiwgXCJJbnN0YWxsXCIpO1xuICAgICAgICAgICAgICAgIGlmIChidG4uY2hpbGROb2Rlc1sxXSkge1xuICAgICAgICAgICAgICAgICAgICBidG4uY2hpbGROb2Rlc1sxXS50ZXh0Q29udGVudCA9IFwiSW5zdGFsbFwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyBTZWFyY2ggYmFyIGxvZ2ljXG4gICAgc2V0dXBTZWFyY2hCYXIoKTtcblxuICAgIC8vIEFkZCBiYWNrIGJ1dHRvblxuICAgIGNvbnN0IGhvcml6b250YWxOYXZzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChTRUxFQ1RPUlMuSE9SSVpPTlRBTF9OQVYpO1xuICAgIGNvbnN0IGhvcml6b250YWxOYXYgPSBob3Jpem9udGFsTmF2c1sxXTtcbiAgICBpZiAoaG9yaXpvbnRhbE5hdikge1xuICAgICAgICBob3Jpem9udGFsTmF2LmlubmVySFRNTCA9IGdldEJhY2tCdXR0b24oKTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJiYWNrLWJ0blwiKT8uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgIGxvY2F0aW9uLmhhc2ggPSAnIy8nO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgbG9jYXRpb24uaGFzaCA9ICcjL3NldHRpbmdzJztcbiAgICAgICAgICAgIH0sIDApO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHNldHVwU2VhcmNoQmFyKCk6IHZvaWQge1xuICAgIGNvbnN0IHNlYXJjaElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihTRUxFQ1RPUlMuU0VBUkNIX0lOUFVUKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICAgIGNvbnN0IGFkZG9uc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoU0VMRUNUT1JTLkFERE9OU19MSVNUX0NPTlRBSU5FUik7XG5cbiAgICBpZiAoIXNlYXJjaElucHV0IHx8ICFhZGRvbnNDb250YWluZXIpIHJldHVybjtcblxuICAgIHNlYXJjaElucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGZpbHRlciA9IHNlYXJjaElucHV0LnZhbHVlLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBjb25zdCBtb2RJdGVtcyA9IGFkZG9uc0NvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKFNFTEVDVE9SUy5BRERPTl9DT05UQUlORVIpO1xuXG4gICAgICAgIG1vZEl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoU0VMRUNUT1JTLk5BTUVfQ09OVEFJTkVSKT8udGV4dENvbnRlbnQ/LnRvTG93ZXJDYXNlKCkgfHwgXCJcIjtcbiAgICAgICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gaXRlbS5xdWVyeVNlbGVjdG9yKFNFTEVDVE9SUy5ERVNDUklQVElPTl9JVEVNKT8udGV4dENvbnRlbnQ/LnRvTG93ZXJDYXNlKCkgfHwgXCJcIjtcbiAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoU0VMRUNUT1JTLlRZUEVTX0NPTlRBSU5FUik/LnRleHRDb250ZW50Py50b0xvd2VyQ2FzZSgpIHx8IFwiXCI7XG5cbiAgICAgICAgICAgIGNvbnN0IG1hdGNoID0gbmFtZS5pbmNsdWRlcyhmaWx0ZXIpIHx8IGRlc2NyaXB0aW9uLmluY2x1ZGVzKGZpbHRlcikgfHwgdHlwZS5pbmNsdWRlcyhmaWx0ZXIpO1xuICAgICAgICAgICAgKGl0ZW0gYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmRpc3BsYXkgPSBtYXRjaCA/IFwiXCIgOiBcIm5vbmVcIjtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHNldHVwQnJvd3NlTW9kc0J1dHRvbigpOiB2b2lkIHtcbiAgICBiaW5kQnV0dG9uQ2xpY2soXCJicm93c2VQbHVnaW5zVGhlbWVzQnRuXCIsIGJyb3dzZU1vZHMsIFwiYnJvd3NlIG1vZHMgYnV0dG9uXCIpO1xufVxuXG5mdW5jdGlvbiB3cml0ZUFib3V0KCk6IHZvaWQge1xuICAgIEhlbHBlcnMud2FpdEZvckVsbShTRUxFQ1RPUlMuQUJPVVRfQ0FURUdPUlkpLnRoZW4oYXN5bmMgKCkgPT4ge1xuICAgICAgICBjb25zdCBhYm91dENhdGVnb3J5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihTRUxFQ1RPUlMuQUJPVVRfQ0FURUdPUlkpO1xuICAgICAgICBpZiAoYWJvdXRDYXRlZ29yeSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgICAgICBpZiAoIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RyZW1pby1lbmhhbmNlZC1hYm91dC1jb250ZW50XCIpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYWJvdXRDb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICBhYm91dENvbnRlbnQuaWQgPSBcInN0cmVtaW8tZW5oYW5jZWQtYWJvdXQtY29udGVudFwiO1xuICAgICAgICAgICAgICAgIGFib3V0Q29udGVudC5pbm5lckhUTUwgPSBnZXRBYm91dENhdGVnb3J5VGVtcGxhdGUoXG4gICAgICAgICAgICAgICAgICAgIFwiQW5kcm9pZC12MS4wLjBcIixcbiAgICAgICAgICAgICAgICAgICAgZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBmYWxzZVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgYWJvdXRDYXRlZ29yeS5hcHBlbmRDaGlsZChhYm91dENvbnRlbnQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBTZXR0aW5ncy5hZGRCdXR0b24oXCJPcGVuIExvZ3NcIiwgXCJvcGVuTG9nc0J0blwiLCBTRUxFQ1RPUlMuQUJPVVRfQ0FURUdPUlkpO1xuICAgICAgICAgICAgU2V0dGluZ3MuYWRkQnV0dG9uKFwiRXhwb3J0IExvZ3NcIiwgXCJleHBvcnRMb2dzQnRuXCIsIFNFTEVDVE9SUy5BQk9VVF9DQVRFR09SWSk7XG4gICAgICAgICAgICBTZXR0aW5ncy5hZGRCdXR0b24oXCJSZWxvYWQgU3RyZWFtaW5nIFNlcnZlclwiLCBcInJlbG9hZFN0cmVhbWluZ1NlcnZlckJ0blwiLCBTRUxFQ1RPUlMuQUJPVVRfQ0FURUdPUlkpO1xuICAgICAgICAgICAgU2V0dGluZ3MuYWRkQnV0dG9uKFwiT3BlbiBBcHAgRmlsZXNcIiwgXCJvcGVuRW5oYW5jZWRGb2xkZXJCdG5cIiwgU0VMRUNUT1JTLkFCT1VUX0NBVEVHT1JZKTtcblxuICAgICAgICAgICAgYmluZEJ1dHRvbkNsaWNrKFwib3BlbkxvZ3NCdG5cIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIExvZ01hbmFnZXIuc2hvd0xvZ3MoKTtcbiAgICAgICAgICAgIH0sIFwib3BlbiBsb2dzIGJ1dHRvblwiKTtcblxuICAgICAgICAgICAgYmluZEJ1dHRvbkNsaWNrKFwiZXhwb3J0TG9nc0J0blwiLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZXhwb3J0ZWRQYXRoID0gYXdhaXQgTG9nTWFuYWdlci5leHBvcnRMb2dzKCk7XG4gICAgICAgICAgICAgICAgaWYgKGV4cG9ydGVkUGF0aCkge1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC5vcGVuUGF0aChqb2luKHByb3BlcnRpZXMuZW5oYW5jZWRQYXRoLCBcImxvZ3NcIikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIFwiZXhwb3J0IGxvZ3MgYnV0dG9uXCIpO1xuXG4gICAgICAgICAgICBiaW5kQnV0dG9uQ2xpY2soXCJyZWxvYWRTdHJlYW1pbmdTZXJ2ZXJCdG5cIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGF3YWl0IGVuc3VyZUJ1bmRsZWRTdHJlYW1pbmdTZXJ2ZXJSZWFkeSgpO1xuICAgICAgICAgICAgICAgIHNjaGVkdWxlU3RyZWFtaW5nU2VydmVyUmVsb2FkKCk7XG4gICAgICAgICAgICB9LCBcInJlbG9hZCBzdHJlYW1pbmcgc2VydmVyIGJ1dHRvblwiKTtcblxuICAgICAgICAgICAgYmluZEJ1dHRvbkNsaWNrKFwib3BlbkVuaGFuY2VkRm9sZGVyQnRuXCIsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICBhd2FpdCBQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC5vcGVuUGF0aChwcm9wZXJ0aWVzLmVuaGFuY2VkUGF0aCk7XG4gICAgICAgICAgICB9LCBcIm9wZW4gZW5oYW5jZWQgZm9sZGVyIGJ1dHRvblwiKTtcbiAgICAgICAgfVxuICAgIH0pLmNhdGNoKGVyciA9PiBsb2dnZXIuZXJyb3IoXCJGYWlsZWQgdG8gd3JpdGUgYWJvdXQgc2VjdGlvbjogXCIgKyBlcnIpKTtcbn1cblxuZnVuY3Rpb24gZ2V0QWJvdXRJY29uKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgY2xhc3M9XCJpY29uXCI+XG4gICAgICAgIDxnPjxwYXRoIGZpbGw9XCJub25lXCIgZD1cIk0wIDBoMjR2MjRIMHpcIj48L3BhdGg+XG4gICAgICAgIDxwYXRoIGQ9XCJNMTIgMjJDNi40NzcgMjIgMiAxNy41MjMgMiAxMlM2LjQ3NyAyIDEyIDJzMTAgNC40NzcgMTAgMTAtNC40NzcgMTAtMTAgMTB6bS0xLTExdjZoMnYtNmgtMnptMC00djJoMlY3aC0yelwiIHN0eWxlPVwiZmlsbDpjdXJyZW50Y29sb3JcIj48L3BhdGg+PC9nPjwvc3ZnPmA7XG59XG5cbmZ1bmN0aW9uIGdldFRoZW1lSWNvbigpOiBzdHJpbmcge1xuICAgIHJldHVybiBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGNsYXNzPVwiaWNvblwiPlxuICAgICAgICA8Zz48cGF0aCBmaWxsPVwibm9uZVwiIGQ9XCJNMCAwaDI0djI0SDB6XCI+PC9wYXRoPlxuICAgICAgICA8cGF0aCBkPVwiTTQgM2gxNmExIDEgMCAwIDEgMSAxdjVhMSAxIDAgMCAxLTEgMUg0YTEgMSAwIDAgMS0xLTFWNGExIDEgMCAwIDEgMS0xem0yIDloNmExIDEgMCAwIDEgMSAxdjNoMXY2aC00di02aDF2LTJINWExIDEgMCAwIDEtMS0xdi0yaDJ2MXptMTEuNzMyIDEuNzMybDEuNzY4LTEuNzY4IDEuNzY4IDEuNzY4YTIuNSAyLjUgMCAxIDEtMy41MzYgMHpcIiBzdHlsZT1cImZpbGw6IGN1cnJlbnRjb2xvcjtcIj48L3BhdGg+PC9nPjwvc3ZnPmA7XG59XG5cbmZ1bmN0aW9uIGdldFBsdWdpbkljb24oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYDxzdmcgaWNvbj1cImFkZG9ucy1vdXRsaW5lXCIgY2xhc3M9XCJpY29uXCIgdmlld0JveD1cIjAgMCA1MTIgNTEyXCIgc3R5bGU9XCJmaWxsOiBjdXJyZW50Y29sb3I7XCI+XG4gICAgICAgIDxwYXRoIGQ9XCJNNDEzLjcgMjQ2LjFIMzg2Yy0wLjUzLTAuMDEtMS4wMy0wLjIzLTEuNC0wLjYtMC4zNy0wLjM3LTAuNTktMC44Ny0wLjYtMS40di03Ny4yYTM4Ljk0IDM4Ljk0IDAgMCAwLTExLjQtMjcuNSAzOC45NCAzOC45NCAwIDAgMC0yNy41LTExLjRoLTc3LjJjLTAuNTMtMC4wMS0xLjAzLTAuMjMtMS40LTAuNi0wLjM3LTAuMzctMC41OS0wLjg3LTAuNi0xLjR2LTI3LjdjMC0yNy4xLTIxLjUtNDkuOS00OC42LTUwLjMtNi41Ny0wLjEtMTMuMDkgMS4wOS0xOS4yIDMuNWE0OS42MTYgNDkuNjE2IDAgMCAwLTE2LjQgMTAuNyA0OS44MjMgNDkuODIzIDAgMCAwLTExIDE2LjIgNDguODk0IDQ4Ljg5NCAwIDAgMC0zLjkgMTkuMnYyOC41Yy0wLjAxIDAuNTMtMC4yMyAxLjAzLTAuNiAxLjQtMC4zNyAwLjM3LTAuODcgMC41OS0xLjQgMC42aC03Ny4yYy0xMC41IDAtMjAuNTcgNC4xNy0yOCAxMS42YTM5LjU5NCAzOS41OTQgMCAwIDAtMTEuNiAyOHY3MC40YzAuMDEgMC41MyAwLjIzIDEuMDMgMC42IDEuNCAwLjM3IDAuMzcgMC44NyAwLjU5IDEuNCAwLjZoMjYuOWMyOS40IDAgNTMuNyAyNS41IDU0LjEgNTQuOCAwLjQgMjkuOS0yMy41IDU3LjItNTMuMyA1Ny4ySDUwYy0wLjUzIDAuMDEtMS4wMyAwLjIzLTEuNCAwLjYtMC4zNyAwLjM3LTAuNTkgMC44Ny0wLjYgMS40djcwLjRjMCAxMC41IDQuMTcgMjAuNTcgMTEuNiAyOHMxNy41IDExLjYgMjggMTEuNmg3MC40YzAuNTMtMC4wMSAxLjAzLTAuMjMgMS40LTAuNiAwLjM3LTAuMzcgMC41OS0wLjg3IDAuNi0xLjRWNDQxLjJjMC0zMC4zIDI0LjgtNTYuNCA1NS01Ny4xIDMwLjEtMC43IDU3IDIwLjMgNTcgNTAuM3YyNy43YzAuMDEgMC41MyAwLjIzIDEuMDMgMC42IDEuNCAwLjM3IDAuMzcgMC44NyAwLjU5IDEuNCAwLjZoNzEuMWEzOC45NCAzOC45NCAwIDAgMCAyNy41LTExLjQgMzguOTU4IDM4Ljk1OCAwIDAgMCAxMS40LTI3LjV2LTc4YzAuMDEtMC41MyAwLjIzLTEuMDMgMC42LTEuNCAwLjM3LTAuMzcgMC44Ny0wLjU5IDEuNC0wLjZoMjguNWMyNy42IDAgNDkuNS0yMi43IDQ5LjUtNTAuNHMtMjMuMi00OC43LTUwLjMtNDguN1pcIiBzdHlsZT1cInN0cm9rZTpjdXJyZW50Y29sb3I7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS13aWR0aDozMjtmaWxsOiBjdXJyZW50Q29sb3I7XCI+PC9wYXRoPjwvc3ZnPmA7XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBQbHVnaW5MaXN0ZW5lckhhbmRsZSB9IGZyb20gJ0BjYXBhY2l0b3IvY29yZSc7XG5pbXBvcnQgeyBDYXBhY2l0b3IgfSBmcm9tICdAY2FwYWNpdG9yL2NvcmUnO1xuXG5pbXBvcnQgdHlwZSB7IENoYW5uZWxQYXlsb2FkRGF0YSwgQ2hhbm5lbENhbGxiYWNrRGF0YSwgQ2hhbm5lbExpc3RlbmVyQ2FsbGJhY2ssIFN0YXJ0T3B0aW9ucyB9IGZyb20gJy4vZGVmaW5pdGlvbnMnO1xuaW1wb3J0IHsgQ2FwYWNpdG9yTm9kZUpTIH0gZnJvbSAnLi9pbXBsZW1lbnRhdGlvbic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTm9kZUpTSW50ZXJmYWNlIHtcbiAgLyoqXG4gICAqIFN0YXJ0cyB0aGUgTm9kZS5qcyBlbmdpbmUgd2l0aCBwcm9wZXJ0aWVzIGFzIHNldCBieSB0aGUgYG9wdGlvbnNgLlxuICAgKlxuICAgKiAqKk5vdGU6KiogVGhpcyBtZXRob2QgaXMgb25seSBhdmFpbGFibGUgaWYgdGhlIE5vZGUuanMgZW5naW5lIHN0YXJ0dXAgbW9kZSB3YXMgc2V0IHRvIGAnbWFudWFsJ2AgdmlhIHRoZSBwbHVnaW4gY29uZmlndXJhdGlvbi5cbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICBzdGFydChvcHRpb25zPzogU3RhcnRPcHRpb25zKTogUHJvbWlzZTx2b2lkPjtcblxuICAvKipcbiAgICogU2VuZHMgYSBtZXNzYWdlIHRvIHRoZSBOb2RlLmpzIHByb2Nlc3MuXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgc2VuZChhcmdzOiBDaGFubmVsUGF5bG9hZERhdGEpOiBQcm9taXNlPHZvaWQ+O1xuXG4gIC8qKlxuICAgKiBSZXNvbHZlcyB3aGVuIHRoZSBOb2RlLmpzIHByb2Nlc3MgaXMgaW5pdGlhbGl6ZWQuXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgd2hlblJlYWR5KCk6IFByb21pc2U8dm9pZD47XG5cbiAgLyoqXG4gICAqIExpc3RlbnMgdG8gYGV2ZW50TmFtZWAgYW5kIGNhbGxzIGBsaXN0ZW5lckZ1bmMoZGF0YSlgIHdoZW4gYSBuZXcgbWVzc2FnZSBhcnJpdmVzIGZyb20gdGhlIE5vZGUuanMgcHJvY2Vzcy5cbiAgICpcbiAgICogKipOb3RlOioqIFdoZW4gdXNpbmcgdGhlIEVsZWN0cm9uIHBsYXRmb3JtLCBbYFBsdWdpbkxpc3RlbmVySGFuZGxlLnJlbW92ZSgpYF0oI3BsdWdpbmxpc3RlbmVyaGFuZGxlKSBkb2VzIG5vdCB3b3JrIGR1ZSB0byBsaW1pdGF0aW9ucy5cbiAgICogVXNlIFtgcmVtb3ZlTGlzdGVuZXIobGlzdGVuZXJGdW5jKWBdKCNyZW1vdmVsaXN0ZW5lcikgaW5zdGVhZC5cbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICBhZGRMaXN0ZW5lcihcbiAgICBldmVudE5hbWU6IHN0cmluZyxcbiAgICBsaXN0ZW5lckZ1bmM6IENoYW5uZWxMaXN0ZW5lckNhbGxiYWNrLFxuICApOiBQcm9taXNlPFBsdWdpbkxpc3RlbmVySGFuZGxlPjtcblxuICAvKipcbiAgICogUmVtb3ZlcyB0aGUgc3BlY2lmaWVkIGBsaXN0ZW5lckhhbmRsZWAgZnJvbSB0aGUgbGlzdGVuZXIgYXJyYXkgZm9yIHRoZSBldmVudCBpdCByZWZlcnMgdG8uXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgcmVtb3ZlTGlzdGVuZXIobGlzdGVuZXJIYW5kbGU6IFBsdWdpbkxpc3RlbmVySGFuZGxlKTogUHJvbWlzZTx2b2lkPjtcblxuICAvKipcbiAgICogUmVtb3ZlcyBhbGwgbGlzdGVuZXJzLCBvciB0aG9zZSBvZiB0aGUgc3BlY2lmaWVkIGBldmVudE5hbWVgLCBmb3IgdGhpcyBwbHVnaW4uXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgcmVtb3ZlQWxsTGlzdGVuZXJzKGV2ZW50TmFtZT86IHN0cmluZyk6IFByb21pc2U8dm9pZD47XG59XG5cbmNsYXNzIE5vZGVKU1BsdWdpbiBpbXBsZW1lbnRzIE5vZGVKU0ludGVyZmFjZSB7XG4gIHByaXZhdGUgcmVhZG9ubHkgbGlzdGVuZXJMaXN0OiB7XG4gICAgZXZlbnROYW1lOiBzdHJpbmc7XG4gICAgbGlzdGVuZXJIYW5kbGU6IFByb21pc2U8UGx1Z2luTGlzdGVuZXJIYW5kbGU+O1xuICB9W10gPSBbXTtcblxuICBzdGFydChhcmdzPzogU3RhcnRPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIENhcGFjaXRvck5vZGVKUy5zdGFydChhcmdzKTtcbiAgfVxuXG4gIHNlbmQoYXJnczogQ2hhbm5lbFBheWxvYWREYXRhKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIENhcGFjaXRvck5vZGVKUy5zZW5kKGFyZ3MpO1xuICB9XG5cbiAgd2hlblJlYWR5KCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiBDYXBhY2l0b3JOb2RlSlMud2hlblJlYWR5KCk7XG4gIH1cblxuICBhZGRMaXN0ZW5lcihcbiAgICBldmVudE5hbWU6IHN0cmluZyxcbiAgICBsaXN0ZW5lckZ1bmM6IENoYW5uZWxMaXN0ZW5lckNhbGxiYWNrLFxuICApOiBQcm9taXNlPFBsdWdpbkxpc3RlbmVySGFuZGxlPjtcblxuICBhZGRMaXN0ZW5lcihcbiAgICBldmVudE5hbWU6IGFueSxcbiAgICBsaXN0ZW5lckZ1bmM6IENoYW5uZWxMaXN0ZW5lckNhbGxiYWNrLFxuICApOiBQcm9taXNlPFBsdWdpbkxpc3RlbmVySGFuZGxlPiB7XG4gICAgY29uc3QgbGlzdGVuZXJIYW5kbGUgPSBDYXBhY2l0b3JOb2RlSlMuYWRkTGlzdGVuZXIoZXZlbnROYW1lLCAoZGF0YTogQ2hhbm5lbENhbGxiYWNrRGF0YSkgPT4ge1xuICAgICAgbGlzdGVuZXJGdW5jKGRhdGEpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5saXN0ZW5lckxpc3QucHVzaCh7IGV2ZW50TmFtZSwgbGlzdGVuZXJIYW5kbGUgfSk7XG4gICAgcmV0dXJuIGxpc3RlbmVySGFuZGxlO1xuICB9XG5cbiAgYXN5bmMgcmVtb3ZlTGlzdGVuZXIobGlzdGVuZXJIYW5kbGU6IFBsdWdpbkxpc3RlbmVySGFuZGxlKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKENhcGFjaXRvci5nZXRQbGF0Zm9ybSgpID09PSAnZWxlY3Ryb24nKSB7XG4gICAgICBhd2FpdCAoQ2FwYWNpdG9yTm9kZUpTIGFzIGFueSkucmVtb3ZlTGlzdGVuZXIobGlzdGVuZXJIYW5kbGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhd2FpdCBsaXN0ZW5lckhhbmRsZS5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5saXN0ZW5lckxpc3QubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICBjb25zdCBsaXN0ZW5lciA9IHRoaXMubGlzdGVuZXJMaXN0W2luZGV4XTtcblxuICAgICAgaWYgKGxpc3RlbmVySGFuZGxlID09PSAoYXdhaXQgbGlzdGVuZXIubGlzdGVuZXJIYW5kbGUpKSB7XG4gICAgICAgIHRoaXMubGlzdGVuZXJMaXN0LnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHJlbW92ZUFsbExpc3RlbmVycyhldmVudE5hbWU/OiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBmb3IgKGNvbnN0IGxpc3RlbmVyIG9mIFsuLi50aGlzLmxpc3RlbmVyTGlzdF0pIHtcbiAgICAgIGlmICghZXZlbnROYW1lIHx8IGV2ZW50TmFtZSA9PT0gbGlzdGVuZXIuZXZlbnROYW1lKSB7XG4gICAgICAgIGNvbnN0IGxpc3RlbmVySGFuZGxlID0gYXdhaXQgbGlzdGVuZXIubGlzdGVuZXJIYW5kbGU7XG4gICAgICAgIGF3YWl0IHRoaXMucmVtb3ZlTGlzdGVuZXIobGlzdGVuZXJIYW5kbGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5jb25zdCBOb2RlSlMgPSBuZXcgTm9kZUpTUGx1Z2luKCk7XG5cbmV4cG9ydCB7IE5vZGVKUyB9O1xuIiwgImltcG9ydCB0eXBlIHsgUGx1Z2luTGlzdGVuZXJIYW5kbGUgfSBmcm9tICdAY2FwYWNpdG9yL2NvcmUnO1xuaW1wb3J0IHsgcmVnaXN0ZXJQbHVnaW4gfSBmcm9tICdAY2FwYWNpdG9yL2NvcmUnO1xuXG5pbXBvcnQgdHlwZSB7IENoYW5uZWxQYXlsb2FkRGF0YSwgQ2hhbm5lbExpc3RlbmVyQ2FsbGJhY2ssIFN0YXJ0T3B0aW9ucyB9IGZyb20gJy4vZGVmaW5pdGlvbnMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIENhcGFjaXRvck5vZGVKU1BsdWdpbiB7XG4gIHN0YXJ0KGFyZ3M/OiBTdGFydE9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+O1xuICBzZW5kKGFyZ3M6IENoYW5uZWxQYXlsb2FkRGF0YSk6IFByb21pc2U8dm9pZD47XG4gIHdoZW5SZWFkeSgpOiBQcm9taXNlPHZvaWQ+O1xuXG4gIGFkZExpc3RlbmVyKFxuICAgIGV2ZW50TmFtZTogc3RyaW5nLFxuICAgIGxpc3RlbmVyRnVuYzogQ2hhbm5lbExpc3RlbmVyQ2FsbGJhY2ssXG4gICk6IFByb21pc2U8UGx1Z2luTGlzdGVuZXJIYW5kbGU+O1xufVxuXG5jb25zdCBDYXBhY2l0b3JOb2RlSlMgPSByZWdpc3RlclBsdWdpbjxDYXBhY2l0b3JOb2RlSlNQbHVnaW4+KCdDYXBhY2l0b3JOb2RlSlMnLCB7XG4gIHdlYjogKCkgPT4gaW1wb3J0KCcuL3dlYicpLnRoZW4oKG0pID0+IG5ldyBtLkNhcGFjaXRvck5vZGVKU1dlYigpKSxcbiAgZWxlY3Ryb246ICgpID0+ICh3aW5kb3cgYXMgYW55KS5DYXBhY2l0b3JDdXN0b21QbGF0Zm9ybS5wbHVnaW5zLkNhcGFjaXRvck5vZGVKUyxcbn0pO1xuXG5leHBvcnQgeyBDYXBhY2l0b3JOb2RlSlMgfTtcbiIsICJpbXBvcnQgeyBqb2luIH0gZnJvbSBcInBhdGhcIjtcbmltcG9ydCB7IFBsYXRmb3JtTWFuYWdlciB9IGZyb20gXCIuLi9wbGF0Zm9ybS9QbGF0Zm9ybU1hbmFnZXJcIjtcbmltcG9ydCBwcm9wZXJ0aWVzIGZyb20gXCIuL1Byb3BlcnRpZXNcIjtcblxuZXhwb3J0IHR5cGUgTG9nTGV2ZWwgPSAnSU5GTycgfCAnV0FSTicgfCAnRVJST1InIHwgJ0RFQlVHJztcblxuaW50ZXJmYWNlIExvZ0VudHJ5IHtcbiAgICB0aW1lc3RhbXA6IHN0cmluZztcbiAgICBsZXZlbDogTG9nTGV2ZWw7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xufVxuXG5jbGFzcyBMb2dNYW5hZ2VyIHtcbiAgICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogTG9nTWFuYWdlcjtcbiAgICBwcml2YXRlIGxvZ3M6IExvZ0VudHJ5W10gPSBbXTtcbiAgICBwcml2YXRlIG1heExvZ3MgPSAxMDAwO1xuICAgIHByaXZhdGUgb3JpZ2luYWxDb25zb2xlOiBhbnkgPSB7fTtcbiAgICBwcml2YXRlIGlzSG9va2VkID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge31cblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogTG9nTWFuYWdlciB7XG4gICAgICAgIGlmICghTG9nTWFuYWdlci5pbnN0YW5jZSkge1xuICAgICAgICAgICAgTG9nTWFuYWdlci5pbnN0YW5jZSA9IG5ldyBMb2dNYW5hZ2VyKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIExvZ01hbmFnZXIuaW5zdGFuY2U7XG4gICAgfVxuXG4gICAgcHVibGljIGhvb2tDb25zb2xlKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5pc0hvb2tlZCkgcmV0dXJuO1xuICAgICAgICB0aGlzLmlzSG9va2VkID0gdHJ1ZTtcblxuICAgICAgICBjb25zdCBtZXRob2RzOiBMb2dMZXZlbFtdID0gWydJTkZPJywgJ1dBUk4nLCAnRVJST1InLCAnREVCVUcnXTtcblxuICAgICAgICBtZXRob2RzLmZvckVhY2gobGV2ZWwgPT4ge1xuICAgICAgICAgICAgY29uc3QgY29uc29sZU1ldGhvZCA9IGxldmVsLnRvTG93ZXJDYXNlKCkgYXMga2V5b2YgQ29uc29sZTtcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgICAgICB0aGlzLm9yaWdpbmFsQ29uc29sZVtjb25zb2xlTWV0aG9kXSA9IChjb25zb2xlIGFzIGFueSlbY29uc29sZU1ldGhvZF0uYmluZChjb25zb2xlKTtcblxuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgICAgIChjb25zb2xlIGFzIGFueSlbY29uc29sZU1ldGhvZF0gPSAoLi4uYXJnczogYW55W10pID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZExvZyhsZXZlbCwgYXJncy5tYXAoYXJnID0+XG4gICAgICAgICAgICAgICAgICAgIHR5cGVvZiBhcmcgPT09ICdvYmplY3QnID8gSlNPTi5zdHJpbmdpZnkoYXJnKSA6IFN0cmluZyhhcmcpXG4gICAgICAgICAgICAgICAgKS5qb2luKCcgJykpO1xuXG4gICAgICAgICAgICAgICAgLy8gQ2FsbCBvcmlnaW5hbFxuICAgICAgICAgICAgICAgIHRoaXMub3JpZ2luYWxDb25zb2xlW2NvbnNvbGVNZXRob2RdKC4uLmFyZ3MpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gSG9vayBsb2cgYXMgSU5GT1xuICAgICAgICB0aGlzLm9yaWdpbmFsQ29uc29sZVsnbG9nJ10gPSBjb25zb2xlLmxvZy5iaW5kKGNvbnNvbGUpO1xuICAgICAgICBjb25zb2xlLmxvZyA9ICguLi5hcmdzOiBhbnlbXSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5hZGRMb2coJ0lORk8nLCBhcmdzLm1hcChhcmcgPT5cbiAgICAgICAgICAgICAgICB0eXBlb2YgYXJnID09PSAnb2JqZWN0JyA/IEpTT04uc3RyaW5naWZ5KGFyZykgOiBTdHJpbmcoYXJnKVxuICAgICAgICAgICAgKS5qb2luKCcgJykpO1xuICAgICAgICAgICAgdGhpcy5vcmlnaW5hbENvbnNvbGVbJ2xvZyddKC4uLmFyZ3MpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGFkZExvZyhsZXZlbDogTG9nTGV2ZWwsIG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBjb25zdCB0aW1lc3RhbXAgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVsxXS5zbGljZSgwLCAtMSk7XG4gICAgICAgIHRoaXMubG9ncy5wdXNoKHsgdGltZXN0YW1wLCBsZXZlbCwgbWVzc2FnZSB9KTtcbiAgICAgICAgaWYgKHRoaXMubG9ncy5sZW5ndGggPiB0aGlzLm1heExvZ3MpIHtcbiAgICAgICAgICAgIHRoaXMubG9ncy5zaGlmdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIGV4cG9ydExvZ3MoKTogUHJvbWlzZTxzdHJpbmcgfCBudWxsPiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBsb2dzRGlyID0gam9pbihwcm9wZXJ0aWVzLmVuaGFuY2VkUGF0aCwgXCJsb2dzXCIpO1xuICAgICAgICAgICAgaWYgKCFhd2FpdCBQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC5leGlzdHMobG9nc0RpcikpIHtcbiAgICAgICAgICAgICAgICBhd2FpdCBQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC5ta2Rpcihsb2dzRGlyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgZmlsZU5hbWUgPSBgc3RyZW1pby1lbmhhbmNlZC0ke25ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5yZXBsYWNlKC9bOi5dL2csIFwiLVwiKX0ubG9nYDtcbiAgICAgICAgICAgIGNvbnN0IGZpbGVQYXRoID0gam9pbihsb2dzRGlyLCBmaWxlTmFtZSk7XG4gICAgICAgICAgICBhd2FpdCBQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC53cml0ZUZpbGUoZmlsZVBhdGgsIHRoaXMuc2VyaWFsaXplTG9ncygpKTtcbiAgICAgICAgICAgIHJldHVybiBmaWxlUGF0aDtcbiAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzaG93TG9ncygpOiB2b2lkIHtcbiAgICAgICAgY29uc3Qgb3ZlcmxheUlkID0gJ3N0cmVtaW8tZW5oYW5jZWQtbG9ncy1vdmVybGF5JztcbiAgICAgICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKG92ZXJsYXlJZCkpIHJldHVybjtcblxuICAgICAgICBjb25zdCBvdmVybGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIG92ZXJsYXkuaWQgPSBvdmVybGF5SWQ7XG4gICAgICAgIG92ZXJsYXkuc3R5bGUuY3NzVGV4dCA9IGBcbiAgICAgICAgICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICAgICAgICAgIHRvcDogMDtcbiAgICAgICAgICAgIGxlZnQ6IDA7XG4gICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC44KTtcbiAgICAgICAgICAgIHotaW5kZXg6IDk5OTk5O1xuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgICAgICBwYWRkaW5nOiAyMHB4O1xuICAgICAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgICAgIGNvbG9yOiAjZmZmO1xuICAgICAgICAgICAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZTtcbiAgICAgICAgYDtcblxuICAgICAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgaGVhZGVyLnN0eWxlLmNzc1RleHQgPSBgXG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAjMWExYTFhO1xuICAgICAgICAgICAgcGFkZGluZzogMTBweDtcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgICAgICAgYDtcblxuICAgICAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XG4gICAgICAgIHRpdGxlLnRleHRDb250ZW50ID0gJ0xvZ3MnO1xuICAgICAgICB0aXRsZS5zdHlsZS5tYXJnaW4gPSAnMCc7XG5cbiAgICAgICAgY29uc3QgY29udHJvbHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29udHJvbHMuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgICAgICAgY29udHJvbHMuc3R5bGUuZ2FwID0gJzEwcHgnO1xuXG4gICAgICAgIGNvbnN0IGZpbHRlclNlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlbGVjdCcpO1xuICAgICAgICBmaWx0ZXJTZWxlY3Quc3R5bGUuY3NzVGV4dCA9IGBcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICMzMzM7XG4gICAgICAgICAgICBjb2xvcjogd2hpdGU7XG4gICAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjNTU1O1xuICAgICAgICAgICAgcGFkZGluZzogNXB4O1xuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogM3B4O1xuICAgICAgICBgO1xuICAgICAgICBbJ0FMTCcsICdJTkZPJywgJ1dBUk4nLCAnRVJST1InXS5mb3JFYWNoKGxldmVsID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuICAgICAgICAgICAgb3B0aW9uLnZhbHVlID0gbGV2ZWw7XG4gICAgICAgICAgICBvcHRpb24udGV4dENvbnRlbnQgPSBsZXZlbDtcbiAgICAgICAgICAgIGZpbHRlclNlbGVjdC5hcHBlbmRDaGlsZChvcHRpb24pO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBjb3B5QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIGNvcHlCdG4udGV4dENvbnRlbnQgPSAnQ29weSBBbGwnO1xuICAgICAgICBjb3B5QnRuLnN0eWxlLmNzc1RleHQgPSBgXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAjNGE0YTRhO1xuICAgICAgICAgICAgY29sb3I6IHdoaXRlO1xuICAgICAgICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgICAgICAgcGFkZGluZzogNXB4IDEwcHg7XG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiAzcHg7XG4gICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgIGA7XG5cbiAgICAgICAgY29uc3QgZXhwb3J0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIGV4cG9ydEJ0bi50ZXh0Q29udGVudCA9ICdFeHBvcnQnO1xuICAgICAgICBleHBvcnRCdG4uc3R5bGUuY3NzVGV4dCA9IGBcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICMyNTYzZWI7XG4gICAgICAgICAgICBjb2xvcjogd2hpdGU7XG4gICAgICAgICAgICBib3JkZXI6IG5vbmU7XG4gICAgICAgICAgICBwYWRkaW5nOiA1cHggMTBweDtcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDNweDtcbiAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgYDtcblxuICAgICAgICBjb25zdCBjbG9zZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBjbG9zZUJ0bi50ZXh0Q29udGVudCA9ICdDbG9zZSc7XG4gICAgICAgIGNsb3NlQnRuLnN0eWxlLmNzc1RleHQgPSBgXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAjYzAzOTJiO1xuICAgICAgICAgICAgY29sb3I6IHdoaXRlO1xuICAgICAgICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgICAgICAgcGFkZGluZzogNXB4IDEwcHg7XG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiAzcHg7XG4gICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgIGA7XG5cbiAgICAgICAgY29udHJvbHMuYXBwZW5kQ2hpbGQoZmlsdGVyU2VsZWN0KTtcbiAgICAgICAgY29udHJvbHMuYXBwZW5kQ2hpbGQoY29weUJ0bik7XG4gICAgICAgIGNvbnRyb2xzLmFwcGVuZENoaWxkKGV4cG9ydEJ0bik7XG4gICAgICAgIGNvbnRyb2xzLmFwcGVuZENoaWxkKGNsb3NlQnRuKTtcbiAgICAgICAgaGVhZGVyLmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgICAgICAgaGVhZGVyLmFwcGVuZENoaWxkKGNvbnRyb2xzKTtcblxuICAgICAgICBjb25zdCBsb2dzQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxvZ3NDb250YWluZXIuaWQgPSAnbG9ncy1jb250YWluZXInO1xuICAgICAgICBsb2dzQ29udGFpbmVyLnN0eWxlLmNzc1RleHQgPSBgXG4gICAgICAgICAgICBmbGV4OiAxO1xuICAgICAgICAgICAgb3ZlcmZsb3cteTogYXV0bztcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICMxMTE7XG4gICAgICAgICAgICBwYWRkaW5nOiAxMHB4O1xuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogNXB4O1xuICAgICAgICAgICAgd2hpdGUtc3BhY2U6IHByZS13cmFwO1xuICAgICAgICAgICAgd29yZC1icmVhazogYnJlYWstYWxsO1xuICAgICAgICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgICAgICBgO1xuXG4gICAgICAgIG92ZXJsYXkuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcbiAgICAgICAgb3ZlcmxheS5hcHBlbmRDaGlsZChsb2dzQ29udGFpbmVyKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChvdmVybGF5KTtcblxuICAgICAgICBjb25zdCByZW5kZXJMb2dzID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmlsdGVyID0gZmlsdGVyU2VsZWN0LnZhbHVlO1xuICAgICAgICAgICAgY29uc3QgZmlsdGVyZWRMb2dzID0gZmlsdGVyID09PSAnQUxMJ1xuICAgICAgICAgICAgICAgID8gdGhpcy5sb2dzXG4gICAgICAgICAgICAgICAgOiB0aGlzLmxvZ3MuZmlsdGVyKGwgPT4gbC5sZXZlbCA9PT0gZmlsdGVyKTtcblxuICAgICAgICAgICAgbG9nc0NvbnRhaW5lci5pbm5lckhUTUwgPSBmaWx0ZXJlZExvZ3MubWFwKGwgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbG9yID0gbC5sZXZlbCA9PT0gJ0VSUk9SJyA/ICcjZmY1NTU1JyA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsLmxldmVsID09PSAnV0FSTicgPyAnI2ZmYjg2YycgOiAnIzUwZmE3Yic7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGA8ZGl2IHN0eWxlPVwibWFyZ2luLWJvdHRvbTogMnB4O1wiPjxzcGFuIHN0eWxlPVwiY29sb3I6ICM2MjcyYTRcIj5bJHtsLnRpbWVzdGFtcH1dPC9zcGFuPiA8c3BhbiBzdHlsZT1cImNvbG9yOiAke2NvbG9yfVwiPlske2wubGV2ZWx9XTwvc3Bhbj4gJHt0aGlzLmVzY2FwZUh0bWwobC5tZXNzYWdlKX08L2Rpdj5gO1xuICAgICAgICAgICAgfSkuam9pbignJyk7XG4gICAgICAgICAgICBsb2dzQ29udGFpbmVyLnNjcm9sbFRvcCA9IGxvZ3NDb250YWluZXIuc2Nyb2xsSGVpZ2h0O1xuICAgICAgICB9O1xuXG4gICAgICAgIHJlbmRlckxvZ3MoKTtcblxuICAgICAgICBmaWx0ZXJTZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgcmVuZGVyTG9ncyk7XG5cbiAgICAgICAgY29weUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRleHQgPSB0aGlzLnNlcmlhbGl6ZUxvZ3MoKTtcbiAgICAgICAgICAgIGNvbnN0IHRleHRBcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRleHRhcmVhXCIpO1xuICAgICAgICAgICAgdGV4dEFyZWEudmFsdWUgPSB0ZXh0O1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0ZXh0QXJlYSk7XG4gICAgICAgICAgICB0ZXh0QXJlYS5zZWxlY3QoKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKFwiQ29weVwiKTtcbiAgICAgICAgICAgIHRleHRBcmVhLnJlbW92ZSgpO1xuXG4gICAgICAgICAgICBjb25zdCBvcmlnaW5hbFRleHQgPSBjb3B5QnRuLnRleHRDb250ZW50O1xuICAgICAgICAgICAgY29weUJ0bi50ZXh0Q29udGVudCA9ICdDb3BpZWQhJztcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gY29weUJ0bi50ZXh0Q29udGVudCA9IG9yaWdpbmFsVGV4dCwgMjAwMCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGV4cG9ydEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG9yaWdpbmFsVGV4dCA9IGV4cG9ydEJ0bi50ZXh0Q29udGVudDtcbiAgICAgICAgICAgIGV4cG9ydEJ0bi50ZXh0Q29udGVudCA9ICdFeHBvcnRpbmcuLi4nO1xuXG4gICAgICAgICAgICBjb25zdCBleHBvcnRlZFBhdGggPSBhd2FpdCB0aGlzLmV4cG9ydExvZ3MoKTtcbiAgICAgICAgICAgIGlmIChleHBvcnRlZFBhdGgpIHtcbiAgICAgICAgICAgICAgICBleHBvcnRCdG4udGV4dENvbnRlbnQgPSAnRXhwb3J0ZWQhJztcbiAgICAgICAgICAgICAgICBhd2FpdCBQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC5vcGVuUGF0aChqb2luKHByb3BlcnRpZXMuZW5oYW5jZWRQYXRoLCBcImxvZ3NcIikpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBleHBvcnRCdG4udGV4dENvbnRlbnQgPSAnRmFpbGVkJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBleHBvcnRCdG4udGV4dENvbnRlbnQgPSBvcmlnaW5hbFRleHQsIDIwMDApO1xuICAgICAgICB9KTtcblxuICAgICAgICBjbG9zZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIG92ZXJsYXkucmVtb3ZlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2VyaWFsaXplTG9ncygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2dzLm1hcChsb2cgPT4gYFske2xvZy50aW1lc3RhbXB9XSBbJHtsb2cubGV2ZWx9XSAke2xvZy5tZXNzYWdlfWApLmpvaW4oJ1xcbicpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZXNjYXBlSHRtbCh1bnNhZmU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB1bnNhZmVcbiAgICAgICAgICAgICAucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpXG4gICAgICAgICAgICAgLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpXG4gICAgICAgICAgICAgLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpXG4gICAgICAgICAgICAgLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpXG4gICAgICAgICAgICAgLnJlcGxhY2UoLycvZywgXCImIzAzOTtcIik7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBMb2dNYW5hZ2VyLmdldEluc3RhbmNlKCk7XG4iLCAiaW1wb3J0IHsgcmVnaXN0ZXJQbHVnaW4gfSBmcm9tICdAY2FwYWNpdG9yL2NvcmUnO1xuXG5pbXBvcnQgdHlwZSB7IEZpbGVQaWNrZXJQbHVnaW4gfSBmcm9tICcuL2RlZmluaXRpb25zJztcbi8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vY2FwYXdlc29tZS10ZWFtL2NhcGFjaXRvci1wbHVnaW5zL2lzc3Vlcy8xNFxuaW1wb3J0ICogYXMgd2ViIGZyb20gJy4vd2ViJztcblxuY29uc3QgRmlsZVBpY2tlciA9IHJlZ2lzdGVyUGx1Z2luPEZpbGVQaWNrZXJQbHVnaW4+KCdGaWxlUGlja2VyJywge1xuICB3ZWI6ICgpID0+IG5ldyB3ZWIuRmlsZVBpY2tlcldlYigpLFxufSk7XG5cbmV4cG9ydCAqIGZyb20gJy4vZGVmaW5pdGlvbnMnO1xuZXhwb3J0IHsgRmlsZVBpY2tlciB9O1xuIiwgImltcG9ydCB7IFdlYlBsdWdpbiB9IGZyb20gJ0BjYXBhY2l0b3IvY29yZSc7XG5cbmltcG9ydCB0eXBlIHtcbiAgQ29udmVydEhlaWNUb0pwZWdPcHRpb25zLFxuICBDb252ZXJ0SGVpY1RvSnBlZ1Jlc3VsdCxcbiAgQ29weUZpbGVPcHRpb25zLFxuICBGaWxlUGlja2VyUGx1Z2luLFxuICBQZXJtaXNzaW9uU3RhdHVzLFxuICBQaWNrRGlyZWN0b3J5UmVzdWx0LFxuICBQaWNrRmlsZXNPcHRpb25zLFxuICBQaWNrRmlsZXNSZXN1bHQsXG4gIFBpY2tJbWFnZXNPcHRpb25zLFxuICBQaWNrSW1hZ2VzUmVzdWx0LFxuICBQaWNrTWVkaWFPcHRpb25zLFxuICBQaWNrTWVkaWFSZXN1bHQsXG4gIFBpY2tWaWRlb3NPcHRpb25zLFxuICBQaWNrVmlkZW9zUmVzdWx0LFxuICBQaWNrZWRGaWxlLFxuICBSZXF1ZXN0UGVybWlzc2lvbnNPcHRpb25zLFxufSBmcm9tICcuL2RlZmluaXRpb25zJztcblxuZXhwb3J0IGNsYXNzIEZpbGVQaWNrZXJXZWIgZXh0ZW5kcyBXZWJQbHVnaW4gaW1wbGVtZW50cyBGaWxlUGlja2VyUGx1Z2luIHtcbiAgcHVibGljIHJlYWRvbmx5IEVSUk9SX1BJQ0tfRklMRV9DQU5DRUxFRCA9ICdwaWNrRmlsZXMgY2FuY2VsZWQuJztcblxuICBwdWJsaWMgYXN5bmMgY2hlY2tQZXJtaXNzaW9ucygpOiBQcm9taXNlPFBlcm1pc3Npb25TdGF0dXM+IHtcbiAgICB0aHJvdyB0aGlzLnVuaW1wbGVtZW50ZWQoJ05vdCBpbXBsZW1lbnRlZCBvbiB3ZWIuJyk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgY29udmVydEhlaWNUb0pwZWcoXG4gICAgX29wdGlvbnM6IENvbnZlcnRIZWljVG9KcGVnT3B0aW9ucyxcbiAgKTogUHJvbWlzZTxDb252ZXJ0SGVpY1RvSnBlZ1Jlc3VsdD4ge1xuICAgIHRocm93IHRoaXMudW5pbXBsZW1lbnRlZCgnTm90IGltcGxlbWVudGVkIG9uIHdlYi4nKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBjb3B5RmlsZShfb3B0aW9uczogQ29weUZpbGVPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhyb3cgdGhpcy51bmltcGxlbWVudGVkKCdOb3QgaW1wbGVtZW50ZWQgb24gd2ViLicpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHBpY2tGaWxlcyhvcHRpb25zPzogUGlja0ZpbGVzT3B0aW9ucyk6IFByb21pc2U8UGlja0ZpbGVzUmVzdWx0PiB7XG4gICAgY29uc3QgcGlja2VkRmlsZXMgPSBhd2FpdCB0aGlzLm9wZW5GaWxlUGlja2VyKG9wdGlvbnMpO1xuICAgIGlmICghcGlja2VkRmlsZXMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcih0aGlzLkVSUk9SX1BJQ0tfRklMRV9DQU5DRUxFRCk7XG4gICAgfVxuICAgIGNvbnN0IHJlc3VsdDogUGlja0ZpbGVzUmVzdWx0ID0ge1xuICAgICAgZmlsZXM6IFtdLFxuICAgIH07XG4gICAgZm9yIChjb25zdCBwaWNrZWRGaWxlIG9mIHBpY2tlZEZpbGVzKSB7XG4gICAgICBjb25zdCBmaWxlOiBQaWNrZWRGaWxlID0ge1xuICAgICAgICBibG9iOiBwaWNrZWRGaWxlLFxuICAgICAgICBtb2RpZmllZEF0OiBwaWNrZWRGaWxlLmxhc3RNb2RpZmllZCxcbiAgICAgICAgbWltZVR5cGU6IHRoaXMuZ2V0TWltZVR5cGVGcm9tVXJsKHBpY2tlZEZpbGUpLFxuICAgICAgICBuYW1lOiB0aGlzLmdldE5hbWVGcm9tVXJsKHBpY2tlZEZpbGUpLFxuICAgICAgICBwYXRoOiB1bmRlZmluZWQsXG4gICAgICAgIHNpemU6IHRoaXMuZ2V0U2l6ZUZyb21VcmwocGlja2VkRmlsZSksXG4gICAgICB9O1xuICAgICAgaWYgKG9wdGlvbnM/LnJlYWREYXRhKSB7XG4gICAgICAgIGZpbGUuZGF0YSA9IGF3YWl0IHRoaXMuZ2V0RGF0YUZyb21GaWxlKHBpY2tlZEZpbGUpO1xuICAgICAgfVxuICAgICAgcmVzdWx0LmZpbGVzLnB1c2goZmlsZSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcGlja0RpcmVjdG9yeSgpOiBQcm9taXNlPFBpY2tEaXJlY3RvcnlSZXN1bHQ+IHtcbiAgICB0aHJvdyB0aGlzLnVuaW1wbGVtZW50ZWQoJ05vdCBpbXBsZW1lbnRlZCBvbiB3ZWIuJyk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcGlja0ltYWdlcyhcbiAgICBvcHRpb25zPzogUGlja0ltYWdlc09wdGlvbnMsXG4gICk6IFByb21pc2U8UGlja0ltYWdlc1Jlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnBpY2tGaWxlcyh7IHR5cGVzOiBbJ2ltYWdlLyonXSwgLi4ub3B0aW9ucyB9KTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBwaWNrTWVkaWEob3B0aW9ucz86IFBpY2tNZWRpYU9wdGlvbnMpOiBQcm9taXNlPFBpY2tNZWRpYVJlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnBpY2tGaWxlcyh7IHR5cGVzOiBbJ2ltYWdlLyonLCAndmlkZW8vKiddLCAuLi5vcHRpb25zIH0pO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHBpY2tWaWRlb3MoXG4gICAgb3B0aW9ucz86IFBpY2tWaWRlb3NPcHRpb25zLFxuICApOiBQcm9taXNlPFBpY2tWaWRlb3NSZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5waWNrRmlsZXMoeyB0eXBlczogWyd2aWRlby8qJ10sIC4uLm9wdGlvbnMgfSk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcmVxdWVzdFBlcm1pc3Npb25zKFxuICAgIF9vcHRpb25zPzogUmVxdWVzdFBlcm1pc3Npb25zT3B0aW9ucyxcbiAgKTogUHJvbWlzZTxQZXJtaXNzaW9uU3RhdHVzPiB7XG4gICAgdGhyb3cgdGhpcy51bmltcGxlbWVudGVkKCdOb3QgaW1wbGVtZW50ZWQgb24gd2ViLicpO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBvcGVuRmlsZVBpY2tlcihcbiAgICBvcHRpb25zPzogUGlja0ZpbGVzT3B0aW9ucyxcbiAgKTogUHJvbWlzZTxGaWxlW10gfCB1bmRlZmluZWQ+IHtcbiAgICBjb25zdCBhY2NlcHQgPSBvcHRpb25zPy50eXBlcz8uam9pbignLCcpIHx8ICcnO1xuICAgIGNvbnN0IGxpbWl0ID0gb3B0aW9ucz8ubGltaXQgPT09IHVuZGVmaW5lZCA/IDAgOiBvcHRpb25zLmxpbWl0O1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIGxldCBvbkNoYW5nZUZpcmVkID0gZmFsc2U7XG4gICAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICBpbnB1dC50eXBlID0gJ2ZpbGUnO1xuICAgICAgaW5wdXQuYWNjZXB0ID0gYWNjZXB0O1xuICAgICAgaW5wdXQubXVsdGlwbGUgPSBsaW1pdCA9PT0gMDtcblxuICAgICAgY29uc3QgaGFzQ2FuY2VsRXZlbnQgPSAnb25jYW5jZWwnIGluIGlucHV0O1xuXG4gICAgICBjb25zdCBvbkNoYW5nZUhhbmRsZXIgPSAoKSA9PiB7XG4gICAgICAgIG9uQ2hhbmdlRmlyZWQgPSB0cnVlO1xuICAgICAgICByZW1vdmVBbGxMaXN0ZW5lcnMoKTtcblxuICAgICAgICBjb25zdCBmaWxlcyA9IEFycmF5LmZyb20oaW5wdXQuZmlsZXMgfHwgW10pO1xuICAgICAgICByZXNvbHZlKGZpbGVzKTtcbiAgICAgIH07XG4gICAgICBjb25zdCBvbkNhbmNlbEhhbmRsZXIgPSAoKSA9PiB7XG4gICAgICAgIHJlbW92ZUFsbExpc3RlbmVycygpO1xuICAgICAgICByZXNvbHZlKHVuZGVmaW5lZCk7XG4gICAgICB9O1xuICAgICAgY29uc3Qgb25Gb2N1c0hhbmRsZXIgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgIGF3YWl0IHRoaXMud2FpdCg1MDApO1xuICAgICAgICBpZiAob25DaGFuZ2VGaXJlZCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICByZW1vdmVBbGxMaXN0ZW5lcnMoKTtcbiAgICAgICAgcmVzb2x2ZSh1bmRlZmluZWQpO1xuICAgICAgfTtcbiAgICAgIGNvbnN0IHJlbW92ZUFsbExpc3RlbmVycyA9ICgpID0+IHtcbiAgICAgICAgaW5wdXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgb25DaGFuZ2VIYW5kbGVyKTtcbiAgICAgICAgaWYgKGhhc0NhbmNlbEV2ZW50KSB7XG4gICAgICAgICAgaW5wdXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2FuY2VsJywgb25DYW5jZWxIYW5kbGVyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXMnLCBvbkZvY3VzSGFuZGxlcik7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIG9uQ2hhbmdlSGFuZGxlciwgeyBvbmNlOiB0cnVlIH0pO1xuICAgICAgaWYgKGhhc0NhbmNlbEV2ZW50KSB7XG4gICAgICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NhbmNlbCcsIG9uQ2FuY2VsSGFuZGxlciwgeyBvbmNlOiB0cnVlIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gV29ya2Fyb3VuZCB0byBkZXRlY3Qgd2hlbiBDYW5jZWwgaXMgc2VsZWN0ZWQgaW4gdGhlIEZpbGUgU2VsZWN0aW9uIGRpYWxvZyBib3guXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIG9uRm9jdXNIYW5kbGVyLCB7IG9uY2U6IHRydWUgfSk7XG4gICAgICB9XG4gICAgICBpbnB1dC5jbGljaygpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBnZXREYXRhRnJvbUZpbGUoZmlsZTogRmlsZSk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTtcbiAgICAgIHJlYWRlci5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHR5cGVvZiByZWFkZXIucmVzdWx0ID09PSAnc3RyaW5nJyA/IHJlYWRlci5yZXN1bHQgOiAnJztcbiAgICAgICAgY29uc3Qgc3BsaXR0ZWRSZXN1bHQgPSByZXN1bHQuc3BsaXQoJ2Jhc2U2NCwnKTtcbiAgICAgICAgY29uc3QgYmFzZTY0ID0gc3BsaXR0ZWRSZXN1bHRbMV0gfHwgJyc7XG4gICAgICAgIHJlc29sdmUoYmFzZTY0KTtcbiAgICAgIH07XG4gICAgICByZWFkZXIub25lcnJvciA9IGVycm9yID0+IHtcbiAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGdldE5hbWVGcm9tVXJsKGZpbGU6IEZpbGUpOiBzdHJpbmcge1xuICAgIHJldHVybiBmaWxlLm5hbWU7XG4gIH1cblxuICBwcml2YXRlIGdldE1pbWVUeXBlRnJvbVVybChmaWxlOiBGaWxlKTogc3RyaW5nIHtcbiAgICByZXR1cm4gZmlsZS50eXBlO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRTaXplRnJvbVVybChmaWxlOiBGaWxlKTogbnVtYmVyIHtcbiAgICByZXR1cm4gZmlsZS5zaXplO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyB3YWl0KGRlbGF5TXM6IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgZGVsYXlNcykpO1xuICB9XG59XG4iLCAiaW1wb3J0IHsgU3RyZW1pb0VuaGFuY2VkQXBpIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvU3RyZW1pb0VuaGFuY2VkQXBpXCI7XG5pbXBvcnQgUGx1Z2luT3B0aW9ucyBmcm9tIFwiLi9QbHVnaW5PcHRpb25zXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTdHJlbWlvRW5oYW5jZWRBcGkoXG4gICAgYXBwbHlUaGVtZTogKHRoZW1lOiBzdHJpbmcpID0+IFByb21pc2U8Ym9vbGVhbj5cbik6IFN0cmVtaW9FbmhhbmNlZEFwaSB7XG4gICAgcmV0dXJuIE9iamVjdC5mcmVlemUoe1xuICAgICAgICBhcHBseVRoZW1lOiAodGhlbWU6IHVua25vd24pID0+IChcbiAgICAgICAgICAgIHR5cGVvZiB0aGVtZSA9PT0gXCJzdHJpbmdcIiA/IGFwcGx5VGhlbWUodGhlbWUpIDogUHJvbWlzZS5yZXNvbHZlKGZhbHNlKVxuICAgICAgICApLFxuICAgICAgICBwbHVnaW5PcHRpb25zOiBPYmplY3QuZnJlZXplKHtcbiAgICAgICAgICAgIGdldDogKHBsdWdpbkZpbGU6IHN0cmluZykgPT4gKFxuICAgICAgICAgICAgICAgIHR5cGVvZiBwbHVnaW5GaWxlID09PSBcInN0cmluZ1wiID8gUGx1Z2luT3B0aW9ucy5nZXQocGx1Z2luRmlsZSkgOiB7fVxuICAgICAgICAgICAgKSxcbiAgICAgICAgfSksXG4gICAgfSk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztNQUFXLGVBa0JFLG9CQVFBLGVDekJBLGlCQTJKQSxxQkMzSkEsV0FTQSxnQkNMQSxXQ0lQLFFBT0EsUUFDTywyQkEwREEsa0JBUUEsa0JBY1Asc0JBY0EsZ0JBOEJPLGtCQXdDQSx3QkFpRkEsZUFRRixpQkEwQkEsZUFlRSxxQkFjQTs7O0FKcFViLE9BQUMsU0FBVUEsZ0JBQWU7QUFPdEIsUUFBQUEsZUFBYyxlQUFlLElBQUk7QUFRakMsUUFBQUEsZUFBYyxhQUFhLElBQUk7TUFDbkMsR0FBRyxrQkFBa0IsZ0JBQWdCLENBQUEsRUFBRztBQUNqQyxNQUFNLHFCQUFOLGNBQWlDLE1BQU07UUFDMUMsWUFBWSxTQUFTLE1BQU0sTUFBTTtBQUM3QixnQkFBTSxPQUFPO0FBQ2IsZUFBSyxVQUFVO0FBQ2YsZUFBSyxPQUFPO0FBQ1osZUFBSyxPQUFPO1FBQ3BCO01BQ0E7QUFDTyxNQUFNLGdCQUFnQixDQUFDLFFBQVE7QUFDbEMsWUFBSSxJQUFJO0FBQ1IsWUFBSSxRQUFRLFFBQVEsUUFBUSxTQUFTLFNBQVMsSUFBSSxlQUFlO0FBQzdELGlCQUFPO1FBQ2YsWUFDYyxNQUFNLEtBQUssUUFBUSxRQUFRLFFBQVEsU0FBUyxTQUFTLElBQUksWUFB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QUM1RCxnQkFBTSxlQUFlLFNBQVMsY0FBYyxLQUFLO0FBQ2pELHVCQUFhLEtBQUs7QUFDbEIsdUJBQWEsWUFBWTtBQUFBLFlBQ3JCO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsVUFDSjtBQUNBLHdCQUFjLFlBQVksWUFBWTtBQUFBLFFBQzFDO0FBRUEseUJBQVMsVUFBVSxhQUFhLGVBQWUsVUFBVSxjQUFjO0FBQ3ZFLHlCQUFTLFVBQVUsZUFBZSxpQkFBaUIsVUFBVSxjQUFjO0FBQzNFLHlCQUFTLFVBQVUsMkJBQTJCLDRCQUE0QixVQUFVLGNBQWM7QUFDbEcseUJBQVMsVUFBVSxrQkFBa0IseUJBQXlCLFVBQVUsY0FBYztBQUV0Rix3QkFBZ0IsZUFBZSxNQUFNO0FBQ2pDLDZCQUFXLFNBQVM7QUFBQSxRQUN4QixHQUFHLGtCQUFrQjtBQUVyQix3QkFBZ0IsaUJBQWlCLFlBQVk7QUFDekMsZ0JBQU0sZUFBZSxNQUFNLG1CQUFXLFdBQVc7QUFDakQsY0FBSSxjQUFjO0FBQ2Qsa0JBQU0sZ0JBQWdCLFFBQVEsYUFBUyxtQkFBSyxtQkFBVyxjQUFjLE1BQU0sQ0FBQztBQUFBLFVBQ2hGO0FBQUEsUUFDSixHQUFHLG9CQUFvQjtBQUV2Qix3QkFBZ0IsNEJBQTRCLFlBQVk7QUFDcEQsZ0JBQU0sa0NBQWtDO0FBQ3hDLHdDQUE4QjtBQUFBLFFBQ2xDLEdBQUcsZ0NBQWdDO0FBRW5DLHdCQUFnQix5QkFBeUIsWUFBWTtBQUNqRCxnQkFBTSxnQkFBZ0IsUUFBUSxTQUFTLG1CQUFXLFlBQVk7QUFBQSxRQUNsRSxHQUFHLDZCQUE2QjtBQUFBLE1BQ3BDO0FBQUEsSUFDSixDQUFDLEVBQUUsTUFBTSxTQUFPLHVCQUFPLE1BQU0sb0NBQW9DLEdBQUcsQ0FBQztBQUFBLEVBQ3pFO0FBRUEsV0FBUyxlQUF1QjtBQUM1QixXQUFPO0FBQUE7QUFBQTtBQUFBLEVBR1g7QUFFQSxXQUFTLGVBQXVCO0FBQzVCLFdBQU87QUFBQTtBQUFBO0FBQUEsRUFHWDtBQUVBLFdBQVMsZ0JBQXdCO0FBQzdCLFdBQU87QUFBQTtBQUFBLEVBRVg7IiwKICAibmFtZXMiOiBbIkV4Y2VwdGlvbkNvZGUiLCAicmVnaXN0ZXJQbHVnaW4iLCAicCIsICJyZXNvbHZlIiwgImhlYWRlcnMiLCAiU3lzdGVtQmFyc1N0eWxlIiwgIlN5c3RlbUJhclR5cGUiLCAiRGlyZWN0b3J5IiwgIkVuY29kaW5nIiwgInJlc29sdmUiLCAiZW50cnkiLCAidG9QYXRoIiwgImN0aW1lIiwgIndlYl9leHBvcnRzIiwgImluaXRfd2ViIiwgInJlc29sdmUiLCAicmVzb2x2ZSIsICJqb2luIiwgImJhc2VuYW1lIiwgIndlYl9leHBvcnRzIiwgImluaXRfd2ViIiwgIkJyb3dzZXIiLCAiZiIsICJCcm93c2VyIiwgInJlc29sdmUiLCAiZiIsICJyZXNvbHZlIiwgImltcG9ydF9wYXRoIiwgImltcG9ydF9wYXRoIiwgInJlc29sdmUiXQp9Cg==
