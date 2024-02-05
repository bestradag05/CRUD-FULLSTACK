import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";

const Perfil = () => {

    const { spotifyToken } = useAuth();
    const [user, setUser] = useState({})


    useEffect(() => {
        // Obtenemos el perfil de la cuenta que autorizo en spotify
        const getPerfil = async () => {

            try {
                // Hacemos la peticion hacia la cuenta
                const response = await axios('https://api.spotify.com/v1/me', {
                    headers: {
                        Authorization: `Bearer ${spotifyToken}`,
                    }
                });
                // Actualizamos nuestro estado para poder usarlo 
                setUser(response.data);
            } catch (error) {
                console.log(error);
            }

        }

        getPerfil();

    }, [])

    return (

        <div className="grid lg:grid-cols-2 mt-10 max-w-screen-lg mx-auto p-14">
            <div className="flex justify-center">
                {user.images && user.images.length > 1 && (
                    <img src={user.images[1].url} alt="" className="rounded-xl shadow-2xl" />
                )}

            </div>
            <div className="text-white flex  flex-col  justify-center items-center mt-10 lg:mt-0 gap-10">
                <p className="text-xl text-white uppercase font-semibold">Name : <span className="text-emerald-500 font-bold">{user.display_name}</span></p>
                <p className="text-xl text-white uppercase font-semibold">Email: <span className="text-emerald-500 font-bold lowercase">{user.email}</span></p>
                <p className="text-xl text-white uppercase font-semibold">Tipo de cuenta: <span className="text-emerald-500 font-bold">{user.product}</span></p>
                <p className="text-xl text-white uppercase font-semibold">Pais: <span className="text-emerald-500 font-bold">{user.country}</span></p>
            </div>

            <Link to={user.uri} className="bg-emerald-500 p-3 lg:p-5 text-lg lg:text-2xl uppercase font-bold mt-10 lg:col-span-2 text-center text-white">
                Abrir en Spotify
            </Link >
        </div>

    );
}

export default Perfil;