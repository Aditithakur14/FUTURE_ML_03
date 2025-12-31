
import React, { useState, useRef, useEffect } from 'react';
import { Message, GroundingLink } from '../types';
import { QUICK_ACTIONS } from '../constants';
import { geminiService } from '../services/geminiService';
import ChatBubble from './ChatBubble';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'model',
      text: "Hi! 👋 How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: textToSend,
      timestamp: new Date(),
    };

    const botPlaceholder: Message = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: '',
      timestamp: new Date(),
      isStreaming: true
    };

    setMessages(prev => [...prev, userMessage, botPlaceholder]);
    setInput('');
    setIsLoading(true);

    await geminiService.sendMessageStream(
      textToSend,
      (currentFullText) => {
        setMessages(prev => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          if (last.role === 'model' && last.isStreaming) {
            last.text = currentFullText;
          }
          return updated;
        });
      },
      (finalText, links) => {
        setMessages(prev => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          if (last.role === 'model' && last.isStreaming) {
            last.text = finalText;
            last.isStreaming = false;
            last.groundingLinks = links;
          }
          return updated;
        });
        setIsLoading(false);
      }
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
      <div className="bg-gradient-to-r from-violet-600/5 to-rose-600/5 px-6 py-3 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
          </span>
          <span className="text-xs font-semibold text-slate-500 tracking-wide uppercase">Support Online</span>
        </div>
        <button 
          onClick={() => {
            geminiService.resetChat();
            setMessages([{
              id: Date.now().toString(),
              role: 'model',
              text: "Hi! 👋 How can I help you today?",
              timestamp: new Date()
            }]);
          }}
          className="text-xs font-medium text-slate-400 hover:text-rose-600 flex items-center gap-1"
        >
          <i className="fa-solid fa-rotate-right"></i> Reset Chat
        </button>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar scroll-smooth bg-slate-50/20"
      >
        {messages.map((m) => (
          <ChatBubble key={m.id} message={m} />
        ))}
        {isLoading && messages[messages.length - 1].text === '' && (
          <div className="flex gap-2 items-center text-violet-500 text-xs italic ml-11">
            <i className="fa-solid fa-circle-notch animate-spin"></i> Checking availability...
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto flex flex-col gap-4">
          <div className="flex flex-wrap gap-2 overflow-x-auto pb-1 no-scrollbar">
            {QUICK_ACTIONS.map((action, idx) => (
              <button
                key={idx}
                disabled={isLoading}
                onClick={() => handleSend(action.query)}
                className="flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 hover:border-violet-400 hover:text-violet-600 text-xs font-medium text-slate-600 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <i className={`fa-solid ${action.icon} text-rose-500`}></i>
                {action.label}
              </button>
            ))}
          </div>

          <div className="relative group">
            <textarea
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask about movies, concerts, or your tickets..."
              className="w-full pl-4 pr-14 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none resize-none transition-all group-focus-within:bg-white"
            />
            <button
              onClick={() => handleSend()}
              disabled={isLoading || !input.trim()}
              className="absolute right-2 top-1.5 h-10 w-10 flex items-center justify-center rounded-xl bg-gradient-to-tr from-violet-600 to-rose-500 text-white hover:opacity-90 transition-all disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed shadow-md"
            >
              <i className={`fa-solid ${isLoading ? 'fa-spinner fa-spin' : 'fa-paper-plane'}`}></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
