"use strict";

/***********************************************
 * TEMPLATE: SHOW ON SCROLL
 ***********************************************/
(function ($) {
  'use strict';

  VLTJS.sos = {
    init: function init() {
      function shsShow(item) {
        item.style.opacity = 1;
        item.style.transform = 'translateY(0)';
        item.classList.add('animated');
      }

      $('[data-show="startbox"]').each(function () {
        var self = this,
            origin = self.getAttribute('data-sos-origin') || 'bottom',
            distance = parseInt(self.getAttribute('data-sos-distance'), 10) || 30,
            translate = 'translateY(';

        if ('left' === origin) {
          translate = 'translateX(-';
        }

        if ('top' === origin) {
          translate = 'translateY(-';
        }

        if ('right' === origin) {
          translate = 'translateX(';
        }

        if ('bottom' === origin) {
          translate = 'translateY(';
        }

        self.style.transform = "" + translate + distance + "px)";
      });
      $('[data-show="startbox"]:not(.animated)').each(function () {
        var self = this,
            $this = $(self),
            duration = parseInt(self.getAttribute('data-show-duration'), 10) || 500,
            delay = parseInt(self.getAttribute('data-show-delay'), 10) + 50 || 50;
        self.style.transitionDuration = duration + "ms";

        if (!$this.hasClass('animated')) {
          $this.one('inview', function () {
            setTimeout(function () {
              shsShow(self);
            }, delay);
          });
        }
      }); // Fix when changing the filter to Isotope.

      VLTJS.document.on('isotopeChangeFilter', function () {
        $('[data-show="startbox"]').each(function () {
          var self = this;

          if (!$(self).hasClass('animated')) {
            shsShow(self);
          }
        });
      });
    }
  };
  VLTJS.sos.init();
})(jQuery);