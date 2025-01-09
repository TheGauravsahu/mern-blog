import { CalendarDays } from "lucide-react";

const Card = () => {
  const blog = {
    author: "John Doe",
    author_img:
      "https://images.unsplash.com/photo-1736266602950-765dbdcfb9f1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Hello World: Your first progam",
    image:
      "https://images.unsplash.com/photo-1736246633159-bc8735d6c63b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: "This is a blog post",
    created_at: "9-january-2025",
  };
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-80 border p-4 cursor-pointer hover:shadow-lg hover:scale-95 transition-all ease-in-out">
      <div className="flex items-center">
        {blog.author_img && (
          <img
            src={blog.author_img}
            alt={blog.author}
            className="w-10 h-10 rounded-full mr-4"
          />
        )}
        <div>
          <p className="font-semibold">{blog.author}</p>
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
          {blog.created_at}
        </p>
        <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
      </div>
    </div>
  );
};

export default Card;
