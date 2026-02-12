import { ARTIFACT_REGISTRY } from './artifacts/artifact-registry';
import { User, Sparkles, Smile, Reply, Pin, Pencil, Trash, MoreHorizontal, Check } from 'lucide-react';
import { MessageArtifacts } from './artifacts/message-artifacts';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { useState } from 'react';
import type { Message, POI } from '../types/copilot';

interface CopilotMessageProps {
  message: Message;
  onAction?: (action: string, payload?: any) => void;
  onShowDetails?: (item: POI) => void;
  onShowProfile?: (user: any) => void;
}

export function SuggestionGroup({ messages, onAction }: { messages: Message[], onAction?: (action: string, payload?: any) => void }) {
  if (!messages.length) return null;
  
  return (
    <div className="flex flex-col gap-1.5 my-2 animate-in fade-in slide-in-from-bottom-1 mx-4 sm:mx-0 max-w-3xl">
        <div className="flex items-center gap-1.5 ml-1">
            <Sparkles className="w-3 h-3 text-stone-300" />
            <span className="text-[10px] font-medium text-stone-400 uppercase tracking-widest">Suggested</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
            {messages.map((msg) => (
                <button
                    key={msg.id}
                    onClick={() => onAction?.('execute_suggestion', msg.content)}
                    className="px-3 py-1 bg-white border border-stone-200 rounded-full text-[11px] font-medium text-stone-600 hover:bg-stone-50 hover:border-stone-300 hover:shadow-sm transition-all shadow-sm"
                >
                    {msg.content}
                </button>
            ))}
        </div>
    </div>
  );
}

export function CopilotMessage({ message, onAction, onShowDetails, onShowProfile }: CopilotMessageProps) {
  const [showActions, setShowActions] = useState(false);
  
  // Check for System Message
  if (message.role === 'system') {
    return (
      <div className="flex justify-center my-4">
        <span className="text-xs text-stone-400 bg-stone-100/50 px-3 py-1 rounded-full border border-stone-200/50">
          {message.content}
        </span>
      </div>
    );
  }

  if (message.mode === 'suggest' && !message.artifacts) {
      // Fallback for single suggestion if not grouped
      return (
          <div className="flex justify-start my-2 mx-4 sm:mx-0 animate-in fade-in slide-in-from-bottom-1">
               <div className="flex flex-col gap-1.5">
                   <div className="flex items-center gap-1.5 ml-1">
                        <Sparkles className="w-3 h-3 text-stone-300" />
                        <span className="text-[10px] font-medium text-stone-400 uppercase tracking-widest">Suggested</span>
                   </div>
                   <button 
                    onClick={() => onAction?.('execute_suggestion', message.content)}
                    className="self-start px-3 py-1 bg-white border border-stone-200 rounded-full text-[11px] font-medium text-stone-600 hover:bg-stone-50 hover:border-stone-300 hover:shadow-sm transition-all shadow-sm"
                  >
                      {message.content}
                  </button>
               </div>
          </div>
      );
  }

  // Determine if the message is from the current user (Me)
  const isMe = message.role === 'user' && message.sender?.isMe !== false;
  const isOtherMember = message.role === 'user' && !isMe;
  const isAssistant = message.role === 'assistant';

  // Use Registry to split artifacts
  const inlineArtifacts = message.artifacts?.filter(a => ARTIFACT_REGISTRY[a.type]?.mode === 'inline') || [];
  const blockArtifacts = message.artifacts?.filter(a => ARTIFACT_REGISTRY[a.type]?.mode === 'block') || [];

  return (
    <div 
// ... rest of the file 
        className={`group flex items-start gap-3 ${isMe ? 'justify-end' : ''} relative mb-6`}
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
    >
      
      {/* ZONE A: Avatar (Left side) */}
      {!isMe && (
        <div className="flex-shrink-0 mt-1 z-10">
            {isAssistant ? (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-stone-800 to-stone-950 flex items-center justify-center shadow-md ring-2 ring-white">
                   <Sparkles className="w-4 h-4 text-amber-300" />
                </div>
            ) : (
                <div 
                    className="w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-sm bg-stone-100 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => onShowProfile?.(message.sender)}
                >
                    {message.sender?.avatar ? (
                        <img 
                            src={message.sender.avatar} 
                            alt={message.sender.name || 'User'} 
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <span className="text-xs font-medium text-stone-500">
                            {message.sender?.name?.substring(0, 2).toUpperCase() || 'MB'}
                        </span>
                    )}
                </div>
            )}
        </div>
      )}
      
      <div className={`flex-1 max-w-[85%] ${isMe ? 'items-end' : 'items-start'} flex flex-col relative`}>
        
        {/* ZONE A: Context Header (Name & Intent) */}
        <div className={`flex items-center gap-2 mb-1.5 px-1 ${isMe ? 'flex-row-reverse' : ''}`}>
            {isOtherMember && (
                <span className="text-xs text-stone-900 font-semibold cursor-pointer hover:underline" onClick={() => onShowProfile?.(message.sender)}>
                    {message.sender?.name}
                </span>
            )}
            
            {/* Assistant Intent/Mode Label */}
            {isAssistant && message.mode && message.mode !== 'suggest' && (
                <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-stone-800">Dakkah Copilot</span>
                    <span className="text-[10px] text-stone-400">•</span>
                    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full uppercase tracking-wide ${
                        message.mode === 'propose' ? 'bg-amber-100/50 text-amber-700' :
                        'bg-emerald-100/50 text-emerald-700'
                    }`}>
                        {message.mode === 'propose' ? 'Planning' : 'Executing'}
                    </span>
                </div>
            )}

            {/* Timestamp */}
            <span className="text-[10px] text-stone-400 font-medium">
                {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
        </div>


        {/* ZONE B: The Content Core (Bubble) */}
        <div className={`relative shadow-sm text-sm transition-all overflow-hidden ${
          isMe 
            ? 'bg-stone-900 text-stone-50 rounded-2xl rounded-tr-sm selection:bg-stone-700 py-3 px-4'
            : isAssistant
                ? 'bg-white text-stone-800 border border-stone-200/60 rounded-2xl rounded-tl-sm shadow-[0_1px_2px_rgba(0,0,0,0.04)] p-0' // Padding 0 for assistant to let embeds flush
                : 'bg-white text-stone-700 border border-stone-200 rounded-2xl rounded-tl-sm py-3 px-4'
        }`}>
            
            {/* 1. The Voice (Text) */}
            {message.content && (
                <div className={`${isAssistant ? 'px-4 py-3' : ''}`}>
                     <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                </div>
            )}
            
            {/* 2. The Embed (Nano Apps inside the bubble) */}
            {isAssistant && inlineArtifacts.length > 0 && (
              <div className="bg-stone-50/50 border-t border-stone-100 w-full">
                {/* We map them directly here to control spacing better than the generic wrapper */}
                 <div className="p-2 space-y-2">
                    <MessageArtifacts 
                        artifacts={inlineArtifacts} 
                        onAction={onAction}
                        onShowDetails={onShowDetails}
                    />
                 </div>
              </div>
            )}
        </div>

        {/* Reactions (Floats below Zone B) */}
        {message.reactions && Object.keys(message.reactions).length > 0 && (
            <div className={`flex gap-1 mt-1.5 ${isMe ? 'justify-end' : 'justify-start'}`}>
                {Object.entries(message.reactions).map(([emoji, users]) => (
                    <button 
                        key={emoji}
                        onClick={() => handleReaction(emoji)}
                        className={`text-xs px-2 py-1 rounded-full border flex items-center gap-1.5 shadow-sm transition-transform hover:scale-105 ${users.includes('me') ? 'bg-blue-50 border-blue-100 text-blue-700' : 'bg-white border-stone-100 text-stone-600'}`}
                    >
                        <span>{emoji}</span>
                        <span className="text-[10px] font-bold opacity-60">{users.length}</span>
                    </button>
                ))}
            </div>
        )}

        {/* ZONE C: The Expansion Deck (Block Artifacts) */}
        {isAssistant && blockArtifacts.length > 0 && (
          <div className="mt-3 space-y-3 w-full animate-in fade-in slide-in-from-top-2 duration-500">
            <MessageArtifacts 
              artifacts={blockArtifacts} 
              onAction={onAction}
              onShowDetails={onShowDetails}
            />
          </div>
        )}
      </div>

      {/* Avatar for Me (Right side) */}
      {isMe && (
        <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center flex-shrink-0 overflow-hidden mt-1 cursor-pointer hover:opacity-80" onClick={() => onShowProfile?.({ isMe: true, name: 'You' })}>
            {message.sender?.avatar ? (
                 <img src={message.sender.avatar} className="w-full h-full object-cover" alt="Me" />
            ) : (
                <User className="w-4 h-4 text-stone-500" />
            )}
        </div>
      )}

      {/* Message Actions Toolbar (Hover) */}
      <div className={`absolute top-0 ${isMe ? 'right-full mr-2' : 'left-full ml-2'} opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 bg-white shadow-sm border border-stone-100 rounded-full p-1 z-10`}>
          <Popover>
            <PopoverTrigger asChild>
                <button className="p-1.5 text-stone-400 hover:text-amber-500 hover:bg-amber-50 rounded-full transition-colors" title="Add Reaction">
                    <Smile className="w-3.5 h-3.5" />
                </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2 flex gap-1 bg-white border-stone-200" side="top">
                {['👍', '❤️', '😂', '😮', '😢', '🔥'].map(emoji => (
                    <button key={emoji} onClick={() => handleReaction(emoji)} className="text-lg hover:scale-125 transition-transform p-1">
                        {emoji}
                    </button>
                ))}
            </PopoverContent>
          </Popover>
          
          <button 
            className="p-1.5 text-stone-400 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-colors" 
            title="Reply"
            onClick={() => onAction?.('reply', message)}
          >
              <Reply className="w-3.5 h-3.5" />
          </button>
          
          {!isAssistant && (
             <button 
                className={`p-1.5 text-stone-400 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-colors ${message.pinned ? 'text-amber-600 bg-amber-50' : ''}`} 
                title={message.pinned ? "Unpin" : "Pin"}
                onClick={() => onAction?.('pin', message)}
             >
                  <Pin className={`w-3.5 h-3.5 ${message.pinned ? 'fill-amber-600' : ''}`} />
             </button>
          )}

          {isMe && (
              <>
                <button 
                    className="p-1.5 text-stone-400 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-colors" 
                    title="Edit"
                    onClick={() => onAction?.('edit', message)}
                >
                    <Pencil className="w-3.5 h-3.5" />
                </button>
                <button 
                    className="p-1.5 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors" 
                    title="Delete"
                    onClick={() => onAction?.('delete', message)}
                >
                    <Trash className="w-3.5 h-3.5" />
                </button>
              </>
          )}
      </div>
    </div>
  );
}