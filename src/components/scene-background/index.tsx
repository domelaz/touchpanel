///<reference path='../../refs.d.ts' />

'use strict';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface IBack {
  xpos?: number
}

export class SceneBackground extends React.Component<IBack, {}> {
  /**
   * Real background image size, see in Gimp or Photoshop
   */
  protected imgHeight: number;
  protected imgWidth:  number;

  protected step: number;

  constructor(props) {
    super(props);
    this.imgHeight = 260; // @todo move in props
    this.imgWidth  = 600; // @todo move in props
    this.step      = 0;
  }

  /**
   * Parallax! Calculate horizontal shift amount based on current
   * screen size and real dimensions of background image
   */
  handleResize() {
    const bgImage = ReactDOM.findDOMNode(this);
    const ratio = bgImage.clientHeight / this.imgHeight;
    const actualWidth = this.imgWidth * ratio;
    const thumbnailsCount = 10; // @todo get in props
    this.step = ( bgImage.clientWidth - actualWidth ) / thumbnailsCount;
  }

  /**
   * Initial mount
   */
  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));
    this.handleResize();
  }

  render() {
    let style = { 'backgroundPositionX': ( this.props.xpos * this.step ) };
    return (
      <div style={style} className="scene-background"></div>
    );
  }
}
