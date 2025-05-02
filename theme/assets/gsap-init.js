document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  gsap.from(".gsap-fade-up", {
    scrollTrigger: {
      trigger: ".gsap-fade-up",
      start: "top 90%",
    },
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power2.out",
  });

  gsap.from(".gsap-zoom-in", {
    scrollTrigger: {
      trigger: ".gsap-zoom-in",
      start: "top 85%",
    },
    scale: 0.8,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
  });
  let proxy = { skew: 0 },
    skewSetter = gsap.quickSetter(".skewElem", "skewY", "deg"), // fast
    clamp = gsap.utils.clamp(-5, 5); // don't let the skew go beyond 20 degrees.

  ScrollTrigger.create({
    onUpdate: (self) => {
      let skew = clamp(self.getVelocity() / -300);

      if (Math.abs(skew) > Math.abs(proxy.skew)) {
        proxy.skew = skew;
        gsap.to(proxy, {
          skew: 0,
          duration: 0.8,
          ease: "power3",
          overwrite: true,
          onUpdate: () => skewSetter(proxy.skew)
        });
      }
    }
  });

  gsap.registerPlugin(SplitText);

  gsap.set(".heading", { opacity: 1 });

  let split = SplitText.create(".heading", { type: "chars" });
  //now animate each character into place from 20px below, fading in:
  gsap.from(split.chars, {
    y: 20,
    autoAlpha: 0,
    stagger: 0.05
  });

});
