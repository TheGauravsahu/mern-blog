import { CalendarDays } from "lucide-react";

const Card = ({ blog }) => {
  
  const formattedDate = new Date(blog.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-80 border p-4 cursor-pointer hover:shadow-lg hover:scale-95 transition-all ease-in-out">
      <div className="flex items-center">
        {blog.author_img && (
          <img
            src={blog.author.avatar}
            alt={blog.author.name}
            className="w-10 h-10 rounded-full mr-4"
          />
        )}
        <div>
          <p className="font-semibold">{blog.author.name}</p>
        </div>
      </div>

      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-48 object-cover rounded-lg my-4"
        />
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
