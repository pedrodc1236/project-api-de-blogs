const loginService = require('../services/loginServce');

const login = async (req, res) => {
  const { body } = req;
  const loginValid = await loginService(body);

  if (loginValid.message) {
    return res.status(loginValid.code).json({ message: loginValid.message });
  }

  const token = loginValid;

  res.status(200).json({ token });
};

module.exports = {
  login,
};