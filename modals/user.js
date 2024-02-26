const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: true,
    },
    email: {
        type: String,
        // required: true,
    },
    rollnumber: {
        type: String,
        // required: true,
    },
    password: {
        type: String,
        // required: true,
    },
    department: {
        type: String,
        // required: true,
    },
    picture: {
        type: String,
        default: "",
      },
    picturePath: {
        type: String,
        default: "",
      },
      friends: {
        type: Array,
        default: [],
      },
      location: String,
      occupation: String,
      viewedProfile: Number,
      impressions: Number,
    
    year: {
        type: String,
        // required: true,
    },
    club: [{
        type: String,
    }],
    
})
const User = mongoose.model('User', userSchema);

module.exports = User;
  