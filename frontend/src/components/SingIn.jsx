import React from 'react'

const SingIn = () => {
    return (
        <form action="" className="w-3/5">
            <div className="mb-5">
                <label htmlFor="usuario" className="text-2xl text-white uppercase block">Usuario</label>
                <input type="text" className="bg-transparent border-b mt-2 text-white w-full focus:outline-none" placeholder="Ingrese usuario" />
            </div>

            <div className="mb-5">
                <label htmlFor="password" className="text-2xl text-white uppercase block">Password</label>
                <input type="password" className="bg-transparent border-b mt-2 text-white w-full focus:outline-none" placeholder="Ingrese password" />
            </div>

            <div className="flex items-center gap-10 mt-16">
                <button className="text-white px-5 py-2 rounded-3xl bg-emerald-400">Iniciar Sesion</button>
                <p><a href="" className="text-white font-light text-sm subrayado">Olvide mi contraseña</a></p>
            </div>

        </form>
    )
}

export default SingIn