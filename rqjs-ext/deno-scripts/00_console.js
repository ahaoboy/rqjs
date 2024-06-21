(() => {
  // node_modules/.pnpm/deno-console@0.1.3/node_modules/deno-console/dist/index.js
  function isAnyArrayBuffer(value) {
    return value instanceof ArrayBuffer || value instanceof SharedArrayBuffer;
  }
  function isArgumentsObject(value) {
    return Object.prototype.toString.call(value) === "[object Arguments]";
  }
  function isArrayBuffer(value) {
    return value instanceof ArrayBuffer;
  }
  function isAsyncFunction(value) {
    return typeof value === "function" && value.constructor && value.constructor.name === "AsyncFunction";
  }
  function isBigIntObject(value) {
    return typeof value === "object" && value !== null && typeof value.bigIntValue === "bigint";
  }
  function isBooleanObject(value) {
    return typeof value === "object" && value !== null && typeof value.valueOf() === "boolean";
  }
  function isBoxedPrimitive(value) {
    return typeof value === "object" && value !== null && Object(value) === value;
  }
  function isDataView(value) {
    return value instanceof DataView;
  }
  function isDate(value) {
    return value instanceof Date;
  }
  function isGeneratorFunction(value) {
    return typeof value === "function" && value.constructor && value.constructor.name === "GeneratorFunction";
  }
  function isGeneratorObject(value) {
    return typeof value === "object" && typeof value.next === "function" && typeof value.throw === "function";
  }
  function isMapIterator(value) {
    return typeof value === "object" && value !== null && typeof value.next === "function";
  }
  function isModuleNamespaceObject(value) {
    return typeof value === "object" && value !== null && typeof value === "object" && "exports" in value;
  }
  function isNativeError(value) {
    return typeof value === "object" && value !== null && value instanceof Error;
  }
  function isNumberObject(value) {
    return typeof value === "object" && value !== null && value instanceof Number;
  }
  function isPromise(value) {
    return typeof value === "object" && value !== null && typeof value.then === "function";
  }
  function isProxy(value) {
    return typeof value === "function" && typeof value.revocable === "function";
  }
  function isMap(value) {
    return value instanceof Map;
  }
  function isRegExp(value) {
    return value instanceof RegExp;
  }
  function isSet(value) {
    return value instanceof Set;
  }
  function isSetIterator(value) {
    return typeof value === "object" && value !== null && typeof value.next === "function";
  }
  function isSharedArrayBuffer(value) {
    return value instanceof SharedArrayBuffer;
  }
  function isStringObject(value) {
    return typeof value === "object" && value !== null && typeof value.valueOf === "function" && typeof value.toString === "function";
  }
  function isSymbolObject(value) {
    return typeof value === "object" && value !== null && typeof value.valueOf === "function" && typeof value.toString === "function";
  }
  function isTypedArray(value) {
    return ArrayBuffer.isView(value);
  }
  function isWeakMap(value) {
    return value instanceof WeakMap;
  }
  function isWeakSet(value) {
    return value instanceof WeakSet;
  }
  var core_default = () => {
    const ALL_PROPERTIES = 0;
    const ONLY_WRITABLE = 1;
    const ONLY_ENUMERABLE = 2;
    const ONLY_CONFIGURABLE = 4;
    const ONLY_ENUM_WRITABLE = 6;
    const SKIP_STRINGS = 8;
    const SKIP_SYMBOLS = 16;
    const isNumericLookup = {};
    function isArrayIndex(value) {
      switch (typeof value) {
        case "number":
          return value >= 0 && (value | 0) === value;
        case "string": {
          const result = isNumericLookup[value];
          if (result !== void 0) {
            return result;
          }
          const length = value.length;
          if (length === 0) {
            return isNumericLookup[value] = false;
          }
          let ch = 0;
          let i = 0;
          for (; i < length; ++i) {
            ch = value.charCodeAt(i);
            if (i === 0 && ch === 48 && length > 1 || ch < 48 || ch > 57) {
              return isNumericLookup[value] = false;
            }
          }
          return isNumericLookup[value] = true;
        }
        default:
          return false;
      }
    }
    function getOwnNonIndexProperties(obj, filter) {
      let allProperties = [
        ...Object.getOwnPropertyNames(obj),
        ...Object.getOwnPropertySymbols(obj)
      ];
      if (Array.isArray(obj)) {
        allProperties = allProperties.filter((k) => !isArrayIndex(k));
      }
      if (filter === ALL_PROPERTIES) {
        return allProperties;
      }
      const result = [];
      for (const key of allProperties) {
        const desc = Object.getOwnPropertyDescriptor(obj, key);
        if (desc === void 0) {
          continue;
        }
        if (filter & ONLY_WRITABLE && !desc.writable) {
          continue;
        }
        if (filter & ONLY_ENUMERABLE && !desc.enumerable) {
          continue;
        }
        if (filter & ONLY_CONFIGURABLE && !desc.configurable) {
          continue;
        }
        if (filter & SKIP_STRINGS && typeof key === "string") {
          continue;
        }
        if (filter & SKIP_SYMBOLS && typeof key === "symbol") {
          continue;
        }
        result.push(key);
      }
      return result;
    }
    const internals = {};
    const primordials = {};
    primordials.ArrayBufferPrototypeGetByteLength = (that) => {
      if (!ArrayBuffer.isView(that)) {
        throw new Error();
      }
      that.byteLength;
    };
    primordials.ArrayPrototypePushApply = (that, ...args) => that.push(...args);
    primordials.MapPrototypeGetSize = (that) => that.size;
    primordials.RegExpPrototypeSymbolReplace = (that, ...args) => RegExp.prototype[Symbol.replace].call(that, ...args);
    primordials.SafeArrayIterator = class SafeArrayIterator {
      constructor(array) {
        this.array = [...array];
        this.index = 0;
      }
      next() {
        if (this.index < this.array.length) {
          return { value: this.array[this.index++], done: false };
        } else {
          return { done: true };
        }
      }
      [Symbol.iterator]() {
        return this;
      }
    };
    primordials.SafeMap = Map;
    primordials.SafeMapIterator = class SafeMapIterator {
      get [Symbol.toStringTag]() {
        return "Map Iterator";
      }
      constructor(map) {
        this.map = map;
        this.keys = Array.from(map.keys());
        this.index = 0;
      }
      next() {
        if (this.index < this.keys.length) {
          const key = this.keys[this.index];
          const value = this.map.get(key);
          this.index++;
          return { value: [key, value], done: false };
        } else {
          return { done: true };
        }
      }
      [Symbol.iterator]() {
        return this;
      }
    };
    primordials.SafeRegExp = RegExp;
    primordials.SafeSet = Set;
    primordials.SafeSetIterator = class SafeSetIterator {
      get [Symbol.toStringTag]() {
        return "Set Iterator";
      }
      constructor(set) {
        this.set = set;
        this.values = Array.from(set);
        this.index = 0;
      }
      next() {
        if (this.index < this.values.length) {
          const value = this.values[this.index];
          this.index++;
          return { value, done: false };
        } else {
          return { done: true };
        }
      }
      [Symbol.iterator]() {
        return this;
      }
    };
    primordials.SafeStringIterator = class SafeStringIterator {
      get [Symbol.toStringTag]() {
        return "String Iterator";
      }
      constructor(str) {
        this.str = str;
        this.index = 0;
      }
      next() {
        if (this.index < this.str.length) {
          const char = this.str[this.index];
          this.index++;
          return { value: char, done: false };
        } else {
          return { done: true };
        }
      }
      [Symbol.iterator]() {
        return this;
      }
    };
    primordials.SetPrototypeGetSize = (that) => that.size;
    primordials.SymbolPrototypeGetDescription = (that) => that.description;
    primordials.TypedArrayPrototypeGetByteLength = (that) => that.byteLength;
    primordials.TypedArrayPrototypeGetLength = (that) => that.length;
    primordials.TypedArrayPrototypeGetSymbolToStringTag = (that) => {
      if (ArrayBuffer.isView(that)) {
        return that[Symbol.toStringTag];
      }
    };
    primordials.ObjectPrototype = Object.prototype;
    primordials.ObjectPrototypeIsPrototypeOf = (that, ...args) => Object.prototype.isPrototypeOf.call(that, ...args);
    primordials.ObjectPrototypePropertyIsEnumerable = (that, ...args) => Object.prototype.propertyIsEnumerable.call(that, ...args);
    primordials.ObjectPrototypeToString = (that, ...args) => Object.prototype.toString.call(that, ...args);
    primordials.ObjectAssign = (...args) => Object.assign(...args);
    primordials.ObjectGetOwnPropertyDescriptor = (...args) => Object.getOwnPropertyDescriptor(...args);
    primordials.ObjectGetOwnPropertyNames = (...args) => Object.getOwnPropertyNames(...args);
    primordials.ObjectGetOwnPropertySymbols = (...args) => Object.getOwnPropertySymbols(...args);
    primordials.ObjectHasOwn = (...args) => Object.hasOwn(...args);
    primordials.ObjectIs = (...args) => Object.is(...args);
    primordials.ObjectCreate = (...args) => Object.create(...args);
    primordials.ObjectDefineProperty = (...args) => Object.defineProperty(...args);
    primordials.ObjectFreeze = (...args) => Object.freeze(...args);
    primordials.ObjectGetPrototypeOf = (...args) => Object.getPrototypeOf(...args);
    primordials.ObjectSetPrototypeOf = (...args) => Object.setPrototypeOf(...args);
    primordials.ObjectKeys = (...args) => Object.keys(...args);
    primordials.ObjectFromEntries = (...args) => Object.fromEntries(...args);
    primordials.ObjectValues = (...args) => Object.values(...args);
    primordials.FunctionPrototypeBind = (that, ...args) => Function.prototype.bind.call(that, ...args);
    primordials.FunctionPrototypeCall = (that, ...args) => Function.prototype.call.call(that, ...args);
    primordials.FunctionPrototypeToString = (that, ...args) => Function.prototype.toString.call(that, ...args);
    primordials.Array = Array;
    primordials.ArrayPrototypeFill = (that, ...args) => Array.prototype.fill.call(that, ...args);
    primordials.ArrayPrototypeFind = (that, ...args) => Array.prototype.find.call(that, ...args);
    primordials.ArrayPrototypePop = (that, ...args) => Array.prototype.pop.call(that, ...args);
    primordials.ArrayPrototypePush = (that, ...args) => Array.prototype.push.call(that, ...args);
    primordials.ArrayPrototypeShift = (that, ...args) => Array.prototype.shift.call(that, ...args);
    primordials.ArrayPrototypeUnshift = (that, ...args) => Array.prototype.unshift.call(that, ...args);
    primordials.ArrayPrototypeSlice = (that, ...args) => Array.prototype.slice.call(that, ...args);
    primordials.ArrayPrototypeSort = (that, ...args) => Array.prototype.sort.call(that, ...args);
    primordials.ArrayPrototypeSplice = (that, ...args) => Array.prototype.splice.call(that, ...args);
    primordials.ArrayPrototypeIncludes = (that, ...args) => Array.prototype.includes.call(that, ...args);
    primordials.ArrayPrototypeJoin = (that, ...args) => Array.prototype.join.call(that, ...args);
    primordials.ArrayPrototypeForEach = (that, ...args) => Array.prototype.forEach.call(that, ...args);
    primordials.ArrayPrototypeFilter = (that, ...args) => Array.prototype.filter.call(that, ...args);
    primordials.ArrayPrototypeMap = (that, ...args) => Array.prototype.map.call(that, ...args);
    primordials.ArrayPrototypeReduce = (that, ...args) => Array.prototype.reduce.call(that, ...args);
    primordials.ArrayIsArray = (...args) => Array.isArray(...args);
    primordials.Number = Number;
    primordials.NumberPrototypeToString = (that, ...args) => Number.prototype.toString.call(that, ...args);
    primordials.NumberPrototypeValueOf = (that, ...args) => Number.prototype.valueOf.call(that, ...args);
    primordials.NumberIsInteger = (...args) => Number.isInteger(...args);
    primordials.NumberParseInt = (...args) => Number.parseInt(...args);
    primordials.Boolean = Boolean;
    primordials.BooleanPrototypeValueOf = (that, ...args) => Boolean.prototype.valueOf.call(that, ...args);
    primordials.String = String;
    primordials.StringPrototypeCharCodeAt = (that, ...args) => String.prototype.charCodeAt.call(that, ...args);
    primordials.StringPrototypeCodePointAt = (that, ...args) => String.prototype.codePointAt.call(that, ...args);
    primordials.StringPrototypeEndsWith = (that, ...args) => String.prototype.endsWith.call(that, ...args);
    primordials.StringPrototypeIncludes = (that, ...args) => String.prototype.includes.call(that, ...args);
    primordials.StringPrototypeIndexOf = (that, ...args) => String.prototype.indexOf.call(that, ...args);
    primordials.StringPrototypeLastIndexOf = (that, ...args) => String.prototype.lastIndexOf.call(that, ...args);
    primordials.StringPrototypeMatch = (that, ...args) => String.prototype.match.call(that, ...args);
    primordials.StringPrototypeNormalize = (that, ...args) => String.prototype.normalize.call(that, ...args);
    primordials.StringPrototypePadEnd = (that, ...args) => String.prototype.padEnd.call(that, ...args);
    primordials.StringPrototypePadStart = (that, ...args) => String.prototype.padStart.call(that, ...args);
    primordials.StringPrototypeRepeat = (that, ...args) => String.prototype.repeat.call(that, ...args);
    primordials.StringPrototypeReplace = (that, ...args) => String.prototype.replace.call(that, ...args);
    primordials.StringPrototypeReplaceAll = (that, ...args) => String.prototype.replaceAll.call(that, ...args);
    primordials.StringPrototypeSlice = (that, ...args) => String.prototype.slice.call(that, ...args);
    primordials.StringPrototypeSplit = (that, ...args) => String.prototype.split.call(that, ...args);
    primordials.StringPrototypeStartsWith = (that, ...args) => String.prototype.startsWith.call(that, ...args);
    primordials.StringPrototypeTrim = (that, ...args) => String.prototype.trim.call(that, ...args);
    primordials.StringPrototypeToLowerCase = (that, ...args) => String.prototype.toLowerCase.call(that, ...args);
    primordials.StringPrototypeValueOf = (that, ...args) => String.prototype.valueOf.call(that, ...args);
    primordials.Symbol = Symbol;
    primordials.SymbolPrototypeToString = (that, ...args) => Symbol.prototype.toString.call(that, ...args);
    primordials.SymbolPrototypeValueOf = (that, ...args) => Symbol.prototype.valueOf.call(that, ...args);
    primordials.SymbolFor = (...args) => Symbol.for(...args);
    primordials.SymbolHasInstance = Symbol.hasInstance;
    primordials.SymbolIterator = Symbol.iterator;
    primordials.SymbolToStringTag = Symbol.toStringTag;
    primordials.DatePrototype = Date.prototype;
    primordials.DatePrototypeToISOString = (that, ...args) => Date.prototype.toISOString.call(that, ...args);
    primordials.DatePrototypeGetTime = (that, ...args) => Date.prototype.getTime.call(that, ...args);
    primordials.DateNow = (...args) => Date.now(...args);
    primordials.RegExpPrototypeExec = (that, ...args) => RegExp.prototype.exec.call(that, ...args);
    primordials.RegExpPrototypeToString = (that, ...args) => RegExp.prototype.toString.call(that, ...args);
    primordials.RegExpPrototypeTest = (that, ...args) => RegExp.prototype.test.call(that, ...args);
    primordials.Error = Error;
    primordials.ErrorPrototype = Error.prototype;
    primordials.ErrorPrototypeToString = (that, ...args) => Error.prototype.toString.call(that, ...args);
    primordials.ErrorCaptureStackTrace = (...args) => Error.captureStackTrace(...args);
    primordials.AggregateErrorPrototype = AggregateError.prototype;
    primordials.MathAbs = (...args) => Math.abs(...args);
    primordials.MathFloor = (...args) => Math.floor(...args);
    primordials.MathMax = (...args) => Math.max(...args);
    primordials.MathMin = (...args) => Math.min(...args);
    primordials.MathRound = (...args) => Math.round(...args);
    primordials.MathSqrt = (...args) => Math.sqrt(...args);
    primordials.ArrayBufferIsView = (...args) => ArrayBuffer.isView(...args);
    primordials.Uint8Array = Uint8Array;
    primordials.MapPrototype = Map.prototype;
    primordials.MapPrototypeGet = (that, ...args) => Map.prototype.get.call(that, ...args);
    primordials.MapPrototypeSet = (that, ...args) => Map.prototype.set.call(that, ...args);
    primordials.MapPrototypeHas = (that, ...args) => Map.prototype.has.call(that, ...args);
    primordials.MapPrototypeDelete = (that, ...args) => Map.prototype.delete.call(that, ...args);
    primordials.MapPrototypeEntries = (that, ...args) => Map.prototype.entries.call(that, ...args);
    primordials.MapPrototypeForEach = (that, ...args) => Map.prototype.forEach.call(that, ...args);
    primordials.BigIntPrototypeValueOf = (that, ...args) => BigInt.prototype.valueOf.call(that, ...args);
    primordials.SetPrototype = Set.prototype;
    primordials.SetPrototypeHas = (that, ...args) => Set.prototype.has.call(that, ...args);
    primordials.SetPrototypeAdd = (that, ...args) => Set.prototype.add.call(that, ...args);
    primordials.SetPrototypeValues = (that, ...args) => Set.prototype.values.call(that, ...args);
    primordials.WeakMapPrototypeHas = (that, ...args) => WeakMap.prototype.has.call(that, ...args);
    primordials.WeakSetPrototypeHas = (that, ...args) => WeakSet.prototype.has.call(that, ...args);
    primordials.Proxy = Proxy;
    primordials.ReflectGet = (...args) => Reflect.get(...args);
    primordials.ReflectGetOwnPropertyDescriptor = (...args) => Reflect.getOwnPropertyDescriptor(...args);
    primordials.ReflectGetPrototypeOf = (...args) => Reflect.getPrototypeOf(...args);
    primordials.ReflectHas = (...args) => Reflect.has(...args);
    primordials.ReflectOwnKeys = (...args) => Reflect.ownKeys(...args);
    const ops = {
      op_get_non_index_property_names: getOwnNonIndexProperties,
      op_get_constructor_name(v) {
        return Object.prototype.toString.call(v).slice(8, -1);
      }
    };
    globalThis.Deno = {
      core: {
        ops,
        getPromiseDetails() {
          return [-1, Symbol("UNKNOWN")];
        },
        // TODO: support proxy details
        getProxyDetails() {
          return null;
        },
        isAnyArrayBuffer,
        isArgumentsObject,
        isArrayBuffer,
        isAsyncFunction,
        isBigIntObject,
        isBooleanObject,
        isBoxedPrimitive,
        isDataView,
        isDate,
        isGeneratorFunction,
        isGeneratorObject,
        isMap,
        isMapIterator,
        isModuleNamespaceObject,
        isNativeError,
        isNumberObject,
        isPromise,
        isProxy,
        isRegExp,
        isSet,
        isSetIterator,
        isSharedArrayBuffer,
        isStringObject,
        isSymbolObject,
        isTypedArray,
        isWeakMap,
        isWeakSet,
        op_get_non_index_property_names: getOwnNonIndexProperties
      }
    };
    globalThis.__bootstrap = {
      internals,
      primordials
    };
  };
  var console_default = (noColorStdout, noColorStderr) => {
    const core = globalThis.Deno.core;
    const primordials = globalThis.__bootstrap.primordials;
    const {
      isAnyArrayBuffer: isAnyArrayBuffer2,
      isArgumentsObject: isArgumentsObject2,
      isArrayBuffer: isArrayBuffer2,
      isAsyncFunction: isAsyncFunction2,
      isBigIntObject: isBigIntObject2,
      isBooleanObject: isBooleanObject2,
      isBoxedPrimitive: isBoxedPrimitive2,
      isDataView: isDataView2,
      isDate: isDate2,
      isGeneratorFunction: isGeneratorFunction2,
      isMap: isMap2,
      isMapIterator: isMapIterator2,
      isModuleNamespaceObject: isModuleNamespaceObject2,
      isNativeError: isNativeError2,
      isNumberObject: isNumberObject2,
      isPromise: isPromise2,
      isRegExp: isRegExp2,
      isSet: isSet2,
      isSetIterator: isSetIterator2,
      isStringObject: isStringObject2,
      isTypedArray: isTypedArray2,
      isWeakMap: isWeakMap2,
      isWeakSet: isWeakSet2
    } = core;
    const {
      op_get_constructor_name,
      op_get_non_index_property_names,
      op_preview_entries
    } = core;
    const {
      Array: Array2,
      ArrayBufferPrototypeGetByteLength,
      ArrayIsArray,
      ArrayPrototypeFill,
      ArrayPrototypeFilter,
      ArrayPrototypeFind,
      ArrayPrototypeForEach,
      ArrayPrototypeIncludes,
      ArrayPrototypeJoin,
      ArrayPrototypeMap,
      ArrayPrototypePop,
      ArrayPrototypePush,
      ArrayPrototypePushApply,
      ArrayPrototypeReduce,
      ArrayPrototypeShift,
      ArrayPrototypeSlice,
      ArrayPrototypeSort,
      ArrayPrototypeSplice,
      ArrayPrototypeUnshift,
      BigIntPrototypeValueOf,
      Boolean: Boolean2,
      BooleanPrototypeValueOf,
      DateNow,
      DatePrototypeGetTime,
      DatePrototypeToISOString,
      Error: Error2,
      ErrorCaptureStackTrace,
      ErrorPrototype,
      ErrorPrototypeToString,
      FunctionPrototypeBind,
      FunctionPrototypeCall,
      FunctionPrototypeToString,
      MapPrototypeDelete,
      MapPrototypeEntries,
      MapPrototypeForEach,
      MapPrototypeGet,
      MapPrototypeGetSize,
      MapPrototypeHas,
      MapPrototypeSet,
      MathAbs,
      MathFloor,
      MathMax,
      MathMin,
      MathRound,
      MathSqrt,
      Number: Number2,
      NumberIsInteger,
      NumberIsNaN,
      NumberParseInt,
      NumberPrototypeToString,
      NumberPrototypeValueOf,
      ObjectAssign,
      ObjectCreate,
      ObjectDefineProperty,
      ObjectFreeze,
      ObjectFromEntries,
      ObjectGetOwnPropertyDescriptor,
      ObjectGetOwnPropertyNames,
      ObjectGetOwnPropertySymbols,
      ObjectGetPrototypeOf,
      ObjectHasOwn,
      ObjectIs,
      ObjectKeys,
      ObjectPrototype,
      ObjectPrototypeIsPrototypeOf,
      ObjectPrototypePropertyIsEnumerable,
      ObjectSetPrototypeOf,
      ObjectValues,
      Proxy: Proxy2,
      ReflectGet,
      ReflectGetOwnPropertyDescriptor,
      ReflectGetPrototypeOf,
      ReflectHas,
      ReflectOwnKeys,
      RegExpPrototypeExec,
      RegExpPrototypeSymbolReplace,
      RegExpPrototypeTest,
      RegExpPrototypeToString,
      SafeArrayIterator,
      SafeMap,
      SafeMapIterator,
      SafeRegExp,
      SafeSet,
      SafeSetIterator,
      SafeStringIterator,
      SetPrototypeAdd,
      SetPrototypeGetSize,
      SetPrototypeHas,
      SetPrototypeValues,
      String: String2,
      StringPrototypeCharCodeAt,
      StringPrototypeCodePointAt,
      StringPrototypeEndsWith,
      StringPrototypeIncludes,
      StringPrototypeIndexOf,
      StringPrototypeLastIndexOf,
      StringPrototypeMatch,
      StringPrototypeNormalize,
      StringPrototypePadEnd,
      StringPrototypePadStart,
      StringPrototypeRepeat,
      StringPrototypeReplace,
      StringPrototypeReplaceAll,
      StringPrototypeSlice,
      StringPrototypeSplit,
      StringPrototypeStartsWith,
      StringPrototypeToLowerCase,
      StringPrototypeTrim,
      StringPrototypeValueOf,
      Symbol: Symbol2,
      SymbolFor,
      SymbolHasInstance,
      SymbolIterator,
      SymbolPrototypeGetDescription,
      SymbolPrototypeToString,
      SymbolPrototypeValueOf,
      SymbolToStringTag,
      TypedArrayPrototypeGetByteLength,
      TypedArrayPrototypeGetLength,
      Uint8Array: Uint8Array2
    } = primordials;
    class AssertionError extends Error2 {
      name = "AssertionError";
      constructor(message) {
        super(message);
      }
    }
    function assert(cond, msg = "Assertion failed.") {
      if (!cond) {
        throw new AssertionError(msg);
      }
    }
    const styles = {
      special: "cyan",
      number: "yellow",
      bigint: "yellow",
      boolean: "yellow",
      undefined: "grey",
      null: "bold",
      string: "green",
      symbol: "green",
      date: "magenta",
      // "name": intentionally not styling
      // TODO(BridgeAR): Highlight regular expressions properly.
      regexp: "red",
      module: "underline",
      internalError: "red",
      temporal: "magenta"
    };
    const defaultFG = 39;
    const defaultBG = 49;
    const colors = {
      reset: [0, 0],
      bold: [1, 22],
      dim: [2, 22],
      // Alias: faint
      italic: [3, 23],
      underline: [4, 24],
      blink: [5, 25],
      // Swap foreground and background colors
      inverse: [7, 27],
      // Alias: swapcolors, swapColors
      hidden: [8, 28],
      // Alias: conceal
      strikethrough: [9, 29],
      // Alias: strikeThrough, crossedout, crossedOut
      doubleunderline: [21, 24],
      // Alias: doubleUnderline
      black: [30, defaultFG],
      red: [31, defaultFG],
      green: [32, defaultFG],
      yellow: [33, defaultFG],
      blue: [34, defaultFG],
      magenta: [35, defaultFG],
      cyan: [36, defaultFG],
      white: [37, defaultFG],
      bgBlack: [40, defaultBG],
      bgRed: [41, defaultBG],
      bgGreen: [42, defaultBG],
      bgYellow: [43, defaultBG],
      bgBlue: [44, defaultBG],
      bgMagenta: [45, defaultBG],
      bgCyan: [46, defaultBG],
      bgWhite: [47, defaultBG],
      framed: [51, 54],
      overlined: [53, 55],
      gray: [90, defaultFG],
      // Alias: grey, blackBright
      redBright: [91, defaultFG],
      greenBright: [92, defaultFG],
      yellowBright: [93, defaultFG],
      blueBright: [94, defaultFG],
      magentaBright: [95, defaultFG],
      cyanBright: [96, defaultFG],
      whiteBright: [97, defaultFG],
      bgGray: [100, defaultBG],
      // Alias: bgGrey, bgBlackBright
      bgRedBright: [101, defaultBG],
      bgGreenBright: [102, defaultBG],
      bgYellowBright: [103, defaultBG],
      bgBlueBright: [104, defaultBG],
      bgMagentaBright: [105, defaultBG],
      bgCyanBright: [106, defaultBG],
      bgWhiteBright: [107, defaultBG]
    };
    function defineColorAlias(target, alias) {
      ObjectDefineProperty(colors, alias, {
        get() {
          return this[target];
        },
        set(value) {
          this[target] = value;
        },
        configurable: true,
        enumerable: false
      });
    }
    defineColorAlias("gray", "grey");
    defineColorAlias("gray", "blackBright");
    defineColorAlias("bgGray", "bgGrey");
    defineColorAlias("bgGray", "bgBlackBright");
    defineColorAlias("dim", "faint");
    defineColorAlias("strikethrough", "crossedout");
    defineColorAlias("strikethrough", "strikeThrough");
    defineColorAlias("strikethrough", "crossedOut");
    defineColorAlias("hidden", "conceal");
    defineColorAlias("inverse", "swapColors");
    defineColorAlias("inverse", "swapcolors");
    defineColorAlias("doubleunderline", "doubleUnderline");
    let _getSharedArrayBufferByteLength;
    function getSharedArrayBufferByteLength(value) {
      _getSharedArrayBufferByteLength ??= ObjectGetOwnPropertyDescriptor(
        // deno-lint-ignore prefer-primordials
        SharedArrayBuffer.prototype,
        "byteLength"
      ).get;
      return FunctionPrototypeCall(_getSharedArrayBufferByteLength, value);
    }
    function isAggregateError(value) {
      return isNativeError2(value) && value.name === "AggregateError" && ArrayIsArray(value.errors);
    }
    const kObjectType = 0;
    const kArrayType = 1;
    const kArrayExtrasType = 2;
    const kMinLineLength = 16;
    const kWeak = 0;
    const kIterator = 1;
    const kMapEntries = 2;
    const meta = [
      "\\x00",
      "\\x01",
      "\\x02",
      "\\x03",
      "\\x04",
      "\\x05",
      "\\x06",
      "\\x07",
      // x07
      "\\b",
      "\\t",
      "\\n",
      "\\x0B",
      "\\f",
      "\\r",
      "\\x0E",
      "\\x0F",
      // x0F
      "\\x10",
      "\\x11",
      "\\x12",
      "\\x13",
      "\\x14",
      "\\x15",
      "\\x16",
      "\\x17",
      // x17
      "\\x18",
      "\\x19",
      "\\x1A",
      "\\x1B",
      "\\x1C",
      "\\x1D",
      "\\x1E",
      "\\x1F",
      // x1F
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "\\'",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      // x2F
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      // x3F
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      // x4F
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "\\\\",
      "",
      "",
      "",
      // x5F
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      // x6F
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "\\x7F",
      // x7F
      "\\x80",
      "\\x81",
      "\\x82",
      "\\x83",
      "\\x84",
      "\\x85",
      "\\x86",
      "\\x87",
      // x87
      "\\x88",
      "\\x89",
      "\\x8A",
      "\\x8B",
      "\\x8C",
      "\\x8D",
      "\\x8E",
      "\\x8F",
      // x8F
      "\\x90",
      "\\x91",
      "\\x92",
      "\\x93",
      "\\x94",
      "\\x95",
      "\\x96",
      "\\x97",
      // x97
      "\\x98",
      "\\x99",
      "\\x9A",
      "\\x9B",
      "\\x9C",
      "\\x9D",
      "\\x9E",
      "\\x9F"
      // x9F
    ];
    const isUndetectableObject = (v) => typeof v === "undefined" && v !== void 0;
    const strEscapeSequencesReplacer = new SafeRegExp(
      "[\0-'\\\x7F-\x9F]",
      "g"
    );
    const keyStrRegExp = new SafeRegExp("^[a-zA-Z_][a-zA-Z_0-9]*$");
    const numberRegExp = new SafeRegExp("^(0|[1-9][0-9]*)$");
    const escapeFn = (str) => meta[StringPrototypeCharCodeAt(str, 0)];
    function stylizeNoColor(str) {
      return str;
    }
    const nodeCustomInspectSymbol = SymbolFor("nodejs.util.inspect.custom");
    const privateCustomInspect = SymbolFor("Deno.privateCustomInspect");
    function getUserOptions(ctx, isCrossContext) {
      const ret = {
        stylize: ctx.stylize,
        showHidden: ctx.showHidden,
        depth: ctx.depth,
        colors: ctx.colors,
        customInspect: ctx.customInspect,
        showProxy: ctx.showProxy,
        maxArrayLength: ctx.maxArrayLength,
        maxStringLength: ctx.maxStringLength,
        breakLength: ctx.breakLength,
        compact: ctx.compact,
        sorted: ctx.sorted,
        getters: ctx.getters,
        numericSeparator: ctx.numericSeparator,
        ...ctx.userOptions
      };
      if (isCrossContext) {
        ObjectSetPrototypeOf(ret, null);
        for (const key of new SafeArrayIterator(ObjectKeys(ret))) {
          if ((typeof ret[key] === "object" || typeof ret[key] === "function") && ret[key] !== null) {
            delete ret[key];
          }
        }
        ret.stylize = ObjectSetPrototypeOf((value, flavour) => {
          let stylized;
          try {
            stylized = `${ctx.stylize(value, flavour)}`;
          } catch {
          }
          if (typeof stylized !== "string")
            return value;
          return stylized;
        }, null);
      }
      return ret;
    }
    function formatValue(ctx, value, recurseTimes, typedArray) {
      if (typeof value !== "object" && typeof value !== "function" && !isUndetectableObject(value)) {
        return formatPrimitive(ctx.stylize, value, ctx);
      }
      if (value === null) {
        return ctx.stylize("null", "null");
      }
      const context = value;
      const proxyDetails = core.getProxyDetails(value);
      if (ctx.customInspect) {
        if (ReflectHas(value, customInspect) && typeof value[customInspect] === "function") {
          return String2(value[customInspect](inspect, ctx));
        } else if (ReflectHas(value, privateCustomInspect) && typeof value[privateCustomInspect] === "function") {
          return String2(value[privateCustomInspect](inspect, ctx));
        } else if (ReflectHas(value, nodeCustomInspectSymbol)) {
          const maybeCustom = value[nodeCustomInspectSymbol];
          if (typeof maybeCustom === "function" && // Filter out the util module, its inspect function is special.
          maybeCustom !== ctx.inspect && // Also filter out any prototype objects using the circular check.
          !(value.constructor && value.constructor.prototype === value)) {
            const depth = ctx.depth === null ? null : ctx.depth - recurseTimes;
            const isCrossContext = !ObjectPrototypeIsPrototypeOf(
              ObjectPrototype,
              context
            );
            const ret = FunctionPrototypeCall(
              maybeCustom,
              context,
              depth,
              getUserOptions(ctx, isCrossContext),
              ctx.inspect
            );
            if (ret !== context) {
              if (typeof ret !== "string") {
                return formatValue(ctx, ret, recurseTimes);
              }
              return StringPrototypeReplaceAll(
                ret,
                "\n",
                `
${StringPrototypeRepeat(" ", ctx.indentationLvl)}`
              );
            }
          }
        }
      }
      if (ArrayPrototypeIncludes(ctx.seen, value)) {
        let index = 1;
        if (ctx.circular === void 0) {
          ctx.circular = new SafeMap();
          MapPrototypeSet(ctx.circular, value, index);
        } else {
          index = ctx.circular.get(value);
          if (index === void 0) {
            index = ctx.circular.size + 1;
            MapPrototypeSet(ctx.circular, value, index);
          }
        }
        return ctx.stylize(`[Circular *${index}]`, "special");
      }
      return formatRaw(ctx, value, recurseTimes, typedArray, proxyDetails);
    }
    function getClassBase(value, constructor, tag) {
      const hasName = ObjectHasOwn(value, "name");
      const name = hasName && value.name || "(anonymous)";
      let base = `class ${name}`;
      if (constructor !== "Function" && constructor !== null) {
        base += ` [${constructor}]`;
      }
      if (tag !== "" && constructor !== tag) {
        base += ` [${tag}]`;
      }
      if (constructor !== null) {
        const superName = ObjectGetPrototypeOf(value).name;
        if (superName) {
          base += ` extends ${superName}`;
        }
      } else {
        base += " extends [null prototype]";
      }
      return `[${base}]`;
    }
    const stripCommentsRegExp = new SafeRegExp(
      "(\\/\\/.*?\\n)|(\\/\\*(.|\\n)*?\\*\\/)",
      "g"
    );
    const classRegExp = new SafeRegExp("^(\\s+[^(]*?)\\s*{");
    function getFunctionBase(value, constructor, tag) {
      const stringified = FunctionPrototypeToString(value);
      if (StringPrototypeStartsWith(stringified, "class") && StringPrototypeEndsWith(stringified, "}")) {
        const slice = StringPrototypeSlice(stringified, 5, -1);
        const bracketIndex = StringPrototypeIndexOf(slice, "{");
        if (bracketIndex !== -1 && (!StringPrototypeIncludes(
          StringPrototypeSlice(slice, 0, bracketIndex),
          "("
        ) || // Slow path to guarantee that it's indeed a class.
        RegExpPrototypeExec(
          classRegExp,
          RegExpPrototypeSymbolReplace(stripCommentsRegExp, slice)
        ) !== null)) {
          return getClassBase(value, constructor, tag);
        }
      }
      let type = "Function";
      if (isGeneratorFunction2(value)) {
        type = `Generator${type}`;
      }
      if (isAsyncFunction2(value)) {
        type = `Async${type}`;
      }
      let base = `[${type}`;
      if (constructor === null) {
        base += " (null prototype)";
      }
      if (value.name === "") {
        base += " (anonymous)";
      } else {
        base += `: ${value.name}`;
      }
      base += "]";
      if (constructor !== type && constructor !== null) {
        base += ` ${constructor}`;
      }
      if (tag !== "" && constructor !== tag) {
        base += ` [${tag}]`;
      }
      return base;
    }
    function formatRaw(ctx, value, recurseTimes, typedArray, proxyDetails) {
      let keys;
      let protoProps;
      if (ctx.showHidden && (recurseTimes <= ctx.depth || ctx.depth === null)) {
        protoProps = [];
      }
      const constructor = getConstructorName(value, ctx, recurseTimes, protoProps);
      if (protoProps !== void 0 && protoProps.length === 0) {
        protoProps = void 0;
      }
      let tag = value[SymbolToStringTag];
      if (typeof tag !== "string") {
        tag = "";
      }
      let base = "";
      let formatter = () => [];
      let braces;
      let noIterator = true;
      let i = 0;
      const filter = ctx.showHidden ? 0 : 2;
      let extrasType = kObjectType;
      if (proxyDetails !== null && ctx.showProxy) {
        return `Proxy ` + formatValue(ctx, proxyDetails, recurseTimes);
      } else {
        if (ReflectHas(value, SymbolIterator) || constructor === null) {
          noIterator = false;
          if (ArrayIsArray(value)) {
            const prefix = constructor !== "Array" || tag !== "" ? getPrefix(constructor, tag, "Array", `(${value.length})`) : "";
            keys = op_get_non_index_property_names(value, filter);
            braces = [`${prefix}[`, "]"];
            if (value.length === 0 && keys.length === 0 && protoProps === void 0) {
              return `${braces[0]}]`;
            }
            extrasType = kArrayExtrasType;
            formatter = formatArray;
          } else if (proxyDetails === null && isSet2(value) || proxyDetails !== null && isSet2(proxyDetails[0])) {
            const set = proxyDetails?.[0] ?? value;
            const size = SetPrototypeGetSize(set);
            const prefix = getPrefix(constructor, tag, "Set", `(${size})`);
            keys = getKeys(set, ctx.showHidden);
            formatter = constructor !== null ? FunctionPrototypeBind(formatSet, null, set) : FunctionPrototypeBind(formatSet, null, SetPrototypeValues(set));
            if (size === 0 && keys.length === 0 && protoProps === void 0) {
              return `${prefix}{}`;
            }
            braces = [`${prefix}{`, "}"];
          } else if (proxyDetails === null && isMap2(value) || proxyDetails !== null && isMap2(proxyDetails[0])) {
            const map = proxyDetails?.[0] ?? value;
            const size = MapPrototypeGetSize(map);
            const prefix = getPrefix(constructor, tag, "Map", `(${size})`);
            keys = getKeys(map, ctx.showHidden);
            formatter = constructor !== null ? FunctionPrototypeBind(formatMap, null, map) : FunctionPrototypeBind(formatMap, null, MapPrototypeEntries(map));
            if (size === 0 && keys.length === 0 && protoProps === void 0) {
              return `${prefix}{}`;
            }
            braces = [`${prefix}{`, "}"];
          } else if (proxyDetails === null && isTypedArray2(value) || proxyDetails !== null && isTypedArray2(proxyDetails[0])) {
            const typedArray2 = proxyDetails?.[0] ?? value;
            keys = op_get_non_index_property_names(typedArray2, filter);
            const bound = typedArray2;
            const fallback = "";
            if (constructor === null) {
            }
            const size = TypedArrayPrototypeGetLength(typedArray2);
            const prefix = getPrefix(constructor, tag, fallback, `(${size})`);
            braces = [`${prefix}[`, "]"];
            if (typedArray2.length === 0 && keys.length === 0 && !ctx.showHidden) {
              return `${braces[0]}]`;
            }
            formatter = FunctionPrototypeBind(formatTypedArray, null, bound, size);
            extrasType = kArrayExtrasType;
          } else if (proxyDetails === null && isMapIterator2(value) || proxyDetails !== null && isMapIterator2(proxyDetails[0])) {
            const mapIterator = proxyDetails?.[0] ?? value;
            keys = getKeys(mapIterator, ctx.showHidden);
            braces = getIteratorBraces("Map", tag);
            formatter = FunctionPrototypeBind(formatIterator, null, braces);
          } else if (proxyDetails === null && isSetIterator2(value) || proxyDetails !== null && isSetIterator2(proxyDetails[0])) {
            const setIterator = proxyDetails?.[0] ?? value;
            keys = getKeys(setIterator, ctx.showHidden);
            braces = getIteratorBraces("Set", tag);
            formatter = FunctionPrototypeBind(formatIterator, null, braces);
          } else {
            noIterator = true;
          }
        }
        if (noIterator) {
          keys = getKeys(value, ctx.showHidden);
          braces = ["{", "}"];
          if (constructor === "Object") {
            if (isArgumentsObject2(value)) {
              braces[0] = "[Arguments] {";
            } else if (tag !== "") {
              braces[0] = `${getPrefix(constructor, tag, "Object")}{`;
            }
            if (keys.length === 0 && protoProps === void 0) {
              return `${braces[0]}}`;
            }
          } else if (typeof value === "function") {
            base = getFunctionBase(value, constructor, tag);
            if (keys.length === 0 && protoProps === void 0) {
              return ctx.stylize(base, "special");
            }
          } else if (proxyDetails === null && isRegExp2(value) || proxyDetails !== null && isRegExp2(proxyDetails[0])) {
            const regExp = proxyDetails?.[0] ?? value;
            base = RegExpPrototypeToString(
              constructor !== null ? regExp : new SafeRegExp(regExp)
            );
            const prefix = getPrefix(constructor, tag, "RegExp");
            if (prefix !== "RegExp ") {
              base = `${prefix}${base}`;
            }
            if (keys.length === 0 && protoProps === void 0 || recurseTimes > ctx.depth && ctx.depth !== null) {
              return ctx.stylize(base, "regexp");
            }
          } else if (proxyDetails === null && isDate2(value) || proxyDetails !== null && isDate2(proxyDetails[0])) {
            const date = proxyDetails?.[0] ?? value;
            if (NumberIsNaN(DatePrototypeGetTime(date))) {
              return ctx.stylize("Invalid Date", "date");
            } else {
              base = DatePrototypeToISOString(date);
              if (keys.length === 0 && protoProps === void 0) {
                return ctx.stylize(base, "date");
              }
            }
          } else if (proxyDetails === null && typeof globalThis.Temporal !== "undefined" && (ObjectPrototypeIsPrototypeOf(
            globalThis.Temporal.Instant.prototype,
            value
          ) || ObjectPrototypeIsPrototypeOf(
            globalThis.Temporal.ZonedDateTime.prototype,
            value
          ) || ObjectPrototypeIsPrototypeOf(
            globalThis.Temporal.PlainDate.prototype,
            value
          ) || ObjectPrototypeIsPrototypeOf(
            globalThis.Temporal.PlainTime.prototype,
            value
          ) || ObjectPrototypeIsPrototypeOf(
            globalThis.Temporal.PlainDateTime.prototype,
            value
          ) || ObjectPrototypeIsPrototypeOf(
            globalThis.Temporal.PlainYearMonth.prototype,
            value
          ) || ObjectPrototypeIsPrototypeOf(
            globalThis.Temporal.PlainMonthDay.prototype,
            value
          ) || ObjectPrototypeIsPrototypeOf(
            globalThis.Temporal.Duration.prototype,
            value
          ) || ObjectPrototypeIsPrototypeOf(
            globalThis.Temporal.TimeZone.prototype,
            value
          ) || ObjectPrototypeIsPrototypeOf(
            globalThis.Temporal.Calendar.prototype,
            value
          ))) {
            return ctx.stylize(value.toString(), "temporal");
          } else if (proxyDetails === null && (isNativeError2(value) || ObjectPrototypeIsPrototypeOf(ErrorPrototype, value)) || proxyDetails !== null && (isNativeError2(proxyDetails[0]) || ObjectPrototypeIsPrototypeOf(ErrorPrototype, proxyDetails[0]))) {
            const error = proxyDetails?.[0] ?? value;
            base = inspectError(error, ctx);
            if (keys.length === 0 && protoProps === void 0) {
              return base;
            }
          } else if (isAnyArrayBuffer2(value)) {
            const arrayType = isArrayBuffer2(value) ? "ArrayBuffer" : "SharedArrayBuffer";
            const prefix = getPrefix(constructor, tag, arrayType);
            if (typedArray === void 0) {
              formatter = formatArrayBuffer;
            } else if (keys.length === 0 && protoProps === void 0) {
              return prefix + `{ byteLength: ${formatNumber(
                ctx.stylize,
                TypedArrayPrototypeGetByteLength(value)
              )} }`;
            }
            braces[0] = `${prefix}{`;
            ArrayPrototypeUnshift(keys, "byteLength");
          } else if (isDataView2(value)) {
            braces[0] = `${getPrefix(constructor, tag, "DataView")}{`;
            ArrayPrototypeUnshift(keys, "byteLength", "byteOffset", "buffer");
          } else if (isPromise2(value)) {
            braces[0] = `${getPrefix(constructor, tag, "Promise")}{`;
            formatter = formatPromise;
          } else if (isWeakSet2(value)) {
            braces[0] = `${getPrefix(constructor, tag, "WeakSet")}{`;
            formatter = ctx.showHidden ? formatWeakSet : formatWeakCollection;
          } else if (isWeakMap2(value)) {
            braces[0] = `${getPrefix(constructor, tag, "WeakMap")}{`;
            formatter = ctx.showHidden ? formatWeakMap : formatWeakCollection;
          } else if (isModuleNamespaceObject2(value)) {
            braces[0] = `${getPrefix(constructor, tag, "Module")}{`;
            formatter = FunctionPrototypeBind(formatNamespaceObject, null, keys);
          } else if (isBoxedPrimitive2(value)) {
            base = getBoxedBase(value, ctx, keys, constructor, tag);
            if (keys.length === 0 && protoProps === void 0) {
              return base;
            }
          } else {
            if (keys.length === 0 && protoProps === void 0) {
              return `${getCtxStyle(value, constructor, tag)}{}`;
            }
            braces[0] = `${getCtxStyle(value, constructor, tag)}{`;
          }
        }
      }
      if (recurseTimes > ctx.depth && ctx.depth !== null) {
        let constructorName = StringPrototypeSlice(
          getCtxStyle(value, constructor, tag),
          0,
          -1
        );
        if (constructor !== null) {
          constructorName = `[${constructorName}]`;
        }
        return ctx.stylize(constructorName, "special");
      }
      recurseTimes += 1;
      ArrayPrototypePush(ctx.seen, value);
      ctx.currentDepth = recurseTimes;
      let output;
      try {
        output = formatter(ctx, value, recurseTimes);
        for (i = 0; i < keys.length; i++) {
          ArrayPrototypePush(
            output,
            formatProperty(ctx, value, recurseTimes, keys[i], extrasType)
          );
        }
        if (protoProps !== void 0) {
          ArrayPrototypePushApply(output, protoProps);
        }
      } catch (error) {
        return ctx.stylize(
          `[Internal Formatting Error] ${error.stack}`,
          "internalError"
        );
      }
      if (ctx.circular !== void 0) {
        const index = ctx.circular.get(value);
        if (index !== void 0) {
          const reference = ctx.stylize(`<ref *${index}>`, "special");
          if (ctx.compact !== true) {
            base = base === "" ? reference : `${reference} ${base}`;
          } else {
            braces[0] = `${reference} ${braces[0]}`;
          }
        }
      }
      ArrayPrototypePop(ctx.seen);
      if (ctx.sorted) {
        const comparator = ctx.sorted === true ? void 0 : ctx.sorted;
        if (extrasType === kObjectType) {
          output = ArrayPrototypeSort(output, comparator);
        } else if (keys.length > 1) {
          const sorted = ArrayPrototypeSort(
            ArrayPrototypeSlice(output, output.length - keys.length),
            comparator
          );
          ArrayPrototypeSplice(
            output,
            output.length - keys.length,
            keys.length,
            ...new SafeArrayIterator(sorted)
          );
        }
      }
      const res = reduceToSingleString(
        ctx,
        output,
        base,
        braces,
        extrasType,
        recurseTimes,
        value
      );
      const budget = ctx.budget[ctx.indentationLvl] || 0;
      const newLength = budget + res.length;
      ctx.budget[ctx.indentationLvl] = newLength;
      if (newLength > 2 ** 27) {
        ctx.depth = -1;
      }
      return res;
    }
    const builtInObjectsRegExp = new SafeRegExp("^[A-Z][a-zA-Z0-9]+$");
    const builtInObjects = new SafeSet(
      ArrayPrototypeFilter(
        ObjectGetOwnPropertyNames(globalThis),
        (e) => RegExpPrototypeTest(builtInObjectsRegExp, e)
      )
    );
    function addPrototypeProperties(ctx, main, obj, recurseTimes, output) {
      let depth = 0;
      let keys;
      let keySet;
      do {
        if (depth !== 0 || main === obj) {
          obj = ObjectGetPrototypeOf(obj);
          if (obj === null) {
            return;
          }
          const descriptor = ObjectGetOwnPropertyDescriptor(obj, "constructor");
          if (descriptor !== void 0 && typeof descriptor.value === "function" && SetPrototypeHas(builtInObjects, descriptor.value.name)) {
            return;
          }
        }
        if (depth === 0) {
          keySet = new SafeSet();
        } else {
          ArrayPrototypeForEach(keys, (key) => SetPrototypeAdd(keySet, key));
        }
        keys = ReflectOwnKeys(obj);
        ArrayPrototypePush(ctx.seen, main);
        for (const key of new SafeArrayIterator(keys)) {
          if (key === "constructor" || ObjectHasOwn(main, key) || depth !== 0 && SetPrototypeHas(keySet, key)) {
            continue;
          }
          const desc = ObjectGetOwnPropertyDescriptor(obj, key);
          if (typeof desc.value === "function") {
            continue;
          }
          const value = formatProperty(
            ctx,
            obj,
            recurseTimes,
            key,
            kObjectType,
            desc,
            main
          );
          if (ctx.colors) {
            ArrayPrototypePush(output, `\x1B[2m${value}\x1B[22m`);
          } else {
            ArrayPrototypePush(output, value);
          }
        }
        ArrayPrototypePop(ctx.seen);
      } while (++depth !== 3);
    }
    function isInstanceof(proto, object) {
      try {
        return ObjectPrototypeIsPrototypeOf(proto, object);
      } catch {
        return false;
      }
    }
    function getConstructorName(obj, ctx, recurseTimes, protoProps) {
      let firstProto;
      const tmp = obj;
      while (obj || isUndetectableObject(obj)) {
        let descriptor;
        try {
          descriptor = ObjectGetOwnPropertyDescriptor(obj, "constructor");
        } catch {
        }
        if (descriptor !== void 0 && typeof descriptor.value === "function" && descriptor.value.name !== "" && isInstanceof(descriptor.value.prototype, tmp)) {
          if (protoProps !== void 0 && (firstProto !== obj || !SetPrototypeHas(builtInObjects, descriptor.value.name))) {
            addPrototypeProperties(
              ctx,
              tmp,
              firstProto || tmp,
              recurseTimes,
              protoProps
            );
          }
          return String2(descriptor.value.name);
        }
        obj = ObjectGetPrototypeOf(obj);
        if (firstProto === void 0) {
          firstProto = obj;
        }
      }
      if (firstProto === null) {
        return null;
      }
      const res = op_get_constructor_name(tmp);
      if (recurseTimes > ctx.depth && ctx.depth !== null) {
        return `${res} <Complex prototype>`;
      }
      const protoConstr = getConstructorName(
        firstProto,
        ctx,
        recurseTimes + 1,
        protoProps
      );
      if (protoConstr === null) {
        return `${res} <${inspect(firstProto, {
          ...ctx,
          customInspect: false,
          depth: -1
        })}>`;
      }
      return `${res} <${protoConstr}>`;
    }
    const formatPrimitiveRegExp = new SafeRegExp("(?<=\n)");
    function formatPrimitive(fn, value, ctx) {
      if (typeof value === "string") {
        let trailer = "";
        if (value.length > ctx.maxStringLength) {
          const remaining = value.length - ctx.maxStringLength;
          value = StringPrototypeSlice(value, 0, ctx.maxStringLength);
          trailer = `... ${remaining} more character${remaining > 1 ? "s" : ""}`;
        }
        if (ctx.compact !== true && // TODO(BridgeAR): Add unicode support. Use the readline getStringWidth
        // function.
        value.length > kMinLineLength && value.length > ctx.breakLength - ctx.indentationLvl - 4) {
          return ArrayPrototypeJoin(
            ArrayPrototypeMap(
              StringPrototypeSplit(value, formatPrimitiveRegExp),
              (line) => fn(quoteString(line, ctx), "string")
            ),
            ` +
${StringPrototypeRepeat(" ", ctx.indentationLvl + 2)}`
          ) + trailer;
        }
        return fn(quoteString(value, ctx), "string") + trailer;
      }
      if (typeof value === "number") {
        return formatNumber(fn, value);
      }
      if (typeof value === "bigint") {
        return formatBigInt(fn, value);
      }
      if (typeof value === "boolean") {
        return fn(`${value}`, "boolean");
      }
      if (typeof value === "undefined") {
        return fn("undefined", "undefined");
      }
      return fn(maybeQuoteSymbol(value, ctx), "symbol");
    }
    function getPrefix(constructor, tag, fallback, size = "") {
      if (constructor === null) {
        if (tag !== "" && fallback !== tag) {
          return `[${fallback}${size}: null prototype] [${tag}] `;
        }
        return `[${fallback}${size}: null prototype] `;
      }
      if (tag !== "" && constructor !== tag) {
        return `${constructor}${size} [${tag}] `;
      }
      return `${constructor}${size} `;
    }
    function formatArray(ctx, value, recurseTimes) {
      const valLen = value.length;
      const len = MathMin(MathMax(0, ctx.maxArrayLength), valLen);
      const remaining = valLen - len;
      const output = [];
      for (let i = 0; i < len; i++) {
        ArrayPrototypePush(
          output,
          formatProperty(ctx, value, recurseTimes, i, kArrayType)
        );
      }
      if (remaining > 0) {
        ArrayPrototypePush(
          output,
          `... ${remaining} more item${remaining > 1 ? "s" : ""}`
        );
      }
      return output;
    }
    function getCtxStyle(value, constructor, tag) {
      let fallback = "";
      if (constructor === null) {
        fallback = op_get_constructor_name(value);
        if (fallback === tag) {
          fallback = "Object";
        }
      }
      return getPrefix(constructor, tag, fallback);
    }
    function getKeys(value, showHidden) {
      let keys;
      const symbols = ObjectGetOwnPropertySymbols(value);
      if (showHidden) {
        keys = ObjectGetOwnPropertyNames(value);
        if (symbols.length !== 0) {
          ArrayPrototypePushApply(keys, symbols);
        }
      } else {
        try {
          keys = ObjectKeys(value);
        } catch (err) {
          assert(
            isNativeError2(err) && err.name === "ReferenceError" && isModuleNamespaceObject2(value)
          );
          keys = ObjectGetOwnPropertyNames(value);
        }
        if (symbols.length !== 0) {
          const filter = (key) => ObjectPrototypePropertyIsEnumerable(value, key);
          ArrayPrototypePushApply(keys, ArrayPrototypeFilter(symbols, filter));
        }
      }
      return keys;
    }
    function formatSet(value, ctx, _ignored, recurseTimes) {
      ctx.indentationLvl += 2;
      const values = [...new SafeSetIterator(value)];
      const valLen = SetPrototypeGetSize(value);
      const len = MathMin(MathMax(0, ctx.iterableLimit), valLen);
      const remaining = valLen - len;
      const output = [];
      for (let i = 0; i < len; i++) {
        ArrayPrototypePush(output, formatValue(ctx, values[i], recurseTimes));
      }
      if (remaining > 0) {
        ArrayPrototypePush(
          output,
          `... ${remaining} more item${remaining > 1 ? "s" : ""}`
        );
      }
      ctx.indentationLvl -= 2;
      return output;
    }
    function formatMap(value, ctx, _ignored, recurseTimes) {
      ctx.indentationLvl += 2;
      const values = [...new SafeMapIterator(value)];
      const valLen = MapPrototypeGetSize(value);
      const len = MathMin(MathMax(0, ctx.iterableLimit), valLen);
      const remaining = valLen - len;
      const output = [];
      for (let i = 0; i < len; i++) {
        ArrayPrototypePush(
          output,
          `${formatValue(ctx, values[i][0], recurseTimes)} => ${formatValue(
            ctx,
            values[i][1],
            recurseTimes
          )}`
        );
      }
      if (remaining > 0) {
        ArrayPrototypePush(
          output,
          `... ${remaining} more item${remaining > 1 ? "s" : ""}`
        );
      }
      ctx.indentationLvl -= 2;
      return output;
    }
    function formatTypedArray(value, length, ctx, _ignored, recurseTimes) {
      const maxLength = MathMin(MathMax(0, ctx.maxArrayLength), length);
      const remaining = value.length - maxLength;
      const output = [];
      const elementFormatter = value.length > 0 && typeof value[0] === "number" ? formatNumber : formatBigInt;
      for (let i = 0; i < maxLength; ++i) {
        output[i] = elementFormatter(ctx.stylize, value[i]);
      }
      if (remaining > 0) {
        output[maxLength] = `... ${remaining} more item${remaining > 1 ? "s" : ""}`;
      }
      if (ctx.showHidden) {
        ctx.indentationLvl += 2;
        for (const key of new SafeArrayIterator([
          "BYTES_PER_ELEMENT",
          "length",
          "byteLength",
          "byteOffset",
          "buffer"
        ])) {
          const str = formatValue(ctx, value[key], recurseTimes, true);
          ArrayPrototypePush(output, `[${key}]: ${str}`);
        }
        ctx.indentationLvl -= 2;
      }
      return output;
    }
    function getIteratorBraces(type, tag) {
      if (tag !== `${type} Iterator`) {
        if (tag !== "") {
          tag += "] [";
        }
        tag += `${type} Iterator`;
      }
      return [`[${tag}] {`, "}"];
    }
    const iteratorRegExp = new SafeRegExp(" Iterator] {$");
    function formatIterator(braces, ctx, value, recurseTimes) {
      const { 0: entries, 1: isKeyValue } = op_preview_entries(value, true);
      if (isKeyValue) {
        braces[0] = StringPrototypeReplace(
          braces[0],
          iteratorRegExp,
          " Entries] {"
        );
        return formatMapIterInner(ctx, recurseTimes, entries, kMapEntries);
      }
      return formatSetIterInner(ctx, recurseTimes, entries, kIterator);
    }
    function handleCircular(value, ctx) {
      let index = 1;
      if (ctx.circular === void 0) {
        ctx.circular = new SafeMap();
        MapPrototypeSet(ctx.circular, value, index);
      } else {
        index = MapPrototypeGet(ctx.circular, value);
        if (index === void 0) {
          index = MapPrototypeGetSize(ctx.circular) + 1;
          MapPrototypeSet(ctx.circular, value, index);
        }
      }
      return ctx.stylize(`[Circular *${index}]`, "special");
    }
    const AGGREGATE_ERROR_HAS_AT_PATTERN = new SafeRegExp(/\s+at/);
    const AGGREGATE_ERROR_NOT_EMPTY_LINE_PATTERN = new SafeRegExp(/^(?!\s*$)/gm);
    function inspectError(value, ctx) {
      const causes = [value];
      let err = value;
      while (err.cause) {
        if (ArrayPrototypeIncludes(causes, err.cause)) {
          ArrayPrototypePush(causes, handleCircular(err.cause, ctx));
          break;
        } else {
          ArrayPrototypePush(causes, err.cause);
          err = err.cause;
        }
      }
      const refMap = new SafeMap();
      for (let i = 0; i < causes.length; ++i) {
        const cause = causes[i];
        if (ctx.circular !== void 0) {
          const index = MapPrototypeGet(ctx.circular, cause);
          if (index !== void 0) {
            MapPrototypeSet(
              refMap,
              cause,
              ctx.stylize(`<ref *${index}> `, "special")
            );
          }
        }
      }
      ArrayPrototypeShift(causes);
      let finalMessage = MapPrototypeGet(refMap, value) ?? "";
      if (isAggregateError(value)) {
        const stackLines = StringPrototypeSplit(value.stack, "\n");
        while (true) {
          const line = ArrayPrototypeShift(stackLines);
          if (RegExpPrototypeTest(AGGREGATE_ERROR_HAS_AT_PATTERN, line)) {
            ArrayPrototypeUnshift(stackLines, line);
            break;
          } else if (typeof line === "undefined") {
            break;
          }
          finalMessage += line;
          finalMessage += "\n";
        }
        const aggregateMessage = ArrayPrototypeJoin(
          ArrayPrototypeMap(
            value.errors,
            (error) => StringPrototypeReplace(
              inspectArgs([error]),
              AGGREGATE_ERROR_NOT_EMPTY_LINE_PATTERN,
              StringPrototypeRepeat(" ", 4)
            )
          ),
          "\n"
        );
        finalMessage += aggregateMessage;
        finalMessage += "\n";
        finalMessage += ArrayPrototypeJoin(stackLines, "\n");
      } else {
        const stack = value.stack;
        if (stack?.includes("\n    at")) {
          finalMessage += stack;
        } else {
          finalMessage += `[${stack || ErrorPrototypeToString(value)}]`;
        }
      }
      finalMessage += ArrayPrototypeJoin(
        ArrayPrototypeMap(
          causes,
          (cause) => "\nCaused by " + (MapPrototypeGet(refMap, cause) ?? "") + (cause?.stack ?? cause)
        ),
        ""
      );
      return finalMessage;
    }
    const hexSliceLookupTable = function() {
      const alphabet = "0123456789abcdef";
      const table = [];
      for (let i = 0; i < 16; ++i) {
        const i16 = i * 16;
        for (let j = 0; j < 16; ++j) {
          table[i16 + j] = alphabet[i] + alphabet[j];
        }
      }
      return table;
    }();
    function hexSlice(buf, start, end) {
      const len = TypedArrayPrototypeGetLength(buf);
      if (!start || start < 0) {
        start = 0;
      }
      if (!end || end < 0 || end > len) {
        end = len;
      }
      let out = "";
      for (let i = start; i < end; ++i) {
        out += hexSliceLookupTable[buf[i]];
      }
      return out;
    }
    const arrayBufferRegExp = new SafeRegExp("(.{2})", "g");
    function formatArrayBuffer(ctx, value) {
      let valLen;
      try {
        valLen = ArrayBufferPrototypeGetByteLength(value);
      } catch {
        valLen = getSharedArrayBufferByteLength(value);
      }
      const len = MathMin(MathMax(0, ctx.maxArrayLength), valLen);
      let buffer;
      try {
        buffer = new Uint8Array2(value, 0, len);
      } catch {
        return [ctx.stylize("(detached)", "special")];
      }
      let str = StringPrototypeTrim(
        StringPrototypeReplace(hexSlice(buffer), arrayBufferRegExp, "$1 ")
      );
      const remaining = valLen - len;
      if (remaining > 0) {
        str += ` ... ${remaining} more byte${remaining > 1 ? "s" : ""}`;
      }
      return [`${ctx.stylize("[Uint8Contents]", "special")}: <${str}>`];
    }
    function formatNumber(fn, value) {
      return fn(ObjectIs(value, -0) ? "-0" : `${value}`, "number");
    }
    const PromiseState = {
      Pending: 0,
      Fulfilled: 1,
      Rejected: 2
    };
    function formatPromise(ctx, value, recurseTimes) {
      let output;
      const { 0: state, 1: result } = core.getPromiseDetails(value);
      if (state === PromiseState.Pending) {
        output = [ctx.stylize("<pending>", "special")];
      } else {
        ctx.indentationLvl += 2;
        const str = formatValue(ctx, result, recurseTimes);
        ctx.indentationLvl -= 2;
        output = [
          state === PromiseState.Rejected ? `${ctx.stylize("<rejected>", "special")} ${str}` : str
        ];
      }
      return output;
    }
    function formatWeakCollection(ctx) {
      return [ctx.stylize("<items unknown>", "special")];
    }
    function formatWeakSet(ctx, value, recurseTimes) {
      const entries = op_preview_entries(value, false);
      return formatSetIterInner(ctx, recurseTimes, entries, kWeak);
    }
    function formatWeakMap(ctx, value, recurseTimes) {
      const entries = op_preview_entries(value, false);
      return formatMapIterInner(ctx, recurseTimes, entries, kWeak);
    }
    function formatProperty(ctx, value, recurseTimes, key, type, desc, original = value) {
      let name, str;
      let extra = " ";
      desc = desc || ObjectGetOwnPropertyDescriptor(value, key) || {
        value: value[key],
        enumerable: true
      };
      if (desc.value !== void 0) {
        const diff = ctx.compact !== true || type !== kObjectType ? 2 : 3;
        ctx.indentationLvl += diff;
        str = formatValue(ctx, desc.value, recurseTimes);
        if (diff === 3 && ctx.breakLength < getStringWidth(str, ctx.colors)) {
          extra = `
${StringPrototypeRepeat(" ", ctx.indentationLvl)}`;
        }
        ctx.indentationLvl -= diff;
      } else if (desc.get !== void 0) {
        const label = desc.set !== void 0 ? "Getter/Setter" : "Getter";
        const s = ctx.stylize;
        const sp = "special";
        if (ctx.getters && (ctx.getters === true || ctx.getters === "get" && desc.set === void 0 || ctx.getters === "set" && desc.set !== void 0)) {
          try {
            const tmp = FunctionPrototypeCall(desc.get, original);
            ctx.indentationLvl += 2;
            if (tmp === null) {
              str = `${s(`[${label}:`, sp)} ${s("null", "null")}${s("]", sp)}`;
            } else if (typeof tmp === "object") {
              str = `${s(`[${label}]`, sp)} ${formatValue(
                ctx,
                tmp,
                recurseTimes
              )}`;
            } else {
              const primitive = formatPrimitive(s, tmp, ctx);
              str = `${s(`[${label}:`, sp)} ${primitive}${s("]", sp)}`;
            }
            ctx.indentationLvl -= 2;
          } catch (err) {
            const message = `<Inspection threw (${err.message})>`;
            str = `${s(`[${label}:`, sp)} ${message}${s("]", sp)}`;
          }
        } else {
          str = ctx.stylize(`[${label}]`, sp);
        }
      } else if (desc.set !== void 0) {
        str = ctx.stylize("[Setter]", "special");
      } else {
        str = ctx.stylize("undefined", "undefined");
      }
      if (type === kArrayType) {
        return str;
      }
      if (typeof key === "symbol") {
        name = `[${ctx.stylize(maybeQuoteSymbol(key, ctx), "symbol")}]`;
      } else if (key === "__proto__") {
        name = "['__proto__']";
      } else if (desc.enumerable === false) {
        const tmp = StringPrototypeReplace(
          key,
          strEscapeSequencesReplacer,
          escapeFn
        );
        name = `[${tmp}]`;
      } else if (keyStrRegExp.test(key)) {
        name = ctx.stylize(key, "name");
      } else {
        name = ctx.stylize(quoteString(key, ctx), "string");
      }
      return `${name}:${extra}${str}`;
    }
    const colorRegExp = new SafeRegExp("\x1B\\[\\d\\d?m", "g");
    function removeColors(str) {
      return StringPrototypeReplace(str, colorRegExp, "");
    }
    function isBelowBreakLength(ctx, output, start, base) {
      let totalLength = output.length + start;
      if (totalLength + output.length > ctx.breakLength) {
        return false;
      }
      for (let i = 0; i < output.length; i++) {
        if (ctx.colors) {
          totalLength += removeColors(output[i]).length;
        } else {
          totalLength += output[i].length;
        }
        if (totalLength > ctx.breakLength) {
          return false;
        }
      }
      return base === "" || !StringPrototypeIncludes(base, "\n");
    }
    function formatBigInt(fn, value) {
      return fn(`${value}n`, "bigint");
    }
    function formatNamespaceObject(keys, ctx, value, recurseTimes) {
      const output = [];
      for (let i = 0; i < keys.length; i++) {
        try {
          output[i] = formatProperty(
            ctx,
            value,
            recurseTimes,
            keys[i],
            kObjectType
          );
        } catch (_err) {
          const tmp = { [keys[i]]: "" };
          output[i] = formatProperty(ctx, tmp, recurseTimes, keys[i], kObjectType);
          const pos = StringPrototypeLastIndexOf(output[i], " ");
          output[i] = StringPrototypeSlice(output[i], 0, pos + 1) + ctx.stylize("<uninitialized>", "special");
        }
      }
      keys.length = 0;
      return output;
    }
    function formatSpecialArray(ctx, value, recurseTimes, maxLength, output, i) {
      const keys = ObjectKeys(value);
      let index = i;
      for (; i < keys.length && output.length < maxLength; i++) {
        const key = keys[i];
        const tmp = +key;
        if (tmp > 2 ** 32 - 2) {
          break;
        }
        if (`${index}` !== key) {
          if (!numberRegExp.test(key)) {
            break;
          }
          const emptyItems = tmp - index;
          const ending = emptyItems > 1 ? "s" : "";
          const message = `<${emptyItems} empty item${ending}>`;
          ArrayPrototypePush(output, ctx.stylize(message, "undefined"));
          index = tmp;
          if (output.length === maxLength) {
            break;
          }
        }
        ArrayPrototypePush(
          output,
          formatProperty(ctx, value, recurseTimes, key, kArrayType)
        );
        index++;
      }
      const remaining = value.length - index;
      if (output.length !== maxLength) {
        if (remaining > 0) {
          const ending = remaining > 1 ? "s" : "";
          const message = `<${remaining} empty item${ending}>`;
          ArrayPrototypePush(output, ctx.stylize(message, "undefined"));
        }
      } else if (remaining > 0) {
        ArrayPrototypePush(
          output,
          `... ${remaining} more item${remaining > 1 ? "s" : ""}`
        );
      }
      return output;
    }
    function getBoxedBase(value, ctx, keys, constructor, tag) {
      let type, primitive;
      if (isNumberObject2(value)) {
        type = "Number";
        primitive = NumberPrototypeValueOf(value);
      } else if (isStringObject2(value)) {
        type = "String";
        primitive = StringPrototypeValueOf(value);
        ArrayPrototypeSplice(keys, 0, value.length);
      } else if (isBooleanObject2(value)) {
        type = "Boolean";
        primitive = BooleanPrototypeValueOf(value);
      } else if (isBigIntObject2(value)) {
        type = "BigInt";
        primitive = BigIntPrototypeValueOf(value);
      } else {
        type = "Symbol";
        primitive = SymbolPrototypeValueOf(value);
      }
      let base = `[${type}`;
      if (type !== constructor) {
        if (constructor === null) {
          base += " (null prototype)";
        } else {
          base += ` (${constructor})`;
        }
      }
      base += `: ${formatPrimitive(stylizeNoColor, primitive, ctx)}]`;
      if (tag !== "" && tag !== constructor) {
        base += ` [${tag}]`;
      }
      if (keys.length !== 0 || ctx.stylize === stylizeNoColor) {
        return base;
      }
      return ctx.stylize(base, StringPrototypeToLowerCase(type));
    }
    function reduceToSingleString(ctx, output, base, braces, extrasType, recurseTimes, value) {
      if (ctx.compact !== true) {
        if (typeof ctx.compact === "number" && ctx.compact >= 1) {
          const entries = output.length;
          if (extrasType === kArrayExtrasType && entries > 6) {
            output = groupArrayElements(ctx, output, value);
          }
          if (ctx.currentDepth - recurseTimes < ctx.compact && entries === output.length) {
            const start = output.length + ctx.indentationLvl + braces[0].length + base.length + 10;
            if (isBelowBreakLength(ctx, output, start, base)) {
              const joinedOutput = ArrayPrototypeJoin(output, ", ");
              if (!StringPrototypeIncludes(joinedOutput, "\n")) {
                return `${base ? `${base} ` : ""}${braces[0]} ${joinedOutput} ${braces[1]}`;
              }
            }
          }
        }
        const indentation2 = `
${StringPrototypeRepeat(" ", ctx.indentationLvl)}`;
        return `${base ? `${base} ` : ""}${braces[0]}${indentation2}  ${ArrayPrototypeJoin(output, `,${indentation2}  `)}${ctx.trailingComma ? "," : ""}${indentation2}${braces[1]}`;
      }
      if (isBelowBreakLength(ctx, output, 0, base)) {
        return `${braces[0]}${base ? ` ${base}` : ""} ${ArrayPrototypeJoin(
          output,
          ", "
        )} ` + braces[1];
      }
      const indentation = StringPrototypeRepeat(" ", ctx.indentationLvl);
      const ln = base === "" && braces[0].length === 1 ? " " : `${base ? ` ${base}` : ""}
${indentation}  `;
      return `${braces[0]}${ln}${ArrayPrototypeJoin(
        output,
        `,
${indentation}  `
      )} ${braces[1]}`;
    }
    function groupArrayElements(ctx, output, value) {
      let totalLength = 0;
      let maxLength = 0;
      let i = 0;
      let outputLength = output.length;
      if (ctx.maxArrayLength < output.length) {
        outputLength--;
      }
      const separatorSpace = 2;
      const dataLen = [];
      for (; i < outputLength; i++) {
        const len = getStringWidth(output[i], ctx.colors);
        dataLen[i] = len;
        totalLength += len + separatorSpace;
        if (maxLength < len) {
          maxLength = len;
        }
      }
      const actualMax = maxLength + separatorSpace;
      if (actualMax * 3 + ctx.indentationLvl < ctx.breakLength && (totalLength / actualMax > 5 || maxLength <= 6)) {
        const approxCharHeights = 2.5;
        const averageBias = MathSqrt(actualMax - totalLength / output.length);
        const biasedMax = MathMax(actualMax - 3 - averageBias, 1);
        const columns = MathMin(
          // Ideally a square should be drawn. We expect a character to be about 2.5
          // times as high as wide. This is the area formula to calculate a square
          // which contains n rectangles of size `actualMax * approxCharHeights`.
          // Divide that by `actualMax` to receive the correct number of columns.
          // The added bias increases the columns for short entries.
          MathRound(
            MathSqrt(approxCharHeights * biasedMax * outputLength) / biasedMax
          ),
          // Do not exceed the breakLength.
          MathFloor((ctx.breakLength - ctx.indentationLvl) / actualMax),
          // Limit array grouping for small `compact` modes as the user requested
          // minimal grouping.
          ctx.compact * 4,
          // Limit the columns to a maximum of fifteen.
          15
        );
        if (columns <= 1) {
          return output;
        }
        const tmp = [];
        const maxLineLength = [];
        for (let i2 = 0; i2 < columns; i2++) {
          let lineMaxLength = 0;
          for (let j = i2; j < output.length; j += columns) {
            if (dataLen[j] > lineMaxLength) {
              lineMaxLength = dataLen[j];
            }
          }
          lineMaxLength += separatorSpace;
          maxLineLength[i2] = lineMaxLength;
        }
        let order = StringPrototypePadStart;
        if (value !== void 0) {
          for (let i2 = 0; i2 < output.length; i2++) {
            if (typeof value[i2] !== "number" && typeof value[i2] !== "bigint") {
              order = StringPrototypePadEnd;
              break;
            }
          }
        }
        for (let i2 = 0; i2 < outputLength; i2 += columns) {
          const max = MathMin(i2 + columns, outputLength);
          let str = "";
          let j = i2;
          for (; j < max - 1; j++) {
            const padding = maxLineLength[j - i2] + output[j].length - dataLen[j];
            str += order(`${output[j]}, `, padding, " ");
          }
          if (order === StringPrototypePadStart) {
            const padding = maxLineLength[j - i2] + output[j].length - dataLen[j] - separatorSpace;
            str += StringPrototypePadStart(output[j], padding, " ");
          } else {
            str += output[j];
          }
          ArrayPrototypePush(tmp, str);
        }
        if (ctx.maxArrayLength < output.length) {
          ArrayPrototypePush(tmp, output[outputLength]);
        }
        output = tmp;
      }
      return output;
    }
    function formatMapIterInner(ctx, recurseTimes, entries, state) {
      const maxArrayLength = MathMax(ctx.maxArrayLength, 0);
      const len = entries.length / 2;
      const remaining = len - maxArrayLength;
      const maxLength = MathMin(maxArrayLength, len);
      const output = [];
      let i = 0;
      ctx.indentationLvl += 2;
      if (state === kWeak) {
        for (; i < maxLength; i++) {
          const pos = i * 2;
          output[i] = `${formatValue(
            ctx,
            entries[pos],
            recurseTimes
          )} => ${formatValue(ctx, entries[pos + 1], recurseTimes)}`;
        }
        if (!ctx.sorted) {
          ArrayPrototypeSort(output);
        }
      } else {
        for (; i < maxLength; i++) {
          const pos = i * 2;
          const res = [
            formatValue(ctx, entries[pos], recurseTimes),
            formatValue(ctx, entries[pos + 1], recurseTimes)
          ];
          output[i] = reduceToSingleString(
            ctx,
            res,
            "",
            ["[", "]"],
            kArrayExtrasType,
            recurseTimes
          );
        }
      }
      ctx.indentationLvl -= 2;
      if (remaining > 0) {
        ArrayPrototypePush(
          output,
          `... ${remaining} more item${remaining > 1 ? "s" : ""}`
        );
      }
      return output;
    }
    function formatSetIterInner(ctx, recurseTimes, entries, state) {
      const maxArrayLength = MathMax(ctx.maxArrayLength, 0);
      const maxLength = MathMin(maxArrayLength, entries.length);
      const output = [];
      ctx.indentationLvl += 2;
      for (let i = 0; i < maxLength; i++) {
        output[i] = formatValue(ctx, entries[i], recurseTimes);
      }
      ctx.indentationLvl -= 2;
      if (state === kWeak && !ctx.sorted) {
        ArrayPrototypeSort(output);
      }
      const remaining = entries.length - maxLength;
      if (remaining > 0) {
        ArrayPrototypePush(
          output,
          `... ${remaining} more item${remaining > 1 ? "s" : ""}`
        );
      }
      return output;
    }
    const ansiPattern = "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)|(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))";
    const ansi = new SafeRegExp(ansiPattern, "g");
    function getStringWidth(str, removeControlChars = true) {
      let width = 0;
      if (removeControlChars) {
        str = stripVTControlCharacters(str);
      }
      str = StringPrototypeNormalize(str, "NFC");
      for (const char of new SafeStringIterator(str)) {
        const code = StringPrototypeCodePointAt(char, 0);
        if (isFullWidthCodePoint(code)) {
          width += 2;
        } else if (!isZeroWidthCodePoint(code)) {
          width++;
        }
      }
      return width;
    }
    const isZeroWidthCodePoint = (code) => {
      return code <= 31 || // C0 control codes
      code >= 127 && code <= 159 || // C1 control codes
      code >= 768 && code <= 879 || // Combining Diacritical Marks
      code >= 8203 && code <= 8207 || // Modifying Invisible Characters
      // Combining Diacritical Marks for Symbols
      code >= 8400 && code <= 8447 || code >= 65024 && code <= 65039 || // Variation Selectors
      code >= 65056 && code <= 65071 || // Combining Half Marks
      code >= 917760 && code <= 917999;
    };
    function stripVTControlCharacters(str) {
      return StringPrototypeReplace(str, ansi, "");
    }
    function hasOwnProperty(obj, v) {
      if (obj == null) {
        return false;
      }
      return ObjectHasOwn(obj, v);
    }
    const tableChars = {
      middleMiddle: "\u2500",
      rowMiddle: "\u253C",
      topRight: "\u2510",
      topLeft: "\u250C",
      leftMiddle: "\u251C",
      topMiddle: "\u252C",
      bottomRight: "\u2518",
      bottomLeft: "\u2514",
      bottomMiddle: "\u2534",
      rightMiddle: "\u2524",
      left: "\u2502 ",
      right: " \u2502",
      middle: " \u2502 "
    };
    function isFullWidthCodePoint(code) {
      return code >= 4352 && (code <= 4447 || // Hangul Jamo
      code === 9001 || // LEFT-POINTING ANGLE BRACKET
      code === 9002 || // RIGHT-POINTING ANGLE BRACKET
      // CJK Radicals Supplement .. Enclosed CJK Letters and Months
      code >= 11904 && code <= 12871 && code !== 12351 || // Enclosed CJK Letters and Months .. CJK Unified Ideographs Extension A
      code >= 12880 && code <= 19903 || // CJK Unified Ideographs .. Yi Radicals
      code >= 19968 && code <= 42182 || // Hangul Jamo Extended-A
      code >= 43360 && code <= 43388 || // Hangul Syllables
      code >= 44032 && code <= 55203 || // CJK Compatibility Ideographs
      code >= 63744 && code <= 64255 || // Vertical Forms
      code >= 65040 && code <= 65049 || // CJK Compatibility Forms .. Small Form Variants
      code >= 65072 && code <= 65131 || // Halfwidth and Fullwidth Forms
      code >= 65281 && code <= 65376 || code >= 65504 && code <= 65510 || // Kana Supplement
      code >= 110592 && code <= 110593 || // Enclosed Ideographic Supplement
      code >= 127488 && code <= 127569 || // Miscellaneous Symbols and Pictographs 0x1f300 - 0x1f5ff
      // Emoticons 0x1f600 - 0x1f64f
      code >= 127744 && code <= 128591 || // CJK Unified Ideographs Extension B .. Tertiary Ideographic Plane
      code >= 131072 && code <= 262141);
    }
    function renderRow(row, columnWidths, columnRightAlign) {
      let out = tableChars.left;
      for (let i = 0; i < row.length; i++) {
        const cell = row[i];
        const len = getStringWidth(cell);
        const padding = StringPrototypeRepeat(" ", columnWidths[i] - len);
        if (columnRightAlign?.[i]) {
          out += `${padding}${cell}`;
        } else {
          out += `${cell}${padding}`;
        }
        if (i !== row.length - 1) {
          out += tableChars.middle;
        }
      }
      out += tableChars.right;
      return out;
    }
    function cliTable(head, columns) {
      const rows = [];
      const columnWidths = ArrayPrototypeMap(head, (h) => getStringWidth(h));
      const longestColumn = ArrayPrototypeReduce(
        columns,
        (n, a) => MathMax(n, a.length),
        0
      );
      const columnRightAlign = ArrayPrototypeFill(
        new Array2(columnWidths.length),
        true
      );
      for (let i = 0; i < head.length; i++) {
        const column = columns[i];
        for (let j = 0; j < longestColumn; j++) {
          if (rows[j] === void 0) {
            rows[j] = [];
          }
          const value = rows[j][i] = hasOwnProperty(column, j) ? column[j] : "";
          const width = columnWidths[i] || 0;
          const counted = getStringWidth(value);
          columnWidths[i] = MathMax(width, counted);
          columnRightAlign[i] &= NumberIsInteger(+value);
        }
      }
      const divider = ArrayPrototypeMap(
        columnWidths,
        (i) => StringPrototypeRepeat(tableChars.middleMiddle, i + 2)
      );
      let result = `${tableChars.topLeft}${ArrayPrototypeJoin(
        divider,
        tableChars.topMiddle
      )}${tableChars.topRight}
${renderRow(head, columnWidths)}
${tableChars.leftMiddle}${ArrayPrototypeJoin(
        divider,
        tableChars.rowMiddle
      )}${tableChars.rightMiddle}
`;
      for (let i = 0; i < rows.length; ++i) {
        const row = rows[i];
        result += `${renderRow(row, columnWidths, columnRightAlign)}
`;
      }
      result += `${tableChars.bottomLeft}${ArrayPrototypeJoin(
        divider,
        tableChars.bottomMiddle
      )}` + tableChars.bottomRight;
      return result;
    }
    const denoInspectDefaultOptions = {
      indentationLvl: 0,
      currentDepth: 0,
      stylize: stylizeNoColor,
      showHidden: false,
      depth: 4,
      colors: false,
      showProxy: false,
      breakLength: 80,
      escapeSequences: true,
      compact: 3,
      sorted: false,
      getters: false,
      // node only
      maxArrayLength: 100,
      maxStringLength: 1e4,
      // deno: strAbbreviateSize: 10_000
      customInspect: true,
      // deno only
      /** You can override the quotes preference in inspectString.
       * Used by util.inspect() */
      // TODO(kt3k): Consider using symbol as a key to hide this from the public
      // API.
      quotes: ['"', "'", "`"],
      iterableLimit: 100,
      // similar to node's maxArrayLength, but doesn't only apply to arrays
      trailingComma: false,
      inspect,
      // TODO(@crowlKats): merge into indentationLvl
      indentLevel: 0
    };
    function getDefaultInspectOptions() {
      return {
        budget: {},
        seen: [],
        ...denoInspectDefaultOptions
      };
    }
    const DEFAULT_INDENT = "  ";
    const STR_ABBREVIATE_SIZE = 1e4;
    class CSI {
      static kClear = "\x1B[1;1H";
      static kClearScreenDown = "\x1B[0J";
    }
    const QUOTE_SYMBOL_REG = new SafeRegExp(/^[a-zA-Z_][a-zA-Z_.0-9]*$/);
    function maybeQuoteSymbol(symbol, ctx) {
      const description = SymbolPrototypeGetDescription(symbol);
      if (description === void 0) {
        return SymbolPrototypeToString(symbol);
      }
      if (RegExpPrototypeTest(QUOTE_SYMBOL_REG, description)) {
        return SymbolPrototypeToString(symbol);
      }
      return `Symbol(${quoteString(description, ctx)})`;
    }
    function quoteString(string, ctx) {
      const quote = ArrayPrototypeFind(
        ctx.quotes,
        (c) => !StringPrototypeIncludes(string, c)
      ) ?? ctx.quotes[0];
      const escapePattern = new SafeRegExp(`(?=[${quote}\\\\])`, "g");
      string = StringPrototypeReplace(string, escapePattern, "\\");
      if (ctx.escapeSequences) {
        string = replaceEscapeSequences(string);
      }
      return `${quote}${string}${quote}`;
    }
    const ESCAPE_PATTERN = new SafeRegExp(/([\b\f\n\r\t\v])/g);
    const ESCAPE_MAP = ObjectFreeze({
      "\b": "\\b",
      "\f": "\\f",
      "\n": "\\n",
      "\r": "\\r",
      "	": "\\t",
      "\v": "\\v"
    });
    const ESCAPE_PATTERN2 = new SafeRegExp("[\0-\x7F-\x9F]", "g");
    function replaceEscapeSequences(string) {
      return StringPrototypeReplace(
        StringPrototypeReplace(string, ESCAPE_PATTERN, (c) => ESCAPE_MAP[c]),
        ESCAPE_PATTERN2,
        (c) => "\\x" + StringPrototypePadStart(
          NumberPrototypeToString(StringPrototypeCharCodeAt(c, 0), 16),
          2,
          "0"
        )
      );
    }
    function inspectValueWithQuotes(value, ctx) {
      const abbreviateSize = typeof ctx.strAbbreviateSize === "undefined" ? STR_ABBREVIATE_SIZE : ctx.strAbbreviateSize;
      switch (typeof value) {
        case "string": {
          const trunc = value.length > abbreviateSize ? StringPrototypeSlice(value, 0, abbreviateSize) + "..." : value;
          return ctx.stylize(quoteString(trunc, ctx), "string");
        }
        default:
          return formatValue(ctx, value, 0);
      }
    }
    const colorKeywords = new SafeMap([
      ["black", "#000000"],
      ["silver", "#c0c0c0"],
      ["gray", "#808080"],
      ["white", "#ffffff"],
      ["maroon", "#800000"],
      ["red", "#ff0000"],
      ["purple", "#800080"],
      ["fuchsia", "#ff00ff"],
      ["green", "#008000"],
      ["lime", "#00ff00"],
      ["olive", "#808000"],
      ["yellow", "#ffff00"],
      ["navy", "#000080"],
      ["blue", "#0000ff"],
      ["teal", "#008080"],
      ["aqua", "#00ffff"],
      ["orange", "#ffa500"],
      ["aliceblue", "#f0f8ff"],
      ["antiquewhite", "#faebd7"],
      ["aquamarine", "#7fffd4"],
      ["azure", "#f0ffff"],
      ["beige", "#f5f5dc"],
      ["bisque", "#ffe4c4"],
      ["blanchedalmond", "#ffebcd"],
      ["blueviolet", "#8a2be2"],
      ["brown", "#a52a2a"],
      ["burlywood", "#deb887"],
      ["cadetblue", "#5f9ea0"],
      ["chartreuse", "#7fff00"],
      ["chocolate", "#d2691e"],
      ["coral", "#ff7f50"],
      ["cornflowerblue", "#6495ed"],
      ["cornsilk", "#fff8dc"],
      ["crimson", "#dc143c"],
      ["cyan", "#00ffff"],
      ["darkblue", "#00008b"],
      ["darkcyan", "#008b8b"],
      ["darkgoldenrod", "#b8860b"],
      ["darkgray", "#a9a9a9"],
      ["darkgreen", "#006400"],
      ["darkgrey", "#a9a9a9"],
      ["darkkhaki", "#bdb76b"],
      ["darkmagenta", "#8b008b"],
      ["darkolivegreen", "#556b2f"],
      ["darkorange", "#ff8c00"],
      ["darkorchid", "#9932cc"],
      ["darkred", "#8b0000"],
      ["darksalmon", "#e9967a"],
      ["darkseagreen", "#8fbc8f"],
      ["darkslateblue", "#483d8b"],
      ["darkslategray", "#2f4f4f"],
      ["darkslategrey", "#2f4f4f"],
      ["darkturquoise", "#00ced1"],
      ["darkviolet", "#9400d3"],
      ["deeppink", "#ff1493"],
      ["deepskyblue", "#00bfff"],
      ["dimgray", "#696969"],
      ["dimgrey", "#696969"],
      ["dodgerblue", "#1e90ff"],
      ["firebrick", "#b22222"],
      ["floralwhite", "#fffaf0"],
      ["forestgreen", "#228b22"],
      ["gainsboro", "#dcdcdc"],
      ["ghostwhite", "#f8f8ff"],
      ["gold", "#ffd700"],
      ["goldenrod", "#daa520"],
      ["greenyellow", "#adff2f"],
      ["grey", "#808080"],
      ["honeydew", "#f0fff0"],
      ["hotpink", "#ff69b4"],
      ["indianred", "#cd5c5c"],
      ["indigo", "#4b0082"],
      ["ivory", "#fffff0"],
      ["khaki", "#f0e68c"],
      ["lavender", "#e6e6fa"],
      ["lavenderblush", "#fff0f5"],
      ["lawngreen", "#7cfc00"],
      ["lemonchiffon", "#fffacd"],
      ["lightblue", "#add8e6"],
      ["lightcoral", "#f08080"],
      ["lightcyan", "#e0ffff"],
      ["lightgoldenrodyellow", "#fafad2"],
      ["lightgray", "#d3d3d3"],
      ["lightgreen", "#90ee90"],
      ["lightgrey", "#d3d3d3"],
      ["lightpink", "#ffb6c1"],
      ["lightsalmon", "#ffa07a"],
      ["lightseagreen", "#20b2aa"],
      ["lightskyblue", "#87cefa"],
      ["lightslategray", "#778899"],
      ["lightslategrey", "#778899"],
      ["lightsteelblue", "#b0c4de"],
      ["lightyellow", "#ffffe0"],
      ["limegreen", "#32cd32"],
      ["linen", "#faf0e6"],
      ["magenta", "#ff00ff"],
      ["mediumaquamarine", "#66cdaa"],
      ["mediumblue", "#0000cd"],
      ["mediumorchid", "#ba55d3"],
      ["mediumpurple", "#9370db"],
      ["mediumseagreen", "#3cb371"],
      ["mediumslateblue", "#7b68ee"],
      ["mediumspringgreen", "#00fa9a"],
      ["mediumturquoise", "#48d1cc"],
      ["mediumvioletred", "#c71585"],
      ["midnightblue", "#191970"],
      ["mintcream", "#f5fffa"],
      ["mistyrose", "#ffe4e1"],
      ["moccasin", "#ffe4b5"],
      ["navajowhite", "#ffdead"],
      ["oldlace", "#fdf5e6"],
      ["olivedrab", "#6b8e23"],
      ["orangered", "#ff4500"],
      ["orchid", "#da70d6"],
      ["palegoldenrod", "#eee8aa"],
      ["palegreen", "#98fb98"],
      ["paleturquoise", "#afeeee"],
      ["palevioletred", "#db7093"],
      ["papayawhip", "#ffefd5"],
      ["peachpuff", "#ffdab9"],
      ["peru", "#cd853f"],
      ["pink", "#ffc0cb"],
      ["plum", "#dda0dd"],
      ["powderblue", "#b0e0e6"],
      ["rosybrown", "#bc8f8f"],
      ["royalblue", "#4169e1"],
      ["saddlebrown", "#8b4513"],
      ["salmon", "#fa8072"],
      ["sandybrown", "#f4a460"],
      ["seagreen", "#2e8b57"],
      ["seashell", "#fff5ee"],
      ["sienna", "#a0522d"],
      ["skyblue", "#87ceeb"],
      ["slateblue", "#6a5acd"],
      ["slategray", "#708090"],
      ["slategrey", "#708090"],
      ["snow", "#fffafa"],
      ["springgreen", "#00ff7f"],
      ["steelblue", "#4682b4"],
      ["tan", "#d2b48c"],
      ["thistle", "#d8bfd8"],
      ["tomato", "#ff6347"],
      ["turquoise", "#40e0d0"],
      ["violet", "#ee82ee"],
      ["wheat", "#f5deb3"],
      ["whitesmoke", "#f5f5f5"],
      ["yellowgreen", "#9acd32"],
      ["rebeccapurple", "#663399"]
    ]);
    const HASH_PATTERN = new SafeRegExp(
      /^#([\dA-Fa-f]{2})([\dA-Fa-f]{2})([\dA-Fa-f]{2})([\dA-Fa-f]{2})?$/
    );
    const SMALL_HASH_PATTERN = new SafeRegExp(
      /^#([\dA-Fa-f])([\dA-Fa-f])([\dA-Fa-f])([\dA-Fa-f])?$/
    );
    const RGB_PATTERN = new SafeRegExp(
      /^rgba?\(\s*([+\-]?\d*\.?\d+)\s*,\s*([+\-]?\d*\.?\d+)\s*,\s*([+\-]?\d*\.?\d+)\s*(,\s*([+\-]?\d*\.?\d+)\s*)?\)$/
    );
    const HSL_PATTERN = new SafeRegExp(
      /^hsla?\(\s*([+\-]?\d*\.?\d+)\s*,\s*([+\-]?\d*\.?\d+)%\s*,\s*([+\-]?\d*\.?\d+)%\s*(,\s*([+\-]?\d*\.?\d+)\s*)?\)$/
    );
    function parseCssColor(colorString) {
      if (colorKeywords.has(colorString)) {
        colorString = colorKeywords.get(colorString);
      }
      const hashMatch = StringPrototypeMatch(colorString, HASH_PATTERN);
      if (hashMatch != null) {
        return [
          NumberParseInt(hashMatch[1], 16),
          NumberParseInt(hashMatch[2], 16),
          NumberParseInt(hashMatch[3], 16)
        ];
      }
      const smallHashMatch = StringPrototypeMatch(colorString, SMALL_HASH_PATTERN);
      if (smallHashMatch != null) {
        return [
          NumberParseInt(`${smallHashMatch[1]}${smallHashMatch[1]}`, 16),
          NumberParseInt(`${smallHashMatch[2]}${smallHashMatch[2]}`, 16),
          NumberParseInt(`${smallHashMatch[3]}${smallHashMatch[3]}`, 16)
        ];
      }
      const rgbMatch = StringPrototypeMatch(colorString, RGB_PATTERN);
      if (rgbMatch != null) {
        return [
          MathRound(MathMax(0, MathMin(255, rgbMatch[1]))),
          MathRound(MathMax(0, MathMin(255, rgbMatch[2]))),
          MathRound(MathMax(0, MathMin(255, rgbMatch[3])))
        ];
      }
      const hslMatch = StringPrototypeMatch(colorString, HSL_PATTERN);
      if (hslMatch != null) {
        let h = Number2(hslMatch[1]) % 360;
        if (h < 0) {
          h += 360;
        }
        const s = MathMax(0, MathMin(100, hslMatch[2])) / 100;
        const l = MathMax(0, MathMin(100, hslMatch[3])) / 100;
        const c = (1 - MathAbs(2 * l - 1)) * s;
        const x = c * (1 - MathAbs(h / 60 % 2 - 1));
        const m = l - c / 2;
        let r_;
        let g_;
        let b_;
        if (h < 60) {
          ;
          ({ 0: r_, 1: g_, 2: b_ } = [c, x, 0]);
        } else if (h < 120) {
          ;
          ({ 0: r_, 1: g_, 2: b_ } = [x, c, 0]);
        } else if (h < 180) {
          ;
          ({ 0: r_, 1: g_, 2: b_ } = [0, c, x]);
        } else if (h < 240) {
          ;
          ({ 0: r_, 1: g_, 2: b_ } = [0, x, c]);
        } else if (h < 300) {
          ;
          ({ 0: r_, 1: g_, 2: b_ } = [x, 0, c]);
        } else {
          ;
          ({ 0: r_, 1: g_, 2: b_ } = [c, 0, x]);
        }
        return [
          MathRound((r_ + m) * 255),
          MathRound((g_ + m) * 255),
          MathRound((b_ + m) * 255)
        ];
      }
      return null;
    }
    function getDefaultCss() {
      return {
        backgroundColor: null,
        color: null,
        fontWeight: null,
        fontStyle: null,
        textDecorationColor: null,
        textDecorationLine: []
      };
    }
    const SPACE_PATTERN = new SafeRegExp(/\s+/g);
    function parseCss(cssString) {
      const css = getDefaultCss();
      const rawEntries = [];
      let inValue = false;
      let currentKey = null;
      let parenthesesDepth = 0;
      let currentPart = "";
      for (let i = 0; i < cssString.length; i++) {
        const c = cssString[i];
        if (c == "(") {
          parenthesesDepth++;
        } else if (parenthesesDepth > 0) {
          if (c == ")") {
            parenthesesDepth--;
          }
        } else if (inValue) {
          if (c == ";") {
            const value = StringPrototypeTrim(currentPart);
            if (value != "") {
              ArrayPrototypePush(rawEntries, [currentKey, value]);
            }
            currentKey = null;
            currentPart = "";
            inValue = false;
            continue;
          }
        } else if (c == ":") {
          currentKey = StringPrototypeTrim(currentPart);
          currentPart = "";
          inValue = true;
          continue;
        }
        currentPart += c;
      }
      if (inValue && parenthesesDepth == 0) {
        const value = StringPrototypeTrim(currentPart);
        if (value != "") {
          ArrayPrototypePush(rawEntries, [currentKey, value]);
        }
        currentKey = null;
        currentPart = "";
      }
      for (let i = 0; i < rawEntries.length; ++i) {
        const { 0: key, 1: value } = rawEntries[i];
        if (key == "background-color") {
          if (value != null) {
            css.backgroundColor = value;
          }
        } else if (key == "color") {
          if (value != null) {
            css.color = value;
          }
        } else if (key == "font-weight") {
          if (value == "bold") {
            css.fontWeight = value;
          }
        } else if (key == "font-style") {
          if (ArrayPrototypeIncludes(["italic", "oblique", "oblique 14deg"], value)) {
            css.fontStyle = "italic";
          }
        } else if (key == "text-decoration-line") {
          css.textDecorationLine = [];
          const lineTypes = StringPrototypeSplit(value, SPACE_PATTERN);
          for (let i2 = 0; i2 < lineTypes.length; ++i2) {
            const lineType = lineTypes[i2];
            if (ArrayPrototypeIncludes(
              ["line-through", "overline", "underline"],
              lineType
            )) {
              ArrayPrototypePush(css.textDecorationLine, lineType);
            }
          }
        } else if (key == "text-decoration-color") {
          const color = parseCssColor(value);
          if (color != null) {
            css.textDecorationColor = color;
          }
        } else if (key == "text-decoration") {
          css.textDecorationColor = null;
          css.textDecorationLine = [];
          const args = StringPrototypeSplit(value, SPACE_PATTERN);
          for (let i2 = 0; i2 < args.length; ++i2) {
            const arg = args[i2];
            const maybeColor = parseCssColor(arg);
            if (maybeColor != null) {
              css.textDecorationColor = maybeColor;
            } else if (ArrayPrototypeIncludes(
              ["line-through", "overline", "underline"],
              arg
            )) {
              ArrayPrototypePush(css.textDecorationLine, arg);
            }
          }
        }
      }
      return css;
    }
    function colorEquals(color1, color2) {
      return color1?.[0] == color2?.[0] && color1?.[1] == color2?.[1] && color1?.[2] == color2?.[2];
    }
    function cssToAnsi(css, prevCss = null) {
      prevCss = prevCss ?? getDefaultCss();
      let ansi2 = "";
      if (!colorEquals(css.backgroundColor, prevCss.backgroundColor)) {
        if (css.backgroundColor == null) {
          ansi2 += "\x1B[49m";
        } else if (css.backgroundColor == "black") {
          ansi2 += `\x1B[40m`;
        } else if (css.backgroundColor == "red") {
          ansi2 += `\x1B[41m`;
        } else if (css.backgroundColor == "green") {
          ansi2 += `\x1B[42m`;
        } else if (css.backgroundColor == "yellow") {
          ansi2 += `\x1B[43m`;
        } else if (css.backgroundColor == "blue") {
          ansi2 += `\x1B[44m`;
        } else if (css.backgroundColor == "magenta") {
          ansi2 += `\x1B[45m`;
        } else if (css.backgroundColor == "cyan") {
          ansi2 += `\x1B[46m`;
        } else if (css.backgroundColor == "white") {
          ansi2 += `\x1B[47m`;
        } else {
          if (ArrayIsArray(css.backgroundColor)) {
            const { 0: r, 1: g, 2: b } = css.backgroundColor;
            ansi2 += `\x1B[48;2;${r};${g};${b}m`;
          } else {
            const parsed = parseCssColor(css.backgroundColor);
            if (parsed !== null) {
              const { 0: r, 1: g, 2: b } = parsed;
              ansi2 += `\x1B[48;2;${r};${g};${b}m`;
            } else {
              ansi2 += "\x1B[49m";
            }
          }
        }
      }
      if (!colorEquals(css.color, prevCss.color)) {
        if (css.color == null) {
          ansi2 += "\x1B[39m";
        } else if (css.color == "black") {
          ansi2 += `\x1B[30m`;
        } else if (css.color == "red") {
          ansi2 += `\x1B[31m`;
        } else if (css.color == "green") {
          ansi2 += `\x1B[32m`;
        } else if (css.color == "yellow") {
          ansi2 += `\x1B[33m`;
        } else if (css.color == "blue") {
          ansi2 += `\x1B[34m`;
        } else if (css.color == "magenta") {
          ansi2 += `\x1B[35m`;
        } else if (css.color == "cyan") {
          ansi2 += `\x1B[36m`;
        } else if (css.color == "white") {
          ansi2 += `\x1B[37m`;
        } else {
          if (ArrayIsArray(css.color)) {
            const { 0: r, 1: g, 2: b } = css.color;
            ansi2 += `\x1B[38;2;${r};${g};${b}m`;
          } else {
            const parsed = parseCssColor(css.color);
            if (parsed !== null) {
              const { 0: r, 1: g, 2: b } = parsed;
              ansi2 += `\x1B[38;2;${r};${g};${b}m`;
            } else {
              ansi2 += "\x1B[39m";
            }
          }
        }
      }
      if (css.fontWeight != prevCss.fontWeight) {
        if (css.fontWeight == "bold") {
          ansi2 += `\x1B[1m`;
        } else {
          ansi2 += "\x1B[22m";
        }
      }
      if (css.fontStyle != prevCss.fontStyle) {
        if (css.fontStyle == "italic") {
          ansi2 += `\x1B[3m`;
        } else {
          ansi2 += "\x1B[23m";
        }
      }
      if (!colorEquals(css.textDecorationColor, prevCss.textDecorationColor)) {
        if (css.textDecorationColor != null) {
          const { 0: r, 1: g, 2: b } = css.textDecorationColor;
          ansi2 += `\x1B[58;2;${r};${g};${b}m`;
        } else {
          ansi2 += "\x1B[59m";
        }
      }
      if (ArrayPrototypeIncludes(css.textDecorationLine, "line-through") != ArrayPrototypeIncludes(prevCss.textDecorationLine, "line-through")) {
        if (ArrayPrototypeIncludes(css.textDecorationLine, "line-through")) {
          ansi2 += "\x1B[9m";
        } else {
          ansi2 += "\x1B[29m";
        }
      }
      if (ArrayPrototypeIncludes(css.textDecorationLine, "overline") != ArrayPrototypeIncludes(prevCss.textDecorationLine, "overline")) {
        if (ArrayPrototypeIncludes(css.textDecorationLine, "overline")) {
          ansi2 += "\x1B[53m";
        } else {
          ansi2 += "\x1B[55m";
        }
      }
      if (ArrayPrototypeIncludes(css.textDecorationLine, "underline") != ArrayPrototypeIncludes(prevCss.textDecorationLine, "underline")) {
        if (ArrayPrototypeIncludes(css.textDecorationLine, "underline")) {
          ansi2 += "\x1B[4m";
        } else {
          ansi2 += "\x1B[24m";
        }
      }
      return ansi2;
    }
    function inspectArgs(args, inspectOptions = { __proto__: null }) {
      const ctx = {
        ...getDefaultInspectOptions(),
        colors: inspectOptions.colors ?? !noColorStdout(),
        ...inspectOptions
      };
      if (inspectOptions.iterableLimit !== void 0) {
        ctx.maxArrayLength = inspectOptions.iterableLimit;
      }
      if (inspectOptions.strAbbreviateSize !== void 0) {
        ctx.maxStringLength = inspectOptions.strAbbreviateSize;
      }
      if (ctx.colors)
        ctx.stylize = createStylizeWithColor(styles, colors);
      if (ctx.maxArrayLength === null)
        ctx.maxArrayLength = Infinity;
      if (ctx.maxStringLength === null)
        ctx.maxStringLength = Infinity;
      const noColor = !ctx.colors;
      const first = args[0];
      let a = 0;
      let string = "";
      if (typeof first == "string" && args.length > 1) {
        a++;
        let appendedChars = 0;
        let usedStyle = false;
        let prevCss = null;
        for (let i = 0; i < first.length - 1; i++) {
          if (first[i] == "%") {
            const char = first[++i];
            if (a < args.length) {
              let formattedArg = null;
              if (char == "s") {
                formattedArg = String2(args[a++]);
              } else if (ArrayPrototypeIncludes(["d", "i"], char)) {
                const value = args[a++];
                if (typeof value == "bigint") {
                  formattedArg = `${value}n`;
                } else if (typeof value == "number") {
                  formattedArg = `${NumberParseInt(String2(value))}`;
                } else {
                  formattedArg = "NaN";
                }
              } else if (char == "f") {
                const value = args[a++];
                if (typeof value == "number") {
                  formattedArg = `${value}`;
                } else {
                  formattedArg = "NaN";
                }
              } else if (ArrayPrototypeIncludes(["O", "o"], char)) {
                formattedArg = formatValue(ctx, args[a++], 0);
              } else if (char == "c") {
                const value = args[a++];
                if (!noColor) {
                  const css = parseCss(value);
                  formattedArg = cssToAnsi(css, prevCss);
                  if (formattedArg != "") {
                    usedStyle = true;
                    prevCss = css;
                  }
                } else {
                  formattedArg = "";
                }
              }
              if (formattedArg != null) {
                string += StringPrototypeSlice(first, appendedChars, i - 1) + formattedArg;
                appendedChars = i + 1;
              }
            }
            if (char == "%") {
              string += StringPrototypeSlice(first, appendedChars, i - 1) + "%";
              appendedChars = i + 1;
            }
          }
        }
        string += StringPrototypeSlice(first, appendedChars);
        if (usedStyle) {
          string += "\x1B[0m";
        }
      }
      for (; a < args.length; a++) {
        if (a > 0) {
          string += " ";
        }
        if (typeof args[a] == "string") {
          string += args[a];
        } else {
          string += formatValue(ctx, args[a], 0);
        }
      }
      if (ctx.indentLevel > 0) {
        const groupIndent = StringPrototypeRepeat(DEFAULT_INDENT, ctx.indentLevel);
        string = groupIndent + StringPrototypeReplaceAll(string, "\n", `
${groupIndent}`);
      }
      return string;
    }
    function createStylizeWithColor(styles2, colors2) {
      return function stylizeWithColor(str, styleType) {
        const style = styles2[styleType];
        if (style !== void 0) {
          const color = colors2[style];
          if (color !== void 0) {
            return `\x1B[${color[0]}m${str}\x1B[${color[1]}m`;
          }
        }
        return str;
      };
    }
    const countMap = new SafeMap();
    const timerMap = new SafeMap();
    const isConsoleInstance = Symbol2("isConsoleInstance");
    function getConsoleInspectOptions(noColor) {
      return {
        ...getDefaultInspectOptions(),
        colors: !noColor,
        stylize: noColor ? stylizeNoColor : createStylizeWithColor(styles, colors)
      };
    }
    class Console2 {
      #printFunc = null;
      [isConsoleInstance] = false;
      constructor(printFunc) {
        this.#printFunc = printFunc;
        this.indentLevel = 0;
        this[isConsoleInstance] = true;
        const console = ObjectCreate(
          {},
          {
            [SymbolToStringTag]: {
              enumerable: false,
              writable: false,
              configurable: true,
              value: "console"
            }
          }
        );
        ObjectAssign(console, this);
        return console;
      }
      log = (...args) => {
        this.#printFunc(
          inspectArgs(args, {
            ...getConsoleInspectOptions(noColorStdout()),
            indentLevel: this.indentLevel
          }) + "\n",
          1
        );
      };
      debug = (...args) => {
        this.#printFunc(
          inspectArgs(args, {
            ...getConsoleInspectOptions(noColorStdout()),
            indentLevel: this.indentLevel
          }) + "\n",
          0
        );
      };
      info = (...args) => {
        this.#printFunc(
          inspectArgs(args, {
            ...getConsoleInspectOptions(noColorStdout()),
            indentLevel: this.indentLevel
          }) + "\n",
          1
        );
      };
      dir = (obj = void 0, options = { __proto__: null }) => {
        this.#printFunc(
          inspectArgs([obj], {
            ...getConsoleInspectOptions(noColorStdout()),
            ...options
          }) + "\n",
          1
        );
      };
      dirxml = this.dir;
      warn = (...args) => {
        this.#printFunc(
          inspectArgs(args, {
            ...getConsoleInspectOptions(noColorStderr()),
            indentLevel: this.indentLevel
          }) + "\n",
          2
        );
      };
      error = (...args) => {
        this.#printFunc(
          inspectArgs(args, {
            ...getConsoleInspectOptions(noColorStderr()),
            indentLevel: this.indentLevel
          }) + "\n",
          3
        );
      };
      assert = (condition = false, ...args) => {
        if (condition) {
          return;
        }
        if (args.length === 0) {
          this.error("Assertion failed");
          return;
        }
        const [first, ...rest] = new SafeArrayIterator(args);
        if (typeof first === "string") {
          this.error(`Assertion failed: ${first}`, ...new SafeArrayIterator(rest));
          return;
        }
        this.error(`Assertion failed:`, ...new SafeArrayIterator(args));
      };
      count = (label = "default") => {
        label = String2(label);
        if (MapPrototypeHas(countMap, label)) {
          const current = MapPrototypeGet(countMap, label) || 0;
          MapPrototypeSet(countMap, label, current + 1);
        } else {
          MapPrototypeSet(countMap, label, 1);
        }
        this.info(`${label}: ${MapPrototypeGet(countMap, label)}`);
      };
      countReset = (label = "default") => {
        label = String2(label);
        if (MapPrototypeHas(countMap, label)) {
          MapPrototypeSet(countMap, label, 0);
        } else {
          this.warn(`Count for '${label}' does not exist`);
        }
      };
      table = (data = void 0, properties = void 0) => {
        if (properties !== void 0 && !ArrayIsArray(properties)) {
          throw new Error2(
            "The 'properties' argument must be of type Array. Received type " + typeof properties
          );
        }
        if (data === null || typeof data !== "object") {
          return this.log(data);
        }
        const stringifyValue = (value) => inspectValueWithQuotes(value, {
          ...getDefaultInspectOptions(),
          depth: 1,
          compact: true
        });
        const toTable = (header2, body2) => this.log(cliTable(header2, body2));
        let resultData;
        const isSetObject = isSet2(data);
        const isMapObject = isMap2(data);
        const valuesKey = "Values";
        const indexKey = isSetObject || isMapObject ? "(iter idx)" : "(idx)";
        if (isSetObject) {
          resultData = [...new SafeSetIterator(data)];
        } else if (isMapObject) {
          let idx = 0;
          resultData = { __proto__: null };
          MapPrototypeForEach(data, (v, k) => {
            resultData[idx] = { Key: k, Values: v };
            idx++;
          });
        } else {
          resultData = data;
        }
        const keys = ObjectKeys(resultData);
        const numRows = keys.length;
        const objectValues = properties ? ObjectFromEntries(
          ArrayPrototypeMap(properties, (name) => [
            name,
            ArrayPrototypeFill(new Array2(numRows), "")
          ])
        ) : {};
        const indexKeys = [];
        const values = [];
        let hasPrimitives = false;
        ArrayPrototypeForEach(keys, (k, idx) => {
          const value = resultData[k];
          const primitive = value === null || typeof value !== "function" && typeof value !== "object";
          if (properties === void 0 && primitive) {
            hasPrimitives = true;
            ArrayPrototypePush(values, stringifyValue(value));
          } else {
            const valueObj = value || {};
            const keys2 = properties || ObjectKeys(valueObj);
            for (let i = 0; i < keys2.length; ++i) {
              const k2 = keys2[i];
              if (!primitive && ReflectHas(valueObj, k2)) {
                if (!ReflectHas(objectValues, k2)) {
                  objectValues[k2] = ArrayPrototypeFill(new Array2(numRows), "");
                }
                objectValues[k2][idx] = stringifyValue(valueObj[k2]);
              }
            }
            ArrayPrototypePush(values, "");
          }
          ArrayPrototypePush(indexKeys, k);
        });
        const headerKeys = ObjectKeys(objectValues);
        const bodyValues = ObjectValues(objectValues);
        const headerProps = properties || [
          ...new SafeArrayIterator(headerKeys),
          !isMapObject && hasPrimitives && valuesKey
        ];
        const header = ArrayPrototypeFilter(
          [indexKey, ...new SafeArrayIterator(headerProps)],
          Boolean2
        );
        const body = [indexKeys, ...new SafeArrayIterator(bodyValues), values];
        toTable(header, body);
      };
      time = (label = "default") => {
        label = String2(label);
        if (MapPrototypeHas(timerMap, label)) {
          this.warn(`Timer '${label}' already exists`);
          return;
        }
        MapPrototypeSet(timerMap, label, DateNow());
      };
      timeLog = (label = "default", ...args) => {
        label = String2(label);
        if (!MapPrototypeHas(timerMap, label)) {
          this.warn(`Timer '${label}' does not exist`);
          return;
        }
        const startTime = MapPrototypeGet(timerMap, label);
        const duration = DateNow() - startTime;
        this.info(`${label}: ${duration}ms`, ...new SafeArrayIterator(args));
      };
      timeEnd = (label = "default") => {
        label = String2(label);
        if (!MapPrototypeHas(timerMap, label)) {
          this.warn(`Timer '${label}' does not exist`);
          return;
        }
        const startTime = MapPrototypeGet(timerMap, label);
        MapPrototypeDelete(timerMap, label);
        const duration = DateNow() - startTime;
        this.info(`${label}: ${duration}ms`);
      };
      group = (...label) => {
        if (label.length > 0) {
          this.log(...new SafeArrayIterator(label));
        }
        this.indentLevel += 2;
      };
      groupCollapsed = this.group;
      groupEnd = () => {
        if (this.indentLevel > 0) {
          this.indentLevel -= 2;
        }
      };
      clear = () => {
        this.indentLevel = 0;
        this.#printFunc(CSI.kClear, 1);
        this.#printFunc(CSI.kClearScreenDown, 1);
      };
      trace = (...args) => {
        const message = inspectArgs(args, {
          ...getConsoleInspectOptions(noColorStderr()),
          indentLevel: 0
        });
        const err = {
          name: "Trace",
          message
        };
        ErrorCaptureStackTrace(err, this.trace);
        this.error(err.stack);
      };
      // These methods are noops, but when the inspector is connected, they
      // call into V8.
      profile = (_label) => {
      };
      profileEnd = (_label) => {
      };
      timeStamp = (_label) => {
      };
      static [SymbolHasInstance](instance) {
        return instance[isConsoleInstance];
      }
    }
    const customInspect = SymbolFor("Deno.customInspect");
    function inspect(value, inspectOptions = { __proto__: null }) {
      const ctx = {
        ...getDefaultInspectOptions(),
        ...inspectOptions
      };
      if (inspectOptions.iterableLimit !== void 0) {
        ctx.maxArrayLength = inspectOptions.iterableLimit;
      }
      if (inspectOptions.strAbbreviateSize !== void 0) {
        ctx.maxStringLength = inspectOptions.strAbbreviateSize;
      }
      if (ctx.colors)
        ctx.stylize = createStylizeWithColor(styles, colors);
      if (ctx.maxArrayLength === null)
        ctx.maxArrayLength = Infinity;
      if (ctx.maxStringLength === null)
        ctx.maxStringLength = Infinity;
      return formatValue(ctx, value, 0);
    }
    function createFilteredInspectProxy({ object, keys, evaluate }) {
      const obj = class {
      };
      if (object.constructor?.name) {
        ObjectDefineProperty(obj, "name", { value: object.constructor.name });
      }
      return new Proxy2(new obj(), {
        get(_target, key) {
          if (key === SymbolToStringTag) {
            return object.constructor?.name;
          } else if (ArrayPrototypeIncludes(keys, key)) {
            return ReflectGet(object, key);
          } else {
            return void 0;
          }
        },
        getOwnPropertyDescriptor(_target, key) {
          if (!ArrayPrototypeIncludes(keys, key)) {
            return void 0;
          } else if (evaluate) {
            return getEvaluatedDescriptor(object, key);
          } else {
            return getDescendantPropertyDescriptor(object, key) ?? getEvaluatedDescriptor(object, key);
          }
        },
        has(_target, key) {
          return ArrayPrototypeIncludes(keys, key);
        },
        ownKeys() {
          return keys;
        }
      });
      function getDescendantPropertyDescriptor(object2, key) {
        let propertyDescriptor = ReflectGetOwnPropertyDescriptor(object2, key);
        if (!propertyDescriptor) {
          const prototype = ReflectGetPrototypeOf(object2);
          if (prototype) {
            propertyDescriptor = getDescendantPropertyDescriptor(prototype, key);
          }
        }
        return propertyDescriptor;
      }
      function getEvaluatedDescriptor(object2, key) {
        return {
          configurable: true,
          enumerable: true,
          value: object2[key]
        };
      }
    }
    return Console2;
  };
  function createConsole(noColorStdout = () => false, noColorStderr = () => false) {
    core_default();
    return console_default(noColorStdout, noColorStderr);
  }

  // deno-scripts/00_console.ts
  var Console = createConsole(() => false, () => false);
  globalThis.console = new Console(globalThis.__print);
  globalThis.Console = Console;
})();
