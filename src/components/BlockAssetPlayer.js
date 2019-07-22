/* eslint react/no-danger : 0 */
/* eslint react/no-did-mount-set-state : 0 */
/**
 * This module exports a stateless reusable block asset player component
 * ============
 * @module quinoa-story-player/components/BlockAssetPlayer
 */
import React from 'react';
import PropTypes from 'prop-types';

import { Block as Image } from '../contextualizers/image';
import { Block as Video } from '../contextualizers/video';
import { Block as Embed } from '../contextualizers/embed';
import { Block as Table } from '../contextualizers/table';
// import {Block as DataPresentation} from '../contextualizers/data-presentation';


import 'react-table/react-table.css';

/**
 * Renders a block asset player as a stateful component
 * @param {object} props -
 * @param {string} props.type - the type of asset to display
 * @param {object} props.data - the data to consume for displaying the asset
 * @param {object} props.options - specific display options
 * @param {boolean} props.fixed - whether the asset should be displayed full screen
 * @param {boolean} props.allowInteractions - whether to allow interactions with the asset
 * @param {function} props.onInteractions - callbacks when interacting with an asset
 * @param {object} context -
 * @param {object} context.dimensions - the dimensions of the root component
 * @return {ReactElement} component - the component
 */
class BlockAssetPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.onWheel = this.onWheel.bind(this);
  }

  shouldComponentUpdate = () => true;

  onWheel (e) {
    if (this.props.fixed) {
      e.stopPropagation();
      e.preventDefault();
    }
  }

  /**
  * Investigate needed: wrap switch render inside a div will cause an issue on QuinoaPresentationPlayer lost pointer interaction
  */
  render() {
    const {
      // type,
      // data,
      resource = {},
      contextualizer = {},
      contextualization = {},
      // related to bulgur player
      // options,
      // fixed,
      // allowInteractions,
      // onExit
    } = this.props;
    const { type } = contextualizer;
    switch (type) {
      case 'table':
        return <Table resource={resource} contextualizer={contextualizer} contextualization={contextualization} />;
      case 'image':
        return <Image resource={resource} contextualizer={contextualizer} contextualization={contextualization} />;
      case 'video':
        return (<Video resource={resource} contextualizer={contextualizer} contextualization={contextualization} />);

      case 'embed':
        return (
          <Embed resource={resource} contextualizer={contextualizer} contextualization={contextualization} />
        );
      default:
        return null;
    }
  }
}

/**
 * Component's properties types
 */
BlockAssetPlayer.propTypes = {
  type: PropTypes.string,
  data: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.string
  ]),
  options: PropTypes.object,
  fixed: PropTypes.bool,
  allowInteractions: PropTypes.bool,
  onExit: PropTypes.func,
};
/**
 * Component's context used properties
 */
BlockAssetPlayer.contextTypes = {
  dimensions: PropTypes.object,
};

export default BlockAssetPlayer;
