import {adminLogin} from "../controllers/userController.js";
import express from 'express';

const userRouter = express.Router();

userRouter.post('/admin', adminLogin);

export default userRouter;