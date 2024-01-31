const express = require("express");
const router = new express.Router();
const utils = require('../utils');
const autorescuesValidate = require('../utils/autorescues-validator');
const autorescuesController = require('../controllers/autorescues-controller');

router.get(
    '/',
    utils.checkLogged,
    utils.errorHandler(autorescuesController.getAllAutorescues));
router.get(
    '/:id',
    utils.checkLogged,
    autorescuesValidate.autorescueIdValidationRules(),
    autorescuesValidate.checkAutorescue,
    utils.errorHandler(autorescuesController.getAutorescue));
router.post(
    '/',
    utils.checkLogged,
    autorescuesValidate.createAutorescueValidationRules(),
    autorescuesValidate.checkAutorescue,
    utils.errorHandler(autorescuesController.createAutorescue));
router.put(
    '/:id',
    utils.checkLogged,
    autorescuesValidate.updateAutorescueValidationRules(),
    autorescuesValidate.checkAutorescue,
    utils.errorHandler(autorescuesController.updateAutorescue));
router.delete(
    '/:id',
    utils.checkLogged,
    autorescuesValidate.autorescueIdValidationRules(),
    autorescuesValidate.checkAutorescue,
    utils.errorHandler(autorescuesController.deleteAutorescue));

module.exports = router;