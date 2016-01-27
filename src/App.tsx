///<reference path="refs.d.ts" />

'use strict';

import * as $ from 'jquery';

import * as React from 'react';
import { connect } from 'react-redux';

import SceneBackground from './components/scene-background';
import ThumbnailsFeed from './components/thumbnails-feed';
import Content from './components/content';

class App extends React.Component<{}, {}> {
  render() {
    return (
      <div className="app-container">
        <SceneBackground />
        <ThumbnailsFeed />
        <Content />
      </div>
    );
  }
}

export default connect()(App);

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

$(function() {
  $('.thumbnails-set')
    .on(eventClick, ".thumbnail", selectSlide)
    .on(eventClick, ".thumbnail", showSlide);
});
