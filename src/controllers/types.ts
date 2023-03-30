export interface CompanyInfo {
  rcNumber: string;
  name: string;
  address: string;
  dateOfRegistration: string;
  isRegistrationComplete: boolean;
}


export type CompanyObject = {
  email: string | null;
  active: boolean;
  registrationApproved: boolean;
  natureOfBusinessName: string | null;
  approvedName: string;
  rcNumber: string | null;
  registrationDate: string | null;
  businessCommencementDate: string | null;
  classification: string;
  city: string;
  lga: string;
  state: string;
  address: string;
}