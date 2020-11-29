import { Request as ExpressRequest } from 'express';
export interface CompanyInfo {
  rcNumber: string;
  name: string;
  address: string;
  dateOfRegistration: string;
  isRegistrationComplete: boolean;
}

export interface Request extends ExpressRequest {
  token?: string;
  query: {
    search?: string;
  };
  // params: {
  //   rcNumber?: string;
  // };
}
