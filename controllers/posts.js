


// import Post from "../modals/Post";
const Post = require("../modals/Post")
// import User from "../modals/user";
const User = require ("../modals/user")

/* CREATE */
const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    // console.log('from controller posts', req.body)
    // console.log("posts se",userId)
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      name: user.name,
      description,
      userPicturePath: user.picture,
      picturePath,
      likes: {},
      comments: [],
      report: {},
    });
    await newPost.save();

    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* CREATE */
const createComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, comment , name , picturePath , time} = req.body;
    const post = await Post.findById(id);
    post.comments.push({ userId, comment , name , picturePath , time});
    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};



/* READ */
const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const reportPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.report.get(userId);

    if (isLiked) {
      post.report.delete(userId);
    } else {
      post.report.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { report: post.report },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};





/* DELETE */
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPost = await Post.findByIdAndDelete(id);
    res.status(200).json(deletedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const post = await Post.findById(postId);

    // Find the index of the comment with the given commentId
    const commentIndex = post.comments.findIndex((comment) => comment._id == commentId);

    // If the comment is found, remove it from the comments array
    if (commentIndex !== -1) {
      post.comments.splice(commentIndex, 1);
      const updatedPost = await post.save();
      res.status(200).json(updatedPost);
    } else {
      res.status(404).json({ message: 'Comment not found' });
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

module.exports =  {createPost,createComment,getFeedPosts, getUserPosts, likePost,reportPost,deletePost,deleteComment};