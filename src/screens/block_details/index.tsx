import React, { useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { NextSeo } from 'next-seo';
import {
  useCpmmReserveQuery,
  useSwapOutputDataQuery,
} from '@src/graphql/types/general_types';
import CpmmReserveList from '@src/components/cpmm_reserve_list';
import { useRouter } from 'next/router';
import {
  Layout, LoadAndExist,
} from '@components';
import { useBlockDetails } from './hooks';
import {
  Overview, Transactions, Signatures,
} from './components';
import { useStyles } from './styles';

const BlockDetails = () => {
  const router = useRouter();
  const { t } = useTranslation('blocks');
  const classes = useStyles();
  const { state } = useBlockDetails();
  const [cpmmReserve, setcpmmReserve] = useState<CpmmReserve[]>([]);
  const [swapOutputData, setSwapOutputData] = useState<SwapOutputData[]>([]);
  useCpmmReserveQuery({
    variables: {
      height: router.query.height as string,
    },
    onCompleted: (data) => {
      setcpmmReserve(data.cpmm_reserve as CpmmReserve[]);
    },
  });
  useSwapOutputDataQuery({
    variables: {
      height: router.query.height as string,
    },
    onCompleted: (data) => {
      setSwapOutputData(data.swap_output_data as SwapOutputData[]);
    },
  });

  const {
    overview, signatures, transactions,
  } = state;
  return (
    <>
      <NextSeo
        title={t('blockDetails')}
        openGraph={{
          title: t('blockDetails'),
        }}
      />
      <Layout navTitle={t('blockDetails')}>
        <LoadAndExist loading={state.loading} exists={state.exists}>
          <span className={classes.root}>
            <Overview
              height={overview.height}
              hash={overview.hash}
              proposer={overview.proposer}
              timestamp={overview.timestamp}
              txs={overview.txs}
            />
            <Signatures
              className={classes.signatures}
              signatures={signatures}
            />
            <Transactions transactions={transactions} />
            {cpmmReserve && cpmmReserve.length ? (
              <CpmmReserveList
                cpmmReserve={cpmmReserve}
                swapOutputData={swapOutputData}
              />
            ) : (
              <></>
            )}
          </span>
        </LoadAndExist>
      </Layout>
    </>
  );
};

export default BlockDetails;
