import React from 'react'

const SingUp = () => {
  return (
    <form action="" className="w-3/5">
            <div className="mb-5">
                <label htmlFor="nombre" className="text-2xl text-white uppercase block">nombre</label>
                <input type="text" className="bg-transparent border-b mt-2 text-white w-full focus:outline-none" placeholder="Ingrese nombre" />
            </div>
            <div className="mb-5">
                <label htmlFor="email" className="text-2xl text-white uppercase block">Email</label>
                <input type="text" className="bg-transparent border-b mt-2 text-white w-full focus:outline-none" placeholder="Ingrese email" />
            </div>

            <div className="mb-5">
                <label htmlFor="password" className="text-2xl text-white uppercase block">Password</label>
                <input type="password" className="bg-transparent border-b mt-2 text-white w-full focus:outline-none" placeholder="Ingrese password" />
            </div>

            <div className="mb-5">
                <label htmlFor="repetirPassword" className="text-2xl text-white uppercase block">Repetir Password</label>
                <input type="text" className="bg-transparent border-b mt-2 text-white w-full focus:outline-none" placeholder="Repite tu password" />
            </div>

            <div className="flex items-center gap-10 mt-16">
                <button className="text-white px-5 py-2 rounded-3xl bg-emerald-400">Registrarme</button>
                <p><a href="" className="text-white font-light text-sm subrayado">Olvide mi contraseña</a></p>
            </div>

        </form>
  )
}

export default SingUp