import * as React from 'react';
import ProgressButton from '../utils/progressButton';
import { BuildingsList } from '../types/buildings';
import { IGlobalProps } from '../types/global';

interface IBuildingDisplayProps extends IGlobalProps {
  buildings: BuildingsList;
  setBuildings: (b: BuildingsList) => void;
}

export default class FleetDisplay extends React.Component<IBuildingDisplayProps, {}> {
  constructor(props: IBuildingDisplayProps) {
    super(props);
  }

  public render() {
    const { habs } = this.props.buildings;
    const { HAB } = this.props.config;

    if (!habs) {
      return <div/>;
    }

    return (
      <div className="box">
        <h3>Buildings</h3>
        <ProgressButton label="Build Hab" onComplete={() => { this.buildHab(); }} />
        <p>{habs <= 1 ? HAB.name : HAB.namePlural}: {habs}</p>
        <ProgressButton label="Build Titanium Factory" onComplete={() => { this.buildTitaniumFactory(); }} />
        {this.renderTitaniumFactories()}
      </div>
    );
  }

  private buildHab() {
    const buildings = Object.assign({}, this.props.buildings);
    buildings.habs ++;
    this.props.setBuildings(buildings);
  }

  private buildTitaniumFactory() {
    const buildings = Object.assign({}, this.props.buildings);
    buildings.titaniumFactories ++;
    this.props.setBuildings(buildings);
  }

  private renderTitaniumFactories(): React.ReactNode {
    const { titaniumFactories } = this.props.buildings;

    // No factories
    if (titaniumFactories === 0) {
      return null;
    }

    const { TITANIUM_FACTORY } = this.props.config;
    let name = <h3>{TITANIUM_FACTORY.name}</h3>;
    if (titaniumFactories > 1) {
      name = <h3>{titaniumFactories} {TITANIUM_FACTORY.namePlural}</h3>
    }
    return (
      <div className="box--inline">
        {name}
        <p>Workers: {0}/{titaniumFactories * TITANIUM_FACTORY.capacity}</p>
      </div>
    );
  }
}
