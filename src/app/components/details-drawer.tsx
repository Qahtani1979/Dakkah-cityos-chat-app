import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from './ui/sheet';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { 
  MapPin, Clock, Calendar, Users, 
  Share2, Star, Navigation, ArrowRight, ArrowLeft,
  Info, ExternalLink, Ticket as TicketIcon,
  ChefHat, Bike, MessageCircle, Phone,
  Copy, Check, Coffee, Utensils, Footprints, Music,
  Sparkles, Bot
} from 'lucide-react';
import { cn } from './ui/utils';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';

// Import Types
import type { 
  POI, Ticket, OrderStatus, 
  Event as CopilotEvent, 
  Product, ServiceItem, 
  AnalyticsData, MediaItem, 
  Ambassador 
} from '../../types/copilot';

interface DetailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  item: POI | Ticket | OrderStatus | CopilotEvent | Product | ServiceItem | AnalyticsData | MediaItem | Ambassador | any | null;
  onAction: (action: string) => void;
}

export function DetailsDrawer({ isOpen, onClose, item, onAction }: DetailsDrawerProps) {
  const [showFullImage, setShowFullImage] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Meetup Planner State
  const [isPlanning, setIsPlanning] = useState(false);
  const [selectedVibe, setSelectedVibe] = useState("Coffee");
  const [selectedTime, setSelectedTime] = useState("Tonight");

  if (!item) return null;

  // Determine Type
  const isTicket = (i: any): i is Ticket => 'seat' in i || 'qrCode' in i;
  const isPOI = (i: any): i is POI => 'vibe' in i || 'distance' in i;
  const isOrder = (i: any): i is OrderStatus => 'orderNumber' in i;
  const isFriend = (i: any): boolean => i.category === 'Social Connection';
  const isInvite = (i: any): boolean => i.type === 'invite';
  
  // Render Content Based on Type
  const renderContent = () => {
    // --- INVITE FRIEND (New User) ---
    if (isInvite(item)) {
       const inviteLink = "https://dakkah.app/join/u/fahad-8821";
       
       const copyLink = () => {
          navigator.clipboard.writeText(inviteLink);
          setCopied(true);
          toast.success("Invite link copied");
          setTimeout(() => setCopied(false), 2000);
       };

       return (
          <div className="space-y-6 text-center pt-4">
             <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-stone-400" />
             </div>
             <div>
                <h2 className="text-2xl font-bold text-stone-900">Grow Your Circle</h2>
                <p className="text-stone-500 mt-2">Invite friends to Dakkah to see their location, share spots, and coordinate plans easily.</p>
             </div>

             <div className="bg-stone-50 border border-stone-200 p-4 rounded-xl flex items-center justify-between gap-2 mt-6">
                <code className="text-xs font-mono text-stone-600 truncate">{inviteLink}</code>
                <Button size="icon" variant="ghost" className="h-8 w-8 shrink-0" onClick={copyLink}>
                   {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-stone-400" />}
                </Button>
             </div>

             <div className="space-y-3 mt-8">
                <Button className="w-full h-12 bg-stone-900 text-white hover:bg-stone-800" onClick={() => {
                   if(navigator.share) navigator.share({ title: 'Join me on Dakkah', url: inviteLink }).catch(()=>{});
                   else copyLink();
                }}>
                   <Share2 className="w-4 h-4 mr-2" /> Share Invite Link
                </Button>
                <Button variant="ghost" className="w-full" onClick={onClose}>
                   Maybe Later
                </Button>
             </div>
          </div>
       );
    }

    // --- FRIEND PROFILE (Existing Connection) ---
    if (isFriend(item)) {
       // --- MEETUP PLANNER SUB-VIEW ---
       if (isPlanning) {
          return (
             <div className="space-y-6 pt-2">
                <div className="flex items-center gap-2 mb-2">
                   <Button variant="ghost" size="icon" className="-ml-2 h-8 w-8 rounded-full" onClick={() => setIsPlanning(false)}>
                      <ArrowLeft className="w-5 h-5" />
                   </Button>
                   <h3 className="font-bold text-lg">Plan with {item.name}</h3>
                </div>

                <div className="space-y-4">
                   <div>
                      <label className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3 block">Vibe</label>
                      <div className="grid grid-cols-2 gap-3">
                         {[
                           { id: "Coffee", icon: Coffee },
                           { id: "Dinner", icon: Utensils },
                           { id: "Walk", icon: Footprints },
                           { id: "Event", icon: Music }
                         ].map((v) => (
                            <div 
                               key={v.id}
                               onClick={() => setSelectedVibe(v.id)}
                               className={cn(
                                 "flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all",
                                 selectedVibe === v.id ? "bg-stone-900 text-white border-stone-900" : "bg-white border-stone-200 hover:border-stone-300"
                               )}
                            >
                               <v.icon className="w-4 h-4" />
                               <span className="text-sm font-medium">{v.id}</span>
                            </div>
                         ))}
                      </div>
                   </div>

                   <div>
                      <label className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3 block">Time</label>
                      <div className="flex gap-2">
                         {["Now", "Tonight", "Tomorrow", "Weekend"].map((t) => (
                            <button 
                               key={t}
                               onClick={() => setSelectedTime(t)}
                               className={cn(
                                 "flex-1 py-2 rounded-lg text-sm font-medium transition-colors border",
                                 selectedTime === t ? "bg-amber-100 text-amber-800 border-amber-200" : "bg-white text-stone-600 border-stone-200 hover:bg-stone-50"
                               )}
                            >
                               {t}
                            </button>
                         ))}
                      </div>
                   </div>
                </div>

                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 mt-4 border border-indigo-100">
                   <div className="flex gap-3 items-start">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                         <Bot className="w-4 h-4 text-indigo-600" />
                      </div>
                      <div>
                         <h5 className="font-bold text-indigo-900 text-xs mb-1">Agent-to-Agent Sync</h5>
                         <p className="text-xs text-indigo-700 leading-relaxed">
                            I'll verify {item.name}'s calendar availability and cross-reference our shared taste profile to suggest the perfect spot.
                         </p>
                      </div>
                   </div>
                </div>

                <div className="pt-4 space-y-3">
                   <Button 
                     className="w-full h-12 bg-stone-900 text-white hover:bg-stone-800" 
                     onClick={() => onAction(`Contact ${item.name}'s agent to check availability for ${selectedTime}, and suggest top rated ${selectedVibe} spots that match our shared preferences.`)}
                   >
                      <Sparkles className="w-4 h-4 mr-2 text-amber-400" /> Find Best Match
                   </Button>
                   <Button 
                     variant="outline" 
                     className="w-full h-12 border-stone-200" 
                     onClick={() => onAction(`Draft a smart invitation to ${item.name} for ${selectedVibe} ${selectedTime}, proposing 3 options based on our history.`)}
                   >
                      Draft Options
                   </Button>
                </div>
             </div>
          );
       }

       // --- MAIN FRIEND PROFILE ---
       return (
          <div className="space-y-6">
             <div className="flex flex-col items-center pt-4">
                <div className="w-24 h-24 rounded-full p-1 border-2 border-green-500 mb-4 relative">
                   <img src={item.image} alt={item.name} className="w-full h-full rounded-full object-cover" />
                   <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-4 border-white rounded-full"></div>
                </div>
                <h2 className="text-2xl font-bold text-stone-900">{item.name}</h2>
                <p className="text-stone-500 flex items-center gap-1.5 mt-1 text-sm">
                   <MapPin className="w-3.5 h-3.5" />
                   {item.location} • {item.distance}
                </p>
             </div>

             <div className="grid grid-cols-2 gap-3 mt-6">
                <Button className="h-12 rounded-xl bg-stone-900 text-white hover:bg-stone-800" onClick={() => onAction(`Draft a message to ${item.name}`)}>
                   <MessageCircle className="w-4 h-4 mr-2" /> Message
                </Button>
                <Button variant="outline" className="h-12 rounded-xl border-stone-200" onClick={() => onAction(`Start a call with ${item.name}`)}>
                   <Phone className="w-4 h-4 mr-2" /> Call
                </Button>
             </div>
             
             <Button 
                variant="secondary" 
                className="w-full h-12 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-900" 
                onClick={() => setIsPlanning(true)}
             >
                <Sparkles className="w-4 h-4 mr-2 text-indigo-500" /> Plan with Copilot
             </Button>

             <div className="bg-stone-50 rounded-2xl p-4 mt-4">
                <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">Recent Activity</h4>
                <div className="space-y-4">
                   <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-stone-100 shrink-0">
                         <Coffee className="w-4 h-4 text-amber-600" />
                      </div>
                      <div>
                         <p className="text-sm text-stone-900 font-medium">Checked in at Brew Crew</p>
                         <p className="text-xs text-stone-400">2 hours ago</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
       );
    }

    // --- TICKET ---
    if (isTicket(item)) {
       return (
         <div className="space-y-6">
            <div className="bg-stone-900 text-white p-6 rounded-3xl relative overflow-hidden shadow-xl">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
               <div className="relative z-10 text-center">
                  <div className="mb-4">
                     <p className="text-xs text-stone-400 uppercase tracking-widest">Admit One</p>
                     <h2 className="text-2xl font-bold mt-1">{item.eventName}</h2>
                  </div>
                  <div className="flex justify-between items-center bg-white/10 rounded-xl p-4 mb-4 backdrop-blur-sm">
                     <div className="text-left">
                        <p className="text-xs text-stone-400">Date</p>
                        <p className="font-semibold">{item.date}</p>
                     </div>
                     <div className="text-right">
                        <p className="text-xs text-stone-400">Time</p>
                        <p className="font-semibold">{item.time}</p>
                     </div>
                  </div>
                  <div className="flex justify-between items-center mb-6 px-2">
                     <div className="text-left">
                        <p className="text-xs text-stone-400">Section</p>
                        <p className="font-semibold">VIP</p>
                     </div>
                     <div className="text-right">
                        <p className="text-xs text-stone-400">Seat</p>
                        <p className="font-semibold">{item.seat}</p>
                     </div>
                  </div>
                  <div className="bg-white p-4 rounded-xl">
                     {/* Mock QR */}
                     <div className="h-32 w-full bg-stone-900/10 flex items-center justify-center rounded border-2 border-dashed border-stone-300">
                        <p className="text-xs text-stone-500 font-mono tracking-widest">SCAN-QR-CODE-8821</p>
                     </div>
                  </div>
                  <p className="text-[10px] text-stone-400 mt-4 font-mono">{item.id}</p>
               </div>
            </div>
            
            <div className="space-y-3">
               <Button className="w-full bg-stone-900 text-white hover:bg-stone-800" onClick={() => onAction(`Show me directions to ${item.location}`)}>
                  <Navigation className="w-4 h-4 mr-2" /> Get Directions
               </Button>
               <Button variant="outline" className="w-full border-stone-200" onClick={() => onAction(`Add ${item.eventName} to my calendar`)}>
                  <Calendar className="w-4 h-4 mr-2" /> Add to Calendar
               </Button>
            </div>
         </div>
       );
    }
    
    // --- ORDER STATUS ---
    if (isOrder(item)) {
       return (
         <div className="space-y-6">
            <div className="bg-stone-50 border border-stone-200 p-6 rounded-3xl text-center">
               <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ChefHat className="w-8 h-8 text-amber-600" />
               </div>
               <h2 className="text-xl font-bold text-stone-900 mb-1">Order {item.orderNumber}</h2>
               <p className="text-amber-600 font-medium bg-amber-50 inline-block px-3 py-1 rounded-full text-sm mb-4">
                  {item.status.replace(/-/g, ' ').toUpperCase()}
               </p>
               
               <div className="text-left bg-white border border-stone-100 rounded-xl p-4 mb-4">
                  <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Items</h4>
                  <ul className="space-y-2">
                     {item.items.map((it, i) => (
                        <li key={i} className="flex justify-between text-sm">
                           <span>{it}</span>
                        </li>
                     ))}
                  </ul>
                  <div className="border-t border-stone-100 mt-3 pt-3 flex justify-between font-bold">
                     <span>Total</span>
                     <span>{item.total}</span>
                  </div>
               </div>
               
               <div className="flex items-center justify-center gap-2 text-sm text-stone-500">
                  <Clock className="w-4 h-4" />
                  <span>Est. Time: {item.estimatedTime}</span>
               </div>
            </div>

            <div className="space-y-3">
               <Button className="w-full bg-stone-900 text-white" onClick={() => onAction(`Where is my order ${item.orderNumber}?`)}>Track Live</Button>
               <Button variant="outline" className="w-full" onClick={() => onAction("Contact support for this order")}>Report Issue</Button>
            </div>
         </div>
       );
    }

    // --- EVENT / POI / GENERIC ---
    const image = 'image' in item ? (item as any).image : null;
    const title = 'name' in item ? (item as any).name : (item as any).eventName;
    const subtitle = 'category' in item ? (item as any).category : (item as any).brand;
    const location = 'location' in item ? (item as any).location : null;
    const desc = 'description' in item ? (item as any).description : "Experience the best of what the city has to offer with this exclusive selection.";

    return (
      <div className="space-y-6">
         {image && (
            <div className="h-64 w-full rounded-3xl overflow-hidden relative group cursor-pointer" onClick={() => setShowFullImage(true)}>
               <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                  <Badge className="self-start bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-md mb-2">
                     {subtitle}
                  </Badge>
                  <h2 className="text-3xl font-bold text-white leading-tight">{title}</h2>
               </div>
            </div>
         )}

         {!image && (
            <div className="p-6 bg-stone-100 rounded-3xl">
               <Badge className="bg-stone-200 text-stone-600 hover:bg-stone-300 border-none mb-2">{subtitle}</Badge>
               <h2 className="text-2xl font-bold text-stone-900">{title}</h2>
            </div>
         )}

         <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
             {location && (
               <div className="flex items-center gap-2 bg-stone-50 border border-stone-200 px-3 py-2 rounded-xl shrink-0">
                  <MapPin className="w-4 h-4 text-stone-400" />
                  <span className="text-sm font-medium">{location}</span>
               </div>
             )}
             {'rating' in item && (
               <div className="flex items-center gap-2 bg-stone-50 border border-stone-200 px-3 py-2 rounded-xl shrink-0">
                  <Star className="w-4 h-4 text-amber-500 fill-current" />
                  <span className="text-sm font-medium">{(item as any).rating}</span>
               </div>
             )}
             {'price' in item && (
               <div className="flex items-center gap-2 bg-stone-50 border border-stone-200 px-3 py-2 rounded-xl shrink-0">
                  <span className="text-sm font-medium">{(item as any).price}</span>
               </div>
             )}
         </div>

         <div className="prose prose-stone prose-sm">
            <p className="text-stone-600 leading-relaxed">{desc}</p>
         </div>

         <div className="space-y-3 pt-4">
             {item.availableActions ? (
                <div className="flex flex-col gap-3">
                   {item.availableActions.map((action: string, i: number) => (
                      <Button 
                        key={i} 
                        className={i === 0 ? "w-full h-12 text-base bg-stone-900 text-white hover:bg-stone-800 rounded-xl" : "w-full h-12 rounded-xl border-stone-200"}
                        variant={i === 0 ? "default" : "outline"}
                        onClick={() => onAction(action)}
                      >
                         {action}
                      </Button>
                   ))}
                </div>
             ) : (
                <>
                 <Button className="w-full h-12 text-base bg-stone-900 text-white hover:bg-stone-800 rounded-xl" onClick={() => onAction(`Book or reserve ${title}`)}>
                    Check Availability
                 </Button>
                 <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="h-12 rounded-xl border-stone-200" onClick={() => onAction(`Show me reviews for ${title}`)}>
                       Read Reviews
                    </Button>
                    <Button variant="outline" className="h-12 rounded-xl border-stone-200" onClick={() => onAction(`Navigate to ${title}`)}>
                       <Navigation className="w-4 h-4 mr-2" /> Navigate
                    </Button>
                 </div>
                </>
             )}
         </div>
      </div>
    );
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="w-full sm:max-w-lg p-0 flex flex-col bg-white border-l border-stone-200 h-dvh z-[60]">
           <SheetHeader className="sr-only">
              <SheetTitle>Details Drawer</SheetTitle>
              <SheetDescription>Details for the selected item</SheetDescription>
           </SheetHeader>
           <ScrollArea className="flex-1">
              <div className="p-6 pb-24">
                 <div className="flex items-center justify-between mb-6">
                    <Button variant="ghost" size="icon" onClick={() => isPlanning ? setIsPlanning(false) : onClose()} className="-ml-2 rounded-full hover:bg-stone-100">
                       <ArrowRight className="w-5 h-5 rotate-180" />
                    </Button>
                    <div className="flex gap-2">
                       {!isInvite(item) && !isPlanning && (
                         <Button variant="ghost" size="icon" className="rounded-full hover:bg-stone-100" onClick={() => toast.success("Saved to favorites")}>
                            <Star className="w-5 h-5 text-stone-400" />
                         </Button>
                       )}
                       {!isInvite(item) && !isPlanning && (
                         <Button variant="ghost" size="icon" className="rounded-full hover:bg-stone-100" onClick={() => {
                            if(navigator.share) navigator.share({ title: 'Check this out', text: 'Found on Dakkah', url: window.location.href }).catch(()=>{});
                         }}>
                            <Share2 className="w-5 h-5 text-stone-400" />
                         </Button>
                       )}
                    </div>
                 </div>
                 
                 {renderContent()}
              </div>
           </ScrollArea>
        </SheetContent>
      </Sheet>

      {/* Full Image Preview */}
      <Dialog open={showFullImage} onOpenChange={setShowFullImage}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black border-none">
           <DialogTitle className="sr-only">Full Image View</DialogTitle>
           <DialogDescription className="sr-only">Detailed view of the selected image</DialogDescription>
           <div className="relative h-[80vh] w-full">
              {item && 'image' in item && (
                 <img src={(item as any).image} alt="Full view" className="w-full h-full object-cover" />
              )}
              <Button 
                variant="ghost" 
                className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full"
                onClick={() => setShowFullImage(false)}
              >
                 Close
              </Button>
           </div>
        </DialogContent>
      </Dialog>
    </>
  );
}