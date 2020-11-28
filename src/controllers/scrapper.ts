import { NextFunction, Request, Response } from 'express';

const scrapper = (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).send({
    message: 'pong'
  });
};

export default { scrapper };
