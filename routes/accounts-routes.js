const express = require("express");
const router = new express.Router();
const utils = require('../utils');
const accountsValidate = require('../utils/accounts-validator');
const accountsController = require('../controllers/accounts-controller');

router.post(
    '/login',
    accountsValidate.loginRules(),
    accountsValidate.checkAccount,
    utils.errorHandler(accountsController.login));
router.post(
    '/register',
    accountsValidate.registationRules(),
    accountsValidate.checkAccount,
    utils.errorHandler(accountsController.register));
router.post(
    '/logout',
    utils.checkLogged,
    utils.errorHandler(accountsController.logout));

module.exports = router;