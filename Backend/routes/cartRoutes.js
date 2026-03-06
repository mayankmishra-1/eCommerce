import express from "express";
import { addToCart, getCart, removeCartItem, updateCart } from "../controllers/cartController.js";
import authenticate from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/cart/add", authenticate, addToCart);
router.put("/cart/update", authenticate, updateCart);
router.delete("/cart/remove", authenticate, removeCartItem);
router.get("/cart", authenticate, getCart);

export default router;