import { CourseInterface } from 'interfaces/course';
import { FaqInterface } from 'interfaces/faq';
import { NewsletterInterface } from 'interfaces/newsletter';
import { WhatsappBroadcastInterface } from 'interfaces/whatsapp-broadcast';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface OrganizationInterface {
  id?: string;
  description?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  course?: CourseInterface[];
  faq?: FaqInterface[];
  newsletter?: NewsletterInterface[];
  whatsapp_broadcast?: WhatsappBroadcastInterface[];
  user?: UserInterface;
  _count?: {
    course?: number;
    faq?: number;
    newsletter?: number;
    whatsapp_broadcast?: number;
  };
}

export interface OrganizationGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
