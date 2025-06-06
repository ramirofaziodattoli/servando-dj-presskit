"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

interface InfiniteTextMoveOnScrollProps {
  text: string;
  className?: string;
  rotateOnLg?: boolean;
}

export default function InfiniteTextMoveOnScroll({
  text,
  className,
  rotateOnLg = false,
}: InfiniteTextMoveOnScrollProps) {
  const container = useRef(null);
  const [position, setPosition] = useState(0);

  const animate = () => {
    setPosition((prev) => (prev <= -100 ? 100 : prev - 1));
    requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestAnimationFrame(animate);
  }, []);

  const { scrollYProgress } = useScroll({
    target: container,

    offset: ["start end", "end start"],
  });

  const direction = 1;

  const translateX = useTransform(
    scrollYProgress,
    [0, 1],
    [150 * direction, -150 * direction]
  );

  return (
    <motion.div
      style={{ x: translateX.get() + position, left: "-10%" }} // Usa translateX.get() para obtener el valor numérico
      ref={container}
      className={twMerge(
        "relative whitespace-nowrap flex",
        className,
        rotateOnLg && " lg:rotate-90"
      )}
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <h5
          key={index}
          className="relative m-0 text-white text-[100px] font-bold pr-[20px] tracking-wider"
        >
          {text}
        </h5>
      ))}
    </motion.div>
  );
}
