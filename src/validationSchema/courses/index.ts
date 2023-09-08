import * as yup from 'yup';

export const courseValidationSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().integer().required(),
  organization_id: yup.string().nullable().required(),
});
