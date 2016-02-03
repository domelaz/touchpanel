///<reference path='../../refs.d.ts' />

'use strict';

import * as React from 'react';

interface IBack {
  xpos?: number
}

export class SceneBackground extends React.Component<IBack, {}> {
  render() {
    let style = { 'backgroundPositionX': ( this.props.xpos ) * -60 };
    return (
      <div style={style} className="scene-background"></div>
    );
  }
}
