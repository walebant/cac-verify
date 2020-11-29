import dotenv from 'dotenv';
import ac from '@antiadmin/anticaptchaofficial';

dotenv.config();

const { PORT, HOSTNAME, ANTI_ADMIN_API_KEY, CAPTCHA_DATA_SITE_KEY } = process.env;

const server = {
  port: PORT || 5000,
  hostname: HOSTNAME || 'localhost'
};

const config = {
  server,
  ANTI_ADMIN_API_KEY,
  CAPTCHA_DATA_SITE_KEY,
  pageUrl: 'https://publicsearch.cac.gov.ng/ComSearch/index.php'
};

// setup anticaptchaofficial
ac.setAPIKey(config.ANTI_ADMIN_API_KEY);
ac.getBalance()
  .then((balance: string) => console.log('My my balance is $' + balance))
  .catch((error: string) => console.log('received error ' + error));

export default config;
