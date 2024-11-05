import React, { useState, useEffect } from 'react';
import { getCollection } from 'astro:content';

export default function Recomendaciones() {
  const [recommendedRecipes, setRecommendedRecipes] = useState([]);

  useEffect(() => {
    async function fetchRecommendations() {
      const allRecipes = await getCollection('receta');
      const randomRecipes = allRecipes
        .sort(() => 0.5 - Math.random())
        .slice(0, 6);
      setRecommendedRecipes(randomRecipes);
    }
    fetchRecommendations();
  }, []);

  return (
    <section className='py-4'>
      <div className='container mx-auto px-4'>
        <h2 className='text-2xl font-bold mb-4'>Recomendados</h2>
        <div className='relative'>
          <div className='overflow-x-auto flex gap-4 snap-x snap-mandatory'>
            {recommendedRecipes.map((recipe) => (
              <a
                href='/'
                key={recipe.slug}
                className='flex-none w-64 snap-center'
              >
                <div>
                  {recipe.data.image && (
                    <img
                      src={recipe.data.image}
                      alt={recipe.data.title}
                      className='w-full aspect-[4/3] object-cover rounded-lg mb-2'
                    />
                  )}

                  <h3 className='text-lg font-semibold mb-1 truncate'>
                    {recipe.data.title}
                  </h3>
                  <p className='text-sm text-gray-600 mb-2'>
                    {recipe.data.category}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
