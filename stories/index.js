import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Welcome from './Welcome';
import Player from '../src/';

import mockStory from './plain-story.json';
import assetsStoryShort from './story-with-assets-short.json';
import assetsStoryLong from './story-with-assets-long.json';
import assetsStoryDiverse from './story-with-diverse-types-of-assets.json';

import peritextStory from './peritext-story.json';
import formatsExample from './formats-example.json';
import imageExample from './test-image.json';
import sidenotesExample from './sidenotes-test.json';
import lotsOfAssets from './story-with-lots-of-assets.json';

const withCustomCss = {
  ...peritextStory,
  settings: {
    css: `
.quinoa-story-player{
  color : red;
}
`
  }
};

const withSideNotes = {
  ...sidenotesExample,
  settings: {
    options: {
      notesPosition: 'aside'      
    }
  }
};

const withComments = {
  ...sidenotesExample,
  settings: {
    options: {
      allowDisqusComments: true      
    }
  }
};


storiesOf('Quinoa story - garlic template', module)
  .add('Peritext story', () => (
    <Player
      story={peritextStory}
    />
  ))
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
      story={sidenotesExample}
    />
  ))
  .add('Sidenotes story', () => (
    <Player
      story={withSideNotes}
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