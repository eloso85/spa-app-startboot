const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

//Api route to serve portfolio data
app.get("/api/portfolio", (req, res) => {
  const portfolioData = require("./data/portfolio.json");
  res.json(portfolioData);
});

// Handle SPA routing - exclude files with extensions
app.get(/^(?!.*\.[a-zA-Z0-9]+$).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start the server
app.listen(port, () => {
  console.log(`Vanilla SPA app running at http://localhost:${port}`);
  console.log("Access API data at: http://localhost:${port}/api/portfolio");
});

