import { FiMessageCircle, FiShield, FiZap } from 'react-icons/fi';

export default function AppLogo({ 
  size = 'md', // 'sm', 'md', 'lg', 'xl'
  variant = 'default', // 'default', 'minimal', 'icon-only'
  className = '',
  animated = false 
}) {
  
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return {
          container: 'w-8 h-8',
          icon: 'w-4 h-4',
          text: 'text-sm',
          subtext: 'text-xs'
        };
      case 'md':
        return {
          container: 'w-12 h-12',
          icon: 'w-6 h-6',
          text: 'text-base',
          subtext: 'text-sm'
        };
      case 'lg':
        return {
          container: 'w-16 h-16',
          icon: 'w-8 h-8',
          text: 'text-lg',
          subtext: 'text-base'
        };
      case 'xl':
        return {
          container: 'w-24 h-24',
          icon: 'w-12 h-12',
          text: 'text-2xl',
          subtext: 'text-lg'
        };
      default:
        return {
          container: 'w-12 h-12',
          icon: 'w-6 h-6',
          text: 'text-base',
          subtext: 'text-sm'
        };
    }
  };

  const sizes = getSizeClasses();

  if (variant === 'icon-only') {
    return (
      <div className={`${sizes.container} ${className}`}>
        <div className={`relative ${sizes.container} bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg ${animated ? 'animate-pulse' : ''}`}>
          <FiMessageCircle className={`${sizes.icon} text-white`} />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
        </div>
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <div>
          <h3 className={`font-bold text-white ${sizes.text}`}>ChatRoom</h3>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="relative">
        <div className={`${sizes.container} bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl ${animated ? 'animate-pulse' : ''}`}>
          <FiMessageCircle className={`${sizes.icon} text-white`} />
        </div>
        {/* Status indicators */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white flex items-center justify-center">
          <FiZap className="w-2 h-2 text-white" />
        </div>
        <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-blue-400 rounded-full border-2 border-white flex items-center justify-center">
          <FiShield className="w-2 h-2 text-white" />
        </div>
      </div>
      
      <div>
        <h2 className={`font-bold text-white ${sizes.text}`}>
          Chat<span className="text-blue-400">Room</span>
        </h2>
        <p className={`text-gray-400 ${sizes.subtext}`}>
          Real-time Messaging
        </p>
      </div>
    </div>
  );
}