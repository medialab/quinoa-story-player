import React from 'react';
import PropTypes from 'prop-types';
import CitationContainer from './CitationContainer';
import GlossaryMention from './GlossaryMention';


const InlineAssetWrapper = ({
  data
}, context) => {
  const {story} = context;
  const assetId = data.asset && data.asset.id;
  if (!assetId || !story) {
    return null;
  }
  const contextualization = story.contextualizations[assetId];
  if (!contextualization) {
    return null;
  }
  const contextualizer = story.contextualizers[contextualization.contextualizerId];
  if (contextualizer) {
    const contextualizerType = contextualizer.type;
    const resource = story.resources[contextualization.resourceId];

    switch(contextualizerType) {
      case 'bib':
        return <CitationContainer data={data} />;
      case 'glossary':
        return <GlossaryMention contextualization={contextualization} contextualizer={contextualizer} resource={resource} />
      default:
        return null;
    }
  }
  return null;
};

InlineAssetWrapper.contextTypes = {
  story: PropTypes.object
}


export default InlineAssetWrapper;