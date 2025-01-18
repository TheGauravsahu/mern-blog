import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "@/config/axios";
import AnimatedLoadingSkeletonList from "@/components/ui/animated-loading-skeleton";
import Card from "@/components/card";
import { LayoutGrid } from "lucide-react";

const ListByCategory = () => {
  const { category } = useParams();
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogsByCategory = async () => {
      try {
        setLoading(true);

        const response = await axios.get(`/blogs/${category}/all`);
        const data = response.data;

        setBlogs(data.blogs);
        console.log(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);

        const errorMessage =
          error.response?.data?.message || "Failed to fetch blogs";
        showToast("error", errorMessage);
      }
    };

    fetchBlogsByCategory();
  }, [category]);

  if (loading) return <AnimatedLoadingSkeletonList />;

  if (blogs.length < 1)
    return (
      <div className="h-screen items-center justify-center">
        <p>No blogs found.</p>
      </div>
    );

  return (
    <div>
      <h1 className="border-b mb-8 font-bold text-2xl px-8 pb-2 flex items-center  gap-2">
        <LayoutGrid />
        {blogs[0].category.name}
      </h1>
      <div className="flex items-center flex-wrap gap-6 px-8 pb-4 justify-center md:justify-normal">
        {blogs.map((b) => (
          <Card key={b._id} id={b._id} blog={b} />
        ))}
      </div>
    </div>
  );
};

export default ListByCategory;
