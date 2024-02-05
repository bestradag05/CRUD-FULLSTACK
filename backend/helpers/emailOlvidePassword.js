import nodemailer from "nodemailer";

const emailOlvidePassword = async (datos) => {
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
         from: 'Recupera tu password',
         to: email,
         subject: 'Recupera tu cuenta para escuchar tu PlayList',
         html:`<p> Hola: ${nombre},</p>
         <p>Estas intentando recuperar tu cuenta de zpotify, dale click al siguiente enlace:
         <a href="${process.env.FRONTEND_URL}/recuperar-password/${token}">Recuperar Password</a></p>`
       });
}

export default emailOlvidePassword;