import { config } from '../config';
import { CompanyInfo } from './interfaces';

interface ReturnValue {
  data?: Array<CompanyInfo>;
  error?: string;
}

const scrapCompanies = async (query: string) => {
  try {
    return { data: true };
  } catch (error) {
    return { error };
  }
};

export default scrapCompanies;
