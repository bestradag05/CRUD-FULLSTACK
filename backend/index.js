import express  from "express";
import usersRoutes from "./routes/UsersRoutes.js";

const app = express();
const port = 3000;

app.use('/', usersRoutes);

app.listen(port, () => {
    console.log(`Proyecto corriendoen el puerto: ${port}`);
})
