const UserData = require('../models/userData.model')
const Customer = require('../models/customer.model')
const Account = require('../models/account.model')
const bcrypt = require('bcrypt')
const Joi = require('@hapi/joi')
const ACCOUNT_STATUS = require('../utilities/accountStatus')
const INTERNAL_ERROR = 'INTERNAL ERROR';


const schema = Joi.object({
    name: Joi.string()
        .min(3)
        .required(),    
    lastName: Joi.string()
        .min(3)
        .required(),
    phoneNumber: Joi.string()
        .min(10)
        .required(),
    rfc: Joi.string()
        .min(10)
        .required(),
    password: Joi.string()
        .pattern(/^[a-zA-Z0-9]{3,30}$/),
    nip: Joi.string()
            .min(4)
            .max(4),
    userName: Joi.string()
            .min(6)
            .required(),
    product: Joi.string()
            .min(5)
            .required()
});

exports.createAccount = (data) => {
    return new Promise((resolve, reject) => {
        const {error, value} = schema.validate({...data});
        if(error) {
            reject({ status: 400, details: error.details['0'] })
        } else {
            createCustomer(data)
            .then(customerCreated => {
                data.customerId = customerCreated;
                return createUserData(data)
            })
            .then(userData => {
                return createAccount(data)
            })
            .then(account => {
                console.log(account);
                resolve({
                    accountNumber : account.accountNumber,
                    product : account.product,
                    status : account.status
                })
            })
            .catch(err => {
                console.error(err);
                reject({ status: 500, details: INTERNAL_ERROR })
            })
        }
    });
}

function createCustomer(data) {
    return new Promise((resolve, reject) => {
        isCustomerExists(data.rfc)
        .then(customerfound => {
            if (customerfound) {
                updateCustomer(customerfound)
                .then(customerUpdated => {
                    console.log(customerUpdated._id);
                    resolve(customerUpdated._id)
                }).catch(err => {
                    reject(err)
                });
            } else {
                saveCustomer(data)
                .then( customer => {
                    resolve(customer._id)
                }).catch( err => {
                    reject(err)
                });
            }
        }).catch(err => {
            reject(err)
        })
    });
}

function createUserData(data) {
    return new Promise((resolve, reject) => {
        isUserDataExists(data.userName)
        .then(userData => {
            if(userData) {
                updateUserData(userData, data.customerId)
                .then(userDataUpdated => resolve({userDataUpdated}))
            } else {
                saveUserData(data, data.customerId)
                .then(userDataCreated => resolve({userDataCreated}))
            }
        })
        .catch(err => {
            reject(err)
        })
    });
}

function createAccount(data) {
    return new Promise((resolve, reject) => {
        isAccountExists(data)
        .then(account => {
            console.log(account)
            if(account) {
                updateAccount(data)
                .then(accountUpdated => resolve({accountUpdated}))
            } else {
                saveAccount(data)
                .then(accountCreated => resolve({accountCreated}))
            }
        })
        .catch(err => {
            reject(err)
        })
    });
}

async function isAccountExists(data) {
    let account = await Account.findOne({ product : data.product, customer: data.customerId })
    return account;
}

async function isUserDataExists(userName) {
    let user = await UserData.findOne({ userName });
    console.log(user);
    return user;
}

async function isCustomerExists(rfc) {
    let user = await Customer.findOne({ rfc });
    console.log(user);
    return user;
}

async function saveCustomer(data) {
    let customer = new Customer({
        name            : data.name,
        lastName        : data.lastName,
        phoneNumber     : data.phoneNumber,
        rfc             : data.rfc
    });
    return await customer.save();
}

async function saveUserData(data, customerId) {
    let userData = new UserData({
        userName            : data.userName,
        password            : bcrypt.hashSync( data.password, 10 ),
        customer            : customerId
    });
    return await userData.save();
}

async function saveAccount(data) {
    let account = new Account({
        accountNumber           : getAccountNumber(10),
        product                 : data.product,
        accountBalance          : 0.0,
        status                  : ACCOUNT_STATUS.ACTIVATED,
        nip                     : bcrypt.hashSync( data.nip, 10 ),
        customer                : data.customerId
    });
    return await account.save();
}

async function updateAccount(data) {
    let accountUpdated = await Account.findOneAndUpdate({ _id : data._id }, {
        nip                     : bcrypt.hashSync( data.nip, 10 )
    }, { new : true })
    return accountUpdated;
}

async function updateUserData(data, customerId) {
    let userDataUpdated = await UserData.findOneAndUpdate({ _id : data._id }, {
        $set: {
            password : bcrypt.hashSync( data.password, 10 ),
            sessionLogin : null,
            token : null,
            customer : customerId
        }
    }, {new: true});
    return userDataUpdated;
}

async function updateCustomer(data){
    let customer = await Customer.findOneAndUpdate({ _id : data._id }, {
        $set: {
            name: data.name,
            lastName: data.lastName
        }
    }, {new: true});
    return customer;
}

function getAccountNumber(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}