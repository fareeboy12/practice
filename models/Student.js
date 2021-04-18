const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    _id: Number,
    regno: String,
    name: String,
});

module.exports = mongoose.model('Student', studentSchema);