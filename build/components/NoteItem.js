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

var _Renderer = require('./Renderer');

var _Renderer2 = _interopRequireDefault(_Renderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NoteItem = function (_Component) {
  (0, _inherits3.default)(NoteItem, _Component);

  function NoteItem(props) {
    (0, _classCallCheck3.default)(this, NoteItem);

    var _this = (0, _possibleConstructorReturn3.default)(this, (NoteItem.__proto__ || (0, _getPrototypeOf2.default)(NoteItem)).call(this, props));

    _this.getChildContext = function () {
      return {
        inNote: true
      };
    };

    return _this;
  }


  (0, _createClass3.default)(NoteItem, [{
    key: 'render',

    value: function render() {
      var _this2 = this;

      var _props = this.props,
          note = _props.note,
          onNotePointerClick = _props.onNotePointerClick,
          _props$style = _props.style,
          style = _props$style === undefined ? {} : _props$style;


      var bindRef = function bindRef(component) {
        _this2.component = component;
      };
      var onClick = function onClick(e) {
        e.stopPropagation();
        onNotePointerClick(note);
      };
      return _react2.default.createElement(
        'li',
        {
          style: style,
          className: 'note-item',
          ref: bindRef,
          id: note.id },
        _react2.default.createElement(
          'span',
          { onClick: onClick, className: 'note-block-pointer', id: 'note-block-pointer-' + note.id },
          note.finalOrder
        ),
        _react2.default.createElement(_Renderer2.default, { raw: note.editorState })
      );
    }
  }]);
  return NoteItem;
}(_react.Component);


NoteItem.propTypes = {
  note: _propTypes2.default.object,
  onNotePointerClick: _propTypes2.default.func,
  style: _propTypes2.default.object
};
NoteItem.childContextTypes = {
  inNote: _propTypes2.default.bool
};

exports.default = NoteItem;