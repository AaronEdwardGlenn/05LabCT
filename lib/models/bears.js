const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    Species: {
        type: String, 
        required: true
    },
    Habitat: {
        type: String, 
        required: true
    }
}); 

module.exports = mongoose.model('bear', schema); 