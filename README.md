Quinoa-story-player - *data stories player component*
===

`Quinoa-story-player` is a module that provides a react component for displaying quinoa's data stories in read-only mode.

It is part of the ``quinoa`` project family, a suite of digital storytelling tools tailored for the [FORCCAST](http://controverses.org/) pedagogical program and [médialab sciences po](http://www.medialab.sciences-po.fr/) scientific activities.

An example of editing apps for making data presentations is [fonio](https://github.com/medialab/fonio).

# Requirements

* [git](https://git-scm.com/)
* [node](https://nodejs.org/en/)

# npm scripts

```
npm run build # builds component to ./build dir
npm run lint # lints code (auto fix on) according to linting settings in package.json
npm run comb # prettifies scss code
npm run test # run mocha testing on each *.spec.js files in ./src dir
npm run storybook # starts a storybook instance to live test the component in several implementation scenarii (see ./stories folder)
npm run build-storybook # initializes storybook
npm run git-add-build # adds build to the current git record
```

# Installing the module as a dependency

```
npm install --save https://github.com/medialab/quinoa-story-player
```

# Installing the module as a project

```
git clone https://github.com/medialab/quinoa-story-player
cd quinoa-story-player
npm install
npm run build-storybook
```

# Development

The project uses [storybook](https://storybook.js.org/) to visually test the possible implementations of the component.

```
npm run storybook
```

# Module API

The module exports by default a react component.
It also exports a `templates` object which exposes metadata about available templates to display presentations.

```js
import StoryPlayer from 'quinoa-story-player'; // provides usable react component

import {templates} from 'quinoa-story-player'; // provide metadata about available templates
```

# Presentation component API

```js
QuinoaStoryPlayer.propTypes = {
  /**
   * component must be given a story as prop
   * (see ./src/storyModel.json and ./quinoa-story-document-model-description.md)
   */
  story: PropTypes.Object.isRequired
});
```

# Templating

The component wraps a display-related component which corresponds to a specific templates.

For now there is only one template :

* `garlic` : story is presented as one single page - document header is displayed full-height on top of document - block assets such as presentations and videos are displayed full-height - when hovering a presentation scroll is used to navigate within the presentation.

## Creating new templates

Creating a new template supposes to create a new folder within `src/templates/` folder, and fill it with at least three files:

* an `info.json` file describing the metadata of the template
* a scss file describing component default style
* a js script exposing a react component

Example of an `info.json`:

```js
{
  "id": "garlic",
  "name": "Garlic",
  "description": "One-page scrollytelling - sections are displayed one on top of the other - assets are displayed in full length",
  "acceptsOptions" : [
    "notesPosition",
    "allowDisqusComments"
  ]
}
```

The react component of the template must comply to the following API :

```js
MyTemplate.propTypes = {
  /**
   * component must be given a story as prop
   * (see ./src/storyModel.json and ./quinoa-story-document-model-description.md)
   */
  story: PropTypes.Object.isRequired
}
```

# Pre-commit hook

The project uses a precommit hook before each commit to ensure the code remains clean at all times. Check out the `package.json` to learn more about it.