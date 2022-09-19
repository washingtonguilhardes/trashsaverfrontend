import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, UseMutationOptions } from 'react-query';

import { yupResolver } from '@hookform/resolvers/yup';
import { browserHttpClient } from '@src/datasource/http';
import { UserRole } from '@src/types/user.type';
import * as Yup from 'yup';

type RegistrationFields = { roles: UserRole[] };

const registrationSchema = Yup.object().shape({
  roles: Yup.array<UserRole[]>()
    .min(1, 'Please, select an option')
    .required('Please, select an option'),
});

export const useRegistrationForm = () =>
  useForm<RegistrationFields>({
    resolver: yupResolver(registrationSchema),
    defaultValues: { roles: [] },
  });

export function useRegistration(
  userId: string,
  options?: Omit<
    UseMutationOptions<unknown, Error, RegistrationFields>,
    'mutationKey' | 'mutationFn'
  >
) {
  const request = useMutation<unknown, Error, RegistrationFields>(
    'use-registration-mutation',
    ({ roles }) => {
      return browserHttpClient.patch(`/user/${userId}/roles`, roles);
    },
    options
  );
  const { mutate } = request;

  const submit = useCallback(
    (roles: UserRole[]) => {
      return mutate({ roles });
    },
    [mutate]
  );

  return { ...request, submit };
}
