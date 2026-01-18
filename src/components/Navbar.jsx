import { useState, useEffect } from "react";
import { useLanguage } from '../hooks/useLanguage';
import LanguageToggle from './LanguageToggle';

const Navbar = ({ hidden = false }) => {
  const [active, setActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setActive(window.scrollY > 150);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking on a link
  const handleLinkClick = () => {
    setMobileMenuOpen(false);
    // Re-enable body scroll when menu closes
    document.body.style.overflow = 'auto';
  };

  // Handle mobile menu toggle
  const handleMobileMenuToggle = () => {
    const newState = !mobileMenuOpen;
    setMobileMenuOpen(newState);
    
    // Prevent body scroll when menu is open, allow when closed
    if (newState) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Close mobile menu on window resize (when switching to desktop)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && mobileMenuOpen) {
        setMobileMenuOpen(false);
        document.body.style.overflow = 'auto';
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  if (hidden) return null;

  return (
    <>
      <nav className={`navbar fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        active 
          ? 'bg-zinc-900/95 backdrop-blur-md border-b border-zinc-700/50 py-4' 
          : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="logo">
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                Portfolio
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <nav className="flex items-center space-x-8">
                <a href="#home" className="text-white hover:text-violet-400 transition-colors font-medium">{t('nav.home')}</a>
                <a href="#about" className="text-white hover:text-violet-400 transition-colors font-medium">{t('nav.about')}</a>
                <a href="#experience" className="text-white hover:text-violet-400 transition-colors font-medium">{t('nav.experience')}</a>
                <a href="#certificates" className="text-white hover:text-violet-400 transition-colors font-medium">{t('nav.certificates')}</a>
                <a href="#project" className="text-white hover:text-violet-400 transition-colors font-medium">{t('nav.project')}</a>
                <a href="#contact" className="text-white hover:text-violet-400 transition-colors font-medium">{t('nav.contact')}</a>
              </nav>
              <LanguageToggle />
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center gap-3">
              <LanguageToggle />
              <button
                onClick={handleMobileMenuToggle}
                className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Toggle mobile menu"
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                  <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                    mobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'
                  }`}></span>
                  <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
                    mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}></span>
                  <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                    mobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'
                  }`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
        mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => {
            setMobileMenuOpen(false);
            document.body.style.overflow = 'auto';
          }}
        ></div>
        
        {/* Menu Panel */}
        <div className={`absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-zinc-900/95 backdrop-blur-md border-l border-zinc-700/50 transform transition-transform duration-300 overflow-y-auto ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="flex flex-col min-h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-zinc-700/50 sticky top-0 bg-zinc-900/95 backdrop-blur-md z-10">
              <h2 className="text-xl font-bold text-white">Menu</h2>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  document.body.style.overflow = 'auto';
                }}
                className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 px-6 py-8">
              <div className="space-y-6">
                <a 
                  href="#home" 
                  onClick={handleLinkClick}
                  className="block text-lg font-medium text-white hover:text-violet-400 transition-colors py-3 border-b border-zinc-700/30"
                >
                  {t('nav.home')}
                </a>
                <a 
                  href="#about" 
                  onClick={handleLinkClick}
                  className="block text-lg font-medium text-white hover:text-violet-400 transition-colors py-3 border-b border-zinc-700/30"
                >
                  {t('nav.about')}
                </a>
                <a 
                  href="#experience" 
                  onClick={handleLinkClick}
                  className="block text-lg font-medium text-white hover:text-violet-400 transition-colors py-3 border-b border-zinc-700/30"
                >
                  {t('nav.experience')}
                </a>
                <a 
                  href="#certificates" 
                  onClick={handleLinkClick}
                  className="block text-lg font-medium text-white hover:text-violet-400 transition-colors py-3 border-b border-zinc-700/30"
                >
                  {t('nav.certificates')}
                </a>
                <a 
                  href="#project" 
                  onClick={handleLinkClick}
                  className="block text-lg font-medium text-white hover:text-violet-400 transition-colors py-3 border-b border-zinc-700/30"
                >
                  {t('nav.project')}
                </a>
                <a 
                  href="#contact" 
                  onClick={handleLinkClick}
                  className="block text-lg font-medium text-white hover:text-violet-400 transition-colors py-3 border-b border-zinc-700/30"
                >
                  {t('nav.contact')}
                </a>
              </div>
            </nav>

            {/* Footer info */}
            <div className="p-6 border-t border-zinc-700/50 bg-zinc-800/30 mt-auto">
              <p className="text-sm text-gray-400 text-center">
                © 2026 Tri Bintang Saputra
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
