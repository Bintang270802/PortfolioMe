/**
 * Utility functions for handling user avatars
 */

/**
 * Get avatar URL with fallback handling
 * @param {Object} user - User object from Supabase
 * @returns {string|null} - Avatar URL or null
 */
export const getAvatarUrl = (user) => {
  if (!user) return null;
  
  // Try different possible avatar URL locations
  const possibleUrls = [
    user.user_metadata?.avatar_url,
    user.user_metadata?.picture, // Google OAuth sometimes uses 'picture'
    user.user_metadata?.photo_url,
    user.avatar_url,
    user.picture
  ];
  
  // Return the first valid URL
  for (const url of possibleUrls) {
    if (url && typeof url === 'string' && url.trim() !== '') {
      return url;
    }
  }
  
  return null;
};

/**
 * Get display name with fallback
 * @param {Object} user - User object from Supabase
 * @returns {string} - Display name
 */
export const getDisplayName = (user) => {
  if (!user) return 'Anonymous';
  
  const possibleNames = [
    user.user_metadata?.full_name,
    user.user_metadata?.name,
    user.user_metadata?.display_name,
    user.email?.split('@')[0],
    'User'
  ];
  
  // Return the first valid name
  for (const name of possibleNames) {
    if (name && typeof name === 'string' && name.trim() !== '') {
      return name.trim();
    }
  }
  
  return 'Anonymous';
};

/**
 * Create message data with proper avatar handling
 * @param {Object} user - User object from Supabase
 * @param {string} text - Message text
 * @returns {Object} - Message data object
 */
export const createMessageData = (user, text) => {
  return {
    text: text.trim(),
    user_id: user.id,
    display_name: getDisplayName(user),
    photo_url: getAvatarUrl(user)
  };
};

/**
 * Check if URL is a valid image URL
 * @param {string} url - URL to check
 * @returns {Promise<boolean>} - Whether URL is valid
 */
export const isValidImageUrl = async (url) => {
  if (!url) return false;
  
  try {
    const response = await fetch(url, { method: 'HEAD' });
    const contentType = response.headers.get('content-type');
    return response.ok && contentType && contentType.startsWith('image/');
  } catch (error) {
    console.warn('Error checking image URL:', error);
    return false;
  }
};

/**
 * Generate initials from name
 * @param {string} name - Full name
 * @returns {string} - Initials (max 2 characters)
 */
export const getInitials = (name) => {
  if (!name || typeof name !== 'string') return 'U';
  
  return name
    .trim()
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

/**
 * Generate consistent color for avatar background
 * @param {string} name - Name to generate color from
 * @returns {string} - Tailwind CSS color class
 */
export const getAvatarColor = (name) => {
  if (!name) return 'bg-gray-500';
  
  const colors = [
    'bg-red-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-500',
    'bg-orange-500',
    'bg-cyan-500'
  ];
  
  // Create hash from name
  const hash = name.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  
  return colors[Math.abs(hash) % colors.length];
};