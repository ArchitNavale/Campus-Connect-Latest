const mongoose = require("mongoose");

const PMsgSchema = new mongoose.Schema(
  {
    sender: String,
    receiver: String,
    message: String,
    senderpicture: String,
    receiverpicture:String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("PMsg", PMsgSchema);