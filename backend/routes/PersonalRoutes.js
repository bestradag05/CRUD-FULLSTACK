import  express from "express";

const router = express.Router();


router.get('/login', (req, res) => {
   res.json({msg: 'Login'});
})

export default router;