const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = process.env.NODE_ENV === 'development' ? require('../swagger-dev.json') : require('../swagger.json');

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDocument));

module.exports = router;