const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },    
    phoneNumber: {
        type: String,
        required: true
    },    
    rfc: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Customer', customerSchema);