import * as React from 'react';
import { Table } from 'react-bootstrap';
import { Callout, IconName, Intent } from '@blueprintjs/core';

export interface Transaction {
  Username: string;
  Message: string;
  TransactionType: number;
}

export interface AuthTransaction {
  Username: string;
  Password: string;
  Message: string;
  TransactionType: string;
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
                <th>Type</th>
                <th>Message</th>
              </tr>
              <tr>
                <td style={{ width: '25%' }}>{this.renderTransType(this.props.transaction.TransactionType)}</td>
                <td style={{ width: '75%', maxWidth: '75%' }}>{this.props.transaction.Message}</td>
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

  renderTransType(type: number) {
    var iconn: IconName;
    var text: string;
    var intent: Intent;

    switch (type) {
      case 1:
        iconn = 'add';
        text = 'Add Message';
        intent = Intent.SUCCESS;
        break;
      case 3:
        iconn = 'trash';
        text = 'Delete Message';
        intent = Intent.DANGER;
        break;
      case 4:
        iconn = 'new-person';
        text = 'Add User';
        intent = Intent.SUCCESS;
        break;
      default:
        iconn = 'cross';
        text = 'INVALID';
        intent = Intent.DANGER;
        break;
    }
    return (
      <Callout icon={iconn} intent={intent}>{text}</Callout>
    );
  }
}