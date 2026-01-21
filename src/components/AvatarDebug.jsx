import { useState } from 'react';
import { FiEye, FiEyeOff, FiUser, FiRefreshCw } from 'react-icons/fi';
import { getAvatarUrl, getDisplayName } from '../utils/avatarUtils';

export default function AvatarDebug({ user }) {
  const [showDebug, setShowDebug] = useState(false);
  const [testingUrl, setTestingUrl] = useState('');
  const [urlTestResult, setUrlTestResult] = useState(null);

  if (!user) return null;

  const testImageUrl = async (url) => {
    if (!url) {
      setUrlTestResult('No URL provided');
      return;
    }

    setUrlTestResult('Testing...');
    
    try {
      const response = await fetch(url, { 
        method: 'HEAD',
        mode: 'no-cors' // Try to avoid CORS issues
      });
      
      // Since we're using no-cors, we can't check the actual response
      // Let's try to load it as an image instead
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = () => {
        setUrlTestResult('URL is accessible');
      };
      
      img.onerror = () => {
        setUrlTestResult('URL failed to load (CORS or invalid)');
      };
      
      img.src = url;
      
    } catch (error) {
      setUrlTestResult(`Error: ${error.message}`);
    }
  };

  const avatarUrl = getAvatarUrl(user);
  const displayName = getDisplayName(user);

  return (
    <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
      <button
        onClick={() => setShowDebug(!showDebug)}
        className="flex items-center gap-2 text-yellow-300 text-sm font-medium mb-2"
      >
        {showDebug ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
        Avatar Debug Info
      </button>
      
      {showDebug && (
        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-1 gap-2">
            <div>
              <span className="text-yellow-200 font-medium">User ID:</span>
              <span className="text-gray-300 ml-2">{user.id}</span>
            </div>
            
            <div>
              <span className="text-yellow-200 font-medium">Email:</span>
              <span className="text-gray-300 ml-2">{user.email}</span>
            </div>
            
            <div>
              <span className="text-yellow-200 font-medium">Display Name:</span>
              <span className="text-gray-300 ml-2">{displayName}</span>
            </div>
            
            <div>
              <span className="text-yellow-200 font-medium">Avatar URL:</span>
              <span className="text-gray-300 ml-2 break-all">
                {avatarUrl || 'No avatar URL found'}
              </span>
            </div>
          </div>

          <div className="border-t border-yellow-500/20 pt-3">
            <div className="text-yellow-200 font-medium mb-2">User Metadata:</div>
            <pre className="text-gray-300 bg-black/20 p-2 rounded text-xs overflow-auto max-h-32">
              {JSON.stringify(user.user_metadata, null, 2)}
            </pre>
          </div>

          <div className="border-t border-yellow-500/20 pt-3">
            <div className="text-yellow-200 font-medium mb-2">Test Avatar URL:</div>
            <div className="flex gap-2 mb-2">
              <input
                type="url"
                value={testingUrl}
                onChange={(e) => setTestingUrl(e.target.value)}
                placeholder="Enter image URL to test..."
                className="flex-1 bg-black/20 border border-yellow-500/30 rounded px-2 py-1 text-gray-300 text-xs"
              />
              <button
                onClick={() => testImageUrl(testingUrl)}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-xs flex items-center gap-1"
              >
                <FiRefreshCw className="w-3 h-3" />
                Test
              </button>
            </div>
            {urlTestResult && (
              <div className="text-gray-300 text-xs">{urlTestResult}</div>
            )}
          </div>

          <div className="border-t border-yellow-500/20 pt-3">
            <div className="text-yellow-200 font-medium mb-2">Possible Avatar URLs:</div>
            <div className="space-y-1">
              {[
                user.user_metadata?.avatar_url,
                user.user_metadata?.picture,
                user.user_metadata?.photo_url,
                user.avatar_url,
                user.picture
              ].map((url, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-gray-400 text-xs w-20">
                    {['avatar_url', 'picture', 'photo_url', 'avatar_url', 'picture'][index]}:
                  </span>
                  <span className="text-gray-300 text-xs break-all">
                    {url || 'null'}
                  </span>
                  {url && (
                    <button
                      onClick={() => testImageUrl(url)}
                      className="text-yellow-400 hover:text-yellow-300 text-xs"
                    >
                      Test
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}