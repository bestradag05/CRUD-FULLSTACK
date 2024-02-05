import { useState } from "react";
import SingIn from "../components/SingIn";
import SingUp from "../components/SingUp";

const Login = () => {

    const [singIn, setSinIng] = useState(true);


    return (
        <div className="container-fluid h-screen grid lg:grid-cols-2 ">

            <div className="w-full h-full bg-emerald-400 flex justify-center items-center">
                <h1 className="text-3xl px-10 text-white font-bold uppercase text-center">Ingresa y busca tu musica en  <span className="text-[#364960]">SoundHarbor</span> en cualquier momento y lugar.</h1>
            </div>

            <div>
                <div className="bg-[#364960] h-full flex flex-col justify-center items-center py-4 ">
                    <div className="flex flex-row gap-4 justify-center items-center text-white mb-7">
                        <a href="#" onClick={() => setSinIng(!singIn)} className={`${singIn === true ? 'subrayado' : 'text-slate-400'} text-3xl font-light`}>Sing in</a>
                        <p className="font-light">or</p>
                        <a href="#" onClick={() => setSinIng(!singIn)} className={`${singIn === true ? 'text-slate-400' : 'subrayado'} text-3xl font-light`}>Sing Up</a>
                    </div>

                    {singIn === true ? <SingIn /> : <SingUp />}

                </div>
            </div>



        </div>
    );
}

export default Login;