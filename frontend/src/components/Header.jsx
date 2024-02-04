import React from 'react'
import useAuth from '../hooks/useAuth'
import { Link } from 'react-router-dom';

const Header = () => {

  const { cerrarSesion } = useAuth();

  return (
    <header className='py-10 '>
      <div className="container mx-auto flex  flex-col lg:flex-row justify-center md:justify-between items-center">
        <h1 className='font-bold text-2xl text-white text-center mb-5 lg:mb-0 '>Encuentra <span className='text-emerald-500'>Musica</span> para tu PlayList</h1>
        <nav className=''>
          <ul className='flex gap-4 text-white text-base lg:text-lg uppercase font-bold'>
            <li className='link-nav'>
              <Link to="/admin">Dashboard</Link>
            </li>
            <li className='link-nav'>
              <Link to="/admin/perfil">Perfil</Link>
            </li>
            <li onClick={cerrarSesion} className='link-nav'>Cerrar Sesion</li>
          </ul>
        </nav>
      </div>

    </header>
  )
}

export default Header