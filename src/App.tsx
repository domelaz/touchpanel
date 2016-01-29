///<reference path="refs.d.ts" />

'use strict';

import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SceneBackground from './components/scene-background';
import ThumbnailsFeed from './components/thumbnails-feed';
import Content from './components/content';
import * as Actions from './actions';

interface IApp {
  active?: number,
  dispatch?(any): void
}

class App extends React.Component<IApp, {}> {
  render() {
    const { active, dispatch } = this.props;
    const actions = bindActionCreators(Actions, dispatch);

    return (
      <div className="app-container">
        <SceneBackground />
        <ThumbnailsFeed
          onThumbnailClick = {actions.thumbClick}
          thumbnails = {[2,3,4,5,6,7]}
          active = {this.props.active}
        />
        <Content active = {this.props.active} />
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