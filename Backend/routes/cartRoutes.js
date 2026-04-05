import { addCartItem, listCartItems, removeCartItem, updateCartItem } from '../controllers/cartController.js'
import express from 'express'

const cartRouter = express.Router()

cartRouter.post('/add', addCartItem)
cartRouter.get('/list', listCartItems)
cartRouter.post('/update/:id', updateCartItem)
cartRouter.post('/remove/:id', removeCartItem)

export default cartRouter