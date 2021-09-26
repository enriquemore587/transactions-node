const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const account = new mongoose.Schema({
    accountNumber: {
        type: String,
        required: true,
        unique: true
    },
    product:{
        type: String,
        required: true
    },
    accountBalance: {
        type: Number,
        required: true,
        default: 0.0
    },
    status: {
        type: String,
        required: true
    },
    nip: {
        type: String,
        required: true
    },
    customer: {
        type: Schema.Types.ObjectId, ref: 'Customer',
        required: true
    }
});

module.exports = mongoose.model('Account', account);