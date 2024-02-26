const mongoose = require('mongoose');

const announcementSch = new mongoose.Schema({
    content: {
        type: String,
    },
    by: {
        type: String,
    },
    year: {
        type: String,
    },
    department: {
        type: String,
    },
    club: {
        type: String,
    },
    isPrivate: {
        type: Boolean,
        default: false,
    },
    deadline: {
        type: Date,
        required: true,
    },

    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
    }],
})

mongoose.model('Announcement', announcementSch);