import styled from 'styled-components';
import useAuth from '../hooks/useAuth';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

const Card = styled.div`
    display: grid; 
    grid-row: span 2;
    grid-template-rows: subgrid;
    
`;


const Track = ({ name, img, preview, setPlayPreview, curretPreview, setCurrentPreview}) => {

    const [isPlay, setIsPlay] = useState(false);

    useEffect(() => {
        if(curretPreview && curretPreview !== preview){
            setIsPlay(false);
        }
    }, [curretPreview, preview])

    const handlePlayTrack = () => {
        //Obtenemos el estado del reproductor
        if (!isPlay) {
            setIsPlay(true);
            setCurrentPreview(preview);
            setPlayPreview(preview);
        } else {
            setIsPlay(false);
            setPlayPreview(null);

        }

    }

    return (
        <>


            <Card className="w-80 max-w-lg m-5">

                <div className="relative">
                    <img src={img} alt="" className="object-cover w-full h-full" />

                    {
                        preview ?
                            (
                                <div className='absolute flex justify-center items-center bottom-5 left-5 w-14 h-14 rounded-full bg-emerald-500 cursor-pointer' onClick={handlePlayTrack}>
                                    {
                                        !isPlay ?
                                            (
                                                <i className="fa-sharp fa-solid fa-play"></i>
                                            ) :
                                            (
                                                <i className="fa-sharp fa-solid fa-pause"></i>
                                            )
                                    }

                                 
                                </div>
                            ) : null
                    }

                </div>
                <div className="flex flex-col items-center justify-center bg-slate-700">
                    <h2 className="text-center text-sm font-bold py-5 px-2 text-white">{name}</h2>
                </div>
            </Card>

        </>


    );
}

export default Track;