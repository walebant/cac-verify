// import { Request, Response } from 'express';
// import puppeteer from 'puppeteer';

// export default async function (req: Request, res: Response): Promise<void> {

//   const url = 'https://apps.firs.gov.ng/tinverification/'

//   const browser = await puppeteer.launch({ headless: true });
//   const page = await browser.newPage();

//   await page.goto(url, { waitUntil: 'networkidle0' });
//   await page.setViewport({ width: 1080, height: 1024 });

//   // const dropDownList1 = '#DropDownList1';
//   // const textBox = '#TextBox1';
//   const search = 'RC1324803';
//   // await page.click('#Button1');

//   // select rc from dropdown
//   // await page.select('DropDownList1', 'RC')
//   const f = await page.$('[name="DropDownList1"]')
//   await f.select("RC")

//   // await page.type('#TextBox1', search);
//   const n = await page.$("#TextBox1")
//   await n.type(search)
//   // await page.type("[id='TextBox1']", search, { delay: 700 })

//   // submit form
//   await Promise.all([
//     page.click('#Button1'),
//     page.waitForNavigation({ waitUntil: 'networkidle0' })
//   ]);

//   // const n = await page.$("#DropDownList1")

//   // parsing DOM content
//   const bodyHandle = await page.$('body');

//   // const result = await page.evaluate(() => {
//   //   // slice the tr with index 0 (this is the table header)
//   //   const tableRows = Array.from(document.querySelectorAll('#divResult'))
//   //   console.log(tableRows);
//   //   return tableRows
//   // });



//   // await browser.close();



//   res.send({ done: true, f, n, bodyHandle });
// }
