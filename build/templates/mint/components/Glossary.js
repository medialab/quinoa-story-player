"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _misc = require("../../../utils/misc");

var _NavFooter = _interopRequireDefault(require("./NavFooter"));

var _InternalLinkProvider = _interopRequireDefault(require("./InternalLinkProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Glossary = function Glossary(_ref) {
  var locale = _ref.locale,
      glossary = _ref.glossary,
      prevItem = _ref.prevItem,
      nextItem = _ref.nextItem;
  var title = (0, _misc.capitalize)(locale.glossary || 'glossary');
  return _react.default.createElement("div", {
    className: "glossary-container"
  }, _react.default.createElement("h1", {
    className: "glossary-title section-title",
    id: "glossary"
  }, _react.default.createElement("span", {
    className: "section-title--modifier"
  }, title)), _react.default.createElement("ul", {
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
      return _react.default.createElement(_InternalLinkProvider.default, {
        key: mention.id,
        className: "glossary-mention-backlink",
        id: 'glossary-mention-backlink-' + mention.id,
        to: {
          viewType: 'section',
          viewParams: {
            sectionId: mention.sectionId,
            focusOnId: "glossary-mention-".concat(mention.id)
          }
        }
      }, count + 1);
    }).reduce(function (prev, curr) {
      return [prev, ', ', curr];
    }), ")")), entry.resource.data.description && _react.default.createElement("p", null, entry.resource.data.description));
  })), _react.default.createElement("div", {
    className: "section-footer"
  }, _react.default.createElement(_NavFooter.default, {
    prevItem: prevItem,
    nextItem: nextItem,
    title: title
  })));
};

var _default = Glossary;
exports.default = _default;