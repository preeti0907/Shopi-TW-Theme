document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  // This ensures the animation is applied to all elements with the `.gsap-fade-up` class dynamically.
  gsap.utils.toArray(".gsap-fade-up").forEach(element => {
    gsap.from(element, {
      scrollTrigger: {
        trigger: element,            // Trigger the animation on the specific element
        start: "top 90%",             // Animation starts when the top of the element is 90% into the viewport
        end: "top 60%",               // Optional: control when the animation ends (this can be adjusted)
        scrub: false,                 // Set to false if you want it to animate only once when in view
        once: true,                   // Ensures the animation happens only once when the element enters view
        markers: false                // Set to `true` for debugging to see where the trigger starts/ends
      },
      opacity: 0,                    // Animation starts with opacity 0
      y: 50,                         // Move the element 50px up
      duration: 1,                   // Animation duration
      ease: "power2.out",            // Ease for smooth transition
    });
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

  gsap.set(".section__heading, .section__subheading", { opacity: 1 });

  // Create an intersection observer
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Trigger animation when the element is in view
        let split = SplitText.create(entry.target, { type: "chars" });

        gsap.from(split.chars, {
          y: 20,
          autoAlpha: 0,
          stagger: 0.05
        });

        // Stop observing once the animation is triggered
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5 // You can adjust this as needed (e.g., 0.5 means 50% of the element must be in view)
  });

  // Observe each section's heading and subheading
  document.querySelectorAll(".section__heading, .section__subheading").forEach(element => {
    observer.observe(element);
  });


});
