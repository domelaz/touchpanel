///<reference path='../../refs.d.ts' />

'use strict';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import * as Hammer from 'hammerjs';

interface IContent {
  active?: number,
  delta?: number,
  imagepath?: string,
  stop?: number,
  onSwipe?(any): void,
  playSound?(): void,
}

class SlideImage extends React.Component<IContent, {}> {
  render() {
    const { active, imagepath } = this.props;
    const dpr = Math.round(window.devicePixelRatio) || 1;
    const path = `${imagepath}/${dpr}x`;
    const src = `00-0${active}.png`;

    return(
      <picture>
        <source media="(max-width: 736px)" srcSet={`${path}/sm/${src}`} />
        <source media="(max-width: 960px)" srcSet={`${path}/md/${src}`} />
        <source media="(max-width: 1440px)" srcSet={`${path}/lg/${src}`} />
        <source media="(min-width: 1440px)" srcSet={`${path}/xl/${src}`} />

        <img className="slide" src={`${imagepath}/${dpr}x/sm/${src}`} />
      </picture>
    );
  }
}

class SlideVideo extends React.Component<IContent, {}> {
  render() {
    const { active } = this.props;
    return(
      <video className="slide" controls>
         <source src="media/indigo.ogg" type="video/ogg" />
      </video>
    );
  }
}

export class Content extends React.Component<IContent, {}> {
  componentDidMount() {
    const el = ReactDOM.findDOMNode(this);
    const mc = new Hammer.Manager(el as HTMLElement);
    const Swipe = new Hammer.Swipe();
    mc.add(Swipe);

    const self = this;

    mc.on('swipe', (event) => {
      const { active, onSwipe } = self.props;
      if (event.deltaX > 0 && active !== 1) {
        onSwipe('back');
        this.props.playSound();
      }
      if (event.deltaX < 0 && active !== this.props.stop) {
        onSwipe('forth');
        this.props.playSound();
      }
    });
  }
  render() {
    const { active, delta, imagepath } = this.props;
    let direction = delta > 0 ? "content-left" : "content-right";
    // Фабрика, ептыть :)
    let component;
    if (active === 9) {
      component = <SlideVideo active={active} />
    } else {
      component = <SlideImage active={active} imagepath={imagepath} />
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
