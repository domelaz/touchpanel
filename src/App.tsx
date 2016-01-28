///<reference path="refs.d.ts" />

'use strict';

import * as React from 'react';
import { connect } from 'react-redux';

import SceneBackground from './components/scene-background';
import ThumbnailsFeed from './components/thumbnails-feed';
import Content from './components/content';

class App extends React.Component<{}, {}> {
  render() {
    return (
      <div className="app-container">
        <SceneBackground />
        <ThumbnailsFeed thumbnails={[2,3,4,5,6,7]} />
        <Content />
      </div>
    );
  }
}

export default connect()(App);

