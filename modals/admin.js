const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    rollnumber: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    club: {
        type: String,
        required: true,
    },
})
mongoose.model('Admin', adminSchema);