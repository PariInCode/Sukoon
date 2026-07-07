const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const {
  createPost,
  getPosts,
  getMyPosts,
  deletePost,
} = require("../controllers/postController");

router.post("/", auth, createPost);

router.get("/", auth, getPosts);

router.get("/my-posts", auth, getMyPosts);

router.delete("/:id", auth, deletePost);

module.exports = router;