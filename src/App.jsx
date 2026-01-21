import { useRef, useState, useEffect } from "react";
import { useLanguage } from './hooks/useLanguage';
import { useToast } from './hooks/useToast';
import { usePageTracking, useScrollTracking, useErrorTracking } from './hooks/useAnalytics';
import { trackProjectView, trackFilter } from './utils/analytics';
import ProfileCard from "./components/ProfileCard/ProfileCard";
import ShinyText from "./components/ShinyText/ShinyText";
import BlurText from "./components/BlurText/BlurText";
import RotatingText from "./components/RotatingText/RotatingText";
import Lanyard from "./components/Lanyard/Lanyard";
import { listTools, listProyek, listSertifikat, listPengalaman } from "./data";
import ChromaGrid from "./components/ChromaGrid/ChromaGrid";
import ProjectModal from "./components/ProjectModal/ProjectModal";
import ProjectFilter from "./components/ProjectFilter/ProjectFilter";
import DarkVeil from "./components/DarkVeil/DarkVeil";
import AOS from 'aos';
import ChatRoom from "./components/ChatRoomSupabase";
import SupabaseStatus from "./components/SupabaseStatus";
import CertificateSection from "./components/CertificateSection";
import ExperienceTimeline from "./components/ExperienceTimeline";
import ContactForm from "./components/ContactForm";
import ToastContainer from "./components/Toast/ToastContainer";
import 'aos/dist/aos.css';

AOS.init();

function App() {
  const aboutRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState(null);
  const [filteredProjects, setFilteredProjects] = useState(listProyek);
  
  // Toast system
  const { toasts, removeToast } = useToast();
  
  // Analytics hooks
  usePageTracking();
  useScrollTracking();
  useErrorTracking();

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    // Track project view
    trackProjectView(
      project.title.id || project.title.en || project.title,
      project.id
    );
  };

  const handleFilteredProjects = (projects) => {
    setFilteredProjects(projects);
    // Track filter usage
    if (projects.length !== listProyek.length) {
      trackFilter('project_filter', 'applied', projects.length);
    }
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  useEffect(() => {
    const isReload =
      performance.getEntriesByType("navigation")[0]?.type === "reload";

    if (isReload) {
      const baseUrl = window.location.origin + "/";
      window.location.replace(baseUrl);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <DarkVeil
          hueShift={0}
          noiseIntensity={0.02}
          scanlineIntensity={0}
          speed={0.3}
          scanlineFrequency={0}
          warpAmount={0.1}
          fadeEffect="breathing"
        />
      </div>
      <main className="container-responsive">
        {/* Hero Section */}
        <div className="hero min-h-screen flex items-center pt-20 pb-10" id="home">
          <div className="grid lg:grid-cols-2 items-center gap-12 w-full">
            {/* Content */}
            <div className="animate__animated animate__fadeInUp animate__delay-3s order-2 lg:order-1">
              <div className="flex items-center gap-3 mb-6 bg-gradient-to-r from-zinc-800 to-zinc-700 w-fit p-3 sm:p-4 rounded-2xl border border-zinc-600/50 shadow-lg hover:shadow-violet-500/20 transition-all duration-300">
                <img src="/assets/bintang1.jpeg" className="w-8 sm:w-10 rounded-md" alt="Profile" />
                <q className="text-white font-semibold text-sm sm:text-base">
                  <RotatingText 
                    texts={t('hero.rotatingQuotes')} 
                    interval={3000}
                    className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 font-bold"
                  />
                </q>
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 text-white leading-tight">
                <ShinyText text={t('hero.greeting')} disabled={false} speed={3} className='custom-class' />
              </h1>
              
              <div className="mb-8">
                <BlurText
                  text={t('hero.description')}
                  delay={150}
                  animateBy="words"
                  direction="top"
                  className="text-gray-300 text-base sm:text-lg leading-relaxed"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <a 
                  href="/assets/CV.pdf" 
                  download="Tri_Bintang_Saputra_CV.pdf" 
                  className="w-full sm:w-auto font-semibold bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 p-3 sm:p-4 px-6 sm:px-8 rounded-full border border-violet-500/30 hover:border-violet-400/50 transition-all duration-300 hover:scale-105 text-center"
                >
                  <ShinyText text={t('hero.downloadCV')} disabled={false} speed={3} className="custom-class" />
                </a>
                <a 
                  href="#project" 
                  className="w-full sm:w-auto font-semibold bg-zinc-800/50 hover:bg-zinc-700/50 p-3 sm:p-4 px-6 sm:px-8 rounded-full border border-zinc-600/50 hover:border-zinc-500/50 transition-all duration-300 hover:scale-105 text-center"
                >
                  <ShinyText text={t('hero.exploreProjects')} disabled={false} speed={3} className="custom-class" />
                </a>
              </div>
            </div>

            {/* Profile Card */}
            <div className="flex justify-center lg:justify-end animate__animated animate__fadeInUp animate__delay-4s order-1 lg:order-2">
              <div className="w-full max-w-sm lg:max-w-md">
                <ProfileCard
                  name="Tri Bintang Saputra"
                  title="Web Developer"
                  handle="Bintang"
                  status="Online"
                  contactText="Contact Me"
                  avatarUrl="/assets/bintang.jpeg"
                  showUserInfo={true}
                  enableTilt={true}
                  enableMobileTilt={false}
                  onContactClick={() => console.log('Contact clicked')}
                />
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div ref={aboutRef} className={`mt-20 sm:mt-32 mx-auto w-full max-w-7xl rounded-2xl sm:rounded-3xl border-4 sm:border-[5px] border-violet-500/40 shadow-[0_0_30px_rgba(168,85,247,0.4)] bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1a1a1a] p-4 sm:p-6 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`} id="about">
          <div className="flex flex-col xl:flex-row items-center justify-between gap-8 lg:gap-10 pt-0 px-4 sm:px-8" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true">
            {/* Content */}
            <div className="basis-full xl:basis-7/12 pr-0 xl:pr-8 border-b xl:border-b-0 xl:border-r border-violet-500/30 pb-8 xl:pb-0">
              <div className="flex-1 text-center xl:text-left">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-5">
                  {t('about.title')}
                </h2>
                <div className="mb-8 sm:mb-10">
                  <BlurText
                    text={t('about.description')}
                    delay={150}
                    animateBy="words"
                    direction="top"
                    className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-300"
                  />
                </div>
                
                {/* Statistics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
                  <div className="text-center">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl mb-1 text-white font-bold">
                      5<span className="text-violet-500">+</span>
                    </h1>
                    <p className="text-gray-300 text-sm sm:text-base">{t('about.projectsFinished')}</p>
                  </div>
                  <div className="text-center">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl mb-1 text-white font-bold">
                      2<span className="text-violet-500">+</span>
                    </h1>
                    <p className="text-gray-300 text-sm sm:text-base">{t('about.yearsExperience')}</p>
                  </div>
                  <div className="text-center" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="600" data-aos-once="true">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl mb-1 text-white font-bold">
                      3.60<span className="text-violet-500">/4.00</span>
                    </h1>
                    <p className="text-gray-300 text-sm sm:text-base">{t('about.gpa')}</p>
                  </div>
                </div>
                
                <div className="text-center xl:text-left">
                  <ShinyText
                    text={t('about.motto')}
                    disabled={false}
                    speed={3}
                    className="text-sm sm:text-base lg:text-lg text-violet-400 font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Lanyard */}
            <div className="basis-full xl:basis-5/12 pl-0 xl:pl-8 overflow-hidden max-w-full flex justify-center items-center">
              <div className="w-full max-w-lg" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="400" data-aos-once="true">
                <Lanyard position={[0, 0, 15]} gravity={[0, -40, 0]} />
              </div>
            </div>
          </div>
        </div>

        {/* Tools Section */}
        <div className="tools mt-20 sm:mt-32">
          <div className="text-center mb-12 sm:mb-16" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true">
            <div className="inline-flex items-center gap-3 bg-orange-500/10 border border-orange-500/30 rounded-full px-6 py-3 mb-6">
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
              <span className="text-orange-300 font-medium">Tech Stack</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white">
              {t('tools.title')}
            </h1>
            <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300" data-aos-once="true">
              {t('tools.subtitle')}
            </p>
          </div>
          
          <div className="tools-box grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {listTools.map((tool) => (
              <div
                key={tool.id} 
                data-aos="fade-up" 
                data-aos-duration="1000" 
                data-aos-delay={tool.dad} 
                data-aos-once="true"
                className="flex items-center gap-4 p-4 sm:p-6 border border-zinc-700 rounded-xl bg-zinc-900/60 backdrop-blur-md hover:bg-zinc-800/80 transition-all duration-300 group shadow-lg hover:shadow-xl hover:scale-105 hover:border-violet-500/50"
              >
                <div className="flex-shrink-0">
                  <img
                    src={tool.gambar}
                    alt={`${tool.nama} Icon`}
                    className="w-12 h-12 sm:w-16 sm:h-16 object-contain bg-zinc-800 p-2 sm:p-3 rounded-lg group-hover:bg-zinc-900 transition-all duration-300"
                  />
                </div>
                <div className="flex flex-col overflow-hidden min-w-0">
                  <div className="truncate">
                    <ShinyText
                      text={tool.nama}
                      disabled={false}
                      speed={3}
                      className="text-base sm:text-lg font-semibold block text-white"
                    />
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-400 truncate">{tool.ket}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Section */}
        <div className="experience mt-20 sm:mt-32" id="experience">
          <div className="text-center mb-12 sm:mb-16" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true">
            <div className="inline-flex items-center gap-3 bg-blue-500/10 border border-blue-500/30 rounded-full px-6 py-3 mb-6">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span className="text-blue-300 font-medium">Career Journey</span>
            </div>  
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white">
              {t('experience.title')}
            </h1>
            <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
              {t('experience.subtitle')}
            </p>
          </div>
          
          <ExperienceTimeline experiences={listPengalaman} />
        </div>

        {/* Certificates Section */}
        <div className="mt-20 sm:mt-32" id="certificates">
          <div className="text-center mb-12 sm:mb-16" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true">
            <div className="inline-flex items-center gap-3 bg-green-500/10 border border-green-500/30 rounded-full px-6 py-3 mb-6">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-300 font-medium">Achievements</span>
            </div>
          </div>
          <CertificateSection 
            certificates={listSertifikat}
            title={t('certificates.title')}
            subtitle={t('certificates.subtitle')}
          />
        </div>

        {/* Enhanced Projects Section */}
        <div className="proyek mt-20 sm:mt-32 py-10 sm:py-20" id="project">
          <div className="text-center mb-12 sm:mb-16" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true">
            <div className="inline-flex items-center gap-3 bg-purple-500/10 border border-purple-500/30 rounded-full px-6 py-3 mb-6">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
              <span className="text-purple-300 font-medium">Portfolio</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white">
              {t('projects.title')}
            </h1>
            <p className="text-base sm:text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed px-4">
              {t('projects.subtitle')}
            </p>
          </div>

          {/* Project Filter */}
          <div className="mb-8" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200" data-aos-once="true">
            <ProjectFilter
              projects={listProyek}
              onFilteredProjects={handleFilteredProjects}
              className="max-w-4xl mx-auto px-4"
            />
          </div>
          
          <div className="relative">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-violet-500/5 to-blue-500/5 rounded-2xl sm:rounded-3xl" />
            
            <div className="relative px-4" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400" data-aos-once="true">
              <ChromaGrid
                items={filteredProjects}
                onItemClick={handleProjectClick}
                radius={500}
                damping={0.45}
                fadeOut={0.6}
                ease="power3.out"
              />
            </div>
          </div>
        </div>

        {/* Enhanced Contact Section */}
        <div className="kontak mt-20 sm:mt-32 py-10 sm:py-20" id="contact">
          <div className="text-center mb-12 sm:mb-16" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true">
            <div className="inline-flex items-center gap-3 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-6 py-3 mb-6">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              <span className="text-cyan-300 font-medium">Get In Touch</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white">
              {t('contact.title')}
            </h1>
            <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
              {t('contact.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Chat Section */}
            <div 
              className="relative group"
              data-aos="fade-right" 
              data-aos-duration="800" 
              data-aos-delay="200" 
              data-aos-once="true"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-blue-500/20 rounded-2xl sm:rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-zinc-900/60 backdrop-blur-md border border-zinc-700/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 group-hover:border-violet-500/50 transition-all duration-500">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-green-300 font-medium">Live Chat</span>
                </div>
                <ChatRoom />
              </div>
            </div>

            {/* Contact Form */}
            <div
              data-aos="fade-left" 
              data-aos-duration="800" 
              data-aos-delay="400" 
              data-aos-once="true"
            >
              <ContactForm t={t} />
            </div>
          </div>
        </div>
      </main>

      <ProjectModal
        isOpen={!!selectedProject}
        onClose={handleCloseModal}
        project={selectedProject}
      />
      
      {/* Toast Container */}
      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
      
      {/* Development Status - hanya tampil di development */}
      {import.meta.env.DEV && <SupabaseStatus />}
    </>
  )
}

export default App