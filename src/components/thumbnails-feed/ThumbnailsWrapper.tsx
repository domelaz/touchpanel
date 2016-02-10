///<reference path='../../refs.d.ts' />

'use strict';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface IWrapperProps {
  active: number,
  content: number,
  dim: any,
  children?: any
}

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

  /**
   * Initial mount
   */
  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  /**
   * Calculate horizontal shift if invisible thumbnails presents
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.active === this.props.active) return;
    this.handleResize();
    // If all thumbnails fits in screen do nothing;
    if (this.myWidth <= nextProps.dim.width) return;

    const contentItemWidth = this.myWidth / nextProps.content;
    const delta = nextProps.active > this.props.active ? 1 : -1;
    
    // Active element bounds
    const bLeft = (nextProps.active) * contentItemWidth + this.myPosition;
    const bRight = bLeft + contentItemWidth;

    let nextPosition = this.myPosition + contentItemWidth * -delta;

    // Right direction case and extremum
    if (bRight >= nextProps.dim.width) {
      const stop = nextProps.dim.width - this.myWidth - 100; // 100 = controls width
      if (nextProps.active === nextProps.content.length) { nextPosition = stop; }
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
    return (
      <div style={style} className="wrap">{this.props.children}</div>
    );
  }
}
