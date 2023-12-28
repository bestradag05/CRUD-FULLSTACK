import  express from "express";
import Users from "../Models/Users.js";
import {listarUsuarios, 
    registrarUsuarios, 
    actualizarUsuario,
    eliminarUsuario,
    confirmarUsuario,
    olvidePassword,
    comprobarToken,
    actualizarPassword} from '../controllers/UsersController.js';

const router = express.Router();


router.get('/usuarios', listarUsuarios)
router.post('/usuarios', registrarUsuarios);
router.put('/usuarios/:id', actualizarUsuario);
router.delete('/usuarios/:id', eliminarUsuario);

router.get('/usuarios/confirmar/:token', confirmarUsuario);
router.post('/usuarios/olvidepassword', olvidePassword);
router.route('/usuarios/recuperar-password/:token').get(comprobarToken).post(actualizarPassword);
export default router;