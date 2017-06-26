/* eslint react/forbid-prop-types:0 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Renderer from './Renderer';

class NoteItem extends Component {

  constructor(props) {
    super(props);
  }

  getChildContext = () => {
    return {
      inNote: true,
    };
  }

  render() {
    const {
      note,
      onNotePointerClick,
      style = {},
    } = this.props;

    const bindRef = component => {
      this.component = component;
    };
    const onClick = e => {
      e.stopPropagation();
      onNotePointerClick(note);
    };
    return (
      <li
        style={style}
        className="note-item"
        ref={bindRef}
        id={note.id}>
        <span onClick={onClick} className="note-block-pointer" id={'note-block-pointer-' + note.id}>
          {note.finalOrder}
        </span>
        <Renderer raw={note.editorState} />
      </li>
    );
  }
}

NoteItem.propTypes = {
  note: PropTypes.object,
  onNotePointerClick: PropTypes.func,
};

NoteItem.childContextTypes = {
  inNote: PropTypes.bool
};

export default NoteItem;
