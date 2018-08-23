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
        var component = _this.props.usedDocument.getElementById('note-content-pointer-' + note.id);
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
        if (wantedHeight > y + prevHeight) {
          y = wantedHeight;
        } else {
          y = y + prevHeight;
        }
        var noteItem = _this.notes[component.noteId];
        prevHeight = noteItem.component.offsetHeight;
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
        });
      }
    }


  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.notesPosition !== nextProps.notesPosition && nextProps.notesPosition === 'aside') {
        this.updatePositions();
        setTimeout(this.updatePositions);
        setTimeout(this.updatePositions, 1000);
      }
    }


  }, {
    key: 'render',

    value: function render() {
      var _this3 = this;

      var _props = this.props,
          id = _props.id,
          notes = _props.notes,
          onNotePointerClick = _props.onNotePointerClick,
          notesPosition = _props.notesPosition,
          title = _props.title;
      var notesStyles = this.state.notesStyles;


      return _react2.default.createElement(
        'div',
        { className: 'notes-container notes-container-position-' + notesPosition },
        notesPosition !== 'aside' && _react2.default.createElement(
          'h2',
          { id: id },
          title
        ),
        _react2.default.createElement(
          'ol',
          { className: 'notes-list' },
          notes.sort(function (a, b) {
            if (a.finalOrder > b.finalOrder) {
              return 1;
            }
            return -1;
          }).map(function (note, index) {
            var bindRef = function bindRef(noteEl) {
              _this3.notes[note.id] = noteEl;
            };
            return _react2.default.createElement(_NoteItem2.default, {
              key: index,
              note: note,
              onNotePointerClick: onNotePointerClick,
              ref: bindRef,
              style: _this3.props.notesPosition === 'aside' ? notesStyles[note.id] : {} });
          })
        )
      );
    }
  }]);
  return NotesContainer;
}(_react.Component);



NotesContainer.propTypes = {
  notes: _propTypes2.default.array,
  onNotePointerClick: _propTypes2.default.func,
  notesPosition: _propTypes2.default.oneOf(['aside', 'foot'])
};

exports.default = NotesContainer;