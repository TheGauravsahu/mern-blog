import LoadingSpinner from "@/components/loading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "@/config/axios";
import { showToast } from "@/config/toastify";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { decode } from "entities";

const Details = () => {
  const { slug } = useParams();

  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState();

  useEffect(() => {
    const getBlogDetail = async () => {
      setLoading(true);
      try {
        const data = (await axios.get(`/blogs/${slug}`)).data;
        setBlog(data.blog);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        const errorMessage =
          error.response?.data?.message || "Failed to fetch blog details.";
        showToast("error", errorMessage);
      }
    };

    getBlogDetail();
  }, []);

  if (!blog) return <div>Blog not found.</div>;

  const formattedDate = new Date(blog.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  if (loading) return <LoadingSpinner />;

  return (
    <div className="md:flex-nowrap flex-wrap flex justify-between gap-20 h-full w-full">
      <div className="border rounded md:w-[70%] w-full p-5">
        <h1 className="text-2xl font-bold mb-5">{blog.title}</h1>
        <div className="flex justify-between items-center">
          <div className="flex justify-between items-center gap-5">
            <Avatar>
              <AvatarImage className="object-cover" src={blog.author.avatar} />
              <AvatarFallback>{blog.author.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-bold">{blog.author.name}</p>
              <p className="text-xs text-gray-400">Date: {formattedDate}</p>
            </div>
          </div>
          <div className="flex justify-between items-center gap-5">
            {/* <LikeCount props={{ blogid: blog._id }} /> */}
            {/* <CommentCount props={{ blogid: blog._id }} />  */}
          </div>
        </div>
        <div className="my-5 h-[30rem] w-full overflow-hidden object-center">
          <img
            src={blog.image}
            className="rounded object-center h-full w-full object-cover"
          />
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: decode(blog.content) || "",
          }}
        ></div>

        <div className="border-t mt-5 pt-5">
          {/* <Comment props={{ blogid: blog._id }} /> */}
        </div>
      </div>
    </div>
  );
};

export default Details;
