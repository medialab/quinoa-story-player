/* eslint react/no-did-mount-set-state : 0 */
/**
 * This module exports a stateful story player component
 * ============
 * The player wraps basic story-loading related functions
 * and representation in the dom.
 * Templates are delegated the task to render the story with
 * a specific layout / set of interactions.
 * @module quinoa-story-player/Player
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Measure from 'react-measure';

import GarlicLayout from './templates/garlic/Layout';

/**
 * QuinoaStoryPlayer class for building QuinoaStoryPlayer react component instances
 */
class QuinoaStoryPlayer extends Component {
  /**
   * constructor
   * @param {object} props - properties given to instance at instanciation
   */
  constructor(props) {
    super(props);
    this.renderComponent = this.renderComponent.bind(this);
    /**
     * Initial state of the component
     */
    const initialState = {
      /**
       * Status represent the state of story data (waiting / loading / error)
       */
      status: 'waiting',
      /**
       * Story is stored in the state
       */
      story: undefined,

      dimensions: {
        width: -1,
        height: -1
      }
    };

    if (props.story) {
        initialState.status = 'loaded';
        initialState.story = props.story;
    }

    this.state = initialState;
  }
  /**
   * Updates data in the context when the state or props change
   */
  getChildContext() {
    return {
      // story is passed along context to handle entities rendering
      story: this.state.story,
      // dimensions are the dimensions of the wrapper
      dimensions: this.state.dimensions
    };
  }
  /**
   * Executes code when component receives new properties
   * @param {object} nextProps - the future properties of the component
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.story !== nextProps.story) {
      this.setState({
        story: nextProps.story,
      });
    }
  }
  /**
   * Decides whether the component should be updated
   * @param {object} nextProps - the future properties of the component
   * @param {object} nextState - the future state of the component
   * @return {boolean} necessaryToUpdate
   */
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.story !== nextProps.story ||
            this.state.dimensions !== nextState.dimensions;
  }
  /**
   * Renders appropriate component regarding active story's template choice
   * @return {ReactElement} component - the proper component/react markup
   */
  renderComponent () {
    const template = (this.state.story && this.state.story.settings && this.state.story.settings.template) || 'garlic';
    if (this.state.story && this.state.status === 'loaded') {
      switch (template) {
        case 'garlic':
          return (
            <GarlicLayout
              locale={this.props.locale}
              story={this.state.story} />
          );
        default:
          return null;
      }
    }
    else if (this.status === 'error') {
      return (<div>Oups, that looks like an error</div>);
    }
    else {
      return (<div>No data yet</div>);
    }
  }
  /**
   * Renders the component
   * @return {ReactElement} component - the component
   */
  render() {
    // called when container's dimensions change (resize, ...)
    const onMeasure = (contentRect) => {
      this.setState({ dimensions: contentRect.bounds });
    };
    return (
      <Measure
        bounds
        onResize={onMeasure}>
        {({ measureRef }) => (
          <div ref={measureRef} className="quinoa-story-player">
            {this.renderComponent()}
          </div>
        )}
      </Measure>
    );
  }
}
/**
 * Component's properties types
 */
QuinoaStoryPlayer.propTypes = {
  story: PropTypes.object
};

/**
 * Component's context properties provided to children
 */
QuinoaStoryPlayer.childContextTypes = {
  story: PropTypes.object,
  dimensions: PropTypes.object,
};

export default QuinoaStoryPlayer;
