import express from "express";
import { checkout, cancelOrder, getOrders, updateOrderStatus } from "../controllers/orderController.js";
import authenticate from "../middlewares/authMiddleware.js";
import { allowRole } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post("/checkout", authenticate, checkout);

router.put("/orders/cancel", authenticate, allowRole("USER"), cancelOrder);
router.get("/orders", authenticate, allowRole('ADMIN','USER'), getOrders);
router.put("/orders/status", authenticate, allowRole("ADMIN"), updateOrderStatus);

export default router;