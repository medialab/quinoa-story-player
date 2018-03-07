'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NotePointer = function NotePointer(_ref, context) {
  var children = _ref.children,
      _ref$noteId = _ref.noteId,
      noteId = _ref$noteId === undefined ? '' : _ref$noteId;

  var notes = context.notes;
  var onNoteContentPointerClick = function onNoteContentPointerClick() {
    return typeof onNoteContentPointerClick === 'function' && context.onNoteContentPointerClick(noteId);
  };
  if (notes) {
    var note = notes[noteId];
    if (note) {
      return _react2.default.createElement(
        'sup',
        { onClick: onNoteContentPointerClick, className: 'note-content-pointer', id: 'note-content-pointer-' + noteId },
        note.finalOrder,
        children
      );
    }
    return null;
  }
  return null;
};

NotePointer.propTypes = {
  children: _propTypes2.default.array,
  noteId: _propTypes2.default.string
};

NotePointer.contextTypes = {
  notes: _propTypes2.default.object,
  onNoteContentPointerClick: _propTypes2.default.func
};

exports.default = NotePointer;