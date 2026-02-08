import { useState, useEffect } from 'react';

/**
 * Breakpoints matching Tailwind CSS defaults
 */
const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
};

/**
 * Custom hook to detect current breakpoint
 * @returns {Object} - Current breakpoint states
 */
export const useResponsive = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // Debounce resize event for better performance
    let timeoutId;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 150);
    };

    window.addEventListener('resize', debouncedResize);
    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return {
    width: windowSize.width,
    height: windowSize.height,
    isMobile: windowSize.width < breakpoints.sm,
    isTablet: windowSize.width >= breakpoints.sm && windowSize.width < breakpoints.lg,
    isDesktop: windowSize.width >= breakpoints.lg,
    isSmall: windowSize.width < breakpoints.md,
    isMedium: windowSize.width >= breakpoints.md && windowSize.width < breakpoints.xl,
    isLarge: windowSize.width >= breakpoints.xl,
    breakpoint: windowSize.width >= breakpoints['2xl'] ? '2xl' :
                windowSize.width >= breakpoints.xl ? 'xl' :
                windowSize.width >= breakpoints.lg ? 'lg' :
                windowSize.width >= breakpoints.md ? 'md' :
                windowSize.width >= breakpoints.sm ? 'sm' : 'xs'
  };
};

/**
 * Hook to detect if device is touch-enabled
 * @returns {boolean} - True if touch device
 */
export const useIsTouchDevice = () => {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );
  }, []);

  return isTouch;
};

/**
 * Hook to detect device orientation
 * @returns {string} - 'portrait' or 'landscape'
 */
export const useOrientation = () => {
  const [orientation, setOrientation] = useState(
    typeof window !== 'undefined' && window.innerHeight > window.innerWidth
      ? 'portrait'
      : 'landscape'
  );

  useEffect(() => {
    const handleOrientationChange = () => {
      setOrientation(
        window.innerHeight > window.innerWidth ? 'portrait' : 'landscape'
      );
    };

    window.addEventListener('resize', handleOrientationChange);
    return () => window.removeEventListener('resize', handleOrientationChange);
  }, []);

  return orientation;
};
