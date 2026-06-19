import e from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./Config/db.js";
import compression from "compression";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

// Routes
import authRoutes from "./Routes/authRoutes.js";
import productRoutes from "./Routes/productRoutes.js";
import cartRoutes from "./Routes/cartRoutes.js";
import userRoutes from "./Routes/userRoutes.js";
import ordersRoutes from "./Routes/ordersRoutes.js";
import WishlistRoutes from "./Routes/WishlistRoutes.js";

const app = e();
const PORT = process.env.PORT || 5000;

/* Security */
app.use(helmet());

/**
 * Trust proxy (Render/Railway)
 */
app.set("trust proxy", 1);

/* CORS */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:4173",
      process.env.CLIENT_URL,
    ],
    credentials: true,
  })
);
/*Parsers */
app.use(e.json());
app.use(e.urlencoded({ extended: true }));
app.use(cookieParser());

/* Compression */
app.use(compression());

/*Rate Limiting */
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

/*Health Check */
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "OK",
  });
});
/*Home Route */
app.get("/", (req, res) => {
  res.send("UrbanMela API is running 🚀");
});

/* API Routes */
app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/users", userRoutes);
app.use("/orders", ordersRoutes);
app.use("/wishlist", WishlistRoutes);

/*Global Error Handler*/
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

/* Start Server*/
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();