const blogCategory = require("../models/blogCatModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const createBlogCategory = asyncHandler(async (req, res) => {
  try {
    const newBlogCategory = await blogCategory.create(req.body);
    res.json(newBlogCategory);
  } catch (error) {
    throw new Error(error);
  }
});
const updateBlogCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedBlogCategory = await blogCategory.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedBlogCategory);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteBlogCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedBlogCategory = await blogCategory.findByIdAndDelete(id);
    res.json(deletedBlogCategory);
  } catch (error) {
    throw new Error(error);
  }
});
const getBlogCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaBlogCategory = await blogCategory.findById(id);
    res.json(getaBlogCategory);
  } catch (error) {
    throw new Error(error);
  }
});
const getallBlogCategory = asyncHandler(async (req, res) => {
  try {
    const getallBlogCategory = await blogCategory.find();
    res.json(getallBlogCategory);
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  createBlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
  getBlogCategory,
  getallBlogCategory,
};