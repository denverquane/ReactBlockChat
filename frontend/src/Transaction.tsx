import * as React from 'react';
import { Table } from 'react-bootstrap';
// import { Callout, IconName, Intent } from '@blueprintjs/core';

export interface Transaction {
  OriginAddr: string;
  SignedPayload: {
    Simple: string,
    R: string,
    S: string
  };
  Destination: string;
}

export interface AuthTransaction {
  OriginPubKeyX: string;
  OriginPubKeyY: string;
  OriginAddress: string;
  SignedMsg: string;
  TxRef: string[];
  R: string;
  S: string;
  DestAddr: string;
}

interface TransactionProps {
  transaction: Transaction | undefined;
}

interface TransactionState {

}

export class TransactionDisplay extends React.Component<TransactionProps, TransactionState> {
  constructor(props: TransactionProps) {
    super(props);
  }

  render() {
    if (this.props.transaction !== undefined) {
      return (
        <div>
          <Table condensed={true}>
            <thead>
              <tr>
                <th>Origin</th>
                <th>Message</th>
                <th>Destination</th>
              </tr>
              <tr>
                <td style={{ width: '25%' }}>{this.props.transaction.OriginAddr}</td>
                <td style={{ width: '25%', maxWidth: '25%' }}>{this.props.transaction.SignedPayload.Simple}</td>
                <td style={{ width: '25%', maxWidth: '25%' }}>{this.props.transaction.Destination}</td>
              </tr>
            </thead>
          </Table>
        </div>
      );
    } else {
      return (
        <div>
          <Table condensed={true}>
            <thead>
              <tr><td style={{ width: '10%' }} />
                <td style={{ width: '90%' }}>Initial Block; No transactions</td>
              </tr>
            </thead>
          </Table>
        </div>
      );
    }
  }
}