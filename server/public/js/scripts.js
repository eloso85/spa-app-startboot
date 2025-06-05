/*!
* Start Bootstrap - Agency v7.0.12 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    //  Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

// Function to fetch portfolio data and render it
async function loadPortfolioItems() {
    const container = document.getElementById('portfolio-items-container');
    if (!container) {
        console.error('Portfolio container not found!');
        return;
    }

    container.innerHTML = 'Loading portfolio items...'; // Show loading message

    try {
        const response = await fetch('/api/portfolio'); // Make API call to your Express server
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const portfolioItems = await response.json(); // Parse the JSON response

        // Clear loading message
        container.innerHTML = '';

        // Generate HTML for each portfolio item and append to the container
        portfolioItems.forEach(item => {
            const portfolioHtml = `
                <div class="col-lg-4 col-sm-6 mb-4">
                    <div class="portfolio-item">
                        <a class="portfolio-link" data-bs-toggle="modal" href="#${item.modalId}">
                            <div class="portfolio-hover">
                                <div class="portfolio-hover-content"><i class="fas fa-plus fa-3x"></i></div>
                            </div>
                            <img class="img-fluid" src="${item.image}" alt="${item.title}" />
                        </a>
                        <div class="portfolio-caption">
                            <div class="portfolio-caption-heading">${item.title}</div>
                            <div class="portfolio-caption-subheading text-muted">${item.subtitle}</div>
                        </div>
                    </div>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', portfolioHtml); // Add HTML to the container
        });

        // After dynamically adding portfolio items, re-initialize Bootstrap modals
        // This is crucial because Bootstrap's JS often attaches event listeners
        // when the page loads, and new elements added later won't have them.
        // The Agency template's scripts.js might already handle this implicitly
        // for modal links using data-bs-toggle. If not, you'd need something like:
        // var myModal = new bootstrap.Modal(document.getElementById('portfolioModal1'));
        // (This part might be tricky with the template's existing JS, so keep an eye on it)
        // For now, we'll assume Bootstrap's data-bs-toggle works or is handled by their script.
        // For new modals, you'd likely need to ensure the modal HTML structure is also dynamically generated
        // and attached to the DOM, then initialize them.
        // For our simple purpose, we're just injecting the grid items.
        // The modal popups linked by href="#portfolioModalX" will only work if the corresponding
        // modal HTML is already present in index.html or you dynamically add those too.
        // For this step, we're focusing on the grid items.

    } catch (error) {
        console.error('Error fetching portfolio items:', error);
        container.innerHTML = '<p class="text-danger">Failed to load portfolio items. Please try again later.</p>';
    }
}

// Call the function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', loadPortfolioItems);