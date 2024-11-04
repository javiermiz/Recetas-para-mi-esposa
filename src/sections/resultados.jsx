import React from 'react';
import { getAllRecipes } from '../utils/recipe';

export default function Resultados() {
  const [recipes, setRecipes] = React.useState([]);

  React.useEffect(() => {
    getAllRecipes().then(setRecipes);
  }, []);

  return (
    <section>
      <h2 className='text-2xl font-bold mb-4'>Todas las Recetas</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {recipes.map((recipe) => (
          <div
            key={recipe.slug}
            className='bg-white rounded-lg shadow-md overflow-hidden'
          >
            <img
              src={recipe.data.image}
              alt={recipe.data.title}
              className='w-full h-48 object-cover'
            />
            <div className='p-4'>
              <h3 className='text-lg font-semibold mb-2'>
                {recipe.data.title}
              </h3>
              <p className='text-sm text-gray-600 mb-2'>
                {recipe.data.category}
              </p>
              <a
                href={`/receta/${recipe.slug}`}
                className='text-orange-500 hover:underline'
              >
                Ver receta
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
