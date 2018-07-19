/**
 * quinoa-story-player stories definition
 * ============
 * each story allows to visually assess the lib's component in the browser
 * run `npm storybook` to see them in action
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import RealPlayer from '../src/';

import formatsExample from './formats-example.json';
import sidenotesExample from './sidenotes-test.json';
import burnoutExample from './le-burnout.json';
import titles from './titles-styling.json';
import embeds from './embeds-test.json';

class Player extends Component {

  static childContextTypes = {
    getResourceDataUrl: PropTypes.func,
  }

  getChildContext = () =>  ({
    getResourceDataUrl: (url) => `/assets/${url}`
  })

  render = () => {
    return <RealPlayer {...this.props} />
  }
}

const withCustomCss = {
  ...burnoutExample,
  settings: {
    css: `
.quinoa-story-player{
  font-size : 1.5rem;
}

.quinoa-story-player h1{
  color: brown;
  }
`
  }
};

const withFootnotes = {
  ...burnoutExample,
  settings: {
    options: {
      notesPosition: 'foot'      
    }
  }
};

const withComments = {
  ...burnoutExample,
  settings: {
    options: {
      allowDisqusComments: 'yes'      
    }
  }
};


storiesOf('Quinoa story - garlic template', module)
  .add('With Footnotes', () => (
    <Player
      story={withFootnotes}
    />
  ))
  .add('With Sidenotes', () => (
    <Player
      story={sidenotesExample}
    />
  ))
  .add('With custom css', () => (
    <Player
      story={withCustomCss}
    />
  ))
  .add('With comments', () => (
    <Player
      story={withComments}
    />
  ))
  .add('Within another page (container-relative positionning)', () => (
    <div
      style={{
        background: 'grey'
      }}
    >
      <div 
        style={{
          background: 'red',
          position: 'absolute',
          left: '10%',
          top: '10%',
          width: '80%',
          height: '80%'
        }}
      >
        <Player
          story={formatsExample}
        />
      </div>
    </div>
  ))
  .add('Title tests', () => (
    <Player
      story={titles}
    />
  ))
  .add('Embed tests', () => (
    <Player
      story={embeds}
    />
  ))
// add other templates here