import blogModel from "../models/blog.model.js";

export const create = async ({ title, content, image, category, author }) => {
  const slug = generateSlug(title);
  console.log("--slug", slug);

  const blog = await blogModel.create({
    title,
    slug,
    content,
    image,
    category,
    author,
  });
  return blog;
};

const generateSlug = (title) => {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric characters with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens

  return slug;
};
