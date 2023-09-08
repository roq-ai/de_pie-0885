import * as yup from 'yup';

export const newsletterValidationSchema = yup.object().shape({
  title: yup.string().required(),
  content: yup.string().required(),
  published_at: yup.date().nullable(),
  organization_id: yup.string().nullable().required(),
});
