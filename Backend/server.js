import express from 'express'
import cors from 'cors'
import connectDB from './configs/mongoDB.js'
import dotenv from 'dotenv'
import foodRouter from './routes/foodRoutes.js'
import userRouter from './routes/userRoutes.js'
import menuRouter from './routes/menuRoutes.js'
import connectCloudinary from './configs/cloudinary.js'
import webhookRouter from './routes/webhookRouter.js'
import orderRouter from './routes/orderRoutes.js'
import cartRouter from './routes/cartRoutes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

app.use('/api/webhook/clerk', express.raw({ type: 'application/json' }))

connectDB();
connectCloudinary();

app.use('/api/food', foodRouter);
app.use('/api/user', userRouter);
app.use('/api/menu', menuRouter);
app.use('/api/webhook', webhookRouter);
app.use('/api/order', orderRouter);
app.use('/api/cart', cartRouter);

app.get('/', (req, res) => {
  res.send('Welcome to the Food Delivery API!')
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

