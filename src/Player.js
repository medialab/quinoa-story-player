/* eslint react/no-did-mount-set-state : 0 */
import React, {Component, PropTypes} from 'react';

import Measure from 'react-measure';

import GarlicLayout from './templates/garlic/Layout';

class QuinoaStoryPlayer extends Component {
  constructor(props) {
    super(props);
    this.renderComponent = this.renderComponent.bind(this);

    const initialState = {
      status: 'waiting'
    };

    if (props.story) {
        initialState.status = 'loaded';
        initialState.story = props.story;
    }

    this.state = initialState;
  }

  getChildContext() {
    return {
      story: this.state.story,
      dimensions: this.state.dimensions
    };
  }

  shouldComponentUpdate() {
    return true;
  }

  renderComponent () {
    const template = (this.state.story && this.state.story.settings && this.state.story.settings.template) || 'garlic';
    if (this.state.story && this.state.status === 'loaded') {
      switch (template) {
        case 'garlic':
          return (
            <GarlicLayout
              story={this.state.story} />
          );
        default:
          return;
      }
    }
    else if (this.status === 'error') {
      return (<div>Oups, that looks like an error</div>);
    }
  else {
      return (<div>No data yet</div>);
    }
  }

  render() {
    const onMeasure = (dimensions) => {
      this.setState({dimensions});
    };
    return (
      <Measure
        onMeasure={onMeasure}>
        <div className="quinoa-story-player">
          {this.renderComponent()}
        </div>
      </Measure>
    );
  }
}

QuinoaStoryPlayer.propTypes = {
  // story: PropTypes.Object,
  options: PropTypes.shape({
    allowViewExploration: PropTypes.bool // whether users can pan/zoom/navigate inside view
  }),
  onSlideChange: PropTypes.func, // callback when navigation is changed
};


QuinoaStoryPlayer.childContextTypes = {
  story: PropTypes.object,
  dimensions: PropTypes.object
};

export default QuinoaStoryPlayer;
