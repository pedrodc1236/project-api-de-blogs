const { Category } = require('../database/models');

const createCategory = async ({ name }) => {
  if (!name) return { code: 400, message: '"name" is required' };

  const { dataValues: { id } } = await Category.create({ name });

  return id;
};

const getAllCategories = async () => {
  const categories = await Category.findAll();

  return categories;
};

module.exports = {
  createCategory,
  getAllCategories,
};