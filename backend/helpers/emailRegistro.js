import nodemailer from "nodemailer";

const emailRegistro = async (datos) => {

    //Configuracion para envio de forma local con nodemailer
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
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
        <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar cuenta </a> </p>`
      })
     
}

export default emailRegistro;