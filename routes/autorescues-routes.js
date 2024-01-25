const express = require("express");
const router = new express.Router();
const utils = require('../utils');
const autorescuesValidate = require('../utils/autorescues-validator');
const autorescuesController = require('../controllers/autorescues-controller');

router.get('/', utils.errorHandler(autorescuesController.getAllAutorescues));
router.get(
    '/:id',
    autorescuesValidate.autorescueIdValidationRules(),
    autorescuesValidate.checkAutorescue,
    utils.errorHandler(autorescuesController.getAutorescue));
router.post(
    '/',
    autorescuesValidate.createAutorescueValidationRules(),
    autorescuesValidate.checkAutorescue,
    utils.errorHandler(autorescuesController.createAutorescue));
router.put(
    '/:id',
    autorescuesValidate.updateAutorescueValidationRules(),
    autorescuesValidate.checkAutorescue,
    utils.errorHandler(autorescuesController.updateAutorescue));
router.delete(
    '/:id',
    autorescuesValidate.autorescueIdValidationRules(),
    autorescuesValidate.checkAutorescue,
    utils.errorHandler(autorescuesController.deleteAutorescue));

module.exports = router;