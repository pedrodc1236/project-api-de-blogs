const userService = require('../services/userService');

const create = async (req, res) => {
  const { body } = req;
  const tokenOrError = await userService.create(body);

  if (tokenOrError.message) {
    return res.status(tokenOrError.code).json({ message: tokenOrError.message });
  }

  const token = tokenOrError;
  res.status(201).json({ token });
};

const getAll = async (req, res) => {
  const users = await userService.getAll();
  
  res.status(200).json(users);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const users = await userService.getById(id);

  if (users.message) {
    return res.status(users.code).json({ message: users.message });
  }

  res.status(200).json(users);
};

module.exports = {
  create,
  getAll,
  getById,
};