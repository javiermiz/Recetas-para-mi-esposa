import React, { useState, useEffect } from 'react';
import { getCollection } from 'astro:content';

const TopSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function fetchRecipes() {
      const allRecipes = await getCollection('receta');
      setRecipes(allRecipes);
    }
    fetchRecipes();
  }, []);

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.data.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilter = () => {
    console.log('Open filter drawer');
  };

  return (
    <div className='container py-4 sticky top-0 bg-white z-10'>
      <div className='relative'>
        <div className='absolute inset-y-0 left-3 flex items-center pointer-events-none'>
          <svg
            width='20'
            height='20'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            className='text-gray-400'
          >
            <circle cx='11' cy='11' r='8'></circle>
            <line x1='21' y1='21' x2='16.65' y2='16.65'></line>
          </svg>
        </div>
        <input
          type='search'
          placeholder='Buscar por nombre o ingrediente'
          className='w-full py-3 pl-10 pr-12 bg-gray-100 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200'
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {searchTerm && (
        <div className='absolute left-0 right-0 bg-white border-t border-gray-200 max-h-60 overflow-y-auto shadow-md'>
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <a
                key={recipe.slug}
                href={`/receta/${recipe.slug}`}
                className='flex items-center px-4 py-2 hover:bg-gray-100'
              >
                <div className='flex-shrink-0 w-12 h-12 mr-4'>
                  <img
                    src={
                      recipe.data.image || '/placeholder.svg?height=48&width=48'
                    }
                    alt={recipe.data.title}
                    className='w-full h-full object-cover rounded'
                  />
                </div>
                <div>
                  <h3 className='font-semibold'>{recipe.data.title}</h3>
                  <p className='text-sm text-gray-600'>
                    {recipe.data.category}
                  </p>
                </div>
              </a>
            ))
          ) : (
            <p className='px-4 py-2 text-gray-600'>No se encontraron recetas</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TopSearch;
