import React from 'react';

import { AppShellBase, Header } from '@src/components/organisms/app-shell';

export default function Home() {
  return (
    <AppShellBase
      header={({ handleDrawerToggle }) => (
        <Header pageTitle="" onDrawerToggle={handleDrawerToggle} />
      )}
    >
      OK
    </AppShellBase>
  );
}

Home.auth = true;
