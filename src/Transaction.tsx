import * as React from 'react';
import { Table } from 'react-bootstrap';
// import { Callout, IconName, Intent } from '@blueprintjs/core';

export interface Transaction {
    Origin: {
      PubKeyX: string,
      PubKeyY: string,
      Address: string
    };
    Transaction: string;
    TransactionType: string;
    R: string;
    S: string;
    TxID: string;
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
    this.getAlias = this.getAlias.bind(this);

  }

  getAlias = (addr: string) => {
    let returnData = '';
    fetch('http://localhost:5000/alias/' + addr)
      .then(results => {
        return results.json();
      }).then(data => {
        returnData = data;
      });
    return returnData;
  }

  render() {
    if (this.props.transaction !== undefined) {
      return (
        <div>
          <Table condensed={true}>
            <thead>
              <tr>
                <th>TxID</th>
                <th>Origin</th>
                <th>Type</th>
                {/* <th>Transaction</th> */}
              </tr>
              <tr>
                <td style={{ width: '20%' }}>{this.props.transaction.TxID}</td>
                <td style={{ width: '20%' }}>{this.getAlias(this.props.transaction.Origin.Address)}</td>
                <td style={{ width: '10%' }}>{this.props.transaction.TransactionType}</td>
                {/* <td style={{ width: '50%' }}>{this.props.transaction.Transaction}</td> */}
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
