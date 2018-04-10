import * as React from 'react';

import './App.css';
import { Transaction } from './Transaction';
import { ChainDisplay } from './BlockChain';
import { InputTransaction } from './InputTransaction';
import {
  Button,
  // Toaster, Position, 
  Intent, Callout,
  Menu, MenuItem,
} from '@blueprintjs/core';

// import { Panel } from 'react-bootstrap';

const logo = require('./logo.svg');
const BACKEND_IP = 'http://localhost:8040';

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
  channels: string[];
  currentChannel: string;
  blocks: Block[];
  users: string[];
  openOverlay: boolean;
}

export default class App extends React.Component<SampleProps, SampleState> {

  constructor(props: SampleProps) {
    super(props);

    this.state = {
      channels: [],
      currentChannel: 'TEST_CHANNEL',
      blocks: [],
      users: [],
      openOverlay: false,
    };
    this.getBlocksForChannel = this.getBlocksForChannel.bind(this);
    this.getUsersForChannel = this.getUsersForChannel.bind(this);
    this.getChannels = this.getChannels.bind(this);
  }

  componentDidMount() {
    this.getChannels();
    this.getUsersForChannel(this.state.currentChannel);
    this.getBlocksForChannel(this.state.currentChannel);
    /*tslint:disable*/
  }

  render() {
    return (
      <div className="App">
        <InputTransaction
          isOverlayOpen={this.state.openOverlay}
          BACKEND_IP={BACKEND_IP}
          onClose={() => {
            this.setState({ openOverlay: false });
            this.getBlocksForChannel(this.state.currentChannel);
          }}
        />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <h1 className="App-title">Welcome to the GoBlockChat!</h1>
        <Button
          intent={Intent.SUCCESS}
          onClick={() => {
            this.getBlocksForChannel(this.state.currentChannel);
            this.getChannels();
          }}
        >
          Update
        </Button>
        <Button
          onClick={() => {
            this.setState({ openOverlay: true });
            this.getBlocksForChannel(this.state.currentChannel);
          }}
        >Add Transaction
        </Button>
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
          {this.getChannelMenuItems()}
          <div>
            <div>{this.renderUsers()}</div>
            <ChainDisplay blocks={this.state.blocks} />
          </div>
        </div>

      </div>
    );
  }

  getBlocksForChannel(channel: string) {
    fetch(BACKEND_IP + '/' + channel)
      .then(results => {
        return results.json();
      }).then(data => {
        let blocks = data.Blocks.map((block: Block) => {
          return block;
        });
        let newState = { blocks: blocks.reverse() };
        this.setState(newState);
      });
  }

  getUsersForChannel(channel: string) {
    fetch(BACKEND_IP + '/' + channel + '/users')
      .then(results => {
        return results.json();
      }).then(data => {
        let users = data.map((user: string) => {
          return user.split(':')[0]; // extract the name, not the hashed credentials
        });
        let newState = { users: users };
        this.setState(newState);
      });
  }

  //TODO put into a separate component, independant of the chain/block display
  getChannels() {
    fetch(BACKEND_IP + '/channels')
      .then(results => {
        return results.json();
      }).then(data => {
        let channels = data.map((chan: string) => {
          return chan;
        })

        let newState = { channels: channels };
        this.setState(newState);
      });
  }

  getChannelMenuItems() {
    return (
    <Menu>
      {this.state.channels.map((channel: string, index: number) => {
        return (
          <MenuItem key={index}
            text={channel}
            onClick = { () => {
              this.setState({currentChannel: channel});
              this.getBlocksForChannel(channel);
              this.getUsersForChannel(channel);
            }
            }
          />
        );
      })}
    </Menu>
    );
  }

  renderUsers() {
    return (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Callout icon={null} intent={Intent.PRIMARY} style={{ marginRight: '1%', width: '20%' }}>
          Authorized Users:
        </Callout>
        {this.state.users.map((user: string, index: number) => {
          return (
            <Callout key={index} style={{ width: '10%', marginRight: '1%' }}>{user}</Callout>
          );
        })}
      </div >
    );
  }
}
