///<reference path='../../refs.d.ts' />

'use strict';

import * as React from 'react';

interface INavProps {
  dir: string,
  onNavClick?(any): void,
  active: number,
  stop?: number
}

export class Navigate extends React.Component<INavProps, {}> {
  render() {
    let classes;

    switch(this.props.dir) {
      case "back":
        classes = "thumbnails-nav";
        if (this.props.active === 1) classes += ' disabled'
        break;
      case "forth":
        classes = "thumbnails-nav thumbnails-nav--right";
        if (this.props.active === this.props.stop) classes += ' disabled'
        break;
    }

    return (
      <div className={classes} onClick={() => this.props.onNavClick(this.props.dir)}></div>
    );
  }
}
