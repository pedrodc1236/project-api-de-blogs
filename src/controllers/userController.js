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

module.exports = {
  create,
};