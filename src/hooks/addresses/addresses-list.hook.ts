import { useQuery } from 'react-query';

import { browserHttpClient } from '@src/datasource/http';
import { Address } from '@src/types/address.type';

export function useAddressesList(userId: string) {
  return useQuery('use-address-list', () => {
    return browserHttpClient
      .get<Address[]>(`/user-address/by-user/${userId}`)
      .then(r => r.data);
  });
}
