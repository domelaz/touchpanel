///<reference path='../../refs.d.ts' />

'use strict';

import * as React from 'react';

export default class ThumbnailsSet extends React.Component<{}, {}> {
  render() {
    return (
      <div className="thumbnails-set">
        <img src="img/00-02.png" className="thumbnail" />
        <img src="img/00-03.png" className="thumbnail" />
        <img src="img/00-04.png" className="thumbnail" />
        <img src="img/00-05.png" className="thumbnail" />
        <img src="img/00-06.png" className="thumbnail" />
        <img src="img/00-07.png" className="thumbnail" />
      </div>
    )
  }
}
