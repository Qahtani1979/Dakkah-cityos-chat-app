import { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from './ui/sheet';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  Sun, CloudRain, Wind, Droplets, 
  Car, Navigation, AlertTriangle, 
  Calendar, Clock, MapPin, 
  Coffee, Utensils, Moon, Music, 
  Zap, Share2, Phone, ShieldAlert,
  TrendingUp, Star, MoreHorizontal,
  Bike, Package, Users, Map, 
  CalendarDays, ThumbsUp, MessageCircle, Heart
} from 'lucide-react';
import { cn } from './ui/utils';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'motion/react';

import { projectId } from '../../../utils/supabase/info';

interface RightDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onAction: (action: string) => void;
  onItemClick: (item: any) => void;
}

export function RightDrawer({ isOpen, onClose, onAction, onItemClick }: RightDrawerProps) {
  const [isActivityExpanded, setIsActivityExpanded] = useState(true);
  const [isStatusExpanded, setIsStatusExpanded] = useState(true);
  // Removed verticals fetching as it moved to Bottom Drawer

  useEffect(() => {
    if (isOpen) {
      // Activity collapses after 3s
      const activityTimer = setTimeout(() => {
        setIsActivityExpanded(false);
      }, 3000);

      // Status collapses after 4s (staggered)
      const statusTimer = setTimeout(() => {
        setIsStatusExpanded(false);
      }, 4000);

      return () => {
        clearTimeout(activityTimer);
        clearTimeout(statusTimer);
      };
    } else {
      setIsActivityExpanded(true);
      setIsStatusExpanded(true);
    }
  }, [isOpen]);

  const handleQuickAction = (action: string) => {
    switch(action) {
      case 'Ride':
        onAction("Book a ride to my next destination");
        break;
      case 'Book':
        onAction("Find a restaurant for dinner tonight");
        break;
      case 'Events':
        onAction("Show me upcoming events this weekend");
        break;
      case 'Map':
        onAction("Open the exploration map");
        break;
      case 'Contact':
        onAction("Show emergency contacts");
        break;
      case 'Share':
        if (navigator.share) {
          navigator.share({
            title: 'Dakkah Location',
            text: 'I am here!',
            url: window.location.href,
          }).catch(() => {});
        } else {
          navigator.clipboard.writeText(window.location.href);
          toast.success("Location link copied to clipboard");
        }
        break;
      case 'SOS':
        onAction("INITIATE EMERGENCY PROTOCOL");
        break;
    }
  };

  const handleWeatherDetail = (type: string) => {
    onAction(`Show detailed ${type} forecast`);
  };

  const handleAgendaClick = (item: any) => {
    const detailItem = {
      id: `agenda-${Date.now()}`,
      eventName: item.title,
      date: "Today",
      time: item.time,
      location: item.sub.split('•')[0].trim(),
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
      category: "Personal Agenda",
      seat: "Table 4",
      qrCode: "mock-qr-code-data",
      attendees: 2, 
      notes: "Casual dinner"
    };
    onItemClick(detailItem);
  };

  const handleStoryClick = (name: string) => {
    onAction(`Tell me what's happening at ${name}`);
  };

  const handleFeedItemClick = (item: any) => {
     if (!item.img && !item.location) {
       onAction(`Tell me more about the ${item.title}`);
       return;
     }
     
     const detailItem = {
       id: `feed-${Date.now()}`,
       name: item.title,
       date: item.time || "Recently",
       time: "Open Now",
       location: item.location || "Riyadh",
       image: item.img,
       category: item.tag,
       description: item.desc,
       rating: 4.8
     };
     onItemClick(detailItem);
  };

  const handleCollectionClick = (name: string) => {
    onAction(`Show me the best ${name} in Riyadh`);
  };

  const handleLiveActivityClick = () => {
    if (!isActivityExpanded) {
      setIsActivityExpanded(true);
      return;
    }

    const detailItem = {
      id: "order-123",
      orderNumber: "#8821",
      status: 'on-the-way',
      items: ["Spicy Chicken Meal", "Pepsi"],
      total: "SAR 45.00",
      estimatedTime: "5 mins",
      type: 'order' 
    };
    onItemClick(detailItem);
  };

  const handlePlaceClick = (place: any) => {
     const detailItem = {
        id: `place-${place.name}`,
        name: place.name,
        category: place.type,
        image: place.image,
        rating: place.rating,
        distance: place.dist,
        location: place.location,
        description: "A wonderful spot nearby tailored to your preferences."
     };
     onItemClick(detailItem);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-md p-0 flex flex-col bg-stone-50 border-l border-stone-200 h-dvh">
        <SheetHeader className="px-6 py-4 border-b border-stone-200 bg-white shrink-0 z-10">
          <div className="flex items-center justify-between">
            <div>
              <SheetTitle>City Pulse</SheetTitle>
              <SheetDescription>Real-time updates & utilities</SheetDescription>
            </div>
            <div 
              className="flex items-center gap-2 text-amber-500 bg-amber-50 px-2 py-1 rounded-full border border-amber-100 cursor-pointer hover:bg-amber-100 transition-colors" 
              onClick={() => onAction("Show me full weather forecast")}
            >
               <Sun className="w-4 h-4 fill-current" />
               <span className="text-xs font-bold">28°C</span>
            </div>
          </div>
        </SheetHeader>

        <ScrollArea className="flex-1 h-full">
          <div className="p-4 space-y-6 pb-20">

            {/* === QUICK ACTIONS (COMPACT) === */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
              {[
                { icon: Car, label: "Ride", color: "text-blue-600 bg-blue-50 border-blue-100" },
                { icon: Utensils, label: "Book", color: "text-orange-600 bg-orange-50 border-orange-100" },
                { icon: Calendar, label: "Events", color: "text-pink-600 bg-pink-50 border-pink-100" },
                { icon: Map, label: "Map", color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
                { icon: Phone, label: "Contact", color: "text-cyan-600 bg-cyan-50 border-cyan-100" },
                { icon: Share2, label: "Share", color: "text-purple-600 bg-purple-50 border-purple-100" },
                { icon: ShieldAlert, label: "SOS", color: "text-red-600 bg-red-50 border-red-100" },
              ].map((action, i) => (
                <button 
                  key={i} 
                  onClick={() => handleQuickAction(action.label)}
                  className={cn("w-10 h-10 rounded-full flex items-center justify-center shrink-0 border shadow-sm transition-transform hover:scale-110 active:scale-95", action.color)}
                  title={action.label}
                >
                  <action.icon className="w-4 h-4" />
                </button>
              ))}
            </div>

            {/* === LIVE ACTIVITY (ANIMATED) === */}
            <motion.div 
               layout
               initial={{ height: "auto" }}
               animate={{ height: isActivityExpanded ? "auto" : 64 }}
               transition={{ type: "spring", stiffness: 300, damping: 30 }}
               onClick={handleLiveActivityClick} 
               className="bg-stone-900 rounded-2xl text-white shadow-lg relative overflow-hidden cursor-pointer group hover:shadow-xl w-full"
            >
               {/* Background Icon */}
               <motion.div 
                  layout 
                  className="absolute top-0 right-0 p-3 opacity-20"
                  animate={{ 
                      scale: isActivityExpanded ? 1 : 0.8,
                      opacity: isActivityExpanded ? 0.2 : 0.1,
                      rotate: 12
                  }}
               >
                  <Package className="w-16 h-16 -mr-4 -mt-4" />
               </motion.div>
               
               <div className={cn("relative z-10", isActivityExpanded ? "p-4" : "p-3 flex items-center justify-between h-full")}>
                  
                  {/* Expanded Header */}
                  <AnimatePresence mode="popLayout">
                    {isActivityExpanded && (
                       <motion.div 
                          initial={{ opacity: 0, height: 0, marginBottom: 0 }} 
                          animate={{ opacity: 1, height: "auto", marginBottom: 8 }} 
                          exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                          className="flex items-center justify-between"
                       >
                          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Ongoing Activity</span>
                          <Badge className="bg-green-500 text-white border-none text-[9px] hover:bg-green-600">On The Way</Badge>
                       </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex items-center gap-3 flex-1">
                     <motion.div 
                        layout
                        className={cn("rounded-full bg-white flex items-center justify-center shrink-0", isActivityExpanded ? "w-10 h-10" : "w-8 h-8")}
                     >
                        <img src="https://upload.wikimedia.org/wikipedia/en/thumb/9/9b/Al_Baik_logo.svg/1200px-Al_Baik_logo.svg.png" className={cn("object-contain", isActivityExpanded ? "w-6 h-6" : "w-5 h-5")} alt="Al Baik" />
                     </motion.div>
                     <div className="flex-1 min-w-0">
                        <motion.h4 layout className="font-bold text-sm truncate">Al Baik Delivery</motion.h4>
                        <motion.p layout className="text-xs text-stone-400 truncate">
                           {isActivityExpanded ? "Arriving in 5 mins • Driver nearby" : "5 mins away • On time"}
                        </motion.p>
                     </div>
                  </div>

                  {/* Collapsed Status Indicator */}
                  {!isActivityExpanded && (
                     <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }} 
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-end"
                     >
                        <Badge className="bg-green-500/20 text-green-400 border-none text-[9px] px-2 h-5">5m</Badge>
                     </motion.div>
                  )}

                  {/* Expanded Progress Bar */}
                  <AnimatePresence>
                     {isActivityExpanded && (
                        <motion.div 
                           initial={{ opacity: 0, height: 0, marginTop: 0 }} 
                           animate={{ opacity: 1, height: "auto", marginTop: 16 }} 
                           exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        >
                           <div className="h-1 bg-stone-700 rounded-full overflow-hidden">
                              <div className="h-full bg-amber-500 w-[80%] rounded-full animate-pulse"></div>
                           </div>
                        </motion.div>
                     )}
                  </AnimatePresence>
               </div>
            </motion.div>

            {/* === LIVE STATUS WIDGET (ANIMATED) === */}
            <motion.div 
               layout
               initial={{ height: "auto" }}
               animate={{ height: isStatusExpanded ? "auto" : 64 }}
               transition={{ type: "spring", stiffness: 300, damping: 30 }}
               className="rounded-xl shadow-sm bg-gradient-to-br from-indigo-500 to-purple-600 text-white overflow-hidden relative cursor-pointer hover:shadow-md transition-shadow" 
               onClick={() => {
                  if(!isStatusExpanded) setIsStatusExpanded(true);
                  else onAction("Show city status dashboard");
               }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
              
              <div className={cn("relative z-10 transition-all", isStatusExpanded ? "p-5" : "p-3 flex items-center justify-between h-full")}>
                
                {/* Header Section */}
                <div className={cn("flex justify-between items-start transition-all", isStatusExpanded ? "mb-4 w-full" : "w-full items-center mb-0")}>
                  <div className="flex items-center gap-3">
                     <motion.div layout>
                        <h3 className={cn("font-bold transition-all", isStatusExpanded ? "text-lg" : "text-sm")}>Riyadh</h3>
                        <p className="text-indigo-100 text-xs truncate">
                           {isStatusExpanded ? "Clear Sky • AQI 45 (Good)" : "28°C • Clear Sky"}
                        </p>
                     </motion.div>
                  </div>
                  
                  {isStatusExpanded ? (
                     <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30 border-none backdrop-blur-md">
                        <TrendingUp className="w-3 h-3 mr-1" /> Trending
                     </Badge>
                  ) : (
                     <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        className="flex items-center gap-2"
                     >
                        <div className="flex items-center gap-1 text-[10px] bg-white/10 px-2 py-1 rounded-full">
                           <Car className="w-3 h-3 text-indigo-200" />
                           <span>Mod</span>
                        </div>
                     </motion.div>
                  )}
                </div>

                {/* Expanded Grid */}
                <AnimatePresence>
                  {isStatusExpanded && (
                    <motion.div 
                       initial={{ opacity: 0, height: 0 }} 
                       animate={{ opacity: 1, height: "auto" }} 
                       exit={{ opacity: 0, height: 0 }}
                       className="grid grid-cols-3 gap-4 text-center w-full"
                    >
                      <div 
                        className="bg-white/10 rounded-lg p-2 backdrop-blur-sm hover:bg-white/20 transition-colors cursor-pointer" 
                        onClick={(e) => { e.stopPropagation(); onAction("Check traffic conditions"); }}
                      >
                        <Car className="w-4 h-4 mx-auto mb-1 text-indigo-200" />
                        <p className="text-xs font-medium">Traffic</p>
                        <p className="text-[10px] text-indigo-200">Moderate</p>
                      </div>
                      <div 
                        className="bg-white/10 rounded-lg p-2 backdrop-blur-sm hover:bg-white/20 transition-colors cursor-pointer"
                        onClick={(e) => { e.stopPropagation(); handleWeatherDetail("wind"); }}
                      >
                        <Wind className="w-4 h-4 mx-auto mb-1 text-indigo-200" />
                        <p className="text-xs font-medium">Wind</p>
                        <p className="text-[10px] text-indigo-200">12 km/h</p>
                      </div>
                      <div 
                        className="bg-white/10 rounded-lg p-2 backdrop-blur-sm hover:bg-white/20 transition-colors cursor-pointer"
                        onClick={(e) => { e.stopPropagation(); handleWeatherDetail("humidity"); }}
                      >
                        <Droplets className="w-4 h-4 mx-auto mb-1 text-indigo-200" />
                        <p className="text-xs font-medium">Humidity</p>
                        <p className="text-[10px] text-indigo-200">24%</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* === SOCIAL RADAR === */}
            <div>
               <div className="flex items-center justify-between mb-3 px-1">
                  <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2">
                     Social Radar <span className="bg-green-100 text-green-700 text-[9px] px-1.5 py-0.5 rounded-full">3 Nearby</span>
                  </h4>
                  <Button variant="ghost" size="sm" className="h-6 text-[10px] text-stone-400" onClick={() => onAction("Show all friends on map")}>View Map</Button>
               </div>
               <ScrollArea className="w-full whitespace-nowrap pb-2">
                  <div className="flex space-x-3 px-1">
                     {[
                        { name: "Fahad", status: "At Roshan Front", img: "https://i.pravatar.cc/150?u=a042581f4e29026024d", dist: "1.2km" },
                        { name: "Sarah", status: "Nearby", img: "https://i.pravatar.cc/150?u=a042581f4e29026704d", dist: "0.5km" },
                        { name: "Khalid", status: "Walking", img: "https://i.pravatar.cc/150?u=a04258114e29026302d", dist: "2.1km" },
                        { name: "Add", status: "Invite", img: null, dist: "" }
                     ].map((friend, i) => (
                        <div 
                          key={i} 
                          className="flex flex-col items-center gap-1 group cursor-pointer" 
                          onClick={() => {
                            if (friend.img) {
                              onItemClick({
                                id: `friend-${friend.name}`,
                                name: friend.name,
                                category: "Social Connection",
                                image: friend.img,
                                description: `${friend.name} is currently ${friend.status}.`,
                                location: friend.status,
                                distance: friend.dist
                              });
                            } else {
                              onAction("Invite friends to join Dakkah");
                            }
                          }}
                        >
                           <div className={cn("relative p-0.5 rounded-full border-2 transition-colors", friend.img ? "border-green-400 group-hover:border-green-500" : "border-dashed border-stone-300 group-hover:border-stone-400 group-hover:bg-stone-50")}>
                              <Avatar className="w-12 h-12 border-2 border-white">
                                 {friend.img ? (
                                    <AvatarImage src={friend.img} />
                                 ) : (
                                    <div className="w-full h-full bg-stone-100 flex items-center justify-center">
                                       <Users className="w-5 h-5 text-stone-400" />
                                    </div>
                                 )}
                                 <AvatarFallback>{friend.name[0]}</AvatarFallback>
                              </Avatar>
                              {friend.img ? (
                                 <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                              ) : (
                                 <div className="absolute bottom-0 right-0 w-3 h-3 bg-stone-400 border-2 border-white rounded-full flex items-center justify-center">
                                   <div className="w-1.5 h-0.5 bg-white rounded-full" />
                                   <div className="absolute w-0.5 h-1.5 bg-white rounded-full" />
                                 </div>
                              )}
                           </div>
                           <span className="text-[10px] font-bold text-stone-700">{friend.name}</span>
                           {friend.dist && <span className="text-[9px] text-stone-400 -mt-1">{friend.dist}</span>}
                        </div>
                     ))}
                  </div>
               </ScrollArea>
            </div>

            {/* === NEARBY PLACES === */}
            <div className="space-y-3">
               <div className="flex items-center justify-between px-1">
                  <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wider">Nearby Gems</h4>
                  <Button variant="ghost" size="sm" className="h-6 text-[10px] text-stone-400" onClick={() => onAction("Show more nearby places")}>See All</Button>
               </div>
               <ScrollArea className="w-full whitespace-nowrap pb-2">
                  <div className="flex space-x-3 px-1">
                     {[
                        { name: "Brew Crew", type: "Coffee", rating: 4.8, dist: "0.3km", image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=300&q=80", location: "Olayya" },
                        { name: "The Park", type: "Recreation", rating: 4.5, dist: "0.8km", image: "https://images.unsplash.com/photo-1519331379826-f9478558d196?auto=format&fit=crop&w=300&q=80", location: "Diplomatic Quarter" },
                        { name: "Art Space", type: "Gallery", rating: 4.9, dist: "1.2km", image: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?auto=format&fit=crop&w=300&q=80", location: "JAX District" }
                     ].map((place, i) => (
                        <div 
                           key={i} 
                           className="w-40 bg-white border border-stone-200 rounded-xl overflow-hidden shrink-0 cursor-pointer hover:shadow-md transition-shadow"
                           onClick={() => handlePlaceClick(place)}
                        >
                           <div className="h-24 w-full relative">
                              <img src={place.image} alt={place.name} className="w-full h-full object-cover" />
                              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-1.5 py-0.5 rounded text-[10px] font-bold flex items-center gap-0.5 shadow-sm">
                                 <Star className="w-2.5 h-2.5 text-amber-500 fill-current" /> {place.rating}
                              </div>
                           </div>
                           <div className="p-2.5">
                              <h5 className="text-xs font-bold text-stone-900 truncate">{place.name}</h5>
                              <p className="text-[10px] text-stone-500 mb-1">{place.type}</p>
                              <div className="flex items-center gap-1 text-[10px] text-stone-400">
                                 <MapPin className="w-2.5 h-2.5" />
                                 <span>{place.dist}</span>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </ScrollArea>
            </div>

            {/* === MY AGENDA === */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                 <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wider">My Agenda</h4>
                 <Button variant="ghost" size="sm" className="h-6 text-[10px] text-stone-400" onClick={() => onAction("Show my full calendar")}>See All</Button>
              </div>
              <div className="relative pl-4 space-y-4 border-l-2 border-stone-100 ml-2">
                 {[
                   { time: "18:30", title: "Dinner Reservation", sub: "LPM Restaurant • 2 Guests", icon: Utensils, active: true },
                   { time: "20:00", title: "Cinema: Dune 2", sub: "VOX Cinemas • VIP", icon: Moon, active: false },
                   { time: "Tomorrow", title: "Morning Coffee", sub: "Camel Step • 09:00 AM", icon: Coffee, active: false },
                 ].map((item, i) => (
                   <div key={i} className="relative pl-6 group cursor-pointer" onClick={() => handleAgendaClick(item)}>
                      <div className={cn("absolute -left-[21px] top-1 w-3 h-3 rounded-full border-2 border-white transition-colors", item.active ? "bg-amber-500 shadow-md ring-2 ring-amber-100" : "bg-stone-300 group-hover:bg-amber-300")}></div>
                      <div className={cn("p-3 rounded-xl border transition-all", item.active ? "bg-white border-amber-200 shadow-sm" : "bg-stone-50 border-transparent opacity-70 hover:opacity-100 hover:bg-white hover:border-stone-200 hover:shadow-sm")}>
                         <div className="flex justify-between items-start">
                            <div>
                               <p className="text-xs font-bold text-stone-500 mb-0.5">{item.time}</p>
                               <h5 className="font-semibold text-stone-900 text-sm">{item.title}</h5>
                               <p className="text-xs text-stone-500">{item.sub}</p>
                            </div>
                            <item.icon className="w-4 h-4 text-stone-400 group-hover:text-amber-500 transition-colors" />
                         </div>
                      </div>
                   </div>
                 ))}
              </div>
            </div>

            {/* === UPCOMING EVENTS === */}
            <div className="space-y-3">
               <div className="flex items-center justify-between px-1">
                  <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wider">Trending Events</h4>
                  <Button variant="ghost" size="sm" className="h-6 text-[10px] text-stone-400" onClick={() => onAction("Find more events this week")}>See All</Button>
               </div>
               <div className="space-y-2">
                  {[
                     { title: "Riyadh Season Opening", date: "Oct 28", time: "18:00", loc: "Boulevard", img: "https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?auto=format&fit=crop&w=800&q=80" },
                     { title: "Tech Expo 2024", date: "Nov 02", time: "09:00", loc: "Front Expo", img: "https://images.unsplash.com/photo-1540575467063-178a50935339?auto=format&fit=crop&w=800&q=80" }
                  ].map((event, i) => (
                     <div key={i} className="flex gap-3 bg-white p-2 rounded-xl border border-stone-200 cursor-pointer hover:bg-stone-50 transition-colors" onClick={() => onAction(`Get tickets for ${event.title}`)}>
                        <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                           <img src={event.img} alt={event.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 flex flex-col justify-center">
                           <h5 className="text-xs font-bold text-stone-900">{event.title}</h5>
                           <div className="flex items-center gap-2 mt-1">
                              <span className="text-[10px] text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded font-medium">{event.date}</span>
                              <span className="text-[10px] text-stone-400 flex items-center gap-1"><Clock className="w-2.5 h-2.5" /> {event.time}</span>
                           </div>
                           <p className="text-[10px] text-stone-500 mt-1 flex items-center gap-1"><MapPin className="w-2.5 h-2.5" /> {event.loc}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            {/* === CITY FEED === */}
            <div className="space-y-4 pt-2">
              <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wider">City Feed</h4>
              
              {/* Stories */}
              <ScrollArea className="w-full whitespace-nowrap pb-2">
                <div className="flex space-x-3">
                   {[
                     { name: "Riyadh Season", img: "https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?auto=format&fit=crop&w=64&h=64", active: true },
                     { name: "BLVD World", img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=64&h=64", active: true },
                     { name: "MDL Beast", img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=64&h=64", active: true },
                     { name: "AlUla", img: "https://images.unsplash.com/photo-1542401886-65d6c61db217?auto=format&fit=crop&w=64&h=64", active: false },
                   ].map((story, i) => (
                     <div key={i} className="flex flex-col items-center gap-1 cursor-pointer group" onClick={() => handleStoryClick(story.name)}>
                        <div className={cn("p-0.5 rounded-full border-2 transition-colors", story.active ? "border-amber-500 group-hover:border-amber-400" : "border-stone-200 group-hover:border-stone-300")}>
                           <Avatar className="w-12 h-12 border-2 border-white">
                              <AvatarImage src={story.img} />
                              <AvatarFallback>{story.name[0]}</AvatarFallback>
                           </Avatar>
                        </div>
                        <span className="text-[9px] font-medium text-stone-600 truncate w-14 text-center group-hover:text-amber-600">{story.name}</span>
                     </div>
                   ))}
                </div>
              </ScrollArea>

              {/* Feed Items */}
              <div className="space-y-4">
                 {[
                   { 
                     type: "social", 
                     user: "Sarah Al-Ahmed", 
                     avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d", 
                     action: "checked in at", 
                     target: "Kyoto House", 
                     time: "10m ago",
                     img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
                     tag: "New Opening",
                     desc: "The matcha latte here is incredible! Definitely a new favorite spot in DQ.",
                     likes: 24,
                     comments: 5
                   },
                   { 
                      type: "alert", 
                      title: "Traffic Alert: King Fahd Rd", 
                      desc: "Heavy congestion reported due to maintenance work. Expect delays of 20+ mins.", 
                      time: "15m ago", 
                      tag: "Traffic",
                      img: null
                   },
                   { 
                      type: "event", 
                      title: "Jazz Festival 2024", 
                      desc: "Tickets are now available for early bird purchase. Don't miss out on the biggest jazz event of the year.", 
                      time: "2h ago", 
                      tag: "Event",
                      img: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=800&q=80",
                      location: "Arena"
                   }
                 ].map((post: any, i) => (
                   <Card 
                     key={i} 
                     className={cn("overflow-hidden border-stone-200 shadow-sm group transition-colors", (post.img || post.type === 'alert') ? "cursor-pointer hover:border-stone-300" : "")}
                     onClick={() => handleFeedItemClick(post)}
                   >
                      {/* Header for Social Posts */}
                      {post.type === 'social' && (
                         <div className="p-3 pb-2 flex items-center gap-2">
                            <Avatar className="w-8 h-8 border border-stone-100">
                               <AvatarImage src={post.avatar} />
                               <AvatarFallback>{post.user[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                               <p className="text-xs text-stone-900"><span className="font-bold">{post.user}</span> {post.action} <span className="font-semibold">{post.target}</span></p>
                               <p className="text-[10px] text-stone-400">{post.time}</p>
                            </div>
                         </div>
                      )}

                      {/* Image Content */}
                      {post.img && (
                        <div className="h-40 w-full overflow-hidden relative">
                           <img src={post.img} alt={post.title || post.target} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                           {post.tag && (
                              <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">
                                 {post.tag}
                              </div>
                           )}
                        </div>
                      )}

                      <CardContent className={cn("p-4", post.type === 'social' ? "pt-2" : (!post.img && "pt-4"))}>
                         {/* Alert / News Header */}
                         {post.type !== 'social' && !post.img && (
                           <div className="mb-2">
                             <span className={cn("text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide", post.type === 'alert' ? "bg-red-100 text-red-600" : "bg-stone-100 text-stone-600")}>{post.tag}</span>
                           </div>
                         )}
                         
                         {/* Title / Body */}
                         {post.title && <h5 className="font-bold text-stone-900 mb-1 leading-tight group-hover:text-amber-600 transition-colors">{post.title}</h5>}
                         <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">{post.desc}</p>
                         
                         {/* Footer Actions */}
                         <div className="flex items-center justify-between mt-3 text-[10px] text-stone-400">
                            {post.type !== 'social' ? (
                               <span>{post.time}</span>
                            ) : (
                               <div className="flex gap-3">
                                  <span className="flex items-center gap-1 hover:text-red-500 transition-colors"><Heart className="w-3 h-3" /> {post.likes}</span>
                                  <span className="flex items-center gap-1 hover:text-blue-500 transition-colors"><MessageCircle className="w-3 h-3" /> {post.comments}</span>
                               </div>
                            )}
                            
                            <div className="flex gap-2">
                               {post.type !== 'alert' && (
                                  <button 
                                    className="hover:text-amber-500 transition-colors"
                                    onClick={(e) => { e.stopPropagation(); toast.success("Saved to bookmarks"); }}
                                  >
                                    <Star className="w-3 h-3" />
                                  </button>
                               )}
                               <button 
                                 className="hover:text-blue-500 transition-colors"
                                 onClick={(e) => { 
                                     e.stopPropagation(); 
                                     if (navigator.share) navigator.share({ title: post.title || post.desc, text: post.desc }).catch(()=>{});
                                     else toast.success("Shared via message"); 
                                 }}
                               >
                                 <Share2 className="w-3 h-3" />
                               </button>
                            </div>
                         </div>
                      </CardContent>
                   </Card>
                 ))}
              </div>
            </div>

            {/* === CURATED COLLECTIONS === */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wider">Curated For You</h4>
              <div className="grid grid-cols-2 gap-3">
                 {[
                   { name: "Study Spots", count: "12 Places", icon: Coffee, color: "bg-emerald-100 text-emerald-700" },
                   { name: "Late Night", count: "8 Places", icon: Moon, color: "bg-indigo-100 text-indigo-700" },
                   { name: "Art Galleries", count: "5 Places", icon: TrendingUp, color: "bg-rose-100 text-rose-700" },
                   { name: "Hiking Trails", count: "4 Places", icon: MapPin, color: "bg-amber-100 text-amber-700" },
                 ].map((col, i) => (
                   <div 
                     key={i} 
                     className="p-3 bg-white border border-stone-200 rounded-xl flex items-center gap-3 hover:bg-stone-50 cursor-pointer transition-colors group"
                     onClick={() => handleCollectionClick(col.name)}
                   >
                      <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform", col.color)}>
                         <col.icon className="w-5 h-5" />
                      </div>
                      <div className="overflow-hidden">
                         <p className="font-bold text-stone-900 text-xs truncate group-hover:text-amber-600 transition-colors">{col.name}</p>
                         <p className="text-[10px] text-stone-500 truncate">{col.count}</p>
                      </div>
                   </div>
                 ))}
              </div>
            </div>

          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}