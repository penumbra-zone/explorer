import React, { useEffect } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { NextSeo } from 'next-seo';
import {
  Layout, LoadAndExist,
} from '@components';
import { useStyles } from './styles';
import {
  Overview, Messages, Logs,
} from './components';
import { useTransactionDetails } from './hooks';
// eslint-disable-next-line import/order, camelcase
import { decrypt_note } from 'penumbra-web-assembly';

const TransactionDetails = () => {
  const { t } = useTranslation('transactions');
  const classes = useStyles();
  const {
    state,
    onMessageFilterCallback,
    toggleMessageDisplay,
    filterMessages,
  } = useTransactionDetails();
  const {
    overview, logs, messages,
  } = state;

  useEffect(() => {
    const getDecrypto = async () => {
      const decryptNote = await decrypt_note(
        'penumbrafullviewingkey1lsl0y4d2d8xxhh33yppkw06whdszn7h2w55swtxaqzadej6lmsqzg9aygg0jz896zy3huf9vldeqvxr5vtx2ddltj7r46gulfw33yqqyr5ghl',
        'b70c633e719eba665f1168edb40bd0b865a7d06651e67f1e6d0e5568c91d387e359ea89ade7d2d3bb24627ebd020673914a5e061b9ebc137e0d85a80535acd5ed5118129c6c91336584f08b5417f5e720e6bb03974df815a52ff7a618001b767b857eca44ef0eacc563899314825d3a0cfd20346db5c37548f478da4201f1d6be5918d3d',
        // eslint-disable-next-line comma-dangle
        '22a3991b300baddda8d74116852981c1ae752d69c6552c6f9881699509d3af0f'
      );
      console.log(decryptNote);
    };
    getDecrypto();
  }, []);

  return (
    <>
      <NextSeo
        title={t('transactionDetails')}
        openGraph={{
          title: t('transactionDetails'),
        }}
      />
      <Layout navTitle={t('transactionDetails')}>
        <LoadAndExist loading={state.loading} exists={state.exists}>
          <span className={classes.root}>
            <Overview data={overview} />
            <Messages
              className={classes.messages}
              messages={filterMessages(messages.items)}
              viewRaw={messages.viewRaw}
              toggleMessageDisplay={toggleMessageDisplay}
              onMessageFilterCallback={onMessageFilterCallback}
            />
            {!!logs && <Logs logs={logs} />}
          </span>
        </LoadAndExist>
      </Layout>
    </>
  );
};

export default TransactionDetails;
