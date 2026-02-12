import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  CreditCard, Receipt, User, MapPin, Phone, MessageSquare, 
  Cloud, Sun, CloudRain, AlertTriangle, FileText, CheckCircle2, 
  Car, Navigation, ThumbsUp, PieChart, Clock, ShieldCheck 
} from 'lucide-react';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';

// --- Types ---

interface ActionProps {
  onAction?: (action: string, payload?: any) => void;
}

// --- 1. Payment Request Card ---

export function PaymentRequest({ data, onAction }: { data: any } & ActionProps) {
  const [paid, setPaid] = useState(data.status === 'paid');

  const handlePay = () => {
    setPaid(true);
    onAction?.('pay_request', { id: data.id, amount: data.amount });
  };

  return (
    <div className="bg-stone-50 rounded-xl p-3 border border-stone-200 w-full max-w-xs">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-stone-900 flex items-center justify-center text-white">
            <CreditCard className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-semibold text-stone-900">{data.merchant || "Payment Request"}</p>
            <p className="text-[10px] text-stone-500">{data.description}</p>
          </div>
        </div>
        <span className="text-sm font-bold text-stone-900">${data.amount}</span>
      </div>
      
      {paid ? (
        <div className="flex items-center justify-center gap-1.5 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-100">
          <CheckCircle2 className="w-4 h-4" />
          <span className="text-xs font-semibold">Paid</span>
        </div>
      ) : (
        <Button 
          className="w-full h-8 text-xs bg-black hover:bg-stone-800 text-white" 
          onClick={handlePay}
        >
          Pay with Apple Pay
        </Button>
      )}
    </div>
  );
}

// --- 2. Ride Status Card (Uber Style) ---

export function RideStatus({ data, onAction }: { data: any } & ActionProps) {
  return (
    <div className="bg-white rounded-xl border border-stone-200 overflow-hidden w-full max-w-sm shadow-sm">
      {/* Map Placeholder */}
      <div className="h-24 bg-stone-100 relative w-full overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:8px_8px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Car className="w-6 h-6 text-stone-400" />
        </div>
        <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur px-2 py-0.5 rounded text-[10px] font-bold shadow-sm">
          {data.eta || "5 min"} away
        </div>
      </div>
      
      <div className="p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="w-10 h-10 border border-stone-100">
            <AvatarImage src={data.driverAvatar} />
            <AvatarFallback>{data.driverName?.[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-xs font-bold text-stone-900">{data.driverName}</p>
            <div className="flex items-center gap-1 text-[10px] text-stone-500">
              <span className="font-medium text-stone-700">{data.carModel}</span>
              <span>•</span>
              <span className="bg-stone-100 px-1 rounded text-stone-600 font-mono">{data.licensePlate}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-1">
          <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full bg-stone-50 text-stone-600">
            <Phone className="w-4 h-4" />
          </Button>
          <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full bg-stone-50 text-stone-600">
            <MessageSquare className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

// --- 3. Profile Card (Social) ---

export function ProfileCard({ data, onAction }: { data: any } & ActionProps) {
  return (
    <div className="bg-white rounded-xl p-3 border border-stone-200 flex items-center gap-3 max-w-xs shadow-sm">
      <Avatar className="w-12 h-12">
        <AvatarImage src={data.avatar} />
        <AvatarFallback>{data.name?.[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-bold text-stone-900 truncate">{data.name}</h4>
        <p className="text-xs text-stone-500 truncate">{data.role || "Citizen"}</p>
        <div className="flex gap-2 mt-1.5">
           <Button size="sm" variant="outline" className="h-6 text-[10px] px-2 h-auto py-0.5" onClick={() => onAction?.('view_profile', data)}>
              View
           </Button>
           <Button size="sm" className="h-6 text-[10px] px-2 h-auto py-0.5" onClick={() => onAction?.('add_contact', data)}>
              Connect
           </Button>
        </div>
      </div>
    </div>
  );
}

// --- 4. Weather Card ---

export function WeatherCard({ data }: { data: any }) {
  const isRain = data.condition?.toLowerCase().includes('rain');
  const Icon = isRain ? CloudRain : (data.condition?.toLowerCase().includes('cloud') ? Cloud : Sun);
  
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-3 border border-blue-100 flex items-center justify-between max-w-[200px]">
      <div>
        <div className="flex items-center gap-1.5 mb-0.5">
          <Icon className="w-4 h-4 text-blue-600" />
          <span className="text-xs font-semibold text-blue-900">{data.condition}</span>
        </div>
        <p className="text-[10px] text-blue-600 font-medium">{data.location}</p>
      </div>
      <div className="text-2xl font-bold text-blue-900">
        {data.temp}°
      </div>
    </div>
  );
}

// --- 5. Poll Card (Voting) ---

export function PollCard({ data, onAction }: { data: any } & ActionProps) {
  const [voted, setVoted] = useState<string | null>(null);
  
  const options = data?.options || [];
  // Calculate percentages
  const totalVotes = options.reduce((acc: number, opt: any) => acc + (opt.votes || 0) + (voted === opt.id ? 1 : 0), 0);

  return (
    <div className="bg-white rounded-xl p-3 border border-stone-200 w-full max-w-sm">
      <div className="flex items-start gap-2 mb-3">
        <PieChart className="w-4 h-4 text-stone-400 mt-0.5" />
        <h4 className="text-sm font-semibold text-stone-900">{data?.question || 'Poll'}</h4>
      </div>
      
      <div className="space-y-2">
        {options.map((opt: any, index: number) => {
          const count = (opt.votes || 0) + (voted === opt.id ? 1 : 0);
          const percent = totalVotes === 0 ? 0 : Math.round((count / totalVotes) * 100);
          const id = opt.id || index;
          
          return (
            <div 
                key={id} 
                className={`relative rounded-lg border overflow-hidden cursor-pointer transition-colors ${voted === opt.id ? 'border-blue-200 bg-blue-50/50' : 'border-stone-200 hover:bg-stone-50'}`}
                onClick={() => {
                    if (!voted) {
                        setVoted(opt.id);
                        onAction?.('vote', { pollId: data.id, optionId: opt.id });
                    }
                }}
            >
              {/* Progress Bar Background */}
              {voted && (
                  <div 
                    className="absolute inset-y-0 left-0 bg-blue-100/50 transition-all duration-500" 
                    style={{ width: `${percent}%` }}
                  />
              )}
              
              <div className="relative p-2 flex justify-between items-center z-10">
                <span className={`text-xs font-medium ${voted === opt.id ? 'text-blue-700' : 'text-stone-700'}`}>
                    {opt.label}
                </span>
                {voted && (
                    <span className="text-[10px] font-bold text-stone-500">
                        {percent}%
                    </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-2 text-[10px] text-stone-400 text-right">
        {totalVotes} votes • {voted ? 'You voted' : 'Tap to vote'}
      </div>
    </div>
  );
}

// --- 6. Alert Card (Critical) ---

export function AlertCard({ data }: { data: any }) {
  const isCritical = data.severity === 'critical';
  
  return (
    <div className={`rounded-xl p-3 border flex gap-3 max-w-sm ${isCritical ? 'bg-rose-50 border-rose-100' : 'bg-amber-50 border-amber-100'}`}>
      <div className={`p-2 rounded-full h-fit ${isCritical ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-600'}`}>
        <AlertTriangle className="w-4 h-4" />
      </div>
      <div>
        <h4 className={`text-xs font-bold mb-0.5 ${isCritical ? 'text-rose-900' : 'text-amber-900'}`}>{data.title}</h4>
        <p className={`text-[11px] leading-snug ${isCritical ? 'text-rose-700' : 'text-amber-700'}`}>{data.message}</p>
      </div>
    </div>
  );
}

// --- 7. Document Card ---

export function DocumentCard({ data, onAction }: { data: any } & ActionProps) {
  return (
    <div 
        className="group bg-white rounded-xl p-2 pr-3 border border-stone-200 flex items-center gap-3 max-w-xs hover:border-blue-200 hover:shadow-sm transition-all cursor-pointer"
        onClick={() => onAction?.('open_document', data)}
    >
      <div className="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center text-stone-500 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
        <FileText className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-xs font-bold text-stone-900 truncate">{data.filename}</h4>
        <div className="flex items-center gap-1.5 text-[10px] text-stone-400">
           <span>{data.size || "PDF"}</span>
           {data.signed && (
               <span className="flex items-center gap-0.5 text-emerald-600 bg-emerald-50 px-1 rounded">
                   <ShieldCheck className="w-3 h-3" /> Signed
               </span>
           )}
        </div>
      </div>
      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <Button size="sm" variant="ghost" className="h-6 w-6 p-0 rounded-full">
            <Navigation className="w-3 h-3 text-stone-400 rotate-90" />
          </Button>
      </div>
    </div>
  );
}

// --- 8. Receipt Card ---

export function ReceiptCard({ data }: { data: any }) {
  return (
    <div className="bg-white rounded-xl border border-stone-200 w-full max-w-xs overflow-hidden">
      <div className="bg-stone-50 border-b border-stone-100 p-3 flex justify-between items-center">
         <div className="flex items-center gap-1.5 text-stone-500">
             <Receipt className="w-3.5 h-3.5" />
             <span className="text-[10px] font-mono uppercase tracking-wider">Receipt</span>
         </div>
         <span className="text-[10px] text-stone-400 font-mono">#{data.orderId?.slice(-6) || '82910'}</span>
      </div>
      <div className="p-4 space-y-3">
         {data.items?.map((item: any, i: number) => (
             <div key={i} className="flex justify-between text-xs">
                 <span className="text-stone-600"><span className="text-stone-400 mr-1">{item.qty}x</span> {item.name}</span>
                 <span className="text-stone-900 font-medium">${item.price}</span>
             </div>
         ))}
         <div className="border-t border-dashed border-stone-200 my-2"></div>
         <div className="flex justify-between items-center">
             <span className="text-xs font-bold text-stone-900">Total</span>
             <span className="text-sm font-bold text-stone-900">${data.total}</span>
         </div>
      </div>
    </div>
  );
}
