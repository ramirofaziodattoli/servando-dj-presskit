"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";

const Preloader: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      document.body.style.cursor = "default";
      window.scrollTo(0, 0);
    }, 1000);
    setDimension({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${
    dimension.height
  } Q${dimension.width / 2} ${dimension.height + 300} 0 ${
    dimension.height
  }  L0 0`;

  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${
    dimension.height
  } Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height}  L0 0`;

  const curve = {
    initial: {
      d: initialPath,

      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
    },

    exit: {
      d: targetPath,

      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 },
    },
  };

  const slideUp = {
    initial: {
      top: 0,
    },
    exit: {
      top: "-100vh",
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          variants={slideUp}
          initial="initial"
          exit="exit"
          className={
            "w-screen h-screen flex items-center justify-center fixed z-[99] bg-secondary"
          }
        >
          <p className="hidden">⪩༏⪨</p>
          {dimension.width > 0 && (
            <>
              <Spinner />
              <svg
                className="absolute top-0 w-screen"
                style={{ height: `calc(100% + 300px)` }}
              >
                <motion.path
                  variants={curve}
                  initial="initial"
                  exit="exit"
                  className={"fill-secondary"}
                ></motion.path>
              </svg>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
