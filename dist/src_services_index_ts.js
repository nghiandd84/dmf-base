"use strict";
(self["webpackChunkdmf_layout"] = self["webpackChunkdmf_layout"] || []).push([["src_services_index_ts"],{

/***/ "./src/helper/http.helper.ts":
/*!***********************************!*\
  !*** ./src/helper/http.helper.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HttpHelper": () => (/* binding */ HttpHelper),
/* harmony export */   "CustomHttpParameterCodex": () => (/* binding */ CustomHttpParameterCodex),
/* harmony export */   "HttpUrlEncodingCodec": () => (/* binding */ HttpUrlEncodingCodec),
/* harmony export */   "HttpParams": () => (/* binding */ HttpParams)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");




var HttpHelper = /*#__PURE__*/function () {
  function HttpHelper() {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__["default"])(this, HttpHelper);
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__["default"])(HttpHelper, null, [{
    key: "objectToHttpParams",
    value: function objectToHttpParams(object) {
      var httpParams = new HttpParams({
        encoder: new CustomHttpParameterCodex()
      });
      Object.keys(object).forEach(function (key) {
        httpParams = httpParams.append(key, object[key]);
      });
      return httpParams;
    }
  }]);

  return HttpHelper;
}();
var CustomHttpParameterCodex = /*#__PURE__*/function () {
  function CustomHttpParameterCodex() {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__["default"])(this, CustomHttpParameterCodex);
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__["default"])(CustomHttpParameterCodex, [{
    key: "decodeKey",
    value: function decodeKey(key) {
      return decodeURIComponent(key);
    }
  }, {
    key: "decodeValue",
    value: function decodeValue(value) {
      return decodeURIComponent(value);
    }
  }, {
    key: "encodeKey",
    value: function encodeKey(key) {
      return encodeURIComponent(key);
    }
  }, {
    key: "encodeValue",
    value: function encodeValue(value) {
      return encodeURIComponent(value);
    }
  }]);

  return CustomHttpParameterCodex;
}();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * A codec for encoding and decoding parameters in URLs.
 *
 * Used by `HttpParams`.
 *
 * @publicApi
 **/

/**
 * Provides encoding and decoding of URL parameter and query-string values.
 *
 * Serializes and parses URL parameter keys and values to encode and decode them.
 * If you pass URL query parameters without encoding,
 * the query parameters can be misinterpreted at the receiving end.
 *
 *
 * @publicApi
 */
var HttpUrlEncodingCodec = /*#__PURE__*/function () {
  function HttpUrlEncodingCodec() {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__["default"])(this, HttpUrlEncodingCodec);
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__["default"])(HttpUrlEncodingCodec, [{
    key: "encodeKey",
    value:
    /**
     * Encodes a key name for a URL parameter or query-string.
     * @param key The key name.
     * @returns The encoded key name.
     */
    function encodeKey(key) {
      return standardEncoding(key);
    }
    /**
     * Encodes the value of a URL parameter or query-string.
     * @param value The value.
     * @returns The encoded value.
     */

  }, {
    key: "encodeValue",
    value: function encodeValue(value) {
      return standardEncoding(value);
    }
    /**
     * Decodes an encoded URL parameter or query-string key.
     * @param key The encoded key name.
     * @returns The decoded key name.
     */

  }, {
    key: "decodeKey",
    value: function decodeKey(key) {
      return decodeURIComponent(key);
    }
    /**
     * Decodes an encoded URL parameter or query-string value.
     * @param value The encoded value.
     * @returns The decoded value.
     */

  }, {
    key: "decodeValue",
    value: function decodeValue(value) {
      return decodeURIComponent(value);
    }
  }]);

  return HttpUrlEncodingCodec;
}();

function paramParser(rawParams, codec) {
  var map = new Map();

  if (rawParams.length > 0) {
    // The `window.location.search` can be used while creating an instance of the `HttpParams` class
    // (e.g. `new HttpParams({ fromString: window.location.search })`). The `window.location.search`
    // may start with the `?` char, so we strip it if it's present.
    var params = rawParams.replace(/^\?/, '').split('&');
    params.forEach(function (param) {
      var eqIdx = param.indexOf('=');

      var _ref = eqIdx == -1 ? [codec.decodeKey(param), ''] : [codec.decodeKey(param.slice(0, eqIdx)), codec.decodeValue(param.slice(eqIdx + 1))],
          _ref2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, 2),
          key = _ref2[0],
          val = _ref2[1];

      var list = map.get(key) || [];
      list.push(val);
      map.set(key, list);
    });
  }

  return map;
}
/**
 * Encode input string with standard encodeURIComponent and then un-encode specific characters.
 */


var STANDARD_ENCODING_REGEX = /%(\d[a-f0-9])/gi;
var STANDARD_ENCODING_REPLACEMENTS = {
  '40': '@',
  '3A': ':',
  '24': '$',
  '2C': ',',
  '3B': ';',
  '3D': '=',
  '3F': '?',
  '2F': '/'
};

function standardEncoding(v) {
  return encodeURIComponent(v).replace(STANDARD_ENCODING_REGEX, function (s, t) {
    var _STANDARD_ENCODING_RE;

    return (_STANDARD_ENCODING_RE = STANDARD_ENCODING_REPLACEMENTS[t]) !== null && _STANDARD_ENCODING_RE !== void 0 ? _STANDARD_ENCODING_RE : s;
  });
}

function valueToString(value) {
  return "".concat(value);
}

/**
 * An HTTP request/response body that represents serialized parameters,
 * per the MIME type `application/x-www-form-urlencoded`.
 *
 * This class is immutable; all mutation operations return a new instance.
 *
 * @publicApi
 */
var HttpParams = /*#__PURE__*/function () {
  function HttpParams() {
    var _this = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__["default"])(this, HttpParams);

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "map", void 0);

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "encoder", void 0);

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "updates", null);

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "cloneFrom", null);

    this.encoder = options.encoder || new HttpUrlEncodingCodec();

    if (!!options.fromString) {
      if (!!options.fromObject) {
        throw new Error("Cannot specify both fromString and fromObject.");
      }

      this.map = paramParser(options.fromString, this.encoder);
    } else if (!!options.fromObject) {
      this.map = new Map();
      Object.keys(options.fromObject).forEach(function (key) {
        var value = options.fromObject[key]; // convert the values to strings

        var values = Array.isArray(value) ? value.map(valueToString) : [valueToString(value)];

        _this.map.set(key, values);
      });
    } else {
      this.map = null;
    }
  }
  /**
   * Reports whether the body includes one or more values for a given parameter.
   * @param param The parameter name.
   * @returns True if the parameter has one or more values,
   * false if it has no value or is not present.
   */


  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__["default"])(HttpParams, [{
    key: "has",
    value: function has(param) {
      this.init();
      return this.map.has(param);
    }
    /**
     * Retrieves the first value for a parameter.
     * @param param The parameter name.
     * @returns The first value of the given parameter,
     * or `null` if the parameter is not present.
     */

  }, {
    key: "get",
    value: function get(param) {
      this.init();
      var res = this.map.get(param);
      return !!res ? res[0] : null;
    }
    /**
     * Retrieves all values for a  parameter.
     * @param param The parameter name.
     * @returns All values in a string array,
     * or `null` if the parameter not present.
     */

  }, {
    key: "getAll",
    value: function getAll(param) {
      this.init();
      return this.map.get(param) || null;
    }
    /**
     * Retrieves all the parameters for this body.
     * @returns The parameter names in a string array.
     */

  }, {
    key: "keys",
    value: function keys() {
      this.init();
      return Array.from(this.map.keys());
    }
    /**
     * Appends a new value to existing values for a parameter.
     * @param param The parameter name.
     * @param value The new value to add.
     * @return A new body with the appended value.
     */

  }, {
    key: "append",
    value: function append(param, value) {
      return this.clone({
        param: param,
        value: value,
        op: 'a'
      });
    }
    /**
     * Constructs a new body with appended values for the given parameter name.
     * @param params parameters and values
     * @return A new body with the new value.
     */

  }, {
    key: "appendAll",
    value: function appendAll(params) {
      var updates = [];
      Object.keys(params).forEach(function (param) {
        var value = params[param];

        if (Array.isArray(value)) {
          value.forEach(function (_value) {
            updates.push({
              param: param,
              value: _value,
              op: 'a'
            });
          });
        } else {
          updates.push({
            param: param,
            value: value,
            op: 'a'
          });
        }
      });
      return this.clone(updates);
    }
    /**
     * Replaces the value for a parameter.
     * @param param The parameter name.
     * @param value The new value.
     * @return A new body with the new value.
     */

  }, {
    key: "set",
    value: function set(param, value) {
      return this.clone({
        param: param,
        value: value,
        op: 's'
      });
    }
    /**
     * Removes a given value or all values from a parameter.
     * @param param The parameter name.
     * @param value The value to remove, if provided.
     * @return A new body with the given value removed, or with all values
     * removed if no value is specified.
     */

  }, {
    key: "delete",
    value: function _delete(param, value) {
      return this.clone({
        param: param,
        value: value,
        op: 'd'
      });
    }
    /**
     * Serializes the body to an encoded string, where key-value pairs (separated by `=`) are
     * separated by `&`s.
     */

  }, {
    key: "toString",
    value: function toString() {
      var _this2 = this;

      this.init();
      return this.keys().map(function (key) {
        var eKey = _this2.encoder.encodeKey(key); // `a: ['1']` produces `'a=1'`
        // `b: []` produces `''`
        // `c: ['1', '2']` produces `'c=1&c=2'`


        return _this2.map.get(key).map(function (value) {
          return eKey + '=' + _this2.encoder.encodeValue(value);
        }).join('&');
      }) // filter out empty values because `b: []` produces `''`
      // which results in `a=1&&c=1&c=2` instead of `a=1&c=1&c=2` if we don't
      .filter(function (param) {
        return param !== '';
      }).join('&');
    }
  }, {
    key: "clone",
    value: function clone(update) {
      var clone = new HttpParams({
        encoder: this.encoder
      });
      clone.cloneFrom = this.cloneFrom || this;
      clone.updates = (this.updates || []).concat(update);
      return clone;
    }
  }, {
    key: "init",
    value: function init() {
      var _this3 = this;

      if (this.map === null) {
        this.map = new Map();
      }

      if (this.cloneFrom !== null) {
        this.cloneFrom.init();
        this.cloneFrom.keys().forEach(function (key) {
          return _this3.map.set(key, _this3.cloneFrom.map.get(key));
        });
        this.updates.forEach(function (update) {
          switch (update.op) {
            case 'a':
            case 's':
              var base = (update.op === 'a' ? _this3.map.get(update.param) : undefined) || [];
              base.push(valueToString(update.value));

              _this3.map.set(update.param, base);

              break;

            case 'd':
              if (update.value !== undefined) {
                var _base = _this3.map.get(update.param) || [];

                var idx = _base.indexOf(valueToString(update.value));

                if (idx !== -1) {
                  _base.splice(idx, 1);
                }

                if (_base.length > 0) {
                  _this3.map.set(update.param, _base);
                } else {
                  _this3.map["delete"](update.param);
                }
              } else {
                _this3.map["delete"](update.param);

                break;
              }

          }
        });
        this.cloneFrom = this.updates = null;
      }
    }
  }]);

  return HttpParams;
}();

/***/ }),

/***/ "./src/services/crud.service.ts":
/*!**************************************!*\
  !*** ./src/services/crud.service.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ApiBaseService": () => (/* binding */ ApiBaseService),
/* harmony export */   "CrudBaseService": () => (/* binding */ CrudBaseService)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ "webpack/sharing/consume/default/rxjs/rxjs");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(rxjs__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! axios */ "webpack/sharing/consume/default/axios/axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/dist/esm5/internal/operators/map.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _helper_http_helper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../helper/http.helper */ "./src/helper/http.helper.ts");







function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }






var ApiBaseService = /*#__PURE__*/function () {
  function ApiBaseService(baseUrl = null, apiBasePath = '') {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3__["default"])(this, ApiBaseService);

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__["default"])(this, "httpClient", void 0);

    this.httpClient = axios__WEBPACK_IMPORTED_MODULE_7___default().create({
      baseURL: baseUrl
    });
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__["default"])(ApiBaseService, [{
    key: "basePath",
    value: function basePath() {
      if (!this.baseUrl || this.baseUrl.length === 0) {
        return this.apiBasePath;
      }

      return "".concat(this.apiBasePath).concat(this.baseUrl);
    }
  }]);

  return ApiBaseService;
}();
var CrudBaseService = /*#__PURE__*/function (_ApiBaseService) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_0__["default"])(CrudBaseService, _ApiBaseService);

  var _super = _createSuper(CrudBaseService);

  function CrudBaseService(baseUrl, apiBasePath = '') {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3__["default"])(this, CrudBaseService);

    return _super.call(this, baseUrl, apiBasePath);
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__["default"])(CrudBaseService, [{
    key: "get",
    value: function get(id) {
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.from)(this.httpClient.get("".concat(this.basePath(), "/").concat(id))).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.map)(function (res) {
        return res && res.data;
      }));
    }
  }, {
    key: "filter",
    value: function filter(filterParams) {
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.from)(this.httpClient.get(this.basePath(), {
        params: _helper_http_helper__WEBPACK_IMPORTED_MODULE_9__.HttpHelper.objectToHttpParams(_objectSpread({}, filterParams))
      })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.map)(function (res) {
        return res && res.data;
      }));
    }
  }, {
    key: "create",
    value: function create(model) {
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.from)(this.httpClient.post(this.basePath(), {
        data: (0,lodash__WEBPACK_IMPORTED_MODULE_8__.omit)(model, ['id'])
      }));
    }
  }, {
    key: "update",
    value: function update(id, model) {
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.from)(this.httpClient.patch("".concat(this.basePath(), "/").concat(id), {
        data: (0,lodash__WEBPACK_IMPORTED_MODULE_8__.omit)(model, ['id'])
      }));
    }
  }, {
    key: "delete",
    value: function _delete(id) {
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.from)(this.httpClient["delete"]("".concat(this.basePath(), "/").concat(id)));
    }
  }]);

  return CrudBaseService;
}(ApiBaseService);

/***/ }),

/***/ "./src/services/index.ts":
/*!*******************************!*\
  !*** ./src/services/index.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "ApiBaseService": () => (/* reexport safe */ _crud_service__WEBPACK_IMPORTED_MODULE_1__.ApiBaseService),
/* harmony export */   "CrudBaseService": () => (/* reexport safe */ _crud_service__WEBPACK_IMPORTED_MODULE_1__.CrudBaseService)
/* harmony export */ });
/* harmony import */ var _logger_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./logger-service */ "./src/services/logger-service.ts");
/* harmony import */ var _crud_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./crud.service */ "./src/services/crud.service.ts");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  logger: _logger_service__WEBPACK_IMPORTED_MODULE_0__
});


/***/ }),

/***/ "./src/services/logger-service.ts":
/*!****************************************!*\
  !*** ./src/services/logger-service.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  log: console.log
});

/***/ })

}]);
//# sourceMappingURL=src_services_index_ts.js.map