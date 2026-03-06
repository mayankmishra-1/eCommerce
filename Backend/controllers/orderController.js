import mongoose from "mongoose";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

export const checkout = async (req, res) => {

    const session = await mongoose.startSession();

    session.startTransaction();

    try {

        const { idempotencyKey } = req.body;

        const existingOrder = await Order.findOne({ idempotencyKey });

        if (existingOrder) {
            return res.json(existingOrder);
        }

        const cart = await Cart.findOne({ userId: req.user.id }).session(session);

        if (!cart) {
            throw new Error("Cart empty");
        }

        let total = 0;

        const items = [];

        for (const item of cart.items) {

            const product = await Product.findById(item.productId).session(session);

            const availableStock = product.stock - product.reservedStock;

            if (availableStock < 0) {
                throw new Error("Stock issue");
            }

            product.stock -= item.quantity;
            product.reservedStock -= item.quantity;

            await product.save({ session });

            total += item.quantity * product.price;

            items.push({
                productId: product._id,
                quantity: item.quantity,
                price: product.price
            });
        }

        const order = await Order.create([{
            userId: req.user.id,
            items,
            totalAmount: total,
            idempotencyKey,
            status: "CONFIRMED"
        }], { session });

        await Cart.deleteOne({ _id: cart._id }).session(session);

        await session.commitTransaction();

        res.json(order);

    } catch (err) {

        await session.abortTransaction();

        res.status(400).json({ message: err.message });
    }

    session.endSession();
};

export const cancelOrder = async (req, res) => {

    const session = await mongoose.startSession();

    session.startTransaction();

    try {

        const order = await Order.findById(req.body.orderId).session(session);

        if (order.status === "CANCELLED") {
            throw new Error("Already cancelled");
        }

        for (const item of order.items) {

            const product = await Product.findById(item.productId).session(session);

            product.stock += item.quantity;

            await product.save({ session });
        }

        order.status = "CANCELLED";

        await order.save({ session });

        await session.commitTransaction();

        res.json(order);

    } catch (err) {

        await session.abortTransaction();

        res.status(400).json({ message: err.message });
    }

    session.endSession();
};

export const getOrders = async (req, res) => {
    try {
        let orders;
        const sortByLatest = { createdAt: -1 };
        if (req.user.role === "ADMIN") {
            orders = await Order.find().populate("items.productId").sort(sortByLatest);
        } else {
            orders = await Order.find({ userId: req.user.id }).populate("items.productId").sort(sortByLatest);;
        }
        res.json(orders);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;

        const order = await Order.findById(orderId);
        if (!order) throw new Error("Order not found");

        if (!["PENDING","CONFIRMED","SHIPPED","DELIVERED","CANCELLED","FAILED"].includes(status)) {
            throw new Error("Invalid status");
        }

        order.status = status;
        await order.save();

        res.json(order);

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};