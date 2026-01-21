

export default function AppInfo({ variant = 'full' }) {
  const features = [
    {
      title: 'Real-time Chat',
      description: 'Pesan terkirim dan diterima secara langsung'
    },
    {
      title: 'Keamanan Terjamin',
      description: 'Autentikasi aman dengan Supabase'
    },
    {
      title: 'Multi-user',
      description: 'Bergabung dengan pengguna lain'
    },
    {
      title: 'Performa Tinggi',
      description: 'Dibangun dengan teknologi modern'
    }
  ];

  if (variant === 'minimal') {
    return (
      <div className="text-center py-4">
        <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mb-2">
          <span>Powered by Supabase & React</span>
        </div>
        <p className="text-xs text-gray-500">
          Dibuat dengan untuk pengalaman chat terbaik
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
            <div>
              <h4 className="font-semibold text-white text-sm mb-1">{feature.title}</h4>
              <p className="text-xs text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center pt-4 border-t border-white/10">
        <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mb-2">
          <span>Powered by Supabase & React</span>
        </div>
        <p className="text-xs text-gray-500">
          Dibuat dengan untuk pengalaman chat terbaik
        </p>
      </div>
    </div>
  );
}