const express = require("express");
const router = new express.Router();
require('dotenv').config();

router.use('/', require('./swagger'));
router.use('/autorescues', require('./autorescues-routes'));
router.use('/customers', require('./customers-routes'));
router.use('/health', require('./healthcheck'))
router.get('/', (req, res) => {    
    res.redirect(process.env.APP_HOST + '/api-docs');
});

module.exports = router;