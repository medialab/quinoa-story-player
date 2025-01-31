/**
 * quinoa-story-player stories definition
 * ============
 * each story allows to visually assess the lib's component in the browser
 * run `npm storybook` to see them in action
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import RealPlayer from '../src/';

// import formatsExample from './formats-example.json';
// import sidenotesExample from './sidenotes-test.json';
// import burnoutExample from './le-burnout.json';
// import titles from './titles-styling.json';
// import embeds from './embeds-test.json';
// import newSchema from './new-schema.json';

import stylesTest from './story-styles-test';
import contextualizationsTest from './story-contextualizations-test';
import testCover from './test-cover.json';
import radical from './radical.json';
import faultyLinks from './faulty-links.json';
import titleBlinking from './title-blinking.json';
import stylesVariables from './styles-variation.json';
import pepperTest from './Les deux corps de la flèche.json';
import internalLinksPepper from './internal-links.json';
import internalLinksGarlic from './internal-links-garlic.json';
import testScrolly from './test-scrolly.json';
import digitalMethods from './digital-methods-urban-policy.json';


class Player extends Component {

  static childContextTypes = {
    getResourceDataUrl: PropTypes.func,
  }

  getChildContext = () => ({
    getResourceDataUrl: (url) => `/assets/${url}`
  })

  render = () => {
    const handlePrint = () => {
      window.focus();
      window.print();
    };
    return (
      <div>
        <RealPlayer {...this.props} />
        <div
          style={{
            right: '1rem',
            bottom: '1rem',
            position: 'fixed'
          }}>
          <button onClick={handlePrint}>Print</button>
        </div>
      </div>
    );
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

storiesOf('Example story', module)
  .add('Designing Digital Methods to monitor and inform Urban Policy', () => (
    <Player
      story={digitalMethods} />
  ))
  .add('with scrollytelling', () => (
    <Player
      story={{
        ...digitalMethods,
        settings: {
          ...digitalMethods.settings,
          styles: {
            garlic: {
              ...digitalMethods.settings.styles.garlic,
              options: {
                ...digitalMethods.settings.styles.garlic.options,
                figuresPosition: 'aside',
              }
            }
          }
        }
      }} />
  ))
  .add('With pepper', () => (
    <Player
      story={{ ...digitalMethods, settings: pepperTest.settings }} />
  ))
  .add('With mint', () => (
    <Player
      story={{
        ...digitalMethods,
        settings: {
          ...pepperTest.settings,
          templateId: 'mint',
          styles: {
            mint: {
              ...digitalMethods.settings.styles.pepper
            }
          }
        },
       }} />
  ));

storiesOf('Quinoa story - garlic template', module)
  .add('Story with all plain styles', () => (
    <Player
      story={stylesTest} />
  ))
  .add('Story with all contextualizations and variants', () => (
    <Player
      story={contextualizationsTest} />
  ))
  .add('Radical', () => (
    <Player
      story={radical} />
  ))
  .add('Story With footnotes', () => (
    <Player
      story={withFootnotes} />
  ))
  .add('Story with custom css', () => (
    <Player
      story={withCustomCss} />
  ))
  .add('Story with cover', () => (
    <Player
      story={testCover} />
  ))
  .add('Faulty links', () => (
    <Player
      story={faultyLinks} />
  ))
  .add('Title blinking', () => (
    <Player
      story={titleBlinking} />
  ))
  .add('With Styles Variations (WYSIWYG)', () => (
    <Player story={stylesVariables} />
  ))
  .add('Test scrollytelling', () => (
    <Player story={testScrolly} />
  ))
  .add('Story within another page (container-relative positionning)', () => (
    <div
      style={{
        background: 'grey',
        position: 'fixed',
        width: '100%',
        height: '100%'
      }}>
      <div
        style={{
          background: 'red',
          position: 'absolute',
          left: '10%',
          top: '10%',
          width: '80%',
          height: '80%'
        }}>
        <Player
          story={contextualizationsTest} />
      </div>
    </div>
  ))
  .add('Internal links', () => (
    <Player
      story={{ ...internalLinksGarlic }} />
  ));
// add other templates here
storiesOf('Quinoa story - pepper template', module)
  .add('Story with cover image', () => (
    <Player
      story={pepperTest} />
  ))
  .add('Story without cover', () => (
    <Player
      story={{
        ...pepperTest,
        metadata: {
          ...pepperTest.metadata,
          coverImage: undefined,
        }
      }} />
  ))
  .add('Story with notes in footer', () => (
    <Player
      story={{
        ...pepperTest,

        settings: {
          ...pepperTest.settings,
          styles: {
            ...pepperTest.settings.styles,
            pepper: {
              ...pepperTest.settings.styles.pepper,
              options: {
                ...pepperTest.settings.styles.pepper.options,
                notesPosition: 'foot'
              }
            }
          }
        }
      }} />
  ))
  .add('Story with custom background', () => (
    <Player
      story={{
        ...pepperTest,
        metadata: {
          ...pepperTest.metadata,
          coverImage: undefined,
        },
        settings: {
          ...pepperTest.settings,
          styles: {
            ...pepperTest.settings.styles,
            pepper: {
              ...pepperTest.settings.styles.pepper,
              stylesVariables: {
                ...pepperTest.settings.styles.pepper.stylesVariables,
                background:
                  {
                      color: 'pink'
                  }
              }
            }
          }
        }
      }} />
  ))
  .add('Story with all plain styles', () => (
    <Player
      story={{ ...stylesTest, settings: pepperTest.settings }} />
  ))
  .add('Story with all contextualizations and variants', () => (
    <Player
      story={{ ...contextualizationsTest, settings: pepperTest.settings }} />
  ))
  .add('Radical', () => (
    <Player
      story={{ ...radical, settings: pepperTest.settings }} />
  ))
  .add('Internal links pepper issue', () => (
    <Player
      story={internalLinksPepper} />
  ));


storiesOf('Quinoa story - mint template', module)
  .add('Story with cover image', () => (
    <Player
      story={{
      ...pepperTest,
      settings: {
        ...pepperTest.settings,
        templateId: 'mint',
        styles: {
          mint: {
            ...pepperTest.settings.styles.pepper
          }
        }
      },
     }} />
  ))
  .add('Story without cover', () => (
    <Player
      story={{
        ...pepperTest,
        metadata: {
          ...pepperTest.metadata,
          coverImage: undefined,
        },
        settings: {
          ...pepperTest.settings,
          templateId: 'mint',
          styles: {
            mint: {
              ...pepperTest.settings.styles.pepper
            }
          }
        },
      }} />
  ))
  .add('Story with custom background', () => (
    <Player
      story={{
        ...pepperTest,
        metadata: {
          ...pepperTest.metadata,
          coverImage: undefined,
        },

        settings: {
          ...pepperTest.settings,
          templateId: 'mint',
          styles: {
            ...pepperTest.settings.styles,
            mint: {
              ...pepperTest.settings.styles.pepper,
              stylesVariables: {
                ...pepperTest.settings.styles.pepper.stylesVariables,
                background:
                  {
                      color: 'pink'
                  }
              }
            }
          }
        }
      }} />
  ))
  .add('Story with all plain styles', () => (
    <Player
      story={{ 
        ...stylesTest,
        settings: {
          ...stylesTest.settings,
          templateId: 'mint',
          styles: {
            mint: {
              ...pepperTest.settings.styles.pepper
            }
          }
        },
      }} />
  ))
  .add('Story with all contextualizations and variants', () => (
    <Player
      story={{ 
        ...contextualizationsTest, 
        settings: {
          ...stylesTest.settings,
          templateId: 'mint',
          styles: {
            mint: {
              ...pepperTest.settings.styles.pepper
            }
          }
        },
      }} />
  ))
  .add('Radical', () => (
    <Player
      story={{ 
        ...radical, 
        settings: {
          ...stylesTest.settings,
          templateId: 'mint',
          styles: {
            mint: {
              ...pepperTest.settings.styles.pepper
            }
          }
        },
      }} />
  ))
