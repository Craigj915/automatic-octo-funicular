const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    name: String,
    price: Number,
    location: String,
    maps: String,
});

module.exports.Event = mongoose.model('Event', eventSchema)