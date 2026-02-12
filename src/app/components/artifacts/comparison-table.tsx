import { Card } from '../ui/card';
import type { ComparisonItem } from '../../types/copilot';

interface ComparisonTableProps {
  data: {
    items: ComparisonItem[];
  } | ComparisonItem[];
}

export function ComparisonTable({ data }: ComparisonTableProps) {
  const items = Array.isArray(data) ? data : data?.items || [];
  
  if (items.length === 0) return null;

  const firstItem = items[0];
  if (!firstItem || !firstItem.values) return null;

  const columns = Object.keys(firstItem.values);

  return (
    <Card className="bg-white border-stone-100 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-stone-100 bg-stone-50/50">
              <th className="text-left p-4 text-xs font-semibold text-stone-500 uppercase tracking-wider">Name</th>
              {columns.map((col) => (
                <th key={col} className="text-left p-4 text-xs font-semibold text-stone-500 uppercase tracking-wider">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr
                key={index}
                className="border-b border-stone-50 last:border-0 hover:bg-stone-50/80 transition-colors cursor-pointer"
              >
                <td className="p-4 text-sm font-medium text-stone-900">{item.name}</td>
                {columns.map((col) => (
                  <td key={col} className="p-4 text-sm text-stone-600">
                    {item.values[col]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
