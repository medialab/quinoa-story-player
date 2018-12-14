/* eslint react/jsx-key : 0 */
/**
 * This module exports a statefull reusable draft-js raw-to-react renderer component
 * It wrapps around the redraft engine that converts draft-s raw to a react representation,
 * providing it specific settings and callbacks.
 * ============
 * @module quinoa-story-player/components/Renderer
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import redraft from 'redraft';
import Link from './Link';
import desantagleEntityRanges from '../utils/desantagleEntityRanges';

import BlockAssetWrapper from './BlockAssetWrapper';
import InlineAssetWrapper from './InlineAssetWrapper';
import NotePointer from './NotePointer';


// just a helper to add a <br /> after each block
const addBreaklines = (children) =>
  children.map(
    (child, index) =>
      [child, <br key={index + 0.5} />]
    );

/**
 * Define the renderers
 */
const renderers = {
  /**
   * Those callbacks will be called recursively to render a nested structure
   */
  inline: {
    // The key passed here is just an index based on rendering order inside a block
    BOLD: (children, { key }) => <strong key={key}>{children}</strong>,
    ITALIC: (children, { key }) => <em key={key}>{children}</em>,
    UNDERLINE: (children, { key }) => <u key={key}>{children}</u>,
    CODE: (children, { key }) => <span key={key}>{children}</span>,
  },
  /**
   * Blocks receive children and depth
   * Note that children are an array of blocks with same styling,
   */
  blocks: {
    'unstyled': (children) => children.map((child, index) => <div className="content-p" key={index}><span className="content-p--modifier">{child}</span></div>),
    'blockquote': (children) => <blockquote className="content-blockquote" ><span className="content-blockquote--modifier">{addBreaklines(children)}</span></blockquote>,
    'header-one': (children, { keys }) => children.map((child, index) => <h1 className="content-title content-h1" key={index} id={keys[index]}><span className="content-title--modifier">{child}</span></h1>),
    'header-two': (children, { keys }) => children.map((child, index) => <h2 className="content-title content-h2" key={index} id={keys[index]}><span className="content-title--modifier">{child}</span></h2>),
    'header-three': (children, { keys }) => children.map((child, index) => <h3 className="content-title content-h3" key={index} id={keys[index]}><span className="content-title--modifier">{child}</span></h3>),
    'header-four': (children, { keys }) => children.map((child, index) => <h4 className="content-title content-h4" key={index} id={keys[index]}><span className="content-title--modifier">{child}</span></h4>),
    'header-five': (children, { keys }) => children.map((child, index) => <h5 className="content-title content-h5" key={index} id={keys[index]}><span className="content-title--modifier">{child}</span></h5>),
    'header-six': (children, { keys }) => children.map((child, index) => <h6 className="content-title content-h6" key={index} id={keys[index]}><span className="content-title--modifier">{child}</span></h6>),

    // You can also access the original keys of the blocks
    'code-block': (children, { keys }) => (
      <pre className="content-pre" key={keys[0]} ><span className="content-pre--modifier">{addBreaklines(children)}</span></pre>
    ),
    // or depth for nested lists
    'unordered-list-item': (children, { depth, keys }) =>
      (<ul
        key={`${keys[keys.length - 1]}-${depth}`}
        className={`content-ul ul-level-${depth}`}>
        {children.map((child, index) =>
          (<li
            key={`${index}-${depth}`}
            className="content-li">
            <span className="content-li--modifier">{child}</span>
          </li>))
          }
      </ul>),
    'ordered-list-item': (children, { depth, keys }) => <ol key={keys.join('|')} className={`content-ol ol-level-${depth}`}>{children.map((child, index) => <li className="content-li" key={keys[index]}><span className="content-li--modifier">{child}</span></li>)}</ol>,
    'atomic': (children, { keys, data }) => children.map((child, i) => <div className="content-atomic-container" key={keys[i]} {...data[i]}>{child}</div>),
  },
  /**
   * Entities receive children and the entity data
   */
  entities: {
  //   // key is the entity key value from raw
    LINK: (children, data, { key }) =>
      <Link key={key} to={data.url}>{children}</Link>,
    BLOCK_ASSET: (children, data, { key }) => {
      return <BlockAssetWrapper key={key} data={data} />;
    },
    INLINE_ASSET: (children, data, { key }) => {
      return <InlineAssetWrapper data={data} key={`${key}-${data.asset.id}`}>{children}</InlineAssetWrapper>;
    },
    NOTE_POINTER: (children, data, { key }) => {
      return <NotePointer key={key} children={children} noteId={data.noteId} />;
    },
  },
};

/**
 * Renderer class for building raw-to-react rendering react component instances
 */
class Renderer extends Component {
  /**
   * constructor
   * @param {object} props - properties given to instance at instanciation
   */
  constructor (props) {
    super(props);
  }

  /**
   * Determines whether to update the component or not
   * @param {object} nextProps - the future properties of the component
   * @return {boolean} shouldUpdate - yes or no
   */
  shouldComponentUpdate() {
    return true;// todo: wisely optimize here
  }

  /**
   * Displays something when no suitable content state is provided to the renderer
   * @return {ReactElement} default message
   */
  renderWarning() {
    return null;
    /*return <div><p>Nothing to render.</p></div>;*/
  }

  /**
   * Renders the component
   * @return {ReactElement} component - the component
   */
  render() {
    const {
      raw,
    } = this.props;
    if (!raw) {
      return this.renderWarning();
    }
    let safeRaw = raw;
    /**
     * @todo investigate if this causes performance issues
     * see if https://github.com/medialab/fonio/issues/210 could not be fixed upstream
     */
    if (raw) {
      safeRaw = desantagleEntityRanges(raw);
    }
    const rendered = redraft(safeRaw, renderers);
    // redraft can return a null if there's nothing to render
    if (!rendered) {
      return this.renderWarning();
    }
    return (
      <div className="contents-container">
        {rendered}
      </div>
    );
  }
}

/**
 * Component's properties types
 */
Renderer.propTypes = {
  /**
   * Draft-js raw representation of some contents
   * see https://draftjs.org/docs/api-reference-data-conversion.html
   */
  raw: PropTypes.object
};

export default Renderer;
