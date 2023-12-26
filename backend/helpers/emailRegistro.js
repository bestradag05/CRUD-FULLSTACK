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

      // Armamos la estructura del envio de correos

      console.log(nombre);
}

export default emailRegistro;