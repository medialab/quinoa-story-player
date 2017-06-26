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

var _NoteItem = require('./NoteItem');

var _NoteItem2 = _interopRequireDefault(_NoteItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getOffset(el) {
  var _x = 0;
  var _y = 0;
  while (el && !el.classList.contains('body-wrapper') && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
    _x += el.offsetLeft - el.scrollLeft;
    _y += el.offsetTop - el.scrollTop;
    el = el.offsetParent;
  }
  return { top: _y, left: _x };
}

var NotesContainer = function (_Component) {
  (0, _inherits3.default)(NotesContainer, _Component);

  function NotesContainer(props) {
    (0, _classCallCheck3.default)(this, NotesContainer);

    var _this = (0, _possibleConstructorReturn3.default)(this, (NotesContainer.__proto__ || (0, _getPrototypeOf2.default)(NotesContainer)).call(this, props));

    _this.updatePositions = function () {
      var components = _this.props.notes.sort(function (a, b) {
        if (a.finalOrder > b.finalOrder) {
          return 1;
        }
        return -1;
      }).map(function (note) {
        var component = document.getElementById('note-content-pointer-' + note.id);
        // const position = component.getBoundingClientRect();
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
      var prevHeight = 0;

      for (var index = 0; index < components.length; index++) {
        var component = components[index];
        var wantedHeight = component.offsetTop;
        // console.log(index, 'y', y, 'wantedHeight', wantedHeight);
        if (wantedHeight > y + prevHeight) {
          y = wantedHeight;
        } else {
          y = y + prevHeight + 10;
        }
        // update prevHeight with current component
        var noteItem = _this.notes[component.noteId];
        prevHeight = noteItem.component.offsetHeight;
        // update note styles
        notesStyles[component.noteId] = {
          top: y,
          position: 'absolute',
          left: 0
        };
      }
      _this.setState({ notesStyles: notesStyles });
    };

    _this.notes = {};
    _this.state = {
      notesStyles: {}
    };
    return _this;
  }

  (0, _createClass3.default)(NotesContainer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      if (this.props.notesPosition === 'aside') {
        setTimeout(function () {
          _this2.updatePositions();
        }, 1);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps() {
      if (this.props.notesPosition === 'aside') {
        this.updatePositions();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          notes = _props.notes,
          onNotePointerClick = _props.onNotePointerClick,
          notesPosition = _props.notesPosition;
      var notesStyles = this.state.notesStyles;


      return _react2.default.createElement(
        'div',
        { className: 'notes-container notes-container-position-' + notesPosition },
        notesPosition !== 'aside' && _react2.default.createElement(
          'h3',
          null,
          'Notes'
        ),
        _react2.default.createElement(
          'ol',
          { className: 'notes-list' },
          notes.sort(function (a, b) {
            if (a.finalOrder > b.finalOrder) {
              return 1;
            }
            return -1;
          }).map(function (note) {
            var bindRef = function bindRef(noteEl) {
              _this3.notes[note.id] = noteEl;
            };
            return _react2.default.createElement(_NoteItem2.default, {
              key: note.finalOrder,
              note: note,
              onNotePointerClick: onNotePointerClick,
              ref: bindRef,
              style: notesStyles[note.id] });
          })
        )
      );
    }
  }]);
  return NotesContainer;
}(_react.Component);

exports.default = NotesContainer;