"use client";
import ReactLenis, { useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const ScrollSmoother: React.FC<{ children: any }> = ({ children }) => {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true });
  }, [pathname, lenis]);

  return (
    <ReactLenis root options={{ lerp: 0.018 }}>
      <p className="hidden">⪩༏⪨</p>
      {children}
    </ReactLenis>
  );
};

export default ScrollSmoother;
