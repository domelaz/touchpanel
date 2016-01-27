///<reference path='../../refs.d.ts' />

'use strict';

import * as React from 'react';
import Thumbnail from '../thumbnail';

export default class ThumbnailsFeed extends React.Component<{}, {}> {
  render() {
    return (
      <div className="thumbnails-feed">
        <div className="thumbnails-nav"></div>
          <div className="thumbnails-set">
            <Thumbnail src="img/00-02.png"/>
            <Thumbnail src="img/00-03.png"/>
            <Thumbnail src="img/00-04.png" cls="thumbnail thumbnail--active"/>
            <Thumbnail src="img/00-05.png"/>
            <Thumbnail src="img/00-06.png"/>
            <Thumbnail src="img/00-07.png"/>
          </div>
        <div className="thumbnails-nav thumbnails-nav--right"></div>
      </div>
    );
  }
}
