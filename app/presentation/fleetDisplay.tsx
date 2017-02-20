import * as React from 'react';
import { ShipsType } from '../types/ships';

interface IFleetDisplayProps {
  ships?: ShipsType;
}

export default class FleetDisplay extends React.Component<IFleetDisplayProps, {}> {
  constructor(props: IFleetDisplayProps) {
    super(props);
  }

  public render(): React.ReactElement<{}> {
    const { ships }: any = this.props;

    if (!ships) {
      return <div/>;
    }

    return (
      <div className="box">
        <h3>Fleet</h3>
        {ships.interceptor > 0 && <p>Interceptors: {ships.interceptor}</p>}
        {ships.corvette > 0 && <p>Corvettes: {ships.corvette}</p>}
      </div>
    );
  }
}
