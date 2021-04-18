const mongoose = require('mongoose');

const markSchema = mongoose.Schema({
    _id: Number,
    marks: Number,
    student: {
        type: Number, 
        ref: 'Student'
    },
    head: {
        type: Number, 
        ref: 'Head'
    }     
});

module.exports = mongoose.model('Mark', markSchema);