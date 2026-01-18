import { useState } from 'react';
import ExperienceCard from './ExperienceCard';
import ExperienceModal from './ExperienceModal';
import { useLanguage } from '../hooks/useLanguage';

const ExperienceTimeline = ({ experiences }) => {
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useLanguage();

  const handleCardClick = (experience) => {
    setSelectedExperience(experience);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedExperience(null);
  };

  // Sort experiences by start date (newest first)
  const sortedExperiences = [...experiences].sort((a, b) => {
    const dateA = new Date(a.tanggalMulai);
    const dateB = new Date(b.tanggalMulai);
    return dateB - dateA;
  });

  return (
    <div className="relative">
      {/* Timeline Header */}
      <div className="text-center mb-12" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true">
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-violet-500/20 to-blue-500/20 backdrop-blur-md border border-violet-500/30 rounded-full px-6 py-3 mb-6">
          <div className="w-3 h-3 bg-violet-500 rounded-full animate-pulse" />
          <span className="text-violet-300 font-semibold">{t('experience.professionalJourney')}</span>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>
        <p className="text-gray-400 max-w-3xl mx-auto text-sm sm:text-base px-4">
          {t('experience.clickToViewDetails')}
        </p>
      </div>

      {/* Timeline Container */}
      <div className="relative max-w-5xl mx-auto px-4">
        {/* Main Timeline Line - Hidden on mobile */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-violet-500 via-blue-500 to-purple-500 opacity-20 hidden sm:block" />
        
        {/* Experience Cards */}
        <div className="space-y-6 sm:space-y-8">
          {sortedExperiences.map((experience, index) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              index={index}
              onClick={() => handleCardClick(experience)}
            />
          ))}
        </div>

        {/* Timeline End */}
        <div className="flex justify-center mt-12" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400" data-aos-once="true">
          <div className="flex items-center gap-3 bg-gradient-to-r from-violet-500/10 to-blue-500/10 backdrop-blur-md border border-violet-500/20 rounded-full px-6 py-3">
            <div className="w-2 h-2 bg-violet-400 rounded-full" />
            <span className="text-violet-300 text-sm font-medium">{t('experience.journeyContinues')}</span>
            <div className="w-2 h-2 bg-blue-400 rounded-full" />
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 px-4" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="600" data-aos-once="true">
        <div className="text-center bg-zinc-900/40 backdrop-blur-md border border-zinc-700/50 rounded-xl p-4 sm:p-6 hover:border-violet-500/30 transition-colors">
          <div className="text-2xl sm:text-3xl font-bold text-violet-400 mb-2">{experiences.length}</div>
          <div className="text-gray-300 text-xs sm:text-sm">{t('experience.workExperience')}</div>
        </div>
        
        <div className="text-center bg-zinc-900/40 backdrop-blur-md border border-zinc-700/50 rounded-xl p-4 sm:p-6 hover:border-blue-500/30 transition-colors">
          <div className="text-2xl sm:text-3xl font-bold text-blue-400 mb-2">2+</div>
          <div className="text-gray-300 text-xs sm:text-sm">{t('experience.yearsExperience')}</div>
        </div>
        
        <div className="text-center bg-zinc-900/40 backdrop-blur-md border border-zinc-700/50 rounded-xl p-4 sm:p-6 hover:border-green-500/30 transition-colors">
          <div className="text-2xl sm:text-3xl font-bold text-green-400 mb-2">5+</div>
          <div className="text-gray-300 text-xs sm:text-sm">{t('experience.projectsCompleted')}</div>
        </div>
      </div>

      {/* Experience Modal */}
      <ExperienceModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        experience={selectedExperience}
      />
    </div>
  );
};

export default ExperienceTimeline;