import { CONFIG } from 'src/config-global';

import { CropView } from 'src/sections/crops/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Crops - ${CONFIG.appName}`}</title>

      <CropView />
    </>
  );
}
