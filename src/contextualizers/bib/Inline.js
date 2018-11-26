/**
 * This module exports a stateless reusable block asset wrapper component
 * It retrieves citation data for a specific asset id in the context's citation data
 * ============
 * @module quinoa-story-player/components/CitationContainer
 */
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import PropTypes from 'prop-types';
import { Bibliography } from 'react-citeproc';
/**
 * Renders a citation container as a pure component
 * @param {object} props
 * @param {object} props.data - the data initially embedded in a draft-js entity
 * @param {object} context - the context data passed to the component
 * @return {ReactElement} component - the component
 */
const CitationContainer = ({
  data,
  resource
}, context) => {
  const {
    citations,
    citationStyle,
    citationLocale,
  } = context;
  const id = data.asset.id;
  if (citations) {
    const citation = citations[id];
    if (citation) {
      const CitComponent = citation.Component;
      const minCit = {
        [resource.data[0].id]: resource.data[0]
      };
      const Bib = <Bibliography items={minCit} style={citationStyle} locale={citationLocale} />;
      return (
        <cite
          className="quinoa-contextualization inline bib"
          data-for="tooltip"
          data-html
          data-tip={renderToStaticMarkup(Bib)}
          id={id}>
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
  citations: PropTypes.object,

  citationStyle: PropTypes.string,
  citationLocale: PropTypes.string,
};

export default CitationContainer;
