import { Request, Response, NextFunction } from 'express';
import ac from '@antiadmin/anticaptchaofficial';
import config from '../config';

const solveCaptcha = async (req: Request, res: Response, next: NextFunction) => {
  console.log('solving recaptcha...');
  const token: string = await ac.solveRecaptchaV2Proxyless(
    config.pageUrl,
    config.CAPTCHA_DATA_SITE_KEY
  );

  if (!token) {
    console.log('error solving recaptcha');
    return res.status(500).send(`Error solving recaptcha for this query`);
  }

  req.token = token;

  next();
};

export default solveCaptcha;
