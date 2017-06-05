'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Renderer = require('./Renderer');

var _Renderer2 = _interopRequireDefault(_Renderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SectionLayout = function SectionLayout(_ref) {
  var _ref$section = _ref.section,
      section = _ref$section === undefined ? {} : _ref$section;
  var contents = section.contents,
      metadata = section.metadata;

  return _react2.default.createElement(
    'section',
    { className: 'section' },
    _react2.default.createElement(
      'div',
      { className: 'section-header' },
      metadata && metadata.title && _react2.default.createElement(
        'h2',
        { id: section.id },
        metadata.title
      ),
      metadata && metadata.authors && metadata.authors.length > 0 && metadata.authors.map(function (author) {
        return author;
      })
    ),
    _react2.default.createElement(
      'div',
      { className: 'section-body' },
      _react2.default.createElement(_Renderer2.default, { raw: contents })
    )
  );
};

exports.default = SectionLayout;