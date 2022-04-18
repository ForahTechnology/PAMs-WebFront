export interface RegistrationReq {
  email: string,
  firstName: string,
  lastName: string,
  activationCode: string,
  phoneNumber: string,
  password: string
}

export class AuthenticatedUser {
  email: string
  expiryTime: string;
  fullname:string;
  role:string;
  token:string;
  userId: string;
}

export class InvoiceObject {
  clientID: string;
  dateGenerated: string;
  dueDate: string;
  id: string;
  inoviceNumber: string;
  items: string[]
  paid: boolean;
  samplingID: string;
}
export class ClientObject {
  address: string;
  email: string;
  id: string;
  name: string;
  invoices: InvoiceObject[]
  registeredDate: string;
  samplings: SampleTemplatesObject[]
  templates: string[]
}

export class SampleTemplatesObject {
  templateId: string;
  type: number;
}

