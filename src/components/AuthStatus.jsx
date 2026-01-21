

export default function AuthStatus({ 
  type = 'loading', // 'loading', 'success', 'error', 'warning', 'info'
  title = '',
  message = '',
  details = [],
  onAction = null,
  actionText = '',
  onClose = null,
  autoClose = false,
  duration = 5000
}) {
  
  const getStatusConfig = () => {
    switch (type) {
      case 'loading':
        return {
          bgColor: 'from-blue-500/10 to-indigo-500/10',
          borderColor: 'border-blue-500/30',
          titleColor: 'text-blue-300',
          messageColor: 'text-gray-300'
        };
      case 'success':
        return {
          bgColor: 'from-green-500/10 to-emerald-500/10',
          borderColor: 'border-green-500/30',
          titleColor: 'text-green-300',
          messageColor: 'text-gray-300'
        };
      case 'error':
        return {
          bgColor: 'from-red-500/10 to-pink-500/10',
          borderColor: 'border-red-500/30',
          titleColor: 'text-red-300',
          messageColor: 'text-gray-300'
        };
      case 'warning':
        return {
          bgColor: 'from-yellow-500/10 to-orange-500/10',
          borderColor: 'border-yellow-500/30',
          titleColor: 'text-yellow-300',
          messageColor: 'text-gray-300'
        };
      case 'info':
        return {
          bgColor: 'from-blue-500/10 to-cyan-500/10',
          borderColor: 'border-blue-500/30',
          titleColor: 'text-blue-300',
          messageColor: 'text-gray-300'
        };
      default:
        return {
          bgColor: 'from-gray-500/10 to-slate-500/10',
          borderColor: 'border-gray-500/30',
          titleColor: 'text-gray-300',
          messageColor: 'text-gray-400'
        };
    }
  };

  const config = getStatusConfig();

  // Auto close functionality
  if (autoClose && type !== 'loading') {
    setTimeout(() => {
      if (onClose) onClose();
    }, duration);
  }

  return (
    <div className={`bg-gradient-to-r ${config.bgColor} backdrop-blur-md border ${config.borderColor} rounded-xl p-4 shadow-lg`}>
      <div className="flex items-start gap-3">
        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Title */}
          {title && (
            <h4 className={`font-semibold ${config.titleColor} mb-1`}>
              {title}
            </h4>
          )}

          {/* Message */}
          {message && (
            <p className={`text-sm ${config.messageColor} leading-relaxed`}>
              {message}
            </p>
          )}

          {/* Details list */}
          {details && details.length > 0 && (
            <ul className="mt-2 space-y-1">
              {details.map((detail, index) => (
                <li key={index} className="text-xs text-gray-400 flex items-start gap-2">
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Action button */}
          {onAction && actionText && (
            <button
              onClick={onAction}
              className="mt-3 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors duration-200 underline underline-offset-2"
            >
              {actionText}
            </button>
          )}
        </div>

        {/* Close button */}
        {onClose && type !== 'loading' && (
          <button
            onClick={onClose}
            className="flex-shrink-0 text-gray-400 hover:text-white transition-colors duration-200 p-1 rounded-md hover:bg-white/10"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}