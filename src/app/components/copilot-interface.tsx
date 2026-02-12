import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, LoaderCircle, Compass, Paperclip, Mic, X, AtSign, Command, Reply } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { CopilotMessage, SuggestionGroup } from './copilot-message';
import { ChatHeader } from './chat-header';
import { ProfileDialog } from './profile-dialog';
import { GroupMember } from './group-info-dialog';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Command as CommandList, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList as CommandListWrapper } from "./ui/command";
import type { Message, POI } from '../types/copilot';

import { toast } from 'sonner';

interface CopilotInterfaceProps {
  onInteraction: () => void;
  activePrompt?: string | null;
  onPromptHandled?: () => void;
  onShowDiscovery: () => void;
  onShowDetails?: (item: any) => void;
  messages: Message[];
  isProcessing: boolean;
  sendMessage: (content: string, systemAction?: any) => Promise<void>;
  handleMessageAction?: (action: string, payload: any) => void;
}

export function CopilotInterface({ 
  onInteraction, 
  activePrompt, 
  onPromptHandled, 
  onShowDiscovery, 
  onShowDetails,
  messages,
  isProcessing,
  sendMessage,
  handleMessageAction
}: CopilotInterfaceProps) {
  const [input, setInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [mentionOpen, setMentionOpen] = useState(false);
  const [slashOpen, setSlashOpen] = useState(false);

  // Derive title from first message or context
  const chatTitle = messages.length > 0 && messages[0].content 
      ? (messages.find(m => m.role === 'user')?.content.slice(0, 25) || "New Chat")
      : "New Chat";
      
  // Calculate members
  const activeMembersMap = new Map<string, GroupMember>();
  
  // Always include Bot
  activeMembersMap.set('Dakkah Copilot', { name: 'Dakkah Copilot', role: 'bot' });

  messages.forEach(m => {
    if (m.sender) {
        const key = m.sender.isMe ? 'Me' : m.sender.name;
        if (!activeMembersMap.has(key)) {
            activeMembersMap.set(key, {
                name: m.sender.isMe ? 'You' : m.sender.name,
                avatar: m.sender.avatar,
                isMe: m.sender.isMe,
                role: m.sender.isMe ? 'admin' : 'member'
            });
        }
    }
  });

  // Ensure 'Me' is present
  if (!activeMembersMap.has('Me')) {
       activeMembersMap.set('Me', { name: 'You', isMe: true, role: 'admin' });
  }

  const activeMembers = Array.from(activeMembersMap.values());
  const memberCount = activeMembers.length;

  const filteredMessages = searchQuery 
    ? messages.filter(m => m.content.toLowerCase().includes(searchQuery.toLowerCase()))
    : messages;

  // Group consecutive suggestion messages - forcing update
  const groupedMessages: (Message | { type: 'suggestion-group', messages: Message[] })[] = [];
  let currentSuggestionGroup: Message[] = [];

  filteredMessages.forEach((message) => {
    if (message.mode === 'suggest' && !message.artifacts) {
      currentSuggestionGroup.push(message);
    } else {
      if (currentSuggestionGroup.length > 0) {
        groupedMessages.push({ type: 'suggestion-group', messages: [...currentSuggestionGroup] });
        currentSuggestionGroup = [];
      }
      groupedMessages.push(message);
    }
  });

  if (currentSuggestionGroup.length > 0) {
    groupedMessages.push({ type: 'suggestion-group', messages: [...currentSuggestionGroup] });
  }

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, searchQuery, replyingTo]);

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    
    if (!textToSend.trim() || isProcessing) return;

    onInteraction();
    
    // If replying, maybe prepend "Replying to X:"?
    // Backend doesn't support reply linkage yet, so we just simulate or clear state
    if (replyingTo) {
        setReplyingTo(null);
        // Ideally we pass replyTo ID to sendMessage
    }

    setInput('');
    await sendMessage(textToSend);
    inputRef.current?.focus();
  };

  const handleAddMember = async (ids: string[], shareHistory: boolean) => {
      const names = ids.length === 1 ? "a new member" : `${ids.length} members`;
      await sendMessage(`I'm adding ${names} to the chat.${shareHistory ? ' I shared the history.' : ''}`, { type: 'system_add_member', ids, shareHistory });
  };

  const handleRemoveMember = async (name: string) => {
      await sendMessage(`Removing ${name} from the group.`, { type: 'system_remove_member', name });
      toast.success(`Removed ${name} from group`);
  };

  const handleLeaveGroup = async () => {
      await sendMessage(`I'm leaving the group.`, { type: 'system_leave_group' });
      // In a real app, this would redirect
      toast.info("You left the group");
  };

  const handleUpdateSettings = async (settings: any) => {
      console.log("Settings updated:", settings);
      toast.success("Copilot settings updated");
  };

  // Handle message actions bubbling up
  const onMessageAction = (action: string, payload: any) => {
      if (action === 'reply') {
          setReplyingTo(payload);
          inputRef.current?.focus();
      } else if (action === 'edit') {
          setInput(payload.content);
          inputRef.current?.focus();
          toast.info("Edit mode: Modify message and press Enter");
          // Logic to update existing message ID not fully implemented in sendMessage yet
      } else if (action === 'delete') {
          handleMessageAction?.('delete', payload);
          toast.success("Message deleted");
      } else if (action === 'pin') {
          handleMessageAction?.('pin', payload);
          toast.success(payload.pinned ? "Message unpinned" : "Message pinned");
      } else if (action === 'react') {
          handleMessageAction?.('react', payload);
      } else if (action === 'execute_suggestion') {
          handleSend(payload);
      } else {
          // Default: send text
          handleSend(action); 
      }
  };

  const handleProfileClick = (user: any) => {
      setSelectedProfile(user);
      setShowProfile(true);
  };

  const handleInputChange = (val: string) => {
      setInput(val);
      if (val.endsWith('@')) setMentionOpen(true);
      else setMentionOpen(false);
      
      if (val.startsWith('/')) setSlashOpen(true);
      else setSlashOpen(false);
  };

  const insertMention = (name: string) => {
      setInput(input + name + ' ');
      setMentionOpen(false);
      inputRef.current?.focus();
  };

  const insertCommand = (cmd: string) => {
      setInput(cmd + ' ');
      setSlashOpen(false);
      inputRef.current?.focus();
  };

  useEffect(() => {
    if (activePrompt && !isProcessing) {
      handleSend(activePrompt);
      if (onPromptHandled) {
        onPromptHandled();
      }
    }
  }, [activePrompt]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-full flex flex-col w-full relative">
      <ChatHeader 
        title={chatTitle} 
        memberCount={memberCount} 
        threadId="current" 
        onAddMember={handleAddMember}
        activeMembers={activeMembers}
        messages={messages}
        onRemoveMember={handleRemoveMember}
        onLeaveGroup={handleLeaveGroup}
        onUpdateSettings={handleUpdateSettings}
        onSearch={setSearchQuery}
      />

      <ProfileDialog open={showProfile} onOpenChange={setShowProfile} user={selectedProfile} />

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6" ref={scrollRef}>
        <div className="space-y-8 pb-4 max-w-3xl mx-auto">
          {groupedMessages.map((item, index) => {
             if ('type' in item && item.type === 'suggestion-group') {
                return (
                    <SuggestionGroup 
                        key={`group-${index}`}
                        messages={item.messages} 
                        onAction={onMessageAction} 
                    />
                );
             }
             
             const message = item as Message;
             return (
                <CopilotMessage 
                  key={message.id} 
                  message={message} 
                  onAction={onMessageAction}
                  onShowDetails={onShowDetails}
                  onShowProfile={handleProfileClick}
                />
            );
          })}
          {isProcessing && (
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center flex-shrink-0 border border-stone-200">
                <Sparkles className="w-4 h-4 text-stone-400" />
              </div>
              <div className="flex-1 bg-white rounded-2xl px-5 py-4 border border-stone-100 shadow-sm max-w-[85%]">
                <div className="flex items-center gap-2 text-stone-500">
                  <LoaderCircle className="w-4 h-4 animate-spin" />
                  <span className="text-sm font-medium">Thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-stone-200 bg-white/80 backdrop-blur-xl p-4 z-10">
        <div className="max-w-3xl mx-auto">
          
          {/* Reply Banner */}
          {replyingTo && (
              <div className="flex items-center justify-between bg-stone-50 border border-stone-200 rounded-t-xl p-2 px-3 mb-[-1px] relative z-20 mx-4 text-xs">
                  <div className="flex items-center gap-2 text-stone-500 truncate">
                      <Reply className="w-3 h-3" />
                      <span>Replying to <strong>{replyingTo.sender?.name || 'User'}</strong>: {replyingTo.content.substring(0, 30)}...</span>
                  </div>
                  <button onClick={() => setReplyingTo(null)} className="text-stone-400 hover:text-stone-800">
                      <X className="w-3 h-3" />
                  </button>
              </div>
          )}

          <div className={`flex gap-3 items-end bg-white rounded-3xl border border-stone-200 shadow-sm p-2 focus-within:ring-2 focus-within:ring-stone-100 focus-within:border-stone-300 transition-all ${replyingTo ? 'rounded-t-none' : ''}`}>
            
            <div className="flex gap-1">
                 <Button
                  variant="ghost"
                  size="icon"
                  onClick={onShowDiscovery}
                  className="h-[44px] w-[44px] rounded-full text-stone-400 hover:text-stone-800 hover:bg-stone-100 shrink-0"
                  title="Explore Capabilities"
                >
                  <Compass className="w-5 h-5" />
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toast.info("File upload coming soon")}
                  className="h-[44px] w-[44px] rounded-full text-stone-400 hover:text-stone-800 hover:bg-stone-100 shrink-0 hidden sm:flex"
                  title="Attach File"
                >
                  <Paperclip className="w-5 h-5" />
                </Button>
            </div>

            <div className="flex-1 relative">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => handleInputChange(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask Dakkah..."
                className="bg-transparent border-0 text-stone-800 placeholder:text-stone-400 focus-visible:ring-0 focus-visible:ring-offset-0 min-h-[44px] text-base px-3"
                disabled={isProcessing}
              />
              
              {/* Mentions Popover Logic */}
              {mentionOpen && (
                  <div className="absolute bottom-full left-0 mb-2 w-48 bg-white border border-stone-200 shadow-lg rounded-lg overflow-hidden animate-in fade-in slide-in-from-bottom-2">
                      <div className="p-1">
                          <p className="text-[10px] font-semibold text-stone-400 px-2 py-1 uppercase tracking-wider">Mention</p>
                          {activeMembers.filter(m => !m.isMe).map((member, i) => (
                              <button key={i} onClick={() => insertMention(member.name)} className="w-full text-left px-2 py-1.5 text-sm hover:bg-stone-100 rounded flex items-center gap-2">
                                  <div className="w-5 h-5 rounded-full bg-stone-200 overflow-hidden">
                                      {member.avatar && <img src={member.avatar} className="w-full h-full object-cover" />}
                                  </div>
                                  {member.name}
                              </button>
                          ))}
                      </div>
                  </div>
              )}
              
              {/* Slash Commands Popover Logic */}
              {slashOpen && (
                  <div className="absolute bottom-full left-0 mb-2 w-48 bg-white border border-stone-200 shadow-lg rounded-lg overflow-hidden animate-in fade-in slide-in-from-bottom-2">
                      <div className="p-1">
                           <p className="text-[10px] font-semibold text-stone-400 px-2 py-1 uppercase tracking-wider">Commands</p>
                          {[
                              { cmd: '/invite', label: 'Invite Member' },
                              { cmd: '/clear', label: 'Clear Chat' },
                              { cmd: '/help', label: 'Get Help' },
                              { cmd: '/feedback', label: 'Send Feedback' }
                          ].map((item, i) => (
                              <button key={i} onClick={() => insertCommand(item.cmd)} className="w-full text-left px-2 py-1.5 text-sm hover:bg-stone-100 rounded flex items-center justify-between group">
                                  <span className="font-medium text-stone-700">{item.cmd}</span>
                                  <span className="text-xs text-stone-400 group-hover:text-stone-500">{item.label}</span>
                              </button>
                          ))}
                      </div>
                  </div>
              )}
            </div>

            <div className="flex gap-1">
                 <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toast.info("Voice notes coming soon")}
                  className="h-[44px] w-[44px] rounded-full text-stone-400 hover:text-stone-800 hover:bg-stone-100 shrink-0 hidden sm:flex"
                  title="Record Voice"
                >
                  <Mic className="w-5 h-5" />
                </Button>
                
                <Button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isProcessing}
                  className="rounded-full bg-stone-900 hover:bg-stone-800 text-white h-[44px] w-[44px] p-0 shrink-0 transition-all shadow-sm"
                >
                  <Send className="w-5 h-5" />
                </Button>
            </div>
          </div>
          <div className="mt-3 text-center hidden md:block">
            <p className="text-[11px] text-stone-400 font-medium">
              Every Dakkah capability accessible through conversation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}