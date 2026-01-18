import { useState, useEffect } from 'react';

const RotatingText = ({ texts, interval = 3000, className = "" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!texts || texts.length === 0) return;

    const timer = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
        setIsVisible(true);
      }, 400); // Transition duration
    }, interval);

    return () => clearInterval(timer);
  }, [texts, interval]);

  if (!texts || texts.length === 0) return null;

  return (
    <span 
      className={`inline-block transition-all duration-700 ease-in-out transform ${
        isVisible 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 -translate-y-3 scale-95'
      } ${className}`}
      style={{
        minHeight: '1.2em', // Prevent layout shift
        display: 'inline-flex',
        alignItems: 'center'
      }}
    >
      {texts[currentIndex]}
    </span>
  );
};

export default RotatingText;