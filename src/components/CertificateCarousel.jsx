import { useState } from 'react';
import { RiExternalLinkLine, RiAwardLine, RiCalendarLine, RiVerifiedBadgeLine, RiPauseLine, RiPlayLine } from 'react-icons/ri';

const CertificateCarousel = ({ certificates }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [imageErrors, setImageErrors] = useState({});

  const handleImageError = (id) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  const handleVerifyClick = (url) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  // Duplicate certificates untuk seamless loop
  const duplicatedCertificates = [...certificates, ...certificates];

  // Function to get category color
  const getCategoryColor = (kategori) => {
    const colors = {
      'Network & Infrastructure': 'from-blue-500/30 to-cyan-500/30',
      'IT Fundamentals': 'from-green-500/30 to-emerald-500/30',
      'Office Productivity': 'from-orange-500/30 to-yellow-500/30',
      'Database Management': 'from-red-500/30 to-pink-500/30',
      'Enterprise Systems': 'from-indigo-500/30 to-purple-500/30',
      'Professional Development': 'from-purple-500/30 to-violet-500/30',
    };
    return colors[kategori] || 'from-violet-500/30 to-blue-500/30';
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-violet-900/20 via-blue-900/20 to-purple-900/20 rounded-2xl p-8">
      {/* Header dengan kontrol */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Professional Certifications</h2>
          <p className="text-gray-300">Hover to pause • Click to view</p>
        </div>
        <button
          onClick={togglePause}
          className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          {isPaused ? <RiPlayLine /> : <RiPauseLine />}
          {isPaused ? 'Play' : 'Pause'}
        </button>
      </div>

      {/* Scrolling Container */}
      <div 
        className="flex gap-6 w-fit"
        style={{
          animation: isPaused ? 'none' : 'scroll-left 60s linear infinite',
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {duplicatedCertificates.map((cert, index) => (
          <div
            key={`${cert.id}-${index}`}
            className="flex-shrink-0 w-80 bg-zinc-900/80 backdrop-blur-md border border-zinc-700 rounded-xl overflow-hidden hover:bg-zinc-800/90 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 group cursor-pointer"
            onClick={() => handleVerifyClick(cert.url)}
          >
            {/* Certificate Image */}
            <div className={`relative h-48 overflow-hidden bg-gradient-to-br ${getCategoryColor(cert.kategori)}`}>
              {!imageErrors[cert.id] ? (
                <img
                  src={cert.gambar}
                  alt={cert.nama}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={() => handleImageError(cert.id)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-violet-500/40 to-blue-500/40">
                  <RiAwardLine className="text-6xl text-violet-300" />
                </div>
              )}
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Category Badge */}
              <div className="absolute top-3 left-3">
                <span className="bg-violet-500/90 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm border border-violet-400/30">
                  {cert.kategori}
                </span>
              </div>

              {/* Verified Badge */}
              <div className="absolute top-3 right-3">
                <div className="bg-green-500/90 rounded-full p-1 backdrop-blur-sm">
                  <RiVerifiedBadgeLine className="text-lg text-white" />
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                  <RiExternalLinkLine className="text-2xl text-white" />
                </div>
              </div>
            </div>

            {/* Certificate Info */}
            <div className="p-6">
              {/* Certificate Name */}
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-violet-400 transition-colors line-clamp-2">
                {cert.nama}
              </h3>

              {/* Issuer */}
              <div className="flex items-center gap-2 mb-2">
                <RiAwardLine className="text-violet-400 text-sm flex-shrink-0" />
                <span className="text-violet-300 font-semibold text-sm truncate">{cert.penerbit}</span>
              </div>

              {/* Date */}
              <div className="flex items-center gap-2 mb-3">
                <RiCalendarLine className="text-gray-400 text-sm flex-shrink-0" />
                <span className="text-gray-400 text-sm">{cert.tanggal}</span>
              </div>

              {/* Description */}
              <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                {cert.deskripsi}
              </p>

              {/* Credential ID */}
              <div className="mb-4">
                <span className="text-xs text-gray-500">Credential ID:</span>
                <p className="text-xs font-mono text-gray-400 bg-zinc-800/50 px-2 py-1 rounded mt-1 truncate">
                  {cert.kredensial}
                </p>
              </div>

              {/* Verify Indicator */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-violet-400 font-medium">Click to view certificate</span>
                <RiExternalLinkLine className="text-violet-400 text-sm" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Gradient Overlays untuk smooth fade */}
      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-slate-900 to-transparent pointer-events-none z-10" />
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-slate-900 to-transparent pointer-events-none z-10" />
    </div>
  );
};

export default CertificateCarousel;