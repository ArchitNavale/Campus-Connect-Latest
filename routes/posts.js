// import express from "express";
const express  = require('express')
const { getFeedPosts, getUserPosts, likePost,deletePost,reportPost, createComment,deleteComment } = require("../controllers/posts.js")
// import { getFeedPosts, getUserPosts, likePost,deletePost,reportPost, createComment } from "../controllers/posts.js";
// import { verifyToken } from "../middleware/auth.js";
const  { verifyToken } = require("../middleware/auth.js")

const router = express.Router();
/* CREATE */
router.post("/:id/comments", verifyToken, createComment);



/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);
router.patch("/:id/report", verifyToken, reportPost);


/* DELETE */
router.delete("/:id", verifyToken, deletePost);
router.delete("/:postId/comments/:commentId", verifyToken, deleteComment);



module.exports =  router;
