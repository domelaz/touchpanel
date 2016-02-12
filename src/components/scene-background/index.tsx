///<reference path='../../refs.d.ts' />

'use strict';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface IBackProps {
  xpos:        number,
  steps:       number,
  orientation: string,
  dim:         any,
}

export class SceneBackground extends React.Component<IBackProps, {}> {
  /**
   * Shift amount
   */
  protected step: number;
  protected wide: boolean;

  constructor(props) {
    super(props);
    this.step = 0;
    this.wide = true;
  }

  /**
   * Parallax! Calculate horizontal shift amount based on current
   * screen size and real dimensions of background image
   */
  handleResize() {
    const { steps, orientation, dim } = this.props;

    const isWide = ['wide', 'long', 'landscape'].indexOf(orientation) !== -1;
    const measure = isWide ? 'Width' : 'Height';

    const bgImage = ReactDOM.findDOMNode(this);
    const thisSize = bgImage[`client${measure}`];
    const outerSize = dim ? dim[measure.toLowerCase()] : 0;

    this.step = ( outerSize - thisSize ) / steps;

    if (this.step > 0) {
      this.step = 0; // Background fits in screen completely
    }

    this.wide = isWide;
  }

  /**
   * Initial mount
   *
   * Fire handleResize when background image fully
   * loaded to get real sizes
   */
  componentDidMount() {
    const img = ReactDOM.findDOMNode(this);
    const fn = this.handleResize.bind(this);

    img.addEventListener('load', () => {
      fn();
      img.removeEventListener('load', fn);
    });
  }

  componentDidUpdate(prevProps: IBackProps) {
    // Parent component provide their dimensions via props
    // and pass changes from single window.resize event
    if (prevProps.dim !== this.props.dim) {
      this.handleResize();
    }
  }

  render() {
    const shift = (this.props.xpos - 1) * this.step;
    const amount = this.wide ? `${shift}px, 0` : `0, ${shift}px`;
    const style = { transform: `translate3d(${amount}, 0)` };

    return (
      <img style={style} className="scene-background" src="img/background.png"/>
    );
  }
}
