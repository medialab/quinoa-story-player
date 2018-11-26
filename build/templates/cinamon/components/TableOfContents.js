"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TableOfContents = function TableOfContents(_ref) {
  var onClickTitle = _ref.onClickTitle,
      metadata = _ref.metadata,
      toggleIndex = _ref.toggleIndex,
      scrollToElementId = _ref.scrollToElementId,
      toc = _ref.toc;

  return _react2.default.createElement(
    "ul",
    {
      className: "table-of-contents",
      style: {
      } },
    _react2.default.createElement(
      "li",
      { className: "table-of-contents-title-container" },
      _react2.default.createElement(
        "h2",
        {
          className: "table-of-contents-title",
          onClick: onClickTitle },
        metadata.title || 'Quinoa story'
      )
    ),
    toc && toc.map(function (item, index) {
      var onClick = function onClick(e) {
        e.stopPropagation();
        e.preventDefault();
        scrollToElementId(item.key);
        toggleIndex();
      };
      return _react2.default.createElement(
        "li",
        {
          key: index,
          className: 'table-of-contents-item level-' + item.level + (item.active ? ' active' : '') },
        _react2.default.createElement(
          "a",
          {
            className: "table-of-contents-link",
            href: '#' + item.key,
            onClick: onClick },
          _react2.default.createElement(
            "span",
            { className: "link-content" },
            item.text || 'Untitled section'
          )
        )
      );
    })
  );
};

exports.default = TableOfContents;