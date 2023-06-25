"use strict";

/***********************************************
 * TEMPLATE: COLUMN
 ***********************************************/
(function ($) {
  'use strict';

  VLTJS.column = {
    init: function init() {
      var winW = VLTJS.window.outerWidth();
      $('.stretch-column').each(function () {
        var stretchBlock = $(this);

        if (stretchBlock.length) {
          var rect = stretchBlock[0].getBoundingClientRect(),
              offsetLeft = rect.left,
              offsetRight = winW - rect.right,
              elWidth = rect.width;

          if (stretchBlock.hasClass('to-left')) {
            stretchBlock.find('>*').css('margin-left', -offsetLeft);
            stretchBlock.find('>*').css('width', elWidth + offsetLeft + 'px');
          }

          if (stretchBlock.hasClass('to-right')) {
            stretchBlock.find('>*').css('margin-right', -offsetRight);
            stretchBlock.find('>*').css('width', elWidth + offsetRight + 'px');
          }

          if (stretchBlock.hasClass('has-reset-mobile') && VLTJS.window.outerWidth() <= 768) {
            stretchBlock.find('>*').css({
              'margin-left': '',
              'margin-right': '',
              'width': '100%'
            });
          }
        }
      });
    }
  };
  VLTJS.column.init();
  VLTJS.debounceResize(function () {
    VLTJS.column.init();
  });
})(jQuery);