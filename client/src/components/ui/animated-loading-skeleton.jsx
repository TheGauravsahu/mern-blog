import { motion } from "framer-motion";
import React from "react";

const AnimatedLoadingSkeleton = () => {
  return (
    <div className="bg-background rounded-lg shadow-md overflow-hidden w-80 border p-4">
      <div className="flex items-center mb-4">
        <motion.div
          className="w-10 h-10 rounded-full bg-gray-300 mr-4"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        ></motion.div>
        <motion.div
          className="h-4 bg-gray-300 rounded w-3/4"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        ></motion.div>
      </div>
      <motion.div
        className="w-full h-48 bg-gray-300 rounded-lg mb-4"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      ></motion.div>
      <motion.div
        className="h-4 bg-gray-300 rounded w-1/2 mb-2"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      ></motion.div>
      <motion.div
        className="h-6 bg-gray-300 rounded w-full mb-2"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      ></motion.div>
      <motion.div
        className="h-6 bg-gray-300 rounded w-5/6"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      ></motion.div>
    </div>
  );
};

const AnimatedLoadingSkeletonList = () => {
  return (
    <div className="flex flex-wrap gap-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <AnimatedLoadingSkeleton key={index} />
      ))}
    </div>
  );
};

export default AnimatedLoadingSkeletonList;
