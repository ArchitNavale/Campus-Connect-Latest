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
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')
const path = require('path')
const fileURLToPath = require('url')
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user.js")
const postRoutes = require("./routes/posts")
const { register } = require("./controllers/auth")
const { createPost } = require("./controllers/posts.js")
const verifyToken = require("./middleware/auth.js")
const User = require("./modals/user")
const Admin = require("./modals/admin.js")
const Post = require("./modals/Post.js")
const PMsg = require("./modals/pmsg.js")
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

app.patch('/update-image-admin/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await Admin.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    user.picture = req.body.picture;
    user.picturePath = req.body.picturePath;

    await user.save();

    res.json({ message: 'Profile image updated successfully' });
  } catch (error) {
    console.error('Error updating profile image for admin:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.patch('/update-image/:userId', async (req, res) => {
  const { userId } = req.params;
  console.log("body",req.body);
  try {
    // Retrieve the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the user already has a profile image on Cloudinary
    // if (user.picture) {
    //   // Delete the existing image on Cloudinary (optional)
    //   await cloudinary.uploader.destroy(user.picture);
    // }

    // Upload the new image to Cloudinary
    // const result = await cloudinary.uploader.upload(req.body.image);

    // Update the user's profile image public ID in the database
    user.picture = req.body.picture;
    user.picturePath=req.body.picturePath
    console.log("userpicture",user.picture)
    // // Save the updated user object
    await user.save();

    res.json({ message: 'Profile image updated successfully' });
  } catch (error) {
    console.error('Error updating profile image:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/getReceiverPicture', async (req, res) => {
  try {
    const { receiverId } = req.query;

    // Assume you have a MongoDB model named User with a 'picture' field
    const receiver = await User.findById(receiverId);
    
    if (!receiver || !receiver.picture) {
      return res.status(404).json({ error: 'Receiver picture not found' });
    }

    res.json({ picture: receiver.picture });
  } catch (error) {
    console.error('Error fetching receiver picture:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/setchats', async (req, res) => {
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
  const x = await Club.find({});
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