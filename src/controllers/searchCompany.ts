import { Request, Response } from 'express';
import serializer from '../utils'

interface CompanyObject {
  email: string | null;
  active: boolean;
  approvedName: string | null;
  rcNumber: string | null;
  city: string | null;
  lga: string | null;
  classification: string | null;
  registrationApproved: boolean;
  registrationDate: string | null;
  headOfficeAddress: string | null;
  natureOfBusinessName: string | null;
  companyTypeName: string | null;
  address: string | null;
  state: string | null;
}

interface SearchResult {
  status: string;
  success: boolean;
  errorCode: number;
  data: CompanyObject[];
  message: string;
  timestamp: string
}

export default async function (req: Request, res: Response): Promise<void> {

  const url =
    'https://postapp.cac.gov.ng/postapp/api/front-office/search/company-business-name-it';

  const fetchReq = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ searchTerm: req.query.search }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const response: Promise<SearchResult> = await fetchReq.json();
  res.send(response);
}
