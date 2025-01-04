const transactionModel = require('../models/transaction.model');

async function handleTransaction(req, res) {
    const { product_id, quantity, transaction_type } = req.body;
    const transaction = { product_id, quantity, transaction_type };

    try {
        const result = await transactionModel.handleTransaction(transaction);
        res.status(200).json({ message: 'Transaction completed successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error processing transaction' });
    }
}

module.exports = { handleTransaction };
