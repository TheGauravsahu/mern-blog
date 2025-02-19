import { errorHandler } from "../helpers/errorHandler.js";
import blogModel from "../models/blog.model.js";
import * as blogService from "../services/blog.service.js";
import { validationResult } from "express-validator";
import { uploadFile } from "../config/pinata.config.js";
import categoryModel from "../models/category.model.js";
import { encode } from "entities";

export const createBlog = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, content, category, author } = req.body;
    const image = req.file;

    if (!image) {
      return res.status(400).json({ message: "Image is required." });
    }

    // Upload file to Pinata
    const pinataResponse = await uploadFile(
      image.buffer,
      image.originalname,
      image.mimetype
    );
    const imageUrl = `https://${process.env.GATEWAY_URL}/ipfs/${pinataResponse.IpfsHash}`;

    const blog = await blogService.create({
      title: encode(title),
      content,
      image: imageUrl,
      category,
      author,
    });

    return res
      .status(201)
      .json({ message: "Blog created successfully.", blog });
  } catch (error) {
    return next(errorHandler(500, error.message));
  }
};

export const getBlogDetails = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const blog = await blogModel
      .findOne({ slug })
      .populate("author", "name avatar")
      .populate("category", "name");

    if (!blog) {
      return next(errorHandler(404, "Blog not found."));
    }

    return res
      .status(200)
      .json({ message: "Blog fetched successfully.", blog });
  } catch (error) {
    return next(errorHandler(500, error.message));
  }
};

export const listUserBlogs = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const blogs = await blogModel
      .find({ author: _id })
      .populate("author", "name");

    return res
      .status(200)
      .json({ message: "Blogs fetched successfully.", blogs });
  } catch (error) {
    return next(errorHandler(500, error.message));
  }
};

export const listCategoryBlogs = async (req, res, next) => {
  try {
    const { category } = req.params;

    const categoryData = await categoryModel.findOne({ slug: category });
    if (!categoryData) {
      return next(404, "Category not found.");
    }

    const blogs = await blogModel
      .find({ category: categoryData._id })
      .populate("author", "name")
      .populate("category", "name slug")
      .lean()
      .exec();

    return res
      .status(200)
      .json({ message: "Blogs fetched successfully.", blogs });
  } catch (error) {
    return next(errorHandler(500, error.message));
  }
};

export const listAllBlogs = async (req, res, next) => {
  try {
    const blogs = await blogModel.find().populate("author", "name avatar");

    return res
      .status(200)
      .json({ message: "Blogs fetched successfully.", blogs });
  } catch (error) {
    return next(errorHandler(500, error.message));
  }
};

export const updateBlog = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const { title, content, category } = req.body;
    const image = req.file;

    // Upload file to Pinata
    let pinataResponse;
    if (image) {
      pinataResponse = await uploadFile(
        image.buffer,
        image.originalname,
        image.mimetype
      );
    }

    const imageUrl = `https://${process.env.GATEWAY_URL}/ipfs/${pinataResponse.IpfsHash}`;

    const blog = await blogModel.findOne({ slug });

    if (!blog) {
      return next(errorHandler(404, "Blog not found."));
    }

    const updatedBlog = await blogModel.findOneAndUpdate(
      { slug },
      {
        title,
        content,
        image: imageUrl,
        category,
      },
      {
        new: true,
      }
    );

    return res
      .status(200)
      .json({ message: "Blog updated successfully.", blog: updatedBlog });
  } catch (error) {
    return next(errorHandler(500, error.message));
  }
};

export const deleteBlog = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const blog = await blogModel.findOne({ slug });

    if (!blog) {
      return next(errorHandler(404, "Blog not found."));
    }

    await blogModel.findOneAndDelete({
      slug,
    });

    return res.status(200).json({ message: "Blog deleted successfully." });
  } catch (error) {
    return next(errorHandler(500, error.message));
  }
};
