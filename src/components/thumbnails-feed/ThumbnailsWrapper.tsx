///<reference path='../../refs.d.ts' />

'use strict';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface IWrapperProps {
  active: number,
  dim: any,
  children?: any
}

let swipeDelta = { x: null, y: null };
let swipeBack;

export class ThumbnailsWrapper extends React.Component<IWrapperProps, {}> {
  private myPosition: number;
  private myWidth:    number;

  constructor(props) {
    super(props);
    this.myPosition = 0;
    this.myWidth    = 100;
  }

  handleResize() {
    const el = ReactDOM.findDOMNode(this);
    this.myWidth = el.clientWidth;
  }

  handleTouch<TouchEvent>(e): void {
    const touch = e.changedTouches[0];
    switch (e.type) {
      case "touchstart":
        swipeBack = undefined;
        swipeDelta.x = touch.pageX;
        break;
      case "touchmove":
        const delta = touch.pageX - swipeDelta.x; 
        const stop = -420;
        swipeDelta.x = touch.pageX;
        let nextPosition = this.myPosition + delta;
        if (delta > 0 && nextPosition >= 0) {
          nextPosition = this.myPosition + (delta / 5);
          swipeBack = 0;
        }
        if (delta < 0 && nextPosition < stop) {
          nextPosition = this.myPosition + (delta / 5);
          swipeBack = stop;
        }
        this.myPosition = nextPosition;
        this.forceUpdate();
        break;
      case "touchend":
        if (!isNaN(swipeBack)) {
          this.myPosition = swipeBack;
          this.forceUpdate();
        }
        break;
      case "touchcancel":
        break;
    }
  }

  /**
   * Initial mount
   */
  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  /**
   * Calculate horizontal shift if invisible thumbnails presents
   */
  componentWillReceiveProps(nextProps: IWrapperProps) {
    if (nextProps.active === this.props.active) return;
    this.handleResize();
    // If all thumbnails fits in screen do nothing;
    if (this.myWidth <= nextProps.dim.width) return;

    const contentLength = React.Children.count(this.props.children);
    const contentItemWidth = this.myWidth / contentLength;
    const delta = nextProps.active > this.props.active ? 1 : -1;

    // Active element bounds
    const bLeft = (nextProps.active) * contentItemWidth + this.myPosition;
    const bRight = bLeft + contentItemWidth;

    let nextPosition = this.myPosition + contentItemWidth * -delta;

    // Right direction case and extremum
    if (bRight >= nextProps.dim.width) {
      const stop = nextProps.dim.width - this.myWidth - 100; // 100 = controls width
      if (nextProps.active === contentLength) { nextPosition = stop; }
      this.myPosition = nextPosition;
    }

    // Left direction case and extremum
    if (bLeft + this.myPosition < 0) {
      if (nextProps.active === 1) { nextPosition = 0; }
      this.myPosition = nextPosition;
    }
  }

  render() {
    let style = { 'transform': `translate3d(${this.myPosition}px, 0, 0)` };
    const touches = {
      onTouchStart:  this.handleTouch,
      onTouchMove:   this.handleTouch.bind(this),
      onTouchEnd:    this.handleTouch.bind(this),
      onTouchCancel: this.handleTouch
    };

    return (
      <div style={style} {...touches} className="wrap">{this.props.children}</div>
    );
  }
}
