const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const initinitializeDb = require('./database/connection').initializeDb;
const utils = require('./utils');
const cookieParser = require("cookie-parser");

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = process.env.NODE_ENV === 'development' ? require('./swagger-dev.json') : require('./swagger.json');

const app = express();
const port = process.env.PORT || 5500;

initinitializeDb((error) => {
  if (error) {
    console.log(error);
    process.exit(1);
  } else {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
      .use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
      })
      .use(cookieParser())
      .use(bodyParser.json())
      .use(utils.checkAuthorizationCookie)
      .use('/', require('./routes'))
      .use(async (req, res, next) => {
        next({ status: 404, message: "Sorry, this route don't exists." });
      })
      .use(async (err, req, res, next) => {
        console.error(`Error at: "${req.originalUrl}": ${err.message}`);
        let message = err.status == 404 ? err.message : 'Sorry, an error occurred in your request.';
        res.status(err.status || 500).json({ error: message });
      });

    app.listen(port, () => {
      console.log('Database connected and HTTP server is running.');
    });
  }
});