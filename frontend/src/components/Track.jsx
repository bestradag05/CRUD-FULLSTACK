import styled from 'styled-components';
import useAuth from '../hooks/useAuth';
import axios from 'axios';
const Card = styled.div`
    display: grid; 
    grid-row: span 2;
    grid-template-rows: subgrid;
    
`;


const Track = ({ name, img, id}) => {

    const { spotifyToken } = useAuth();

    const handleTrack = async () => {
        //Obtenemos el estado del reproductor
        
        try {
            const response = await axios.get('https://api.spotify.com/v1/me/player',{
                headers : {
                    'Authorization': `Bearer ${spotifyToken}`,
                }
            }) 
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>

            <Card className="max-w-lg m-5 cursor-pointer" onClick={handleTrack}>
                <div className="">
                    <img src={img} alt="" className="object-cover w-full h-full" />
                </div>
                <div className="flex flex-col items-center justify-center bg-slate-700">
                    <h2 className="text-center text-md font-bold py-5 text-white">{name}</h2>
                </div>
            </Card>

        </>


    );
}

export default Track;