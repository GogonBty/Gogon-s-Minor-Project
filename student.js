const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    rollno: { type: Number, required: true },
    name: { type: String, required: true },
    degree: { type: String, required: true },
    city: { type: String, required: true }
});

module.exports = mongoose.model('Student', studentSchema);
