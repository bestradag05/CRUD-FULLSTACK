import mysql from 'mysql';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'personal',
    port: 3306
});

connection.connect((error) => {
    if(error){
        console.log('Error al conectar:', error.message);
    }else{
        console.log('Conexion exitosa a Mysql');
    }

});


export default connection;
