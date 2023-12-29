import jwt from "jsonwebtoken";

const generarJWT = (id) => {
    return jwt.sign({id} , 'clavesecreta', {
        expiresIn: "30d",
    });
};

export default generarJWT;