"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(_ref) {
  var resource = _ref.resource;
  return _react.default.createElement("div", {
    className: "quinoa-contextualization block embed embed-container",
    dangerouslySetInnerHTML: {
      __html: resource.data.html
      /* eslint react/no-danger : 0 */

    }
  });
};

exports.default = _default;