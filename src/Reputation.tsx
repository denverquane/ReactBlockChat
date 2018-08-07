import * as React from 'react';

export interface RepSummary {
  TorrentRep: Map<string, TorrentRep>;
  LayerRep: Map<string, LayerRep>;
}

interface TorrentRep {
  ValidReports: number;
  QualityReports: number;
  AccurateReports: number;
}

interface LayerRep {
  SharedQuantity: number;
  NotReceived: number;
  ValidReports: number;
}

interface ReputationProps {
  summary: RepSummary | null;
}

interface ReputationState {

}

export class ReputationDisplay extends React.Component<ReputationProps, ReputationState> {
  constructor(props: ReputationProps) {
    super(props);
    /*tslint:disable*/
    console.log(props.summary)
  }

  componentWillReceiveProps(newProps: ReputationProps) {
    if (newProps.summary) {
      console.log(newProps.summary.TorrentRep)
      console.log(newProps.summary.LayerRep)
    }
  }

  render() {
    if (this.props.summary) {
      // let vals = this.props.summary.TorrentRep.forEach((value: TorrentRep, key: string) => {
        
      //   console.log(key, value);
      //   return value;
      // });
      // console.log(vals);
    }
    return (<td/>);
  }
}