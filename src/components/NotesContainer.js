/**
 * This module exports a statefull reusable notes container component
 * When notes are displayed as footnotes it displays them as stacked blocks.
 * When notes are displayed as sidenotes it tries to align them with
 * their pointer, and handles the overflows by stacking them.
 * ============
 * @module quinoa-story-player/components/NotesContainer
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import NoteItem from './NoteItem';

/**
 * Retrieves the absolute offset of an element
 * (this avoids to use an additionnal lib such as jquery to handle the operation)
 * (todo: this should be stored in a separate utils file)
 * @param {DOMElement} el - the element to inspect
 * @return {object} offset - the absolute offset of the element
 */
function getOffset(el) {
    let _x = 0;
    let _y = 0;
    while (el && !el.classList.contains('body-wrapper') && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return {top: _y, left: _x};
}


/**
 * NotesContainer class for building notes container react component instances
 */
class NotesContainer extends Component {
  /**
   * constructor
   * @param {object} props - properties given to instance at instanciation
   */
  constructor(props) {
    super(props);
    this.notes = {};
    /**
     * Initial state
     */
    this.state = {
      /**
       * notesStyles will store a map of styles for each note
       * (keys will be notes ids, values styling objects)
       */
      notesStyles: {}
    };
  }

  /**
   * Executes code after the component was mounted
   */
  componentDidMount() {
    // if notes are displayed side by side with content
    // we have to compute their position after contents were
    // rendered a first time
    if (this.props.notesPosition === 'aside') {
      setTimeout(() => {
        this.updatePositions();
      });
    }
  }

  /**
   * Executes code when component receives new properties
   * @param {object} nextProps - the future properties of the component
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.notesPosition !== nextProps.notesPosition && nextProps.notesPosition === 'aside') {
      this.updatePositions();
      // we launch it a second time to wait the height
      // of notes has adjusted to their new container
      // (todo: improve that)
      setTimeout(this.updatePositions);
    }
  }

  /**
   * Updates the position of each note according to the notes position option
   * and positions of note pointers if in sideNotes mode
   */
  updatePositions = () => {
    // we store the elements to position in the right order
    const components = this.props.notes
      .sort((a, b) => {
        if (a.finalOrder > b.finalOrder) {
          return 1;
        }
        return -1;
      })
      .map(note => {
        const component = document.getElementById('note-content-pointer-' + note.id);
        // const position = component.getBoundingClientRect();
        const position = getOffset(component);
        return {
          order: note.finalOrder,
          noteId: note.id,
          component,
          offsetTop: position.top,
        };
      });

    const notesStyles = {};
    let y = 0;
    let prevHeight = 0;

    // we try to position the elements in front of their pointer
    // stack them if they would overlapp with a previous note
    // (todo: this could be improved)
    for (let index = 0; index < components.length; index ++) {
      const component = components[index];
      const wantedHeight = component.offsetTop;
      if (wantedHeight > y + prevHeight) {
        y = wantedHeight;
      }
      else {
        y = y + prevHeight + 10;
      }
      // update prevHeight with current component
      const noteItem = this.notes[component.noteId];
      prevHeight = noteItem.component.offsetHeight;
      // update note styles
      notesStyles[component.noteId] = {
        top: y,
        position: 'absolute',
        left: 0
      };
    }
    this.setState({notesStyles});
  }
  /**
   * Renders the component
   * @return {ReactElement} component - the component
   */
  render () {
    const {
      notes,
      onNotePointerClick,
      notesPosition
    } = this.props;

    const {
      notesStyles
    } = this.state;

    return (
      <div className={'notes-container notes-container-position-' + notesPosition}>
        {notesPosition !== 'aside' && <h3>Notes</h3>}
        <ol className="notes-list">
          {
            notes
            .sort((a, b) => {
              if (a.finalOrder > b.finalOrder) {
                return 1;
              }
              return -1;
            })
            .map((note) => {
              const bindRef = noteEl => {
                this.notes[note.id] = noteEl;
              };
              return (
                <NoteItem
                  key={note.finalOrder}
                  note={note}
                  onNotePointerClick={onNotePointerClick}
                  ref={bindRef}
                  style={this.props.notesPosition === 'aside' ? notesStyles[note.id] : {}} />
              );
            })
          }
        </ol>
      </div>
      );

  }
}

/**
 * Component's properties types
 */
NotesContainer.propTypes = {
  notes: PropTypes.array,
  onNotePointerClick: PropTypes.func,
  notesPosition: PropTypes.oneOf(['aside', 'foot'])
};

export default NotesContainer;
