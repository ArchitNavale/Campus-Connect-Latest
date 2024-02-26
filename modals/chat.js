const mongoose = require("mongoose");

const chatModel = mongoose.Schema(
  {
    // chatName: { type: String, trim: true },
    // isGroupChat: { type: Boolean, default: false },
    // users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    // latestMessage: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Message",
    // },
    // groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    senderId: {
      type: String, required: true,
    },
    club: {
      type: String,
      required: true,
    },
    senderName: {
      type: String, required: true,
    },
    message: {
      type: String, required: true,
    }
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatModel);

module.exports = Chat;
