"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _NotesContainer = _interopRequireDefault(require("../../../components/NotesContainer"));

var _NavFooter = _interopRequireDefault(require("./NavFooter"));

var _misc = require("../../../utils/misc");

var _Renderer = _interopRequireDefault(require("../../../components/Renderer"));

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
 * SectionLayout class for building a garlic-related section react component instances
 */
var SectionLayout =
/*#__PURE__*/
function (_Component) {
  _inherits(SectionLayout, _Component);

  /**
   * constructor
   * @param {object} props - properties given to instance at instanciation
   */
  function SectionLayout(props) {
    var _this;

    _classCallCheck(this, SectionLayout);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SectionLayout).call(this, props));

    _this.getChildContext = function () {
      return {
        // notes are provided to content note pointers through the context
        notes: _this.props.section && _this.props.section.notes,
        onGlossaryMentionClick: _this.onGlossaryMentionClick
      };
    };

    _this.shouldComponentUpdate = function (nextProps) {
      return !!_this.props.section && !!nextProps.section && _this.props.section.id !== nextProps.section.id;
    };

    _this.onGlossaryMentionClick = function (id, event) {
      var navigateTo = _this.context.navigateTo;

      if (event) {
        event.preventDefault();
      }

      navigateTo({
        viewType: 'glossary',
        viewParams: {
          focusOnId: "glossary-mention-backlink-".concat(id)
        }
      }, _this.props.history);
    };

    _this.state = {
      dimensions: undefined,
      initialized: false
    };
    return _this;
  }
  /**
   * Updates data in the context when the state or props change
   */


  _createClass(SectionLayout, [{
    key: "render",

    /**
     * Renders the component
     * @return {ReactElement} component - the component
     */
    value: function render() {
      var _this$props = this.props,
          _this$props$section = _this$props.section,
          section = _this$props$section === void 0 ? {} : _this$props$section,
          onNotePointerClick = _this$props.onNotePointerClick,
          _this$props$notesPosi = _this$props.notesPosition,
          notesPosition = _this$props$notesPosi === void 0 ? 'foot' : _this$props$notesPosi,
          usedDocument = _this$props.usedDocument,
          usedWindow = _this$props.usedWindow,
          prevItem = _this$props.prevItem,
          nextItem = _this$props.nextItem;
      var _this$context$locale = this.context.locale,
          locale = _this$context$locale === void 0 ? {} : _this$context$locale;
      var contents = section.contents,
          _section$metadata = section.metadata,
          metadata = _section$metadata === void 0 ? {} : _section$metadata,
          _section$notesOrder = section.notesOrder,
          notesOrder = _section$notesOrder === void 0 ? [] : _section$notesOrder,
          _section$notes = section.notes,
          notes = _section$notes === void 0 ? {} : _section$notes;
      var title = (0, _misc.capitalize)(locale.notes || 'notes');
      return _react.default.createElement("section", {
        id: "section-container-".concat(section.id),
        className: "section is-level-".concat(
        /*metadata.level + 1*/
        2)
      }, _react.default.createElement("div", {
        className: "section-header"
      }, metadata.title && metadata.title.trim().length && _react.default.createElement("h1", {
        className: "section-title",
        id: section.id
      }, _react.default.createElement("span", {
        className: "section-title--modifier"
      }, metadata.title || '')), metadata && metadata.authors && metadata.authors.length > 0 && metadata.authors.map(function (author) {
        return author.trim();
      }).join(', ')), _react.default.createElement("div", {
        className: "section-body"
      }, _react.default.createElement(_Renderer.default, {
        raw: contents
      })), notesOrder.length > 0 && _react.default.createElement(_NotesContainer.default, {
        notesPosition: notesPosition,
        notes: notesOrder.map(function (id) {
          return notes[id];
        }),
        onNotePointerClick: onNotePointerClick,
        usedDocument: usedDocument,
        usedWindow: usedWindow,
        title: title
      }), _react.default.createElement("div", {
        className: "section-footer"
      }, _react.default.createElement(_NavFooter.default, {
        prevItem: prevItem,
        nextItem: nextItem,
        title: metadata.title
      })));
    }
  }]);

  return SectionLayout;
}(_react.Component);
/**
 * Component's properties types
 */


SectionLayout.propTypes = {
  /**
   * The section data to render
   */
  section: _propTypes.default.shape({
    metadata: _propTypes.default.object,
    contents: _propTypes.default.object,
    notes: _propTypes.default.object
  }).isRequired
};
SectionLayout.contextTypes = {
  dimensions: _propTypes.default.object,
  locale: _propTypes.default.object,
  scrollTop: _propTypes.default.func,
  scrollToElementId: _propTypes.default.func,
  navigateTo: _propTypes.default.func
};
/**
 * Component's context properties provided to children
 */

SectionLayout.childContextTypes = {
  /**
   * notes are provided to content note pointers through the context
   */
  notes: _propTypes.default.object,
  onGlossaryMentionClick: _propTypes.default.func
};
var _default = SectionLayout;
exports.default = _default;