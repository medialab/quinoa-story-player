/* eslint react/jsx-key : 0 */
import React, {Component} from 'react';
import redraft from 'redraft';
import AssetPreview from './AssetPreview/AssetPreview';
import PropTypes from 'prop-types';

/**
 *  You can use inline styles or classNames inside your callbacks
 */
const styles = {
  code: {
    // backgroundColor: 'rgba(0, 0, 0, 0.05)',
    // fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    // fontSize: 16,
    // padding: 2,
  },
  codeBlock: {
    // backgroundColor: 'rgba(0, 0, 0, 0.05)',
    // fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    // fontSize: 16,
    // padding: 20,
  },
};

// just a helper to add a <br /> after a block
const addBreaklines = (children) => children.map(child => [child, <br />]);

const Link = ({
  to,
  children
}) => <a href={to} target="blank">{children}</a>;

const AssetWrapper = ({
  data
}, context) => {
  const assetId = data.asset.id;
  const contextualization = context.story && context.story.contextualizations && context.story.contextualizations[assetId];
  if (!contextualization) {
    return null;
  }
  const asset = {
    ...contextualization,
    contextualizer: context.story.contextualizers[contextualization.contextualizerId],
    resource: context.story.resources[contextualization.resourceId],

  };
  const dimensions = context.dimensions;
  const fixedPresentationId = context.fixedPresentationId;
  const onExit = context.onExit;
  if (asset) {
    const resource = asset.resource;
    const assetType = asset.contextualizer.type;
    return (
      <figure
        style={{
          position: 'relative',
          minHeight: (dimensions && dimensions.height) || '10em'
        }}
        id={assetId}>
        <AssetPreview
          type={assetType}
          resource={resource}
          options={{
            template: 'scroller'
          }}
          fixed={fixedPresentationId === assetId}
          onExit={onExit} />
        <figcaption>
          {/*
          {metadata.title && <h4>
            {metadata.title}
          </h4>}
          {metadata.description && <p>
            {metadata.description}
          </p>}
          {metadata.source && <p>
            <i>{metadata.source}</i>
          </p>}
        */}
        </figcaption>
      </figure>
    );
  }
 else {
    return null;
  }
};

AssetWrapper.contextTypes = {
  story: PropTypes.object,
  dimensions: PropTypes.object,
  fixedPresentationId: PropTypes.string,
  onExit: PropTypes.func
};

const CitationContainer = ({
  data,
}, context) => {
  const citations = context.citations;
  const id = data.asset.id;
  if (citations) {
    const citation = citations[id];
    if (citation) {
      const CitComponent = citation.Component;
      return (<cite id={id}>
        {CitComponent}
      </cite>);
    }
    return null;
  }
  return null;
};
CitationContainer.contextTypes = {
  citations: PropTypes.object
};

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
    'unstyled': (children) => children.map(child => <p>{child}</p>),
    'blockquote': (children) => <blockquote >{addBreaklines(children)}</blockquote>,
    // 'header-one': (children) => children.map(child => <h1>{child}</h1>),
    // 'header-two': (children) => children.map(child => <h2>{child}</h2>),
    'header-one': (children, {keys}) => children.map((child, index) => <h1 key={index} id={keys[index]}>{child}</h1>),
    'header-two': (children, {keys}) => children.map((child, index) => <h2 key={index} id={keys[index]}>{child}</h2>),
    'header-three': (children, {keys}) => children.map((child, index) => <h3 key={index} id={keys[index]}>{child}</h3>),
    'header-four': (children, {keys}) => children.map((child, index) => <h4 key={index} id={keys[index]}>{child}</h4>),
    'header-five': (children, {keys}) => children.map((child, index) => <h5 key={index} id={keys[index]}>{child}</h5>),
    'header-six': (children, {keys}) => children.map((child, index) => <h6 key={index} id={keys[index]}>{child}</h6>),

    // You can also access the original keys of the blocks
    'code-block': (children, {keys}) => <pre style={styles.codeBlock} key={keys[0]} >{addBreaklines(children)}</pre>,
    // or depth for nested lists
    'unordered-list-item': (children, {depth, keys}) => <ul key={keys[keys.length - 1]} className={`ul-level-${depth}`}>{children.map((child, index) => <li key={index}>{child}</li>)}</ul>,
    'ordered-list-item': (children, {depth, keys}) => <ol key={keys.join('|')} className={`ol-level-${depth}`}>{children.map((child, index) => <li key={keys[index]}>{child}</li>)}</ol>,
    // If your blocks use meta data it can also be accessed like keys
    // atomic: (children, { keys, data }) => children.map((child, i) => <Atomic key={keys[i]} {...data[i]}>{child}</Atomic>),
  },
  // /**
  //  * Entities receive children and the entity data
  //  */
  entities: {
  //   // key is the entity key value from raw
    LINK: (children, data, {key}) =>
      <Link key={key} to={data.url}>{children}</Link>,
      // <Link key={key} to={data.url}>{children}<Link/>,
    BLOCK_ASSET: (children, data, {key}) => {
      return <AssetWrapper key={key} data={data} />;
    },
    INLINE_ASSET: (children, data, {key}) => {
      return <CitationContainer data={data} key={key} />;
    },
    // 'DATA-PRESENTATION': (children, data, {key}) => {
    //   return <AssetWrapper key={key} data={data} assetType="data-presentation" />;
    // },
    // 'IMAGE': (children, data, {key}) => {
    //   return <AssetWrapper key={key} data={data} assetType="image" />;
    // },
    // 'VIDEO': (children, data, {key}) => {
    //   return <AssetWrapper key={key} data={data} assetType="video" />;
    // },
    // 'EMBED': (children, data, {key}) => {
    //   return <AssetWrapper key={key} data={data} assetType="embed" />;
    // },
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
