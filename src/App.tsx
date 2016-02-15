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
  dispatch?(any): void
}

class App extends React.Component<IApp, {}> {
  private actions: any;
  private thumbs: Array<number>;

  constructor(props) {
    super(props);
    this.actions = bindActionCreators(Actions, props.dispatch);
    this.thumbs = [1,2,3,4,5,6,7,8,9,10]; // @todo from props
  }

  /**
   * Initial mount
   */
  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));
    this.handleResize();
    this.setBgAudio();
  }

  setBgAudio() {
    let bgAudio = new AudioContext();
    var request = new XMLHttpRequest();
    request.open('GET', 'media/machinery.ogg', true);
    request.responseType = 'arraybuffer';
    request.onload = function() {
      bgAudio.decodeAudioData(request.response, function(buffer) {
        let source = bgAudio.createBufferSource();
        source.buffer = buffer;
        source.connect(bgAudio.destination);
        source.start(0);
      });
    };
    request.send();
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
    const { active, delta, dim, dispatch } = this.props;
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
          thumbnails = {this.thumbs}
          active = {active}
          delta = {delta}
          dim = {dim}
        />
        <Content active = {active} delta = {delta} imagepath="img" />
      </div>
    );
  }
}

function select(state) {
  return {
    active: state.active,
    delta: state.delta,
    dim: state.dim
  };
}

export default connect(select)(App);
