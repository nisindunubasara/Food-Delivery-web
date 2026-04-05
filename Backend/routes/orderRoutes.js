import { addOrder, listOrders, updateOrder, removeOrder } from '../controllers/orderController.js'
import express from 'express'
import adminAuth from '../middleware/adminAuth.js'

const orderRouter = express.Router()

orderRouter.post('/add', addOrder)
orderRouter.get('/list', listOrders)
orderRouter.post('/update/:id',  adminAuth, updateOrder)
orderRouter.put('/update/:id', adminAuth, updateOrder)
orderRouter.post('/remove/:id', adminAuth, removeOrder)
orderRouter.delete('/remove/:id', adminAuth, removeOrder)

export default orderRouter