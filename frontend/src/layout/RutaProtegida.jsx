import useAuth from '../hooks/useAuth'
import { Navigate, Outlet, redirect, useLocation, useNavigate } from 'react-router-dom'
import Header from '../components/Header';
import React, { useEffect } from 'react'
import axios from 'axios';


const RutaProtegida = () => {

  const { auth, cargando } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { spotifyToken, setSpotifyToken } = useAuth();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const spotifyCode = urlParams.get("code");
    const tokenSpotify = localStorage.getItem('spotifyToken');

    //Si es que no acepta la autorizacion se redirecciona al login
    if (urlParams.get("error") === "access_denied") {
      navigate("/");
      localStorage.removeItem("token");
    }


    const getToken = async () => {
      try {
        const data = new URLSearchParams();
        data.append('code', spotifyCode);
        data.append('redirect_uri', 'http://localhost:5173/admin');
        data.append('grant_type', 'authorization_code');



        if (!tokenSpotify) {

          const respuesta = await axios.post('https://accounts.spotify.com/api/token', data, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': 'Basic ' + btoa(`${import.meta.env.VITE_CLIENT_ID}:${import.meta.env.VITE_CLIENT_SECRET}`)
            }
          });
          console.log(respuesta);
          setSpotifyToken(respuesta.data.access_token);
          localStorage.setItem('spotifyToken', respuesta.data.access_token);


        }

      } catch (error) {
        console.log(error);
      }
    };

    getToken();

  }, [])


  if (cargando) return 'cargando....';

  return (
    <>
      <Header />
      {auth?.id ?
        (
          <main className='bg-black '>
            <Outlet />
          </main>
        ) : <Navigate to={"/"} />
      }
    </>
  )
}

export default RutaProtegida