import express from "express";
import { addToCart, getCart, removeCartItem, updateCart } from "../controllers/cartController.js";
import authenticate from "../middlewares/authMiddleware.js";
import { allowRole } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post("/cart/add", authenticate, authenticate,allowRole("USER"), addToCart);
router.put("/cart/update", authenticate, authenticate,allowRole("USER"), updateCart);
router.delete("/cart/remove", authenticate, authenticate,allowRole("USER"), removeCartItem);
router.get("/cart", authenticate,allowRole("USER"), getCart);

export default router;