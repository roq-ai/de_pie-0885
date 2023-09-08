import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface FaqInterface {
  id?: string;
  question: string;
  answer: string;
  price: number;
  organization_id: string;
  created_at?: any;
  updated_at?: any;

  organization?: OrganizationInterface;
  _count?: {};
}

export interface FaqGetQueryInterface extends GetQueryInterface {
  id?: string;
  question?: string;
  answer?: string;
  organization_id?: string;
}
