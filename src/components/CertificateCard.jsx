import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { getLocalizedText } from '../data';

const CertificateCard = ({ sertifikat }) => {
  const [imageError, setImageError] = useState(false);
  const { t, language } = useLanguage();

  // Debug: log image path
  console.log('Certificate image path:', sertifikat.gambar);

  const handleImageError = () => {
    console.log('Image failed to load:', sertifikat.gambar);
    setImageError(true);
  };

  // Generate certificate-themed background based on category
  const getCategoryGradient = (kategori) => {
    const categoryText = getLocalizedText(kategori, language);
    switch (categoryText) {
      case 'Network & Infrastructure':
      case 'Jaringan & Infrastruktur':
        return 'from-blue-500/30 via-cyan-500/20 to-blue-600/30';
      case 'IT Fundamentals':
      case 'Dasar IT':
        return 'from-green-500/30 via-emerald-500/20 to-green-600/30';
      case 'Office Productivity':
      case 'Produktivitas Kantor':
        return 'from-orange-500/30 via-yellow-500/20 to-orange-600/30';
      case 'Database Management':
      case 'Manajemen Database':
        return 'from-red-500/30 via-pink-500/20 to-red-600/30';
      case 'Enterprise Systems':
      case 'Sistem Enterprise':
        return 'from-indigo-500/30 via-purple-500/20 to-indigo-600/30';
      case 'Professional Development':
      case 'Pengembangan Profesional':
        return 'from-purple-500/30 via-violet-500/20 to-purple-600/30';
      default:
        return 'from-violet-500/30 via-blue-500/20 to-violet-600/30';
    }
  };

  // Generate certificate icon based on category
  const getCategoryIcon = (kategori) => {
    const categoryText = getLocalizedText(kategori, language);
    switch (categoryText) {
      case 'Network & Infrastructure':
      case 'Jaringan & Infrastruktur':
        return '';
      case 'IT Fundamentals':
      case 'Dasar IT':
        return '';
      case 'Office Productivity':
      case 'Produktivitas Kantor':
        return '';
      case 'Database Management':
      case 'Manajemen Database':
        return '';
      case 'Enterprise Systems':
      case 'Sistem Enterprise':
        return '';
      case 'Professional Development':
      case 'Pengembangan Profesional':
        return '';
      default:
        return '';
    }
  };

  return (
    <div 
      className="group relative bg-zinc-900/60 backdrop-blur-md border border-zinc-700 rounded-xl overflow-hidden hover:bg-zinc-800/80 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
      data-aos="fade-up" 
      data-aos-duration="1000" 
      data-aos-delay={sertifikat.dad} 
      data-aos-once="true"
    >
      {/* Certificate Image */}
      <div className={`relative h-64 overflow-hidden bg-gradient-to-br ${getCategoryGradient(sertifikat.kategori)}`}>
        {!imageError ? (
          <img
            src={sertifikat.gambar}
            alt={sertifikat.nama}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="w-full h-full bg-gradient-to-br from-white/20 to-transparent" 
                   style={{
                     backgroundImage: `radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 0%, transparent 50%), 
                                      radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)`
                   }} />
            </div>
            
            {/* Certificate Icon */}
            <div className="text-6xl mb-2 opacity-80">
              {getCategoryIcon(sertifikat.kategori)}
            </div>
            
            {/* Certificate Text */}
            <span className="text-white text-sm font-medium text-center px-4">
              {getLocalizedText(sertifikat.nama, language)}
            </span>
            
            {/* Decorative Elements */}
            <div className="absolute top-4 left-4 w-8 h-8 border-2 border-white/20 rounded-full" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-2 border-white/20 rounded-full" />
            <div className="absolute top-1/2 right-4 w-4 h-4 border border-white/20 rotate-45" />
          </div>
        )}
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-violet-500/90 text-white text-xs font-semibold px-2 py-1 rounded-full backdrop-blur-sm">
            {getLocalizedText(sertifikat.kategori, language)}
          </span>
        </div>

        {/* Verified Badge */}
        <div className="absolute top-3 right-3">
          <div className="text-2xl text-green-400 drop-shadow-lg font-bold">✓</div>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
            <span className="text-2xl text-white font-bold">CERT</span>
          </div>
        </div>
      </div>

      {/* Certificate Info */}
      <div className="p-6">
        {/* Certificate Name */}
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-violet-400 transition-colors line-clamp-2">
          {getLocalizedText(sertifikat.nama, language)}
        </h3>

        {/* Issuer */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-violet-300 font-semibold text-sm truncate">{sertifikat.penerbit}</span>
        </div>

        {/* Date */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-gray-400 text-sm">{sertifikat.tanggal}</span>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm mb-4 line-clamp-3 leading-relaxed">
          {getLocalizedText(sertifikat.deskripsi, language)}
        </p>

        {/* Credential ID */}
        <div className="mb-0">
          <span className="text-xs text-gray-500">{t('certificates.credentialId')}:</span>
          <p className="text-xs font-mono text-gray-400 bg-zinc-800 px-2 py-1 rounded mt-1 truncate">
            {sertifikat.kredensial}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CertificateCard;