import  express from "express";
import Users from "../Models/Users.js";
import {listarUsuarios, 
    registrarUsuarios, 
    actualizarUsuario} from '../controllers/UsersController.js';

const router = express.Router();


router.get('/listar', listarUsuarios)
router.post('/registrar', registrarUsuarios);
router.put('/actualizar/:id', actualizarUsuario);
export default router;