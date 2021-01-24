# CAC_VERIFY

> CAC_VERIFY is a JavaScript package that enables developers search and verify if a company is
> registered in Nigeria under the [Corporate Affairs Commission](https://www.cac.gov.ng).

<!-- [START usecases] -->

###### What can I do?

- Search for a list of companies which a search query
- Check if a company is verified by inputting it's RC number.
<!-- [END usecases] -->

<!-- [START getstarted] -->

## Getting Started

### Installation

To use cac-verify in your project, run:

```bash
npm i cac-verify
# or "yarn add cac-verify"
```

Note: cac-verify, uses [Anti-Captcha](http://getcaptchasolution.com/swwch1tlly) to solve captcha on
the [CAC](https://search.cac.gov.ng/home) website. So headover
[HERE](http://getcaptchasolution.com/swwch1tlly) to register and receive your API_KEY

### Usage

```js
import { initAntiCaptcha, scrapCompanies, verifyCompany } from 'cac-verify';

initAntiCaptcha('INSERT_YOUR_ANTI_CAPTCHA_API_KEY_HERE')

/**
 * search for a company
 */

const { data, isLoading, error } = await scrapCompanies(query: string)

// response onSuccess
  {
    data: [
      {
        rcNumber: string;
        name: string;
        address: string;
        dateOfRegistration: string;
        isRegistrationComplete: boolean;
      }
    ],
    error: null
  }

// response onError
  {
    data: null,
    error: string;
  }



/**
 * check if a company is verified
 */
const { data, isLoading, error } = await verifyCompany(rcNumber: string)

// response onSuccess
  {
    data: {
      rcNumber: string;
      name: string;
      address: string;
      dateOfRegistration: string;
      isRegistrationComplete: boolean;
    },
    error: null
  }

// response onError
  {
    data: null,
    error: string;
  }
```
