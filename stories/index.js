import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Welcome from './Welcome';
import Player from '../src/Player';

import mockStory from './plain-story.json';
import assetsStoryShort from './story-with-assets-short.json';
import assetsStoryLong from './story-with-assets-long.json';
import assetsStoryDiverse from './story-with-diverse-types-of-assets.json';


// import networkPresentation from './network/network-test-from-bulgur.json';

storiesOf('Quinoa story', module)
  .add('Simple', () => (
    <Player 
      story={mockStory} 
    />
  ))
  .add('With assets (short)', () => (
    <Player 
      story={assetsStoryShort} 
    />
  ))
  .add('With assets (long)', () => (
    <Player 
      story={assetsStoryLong} 
    />
  ))
  .add('With assets (diverse)', () => (
    <Player 
      story={assetsStoryDiverse} 
    />
  ))