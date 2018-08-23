import React, { Component } from 'react';
import PropTypes from 'prop-types';
import QuinoaPresentationPlayer from 'quinoa-presentation-player';
import get from 'axios';

export default class Table extends Component {
  static contextTypes = {
    getResourceDataUrl: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
      loading: false,
      columns: []
    };
  }

  componentDidMount() {
    this.updateData(this.props);
  }

  componentWillReceiveProps = nextProps => {
    if (this.props.resource !== nextProps.resource) {
      this.updateData(nextProps);
    }
  }

  updateData = props => {
    const { getResourceDataUrl } = this.context;
    const { data } = props.resource;
    if (data.filePath && typeof getResourceDataUrl === 'function') {
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
  }

  render = () => {
    const {
      props: {
        resource = {},
        contextualizer,
        onWheel,
        onExit,
        style
      },
      state: {
        loading
      }
    } = this;
    const { data } = resource;
    const { options } = contextualizer;
    const usableData = data.json || this.state.data;
    return (
      usableData && !loading ?
        <QuinoaPresentationPlayer
          presentation={usableData}
          template={(options && options.template)}
          onWheel={onWheel}
          onExit={onExit}
          style={style} /> : null
    );
  }
}
