"use client";

import React from "react";

export default function useIsOnScreen<T extends Element = HTMLElement>(
  options?: IntersectionObserverInit
) {
  const elementRef = React.useRef<T | null>(null);
  const [isOnScreen, setIsOnScreen] = React.useState(false);
  React.useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      setIsOnScreen(entry.isIntersecting);
    }, options);

    observer.observe(element);

    return () => observer.unobserve(element);
  });

  return [elementRef, isOnScreen] as const;
}
