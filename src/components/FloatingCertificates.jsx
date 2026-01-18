import { useState } from 'react';
import { RiExternalLinkLine, RiAwardLine, RiVerifiedBadgeLine } from 'react-icons/ri';

const FloatingCertificates = ({ certificates }) => {
  const [imageErrors, setImageErrors] = useState({});
  const [hoveredId, setHoveredId] = useState(null);

  const handleImageError = (id) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  const handleVerifyClick = (url) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  // Create multiple rows for continuous scroll
  const createRows = () => {
    const rows = [];
    const certsPerRow = 3;
    
    for (let i = 0; i < 3; i++) {
      const rowCerts = [];
      for (let j = 0; j < certsPerRow * 2; j++) {
        rowCerts.push(certificates[j % certificates.length]);
      }
      rows.push(rowCerts);
    }
    return rows;
  };

  const rows = createRows();

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-violet-900/10 via-blue-900/10 to-purple-900/10 rounded-3xl p-8 min-h-[600px]">
      {/* Header */}
      <div className="text-center mb-12 relative z-10">
        <h2 className="text-4xl font-bold text-white mb-4">
          <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
            Professional Certifications
          </span>
        </h2>
        <p className="text-gray-300 text-lg">Hover to explore • Click to verify</p>
      </div>

      {/* Floating Certificates Container */}
      <div className="relative">
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="flex gap-8 mb-8"
            style={{
              animation: `scroll-left ${40 + rowIndex * 10}s linear infinite`,
              animationDirection: rowIndex % 2 === 0 ? 'normal' : 'reverse',
            }}
          >
            {row.map((cert, index) => (
              <div
                key={`${cert.id}-${rowIndex}-${index}`}
                className={`flex-shrink-0 w-72 certificate-float ${hoveredId === `${cert.id}-${rowIndex}-${index}` ? 'certificate-glow' : ''}`}
                style={{
                  animationDelay: `${index * 0.5}s`,
                }}
                onMouseEnter={() => setHoveredId(`${cert.id}-${rowIndex}-${index}`)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div
                  className="bg-zinc-900/70 backdrop-blur-md border border-zinc-700/50 rounded-2xl overflow-hidden hover:bg-zinc-800/80 transition-all duration-500 shadow-xl hover:shadow-2xl hover:scale-110 group cursor-pointer relative"
                  onClick={() => handleVerifyClick(cert.url)}
                >
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                  
                  {/* Certificate Image */}
                  <div className="relative h-40 overflow-hidden bg-gradient-to-br from-violet-500/20 to-blue-500/20">
                    {!imageErrors[cert.id] ? (
                      <img
                        src={cert.gambar}
                        alt={cert.nama}
                        className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
                        onError={() => handleImageError(cert.id)}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-violet-500/30 to-blue-500/30">
                        <RiAwardLine className="text-5xl text-violet-300" />
                      </div>
                    )}
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="bg-violet-500/90 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm border border-violet-400/50 shadow-lg">
                        {cert.kategori}
                      </span>
                    </div>

                    {/* Verified Badge */}
                    <div className="absolute top-3 right-3">
                      <div className="bg-green-500/90 rounded-full p-2 backdrop-blur-sm border border-green-400/50 shadow-lg">
                        <RiVerifiedBadgeLine className="text-sm text-white" />
                      </div>
                    </div>

                    {/* Hover Icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="bg-white/20 backdrop-blur-md rounded-full p-4 border border-white/30 shadow-xl transform scale-75 group-hover:scale-100 transition-transform duration-300">
                        <RiExternalLinkLine className="text-2xl text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Certificate Info */}
                  <div className="p-5">
                    {/* Certificate Name */}
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-violet-400 transition-colors line-clamp-2">
                      {cert.nama}
                    </h3>

                    {/* Issuer */}
                    <div className="flex items-center gap-2 mb-2">
                      <RiAwardLine className="text-violet-400 text-sm flex-shrink-0" />
                      <span className="text-violet-300 font-semibold text-sm truncate">{cert.penerbit}</span>
                    </div>

                    {/* Year */}
                    <div className="text-gray-400 text-sm mb-3">{cert.tanggal}</div>

                    {/* Credential Preview */}
                    <div className="text-xs text-gray-500 font-mono bg-zinc-800/50 px-2 py-1 rounded truncate">
                      ID: {cert.kredensial}
                    </div>
                  </div>

                  {/* Bottom Glow */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Gradient Overlays */}
      <div className="absolute top-0 left-0 w-40 h-full bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent pointer-events-none z-20" />
      <div className="absolute top-0 right-0 w-40 h-full bg-gradient-to-l from-slate-900 via-slate-900/80 to-transparent pointer-events-none z-20" />
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none z-20" />
    </div>
  );
};

export default FloatingCertificates;