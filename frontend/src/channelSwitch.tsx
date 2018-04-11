import * as React from 'react';

import {
  Menu, MenuItem, Intent
} from '@blueprintjs/core';

import { BACKEND_IP } from './App';

interface ChannelSwitchProps {
  initialChannel: string;
  onChange: (channel: string) => void;
}

interface ChannelState {
  channels: string[];
  currentChannel: string;
}

export class ChannelSwitch extends React.Component<ChannelSwitchProps, ChannelState> {
  constructor(props: ChannelSwitchProps) {
    super(props);

    this.state = {
      channels: [],
      currentChannel: this.props.initialChannel,
    };
  }

  componentDidMount() {
    this.getChannels();
  }

  render() {
    return (
      <Menu>
        {this.state.channels.map((channel: string, index: number) => {
          return (
            <MenuItem
              key={index}
              text={channel}
              disabled={this.state.currentChannel === channel}
              intent={Intent.PRIMARY}
              onClick={() => {
                if (channel !== this.state.currentChannel) {
                  this.setState({ currentChannel: channel });
                  this.props.onChange(channel);
                }
              }}
            />
          );
        })}
      </Menu>
    );
  }

  getChannels() {
    fetch(BACKEND_IP + '/channels')
      .then(results => {
        return results.json();
      }).then(data => {
        let channels = data.map((chan: string) => {
          return chan;
        });

        let newState = { channels: channels };
        this.setState(newState);
      });
  }

}