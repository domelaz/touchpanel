///<reference path="refs.d.ts" />

'use strict';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { SceneBackground } from './components/scene-background';
import { ThumbnailsFeed } from './components/thumbnails-feed';
import { Content } from './components/content';
import * as Actions from './actions';

interface IApp {
  active?: number,
  delta?: number,
  dim?,
  feedposition?: number,
  dispatch?(any): void
}

class App extends React.Component<IApp, {}> {
  private actions: any;
  private thumbs: Array<number>;

  protected aCtx: AudioContext;
  protected sndBuffer: AudioBuffer;

  constructor(props) {
    super(props);
    this.actions = bindActionCreators(Actions, props.dispatch);
    this.thumbs = [1,2,3,4,5,6,7,8,9,10]; // @todo from props
    this.aCtx = new AudioContext();
    this.getAudio('media/touch.ogg');
  }

  /**
   * Load click sound
   */
  getAudio(path: string) {
    var request = new XMLHttpRequest();
    request.open('GET', path, true);
    request.responseType = 'arraybuffer';
    let self = this;
    request.onload = () => {
      self.aCtx.decodeAudioData(request.response, function(buffer) {
        self.sndBuffer = buffer;
      });
    };
    request.send();
  }

  playClick() {
    if (typeof(this.sndBuffer) === 'undefined') return;

    let source = this.aCtx.createBufferSource();
    source.buffer = this.sndBuffer;
    source.connect(this.aCtx.destination);

    source.start(0);
  }

  /**
   * Initial mount
   */
  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));
    this.handleResize();
  }

  /**
   * Keep dimensions in state
   */
  handleResize() {
    const dn = ReactDOM.findDOMNode(this);
    const dim = {
      width:  dn.clientWidth,
      height: dn.clientHeight
    };
    this.actions.resize(dim);
  }

  render() {
    const { active, delta, dim, feedposition, dispatch } = this.props;
    const actions = this.actions;

    return (
      <div className="app-container">
        <SceneBackground
          dim={dim}
          orientation="wide"
          xpos={active}
          steps={this.thumbs.length}
        />
        <ThumbnailsFeed
          onThumbnailClick = {actions.thumbClick}
          onNavClick = {actions.navClick}
          onFeedChange = {actions.moveFeed}
          feedposition = {feedposition}
          thumbnails = {this.thumbs}
          active = {active}
          delta = {delta}
          dim = {dim}
          playSound = {this.playClick.bind(this)}
        />
        <Content onSwipe = {actions.navClick} active = {active} delta = {delta} imagepath="img" />
      </div>
    );
  }
}

function select(state) {
  return {
    active: state.active,
    delta: state.delta,
    dim: state.dim,
    feedposition: state.feedposition,
  };
}

export default connect(select)(App);
