import React, { useEffect, useState } from 'react'
import Login from './Login'
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Alert from '../components/Alert';

const CuentaConfirmada = () => {

    const [cuentaconfirmada, setCuentaConfirmada] = useState(false);
    const [alerta, setAlerta] = useState([]);
    const params = useParams();

    useEffect(() => {

        // al cargar el component, obtenemos el token de la url y llamamos al metodo de nuestro servidor
        const { token } = params;


        const confirmar = async () => {

            try {
                // Confirmamos la cuenta al momento que se renderiza el componente
                const { data } = await axios(`http://localhost:3000/usuarios/confirmar/${token}`);
                // Si la cuenta esta confirmada se muestra un link para iniciar secion
                setCuentaConfirmada(true);
                setAlerta({
                    msg: data.msg
                })

            } catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                })
            }

        }

        confirmar();




    }, [])

    return (
        <div className="container-fluid h-screen grid grid-cols-2 ">

            <div className="w-full h-full bg-emerald-400 flex justify-center items-center">
                <h1 className="text-3xl px-10 text-white font-bold uppercase">Ingresa y escucha tu <span className="text-[#364960]">PlayList</span> en cualquier momento y lugar.</h1>
            </div>

            <div>
                <div className="bg-[#364960] h-full flex flex-col justify-center items-center py-4 ">
                    <div className="flex flex-row gap-4 justify-center items-center text-white mb-7">

                    </div>

                    {alerta.msg && <Alert alerta={alerta} setAlerta={setAlerta} />}


                    {cuentaconfirmada && <Link className="block text-center my-5 text-white" to="/" > Iniciar Sesion</Link>}

                </div>
            </div>



        </div>
    )
}

export default CuentaConfirmada