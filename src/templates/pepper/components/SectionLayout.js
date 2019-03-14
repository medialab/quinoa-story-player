/**
 * This module exports a stateful section layout component
 * for the garlic template
 * ============
 * @module quinoa-story-player/templates/garlic
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tooltip from 'react-tooltip';
import NotesContainer from '../../../components/NotesContainer';
import NavFooter from './NavFooter';
import {
  capitalize
} from '../../../utils/misc';

import Renderer from '../../../components/Renderer';

/**
 * SectionLayout class for building a garlic-related section react component instances
 */
class SectionLayout extends Component {
  /**
   * constructor
   * @param {object} props - properties given to instance at instanciation
   */
  constructor(props) {
    super(props);

    this.state = {
      dimensions: undefined,
      initialized: false
    };
  }

  /**
   * Updates data in the context when the state or props change
   */
  getChildContext = () => {
    return {
      // notes are provided to content note pointers through the context
      notes: this.props.section && this.props.section.notes,
      onGlossaryMentionClick: this.onGlossaryMentionClick,
    };
  }

  shouldComponentUpdate = nextProps => {
    return this.props.section.id !== nextProps.section.id;
  }


  onGlossaryMentionClick = (id, event) => {
    const {
      navigateTo
    } = this.context;
    if (event) {
      event.preventDefault();
    }
    navigateTo({ viewType: 'glossary', viewParams: { focusOnId: `glossary-mention-backlink-${id}` } }, this.props.history);
  }

  /**
   * Renders the component
   * @return {ReactElement} component - the component
   */
  render() {
    const {
      section = {},
      onNotePointerClick,
      notesPosition = 'foot',
      usedDocument,
      usedWindow,
      prevItem,
      nextItem,
    } = this.props;
    const {
      locale = {}
    } = this.context;
    const {
      contents,
      metadata,
    } = section;

    const title = capitalize(locale.notes || 'notes');

    return (
      <section id={`section-container-${section.id}`} className={`section is-level-${metadata.level + 1}`}>
        <div className="section-header">
          {
            metadata.title && metadata.title.trim().length &&
            <h1 className="section-title" id={section.id}>
              <span className="section-title--modifier">{metadata.title || ''}</span>
            </h1>
          }
          {
            metadata &&
            metadata.authors &&
            metadata.authors.length > 0 &&
            metadata.authors.map((author) => author.trim()).join(', ')
          }
        </div>
        <div className="section-body">
          <Renderer raw={contents} />
        </div>
        {section.notesOrder.length > 0 &&
          <NotesContainer
            notesPosition={notesPosition}
            notes={section.notesOrder.map(id => section.notes[id])}
            onNotePointerClick={onNotePointerClick}
            usedDocument={usedDocument}
            usedWindow={usedWindow}
            title={title} />
        }
        <div className="section-footer">
          <NavFooter
            prevItem={prevItem}
            nextItem={nextItem}
            title={metadata.title} />
        </div>
        <Tooltip id="tooltip" effect="solid" />
      </section>
    );
  }
}

/**
 * Component's properties types
 */
SectionLayout.propTypes = {
  /**
   * The section data to render
   */
  section: PropTypes.shape({
    metadata: PropTypes.object,
    contents: PropTypes.object,
    notes: PropTypes.object
  }).isRequired,
};


SectionLayout.contextTypes = {
  dimensions: PropTypes.object,
  locale: PropTypes.object,
  scrollTop: PropTypes.func,
  scrollToElementId: PropTypes.func,
  navigateTo: PropTypes.func,
};

/**
 * Component's context properties provided to children
 */
SectionLayout.childContextTypes = {
  /**
   * notes are provided to content note pointers through the context
   */
  notes: PropTypes.object,
  onGlossaryMentionClick: PropTypes.func,
};
export default SectionLayout;
