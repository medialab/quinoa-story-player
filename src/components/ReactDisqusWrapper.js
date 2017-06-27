import React, {Component} from 'react';
import ReactDisqusThread from 'react-disqus-thread';

class ReactDisqusWrapper extends Component {

  shouldComponentUpdate() {
    return false;
  }
  render() {
    const {
      shortName,
      identifier,
      title,
      url,
      onNewComment
    } = this.props;

    const handleNewComment = comment => {
      if (onNewComment && typeof onNewComment === 'function') {
        onNewComment(comment);
      }
    }


    return (
      <ReactDisqusThread
        shortname={shortName}
        identifier={identifier}
        title={title}
        url={url}
        onNewComment={handleNewComment} />
    );
  }
}

export default ReactDisqusWrapper;