/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv').config();

const PORT = process.env.PORT || 5000;
module.exports = {
  app: {
    appName: process.env.APP_NAME || 'Text Renderer Service',
    environment: process.env.NODE_ENV || 'development',
    baseUrl: process.env.BASE_URL || `http://localhost`,
    port: PORT,
  },
  api: {
    lang: 'en',
    prefix: '^/api/v[0-9]+',
    versions: [1],
  },
};
