import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const UserProtected = () => {
  const { user } = useSelector((state) => state.user);

  if (user && user.isLoggedIn) {
    return <Outlet />;
  } else {
    return <Navigate to={"/signin"} />;
  }
};

export default UserProtected;
