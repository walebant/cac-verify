import { Request, Response } from 'express';
import puppeteer from 'puppeteer';
import config from '../config';
import { CompanyInfo } from './interfaces';

const log = (text: string) => console.log(text);

const verify = async (req: Request, res: Response) => {
  const rcNumber: any = req.params.rcNumber;

  try {
    const token = req.token;

    log('opening browser');
    const browser = await puppeteer.launch();

    log('opening new tab');
    const page = await browser.newPage();

    log('navigating to target page');
    await page.goto(config.pageUrl, { waitUntil: 'networkidle0' });

    log('filling search query');
    await page.$eval(
      '#content2 > div > form > div.box-content > div > input.field',
      (element: any, rcNumber: string) => {
        element.value = rcNumber;
      },
      rcNumber
    );

    log('setting recaptcha response');
    await page.$eval(
      '#g-recaptcha-response',
      (element: any, token: string | undefined) => {
        element.value = token;
      },
      token
    );

    log('submitting form...');
    await Promise.all([
      page.click('#content2 > div > form > div.box-content > div > input.button2'),
      page.waitForNavigation({ waitUntil: 'networkidle0' })
    ]);

    log('parsing dom content...');
    const result: Array<CompanyInfo> = await page.evaluate(() => {
      // slice the tr with index 0 (this is the table header)
      const tableRows: HTMLTableRowElement[] = Array.from(document.querySelectorAll('tr')).slice(1);

      return tableRows.map(
        (row): CompanyInfo => {
          const rowData: HTMLTableDataCellElement[] = Array.from(row.querySelectorAll('td'));
          return {
            rcNumber: rowData[0].innerText,
            name: rowData[1].innerText,
            address: rowData[2].innerText,
            dateOfRegistration: rowData[3].innerText,
            isRegistrationComplete: Number(rowData[0].innerText) ? true : false
          };
        }
      );
    });

    return res.status(200).send(result);
  } catch (error) {
    log(error);
    return res.status(500).send(error);
  }
};

export default { verify };
