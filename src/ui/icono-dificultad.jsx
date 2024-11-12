import { Flame } from 'lucide-react';

export default function DifficultyBadge({ difficulty }) {
  const levels = {
    facil: { color: 'bg-green-500' },
    medio: { color: 'bg-yellow-500' },
    difícil: { color: 'bg-red-500' },
  };

  const { color } = levels[difficulty] || levels['facil'];

  return (
    <span className={`p-1 rounded-full ${color}`}>
      <Flame className='w-4 h-4' />
    </span>
  );
}
