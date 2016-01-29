///<reference path='../../refs.d.ts' />

'use strict';

import * as React from 'react';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';

interface IContent {
  active?: number
}

export default class Content extends React.Component<IContent, {}> {
  render() {
    const { active } = this.props;
    return (
      <ReactCSSTransitionGroup
        transitionName="content"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}>
          <div key={active} className="content">
            <img className="slide" src={`img/00-0${active}.png`} />
          </div>
      </ReactCSSTransitionGroup>
    );
  }
}
