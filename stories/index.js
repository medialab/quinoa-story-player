/**
 * quinoa-story-player stories definition
 * ============
 * each story allows to visually assess the lib's component in the browser
 * run `npm storybook` to see them in action
 */
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Player from '../src/';

import formatsExample from './formats-example.json';
import sidenotesExample from './sidenotes-test.json';

const withCustomCss = {
  ...formatsExample,
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
  ...sidenotesExample,
  settings: {
    options: {
      notesPosition: 'foot'      
    }
  }
};

const withComments = {
  ...sidenotesExample,
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
// add other templates here