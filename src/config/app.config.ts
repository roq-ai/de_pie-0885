interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Influencer'],
  customerRoles: ['Customer'],
  tenantRoles: ['Influencer', 'Subscriber'],
  tenantName: 'Organization',
  applicationName: 'de_pie',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: ["View the Influencer's Organization", "Purchase the Influencer's courses"],
  ownerAbilities: [
    'Manage Organization',
    'Manage newsletters',
    'Manage WhatsApp broadcasts',
    'Manage paid FAQs',
    'Manage courses',
    'Invite Subscribers to Organization',
  ],
};
