///<reference path='../../refs.d.ts' />

'use strict';

import * as $ from 'jquery';

import * as React from 'react';
import Thumbnail from '../thumbnail';

interface IFeedProps {
  thumbnails: number[],
  active: number
}

let eventClick = 'click';
let slide = $('<img class="slide">');

function selectSlide() {
  let slideThumbnail = $(this);
  let others = slideThumbnail.siblings();
  others.removeClass('thumbnail--active');
  slideThumbnail.addClass('thumbnail--active');
}

function showSlide() {
  if ($('.slide').length === 0) {
    $('.content').append(slide);
  }
  let newSrc = $(this).attr('src');
  slide.animate({
    opacity: 0
  }, 200, function() {
    slide.attr({
      src: newSrc
    });
    slide.animate({
      opacity: 1
    }, 200);
  });
}

export default class ThumbnailsFeed extends React.Component<IFeedProps, {}> {
  componentDidMount() {
    $('.thumbnails-set')
      .on(eventClick, ".thumbnail", selectSlide)
      .on(eventClick, ".thumbnail", showSlide);
  }
  componentWillUnmount() {
    $('.thumbnails-set').off();
  }
  render() {
    let thumbnails = this.props.thumbnails.map(index => 
      <Thumbnail
        key={index}
        src={`img/00-0${index}.png`}
        cls={this.props.active === index ? 'thumbnail--active' : undefined}
      />
    );

    return (
      <div className="thumbnails-feed">
        <div className="thumbnails-nav"></div>
        <div className="thumbnails-set">{thumbnails}</div>
        <div className="thumbnails-nav thumbnails-nav--right"></div>
      </div>
    );
  }
}
