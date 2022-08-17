import React from 'react';
import {
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';
import { DecryptNote } from '../../types';

const DecryptNotes: React.FC<
  {
    decryptNotes: DecryptNote[];
  } & ComponentDefault
> = ({ decryptNotes }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Diversifier</TableCell>
            <TableCell>Note blinding</TableCell>
            <TableCell>Transmission key</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Asset ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {decryptNotes.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.diversifier}</TableCell>
              <TableCell>{row.noteBlinding}</TableCell>
              <TableCell>{row.transmissionKey}</TableCell>
              <TableCell>{row.value.amount}</TableCell>
              <TableCell>{row.value.assetId}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DecryptNotes;
