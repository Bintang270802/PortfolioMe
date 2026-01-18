import { useLanguage } from '../hooks/useLanguage';

const LanguageToggle = () => {
  const { language, changeLanguage } = useLanguage();

  return (
    <div className="flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-lg overflow-hidden">
      <button
        onClick={() => changeLanguage('id')}
        className={`px-3 py-2 text-sm font-medium transition-all duration-300 ${
          language === 'id'
            ? 'bg-white/20 text-white'
            : 'text-white/70 hover:text-white hover:bg-white/10'
        }`}
      >
        ID
      </button>
      <button
        onClick={() => changeLanguage('en')}
        className={`px-3 py-2 text-sm font-medium transition-all duration-300 ${
          language === 'en'
            ? 'bg-white/20 text-white'
            : 'text-white/70 hover:text-white hover:bg-white/10'
        }`}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageToggle;