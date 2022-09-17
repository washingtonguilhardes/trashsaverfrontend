import { AppShellBase, Header } from '@src/components/organisms/app-shell';

export default function Addresses() {
  return (
    <AppShellBase
      header={({ handleDrawerToggle }) => (
        <Header pageTitle="My Addresses" onDrawerToggle={handleDrawerToggle} />
      )}
    >
      OK
    </AppShellBase>
  );
}
