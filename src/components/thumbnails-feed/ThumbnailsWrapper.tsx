///<reference path='../../refs.d.ts' />

'use strict';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface IWrapperProps {
  active:      number,
  dim:         any,
  orientation: string,
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
  private myPosition:  number;
  private dimensions:  IWrapperDims;
  private orientation: string;

  constructor(props) {
    super(props);
    this.myPosition = 0;
  }

  handleResize() {
    const el = ReactDOM.findDOMNode(this);

    const { orientation, dim } = this.props;

    const isWide = ['wide', 'long', 'landscape'].indexOf(orientation) !== -1;
    const dWrapper  = isWide ? el.clientWidth : el.clientHeight;
    const dParent   = isWide ? dim.width : dim.height;
    const dControls = 100; // @todo css size of nav-wrap, move it from here
    const items = React.Children.count(this.props.children);
    const dContentItem = dWrapper / items;

    this.dimensions = {
      spread: dWrapper,
      fit: dWrapper <= dParent,
      item: dContentItem,
      stopLeft: 0,
      stopRight: dParent - dWrapper - dControls,
    };
  }

  handleTouch<TouchEvent>(e): void {
    if (typeof(this.dimensions) === 'undefined') {
      this.handleResize();
    }

    // If all thumbnails fits in screen do nothing;
    if (this.dimensions.fit) return;

    const { stopLeft, stopRight } = this.dimensions;

    const touch = e.changedTouches[0];
    switch (e.type) {
      case "touchstart":
        swipeBack = undefined;
        swipeDelta.x = touch.pageX;
        break;
      case "touchmove":
        const delta = touch.pageX - swipeDelta.x; 
        swipeDelta.x = touch.pageX;
        let nextPosition = this.myPosition + delta;
        if (delta > 0 && nextPosition >= 0) {
          nextPosition = this.myPosition + (delta / 5);
          swipeBack = stopLeft;
        }
        if (delta < 0 && nextPosition < stopRight) {
          nextPosition = this.myPosition + (delta / 5);
          swipeBack = stopRight;
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
    this.dimensions = undefined;
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

    const { spread, item, stopLeft, stopRight } = this.dimensions;
    const items = React.Children.count(this.props.children);

    const delta = nextProps.active > this.props.active ? 1 : -1;

    // Active element bounds
    const bLeft = (nextProps.active) * item + this.myPosition;
    const bRight = bLeft + item;

    let nextPosition = this.myPosition + item * -delta;

    // Right direction case and extremum
    if (bRight >= nextProps.dim.width) {
      if (nextProps.active === items) { nextPosition = stopRight; }
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
