const connection = require('../database/connection').getConnection;
const customersModel = {};
const customersCollection = connection().collection('customers');

customersModel.getAllCustomers = async () => {
    return await customersCollection.find().toArray();
}

customersModel.getCustomer = async (id) => {
    return await customersCollection.findOne({ _id: id });
}

customersModel.createCustomer = async (customer) => {
    return await customersCollection.insertOne(customer);
}

customersModel.updateCustomer = async (id, customer) => {
    return await customersCollection.replaceOne({ _id: id }, customer);
}

customersModel.deleteCustomer = async (id) => {
    return await customersCollection.deleteOne({ _id: id }, true);
}

module.exports = customersModel;