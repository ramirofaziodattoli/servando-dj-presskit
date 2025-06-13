"use client";
import React, { useState } from "react";
import Image, { ImageProps } from "next/image";
import { twMerge } from "tailwind-merge";
import {
  backgrounds,
  BackgroundsKey,
  images,
  ImagesKey,
  logos,
  LogosKeys,
} from "@/assets";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

export type imageSource = BackgroundsKey | LogosKeys | ImagesKey;

export interface LandingImageProps extends ImageProps {
  src: imageSource;
  className?: string;
  force?: boolean;
  noPreload?: boolean;
  sizes?: string;
}

const LandingImage: React.FC<LandingImageProps> = ({
  src,
  alt,
  className,
  force = false,
  priority,
  width,
  height,
  noPreload = false,
  sizes,
  ...props
}) => {
  let source: string;

  if (force) {
    source = src as string;
  } else {
    source =
      logos[src as LogosKeys] ||
      backgrounds[src as BackgroundsKey] ||
      images[src as ImagesKey];
  }

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div ref={ref} className="relative w-full h-full overflow-hidden">
      <Image
        {...props}
        loading={priority ? "eager" : "lazy"}
        priority={priority}
        fetchPriority={priority ? "high" : "auto"}
        src={source}
        alt={alt}
        width={width}
        height={height}
        quality={60}
        onLoad={() => setIsLoaded(true)}
        className={twMerge(
          "transition-opacity duration-500",
          isLoaded ? "opacity-100" : "opacity-0",
          className
        )}
      />

      {/* Overlay de color que se desliza hacia arriba */}
      {!noPreload && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: inView && isLoaded ? 0 : 1 }}
          transition={{ duration: 1 }}
          className="absolute top-0 left-0 w-full h-full z-[99] bg-secondary-lighter/50 backdrop-blur-xl pointer-events-none"
        />
      )}
    </div>
  );
};

export default LandingImage;
