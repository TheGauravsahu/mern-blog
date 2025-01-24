import React from "react";
import { Input } from "./ui/input";

const SearchBar = () => {
  return (
    <form>
      <Input placeholder="Search here..." className="rounded-full bg-background w-full" />
    </form>
  );
};

export default SearchBar;
