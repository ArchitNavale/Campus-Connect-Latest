const mongoose = require('mongoose');
const asyncHandler = require("express-async-handler");
const express = require("express");
const Chat =mongoose.model('Chat');
const router = express.Router();
const User = require("../modals/user");
router.get("/all-group-messages", async (req, res) => {
  const { club } = req.query;
  try {
    const messages = await Chat.find({club}).sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});
// router.post("/save-group-message", async (req, res) => {
//   const { message, sender_name, sender_id, sender_role } = req.body;

//   try {
//     const newMessage = new Message({
//       message: message,
//       sender_name: sender_name,
//       sender_id: sender_id,
//     });

//     const savedMessage = await newMessage.save();
//     res.json(savedMessage);
//   } catch (error) {
//     console.error("Error saving message:", error);
//     res.status(500).json({ error: "Failed to save message" });
//   }
// });
module.exports = router