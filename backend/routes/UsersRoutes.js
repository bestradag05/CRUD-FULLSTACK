import  express from "express";
import Users from "../Models/Users.js";
import {listarUsuarios, 
    registrarUsuarios, 
    actualizarUsuario,
    eliminarUsuario,
    confirmarUsuario,
    olvidePassword} from '../controllers/UsersController.js';

const router = express.Router();


router.get('/usuarios', listarUsuarios)
router.post('/usuarios', registrarUsuarios);
router.put('/usuarios/:id', actualizarUsuario);
router.delete('/usuarios/:id', eliminarUsuario);

router.get('/usuarios/confirmar/:token', confirmarUsuario);
router.post('/usuarios/olvidepassword', olvidePassword);
export default router;