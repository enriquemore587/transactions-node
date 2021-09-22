const UserData = require('../models/userData.model')

exports.create = () => {
    let userData = new UserData({
        userName: "",
        password: "",    
        sessionLogin: "",    
        token: "",
        status: "",
        customer: "" 
    });
}