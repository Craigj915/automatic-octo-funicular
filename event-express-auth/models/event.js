const mongoose = require('mongoose');

const adSchema = mongoose.Schema({
    name: String,
    location: String,
    maps: String,
    description: String,
});

module.exports.Ad = mongoose.model('Ad', adSchema)