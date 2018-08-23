/**
 * This module exports a stateless reusable block asset wrapper component
 * It retrieves citation data for a specific asset id in the context's citation data
 * ============
 * @module quinoa-story-player/components/CitationContainer
 */
import React from 'react';
import PropTypes from 'prop-types';
/**
 * Renders a citation container as a pure component
 * @param {object} props
 * @param {object} props.data - the data initially embedded in a draft-js entity
 * @param {object} context - the context data passed to the component
 * @return {ReactElement} component - the component
 */
const CitationContainer = ({
  data,
}, context) => {
  const citations = context.citations;
  const id = data.asset.id;
  if (citations) {
    const citation = citations[id];
    if (citation) {
      const CitComponent = citation.Component;
      return (
        <cite className="quinoa-contextualization inline bib" id={id}>
          {CitComponent}
        </cite>
      );
    }
    return null;
  }
  return null;
};
/**
 * Component's properties types
 */
CitationContainer.propTypes = {
  /**
   * Corresponds to the data initially embedded in a draft-js entity
   */
  data: PropTypes.shape({
    asset: PropTypes.shape({
      id: PropTypes.string
    })
  })
};
/**
 * Component's context used properties
 */
CitationContainer.contextTypes = {
  /**
   * Map of citations built upstream
   * (each citation features the following keys: 'Component', 'html' and 'order')
   */
  citations: PropTypes.object
};

export default CitationContainer;
