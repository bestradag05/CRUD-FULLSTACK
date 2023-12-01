import  DataTypes  from 'sequelize';
import sequelize from '../config/db.js';

const Users = sequelize.define('users', {
    idusers: {
       type: DataTypes.INTEGER,
       autoIncrement: true,
       primaryKey: true
    },
    nombre: DataTypes.TEXT,
    correo: DataTypes.TEXT,
    password: DataTypes.TEXT,
    rol: DataTypes.TEXT,
    
},{
    timestamps: false
})

export default Users;