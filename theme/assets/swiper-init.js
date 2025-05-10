document.addEventListener("DOMContentLoaded", function () {
  const sliders = document.querySelectorAll("[data-swiper-id]");

  sliders.forEach((slider) => {
    const uniqueId = slider.dataset.swiperId;
    const isSlideshow = uniqueId.includes('slideshow_');

    // Default Swiper configuration
    const swiperConfig = {
      loop: true,
      centeredSlides: true,
      navigation: {
        nextEl: ".swiper-button-next-" + uniqueId,
        prevEl: ".swiper-button-prev-" + uniqueId,
      },
      pagination: {
        el: ".swiper-pagination-" + uniqueId,
        clickable: true,
      }
    };

    // Add fade effect for slideshows
    if (isSlideshow) {
      swiperConfig.effect = "fade";
      swiperConfig.fadeEffect = {
        crossFade: true
      };
      swiperConfig.autoplay = {
        delay: 5000,
        disableOnInteraction: false
      };
    } else {
      // Default effect for other sliders
      swiperConfig.effect = "coverflow";
    }

    new Swiper(".swiper-" + uniqueId, swiperConfig);
  });

  // Product gallery swiper
  var swiper = new Swiper(".myProductSwiper", {
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
    loop: true,
  });

  // Thumbnail swiper
  var swiper2 = new Swiper(".mySwiper2", {
    spaceBetween: 10,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    thumbs: {
      swiper: swiper,
    },
  });
});


