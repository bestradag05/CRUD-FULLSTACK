import React, { useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../components/Alert";

const CambiarPassword = () => {
  const [email, setEmail] = useState("");
  const [alerta, setAlerta] = useState({});

  const cambiarPassword = (e) => {
    e.preventDefault();

    if (email === "") {
      setAlerta({
        msg: "El email es obligatorio",
        error: true,
      });
      return;
    }

    //Validamos que el email sea un email correcto
    //Codigo regex para correos.
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    if (!regex.test(email)) {
      setAlerta({
        msg: "No es un email correcto",
        error: true,
      });
      return;
    }

    setAlerta({});

    fetch("http://localhost:3000/usuarios/olvidepassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((respuesta) => {
        if (!respuesta.ok) {
          return respuesta.json().then((respuestaServidor) => {
            throw new Error(respuestaServidor.msg);

          });
        }
        return respuesta.json();
      })
      .then((data) => {
        setAlerta({
          msg: data.msg,
        });
      })
      .catch((error) => {
        setAlerta({
          msg: error.message,
          error: true,
        });
      });
  };

  return (
    <div className="container-fluid h-screen grid lg:grid-cols-2 ">
      <div className="w-full h-full bg-emerald-400 flex justify-center items-center">
        <h1 className="text-3xl px-10 text-white font-bold uppercase text-center">
          Ingresa tu email y recupera tu{" "}
          <span className="text-[#364960]">cuenta</span>{" "}
        </h1>
      </div>

      <div>
        <div className="bg-[#364960] h-full flex flex-col justify-center items-center py-4 ">
          {alerta.msg && <Alert alerta={alerta} setAlerta={setAlerta} />}

          <form action="" className="w-3/5" onSubmit={cambiarPassword}>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="text-1xl text-white uppercase block"
              >
                Email
              </label>
              <input
                type="text"
                className="bg-transparent border-b mt-2 text-white w-full focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingrese email"
              />
            </div>

            <div className="flex items-center gap-10 mt-16">
              <button className="text-white px-5 py-2 rounded-3xl bg-emerald-400">
                Cambiar Password
              </button>
              <p>
                <Link
                  to="/"
                  className="text-white font-light text-sm subrayado"
                >
                  Iniciar Sesion
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CambiarPassword;
