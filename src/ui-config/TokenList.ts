import { API_ETH_MOCK_ADDRESS } from '@aave/contract-helpers';
import { ChainIds } from '../utils/const';

type ExtensionValue = string | number | boolean | null | undefined;

export interface TokenInfo {
  readonly chainId: number;
  readonly address: string;
  readonly name: string;
  readonly decimals: number;
  readonly symbol: string;
  readonly logoURI?: string;
  readonly tags?: string[];
  readonly extensions?: {
    readonly [key: string]:
      | {
          [key: string]:
            | {
                [key: string]: ExtensionValue;
              }
            | ExtensionValue;
        }
      | ExtensionValue;
  };
}

export interface Version {
  readonly major: number;
  readonly minor: number;
  readonly patch: number;
}

export interface Tags {
  readonly [tagId: string]: {
    readonly name: string;
    readonly description: string;
  };
}

export interface TokenList {
  readonly name: string;
  readonly timestamp: string;
  readonly version: Version;
  readonly tokens: TokenInfo[];
  readonly tokenMap?: {
    readonly [key: string]: TokenInfo;
  };
  readonly keywords?: string[];
  readonly tags?: Tags;
  readonly logoURI?: string;
}

const NETWORK_ASSETS: TokenInfo[] = [
  {
    name: 'FLOW',
    symbol: 'FLOW',
    decimals: 18,
    address: API_ETH_MOCK_ADDRESS,
    chainId: ChainIds.flowEVMTestnet,
    logoURI: 'https://cryptologos.cc/logos/flow-flow-logo.svg',
    extensions: {
      isNative: true,
    },
  },
  {
    name: 'FLOW',
    symbol: 'FLOW',
    decimals: 18,
    address: API_ETH_MOCK_ADDRESS,
    chainId: ChainIds.flowEVMMainnet,
    logoURI: 'https://cryptologos.cc/logos/flow-flow-logo.svg',
    extensions: {
      isNative: true,
    },
  },
];

export const TOKEN_LIST: TokenList = {
  name: 'More Labs Default',
  timestamp: '2024-12-19T15:47:25.037Z',
  version: {
    major: 11,
    minor: 12,
    patch: 0,
  },
  tags: {},
  logoURI: 'ipfs://QmNa8mQkrNKp1WEEeGjFezDmDeodkWRevGFN8JCV7b4Xir',
  keywords: ['aave', 'default'],
  tokens: [
    ...NETWORK_ASSETS,
    {
      chainId: ChainIds.flowEVMTestnet,
      address: '0xe132751AB5A14ac0bD3Cb40571a9248Ee7a2a9EA',
      name: 'ankr.FLOW',
      symbol: 'ankr.FLOW',
      decimals: 18,
      logoURI:
        'https://cdn.prod.website-files.com/60f008ba9757da0940af288e/66d7ac533430f79fc1f19a73_ankr-p-500.jpg',
    },
  ],
};

export const COMMON_SWAPS = [
  'ETH',
  'DAI',
  'USDC',
  'USDT',
  'WBTC',
  'WETH',
  'DAI.e',
  'USDC.e',
  'USDT.e',
  'GHO',
];
