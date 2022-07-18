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

const getById = async (req, res) => {
  const { id } = req.params;
  const post = await blogPostService.getById(id);

  if (post.message) return res.status(post.code).json({ message: post.message });

  res.status(200).json(post);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const { email } = req.user;

  const updatePost = await blogPostService.update(id, body, email);

  if (updatePost.message) return res.status(updatePost.code).json({ message: updatePost.message });

  res.status(200).json(updatePost);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const { email } = req.user;

  const removePost = await blogPostService.remove(id, email);

  if (removePost.message) return res.status(removePost.code).json({ message: removePost.message });

  res.status(204).end();
};

module.exports = {
  createPost,
  getAll,
  getById,
  update,
  remove,
};