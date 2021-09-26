const PRODUCTS = require('../utilities/products')
const accountService = require('../services/account.service')

exports.createAccount = (req, res) => {
    switch (req.params.typeAccount) {
        case PRODUCTS.CHECKBOOK:
        case PRODUCTS.CREDIT:
        case PRODUCTS.DEBIT:
            req.body.product = req.params.typeAccount;
            console.log('body=>', req.body)
            accountService.createAccount(req.body)
            .then(resp => res.status(201).json({ ...resp }))
            .catch(error => {
                console.log("error=>", error);
                res.status(error.status).json({ ...error.details })
            })
            break;
        default:
            res.status(400).json({ name: 'john' });
            break;
    }
}