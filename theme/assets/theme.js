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


  document.addEventListener('DOMContentLoaded', () => {
    const variantData = window.productVariants;
    const optionContainers = document.querySelectorAll('[data-option-index]');
    const variantIdInput = document.getElementById('product-variant-id');
    const addToCartWrapper = document.getElementById('add-to-cart-wrapper');
    const soldOutBtn = document.getElementById('sold-out-btn');
    const hiddenSelects = document.querySelectorAll('[data-option-select]');
    const quantityInput = document.getElementById('quantity');
    const quantityIncrease = document.getElementById('quantity-increase');
    const quantityDecrease = document.getElementById('quantity-decrease');
    
    // Set up the selected options array
    let selectedOptions = [];
    optionContainers.forEach((container, index) => {
      // Initialize with first option for each option type
      const firstButton = container.querySelector('.option-button');
      if (firstButton) {
        selectedOptions[index] = firstButton.dataset.value;
        firstButton.classList.add('ring-2', 'ring-indigo-500', 'bg-indigo-50');
        
        // Update the corresponding hidden select
        const hiddenSelect = document.querySelector(`[data-option-select="${index}"]`);
        if (hiddenSelect) {
          hiddenSelect.value = firstButton.dataset.value;
        }
      }
    });
    
    // Quantity selector logic
    if (quantityIncrease && quantityDecrease && quantityInput) {
      quantityIncrease.addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value, 10);
        quantityInput.value = currentValue + 1;
        validateQuantity();
      });
      
      quantityDecrease.addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value, 10);
        if (currentValue > 1) {
          quantityInput.value = currentValue - 1;
        }
        validateQuantity();
      });
      
      quantityInput.addEventListener('change', validateQuantity);
      
      function validateQuantity() {
        let value = parseInt(quantityInput.value, 10);
        if (isNaN(value) || value < 1) {
          value = 1;
        }
        quantityInput.value = value;
      }
    }
    
    // Function to find the matching variant based on selected options
    function findMatchingVariant() {
      if (!Array.isArray(variantData) || variantData.length === 0) {
        // No variants: treat as simple product
        // You may want to return a default object or null
        return null;
      }
      return variantData.find(variant => {
        return variant.options.every((option, index) => 
          option === selectedOptions[index]
        );
      });
    }
    
    // Function to update the button state based on variant availability
    function updateButtonState(variant) {
      if (variant) {
        // Update variant ID input
        variantIdInput.value = variant.id;
        
        // Update price display
        const priceDisplay = document.getElementById('variant-price');
        const comparePrice = document.getElementById('compare-price');
        
        if (variant.price) {
          priceDisplay.textContent = formatMoney(variant.price);
        }
        
        if (variant.compare_at_price && variant.compare_at_price > variant.price) {
          comparePrice.textContent = formatMoney(variant.compare_at_price);
          comparePrice.classList.remove('hidden');
        } else {
          comparePrice.classList.add('hidden');
        }
        
        // Update availability
        if (variant.available) {
          // Show Add to Cart and Express Checkout buttons
          addToCartWrapper.classList.remove('hidden');
          soldOutBtn.classList.add('hidden');
        } else {
          // Show Sold Out button, hide Add to Cart and Express Checkout
          addToCartWrapper.classList.add('hidden');
          soldOutBtn.classList.remove('hidden');
        }
      }
    }
    
    // Helper function to format money values
    function formatMoney(cents) {
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2
      });
      return formatter.format(cents / 100);
    }
    
    // Function to handle button clicks for options
    function handleOptionClick(e) {
      const button = e.currentTarget;
      const optionIndex = parseInt(button.closest('[data-option-index]').dataset.optionIndex);
      const optionValue = button.dataset.value;
      
      // Update selected options array
      selectedOptions[optionIndex] = optionValue;
      
      // Update visual state of buttons (remove highlight from siblings, add to clicked)
      const siblings = button.parentNode.querySelectorAll('.option-button');
      siblings.forEach(sib => {
        sib.classList.remove('ring-2', 'ring-indigo-500', 'bg-indigo-50');
      });
      button.classList.add('ring-2', 'ring-indigo-500', 'bg-indigo-50');
      
      // Update the corresponding hidden select
      const hiddenSelect = document.querySelector(`[data-option-select="${optionIndex}"]`);
      if (hiddenSelect) {
        hiddenSelect.value = optionValue;
      }
      
      // Find and update the variant
      const variant = findMatchingVariant();
      if (variant) {
        updateButtonState(variant);
      } else {
        // Handle simple product (no variants)
        // For example, show the add to cart button, set a default variant ID, etc.
      }
      
      // Update available options
      updateAvailableOptions();
    }
    
    // Add event listeners to all option buttons
    const optionButtons = document.querySelectorAll('.option-button');
    optionButtons.forEach(button => {
      button.addEventListener('click', handleOptionClick);
    });
    
    // Function to update unavailable options (gray them out)
    function updateAvailableOptions() {
      // For each option position, check which values are available with current selections
      optionContainers.forEach((container, optionPosition) => {
        const buttons = container.querySelectorAll('.option-button');
        
        buttons.forEach(button => {
          // Create a copy of the current selections
          const testOptions = [...selectedOptions];
          // Modify the selection for this option position
          testOptions[optionPosition] = button.dataset.value;
          
          // Check if any variant exists with this combination
          const variantExists = variantData.some(variant => {
            // Only check if all specified options match
            return testOptions.every((option, index) => {
              // Skip positions that haven't been selected yet
              if (option === undefined) return true;
              return variant.options[index] === option;
            });
          });
          
          // Update button styling based on availability
          if (!variantExists) {
            button.classList.add('opacity-50', 'cursor-not-allowed');
            button.classList.remove('hover:bg-gray-50');
          } else {
            button.classList.remove('opacity-50', 'cursor-not-allowed');
            button.classList.add('hover:bg-gray-50');
          }
        });
      });
    }
    
    // Function to select and update the first available variant
    function selectFirstAvailableVariant() {
      const firstAvailableVariant = variantData.find(variant => variant.available);
      if (firstAvailableVariant) {
        firstAvailableVariant.options.forEach((option, index) => {
          selectedOptions[index] = option;

          // Update UI to reflect these options
          const optionContainer = document.querySelector(`[data-option-index="${index}"]`);
          if (optionContainer) {
            const buttons = optionContainer.querySelectorAll('.option-button');
            buttons.forEach(button => {
              if (button.dataset.value === option) {
                button.classList.add('ring-2', 'ring-indigo-500', 'bg-indigo-50');
              } else {
                button.classList.remove('ring-2', 'ring-indigo-500', 'bg-indigo-50');
              }
            });

            // Update hidden select
            const hiddenSelect = document.querySelector(`[data-option-select="${index}"]`);
            if (hiddenSelect) {
              hiddenSelect.value = option;
            }
          }
        });

        updateButtonState(firstAvailableVariant);
      }
    }
    
    // Function to handle simple product (no variants)
    function handleSimpleProduct() {
      // You may want to set a default variant ID if available
      if (variantIdInput && window.product && window.product.variants && window.product.variants[0]) {
        variantIdInput.value = window.product.variants[0].id;
      }

      // Show Add to Cart and hide Sold Out (unless unavailable)
      if (addToCartWrapper) {
        addToCartWrapper.classList.remove('hidden');
      }
      if (soldOutBtn) {
        soldOutBtn.classList.add('hidden');
      }

      // Optionally update price display
      const priceDisplay = document.getElementById('variant-price');
      const comparePrice = document.getElementById('compare-price');
      if (window.product && window.product.variants && window.product.variants[0]) {
        const variant = window.product.variants[0];
        if (variant.price && priceDisplay) {
          priceDisplay.textContent = formatMoney(variant.price);
        }
        if (variant.compare_at_price && variant.compare_at_price > variant.price && comparePrice) {
          comparePrice.textContent = formatMoney(variant.compare_at_price);
          comparePrice.classList.remove('hidden');
        } else if (comparePrice) {
          comparePrice.classList.add('hidden');
        }
      }
    }
    
    // If there are no variants, treat the product as a simple product
    if (!Array.isArray(variantData) || variantData.length === 0) {
      // No variants: treat as simple product
      handleSimpleProduct();
    } else {
      // Existing logic for products with variants
      const initialVariant = findMatchingVariant();
      if (initialVariant) {
        updateButtonState(initialVariant);
      } else {
        selectFirstAvailableVariant();
      }
      updateAvailableOptions();
      optionButtons.forEach(button => {
        button.addEventListener('click', updateAvailableOptions);
      });
    }
  });

  document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('storefront-search-form');
    const searchInput = document.getElementById('storefront-search-input');
    const searchResults = document.getElementById('storefront-search-results');
  
    if (searchForm && searchInput && searchResults) {
      searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const query = searchInput.value.trim();
        if (!query) {
          searchResults.innerHTML = '<p>Please enter a search term.</p>';
          return;
        }
        searchResults.innerHTML = '<p>Searching...</p>';
  
        fetch(`/search/suggest.json?q=${encodeURIComponent(query)}&resources[type]=product&resources[limit]=5`)
          .then(res => res.json())
          .then(data => {
            if (data.resources.results.products.length === 0) {
              searchResults.innerHTML = '<p>No products found.</p>';
              return;
            }
            searchResults.innerHTML = data.resources.results.products.map(product => `
              <div class="search-result-item">
                <a href="${product.url}">
                  <img src="${product.featured_image.url}" alt="${product.title}" style="width:50px;height:50px;object-fit:cover;">
                  <span>${product.title}</span>
                </a>
              </div>
            `).join('');
          })
          .catch(() => {
            searchResults.innerHTML = '<p>Error searching. Please try again.</p>';
          });
      });
    }
  });