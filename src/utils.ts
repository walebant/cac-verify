interface CompanyInfo {
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

const serializer = (list: any): CompanyInfo => {
  return list.map((item: any) => ({
    email: item.email?.trim() ?? null,
    active: item.active,
    approvedName: item.approvedName?.trim() ?? null,
    rcNumber: item.rcNumber?.trim() ?? null,
    city: item.city?.trim() ?? null,
    lga: item.lga?.trim() ?? null,
    classification: item.classification?.trim() ?? null,
    registrationApproved: item.registrationApproved,
    registrationDate: item.registrationDate?.trim() ?? null,
    headOfficeAddress: item.headOfficeAddress?.trim() ?? null,
    natureOfBusinessName: item.natureOfBusinessName?.trim() ?? null,
    companyTypeName: item.companyTypeName?.trim() ?? null,
    address: item.address?.trim() ?? null,
    state: item.state?.trim() ?? null,
  }))
}

export default serializer