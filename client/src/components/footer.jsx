import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="text-center  w-full p-4">
      <p className=" text-sm text-gray-400">
        &copy; {currentYear} Developed by{" "}
        <a target="_blank" href="https://gauravsahu.vercel.app/">
          Gaurav Sahu
        </a>
        .
      </p>
    </footer>
  );
};

export default Footer;
