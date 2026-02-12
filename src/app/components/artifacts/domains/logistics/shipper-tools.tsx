import { useState } from 'react';
import { 
  Calculator, Scale, Truck, Activity, Printer, FileText, QrCode, Scan, Camera, Box, Ruler
} from 'lucide-react';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Label } from '../../../ui/label';

interface ActionProps {
  onAction?: (action: string, payload?: any) => void;
}

// 7. Freight Quote Calculator (Inline)
export function FreightQuoteCalculator({ data, onAction }: { data: any } & ActionProps) {
  const [weight, setWeight] = useState(data.defaultWeight || '');
  const [dims, setDims] = useState(data.defaultDims || { l: '', w: '', h: '' });
  const [calculated, setCalculated] = useState(!!data.quotes && data.quotes.length > 0);

  const handleCalculate = () => {
    setCalculated(true);
    onAction?.('calculate_quote', { weight, dims });
  };

  return (
    <div className="bg-white rounded-xl p-4 border border-stone-200 w-full max-w-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
          <Calculator className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-stone-900">Get Shipping Quote</h4>
          <p className="text-[10px] text-stone-500">Instant rates for global delivery</p>
        </div>
      </div>

      {!calculated ? (
        <div className="space-y-3">
          <div className="space-y-1">
            <Label className="text-xs text-stone-600">Weight (kg)</Label>
            <div className="relative">
              <Scale className="absolute left-2.5 top-2.5 w-4 h-4 text-stone-400" />
              <Input 
                type="number" 
                placeholder="0.0" 
                className="pl-9 h-9 text-sm"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            <div className="space-y-1">
              <Label className="text-[10px] text-stone-500">L (cm)</Label>
              <Input className="h-8 text-xs px-2" placeholder="0" value={dims.l} onChange={(e) => setDims({...dims, l: e.target.value})} />
            </div>
            <div className="space-y-1">
              <Label className="text-[10px] text-stone-500">W (cm)</Label>
              <Input className="h-8 text-xs px-2" placeholder="0" value={dims.w} onChange={(e) => setDims({...dims, w: e.target.value})} />
            </div>
            <div className="space-y-1">
              <Label className="text-[10px] text-stone-500">H (cm)</Label>
              <Input className="h-8 text-xs px-2" placeholder="0" value={dims.h} onChange={(e) => setDims({...dims, h: e.target.value})} />
            </div>
          </div>

          <Button className="w-full bg-stone-900 text-white h-9 text-xs mt-2" onClick={handleCalculate}>
            Calculate Rates
          </Button>
        </div>
      ) : (
        <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2">
          {data.quotes?.map((quote: any, i: number) => (
            <div key={i} className="flex items-center justify-between p-2.5 border border-stone-100 rounded-lg hover:border-blue-200 hover:bg-blue-50/50 transition-colors cursor-pointer" onClick={() => onAction?.('select_quote', quote)}>
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${quote.type === 'Express' ? 'bg-amber-100 text-amber-600' : 'bg-stone-100 text-stone-600'}`}>
                   {quote.type === 'Express' ? <Activity className="w-4 h-4" /> : <Truck className="w-4 h-4" />}
                </div>
                <div>
                  <h5 className="text-xs font-bold text-stone-900">{quote.name}</h5>
                  <p className="text-[10px] text-stone-500">{quote.eta}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="block text-sm font-bold text-stone-900">{quote.price}</span>
                <Button variant="ghost" size="sm" className="h-5 text-[10px] px-0 text-blue-600 hover:text-blue-700">Select</Button>
              </div>
            </div>
          ))}
          <Button variant="outline" className="w-full h-8 text-xs" onClick={() => setCalculated(false)}>
            Recalculate
          </Button>
        </div>
      )}
    </div>
  );
}

// 8. Shipment Label Generator (Block)
export function ShipmentLabelGenerator({ data, onAction }: { data: any } & ActionProps) {
  return (
    <div className="bg-white p-4 rounded-xl border border-stone-200 w-full max-w-sm shadow-sm">
      <div className="border-2 border-stone-900 rounded-lg p-4 relative overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="text-2xl font-black tracking-tighter text-stone-900">DAKKAH</div>
          <div className="text-4xl font-black text-stone-900">{data.serviceLevel || 'STD'}</div>
        </div>

        {/* Addresses */}
        <div className="grid grid-cols-2 gap-4 mb-6 text-xs font-mono">
          <div>
            <span className="text-[10px] text-stone-400 uppercase block mb-1">From:</span>
            <p className="font-bold">{data.sender.name}</p>
            <p>{data.sender.address}</p>
            <p>{data.sender.city}</p>
          </div>
          <div>
            <span className="text-[10px] text-stone-400 uppercase block mb-1">To:</span>
            <p className="font-bold">{data.receiver.name}</p>
            <p>{data.receiver.address}</p>
            <p>{data.receiver.city}</p>
          </div>
        </div>

        {/* Barcode Section */}
        <div className="border-t-2 border-stone-900 pt-4 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] text-stone-400 uppercase">Tracking Number</span>
            <p className="font-mono text-sm font-bold tracking-widest">{data.trackingNumber}</p>
            {/* Fake Barcode Lines */}
            <div className="h-8 flex items-end gap-[2px] mt-1">
               {Array.from({ length: 30 }).map((_, i) => (
                 <div key={i} className="bg-stone-900 w-1" style={{ height: `${Math.max(40, Math.random() * 100)}%` }}></div>
               ))}
            </div>
          </div>
          <div className="w-16 h-16 bg-stone-900 text-white flex items-center justify-center p-1">
            <QrCode className="w-full h-full" />
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <Button className="flex-1 bg-stone-900 text-white" onClick={() => onAction?.('print_label', { id: data.id })}>
          <Printer className="w-4 h-4 mr-2" /> Print Label
        </Button>
        <Button variant="outline" className="flex-1" onClick={() => onAction?.('share_label', { id: data.id })}>
          <FileText className="w-4 h-4 mr-2" /> Email PDF
        </Button>
      </div>
    </div>
  );
}

// 16. AR Package Sizer (Block)
export function ArPackageSizer({ data, onAction }: { data: any } & ActionProps) {
  const [step, setStep] = useState<'scan' | 'result'>('scan');

  return (
    <div className="bg-stone-900 rounded-xl overflow-hidden w-full max-w-sm relative h-96 border border-stone-800">
      {step === 'scan' ? (
        <>
          {/* Simulated Camera Feed */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&q=80&w=400')] bg-cover bg-center opacity-50"></div>
          
          {/* AR Overlay UI */}
          <div className="absolute inset-0 flex flex-col items-center justify-between p-6">
            <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/10">
              <Scan className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span className="text-xs font-mono text-white">Detecting Object...</span>
            </div>

            {/* Bounding Box Animation */}
            <div className="w-48 h-48 border-2 border-emerald-400 rounded-lg relative flex items-center justify-center">
              <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-emerald-400 -mt-1 -ml-1"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-emerald-400 -mt-1 -mr-1"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-emerald-400 -mb-1 -ml-1"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-emerald-400 -mb-1 -mr-1"></div>
              <div className="w-full h-0.5 bg-emerald-400/50 absolute top-1/2 animate-ping"></div>
              <span className="bg-emerald-500 text-black text-[10px] font-bold px-1 rounded absolute -bottom-6">
                {data.detectedItem || "Box"}
              </span>
            </div>

            <Button 
              className="w-full bg-white text-black hover:bg-stone-200"
              onClick={() => setStep('result')}
            >
              <Camera className="w-4 h-4 mr-2" /> Capture Dimensions
            </Button>
          </div>
        </>
      ) : (
        <div className="h-full bg-white p-6 flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <Ruler className="w-5 h-5 text-stone-900" />
            <h4 className="text-sm font-bold text-stone-900">Measurement Result</h4>
          </div>

          <div className="flex-1 flex items-center justify-center mb-6">
             <div className="relative w-32 h-32 bg-stone-100 border-2 border-stone-900 border-dashed rounded-lg flex items-center justify-center">
                <Box className="w-12 h-12 text-stone-300" />
                
                {/* Dimension Lines */}
                <div className="absolute -top-6 w-full text-center text-xs font-mono text-stone-500 border-b border-stone-300 pb-1">{data.dimensions.l}cm</div>
                <div className="absolute -right-8 h-full flex items-center text-xs font-mono text-stone-500 border-l border-stone-300 pl-1">{data.dimensions.h}cm</div>
             </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-lg mb-4">
            <p className="text-[10px] uppercase text-emerald-600 font-bold mb-1">Recommended Packaging</p>
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-emerald-900">{data.recommendation.boxType}</span>
              <span className="text-xs text-emerald-700">{data.recommendation.price}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" onClick={() => setStep('scan')}>Retake</Button>
            <Button className="bg-stone-900 text-white" onClick={() => onAction?.('add_box_to_cart', data.recommendation)}>Add Box</Button>
          </div>
        </div>
      )}
    </div>
  );
}