'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Renderer = require('../../../components/Renderer');

var _Renderer2 = _interopRequireDefault(_Renderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SectionLayout = function (_Component) {
  (0, _inherits3.default)(SectionLayout, _Component);

  function SectionLayout(props) {
    (0, _classCallCheck3.default)(this, SectionLayout);

    var _this = (0, _possibleConstructorReturn3.default)(this, (SectionLayout.__proto__ || (0, _getPrototypeOf2.default)(SectionLayout)).call(this, props));

    _this.getChildContext = function () {
      return {
        notes: _this.props.section && _this.props.section.notes
      };
    };

    _this.state = {
      dimensions: undefined
    };
    return _this;
  }


  (0, _createClass3.default)(SectionLayout, [{
    key: 'render',


    value: function render() {
      var _props$section = this.props.section,
          section = _props$section === undefined ? {} : _props$section;
      var contents = section.contents,
          metadata = section.metadata;


      return _react2.default.createElement(
        'section',
        { className: 'section is-level-' + (metadata.level + 1) },
        _react2.default.createElement(
          'div',
          { className: 'section-header' },
          metadata.title && metadata.title.trim().length && _react2.default.createElement(
            'h1',
            { className: 'section-title', id: section.id },
            _react2.default.createElement(
              'span',
              { className: 'section-title--modifier' },
              metadata.title || ''
            )
          ),
          metadata && metadata.authors && metadata.authors.length > 0 && metadata.authors.map(function (author) {
            return author.trim();
          }).join(', ')
        ),
        _react2.default.createElement(
          'div',
          { className: 'section-body' },
          _react2.default.createElement(_Renderer2.default, { raw: contents })
        )
      );
    }
  }]);
  return SectionLayout;
}(_react.Component); 


SectionLayout.contextTypes = {
  dimensions: _propTypes2.default.object
};

SectionLayout.propTypes = {
  section: _propTypes2.default.shape({
    metadata: _propTypes2.default.object,
    contents: _propTypes2.default.object,
    notes: _propTypes2.default.object
  }).isRequired
};

SectionLayout.childContextTypes = {
  notes: _propTypes2.default.object
};
exports.default = SectionLayout;