export default function Header() {
  return (
    <header className='relative pt-16 bg-white z-10'>
      <div className='container'>
        <div className='bg-white'>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>
            Hola, Mi amor!
          </h1>
          <p className='text-xl text-gray-600'>
            Aqui estan las recetas de las que podemos elegir. Te amo ❤️
          </p>
          <span className='text-sm text-gray-300'>
            Las recetas aqui son generadas con IA
          </span>
        </div>
      </div>
    </header>
  );
}
