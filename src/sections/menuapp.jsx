import React, { useState } from 'react';

const ingredients = [
  'Huevos',
  'Leche',
  'Harina',
  'Pollo',
  'Carne',
  'Pescado',
  'Arroz',
  'Pasta',
  'Queso',
  'Tomate',
  'Lechuga',
  'Zanahoria',
  'Cebolla',
  'Ajo',
  'Aceite de oliva',
  'Sal',
  'Pimienta',
  'Azúcar',
];

export default function MenuApp() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const toggleIngredient = (ingredient) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((i) => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  return (
    <>
      <div className='fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10'>
        <div className='flex justify-around items-center h-16'>
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center ${
              activeTab === 'home' ? 'text-orange-500' : 'text-gray-600'
            }`}
          >
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
              />
            </svg>
            <span className='text-xs'>Inicio</span>
          </button>
          <button
            onClick={() => setActiveTab('search')}
            className={`flex flex-col items-center ${
              activeTab === 'search' ? 'text-orange-500' : 'text-gray-600'
            }`}
          >
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              />
            </svg>
            <span className='text-xs'>Buscar</span>
          </button>
          <button
            onClick={() => setActiveTab('favorites')}
            className={`flex flex-col items-center ${
              activeTab === 'favorites' ? 'text-orange-500' : 'text-gray-600'
            }`}
          >
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
              />
            </svg>
            <span className='text-xs'>Favoritos</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('filters');
              toggleDrawer();
            }}
            className={`flex flex-col items-center ${
              activeTab === 'filters' ? 'text-orange-500' : 'text-gray-600'
            }`}
          >
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4'
              />
            </svg>
            <span className='text-xs'>Filtros</span>
          </button>
        </div>
      </div>

      {/* Ingredients Filter Drawer */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity ${
          isDrawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4 transition-transform duration-300 ease-in-out transform ${
            isDrawerOpen ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <div className='flex justify-between items-center mb-4'>
            <h3 className='text-lg font-semibold'>Filtrar por ingredientes</h3>
            <button
              onClick={toggleDrawer}
              className='text-gray-500 hover:text-gray-700'
            >
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>
          <div className='flex flex-wrap gap-2 max-h-[60vh] overflow-y-auto'>
            {ingredients.map((ingredient) => (
              <button
                key={ingredient}
                onClick={() => toggleIngredient(ingredient)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedIngredients.includes(ingredient)
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {ingredient}
              </button>
            ))}
          </div>
          <div className='mt-4'>
            <button
              onClick={toggleDrawer}
              className='w-full bg-orange-500 text-white py-2 px-4 rounded-full font-medium hover:bg-orange-600 transition-colors'
            >
              Aplicar filtros ({selectedIngredients.length})
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
