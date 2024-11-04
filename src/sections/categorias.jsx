import React, { useState, useEffect } from 'react';
import { getCollection } from 'astro:content';

export default function Categorias() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      const allRecipes = await getCollection('receta');
      const uniqueCategories = [
        ...new Set(allRecipes.map((recipe) => recipe.data.category)),
      ];
      setCategories(uniqueCategories);
    }
    fetchCategories();
  }, []);

  return (
    <section className='py-8'>
      <div className='container'>
        <h2 className='text-2xl font-bold mb-4'>Categorías</h2>
        <div className='flex flex-wrap gap-4'>
          {categories.map((category) => (
            <button
              key={category}
              className='px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors'
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
