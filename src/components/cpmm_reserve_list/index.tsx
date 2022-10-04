/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
// import dynamic from 'next/dynamic';
import { CpmmReserveListState } from './types';

const CpmmReserveList: React.FC<CpmmReserveListState> = (props) => {
  const {
    cpmmReserve, swapOutputData,
  } = props;

  const items = cpmmReserve.map((x: CpmmReserve) => ({
    pair: (
      <h4>
        {x.trading_pair.asset_1} : {x.trading_pair.asset_2}
      </h4>
    ),
    r1: <h4>{x.r1}</h4>,
    r2: <h4>{x.r2}</h4>,
  }));

  const swapOutputDataItems = swapOutputData.map((x: SwapOutputData) => ({
    pair: (
      <h4>
        {x.trading_pair.asset_1} : {x.trading_pair.asset_2}
      </h4>
    ),
    delta1: <h4>{x.delta_1}</h4>,
    delta2: <h4>{x.delta_2}</h4>,
    lambda1: <h4>{x.lambda_1}</h4>,
    lambda2: <h4>{x.lambda_2}</h4>,
    success: <h4>{x.success ? 'Ok' : '-'}</h4>,
  }));

  const keysCpmmReserve = [
    {
      name: 'Pair', key: 'pair',
    },
    {
      name: 'Reserve 1', key: 'r1',
    },
    {
      name: 'Reserve 2', key: 'r2',
    },
  ];

  const keysSwapOutputData = [
    {
      name: 'Pair', key: 'pair',
    },
    {
      name: 'Delta 1', key: 'delta1',
    },
    {
      name: 'Delta 2', key: 'delta2',
    },
    {
      name: 'Lambda 1', key: 'lambda1',
    },
    {
      name: 'Lambda 2', key: 'lambda2',
    },
    {
      name: 'Success', key: 'success',
    },
  ];

  return (
    <div
      style={{
        width: '100%', display: 'flex',
      }}
    >
      <div style={{ width: '50%' }}>
        <h2>CPMM Reserves</h2>
        <table style={{ width: '100%' }}>
          <tr>
            {keysCpmmReserve.map((i) => (
              <th key={i.key} align="left">
                {i.name}
              </th>
            ))}
          </tr>
          {items.map((i) => (
            <tr>
              <td>{i.pair}</td>
              <td>{i.r1}</td>
              <td>{i.r2}</td>
            </tr>
          ))}
        </table>
      </div>
      <div style={{ width: '50%' }}>
        <h2>Swap output data</h2>
        <table style={{ width: '100%' }}>
          <tr>
            {keysSwapOutputData.map((i) => (
              <th key={i.key} align="left">
                {i.name}
              </th>
            ))}
          </tr>
          {swapOutputDataItems.map((i) => (
            <tr>
              <td>{i.pair}</td>
              <td>{i.delta1}</td>
              <td>{i.delta2}</td>
              <td>{i.lambda1}</td>
              <td>{i.lambda2}</td>
              <td>{i.success}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default CpmmReserveList;
