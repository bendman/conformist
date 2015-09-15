(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireDefault = __webpack_require__(1)['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _schema = __webpack_require__(2);
	
	var _schema2 = _interopRequireDefault(_schema);
	
	var _validation = __webpack_require__(56);
	
	var _validation2 = _interopRequireDefault(_validation);
	
	exports['default'] = { Schema: _schema2['default'], Validation: _validation2['default'] };
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	
	exports["default"] = function (obj) {
	  return obj && obj.__esModule ? obj : {
	    "default": obj
	  };
	};
	
	exports.__esModule = true;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _get = __webpack_require__(3)['default'];
	
	var _inherits = __webpack_require__(11)['default'];
	
	var _classCallCheck = __webpack_require__(14)['default'];
	
	var _createClass = __webpack_require__(15)['default'];
	
	var _slicedToArray = __webpack_require__(18)['default'];
	
	var _Object$assign = __webpack_require__(37)['default'];
	
	var _Reflect$ownKeys = __webpack_require__(42)['default'];
	
	var _Object$keys = __webpack_require__(48)['default'];
	
	var _Object$entries = __webpack_require__(50)['default'];
	
	var _Object$values = __webpack_require__(53)['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _util = __webpack_require__(55);
	
	// Thank you IE, for making this necessary
	// Per http://babeljs.io/docs/advanced/caveats/, static methods do not
	// propagate down the inheritance chain because __proto__ is not a thing.
	// Decorate any concrete schema class with this to ensure that it and any
	// cloned versions of itself will have these static methods.
	function staticify(cls) {
	  _Object$assign(cls, {
	    clone: function clone(overrides) {
	      var _this = this;
	
	      var cloned = (function (_ref) {
	        _inherits(cloned, _ref);
	
	        function cloned() {
	          _classCallCheck(this, cloned);
	
	          _get(Object.getPrototypeOf(cloned.prototype), 'constructor', this).apply(this, arguments);
	        }
	
	        return cloned;
	      })(this);
	
	      ;
	      _Object$assign(cloned.prototype, overrides);
	      staticify(cloned);
	      // Also, thank you IE, for making this necessary
	      _Reflect$ownKeys(this).forEach(function (k) {
	        if (!cloned.hasOwnProperty(k)) {
	          cloned[k] = _this[k];
	        }
	      });
	      return cloned;
	    },
	
	    named: function named(name) {
	      return this.clone({ name: name });
	    },
	
	    using: function using(overrides) {
	      // maybe pre-process overrides?
	      return this.clone(overrides);
	    },
	
	    validatedBy: function validatedBy() {
	      for (var _len = arguments.length, validators = Array(_len), _key = 0; _key < _len; _key++) {
	        validators[_key] = arguments[_key];
	      }
	
	      return this.clone({ validators: validators });
	    },
	
	    fromDefaults: function fromDefaults() {
	      var defaulted = new this();
	      defaulted.setDefault();
	      return defaulted;
	    }
	  });
	}
	
	var Type = (function () {
	  function Type(value) {
	    _classCallCheck(this, Type);
	
	    this.valid = undefined;
	    value !== undefined && this.set(value);
	    this._watchers = [];
	  }
	
	  _createClass(Type, [{
	    key: 'observe',
	    value: function observe(watcher) {
	      this._watchers.push(watcher);
	    }
	  }, {
	    key: 'notifyWatchers',
	    value: function notifyWatchers() {
	      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        args[_key2] = arguments[_key2];
	      }
	
	      this._watchers.forEach(function (watcher) {
	        return watcher.apply(undefined, args);
	      });
	    }
	  }, {
	    key: 'addError',
	    value: function addError(error) {
	      this.errors.push(error);
	    }
	  }, {
	    key: 'setDefault',
	    value: function setDefault() {
	      this.set(this['default']);
	    }
	  }, {
	    key: 'hasValidator',
	    value: function hasValidator(validator) {
	      return this.validatorFactories.indexOf(validator) !== -1;
	    }
	  }, {
	    key: 'validatorFactories',
	    get: function get() {
	      return this.validators.map(function (v) {
	        return v.factory;
	      });
	    }
	  }]);
	
	  return Type;
	})();
	
	Type.prototype['default'] = undefined;
	Type.prototype.validators = [];
	
	var AdaptationError = (function (_Error) {
	  _inherits(AdaptationError, _Error);
	
	  function AdaptationError() {
	    _classCallCheck(this, AdaptationError);
	
	    _get(Object.getPrototypeOf(AdaptationError.prototype), 'constructor', this).apply(this, arguments);
	  }
	
	  return AdaptationError;
	})(Error);
	
	;
	
	var Scalar = (function (_Type) {
	  _inherits(Scalar, _Type);
	
	  function Scalar() {
	    _classCallCheck(this, Scalar);
	
	    _get(Object.getPrototypeOf(Scalar.prototype), 'constructor', this).call(this);
	    this._watchers = [];
	    this.value = undefined;
	  }
	
	  _createClass(Scalar, [{
	    key: 'set',
	    value: function set(raw) {
	      try {
	        this.value = this.adapt(raw);
	      } catch (e) {
	        this.value = undefined;
	        this.notifyWatchers(false, this);
	        return false;
	      }
	      this.notifyWatchers(true, this);
	
	      return true;
	    }
	  }, {
	    key: 'validate',
	    value: function validate(context) {
	      var _this2 = this;
	
	      this.errors = [];
	
	      this.valid = this.validators.reduce(function (valid, v) {
	        return valid && v(_this2, context);
	      }, true);
	
	      return this.valid;
	    }
	  }, {
	    key: 'allErrors',
	    get: function get() {
	      return this.errors;
	    }
	  }]);
	
	  return Scalar;
	})(Type);
	
	var Bool = (function (_Scalar) {
	  _inherits(Bool, _Scalar);
	
	  function Bool() {
	    _classCallCheck(this, _Bool);
	
	    _get(Object.getPrototypeOf(_Bool.prototype), 'constructor', this).apply(this, arguments);
	  }
	
	  _createClass(Bool, [{
	    key: 'adapt',
	    value: function adapt(raw) {
	      // TODO: more restrictive?
	      return !!raw;
	    }
	  }]);
	
	  var _Bool = Bool;
	  Bool = staticify(Bool) || Bool;
	  return Bool;
	})(Scalar);
	
	var Str = (function (_Scalar2) {
	  _inherits(Str, _Scalar2);
	
	  function Str() {
	    _classCallCheck(this, _Str);
	
	    _get(Object.getPrototypeOf(_Str.prototype), 'constructor', this).apply(this, arguments);
	  }
	
	  _createClass(Str, [{
	    key: 'adapt',
	    value: function adapt(raw) {
	      return raw.toString();
	    }
	  }]);
	
	  var _Str = Str;
	  Str = staticify(Str) || Str;
	  return Str;
	})(Scalar);
	
	var Num = (function (_Scalar3) {
	  _inherits(Num, _Scalar3);
	
	  function Num() {
	    _classCallCheck(this, Num);
	
	    _get(Object.getPrototypeOf(Num.prototype), 'constructor', this).apply(this, arguments);
	  }
	
	  return Num;
	})(Scalar);
	
	var Int = (function (_Num) {
	  _inherits(Int, _Num);
	
	  function Int() {
	    _classCallCheck(this, _Int);
	
	    _get(Object.getPrototypeOf(_Int.prototype), 'constructor', this).apply(this, arguments);
	  }
	
	  _createClass(Int, [{
	    key: 'adapt',
	    value: function adapt(raw) {
	      var value = parseInt(raw, 10);
	      if (isNaN(value)) {
	        throw new AdaptationError(value + ' is not a number');
	      }
	      return value;
	    }
	  }]);
	
	  var _Int = Int;
	  Int = staticify(Int) || Int;
	  return Int;
	})(Num);
	
	var Enum = (function (_Scalar4) {
	  _inherits(Enum, _Scalar4);
	
	  function Enum(value) {
	    _classCallCheck(this, _Enum);
	
	    _get(Object.getPrototypeOf(_Enum.prototype), 'constructor', this).call(this);
	    this.childSchema = new this.childType();
	    if (value !== undefined) {
	      this.set(value);
	    }
	  }
	
	  _createClass(Enum, [{
	    key: 'adapt',
	    value: function adapt(raw) {
	      var value = this.childSchema.adapt(raw);
	      if (!this.validValue(value)) {
	        throw new AdaptationError();
	      }
	      return value;
	    }
	  }, {
	    key: 'validValue',
	    value: function validValue(value) {
	      return this.validValues.indexOf(value) !== -1;
	    }
	  }], [{
	    key: 'of',
	    value: function of(childType) {
	      return this.clone({ childType: childType });
	    }
	  }, {
	    key: 'valued',
	    value: function valued(validValues) {
	      return this.clone({ validValues: validValues });
	    }
	  }]);
	
	  var _Enum = Enum;
	  Enum = staticify(Enum) || Enum;
	  return Enum;
	})(Scalar);
	
	Enum.prototype.childType = Str;
	
	var Container = (function (_Type2) {
	  _inherits(Container, _Type2);
	
	  function Container() {
	    _classCallCheck(this, Container);
	
	    _get(Object.getPrototypeOf(Container.prototype), 'constructor', this).apply(this, arguments);
	  }
	
	  _createClass(Container, [{
	    key: 'validate',
	    value: function validate(context) {
	      var _this3 = this;
	
	      this.errors = [];
	      var success = !!this.memberValues.reduce(function (valid, member) {
	        var result = member.validate(context);
	        return valid && result;
	      }, true);
	      this.valid = !!this.validators.reduce(function (valid, validator) {
	        return valid &= validator(_this3, context);
	      }, success);
	      return this.valid;
	    }
	  }]);
	
	  return Container;
	})(Type);
	
	var List = (function (_Container) {
	  _inherits(List, _Container);
	
	  function List() {
	    _classCallCheck(this, _List);
	
	    _get(Object.getPrototypeOf(_List.prototype), 'constructor', this).apply(this, arguments);
	  }
	
	  _createClass(List, [{
	    key: 'set',
	
	    // Attempt to convert each member of raw array to the
	    // member type of the List. Any failure will result in an
	    // empty array for this.members.
	
	    // TODO: short-circuit conversion if any member fails.
	    value: function set(raw) {
	      var _this4 = this;
	
	      this.members = [];
	      if (!(raw && raw.forEach)) {
	        this.notifyWatchers(false, this);
	        return false;
	      }
	      var success = true;
	      var items = [];
	      raw.forEach(function (mbr) {
	        var member = new _this4.memberType();
	        member.parent = _this4;
	        success &= member.set(mbr);
	        member.observe(_this4.notifyWatchers.bind(_this4));
	        items.push(member);
	      });
	      this.members = success ? items : this.members;
	      this.notifyWatchers(!!success, this);
	      return !!success;
	    }
	  }, {
	    key: 'value',
	    get: function get() {
	      return this.members.map(function (m) {
	        return m.value;
	      });
	    }
	  }, {
	    key: 'members',
	    get: function get() {
	      return this._members;
	    },
	    set: function set(members) {
	      this._members = members;
	    }
	  }, {
	    key: 'memberValues',
	
	    // aliased for concordance with Container.prototype.validate()
	    get: function get() {
	      return this._members;
	    }
	  }, {
	    key: 'allErrors',
	    get: function get() {
	      return {
	        self: this.errors,
	        children: this.members.map(function (m) {
	          return m.allErrors;
	        })
	      };
	    }
	  }], [{
	    key: 'of',
	    value: function of(type) {
	      return this.clone({ memberType: type });
	    }
	  }]);
	
	  var _List = List;
	  List = staticify(List) || List;
	  return List;
	})(Container);
	
	List.prototype.members = [];
	
	var Map = (function (_Container2) {
	  _inherits(Map, _Container2);
	
	  function Map(value) {
	    _classCallCheck(this, _Map);
	
	    _get(Object.getPrototypeOf(_Map.prototype), 'constructor', this).call(this, value);
	    // construct an empty schema
	    if (!this._members) {
	      this.set({});
	    }
	  }
	
	  _createClass(Map, [{
	    key: 'set',
	    value: function set(raw) {
	      var _this5 = this;
	
	      var _ref2 = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	      var _ref2$notify = _ref2.notify;
	      var notify = _ref2$notify === undefined ? true : _ref2$notify;
	
	      var success = true;
	      if (raw === undefined) {
	        raw = {};
	      }
	      if (!(0, _util.isObject)(raw)) {
	        raw = {};
	        success = false;
	      }
	      var keys = _Object$keys(this.memberSchema);
	      var members = {};
	      success = !!keys.reduce(function (success, k) {
	        var member = new _this5.memberSchema[k]();
	        member.name = k;
	        member.parent = _this5;
	        members[k] = member;
	        if (raw[k] !== undefined) {
	          success &= member.set(raw[k]);
	        }
	        member.observe(_this5.notifyWatchers.bind(_this5));
	        return success;
	      }, true);
	
	      if (success) {
	        // should this.members only be defined here?
	        // or in constructor?
	        this.members = members;
	      } else {
	        // TODO: We don't need to do this if raw was not an object.
	        this.set({}, { notify: false });
	      }
	      if (notify) this.notifyWatchers(success, this);
	      return success;
	    }
	  }, {
	    key: 'value',
	    get: function get() {
	      var _this6 = this;
	
	      return _Object$keys(this._members).reduce(function (v, m) {
	        v[m] = _this6._members[m].value;
	        return v;
	      }, {});
	    }
	  }, {
	    key: 'default',
	    get: function get() {
	      return _Object$entries(this.memberSchema).reduce(function (defaults, _ref3) {
	        var _ref32 = _slicedToArray(_ref3, 2);
	
	        var k = _ref32[0];
	        var v = _ref32[1];
	
	        if (v.prototype['default'] !== undefined) {
	          defaults[k] = v.prototype['default'];
	        }
	        return defaults;
	      }, {});
	    }
	  }, {
	    key: 'memberValues',
	
	    // member elements as list
	    get: function get() {
	      return _Object$values(this._members);
	    }
	  }, {
	    key: 'members',
	    get: function get() {
	      return this._members;
	    },
	    set: function set(members) {
	      this._members = members;
	    }
	  }, {
	    key: 'allErrors',
	    get: function get() {
	      return {
	        self: this.errors,
	        children: _Object$entries(this.members).reduce(function (errors, _ref4) {
	          var _ref42 = _slicedToArray(_ref4, 2);
	
	          var k = _ref42[0];
	          var v = _ref42[1];
	
	          errors[k] = v.allErrors;
	          return errors;
	        }, {})
	      };
	    }
	  }], [{
	    key: 'of',
	    value: function of() {
	      for (var _len3 = arguments.length, members = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	        members[_key3] = arguments[_key3];
	      }
	
	      var memberSchema = members.reduce(function (ms, m) {
	        ms[m.prototype.name] = m;
	        return ms;
	      }, {});
	      return this.clone({ memberSchema: memberSchema });
	    }
	  }, {
	    key: 'fromDefaults',
	    value: function fromDefaults() {
	      var defaulted = new this();
	      _Object$entries(defaulted['default']).forEach(function (_ref5) {
	        var _ref52 = _slicedToArray(_ref5, 2);
	
	        var k = _ref52[0];
	        var v = _ref52[1];
	        return defaulted.members[k].set(v);
	      });
	      return defaulted;
	    }
	  }]);
	
	  var _Map = Map;
	  Map = staticify(Map) || Map;
	  return Map;
	})(Container);
	
	exports['default'] = { Type: Type, Scalar: Scalar, Num: Num, Int: Int, Str: Str, Bool: Bool, Enum: Enum, Container: Container, List: List, Map: Map };
	module.exports = exports['default'];

	// ?

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _Object$getOwnPropertyDescriptor = __webpack_require__(4)["default"];
	
	exports["default"] = function get(_x, _x2, _x3) {
	  var _again = true;
	
	  _function: while (_again) {
	    var object = _x,
	        property = _x2,
	        receiver = _x3;
	    desc = parent = getter = undefined;
	    _again = false;
	    if (object === null) object = Function.prototype;
	
	    var desc = _Object$getOwnPropertyDescriptor(object, property);
	
	    if (desc === undefined) {
	      var parent = Object.getPrototypeOf(object);
	
	      if (parent === null) {
	        return undefined;
	      } else {
	        _x = parent;
	        _x2 = property;
	        _x3 = receiver;
	        _again = true;
	        continue _function;
	      }
	    } else if ("value" in desc) {
	      return desc.value;
	    } else {
	      var getter = desc.get;
	
	      if (getter === undefined) {
	        return undefined;
	      }
	
	      return getter.call(receiver);
	    }
	  }
	};
	
	exports.__esModule = true;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(5), __esModule: true };

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(6);
	__webpack_require__(8);
	module.exports = function getOwnPropertyDescriptor(it, key){
	  return $.getDesc(it, key);
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global = typeof self != 'undefined' ? self : Function('return this')()
	  , core   = {}
	  , defineProperty = Object.defineProperty
	  , hasOwnProperty = {}.hasOwnProperty
	  , ceil  = Math.ceil
	  , floor = Math.floor
	  , max   = Math.max
	  , min   = Math.min;
	// The engine works fine with descriptors? Thank's IE8 for his funny defineProperty.
	var DESC = !!function(){
	  try {
	    return defineProperty({}, 'a', {get: function(){ return 2; }}).a == 2;
	  } catch(e){ /* empty */ }
	}();
	var hide = createDefiner(1);
	// 7.1.4 ToInteger
	function toInteger(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	}
	function desc(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	}
	function simpleSet(object, key, value){
	  object[key] = value;
	  return object;
	}
	function createDefiner(bitmap){
	  return DESC ? function(object, key, value){
	    return $.setDesc(object, key, desc(bitmap, value));
	  } : simpleSet;
	}
	
	function isObject(it){
	  return it !== null && (typeof it == 'object' || typeof it == 'function');
	}
	function isFunction(it){
	  return typeof it == 'function';
	}
	function assertDefined(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	}
	
	var $ = module.exports = __webpack_require__(7)({
	  g: global,
	  core: core,
	  html: global.document && document.documentElement,
	  // http://jsperf.com/core-js-isobject
	  isObject:   isObject,
	  isFunction: isFunction,
	  that: function(){
	    return this;
	  },
	  // 7.1.4 ToInteger
	  toInteger: toInteger,
	  // 7.1.15 ToLength
	  toLength: function(it){
	    return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	  },
	  toIndex: function(index, length){
	    index = toInteger(index);
	    return index < 0 ? max(index + length, 0) : min(index, length);
	  },
	  has: function(it, key){
	    return hasOwnProperty.call(it, key);
	  },
	  create:     Object.create,
	  getProto:   Object.getPrototypeOf,
	  DESC:       DESC,
	  desc:       desc,
	  getDesc:    Object.getOwnPropertyDescriptor,
	  setDesc:    defineProperty,
	  setDescs:   Object.defineProperties,
	  getKeys:    Object.keys,
	  getNames:   Object.getOwnPropertyNames,
	  getSymbols: Object.getOwnPropertySymbols,
	  assertDefined: assertDefined,
	  // Dummy, fix for not array-like ES3 string in es5 module
	  ES5Object: Object,
	  toObject: function(it){
	    return $.ES5Object(assertDefined(it));
	  },
	  hide: hide,
	  def: createDefiner(0),
	  set: global.Symbol ? simpleSet : hide,
	  each: [].forEach
	});
	/* eslint-disable no-undef */
	if(typeof __e != 'undefined')__e = core;
	if(typeof __g != 'undefined')__g = global;

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = function($){
	  $.FW   = false;
	  $.path = $.core;
	  return $;
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var $        = __webpack_require__(6)
	  , $def     = __webpack_require__(9)
	  , isObject = $.isObject
	  , toObject = $.toObject;
	$.each.call(('freeze,seal,preventExtensions,isFrozen,isSealed,isExtensible,' +
	  'getOwnPropertyDescriptor,getPrototypeOf,keys,getOwnPropertyNames').split(',')
	, function(KEY, ID){
	  var fn     = ($.core.Object || {})[KEY] || Object[KEY]
	    , forced = 0
	    , method = {};
	  method[KEY] = ID == 0 ? function freeze(it){
	    return isObject(it) ? fn(it) : it;
	  } : ID == 1 ? function seal(it){
	    return isObject(it) ? fn(it) : it;
	  } : ID == 2 ? function preventExtensions(it){
	    return isObject(it) ? fn(it) : it;
	  } : ID == 3 ? function isFrozen(it){
	    return isObject(it) ? fn(it) : true;
	  } : ID == 4 ? function isSealed(it){
	    return isObject(it) ? fn(it) : true;
	  } : ID == 5 ? function isExtensible(it){
	    return isObject(it) ? fn(it) : false;
	  } : ID == 6 ? function getOwnPropertyDescriptor(it, key){
	    return fn(toObject(it), key);
	  } : ID == 7 ? function getPrototypeOf(it){
	    return fn(Object($.assertDefined(it)));
	  } : ID == 8 ? function keys(it){
	    return fn(toObject(it));
	  } : __webpack_require__(10).get;
	  try {
	    fn('z');
	  } catch(e){
	    forced = 1;
	  }
	  $def($def.S + $def.F * forced, 'Object', method);
	});

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(6)
	  , global     = $.g
	  , core       = $.core
	  , isFunction = $.isFunction;
	function ctx(fn, that){
	  return function(){
	    return fn.apply(that, arguments);
	  };
	}
	// type bitmap
	$def.F = 1;  // forced
	$def.G = 2;  // global
	$def.S = 4;  // static
	$def.P = 8;  // proto
	$def.B = 16; // bind
	$def.W = 32; // wrap
	function $def(type, name, source){
	  var key, own, out, exp
	    , isGlobal = type & $def.G
	    , isProto  = type & $def.P
	    , target   = isGlobal ? global : type & $def.S
	        ? global[name] : (global[name] || {}).prototype
	    , exports  = isGlobal ? core : core[name] || (core[name] = {});
	  if(isGlobal)source = name;
	  for(key in source){
	    // contains in native
	    own = !(type & $def.F) && target && key in target;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    if(isGlobal && !isFunction(target[key]))exp = source[key];
	    // bind timers to global for call from export context
	    else if(type & $def.B && own)exp = ctx(out, global);
	    // wrap global constructors for prevent change them in library
	    else if(type & $def.W && target[key] == out)!function(C){
	      exp = function(param){
	        return this instanceof C ? new C(param) : C(param);
	      };
	      exp.prototype = C.prototype;
	    }(out);
	    else exp = isProto && isFunction(out) ? ctx(Function.call, out) : out;
	    // export
	    exports[key] = exp;
	    if(isProto)(exports.prototype || (exports.prototype = {}))[key] = out;
	  }
	}
	module.exports = $def;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var $ = __webpack_require__(6)
	  , toString = {}.toString
	  , getNames = $.getNames;
	
	var windowNames = typeof window == 'object' && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];
	
	function getWindowNames(it){
	  try {
	    return getNames(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	}
	
	module.exports.get = function getOwnPropertyNames(it){
	  if(windowNames && toString.call(it) == '[object Window]')return getWindowNames(it);
	  return getNames($.toObject(it));
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _Object$create = __webpack_require__(12)["default"];
	
	exports["default"] = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	  }
	
	  subClass.prototype = _Object$create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) subClass.__proto__ = superClass;
	};
	
	exports.__esModule = true;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(13), __esModule: true };

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(6);
	module.exports = function create(P, D){
	  return $.create(P, D);
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";
	
	exports["default"] = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};
	
	exports.__esModule = true;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _Object$defineProperty = __webpack_require__(16)["default"];
	
	exports["default"] = (function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	
	      _Object$defineProperty(target, descriptor.key, descriptor);
	    }
	  }
	
	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	})();
	
	exports.__esModule = true;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(17), __esModule: true };

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(6);
	module.exports = function defineProperty(it, key, desc){
	  return $.setDesc(it, key, desc);
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _getIterator = __webpack_require__(19)["default"];
	
	var _isIterable = __webpack_require__(35)["default"];
	
	exports["default"] = (function () {
	  function sliceIterator(arr, i) {
	    var _arr = [];
	    var _n = true;
	    var _d = false;
	    var _e = undefined;
	
	    try {
	      for (var _i = _getIterator(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
	        _arr.push(_s.value);
	
	        if (i && _arr.length === i) break;
	      }
	    } catch (err) {
	      _d = true;
	      _e = err;
	    } finally {
	      try {
	        if (!_n && _i["return"]) _i["return"]();
	      } finally {
	        if (_d) throw _e;
	      }
	    }
	
	    return _arr;
	  }
	
	  return function (arr, i) {
	    if (Array.isArray(arr)) {
	      return arr;
	    } else if (_isIterable(Object(arr))) {
	      return sliceIterator(arr, i);
	    } else {
	      throw new TypeError("Invalid attempt to destructure non-iterable instance");
	    }
	  };
	})();
	
	exports.__esModule = true;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(20), __esModule: true };

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(21);
	__webpack_require__(32);
	__webpack_require__(34);
	module.exports = __webpack_require__(6).core.getIterator;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(22);
	var $           = __webpack_require__(6)
	  , Iterators   = __webpack_require__(25).Iterators
	  , ITERATOR    = __webpack_require__(27)('iterator')
	  , ArrayValues = Iterators.Array
	  , NL          = $.g.NodeList
	  , HTC         = $.g.HTMLCollection
	  , NLProto     = NL && NL.prototype
	  , HTCProto    = HTC && HTC.prototype;
	if($.FW){
	  if(NL && !(ITERATOR in NLProto))$.hide(NLProto, ITERATOR, ArrayValues);
	  if(HTC && !(ITERATOR in HTCProto))$.hide(HTCProto, ITERATOR, ArrayValues);
	}
	Iterators.NodeList = Iterators.HTMLCollection = ArrayValues;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(6)
	  , setUnscope = __webpack_require__(23)
	  , ITER       = __webpack_require__(24).safe('iter')
	  , $iter      = __webpack_require__(25)
	  , step       = $iter.step
	  , Iterators  = $iter.Iterators;
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	__webpack_require__(30)(Array, 'Array', function(iterated, kind){
	  $.set(this, ITER, {o: $.toObject(iterated), i: 0, k: kind});
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var iter  = this[ITER]
	    , O     = iter.o
	    , kind  = iter.k
	    , index = iter.i++;
	  if(!O || index >= O.length){
	    iter.o = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');
	
	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;
	
	setUnscope('keys');
	setUnscope('values');
	setUnscope('entries');

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var sid = 0;
	function uid(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++sid + Math.random()).toString(36));
	}
	uid.safe = __webpack_require__(6).g.Symbol || uid;
	module.exports = uid;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $                 = __webpack_require__(6)
	  , cof               = __webpack_require__(26)
	  , classof           = cof.classof
	  , assert            = __webpack_require__(29)
	  , assertObject      = assert.obj
	  , SYMBOL_ITERATOR   = __webpack_require__(27)('iterator')
	  , FF_ITERATOR       = '@@iterator'
	  , Iterators         = __webpack_require__(28)('iterators')
	  , IteratorPrototype = {};
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	setIterator(IteratorPrototype, $.that);
	function setIterator(O, value){
	  $.hide(O, SYMBOL_ITERATOR, value);
	  // Add iterator for FF iterator protocol
	  if(FF_ITERATOR in [])$.hide(O, FF_ITERATOR, value);
	}
	
	module.exports = {
	  // Safari has buggy iterators w/o `next`
	  BUGGY: 'keys' in [] && !('next' in [].keys()),
	  Iterators: Iterators,
	  step: function(done, value){
	    return {value: value, done: !!done};
	  },
	  is: function(it){
	    var O      = Object(it)
	      , Symbol = $.g.Symbol;
	    return (Symbol && Symbol.iterator || FF_ITERATOR) in O
	      || SYMBOL_ITERATOR in O
	      || $.has(Iterators, classof(O));
	  },
	  get: function(it){
	    var Symbol = $.g.Symbol
	      , getIter;
	    if(it != undefined){
	      getIter = it[Symbol && Symbol.iterator || FF_ITERATOR]
	        || it[SYMBOL_ITERATOR]
	        || Iterators[classof(it)];
	    }
	    assert($.isFunction(getIter), it, ' is not iterable!');
	    return assertObject(getIter.call(it));
	  },
	  set: setIterator,
	  create: function(Constructor, NAME, next, proto){
	    Constructor.prototype = $.create(proto || IteratorPrototype, {next: $.desc(1, next)});
	    cof.set(Constructor, NAME + ' Iterator');
	  }
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var $        = __webpack_require__(6)
	  , TAG      = __webpack_require__(27)('toStringTag')
	  , toString = {}.toString;
	function cof(it){
	  return toString.call(it).slice(8, -1);
	}
	cof.classof = function(it){
	  var O, T;
	  return it == undefined ? it === undefined ? 'Undefined' : 'Null'
	    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T : cof(O);
	};
	cof.set = function(it, tag, stat){
	  if(it && !$.has(it = stat ? it : it.prototype, TAG))$.hide(it, TAG, tag);
	};
	module.exports = cof;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(6).g
	  , store  = __webpack_require__(28)('wks');
	module.exports = function(name){
	  return store[name] || (store[name] =
	    global.Symbol && global.Symbol[name] || __webpack_require__(24).safe('Symbol.' + name));
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var $      = __webpack_require__(6)
	  , SHARED = '__core-js_shared__'
	  , store  = $.g[SHARED] || ($.g[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(6);
	function assert(condition, msg1, msg2){
	  if(!condition)throw TypeError(msg2 ? msg1 + msg2 : msg1);
	}
	assert.def = $.assertDefined;
	assert.fn = function(it){
	  if(!$.isFunction(it))throw TypeError(it + ' is not a function!');
	  return it;
	};
	assert.obj = function(it){
	  if(!$.isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};
	assert.inst = function(it, Constructor, name){
	  if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
	  return it;
	};
	module.exports = assert;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var $def            = __webpack_require__(9)
	  , $redef          = __webpack_require__(31)
	  , $               = __webpack_require__(6)
	  , cof             = __webpack_require__(26)
	  , $iter           = __webpack_require__(25)
	  , SYMBOL_ITERATOR = __webpack_require__(27)('iterator')
	  , FF_ITERATOR     = '@@iterator'
	  , KEYS            = 'keys'
	  , VALUES          = 'values'
	  , Iterators       = $iter.Iterators;
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCE){
	  $iter.create(Constructor, NAME, next);
	  function createMethod(kind){
	    function $$(that){
	      return new Constructor(that, kind);
	    }
	    switch(kind){
	      case KEYS: return function keys(){ return $$(this); };
	      case VALUES: return function values(){ return $$(this); };
	    } return function entries(){ return $$(this); };
	  }
	  var TAG      = NAME + ' Iterator'
	    , proto    = Base.prototype
	    , _native  = proto[SYMBOL_ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , _default = _native || createMethod(DEFAULT)
	    , methods, key;
	  // Fix native
	  if(_native){
	    var IteratorPrototype = $.getProto(_default.call(new Base));
	    // Set @@toStringTag to native iterators
	    cof.set(IteratorPrototype, TAG, true);
	    // FF fix
	    if($.FW && $.has(proto, FF_ITERATOR))$iter.set(IteratorPrototype, $.that);
	  }
	  // Define iterator
	  if($.FW || FORCE)$iter.set(proto, _default);
	  // Plug for library
	  Iterators[NAME] = _default;
	  Iterators[TAG]  = $.that;
	  if(DEFAULT){
	    methods = {
	      keys:    IS_SET            ? _default : createMethod(KEYS),
	      values:  DEFAULT == VALUES ? _default : createMethod(VALUES),
	      entries: DEFAULT != VALUES ? _default : createMethod('entries')
	    };
	    if(FORCE)for(key in methods){
	      if(!(key in proto))$redef(proto, key, methods[key]);
	    } else $def($def.P + $def.F * $iter.BUGGY, NAME, methods);
	  }
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(6).hide;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var set   = __webpack_require__(6).set
	  , $at   = __webpack_require__(33)(true)
	  , ITER  = __webpack_require__(24).safe('iter')
	  , $iter = __webpack_require__(25)
	  , step  = $iter.step;
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(30)(String, 'String', function(iterated){
	  set(this, ITER, {o: String(iterated), i: 0});
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var iter  = this[ITER]
	    , O     = iter.o
	    , index = iter.i
	    , point;
	  if(index >= O.length)return step(1);
	  point = $at(O, index);
	  iter.i += point.length;
	  return step(0, point);
	});

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	// true  -> String#at
	// false -> String#codePointAt
	var $ = __webpack_require__(6);
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String($.assertDefined(that))
	      , i = $.toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l
	      || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	        ? TO_STRING ? s.charAt(i) : a
	        : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var core  = __webpack_require__(6).core
	  , $iter = __webpack_require__(25);
	core.isIterable  = $iter.is;
	core.getIterator = $iter.get;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(36), __esModule: true };

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(21);
	__webpack_require__(32);
	__webpack_require__(34);
	module.exports = __webpack_require__(6).core.isIterable;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(38), __esModule: true };

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(39);
	module.exports = __webpack_require__(6).core.Object.assign;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $def = __webpack_require__(9);
	$def($def.S, 'Object', {assign: __webpack_require__(40)});

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var $        = __webpack_require__(6)
	  , enumKeys = __webpack_require__(41);
	// 19.1.2.1 Object.assign(target, source, ...)
	/* eslint-disable no-unused-vars */
	module.exports = Object.assign || function assign(target, source){
	/* eslint-enable no-unused-vars */
	  var T = Object($.assertDefined(target))
	    , l = arguments.length
	    , i = 1;
	  while(l > i){
	    var S      = $.ES5Object(arguments[i++])
	      , keys   = enumKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)T[key = keys[j++]] = S[key];
	  }
	  return T;
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(6);
	module.exports = function(it){
	  var keys       = $.getKeys(it)
	    , getDesc    = $.getDesc
	    , getSymbols = $.getSymbols;
	  if(getSymbols)$.each.call(getSymbols(it), function(key){
	    if(getDesc(it, key).enumerable)keys.push(key);
	  });
	  return keys;
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(43), __esModule: true };

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(44);
	module.exports = __webpack_require__(6).core.Reflect.ownKeys;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var $         = __webpack_require__(6)
	  , $def      = __webpack_require__(9)
	  , setProto  = __webpack_require__(45)
	  , $iter     = __webpack_require__(25)
	  , ITERATOR  = __webpack_require__(27)('iterator')
	  , ITER      = __webpack_require__(24).safe('iter')
	  , step      = $iter.step
	  , assert    = __webpack_require__(29)
	  , isObject  = $.isObject
	  , getProto  = $.getProto
	  , $Reflect  = $.g.Reflect
	  , _apply    = Function.apply
	  , assertObject = assert.obj
	  , _isExtensible = Object.isExtensible || isObject
	  , _preventExtensions = Object.preventExtensions
	  // IE TP has broken Reflect.enumerate
	  , buggyEnumerate = !($Reflect && $Reflect.enumerate && ITERATOR in $Reflect.enumerate({}));
	
	function Enumerate(iterated){
	  $.set(this, ITER, {o: iterated, k: undefined, i: 0});
	}
	$iter.create(Enumerate, 'Object', function(){
	  var iter = this[ITER]
	    , keys = iter.k
	    , key;
	  if(keys == undefined){
	    iter.k = keys = [];
	    for(key in iter.o)keys.push(key);
	  }
	  do {
	    if(iter.i >= keys.length)return step(1);
	  } while(!((key = keys[iter.i++]) in iter.o));
	  return step(0, key);
	});
	
	var reflect = {
	  // 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
	  apply: function apply(target, thisArgument, argumentsList){
	    return _apply.call(target, thisArgument, argumentsList);
	  },
	  // 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
	  construct: function construct(target, argumentsList /*, newTarget*/){
	    var proto    = assert.fn(arguments.length < 3 ? target : arguments[2]).prototype
	      , instance = $.create(isObject(proto) ? proto : Object.prototype)
	      , result   = _apply.call(target, instance, argumentsList);
	    return isObject(result) ? result : instance;
	  },
	  // 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
	  defineProperty: function defineProperty(target, propertyKey, attributes){
	    assertObject(target);
	    try {
	      $.setDesc(target, propertyKey, attributes);
	      return true;
	    } catch(e){
	      return false;
	    }
	  },
	  // 26.1.4 Reflect.deleteProperty(target, propertyKey)
	  deleteProperty: function deleteProperty(target, propertyKey){
	    var desc = $.getDesc(assertObject(target), propertyKey);
	    return desc && !desc.configurable ? false : delete target[propertyKey];
	  },
	  // 26.1.6 Reflect.get(target, propertyKey [, receiver])
	  get: function get(target, propertyKey/*, receiver*/){
	    var receiver = arguments.length < 3 ? target : arguments[2]
	      , desc = $.getDesc(assertObject(target), propertyKey), proto;
	    if(desc)return $.has(desc, 'value')
	      ? desc.value
	      : desc.get === undefined
	        ? undefined
	        : desc.get.call(receiver);
	    return isObject(proto = getProto(target))
	      ? get(proto, propertyKey, receiver)
	      : undefined;
	  },
	  // 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
	  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey){
	    return $.getDesc(assertObject(target), propertyKey);
	  },
	  // 26.1.8 Reflect.getPrototypeOf(target)
	  getPrototypeOf: function getPrototypeOf(target){
	    return getProto(assertObject(target));
	  },
	  // 26.1.9 Reflect.has(target, propertyKey)
	  has: function has(target, propertyKey){
	    return propertyKey in target;
	  },
	  // 26.1.10 Reflect.isExtensible(target)
	  isExtensible: function isExtensible(target){
	    return _isExtensible(assertObject(target));
	  },
	  // 26.1.11 Reflect.ownKeys(target)
	  ownKeys: __webpack_require__(47),
	  // 26.1.12 Reflect.preventExtensions(target)
	  preventExtensions: function preventExtensions(target){
	    assertObject(target);
	    try {
	      if(_preventExtensions)_preventExtensions(target);
	      return true;
	    } catch(e){
	      return false;
	    }
	  },
	  // 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
	  set: function set(target, propertyKey, V/*, receiver*/){
	    var receiver = arguments.length < 4 ? target : arguments[3]
	      , ownDesc  = $.getDesc(assertObject(target), propertyKey)
	      , existingDescriptor, proto;
	    if(!ownDesc){
	      if(isObject(proto = getProto(target))){
	        return set(proto, propertyKey, V, receiver);
	      }
	      ownDesc = $.desc(0);
	    }
	    if($.has(ownDesc, 'value')){
	      if(ownDesc.writable === false || !isObject(receiver))return false;
	      existingDescriptor = $.getDesc(receiver, propertyKey) || $.desc(0);
	      existingDescriptor.value = V;
	      $.setDesc(receiver, propertyKey, existingDescriptor);
	      return true;
	    }
	    return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
	  }
	};
	// 26.1.14 Reflect.setPrototypeOf(target, proto)
	if(setProto)reflect.setPrototypeOf = function setPrototypeOf(target, proto){
	  setProto.check(target, proto);
	  try {
	    setProto.set(target, proto);
	    return true;
	  } catch(e){
	    return false;
	  }
	};
	
	$def($def.G, {Reflect: {}});
	
	$def($def.S + $def.F * buggyEnumerate, 'Reflect', {
	  // 26.1.5 Reflect.enumerate(target)
	  enumerate: function enumerate(target){
	    return new Enumerate(assertObject(target));
	  }
	});
	
	$def($def.S, 'Reflect', reflect);

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var $      = __webpack_require__(6)
	  , assert = __webpack_require__(29);
	function check(O, proto){
	  assert.obj(O);
	  assert(proto === null || $.isObject(proto), proto, ": can't set as prototype!");
	}
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} // eslint-disable-line
	    ? function(buggy, set){
	        try {
	          set = __webpack_require__(46)(Function.call, $.getDesc(Object.prototype, '__proto__').set, 2);
	          set({}, []);
	        } catch(e){ buggy = true; }
	        return function setPrototypeOf(O, proto){
	          check(O, proto);
	          if(buggy)O.__proto__ = proto;
	          else set(O, proto);
	          return O;
	        };
	      }()
	    : undefined),
	  check: check
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	// Optional / simple context binding
	var assertFunction = __webpack_require__(29).fn;
	module.exports = function(fn, that, length){
	  assertFunction(fn);
	  if(~length && that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  } return function(/* ...args */){
	      return fn.apply(that, arguments);
	    };
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var $            = __webpack_require__(6)
	  , assertObject = __webpack_require__(29).obj;
	module.exports = function ownKeys(it){
	  assertObject(it);
	  var keys       = $.getNames(it)
	    , getSymbols = $.getSymbols;
	  return getSymbols ? keys.concat(getSymbols(it)) : keys;
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(49), __esModule: true };

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(8);
	module.exports = __webpack_require__(6).core.Object.keys;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(51), __esModule: true };

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(52);
	module.exports = __webpack_require__(6).core.Object.entries;

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	// http://goo.gl/XkBrjD
	var $    = __webpack_require__(6)
	  , $def = __webpack_require__(9);
	function createObjectToArray(isEntries){
	  return function(object){
	    var O      = $.toObject(object)
	      , keys   = $.getKeys(O)
	      , length = keys.length
	      , i      = 0
	      , result = Array(length)
	      , key;
	    if(isEntries)while(length > i)result[i] = [key = keys[i++], O[key]];
	    else while(length > i)result[i] = O[keys[i++]];
	    return result;
	  };
	}
	$def($def.S, 'Object', {
	  values:  createObjectToArray(false),
	  entries: createObjectToArray(true)
	});

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(54), __esModule: true };

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(52);
	module.exports = __webpack_require__(6).core.Object.values;

/***/ },
/* 55 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var toString = Object.prototype.toString;
	
	var isObject = function isObject(o) {
	  return toString.call(o) === '[object Object]';
	};
	
	var consume = function consume(i) {
	  var iterator = i && i.keys;
	  if (!iterator) return;
	  var arr = [];
	  while ((res = iterator.next(), !res.isDone)) arr.push(res.value);
	  return res;
	};
	
	exports['default'] = { isObject: isObject, consume: consume };
	module.exports = exports['default'];

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _slicedToArray = __webpack_require__(18)["default"];
	
	var _Object$entries = __webpack_require__(50)["default"];
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function _Restriction(valueTransformer) {
	  return function (msg, isFailure) {
	    var validator = function validator(element, context) {
	      if (isFailure(valueTransformer(element))) {
	        element.addError(msg);
	        return false;
	      }
	      return true;
	    };
	    return validator;
	  };
	  return factory;
	}
	
	// Scalars
	var _ValueRestriction = _Restriction(function (e) {
	  return e.value;
	});
	
	function createValidators(validators) {
	  return _Object$entries(validators).reduce(function (factorized, _ref) {
	    var _ref2 = _slicedToArray(_ref, 2);
	
	    var name = _ref2[0];
	    var original = _ref2[1];
	
	    var wrapped = function wrapped() {
	      var validator = original.apply(undefined, arguments);
	      validator.factory = wrapped;
	      return validator;
	    };
	    factorized[name] = wrapped;
	    return factorized;
	  }, {});
	}
	
	var Value = createValidators({
	  // Ok, Present *is* in terms of the serialized property but it's really
	  // all about the value. You got me.
	  Present: function Present(msg) {
	    return _ValueRestriction(msg, function (v) {
	      return v === undefined;
	    });
	  },
	  AtLeast: function AtLeast(min, msg) {
	    return _ValueRestriction(msg, function (v) {
	      return v < min;
	    });
	  },
	  AtMost: function AtMost(max, msg) {
	    return _ValueRestriction(msg, function (v) {
	      return v > max;
	    });
	  },
	  Between: function Between(min, max, msg) {
	    return _ValueRestriction(msg, function (v) {
	      return v < min || v > max;
	    });
	  }
	});
	
	// Strings & Lists
	var _LengthRestriction = _Restriction(function (e) {
	  return e.value ? e.value.length : 0;
	});
	
	var Length = createValidators({
	  AtLeast: function AtLeast(min, msg) {
	    return _LengthRestriction(msg, function (v) {
	      return v < min;
	    });
	  },
	  AtMost: function AtMost(max, msg) {
	    return _LengthRestriction(msg, function (v) {
	      return v > max;
	    });
	  },
	  Between: function Between(min, max, msg) {
	    return _LengthRestriction(msg, function (v) {
	      return v < min || v > max;
	    });
	  },
	  Exactly: function Exactly(count, msg) {
	    return _LengthRestriction(msg, function (v) {
	      return v === count;
	    });
	  }
	});
	
	exports["default"] = { Value: Value, Length: Length };
	module.exports = exports["default"];

/***/ }
/******/ ])));
//# sourceMappingURL=index.js.map