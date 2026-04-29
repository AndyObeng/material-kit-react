import { CONFIG } from 'src/config-global';

import { InsuranceView } from 'src/sections/insurance/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Insurance - ${CONFIG.appName}`}</title>

      <InsuranceView />
    </>
  );
}
