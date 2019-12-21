(function ($) {
  "use strict";

  var review_part_cotent = $('.review_part_cotent');
  if (review_part_cotent.length) {
    review_part_cotent.owlCarousel({
      items: 2,
      loop: true,
      dots: false,
      autoplay: true,
      margin: 40,
      autoplayHoverPause: true,
      autoplayTimeout: 5000,
      nav: true,
      navText: ['<span class="flaticon-left-arrow"></span>','<span class="flaticon-arrow-pointing-to-right"></span>'],
      responsive: {
        0: {
          nav: false,
          items: 1
        },
        575: {
          nav: false,
          items: 2
        },
        991: {
          nav: true,
          items: 1
        },
        1200: {
          nav: true,
          items: 2
        },
      }
    });
  }
  $('.popup-youtube, .popup-vimeo').magnificPopup({
    // disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false
  });



  var review = $('.textimonial_iner');
  if (review.length) {
    review.owlCarousel({
      items: 1,
      loop: true,
      dots: true,
      autoplay: true,
      autoplayHoverPause: true,
      autoplayTimeout: 5000,
      nav: false,
      responsive: {
        0: {
          margin: 15,
        },
        600: {
          margin: 10,
        },
        1000: {
          margin: 10,
        }
      }
    });
  }
  $(document).ready(function() {
    $('select').niceSelect();
  });
  // menu fixed js code


//   $(document).ready(function(){

//     var owl_1 = $('#owl-1');
//     var owl_2 = $('#owl-2');

//     owl_1.owlCarousel({
//       loop:true,
//       margin:10,
//       nav:false,
//       items: 1,
//       dots: false,
//       navText: false,
//       autoplay: true,

//     });
//  owl_2.find(".item").click(function(){
//     var slide_index = owl_2.find(".item").index(this);
//     owl_1.trigger('to.owl.carousel',[slide_index,300]);
//   });

//     owl_2.owlCarousel({
//       margin:50,
//       nav: true,
//       items: 3,
//       dots: false,
//       center: true,
//       loop:true,
//       navText: false,
//       autoplay: true,
//       center: true
//     });

//   });


$('.counter').counterUp({
  time: 2000
});

  $('.slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    speed: 300,
    infinite: true,
    asNavFor: '.slider-nav-thumbnails',
    autoplay:true,
    pauseOnFocus: true,
    dots: true,
  });

  $('.slider-nav-thumbnails').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.slider',
    focusOnSelect: true,
    infinite: true,
    prevArrow: false,
    nextArrow: false,
    centerMode: true,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          centerMode: false,
        }
      }
    ]
  });

  //remove active class from all thumbnail slides
  $('.slider-nav-thumbnails .slick-slide').removeClass('slick-active');

  //set active class to first thumbnail slides
  $('.slider-nav-thumbnails .slick-slide').eq(0).addClass('slick-active');

  // On before slide change match active thumbnail to current slide
  $('.slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    var mySlideNumber = nextSlide;
    $('.slider-nav-thumbnails .slick-slide').removeClass('slick-active');
    $('.slider-nav-thumbnails .slick-slide').eq(mySlideNumber).addClass('slick-active');
 });

 //UPDATED

 $('.slider').on('afterChange', function(event, slick, currentSlide){
   $('.content').hide();
   $('.content[data-id=' + (currentSlide + 1) + ']').show();
 });

 $('.img-pop-up').magnificPopup({
  type: 'image',
  gallery:{
    enabled:true
  }
});

$(window).on('load', function() {
  if (document.getElementById('portfolio')) {
    var $workGrid = $('.portfolio-grid').isotope({
      itemSelector: '.all',
    });
  }

  $('.portfolio-filter ul li').on('click', function() {
    $('.portfolio-filter ul li').removeClass('active');
    $(this).addClass('active');

    var data = $(this).attr('data-filter');
    $workGrid.isotope({
      filter: data
    });
  });


});


}(jQuery));
