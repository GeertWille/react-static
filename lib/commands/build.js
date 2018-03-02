'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _static = require('../static');

var _webpack = require('../webpack');

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
//


var _default = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(cliArguments) {
    var config, clientStats;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;

            if (cliArguments.includes('--staging')) {
              process.env.REACT_STATIC_STAGING = true;
            }
            if (cliArguments.includes('--debug')) {
              process.env.REACT_STATIC_DEBUG = true;
            }

            config = (0, _utils.getConfig)();
            _context.next = 6;
            return _fsExtra2.default.remove(config.paths.DIST);

          case 6:

            console.log('');
            console.time('=> Site is ready for production!');

            console.log('=> Copying public directory...');
            console.time(_chalk2.default.green('=> [\u2713] Public directory copied'));
            (0, _utils.copyPublicFolder)(config);
            console.timeEnd(_chalk2.default.green('=> [\u2713] Public directory copied'));

            console.log('=> Building Routes...');
            console.time(_chalk2.default.green('=> [\u2713] Routes Built'));
            _context.next = 16;
            return config.getRoutes({ dev: false });

          case 16:
            config.routes = _context.sent;
            _context.next = 19;
            return (0, _static.prepareRoutes)(config);

          case 19:
            console.timeEnd(_chalk2.default.green('=> [\u2713] Routes Built'));

            // Build static pages and JSON
            console.log('=> Bundling App...');
            console.time(_chalk2.default.green('=> [\u2713] App Bundled'));
            _context.next = 24;
            return (0, _webpack.buildProductionBundles)({ config: config });

          case 24:
            clientStats = _context.sent;

            console.timeEnd(_chalk2.default.green('=> [\u2713] App Bundled'));

            if (!config.bundleAnalyzer) {
              _context.next = 29;
              break;
            }

            _context.next = 29;
            return new Promise(function () {});

          case 29:

            console.log('=> Exporting Routes...');
            console.time(_chalk2.default.green('=> [\u2713] Routes Exported'));
            _context.next = 33;
            return (0, _static.exportRoutes)({
              config: config,
              clientStats: clientStats,
              cliArguments: cliArguments
            });

          case 33:
            _context.next = 35;
            return (0, _static.buildXMLandRSS)({ config: config });

          case 35:
            console.timeEnd(_chalk2.default.green('=> [\u2713] Routes Exported'));

            console.timeEnd('=> Site is ready for production!');

            if (!config.onBuild) {
              _context.next = 40;
              break;
            }

            _context.next = 40;
            return config.onBuild({ config: config });

          case 40:
            process.exit(0);
            _context.next = 47;
            break;

          case 43:
            _context.prev = 43;
            _context.t0 = _context['catch'](0);

            console.log(_context.t0);
            process.exit(1);

          case 47:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 43]]);
  }));

  return function _default(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, 'default', 'src/commands/build.js');
  leaveModule(module);
})();

;