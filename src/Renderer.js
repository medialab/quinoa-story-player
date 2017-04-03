/* eslint react/jsx-key : 0 */
import React, {Component} from 'react';
import redraft from 'redraft';

/**
 *  You can use inline styles or classNames inside your callbacks
 */
const styles = {
  code: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
  codeBlock: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 20,
  },
};

// just a helper to add a <br /> after a block
const addBreaklines = (children) => children.map(child => [child, <br />]);

/**
 * Define the renderers
 */
const renderers = {
  /**
   * Those callbacks will be called recursively to render a nested structure
   */
  inline: {
    // The key passed here is just an index based on rendering order inside a block
    BOLD: (children, {key}) => <strong key={key}>{children}</strong>,
    ITALIC: (children, {key}) => <em key={key}>{children}</em>,
    UNDERLINE: (children, {key}) => <u key={key}>{children}</u>,
    CODE: (children, {key}) => <span key={key} style={styles.code}>{children}</span>,
  },
  /**
   * Blocks receive children and depth
   * Note that children are an array of blocks with same styling,
   */
  blocks: {
    'unstyled': (children) => children.map((child, index) => <p key={index}>{child}</p>),
    'blockquote': (children, index) => <blockquote key={index} >{addBreaklines(children)}</blockquote>,
    'header-one': (children, {keys}) => children.map((child, index) => <h1 key={keys[index]} id={keys[index]}>{child}</h1>),
    'header-two': (children, {keys}) => children.map((child, index) => <h2 key={keys[index]} id={keys[index]}>{child}</h2>),
    'header-three': (children, {keys}) => children.map((child, index) => <h3 key={keys[index]} id={keys[index]}>{child}</h3>),
    'header-four': (children, {keys}) => children.map((child, index) => <h4 key={keys[index]} id={keys[index]}>{child}</h4>),
    'header-five': (children, {keys}) => children.map((child, index) => <h5 key={keys[index]} id={keys[index]}>{child}</h5>),
    'header-six': (children, {keys}) => children.map((child, index) => <h6 key={keys[index]} id={keys[index]}>{child}</h6>),
    // You can also access the original keys of the blocks
    'code-block': (children, {keys}) => <pre style={styles.codeBlock} key={keys[0]} >{addBreaklines(children)}</pre>,
    // or depth for nested lists
    'unordered-list-item': (children, {depth, keys}) => <ul key={keys[keys.length - 1]} className={`ul-level-${depth}`}>{children.map(child => <li>{child}</li>)}</ul>,
    'ordered-list-item': (children, {depth, keys}) => <ol key={keys.join('|')} className={`ol-level-${depth}`}>{children.map((child, index) => <li key={keys[index]}>{child}</li>)}</ol>,
    // If your blocks use meta data it can also be accessed like keys
    // 'atomic': (children, {keys, data}) => children.map((child, i) => <Atomic key={keys[i]} {...data[i]} />),
  },
  // /**
  //  * Entities receive children and the entity data
  //  */
  entities: {
    // key is the entity key value from raw
    // LINK: (children, data, { key }) => <Link key={key} to={data.url}>{children}<Link/>,
  },
};

class Renderer extends Component {

  constructor (props) {
    super(props);
  }

  shouldComponentUpdate() {
    return true;
  }
  renderWarning() {
    return <div>Nothing to render.</div>;
  }

  render() {
    const {raw} = this.props;
    if (!raw) {
      return this.renderWarning();
    }
    const rendered = redraft(raw, renderers);
    // redraft returns a null if there's nothing to render
    if (!rendered) {
      return this.renderWarning();
    }
    return (
      <div>
        {rendered}
      </div>
    );
  }
}

Renderer.propTypes = {
  // raw: PropTypes.object
};

export default Renderer;
