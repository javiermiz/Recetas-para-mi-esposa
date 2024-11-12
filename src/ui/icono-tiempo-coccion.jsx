import { ChefHat, Leaf } from 'lucide-react';

export default function CookingInfo({ prepTime, cookTime, ingredientsCount }) {
  const getCookingTime = (prepTime, cookTime) => {
    const totalTime = parseInt(prepTime) + parseInt(cookTime);
    return isNaN(totalTime) ? '-- ' : totalTime;
  };

  return (
    <div className='flex flex-col justify-center gap-1 text-sm text-gray-500 mb-2 '>
      <div className='flex items-center gap-1'>
        <ChefHat className='w-4 h-4 text-rose-700' />
        <span>{getCookingTime(prepTime, cookTime)} min</span>
      </div>
      <div className='flex items-center gap-1'>
        <Leaf className='w-4 h-4 text-rose-700' />
        <span>{ingredientsCount} ingredientes</span>
      </div>
    </div>
  );
}
