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
  onFeedChange(any): void,
  feedposition: number,
  dim: any,
  delta: number,
  playSound(): void,
}

/**
 * CSS classes
 */
const css_act = 'thumbnail--active';
const css_adj = 'thumbnail--active-adjacend';

export class ThumbnailsFeed extends React.Component<IFeedProps, {}> {
  render() {
    const { thumbnails, active, dim } = this.props;

    const onNavClick = (direction: string) => {
      this.props.playSound();
      this.props.onNavClick(direction);
    }

    const onThumbnailClick = (id: number) => {
      this.props.playSound();
      this.props.onThumbnailClick(id);
    }

    let thmSet = thumbnails.map(index =>
      <Thumbnail
        key={index}
        id={index}
        imagepath='img'
        src={`00-0${index}`}
        cls={(() => {
           if (active === index) { return css_act; }
           if (index === active - 1) { return css_adj + '-left'; }
           if (index === active + 1) { return css_adj + '-right'; }
        })()}
        onThumbnailClick={onThumbnailClick}
      />
    );

    return (
      <div className="thumbnails-feed">
        <div className="nav-wrap">
          <Navigate dir="forth" onNavClick={onNavClick} active={active} stop={thmSet.length} />
          <Navigate dir="back" onNavClick={onNavClick} active={active} />
        </div>
        <div className="thumbnails-set">
          <ThumbnailsWrapper orientation="wide" active={active} dim={dim} pos={this.props.feedposition} onSwipe={this.props.onFeedChange}>
            {thmSet}
          </ThumbnailsWrapper>
        </div>
      </div>
    );
  }
}
