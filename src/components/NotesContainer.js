import React, {Component} from 'react';

import NoteItem from './NoteItem';

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


class NotesContainer extends Component {
  constructor(props) {
    super(props);
    this.notes = {};
    this.state = {
      notesStyles: {}
    };
  }

  componentDidMount() {
    if (this.props.notesPosition === 'aside') {
      setTimeout(() => {
        this.updatePositions();
      }, 1);
    }
  }
  componentWillReceiveProps() {
    if (this.props.notesPosition === 'aside') {
      this.updatePositions();
    }
  }

  updatePositions = () => {
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

    for (let index = 0; index < components.length; index ++) {
      const component = components[index];
      const wantedHeight = component.offsetTop;
      // console.log(index, 'y', y, 'wantedHeight', wantedHeight);
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
                  style={notesStyles[note.id]} />
              );
            })
          }
        </ol>
      </div>
      );

  }
}
export default NotesContainer;
