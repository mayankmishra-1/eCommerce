import Product from "../models/Product.js";

export const createProduct = async (req, res) => {

    const { name, price, stock } = req.body;

    const product = await Product.create({
        name,
        price,
        stock
    });

    res.json(product);
};

export const updateStock = async (req, res) => {

    const { productId, stock } = req.body;

    const product = await Product.findById(productId);

    product.stock = stock;

    await product.save();

    res.json(product);
};

export const getProducts = async (req, res) => {

    const products = await Product.find();

    res.json(products);
};