// import mongoose from "mongoose";
const mongoose = require("mongoose")

const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      // required: true,
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: {
      type: Map,
      of: Boolean,
    },

    
    comments: {
      type: [
        {
          userId: String,
          comment: String,
          name: String,
          picturePath: String,
          time : String
        },
      ],
      
    },
    
    report: {
      type: Map,
      of: Boolean,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports=  Post;
