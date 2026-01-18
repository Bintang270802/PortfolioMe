import { useState } from 'react';
import { FiUser } from 'react-icons/fi';
import { getInitials, getAvatarColor } from '../utils/avatarUtils';

export default function UserAvatar({ 
  src, 
  alt = 'User Avatar', 
  size = 'md', 
  fallbackName = '',
  className = '' 
}) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-8 h-8 text-xs';
      case 'md':
        return 'w-10 h-10 text-sm';
      case 'lg':
        return 'w-12 h-12 text-base';
      case 'xl':
        return 'w-16 h-16 text-lg';
      default:
        return 'w-10 h-10 text-sm';
    }
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  const sizeClasses = getSizeClasses();

  // Generate a consistent color based on the name
  const getAvatarColor = (name) => {
    if (!name) return 'bg-gray-500';
    
    const colors = [
      'bg-red-500',
      'bg-blue-500',
      'bg-green-500',
      'bg-yellow-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-teal-500'
    ];
    
    const hash = name.split('').reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    
    return colors[Math.abs(hash) % colors.length];
  };

  if (!src || imageError) {
    // Fallback to initials or icon
    return (
      <div 
        className={`${sizeClasses} ${getAvatarColor(fallbackName)} rounded-full flex items-center justify-center text-white font-semibold ${className}`}
        title={alt}
      >
        {fallbackName ? getInitials(fallbackName) : <FiUser className="w-1/2 h-1/2" />}
      </div>
    );
  }

  return (
    <div className={`${sizeClasses} relative ${className}`}>
      {imageLoading && (
        <div className={`${sizeClasses} ${getAvatarColor(fallbackName)} rounded-full flex items-center justify-center text-white font-semibold absolute inset-0 animate-pulse`}>
          {fallbackName ? getInitials(fallbackName) : <FiUser className="w-1/2 h-1/2" />}
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`${sizeClasses} rounded-full object-cover border-2 border-white/20 ${imageLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onLoad={handleImageLoad}
        onError={handleImageError}
        referrerPolicy="no-referrer"
      />
    </div>
  );
}