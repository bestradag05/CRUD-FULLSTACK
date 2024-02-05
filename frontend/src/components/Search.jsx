import axios from 'axios';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import TrackInfo from '../Pages/TrackInfo';

const Search = () => {

  const { spotifyToken } = useAuth();
  const [query, setQuery] = useState("");
  const [trackSearch, setTrackSearch] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {

    if (query !== "") {
      const searchTrack = async () => {

        try {
          // enviamos la solicitud de la musica a buscar, primero preparamos nuestra query a buscar codificandola 
          const response = await axios('https://api.spotify.com/v1/search', {
            params: {
              q: encodeURIComponent(query),
              type: 'track',
              market: 'ES', // Código de país ISO 3166-1 alfa-2, por ejemplo, 'ES' para España
              limit: 5, // Número máximo de resultados por tipo de elemento
              offset: 0, // Índice del primer resultado a devolver
              include_external: 'audio', // Indica que el cliente puede reproducir contenido de audio alojado externamente
            },
            headers: {
              Authorization: `Bearer ${spotifyToken}`,
            },
          });


          //Extraer los datos que necesitamos para armar nuestra respuesta y agregarlo al select-react segun lo solicitado
          const tracks = response.data.tracks.items.map(track => ({
            label: `${track.name} - ${track.artists.map(artist => artist.name).join(', ')}`,
            value: track.id
          }));
          // agregamos al estado
          setTrackSearch(tracks);
        } catch (error) {
          console.log(error);
        }

      }

      searchTrack();
    } else {
      setTrackSearch([]);
    }

  }, [query])

  const handleClickTrackInfo = async (e) => {

    // Buscar detalle de la cancion

    try {
      // al darle click algun elemento de select-react este va buscar por su id y traer la informacion a detalle del track o album
      const response = await axios(`https://api.spotify.com/v1/tracks/${e.value}`,
        {
          headers: {
            Authorization: `Bearer ${spotifyToken}`,
          },
        });

      // Una vez obtenido el track se redireciona con la informacion hacer la pagina track-info
      navigate('/admin/track-info', { state: { data: response.data } });

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex justify-center items-center p-5 mb-5 mt-10">
      <Select className='w-1/2 lg:w-1/3'
        onInputChange={(inputValue) => setQuery(inputValue)} options={trackSearch} onChange={handleClickTrackInfo} placeholder="Busque la musica que desea"
        classNamePrefix="search" unstyled
      />
    </div>
  );
}

export default Search;