import React from 'react';
import { getAllRecipes } from '../utils/recipe';

export default function Categorias() {
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    getAllRecipes().then((recipes) => {
      const uniqueCategories = [
        ...new Set(recipes.map((recipe) => recipe.data.category)),
      ];
      setCategories(uniqueCategories);
    });
  }, []);

  return (
    <section className='my-8'>
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
    </section>
  );
}
