import  express from "express";
import connection from "../config/db.js";

const router = express.Router();


router.get('/login', (req, res) => {

    try {

        connection.query('SELECT * FROM users', (error, resultados) => {
            if(error){
                console.log('Error al obtener los datos de los usuarios');
                res.json({msg: 'Error al obtener los usuarios'});
            }else{
                console.log(resultados);
                res.json({resultados});
            }
       })

        connection.end();
    } catch (error) {
        connection.end();
    }
  
})

export default router;