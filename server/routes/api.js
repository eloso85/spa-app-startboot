const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

router.get('/portfolio', (req, res) => {
    const dataPath = path.join(__dirname, '..', 'public', 'data', 'portfolio.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    res.json(data);
});

module.exports = router;
