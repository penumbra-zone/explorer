/* eslint-disable camelcase */
declare module 'react-spring';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.gif';

type Override<T1, T2> = Omit<T1, keyof T2> & T2;

type ComponentDefault = {
  className?: string;
};
interface AvatarName {
  className?: string;
  imageUrl?: string | null;
  address: string;
  name: string;
  href?: (address: string) => string;
}

type Transactions = {
  height: number;
  hash: string;
  success: boolean;
  timestamp: string;
  messages: {
    count: number;
    items: any[];
  };
};

type TokenUnit = {
  displayDenom: string;
  baseDenom: string;
  exponent: number;
  value: string;
};

type DesmosProfile = {
  dtag: string;
  nickname: string;
  imageUrl: string;
  coverUrl: string;
  bio: string;
  connections: ProfileConnectionType[];
  validator?: ValidatorProfile;
};

type ProfileConnectionType = {
  network: string;
  identifier: string;
  creationTime: string;
};

type ValidatorProfile = {
  status: number;
  jailed: boolean;
  condition: number;
  commission: number;
  signedBlockWindow: number;
  missedBlockCounter: number;
  lastSeen: string;
};

type TagTheme =
  | 'zero'
  | 'one'
  | 'two'
  | 'three'
  | 'four'
  | 'five'
  | 'six'
  | 'seven'
  | 'eight'
  | 'nine'
  | 'ten'
  | 'eleven'
  | 'twelve'
  | 'thirteen'
  | 'fourteen'
  | 'fifteen'
  | 'sixteen'
  | 'seventeen'
  | 'eighteen'
  | 'nineteen'
  | 'twenty';

type MsgCoin = {
  denom: string;
  amount: string;
};

type CpmmReserve = {
  height: number;
  r1: number;
  r2: number;
  __typename: string;
  trading_pair: {
    asset_1: stirng;
    asset_2: stirng;
    __typename: stirng;
  };
};

type SwapOutputData = {
  delta_1: number;
  delta_2: null | number;
  lambda_1: number;
  lambda_2: null | number;
  success: boolean;
  __typename: string;
  trading_pair: {
    asset_1: stirng;
    asset_2: stirng;
    __typename: stirng;
  };
};
