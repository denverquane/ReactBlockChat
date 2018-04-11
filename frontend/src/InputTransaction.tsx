import * as React from 'react';

import {
  Button,
  EditableText,
  Classes,
} from '@blueprintjs/core';

import {
  Panel,
} from 'react-bootstrap';

import { BACKEND_IP } from './App';

import { AuthTransaction } from './Transaction';

interface InputProps {
  channel: string;
  onPost: void;
}

interface InputState {
  transaction: AuthTransaction;
}

export class InputTransaction extends React.Component<InputProps, InputState> {

  constructor(props: InputProps) {
    super(props);

    this.state = {
      transaction: {
        Username: 'username',
        Password: 'password',
        Message: 'message',
        TransactionType: 'ADD_MESSAGE'
      }
    };
  }

  componentWillReceiveProps(newProps: InputProps) {
    this.props = newProps;
  }

  render() {
    return (
      <Panel>
        <div className={Classes.CARD}>

          <h3>Please provide the details of the transaction you wish to post:</h3>

          <div
            style={{
              display: 'flex', flexDirection: 'column', width: '100%',
              marginBottom: '10px', maxWidth: '90%'
            }}
          >
            <div >
              <div style={{ dislay: 'flex', flexDirection: 'row' }}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <h5>Username:</h5>
                  <EditableText
                    multiline={true}
                    placeholder={this.state.transaction.Username}
                    confirmOnEnterKey={true}
                    onConfirm={(val: string) => {
                      this.setState({
                        transaction: {
                          ...this.state.transaction,
                          Username: val
                        }
                      });
                    }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <h5>Password:</h5>
                  <EditableText
                    placeholder={this.state.transaction.Password}
                    confirmOnEnterKey={true}
                    onConfirm={(val: string) => {
                      this.setState({
                        transaction: {
                          ...this.state.transaction,
                          Password: val
                        }
                      });
                    }}
                  />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', height: '100px', width: '90%' }}>
                <h5>Message:</h5>
                <EditableText
                  placeholder={this.state.transaction.Message}
                  confirmOnEnterKey={true}
                  onConfirm={(val: string) => {
                    this.setState({
                      transaction: {
                        ...this.state.transaction,
                        Message: val
                      }
                    });
                  }}
                  /*tslint:disable*/
                  multiline
                  /*tsline:enable*/
                  minLines={3}
                  maxLines={4}
                />
              </div>
            </div>
          </div>

          <Button
            onClick={() => {
              fetch(BACKEND_IP + '/' + this.props.channel, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                  'Access-Control-Allow-Origin': '*',
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                  this.state.transaction
                )
              })
                .then(results => {
                  return results;
                }).then(data => {
                  // let blocks = data.Blocks.map((block: string) => {
                  //     return block;
                  // });
                  /*tslint:disable*/
                  console.log({ data });
                  this.props.onPost;
                });
            }}
          >
            Post Transaction
                        </Button>
        </div>
      </Panel>
    );
  }
}