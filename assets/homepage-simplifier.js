/**
 * Simple homepage script that ensures clean, consistent display
 * between development and production
 */
document.addEventListener('DOMContentLoaded', function () {
  // Only run on the homepage
  if (window.location.pathname === '/' || window.location.pathname === '/index') {
    // Ensure body is set up properly
    document.body.style.width = '100%';
    document.body.style.overflowX = 'hidden';

    // Hide all sections except the featured collection
    const mainContent = document.getElementById('MainContent');
    if (mainContent) {
      mainContent.style.width = '100%';
      mainContent.style.overflowX = 'hidden';
      mainContent.style.maxWidth = '100%';

      const sections = mainContent.querySelectorAll('section, div[id^="shopify-section-"]');
      sections.forEach((section) => {
        // Only show featured collection section
        if (section.id.includes('featured_collection') || section.id.includes('featured-collection')) {
          section.style.display = 'block';
          section.style.width = '100%';
        } else {
          section.style.display = 'none';
        }
      });
    }

    // Hide header, footer and announcement bar
    document.querySelectorAll('header, footer, .announcement-bar, .header, .footer').forEach((el) => {
      el.style.display = 'none';
    });

    // Add the title if it doesn't exist
    const featuredCollectionSection = document.querySelector('.featured-collection');
    if (featuredCollectionSection) {
      if (!featuredCollectionSection.querySelector('.atelier-title')) {
        const titleContainer = document.createElement('div');
        titleContainer.className = 'atelier-title';

        const titleLink = document.createElement('a');
        titleLink.href = '/pages/about';
        titleLink.style.display = 'block';
        titleLink.style.cursor = 'pointer';
        titleLink.style.textDecoration = 'none';

        const logoImg = document.createElement('img');
        logoImg.src = window.Shopify
          ? window.Shopify.routes.root + 'cdn/shop/t/6/assets/ladrlogo.png'
          : '/assets/ladrlogo.png';
        logoImg.alt = "L'atelier de Raphael";
        logoImg.width = 300;
        logoImg.style.maxWidth = '300px';
        logoImg.style.margin = '0 auto';
        logoImg.style.display = 'block';

        titleLink.appendChild(logoImg);
        titleContainer.appendChild(titleLink);
        featuredCollectionSection.prepend(titleContainer);
      }
    }

    // Force grid layout to 5 columns with full width
    const productGridContainer = document.querySelector('.featured-collection .page-width');
    if (productGridContainer) {
      productGridContainer.style.width = '100%';
      productGridContainer.style.maxWidth = '100%';
      productGridContainer.style.padding = '0 2.5%';
      productGridContainer.style.boxSizing = 'border-box';
    }

    const productGrid = document.querySelector('.featured-collection .grid');
    if (productGrid) {
      productGrid.style.display = 'grid';
      productGrid.style.gridTemplateColumns = 'repeat(5, 1fr)';
      productGrid.style.gap = '2rem';
      productGrid.style.width = '100%';

      // For large screens, add a media query dynamically
      if (window.innerWidth > 1600) {
        productGrid.style.width = '90%';
        productGrid.style.maxWidth = '1800px';
        productGrid.style.margin = '0 auto';
      }
    }

    // Fix any parent containers that might be constraining width
    document
      .querySelectorAll('.page-width, .collection, .slider-component, .featured-collection > div')
      .forEach((el) => {
        el.style.width = '100%';
        el.style.maxWidth = '100%';
        el.style.boxSizing = 'border-box';
      });

    // Add clean styling for the simplified page
    const style = document.createElement('style');
    style.textContent = `
      body, html {
        margin: 0;
        padding: 0;
        font-family: 'Courier New', monospace;
        background-color: white;
        width: 100%;
        overflow-x: hidden;
      }
      
      #MainContent {
        display: block;
        width: 100%;
        padding: 3rem 0;
        margin: 0 auto;
        overflow-x: hidden;
      }
      
      .atelier-title {
        text-align: center;
        font-size: 2.5rem;
        margin: 0 0 4rem 0;
        font-weight: 400;
        letter-spacing: 2px;
        font-family: 'Courier New', monospace;
      }
      
      .title-wrapper-with-link {
        display: none !important;
      }
      
      .page-width {
        width: 100% !important;
        max-width: 100% !important;
        margin: 0 !important;
        padding: 0 2.5% !important;
        box-sizing: border-box !important;
      }
      
      @media screen and (min-width: 1601px) {
        .featured-collection .grid {
          width: 90% !important;
          max-width: 1800px !important;
          margin: 0 auto !important;
        }
      }
      
      @media screen and (max-width: 990px) {
        .featured-collection .grid {
          grid-template-columns: repeat(2, 1fr) !important;
        }
      }
      
      /* About Us Button Styles */
      .about-us-button {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 10px 20px;
        background-color: white;
        color: black;
        border: 1px solid black;
        font-family: 'Courier New', monospace;
        font-size: 14px;
        text-transform: uppercase;
        letter-spacing: 1px;
        cursor: pointer;
        text-decoration: none;
        transition: all 0.3s ease;
        z-index: 9999 !important;
        pointer-events: auto !important;
      }
      
      .about-us-button:hover {
        background-color: black;
        color: white;
      }
      
      /* Disable any overlays or elements that might be capturing clicks */
      .shopify-section,
      .featured-collection,
      #MainContent,
      body > div {
        pointer-events: auto !important;
      }
      
      /* Ensure no invisible overlays are blocking the button */
      body::after {
        content: "";
        display: none !important;
      }
      
      /* Fix for any modal overlays */
      .overlay,
      .modal,
      [class*="overlay"],
      [class*="modal"],
      [id*="overlay"],
      [id*="modal"] {
        display: none !important;
      }
      
      @media screen and (max-width: 749px) {
        .about-us-button {
          bottom: 10px;
          right: 10px;
          padding: 8px 16px;
          font-size: 12px;
        }
      }
    `;
    document.head.appendChild(style);

    // Add the About Us button
    const aboutUsButton = document.createElement('a');
    aboutUsButton.className = 'about-us-button';
    aboutUsButton.href = '/pages/about';
    aboutUsButton.textContent = 'About Us';

    // Add event listener to ensure the click works
    aboutUsButton.addEventListener('click', function (event) {
      window.location.href = '/pages/about';
    });

    // Append to body to ensure it's above all other elements
    document.body.appendChild(aboutUsButton);

    // Ensure the button is clickable by bringing it to the front
    setTimeout(function () {
      // Re-append to ensure it's the last child
      document.body.appendChild(aboutUsButton);

      // Force a repaint to ensure proper stacking
      aboutUsButton.style.display = 'none';
      aboutUsButton.offsetHeight; // Force a repaint
      aboutUsButton.style.display = 'block';
    }, 500);

    // Handle window resize events to maintain proper layout
    window.addEventListener('resize', function () {
      const grid = document.querySelector('.featured-collection .grid');
      if (grid) {
        if (window.innerWidth > 1600) {
          grid.style.width = '90%';
          grid.style.maxWidth = '1800px';
          grid.style.margin = '0 auto';
        } else {
          grid.style.width = '100%';
          grid.style.margin = '0';
        }
      }
    });
  }
});
