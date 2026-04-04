import express from 'express';
import upload from '../middleware/multer.js';
import { addFood, getAllFoods, getSingleFood, removeFood } from '../controllers/foodController.js';
import adminAuth from '../middleware/adminAuth.js';

const foodRouter = express.Router();

foodRouter.post('/add', adminAuth, upload.fields([{ name: 'image', maxCount: 1 }]), addFood);
foodRouter.get('/getAll', getAllFoods); 
foodRouter.get('/getSingle/:id', getSingleFood);
foodRouter.post('/remove/:id', adminAuth, removeFood);

export default foodRouter;