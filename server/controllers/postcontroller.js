const Post = require("../models/Post")
const checkDistress = require("../utils/distresscheck");

module.exports.createPost = async (req, res) => {
  try {
    const { content } = req.body;

    // auto-flag if distress detected
    const flagged = checkDistress(content);

    const post = await Post.create({
      user: req.user.id,
      content,
      isFlagged: flagged,
      flagReason: flagged ? "distress" : null,
    });

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Report a post
module.exports.reportPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // prevent duplicate reports from same user
    if (post.reportedBy.includes(req.user.id)) {
      return res.status(400).json({
        success: false,
        message: "You have already reported this post",
      });
    }

    post.reportedBy.push(req.user.id);

    // update flagReason
    if (post.isFlagged && post.flagReason === "distress") {
      post.flagReason = "both";
    } else {
      post.isFlagged = true;
      post.flagReason = "reported";
    }

    await post.save();

    res.status(200).json({
      success: true,
      message: "Post reported successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports.getPosts = async (req, res) => {
    try {

        const posts = await Post.find()
            .populate("user", "anonymousName avatar")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            posts,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}


module.exports.getMyPosts = async (req, res) => {
    try {

        const posts = await Post.find({
            user: req.user.id,
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            posts,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// Delete Post
module.exports.deletePost = async (req, res) => {
    try {

        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        // Only owner can delete
        if (post.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Not authorized",
            });
        }

        await Post.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Post deleted successfully",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};