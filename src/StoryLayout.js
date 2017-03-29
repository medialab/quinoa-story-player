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

    this.state = {
      inCover: true
    };
  }

  componentDidMount() {
    this.springSystem = new SpringSystem();
    this.spring = this.springSystem.createSpring();
    this.spring.addListener({onSpringUpdate: this.handleSpringUpdate});

    // const isFirefox = typeof InstallTrigger !== 'undefined';
    // if (this.globalScrollbar)  {
    //   this.globalScrollbar.refs.view.addEventListener(isFirefox ? 'wheel' : 'mousewheel', (e) => {
    //     if (!this.state.inCover) {
    //       e.preventDefault();
    //       e.stopPropagation();
    //     }
    //   }, false);
    // }
  }
  scrollToContents () {
    const scrollHeight = this.globalScrollbar.getScrollHeight();
    this.scrollTop(scrollHeight / 2);
    this.setState({
      inCover: false
    });
  }
  scrollToCover () {
    this.scrollTop(-1000);
    this.setState({
      inCover: true
    });
  }

  scrollTop(top) {
        const scrollbars = this.globalScrollbar;
        const scrollTop = scrollbars.getScrollTop();
        const scrollHeight = scrollbars.getScrollHeight();
        const val = MathUtil.mapValueInRange(top, 0, scrollHeight, scrollHeight * 0.2, scrollHeight * 0.8);
        this.spring.setCurrentValue(scrollTop).setAtRest();
        this.spring.setEndValue(val);
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
    const bindGlobalScrollbarRef = scrollbar => {
      this.globalScrollbar = scrollbar;
    };
    return (
      <section className="wrapper">
        <Scrollbars
          ref={bindGlobalScrollbarRef}
          autoHide
          universal>
          <header
            onClick={this.scrollToContents}
            className="header"
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

            <nav className="nav">
              <h2 onClick={this.scrollToCover}>{metadata.title || 'Quinoa story'}</h2>
            </nav>
          </section>
        </Scrollbars>
      </section>
    );
  }
}

export default PresentationLayout;

