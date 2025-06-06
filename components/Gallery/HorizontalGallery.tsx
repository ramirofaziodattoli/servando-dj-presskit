"use client";
import { useRef, useEffect, useState } from "react";
import {
  useMotionValue,
  useTransform,
  motion,
  useAnimationFrame,
} from "framer-motion";
import { twMerge } from "tailwind-merge";
import LandingImage from "../Images/LandingImage";
import { ImagesKey } from "@/assets";
import { Fadeback } from "../Fadeback";
import HorizontalScroll from "../HorizontalScroll";
import { UseIsMobile } from "@/hooks/UseIsMobile";

const HorizontalGallery = () => {
  const [isMobile, hasMounted] = UseIsMobile();

  if (!hasMounted) return null; // ⛔️ No renderizamos nada hasta que esté montado

  // Las primeras 8 imágenes van al banner principal (no se muestran acá)
  // Las siguientes 5 son para scroll horizontal (desktop)
  // Las siguientes 7 son para mobile (y desktop también, pero en otro bloque)
  const bannerCount = 8;
  const scrollCount = 5;
  const totalImages = 20;

  const scrollImages = Array.from(
    { length: scrollCount },
    (_, i) => bannerCount + i
  ); // [8, 9, 10, 11, 12]

  const mobileImages = Array.from(
    {
      length: isMobile
        ? totalImages - bannerCount
        : totalImages - bannerCount - scrollCount,
    },
    (_, i) => bannerCount + (!isMobile ? scrollCount : 0) + i
  ); // [13..19] en desktop, [8..19] en mobile

  return (
    <section className="relative h-full">
      {/* Solo en desktop */}
      {!isMobile && (
        <>
          <Fadeback direction="right" />
          <HorizontalScroll containerClassName="hidden md:block">
            {scrollImages.map((imageIndex, index) => (
              <ImageCard key={index} index={index} imageIndex={imageIndex} />
            ))}
          </HorizontalScroll>
          <Fadeback direction="left" />
        </>
      )}

      {/* Mobile + Desktop restante */}
      <div className="w-full grid grid-cols-2 grid-flow-dense xl:grid-cols-4">
        {mobileImages.map((imageIndex, index) => (
          <MobileImageCard
            key={index}
            index={index}
            imageIndex={imageIndex}
            isMobile={isMobile}
          />
        ))}
      </div>
    </section>
  );
};

interface ImageCardProps {
  index: number;
  imageIndex: number;
  isMobile?: boolean;
}

const ImageCard: React.FC<ImageCardProps> = ({ imageIndex }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [windowWidth, setWindowWidth] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
    }
  }, []);

  const translateX = useTransform(
    x,
    windowWidth ? [-windowWidth, 0, windowWidth] : [-1000, 0, 1000],
    [100, 0, -100]
  );

  useAnimationFrame(() => {
    if (!ref.current || !windowWidth) return;

    const bounds = ref.current.getBoundingClientRect();
    const centerX = bounds.left + bounds.width / 2;
    const screenCenterX = windowWidth / 2;
    const delta = centerX - screenCenterX;

    x.set(delta);
  });

  return (
    <div
      ref={ref}
      className={twMerge(
        "w-[50vw] h-[60%] snap-start relative overflow-hidden grid place-items-center",
        imageIndex === 8 && "ml-10 !w-[30vw]",
        imageIndex % 2 && "-translate-y-14",
        imageIndex % 2 === 0 && "translate-y-20 w-[70vw]"
      )}
    >
      <motion.div style={{ translateX }} className="w-[160%] h-full">
        <LandingImage
          force
          fill
          sizes="1200px"
          src={`/images/gallery/image-${imageIndex + 1}.webp` as ImagesKey}
          alt={`image-${imageIndex}`}
          className="object-cover object-center"
        />
      </motion.div>
    </div>
  );
};

const MobileImageCard: React.FC<ImageCardProps> = ({
  index,
  imageIndex,
  isMobile,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const y = useMotionValue(0);
  const [windowHeight, setWindowHeight] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowHeight(window.innerHeight);
    }
  }, []);

  const translateY = useTransform(
    y,
    windowHeight ? [-windowHeight, 0, windowHeight] : [-1000, 0, 1000],
    [50, 0, -50]
  );

  useAnimationFrame(() => {
    if (!ref.current || !windowHeight) return;

    const bounds = ref.current.getBoundingClientRect();
    const centerY = bounds.top + bounds.height / 2;
    const screenCenterY = windowHeight / 2;
    const delta = centerY - screenCenterY;

    y.set(delta);
  });

  const getIndex = (indexToCompare: number) => {
    return index === indexToCompare;
  };

  return (
    <div
      ref={ref}
      className={twMerge(
        "w-full h-[350px] lg:h-[700px] relative overflow-hidden col-span-1",
        getIndex(0) && "md:col-span-2",
        getIndex(1) && "col-span-2",
        getIndex(3) && "md:col-span-2",
        getIndex(4) && "col-span-2",
        getIndex(5) && "md:col-span-2"
      )}
    >
      <motion.div style={{ translateY }} className="w-full h-full">
        <LandingImage
          force
          fill
          sizes={isMobile ? "500px" : "2000px"}
          src={`/images/gallery/image-${imageIndex + 1}.webp` as ImagesKey}
          alt={`image-${imageIndex}`}
          className="object-cover object-center"
        />
      </motion.div>
    </div>
  );
};

export default HorizontalGallery;
