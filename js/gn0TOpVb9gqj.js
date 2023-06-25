"use strict";

/***********************************************
 * TEMPLATE: SWIPER
 ***********************************************/
(function ($) {
  'use strict'; // check if plugin defined

  if (typeof Swiper === 'undefined') {
    return;
  }

  VLTJS.swiper = {
    init: function init() {
      $('.swiper').each(function () {
        var $this = $(this),
            dataEffect = $this.attr('data-swiper-effect'),
            dataLoop = $this.attr('data-swiper-loop'),
            dataFreeMode = $this.attr('data-swiper-freeMode'),
            dataGrabCursor = $this.attr('data-swiper-grabCursor'),
            dataAutoHeight = $this.attr('data-swiper-autoHeight'),
            dataBreakpoints = $this.attr('data-swiper-breakpoints'),
            dataSlides = $this.attr('data-swiper-slides'),
            dataPagination = $this.attr('data-swiper-pagination'),
            dataParallax = $this.attr('data-swiper-parallax'),
            dataCenter = $this.attr('data-swiper-center'),
            dataAutoplay = parseInt($this.attr('data-swiper-autoplay'), 10),
            dataSpeed = parseInt($this.attr('data-swiper-speed'), 10),
            dataGap = parseInt($this.attr('data-swiper-gap'), 10),
            conf = {},
            $container = $this.find('.swiper-container'),
            $pagination = $this.find('.swiper-pagination'),
            $btnPrev = $this.find('.swiper-button-prev'),
            $btnNext = $this.find('.swiper-button-next');

        if (dataParallax) {
          conf.parallax = true;
        }

        if (dataEffect) {
          conf.effect = dataEffect;
        }

        if ($btnPrev.length && $btnNext.length) {
          conf.navigation = {
            nextEl: $btnNext[0],
            prevEl: $btnPrev[0]
          };
        }

        if (dataLoop) {
          conf.loop = true;
        }

        if (dataPagination) {
          conf.pagination = {
            el: $pagination[0],
            clickable: true,
            type: 'custom',
            renderCustom: function renderCustom(swiper, current, total) {
              var names = [];
              $this.find('.swiper-slide').each(function (i) {
                names.push($(this).find('[data-name]').data('name'));
              });
              var text = '<div class="container overflow-hidden"><div class="row gx-80">';

              for (var i = 1; i <= total; i++) {
                if (current == i) {
                  text += '<div class="col"><a href="#" class="swiper-pagination-item swiper-pagination-item-active" data-index="' + (i - 1) + '">' + names[i - 1] + '</a></div>';
                } else {
                  text += '<div class="col"><a href="#" class="swiper-pagination-item" data-index="' + (i - 1) + '">' + names[i - 1] + '</a></div>';
                }
              }

              text += '</div></div>';
              return text;
            }
          };
        }

        if (dataCenter) {
          conf.centeredSlides = true;
        }

        if (dataFreeMode) {
          conf.freeMode = true;
        }

        if (dataGrabCursor) {
          conf.grabCursor = true;
        }

        if (dataAutoHeight) {
          conf.autoHeight = true;
        }

        if (dataAutoplay) {
          conf.autoplay = {
            delay: dataAutoplay
          };
        }

        if (dataSpeed) {
          conf.speed = dataSpeed;
        }

        if ('auto' === dataSlides) {
          conf.slidesPerView = 'auto';
        } else {
          conf.slidesPerView = parseInt(dataSlides, 10);
        }

        if (dataGap) {
          conf.spaceBetween = dataGap;
        }

        if (dataBreakpoints) {
          var i = 0;
          var breaks = {};
          var points = dataBreakpoints.split(',');

          while (i < dataBreakpoints.split(',').length) {
            breaks[parseInt(points[i].split(':')[0], 10)] = {
              slidesPerView: 'auto' === points[i].split(':')[1] ? 'auto' : parseInt(points[i].split(':')[1], 10)
            };
            i++;
          }

          conf.breakpoints = breaks;
        }

        var swiper = new Swiper($container[0], conf);
        $pagination.on('click', 'a.swiper-pagination-item', function (e) {
          e.preventDefault();
          swiper.slideTo($(this).attr('data-index'));
        });
        swiper.on('slideChangeTransitionStart', function () {
          VLTJS.document.trigger('swiperSlideChangeTransitionStart');
        });
        swiper.on('touchMove', function (event) {
          VLTJS.document.trigger('swiperTouchMove', [event.clientX, event.clientY]);
        });
      });
    }
  };
  VLTJS.swiper.init();
})(jQuery);