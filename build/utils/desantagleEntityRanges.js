'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var raw = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _extends3.default)({}, raw, {
    blocks: raw.blocks ? raw.blocks.map(function (block) {
      return (0, _extends3.default)({}, block, {
        entityRanges: (0, _lodash.uniqBy)(block.entityRanges, function (e) {
          return e.key;
        })
      });
    }) : []
  });
};