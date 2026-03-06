import cron from "node-cron";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

cron.schedule("*/1 * * * *", async () => {

    const expiredCarts = await Cart.find({
        expiresAt: { $lt: new Date() }
    });

    for (const cart of expiredCarts) {

        for (const item of cart.items) {

            const product = await Product.findById(item.productId);

            product.reservedStock -= item.quantity;

            await product.save();
        }

        await Cart.deleteOne({ _id: cart._id });
    }

});