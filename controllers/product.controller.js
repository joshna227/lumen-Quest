const productModel = require('../models/product.model');

async function getAllProducts(req, res) {
    try {
        const products = await productModel.getAllProducts();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching products' });
    }
}

async function addProduct(req, res) {
    const { name, category, stock, reorder_point, description, image_url, model_number, serial_number } = req.body;
    const product = { name, category, stock, reorder_point, description, image_url, model_number, serial_number };
    try {
        const result = await productModel.addProduct(product);
        res.status(201).json({ message: 'Product added successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error adding product' });
    }
}

module.exports = { getAllProducts, addProduct };
