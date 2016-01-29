///<reference path="refs.d.ts" />

'use strict';

import * as React from 'react';
import { connect } from 'react-redux';

import SceneBackground from './components/scene-background';
import ThumbnailsFeed from './components/thumbnails-feed';
import Content from './components/content';

interface IApp {
  active?: number
}

class App extends React.Component<IApp, {}> {
  render() {
    const { active } = this.props;
    return (
      <div className="app-container">
        <SceneBackground />
        <ThumbnailsFeed thumbnails={[2,3,4,5,6,7]} active={this.props.active} />
        <Content />
      </div>
    );
  }
}

function select(state) {
  return {
    active: state
  };
}

export default connect(select)(App);
