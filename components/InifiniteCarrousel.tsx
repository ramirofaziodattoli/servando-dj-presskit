"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { twMerge } from "tailwind-merge";

interface InifiniteCarrouselProps {
  Map?: any[];
  publicLogos?: boolean;
}

export default function InifiniteCarrousel({
  Map,
  publicLogos,
}: InifiniteCarrouselProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeInnerRef = useRef<HTMLDivElement>(null);
  const [validLogos, setValidLogos] = useState<string[]>([]);

  // 1. Carga las imágenes que existen en public
  useEffect(() => {
    if (!publicLogos) return;

    const loadImages = async () => {
      const checks = await Promise.all(
        Array.from({ length: 13 }).map((_, index) => {
          const imgSrc = `/logos/public/public-${index}.svg`;
          return new Promise<string | null>((resolve) => {
            const img = new Image();
            img.src = imgSrc;
            img.onload = () => resolve(imgSrc);
            img.onerror = () => resolve(null);
          });
        })
      );

      const filtered = checks.filter((src): src is string => src !== null);
      setValidLogos(filtered);
    };

    loadImages();
  }, [publicLogos]);

  // 2. Ejecuta la animación cuando los logos ya están en el DOM
  useEffect(() => {
    const container = marqueeRef.current;
    const marqueeContent = marqueeInnerRef.current;
    if (!container || !marqueeContent) return;

    const timeout = setTimeout(() => {
      const contentWidth = marqueeContent.offsetWidth;
      const containerWidth = container.offsetWidth;

      if (contentWidth === 0) return;

      const copiesNeeded = Math.ceil((containerWidth / contentWidth) * 3);

      while (container.childNodes.length > 1) {
        container.removeChild(container.lastChild!);
      }

      for (let i = 0; i < copiesNeeded; i++) {
        const clone = marqueeContent.cloneNode(true) as HTMLElement;
        container.appendChild(clone);
      }

      // GSAP animation
      const tl = gsap.timeline({ repeat: -1 });

      gsap.set(container, { x: 0 });

      tl.to(container, {
        x: `-${contentWidth}`,
        duration: publicLogos ? 30 : 15,
        ease: "none",
        repeat: -1,
        onRepeat: () => {
          gsap.set(container, { x: 0 });
        },
      });

      document.addEventListener("visibilitychange", () => {
        document.hidden ? tl.pause() : tl.play();
      });

      return () => {
        tl.kill();
      };
    }, 100); // pequeña espera para asegurar que DOM se haya actualizado

    return () => clearTimeout(timeout);
  }, [validLogos, Map, publicLogos]);

  const renderElements = () => {
    if (!publicLogos) {
      return Map?.map((text, index) => (
        <span
          key={index}
          className="text-secondary text-xl font-bold uppercase inline-flex items-center h-full whitespace-nowrap"
        >
          <span className="px-4">{text}</span>
          <span className="opacity-50">•</span>
        </span>
      ));
    } else {
      return validLogos.map((src, index) => (
        <span key={index} className="inline-flex items-center h-full py-2">
          <img
            src={src}
            alt={`Logo ${index}`}
            className="min-w-[200px] h-full mx-2 md:mx-5"
          />
        </span>
      ));
    }
  };

  return (
    <div className="w-full overflow-hidden bg-accent h-[100px] flex items-center z-[50] relative">
      <div
        className={twMerge(
          "absolute top-0 left-0 h-full w-[50px] z-[50] from-accent to-secondary/0 bg-gradient-to-r"
        )}
      />
      <div
        ref={marqueeRef}
        className="flex will-change-transform h-full items-center"
      >
        <div ref={marqueeInnerRef} className="flex h-full">
          {renderElements()}
        </div>
      </div>
      <div
        className={twMerge(
          "absolute top-0 right-0 h-full w-[50px] z-[50] from-accent to-secondary/0 bg-gradient-to-l"
        )}
      />
    </div>
  );
}
