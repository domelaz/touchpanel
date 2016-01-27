///<reference path='../../refs.d.ts' />

'use strict';

import * as React from 'react';
import Thumbnail from '../thumbnail';

interface IFeedProps {
  thumbnails: number[]
}

export default class ThumbnailsFeed extends React.Component<IFeedProps, {}> {
  render() {
    return (
      <div className="thumbnails-feed">
        <div className="thumbnails-nav"></div>
        <div className="thumbnails-set">
          {this.props.thumbnails.map(index =>
            <Thumbnail key={index} src={`img/00-0${index}.png`} />
          )}
        </div>
        <div className="thumbnails-nav thumbnails-nav--right"></div>
      </div>
    );
  }
}
