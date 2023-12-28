import React, { useState } from 'react'

const ActualizarPassword = () => {

    const [password, setPassword] = useState([]);
    const [repetirPassword, setRepetirPassword] = useState([]);

    const actualizarPassword = (e) => {
        e.preventDefault();
    
        if ([password, repetirPassword].includes("")) {
            setAlerta({
              msg: 'Los campos son obligatorios',
              error: true
            })
            return;
        }
      


    }

    return (
        <div className="container-fluid h-screen grid grid-cols-2 ">

            <div className="w-full h-full bg-emerald-400 flex justify-center items-center">
                <h1 className="text-3xl px-10 text-white font-bold uppercase">Actualiza tu password para poder recuperar tu   <span className="text-[#364960]">cuenta</span> </h1>
            </div>

            <div>
                <div className="bg-[#364960] h-full flex flex-col justify-center items-center py-4 ">

                    <form action="" className="w-3/5" onSubmit={actualizarPassword}>
                        <div className="mb-5">
                            <label htmlFor="password" className="text-1xl text-white uppercase block">Nuevo Password</label>
                            <input type="text" className="bg-transparent border-b mt-2 text-white w-full focus:outline-none"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Ingrese nuevo password" />
                        </div>

                        <div className="mb-5">
                            <label htmlFor="repetirpassword" className="text-1xl text-white uppercase block">Repetir Password</label>
                            <input type="text" className="bg-transparent border-b mt-2 text-white w-full focus:outline-none"
                                value={repetirPassword}
                                onChange={e => setRepetirPassword(e.target.value)}
                                placeholder="Repite password" />
                        </div>

                        <div className="flex items-center gap-10 mt-16">
                            <button className="text-white px-5 py-2 rounded-3xl bg-emerald-400">Actualizar Password</button>

                        </div>

                    </form>


                </div>
            </div>



        </div>
    )
}

export default ActualizarPassword