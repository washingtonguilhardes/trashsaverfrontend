import * as React from 'react';

import Button, { ButtonProps } from '@mui/material/Button';

interface LogoutProps extends ButtonProps {
  username: string;
  avatar?: string;
  onClickLogout(): void;
}

export function Logout(props: LogoutProps) {
  const { username, onClickLogout, ...others } = props;

  return (
    <Button
      {...others}
      aria-label={username}
      aria-expanded={open ? 'true' : undefined}
      onClick={onClickLogout}
      sx={{ minWidth: 100 }}
      color="inherit"
    >
      Sign Out
    </Button>
  );
}
