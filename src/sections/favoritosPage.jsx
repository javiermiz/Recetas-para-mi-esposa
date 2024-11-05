import { useState, useEffect } from 'react';
import { getCollection } from 'astro:content';
import {
  ChefHat,
  Leaf,
  Flame,
  Coffee,
  Pizza,
  Cake,
  Sandwich,
} from 'lucide-react';
import FavoriteButton from '../ui/botonFavoritos';

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

  const getDifficultyInfo = (difficulty) => {
    const levels = {
      facil: { icon: <Flame className='w-4 h-4' />, color: 'bg-green-500' },
      medio: { icon: <Flame className='w-4 h-4' />, color: 'bg-yellow-500' },
      difícil: { icon: <Flame className='w-4 h-4' />, color: 'bg-red-500' },
    };
    return levels[difficulty] || levels['facil'];
  };

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

  return (
    <section className='py-4'>
      <div className='container mx-auto px-4'>
        <h4 className='text-base font-medium text-gray-900 mb-4'>
          Mis Recetas Favoritas
        </h4>

        {favoriteRecipes.length === 0 ? (
          <p className='text-sm text-gray-500'>
            Aún no has guardado ninguna receta como favorita.
          </p>
        ) : (
          <div className='space-y-6'>
            {favoriteRecipes.map((recipe) => (
              <div
                key={recipe.slug}
                className='bg-white hover:shadow-md transition-shadow duration-300'
              >
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
                        <span
                          className={`p-1 rounded-full ${
                            getDifficultyInfo(recipe.data.difficulty).color
                          }`}
                        >
                          {getDifficultyInfo(recipe.data.difficulty).icon}
                        </span>
                      </div>
                    </div>

                    <div className='p-4'>
                      <div className='flex items-start justify-between gap-2 mb-2'>
                        <h3 className='text-lg font-semibold text-gray-900'>
                          {recipe.data.title}
                        </h3>
                        <span
                          className={`p-1 rounded-full text-white ${
                            getCategoryInfo(recipe.data.category).color
                          }`}
                        >
                          {getCategoryInfo(recipe.data.category).icon}
                        </span>
                      </div>

                      <div className='flex items-center gap-4 text-sm text-gray-500 mb-3'>
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
