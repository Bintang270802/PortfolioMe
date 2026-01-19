import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import PreLoader from './components/PreLoader.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import { LanguageProvider } from './contexts/LanguageContext.jsx'
import "animate.css"
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <LanguageProvider>
        <PreLoader/>
        <div className="container mx-auto px-6 bg-slate-900 text-white min-h-screen">
          <Navbar />
          <App />
          <Footer/>
        </div>
      </LanguageProvider>
    </ErrorBoundary>
  </StrictMode>,
)
