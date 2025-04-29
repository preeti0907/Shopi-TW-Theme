/**
 * Infinite loading for collection page
 * This script handles loading more products when the user clicks "Load more" 
 * or when they scroll near the bottom of the page (optional)
 */

document.addEventListener('DOMContentLoaded', function() {
    const productGrid = document.getElementById('product-grid');
    const loadMoreButton = document.getElementById('load-more');
    const loadingIndicator = document.getElementById('loading-indicator');
    const infiniteLoadingContainer = document.querySelector('.infinite-loading');
    
    if (!productGrid || !infiniteLoadingContainer) return;
    
    let nextUrl = infiniteLoadingContainer.dataset.nextUrl;
    let isLoading = false;
    
    // Function to load more products
    async function loadMoreProducts() {
      if (isLoading || !nextUrl) return;
      
      isLoading = true;
      
      if (loadMoreButton) loadMoreButton.classList.add('hidden');
      if (loadingIndicator) loadingIndicator.classList.remove('hidden');
      
      try {
        // Fetch the next page
        const response = await fetch(nextUrl);
        const text = await response.text();
        
        // Create a temporary element to parse the HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        
        // Get the new products
        const newProducts = doc.querySelectorAll('#product-grid .product-card-wrapper');
        
        // Append the new products to the grid
        newProducts.forEach(product => {
          productGrid.appendChild(product.cloneNode(true));
        });
        
        // Update the next URL from the new page
        const newInfiniteLoadingContainer = doc.querySelector('.infinite-loading');
        if (newInfiniteLoadingContainer) {
          nextUrl = newInfiniteLoadingContainer.dataset.nextUrl || null;
        } else {
          nextUrl = null;
        }
        
        // Initialize any JS for the new products (e.g. quick view, swatches, etc.)
        initializeProductCardFunctionality();
        
        // Hide "Load more" button if there are no more products
        if (!nextUrl) {
          infiniteLoadingContainer.classList.add('hidden');
        }
      } catch (error) {
        console.error('Error loading more products:', error);
      } finally {
        isLoading = false;
        if (loadMoreButton && nextUrl) loadMoreButton.classList.remove('hidden');
        if (loadingIndicator) loadingIndicator.classList.add('hidden');
      }
    }
    
    // Click event for "Load more" button
    if (loadMoreButton) {
      loadMoreButton.addEventListener('click', loadMoreProducts);
    }
    
    // Optional: Auto-load more products when scrolling near the bottom
    // Uncomment this section to enable auto-loading on scroll
    /*
    const autoLoadThreshold = 300; // Distance from bottom in pixels to trigger load
    
    function handleScroll() {
      if (!nextUrl || isLoading) return;
      
      const scrollPosition = window.scrollY + window.innerHeight;
      const bottomPosition = document.body.scrollHeight - autoLoadThreshold;
      
      if (scrollPosition >= bottomPosition) {
        loadMoreProducts();
      }
    }
    
    // Throttle the scroll event to improve performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScroll, 200);
    });
    */
    
    // Function to initialize product card functionality
    // This should match any initialization done when the page first loads
    function initializeProductCardFunctionality() {
      // Add any product card initialization code here
      // For example:
      // - Quick view button functionality
      // - Add to cart button functionality
      // - Color swatches
      // - Wishlist button
      // - Image hover effects
      
      // Example: Initialize quick view buttons on new products
      const quickViewButtons = document.querySelectorAll('.quick-view-button');
      quickViewButtons.forEach(button => {
        if (!button.hasAttribute('data-initialized')) {
          button.addEventListener('click', function(e) {
            e.preventDefault();
            const productUrl = this.getAttribute('data-product-url');
            // Quick view logic here
          });
          button.setAttribute('data-initialized', 'true');
        }
      });
      
      // Example: Initialize add to cart buttons on new products
      const addToCartButtons = document.querySelectorAll('.add-to-cart-button');
      addToCartButtons.forEach(button => {
        if (!button.hasAttribute('data-initialized')) {
          button.addEventListener('click', function(e) {
            e.preventDefault();
            const variantId = this.getAttribute('data-variant-id');
            // Add to cart logic here
          });
          button.setAttribute('data-initialized', 'true');
        }
      });
    }
  });