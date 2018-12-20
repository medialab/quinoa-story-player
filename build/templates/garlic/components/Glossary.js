"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _misc = require("../../../utils/misc");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Glossary = function Glossary(_ref) {
  var locale = _ref.locale,
      glossary = _ref.glossary,
      scrollToElementId = _ref.scrollToElementId;
  return _react.default.createElement("div", {
    className: "glossary-container"
  }, _react.default.createElement("h2", {
    className: "glossary-title",
    id: "glossary"
  }, (0, _misc.capitalize)(locale.glossary || 'glossary')), _react.default.createElement("ul", {
    className: "glossary-mentions-container"
  }, glossary.sort(function (a, b) {
    if (a.resource.data.name > b.resource.data.name) {
      return 1;
    }

    return -1;
  }).map(function (entry, index) {
    var entryName = entry.resource.data.name;
    return _react.default.createElement("li", {
      className: "glossary-entry",
      key: index,
      id: 'glossary-entry-' + entry.resource.id
    }, _react.default.createElement("h3", {
      className: "glossary-entry-title"
    }, entryName, " ", _react.default.createElement("i", null, "(", entry.mentions.map(function (mention, count) {
      var target = 'glossary-mention-' + mention.id;

      var onClick = function onClick(e) {
        e.preventDefault();
        scrollToElementId(target);
      };

      return _react.default.createElement("a", {
        key: mention.id,
        onClick: onClick,
        className: "glossary-mention-backlink",
        id: 'glossary-mention-backlink-' + mention.id,
        href: '#' + target
      }, _react.default.createElement("span", {
        className: "link-content"
      }, count + 1));
    }).reduce(function (prev, curr) {
      return [prev, ', ', curr];
    }), ")")), entry.resource.data.description && _react.default.createElement("p", null, entry.resource.data.description));
  })));
};

var _default = Glossary;
exports.default = _default;