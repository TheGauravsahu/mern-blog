import { AlignJustify, LogIn } from "lucide-react";
import { useSidebar } from "./ui/sidebar";
import { Link } from "react-router-dom";
import SearchBar from "./searchbar";
import { Button } from "./ui/button";

const Navbar = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <div className="w-full p-4  border-b border-gray-200 fixed top-0 left-0 right-0 z-[9999] bg-white flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <button onClick={toggleSidebar} className="md:hidden">
          <AlignJustify />
        </button>
        <Link to="/" className="text-xl font-semibold">
          MERN Blogs
        </Link>
      </div>

      <div className="w-1/3 md:block hidden">
        <SearchBar />
      </div>

      <div>
        <Button className="rounded-full">
          <LogIn />
          <Link to="/signin">Sign in</Link>
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
