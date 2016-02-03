///<reference path='../../refs.d.ts' />

'use strict';

import * as React from 'react';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';

interface IContent {
  active?: number
  delta?: number
}

class SlideImage extends React.Component<IContent, {}> {
  render() {
    const { active } = this.props;
    return(
      <img className="slide" src={`img/00-0${active}.png`} />
    );
  }
}

class SlideVideo extends React.Component<IContent, {}> {
  render() {
    const { active } = this.props;
    return(
      <video className="slide" controls>
         <source src="indigo.ogg" type="video/ogg" />
      </video>
    );
  }
}

export class Content extends React.Component<IContent, {}> {
  render() {
    const { active, delta } = this.props;
    let direction = delta > 0 ? "content-left" : "content-right";
    // Фабрика, ептыть :)
    let component;
    if (active === 9) {
      component = <SlideVideo active={active} />
    } else {
      component = <SlideImage active={active} />
    }
    return (
      <ReactCSSTransitionGroup
        transitionName={direction}
        transitionEnterTimeout={400}
        transitionLeaveTimeout={400}>
          <div key={active} className="content">
            {component}
          </div>
      </ReactCSSTransitionGroup>
    );
  }
}
