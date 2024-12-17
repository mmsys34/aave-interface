import { Trans } from '@lingui/macro';
import { Link } from '../primitives/Link';

interface BorrowDisabledWarningProps {
  symbol: string;
  currentMarket: string;
}
export const BorrowDisabledWarning = ({ symbol, currentMarket }: BorrowDisabledWarningProps) => {
  console.log(symbol, currentMarket);

  return (
    <Trans>
      Borrowing is disabled due to an More community decision.{' '}
      <Link href={''} sx={{ textDecoration: 'underline' }}>
        <Trans>More details</Trans>
      </Link>
    </Trans>
  );
};
