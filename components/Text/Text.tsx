"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { twMerge } from "tailwind-merge";

export interface TextProps {
  children?: React.ReactNode;
  Tag?: React.ElementType;
  className?: string;
  variant: keyof typeof VARIANTS;
  titleAnimation?: boolean;
}

export const VARIANTS = {
  title: "text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold uppercase",
  subtitle: "text-2xl md:text-left md:text-3xl lg:text-4xl xl:text-5xl",
  content: "text-md lg:text-left font-thin leading-6",
  custom: "",
} as const;

const Text: React.FC<TextProps> = ({
  children,
  Tag = "span",
  className,
  variant,
  titleAnimation = true,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  if (variant === "title" && titleAnimation) {
    let letterIndex = 0; // contador acumulado para delays

    return (
      <div className="overflow-hidden" ref={ref}>
        <Tag
          className={twMerge(
            "text-primary text-base whitespace-pre-wrap text-center tracking-wider -z-10",
            VARIANTS[variant],
            className
          )}
        >
          {React.Children.toArray(children).flatMap((child, i) => {
            if (typeof child === "string") {
              // Dividir en palabras
              const words = child.split(" ");
              return words.map((word: string, wIdx: number) => (
                <span
                  key={`word-${i}-${wIdx}`}
                  style={{
                    display: "inline-block",
                    whiteSpace: "pre",
                    fontFamily: "var(--font-primary)",
                  }}
                >
                  {word.split("").map((letter: string, lIdx: number) => {
                    const delay = letterIndex * 0.02;
                    letterIndex++;
                    return (
                      <motion.div
                        key={`letter-${i}-${wIdx}-${lIdx}`}
                        initial={{
                          opacity: 0,
                          y: 50,
                        }}
                        animate={
                          isInView
                            ? {
                                opacity: 1,
                                y: 0,
                              }
                            : {
                                opacity: 0,
                                y: 40,
                              }
                        }
                        transition={{
                          delay,
                          duration: 0.3,
                          ease: [0.39, -0.02, 0.29, 1.14],
                        }}
                        style={{
                          display: "inline-block",
                          transformOrigin: "bottom center",
                        }}
                      >
                        <Tag>{letter === " " ? "\u00A0" : letter}</Tag>
                      </motion.div>
                    );
                  })}
                  {/* Añadir espacio después de cada palabra excepto la última */}
                  {wIdx < words.length - 1 && (
                    <span style={{ display: "inline-block", width: "0.25em" }}>
                      {" "}
                    </span>
                  )}
                </span>
              ));
            }

            // Si es un <br /> u otro ReactNode, se mantiene como está
            return (
              <React.Fragment key={`element-${i}`}>{child}</React.Fragment>
            );
          })}
        </Tag>
      </div>
    );
  }

  return (
    <Tag
      className={twMerge(
        "text-primary text-base whitespace-pre-wrap text-center tracking-wide",
        VARIANTS[variant],
        className
      )}
    >
      {children}
    </Tag>
  );
};

export default Text;
