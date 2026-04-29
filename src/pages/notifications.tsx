import { CONFIG } from 'src/config-global';

import { NotificationView } from 'src/sections/notifications/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Notifications - ${CONFIG.appName}`}</title>

      <NotificationView />
    </>
  );
}
