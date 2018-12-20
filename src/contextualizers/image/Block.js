import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';


class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }


  componentDidMount() {
    // The portal element is inserted in the DOM tree after
    // the Modal's children are mounted, meaning that children
    // will be mounted on a detached DOM node. If a child
    // component requires to be attached to the DOM tree
    // immediately when mounted, for example to measure a
    // DOM node, or uses 'autoFocus' in a descendant, add
    // state to Modal and only render the children when Modal
    // is inserted in the DOM tree.
    const modalRoot = document.getElementById('modal-root');
    if (modalRoot) {
      modalRoot.appendChild(this.el);
    }
  }

  shouldComponentUpdate = () => true;

  componentWillUnmount() {
    const modalRoot = document.getElementById('modal-root');
    if (modalRoot) {
      modalRoot.removeChild(this.el);
    }
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el,
    );
  }
}


class ImageBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullscreen: false
    };
  }

  shouldComponentUpdate = () => true;

  render = () => {
    const {
      props: {
        resource,
      },
      context: {
        getResourceDataUrl,
      },
      state: {
        fullscreen = false
      }
    } = this;

    const { data } = resource;
    let src;
    if (typeof getResourceDataUrl === 'function' && data.filePath) {
      src = getResourceDataUrl(data);
    }
    else {
      src = data.base64 || data.src;
    }

    const handleThumbnailClick = () => {
      this.setState({
        fullscreen: true
      });
    };
    const handleLightboxClick = () => {
      this.setState({
        fullscreen: false
      });
    };
    return (
      <div className="quinoa-contextualization block image content-image">
        <img onClick={handleThumbnailClick} src={src} />

        <Modal>
          <div onClick={handleLightboxClick} className={`quinoa-contextualization-lightbox-container ${fullscreen ? 'visible' : 'hidden'}`}>
            <figure>
              <div className="lightbox-image-container">
                <img src={src} />
              </div>
              <figcaption>
                <h3>{resource.metadata.title}</h3>
                {
                  resource.metadata.authors && resource.metadata.authors.length > 0 &&
                  <h5>
                    {
                      resource.metadata.authors.join(', ')
                    }
                  </h5>
                }
                {
                  resource.metadata.description &&
                  <div className="lightbox-description">
                    {resource.metadata.description}
                  </div>
                }
                {
                  resource.metadata.source && resource.metadata.source &&
                  <div className="lightbox-source">
                    Source: {resource.metadata.source}
                  </div>
                }
              </figcaption>
            </figure>
          </div>
        </Modal>
      </div>
    );
  }
}

ImageBlock.contextTypes = {
  getResourceDataUrl: PropTypes.func
};

export default ImageBlock;
