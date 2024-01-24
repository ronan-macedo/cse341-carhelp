const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Car Help API',
    description: 'Car Help Endpoints',
  },
  host: 'localhost:5500',
  schemes: ['http'],
};

const outputFile = './swagger-dev.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);