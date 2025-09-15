const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

const dataPath = path.join(__dirname, 'src/data.json');

// Get all products
app.get('/api/products', (req, res) => {
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading data file');
      return;
    }
    res.send(JSON.parse(data));
  });
});

// Update products
app.post('/api/products', (req, res) => {
  const newProducts = req.body;
  fs.writeFile(dataPath, JSON.stringify(newProducts, null, 2), (err) => {
    if (err) {
      res.status(500).send('Error writing data file');
      return;
    }
    res.send({ message: 'Products updated successfully' });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
