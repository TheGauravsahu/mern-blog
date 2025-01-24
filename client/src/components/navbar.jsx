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
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "@/config/toastify";
import axios from "@/config/axios";
import { removeUser } from "@/store/user.slice";
import { ModeToggle } from "./mode-toggle";

const Navbar = () => {
  const { toggleSidebar } = useSidebar();
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const response = await axios.post("/users/logout");
      const data = response.data;

      dispatch(removeUser());
      localStorage.removeItem("token");
      showToast("success", data.message);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to logout";
      showToast("error", errorMessage);
    }
  };

  return (
    <div className="w-full p-4 border-b border-gray-200 dark:border-gray-700 fixed top-0 left-0 right-0 z-20 bg-background text-foreground flex items-center justify-between gap-4 px-8">
      <div className="flex items-center gap-2">
        <button
          onClick={toggleSidebar}
          className="md:hidden text-gray-700 dark:text-gray-200"
        >
          <AlignJustify />
        </button>
        <Link
          to="/"
          className="text-xl font-semibold text-gray-900 dark:text-white"
        >
          MERN Blogs
        </Link>
      </div>

      <div className="w-1/3 md:block hidden">
        <SearchBar />
      </div>

      <div className="flex items-center gap-2">
        <div>
          {user.isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage
                    className="object-cover"
                    src={user.user.avatar}
                  />
                  <AvatarFallback className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white">
                    {user.user.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="*:cursor-pointer mr-4 bg-background text-gray-900 dark:text-white">
                <DropdownMenuLabel className="text-gray-900 dark:text-white">
                  {user.user.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
                <DropdownMenuItem className="hover:bg-gray-100 dark:hover:bg-gray-700">
                  <User className="mr-2 text-gray-700 dark:text-gray-300" />
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Plus className="mr-2 text-gray-700 dark:text-gray-300" />
                  <Link to="/blogs/add">Create Blog</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleLogout()}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <LogOut className="mr-2 text-gray-700 dark:text-gray-300" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button className="rounded-full bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200">
              <LogIn className="mr-2" />
              <Link to="/signin">Sign in</Link>
            </Button>
          )}
        </div>
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
