import { useState, useEffect } from 'react';
import { getCollection } from 'astro:content';

import FavoriteButton from '../ui/boton-favoritos';
import DifficultyBadge from '../ui/icono-dificultad';
import CategoryIcon from '../ui/icono-categoria';
import CookingInfo from '../ui/icono-tiempo-coccion';
import { SectionTitle } from '../ui/section-title';

export default function FavoritosPage() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    async function fetchFavoriteRecipes() {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      const allRecipes = await getCollection('receta');
      const filteredRecipes = allRecipes.filter((recipe) =>
        favorites.includes(recipe.slug)
      );
      setFavoriteRecipes(filteredRecipes);
    }
    fetchFavoriteRecipes();
  }, []);

  return (
    <section className='py-4'>
      <div className='container mx-auto px-4'>
        <SectionTitle className='mb-4'>Mis Recetas Favoritas</SectionTitle>

        {favoriteRecipes.length === 0 ? (
          <p className='text-sm text-gray-500'>
            Aún no has guardado ninguna receta como favorita.
          </p>
        ) : (
          <div className='space-y-6'>
            {favoriteRecipes.map((recipe) => (
              <div key={recipe.slug}>
                <article className='relative'>
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

                    <div className='py-4'>
                      <div className='flex items-start justify-between gap-2 mb-2'>
                        <h3 className='text-lg font-semibold text-gray-900'>
                          {recipe.data.title}
                        </h3>

                        <CategoryIcon category={recipe.data.category} />
                      </div>

                      <CookingInfo
                        cookTime={recipe.data.cookTime}
                        prepTime={recipe.data.prepTime}
                        ingredientsCount={recipe.data.ingredients.length}
                      />

                      <p className='text-sm text-gray-500 line-clamp-2'>
                        {recipe.data.extract ||
                          'Una deliciosa receta para disfrutar en casa.'}
                      </p>
                    </div>
                  </a>
                  <div className='absolute top-2 right-2'>
                    <FavoriteButton recipeSlug={recipe.slug} />
                  </div>
                </article>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
