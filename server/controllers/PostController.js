import PostModel from '../models/Post.js';

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate('user').populate('comments').exec();
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
    })
  }
}

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;
    const updatedPost = await PostModel.findOneAndUpdate(
      { _id: postId },
      { $inc: { viewsCount: 1 } },
      { returnDocument: 'after' }
    )
      .populate('user')
      .exec();

    if (!updatedPost) {
      return res.status(404).json({
        message: 'Not found',
      });
    }

    const { comments, ...postData } = updatedPost;
    res.json(postData);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
    })
  }
}

export const create = async (req, res) => {
  try {
    const post = new PostModel({
      ...req.body,
      user: req.userId,
    });
    const postData = await post.save();
    res.json(postData._id);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
    })
  }
}

export const likePost = async (req, res) => {
  const postId = req.params.id;
  if (!postId) {
    return res.status(404).json({
      message: 'Not found',
    });
  }

  const post = await PostModel.findById(postId);
  if (!post) {
    return res.status(404).json({
      message: 'Post not found',
    });
  }

  post.likesCount++;
  await post.save();

  res.json({
    success: true,
  });
}


export const dislikePost = async (req, res) => {
  const postId = req.params.id;
  if (!postId) {
    return res.status(404).json({
      message: 'Not found',
    });
  }

  const post = await PostModel.findById(postId);
  if (!post) {
    return res.status(404).json({
      message: 'Post not found',
    });
  }

  post.likesCount--;
  await post.save();

  res.json({
    success: true,
  });
}

export const update = async (req, res) => {

}

export const remove = async (req, res) => {

}



