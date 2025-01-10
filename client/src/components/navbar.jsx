import { AlignJustify, LogIn, LogOut, Plus, User } from "lucide-react";
import { useSidebar } from "./ui/sidebar";
import { Link } from "react-router-dom";
import SearchBar from "./searchbar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { toggleSidebar } = useSidebar();
  const user = useSelector((state) => state.user).user;

  return (
    <div className="w-full p-4  border-b border-gray-200 fixed top-0 left-0 right-0 z-20 bg-white flex items-center justify-between gap-4 px-8">
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
        {user.isLoggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src={user.user.avatar} />
                <AvatarFallback>{user.user.name?.charAt(0)}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="*:cursor-pointer mr-4">
              <DropdownMenuLabel>{user.user.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User />
                <Link to="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Plus />
                <Link to="/create">Create Blog</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogOut />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button className="rounded-full">
            <LogIn />
            <Link to="/signin">Sign in</Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
