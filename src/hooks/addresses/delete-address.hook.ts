import { useCallback } from 'react';
import { useMutation, UseMutationOptions } from 'react-query';

import { browserHttpClient } from '@src/datasource/http';
import { ApiError } from '@src/types/api-error.type';

export function useDeleteUserAddress(
  options?: Omit<UseMutationOptions<unknown, ApiError, string>, 'mutationKey'>
) {
  const { mutate, ...request } = useMutation(
    `remove-user-address`,
    addressId => {
      return browserHttpClient.delete(`/user-address/${addressId}`);
    },
    options
  );

  const submit = useCallback(
    (addressId: string) => {
      mutate(addressId);
    },
    [mutate]
  );
  return { ...request, submit };
}
