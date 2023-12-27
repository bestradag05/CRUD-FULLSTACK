import nodemailer from "nodemailer";

const emailRegistro = async (datos) => {

    //Configuracion para envio de forma local con nodemailer
    const transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "b3ea8255500f9d",
          pass: "14ba883f51acad"
        }
      });

      //Destructuramos lo que viene en el cuerpo del request

      const { email, nombre, token } = datos; 

      console.log("El token es el siguiente",token);
      // Armamos la estructura del envio de correos
      const info = await transporter.sendMail({
        from: 'Comprueba tu cuenta',
        to: email,
        subject: 'Comprueba tu cuenta para poder iniciar sesion',
        html:`<p> Hola: ${nombre},</p>
        <p>Tu cuenta ya esta lista, solo debes comprobarla en el siguiente enlace:
        <a href="http://localhost:5173/confirmar/${token}">Comprobar cuenta </a> </p>`
      })
     
}

export default emailRegistro;