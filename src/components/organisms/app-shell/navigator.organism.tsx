import Link from 'next/link';
import { NextRouter, useRouter } from 'next/router';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

type NavigatorItem = {
  id: string;
  href: string;
  icon?: JSX.Element;
  activeCheck?: (router: NextRouter, currentHref: string) => boolean;
};

const categories: { id: string; role: string[]; children: NavigatorItem[] }[] = [
  {
    id: 'My Shares',

    role: [],
    children: [],
  },
  {
    id: 'My Grabage Collections',

    role: [],
    children: [],
  },
];

const item = {
  py: '2px',
  px: 3,
  color: 'rgba(255, 255, 255, 0.7)',
  '&:hover, &:focus': {
    bgcolor: 'rgba(255, 255, 255, 0.08)',
  },
};

const itemCategory = {
  boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
  py: 1.5,
  px: 3,
};

export function Navigator(props: DrawerProps) {
  const router = useRouter();
  return (
    <Drawer variant="permanent" {...props}>
      <List disablePadding>
        <ListItem
          sx={{
            ...item,
            ...itemCategory,
            textAlign: 'center',
            fontSize: 22,
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Trash Saver
        </ListItem>
        {categories.map(({ id, children, role }) => {
          if (!role.includes('access.capability')) {
            return null;
          }
          return (
            <Box key={id} sx={{ bgcolor: '#101F33' }}>
              <ListItem sx={{ py: 2, px: 3 }}>
                <ListItemText sx={{ color: '#fff' }}>{id}</ListItemText>
              </ListItem>
              {children.map(linkItem => {
                const { id: childId, icon, activeCheck, href } = linkItem;
                return (
                  <ListItem disablePadding key={childId}>
                    <Link href={href}>
                      <ListItemButton
                        selected={
                          activeCheck
                            ? activeCheck(router, href)
                            : router.pathname === href
                        }
                        sx={item}
                      >
                        <ListItemIcon>{icon}</ListItemIcon>
                        <ListItemText>{childId}</ListItemText>
                      </ListItemButton>
                    </Link>
                  </ListItem>
                );
              })}
              <Divider sx={{ mt: 2 }} />
            </Box>
          );
        })}
      </List>
    </Drawer>
  );
}
