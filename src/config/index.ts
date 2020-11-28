import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;
const HOSTNAME = process.env.hostname || 'localhost';
const CAPCTCHA_API_KEY = process.env.CAPCTCHA_API_KEY;

const server = {
  port: PORT,
  hostname: HOSTNAME
};

const config = {
  server,
  CAPCTCHA_API_KEY
};

export default config;
