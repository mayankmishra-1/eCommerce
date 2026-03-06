import express from "express";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

import "./utils/cartExpiryJob.js";

dotenv.config();

const app = express();

app.use(express.json());

connectDB();

app.use("/api", productRoutes);
app.use("/api", cartRoutes);
app.use("/api", orderRoutes);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});