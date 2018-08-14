import * as React from 'react';

export interface JSONRepSummary {
  ValidTorrFraction: number;
  QualityTorrFraction: number;
  AccurateTorrFraction: number;

  NotReceivedLayerFraction: number;
  ValidLayerFraction: number;
}

interface ReputationProps {
  summary: JSONRepSummary | null;
}

interface ReputationState {

}

export class ReputationDisplay extends React.Component<ReputationProps, ReputationState> {
  constructor(props: ReputationProps) {
    super(props);

  }

  render() {
    if (this.props.summary) {
      return (
      <td>
        <p>
          Valid: {this.props.summary.ValidTorrFraction * 100 + '% '}
          Quality: {this.props.summary.QualityTorrFraction * 100 + '% '}
          Accurate: {this.props.summary.AccurateTorrFraction * 100 + '% '}
        </p>
        <p>
          Received: {(1.0 - this.props.summary.NotReceivedLayerFraction) * 100 + '% '}
          Valid Reports: {this.props.summary.ValidLayerFraction * 100 + '% '}
        </p>
      </td> 
      );
    } else {
      return (<td />);
    }
  }
}