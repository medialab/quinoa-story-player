"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Renderer = _interopRequireDefault(require("./Renderer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * NoteItem class for building NoteItem react component instances
 */
var NoteItem =
/*#__PURE__*/
function (_Component) {
  _inherits(NoteItem, _Component);

  /**
   * constructor
   * @param {object} props - properties given to instance at instanciation
   */
  function NoteItem(props) {
    var _this;

    _classCallCheck(this, NoteItem);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(NoteItem).call(this, props));

    _this.getChildContext = function () {
      return {
        inNote: true
      };
    };

    return _this;
  }
  /**
   * Updates data in the context when the state or props change
   */


  _createClass(NoteItem, [{
    key: "render",

    /**
     * Renders the component
     * @return {ReactElement} component - the component
     */
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          note = _this$props.note,
          onNotePointerClick = _this$props.onNotePointerClick,
          _this$props$style = _this$props.style,
          style = _this$props$style === void 0 ? {} : _this$props$style;

      var bindRef = function bindRef(component) {
        _this2.component = component;
      };

      var onClick = function onClick(e) {
        e.stopPropagation();
        onNotePointerClick(note);
      };

      return _react.default.createElement("li", {
        style: style,
        className: "note-item",
        ref: bindRef,
        id: note.id
      }, _react.default.createElement("span", {
        onClick: onClick,
        className: "note-block-pointer",
        id: 'note-block-pointer-' + note.id
      }, note.finalOrder), _react.default.createElement(_Renderer.default, {
        raw: note.contents
      }));
    }
  }]);

  return NoteItem;
}(_react.Component);
/**
 * Component's properties types
 */


NoteItem.propTypes = {
  note: _propTypes.default.object,
  onNotePointerClick: _propTypes.default.func,
  style: _propTypes.default.object
};
/**
 * Component's context properties provided to children
 */

NoteItem.childContextTypes = {
  /**
   * Specifies that context is a note for all
   * assets displayed in this note
   */
  inNote: _propTypes.default.bool
};
var _default = NoteItem;
exports.default = _default;