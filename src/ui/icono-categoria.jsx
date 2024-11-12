import { Coffee, Pizza, Sandwich, Cake } from 'lucide-react';

export default function CategoryIcon({ category, className = 'w-4 h-4' }) {
  const categories = {
    desayuno: { icon: Coffee, color: 'bg-amber-500' },
    almuerzo: { icon: Sandwich, color: 'bg-indigo-500' },
    cena: { icon: Pizza, color: 'bg-emerald-500' },
    snack: { icon: Cake, color: 'bg-rose-500' },
  };

  const { icon: Icon, color } = categories[category] || {
    icon: Pizza,
    color: 'bg-gray-500',
  };

  return (
    <span className={`p-1 rounded-full text-white ${color}`}>
      <Icon className={className} />
    </span>
  );
}
