/**
 * This module exports a stateless reusable inline asset wrapper component
 * It handles the connection to context's data and builds proper data to render the asset
 * ============
 * @module quinoa-story-player/components/InlineAssetWrapper
 */
import React from 'react';
import PropTypes from 'prop-types';
// import CitationContainer from './CitationContainer';
// import GlossaryMention from './GlossaryMention';
import { Inline as GlossaryMention } from '../contextualizers/glossary';
import { Inline as CitationContainer } from '../contextualizers/bib';
import { Inline as Link } from '../contextualizers/webpage';

/**
 * Renders a block asset wrapper as a pure component
 * @param {object} props
 * @param {object} props.data - the data initially embedded in a draft-js entity
 * @param {object} context - the context data passed to the component
 * @return {ReactElement} component - the component
 */
const InlineAssetWrapper = ({
  data,
  children
}, context) => {
  const { story } = context;
  const assetId = data.asset && data.asset.id;
  if (!assetId || !story) {
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

    switch (contextualizerType) {
      case 'bib':
        return <CitationContainer resource={resource} data={data} />;
      case 'glossary':
        const onGlossaryClick = () => {
          if (typeof context.onGlossaryMentionClick === 'function') {
            context.onGlossaryMentionClick(assetId);
          }
        };
        return (
          <GlossaryMention
            onClick={onGlossaryClick}
            contextualization={contextualization}
            contextualizer={contextualizer}
            resource={resource}>
            {children}
          </GlossaryMention>
          );
      case 'webpage':
        // const text = contextualizer.alias || resource.metadata.title || '*';
        return (
          <Link resource={resource}>
            {children}
          </Link>
        );
      default:
        return null;
    }
  }
  return null;
};

/**
 * Component's properties types
 */
InlineAssetWrapper.propTypes = {
  /**
   * Corresponds to the data initially embedded in a draft-js entity
   */
  data: PropTypes.shape({
    asset: PropTypes.shape({
      id: PropTypes.string
    })
  }),
};
/**
 * Component's context used properties
 */
InlineAssetWrapper.contextTypes = {
  story: PropTypes.object,
  /**
   * Callbacks when a glossary mention is clicked
   */
  onGlossaryMentionClick: PropTypes.func,
};

export default InlineAssetWrapper;
