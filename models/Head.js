const mongoose = require('mongoose');

const headSchema = mongoose.Schema({
    _id: Number,
    headname: String, 
    total: Number
});

module.exports = mongoose.model('Head', headSchema);
