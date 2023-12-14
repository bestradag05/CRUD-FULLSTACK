const Login = () => {
    return (
        /*  <div className="bg-[#27343D] w-full h-screen flex justify-center items-center "> */
        <div className="container-fluid h-screen grid grid-cols-2 ">

            <div className="w-full h-full bg-emerald-400 flex justify-center items-center">
                <h1 className="text-3xl px-10 text-white font-bold uppercase">Ingresa y escucha tu <span className="text-[#364960]">PlayList</span> en cualquier momento y lugar.</h1>
            </div>

            <div>
            <div className="bg-[#364960] h-full flex flex-col justify-center items-center ">
                    <div className="flex flex-row gap-4 justify-center items-center text-white mb-16">
                        <a href="" className="text-3xl font-light subrayado">Sing in</a>
                        <p className="font-light">or</p>
                        <a href="" className="text-3xl font-light text-slate-400">Sing Up</a>
                    </div>
                    <form action="" className="w-3/5">
                        <div className="mb-5">
                            <label htmlFor="usuario" className="text-2xl text-white uppercase block">Usuario</label>
                            <input type="text" className="bg-transparent border-b mt-2 text-white w-full focus:outline-none" placeholder="Ingrese usuario" />
                        </div>

                        <div className="mb-5">
                            <label htmlFor="password" className="text-2xl text-white uppercase block">Password</label>
                            <input type="password" className="bg-transparent border-b mt-2 text-white w-full focus:outline-none" placeholder="Ingrese password" />
                        </div>

                        <div className="flex items-center gap-10 mt-16">
                            <button className="text-white px-5 py-2 rounded-3xl bg-emerald-400">Iniciar Sesion</button>
                            <p><a href="" className="text-white font-light text-sm subrayado">Olvide mi contraseña</a></p>
                        </div>

                    </form>

                </div>
            </div>



        </div>


        /*  </div> */
    );
}

export default Login;