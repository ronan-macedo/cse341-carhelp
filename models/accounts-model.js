const connection = require('../database/connection').getConnection;
const accountsModel = {};
const accountsCollection = connection().collection('accounts');

accountsModel.registerAccount = async (account) => {
    return await accountsCollection.insertOne(account);
}

accountsModel.getAccountByEmail = async (email) => {
    return await accountsCollection.findOne({ email: email });
}

module.exports = accountsModel;