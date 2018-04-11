import * as React from 'react';
import { Block, BlockDisplay } from './Block';

import {
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap';

interface ChainProps {
  blocks: Block[];
}

interface ChainState {
  isOpen: boolean;
  blocks: Block[];
}

export class ChainDisplay extends React.Component<ChainProps, ChainState> {
  constructor(props: ChainProps) {
    super(props);

    this.state = {
      isOpen: true,
      blocks: props.blocks
    };
  }

  componentWillReceiveProps(newProps: ChainProps) {
    this.setState({blocks: newProps.blocks});
  }

  render() {
    return (
      <div>
        <ListGroup>
          {
            this.state.blocks.map((block: Block, index: number) => {
              return (
                (<ListGroupItem key={index}>
                  <BlockDisplay
                    block={block}
                  />
                </ListGroupItem>
                )
              );
            })
          }
        </ListGroup>
      </div>
    );
  }
}