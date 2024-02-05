import useAuth from '../hooks/useAuth'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import Header from '../components/Header';
import { useEffect } from 'react'
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
    const refeshToken = JSON.parse(localStorage.getItem("refreshToken"));

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
          <main className='min-h-screen'>
            <Outlet />
          </main>
        ) : <Navigate to={"/"} />
      }
    </>
  )
}

export default RutaProtegida