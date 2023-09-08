import { getServerSession } from '@roq/nextjs';
import { NextApiRequest } from 'next';
import { NotificationService } from 'server/services/notification.service';
import { convertMethodToOperation, convertRouteToEntityUtil, HttpMethod, generateFilterByPathUtil } from 'server/utils';
import { prisma } from 'server/db';

interface NotificationConfigInterface {
  roles: string[];
  key: string;
  tenantPath: string[];
  userPath: string[];
}

const notificationMapping: Record<string, NotificationConfigInterface> = {
  'newsletter.create': {
    roles: ['influencer', 'subscriber'],
    key: 'new-newsletter-published',
    tenantPath: ['organization', 'newsletter'],
    userPath: [],
  },
  'newsletter.update': {
    roles: ['influencer', 'subscriber'],
    key: 'newsletter-updated',
    tenantPath: ['organization', 'newsletter'],
    userPath: [],
  },
  'newsletter.delete': {
    roles: ['influencer'],
    key: 'newsletter-deleted',
    tenantPath: ['organization', 'newsletter'],
    userPath: [],
  },
  'whatsapp_broadcast.create': {
    roles: ['influencer', 'subscriber'],
    key: 'new-whatsapp-broadcast',
    tenantPath: ['organization', 'whatsapp_broadcast'],
    userPath: [],
  },
  'whatsapp_broadcast.update': {
    roles: ['influencer', 'subscriber'],
    key: 'whatsapp-broadcast-updated',
    tenantPath: ['organization', 'whatsapp_broadcast'],
    userPath: [],
  },
  'whatsapp_broadcast.delete': {
    roles: ['influencer'],
    key: 'whatsapp-broadcast-deleted',
    tenantPath: ['organization', 'whatsapp_broadcast'],
    userPath: [],
  },
  'course.create': {
    roles: ['influencer', 'subscriber', 'customer'],
    key: 'new-course-added',
    tenantPath: ['organization', 'course'],
    userPath: [],
  },
  'course.update': {
    roles: ['influencer', 'subscriber', 'customer'],
    key: 'course-updated',
    tenantPath: ['organization', 'course'],
    userPath: [],
  },
  'course.delete': {
    roles: ['influencer'],
    key: 'course-deleted',
    tenantPath: ['organization', 'course'],
    userPath: [],
  },
};

const ownerRoles: string[] = ['influencer'];
const customerRoles: string[] = ['customer'];
const tenantRoles: string[] = ['influencer', 'subscriber'];

const allTenantRoles = tenantRoles.concat(ownerRoles);
export async function notificationHandlerMiddleware(req: NextApiRequest, entityId: string) {
  const session = getServerSession(req);
  const { roqUserId } = session;
  // get the entity based on the request url
  let [mainPath] = req.url.split('?');
  mainPath = mainPath.trim().split('/').filter(Boolean)[1];
  const entity = convertRouteToEntityUtil(mainPath);
  // get the operation based on request method
  const operation = convertMethodToOperation(req.method as HttpMethod);
  const notificationConfig = notificationMapping[`${entity}.${operation}`];

  if (!notificationConfig || notificationConfig.roles.length === 0 || !notificationConfig.tenantPath?.length) {
    return;
  }

  const { tenantPath, key, roles, userPath } = notificationConfig;

  const tenant = await prisma.organization.findFirst({
    where: generateFilterByPathUtil(tenantPath, entityId),
  });

  if (!tenant) {
    return;
  }
  const sendToTenant = () => {
    console.log('sending notification to tenant', {
      notificationConfig,
      roqUserId,
      tenant,
    });
    return NotificationService.sendNotificationToRoles(key, roles, roqUserId, tenant.tenant_id);
  };
  const sendToCustomer = async () => {
    if (!userPath.length) {
      return;
    }
    const user = await prisma.user.findFirst({
      where: generateFilterByPathUtil(userPath, entityId),
    });
    console.log('sending notification to user', {
      notificationConfig,
      user,
    });
    await NotificationService.sendNotificationToUser(key, user.roq_user_id);
  };

  if (roles.every((role) => allTenantRoles.includes(role))) {
    // check if only  tenantRoles + ownerRoles
    await sendToTenant();
  } else if (roles.every((role) => customerRoles.includes(role))) {
    // check if only customer role
    await sendToCustomer();
  } else {
    // both company and user receives
    await Promise.all([sendToTenant(), sendToCustomer()]);
  }
}
