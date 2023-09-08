import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createWhatsappBroadcast } from 'apiSdk/whatsapp-broadcasts';
import { whatsappBroadcastValidationSchema } from 'validationSchema/whatsapp-broadcasts';
import { OrganizationInterface } from 'interfaces/organization';
import { getOrganizations } from 'apiSdk/organizations';
import { WhatsappBroadcastInterface } from 'interfaces/whatsapp-broadcast';

function WhatsappBroadcastCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: WhatsappBroadcastInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createWhatsappBroadcast(values);
      resetForm();
      router.push('/whatsapp-broadcasts');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<WhatsappBroadcastInterface>({
    initialValues: {
      message: '',
      sent_at: new Date(new Date().toDateString()),
      organization_id: (router.query.organization_id as string) ?? null,
    },
    validationSchema: whatsappBroadcastValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Whatsapp Broadcasts',
              link: '/whatsapp-broadcasts',
            },
            {
              label: 'Create Whatsapp Broadcast',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Whatsapp Broadcast
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.message}
            label={'Message'}
            props={{
              name: 'message',
              placeholder: 'Message',
              value: formik.values?.message,
              onChange: formik.handleChange,
            }}
          />

          <FormControl id="sent_at" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Sent At
            </FormLabel>
            <DatePicker
              selected={formik.values?.sent_at ? new Date(formik.values?.sent_at) : null}
              onChange={(value: Date) => formik.setFieldValue('sent_at', value)}
            />
          </FormControl>
          <AsyncSelect<OrganizationInterface>
            formik={formik}
            name={'organization_id'}
            label={'Select Organization'}
            placeholder={'Select Organization'}
            fetcher={getOrganizations}
            labelField={'name'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/whatsapp-broadcasts')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'whatsapp_broadcast',
    operation: AccessOperationEnum.CREATE,
  }),
)(WhatsappBroadcastCreatePage);
