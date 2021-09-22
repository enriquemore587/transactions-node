const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movements = new mongoose.Schema({
    customer: {
        type: Schema.Types.ObjectId, ref: 'Customer',
        required: true
    },
    sourceAccount: {
        type: Schema.Types.ObjectId, ref: 'Account',
        required: true
    },
    movementType: {
        type: String,
        required: true
    },
    amount: {
        type: Double,
        required: true
    },
    targetAccount: {
        type: Schema.Types.ObjectId, ref: 'Account',
        required: true
    },
    concept: {
        type: String,
        required: true
    },
    reference: {
        type: String,
        required: true
    },
    operation: {
        type: String,
        required: true
    },
    createAt: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Movements', movements);