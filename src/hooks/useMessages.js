import { useState, useEffect } from 'react';
import { getMessages, subscribeToMessages, insertMessage } from '../supabase';

/**
 * Custom hook for managing chat messages
 * @param {Object} user - Current authenticated user
 * @returns {Object} Messages state and methods
 */
export const useMessages = (user) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setMessages([]);
      setLoading(false);
      return;
    }

    // Load initial messages
    const loadMessages = async () => {
      const { data, error } = await getMessages();
      if (!error && data) {
        setMessages(data);
      }
      setLoading(false);
    };

    loadMessages();

    // Subscribe to new messages
    const unsubscribe = subscribeToMessages((newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user]);

  const sendMessage = async (messageData) => {
    const { data, error } = await insertMessage(messageData);
    return { data, error };
  };

  return {
    messages,
    loading,
    sendMessage,
  };
};
