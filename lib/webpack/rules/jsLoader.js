'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var _default = function _default(_ref) {
  var config = _ref.config,
      stage = _ref.stage;

  return {
    test: /\.(js|jsx)$/,
    exclude: config.paths.NODE_MODULES,
    use: [{
      loader: 'babel-loader',
      options: stage === 'production' ? {
        compact: false
      } : {
        cacheDirectory: true,
        plugins: ['react-hot-loader/babel']
      }
    }]
  };
};

exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, 'default', 'src/webpack/rules/jsLoader.js');
  leaveModule(module);
})();

;