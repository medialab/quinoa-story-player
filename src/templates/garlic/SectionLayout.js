/**
 * This module exports a stateful section layout component
 * for the garlic template
 * ============
 * @module quinoa-story-player/templates/garlic
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Renderer from '../../components/Renderer';

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
      dimensions: undefined
    };
  }
  /**
   * Updates data in the context when the state or props change
   */
  getChildContext = () => {
    return {
      // notes are provided to content note pointers through the context
      notes: this.props.section && this.props.section.notes
    };
  }

  /**
   * Renders the component
   * @return {ReactElement} component - the component
   */
  render() {
    const {
      section = {}
    } = this.props;
    const {
      contents,
      metadata,
    } = section;

    return (
      <section className={`section is-level-${metadata.level + 1}`}>
        <div className="section-header">
          <h1 className="section-title" id={section.id}>{metadata.title || ''}</h1>
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
      </section>
    );
  }
}

SectionLayout.contextTypes = {
  dimensions: PropTypes.object
};

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

/**
 * Component's context properties provided to children
 */
SectionLayout.childContextTypes = {
  /**
   * notes are provided to content note pointers through the context
   */
  notes: PropTypes.object,
};
export default SectionLayout;
