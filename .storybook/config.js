import { configure, addDecorator } from '@storybook/react';

import StoryRouter from 'storybook-react-router';

addDecorator(StoryRouter());

function loadStories() {
  require('../stories');
}

configure(loadStories, module);
