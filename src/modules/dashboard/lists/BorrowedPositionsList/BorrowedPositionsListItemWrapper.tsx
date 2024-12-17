import { AssetCapsProvider } from 'src/hooks/useAssetCaps';
import { DashboardReserve } from 'src/utils/dashboardSortUtils';

import { BorrowedPositionsListItem } from './BorrowedPositionsListItem';

export interface BorrowedPositionsListItemWrapperProps {
  item: DashboardReserve;
  disableEModeSwitch: boolean;
}

export const BorrowedPositionsListItemWrapper = ({
  item,
  disableEModeSwitch,
}: BorrowedPositionsListItemWrapperProps) => {
  return (
    <AssetCapsProvider asset={item.reserve}>
      <BorrowedPositionsListItem item={item} disableEModeSwitch={disableEModeSwitch} />
    </AssetCapsProvider>
  );
};
