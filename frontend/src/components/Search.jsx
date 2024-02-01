import axios from 'axios';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import useAuth from '../hooks/useAuth';

const Search = () => {

  const { spotifyToken } = useAuth();
  const [query, setQuery] = useState("");
  const [trackSearch, setTrackSearch] = useState([]);

  useEffect(() => {
    if (query !== "") {
      const searchTrack = async () => {

        try {
          const response = await axios.get('https://api.spotify.com/v1/search', {
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
          console.log(response.data.tracks.items);

          //Extraer los datos relevantes de la respuesta

          const tracks = response.data.tracks.items.map(track => ({
            label: `${track.name} - ${track.artists.map(artist => artist.name).join(', ')}`,
            value: track.id
          }));  

          setTrackSearch(tracks);
        } catch (error) {
          console.log(error);
        }

      }

      searchTrack();
    }else{
      setTrackSearch([]);
    }

  }, [query])

  return (
    <div className="flex justify-center items-center p-5 mb-5">
      <Select className='w-1/3'
        onInputChange={(inputValue) => setQuery(inputValue)}  options={trackSearch} />
    </div>
  );
}

export default Search;