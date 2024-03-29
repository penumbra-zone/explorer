export type OverviewType = {
  hash: string;
  height: number;
  timestamp: string;
  fee: TokenUnit;
  gasUsed: number;
  gasWanted: number;
  success: boolean;
  memo: string;
  error: string;
};

export type TransactionNote = {
  ephemeralKey: string;
  encryptedNote: string;
};

export type TransactionState = {
  loading: boolean;
  exists: boolean;
  overview: OverviewType;
  logs: null | [];
  messages: {
    filterBy: string;
    viewRaw: boolean;
    items: any[];
  };
  notes: TransactionNote[];
};

export type DecryptNote = {
  diversifier: string;
  noteBlinding: string;
  transmissionKey: string;
  value: {
    amount: number;
    assetId: string;
  };
};
