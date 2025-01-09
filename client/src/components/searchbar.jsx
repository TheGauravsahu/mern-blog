import React from "react";
import { Input } from "./ui/input";

const SearchBar = () => {
  return (
    <form>
      <Input placeholder="Search here..." className="rounded-full bg-gray-50 w-full" />
    </form>
  );
};

export default SearchBar;
