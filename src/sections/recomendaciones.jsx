import React, { useState, useEffect } from 'react';
import { getCollection } from 'astro:content';
import FavoriteButton from '../ui/boton-favoritos';
import CookingInfo from '../ui/icono-tiempo-coccion';
import { SectionTitle } from '../ui/section-title';
import CategoryIcon from '../ui/icono-categoria';

export default function Recomendaciones() {
  const [recommendedRecipes, setRecommendedRecipes] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('');

  useEffect(() => {
    async function fetchRecommendations() {
      const allRecipes = await getCollection('receta');
      const currentHour = new Date().getHours();

      let category;
      if (currentHour >= 5 && currentHour < 11) {
        category = 'desayuno';
      } else if (currentHour >= 11 && currentHour < 15) {
        category = 'almuerzo';
      } else if (currentHour >= 15 && currentHour < 22) {
        category = 'cena';
      } else {
        category = 'snack';
      }

      setCurrentCategory(category);

      const filteredRecipes = allRecipes.filter(
        (recipe) =>
          recipe.data.category === category || recipe.data.category === 'snack'
      );

      const selectedRecipes = filteredRecipes
        .sort(() => 0.5 - Math.random())
        .slice(0, 6);

      // Ensure at least one snack if available
      const snackRecipe = allRecipes.find(
        (recipe) => recipe.data.category === 'snack'
      );
      if (
        snackRecipe &&
        !selectedRecipes.some((recipe) => recipe.data.category === 'snack')
      ) {
        selectedRecipes.pop();
        selectedRecipes.push(snackRecipe);
      }

      setRecommendedRecipes(selectedRecipes);
    }
    fetchRecommendations();
  }, []);

  return (
    <section className='pb-4'>
      <div className='container px-0'>
        <div className='mb-4 px-4 flex items-center gap-4'>
          <SectionTitle>Recomendados para {currentCategory} </SectionTitle>
          <CategoryIcon className='inline-block' category={currentCategory} />
        </div>
        <div className='relative'>
          <div className='overflow-x-auto flex gap-4 snap-x snap-mandatory scrollbar-hide px-4'>
            {recommendedRecipes.map((recipe) => (
              <div key={recipe.slug} className='flex-none w-64 snap-center'>
                <article className='relative'>
                  <a href={`/receta/${recipe.slug}`} className='block'>
                    <div className='relative aspect-square rounded-3xl overflow-hidden'>
                      <img
                        src={
                          recipe.data.image ||
                          '/placeholder.svg?height=360&width=640'
                        }
                        alt={recipe.data.title}
                        className='w-full h-full object-cover'
                      />
                    </div>

                    <div className='flex items-start justify-between gap-2 my-2'>
                      <h3 className='text-lg font-semibold text-gray-900 leading-tight'>
                        {recipe.data.title}
                      </h3>
                    </div>

                    <CookingInfo
                      cookTime={recipe.data.cookTime}
                      prepTime={recipe.data.prepTime}
                      ingredientsCount={recipe.data.ingredients.length}
                    />
                  </a>
                  <div className='absolute top-2 right-2'>
                    <FavoriteButton recipeSlug={recipe.slug} />
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
