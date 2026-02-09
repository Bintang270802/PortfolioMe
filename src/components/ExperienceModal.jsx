import React, { useState, useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { getLocalizedText } from '../data';

const ExperienceModal = ({ isOpen, onClose, experience }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { t, language } = useLanguage();

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  };

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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen || !experience) return null;

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4 transition-opacity duration-300"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-zinc-900 border border-violet-500/50 rounded-2xl shadow-2xl shadow-violet-500/20 w-full max-w-5xl max-h-[90vh] transform transition-transform duration-300 ${isClosing ? 'animate-out' : 'animate-in'} flex flex-col`}
      >
        {/* Header */}
        <div className="relative p-6 border-b border-zinc-700">
          <div className="flex items-start gap-6">
            {/* Company Logo */}
            <div className="flex-shrink-0">
              {!imageError ? (
                <img
                  src={experience.logo}
                  alt={experience.perusahaan}
                  className="w-20 h-20 rounded-2xl object-cover bg-zinc-800 border-2 border-violet-500/30"
                  onError={handleImageError}
                />
              ) : (
                <div 
                  className="w-20 h-20 rounded-2xl flex items-center justify-center text-white font-bold text-2xl border-2 border-violet-500/30"
                  style={{ backgroundColor: experience.warna }}
                >
                  {experience.perusahaan.charAt(0)}
                </div>
              )}
            </div>

            {/* Job Info */}
            <div className="flex-1 min-w-0">
              <h2 className="text-3xl font-bold text-white mb-2">
                {getLocalizedText(experience.posisi, language)}
              </h2>
              
              <div className="flex items-center gap-2 mb-4">
                <span className="text-violet-400 font-bold text-xs uppercase">Company:</span>
                <span className="text-xl text-violet-300 font-semibold">{experience.perusahaan}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-300">
                  <span className="text-violet-400 font-semibold">Period:</span>
                  <span>{experience.periode}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <span className="text-blue-400 font-semibold">Duration:</span>
                  <span>{calculateDuration(experience.tanggalMulai, experience.tanggalSelesai)}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <span className="text-green-400 font-semibold">Location:</span>
                  <span>{experience.lokasi}</span>
                </div>
              </div>
            </div>

            {/* Job Type & Close Button */}
            <div className="flex flex-col items-end gap-4">
              <button
                onClick={handleClose}
                className="text-zinc-400 hover:text-white transition-colors px-3 py-2 rounded-full hover:bg-zinc-700 text-2xl font-bold"
              >
                ×
              </button>
              
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                experience.tipe === 'Full-time' 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
              }`}>
                {experience.tipe}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          <div className="space-y-8">
            {/* Description */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="text-violet-400 font-bold text-xs uppercase">Description</span>
                {t('experience.jobDescription')}
              </h3>
              <p className="text-gray-300 leading-relaxed bg-zinc-800/30 p-4 rounded-lg border border-zinc-700/50">
                {getLocalizedText(experience.deskripsi, language)}
              </p>
            </div>

            {/* Responsibilities */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="text-blue-400 font-bold text-xs uppercase">Responsibilities</span>
                {t('experience.mainResponsibilities')}
              </h3>
              <div className="grid gap-3">
                {getLocalizedText(experience.tanggungJawab, language).map((item, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-start gap-3 p-4 bg-zinc-800/30 rounded-lg border border-zinc-700/50 hover:border-violet-500/30 transition-colors"
                  >
                    <div className="w-6 h-6 bg-violet-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-violet-400 text-xs font-bold">{idx + 1}</span>
                    </div>
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="text-green-400 font-bold text-xs uppercase">Technologies</span>
                {t('experience.technologiesTools')}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {experience.teknologi.map((tech, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center gap-2 p-3 bg-zinc-800/50 border border-zinc-600 rounded-lg hover:bg-violet-500/10 hover:border-violet-500/50 transition-all duration-300 group"
                  >
                    <div className="w-2 h-2 bg-violet-400 rounded-full group-hover:bg-violet-300 transition-colors" />
                    <span className="text-gray-300 text-sm font-medium">{tech}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="text-yellow-400 font-bold text-xs uppercase">Achievements</span>
                {t('experience.achievementsContributions')}
              </h3>
              <div className="space-y-4">
                {getLocalizedText(experience.pencapaian, language).map((item, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-start gap-4 p-4 bg-gradient-to-r from-yellow-500/5 to-orange-500/5 rounded-lg border border-yellow-500/20 hover:border-yellow-500/40 transition-colors"
                  >
                    <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-yellow-400 text-sm font-bold">★</span>
                    </div>
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline Summary */}
            <div className="bg-gradient-to-r from-violet-500/10 to-blue-500/10 rounded-lg p-6 border border-violet-500/20">
              <h3 className="text-lg font-semibold text-white mb-4">{t('experience.workPeriodSummary')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-center p-4 bg-zinc-800/30 rounded-lg">
                  <div className="text-2xl font-bold text-violet-400 mb-1">
                    {new Date(experience.tanggalMulai).toLocaleDateString('id-ID', { 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </div>
                  <div className="text-gray-400 text-sm">{t('experience.startWork')}</div>
                </div>
                <div className="text-center p-4 bg-zinc-800/30 rounded-lg">
                  <div className="text-2xl font-bold text-blue-400 mb-1">
                    {experience.tanggalSelesai === 'Present' 
                      ? t('experience.present')
                      : new Date(experience.tanggalSelesai).toLocaleDateString('id-ID', { 
                          month: 'long', 
                          year: 'numeric' 
                        })
                    }
                  </div>
                  <div className="text-gray-400 text-sm">
                    {experience.tanggalSelesai === 'Present' ? t('experience.currentlyActive') : t('experience.finished')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(63, 63, 70, 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.7);
        }
        
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-in {
          animation: scaleIn 0.3s ease-out forwards;
        }
        
        @keyframes scaleOut {
          from { transform: scale(1); opacity: 1; }
          to { transform: scale(0.95); opacity: 0; }
        }
        .animate-out {
          animation: scaleOut 0.3s ease-in forwards;
        }
      `}</style>
    </div>
  );
};

export default ExperienceModal;