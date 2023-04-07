import puppeteer from 'puppeteer';
import { config } from '../config';
import { CompanyInfo } from './interfaces';

interface ReturnValue {
  data?: Array<CompanyInfo>;
  error?: string;
}

const scrapCompanies = async (query: string): Promise<ReturnValue> => {
  try {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(config.PAGE_URL, { waitUntil: 'networkidle0' });

    // filling search query
    await page.$eval(
      '#content2 > div > form > div.box-content > div > input.field',
      (element: any, search: string) => {
        element.value = search;
      },
      query
    );


    // submit form
    await Promise.all([
      page.click('#content2 > div > form > div.box-content > div > input.button2'),
      page.waitForNavigation({ waitUntil: 'networkidle0' })
    ]);

    // parsing DOM content
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
            // if the dateOfRegistration YYYY-MM-DD [10 strings]
            // is <= 10 then it's a date string else is sentence
            isRegistrationComplete: rowData[3].innerText.length <= 10
          };
        }
      );
    });

    return { data: result };
  } catch (error) {
    return { error };
  }
};

export default scrapCompanies;
