import { useState, useEffect } from "react";
import { supabase, isSupabaseConfigured, loginWithGoogle, loginWithMagicLink, loginWithEmail, signUpWithEmail, logout, insertMessage, getMessages, subscribeToMessages } from "../supabase";
import ChatFallback from "./ChatFallback";
import AuthConfirmation from "./AuthConfirmation";
import AuthStatus from "./AuthStatus";
import AppLogo from "./AppLogo";
import AppInfo from "./AppInfo";
import UserAvatar from "./UserAvatar";
import AvatarDebug from "./AvatarDebug";
import { getAvatarUrl, getDisplayName, createMessageData } from "../utils/avatarUtils";
import './animations.css';

export default function ChatRoom() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);
  const [showFallback, setShowFallback] = useState(false);
  const [loginMode, setLoginMode] = useState('magic'); // 'google', 'email', 'magic'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationType, setConfirmationType] = useState('signup');
  const [authStatus, setAuthStatus] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Cek login status
  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }
    
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Load messages
  useEffect(() => {
    if (!isSupabaseConfigured) return;
    loadMessages();
  }, []);

  // Subscribe to real-time messages
  useEffect(() => {
    if (!isSupabaseConfigured) return;
    
    const subscription = subscribeToMessages((payload) => {
      if (payload.eventType === 'INSERT') {
        setMessages(prev => [...prev, payload.new]);
      }
    });

    return () => {
      if (supabase && subscription.unsubscribe) {
        supabase.removeChannel(subscription);
      }
    };
  }, []);

  const loadMessages = async () => {
    const { data, error } = await getMessages();
    if (error) {
      console.error('Error loading messages:', error);
    } else {
      setMessages(data || []);
    }
  };

  // Handle Google login
  const handleGoogleLogin = async () => {
    setAuthError(null);
    setIsProcessing(true);
    setAuthStatus({
      type: 'loading',
      title: 'Menghubungkan dengan Google...',
      message: 'Mohon tunggu, sedang memproses login dengan Google OAuth.'
    });

    const { error } = await loginWithGoogle();
    setIsProcessing(false);
    
    if (error) {
      if (error.message?.includes('provider is not enabled') || 
          error.message?.includes('Unsupported provider') ||
          error.message?.includes('deleted_client') ||
          error.status === 401) {
        setAuthStatus({
          type: 'error',
          title: 'Google OAuth Tidak Tersedia',
          message: 'Google OAuth client perlu dikonfigurasi ulang di Supabase.',
          details: [
            'Buka Supabase Dashboard → Authentication → Providers',
            'Konfigurasi ulang Google OAuth dengan Client ID & Secret baru',
            'Lihat file OAUTH_SETUP_GUIDE.md untuk panduan lengkap'
          ],
          actionText: 'Gunakan Mode Demo',
          onAction: () => setShowFallback(true)
        });
        setLoginMode('magic'); // Switch to magic link as it's more reliable
      } else {
        setAuthStatus({
          type: 'error',
          title: 'Error Google OAuth',
          message: error.message || 'Terjadi kesalahan saat login dengan Google.',
          actionText: 'Coba Lagi',
          onAction: () => setAuthStatus(null)
        });
      }
    } else {
      setAuthStatus({
        type: 'success',
        title: 'Login Berhasil!',
        message: 'Anda berhasil login dengan Google.',
        autoClose: true
      });
    }
  };

  // Handle Magic Link login
  const handleMagicLinkLogin = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setAuthError(null);
    setIsProcessing(true);
    setAuthStatus({
      type: 'loading',
      title: 'Mengirim Magic Link...',
      message: `Sedang mengirim link login ke ${email}`
    });

    const { error } = await loginWithMagicLink(email);
    setIsProcessing(false);
    
    if (error) {
      setAuthStatus({
        type: 'error',
        title: 'Gagal Mengirim Magic Link',
        message: 'Periksa email Anda dan coba lagi.',
        details: [
          'Pastikan email yang dimasukkan benar',
          'Periksa koneksi internet Anda',
          'Coba gunakan metode login lain'
        ],
        actionText: 'Coba Lagi',
        onAction: () => setAuthStatus(null)
      });
    } else {
      setAuthStatus(null);
      setShowConfirmation(true);
      setConfirmationType('magic-link');
    }
  };

  // Handle Email/Password login
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setAuthError(null);
    setIsProcessing(true);
    
    if (isSignUp) {
      if (!displayName) {
        setAuthStatus({
          type: 'warning',
          title: 'Data Tidak Lengkap',
          message: 'Nama lengkap diperlukan untuk registrasi.',
          actionText: 'OK',
          onAction: () => setAuthStatus(null)
        });
        setIsProcessing(false);
        return;
      }
      
      setAuthStatus({
        type: 'loading',
        title: 'Membuat Akun...',
        message: 'Sedang memproses registrasi akun baru Anda.'
      });

      const { error } = await signUpWithEmail(email, password, displayName);
      setIsProcessing(false);
      
      if (error) {
        setAuthStatus({
          type: 'error',
          title: 'Gagal Membuat Akun',
          message: error.message || 'Gagal membuat akun.',
          details: [
            'Pastikan email belum terdaftar sebelumnya',
            'Password minimal 6 karakter',
            'Periksa koneksi internet Anda'
          ],
          actionText: 'Coba Lagi',
          onAction: () => setAuthStatus(null)
        });
      } else {
        setAuthStatus(null);
        setShowConfirmation(true);
        setConfirmationType('signup');
      }
    } else {
      setAuthStatus({
        type: 'loading',
        title: 'Masuk ke Akun...',
        message: 'Sedang memverifikasi kredensial login Anda.'
      });

      const { error } = await loginWithEmail(email, password);
      setIsProcessing(false);
      
      if (error) {
        setAuthStatus({
          type: 'error',
          title: 'Login Gagal',
          message: error.message || 'Email atau password salah.',
          details: [
            'Periksa kembali email dan password Anda',
            'Pastikan akun sudah diverifikasi',
            'Gunakan fitur reset password jika lupa'
          ],
          actionText: 'Coba Lagi',
          onAction: () => setAuthStatus(null)
        });
      } else {
        setAuthStatus({
          type: 'success',
          title: 'Login Berhasil!',
          message: 'Selamat datang kembali!',
          autoClose: true
        });
      }
    }
  };

  // Handle logout
  const handleLogout = async () => {
    const { error } = await logout();
    if (error) {
      console.error('Error logging out:', error);
    }
  };

  // Send message
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() || !user) return;

    const messageData = createMessageData(user, message);

    const { data, error } = await insertMessage(messageData);
    
    if (error) {
      console.error('Error sending message:', error);
      alert(`Error: ${error.message || 'Failed to send message'}`);
    } else {
      setMessage("");
    }
  };

  if (loading) {
    return (
      <div className="bg-zinc-900 border border-gray-700 p-6 rounded-xl shadow-lg max-w-xl mx-auto mt-5">
        <div className="flex justify-center items-center h-32">
          <div className="text-white">Loading...</div>
        </div>
      </div>
    );
  }

  if (!isSupabaseConfigured) {
    return <ChatFallback />;
  }

  // Show fallback if requested or if there are persistent auth errors
  if (showFallback || (authError && !isSupabaseConfigured)) {
    return <ChatFallback />;
  }

  return (
    <>
      {/* Auth Confirmation Modal */}
      {showConfirmation && (
        <AuthConfirmation
          type={confirmationType}
          email={email}
          onResend={confirmationType === 'magic-link' ? () => handleMagicLinkLogin({ preventDefault: () => {} }) : null}
          onClose={() => setShowConfirmation(false)}
          isVisible={showConfirmation}
        />
      )}

      <div className="bg-zinc-900 border border-gray-700 p-6 rounded-xl shadow-lg max-w-xl mx-auto mt-5">
        {/* Header dengan Logo */}
        <div className="text-center mb-6 border-b border-gray-700 pb-4">
          <AppLogo size="md" variant="minimal" className="justify-center mb-2" />
          <p className="text-gray-400 text-sm">Bergabunglah dalam percakapan real-time</p>
        </div>

        {/* Header user */}
        {user && (
          <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-3">
            <div className="flex items-center gap-3">
              <UserAvatar 
                src={getAvatarUrl(user)}
                alt="User Avatar"
                size="md"
                fallbackName={getDisplayName(user)}
              />
              <div>
                <span className="text-white font-semibold block">
                  {getDisplayName(user)}
                </span>
                <span className="text-gray-400 text-xs">
                  {user.email}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={loadMessages}
                className="bg-blue-600 px-3 py-1 rounded-full text-white hover:bg-blue-700 text-sm"
              >
                Refresh
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 px-4 py-1 rounded-full text-white hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        )}

        {/* Area pesan */}
        <div className="h-72 overflow-y-auto border border-gray-700 p-3 rounded-lg bg-zinc-800 mb-4 space-y-3">
          {/* Debug info */}
          {messages.length === 0 && (
            <div className="text-center text-gray-400 py-8">
              <p>No messages yet. Be the first to say hello!</p>
              <p className="text-xs mt-2">Messages count: {messages.length}</p>
            </div>
          )}
          
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2 ${msg.user_id === user?.id ? "justify-end" : "justify-start"} message-bubble`}
            >
              {msg.user_id !== user?.id && (
                <UserAvatar 
                  src={msg.photo_url}
                  alt={`${msg.display_name} avatar`}
                  size="sm"
                  fallbackName={msg.display_name}
                />
              )}
              <div
                className={`p-3 rounded-lg max-w-[75%] ${
                  msg.user_id === user?.id
                    ? "bg-blue-500 text-white"
                    : "bg-gray-700 text-white"
                }`}
              >
                <div className="text-xs opacity-70 mb-1">{msg.display_name}</div>
                <div>{msg.text}</div>
                <div className="text-xs opacity-50 mt-1">
                  {new Date(msg.created_at).toLocaleTimeString()}
                </div>
              </div>
              {msg.user_id === user?.id && (
                <UserAvatar 
                  src={msg.photo_url}
                  alt={`${msg.display_name} avatar`}
                  size="sm"
                  fallbackName={msg.display_name}
                />
              )}
            </div>
          ))}
        </div>

        {/* Form login / kirim pesan */}
        {user ? (
          <form onSubmit={sendMessage} className="flex gap-2 flex-wrap sm:flex-nowrap w-full">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ketik pesan..."
              className="flex-1 min-w-0 p-2 rounded-lg bg-zinc-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-green-600 px-4 py-2 rounded-lg text-white hover:bg-green-700 w-full sm:w-auto"
            >
              Send
            </button>
          </form>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4">
            {/* Auth Status */}
            {authStatus && (
              <div className="w-full mb-4">
                <AuthStatus
                  type={authStatus.type}
                  title={authStatus.title}
                  message={authStatus.message}
                  details={authStatus.details}
                  onAction={authStatus.onAction}
                  actionText={authStatus.actionText}
                  onClose={() => setAuthStatus(null)}
                  autoClose={authStatus.autoClose}
                />
              </div>
            )}

            {/* Legacy error display for backward compatibility */}
            {authError && !authStatus && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-4 w-full">
                <div className="flex items-center gap-2">
                  <span className="text-red-300 text-sm font-medium">OAuth Error</span>
                </div>
                <p className="text-red-200 text-sm mt-1">{authError}</p>
                {authError.includes('deleted_client') || authError.includes('Google OAuth client') ? (
                  <div className="mt-3 p-2 bg-yellow-500/10 border border-yellow-500/30 rounded text-xs">
                    <p className="text-yellow-200 font-medium mb-1">Solusi:</p>
                    <p className="text-yellow-100">
                      1. Buka Supabase Dashboard → Authentication → Providers<br/>
                      2. Konfigurasi ulang Google OAuth dengan Client ID & Secret baru<br/>
                      3. Lihat file <code className="bg-zinc-700 px-1 rounded">OAUTH_SETUP_GUIDE.md</code> untuk panduan lengkap
                    </p>
                  </div>
                ) : null}
                <button
                  onClick={() => setShowFallback(true)}
                  className="mt-2 text-xs bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded transition-colors"
                >
                  Gunakan Mode Demo
                </button>
              </div>
            )}

            {/* Login Method Tabs */}
            <div className="flex bg-zinc-800 rounded-lg p-1 mb-4">
              <button
                onClick={() => setLoginMode('magic')}
                className={`px-3 py-1 rounded text-sm transition ${
                  loginMode === 'magic' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Magic Link
              </button>
              <button
                onClick={() => setLoginMode('email')}
                className={`px-3 py-1 rounded text-sm transition ${
                  loginMode === 'email' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Email
              </button>
              <button
                onClick={() => setLoginMode('google')}
                className={`px-3 py-1 rounded text-sm transition ${
                  loginMode === 'google' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Google
              </button>
            </div>

            {/* Magic Link Login */}
            {loginMode === 'magic' && (
              <form onSubmit={handleMagicLinkLogin} className="w-full space-y-3">
                <input
                  type="email"
                  placeholder="Masukkan email Anda"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-600 rounded-lg px-3 py-2 text-white placeholder-zinc-400 focus:border-blue-500 focus:outline-none text-sm"
                  required
                  disabled={isProcessing}
                />
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 disabled:cursor-not-allowed text-white py-2 rounded-lg transition text-sm font-medium"
                >
                  {isProcessing ? 'Mengirim...' : 'Kirim Magic Link'}
                </button>
                <p className="text-xs text-gray-400 text-center">
                  Kami akan mengirim link login ke email Anda
                </p>
              </form>
            )}

            {/* Google Login */}
            {loginMode === 'google' && (
              <div className="w-full space-y-3">
                <button
                  onClick={handleGoogleLogin}
                  disabled={isProcessing}
                  className="flex items-center justify-center gap-3 w-full bg-white text-gray-800 px-5 py-3 rounded-lg shadow hover:bg-gray-200 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
                >
                  {isProcessing ? 'Menghubungkan...' : 'Login with Google'}
                </button>
                <p className="text-xs text-gray-400 text-center">
                  Cepat dan mudah dengan akun Google Anda
                </p>
                <p className="text-xs text-yellow-400 text-center">
                  Saat ini Google OAuth sedang bermasalah. Gunakan Magic Link atau Email.
                </p>
              </div>
            )}

            {/* Email/Password Login */}
            {loginMode === 'email' && (
              <form onSubmit={handleEmailLogin} className="w-full space-y-3">
                {isSignUp && (
                  <input
                    type="text"
                    placeholder="Nama Lengkap"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-600 rounded-lg px-3 py-2 text-white placeholder-zinc-400 focus:border-blue-500 focus:outline-none text-sm"
                    required
                    disabled={isProcessing}
                  />
                )}
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-600 rounded-lg px-3 py-2 text-white placeholder-zinc-400 focus:border-blue-500 focus:outline-none text-sm"
                  required
                  disabled={isProcessing}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-600 rounded-lg px-3 py-2 text-white placeholder-zinc-400 focus:border-blue-500 focus:outline-none text-sm"
                  required
                  disabled={isProcessing}
                />
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white py-2 rounded-lg transition text-sm font-medium"
                >
                  {isProcessing ? (isSignUp ? 'Mendaftar...' : 'Masuk...') : (isSignUp ? 'Daftar' : 'Login')}
                </button>
                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  disabled={isProcessing}
                  className="w-full text-blue-400 hover:text-blue-300 disabled:text-blue-600 text-xs"
                >
                  {isSignUp ? 'Sudah punya akun? Login' : 'Belum punya akun? Daftar'}
                </button>
              </form>
            )}

            <p className="text-sm text-gray-400 text-center">
              Login untuk mengirim pesan di chat room
            </p>

            {/* App Info */}
            <div className="mt-6 w-full">
              <AppInfo variant="minimal" />
            </div>

            {/* Avatar Debug - Only show in development */}
            {import.meta.env.DEV && user && (
              <AvatarDebug user={user} />
            )}
          </div>
        )}
      </div>
    </>
  );
}