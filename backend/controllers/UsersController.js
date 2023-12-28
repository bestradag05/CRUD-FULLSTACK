import Users from "../Models/Users.js";
import emailRegistro from "../helpers/emailRegistro.js";
import generarId from "../helpers/generarToken.js";
import emailOlvidePassword from "../helpers/emailOlvidePassword.js";


const listarUsuarios =  async (req, res) => {

    const usuarios = await Users.findAll();
 
    res.json({usuarios})
 }

 const registrarUsuarios = async(req, res) => {

    try {
      
        const usuario = await Users.create(req.body);

        /* Una vez registrado llamamos a nuestro helper
        Para enviar el email */
        emailRegistro(usuario);

        res.json({usuario});

    } catch (error) {
        res.json({msg: error.message});
    }
   

 }

 const confirmarUsuario = async (req, res) => {

    const {token} =  req.params;
    const usuario = await Users.findOne({where: {token}});

    if(!usuario){
        const error = new Error('Token no valido');
        return res.status(404).json({msg: error.message});
    }


    try {
        const usuarioActualizado = await Users.update({
            token: null,
            confirmado: true
        }, {
            where: {
                id: usuario.id
            }
        });


        res.json({ msg: "Usuario confirmado correctamente "});



    } catch (error) {
        res.json({msg: error.message});
    }
 } 


 const olvidePassword = async (req, res) => {
    try {
        const { email } = req.body;

        const usuario = await Users.findOne({where: {email: email}})

        if(!usuario){
            const error = new Error('El usuario no existe');
            return res.status(404).json({msg: error.message});
        }

        usuario.token = generarId();
        await usuario.save();

        emailOlvidePassword({
            email,
            nombre: usuario.nombre,
            token: usuario.token
        });


        res.json({msg: 'Se te envio un correo para que puedas recuperar tu password'});
        
    } catch (error) {
        res.json({msg: error.message});
    }
 }

 const comprobarToken = async (req, res) => {
    
   const { token } = req.params;

   if(token){
     res.json({msg: 'Token valido y el usuario existe'});
   }else{
    const error = new Error('Token no valido');
    return res.status(404).json({msg: error.message});
   }

 }

 const actualizarPassword = async(req, res) => {

 }

 const actualizarUsuario = async (req, res) => {
    try {
        const usuario = await Users.update(req.body, {
            where: {
                idusers: req.params.id
            }
        })

        res.json({usuario});

    } catch (error) {
        res.json({msg: 'Error al encontrar o actualizar el usuario'});
    }
 }


 const eliminarUsuario = async (req, res) => {
    try {
        
        const usuario = await Users.destroy({
            where: {
                idusers: req.params.id
            }
        })

        res.json(usuario);

    } catch (error) {
        res.json(error);
    }
 }

 export {
    listarUsuarios,
    registrarUsuarios,
    actualizarUsuario,
    eliminarUsuario,
    confirmarUsuario,
    olvidePassword,
    comprobarToken,
    actualizarPassword
 }

