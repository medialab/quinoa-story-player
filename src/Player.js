/* eslint react/no-did-mount-set-state : 0 */
import React, {Component, PropTypes} from 'react';

require('./Player.scss');

import StoryLayout from './StoryLayout';

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

  shouldComponentUpdate() {
    return true;
  }

  renderComponent () {
    const {
      options = {}
    } = this.props;
    if (this.state.story && this.state.status === 'loaded') {
      return (
        <StoryLayout
          story={this.state.story}
         />
      );
    }
    else if (this.status === 'error') {
      return (<div>Oups, that looks like an error</div>);
    }
  else {
      return (<div>No data yet</div>);
    }
  }

  render() {
    return (
      <div className="quinoa-story-player">
        {this.renderComponent()}
      </div>
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


export default QuinoaStoryPlayer;
