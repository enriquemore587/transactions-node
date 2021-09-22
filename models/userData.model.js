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
        type: Boolean,
        required: false
    },    
    token: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    customer:{
        type: Schema.Types.ObjectId, ref: 'Customer',
        required: true
    }
});

module.exports = mongoose.model('UserData', userData);