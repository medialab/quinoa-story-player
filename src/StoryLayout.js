import React, {Component} from 'react';
import {Scrollbars} from 'react-custom-scrollbars';
import {SpringSystem, MathUtil} from 'rebound';

import Renderer from './Renderer';

class PresentationLayout extends Component {

  constructor(props) {
    super(props);
    this.scrollToContents = this.scrollToContents.bind(this);
    this.scrollToCover = this.scrollToCover.bind(this);
    this.handleSpringUpdate = this.handleSpringUpdate.bind(this);
    this.scrollTop = this.scrollTop.bind(this);
    this.onScrollUpdate = this.onScrollUpdate.bind(this);
    this.buildTOC = this.buildTOC.bind(this);
    this.scrollToTitle = this.scrollToTitle.bind(this);

    this.state = {
      inCover: true,
      toc: [],
      scrollTop: 0
    };
  }

  componentDidMount() {
    this.springSystem = new SpringSystem();
    this.spring = this.springSystem.createSpring();
    this.spring.addListener({onSpringUpdate: this.handleSpringUpdate});
  }
  scrollToContents () {
    this.scrollTop(this.header.offsetHeight);
    this.setState({
      inCover: false
    });
  }
  scrollToCover () {
    this.scrollTop(0);
    this.setState({
      inCover: true
    });
  }

  onScrollUpdate (evt) {
    const scrollTop = evt.scrollTop;
    const headerHeight = this.header.offsetHeight;
    if (scrollTop < headerHeight && !this.state.inCover) {
      this.setState({
        inCover: true
      });
    }
    else if (scrollTop > headerHeight && this.state.inCover) {
      this.setState({
        inCover: false
      });
    }

    if (scrollTop !== this.state.scrollTop) {
      const toc = this.buildTOC(this.props.story.content, scrollTop);
      this.setState({
        toc,
        scrollTop
      });
    }
  }

  scrollTop(top) {
      const scrollbars = this.globalScrollbar;
      const scrollTop = scrollbars.getScrollTop();
      const scrollHeight = scrollbars.getScrollHeight();
      const val = MathUtil.mapValueInRange(top, 0, scrollHeight, 0, scrollHeight);
      this.spring.setCurrentValue(scrollTop).setAtRest();
      this.spring.setEndValue(val);
  }

  buildTOC (content, scrollTop) {
    const headers = content.blocks
    .filter(block => block.type.indexOf('header') === 0);
    return headers
    .map((block, index) => {
      const {type, text, key} = block;
      const levelStr = type.split('header-').pop();
      let level;
      switch (levelStr) {
        case 'one':
          level = 1;
          break;
        case 'two':
          level = 2;
          break;
        case 'three':
          level = 3;
          break;
        case 'four':
          level = 4;
          break;
        case 'five':
          level = 5;
          break;
        case 'six':
        default:
          level = 6;
          break;
      }

      const title = document.getElementById(key);
      const titleOffsetTop = title.offsetTop + title.offsetParent.offsetParent.offsetTop;
      let nextTitleOffsetTop;
      if (index < headers.length - 1) {
        const next = headers[index + 1];
        const nextTitle = document.getElementById(next.key);
        nextTitleOffsetTop = nextTitle.offsetTop + title.offsetParent.offsetParent.offsetTop;
      }
      let active;
      if (titleOffsetTop <= scrollTop &&
          (nextTitleOffsetTop === undefined || nextTitleOffsetTop >= scrollTop)
        ) {
        active = true;
      }
      return {
        level,
        text,
        key,
        active
      };
    });
  }

  scrollToTitle (id) {
    const title = document.getElementById(id);
    this.scrollTop(title.offsetTop + title.offsetParent.offsetParent.offsetTop);
  }

  handleSpringUpdate(spring) {
    const val = spring.getCurrentValue();
    this.globalScrollbar.scrollTop(val);
  }

  render() {
    const {
      story: {
        metadata,
        content
      }
    } = this.props;
    const {
      inCover,
      toc
    } = this.state;
    const bindGlobalScrollbarRef = scrollbar => {
      this.globalScrollbar = scrollbar;
    };
    const bindHeaderRef = header => {
      this.header = header;
    };

    return (
      <section className="wrapper">
        <Scrollbars
          ref={bindGlobalScrollbarRef}
          autoHide
          onUpdate={this.onScrollUpdate}
          universal>
          <header
            onClick={this.scrollToContents}
            className="header"
            ref={bindHeaderRef}
            style={{
              backgroundImage: metadata.coverImage ? 'url(' + metadata.coverImage + ')' : undefined
            }}>
            <div
              className="header-content">
              <h1>
                {metadata.title || 'Quinoa story'}
              </h1>
              {
                metadata.authors && metadata.authors.length ?
                  <div className="authors">
                    {
                    metadata.authors.map(author => author).join(', ')
                  }
                  </div>
                : null
              }
            </div>
          </header>
          <section
            className="body-wrapper">
            <section className="contents-wrapper">
              <Renderer raw={content} />
            </section>

            <nav
              className="nav"
              style={{
                position: inCover ? 'relative' : 'fixed'
              }}>
              <h2 onClick={this.scrollToCover}>{metadata.title || 'Quinoa story'}</h2>
              <ul className="table-of-contents">
                {
                  toc.map((item, index) => {
                    const onClick = (e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      this.scrollToTitle(item.key);
                    };
                    return (
                      <li
                        key={index}
                        className={'level-' + item.level + (item.active ? ' active' : '')}>
                        <a href={'#' + item.key}
                          onClick={onClick}>
                          {item.text}
                        </a>
                      </li>
                  );
})
                }
              </ul>
            </nav>
          </section>
        </Scrollbars>
      </section>
    );
  }
}

export default PresentationLayout;

