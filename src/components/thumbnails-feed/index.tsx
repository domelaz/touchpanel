///<reference path='../../refs.d.ts' />

'use strict';

import * as React from 'react';
import ThumbnailsSet from './ThumbnailsSet';

export default class ThumbnailsFeed extends React.Component<{}, {}> {
  render() {
    return (
      <div className="thumbnails-feed">
        <div className="thumbnails-nav"></div>
        <ThumbnailsSet />
        <div className="thumbnails-nav thumbnails-nav--right"></div>
      </div>
    );
  }
}
