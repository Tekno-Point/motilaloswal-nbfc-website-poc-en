const heroCarousel = {
  // loop: true,
  slidesPerView: 1,
  grabCursor: true,
  autoplay: {
    delay: 500000,
    disableOnInteraction: false,
  },
  navigation: {
    // nextEl: swiperButtonNext,
    // prevEl: swiperButtonPrev,
  },
  pagination: {
    // el: swiperPagination,
    clickable: true,
  },
  breakpoints: {
    300: {
      slidesPerView: 1,
    },
    780: {
      slidesPerView: 1,
    },
    992: {
      slidesPerView: 1,
    },
    1199: {
      slidesPerView: 1,
    },
  },
};
const oneHalfCarousel = {
  loop: true,
  slidesPerView: 2,
  grabCursor: true,
  autoplay: {
    // delay: 5000,
    // disableOnInteraction: false,
  },
  navigation: {
    // nextEl: swiperButtonNext,
    // prevEl: swiperButtonPrev,
  },
  pagination: {
    // el: swiperPagination,
    clickable: true,
  },
  breakpoints: {
    300: {
      slidesPerView: 1,
      grabCursor: true,
    },
    780: {
      slidesPerView: 1,
      grabCursor: true,
    },
    992: {
      slidesPerView: 2,
    },
    1199: {
      slidesPerView: 2,
    },
  },
};
const oneThirdCarousel = {
  loop: true,
  slidesPerView: 3,
  grabCursor: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  navigation: {
    // nextEl: swiperButtonNext,
    // prevEl: swiperButtonPrev,
  },
  pagination: {
    // el: swiperPagination,
    clickable: true,
  },
  breakpoints: {
    300: {
      slidesPerView: 1,
    },
    780: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 3,
    },
    1199: {
      slidesPerView: 3,
    },
  },
};
export default {
  'hero-carousel': heroCarousel,
  'one-half-carousel': oneHalfCarousel,
  'one-thirds-carousel': oneThirdCarousel,
  default: heroCarousel,
};
