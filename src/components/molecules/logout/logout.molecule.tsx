import * as React from 'react';

import Button from '@mui/material/Button';

interface LogoutProps {
  username: string;
  avatar: string;
  onClickLogout(): void;
}

export function Logout(props: LogoutProps) {
  const { onClickLogout } = props;

  return (
    <Button
      id="signout-button"
      aria-controls={open ? 'basic-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={open ? 'true' : undefined}
      onClick={onClickLogout}
      sx={{ minWidth: 100 }}
      color="inherit"
    >
      Sign Out
    </Button>
  );
}
