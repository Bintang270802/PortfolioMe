import { FiUsers, FiMessageSquare, FiShield, FiZap, FiGlobe, FiHeart } from 'react-icons/fi';

export default function AppInfo({ variant = 'full' }) {
  const features = [
    {
      icon: <FiMessageSquare className="w-5 h-5 text-blue-400" />,
      title: 'Real-time Chat',
      description: 'Pesan terkirim dan diterima secara langsung'
    },
    {
      icon: <FiShield className="w-5 h-5 text-green-400" />,
      title: 'Keamanan Terjamin',
      description: 'Autentikasi aman dengan Supabase'
    },
    {
      icon: <FiUsers className="w-5 h-5 text-purple-400" />,
      title: 'Multi-user',
      description: 'Bergabung dengan pengguna lain'
    },
    {
      icon: <FiZap className="w-5 h-5 text-yellow-400" />,
      title: 'Performa Tinggi',
      description: 'Dibangun dengan teknologi modern'
    }
  ];

  if (variant === 'minimal') {
    return (
      <div className="text-center py-4">
        <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mb-2">
          <FiGlobe className="w-4 h-4" />
          <span>Powered by Supabase & React</span>
        </div>
        <p className="text-xs text-gray-500">
          Dibuat dengan <FiHeart className="w-3 h-3 inline text-red-400" /> untuk pengalaman chat terbaik
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-800/30 to-zinc-800/30 backdrop-blur-sm border border-white/10 rounded-xl p-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-bold text-white mb-2">Mengapa Memilih ChatRoom?</h3>
        <p className="text-sm text-gray-400">
          Platform chat modern dengan fitur-fitur canggih untuk komunikasi yang lebih baik
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
            <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm flex-shrink-0">
              {feature.icon}
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm mb-1">{feature.title}</h4>
              <p className="text-xs text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center pt-4 border-t border-white/10">
        <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mb-2">
          <FiGlobe className="w-4 h-4" />
          <span>Powered by Supabase & React</span>
        </div>
        <p className="text-xs text-gray-500">
          Dibuat dengan <FiHeart className="w-3 h-3 inline text-red-400" /> untuk pengalaman chat terbaik
        </p>
      </div>
    </div>
  );
}