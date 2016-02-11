///<reference path='../../refs.d.ts' />

'use strict';

import * as React from 'react';

import { Thumbnail } from '../thumbnail';
import { Navigate } from '../navigate';
import { ThumbnailsWrapper } from './ThumbnailsWrapper';

interface IFeedProps {
  thumbnails: number[],
  active: number,
  onThumbnailClick(number): void,
  onNavClick(any): void,
  dim: any,
  delta: number
}

/**
 * CSS classes
 */
const css_act = 'thumbnail--active';
const css_adj = 'thumbnail--active-adjacend';

export class ThumbnailsFeed extends React.Component<IFeedProps, {}> {
  render() {
    const { thumbnails, active, dim } = this.props;

    let thmSet = thumbnails.map(index =>
      <Thumbnail
        key={index}
        id={index}
        src={`img/sm/00-0${index}.png`}
        cls={(() => {
           if (active === index) { return css_act; }
           if (index === active - 1 || index === active + 1) { return css_adj; }
        })()}
        onThumbnailClick={this.props.onThumbnailClick}
      />
    );

    return (
      <div className="thumbnails-feed">
        <div className="nav-wrap">
          <Navigate dir="forth" onNavClick={this.props.onNavClick} active={active} stop={thmSet.length} />
          <Navigate dir="back" onNavClick={this.props.onNavClick} active={active} />
        </div>
        <div className="thumbnails-set">
          <ThumbnailsWrapper orientation="wide" active={active} dim={dim}>
            {thmSet}
          </ThumbnailsWrapper>
        </div>
      </div>
    );
  }
}
