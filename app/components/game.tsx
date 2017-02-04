import * as React from 'react';
import SystemDisplay from '../presentation/systemDisplay';
import ShipFactory from '../presentation/shipFactory';
import FleetDisplay from '../presentation/fleetDisplay';
import ResourceDisplay from '../presentation/resourceDisplay';

import { ResourcesType } from '../types/resources';
import { ShipsType, ShipType } from '../types/ships';

interface IGameState {
  resources: ResourcesType;
  ships?: ShipsType;
}

export default class Game extends React.Component<{}, IGameState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      resources: {
        titanium: 10,
      },
    };
  }

  public render(): React.ReactElement<{}> {
    return (
      <div>
        <SystemDisplay />
        <ShipFactory
          onShipBuilt={(s: ShipType) => { this.onShipBuilt(s); }}
          spendResources={(r: any) => { this.spendResources(r); }} />
        <ResourceDisplay resources={this.state.resources} />
        <FleetDisplay ships={this.state.ships} />
      </div>
    );
  }

  private onShipBuilt(ship: ShipType): void {
    const newState: any = Object.assign({}, this.state);
    if (!newState.ships) {
      newState.ships = {};
    }

    switch (ship) {
      case 'Interceptor':
        if (!newState.ships.interceptor) { newState.ships.interceptor = 0; }
        newState.ships.interceptor ++;
        break;
      case 'Corvette':
        if (!newState.ships.corvette) { newState.ships.corvette = 0; }
        newState.ships.corvette ++;
        break;
      default: console.warn('Invalid ship type: onShipBuilt => ' + ship);
    }

    this.setState(newState);
  }

  private spendResources(resources: any): void {
    this.setState({ resources: { titanium: 0 }});
  }
}
