'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSiteData = exports.getRouteProps = exports.onLoading = exports.withLoading = exports.withSiteData = exports.withRouteData = exports.scrollTo = exports.prefetch = exports.Link = exports.NavLink = exports.Router = exports.PrefetchWhenSeen = exports.Prefetch = exports.Loading = exports.SiteData = exports.RouteData = exports.Head = exports.withRouter = exports.matchPath = exports.Switch = exports.Route = exports.Redirect = exports.Prompt = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var prefetchData = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee4(path) {
    var _this = this;

    var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        priority = _ref5.priority;

    var routes, isStaticRoute, _ref6, _initialProps, propsMap, initialProps;

    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return getRouteInfo();

          case 2:
            routes = _context4.sent;

            if (!pathProps[path]) {
              _context4.next = 5;
              break;
            }

            return _context4.abrupt('return', pathProps[path]);

          case 5:
            isStaticRoute = routes[path];

            // Not a static route? Bail out.

            if (isStaticRoute) {
              _context4.next = 8;
              break;
            }

            return _context4.abrupt('return');

          case 8:
            if (!(process.env.REACT_STATIC_ENV === 'development')) {
              _context4.next = 27;
              break;
            }

            if (!(window.__routeData && window.__routeData.path === path)) {
              _context4.next = 12;
              break;
            }

            pathProps[path] = window.__routeData;
            return _context4.abrupt('return', pathProps[path]);

          case 12:
            _context4.prev = 12;

            if (!inflight[path]) {
              inflight[path] = _axios2.default.get('/__react-static__/route' + path);
            }
            _context4.next = 16;
            return inflight[path];

          case 16:
            _ref6 = _context4.sent;
            _initialProps = _ref6.data;


            // Place it in the cache
            pathProps[path] = {
              initialProps: _initialProps
            };
            _context4.next = 25;
            break;

          case 21:
            _context4.prev = 21;
            _context4.t0 = _context4['catch'](12);

            console.error('Error: There was an error retrieving props for this route! path:', path);
            throw _context4.t0;

          case 25:
            delete inflight[path];
            return _context4.abrupt('return', pathProps[path]);

          case 27:

            // for production, we'll need the full route
            propsMap = routes[path];

            // Not a static route? Bail out.

            if (propsMap) {
              _context4.next = 30;
              break;
            }

            return _context4.abrupt('return');

          case 30:

            // Request and build the props one by one
            initialProps = {};

            // Request the template and loop over the propsMap, requesting each prop

            _context4.next = 33;
            return Promise.all(Object.keys(propsMap).map(function () {
              var _ref7 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee3(key) {
                var hash, _ref8, prop;

                return _regenerator2.default.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        hash = propsMap[key];

                        // Check the propsByHash first

                        if (propsByHash[hash]) {
                          _context3.next = 16;
                          break;
                        }

                        _context3.prev = 2;

                        if (!inflight[hash]) {
                          if (priority) {
                            inflight[hash] = _axios2.default.get('/staticData/' + hash + '.json');
                          } else {
                            inflight[hash] = prefetchPool.add(function () {
                              return _axios2.default.get('/staticData/' + hash + '.json');
                            });
                          }
                        }
                        _context3.next = 6;
                        return inflight[hash];

                      case 6:
                        _ref8 = _context3.sent;
                        prop = _ref8.data;


                        // Place it in the cache
                        propsByHash[hash] = prop;
                        _context3.next = 15;
                        break;

                      case 11:
                        _context3.prev = 11;
                        _context3.t0 = _context3['catch'](2);

                        console.error('Error: There was an error retrieving a prop for this route! hashID:', hash);
                        console.error(_context3.t0);

                      case 15:
                        delete inflight[hash];

                      case 16:

                        // If this prop was the local prop, spread it on the entire prop object
                        if (key === '__local') {
                          initialProps = _extends({}, initialProps, propsByHash[hash]);
                        } else {
                          // Otherwise, just set it as the key
                          initialProps[key] = propsByHash[hash];
                        }

                      case 17:
                      case 'end':
                        return _context3.stop();
                    }
                  }
                }, _callee3, _this, [[2, 11]]);
              }));

              return function (_x3) {
                return _ref7.apply(this, arguments);
              };
            }()));

          case 33:

            // Cache the entire props for the route
            pathProps[path] = {
              initialProps: initialProps

              // Return the props
            };return _context4.abrupt('return', pathProps[path]);

          case 35:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this, [[12, 21]]);
  }));

  return function prefetchData(_x) {
    return _ref4.apply(this, arguments);
  };
}();

var prefetchTemplate = function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee5(path) {
    var _ref10 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        priority = _ref10.priority;

    var pathTemplate;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            // Preload the template if available
            pathTemplate = window.reactStaticGetComponentForPath && window.reactStaticGetComponentForPath(path);

            if (!(pathTemplate && pathTemplate.preload)) {
              _context5.next = 10;
              break;
            }

            if (!priority) {
              _context5.next = 7;
              break;
            }

            _context5.next = 5;
            return pathTemplate.preload();

          case 5:
            _context5.next = 9;
            break;

          case 7:
            _context5.next = 9;
            return prefetchPool.add(function () {
              return pathTemplate.preload();
            });

          case 9:
            return _context5.abrupt('return', pathTemplate);

          case 10:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function prefetchTemplate(_x4) {
    return _ref9.apply(this, arguments);
  };
}();

var needsPrefetch = function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee6(path) {
    var routes, isStaticRoute;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            // Clean the path
            path = cleanPath(path);

            if (path) {
              _context6.next = 3;
              break;
            }

            return _context6.abrupt('return', false);

          case 3:
            _context6.next = 5;
            return getRouteInfo();

          case 5:
            routes = _context6.sent;
            isStaticRoute = routes[path];

            // Not a static route? Bail out.

            if (!isStaticRoute) {
              _context6.next = 9;
              break;
            }

            return _context6.abrupt('return', true);

          case 9:
            if (pathProps[path]) {
              _context6.next = 11;
              break;
            }

            return _context6.abrupt('return', true);

          case 11:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function needsPrefetch(_x6) {
    return _ref11.apply(this, arguments);
  };
}();

var prefetch = function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee7(path) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var type, _ref13, _ref14, data;

    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            // Clean the path
            path = cleanPath(path);

            if (path) {
              _context7.next = 3;
              break;
            }

            return _context7.abrupt('return');

          case 3:
            type = options.type;

            if (!(type === 'data')) {
              _context7.next = 8;
              break;
            }

            return _context7.abrupt('return', prefetchData(path, options));

          case 8:
            if (!(type === 'template')) {
              _context7.next = 12;
              break;
            }

            _context7.next = 11;
            return prefetchTemplate(path, options);

          case 11:
            return _context7.abrupt('return');

          case 12:
            _context7.next = 14;
            return Promise.all([prefetchData(path), prefetchTemplate(path)]);

          case 14:
            _ref13 = _context7.sent;
            _ref14 = _slicedToArray(_ref13, 1);
            data = _ref14[0];
            return _context7.abrupt('return', data);

          case 18:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));

  return function prefetch(_x7) {
    return _ref12.apply(this, arguments);
  };
}();

var _reactRouterDom = require('react-router-dom');

Object.defineProperty(exports, 'Prompt', {
  enumerable: true,
  get: function get() {
    return _reactRouterDom.Prompt;
  }
});
Object.defineProperty(exports, 'Redirect', {
  enumerable: true,
  get: function get() {
    return _reactRouterDom.Redirect;
  }
});
Object.defineProperty(exports, 'Route', {
  enumerable: true,
  get: function get() {
    return _reactRouterDom.Route;
  }
});
Object.defineProperty(exports, 'Switch', {
  enumerable: true,
  get: function get() {
    return _reactRouterDom.Switch;
  }
});
Object.defineProperty(exports, 'matchPath', {
  enumerable: true,
  get: function get() {
    return _reactRouterDom.matchPath;
  }
});
Object.defineProperty(exports, 'withRouter', {
  enumerable: true,
  get: function get() {
    return _reactRouterDom.withRouter;
  }
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _createBrowserHistory = require('history/createBrowserHistory');

var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

var _createMemoryHistory = require('history/createMemoryHistory');

var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);

var _createHashHistory = require('history/createHashHistory');

var _createHashHistory2 = _interopRequireDefault(_createHashHistory);

var _reactHelmet = require('react-helmet');

var _shared = require('./shared');

var _ScrollTo = require('./utils/ScrollTo');

var _ScrollTo2 = _interopRequireDefault(_ScrollTo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//

//

var prefetchPool = (0, _shared.createPool)({
  concurrency: Number(process.env.REACT_STATIC_PREFETCH_RATE) || 10
});
var propsByHash = {};
var pathProps = {};
var inflight = {};

var siteDataPromise = void 0;
var InitialLoading = void 0;

var routesPromise = void 0;

var getRouteInfo = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(typeof document !== 'undefined')) {
              _context2.next = 3;
              break;
            }

            if (!routesPromise) {
              routesPromise = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                var _ref3, data;

                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        if (!(process.env.REACT_STATIC_ENV === 'development')) {
                          _context.next = 6;
                          break;
                        }

                        _context.next = 3;
                        return _axios2.default.get('/__react-static__/routeInfo');

                      case 3:
                        _ref3 = _context.sent;
                        data = _ref3.data;
                        return _context.abrupt('return', data);

                      case 6:
                        _context.next = 8;
                        return new Promise(function (resolve) {
                          var s = document.createElement('script');
                          s.type = 'text/javascript';
                          s.src = process.env.ROUTE_INFO_URL;
                          s.onload = resolve;
                          if (document.body.append) {
                            document.body.append(s);
                          } else {
                            document.body.appendChild(s);
                          }
                        });

                      case 8:
                        return _context.abrupt('return', window.__routeInfo);

                      case 9:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, undefined);
              }))();
            }
            return _context2.abrupt('return', routesPromise);

          case 3:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function getRouteInfo() {
    return _ref.apply(this, arguments);
  };
}();

if (process.env.REACT_STATIC_ENV === 'development') {
  InitialLoading = function InitialLoading() {
    return _react2.default.createElement(
      'div',
      {
        className: 'react-static-loading',
        style: {
          display: 'block',
          width: '100%',
          textAlign: 'center',
          padding: '10px'
        }
      },
      _react2.default.createElement(
        'style',
        null,
        '\n        @keyframes react-static-loader {\n          0% {\n            transform: rotate(0deg)\n          }\n          100% {\n            transform: rotate(360deg)\n          }\n        }\n      '
      ),
      _react2.default.createElement(
        'svg',
        {
          style: {
            width: '50px',
            height: '50px'
          }
        },
        _react2.default.createElement('circle', {
          style: {
            transformOrigin: '50% 50% 0px',
            animation: 'react-static-loader 1s infinite',
            r: 20,
            stroke: 'rgba(0,0,0,0.4)',
            strokeWidth: 4,
            cx: 25,
            cy: 25,
            strokeDasharray: 10.4,
            strokeLinecap: 'round',
            fill: 'transparent'
          }
        })
      )
    );
  };
}

function cleanPath(path) {
  // Resolve the local path
  if (!path) {
    return;
  }
  // Only allow origin or absolute links
  var hasOrigin = path.startsWith(window.location.origin);
  var isAbsolute = path.startsWith('/');
  if (!hasOrigin && !isAbsolute) {
    return;
  }
  var end = path.indexOf('#');
  end = end === -1 ? undefined : end;
  return (0, _shared.pathJoin)(path.substring(hasOrigin ? window.location.origin.length : 0, end));
}

var RouteData = (0, _reactRouterDom.withRouter)((_temp2 = _class = function (_React$Component) {
  _inherits(RouteData, _React$Component);

  function RouteData() {
    var _ref15,
        _this3 = this;

    var _temp, _this2, _ret;

    _classCallCheck(this, RouteData);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref15 = RouteData.__proto__ || Object.getPrototypeOf(RouteData)).call.apply(_ref15, [this].concat(args))), _this2), _this2.state = {
      loaded: false
    }, _this2.loadRouteData = function () {
      return _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee8() {
        var pathname, path;
        return _regenerator2.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                pathname = _this2.props.location.pathname;
                path = (0, _shared.pathJoin)(pathname);
                _context8.next = 4;
                return prefetch(path);

              case 4:
                if (!_this2.unmounting) {
                  _context8.next = 6;
                  break;
                }

                return _context8.abrupt('return');

              case 6:
                _this2.setState({
                  loaded: true
                });

              case 7:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, _this3);
      }))();
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(RouteData, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (process.env.REACT_STATIC_ENV === 'development') {
        this.loadRouteData();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (process.env.REACT_STATIC_ENV === 'development') {
        if (this.props.location.pathname !== nextProps.location.pathname) {
          this.setState({ loaded: false }, this.loadRouteData);
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.unmounting = true;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          component = _props.component,
          render = _props.render,
          children = _props.children,
          pathname = _props.location.pathname,
          rest = _objectWithoutProperties(_props, ['component', 'render', 'children', 'location']);

      var path = (0, _shared.pathJoin)(pathname);

      var routeData = void 0;

      if (typeof window !== 'undefined') {
        if (window.__routeData && window.__routeData.path === path) {
          routeData = window.__routeData.initialProps;
        }
      }

      if (!routeData && this.context.initialProps) {
        routeData = this.context.initialProps;
      } else {
        routeData = pathProps[path] ? pathProps[path].initialProps : routeData;
      }

      if (!routeData && this.state.loaded) {
        console.error('Warning: withRouteData could not find any props for route: ' + path + '. Either you are missing a getData function for this route in your static.config.js or you are using the withRouteData HOC when you don\'t need to.');
      }

      if (!routeData) {
        if (process.env.REACT_STATIC_ENV === 'development') {
          return _react2.default.createElement(InitialLoading, null);
        }
        return null;
      }

      var finalProps = _extends({}, rest, routeData);
      if (component) {
        return _react2.default.createElement(component, finalProps, children);
      }
      if (render) {
        return render(finalProps);
      }
      return children(finalProps);
    }
  }, {
    key: '__reactstandin__regenerateByEval',
    value: function __reactstandin__regenerateByEval(key, code) {
      this[key] = eval(code);
    }
  }]);

  return RouteData;
}(_react2.default.Component), _class.contextTypes = {
  initialProps: _propTypes2.default.object
}, _temp2));

var SiteData = function (_Component) {
  _inherits(SiteData, _Component);

  function SiteData() {
    var _ref17;

    var _temp3, _this4, _ret2;

    _classCallCheck(this, SiteData);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp3 = (_this4 = _possibleConstructorReturn(this, (_ref17 = SiteData.__proto__ || Object.getPrototypeOf(SiteData)).call.apply(_ref17, [this].concat(args))), _this4), _this4.state = {
      siteData: false
    }, _temp3), _possibleConstructorReturn(_this4, _ret2);
  }

  _createClass(SiteData, [{
    key: 'componentWillMount',
    value: function () {
      var _ref18 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee9() {
        var _ref19, siteData;

        return _regenerator2.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                if (!(process.env.REACT_STATIC_ENV === 'development')) {
                  _context9.next = 8;
                  break;
                }

                _context9.next = 3;
                return function () {
                  if (siteDataPromise) {
                    return siteDataPromise;
                  }
                  siteDataPromise = _axios2.default.get('/__react-static__/siteData');
                  return siteDataPromise;
                }();

              case 3:
                _ref19 = _context9.sent;
                siteData = _ref19.data;

                if (!this.unmounting) {
                  _context9.next = 7;
                  break;
                }

                return _context9.abrupt('return');

              case 7:
                this.setState({
                  siteData: siteData
                });

              case 8:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function componentWillMount() {
        return _ref18.apply(this, arguments);
      }

      return componentWillMount;
    }()
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.unmounting = true;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          component = _props2.component,
          render = _props2.render,
          children = _props2.children,
          rest = _objectWithoutProperties(_props2, ['component', 'render', 'children']);

      var siteData = void 0;
      if (typeof window !== 'undefined') {
        if (window.__routeData) {
          siteData = window.__routeData.siteData;
        }
      }

      if (!siteData && this.context.siteData) {
        siteData = this.context.siteData;
      }

      if (!siteData && this.state.siteData) {
        siteData = this.state.siteData;
      }

      if (!siteData) {
        if (process.env.REACT_STATIC_ENV === 'development') {
          return _react2.default.createElement(InitialLoading, null);
        }
        return null;
      }

      var finalProps = _extends({}, rest, siteData);
      if (component) {
        return _react2.default.createElement(component, finalProps, children);
      }
      if (render) {
        return render(finalProps);
      }
      return children(finalProps);
    }
  }, {
    key: '__reactstandin__regenerateByEval',
    value: function __reactstandin__regenerateByEval(key, code) {
      this[key] = eval(code);
    }
  }]);

  return SiteData;
}(_react.Component);

SiteData.contextTypes = {
  siteData: _propTypes2.default.object
};

var Prefetch = function (_Component2) {
  _inherits(Prefetch, _Component2);

  function Prefetch() {
    _classCallCheck(this, Prefetch);

    return _possibleConstructorReturn(this, (Prefetch.__proto__ || Object.getPrototypeOf(Prefetch)).apply(this, arguments));
  }

  _createClass(Prefetch, [{
    key: 'componentDidMount',
    value: function () {
      var _ref20 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee10() {
        var _props3, path, onLoad, type, data;

        return _regenerator2.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _props3 = this.props, path = _props3.path, onLoad = _props3.onLoad, type = _props3.type;
                _context10.next = 3;
                return prefetch(path, { type: type });

              case 3:
                data = _context10.sent;

                onLoad(data, path);

              case 5:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function componentDidMount() {
        return _ref20.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: 'render',
    value: function render() {
      return (0, _shared.unwrapArray)(this.props.children);
    }
  }, {
    key: '__reactstandin__regenerateByEval',
    value: function __reactstandin__regenerateByEval(key, code) {
      this[key] = eval(code);
    }
  }]);

  return Prefetch;
}(_react.Component);

Prefetch.defaultProps = {
  children: null,
  path: null,
  type: null,
  onLoad: function onLoad() {}
};


var ioIsSupported = typeof window !== 'undefined' && 'IntersectionObserver' in window;
var handleIntersection = function handleIntersection(element, callback) {
  var io = new window.IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      // Edge doesn't support isIntersecting. intersectionRatio > 0 works as a fallback
      if (element === entry.target && (entry.isIntersecting || entry.intersectionRatio > 0)) {
        io.unobserve(element);
        io.disconnect();
        callback();
      }
    });
  });

  io.observe(element);
};

var PrefetchWhenSeen = function (_Component3) {
  _inherits(PrefetchWhenSeen, _Component3);

  function PrefetchWhenSeen() {
    var _ref21,
        _this7 = this;

    var _temp4, _this6, _ret3;

    _classCallCheck(this, PrefetchWhenSeen);

    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return _ret3 = (_temp4 = (_this6 = _possibleConstructorReturn(this, (_ref21 = PrefetchWhenSeen.__proto__ || Object.getPrototypeOf(PrefetchWhenSeen)).call.apply(_ref21, [this].concat(args))), _this6), _this6.runPrefetch = function () {
      return _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee11() {
        var _this6$props, path, onLoad, type, data;

        return _regenerator2.default.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _this6$props = _this6.props, path = _this6$props.path, onLoad = _this6$props.onLoad, type = _this6$props.type;
                _context11.next = 3;
                return prefetch(path, { type: type });

              case 3:
                data = _context11.sent;

                onLoad(data, path);

              case 5:
              case 'end':
                return _context11.stop();
            }
          }
        }, _callee11, _this7);
      }))();
    }, _this6.handleRef = function (ref) {
      if (ioIsSupported && ref) {
        handleIntersection(ref, _this6.runPrefetch);
      }
    }, _temp4), _possibleConstructorReturn(_this6, _ret3);
  }

  _createClass(PrefetchWhenSeen, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (!ioIsSupported) {
        this.runPrefetch();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props4 = this.props,
          component = _props4.component,
          render = _props4.render,
          children = _props4.children,
          rest = _objectWithoutProperties(_props4, ['component', 'render', 'children']);

      if (component) {
        return _react2.default.createElement(component, {
          handleRef: this.handleRef
        });
      }
      if (render) {
        return render({ handleRef: this.handleRef });
      }
      return _react2.default.createElement(
        'div',
        _extends({ ref: this.handleRef }, rest),
        children
      );
    }
  }, {
    key: '__reactstandin__regenerateByEval',
    value: function __reactstandin__regenerateByEval(key, code) {
      this[key] = eval(code);
    }
  }]);

  return PrefetchWhenSeen;
}(_react.Component);

PrefetchWhenSeen.defaultProps = {
  children: null,
  path: null,
  className: null,
  type: null,
  onLoad: function onLoad() {}
};


var loading = false;
var subscribers = [];
var setLoading = function setLoading(d) {
  if (loading !== d) {
    loading = d;
    subscribers.forEach(function (s) {
      return s();
    });
  }
};
var onLoading = function onLoading(cb) {
  var ccb = function ccb() {
    return cb(loading);
  };
  subscribers.push(ccb);
  return function () {
    subscribers = subscribers.filter(function (d) {
      return d !== ccb;
    });
  };
};

var Loading = function (_React$Component2) {
  _inherits(Loading, _React$Component2);

  function Loading() {
    var _ref23;

    var _temp5, _this8, _ret4;

    _classCallCheck(this, Loading);

    for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    return _ret4 = (_temp5 = (_this8 = _possibleConstructorReturn(this, (_ref23 = Loading.__proto__ || Object.getPrototypeOf(Loading)).call.apply(_ref23, [this].concat(args))), _this8), _this8.state = {
      loading: loading
    }, _temp5), _possibleConstructorReturn(_this8, _ret4);
  }

  _createClass(Loading, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this9 = this;

      this.unsubscribe = onLoading(function (loading) {
        return _this9.setState({
          loading: loading
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props5 = this.props,
          component = _props5.component,
          render = _props5.render,
          children = _props5.children,
          rest = _objectWithoutProperties(_props5, ['component', 'render', 'children']);

      var finalProps = _extends({}, rest, {
        loading: this.state.loading
      });
      if (component) {
        return _react2.default.createElement(component, finalProps, children);
      }
      if (render) {
        return render(finalProps);
      }
      return children(finalProps);
    }
  }, {
    key: '__reactstandin__regenerateByEval',
    value: function __reactstandin__regenerateByEval(key, code) {
      this[key] = eval(code);
    }
  }]);

  return Loading;
}(_react2.default.Component);

var RouterScroller = (0, _reactRouterDom.withRouter)(function (_Component4) {
  _inherits(RouterScroller, _Component4);

  function RouterScroller() {
    var _ref24;

    var _temp6, _this10, _ret5;

    _classCallCheck(this, RouterScroller);

    for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      args[_key5] = arguments[_key5];
    }

    return _ret5 = (_temp6 = (_this10 = _possibleConstructorReturn(this, (_ref24 = RouterScroller.__proto__ || Object.getPrototypeOf(RouterScroller)).call.apply(_ref24, [this].concat(args))), _this10), _this10.scrollToTop = function () {
      var _this10$props = _this10.props,
          autoScrollToTop = _this10$props.autoScrollToTop,
          scrollToTopDuration = _this10$props.scrollToTopDuration;

      if (autoScrollToTop) {
        (0, _ScrollTo2.default)(0, {
          duration: scrollToTopDuration
        });
      }
    }, _this10.scrollToHash = function () {
      var _this10$props2 = _this10.props,
          scrollToHashDuration = _this10$props2.scrollToHashDuration,
          autoScrollToHash = _this10$props2.autoScrollToHash,
          scrollToHashOffset = _this10$props2.scrollToHashOffset,
          hash = _this10$props2.location.hash;

      if (!autoScrollToHash) {
        return;
      }
      if (hash) {
        var resolvedHash = hash.substring(1);
        if (resolvedHash) {
          var element = document.getElementById(resolvedHash);
          if (element !== null) {
            (0, _ScrollTo2.default)(element, {
              duration: scrollToHashDuration,
              offset: scrollToHashOffset
            });
          }
        }
      } else {
        (0, _ScrollTo2.default)(0, {
          duration: scrollToHashDuration
        });
      }
    }, _temp6), _possibleConstructorReturn(_this10, _ret5);
  }

  _createClass(RouterScroller, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.scrollToHash();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prev) {
      if (prev.location.pathname !== this.props.location.pathname && !this.props.location.hash) {
        if (window.__noScrollTo) {
          window.__noScrollTo = false;
          return;
        }
        this.scrollToTop();
        return;
      }
      if (prev.location.hash !== this.props.location.hash) {
        return this.scrollToHash();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return (0, _shared.unwrapArray)(this.props.children);
    }
  }, {
    key: '__reactstandin__regenerateByEval',
    value: function __reactstandin__regenerateByEval(key, code) {
      this[key] = eval(code);
    }
  }]);

  return RouterScroller;
}(_react.Component));

var Router = function (_Component5) {
  _inherits(Router, _Component5);

  function Router() {
    var _ref25;

    var _temp7, _this11, _ret6;

    _classCallCheck(this, Router);

    for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
      args[_key6] = arguments[_key6];
    }

    return _ret6 = (_temp7 = (_this11 = _possibleConstructorReturn(this, (_ref25 = Router.__proto__ || Object.getPrototypeOf(Router)).call.apply(_ref25, [this].concat(args))), _this11), _initialiseProps.call(_this11), _temp7), _possibleConstructorReturn(_this11, _ret6);
  }

  _createClass(Router, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      getRouteInfo();
      if (typeof window !== 'undefined') {
        var _window$location = window.location,
            href = _window$location.href,
            origin = _window$location.origin;

        var path = (0, _shared.pathJoin)(href.replace(origin, ''));
        if (window.__routeData && window.__routeData.path === path) {
          var initialProps = window.__routeData.initialProps;
          Object.keys(initialProps).forEach(function (key) {
            propsByHash[window.__routeData.propsMap[key]] = initialProps[key];
          });
        }
      }
    }
  }, {
    key: 'componentDidCatch',
    value: function componentDidCatch(error, errorInfo) {
      // Catch errors in any child components and re-renders with an error message
      this.setState({
        error: error,
        errorInfo: errorInfo
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props6 = this.props,
          history = _props6.history,
          type = _props6.type,
          children = _props6.children,
          autoScrollToTop = _props6.autoScrollToTop,
          autoScrollToHash = _props6.autoScrollToHash,
          scrollToTopDuration = _props6.scrollToTopDuration,
          scrollToHashDuration = _props6.scrollToHashDuration,
          scrollToHashOffset = _props6.scrollToHashOffset,
          rest = _objectWithoutProperties(_props6, ['history', 'type', 'children', 'autoScrollToTop', 'autoScrollToHash', 'scrollToTopDuration', 'scrollToHashDuration', 'scrollToHashOffset']);

      var staticURL = this.context.staticURL;

      var context = staticURL ? {} : undefined;

      var ResolvedRouter = void 0;
      var resolvedHistory = void 0;

      if (this.state.error) {
        // Fallback UI if an error occurs
        return _react2.default.createElement(
          'div',
          {
            style: {
              margin: '1rem',
              padding: '1rem',
              background: 'rgba(0,0,0,0.05)'
            }
          },
          _react2.default.createElement(
            'h2',
            null,
            'Oh-no! Something\'s gone wrong!'
          ),
          _react2.default.createElement(
            'pre',
            { style: { whiteSpace: 'normal', color: 'red' } },
            _react2.default.createElement(
              'code',
              null,
              this.state.error && this.state.error.toString()
            )
          ),
          _react2.default.createElement(
            'h3',
            null,
            'This error occurred here:'
          ),
          _react2.default.createElement(
            'pre',
            { style: { color: 'red', overflow: 'auto' } },
            _react2.default.createElement(
              'code',
              null,
              this.state.errorInfo.componentStack
            )
          ),
          _react2.default.createElement(
            'p',
            null,
            'For more information, please see the console.'
          )
        );
      }

      // If statically rendering, use the static router
      if (staticURL) {
        ResolvedRouter = _reactRouterDom.StaticRouter;
        resolvedHistory = undefined;
      } else {
        ResolvedRouter = _reactRouterDom.Router;
        resolvedHistory = history || global.__reactStaticRouterHistory;
        if (!resolvedHistory) {
          if (type === 'memory') {
            resolvedHistory = (0, _createMemoryHistory2.default)();
          } else if (type === 'hash') {
            resolvedHistory = (0, _createHashHistory2.default)();
          } else {
            resolvedHistory = (0, _createBrowserHistory2.default)();
          }
        }
        global.__reactStaticRouterHistory = resolvedHistory;
        this.patchHistoryNavigation(resolvedHistory);
      }

      return _react2.default.createElement(
        ResolvedRouter,
        _extends({ history: resolvedHistory, location: staticURL, context: context }, rest),
        _react2.default.createElement(
          RouterScroller,
          {
            autoScrollToTop: autoScrollToTop,
            autoScrollToHash: autoScrollToHash,
            scrollToTopDuration: scrollToTopDuration,
            scrollToHashDuration: scrollToHashDuration,
            scrollToHashOffset: scrollToHashOffset
          },
          children
        )
      );
    }
  }, {
    key: '__reactstandin__regenerateByEval',
    value: function __reactstandin__regenerateByEval(key, code) {
      this[key] = eval(code);
    }
  }]);

  return Router;
}(_react.Component);

// Detects internal link url schemas


Router.defaultProps = {
  type: 'browser',
  autoScrollToTop: true,
  autoScrollToHash: true,
  scrollToTopDuration: 0,
  scrollToHashDuration: 800,
  scrollToHashOffset: 0
};
Router.contextTypes = {
  staticURL: _propTypes2.default.string
};

var _initialiseProps = function _initialiseProps() {
  var _this12 = this;

  this.state = {
    error: null,
    errorInfo: null
  };

  this.patchHistoryNavigation = function (resolvedHistory) {
    if (_this12.patchedNavigation) {
      return;
    }
    ['push', 'replace'].forEach(function (method) {
      var originalMethod = resolvedHistory[method];
      resolvedHistory[method] = function () {
        var _ref28 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee12() {
          for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
            args[_key7] = arguments[_key7];
          }

          var path, shouldPrefetch;
          return _regenerator2.default.wrap(function _callee12$(_context12) {
            while (1) {
              switch (_context12.prev = _context12.next) {
                case 0:
                  path = typeof args[0] === 'string' ? args[0] : args[0].path;
                  _context12.next = 3;
                  return needsPrefetch(path);

                case 3:
                  shouldPrefetch = _context12.sent;

                  if (!shouldPrefetch) {
                    _context12.next = 9;
                    break;
                  }

                  setLoading(true);
                  _context12.next = 8;
                  return prefetch(path, {
                    priority: true
                  });

                case 8:
                  setLoading(false);

                case 9:
                  originalMethod.apply(resolvedHistory, args);

                case 10:
                case 'end':
                  return _context12.stop();
              }
            }
          }, _callee12, _this12);
        }));

        return function () {
          return _ref28.apply(this, arguments);
        };
      }();
    });
    _this12.patchedNavigation = true;
  };
};

function isRoutingUrl(to) {
  if (typeof to === 'undefined') return false;
  return !to.match(/^([A-z]?)+:/) && // starts with external protocol
  !to.match(/^#/) && // starts with hash fragment
  !to.match(/^[a-z]{1,10}:\/\//) // starts with double slash protocol
  ;
}

var reactRouterProps = ['activeClassName', 'activeStyle', 'exact', 'isActive', 'location', 'strict', 'to', 'replace'];

function SmartLink(_ref26) {
  var _ref26$prefetch = _ref26.prefetch,
      prefetch = _ref26$prefetch === undefined ? true : _ref26$prefetch,
      _ref26$scrollToTop = _ref26.scrollToTop,
      scrollToTop = _ref26$scrollToTop === undefined ? true : _ref26$scrollToTop,
      _onClick = _ref26.onClick,
      rest = _objectWithoutProperties(_ref26, ['prefetch', 'scrollToTop', 'onClick']);

  var to = rest.to;

  var resolvedTo = to;
  if ((0, _shared.isObject)(to)) {
    if (!to.pathname && to.path) {
      console.warn('You are using the `path` key in a <Link to={...} /> when you should be using the `pathname` key. This will be deprecated in future versions!');
      to.pathname = to.path;
      delete to.path;
      resolvedTo = to.pathname;
    } else if (to.pathname) {
      resolvedTo = to.pathname;
    }
  }
  // Router Link
  if (isRoutingUrl(resolvedTo)) {
    var finalRest = _extends({}, rest, {
      onClick: function onClick(e) {
        if (typeof document !== 'undefined' && !scrollToTop) {
          window.__noScrollTo = true;
        }
        if (_onClick) {
          _onClick(e);
        }
      }
    });

    if (prefetch) {
      return _react2.default.createElement(PrefetchWhenSeen, {
        path: resolvedTo,
        type: prefetch,
        render: function render(_ref27) {
          var handleRef = _ref27.handleRef;
          return _react2.default.createElement(_reactRouterDom.NavLink, _extends({}, finalRest, { innerRef: handleRef }));
        }
      });
    }
    return _react2.default.createElement(_reactRouterDom.NavLink, finalRest);
  }

  // Browser Link

  var children = rest.children,
      aRest = _objectWithoutProperties(rest, ['children']);

  aRest.href = aRest.to;
  delete aRest.to;

  reactRouterProps.filter(function (prop) {
    return aRest[prop];
  }).forEach(function (prop) {
    console.warn('Warning: ' + prop + ' makes no sense on a <Link to="' + aRest.href + '">.');
  });
  reactRouterProps.forEach(function (prop) {
    return delete aRest[prop];
  });

  return _react2.default.createElement(
    'a',
    aRest,
    children
  );
}

var Link = SmartLink;
var NavLink = SmartLink;

function withRouteData(Comp) {
  return function ConnectedRouteData(props) {
    return _react2.default.createElement(RouteData, _extends({ component: Comp }, props));
  };
}

function withSiteData(Comp) {
  return function ConnectedSiteData(props) {
    return _react2.default.createElement(SiteData, _extends({ component: Comp }, props));
  };
}

function withLoading(Comp) {
  return function ConnectedLoading(props) {
    return _react2.default.createElement(Loading, _extends({ component: Comp }, props));
  };
}

// Deprecations
var getRouteProps = function getRouteProps() {
  (0, _shared.deprecate)('getRouteProps', 'withRouteData');
  return withRouteData.apply(undefined, arguments);
};
var getSiteData = function getSiteData() {
  (0, _shared.deprecate)('getSiteData', 'withSiteData');
  return withSiteData.apply(undefined, arguments);
};

// Exports

// Proxy React Router

// Proxy Helmet as Head
exports.Head = _reactHelmet.Helmet;
// Export react-static utils

exports.RouteData = RouteData;
exports.SiteData = SiteData;
exports.Loading = Loading;
exports.Prefetch = Prefetch;
exports.PrefetchWhenSeen = PrefetchWhenSeen;
exports.Router = Router;
exports.NavLink = NavLink;
exports.Link = Link;
exports.prefetch = prefetch;
exports.scrollTo = _ScrollTo2.default;
exports.withRouteData = withRouteData;
exports.withSiteData = withSiteData;
exports.withLoading = withLoading;
exports.onLoading = onLoading;
exports.getRouteProps = getRouteProps;
exports.getSiteData = getSiteData;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(prefetchPool, 'prefetchPool', 'src/index.js');
  reactHotLoader.register(propsByHash, 'propsByHash', 'src/index.js');
  reactHotLoader.register(pathProps, 'pathProps', 'src/index.js');
  reactHotLoader.register(inflight, 'inflight', 'src/index.js');
  reactHotLoader.register(siteDataPromise, 'siteDataPromise', 'src/index.js');
  reactHotLoader.register(InitialLoading, 'InitialLoading', 'src/index.js');
  reactHotLoader.register(routesPromise, 'routesPromise', 'src/index.js');
  reactHotLoader.register(getRouteInfo, 'getRouteInfo', 'src/index.js');
  reactHotLoader.register(cleanPath, 'cleanPath', 'src/index.js');
  reactHotLoader.register(prefetchData, 'prefetchData', 'src/index.js');
  reactHotLoader.register(prefetchTemplate, 'prefetchTemplate', 'src/index.js');
  reactHotLoader.register(needsPrefetch, 'needsPrefetch', 'src/index.js');
  reactHotLoader.register(prefetch, 'prefetch', 'src/index.js');
  reactHotLoader.register(RouteData, 'RouteData', 'src/index.js');
  reactHotLoader.register(SiteData, 'SiteData', 'src/index.js');
  reactHotLoader.register(Prefetch, 'Prefetch', 'src/index.js');
  reactHotLoader.register(ioIsSupported, 'ioIsSupported', 'src/index.js');
  reactHotLoader.register(handleIntersection, 'handleIntersection', 'src/index.js');
  reactHotLoader.register(PrefetchWhenSeen, 'PrefetchWhenSeen', 'src/index.js');
  reactHotLoader.register(loading, 'loading', 'src/index.js');
  reactHotLoader.register(subscribers, 'subscribers', 'src/index.js');
  reactHotLoader.register(setLoading, 'setLoading', 'src/index.js');
  reactHotLoader.register(onLoading, 'onLoading', 'src/index.js');
  reactHotLoader.register(Loading, 'Loading', 'src/index.js');
  reactHotLoader.register(RouterScroller, 'RouterScroller', 'src/index.js');
  reactHotLoader.register(Router, 'Router', 'src/index.js');
  reactHotLoader.register(isRoutingUrl, 'isRoutingUrl', 'src/index.js');
  reactHotLoader.register(reactRouterProps, 'reactRouterProps', 'src/index.js');
  reactHotLoader.register(SmartLink, 'SmartLink', 'src/index.js');
  reactHotLoader.register(Link, 'Link', 'src/index.js');
  reactHotLoader.register(NavLink, 'NavLink', 'src/index.js');
  reactHotLoader.register(withRouteData, 'withRouteData', 'src/index.js');
  reactHotLoader.register(withSiteData, 'withSiteData', 'src/index.js');
  reactHotLoader.register(withLoading, 'withLoading', 'src/index.js');
  reactHotLoader.register(getRouteProps, 'getRouteProps', 'src/index.js');
  reactHotLoader.register(getSiteData, 'getSiteData', 'src/index.js');
  leaveModule(module);
})();

;