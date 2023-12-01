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
        const usuario = await Users.findOne({
            where: {idusers: req.params.id}
        });

       
        

    } catch (error) {
        res.json({msg: 'Error al encontrar o actualizar el usuario'});
    }
 }

 export {
    listarUsuarios,
    registrarUsuarios,
    actualizarUsuario
 }

