///<reference path='../../refs.d.ts' />

'use strict';

import * as React from 'react';

interface IContent {
  active?: number
}

export default class Content extends React.Component<IContent, {}> {
  render() {
    const { active } = this.props;
    return (
      <div className="content">
        <img className="slide" src={`img/00-0${active}.png`} />
      </div>
    );
  }
}
