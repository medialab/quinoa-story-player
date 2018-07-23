'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }


var BibliographyWrapper = function BibliographyWrapper(_ref, _ref2) {
  var id = _ref.id,
      title = _ref.title;
  var bibliography = _ref2.bibliography;

  return _react2.default.createElement(
    'section',
    { className: 'references' },
    _react2.default.createElement(
      'h2',
      { id: id },
      title
    ),
    _react2.default.createElement(
      'div',
      null,
      bibliography
    )
  );
};
BibliographyWrapper.propTypes = {};
BibliographyWrapper.contextTypes = {
  bibliography: _propTypes2.default.array
};

exports.default = BibliographyWrapper;