import { useEffect, useRef } from 'react';
import analytics, { 
  trackPageView, 
  trackScrollDepth, 
  trackTimeOnPage,
  trackPerformance 
} from '../utils/analytics';

export const useAnalytics = () => {
  return analytics;
};

export const usePageTracking = () => {
  const startTime = useRef(Date.now());

  useEffect(() => {
    // Track page view
    trackPageView(document.title, window.location.href);
    startTime.current = Date.now();

    // Track page load performance
    if (window.performance && window.performance.timing) {
      const timing = window.performance.timing;
      const loadTime = timing.loadEventEnd - timing.navigationStart;
      if (loadTime > 0) {
        trackPerformance('page_load_time', loadTime, 'ms');
      }
    }

    // Cleanup function to track time on page
    return () => {
      const timeSpent = Math.round((Date.now() - startTime.current) / 1000);
      if (timeSpent > 5) { // Only track if user spent more than 5 seconds
        trackTimeOnPage(timeSpent);
      }
    };
  }, []); // Remove location dependency since we're not using React Router
};

export const useScrollTracking = () => {
  const trackedDepths = useRef(new Set());

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = Math.round((scrollTop / documentHeight) * 100);

      // Track scroll depth milestones
      const milestones = [25, 50, 75, 100];
      milestones.forEach(milestone => {
        if (scrollPercentage >= milestone && !trackedDepths.current.has(milestone)) {
          trackedDepths.current.add(milestone);
          trackScrollDepth(milestone);
        }
      });
    };

    const throttledScroll = throttle(handleScroll, 1000);
    window.addEventListener('scroll', throttledScroll);

    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, []);
};

export const useErrorTracking = () => {
  useEffect(() => {
    const handleError = (event) => {
      analytics.trackError(
        'javascript_error',
        event.error?.message || event.message,
        event.filename
      );
    };

    const handleUnhandledRejection = (event) => {
      analytics.trackError(
        'unhandled_promise_rejection',
        event.reason?.message || String(event.reason)
      );
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);
};

// Utility function to throttle scroll events
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}