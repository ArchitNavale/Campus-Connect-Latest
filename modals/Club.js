const mongoose = require('mongoose');

const clubSch = new mongoose.Schema({
    club: {
        type: String,
    },
})

mongoose.model('Club', clubSch);