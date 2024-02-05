import express  from "express";
import usersRoutes from "./routes/UsersRoutes.js";
import dotenv from 'dotenv';
import cors from "cors";


const app = express();
const port = 3000;

app.use(express.json());


dotenv.config();


app.use(cors());
app.use('/', usersRoutes);

const PORT = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Proyecto corriendoen el puerto: ${port}`);
})
