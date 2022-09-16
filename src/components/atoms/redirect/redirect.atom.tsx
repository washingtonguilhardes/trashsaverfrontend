import { useEffect } from 'react';

import { useRouter } from 'next/router';

export function Redirect(props: { to: string }) {
  const { to } = props;
  const router = useRouter();
  useEffect(() => {
    router.push(to);
  }, [to, router]);
  return null;
}
