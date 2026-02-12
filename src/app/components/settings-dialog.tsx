import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./ui/select";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { useAuth } from "../context/auth-context";
import { User, Settings, Bell, Shield, Globe, Moon, Sun, Monitor } from "lucide-react";
import { Separator } from "./ui/separator";
import { toast } from "sonner";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTab?: string;
}

export function SettingsDialog({ open, onOpenChange, defaultTab = "profile" }: SettingsDialogProps) {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setActiveTab(defaultTab);
    }
  }, [open, defaultTab]);

  const handleSave = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Settings saved successfully");
      onOpenChange(false);
    }, 800);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col p-0 overflow-hidden gap-0 border-stone-200">
        <VisuallyHidden>
            <DialogTitle>Settings</DialogTitle>
            <DialogDescription>Manage your application settings and preferences</DialogDescription>
        </VisuallyHidden>
        <div className="flex h-full">
            {/* Sidebar */}
            <div className="w-64 bg-stone-50 border-r border-stone-200 p-4 shrink-0 flex flex-col">
                <div className="mb-6 px-2">
                    <h2 className="text-lg font-bold text-stone-900">Settings</h2>
                    <p className="text-xs text-stone-500">Manage your preferences</p>
                </div>
                
                <Tabs value={activeTab} onValueChange={setActiveTab} orientation="vertical" className="flex-col h-full w-full gap-0">
                    <TabsList className="flex flex-col h-auto bg-transparent space-y-1 p-0 justify-start w-full">
                        <TabsTrigger 
                            value="profile" 
                            className="w-full justify-start px-3 py-2 h-auto text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-stone-900 text-stone-600 rounded-lg hover:bg-stone-100 transition-all mb-1"
                        >
                             <User className="w-4 h-4 mr-2" /> Profile & Identity
                        </TabsTrigger>
                        <TabsTrigger 
                            value="general" 
                            className="w-full justify-start px-3 py-2 h-auto text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-stone-900 text-stone-600 rounded-lg hover:bg-stone-100 transition-all mb-1"
                        >
                             <Settings className="w-4 h-4 mr-2" /> General
                        </TabsTrigger>
                        <TabsTrigger 
                            value="notifications" 
                            className="w-full justify-start px-3 py-2 h-auto text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-stone-900 text-stone-600 rounded-lg hover:bg-stone-100 transition-all mb-1"
                        >
                             <Bell className="w-4 h-4 mr-2" /> Notifications
                        </TabsTrigger>
                        <TabsTrigger 
                            value="privacy" 
                            className="w-full justify-start px-3 py-2 h-auto text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-stone-900 text-stone-600 rounded-lg hover:bg-stone-100 transition-all mb-1"
                        >
                             <Shield className="w-4 h-4 mr-2" /> Privacy
                        </TabsTrigger>
                        <TabsTrigger 
                            value="language" 
                            className="w-full justify-start px-3 py-2 h-auto text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-stone-900 text-stone-600 rounded-lg hover:bg-stone-100 transition-all mb-1"
                        >
                             <Globe className="w-4 h-4 mr-2" /> Language
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            {/* Content Area */}
            <div className="flex-1 bg-white overflow-hidden flex flex-col">
                <div className="flex-1 overflow-y-auto p-6 md:p-8">
                    {/* Render content manually based on activeTab because TabsContent behaves as siblings usually, but we want one container */}
                    {activeTab === 'profile' && (
                        <div className="space-y-6 animate-in fade-in duration-300">
                            <div>
                                <h3 className="text-xl font-semibold text-stone-900">Profile & Identity</h3>
                                <p className="text-sm text-stone-500">Manage your public profile and personal details.</p>
                            </div>
                            <Separator />
                            
                            <div className="flex items-center gap-6">
                                <Avatar className="h-20 w-20 border-2 border-stone-100">
                                    <AvatarImage src={user?.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${user?.email}`} />
                                    <AvatarFallback>{user?.email?.[0]?.toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <div className="space-y-2">
                                    <Button variant="outline" size="sm">Change Avatar</Button>
                                    <p className="text-xs text-stone-500">JPG, GIF or PNG. 1MB max.</p>
                                </div>
                            </div>

                            <div className="grid gap-4 max-w-md">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Display Name</Label>
                                    <Input id="name" defaultValue={user?.user_metadata?.name || ""} placeholder="Your name" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input id="email" defaultValue={user?.email || ""} disabled className="bg-stone-50" />
                                    <p className="text-[10px] text-stone-500">Email cannot be changed.</p>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="bio">Bio</Label>
                                    <Input id="bio" placeholder="Tell us about yourself" />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'general' && (
                        <div className="space-y-6 animate-in fade-in duration-300">
                            <div>
                                <h3 className="text-xl font-semibold text-stone-900">General Settings</h3>
                                <p className="text-sm text-stone-500">Customize your interface experience.</p>
                            </div>
                            <Separator />

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label className="text-base">Appearance</Label>
                                        <p className="text-sm text-stone-500">Select your preferred theme.</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4 max-w-md">
                                    <div className="border-2 border-stone-900 rounded-lg p-2 space-y-2 cursor-pointer bg-stone-50">
                                        <div className="h-20 bg-white border border-stone-200 rounded-md"></div>
                                        <div className="flex items-center justify-center gap-2">
                                            <Sun className="w-4 h-4" /> <span className="text-sm font-medium">Light</span>
                                        </div>
                                    </div>
                                    <div className="border border-stone-200 rounded-lg p-2 space-y-2 cursor-pointer opacity-50">
                                        <div className="h-20 bg-stone-900 border border-stone-800 rounded-md"></div>
                                        <div className="flex items-center justify-center gap-2">
                                            <Moon className="w-4 h-4" /> <span className="text-sm font-medium">Dark</span>
                                        </div>
                                    </div>
                                    <div className="border border-stone-200 rounded-lg p-2 space-y-2 cursor-pointer opacity-50">
                                        <div className="h-20 bg-stone-100 border border-stone-200 rounded-md flex items-center justify-center">
                                            <div className="w-1/2 h-full bg-white border-r"></div>
                                            <div className="w-1/2 h-full bg-stone-900"></div>
                                        </div>
                                        <div className="flex items-center justify-center gap-2">
                                            <Monitor className="w-4 h-4" /> <span className="text-sm font-medium">System</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <div className="space-y-6 animate-in fade-in duration-300">
                            <div>
                                <h3 className="text-xl font-semibold text-stone-900">Notifications</h3>
                                <p className="text-sm text-stone-500">Choose what you want to be notified about.</p>
                            </div>
                            <Separator />
                            
                            <div className="space-y-6 max-w-lg">
                                <div className="flex items-center justify-between space-x-2">
                                    <Label htmlFor="email-notifs" className="flex flex-col space-y-1">
                                        <span>Email Notifications</span>
                                        <span className="font-normal text-xs text-stone-500">Receive daily summaries and updates.</span>
                                    </Label>
                                    <Switch id="email-notifs" defaultChecked />
                                </div>
                                <div className="flex items-center justify-between space-x-2">
                                    <Label htmlFor="push-notifs" className="flex flex-col space-y-1">
                                        <span>Push Notifications</span>
                                        <span className="font-normal text-xs text-stone-500">Receive real-time alerts on your device.</span>
                                    </Label>
                                    <Switch id="push-notifs" defaultChecked />
                                </div>
                                <div className="flex items-center justify-between space-x-2">
                                    <Label htmlFor="marketing" className="flex flex-col space-y-1">
                                        <span>Marketing & Tips</span>
                                        <span className="font-normal text-xs text-stone-500">Receive news about new features.</span>
                                    </Label>
                                    <Switch id="marketing" />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'privacy' && (
                        <div className="space-y-6 animate-in fade-in duration-300">
                            <div>
                                <h3 className="text-xl font-semibold text-stone-900">Privacy & Security</h3>
                                <p className="text-sm text-stone-500">Manage your data and security preferences.</p>
                            </div>
                            <Separator />
                            
                            <div className="space-y-6 max-w-lg">
                                <div className="space-y-4">
                                    <h4 className="text-sm font-medium">Security</h4>
                                    <Button variant="outline" className="w-full justify-start">Change Password</Button>
                                    <Button variant="outline" className="w-full justify-start">Enable 2FA</Button>
                                </div>
                                
                                <Separator />
                                
                                <div className="space-y-4">
                                    <h4 className="text-sm font-medium text-red-600">Danger Zone</h4>
                                    <p className="text-xs text-stone-500">Once you delete your account, there is no going back. Please be certain.</p>
                                    <Button variant="destructive" className="w-full justify-start">Delete Account</Button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'language' && (
                        <div className="space-y-6 animate-in fade-in duration-300">
                            <div>
                                <h3 className="text-xl font-semibold text-stone-900">Language</h3>
                                <p className="text-sm text-stone-500">Select your preferred language for the interface.</p>
                            </div>
                            <Separator />
                            
                            <div className="max-w-md space-y-4">
                                <div className="grid gap-2">
                                    <Label>Interface Language</Label>
                                    <Select defaultValue="en">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Language" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="en">English (US)</SelectItem>
                                            <SelectItem value="ar">Arabic</SelectItem>
                                            <SelectItem value="es">Spanish</SelectItem>
                                            <SelectItem value="fr">French</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-2">
                                    <Label>Time Zone</Label>
                                    <Select defaultValue="utc">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Timezone" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="utc">UTC (GMT+0)</SelectItem>
                                            <SelectItem value="est">Eastern Time (GMT-5)</SelectItem>
                                            <SelectItem value="pst">Pacific Time (GMT-8)</SelectItem>
                                            <SelectItem value="sa">Saudi Arabia (GMT+3)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Actions */}
                <div className="p-4 border-t border-stone-200 bg-stone-50 flex justify-end gap-2">
                    <Button variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button onClick={handleSave} disabled={isLoading}>
                        {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                </div>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}