const PRODUCTS = require('../utilities/products')

exports.createAccount = (req, res) => {
    switch (req.params.typeAccount) {
        case PRODUCTS.CHECKBOOK:
        case PRODUCTS.CREDIT:
        case PRODUCTS.DEBIT:
            res.status(201).json({ name: 'john' });
            break;
        default:
            res.status(400).json({ name: 'john' });
            break;
    }
}