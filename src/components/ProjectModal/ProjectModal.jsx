import React, { useState, useEffect } from 'react';
import { FiX, FiGithub, FiExternalLink } from 'react-icons/fi';
import { SiFigma } from 'react-icons/si';
import { useLanguage } from '../../hooks/useLanguage';
import { getLocalizedText } from '../../data';
import DevelopmentPopup from '../DevelopmentPopup/DevelopmentPopup';

const ProjectModal = ({ isOpen, onClose, project }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [showDevelopmentPopup, setShowDevelopmentPopup] = useState(false);
  const { t, language } = useLanguage();

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  };

  const handleLiveDemoClick = (e) => {
    e.preventDefault();
    
    // Check if project is in development
    if (project.status === 'development') {
      setShowDevelopmentPopup(true);
      return;
    }
    
    // If not in development, open the live demo
    window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
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

  if (!isOpen) return null;

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4 transition-opacity duration-300"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-zinc-900 border border-violet-500/50 rounded-2xl shadow-2xl shadow-violet-500/20 w-full max-w-4xl max-h-[90vh] transform transition-transform duration-300 ${isClosing ? 'animate-out' : 'animate-in'} flex flex-col`}
      >
        {/* Header */}
        <div className="flex justify-between items-start p-6 border-b border-zinc-700">
          <div className="flex-1 pr-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 line-clamp-2">
              {getLocalizedText(project.title, language)}
            </h2>
            <p className="text-violet-300 text-sm md:text-base font-medium">
              {getLocalizedText(project.subtitle, language)}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="text-zinc-400 hover:text-white transition-colors p-2 rounded-full hover:bg-zinc-700 flex-shrink-0"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
          {/* Image Section */}
          <div className="lg:w-1/2 p-6 flex-shrink-0">
            <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-violet-500/20 to-blue-500/20 aspect-video">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            
            {/* Tech Stack Icons (if available) */}
            <div className="mt-4 flex flex-wrap gap-2">
              {project.technologies && project.technologies.slice(0, 4).map((tech, index) => (
                <span 
                  key={index}
                  className={`px-3 py-1 text-xs font-medium rounded-full border ${
                    index % 3 === 0 ? 'bg-violet-500/20 text-violet-300 border-violet-500/30' :
                    index % 3 === 1 ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' :
                    'bg-green-500/20 text-green-300 border-green-500/30'
                  }`}
                >
                  {tech}
                </span>
              ))}
              {project.technologies && project.technologies.length > 4 && (
                <span className="px-3 py-1 bg-zinc-600/20 text-zinc-400 text-xs font-medium rounded-full border border-zinc-600/30">
                  +{project.technologies.length - 4} more
                </span>
              )}
            </div>
          </div>

          {/* Description Section */}
          <div className="lg:w-1/2 p-6 flex flex-col">
            <h3 className="text-lg font-semibold text-white mb-4">{t('projects.projectDescription')}</h3>
            
            {/* Scrollable Description */}
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
              <div className="space-y-4">
                {getLocalizedText(project.fullDescription, language).split('|').map((paragraph, index) => (
                  <p key={index} className="text-zinc-300 text-sm md:text-base leading-relaxed">
                    {paragraph.trim()}
                  </p>
                ))}
              </div>
            </div>

            {/* Project Stats */}
            <div className="mt-6 grid grid-cols-2 gap-4 p-4 bg-zinc-800/50 rounded-lg border border-zinc-700">
              <div className="text-center">
                <div className="text-violet-400 font-bold text-lg">{project.year || '2024'}</div>
                <div className="text-zinc-400 text-xs">{t('projects.year')}</div>
              </div>
              <div className="text-center">
                <div className="text-violet-400 font-bold text-lg">{project.platform || 'Mobile & Web'}</div>
                <div className="text-zinc-400 text-xs">{t('projects.platform')}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-zinc-700">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Source Code Button */}
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 font-semibold bg-violet-600 hover:bg-violet-700 text-white p-3 px-5 rounded-lg transition-all duration-300 hover:scale-105"
            >
              <FiGithub />
              <span>{t('projects.sourceCode')}</span>
            </a>

            {/* Figma Button */}
            {project.figmaUrl && (
              <a
                href={project.figmaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 font-semibold bg-zinc-700 hover:bg-zinc-600 text-white p-3 px-5 rounded-lg transition-all duration-300 hover:scale-105"
              >
                <SiFigma />
                <span>{t('projects.design')}</span>
              </a>
            )}

            {/* Live Demo Button */}
            {project.liveUrl && (
              <button
                onClick={handleLiveDemoClick}
                className={`flex-1 inline-flex items-center justify-center gap-2 font-semibold p-3 px-5 rounded-lg transition-all duration-300 hover:scale-105 ${
                  project.status === 'development' 
                    ? 'bg-orange-600 hover:bg-orange-700 text-white' 
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                <FiExternalLink />
                <span>
                  {project.status === 'development' 
                    ? 'Live Demo (Development)' 
                    : t('projects.liveDemo')
                  }
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Development Popup */}
      <DevelopmentPopup
        isOpen={showDevelopmentPopup}
        onClose={() => setShowDevelopmentPopup(false)}
        projectName={getLocalizedText(project.title, language)}
      />

      {/* Custom Scrollbar Styles */}
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

export default ProjectModal;
