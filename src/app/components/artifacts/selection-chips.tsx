import { Button } from '../ui/button';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils'; // Assuming this exists, or I will use standard classNames

interface SelectionChipsProps {
  data: {
    question: string;
    options: string[];
  };
  onAction?: (action: string) => void;
}

export function SelectionChips({ data, onAction }: SelectionChipsProps) {
  return (
    <div className="space-y-3 pt-2 px-1">
      {data?.question && (
        <motion.p 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-medium text-stone-500 ml-1"
        >
            {data.question}
        </motion.p>
      )}
      <div className="flex flex-wrap gap-2">
        {data?.options?.map((option, idx) => (
          <motion.button
            key={option}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            whileHover={{ scale: 1.02, backgroundColor: "#f5f5f4" }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onAction?.(option)}
            className="h-7 px-3 bg-white border border-stone-200 text-stone-600 text-xs font-medium rounded-full shadow-sm hover:border-stone-300 hover:shadow transition-colors"
          >
            {option}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
