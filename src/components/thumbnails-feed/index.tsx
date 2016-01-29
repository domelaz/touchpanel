///<reference path='../../refs.d.ts' />

'use strict';

import * as React from 'react';
import Thumbnail from '../thumbnail';
import Navigate from '../navigate';

interface IFeedProps {
  thumbnails: number[],
  active: number,
  onThumbnailClick(number): void,
  onNavClick(any): void
}

export default class ThumbnailsFeed extends React.Component<IFeedProps, {}> {
  render() {
    const { thumbnails, active } = this.props;

    let thmSet = thumbnails.map(index =>
      <Thumbnail
        key={index}
        id={index}
        src={`img/00-0${index}.png`}
        cls={active === index ? 'thumbnail--active' : undefined}
        onThumbnailClick={this.props.onThumbnailClick}
      />
    );

    return (
      <div className="thumbnails-feed">
        <Navigate dir="back" onNavClick={this.props.onNavClick} />
        <div className="thumbnails-set">{thmSet}</div>
        <Navigate dir="forth" onNavClick={this.props.onNavClick} />
      </div>
    );
  }
}
