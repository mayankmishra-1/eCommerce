import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    items: [{
        productId: mongoose.Schema.Types.ObjectId,
        quantity: Number,
        price: Number
    }],

    status: {
        type: String,
        enum: [
            "PENDING",
            "CONFIRMED",
            "SHIPPED",
            "DELIVERED",
            "CANCELLED",
            "FAILED"
        ],
        default: "PENDING"
    },

    idempotencyKey: String,

    totalAmount: Number

}, { timestamps: true });

export default mongoose.model("Order", orderSchema);