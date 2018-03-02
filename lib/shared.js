'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _swimmer = require('swimmer');

Object.defineProperty(exports, 'poolAll', {
  enumerable: true,
  get: function get() {
    return _swimmer.poolAll;
  }
});
Object.defineProperty(exports, 'createPool', {
  enumerable: true,
  get: function get() {
    return _swimmer.createPool;
  }
});
exports.pathJoin = pathJoin;
exports.unwrapArray = unwrapArray;
exports.isObject = isObject;
exports.deprecate = deprecate;

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

function pathJoin() {
  for (var _len = arguments.length, paths = Array(_len), _key = 0; _key < _len; _key++) {
    paths[_key] = arguments[_key];
  }

  var newPath = ('' + paths.join('/')).replace(/\/{2,}/g, '/');
  if (newPath !== '/') {
    newPath = newPath.replace(/\/$/g, '');
    if (newPath.includes('?')) {
      newPath = newPath.substring(0, newPath.indexOf('?'));
    }
  }
  return newPath;
}

function unwrapArray(arg, defaultValue) {
  arg = Array.isArray(arg) ? arg[0] : arg;
  if (!arg && defaultValue) {
    return defaultValue;
  }
  return arg;
}

function isObject(a) {
  return !Array.isArray(a) && (typeof a === 'undefined' ? 'undefined' : _typeof(a)) === 'object' && a !== null;
}

function deprecate(from, to) {
  console.warn('React-Static deprecation notice: ' + from + ' will be deprecated in favor of ' + to + ' in the next major release.');
}
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(pathJoin, 'pathJoin', 'src/shared.js');
  reactHotLoader.register(unwrapArray, 'unwrapArray', 'src/shared.js');
  reactHotLoader.register(isObject, 'isObject', 'src/shared.js');
  reactHotLoader.register(deprecate, 'deprecate', 'src/shared.js');
  leaveModule(module);
})();

;