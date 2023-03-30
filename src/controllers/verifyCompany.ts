import { config } from '../config';
import { CompanyInfo } from './interfaces';

interface ReturnValue {
  data?: CompanyInfo;
  error?: string;
  message?: string;
}

const verifyCompany = async (rcNumber: string) => {
  try {

    return {
      message: 'Invalid Registered Company Number'
    };
  } catch (error) {
    return {
      error
    };
  }
};

export default verifyCompany;
