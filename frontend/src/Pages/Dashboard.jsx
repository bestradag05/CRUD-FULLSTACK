import React, { useEffect, useState } from 'react'
import { redirect, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import axios from 'axios';
import Track from '../components/Track';
import Spinner from '../components/Spinner';

const Dashboard = () => {

  const { spotifyToken } = useAuth();
  const [tracks, setTracks] = useState([]);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {

    const getTracks = async () => {
      try {

        if (!spotifyToken) {
          setCargando(true);
          return;
        }

        const response = await axios.get('https://api.spotify.com/v1/recommendations', {
          params: {
            limit: 20,
            seed_genres: 'pop,rock,reggaeton', // Replace with desired genres
            min_popularity: 50, // Adjust as needed
          },
          headers: {
            Authorization: `Bearer ${spotifyToken}`,
          },
        });


        setTracks(response.data.tracks);
        setCargando(false);
        console.log(response.data.tracks);

      } catch (error) {
        console.log(error);
      }

    }

    getTracks();


  }, [spotifyToken])


  return (
    <>
      <div className='bg-slate-700 p-5 text-center'>
        <h1 className='text-emerald-400 text-3xl'>Recomendaciones</h1>
      </div>
      <section className={`${cargando ? 'grid-cols-1' : 'grid grid-cols-4'} place-items-center p-10 max-w-screen-2xl mx-auto`}>
        {cargando ?
          (
            <Spinner />
          )
          :
          (
            tracks.map(track => (
              <Track key={track.id} id={track.id} name={track.name} img={track.album.images[0].url} />
            ))
          )


        }

      </section>

      <audio controls>
        <source src="URL_DE_LA_PISTA" type="audio/mpeg" />
          Tu navegador no soporta la etiqueta de audio.
      </audio>
    </>

  )
}

export default Dashboard