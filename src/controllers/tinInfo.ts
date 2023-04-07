import { Request, Response } from 'express';
import puppeteer from 'puppeteer';

export default async function (req: Request, res: Response): Promise<void> {

  const url = 'https://apps.firs.gov.ng/tinverification/'

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: 'networkidle0' });

  const searchByTIN = '1324803';
  const searchByRC = 'RC1324803';

  // select RC as search criteria
  await page.$eval(
    '#DropDownList1',
    (element: any, search: string) => {
      element.value = search;
    },
    'RC'
  );

  // fill search query
  await page.$eval(
    '#TextBox1',
    (element: any, search: string) => {
      element.value = search;
    },
    searchByRC
  );

  // submit form
  await Promise.all([
    page.click('#Button1'),
    page.waitForNavigation({ waitUntil: 'networkidle0' })
  ]);

  // parse DOM content
  // evaluate value of inputs on the page
  const inputs = await page.$$eval('input', inputs => inputs.map(input => input.value));

  const name = inputs[5]
  const TIN = inputs[6]
  const jtbTIN = inputs[8]
  const taxOffice = inputs[9]
  const phone = inputs[10]
  const email = inputs[11]

  await browser.close();

  res.send({
    name, TIN, jtbTIN, taxOffice, phone, email
  });
}
