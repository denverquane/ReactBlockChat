import * as React from 'react';

import './App.css';
// import { Transaction } from './Transaction';
import {
  Button,
  Toaster, Position,
  Intent,
  Tabs, Tab, TabId,
} from '@blueprintjs/core';
import { BlockDisplay, Block } from './Block';

// import { Panel } from 'react-bootstrap';

import Sockette from 'sockette';

const logo = require('./logo.svg');
export const BLOCKCHAIN_IP = 'http://localhost:5000';

const MyToaster = Toaster.create({
  className: 'my-toaster',
  position: Position.TOP
});

interface SampleProps {
}

interface SampleState {
  mostRecentBlock: Block;
  blocks: Block[];
  openOverlay: boolean;
  currentTab: TabId;
}

export default class App extends React.Component<SampleProps, SampleState> {
  /*tslint:disable*/

  ws = new Sockette('ws://localhost:5000/ws', {
    timeout: 5e3,
    maxAttempts: 10,
    onopen: (e: any) => {
      MyToaster.clear();
      MyToaster.show({
        message: 'Connected to Blockchain Server!',
        intent: Intent.SUCCESS,
      });
    },
    onmessage: (e: any) => {
      console.log('Received:', e.data);
      this.setState({mostRecentBlock: e.data});
    },
    onreconnect: (e: any) => MyToaster.show({
      message: 'Reconnecting to Blockchain Server...',
      intent: Intent.WARNING,
    }),
    onmaximum: (e: any) => {
      MyToaster.clear();
      MyToaster.show({
      message: 'Maximum reconnect attempts to Blockchain Server; please refresh the page',
      intent: Intent.DANGER,
      timeout: 10000
    });
  },
    // onclose: (e: any) => MyToaster.show({
    //   message: 'Can\'t reach Blockchain server... Is it running?',
    //   intent: Intent.DANGER,
    // }),
    onerror: (e: any) => {
      MyToaster.clear();
      MyToaster.show({
      message: 'Error connecting to Blockchain Server!',
      intent: Intent.DANGER,
    });
  }
  });
  /*tslint:enable*/
  constructor(props: SampleProps) {
    super(props);

    this.state = {
      mostRecentBlock: {
        Index: 0, Timestamp: '',
        Transactions: [], Hash: '',
        PrevHash: '',
        Difficulty: 0,
        Nonce: ''
      },
      blocks: [],
      openOverlay: false,
      currentTab: 'Home',
    };
    this.getBlocks = this.getBlocks.bind(this);
  }

  componentWillUnmount() {
    this.ws.close();
  }

  componentDidMount() {
    this.getBlocks();
  }

  render() {
    return (
      <div>

        <header className="App-header">
          <img src={logo} style={{ display: 'flex' }} className="App-logo" alt="logo" />
          {this.state.mostRecentBlock && this.state.mostRecentBlock.Index !== 1 
            ? <BlockDisplay block={this.state.mostRecentBlock} /> 
            : <div />}
        </header>
        <h1 className="App-title" style={{ display: 'flex' }}>GoBlockShare!</h1>
        <Tabs id="MainPageTabs" onChange={this.handleTabChange} selectedTabId={this.state.currentTab}>
          <Tab
            id="Home"
            title="Home"
            panel={
              <div>
                <h3>
                  Welcome to GoBlockShare!
                </h3>
                <p>
                  This is the frontend web interface for GoBlockShare, and allows users to view the blockchain,
                  see user reputations, and even view available torrents (if the torrent backend service is running)
                </p>
              </div>
            }
          />
          <Tab
            id="Blockchain"
            title="Blockchain"
            panel={
              <div className="App">

                <Button
                  intent={Intent.SUCCESS}
                  onClick={() => {
                    this.getBlocks();
                  }}
                >
                  Update
                </Button>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <div style={{ width: '100%' }}>
                    {this.state.blocks.map((block: Block, index: number) => {
                      return (
                        (
                          <BlockDisplay block={block} />
                        )
                      );
                    })}
                  </div>
                </div>

              </div>
            }
          />
        </Tabs>
      </div>
    );
  }
  private handleTabChange = (newTab: TabId) => {
    this.setState({ currentTab: newTab });
    if (newTab.toString() === 'Blockchain') {
      this.getBlocks();
    }
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
          this.setState({ blocks: blocks });
        } else {
          /*tslint:disable*/
          console.log('My length:' + this.state.blocks.length + ' his: ' + blocks.length);
        }
      });
  }
}
