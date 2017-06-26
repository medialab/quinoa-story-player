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
    notesPosition: 'aside'
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
// add other templates here