import { CompanyObject } from './controllers/types'

export const config = {
  PAGE_URL: 'https://postapp.cac.gov.ng/postapp/api/front-office/search/company-business-name-it'
};

export const serialize = (arg): CompanyObject => ({
  email: arg.email,
  active: arg.active,
  registrationApproved: arg.registrationApproved,
  natureOfBusinessName: arg.natureOfBusinessName,
  approvedName: arg.approvedName,
  rcNumber: arg.rcNumber,
  classification: arg.classification,
  registrationDate: arg.registrationDate,
  businessCommencementDate: arg.businessCommencementDate,
  city: arg.city,
  lga: arg.lga,
  state: arg.state,
  address: arg.address,
});