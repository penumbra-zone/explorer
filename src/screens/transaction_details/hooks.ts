import {
  useState, useEffect,
} from 'react';
import { useRouter } from 'next/router';
import * as R from 'ramda';
import {
  useTransactionDetailsQuery,
  TransactionDetailsQuery,
} from '@graphql/types/general_types';
import { formatToken } from '@utils/format_token';
import { convertMsgsToModels } from '@msg';
// eslint-disable-next-line import/order, camelcase
import { decrypt_note } from 'penumbra-web-assembly';
import {
  DecryptNote, TransactionState,
} from './types';

export const useTransactionDetails = () => {
  const router = useRouter();
  const [state, setState] = useState<TransactionState>({
    exists: true,
    loading: true,
    overview: {
      hash: '',
      height: 0,
      timestamp: '',
      fee: {
        value: '0',
        displayDenom: '',
        baseDenom: '',
        exponent: 0,
      },
      gasUsed: 0,
      gasWanted: 0,
      success: false,
      memo: '',
      error: '',
    },
    logs: null,
    messages: {
      filterBy: 'none',
      viewRaw: false,
      items: [],
    },
    notes: [],
  });
  const [decryptNotes, setDecryptNote] = useState<DecryptNote[]>([]);

  const handleSetState = (stateChange: any) => {
    setState((prevState) => R.mergeDeepLeft(stateChange, prevState));
  };

  useEffect(() => {
    handleSetState({
      loading: true,
      exists: true,
    });
  }, [router.query.tx]);

  // ===============================
  // Decrypt notes
  // ===============================
  useEffect(() => {
    const fvk = localStorage.getItem('fvk');
    if (!state.notes.length || !fvk) return;
    const arr = [];
    const getDecrypto = async (i: number) => {
      const item = state.notes[i];

      try {
        const decryptNote = await decrypt_note(
          fvk,
          item.encryptedNote,
          // eslint-disable-next-line comma-dangle
          item.ephemeralKey
        );
        arr.push({
          diversifier: decryptNote.diversifier,
          noteBlinding: decryptNote.note_blinding,
          transmissionKey: decryptNote.transmission_key,
          value: {
            amount: decryptNote.value.amount,
            assetId: decryptNote.value.asset_id,
          },
        });
      } catch (e) {
        setDecryptNote([]);
      }
    };
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < state.notes.length; i++) {
      getDecrypto(i);
    }
    setDecryptNote(arr);
  }, [state.notes]);

  // ===============================
  // Fetch data
  // ===============================
  useTransactionDetailsQuery({
    variables: {
      hash: router.query.tx as string,
    },
    onCompleted: (data) => {
      handleSetState(formatTransactionDetails(data));
    },
  });

  // ===============================
  // Parse data
  // ===============================
  const formatTransactionDetails = (data: TransactionDetailsQuery) => {
    const stateChange: any = {
      loading: false,
    };

    if (!data.transaction.length) {
      stateChange.exists = false;
      return stateChange;
    }

    // =============================
    // overview
    // =============================
    const formatOverview = () => {
      const { fee } = data.transaction[0];
      const feeAmount = R.pathOr(
        {
          denom: '',
          amount: 0,
        },
        ['amount', 0],
        fee,
      );
      const { success } = data.transaction[0];
      const overview = {
        hash: data.transaction[0].hash,
        height: data.transaction[0].height,
        timestamp: data.transaction[0].block.timestamp,
        fee: formatToken(feeAmount.amount, feeAmount.denom),
        gasUsed: data.transaction[0].gasUsed,
        gasWanted: data.transaction[0].gasWanted,
        success,
        memo: data.transaction[0].memo,
        error: success ? '' : data.transaction[0].rawLog,
      };
      return overview;
    };

    stateChange.overview = formatOverview();

    // =============================
    // notes
    // =============================
    stateChange.notes = data.transaction[0].notes.map((i) => ({
      ephemeralKey: i.ephemeral_key,
      encryptedNote: i.encrypted_note,
    }));

    // =============================
    // logs
    // =============================
    const formatLogs = () => {
      const { logs } = data.transaction[0];
      return logs;
    };
    stateChange.logs = formatLogs();

    // =============================
    // messages
    // =============================
    const formatMessages = () => {
      const messages = convertMsgsToModels(data.transaction[0]);
      return {
        items: messages,
      };
    };
    stateChange.messages = formatMessages();
    return stateChange;
  };

  const onMessageFilterCallback = (value: string) => {
    handleSetState({
      messages: {
        filterBy: value,
      },
    });
  };

  const toggleMessageDisplay = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleSetState({
      messages: {
        viewRaw: event.target.checked,
      },
    });
  };

  const filterMessages = (messages: any[]) => {
    return messages.filter((x) => {
      if (state.messages.filterBy !== 'none') {
        return x.category === state.messages.filterBy;
      }
      return true;
    });
  };

  return {
    state,
    decryptNotes,
    onMessageFilterCallback,
    toggleMessageDisplay,
    filterMessages,
  };
};
