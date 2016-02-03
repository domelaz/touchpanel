///<reference path='../../refs.d.ts' />

'use strict';

import * as React from 'react';

interface IThumbProp {
  key: number,
  id: number,
  src: string,
  cls?: string,
  onThumbnailClick
}

export class Thumbnail extends React.Component<IThumbProp, {}> {
  defaultClass = 'thumbnail';

  getCSSClassString() {
    return this.props.cls ? `${this.defaultClass} ${this.props.cls}` : this.defaultClass;
  }

  render() {
    return (
      <div onClick={() => this.props.onThumbnailClick(this.props.id) }>
        <img className={this.getCSSClassString()} src={this.props.src} />
      </div>
    );
  }
}
