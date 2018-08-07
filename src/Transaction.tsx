import * as React from 'react';
import { Table } from 'react-bootstrap';
import { RepSummary, ReputationDisplay } from './Reputation';
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
  alias: string;
  summary: RepSummary | null;
}

interface Alias {
  Data: string;
}

export class TransactionDisplay extends React.Component<TransactionProps, TransactionState> {
  constructor(props: TransactionProps) {
    super(props);
    this.getAlias = this.getAlias.bind(this);
    this.state = {
      alias: 'NULL',
      summary: null
    };
  }

  getAlias = (addr: string) => {
    fetch('http://localhost:5000/alias/' + addr)
      .then(results => {
        return results.json();
      }).then(data => {
        let aliases = data.map((nalias: Alias) => {
           return nalias.Data;
        });
        this.setState({alias: aliases[0]});
      });
  }

  getReputation = (addr: string) => {
    fetch('http://localhost:5000/reputation/' + addr) 
    .then(results => {
        return results.json();
      }).then(data => {
        let reps = data.map((summary: RepSummary) => {
           return summary;
        });
        this.setState({summary: reps[0]});
      });
  }

  componentDidMount() {
    if (this.props.transaction) {
      this.getAlias(this.props.transaction.Origin.Address);
      this.getReputation(this.props.transaction.Origin.Address);
    }
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
                <th>Reputation</th>
                <th>Type</th>
                {/* <th>Transaction</th> */}
              </tr>
              <tr>
                <td style={{ width: '20%' }}>{this.props.transaction.TxID}</td>
                <td style={{ width: '20%' }}>{this.state.alias === 'NULL' 
                ? this.props.transaction.Origin.Address : this.state.alias}</td>
                {<ReputationDisplay
                  summary={this.state.summary} 
                />}
                <td style={{ width: '10%' }}>{this.props.transaction.TransactionType}</td>
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
