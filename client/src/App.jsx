import React from "react";
import { Button } from "./components/ui/button";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/layout";
import Index from "./pages/Index";
import SignIn from "./pages/Signin";
import SignUp from "./pages/Signup";
import Profile from "./pages/Profile";
import Create from "./pages/Category/Create";
import List from "./pages/Category/List";
import Update from "./pages/Category/Update";
import Details from "./pages/Blog/Details";
import UserProtected from "./components/user-protected";
import ListByCategory from "./pages/Blog/ListByCategory";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="/blogs/:category" element={<ListByCategory />} />
          <Route path="/blog/:slug" element={<Details />} />

          <Route element={<UserProtected />}>
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route>
            <Route path="/categories" element={<List />} />
            <Route path="/category/add" element={<Create />} />
            <Route path="/category/update/:id" element={<Update />} />
          </Route>
        </Route>

        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
