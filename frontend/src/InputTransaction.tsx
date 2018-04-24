import * as React from 'react';

import {
  Button,
  EditableText,
  Classes,
 // Position, Toaster, 
 // Intent
} from '@blueprintjs/core';

import {
  Panel,
} from 'react-bootstrap';

import { BACKEND_IP } from './App';

import { AuthTransaction } from './Transaction';

interface InputProps {
}

interface InputState {
  transaction: AuthTransaction;
}

// const MyToaster = Toaster.create({ className: 'myToaster', position: Position.TOP });

export class InputTransaction extends React.Component<InputProps, InputState> {

  constructor(props: InputProps) {
    super(props);

    this.state = {
      transaction: {
        OriginPubKeyX: '41465825910018896748506442457299597466934834109962972962658476739222369973795',
        OriginPubKeyY: '59682448553058160470866529273575025018646442288865005510432207524813798486893',
        OriginAddress: '05+tccYNwv6kwMDHFHLhpT2+syGQYhcvZrIUGMkj9vE=',
        SignedMsg: 'dsfgsd',
        TxRef: [],
        R: '83272896655727237885461857009977546962509371591045400188157617593583499140053',
        S: '77837220821200439760189315101894538440367033391263344979880555787602867385798',
        DestAddr: 'UVoty8GhdxPK4ZfxNUGIGSmDcumFGk4+3Sc8R1e7D08=',
      }
    };
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
                  <h5>OriginPubKeyX:</h5>
                  <EditableText
                    defaultValue={this.state.transaction.OriginPubKeyX}
                    confirmOnEnterKey={true}
                    onConfirm={(val: string) => {
                      this.setState({
                        transaction: {
                          ...this.state.transaction,
                          OriginPubKeyX: val
                        }
                      });
                    }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <h5>OriginPubKeyY:</h5>
                  <EditableText
                    defaultValue={this.state.transaction.OriginPubKeyY}
                    confirmOnEnterKey={true}
                    onConfirm={(val: string) => {
                      this.setState({
                        transaction: {
                          ...this.state.transaction,
                          OriginPubKeyY: val
                        }
                      });
                    }}
                  />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', }}>
                <h5>OriginAddress:</h5>
                <EditableText
                  defaultValue={this.state.transaction.OriginAddress}
                  confirmOnEnterKey={true}
                  onConfirm={(val: string) => {
                    this.setState({
                      transaction: {
                        ...this.state.transaction,
                        OriginAddress: val
                      }
                    });
                  }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', }}>
                <h5>SignedMessage:</h5>
                <EditableText
                  defaultValue={this.state.transaction.SignedMsg}
                  confirmOnEnterKey={true}
                  onConfirm={(val: string) => {
                    this.setState({
                      transaction: {
                        ...this.state.transaction,
                        SignedMsg: val
                      }
                    });
                  }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', }}>
                <h5>R:</h5>
                <EditableText
                  defaultValue={this.state.transaction.R}
                  confirmOnEnterKey={true}
                  onConfirm={(val: string) => {
                    this.setState({
                      transaction: {
                        ...this.state.transaction,
                        R: val
                      }
                    });
                  }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', }}>
                <h5>S:</h5>
                <EditableText
                  defaultValue={this.state.transaction.S}
                  confirmOnEnterKey={true}
                  onConfirm={(val: string) => {
                    this.setState({
                      transaction: {
                        ...this.state.transaction,
                        S: val
                      }
                    });
                  }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', }}>
                <h5>Destination:</h5>
                <EditableText
                  defaultValue={this.state.transaction.DestAddr}
                  confirmOnEnterKey={true}
                  onConfirm={(val: string) => {
                    this.setState({
                      transaction: {
                        ...this.state.transaction,
                        DestAddr: val
                      }
                    });
                  }}
                />
              </div>
            </div>
          </div>

          <Button
            onClick={() => {
              fetch(BACKEND_IP + '/addTransaction', {
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
              // TODO Need to fix CORS before the filtering by response will work...
                .then(response => {
                  // if (response.ok) {
                    // response.json().then(json => {
                      
                        /*tslint:disable*/
                        console.log({ response });
                      // });
                  //   } else {
                  //   MyToaster.show({ message: 'Invalid Transaction', intent: Intent.DANGER })
                  // }
                })
            }}
          >
            Post Transaction
                        </Button>
        </div>
      </Panel>
    );
  }
}