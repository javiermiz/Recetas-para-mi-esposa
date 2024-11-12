import React, { useState, useEffect } from 'react';
import { Search, ChevronRight, Loader2 } from 'lucide-react';
import { getCollection } from 'astro:content';

const TopSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const allRecipes = await getCollection('receta');
        setRecipes(allRecipes);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchRecipes();
  }, []);

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.data.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className='container py-4 sticky top-0 bg-gray-50 z-50'>
      <div className='relative max-w-2xl mx-auto'>
        <div className='group relative'>
          <div className='absolute inset-y-0 left-4 flex items-center pointer-events-none'>
            <Search
              size={20}
              className='text-gray-400 group-focus-within:text-rose-600 transition-colors'
            />
          </div>

          <input
            type='search'
            placeholder='Buscar por nombre o ingrediente...'
            className='w-full py-3 pl-12 pr-4 bg-white border border-gray-200 rounded-2xl 
                     text-gray-900 placeholder-gray-500 shadow-sm
                     transition-all duration-200
                     focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500'
            value={searchTerm}
            onChange={handleSearch}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              // Pequeño delay para permitir clicks en los resultados
              setTimeout(() => setIsFocused(false), 200);
            }}
          />
        </div>

        {/* Resultados de búsqueda */}
        {(searchTerm || isFocused) && (
          <div
            className='absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 
                        overflow-hidden animate-in fade-in duration-200'
          >
            {isLoading ? (
              <div className='p-8 text-center'>
                <Loader2 className='w-6 h-6 animate-spin mx-auto text-gray-400' />
                <p className='mt-2 text-sm text-gray-500'>
                  Cargando recetas...
                </p>
              </div>
            ) : filteredRecipes.length > 0 ? (
              <div className='max-h-[400px] overflow-y-auto'>
                <div className='divide-y divide-gray-100'>
                  {filteredRecipes.map((recipe) => (
                    <a
                      key={recipe.slug}
                      href={`/receta/${recipe.slug}`}
                      className='flex items-center gap-4 p-4 transition-colors hover:bg-rose-50 group'
                    >
                      <div
                        className='flex-shrink-0 w-16 h-16 overflow-hidden rounded-lg 
                                    ring-1 ring-gray-200'
                      >
                        <img
                          src={
                            recipe.data.image ||
                            '/placeholder.svg?height=64&width=64'
                          }
                          alt={recipe.data.title}
                          className='w-full h-full object-cover transition-transform duration-300 
                                   group-hover:scale-110'
                        />
                      </div>

                      <div className='flex-1 min-w-0'>
                        <h3
                          className='font-medium text-gray-900 truncate group-hover:text-rose-600 
                                     transition-colors'
                        >
                          {recipe.data.title}
                        </h3>
                        <div className='flex items-center gap-2 mt-1.5'>
                          <span
                            className='inline-flex items-center px-2.5 py-0.5 rounded-full 
                                         text-xs font-medium bg-rose-50 text-rose-600'
                          >
                            {recipe.data.category}
                          </span>
                        </div>
                      </div>

                      <ChevronRight
                        size={16}
                        className='text-gray-400 group-hover:text-rose-600 transition-colors'
                      />
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <div className='p-8 text-center'>
                <p className='text-gray-500'>
                  {searchTerm ? (
                    <>No se encontraron recetas para "{searchTerm}"</>
                  ) : (
                    'Comienza a escribir para buscar recetas'
                  )}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TopSearch;
