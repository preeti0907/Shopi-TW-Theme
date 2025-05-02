document.addEventListener("DOMContentLoaded", function () {
  const sliders = document.querySelectorAll("[data-swiper-id]");

  sliders.forEach((slider) => {
    const uniqueId = slider.dataset.swiperId;

    new Swiper(".swiper-" + uniqueId, {
      loop: true,
      effect: "coverflow",
      centeredSlides: true,
      navigation: {
        nextEl: ".swiper-button-next-" + uniqueId,
        prevEl: ".swiper-button-prev-" + uniqueId,
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

