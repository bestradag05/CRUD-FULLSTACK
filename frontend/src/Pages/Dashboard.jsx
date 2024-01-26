import React, { useEffect } from 'react'
import { redirect, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
  const urlParams = new URLSearchParams(location.search);
  const spotifyCode = urlParams.get("code");

  if(spotifyCode === null){

    navigate("/");
    localStorage.removeItem("token");

  }

  const getToken = async () => {
    try {
      const data = new URLSearchParams();
      data.append('code', spotifyCode);
      data.append('redirect_uri', 'http://localhost:5173/admin');
      data.append('grant_type', 'authorization_code');

      const tokenSpotify = localStorage.getItem('spotifyToken');

      if(!tokenSpotify){

        const respuesta = await axios.post('https://accounts.spotify.com/api/token', data, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(`${import.meta.env.VITE_CLIENT_ID}:${import.meta.env.VITE_CLIENT_SECRET}`)
          }
        });
  
        localStorage.setItem('spotifyToken', respuesta.data.access_token);
      }

    } catch (error) {
      console.log(error);
    }
  };

  getToken();

  const getTracks = async () => {

    try {
      const response = await axios.get("https://api.spotify.com/v1/search", {
        params: {
          q: 'genre:reggaeton', // Puedes ajustar los parámetros de búsqueda según tus preferencias
          type: 'track',
          limit: 20,
        },
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('spotifyToken')
        }
      });

      console.log(response);
  
      /* const tracks = await axios.get('https://api.spotify.com/v1/tracks', {
        params: {
          ids: 
        }
      }) */
    } catch (error) {
      console.error(error);
    }
  }

  getTracks();


  },[location.search]) 

  

  return (
    <div>Dashboard</div>
  )
}

export default Dashboard