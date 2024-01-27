import React, { useEffect, useState } from 'react'
import { redirect, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import axios from 'axios';
import Track from '../components/Track';

const Dashboard = () => {

  const { spotifyToken } = useAuth();
  const [tracks, setTracks] = useState([]);

  useEffect(() => {

    const getTracks = async () => {
      try {

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
        console.log(tracks);

      } catch (error) {
        console.log(error);
      }

    }

    getTracks();


  }, [])


  return (
    <>
      <div className='bg-slate-700 p-5 text-center'>
        <h1 className='text-emerald-400 text-3xl'>Recomendaciones</h1>
      </div>
      <section className='flex justify-center items-center flex-wrap p-10 gap-10'>
        {
          tracks.map(track => (
            <Track key={track.id} name={track.name} img={track.album.images[0].url}/>
          ))
          
        }
        
      </section>
    </>

  )
}

export default Dashboard