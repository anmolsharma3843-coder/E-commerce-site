import e from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import { connectDB } from './Config/db.js';
import compression from "compression";
import path from "path";

// Import routes
import authRoutes from './Routes/authRoutes.js' 
import productRoutes from './Routes/productRoutes.js' 
import cartRoutes from './Routes/cartRoutes.js'
import userRoutes from './Routes/userRoutes.js' 
// import  categoryRoutes from './Routes/categoryRoutes.js'
import ordersRoutes from './Routes/ordersRoutes.js'
import WishlistRoutes from './Routes/WishlistRoutes.js'

const app = e();

app.use(cors({
 origin: [
      "http://localhost:5173",
      "http://localhost:4173",
    ],
  credentials: true
}));
app.use(e.json());
app.use(e.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());

// Connect DB
connectDB();

// Base route
app.get("/", (req, res) => res.send('Hello'));

// Mount routes
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/users', userRoutes);
// app.use('/category', categoryRoutes);
app.use("/orders", ordersRoutes);
app.use('/wishlist',WishlistRoutes)
app.use("/uploads", e.static("uploads"));

app.listen(5100, () => {
  console.log('Server is running on http://localhost:5100/');
});
