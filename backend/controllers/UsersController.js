import Users from "../Models/Users.js";
import emailRegistro from "../helpers/emailRegistro.js";
import generarId from "../helpers/generarToken.js";
import emailOlvidePassword from "../helpers/emailOlvidePassword.js";
import generarJWT from "../helpers/generarJWT.js";


const login = async (req, res) => {

    const { email, password } = req.body;

    const usuario = await Users.findOne({where: {email}});


    if(!usuario){
        const error = new Error('El usuario no existe');
        return res.status(404).json({msg: error.message});
    }

    if(!usuario.confirmado){
        const error = new Error('Tu cuenta no ha sido confirmada aun');
        return res.status(403).json({msg: error.message});
    }

    if(await usuario.comprobarPassword(password)){

        res.json({
            id: usuario.id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT(usuario.id)
        })

       
    }else{
        const error = new Error('El password es incorrecto');
        return res.status(404).json({msg: error.message});
    }


}


const perfil  = async (req, res) => {

    const { usuario } = req;

    res.json(usuario);

}

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

   const usuario = await Users.findOne({where: {token: token}})

   if(usuario){
     res.json({msg: 'Token valido y el usuario existe'});
   }else{
    const error = new Error('Token no valido');
    return res.status(404).json({msg: error.message});
   }

 }

 const actualizarPassword = async(req, res) => {

    const {token} = req.params;
    const {password} = req.body;
    const usuario = await Users.findOne({where: {token}});

    if(!usuario){
        const error = new Error('Token no valido');
        return res.status(404).json({msg: error.message})
    }

    try {

        usuario.token = null;
        usuario.password = password;

        await usuario.save();

        res.json({msg: 'Tu contraseña se actualizo correctamente'});
        
    } catch (error) {
        res.json({msg: error.message});
    }
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
    actualizarPassword,
    login,
    perfil
 }

