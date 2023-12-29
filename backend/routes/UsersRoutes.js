import  express from "express";
import Users from "../Models/Users.js";
import {listarUsuarios, 
    registrarUsuarios, 
    actualizarUsuario,
    eliminarUsuario,
    confirmarUsuario,
    olvidePassword,
    comprobarToken,
    actualizarPassword,
    login,
    perfil} from '../controllers/UsersController.js';

import checkAuth from "../Middleware/authMiddleware.js";

const router = express.Router();


router.get('/usuarios', listarUsuarios)
router.post('/usuarios', registrarUsuarios);
router.put('/usuarios/:id', actualizarUsuario);
router.delete('/usuarios/:id', eliminarUsuario);

router.post('/usuarios/login', login);
router.get('/usuarios/confirmar/:token', confirmarUsuario);
router.post('/usuarios/olvidepassword', olvidePassword);
router.route('/usuarios/recuperar-password/:token').get(comprobarToken).post(actualizarPassword);

router.get('/usuarios/perfil', checkAuth, perfil);
export default router;