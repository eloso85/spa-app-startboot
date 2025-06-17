
//Navbar function
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

//Navbar Function end

//Load Pages Dynamically

const routes = {
    '/': 'home.html',
    '/services': 'services.html',
    '/portfolio': 'portfolio.html',
    '/about': 'about.html',
    '/team': 'team.html',
    '/contact': 'contact.html',
};

const loadPage = async (path) => {
    const file = routes[path] || 'home.html';
    const res = await fetch(`/partials/${file}`);
    const html = await res.text();
    document.getElementById('app').innerHTML = html;

    if (path === '/portfolio') loadPortfolioItems();
};

async function loadPortfolioItems() {
    try {
        const res = await fetch('http://localhost:3000/api/portfolio');
        const data = await res.json();
        const container = document.getElementById('portfolio-items-container');
        if (!container) return;

        container.innerHTML = data.map(item => `
      <div class="col-lg-4 col-sm-6 mb-4">
        <!-- Portfolio item -->
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
    `).join('');
    } catch (err) {
        console.error('Failed to load portfolio:', err);
    }
}


window.addEventListener('popstate', () => loadPage(location.pathname));

document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', e => {
        if (e.target.matches('a[data-link]')) {
            e.preventDefault();
            history.pushState(null, '', e.target.href);
            loadPage(location.pathname);
        }
    });

    loadPage(location.pathname);
});
