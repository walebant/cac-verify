import { config, serialize } from '../utils';
import { CompanyObject } from './types';

interface ReturnValue {
  success: boolean;
  data?: Array<CompanyObject>;
  error?: string;
}

const searchCompany = async (query: string): Promise<ReturnValue> => {
  const body = {
    searchTerm: query,
  };

  try {
    const data = await fetch(config.PAGE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
      },
      body: JSON.stringify(body),
    });
    const response = await data.json();

    const companies = response.data.forEach(obj => serialize(obj));

    return {
      data: companies,
      success: response.success,
    };
  } catch (error) {
    return {
      success: false,
      error: 'An error occurred'
    };
  }
};

export default searchCompany;
