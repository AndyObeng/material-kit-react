import { CONFIG } from 'src/config-global';

import { LeaseView } from 'src/sections/leases/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Leases - ${CONFIG.appName}`}</title>

      <LeaseView />
    </>
  );
}
