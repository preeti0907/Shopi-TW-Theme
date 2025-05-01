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
  clamp = gsap.utils.clamp(-10, 10); // don't let the skew go beyond 20 degrees.

ScrollTrigger.create({
  onUpdate: (self) => {
    let skew = clamp(self.getVelocity() / -300);
    // only do something if the skew is MORE severe. Remember, we're always tweening back to 0, so if the user slows their scrolling quickly, it's more natural to just let the tween handle that smoothly rather than jumping to the smaller skew.
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
  });
  