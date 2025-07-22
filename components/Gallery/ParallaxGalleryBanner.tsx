"use client";
import {
  useScroll,
  useTransform,
  motion,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import Text from "../Text/Text";

const ParallaxGalleryBanner = () => {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,

    offset: ["start start", "end end"],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);
  const scale10 = useTransform(scrollYProgress, [0, 1], [1, 10]);
  const scale11 = useTransform(scrollYProgress, [0, 1], [1, 11]);

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);

  const [showTitle, setShowTitle] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 0.6) {
      setShowTitle(true);
    } else {
      setShowTitle(false);
    }
  });

  const scales = {
    0: scale4,
    1: scale5,
    2: scale6,
    3: scale8,
    4: scale9,
    5: scale10,
    6: scale11,
    7: scale11,
  };

  return (
    <section
      ref={container}
      className={twMerge(
        "h-[200vh] relative bg-gradient-to-b from-secondary to-secondary-lighter section-mt section-pt"
      )}
    >
      <div className={twMerge("sticky overflow-hidden top-0 h-screen")}>
        {Array.from({ length: 8 }).map((_, i) => {
          return (
            <motion.div
              key={i}
              style={{
                scale: scales[i],
                opacity: i === 0 ? opacity : opacity,
              }}
              className={twMerge(
                "w-full h-full top-0 absolute flex items-center justify-center overflow-hidden"
              )}
            >
              <div
                className={twMerge(
                  "relative w-[25vw] h-[25vh]",
                  i === 1 && "-top-[30vh] left-[5vw] w-[35vw] h-[30vh] ",
                  i === 2 &&
                    "top-[32vh] left-[35vw] w-[25vw] lg:w-[15vw] h-[30vh]",
                  i === 3 && "-top-[10vh] left-[-25vw] w-[20vw] h-[45vh] ",
                  i === 4 && "left-[27.5vw] w-[25vw] h-[25vh] ",
                  i === 5 && "top-[27.5vh] left-[5vw] w-[20vw] h-[25vh] ",
                  i === 6 && "top-[27.5vh] left-[-22.5vw] w-[30vw] h-[25vh] ",
                  i === 7 && "-top-[30vh] left-[35vw] w-[20vw] h-[30vh]"
                )}
              >
                <Image
                  src={`/images/gallery/image-${i + 1}.webp`}
                  alt="image"
                  className="object-cover"
                  fill
                  sizes="(max-width: 900px) 100vw, 700px"
                  quality={60}
                  priority={i < 2}
                  loading={i < 2 ? "eager" : "lazy"}
                />
              </div>
            </motion.div>
          );
        })}

        <AnimatePresence mode="wait">
          {showTitle && (
            <motion.div
              key="gallery-title"
              className="sticky top-0 w-full h-full flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Text variant="title">GALERÍA</Text>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ParallaxGalleryBanner;
