import nodemailer from "nodemailer";

const emailOlvidePassword = async (datos) => {
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
         from: 'Recupera tu password',
         to: email,
         subject: 'Recupera tu cuenta para escuchar tu PlayList',
         html:`<p> Hola: ${nombre},</p>
         <p>Estas intentando recuperar tu cuenta de zpotify, dale click al siguiente enlace:
         <a href="http://localhost:5173/recuperar-password/${token}">Recuperar Password</a></p>`
       });
}

export default emailOlvidePassword;