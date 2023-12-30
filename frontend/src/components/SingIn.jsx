import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth';
import Alert from './Alert';

const SingIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setAuth } = useAuth();
    const navigate = useNavigate();


    const [alerta, setAlerta] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        if ([email, password].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            });

            return;
        }

        const data = {
            email,
            password
        }


        await fetch('http://localhost:3000/usuarios/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(respuesta => {
                if (!respuesta.ok) {
                    return respuesta.json().then(mensajeServidor => {
                        throw new Error(mensajeServidor.msg);
                    })
                }

                return respuesta.json();
            })
            .then(data => {
                console.log("fetch ejecutando");
                localStorage.setItem('token', data.token);
                setAuth(data);
                navigate('/admin');
            })
            .catch(error => {
                setAlerta({
                    msg: error.message,
                    error: true
                })
            })

            console.log("fetch terminado");


    }

    return (
        <>
            {alerta.msg && <Alert alerta={alerta} setAlerta={setAlerta} />}
            <form onSubmit={handleSubmit} className="w-3/5">
                <div className="mb-5">
                    <label htmlFor="email" className="text-1xl text-white uppercase block">Email</label>
                    <input
                        type="text"
                        name='email'
                        className="bg-transparent border-b mt-2 text-white w-full focus:outline-none"
                        value={email}
                        onChange={e => setEmail(e.target.value)} placeholder="Ingrese email" />
                </div>

                <div className="mb-5">
                    <label htmlFor="password" className="text-1xl text-white uppercase block">Password</label>
                    <input type="password"
                        name='password'
                        className="bg-transparent border-b mt-2 text-white w-full focus:outline-none"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Ingrese password" />
                </div>

                <div className="flex items-center gap-10 mt-16">
                    <button className="text-white px-5 py-2 rounded-3xl bg-emerald-400">Iniciar Sesion</button>
                    <p><Link to="/cambiarpassword" className="text-white font-light text-sm subrayado">Olvide mi contraseña</Link></p>
                </div>

            </form>
        </>
    )
}

export default SingIn