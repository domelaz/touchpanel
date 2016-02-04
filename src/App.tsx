///<reference path="refs.d.ts" />

'use strict';

import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { SceneBackground } from './components/scene-background';
import { ThumbnailsFeed } from './components/thumbnails-feed';
import { Content } from './components/content';
import * as Actions from './actions';

interface IApp {
  active?: number,
  delta?: number,
  dispatch?(any): void
}

class App extends React.Component<IApp, {}> {
  private actions: any;

  constructor(props) {
    super(props);
    this.actions = bindActionCreators(Actions, props.dispatch);
  }

  render() {
    const { active, delta, dispatch } = this.props;
    const actions = this.actions;

    return (
      <div className="app-container">
        <SceneBackground xpos = {this.props.active} />
        <ThumbnailsFeed
          onThumbnailClick = {actions.thumbClick}
          onNavClick = {actions.navClick}
          thumbnails = {[1,2,3,4,5,6,7,8,9,10]}
          active = {this.props.active}
        />
        <Content active = {this.props.active} delta = {delta} />
      </div>
    );
  }
}

function select(state) {
  return {
    active: state.active,
    delta: state.delta
  };
}

export default connect(select)(App);
