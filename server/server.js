const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json())

app.use('/api', require('./routes/api'));

app.listen(PORT, () => {
    console.log(`API server is running on http://localhost:${PORT}`);

});