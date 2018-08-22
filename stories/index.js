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
import newSchema from './new-schema.json';

import stylesTest from './story-styles-test';
import testCover from './test-cover.json';

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
  ...stylesTest,
  settings: {
    css: `
.content-paragraph{
  font-size: 10px;
}

.wrapper, .nav{
  background: white;
}

.content-h1,.content-h2,.section-title
{
  color: blue;
}
`
  }
};

const withFootnotes = {
  ...stylesTest,
  settings: {
    options: {
      notesPosition: 'foot'      
    }
  }
};

storiesOf('Quinoa story - garlic template', module)
  .add('Story with all plain styles', () => (
    <Player
      story={stylesTest}
    />
  ))
  .add('Story With footnotes', () => (
    <Player
      story={withFootnotes}
    />
  ))
  .add('Story with custom css', () => (
    <Player
      story={withCustomCss}
    />
  ))
  .add('Story with cover', () => (
    <Player
      story={testCover}
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