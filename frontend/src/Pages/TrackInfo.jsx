import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const TrackInfo = () => {

    const location = useLocation();

    const [track, setTrack] = useState(location.state.data);
    const [formatTime, setFormatTime] = useState(null);
    const [formatDate, setFormatDate] = useState(null);

    console.log(track);
    useEffect(() => {

        // Usamos una funcion para formatear nuestro tiempo de la cancion ya que viene en milisegundos
        const formatTime = (ms) => {

            const totalSegundos = Math.floor(ms / 1000);

            const minuto = Math.floor(totalSegundos / 60);
            const segundos = totalSegundos % 60;

            const formatoTiempo = `${minuto}:${segundos < 10 ? '0' : ''}${segundos}`

            setFormatTime(formatoTiempo);

        }

        formatTime(track.duration_ms);
        // Usamos una funcion para formatear nuestro fecha de la cancion
        const formatDate = (date) => {
            // Separamos la fec

            const [year, month, day] = date.split('-');
            const formattedDate = `${day}/${month}/${year}`;
            setFormatDate(formattedDate);

        }

        formatDate(track.album.release_date);

    }, [])


    return (
        <>
            <div className="grid lg:grid-cols-2 max-w-screen-2xl mx-auto p-5 pt-20">
                <div className='p-10 flex  justify-center items-center'>
                    <img src={track.album.images[0].url} alt="" />
                </div>
                <div className='text-slate-400 flex gap-3 flex-col items-center justify-center p-5'>
                    <h2 className='text-6xl text-lime-400 uppercase font-semibold text-center'>{track.name}</h2>
                    <div className='flex justify-center flex-wrap w-full mt-10'>
                        {
                            track.artists.map((artist, key) => (
                                <p key={artist.id} className='mx-2'><i className="fa-solid fa-user-music mx-2"></i>{artist.name}</p>
                            ))
                        }


                    </div>

                    <div className='flex justify-between px-14 w-3/4 mt-10'>
                        <p><i className="fa-sharp fa-solid fa-clock mx-2"></i> {formatTime}</p>
                        <p><i className="fa-sharp fa-regular fa-calendar-days mx-2"></i>{formatDate}</p>
                    </div>

                    <div className='mt-20 w-full'>
                        {
                            track.preview_url ?
                                (
                                    <AudioPlayer
                                        className='bg-transparent rounded-lg'
                                        src={track.preview_url}
                                    // other props here
                                    />
                                ) :
                                (
                                    null
                                )
                        }

                    </div>
                </div>
            </div>
        </>
    );
}

export default TrackInfo;