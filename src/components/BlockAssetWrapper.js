/**
 * This module exports a stateless reusable block asset wrapper component
 * It handles the connection to context's data and builds proper data to render the asset
 * ============
 * @module quinoa-story-player/components/BlockAssetWrapper
 */
import React from 'react';
import PropTypes from 'prop-types';

import Info from './Info';
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
  const fixedPresentationId = context.fixedPresentationId;
  const onExit = context.onExit;
  const activeBlock = context.activeBlock;
  const inNote = context.inNote;
  if (asset && asset.resource.data && !inNote) {
    const { resource, contextualizer } = asset;
    // const resource = asset.resource;
    // const contextualizer = asset.contextualizer;
    const assetType = contextualizer.type;

    const buildInfo = () => {
      if (
        !(resource.metadata.description && resource.metadata.description.length)
        ||
        !(resource.metadata.source && resource.metadata.source.length)
      ) {
        return undefined;
      }
      const description = resource.metadata.description ? `
        <div class="info-description">
          ${resource.metadata.description.replace('\n', '<br/>')}
        </div>
      ` : '';
      const source = resource.metadata.source ? `
        <div class="info-source">
          <i>Source: ${resource.metadata.source}</i>
        </div>
      ` : '';

      return `
      <div class="info-container">
        ${description}
        ${source}
      </div>
            `;
    };
    const info = buildInfo();
    let isActive;
    if (activeBlock && activeBlock.type === 'atomic' && activeBlock.id === assetId) {
      isActive = true;
    }
    // todo: we could later on embed more data coming
    // from the contextualization (and not just the resource)
    // involved in displaying the embed
    return (
      <figure
        className={`content-figure ${asset.contextualizer.type} ${isActive ? 'is-active' : ''}`}
        id={assetId}>
        <BlockAssetPlayer
          type={assetType}
          data={resource.data}
          resource={resource}
          contextualizer={contextualizer}
          contextualization={contextualization}
          options={{
            template: 'scroller'
          }}
          fixed={fixedPresentationId === assetId}
          allowInteractions={inNote || fixedPresentationId === assetId}
          onExit={onExit} />
        <figcaption className="figure-caption-container">
          <div className="figure-caption-content">
            {resource.metadata.title && <h4 className="figure-caption-title">
              {resource.metadata.title}{info && <Info message={info} />}
            </h4>}
            {/*{resource.metadata.description && <p className="figure-caption-description">
              {resource.metadata.description}
            </p>}
            {resource.metadata.source && <p className="figure-caption-source">
              Source: <i>{resource.metadata.source}</i>
            </p>}*/}
          </div>
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
  onExit: PropTypes.func,

  /**
   * Active element when relevant
   */
  activeBlock: PropTypes.object,
};

export default BlockAssetWrapper;
