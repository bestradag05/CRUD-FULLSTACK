import Users from "../Models/Users.js";


const listarUsuarios =  async (req, res) => {

    const usuarios = await Users.findAll();
 
    res.json({usuarios})
 }

 const registrarUsuarios = async(req, res) => {

    try {
        const usuario = await Users.create(req.body);
        res.json({usuario});

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
    eliminarUsuario
 }

