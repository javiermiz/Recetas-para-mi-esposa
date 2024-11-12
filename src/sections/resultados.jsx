'use client';

import { useState, useEffect } from 'react';
import { getCollection } from 'astro:content';
import { useStore } from '@nanostores/react';
import { selectedIngredients, selectedCategory } from '../stores/filter';
import FavoriteButton from '../ui/boton-favoritos';
import CookingInfo from '../ui/icono-tiempo-coccion';
import CategoryIcon from '../ui/icono-categoria';
import DifficultyBadge from '../ui/icono-dificultad';

export default function Resultados() {
  const [recipes, setRecipes] = useState([]);
  const $selectedIngredients = useStore(selectedIngredients);
  const $selectedCategory = useStore(selectedCategory);

  useEffect(() => {
    async function fetchAndFilterRecipes() {
      const allRecipes = await getCollection('receta');

      let filteredRecipes = allRecipes;

      if ($selectedCategory) {
        filteredRecipes = filteredRecipes.filter(
          (recipe) => recipe.data.category === $selectedCategory
        );
      }

      if ($selectedIngredients.length > 0) {
        filteredRecipes = filteredRecipes.filter((recipe) =>
          $selectedIngredients.every((ingredient) =>
            recipe.data.ingredients.includes(ingredient)
          )
        );
      }

      setRecipes(filteredRecipes);
    }
    fetchAndFilterRecipes();
  }, [$selectedIngredients, $selectedCategory]);

  return (
    <section>
      <div className='container'>
        {recipes.length === 0 ? (
          <p className='text-sm text-gray-500'>
            No se encontraron recetas con los filtros seleccionados.
          </p>
        ) : (
          <div className='space-y-6'>
            {recipes.map((recipe) => (
              <article className='relative border-b' key={recipe.slug}>
                <a href={`/receta/${recipe.slug}`} className='block'>
                  <div className='relative aspect-video rounded-xl overflow-hidden'>
                    <img
                      src={
                        recipe.data.image ||
                        '/placeholder.svg?height=360&width=640'
                      }
                      alt={recipe.data.title}
                      className='w-full h-full object-cover rounded-t-xl'
                    />
                    <div className='absolute top-2 left-2 flex'>
                      <DifficultyBadge difficulty={recipe.data.difficulty} />
                    </div>
                  </div>

                  <div className='py-4 flex flex-col gap-2'>
                    <div className='flex items-start justify-between gap-2'>
                      <h3 className='text-md font-bold'>{recipe.data.title}</h3>

                      <CategoryIcon category={recipe.data.category} />
                    </div>

                    <p className='text-sm text-gray-500 line-clamp-2'>
                      {recipe.data.extract ||
                        'Una deliciosa receta para disfrutar en casa.'}
                    </p>

                    <CookingInfo
                      cookTime={recipe.data.cookTime}
                      prepTime={recipe.data.prepTime}
                      ingredientsCount={recipe.data.ingredients.length}
                    />
                  </div>
                </a>
                <div className='absolute top-2 right-2'>
                  <FavoriteButton recipeSlug={recipe.slug} />
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
