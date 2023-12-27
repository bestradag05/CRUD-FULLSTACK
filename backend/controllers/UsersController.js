import Users from "../Models/Users.js";
import emailRegistro from "../helpers/emailRegistro.js";


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


 const olvidePassword = (req, res) => {
    try {
        res.json("Respuesta desde el metodo olvide password");
    } catch (error) {
        
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
    olvidePassword
 }

