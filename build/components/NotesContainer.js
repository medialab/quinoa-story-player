"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _NoteItem = _interopRequireDefault(require("./NoteItem"));

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
 * Retrieves the absolute offset of an element
 * (this avoids to use an additionnal lib such as jquery to handle the operation)
 * (todo: this should be stored in a separate utils file)
 * @param {DOMElement} el - the element to inspect
 * @return {object} offset - the absolute offset of the element
 */
function getOffset(el) {
  var _x = 0;
  var _y = 0;

  while (el && !el.classList.contains('body-wrapper') && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
    _x += el.offsetLeft - el.scrollLeft;
    _y += el.offsetTop - el.scrollTop;
    el = el.offsetParent;
  }

  return {
    top: _y,
    left: _x
  };
}
/**
 * NotesContainer class for building notes container react component instances
 */


var NotesContainer =
/*#__PURE__*/
function (_Component) {
  _inherits(NotesContainer, _Component);

  /**
   * constructor
   * @param {object} props - properties given to instance at instanciation
   */
  function NotesContainer(props) {
    var _this;

    _classCallCheck(this, NotesContainer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(NotesContainer).call(this, props));

    _this.updatePositions = function () {
      // we store the elements to position in the right order
      var components = _this.props.notes.sort(function (a, b) {
        if (a.finalOrder > b.finalOrder) {
          return 1;
        }

        return -1;
      }).map(function (note) {
        var component = _this.props.usedDocument.getElementById('note-content-pointer-' + note.id); // const position = component.getBoundingClientRect();


        var position = getOffset(component);
        return {
          order: note.finalOrder,
          noteId: note.id,
          component: component,
          offsetTop: position.top
        };
      });

      var notesStyles = {};
      var y = 0;
      var prevHeight = 0; // we try to position the elements in front of their pointer
      // stack them if they would overlapp with a previous note
      // (todo: this could be improved)

      for (var index = 0; index < components.length; index++) {
        var component = components[index];
        var wantedHeight = component.offsetTop;

        if (wantedHeight > y + prevHeight) {
          y = wantedHeight;
        } else {
          y = y + prevHeight;
        } // update prevHeight with current component


        var noteItem = _this.notes[component.noteId];
        prevHeight = noteItem.component.offsetHeight; // update note styles

        notesStyles[component.noteId] = {
          top: y,
          position: 'absolute',
          left: 0
        };
      }

      _this.setState({
        notesStyles: notesStyles
      });
    };

    _this.notes = {};
    /**
     * Initial state
     */

    _this.state = {
      /**
       * notesStyles will store a map of styles for each note
       * (keys will be notes ids, values styling objects)
       */
      notesStyles: {}
    };
    return _this;
  }
  /**
   * Executes code after the component was mounted
   */


  _createClass(NotesContainer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      // if notes are displayed side by side with content
      // we have to compute their position after contents were
      // rendered a first time
      if (this.props.notesPosition === 'aside') {
        setTimeout(function () {
          _this2.updatePositions();
        });
      }
    }
    /**
     * Executes code when component receives new properties
     * @param {object} nextProps - the future properties of the component
     */

  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.notesPosition !== nextProps.notesPosition && nextProps.notesPosition === 'aside') {
        this.updatePositions(); // we launch it a second time to wait the height
        // of notes has adjusted to their new container
        // (todo: improve that)

        setTimeout(this.updatePositions);
        setTimeout(this.updatePositions, 1000);
      }
    }
    /**
     * Updates the position of each note according to the notes position option
     * and positions of note pointers if in sideNotes mode
     */

  }, {
    key: "render",

    /**
     * Renders the component
     * @return {ReactElement} component - the component
     */
    value: function render() {
      var _this3 = this;

      var _this$props = this.props,
          id = _this$props.id,
          notes = _this$props.notes,
          onNotePointerClick = _this$props.onNotePointerClick,
          notesPosition = _this$props.notesPosition,
          title = _this$props.title;
      var notesStyles = this.state.notesStyles;
      return _react.default.createElement("div", {
        className: 'notes-container notes-container-position-' + notesPosition
      }, notesPosition !== 'aside' && _react.default.createElement("h2", {
        id: id
      }, title), _react.default.createElement("ol", {
        className: "notes-list"
      }, notes.sort(function (a, b) {
        if (a.finalOrder > b.finalOrder) {
          return 1;
        }

        return -1;
      }).map(function (note, index) {
        var bindRef = function bindRef(noteEl) {
          _this3.notes[note.id] = noteEl;
        };

        return _react.default.createElement(_NoteItem.default, {
          key: index,
          note: note,
          onNotePointerClick: onNotePointerClick,
          ref: bindRef,
          style: _this3.props.notesPosition === 'aside' ? notesStyles[note.id] : {}
        });
      })));
    }
  }]);

  return NotesContainer;
}(_react.Component);
/**
 * Component's properties types
 */


NotesContainer.propTypes = {
  notes: _propTypes.default.array,
  onNotePointerClick: _propTypes.default.func,
  notesPosition: _propTypes.default.oneOf(['aside', 'foot'])
};
var _default = NotesContainer;
exports.default = _default;