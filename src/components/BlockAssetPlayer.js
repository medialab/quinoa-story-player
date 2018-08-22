/* eslint react/no-danger : 0 */
/* eslint react/no-did-mount-set-state : 0 */
/**
 * This module exports a stateless reusable block asset player component
 * ============
 * @module quinoa-story-player/components/BlockAssetPlayer
 */
import React from 'react';
import PropTypes from 'prop-types';
import Player from 'react-player';
// import QuinoaPresentationPlayer from 'quinoa-presentation-player';
import ReactTable from 'react-table';
import { get } from 'axios';
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
    this.state = {
      data: undefined,
      loading: false,
      columns: []
    };
    this.onWheel = this.onWheel.bind(this);
  }

  componentDidMount() {
    const { type, data } = this.props;
    const { getResourceDataUrl } = this.context;
    if (type === 'table' && data.filePath && typeof getResourceDataUrl === 'function') {
      this.setState({ loading: true });
      get(getResourceDataUrl(data))
      .then(res => {
        const columns = Object.keys(res.data[0]).map(key => ({
          Header: key,
          accessor: key
        }));
        this.setState({
          loading: false,
          data: res.data,
          columns
        });
      });
    }
    if (type === 'data-presentation' && data.filePath && typeof getResourceDataUrl === 'function') {
      get(getResourceDataUrl(data))
      .then(res => {
        this.setState({
          data: res.data,
        });
      });
    }
  }

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
      type,
      data,
      // related to bulgur player
      // options,
      // fixed,
      // allowInteractions,
      // onExit
    } = this.props;
    const {
      // dimensions,
      getResourceDataUrl
    } = this.context;
    switch (type) {
      case 'table':
        let columns;
        if (data.json) {
          columns = Object.keys(data.json[0]).map(key => ({
            Header: key,
            accessor: key
          }));
        }
        return (<ReactTable
          data={data.json || this.state.data}
          columns={columns || this.state.columns}
          loading={this.state.loading} />);
      case 'image':
        // future-proofing possible externally linked images
        let src;
        if (typeof getResourceDataUrl === 'function' && data.filePath) {
          src = getResourceDataUrl(data);
        }
        else {
          src = data.base64 || data.src;
        }
        return <img className="content-image" src={src} />;
      case 'video':
        return (
          <Player url={data.url} />
        );
      // case 'data-presentation':
      //   const usableData = data.json || this.state.data;
      //   return (
      //     usableData ?
      //       <QuinoaPresentationPlayer
      //         presentation={usableData}
      //         template={(options && options.template)}
      //         onWheel={this.onWheel}
      //         onExit={onExit}
      //         style={{
      //           position: fixed ? 'fixed' : 'absolute',
      //           left: fixed ? dimensions.left : '0',
      //           top: fixed ? dimensions.top : '0',
      //           width: fixed ? dimensions.width : '',
      //           height: fixed ? dimensions.height : '',
      //           pointerEvents: allowInteractions ? 'all' : 'none'
      //         }} /> : null
      //   );
      case 'embed':
        return (
          <div
            className="embed-container"
            dangerouslySetInnerHTML={{
              __html: data
            }} />
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
  /**
   * getResourceDataUrl in fonio DataUrlProvider
   */
  getResourceDataUrl: PropTypes.func,
};

export default BlockAssetPlayer;
