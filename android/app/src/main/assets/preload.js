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
  var mods_tab_default = '<div class="nav-content-container-zl9hQ" style="width: 90%; overflow-y: auto;">\r\n    <div class="addons-content-zhFBl">\r\n        <div class="selectable-inputs-container-tUul1">\r\n            <div class="spacing-wH1w5"></div>\r\n            <label title="Search themes/plugins" class="search-bar-k7MXd search-bar-container-p4tSt">\r\n                <input size="1" autocorrect="off" autocapitalize="off" autocomplete="off" spellcheck="false" tabindex="0" class="search-input-bAgAh text-input-hnLiz" type="text" placeholder="Search themes/plugins" value="">\r\n                <svg class="icon-QOYfJ" viewBox="0 0 512 512">\r\n                    <path d="M456.882 415.7999999999997l-93.791-89.45c22.605-28.67 34.784-63.57 34.686-99.44 0-91.54-78.142-166.07-174.125-166.07s-174.125 74.53-174.125 166.17c0 91.54 78.142 166.07 174.125 166.07 37.586 0 74.161-11.61 104.256-33.08l93.79 89.45c3.535 3.04 7.91 5.05 12.604 5.79 4.696 0.74 9.515 0.18 13.887-1.61 4.374-1.79 8.117-4.74 10.788-8.49 2.671-3.76 4.157-8.17 4.284-12.7 0.108-6.11-2.165-12.04-6.379-16.64m-357.62-188.79c-0.01-29.43 11.453-57.8 32.162-79.61 20.709-21.82 49.183-35.49 79.884-38.39 30.7-2.9 61.433 5.2 86.221 22.72 24.787 17.52 41.858 43.2 47.891 72.05 6.034 28.86 0.598 58.83-15.249 84.07s-40.972 43.96-70.489 52.53c-29.518 8.55-61.317 6.33-89.213-6.24s-49.895-34.57-61.718-61.75c-6.258-14.38-9.483-29.81-9.488-45.38" style="fill: currentcolor;"></path>\r\n                </svg>\r\n            </label>\r\n        </div>\r\n        <br/>\r\n        <div tabindex="0" title="Submit your themes and plugins here" target="_blank" class="link-FrL1t button-container-zVLH6">\r\n            <a href="https://github.com/REVENGE977/stremio-enhanced-registry" target="_blank" rel="noreferrer">\r\n                <div class="label-PJvSJ" style="text-align: center;">Submit your themes and plugins</div>\r\n            </a>\r\n        </div>\r\n\r\n        <div class="addons-list-container-Ovr2Z" id="mods-list">\r\n            \r\n        </div>\r\n        <br/>\r\n    </div>\r\n</div>';

  // src/components/mods-item/mods-item.html
  var mods_item_default = '<br>\r\n<div tabindex="0" class="addon-whmdO animation-fade-in addon-container-lC5KN button-container-zVLH6">\r\n    <div class="logo-container-ZcSSC">\r\n        <!-- theme preview here -->\r\n\r\n        <!-- plugin icon here -->\r\n    </div>\r\n\r\n	<div class="info-container-AdMB6">\r\n		<div class="name-container-qIAg8" title="{{ name }}">{{ name }}</div>\r\n		<div class="version-container-zdPyN" title="{{ version }}">{{ version }}</div>\r\n		<div class="types-container-DaOrg">{{ type }}</div>\r\n        <div class="description-container-v7Jhe">\r\n            <b>Description:</b> {{ description }}\r\n            <br>\r\n            <b>Author:</b> {{ author }}\r\n        </div>\r\n	</div>\r\n	<div class="buttons-container-g0xXr">\r\n		<div class="action-buttons-container-xMVmz">\r\n			<div tabindex="-1" title="{{ actionbtnTitle }}" class="{{ actionbtnClass }} button-container-zVLH6 modActionBtn" data-link="{{ download }}" data-type="{{ type }}">\r\n				<div class="label-OnWh2">{{ actionbtnTitle }}</div>\r\n			</div>\r\n		</div>\r\n		<a href="{{ repo }}" target="_blank" rel="noreferrer" class="share-button-container-s3gwP button-container-zVLH6">\r\n			<svg class="icon-GxVbY" viewBox="0 0 24 24">\r\n				<path d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z" style="fill: currentcolor;" />\r\n			</svg>\r\n			<div class="label-OnWh2">Open repository</div>\r\n		</a>\r\n	</div>\r\n</div>\r\n';

  // src/components/about-category/about-category.html
  var about_category_default = '<h4 style="color: white; margin-bottom: 1rem;">\r\n    Developed By: <p style="display: inline !important;"><a href="https://github.com/REVENGE977" target="_blank" rel="noreferrer">REVENGE977</a></p>\r\n    <br/>\r\n    Version: v{{ version }}\r\n    <br/>\r\n</h4>\r\n\r\n<div class="option-vFOAS">\r\n    <div class="heading-dYMDt">\r\n        <div class="label-qI6Vh">Check for updates on startup</div>\r\n    </div>\r\n    <div class="content-P2T0i">\r\n        <div tabindex="-1" class="toggle-container-lZfHP button-container-zVLH6 {{ checkForUpdatesOnStartup }}" id="checkForUpdatesOnStartup">\r\n            <div class="toggle-toOWM"></div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<div class="option-vFOAS">\r\n    <div class="heading-dYMDt">\r\n        <div class="label-qI6Vh">Discord Rich Presence</div>\r\n    </div>\r\n    <div class="content-P2T0i">\r\n        <div tabindex="-1" class="toggle-container-lZfHP button-container-zVLH6 {{ discordrichpresence }}" id="discordrichpresence" style="outline: none;">\r\n            <div class="toggle-toOWM"></div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<div class="option-vFOAS">\r\n    <div class="heading-dYMDt">\r\n        <div class="label-qI6Vh">Window transparency</div>\r\n    </div>\r\n    <div class="content-P2T0i">\r\n        <div tabindex="-1" class="toggle-container-lZfHP button-container-zVLH6 {{ enableTransparentThemes }}" id="enableTransparentThemes" style="outline: none;">\r\n            <div class="toggle-toOWM"></div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<p style="color:gray;">This option has to be enabled for themes that support transparency to work. (experimental)</p>\r\n<br/>\r\n\r\n<div class="option-vFOAS">\r\n    <div class="content-P2T0i">\r\n        <div tabindex="0" title="Community Plugins &amp; Themes" class="button-DNmYL button-container-zVLH6 button" id="browsePluginsThemesBtn">\r\n            Community Marketplace\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<div class="option-vFOAS">\r\n    <div class="content-P2T0i">\r\n        <div tabindex="0" title="Check For Updates" class="button-DNmYL button-container-zVLH6 button" id="checkforupdatesBtn">\r\n            Check For Updates\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<br/>';

  // src/components/default-theme/default-theme.html
  var default_theme_default = `<div class="option-vFOAS">\r
    <div class="heading-dYMDt">\r
        <div class="label-qI6Vh">Default</div>\r
    </div>\r
    <div class="content-P2T0i">\r
        <div \r
        title="Default" \r
        id="Default" \r
        tabindex="-1"\r
        onclick="applyTheme('Default')"\r
        style="color: white; margin-bottom: 1rem; width: max-content; background-color: {{ backgroundColor }};"\r
        class="button button-container-zVLH6 {{ disabled }}"\r
        >{{ label }}</div>\r
    </div>\r
</div>\r
`;

  // src/components/back-btn/back-btn.html
  var back_btn_default = '<div tabindex="-1" class="button-container-xT9_L back-button-container-lDB1N button-container-zVLH6" id="back-btn">\r\n    <svg class="icon-T8MU6" viewBox="0 0 512 512">\r\n        <path d="M328.6100000000006 106.469l-143.53 136.889 143.53 136.889" style="stroke: currentcolor; stroke-linecap: round; stroke-linejoin: round; stroke-width: 48; fill: none;"></path>\r\n    </svg>\r\n</div>';

  // src/components/title-bar/title-bar.html
  var title_bar_default = '<nav class="title-bar">\r\n    <div class="title-bar-buttons">\r\n        <div id="minimizeApp-btn" title="Minimize" class="button">\r\n            <svg viewBox="0 0 24 24">\r\n                <path d="M20,14H4V10H20" style="fill:white;"></path>\r\n            </svg>\r\n        </div>\r\n        <div id="maximizeApp-btn" title="Maximize" class="button">\r\n            <svg viewBox="0 0 24 24">\r\n                <path d="M3,3H21V21H3V3M5,5V19H19V5H5Z" style="fill:white;"></path>\r\n            </svg>\r\n        </div>\r\n        <div id="closeApp-btn" title="Close" class="button">\r\n            <svg viewBox="0 0 24 24" style="width: 25px; height: 25px;">\r\n                <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" style="fill:white;"></path>\r\n            </svg>\r\n        </div>\r\n    </div>\r\n\r\n    <style>\r\n		body > *:not(.title-bar) {\r\n			padding-top: 40px; \r\n		}\r\n\r\n        .button {\r\n            cursor: pointer;\r\n        }\r\n\r\n        .title-bar {\r\n            position: fixed; \r\n            top: 0;\r\n            left: 0;\r\n            right: 0;\r\n            height: 40px;\r\n            z-index: 9999;\r\n            display: flex;\r\n            align-items: center;\r\n            justify-content: flex-end;\r\n            background: rgba(0,0,0,0.15);\r\n            backdrop-filter: blur(20px) saturate(120%);\r\n			-webkit-app-region: drag;\r\n        }\r\n\r\n        .title-bar-buttons {\r\n            -webkit-app-region: no-drag;\r\n            display: flex;\r\n            align-items: center;\r\n            gap: 2.0rem;\r\n            margin-left: auto;\r\n			margin-right: 20px;\r\n        }\r\n\r\n        .title-bar-buttons svg {\r\n            width: 20px;\r\n            height: 20px;\r\n        }\r\n    </style>\r\n</nav>\r\n';

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
      const pluginPath = (0, import_path.join)(Properties_default.pluginsPath, pluginName);
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
      const filename = (0, import_path.basename)(new URL(modLink).pathname) || `${type}-${Date.now()}`;
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
            await PlatformManager.current.unlink((0, import_path.join)(Properties_default.pluginsPath, fileName));
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
      }).catch((err) => this.logger.error(`Failed to setup scroll listener: ${err}`));
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
  __publicField(ModManager, "APPLY_THEME_SCRIPT_ID", "stremio-enhanced-apply-theme-script");
  var ModManager_default = ModManager;

  // src/core/Settings.ts
  var Settings = class {
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
      const enabledPlugins = JSON.parse(
        localStorage.getItem(STORAGE_KEYS.ENABLED_PLUGINS) || "[]"
      );
      const pluginContainer = document.createElement("div");
      pluginContainer.innerHTML = getPluginItemTemplate(fileName, metaData, enabledPlugins.includes(fileName));
      pluginContainer.setAttribute("name", `${fileName}-box`);
      pluginContainer.setAttribute("data-stremio-enhanced-item", fileName);
      const pluginsCategory = document.querySelector(SELECTORS.PLUGINS_CATEGORY);
      pluginsCategory?.appendChild(pluginContainer);
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
      }));
    }).catch((err) => logger_browser_default.error("Failed to setup themes: " + err));
    for (const plugin of pluginsList) {
      try {
        const pluginPath = (0, import_path3.join)(pluginsPath, plugin);
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
  async function applyUserTheme() {
    const currentTheme = localStorage.getItem(STORAGE_KEYS.CURRENT_THEME);
    if (!currentTheme || currentTheme === "Default") {
      localStorage.setItem(STORAGE_KEYS.CURRENT_THEME, "Default");
      return;
    }
    const themePath = (0, import_path3.join)(Properties_default.themesPath, currentTheme);
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
    bindButtonClick(buttonId, () => importModFile(type), `${type} import button`);
  }
  function setupManagedFolderButton(buttonId, folderPath) {
    bindButtonClick(buttonId, () => PlatformManager.current.openPath(folderPath), `folder button ${buttonId}`);
  }
  var isImporting = false;
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
      const content = await PlatformManager.current.readFile(filePath);
      const destinationDirectory = type === "theme" ? Properties_default.themesPath : Properties_default.pluginsPath;
      await PlatformManager.current.writeFile((0, import_path3.join)(destinationDirectory, file.name), content);
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BjYXBhY2l0b3IvY29yZS9idWlsZC91dGlsLmpzIiwgIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9AY2FwYWNpdG9yL2NvcmUvYnVpbGQvcnVudGltZS5qcyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvQGNhcGFjaXRvci9jb3JlL2J1aWxkL2dsb2JhbC5qcyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvQGNhcGFjaXRvci9jb3JlL2J1aWxkL3dlYi1wbHVnaW4uanMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BjYXBhY2l0b3IvY29yZS9idWlsZC9jb3JlLXBsdWdpbnMuanMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BjYXBhY2l0b3IvZmlsZXN5c3RlbS9zcmMvZGVmaW5pdGlvbnMudHMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BjYXBhY2l0b3IvZmlsZXN5c3RlbS9zcmMvd2ViLnRzIiwgIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9AY2FwYWNpdG9yL2Jyb3dzZXIvc3JjL3dlYi50cyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcGF0aC1icm93c2VyaWZ5L2luZGV4LmpzIiwgIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jYXBhY2l0b3Itbm9kZWpzL3NyYy93ZWIudHMiLCAiLi4vLi4vLi4vLi4vLi4vc3JjL3BsYXRmb3JtL1BsYXRmb3JtTWFuYWdlci50cyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvQGNhcGFjaXRvci9maWxlc3lzdGVtL3NyYy9pbmRleC50cyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvQGNhcGFjaXRvci9zeW5hcHNlL2Rpc3Qvc3luYXBzZS5tanMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BjYXBhY2l0b3IvYnJvd3Nlci9zcmMvaW5kZXgudHMiLCAiLi4vLi4vLi4vLi4vLi4vc3JjL3BsYXRmb3JtL0NhcGFjaXRvclBsYXRmb3JtLnRzIiwgIi4uLy4uLy4uLy4uLy4uL3NyYy91dGlscy9sb2dnZXIuYnJvd3Nlci50cyIsICIuLi8uLi8uLi8uLi8uLi9zcmMvY29uc3RhbnRzL2luZGV4LnRzIiwgIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL21vZHMtdGFiL21vZHMtdGFiLmh0bWwiLCAiLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvbW9kcy1pdGVtL21vZHMtaXRlbS5odG1sIiwgIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2Fib3V0LWNhdGVnb3J5L2Fib3V0LWNhdGVnb3J5Lmh0bWwiLCAiLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvZGVmYXVsdC10aGVtZS9kZWZhdWx0LXRoZW1lLmh0bWwiLCAiLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvYmFjay1idG4vYmFjay1idG4uaHRtbCIsICIuLi8uLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy90aXRsZS1iYXIvdGl0bGUtYmFyLmh0bWwiLCAiLi4vLi4vLi4vLi4vLi4vc3JjL3V0aWxzL3RlbXBsYXRlQ2FjaGUuYnJvd3Nlci50cyIsICIuLi8uLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy90b2FzdC90b2FzdC50cyIsICIuLi8uLi8uLi8uLi8uLi9zcmMvdXRpbHMvSGVscGVycy50cyIsICIuLi8uLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9wbHVnaW4taXRlbS9wbHVnaW5JdGVtLnRzIiwgIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3RoZW1lLWl0ZW0vdGhlbWVJdGVtLnRzIiwgIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2VuaGFuY2VkLW5hdi9lbmhhbmNlZE5hdi50cyIsICIuLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9Qcm9wZXJ0aWVzLnRzIiwgIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2FwcGx5LXRoZW1lL2FwcGx5VGhlbWUuYnJvd3Nlci50cyIsICIuLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9Nb2RNYW5hZ2VyLnRzIiwgIi4uLy4uLy4uLy4uLy4uL3NyYy9pbnRlcmZhY2VzL01ldGFEYXRhLnRzIiwgIi4uLy4uLy4uLy4uLy4uL3NyYy91dGlscy9FeHRyYWN0TWV0YURhdGEudHMiLCAiLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvU2V0dGluZ3MudHMiLCAiLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvbW9kcy10YWIvbW9kc1RhYi50cyIsICIuLi8uLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9tb2RzLWl0ZW0vbW9kc0l0ZW0udHMiLCAiLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvYWJvdXQtY2F0ZWdvcnkvYWJvdXRDYXRlZ29yeS50cyIsICIuLi8uLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9kZWZhdWx0LXRoZW1lL2RlZmF1bHRUaGVtZS50cyIsICIuLi8uLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9iYWNrLWJ0bi9iYWNrQnRuLnRzIiwgIi4uLy4uLy4uLy4uLy4uL3NyYy9hbmRyb2lkL3ByZWxvYWQudHMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NhcGFjaXRvci1ub2RlanMvc3JjL05vZGVKUy50cyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY2FwYWNpdG9yLW5vZGVqcy9zcmMvaW1wbGVtZW50YXRpb24udHMiLCAiLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvTG9nTWFuYWdlci50cyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvQGNhcGF3ZXNvbWUvY2FwYWNpdG9yLWZpbGUtcGlja2VyL3NyYy9pbmRleC50cyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvQGNhcGF3ZXNvbWUvY2FwYWNpdG9yLWZpbGUtcGlja2VyL3NyYy93ZWIudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImV4cG9ydCB2YXIgRXhjZXB0aW9uQ29kZTtcbihmdW5jdGlvbiAoRXhjZXB0aW9uQ29kZSkge1xuICAgIC8qKlxuICAgICAqIEFQSSBpcyBub3QgaW1wbGVtZW50ZWQuXG4gICAgICpcbiAgICAgKiBUaGlzIHVzdWFsbHkgbWVhbnMgdGhlIEFQSSBjYW4ndCBiZSB1c2VkIGJlY2F1c2UgaXQgaXMgbm90IGltcGxlbWVudGVkIGZvclxuICAgICAqIHRoZSBjdXJyZW50IHBsYXRmb3JtLlxuICAgICAqL1xuICAgIEV4Y2VwdGlvbkNvZGVbXCJVbmltcGxlbWVudGVkXCJdID0gXCJVTklNUExFTUVOVEVEXCI7XG4gICAgLyoqXG4gICAgICogQVBJIGlzIG5vdCBhdmFpbGFibGUuXG4gICAgICpcbiAgICAgKiBUaGlzIG1lYW5zIHRoZSBBUEkgY2FuJ3QgYmUgdXNlZCByaWdodCBub3cgYmVjYXVzZTpcbiAgICAgKiAgIC0gaXQgaXMgY3VycmVudGx5IG1pc3NpbmcgYSBwcmVyZXF1aXNpdGUsIHN1Y2ggYXMgbmV0d29yayBjb25uZWN0aXZpdHlcbiAgICAgKiAgIC0gaXQgcmVxdWlyZXMgYSBwYXJ0aWN1bGFyIHBsYXRmb3JtIG9yIGJyb3dzZXIgdmVyc2lvblxuICAgICAqL1xuICAgIEV4Y2VwdGlvbkNvZGVbXCJVbmF2YWlsYWJsZVwiXSA9IFwiVU5BVkFJTEFCTEVcIjtcbn0pKEV4Y2VwdGlvbkNvZGUgfHwgKEV4Y2VwdGlvbkNvZGUgPSB7fSkpO1xuZXhwb3J0IGNsYXNzIENhcGFjaXRvckV4Y2VwdGlvbiBleHRlbmRzIEVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlLCBjb2RlLCBkYXRhKSB7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgICAgICB0aGlzLmNvZGUgPSBjb2RlO1xuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgIH1cbn1cbmV4cG9ydCBjb25zdCBnZXRQbGF0Zm9ybUlkID0gKHdpbikgPT4ge1xuICAgIHZhciBfYSwgX2I7XG4gICAgaWYgKHdpbiA9PT0gbnVsbCB8fCB3aW4gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHdpbi5hbmRyb2lkQnJpZGdlKSB7XG4gICAgICAgIHJldHVybiAnYW5kcm9pZCc7XG4gICAgfVxuICAgIGVsc2UgaWYgKChfYiA9IChfYSA9IHdpbiA9PT0gbnVsbCB8fCB3aW4gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHdpbi53ZWJraXQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5tZXNzYWdlSGFuZGxlcnMpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5icmlkZ2UpIHtcbiAgICAgICAgcmV0dXJuICdpb3MnO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuICd3ZWInO1xuICAgIH1cbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD11dGlsLmpzLm1hcCIsICJpbXBvcnQgeyBDYXBhY2l0b3JFeGNlcHRpb24sIGdldFBsYXRmb3JtSWQsIEV4Y2VwdGlvbkNvZGUgfSBmcm9tICcuL3V0aWwnO1xuZXhwb3J0IGNvbnN0IGNyZWF0ZUNhcGFjaXRvciA9ICh3aW4pID0+IHtcbiAgICBjb25zdCBjYXBDdXN0b21QbGF0Zm9ybSA9IHdpbi5DYXBhY2l0b3JDdXN0b21QbGF0Zm9ybSB8fCBudWxsO1xuICAgIGNvbnN0IGNhcCA9IHdpbi5DYXBhY2l0b3IgfHwge307XG4gICAgY29uc3QgUGx1Z2lucyA9IChjYXAuUGx1Z2lucyA9IGNhcC5QbHVnaW5zIHx8IHt9KTtcbiAgICBjb25zdCBnZXRQbGF0Zm9ybSA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIGNhcEN1c3RvbVBsYXRmb3JtICE9PSBudWxsID8gY2FwQ3VzdG9tUGxhdGZvcm0ubmFtZSA6IGdldFBsYXRmb3JtSWQod2luKTtcbiAgICB9O1xuICAgIGNvbnN0IGlzTmF0aXZlUGxhdGZvcm0gPSAoKSA9PiBnZXRQbGF0Zm9ybSgpICE9PSAnd2ViJztcbiAgICBjb25zdCBpc1BsdWdpbkF2YWlsYWJsZSA9IChwbHVnaW5OYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IHBsdWdpbiA9IHJlZ2lzdGVyZWRQbHVnaW5zLmdldChwbHVnaW5OYW1lKTtcbiAgICAgICAgaWYgKHBsdWdpbiA9PT0gbnVsbCB8fCBwbHVnaW4gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHBsdWdpbi5wbGF0Zm9ybXMuaGFzKGdldFBsYXRmb3JtKCkpKSB7XG4gICAgICAgICAgICAvLyBKUyBpbXBsZW1lbnRhdGlvbiBhdmFpbGFibGUgZm9yIHRoZSBjdXJyZW50IHBsYXRmb3JtLlxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGdldFBsdWdpbkhlYWRlcihwbHVnaW5OYW1lKSkge1xuICAgICAgICAgICAgLy8gTmF0aXZlIGltcGxlbWVudGF0aW9uIGF2YWlsYWJsZS5cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICAgIGNvbnN0IGdldFBsdWdpbkhlYWRlciA9IChwbHVnaW5OYW1lKSA9PiB7IHZhciBfYTsgcmV0dXJuIChfYSA9IGNhcC5QbHVnaW5IZWFkZXJzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZmluZCgoaCkgPT4gaC5uYW1lID09PSBwbHVnaW5OYW1lKTsgfTtcbiAgICBjb25zdCBoYW5kbGVFcnJvciA9IChlcnIpID0+IHdpbi5jb25zb2xlLmVycm9yKGVycik7XG4gICAgY29uc3QgcmVnaXN0ZXJlZFBsdWdpbnMgPSBuZXcgTWFwKCk7XG4gICAgY29uc3QgcmVnaXN0ZXJQbHVnaW4gPSAocGx1Z2luTmFtZSwganNJbXBsZW1lbnRhdGlvbnMgPSB7fSkgPT4ge1xuICAgICAgICBjb25zdCByZWdpc3RlcmVkUGx1Z2luID0gcmVnaXN0ZXJlZFBsdWdpbnMuZ2V0KHBsdWdpbk5hbWUpO1xuICAgICAgICBpZiAocmVnaXN0ZXJlZFBsdWdpbikge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKGBDYXBhY2l0b3IgcGx1Z2luIFwiJHtwbHVnaW5OYW1lfVwiIGFscmVhZHkgcmVnaXN0ZXJlZC4gQ2Fubm90IHJlZ2lzdGVyIHBsdWdpbnMgdHdpY2UuYCk7XG4gICAgICAgICAgICByZXR1cm4gcmVnaXN0ZXJlZFBsdWdpbi5wcm94eTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwbGF0Zm9ybSA9IGdldFBsYXRmb3JtKCk7XG4gICAgICAgIGNvbnN0IHBsdWdpbkhlYWRlciA9IGdldFBsdWdpbkhlYWRlcihwbHVnaW5OYW1lKTtcbiAgICAgICAgbGV0IGpzSW1wbGVtZW50YXRpb247XG4gICAgICAgIGNvbnN0IGxvYWRQbHVnaW5JbXBsZW1lbnRhdGlvbiA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGlmICghanNJbXBsZW1lbnRhdGlvbiAmJiBwbGF0Zm9ybSBpbiBqc0ltcGxlbWVudGF0aW9ucykge1xuICAgICAgICAgICAgICAgIGpzSW1wbGVtZW50YXRpb24gPVxuICAgICAgICAgICAgICAgICAgICB0eXBlb2YganNJbXBsZW1lbnRhdGlvbnNbcGxhdGZvcm1dID09PSAnZnVuY3Rpb24nXG4gICAgICAgICAgICAgICAgICAgICAgICA/IChqc0ltcGxlbWVudGF0aW9uID0gYXdhaXQganNJbXBsZW1lbnRhdGlvbnNbcGxhdGZvcm1dKCkpXG4gICAgICAgICAgICAgICAgICAgICAgICA6IChqc0ltcGxlbWVudGF0aW9uID0ganNJbXBsZW1lbnRhdGlvbnNbcGxhdGZvcm1dKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNhcEN1c3RvbVBsYXRmb3JtICE9PSBudWxsICYmICFqc0ltcGxlbWVudGF0aW9uICYmICd3ZWInIGluIGpzSW1wbGVtZW50YXRpb25zKSB7XG4gICAgICAgICAgICAgICAganNJbXBsZW1lbnRhdGlvbiA9XG4gICAgICAgICAgICAgICAgICAgIHR5cGVvZiBqc0ltcGxlbWVudGF0aW9uc1snd2ViJ10gPT09ICdmdW5jdGlvbidcbiAgICAgICAgICAgICAgICAgICAgICAgID8gKGpzSW1wbGVtZW50YXRpb24gPSBhd2FpdCBqc0ltcGxlbWVudGF0aW9uc1snd2ViJ10oKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIDogKGpzSW1wbGVtZW50YXRpb24gPSBqc0ltcGxlbWVudGF0aW9uc1snd2ViJ10pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGpzSW1wbGVtZW50YXRpb247XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGNyZWF0ZVBsdWdpbk1ldGhvZCA9IChpbXBsLCBwcm9wKSA9PiB7XG4gICAgICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICAgICAgaWYgKHBsdWdpbkhlYWRlcikge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1ldGhvZEhlYWRlciA9IHBsdWdpbkhlYWRlciA9PT0gbnVsbCB8fCBwbHVnaW5IZWFkZXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHBsdWdpbkhlYWRlci5tZXRob2RzLmZpbmQoKG0pID0+IHByb3AgPT09IG0ubmFtZSk7XG4gICAgICAgICAgICAgICAgaWYgKG1ldGhvZEhlYWRlcikge1xuICAgICAgICAgICAgICAgICAgICBpZiAobWV0aG9kSGVhZGVyLnJ0eXBlID09PSAncHJvbWlzZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAob3B0aW9ucykgPT4gY2FwLm5hdGl2ZVByb21pc2UocGx1Z2luTmFtZSwgcHJvcC50b1N0cmluZygpLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAob3B0aW9ucywgY2FsbGJhY2spID0+IGNhcC5uYXRpdmVDYWxsYmFjayhwbHVnaW5OYW1lLCBwcm9wLnRvU3RyaW5nKCksIG9wdGlvbnMsIGNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChpbXBsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoX2EgPSBpbXBsW3Byb3BdKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuYmluZChpbXBsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChpbXBsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChfYiA9IGltcGxbcHJvcF0pID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5iaW5kKGltcGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IENhcGFjaXRvckV4Y2VwdGlvbihgXCIke3BsdWdpbk5hbWV9XCIgcGx1Z2luIGlzIG5vdCBpbXBsZW1lbnRlZCBvbiAke3BsYXRmb3JtfWAsIEV4Y2VwdGlvbkNvZGUuVW5pbXBsZW1lbnRlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGNyZWF0ZVBsdWdpbk1ldGhvZFdyYXBwZXIgPSAocHJvcCkgPT4ge1xuICAgICAgICAgICAgbGV0IHJlbW92ZTtcbiAgICAgICAgICAgIGNvbnN0IHdyYXBwZXIgPSAoLi4uYXJncykgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHAgPSBsb2FkUGx1Z2luSW1wbGVtZW50YXRpb24oKS50aGVuKChpbXBsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZuID0gY3JlYXRlUGx1Z2luTWV0aG9kKGltcGwsIHByb3ApO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZm4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHAgPSBmbiguLi5hcmdzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZSA9IHAgPT09IG51bGwgfHwgcCA9PT0gdm9pZCAwID8gdm9pZCAwIDogcC5yZW1vdmU7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBDYXBhY2l0b3JFeGNlcHRpb24oYFwiJHtwbHVnaW5OYW1lfS4ke3Byb3B9KClcIiBpcyBub3QgaW1wbGVtZW50ZWQgb24gJHtwbGF0Zm9ybX1gLCBFeGNlcHRpb25Db2RlLlVuaW1wbGVtZW50ZWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKHByb3AgPT09ICdhZGRMaXN0ZW5lcicpIHtcbiAgICAgICAgICAgICAgICAgICAgcC5yZW1vdmUgPSBhc3luYyAoKSA9PiByZW1vdmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHA7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgLy8gU29tZSBmbGFpciDinKhcbiAgICAgICAgICAgIHdyYXBwZXIudG9TdHJpbmcgPSAoKSA9PiBgJHtwcm9wLnRvU3RyaW5nKCl9KCkgeyBbY2FwYWNpdG9yIGNvZGVdIH1gO1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdyYXBwZXIsICduYW1lJywge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBwcm9wLFxuICAgICAgICAgICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gd3JhcHBlcjtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgYWRkTGlzdGVuZXIgPSBjcmVhdGVQbHVnaW5NZXRob2RXcmFwcGVyKCdhZGRMaXN0ZW5lcicpO1xuICAgICAgICBjb25zdCByZW1vdmVMaXN0ZW5lciA9IGNyZWF0ZVBsdWdpbk1ldGhvZFdyYXBwZXIoJ3JlbW92ZUxpc3RlbmVyJyk7XG4gICAgICAgIGNvbnN0IGFkZExpc3RlbmVyTmF0aXZlID0gKGV2ZW50TmFtZSwgY2FsbGJhY2spID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNhbGwgPSBhZGRMaXN0ZW5lcih7IGV2ZW50TmFtZSB9LCBjYWxsYmFjayk7XG4gICAgICAgICAgICBjb25zdCByZW1vdmUgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2FsbGJhY2tJZCA9IGF3YWl0IGNhbGw7XG4gICAgICAgICAgICAgICAgcmVtb3ZlTGlzdGVuZXIoe1xuICAgICAgICAgICAgICAgICAgICBldmVudE5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrSWQsXG4gICAgICAgICAgICAgICAgfSwgY2FsbGJhY2spO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNvbnN0IHAgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gY2FsbC50aGVuKCgpID0+IHJlc29sdmUoeyByZW1vdmUgfSkpKTtcbiAgICAgICAgICAgIHAucmVtb3ZlID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgVXNpbmcgYWRkTGlzdGVuZXIoKSB3aXRob3V0ICdhd2FpdCcgaXMgZGVwcmVjYXRlZC5gKTtcbiAgICAgICAgICAgICAgICBhd2FpdCByZW1vdmUoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXR1cm4gcDtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgcHJveHkgPSBuZXcgUHJveHkoe30sIHtcbiAgICAgICAgICAgIGdldChfLCBwcm9wKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChwcm9wKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC9pc3N1ZXMvMjAwMzBcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnJCR0eXBlb2YnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAndG9KU09OJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoKSA9PiAoe30pO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdhZGRMaXN0ZW5lcic6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGx1Z2luSGVhZGVyID8gYWRkTGlzdGVuZXJOYXRpdmUgOiBhZGRMaXN0ZW5lcjtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAncmVtb3ZlTGlzdGVuZXInOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlbW92ZUxpc3RlbmVyO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZVBsdWdpbk1ldGhvZFdyYXBwZXIocHJvcCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICAgIFBsdWdpbnNbcGx1Z2luTmFtZV0gPSBwcm94eTtcbiAgICAgICAgcmVnaXN0ZXJlZFBsdWdpbnMuc2V0KHBsdWdpbk5hbWUsIHtcbiAgICAgICAgICAgIG5hbWU6IHBsdWdpbk5hbWUsXG4gICAgICAgICAgICBwcm94eSxcbiAgICAgICAgICAgIHBsYXRmb3JtczogbmV3IFNldChbLi4uT2JqZWN0LmtleXMoanNJbXBsZW1lbnRhdGlvbnMpLCAuLi4ocGx1Z2luSGVhZGVyID8gW3BsYXRmb3JtXSA6IFtdKV0pLFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHByb3h5O1xuICAgIH07XG4gICAgLy8gQWRkIGluIGNvbnZlcnRGaWxlU3JjIGZvciB3ZWIsIGl0IHdpbGwgYWxyZWFkeSBiZSBhdmFpbGFibGUgaW4gbmF0aXZlIGNvbnRleHRcbiAgICBpZiAoIWNhcC5jb252ZXJ0RmlsZVNyYykge1xuICAgICAgICBjYXAuY29udmVydEZpbGVTcmMgPSAoZmlsZVBhdGgpID0+IGZpbGVQYXRoO1xuICAgIH1cbiAgICBjYXAuZ2V0UGxhdGZvcm0gPSBnZXRQbGF0Zm9ybTtcbiAgICBjYXAuaGFuZGxlRXJyb3IgPSBoYW5kbGVFcnJvcjtcbiAgICBjYXAuaXNOYXRpdmVQbGF0Zm9ybSA9IGlzTmF0aXZlUGxhdGZvcm07XG4gICAgY2FwLmlzUGx1Z2luQXZhaWxhYmxlID0gaXNQbHVnaW5BdmFpbGFibGU7XG4gICAgY2FwLnJlZ2lzdGVyUGx1Z2luID0gcmVnaXN0ZXJQbHVnaW47XG4gICAgY2FwLkV4Y2VwdGlvbiA9IENhcGFjaXRvckV4Y2VwdGlvbjtcbiAgICBjYXAuREVCVUcgPSAhIWNhcC5ERUJVRztcbiAgICBjYXAuaXNMb2dnaW5nRW5hYmxlZCA9ICEhY2FwLmlzTG9nZ2luZ0VuYWJsZWQ7XG4gICAgcmV0dXJuIGNhcDtcbn07XG5leHBvcnQgY29uc3QgaW5pdENhcGFjaXRvckdsb2JhbCA9ICh3aW4pID0+ICh3aW4uQ2FwYWNpdG9yID0gY3JlYXRlQ2FwYWNpdG9yKHdpbikpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cnVudGltZS5qcy5tYXAiLCAiaW1wb3J0IHsgaW5pdENhcGFjaXRvckdsb2JhbCB9IGZyb20gJy4vcnVudGltZSc7XG5leHBvcnQgY29uc3QgQ2FwYWNpdG9yID0gLyojX19QVVJFX18qLyBpbml0Q2FwYWNpdG9yR2xvYmFsKHR5cGVvZiBnbG9iYWxUaGlzICE9PSAndW5kZWZpbmVkJ1xuICAgID8gZ2xvYmFsVGhpc1xuICAgIDogdHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnXG4gICAgICAgID8gc2VsZlxuICAgICAgICA6IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnXG4gICAgICAgICAgICA/IHdpbmRvd1xuICAgICAgICAgICAgOiB0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJ1xuICAgICAgICAgICAgICAgID8gZ2xvYmFsXG4gICAgICAgICAgICAgICAgOiB7fSk7XG5leHBvcnQgY29uc3QgcmVnaXN0ZXJQbHVnaW4gPSBDYXBhY2l0b3IucmVnaXN0ZXJQbHVnaW47XG4vLyMgc291cmNlTWFwcGluZ1VSTD1nbG9iYWwuanMubWFwIiwgImltcG9ydCB7IENhcGFjaXRvciB9IGZyb20gJy4vZ2xvYmFsJztcbmltcG9ydCB7IEV4Y2VwdGlvbkNvZGUgfSBmcm9tICcuL3V0aWwnO1xuLyoqXG4gKiBCYXNlIGNsYXNzIHdlYiBwbHVnaW5zIHNob3VsZCBleHRlbmQuXG4gKi9cbmV4cG9ydCBjbGFzcyBXZWJQbHVnaW4ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmxpc3RlbmVycyA9IHt9O1xuICAgICAgICB0aGlzLnJldGFpbmVkRXZlbnRBcmd1bWVudHMgPSB7fTtcbiAgICAgICAgdGhpcy53aW5kb3dMaXN0ZW5lcnMgPSB7fTtcbiAgICB9XG4gICAgYWRkTGlzdGVuZXIoZXZlbnROYW1lLCBsaXN0ZW5lckZ1bmMpIHtcbiAgICAgICAgbGV0IGZpcnN0TGlzdGVuZXIgPSBmYWxzZTtcbiAgICAgICAgY29uc3QgbGlzdGVuZXJzID0gdGhpcy5saXN0ZW5lcnNbZXZlbnROYW1lXTtcbiAgICAgICAgaWYgKCFsaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIHRoaXMubGlzdGVuZXJzW2V2ZW50TmFtZV0gPSBbXTtcbiAgICAgICAgICAgIGZpcnN0TGlzdGVuZXIgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubGlzdGVuZXJzW2V2ZW50TmFtZV0ucHVzaChsaXN0ZW5lckZ1bmMpO1xuICAgICAgICAvLyBJZiB3ZSBoYXZlbid0IGFkZGVkIGEgd2luZG93IGxpc3RlbmVyIGZvciB0aGlzIGV2ZW50IGFuZCBpdCByZXF1aXJlcyBvbmUsXG4gICAgICAgIC8vIGdvIGFoZWFkIGFuZCBhZGQgaXRcbiAgICAgICAgY29uc3Qgd2luZG93TGlzdGVuZXIgPSB0aGlzLndpbmRvd0xpc3RlbmVyc1tldmVudE5hbWVdO1xuICAgICAgICBpZiAod2luZG93TGlzdGVuZXIgJiYgIXdpbmRvd0xpc3RlbmVyLnJlZ2lzdGVyZWQpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkV2luZG93TGlzdGVuZXIod2luZG93TGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmaXJzdExpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLnNlbmRSZXRhaW5lZEFyZ3VtZW50c0ZvckV2ZW50KGV2ZW50TmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVtb3ZlID0gYXN5bmMgKCkgPT4gdGhpcy5yZW1vdmVMaXN0ZW5lcihldmVudE5hbWUsIGxpc3RlbmVyRnVuYyk7XG4gICAgICAgIGNvbnN0IHAgPSBQcm9taXNlLnJlc29sdmUoeyByZW1vdmUgfSk7XG4gICAgICAgIHJldHVybiBwO1xuICAgIH1cbiAgICBhc3luYyByZW1vdmVBbGxMaXN0ZW5lcnMoKSB7XG4gICAgICAgIHRoaXMubGlzdGVuZXJzID0ge307XG4gICAgICAgIGZvciAoY29uc3QgbGlzdGVuZXIgaW4gdGhpcy53aW5kb3dMaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlV2luZG93TGlzdGVuZXIodGhpcy53aW5kb3dMaXN0ZW5lcnNbbGlzdGVuZXJdKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLndpbmRvd0xpc3RlbmVycyA9IHt9O1xuICAgIH1cbiAgICBub3RpZnlMaXN0ZW5lcnMoZXZlbnROYW1lLCBkYXRhLCByZXRhaW5VbnRpbENvbnN1bWVkKSB7XG4gICAgICAgIGNvbnN0IGxpc3RlbmVycyA9IHRoaXMubGlzdGVuZXJzW2V2ZW50TmFtZV07XG4gICAgICAgIGlmICghbGlzdGVuZXJzKSB7XG4gICAgICAgICAgICBpZiAocmV0YWluVW50aWxDb25zdW1lZCkge1xuICAgICAgICAgICAgICAgIGxldCBhcmdzID0gdGhpcy5yZXRhaW5lZEV2ZW50QXJndW1lbnRzW2V2ZW50TmFtZV07XG4gICAgICAgICAgICAgICAgaWYgKCFhcmdzKSB7XG4gICAgICAgICAgICAgICAgICAgIGFyZ3MgPSBbXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYXJncy5wdXNoKGRhdGEpO1xuICAgICAgICAgICAgICAgIHRoaXMucmV0YWluZWRFdmVudEFyZ3VtZW50c1tldmVudE5hbWVdID0gYXJncztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsaXN0ZW5lcnMuZm9yRWFjaCgobGlzdGVuZXIpID0+IGxpc3RlbmVyKGRhdGEpKTtcbiAgICB9XG4gICAgaGFzTGlzdGVuZXJzKGV2ZW50TmFtZSkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIHJldHVybiAhISgoX2EgPSB0aGlzLmxpc3RlbmVyc1tldmVudE5hbWVdKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubGVuZ3RoKTtcbiAgICB9XG4gICAgcmVnaXN0ZXJXaW5kb3dMaXN0ZW5lcih3aW5kb3dFdmVudE5hbWUsIHBsdWdpbkV2ZW50TmFtZSkge1xuICAgICAgICB0aGlzLndpbmRvd0xpc3RlbmVyc1twbHVnaW5FdmVudE5hbWVdID0ge1xuICAgICAgICAgICAgcmVnaXN0ZXJlZDogZmFsc2UsXG4gICAgICAgICAgICB3aW5kb3dFdmVudE5hbWUsXG4gICAgICAgICAgICBwbHVnaW5FdmVudE5hbWUsXG4gICAgICAgICAgICBoYW5kbGVyOiAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm5vdGlmeUxpc3RlbmVycyhwbHVnaW5FdmVudE5hbWUsIGV2ZW50KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgfVxuICAgIHVuaW1wbGVtZW50ZWQobXNnID0gJ25vdCBpbXBsZW1lbnRlZCcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBDYXBhY2l0b3IuRXhjZXB0aW9uKG1zZywgRXhjZXB0aW9uQ29kZS5VbmltcGxlbWVudGVkKTtcbiAgICB9XG4gICAgdW5hdmFpbGFibGUobXNnID0gJ25vdCBhdmFpbGFibGUnKSB7XG4gICAgICAgIHJldHVybiBuZXcgQ2FwYWNpdG9yLkV4Y2VwdGlvbihtc2csIEV4Y2VwdGlvbkNvZGUuVW5hdmFpbGFibGUpO1xuICAgIH1cbiAgICBhc3luYyByZW1vdmVMaXN0ZW5lcihldmVudE5hbWUsIGxpc3RlbmVyRnVuYykge1xuICAgICAgICBjb25zdCBsaXN0ZW5lcnMgPSB0aGlzLmxpc3RlbmVyc1tldmVudE5hbWVdO1xuICAgICAgICBpZiAoIWxpc3RlbmVycykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGluZGV4ID0gbGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXJGdW5jKTtcbiAgICAgICAgdGhpcy5saXN0ZW5lcnNbZXZlbnROYW1lXS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAvLyBJZiB0aGVyZSBhcmUgbm8gbW9yZSBsaXN0ZW5lcnMgZm9yIHRoaXMgdHlwZSBvZiBldmVudCxcbiAgICAgICAgLy8gcmVtb3ZlIHRoZSB3aW5kb3cgbGlzdGVuZXJcbiAgICAgICAgaWYgKCF0aGlzLmxpc3RlbmVyc1tldmVudE5hbWVdLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVXaW5kb3dMaXN0ZW5lcih0aGlzLndpbmRvd0xpc3RlbmVyc1tldmVudE5hbWVdKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhZGRXaW5kb3dMaXN0ZW5lcihoYW5kbGUpIHtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoaGFuZGxlLndpbmRvd0V2ZW50TmFtZSwgaGFuZGxlLmhhbmRsZXIpO1xuICAgICAgICBoYW5kbGUucmVnaXN0ZXJlZCA9IHRydWU7XG4gICAgfVxuICAgIHJlbW92ZVdpbmRvd0xpc3RlbmVyKGhhbmRsZSkge1xuICAgICAgICBpZiAoIWhhbmRsZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKGhhbmRsZS53aW5kb3dFdmVudE5hbWUsIGhhbmRsZS5oYW5kbGVyKTtcbiAgICAgICAgaGFuZGxlLnJlZ2lzdGVyZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgc2VuZFJldGFpbmVkQXJndW1lbnRzRm9yRXZlbnQoZXZlbnROYW1lKSB7XG4gICAgICAgIGNvbnN0IGFyZ3MgPSB0aGlzLnJldGFpbmVkRXZlbnRBcmd1bWVudHNbZXZlbnROYW1lXTtcbiAgICAgICAgaWYgKCFhcmdzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZGVsZXRlIHRoaXMucmV0YWluZWRFdmVudEFyZ3VtZW50c1tldmVudE5hbWVdO1xuICAgICAgICBhcmdzLmZvckVhY2goKGFyZykgPT4ge1xuICAgICAgICAgICAgdGhpcy5ub3RpZnlMaXN0ZW5lcnMoZXZlbnROYW1lLCBhcmcpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD13ZWItcGx1Z2luLmpzLm1hcCIsICJpbXBvcnQgeyByZWdpc3RlclBsdWdpbiB9IGZyb20gJy4vZ2xvYmFsJztcbmltcG9ydCB7IFdlYlBsdWdpbiB9IGZyb20gJy4vd2ViLXBsdWdpbic7XG5leHBvcnQgY29uc3QgV2ViVmlldyA9IC8qI19fUFVSRV9fKi8gcmVnaXN0ZXJQbHVnaW4oJ1dlYlZpZXcnKTtcbi8qKioqKioqKiBFTkQgV0VCIFZJRVcgUExVR0lOICoqKioqKioqL1xuLyoqKioqKioqIENPT0tJRVMgUExVR0lOICoqKioqKioqL1xuLyoqXG4gKiBTYWZlbHkgd2ViIGVuY29kZSBhIHN0cmluZyB2YWx1ZSAoaW5zcGlyZWQgYnkganMtY29va2llKVxuICogQHBhcmFtIHN0ciBUaGUgc3RyaW5nIHZhbHVlIHRvIGVuY29kZVxuICovXG5jb25zdCBlbmNvZGUgPSAoc3RyKSA9PiBlbmNvZGVVUklDb21wb25lbnQoc3RyKVxuICAgIC5yZXBsYWNlKC8lKDJbMzQ2Ql18NUV8NjB8N0MpL2csIGRlY29kZVVSSUNvbXBvbmVudClcbiAgICAucmVwbGFjZSgvWygpXS9nLCBlc2NhcGUpO1xuLyoqXG4gKiBTYWZlbHkgd2ViIGRlY29kZSBhIHN0cmluZyB2YWx1ZSAoaW5zcGlyZWQgYnkganMtY29va2llKVxuICogQHBhcmFtIHN0ciBUaGUgc3RyaW5nIHZhbHVlIHRvIGRlY29kZVxuICovXG5jb25zdCBkZWNvZGUgPSAoc3RyKSA9PiBzdHIucmVwbGFjZSgvKCVbXFxkQS1GXXsyfSkrL2dpLCBkZWNvZGVVUklDb21wb25lbnQpO1xuZXhwb3J0IGNsYXNzIENhcGFjaXRvckNvb2tpZXNQbHVnaW5XZWIgZXh0ZW5kcyBXZWJQbHVnaW4ge1xuICAgIGFzeW5jIGdldENvb2tpZXMoKSB7XG4gICAgICAgIGNvbnN0IGNvb2tpZXMgPSBkb2N1bWVudC5jb29raWU7XG4gICAgICAgIGNvbnN0IGNvb2tpZU1hcCA9IHt9O1xuICAgICAgICBjb29raWVzLnNwbGl0KCc7JykuZm9yRWFjaCgoY29va2llKSA9PiB7XG4gICAgICAgICAgICBpZiAoY29va2llLmxlbmd0aCA8PSAwKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIC8vIFJlcGxhY2UgZmlyc3QgXCI9XCIgd2l0aCBDQVBfQ09PS0lFIHRvIHByZXZlbnQgc3BsaXR0aW5nIG9uIGFkZGl0aW9uYWwgXCI9XCJcbiAgICAgICAgICAgIGxldCBba2V5LCB2YWx1ZV0gPSBjb29raWUucmVwbGFjZSgvPS8sICdDQVBfQ09PS0lFJykuc3BsaXQoJ0NBUF9DT09LSUUnKTtcbiAgICAgICAgICAgIGtleSA9IGRlY29kZShrZXkpLnRyaW0oKTtcbiAgICAgICAgICAgIHZhbHVlID0gZGVjb2RlKHZhbHVlKS50cmltKCk7XG4gICAgICAgICAgICBjb29raWVNYXBba2V5XSA9IHZhbHVlO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGNvb2tpZU1hcDtcbiAgICB9XG4gICAgYXN5bmMgc2V0Q29va2llKG9wdGlvbnMpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFNhZmVseSBFbmNvZGVkIEtleS9WYWx1ZVxuICAgICAgICAgICAgY29uc3QgZW5jb2RlZEtleSA9IGVuY29kZShvcHRpb25zLmtleSk7XG4gICAgICAgICAgICBjb25zdCBlbmNvZGVkVmFsdWUgPSBlbmNvZGUob3B0aW9ucy52YWx1ZSk7XG4gICAgICAgICAgICAvLyBDbGVhbiAmIHNhbml0aXplIG9wdGlvbnNcbiAgICAgICAgICAgIGNvbnN0IGV4cGlyZXMgPSBgOyBleHBpcmVzPSR7KG9wdGlvbnMuZXhwaXJlcyB8fCAnJykucmVwbGFjZSgnZXhwaXJlcz0nLCAnJyl9YDsgLy8gRGVmYXVsdCBpcyBcIjsgZXhwaXJlcz1cIlxuICAgICAgICAgICAgY29uc3QgcGF0aCA9IChvcHRpb25zLnBhdGggfHwgJy8nKS5yZXBsYWNlKCdwYXRoPScsICcnKTsgLy8gRGVmYXVsdCBpcyBcInBhdGg9L1wiXG4gICAgICAgICAgICBjb25zdCBkb21haW4gPSBvcHRpb25zLnVybCAhPSBudWxsICYmIG9wdGlvbnMudXJsLmxlbmd0aCA+IDAgPyBgZG9tYWluPSR7b3B0aW9ucy51cmx9YCA6ICcnO1xuICAgICAgICAgICAgZG9jdW1lbnQuY29va2llID0gYCR7ZW5jb2RlZEtleX09JHtlbmNvZGVkVmFsdWUgfHwgJyd9JHtleHBpcmVzfTsgcGF0aD0ke3BhdGh9OyAke2RvbWFpbn07YDtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXN5bmMgZGVsZXRlQ29va2llKG9wdGlvbnMpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGAke29wdGlvbnMua2V5fT07IE1heC1BZ2U9MGA7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIGNsZWFyQ29va2llcygpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IGNvb2tpZXMgPSBkb2N1bWVudC5jb29raWUuc3BsaXQoJzsnKSB8fCBbXTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgY29va2llIG9mIGNvb2tpZXMpIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5jb29raWUgPSBjb29raWUucmVwbGFjZSgvXiArLywgJycpLnJlcGxhY2UoLz0uKi8sIGA9O2V4cGlyZXM9JHtuZXcgRGF0ZSgpLnRvVVRDU3RyaW5nKCl9O3BhdGg9L2ApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBjbGVhckFsbENvb2tpZXMoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmNsZWFyQ29va2llcygpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydCBjb25zdCBDYXBhY2l0b3JDb29raWVzID0gcmVnaXN0ZXJQbHVnaW4oJ0NhcGFjaXRvckNvb2tpZXMnLCB7XG4gICAgd2ViOiAoKSA9PiBuZXcgQ2FwYWNpdG9yQ29va2llc1BsdWdpbldlYigpLFxufSk7XG4vLyBVVElMSVRZIEZVTkNUSU9OU1xuLyoqXG4gKiBSZWFkIGluIGEgQmxvYiB2YWx1ZSBhbmQgcmV0dXJuIGl0IGFzIGEgYmFzZTY0IHN0cmluZ1xuICogQHBhcmFtIGJsb2IgVGhlIGJsb2IgdmFsdWUgdG8gY29udmVydCB0byBhIGJhc2U2NCBzdHJpbmdcbiAqL1xuZXhwb3J0IGNvbnN0IHJlYWRCbG9iQXNCYXNlNjQgPSBhc3luYyAoYmxvYikgPT4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgcmVhZGVyLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgYmFzZTY0U3RyaW5nID0gcmVhZGVyLnJlc3VsdDtcbiAgICAgICAgLy8gcmVtb3ZlIHByZWZpeCBcImRhdGE6YXBwbGljYXRpb24vcGRmO2Jhc2U2NCxcIlxuICAgICAgICByZXNvbHZlKGJhc2U2NFN0cmluZy5pbmRleE9mKCcsJykgPj0gMCA/IGJhc2U2NFN0cmluZy5zcGxpdCgnLCcpWzFdIDogYmFzZTY0U3RyaW5nKTtcbiAgICB9O1xuICAgIHJlYWRlci5vbmVycm9yID0gKGVycm9yKSA9PiByZWplY3QoZXJyb3IpO1xuICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGJsb2IpO1xufSk7XG4vKipcbiAqIE5vcm1hbGl6ZSBhbiBIdHRwSGVhZGVycyBtYXAgYnkgbG93ZXJjYXNpbmcgYWxsIG9mIHRoZSB2YWx1ZXNcbiAqIEBwYXJhbSBoZWFkZXJzIFRoZSBIdHRwSGVhZGVycyBvYmplY3QgdG8gbm9ybWFsaXplXG4gKi9cbmNvbnN0IG5vcm1hbGl6ZUh0dHBIZWFkZXJzID0gKGhlYWRlcnMgPSB7fSkgPT4ge1xuICAgIGNvbnN0IG9yaWdpbmFsS2V5cyA9IE9iamVjdC5rZXlzKGhlYWRlcnMpO1xuICAgIGNvbnN0IGxvd2VyZWRLZXlzID0gT2JqZWN0LmtleXMoaGVhZGVycykubWFwKChrKSA9PiBrLnRvTG9jYWxlTG93ZXJDYXNlKCkpO1xuICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSBsb3dlcmVkS2V5cy5yZWR1Y2UoKGFjYywga2V5LCBpbmRleCkgPT4ge1xuICAgICAgICBhY2Nba2V5XSA9IGhlYWRlcnNbb3JpZ2luYWxLZXlzW2luZGV4XV07XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgfSwge30pO1xuICAgIHJldHVybiBub3JtYWxpemVkO1xufTtcbi8qKlxuICogQnVpbGRzIGEgc3RyaW5nIG9mIHVybCBwYXJhbWV0ZXJzIHRoYXRcbiAqIEBwYXJhbSBwYXJhbXMgQSBtYXAgb2YgdXJsIHBhcmFtZXRlcnNcbiAqIEBwYXJhbSBzaG91bGRFbmNvZGUgdHJ1ZSBpZiB5b3Ugc2hvdWxkIGVuY29kZVVSSUNvbXBvbmVudCgpIHRoZSB2YWx1ZXMgKHRydWUgYnkgZGVmYXVsdClcbiAqL1xuY29uc3QgYnVpbGRVcmxQYXJhbXMgPSAocGFyYW1zLCBzaG91bGRFbmNvZGUgPSB0cnVlKSA9PiB7XG4gICAgaWYgKCFwYXJhbXMpXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIGNvbnN0IG91dHB1dCA9IE9iamVjdC5lbnRyaWVzKHBhcmFtcykucmVkdWNlKChhY2N1bXVsYXRvciwgZW50cnkpID0+IHtcbiAgICAgICAgY29uc3QgW2tleSwgdmFsdWVdID0gZW50cnk7XG4gICAgICAgIGxldCBlbmNvZGVkVmFsdWU7XG4gICAgICAgIGxldCBpdGVtO1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIGl0ZW0gPSAnJztcbiAgICAgICAgICAgIHZhbHVlLmZvckVhY2goKHN0cikgPT4ge1xuICAgICAgICAgICAgICAgIGVuY29kZWRWYWx1ZSA9IHNob3VsZEVuY29kZSA/IGVuY29kZVVSSUNvbXBvbmVudChzdHIpIDogc3RyO1xuICAgICAgICAgICAgICAgIGl0ZW0gKz0gYCR7a2V5fT0ke2VuY29kZWRWYWx1ZX0mYDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gbGFzdCBjaGFyYWN0ZXIgd2lsbCBhbHdheXMgYmUgXCImXCIgc28gc2xpY2UgaXQgb2ZmXG4gICAgICAgICAgICBpdGVtLnNsaWNlKDAsIC0xKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGVuY29kZWRWYWx1ZSA9IHNob3VsZEVuY29kZSA/IGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSkgOiB2YWx1ZTtcbiAgICAgICAgICAgIGl0ZW0gPSBgJHtrZXl9PSR7ZW5jb2RlZFZhbHVlfWA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGAke2FjY3VtdWxhdG9yfSYke2l0ZW19YDtcbiAgICB9LCAnJyk7XG4gICAgLy8gUmVtb3ZlIGluaXRpYWwgXCImXCIgZnJvbSB0aGUgcmVkdWNlXG4gICAgcmV0dXJuIG91dHB1dC5zdWJzdHIoMSk7XG59O1xuLyoqXG4gKiBCdWlsZCB0aGUgUmVxdWVzdEluaXQgb2JqZWN0IGJhc2VkIG9uIHRoZSBvcHRpb25zIHBhc3NlZCBpbnRvIHRoZSBpbml0aWFsIHJlcXVlc3RcbiAqIEBwYXJhbSBvcHRpb25zIFRoZSBIdHRwIHBsdWdpbiBvcHRpb25zXG4gKiBAcGFyYW0gZXh0cmEgQW55IGV4dHJhIFJlcXVlc3RJbml0IHZhbHVlc1xuICovXG5leHBvcnQgY29uc3QgYnVpbGRSZXF1ZXN0SW5pdCA9IChvcHRpb25zLCBleHRyYSA9IHt9KSA9PiB7XG4gICAgY29uc3Qgb3V0cHV0ID0gT2JqZWN0LmFzc2lnbih7IG1ldGhvZDogb3B0aW9ucy5tZXRob2QgfHwgJ0dFVCcsIGhlYWRlcnM6IG9wdGlvbnMuaGVhZGVycyB9LCBleHRyYSk7XG4gICAgLy8gR2V0IHRoZSBjb250ZW50LXR5cGVcbiAgICBjb25zdCBoZWFkZXJzID0gbm9ybWFsaXplSHR0cEhlYWRlcnMob3B0aW9ucy5oZWFkZXJzKTtcbiAgICBjb25zdCB0eXBlID0gaGVhZGVyc1snY29udGVudC10eXBlJ10gfHwgJyc7XG4gICAgLy8gSWYgYm9keSBpcyBhbHJlYWR5IGEgc3RyaW5nLCB0aGVuIHBhc3MgaXQgdGhyb3VnaCBhcy1pcy5cbiAgICBpZiAodHlwZW9mIG9wdGlvbnMuZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgb3V0cHV0LmJvZHkgPSBvcHRpb25zLmRhdGE7XG4gICAgfVxuICAgIC8vIEJ1aWxkIHJlcXVlc3QgaW5pdGlhbGl6ZXJzIGJhc2VkIG9mZiBvZiBjb250ZW50LXR5cGVcbiAgICBlbHNlIGlmICh0eXBlLmluY2x1ZGVzKCdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnKSkge1xuICAgICAgICBjb25zdCBwYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCk7XG4gICAgICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKG9wdGlvbnMuZGF0YSB8fCB7fSkpIHtcbiAgICAgICAgICAgIHBhcmFtcy5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgb3V0cHV0LmJvZHkgPSBwYXJhbXMudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZS5pbmNsdWRlcygnbXVsdGlwYXJ0L2Zvcm0tZGF0YScpIHx8IG9wdGlvbnMuZGF0YSBpbnN0YW5jZW9mIEZvcm1EYXRhKSB7XG4gICAgICAgIGNvbnN0IGZvcm0gPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgICAgaWYgKG9wdGlvbnMuZGF0YSBpbnN0YW5jZW9mIEZvcm1EYXRhKSB7XG4gICAgICAgICAgICBvcHRpb25zLmRhdGEuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICAgICAgICAgIGZvcm0uYXBwZW5kKGtleSwgdmFsdWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhvcHRpb25zLmRhdGEpKSB7XG4gICAgICAgICAgICAgICAgZm9ybS5hcHBlbmQoa2V5LCBvcHRpb25zLmRhdGFba2V5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgb3V0cHV0LmJvZHkgPSBmb3JtO1xuICAgICAgICBjb25zdCBoZWFkZXJzID0gbmV3IEhlYWRlcnMob3V0cHV0LmhlYWRlcnMpO1xuICAgICAgICBoZWFkZXJzLmRlbGV0ZSgnY29udGVudC10eXBlJyk7IC8vIGNvbnRlbnQtdHlwZSB3aWxsIGJlIHNldCBieSBgd2luZG93LmZldGNoYCB0byBpbmNsdWR5IGJvdW5kYXJ5XG4gICAgICAgIG91dHB1dC5oZWFkZXJzID0gaGVhZGVycztcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZS5pbmNsdWRlcygnYXBwbGljYXRpb24vanNvbicpIHx8IHR5cGVvZiBvcHRpb25zLmRhdGEgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIG91dHB1dC5ib2R5ID0gSlNPTi5zdHJpbmdpZnkob3B0aW9ucy5kYXRhKTtcbiAgICB9XG4gICAgcmV0dXJuIG91dHB1dDtcbn07XG4vLyBXRUIgSU1QTEVNRU5UQVRJT05cbmV4cG9ydCBjbGFzcyBDYXBhY2l0b3JIdHRwUGx1Z2luV2ViIGV4dGVuZHMgV2ViUGx1Z2luIHtcbiAgICAvKipcbiAgICAgKiBQZXJmb3JtIGFuIEh0dHAgcmVxdWVzdCBnaXZlbiBhIHNldCBvZiBvcHRpb25zXG4gICAgICogQHBhcmFtIG9wdGlvbnMgT3B0aW9ucyB0byBidWlsZCB0aGUgSFRUUCByZXF1ZXN0XG4gICAgICovXG4gICAgYXN5bmMgcmVxdWVzdChvcHRpb25zKSB7XG4gICAgICAgIGNvbnN0IHJlcXVlc3RJbml0ID0gYnVpbGRSZXF1ZXN0SW5pdChvcHRpb25zLCBvcHRpb25zLndlYkZldGNoRXh0cmEpO1xuICAgICAgICBjb25zdCB1cmxQYXJhbXMgPSBidWlsZFVybFBhcmFtcyhvcHRpb25zLnBhcmFtcywgb3B0aW9ucy5zaG91bGRFbmNvZGVVcmxQYXJhbXMpO1xuICAgICAgICBjb25zdCB1cmwgPSB1cmxQYXJhbXMgPyBgJHtvcHRpb25zLnVybH0/JHt1cmxQYXJhbXN9YCA6IG9wdGlvbnMudXJsO1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwgcmVxdWVzdEluaXQpO1xuICAgICAgICBjb25zdCBjb250ZW50VHlwZSA9IHJlc3BvbnNlLmhlYWRlcnMuZ2V0KCdjb250ZW50LXR5cGUnKSB8fCAnJztcbiAgICAgICAgLy8gRGVmYXVsdCB0byAndGV4dCcgcmVzcG9uc2VUeXBlIHNvIG5vIHBhcnNpbmcgaGFwcGVuc1xuICAgICAgICBsZXQgeyByZXNwb25zZVR5cGUgPSAndGV4dCcgfSA9IHJlc3BvbnNlLm9rID8gb3B0aW9ucyA6IHt9O1xuICAgICAgICAvLyBJZiB0aGUgcmVzcG9uc2UgY29udGVudC10eXBlIGlzIGpzb24sIGZvcmNlIHRoZSByZXNwb25zZSB0byBiZSBqc29uXG4gICAgICAgIGlmIChjb250ZW50VHlwZS5pbmNsdWRlcygnYXBwbGljYXRpb24vanNvbicpKSB7XG4gICAgICAgICAgICByZXNwb25zZVR5cGUgPSAnanNvbic7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGRhdGE7XG4gICAgICAgIGxldCBibG9iO1xuICAgICAgICBzd2l0Y2ggKHJlc3BvbnNlVHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnYXJyYXlidWZmZXInOlxuICAgICAgICAgICAgY2FzZSAnYmxvYic6XG4gICAgICAgICAgICAgICAgYmxvYiA9IGF3YWl0IHJlc3BvbnNlLmJsb2IoKTtcbiAgICAgICAgICAgICAgICBkYXRhID0gYXdhaXQgcmVhZEJsb2JBc0Jhc2U2NChibG9iKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2pzb24nOlxuICAgICAgICAgICAgICAgIGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdkb2N1bWVudCc6XG4gICAgICAgICAgICBjYXNlICd0ZXh0JzpcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBDb252ZXJ0IGZldGNoIGhlYWRlcnMgdG8gQ2FwYWNpdG9yIEh0dHBIZWFkZXJzXG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSB7fTtcbiAgICAgICAgcmVzcG9uc2UuaGVhZGVycy5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICBoZWFkZXJzW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkYXRhLFxuICAgICAgICAgICAgaGVhZGVycyxcbiAgICAgICAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgICAgICAgdXJsOiByZXNwb25zZS51cmwsXG4gICAgICAgIH07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBlcmZvcm0gYW4gSHR0cCBHRVQgcmVxdWVzdCBnaXZlbiBhIHNldCBvZiBvcHRpb25zXG4gICAgICogQHBhcmFtIG9wdGlvbnMgT3B0aW9ucyB0byBidWlsZCB0aGUgSFRUUCByZXF1ZXN0XG4gICAgICovXG4gICAgYXN5bmMgZ2V0KG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdChPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMpLCB7IG1ldGhvZDogJ0dFVCcgfSkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtIGFuIEh0dHAgUE9TVCByZXF1ZXN0IGdpdmVuIGEgc2V0IG9mIG9wdGlvbnNcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zIHRvIGJ1aWxkIHRoZSBIVFRQIHJlcXVlc3RcbiAgICAgKi9cbiAgICBhc3luYyBwb3N0KG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdChPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMpLCB7IG1ldGhvZDogJ1BPU1QnIH0pKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUGVyZm9ybSBhbiBIdHRwIFBVVCByZXF1ZXN0IGdpdmVuIGEgc2V0IG9mIG9wdGlvbnNcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zIHRvIGJ1aWxkIHRoZSBIVFRQIHJlcXVlc3RcbiAgICAgKi9cbiAgICBhc3luYyBwdXQob3B0aW9ucykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucyksIHsgbWV0aG9kOiAnUFVUJyB9KSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBlcmZvcm0gYW4gSHR0cCBQQVRDSCByZXF1ZXN0IGdpdmVuIGEgc2V0IG9mIG9wdGlvbnNcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zIHRvIGJ1aWxkIHRoZSBIVFRQIHJlcXVlc3RcbiAgICAgKi9cbiAgICBhc3luYyBwYXRjaChvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zKSwgeyBtZXRob2Q6ICdQQVRDSCcgfSkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtIGFuIEh0dHAgREVMRVRFIHJlcXVlc3QgZ2l2ZW4gYSBzZXQgb2Ygb3B0aW9uc1xuICAgICAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbnMgdG8gYnVpbGQgdGhlIEhUVFAgcmVxdWVzdFxuICAgICAqL1xuICAgIGFzeW5jIGRlbGV0ZShvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zKSwgeyBtZXRob2Q6ICdERUxFVEUnIH0pKTtcbiAgICB9XG59XG5leHBvcnQgY29uc3QgQ2FwYWNpdG9ySHR0cCA9IHJlZ2lzdGVyUGx1Z2luKCdDYXBhY2l0b3JIdHRwJywge1xuICAgIHdlYjogKCkgPT4gbmV3IENhcGFjaXRvckh0dHBQbHVnaW5XZWIoKSxcbn0pO1xuLyoqKioqKioqIEVORCBIVFRQIFBMVUdJTiAqKioqKioqKi9cbi8qKioqKioqKiBTWVNURU0gQkFSUyBQTFVHSU4gKioqKioqKiovXG4vKipcbiAqIEF2YWlsYWJsZSBzdGF0dXMgYmFyIHN0eWxlcy5cbiAqL1xuZXhwb3J0IHZhciBTeXN0ZW1CYXJzU3R5bGU7XG4oZnVuY3Rpb24gKFN5c3RlbUJhcnNTdHlsZSkge1xuICAgIC8qKlxuICAgICAqIExpZ2h0IHN5c3RlbSBiYXIgY29udGVudCBvbiBhIGRhcmsgYmFja2dyb3VuZC5cbiAgICAgKlxuICAgICAqIEBzaW5jZSA4LjAuMFxuICAgICAqL1xuICAgIFN5c3RlbUJhcnNTdHlsZVtcIkRhcmtcIl0gPSBcIkRBUktcIjtcbiAgICAvKipcbiAgICAgKiBGb3IgZGFyayBzeXN0ZW0gYmFyIGNvbnRlbnQgb24gYSBsaWdodCBiYWNrZ3JvdW5kLlxuICAgICAqXG4gICAgICogQHNpbmNlIDguMC4wXG4gICAgICovXG4gICAgU3lzdGVtQmFyc1N0eWxlW1wiTGlnaHRcIl0gPSBcIkxJR0hUXCI7XG4gICAgLyoqXG4gICAgICogVGhlIHN0eWxlIGlzIGJhc2VkIG9uIHRoZSBkZXZpY2UgYXBwZWFyYW5jZSBvciB0aGUgdW5kZXJseWluZyBjb250ZW50LlxuICAgICAqIElmIHRoZSBkZXZpY2UgaXMgdXNpbmcgRGFyayBtb2RlLCB0aGUgc3lzdGVtIGJhcnMgY29udGVudCB3aWxsIGJlIGxpZ2h0LlxuICAgICAqIElmIHRoZSBkZXZpY2UgaXMgdXNpbmcgTGlnaHQgbW9kZSwgdGhlIHN5c3RlbSBiYXJzIGNvbnRlbnQgd2lsbCBiZSBkYXJrLlxuICAgICAqXG4gICAgICogQHNpbmNlIDguMC4wXG4gICAgICovXG4gICAgU3lzdGVtQmFyc1N0eWxlW1wiRGVmYXVsdFwiXSA9IFwiREVGQVVMVFwiO1xufSkoU3lzdGVtQmFyc1N0eWxlIHx8IChTeXN0ZW1CYXJzU3R5bGUgPSB7fSkpO1xuLyoqXG4gKiBBdmFpbGFibGUgc3lzdGVtIGJhciB0eXBlcy5cbiAqL1xuZXhwb3J0IHZhciBTeXN0ZW1CYXJUeXBlO1xuKGZ1bmN0aW9uIChTeXN0ZW1CYXJUeXBlKSB7XG4gICAgLyoqXG4gICAgICogVGhlIHRvcCBzdGF0dXMgYmFyIG9uIGJvdGggQW5kcm9pZCBhbmQgaU9TLlxuICAgICAqXG4gICAgICogQHNpbmNlIDguMC4wXG4gICAgICovXG4gICAgU3lzdGVtQmFyVHlwZVtcIlN0YXR1c0JhclwiXSA9IFwiU3RhdHVzQmFyXCI7XG4gICAgLyoqXG4gICAgICogVGhlIG5hdmlnYXRpb24gYmFyIChvciBnZXN0dXJlIGJhciBvbiBpT1MpIG9uIGJvdGggQW5kcm9pZCBhbmQgaU9TLlxuICAgICAqXG4gICAgICogQHNpbmNlIDguMC4wXG4gICAgICovXG4gICAgU3lzdGVtQmFyVHlwZVtcIk5hdmlnYXRpb25CYXJcIl0gPSBcIk5hdmlnYXRpb25CYXJcIjtcbn0pKFN5c3RlbUJhclR5cGUgfHwgKFN5c3RlbUJhclR5cGUgPSB7fSkpO1xuZXhwb3J0IGNsYXNzIFN5c3RlbUJhcnNQbHVnaW5XZWIgZXh0ZW5kcyBXZWJQbHVnaW4ge1xuICAgIGFzeW5jIHNldFN0eWxlKCkge1xuICAgICAgICB0aGlzLnVuYXZhaWxhYmxlKCdub3QgYXZhaWxhYmxlIGZvciB3ZWInKTtcbiAgICB9XG4gICAgYXN5bmMgc2V0QW5pbWF0aW9uKCkge1xuICAgICAgICB0aGlzLnVuYXZhaWxhYmxlKCdub3QgYXZhaWxhYmxlIGZvciB3ZWInKTtcbiAgICB9XG4gICAgYXN5bmMgc2hvdygpIHtcbiAgICAgICAgdGhpcy51bmF2YWlsYWJsZSgnbm90IGF2YWlsYWJsZSBmb3Igd2ViJyk7XG4gICAgfVxuICAgIGFzeW5jIGhpZGUoKSB7XG4gICAgICAgIHRoaXMudW5hdmFpbGFibGUoJ25vdCBhdmFpbGFibGUgZm9yIHdlYicpO1xuICAgIH1cbn1cbmV4cG9ydCBjb25zdCBTeXN0ZW1CYXJzID0gcmVnaXN0ZXJQbHVnaW4oJ1N5c3RlbUJhcnMnLCB7XG4gICAgd2ViOiAoKSA9PiBuZXcgU3lzdGVtQmFyc1BsdWdpbldlYigpLFxufSk7XG4vKioqKioqKiogRU5EIFNZU1RFTSBCQVJTIFBMVUdJTiAqKioqKioqKi9cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvcmUtcGx1Z2lucy5qcy5tYXAiLCAiaW1wb3J0IHR5cGUgeyBIdHRwT3B0aW9ucywgUGVybWlzc2lvblN0YXRlLCBQbHVnaW5MaXN0ZW5lckhhbmRsZSB9IGZyb20gJ0BjYXBhY2l0b3IvY29yZSc7XG5cbmV4cG9ydCB0eXBlIENhbGxiYWNrSUQgPSBzdHJpbmc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGVybWlzc2lvblN0YXR1cyB7XG4gIHB1YmxpY1N0b3JhZ2U6IFBlcm1pc3Npb25TdGF0ZTtcbn1cblxuZXhwb3J0IGVudW0gRGlyZWN0b3J5IHtcbiAgLyoqXG4gICAqIFRoZSBEb2N1bWVudHMgZGlyZWN0b3J5LlxuICAgKiBPbiBpT1MgaXQncyB0aGUgYXBwJ3MgZG9jdW1lbnRzIGRpcmVjdG9yeS5cbiAgICogVXNlIHRoaXMgZGlyZWN0b3J5IHRvIHN0b3JlIHVzZXItZ2VuZXJhdGVkIGNvbnRlbnQuXG4gICAqIE9uIEFuZHJvaWQgaXQncyB0aGUgUHVibGljIERvY3VtZW50cyBmb2xkZXIsIHNvIGl0J3MgYWNjZXNzaWJsZSBmcm9tIG90aGVyIGFwcHMuXG4gICAqIEl0J3Mgbm90IGFjY2Vzc2libGUgb24gQW5kcm9pZCAxMCB1bmxlc3MgdGhlIGFwcCBlbmFibGVzIGxlZ2FjeSBFeHRlcm5hbCBTdG9yYWdlXG4gICAqIGJ5IGFkZGluZyBgYW5kcm9pZDpyZXF1ZXN0TGVnYWN5RXh0ZXJuYWxTdG9yYWdlPVwidHJ1ZVwiYCBpbiB0aGUgYGFwcGxpY2F0aW9uYCB0YWdcbiAgICogaW4gdGhlIGBBbmRyb2lkTWFuaWZlc3QueG1sYC5cbiAgICogT24gQW5kcm9pZCAxMSBvciBuZXdlciB0aGUgYXBwIGNhbiBvbmx5IGFjY2VzcyB0aGUgZmlsZXMvZm9sZGVycyB0aGUgYXBwIGNyZWF0ZWQuXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgRG9jdW1lbnRzID0gJ0RPQ1VNRU5UUycsXG5cbiAgLyoqXG4gICAqIFRoZSBEYXRhIGRpcmVjdG9yeS5cbiAgICogT24gaU9TIGl0IHdpbGwgdXNlIHRoZSBEb2N1bWVudHMgZGlyZWN0b3J5LlxuICAgKiBPbiBBbmRyb2lkIGl0J3MgdGhlIGRpcmVjdG9yeSBob2xkaW5nIGFwcGxpY2F0aW9uIGZpbGVzLlxuICAgKiBGaWxlcyB3aWxsIGJlIGRlbGV0ZWQgd2hlbiB0aGUgYXBwbGljYXRpb24gaXMgdW5pbnN0YWxsZWQuXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgRGF0YSA9ICdEQVRBJyxcblxuICAvKipcbiAgICogVGhlIExpYnJhcnkgZGlyZWN0b3J5LlxuICAgKiBPbiBpT1MgaXQgd2lsbCB1c2UgdGhlIExpYnJhcnkgZGlyZWN0b3J5LlxuICAgKiBPbiBBbmRyb2lkIGl0J3MgdGhlIGRpcmVjdG9yeSBob2xkaW5nIGFwcGxpY2F0aW9uIGZpbGVzLlxuICAgKiBGaWxlcyB3aWxsIGJlIGRlbGV0ZWQgd2hlbiB0aGUgYXBwbGljYXRpb24gaXMgdW5pbnN0YWxsZWQuXG4gICAqXG4gICAqIEBzaW5jZSAxLjEuMFxuICAgKi9cbiAgTGlicmFyeSA9ICdMSUJSQVJZJyxcblxuICAvKipcbiAgICogVGhlIENhY2hlIGRpcmVjdG9yeS5cbiAgICogQ2FuIGJlIGRlbGV0ZWQgaW4gY2FzZXMgb2YgbG93IG1lbW9yeSwgc28gdXNlIHRoaXMgZGlyZWN0b3J5IHRvIHdyaXRlIGFwcC1zcGVjaWZpYyBmaWxlcy5cbiAgICogdGhhdCB5b3VyIGFwcCBjYW4gcmUtY3JlYXRlIGVhc2lseS5cbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICBDYWNoZSA9ICdDQUNIRScsXG5cbiAgLyoqXG4gICAqIFRoZSBleHRlcm5hbCBkaXJlY3RvcnkuXG4gICAqIE9uIGlPUyBpdCB3aWxsIHVzZSB0aGUgRG9jdW1lbnRzIGRpcmVjdG9yeS5cbiAgICogT24gQW5kcm9pZCBpdCdzIHRoZSBkaXJlY3Rvcnkgb24gdGhlIHByaW1hcnkgc2hhcmVkL2V4dGVybmFsXG4gICAqIHN0b3JhZ2UgZGV2aWNlIHdoZXJlIHRoZSBhcHBsaWNhdGlvbiBjYW4gcGxhY2UgcGVyc2lzdGVudCBmaWxlcyBpdCBvd25zLlxuICAgKiBUaGVzZSBmaWxlcyBhcmUgaW50ZXJuYWwgdG8gdGhlIGFwcGxpY2F0aW9ucywgYW5kIG5vdCB0eXBpY2FsbHkgdmlzaWJsZVxuICAgKiB0byB0aGUgdXNlciBhcyBtZWRpYS5cbiAgICogRmlsZXMgd2lsbCBiZSBkZWxldGVkIHdoZW4gdGhlIGFwcGxpY2F0aW9uIGlzIHVuaW5zdGFsbGVkLlxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIEV4dGVybmFsID0gJ0VYVEVSTkFMJyxcblxuICAvKipcbiAgICogVGhlIGV4dGVybmFsIHN0b3JhZ2UgZGlyZWN0b3J5LlxuICAgKiBPbiBpT1MgaXQgd2lsbCB1c2UgdGhlIERvY3VtZW50cyBkaXJlY3RvcnkuXG4gICAqIE9uIEFuZHJvaWQgaXQncyB0aGUgcHJpbWFyeSBzaGFyZWQvZXh0ZXJuYWwgc3RvcmFnZSBkaXJlY3RvcnkuXG4gICAqIEl0J3Mgbm90IGFjY2Vzc2libGUgb24gQW5kcm9pZCAxMCB1bmxlc3MgdGhlIGFwcCBlbmFibGVzIGxlZ2FjeSBFeHRlcm5hbCBTdG9yYWdlXG4gICAqIGJ5IGFkZGluZyBgYW5kcm9pZDpyZXF1ZXN0TGVnYWN5RXh0ZXJuYWxTdG9yYWdlPVwidHJ1ZVwiYCBpbiB0aGUgYGFwcGxpY2F0aW9uYCB0YWdcbiAgICogaW4gdGhlIGBBbmRyb2lkTWFuaWZlc3QueG1sYC5cbiAgICogSXQncyBub3QgYWNjZXNzaWJsZSBvbiBBbmRyb2lkIDExIG9yIG5ld2VyLlxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG5cbiAgRXh0ZXJuYWxTdG9yYWdlID0gJ0VYVEVSTkFMX1NUT1JBR0UnLFxuICAvKipcbiAgICogVGhlIGV4dGVybmFsIGNhY2hlIGRpcmVjdG9yeS5cbiAgICogT24gaU9TIGl0IHdpbGwgdXNlIHRoZSBEb2N1bWVudHMgZGlyZWN0b3J5LlxuICAgKiBPbiBBbmRyb2lkIGl0J3MgdGhlIHByaW1hcnkgc2hhcmVkL2V4dGVybmFsIGNhY2hlLlxuICAgKlxuICAgKiBAc2luY2UgNy4xLjBcbiAgICovXG4gIEV4dGVybmFsQ2FjaGUgPSAnRVhURVJOQUxfQ0FDSEUnLFxuXG4gIC8qKlxuICAgKiBUaGUgTGlicmFyeSBkaXJlY3Rvcnkgd2l0aG91dCBjbG91ZCBiYWNrdXAuIFVzZWQgaW4gaU9TLlxuICAgKiBPbiBBbmRyb2lkIGl0J3MgdGhlIGRpcmVjdG9yeSBob2xkaW5nIGFwcGxpY2F0aW9uIGZpbGVzLlxuICAgKlxuICAgKiBAc2luY2UgNy4xLjBcbiAgICovXG4gIExpYnJhcnlOb0Nsb3VkID0gJ0xJQlJBUllfTk9fQ0xPVUQnLFxuXG4gIC8qKlxuICAgKiBBIHRlbXBvcmFyeSBkaXJlY3RvcnkgZm9yIGlPUy5cbiAgICogT24gQW5kcm9pZCBpdCdzIHRoZSBkaXJlY3RvcnkgaG9sZGluZyB0aGUgYXBwbGljYXRpb24gY2FjaGUuXG4gICAqXG4gICAqIEBzaW5jZSA3LjEuMFxuICAgKi9cbiAgVGVtcG9yYXJ5ID0gJ1RFTVBPUkFSWScsXG59XG5cbmV4cG9ydCBlbnVtIEVuY29kaW5nIHtcbiAgLyoqXG4gICAqIEVpZ2h0LWJpdCBVQ1MgVHJhbnNmb3JtYXRpb24gRm9ybWF0XG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgVVRGOCA9ICd1dGY4JyxcblxuICAvKipcbiAgICogU2V2ZW4tYml0IEFTQ0lJLCBhLmsuYS4gSVNPNjQ2LVVTLCBhLmsuYS4gdGhlIEJhc2ljIExhdGluIGJsb2NrIG9mIHRoZVxuICAgKiBVbmljb2RlIGNoYXJhY3RlciBzZXRcbiAgICogVGhpcyBlbmNvZGluZyBpcyBvbmx5IHN1cHBvcnRlZCBvbiBBbmRyb2lkLlxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIEFTQ0lJID0gJ2FzY2lpJyxcblxuICAvKipcbiAgICogU2l4dGVlbi1iaXQgVUNTIFRyYW5zZm9ybWF0aW9uIEZvcm1hdCwgYnl0ZSBvcmRlciBpZGVudGlmaWVkIGJ5IGFuXG4gICAqIG9wdGlvbmFsIGJ5dGUtb3JkZXIgbWFya1xuICAgKiBUaGlzIGVuY29kaW5nIGlzIG9ubHkgc3VwcG9ydGVkIG9uIEFuZHJvaWQuXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgVVRGMTYgPSAndXRmMTYnLFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFdyaXRlRmlsZU9wdGlvbnMge1xuICAvKipcbiAgICogVGhlIHBhdGggb2YgdGhlIGZpbGUgdG8gd3JpdGVcbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICBwYXRoOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBkYXRhIHRvIHdyaXRlXG4gICAqXG4gICAqIE5vdGU6IEJsb2IgZGF0YSBpcyBvbmx5IHN1cHBvcnRlZCBvbiBXZWIuXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgZGF0YTogc3RyaW5nIHwgQmxvYjtcblxuICAvKipcbiAgICogVGhlIGBEaXJlY3RvcnlgIHRvIHN0b3JlIHRoZSBmaWxlIGluXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgZGlyZWN0b3J5PzogRGlyZWN0b3J5O1xuXG4gIC8qKlxuICAgKiBUaGUgZW5jb2RpbmcgdG8gd3JpdGUgdGhlIGZpbGUgaW4uIElmIG5vdCBwcm92aWRlZCwgZGF0YVxuICAgKiBpcyB3cml0dGVuIGFzIGJhc2U2NCBlbmNvZGVkLlxuICAgKlxuICAgKiBQYXNzIEVuY29kaW5nLlVURjggdG8gd3JpdGUgZGF0YSBhcyBzdHJpbmdcbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICBlbmNvZGluZz86IEVuY29kaW5nO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRvIGNyZWF0ZSBhbnkgbWlzc2luZyBwYXJlbnQgZGlyZWN0b3JpZXMuXG4gICAqXG4gICAqIEBkZWZhdWx0IGZhbHNlXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgcmVjdXJzaXZlPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBBcHBlbmRGaWxlT3B0aW9ucyB7XG4gIC8qKlxuICAgKiBUaGUgcGF0aCBvZiB0aGUgZmlsZSB0byBhcHBlbmRcbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICBwYXRoOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBkYXRhIHRvIHdyaXRlXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgZGF0YTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgYERpcmVjdG9yeWAgdG8gc3RvcmUgdGhlIGZpbGUgaW5cbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICBkaXJlY3Rvcnk/OiBEaXJlY3Rvcnk7XG5cbiAgLyoqXG4gICAqIFRoZSBlbmNvZGluZyB0byB3cml0ZSB0aGUgZmlsZSBpbi4gSWYgbm90IHByb3ZpZGVkLCBkYXRhXG4gICAqIGlzIHdyaXR0ZW4gYXMgYmFzZTY0IGVuY29kZWQuXG4gICAqXG4gICAqIFBhc3MgRW5jb2RpbmcuVVRGOCB0byB3cml0ZSBkYXRhIGFzIHN0cmluZ1xuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIGVuY29kaW5nPzogRW5jb2Rpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVhZEZpbGVPcHRpb25zIHtcbiAgLyoqXG4gICAqIFRoZSBwYXRoIG9mIHRoZSBmaWxlIHRvIHJlYWRcbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICBwYXRoOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBgRGlyZWN0b3J5YCB0byByZWFkIHRoZSBmaWxlIGZyb21cbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICBkaXJlY3Rvcnk/OiBEaXJlY3Rvcnk7XG5cbiAgLyoqXG4gICAqIFRoZSBlbmNvZGluZyB0byByZWFkIHRoZSBmaWxlIGluLCBpZiBub3QgcHJvdmlkZWQsIGRhdGFcbiAgICogaXMgcmVhZCBhcyBiaW5hcnkgYW5kIHJldHVybmVkIGFzIGJhc2U2NCBlbmNvZGVkLlxuICAgKlxuICAgKiBQYXNzIEVuY29kaW5nLlVURjggdG8gcmVhZCBkYXRhIGFzIHN0cmluZ1xuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIGVuY29kaW5nPzogRW5jb2Rpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBvZmZzZXQgdG8gc3RhcnQgcmVhZGluZyB0aGUgZmlsZSBmcm9tLCBpbiBieXRlcy5cbiAgICogTmF0aXZlIG9ubHkgKG5vdCBhdmFpbGFibGUgaW4gd2ViKS5cbiAgICogQ2FuIGJlIHVzZWQgaW4gY29uanVuY3Rpb24gd2l0aCBsZW5ndGggdG8gcGFydGlhbGx5IHJlYWQgZmlsZXMuXG4gICAqXG4gICAqIEBzaW5jZSA4LjEuMFxuICAgKiBAZGVmYXVsdCAwXG4gICAqL1xuICBvZmZzZXQ/OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSBsZW5ndGggb2YgZGF0YSB0byByZWFkLCBpbiBieXRlcy5cbiAgICogQW55IG5vbi1wb3NpdGl2ZSB2YWx1ZSBtZWFucyB0byByZWFkIHRvIHRoZSBlbmQgb2YgdGhlIGZpbGUuXG4gICAqIE5hdGl2ZSBvbmx5IChub3QgYXZhaWxhYmxlIGluIHdlYikuXG4gICAqIENhbiBiZSB1c2VkIGluIGNvbmp1bmN0aW9uIHdpdGggb2Zmc2V0IHRvIHBhcnRpYWxseSByZWFkIGZpbGVzLlxuICAgKlxuICAgKiBAc2luY2UgOC4xLjBcbiAgICogQGRlZmF1bHQgLTFcbiAgICovXG4gIGxlbmd0aD86IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZWFkRmlsZUluQ2h1bmtzT3B0aW9ucyBleHRlbmRzIFJlYWRGaWxlT3B0aW9ucyB7XG4gIC8qKlxuICAgKiBTaXplIG9mIHRoZSBjaHVua3MgaW4gYnl0ZXMuXG4gICAqXG4gICAqIEBzaW5jZSA3LjEuMFxuICAgKi9cbiAgY2h1bmtTaXplOiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGVsZXRlRmlsZU9wdGlvbnMge1xuICAvKipcbiAgICogVGhlIHBhdGggb2YgdGhlIGZpbGUgdG8gZGVsZXRlXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgcGF0aDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgYERpcmVjdG9yeWAgdG8gZGVsZXRlIHRoZSBmaWxlIGZyb21cbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICBkaXJlY3Rvcnk/OiBEaXJlY3Rvcnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWtkaXJPcHRpb25zIHtcbiAgLyoqXG4gICAqIFRoZSBwYXRoIG9mIHRoZSBuZXcgZGlyZWN0b3J5XG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgcGF0aDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgYERpcmVjdG9yeWAgdG8gbWFrZSB0aGUgbmV3IGRpcmVjdG9yeSBpblxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIGRpcmVjdG9yeT86IERpcmVjdG9yeTtcblxuICAvKipcbiAgICogV2hldGhlciB0byBjcmVhdGUgYW55IG1pc3NpbmcgcGFyZW50IGRpcmVjdG9yaWVzIGFzIHdlbGwuXG4gICAqXG4gICAqIEBkZWZhdWx0IGZhbHNlXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgcmVjdXJzaXZlPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSbWRpck9wdGlvbnMge1xuICAvKipcbiAgICogVGhlIHBhdGggb2YgdGhlIGRpcmVjdG9yeSB0byByZW1vdmVcbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICBwYXRoOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBgRGlyZWN0b3J5YCB0byByZW1vdmUgdGhlIGRpcmVjdG9yeSBmcm9tXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgZGlyZWN0b3J5PzogRGlyZWN0b3J5O1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRvIHJlY3Vyc2l2ZWx5IHJlbW92ZSB0aGUgY29udGVudHMgb2YgdGhlIGRpcmVjdG9yeVxuICAgKlxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIHJlY3Vyc2l2ZT86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVhZGRpck9wdGlvbnMge1xuICAvKipcbiAgICogVGhlIHBhdGggb2YgdGhlIGRpcmVjdG9yeSB0byByZWFkXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgcGF0aDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgYERpcmVjdG9yeWAgdG8gbGlzdCBmaWxlcyBmcm9tXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgZGlyZWN0b3J5PzogRGlyZWN0b3J5O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEdldFVyaU9wdGlvbnMge1xuICAvKipcbiAgICogVGhlIHBhdGggb2YgdGhlIGZpbGUgdG8gZ2V0IHRoZSBVUkkgZm9yXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgcGF0aDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgYERpcmVjdG9yeWAgdG8gZ2V0IHRoZSBmaWxlIHVuZGVyXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgZGlyZWN0b3J5OiBEaXJlY3Rvcnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RhdE9wdGlvbnMge1xuICAvKipcbiAgICogVGhlIHBhdGggb2YgdGhlIGZpbGUgdG8gZ2V0IGRhdGEgYWJvdXRcbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICBwYXRoOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBgRGlyZWN0b3J5YCB0byBnZXQgdGhlIGZpbGUgdW5kZXJcbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICBkaXJlY3Rvcnk/OiBEaXJlY3Rvcnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29weU9wdGlvbnMge1xuICAvKipcbiAgICogVGhlIGV4aXN0aW5nIGZpbGUgb3IgZGlyZWN0b3J5XG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgZnJvbTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgZGVzdGluYXRpb24gZmlsZSBvciBkaXJlY3RvcnlcbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICB0bzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgYERpcmVjdG9yeWAgY29udGFpbmluZyB0aGUgZXhpc3RpbmcgZmlsZSBvciBkaXJlY3RvcnlcbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICBkaXJlY3Rvcnk/OiBEaXJlY3Rvcnk7XG5cbiAgLyoqXG4gICAqIFRoZSBgRGlyZWN0b3J5YCBjb250YWluaW5nIHRoZSBkZXN0aW5hdGlvbiBmaWxlIG9yIGRpcmVjdG9yeS4gSWYgbm90IHN1cHBsaWVkIHdpbGwgdXNlIHRoZSAnZGlyZWN0b3J5J1xuICAgKiBwYXJhbWV0ZXIgYXMgdGhlIGRlc3RpbmF0aW9uXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgdG9EaXJlY3Rvcnk/OiBEaXJlY3Rvcnk7XG59XG5cbmV4cG9ydCB0eXBlIFJlbmFtZU9wdGlvbnMgPSBDb3B5T3B0aW9ucztcblxuZXhwb3J0IGludGVyZmFjZSBSZWFkRmlsZVJlc3VsdCB7XG4gIC8qKlxuICAgKiBUaGUgcmVwcmVzZW50YXRpb24gb2YgdGhlIGRhdGEgY29udGFpbmVkIGluIHRoZSBmaWxlXG4gICAqXG4gICAqIE5vdGU6IEJsb2IgaXMgb25seSBhdmFpbGFibGUgb24gV2ViLiBPbiBuYXRpdmUsIHRoZSBkYXRhIGlzIHJldHVybmVkIGFzIGEgc3RyaW5nLlxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIGRhdGE6IHN0cmluZyB8IEJsb2I7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgV3JpdGVGaWxlUmVzdWx0IHtcbiAgLyoqXG4gICAqIFRoZSB1cmkgd2hlcmUgdGhlIGZpbGUgd2FzIHdyaXR0ZW4gaW50b1xuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIHVyaTogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJlYWRkaXJSZXN1bHQge1xuICAvKipcbiAgICogTGlzdCBvZiBmaWxlcyBhbmQgZGlyZWN0b3JpZXMgaW5zaWRlIHRoZSBkaXJlY3RvcnlcbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICBmaWxlczogRmlsZUluZm9bXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGaWxlSW5mbyB7XG4gIC8qKlxuICAgKiBOYW1lIG9mIHRoZSBmaWxlIG9yIGRpcmVjdG9yeS5cbiAgICpcbiAgICogQHNpbmNlIDcuMS4wXG4gICAqL1xuICBuYW1lOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFR5cGUgb2YgdGhlIGZpbGUuXG4gICAqXG4gICAqIEBzaW5jZSA0LjAuMFxuICAgKi9cbiAgdHlwZTogJ2RpcmVjdG9yeScgfCAnZmlsZSc7XG5cbiAgLyoqXG4gICAqIFNpemUgb2YgdGhlIGZpbGUgaW4gYnl0ZXMuXG4gICAqXG4gICAqIEBzaW5jZSA0LjAuMFxuICAgKi9cbiAgc2l6ZTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaW1lIG9mIGNyZWF0aW9uIGluIG1pbGxpc2Vjb25kcy5cbiAgICpcbiAgICogSXQncyBub3QgYXZhaWxhYmxlIG9uIEFuZHJvaWQgNyBhbmQgb2xkZXIgZGV2aWNlcy5cbiAgICpcbiAgICogQHNpbmNlIDcuMS4wXG4gICAqL1xuICBjdGltZT86IG51bWJlcjtcblxuICAvKipcbiAgICogVGltZSBvZiBsYXN0IG1vZGlmaWNhdGlvbiBpbiBtaWxsaXNlY29uZHMuXG4gICAqXG4gICAqIEBzaW5jZSA3LjEuMFxuICAgKi9cbiAgbXRpbWU6IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIHVyaSBvZiB0aGUgZmlsZS5cbiAgICpcbiAgICogQHNpbmNlIDQuMC4wXG4gICAqL1xuICB1cmk6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBHZXRVcmlSZXN1bHQge1xuICAvKipcbiAgICogVGhlIHVyaSBvZiB0aGUgZmlsZVxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIHVyaTogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBTdGF0UmVzdWx0ID0gRmlsZUluZm87XG5leHBvcnQgaW50ZXJmYWNlIENvcHlSZXN1bHQge1xuICAvKipcbiAgICogVGhlIHVyaSB3aGVyZSB0aGUgZmlsZSB3YXMgY29waWVkIGludG9cbiAgICpcbiAgICogQHNpbmNlIDQuMC4wXG4gICAqL1xuICB1cmk6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEb3dubG9hZEZpbGVPcHRpb25zIGV4dGVuZHMgSHR0cE9wdGlvbnMge1xuICAvKipcbiAgICogVGhlIHBhdGggdGhlIGRvd25sb2FkZWQgZmlsZSBzaG91bGQgYmUgbW92ZWQgdG8uXG4gICAqXG4gICAqIEBzaW5jZSA1LjEuMFxuICAgKi9cbiAgcGF0aDogc3RyaW5nO1xuICAvKipcbiAgICogVGhlIGRpcmVjdG9yeSB0byB3cml0ZSB0aGUgZmlsZSB0by5cbiAgICogSWYgdGhpcyBvcHRpb24gaXMgdXNlZCwgZmlsZVBhdGggY2FuIGJlIGEgcmVsYXRpdmUgcGF0aCByYXRoZXIgdGhhbiBhYnNvbHV0ZS5cbiAgICogVGhlIGRlZmF1bHQgaXMgdGhlIGBEQVRBYCBkaXJlY3RvcnkuXG4gICAqXG4gICAqIEBzaW5jZSA1LjEuMFxuICAgKi9cbiAgZGlyZWN0b3J5PzogRGlyZWN0b3J5O1xuICAvKipcbiAgICogQW4gb3B0aW9uYWwgbGlzdGVuZXIgZnVuY3Rpb24gdG8gcmVjZWl2ZSBkb3dubG9hZGVkIHByb2dyZXNzIGV2ZW50cy5cbiAgICogSWYgdGhpcyBvcHRpb24gaXMgdXNlZCwgcHJvZ3Jlc3MgZXZlbnQgc2hvdWxkIGJlIGRpc3BhdGNoZWQgb24gZXZlcnkgY2h1bmsgcmVjZWl2ZWQuXG4gICAqIENodW5rcyBhcmUgdGhyb3R0bGVkIHRvIGV2ZXJ5IDEwMG1zIG9uIEFuZHJvaWQvaU9TIHRvIGF2b2lkIHNsb3dkb3ducy5cbiAgICpcbiAgICogQHNpbmNlIDUuMS4wXG4gICAqL1xuICBwcm9ncmVzcz86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBXaGV0aGVyIHRvIGNyZWF0ZSBhbnkgbWlzc2luZyBwYXJlbnQgZGlyZWN0b3JpZXMuXG4gICAqXG4gICAqIEBkZWZhdWx0IGZhbHNlXG4gICAqIEBzaW5jZSA1LjEuMlxuICAgKi9cbiAgcmVjdXJzaXZlPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEb3dubG9hZEZpbGVSZXN1bHQge1xuICAvKipcbiAgICogVGhlIHBhdGggdGhlIGZpbGUgd2FzIGRvd25sb2FkZWQgdG8uXG4gICAqXG4gICAqIEBzaW5jZSA1LjEuMFxuICAgKi9cbiAgcGF0aD86IHN0cmluZztcbiAgLyoqXG4gICAqIFRoZSBibG9iIGRhdGEgb2YgdGhlIGRvd25sb2FkZWQgZmlsZS5cbiAgICogVGhpcyBpcyBvbmx5IGF2YWlsYWJsZSBvbiB3ZWIuXG4gICAqXG4gICAqIEBzaW5jZSA1LjEuMFxuICAgKi9cbiAgYmxvYj86IEJsb2I7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJvZ3Jlc3NTdGF0dXMge1xuICAvKipcbiAgICogVGhlIHVybCBvZiB0aGUgZmlsZSBiZWluZyBkb3dubG9hZGVkLlxuICAgKlxuICAgKiBAc2luY2UgNS4xLjBcbiAgICovXG4gIHVybDogc3RyaW5nO1xuICAvKipcbiAgICogVGhlIG51bWJlciBvZiBieXRlcyBkb3dubG9hZGVkIHNvIGZhci5cbiAgICpcbiAgICogQHNpbmNlIDUuMS4wXG4gICAqL1xuICBieXRlczogbnVtYmVyO1xuICAvKipcbiAgICogVGhlIHRvdGFsIG51bWJlciBvZiBieXRlcyB0byBkb3dubG9hZCBmb3IgdGhpcyBmaWxlLlxuICAgKlxuICAgKiBAc2luY2UgNS4xLjBcbiAgICovXG4gIGNvbnRlbnRMZW5ndGg6IG51bWJlcjtcbn1cblxuLyoqXG4gKiBDYWxsYmFjayBmb3IgcmVjZWl2aW5nIGNodW5rcyByZWFkIGZyb20gYSBmaWxlLCBvciBlcnJvciBpZiBzb21ldGhpbmcgd2VudCB3cm9uZy5cbiAqXG4gKiBAc2luY2UgNy4xLjBcbiAqL1xuZXhwb3J0IHR5cGUgUmVhZEZpbGVJbkNodW5rc0NhbGxiYWNrID0gKGNodW5rUmVhZDogUmVhZEZpbGVSZXN1bHQgfCBudWxsLCBlcnI/OiBhbnkpID0+IHZvaWQ7XG5cbi8qKlxuICogQSBsaXN0ZW5lciBmdW5jdGlvbiB0aGF0IHJlY2VpdmVzIHByb2dyZXNzIGV2ZW50cy5cbiAqXG4gKiBAc2luY2UgNS4xLjBcbiAqL1xuZXhwb3J0IHR5cGUgUHJvZ3Jlc3NMaXN0ZW5lciA9IChwcm9ncmVzczogUHJvZ3Jlc3NTdGF0dXMpID0+IHZvaWQ7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmlsZXN5c3RlbVBsdWdpbiB7XG4gIC8qKlxuICAgKiBDaGVjayByZWFkL3dyaXRlIHBlcm1pc3Npb25zLlxuICAgKiBSZXF1aXJlZCBvbiBBbmRyb2lkLCBvbmx5IHdoZW4gdXNpbmcgYERpcmVjdG9yeS5Eb2N1bWVudHNgIG9yXG4gICAqIGBEaXJlY3RvcnkuRXh0ZXJuYWxTdG9yYWdlYC5cbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICBjaGVja1Blcm1pc3Npb25zKCk6IFByb21pc2U8UGVybWlzc2lvblN0YXR1cz47XG5cbiAgLyoqXG4gICAqIFJlcXVlc3QgcmVhZC93cml0ZSBwZXJtaXNzaW9ucy5cbiAgICogUmVxdWlyZWQgb24gQW5kcm9pZCwgb25seSB3aGVuIHVzaW5nIGBEaXJlY3RvcnkuRG9jdW1lbnRzYCBvclxuICAgKiBgRGlyZWN0b3J5LkV4dGVybmFsU3RvcmFnZWAuXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgcmVxdWVzdFBlcm1pc3Npb25zKCk6IFByb21pc2U8UGVybWlzc2lvblN0YXR1cz47XG5cbiAgLyoqXG4gICAqIFJlYWQgYSBmaWxlIGZyb20gZGlza1xuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIHJlYWRGaWxlKG9wdGlvbnM6IFJlYWRGaWxlT3B0aW9ucyk6IFByb21pc2U8UmVhZEZpbGVSZXN1bHQ+O1xuXG4gIC8qKlxuICAgKiBSZWFkIGEgZmlsZSBmcm9tIGRpc2ssIGluIGNodW5rcy5cbiAgICogTmF0aXZlIG9ubHkgKG5vdCBhdmFpbGFibGUgaW4gd2ViKS5cbiAgICogVXNlIHRoZSBjYWxsYmFjayB0byByZWNlaXZlIGVhY2ggcmVhZCBjaHVuay5cbiAgICogSWYgZW1wdHkgY2h1bmsgaXMgcmV0dXJuZWQsIGl0IG1lYW5zIGZpbGUgaGFzIGJlZW4gY29tcGxldGVseSByZWFkLlxuICAgKlxuICAgKiBAc2luY2UgNy4xLjBcbiAgICovXG4gIHJlYWRGaWxlSW5DaHVua3Mob3B0aW9uczogUmVhZEZpbGVJbkNodW5rc09wdGlvbnMsIGNhbGxiYWNrOiBSZWFkRmlsZUluQ2h1bmtzQ2FsbGJhY2spOiBQcm9taXNlPENhbGxiYWNrSUQ+O1xuXG4gIC8qKlxuICAgKiBXcml0ZSBhIGZpbGUgdG8gZGlzayBpbiB0aGUgc3BlY2lmaWVkIGxvY2F0aW9uIG9uIGRldmljZVxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIHdyaXRlRmlsZShvcHRpb25zOiBXcml0ZUZpbGVPcHRpb25zKTogUHJvbWlzZTxXcml0ZUZpbGVSZXN1bHQ+O1xuXG4gIC8qKlxuICAgKiBBcHBlbmQgdG8gYSBmaWxlIG9uIGRpc2sgaW4gdGhlIHNwZWNpZmllZCBsb2NhdGlvbiBvbiBkZXZpY2VcbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICBhcHBlbmRGaWxlKG9wdGlvbnM6IEFwcGVuZEZpbGVPcHRpb25zKTogUHJvbWlzZTx2b2lkPjtcblxuICAvKipcbiAgICogRGVsZXRlIGEgZmlsZSBmcm9tIGRpc2tcbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICBkZWxldGVGaWxlKG9wdGlvbnM6IERlbGV0ZUZpbGVPcHRpb25zKTogUHJvbWlzZTx2b2lkPjtcblxuICAvKipcbiAgICogQ3JlYXRlIGEgZGlyZWN0b3J5LlxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIG1rZGlyKG9wdGlvbnM6IE1rZGlyT3B0aW9ucyk6IFByb21pc2U8dm9pZD47XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhIGRpcmVjdG9yeVxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIHJtZGlyKG9wdGlvbnM6IFJtZGlyT3B0aW9ucyk6IFByb21pc2U8dm9pZD47XG5cbiAgLyoqXG4gICAqIFJldHVybiBhIGxpc3Qgb2YgZmlsZXMgZnJvbSB0aGUgZGlyZWN0b3J5IChub3QgcmVjdXJzaXZlKVxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIHJlYWRkaXIob3B0aW9uczogUmVhZGRpck9wdGlvbnMpOiBQcm9taXNlPFJlYWRkaXJSZXN1bHQ+O1xuXG4gIC8qKlxuICAgKiBSZXR1cm4gZnVsbCBGaWxlIFVSSSBmb3IgYSBwYXRoIGFuZCBkaXJlY3RvcnlcbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICBnZXRVcmkob3B0aW9uczogR2V0VXJpT3B0aW9ucyk6IFByb21pc2U8R2V0VXJpUmVzdWx0PjtcblxuICAvKipcbiAgICogUmV0dXJuIGRhdGEgYWJvdXQgYSBmaWxlXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgc3RhdChvcHRpb25zOiBTdGF0T3B0aW9ucyk6IFByb21pc2U8U3RhdFJlc3VsdD47XG5cbiAgLyoqXG4gICAqIFJlbmFtZSBhIGZpbGUgb3IgZGlyZWN0b3J5XG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgcmVuYW1lKG9wdGlvbnM6IFJlbmFtZU9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+O1xuXG4gIC8qKlxuICAgKiBDb3B5IGEgZmlsZSBvciBkaXJlY3RvcnlcbiAgICpcbiAgICogQHNpbmNlIDEuMC4wXG4gICAqL1xuICBjb3B5KG9wdGlvbnM6IENvcHlPcHRpb25zKTogUHJvbWlzZTxDb3B5UmVzdWx0PjtcblxuICAvKipcbiAgICogUGVyZm9ybSBhIGh0dHAgcmVxdWVzdCB0byBhIHNlcnZlciBhbmQgZG93bmxvYWQgdGhlIGZpbGUgdG8gdGhlIHNwZWNpZmllZCBkZXN0aW5hdGlvbi5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgaGFzIGJlZW4gZGVwcmVjYXRlZCBzaW5jZSB2ZXJzaW9uIDcuMS4wLlxuICAgKiBXZSByZWNvbW1lbmQgdXNpbmcgdGhlIEBjYXBhY2l0b3IvZmlsZS10cmFuc2ZlciBwbHVnaW4gaW5zdGVhZCwgaW4gY29uanVuY3Rpb24gd2l0aCB0aGlzIHBsdWdpbi5cbiAgICpcbiAgICogQHNpbmNlIDUuMS4wXG4gICAqIEBkZXByZWNhdGVkIFVzZSB0aGUgQGNhcGFjaXRvci9maWxlLXRyYW5zZmVyIHBsdWdpbiBpbnN0ZWFkLlxuICAgKi9cbiAgZG93bmxvYWRGaWxlKG9wdGlvbnM6IERvd25sb2FkRmlsZU9wdGlvbnMpOiBQcm9taXNlPERvd25sb2FkRmlsZVJlc3VsdD47XG5cbiAgLyoqXG4gICAqIEFkZCBhIGxpc3RlbmVyIHRvIGZpbGUgZG93bmxvYWQgcHJvZ3Jlc3MgZXZlbnRzLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBoYXMgYmVlbiBkZXByZWNhdGVkIHNpbmNlIHZlcnNpb24gNy4xLjAuXG4gICAqIFdlIHJlY29tbWVuZCB1c2luZyB0aGUgQGNhcGFjaXRvci9maWxlLXRyYW5zZmVyIHBsdWdpbiBpbnN0ZWFkLCBpbiBjb25qdW5jdGlvbiB3aXRoIHRoaXMgcGx1Z2luLlxuICAgKlxuICAgKiBAc2luY2UgNS4xLjBcbiAgICogQGRlcHJlY2F0ZWQgVXNlIHRoZSBAY2FwYWNpdG9yL2ZpbGUtdHJhbnNmZXIgcGx1Z2luIGluc3RlYWQuXG4gICAqL1xuICBhZGRMaXN0ZW5lcihldmVudE5hbWU6ICdwcm9ncmVzcycsIGxpc3RlbmVyRnVuYzogUHJvZ3Jlc3NMaXN0ZW5lcik6IFByb21pc2U8UGx1Z2luTGlzdGVuZXJIYW5kbGU+O1xuXG4gIC8qKlxuICAgKiBSZW1vdmUgYWxsIGxpc3RlbmVycyBmb3IgdGhpcyBwbHVnaW4uXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGhhcyBiZWVuIGRlcHJlY2F0ZWQgc2luY2UgdmVyc2lvbiA3LjEuMC5cbiAgICogV2UgcmVjb21tZW5kIHVzaW5nIHRoZSBAY2FwYWNpdG9yL2ZpbGUtdHJhbnNmZXIgcGx1Z2luIGluc3RlYWQsIGluIGNvbmp1bmN0aW9uIHdpdGggdGhpcyBwbHVnaW4uXG4gICAqXG4gICAqIEBzaW5jZSA1LjIuMFxuICAgKiBAZGVwcmVjYXRlZCBVc2UgdGhlIEBjYXBhY2l0b3IvZmlsZS10cmFuc2ZlciBwbHVnaW4gaW5zdGVhZC5cbiAgICovXG4gIHJlbW92ZUFsbExpc3RlbmVycygpOiBQcm9taXNlPHZvaWQ+O1xufVxuXG4vKipcbiAqIFN0cnVjdHVyZSBmb3IgZXJyb3JzIHJldHVybmVkIGJ5IHRoZSBwbHVnaW4uXG4gKlxuICogYGNvZGVgIGZvbGxvd3MgXCJPUy1QTFVHLUZJTEUtWFhYWFwiIGZvcm1hdFxuICpcbiAqIEBzaW5jZSAxLjAuMFxuICovXG5leHBvcnQgdHlwZSBQbHVnaW5FcnJvciA9IHtcbiAgY29kZTogc3RyaW5nO1xuICBtZXNzYWdlOiBzdHJpbmc7XG59O1xuXG4vKipcbiAqIEBkZXByZWNhdGVkIFVzZSBgUmVhZEZpbGVPcHRpb25zYC5cbiAqIEBzaW5jZSAxLjAuMFxuICovXG5leHBvcnQgdHlwZSBGaWxlUmVhZE9wdGlvbnMgPSBSZWFkRmlsZU9wdGlvbnM7XG5cbi8qKlxuICogQGRlcHJlY2F0ZWQgVXNlIGBSZWFkRmlsZVJlc3VsdGAuXG4gKiBAc2luY2UgMS4wLjBcbiAqL1xuZXhwb3J0IHR5cGUgRmlsZVJlYWRSZXN1bHQgPSBSZWFkRmlsZVJlc3VsdDtcblxuLyoqXG4gKiBAZGVwcmVjYXRlZCBVc2UgYFdyaXRlRmlsZU9wdGlvbnNgLlxuICogQHNpbmNlIDEuMC4wXG4gKi9cbmV4cG9ydCB0eXBlIEZpbGVXcml0ZU9wdGlvbnMgPSBXcml0ZUZpbGVPcHRpb25zO1xuXG4vKipcbiAqIEBkZXByZWNhdGVkIFVzZSBgV3JpdGVGaWxlUmVzdWx0YC5cbiAqIEBzaW5jZSAxLjAuMFxuICovXG5leHBvcnQgdHlwZSBGaWxlV3JpdGVSZXN1bHQgPSBXcml0ZUZpbGVSZXN1bHQ7XG5cbi8qKlxuICogQGRlcHJlY2F0ZWQgVXNlIGBBcHBlbmRGaWxlT3B0aW9uc2AuXG4gKiBAc2luY2UgMS4wLjBcbiAqL1xuZXhwb3J0IHR5cGUgRmlsZUFwcGVuZE9wdGlvbnMgPSBBcHBlbmRGaWxlT3B0aW9ucztcblxuLyoqXG4gKiBAZGVwcmVjYXRlZCBVc2UgYERlbGV0ZUZpbGVPcHRpb25zYC5cbiAqIEBzaW5jZSAxLjAuMFxuICovXG5leHBvcnQgdHlwZSBGaWxlRGVsZXRlT3B0aW9ucyA9IERlbGV0ZUZpbGVPcHRpb25zO1xuXG4vKipcbiAqIEBkZXByZWNhdGVkIFVzZSBgRGlyZWN0b3J5YC5cbiAqIEBzaW5jZSAxLjAuMFxuICovXG5leHBvcnQgY29uc3QgRmlsZXN5c3RlbURpcmVjdG9yeSA9IERpcmVjdG9yeTtcblxuLyoqXG4gKiBAZGVwcmVjYXRlZCBVc2UgYEVuY29kaW5nYC5cbiAqIEBzaW5jZSAxLjAuMFxuICovXG5leHBvcnQgY29uc3QgRmlsZXN5c3RlbUVuY29kaW5nID0gRW5jb2Rpbmc7XG4iLCAiaW1wb3J0IHsgV2ViUGx1Z2luLCBidWlsZFJlcXVlc3RJbml0IH0gZnJvbSAnQGNhcGFjaXRvci9jb3JlJztcblxuaW1wb3J0IHR5cGUge1xuICBBcHBlbmRGaWxlT3B0aW9ucyxcbiAgQ29weU9wdGlvbnMsXG4gIENvcHlSZXN1bHQsXG4gIERlbGV0ZUZpbGVPcHRpb25zLFxuICBGaWxlc3lzdGVtUGx1Z2luLFxuICBHZXRVcmlPcHRpb25zLFxuICBHZXRVcmlSZXN1bHQsXG4gIE1rZGlyT3B0aW9ucyxcbiAgUGVybWlzc2lvblN0YXR1cyxcbiAgUmVhZEZpbGVPcHRpb25zLFxuICBSZWFkRmlsZVJlc3VsdCxcbiAgUmVhZGRpck9wdGlvbnMsXG4gIFJlYWRkaXJSZXN1bHQsXG4gIFJlbmFtZU9wdGlvbnMsXG4gIFJtZGlyT3B0aW9ucyxcbiAgU3RhdE9wdGlvbnMsXG4gIFN0YXRSZXN1bHQsXG4gIFdyaXRlRmlsZU9wdGlvbnMsXG4gIFdyaXRlRmlsZVJlc3VsdCxcbiAgRGlyZWN0b3J5LFxuICBSZWFkRmlsZUluQ2h1bmtzT3B0aW9ucyxcbiAgQ2FsbGJhY2tJRCxcbiAgRG93bmxvYWRGaWxlT3B0aW9ucyxcbiAgRG93bmxvYWRGaWxlUmVzdWx0LFxuICBQcm9ncmVzc1N0YXR1cyxcbiAgUmVhZEZpbGVJbkNodW5rc0NhbGxiYWNrLFxufSBmcm9tICcuL2RlZmluaXRpb25zJztcbmltcG9ydCB7IEVuY29kaW5nIH0gZnJvbSAnLi9kZWZpbml0aW9ucyc7XG5cbmZ1bmN0aW9uIHJlc29sdmUocGF0aDogc3RyaW5nKTogc3RyaW5nIHtcbiAgY29uc3QgcG9zaXggPSBwYXRoLnNwbGl0KCcvJykuZmlsdGVyKChpdGVtKSA9PiBpdGVtICE9PSAnLicpO1xuICBjb25zdCBuZXdQb3NpeDogc3RyaW5nW10gPSBbXTtcblxuICBwb3NpeC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgaWYgKGl0ZW0gPT09ICcuLicgJiYgbmV3UG9zaXgubGVuZ3RoID4gMCAmJiBuZXdQb3NpeFtuZXdQb3NpeC5sZW5ndGggLSAxXSAhPT0gJy4uJykge1xuICAgICAgbmV3UG9zaXgucG9wKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5ld1Bvc2l4LnB1c2goaXRlbSk7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gbmV3UG9zaXguam9pbignLycpO1xufVxuZnVuY3Rpb24gaXNQYXRoUGFyZW50KHBhcmVudDogc3RyaW5nLCBjaGlsZHJlbjogc3RyaW5nKTogYm9vbGVhbiB7XG4gIHBhcmVudCA9IHJlc29sdmUocGFyZW50KTtcbiAgY2hpbGRyZW4gPSByZXNvbHZlKGNoaWxkcmVuKTtcbiAgY29uc3QgcGF0aHNBID0gcGFyZW50LnNwbGl0KCcvJyk7XG4gIGNvbnN0IHBhdGhzQiA9IGNoaWxkcmVuLnNwbGl0KCcvJyk7XG5cbiAgcmV0dXJuIHBhcmVudCAhPT0gY2hpbGRyZW4gJiYgcGF0aHNBLmV2ZXJ5KCh2YWx1ZSwgaW5kZXgpID0+IHZhbHVlID09PSBwYXRoc0JbaW5kZXhdKTtcbn1cblxuZXhwb3J0IGNsYXNzIEZpbGVzeXN0ZW1XZWIgZXh0ZW5kcyBXZWJQbHVnaW4gaW1wbGVtZW50cyBGaWxlc3lzdGVtUGx1Z2luIHtcbiAgcmVhZEZpbGVJbkNodW5rcyhfb3B0aW9uczogUmVhZEZpbGVJbkNodW5rc09wdGlvbnMsIF9jYWxsYmFjazogUmVhZEZpbGVJbkNodW5rc0NhbGxiYWNrKTogUHJvbWlzZTxDYWxsYmFja0lEPiB7XG4gICAgdGhyb3cgdGhpcy51bmF2YWlsYWJsZSgnTWV0aG9kIG5vdCBpbXBsZW1lbnRlZC4nKTtcbiAgfVxuICBEQl9WRVJTSU9OID0gMTtcbiAgREJfTkFNRSA9ICdEaXNjJztcblxuICBwcml2YXRlIF93cml0ZUNtZHM6IHN0cmluZ1tdID0gWydhZGQnLCAncHV0JywgJ2RlbGV0ZSddO1xuICBwcml2YXRlIF9kYj86IElEQkRhdGFiYXNlO1xuICBzdGF0aWMgX2RlYnVnID0gdHJ1ZTtcbiAgYXN5bmMgaW5pdERiKCk6IFByb21pc2U8SURCRGF0YWJhc2U+IHtcbiAgICBpZiAodGhpcy5fZGIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2RiO1xuICAgIH1cbiAgICBpZiAoISgnaW5kZXhlZERCJyBpbiB3aW5kb3cpKSB7XG4gICAgICB0aHJvdyB0aGlzLnVuYXZhaWxhYmxlKFwiVGhpcyBicm93c2VyIGRvZXNuJ3Qgc3VwcG9ydCBJbmRleGVkREJcIik7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPElEQkRhdGFiYXNlPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCByZXF1ZXN0ID0gaW5kZXhlZERCLm9wZW4odGhpcy5EQl9OQU1FLCB0aGlzLkRCX1ZFUlNJT04pO1xuICAgICAgcmVxdWVzdC5vbnVwZ3JhZGVuZWVkZWQgPSBGaWxlc3lzdGVtV2ViLmRvVXBncmFkZTtcbiAgICAgIHJlcXVlc3Qub25zdWNjZXNzID0gKCkgPT4ge1xuICAgICAgICB0aGlzLl9kYiA9IHJlcXVlc3QucmVzdWx0O1xuICAgICAgICByZXNvbHZlKHJlcXVlc3QucmVzdWx0KTtcbiAgICAgIH07XG4gICAgICByZXF1ZXN0Lm9uZXJyb3IgPSAoKSA9PiByZWplY3QocmVxdWVzdC5lcnJvcik7XG4gICAgICByZXF1ZXN0Lm9uYmxvY2tlZCA9ICgpID0+IHtcbiAgICAgICAgY29uc29sZS53YXJuKCdkYiBibG9ja2VkJyk7XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIGRvVXBncmFkZShldmVudDogSURCVmVyc2lvbkNoYW5nZUV2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgZXZlbnRUYXJnZXQgPSBldmVudC50YXJnZXQgYXMgSURCT3BlbkRCUmVxdWVzdDtcbiAgICBjb25zdCBkYiA9IGV2ZW50VGFyZ2V0LnJlc3VsdDtcbiAgICBzd2l0Y2ggKGV2ZW50Lm9sZFZlcnNpb24pIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgIGNhc2UgMTpcbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgaWYgKGRiLm9iamVjdFN0b3JlTmFtZXMuY29udGFpbnMoJ0ZpbGVTdG9yYWdlJykpIHtcbiAgICAgICAgICBkYi5kZWxldGVPYmplY3RTdG9yZSgnRmlsZVN0b3JhZ2UnKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzdG9yZSA9IGRiLmNyZWF0ZU9iamVjdFN0b3JlKCdGaWxlU3RvcmFnZScsIHsga2V5UGF0aDogJ3BhdGgnIH0pO1xuICAgICAgICBzdG9yZS5jcmVhdGVJbmRleCgnYnlfZm9sZGVyJywgJ2ZvbGRlcicpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGRiUmVxdWVzdChjbWQ6IHN0cmluZywgYXJnczogYW55W10pOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnN0IHJlYWRGbGFnID0gdGhpcy5fd3JpdGVDbWRzLmluZGV4T2YoY21kKSAhPT0gLTEgPyAncmVhZHdyaXRlJyA6ICdyZWFkb25seSc7XG4gICAgcmV0dXJuIHRoaXMuaW5pdERiKCkudGhlbigoY29ubjogSURCRGF0YWJhc2UpID0+IHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxJREJPYmplY3RTdG9yZT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBjb25zdCB0eDogSURCVHJhbnNhY3Rpb24gPSBjb25uLnRyYW5zYWN0aW9uKFsnRmlsZVN0b3JhZ2UnXSwgcmVhZEZsYWcpO1xuICAgICAgICBjb25zdCBzdG9yZTogYW55ID0gdHgub2JqZWN0U3RvcmUoJ0ZpbGVTdG9yYWdlJyk7XG4gICAgICAgIGNvbnN0IHJlcSA9IHN0b3JlW2NtZF0oLi4uYXJncyk7XG4gICAgICAgIHJlcS5vbnN1Y2Nlc3MgPSAoKSA9PiByZXNvbHZlKHJlcS5yZXN1bHQpO1xuICAgICAgICByZXEub25lcnJvciA9ICgpID0+IHJlamVjdChyZXEuZXJyb3IpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBkYkluZGV4UmVxdWVzdChpbmRleE5hbWU6IHN0cmluZywgY21kOiBzdHJpbmcsIGFyZ3M6IFthbnldKTogUHJvbWlzZTxhbnk+IHtcbiAgICBjb25zdCByZWFkRmxhZyA9IHRoaXMuX3dyaXRlQ21kcy5pbmRleE9mKGNtZCkgIT09IC0xID8gJ3JlYWR3cml0ZScgOiAncmVhZG9ubHknO1xuICAgIHJldHVybiB0aGlzLmluaXREYigpLnRoZW4oKGNvbm46IElEQkRhdGFiYXNlKSA9PiB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2U8SURCT2JqZWN0U3RvcmU+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgY29uc3QgdHg6IElEQlRyYW5zYWN0aW9uID0gY29ubi50cmFuc2FjdGlvbihbJ0ZpbGVTdG9yYWdlJ10sIHJlYWRGbGFnKTtcbiAgICAgICAgY29uc3Qgc3RvcmU6IElEQk9iamVjdFN0b3JlID0gdHgub2JqZWN0U3RvcmUoJ0ZpbGVTdG9yYWdlJyk7XG4gICAgICAgIGNvbnN0IGluZGV4OiBhbnkgPSBzdG9yZS5pbmRleChpbmRleE5hbWUpO1xuICAgICAgICBjb25zdCByZXEgPSBpbmRleFtjbWRdKC4uLmFyZ3MpIGFzIGFueTtcbiAgICAgICAgcmVxLm9uc3VjY2VzcyA9ICgpID0+IHJlc29sdmUocmVxLnJlc3VsdCk7XG4gICAgICAgIHJlcS5vbmVycm9yID0gKCkgPT4gcmVqZWN0KHJlcS5lcnJvcik7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0UGF0aChkaXJlY3Rvcnk6IERpcmVjdG9yeSB8IHVuZGVmaW5lZCwgdXJpUGF0aDogc3RyaW5nIHwgdW5kZWZpbmVkKTogc3RyaW5nIHtcbiAgICBjb25zdCBjbGVhbmVkVXJpUGF0aCA9IHVyaVBhdGggIT09IHVuZGVmaW5lZCA/IHVyaVBhdGgucmVwbGFjZSgvXlsvXSt8Wy9dKyQvZywgJycpIDogJyc7XG4gICAgbGV0IGZzUGF0aCA9ICcnO1xuICAgIGlmIChkaXJlY3RvcnkgIT09IHVuZGVmaW5lZCkgZnNQYXRoICs9ICcvJyArIGRpcmVjdG9yeTtcbiAgICBpZiAodXJpUGF0aCAhPT0gJycpIGZzUGF0aCArPSAnLycgKyBjbGVhbmVkVXJpUGF0aDtcbiAgICByZXR1cm4gZnNQYXRoO1xuICB9XG5cbiAgYXN5bmMgY2xlYXIoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgY29ubjogSURCRGF0YWJhc2UgPSBhd2FpdCB0aGlzLmluaXREYigpO1xuICAgIGNvbnN0IHR4OiBJREJUcmFuc2FjdGlvbiA9IGNvbm4udHJhbnNhY3Rpb24oWydGaWxlU3RvcmFnZSddLCAncmVhZHdyaXRlJyk7XG4gICAgY29uc3Qgc3RvcmU6IElEQk9iamVjdFN0b3JlID0gdHgub2JqZWN0U3RvcmUoJ0ZpbGVTdG9yYWdlJyk7XG4gICAgc3RvcmUuY2xlYXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWFkIGEgZmlsZSBmcm9tIGRpc2tcbiAgICogQHBhcmFtIG9wdGlvbnMgb3B0aW9ucyBmb3IgdGhlIGZpbGUgcmVhZFxuICAgKiBAcmV0dXJuIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIHJlYWQgZmlsZSBkYXRhIHJlc3VsdFxuICAgKi9cbiAgYXN5bmMgcmVhZEZpbGUob3B0aW9uczogUmVhZEZpbGVPcHRpb25zKTogUHJvbWlzZTxSZWFkRmlsZVJlc3VsdD4ge1xuICAgIGNvbnN0IHBhdGg6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aChvcHRpb25zLmRpcmVjdG9yeSwgb3B0aW9ucy5wYXRoKTtcbiAgICAvLyBjb25zdCBlbmNvZGluZyA9IG9wdGlvbnMuZW5jb2Rpbmc7XG5cbiAgICBjb25zdCBlbnRyeSA9IChhd2FpdCB0aGlzLmRiUmVxdWVzdCgnZ2V0JywgW3BhdGhdKSkgYXMgRW50cnlPYmo7XG4gICAgaWYgKGVudHJ5ID09PSB1bmRlZmluZWQpIHRocm93IEVycm9yKCdGaWxlIGRvZXMgbm90IGV4aXN0LicpO1xuICAgIHJldHVybiB7IGRhdGE6IGVudHJ5LmNvbnRlbnQgPyBlbnRyeS5jb250ZW50IDogJycgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXcml0ZSBhIGZpbGUgdG8gZGlzayBpbiB0aGUgc3BlY2lmaWVkIGxvY2F0aW9uIG9uIGRldmljZVxuICAgKiBAcGFyYW0gb3B0aW9ucyBvcHRpb25zIGZvciB0aGUgZmlsZSB3cml0ZVxuICAgKiBAcmV0dXJuIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIGZpbGUgd3JpdGUgcmVzdWx0XG4gICAqL1xuICBhc3luYyB3cml0ZUZpbGUob3B0aW9uczogV3JpdGVGaWxlT3B0aW9ucyk6IFByb21pc2U8V3JpdGVGaWxlUmVzdWx0PiB7XG4gICAgY29uc3QgcGF0aDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKG9wdGlvbnMuZGlyZWN0b3J5LCBvcHRpb25zLnBhdGgpO1xuICAgIGxldCBkYXRhID0gb3B0aW9ucy5kYXRhO1xuICAgIGNvbnN0IGVuY29kaW5nID0gb3B0aW9ucy5lbmNvZGluZztcbiAgICBjb25zdCBkb1JlY3Vyc2l2ZSA9IG9wdGlvbnMucmVjdXJzaXZlO1xuXG4gICAgY29uc3Qgb2NjdXBpZWRFbnRyeSA9IChhd2FpdCB0aGlzLmRiUmVxdWVzdCgnZ2V0JywgW3BhdGhdKSkgYXMgRW50cnlPYmo7XG4gICAgaWYgKG9jY3VwaWVkRW50cnkgJiYgb2NjdXBpZWRFbnRyeS50eXBlID09PSAnZGlyZWN0b3J5JykgdGhyb3cgRXJyb3IoJ1RoZSBzdXBwbGllZCBwYXRoIGlzIGEgZGlyZWN0b3J5LicpO1xuXG4gICAgY29uc3QgcGFyZW50UGF0aCA9IHBhdGguc3Vic3RyKDAsIHBhdGgubGFzdEluZGV4T2YoJy8nKSk7XG5cbiAgICBjb25zdCBwYXJlbnRFbnRyeSA9IChhd2FpdCB0aGlzLmRiUmVxdWVzdCgnZ2V0JywgW3BhcmVudFBhdGhdKSkgYXMgRW50cnlPYmo7XG4gICAgaWYgKHBhcmVudEVudHJ5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IHN1YkRpckluZGV4ID0gcGFyZW50UGF0aC5pbmRleE9mKCcvJywgMSk7XG4gICAgICBpZiAoc3ViRGlySW5kZXggIT09IC0xKSB7XG4gICAgICAgIGNvbnN0IHBhcmVudEFyZ1BhdGggPSBwYXJlbnRQYXRoLnN1YnN0cihzdWJEaXJJbmRleCk7XG4gICAgICAgIGF3YWl0IHRoaXMubWtkaXIoe1xuICAgICAgICAgIHBhdGg6IHBhcmVudEFyZ1BhdGgsXG4gICAgICAgICAgZGlyZWN0b3J5OiBvcHRpb25zLmRpcmVjdG9yeSxcbiAgICAgICAgICByZWN1cnNpdmU6IGRvUmVjdXJzaXZlLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIWVuY29kaW5nICYmICEoZGF0YSBpbnN0YW5jZW9mIEJsb2IpKSB7XG4gICAgICBkYXRhID0gZGF0YS5pbmRleE9mKCcsJykgPj0gMCA/IGRhdGEuc3BsaXQoJywnKVsxXSA6IGRhdGE7XG4gICAgICBpZiAoIXRoaXMuaXNCYXNlNjRTdHJpbmcoZGF0YSkpIHRocm93IEVycm9yKCdUaGUgc3VwcGxpZWQgZGF0YSBpcyBub3QgdmFsaWQgYmFzZTY0IGNvbnRlbnQuJyk7XG4gICAgfVxuXG4gICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICBjb25zdCBwYXRoT2JqOiBFbnRyeU9iaiA9IHtcbiAgICAgIHBhdGg6IHBhdGgsXG4gICAgICBmb2xkZXI6IHBhcmVudFBhdGgsXG4gICAgICB0eXBlOiAnZmlsZScsXG4gICAgICBzaXplOiBkYXRhIGluc3RhbmNlb2YgQmxvYiA/IGRhdGEuc2l6ZSA6IGRhdGEubGVuZ3RoLFxuICAgICAgY3RpbWU6IG5vdyxcbiAgICAgIG10aW1lOiBub3csXG4gICAgICBjb250ZW50OiBkYXRhLFxuICAgIH07XG4gICAgYXdhaXQgdGhpcy5kYlJlcXVlc3QoJ3B1dCcsIFtwYXRoT2JqXSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVyaTogcGF0aE9iai5wYXRoLFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQXBwZW5kIHRvIGEgZmlsZSBvbiBkaXNrIGluIHRoZSBzcGVjaWZpZWQgbG9jYXRpb24gb24gZGV2aWNlXG4gICAqIEBwYXJhbSBvcHRpb25zIG9wdGlvbnMgZm9yIHRoZSBmaWxlIGFwcGVuZFxuICAgKiBAcmV0dXJuIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIGZpbGUgd3JpdGUgcmVzdWx0XG4gICAqL1xuICBhc3luYyBhcHBlbmRGaWxlKG9wdGlvbnM6IEFwcGVuZEZpbGVPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgcGF0aDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKG9wdGlvbnMuZGlyZWN0b3J5LCBvcHRpb25zLnBhdGgpO1xuICAgIGxldCBkYXRhID0gb3B0aW9ucy5kYXRhO1xuICAgIGNvbnN0IGVuY29kaW5nID0gb3B0aW9ucy5lbmNvZGluZztcbiAgICBjb25zdCBwYXJlbnRQYXRoID0gcGF0aC5zdWJzdHIoMCwgcGF0aC5sYXN0SW5kZXhPZignLycpKTtcblxuICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgbGV0IGN0aW1lID0gbm93O1xuXG4gICAgY29uc3Qgb2NjdXBpZWRFbnRyeSA9IChhd2FpdCB0aGlzLmRiUmVxdWVzdCgnZ2V0JywgW3BhdGhdKSkgYXMgRW50cnlPYmo7XG4gICAgaWYgKG9jY3VwaWVkRW50cnkgJiYgb2NjdXBpZWRFbnRyeS50eXBlID09PSAnZGlyZWN0b3J5JykgdGhyb3cgRXJyb3IoJ1RoZSBzdXBwbGllZCBwYXRoIGlzIGEgZGlyZWN0b3J5LicpO1xuXG4gICAgY29uc3QgcGFyZW50RW50cnkgPSAoYXdhaXQgdGhpcy5kYlJlcXVlc3QoJ2dldCcsIFtwYXJlbnRQYXRoXSkpIGFzIEVudHJ5T2JqO1xuICAgIGlmIChwYXJlbnRFbnRyeSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zdCBzdWJEaXJJbmRleCA9IHBhcmVudFBhdGguaW5kZXhPZignLycsIDEpO1xuICAgICAgaWYgKHN1YkRpckluZGV4ICE9PSAtMSkge1xuICAgICAgICBjb25zdCBwYXJlbnRBcmdQYXRoID0gcGFyZW50UGF0aC5zdWJzdHIoc3ViRGlySW5kZXgpO1xuICAgICAgICBhd2FpdCB0aGlzLm1rZGlyKHtcbiAgICAgICAgICBwYXRoOiBwYXJlbnRBcmdQYXRoLFxuICAgICAgICAgIGRpcmVjdG9yeTogb3B0aW9ucy5kaXJlY3RvcnksXG4gICAgICAgICAgcmVjdXJzaXZlOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIWVuY29kaW5nICYmICF0aGlzLmlzQmFzZTY0U3RyaW5nKGRhdGEpKSB0aHJvdyBFcnJvcignVGhlIHN1cHBsaWVkIGRhdGEgaXMgbm90IHZhbGlkIGJhc2U2NCBjb250ZW50LicpO1xuXG4gICAgaWYgKG9jY3VwaWVkRW50cnkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKG9jY3VwaWVkRW50cnkuY29udGVudCBpbnN0YW5jZW9mIEJsb2IpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ1RoZSBvY2N1cGllZCBlbnRyeSBjb250YWlucyBhIEJsb2Igb2JqZWN0IHdoaWNoIGNhbm5vdCBiZSBhcHBlbmRlZCB0by4nKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG9jY3VwaWVkRW50cnkuY29udGVudCAhPT0gdW5kZWZpbmVkICYmICFlbmNvZGluZykge1xuICAgICAgICBkYXRhID0gYnRvYShhdG9iKG9jY3VwaWVkRW50cnkuY29udGVudCkgKyBhdG9iKGRhdGEpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRhdGEgPSBvY2N1cGllZEVudHJ5LmNvbnRlbnQgKyBkYXRhO1xuICAgICAgfVxuICAgICAgY3RpbWUgPSBvY2N1cGllZEVudHJ5LmN0aW1lO1xuICAgIH1cbiAgICBjb25zdCBwYXRoT2JqOiBFbnRyeU9iaiA9IHtcbiAgICAgIHBhdGg6IHBhdGgsXG4gICAgICBmb2xkZXI6IHBhcmVudFBhdGgsXG4gICAgICB0eXBlOiAnZmlsZScsXG4gICAgICBzaXplOiBkYXRhLmxlbmd0aCxcbiAgICAgIGN0aW1lOiBjdGltZSxcbiAgICAgIG10aW1lOiBub3csXG4gICAgICBjb250ZW50OiBkYXRhLFxuICAgIH07XG4gICAgYXdhaXQgdGhpcy5kYlJlcXVlc3QoJ3B1dCcsIFtwYXRoT2JqXSk7XG4gIH1cblxuICAvKipcbiAgICogRGVsZXRlIGEgZmlsZSBmcm9tIGRpc2tcbiAgICogQHBhcmFtIG9wdGlvbnMgb3B0aW9ucyBmb3IgdGhlIGZpbGUgZGVsZXRlXG4gICAqIEByZXR1cm4gYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgZGVsZXRlZCBmaWxlIGRhdGEgcmVzdWx0XG4gICAqL1xuICBhc3luYyBkZWxldGVGaWxlKG9wdGlvbnM6IERlbGV0ZUZpbGVPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgcGF0aDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKG9wdGlvbnMuZGlyZWN0b3J5LCBvcHRpb25zLnBhdGgpO1xuXG4gICAgY29uc3QgZW50cnkgPSAoYXdhaXQgdGhpcy5kYlJlcXVlc3QoJ2dldCcsIFtwYXRoXSkpIGFzIEVudHJ5T2JqO1xuICAgIGlmIChlbnRyeSA9PT0gdW5kZWZpbmVkKSB0aHJvdyBFcnJvcignRmlsZSBkb2VzIG5vdCBleGlzdC4nKTtcbiAgICBjb25zdCBlbnRyaWVzID0gYXdhaXQgdGhpcy5kYkluZGV4UmVxdWVzdCgnYnlfZm9sZGVyJywgJ2dldEFsbEtleXMnLCBbSURCS2V5UmFuZ2Uub25seShwYXRoKV0pO1xuICAgIGlmIChlbnRyaWVzLmxlbmd0aCAhPT0gMCkgdGhyb3cgRXJyb3IoJ0ZvbGRlciBpcyBub3QgZW1wdHkuJyk7XG5cbiAgICBhd2FpdCB0aGlzLmRiUmVxdWVzdCgnZGVsZXRlJywgW3BhdGhdKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBkaXJlY3RvcnkuXG4gICAqIEBwYXJhbSBvcHRpb25zIG9wdGlvbnMgZm9yIHRoZSBta2RpclxuICAgKiBAcmV0dXJuIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIG1rZGlyIHJlc3VsdFxuICAgKi9cbiAgYXN5bmMgbWtkaXIob3B0aW9uczogTWtkaXJPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgcGF0aDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKG9wdGlvbnMuZGlyZWN0b3J5LCBvcHRpb25zLnBhdGgpO1xuICAgIGNvbnN0IGRvUmVjdXJzaXZlID0gb3B0aW9ucy5yZWN1cnNpdmU7XG4gICAgY29uc3QgcGFyZW50UGF0aCA9IHBhdGguc3Vic3RyKDAsIHBhdGgubGFzdEluZGV4T2YoJy8nKSk7XG5cbiAgICBjb25zdCBkZXB0aCA9IChwYXRoLm1hdGNoKC9cXC8vZykgfHwgW10pLmxlbmd0aDtcbiAgICBjb25zdCBwYXJlbnRFbnRyeSA9IChhd2FpdCB0aGlzLmRiUmVxdWVzdCgnZ2V0JywgW3BhcmVudFBhdGhdKSkgYXMgRW50cnlPYmo7XG4gICAgY29uc3Qgb2NjdXBpZWRFbnRyeSA9IChhd2FpdCB0aGlzLmRiUmVxdWVzdCgnZ2V0JywgW3BhdGhdKSkgYXMgRW50cnlPYmo7XG4gICAgaWYgKGRlcHRoID09PSAxKSB0aHJvdyBFcnJvcignQ2Fubm90IGNyZWF0ZSBSb290IGRpcmVjdG9yeScpO1xuICAgIGlmIChvY2N1cGllZEVudHJ5ICE9PSB1bmRlZmluZWQpIHRocm93IEVycm9yKCdDdXJyZW50IGRpcmVjdG9yeSBkb2VzIGFscmVhZHkgZXhpc3QuJyk7XG4gICAgaWYgKCFkb1JlY3Vyc2l2ZSAmJiBkZXB0aCAhPT0gMiAmJiBwYXJlbnRFbnRyeSA9PT0gdW5kZWZpbmVkKSB0aHJvdyBFcnJvcignUGFyZW50IGRpcmVjdG9yeSBtdXN0IGV4aXN0Jyk7XG5cbiAgICBpZiAoZG9SZWN1cnNpdmUgJiYgZGVwdGggIT09IDIgJiYgcGFyZW50RW50cnkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc3QgcGFyZW50QXJnUGF0aCA9IHBhcmVudFBhdGguc3Vic3RyKHBhcmVudFBhdGguaW5kZXhPZignLycsIDEpKTtcbiAgICAgIGF3YWl0IHRoaXMubWtkaXIoe1xuICAgICAgICBwYXRoOiBwYXJlbnRBcmdQYXRoLFxuICAgICAgICBkaXJlY3Rvcnk6IG9wdGlvbnMuZGlyZWN0b3J5LFxuICAgICAgICByZWN1cnNpdmU6IGRvUmVjdXJzaXZlLFxuICAgICAgfSk7XG4gICAgfVxuICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgY29uc3QgcGF0aE9iajogRW50cnlPYmogPSB7XG4gICAgICBwYXRoOiBwYXRoLFxuICAgICAgZm9sZGVyOiBwYXJlbnRQYXRoLFxuICAgICAgdHlwZTogJ2RpcmVjdG9yeScsXG4gICAgICBzaXplOiAwLFxuICAgICAgY3RpbWU6IG5vdyxcbiAgICAgIG10aW1lOiBub3csXG4gICAgfTtcbiAgICBhd2FpdCB0aGlzLmRiUmVxdWVzdCgncHV0JywgW3BhdGhPYmpdKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYSBkaXJlY3RvcnlcbiAgICogQHBhcmFtIG9wdGlvbnMgdGhlIG9wdGlvbnMgZm9yIHRoZSBkaXJlY3RvcnkgcmVtb3ZlXG4gICAqL1xuICBhc3luYyBybWRpcihvcHRpb25zOiBSbWRpck9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCB7IHBhdGgsIGRpcmVjdG9yeSwgcmVjdXJzaXZlIH0gPSBvcHRpb25zO1xuICAgIGNvbnN0IGZ1bGxQYXRoOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoZGlyZWN0b3J5LCBwYXRoKTtcblxuICAgIGNvbnN0IGVudHJ5ID0gKGF3YWl0IHRoaXMuZGJSZXF1ZXN0KCdnZXQnLCBbZnVsbFBhdGhdKSkgYXMgRW50cnlPYmo7XG5cbiAgICBpZiAoZW50cnkgPT09IHVuZGVmaW5lZCkgdGhyb3cgRXJyb3IoJ0ZvbGRlciBkb2VzIG5vdCBleGlzdC4nKTtcblxuICAgIGlmIChlbnRyeS50eXBlICE9PSAnZGlyZWN0b3J5JykgdGhyb3cgRXJyb3IoJ1JlcXVlc3RlZCBwYXRoIGlzIG5vdCBhIGRpcmVjdG9yeScpO1xuXG4gICAgY29uc3QgcmVhZERpclJlc3VsdCA9IGF3YWl0IHRoaXMucmVhZGRpcih7IHBhdGgsIGRpcmVjdG9yeSB9KTtcblxuICAgIGlmIChyZWFkRGlyUmVzdWx0LmZpbGVzLmxlbmd0aCAhPT0gMCAmJiAhcmVjdXJzaXZlKSB0aHJvdyBFcnJvcignRm9sZGVyIGlzIG5vdCBlbXB0eScpO1xuXG4gICAgZm9yIChjb25zdCBlbnRyeSBvZiByZWFkRGlyUmVzdWx0LmZpbGVzKSB7XG4gICAgICBjb25zdCBlbnRyeVBhdGggPSBgJHtwYXRofS8ke2VudHJ5Lm5hbWV9YDtcbiAgICAgIGNvbnN0IGVudHJ5T2JqID0gYXdhaXQgdGhpcy5zdGF0KHsgcGF0aDogZW50cnlQYXRoLCBkaXJlY3RvcnkgfSk7XG4gICAgICBpZiAoZW50cnlPYmoudHlwZSA9PT0gJ2ZpbGUnKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuZGVsZXRlRmlsZSh7IHBhdGg6IGVudHJ5UGF0aCwgZGlyZWN0b3J5IH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXdhaXQgdGhpcy5ybWRpcih7IHBhdGg6IGVudHJ5UGF0aCwgZGlyZWN0b3J5LCByZWN1cnNpdmUgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgYXdhaXQgdGhpcy5kYlJlcXVlc3QoJ2RlbGV0ZScsIFtmdWxsUGF0aF0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBhIGxpc3Qgb2YgZmlsZXMgZnJvbSB0aGUgZGlyZWN0b3J5IChub3QgcmVjdXJzaXZlKVxuICAgKiBAcGFyYW0gb3B0aW9ucyB0aGUgb3B0aW9ucyBmb3IgdGhlIHJlYWRkaXIgb3BlcmF0aW9uXG4gICAqIEByZXR1cm4gYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgcmVhZGRpciBkaXJlY3RvcnkgbGlzdGluZyByZXN1bHRcbiAgICovXG4gIGFzeW5jIHJlYWRkaXIob3B0aW9uczogUmVhZGRpck9wdGlvbnMpOiBQcm9taXNlPFJlYWRkaXJSZXN1bHQ+IHtcbiAgICBjb25zdCBwYXRoOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgob3B0aW9ucy5kaXJlY3RvcnksIG9wdGlvbnMucGF0aCk7XG5cbiAgICBjb25zdCBlbnRyeSA9IChhd2FpdCB0aGlzLmRiUmVxdWVzdCgnZ2V0JywgW3BhdGhdKSkgYXMgRW50cnlPYmo7XG4gICAgaWYgKG9wdGlvbnMucGF0aCAhPT0gJycgJiYgZW50cnkgPT09IHVuZGVmaW5lZCkgdGhyb3cgRXJyb3IoJ0ZvbGRlciBkb2VzIG5vdCBleGlzdC4nKTtcblxuICAgIGNvbnN0IGVudHJpZXM6IHN0cmluZ1tdID0gYXdhaXQgdGhpcy5kYkluZGV4UmVxdWVzdCgnYnlfZm9sZGVyJywgJ2dldEFsbEtleXMnLCBbSURCS2V5UmFuZ2Uub25seShwYXRoKV0pO1xuICAgIGNvbnN0IGZpbGVzID0gYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICBlbnRyaWVzLm1hcChhc3luYyAoZSkgPT4ge1xuICAgICAgICBsZXQgc3ViRW50cnkgPSAoYXdhaXQgdGhpcy5kYlJlcXVlc3QoJ2dldCcsIFtlXSkpIGFzIEVudHJ5T2JqO1xuICAgICAgICBpZiAoc3ViRW50cnkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHN1YkVudHJ5ID0gKGF3YWl0IHRoaXMuZGJSZXF1ZXN0KCdnZXQnLCBbZSArICcvJ10pKSBhcyBFbnRyeU9iajtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIG5hbWU6IGUuc3Vic3RyaW5nKHBhdGgubGVuZ3RoICsgMSksXG4gICAgICAgICAgdHlwZTogc3ViRW50cnkudHlwZSxcbiAgICAgICAgICBzaXplOiBzdWJFbnRyeS5zaXplLFxuICAgICAgICAgIGN0aW1lOiBzdWJFbnRyeS5jdGltZSxcbiAgICAgICAgICBtdGltZTogc3ViRW50cnkubXRpbWUsXG4gICAgICAgICAgdXJpOiBzdWJFbnRyeS5wYXRoLFxuICAgICAgICB9O1xuICAgICAgfSksXG4gICAgKTtcbiAgICByZXR1cm4geyBmaWxlczogZmlsZXMgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gZnVsbCBGaWxlIFVSSSBmb3IgYSBwYXRoIGFuZCBkaXJlY3RvcnlcbiAgICogQHBhcmFtIG9wdGlvbnMgdGhlIG9wdGlvbnMgZm9yIHRoZSBzdGF0IG9wZXJhdGlvblxuICAgKiBAcmV0dXJuIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIGZpbGUgc3RhdCByZXN1bHRcbiAgICovXG4gIGFzeW5jIGdldFVyaShvcHRpb25zOiBHZXRVcmlPcHRpb25zKTogUHJvbWlzZTxHZXRVcmlSZXN1bHQ+IHtcbiAgICBjb25zdCBwYXRoOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgob3B0aW9ucy5kaXJlY3RvcnksIG9wdGlvbnMucGF0aCk7XG5cbiAgICBsZXQgZW50cnkgPSAoYXdhaXQgdGhpcy5kYlJlcXVlc3QoJ2dldCcsIFtwYXRoXSkpIGFzIEVudHJ5T2JqO1xuICAgIGlmIChlbnRyeSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBlbnRyeSA9IChhd2FpdCB0aGlzLmRiUmVxdWVzdCgnZ2V0JywgW3BhdGggKyAnLyddKSkgYXMgRW50cnlPYmo7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICB1cmk6IGVudHJ5Py5wYXRoIHx8IHBhdGgsXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gZGF0YSBhYm91dCBhIGZpbGVcbiAgICogQHBhcmFtIG9wdGlvbnMgdGhlIG9wdGlvbnMgZm9yIHRoZSBzdGF0IG9wZXJhdGlvblxuICAgKiBAcmV0dXJuIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIGZpbGUgc3RhdCByZXN1bHRcbiAgICovXG4gIGFzeW5jIHN0YXQob3B0aW9uczogU3RhdE9wdGlvbnMpOiBQcm9taXNlPFN0YXRSZXN1bHQ+IHtcbiAgICBjb25zdCBwYXRoOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgob3B0aW9ucy5kaXJlY3RvcnksIG9wdGlvbnMucGF0aCk7XG5cbiAgICBsZXQgZW50cnkgPSAoYXdhaXQgdGhpcy5kYlJlcXVlc3QoJ2dldCcsIFtwYXRoXSkpIGFzIEVudHJ5T2JqO1xuICAgIGlmIChlbnRyeSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBlbnRyeSA9IChhd2FpdCB0aGlzLmRiUmVxdWVzdCgnZ2V0JywgW3BhdGggKyAnLyddKSkgYXMgRW50cnlPYmo7XG4gICAgfVxuICAgIGlmIChlbnRyeSA9PT0gdW5kZWZpbmVkKSB0aHJvdyBFcnJvcignRW50cnkgZG9lcyBub3QgZXhpc3QuJyk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogZW50cnkucGF0aC5zdWJzdHJpbmcocGF0aC5sZW5ndGggKyAxKSxcbiAgICAgIHR5cGU6IGVudHJ5LnR5cGUsXG4gICAgICBzaXplOiBlbnRyeS5zaXplLFxuICAgICAgY3RpbWU6IGVudHJ5LmN0aW1lLFxuICAgICAgbXRpbWU6IGVudHJ5Lm10aW1lLFxuICAgICAgdXJpOiBlbnRyeS5wYXRoLFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogUmVuYW1lIGEgZmlsZSBvciBkaXJlY3RvcnlcbiAgICogQHBhcmFtIG9wdGlvbnMgdGhlIG9wdGlvbnMgZm9yIHRoZSByZW5hbWUgb3BlcmF0aW9uXG4gICAqIEByZXR1cm4gYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgcmVuYW1lIHJlc3VsdFxuICAgKi9cbiAgYXN5bmMgcmVuYW1lKG9wdGlvbnM6IFJlbmFtZU9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzLl9jb3B5KG9wdGlvbnMsIHRydWUpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb3B5IGEgZmlsZSBvciBkaXJlY3RvcnlcbiAgICogQHBhcmFtIG9wdGlvbnMgdGhlIG9wdGlvbnMgZm9yIHRoZSBjb3B5IG9wZXJhdGlvblxuICAgKiBAcmV0dXJuIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIGNvcHkgcmVzdWx0XG4gICAqL1xuICBhc3luYyBjb3B5KG9wdGlvbnM6IENvcHlPcHRpb25zKTogUHJvbWlzZTxDb3B5UmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvcHkob3B0aW9ucywgZmFsc2UpO1xuICB9XG5cbiAgYXN5bmMgcmVxdWVzdFBlcm1pc3Npb25zKCk6IFByb21pc2U8UGVybWlzc2lvblN0YXR1cz4ge1xuICAgIHJldHVybiB7IHB1YmxpY1N0b3JhZ2U6ICdncmFudGVkJyB9O1xuICB9XG5cbiAgYXN5bmMgY2hlY2tQZXJtaXNzaW9ucygpOiBQcm9taXNlPFBlcm1pc3Npb25TdGF0dXM+IHtcbiAgICByZXR1cm4geyBwdWJsaWNTdG9yYWdlOiAnZ3JhbnRlZCcgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGdW5jdGlvbiB0aGF0IGNhbiBwZXJmb3JtIGEgY29weSBvciBhIHJlbmFtZVxuICAgKiBAcGFyYW0gb3B0aW9ucyB0aGUgb3B0aW9ucyBmb3IgdGhlIHJlbmFtZSBvcGVyYXRpb25cbiAgICogQHBhcmFtIGRvUmVuYW1lIHdoZXRoZXIgdG8gcGVyZm9ybSBhIHJlbmFtZSBvciBjb3B5IG9wZXJhdGlvblxuICAgKiBAcmV0dXJuIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIHJlc3VsdFxuICAgKi9cbiAgcHJpdmF0ZSBhc3luYyBfY29weShvcHRpb25zOiBDb3B5T3B0aW9ucywgZG9SZW5hbWUgPSBmYWxzZSk6IFByb21pc2U8Q29weVJlc3VsdD4ge1xuICAgIGxldCB7IHRvRGlyZWN0b3J5IH0gPSBvcHRpb25zO1xuICAgIGNvbnN0IHsgdG8sIGZyb20sIGRpcmVjdG9yeTogZnJvbURpcmVjdG9yeSB9ID0gb3B0aW9ucztcblxuICAgIGlmICghdG8gfHwgIWZyb20pIHtcbiAgICAgIHRocm93IEVycm9yKCdCb3RoIHRvIGFuZCBmcm9tIG11c3QgYmUgcHJvdmlkZWQnKTtcbiAgICB9XG5cbiAgICAvLyBJZiBubyBcInRvXCIgZGlyZWN0b3J5IGlzIHByb3ZpZGVkLCB1c2UgdGhlIFwiZnJvbVwiIGRpcmVjdG9yeVxuICAgIGlmICghdG9EaXJlY3RvcnkpIHtcbiAgICAgIHRvRGlyZWN0b3J5ID0gZnJvbURpcmVjdG9yeTtcbiAgICB9XG5cbiAgICBjb25zdCBmcm9tUGF0aCA9IHRoaXMuZ2V0UGF0aChmcm9tRGlyZWN0b3J5LCBmcm9tKTtcbiAgICBjb25zdCB0b1BhdGggPSB0aGlzLmdldFBhdGgodG9EaXJlY3RvcnksIHRvKTtcblxuICAgIC8vIFRlc3QgdGhhdCB0aGUgXCJ0b1wiIGFuZCBcImZyb21cIiBsb2NhdGlvbnMgYXJlIGRpZmZlcmVudFxuICAgIGlmIChmcm9tUGF0aCA9PT0gdG9QYXRoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB1cmk6IHRvUGF0aCxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgaWYgKGlzUGF0aFBhcmVudChmcm9tUGF0aCwgdG9QYXRoKSkge1xuICAgICAgdGhyb3cgRXJyb3IoJ1RvIHBhdGggY2Fubm90IGNvbnRhaW4gdGhlIGZyb20gcGF0aCcpO1xuICAgIH1cblxuICAgIC8vIENoZWNrIHRoZSBzdGF0ZSBvZiB0aGUgXCJ0b1wiIGxvY2F0aW9uXG4gICAgbGV0IHRvT2JqO1xuICAgIHRyeSB7XG4gICAgICB0b09iaiA9IGF3YWl0IHRoaXMuc3RhdCh7XG4gICAgICAgIHBhdGg6IHRvLFxuICAgICAgICBkaXJlY3Rvcnk6IHRvRGlyZWN0b3J5LFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy8gVG8gbG9jYXRpb24gZG9lcyBub3QgZXhpc3QsIGVuc3VyZSB0aGUgZGlyZWN0b3J5IGNvbnRhaW5pbmcgXCJ0b1wiIGxvY2F0aW9uIGV4aXN0cyBhbmQgaXMgYSBkaXJlY3RvcnlcbiAgICAgIGNvbnN0IHRvUGF0aENvbXBvbmVudHMgPSB0by5zcGxpdCgnLycpO1xuICAgICAgdG9QYXRoQ29tcG9uZW50cy5wb3AoKTtcbiAgICAgIGNvbnN0IHRvUGF0aCA9IHRvUGF0aENvbXBvbmVudHMuam9pbignLycpO1xuXG4gICAgICAvLyBDaGVjayB0aGUgY29udGFpbmluZyBkaXJlY3Rvcnkgb2YgdGhlIFwidG9cIiBsb2NhdGlvbiBleGlzdHNcbiAgICAgIGlmICh0b1BhdGhDb21wb25lbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc3QgdG9QYXJlbnREaXJlY3RvcnkgPSBhd2FpdCB0aGlzLnN0YXQoe1xuICAgICAgICAgIHBhdGg6IHRvUGF0aCxcbiAgICAgICAgICBkaXJlY3Rvcnk6IHRvRGlyZWN0b3J5LFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodG9QYXJlbnREaXJlY3RvcnkudHlwZSAhPT0gJ2RpcmVjdG9yeScpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BhcmVudCBkaXJlY3Rvcnkgb2YgdGhlIHRvIHBhdGggaXMgYSBmaWxlJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBDYW5ub3Qgb3ZlcndyaXRlIGEgZGlyZWN0b3J5XG4gICAgaWYgKHRvT2JqICYmIHRvT2JqLnR5cGUgPT09ICdkaXJlY3RvcnknKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBvdmVyd3JpdGUgYSBkaXJlY3Rvcnkgd2l0aCBhIGZpbGUnKTtcbiAgICB9XG5cbiAgICAvLyBFbnN1cmUgdGhlIFwiZnJvbVwiIG9iamVjdCBleGlzdHNcbiAgICBjb25zdCBmcm9tT2JqID0gYXdhaXQgdGhpcy5zdGF0KHtcbiAgICAgIHBhdGg6IGZyb20sXG4gICAgICBkaXJlY3Rvcnk6IGZyb21EaXJlY3RvcnksXG4gICAgfSk7XG5cbiAgICAvLyBTZXQgdGhlIG10aW1lL2N0aW1lIG9mIHRoZSBzdXBwbGllZCBwYXRoXG4gICAgY29uc3QgdXBkYXRlVGltZSA9IGFzeW5jIChwYXRoOiBzdHJpbmcsIGN0aW1lOiBudW1iZXIsIG10aW1lOiBudW1iZXIpID0+IHtcbiAgICAgIGNvbnN0IGZ1bGxQYXRoOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgodG9EaXJlY3RvcnksIHBhdGgpO1xuICAgICAgY29uc3QgZW50cnkgPSAoYXdhaXQgdGhpcy5kYlJlcXVlc3QoJ2dldCcsIFtmdWxsUGF0aF0pKSBhcyBFbnRyeU9iajtcbiAgICAgIGVudHJ5LmN0aW1lID0gY3RpbWU7XG4gICAgICBlbnRyeS5tdGltZSA9IG10aW1lO1xuICAgICAgYXdhaXQgdGhpcy5kYlJlcXVlc3QoJ3B1dCcsIFtlbnRyeV0pO1xuICAgIH07XG5cbiAgICBjb25zdCBjdGltZSA9IGZyb21PYmouY3RpbWUgPyBmcm9tT2JqLmN0aW1lIDogRGF0ZS5ub3coKTtcblxuICAgIHN3aXRjaCAoZnJvbU9iai50eXBlKSB7XG4gICAgICAvLyBUaGUgXCJmcm9tXCIgb2JqZWN0IGlzIGEgZmlsZVxuICAgICAgY2FzZSAnZmlsZSc6IHtcbiAgICAgICAgLy8gUmVhZCB0aGUgZmlsZVxuICAgICAgICBjb25zdCBmaWxlID0gYXdhaXQgdGhpcy5yZWFkRmlsZSh7XG4gICAgICAgICAgcGF0aDogZnJvbSxcbiAgICAgICAgICBkaXJlY3Rvcnk6IGZyb21EaXJlY3RvcnksXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIE9wdGlvbmFsbHkgcmVtb3ZlIHRoZSBmaWxlXG4gICAgICAgIGlmIChkb1JlbmFtZSkge1xuICAgICAgICAgIGF3YWl0IHRoaXMuZGVsZXRlRmlsZSh7XG4gICAgICAgICAgICBwYXRoOiBmcm9tLFxuICAgICAgICAgICAgZGlyZWN0b3J5OiBmcm9tRGlyZWN0b3J5LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGVuY29kaW5nO1xuICAgICAgICBpZiAoIShmaWxlLmRhdGEgaW5zdGFuY2VvZiBCbG9iKSAmJiAhdGhpcy5pc0Jhc2U2NFN0cmluZyhmaWxlLmRhdGEpKSB7XG4gICAgICAgICAgZW5jb2RpbmcgPSBFbmNvZGluZy5VVEY4O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gV3JpdGUgdGhlIGZpbGUgdG8gdGhlIG5ldyBsb2NhdGlvblxuICAgICAgICBjb25zdCB3cml0ZVJlc3VsdCA9IGF3YWl0IHRoaXMud3JpdGVGaWxlKHtcbiAgICAgICAgICBwYXRoOiB0byxcbiAgICAgICAgICBkaXJlY3Rvcnk6IHRvRGlyZWN0b3J5LFxuICAgICAgICAgIGRhdGE6IGZpbGUuZGF0YSxcbiAgICAgICAgICBlbmNvZGluZzogZW5jb2RpbmcsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIENvcHkgdGhlIG10aW1lL2N0aW1lIG9mIGEgcmVuYW1lZCBmaWxlXG4gICAgICAgIGlmIChkb1JlbmFtZSkge1xuICAgICAgICAgIGF3YWl0IHVwZGF0ZVRpbWUodG8sIGN0aW1lLCBmcm9tT2JqLm10aW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJlc29sdmUgcHJvbWlzZVxuICAgICAgICByZXR1cm4gd3JpdGVSZXN1bHQ7XG4gICAgICB9XG4gICAgICBjYXNlICdkaXJlY3RvcnknOiB7XG4gICAgICAgIGlmICh0b09iaikge1xuICAgICAgICAgIHRocm93IEVycm9yKCdDYW5ub3QgbW92ZSBhIGRpcmVjdG9yeSBvdmVyIGFuIGV4aXN0aW5nIG9iamVjdCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAvLyBDcmVhdGUgdGhlIHRvIGRpcmVjdG9yeVxuICAgICAgICAgIGF3YWl0IHRoaXMubWtkaXIoe1xuICAgICAgICAgICAgcGF0aDogdG8sXG4gICAgICAgICAgICBkaXJlY3Rvcnk6IHRvRGlyZWN0b3J5LFxuICAgICAgICAgICAgcmVjdXJzaXZlOiBmYWxzZSxcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIC8vIENvcHkgdGhlIG10aW1lL2N0aW1lIG9mIGEgcmVuYW1lZCBkaXJlY3RvcnlcbiAgICAgICAgICBpZiAoZG9SZW5hbWUpIHtcbiAgICAgICAgICAgIGF3YWl0IHVwZGF0ZVRpbWUodG8sIGN0aW1lLCBmcm9tT2JqLm10aW1lKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAvLyBpZ25vcmVcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEl0ZXJhdGUgb3ZlciB0aGUgY29udGVudHMgb2YgdGhlIGZyb20gbG9jYXRpb25cbiAgICAgICAgY29uc3QgY29udGVudHMgPSAoXG4gICAgICAgICAgYXdhaXQgdGhpcy5yZWFkZGlyKHtcbiAgICAgICAgICAgIHBhdGg6IGZyb20sXG4gICAgICAgICAgICBkaXJlY3Rvcnk6IGZyb21EaXJlY3RvcnksXG4gICAgICAgICAgfSlcbiAgICAgICAgKS5maWxlcztcblxuICAgICAgICBmb3IgKGNvbnN0IGZpbGVuYW1lIG9mIGNvbnRlbnRzKSB7XG4gICAgICAgICAgLy8gTW92ZSBpdGVtIGZyb20gdGhlIGZyb20gZGlyZWN0b3J5IHRvIHRoZSB0byBkaXJlY3RvcnlcbiAgICAgICAgICBhd2FpdCB0aGlzLl9jb3B5KFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBmcm9tOiBgJHtmcm9tfS8ke2ZpbGVuYW1lLm5hbWV9YCxcbiAgICAgICAgICAgICAgdG86IGAke3RvfS8ke2ZpbGVuYW1lLm5hbWV9YCxcbiAgICAgICAgICAgICAgZGlyZWN0b3J5OiBmcm9tRGlyZWN0b3J5LFxuICAgICAgICAgICAgICB0b0RpcmVjdG9yeSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkb1JlbmFtZSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gT3B0aW9uYWxseSByZW1vdmUgdGhlIG9yaWdpbmFsIGZyb20gZGlyZWN0b3J5XG4gICAgICAgIGlmIChkb1JlbmFtZSkge1xuICAgICAgICAgIGF3YWl0IHRoaXMucm1kaXIoe1xuICAgICAgICAgICAgcGF0aDogZnJvbSxcbiAgICAgICAgICAgIGRpcmVjdG9yeTogZnJvbURpcmVjdG9yeSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgdXJpOiB0b1BhdGgsXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGdW5jdGlvbiB0aGF0IHBlcmZvcm1zIGEgaHR0cCByZXF1ZXN0IHRvIGEgc2VydmVyIGFuZCBkb3dubG9hZHMgdGhlIGZpbGUgdG8gdGhlIHNwZWNpZmllZCBkZXN0aW5hdGlvblxuICAgKlxuICAgKiBAZGVwcmVjYXRlZCBVc2UgdGhlIEBjYXBhY2l0b3IvZmlsZS10cmFuc2ZlciBwbHVnaW4gaW5zdGVhZC5cbiAgICogQHBhcmFtIG9wdGlvbnMgdGhlIG9wdGlvbnMgZm9yIHRoZSBkb3dubG9hZCBvcGVyYXRpb25cbiAgICogQHJldHVybnMgYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgZG93bmxvYWQgZmlsZSByZXN1bHRcbiAgICovXG4gIHB1YmxpYyBkb3dubG9hZEZpbGUgPSBhc3luYyAob3B0aW9uczogRG93bmxvYWRGaWxlT3B0aW9ucyk6IFByb21pc2U8RG93bmxvYWRGaWxlUmVzdWx0PiA9PiB7XG4gICAgY29uc3QgcmVxdWVzdEluaXQgPSBidWlsZFJlcXVlc3RJbml0KG9wdGlvbnMsIG9wdGlvbnMud2ViRmV0Y2hFeHRyYSk7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChvcHRpb25zLnVybCwgcmVxdWVzdEluaXQpO1xuICAgIGxldCBibG9iOiBCbG9iO1xuXG4gICAgaWYgKCFvcHRpb25zLnByb2dyZXNzKSBibG9iID0gYXdhaXQgcmVzcG9uc2UuYmxvYigpO1xuICAgIGVsc2UgaWYgKCFyZXNwb25zZT8uYm9keSkgYmxvYiA9IG5ldyBCbG9iKCk7XG4gICAgZWxzZSB7XG4gICAgICBjb25zdCByZWFkZXIgPSByZXNwb25zZS5ib2R5LmdldFJlYWRlcigpO1xuXG4gICAgICBsZXQgYnl0ZXMgPSAwO1xuICAgICAgY29uc3QgY2h1bmtzOiAoVWludDhBcnJheSB8IHVuZGVmaW5lZClbXSA9IFtdO1xuXG4gICAgICBjb25zdCBjb250ZW50VHlwZTogc3RyaW5nIHwgbnVsbCA9IHJlc3BvbnNlLmhlYWRlcnMuZ2V0KCdjb250ZW50LXR5cGUnKTtcbiAgICAgIGNvbnN0IGNvbnRlbnRMZW5ndGg6IG51bWJlciA9IHBhcnNlSW50KHJlc3BvbnNlLmhlYWRlcnMuZ2V0KCdjb250ZW50LWxlbmd0aCcpIHx8ICcwJywgMTApO1xuXG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICBjb25zdCB7IGRvbmUsIHZhbHVlIH0gPSBhd2FpdCByZWFkZXIucmVhZCgpO1xuXG4gICAgICAgIGlmIChkb25lKSBicmVhaztcblxuICAgICAgICBjaHVua3MucHVzaCh2YWx1ZSk7XG4gICAgICAgIGJ5dGVzICs9IHZhbHVlPy5sZW5ndGggfHwgMDtcblxuICAgICAgICBjb25zdCBzdGF0dXM6IFByb2dyZXNzU3RhdHVzID0ge1xuICAgICAgICAgIHVybDogb3B0aW9ucy51cmwsXG4gICAgICAgICAgYnl0ZXMsXG4gICAgICAgICAgY29udGVudExlbmd0aCxcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLm5vdGlmeUxpc3RlbmVycygncHJvZ3Jlc3MnLCBzdGF0dXMpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBhbGxDaHVua3MgPSBuZXcgVWludDhBcnJheShieXRlcyk7XG4gICAgICBsZXQgcG9zaXRpb24gPSAwO1xuICAgICAgZm9yIChjb25zdCBjaHVuayBvZiBjaHVua3MpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBjaHVuayA9PT0gJ3VuZGVmaW5lZCcpIGNvbnRpbnVlO1xuXG4gICAgICAgIGFsbENodW5rcy5zZXQoY2h1bmssIHBvc2l0aW9uKTtcbiAgICAgICAgcG9zaXRpb24gKz0gY2h1bmsubGVuZ3RoO1xuICAgICAgfVxuXG4gICAgICBibG9iID0gbmV3IEJsb2IoW2FsbENodW5rcy5idWZmZXJdLCB7IHR5cGU6IGNvbnRlbnRUeXBlIHx8IHVuZGVmaW5lZCB9KTtcbiAgICB9XG5cbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLndyaXRlRmlsZSh7XG4gICAgICBwYXRoOiBvcHRpb25zLnBhdGgsXG4gICAgICBkaXJlY3Rvcnk6IG9wdGlvbnMuZGlyZWN0b3J5ID8/IHVuZGVmaW5lZCxcbiAgICAgIHJlY3Vyc2l2ZTogb3B0aW9ucy5yZWN1cnNpdmUgPz8gZmFsc2UsXG4gICAgICBkYXRhOiBibG9iLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHsgcGF0aDogcmVzdWx0LnVyaSwgYmxvYiB9O1xuICB9O1xuXG4gIHByaXZhdGUgaXNCYXNlNjRTdHJpbmcoc3RyOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGJ0b2EoYXRvYihzdHIpKSA9PSBzdHI7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG59XG5cbmludGVyZmFjZSBFbnRyeU9iaiB7XG4gIHBhdGg6IHN0cmluZztcbiAgZm9sZGVyOiBzdHJpbmc7XG4gIHR5cGU6ICdkaXJlY3RvcnknIHwgJ2ZpbGUnO1xuICBzaXplOiBudW1iZXI7XG4gIGN0aW1lOiBudW1iZXI7XG4gIG10aW1lOiBudW1iZXI7XG4gIHVyaT86IHN0cmluZztcbiAgY29udGVudD86IHN0cmluZyB8IEJsb2I7XG59XG4iLCAiaW1wb3J0IHsgV2ViUGx1Z2luIH0gZnJvbSAnQGNhcGFjaXRvci9jb3JlJztcblxuaW1wb3J0IHR5cGUgeyBCcm93c2VyUGx1Z2luLCBPcGVuT3B0aW9ucyB9IGZyb20gJy4vZGVmaW5pdGlvbnMnO1xuXG5leHBvcnQgY2xhc3MgQnJvd3NlcldlYiBleHRlbmRzIFdlYlBsdWdpbiBpbXBsZW1lbnRzIEJyb3dzZXJQbHVnaW4ge1xuICBfbGFzdFdpbmRvdzogV2luZG93IHwgbnVsbDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX2xhc3RXaW5kb3cgPSBudWxsO1xuICB9XG5cbiAgYXN5bmMgb3BlbihvcHRpb25zOiBPcGVuT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRoaXMuX2xhc3RXaW5kb3cgPSB3aW5kb3cub3BlbihvcHRpb25zLnVybCwgb3B0aW9ucy53aW5kb3dOYW1lIHx8ICdfYmxhbmsnKTtcbiAgfVxuXG4gIGFzeW5jIGNsb3NlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBpZiAodGhpcy5fbGFzdFdpbmRvdyAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuX2xhc3RXaW5kb3cuY2xvc2UoKTtcbiAgICAgICAgdGhpcy5fbGFzdFdpbmRvdyA9IG51bGw7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlamVjdCgnTm8gYWN0aXZlIHdpbmRvdyB0byBjbG9zZSEnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5jb25zdCBCcm93c2VyID0gbmV3IEJyb3dzZXJXZWIoKTtcblxuZXhwb3J0IHsgQnJvd3NlciB9O1xuIiwgIi8vICdwYXRoJyBtb2R1bGUgZXh0cmFjdGVkIGZyb20gTm9kZS5qcyB2OC4xMS4xIChvbmx5IHRoZSBwb3NpeCBwYXJ0KVxuLy8gdHJhbnNwbGl0ZWQgd2l0aCBCYWJlbFxuXG4vLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBhc3NlcnRQYXRoKHBhdGgpIHtcbiAgaWYgKHR5cGVvZiBwYXRoICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1BhdGggbXVzdCBiZSBhIHN0cmluZy4gUmVjZWl2ZWQgJyArIEpTT04uc3RyaW5naWZ5KHBhdGgpKTtcbiAgfVxufVxuXG4vLyBSZXNvbHZlcyAuIGFuZCAuLiBlbGVtZW50cyBpbiBhIHBhdGggd2l0aCBkaXJlY3RvcnkgbmFtZXNcbmZ1bmN0aW9uIG5vcm1hbGl6ZVN0cmluZ1Bvc2l4KHBhdGgsIGFsbG93QWJvdmVSb290KSB7XG4gIHZhciByZXMgPSAnJztcbiAgdmFyIGxhc3RTZWdtZW50TGVuZ3RoID0gMDtcbiAgdmFyIGxhc3RTbGFzaCA9IC0xO1xuICB2YXIgZG90cyA9IDA7XG4gIHZhciBjb2RlO1xuICBmb3IgKHZhciBpID0gMDsgaSA8PSBwYXRoLmxlbmd0aDsgKytpKSB7XG4gICAgaWYgKGkgPCBwYXRoLmxlbmd0aClcbiAgICAgIGNvZGUgPSBwYXRoLmNoYXJDb2RlQXQoaSk7XG4gICAgZWxzZSBpZiAoY29kZSA9PT0gNDcgLyovKi8pXG4gICAgICBicmVhaztcbiAgICBlbHNlXG4gICAgICBjb2RlID0gNDcgLyovKi87XG4gICAgaWYgKGNvZGUgPT09IDQ3IC8qLyovKSB7XG4gICAgICBpZiAobGFzdFNsYXNoID09PSBpIC0gMSB8fCBkb3RzID09PSAxKSB7XG4gICAgICAgIC8vIE5PT1BcbiAgICAgIH0gZWxzZSBpZiAobGFzdFNsYXNoICE9PSBpIC0gMSAmJiBkb3RzID09PSAyKSB7XG4gICAgICAgIGlmIChyZXMubGVuZ3RoIDwgMiB8fCBsYXN0U2VnbWVudExlbmd0aCAhPT0gMiB8fCByZXMuY2hhckNvZGVBdChyZXMubGVuZ3RoIC0gMSkgIT09IDQ2IC8qLiovIHx8IHJlcy5jaGFyQ29kZUF0KHJlcy5sZW5ndGggLSAyKSAhPT0gNDYgLyouKi8pIHtcbiAgICAgICAgICBpZiAocmVzLmxlbmd0aCA+IDIpIHtcbiAgICAgICAgICAgIHZhciBsYXN0U2xhc2hJbmRleCA9IHJlcy5sYXN0SW5kZXhPZignLycpO1xuICAgICAgICAgICAgaWYgKGxhc3RTbGFzaEluZGV4ICE9PSByZXMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICBpZiAobGFzdFNsYXNoSW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgcmVzID0gJyc7XG4gICAgICAgICAgICAgICAgbGFzdFNlZ21lbnRMZW5ndGggPSAwO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlcyA9IHJlcy5zbGljZSgwLCBsYXN0U2xhc2hJbmRleCk7XG4gICAgICAgICAgICAgICAgbGFzdFNlZ21lbnRMZW5ndGggPSByZXMubGVuZ3RoIC0gMSAtIHJlcy5sYXN0SW5kZXhPZignLycpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGxhc3RTbGFzaCA9IGk7XG4gICAgICAgICAgICAgIGRvdHMgPSAwO1xuICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5sZW5ndGggPT09IDIgfHwgcmVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgcmVzID0gJyc7XG4gICAgICAgICAgICBsYXN0U2VnbWVudExlbmd0aCA9IDA7XG4gICAgICAgICAgICBsYXN0U2xhc2ggPSBpO1xuICAgICAgICAgICAgZG90cyA9IDA7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFsbG93QWJvdmVSb290KSB7XG4gICAgICAgICAgaWYgKHJlcy5sZW5ndGggPiAwKVxuICAgICAgICAgICAgcmVzICs9ICcvLi4nO1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJlcyA9ICcuLic7XG4gICAgICAgICAgbGFzdFNlZ21lbnRMZW5ndGggPSAyO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAocmVzLmxlbmd0aCA+IDApXG4gICAgICAgICAgcmVzICs9ICcvJyArIHBhdGguc2xpY2UobGFzdFNsYXNoICsgMSwgaSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICByZXMgPSBwYXRoLnNsaWNlKGxhc3RTbGFzaCArIDEsIGkpO1xuICAgICAgICBsYXN0U2VnbWVudExlbmd0aCA9IGkgLSBsYXN0U2xhc2ggLSAxO1xuICAgICAgfVxuICAgICAgbGFzdFNsYXNoID0gaTtcbiAgICAgIGRvdHMgPSAwO1xuICAgIH0gZWxzZSBpZiAoY29kZSA9PT0gNDYgLyouKi8gJiYgZG90cyAhPT0gLTEpIHtcbiAgICAgICsrZG90cztcbiAgICB9IGVsc2Uge1xuICAgICAgZG90cyA9IC0xO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzO1xufVxuXG5mdW5jdGlvbiBfZm9ybWF0KHNlcCwgcGF0aE9iamVjdCkge1xuICB2YXIgZGlyID0gcGF0aE9iamVjdC5kaXIgfHwgcGF0aE9iamVjdC5yb290O1xuICB2YXIgYmFzZSA9IHBhdGhPYmplY3QuYmFzZSB8fCAocGF0aE9iamVjdC5uYW1lIHx8ICcnKSArIChwYXRoT2JqZWN0LmV4dCB8fCAnJyk7XG4gIGlmICghZGlyKSB7XG4gICAgcmV0dXJuIGJhc2U7XG4gIH1cbiAgaWYgKGRpciA9PT0gcGF0aE9iamVjdC5yb290KSB7XG4gICAgcmV0dXJuIGRpciArIGJhc2U7XG4gIH1cbiAgcmV0dXJuIGRpciArIHNlcCArIGJhc2U7XG59XG5cbnZhciBwb3NpeCA9IHtcbiAgLy8gcGF0aC5yZXNvbHZlKFtmcm9tIC4uLl0sIHRvKVxuICByZXNvbHZlOiBmdW5jdGlvbiByZXNvbHZlKCkge1xuICAgIHZhciByZXNvbHZlZFBhdGggPSAnJztcbiAgICB2YXIgcmVzb2x2ZWRBYnNvbHV0ZSA9IGZhbHNlO1xuICAgIHZhciBjd2Q7XG5cbiAgICBmb3IgKHZhciBpID0gYXJndW1lbnRzLmxlbmd0aCAtIDE7IGkgPj0gLTEgJiYgIXJlc29sdmVkQWJzb2x1dGU7IGktLSkge1xuICAgICAgdmFyIHBhdGg7XG4gICAgICBpZiAoaSA+PSAwKVxuICAgICAgICBwYXRoID0gYXJndW1lbnRzW2ldO1xuICAgICAgZWxzZSB7XG4gICAgICAgIGlmIChjd2QgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICBjd2QgPSBwcm9jZXNzLmN3ZCgpO1xuICAgICAgICBwYXRoID0gY3dkO1xuICAgICAgfVxuXG4gICAgICBhc3NlcnRQYXRoKHBhdGgpO1xuXG4gICAgICAvLyBTa2lwIGVtcHR5IGVudHJpZXNcbiAgICAgIGlmIChwYXRoLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgcmVzb2x2ZWRQYXRoID0gcGF0aCArICcvJyArIHJlc29sdmVkUGF0aDtcbiAgICAgIHJlc29sdmVkQWJzb2x1dGUgPSBwYXRoLmNoYXJDb2RlQXQoMCkgPT09IDQ3IC8qLyovO1xuICAgIH1cblxuICAgIC8vIEF0IHRoaXMgcG9pbnQgdGhlIHBhdGggc2hvdWxkIGJlIHJlc29sdmVkIHRvIGEgZnVsbCBhYnNvbHV0ZSBwYXRoLCBidXRcbiAgICAvLyBoYW5kbGUgcmVsYXRpdmUgcGF0aHMgdG8gYmUgc2FmZSAobWlnaHQgaGFwcGVuIHdoZW4gcHJvY2Vzcy5jd2QoKSBmYWlscylcblxuICAgIC8vIE5vcm1hbGl6ZSB0aGUgcGF0aFxuICAgIHJlc29sdmVkUGF0aCA9IG5vcm1hbGl6ZVN0cmluZ1Bvc2l4KHJlc29sdmVkUGF0aCwgIXJlc29sdmVkQWJzb2x1dGUpO1xuXG4gICAgaWYgKHJlc29sdmVkQWJzb2x1dGUpIHtcbiAgICAgIGlmIChyZXNvbHZlZFBhdGgubGVuZ3RoID4gMClcbiAgICAgICAgcmV0dXJuICcvJyArIHJlc29sdmVkUGF0aDtcbiAgICAgIGVsc2VcbiAgICAgICAgcmV0dXJuICcvJztcbiAgICB9IGVsc2UgaWYgKHJlc29sdmVkUGF0aC5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gcmVzb2x2ZWRQYXRoO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gJy4nO1xuICAgIH1cbiAgfSxcblxuICBub3JtYWxpemU6IGZ1bmN0aW9uIG5vcm1hbGl6ZShwYXRoKSB7XG4gICAgYXNzZXJ0UGF0aChwYXRoKTtcblxuICAgIGlmIChwYXRoLmxlbmd0aCA9PT0gMCkgcmV0dXJuICcuJztcblxuICAgIHZhciBpc0Fic29sdXRlID0gcGF0aC5jaGFyQ29kZUF0KDApID09PSA0NyAvKi8qLztcbiAgICB2YXIgdHJhaWxpbmdTZXBhcmF0b3IgPSBwYXRoLmNoYXJDb2RlQXQocGF0aC5sZW5ndGggLSAxKSA9PT0gNDcgLyovKi87XG5cbiAgICAvLyBOb3JtYWxpemUgdGhlIHBhdGhcbiAgICBwYXRoID0gbm9ybWFsaXplU3RyaW5nUG9zaXgocGF0aCwgIWlzQWJzb2x1dGUpO1xuXG4gICAgaWYgKHBhdGgubGVuZ3RoID09PSAwICYmICFpc0Fic29sdXRlKSBwYXRoID0gJy4nO1xuICAgIGlmIChwYXRoLmxlbmd0aCA+IDAgJiYgdHJhaWxpbmdTZXBhcmF0b3IpIHBhdGggKz0gJy8nO1xuXG4gICAgaWYgKGlzQWJzb2x1dGUpIHJldHVybiAnLycgKyBwYXRoO1xuICAgIHJldHVybiBwYXRoO1xuICB9LFxuXG4gIGlzQWJzb2x1dGU6IGZ1bmN0aW9uIGlzQWJzb2x1dGUocGF0aCkge1xuICAgIGFzc2VydFBhdGgocGF0aCk7XG4gICAgcmV0dXJuIHBhdGgubGVuZ3RoID4gMCAmJiBwYXRoLmNoYXJDb2RlQXQoMCkgPT09IDQ3IC8qLyovO1xuICB9LFxuXG4gIGpvaW46IGZ1bmN0aW9uIGpvaW4oKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApXG4gICAgICByZXR1cm4gJy4nO1xuICAgIHZhciBqb2luZWQ7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyArK2kpIHtcbiAgICAgIHZhciBhcmcgPSBhcmd1bWVudHNbaV07XG4gICAgICBhc3NlcnRQYXRoKGFyZyk7XG4gICAgICBpZiAoYXJnLmxlbmd0aCA+IDApIHtcbiAgICAgICAgaWYgKGpvaW5lZCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgIGpvaW5lZCA9IGFyZztcbiAgICAgICAgZWxzZVxuICAgICAgICAgIGpvaW5lZCArPSAnLycgKyBhcmc7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChqb2luZWQgPT09IHVuZGVmaW5lZClcbiAgICAgIHJldHVybiAnLic7XG4gICAgcmV0dXJuIHBvc2l4Lm5vcm1hbGl6ZShqb2luZWQpO1xuICB9LFxuXG4gIHJlbGF0aXZlOiBmdW5jdGlvbiByZWxhdGl2ZShmcm9tLCB0bykge1xuICAgIGFzc2VydFBhdGgoZnJvbSk7XG4gICAgYXNzZXJ0UGF0aCh0byk7XG5cbiAgICBpZiAoZnJvbSA9PT0gdG8pIHJldHVybiAnJztcblxuICAgIGZyb20gPSBwb3NpeC5yZXNvbHZlKGZyb20pO1xuICAgIHRvID0gcG9zaXgucmVzb2x2ZSh0byk7XG5cbiAgICBpZiAoZnJvbSA9PT0gdG8pIHJldHVybiAnJztcblxuICAgIC8vIFRyaW0gYW55IGxlYWRpbmcgYmFja3NsYXNoZXNcbiAgICB2YXIgZnJvbVN0YXJ0ID0gMTtcbiAgICBmb3IgKDsgZnJvbVN0YXJ0IDwgZnJvbS5sZW5ndGg7ICsrZnJvbVN0YXJ0KSB7XG4gICAgICBpZiAoZnJvbS5jaGFyQ29kZUF0KGZyb21TdGFydCkgIT09IDQ3IC8qLyovKVxuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgdmFyIGZyb21FbmQgPSBmcm9tLmxlbmd0aDtcbiAgICB2YXIgZnJvbUxlbiA9IGZyb21FbmQgLSBmcm9tU3RhcnQ7XG5cbiAgICAvLyBUcmltIGFueSBsZWFkaW5nIGJhY2tzbGFzaGVzXG4gICAgdmFyIHRvU3RhcnQgPSAxO1xuICAgIGZvciAoOyB0b1N0YXJ0IDwgdG8ubGVuZ3RoOyArK3RvU3RhcnQpIHtcbiAgICAgIGlmICh0by5jaGFyQ29kZUF0KHRvU3RhcnQpICE9PSA0NyAvKi8qLylcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHZhciB0b0VuZCA9IHRvLmxlbmd0aDtcbiAgICB2YXIgdG9MZW4gPSB0b0VuZCAtIHRvU3RhcnQ7XG5cbiAgICAvLyBDb21wYXJlIHBhdGhzIHRvIGZpbmQgdGhlIGxvbmdlc3QgY29tbW9uIHBhdGggZnJvbSByb290XG4gICAgdmFyIGxlbmd0aCA9IGZyb21MZW4gPCB0b0xlbiA/IGZyb21MZW4gOiB0b0xlbjtcbiAgICB2YXIgbGFzdENvbW1vblNlcCA9IC0xO1xuICAgIHZhciBpID0gMDtcbiAgICBmb3IgKDsgaSA8PSBsZW5ndGg7ICsraSkge1xuICAgICAgaWYgKGkgPT09IGxlbmd0aCkge1xuICAgICAgICBpZiAodG9MZW4gPiBsZW5ndGgpIHtcbiAgICAgICAgICBpZiAodG8uY2hhckNvZGVBdCh0b1N0YXJ0ICsgaSkgPT09IDQ3IC8qLyovKSB7XG4gICAgICAgICAgICAvLyBXZSBnZXQgaGVyZSBpZiBgZnJvbWAgaXMgdGhlIGV4YWN0IGJhc2UgcGF0aCBmb3IgYHRvYC5cbiAgICAgICAgICAgIC8vIEZvciBleGFtcGxlOiBmcm9tPScvZm9vL2Jhcic7IHRvPScvZm9vL2Jhci9iYXonXG4gICAgICAgICAgICByZXR1cm4gdG8uc2xpY2UodG9TdGFydCArIGkgKyAxKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGkgPT09IDApIHtcbiAgICAgICAgICAgIC8vIFdlIGdldCBoZXJlIGlmIGBmcm9tYCBpcyB0aGUgcm9vdFxuICAgICAgICAgICAgLy8gRm9yIGV4YW1wbGU6IGZyb209Jy8nOyB0bz0nL2ZvbydcbiAgICAgICAgICAgIHJldHVybiB0by5zbGljZSh0b1N0YXJ0ICsgaSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGZyb21MZW4gPiBsZW5ndGgpIHtcbiAgICAgICAgICBpZiAoZnJvbS5jaGFyQ29kZUF0KGZyb21TdGFydCArIGkpID09PSA0NyAvKi8qLykge1xuICAgICAgICAgICAgLy8gV2UgZ2V0IGhlcmUgaWYgYHRvYCBpcyB0aGUgZXhhY3QgYmFzZSBwYXRoIGZvciBgZnJvbWAuXG4gICAgICAgICAgICAvLyBGb3IgZXhhbXBsZTogZnJvbT0nL2Zvby9iYXIvYmF6JzsgdG89Jy9mb28vYmFyJ1xuICAgICAgICAgICAgbGFzdENvbW1vblNlcCA9IGk7XG4gICAgICAgICAgfSBlbHNlIGlmIChpID09PSAwKSB7XG4gICAgICAgICAgICAvLyBXZSBnZXQgaGVyZSBpZiBgdG9gIGlzIHRoZSByb290LlxuICAgICAgICAgICAgLy8gRm9yIGV4YW1wbGU6IGZyb209Jy9mb28nOyB0bz0nLydcbiAgICAgICAgICAgIGxhc3RDb21tb25TZXAgPSAwO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIHZhciBmcm9tQ29kZSA9IGZyb20uY2hhckNvZGVBdChmcm9tU3RhcnQgKyBpKTtcbiAgICAgIHZhciB0b0NvZGUgPSB0by5jaGFyQ29kZUF0KHRvU3RhcnQgKyBpKTtcbiAgICAgIGlmIChmcm9tQ29kZSAhPT0gdG9Db2RlKVxuICAgICAgICBicmVhaztcbiAgICAgIGVsc2UgaWYgKGZyb21Db2RlID09PSA0NyAvKi8qLylcbiAgICAgICAgbGFzdENvbW1vblNlcCA9IGk7XG4gICAgfVxuXG4gICAgdmFyIG91dCA9ICcnO1xuICAgIC8vIEdlbmVyYXRlIHRoZSByZWxhdGl2ZSBwYXRoIGJhc2VkIG9uIHRoZSBwYXRoIGRpZmZlcmVuY2UgYmV0d2VlbiBgdG9gXG4gICAgLy8gYW5kIGBmcm9tYFxuICAgIGZvciAoaSA9IGZyb21TdGFydCArIGxhc3RDb21tb25TZXAgKyAxOyBpIDw9IGZyb21FbmQ7ICsraSkge1xuICAgICAgaWYgKGkgPT09IGZyb21FbmQgfHwgZnJvbS5jaGFyQ29kZUF0KGkpID09PSA0NyAvKi8qLykge1xuICAgICAgICBpZiAob3V0Lmxlbmd0aCA9PT0gMClcbiAgICAgICAgICBvdXQgKz0gJy4uJztcbiAgICAgICAgZWxzZVxuICAgICAgICAgIG91dCArPSAnLy4uJztcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBMYXN0bHksIGFwcGVuZCB0aGUgcmVzdCBvZiB0aGUgZGVzdGluYXRpb24gKGB0b2ApIHBhdGggdGhhdCBjb21lcyBhZnRlclxuICAgIC8vIHRoZSBjb21tb24gcGF0aCBwYXJ0c1xuICAgIGlmIChvdXQubGVuZ3RoID4gMClcbiAgICAgIHJldHVybiBvdXQgKyB0by5zbGljZSh0b1N0YXJ0ICsgbGFzdENvbW1vblNlcCk7XG4gICAgZWxzZSB7XG4gICAgICB0b1N0YXJ0ICs9IGxhc3RDb21tb25TZXA7XG4gICAgICBpZiAodG8uY2hhckNvZGVBdCh0b1N0YXJ0KSA9PT0gNDcgLyovKi8pXG4gICAgICAgICsrdG9TdGFydDtcbiAgICAgIHJldHVybiB0by5zbGljZSh0b1N0YXJ0KTtcbiAgICB9XG4gIH0sXG5cbiAgX21ha2VMb25nOiBmdW5jdGlvbiBfbWFrZUxvbmcocGF0aCkge1xuICAgIHJldHVybiBwYXRoO1xuICB9LFxuXG4gIGRpcm5hbWU6IGZ1bmN0aW9uIGRpcm5hbWUocGF0aCkge1xuICAgIGFzc2VydFBhdGgocGF0aCk7XG4gICAgaWYgKHBhdGgubGVuZ3RoID09PSAwKSByZXR1cm4gJy4nO1xuICAgIHZhciBjb2RlID0gcGF0aC5jaGFyQ29kZUF0KDApO1xuICAgIHZhciBoYXNSb290ID0gY29kZSA9PT0gNDcgLyovKi87XG4gICAgdmFyIGVuZCA9IC0xO1xuICAgIHZhciBtYXRjaGVkU2xhc2ggPSB0cnVlO1xuICAgIGZvciAodmFyIGkgPSBwYXRoLmxlbmd0aCAtIDE7IGkgPj0gMTsgLS1pKSB7XG4gICAgICBjb2RlID0gcGF0aC5jaGFyQ29kZUF0KGkpO1xuICAgICAgaWYgKGNvZGUgPT09IDQ3IC8qLyovKSB7XG4gICAgICAgICAgaWYgKCFtYXRjaGVkU2xhc2gpIHtcbiAgICAgICAgICAgIGVuZCA9IGk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFdlIHNhdyB0aGUgZmlyc3Qgbm9uLXBhdGggc2VwYXJhdG9yXG4gICAgICAgIG1hdGNoZWRTbGFzaCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChlbmQgPT09IC0xKSByZXR1cm4gaGFzUm9vdCA/ICcvJyA6ICcuJztcbiAgICBpZiAoaGFzUm9vdCAmJiBlbmQgPT09IDEpIHJldHVybiAnLy8nO1xuICAgIHJldHVybiBwYXRoLnNsaWNlKDAsIGVuZCk7XG4gIH0sXG5cbiAgYmFzZW5hbWU6IGZ1bmN0aW9uIGJhc2VuYW1lKHBhdGgsIGV4dCkge1xuICAgIGlmIChleHQgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgZXh0ICE9PSAnc3RyaW5nJykgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJleHRcIiBhcmd1bWVudCBtdXN0IGJlIGEgc3RyaW5nJyk7XG4gICAgYXNzZXJ0UGF0aChwYXRoKTtcblxuICAgIHZhciBzdGFydCA9IDA7XG4gICAgdmFyIGVuZCA9IC0xO1xuICAgIHZhciBtYXRjaGVkU2xhc2ggPSB0cnVlO1xuICAgIHZhciBpO1xuXG4gICAgaWYgKGV4dCAhPT0gdW5kZWZpbmVkICYmIGV4dC5sZW5ndGggPiAwICYmIGV4dC5sZW5ndGggPD0gcGF0aC5sZW5ndGgpIHtcbiAgICAgIGlmIChleHQubGVuZ3RoID09PSBwYXRoLmxlbmd0aCAmJiBleHQgPT09IHBhdGgpIHJldHVybiAnJztcbiAgICAgIHZhciBleHRJZHggPSBleHQubGVuZ3RoIC0gMTtcbiAgICAgIHZhciBmaXJzdE5vblNsYXNoRW5kID0gLTE7XG4gICAgICBmb3IgKGkgPSBwYXRoLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBjb2RlID0gcGF0aC5jaGFyQ29kZUF0KGkpO1xuICAgICAgICBpZiAoY29kZSA9PT0gNDcgLyovKi8pIHtcbiAgICAgICAgICAgIC8vIElmIHdlIHJlYWNoZWQgYSBwYXRoIHNlcGFyYXRvciB0aGF0IHdhcyBub3QgcGFydCBvZiBhIHNldCBvZiBwYXRoXG4gICAgICAgICAgICAvLyBzZXBhcmF0b3JzIGF0IHRoZSBlbmQgb2YgdGhlIHN0cmluZywgc3RvcCBub3dcbiAgICAgICAgICAgIGlmICghbWF0Y2hlZFNsYXNoKSB7XG4gICAgICAgICAgICAgIHN0YXJ0ID0gaSArIDE7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKGZpcnN0Tm9uU2xhc2hFbmQgPT09IC0xKSB7XG4gICAgICAgICAgICAvLyBXZSBzYXcgdGhlIGZpcnN0IG5vbi1wYXRoIHNlcGFyYXRvciwgcmVtZW1iZXIgdGhpcyBpbmRleCBpbiBjYXNlXG4gICAgICAgICAgICAvLyB3ZSBuZWVkIGl0IGlmIHRoZSBleHRlbnNpb24gZW5kcyB1cCBub3QgbWF0Y2hpbmdcbiAgICAgICAgICAgIG1hdGNoZWRTbGFzaCA9IGZhbHNlO1xuICAgICAgICAgICAgZmlyc3ROb25TbGFzaEVuZCA9IGkgKyAxO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoZXh0SWR4ID49IDApIHtcbiAgICAgICAgICAgIC8vIFRyeSB0byBtYXRjaCB0aGUgZXhwbGljaXQgZXh0ZW5zaW9uXG4gICAgICAgICAgICBpZiAoY29kZSA9PT0gZXh0LmNoYXJDb2RlQXQoZXh0SWR4KSkge1xuICAgICAgICAgICAgICBpZiAoLS1leHRJZHggPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgLy8gV2UgbWF0Y2hlZCB0aGUgZXh0ZW5zaW9uLCBzbyBtYXJrIHRoaXMgYXMgdGhlIGVuZCBvZiBvdXIgcGF0aFxuICAgICAgICAgICAgICAgIC8vIGNvbXBvbmVudFxuICAgICAgICAgICAgICAgIGVuZCA9IGk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIEV4dGVuc2lvbiBkb2VzIG5vdCBtYXRjaCwgc28gb3VyIHJlc3VsdCBpcyB0aGUgZW50aXJlIHBhdGhcbiAgICAgICAgICAgICAgLy8gY29tcG9uZW50XG4gICAgICAgICAgICAgIGV4dElkeCA9IC0xO1xuICAgICAgICAgICAgICBlbmQgPSBmaXJzdE5vblNsYXNoRW5kO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3RhcnQgPT09IGVuZCkgZW5kID0gZmlyc3ROb25TbGFzaEVuZDtlbHNlIGlmIChlbmQgPT09IC0xKSBlbmQgPSBwYXRoLmxlbmd0aDtcbiAgICAgIHJldHVybiBwYXRoLnNsaWNlKHN0YXJ0LCBlbmQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGkgPSBwYXRoLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIGlmIChwYXRoLmNoYXJDb2RlQXQoaSkgPT09IDQ3IC8qLyovKSB7XG4gICAgICAgICAgICAvLyBJZiB3ZSByZWFjaGVkIGEgcGF0aCBzZXBhcmF0b3IgdGhhdCB3YXMgbm90IHBhcnQgb2YgYSBzZXQgb2YgcGF0aFxuICAgICAgICAgICAgLy8gc2VwYXJhdG9ycyBhdCB0aGUgZW5kIG9mIHRoZSBzdHJpbmcsIHN0b3Agbm93XG4gICAgICAgICAgICBpZiAoIW1hdGNoZWRTbGFzaCkge1xuICAgICAgICAgICAgICBzdGFydCA9IGkgKyAxO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKGVuZCA9PT0gLTEpIHtcbiAgICAgICAgICAvLyBXZSBzYXcgdGhlIGZpcnN0IG5vbi1wYXRoIHNlcGFyYXRvciwgbWFyayB0aGlzIGFzIHRoZSBlbmQgb2Ygb3VyXG4gICAgICAgICAgLy8gcGF0aCBjb21wb25lbnRcbiAgICAgICAgICBtYXRjaGVkU2xhc2ggPSBmYWxzZTtcbiAgICAgICAgICBlbmQgPSBpICsgMTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZW5kID09PSAtMSkgcmV0dXJuICcnO1xuICAgICAgcmV0dXJuIHBhdGguc2xpY2Uoc3RhcnQsIGVuZCk7XG4gICAgfVxuICB9LFxuXG4gIGV4dG5hbWU6IGZ1bmN0aW9uIGV4dG5hbWUocGF0aCkge1xuICAgIGFzc2VydFBhdGgocGF0aCk7XG4gICAgdmFyIHN0YXJ0RG90ID0gLTE7XG4gICAgdmFyIHN0YXJ0UGFydCA9IDA7XG4gICAgdmFyIGVuZCA9IC0xO1xuICAgIHZhciBtYXRjaGVkU2xhc2ggPSB0cnVlO1xuICAgIC8vIFRyYWNrIHRoZSBzdGF0ZSBvZiBjaGFyYWN0ZXJzIChpZiBhbnkpIHdlIHNlZSBiZWZvcmUgb3VyIGZpcnN0IGRvdCBhbmRcbiAgICAvLyBhZnRlciBhbnkgcGF0aCBzZXBhcmF0b3Igd2UgZmluZFxuICAgIHZhciBwcmVEb3RTdGF0ZSA9IDA7XG4gICAgZm9yICh2YXIgaSA9IHBhdGgubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgIHZhciBjb2RlID0gcGF0aC5jaGFyQ29kZUF0KGkpO1xuICAgICAgaWYgKGNvZGUgPT09IDQ3IC8qLyovKSB7XG4gICAgICAgICAgLy8gSWYgd2UgcmVhY2hlZCBhIHBhdGggc2VwYXJhdG9yIHRoYXQgd2FzIG5vdCBwYXJ0IG9mIGEgc2V0IG9mIHBhdGhcbiAgICAgICAgICAvLyBzZXBhcmF0b3JzIGF0IHRoZSBlbmQgb2YgdGhlIHN0cmluZywgc3RvcCBub3dcbiAgICAgICAgICBpZiAoIW1hdGNoZWRTbGFzaCkge1xuICAgICAgICAgICAgc3RhcnRQYXJ0ID0gaSArIDE7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgIGlmIChlbmQgPT09IC0xKSB7XG4gICAgICAgIC8vIFdlIHNhdyB0aGUgZmlyc3Qgbm9uLXBhdGggc2VwYXJhdG9yLCBtYXJrIHRoaXMgYXMgdGhlIGVuZCBvZiBvdXJcbiAgICAgICAgLy8gZXh0ZW5zaW9uXG4gICAgICAgIG1hdGNoZWRTbGFzaCA9IGZhbHNlO1xuICAgICAgICBlbmQgPSBpICsgMTtcbiAgICAgIH1cbiAgICAgIGlmIChjb2RlID09PSA0NiAvKi4qLykge1xuICAgICAgICAgIC8vIElmIHRoaXMgaXMgb3VyIGZpcnN0IGRvdCwgbWFyayBpdCBhcyB0aGUgc3RhcnQgb2Ygb3VyIGV4dGVuc2lvblxuICAgICAgICAgIGlmIChzdGFydERvdCA9PT0gLTEpXG4gICAgICAgICAgICBzdGFydERvdCA9IGk7XG4gICAgICAgICAgZWxzZSBpZiAocHJlRG90U3RhdGUgIT09IDEpXG4gICAgICAgICAgICBwcmVEb3RTdGF0ZSA9IDE7XG4gICAgICB9IGVsc2UgaWYgKHN0YXJ0RG90ICE9PSAtMSkge1xuICAgICAgICAvLyBXZSBzYXcgYSBub24tZG90IGFuZCBub24tcGF0aCBzZXBhcmF0b3IgYmVmb3JlIG91ciBkb3QsIHNvIHdlIHNob3VsZFxuICAgICAgICAvLyBoYXZlIGEgZ29vZCBjaGFuY2UgYXQgaGF2aW5nIGEgbm9uLWVtcHR5IGV4dGVuc2lvblxuICAgICAgICBwcmVEb3RTdGF0ZSA9IC0xO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzdGFydERvdCA9PT0gLTEgfHwgZW5kID09PSAtMSB8fFxuICAgICAgICAvLyBXZSBzYXcgYSBub24tZG90IGNoYXJhY3RlciBpbW1lZGlhdGVseSBiZWZvcmUgdGhlIGRvdFxuICAgICAgICBwcmVEb3RTdGF0ZSA9PT0gMCB8fFxuICAgICAgICAvLyBUaGUgKHJpZ2h0LW1vc3QpIHRyaW1tZWQgcGF0aCBjb21wb25lbnQgaXMgZXhhY3RseSAnLi4nXG4gICAgICAgIHByZURvdFN0YXRlID09PSAxICYmIHN0YXJ0RG90ID09PSBlbmQgLSAxICYmIHN0YXJ0RG90ID09PSBzdGFydFBhcnQgKyAxKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIHJldHVybiBwYXRoLnNsaWNlKHN0YXJ0RG90LCBlbmQpO1xuICB9LFxuXG4gIGZvcm1hdDogZnVuY3Rpb24gZm9ybWF0KHBhdGhPYmplY3QpIHtcbiAgICBpZiAocGF0aE9iamVjdCA9PT0gbnVsbCB8fCB0eXBlb2YgcGF0aE9iamVjdCAhPT0gJ29iamVjdCcpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcInBhdGhPYmplY3RcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgT2JqZWN0LiBSZWNlaXZlZCB0eXBlICcgKyB0eXBlb2YgcGF0aE9iamVjdCk7XG4gICAgfVxuICAgIHJldHVybiBfZm9ybWF0KCcvJywgcGF0aE9iamVjdCk7XG4gIH0sXG5cbiAgcGFyc2U6IGZ1bmN0aW9uIHBhcnNlKHBhdGgpIHtcbiAgICBhc3NlcnRQYXRoKHBhdGgpO1xuXG4gICAgdmFyIHJldCA9IHsgcm9vdDogJycsIGRpcjogJycsIGJhc2U6ICcnLCBleHQ6ICcnLCBuYW1lOiAnJyB9O1xuICAgIGlmIChwYXRoLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHJldDtcbiAgICB2YXIgY29kZSA9IHBhdGguY2hhckNvZGVBdCgwKTtcbiAgICB2YXIgaXNBYnNvbHV0ZSA9IGNvZGUgPT09IDQ3IC8qLyovO1xuICAgIHZhciBzdGFydDtcbiAgICBpZiAoaXNBYnNvbHV0ZSkge1xuICAgICAgcmV0LnJvb3QgPSAnLyc7XG4gICAgICBzdGFydCA9IDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXJ0ID0gMDtcbiAgICB9XG4gICAgdmFyIHN0YXJ0RG90ID0gLTE7XG4gICAgdmFyIHN0YXJ0UGFydCA9IDA7XG4gICAgdmFyIGVuZCA9IC0xO1xuICAgIHZhciBtYXRjaGVkU2xhc2ggPSB0cnVlO1xuICAgIHZhciBpID0gcGF0aC5sZW5ndGggLSAxO1xuXG4gICAgLy8gVHJhY2sgdGhlIHN0YXRlIG9mIGNoYXJhY3RlcnMgKGlmIGFueSkgd2Ugc2VlIGJlZm9yZSBvdXIgZmlyc3QgZG90IGFuZFxuICAgIC8vIGFmdGVyIGFueSBwYXRoIHNlcGFyYXRvciB3ZSBmaW5kXG4gICAgdmFyIHByZURvdFN0YXRlID0gMDtcblxuICAgIC8vIEdldCBub24tZGlyIGluZm9cbiAgICBmb3IgKDsgaSA+PSBzdGFydDsgLS1pKSB7XG4gICAgICBjb2RlID0gcGF0aC5jaGFyQ29kZUF0KGkpO1xuICAgICAgaWYgKGNvZGUgPT09IDQ3IC8qLyovKSB7XG4gICAgICAgICAgLy8gSWYgd2UgcmVhY2hlZCBhIHBhdGggc2VwYXJhdG9yIHRoYXQgd2FzIG5vdCBwYXJ0IG9mIGEgc2V0IG9mIHBhdGhcbiAgICAgICAgICAvLyBzZXBhcmF0b3JzIGF0IHRoZSBlbmQgb2YgdGhlIHN0cmluZywgc3RvcCBub3dcbiAgICAgICAgICBpZiAoIW1hdGNoZWRTbGFzaCkge1xuICAgICAgICAgICAgc3RhcnRQYXJ0ID0gaSArIDE7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgIGlmIChlbmQgPT09IC0xKSB7XG4gICAgICAgIC8vIFdlIHNhdyB0aGUgZmlyc3Qgbm9uLXBhdGggc2VwYXJhdG9yLCBtYXJrIHRoaXMgYXMgdGhlIGVuZCBvZiBvdXJcbiAgICAgICAgLy8gZXh0ZW5zaW9uXG4gICAgICAgIG1hdGNoZWRTbGFzaCA9IGZhbHNlO1xuICAgICAgICBlbmQgPSBpICsgMTtcbiAgICAgIH1cbiAgICAgIGlmIChjb2RlID09PSA0NiAvKi4qLykge1xuICAgICAgICAgIC8vIElmIHRoaXMgaXMgb3VyIGZpcnN0IGRvdCwgbWFyayBpdCBhcyB0aGUgc3RhcnQgb2Ygb3VyIGV4dGVuc2lvblxuICAgICAgICAgIGlmIChzdGFydERvdCA9PT0gLTEpIHN0YXJ0RG90ID0gaTtlbHNlIGlmIChwcmVEb3RTdGF0ZSAhPT0gMSkgcHJlRG90U3RhdGUgPSAxO1xuICAgICAgICB9IGVsc2UgaWYgKHN0YXJ0RG90ICE9PSAtMSkge1xuICAgICAgICAvLyBXZSBzYXcgYSBub24tZG90IGFuZCBub24tcGF0aCBzZXBhcmF0b3IgYmVmb3JlIG91ciBkb3QsIHNvIHdlIHNob3VsZFxuICAgICAgICAvLyBoYXZlIGEgZ29vZCBjaGFuY2UgYXQgaGF2aW5nIGEgbm9uLWVtcHR5IGV4dGVuc2lvblxuICAgICAgICBwcmVEb3RTdGF0ZSA9IC0xO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzdGFydERvdCA9PT0gLTEgfHwgZW5kID09PSAtMSB8fFxuICAgIC8vIFdlIHNhdyBhIG5vbi1kb3QgY2hhcmFjdGVyIGltbWVkaWF0ZWx5IGJlZm9yZSB0aGUgZG90XG4gICAgcHJlRG90U3RhdGUgPT09IDAgfHxcbiAgICAvLyBUaGUgKHJpZ2h0LW1vc3QpIHRyaW1tZWQgcGF0aCBjb21wb25lbnQgaXMgZXhhY3RseSAnLi4nXG4gICAgcHJlRG90U3RhdGUgPT09IDEgJiYgc3RhcnREb3QgPT09IGVuZCAtIDEgJiYgc3RhcnREb3QgPT09IHN0YXJ0UGFydCArIDEpIHtcbiAgICAgIGlmIChlbmQgIT09IC0xKSB7XG4gICAgICAgIGlmIChzdGFydFBhcnQgPT09IDAgJiYgaXNBYnNvbHV0ZSkgcmV0LmJhc2UgPSByZXQubmFtZSA9IHBhdGguc2xpY2UoMSwgZW5kKTtlbHNlIHJldC5iYXNlID0gcmV0Lm5hbWUgPSBwYXRoLnNsaWNlKHN0YXJ0UGFydCwgZW5kKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHN0YXJ0UGFydCA9PT0gMCAmJiBpc0Fic29sdXRlKSB7XG4gICAgICAgIHJldC5uYW1lID0gcGF0aC5zbGljZSgxLCBzdGFydERvdCk7XG4gICAgICAgIHJldC5iYXNlID0gcGF0aC5zbGljZSgxLCBlbmQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0Lm5hbWUgPSBwYXRoLnNsaWNlKHN0YXJ0UGFydCwgc3RhcnREb3QpO1xuICAgICAgICByZXQuYmFzZSA9IHBhdGguc2xpY2Uoc3RhcnRQYXJ0LCBlbmQpO1xuICAgICAgfVxuICAgICAgcmV0LmV4dCA9IHBhdGguc2xpY2Uoc3RhcnREb3QsIGVuZCk7XG4gICAgfVxuXG4gICAgaWYgKHN0YXJ0UGFydCA+IDApIHJldC5kaXIgPSBwYXRoLnNsaWNlKDAsIHN0YXJ0UGFydCAtIDEpO2Vsc2UgaWYgKGlzQWJzb2x1dGUpIHJldC5kaXIgPSAnLyc7XG5cbiAgICByZXR1cm4gcmV0O1xuICB9LFxuXG4gIHNlcDogJy8nLFxuICBkZWxpbWl0ZXI6ICc6JyxcbiAgd2luMzI6IG51bGwsXG4gIHBvc2l4OiBudWxsXG59O1xuXG5wb3NpeC5wb3NpeCA9IHBvc2l4O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBvc2l4O1xuIiwgImltcG9ydCB7IFdlYlBsdWdpbiB9IGZyb20gJ0BjYXBhY2l0b3IvY29yZSc7XG5pbXBvcnQgdHlwZSB7IENhcGFjaXRvckV4Y2VwdGlvbiB9IGZyb20gJ0BjYXBhY2l0b3IvY29yZSc7XG5cbmltcG9ydCB0eXBlIHsgQ2FwYWNpdG9yTm9kZUpTUGx1Z2luIH0gZnJvbSAnLi9pbXBsZW1lbnRhdGlvbic7XG5cbmV4cG9ydCBjbGFzcyBDYXBhY2l0b3JOb2RlSlNXZWIgZXh0ZW5kcyBXZWJQbHVnaW4gaW1wbGVtZW50cyBDYXBhY2l0b3JOb2RlSlNQbHVnaW4ge1xuICBwcm90ZWN0ZWQgdW5hdmFpbGFibGVOb2RlSlMoKTogQ2FwYWNpdG9yRXhjZXB0aW9uIHtcbiAgICByZXR1cm4gdGhpcy51bmF2YWlsYWJsZSgnVGhlIE5vZGVKUyBlbmdpbmUgaXMgbm90IGF2YWlsYWJsZSBpbiB0aGUgYnJvd3NlciEnKTtcbiAgfVxuXG4gIHN0YXJ0KCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRocm93IHRoaXMudW5hdmFpbGFibGVOb2RlSlMoKTtcbiAgfVxuXG4gIHNlbmQoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhyb3cgdGhpcy51bmF2YWlsYWJsZU5vZGVKUygpO1xuICB9XG5cbiAgd2hlblJlYWR5KCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRocm93IHRoaXMudW5hdmFpbGFibGVOb2RlSlMoKTtcbiAgfVxufVxuIiwgImltcG9ydCB7IElQbGF0Zm9ybSB9IGZyb20gXCIuL0lQbGF0Zm9ybVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFBsYXRmb3JtTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogSVBsYXRmb3JtO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgc2V0UGxhdGZvcm0ocGxhdGZvcm06IElQbGF0Zm9ybSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaW5zdGFuY2UgPSBwbGF0Zm9ybTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBjdXJyZW50KCk6IElQbGF0Zm9ybSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlBsYXRmb3JtIG5vdCBpbml0aWFsaXplZC4gQ2FsbCBQbGF0Zm9ybU1hbmFnZXIuc2V0UGxhdGZvcm0oKSBmaXJzdC5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xyXG4gICAgfVxyXG59XHJcbiIsICJpbXBvcnQgeyByZWdpc3RlclBsdWdpbiB9IGZyb20gJ0BjYXBhY2l0b3IvY29yZSc7XG5pbXBvcnQgeyBleHBvc2VTeW5hcHNlIH0gZnJvbSAnQGNhcGFjaXRvci9zeW5hcHNlJztcblxuaW1wb3J0IHR5cGUgeyBGaWxlc3lzdGVtUGx1Z2luIH0gZnJvbSAnLi9kZWZpbml0aW9ucyc7XG5cbmNvbnN0IEZpbGVzeXN0ZW0gPSByZWdpc3RlclBsdWdpbjxGaWxlc3lzdGVtUGx1Z2luPignRmlsZXN5c3RlbScsIHtcbiAgd2ViOiAoKSA9PiBpbXBvcnQoJy4vd2ViJykudGhlbigobSkgPT4gbmV3IG0uRmlsZXN5c3RlbVdlYigpKSxcbn0pO1xuXG5leHBvc2VTeW5hcHNlKCk7XG5cbmV4cG9ydCAqIGZyb20gJy4vZGVmaW5pdGlvbnMnO1xuZXhwb3J0IHsgRmlsZXN5c3RlbSB9O1xuIiwgImZ1bmN0aW9uIHModCkge1xuICB0LkNhcGFjaXRvclV0aWxzLlN5bmFwc2UgPSBuZXcgUHJveHkoXG4gICAge30sXG4gICAge1xuICAgICAgZ2V0KGUsIG4pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm94eSh7fSwge1xuICAgICAgICAgIGdldCh3LCBvKSB7XG4gICAgICAgICAgICByZXR1cm4gKGMsIHAsIHIpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgaSA9IHQuQ2FwYWNpdG9yLlBsdWdpbnNbbl07XG4gICAgICAgICAgICAgIGlmIChpID09PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICByKG5ldyBFcnJvcihgQ2FwYWNpdG9yIHBsdWdpbiAke259IG5vdCBmb3VuZGApKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiBpW29dICE9IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgIHIobmV3IEVycm9yKGBNZXRob2QgJHtvfSBub3QgZm91bmQgaW4gQ2FwYWNpdG9yIHBsdWdpbiAke259YCkpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBhID0gYXdhaXQgaVtvXShjKTtcbiAgICAgICAgICAgICAgICAgIHAoYSk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoYSkge1xuICAgICAgICAgICAgICAgICAgcihhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICApO1xufVxuZnVuY3Rpb24gdSh0KSB7XG4gIHQuQ2FwYWNpdG9yVXRpbHMuU3luYXBzZSA9IG5ldyBQcm94eShcbiAgICB7fSxcbiAgICB7XG4gICAgICBnZXQoZSwgbikge1xuICAgICAgICByZXR1cm4gdC5jb3Jkb3ZhLnBsdWdpbnNbbl07XG4gICAgICB9XG4gICAgfVxuICApO1xufVxuZnVuY3Rpb24gZih0ID0gITEpIHtcbiAgdHlwZW9mIHdpbmRvdyA+IFwidVwiIHx8ICh3aW5kb3cuQ2FwYWNpdG9yVXRpbHMgPSB3aW5kb3cuQ2FwYWNpdG9yVXRpbHMgfHwge30sIHdpbmRvdy5DYXBhY2l0b3IgIT09IHZvaWQgMCAmJiAhdCA/IHMod2luZG93KSA6IHdpbmRvdy5jb3Jkb3ZhICE9PSB2b2lkIDAgJiYgdSh3aW5kb3cpKTtcbn1cbmV4cG9ydCB7XG4gIGYgYXMgZXhwb3NlU3luYXBzZVxufTtcbiIsICJpbXBvcnQgeyByZWdpc3RlclBsdWdpbiB9IGZyb20gJ0BjYXBhY2l0b3IvY29yZSc7XG5cbmltcG9ydCB0eXBlIHsgQnJvd3NlclBsdWdpbiB9IGZyb20gJy4vZGVmaW5pdGlvbnMnO1xuXG5jb25zdCBCcm93c2VyID0gcmVnaXN0ZXJQbHVnaW48QnJvd3NlclBsdWdpbj4oJ0Jyb3dzZXInLCB7XG4gIHdlYjogKCkgPT4gaW1wb3J0KCcuL3dlYicpLnRoZW4oKG0pID0+IG5ldyBtLkJyb3dzZXJXZWIoKSksXG59KTtcblxuZXhwb3J0ICogZnJvbSAnLi9kZWZpbml0aW9ucyc7XG5leHBvcnQgeyBCcm93c2VyIH07XG4iLCAiaW1wb3J0IHsgSVBsYXRmb3JtLCBGaWxlU3RhdCB9IGZyb20gXCIuL0lQbGF0Zm9ybVwiO1xyXG5pbXBvcnQgeyBGaWxlc3lzdGVtLCBEaXJlY3RvcnksIEVuY29kaW5nIH0gZnJvbSBcIkBjYXBhY2l0b3IvZmlsZXN5c3RlbVwiO1xyXG5pbXBvcnQgeyBCcm93c2VyIH0gZnJvbSBcIkBjYXBhY2l0b3IvYnJvd3NlclwiO1xyXG5cclxuaW50ZXJmYWNlIEFuZHJvaWRCcmlkZ2Uge1xyXG4gICAgb3BlblBhdGgocGF0aDogc3RyaW5nKTogdm9pZDtcclxuICAgIGlzUGljdHVyZUluUGljdHVyZVN1cHBvcnRlZCgpOiBib29sZWFuO1xyXG4gICAgZW50ZXJQaWN0dXJlSW5QaWN0dXJlKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKTogYm9vbGVhbjtcclxuICAgIHNldFBpY3R1cmVJblBpY3R1cmVTdGF0ZShlbmFibGVkOiBib29sZWFuLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcik6IHZvaWQ7XHJcbn1cclxuXHJcbmRlY2xhcmUgZ2xvYmFsIHtcclxuICAgIGludGVyZmFjZSBXaW5kb3cge1xyXG4gICAgICAgIFN0cmVtaW9FbmhhbmNlZEFuZHJvaWQ/OiBBbmRyb2lkQnJpZGdlO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ2FwYWNpdG9yUGxhdGZvcm0gaW1wbGVtZW50cyBJUGxhdGZvcm0ge1xuICAgIGlkOiBcImNhcGFjaXRvclwiID0gXCJjYXBhY2l0b3JcIjtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGVuaGFuY2VkUGF0aCA9IFwiU3RyZW1pbyBFbmhhbmNlZFwiO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgdGhlbWVzUGF0aCA9IGAke3RoaXMuZW5oYW5jZWRQYXRofS90aGVtZXNgO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgcGx1Z2luc1BhdGggPSBgJHt0aGlzLmVuaGFuY2VkUGF0aH0vcGx1Z2luc2A7XG4gICAgcHJpdmF0ZSByZWFkb25seSBsb2dzUGF0aCA9IGAke3RoaXMuZW5oYW5jZWRQYXRofS9sb2dzYDtcblxyXG4gICAgcHJpdmF0ZSBpc0V4dGVybmFsUGF0aChwYXRoOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gcGF0aC5zdGFydHNXaXRoKFwiZmlsZTovL1wiKSB8fCBwYXRoLnN0YXJ0c1dpdGgoXCJjb250ZW50Oi8vXCIpIHx8IHBhdGguc3RhcnRzV2l0aChcIi9cIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXREaXJlY3RvcnkocGF0aDogc3RyaW5nKTogRGlyZWN0b3J5IHwgdW5kZWZpbmVkIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pc0V4dGVybmFsUGF0aChwYXRoKSA/IHVuZGVmaW5lZCA6IERpcmVjdG9yeS5Eb2N1bWVudHM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRGaWxlT3B0aW9ucyhwYXRoOiBzdHJpbmcsIGVuY29kaW5nPzogRW5jb2RpbmcpOiB7XHJcbiAgICAgICAgcGF0aDogc3RyaW5nO1xyXG4gICAgICAgIGRpcmVjdG9yeT86IERpcmVjdG9yeTtcclxuICAgICAgICBlbmNvZGluZz86IEVuY29kaW5nO1xyXG4gICAgfSB7XHJcbiAgICAgICAgY29uc3Qgb3B0aW9uczoge1xyXG4gICAgICAgICAgICBwYXRoOiBzdHJpbmc7XHJcbiAgICAgICAgICAgIGRpcmVjdG9yeT86IERpcmVjdG9yeTtcclxuICAgICAgICAgICAgZW5jb2Rpbmc/OiBFbmNvZGluZztcclxuICAgICAgICB9ID0geyBwYXRoIH07XHJcblxyXG4gICAgICAgIGNvbnN0IGRpcmVjdG9yeSA9IHRoaXMuZ2V0RGlyZWN0b3J5KHBhdGgpO1xyXG4gICAgICAgIGlmIChkaXJlY3RvcnkpIHtcclxuICAgICAgICAgICAgb3B0aW9ucy5kaXJlY3RvcnkgPSBkaXJlY3Rvcnk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZW5jb2RpbmcpIHtcclxuICAgICAgICAgICAgb3B0aW9ucy5lbmNvZGluZyA9IGVuY29kaW5nO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG9wdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhc3luYyBleGlzdHNJbkRpcmVjdG9yeShwYXRoOiBzdHJpbmcsIGRpcmVjdG9yeTogRGlyZWN0b3J5KTogUHJvbWlzZTxib29sZWFuPiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgYXdhaXQgRmlsZXN5c3RlbS5zdGF0KHsgcGF0aCwgZGlyZWN0b3J5IH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGNhdGNoIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIHJlYWRkaXJJbkRpcmVjdG9yeShwYXRoOiBzdHJpbmcsIGRpcmVjdG9yeTogRGlyZWN0b3J5KTogUHJvbWlzZTxzdHJpbmdbXT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IEZpbGVzeXN0ZW0ucmVhZGRpcih7IHBhdGgsIGRpcmVjdG9yeSB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5maWxlcy5tYXAoZmlsZSA9PiBmaWxlLm5hbWUpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcclxuICAgICAgICAgICAgaWYgKGVycm9yPy5tZXNzYWdlPy5pbmNsdWRlcyhcImRvZXMgbm90IGV4aXN0XCIpKSByZXR1cm4gW107XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gcmVhZGRpcjpcIiwgZXJyb3IpO1xyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYXN5bmMgbWlncmF0ZUxlZ2FjeURpcmVjdG9yeShvbGRQYXRoOiBzdHJpbmcsIG5ld1BhdGg6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGNvbnN0IGxlZ2FjeUZpbGVzID0gYXdhaXQgdGhpcy5yZWFkZGlySW5EaXJlY3Rvcnkob2xkUGF0aCwgRGlyZWN0b3J5LkRhdGEpO1xyXG4gICAgICAgIGlmICghbGVnYWN5RmlsZXMubGVuZ3RoKSByZXR1cm47XHJcblxyXG4gICAgICAgIGF3YWl0IHRoaXMubWtkaXIobmV3UGF0aCk7XHJcbiAgICAgICAgY29uc3QgbWlncmF0ZWRGaWxlcyA9IG5ldyBTZXQoYXdhaXQgdGhpcy5yZWFkZGlyKG5ld1BhdGgpKTtcclxuXHJcbiAgICAgICAgZm9yIChjb25zdCBmaWxlTmFtZSBvZiBsZWdhY3lGaWxlcykge1xyXG4gICAgICAgICAgICBpZiAobWlncmF0ZWRGaWxlcy5oYXMoZmlsZU5hbWUpKSBjb250aW51ZTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGxlZ2FjeVBhdGggPSBgJHtvbGRQYXRofS8ke2ZpbGVOYW1lfWA7XHJcbiAgICAgICAgICAgIGNvbnN0IGxlZ2FjeVN0YXQgPSBhd2FpdCBGaWxlc3lzdGVtLnN0YXQoe1xyXG4gICAgICAgICAgICAgICAgcGF0aDogbGVnYWN5UGF0aCxcclxuICAgICAgICAgICAgICAgIGRpcmVjdG9yeTogRGlyZWN0b3J5LkRhdGFcclxuICAgICAgICAgICAgfSkuY2F0Y2goKCkgPT4gbnVsbCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWxlZ2FjeVN0YXQgfHwgbGVnYWN5U3RhdC50eXBlICE9PSBcImZpbGVcIikgY29udGludWU7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgRmlsZXN5c3RlbS5yZWFkRmlsZSh7XHJcbiAgICAgICAgICAgICAgICBwYXRoOiBsZWdhY3lQYXRoLFxyXG4gICAgICAgICAgICAgICAgZGlyZWN0b3J5OiBEaXJlY3RvcnkuRGF0YSxcclxuICAgICAgICAgICAgICAgIGVuY29kaW5nOiBFbmNvZGluZy5VVEY4XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgYXdhaXQgRmlsZXN5c3RlbS53cml0ZUZpbGUoe1xyXG4gICAgICAgICAgICAgICAgcGF0aDogYCR7bmV3UGF0aH0vJHtmaWxlTmFtZX1gLFxyXG4gICAgICAgICAgICAgICAgZGlyZWN0b3J5OiBEaXJlY3RvcnkuRG9jdW1lbnRzLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogY29udGVudC5kYXRhIGFzIHN0cmluZyxcclxuICAgICAgICAgICAgICAgIGVuY29kaW5nOiBFbmNvZGluZy5VVEY4XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIGVuc3VyZVBlcm1pc3Npb25zKCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbFNldHRsZWQoW1xuICAgICAgICAgICAgRmlsZXN5c3RlbS5yZXF1ZXN0UGVybWlzc2lvbnMoKVxuICAgICAgICBdKTtcbiAgICB9XG5cclxuICAgIHByaXZhdGUgZ2V0QW5kcm9pZEJyaWRnZSgpOiBBbmRyb2lkQnJpZGdlIHwgdW5kZWZpbmVkIHtcclxuICAgICAgICByZXR1cm4gdHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIiA/IHVuZGVmaW5lZCA6IHdpbmRvdy5TdHJlbWlvRW5oYW5jZWRBbmRyb2lkO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIHJlYWRGaWxlKHBhdGg6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgRmlsZXN5c3RlbS5yZWFkRmlsZSh0aGlzLmdldEZpbGVPcHRpb25zKHBhdGgsIEVuY29kaW5nLlVURjgpKTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGEgYXMgc3RyaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIHdyaXRlRmlsZShwYXRoOiBzdHJpbmcsIGNvbnRlbnQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGF3YWl0IEZpbGVzeXN0ZW0ud3JpdGVGaWxlKHtcclxuICAgICAgICAgICAgLi4udGhpcy5nZXRGaWxlT3B0aW9ucyhwYXRoLCBFbmNvZGluZy5VVEY4KSxcclxuICAgICAgICAgICAgZGF0YTogY29udGVudFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIHJlYWRkaXIocGF0aDogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmdbXT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IEZpbGVzeXN0ZW0ucmVhZGRpcih0aGlzLmdldEZpbGVPcHRpb25zKHBhdGgpKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5maWxlcy5tYXAoZiA9PiBmLm5hbWUpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcclxuICAgICAgICAgICAgaWYgKGVycm9yPy5tZXNzYWdlPy5pbmNsdWRlcyhcImRvZXMgbm90IGV4aXN0XCIpKSByZXR1cm4gW107XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gcmVhZGRpcjpcIiwgZXJyb3IpO1xyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGV4aXN0cyhwYXRoOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBhd2FpdCBGaWxlc3lzdGVtLnN0YXQodGhpcy5nZXRGaWxlT3B0aW9ucyhwYXRoKSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gY2F0Y2gge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIHVubGluayhwYXRoOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBhd2FpdCBGaWxlc3lzdGVtLmRlbGV0ZUZpbGUodGhpcy5nZXRGaWxlT3B0aW9ucyhwYXRoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgbWtkaXIocGF0aDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGlmIChhd2FpdCB0aGlzLmV4aXN0cyhwYXRoKSkgcmV0dXJuO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCBGaWxlc3lzdGVtLm1rZGlyKHtcbiAgICAgICAgICAgICAgICAuLi50aGlzLmdldEZpbGVPcHRpb25zKHBhdGgpLFxuICAgICAgICAgICAgICAgIHJlY3Vyc2l2ZTogdHJ1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICAgICAgICAgIC8vIElnbm9yZSBlcnJvciBpZiBkaXJlY3RvcnkgYWxyZWFkeSBleGlzdHNcbiAgICAgICAgICAgIGlmIChlcnJvcj8ubWVzc2FnZT8uaW5jbHVkZXMoXCJhbHJlYWR5IGV4aXN0c1wiKSB8fCBhd2FpdCB0aGlzLmV4aXN0cyhwYXRoKSkgcmV0dXJuO1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byBjcmVhdGUgZGlyZWN0b3J5OlwiLCBlcnJvcik7XG4gICAgICAgIH1cbiAgICB9XG5cclxuICAgIGFzeW5jIHN0YXQocGF0aDogc3RyaW5nKTogUHJvbWlzZTxGaWxlU3RhdD4ge1xyXG4gICAgICAgIGNvbnN0IHN0YXQgPSBhd2FpdCBGaWxlc3lzdGVtLnN0YXQodGhpcy5nZXRGaWxlT3B0aW9ucyhwYXRoKSk7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaXNGaWxlOiBzdGF0LnR5cGUgPT09ICdmaWxlJyxcclxuICAgICAgICAgICAgaXNEaXJlY3Rvcnk6IHN0YXQudHlwZSA9PT0gJ2RpcmVjdG9yeSdcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIG9wZW5QYXRoKHBhdGg6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGNvbnN0IGJyaWRnZSA9IHRoaXMuZ2V0QW5kcm9pZEJyaWRnZSgpO1xyXG4gICAgICAgIGlmIChicmlkZ2UpIHtcclxuICAgICAgICAgICAgYnJpZGdlLm9wZW5QYXRoKHBhdGgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zb2xlLmluZm8oXCJPcGVuIHRoaXMgZm9sZGVyIGZyb20geW91ciBGaWxlcyBhcHA6XCIsIHBhdGgpO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIG9wZW5FeHRlcm5hbCh1cmw6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGF3YWl0IEJyb3dzZXIub3Blbih7IHVybCB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpc1BpY3R1cmVJblBpY3R1cmVTdXBwb3J0ZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QW5kcm9pZEJyaWRnZSgpPy5pc1BpY3R1cmVJblBpY3R1cmVTdXBwb3J0ZWQoKSA/PyBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBlbnRlclBpY3R1cmVJblBpY3R1cmUod2lkdGggPSAxNiwgaGVpZ2h0ID0gOSk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgICAgIGNvbnN0IGJyaWRnZSA9IHRoaXMuZ2V0QW5kcm9pZEJyaWRnZSgpO1xyXG4gICAgICAgIGlmICghYnJpZGdlKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgcmV0dXJuIGJyaWRnZS5lbnRlclBpY3R1cmVJblBpY3R1cmUod2lkdGgsIGhlaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgc2V0UGljdHVyZUluUGljdHVyZVN0YXRlKGVuYWJsZWQ6IGJvb2xlYW4sIHdpZHRoID0gMTYsIGhlaWdodCA9IDkpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICB0aGlzLmdldEFuZHJvaWRCcmlkZ2UoKT8uc2V0UGljdHVyZUluUGljdHVyZVN0YXRlKGVuYWJsZWQsIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFRoZW1lc1BhdGgoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50aGVtZXNQYXRoO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFBsdWdpbnNQYXRoKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGx1Z2luc1BhdGg7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RW5oYW5jZWRQYXRoKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZW5oYW5jZWRQYXRoO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGluaXQoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGF3YWl0IHRoaXMuZW5zdXJlUGVybWlzc2lvbnMoKTtcbiAgICAgICAgYXdhaXQgdGhpcy5ta2Rpcih0aGlzLmdldEVuaGFuY2VkUGF0aCgpKTtcbiAgICAgICAgYXdhaXQgdGhpcy5ta2Rpcih0aGlzLmdldFRoZW1lc1BhdGgoKSk7XG4gICAgICAgIGF3YWl0IHRoaXMubWtkaXIodGhpcy5nZXRQbHVnaW5zUGF0aCgpKTtcbiAgICAgICAgYXdhaXQgdGhpcy5ta2Rpcih0aGlzLmxvZ3NQYXRoKTtcblxuICAgICAgICBhd2FpdCB0aGlzLm1pZ3JhdGVMZWdhY3lEaXJlY3RvcnkoXCJ0aGVtZXNcIiwgdGhpcy5nZXRUaGVtZXNQYXRoKCkpO1xuICAgICAgICBhd2FpdCB0aGlzLm1pZ3JhdGVMZWdhY3lEaXJlY3RvcnkoXCJwbHVnaW5zXCIsIHRoaXMuZ2V0UGx1Z2luc1BhdGgoKSk7XG5cbiAgICAgICAgY29uc3QgbGVnYWN5Um9vdEV4aXN0cyA9IGF3YWl0IHRoaXMuZXhpc3RzSW5EaXJlY3RvcnkoXCJsb2dzXCIsIERpcmVjdG9yeS5EYXRhKTtcbiAgICAgICAgaWYgKGxlZ2FjeVJvb3RFeGlzdHMpIHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMubWlncmF0ZUxlZ2FjeURpcmVjdG9yeShcImxvZ3NcIiwgdGhpcy5sb2dzUGF0aCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCAiY2xhc3MgQnJvd3NlckxvZ2dlciB7XHJcbiAgICBpbmZvKG1lc3NhZ2U6IHN0cmluZywgLi4ubWV0YTogYW55W10pIHtcclxuICAgICAgICBjb25zb2xlLmluZm8oYFtJTkZPXSAke21lc3NhZ2V9YCwgLi4ubWV0YSk7XHJcbiAgICB9XHJcbiAgICB3YXJuKG1lc3NhZ2U6IHN0cmluZywgLi4ubWV0YTogYW55W10pIHtcclxuICAgICAgICBjb25zb2xlLndhcm4oYFtXQVJOXSAke21lc3NhZ2V9YCwgLi4ubWV0YSk7XHJcbiAgICB9XHJcbiAgICBlcnJvcihtZXNzYWdlOiBzdHJpbmcsIC4uLm1ldGE6IGFueVtdKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihgW0VSUk9SXSAke21lc3NhZ2V9YCwgLi4ubWV0YSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IGxvZ2dlciA9IG5ldyBCcm93c2VyTG9nZ2VyKCk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TG9nZ2VyKGxhYmVsOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiBsb2dnZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGxvZ2dlcjtcclxuIiwgIi8qKlxyXG4gKiBDZW50cmFsaXplZCBjb25zdGFudHMgZm9yIFN0cmVtaW8gRW5oYW5jZWRcclxuICogVXNpbmcgY29uc3RhbnRzIGluc3RlYWQgb2YgbWFnaWMgc3RyaW5ncyBpbXByb3ZlcyBtYWludGFpbmFiaWxpdHlcclxuICovXHJcblxyXG4vLyBDU1MgU2VsZWN0b3JzIHVzZWQgdG8gaW50ZXJhY3Qgd2l0aCBTdHJlbWlvJ3MgVUlcclxuLy8gTm90ZTogVGhlc2UgbWF5IG5lZWQgdXBkYXRpbmcgd2hlbiBTdHJlbWlvIHVwZGF0ZXMgdGhlaXIgY2xhc3MgbmFtZXNcclxuZXhwb3J0IGNvbnN0IFNFTEVDVE9SUyA9IHtcclxuICAgIFNFQ1RJT05TX0NPTlRBSU5FUjogJ1tjbGFzc149XCJzZWN0aW9ucy1jb250YWluZXItXCJdJyxcclxuICAgIFNFQ1RJT046ICdbY2xhc3NePVwic2VjdGlvbi1cIl0nLFxyXG4gICAgQ0FURUdPUlk6ICcuY2F0ZWdvcnktR1AwaEknLFxyXG4gICAgQ0FURUdPUllfTEFCRUw6ICcubGFiZWwtTl9PMnYnLFxyXG4gICAgQ0FURUdPUllfSUNPTjogJy5pY29uLW9ab3lWJyxcclxuICAgIENBVEVHT1JZX0hFQURJTkc6ICcuaGVhZGluZy1YZVBGbCcsXHJcbiAgICBMQUJFTDogJ1tjbGFzc149XCJsYWJlbC13WEczZVwiXScsXHJcbiAgICBOQVZfTUVOVTogJy5tZW51LXhlRTA2JyxcclxuICAgIFNFVFRJTkdTX0NPTlRFTlQ6ICcuc2V0dGluZ3MtY29udGVudC1jbzVlVScsXHJcbiAgICBFTkhBTkNFRF9TRUNUSU9OOiAnI2VuaGFuY2VkJyxcclxuICAgIFRIRU1FU19DQVRFR09SWTogJyNlbmhhbmNlZCA+IGRpdjpudGgtY2hpbGQoMiknLFxyXG4gICAgUExVR0lOU19DQVRFR09SWTogJyNlbmhhbmNlZCA+IGRpdjpudGgtY2hpbGQoMyknLFxyXG4gICAgQUJPVVRfQ0FURUdPUlk6ICcjZW5oYW5jZWQgPiBkaXY6bnRoLWNoaWxkKDQpJyxcclxuICAgIFJPVVRFX0NPTlRBSU5FUjogJy5yb3V0ZS1jb250YWluZXI6bGFzdC1jaGlsZCAucm91dGUtY29udGVudCcsXHJcbiAgICBNRVRBX0RFVEFJTFNfQ09OVEFJTkVSOiAnLm1ldGFkZXRhaWxzLWNvbnRhaW5lci1LX0RxYScsXHJcbiAgICBERVNDUklQVElPTl9DT05UQUlORVI6ICcuZGVzY3JpcHRpb24tY29udGFpbmVyLXlpOGlVJyxcclxuICAgIEFERE9OU19MSVNUX0NPTlRBSU5FUjogJy5hZGRvbnMtbGlzdC1jb250YWluZXItT3ZyMlonLFxyXG4gICAgQURET05fQ09OVEFJTkVSOiAnLmFkZG9uLWNvbnRhaW5lci1sQzVLTicsXHJcbiAgICBOQU1FX0NPTlRBSU5FUjogJy5uYW1lLWNvbnRhaW5lci1xSUFnOCcsXHJcbiAgICBERVNDUklQVElPTl9JVEVNOiAnLmRlc2NyaXB0aW9uLWNvbnRhaW5lci12N0poZScsXHJcbiAgICBUWVBFU19DT05UQUlORVI6ICcudHlwZXMtY29udGFpbmVyLURhT3JnJyxcclxuICAgIFNFQVJDSF9JTlBVVDogJy5zZWFyY2gtaW5wdXQtYkFnQWgnLFxyXG4gICAgSE9SSVpPTlRBTF9OQVY6ICcuaG9yaXpvbnRhbC1uYXYtYmFyLWNvbnRhaW5lci1ZX3p2SycsXHJcbiAgICBUT0FTVF9JVEVNOiAnLnRvYXN0LWl0ZW0tY29udGFpbmVyLW5HMHVrJyxcclxuICAgIFRPQVNUX0NPTlRBSU5FUjogJy50b2FzdHMtY29udGFpbmVyLW9LRUN5J1xyXG59IGFzIGNvbnN0O1xyXG5cclxuLy8gQ1NTIENsYXNzZXMgdXNlZCBmb3Igc3R5bGluZ1xyXG5leHBvcnQgY29uc3QgQ0xBU1NFUyA9IHtcclxuICAgIE9QVElPTjogJ29wdGlvbi12Rk9BUycsXHJcbiAgICBDT05URU5UOiAnY29udGVudC1QMlQwaScsXHJcbiAgICBCVVRUT046ICdidXR0b24tRE5tWUwnLFxyXG4gICAgQlVUVE9OX0NPTlRBSU5FUjogJ2J1dHRvbi1jb250YWluZXItelZMSDYnLFxyXG4gICAgU0VMRUNURUQ6ICdzZWxlY3RlZC1TN1NlSycsXHJcbiAgICBJTlNUQUxMX0JVVFRPTjogJ2luc3RhbGwtYnV0dG9uLWNvbnRhaW5lci15ZmNxNScsXHJcbiAgICBVTklOU1RBTExfQlVUVE9OOiAndW5pbnN0YWxsLWJ1dHRvbi1jb250YWluZXItb1Y0WW8nLFxyXG4gICAgQ0hFQ0tFRDogJ2NoZWNrZWQnLFxyXG59IGFzIGNvbnN0O1xyXG5cclxuLy8gTG9jYWxTdG9yYWdlIGtleXNcclxuZXhwb3J0IGNvbnN0IFNUT1JBR0VfS0VZUyA9IHtcclxuICAgIEVOQUJMRURfUExVR0lOUzogJ2VuYWJsZWRQbHVnaW5zJyxcclxuICAgIENVUlJFTlRfVEhFTUU6ICdjdXJyZW50VGhlbWUnLFxyXG4gICAgRElTQ09SRF9SUEM6ICdkaXNjb3JkcmljaHByZXNlbmNlJyxcclxuICAgIENIRUNLX1VQREFURVNfT05fU1RBUlRVUDogJ2NoZWNrRm9yVXBkYXRlc09uU3RhcnR1cCcsXHJcbn0gYXMgY29uc3Q7XHJcblxyXG4vLyBJUEMgQ2hhbm5lbCBuYW1lcyBmb3IgbWFpbiA8LT4gcmVuZGVyZXIgY29tbXVuaWNhdGlvblxyXG5leHBvcnQgY29uc3QgSVBDX0NIQU5ORUxTID0ge1xyXG4gICAgTUlOSU1JWkVfV0lORE9XOiAnbWluaW1pemUtd2luZG93JyxcclxuICAgIE1BWElNSVpFX1dJTkRPVzogJ21heGltaXplLXdpbmRvdycsXHJcbiAgICBDTE9TRV9XSU5ET1c6ICdjbG9zZS13aW5kb3cnLFxyXG4gICAgU0VUX1RSQU5TUEFSRU5DWTogJ3NldC10cmFuc3BhcmVuY3knLFxyXG4gICAgR0VUX1RSQU5TUEFSRU5DWV9TVEFUVVM6ICdnZXQtdHJhbnNwYXJlbmN5LXN0YXR1cycsXHJcbiAgICBVUERBVEVfQ0hFQ0tfU1RBUlRVUDogJ3VwZGF0ZS1jaGVjay1vbi1zdGFydHVwJyxcclxuICAgIFVQREFURV9DSEVDS19VU0VSOiAndXBkYXRlLWNoZWNrLXVzZXJyZXF1ZXN0JyxcclxuICAgIEZVTExTQ1JFRU5fQ0hBTkdFRDogJ2Z1bGxzY3JlZW4tY2hhbmdlZCcsXHJcbiAgICBFWFRSQUNUX0VNQkVEREVEX1NVQlRJVExFUzogJ2V4dHJhY3QtZW1iZWRkZWQtc3VidGl0bGVzJyxcclxufSBhcyBjb25zdDtcclxuXHJcbi8vIEZpbGUgZXh0ZW5zaW9ucyBmb3IgbW9kc1xyXG5leHBvcnQgY29uc3QgRklMRV9FWFRFTlNJT05TID0ge1xyXG4gICAgVEhFTUU6ICcudGhlbWUuY3NzJyxcclxuICAgIFBMVUdJTjogJy5wbHVnaW4uanMnLFxyXG59IGFzIGNvbnN0O1xyXG5cclxuLy8gVVJMc1xyXG5leHBvcnQgY29uc3QgVVJMUyA9IHtcclxuICAgIFNUUkVNSU9fV0VCOiAnaHR0cHM6Ly93ZWIuc3RyZW1pby5jb20vJyxcclxuICAgIFNUUkVNSU9fV0VCX0FERF9BRERPTjogJ2h0dHBzOi8vd2ViLnN0cmVtaW8uY29tLyMvYWRkb25zP2FkZG9uPScsXHJcbiAgICBSRUdJU1RSWTogJ2h0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9SRVZFTkdFOTc3L3N0cmVtaW8tZW5oYW5jZWQtcmVnaXN0cnkvcmVmcy9oZWFkcy9tYWluL3JlZ2lzdHJ5Lmpzb24nLFxyXG4gICAgVkVSU0lPTl9DSEVDSzogJ2h0dHBzOi8vZ2l0aHViLmNvbS9SRVZFTkdFOTc3L3N0cmVtaW8tZW5oYW5jZWQtY29tbXVuaXR5L3Jhdy9tYWluL3ZlcnNpb24nLFxyXG4gICAgUkVMRUFTRVNfQVBJOiAnaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS9yZXBvcy9SRVZFTkdFOTc3L3N0cmVtaW8tZW5oYW5jZWQtY29tbXVuaXR5L3JlbGVhc2VzL2xhdGVzdCcsXHJcbiAgICBSRUxFQVNFU19QQUdFOiAnaHR0cHM6Ly9naXRodWIuY29tL1JFVkVOR0U5Nzcvc3RyZW1pby1lbmhhbmNlZC1jb21tdW5pdHkvcmVsZWFzZXMvbGF0ZXN0JyxcclxuICAgIFNUUkVNSU9fU0VSVklDRV9HSVRIVUJfQVBJOiBcImh0dHBzOi8vYXBpLmdpdGh1Yi5jb20vcmVwb3MvU3RyZW1pby9zdHJlbWlvLXNlcnZpY2UvcmVsZWFzZXMvbGF0ZXN0XCJcclxufSBhcyBjb25zdDtcclxuXHJcbi8vIHNlcnZlci5qcyAoU3RyZW1pbyBzdHJlYW1pbmcgc2VydmVyKSBEb3dubG9hZCBVUkxcclxuZXhwb3J0IGNvbnN0IFNFUlZFUl9KU19VUkwgPSBcImh0dHBzOi8vZGwuc3RyZW0uaW8vc2VydmVyL3Y0LjIwLjEyL2Rlc2t0b3Avc2VydmVyLmpzXCI7XHJcblxyXG4vLyBGRm1wZWcgRG93bmxvYWQgVVJMc1xyXG5leHBvcnQgY29uc3QgRkZNUEVHX1VSTFMgPSB7XHJcbiAgICB3aW4zMjoge1xyXG4gICAgICAgIHg2NDogXCJodHRwczovL2dpdGh1Yi5jb20vQnRiTi9GRm1wZWctQnVpbGRzL3JlbGVhc2VzL2Rvd25sb2FkL2xhdGVzdC9mZm1wZWctbWFzdGVyLWxhdGVzdC13aW42NC1ncGwuemlwXCIsXHJcbiAgICAgICAgYXJtNjQ6IFwiaHR0cHM6Ly9naXRodWIuY29tL0J0Yk4vRkZtcGVnLUJ1aWxkcy9yZWxlYXNlcy9kb3dubG9hZC9sYXRlc3QvZmZtcGVnLW1hc3Rlci1sYXRlc3Qtd2luYXJtNjQtZ3BsLnppcFwiLFxyXG4gICAgfSxcclxuICAgIGRhcndpbjoge1xyXG4gICAgICAgIHg2NDogXCJodHRwczovL2ZmbXBlZy5tYXJ0aW4tcmllZGwuZGUvZG93bmxvYWQvbWFjb3MvYW1kNjQvMTc2NjQzNzI5N184LjAuMS9mZm1wZWcuemlwXCIsXHJcbiAgICAgICAgYXJtNjQ6IFwiaHR0cHM6Ly9mZm1wZWcubWFydGluLXJpZWRsLmRlL2Rvd25sb2FkL21hY29zL2FybTY0LzE3NjY0MzAxMzJfOC4wLjEvZmZtcGVnLnppcFwiLFxyXG4gICAgfSxcclxuICAgIGxpbnV4OiB7XHJcbiAgICAgICAgeDY0OiBcImh0dHBzOi8vam9obnZhbnNpY2tsZS5jb20vZmZtcGVnL3JlbGVhc2VzL2ZmbXBlZy1yZWxlYXNlLWFtZDY0LXN0YXRpYy50YXIueHpcIixcclxuICAgICAgICBhcm02NDogXCJodHRwczovL2pvaG52YW5zaWNrbGUuY29tL2ZmbXBlZy9yZWxlYXNlcy9mZm1wZWctcmVsZWFzZS1hcm02NC1zdGF0aWMudGFyLnh6XCIsXHJcbiAgICB9LFxyXG59IGFzIGNvbnN0O1xyXG5cclxuLy8gRkZwcm9iZSBEb3dubG9hZCBVUkxzIGZvciBtYWNPU1xyXG5leHBvcnQgY29uc3QgTUFDT1NfRkZQUk9CRV9VUkxTID0ge1xyXG4gICAgeDY0OiBcImh0dHBzOi8vZmZtcGVnLm1hcnRpbi1yaWVkbC5kZS9kb3dubG9hZC9tYWNvcy9hbWQ2NC8xNzY2NDM3Mjk3XzguMC4xL2ZmcHJvYmUuemlwXCIsXHJcbiAgICBhcm02NDogXCJodHRwczovL2ZmbXBlZy5tYXJ0aW4tcmllZGwuZGUvZG93bmxvYWQvbWFjb3MvYXJtNjQvMTc2NjQzMDEzMl84LjAuMS9mZnByb2JlLnppcFwiLFxyXG59O1xyXG5cclxuLy8gRGlzY29yZCBSUENcclxuZXhwb3J0IGNvbnN0IERJU0NPUkQgPSB7XHJcbiAgICBDTElFTlRfSUQ6ICcxMjAwMTg2NzUwNzI3ODkzMTY0JyxcclxuICAgIFJFQ09OTkVDVF9JTlRFUlZBTDogMTAwMDAsXHJcbiAgICBERUZBVUxUX0lNQUdFOiAnMTAyNHN0cmVtaW8nLFxyXG59IGFzIGNvbnN0O1xyXG5cclxuLy8gVGltZW91dHNcclxuZXhwb3J0IGNvbnN0IFRJTUVPVVRTID0ge1xyXG4gICAgRUxFTUVOVF9XQUlUOiAxMDAwMCxcclxuICAgIElOU1RBTExfQ09NUExFVElPTjogMTIwMDAwLFxyXG4gICAgU0VSVklDRV9DSEVDS19JTlRFUlZBTDogNTAwMCxcclxuICAgIFNFUlZFUl9SRUxPQURfREVMQVk6IDE1MDAsXHJcbiAgICBDT1JFU1RBVEVfUkVUUllfSU5URVJWQUw6IDEwMDAsXHJcbiAgICBDT1JFU1RBVEVfTUFYX1JFVFJJRVM6IDMwLFxyXG59IGFzIGNvbnN0O1xyXG4iLCAiPGRpdiBjbGFzcz1cIm5hdi1jb250ZW50LWNvbnRhaW5lci16bDloUVwiIHN0eWxlPVwid2lkdGg6IDkwJTsgb3ZlcmZsb3cteTogYXV0bztcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJhZGRvbnMtY29udGVudC16aEZCbFwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJzZWxlY3RhYmxlLWlucHV0cy1jb250YWluZXItdFV1bDFcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNwYWNpbmctd0gxdzVcIj48L2Rpdj5cclxuICAgICAgICAgICAgPGxhYmVsIHRpdGxlPVwiU2VhcmNoIHRoZW1lcy9wbHVnaW5zXCIgY2xhc3M9XCJzZWFyY2gtYmFyLWs3TVhkIHNlYXJjaC1iYXItY29udGFpbmVyLXA0dFN0XCI+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgc2l6ZT1cIjFcIiBhdXRvY29ycmVjdD1cIm9mZlwiIGF1dG9jYXBpdGFsaXplPVwib2ZmXCIgYXV0b2NvbXBsZXRlPVwib2ZmXCIgc3BlbGxjaGVjaz1cImZhbHNlXCIgdGFiaW5kZXg9XCIwXCIgY2xhc3M9XCJzZWFyY2gtaW5wdXQtYkFnQWggdGV4dC1pbnB1dC1obkxpelwiIHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJTZWFyY2ggdGhlbWVzL3BsdWdpbnNcIiB2YWx1ZT1cIlwiPlxyXG4gICAgICAgICAgICAgICAgPHN2ZyBjbGFzcz1cImljb24tUU9ZZkpcIiB2aWV3Qm94PVwiMCAwIDUxMiA1MTJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTQ1Ni44ODIgNDE1Ljc5OTk5OTk5OTk5OTdsLTkzLjc5MS04OS40NWMyMi42MDUtMjguNjcgMzQuNzg0LTYzLjU3IDM0LjY4Ni05OS40NCAwLTkxLjU0LTc4LjE0Mi0xNjYuMDctMTc0LjEyNS0xNjYuMDdzLTE3NC4xMjUgNzQuNTMtMTc0LjEyNSAxNjYuMTdjMCA5MS41NCA3OC4xNDIgMTY2LjA3IDE3NC4xMjUgMTY2LjA3IDM3LjU4NiAwIDc0LjE2MS0xMS42MSAxMDQuMjU2LTMzLjA4bDkzLjc5IDg5LjQ1YzMuNTM1IDMuMDQgNy45MSA1LjA1IDEyLjYwNCA1Ljc5IDQuNjk2IDAuNzQgOS41MTUgMC4xOCAxMy44ODctMS42MSA0LjM3NC0xLjc5IDguMTE3LTQuNzQgMTAuNzg4LTguNDkgMi42NzEtMy43NiA0LjE1Ny04LjE3IDQuMjg0LTEyLjcgMC4xMDgtNi4xMS0yLjE2NS0xMi4wNC02LjM3OS0xNi42NG0tMzU3LjYyLTE4OC43OWMtMC4wMS0yOS40MyAxMS40NTMtNTcuOCAzMi4xNjItNzkuNjEgMjAuNzA5LTIxLjgyIDQ5LjE4My0zNS40OSA3OS44ODQtMzguMzkgMzAuNy0yLjkgNjEuNDMzIDUuMiA4Ni4yMjEgMjIuNzIgMjQuNzg3IDE3LjUyIDQxLjg1OCA0My4yIDQ3Ljg5MSA3Mi4wNSA2LjAzNCAyOC44NiAwLjU5OCA1OC44My0xNS4yNDkgODQuMDdzLTQwLjk3MiA0My45Ni03MC40ODkgNTIuNTNjLTI5LjUxOCA4LjU1LTYxLjMxNyA2LjMzLTg5LjIxMy02LjI0cy00OS44OTUtMzQuNTctNjEuNzE4LTYxLjc1Yy02LjI1OC0xNC4zOC05LjQ4My0yOS44MS05LjQ4OC00NS4zOFwiIHN0eWxlPVwiZmlsbDogY3VycmVudGNvbG9yO1wiPjwvcGF0aD5cclxuICAgICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxici8+XHJcbiAgICAgICAgPGRpdiB0YWJpbmRleD1cIjBcIiB0aXRsZT1cIlN1Ym1pdCB5b3VyIHRoZW1lcyBhbmQgcGx1Z2lucyBoZXJlXCIgdGFyZ2V0PVwiX2JsYW5rXCIgY2xhc3M9XCJsaW5rLUZyTDF0IGJ1dHRvbi1jb250YWluZXItelZMSDZcIj5cclxuICAgICAgICAgICAgPGEgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9SRVZFTkdFOTc3L3N0cmVtaW8tZW5oYW5jZWQtcmVnaXN0cnlcIiB0YXJnZXQ9XCJfYmxhbmtcIiByZWw9XCJub3JlZmVycmVyXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGFiZWwtUEp2U0pcIiBzdHlsZT1cInRleHQtYWxpZ246IGNlbnRlcjtcIj5TdWJtaXQgeW91ciB0aGVtZXMgYW5kIHBsdWdpbnM8L2Rpdj5cclxuICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiYWRkb25zLWxpc3QtY29udGFpbmVyLU92cjJaXCIgaWQ9XCJtb2RzLWxpc3RcIj5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGJyLz5cclxuICAgIDwvZGl2PlxyXG48L2Rpdj4iLCAiPGJyPlxyXG48ZGl2IHRhYmluZGV4PVwiMFwiIGNsYXNzPVwiYWRkb24td2htZE8gYW5pbWF0aW9uLWZhZGUtaW4gYWRkb24tY29udGFpbmVyLWxDNUtOIGJ1dHRvbi1jb250YWluZXItelZMSDZcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJsb2dvLWNvbnRhaW5lci1aY1NTQ1wiPlxyXG4gICAgICAgIDwhLS0gdGhlbWUgcHJldmlldyBoZXJlIC0tPlxyXG5cclxuICAgICAgICA8IS0tIHBsdWdpbiBpY29uIGhlcmUgLS0+XHJcbiAgICA8L2Rpdj5cclxuXHJcblx0PGRpdiBjbGFzcz1cImluZm8tY29udGFpbmVyLUFkTUI2XCI+XHJcblx0XHQ8ZGl2IGNsYXNzPVwibmFtZS1jb250YWluZXItcUlBZzhcIiB0aXRsZT1cInt7IG5hbWUgfX1cIj57eyBuYW1lIH19PC9kaXY+XHJcblx0XHQ8ZGl2IGNsYXNzPVwidmVyc2lvbi1jb250YWluZXItemRQeU5cIiB0aXRsZT1cInt7IHZlcnNpb24gfX1cIj57eyB2ZXJzaW9uIH19PC9kaXY+XHJcblx0XHQ8ZGl2IGNsYXNzPVwidHlwZXMtY29udGFpbmVyLURhT3JnXCI+e3sgdHlwZSB9fTwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJkZXNjcmlwdGlvbi1jb250YWluZXItdjdKaGVcIj5cclxuICAgICAgICAgICAgPGI+RGVzY3JpcHRpb246PC9iPiB7eyBkZXNjcmlwdGlvbiB9fVxyXG4gICAgICAgICAgICA8YnI+XHJcbiAgICAgICAgICAgIDxiPkF1dGhvcjo8L2I+IHt7IGF1dGhvciB9fVxyXG4gICAgICAgIDwvZGl2PlxyXG5cdDwvZGl2PlxyXG5cdDxkaXYgY2xhc3M9XCJidXR0b25zLWNvbnRhaW5lci1nMHhYclwiPlxyXG5cdFx0PGRpdiBjbGFzcz1cImFjdGlvbi1idXR0b25zLWNvbnRhaW5lci14TVZtelwiPlxyXG5cdFx0XHQ8ZGl2IHRhYmluZGV4PVwiLTFcIiB0aXRsZT1cInt7IGFjdGlvbmJ0blRpdGxlIH19XCIgY2xhc3M9XCJ7eyBhY3Rpb25idG5DbGFzcyB9fSBidXR0b24tY29udGFpbmVyLXpWTEg2IG1vZEFjdGlvbkJ0blwiIGRhdGEtbGluaz1cInt7IGRvd25sb2FkIH19XCIgZGF0YS10eXBlPVwie3sgdHlwZSB9fVwiPlxyXG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJsYWJlbC1PbldoMlwiPnt7IGFjdGlvbmJ0blRpdGxlIH19PC9kaXY+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0PC9kaXY+XHJcblx0XHQ8YSBocmVmPVwie3sgcmVwbyB9fVwiIHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vcmVmZXJyZXJcIiBjbGFzcz1cInNoYXJlLWJ1dHRvbi1jb250YWluZXItczNnd1AgYnV0dG9uLWNvbnRhaW5lci16VkxINlwiPlxyXG5cdFx0XHQ8c3ZnIGNsYXNzPVwiaWNvbi1HeFZiWVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj5cclxuXHRcdFx0XHQ8cGF0aCBkPVwiTTEyLDJBMTAsMTAgMCAwLDAgMiwxMkMyLDE2LjQyIDQuODcsMjAuMTcgOC44NCwyMS41QzkuMzQsMjEuNTggOS41LDIxLjI3IDkuNSwyMUM5LjUsMjAuNzcgOS41LDIwLjE0IDkuNSwxOS4zMUM2LjczLDE5LjkxIDYuMTQsMTcuOTcgNi4xNCwxNy45N0M1LjY4LDE2LjgxIDUuMDMsMTYuNSA1LjAzLDE2LjVDNC4xMiwxNS44OCA1LjEsMTUuOSA1LjEsMTUuOUM2LjEsMTUuOTcgNi42MywxNi45MyA2LjYzLDE2LjkzQzcuNSwxOC40NSA4Ljk3LDE4IDkuNTQsMTcuNzZDOS42MywxNy4xMSA5Ljg5LDE2LjY3IDEwLjE3LDE2LjQyQzcuOTUsMTYuMTcgNS42MiwxNS4zMSA1LjYyLDExLjVDNS42MiwxMC4zOSA2LDkuNSA2LjY1LDguNzlDNi41NSw4LjU0IDYuMiw3LjUgNi43NSw2LjE1QzYuNzUsNi4xNSA3LjU5LDUuODggOS41LDcuMTdDMTAuMjksNi45NSAxMS4xNSw2Ljg0IDEyLDYuODRDMTIuODUsNi44NCAxMy43MSw2Ljk1IDE0LjUsNy4xN0MxNi40MSw1Ljg4IDE3LjI1LDYuMTUgMTcuMjUsNi4xNUMxNy44LDcuNSAxNy40NSw4LjU0IDE3LjM1LDguNzlDMTgsOS41IDE4LjM4LDEwLjM5IDE4LjM4LDExLjVDMTguMzgsMTUuMzIgMTYuMDQsMTYuMTYgMTMuODEsMTYuNDFDMTQuMTcsMTYuNzIgMTQuNSwxNy4zMyAxNC41LDE4LjI2QzE0LjUsMTkuNiAxNC41LDIwLjY4IDE0LjUsMjFDMTQuNSwyMS4yNyAxNC42NiwyMS41OSAxNS4xNywyMS41QzE5LjE0LDIwLjE2IDIyLDE2LjQyIDIyLDEyQTEwLDEwIDAgMCwwIDEyLDJaXCIgc3R5bGU9XCJmaWxsOiBjdXJyZW50Y29sb3I7XCIgLz5cclxuXHRcdFx0PC9zdmc+XHJcblx0XHRcdDxkaXYgY2xhc3M9XCJsYWJlbC1PbldoMlwiPk9wZW4gcmVwb3NpdG9yeTwvZGl2PlxyXG5cdFx0PC9hPlxyXG5cdDwvZGl2PlxyXG48L2Rpdj5cclxuIiwgIjxoNCBzdHlsZT1cImNvbG9yOiB3aGl0ZTsgbWFyZ2luLWJvdHRvbTogMXJlbTtcIj5cclxuICAgIERldmVsb3BlZCBCeTogPHAgc3R5bGU9XCJkaXNwbGF5OiBpbmxpbmUgIWltcG9ydGFudDtcIj48YSBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL1JFVkVOR0U5NzdcIiB0YXJnZXQ9XCJfYmxhbmtcIiByZWw9XCJub3JlZmVycmVyXCI+UkVWRU5HRTk3NzwvYT48L3A+XHJcbiAgICA8YnIvPlxyXG4gICAgVmVyc2lvbjogdnt7IHZlcnNpb24gfX1cclxuICAgIDxici8+XHJcbjwvaDQ+XHJcblxyXG48ZGl2IGNsYXNzPVwib3B0aW9uLXZGT0FTXCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwiaGVhZGluZy1kWU1EdFwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJsYWJlbC1xSTZWaFwiPkNoZWNrIGZvciB1cGRhdGVzIG9uIHN0YXJ0dXA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cImNvbnRlbnQtUDJUMGlcIj5cclxuICAgICAgICA8ZGl2IHRhYmluZGV4PVwiLTFcIiBjbGFzcz1cInRvZ2dsZS1jb250YWluZXItbFpmSFAgYnV0dG9uLWNvbnRhaW5lci16VkxINiB7eyBjaGVja0ZvclVwZGF0ZXNPblN0YXJ0dXAgfX1cIiBpZD1cImNoZWNrRm9yVXBkYXRlc09uU3RhcnR1cFwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9nZ2xlLXRvT1dNXCI+PC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuPC9kaXY+XHJcblxyXG48ZGl2IGNsYXNzPVwib3B0aW9uLXZGT0FTXCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwiaGVhZGluZy1kWU1EdFwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJsYWJlbC1xSTZWaFwiPkRpc2NvcmQgUmljaCBQcmVzZW5jZTwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwiY29udGVudC1QMlQwaVwiPlxyXG4gICAgICAgIDxkaXYgdGFiaW5kZXg9XCItMVwiIGNsYXNzPVwidG9nZ2xlLWNvbnRhaW5lci1sWmZIUCBidXR0b24tY29udGFpbmVyLXpWTEg2IHt7IGRpc2NvcmRyaWNocHJlc2VuY2UgfX1cIiBpZD1cImRpc2NvcmRyaWNocHJlc2VuY2VcIiBzdHlsZT1cIm91dGxpbmU6IG5vbmU7XCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0b2dnbGUtdG9PV01cIj48L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG48L2Rpdj5cclxuXHJcbjxkaXYgY2xhc3M9XCJvcHRpb24tdkZPQVNcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJoZWFkaW5nLWRZTUR0XCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImxhYmVsLXFJNlZoXCI+V2luZG93IHRyYW5zcGFyZW5jeTwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwiY29udGVudC1QMlQwaVwiPlxyXG4gICAgICAgIDxkaXYgdGFiaW5kZXg9XCItMVwiIGNsYXNzPVwidG9nZ2xlLWNvbnRhaW5lci1sWmZIUCBidXR0b24tY29udGFpbmVyLXpWTEg2IHt7IGVuYWJsZVRyYW5zcGFyZW50VGhlbWVzIH19XCIgaWQ9XCJlbmFibGVUcmFuc3BhcmVudFRoZW1lc1wiIHN0eWxlPVwib3V0bGluZTogbm9uZTtcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRvZ2dsZS10b09XTVwiPjwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbjwvZGl2PlxyXG5cclxuPHAgc3R5bGU9XCJjb2xvcjpncmF5O1wiPlRoaXMgb3B0aW9uIGhhcyB0byBiZSBlbmFibGVkIGZvciB0aGVtZXMgdGhhdCBzdXBwb3J0IHRyYW5zcGFyZW5jeSB0byB3b3JrLiAoZXhwZXJpbWVudGFsKTwvcD5cclxuPGJyLz5cclxuXHJcbjxkaXYgY2xhc3M9XCJvcHRpb24tdkZPQVNcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJjb250ZW50LVAyVDBpXCI+XHJcbiAgICAgICAgPGRpdiB0YWJpbmRleD1cIjBcIiB0aXRsZT1cIkNvbW11bml0eSBQbHVnaW5zICZhbXA7IFRoZW1lc1wiIGNsYXNzPVwiYnV0dG9uLURObVlMIGJ1dHRvbi1jb250YWluZXItelZMSDYgYnV0dG9uXCIgaWQ9XCJicm93c2VQbHVnaW5zVGhlbWVzQnRuXCI+XHJcbiAgICAgICAgICAgIENvbW11bml0eSBNYXJrZXRwbGFjZVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbjwvZGl2PlxyXG5cclxuPGRpdiBjbGFzcz1cIm9wdGlvbi12Rk9BU1wiPlxyXG4gICAgPGRpdiBjbGFzcz1cImNvbnRlbnQtUDJUMGlcIj5cclxuICAgICAgICA8ZGl2IHRhYmluZGV4PVwiMFwiIHRpdGxlPVwiQ2hlY2sgRm9yIFVwZGF0ZXNcIiBjbGFzcz1cImJ1dHRvbi1ETm1ZTCBidXR0b24tY29udGFpbmVyLXpWTEg2IGJ1dHRvblwiIGlkPVwiY2hlY2tmb3J1cGRhdGVzQnRuXCI+XHJcbiAgICAgICAgICAgIENoZWNrIEZvciBVcGRhdGVzXHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuPC9kaXY+XHJcblxyXG48YnIvPiIsICI8ZGl2IGNsYXNzPVwib3B0aW9uLXZGT0FTXCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwiaGVhZGluZy1kWU1EdFwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJsYWJlbC1xSTZWaFwiPkRlZmF1bHQ8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cImNvbnRlbnQtUDJUMGlcIj5cclxuICAgICAgICA8ZGl2IFxyXG4gICAgICAgIHRpdGxlPVwiRGVmYXVsdFwiIFxyXG4gICAgICAgIGlkPVwiRGVmYXVsdFwiIFxyXG4gICAgICAgIHRhYmluZGV4PVwiLTFcIlxyXG4gICAgICAgIG9uY2xpY2s9XCJhcHBseVRoZW1lKCdEZWZhdWx0JylcIlxyXG4gICAgICAgIHN0eWxlPVwiY29sb3I6IHdoaXRlOyBtYXJnaW4tYm90dG9tOiAxcmVtOyB3aWR0aDogbWF4LWNvbnRlbnQ7IGJhY2tncm91bmQtY29sb3I6IHt7IGJhY2tncm91bmRDb2xvciB9fTtcIlxyXG4gICAgICAgIGNsYXNzPVwiYnV0dG9uIGJ1dHRvbi1jb250YWluZXItelZMSDYge3sgZGlzYWJsZWQgfX1cIlxyXG4gICAgICAgID57eyBsYWJlbCB9fTwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbjwvZGl2PlxyXG4iLCAiPGRpdiB0YWJpbmRleD1cIi0xXCIgY2xhc3M9XCJidXR0b24tY29udGFpbmVyLXhUOV9MIGJhY2stYnV0dG9uLWNvbnRhaW5lci1sREIxTiBidXR0b24tY29udGFpbmVyLXpWTEg2XCIgaWQ9XCJiYWNrLWJ0blwiPlxyXG4gICAgPHN2ZyBjbGFzcz1cImljb24tVDhNVTZcIiB2aWV3Qm94PVwiMCAwIDUxMiA1MTJcIj5cclxuICAgICAgICA8cGF0aCBkPVwiTTMyOC42MTAwMDAwMDAwMDA2IDEwNi40NjlsLTE0My41MyAxMzYuODg5IDE0My41MyAxMzYuODg5XCIgc3R5bGU9XCJzdHJva2U6IGN1cnJlbnRjb2xvcjsgc3Ryb2tlLWxpbmVjYXA6IHJvdW5kOyBzdHJva2UtbGluZWpvaW46IHJvdW5kOyBzdHJva2Utd2lkdGg6IDQ4OyBmaWxsOiBub25lO1wiPjwvcGF0aD5cclxuICAgIDwvc3ZnPlxyXG48L2Rpdj4iLCAiPG5hdiBjbGFzcz1cInRpdGxlLWJhclwiPlxyXG4gICAgPGRpdiBjbGFzcz1cInRpdGxlLWJhci1idXR0b25zXCI+XHJcbiAgICAgICAgPGRpdiBpZD1cIm1pbmltaXplQXBwLWJ0blwiIHRpdGxlPVwiTWluaW1pemVcIiBjbGFzcz1cImJ1dHRvblwiPlxyXG4gICAgICAgICAgICA8c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj5cclxuICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMjAsMTRINFYxMEgyMFwiIHN0eWxlPVwiZmlsbDp3aGl0ZTtcIj48L3BhdGg+XHJcbiAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgaWQ9XCJtYXhpbWl6ZUFwcC1idG5cIiB0aXRsZT1cIk1heGltaXplXCIgY2xhc3M9XCJidXR0b25cIj5cclxuICAgICAgICAgICAgPHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+XHJcbiAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTMsM0gyMVYyMUgzVjNNNSw1VjE5SDE5VjVINVpcIiBzdHlsZT1cImZpbGw6d2hpdGU7XCI+PC9wYXRoPlxyXG4gICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGlkPVwiY2xvc2VBcHAtYnRuXCIgdGl0bGU9XCJDbG9zZVwiIGNsYXNzPVwiYnV0dG9uXCI+XHJcbiAgICAgICAgICAgIDxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiIHN0eWxlPVwid2lkdGg6IDI1cHg7IGhlaWdodDogMjVweDtcIj5cclxuICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMTksNi40MUwxNy41OSw1TDEyLDEwLjU5TDYuNDEsNUw1LDYuNDFMMTAuNTksMTJMNSwxNy41OUw2LjQxLDE5TDEyLDEzLjQxTDE3LjU5LDE5TDE5LDE3LjU5TDEzLjQxLDEyTDE5LDYuNDFaXCIgc3R5bGU9XCJmaWxsOndoaXRlO1wiPjwvcGF0aD5cclxuICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgICA8c3R5bGU+XHJcblx0XHRib2R5ID4gKjpub3QoLnRpdGxlLWJhcikge1xyXG5cdFx0XHRwYWRkaW5nLXRvcDogNDBweDsgXHJcblx0XHR9XHJcblxyXG4gICAgICAgIC5idXR0b24ge1xyXG4gICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAudGl0bGUtYmFyIHtcclxuICAgICAgICAgICAgcG9zaXRpb246IGZpeGVkOyBcclxuICAgICAgICAgICAgdG9wOiAwO1xyXG4gICAgICAgICAgICBsZWZ0OiAwO1xyXG4gICAgICAgICAgICByaWdodDogMDtcclxuICAgICAgICAgICAgaGVpZ2h0OiA0MHB4O1xyXG4gICAgICAgICAgICB6LWluZGV4OiA5OTk5O1xyXG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiByZ2JhKDAsMCwwLDAuMTUpO1xyXG4gICAgICAgICAgICBiYWNrZHJvcC1maWx0ZXI6IGJsdXIoMjBweCkgc2F0dXJhdGUoMTIwJSk7XHJcblx0XHRcdC13ZWJraXQtYXBwLXJlZ2lvbjogZHJhZztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC50aXRsZS1iYXItYnV0dG9ucyB7XHJcbiAgICAgICAgICAgIC13ZWJraXQtYXBwLXJlZ2lvbjogbm8tZHJhZztcclxuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgICAgICAgZ2FwOiAyLjByZW07XHJcbiAgICAgICAgICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xyXG5cdFx0XHRtYXJnaW4tcmlnaHQ6IDIwcHg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAudGl0bGUtYmFyLWJ1dHRvbnMgc3ZnIHtcclxuICAgICAgICAgICAgd2lkdGg6IDIwcHg7XHJcbiAgICAgICAgICAgIGhlaWdodDogMjBweDtcclxuICAgICAgICB9XHJcbiAgICA8L3N0eWxlPlxyXG48L25hdj5cclxuIiwgImltcG9ydCBtb2RzVGFiIGZyb20gJy4uL2NvbXBvbmVudHMvbW9kcy10YWIvbW9kcy10YWIuaHRtbCc7XHJcbmltcG9ydCBtb2RzSXRlbSBmcm9tICcuLi9jb21wb25lbnRzL21vZHMtaXRlbS9tb2RzLWl0ZW0uaHRtbCc7XHJcbmltcG9ydCBhYm91dENhdGVnb3J5IGZyb20gJy4uL2NvbXBvbmVudHMvYWJvdXQtY2F0ZWdvcnkvYWJvdXQtY2F0ZWdvcnkuaHRtbCc7XHJcbmltcG9ydCBkZWZhdWx0VGhlbWUgZnJvbSAnLi4vY29tcG9uZW50cy9kZWZhdWx0LXRoZW1lL2RlZmF1bHQtdGhlbWUuaHRtbCc7XHJcbmltcG9ydCBiYWNrQnRuIGZyb20gJy4uL2NvbXBvbmVudHMvYmFjay1idG4vYmFjay1idG4uaHRtbCc7XHJcbmltcG9ydCB0aXRsZUJhciBmcm9tICcuLi9jb21wb25lbnRzL3RpdGxlLWJhci90aXRsZS1iYXIuaHRtbCc7XHJcblxyXG5jb25zdCB0ZW1wbGF0ZXM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XHJcbiAgICAnbW9kcy10YWInOiBtb2RzVGFiLFxyXG4gICAgJ21vZHMtaXRlbSc6IG1vZHNJdGVtLFxyXG4gICAgJ2Fib3V0LWNhdGVnb3J5JzogYWJvdXRDYXRlZ29yeSxcclxuICAgICdkZWZhdWx0LXRoZW1lJzogZGVmYXVsdFRoZW1lLFxyXG4gICAgJ2JhY2stYnRuJzogYmFja0J0bixcclxuICAgICd0aXRsZS1iYXInOiB0aXRsZUJhcixcclxufTtcclxuXHJcbmNsYXNzIFRlbXBsYXRlQ2FjaGUge1xyXG4gICAgcHVibGljIHN0YXRpYyBsb2FkKGRpcjogc3RyaW5nLCBuYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIC8vIFdlIGlnbm9yZSBkaXIgaW4gYnJvd3NlciBidWlsZFxyXG4gICAgICAgIHJldHVybiB0ZW1wbGF0ZXNbbmFtZV0gfHwgXCJcIjtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVGVtcGxhdGVDYWNoZTtcclxuIiwgImltcG9ydCBUZW1wbGF0ZUNhY2hlIGZyb20gXCIuLi8uLi91dGlscy90ZW1wbGF0ZUNhY2hlXCI7XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0VG9hc3RUZW1wbGF0ZShpZDogc3RyaW5nLCB0aXRsZTogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcsIHN0YXR1czogXCJzdWNjZXNzXCIgfCBcImZhaWxcIiB8IFwiaW5mb1wiKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuICAgIGNvbnN0IHRlbXBsYXRlID0gVGVtcGxhdGVDYWNoZS5sb2FkKF9fZGlybmFtZSwgJ3RvYXN0Jyk7XHJcbiAgICBsZXQgdG9hc3RTdGF0dXM7XHJcblxyXG4gICAgc3dpdGNoKHN0YXR1cykge1xyXG4gICAgICAgIGNhc2UgXCJzdWNjZXNzXCI6XHJcbiAgICAgICAgICAgIHRvYXN0U3RhdHVzID0gXCJzdWNjZXNzLWVJRFRhXCI7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJmYWlsXCI6XHJcbiAgICAgICAgICAgIHRvYXN0U3RhdHVzID0gXCJlcnJvci1xdXlPZFwiO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiaW5mb1wiOlxyXG4gICAgICAgICAgICB0b2FzdFN0YXR1cyA9IFwiaW5mby1LRVdxOFwiO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgIH1cclxuICAgIFxyXG4gICAgcmV0dXJuIHRlbXBsYXRlXHJcbiAgICAgICAgLnJlcGxhY2UoXCJ7eyBpZCB9fVwiLCBpZClcclxuICAgICAgICAucmVwbGFjZShcInt7IHRpdGxlIH19XCIsIHRpdGxlKVxyXG4gICAgICAgIC5yZXBsYWNlKFwie3sgbWVzc2FnZSB9fVwiLCBtZXNzYWdlKVxyXG4gICAgICAgIC5yZXBsYWNlKFwie3sgc3RhdHVzIH19XCIsIHRvYXN0U3RhdHVzKTtcclxufVxyXG4iLCAiaW1wb3J0IHR5cGUgeyBCcm93c2VyV2luZG93LCBNZXNzYWdlQm94T3B0aW9ucyB9IGZyb20gXCJlbGVjdHJvblwiO1xuaW1wb3J0IGxvZ2dlciBmcm9tIFwiLi9sb2dnZXJcIjtcbmltcG9ydCB7IFNFTEVDVE9SUywgVElNRU9VVFMgfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBnZXRUb2FzdFRlbXBsYXRlIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvdG9hc3QvdG9hc3RcIjtcblxyXG5jbGFzcyBIZWxwZXJzIHtcclxuICAgIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBIZWxwZXJzO1xyXG4gICAgcHJpdmF0ZSBtYWluV2luZG93OiBCcm93c2VyV2luZG93IHwgbnVsbCA9IG51bGw7XHJcbiAgICBcclxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKSB7fVxyXG4gICAgXHJcbiAgICBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogSGVscGVycyB7XHJcbiAgICAgICAgaWYgKCFIZWxwZXJzLmluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIEhlbHBlcnMuaW5zdGFuY2UgPSBuZXcgSGVscGVycygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gSGVscGVycy5pbnN0YW5jZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgc2V0TWFpbldpbmRvdyhtYWluV2luZG93OiBCcm93c2VyV2luZG93KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5tYWluV2luZG93ID0gbWFpbldpbmRvdztcclxuICAgIH1cclxuICAgIFxyXG4gICAgYXN5bmMgc2hvd0FsZXJ0KFxuICAgICAgICBhbGVydFR5cGU6ICdpbmZvJyB8ICd3YXJuaW5nJyB8ICdlcnJvcicsIFxuICAgICAgICB0aXRsZTogc3RyaW5nLCBcbiAgICAgICAgbWVzc2FnZTogc3RyaW5nLCBcbiAgICAgICAgYnV0dG9uczogc3RyaW5nW11cbiAgICApOiBQcm9taXNlPG51bWJlcj4ge1xuICAgICAgICBjb25zdCBvcHRpb25zOiBNZXNzYWdlQm94T3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHR5cGU6IGFsZXJ0VHlwZSxcbiAgICAgICAgICAgIHRpdGxlLFxuICAgICAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgICAgIGJ1dHRvbnNcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoXG4gICAgICAgICAgICB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmXG4gICAgICAgICAgICB0eXBlb2YgKHdpbmRvdyBhcyB0eXBlb2Ygd2luZG93ICYgeyBDYXBhY2l0b3I/OiB1bmtub3duIH0pLkNhcGFjaXRvciAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgICAgICAgICAgdHlwZW9mIHdpbmRvdy5hbGVydCA9PT0gXCJmdW5jdGlvblwiXG4gICAgICAgICkge1xuICAgICAgICAgICAgd2luZG93LmFsZXJ0KFt0aXRsZSwgbWVzc2FnZV0uZmlsdGVyKEJvb2xlYW4pLmpvaW4oXCJcXG5cXG5cIikpO1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCB7IGRpYWxvZyB9ID0gYXdhaXQgaW1wb3J0KFwiZWxlY3Ryb25cIik7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGRpYWxvZy5zaG93TWVzc2FnZUJveCh0aGlzLm1haW5XaW5kb3chLCBvcHRpb25zKTtcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5yZXNwb25zZTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGxvZ2dlci5lcnJvcignRXJyb3IgZGlzcGxheWluZyBhbGVydDogJyArIChlcnJvciBhcyBFcnJvcikubWVzc2FnZSk7XG4gICAgICAgICAgICByZXR1cm4gLTE7IFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgd2FpdEZvckVsbShzZWxlY3Rvcjogc3RyaW5nLCB0aW1lb3V0OiBudW1iZXIgPSBUSU1FT1VUUy5FTEVNRU5UX1dBSVQpOiBQcm9taXNlPEVsZW1lbnQ+IHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBleGlzdGluZ0VsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcclxuICAgICAgICAgICAgaWYgKGV4aXN0aW5nRWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoZXhpc3RpbmdFbGVtZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XHJcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIG9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQuYm9keSwge1xyXG4gICAgICAgICAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgc3VidHJlZTogdHJ1ZVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihgVGltZW91dCB3YWl0aW5nIGZvciBlbGVtZW50IHdpdGggc2VsZWN0b3I6ICR7c2VsZWN0b3J9YCkpO1xyXG4gICAgICAgICAgICB9LCB0aW1lb3V0KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB3YWl0Rm9yRWxtQnlYUGF0aCh4cGF0aDogc3RyaW5nLCB0aW1lb3V0OiBudW1iZXIgPSBUSU1FT1VUUy5FTEVNRU5UX1dBSVQpOiBQcm9taXNlPE5vZGU+IHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBldmFsdWF0ZVhQYXRoID0gKCk6IE5vZGUgfCBudWxsID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGRvY3VtZW50LmV2YWx1YXRlKFxyXG4gICAgICAgICAgICAgICAgICAgIHhwYXRoLCBcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudCwgXHJcbiAgICAgICAgICAgICAgICAgICAgbnVsbCwgXHJcbiAgICAgICAgICAgICAgICAgICAgWFBhdGhSZXN1bHQuRklSU1RfT1JERVJFRF9OT0RFX1RZUEUsIFxyXG4gICAgICAgICAgICAgICAgICAgIG51bGxcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LnNpbmdsZU5vZGVWYWx1ZTtcclxuICAgICAgICAgICAgfTtcclxuICAgIFxyXG4gICAgICAgICAgICBjb25zdCBleGlzdGluZ0VsZW1lbnQgPSBldmFsdWF0ZVhQYXRoKCk7XHJcbiAgICAgICAgICAgIGlmIChleGlzdGluZ0VsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKGV4aXN0aW5nRWxlbWVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGV2YWx1YXRlWFBhdGgoKTtcclxuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgXHJcbiAgICAgICAgICAgIG9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQuYm9keSwge1xyXG4gICAgICAgICAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgc3VidHJlZTogdHJ1ZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgIFxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIG9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcclxuICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoYFRpbWVvdXQgd2FpdGluZyBmb3IgZWxlbWVudCB3aXRoIFhQYXRoOiAke3hwYXRofWApKTtcclxuICAgICAgICAgICAgfSwgdGltZW91dCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9ICAgIFxyXG5cclxuICAgIHdhaXRGb3JUaXRsZUNoYW5nZSh0aW1lb3V0OiBudW1iZXIgPSBUSU1FT1VUUy5FTEVNRU5UX1dBSVQpOiBQcm9taXNlPHN0cmluZz4ge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGhlYWRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZCcpO1xyXG4gICAgICAgICAgICBpZiAoIWhlYWRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KG5ldyBFcnJvcignSGVhZCBlbGVtZW50IG5vdCBmb3VuZCcpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5kaXNjb25uZWN0KCk7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKGRvY3VtZW50LnRpdGxlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBvYnNlcnZlci5vYnNlcnZlKGhlYWRFbGVtZW50LCB7XHJcbiAgICAgICAgICAgICAgICBzdWJ0cmVlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcignVGltZW91dCB3YWl0aW5nIGZvciBkb2N1bWVudC50aXRsZSB0byBjaGFuZ2UnKSk7XHJcbiAgICAgICAgICAgIH0sIHRpbWVvdXQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBjcmVhdGVUb2FzdCh0b2FzdElkOiBzdHJpbmcsIHRpdGxlOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZywgc3RhdHVzOiBcInN1Y2Nlc3NcIiB8IFwiZmFpbFwiIHwgXCJpbmZvXCIsIHRpbWVvdXRNczpudW1iZXIgPSAzMDAwKSB7XHJcbiAgICAgICAgY29uc3QgdGVtcGxhdGUgPSBhd2FpdCBnZXRUb2FzdFRlbXBsYXRlKHRvYXN0SWQsIHRpdGxlLCBtZXNzYWdlLCBzdGF0dXMpO1xyXG4gICAgICAgIGNvbnN0IHRvYXN0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihTRUxFQ1RPUlMuVE9BU1RfQ09OVEFJTkVSKTtcclxuICAgICAgICBpZih0b2FzdENvbnRhaW5lcikge1xyXG4gICAgICAgICAgICB0b2FzdENvbnRhaW5lci5pbm5lckhUTUwgKz0gdGVtcGxhdGU7XHJcblxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRvYXN0SWQpPy5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfSwgdGltZW91dE1zKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFeGVjdXRlIEphdmFTY3JpcHQgaW4gdGhlIGNvbnRleHQgb2YgU3RyZW1pbydzIGNvcmUgc2VydmljZXNcclxuICAgICAqIEBwYXJhbSBqcyAtIEphdmFTY3JpcHQgY29kZSB0byBleGVjdXRlXHJcbiAgICAgKiBAcmV0dXJucyBQcm9taXNlIHdpdGggdGhlIHJlc3VsdCBvZiB0aGUgZXhlY3V0aW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBfZXZhbChqczogc3RyaW5nKTogUHJvbWlzZTx1bmtub3duPiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGV2ZW50TmFtZSA9ICdzdHJlbWlvLWVuaGFuY2VkJztcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBjb25zdCBoYW5kbGVyID0gKGRhdGE6IEV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NyaXB0LnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKGRhdGEgYXMgQ3VzdG9tRXZlbnQpLmRldGFpbCk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgaGFuZGxlciwgeyBvbmNlOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBzY3JpcHQuaWQgPSBldmVudE5hbWU7XHJcbiAgICAgICAgICAgICAgICBzY3JpcHQuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY29yZSA9IHdpbmRvdy5zZXJ2aWNlcy5jb3JlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gJHtqc307XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIFByb21pc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC50aGVuKChhd2FpdGVkUmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KFwiJHtldmVudE5hbWV9XCIsIHsgZGV0YWlsOiBhd2FpdGVkUmVzdWx0IH0pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KFwiJHtldmVudE5hbWV9XCIsIHsgZGV0YWlsOiByZXN1bHQgfSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYCksXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEVsZW1lbnRCeVhwYXRoKHBhdGg6IHN0cmluZyk6IE5vZGUgfCBudWxsIHtcclxuICAgICAgICByZXR1cm4gZG9jdW1lbnQuZXZhbHVhdGUoXHJcbiAgICAgICAgICAgIHBhdGgsIFxyXG4gICAgICAgICAgICBkb2N1bWVudCwgXHJcbiAgICAgICAgICAgIG51bGwsIFxyXG4gICAgICAgICAgICBYUGF0aFJlc3VsdC5GSVJTVF9PUkRFUkVEX05PREVfVFlQRSwgXHJcbiAgICAgICAgICAgIG51bGxcclxuICAgICAgICApLnNpbmdsZU5vZGVWYWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0RmlsZU5hbWVGcm9tVXJsKHVybDogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICBjb25zdCBwYXJ0cyA9IHVybC5zcGxpdCgnLycpO1xyXG4gICAgICAgIHJldHVybiBwYXJ0c1twYXJ0cy5sZW5ndGggLSAxXSB8fCAnJztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZm9ybWF0VGltZShzZWNvbmRzOiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgICAgIGNvbnN0IGhvdXJzID0gTWF0aC5mbG9vcihzZWNvbmRzIC8gMzYwMCk7XHJcbiAgICAgICAgY29uc3QgbWludXRlcyA9IE1hdGguZmxvb3IoKHNlY29uZHMgJSAzNjAwKSAvIDYwKTtcclxuICAgICAgICBjb25zdCByZW1haW5pbmdTZWNvbmRzID0gTWF0aC5mbG9vcihzZWNvbmRzICUgNjApO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBgJHtTdHJpbmcoaG91cnMpLnBhZFN0YXJ0KDIsICcwJyl9OiR7U3RyaW5nKG1pbnV0ZXMpLnBhZFN0YXJ0KDIsICcwJyl9OiR7U3RyaW5nKHJlbWFpbmluZ1NlY29uZHMpLnBhZFN0YXJ0KDIsICcwJyl9YDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbXBhcmUgdHdvIHNlbWFudGljIHZlcnNpb24gc3RyaW5nc1xyXG4gICAgICogQHJldHVybnMgdHJ1ZSBpZiB2ZXJzaW9uMSA+IHZlcnNpb24yXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBpc05ld2VyVmVyc2lvbih2ZXJzaW9uMTogc3RyaW5nLCB2ZXJzaW9uMjogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgY29uc3Qgbm9ybWFsaXplID0gKHY6IHN0cmluZyk6IG51bWJlcltdID0+IFxyXG4gICAgICAgICAgICB2LnJlcGxhY2UoL152LywgJycpLnNwbGl0KCcuJykubWFwKG4gPT4gcGFyc2VJbnQobiwgMTApIHx8IDApO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IHYxUGFydHMgPSBub3JtYWxpemUodmVyc2lvbjEpO1xyXG4gICAgICAgIGNvbnN0IHYyUGFydHMgPSBub3JtYWxpemUodmVyc2lvbjIpO1xyXG4gICAgICAgIGNvbnN0IG1heExlbmd0aCA9IE1hdGgubWF4KHYxUGFydHMubGVuZ3RoLCB2MlBhcnRzLmxlbmd0aCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXhMZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCB2MSA9IHYxUGFydHNbaV0gPz8gMDtcclxuICAgICAgICAgICAgY29uc3QgdjIgPSB2MlBhcnRzW2ldID8/IDA7XHJcbiAgICAgICAgICAgIGlmICh2MSA+IHYyKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKHYxIDwgdjIpIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBoZWxwZXJzSW5zdGFuY2UgPSBIZWxwZXJzLmdldEluc3RhbmNlKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBoZWxwZXJzSW5zdGFuY2U7XHJcbiIsICJpbXBvcnQgVGVtcGxhdGVDYWNoZSBmcm9tICcuLi8uLi91dGlscy90ZW1wbGF0ZUNhY2hlJztcclxuaW1wb3J0IHsgTWV0YURhdGEgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL01ldGFEYXRhJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRQbHVnaW5JdGVtVGVtcGxhdGUoXHJcbiAgICBmaWxlbmFtZTogc3RyaW5nLCBcclxuICAgIG1ldGFEYXRhOiBNZXRhRGF0YSxcclxuICAgIGNoZWNrZWQ6IGJvb2xlYW5cclxuKTogc3RyaW5nIHtcclxuICAgIGxldCB0ZW1wbGF0ZSA9IFRlbXBsYXRlQ2FjaGUubG9hZChfX2Rpcm5hbWUsICdwbHVnaW4taXRlbScpO1xyXG4gICAgXHJcbiAgICAvLyBSZXBsYWNlIG1ldGFkYXRhIHBsYWNlaG9sZGVyc1xyXG4gICAgY29uc3QgbWV0YUtleXMgPSBbJ25hbWUnLCAnZGVzY3JpcHRpb24nLCAnYXV0aG9yJywgJ3ZlcnNpb24nXSBhcyBjb25zdDtcclxuICAgIG1ldGFLZXlzLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgICBjb25zdCByZWdleCA9IG5ldyBSZWdFeHAoYHt7XFxcXHMqJHtrZXl9XFxcXHMqfX1gLCAnZycpO1xyXG4gICAgICAgIHRlbXBsYXRlID0gdGVtcGxhdGUucmVwbGFjZShyZWdleCwgbWV0YURhdGFba2V5XSB8fCAnJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gdGVtcGxhdGVcclxuICAgICAgICAucmVwbGFjZShcInt7IGNoZWNrZWQgfX1cIiwgY2hlY2tlZCA/IFwiY2hlY2tlZFwiIDogXCJcIilcclxuICAgICAgICAucmVwbGFjZSgvXFx7XFx7XFxzKmZpbGVOYW1lXFxzKlxcfVxcfS9nLCBmaWxlbmFtZSk7XHJcbn1cclxuIiwgImltcG9ydCBUZW1wbGF0ZUNhY2hlIGZyb20gJy4uLy4uL3V0aWxzL3RlbXBsYXRlQ2FjaGUnO1xyXG5pbXBvcnQgeyBNZXRhRGF0YSB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvTWV0YURhdGEnO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFRoZW1lSXRlbVRlbXBsYXRlKFxyXG4gICAgZmlsZW5hbWU6IHN0cmluZywgXHJcbiAgICBtZXRhRGF0YTogTWV0YURhdGEsXHJcbiAgICBhcHBsaWVkOiBib29sZWFuXHJcbik6IHN0cmluZyB7XHJcbiAgICBsZXQgdGVtcGxhdGUgPSBUZW1wbGF0ZUNhY2hlLmxvYWQoX19kaXJuYW1lLCAndGhlbWUtaXRlbScpO1xyXG4gICAgXHJcbiAgICAvLyBSZXBsYWNlIG1ldGFkYXRhIHBsYWNlaG9sZGVyc1xyXG4gICAgY29uc3QgbWV0YUtleXMgPSBbJ25hbWUnLCAnZGVzY3JpcHRpb24nLCAnYXV0aG9yJywgJ3ZlcnNpb24nXSBhcyBjb25zdDtcclxuICAgIG1ldGFLZXlzLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgICBjb25zdCByZWdleCA9IG5ldyBSZWdFeHAoYHt7XFxcXHMqJHtrZXl9XFxcXHMqfX1gLCAnZycpO1xyXG4gICAgICAgIHRlbXBsYXRlID0gdGVtcGxhdGUucmVwbGFjZShyZWdleCwgbWV0YURhdGFba2V5XSB8fCAnJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gdGVtcGxhdGVcclxuICAgICAgICAucmVwbGFjZShcInt7IGRpc2FibGVkIH19XCIsIGFwcGxpZWQgPyBcImRpc2FibGVkXCIgOiBcIlwiKVxyXG4gICAgICAgIC5yZXBsYWNlKC9cXHtcXHtcXHMqZmlsZU5hbWVcXHMqXFx9XFx9L2csIGZpbGVuYW1lKVxyXG4gICAgICAgIC5yZXBsYWNlKFwie3sgbGFiZWwgfX1cIiwgYXBwbGllZCA/IFwiQXBwbGllZFwiIDogXCJBcHBseVwiKVxyXG4gICAgICAgIC5yZXBsYWNlKFwie3sgYnV0dG9uQ2xhc3MgfX1cIiwgYXBwbGllZCA/IFwidW5pbnN0YWxsLWJ1dHRvbi1jb250YWluZXItb1Y0WW9cIiA6IFwiaW5zdGFsbC1idXR0b24tY29udGFpbmVyLXlmY3E1XCIpO1xyXG59XHJcbiIsICJpbXBvcnQgVGVtcGxhdGVDYWNoZSBmcm9tICcuLi8uLi91dGlscy90ZW1wbGF0ZUNhY2hlJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRFbmhhbmNlZE5hdigpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIFRlbXBsYXRlQ2FjaGUubG9hZChfX2Rpcm5hbWUsICdlbmhhbmNlZC1uYXYnKTtcclxufVxyXG4iLCAiaW1wb3J0IHsgUGxhdGZvcm1NYW5hZ2VyIH0gZnJvbSBcIi4uL3BsYXRmb3JtL1BsYXRmb3JtTWFuYWdlclwiO1xyXG5cclxuY2xhc3MgUHJvcGVydGllcyB7XHJcbiAgICBwdWJsaWMgc3RhdGljIHRoZW1lTGlua1NlbGVjdG9yOiBzdHJpbmcgPSBcImhlYWQgPiBsaW5rW3JlbD1zdHlsZXNoZWV0XVwiO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IGVuaGFuY2VkUGF0aCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC5nZXRFbmhhbmNlZFBhdGgoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCB0aGVtZXNQYXRoKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFBsYXRmb3JtTWFuYWdlci5jdXJyZW50LmdldFRoZW1lc1BhdGgoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBwbHVnaW5zUGF0aCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC5nZXRQbHVnaW5zUGF0aCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgaXNVc2luZ1N0cmVtaW9TZXJ2aWNlID0gZmFsc2U7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFByb3BlcnRpZXM7XHJcbiIsICJleHBvcnQgZnVuY3Rpb24gZ2V0QXBwbHlUaGVtZVRlbXBsYXRlKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gYFxyXG4gICAgZnVuY3Rpb24gYXBwbHlUaGVtZSh0aGVtZSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiYXBwbHlpbmcgXCIgKyB0aGVtZSk7XHJcblxyXG4gICAgICAgIC8vIENhbGwgdGhlIG5hdGl2ZS9wcmVsb2FkIGhhbmRsZXIgdG8gYWN0dWFsbHkgbG9hZCB0aGUgQ1NTXHJcbiAgICAgICAgaWYgKHdpbmRvdy5zdHJlbWlvRW5oYW5jZWQgJiYgd2luZG93LnN0cmVtaW9FbmhhbmNlZC5hcHBseVRoZW1lKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5zdHJlbWlvRW5oYW5jZWQuYXBwbHlUaGVtZSh0aGVtZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBVSSBVcGRhdGVzXHJcbiAgICAgICAgY29uc3QgY3VycmVudFRoZW1lID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJjdXJyZW50VGhlbWVcIik7XHJcbiAgICAgICAgaWYgKGN1cnJlbnRUaGVtZSkge1xyXG4gICAgICAgICAgICBjb25zdCBjdXJyZW50VGhlbWVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY3VycmVudFRoZW1lKTtcclxuICAgICAgICAgICAgaWYgKGN1cnJlbnRUaGVtZUVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRUaGVtZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImRpc2FibGVkXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50VGhlbWUgIT09IFwiRGVmYXVsdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFRoZW1lRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwidW5pbnN0YWxsLWJ1dHRvbi1jb250YWluZXItb1Y0WW9cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFRoZW1lRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiaW5zdGFsbC1idXR0b24tY29udGFpbmVyLXlmY3E1XCIpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50VGhlbWVFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwidmFyKC0tc2Vjb25kYXJ5LWFjY2VudC1jb2xvcilcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjdXJyZW50VGhlbWVFbGVtZW50LmlubmVyVGV4dCA9IFwiQXBwbHlcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJjdXJyZW50VGhlbWVcIiwgdGhlbWUpO1xyXG5cclxuICAgICAgICBjb25zdCBuZXdUaGVtZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGVtZSk7XHJcbiAgICAgICAgaWYgKG5ld1RoZW1lRWxlbWVudCkge1xyXG4gICAgICAgICAgICBuZXdUaGVtZUVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImRpc2FibGVkXCIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoZW1lICE9PSBcIkRlZmF1bHRcIikge1xyXG4gICAgICAgICAgICAgICAgbmV3VGhlbWVFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJpbnN0YWxsLWJ1dHRvbi1jb250YWluZXIteWZjcTVcIik7XHJcbiAgICAgICAgICAgICAgICBuZXdUaGVtZUVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInVuaW5zdGFsbC1idXR0b24tY29udGFpbmVyLW9WNFlvXCIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbmV3VGhlbWVFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwidmFyKC0tb3ZlcmxheS1jb2xvcilcIjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbmV3VGhlbWVFbGVtZW50LmlubmVyVGV4dCA9IFwiQXBwbGllZFwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGA7XHJcbn1cclxuIiwgImltcG9ydCBTZXR0aW5ncyBmcm9tIFwiLi9TZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBQbGF0Zm9ybU1hbmFnZXIgfSBmcm9tIFwiLi4vcGxhdGZvcm0vUGxhdGZvcm1NYW5hZ2VyXCI7XHJcbmltcG9ydCBwcm9wZXJ0aWVzIGZyb20gXCIuL1Byb3BlcnRpZXNcIjtcclxuaW1wb3J0IGhlbHBlcnMgZnJvbSBcIi4uL3V0aWxzL0hlbHBlcnNcIjtcclxuaW1wb3J0IHsgTWV0YURhdGEgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9NZXRhRGF0YVwiO1xyXG5pbXBvcnQgeyBnZXRMb2dnZXIgfSBmcm9tIFwiLi4vdXRpbHMvbG9nZ2VyXCI7XHJcbmltcG9ydCBQcm9wZXJ0aWVzIGZyb20gXCIuL1Byb3BlcnRpZXNcIjtcclxuaW1wb3J0IHsgZ2V0QXBwbHlUaGVtZVRlbXBsYXRlIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvYXBwbHktdGhlbWUvYXBwbHlUaGVtZVwiO1xyXG5pbXBvcnQgeyBiYXNlbmFtZSwgam9pbiB9IGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCB7IFNUT1JBR0VfS0VZUywgU0VMRUNUT1JTLCBDTEFTU0VTLCBVUkxTIH0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xyXG5pbXBvcnQgRXh0cmFjdE1ldGFEYXRhIGZyb20gXCIuLi91dGlscy9FeHRyYWN0TWV0YURhdGFcIjtcclxuXHJcbmNsYXNzIE1vZE1hbmFnZXIge1xuICAgIHByaXZhdGUgc3RhdGljIGxvZ2dlciA9IGdldExvZ2dlcihcIk1vZE1hbmFnZXJcIik7XG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgQVBQTFlfVEhFTUVfU0NSSVBUX0lEID0gXCJzdHJlbWlvLWVuaGFuY2VkLWFwcGx5LXRoZW1lLXNjcmlwdFwiO1xuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkIGFuZCBlbmFibGUgYSBwbHVnaW4gYnkgZmlsZW5hbWVcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBhc3luYyBsb2FkUGx1Z2luKHBsdWdpbk5hbWU6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwbHVnaW5OYW1lKSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKGBQbHVnaW4gJHtwbHVnaW5OYW1lfSBpcyBhbHJlYWR5IGxvYWRlZGApO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBwbHVnaW5QYXRoID0gam9pbihwcm9wZXJ0aWVzLnBsdWdpbnNQYXRoLCBwbHVnaW5OYW1lKTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoIWF3YWl0IFBsYXRmb3JtTWFuYWdlci5jdXJyZW50LmV4aXN0cyhwbHVnaW5QYXRoKSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcihgUGx1Z2luIGZpbGUgbm90IGZvdW5kOiAke3BsdWdpblBhdGh9YCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHBsdWdpbiA9IGF3YWl0IFBsYXRmb3JtTWFuYWdlci5jdXJyZW50LnJlYWRGaWxlKHBsdWdpblBhdGgpO1xyXG4gICAgICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XHJcbiAgICAgICAgc2NyaXB0LmlubmVySFRNTCA9IHBsdWdpbjtcclxuICAgICAgICBzY3JpcHQuaWQgPSBwbHVnaW5OYW1lO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcclxuICAgICAgICBcclxuICAgICAgICBjb25zdCBlbmFibGVkUGx1Z2luczogc3RyaW5nW10gPSBKU09OLnBhcnNlKFxyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShTVE9SQUdFX0tFWVMuRU5BQkxFRF9QTFVHSU5TKSB8fCBcIltdXCJcclxuICAgICAgICApO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICghZW5hYmxlZFBsdWdpbnMuaW5jbHVkZXMocGx1Z2luTmFtZSkpIHtcclxuICAgICAgICAgICAgZW5hYmxlZFBsdWdpbnMucHVzaChwbHVnaW5OYW1lKTtcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oU1RPUkFHRV9LRVlTLkVOQUJMRURfUExVR0lOUywgSlNPTi5zdHJpbmdpZnkoZW5hYmxlZFBsdWdpbnMpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5sb2dnZXIuaW5mbyhgUGx1Z2luICR7cGx1Z2luTmFtZX0gbG9hZGVkIWApO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFVubG9hZCBhbmQgZGlzYWJsZSBhIHBsdWdpbiBieSBmaWxlbmFtZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHVubG9hZFBsdWdpbihwbHVnaW5OYW1lOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBwbHVnaW5FbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocGx1Z2luTmFtZSk7XHJcbiAgICAgICAgaWYgKHBsdWdpbkVsZW1lbnQpIHtcclxuICAgICAgICAgICAgcGx1Z2luRWxlbWVudC5yZW1vdmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGVuYWJsZWRQbHVnaW5zOiBzdHJpbmdbXSA9IEpTT04ucGFyc2UoXHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5nZXRJdGVtKFNUT1JBR0VfS0VZUy5FTkFCTEVEX1BMVUdJTlMpIHx8IFwiW11cIlxyXG4gICAgICAgICk7XHJcbiAgICAgICAgZW5hYmxlZFBsdWdpbnMgPSBlbmFibGVkUGx1Z2lucy5maWx0ZXIoKHg6IHN0cmluZykgPT4geCAhPT0gcGx1Z2luTmFtZSk7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oU1RPUkFHRV9LRVlTLkVOQUJMRURfUExVR0lOUywgSlNPTi5zdHJpbmdpZnkoZW5hYmxlZFBsdWdpbnMpKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKGBQbHVnaW4gJHtwbHVnaW5OYW1lfSB1bmxvYWRlZCFgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZldGNoIG1vZHMgZnJvbSB0aGUgcmVnaXN0cnkgcmVwb3NpdG9yeVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGFzeW5jIGZldGNoTW9kcygpOiBQcm9taXNlPHsgcGx1Z2luczogdW5rbm93bltdOyB0aGVtZXM6IHVua25vd25bXSB9PiB7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChVUkxTLlJFR0lTVFJZKTtcclxuICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRG93bmxvYWQgYW5kIHNhdmUgYSBtb2QgKHBsdWdpbiBvciB0aGVtZSlcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBhc3luYyBkb3dubG9hZE1vZChtb2RMaW5rOiBzdHJpbmcsIHR5cGU6IFwicGx1Z2luXCIgfCBcInRoZW1lXCIpOiBQcm9taXNlPHN0cmluZz4ge1xyXG4gICAgICAgIHRoaXMubG9nZ2VyLmluZm8oYERvd25sb2FkaW5nICR7dHlwZX0gZnJvbTogJHttb2RMaW5rfWApO1xyXG5cclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKG1vZExpbmspO1xyXG4gICAgICAgIGlmICghcmVzcG9uc2Uub2spIHRocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIGRvd25sb2FkOiAke3Jlc3BvbnNlLnN0YXR1c30gJHtyZXNwb25zZS5zdGF0dXNUZXh0fWApO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IHNhdmVEaXIgPSB0eXBlID09PSBcInBsdWdpblwiID8gUHJvcGVydGllcy5wbHVnaW5zUGF0aCA6IFByb3BlcnRpZXMudGhlbWVzUGF0aDtcclxuICAgICAgICBpZiAoIWF3YWl0IFBsYXRmb3JtTWFuYWdlci5jdXJyZW50LmV4aXN0cyhzYXZlRGlyKSkge1xyXG4gICAgICAgICAgICBhd2FpdCBQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC5ta2RpcihzYXZlRGlyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3QgZmlsZW5hbWUgPSBiYXNlbmFtZShuZXcgVVJMKG1vZExpbmspLnBhdGhuYW1lKSB8fCBgJHt0eXBlfS0ke0RhdGUubm93KCl9YDtcclxuICAgICAgICBjb25zdCBmaWxlUGF0aCA9IGpvaW4oc2F2ZURpciwgZmlsZW5hbWUpO1xyXG5cclxuICAgICAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgcmVzcG9uc2UudGV4dCgpO1xyXG4gICAgICAgIGF3YWl0IFBsYXRmb3JtTWFuYWdlci5jdXJyZW50LndyaXRlRmlsZShmaWxlUGF0aCwgY29udGVudCk7XHJcblxyXG4gICAgICAgIHRoaXMubG9nZ2VyLmluZm8oYERvd25sb2FkZWQgJHt0eXBlfSBzYXZlZCB0bzogJHtmaWxlUGF0aH1gKTtcclxuICAgICAgICByZXR1cm4gZmlsZVBhdGg7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmUgYSBtb2QgZmlsZSBhbmQgY2xlYW4gdXAgYXNzb2NpYXRlZCBzdGF0ZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGFzeW5jIHJlbW92ZU1vZChmaWxlTmFtZTogc3RyaW5nLCB0eXBlOiBcInBsdWdpblwiIHwgXCJ0aGVtZVwiKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgdGhpcy5sb2dnZXIuaW5mbyhgUmVtb3ZpbmcgJHt0eXBlfSBmaWxlOiAke2ZpbGVOYW1lfWApO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBcInBsdWdpblwiOlxyXG4gICAgICAgICAgICAgICAgaWYgKGF3YWl0IHRoaXMuaXNQbHVnaW5JbnN0YWxsZWQoZmlsZU5hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgUGxhdGZvcm1NYW5hZ2VyLmN1cnJlbnQudW5saW5rKGpvaW4oUHJvcGVydGllcy5wbHVnaW5zUGF0aCwgZmlsZU5hbWUpKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZW5hYmxlZFBsdWdpbnM6IHN0cmluZ1tdID0gSlNPTi5wYXJzZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLmdldEl0ZW0oU1RPUkFHRV9LRVlTLkVOQUJMRURfUExVR0lOUykgfHwgXCJbXVwiXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZW5hYmxlZFBsdWdpbnMuaW5jbHVkZXMoZmlsZU5hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuYWJsZWRQbHVnaW5zID0gZW5hYmxlZFBsdWdpbnMuZmlsdGVyKCh4OiBzdHJpbmcpID0+IHggIT09IGZpbGVOYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oU1RPUkFHRV9LRVlTLkVOQUJMRURfUExVR0lOUywgSlNPTi5zdHJpbmdpZnkoZW5hYmxlZFBsdWdpbnMpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInRoZW1lXCI6XHJcbiAgICAgICAgICAgICAgICBpZiAoYXdhaXQgdGhpcy5pc1RoZW1lSW5zdGFsbGVkKGZpbGVOYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbShTVE9SQUdFX0tFWVMuQ1VSUkVOVF9USEVNRSkgPT09IGZpbGVOYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFNUT1JBR0VfS0VZUy5DVVJSRU5UX1RIRU1FLCBcIkRlZmF1bHRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWN0aXZlVGhlbWVcIik/LnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IFBsYXRmb3JtTWFuYWdlci5jdXJyZW50LnVubGluayhqb2luKFByb3BlcnRpZXMudGhlbWVzUGF0aCwgZmlsZU5hbWUpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGFzeW5jIGlzVGhlbWVJbnN0YWxsZWQoZmlsZU5hbWU6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgICAgIHJldHVybiAoYXdhaXQgdGhpcy5nZXRJbnN0YWxsZWRUaGVtZXMoKSkuaW5jbHVkZXMoZmlsZU5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgYXN5bmMgaXNQbHVnaW5JbnN0YWxsZWQoZmlsZU5hbWU6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgICAgIHJldHVybiAoYXdhaXQgdGhpcy5nZXRJbnN0YWxsZWRQbHVnaW5zKCkpLmluY2x1ZGVzKGZpbGVOYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBhc3luYyBnZXRJbnN0YWxsZWRUaGVtZXMoKTogUHJvbWlzZTxzdHJpbmdbXT4ge1xyXG4gICAgICAgIGNvbnN0IGRpclBhdGggPSBQcm9wZXJ0aWVzLnRoZW1lc1BhdGg7XHJcbiAgICAgICAgaWYgKCFhd2FpdCBQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC5leGlzdHMoZGlyUGF0aCkpIHJldHVybiBbXTtcclxuXHJcbiAgICAgICAgY29uc3QgZmlsZXMgPSBhd2FpdCBQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC5yZWFkZGlyKGRpclBhdGgpO1xyXG4gICAgICAgIGNvbnN0IGZpbGVTdGF0cyA9IGF3YWl0IFByb21pc2UuYWxsKGZpbGVzLm1hcChhc3luYyBmaWxlID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgc3RhdCA9IGF3YWl0IFBsYXRmb3JtTWFuYWdlci5jdXJyZW50LnN0YXQoam9pbihkaXJQYXRoLCBmaWxlKSk7XHJcbiAgICAgICAgICAgIHJldHVybiB7IGZpbGUsIGlzRmlsZTogc3RhdC5pc0ZpbGUgfTtcclxuICAgICAgICB9KSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGZpbGVTdGF0cy5maWx0ZXIoZiA9PiBmLmlzRmlsZSkubWFwKGYgPT4gZi5maWxlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBhc3luYyBnZXRJbnN0YWxsZWRQbHVnaW5zKCk6IFByb21pc2U8c3RyaW5nW10+IHtcclxuICAgICAgICBjb25zdCBkaXJQYXRoID0gUHJvcGVydGllcy5wbHVnaW5zUGF0aDtcclxuICAgICAgICBpZiAoIWF3YWl0IFBsYXRmb3JtTWFuYWdlci5jdXJyZW50LmV4aXN0cyhkaXJQYXRoKSkgcmV0dXJuIFtdO1xyXG5cclxuICAgICAgICBjb25zdCBmaWxlcyA9IGF3YWl0IFBsYXRmb3JtTWFuYWdlci5jdXJyZW50LnJlYWRkaXIoZGlyUGF0aCk7XHJcbiAgICAgICAgY29uc3QgZmlsZVN0YXRzID0gYXdhaXQgUHJvbWlzZS5hbGwoZmlsZXMubWFwKGFzeW5jIGZpbGUgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBzdGF0ID0gYXdhaXQgUGxhdGZvcm1NYW5hZ2VyLmN1cnJlbnQuc3RhdChqb2luKGRpclBhdGgsIGZpbGUpKTtcclxuICAgICAgICAgICAgcmV0dXJuIHsgZmlsZSwgaXNGaWxlOiBzdGF0LmlzRmlsZSB9O1xyXG4gICAgICAgIH0pKTtcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gZmlsZVN0YXRzLmZpbHRlcihmID0+IGYuaXNGaWxlKS5tYXAoZiA9PiBmLmZpbGUpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFNldCB1cCBldmVudCBsaXN0ZW5lcnMgZm9yIHBsdWdpbiB0b2dnbGUgY2hlY2tib3hlc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHRvZ2dsZVBsdWdpbkxpc3RlbmVyKCk6IHZvaWQge1xuICAgICAgICBoZWxwZXJzLndhaXRGb3JFbG0oU0VMRUNUT1JTLlBMVUdJTlNfQ0FURUdPUlkpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIuaW5mbyhcIkxpc3RlbmluZyB0byBwbHVnaW4gY2hlY2tib3hlcy4uLlwiKTtcbiAgICAgICAgICAgIGNvbnN0IHBsdWdpbkNoZWNrYm94ZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwicGx1Z2luXCIpIGFzIEhUTUxDb2xsZWN0aW9uT2Y8SFRNTEVsZW1lbnQ+O1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsdWdpbkNoZWNrYm94ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAocGx1Z2luQ2hlY2tib3hlc1tpXS5kYXRhc2V0LnN0cmVtaW9FbmhhbmNlZFRvZ2dsZUJvdW5kID09PSBcInRydWVcIikge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBwbHVnaW5DaGVja2JveGVzW2ldLmRhdGFzZXQuc3RyZW1pb0VuaGFuY2VkVG9nZ2xlQm91bmQgPSBcInRydWVcIjtcbiAgICAgICAgICAgICAgICBwbHVnaW5DaGVja2JveGVzW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHBsdWdpbkNoZWNrYm94ZXNbaV0uY2xhc3NMaXN0LnRvZ2dsZShDTEFTU0VTLkNIRUNLRUQpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwbHVnaW5OYW1lID0gcGx1Z2luQ2hlY2tib3hlc1tpXS5nZXRBdHRyaWJ1dGUoJ25hbWUnKTtcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghcGx1Z2luTmFtZSkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAocGx1Z2luQ2hlY2tib3hlc1tpXS5jbGFzc0xpc3QuY29udGFpbnMoQ0xBU1NFUy5DSEVDS0VEKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmxvYWRQbHVnaW4ocGx1Z2luTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51bmxvYWRQbHVnaW4ocGx1Z2luTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd1JlbG9hZFdhcm5pbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLmNhdGNoKGVyciA9PiB0aGlzLmxvZ2dlci5lcnJvcihgRmFpbGVkIHRvIHNldHVwIHBsdWdpbiBsaXN0ZW5lcnM6ICR7ZXJyfWApKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBzaG93UmVsb2FkV2FybmluZygpOiB2b2lkIHtcclxuICAgICAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbHVnaW4tcmVsb2FkLXdhcm5pbmdcIikpIHJldHVybjtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKFwiUGx1Z2luIHVubG9hZGVkLCBhZGRpbmcgcmVsb2FkIHdhcm5pbmcuXCIpO1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoU0VMRUNUT1JTLlBMVUdJTlNfQ0FURUdPUlkpO1xyXG4gICAgICAgIGlmICghY29udGFpbmVyKSByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IHBhcmFncmFwaCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xyXG4gICAgICAgIHBhcmFncmFwaC5pZCA9IFwicGx1Z2luLXJlbG9hZC13YXJuaW5nXCI7XHJcbiAgICAgICAgcGFyYWdyYXBoLnN0eWxlLmNvbG9yID0gXCJ3aGl0ZVwiO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcclxuICAgICAgICBsaW5rLnN0eWxlLmNvbG9yID0gXCJjeWFuXCI7XHJcbiAgICAgICAgbGluay5zdHlsZS5jdXJzb3IgPSBcInBvaW50ZXJcIjtcclxuICAgICAgICBsaW5rLnRleHRDb250ZW50ID0gXCJoZXJlXCI7XHJcbiAgICAgICAgbGluay5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvJztcclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICBwYXJhZ3JhcGguYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJSZWxvYWQgaXMgcmVxdWlyZWQgdG8gZGlzYWJsZSBwbHVnaW5zLiBDbGljayBcIikpO1xyXG4gICAgICAgIHBhcmFncmFwaC5hcHBlbmRDaGlsZChsaW5rKTtcclxuICAgICAgICBwYXJhZ3JhcGguYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCIgdG8gcmVsb2FkLlwiKSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHBhcmFncmFwaCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBzdGF0aWMgb3BlblRoZW1lc0ZvbGRlcigpOiB2b2lkIHtcclxuICAgICAgICBoZWxwZXJzLndhaXRGb3JFbG0oXCIjb3BlbnRoZW1lc2ZvbGRlckJ0blwiKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvcGVudGhlbWVzZm9sZGVyQnRuXCIpO1xyXG4gICAgICAgICAgICBidXR0b24/LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLm9wZW5Gb2xkZXIoUHJvcGVydGllcy50aGVtZXNQYXRoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSkuY2F0Y2goZXJyID0+IHRoaXMubG9nZ2VyLmVycm9yKGBGYWlsZWQgdG8gc2V0dXAgdGhlbWVzIGZvbGRlciBidXR0b246ICR7ZXJyfWApKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIG9wZW5QbHVnaW5zRm9sZGVyKCk6IHZvaWQge1xyXG4gICAgICAgIGhlbHBlcnMud2FpdEZvckVsbShcIiNvcGVucGx1Z2luc2ZvbGRlckJ0blwiKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvcGVucGx1Z2luc2ZvbGRlckJ0blwiKTtcclxuICAgICAgICAgICAgYnV0dG9uPy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5vcGVuRm9sZGVyKFByb3BlcnRpZXMucGx1Z2luc1BhdGgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KS5jYXRjaChlcnIgPT4gdGhpcy5sb2dnZXIuZXJyb3IoYEZhaWxlZCB0byBzZXR1cCBwbHVnaW5zIGZvbGRlciBidXR0b246ICR7ZXJyfWApKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE9wZW4gYSBmb2xkZXIgaW4gdGhlIHN5c3RlbSBmaWxlIGV4cGxvcmVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIGFzeW5jIG9wZW5Gb2xkZXIoZm9sZGVyUGF0aDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgYXdhaXQgUGxhdGZvcm1NYW5hZ2VyLmN1cnJlbnQub3BlblBhdGgoZm9sZGVyUGF0aCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoYEZhaWxlZCB0byBvcGVuIGZvbGRlciAke2ZvbGRlclBhdGh9OiAke2Vycm9yfWApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgICAgICBcclxuICAgIHB1YmxpYyBzdGF0aWMgc2Nyb2xsTGlzdGVuZXIoKTogdm9pZCB7XG4gICAgICAgIGhlbHBlcnMud2FpdEZvckVsbSgnW2RhdGEtc2VjdGlvbj1cImVuaGFuY2VkXCJdJykudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbmhhbmNlZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlbmhhbmNlZCcpO1xuICAgICAgICAgICAgY29uc3QgZW5oYW5jZWROYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zZWN0aW9uPVwiZW5oYW5jZWRcIl0nKSBhcyBIVE1MRWxlbWVudCB8IG51bGw7XG5cbiAgICAgICAgICAgIGlmICghKGVuaGFuY2VkIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHx8ICFlbmhhbmNlZE5hdikgcmV0dXJuO1xuXG4gICAgICAgICAgICBpZiAoZW5oYW5jZWROYXYuZGF0YXNldC5zdHJlbWlvRW5oYW5jZWRTY3JvbGxCb3VuZCA9PT0gXCJ0cnVlXCIpIHJldHVybjtcbiAgICAgICAgICAgIGVuaGFuY2VkTmF2LmRhdGFzZXQuc3RyZW1pb0VuaGFuY2VkU2Nyb2xsQm91bmQgPSBcInRydWVcIjtcblxuICAgICAgICAgICAgZW5oYW5jZWROYXYuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBmaXJzdENoaWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlbmhhbmNlZCA+IGRpdlwiKTtcbiAgICAgICAgICAgICAgICBmaXJzdENoaWxkPy5zY3JvbGxJbnRvVmlldyh7XHJcbiAgICAgICAgICAgICAgICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnLFxyXG4gICAgICAgICAgICAgICAgICAgIGJsb2NrOiAnc3RhcnQnXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgU2V0dGluZ3MuYWN0aXZlU2VjdGlvbihlbmhhbmNlZE5hdik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKGVudHJpZXMpID0+IHtcclxuICAgICAgICAgICAgICAgIGVudHJpZXMuZm9yRWFjaChlbnRyeSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVudHJ5LmlzSW50ZXJzZWN0aW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFNldHRpbmdzLmFjdGl2ZVNlY3Rpb24oZW5oYW5jZWROYXYpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuaGFuY2VkTmF2LmNsYXNzTGlzdC5yZW1vdmUoQ0xBU1NFUy5TRUxFQ1RFRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0sIHsgdGhyZXNob2xkOiAwLjEgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIG9ic2VydmVyLm9ic2VydmUoZW5oYW5jZWQpO1xyXG4gICAgICAgIH0pLmNhdGNoKGVyciA9PiB0aGlzLmxvZ2dlci5lcnJvcihgRmFpbGVkIHRvIHNldHVwIHNjcm9sbCBsaXN0ZW5lcjogJHtlcnJ9YCkpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIEFkZCB0aGUgYXBwbHlUaGVtZSBmdW5jdGlvbiB0byB0aGUgcGFnZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGFkZEFwcGx5VGhlbWVGdW5jdGlvbigpOiB2b2lkIHtcbiAgICAgICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuQVBQTFlfVEhFTUVfU0NSSVBUX0lEKSkgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IGFwcGx5VGhlbWVTY3JpcHQgPSBnZXRBcHBseVRoZW1lVGVtcGxhdGUoKTtcbiAgICAgICAgY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTsgIFxuICAgICAgICBzY3JpcHQuaW5uZXJIVE1MID0gYXBwbHlUaGVtZVNjcmlwdDtcbiAgICAgICAgc2NyaXB0LmlkID0gdGhpcy5BUFBMWV9USEVNRV9TQ1JJUFRfSUQ7XG4gICAgICAgIFxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gICAgfVxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVjayBmb3IgdXBkYXRlcyBmb3IgYSBzcGVjaWZpYyBwbHVnaW4gb3IgdGhlbWVcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBhc3luYyBjaGVja0Zvckl0ZW1VcGRhdGVzKGl0ZW1GaWxlOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKCdDaGVja2luZyBmb3IgdXBkYXRlcyBmb3IgJyArIGl0ZW1GaWxlKTtcclxuICAgICAgICBcclxuICAgICAgICBjb25zdCBpdGVtQm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUoYCR7aXRlbUZpbGV9LWJveGApWzBdO1xyXG4gICAgICAgIGlmICghaXRlbUJveCkge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2dlci53YXJuKGAke2l0ZW1GaWxlfS1ib3ggZWxlbWVudCBub3QgZm91bmQuYCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHBsdWdpbk9yVGhlbWU6ICd0aGVtZScgfCAncGx1Z2luJyA9IGl0ZW1GaWxlLmVuZHNXaXRoKFwiLnRoZW1lLmNzc1wiKSA/IFwidGhlbWVcIiA6IFwicGx1Z2luXCI7XHJcbiAgICAgICAgY29uc3QgaXRlbVBhdGggPSBqb2luKFxyXG4gICAgICAgICAgICBwbHVnaW5PclRoZW1lID09PSBcInRoZW1lXCIgPyBwcm9wZXJ0aWVzLnRoZW1lc1BhdGggOiBwcm9wZXJ0aWVzLnBsdWdpbnNQYXRoLCBcclxuICAgICAgICAgICAgaXRlbUZpbGVcclxuICAgICAgICApO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIFJlZmFjdG9yZWQ6IFJlYWQgZmlsZSBmaXJzdFxyXG4gICAgICAgIGxldCBmaWxlQ29udGVudCA9IFwiXCI7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgZmlsZUNvbnRlbnQgPSBhd2FpdCBQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC5yZWFkRmlsZShpdGVtUGF0aCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcihgRmFpbGVkIHRvIHJlYWQgZmlsZSAke2l0ZW1QYXRofTogJHtlfWApO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBpbnN0YWxsZWRJdGVtTWV0YURhdGEgPSBFeHRyYWN0TWV0YURhdGEuZXh0cmFjdE1ldGFkYXRhRnJvbVRleHQoZmlsZUNvbnRlbnQpIGFzIE1ldGFEYXRhIHwgbnVsbDtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoIWluc3RhbGxlZEl0ZW1NZXRhRGF0YSB8fCBPYmplY3Qua2V5cyhpbnN0YWxsZWRJdGVtTWV0YURhdGEpLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB1cGRhdGVVcmwgPSBpbnN0YWxsZWRJdGVtTWV0YURhdGEudXBkYXRlVXJsO1xyXG4gICAgICAgIGlmICghdXBkYXRlVXJsIHx8IHVwZGF0ZVVybCA9PT0gXCJub25lXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2dnZXIuaW5mbyhgTm8gdXBkYXRlIFVSTCBwcm92aWRlZCBmb3IgJHtwbHVnaW5PclRoZW1lfSAoJHtpbnN0YWxsZWRJdGVtTWV0YURhdGEubmFtZX0pYCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlcXVlc3QgPSBhd2FpdCBmZXRjaCh1cGRhdGVVcmwpO1xyXG4gICAgICAgICAgICBpZiAocmVxdWVzdC5zdGF0dXMgIT09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIud2FybihgRmFpbGVkIHRvIGZldGNoIHVwZGF0ZSBmb3IgJHtpdGVtRmlsZX06IEhUVFAgJHtyZXF1ZXN0LnN0YXR1c31gKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCByZXF1ZXN0LnRleHQoKTtcclxuICAgICAgICAgICAgY29uc3QgZXh0cmFjdGVkTWV0YURhdGEgPSBFeHRyYWN0TWV0YURhdGEuZXh0cmFjdE1ldGFkYXRhRnJvbVRleHQocmVzcG9uc2UpIGFzIE1ldGFEYXRhIHwgbnVsbDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmICghZXh0cmFjdGVkTWV0YURhdGEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLndhcm4oYEZhaWxlZCB0byBleHRyYWN0IG1ldGFkYXRhIGZyb20gcmVzcG9uc2UgZm9yICR7cGx1Z2luT3JUaGVtZX0gKCR7aW5zdGFsbGVkSXRlbU1ldGFEYXRhLm5hbWV9KWApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoaGVscGVycy5pc05ld2VyVmVyc2lvbihleHRyYWN0ZWRNZXRhRGF0YS52ZXJzaW9uLCBpbnN0YWxsZWRJdGVtTWV0YURhdGEudmVyc2lvbikpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmluZm8oXHJcbiAgICAgICAgICAgICAgICAgICAgYFVwZGF0ZSBhdmFpbGFibGUgZm9yICR7cGx1Z2luT3JUaGVtZX0gKCR7aW5zdGFsbGVkSXRlbU1ldGFEYXRhLm5hbWV9KTogYCArXHJcbiAgICAgICAgICAgICAgICAgICAgYHYke2luc3RhbGxlZEl0ZW1NZXRhRGF0YS52ZXJzaW9ufSAtPiB2JHtleHRyYWN0ZWRNZXRhRGF0YS52ZXJzaW9ufWBcclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgdXBkYXRlQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7aXRlbUZpbGV9LXVwZGF0ZWApO1xyXG4gICAgICAgICAgICAgICAgaWYgKHVwZGF0ZUJ1dHRvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZUJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IFBsYXRmb3JtTWFuYWdlci5jdXJyZW50LndyaXRlRmlsZShpdGVtUGF0aCwgcmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBTZXR0aW5ncy5yZW1vdmVJdGVtKGl0ZW1GaWxlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgU2V0dGluZ3MuYWRkSXRlbShwbHVnaW5PclRoZW1lLCBpdGVtRmlsZSwgZXh0cmFjdGVkTWV0YURhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIuaW5mbyhcclxuICAgICAgICAgICAgICAgICAgICBgTm8gdXBkYXRlIGF2YWlsYWJsZSBmb3IgJHtwbHVnaW5PclRoZW1lfSAoJHtpbnN0YWxsZWRJdGVtTWV0YURhdGEubmFtZX0pLiBgICtcclxuICAgICAgICAgICAgICAgICAgICBgQ3VycmVudCB2ZXJzaW9uOiB2JHtpbnN0YWxsZWRJdGVtTWV0YURhdGEudmVyc2lvbn1gXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoYEVycm9yIGNoZWNraW5nIHVwZGF0ZXMgZm9yICR7aXRlbUZpbGV9OiAkeyhlcnJvciBhcyBFcnJvcikubWVzc2FnZX1gKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuICAgIFxyXG5leHBvcnQgZGVmYXVsdCBNb2RNYW5hZ2VyO1xyXG4iLCAiLyoqXHJcbiAqIE1ldGFkYXRhIHN0cnVjdHVyZSBmb3IgcGx1Z2lucyBhbmQgdGhlbWVzXHJcbiAqIEV4dHJhY3RlZCBmcm9tIEpTRG9jLXN0eWxlIGNvbW1lbnRzIGluIG1vZCBmaWxlc1xyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBNZXRhRGF0YSB7XHJcbiAgICAvKiogRGlzcGxheSBuYW1lIG9mIHRoZSBtb2QgKi9cclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIC8qKiBCcmllZiBkZXNjcmlwdGlvbiBvZiB3aGF0IHRoZSBtb2QgZG9lcyAqL1xyXG4gICAgZGVzY3JpcHRpb246IHN0cmluZztcclxuICAgIC8qKiBBdXRob3IvY3JlYXRvciBvZiB0aGUgbW9kICovXHJcbiAgICBhdXRob3I6IHN0cmluZztcclxuICAgIC8qKiBTZW1hbnRpYyB2ZXJzaW9uIHN0cmluZyAoZS5nLiwgXCIxLjAuMFwiKSAqL1xyXG4gICAgdmVyc2lvbjogc3RyaW5nO1xyXG4gICAgLyoqIFVSTCB0byBjaGVjayBmb3IgdXBkYXRlcyAob3B0aW9uYWwpICovXHJcbiAgICB1cGRhdGVVcmw/OiBzdHJpbmc7XHJcbiAgICAvKiogU291cmNlIGNvZGUgcmVwb3NpdG9yeSBVUkwgKG9wdGlvbmFsKSAqL1xyXG4gICAgc291cmNlPzogc3RyaW5nO1xyXG4gICAgLyoqIExpY2Vuc2UgdHlwZSAob3B0aW9uYWwpICovXHJcbiAgICBsaWNlbnNlPzogc3RyaW5nO1xyXG4gICAgLyoqIEhvbWVwYWdlL2RvY3VtZW50YXRpb24gVVJMIChvcHRpb25hbCkgKi9cclxuICAgIGhvbWVwYWdlPzogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgdHlwZSBNZXRhZGF0YUtleSA9IGtleW9mIE1ldGFEYXRhO1xyXG5cclxuZXhwb3J0IGNvbnN0IFJFUVVJUkVEX01FVEFEQVRBX0tFWVMgPSBbXHJcbiAgICBcIm5hbWVcIixcclxuICAgIFwiZGVzY3JpcHRpb25cIixcclxuICAgIFwiYXV0aG9yXCIsXHJcbiAgICBcInZlcnNpb25cIixcclxuXSBhcyBjb25zdCBzYXRpc2ZpZXMgcmVhZG9ubHkgTWV0YWRhdGFLZXlbXTtcclxuXHJcbmV4cG9ydCBjb25zdCBBTExfTUVUQURBVEFfS0VZUyA9IFtcclxuICAgIFwibmFtZVwiLFxyXG4gICAgXCJkZXNjcmlwdGlvblwiLFxyXG4gICAgXCJhdXRob3JcIixcclxuICAgIFwidmVyc2lvblwiLFxyXG4gICAgXCJ1cGRhdGVVcmxcIixcclxuICAgIFwic291cmNlXCIsXHJcbiAgICBcImxpY2Vuc2VcIixcclxuICAgIFwiaG9tZXBhZ2VcIixcclxuXSBhcyBjb25zdCBzYXRpc2ZpZXMgcmVhZG9ubHkgTWV0YWRhdGFLZXlbXTtcclxuIiwgImltcG9ydCB7XHJcbiAgICBNZXRhRGF0YSxcclxuICAgIE1ldGFkYXRhS2V5LFxyXG4gICAgUkVRVUlSRURfTUVUQURBVEFfS0VZUyxcclxuICAgIEFMTF9NRVRBREFUQV9LRVlTLFxyXG59IGZyb20gXCIuLi9pbnRlcmZhY2VzL01ldGFEYXRhXCI7XHJcbmltcG9ydCBsb2dnZXIgZnJvbSBcIi4vbG9nZ2VyXCI7XHJcblxyXG5jbGFzcyBFeHRyYWN0TWV0YURhdGEge1xyXG4gICAgLyoqXHJcbiAgICAgKiBQYXJzZSBtZXRhZGF0YSBmcm9tIGEgY29tbWVudCBibG9jayBpbiB0aGUgZm9ybWF0OlxyXG4gICAgICogLyoqIEBrZXkgdmFsdWUgKlxcL1xyXG4gICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIHBhcnNlTWV0YWRhdGFGcm9tQ29udGVudChjb250ZW50OiBzdHJpbmcpOiBNZXRhRGF0YSB8IG51bGwge1xyXG4gICAgICAgIGNvbnN0IGJsb2NrTWF0Y2ggPSBjb250ZW50Lm1hdGNoKC9cXC9cXCpcXCooW1xcc1xcU10qPylcXCpcXC8vKTtcclxuICAgICAgICBpZiAoIWJsb2NrTWF0Y2gpIHJldHVybiBudWxsO1xyXG5cclxuICAgICAgICBjb25zdCByZXN1bHQ6IFBhcnRpYWw8TWV0YURhdGE+ID0ge307XHJcbiAgICAgICAgY29uc3QgdGFnUmVnZXggPSAvQChcXHcrKVxccysoW15cXG5cXHJdKykvZztcclxuXHJcbiAgICAgICAgZm9yIChjb25zdCBbLCByYXdLZXksIHJhd1ZhbHVlXSBvZiBibG9ja01hdGNoWzFdLm1hdGNoQWxsKHRhZ1JlZ2V4KSkge1xyXG4gICAgICAgICAgICBpZiAoIUFMTF9NRVRBREFUQV9LRVlTLmluY2x1ZGVzKHJhd0tleSBhcyBNZXRhZGF0YUtleSkpIGNvbnRpbnVlO1xyXG5cclxuICAgICAgICAgICAgY29uc3Qga2V5ID0gcmF3S2V5IGFzIE1ldGFkYXRhS2V5O1xyXG5cclxuICAgICAgICAgICAgaWYgKHJlc3VsdFtrZXldICE9PSB1bmRlZmluZWQpIGNvbnRpbnVlO1xyXG5cclxuICAgICAgICAgICAgcmVzdWx0W2tleV0gPSByYXdWYWx1ZS50cmltKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBSRVFVSVJFRF9NRVRBREFUQV9LRVlTKSB7XHJcbiAgICAgICAgICAgIGlmICghcmVzdWx0W2tleV0pIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdCBhcyBNZXRhRGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGV4dHJhY3RNZXRhZGF0YUZyb21UZXh0KHRleHRDb250ZW50OiBzdHJpbmcpOiBNZXRhRGF0YSB8IG51bGwge1xyXG4gICAgICAgIGNvbnN0IG1ldGFkYXRhID0gdGhpcy5wYXJzZU1ldGFkYXRhRnJvbUNvbnRlbnQodGV4dENvbnRlbnQpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICghbWV0YWRhdGEpIHtcclxuICAgICAgICAgICAgbG9nZ2VyLmVycm9yKCdDb21tZW50IGJsb2NrIG5vdCBmb3VuZCBpbiB0aGUgcHJvdmlkZWQgdGV4dCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gbWV0YWRhdGE7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4dHJhY3RNZXRhRGF0YTtcclxuIiwgImltcG9ydCBIZWxwZXJzIGZyb20gXCIuLi91dGlscy9IZWxwZXJzXCI7XHJcbmltcG9ydCB7IE1ldGFEYXRhIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvTWV0YURhdGFcIjtcclxuaW1wb3J0IHsgZ2V0UGx1Z2luSXRlbVRlbXBsYXRlIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvcGx1Z2luLWl0ZW0vcGx1Z2luSXRlbVwiO1xyXG5pbXBvcnQgeyBnZXRUaGVtZUl0ZW1UZW1wbGF0ZSB9IGZyb20gXCIuLi9jb21wb25lbnRzL3RoZW1lLWl0ZW0vdGhlbWVJdGVtXCI7XHJcbmltcG9ydCB7IGdldEVuaGFuY2VkTmF2IH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvZW5oYW5jZWQtbmF2L2VuaGFuY2VkTmF2XCI7XHJcbmltcG9ydCB7IGdldExvZ2dlciB9IGZyb20gXCIuLi91dGlscy9sb2dnZXJcIjtcclxuaW1wb3J0IE1vZE1hbmFnZXIgZnJvbSBcIi4vTW9kTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTRUxFQ1RPUlMsIENMQVNTRVMsIFNUT1JBR0VfS0VZUyB9IGZyb20gXCIuLi9jb25zdGFudHNcIjtcclxuXHJcbmNsYXNzIFNldHRpbmdzIHtcbiAgICBwcml2YXRlIHN0YXRpYyBsb2dnZXIgPSBnZXRMb2dnZXIoXCJTZXR0aW5nc1wiKTtcblxuICAgIHByaXZhdGUgc3RhdGljIGdldENhdGVnb3J5S2V5KHNlY3Rpb25JZDogc3RyaW5nLCB0aXRsZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGAke3NlY3Rpb25JZH06JHt0aXRsZS50cmltKCkudG9Mb3dlckNhc2UoKX1gO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGdldEV4aXN0aW5nQ2F0ZWdvcnkoc2VjdGlvbjogSFRNTEVsZW1lbnQsIHNlY3Rpb25JZDogc3RyaW5nLCB0aXRsZTogc3RyaW5nKTogSFRNTEVsZW1lbnQgfCBudWxsIHtcbiAgICAgICAgY29uc3QgY2F0ZWdvcnlLZXkgPSB0aGlzLmdldENhdGVnb3J5S2V5KHNlY3Rpb25JZCwgdGl0bGUpO1xuICAgICAgICBjb25zdCBjYXRlZ29yeUJ5S2V5ID0gc2VjdGlvbi5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PihgW2RhdGEtc3RyZW1pby1lbmhhbmNlZC1jYXRlZ29yeT1cIiR7Y2F0ZWdvcnlLZXl9XCJdYCk7XG4gICAgICAgIGlmIChjYXRlZ29yeUJ5S2V5KSByZXR1cm4gY2F0ZWdvcnlCeUtleTtcblxuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbShzZWN0aW9uLmNoaWxkcmVuKS5maW5kKChjaGlsZCk6IGNoaWxkIGlzIEhUTUxFbGVtZW50ID0+IHtcbiAgICAgICAgICAgIGlmICghKGNoaWxkIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICBjb25zdCBsYWJlbCA9IGNoaWxkLnF1ZXJ5U2VsZWN0b3IoU0VMRUNUT1JTLkNBVEVHT1JZX0xBQkVMKTtcbiAgICAgICAgICAgIHJldHVybiBsYWJlbD8udGV4dENvbnRlbnQ/LnRyaW0oKSA9PT0gdGl0bGU7XG4gICAgICAgIH0pID8/IG51bGw7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgZW5zdXJlTmF2SXRlbShzZWN0aW9uSWQ6IHN0cmluZywgdGl0bGU6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLndhaXRGb3JOYXZNZW51KCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBuYXYgPSB0aGlzLmdldE5hdk1lbnUoKTtcbiAgICAgICAgICAgIGNvbnN0IHNob3J0Y3V0c05hdiA9IHRoaXMuZ2V0TmF2U2hvcnRjdXRJdGVtKCk7XG5cbiAgICAgICAgICAgIGlmICghbmF2KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoXCJuYXYgbWVudSBpcyBzdGlsbCBudWxsIGFmdGVyIHdhaXRcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBleGlzdGluZ05hdiA9IG5hdi5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PihgW2RhdGEtc2VjdGlvbj1cIiR7c2VjdGlvbklkfVwiXWApO1xuICAgICAgICAgICAgaWYgKGV4aXN0aW5nTmF2KSB7XG4gICAgICAgICAgICAgICAgZXhpc3RpbmdOYXYuc2V0QXR0cmlidXRlKFwidGl0bGVcIiwgdGl0bGUpO1xuICAgICAgICAgICAgICAgIGV4aXN0aW5nTmF2LnRleHRDb250ZW50ID0gdGl0bGU7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBlbmhhbmNlZE5hdkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICBlbmhhbmNlZE5hdkNvbnRhaW5lci5pbm5lckhUTUwgPSBnZXRFbmhhbmNlZE5hdigpO1xuXG4gICAgICAgICAgICBjb25zdCBjaGlsZFRvQXBwZW5kID0gKGVuaGFuY2VkTmF2Q29udGFpbmVyLmZpcnN0RWxlbWVudENoaWxkIGFzIEhUTUxFbGVtZW50IHwgbnVsbCkgPz8gZW5oYW5jZWROYXZDb250YWluZXI7XG4gICAgICAgICAgICBjaGlsZFRvQXBwZW5kLnNldEF0dHJpYnV0ZShcImRhdGEtc2VjdGlvblwiLCBzZWN0aW9uSWQpO1xuICAgICAgICAgICAgY2hpbGRUb0FwcGVuZC5zZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiLCB0aXRsZSk7XG4gICAgICAgICAgICBjaGlsZFRvQXBwZW5kLnRleHRDb250ZW50ID0gdGl0bGU7XG5cbiAgICAgICAgICAgIGlmIChzaG9ydGN1dHNOYXYgJiYgc2hvcnRjdXRzTmF2LnBhcmVudE5vZGUgPT09IG5hdikge1xuICAgICAgICAgICAgICAgIG5hdi5pbnNlcnRCZWZvcmUoY2hpbGRUb0FwcGVuZCwgc2hvcnRjdXRzTmF2Lm5leHRTaWJsaW5nKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbmF2LmFwcGVuZENoaWxkKGNoaWxkVG9BcHBlbmQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KS5jYXRjaChlcnIgPT4gdGhpcy5sb2dnZXIuZXJyb3IoYEZhaWxlZCB0byBhZGQgbmF2OiAke2Vycn1gKSk7XG4gICAgfVxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZCBhIG5ldyBzZWN0aW9uIHRvIHRoZSBzZXR0aW5ncyBwYW5lbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGFkZFNlY3Rpb24oc2VjdGlvbklkOiBzdHJpbmcsIHRpdGxlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy53YWl0Rm9yU2V0dGluZ3NQYW5lbCgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc2V0dGluZ3NQYW5lbCA9IHRoaXMuZ2V0U2V0dGluZ3NQYW5lbCgpO1xuICAgICAgICAgICAgaWYgKCFzZXR0aW5nc1BhbmVsKSByZXR1cm47XG5cbiAgICAgICAgICAgIGxldCBzZWN0aW9uQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2VjdGlvbklkKSBhcyBIVE1MRWxlbWVudCB8IG51bGw7XG5cbiAgICAgICAgICAgIGlmICghc2VjdGlvbkNvbnRhaW5lcikge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmluZm8oYEFkZGluZyBzZWN0aW9uOiAke3NlY3Rpb25JZH0gd2l0aCB0aXRsZTogJHt0aXRsZX1gKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHNlY3Rpb25FbGVtZW50ID0gdGhpcy5nZXRFeGlzdGluZ1NlY3Rpb24oc2V0dGluZ3NQYW5lbCk7XG4gICAgICAgICAgICAgICAgY29uc3QgbGFiZWxFbGVtZW50ID0gdGhpcy5nZXRFeGlzdGluZ1NlY3Rpb25MYWJlbChzZWN0aW9uRWxlbWVudCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIXNlY3Rpb25FbGVtZW50IHx8ICFsYWJlbEVsZW1lbnQpIHJldHVybjtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHNlY3Rpb25DbGFzc05hbWUgPSBzZWN0aW9uRWxlbWVudC5jbGFzc05hbWU7XG4gICAgICAgICAgICAgICAgY29uc3QgdGl0bGVDbGFzc05hbWUgPSBsYWJlbEVsZW1lbnQuY2xhc3NOYW1lO1xuXG4gICAgICAgICAgICAgICAgc2VjdGlvbkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICAgICAgc2VjdGlvbkNvbnRhaW5lci5jbGFzc05hbWUgPSBzZWN0aW9uQ2xhc3NOYW1lO1xuICAgICAgICAgICAgICAgIHNlY3Rpb25Db250YWluZXIuaWQgPSBzZWN0aW9uSWQ7XG4gICAgICAgICAgICAgICAgc2VjdGlvbkNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoXCJkYXRhLXN0cmVtaW8tZW5oYW5jZWQtc2VjdGlvblwiLCBzZWN0aW9uSWQpO1xuXG4gICAgICAgICAgICAgICAgY29uc3Qgc2VjdGlvblRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICBzZWN0aW9uVGl0bGUuY2xhc3NOYW1lID0gdGl0bGVDbGFzc05hbWU7XG4gICAgICAgICAgICAgICAgc2VjdGlvblRpdGxlLnRleHRDb250ZW50ID0gdGl0bGU7XG5cbiAgICAgICAgICAgICAgICBzZWN0aW9uQ29udGFpbmVyLmFwcGVuZENoaWxkKHNlY3Rpb25UaXRsZSk7XG4gICAgICAgICAgICAgICAgc2V0dGluZ3NQYW5lbC5hcHBlbmRDaGlsZChzZWN0aW9uQ29udGFpbmVyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5lbnN1cmVOYXZJdGVtKHNlY3Rpb25JZCwgdGl0bGUpO1xuICAgICAgICB9KS5jYXRjaChlcnIgPT4gdGhpcy5sb2dnZXIuZXJyb3IoYEZhaWxlZCB0byBhZGQgc2VjdGlvbjogJHtlcnJ9YCkpO1xuICAgIH1cblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGQgYSBjYXRlZ29yeSB3aXRoaW4gYSBzZWN0aW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgYWRkQ2F0ZWdvcnkodGl0bGU6IHN0cmluZywgc2VjdGlvbklkOiBzdHJpbmcsIGljb246IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLndhaXRGb3JTZXR0aW5nc1BhbmVsKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzZWN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2VjdGlvbklkKTtcbiAgICAgICAgICAgIGlmICghKHNlY3Rpb24gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHJldHVybjtcblxuICAgICAgICAgICAgaWYgKHRoaXMuZ2V0RXhpc3RpbmdDYXRlZ29yeShzZWN0aW9uLCBzZWN0aW9uSWQsIHRpdGxlKSkgcmV0dXJuO1xuXG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKGBBZGRpbmcgY2F0ZWdvcnk6ICR7dGl0bGV9IHRvIHNlY3Rpb246ICR7c2VjdGlvbklkfWApO1xuXG4gICAgICAgICAgICBjb25zdCBjYXRlZ29yeVRlbXBsYXRlID0gdGhpcy5nZXRDYXRlZ29yeVRlbXBsYXRlKCk7XG4gICAgICAgICAgICBpZiAoIWNhdGVnb3J5VGVtcGxhdGUpIHJldHVybjtcblxuICAgICAgICAgICAgY29uc3QgeyBjYXRlZ29yeUNsYXNzLCBjYXRlZ29yeVRpdGxlQ2xhc3MsIGhlYWRpbmdDbGFzcywgaWNvbkNsYXNzIH0gPSBjYXRlZ29yeVRlbXBsYXRlO1xuXG4gICAgICAgICAgICBpY29uID0gaWNvbi5yZXBsYWNlKGBjbGFzcz1cImljb25cImAsIGBjbGFzcz1cIiR7aWNvbkNsYXNzfVwiYCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGNhdGVnb3J5RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIGNhdGVnb3J5RGl2LmNsYXNzTmFtZSA9IGNhdGVnb3J5Q2xhc3M7XG4gICAgICAgICAgICBjYXRlZ29yeURpdi5zZXRBdHRyaWJ1dGUoXCJkYXRhLXN0cmVtaW8tZW5oYW5jZWQtY2F0ZWdvcnlcIiwgdGhpcy5nZXRDYXRlZ29yeUtleShzZWN0aW9uSWQsIHRpdGxlKSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IHRpdGxlRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIHRpdGxlRGl2LmNsYXNzTmFtZSA9IGNhdGVnb3J5VGl0bGVDbGFzcztcbiAgICAgICAgICAgIHRpdGxlRGl2LnRleHRDb250ZW50ID0gdGl0bGU7XG5cclxuICAgICAgICAgICAgY29uc3QgaGVhZGluZ0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgICAgIC8vIElmIHdlIGZvdW5kIGEgY2xhc3MsIHVzZSBpdC4gSWYgbm90LCBmYWxsYmFjayB0byBzZWxlY3RvciBsb2dpYyBvciBlbXB0eVxyXG4gICAgICAgICAgICBpZiAoaGVhZGluZ0NsYXNzKSB7XHJcbiAgICAgICAgICAgICAgICBoZWFkaW5nRGl2LmNsYXNzTmFtZSA9IGhlYWRpbmdDbGFzcztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICBoZWFkaW5nRGl2LmNsYXNzTGlzdC5hZGQoU0VMRUNUT1JTLkNBVEVHT1JZX0hFQURJTkcucmVwbGFjZSgnLicsICcnKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGhlYWRpbmdEaXYuaW5uZXJIVE1MICs9IGljb247XHJcbiAgICAgICAgICAgIGhlYWRpbmdEaXYuYXBwZW5kQ2hpbGQodGl0bGVEaXYpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY2F0ZWdvcnlEaXYuYXBwZW5kQ2hpbGQoaGVhZGluZ0Rpdik7XHJcbiAgICAgICAgICAgIHNlY3Rpb24uYXBwZW5kQ2hpbGQoY2F0ZWdvcnlEaXYpO1xyXG4gICAgICAgIH0pLmNhdGNoKGVyciA9PiB0aGlzLmxvZ2dlci5lcnJvcihgRmFpbGVkIHRvIGFkZCBjYXRlZ29yeTogJHtlcnJ9YCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIGEgYnV0dG9uIHRvIHRoZSBzZXR0aW5nc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGFkZEJ1dHRvbih0aXRsZTogc3RyaW5nLCBpZDogc3RyaW5nLCBxdWVyeTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIEhlbHBlcnMud2FpdEZvckVsbShxdWVyeSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpKSByZXR1cm47XG5cbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHF1ZXJ5KTtcbiAgICAgICAgICAgIGlmICghZWxlbWVudCkgcmV0dXJuO1xuXHJcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbkRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgICAgIG9wdGlvbkRpdi5jbGFzc0xpc3QuYWRkKENMQVNTRVMuT1BUSU9OKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgICAgICBjb250ZW50RGl2LmNsYXNzTGlzdC5hZGQoQ0xBU1NFUy5DT05URU5UKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGJ1dHRvbkRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgICAgIGJ1dHRvbkRpdi5zZXRBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiLCBcIjBcIik7XHJcbiAgICAgICAgICAgIGJ1dHRvbkRpdi5zZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiLCB0aXRsZSk7XHJcbiAgICAgICAgICAgIGJ1dHRvbkRpdi5jbGFzc0xpc3QuYWRkKENMQVNTRVMuQlVUVE9OLCBDTEFTU0VTLkJVVFRPTl9DT05UQUlORVIsIFwiYnV0dG9uXCIpO1xyXG4gICAgICAgICAgICBidXR0b25EaXYuaWQgPSBpZDtcclxuICAgICAgICAgICAgYnV0dG9uRGl2LnRleHRDb250ZW50ID0gdGl0bGU7XHJcblxyXG4gICAgICAgICAgICBjb250ZW50RGl2LmFwcGVuZENoaWxkKGJ1dHRvbkRpdik7XHJcbiAgICAgICAgICAgIG9wdGlvbkRpdi5hcHBlbmRDaGlsZChjb250ZW50RGl2KTtcclxuICAgICAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChvcHRpb25EaXYpO1xyXG4gICAgICAgIH0pLmNhdGNoKGVyciA9PiB0aGlzLmxvZ2dlci5lcnJvcihgRmFpbGVkIHRvIGFkZCBidXR0b246ICR7ZXJyfWApKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZCBhIHRoZW1lIG9yIHBsdWdpbiBpdGVtIHRvIHRoZSBzZXR0aW5nc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGFkZEl0ZW0odHlwZTogXCJ0aGVtZVwiIHwgXCJwbHVnaW5cIiwgZmlsZU5hbWU6IHN0cmluZywgbWV0YURhdGE6IE1ldGFEYXRhKTogdm9pZCB7XG4gICAgICAgIHRoaXMubG9nZ2VyLmluZm8oYEFkZGluZyAke3R5cGV9OiAke2ZpbGVOYW1lfWApO1xuXG4gICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZShgJHtmaWxlTmFtZX0tYm94YCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAodHlwZSA9PT0gXCJ0aGVtZVwiKSB7XG4gICAgICAgICAgICBIZWxwZXJzLndhaXRGb3JFbG0oU0VMRUNUT1JTLlRIRU1FU19DQVRFR09SWSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRUaGVtZShmaWxlTmFtZSwgbWV0YURhdGEpO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChlcnIgPT4gdGhpcy5sb2dnZXIuZXJyb3IoYEZhaWxlZCB0byBhZGQgdGhlbWU6ICR7ZXJyfWApKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09IFwicGx1Z2luXCIpIHtcclxuICAgICAgICAgICAgSGVscGVycy53YWl0Rm9yRWxtKFNFTEVDVE9SUy5QTFVHSU5TX0NBVEVHT1JZKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkUGx1Z2luKGZpbGVOYW1lLCBtZXRhRGF0YSk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB0aGlzLmxvZ2dlci5lcnJvcihgRmFpbGVkIHRvIGFkZCBwbHVnaW46ICR7ZXJyfWApKTtcclxuICAgICAgICB9ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBhZGRQbHVnaW4oZmlsZU5hbWU6IHN0cmluZywgbWV0YURhdGE6IE1ldGFEYXRhKTogdm9pZCB7XG4gICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZShgJHtmaWxlTmFtZX0tYm94YCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZW5hYmxlZFBsdWdpbnM6IHN0cmluZ1tdID0gSlNPTi5wYXJzZShcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5nZXRJdGVtKFNUT1JBR0VfS0VZUy5FTkFCTEVEX1BMVUdJTlMpIHx8IFwiW11cIlxuICAgICAgICApO1xuXG4gICAgICAgIGNvbnN0IHBsdWdpbkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHBsdWdpbkNvbnRhaW5lci5pbm5lckhUTUwgPSBnZXRQbHVnaW5JdGVtVGVtcGxhdGUoZmlsZU5hbWUsIG1ldGFEYXRhLCBlbmFibGVkUGx1Z2lucy5pbmNsdWRlcyhmaWxlTmFtZSkpO1xuICAgICAgICBwbHVnaW5Db250YWluZXIuc2V0QXR0cmlidXRlKFwibmFtZVwiLCBgJHtmaWxlTmFtZX0tYm94YCk7XG4gICAgICAgIHBsdWdpbkNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoXCJkYXRhLXN0cmVtaW8tZW5oYW5jZWQtaXRlbVwiLCBmaWxlTmFtZSk7XG5cclxuICAgICAgICBjb25zdCBwbHVnaW5zQ2F0ZWdvcnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFNFTEVDVE9SUy5QTFVHSU5TX0NBVEVHT1JZKTtcclxuICAgICAgICBwbHVnaW5zQ2F0ZWdvcnk/LmFwcGVuZENoaWxkKHBsdWdpbkNvbnRhaW5lcik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgTW9kTWFuYWdlci5jaGVja0Zvckl0ZW1VcGRhdGVzKGZpbGVOYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBhZGRUaGVtZShmaWxlTmFtZTogc3RyaW5nLCBtZXRhRGF0YTogTWV0YURhdGEpOiB2b2lkIHtcbiAgICAgICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKGAke2ZpbGVOYW1lfS1ib3hgKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjdXJyZW50VGhlbWUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShTVE9SQUdFX0tFWVMuQ1VSUkVOVF9USEVNRSk7XG5cbiAgICAgICAgY29uc3QgdGhlbWVDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICB0aGVtZUNvbnRhaW5lci5pbm5lckhUTUwgPSBnZXRUaGVtZUl0ZW1UZW1wbGF0ZShmaWxlTmFtZSwgbWV0YURhdGEsIGN1cnJlbnRUaGVtZSA9PT0gZmlsZU5hbWUpO1xuICAgICAgICB0aGVtZUNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoXCJuYW1lXCIsIGAke2ZpbGVOYW1lfS1ib3hgKTtcbiAgICAgICAgdGhlbWVDb250YWluZXIuc2V0QXR0cmlidXRlKFwiZGF0YS1zdHJlbWlvLWVuaGFuY2VkLWl0ZW1cIiwgZmlsZU5hbWUpO1xuXHJcbiAgICAgICAgY29uc3QgdGhlbWVzQ2F0ZWdvcnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFNFTEVDVE9SUy5USEVNRVNfQ0FURUdPUlkpO1xyXG4gICAgICAgIHRoZW1lc0NhdGVnb3J5Py5hcHBlbmRDaGlsZCh0aGVtZUNvbnRhaW5lcik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgTW9kTWFuYWdlci5jaGVja0Zvckl0ZW1VcGRhdGVzKGZpbGVOYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZSBhbiBpdGVtIGZyb20gdGhlIHNldHRpbmdzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgcmVtb3ZlSXRlbShmaWxlTmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIEFycmF5LmZyb20oZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUoYCR7ZmlsZU5hbWV9LWJveGApKS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBlbGVtZW50LnJlbW92ZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IGEgbmF2aWdhdGlvbiBlbGVtZW50IGFzIGFjdGl2ZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGFjdGl2ZVNlY3Rpb24oZWxlbWVudDogRWxlbWVudCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IG5hdiA9IHRoaXMuZ2V0TmF2TWVudSgpO1xyXG4gICAgICAgIGlmIChuYXYpIHtcclxuICAgICAgICAgICAgLy8gUmVtb3ZlIHNlbGVjdGVkIGNsYXNzIGZyb20gYWxsIG5hdiBpdGVtc1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5hdi5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbmF2LmNoaWxkcmVuW2ldLmNsYXNzTGlzdC5yZW1vdmUoQ0xBU1NFUy5TRUxFQ1RFRCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgLy8gRmFsbGJhY2sgdG8gcXVlcnlTZWxlY3RvclxyXG4gICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA2OyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG5hdkl0ZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAke1NFTEVDVE9SUy5OQVZfTUVOVX0gPiBkaXY6bnRoLWNoaWxkKCR7aX0pYCk7XHJcbiAgICAgICAgICAgICAgICBuYXZJdGVtPy5jbGFzc0xpc3QucmVtb3ZlKENMQVNTRVMuU0VMRUNURUQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoQ0xBU1NFUy5TRUxFQ1RFRCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gLS0tIER5bmFtaWMgRGlzY292ZXJ5IEhlbHBlcnMgLS0tXHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0TmF2TWVudSgpOiBFbGVtZW50IHwgbnVsbCB7XHJcbiAgICAgICAgLy8gVHJ5IHNlbGVjdG9yXHJcbiAgICAgICAgY29uc3QgbmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihTRUxFQ1RPUlMuTkFWX01FTlUpO1xyXG4gICAgICAgIGlmIChuYXYpIHJldHVybiBuYXY7XHJcblxyXG4gICAgICAgIC8vIER5bmFtaWMgZmFsbGJhY2tcclxuICAgICAgICBjb25zdCBrZXl3b3JkcyA9IFtcIkdlbmVyYWxcIiwgXCJJbnRlcmZhY2VcIiwgXCJQbGF5ZXJcIiwgXCJTdHJlYW1pbmdcIiwgXCJTaG9ydGN1dHNcIl07XHJcbiAgICAgICAgY29uc3QgbGlua3MgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2EsIGRpdlt0aXRsZV0nKSk7XHJcblxyXG4gICAgICAgIGZvciAoY29uc3QgbGluayBvZiBsaW5rcykge1xyXG4gICAgICAgICAgICAgY29uc3QgdGl0bGUgPSBsaW5rLmdldEF0dHJpYnV0ZSgndGl0bGUnKTtcclxuICAgICAgICAgICAgIGlmICh0aXRsZSAmJiBrZXl3b3Jkcy5pbmNsdWRlcyh0aXRsZSkpIHtcclxuICAgICAgICAgICAgICAgICBsZXQgcGFyZW50ID0gbGluay5wYXJlbnRFbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgIHdoaWxlKHBhcmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICBjb25zdCBmb3VuZCA9IGtleXdvcmRzLmZpbHRlcihrID0+IHBhcmVudCEucXVlcnlTZWxlY3RvcihgW3RpdGxlPVwiJHtrfVwiXWApKTtcclxuICAgICAgICAgICAgICAgICAgICAgaWYgKGZvdW5kLmxlbmd0aCA+PSAxKSB7IC8vIENoYW5nZWQgdG8gMSB0byBiZSBtb3JlIHBlcm1pc3NpdmUgb24gbW9iaWxlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFyZW50O1xyXG4gICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnRFbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgICAgICBpZiAocGFyZW50ID09PSBkb2N1bWVudC5ib2R5KSBicmVhaztcclxuICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGdldE5hdlNob3J0Y3V0SXRlbSgpOiBFbGVtZW50IHwgbnVsbCB7XHJcbiAgICAgICAgY29uc3QgaXRlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1t0aXRsZT1cIlNob3J0Y3V0c1wiXScpIHx8IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1t0aXRsZT1cIlN0cmVhbWluZ1wiXScpO1xyXG4gICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGdldFNldHRpbmdzUGFuZWwoKTogRWxlbWVudCB8IG51bGwge1xyXG4gICAgICAgIC8vIFRyeSBzZWxlY3RvclxyXG4gICAgICAgIGNvbnN0IHBhbmVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihTRUxFQ1RPUlMuU0VDVElPTlNfQ09OVEFJTkVSKTtcclxuICAgICAgICBpZiAocGFuZWwpIHJldHVybiBwYW5lbDtcclxuXHJcbiAgICAgICAgLy8gRHluYW1pYyBmYWxsYmFja1xyXG4gICAgICAgIGNvbnN0IG5hdk1lbnUgPSB0aGlzLmdldE5hdk1lbnUoKTtcclxuICAgICAgICBjb25zdCBrZXl3b3JkcyA9IFtcIkdlbmVyYWxcIiwgXCJJbnRlcmZhY2VcIiwgXCJQbGF5ZXJcIiwgXCJTdHJlYW1pbmdcIiwgXCJTaG9ydGN1dHNcIl07XHJcbiAgICAgICAgY29uc3QgYWxsRGl2cyA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnZGl2JykpO1xyXG4gICAgICAgIGZvciAoY29uc3QgZGl2IG9mIGFsbERpdnMpIHtcclxuICAgICAgICAgICAgIC8vIEV4Y2x1ZGUgbmF2IG1lbnUgYW5kIGl0cyBkZXNjZW5kYW50c1xyXG4gICAgICAgICAgICAgaWYgKG5hdk1lbnUgJiYgKGRpdiA9PT0gbmF2TWVudSB8fCBuYXZNZW51LmNvbnRhaW5zKGRpdikpKSBjb250aW51ZTtcclxuXHJcbiAgICAgICAgICAgICAvLyBUaGUgcmVhbCBzZXR0aW5ncyBwYW5lbCBjb250YWlucyBsYXJnZSBzZWN0aW9ucywgc28gd2UgY2FuIGNoZWNrIGlmIGl0IGhhcyBtdWx0aXBsZSBjaGlsZHJlblxyXG4gICAgICAgICAgICAgaWYgKGRpdi5jaGlsZHJlbi5sZW5ndGggPj0gMikgeyAvLyBDaGFuZ2VkIHRvID49IDIgdG8gYmUgbW9yZSBwZXJtaXNzaXZlIG9uIG1vYmlsZVxyXG4gICAgICAgICAgICAgICAgIGxldCBtYXRjaENvdW50ID0gMDtcclxuICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRpdi5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICBpZiAoa2V5d29yZHMuc29tZShrID0+IGRpdi5jaGlsZHJlbltpXS50ZXh0Q29udGVudD8uaW5jbHVkZXMoaykpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaENvdW50Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgaWYgKG1hdGNoQ291bnQgPj0gMSkgcmV0dXJuIGRpdjsgLy8gQ2hhbmdlZCB0byA+PSAxIHRvIGJlIG1vcmUgcGVybWlzc2l2ZSBvbiBtb2JpbGVcclxuICAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0RXhpc3RpbmdTZWN0aW9uKHBhbmVsOiBFbGVtZW50KTogRWxlbWVudCB8IG51bGwge1xyXG4gICAgICAgIC8vIEZpbmQgYSBjaGlsZCB0aGF0IGNvbnRhaW5zIFwiR2VuZXJhbFwiIG9yIFwiUGxheWVyXCJcclxuICAgICAgICBjb25zdCBrZXl3b3JkcyA9IFtcIkdlbmVyYWxcIiwgXCJJbnRlcmZhY2VcIiwgXCJQbGF5ZXJcIiwgXCJTdHJlYW1pbmdcIiwgXCJTaG9ydGN1dHNcIl07XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYW5lbC5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBjaGlsZCA9IHBhbmVsLmNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICBpZiAoa2V5d29yZHMuc29tZShrID0+IGNoaWxkLnRleHRDb250ZW50Py5pbmNsdWRlcyhrKSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjaGlsZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBGYWxsYmFjayB0byBzZWxlY3RvclxyXG4gICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFNFTEVDVE9SUy5TRUNUSU9OKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBnZXRFeGlzdGluZ1NlY3Rpb25MYWJlbChzZWN0aW9uOiBFbGVtZW50IHwgbnVsbCk6IEVsZW1lbnQgfCBudWxsIHtcclxuICAgICAgICBpZiAoIXNlY3Rpb24pIHJldHVybiBudWxsO1xyXG4gICAgICAgIC8vIFRoZSBsYWJlbCBpcyB1c3VhbGx5IHRoZSBmaXJzdCBjaGlsZCBvciBjbGFzcyBjb250YWlucyBsYWJlbFxyXG4gICAgICAgIGlmIChzZWN0aW9uLmNoaWxkcmVuLmxlbmd0aCA+IDApIHJldHVybiBzZWN0aW9uLmNoaWxkcmVuWzBdO1xyXG4gICAgICAgIC8vIEZhbGxiYWNrXHJcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoU0VMRUNUT1JTLkxBQkVMKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBnZXRDYXRlZ29yeVRlbXBsYXRlKCk6IHsgY2F0ZWdvcnlDbGFzczogc3RyaW5nLCBjYXRlZ29yeVRpdGxlQ2xhc3M6IHN0cmluZywgaGVhZGluZ0NsYXNzOiBzdHJpbmcsIGljb25DbGFzczogc3RyaW5nIH0gfCBudWxsIHtcclxuICAgICAgICAvLyBUcnkgdG8gZmluZCBhbiBleGlzdGluZyBjYXRlZ29yeSB0byBjb3B5IGNsYXNzZXNcclxuICAgICAgICBjb25zdCBjYXRlZ29yeUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFNFTEVDVE9SUy5DQVRFR09SWSk7XHJcbiAgICAgICAgY29uc3QgY2F0ZWdvcnlUaXRsZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFNFTEVDVE9SUy5DQVRFR09SWV9MQUJFTCk7XHJcbiAgICAgICAgY29uc3QgY2F0ZWdvcnlJY29uRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoU0VMRUNUT1JTLkNBVEVHT1JZX0lDT04pO1xyXG4gICAgICAgIGNvbnN0IGNhdGVnb3J5SGVhZGluZ0VsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFNFTEVDVE9SUy5DQVRFR09SWV9IRUFESU5HKTtcclxuXHJcbiAgICAgICAgbGV0IGNhdGVnb3J5Q2xhc3MgPSBjYXRlZ29yeUVsZW1lbnQ/LmNsYXNzTmFtZSB8fCBcIlwiO1xyXG4gICAgICAgIGxldCBjYXRlZ29yeVRpdGxlQ2xhc3MgPSBjYXRlZ29yeVRpdGxlRWxlbWVudD8uY2xhc3NOYW1lIHx8IFwiXCI7XHJcbiAgICAgICAgbGV0IGhlYWRpbmdDbGFzcyA9IGNhdGVnb3J5SGVhZGluZ0VsZW1lbnQ/LmNsYXNzTmFtZSB8fCBcIlwiO1xyXG5cclxuICAgICAgICBsZXQgaWNvbkNsYXNzID0gJ2ljb24nO1xyXG4gICAgICAgIGlmIChjYXRlZ29yeUljb25FbGVtZW50IGluc3RhbmNlb2YgU1ZHRWxlbWVudCkge1xyXG4gICAgICAgICAgICBpY29uQ2xhc3MgPSBjYXRlZ29yeUljb25FbGVtZW50LmNsYXNzTmFtZS5iYXNlVmFsO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoY2F0ZWdvcnlJY29uRWxlbWVudCkge1xyXG4gICAgICAgICAgICBpY29uQ2xhc3MgPSBjYXRlZ29yeUljb25FbGVtZW50LmNsYXNzTmFtZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjYXRlZ29yeUNsYXNzICYmIGNhdGVnb3J5VGl0bGVDbGFzcykge1xyXG4gICAgICAgICAgICByZXR1cm4geyBjYXRlZ29yeUNsYXNzLCBjYXRlZ29yeVRpdGxlQ2xhc3MsIGhlYWRpbmdDbGFzcywgaWNvbkNsYXNzIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBUcnkgZHluYW1pYyBpZiBzZWxlY3RvciBmYWlsZWRcclxuICAgICAgICBjb25zdCBwYW5lbCA9IHRoaXMuZ2V0U2V0dGluZ3NQYW5lbCgpO1xyXG4gICAgICAgIGlmIChwYW5lbCkge1xyXG4gICAgICAgICAgICBjb25zdCBzZWN0aW9uID0gdGhpcy5nZXRFeGlzdGluZ1NlY3Rpb24ocGFuZWwpO1xyXG4gICAgICAgICAgICBpZiAoc2VjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgLy8gRmluZCBhIGNhdGVnb3J5IGluc2lkZSBzZWN0aW9uXHJcbiAgICAgICAgICAgICAgICAvLyBVc3VhbGx5IG5vdCB0aGUgZmlyc3QgY2hpbGQgKExhYmVsKVxyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8c2VjdGlvbi5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoaWxkID0gc2VjdGlvbi5jaGlsZHJlbltpXTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBTa2lwIGlmIGl0IGlzIHRoZSBsYWJlbC90aXRsZVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhYmVsID0gdGhpcy5nZXRFeGlzdGluZ1NlY3Rpb25MYWJlbChzZWN0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2hpbGQgPT09IGxhYmVsKSBjb250aW51ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVGhpcyBjaGlsZCBpcyBsaWtlbHkgYSBjYXRlZ29yeVxyXG4gICAgICAgICAgICAgICAgICAgIGNhdGVnb3J5Q2xhc3MgPSBjaGlsZC5jbGFzc05hbWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIEZpbmQgSGVhZGluZ1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGhlYWRpbmcgPSBjaGlsZC5jaGlsZHJlblswXTsgLy8gQXNzdW1pbmcgZmlyc3QgY2hpbGQgaXMgaGVhZGluZ1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChoZWFkaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRpbmdDbGFzcyA9IGhlYWRpbmcuY2xhc3NOYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBIZWFkaW5nIGNvbnRhaW5zIEljb24gYW5kIFRpdGxlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpY29uID0gaGVhZGluZy5xdWVyeVNlbGVjdG9yKCdzdmcnKSB8fCBoZWFkaW5nLmNoaWxkcmVuWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGljb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaWNvbiBpbnN0YW5jZW9mIFNWR0VsZW1lbnQpIGljb25DbGFzcyA9IGljb24uY2xhc3NOYW1lLmJhc2VWYWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpY29uQ2xhc3MgPSBpY29uLmNsYXNzTmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0aXRsZSA9IGhlYWRpbmcucXVlcnlTZWxlY3RvcignZGl2JykgfHwgaGVhZGluZy5jaGlsZHJlblsxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aXRsZSkgY2F0ZWdvcnlUaXRsZUNsYXNzID0gdGl0bGUuY2xhc3NOYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhdGVnb3J5Q2xhc3MgJiYgY2F0ZWdvcnlUaXRsZUNsYXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBjYXRlZ29yeUNsYXNzLCBjYXRlZ29yeVRpdGxlQ2xhc3MsIGhlYWRpbmdDbGFzcywgaWNvbkNsYXNzIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyB3YWl0Rm9yU2V0dGluZ3NQYW5lbCgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgICAgICAgICAgbGV0IHJldHJpZXMgPSAwO1xyXG4gICAgICAgICAgICBjb25zdCBtYXhSZXRyaWVzID0gNDA7IC8vIDIwIHNlY29uZHNcclxuICAgICAgICAgICAgY29uc3QgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5nZXRTZXR0aW5nc1BhbmVsKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHJpZXMrKztcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmV0cmllcyA+IG1heFJldHJpZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoXCJUaW1lb3V0IHdhaXRpbmcgZm9yIHNldHRpbmdzIHBhbmVsXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpOyAvLyByZXNvbHZlIHRvIGxldCBpdCBmYWlsIGdyYWNlZnVsbHkgaW5zaWRlXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCA1MDApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIHdhaXRGb3JOYXZNZW51KCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgICAgICAgICAgbGV0IHJldHJpZXMgPSAwO1xyXG4gICAgICAgICAgICBjb25zdCBtYXhSZXRyaWVzID0gNDA7IC8vIDIwIHNlY29uZHNcclxuICAgICAgICAgICAgY29uc3QgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5nZXROYXZNZW51KCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHJpZXMrKztcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmV0cmllcyA+IG1heFJldHJpZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoXCJUaW1lb3V0IHdhaXRpbmcgZm9yIG5hdiBtZW51XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgNTAwKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2V0dGluZ3M7XHJcbiIsICJpbXBvcnQgVGVtcGxhdGVDYWNoZSBmcm9tICcuLi8uLi91dGlscy90ZW1wbGF0ZUNhY2hlJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRNb2RzVGFiVGVtcGxhdGUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBUZW1wbGF0ZUNhY2hlLmxvYWQoX19kaXJuYW1lLCAnbW9kcy10YWInKTtcclxufVxyXG4iLCAiaW1wb3J0IFRlbXBsYXRlQ2FjaGUgZnJvbSAnLi4vLi4vdXRpbHMvdGVtcGxhdGVDYWNoZSc7XHJcblxyXG5pbnRlcmZhY2UgTW9kTWV0YURhdGEge1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgZGVzY3JpcHRpb246IHN0cmluZztcclxuICAgIGF1dGhvcjogc3RyaW5nO1xyXG4gICAgdmVyc2lvbjogc3RyaW5nO1xyXG4gICAgcHJldmlldz86IHN0cmluZztcclxuICAgIGRvd25sb2FkOiBzdHJpbmc7XHJcbiAgICByZXBvOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRNb2RJdGVtVGVtcGxhdGUoXHJcbiAgICBtZXRhRGF0YTogTW9kTWV0YURhdGEsXHJcbiAgICB0eXBlOiBcIlBsdWdpblwiIHwgXCJUaGVtZVwiLCBcclxuICAgIGluc3RhbGxlZDogYm9vbGVhblxyXG4pOiBzdHJpbmcge1xyXG4gICAgbGV0IHRlbXBsYXRlID0gVGVtcGxhdGVDYWNoZS5sb2FkKF9fZGlybmFtZSwgJ21vZHMtaXRlbScpO1xyXG4gICAgXHJcbiAgICAvLyBHZW5lcmF0ZSBsb2dvIGJsb2NrIGJhc2VkIG9uIHR5cGVcclxuICAgIGxldCBsb2dvQmxvY2sgPSBcIlwiO1xyXG5cclxuICAgIGlmKHR5cGUgPT09IFwiVGhlbWVcIikge1xyXG4gICAgICAgIGlmKCFtZXRhRGF0YS5wcmV2aWV3KSB7XHJcbiAgICAgICAgICAgIC8vIElmIG5vIHByZXZpZXcgaXMgcHJvdmlkZWQgZm9yIHRoZW1lLCB1c2UgYSBwbGFjZWhvbGRlclxyXG4gICAgICAgICAgICBsb2dvQmxvY2sgPSBgXHJcbiAgICAgICAgPHN2ZyBjbGFzcz1cImljb24tR3hWYllcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+XHJcbiAgICAgICAgICAgIDxwYXRoIGQ9XCJNNCAzaDE2YTEgMSAwIDAgMSAxIDF2NWExIDEgMCAwIDEtMSAxSDRhMSAxIDAgMCAxLTEtMVY0YTEgMSAwIDAgMSAxLTF6bTIgOWg2YTEgMSAwIDAgMSAxIDF2M2gxdjZoLTR2LTZoMXYtMkg1YTEgMSAwIDAgMS0xLTF2LTJoMnYxem0xMS43MzIgMS43MzJsMS43NjgtMS43NjggMS43NjggMS43NjhhMi41IDIuNSAwIDEgMS0zLjUzNiAwelwiIHN0eWxlPVwiZmlsbDogY3VycmVudGNvbG9yO1wiPjwvcGF0aD5cclxuICAgICAgICA8L3N2Zz5gO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIFVzZSB0aGUgcHJldmlldyBpbWFnZSBmb3IgdGhlbWUgbG9nb1xyXG4gICAgICAgICAgICBsb2dvQmxvY2sgPSBgXHJcbiAgICAgICAgICAgIDxhIGhyZWY9XCIke21ldGFEYXRhLnByZXZpZXd9XCIgdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9yZWZlcnJlclwiPlxyXG4gICAgICAgICAgICAgICAgPGltZyBjbGFzcz1cImxvZ28tV3JzR0ZcIiBzcmM9XCIke21ldGFEYXRhLnByZXZpZXd9XCIgYWx0PVwiVGhlbWUgUHJldmlld1wiIGxvYWRpbmc9XCJsYXp5XCI+XHJcbiAgICAgICAgICAgIDwvYT5gO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbG9nb0Jsb2NrID0gYFxyXG4gICAgICAgIDxzdmcgY2xhc3M9XCJpY29uLUd4VmJZXCIgdmlld0JveD1cIjAgMCA1MTIgNTEyXCI+XHJcbiAgICAgICAgICAgIDxwYXRoIGQ9XCJNMzQ1LjY1MDAwMDAwMDAwMDEgNDU2LjMwMDAwMDAwMDAwMDJoLTcwLjg3Yy0yLjM1IDAuMDEtNC42OS0wLjQzLTYuODYtMS4yOS0yLjE4LTAuODctNC4xNS0yLjE0LTUuNzktMy43NS0zLjM3LTMuMTktNS4yNy03LjU0LTUuMjktMTIuMDd2LTI2LjMzYzAuMDMtNC4wNS0wLjgxLTguMDctMi40OS0xMS43OXMtNC4xMi03LjA3LTcuMTctOS44OWMtNy43OC03LjIyLTE5LjA0LTExLjIyLTMwLjgtMTAuOTMtMjEuMzMgMC40Ny0zOS4yNyAxOC4zNS0zOS4yNyAzOS4wN3YxOS44N2MwLjAxIDIuMjQtMC40NSA0LjQ4LTEuMzYgNi41NXMtMi4yNCAzLjk1LTMuOTMgNS41MmMtMy4zNSAzLjIxLTcuOSA1LjAyLTEyLjY1IDUuMDRoLTcwLjE3Yy0xNC43MSAwLjAxLTI4LjgzLTUuNTUtMzkuMjMtMTUuNDYtMTAuNDItOS45MS0xNi4yOC0yMy4zNi0xNi4yOS0zNy40di02Ni45MmMwLjAzLTQuNTMgMS45Mi04Ljg3IDUuMjgtMTIuMDcgMy4zNi0zLjIxIDcuOTEtNS4wMSAxMi42Ni01LjA0aDI3LjYxYzkuMTcgMCAxOC4wNC0zLjcxIDI1LjAyLTEwLjQ2IDMuODktMy43MiA2Ljk4LTguMTUgOS4wNy0xMy4wMmEzNy4yIDM3LjIgMCAwIDAgMy4wOS0xNS40Yy0wLjMtMjAuMTUtMTcuNjQtMzcuMTctMzcuOTgtMzcuMTdoLTI2LjcxYy0yLjM1IDAuMDEtNC42OS0wLjQzLTYuODctMS4yOWExNy43IDE3LjcgMCAwIDEtNS43OS0zLjc1Yy0zLjM3LTMuMTktNS4yNi03LjU0LTUuMjgtMTIuMDd2LTY2LjkyYTUwLjkgNTAuOSAwIDAgMSA0LjE5LTIwLjI1YzIuNzYtNi40MyA2Ljg2LTEyLjI1IDEyLjA2LTE3LjExIDEwLjM5LTkuOTEgMjQuNDgtMTUuNDggMzkuMTctMTUuNWg1NS4wMmMyLjEyIDAuMDEgNC4xNi0wLjc3IDUuNjgtMi4xOSAwLjczLTAuNzEgMS4zMi0xLjU1IDEuNzEtMi40OSAwLjQtMC45MyAwLjYtMS45MiAwLjU4LTIuOTJ2LTYuMThhNTkgNTkgMCAwIDEgNS4wOC0yNC4wNWMzLjM4LTcuNjIgOC4yOS0xNC41MyAxNC40Ni0yMC4zNSA2LjE5LTUuOCAxMy41NS0xMC4zNiAyMS42Mi0xMy40YTY5LjggNjkuOCAwIDAgMSAyNS4zMi00LjQ3YzM1LjM4IDAuNTcgNjQuMTkgMjguOSA2NC4xOSA2My4wM3Y1LjQyYy0wLjAzIDEuNTEgMC40MiAzIDEuMjkgNC4yNWE3LjczIDcuNzMgMCAwIDAgMy42MSAyLjgxYzAuOTggMC4zNyAyLjAzIDAuNTYgMy4wNyAwLjU0aDU1LjAyYTU2LjQgNTYuNCAwIDAgMSAyMC45MyAzLjk5YzEzLjQgNS4zMSAyNC4wNCAxNS40NiAyOS42IDI4LjI0IDIuNzcgNi4zMiA0LjIgMTMuMTEgNC4xOSAxOS45NnY1Mi40N2MtMC4wMyAxLjUyIDAuNDIgMy4wMSAxLjMgNC4yNmE3LjY2IDcuNjYgMCAwIDAgMy42IDIuODFjMC45OCAwLjM3IDIuMDMgMC41NiAzLjA3IDAuNTRoNS42OGMzNi40OCAwIDY2LjA5IDI3LjU3IDY2LjA5IDYxLjQxIDAgMzQuNzktMjkuMzEgNjMuMTItNjUuMjkgNjMuMTJoLTYuNDhjLTIuMTItMC4wMS00LjE1IDAuNzgtNS42OCAyLjE5YTcuNCA3LjQgMCAwIDAtMS43MSAyLjQ5Yy0wLjQgMC45My0wLjYgMS45My0wLjU4IDIuOTN2NTMuMjNjMC4wMSA2Ljg1LTEuNDIgMTMuNjQtNC4xOSAxOS45Ni01LjU2IDEyLjc4LTE2LjIgMjIuOTMtMjkuNiAyOC4yNGE1NiA1NiAwIDAgMS0yMC45MyAzLjk5XCIgc3R5bGU9XCJmaWxsOiBjdXJyZW50Y29sb3I7XCI+PC9wYXRoPlxyXG4gICAgICAgIDwvc3ZnPmBcclxuICAgIH1cclxuXHJcbiAgICAvLyBSZXBsYWNlIG1ldGFkYXRhIHBsYWNlaG9sZGVyc1xyXG4gICAgY29uc3QgbWV0YUtleXMgPSBbJ25hbWUnLCAnZGVzY3JpcHRpb24nLCAnYXV0aG9yJywgJ3ZlcnNpb24nXSBhcyBjb25zdDtcclxuICAgIG1ldGFLZXlzLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgICBjb25zdCByZWdleCA9IG5ldyBSZWdFeHAoYHt7XFxcXHMqJHtrZXl9XFxcXHMqfX1gLCAnZycpO1xyXG4gICAgICAgIHRlbXBsYXRlID0gdGVtcGxhdGUucmVwbGFjZShyZWdleCwgbWV0YURhdGFba2V5XSB8fCAnJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gdGVtcGxhdGVcclxuICAgICAgICAucmVwbGFjZSgvXFx7XFx7XFxzKnR5cGVcXHMqXFx9XFx9L2csIHR5cGUpXHJcbiAgICAgICAgLnJlcGxhY2UoL1xce1xce1xccyphY3Rpb25idG5UaXRsZVxccypcXH1cXH0vZywgaW5zdGFsbGVkID8gXCJVbmluc3RhbGxcIiA6IFwiSW5zdGFsbFwiKVxyXG4gICAgICAgIC5yZXBsYWNlKFwie3sgYWN0aW9uYnRuQ2xhc3MgfX1cIiwgaW5zdGFsbGVkID8gXCJ1bmluc3RhbGwtYnV0dG9uLWNvbnRhaW5lci1vVjRZb1wiIDogXCJpbnN0YWxsLWJ1dHRvbi1jb250YWluZXIteWZjcTVcIilcclxuICAgICAgICAucmVwbGFjZShcInt7IGRvd25sb2FkIH19XCIsIG1ldGFEYXRhLmRvd25sb2FkKVxyXG4gICAgICAgIC5yZXBsYWNlKFwie3sgcmVwbyB9fVwiLCBtZXRhRGF0YS5yZXBvKVxyXG4gICAgICAgIC5yZXBsYWNlKFwiPCEtLSB0aGVtZSBwcmV2aWV3IGhlcmUgLS0+XCIsIGxvZ29CbG9jaylcclxuICAgICAgICAucmVwbGFjZShcIjwhLS0gcGx1Z2luIGljb24gaGVyZSAtLT5cIiwgXCJcIik7IFxyXG59XHJcbiIsICJpbXBvcnQgVGVtcGxhdGVDYWNoZSBmcm9tICcuLi8uLi91dGlscy90ZW1wbGF0ZUNhY2hlJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRBYm91dENhdGVnb3J5VGVtcGxhdGUoXHJcbiAgICB2ZXJzaW9uOiBzdHJpbmcsIFxyXG4gICAgY2hlY2tGb3JVcGRhdGVzT25TdGFydHVwOiBib29sZWFuLCBcclxuICAgIGRpc2NvcmRSaWNoUHJlc2VuY2U6IGJvb2xlYW4sIFxyXG4gICAgZW5hYmxlVHJhbnNwYXJlbnRUaGVtZXM6IGJvb2xlYW5cclxuKTogc3RyaW5nIHtcclxuICAgIGNvbnN0IHRlbXBsYXRlID0gVGVtcGxhdGVDYWNoZS5sb2FkKF9fZGlybmFtZSwgJ2Fib3V0LWNhdGVnb3J5Jyk7XHJcbiAgICBcclxuICAgIHJldHVybiB0ZW1wbGF0ZVxyXG4gICAgICAgIC5yZXBsYWNlKFwie3sgdmVyc2lvbiB9fVwiLCB2ZXJzaW9uKVxyXG4gICAgICAgIC5yZXBsYWNlKFwie3sgY2hlY2tGb3JVcGRhdGVzT25TdGFydHVwIH19XCIsIGNoZWNrRm9yVXBkYXRlc09uU3RhcnR1cCA/IFwiY2hlY2tlZFwiIDogXCJcIilcclxuICAgICAgICAucmVwbGFjZShcInt7IGRpc2NvcmRyaWNocHJlc2VuY2UgfX1cIiwgZGlzY29yZFJpY2hQcmVzZW5jZSA/IFwiY2hlY2tlZFwiIDogXCJcIilcclxuICAgICAgICAucmVwbGFjZShcInt7IGVuYWJsZVRyYW5zcGFyZW50VGhlbWVzIH19XCIsIGVuYWJsZVRyYW5zcGFyZW50VGhlbWVzID8gXCJjaGVja2VkXCIgOiBcIlwiKTtcclxufVxyXG4iLCAiaW1wb3J0IFRlbXBsYXRlQ2FjaGUgZnJvbSAnLi4vLi4vdXRpbHMvdGVtcGxhdGVDYWNoZSc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGVmYXVsdFRoZW1lVGVtcGxhdGUoYXBwbGllZDogYm9vbGVhbik6IHN0cmluZyB7XHJcbiAgICBjb25zdCB0ZW1wbGF0ZSA9IFRlbXBsYXRlQ2FjaGUubG9hZChfX2Rpcm5hbWUsICdkZWZhdWx0LXRoZW1lJyk7XHJcblxyXG4gICAgcmV0dXJuIHRlbXBsYXRlXHJcbiAgICAgICAgLnJlcGxhY2UoXCJ7eyBkaXNhYmxlZCB9fVwiLCBhcHBsaWVkID8gXCJkaXNhYmxlZFwiIDogXCJcIilcclxuICAgICAgICAucmVwbGFjZShcInt7IGxhYmVsIH19XCIsIGFwcGxpZWQgPyBcIkFwcGxpZWRcIiA6IFwiQXBwbHlcIilcclxuICAgICAgICAucmVwbGFjZShcInt7IGJhY2tncm91bmRDb2xvciB9fVwiLCBhcHBsaWVkID8gXCJ2YXIoLS1vdmVybGF5LWNvbG9yKVwiIDogXCJ2YXIoLS1zZWNvbmRhcnktYWNjZW50LWNvbG9yKVwiKTtcclxufVxyXG4iLCAiaW1wb3J0IFRlbXBsYXRlQ2FjaGUgZnJvbSAnLi4vLi4vdXRpbHMvdGVtcGxhdGVDYWNoZSc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0QmFja0J1dHRvbigpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIFRlbXBsYXRlQ2FjaGUubG9hZChfX2Rpcm5hbWUsICdiYWNrLWJ0bicpO1xyXG59XHJcbiIsICJpbXBvcnQgeyBQbGF0Zm9ybU1hbmFnZXIgfSBmcm9tIFwiLi4vcGxhdGZvcm0vUGxhdGZvcm1NYW5hZ2VyXCI7XHJcbmltcG9ydCB7IENhcGFjaXRvclBsYXRmb3JtIH0gZnJvbSBcIi4uL3BsYXRmb3JtL0NhcGFjaXRvclBsYXRmb3JtXCI7XHJcbmltcG9ydCBTZXR0aW5ncyBmcm9tIFwiLi4vY29yZS9TZXR0aW5nc1wiO1xyXG5pbXBvcnQgcHJvcGVydGllcyBmcm9tIFwiLi4vY29yZS9Qcm9wZXJ0aWVzXCI7XHJcbmltcG9ydCBNb2RNYW5hZ2VyIGZyb20gXCIuLi9jb3JlL01vZE1hbmFnZXJcIjtcclxuaW1wb3J0IEhlbHBlcnMgZnJvbSBcIi4uL3V0aWxzL0hlbHBlcnNcIjtcclxuaW1wb3J0IHsgZ2V0TW9kc1RhYlRlbXBsYXRlIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvbW9kcy10YWIvbW9kc1RhYlwiO1xyXG5pbXBvcnQgeyBnZXRNb2RJdGVtVGVtcGxhdGUgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9tb2RzLWl0ZW0vbW9kc0l0ZW1cIjtcclxuaW1wb3J0IHsgZ2V0QWJvdXRDYXRlZ29yeVRlbXBsYXRlIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvYWJvdXQtY2F0ZWdvcnkvYWJvdXRDYXRlZ29yeVwiO1xyXG5pbXBvcnQgeyBnZXREZWZhdWx0VGhlbWVUZW1wbGF0ZSB9IGZyb20gXCIuLi9jb21wb25lbnRzL2RlZmF1bHQtdGhlbWUvZGVmYXVsdFRoZW1lXCI7XHJcbmltcG9ydCB7IGdldEJhY2tCdXR0b24gfSBmcm9tIFwiLi4vY29tcG9uZW50cy9iYWNrLWJ0bi9iYWNrQnRuXCI7XHJcbmltcG9ydCBsb2dnZXIgZnJvbSBcIi4uL3V0aWxzL2xvZ2dlclwiO1xyXG5pbXBvcnQgeyBqb2luIH0gZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0IHtcclxuICAgIFNUT1JBR0VfS0VZUyxcclxuICAgIFNFTEVDVE9SUyxcclxuICAgIENMQVNTRVMsXHJcbiAgICBGSUxFX0VYVEVOU0lPTlMsXHJcbiAgICBUSU1FT1VUUyxcclxufSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XHJcbmltcG9ydCBFeHRyYWN0TWV0YURhdGEgZnJvbSBcIi4uL3V0aWxzL0V4dHJhY3RNZXRhRGF0YVwiO1xyXG5pbXBvcnQgeyBOb2RlSlMgfSBmcm9tICdjYXBhY2l0b3Itbm9kZWpzJztcclxuaW1wb3J0IExvZ01hbmFnZXIgZnJvbSBcIi4uL2NvcmUvTG9nTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBGaWxlUGlja2VyIH0gZnJvbSAnQGNhcGF3ZXNvbWUvY2FwYWNpdG9yLWZpbGUtcGlja2VyJztcclxuXHJcbi8vIEluaXRpYWxpemUgcGxhdGZvcm0gZm9yIENhcGFjaXRvclxyXG5QbGF0Zm9ybU1hbmFnZXIuc2V0UGxhdGZvcm0obmV3IENhcGFjaXRvclBsYXRmb3JtKCkpO1xyXG5cclxuLy8gSG9vayBjb25zb2xlIGZvciBsb2dzIG1lbnVcclxuTG9nTWFuYWdlci5ob29rQ29uc29sZSgpO1xyXG5Mb2dNYW5hZ2VyLmFkZExvZygnSU5GTycsICdTdHJlbWlvIEVuaGFuY2VkOiBQcmVsb2FkIHNjcmlwdCBpbml0aWFsaXplZCcpO1xyXG5cclxuLy8gTGlzdGVuIGZvciBzZXJ2ZXIgbG9ncyBhbmQgZXJyb3JzXHJcbk5vZGVKUy5hZGRMaXN0ZW5lcignbG9nJywgKGRhdGEpID0+IHtcclxuICAgIExvZ01hbmFnZXIuYWRkTG9nKCdJTkZPJywgYFtTZXJ2ZXJdICR7ZGF0YS5hcmdzLmpvaW4oJyAnKX1gKTtcclxuICAgIGNvbnNvbGUubG9nKCdbU2VydmVyXScsIC4uLmRhdGEuYXJncyk7XHJcbn0pO1xyXG5cclxuTm9kZUpTLmFkZExpc3RlbmVyKCdlcnJvcicsIChkYXRhKSA9PiB7XHJcbiAgICBMb2dNYW5hZ2VyLmFkZExvZygnRVJST1InLCBgW1NlcnZlciBFcnJvcl0gJHtkYXRhLmFyZ3Muam9pbignICcpfWApO1xyXG4gICAgY29uc29sZS5lcnJvcignW1NlcnZlciBFcnJvcl0nLCAuLi5kYXRhLmFyZ3MpO1xyXG4gICAgSGVscGVycy5zaG93QWxlcnQoJ2Vycm9yJywgJ1NlcnZlciBFcnJvcicsIGRhdGEuYXJncy5qb2luKCcgJyksIFsnT0snXSk7XHJcbn0pO1xyXG5cclxuLy8gTW9jayBpcGNSZW5kZXJlciBmb3IgQW5kcm9pZFxyXG5jb25zdCBpcGNSZW5kZXJlciA9IHtcclxuICAgIGludm9rZTogYXN5bmMgKGNoYW5uZWw6IHN0cmluZywgLi4uYXJnczogYW55W10pID0+IHtcclxuICAgICAgICBsb2dnZXIuaW5mbyhgW0FuZHJvaWRdIEludm9rZSAke2NoYW5uZWx9YCwgYXJncyk7XHJcbiAgICAgICAgaWYgKGNoYW5uZWwgPT09ICdnZXQtdHJhbnNwYXJlbmN5LXN0YXR1cycpIHJldHVybiBmYWxzZTtcclxuICAgICAgICBpZiAoY2hhbm5lbCA9PT0gJ2V4dHJhY3QtZW1iZWRkZWQtc3VidGl0bGVzJykgcmV0dXJuIFtdO1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfSxcclxuICAgIHNlbmQ6IChjaGFubmVsOiBzdHJpbmcsIC4uLmFyZ3M6IGFueVtdKSA9PiB7XHJcbiAgICAgICAgbG9nZ2VyLmluZm8oYFtBbmRyb2lkXSBTZW5kICR7Y2hhbm5lbH1gLCBhcmdzKTtcclxuICAgIH0sXHJcbiAgICBvbjogKGNoYW5uZWw6IHN0cmluZywgbGlzdGVuZXI6IGFueSkgPT4ge1xyXG4gICAgICAgIC8vIE5vLW9wXHJcbiAgICB9XHJcbn07XHJcblxyXG5jb25zdCBTRVRUSU5HU19ST1VURSA9IFwiIy9zZXR0aW5nc1wiO1xyXG5jb25zdCBQTEFZRVJfUk9VVEUgPSBcIiMvcGxheWVyXCI7XHJcbmNvbnN0IFNUUkVBTUlOR19TRVJWRVJfUkVBRFlfVElNRU9VVF9NUyA9IDE1MDAwO1xyXG5jb25zdCBGVUxMU0NSRUVOX0NPTlRST0xfU0VMRUNUT1JTID0gW1xyXG4gICAgJ1t0aXRsZT1cIkZ1bGxzY3JlZW5cIl0nLFxyXG4gICAgJ1t0aXRsZT1cIkV4aXQgRnVsbHNjcmVlblwiXScsXHJcbiAgICAnYnV0dG9uW2FyaWEtbGFiZWw9XCJGdWxsc2NyZWVuXCJdJyxcclxuICAgICdidXR0b25bYXJpYS1sYWJlbD1cIkV4aXQgRnVsbHNjcmVlblwiXScsXHJcbiAgICAnW2NsYXNzKj1cImZ1bGxzY3JlZW4tdG9nZ2xlXCJdJyxcclxuICAgICdbY2xhc3MqPVwiaG9yaXpvbnRhbC1uYXYtYmFyLWNvbnRhaW5lci1cIl0gW2NsYXNzKj1cImJ1dHRvbnMtY29udGFpbmVyLVwiXSA+IDpub3QoW2NsYXNzKj1cIm1lbnUtYnV0dG9uLWNvbnRhaW5lclwiXSk6bm90KC5zdHJlbWlvLWVuaGFuY2VkLXBpcC1idXR0b24pJyxcclxuXTtcclxuXHJcbmxldCBmdWxsc2NyZWVuU3R5bGVJbmplY3RlZCA9IGZhbHNlO1xyXG5sZXQgZnVsbHNjcmVlbk9ic2VydmVyU3RhcnRlZCA9IGZhbHNlO1xyXG5sZXQgc2V0dGluZ3NPYnNlcnZlclN0YXJ0ZWQgPSBmYWxzZTtcclxubGV0IHNldHRpbmdzQ2hlY2tTY2hlZHVsZWQgPSBmYWxzZTtcclxubGV0IHBsYXllck9ic2VydmVyU3RhcnRlZCA9IGZhbHNlO1xyXG5sZXQgcGxheWVyRmVhdHVyZUNoZWNrU2NoZWR1bGVkID0gZmFsc2U7XHJcbmxldCBzdHJlYW1pbmdTZXJ2ZXJSZWFkeVByb21pc2U6IFByb21pc2U8dm9pZD4gfCBudWxsID0gbnVsbDtcclxubGV0IHN0cmVhbWluZ1NlcnZlclJlbG9hZFNjaGVkdWxlZCA9IGZhbHNlO1xyXG5cclxuY29uc3QgaW5pdCA9IGFzeW5jICgpID0+IHtcclxuICAgIExvZ01hbmFnZXIuYWRkTG9nKCdJTkZPJywgJ1N0cmVtaW8gRW5oYW5jZWQ6IEluaXRpYWxpemF0aW9uIHN0YXJ0ZWQnKTtcclxuICAgIC8vIEluaXRpYWxpemUgcGxhdGZvcm1cclxuICAgIGlmICghUGxhdGZvcm1NYW5hZ2VyLmN1cnJlbnQpIFBsYXRmb3JtTWFuYWdlci5zZXRQbGF0Zm9ybShuZXcgQ2FwYWNpdG9yUGxhdGZvcm0oKSk7XHJcbiAgICBhd2FpdCBQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC5pbml0KCk7XHJcbiAgICB2b2lkIGVuc3VyZUJ1bmRsZWRTdHJlYW1pbmdTZXJ2ZXJSZWFkeSgpO1xyXG5cclxuICAgIGluc3RhbGxGdWxsc2NyZWVuSGlkZXIoKTtcclxuICAgIG9ic2VydmVTZXR0aW5nc1VpKCk7XHJcbiAgICBvYnNlcnZlUGxheWVyVWkoKTtcclxuXHJcbiAgICAvLyBFeHBvc2UgQVBJIGZvciBpbmplY3RlZCBzY3JpcHRzXHJcbiAgICAod2luZG93IGFzIGFueSkuc3RyZW1pb0VuaGFuY2VkID0ge1xyXG4gICAgICAgIGFwcGx5VGhlbWU6IGFzeW5jICh0aGVtZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIGFwcGx5VXNlclRoZW1lIHJlYWRzIGZyb20gbG9jYWxTdG9yYWdlIHdoaWNoIGlzIHVwZGF0ZWQgYnkgdGhlIGluamVjdGVkIHNjcmlwdFxyXG4gICAgICAgICAgICBhd2FpdCBhcHBseVVzZXJUaGVtZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgaW5pdGlhbGl6ZVVzZXJTZXR0aW5ncygpO1xyXG5cclxuICAgIC8vIEFwcGx5IGVuYWJsZWQgdGhlbWVcclxuICAgIGF3YWl0IGFwcGx5VXNlclRoZW1lKCk7XHJcblxyXG4gICAgLy8gTG9hZCBlbmFibGVkIHBsdWdpbnNcclxuICAgIGF3YWl0IGxvYWRFbmFibGVkUGx1Z2lucygpO1xyXG5cclxuICAgIC8vIEhhbmRsZSBuYXZpZ2F0aW9uIGNoYW5nZXNcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiaGFzaGNoYW5nZVwiLCAoKSA9PiB7XHJcbiAgICAgICAgc2NoZWR1bGVTZXR0aW5nc0NoZWNrKCk7XHJcbiAgICAgICAgc2NoZWR1bGVQbGF5ZXJGZWF0dXJlU3luYygpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgKCkgPT4ge1xyXG4gICAgICAgIGhpZGVGdWxsc2NyZWVuQ29udHJvbHMoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEluaXRpYWwgY2hlY2tcclxuICAgIHNjaGVkdWxlU2V0dGluZ3NDaGVjaygpO1xyXG4gICAgc2NoZWR1bGVQbGF5ZXJGZWF0dXJlU3luYygpO1xyXG4gICAgaGlkZUZ1bGxzY3JlZW5Db250cm9scygpO1xyXG5cclxuICAgIC8vIEluamVjdCBzdWNjZXNzIHRvYXN0XHJcbiAgICBIZWxwZXJzLmNyZWF0ZVRvYXN0KCdlbmhhbmNlZC1sb2FkZWQnLCAnU3RyZW1pbyBFbmhhbmNlZCcsICdTdHJlbWlvIEVuaGFuY2VkIExvYWRlZCcsICdzdWNjZXNzJyk7XHJcbn07XHJcblxyXG5pZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2xvYWRpbmcnKSB7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgaW5pdCk7XHJcbn0gZWxzZSB7XHJcbiAgICBpbml0KCk7XHJcbn1cclxuXHJcbi8vIFNldHRpbmdzIHBhZ2Ugb3BlbmVkXG5sZXQgaXNDaGVja2luZ1NldHRpbmdzID0gZmFsc2U7XG5cbmZ1bmN0aW9uIGlzRW5oYW5jZWRTZXR0aW5nc1JlYWR5KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBCb29sZWFuKFxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVuaGFuY2VkXCIpICYmXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNlY3Rpb249XCJlbmhhbmNlZFwiXScpICYmXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoU0VMRUNUT1JTLlRIRU1FU19DQVRFR09SWSkgJiZcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihTRUxFQ1RPUlMuUExVR0lOU19DQVRFR09SWSkgJiZcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihTRUxFQ1RPUlMuQUJPVVRfQ0FURUdPUlkpXG4gICAgKTtcbn1cblxuZnVuY3Rpb24gYmluZEJ1dHRvbkNsaWNrKFxuICAgIGJ1dHRvbklkOiBzdHJpbmcsXG4gICAgaGFuZGxlcjogKCkgPT4gdm9pZCB8IFByb21pc2U8dm9pZD4sXG4gICAgZXJyb3JDb250ZXh0OiBzdHJpbmdcbik6IHZvaWQge1xuICAgIEhlbHBlcnMud2FpdEZvckVsbShgIyR7YnV0dG9uSWR9YCkudGhlbigoKSA9PiB7XG4gICAgICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGJ1dHRvbklkKTtcbiAgICAgICAgaWYgKCEoYnV0dG9uIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSByZXR1cm47XG4gICAgICAgIGlmIChidXR0b24uZGF0YXNldC5zdHJlbWlvRW5oYW5jZWRDbGlja0JvdW5kID09PSBcInRydWVcIikgcmV0dXJuO1xuXG4gICAgICAgIGJ1dHRvbi5kYXRhc2V0LnN0cmVtaW9FbmhhbmNlZENsaWNrQm91bmQgPSBcInRydWVcIjtcbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICB2b2lkIGhhbmRsZXIoKTtcbiAgICAgICAgfSk7XG4gICAgfSkuY2F0Y2goZXJyID0+IGxvZ2dlci5lcnJvcihgRmFpbGVkIHRvIHNldHVwICR7ZXJyb3JDb250ZXh0fTogJHtlcnJ9YCkpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBjaGVja1NldHRpbmdzKCkge1xuICAgIGlmICghbG9jYXRpb24uaHJlZi5pbmNsdWRlcyhTRVRUSU5HU19ST1VURSkpIHJldHVybjtcbiAgICBpZiAoaXNFbmhhbmNlZFNldHRpbmdzUmVhZHkoKSkgcmV0dXJuO1xuXHJcbiAgICBpZiAoaXNDaGVja2luZ1NldHRpbmdzKSByZXR1cm47XHJcbiAgICBpc0NoZWNraW5nU2V0dGluZ3MgPSB0cnVlO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgICAgYXdhaXQgZG9DaGVja1NldHRpbmdzKCk7XHJcbiAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgIGlzQ2hlY2tpbmdTZXR0aW5ncyA9IGZhbHNlO1xyXG4gICAgfVxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBkb0NoZWNrU2V0dGluZ3MoKSB7XHJcbiAgICBNb2RNYW5hZ2VyLmFkZEFwcGx5VGhlbWVGdW5jdGlvbigpO1xyXG5cclxuICAgIGNvbnN0IHRoZW1lc1BhdGggPSBwcm9wZXJ0aWVzLnRoZW1lc1BhdGg7XHJcbiAgICBjb25zdCBwbHVnaW5zUGF0aCA9IHByb3BlcnRpZXMucGx1Z2luc1BhdGg7XHJcblxyXG4gICAgbGV0IGFsbFRoZW1lczogc3RyaW5nW10gPSBbXTtcclxuICAgIGxldCBhbGxQbHVnaW5zOiBzdHJpbmdbXSA9IFtdO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgICAgYWxsVGhlbWVzID0gYXdhaXQgUGxhdGZvcm1NYW5hZ2VyLmN1cnJlbnQucmVhZGRpcih0aGVtZXNQYXRoKTtcclxuICAgICAgICBhbGxQbHVnaW5zID0gYXdhaXQgUGxhdGZvcm1NYW5hZ2VyLmN1cnJlbnQucmVhZGRpcihwbHVnaW5zUGF0aCk7XHJcbiAgICB9IGNhdGNoKGUpIHtcclxuICAgICAgICBsb2dnZXIuZXJyb3IoXCJGYWlsZWQgdG8gcmVhZCB0aGVtZXMvcGx1Z2lucyBkaXJlY3RvcmllczogXCIgKyBlKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB0aGVtZXNMaXN0ID0gYWxsVGhlbWVzLmZpbHRlcihmaWxlTmFtZSA9PiBmaWxlTmFtZS5lbmRzV2l0aChGSUxFX0VYVEVOU0lPTlMuVEhFTUUpKTtcclxuICAgIGNvbnN0IHBsdWdpbnNMaXN0ID0gYWxsUGx1Z2lucy5maWx0ZXIoZmlsZU5hbWUgPT4gZmlsZU5hbWUuZW5kc1dpdGgoRklMRV9FWFRFTlNJT05TLlBMVUdJTikpO1xyXG5cclxuICAgIGxvZ2dlci5pbmZvKFwiQWRkaW5nICdFbmhhbmNlZCcgc2VjdGlvbnMuLi5cIik7XHJcbiAgICBTZXR0aW5ncy5hZGRTZWN0aW9uKFwiZW5oYW5jZWRcIiwgXCJFbmhhbmNlZFwiKTtcclxuICAgIFNldHRpbmdzLmFkZENhdGVnb3J5KFwiVGhlbWVzXCIsIFwiZW5oYW5jZWRcIiwgZ2V0VGhlbWVJY29uKCkpO1xyXG4gICAgU2V0dGluZ3MuYWRkQ2F0ZWdvcnkoXCJQbHVnaW5zXCIsIFwiZW5oYW5jZWRcIiwgZ2V0UGx1Z2luSWNvbigpKTtcclxuICAgIFNldHRpbmdzLmFkZENhdGVnb3J5KFwiQWJvdXRcIiwgXCJlbmhhbmNlZFwiLCBnZXRBYm91dEljb24oKSk7XHJcblxyXG4gICAgU2V0dGluZ3MuYWRkQnV0dG9uKFwiSW1wb3J0IFRoZW1lXCIsIFwiaW1wb3J0VGhlbWVCdG5cIiwgU0VMRUNUT1JTLlRIRU1FU19DQVRFR09SWSk7XHJcbiAgICBTZXR0aW5ncy5hZGRCdXR0b24oXCJNYW5hZ2UgVGhlbWVzIEZvbGRlclwiLCBcIm9wZW50aGVtZXNmb2xkZXJCdG5cIiwgU0VMRUNUT1JTLlRIRU1FU19DQVRFR09SWSk7XHJcbiAgICBTZXR0aW5ncy5hZGRCdXR0b24oXCJJbXBvcnQgUGx1Z2luXCIsIFwiaW1wb3J0UGx1Z2luQnRuXCIsIFNFTEVDVE9SUy5QTFVHSU5TX0NBVEVHT1JZKTtcclxuICAgIFNldHRpbmdzLmFkZEJ1dHRvbihcIk1hbmFnZSBQbHVnaW5zIEZvbGRlclwiLCBcIm9wZW5wbHVnaW5zZm9sZGVyQnRuXCIsIFNFTEVDVE9SUy5QTFVHSU5TX0NBVEVHT1JZKTtcclxuXHJcbiAgICBzZXR1cEltcG9ydEJ1dHRvbihcImltcG9ydFRoZW1lQnRuXCIsIFwidGhlbWVcIik7XHJcbiAgICBzZXR1cEltcG9ydEJ1dHRvbihcImltcG9ydFBsdWdpbkJ0blwiLCBcInBsdWdpblwiKTtcclxuICAgIHNldHVwTWFuYWdlZEZvbGRlckJ1dHRvbihcIm9wZW50aGVtZXNmb2xkZXJCdG5cIiwgcHJvcGVydGllcy50aGVtZXNQYXRoKTtcclxuICAgIHNldHVwTWFuYWdlZEZvbGRlckJ1dHRvbihcIm9wZW5wbHVnaW5zZm9sZGVyQnRuXCIsIHByb3BlcnRpZXMucGx1Z2luc1BhdGgpO1xyXG5cclxuICAgIHdyaXRlQWJvdXQoKTtcclxuXHJcbiAgICAvLyBCcm93c2UgcGx1Z2lucy90aGVtZXMgZnJvbSBzdHJlbWlvLWVuaGFuY2VkLXJlZ2lzdHJ5XHJcbiAgICBzZXR1cEJyb3dzZU1vZHNCdXR0b24oKTtcclxuXHJcbiAgICAvLyBBZGQgdGhlbWVzIHRvIHNldHRpbmdzXG4gICAgSGVscGVycy53YWl0Rm9yRWxtKFNFTEVDVE9SUy5USEVNRVNfQ0FURUdPUlkpLnRoZW4oYXN5bmMgKCkgPT4ge1xuICAgICAgICAvLyBEZWZhdWx0IHRoZW1lXG4gICAgICAgIGlmICghZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdHJlbWlvLWVuaGFuY2VkLWRlZmF1bHQtdGhlbWVcIikpIHtcbiAgICAgICAgICAgIGNvbnN0IGlzQ3VycmVudFRoZW1lRGVmYXVsdCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFNUT1JBR0VfS0VZUy5DVVJSRU5UX1RIRU1FKSA9PT0gXCJEZWZhdWx0XCI7XG4gICAgICAgICAgICBjb25zdCBkZWZhdWx0VGhlbWVDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgZGVmYXVsdFRoZW1lQ29udGFpbmVyLmlkID0gXCJzdHJlbWlvLWVuaGFuY2VkLWRlZmF1bHQtdGhlbWVcIjtcbiAgICAgICAgICAgIGRlZmF1bHRUaGVtZUNvbnRhaW5lci5pbm5lckhUTUwgPSBnZXREZWZhdWx0VGhlbWVUZW1wbGF0ZShpc0N1cnJlbnRUaGVtZURlZmF1bHQpO1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihTRUxFQ1RPUlMuVEhFTUVTX0NBVEVHT1JZKT8uYXBwZW5kQ2hpbGQoZGVmYXVsdFRoZW1lQ29udGFpbmVyKTtcbiAgICAgICAgfVxuXHJcbiAgICAgICAgLy8gQWRkIGluc3RhbGxlZCB0aGVtZXNcclxuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbCh0aGVtZXNMaXN0Lm1hcChhc3luYyAodGhlbWUpID0+IHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRoZW1lUGF0aCA9IGpvaW4odGhlbWVzUGF0aCwgdGhlbWUpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY29udGVudCA9IGF3YWl0IFBsYXRmb3JtTWFuYWdlci5jdXJyZW50LnJlYWRGaWxlKHRoZW1lUGF0aCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtZXRhRGF0YSA9IEV4dHJhY3RNZXRhRGF0YS5leHRyYWN0TWV0YWRhdGFGcm9tVGV4dChjb250ZW50KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobWV0YURhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobWV0YURhdGEubmFtZS50b0xvd2VyQ2FzZSgpICE9PSBcImRlZmF1bHRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBTZXR0aW5ncy5hZGRJdGVtKFwidGhlbWVcIiwgdGhlbWUsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IG1ldGFEYXRhLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogbWV0YURhdGEuZGVzY3JpcHRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRob3I6IG1ldGFEYXRhLmF1dGhvcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZlcnNpb246IG1ldGFEYXRhLnZlcnNpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVVcmw6IG1ldGFEYXRhLnVwZGF0ZVVybCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZTogbWV0YURhdGEuc291cmNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgbG9nZ2VyLmVycm9yKGBGYWlsZWQgdG8gbG9hZCB0aGVtZSBtZXRhZGF0YSBmb3IgJHt0aGVtZX06ICR7ZX1gKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pKTtcclxuICAgIH0pLmNhdGNoKGVyciA9PiBsb2dnZXIuZXJyb3IoXCJGYWlsZWQgdG8gc2V0dXAgdGhlbWVzOiBcIiArIGVycikpO1xyXG5cclxuICAgIC8vIEFkZCBwbHVnaW5zIHRvIHNldHRpbmdzXHJcbiAgICBmb3IgKGNvbnN0IHBsdWdpbiBvZiBwbHVnaW5zTGlzdCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBsdWdpblBhdGggPSBqb2luKHBsdWdpbnNQYXRoLCBwbHVnaW4pO1xyXG4gICAgICAgICAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgUGxhdGZvcm1NYW5hZ2VyLmN1cnJlbnQucmVhZEZpbGUocGx1Z2luUGF0aCk7XHJcbiAgICAgICAgICAgIGNvbnN0IG1ldGFEYXRhID0gRXh0cmFjdE1ldGFEYXRhLmV4dHJhY3RNZXRhZGF0YUZyb21UZXh0KGNvbnRlbnQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKG1ldGFEYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBTZXR0aW5ncy5hZGRJdGVtKFwicGx1Z2luXCIsIHBsdWdpbiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IG1ldGFEYXRhLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IG1ldGFEYXRhLmRlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgIGF1dGhvcjogbWV0YURhdGEuYXV0aG9yLFxyXG4gICAgICAgICAgICAgICAgICAgIHZlcnNpb246IG1ldGFEYXRhLnZlcnNpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlVXJsOiBtZXRhRGF0YS51cGRhdGVVcmwsXHJcbiAgICAgICAgICAgICAgICAgICAgc291cmNlOiBtZXRhRGF0YS5zb3VyY2VcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBsb2dnZXIuZXJyb3IoYEZhaWxlZCB0byBsb2FkIHBsdWdpbiBtZXRhZGF0YSBmb3IgJHtwbHVnaW59OiAke2V9YCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIE1vZE1hbmFnZXIudG9nZ2xlUGx1Z2luTGlzdGVuZXIoKTtcclxuICAgIE1vZE1hbmFnZXIuc2Nyb2xsTGlzdGVuZXIoKTtcclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gZW5zdXJlQnVuZGxlZFN0cmVhbWluZ1NlcnZlclJlYWR5KCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgaWYgKHN0cmVhbWluZ1NlcnZlclJlYWR5UHJvbWlzZSkge1xyXG4gICAgICAgIGF3YWl0IHN0cmVhbWluZ1NlcnZlclJlYWR5UHJvbWlzZTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgc3RyZWFtaW5nU2VydmVyUmVhZHlQcm9taXNlID0gKGFzeW5jICgpID0+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBhd2FpdCBQcm9taXNlLnJhY2UoW1xyXG4gICAgICAgICAgICAgICAgTm9kZUpTLndoZW5SZWFkeSgpLFxyXG4gICAgICAgICAgICAgICAgbmV3IFByb21pc2U8bmV2ZXI+KChfLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoXCJUaW1lZCBvdXQgd2FpdGluZyBmb3IgdGhlIGJ1bmRsZWQgc3RyZWFtaW5nIHNlcnZlci5cIikpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIFNUUkVBTUlOR19TRVJWRVJfUkVBRFlfVElNRU9VVF9NUyk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBdKTtcclxuXHJcbiAgICAgICAgICAgIExvZ01hbmFnZXIuYWRkTG9nKFwiSU5GT1wiLCBcIkJ1bmRsZWQgc3RyZWFtaW5nIHNlcnZlciBpcyByZWFkeVwiKTtcclxuICAgICAgICAgICAgc2NoZWR1bGVTdHJlYW1pbmdTZXJ2ZXJSZWxvYWQoKTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpO1xyXG4gICAgICAgICAgICBMb2dNYW5hZ2VyLmFkZExvZyhcIkVSUk9SXCIsIGBCdW5kbGVkIHN0cmVhbWluZyBzZXJ2ZXIgZmFpbGVkIHRvIGJlY29tZSByZWFkeTogJHttZXNzYWdlfWApO1xyXG4gICAgICAgICAgICBsb2dnZXIuZXJyb3IoYEJ1bmRsZWQgc3RyZWFtaW5nIHNlcnZlciBmYWlsZWQgdG8gYmVjb21lIHJlYWR5OiAke21lc3NhZ2V9YCk7XHJcbiAgICAgICAgICAgIHN0cmVhbWluZ1NlcnZlclJlYWR5UHJvbWlzZSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfSkoKTtcclxuXHJcbiAgICBhd2FpdCBzdHJlYW1pbmdTZXJ2ZXJSZWFkeVByb21pc2U7XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIHJlbG9hZFN0cmVhbWluZ1NlcnZlcihyZXRyeUNvdW50ID0gMCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBhd2FpdCBIZWxwZXJzLl9ldmFsKGBjb3JlLnRyYW5zcG9ydC5kaXNwYXRjaCh7IGFjdGlvbjogJ1N0cmVhbWluZ1NlcnZlcicsIGFyZ3M6IHsgYWN0aW9uOiAnUmVsb2FkJyB9IH0pO2ApO1xyXG4gICAgICAgIGxvZ2dlci5pbmZvKFwiU3RyZW1pbyBzdHJlYW1pbmcgc2VydmVyIHJlbG9hZGVkLlwiKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKTtcclxuICAgICAgICBpZiAocmV0cnlDb3VudCA8IDMpIHtcclxuICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdm9pZCByZWxvYWRTdHJlYW1pbmdTZXJ2ZXIocmV0cnlDb3VudCArIDEpO1xyXG4gICAgICAgICAgICB9LCBUSU1FT1VUUy5DT1JFU1RBVEVfUkVUUllfSU5URVJWQUwpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsb2dnZXIuZXJyb3IoYEZhaWxlZCB0byByZWxvYWQgYnVuZGxlZCBzdHJlYW1pbmcgc2VydmVyOiAke21lc3NhZ2V9YCk7XHJcbiAgICAgICAgTG9nTWFuYWdlci5hZGRMb2coXCJFUlJPUlwiLCBgRmFpbGVkIHRvIHJlbG9hZCBidW5kbGVkIHN0cmVhbWluZyBzZXJ2ZXI6ICR7bWVzc2FnZX1gKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc2NoZWR1bGVTdHJlYW1pbmdTZXJ2ZXJSZWxvYWQoKTogdm9pZCB7XHJcbiAgICBpZiAoc3RyZWFtaW5nU2VydmVyUmVsb2FkU2NoZWR1bGVkKSByZXR1cm47XHJcbiAgICBzdHJlYW1pbmdTZXJ2ZXJSZWxvYWRTY2hlZHVsZWQgPSB0cnVlO1xyXG5cclxuICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBzdHJlYW1pbmdTZXJ2ZXJSZWxvYWRTY2hlZHVsZWQgPSBmYWxzZTtcclxuICAgICAgICB2b2lkIHJlbG9hZFN0cmVhbWluZ1NlcnZlcigpO1xyXG4gICAgfSwgVElNRU9VVFMuU0VSVkVSX1JFTE9BRF9ERUxBWSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNjaGVkdWxlU2V0dGluZ3NDaGVjaygpOiB2b2lkIHtcclxuICAgIGlmIChzZXR0aW5nc0NoZWNrU2NoZWR1bGVkKSByZXR1cm47XHJcbiAgICBzZXR0aW5nc0NoZWNrU2NoZWR1bGVkID0gdHJ1ZTtcclxuXHJcbiAgICB3aW5kb3cuc2V0VGltZW91dChhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgc2V0dGluZ3NDaGVja1NjaGVkdWxlZCA9IGZhbHNlO1xyXG4gICAgICAgIGF3YWl0IGNoZWNrU2V0dGluZ3MoKTtcclxuICAgIH0sIDEwMCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG9ic2VydmVTZXR0aW5nc1VpKCk6IHZvaWQge1xyXG4gICAgaWYgKHNldHRpbmdzT2JzZXJ2ZXJTdGFydGVkKSByZXR1cm47XHJcbiAgICBzZXR0aW5nc09ic2VydmVyU3RhcnRlZCA9IHRydWU7XHJcblxyXG4gICAgY29uc3Qgc3RhcnRPYnNlcnZlciA9ICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XG4gICAgICAgICAgICBpZiAobG9jYXRpb24uaHJlZi5pbmNsdWRlcyhTRVRUSU5HU19ST1VURSkgJiYgIWlzQ2hlY2tpbmdTZXR0aW5ncyAmJiAhaXNFbmhhbmNlZFNldHRpbmdzUmVhZHkoKSkge1xuICAgICAgICAgICAgICAgIHNjaGVkdWxlU2V0dGluZ3NDaGVjaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxyXG4gICAgICAgIG9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQuYm9keSwge1xyXG4gICAgICAgICAgICBjaGlsZExpc3Q6IHRydWUsXHJcbiAgICAgICAgICAgIHN1YnRyZWU6IHRydWUsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGlmIChkb2N1bWVudC5ib2R5KSB7XHJcbiAgICAgICAgc3RhcnRPYnNlcnZlcigpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBib2R5T2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoXywgb2JzKSA9PiB7XHJcbiAgICAgICAgaWYgKCFkb2N1bWVudC5ib2R5KSByZXR1cm47XHJcbiAgICAgICAgb2JzLmRpc2Nvbm5lY3QoKTtcclxuICAgICAgICBzdGFydE9ic2VydmVyKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBib2R5T2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsIHtcclxuICAgICAgICBjaGlsZExpc3Q6IHRydWUsXHJcbiAgICAgICAgc3VidHJlZTogdHJ1ZSxcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzY2hlZHVsZVBsYXllckZlYXR1cmVTeW5jKCk6IHZvaWQge1xyXG4gICAgaWYgKHBsYXllckZlYXR1cmVDaGVja1NjaGVkdWxlZCkgcmV0dXJuO1xyXG4gICAgcGxheWVyRmVhdHVyZUNoZWNrU2NoZWR1bGVkID0gdHJ1ZTtcclxuXHJcbiAgICB3aW5kb3cuc2V0VGltZW91dChhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgcGxheWVyRmVhdHVyZUNoZWNrU2NoZWR1bGVkID0gZmFsc2U7XHJcbiAgICAgICAgYXdhaXQgc3luY1BsYXllckZlYXR1cmVzKCk7XHJcbiAgICB9LCAxMDApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBvYnNlcnZlUGxheWVyVWkoKTogdm9pZCB7XHJcbiAgICBpZiAocGxheWVyT2JzZXJ2ZXJTdGFydGVkKSByZXR1cm47XHJcbiAgICBwbGF5ZXJPYnNlcnZlclN0YXJ0ZWQgPSB0cnVlO1xyXG5cclxuICAgIGNvbnN0IHN0YXJ0T2JzZXJ2ZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChsb2NhdGlvbi5ocmVmLmluY2x1ZGVzKFBMQVlFUl9ST1VURSkpIHtcclxuICAgICAgICAgICAgICAgIHNjaGVkdWxlUGxheWVyRmVhdHVyZVN5bmMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBvYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmJvZHksIHtcclxuICAgICAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxyXG4gICAgICAgICAgICBzdWJ0cmVlOiB0cnVlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBpZiAoZG9jdW1lbnQuYm9keSkge1xyXG4gICAgICAgIHN0YXJ0T2JzZXJ2ZXIoKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYm9keU9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKF8sIG9icykgPT4ge1xyXG4gICAgICAgIGlmICghZG9jdW1lbnQuYm9keSkgcmV0dXJuO1xyXG4gICAgICAgIG9icy5kaXNjb25uZWN0KCk7XHJcbiAgICAgICAgc3RhcnRPYnNlcnZlcigpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgYm9keU9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCB7XHJcbiAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxyXG4gICAgICAgIHN1YnRyZWU6IHRydWUsXHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gaW5zdGFsbEZ1bGxzY3JlZW5IaWRlcigpOiB2b2lkIHtcclxuICAgIGlmICghZnVsbHNjcmVlblN0eWxlSW5qZWN0ZWQpIHtcclxuICAgICAgICBjb25zdCBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcclxuICAgICAgICBzdHlsZS5pZCA9IFwic3RyZW1pby1lbmhhbmNlZC1mdWxsc2NyZWVuLXN0eWxlXCI7XHJcbiAgICAgICAgc3R5bGUudGV4dENvbnRlbnQgPSBgXHJcbiAgICAgICAgICAgICR7RlVMTFNDUkVFTl9DT05UUk9MX1NFTEVDVE9SUy5qb2luKFwiLFxcbiAgICAgICAgICAgIFwiKX0ge1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xyXG4gICAgICAgICAgICAgICAgdmlzaWJpbGl0eTogaGlkZGVuICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgICAgICAgICBwb2ludGVyLWV2ZW50czogbm9uZSAhaW1wb3J0YW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgYDtcclxuXHJcbiAgICAgICAgY29uc3QgYXBwZW5kU3R5bGUgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzdHlsZS5pZCkpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XHJcbiAgICAgICAgICAgIGZ1bGxzY3JlZW5TdHlsZUluamVjdGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYgKCFhcHBlbmRTdHlsZSgpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKF8sIG9icykgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFhcHBlbmRTdHlsZSgpKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICBvYnMuZGlzY29ubmVjdCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsIHsgY2hpbGRMaXN0OiB0cnVlLCBzdWJ0cmVlOiB0cnVlIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBoaWRlRnVsbHNjcmVlbkNvbnRyb2xzKCk7XHJcblxyXG4gICAgaWYgKGZ1bGxzY3JlZW5PYnNlcnZlclN0YXJ0ZWQpIHJldHVybjtcclxuICAgIGZ1bGxzY3JlZW5PYnNlcnZlclN0YXJ0ZWQgPSB0cnVlO1xyXG5cclxuICAgIGNvbnN0IHN0YXJ0T2JzZXJ2ZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XHJcbiAgICAgICAgICAgIGhpZGVGdWxsc2NyZWVuQ29udHJvbHMoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5ib2R5LCB7XHJcbiAgICAgICAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcclxuICAgICAgICAgICAgc3VidHJlZTogdHJ1ZSxcclxuICAgICAgICAgICAgYXR0cmlidXRlczogdHJ1ZSxcclxuICAgICAgICAgICAgYXR0cmlidXRlRmlsdGVyOiBbXCJjbGFzc1wiLCBcInRpdGxlXCIsIFwiYXJpYS1sYWJlbFwiXSxcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgaWYgKGRvY3VtZW50LmJvZHkpIHtcclxuICAgICAgICBzdGFydE9ic2VydmVyKCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGJvZHlPYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKChfLCBvYnMpID0+IHtcclxuICAgICAgICBpZiAoIWRvY3VtZW50LmJvZHkpIHJldHVybjtcclxuICAgICAgICBvYnMuZGlzY29ubmVjdCgpO1xyXG4gICAgICAgIHN0YXJ0T2JzZXJ2ZXIoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGJvZHlPYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwge1xyXG4gICAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcclxuICAgICAgICBzdWJ0cmVlOiB0cnVlLFxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhpZGVGdWxsc2NyZWVuQ29udHJvbHMoKTogdm9pZCB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsPEhUTUxFbGVtZW50PihGVUxMU0NSRUVOX0NPTlRST0xfU0VMRUNUT1JTLmpvaW4oXCIsXCIpKS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XHJcbiAgICAgICAgaWYgKGVsZW1lbnQuY2xvc2VzdCgnW2NsYXNzKj1cIm1lbnUtYnV0dG9uLWNvbnRhaW5lclwiXScpIHx8IGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwic3RyZW1pby1lbmhhbmNlZC1waXAtYnV0dG9uXCIpKSByZXR1cm47XHJcbiAgICAgICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgZWxlbWVudC5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcclxuICAgICAgICBlbGVtZW50LnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcIm5vbmVcIjtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0aWFsaXplVXNlclNldHRpbmdzKCk6IHZvaWQge1xyXG4gICAgY29uc3QgZGVmYXVsdHM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XHJcbiAgICAgICAgW1NUT1JBR0VfS0VZUy5FTkFCTEVEX1BMVUdJTlNdOiBcIltdXCIsXHJcbiAgICAgICAgW1NUT1JBR0VfS0VZUy5DSEVDS19VUERBVEVTX09OX1NUQVJUVVBdOiBcImZhbHNlXCIsXHJcbiAgICAgICAgW1NUT1JBR0VfS0VZUy5ESVNDT1JEX1JQQ106IFwiZmFsc2VcIixcclxuICAgIH07XHJcblxyXG4gICAgZm9yIChjb25zdCBba2V5LCBkZWZhdWx0VmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKGRlZmF1bHRzKSkge1xyXG4gICAgICAgIGlmICghbG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KSkge1xyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIGRlZmF1bHRWYWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBhcHBseVVzZXJUaGVtZSgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGNvbnN0IGN1cnJlbnRUaGVtZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFNUT1JBR0VfS0VZUy5DVVJSRU5UX1RIRU1FKTtcclxuXHJcbiAgICBpZiAoIWN1cnJlbnRUaGVtZSB8fCBjdXJyZW50VGhlbWUgPT09IFwiRGVmYXVsdFwiKSB7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oU1RPUkFHRV9LRVlTLkNVUlJFTlRfVEhFTUUsIFwiRGVmYXVsdFwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdGhlbWVQYXRoID0gam9pbihwcm9wZXJ0aWVzLnRoZW1lc1BhdGgsIGN1cnJlbnRUaGVtZSk7XHJcblxyXG4gICAgLy8gSW4gY2FwYWNpdG9yLCB3ZSBuZWVkIHRvIHJlYWQgdGhlIGZpbGUgY29udGVudCBhbmQgaW5qZWN0IGl0IGFzIHN0eWxlXHJcbiAgICAvLyBiZWNhdXNlIGZpbGU6Ly8gVVJMcyBtaWdodCBub3Qgd29yayBvciBhcmUgcmVzdHJpY3RlZC5cclxuICAgIC8vIEVsZWN0cm9uIGltcGxlbWVudGF0aW9uIHVzZXMgcGF0aFRvRmlsZVVSTCB3aGljaCByZXN1bHRzIGluIGZpbGU6Ly8uXHJcbiAgICAvLyBMZXQncyB0cnkgdG8gcmVhZCBjb250ZW50IGFuZCBpbmplY3QgPHN0eWxlPiBpbnN0ZWFkIG9mIDxsaW5rPi5cclxuXHJcbiAgICB0cnkge1xyXG4gICAgICAgIGlmICghYXdhaXQgUGxhdGZvcm1NYW5hZ2VyLmN1cnJlbnQuZXhpc3RzKHRoZW1lUGF0aCkpIHtcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oU1RPUkFHRV9LRVlTLkNVUlJFTlRfVEhFTUUsIFwiRGVmYXVsdFwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmVtb3ZlIGV4aXN0aW5nIHRoZW1lIGlmIHByZXNlbnRcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFjdGl2ZVRoZW1lXCIpPy5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgY29uc3QgY29udGVudCA9IGF3YWl0IFBsYXRmb3JtTWFuYWdlci5jdXJyZW50LnJlYWRGaWxlKHRoZW1lUGF0aCk7XHJcblxyXG4gICAgICAgIGNvbnN0IHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XHJcbiAgICAgICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcImlkXCIsIFwiYWN0aXZlVGhlbWVcIik7XHJcbiAgICAgICAgc3R5bGVFbGVtZW50LnRleHRDb250ZW50ID0gY29udGVudDtcclxuICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlRWxlbWVudCk7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgbG9nZ2VyLmVycm9yKFwiRmFpbGVkIHRvIGFwcGx5IHRoZW1lOiBcIiArIGUpO1xyXG4gICAgfVxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBsb2FkRW5hYmxlZFBsdWdpbnMoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBjb25zdCBwbHVnaW5zUGF0aCA9IHByb3BlcnRpZXMucGx1Z2luc1BhdGg7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGlmICghYXdhaXQgUGxhdGZvcm1NYW5hZ2VyLmN1cnJlbnQuZXhpc3RzKHBsdWdpbnNQYXRoKSkgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCBhbGxQbHVnaW5zID0gYXdhaXQgUGxhdGZvcm1NYW5hZ2VyLmN1cnJlbnQucmVhZGRpcihwbHVnaW5zUGF0aCk7XHJcbiAgICAgICAgY29uc3QgcGx1Z2luc1RvTG9hZCA9IGFsbFBsdWdpbnMuZmlsdGVyKGZpbGVOYW1lID0+IGZpbGVOYW1lLmVuZHNXaXRoKEZJTEVfRVhURU5TSU9OUy5QTFVHSU4pKTtcclxuXHJcbiAgICAgICAgY29uc3QgZW5hYmxlZFBsdWdpbnM6IHN0cmluZ1tdID0gSlNPTi5wYXJzZShcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLmdldEl0ZW0oU1RPUkFHRV9LRVlTLkVOQUJMRURfUExVR0lOUykgfHwgXCJbXVwiXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgZm9yIChjb25zdCBwbHVnaW4gb2YgcGx1Z2luc1RvTG9hZCkge1xyXG4gICAgICAgICAgICBpZiAoZW5hYmxlZFBsdWdpbnMuaW5jbHVkZXMocGx1Z2luKSkge1xyXG4gICAgICAgICAgICAgICAgYXdhaXQgTW9kTWFuYWdlci5sb2FkUGx1Z2luKHBsdWdpbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgbG9nZ2VyLmVycm9yKFwiRmFpbGVkIHRvIGxvYWQgcGx1Z2luczogXCIgKyBlKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc2V0dXBJbXBvcnRCdXR0b24oYnV0dG9uSWQ6IHN0cmluZywgdHlwZTogXCJ0aGVtZVwiIHwgXCJwbHVnaW5cIik6IHZvaWQge1xuICAgIGJpbmRCdXR0b25DbGljayhidXR0b25JZCwgKCkgPT4gaW1wb3J0TW9kRmlsZSh0eXBlKSwgYCR7dHlwZX0gaW1wb3J0IGJ1dHRvbmApO1xufVxuXG5mdW5jdGlvbiBzZXR1cE1hbmFnZWRGb2xkZXJCdXR0b24oYnV0dG9uSWQ6IHN0cmluZywgZm9sZGVyUGF0aDogc3RyaW5nKTogdm9pZCB7XG4gICAgYmluZEJ1dHRvbkNsaWNrKGJ1dHRvbklkLCAoKSA9PiBQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC5vcGVuUGF0aChmb2xkZXJQYXRoKSwgYGZvbGRlciBidXR0b24gJHtidXR0b25JZH1gKTtcbn1cblxyXG5sZXQgaXNJbXBvcnRpbmcgPSBmYWxzZTtcclxuYXN5bmMgZnVuY3Rpb24gaW1wb3J0TW9kRmlsZSh0eXBlOiBcInRoZW1lXCIgfCBcInBsdWdpblwiKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKGlzSW1wb3J0aW5nKSByZXR1cm47XG4gICAgaXNJbXBvcnRpbmcgPSB0cnVlO1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IEZpbGVQaWNrZXIucGlja0ZpbGVzKHsgbGltaXQ6IDEgfSk7XG4gICAgICAgIGNvbnN0IGZpbGUgPSByZXN1bHQuZmlsZXNbMF07XG4gICAgICAgIGNvbnN0IGZpbGVQYXRoID0gKGZpbGUgYXMgeyBwYXRoPzogc3RyaW5nOyB1cmk/OiBzdHJpbmcgfSB8IHVuZGVmaW5lZCk/LnBhdGhcbiAgICAgICAgICAgID8/IChmaWxlIGFzIHsgcGF0aD86IHN0cmluZzsgdXJpPzogc3RyaW5nIH0gfCB1bmRlZmluZWQpPy51cmk7XG5cbiAgICAgICAgaWYgKCFmaWxlPy5uYW1lIHx8ICFmaWxlUGF0aCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cclxuICAgICAgICBjb25zdCBleHBlY3RlZEV4dGVuc2lvbiA9IHR5cGUgPT09IFwidGhlbWVcIiA/IEZJTEVfRVhURU5TSU9OUy5USEVNRSA6IEZJTEVfRVhURU5TSU9OUy5QTFVHSU47XHJcbiAgICAgICAgaWYgKCFmaWxlLm5hbWUuZW5kc1dpdGgoZXhwZWN0ZWRFeHRlbnNpb24pKSB7XHJcbiAgICAgICAgICAgIGF3YWl0IEhlbHBlcnMuc2hvd0FsZXJ0KFxyXG4gICAgICAgICAgICAgICAgXCJ3YXJuaW5nXCIsXHJcbiAgICAgICAgICAgICAgICBcIlVuc3VwcG9ydGVkIEZpbGVcIixcclxuICAgICAgICAgICAgICAgIGBQbGVhc2UgY2hvb3NlIGEgJHtleHBlY3RlZEV4dGVuc2lvbn0gZmlsZS5gLFxyXG4gICAgICAgICAgICAgICAgW1wiT0tcIl1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgY29udGVudCA9IGF3YWl0IFBsYXRmb3JtTWFuYWdlci5jdXJyZW50LnJlYWRGaWxlKGZpbGVQYXRoKTtcbiAgICAgICAgY29uc3QgZGVzdGluYXRpb25EaXJlY3RvcnkgPSB0eXBlID09PSBcInRoZW1lXCIgPyBwcm9wZXJ0aWVzLnRoZW1lc1BhdGggOiBwcm9wZXJ0aWVzLnBsdWdpbnNQYXRoO1xuICAgICAgICBhd2FpdCBQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC53cml0ZUZpbGUoam9pbihkZXN0aW5hdGlvbkRpcmVjdG9yeSwgZmlsZS5uYW1lKSwgY29udGVudCk7XG5cclxuICAgICAgICAvLyBVc2UgYSB0aW1lb3V0IHRvIGF2b2lkIGxvY2F0aW9uLnJlbG9hZCgpIHRyaWdnZXJpbmcgbG9vcCBpc3N1ZXMgd2l0aCBDYXBhY2l0b3IgQWN0aXZpdHkgUmVzdWx0c1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gbG9jYXRpb24ucmVsb2FkKCksIDEwMCk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IGVyciBpbnN0YW5jZW9mIEVycm9yID8gZXJyLm1lc3NhZ2UgOiBTdHJpbmcoZXJyKTtcbiAgICAgICAgaWYgKC9jYW5jZWx8Y2FuY2VsZWR8Y2FuY2VsbGVkfG5vIGZpbGVzIHNlbGVjdGVkL2kudGVzdChtZXNzYWdlKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbG9nZ2VyLmVycm9yKGBGYWlsZWQgdG8gaW1wb3J0ICR7dHlwZX06ICR7bWVzc2FnZX1gKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgICAvLyBzbGlnaHQgZGVsYXkgYmVmb3JlIHVubG9ja2luZyB0byBhdm9pZCBkb3VibGUgY2xpY2sgZXZlbnRzIGFmdGVyIGZvY3VzIHJldHVybnNcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHsgaXNJbXBvcnRpbmcgPSBmYWxzZTsgfSwgNTAwKTtcclxuICAgIH1cclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gc3luY1BsYXllckZlYXR1cmVzKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgaWYgKCFQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC5pc1BpY3R1cmVJblBpY3R1cmVTdXBwb3J0ZWQoKSkge1xyXG4gICAgICAgIHJlbW92ZVBpY3R1cmVJblBpY3R1cmVCdXR0b24oKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFsb2NhdGlvbi5ocmVmLmluY2x1ZGVzKFBMQVlFUl9ST1VURSkpIHtcclxuICAgICAgICByZW1vdmVQaWN0dXJlSW5QaWN0dXJlQnV0dG9uKCk7XHJcbiAgICAgICAgYXdhaXQgUGxhdGZvcm1NYW5hZ2VyLmN1cnJlbnQuc2V0UGljdHVyZUluUGljdHVyZVN0YXRlKGZhbHNlKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdmlkZW8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwidmlkZW9cIikgYXMgSFRNTFZpZGVvRWxlbWVudCB8IG51bGw7XHJcbiAgICBpZiAoIXZpZGVvKSB7XHJcbiAgICAgICAgcmVtb3ZlUGljdHVyZUluUGljdHVyZUJ1dHRvbigpO1xyXG4gICAgICAgIGF3YWl0IFBsYXRmb3JtTWFuYWdlci5jdXJyZW50LnNldFBpY3R1cmVJblBpY3R1cmVTdGF0ZShmYWxzZSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGJpbmRQbGF5ZXJQaWN0dXJlSW5QaWN0dXJlKHZpZGVvKTtcclxuICAgIGluamVjdFBpY3R1cmVJblBpY3R1cmVCdXR0b24oKTtcclxuICAgIGF3YWl0IHVwZGF0ZVBpY3R1cmVJblBpY3R1cmVTdGF0ZSh2aWRlbyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGJpbmRQbGF5ZXJQaWN0dXJlSW5QaWN0dXJlKHZpZGVvOiBIVE1MVmlkZW9FbGVtZW50KTogdm9pZCB7XHJcbiAgICBpZiAodmlkZW8uZGF0YXNldC5zdHJlbWlvRW5oYW5jZWRQaXBCb3VuZCA9PT0gXCJ0cnVlXCIpIHJldHVybjtcclxuICAgIHZpZGVvLmRhdGFzZXQuc3RyZW1pb0VuaGFuY2VkUGlwQm91bmQgPSBcInRydWVcIjtcclxuXHJcbiAgICBjb25zdCBzeW5jU3RhdGUgPSAoKSA9PiB7XHJcbiAgICAgICAgdm9pZCB1cGRhdGVQaWN0dXJlSW5QaWN0dXJlU3RhdGUodmlkZW8pO1xyXG4gICAgfTtcclxuXHJcbiAgICBbXCJsb2FkZWRtZXRhZGF0YVwiLCBcInBsYXlcIiwgXCJwYXVzZVwiLCBcImVuZGVkXCIsIFwiZW1wdGllZFwiLCBcInJlc2l6ZVwiXS5mb3JFYWNoKChldmVudE5hbWUpID0+IHtcclxuICAgICAgICB2aWRlby5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgc3luY1N0YXRlKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiB1cGRhdGVQaWN0dXJlSW5QaWN0dXJlU3RhdGUodmlkZW8/OiBIVE1MVmlkZW9FbGVtZW50KTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBpZiAoIVBsYXRmb3JtTWFuYWdlci5jdXJyZW50LmlzUGljdHVyZUluUGljdHVyZVN1cHBvcnRlZCgpKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgY3VycmVudFZpZGVvID0gdmlkZW8gPz8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcInZpZGVvXCIpIGFzIEhUTUxWaWRlb0VsZW1lbnQgfCBudWxsO1xyXG4gICAgaWYgKCFjdXJyZW50VmlkZW8gfHwgIWxvY2F0aW9uLmhyZWYuaW5jbHVkZXMoUExBWUVSX1JPVVRFKSkge1xyXG4gICAgICAgIGF3YWl0IFBsYXRmb3JtTWFuYWdlci5jdXJyZW50LnNldFBpY3R1cmVJblBpY3R1cmVTdGF0ZShmYWxzZSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHdpZHRoID0gY3VycmVudFZpZGVvLnZpZGVvV2lkdGggfHwgMTY7XHJcbiAgICBjb25zdCBoZWlnaHQgPSBjdXJyZW50VmlkZW8udmlkZW9IZWlnaHQgfHwgOTtcclxuICAgIGNvbnN0IGlzQWN0aXZlUGxheWJhY2sgPSBjdXJyZW50VmlkZW8ucmVhZHlTdGF0ZSA+IDAgJiYgIWN1cnJlbnRWaWRlby5wYXVzZWQgJiYgIWN1cnJlbnRWaWRlby5lbmRlZDtcclxuXHJcbiAgICBhd2FpdCBQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC5zZXRQaWN0dXJlSW5QaWN0dXJlU3RhdGUoaXNBY3RpdmVQbGF5YmFjaywgd2lkdGgsIGhlaWdodCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluamVjdFBpY3R1cmVJblBpY3R1cmVCdXR0b24oKTogdm9pZCB7XHJcbiAgICBjb25zdCBleGlzdGluZ0J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RyZW1pby1lbmhhbmNlZC1waXAtYnRuXCIpO1xyXG4gICAgaWYgKGV4aXN0aW5nQnV0dG9uKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgYnV0dG9uc0NvbnRhaW5lciA9IGdldFBpY3R1cmVJblBpY3R1cmVCdXR0b25Db250YWluZXIoKTtcclxuICAgIGlmICghYnV0dG9uc0NvbnRhaW5lcikgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IHRlbXBsYXRlQnV0dG9uID0gYnV0dG9uc0NvbnRhaW5lci5maXJzdEVsZW1lbnRDaGlsZCBhcyBIVE1MRWxlbWVudCB8IG51bGw7XHJcbiAgICBjb25zdCB0ZW1wbGF0ZUljb24gPSB0ZW1wbGF0ZUJ1dHRvbj8ucXVlcnlTZWxlY3RvcihcInN2Z1wiKTtcclxuXHJcbiAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgYnV0dG9uLmlkID0gXCJzdHJlbWlvLWVuaGFuY2VkLXBpcC1idG5cIjtcclxuICAgIGJ1dHRvbi50eXBlID0gXCJidXR0b25cIjtcclxuICAgIGJ1dHRvbi50aXRsZSA9IFwiUGljdHVyZSBpbiBQaWN0dXJlXCI7XHJcbiAgICBidXR0b24uc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBcIlBpY3R1cmUgaW4gUGljdHVyZVwiKTtcclxuICAgIGJ1dHRvbi5jbGFzc05hbWUgPSBgJHt0ZW1wbGF0ZUJ1dHRvbj8uY2xhc3NOYW1lID8/IFwiXCJ9IHN0cmVtaW8tZW5oYW5jZWQtcGlwLWJ1dHRvbmAudHJpbSgpO1xyXG4gICAgYnV0dG9uLmlubmVySFRNTCA9IGBcclxuICAgICAgICA8c3ZnIGNsYXNzPVwiJHt0ZW1wbGF0ZUljb24/LmdldEF0dHJpYnV0ZShcImNsYXNzXCIpID8/IFwiXCJ9XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiPlxyXG4gICAgICAgICAgICA8cGF0aCBkPVwiTTE5IDdINXYxMGgxNFY3Wm0wLTJjMS4xMSAwIDIgLjg5IDIgMnYxMGMwIDEuMTEtLjg5IDItMiAySDVjLTEuMTEgMC0yLS44OS0yLTJWN2MwLTEuMTEuODktMiAyLTJoMTRabS0xIDdoLTZ2NGg2di00WlwiIHN0eWxlPVwiZmlsbDogY3VycmVudENvbG9yO1wiPjwvcGF0aD5cclxuICAgICAgICA8L3N2Zz5cclxuICAgIGA7XHJcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jICgpID0+IHtcclxuICAgICAgICBjb25zdCBjdXJyZW50VmlkZW8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwidmlkZW9cIikgYXMgSFRNTFZpZGVvRWxlbWVudCB8IG51bGw7XHJcbiAgICAgICAgY29uc3Qgc3VjY2VzcyA9IGF3YWl0IFBsYXRmb3JtTWFuYWdlci5jdXJyZW50LmVudGVyUGljdHVyZUluUGljdHVyZShcclxuICAgICAgICAgICAgY3VycmVudFZpZGVvPy52aWRlb1dpZHRoIHx8IDE2LFxyXG4gICAgICAgICAgICBjdXJyZW50VmlkZW8/LnZpZGVvSGVpZ2h0IHx8IDlcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBpZiAoIXN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgSGVscGVycy5jcmVhdGVUb2FzdChcclxuICAgICAgICAgICAgICAgIFwicGlwLXVuYXZhaWxhYmxlXCIsXHJcbiAgICAgICAgICAgICAgICBcIlBpY3R1cmUgaW4gUGljdHVyZVwiLFxyXG4gICAgICAgICAgICAgICAgXCJQaWN0dXJlIGluIFBpY3R1cmUgaXMgbm90IGF2YWlsYWJsZSBvbiB0aGlzIGRldmljZS5cIixcclxuICAgICAgICAgICAgICAgIFwiZmFpbFwiXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgYnV0dG9uc0NvbnRhaW5lci5pbnNlcnRCZWZvcmUoYnV0dG9uLCBidXR0b25zQ29udGFpbmVyLmZpcnN0Q2hpbGQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZW1vdmVQaWN0dXJlSW5QaWN0dXJlQnV0dG9uKCk6IHZvaWQge1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdHJlbWlvLWVuaGFuY2VkLXBpcC1idG5cIik/LnJlbW92ZSgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRQaWN0dXJlSW5QaWN0dXJlQnV0dG9uQ29udGFpbmVyKCk6IEhUTUxFbGVtZW50IHwgbnVsbCB7XHJcbiAgICBjb25zdCBhbGxDb250YWluZXJzID0gQXJyYXkuZnJvbShcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsPEhUTUxFbGVtZW50PignW2NsYXNzKj1cImhvcml6b250YWwtbmF2LWJhci1jb250YWluZXItXCJdIFtjbGFzcyo9XCJidXR0b25zLWNvbnRhaW5lci1cIl0nKVxyXG4gICAgKTtcclxuXHJcbiAgICByZXR1cm4gYWxsQ29udGFpbmVycy5hdCgtMSkgPz8gbnVsbDtcclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gYnJvd3NlTW9kcygpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGNvbnN0IHNldHRpbmdzQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoU0VMRUNUT1JTLlNFVFRJTkdTX0NPTlRFTlQpO1xyXG4gICAgaWYgKCFzZXR0aW5nc0NvbnRlbnQpIHJldHVybjtcclxuXHJcbiAgICBzZXR0aW5nc0NvbnRlbnQuaW5uZXJIVE1MID0gZ2V0TW9kc1RhYlRlbXBsYXRlKCk7XHJcblxyXG4gICAgY29uc3QgbW9kcyA9IGF3YWl0IE1vZE1hbmFnZXIuZmV0Y2hNb2RzKCk7XHJcbiAgICBjb25zdCBtb2RzTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW9kcy1saXN0XCIpO1xyXG4gICAgaWYgKCFtb2RzTGlzdCkgcmV0dXJuO1xyXG5cclxuICAgIGludGVyZmFjZSBSZWdpc3RyeU1vZCB7XHJcbiAgICAgICAgbmFtZTogc3RyaW5nO1xyXG4gICAgICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgICAgICAgYXV0aG9yOiBzdHJpbmc7XHJcbiAgICAgICAgdmVyc2lvbjogc3RyaW5nO1xyXG4gICAgICAgIHByZXZpZXc/OiBzdHJpbmc7XHJcbiAgICAgICAgZG93bmxvYWQ6IHN0cmluZztcclxuICAgICAgICByZXBvOiBzdHJpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQWRkIHBsdWdpbnNcclxuICAgIGZvciAoY29uc3QgcGx1Z2luIG9mIChtb2RzLnBsdWdpbnMgYXMgUmVnaXN0cnlNb2RbXSkpIHtcclxuICAgICAgICBjb25zdCBpbnN0YWxsZWQgPSBhd2FpdCBNb2RNYW5hZ2VyLmlzUGx1Z2luSW5zdGFsbGVkKEhlbHBlcnMuZ2V0RmlsZU5hbWVGcm9tVXJsKHBsdWdpbi5kb3dubG9hZCkpO1xyXG4gICAgICAgIG1vZHNMaXN0LmlubmVySFRNTCArPSBnZXRNb2RJdGVtVGVtcGxhdGUocGx1Z2luLCBcIlBsdWdpblwiLCBpbnN0YWxsZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEFkZCB0aGVtZXNcclxuICAgIGZvciAoY29uc3QgdGhlbWUgb2YgKG1vZHMudGhlbWVzIGFzIFJlZ2lzdHJ5TW9kW10pKSB7XHJcbiAgICAgICAgY29uc3QgaW5zdGFsbGVkID0gYXdhaXQgTW9kTWFuYWdlci5pc1RoZW1lSW5zdGFsbGVkKEhlbHBlcnMuZ2V0RmlsZU5hbWVGcm9tVXJsKHRoZW1lLmRvd25sb2FkKSk7XHJcbiAgICAgICAgbW9kc0xpc3QuaW5uZXJIVE1MICs9IGdldE1vZEl0ZW1UZW1wbGF0ZSh0aGVtZSwgXCJUaGVtZVwiLCBpbnN0YWxsZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFNldCB1cCBhY3Rpb24gYnV0dG9uc1xyXG4gICAgY29uc3QgYWN0aW9uQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIubW9kQWN0aW9uQnRuXCIpO1xyXG4gICAgYWN0aW9uQnRucy5mb3JFYWNoKChidG4pID0+IHtcclxuICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbGluayA9IGJ0bi5nZXRBdHRyaWJ1dGUoXCJkYXRhLWxpbmtcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBidG4uZ2V0QXR0cmlidXRlKFwiZGF0YS10eXBlXCIpPy50b0xvd2VyQ2FzZSgpIGFzIFwicGx1Z2luXCIgfCBcInRoZW1lXCI7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWxpbmsgfHwgIXR5cGUpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIGlmIChidG4uZ2V0QXR0cmlidXRlKFwidGl0bGVcIikgPT09IFwiSW5zdGFsbFwiKSB7XHJcbiAgICAgICAgICAgICAgICBNb2RNYW5hZ2VyLmRvd25sb2FkTW9kKGxpbmssIHR5cGUpO1xyXG4gICAgICAgICAgICAgICAgYnRuLmNsYXNzTGlzdC5yZW1vdmUoQ0xBU1NFUy5JTlNUQUxMX0JVVFRPTik7XHJcbiAgICAgICAgICAgICAgICBidG4uY2xhc3NMaXN0LmFkZChDTEFTU0VTLlVOSU5TVEFMTF9CVVRUT04pO1xyXG4gICAgICAgICAgICAgICAgYnRuLnNldEF0dHJpYnV0ZShcInRpdGxlXCIsIFwiVW5pbnN0YWxsXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGJ0bi5jaGlsZE5vZGVzWzFdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnRuLmNoaWxkTm9kZXNbMV0udGV4dENvbnRlbnQgPSBcIlVuaW5zdGFsbFwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgTW9kTWFuYWdlci5yZW1vdmVNb2QoSGVscGVycy5nZXRGaWxlTmFtZUZyb21VcmwobGluayksIHR5cGUpO1xyXG4gICAgICAgICAgICAgICAgYnRuLmNsYXNzTGlzdC5yZW1vdmUoQ0xBU1NFUy5VTklOU1RBTExfQlVUVE9OKTtcclxuICAgICAgICAgICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKENMQVNTRVMuSU5TVEFMTF9CVVRUT04pO1xyXG4gICAgICAgICAgICAgICAgYnRuLnNldEF0dHJpYnV0ZShcInRpdGxlXCIsIFwiSW5zdGFsbFwiKTtcclxuICAgICAgICAgICAgICAgIGlmIChidG4uY2hpbGROb2Rlc1sxXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ0bi5jaGlsZE5vZGVzWzFdLnRleHRDb250ZW50ID0gXCJJbnN0YWxsXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIFNlYXJjaCBiYXIgbG9naWNcclxuICAgIHNldHVwU2VhcmNoQmFyKCk7XHJcblxyXG4gICAgLy8gQWRkIGJhY2sgYnV0dG9uXHJcbiAgICBjb25zdCBob3Jpem9udGFsTmF2cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoU0VMRUNUT1JTLkhPUklaT05UQUxfTkFWKTtcclxuICAgIGNvbnN0IGhvcml6b250YWxOYXYgPSBob3Jpem9udGFsTmF2c1sxXTtcclxuICAgIGlmIChob3Jpem9udGFsTmF2KSB7XHJcbiAgICAgICAgaG9yaXpvbnRhbE5hdi5pbm5lckhUTUwgPSBnZXRCYWNrQnV0dG9uKCk7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJiYWNrLWJ0blwiKT8uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgbG9jYXRpb24uaGFzaCA9ICcjLyc7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbG9jYXRpb24uaGFzaCA9ICcjL3NldHRpbmdzJztcclxuICAgICAgICAgICAgfSwgMCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldHVwU2VhcmNoQmFyKCk6IHZvaWQge1xyXG4gICAgY29uc3Qgc2VhcmNoSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFNFTEVDVE9SUy5TRUFSQ0hfSU5QVVQpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICBjb25zdCBhZGRvbnNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFNFTEVDVE9SUy5BRERPTlNfTElTVF9DT05UQUlORVIpO1xyXG5cclxuICAgIGlmICghc2VhcmNoSW5wdXQgfHwgIWFkZG9uc0NvbnRhaW5lcikgcmV0dXJuO1xyXG5cclxuICAgIHNlYXJjaElucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZmlsdGVyID0gc2VhcmNoSW5wdXQudmFsdWUudHJpbSgpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgY29uc3QgbW9kSXRlbXMgPSBhZGRvbnNDb250YWluZXIucXVlcnlTZWxlY3RvckFsbChTRUxFQ1RPUlMuQURET05fQ09OVEFJTkVSKTtcclxuXHJcbiAgICAgICAgbW9kSXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBuYW1lID0gaXRlbS5xdWVyeVNlbGVjdG9yKFNFTEVDVE9SUy5OQU1FX0NPTlRBSU5FUik/LnRleHRDb250ZW50Py50b0xvd2VyQ2FzZSgpIHx8IFwiXCI7XHJcbiAgICAgICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gaXRlbS5xdWVyeVNlbGVjdG9yKFNFTEVDVE9SUy5ERVNDUklQVElPTl9JVEVNKT8udGV4dENvbnRlbnQ/LnRvTG93ZXJDYXNlKCkgfHwgXCJcIjtcclxuICAgICAgICAgICAgY29uc3QgdHlwZSA9IGl0ZW0ucXVlcnlTZWxlY3RvcihTRUxFQ1RPUlMuVFlQRVNfQ09OVEFJTkVSKT8udGV4dENvbnRlbnQ/LnRvTG93ZXJDYXNlKCkgfHwgXCJcIjtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoID0gbmFtZS5pbmNsdWRlcyhmaWx0ZXIpIHx8IGRlc2NyaXB0aW9uLmluY2x1ZGVzKGZpbHRlcikgfHwgdHlwZS5pbmNsdWRlcyhmaWx0ZXIpO1xyXG4gICAgICAgICAgICAoaXRlbSBhcyBIVE1MRWxlbWVudCkuc3R5bGUuZGlzcGxheSA9IG1hdGNoID8gXCJcIiA6IFwibm9uZVwiO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldHVwQnJvd3NlTW9kc0J1dHRvbigpOiB2b2lkIHtcbiAgICBiaW5kQnV0dG9uQ2xpY2soXCJicm93c2VQbHVnaW5zVGhlbWVzQnRuXCIsIGJyb3dzZU1vZHMsIFwiYnJvd3NlIG1vZHMgYnV0dG9uXCIpO1xufVxuXG5mdW5jdGlvbiB3cml0ZUFib3V0KCk6IHZvaWQge1xuICAgIEhlbHBlcnMud2FpdEZvckVsbShTRUxFQ1RPUlMuQUJPVVRfQ0FURUdPUlkpLnRoZW4oYXN5bmMgKCkgPT4ge1xuICAgICAgICBjb25zdCBhYm91dENhdGVnb3J5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihTRUxFQ1RPUlMuQUJPVVRfQ0FURUdPUlkpO1xuICAgICAgICBpZiAoYWJvdXRDYXRlZ29yeSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgICAgICBpZiAoIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RyZW1pby1lbmhhbmNlZC1hYm91dC1jb250ZW50XCIpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYWJvdXRDb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICBhYm91dENvbnRlbnQuaWQgPSBcInN0cmVtaW8tZW5oYW5jZWQtYWJvdXQtY29udGVudFwiO1xuICAgICAgICAgICAgICAgIGFib3V0Q29udGVudC5pbm5lckhUTUwgPSBnZXRBYm91dENhdGVnb3J5VGVtcGxhdGUoXG4gICAgICAgICAgICAgICAgICAgIFwiQW5kcm9pZC12MS4wLjBcIixcbiAgICAgICAgICAgICAgICAgICAgZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBmYWxzZVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgYWJvdXRDYXRlZ29yeS5hcHBlbmRDaGlsZChhYm91dENvbnRlbnQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBTZXR0aW5ncy5hZGRCdXR0b24oXCJPcGVuIExvZ3NcIiwgXCJvcGVuTG9nc0J0blwiLCBTRUxFQ1RPUlMuQUJPVVRfQ0FURUdPUlkpO1xuICAgICAgICAgICAgU2V0dGluZ3MuYWRkQnV0dG9uKFwiRXhwb3J0IExvZ3NcIiwgXCJleHBvcnRMb2dzQnRuXCIsIFNFTEVDVE9SUy5BQk9VVF9DQVRFR09SWSk7XG4gICAgICAgICAgICBTZXR0aW5ncy5hZGRCdXR0b24oXCJSZWxvYWQgU3RyZWFtaW5nIFNlcnZlclwiLCBcInJlbG9hZFN0cmVhbWluZ1NlcnZlckJ0blwiLCBTRUxFQ1RPUlMuQUJPVVRfQ0FURUdPUlkpO1xuICAgICAgICAgICAgU2V0dGluZ3MuYWRkQnV0dG9uKFwiT3BlbiBBcHAgRmlsZXNcIiwgXCJvcGVuRW5oYW5jZWRGb2xkZXJCdG5cIiwgU0VMRUNUT1JTLkFCT1VUX0NBVEVHT1JZKTtcblxuICAgICAgICAgICAgYmluZEJ1dHRvbkNsaWNrKFwib3BlbkxvZ3NCdG5cIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIExvZ01hbmFnZXIuc2hvd0xvZ3MoKTtcbiAgICAgICAgICAgIH0sIFwib3BlbiBsb2dzIGJ1dHRvblwiKTtcblxuICAgICAgICAgICAgYmluZEJ1dHRvbkNsaWNrKFwiZXhwb3J0TG9nc0J0blwiLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZXhwb3J0ZWRQYXRoID0gYXdhaXQgTG9nTWFuYWdlci5leHBvcnRMb2dzKCk7XG4gICAgICAgICAgICAgICAgaWYgKGV4cG9ydGVkUGF0aCkge1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC5vcGVuUGF0aChqb2luKHByb3BlcnRpZXMuZW5oYW5jZWRQYXRoLCBcImxvZ3NcIikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIFwiZXhwb3J0IGxvZ3MgYnV0dG9uXCIpO1xuXG4gICAgICAgICAgICBiaW5kQnV0dG9uQ2xpY2soXCJyZWxvYWRTdHJlYW1pbmdTZXJ2ZXJCdG5cIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGF3YWl0IGVuc3VyZUJ1bmRsZWRTdHJlYW1pbmdTZXJ2ZXJSZWFkeSgpO1xuICAgICAgICAgICAgICAgIHNjaGVkdWxlU3RyZWFtaW5nU2VydmVyUmVsb2FkKCk7XG4gICAgICAgICAgICB9LCBcInJlbG9hZCBzdHJlYW1pbmcgc2VydmVyIGJ1dHRvblwiKTtcblxuICAgICAgICAgICAgYmluZEJ1dHRvbkNsaWNrKFwib3BlbkVuaGFuY2VkRm9sZGVyQnRuXCIsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICBhd2FpdCBQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC5vcGVuUGF0aChwcm9wZXJ0aWVzLmVuaGFuY2VkUGF0aCk7XG4gICAgICAgICAgICB9LCBcIm9wZW4gZW5oYW5jZWQgZm9sZGVyIGJ1dHRvblwiKTtcbiAgICAgICAgfVxuICAgIH0pLmNhdGNoKGVyciA9PiBsb2dnZXIuZXJyb3IoXCJGYWlsZWQgdG8gd3JpdGUgYWJvdXQgc2VjdGlvbjogXCIgKyBlcnIpKTtcbn1cblxyXG5mdW5jdGlvbiBnZXRBYm91dEljb24oKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGNsYXNzPVwiaWNvblwiPlxyXG4gICAgICAgIDxnPjxwYXRoIGZpbGw9XCJub25lXCIgZD1cIk0wIDBoMjR2MjRIMHpcIj48L3BhdGg+XHJcbiAgICAgICAgPHBhdGggZD1cIk0xMiAyMkM2LjQ3NyAyMiAyIDE3LjUyMyAyIDEyUzYuNDc3IDIgMTIgMnMxMCA0LjQ3NyAxMCAxMC00LjQ3NyAxMC0xMCAxMHptLTEtMTF2Nmgydi02aC0yem0wLTR2MmgyVjdoLTJ6XCIgc3R5bGU9XCJmaWxsOmN1cnJlbnRjb2xvclwiPjwvcGF0aD48L2c+PC9zdmc+YDtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0VGhlbWVJY29uKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBjbGFzcz1cImljb25cIj5cclxuICAgICAgICA8Zz48cGF0aCBmaWxsPVwibm9uZVwiIGQ9XCJNMCAwaDI0djI0SDB6XCI+PC9wYXRoPlxyXG4gICAgICAgIDxwYXRoIGQ9XCJNNCAzaDE2YTEgMSAwIDAgMSAxIDF2NWExIDEgMCAwIDEtMSAxSDRhMSAxIDAgMCAxLTEtMVY0YTEgMSAwIDAgMSAxLTF6bTIgOWg2YTEgMSAwIDAgMSAxIDF2M2gxdjZoLTR2LTZoMXYtMkg1YTEgMSAwIDAgMS0xLTF2LTJoMnYxem0xMS43MzIgMS43MzJsMS43NjgtMS43NjggMS43NjggMS43NjhhMi41IDIuNSAwIDEgMS0zLjUzNiAwelwiIHN0eWxlPVwiZmlsbDogY3VycmVudGNvbG9yO1wiPjwvcGF0aD48L2c+PC9zdmc+YDtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0UGx1Z2luSWNvbigpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIGA8c3ZnIGljb249XCJhZGRvbnMtb3V0bGluZVwiIGNsYXNzPVwiaWNvblwiIHZpZXdCb3g9XCIwIDAgNTEyIDUxMlwiIHN0eWxlPVwiZmlsbDogY3VycmVudGNvbG9yO1wiPlxyXG4gICAgICAgIDxwYXRoIGQ9XCJNNDEzLjcgMjQ2LjFIMzg2Yy0wLjUzLTAuMDEtMS4wMy0wLjIzLTEuNC0wLjYtMC4zNy0wLjM3LTAuNTktMC44Ny0wLjYtMS40di03Ny4yYTM4Ljk0IDM4Ljk0IDAgMCAwLTExLjQtMjcuNSAzOC45NCAzOC45NCAwIDAgMC0yNy41LTExLjRoLTc3LjJjLTAuNTMtMC4wMS0xLjAzLTAuMjMtMS40LTAuNi0wLjM3LTAuMzctMC41OS0wLjg3LTAuNi0xLjR2LTI3LjdjMC0yNy4xLTIxLjUtNDkuOS00OC42LTUwLjMtNi41Ny0wLjEtMTMuMDkgMS4wOS0xOS4yIDMuNWE0OS42MTYgNDkuNjE2IDAgMCAwLTE2LjQgMTAuNyA0OS44MjMgNDkuODIzIDAgMCAwLTExIDE2LjIgNDguODk0IDQ4Ljg5NCAwIDAgMC0zLjkgMTkuMnYyOC41Yy0wLjAxIDAuNTMtMC4yMyAxLjAzLTAuNiAxLjQtMC4zNyAwLjM3LTAuODcgMC41OS0xLjQgMC42aC03Ny4yYy0xMC41IDAtMjAuNTcgNC4xNy0yOCAxMS42YTM5LjU5NCAzOS41OTQgMCAwIDAtMTEuNiAyOHY3MC40YzAuMDEgMC41MyAwLjIzIDEuMDMgMC42IDEuNCAwLjM3IDAuMzcgMC44NyAwLjU5IDEuNCAwLjZoMjYuOWMyOS40IDAgNTMuNyAyNS41IDU0LjEgNTQuOCAwLjQgMjkuOS0yMy41IDU3LjItNTMuMyA1Ny4ySDUwYy0wLjUzIDAuMDEtMS4wMyAwLjIzLTEuNCAwLjYtMC4zNyAwLjM3LTAuNTkgMC44Ny0wLjYgMS40djcwLjRjMCAxMC41IDQuMTcgMjAuNTcgMTEuNiAyOHMxNy41IDExLjYgMjggMTEuNmg3MC40YzAuNTMtMC4wMSAxLjAzLTAuMjMgMS40LTAuNiAwLjM3LTAuMzcgMC41OS0wLjg3IDAuNi0xLjRWNDQxLjJjMC0zMC4zIDI0LjgtNTYuNCA1NS01Ny4xIDMwLjEtMC43IDU3IDIwLjMgNTcgNTAuM3YyNy43YzAuMDEgMC41MyAwLjIzIDEuMDMgMC42IDEuNCAwLjM3IDAuMzcgMC44NyAwLjU5IDEuNCAwLjZoNzEuMWEzOC45NCAzOC45NCAwIDAgMCAyNy41LTExLjQgMzguOTU4IDM4Ljk1OCAwIDAgMCAxMS40LTI3LjV2LTc4YzAuMDEtMC41MyAwLjIzLTEuMDMgMC42LTEuNCAwLjM3LTAuMzcgMC44Ny0wLjU5IDEuNC0wLjZoMjguNWMyNy42IDAgNDkuNS0yMi43IDQ5LjUtNTAuNHMtMjMuMi00OC43LTUwLjMtNDguN1pcIiBzdHlsZT1cInN0cm9rZTpjdXJyZW50Y29sb3I7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS13aWR0aDozMjtmaWxsOiBjdXJyZW50Q29sb3I7XCI+PC9wYXRoPjwvc3ZnPmA7XHJcbn1cclxuIiwgImltcG9ydCB0eXBlIHsgUGx1Z2luTGlzdGVuZXJIYW5kbGUgfSBmcm9tICdAY2FwYWNpdG9yL2NvcmUnO1xuaW1wb3J0IHsgQ2FwYWNpdG9yIH0gZnJvbSAnQGNhcGFjaXRvci9jb3JlJztcblxuaW1wb3J0IHR5cGUgeyBDaGFubmVsUGF5bG9hZERhdGEsIENoYW5uZWxDYWxsYmFja0RhdGEsIENoYW5uZWxMaXN0ZW5lckNhbGxiYWNrLCBTdGFydE9wdGlvbnMgfSBmcm9tICcuL2RlZmluaXRpb25zJztcbmltcG9ydCB7IENhcGFjaXRvck5vZGVKUyB9IGZyb20gJy4vaW1wbGVtZW50YXRpb24nO1xuXG5leHBvcnQgaW50ZXJmYWNlIE5vZGVKU0ludGVyZmFjZSB7XG4gIC8qKlxuICAgKiBTdGFydHMgdGhlIE5vZGUuanMgZW5naW5lIHdpdGggcHJvcGVydGllcyBhcyBzZXQgYnkgdGhlIGBvcHRpb25zYC5cbiAgICpcbiAgICogKipOb3RlOioqIFRoaXMgbWV0aG9kIGlzIG9ubHkgYXZhaWxhYmxlIGlmIHRoZSBOb2RlLmpzIGVuZ2luZSBzdGFydHVwIG1vZGUgd2FzIHNldCB0byBgJ21hbnVhbCdgIHZpYSB0aGUgcGx1Z2luIGNvbmZpZ3VyYXRpb24uXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgc3RhcnQob3B0aW9ucz86IFN0YXJ0T3B0aW9ucyk6IFByb21pc2U8dm9pZD47XG5cbiAgLyoqXG4gICAqIFNlbmRzIGEgbWVzc2FnZSB0byB0aGUgTm9kZS5qcyBwcm9jZXNzLlxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIHNlbmQoYXJnczogQ2hhbm5lbFBheWxvYWREYXRhKTogUHJvbWlzZTx2b2lkPjtcblxuICAvKipcbiAgICogUmVzb2x2ZXMgd2hlbiB0aGUgTm9kZS5qcyBwcm9jZXNzIGlzIGluaXRpYWxpemVkLlxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIHdoZW5SZWFkeSgpOiBQcm9taXNlPHZvaWQ+O1xuXG4gIC8qKlxuICAgKiBMaXN0ZW5zIHRvIGBldmVudE5hbWVgIGFuZCBjYWxscyBgbGlzdGVuZXJGdW5jKGRhdGEpYCB3aGVuIGEgbmV3IG1lc3NhZ2UgYXJyaXZlcyBmcm9tIHRoZSBOb2RlLmpzIHByb2Nlc3MuXG4gICAqXG4gICAqICoqTm90ZToqKiBXaGVuIHVzaW5nIHRoZSBFbGVjdHJvbiBwbGF0Zm9ybSwgW2BQbHVnaW5MaXN0ZW5lckhhbmRsZS5yZW1vdmUoKWBdKCNwbHVnaW5saXN0ZW5lcmhhbmRsZSkgZG9lcyBub3Qgd29yayBkdWUgdG8gbGltaXRhdGlvbnMuXG4gICAqIFVzZSBbYHJlbW92ZUxpc3RlbmVyKGxpc3RlbmVyRnVuYylgXSgjcmVtb3ZlbGlzdGVuZXIpIGluc3RlYWQuXG4gICAqXG4gICAqIEBzaW5jZSAxLjAuMFxuICAgKi9cbiAgYWRkTGlzdGVuZXIoXG4gICAgZXZlbnROYW1lOiBzdHJpbmcsXG4gICAgbGlzdGVuZXJGdW5jOiBDaGFubmVsTGlzdGVuZXJDYWxsYmFjayxcbiAgKTogUHJvbWlzZTxQbHVnaW5MaXN0ZW5lckhhbmRsZT47XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgdGhlIHNwZWNpZmllZCBgbGlzdGVuZXJIYW5kbGVgIGZyb20gdGhlIGxpc3RlbmVyIGFycmF5IGZvciB0aGUgZXZlbnQgaXQgcmVmZXJzIHRvLlxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIHJlbW92ZUxpc3RlbmVyKGxpc3RlbmVySGFuZGxlOiBQbHVnaW5MaXN0ZW5lckhhbmRsZSk6IFByb21pc2U8dm9pZD47XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYWxsIGxpc3RlbmVycywgb3IgdGhvc2Ugb2YgdGhlIHNwZWNpZmllZCBgZXZlbnROYW1lYCwgZm9yIHRoaXMgcGx1Z2luLlxuICAgKlxuICAgKiBAc2luY2UgMS4wLjBcbiAgICovXG4gIHJlbW92ZUFsbExpc3RlbmVycyhldmVudE5hbWU/OiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+O1xufVxuXG5jbGFzcyBOb2RlSlNQbHVnaW4gaW1wbGVtZW50cyBOb2RlSlNJbnRlcmZhY2Uge1xuICBwcml2YXRlIHJlYWRvbmx5IGxpc3RlbmVyTGlzdDoge1xuICAgIGV2ZW50TmFtZTogc3RyaW5nO1xuICAgIGxpc3RlbmVySGFuZGxlOiBQcm9taXNlPFBsdWdpbkxpc3RlbmVySGFuZGxlPjtcbiAgfVtdID0gW107XG5cbiAgc3RhcnQoYXJncz86IFN0YXJ0T3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiBDYXBhY2l0b3JOb2RlSlMuc3RhcnQoYXJncyk7XG4gIH1cblxuICBzZW5kKGFyZ3M6IENoYW5uZWxQYXlsb2FkRGF0YSk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiBDYXBhY2l0b3JOb2RlSlMuc2VuZChhcmdzKTtcbiAgfVxuXG4gIHdoZW5SZWFkeSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gQ2FwYWNpdG9yTm9kZUpTLndoZW5SZWFkeSgpO1xuICB9XG5cbiAgYWRkTGlzdGVuZXIoXG4gICAgZXZlbnROYW1lOiBzdHJpbmcsXG4gICAgbGlzdGVuZXJGdW5jOiBDaGFubmVsTGlzdGVuZXJDYWxsYmFjayxcbiAgKTogUHJvbWlzZTxQbHVnaW5MaXN0ZW5lckhhbmRsZT47XG5cbiAgYWRkTGlzdGVuZXIoXG4gICAgZXZlbnROYW1lOiBhbnksXG4gICAgbGlzdGVuZXJGdW5jOiBDaGFubmVsTGlzdGVuZXJDYWxsYmFjayxcbiAgKTogUHJvbWlzZTxQbHVnaW5MaXN0ZW5lckhhbmRsZT4ge1xuICAgIGNvbnN0IGxpc3RlbmVySGFuZGxlID0gQ2FwYWNpdG9yTm9kZUpTLmFkZExpc3RlbmVyKGV2ZW50TmFtZSwgKGRhdGE6IENoYW5uZWxDYWxsYmFja0RhdGEpID0+IHtcbiAgICAgIGxpc3RlbmVyRnVuYyhkYXRhKTtcbiAgICB9KTtcblxuICAgIHRoaXMubGlzdGVuZXJMaXN0LnB1c2goeyBldmVudE5hbWUsIGxpc3RlbmVySGFuZGxlIH0pO1xuICAgIHJldHVybiBsaXN0ZW5lckhhbmRsZTtcbiAgfVxuXG4gIGFzeW5jIHJlbW92ZUxpc3RlbmVyKGxpc3RlbmVySGFuZGxlOiBQbHVnaW5MaXN0ZW5lckhhbmRsZSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmIChDYXBhY2l0b3IuZ2V0UGxhdGZvcm0oKSA9PT0gJ2VsZWN0cm9uJykge1xuICAgICAgYXdhaXQgKENhcGFjaXRvck5vZGVKUyBhcyBhbnkpLnJlbW92ZUxpc3RlbmVyKGxpc3RlbmVySGFuZGxlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXdhaXQgbGlzdGVuZXJIYW5kbGUucmVtb3ZlKCk7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMubGlzdGVuZXJMaXN0Lmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgY29uc3QgbGlzdGVuZXIgPSB0aGlzLmxpc3RlbmVyTGlzdFtpbmRleF07XG5cbiAgICAgIGlmIChsaXN0ZW5lckhhbmRsZSA9PT0gKGF3YWl0IGxpc3RlbmVyLmxpc3RlbmVySGFuZGxlKSkge1xuICAgICAgICB0aGlzLmxpc3RlbmVyTGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhc3luYyByZW1vdmVBbGxMaXN0ZW5lcnMoZXZlbnROYW1lPzogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgZm9yIChjb25zdCBsaXN0ZW5lciBvZiBbLi4udGhpcy5saXN0ZW5lckxpc3RdKSB7XG4gICAgICBpZiAoIWV2ZW50TmFtZSB8fCBldmVudE5hbWUgPT09IGxpc3RlbmVyLmV2ZW50TmFtZSkge1xuICAgICAgICBjb25zdCBsaXN0ZW5lckhhbmRsZSA9IGF3YWl0IGxpc3RlbmVyLmxpc3RlbmVySGFuZGxlO1xuICAgICAgICBhd2FpdCB0aGlzLnJlbW92ZUxpc3RlbmVyKGxpc3RlbmVySGFuZGxlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuY29uc3QgTm9kZUpTID0gbmV3IE5vZGVKU1BsdWdpbigpO1xuXG5leHBvcnQgeyBOb2RlSlMgfTtcbiIsICJpbXBvcnQgdHlwZSB7IFBsdWdpbkxpc3RlbmVySGFuZGxlIH0gZnJvbSAnQGNhcGFjaXRvci9jb3JlJztcbmltcG9ydCB7IHJlZ2lzdGVyUGx1Z2luIH0gZnJvbSAnQGNhcGFjaXRvci9jb3JlJztcblxuaW1wb3J0IHR5cGUgeyBDaGFubmVsUGF5bG9hZERhdGEsIENoYW5uZWxMaXN0ZW5lckNhbGxiYWNrLCBTdGFydE9wdGlvbnMgfSBmcm9tICcuL2RlZmluaXRpb25zJztcblxuZXhwb3J0IGludGVyZmFjZSBDYXBhY2l0b3JOb2RlSlNQbHVnaW4ge1xuICBzdGFydChhcmdzPzogU3RhcnRPcHRpb25zKTogUHJvbWlzZTx2b2lkPjtcbiAgc2VuZChhcmdzOiBDaGFubmVsUGF5bG9hZERhdGEpOiBQcm9taXNlPHZvaWQ+O1xuICB3aGVuUmVhZHkoKTogUHJvbWlzZTx2b2lkPjtcblxuICBhZGRMaXN0ZW5lcihcbiAgICBldmVudE5hbWU6IHN0cmluZyxcbiAgICBsaXN0ZW5lckZ1bmM6IENoYW5uZWxMaXN0ZW5lckNhbGxiYWNrLFxuICApOiBQcm9taXNlPFBsdWdpbkxpc3RlbmVySGFuZGxlPjtcbn1cblxuY29uc3QgQ2FwYWNpdG9yTm9kZUpTID0gcmVnaXN0ZXJQbHVnaW48Q2FwYWNpdG9yTm9kZUpTUGx1Z2luPignQ2FwYWNpdG9yTm9kZUpTJywge1xuICB3ZWI6ICgpID0+IGltcG9ydCgnLi93ZWInKS50aGVuKChtKSA9PiBuZXcgbS5DYXBhY2l0b3JOb2RlSlNXZWIoKSksXG4gIGVsZWN0cm9uOiAoKSA9PiAod2luZG93IGFzIGFueSkuQ2FwYWNpdG9yQ3VzdG9tUGxhdGZvcm0ucGx1Z2lucy5DYXBhY2l0b3JOb2RlSlMsXG59KTtcblxuZXhwb3J0IHsgQ2FwYWNpdG9yTm9kZUpTIH07XG4iLCAiaW1wb3J0IHsgam9pbiB9IGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyBQbGF0Zm9ybU1hbmFnZXIgfSBmcm9tIFwiLi4vcGxhdGZvcm0vUGxhdGZvcm1NYW5hZ2VyXCI7XG5pbXBvcnQgcHJvcGVydGllcyBmcm9tIFwiLi9Qcm9wZXJ0aWVzXCI7XG5cbmV4cG9ydCB0eXBlIExvZ0xldmVsID0gJ0lORk8nIHwgJ1dBUk4nIHwgJ0VSUk9SJyB8ICdERUJVRyc7XG5cclxuaW50ZXJmYWNlIExvZ0VudHJ5IHtcclxuICAgIHRpbWVzdGFtcDogc3RyaW5nO1xyXG4gICAgbGV2ZWw6IExvZ0xldmVsO1xyXG4gICAgbWVzc2FnZTogc3RyaW5nO1xyXG59XHJcblxyXG5jbGFzcyBMb2dNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBMb2dNYW5hZ2VyO1xyXG4gICAgcHJpdmF0ZSBsb2dzOiBMb2dFbnRyeVtdID0gW107XHJcbiAgICBwcml2YXRlIG1heExvZ3MgPSAxMDAwO1xyXG4gICAgcHJpdmF0ZSBvcmlnaW5hbENvbnNvbGU6IGFueSA9IHt9O1xyXG4gICAgcHJpdmF0ZSBpc0hvb2tlZCA9IGZhbHNlO1xyXG5cclxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogTG9nTWFuYWdlciB7XHJcbiAgICAgICAgaWYgKCFMb2dNYW5hZ2VyLmluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIExvZ01hbmFnZXIuaW5zdGFuY2UgPSBuZXcgTG9nTWFuYWdlcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gTG9nTWFuYWdlci5pbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaG9va0NvbnNvbGUoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNIb29rZWQpIHJldHVybjtcclxuICAgICAgICB0aGlzLmlzSG9va2VkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgY29uc3QgbWV0aG9kczogTG9nTGV2ZWxbXSA9IFsnSU5GTycsICdXQVJOJywgJ0VSUk9SJywgJ0RFQlVHJ107XHJcblxyXG4gICAgICAgIG1ldGhvZHMuZm9yRWFjaChsZXZlbCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbnNvbGVNZXRob2QgPSBsZXZlbC50b0xvd2VyQ2FzZSgpIGFzIGtleW9mIENvbnNvbGU7XHJcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbiAgICAgICAgICAgIHRoaXMub3JpZ2luYWxDb25zb2xlW2NvbnNvbGVNZXRob2RdID0gKGNvbnNvbGUgYXMgYW55KVtjb25zb2xlTWV0aG9kXS5iaW5kKGNvbnNvbGUpO1xyXG5cclxuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuICAgICAgICAgICAgKGNvbnNvbGUgYXMgYW55KVtjb25zb2xlTWV0aG9kXSA9ICguLi5hcmdzOiBhbnlbXSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRMb2cobGV2ZWwsIGFyZ3MubWFwKGFyZyA9PlxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGVvZiBhcmcgPT09ICdvYmplY3QnID8gSlNPTi5zdHJpbmdpZnkoYXJnKSA6IFN0cmluZyhhcmcpXHJcbiAgICAgICAgICAgICAgICApLmpvaW4oJyAnKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQ2FsbCBvcmlnaW5hbFxyXG4gICAgICAgICAgICAgICAgdGhpcy5vcmlnaW5hbENvbnNvbGVbY29uc29sZU1ldGhvZF0oLi4uYXJncyk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIEhvb2sgbG9nIGFzIElORk9cclxuICAgICAgICB0aGlzLm9yaWdpbmFsQ29uc29sZVsnbG9nJ10gPSBjb25zb2xlLmxvZy5iaW5kKGNvbnNvbGUpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nID0gKC4uLmFyZ3M6IGFueVtdKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkTG9nKCdJTkZPJywgYXJncy5tYXAoYXJnID0+XHJcbiAgICAgICAgICAgICAgICB0eXBlb2YgYXJnID09PSAnb2JqZWN0JyA/IEpTT04uc3RyaW5naWZ5KGFyZykgOiBTdHJpbmcoYXJnKVxyXG4gICAgICAgICAgICApLmpvaW4oJyAnKSk7XHJcbiAgICAgICAgICAgIHRoaXMub3JpZ2luYWxDb25zb2xlWydsb2cnXSguLi5hcmdzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZExvZyhsZXZlbDogTG9nTGV2ZWwsIG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBjb25zdCB0aW1lc3RhbXAgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVsxXS5zbGljZSgwLCAtMSk7XG4gICAgICAgIHRoaXMubG9ncy5wdXNoKHsgdGltZXN0YW1wLCBsZXZlbCwgbWVzc2FnZSB9KTtcbiAgICAgICAgaWYgKHRoaXMubG9ncy5sZW5ndGggPiB0aGlzLm1heExvZ3MpIHtcbiAgICAgICAgICAgIHRoaXMubG9ncy5zaGlmdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIGV4cG9ydExvZ3MoKTogUHJvbWlzZTxzdHJpbmcgfCBudWxsPiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBsb2dzRGlyID0gam9pbihwcm9wZXJ0aWVzLmVuaGFuY2VkUGF0aCwgXCJsb2dzXCIpO1xuICAgICAgICAgICAgaWYgKCFhd2FpdCBQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC5leGlzdHMobG9nc0RpcikpIHtcbiAgICAgICAgICAgICAgICBhd2FpdCBQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC5ta2Rpcihsb2dzRGlyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgZmlsZU5hbWUgPSBgc3RyZW1pby1lbmhhbmNlZC0ke25ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5yZXBsYWNlKC9bOi5dL2csIFwiLVwiKX0ubG9nYDtcbiAgICAgICAgICAgIGNvbnN0IGZpbGVQYXRoID0gam9pbihsb2dzRGlyLCBmaWxlTmFtZSk7XG4gICAgICAgICAgICBhd2FpdCBQbGF0Zm9ybU1hbmFnZXIuY3VycmVudC53cml0ZUZpbGUoZmlsZVBhdGgsIHRoaXMuc2VyaWFsaXplTG9ncygpKTtcbiAgICAgICAgICAgIHJldHVybiBmaWxlUGF0aDtcbiAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzaG93TG9ncygpOiB2b2lkIHtcbiAgICAgICAgY29uc3Qgb3ZlcmxheUlkID0gJ3N0cmVtaW8tZW5oYW5jZWQtbG9ncy1vdmVybGF5JztcbiAgICAgICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKG92ZXJsYXlJZCkpIHJldHVybjtcblxyXG4gICAgICAgIGNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBvdmVybGF5LmlkID0gb3ZlcmxheUlkO1xyXG4gICAgICAgIG92ZXJsYXkuc3R5bGUuY3NzVGV4dCA9IGBcclxuICAgICAgICAgICAgcG9zaXRpb246IGZpeGVkO1xyXG4gICAgICAgICAgICB0b3A6IDA7XHJcbiAgICAgICAgICAgIGxlZnQ6IDA7XHJcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICAgICAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC44KTtcclxuICAgICAgICAgICAgei1pbmRleDogOTk5OTk7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICAgICAgICAgIHBhZGRpbmc6IDIwcHg7XHJcbiAgICAgICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgICAgICAgICAgIGNvbG9yOiAjZmZmO1xyXG4gICAgICAgICAgICBmb250LWZhbWlseTogbW9ub3NwYWNlO1xyXG4gICAgICAgIGA7XHJcblxyXG4gICAgICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGhlYWRlci5zdHlsZS5jc3NUZXh0ID0gYFxyXG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICMxYTFhMWE7XHJcbiAgICAgICAgICAgIHBhZGRpbmc6IDEwcHg7XHJcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICAgICAgICBgO1xyXG5cclxuICAgICAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XHJcbiAgICAgICAgdGl0bGUudGV4dENvbnRlbnQgPSAnTG9ncyc7XHJcbiAgICAgICAgdGl0bGUuc3R5bGUubWFyZ2luID0gJzAnO1xyXG5cclxuICAgICAgICBjb25zdCBjb250cm9scyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGNvbnRyb2xzLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XHJcbiAgICAgICAgY29udHJvbHMuc3R5bGUuZ2FwID0gJzEwcHgnO1xyXG5cclxuICAgICAgICBjb25zdCBmaWx0ZXJTZWxlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWxlY3QnKTtcclxuICAgICAgICBmaWx0ZXJTZWxlY3Quc3R5bGUuY3NzVGV4dCA9IGBcclxuICAgICAgICAgICAgYmFja2dyb3VuZDogIzMzMztcclxuICAgICAgICAgICAgY29sb3I6IHdoaXRlO1xyXG4gICAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjNTU1O1xyXG4gICAgICAgICAgICBwYWRkaW5nOiA1cHg7XHJcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDNweDtcclxuICAgICAgICBgO1xyXG4gICAgICAgIFsnQUxMJywgJ0lORk8nLCAnV0FSTicsICdFUlJPUiddLmZvckVhY2gobGV2ZWwgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcclxuICAgICAgICAgICAgb3B0aW9uLnZhbHVlID0gbGV2ZWw7XHJcbiAgICAgICAgICAgIG9wdGlvbi50ZXh0Q29udGVudCA9IGxldmVsO1xyXG4gICAgICAgICAgICBmaWx0ZXJTZWxlY3QuYXBwZW5kQ2hpbGQob3B0aW9uKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgY29weUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBjb3B5QnRuLnRleHRDb250ZW50ID0gJ0NvcHkgQWxsJztcbiAgICAgICAgY29weUJ0bi5zdHlsZS5jc3NUZXh0ID0gYFxuICAgICAgICAgICAgYmFja2dyb3VuZDogIzRhNGE0YTtcbiAgICAgICAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICAgICAgICAgIGJvcmRlcjogbm9uZTtcclxuICAgICAgICAgICAgcGFkZGluZzogNXB4IDEwcHg7XHJcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDNweDtcclxuICAgICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICBgO1xuXG4gICAgICAgIGNvbnN0IGV4cG9ydEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBleHBvcnRCdG4udGV4dENvbnRlbnQgPSAnRXhwb3J0JztcbiAgICAgICAgZXhwb3J0QnRuLnN0eWxlLmNzc1RleHQgPSBgXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAjMjU2M2ViO1xuICAgICAgICAgICAgY29sb3I6IHdoaXRlO1xuICAgICAgICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgICAgICAgcGFkZGluZzogNXB4IDEwcHg7XG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiAzcHg7XG4gICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgIGA7XG5cbiAgICAgICAgY29uc3QgY2xvc2VCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgY2xvc2VCdG4udGV4dENvbnRlbnQgPSAnQ2xvc2UnO1xuICAgICAgICBjbG9zZUJ0bi5zdHlsZS5jc3NUZXh0ID0gYFxuICAgICAgICAgICAgYmFja2dyb3VuZDogI2MwMzkyYjtcbiAgICAgICAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICAgICAgICAgIGJvcmRlcjogbm9uZTtcclxuICAgICAgICAgICAgcGFkZGluZzogNXB4IDEwcHg7XHJcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDNweDtcclxuICAgICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgICAgIGA7XHJcblxuICAgICAgICBjb250cm9scy5hcHBlbmRDaGlsZChmaWx0ZXJTZWxlY3QpO1xuICAgICAgICBjb250cm9scy5hcHBlbmRDaGlsZChjb3B5QnRuKTtcbiAgICAgICAgY29udHJvbHMuYXBwZW5kQ2hpbGQoZXhwb3J0QnRuKTtcbiAgICAgICAgY29udHJvbHMuYXBwZW5kQ2hpbGQoY2xvc2VCdG4pO1xuICAgICAgICBoZWFkZXIuYXBwZW5kQ2hpbGQodGl0bGUpO1xuICAgICAgICBoZWFkZXIuYXBwZW5kQ2hpbGQoY29udHJvbHMpO1xuXHJcbiAgICAgICAgY29uc3QgbG9nc0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGxvZ3NDb250YWluZXIuaWQgPSAnbG9ncy1jb250YWluZXInO1xyXG4gICAgICAgIGxvZ3NDb250YWluZXIuc3R5bGUuY3NzVGV4dCA9IGBcclxuICAgICAgICAgICAgZmxleDogMTtcclxuICAgICAgICAgICAgb3ZlcmZsb3cteTogYXV0bztcclxuICAgICAgICAgICAgYmFja2dyb3VuZDogIzExMTtcclxuICAgICAgICAgICAgcGFkZGluZzogMTBweDtcclxuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gICAgICAgICAgICB3aGl0ZS1zcGFjZTogcHJlLXdyYXA7XHJcbiAgICAgICAgICAgIHdvcmQtYnJlYWs6IGJyZWFrLWFsbDtcclxuICAgICAgICAgICAgZm9udC1zaXplOiAxMnB4O1xyXG4gICAgICAgIGA7XHJcblxyXG4gICAgICAgIG92ZXJsYXkuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcclxuICAgICAgICBvdmVybGF5LmFwcGVuZENoaWxkKGxvZ3NDb250YWluZXIpO1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQob3ZlcmxheSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHJlbmRlckxvZ3MgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpbHRlciA9IGZpbHRlclNlbGVjdC52YWx1ZTtcclxuICAgICAgICAgICAgY29uc3QgZmlsdGVyZWRMb2dzID0gZmlsdGVyID09PSAnQUxMJ1xyXG4gICAgICAgICAgICAgICAgPyB0aGlzLmxvZ3NcclxuICAgICAgICAgICAgICAgIDogdGhpcy5sb2dzLmZpbHRlcihsID0+IGwubGV2ZWwgPT09IGZpbHRlcik7XHJcblxyXG4gICAgICAgICAgICBsb2dzQ29udGFpbmVyLmlubmVySFRNTCA9IGZpbHRlcmVkTG9ncy5tYXAobCA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb2xvciA9IGwubGV2ZWwgPT09ICdFUlJPUicgPyAnI2ZmNTU1NScgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsLmxldmVsID09PSAnV0FSTicgPyAnI2ZmYjg2YycgOiAnIzUwZmE3Yic7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYDxkaXYgc3R5bGU9XCJtYXJnaW4tYm90dG9tOiAycHg7XCI+PHNwYW4gc3R5bGU9XCJjb2xvcjogIzYyNzJhNFwiPlske2wudGltZXN0YW1wfV08L3NwYW4+IDxzcGFuIHN0eWxlPVwiY29sb3I6ICR7Y29sb3J9XCI+WyR7bC5sZXZlbH1dPC9zcGFuPiAke3RoaXMuZXNjYXBlSHRtbChsLm1lc3NhZ2UpfTwvZGl2PmA7XHJcbiAgICAgICAgICAgIH0pLmpvaW4oJycpO1xyXG4gICAgICAgICAgICBsb2dzQ29udGFpbmVyLnNjcm9sbFRvcCA9IGxvZ3NDb250YWluZXIuc2Nyb2xsSGVpZ2h0O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJlbmRlckxvZ3MoKTtcclxuXHJcbiAgICAgICAgZmlsdGVyU2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHJlbmRlckxvZ3MpO1xyXG5cclxuICAgICAgICBjb3B5QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGV4dCA9IHRoaXMuc2VyaWFsaXplTG9ncygpO1xuICAgICAgICAgICAgY29uc3QgdGV4dEFyZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGV4dGFyZWFcIik7XG4gICAgICAgICAgICB0ZXh0QXJlYS52YWx1ZSA9IHRleHQ7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRleHRBcmVhKTtcbiAgICAgICAgICAgIHRleHRBcmVhLnNlbGVjdCgpO1xuICAgICAgICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoXCJDb3B5XCIpO1xuICAgICAgICAgICAgdGV4dEFyZWEucmVtb3ZlKCk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBvcmlnaW5hbFRleHQgPSBjb3B5QnRuLnRleHRDb250ZW50O1xyXG4gICAgICAgICAgICBjb3B5QnRuLnRleHRDb250ZW50ID0gJ0NvcGllZCEnO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBjb3B5QnRuLnRleHRDb250ZW50ID0gb3JpZ2luYWxUZXh0LCAyMDAwKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZXhwb3J0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgb3JpZ2luYWxUZXh0ID0gZXhwb3J0QnRuLnRleHRDb250ZW50O1xuICAgICAgICAgICAgZXhwb3J0QnRuLnRleHRDb250ZW50ID0gJ0V4cG9ydGluZy4uLic7XG5cbiAgICAgICAgICAgIGNvbnN0IGV4cG9ydGVkUGF0aCA9IGF3YWl0IHRoaXMuZXhwb3J0TG9ncygpO1xuICAgICAgICAgICAgaWYgKGV4cG9ydGVkUGF0aCkge1xuICAgICAgICAgICAgICAgIGV4cG9ydEJ0bi50ZXh0Q29udGVudCA9ICdFeHBvcnRlZCEnO1xuICAgICAgICAgICAgICAgIGF3YWl0IFBsYXRmb3JtTWFuYWdlci5jdXJyZW50Lm9wZW5QYXRoKGpvaW4ocHJvcGVydGllcy5lbmhhbmNlZFBhdGgsIFwibG9nc1wiKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGV4cG9ydEJ0bi50ZXh0Q29udGVudCA9ICdGYWlsZWQnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGV4cG9ydEJ0bi50ZXh0Q29udGVudCA9IG9yaWdpbmFsVGV4dCwgMjAwMCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNsb3NlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgb3ZlcmxheS5yZW1vdmUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXJpYWxpemVMb2dzKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvZ3MubWFwKGxvZyA9PiBgWyR7bG9nLnRpbWVzdGFtcH1dIFske2xvZy5sZXZlbH1dICR7bG9nLm1lc3NhZ2V9YCkuam9pbignXFxuJyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBlc2NhcGVIdG1sKHVuc2FmZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHVuc2FmZVxuICAgICAgICAgICAgIC5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIilcclxuICAgICAgICAgICAgIC5yZXBsYWNlKC88L2csIFwiJmx0O1wiKVxyXG4gICAgICAgICAgICAgLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpXHJcbiAgICAgICAgICAgICAucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIilcclxuICAgICAgICAgICAgIC5yZXBsYWNlKC8nL2csIFwiJiMwMzk7XCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMb2dNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiIsICJpbXBvcnQgeyByZWdpc3RlclBsdWdpbiB9IGZyb20gJ0BjYXBhY2l0b3IvY29yZSc7XG5cbmltcG9ydCB0eXBlIHsgRmlsZVBpY2tlclBsdWdpbiB9IGZyb20gJy4vZGVmaW5pdGlvbnMnO1xuLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9jYXBhd2Vzb21lLXRlYW0vY2FwYWNpdG9yLXBsdWdpbnMvaXNzdWVzLzE0XG5pbXBvcnQgKiBhcyB3ZWIgZnJvbSAnLi93ZWInO1xuXG5jb25zdCBGaWxlUGlja2VyID0gcmVnaXN0ZXJQbHVnaW48RmlsZVBpY2tlclBsdWdpbj4oJ0ZpbGVQaWNrZXInLCB7XG4gIHdlYjogKCkgPT4gbmV3IHdlYi5GaWxlUGlja2VyV2ViKCksXG59KTtcblxuZXhwb3J0ICogZnJvbSAnLi9kZWZpbml0aW9ucyc7XG5leHBvcnQgeyBGaWxlUGlja2VyIH07XG4iLCAiaW1wb3J0IHsgV2ViUGx1Z2luIH0gZnJvbSAnQGNhcGFjaXRvci9jb3JlJztcblxuaW1wb3J0IHR5cGUge1xuICBDb252ZXJ0SGVpY1RvSnBlZ09wdGlvbnMsXG4gIENvbnZlcnRIZWljVG9KcGVnUmVzdWx0LFxuICBDb3B5RmlsZU9wdGlvbnMsXG4gIEZpbGVQaWNrZXJQbHVnaW4sXG4gIFBlcm1pc3Npb25TdGF0dXMsXG4gIFBpY2tEaXJlY3RvcnlSZXN1bHQsXG4gIFBpY2tGaWxlc09wdGlvbnMsXG4gIFBpY2tGaWxlc1Jlc3VsdCxcbiAgUGlja0ltYWdlc09wdGlvbnMsXG4gIFBpY2tJbWFnZXNSZXN1bHQsXG4gIFBpY2tNZWRpYU9wdGlvbnMsXG4gIFBpY2tNZWRpYVJlc3VsdCxcbiAgUGlja1ZpZGVvc09wdGlvbnMsXG4gIFBpY2tWaWRlb3NSZXN1bHQsXG4gIFBpY2tlZEZpbGUsXG4gIFJlcXVlc3RQZXJtaXNzaW9uc09wdGlvbnMsXG59IGZyb20gJy4vZGVmaW5pdGlvbnMnO1xuXG5leHBvcnQgY2xhc3MgRmlsZVBpY2tlcldlYiBleHRlbmRzIFdlYlBsdWdpbiBpbXBsZW1lbnRzIEZpbGVQaWNrZXJQbHVnaW4ge1xuICBwdWJsaWMgcmVhZG9ubHkgRVJST1JfUElDS19GSUxFX0NBTkNFTEVEID0gJ3BpY2tGaWxlcyBjYW5jZWxlZC4nO1xuXG4gIHB1YmxpYyBhc3luYyBjaGVja1Blcm1pc3Npb25zKCk6IFByb21pc2U8UGVybWlzc2lvblN0YXR1cz4ge1xuICAgIHRocm93IHRoaXMudW5pbXBsZW1lbnRlZCgnTm90IGltcGxlbWVudGVkIG9uIHdlYi4nKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBjb252ZXJ0SGVpY1RvSnBlZyhcbiAgICBfb3B0aW9uczogQ29udmVydEhlaWNUb0pwZWdPcHRpb25zLFxuICApOiBQcm9taXNlPENvbnZlcnRIZWljVG9KcGVnUmVzdWx0PiB7XG4gICAgdGhyb3cgdGhpcy51bmltcGxlbWVudGVkKCdOb3QgaW1wbGVtZW50ZWQgb24gd2ViLicpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGNvcHlGaWxlKF9vcHRpb25zOiBDb3B5RmlsZU9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0aHJvdyB0aGlzLnVuaW1wbGVtZW50ZWQoJ05vdCBpbXBsZW1lbnRlZCBvbiB3ZWIuJyk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcGlja0ZpbGVzKG9wdGlvbnM/OiBQaWNrRmlsZXNPcHRpb25zKTogUHJvbWlzZTxQaWNrRmlsZXNSZXN1bHQ+IHtcbiAgICBjb25zdCBwaWNrZWRGaWxlcyA9IGF3YWl0IHRoaXMub3BlbkZpbGVQaWNrZXIob3B0aW9ucyk7XG4gICAgaWYgKCFwaWNrZWRGaWxlcykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKHRoaXMuRVJST1JfUElDS19GSUxFX0NBTkNFTEVEKTtcbiAgICB9XG4gICAgY29uc3QgcmVzdWx0OiBQaWNrRmlsZXNSZXN1bHQgPSB7XG4gICAgICBmaWxlczogW10sXG4gICAgfTtcbiAgICBmb3IgKGNvbnN0IHBpY2tlZEZpbGUgb2YgcGlja2VkRmlsZXMpIHtcbiAgICAgIGNvbnN0IGZpbGU6IFBpY2tlZEZpbGUgPSB7XG4gICAgICAgIGJsb2I6IHBpY2tlZEZpbGUsXG4gICAgICAgIG1vZGlmaWVkQXQ6IHBpY2tlZEZpbGUubGFzdE1vZGlmaWVkLFxuICAgICAgICBtaW1lVHlwZTogdGhpcy5nZXRNaW1lVHlwZUZyb21VcmwocGlja2VkRmlsZSksXG4gICAgICAgIG5hbWU6IHRoaXMuZ2V0TmFtZUZyb21VcmwocGlja2VkRmlsZSksXG4gICAgICAgIHBhdGg6IHVuZGVmaW5lZCxcbiAgICAgICAgc2l6ZTogdGhpcy5nZXRTaXplRnJvbVVybChwaWNrZWRGaWxlKSxcbiAgICAgIH07XG4gICAgICBpZiAob3B0aW9ucz8ucmVhZERhdGEpIHtcbiAgICAgICAgZmlsZS5kYXRhID0gYXdhaXQgdGhpcy5nZXREYXRhRnJvbUZpbGUocGlja2VkRmlsZSk7XG4gICAgICB9XG4gICAgICByZXN1bHQuZmlsZXMucHVzaChmaWxlKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBwaWNrRGlyZWN0b3J5KCk6IFByb21pc2U8UGlja0RpcmVjdG9yeVJlc3VsdD4ge1xuICAgIHRocm93IHRoaXMudW5pbXBsZW1lbnRlZCgnTm90IGltcGxlbWVudGVkIG9uIHdlYi4nKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBwaWNrSW1hZ2VzKFxuICAgIG9wdGlvbnM/OiBQaWNrSW1hZ2VzT3B0aW9ucyxcbiAgKTogUHJvbWlzZTxQaWNrSW1hZ2VzUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucGlja0ZpbGVzKHsgdHlwZXM6IFsnaW1hZ2UvKiddLCAuLi5vcHRpb25zIH0pO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHBpY2tNZWRpYShvcHRpb25zPzogUGlja01lZGlhT3B0aW9ucyk6IFByb21pc2U8UGlja01lZGlhUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucGlja0ZpbGVzKHsgdHlwZXM6IFsnaW1hZ2UvKicsICd2aWRlby8qJ10sIC4uLm9wdGlvbnMgfSk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcGlja1ZpZGVvcyhcbiAgICBvcHRpb25zPzogUGlja1ZpZGVvc09wdGlvbnMsXG4gICk6IFByb21pc2U8UGlja1ZpZGVvc1Jlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnBpY2tGaWxlcyh7IHR5cGVzOiBbJ3ZpZGVvLyonXSwgLi4ub3B0aW9ucyB9KTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyByZXF1ZXN0UGVybWlzc2lvbnMoXG4gICAgX29wdGlvbnM/OiBSZXF1ZXN0UGVybWlzc2lvbnNPcHRpb25zLFxuICApOiBQcm9taXNlPFBlcm1pc3Npb25TdGF0dXM+IHtcbiAgICB0aHJvdyB0aGlzLnVuaW1wbGVtZW50ZWQoJ05vdCBpbXBsZW1lbnRlZCBvbiB3ZWIuJyk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIG9wZW5GaWxlUGlja2VyKFxuICAgIG9wdGlvbnM/OiBQaWNrRmlsZXNPcHRpb25zLFxuICApOiBQcm9taXNlPEZpbGVbXSB8IHVuZGVmaW5lZD4ge1xuICAgIGNvbnN0IGFjY2VwdCA9IG9wdGlvbnM/LnR5cGVzPy5qb2luKCcsJykgfHwgJyc7XG4gICAgY29uc3QgbGltaXQgPSBvcHRpb25zPy5saW1pdCA9PT0gdW5kZWZpbmVkID8gMCA6IG9wdGlvbnMubGltaXQ7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgbGV0IG9uQ2hhbmdlRmlyZWQgPSBmYWxzZTtcbiAgICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgIGlucHV0LnR5cGUgPSAnZmlsZSc7XG4gICAgICBpbnB1dC5hY2NlcHQgPSBhY2NlcHQ7XG4gICAgICBpbnB1dC5tdWx0aXBsZSA9IGxpbWl0ID09PSAwO1xuXG4gICAgICBjb25zdCBoYXNDYW5jZWxFdmVudCA9ICdvbmNhbmNlbCcgaW4gaW5wdXQ7XG5cbiAgICAgIGNvbnN0IG9uQ2hhbmdlSGFuZGxlciA9ICgpID0+IHtcbiAgICAgICAgb25DaGFuZ2VGaXJlZCA9IHRydWU7XG4gICAgICAgIHJlbW92ZUFsbExpc3RlbmVycygpO1xuXG4gICAgICAgIGNvbnN0IGZpbGVzID0gQXJyYXkuZnJvbShpbnB1dC5maWxlcyB8fCBbXSk7XG4gICAgICAgIHJlc29sdmUoZmlsZXMpO1xuICAgICAgfTtcbiAgICAgIGNvbnN0IG9uQ2FuY2VsSGFuZGxlciA9ICgpID0+IHtcbiAgICAgICAgcmVtb3ZlQWxsTGlzdGVuZXJzKCk7XG4gICAgICAgIHJlc29sdmUodW5kZWZpbmVkKTtcbiAgICAgIH07XG4gICAgICBjb25zdCBvbkZvY3VzSGFuZGxlciA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgYXdhaXQgdGhpcy53YWl0KDUwMCk7XG4gICAgICAgIGlmIChvbkNoYW5nZUZpcmVkKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHJlbW92ZUFsbExpc3RlbmVycygpO1xuICAgICAgICByZXNvbHZlKHVuZGVmaW5lZCk7XG4gICAgICB9O1xuICAgICAgY29uc3QgcmVtb3ZlQWxsTGlzdGVuZXJzID0gKCkgPT4ge1xuICAgICAgICBpbnB1dC5yZW1vdmVFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBvbkNoYW5nZUhhbmRsZXIpO1xuICAgICAgICBpZiAoaGFzQ2FuY2VsRXZlbnQpIHtcbiAgICAgICAgICBpbnB1dC5yZW1vdmVFdmVudExpc3RlbmVyKCdjYW5jZWwnLCBvbkNhbmNlbEhhbmRsZXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1cycsIG9uRm9jdXNIYW5kbGVyKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgb25DaGFuZ2VIYW5kbGVyLCB7IG9uY2U6IHRydWUgfSk7XG4gICAgICBpZiAoaGFzQ2FuY2VsRXZlbnQpIHtcbiAgICAgICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2FuY2VsJywgb25DYW5jZWxIYW5kbGVyLCB7IG9uY2U6IHRydWUgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBXb3JrYXJvdW5kIHRvIGRldGVjdCB3aGVuIENhbmNlbCBpcyBzZWxlY3RlZCBpbiB0aGUgRmlsZSBTZWxlY3Rpb24gZGlhbG9nIGJveC5cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgb25Gb2N1c0hhbmRsZXIsIHsgb25jZTogdHJ1ZSB9KTtcbiAgICAgIH1cbiAgICAgIGlucHV0LmNsaWNrKCk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGdldERhdGFGcm9tRmlsZShmaWxlOiBGaWxlKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xuICAgICAgcmVhZGVyLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdHlwZW9mIHJlYWRlci5yZXN1bHQgPT09ICdzdHJpbmcnID8gcmVhZGVyLnJlc3VsdCA6ICcnO1xuICAgICAgICBjb25zdCBzcGxpdHRlZFJlc3VsdCA9IHJlc3VsdC5zcGxpdCgnYmFzZTY0LCcpO1xuICAgICAgICBjb25zdCBiYXNlNjQgPSBzcGxpdHRlZFJlc3VsdFsxXSB8fCAnJztcbiAgICAgICAgcmVzb2x2ZShiYXNlNjQpO1xuICAgICAgfTtcbiAgICAgIHJlYWRlci5vbmVycm9yID0gZXJyb3IgPT4ge1xuICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0TmFtZUZyb21VcmwoZmlsZTogRmlsZSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGZpbGUubmFtZTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0TWltZVR5cGVGcm9tVXJsKGZpbGU6IEZpbGUpOiBzdHJpbmcge1xuICAgIHJldHVybiBmaWxlLnR5cGU7XG4gIH1cblxuICBwcml2YXRlIGdldFNpemVGcm9tVXJsKGZpbGU6IEZpbGUpOiBudW1iZXIge1xuICAgIHJldHVybiBmaWxlLnNpemU7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIHdhaXQoZGVsYXlNczogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCBkZWxheU1zKSk7XG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O01BQVcsZUFrQkUsb0JBUUEsZUN6QkEsaUJBMkpBLHFCQzNKQSxXQVNBLGdCQ0xBLFdDSVAsUUFPQSxRQUNPLDJCQTBEQSxrQkFRQSxrQkFjUCxzQkFjQSxnQkE4Qk8sa0JBd0NBLHdCQWlGQSxlQVFGLGlCQTBCQSxlQWVFLHFCQWNBOzs7QUpwVWIsT0FBQyxTQUFVQSxnQkFBZTtBQU90QixRQUFBQSxlQUFjLGVBQWUsSUFBSTtBQVFqQyxRQUFBQSxlQUFjLGFBQWEsSUFBSTtNQUNuQyxHQUFHLGtCQUFrQixnQkFBZ0IsQ0FBQSxFQUFHO0FBQ2pDLE1BQU0scUJBQU4sY0FBaUMsTUFBTTtRQUMxQyxZQUFZLFNBQVMsTUFBTSxNQUFNO0FBQzdCLGdCQUFNLE9BQU87QUFDYixlQUFLLFVBQVU7QUFDZixlQUFLLE9BQU87QUFDWixlQUFLLE9BQU87UUFDcEI7TUFDQTtBQUNPLE1BQU0sZ0JBQWdCLENBQUMsUUFBUTtBQUNsQyxZQUFJLElBQUk7QUFDUixZQUFJLFFBQVEsUUFBUSxRQUFRLFNBQVMsU0FBUyxJQUFJLGVBQWU7QUFDN0QsaUJBQU87UUFDZixZQUNjLE1BQU0sS0FBSyxRQUFRLFFBQVEsUUFBUSxTQUFTLFNBQVMsSUFBSSxZQUFZ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QTtBQUFBLFVBQ0o7QUFDQSx3QkFBYyxZQUFZLFlBQVk7QUFBQSxRQUMxQztBQUVBLHlCQUFTLFVBQVUsYUFBYSxlQUFlLFVBQVUsY0FBYztBQUN2RSx5QkFBUyxVQUFVLGVBQWUsaUJBQWlCLFVBQVUsY0FBYztBQUMzRSx5QkFBUyxVQUFVLDJCQUEyQiw0QkFBNEIsVUFBVSxjQUFjO0FBQ2xHLHlCQUFTLFVBQVUsa0JBQWtCLHlCQUF5QixVQUFVLGNBQWM7QUFFdEYsd0JBQWdCLGVBQWUsTUFBTTtBQUNqQyw2QkFBVyxTQUFTO0FBQUEsUUFDeEIsR0FBRyxrQkFBa0I7QUFFckIsd0JBQWdCLGlCQUFpQixZQUFZO0FBQ3pDLGdCQUFNLGVBQWUsTUFBTSxtQkFBVyxXQUFXO0FBQ2pELGNBQUksY0FBYztBQUNkLGtCQUFNLGdCQUFnQixRQUFRLGFBQVMsbUJBQUssbUJBQVcsY0FBYyxNQUFNLENBQUM7QUFBQSxVQUNoRjtBQUFBLFFBQ0osR0FBRyxvQkFBb0I7QUFFdkIsd0JBQWdCLDRCQUE0QixZQUFZO0FBQ3BELGdCQUFNLGtDQUFrQztBQUN4Qyx3Q0FBOEI7QUFBQSxRQUNsQyxHQUFHLGdDQUFnQztBQUVuQyx3QkFBZ0IseUJBQXlCLFlBQVk7QUFDakQsZ0JBQU0sZ0JBQWdCLFFBQVEsU0FBUyxtQkFBVyxZQUFZO0FBQUEsUUFDbEUsR0FBRyw2QkFBNkI7QUFBQSxNQUNwQztBQUFBLElBQ0osQ0FBQyxFQUFFLE1BQU0sU0FBTyx1QkFBTyxNQUFNLG9DQUFvQyxHQUFHLENBQUM7QUFBQSxFQUN6RTtBQUVBLFdBQVMsZUFBdUI7QUFDNUIsV0FBTztBQUFBO0FBQUE7QUFBQSxFQUdYO0FBRUEsV0FBUyxlQUF1QjtBQUM1QixXQUFPO0FBQUE7QUFBQTtBQUFBLEVBR1g7QUFFQSxXQUFTLGdCQUF3QjtBQUM3QixXQUFPO0FBQUE7QUFBQSxFQUVYOyIsCiAgIm5hbWVzIjogWyJFeGNlcHRpb25Db2RlIiwgInJlZ2lzdGVyUGx1Z2luIiwgInAiLCAicmVzb2x2ZSIsICJoZWFkZXJzIiwgIlN5c3RlbUJhcnNTdHlsZSIsICJTeXN0ZW1CYXJUeXBlIiwgIkRpcmVjdG9yeSIsICJFbmNvZGluZyIsICJyZXNvbHZlIiwgImVudHJ5IiwgInRvUGF0aCIsICJjdGltZSIsICJ3ZWJfZXhwb3J0cyIsICJpbml0X3dlYiIsICJyZXNvbHZlIiwgInJlc29sdmUiLCAiam9pbiIsICJiYXNlbmFtZSIsICJ3ZWJfZXhwb3J0cyIsICJpbml0X3dlYiIsICJCcm93c2VyIiwgImYiLCAiQnJvd3NlciIsICJyZXNvbHZlIiwgImYiLCAicmVzb2x2ZSIsICJpbXBvcnRfcGF0aCIsICJpbXBvcnRfcGF0aCIsICJyZXNvbHZlIl0KfQo=
