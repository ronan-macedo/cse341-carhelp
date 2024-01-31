const express = require("express");
const router = new express.Router();
const utils = require('../utils');
const customersController = require('../controllers/customers-controller');
const cutomersValidate = require('../utils/customers-validator');

router.get(
    '/',
    utils.checkLogged,
    utils.errorHandler(customersController.getAllCustomers));
router.get(
    '/:id',
    utils.checkLogged,
    cutomersValidate.customerIdValidationRules(),
    cutomersValidate.checkCustomer,
    utils.errorHandler(customersController.getCustomer));
router.post(
    '/',
    utils.checkLogged,
    cutomersValidate.createCustomerValidationRules(),
    cutomersValidate.checkCustomer,
    utils.errorHandler(customersController.createCustomer));
router.put(
    '/:id',
    utils.checkLogged,
    cutomersValidate.updateCustomerValidationRules(),
    cutomersValidate.checkCustomer,
    utils.errorHandler(customersController.updateCustomer));
router.delete(
    '/:id',
    utils.checkLogged,
    cutomersValidate.customerIdValidationRules(),
    cutomersValidate.checkCustomer,
    utils.errorHandler(customersController.deleteCustomer));

module.exports = router;