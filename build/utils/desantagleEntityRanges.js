"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uniqBy = _interopRequireDefault(require("lodash/uniqBy"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = function _default() {
  var raw = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return _objectSpread({}, raw, {
    blocks: raw.blocks ? raw.blocks.map(function (block) {
      return _objectSpread({}, block, {
        entityRanges: (0, _uniqBy.default)(block.entityRanges, function (e) {
          return e.key;
        })
      });
    }) : []
  });
};

exports.default = _default;