import CommentModel from '../models/Comment.js';
import PostModel from '../models/Post.js';

export const getByPostId = async (req, res) => {
  try {
    const postId = req.params.postId;
    if (!postId) {
      return res.status(404).json({
        message: 'Not found',
      });
    }

    const post = await PostModel.findById(postId).populate('comments');
    if (!post) {
      return res.status(404).json({
        message: 'Post not found',
      });
    }

    const postComments = post.comments
    res.json(postComments);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
    })
  }
}

export const create = async (req, res) => {
  try {
    const postId = req.body.postId;
    const post = await PostModel.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: 'Post not found',
      });
    }

    const comment = new CommentModel({
      text: req.body.text,
      user: req.userId,
    });
    await comment.save();

    post.comments.push(comment);
    await post.save();

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
    })
  }
}

