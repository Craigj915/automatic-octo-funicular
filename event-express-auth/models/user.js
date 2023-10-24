const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    company: String,
    picture: String,
    token: String,
});

module.exports.User = mongoose.model('User', userSchema)