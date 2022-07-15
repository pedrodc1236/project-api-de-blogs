const jwt = require('jsonwebtoken');
const { User } = require('../database/models');

const { JWT_SECRET } = process.env;

const validateBody = async (body) => {
  const { email, password } = body;
  if (!email || !password) return { code: 400, message: 'Some required fields are missing' };

  const userValid = await User.findOne({ where: { email, password } });
  if (!userValid) return { code: 400, message: 'Invalid fields' };
  
  return {};
};  

module.exports = async (reqBody) => {
  const validate = await validateBody(reqBody);

  if (validate.message) return validate;

  const payload = {
    email: reqBody.email,
  };

  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: '7d',
  });

  return token;
};