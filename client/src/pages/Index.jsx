import axios from "@/config/axios";
import Card from "../components/card";
import { showToast } from "@/config/toastify";
import { useState, useEffect } from "react";
import AnimatedLoadingSkeletonList from "@/components/ui/animated-loading-skeleton";

const Index = () => {
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);

        const response = await axios.get("/blogs");
        const data = response.data;

        setBlogs(data.blogs);
        setLoading(false);
      } catch (error) {
        setLoading(false);

        const errorMessage =
          error.response?.data?.message || "Failed to fetch blogs";
        showToast("error", errorMessage);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <AnimatedLoadingSkeletonList />;

  if (blogs.length < 1)
    return (
      <div className="h-screen items-center justify-center">
        <p>No blogs found.</p>
      </div>
    );

  return (
    <div className="flex items-center flex-wrap gap-6 px-8 pb-4 justify-center md:justify-normal">
      {blogs.map((b) => (
        <Card key={b._id} id={b._id} blog={b} />
      ))}
    </div>
  );
};

export default Index;
