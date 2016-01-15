(function($) {
  'use strict';

  let eventClick = 'click';

  function selectSlide() {
    let slideThumbnail = $(this);
    let others = slideThumbnail.siblings();
    others.removeClass('thumbnail--active');
    slideThumbnail.addClass('thumbnail--active');
  }

  $(function() {
    $('.thumbnails-set').on(eventClick, ".thumbnail", selectSlide);
  });

})(jQuery);
