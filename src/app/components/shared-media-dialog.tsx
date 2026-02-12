import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Image, FileText, Music, Link } from "lucide-react";
import type { Message } from "../types/copilot";

interface SharedMediaDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    messages: Message[];
}

export function SharedMediaDialog({ open, onOpenChange, messages }: SharedMediaDialogProps) {
    // Extract media from messages
    // In a real app, this would query a dedicated media table or filter properly
    // For now, we'll simulate finding media from artifacts or message content
    
    const mediaItems = messages.flatMap(m => {
        const items = [];
        // Check artifacts
        if (m.artifacts) {
            m.artifacts.forEach(a => {
                 if (a.type === 'poi-carousel' && Array.isArray(a.data)) {
                     a.data.forEach((poi: any) => {
                         if (poi.image) items.push({ type: 'image', src: poi.image, title: poi.name, date: m.timestamp });
                     });
                 }
                 if (a.type === 'event-carousel' && Array.isArray(a.data)) {
                     a.data.forEach((evt: any) => {
                         if (evt.image) items.push({ type: 'image', src: evt.image, title: evt.name, date: m.timestamp });
                     });
                 }
                 if (a.type === 'media-player' && a.data) {
                      items.push({ type: 'audio', src: a.data.cover, title: a.data.title, artist: a.data.artist, date: m.timestamp });
                 }
            });
        }
        return items;
    });

    const images = mediaItems.filter(i => i.type === 'image');
    const audio = mediaItems.filter(i => i.type === 'audio');
    
    // Fallback if no media found for demo
    const hasMedia = mediaItems.length > 0;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
             <DialogContent className="sm:max-w-[600px] h-[500px] p-0 gap-0 overflow-hidden bg-white/95 backdrop-blur-xl border-stone-200 flex flex-col">
                <DialogHeader className="p-4 border-b border-stone-100 flex-shrink-0">
                    <DialogTitle className="flex items-center gap-2 text-lg">
                        <Image className="w-5 h-5 text-stone-500" />
                        Shared Media
                    </DialogTitle>
                    <DialogDescription className="sr-only">
                        Gallery of shared photos, videos, files, and links from the conversation.
                    </DialogDescription>
                </DialogHeader>
                
                <Tabs defaultValue="media" className="w-full flex-1 flex flex-col overflow-hidden">
                    <div className="px-4 pt-2 flex-shrink-0">
                         <TabsList className="grid grid-cols-3 w-full bg-stone-100">
                            <TabsTrigger value="media">Media ({images.length})</TabsTrigger>
                            <TabsTrigger value="files">Files (0)</TabsTrigger>
                            <TabsTrigger value="links">Links (0)</TabsTrigger>
                        </TabsList>
                    </div>

                    <div className="flex-1 overflow-hidden p-0">
                        <TabsContent value="media" className="h-full mt-0">
                            <ScrollArea className="h-full p-4">
                                {images.length > 0 ? (
                                    <div className="grid grid-cols-3 gap-2">
                                        {images.map((item, i) => (
                                            <div key={i} className="aspect-square relative rounded-lg overflow-hidden group cursor-pointer">
                                                <img src={item.src} alt={item.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full text-stone-400 gap-2">
                                        <Image className="w-10 h-10 opacity-20" />
                                        <p className="text-sm">No photos or videos shared yet</p>
                                    </div>
                                )}
                                
                                {audio.length > 0 && (
                                    <div className="mt-6">
                                        <h4 className="text-sm font-medium text-stone-500 mb-3 uppercase tracking-wider text-xs">Audio</h4>
                                        <div className="space-y-2">
                                            {audio.map((item, i) => (
                                                <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-stone-50 border border-stone-100">
                                                    <div className="w-10 h-10 rounded bg-stone-200 overflow-hidden shrink-0">
                                                        <img src={item.src} className="w-full h-full object-cover" />
                                                    </div>
                                                    <div className="overflow-hidden">
                                                        <p className="font-medium text-sm truncate">{item.title}</p>
                                                        <p className="text-xs text-stone-500 truncate">{item.artist}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </ScrollArea>
                        </TabsContent>
                        
                        <TabsContent value="files" className="h-full mt-0">
                             <div className="flex flex-col items-center justify-center h-full text-stone-400 gap-2">
                                <FileText className="w-10 h-10 opacity-20" />
                                <p className="text-sm">No documents shared yet</p>
                            </div>
                        </TabsContent>

                        <TabsContent value="links" className="h-full mt-0">
                             <div className="flex flex-col items-center justify-center h-full text-stone-400 gap-2">
                                <Link className="w-10 h-10 opacity-20" />
                                <p className="text-sm">No links shared yet</p>
                            </div>
                        </TabsContent>
                    </div>
                </Tabs>
             </DialogContent>
        </Dialog>
    );
}
