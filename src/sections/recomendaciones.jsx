import React, { useState, useEffect } from 'react';
import { getCollection } from 'astro:content';
import {
  Clock,
  ChefHat,
  Leaf,
  Flame,
  Coffee,
  Pizza,
  Cake,
  Sandwich,
} from 'lucide-react';
import FavoriteButton from '../ui/botonFavoritos';

export default function Recomendaciones() {
  const [recommendedRecipes, setRecommendedRecipes] = useState([]);

  const getCategoryInfo = (category) => {
    const categories = {
      desayuno: { icon: <Coffee className='w-4 h-4' />, color: 'bg-amber-500' },
      almuerzo: {
        icon: <Pizza className='w-4 h-4' />,
        color: 'bg-emerald-500',
      },
      cena: { icon: <Sandwich className='w-4 h-4' />, color: 'bg-indigo-500' },
      snack: { icon: <Cake className='w-4 h-4' />, color: 'bg-rose-500' },
    };
    return (
      categories[category] || {
        icon: <Pizza className='w-4 h-4' />,
        color: 'bg-gray-500',
      }
    );
  };

  const getCookingTime = (prepTime, cookTime) => {
    const totalTime = parseInt(prepTime) + parseInt(cookTime);
    return isNaN(totalTime) ? '-- ' : totalTime;
  };

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
    <section className='pb-4'>
      <div className='container px-0'>
        <h2 className='text-2xl font-black mb-4 px-4'>Recomendados</h2>
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
                    <div className='flex flex-col justify-center gap-4 text-sm text-gray-500 mb-3'>
                      <div className='flex items-center gap-1'>
                        <ChefHat className='w-4 h-4' />
                        <span>
                          {getCookingTime(
                            recipe.data.prepTime,
                            recipe.data.cookTime
                          )}{' '}
                          min
                        </span>
                      </div>
                      <div className='flex items-center gap-1'>
                        <Leaf className='w-4 h-4' />
                        <span>
                          {recipe.data.ingredients.length} ingredientes
                        </span>
                      </div>
                    </div>
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
