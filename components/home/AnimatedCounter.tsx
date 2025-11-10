"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  value: string;
  duration?: number;
}

export default function AnimatedCounter({
  value,
  duration = 2000,
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState<string>("0");
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateValue();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateValue = () => {
    // Extract numeric part and suffix from value
    const numericMatch = value.match(/[\d,]+/);
    if (!numericMatch) {
      setDisplayValue(value);
      return;
    }

    const numericPart = numericMatch[0].replace(/,/g, "");
    const targetNumber = parseFloat(numericPart);
    const suffix = value.replace(numericMatch[0], "");
    const prefix = value.substring(0, value.indexOf(numericMatch[0]));

    if (isNaN(targetNumber)) {
      setDisplayValue(value);
      return;
    }

    const startTime = Date.now();
    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(targetNumber * easeOutQuart);

      // Format with commas if original had commas
      const formatted = numericMatch[0].includes(",")
        ? currentValue.toLocaleString()
        : currentValue.toString();

      setDisplayValue(prefix + formatted + suffix);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(value); // Set to final value
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <div ref={elementRef} className="text-4xl md:text-5xl font-bold text-accent">
      {displayValue}
    </div>
  );
}
