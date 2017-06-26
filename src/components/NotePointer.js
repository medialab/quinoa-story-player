import React from 'react';
import PropTypes from 'prop-types';


const NotePointer = ({
  children,
  noteId = ''
}, context) => {
  const notes = context.notes;
  const onNoteContentPointerClick = () => {
    return typeof onNoteContentPointerClick === 'function' && context.onNoteContentPointerClick(noteId);
  };
  if (notes) {
    const note = notes[noteId];
    if (note) {
      return (
        <sup onClick={onNoteContentPointerClick} className="note-content-pointer" id={'note-content-pointer-' + note.id}>
          {note.order}
          {children}
        </sup>
      );
    }
    return null;
  }
  return null;
};

NotePointer.contextTypes = {
  notes: PropTypes.object,
  onNoteContentPointerClick: PropTypes.func
};

export default NotePointer;
