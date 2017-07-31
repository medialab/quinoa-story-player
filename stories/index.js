/**
 * quinoa-story-player stories definition
 * ============
 * each story allows to visually assess the lib's component in the browser
 * run `npm storybook` to see them in action
 */
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Player from '../src/';

import mockStory from './plain-story.json';
import assetsStoryShort from './story-with-assets-short.json';
import assetsStoryLong from './story-with-assets-long.json';
import assetsStoryDiverse from './story-with-diverse-types-of-assets.json';

import formatsExample from './formats-example.json';
import imageExample from './test-image.json';
import sidenotesExample from './sidenotes-test.json';
import lotsOfAssets from './story-with-lots-of-assets.json';

const withCustomCss = {
  ...formatsExample,
  settings: {
    css: `
.quinoa-story-player{
  color : red;
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
  .add('Formats story', () => (
    <Player
      story={formatsExample}
    />
  ))
  .add('Image story', () => (
    <Player
      story={imageExample}
    />
  ))
  .add('Footnotes story', () => (
    <Player
      story={withFootnotes}
    />
  ))
  .add('Sidenotes story', () => (
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
  .add('With lots of assets', () => (
    <Player
      story={lotsOfAssets}
    />
  ))
  .add('Container-relative positionning of absolute positionned elements', () => (
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