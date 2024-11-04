import React, { useState, useEffect } from 'react';
import { getCollection } from 'astro:content';

export default function Recomendaciones() {
  const [recommendedRecipes, setRecommendedRecipes] = useState([]);

  useEffect(() => {
    async function fetchRecommendations() {
      const allRecipes = await getCollection('receta');
      const randomRecipes = allRecipes
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
      setRecommendedRecipes(randomRecipes);
    }
    fetchRecommendations();
  }, []);

  return (
    <section>
      <div className='container'>
        <h2 className='text-2xl font-bold mb-4'>Recomendados</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {recommendedRecipes.map((recipe) => (
            <div key={recipe.slug} className='bg-white rounded-lg w-80'>
              {recipe.data.image && (
                <img
                  src={recipe.data.image}
                  alt={recipe.data.title}
                  className='w-full object-cover aspect-[4/3] rounded-md mb-2'
                />
              )}
              <h3 className='text-lg font-semibold'>{recipe.data.title}</h3>
              <p className='text-sm text-gray-600'>{recipe.data.category}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
