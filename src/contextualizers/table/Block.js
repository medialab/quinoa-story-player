import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
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
      },
      state: {
        loading
      }
    } = this;
    const { data } = resource;
    let columns;
    if (data.json) {
      columns = Object.keys(data.json[0]).map(key => ({
        Header: key,
        accessor: key
      }));
    }
    return (<ReactTable
      className="quinoa-contextualization block table"
      data={data.json || this.state.data}
      columns={columns || this.state.columns}
      loading={loading} />
    );
  }
}
