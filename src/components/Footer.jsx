import "remixicon/fonts/remixicon.css";
import Dock from "./Dock/Dock";
import { useLanguage } from '../hooks/useLanguage';

const Footer = () => {
  const { t } = useLanguage();
  
  const items = [
    { label: t('nav.home'), onClick: () => document.getElementById("home")?.scrollIntoView({ behavior: "smooth" }) },
    { label: t('nav.about'), onClick: () => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }) },
    { label: t('nav.experience'), onClick: () => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" }) },
    { label: t('nav.certificates'), onClick: () => document.getElementById("certificates")?.scrollIntoView({ behavior: "smooth" }) },
    { label: t('nav.project'), onClick: () => document.getElementById("project")?.scrollIntoView({ behavior: "smooth" }) },
  ];

  return (
    <footer className="relative mt-32 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-800/50 to-transparent" />
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
      
      <div className="relative z-10 px-6 py-16">
        <div className="max-w-7xl mx-auto">
          
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
            
            {/* Brand Section */}
            <div className="lg:col-span-1 space-y-6">
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent mb-3">
                  Portfolio
                </h2>
                <p className="text-gray-300 text-sm leading-relaxed max-w-sm">
                  {t('footer.description')}
                </p>
              </div>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="w-8 h-8 bg-violet-500/20 rounded-lg flex items-center justify-center">
                    <i className="ri-mail-line text-violet-400"></i>
                  </div>
                  <span className="text-sm">tribintangsaputra03@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <i className="ri-phone-line text-green-400"></i>
                  </div>
                  <span className="text-sm">+62 858-9403-6266</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-1 space-y-6">
              <h3 className="text-lg font-semibold text-white mb-4">{t('footer.quickLinks')}</h3>
              <nav className="space-y-3">
                <a 
                  href="#home" 
                  className="block text-gray-300 hover:text-violet-400 transition-colors duration-300 text-sm group"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <span className="flex items-center gap-2">
                    <i className="ri-arrow-right-s-line text-xs group-hover:translate-x-1 transition-transform duration-300"></i>
                    {t('nav.home')}
                  </span>
                </a>
                <a 
                  href="#about" 
                  className="block text-gray-300 hover:text-violet-400 transition-colors duration-300 text-sm group"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <span className="flex items-center gap-2">
                    <i className="ri-arrow-right-s-line text-xs group-hover:translate-x-1 transition-transform duration-300"></i>
                    {t('nav.about')}
                  </span>
                </a>
                <a 
                  href="#experience" 
                  className="block text-gray-300 hover:text-violet-400 transition-colors duration-300 text-sm group"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <span className="flex items-center gap-2">
                    <i className="ri-arrow-right-s-line text-xs group-hover:translate-x-1 transition-transform duration-300"></i>
                    {t('nav.experience')}
                  </span>
                </a>
                <a 
                  href="#certificates" 
                  className="block text-gray-300 hover:text-violet-400 transition-colors duration-300 text-sm group"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("certificates")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <span className="flex items-center gap-2">
                    <i className="ri-arrow-right-s-line text-xs group-hover:translate-x-1 transition-transform duration-300"></i>
                    {t('nav.certificates')}
                  </span>
                </a>
                <a  
                  href="#project" 
                  className="block text-gray-300 hover:text-violet-400 transition-colors duration-300 text-sm group"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("project")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <span className="flex items-center gap-2">
                    <i className="ri-arrow-right-s-line text-xs group-hover:translate-x-1 transition-transform duration-300"></i>
                    {t('nav.project')}
                  </span>
                </a>
                <a 
                  href="#contact" 
                  className="block text-gray-300 hover:text-violet-400 transition-colors duration-300 text-sm group"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  
                  <span className="flex items-center gap-2">
                    <i className="ri-arrow-right-s-line text-xs group-hover:translate-x-1 transition-transform duration-300"></i>
                    {t('nav.contact')}
                  </span>
                </a>
              </nav>
            </div>

            {/* Social Media */}
            <div className="lg:col-span-1 space-y-6">
              <h3 className="text-lg font-semibold text-white mb-4">{t('footer.connectWithMe')}</h3>
              
              {/* Social Media Icons */}
              <div className="flex gap-4">
                <a 
                  href="https://wa.me/6285894036266" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group relative w-12 h-12 bg-zinc-800/50 hover:bg-green-500/20 border border-zinc-700 hover:border-green-500/50 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <i className="ri-whatsapp-fill text-xl text-gray-400 group-hover:text-green-400 transition-colors duration-300"></i>
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-zinc-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    WhatsApp
                  </div>
                </a>
                
                <a 
                  href="tiktok.com/@bintangalhadi077" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group relative w-12 h-12 bg-zinc-800/50 hover:bg-pink-500/20 border border-zinc-700 hover:border-pink-500/50 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <i className="ri-tiktok-fill text-xl text-gray-400 group-hover:text-pink-400 transition-colors duration-300"></i>
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-zinc-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    TikTok
                  </div>
                </a>
                
                <a 
                  href="https://www.linkedin.com/in/tribintangsaputra" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group relative w-12 h-12 bg-zinc-800/50 hover:bg-blue-500/20 border border-zinc-700 hover:border-blue-500/50 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <i className="ri-linkedin-fill text-xl text-gray-400 group-hover:text-blue-400 transition-colors duration-300"></i>
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-zinc-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    LinkedIn
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent mb-8" />

          {/* Bottom Section */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            
            {/* Copyright */}
            <div className="text-center lg:text-left">
              <p className="text-gray-400 text-sm">
                © 2026 <span className="text-violet-400 font-medium">Tri Bintang Saputra</span>. {t('footer.copyright')}
              </p>
              <p className="text-gray-500 text-xs mt-1">
                {t('footer.builtWith')}
              </p>
            </div>

            {/* Dock Navigation */}
            <div className="order-first lg:order-last">
              <Dock 
                items={items}
                panelHeight={30}
                baseItemSize={50}
                magnification={80}
              />
            </div>

            {/* Back to Top */}
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group flex items-center gap-2 text-gray-400 hover:text-violet-400 transition-colors duration-300 text-sm"
            >
              <span>{t('footer.backToTop')}</span>
              <i className="ri-arrow-up-line group-hover:-translate-y-1 transition-transform duration-300"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-zinc-900 to-transparent pointer-events-none" />
    </footer>
  );
};

export default Footer;
