import ac from '@antiadmin/anticaptchaofficial';
import { config } from './config';

// setup anticaptchaofficial
export const initAntiCaptcha = async (ANTI_ADMIN_API_KEY: string): Promise<string> => {
  try {
    ac.setAPIKey(ANTI_ADMIN_API_KEY);
    const balance = await ac.getBalance();
    return `Your balance is $${balance}`;
  } catch (error) {
    return `Received error: ${error}`;
  }
};

export const solveCaptcha = async (): Promise<string> => {
  const token: string = await ac.solveRecaptchaV2Proxyless(
    config.PAGE_URL,
    config.CAPTCHA_DATA_SITE_KEY
  );

  if (!token) {
    return 'Error solving recaptcha for this query';
  }

  return token;
};
