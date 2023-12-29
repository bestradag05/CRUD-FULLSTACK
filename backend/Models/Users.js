import  DataTypes  from 'sequelize';
import sequelize from '../config/db.js';
import generarId from '../helpers/generarToken.js';
import bcrypt from 'bcrypt';


const Users = sequelize.define('users', {
    id: {
       type: DataTypes.INTEGER,
       autoIncrement: true,
       primaryKey: true
    },
    nombre: DataTypes.TEXT,
    email: DataTypes.TEXT,
    password: DataTypes.TEXT,
    token: {
        type: DataTypes.TEXT,
        defaultValue: generarId(),

    },
    confirmado: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
},{
    timestamps: false
})

Users.beforeSave(async (user, option) => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt); 
});

Users.prototype.comprobarPassword = async function(passwordFormulario) {
    return await bcrypt.compare(passwordFormulario, this.password);
}

export default Users;