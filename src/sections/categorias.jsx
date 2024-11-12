'use client';

import React, { useState, useEffect } from 'react';
import { getCollection } from 'astro:content';
import { useStore } from '@nanostores/react';
import { selectedCategory, setCategory } from '../stores/filter';
import { Coffee, Pizza, Sandwich, Cake, GlassWater } from 'lucide-react';
import { SectionTitle } from '../ui/section-title';

const categoryOrder = ['desayuno', 'almuerzo', 'cena', 'snack', 'bebida'];

const categoryIcons = {
  desayuno: { icon: Coffee, color: 'bg-amber-500' },
  almuerzo: { icon: Sandwich, color: 'bg-indigo-500' },
  cena: { icon: Pizza, color: 'bg-emerald-500' },
  snack: { icon: Cake, color: 'bg-rose-500' },
  bebida: { icon: GlassWater, color: 'bg-blue-500' },
};

export default function Categorias() {
  const [categories, setCategories] = useState([]);
  const $selectedCategory = useStore(selectedCategory);

  useEffect(() => {
    async function fetchCategories() {
      const allRecipes = await getCollection('receta');
      const uniqueCategories = [
        ...new Set(allRecipes.map((recipe) => recipe.data.category)),
      ];
      const orderedCategories = categoryOrder.filter((cat) =>
        uniqueCategories.includes(cat)
      );
      const remainingCategories = uniqueCategories.filter(
        (cat) => !categoryOrder.includes(cat)
      );
      setCategories([...orderedCategories, ...remainingCategories]);
    }
    fetchCategories();
  }, []);

  return (
    <section className='pb-4 relative'>
      <div className='container'>
        <div className='mb-2'>
          <SectionTitle>Recetas</SectionTitle>
        </div>
      </div>
      <div
        className='flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-2 px-8'
        style={{
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch',
          scrollSnapType: 'x mandatory',
        }}
      >
        {categories.map((category) => {
          const IconComponent = categoryIcons[category]?.icon || Pizza;
          const iconColor = categoryIcons[category]?.color || 'bg-gray-500';
          return (
            <div key={category} className='snap-center flex-shrink-0'>
              <button
                onClick={() =>
                  setCategory($selectedCategory === category ? null : category)
                }
                className={`px-4 py-2 ${
                  $selectedCategory === category
                    ? `${iconColor} text-white`
                    : 'bg-white text-gray-800'
                } rounded-full hover:${iconColor} hover:text-white transition-colors border border-gray-200 flex items-center gap-2 whitespace-nowrap`}
              >
                <IconComponent className='w-5 h-5' />
                <span className='capitalize'>{category}</span>
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
