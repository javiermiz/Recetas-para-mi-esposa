import React, { useState, useEffect } from 'react';

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
    <button onClick={toggleFavorite} className='text-2xl'>
      {isFavorite ? '❤️' : '🤍'}
    </button>
  );
}
