///<reference path='../../refs.d.ts' />

'use strict';

import * as React from 'react';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';

interface IContent {
  active?: number
  delta?: number
}

export default class Content extends React.Component<IContent, {}> {
  render() {
    const { active, delta } = this.props;
    let direction = delta > 0 ? "content-left" : "content-right";
    return (
      <ReactCSSTransitionGroup
        transitionName={direction}
        transitionEnterTimeout={400}
        transitionLeaveTimeout={400}>
          <div key={active} className="content">
            <img className="slide" src={`img/00-0${active}.png`} />
          </div>
      </ReactCSSTransitionGroup>
    );
  }
}
