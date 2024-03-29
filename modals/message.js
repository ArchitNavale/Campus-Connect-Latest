const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    club: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    sender_name: {
      type: String,
      required: true,
    },
    sender_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "USER",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Message", MessageSchema);