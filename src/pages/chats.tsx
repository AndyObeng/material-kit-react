import { CONFIG } from 'src/config-global';

import { CurrencyView } from 'src/sections/currency/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Currency - ${CONFIG.appName}`}</title>

      <CurrencyView />
    </>
  );
}
