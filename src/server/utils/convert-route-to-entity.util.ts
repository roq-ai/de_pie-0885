const mapping: Record<string, string> = {
  courses: 'course',
  faqs: 'faq',
  newsletters: 'newsletter',
  organizations: 'organization',
  users: 'user',
  'whatsapp-broadcasts': 'whatsapp_broadcast',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
