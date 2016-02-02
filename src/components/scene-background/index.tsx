///<reference path='../../refs.d.ts' />

'use strict';

import * as React from 'react';

interface IBack {
  xpos?: number
}

export default class SceneBackground extends React.Component<IBack, {}> {
  render() {
    let style = { 'backgroundPositionX': ( this.props.xpos - 2 ) * -100 };
    return (
      <div style={style} className="scene-background"></div>
    );
  }
}
