const express = require("express");
const router = new express.Router();
const utils = require('../utils');
const customersController = require('../controllers/customers-controller');
const cutomersValidate = require('../utils/customers-validator');

router.get('/', utils.errorHandler(customersController.getAllCustomers));
router.get(
    '/:id',
    cutomersValidate.customerIdValidationRules(),
    cutomersValidate.checkCustomer,
    utils.errorHandler(customersController.getCustomer));
router.post(
    '/',
    cutomersValidate.createCustomerValidationRules(),
    cutomersValidate.checkCustomer,
    utils.errorHandler(customersController.createCustomer));
router.put(
    '/:id',
    cutomersValidate.updateCustomerValidationRules(),
    cutomersValidate.checkCustomer,
    utils.errorHandler(customersController.updateCustomer));
router.delete(
    '/:id',
    cutomersValidate.customerIdValidationRules(),
    cutomersValidate.checkCustomer,
    utils.errorHandler(customersController.deleteCustomer));

module.exports = router;