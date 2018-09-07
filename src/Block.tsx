import * as React from 'react';
import { Transaction, TransactionDisplay } from './Transaction';
import { Callout, Intent } from '@blueprintjs/core';
import {
  ListGroup,
  ListGroupItem,
  Table,
} from 'react-bootstrap';

export interface Block {
  Index: number;
  Timestamp: string;
  Transactions: Transaction[];
  Hash: string;
  PrevHash: string;
  Difficulty: number;
  Nonce: string;
}

interface BlockProps {
  block: Block;
}

interface BlockState {
  isOpen: boolean;
}

export class BlockDisplay extends React.Component<BlockProps, BlockState> {
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '100%' }}>
        <Table>
          <thead>
            <tr>
              <th style={{ width: '10%' }}>
                <Callout icon={null} intent={Intent.PRIMARY}>
                  {this.props.block.Index}
                </Callout></th>
              <th style={{ width: '90%' }}>
                <Callout
                  icon={null}
                  title={this.props.block.Transactions && this.props.block.Transactions[0]
                    ? 'Added on ' + this.props.block.Timestamp
                    : 'Chain created on ' + this.props.block.Timestamp}
                  intent={Intent.PRIMARY}
                />
              </th>
            </tr>

            <tr>
              <td><Callout icon="new-object" intent={Intent.SUCCESS}>New</Callout></td>
              <td>
                <ListGroup>
                  <ListGroupItem>
                    <div style={{ display: 'flex' }}>

                      <div style={{ width: '100%', maxWidth: '100%' }}>
                        {this.props.block.Transactions ? <TransactionDisplay
                          transaction={this.props.block.Transactions.pop()}
                        /> : <div />
                        }

                      </div>
                    </div>

                  </ListGroupItem>
                </ListGroup>
              </td>
            </tr>
          </thead>
        </Table>
      </div>);
  }
}