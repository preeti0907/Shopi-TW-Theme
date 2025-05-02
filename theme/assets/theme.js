class MinimalistSlideshow {
    constructor(element) {
      this.slideshow = element;
      this.slides = Array.from(this.slideshow.querySelectorAll('.slide'));
      this.dots = Array.from(this.slideshow.querySelectorAll('.slideshow__dot'));
      this.prevButton = this.slideshow.querySelector('[data-slide-prev]');
      this.nextButton = this.slideshow.querySelector('[data-slide-next]');
      this.currentIndex = 0;
      this.autoplay = this.slideshow.dataset.autoplay === 'true';
      this.autoplaySpeed = parseInt(this.slideshow.dataset.autoplaySpeed) || 5000;
      this.autoplayTimer = null;

      this.init();
    }

    init() {
      // Initialize event listeners
      if (this.prevButton) {
        this.prevButton.addEventListener('click', () => this.goToSlide(this.currentIndex - 1));
      }

      if (this.nextButton) {
        this.nextButton.addEventListener('click', () => this.goToSlide(this.currentIndex + 1));
      }

      this.dots.forEach((dot, index) => {
        dot.addEventListener('click', () => this.goToSlide(index));
      });

      // Start autoplay if enabled
      if (this.autoplay) {
        this.startAutoplay();

        // Pause autoplay on hover
        this.slideshow.addEventListener('mouseenter', () => this.pauseAutoplay());
        this.slideshow.addEventListener('mouseleave', () => this.startAutoplay());
      }

      // Update on resize for responsive behavior
      window.addEventListener('resize', () => this.updateSlideHeight());

      // Initial setup
      this.updateSlideHeight();
    }

    goToSlide(index) {
      // Handle wrapping
      if (index < 0) {
        index = this.slides.length - 1;
      } else if (index >= this.slides.length) {
        index = 0;
      }

      // Update classes
      this.slides[this.currentIndex].classList.remove('active');
      this.slides[index].classList.add('active');

      // Update dots if they exist
      if (this.dots.length) {
        this.dots[this.currentIndex].classList.remove('active');
        this.dots[index].classList.add('active');
      }

      // Update current index
      this.currentIndex = index;

      // Reset autoplay timer
      if (this.autoplay) {
        this.pauseAutoplay();
        this.startAutoplay();
      }

      // Update slide height
      this.updateSlideHeight();
    }

    startAutoplay() {
      if (this.autoplay && !this.autoplayTimer) {
        this.autoplayTimer = setInterval(() => {
          this.goToSlide(this.currentIndex + 1);
        }, this.autoplaySpeed);
      }
    }

    pauseAutoplay() {
      if (this.autoplayTimer) {
        clearInterval(this.autoplayTimer);
        this.autoplayTimer = null;
      }
    }

    updateSlideHeight() {
      // Make slideshow height match the current slide's height
      const activeSlide = this.slides[this.currentIndex];
      const activeImage = activeSlide.querySelector('img.slide__image');

      if (activeImage && activeImage.complete) {
        this.setHeight(activeImage);
      } else if (activeImage) {
        // If image isn't loaded yet, wait for it
        activeImage.addEventListener('load', () => this.setHeight(activeImage));
      }
    }

    setHeight(image) {
      // Only apply dynamic height when not using fullscreen mode
      if (!this.slideshow.classList.contains('slideshow--fullscreen')) {
        const ratio = image.naturalHeight / image.naturalWidth;
        const width = image.offsetWidth;
        const height = width * ratio;

        // Set minimum height to prevent tiny slideshow on very wide screens
        const minHeight = window.innerWidth < 768 ? 250 : 400;
        this.slideshow.style.height = `${Math.max(height, minHeight)}px`;
      }
    }
  }

  // Initialize all slideshows on the page
  document.addEventListener('DOMContentLoaded', () => {
    const slideshows = document.querySelectorAll('[data-slideshow]');
    slideshows.forEach((slideshow) => new MinimalistSlideshow(slideshow));
  });
// product-card.js - Include this in your theme's JavaScript files
class ProductCard {
    constructor(element) {
      this.card = element;
      this.productId = this.card.dataset.productId;
      this.variantSelector = this.card.querySelector('.variant-select');
      this.variantOptions = this.card.querySelectorAll('.variant-option');
      this.variantImages = this.card.querySelectorAll('.variant-image');
      this.quickAddButton = this.card.querySelector('.quick-add');
      this.wishlistButton = this.card.querySelector('.wishlist-toggle');
      
      this.init();
    }
    
    init() {
      // Variant selection
      if (this.variantSelector) {
        this.variantSelector.addEventListener('change', this.handleVariantChange.bind(this));
      }
      
      if (this.variantOptions.length) {
        this.variantOptions.forEach(option => {
          option.addEventListener('click', this.handleOptionClick.bind(this));
        });
      }
      
      if (this.variantImages.length) {
        this.variantImages.forEach(image => {
          image.addEventListener('click', this.handleVariantImageClick.bind(this));
        });
      }
      
      // Quick add to cart
      if (this.quickAddButton) {
        this.quickAddButton.addEventListener('click', this.handleQuickAdd.bind(this));
      }
      
      // Wishlist functionality
      if (this.wishlistButton) {
        this.wishlistButton.addEventListener('click', this.handleWishlistToggle.bind(this));
      }
    }
    
    handleVariantChange(event) {
      const variantId = event.target.value;
      const selectedOption = event.target.selectedOptions[0];
      const isAvailable = !selectedOption.disabled;
      
      if (this.quickAddButton) {
        this.quickAddButton.dataset.variantId = variantId;
        
        // Update button state based on availability
        if (isAvailable) {
          this.quickAddButton.classList.remove('bg-gray-500', 'cursor-not-allowed');
          this.quickAddButton.classList.add('bg-black', 'bg-opacity-80', 'hover:bg-opacity-100');
          this.quickAddButton.textContent = 'Add to Cart';
          this.quickAddButton.disabled = false;
        } else {
          this.quickAddButton.classList.add('bg-gray-500', 'cursor-not-allowed');
          this.quickAddButton.classList.remove('bg-black', 'bg-opacity-80', 'hover:bg-opacity-100');
          this.quickAddButton.textContent = 'Sold Out';
          this.quickAddButton.disabled = true;
        }
      }
    }
    
    handleOptionClick(event) {
      const option = event.currentTarget;
      const index = option.dataset.optionIndex;
      const value = option.dataset.optionValue;
      
      // Update active states
      this.variantOptions.forEach(opt => {
        if (opt.dataset.optionIndex === index) {
          opt.classList.remove('border-black');
          opt.classList.add('border-gray-300');
        }
      });
      
      option.classList.add('border-black');
      option.classList.remove('border-gray-300');
      
      // Here you would normally update the product variant
      // This is a simplified example, a full implementation would need to match the option to a variant
    }
    
    handleVariantImageClick(event) {
      const variantImageBtn = event.currentTarget;
      const variantId = variantImageBtn.dataset.variantId;
      const isAvailable = variantImageBtn.dataset.variantAvailable === 'true';
      
      // Update active state
      this.variantImages.forEach(img => {
        img.classList.remove('ring-2', 'ring-black');
      });
      
      variantImageBtn.classList.add('ring-2', 'ring-black');
      
      // Update quick add button variant and availability
      if (this.quickAddButton) {
        this.quickAddButton.dataset.variantId = variantId;
        
        if (isAvailable) {
          this.quickAddButton.classList.remove('bg-gray-500', 'cursor-not-allowed');
          this.quickAddButton.classList.add('bg-black', 'bg-opacity-80', 'hover:bg-opacity-100');
          this.quickAddButton.textContent = 'Add to Cart';
          this.quickAddButton.disabled = false;
        } else {
          this.quickAddButton.classList.add('bg-gray-500', 'cursor-not-allowed');
          this.quickAddButton.classList.remove('bg-black', 'bg-opacity-80', 'hover:bg-opacity-100');
          this.quickAddButton.textContent = 'Sold Out';
          this.quickAddButton.disabled = true;
        }
      }
    }
    
    handleQuickAdd(event) {
      event.preventDefault();
      
      // Check if button is disabled (item is sold out)
      if (this.quickAddButton.disabled) {
        return;
      }
      
      const variantId = this.quickAddButton.dataset.variantId;
      
      // Add loading state
      this.quickAddButton.classList.add('opacity-75');
      this.quickAddButton.textContent = 'Adding...';
      
      // Here you'd make an AJAX call to add to cart
      // Example using fetch:
      fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: variantId,
          quantity: 1
        })
      })
      .then(response => response.json())
      .then(data => {
        // Handle successful add to cart
        this.quickAddButton.textContent = 'Added!';
        
        // Update cart count and show mini cart if you have one
        if (typeof window.updateCartCount === 'function') {
          window.updateCartCount();
        }
        
        // Reset button after a delay
        setTimeout(() => {
          this.quickAddButton.classList.remove('opacity-75');
          this.quickAddButton.textContent = 'Add to Cart';
        }, 2000);
      })
      .catch(error => {
        console.error('Error adding to cart:', error);
        this.quickAddButton.textContent = 'Error';
        
        setTimeout(() => {
          this.quickAddButton.classList.remove('opacity-75');
          this.quickAddButton.textContent = 'Add to Cart';
        }, 2000);
      }); 
    }
    
    handleWishlistToggle(event) {
      event.preventDefault();
      
      // Here you'd implement your wishlist functionality
      // This is a simple toggle for demonstration
      this.wishlistButton.classList.toggle('text-red-500');
      
      // Send to your wishlist system via AJAX
      // Example implementation would depend on your wishlist solution
    }
  }
  
  // Initialize product cards once on page load instead of with each component
  document.addEventListener('DOMContentLoaded', () => {
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => new ProductCard(card));
    
    // If you're loading products via AJAX or have a carousel
    // you may need to initialize new cards when they're added to the DOM
    document.addEventListener('product:loaded', (event) => {
      // Initialize new product cards
      const newCards = event.detail.container.querySelectorAll('.product-card:not(.initialized)');
      newCards.forEach(card => {
        card.classList.add('initialized');
        new ProductCard(card);
      });
    });
    
    // For carousels or other dynamic content loading
    const initNewProductCards = () => {
      const uninitializedCards = document.querySelectorAll('.product-card:not(.initialized)');
      uninitializedCards.forEach(card => {
        card.classList.add('initialized');
        new ProductCard(card);
      });
    };
    
    // Example: Initialize when Shopify section renders
    if (Shopify && Shopify.designMode) {
      document.addEventListener('shopify:section:load', initNewProductCards);
    }
    
    // Example: Initialize when slider changes
    document.addEventListener('slider:loaded', initNewProductCards);
    document.addEventListener('slider:changed', initNewProductCards);
  });