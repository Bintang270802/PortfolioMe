import { useState } from 'react';
import { FiDownload, FiLoader, FiCheck, FiX } from 'react-icons/fi';
import { downloadCertificate } from '../../utils/downloadUtils';
import { useToast } from '../../hooks/useToast';

const CertificateDownload = ({ certificate, className = "", variant = "button" }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const { success, error, download } = useToast();

  const handleDownload = async () => {
    if (isDownloading) return;

    setIsDownloading(true);
    setDownloadProgress(0);

    // Show download started toast
    const downloadToastId = download(
      'Download Started',
      `Downloading ${certificate.nama.id || certificate.nama}...`,
      { duration: 0 } // Don't auto-close
    );

    try {
      const result = await downloadCertificate(
        certificate,
        (progress) => {
          setDownloadProgress(progress);
        },
        (cert, filename) => {
          // Success callback
          success(
            'Download Complete',
            `Certificate "${cert.nama.id || cert.nama}" downloaded successfully as ${filename}`,
            {
              action: {
                label: 'Open Downloads',
                onClick: () => {
                  // Try to open downloads folder (browser dependent)
                  if (window.chrome && window.chrome.downloads) {
                    window.chrome.downloads.showDefaultFolder();
                  }
                }
              }
            }
          );
        },
        (cert, errorMsg) => {
          // Error callback
          error(
            'Download Failed',
            `Failed to download "${cert.nama.id || cert.nama}": ${errorMsg}`,
            {
              action: {
                label: 'Retry',
                onClick: () => handleDownload()
              }
            }
          );
        }
      );

      if (!result.success) {
        throw new Error(result.error);
      }

    } catch (err) {
      error(
        'Download Error',
        `An unexpected error occurred: ${err.message}`
      );
    } finally {
      setIsDownloading(false);
      setDownloadProgress(0);
    }
  };

  if (variant === "icon") {
    return (
      <button
        onClick={handleDownload}
        disabled={isDownloading}
        className={`
          relative p-2 rounded-lg transition-all duration-200
          ${isDownloading 
            ? 'bg-blue-600/20 text-blue-400 cursor-not-allowed' 
            : 'bg-zinc-700/50 text-zinc-400 hover:bg-zinc-600/50 hover:text-white'
          }
          ${className}
        `}
        title={isDownloading ? `Downloading... ${downloadProgress}%` : 'Download Certificate'}
      >
        {isDownloading ? (
          <div className="relative">
            <FiLoader className="w-4 h-4 animate-spin" />
            {downloadProgress > 0 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold">{downloadProgress}%</span>
              </div>
            )}
          </div>
        ) : (
          <FiDownload className="w-4 h-4" />
        )}
      </button>
    );
  }

  return (
    <button
      onClick={handleDownload}
      disabled={isDownloading}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm
        transition-all duration-200 relative overflow-hidden
        ${isDownloading 
          ? 'bg-blue-600/20 text-blue-400 cursor-not-allowed' 
          : 'bg-violet-600/20 text-violet-300 hover:bg-violet-600/30 border border-violet-500/30 hover:border-violet-500/50'
        }
        ${className}
      `}
    >
      {/* Progress bar background */}
      {isDownloading && downloadProgress > 0 && (
        <div 
          className="absolute inset-0 bg-blue-600/10 transition-all duration-300"
          style={{ width: `${downloadProgress}%` }}
        />
      )}
      
      <div className="relative flex items-center gap-2">
        {isDownloading ? (
          <>
            <FiLoader className="w-4 h-4 animate-spin" />
            <span>Downloading... {downloadProgress}%</span>
          </>
        ) : (
          <>
            <FiDownload className="w-4 h-4" />
            <span>Download</span>
          </>
        )}
      </div>
    </button>
  );
};

export default CertificateDownload;