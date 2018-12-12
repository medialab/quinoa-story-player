"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Info = function Info(_ref) {
  var message = _ref.message,
      _ref$place = _ref.place,
      place = _ref$place === void 0 ? 'right' : _ref$place;
  return _react.default.createElement("span", {
    className: "info-pill",
    "data-for": "tooltip",
    "data-html": true,
    "data-tip": message,
    "data-effect": 'float',
    "data-place": place
  }, "i");
};

var _default = Info;
exports.default = _default;