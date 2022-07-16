const categoryService = require('../services/categoryService');

const createCategory = async (req, res) => {
  const { name } = req.body;

  const newCategory = await categoryService.createCategory({ name });
  if (newCategory.message) {
    return res.status(newCategory.code).json({ message: newCategory.message }); 
  }

  res.status(201).json({ id: newCategory, name });
};

const getAllCategories = async (req, res) => {
  const categories = await categoryService.getAllCategories();

  res.status(200).json(categories);
};

module.exports = {
  createCategory,
  getAllCategories,
};