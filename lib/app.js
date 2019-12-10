const express = require('express'); 
const app = express(); 
const Bear = require('./models/bears')

app.use(express.json()); 

app.post('./bears', (req, res) => {
    Bear
    .create(req.body)
    .then(bear => res.send(bear)); 
}); 

module.exports = app; 