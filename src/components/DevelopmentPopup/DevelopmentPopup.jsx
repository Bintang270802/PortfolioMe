import { useEffect } from 'react';
import { FiX, FiClock, FiTool } from 'react-icons/fi';
import { useLanguage } from '../../hooks/useLanguage';

const DevelopmentPopup = ({ isOpen, onClose, projectName }) => {
  const { t } = useLanguage();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-zinc-900 border border-zinc-700 rounded-2xl p-6 sm:p-8 max-w-md w-full mx-4 shadow-2xl animate-in fade-in zoom-in duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
          aria-label="Close popup"
        >
          <FiX className="w-5 h-5" />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-full flex items-center justify-center border border-orange-500/30">
              <FiTool className="w-8 h-8 text-orange-400" />
            </div>
            {/* Animated dots */}
            <div className="absolute -top-1 -right-1">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="text-center">
          <h3 className="text-xl font-bold text-white mb-2">
            🚧 Sedang Dalam Pengembangan
          </h3>
          
          <p className="text-zinc-300 mb-4 leading-relaxed">
            <span className="font-medium text-orange-400">{projectName}</span> saat ini sedang dalam tahap pengembangan aktif.
          </p>

          <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3">
              <FiClock className="w-5 h-5 text-blue-400 flex-shrink-0" />
              <div className="text-left">
                <p className="text-sm font-medium text-white">Status Pengembangan</p>
                <p className="text-xs text-zinc-400">Dalam proses development</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm text-zinc-400">
              Kami sedang bekerja keras untuk menyelesaikan project ini. 
              Terima kasih atas kesabaran Anda! 🙏
            </p>
            
            <div className="flex items-center justify-center gap-2 text-xs text-zinc-500">
              <span>Progress:</span>
              <div className="flex-1 max-w-32 bg-zinc-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-orange-500 to-yellow-500 h-2 rounded-full w-3/4 animate-pulse" />
              </div>
              <span>75%</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Mengerti
          </button>
          <button
            onClick={() => {
              // Track interest in development updates
              if (window.gtag) {
                window.gtag('event', 'development_interest', {
                  project_name: projectName
                });
              }
              onClose();
            }}
            className="flex-1 bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200"
          >
            Beri Tahu Saya
          </button>
        </div>

        {/* Footer Note */}
        <p className="text-center text-xs text-zinc-500 mt-4">
          Ikuti update terbaru di media sosial kami
        </p>
      </div>
    </div>
  );
};

export default DevelopmentPopup;