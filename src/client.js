(function($) {
  'use strict';

  let eventClick = 'click';
  let slide = $('<img class="slide" src="img/00-02.png">');

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
    slide.attr({
      src: $(this).attr('src')
    });
  }

  $(function() {
    $('.thumbnails-set')
      .on(eventClick, ".thumbnail", selectSlide)
      .on(eventClick, ".thumbnail", showSlide);
  });

})(jQuery);
