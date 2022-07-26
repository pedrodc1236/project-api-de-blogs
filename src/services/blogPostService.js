const { Op } = require('sequelize');
const { BlogPost, User, PostCategory, Category } = require('../database/models');

const validateBody = async ({ title, content, categoryIds }) => {
  if (!title || !content || !categoryIds) {
    return { code: 400, message: 'Some required fields are missing' };
  } 
  if (!Array.isArray(categoryIds)) {
    return { code: 400, message: '"categoryIds" not found' };
  }

  return {};
};

const validateCategories = async (categoryIds) => {
  const test = await Promise.all(categoryIds.map(async (id) => {
    const exists = await Category.findOne({ where: { id } });
    return exists;
  }));

  for (let index = 0; index < test.length; index += 1) {
    if (!test[index]) {
      return { code: 400, message: '"categoryIds" not found' };
    }
  }

  return {};
};

const validateBodyUpdate = async (body) => {
  const { title, content } = body;
  if (!title || !content) return { code: 400, message: 'Some required fields are missing' };
  
  return {};
};

const validateUserAuthorization = async (id, email) => {
  const userLogged = await User.findOne({ where: { email } });
  const userId = userLogged.id;
  const userPost = await BlogPost.findByPk(id);
  if (!userPost) return { code: 404, message: 'Post does not exist' };
  const userIdPost = userPost.userId;

  if (userId !== userIdPost) return { code: 401, message: 'Unauthorized user' };

  return {};
};

const createPost = async (reqBody, email) => {
  const { title, content, categoryIds } = reqBody;

  const validate = await validateBody({ title, content, categoryIds });
  if (validate.message) return validate;
  const validateTwo = await validateCategories(categoryIds);
  console.log(validateTwo);
  if (validateTwo.message) return validateTwo;

  const userLogged = await User.findOne({ where: { email } });
  const userId = userLogged.dataValues.id;
  const newPost = await BlogPost
    .create({ title, content, userId, published: new Date(), updated: new Date() });

  await Promise.all(categoryIds.map((idCategory) => PostCategory
    .create({ postId: newPost.id, categoryId: idCategory })));
  
  return { id: newPost.id,
    title,
    content,
    userId, 
    updated: newPost.updated,
    published: newPost.published };
};

const getAll = async () => {
  const all = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return all;
};

const getById = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  if (!post) return { code: 404, message: 'Post does not exist' };

  return post;
};

const update = async (id, reqBody, email) => {
  const validate = await validateBodyUpdate(reqBody);
  if (validate.message) return validate;
  const validateTwo = await validateUserAuthorization(id, email);
  if (validateTwo.message) return validateTwo;

  const { title, content } = reqBody;

  await BlogPost.update({ title, content }, { where: { id } });

  const post = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return post;
};

const remove = async (id, email) => {
  const validate = await validateUserAuthorization(id, email);
  if (validate.message) return validate;

  const removePost = await BlogPost.destroy({ where: { id } });
  console.log(removePost);

  if (!removePost) return { code: 404, message: 'Post does not exist' };

  return true;
};

const query = async (q) => {
  const post = await BlogPost.findAll({
    where: {
      [Op.or]: [
        {
          title: {
            [Op.like]: `%${q}%`,
          },
        },
        {
          content: {
            [Op.like]: `%${q}%`,
          },
        },
      ],
    },
  });
  const postIds = post.map(({ id }) => id);
  return postIds;
};

module.exports = {
  createPost,
  getAll,
  getById,
  update,
  remove,
  query,
};