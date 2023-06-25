"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/***********************************************
 * INIT THIRD PARTY SCRIPTS
 ***********************************************/
(function ($) {
  'use strict';
  /**
   * ImagesLoaded
   */

  VLTJS.document.imagesLoaded().done(function () {
    VLTJS.document.trigger('images.loaded');
  });
  /**
   * Preloader
   */

  VLTJS.document.on('images.loaded', function () {
    setTimeout(function () {
      $('.preloader').fadeOut(150);
    }, 300);
  });
  /**
   * Object fit image
   */

  if ('undefined' !== typeof window.objectFitImages) {
    window.objectFitImages();
  }
  /**
   * Close magnificPopup
   */


  VLTJS.document.on('keyup', function (e) {
    if (27 === e.keyCode) {
      $.magnificPopup.close();
    }
  });
  VLTJS.document.on('click', '.popup-modal-dismiss', function (e) {
    e.preventDefault();
    $.magnificPopup.close();
  });
  $('.image-link').magnificPopup({
    type: 'image',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false
  });
  $('.video-link').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false
  });
  $('.gallery-wrapper').magnificPopup({
    delegate: '.gallery-item',
    // child items selector, by clicking on it popup will open
    type: 'image',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    gallery: {
      enabled: true
    }
  });
  $('.popup-inline').magnificPopup(_defineProperty({
    type: 'inline',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: true,
    fixedBgPos: true,
    alignTop: true,
    showCloseBtn: false
  }, "preloader", false));
  /**
   * Half footer section
   */

  function half_footer_section() {
    $('.half-section-block').each(function () {
      var $thisSection = $(this),
          prevSection = $($thisSection.data('prev-id')),
          nextSection = $($thisSection.data('next-id')),
          tempPB = parseFloat(prevSection.css('padding-bottom')) || 0,
          tempPT = parseFloat(nextSection.css('padding-top')) || 0,
          rect,
          rectHeight;
      VLTJS.debounceResize(function () {
        rect = $thisSection[0].getBoundingClientRect();
        rectHeight = rect.height * 0.5;
        $thisSection[0].style.setProperty('margin-top', -rectHeight + 'px');

        if (tempPB > 0) {
          prevSection[0].style.setProperty('padding-bottom', rectHeight + tempPB + 'px', 'important');
        }

        if (tempPT > 0) {
          nextSection[0].style.setProperty('padding-top', rectHeight + tempPT + 'px', 'important');
        }

        VLTJS.document.trigger('half.resize');
      });
    });
  }

  half_footer_section();
  /**
   * Add active class to parent menu
   */

  $('ul.navbar-nav li.nav-item.active').parents('li.nav-item').addClass('active');
  /**
   * Docs
   */

  if ($('.sticky-top').length) {
    $('.sticky-top').parents('.overflow-hidden').removeClass('overflow-hidden');
  }

  VLTJS.document.on('click', '[href]', function (e) {
    var $this = $(this);

    if ($this.parents('.sticky-left').length) {
      e.preventDefault();
      var linkStr = $this.attr('href'),
          section = $(linkStr);

      if (linkStr.indexOf('#') !== -1 && section.length) {
        $('.nav-link').removeClass('active');
        $('a[href="' + linkStr + '"]').addClass('active');
        $('.tab-content').removeClass('show');
        section.addClass('show');
      }
    }
  });
})(jQuery);