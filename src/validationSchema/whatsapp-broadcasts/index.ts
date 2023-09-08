import * as yup from 'yup';

export const whatsappBroadcastValidationSchema = yup.object().shape({
  message: yup.string().required(),
  sent_at: yup.date().nullable(),
  organization_id: yup.string().nullable().required(),
});
