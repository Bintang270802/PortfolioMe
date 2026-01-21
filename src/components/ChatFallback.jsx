import { useState } from 'react';

export default function ChatFallback() {
  const [guestName, setGuestName] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      user_name: 'System',
      message: 'Selamat datang di demo chat room!',
      created_at: new Date().toISOString(),
      isSystem: true
    }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim() || !guestName.trim()) return;

    const newMessage = {
      id: Date.now(),
      user_name: guestName,
      message: message.trim(),
      created_at: new Date().toISOString(),
      isGuest: true
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-zinc-900/60 backdrop-blur-md border border-zinc-700/50 rounded-2xl p-6 h-96 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-700/50">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
          <span className="text-yellow-300 font-medium">ChatRoom (Demo Mode)</span>
        </div>
        <div className="text-xs text-zinc-400">
          {messages.length} pesan
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-2 scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-transparent">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col gap-1 ${
              msg.isSystem ? 'items-center' : 'items-start'
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-3 py-2 ${
                msg.isSystem
                  ? 'bg-blue-500/20 text-blue-200 text-sm text-center'
                  : msg.isGuest
                  ? 'bg-green-500/20 text-green-200'
                  : 'bg-zinc-700/50 text-zinc-200'
              }`}
            >
              {!msg.isSystem && (
                <div className="text-xs opacity-70 mb-1">
                  {msg.user_name}
                </div>
              )}
              <div className="text-sm">{msg.message}</div>
            </div>
            <div className="text-xs text-zinc-500 px-1">
              {formatTime(msg.created_at)}
            </div>
          </div>
        ))}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        {!guestName && (
          <input
            type="text"
            placeholder="Masukkan nama Anda..."
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            className="w-full bg-zinc-800/50 border border-zinc-600/50 rounded-lg px-3 py-2 text-white placeholder-zinc-400 focus:border-yellow-500/50 focus:outline-none focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300 text-sm"
            maxLength={20}
          />
        )}
        
        <div className="flex gap-2">
          <input
            type="text"
            placeholder={guestName ? "Ketik pesan..." : "Masukkan nama terlebih dahulu"}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={!guestName}
            className="flex-1 bg-zinc-800/50 border border-zinc-600/50 rounded-lg px-3 py-2 text-white placeholder-zinc-400 focus:border-yellow-500/50 focus:outline-none focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300 text-sm disabled:opacity-50"
            maxLength={200}
          />
          <button
            type="submit"
            disabled={!message.trim() || !guestName.trim()}
            className="bg-yellow-600 px-4 py-2 rounded-lg text-white hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-sm font-medium"
          >
            Kirim
          </button>
        </div>
      </form>

      {/* Info */}
      <div className="mt-3 pt-3 border-t border-zinc-700/50">
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <div className="w-2 h-2 bg-yellow-400 rounded-full" />
          <span>Mode demo - Supabase belum dikonfigurasi. Pesan tidak tersimpan.</span>
        </div>
      </div>
    </div>
  );
}