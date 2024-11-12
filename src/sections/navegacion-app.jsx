import React, { useState, useEffect } from 'react';

export default function MenuApp() {
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/') {
      setActiveTab('home');
    } else if (path === '/favoritos') {
      setActiveTab('favorites');
    }
  }, []);

  return (
    <div className='fixed bottom-0 left-0 right-0 bg-gray-50 border-t border-gray-200 z-10'>
      <div className='flex justify-around items-center h-16'>
        <a
          href='/'
          className={`flex flex-col flex-1 items-center ${
            activeTab === 'home' ? 'text-rose-700' : 'text-gray-600'
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
        </a>
        <a
          href='/favoritos'
          className={`flex flex-1 flex-col items-center ${
            activeTab === 'favorites' ? 'text-rose-700' : 'text-gray-600'
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
        </a>
      </div>
    </div>
  );
}
