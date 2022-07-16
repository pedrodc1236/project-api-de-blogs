const jwt = require('jsonwebtoken');
const { User } = require('../database/models');

const { JWT_SECRET } = process.env;

const validateData = async (body) => {
  const { displayName, email, password } = body;
  const regex = /\S+@\S+\.\S+/;
  if (displayName.length < 8) {
    return { code: 400, message: '"displayName" length must be at least 8 characters long' };
  }
  if (!regex.test(email)) return { code: 400, message: '"email" must be a valid email' };
  if (password.length < 6) {
    return { code: 400, message: '"password" length must be at least 6 characters long' };
  }
  const emailNotUnique = await User.findOne({ where: { email } });
  if (emailNotUnique) return { code: 409, message: 'User already registered' };
  
  return {};
};

const create = async (reqBody) => {
  const validate = await validateData(reqBody);
  console.log(validate);
  if (validate.message) return validate;

  const { displayName, email, password, image } = reqBody;

  await User.create({ displayName, email, password, image });

  const payload = {
    email: reqBody.email,
  };

  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: '7d',
  });

  return token;
};

const getAll = async () => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
  });

  return users;
};

module.exports = {
  create,
  getAll,
};