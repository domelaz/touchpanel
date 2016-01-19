'use strict';

const $ = require('jquery');

var eventClick = 'click';
var slide = $('<img class="slide">');

function selectSlide() {
  var slideThumbnail = $(this);
  var others = slideThumbnail.siblings();
  others.removeClass('thumbnail--active');
  slideThumbnail.addClass('thumbnail--active');
}

function showSlide() {
  if ($('.slide').length === 0) {
    $('.content').append(slide);
  }
  var newSrc = $(this).attr('src');
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
