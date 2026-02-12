import { useState } from 'react';
import { User, Activity, CheckCircle2, BookOpen, Clock, Calendar } from 'lucide-react';
import { Button } from '../../ui/button';
import { Progress } from '../../ui/progress';

interface ActionProps {
  onAction?: (action: string, payload?: any) => void;
}

// 1. Symptom Triage (Block - Interactive)
export function SymptomTriage({ data, onAction }: { data: any } & ActionProps) {
  const [selectedPart, setSelectedPart] = useState<string | null>(null);

  // Simple coordinate map for "Head", "Chest", "Stomach", "Legs"
  // This is a simplified visual representation using CSS grid instead of complex SVG for speed
  const parts = [
      { id: 'head', label: 'Head / Neck', color: 'bg-rose-100 text-rose-700' },
      { id: 'chest', label: 'Chest / Heart', color: 'bg-orange-100 text-orange-700' },
      { id: 'stomach', label: 'Stomach / GI', color: 'bg-amber-100 text-amber-700' },
      { id: 'arms', label: 'Arms / Joints', color: 'bg-blue-100 text-blue-700' },
      { id: 'legs', label: 'Legs / Feet', color: 'bg-indigo-100 text-indigo-700' },
  ];

  return (
    <div className="bg-white rounded-xl border border-stone-200 overflow-hidden w-full max-w-sm">
       <div className="bg-stone-50 p-3 border-b border-stone-200">
           <h4 className="text-xs font-bold text-stone-900">Symptom Checker</h4>
           <p className="text-[10px] text-stone-500">Tap the area where you feel pain</p>
       </div>
       
       <div className="p-4 grid gap-2">
           {parts.map(part => (
               <button 
                  key={part.id}
                  onClick={() => { setSelectedPart(part.id); onAction?.('symptom_select', part.id); }}
                  className={`p-3 rounded-lg text-left text-xs font-medium transition-all flex justify-between items-center ${selectedPart === part.id ? 'ring-2 ring-stone-900 ' + part.color : 'bg-stone-50 text-stone-600 hover:bg-stone-100'}`}
               >
                   {part.label}
                   {selectedPart === part.id && <CheckCircle2 className="w-3.5 h-3.5" />}
               </button>
           ))}
       </div>
       
       {selectedPart && (
           <div className="p-3 border-t border-stone-100 bg-stone-50 animate-in slide-in-from-bottom-2">
               <p className="text-[10px] text-stone-500 mb-2">Selected: <span className="font-bold text-stone-900 capitalize">{selectedPart}</span></p>
               <Button className="w-full h-8 text-xs bg-stone-900 text-white" onClick={() => onAction?.('confirm_symptom', selectedPart)}>
                   Continue Assessment
               </Button>
           </div>
       )}
    </div>
  );
}

// 2. Lesson Tracker (Inline)
export function LessonTracker({ data }: { data: any }) {
  return (
    <div className="bg-white rounded-xl p-3 border border-stone-200 w-full max-w-xs">
       <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white shrink-0 shadow-sm">
             <BookOpen className="w-5 h-5" />
          </div>
          <div>
             <h4 className="text-xs font-bold text-stone-900 line-clamp-1">{data.courseName}</h4>
             <p className="text-[10px] text-stone-500">{data.moduleName}</p>
          </div>
       </div>

       <div className="flex items-center gap-2 mb-1.5">
           <Progress value={data.progress} className="h-1.5 bg-stone-100" />
           <span className="text-[10px] font-bold text-indigo-600 w-8 text-right">{data.progress}%</span>
       </div>
       
       <div className="flex justify-between text-[9px] text-stone-400">
          <span>{data.completedSteps}/{data.totalSteps} Lessons</span>
          <span className="flex items-center gap-0.5"><Clock className="w-2.5 h-2.5" /> {data.timeLeft} left</span>
       </div>
    </div>
  );
}

// 3. Service Quote Builder (Block)
export function ServiceQuoteBuilder({ data, onAction }: { data: any } & ActionProps) {
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  if (!data) return null;

  const toggleAddon = (id: string) => {
      setSelectedAddons(prev => 
          prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
      );
  };

  const addons = data.addons || [];
  const basePrice = data.basePrice || data.base || 0;
  const addonsTotal = addons
      .filter((a: any) => selectedAddons.includes(a.id))
      .reduce((sum: number, a: any) => sum + a.price, 0);
  
  const total = basePrice + addonsTotal;

  return (
    <div className="bg-white rounded-xl border border-stone-200 w-full max-w-sm overflow-hidden">
        <div className="bg-stone-900 text-white p-4">
            <h4 className="text-sm font-bold">{data.serviceName || data.service}</h4>
            <p className="text-[11px] text-stone-400">Customize your package</p>
        </div>
        
        <div className="p-4 space-y-3">
            <div className="flex justify-between text-xs font-medium pb-2 border-b border-stone-100">
                <span>Base Service</span>
                <span>${basePrice}</span>
            </div>
            
            <div className="space-y-2">
                <p className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">Recommended Add-ons</p>
                {addons.length === 0 && <p className="text-xs text-stone-400 italic">No add-ons available</p>}
                {addons.map((addon: any) => (
                    <div 
                        key={addon.id} 
                        className={`flex items-center justify-between p-2 rounded-lg border cursor-pointer transition-all ${selectedAddons.includes(addon.id) ? 'bg-blue-50 border-blue-200 shadow-sm' : 'bg-white border-stone-200 hover:bg-stone-50'}`}
                        onClick={() => toggleAddon(addon.id)}
                    >
                        <div className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded border flex items-center justify-center ${selectedAddons.includes(addon.id) ? 'bg-blue-500 border-blue-500 text-white' : 'bg-white border-stone-300'}`}>
                                {selectedAddons.includes(addon.id) && <CheckCircle2 className="w-3 h-3" />}
                            </div>
                            <span className="text-xs text-stone-700">{addon.name}</span>
                        </div>
                        <span className="text-xs font-medium text-stone-900">+${addon.price}</span>
                    </div>
                ))}
            </div>
            
            <div className="pt-3 mt-1 border-t border-stone-100 flex items-center justify-between">
                <div>
                    <p className="text-[10px] text-stone-400">Estimated Total</p>
                    <p className="text-xl font-bold text-stone-900">${total}</p>
                </div>
                <Button className="h-9 px-6 bg-stone-900 text-white text-xs" onClick={() => onAction?.('book_service', { id: data.id, addons: selectedAddons, total })}>
                    Book Now
                </Button>
            </div>
        </div>
    </div>
  );
}
