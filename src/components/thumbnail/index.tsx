///<reference path='../../refs.d.ts' />

'use strict';

import * as React from 'react';

interface IThumbProp {
  key: number,
  src: string,
  cls?: string
}

export default class Thumbnail extends React.Component<IThumbProp, {}> {
  defaultClass = 'thumbnail';

  getCSSClassString() {
    return this.props.cls ? `${this.defaultClass} ${this.props.cls}` : this.defaultClass;
  }

  render() {
    return (
      <img className={this.getCSSClassString()} src={this.props.src} />
    );
  }
}
