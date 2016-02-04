///<reference path='../../refs.d.ts' />

'use strict';

import * as React from 'react';
import { Thumbnail } from '../thumbnail';
import { Navigate } from '../navigate';

interface IFeedProps {
  thumbnails: number[],
  active: number,
  onThumbnailClick(number): void,
  onNavClick(any): void
}

export class ThumbnailsFeed extends React.Component<IFeedProps, {}> {
  render() {
    const { thumbnails, active } = this.props;

    let thmSet = thumbnails.map(index =>
      <Thumbnail
        key={index}
        id={index}
        src={`img/sm/00-0${index}.png`}
        cls={(() => {
           if (active === index) { return 'thumbnail--active'; }
           if (index === active - 1 || index === active + 1) { return 'thumbnail--active-adjacend'; }
        })()}
        onThumbnailClick={this.props.onThumbnailClick}
      />
    );

    return (
      <div className="thumbnails-feed">
        <div className="nav-wrap">
          <Navigate dir="forth" onNavClick={this.props.onNavClick} />
          <Navigate dir="back" onNavClick={this.props.onNavClick} />
        </div>
        <div className="thumbnails-set">
          <div className="wrap">{thmSet}</div>
        </div>
      </div>
    );
  }
}
