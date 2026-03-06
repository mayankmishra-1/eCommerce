import mongoose from "mongoose";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const addToCart = async (req, res) => {

    const session = await mongoose.startSession();
    session.startTransaction();

    try {

        const { productId, quantity } = req.body;

        const product = await Product.findById(productId).session(session);

        const availableStock = product.stock - product.reservedStock;

        if (availableStock < quantity) {
            throw new Error("Stock not available");
        }

        product.reservedStock += quantity;

        await product.save({ session });

        let cart = await Cart.findOne({ userId: req.user.id }).session(session);

        if (!cart) {

            cart = await Cart.create([{
                userId: req.user.id,
                items: [],
                expiresAt: new Date(Date.now() + 15 * 60 * 1000)
            }], { session });

            cart = cart[0];
        }

        cart.items.push({ productId, quantity });

        await cart.save({ session });

        await session.commitTransaction();

        res.json(cart);

    } catch (err) {

        await session.abortTransaction();

        res.status(400).json({ message: err.message });
    }

    session.endSession();
};

export const updateCart = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { productId, quantity } = req.body;

        const cart = await Cart.findOne({ userId: req.user.id }).session(session);
        if (!cart) throw new Error("Cart not found");

        const itemIndex = cart.items.findIndex(i => i.productId.toString() === productId);
        if (itemIndex === -1) throw new Error("Product not in cart");

        const product = await Product.findById(productId).session(session);
        const currentQuantity = cart.items[itemIndex].quantity;

        const diff = quantity - currentQuantity;

        const availableStock = product.stock - product.reservedStock;

        if (diff > availableStock) throw new Error("Not enough stock");

        cart.items[itemIndex].quantity = quantity;
        product.reservedStock += diff;

        await cart.save({ session });
        await product.save({ session });

        await session.commitTransaction();
        res.json(cart);

    } catch (err) {
        await session.abortTransaction();
        res.status(400).json({ message: err.message });
    }

    session.endSession();
};

export const removeCartItem = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { productId } = req.body;

        const cart = await Cart.findOne({ userId: req.user.id }).session(session);
        if (!cart) throw new Error("Cart not found");

        const itemIndex = cart.items.findIndex(i => i.productId.toString() === productId);
        if (itemIndex === -1) throw new Error("Product not in cart");

        const item = cart.items[itemIndex];
        const product = await Product.findById(productId).session(session);

        product.reservedStock -= item.quantity;
        cart.items.splice(itemIndex, 1);

        await product.save({ session });
        await cart.save({ session });

        await session.commitTransaction();
        res.json(cart);

    } catch (err) {
        await session.abortTransaction();
        res.status(400).json({ message: err.message });
    }

    session.endSession();
};

export const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id }).populate("items.productId");
        res.json(cart || { items: [] });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};