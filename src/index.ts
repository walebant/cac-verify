import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

import searchCompanies from './controllers/searchCompany'

const app: Express = express();
const port = process.env.PORT;

app.get('/', async (req: Request, res: Response) => {
  res.send("Getting it...");
});


app.get('/search', searchCompanies);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});