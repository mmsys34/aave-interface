import { createContext, useContext } from 'react';
import { ApprovedAmountService } from 'src/services/ApprovedAmountService';
import { ERC20Service } from 'src/services/Erc20Service';
import { MigrationService } from 'src/services/MigrationService';
import { StkAbptMigrationService } from 'src/services/StkAbptMigrationService';
import { TokenWrapperService } from 'src/services/TokenWrapperService';
import { UiIncentivesService } from 'src/services/UIIncentivesService';
import { UiPoolService } from 'src/services/UIPoolService';
import { WalletBalanceService } from 'src/services/WalletBalanceService';
import { useRootStore } from 'src/store/root';
import { getProvider } from 'src/utils/marketsAndNetworksConfig';
import invariant from 'tiny-invariant';

interface SharedDependenciesContext {
  poolTokensBalanceService: WalletBalanceService;
  approvedAmountService: ApprovedAmountService;
  uiIncentivesService: UiIncentivesService;
  uiPoolService: UiPoolService;
  tokenWrapperService: TokenWrapperService;
  stkAbptMigrationService: StkAbptMigrationService;
  migrationService: MigrationService;
  erc20Service: ERC20Service;
}

const SharedDependenciesContext = createContext<SharedDependenciesContext | null>(null);

export const SharedDependenciesProvider: React.FC = ({ children }) => {
  const currentMarketData = useRootStore((state) => state.currentMarketData);

  const poolTokensBalanceService = new WalletBalanceService(getProvider);
  const approvedAmountService = new ApprovedAmountService(getProvider);
  const stkAbptMigrationService = new StkAbptMigrationService();
  const migrationService = new MigrationService(getProvider);

  const uiPoolService = new UiPoolService(getProvider);
  const uiIncentivesService = new UiIncentivesService(getProvider);
  const tokenWrapperService = new TokenWrapperService(
    currentMarketData.chainId,
    getProvider(currentMarketData.chainId)
  );
  const erc20Service = new ERC20Service(getProvider);

  return (
    <SharedDependenciesContext.Provider
      value={{
        poolTokensBalanceService,
        approvedAmountService,
        uiPoolService,
        uiIncentivesService,
        tokenWrapperService,
        stkAbptMigrationService,
        migrationService,
        erc20Service,
      }}
    >
      {children}
    </SharedDependenciesContext.Provider>
  );
};

export const useSharedDependencies = () => {
  const context = useContext(SharedDependenciesContext);
  invariant(context, 'Component should be wrapper inside a <SharedDependenciesProvider />');
  return context;
};
