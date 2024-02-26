const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const socket = require("socket.io");
const app = express()
require('./modals/user.js');
require('./modals/announcement.js');
require('./modals/admin.js');
require('./modals/chat.js');
require('./modals/Club.js');
// import { Server } from "socket.io";
// import bodyParser from "body-parser";
const bodyParser = require('body-parser')
// import multer from "multer";
const dotenv = require('dotenv')
// import helmet from "helmet";
const helmet = require('helmet')
const morgan = require('morgan')
// import morgan from "morgan";
// import path from "path";
const path = require('path')
// import { fileURLToPath } from "url";
const fileURLToPath = require('url')
// import authRoutes from "./routes/auth";
const authRoutes = require("./routes/auth")
// import userRoutes from "./routes/users.js";
const userRoutes = require("./routes/user.js")
const postRoutes = require("./routes/posts")
// import postRoutes from "./routes/posts.js";
// import { register } from "./controllers/auth";
const { register } = require("./controllers/auth")
// import { createPost } from "./controllers/posts.js";
const { createPost } = require("./controllers/posts.js")
// import { verifyToken } from "./middleware/auth.js";
const verifyToken = require("./middleware/auth.js")
// import User from "./modals/user.js";
const User = require("./modals/user")
const Post = require("./modals/Post.js")
const PMsg = require("./modals/pmsg.js")
// import Post from "./modals/Post.js";
// import { users, posts } from "./data/index.js";
const { users, posts } = require("./data/index.js")
const cloudinary = require('cloudinary').v2;


cloudinary.config({
  cloud_name: 'campusconnect-rajdeep',
  api_key: '113794327591269',
  api_secret: 'GrSUvqwxNSEknjgzIfaeuLTenoQ',
});

dotenv.config();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
// app.use("/assets", express.static(path.join(__dirname, "public/assets")));


app.get("/all-group-messages", async (req, res) => {
  const { club } = req.query;
  try {
    const messages = await Chat.find({ club }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

app.post('/setchats', async (req, res) => {
  console.log('archit sir', req.body)
  const newMsg = await new PMsg({
    ...req.body,
  });
  await newMsg.save();
  const {sender, receiver} = req.body;
  const messages = await PMsg.find({
    $or: [
      { sender: sender, receiver: receiver },
      { sender: receiver, receiver: sender }
    ]
  });
  res.json(messages);
});

app.get('/getmsgs', async (req, res) => {
  const {sender, receiver} = req.query;
  const messages = await PMsg.find({
    $or: [
      { sender, receiver },
      { sender: receiver, receiver: sender }
    ]
  });
  res.json(messages);
});

app.get('/allusers', async (req, res) => {
  const users = await User.find({})
  return res.json(users);
})
app.post("/posts", createPost);

app.post('/register', async (req, res) => {
  try {
    console.log('data is', req.body);
    const newUser = await new User({
      ...req.body,
    });
    await newUser.save();
    res.json({ message: 'registered successfully' });
  }
  catch (e) {
    console.log('error occured', e);
  }
});

app.get('/searching/:enterName', (req, res) => {
  console.log(req.params)
  // if(!req.params.enterName) {
  //     return res.status(422).json();
  // }
  // console.log('bhaihhhh')
  let userPattern = new RegExp("^" + req.params.enterName)
  User.find({ name: { $regex: userPattern } })
    .select("_id name")
    .then(user => {
      // console.log(user)
      if (user.length === 0) {
        return res.status(400).json(user);
      }
      return res.status(200).json(user);
    }).catch(err => {
      console.log(err)
    })

})
const Club = mongoose.model("Club");
app.get("/get-clubs", async (req, res) => {
  console.log('hellowolrd')
  const x = await Club.find({});
  console.log(x)
  return res.json(x);
});
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

mongoose.connect("mongodb://0.0.0.0:27017/latestCampusConnect", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("connected to mongoDB");
});
app.use(express.json());
app.use(cors())

const Chat = mongoose.model('Chat')
// const BlogPost = mongoose.model('BlogPost', {
//   content: String,
// });

// Create a route to handle storing content
// app.post('/api/blog', async(req, res) => {

//   const { content } = req.body;
//     console.log(content)
//   const newBlogPost = new BlogPost({ content });

//   newBlogPost
//     .save()
//     .then(post => {
//       res.json({ success: true, post });
//     })
//     .catch(err => {
//       res.status(500).json({ success: false, message: 'Error saving the blog post' });
//     });
//     const all = await BlogPost.find({})
//     console.log(all[0].content)
// });
//console.log(`🚀 Server ready at ${url}`);
app.use(require('./routes/user'));
app.use(require('./routes/announcement'))
app.use(require('./routes/messagecontroller'))




const server = app.listen(7000, () => {
  console.log('server is running on', 7000);
  //   User.insertMany(users);
  // Post.insertMany(posts);
})
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});
io.on("connection", (socket) => {
  socket.on("message", ({ message, senderId, senderName, club }) => {
    // console.log('messaging', {message, senderId, senderName})
    console.log('msg me'.club)
    const newMsg = new Chat({
      message,
      senderId,
      senderName,
      club,
    });
    newMsg.save();
    io.emit("message", { message, senderId, senderName });
  });

  // socket.on("add-user", (userId) => {
  //   onlineUsers.set(userId, socket.id);
  // });

  // socket.on("personal-message", (message) => {
  //   const { sender_id, receiver_id } = message;

  //   const senderSocketId = onlineUsers.get(sender_id);
  //   if (senderSocketId) {
  //     io.to(senderSocketId).emit("personal-message", message);
  //   }

  //   const recipientSocketId = onlineUsers.get(receiver_id);
  //   if (recipientSocketId) {
  //     io.to(recipientSocketId).emit("personal-message", message);
  //   }
  // });

  // socket.on("disconnect", () => {
  //   onlineUsers.forEach((socketId, userId) => {
  //     if (socketId === socket.id) {
  //       onlineUsers.delete(userId);
  //     }
  //   });
  // });


  socket.on("msgsolo", (messageData) => {
    const { sender, receiver, message } = messageData;
    const messageToSend = {
      sender,
      receiver,
      message,
    };
    io.emit("msgsolo", messageToSend);
  });
});