import { useState, useEffect } from 'react';

const Toast = ({ 
  id,
  type = 'info', 
  title, 
  message, 
  duration = 5000, 
  onClose,
  action = null
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Animate in
    setTimeout(() => setIsVisible(true), 10);

    // Auto close
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose(id);
    }, 300);
  };

  const getLabel = () => {
    switch (type) {
      case 'success':
        return 'Success';
      case 'error':
        return 'Error';
      case 'warning':
        return 'Warning';
      case 'download':
        return 'Download';
      default:
        return 'Info';
    }
  };

  const getStyles = () => {
    const baseStyles = "border-l-4 bg-zinc-800/95 backdrop-blur-md border-zinc-700";
    
    switch (type) {
      case 'success':
        return `${baseStyles} border-l-green-500 text-green-100`;
      case 'error':
        return `${baseStyles} border-l-red-500 text-red-100`;
      case 'warning':
        return `${baseStyles} border-l-yellow-500 text-yellow-100`;
      case 'download':
        return `${baseStyles} border-l-blue-500 text-blue-100`;
      default:
        return `${baseStyles} border-l-blue-500 text-blue-100`;
    }
  };

  const getIconColor = () => {
    switch (type) {
      case 'success':
        return 'text-green-400';
      case 'error':
        return 'text-red-400';
      case 'warning':
        return 'text-yellow-400';
      case 'download':
        return 'text-blue-400';
      default:
        return 'text-blue-400';
    }
  };

  return (
    <div
      className={`
        fixed top-4 right-4 z-50 max-w-sm w-full mx-4 sm:mx-0
        transform transition-all duration-300 ease-out
        ${isVisible && !isExiting 
          ? 'translate-x-0 opacity-100 scale-100' 
          : 'translate-x-full opacity-0 scale-95'
        }
      `}
      style={{ 
        transform: isVisible && !isExiting 
          ? 'translateX(0) scale(1)' 
          : 'translateX(100%) scale(0.95)' 
      }}
    >
      <div className={`
        ${getStyles()}
        rounded-lg shadow-2xl p-4 relative overflow-hidden
        hover:shadow-3xl transition-shadow duration-200
      `}>
        {/* Progress bar for auto-close */}
        {duration > 0 && (
          <div 
            className="absolute bottom-0 left-0 h-1 bg-white/20 animate-shrink"
            style={{ 
              animation: `shrink ${duration}ms linear forwards`,
              animationDelay: '100ms'
            }}
          />
        )}

        <div className="flex items-start gap-3">
          {/* Label */}
          <div className={`flex-shrink-0 ${getIconColor()} font-bold text-xs uppercase`}>
            {getLabel()}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {title && (
              <h4 className="font-semibold text-sm mb-1 text-white">
                {title}
              </h4>
            )}
            {message && (
              <p className="text-sm text-zinc-300 leading-relaxed">
                {message}
              </p>
            )}
            
            {/* Action button */}
            {action && (
              <button
                onClick={action.onClick}
                className="mt-2 text-xs font-medium text-white bg-white/10 hover:bg-white/20 px-3 py-1 rounded-md transition-colors duration-200"
              >
                {action.label}
              </button>
            )}
          </div>

          {/* Close button */}
          <button
            onClick={handleClose}
            className="flex-shrink-0 text-zinc-400 hover:text-white transition-colors duration-200 px-2 py-1 hover:bg-white/10 rounded text-xs font-bold"
            aria-label="Close notification"
          >
            ×
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
        .animate-shrink {
          animation: shrink ${duration}ms linear forwards;
        }
      `}</style>
    </div>
  );
};

export default Toast;