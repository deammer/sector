import * as React from 'react';
import { ShipType } from '../types/ships';
import Button from './button';

const interceptor: any = {
  buildTime: 2,
  cargoSpace: 10,
  cost: { titanium: 1 },
  damage: 1,
  health: 1,
  name: 'Interceptor',
  namePlural: 'Interceptors',
  numWeapons: 1,
  range: 1,
  shields: 0,
};

const corvette: any = {
  buildTime: 4,
  cargoSpace: 10,
  cost: { titanium: 5 },
  damage: 3,
  health: 2,
  name: 'Corvette',
  namePlural: 'Corvettes',
  numWeapons: 1,
  range: 2,
  shields: 1,
};

interface IShipFactoryProps {
  spendResources: Function;
  onShipBuilt: (s: ShipType) => void;
}

interface IShipFactoryState {
  buildingCorvette: boolean;
  buildingInterceptor: boolean;
}

export default class ShipFactory extends React.Component<IShipFactoryProps, IShipFactoryState> {
  constructor(props: IShipFactoryProps) {
    super(props);

    this.state = {
      buildingCorvette: false,
      buildingInterceptor: false,
    };
  }

  public render(): React.ReactElement<{}> {
    return (
      <div className="box">
        <h3>Ship Factory</h3>
        <Button
          disabled={this.state.buildingInterceptor}
          onClick={() => { this.buildInterceptor(); }}
          label="Build Interceptor" />
        <Button
          disabled={this.state.buildingCorvette}
          onClick={() => { this.buildCorvette(); }}
          label="Build Corvette" />
      </div>
    );
  }

  private buildCorvette(): void {
    this.setState(Object.assign({}, this.state, { buildingCorvette: true }));
    this.props.spendResources(corvette.cost);

    setTimeout(() => {
      this.setState(Object.assign({}, this.state, { buildingCorvette: false }));
      this.props.onShipBuilt('Corvette');
    }, corvette.buildTime * 1000);
  }

  private buildInterceptor(): void {
    this.setState(Object.assign({}, this.state, { buildingInterceptor: true }));
    this.props.spendResources(interceptor.cost);

    setTimeout(() => {
      this.setState(Object.assign({}, this.state, { buildingInterceptor: false }));
      this.props.onShipBuilt('Interceptor');
    }, interceptor.buildTime * 1000);
  };
}
