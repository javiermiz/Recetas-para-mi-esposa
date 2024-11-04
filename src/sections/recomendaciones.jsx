import React from 'react';
import { getRecommendedRecipes } from '../utils/recipe';

export default function Recomendaciones() {
  const [recommendedRecipes, setRecommendedRecipes] = React.useState([]);

  React.useEffect(() => {
    getRecommendedRecipes().then(setRecommendedRecipes);
  }, []);

  return (
    <section>
      <h2 className='text-2xl font-bold mb-4'>Recomendados</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {recommendedRecipes.map((recipe) => (
          <div key={recipe.slug} className='bg-white rounded-lg shadow-md p-4'>
            <img
              src={recipe.data.image}
              alt={recipe.data.title}
              className='w-full h-48 object-cover rounded-md mb-2'
            />
            <h3 className='text-lg font-semibold'>{recipe.data.title}</h3>
            <p className='text-sm text-gray-600'>{recipe.data.category}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
