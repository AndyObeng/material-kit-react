import { CONFIG } from 'src/config-global';

import { PaymentView } from 'src/sections/payments/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Payments - ${CONFIG.appName}`}</title>

      <PaymentView />
    </>
  );
}
