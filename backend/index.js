import express  from "express";
import usersRoutes from "./routes/UsersRoutes.js";
import cors from "cors";


const app = express();
const port = 3000;

app.use(express.json());

app.use(cors());
app.use('/', usersRoutes);

app.listen(port, () => {
    console.log(`Proyecto corriendoen el puerto: ${port}`);
})
