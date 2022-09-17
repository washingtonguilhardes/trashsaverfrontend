import { useCallback } from 'react';

import { UserRole } from '@src/types/user.type';
import { useSession } from 'next-auth/react';

export function useRoles() {
  const {
    data: { userRoles },
  } = useSession();

  const canUse = useCallback(
    (roles: UserRole[], strict?: boolean) => {
      if (strict) {
        return !roles.map(role => userRoles.includes(role)).includes(false);
      }

      return roles.map(role => userRoles.includes(role)).reduce((a, b) => a || b, false);
    },
    [userRoles]
  );
  return { userRoles, canUse };
}
