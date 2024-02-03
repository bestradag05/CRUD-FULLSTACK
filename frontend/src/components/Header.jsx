import React from 'react'
import useAuth from '../hooks/useAuth'
import { Link } from 'react-router-dom';

const Header = () => {

  const { cerrarSesion } = useAuth();

  return (
    <header className='py-10 bg-black'>
      <div className="container mx-auto flex lg:flex-row justify-between items-center">
        <h1 className='font-bold text-2xl text-indigo-200 text-center'>Escucha tu <span className='text-emerald-400'>PlayList</span> en cualquier momento</h1>
        <nav className=''>
          <ul className='flex gap-4 text-indigo-200 text-sm uppercase font-bold'>
            <li className='link-nav'>
              <Link to="/admin">Dashboard</Link>
            </li>
            <li className='link-nav'>
              <Link to="">Perfil</Link>
            </li>
            <li onClick={cerrarSesion} className='link-nav'>Cerrar Sesion</li>
          </ul>
        </nav>
      </div>

    </header>
  )
}

export default Header