import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, UseMutationOptions } from 'react-query';

import { yupResolver } from '@hookform/resolvers/yup';
import { browserHttpClient } from '@src/datasource/http';
import { Address } from '@src/types/address.type';
import { ApiError } from '@src/types/api-error.type';

import { NewUserAddress } from './new-address.hook';

export function useEditUserAddress(
  addressId: string,
  options?: Omit<UseMutationOptions<Address, ApiError, NewUserAddress>, 'mutationKey'>
) {
  const { mutate, ...request } = useMutation<Address, ApiError, NewUserAddress>(
    `edit-user-address-${addressId}`,
    addressData => {
      return browserHttpClient.patch(`/user-address/${addressId}`, addressData);
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
