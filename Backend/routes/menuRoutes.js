import express from 'express';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';
import { addMenu, getAllMenus, removeMenu } from '../controllers/menuController.js';

const menuRouter = express.Router();

menuRouter.post('/add', adminAuth, upload.fields([{ name: 'image', maxCount: 1 }, { name: 'menuImage', maxCount: 1 }]), addMenu);
menuRouter.get('/getAll', getAllMenus);
menuRouter.post('/remove/:id', adminAuth, removeMenu);

export default menuRouter;
