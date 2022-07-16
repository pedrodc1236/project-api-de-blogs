const categoryService = require('../services/categoryService');

const createCategory = async (req, res) => {
  const { name } = req.body;

  const newCategory = await categoryService.createCategory({ name });
  if (newCategory.message) {
    return res.status(newCategory.code).json({ message: newCategory.message }); 
  }

  res.status(201).json({ id: newCategory, name });
};

module.exports = {
  createCategory,
};