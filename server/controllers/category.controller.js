import { validationResult } from "express-validator";
import { errorHandler } from "../helpers/errorHandler.js";
import categoryModel from "../models/category.model.js";

export const createCategory = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name } = req.body;

    const alreadyExists = await categoryModel.findOne({ name });
    if (alreadyExists) {
      return next(errorHandler(400, "Category already exists."));
    }

    const category = await categoryModel.create({
      name,
    });

    return res
      .status(201)
      .json({ message: "Category created successfully.", category });
  } catch (error) {
    return next(errorHandler(500, error.message));
  }
};

export const getAllCategories = async (req, res, next) => {
  try {
    const categories = await categoryModel.find();
    return res
      .status(200)
      .json({ message: "Fetched categories successfully", categories });
  } catch (error) {
    return next(errorHandler(500, error.message));
  }
};

export const updateCategory = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name } = req.body;
    const { id } = req.params;

    const category = await categoryModel.findById(id);
    if (!category) {
      return next(errorHandler(404, "Category not found."));
    }

    const nameExists = await categoryModel.findOne({ name });
    if (nameExists && nameExists._id.toString() !== id) {
      return next(errorHandler(409, "Category name already in use."));
    }

    const updatedCategory = await categoryModel.findByIdAndUpdate(
      id,
      {
        name,
      },
      { new: true }
    );
    return res.status(200).json({
      message: "Updated category successfully.",
      category: updatedCategory,
    });
  } catch (error) {
    return next(errorHandler(500, error.message));
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const category = await categoryModel.findById(id);
    if (!category) {
      return next(errorHandler(404, "Category not found."));
    }

    await categoryModel.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Deleted category successfully.",
    });
  } catch (error) {
    return next(errorHandler(500, error.message));
  }
};
