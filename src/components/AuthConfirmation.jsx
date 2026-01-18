import { useState, useEffect } from 'react';
import { FiMail, FiCheckCircle, FiClock, FiRefreshCw, FiShield } from 'react-icons/fi';
import AppLogo from './AppLogo';
import SecurityTips from './SecurityTips';

export default function AuthConfirmation({ 
  type = 'signup', // 'signup', 'magic-link', 'email-verification'
  email = '',
  onResend = null,
  onClose = null,
  isVisible = true 
}) {
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (countdown > 0 && type === 'magic-link') {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setCanResend(true);
    }
  }, [countdown, type]);

  const getConfirmationContent = () => {
    switch (type) {
      case 'signup':
        return {
          icon: <FiMail className="w-16 h-16 text-blue-400" />,
          title: 'Konfirmasi Pendaftaran Anda',
          subtitle: 'Verifikasi email diperlukan untuk melanjutkan',
          message: `Kami telah mengirimkan email konfirmasi ke alamat email Anda. Silakan periksa inbox dan klik link verifikasi untuk mengaktifkan akun Anda.`,
          actionText: 'Periksa Email Anda',
          bgGradient: 'from-blue-500/10 to-purple-500/10',
          borderColor: 'border-blue-500/30'
        };
      case 'magic-link':
        return {
          icon: <FiShield className="w-16 h-16 text-green-400" />,
          title: 'Magic Link Terkirim',
          subtitle: 'Link login aman telah dikirim',
          message: `Magic link telah dikirim ke ${email}. Klik link tersebut untuk login secara otomatis tanpa password.`,
          actionText: 'Buka Email Anda',
          bgGradient: 'from-green-500/10 to-emerald-500/10',
          borderColor: 'border-green-500/30'
        };
      case 'email-verification':
        return {
          icon: <FiCheckCircle className="w-16 h-16 text-emerald-400" />,
          title: 'Verifikasi Email Berhasil',
          subtitle: 'Akun Anda telah diaktifkan',
          message: 'Selamat! Email Anda telah berhasil diverifikasi. Anda sekarang dapat menggunakan semua fitur aplikasi.',
          actionText: 'Mulai Menggunakan',
          bgGradient: 'from-emerald-500/10 to-green-500/10',
          borderColor: 'border-emerald-500/30'
        };
      default:
        return {
          icon: <FiMail className="w-16 h-16 text-blue-400" />,
          title: 'Konfirmasi Email',
          subtitle: 'Periksa email Anda',
          message: 'Silakan periksa email Anda untuk instruksi selanjutnya.',
          actionText: 'Periksa Email',
          bgGradient: 'from-blue-500/10 to-purple-500/10',
          borderColor: 'border-blue-500/30'
        };
    }
  };

  const content = getConfirmationContent();

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in-scale">
      <div className={`bg-gradient-to-br ${content.bgGradient} backdrop-blur-md border ${content.borderColor} rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-slide-in-up`}>
        {/* Header dengan logo/icon */}
        <div className="relative p-6 text-center">
          {/* Background pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
          
          {/* App Logo */}
          <div className="relative mb-6 flex justify-center">
            <AppLogo size="lg" variant="icon-only" animated={true} className="logo-float" />
          </div>

          {/* Status Icon */}
          <div className="relative mb-4 flex justify-center">
            <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm">
              {content.icon}
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-white mb-2">
            {content.title}
          </h2>
          
          {/* Subtitle */}
          <p className="text-gray-300 text-sm font-medium">
            {content.subtitle}
          </p>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          {/* Message */}
          <div className="bg-black/20 rounded-xl p-4 mb-6 border border-white/10">
            <p className="text-gray-200 text-sm leading-relaxed">
              {content.message}
            </p>
            
            {email && (
              <div className="mt-3 flex items-center gap-2 text-xs">
                <FiMail className="w-4 h-4 text-blue-400" />
                <span className="text-blue-300 font-mono">{email}</span>
              </div>
            )}
          </div>

          {/* Countdown untuk magic link */}
          {type === 'magic-link' && (
            <div className="mb-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <div className="flex items-center gap-2 text-yellow-300 text-sm">
                <FiClock className="w-4 h-4" />
                <span>
                  {canResend 
                    ? 'Anda dapat mengirim ulang magic link sekarang' 
                    : `Kirim ulang tersedia dalam ${countdown} detik`
                  }
                </span>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-col gap-3">
            {/* Primary action */}
            <button
              onClick={() => window.open('mailto:', '_blank')}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center gap-2 btn-hover-scale"
            >
              <FiMail className="w-5 h-5" />
              {content.actionText}
            </button>

            {/* Resend button untuk magic link */}
            {type === 'magic-link' && onResend && (
              <button
                onClick={onResend}
                disabled={!canResend}
                className={`w-full font-medium py-2 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 ${
                  canResend
                    ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                    : 'bg-gray-600/20 text-gray-400 cursor-not-allowed border border-gray-600/20'
                }`}
              >
                <FiRefreshCw className={`w-4 h-4 ${!canResend ? 'animate-spin' : ''}`} />
                Kirim Ulang Magic Link
              </button>
            )}

            {/* Close button */}
            {onClose && (
              <button
                onClick={onClose}
                className="w-full text-gray-400 hover:text-white font-medium py-2 px-4 rounded-xl transition-colors duration-200 border border-gray-600/30 hover:border-gray-500/50"
              >
                Tutup
              </button>
            )}
          </div>

          {/* Footer info */}
          <div className="mt-6">
            <SecurityTips type={type === 'magic-link' ? 'magic-link' : 'email-verification'} />
          </div>
        </div>
      </div>
    </div>
  );
}