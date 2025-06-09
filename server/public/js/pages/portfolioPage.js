const portfolioContent = `
    <section class="page-section bg-light" id="portfolio">  <div class="container">
            <div class="text-center">
                <h2 class="section-heading text-uppercase">Our Portfolio</h2>
                <h3 class="section-subheading text-muted">Explore our amazing work.</h3>
            </div>
            <div class="row" id="portfolio-items-container">
                <p>Loading portfolio items...</p>
            </div>
        </div>
    </section>
`;

export default {
    title: "Our Portfolio",
    content: portfolioContent,
    onRender: async () => {
        if (typeof loadPortfolioItems === 'function') {
            await loadPortfolioItems();
        } else {
            console.error("loadportfolioItems function not found! ensure its loaded before app.js");

        }
    }
}