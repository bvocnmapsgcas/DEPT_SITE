"use strict";

/***********************************************
 * TEMPLATE: NAVBAR
 ***********************************************/
(function ($) {
  'use strict';

  VLTJS.navbar = {
    init: function init() {
      var scrollClass = 'navbar-scroll',
          showClass = 'navbar-show',
          hideClass = 'navbar-hide',
          endClass = 'navbar-end',
          stickyOffset = $('.navbar-topbar').outerHeight() || $('.navbar-top').outerHeight() || 100;
      $('<svg xmlns="http://www.w3.org/2000/svg" width="8" height="12" fill="none"><path fill="currentColor" d="M1.47 9.47.94 10 2 11.06l.53-.53-1.06-1.06ZM6 6l.53.53.53-.53-.53-.53L6 6ZM2.53 1.47 2 .94.94 2l.53.53 1.06-1.06Zm0 9.06 4-4-1.06-1.06-4 4 1.06 1.06Zm4-5.06-4-4-1.06 1.06 4 4 1.06-1.06Z"/></svg>').appendTo('.navbar-top .nav-item.navbar-dropdown > .nav-link');
      VLTJS.throttleScroll(function (type, scroll) {
        // show / hide
        if ('down' === type && 500 < scroll) {
          VLTJS.body.removeClass(showClass).addClass(hideClass);
        } else if ('up' === type || 'end' === type || 'start' === type) {
          VLTJS.body.removeClass(hideClass).addClass(showClass);
        }

        if ('end' === type) {
          VLTJS.body.addClass(endClass);
        } else {
          VLTJS.body.removeClass(endClass);
        } // scroll class


        if ('down' === type && stickyOffset < scroll) {
          VLTJS.body.addClass(scrollClass);
        }

        if ('start' === type) {
          VLTJS.body.removeClass(scrollClass);
        }
      }); // show and hide the menu with focus

      function toggleShow() {
        var $thisDropdown = $(this).parents('.navbar-dropdown'),
            $thisDropdownMenu = $thisDropdown.children('.dropdown-menu');

        if (!$thisDropdown.hasClass('focus')) {
          $thisDropdown.addClass('focus');
          $thisDropdownMenu.addClass('focus');
        } else {
          $thisDropdown.removeClass('focus');
          $thisDropdownMenu.removeClass('focus');
        }
      }

      VLTJS.document.on('focus', '.navbar-top a', toggleShow);
      VLTJS.document.on('blur', '.navbar-top a', toggleShow); // update position

      VLTJS.debounceResize(function () {
        $('.navbar-dropdown > .dropdown-menu').each(function () {
          var $thisDropdown = $(this),
              rect = $thisDropdown[0].getBoundingClientRect(),
              rectLeft = rect.left,
              rectRight = rect.right,
              rectWidth = rect.width,
              wndW = VLTJS.window.width();

          if (0 > wndW - rectRight) {
            $thisDropdown.addClass('dropdown-menu-drop-left');

            if (wndW - rectRight === rectWidth + 10) {
              $thisDropdown.removeClass('dropdown-menu-drop-left');
            }
          }

          if (0 > rectLeft) {
            $thisDropdown.addClass('dropdown-menu-drop-right');

            if (rectLeft === rectWidth + 10) {
              $thisDropdown.removeClass('dropdown-menu-drop-right');
            }
          }
        });
      });
    }
  };
  VLTJS.navbar.init();
})(jQuery);