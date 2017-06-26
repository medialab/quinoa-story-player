import React from 'react';
import PropTypes from 'prop-types';

import AssetPreview from './AssetPreview';

const AssetWrapper = ({
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
  if (asset) {
    const resource = asset.resource;
    const assetType = asset.contextualizer.type;
    return (
      <figure
        style={{
          position: 'relative',
          minHeight: (dimensions && dimensions.height) || '10em'
        }}
        id={assetId}>
        <AssetPreview
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

AssetWrapper.contextTypes = {
  story: PropTypes.object,
  dimensions: PropTypes.object,
  fixedPresentationId: PropTypes.string,
  inNote: PropTypes.bool,
  onExit: PropTypes.func
};

export default AssetWrapper;
