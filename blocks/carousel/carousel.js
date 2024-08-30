import { createElement } from '../../scripts/scripts.js';
import Swiper from './swiper-bundle.min.js';
import configObject from './carousel-config.js';
import embed from '../embed/embed.js';

const componentMapping = {
  embed,
};

export default function decorate(block) {
  const rows = Array.from(block.children);
  const config = rows[0];
  let configData = configObject.default;
  Array.from(block.classList).forEach((cls) => {
    if (configObject[cls]) configData = configObject[cls];
  });
  const props = rows.slice(1);
  const swiperWrapper = createElement('div', { classes: ['swiper-wrapper'] });
  const swiperButtonPrev = createElement('div', { classes: ['swiper-button-prev'] });
  const swiperButtonNext = createElement('div', { classes: ['swiper-button-next'] });
  const swiperPagination = createElement('div', { classes: ['swiper-pagination'] });
  config.remove();
  props.forEach((eachProps) => {
    const [classes, eyebrow, image, title] = Array.from(eachProps.children);
    const swiperSlide = createElement('div', { classes: ['swiper-slide'] });
    let selectedComponent = null;
    classes.textContent.trim().split(',').forEach((eachClass) => {
      swiperSlide.classList.add(eachClass.trim());
      if (componentMapping[eachClass.trim()]) {
        selectedComponent = componentMapping[eachClass.trim()];
      }
    });
    if (selectedComponent) {
      selectedComponent(eyebrow);
      swiperSlide.append(eyebrow);
    } else {
      swiperSlide.append(eyebrow);
      swiperSlide.append(image);
      swiperSlide.append(title);
    }
    swiperWrapper.append(swiperSlide);
    classes.remove();
  });
  configData.navigation.nextEl = swiperButtonNext;
  configData.navigation.prevEl = swiperButtonPrev;
  configData.pagination.el = swiperPagination;
  block.classList.add('swiper', 'mySwiper');
  block.append(swiperWrapper);
  block.append(swiperButtonNext);
  block.append(swiperButtonPrev);
  block.append(swiperPagination);
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          Swiper(block, configData);
        }
      });
    },
  );

  observer.observe(block);
}
