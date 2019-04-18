"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TableOfContents = function TableOfContents(_ref, _ref2) {
  var metadata = _ref.metadata,
      _ref$inHeader = _ref.inHeader,
      inHeader = _ref$inHeader === void 0 ? false : _ref$inHeader,
      toc = _ref.toc;
  var InternalLinkProvider = _ref2.InternalLinkProvider;
  return _react.default.createElement("ul", {
    className: "table-of-contents",
    style: {// marginTop: inCover ? 0 : '2em'
    }
  }, metadata && _react.default.createElement("li", {
    className: "table-of-contents-title-container"
  }, _react.default.createElement("h2", {
    className: 'table-of-contents-title'
  }, _react.default.createElement(InternalLinkProvider, {
    to: {
      viewId: 'home'
    }
  }, _react.default.createElement("span", {
    className: "section-title-color--modifier"
  }, metadata.title || 'Quinoa story')))), toc && toc.map(function (item, index) {
    return _react.default.createElement("li", {
      key: index,
      className: 'table-of-contents-item level-' + (item.level || 0) + (item.active ? ' active' : '')
    }, _react.default.createElement(InternalLinkProvider, {
      className: 'table-of-contents-link',
      to: {
        viewType: item.viewType,
        viewParams: item.viewParams
      }
    }, _react.default.createElement("span", {
      className: inHeader ? 'header-item-color--modifier' : 'section-title-color--modifier'
    }, _react.default.createElement("span", {
      className: "link-content"
    }, item.title || 'Untitled section'))));
  }));
};

TableOfContents.contextTypes = {
  InternalLinkProvider: _propTypes.default.func
};
var _default = TableOfContents;
exports.default = _default;