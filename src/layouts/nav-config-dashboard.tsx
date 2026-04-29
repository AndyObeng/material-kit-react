import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';
import { Icon } from '@iconify/react';

// ----------------------------------------------------------------------

const icon = (name: string) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} />;

export type NavItem = {
  title: string;
  path: string;
  icon: React.ReactNode;
  info?: React.ReactNode;
};

export const navData = [
  {
    title: 'Dashboard',
    path: '/',
    icon: icon('ic-analytics'),
  },
  {
    title: 'Users',
    path: '/user',
    icon: <Icon icon="mage:users" width="24" height="24" />,
  },
  {
    title: 'Crops',
    path: '/crops',
    icon: <Icon icon="ph:farm-thin" width="24" height="24" />,
    info: (
      <Label color="error" variant="inverted">
        +3
      </Label>
    ),
  },
  {
    title: 'Payments',
    path: '/payments',
    icon: <Icon icon="streamline-freehand:cash-payment-bag-1" width="24" height="24" />,
  },

   {
    title: 'Leases',
    path: '/leases',
    icon: <Icon icon="streamline:investment-selection" width="24" height="24" />,
  },

  {
    title: 'Insurance policy',
    path: '/insurance',
    icon: <Icon icon="streamline-plump:insurance-hand-remix" width="24" height="24" />,
  },
 {
    title: 'Momo Payments',
    path: '/momo-payments',
    icon: <Icon icon="humbleicons:chats" width="24" height="24" />,
  },
   {
    title: 'Notifications',
    path: '/notifications',
    icon: <Icon icon="ion:notifications-circle-sharp" width="24" height="24" />,
  },

     {
    title: 'Currency Exchange',
    path: '/currency-exchange',
    icon: <Icon icon="bi:currency-exchange" width="24" height="24" />,
  },


  
  {
    title: 'Settings',
    path: '/settings',
    icon: <Icon icon="material-symbols-light:settings-outline" width="24" height="24" />,
  },

     {
    title: 'Logout',
    path: '/sign-in',
    icon: <Icon icon="uiw:logout" width="20" height="20" />,
  },

];
