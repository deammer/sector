import * as React from 'react';
import BuildingDisplay from '../presentation/buildingDisplay';
import FleetDisplay from '../presentation/fleetDisplay';
import Loop from './loop';
import PopulationDisplay from '../presentation/populationDisplay';
import ResourceDisplay from '../presentation/resourceDisplay';
import ShipFactory from '../presentation/shipFactory';
import SystemDisplay from '../presentation/systemDisplay';
import { BuildingsList } from '../types/buildings';
import { Population } from '../types/population';
import { Resources } from '../types/resources';
import { ShipsType, ShipType } from '../types/ships';
import { IMapDispatchToProps } from '../container/gameContainer';
import { Config } from '../types/config';

interface IGameProps extends IMapDispatchToProps {
  population: Population;
  buildings: BuildingsList;
  resources: Resources;
  config: Config;
}

interface IGameState {
  ships?: ShipsType;
}

export default class Game extends React.Component<IGameProps, IGameState> {
  private animationFrame: number = 0;

  constructor(props: IGameProps) {
    super(props);

    this.state = {};
  }

  public render(): React.ReactElement<{}> {
    const { buildings, config, population, setPopulation } = this.props;

    return (
      <div>
        <Loop>
          <PopulationDisplay
            buildings={buildings}
            population={population}
            setPopulation={setPopulation}
            {...this.props} />
          <BuildingDisplay
            buildings={buildings}
            setBuildings={this.props.setBuildings}
            config={config} />
          <SystemDisplay />
          <ShipFactory
            onShipBuilt={(s: ShipType) => { this.onShipBuilt(s); }}
            spendResources={(r: any) => { this.spendResources(r); }} />
          <ResourceDisplay
            config={config}
            resources={this.props.resources} />
          <FleetDisplay ships={this.state.ships} />
        </Loop>
      </div>
    );
  }

  private loop() {
    this.animationFrame = requestAnimationFrame(this.loop);
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
    // TODO
  }
}
