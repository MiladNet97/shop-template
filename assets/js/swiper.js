/* Initialize Swiper */
var swiper = new Swiper('.swiper-container', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    1028: {
      slidesPerView: 3,
      spaceBetween: 0
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 0
    },
    480: {
      slidesPerView: 1,
      spaceBetween: 0
    },
  }
});