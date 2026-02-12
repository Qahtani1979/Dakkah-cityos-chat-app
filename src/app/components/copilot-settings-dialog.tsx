import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Slider } from "./ui/slider";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Settings, Shield, Brain, Zap, Globe } from "lucide-react";

interface CopilotSettingsDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave?: (settings: any) => void;
}

export function CopilotSettingsDialog({ open, onOpenChange, onSave }: CopilotSettingsDialogProps) {
    const [temperature, setTemperature] = useState([0.7]);
    const [useWeb, setUseWeb] = useState(true);
    const [contextMemory, setContextMemory] = useState(true);
    const [proactive, setProactive] = useState(false);
    const [privacyMode, setPrivacyMode] = useState(false);
    const [model, setModel] = useState("gpt-4o");

    const handleSave = () => {
        onSave?.({
            temperature: temperature[0],
            useWeb,
            contextMemory,
            proactive,
            privacyMode,
            model
        });
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px] p-0 gap-0 overflow-hidden bg-white/95 backdrop-blur-xl border-stone-200">
                <DialogHeader className="p-6 border-b border-stone-100">
                    <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
                        <Settings className="w-5 h-5 text-stone-500" />
                        Copilot Settings
                    </DialogTitle>
                    <DialogDescription className="text-sm text-stone-500">
                        Configure how the Dakkah AI interacts with this group.
                    </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="behavior" className="w-full">
                    <div className="px-6 pt-4">
                        <TabsList className="w-full grid grid-cols-3 bg-stone-100/50">
                            <TabsTrigger value="behavior">Behavior</TabsTrigger>
                            <TabsTrigger value="capabilities">Capabilities</TabsTrigger>
                            <TabsTrigger value="privacy">Privacy</TabsTrigger>
                        </TabsList>
                    </div>

                    <div className="p-6">
                        <TabsContent value="behavior" className="space-y-6 mt-0">
                            <div className="space-y-4">
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <Label className="text-sm font-medium">Creativity Level</Label>
                                        <span className="text-xs text-stone-500 bg-stone-100 px-2 py-1 rounded-md">
                                            {temperature[0] > 0.8 ? "High" : temperature[0] < 0.3 ? "Precise" : "Balanced"} ({temperature[0]})
                                        </span>
                                    </div>
                                    <Slider 
                                        value={temperature} 
                                        max={1} 
                                        step={0.1} 
                                        onValueChange={setTemperature}
                                        className="py-2"
                                    />
                                    <p className="text-xs text-stone-500">
                                        Higher values make the copilot more creative but less predictable.
                                    </p>
                                </div>

                                <div className="flex items-center justify-between space-x-2">
                                    <div className="space-y-0.5">
                                        <Label className="text-base">Proactive Suggestions</Label>
                                        <p className="text-xs text-stone-500">Allow Copilot to suggest ideas without being asked</p>
                                    </div>
                                    <Switch checked={proactive} onCheckedChange={setProactive} />
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="capabilities" className="space-y-6 mt-0">
                             <div className="space-y-4">
                                <div className="flex items-center justify-between space-x-2">
                                    <div className="space-y-0.5">
                                        <div className="flex items-center gap-2">
                                            <Globe className="w-4 h-4 text-stone-400" />
                                            <Label className="text-base">Web Browsing</Label>
                                        </div>
                                        <p className="text-xs text-stone-500">Access real-time information from the internet</p>
                                    </div>
                                    <Switch checked={useWeb} onCheckedChange={setUseWeb} />
                                </div>

                                <div className="flex items-center justify-between space-x-2">
                                    <div className="space-y-0.5">
                                        <div className="flex items-center gap-2">
                                            <Brain className="w-4 h-4 text-stone-400" />
                                            <Label className="text-base">Context Memory</Label>
                                        </div>
                                        <p className="text-xs text-stone-500">Remember details from previous conversations</p>
                                    </div>
                                    <Switch checked={contextMemory} onCheckedChange={setContextMemory} />
                                </div>

                                <div className="space-y-2">
                                    <Label>Model Selection</Label>
                                    <Select value={model} onValueChange={setModel}>
                                        <SelectTrigger className="bg-stone-50 border-stone-200">
                                            <SelectValue placeholder="Select model" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="gpt-4o">Dakkah Neural (Recommended)</SelectItem>
                                            <SelectItem value="gpt-4-turbo">Dakkah Fast</SelectItem>
                                            <SelectItem value="claude-3-opus">Dakkah Reasoning</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="privacy" className="space-y-6 mt-0">
                            <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 flex gap-3">
                                <Shield className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                                <div className="space-y-1">
                                    <h4 className="font-medium text-amber-900 text-sm">Data Protection</h4>
                                    <p className="text-xs text-amber-700/80 leading-relaxed">
                                        Dakkah ensures your conversation data is encrypted. Adjusting these settings may limit personalization.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between space-x-2">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Incognito Mode</Label>
                                    <p className="text-xs text-stone-500">Don't save history or learn from this chat</p>
                                </div>
                                <Switch checked={privacyMode} onCheckedChange={setPrivacyMode} />
                            </div>
                        </TabsContent>
                    </div>
                </Tabs>

                <DialogFooter className="p-4 border-t border-stone-100 bg-stone-50/30">
                    <Button variant="outline" onClick={() => onOpenChange(false)} className="mr-2">Cancel</Button>
                    <Button onClick={handleSave} className="bg-stone-900 hover:bg-stone-800">Save Changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
