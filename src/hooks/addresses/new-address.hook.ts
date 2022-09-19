import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, UseMutationOptions } from 'react-query';

import { yupResolver } from '@hookform/resolvers/yup';
import { browserHttpClient } from '@src/datasource/http';
import { Address } from '@src/types/address.type';
import { ApiError } from '@src/types/api-error.type';
import * as Yup from 'yup';

export const addressValidator = Yup.object().shape({
  way: Yup.string().required('Way not found'),
  neighborhood: Yup.string().required('Neighborhood not found'),
  name: Yup.string().required('Name not found'),
  city: Yup.string().required('City not found'),
  province: Yup.string().required('Province not found'),
  country: Yup.string().required('Country not found'),
});

export type NewUserAddress = Omit<Address, 'user' | 'id'>;

export function useAddressForm() {
  return useForm<NewUserAddress>({
    resolver: yupResolver(addressValidator),
    mode: 'onChange',
    defaultValues: {
      city: '',
      country: '',
      name: '',
      neighborhood: '',
      province: '',
      way: '',
    },
  });
}

export function useNewUserAddress(
  userId: string,
  options?: Omit<UseMutationOptions<Address, ApiError, NewUserAddress>, 'mutationKey'>
) {
  const { mutate, ...request } = useMutation<Address, ApiError, NewUserAddress>(
    `new-user-address-${userId}`,
    addressData => {
      return browserHttpClient.post(`/user-address`, { ...addressData, userId });
    },
    options
  );

  const submit = useCallback(
    (addressData: NewUserAddress) => {
      mutate(addressData);
    },
    [mutate]
  );
  return { ...request, submit };
}
