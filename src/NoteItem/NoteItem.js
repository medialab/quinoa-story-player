/* eslint react/forbid-prop-types:0 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Renderer from '../Renderer';

import './NoteItem.scss';

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
    } = this.props;
    return (
      <li className="story-player-NoteItem">
        <span onClick={onNotePointerClick} className="note-block-pointer" id={'note-block-pointer-' + note.id}>
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
