///<reference path='../../refs.d.ts' />

'use strict';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface IWrapperProps {
  active:      number,
  dim:         any,
  pos:         number,
  orientation: string,
  onSwipe(any): void,
  children?:   any
}

interface IWrapperDims {
  spread:    number, // Width or height of wrapper
  fit:       boolean, // If wrapper fits in parent
  item:      number, // Child item width or height
  stopLeft:  number, // Left extremum
  stopRight: number, // Right extremum
}

let swipeDelta = { x: null, y: null };
let swipeBack;

export class ThumbnailsWrapper extends React.Component<IWrapperProps, {}> {
  private dimensions:  IWrapperDims;
  private orientation: string;

  handleResize() {
    const el = ReactDOM.findDOMNode(this) as HTMLElement;

    const { orientation, dim } = this.props;

    const isWide = ['wide', 'long', 'landscape'].indexOf(orientation) !== -1;
    const dWrapper  = isWide ? el.clientWidth : el.clientHeight;
    const dParent   = isWide ? dim.width : dim.height;
    const dControls = isWide ? el.offsetLeft : el.offsetTop;
    const items = React.Children.count(this.props.children);
    const dContentItem = dWrapper / items;

    this.dimensions = {
      spread: dWrapper,
      fit: dWrapper <= dParent,
      item: dContentItem,
      stopLeft: 0,
      stopRight: dParent - dWrapper - (dControls * 1.5),
    };
  }

  handleTouch<TouchEvent>(e): void {
    if (typeof(this.dimensions) === 'undefined') {
      this.handleResize();
    }

    // If all thumbnails fits in screen do nothing;
    if (this.dimensions.fit) return;

    const { stopLeft, stopRight } = this.dimensions;
    const pos = this.props.pos;

    const touch = e.changedTouches[0];
    switch (e.type) {
      case "touchstart":
        swipeBack = undefined;
        swipeDelta.x = touch.pageX;
        break;
      case "touchmove":
        const delta = touch.pageX - swipeDelta.x; 
        swipeDelta.x = touch.pageX;
        let nextPosition = pos + delta;
        if (delta > 0 && nextPosition >= 0) {
          nextPosition = pos + (delta / 5);
          swipeBack = stopLeft;
        }
        if (delta < 0 && nextPosition < stopRight) {
          nextPosition = pos + (delta / 5);
          swipeBack = stopRight;
        }
        this.props.onSwipe(nextPosition);
        break;
      case "touchend":
        if (!isNaN(swipeBack)) {
          this.props.onSwipe(swipeBack);
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
    this.dimensions = undefined;

    // Calculate initial dimensions when all content loaded
    const fn = this.handleResize.bind(this);
    window.addEventListener('load', () => {
      fn();
      window.removeEventListener('load', fn);
    });
  }

  componentDidUpdate(prevProps: IWrapperProps) {
    // Parent component provide their dimensions via props
    // and pass changes from single window.resize event
    if (prevProps.dim !== this.props.dim) {
      this.handleResize();
    }
  }

  /**
   * Calculate horizontal shift if invisible thumbnails presents
   */
  componentWillReceiveProps(nextProps: IWrapperProps) {
    if (nextProps.active === this.props.active) return;

    if (typeof(this.dimensions) === 'undefined') {
      this.handleResize();
    }

    // If all thumbnails fits in screen do nothing;
    if (this.dimensions.fit) return;

    const { pos, onSwipe } = this.props;
    const { spread, item, stopLeft, stopRight } = this.dimensions;
    const items = React.Children.count(this.props.children);

    const delta = nextProps.active > this.props.active ? 1 : -1;

    // Active element bounds
    const bLeft = (nextProps.active) * item + pos;
    const bRight = bLeft + item;

    let nextPosition = pos + item * -delta;

    // Right direction case and extremum
    if (bRight >= nextProps.dim.width) {
      if (nextProps.active === items) { nextPosition = stopRight; }
      onSwipe(nextPosition);
    }

    // Left direction case and extremum
    if (bLeft + pos < 0) {
      if (nextProps.active === 1) { nextPosition = 0; }
      onSwipe(nextPosition);
    }
  }

  render() {
    const style = { 'transform': `translate3d(${this.props.pos}px, 0, 0)` };

    const touches = {
      onTouchStart:  this.handleTouch.bind(this),
      onTouchMove:   this.handleTouch.bind(this),
      onTouchEnd:    this.handleTouch.bind(this),
      onTouchCancel: this.handleTouch.bind(this),
    };

    return (
      <div style={style} {...touches} className="wrap">{this.props.children}</div>
    );
  }
}
