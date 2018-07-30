import * as React from 'react';

import './App.css';
// import { Transaction } from './Transaction';
import {
  Button,
  // Toaster, Position, 
  Intent,
} from '@blueprintjs/core';
import { BlockDisplay, Block } from './Block';

// import { Panel } from 'react-bootstrap';

const logo = require('./logo.svg');
export const BLOCKCHAIN_IP = 'http://localhost:5000';

// const MyToaster = Toaster.create({
//   className: 'my-toaster', 
//   position: Position.TOP
// });

interface SampleProps {
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
        <h1 className="App-title">Welcome to GoBlockShare!</h1>
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
          {this.state.blocks.map((block: Block, index: number) => {
            return (
              (
                <BlockDisplay block={block}/>
              )
            );
          })}
          </div>
        </div>

      </div>
    );
  }

  getBlocks() {
    fetch(BLOCKCHAIN_IP + '/blockchain')
      .then(results => {
        return results.json();
      }).then(data => {
        let blocks = data.Blocks.map((block: Block) => {
          return block;
        });
        if (this.state.blocks !== blocks) {
          this.setState({blocks: blocks});
        } else {
          /*tslint:disable*/
          console.log('My length:' + this.state.blocks.length + ' his: ' + blocks.length);
        }
      });
  }
}
