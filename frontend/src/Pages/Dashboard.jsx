import React, { useEffect, useRef, useState } from 'react'
import { redirect, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import axios from 'axios';
import Track from '../components/Track';
import Spinner from '../components/Spinner';
import Search from '../components/Search';

const Dashboard = () => {

  const { spotifyToken } = useAuth();
  const [tracks, setTracks] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [playPreview, setPlayPreview] = useState("");
  const [curretPreview, setCurrentPreview] = useState(null);
  const [showPlayer, setShowPlayer] = useState(false);


  const trackRef = useRef(null);

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


  useEffect(() => {

    if (playPreview) {
      trackRef.current.src = playPreview;
      trackRef.current.play();
      setShowPlayer(true);


    } else {
      trackRef.current.pause();
      setShowPlayer(false);
    }

  }, [playPreview])


  return (
    <>


    <Search />
      <div className='p-5 text-center'>
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
              <Track
                key={track.id}
                name={track.name}
                img={track.album.images[0].url}
                preview={track.preview_url}
                setPlayPreview={setPlayPreview}
                curretPreview={curretPreview}
                setCurrentPreview={setCurrentPreview}

              />
            ))
          )


        }

      </section>

      <div className={`${showPlayer ? ' bottom-0' : '-bottom-36'} bg-white shadow-2xl transition-all fixed w-full p-10 flex justify-center items-center `}>
        <audio ref={trackRef} controls >
          <source type="audio/mp3" />
        </audio>
      </div>



    </>

  )
}

export default Dashboard