import React, { useState, useEffect } from 'react';
import { getCollection } from 'astro:content';
import { useStore } from '@nanostores/react';
import { selectedIngredients } from '../stores/filter';

export default function Resultados() {
  const [recipes, setRecipes] = useState([]);
  const $selectedIngredients = useStore(selectedIngredients);

  useEffect(() => {
    async function fetchAndFilterRecipes() {
      const allRecipes = await getCollection('receta');

      if ($selectedIngredients.length === 0) {
        setRecipes(allRecipes);
      } else {
        const filteredRecipes = allRecipes.filter((recipe) =>
          $selectedIngredients.every((ingredient) =>
            recipe.data.ingredients.includes(ingredient)
          )
        );
        setRecipes(filteredRecipes);
      }
    }
    fetchAndFilterRecipes();
  }, [$selectedIngredients]);

  return (
    <section className='py-8'>
      <div className='container mx-auto px-4'>
        <h2 className='text-2xl font-bold mb-4'>
          {$selectedIngredients.length > 0
            ? 'Recetas Filtradas'
            : 'Todas las Recetas'}
        </h2>
        {recipes.length === 0 ? (
          <p className='text-gray-600'>
            No se encontraron recetas con los ingredientes seleccionados.
          </p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {recipes.map((recipe) => (
              <div
                key={recipe.slug}
                className='bg-white rounded-lg shadow-md overflow-hidden'
              >
                {recipe.data.image && (
                  <img
                    src={recipe.data.image}
                    alt={recipe.data.title}
                    className='w-full h-48 object-cover'
                  />
                )}
                <div className='p-4'>
                  <h3 className='text-lg font-semibold mb-2'>
                    {recipe.data.title}
                  </h3>
                  <p className='text-sm text-gray-600 mb-2'>
                    {recipe.data.category}
                  </p>
                  <p className='text-sm text-gray-500 mb-2'>
                    Ingredientes: {recipe.data.ingredients.join(', ')}
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
        )}
      </div>
    </section>
  );
}
