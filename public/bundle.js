var bundle =
webpackJsonpbundle([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nvar _react = __webpack_require__(1);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactDom = __webpack_require__(32);\n\nvar _reactRedux = __webpack_require__(166);\n\nvar _reactRouter = __webpack_require__(187);\n\nvar _reactRouterRedux = __webpack_require__(245);\n\nvar _useStandardScroll = __webpack_require__(250);\n\nvar _useStandardScroll2 = _interopRequireDefault(_useStandardScroll);\n\nvar _createBrowserHistory = __webpack_require__(242);\n\nvar _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);\n\nvar _store = __webpack_require__(260);\n\nvar _routes = __webpack_require__(261);\n\nvar _routes2 = _interopRequireDefault(_routes);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nlet state = window.__initialState__ || undefined;\nconst store = (0, _store.configureStore)(_reactRouter.browserHistory, state);\nconst createScrollHistory = (0, _useStandardScroll2.default)(_createBrowserHistory2.default);\nconst appHistory = (0, _reactRouter.useRouterHistory)(createScrollHistory)();\nconst history = (0, _reactRouterRedux.syncHistoryWithStore)(appHistory, store);\n\n(0, _reactDom.render)(_react2.default.createElement(\n  _reactRedux.Provider,\n  { store: store },\n  _react2.default.createElement(_reactRouter.Router, { history: history, routes: _routes2.default })\n), document.getElementById('mount'));//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50L2luZGV4LmpzPzEwMGMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7OztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFDQTs7Ozs7O0FBRUEsSUFBSSxRQUFRLE9BQU8sZ0JBQVAsSUFBMkIsU0FBM0I7QUFDWixNQUFNLFFBQVEsd0RBQStCLEtBQS9CLENBQVI7QUFDTixNQUFNLHNCQUFzQixnRUFBdEI7QUFDTixNQUFNLGFBQWEsbUNBQWlCLG1CQUFqQixHQUFiO0FBQ04sTUFBTSxVQUFVLDRDQUFxQixVQUFyQixFQUFpQyxLQUFqQyxDQUFWOztBQUVOLHNCQUNFOztJQUFVLE9BQU8sS0FBUCxFQUFWO0VBQ0UscURBQVEsU0FBUyxPQUFULEVBQWtCLDBCQUExQixDQURGO0NBREYsRUFJRSxTQUFTLGNBQVQsQ0FBd0IsT0FBeEIsQ0FKRiIsImZpbGUiOiIwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgcmVuZGVyIH0gZnJvbSAncmVhY3QtZG9tJ1xuaW1wb3J0IHsgUHJvdmlkZXIgfSBmcm9tICdyZWFjdC1yZWR1eCdcbmltcG9ydCB7IFJvdXRlciwgYnJvd3Nlckhpc3RvcnksIHVzZVJvdXRlckhpc3RvcnkgfSBmcm9tICdyZWFjdC1yb3V0ZXInXG5pbXBvcnQgeyBzeW5jSGlzdG9yeVdpdGhTdG9yZSB9IGZyb20gJ3JlYWN0LXJvdXRlci1yZWR1eCdcbmltcG9ydCB1c2VTY3JvbGwgZnJvbSAnc2Nyb2xsLWJlaGF2aW9yL2xpYi91c2VTdGFuZGFyZFNjcm9sbCdcbmltcG9ydCBjcmVhdGVCcm93c2VySGlzdG9yeSBmcm9tICdoaXN0b3J5L2xpYi9jcmVhdGVCcm93c2VySGlzdG9yeSdcblxuaW1wb3J0IHsgY29uZmlndXJlU3RvcmUgfSBmcm9tICcuL3N0b3JlJ1xuaW1wb3J0IHJvdXRlcyBmcm9tICcuL3JvdXRlcydcblxubGV0IHN0YXRlID0gd2luZG93Ll9faW5pdGlhbFN0YXRlX18gfHwgdW5kZWZpbmVkXG5jb25zdCBzdG9yZSA9IGNvbmZpZ3VyZVN0b3JlKGJyb3dzZXJIaXN0b3J5LCBzdGF0ZSlcbmNvbnN0IGNyZWF0ZVNjcm9sbEhpc3RvcnkgPSB1c2VTY3JvbGwoY3JlYXRlQnJvd3Nlckhpc3RvcnkpXG5jb25zdCBhcHBIaXN0b3J5ID0gdXNlUm91dGVySGlzdG9yeShjcmVhdGVTY3JvbGxIaXN0b3J5KSgpXG5jb25zdCBoaXN0b3J5ID0gc3luY0hpc3RvcnlXaXRoU3RvcmUoYXBwSGlzdG9yeSwgc3RvcmUpXG5cbnJlbmRlcihcbiAgPFByb3ZpZGVyIHN0b3JlPXtzdG9yZX0+XG4gICAgPFJvdXRlciBoaXN0b3J5PXtoaXN0b3J5fSByb3V0ZXM9e3JvdXRlc30gLz5cbiAgPC9Qcm92aWRlcj4sXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb3VudCcpXG4pXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9jbGllbnQvaW5kZXguanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9");

/***/ },

/***/ 260:
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nexports.configureStore = configureStore;\n\nvar _react = __webpack_require__(1);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _redux = __webpack_require__(173);\n\nvar _reactRouterRedux = __webpack_require__(245);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction configureStore(history, initialState) {\n\n  let reducers = [];\n\n  const reducer = (0, _redux.combineReducers)(_extends({}, reducers, {\n    routing: _reactRouterRedux.routerReducer\n  }));\n\n  const store = (0, _redux.createStore)(reducer, initialState, (0, _redux.compose)((0, _redux.applyMiddleware)((0, _reactRouterRedux.routerMiddleware)(history))));\n\n  return store;\n}//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50L3N0b3JlLmpzP2ExZWIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7UUFLZ0I7O0FBTGhCOzs7O0FBRUE7O0FBQ0E7Ozs7QUFFTyxTQUFTLGNBQVQsQ0FBd0IsT0FBeEIsRUFBaUMsWUFBakMsRUFBK0M7O0FBRXBELE1BQUksV0FBVyxFQUFYLENBRmdEOztBQUlwRCxRQUFNLFVBQVUseUNBQ1g7QUFDSDtJQUZjLENBQVYsQ0FKOEM7O0FBU3BELFFBQU0sUUFBUSx3QkFDWixPQURZLEVBRVosWUFGWSxFQUdaLG9CQUNFLDRCQUNFLHdDQUFpQixPQUFqQixDQURGLENBREYsQ0FIWSxDQUFSLENBVDhDOztBQW1CcEQsU0FBTyxLQUFQLENBbkJvRCIsImZpbGUiOiIyNjAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5cbmltcG9ydCB7IGNyZWF0ZVN0b3JlLCBjb21iaW5lUmVkdWNlcnMsIGNvbXBvc2UsIGFwcGx5TWlkZGxld2FyZSB9IGZyb20gJ3JlZHV4J1xuaW1wb3J0IHsgcm91dGVyUmVkdWNlciwgcm91dGVyTWlkZGxld2FyZSB9IGZyb20gJ3JlYWN0LXJvdXRlci1yZWR1eCdcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbmZpZ3VyZVN0b3JlKGhpc3RvcnksIGluaXRpYWxTdGF0ZSkge1xuXG4gIGxldCByZWR1Y2VycyA9IFtdXG5cbiAgY29uc3QgcmVkdWNlciA9IGNvbWJpbmVSZWR1Y2Vycyh7XG4gICAgLi4ucmVkdWNlcnMsXG4gICAgcm91dGluZzogcm91dGVyUmVkdWNlclxuICB9KVxuXG4gIGNvbnN0IHN0b3JlID0gY3JlYXRlU3RvcmUoXG4gICAgcmVkdWNlcixcbiAgICBpbml0aWFsU3RhdGUsXG4gICAgY29tcG9zZShcbiAgICAgIGFwcGx5TWlkZGxld2FyZShcbiAgICAgICAgcm91dGVyTWlkZGxld2FyZShoaXN0b3J5KVxuICAgICAgKVxuICAgIClcbiAgKVxuXG4gIHJldHVybiBzdG9yZVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvY2xpZW50L3N0b3JlLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ },

/***/ 261:
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _react = __webpack_require__(1);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRouter = __webpack_require__(187);\n\nvar _App = __webpack_require__(262);\n\nvar _App2 = _interopRequireDefault(_App);\n\nvar _Home = __webpack_require__(263);\n\nvar _Home2 = _interopRequireDefault(_Home);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/* container components */\n\n\nconst routes = _react2.default.createElement(\n  _reactRouter.Route,\n  { path: '/', component: _App2.default },\n  _react2.default.createElement(_reactRouter.IndexRoute, { component: _Home2.default })\n);\n\nexports.default = routes;//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50L3JvdXRlcy5qcz8wY2U1Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBR0E7Ozs7QUFDQTs7Ozs7Ozs7O0FBRUEsTUFBTSxTQUNKOztJQUFPLE1BQUssR0FBTCxFQUFTLDBCQUFoQjtFQUNFLHlEQUFZLDJCQUFaLENBREY7Q0FESTs7a0JBTVMiLCJmaWxlIjoiMjYxLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgUm91dGUsIEluZGV4Um91dGUsIExpbmsgfSBmcm9tICdyZWFjdC1yb3V0ZXInXG5cbi8qIGNvbnRhaW5lciBjb21wb25lbnRzICovXG5pbXBvcnQgQXBwIGZyb20gJy4vY29udGFpbmVycy9BcHAnXG5pbXBvcnQgSG9tZSBmcm9tICcuL2NvbnRhaW5lcnMvSG9tZS9Ib21lJ1xuXG5jb25zdCByb3V0ZXMgPSAoXG4gIDxSb3V0ZSBwYXRoPVwiL1wiIGNvbXBvbmVudD17QXBwfT5cbiAgICA8SW5kZXhSb3V0ZSBjb21wb25lbnQ9e0hvbWV9Lz5cbiAgPC9Sb3V0ZT5cbilcblxuZXhwb3J0IGRlZmF1bHQgcm91dGVzXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9jbGllbnQvcm91dGVzLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ },

/***/ 262:
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nvar _react = __webpack_require__(1);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRouter = __webpack_require__(187);\n\nvar _reactRedux = __webpack_require__(166);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction App(_ref) {\n  let pushPath = _ref.pushPath;\n  let children = _ref.children;\n\n  return _react2.default.createElement(\n    'div',\n    null,\n    _react2.default.createElement(\n      'main',\n      null,\n      children\n    )\n  );\n};\n\nmodule.exports = (0, _reactRedux.connect)(null)(App);//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50L2NvbnRhaW5lcnMvQXBwLmpzPzIxMjUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7OztBQUNBOztBQUNBOzs7O0FBRUEsU0FBUyxHQUFULE9BQXFDO01BQXRCLHlCQUFzQjtNQUFaLHlCQUFZOztBQUNuQyxTQUNFOzs7SUFDRTs7O01BQ0csUUFESDtLQURGO0dBREYsQ0FEbUM7Q0FBckM7O0FBVUEsT0FBTyxPQUFQLEdBQWlCLHlCQUNmLElBRGUsRUFFZixHQUZlLENBQWpCIiwiZmlsZSI6IjI2Mi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IExpbmsgfSBmcm9tICdyZWFjdC1yb3V0ZXInXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnXG5cbmZ1bmN0aW9uIEFwcCh7IHB1c2hQYXRoLCBjaGlsZHJlbiB9KSB7XG4gIHJldHVybiAoXG4gICAgPGRpdj5cbiAgICAgIDxtYWluPiAgICAgIFxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L21haW4+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbm5lY3QoXG4gIG51bGxcbikoQXBwKVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvY2xpZW50L2NvbnRhaW5lcnMvQXBwLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ },

/***/ 263:
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _react = __webpack_require__(1);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRedux = __webpack_require__(166);\n\nvar _Home = __webpack_require__(264);\n\nvar _Home2 = _interopRequireDefault(_Home);\n\nvar _reactRouter = __webpack_require__(187);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nlet fetchPackages = function fetchPackages() {\n\n  console.log('wtf');\n};\n\nclass Home extends _react.Component {\n\n  static fetchData(_ref) {\n    let params = _ref.params;\n    let store = _ref.store;\n    let url = _ref.url;\n\n    return store.dispatch(fetchPackages(url));\n  }\n\n  constructor(props) {\n    super(props);\n  }\n\n  componentDidMount() {\n    this.props.dispatch(fetchPackages(location.origin));\n  }\n\n  render() {\n    const stuff = this.props.stuff;\n\n    let packages = null;\n\n    loader = null;\n\n    packages = stuff.map(function (p) {\n      return _react2.default.createElement(\n        'li',\n        { key: p.id },\n        _react2.default.createElement(\n          _reactRouter.Link,\n          { to: `/package/${ p.id }/${ p.name }` },\n          _react2.default.createElement(\n            'p',\n            { className: _Home2.default.name },\n            p.name\n          )\n        )\n      );\n    });\n\n    return _react2.default.createElement(\n      'div',\n      { className: _Home2.default.home },\n      _react2.default.createElement('div', { className: _Home2.default.list })\n    );\n  }\n}\n\nfunction mapStateToProps(state) {\n  console.log(state);\n  return {\n    stuff: state.stuff || [{\n      id: \"id\",\n      name: \"name\"\n    }]\n  };\n}\n\nexports.default = (0, _reactRedux.connect)(mapStateToProps)(Home);//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50L2NvbnRhaW5lcnMvSG9tZS9Ib21lLmpzP2M2YmIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBRUEsSUFBSSxnQkFBZ0IsU0FBaEIsYUFBZ0IsR0FBVzs7QUFFN0IsVUFBUSxHQUFSLENBQVksS0FBWixFQUY2QjtDQUFYOztBQUtwQixNQUFNLElBQU4sMEJBQTZCOztBQUUzQixTQUFPLFNBQVAsT0FBeUM7UUFBdEIscUJBQXNCO1FBQWQsbUJBQWM7UUFBUCxlQUFPOztBQUN2QyxXQUFPLE1BQU0sUUFBTixDQUFnQixjQUFjLEdBQWQsQ0FBaEIsQ0FBUCxDQUR1QztHQUF6Qzs7QUFJQSxjQUFhLEtBQWIsRUFBb0I7QUFDbEIsVUFBTSxLQUFOLEVBRGtCO0dBQXBCOztBQUlBLHNCQUFxQjtBQUNuQixTQUFLLEtBQUwsQ0FBVyxRQUFYLENBQW9CLGNBQWMsU0FBUyxNQUFULENBQWxDLEVBRG1CO0dBQXJCOztBQUlBLFdBQVU7VUFFQSxRQUFVLEtBQUssS0FBTCxDQUFWLE1BRkE7O0FBR1IsUUFBSSxXQUFXLElBQVgsQ0FISTs7QUFLUixhQUFTLElBQVQsQ0FMUTs7QUFPUixlQUNFLE1BQU0sR0FBTixDQUFVLFVBQVUsQ0FBVixFQUFhO0FBQ3JCLGFBQ0U7O1VBQUksS0FBSyxFQUFFLEVBQUYsRUFBVDtRQUNFOztZQUFNLElBQUksQ0FBQyxTQUFELEdBQVksRUFBRSxFQUFGLEVBQUssQ0FBakIsR0FBb0IsRUFBRSxJQUFGLEVBQU8sQ0FBL0IsRUFBTjtVQUNFOztjQUFHLFdBQVcsZUFBTyxJQUFQLEVBQWQ7WUFBNEIsRUFBRSxJQUFGO1dBRDlCO1NBREY7T0FERixDQURxQjtLQUFiLENBRFosQ0FQUTs7QUFtQlIsV0FDRTs7UUFBSyxXQUFXLGVBQU8sSUFBUCxFQUFoQjtNQUNFLHVDQUFLLFdBQVcsZUFBTyxJQUFQLEVBQWhCLENBREY7S0FERixDQW5CUTtHQUFWO0NBZEY7O0FBMENBLFNBQVMsZUFBVCxDQUF5QixLQUF6QixFQUFnQztBQUM5QixVQUFRLEdBQVIsQ0FBWSxLQUFaLEVBRDhCO0FBRTlCLFNBQU87QUFDTCxXQUFPLE1BQU0sS0FBTixJQUFlLENBQUM7QUFDckIsVUFBSSxJQUFKO0FBQ0EsWUFBTSxNQUFOO0tBRm9CLENBQWY7R0FEVCxDQUY4QjtDQUFoQzs7a0JBVWUseUJBQVEsZUFBUixFQUF5QixJQUF6QiIsImZpbGUiOiIyNjMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCdcbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9Ib21lLmNzcydcbmltcG9ydCB7IExpbmsgfSBmcm9tICdyZWFjdC1yb3V0ZXInXG5cbmxldCBmZXRjaFBhY2thZ2VzID0gZnVuY3Rpb24oKSB7XG4gIFxuICBjb25zb2xlLmxvZygnd3RmJyk7XG59XG5cbmNsYXNzIEhvbWUgZXh0ZW5kcyBDb21wb25lbnQge1xuXG4gIHN0YXRpYyBmZXRjaERhdGEoeyBwYXJhbXMsIHN0b3JlLCB1cmwgfSkge1xuICAgIHJldHVybiBzdG9yZS5kaXNwYXRjaCggZmV0Y2hQYWNrYWdlcyh1cmwpIClcbiAgfVxuXG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKVxuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQgKCkge1xuICAgIHRoaXMucHJvcHMuZGlzcGF0Y2goZmV0Y2hQYWNrYWdlcyhsb2NhdGlvbi5vcmlnaW4pKVxuICB9XG5cbiAgcmVuZGVyICgpIHtcblxuICAgIGNvbnN0IHsgc3R1ZmYgfSA9IHRoaXMucHJvcHNcbiAgICBsZXQgcGFja2FnZXMgPSBudWxsXG5cbiAgICBsb2FkZXIgPSBudWxsXG5cbiAgICBwYWNrYWdlcyA9IChcbiAgICAgIHN0dWZmLm1hcChmdW5jdGlvbiAocCkgeyBcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8bGkga2V5PXtwLmlkfT5cbiAgICAgICAgICAgIDxMaW5rIHRvPXtgL3BhY2thZ2UvJHtwLmlkfS8ke3AubmFtZX1gfT5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPXtzdHlsZXMubmFtZX0+e3AubmFtZX08L3A+XG4gICAgICAgICAgICA8L0xpbms+XG4gICAgICAgICAgPC9saT5cbiAgICAgICAgKVxuICAgICAgfSlcbiAgICApXG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5ob21lfT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5saXN0fT5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbn1cblxuZnVuY3Rpb24gbWFwU3RhdGVUb1Byb3BzKHN0YXRlKSB7XG4gIGNvbnNvbGUubG9nKHN0YXRlKVxuICByZXR1cm4geyBcbiAgICBzdHVmZjogc3RhdGUuc3R1ZmYgfHwgW3tcbiAgICAgIGlkOiBcImlkXCIsXG4gICAgICBuYW1lOiBcIm5hbWVcIlxuICAgIH1dXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMpKEhvbWUpXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9jbGllbnQvY29udGFpbmVycy9Ib21lL0hvbWUuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9");

/***/ },

/***/ 264:
/***/ function(module, exports) {

	eval("// removed by extract-text-webpack-plugin//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50L2NvbnRhaW5lcnMvSG9tZS9Ib21lLmNzcz84OTVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6IjI2NC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jbGllbnQvY29udGFpbmVycy9Ib21lL0hvbWUuY3NzXG4gKiogbW9kdWxlIGlkID0gMjY0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9");

/***/ }

});