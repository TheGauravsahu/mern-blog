import { CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";

const Card = ({ blog }) => {
  const formattedDate = new Date(blog.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div
      id={blog._id}
      className="bg-white rounded-lg shadow-md overflow-hidden w-80 border p-4 cursor-pointer hover:shadow-lg hover:scale-95 transition-all ease-in-out"
      style={{ transition: "transform 0.2s ease-in-out" }}
    >
      <div className="flex items-center">
        <img
          src={
            blog.author?.avatar
              ? blog.author?.avatar
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6xSz0eMW7GmpKukczOHvPWWGDqaBCqWA-Mw&s"
          }
          alt={blog.author.name}
          className="w-10 h-10 rounded-full mr-4 object-cover"
          style={{ transition: "transform 0.2s ease-in-out" }}
        />

        <div>
          <p className="font-semibold">{blog.author.name}</p>
        </div>
      </div>

      {blog.image && (
        <Link to={"/blog/" + blog.slug}>
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-48 object-cover rounded-lg my-4"
            style={{ transition: "transform 0.2s ease-in-out" }}
          />
        </Link>
      )}
      <div>
        <p className="text-gray-500 text-sm flex items-center mb-2 gap-1">
          <CalendarDays size={14} />
          {formattedDate}
        </p>
        <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
      </div>
    </div>
  );
};

export default Card;
