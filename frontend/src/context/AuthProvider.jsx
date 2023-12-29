import { createContext, useState } from "react"
import { useEffect } from "react";


const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [cargando, setCargando ] = useState(true);
    const [auth, setAuth] = useState({});
    

    useEffect(() => {

        const autenticarUsuario = async () => {
            console.log(auth);
            const token = localStorage.getItem('token');

            if(!token){
                setCargando(false);
                return;            
            }

            fetch('http://localhost:3000/usuarios/perfil',{
                headers: {
                    'Content-Type' : 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
            .then(respuesta => {
                if(!respuesta.ok){
                    return respuesta.json().then(respuestaServidor => {
                        throw new Error(respuestaServidor.msg);
                    })
                }

                return respuesta.json();
            })
            .then(data => {
                setAuth(data);
            })
            .catch(error => {
                console.log(error.message);
                setAuth({});
            })
        }

        autenticarUsuario();

    },[]);
   


  return (
    <AuthContext.Provider value={{
        auth,
        setAuth,
        cargando
    }}>
        {children}
    </AuthContext.Provider>
  )
}

export {
    AuthProvider
}

export default AuthContext