/**
 * This module exports a stateless reusable block asset wrapper component
 * It handles the connection to context's data and builds proper data to render the asset
 * ============
 * @module quinoa-story-player/components/BlockAssetWrapper
 */
import React from 'react';
import PropTypes from 'prop-types';

import BlockAssetPlayer from './BlockAssetPlayer';

/**
 * Renders a block asset wrapper as a pure component
 * @param {object} props
 * @param {object} props.data - the data initially embedded in a draft-js entity
 * @param {object} context - the context data passed to the component
 * @return {ReactElement} component - the component
 */
const BlockAssetWrapper = ({
  data
}, context) => {
  const assetId = data.asset.id;
  const contextualization = context.story && context.story.contextualizations && context.story.contextualizations[assetId];
  if (!contextualization) {
    return null;
  }
  const asset = {
    ...contextualization,
    contextualizer: context.story.contextualizers[contextualization.contextualizerId],
    resource: context.story.resources[contextualization.resourceId],
  };
  const dimensions = context.dimensions;
  const fixedPresentationId = context.fixedPresentationId;
  const onExit = context.onExit;
  const inNote = context.inNote;
  if (asset && asset.resource.data) {
    const resource = asset.resource;
    const assetType = asset.contextualizer.type;
    // todo: we could later on embed more data coming
    // from the contextualization (and not just the resource)
    // involved in displaying the embed
    return (
      <figure
        className={asset.contextualizer.type}
        style={{
          position: 'relative',
          minHeight: (asset.contextualizer.type === 'data-presentation' && dimensions && dimensions.height) || '10em'
        }}
        id={assetId}>
        <BlockAssetPlayer
          type={assetType}
          resource={resource}
          options={{
            template: 'scroller'
          }}
          fixed={fixedPresentationId === assetId}
          allowInteractions={inNote || fixedPresentationId === assetId}
          onExit={onExit} />
        <figcaption>
          {resource.metadata.title && <h4>
            {resource.metadata.title}
          </h4>}
          {resource.metadata.description && <p>
            {resource.metadata.description}
          </p>}
          {resource.metadata.source && <p>
            Source: <i>{resource.metadata.source}</i>
          </p>}
        </figcaption>
      </figure>
    );
  }
  else {
    return null;
  }
};
/**
 * Component's properties types
 */
BlockAssetWrapper.propTypes = {
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
BlockAssetWrapper.contextTypes = {
  /**
   * The active story data
   */
  story: PropTypes.object,
  /**
   * Dimensions of the wrapping element
   */
  dimensions: PropTypes.object,
  /**
   * Id of the presentation being displayed full screen if any
   */
  fixedPresentationId: PropTypes.string,
  /**
   * Whether the block asset is displayed in a note (and not in main content)
   */
  inNote: PropTypes.bool,
  /**
   * Triggered when a full-screen asset is exited
   */
  onExit: PropTypes.func
};

export default BlockAssetWrapper;
