import * as React from 'react';

import './App.css';
import { Transaction } from './Transaction';
import { ChainDisplay } from './BlockChain';
import {
  Button,
  // Toaster, Position, 
  Intent,
} from '@blueprintjs/core';

// import { Panel } from 'react-bootstrap';

const logo = require('./logo.svg');
export const BACKEND_IP = 'http://localhost:8040';

// const MyToaster = Toaster.create({
//   className: 'my-toaster', 
//   position: Position.TOP
// });

interface SampleProps {
}

interface Block {
  Index: number;
  Timestamp: string;
  Transactions: Transaction[];
  Hash: string;
  PrevHash: string;
}

interface SampleState {
  blocks: Block[];
  openOverlay: boolean;
}

export default class App extends React.Component<SampleProps, SampleState> {

  constructor(props: SampleProps) {
    super(props);

    this.state = {
      blocks: [],
      openOverlay: false,
    };
    this.getBlocks = this.getBlocks.bind(this);
  }

  componentDidMount() {
    this.getBlocks();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <h1 className="App-title">Welcome to the GoBlockChat!</h1>
        <Button
          intent={Intent.SUCCESS}
          onClick={() => {
            this.getBlocks();
          }}
        >
          Update
        </Button>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{width: '100%'}}>
            <ChainDisplay
              blocks={this.state.blocks}
            />
          </div>
        </div>

      </div>
    );
  }

  getBlocks() {
    fetch(BACKEND_IP)
      .then(results => {
        return results.json();
      }).then(data => {
        let blocks = data.Blocks.map((block: Block) => {
          return block;
        });
        if (this.state.blocks !== blocks) {
          this.setState({blocks: blocks.reverse()});
        } else {
          /*tslint:disable*/
          console.log('My length:' + this.state.blocks.length + ' his: ' + blocks.length);
        }
      });
  }
}
