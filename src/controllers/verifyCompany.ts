import puppeteer from 'puppeteer';
import { config } from '../config';
import { CompanyInfo } from './interfaces';
import { solveCaptcha } from '../solveCaptcha';

interface ReturnValue {
  data?: CompanyInfo;
  error?: string;
  message?: string;
  isLoading: boolean;
}

const verifyCompany = async (rcNumber: string): Promise<ReturnValue> => {
  let isLoading = true;
  try {
    const token = await solveCaptcha();

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(config.PAGE_URL, { waitUntil: 'networkidle0' });

    // fill search query
    await page.$eval(
      '#content2 > div > form > div.box-content > div > input.field',
      (element: any) => {
        element.value = '';
      }
    );

    //  set recaptcha response
    await page.$eval(
      '#g-recaptcha-response',
      (element: any, token: string | undefined) => {
        element.value = token;
      },
      token
    );

    // submit form
    await Promise.all([
      page.click('#content2 > div > form > div.box-content > div > input.button2'),
      page.waitForNavigation({ waitUntil: 'networkidle0' })
    ]);

    // parse DOM content
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

    const company: CompanyInfo | undefined = result.find((data) => data.rcNumber === rcNumber);

    isLoading = false;

    if (company)
      return {
        data: company,
        isLoading
      };

    return {
      isLoading,
      message: 'Invalid Registered Company Number'
    };
  } catch (error) {
    isLoading = false;
    return {
      isLoading,
      error
    };
  }
};

export default verifyCompany;
