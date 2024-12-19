import { Trans } from '@lingui/macro';
import { CustomMarket } from 'src/ui-config/marketsConfig';

import { Link } from '../primitives/Link';

export const AssetsBeingOffboarded: { [market: string]: { [symbol: string]: string } } = {
  [CustomMarket.proto_testnet_v3]: {},
};

export const OffboardingWarning = ({ discussionLink }: { discussionLink: string }) => {
  return (
    <Trans>
      This asset is planned to be offboarded due to an Aave Protocol Governance decision.{' '}
      <Link href={discussionLink} sx={{ textDecoration: 'underline' }}>
        <Trans>More details</Trans>
      </Link>
    </Trans>
  );
};
