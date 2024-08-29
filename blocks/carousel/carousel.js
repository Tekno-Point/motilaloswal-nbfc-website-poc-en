import { createElement } from '../../scripts/scripts.js';
import Swiper from './swiper-bundle.min.js';

export default function decorate(block) {
  const rows = Array.from(block.children);
  const config = rows[0];
  config.remove();

  const props = rows.slice(1);
  const swiperWrapper = createElement('div', { classes: ['swiper-wrapper'] });
  // swiperWrapper.classList.add('swiper-wrapper');
  props.forEach((eachProps) => {
    const [classes, image, title] = Array.from(eachProps.children);
    const swiperSlide = createElement('div', { classes: ['swiper-slide'] });
    // swiperSlide.classList.add('swiper-slide');
    classes.textContent.trim().split(',').forEach((eachClass) => {
      swiperSlide.classList.add(eachClass.trim());
    });
    swiperSlide.append(image);
    swiperSlide.append(title);
    swiperWrapper.append(swiperSlide);
    classes.remove();
  });
  block.append(swiperWrapper);
  block.innerHTML += `
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
    <div class="swiper-pagination"></div>`;
  block.classList.add('mySwiper');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          Swiper(block, {
            loop: true,
            slidesPerView: 1,
            grabCursor: true,
            autoplay: {
              delay: 5000,
              disableOnInteraction: false,
            },
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
            pagination: {
              el: '.swiper-pagination',
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
          });
        }
      });
    },
  );

  observer.observe(block);
}
