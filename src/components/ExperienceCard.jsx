import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { getLocalizedText } from '../data';

const ExperienceCard = ({ experience, onClick }) => {
  const [imageError, setImageError] = useState(false);
  const { t, language } = useLanguage();

  const handleImageError = () => {
    setImageError(true);
  };

  const calculateDuration = (start, end) => {
    const startDate = new Date(start);
    const endDate = end === 'Present' ? new Date() : new Date(end);
    const diffTime = Math.abs(endDate - startDate);
    const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
    
    if (diffMonths < 12) {
      return `${diffMonths} ${t('experience.months')}`;
    } else {
      const years = Math.floor(diffMonths / 12);
      const months = diffMonths % 12;
      return months > 0 ? `${years} ${t('experience.years')} ${months} ${t('experience.months')}` : `${years} ${t('experience.years')}`;
    }
  };

  return (
    <div 
      className="group relative transition-all duration-500 hover:scale-102"
      data-aos="fade-up" 
      data-aos-duration="1000" 
      data-aos-delay={experience.delay || experience.dad} 
      data-aos-once="true"
    >
      {/* Timeline Line - Hidden on mobile */}
      <div className="absolute left-6 top-20 bottom-0 w-0.5 bg-gradient-to-b from-violet-500 to-transparent opacity-30 group-hover:opacity-60 transition-opacity hidden sm:block" />
      
      {/* Timeline Dot - Hidden on mobile */}
      <div className="absolute left-4 top-16 w-4 h-4 rounded-full border-2 bg-zinc-800 border-violet-500/50 group-hover:bg-violet-500/20 transition-all duration-300 hidden sm:block">
        <div className="absolute inset-1 rounded-full bg-transparent group-hover:bg-violet-500/30 transition-all duration-300" />
      </div>

      {/* Card Content */}
      <div className="sm:ml-12 bg-zinc-900/60 backdrop-blur-md border border-zinc-700/50 hover:border-violet-500/30 rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-violet-500/10">
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-zinc-700/50">
          <div className="flex items-start gap-3 sm:gap-4">
            {/* Company Logo */}
            <div className="flex-shrink-0">
              {!imageError ? (
                <img
                  src={experience.logo}
                  alt={experience.perusahaan}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl object-cover bg-zinc-800"
                  onError={handleImageError}
                />
              ) : (
                <div 
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center text-white font-bold text-base sm:text-lg"
                  style={{ backgroundColor: experience.color || experience.warna }}
                >
                  {experience.perusahaan.charAt(0)}
                </div>
              )}
            </div>

            {/* Job Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-1 group-hover:text-violet-400 transition-colors line-clamp-2">
                {getLocalizedText(experience.position || experience.posisi, language)}
              </h3>
              
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <span className="text-violet-400 text-xs font-bold uppercase">Company</span>
                <span className="text-violet-300 font-semibold text-sm sm:text-base truncate">{experience.perusahaan}</span>
              </div>

              <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <span className="font-semibold">Period:</span>
                  <span>{experience.periode}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-semibold">Duration:</span>
                  <span>{calculateDuration(experience.startDate || experience.tanggalMulai, experience.endDate || experience.tanggalSelesai)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-semibold">Location:</span>
                  <span>{experience.lokasi}</span>
                </div>
              </div>
            </div>

            {/* Job Type Badge */}
            <div className="flex-shrink-0">
              <span className={`px-2 sm:px-3 py-1 sm:py-2 rounded-full text-xs font-semibold ${
                experience.tipe === 'Full-time' 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
              }`}>
                {experience.tipe}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="p-4 sm:p-6">
          <p className="text-gray-300 mb-4 sm:mb-6 leading-relaxed line-clamp-3 text-sm sm:text-base">
            {getLocalizedText(experience.description || experience.deskripsi, language)}
          </p>

          {/* Technologies Preview */}
          <div className="mb-4 sm:mb-6">
            <h4 className="text-xs sm:text-sm font-semibold text-gray-400 mb-2">{t('experience.mainTechnologies')}</h4>
            <div className="flex flex-wrap gap-2">
              {(experience.technologies || experience.teknologi).slice(0, 4).map((tech, idx) => (
                <span 
                  key={idx}
                  className="px-2 py-1 bg-zinc-800/50 border border-zinc-600 rounded text-xs text-gray-300"
                >
                  {tech}
                </span>
              ))}
              {(experience.technologies || experience.teknologi).length > 4 && (
                <span className="px-2 py-1 bg-violet-500/20 border border-violet-500/30 rounded text-xs text-violet-300">
                  +{(experience.technologies || experience.teknologi).length - 4} {t('experience.others')}
                </span>
              )}
            </div>
          </div>

          {/* View Details Button */}
          <button
            onClick={onClick}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white font-semibold py-2.5 sm:py-3 px-4 rounded-lg transition-all duration-300 hover:scale-105 group text-sm sm:text-base"
          >
            <span>{t('experience.viewFullDetails')}</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;