const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userData = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },    
    sessionLogin: {
        type: Date,
        default: null
    },    
    token: {
        type: String,
        required: false,
        default: null
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    },
    customer:{
        type: Schema.Types.ObjectId, ref: 'Customer',
        required: true
    }
});

module.exports = mongoose.model('UserData', userData);