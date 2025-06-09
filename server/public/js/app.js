// public/js/app.js (Updated to use modules)

// Import page modules
import homePage from './pages/homePage.js';
import portfolioPage from './pages/portfolioPage.js';
// You'd import other pages like:
// import aboutPage from './pages/aboutPage.js';
// import contactPage from './pages/contactPage.js';

const routes = {
    '/': homePage,
    '/portfolio': portfolioPage,
    // Add other routes here, e.g.:
    // '/about': aboutPage,
    // '/contact': contactPage,
    '/404': {
        title: "Page Not Found",
        content: `
            <section class="page-section" id="not-found-section">
                <div class="container">
                    <div class="text-center">
                        <h1 class="section-heading text-uppercase">404 - Page Not Found</h1>
                        <p class="section-subheading text-muted">The URL you entered does not exist in our application.</p>
                    </div>
                </div>
            </section>
        `
    }
};

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};

const router = async () => {
    const path = window.location.pathname;
    const view = routes[path] || routes['/404'];
    document.title = view.title;

    const appDiv = document.getElementById('app');
    if (!appDiv) {
        console.error("#app div not found!");
        return;
    }
    appDiv.innerHTML = view.content; // Inject HTML content

    // Call the onRender function if it exists for the current view
    if (view.onRender && typeof view.onRender === 'function') {
        await view.onRender(); // Use await because loadPortfolioItems is async
    }

    // You might need to re-initialize Bootstrap's scrollspy or other dynamic JS features
    // that rely on the DOM being present.
    // window.bootstrap.ScrollSpy.getInstance(document.body)?.refresh(); // Example
    // Or, for Bootstrap's data-bs-toggle features, they usually work after content injection.
};

// Event listener for browser back/forward buttons (popstate event)
window.addEventListener('popstate', router);

// Event listener to handle clicks on internal links within the page
document.addEventListener('DOMContentLoaded', () => {
    // We listen on the body for clicks on any element that matches [data-link]
    document.body.addEventListener('click', e => {
        if (e.target.matches('[data-link]')) {
            e.preventDefault(); // Prevent the default link behavior (full page reload)
            navigateTo(e.target.href); // Navigate using our custom function
        }
        // Also check if the brand logo needs to be an SPA link
        if (e.target.closest('.navbar-brand') && e.target.closest('.navbar-brand').getAttribute('href') === '/' && e.target.closest('.navbar-brand').hasAttribute('data-link')) {
            e.preventDefault();
            navigateTo('/');
        }
    });

    router(); // Call router on initial page load
});