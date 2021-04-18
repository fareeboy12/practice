const mongoose = require('mongoose');

const gradeSchema = mongoose.Schema({
    _id: Number,
    start: Number,
    end: Number,
    grade: String,
    gpa: Number
});

module.exports = mongoose.model('Grade', gradeSchema);
