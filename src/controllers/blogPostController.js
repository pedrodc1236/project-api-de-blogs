const blogPostService = require('../services/blogPostService');

const createPost = async (req, res) => {
  const { body } = req;
  const { email } = req.user;
  const newPost = await blogPostService.createPost(body, email);

  if (newPost.message) {
    return res.status(newPost.code).json({ message: newPost.message });
  }

  res.status(201).json(newPost);
};

const getAll = async (_req, res) => {
  const all = await blogPostService.getAll();

  res.status(200).json(all);
};

module.exports = {
  createPost,
  getAll,
};