import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

export default function FavoriteButton({ recipeSlug }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.includes(recipeSlug));
  }, [recipeSlug]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (isFavorite) {
      const newFavorites = favorites.filter((slug) => slug !== recipeSlug);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    } else {
      favorites.push(recipeSlug);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <button
      onClick={toggleFavorite}
      className='p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors'
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart
        className={`w-6 h-6 ${
          isFavorite ? 'fill-current text-rose-500' : 'text-gray-400'
        }`}
      />
    </button>
  );
}
