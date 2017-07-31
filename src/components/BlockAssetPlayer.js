/* eslint react/no-danger : 0 */
/**
 * This module exports a stateless reusable block asset player component
 * ============
 * @module quinoa-story-player/components/BlockAssetPlayer
 */
import React from 'react';
import PropTypes from 'prop-types';
import {Media, Player} from 'react-media-player';
import QuinoaPresentationPlayer from 'quinoa-presentation-player';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

/**
 * Renders a block asset player as a pure component
 * @param {object} props -
 * @param {string} props.type - the type of asset to display
 * @param {object} props.resource - the resource to consume for displaying the asset
 * @param {object} props.options - specific display options
 * @param {boolean} props.fixed - whether the asset should be displayed full screen
 * @param {boolean} props.allowInteractions - whether to allow interactions with the asset
 * @param {function} props.onInteractions - callbacks when interacting with an asset
 * @param {object} context -
 * @param {object} context.dimensions - the dimensions of the root component
 * @return {ReactElement} component - the component
 */
const BlockAssetPlayer = ({
  type,
  resource,
  options,
  fixed,
  allowInteractions,
  onExit
}, context) => {
  const dimensions = context.dimensions;
  switch (type) {
    case 'table':
      const data = resource.data;
      const columns = Object.keys(data[0]).map(key => ({
        Header: key,
        accessor: key
      }));
      return <ReactTable data={data} columns={columns} />;
    case 'image':
      // future-proofing possible externally linked images
      const src = resource.data.base64 || resource.data.src || resource.data.url;
      return <img src={src} />;
    case 'video':
      return (
        <Media>
          <Player src={resource.data.url} />
        </Media>
      );
    case 'data-presentation':
      const onWheel = e => {
        if (fixed) {
          e.stopPropagation();
          e.preventDefault();
        }
      };
      return (
        <QuinoaPresentationPlayer
          presentation={resource.data}
          template={(options && options.template)}
          onWheel={onWheel}
          onExit={onExit}
          style={{
            position: fixed ? 'fixed' : 'absolute',
            left: fixed ? dimensions.left : '0',
            top: fixed ? dimensions.top : '0',
            width: fixed ? dimensions.width : '',
            height: fixed ? dimensions.height : '',
            pointerEvents: allowInteractions ? 'all' : 'none'
          }} />
      );
    case 'embed':
      return (
        <div
          dangerouslySetInnerHTML={{
            __html: resource.data
          }} />
      );
    default:
      return null;
  }
};

/**
 * Component's properties types
 */
BlockAssetPlayer.propTypes = {
  type: PropTypes.string,
  resource: PropTypes.object,
  options: PropTypes.object,
  fixed: PropTypes.bool,
  allowInteractions: PropTypes.bool,
  onExit: PropTypes.func,
};
/**
 * Component's context used properties
 */
BlockAssetPlayer.contextTypes = {
  dimensions: PropTypes.object
};

export default BlockAssetPlayer;
