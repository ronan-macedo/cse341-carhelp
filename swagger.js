const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Car Help API',
    description: 'Car Help Endpoints',
  },
  host: 'cs341-carhelp.onrender.com',
  schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);