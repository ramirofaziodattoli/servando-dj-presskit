"use client";
import {
  AnimatePresence,
  inView,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { useInView } from "react-intersection-observer";
import { twMerge } from "tailwind-merge";

export interface AnimatedTextProps {
  content: string;
  Tag?: React.ElementType;
  className?: string;
  variant: keyof typeof VARIANTS;
  type?: "letters-blur" | "vertical-move";
}

export const VARIANTS = {
  title: "text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold",
  subtitle: "text-2xl md:text-left md:text-3xl lg:text-4xl xl:text-5xl",
  content: "text-md md:text-left font-thin leading-6",
  custom: "",
} as const;

const AnimatedText: React.FC<AnimatedTextProps> = ({
  type = "letters-blur",
  ...props
}) => {
  if (type === "letters-blur") {
    return <LettersBlurText {...props} />;
  } else if (type === "vertical-move") {
    return <VerticalMoveText {...props} />;
  }
};

const LettersBlurText: React.FC<AnimatedTextProps> = ({
  content,
  variant,
  Tag = "span",
  className,
}) => {
  const letters = content.split("");

  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <div
      ref={ref}
      className={twMerge(
        "flex items-center justify-center overflow-hidden py-4",
        className
      )}
    >
      {letters.map((letter, index) => (
        <AnimatePresence key={`${letter}-${index}`} mode="wait">
          {inView && (
            <motion.span
              key={`${letter}-${index}-motion`}
              initial={{ y: 120 }}
              animate={{ y: 0 }}
              exit={{ y: -120 }}
              transition={{
                type: "spring",
                mass: 0.1,
                delay: index * 0.03,
              }}
            >
              <Tag
                className={twMerge(
                  "text-primary text-base whitespace-pre-wrap text-center tracking-wide",
                  VARIANTS[variant]
                )}
              >
                {letter}
              </Tag>
            </motion.span>
          )}
        </AnimatePresence>
      ))}
    </div>
  );
};

const VerticalMoveText: React.FC<AnimatedTextProps> = ({
  content,
  variant,
  Tag = "span",
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [200, 0]);

  return (
    <div
      ref={ref}
      className={twMerge(
        "flex items-center justify-center overflow-hidden py-4",
        className
      )}
    >
      <motion.span style={{ y }}>
        <Tag
          className={twMerge(
            "text-primary text-base whitespace-pre-wrap text-center tracking-wide leading-tight",
            VARIANTS[variant]
          )}
        >
          {content}
        </Tag>
      </motion.span>
    </div>
  );
};

export default AnimatedText;
