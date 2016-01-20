(function() {
  'use strict';

  if (typeof module === "object" && typeof module.exports === "function") {
    // Мы в электроне
    window.$ = require('jquery');
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

  $(function() {
    $('.thumbnails-set')
      .on(eventClick, ".thumbnail", selectSlide)
      .on(eventClick, ".thumbnail", showSlide);
  });

})();
