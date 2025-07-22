"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { twMerge } from "tailwind-merge";

// Registramos el plugin ScrollTrigger de GSAP
// Este plugin es esencial para crear animaciones basadas en scroll
gsap.registerPlugin(ScrollTrigger);

interface HorizontalScrollProps {
  children: React.ReactNode;
  direction?: "left" | "right";
  className?: string;
  containerClassName?: string;
}

export default function HorizontalScroll({
  children,
  direction = "left",
  className,
  containerClassName,
}: HorizontalScrollProps) {
  // Refs para acceder a los elementos del DOM
  const containerRef = useRef<HTMLDivElement>(null); // Contenedor principal que se mantiene fijo
  const contentRef = useRef<HTMLDivElement>(null); // Contenedor del contenido que se moverá horizontalmente

  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return;

    const container = containerRef.current;
    const content = contentRef.current;
    let ctx = gsap.context && gsap.context(() => {}, content);
    let animation: gsap.core.Tween | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let bodyObserver: ResizeObserver | null = null;

    // Función para calcular y setear el ancho y la animación
    const setupAnimation = () => {
      const sections = content.children;
      let totalWidth = 0;
      Array.from(sections).forEach((section) => {
        totalWidth += (section as HTMLElement).clientWidth + 80;
      });
      content.style.width = `${totalWidth}px`;
      if (direction === "right") {
        content.style.transform = `translateX(${-(
          totalWidth - window.innerWidth
        )}px)`;
      } else {
        content.style.transform = "";
      }
      if (animation) animation.kill();
      animation = gsap.to(content, {
        x: () => (direction === "left" ? -(totalWidth - window.innerWidth) : 0),
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${totalWidth - window.innerWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
      ScrollTrigger.refresh();
    };

    // Inicializar animación
    setupAnimation();

    // Observer para cambios de tamaño del contenido del carrousel
    if (window.ResizeObserver) {
      resizeObserver = new ResizeObserver(() => {
        setupAnimation();
      });
      resizeObserver.observe(content);
    }

    // Observer para cambios de tamaño en el body (toda la página)
    if (window.ResizeObserver) {
      bodyObserver = new ResizeObserver(() => {
        ScrollTrigger.refresh();
      });
      bodyObserver.observe(document.body);
    }

    // Listener para resize de la ventana
    const handleResize = () => {
      setupAnimation();
    };
    window.addEventListener("resize", handleResize);

    // Limpieza
    return () => {
      if (animation) animation.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      window.removeEventListener("resize", handleResize);
      if (resizeObserver) resizeObserver.disconnect();
      if (bodyObserver) bodyObserver.disconnect();
      if (ctx && ctx.revert) ctx.revert();
    };
  }, [direction, children]);

  return (
    // Contenedor principal con overflow hidden para evitar scroll horizontal nativo
    <div
      ref={containerRef}
      className={twMerge(
        "w-full h-full min-h-screen overflow-hidden bg-transparent",
        containerClassName
      )}
    >
      {/* Contenedor del contenido que se moverá horizontalmente */}
      <div
        ref={contentRef}
        className={twMerge(
          "flex h-full [&>*]:flex-shrink-0 items-center justify-center",
          direction === "right" && "flex-row-reverse",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}
