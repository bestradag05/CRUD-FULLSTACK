import React, { useState } from 'react'
import Alert from './Alert';

const SingUp = () => {

    const [usuario, setUsuario] = useState({
        nombre: '',
        email: '',
        password: '',
        repetirpassword: ''
    });

    const [alerta, setAlerta] = useState({});

    const manejarCambio = (e) => {
        const { name, value } = e.target;

        setUsuario((prevFormulario) => ({
            ...prevFormulario,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        //Destructuramos nuestro objeto
        const { nombre, email, password, repetirpassword } = usuario;

        //Lo agregarmos a un array para poder validar si incluye algun campo vacio
        if ([nombre, email, password, repetirpassword].includes('')) {
            setAlerta({
                msg: 'Hay campos vacios',
                error: true
            });
            return;

        }

        //Validamos que el email sea un email correcto
        //Codigo regex para correos.
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
        if (!regex.test(email)) {
            setAlerta({
                msg: 'No es un email correcto',
                error: true
            });
            return
        }

        if (password.length < 6) {
            setAlerta({
                msg: 'El password es muy corto, agrega minimo 6 caracteres',
                error: true
            });
            return;
        }

        if (password != repetirpassword) {
            setAlerta({
                msg: 'Los password no coinciden',
                error: true
            });
            return
        }



        setAlerta({
            msg: 'Confirma tu cuenta, hemos enviado un email a tu correo electronico',
            error: false
        });

        const data = {
            nombre,
            email,
            password,
          };
          
          fetch('http://localhost:3000/usuarios', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })
            .then(respuesta => respuesta.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));

    }

    return (
        <>
            {alerta.msg && <Alert alerta={alerta} setAlerta={setAlerta} />}
            <form action="" className="w-3/5" onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label htmlFor="nombre" className="text-1xl text-white uppercase block">nombre</label>
                    <input type="text" name='nombre' className="bg-transparent border-b mt-2 text-white w-full focus:outline-none" placeholder="Ingrese nombre" value={usuario.nombre} onChange={manejarCambio} />
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="text-1xl text-white uppercase block">Email</label>
                    <input type="text" name='email' className="bg-transparent border-b mt-2 text-white w-full focus:outline-none" placeholder="Ingrese email" value={usuario.email} onChange={manejarCambio} />
                </div>

                <div className="mb-5">
                    <label htmlFor="password" className="text-1xl text-white uppercase block">Password</label>
                    <input type="password" name='password' className="bg-transparent border-b mt-2 text-white w-full focus:outline-none" placeholder="Ingrese password" value={usuario.password} onChange={manejarCambio} />
                </div>

                <div className="mb-5">
                    <label htmlFor="repetirPassword" className="text-1xl text-white uppercase block">Repetir Password</label>
                    <input type="password" name='repetirpassword' className="bg-transparent border-b mt-2 text-white w-full focus:outline-none" placeholder="Repite tu password" value={usuario.repetirpassword} onChange={manejarCambio} />
                </div>

                <div className="flex items-center gap-10 mt-16">
                    <button type='submit' className="text-white px-5 py-2 rounded-3xl bg-emerald-400">Registrarme</button>
                    <p><a href="" className="text-white font-light text-sm subrayado">Olvide mi contraseña</a></p>
                </div>

            </form>
        </>

    )
}

export default SingUp