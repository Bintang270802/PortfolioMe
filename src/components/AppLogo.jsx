

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
          text: 'text-sm',
          subtext: 'text-xs'
        };
      case 'md':
        return {
          container: 'w-12 h-12',
          text: 'text-base',
          subtext: 'text-sm'
        };
      case 'lg':
        return {
          container: 'w-16 h-16',
          text: 'text-lg',
          subtext: 'text-base'
        };
      case 'xl':
        return {
          container: 'w-24 h-24',
          text: 'text-2xl',
          subtext: 'text-lg'
        };
      default:
        return {
          container: 'w-12 h-12',
          text: 'text-base',
          subtext: 'text-sm'
        };
    }
  };

  const sizes = getSizeClasses();

  if (variant === 'icon-only') {
    return null; // Tidak menampilkan apa-apa untuk icon-only
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