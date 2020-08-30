"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TocItem = function TocItem(_ref) {
  var item = _ref.item,
      InternalLinkProvider = _ref.InternalLinkProvider,
      toggleIndex = _ref.toggleIndex;
  return _react.default.createElement("li", {
    className: 'table-of-contents-item level-' + (item.level || 0) + (item.active ? ' active' : '')
  }, _react.default.createElement("div", {
    className: "table-of-contents-item-contents background-color--modifier",
    onClick: function onClick() {
      return toggleIndex(false);
    }
  }, _react.default.createElement(InternalLinkProvider, {
    className: 'table-of-contents-link',
    to: {
      viewType: item.viewType,
      viewParams: item.viewParams
    }
  }, _react.default.createElement("span", {
    className: 'section-title-color--modifier'
  }, _react.default.createElement("span", {
    className: "link-content"
  }, item.title || 'Untitled section')))), item.children ? _react.default.createElement("ul", {
    className: "toc-children-container"
  }, item.children.map(function (item2, index) {
    return _react.default.createElement(TocItem, {
      toggleIndex: toggleIndex,
      key: index,
      InternalLinkProvider: InternalLinkProvider,
      item: item2
    });
  })) : null);
};

var TableOfContents = function TableOfContents(_ref2, _ref3) {
  var metadata = _ref2.metadata,
      toggleIndex = _ref2.toggleIndex,
      toc = _ref2.toc;
  var InternalLinkProvider = _ref3.InternalLinkProvider;
  return _react.default.createElement("ul", {
    className: "table-of-contents background-color--modifier",
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
    return _react.default.createElement(TocItem, {
      key: index,
      toggleIndex: toggleIndex,
      InternalLinkProvider: InternalLinkProvider,
      item: item
    });
  }));
};

TableOfContents.contextTypes = {
  InternalLinkProvider: _propTypes.default.func
};
var _default = TableOfContents;
exports.default = _default;