const customersModel = require('../models/customers-model');
const objectId = require('mongodb').ObjectId;
const customersController = {};

customersController.getAllCustomers = async (req, res) => {
    try {
        const customers = await customersModel.getAllCustomers();
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

customersController.getCustomer = async (req, res) => {
    try {
        const id = new objectId(req.params.id);
        const customer = await customersModel.getCustomer(id);

        if (!customer) {
            res.status(404).json({ error: "Customer not found!" });
            return;
        }

        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

customersController.createCustomer = async (req, res) => {
    try {
        const customer = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            age: req.body.age,
            address: {
                addressFirstLine: req.body.address.addressFirstLine,
                addressSecondLine: req.body.address.addressSecondLine,
                city: req.body.address.city,
                region: req.body.address.region,
            },
        };

        const response = await customersModel.createCustomer(customer);

        if (response.acknowledged) {
            res.status(201).send();
            return;
        }

        res.status(400).json({ error: "Error while creating new customer!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

customersController.updateCustomer = async (req, res) => {
    try {
        const customerId = new objectId(req.params.id);
        const customer = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            age: req.body.age,
            address: {
                addressFirstLine: req.body.address.addressFirstLine,
                addressSecondLine: req.body.address.addressSecondLine,
                city: req.body.address.city,
                region: req.body.address.region,
            },
        };

        const response = await customersModel.updateCustomer(customerId, customer);

        if (response.matchedCount > 0) {
            res.status(200).send();
            return;
        }

        res.status(400).json({ error: "Error while updating a customer!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

customersController.deleteCustomer = async (req, res) => {
    try {
        const customerId = new objectId(req.params.id);
        const response = await customersModel.deleteCustomer(customerId);

        if (response.deletedCount > 0) {
            res.status(204).send();
            return;
        }

        res.status(400).json({ error: "Error while deleting a customer!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = customersController;