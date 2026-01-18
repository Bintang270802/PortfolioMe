import { FiShield, FiMail, FiClock, FiEye, FiAlertTriangle } from 'react-icons/fi';

export default function SecurityTips({ type = 'general' }) {
  const getTips = () => {
    switch (type) {
      case 'email-verification':
        return {
          title: 'Tips Verifikasi Email',
          icon: <FiMail className="w-5 h-5 text-blue-400" />,
          tips: [
            'Periksa folder spam/junk jika email tidak ditemukan',
            'Link verifikasi berlaku selama 24 jam',
            'Pastikan email yang dimasukkan sudah benar',
            'Jangan bagikan link verifikasi kepada orang lain'
          ]
        };
      case 'magic-link':
        return {
          title: 'Tips Magic Link',
          icon: <FiShield className="w-5 h-5 text-purple-400" />,
          tips: [
            'Magic link hanya berlaku untuk satu kali penggunaan',
            'Link akan kedaluwarsa dalam 1 jam',
            'Pastikan membuka link di browser yang sama',
            'Jangan bagikan magic link kepada siapa pun'
          ]
        };
      case 'password-security':
        return {
          title: 'Tips Keamanan Password',
          icon: <FiEye className="w-5 h-5 text-green-400" />,
          tips: [
            'Gunakan password minimal 8 karakter',
            'Kombinasikan huruf besar, kecil, angka, dan simbol',
            'Jangan gunakan informasi pribadi dalam password',
            'Aktifkan two-factor authentication jika tersedia'
          ]
        };
      default:
        return {
          title: 'Tips Keamanan',
          icon: <FiShield className="w-5 h-5 text-green-400" />,
          tips: [
            'Selalu logout setelah selesai menggunakan aplikasi',
            'Jangan bagikan informasi login kepada orang lain',
            'Periksa URL untuk memastikan keamanan situs',
            'Laporkan aktivitas mencurigakan kepada admin'
          ]
        };
    }
  };

  const { title, icon, tips } = getTips();

  return (
    <div className="bg-gradient-to-r from-slate-800/50 to-zinc-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-4">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
          {icon}
        </div>
        <h4 className="font-semibold text-white text-sm">{title}</h4>
      </div>
      
      <ul className="space-y-2">
        {tips.map((tip, index) => (
          <li key={index} className="flex items-start gap-3 text-xs text-gray-300">
            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
            <span className="leading-relaxed">{tip}</span>
          </li>
        ))}
      </ul>
      
      <div className="mt-3 pt-3 border-t border-white/10">
        <div className="flex items-center gap-2 text-xs text-yellow-300">
          <FiAlertTriangle className="w-3 h-3" />
          <span className="font-medium">Jaga kerahasiaan informasi login Anda</span>
        </div>
      </div>
    </div>
  );
}