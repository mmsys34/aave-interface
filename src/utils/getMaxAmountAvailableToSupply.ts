import { constants } from 'ethers';
import BigNumber from 'bignumber.js';
import { valueToBigNumber } from '@aave/math-utils';

import { roundToTokenDecimals } from './utils';

// Subset of ComputedReserveData
interface PoolReserveSupplySubset {
  supplyCap: string;
  debtCeiling: string;
  isolationModeTotalDebt: string;
  totalLiquidity: string;
  isFrozen: boolean;
  decimals: number;
}

export function remainingCap(cap: string, total: string) {
  return cap === '0' ? new BigNumber(-1) : new BigNumber(cap).minus(total);
}

export function getMaxAmountAvailableToSupply(
  walletBalance: string,
  poolReserve: PoolReserveSupplySubset,
  underlyingAsset: string,
  minRemainingBaseToken: string
): string {
  if (poolReserve.isFrozen) {
    return '0';
  }

  // Calculate max amount to supply
  let maxAmountToSupply = valueToBigNumber(walletBalance);

  // keep a bit for other transactions
  if (maxAmountToSupply.gt(0) && underlyingAsset.toLowerCase() === constants.AddressZero) {
    maxAmountToSupply = maxAmountToSupply.minus(minRemainingBaseToken);
  }

  // make sure we don't try to supply more then maximum supply cap
  if (poolReserve.supplyCap !== '0') {
    maxAmountToSupply = BigNumber.min(
      maxAmountToSupply,
      remainingCap(poolReserve.supplyCap, poolReserve.totalLiquidity)
    );
  }

  if (maxAmountToSupply.lte(0)) {
    return '0';
  }

  // Convert amount to smallest allowed precision based on token decimals
  return roundToTokenDecimals(maxAmountToSupply.toString(10), poolReserve.decimals);
}
