
import React from 'react';
import { Message } from '../types';

interface ChatBubbleProps {
  message: Message;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex w-full mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[85%] sm:max-w-[75%] ${isUser ? 'flex-row-reverse' : 'flex-row'} gap-3`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-sm
          ${isUser ? 'bg-rose-100 text-rose-700' : 'bg-violet-600 text-white'}`}>
          {isUser ? 'U' : <i className="fa-solid fa-bolt text-xs"></i>}
        </div>

        {/* Bubble */}
        <div className="flex flex-col gap-1">
          <div className={`px-4 py-3 rounded-2xl shadow-sm text-sm leading-relaxed
            ${isUser 
              ? 'bg-rose-600 text-white rounded-tr-none' 
              : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none'}`}>
            
            <div className="whitespace-pre-wrap">
              {message.text || (message.isStreaming && "Searching for best options...")}
            </div>

            {/* Grounding Links */}
            {message.groundingLinks && message.groundingLinks.length > 0 && (
              <div className="mt-3 pt-3 border-t border-slate-100">
                <p className="text-[10px] uppercase font-bold text-slate-400 mb-2">Verified Sources</p>
                <div className="flex flex-wrap gap-2">
                  {message.groundingLinks.map((link, idx) => (
                    <a 
                      key={idx}
                      href={link.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-slate-50 text-violet-600 hover:bg-violet-50 transition-colors text-xs font-medium"
                    >
                      <i className="fa-solid fa-earth-americas text-[10px]"></i>
                      {link.title}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <span className={`text-[10px] text-slate-400 font-medium ${isUser ? 'text-right' : 'text-left'}`}>
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
