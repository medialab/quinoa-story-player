"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRouterDom = require("react-router-dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InternalLinkProvider = function InternalLinkProvider(_ref, _ref2) {
  var children = _ref.children,
      _ref$className = _ref.className,
      className = _ref$className === void 0 ? '' : _ref$className,
      _ref$to = _ref.to,
      to = _ref$to === void 0 ? {
    viewParams: {}
  } : _ref$to;
  var previewMode = _ref2.previewMode,
      navigateTo = _ref2.navigateTo,
      _ref2$activeView = _ref2.activeView,
      activeView = _ref2$activeView === void 0 ? {
    viewType: 'home',
    viewParams: {}
  } : _ref2$activeView;
  var _to$viewParams = to.viewParams,
      viewParams = _to$viewParams === void 0 ? {} : _to$viewParams,
      _to$viewType = to.viewType,
      viewType = _to$viewType === void 0 ? 'home' : _to$viewType;

  if (previewMode) {
    var handleClick = function handleClick() {
      navigateTo(to);
    };

    var isActive = activeView.viewType === viewType && Object.keys(viewParams).filter(function (paramKey) {
      return viewParams[paramKey] !== activeView.viewParams[paramKey];
    }).length === 0;
    return _react.default.createElement("span", {
      onClick: handleClick,
      className: "internal-link ".concat(className, " ").concat(isActive ? 'active' : '')
    }, children);
  }

  var target;

  switch (viewType) {
    case 'section':
      target = "/sections/".concat(viewParams.sectionId).concat(viewParams.focusOnId ? "?focusOnId=".concat(viewParams.focusOnId) : '');
      break;

    case 'notes':
    case 'references':
    case 'glossary':
    case 'home':
    default:
      target = "/".concat(viewType, "/");
      break;
  }

  return _react.default.createElement(_reactRouterDom.NavLink, {
    to: target,
    activeClassName: "active",
    className: className
  }, children);
};

InternalLinkProvider.contextTypes = {
  navigateTo: _propTypes.default.func,
  previewMode: _propTypes.default.bool,
  activeView: _propTypes.default.object
};
var _default = InternalLinkProvider;
exports.default = _default;