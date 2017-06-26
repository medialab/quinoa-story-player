import React from 'react';
import PropTypes from 'prop-types';

const CitationContainer = ({
  data,
}, context) => {
  const citations = context.citations;
  const id = data.asset.id;
  if (citations) {
    const citation = citations[id];
    if (citation) {
      const CitComponent = citation.Component;
      return (<cite id={id}>
        {CitComponent}
      </cite>);
    }
    return null;
  }
  return null;
};
CitationContainer.contextTypes = {
  citations: PropTypes.object
};

export default CitationContainer;
