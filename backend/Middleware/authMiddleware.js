import jwt from "jsonwebtoken";
import Users from "../Models/Users.js";


const checkAuth = async (req, res, next) => {
    let token;

   
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            //indicamos que divida la cadena desde el espacio y que tome la segunda parte, la posicion 1
            token = req.headers.authorization.split(' ')[1];
           
            const decoded = jwt.verify(token, 'clavesecreta');
           
            req.usuario = await Users.findOne({
                where: {id: decoded.id},
                attributes: {
                    exclude: ['password', 'token', 'confirmado']
                }
            } );

            return next();
        } catch (error) {
            const e = new Error('Token no valido');
            res.status(403).json({ msg: e.message });
        }

        if(!token){
            const error = new Error("Token no valido o inexistente");
            res.status(403).json({ msg: error.message });
        }
        next();
    }

}

export default checkAuth;