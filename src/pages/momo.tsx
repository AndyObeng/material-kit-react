import { CONFIG } from 'src/config-global';

import { MomoView } from 'src/sections/momo/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Momo - ${CONFIG.appName}`}</title>

      <MomoView />
    </>
  );
}
