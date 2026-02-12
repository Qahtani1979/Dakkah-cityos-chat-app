import { useState, useCallback, useEffect, useRef } from 'react';
import type { Message, ChatThread } from '../types/copilot';
import { processUserMessage } from '../utils/copilot-brain';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';
import { useAuth } from '../context/auth-context';
import { supabase } from '../utils/supabase';

// Configuration
const USE_MOCK_DELAY = true;
const MOCK_DELAY_MS = 800;
const SERVER_URL = `https://${projectId}.supabase.co/functions/v1/make-server-e4305fae`;

export function useCopilot() {
  const { session, user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [threads, setThreads] = useState<ChatThread[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [currentThreadId, setCurrentThreadId] = useState<string | null>(null);
  const messagesRef = useRef<Message[]>([]); // Ref to keep track of latest messages

  // Sync ref
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  // Fetch list of threads
  const fetchThreads = useCallback(async () => {
    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (session?.access_token) headers['Authorization'] = `Bearer ${session.access_token}`;
      else headers['Authorization'] = `Bearer ${publicAnonKey}`;

      const response = await fetch(`${SERVER_URL}/threads`, { headers });
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched threads:", data);
        setThreads(data || []);
      } else {
        console.error("Failed to fetch threads response:", response.status);
      }
    } catch (error) {
      console.error("Failed to fetch threads:", error);
    }
  }, [session]);

  // Load a specific thread or default history
  const loadThread = useCallback(async (threadId?: string) => {
    setIsLoadingHistory(true);
    
    // If no threadId provided, just start a new chat locally without fetching
    // This avoids the legacy /chat/history endpoint which causes redirects
    if (!threadId) {
       setMessages([{
        id: '1',
        role: 'assistant',
        content: "Hi! I'm your Dakkah Copilot. I can help you discover experiences, plan trips, join events, manage your preferences, and access every Dakkah capability through conversation. What would you like to do?",
        timestamp: new Date(),
      }]);
      setCurrentThreadId(null);
      setIsLoadingHistory(false);
      return;
    }

    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (session?.access_token) headers['Authorization'] = `Bearer ${session.access_token}`;
      else headers['Authorization'] = `Bearer ${publicAnonKey}`;

      const url = `${SERVER_URL}/threads/${threadId}?t=${Date.now()}`;

      const response = await fetch(url, { headers });
      
      if (response.ok) {
        const history = await response.json();
        // console.log("Loaded history for", threadId, history); // Debug logging

        if (Array.isArray(history) && history.length > 0) {
          const parsedHistory = history.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }));
          setMessages(parsedHistory);
          setCurrentThreadId(threadId);
        } else {
           console.warn(`Thread ${threadId} returned empty or invalid history`, history);
           // Fallback if thread is empty
           setMessages([{
            id: '1',
            role: 'assistant',
            content: "Hi! I'm your Dakkah Copilot. I can help you discover experiences, plan trips, join events, manage your preferences, and access every Dakkah capability through conversation. What would you like to do?",
            timestamp: new Date(),
          }]);
          setCurrentThreadId(threadId);
        }
      } else {
        console.error(`Failed to load thread ${threadId}: ${response.status} ${response.statusText}`);
         // Fallback on non-OK response
         setMessages([{
            id: '1',
            role: 'assistant',
            content: "Hi! I'm your Dakkah Copilot. I can help you discover experiences, plan trips, join events, manage your preferences, and access every Dakkah capability through conversation. What would you like to do?",
            timestamp: new Date(),
          }]);
          setCurrentThreadId(null);
      }
    } catch (error) {
      console.error("Failed to load history:", error);
      // Fallback on error
      setMessages([{
        id: '1',
        role: 'assistant',
        content: "Hi! I'm your Dakkah Copilot. I can help you discover experiences, plan trips, join events, manage your preferences, and access every Dakkah capability through conversation. What would you like to do?",
        timestamp: new Date(),
      }]);
      setCurrentThreadId(null);
    } finally {
      setIsLoadingHistory(false);
    }
  }, [session]);

  const createNewChat = useCallback(() => {
     setMessages([{
        id: '1',
        role: 'assistant',
        content: "Hi! I'm your Dakkah Copilot. I can help you discover experiences, plan trips, join events, manage your preferences, and access every Dakkah capability through conversation. What would you like to do?",
        timestamp: new Date(),
      }]);
     setCurrentThreadId(null); 
  }, []);

  // Initial load
  useEffect(() => {
    loadThread(); 
    fetchThreads();
  }, [loadThread, fetchThreads]);

  // Save history to backend
  const saveHistory = async (newMessages: Message[], threadIdToUse: string | null) => {
    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (session?.access_token) headers['Authorization'] = `Bearer ${session.access_token}`;
      else headers['Authorization'] = `Bearer ${publicAnonKey}`;

      const id = threadIdToUse || `thread_${Date.now()}`;
      if (!threadIdToUse) setCurrentThreadId(id);

      let title = undefined;
      if (!threadIdToUse && newMessages.length > 1) {
         const firstUserMsg = newMessages.find(m => m.role === 'user');
         if (firstUserMsg) title = firstUserMsg.content.slice(0, 40);
      }

      await fetch(`${SERVER_URL}/threads/${id}`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ messages: newMessages, title })
      });
      
      // Refresh threads list if we just created a new one or updated title
      if (!threadIdToUse || title) {
        fetchThreads();
      }
    } catch (error) {
      console.error("Failed to save history:", error);
    }
  };

  const sendMessage = useCallback(async (content: string, systemAction?: any) => {
    if (!content.trim() && !systemAction) return;
    
    // Use ref to avoid stale closures in timeouts
    let currentMessages = messagesRef.current;
    let updatedMessagesWithUser = [...currentMessages];
    
    if (content.trim()) {
        const userMessage: Message = {
          id: Date.now().toString(),
          role: 'user',
          content: content.trim(),
          timestamp: new Date(),
          sender: {
              name: user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'You',
              avatar: user?.user_metadata?.avatar_url,
              isMe: true
          }
        };
        updatedMessagesWithUser = [...currentMessages, userMessage];
        setMessages(updatedMessagesWithUser);
        // We manually update ref here to ensure consistency within this function execution
        messagesRef.current = updatedMessagesWithUser; 
    }
    
    setIsProcessing(true);
    
    const activeId = currentThreadId || `thread_${Date.now()}`;
    if (!currentThreadId) setCurrentThreadId(activeId);
    saveHistory(updatedMessagesWithUser, activeId);

    try {
      if (USE_MOCK_DELAY) {
        await new Promise(resolve => setTimeout(resolve, MOCK_DELAY_MS));
      }

      // Pass systemAction to brain
      const response = processUserMessage(content.trim(), systemAction);

      // Determine role:
      // If systemAction is present, it defaults to 'system'.
      // However, if the response contains artifacts (like a card), we treat it as an 'assistant' message
      // so it renders with the full UI capabilities.
      const role = systemAction && (!response.artifacts || response.artifacts.length === 0) ? 'system' : 'assistant';

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role,
        content: response.content,
        timestamp: new Date(),
        artifacts: response.artifacts,
        mode: response.mode,
      };

      // Use the local variable which is definitely "messages before assistant response"
      const finalMessages = [...updatedMessagesWithUser, assistantMessage];
      setMessages(finalMessages);
      messagesRef.current = finalMessages;
      
      saveHistory(finalMessages, activeId);

      // --- SIMULATION TRIGGER ---
      if (response.simulatedEvent) {
          const evt = response.simulatedEvent;
          // Random delay between 3s and 6s
          const delay = 3000 + Math.random() * 3000;
          console.log(`[Copilot] Queuing simulation event: ${evt} in ${delay}ms`);
          
          setTimeout(() => {
              // Recursively call sendMessage with system action
              sendMessage("", { type: 'simulate_event', name: evt });
          }, delay);
      }

    } catch (error) {
      console.error("Failed to process message:", error);
    } finally {
      setIsProcessing(false);
    }
  }, [session, currentThreadId, fetchThreads]);

  const handleMessageAction = useCallback(async (action: string, payload: any) => {
      let newMessages = [...messages];
      
      if (action === 'react') {
          const { messageId, emoji } = payload;
          newMessages = newMessages.map(m => {
              if (m.id === messageId) {
                  const reactions = { ...m.reactions };
                  const currentUsers = reactions[emoji] || [];
                  // Toggle 'me'
                  if (currentUsers.includes('me')) {
                      reactions[emoji] = currentUsers.filter(u => u !== 'me');
                      if (reactions[emoji].length === 0) delete reactions[emoji];
                  } else {
                      reactions[emoji] = [...currentUsers, 'me'];
                  }
                  return { ...m, reactions };
              }
              return m;
          });
      } else if (action === 'pin') {
          const message = payload as Message;
          newMessages = newMessages.map(m => {
              if (m.id === message.id) {
                  return { ...m, pinned: !m.pinned };
              }
              return m;
          });
      } else if (action === 'edit') {
           const message = payload as Message; // Payload should include new content? No, wait. 
           // We need to know WHAT to edit to. 
           // For now, let's assume payload has { id, content } if it's an edit submission, 
           // or just the message if it's the trigger. 
           // Since CopilotMessage calls onAction('edit', message), this is just the trigger.
           // Real edit needs a text input. 
           // We will handle 'edit_submit' separately or here.
           // Let's assume the UI handles the input and calls this with { id, content }.
           if (payload.id && payload.content) {
               newMessages = newMessages.map(m => 
                   m.id === payload.id ? { ...m, content: payload.content, edited: true } : m
               );
           }
      } else if (action === 'delete') {
          const message = payload as Message;
          newMessages = newMessages.filter(m => m.id !== message.id);
      } else if (action === 'execute_suggestion') {
          // If suggestion, we execute it as a prompt
          const prompt = payload as string;
          sendMessage(prompt);
          return; // sendMessage handles state
      }

      setMessages(newMessages);
      if (currentThreadId) saveHistory(newMessages, currentThreadId);
  }, [messages, currentThreadId, sendMessage]);

  const activateVertical = useCallback(async (verticalId: string) => {
    setIsProcessing(true);
    try {
       const headers: Record<string, string> = { 'Content-Type': 'application/json' };
       if (session?.access_token) headers['Authorization'] = `Bearer ${session.access_token}`;
       else headers['Authorization'] = `Bearer ${publicAnonKey}`;

       const response = await fetch(`${SERVER_URL}/simulation/chat`, {
           method: 'POST',
           headers,
           body: JSON.stringify({ verticalId })
       });
       
       if (response.ok) {
           const data = await response.json();
           const assistantMessage = data.message; 
           
           // Ensure ID is unique if server sends static ID or just to be safe
           assistantMessage.id = `msg_${Date.now()}_${Math.random()}`; 
           
           const currentMessages = messagesRef.current;
           const finalMessages = [...currentMessages, assistantMessage];
           setMessages(finalMessages);
           messagesRef.current = finalMessages;
           
           const activeId = currentThreadId || `thread_${Date.now()}`;
           if (!currentThreadId) setCurrentThreadId(activeId);
           saveHistory(finalMessages, activeId);
       }
    } catch (e) {
        console.error("Failed to activate vertical:", e);
    } finally {
        setIsProcessing(false);
    }
  }, [session, currentThreadId]);

  return {
    messages,
    threads,
    isProcessing,
    isLoadingHistory,
    sendMessage,
    loadThread,
    createNewChat,
    fetchThreads,
    handleMessageAction,
    activateVertical
  };
}