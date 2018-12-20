"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.templates = void 0;

var _Player = _interopRequireDefault(require("./Player"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * quinoa-story-player entry point
 * ============
 * exports a component + templates metadata of the lib
 */
// informations about the templates that the module is able to provide
var templateInfo = [require('./templates/garlic/info')]; // templates info are accessible as an array of objects

var templates = templateInfo;
/**
 * Default export is a react component
**/

exports.templates = templates;
var _default = _Player.default;
exports.default = _default;