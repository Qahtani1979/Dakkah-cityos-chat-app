import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { MapPin, Mail, Calendar, Link as LinkIcon, Twitter, Linkedin, Github } from "lucide-react";

interface ProfileDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    user: any;
}

export function ProfileDialog({ open, onOpenChange, user }: ProfileDialogProps) {
    if (!user) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[380px] p-0 overflow-hidden bg-white/95 backdrop-blur-xl border-stone-200">
                <DialogHeader className="sr-only">
                    <DialogTitle>User Profile: {user.name}</DialogTitle>
                    <DialogDescription>Profile details and actions for {user.name}</DialogDescription>
                </DialogHeader>
                <div className="h-32 bg-gradient-to-r from-stone-200 to-stone-300 relative">
                    <div className="absolute -bottom-12 left-6">
                        <Avatar className="h-24 w-24 border-4 border-white shadow-sm">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback className="text-2xl bg-stone-100">{user.name?.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
                
                <div className="pt-14 px-6 pb-6">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h2 className="text-xl font-bold text-stone-900">{user.name}</h2>
                            <p className="text-sm text-stone-500 font-medium">@{user.name?.toLowerCase().replace(/\s/g, '')}</p>
                        </div>
                        <Badge variant="secondary" className="capitalize bg-stone-100 text-stone-600 border-stone-200">
                            {user.role || 'Member'}
                        </Badge>
                    </div>

                    <p className="text-sm text-stone-600 leading-relaxed mb-4">
                        {user.bio || "Exploring the city one step at a time. Lover of coffee, architecture, and hidden gems."}
                    </p>

                    <div className="space-y-2 mb-6">
                        <div className="flex items-center gap-2 text-sm text-stone-500">
                            <MapPin className="w-4 h-4" />
                            <span>Riyadh, Saudi Arabia</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-stone-500">
                            <Mail className="w-4 h-4" />
                            <span>{user.name?.toLowerCase().replace(/\s/g, '.')}@example.com</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-stone-500">
                            <Calendar className="w-4 h-4" />
                            <span>Joined December 2024</span>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Button className="flex-1 bg-stone-900 hover:bg-stone-800">Message</Button>
                        <Button variant="outline" className="flex-1">View Activity</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}