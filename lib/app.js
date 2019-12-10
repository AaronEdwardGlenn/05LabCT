const express = require('express'); 
const app = express(); 
const Bear = require('./models/bears')

app.use(express.json()); 

app.post('/bears', (req, res) => {
    console.log('post req in app');
    Bear
    .create(req.body)
    .then(bear => {
        console.log('created bear', bear)
        res.send(bear);
    }); 
}); 

app.get('/bears', (req, res) => {
    Bear 
    .find()
    .then(bear => res.send (bear)); 
}); 

app.get('/bears/:bearId', (req, res) => {
    Bear
    .findById(req.params.bearId)
    .then(bear => res.send(bear)); 
}); 

app.patch('/bears/:bearId', (req, res) => {
    Bear
    .findByIdAndUpdate(req.params.bearId, req.body, { new: true })
    .then(bear => res.send(bear)); 
}); 

app.delete('/bears/:bearId', (req, res) => {
    Bear
    .findByIdAndDelete(req.params.bearId)
    .then(bear => res.send(bear)); 
}); 


module.exports = app; 