import React, { useEffect, useRef, useState } from 'react'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
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

        setCargando(true);

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
      trackRef.current.audio.current.src = playPreview
      trackRef.current.audio.current.play()
      setShowPlayer(true);





    } else {
      trackRef.current.audio.current.pause();
      setShowPlayer(false);
    }

  }, [playPreview])


  return (
    <>


      <Search />
      <div className='p-5 text-center'>
        <h1 className='text-emerald-500 uppercase font-bold text-4xl'>Recomendaciones</h1>
      </div>
      <section className={`${cargando ? 'grid-cols-1' : ' 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2'} grid place-items-center p-10 max-w-screen-2xl mx-auto`}>
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

      <div id='player' className={`${showPlayer ? ' bottom-0' : '-bottom-52'} bg-slate-800 shadow-2xl transition-all fixed w-full p-10 flex justify-center items-center `}>

        <AudioPlayer
          className='bg-transparent rounded-lg'
          ref={trackRef}
        // other props here
        />

      </div>



    </>

  )
}

export default Dashboard