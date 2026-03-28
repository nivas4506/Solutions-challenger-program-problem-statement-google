import { useEffect, useRef, useState } from 'react';

/**
 * Hook that triggers when an element scrolls into view.
 * Returns [ref, isVisible]
 */
export function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el); // only animate once
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible];
}

/**
 * Hook for animated counter (counts up from 0 to target).
 */
export function useCounter(target, duration = 2000, startOnVisible = false, isVisible = true) {
  const [count, setCount] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!isVisible || hasRun.current) return;
    hasRun.current = true;

    const numTarget = typeof target === 'string' ? parseInt(target.replace(/[^0-9]/g, '')) : target;
    if (isNaN(numTarget)) return;

    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out curve
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * numTarget));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isVisible, target, duration]);

  return count;
}

/**
 * Scroll reveal wrapper component with configurable delay.
 */
export function ScrollReveal({ children, delay = 0, direction = 'up', style = {} }) {
  const [ref, isVisible] = useScrollReveal(0.1);

  const transforms = {
    up: 'translateY(40px)',
    down: 'translateY(-40px)',
    left: 'translateX(-40px)',
    right: 'translateX(40px)',
    none: 'none'
  };

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate(0)' : transforms[direction],
        transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        ...style
      }}
    >
      {children}
    </div>
  );
}
