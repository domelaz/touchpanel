///<reference path='../../refs.d.ts' />

'use strict';

import * as React from 'react';

interface IThumbProp {
  src: string,
  cls?: string
}

export default class Thumbnail extends React.Component<IThumbProp, {}> {
  render() {
    return (
      <img className={this.props.cls || 'thumbnail'} src={this.props.src} />
    );
  }
}
