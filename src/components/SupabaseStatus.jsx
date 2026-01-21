import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../supabase';

export default function SupabaseStatus() {
  const [status, setStatus] = useState('checking');
  const [error, setError] = useState(null);

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    try {
      if (!isSupabaseConfigured) {
        setStatus('not-configured');
        setError('Supabase belum dikonfigurasi. Update file .env.local');
        return;
      }

      const { error } = await supabase
        .from('messages')
        .select('count', { count: 'exact', head: true });
      
      if (error) {
        setStatus('error');
        setError(error.message);
      } else {
        setStatus('connected');
        setError(null);
      }
    } catch (err) {
      setStatus('error');
      setError(err.message);
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'connected': return 'text-green-400';
      case 'error': return 'text-red-400';
      case 'not-configured': return 'text-yellow-400';
      default: return 'text-yellow-400';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'connected': return 'Supabase Connected';
      case 'error': return 'Supabase Error';
      case 'not-configured': return 'Setup Required';
      default: return 'Checking Connection...';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-zinc-800 border border-gray-700 rounded-lg p-3 text-sm">
      <div className={`font-semibold ${getStatusColor()}`}>
        {getStatusText()}
      </div>
      {error && (
        <div className="text-red-300 text-xs mt-1 max-w-xs">
          {error}
        </div>
      )}
      <button 
        onClick={checkConnection}
        className="text-blue-400 hover:text-blue-300 text-xs mt-1 underline"
      >
        Refresh
      </button>
    </div>
  );
}