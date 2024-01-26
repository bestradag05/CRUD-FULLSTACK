import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth';
import Alert from './Alert';
import axios from 'axios';


const CLIENT_ID = "4b5ba89e65304b1a991ec8ec8a123985"
const REDIRECT_URI = "http://localhost:5173/admin"
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const RESPONSE_TYPE = "code"

const SingIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setAuth } = useAuth();


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

        const user = {
            email,
            password
        }

        try {

           const {data} = await axios.post('http://localhost:3000/usuarios/login', user ,{
                headers : {
                    'Content-Type': 'application/json'
                }
    
            });

            localStorage.setItem('token', data.token);
            setAuth(data);

            //Autorizamos spotify 
            //Si se autoriza, este redirecciona hacia el dashboard y ahi se programa el cambio del code por 
            //el token
            window.location.href = `${import.meta.env.VITE_AUTH_ENDPOINT}?client_id=${import.meta.env.VITE_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_REDIRECT_URI}&response_type=${import.meta.env.VITE_RESPONSE_TYPE}&state=${'user-read-private user-read-email'}`;
            
        } catch (error) {
            console.log(error);
        }

       


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