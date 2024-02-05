import { createContext, useState } from "react"
import { useEffect } from "react";


const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [cargando, setCargando] = useState(true);
    const [auth, setAuth] = useState({});
    const [spotifyToken, setSpotifyToken] = useState("");


    useEffect(() => {

        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token');
            const spotifyTokenLocal = localStorage.getItem('spotifyToken');
            if (!token) {
                setCargando(false);
                return;
            }

            await fetch('http://localhost:3000/usuarios/perfil', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
                .then(respuesta => {
                    if (!respuesta.ok) {
                        return respuesta.json().then(respuestaServidor => {
                            throw new Error(respuestaServidor.msg);
                        })
                    }

                    return respuesta.json();
                })
                .then(data => {
                    setAuth(data);
                    setSpotifyToken(spotifyTokenLocal);

                })
                .catch(error => {
                    console.log(error.message);
                    setAuth({});
                })

            setCargando(false);
        }

        autenticarUsuario();

    }, []);

    const cerrarSesion = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('spotifyToken');
        setAuth({});
        setSpotifyToken("");
    }



    return (
        <AuthContext.Provider value={{
            auth,
            setAuth,
            cargando,
            cerrarSesion,
            spotifyToken,
            setSpotifyToken
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext