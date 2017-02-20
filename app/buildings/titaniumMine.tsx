import * as React from 'react';

export interface ITitaniumMineProps {
  level: number;
}

const incomeLevels: number[] = [
  10,
  50,
  250,
  1000,
  4000,
  12000,
  36000,
  72000,
];

export default class TitaniumMine extends React.Component<ITitaniumMineProps, {}> {
  constructor(props: ITitaniumMineProps) {
    super(props);
  }

  public render(): React.ReactElement<{}> {
    return (
      <div>
        <h3>Titanium Mine</h3>
        <p>Income: <b>{this.getIncome()}/min</b></p>
      </div>
    );
  }

  private getIncome(): number {
    const { level }: any = this.props;

    if (level > incomeLevels.length) {
      return incomeLevels[incomeLevels.length - 1];
    }
    return incomeLevels[level];
  }
}
