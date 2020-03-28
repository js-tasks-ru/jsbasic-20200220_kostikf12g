'use strict';

class Carousel {
  slides = [
    {
      id: 0,
      title: 'BEST LAPTOP DEALS',
      img: './assets/images/default-slide-img.jpg'
    },
    {
      id: 1,
      title: 'BEST HEADPHONES DEALS',
      img: './assets/images/default-slide-img.jpg'
    },
    {
      id: 2,
      title: 'BEST SPEAKERS DEALS',
      img: './assets/images/default-slide-img.jpg'
    }
  ];

  constructor(element) {
    this.el = element;

    this.el.append(this.createDOMCarousel());

    this.el.addEventListener("click", event => {
      if (event.target.tagName === 'BUTTON' && event.target.hasAttribute('data-slide') ||
              event.target.tagName === 'SPAN' && event.target.closest('button').hasAttribute('data-slide')) {

        event.preventDefault();

        if (event.target.tagName === 'SPAN') {
          this.moveSlides(event.target.closest('button').getAttribute('data-slide'));
        } else {
          this.moveSlides(event.target.getAttribute('data-slide'));
        }
      }

      if (event.target.tagName === 'LI' && event.target.hasAttribute('data-slide-to')) {
        this.moveSlides(null, +event.target.getAttribute('data-slide-to'));
      }
    });
  }

  createDOMCarousel() {
    let mainCarousel = document.createElement('div');
    mainCarousel.id = 'mainCarousel';
    mainCarousel.className = 'main-carousel carousel slide';

    mainCarousel.prepend(this.createListSlides());

    let carouselInner = document.createElement('div');
    carouselInner.className = 'carousel-inner';
    carouselInner.append(this.createSlide(this.slides[0].id));
    mainCarousel.append(carouselInner);

    mainCarousel.append(this.createButton('prev', 'Previous'));
    mainCarousel.append(this.createButton('next', 'Next'));

    return mainCarousel;
  }

  createSlide(slideId) {
    let currentSlideData = this.slides.filter(item => {
      if (item.id === slideId) {
        return true;
      }
    });

    let { id, title, img } = currentSlideData[0];

    this.currentSlideId = id;

    let slide = document.createElement('div');
    slide.className = 'carousel-item active';
    slide.innerHTML = `
      <img src="${img}" alt="Activelide">
      <div class="container">
          <div class="carousel-caption">
              <h3 class="h1">${title}</h3>
              <div>
                  <a class="btn" href="#" role="button">
                      View all DEALS
                      <img src="assets/icons/icon-angle-white.svg" class="ml-3" alt="">
                  </a>
              </div>
          </div>
      </div>`;

      return slide;
  }

  createListSlides() {
    let list = document.createElement('ol');
    list.className = 'carousel-indicators';

    for (let slide of this.slides) {
      let li = document.createElement('li');
      li.id = "#mainCarousel";
      li.className="carousel-indicator";
      li.setAttribute('data-slide-to', slide.id);

      list.append(li);
    }

    list.firstElementChild.classList.add('active');
    return list;
  }

  createButton(dataName, text) {
    let button = document.createElement('button');
    button.setAttribute('data-slide', dataName);
    button.setAttribute('href', '#mainCarousel');
    button.setAttribute('role', 'button');
    button.className = 'carousel-control-' + dataName;

    button.innerHTML = `<span class="carousel-control-${dataName}-icon" aria-hidden="true"></span>
                        <span class="sr-only">${text}</span>`;

    return button;
  }

  moveSlides(direction, nextSlideId = null) {

    if (nextSlideId !== null) {
      this.currentSlideId = nextSlideId;
    } else {
      if (direction === 'next') {
        ++this.currentSlideId;

        if (!this.slides.find(item => item.id === this.currentSlideId)) {
          this.currentSlideId = this.slides[0].id;
        }
      } else if (direction === 'prev') {
        --this.currentSlideId;

        if (!this.slides.find(item => item.id === this.currentSlideId)) {
          this.currentSlideId = this.slides[this.slides.length - 1].id;
        }
      }
    }

    let newSlide = this.createSlide(this.currentSlideId);
    let carouselInner = this.el.querySelector('.carousel-inner');

    carouselInner.firstElementChild.remove();
    this.el.querySelector('.carousel-indicator.active').classList.remove('active');

    carouselInner.append(newSlide);
    this.el.querySelector(`.carousel-indicator[data-slide-to="${this.currentSlideId}"]`).classList.add('active');
  }
}

// Делает класс доступным глобально, сделано для упрощения, чтобы можно было его вызывать из другого скрипта
window.Carousel = Carousel;
