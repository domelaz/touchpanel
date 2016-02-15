///<reference path='../../refs.d.ts' />

'use strict';

import * as React from 'react';

interface IThumbProp {
  key: number,
  id: number,
  imagepath: string,
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
    const { id, src, imagepath, onThumbnailClick } = this.props;
    const dpr = Math.round(window.devicePixelRatio) || 1;
    const path = `${imagepath}/${dpr}x`;

    return (
      <div onClick={() => onThumbnailClick(id) }>
        <picture>
          <source media="(max-width: 736px)" srcSet={`${path}/sm/thumbs/${src}.png`} />
          <source media="(max-width: 960px)" srcSet={`${path}/md/thumbs/${src}.png`} />
          <source media="(max-width: 1440px)" srcSet={`${path}/lg/thumbs/${src}.png`} />
          <source media="(min-width: 1440px)" srcSet={`${path}/xl/thumbs/${src}.png`} />
          <img
            className={this.getCSSClassString()}
            src={`${path}/sm/thumbs/${src}.png`}
          />
        </picture>
      </div>
    );
  }
}
