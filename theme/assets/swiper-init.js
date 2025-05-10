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
  if (window.innerWidth <= 768) {
    var swiper = new Swiper(".myProductSwiper", {
      pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true,
      },
      centeredSlides: true,
      autoplay: {
        delay: 3000, // Time between slides in milliseconds (3 seconds)
        disableOnInteraction: false, // Continue autoplay after user interaction
        pauseOnMouseEnter: true // Pause autoplay when mouse enters the slider
      },
    });
  }
});

// Handle window resize events to reinitialize swiper if needed
window.addEventListener('resize', function () {
  // Check if we're crossing the breakpoint
  if (window.innerWidth < 768) {
    if (!document.querySelector('myProductSwiper').swiper) {
      var swiper = new Swiper('myProductSwiper', {
        pagination: {
          el: '.swiper-pagination',
          dynamicBullets: true,
        },
        centeredSlides: true,
        slidesPerView: 1,
        spaceBetween: 10,
      });
    }
  } else {
    // Destroy swiper on desktop if it exists
    const swiperInstance = document.querySelector('myProductSwiper').swiper;
    if (swiperInstance) {
      swiperInstance.destroy(true, true);
    }
  }
});


