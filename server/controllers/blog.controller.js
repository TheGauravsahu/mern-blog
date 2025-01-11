import { errorHandler } from "../helpers/errorHandler.js";
import * as blogService from "../services/blog.service.js";
import { validationResult } from "express-validator";

export const createBlog = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, content, image, category, author } = req.body;

    const blog = await blogService.create({
      title,
      content,
      image,
      category,
      author,
    });

    return res
      .status(201)
      .json({ message: "Blog created successfully.", blog });
  } catch (error) {
    next(errorHandler(400, error.message));
  }
};
