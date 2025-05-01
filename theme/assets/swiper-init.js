document.addEventListener("DOMContentLoaded", function () {
    const sliders = document.querySelectorAll("[data-swiper-id]");
  
    sliders.forEach((slider) => {
      const uniqueId = slider.dataset.swiperId;
  
      new Swiper(".swiper-" + uniqueId, {
        loop: true,
        effect: "coverflow",
        centeredSlides: true,
        slidesPerView: 1,
        dynamicBullets: true,
        coverflowEffect: {
            rotate: 20,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
        },
        pagination: {
          el: ".swiper-pagination-" + uniqueId,
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next-" + uniqueId,
          prevEl: ".swiper-button-prev-" + uniqueId,
        },
      });
    });
  });
  