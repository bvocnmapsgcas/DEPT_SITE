"use strict";

/***********************************************
 * TEMPLATE: ISOTOPE
 ***********************************************/
(function ($) {
  'use strict';

  if ('undefined' === typeof $.fn.isotope) {
    return;
  }

  VLTJS.isotope = {
    init: function init() {
      $('.isotope').each(function () {
        var $this = $(this),
            curIsotopeFilters = $this.find('.isotope-filters'),
            dataMode = $this.attr('data-isotope-mode'),
            conf = {};
        conf.itemSelector = '.isotope-item';

        if (dataMode) {
          conf.layoutMode = dataMode;
        } // init items


        var $grid = $this.find('.isotope-grid').isotope(conf); // refresh for isotope images position

        if ($grid.imagesLoaded) {
          $grid.imagesLoaded().progress(function () {
            $grid.isotope('layout');
          });
        } // click on filter button


        curIsotopeFilters.on('click', '> :not(.active) > a ', function (e) {
          var $thisLink = $(this);
          $thisLink.parent().addClass('active').siblings().removeClass('active');
          var curFilter = $thisLink.attr('data-filter');
          e.preventDefault(); // Added event when changing the filter.

          VLTJS.document.trigger('isotopeChangeFilter');
          $grid.isotope({
            filter: function filter() {
              if ('all' === curFilter) {
                return true;
              }

              var itemFilters = $(this).attr('data-filters');

              if (itemFilters) {
                itemFilters = itemFilters.split(',');

                for (var k in itemFilters) {
                  if (itemFilters[k].replace(/\s/g, '') === curFilter) {
                    return true;
                  }
                }
              }

              return false;
            }
          });
        });
      });
    }
  };
  VLTJS.isotope.init();
})(jQuery);