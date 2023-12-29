import { useEffect, useState } from "react";
import Alert from "../components/Alert";
import { Link, useParams } from "react-router-dom";

const ActualizarPassword = () => {
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordModificado, setPasswordModificado] = useState(false);

  const [alerta, setAlerta] = useState({});
  const params = useParams();

  const { token } = params;

  useEffect(() => {
    fetch(`http://localhost:3000/usuarios/recuperar-password/${token}`)
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
          msg: "Coloca tu nuevo password",
        });

        setTokenValido(true);
      })
      .catch((error) => {
        setAlerta({
          msg: error.message,
          error: true,
        });
      });
  }, []);

  const actualizarPassword = (e) => {
    e.preventDefault();

    if ([password, repetirPassword].includes("")) {
      setAlerta({
        msg: "Los campos son obligatorios",
        error: true,
      });
      return;
    }

    if (password.length < 6) {
      setAlerta({
        msg: "El password es muy corto, agrega minimo 6 caracteres",
        error: true,
      });
      return;
    }

    if (password != repetirPassword) {
      setAlerta({
        msg: "Los password no coinciden",
        error: true,
      });
      return;
    }

    fetch(`http://localhost:3000/usuarios/recuperar-password/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
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

        setPasswordModificado(true);
      })
      .catch(error => {
        setAlerta({
            msg: error.message,
            error: true
        })
      })
  };

  return (
    <div className="container-fluid h-screen grid grid-cols-2 ">
      <div className="w-full h-full bg-emerald-400 flex justify-center items-center">
        <h1 className="text-3xl px-10 text-white font-bold uppercase">
          Actualiza tu password para poder recuperar tu{" "}
          <span className="text-[#364960]">cuenta</span>{" "}
        </h1>
      </div>

      <div>
        <div className="bg-[#364960] h-full flex flex-col justify-center items-center py-4 ">
          {alerta.msg && <Alert alerta={alerta} setAlerta={setAlerta} />}

          {tokenValido && (
            <form action="" className="w-3/5" onSubmit={actualizarPassword}>
              <div className="mb-5">
                <label
                  htmlFor="password"
                  className="text-1xl text-white uppercase block"
                >
                  Nuevo Password
                </label>
                <input
                  type="password"
                  className="bg-transparent border-b mt-2 text-white w-full focus:outline-none"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingrese nuevo password"
                />
              </div>

              <div className="mb-5">
                <label
                  htmlFor="repetirpassword"
                  className="text-1xl text-white uppercase block"
                >
                  Repetir Password
                </label>
                <input
                  type="password"
                  className="bg-transparent border-b mt-2 text-white w-full focus:outline-none"
                  value={repetirPassword}
                  onChange={(e) => setRepetirPassword(e.target.value)}
                  placeholder="Repite password"
                />
              </div>

              <div className="flex items-center gap-10 mt-16">
                <button className="text-white px-5 py-2 rounded-3xl bg-emerald-400">
                  Actualizar Password
                </button>
                {passwordModificado &&
                (
                    <p><Link to="/" className="text-white font-light text-sm subrayado">Iniciar Sesion</Link></p>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActualizarPassword;
