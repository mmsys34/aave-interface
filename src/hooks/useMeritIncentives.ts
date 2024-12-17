import { ProtocolAction } from '@aave/contract-helpers';
import { ReserveIncentiveResponse } from '@aave/math-utils/dist/esm/formatters/incentive/calculate-reserve-incentives';
import { useQuery } from '@tanstack/react-query';
import { CustomMarket } from 'src/ui-config/marketsConfig';

export enum MeritAction {
  ETHEREUM_STKGHO = 'ethereum-stkgho',
  ETHEREUM_SUPPLY_PYUSD = 'ethereum-supply-pyusd',
  SUPPLY_CBBTC_BORROW_USDC = 'ethereum-supply-cbbtc-borrow-usdc',
  SUPPLY_WBTC_BORROW_USDT = 'ethereum-supply-wbtc-borrow-usdt',
  BASE_SUPPLY_CBBTC = 'base-supply-cbbtc',
  BASE_SUPPLY_USDC = 'base-supply-usdc',
  BASE_BORROW_USDC = 'base-borrow-usdc',
  AVALANCHE_SUPPLY_BTCB = 'avalanche-supply-btcb',
  AVALANCHE_SUPPLY_USDC = 'avalanche-supply-usdc',
  AVALANCHE_SUPPLY_USDT = 'avalanche-supply-usdt',
  AVALANCHE_SUPPLY_SAVAX = 'avalanche-supply-savax',
}

type MeritIncentives = {
  totalAPR: number;
  actionsAPR: {
    [key in MeritAction]: number | null | undefined;
  };
};

export type ExtendedReserveIncentiveResponse = ReserveIncentiveResponse & {
  customMessage: string;
  customForumLink: string;
};

const url = 'https://apps.aavechan.com/api/merit/aprs';

export type MeritReserveIncentiveData = Omit<ReserveIncentiveResponse, 'incentiveAPR'> & {
  action: MeritAction;
  protocolAction?: ProtocolAction;
  customMessage?: string;
  customForumLink?: string;
};

const getMeritData = (market: string, symbol: string): MeritReserveIncentiveData[] | undefined =>
  MERIT_DATA_MAP[market]?.[symbol];

const MERIT_DATA_MAP: Record<string, Record<string, MeritReserveIncentiveData[]>> = {
  [CustomMarket.proto_mainnet_v3]: {
    // USDC: [
    //   {
    //     action: MeritAction.SUPPLY_CBBTC_BORROW_USDC,
    //     rewardTokenAddress: AaveV3Ethereum.ASSETS.USDC.A_TOKEN,
    //     rewardTokenSymbol: 'aEthUSDC',
    //     protocolAction: ProtocolAction.borrow,
    //     customMessage: 'You must supply cbBTC and borrow USDC in order to receive merit rewards.',
    //   },
    // ],
  },
};

export const useMeritIncentives = ({
  symbol,
  market,
  protocolAction,
}: {
  symbol: string;
  market: string;
  protocolAction?: ProtocolAction;
}) => {
  return useQuery({
    queryFn: async () => {
      const response = await fetch(url);
      const data = await response.json();
      const meritIncentives = data.currentAPR as MeritIncentives;

      return meritIncentives;
    },
    queryKey: ['meritIncentives'],
    staleTime: 1000 * 60 * 5,
    select: (data) => {
      const meritReserveIncentiveData = getMeritData(market, symbol);
      if (!meritReserveIncentiveData) {
        return null;
      }
      const incentive = meritReserveIncentiveData.find(
        (item) => item.protocolAction === protocolAction
      );

      if (!incentive) {
        return null;
      }

      const APR = data.actionsAPR[incentive.action];

      if (!APR) {
        return null;
      }

      return {
        incentiveAPR: (APR / 100).toString(),
        rewardTokenAddress: incentive.rewardTokenAddress,
        rewardTokenSymbol: incentive.rewardTokenSymbol,
        customMessage: incentive.customMessage,
        customForumLink: incentive.customForumLink,
      } as ExtendedReserveIncentiveResponse;
    },
  });
};
