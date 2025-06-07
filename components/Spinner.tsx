"use client";

import { motion } from "framer-motion";

const Spinner = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-20 h-20 z-10 relative animate-spin rounded-full border-[5px] border-secondary border-t-accent shadow-lg"
    >
      <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-accent rounded-full transform -translate-x-1/2 -translate-y-1/2" />
    </motion.div>
  );
};

export default Spinner;
