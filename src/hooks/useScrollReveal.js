import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for scroll reveal animations
 * @param {Object} options - Intersection Observer options
 * @returns {Object} - ref and isVisible state
 */
export const useScrollReveal = (options = {}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Optionally unobserve after first reveal
          if (options.once !== false) {
            observer.unobserve(entry.target);
          }
        } else if (options.once === false) {
          setIsVisible(false);
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px',
        ...options
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options]);

  return { ref, isVisible };
};

/**
 * Hook for multiple scroll reveal elements
 * @param {number} count - Number of elements
 * @param {Object} options - Intersection Observer options
 * @returns {Array} - Array of refs and visibility states
 */
export const useScrollRevealMultiple = (count, options = {}) => {
  const refs = useRef([]);
  const [visibleStates, setVisibleStates] = useState(Array(count).fill(false));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = refs.current.indexOf(entry.target);
          if (index !== -1 && entry.isIntersecting) {
            setVisibleStates((prev) => {
              const newStates = [...prev];
              newStates[index] = true;
              return newStates;
            });
            
            if (options.once !== false) {
              observer.unobserve(entry.target);
            }
          }
        });
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px',
        ...options
      }
    );

    refs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      refs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [count, options]);

  const setRef = (index) => (element) => {
    refs.current[index] = element;
  };

  return { setRef, visibleStates };
};
