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
      address: '0xd3bF53DAC106A0290B0483EcBC89d40FcC961f3e',
      name: 'Wrapped FLOW',
      symbol: 'WFLOW',
      decimals: 18,
      logoURI: 'https://cryptologos.cc/logos/flow-flow-logo.svg',
    },
    {
      chainId: ChainIds.flowEVMTestnet,
      address: '0x8E3DC6E937B560ce6a1Aaa78AfC775228969D16c',
      name: 'ankr.FLOW',
      symbol: 'ankr.FLOW',
      decimals: 18,
      logoURI:
        'https://cdn.prod.website-files.com/60f008ba9757da0940af288e/66d7ac533430f79fc1f19a73_ankr-p-500.jpg',
    },
    {
      chainId: ChainIds.flowEVMMainnet,
      address: '0x1b97100eA1D7126C4d60027e231EA4CB25314bdb',
      name: 'ankr.FLOW',
      symbol: 'ankr.FLOW',
      decimals: 18,
      logoURI:
        'https://cdn.prod.website-files.com/60f008ba9757da0940af288e/66d7ac533430f79fc1f19a73_ankr-p-500.jpg',
    },
    {
      chainId: ChainIds.flowEVMMainnet,
      address: '0xd3bF53DAC106A0290B0483EcBC89d40FcC961f3e',
      name: 'Wrapped FLOW',
      symbol: 'WFLOW',
      decimals: 18,
      logoURI: 'https://cryptologos.cc/logos/flow-flow-logo.svg',
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
