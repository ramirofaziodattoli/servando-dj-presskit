"use client";
import React, { useEffect, useRef, useState } from "react";

interface CounterProps {
  endValue: number;
  duration: number; // en ms
  showMore?: boolean;
}

const easeInOutQuad = (t: number) =>
  t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

const Counter: React.FC<CounterProps> = ({
  endValue,
  duration,
  showMore = false,
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = Math.floor(easeInOutQuad(progress) * endValue);

      setCount(eased);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationRef.current!);
  }, [endValue, duration, isVisible]);

  return (
    <div ref={ref}>
      <span className="text-6xl font-bold text-accent">
        {showMore && "+"}
        {count}
      </span>
    </div>
  );
};

export default Counter;
