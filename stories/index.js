import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Welcome from './Welcome';
import Player from '../src/Player';

import mockStory from './plain-story.json';


// import networkPresentation from './network/network-test-from-bulgur.json';

storiesOf('Quinoa story', module)
  .add('Simple', () => (
    <Player 
      story={mockStory} 
    />
  ))