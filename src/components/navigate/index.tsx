///<reference path='../../refs.d.ts' />

'use strict';

import * as React from 'react';

interface INavProps {
  dir: string,
  onNavClick?(any): void
}

export default class Navigate extends React.Component<INavProps, {}> {
  render() {
    return (
      <div className={(() => {
        switch(this.props.dir) {
          case "back":  return "thumbnails-nav";
          case "forth": return "thumbnails-nav thumbnails-nav--right";
        }
      })()}
      onClick={() => this.props.onNavClick(this.props.dir)}></div>
    );
  }
}
