import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
});

const categoryModel = mongoose.model("category", categorySchema, "categories");

export default categoryModel;
