'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectDestructuringEmpty2 = require('babel-runtime/helpers/objectDestructuringEmpty');

var _objectDestructuringEmpty3 = _interopRequireDefault(_objectDestructuringEmpty2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Bib = function Bib(_ref, _ref2) {
  var bibliography = _ref2.bibliography;
  (0, _objectDestructuringEmpty3.default)(_ref);

  return _react2.default.createElement(
    'section',
    { className: 'references' },
    _react2.default.createElement(
      'h2',
      null,
      'References'
    ),
    _react2.default.createElement(
      'div',
      null,
      bibliography
    )
  );
};

Bib.contextTypes = {
  bibliography: _propTypes2.default.object
};

exports.default = Bib;