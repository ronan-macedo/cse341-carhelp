const express = require("express");
const router = new express.Router();
const customersController = require('../controllers/customers-controller');
const autorescuesController = require('../controllers/autorescues-controller');
const utils = require('../utils');
const cutomersValidate = require('../utils/customers-validator');
const autorescuesValidate = require('../utils/autorescues-validator');

router.use('/', require('./swagger'));
router.get('/customers/', utils.errorHandler(customersController.getAllCustomers));
router.get(
    '/customers/:id',
    cutomersValidate.customerIdValidationRules(),
    cutomersValidate.checkCustomer,
    utils.errorHandler(customersController.getCustomer));
router.post(
    '/customers/',
    cutomersValidate.createCustomerValidationRules(),
    cutomersValidate.checkCustomer,
    utils.errorHandler(customersController.createCustomer));
router.put(
    '/customers/:id',
    cutomersValidate.updateCustomerValidationRules(),
    cutomersValidate.checkCustomer,
    utils.errorHandler(customersController.updateCustomer));
router.delete(
    '/customers/:id',
    cutomersValidate.customerIdValidationRules(),
    cutomersValidate.checkCustomer,
    utils.errorHandler(customersController.deleteCustomer));
router.get('/autorescues/', utils.errorHandler(autorescuesController.getAllAutorescues));
router.get(
    '/autorescues/:id',
    autorescuesValidate.autorescueIdValidationRules(),
    autorescuesValidate.checkAutorescue,
    utils.errorHandler(autorescuesController.getAutorescue));
router.post(
    '/autorescues/',
    autorescuesValidate.createAutorescueValidationRules(),
    autorescuesValidate.checkAutorescue,
    utils.errorHandler(autorescuesController.createAutorescue));
router.put(
    '/autorescues/:id',
    autorescuesValidate.updateAutorescueValidationRules(),
    autorescuesValidate.checkAutorescue,
    utils.errorHandler(autorescuesController.updateAutorescue));
router.delete(
    '/autorescues/:id',
    autorescuesValidate.autorescueIdValidationRules(),
    autorescuesValidate.checkAutorescue,
    utils.errorHandler(autorescuesController.deleteAutorescue));

module.exports = router;