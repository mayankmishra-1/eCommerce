import express from "express";
import { createProduct, updateStock, getProducts } from "../controllers/productController.js";
import authenticate from "../middlewares/authMiddleware.js";
import { allowRole } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post("/product", authenticate, allowRole("ADMIN"), createProduct);

router.put("/product/stock", authenticate, allowRole("ADMIN"), updateStock);

router.get("/product", getProducts);

export default router;