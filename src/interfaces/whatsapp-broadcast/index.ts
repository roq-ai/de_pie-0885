import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface WhatsappBroadcastInterface {
  id?: string;
  message: string;
  sent_at?: any;
  organization_id: string;
  created_at?: any;
  updated_at?: any;

  organization?: OrganizationInterface;
  _count?: {};
}

export interface WhatsappBroadcastGetQueryInterface extends GetQueryInterface {
  id?: string;
  message?: string;
  organization_id?: string;
}
